/* 트루스코리아: 글(뉴스·영상·행사) 불러오기와 보여 주기
   - config.js에 Supabase 주소와 공개 키가 있으면 Supabase에서, 없으면 data/posts.json에서 읽습니다.
   - 글의 제목·본문은 절대 HTML로 넣지 않습니다(textContent와 createElement만 씀).
   - 쪽 안의 표시: [data-tk-list] 글 목록, [data-tk-post] 글 하나 보기. */
(function () {
  'use strict';

  /* ---------- 사이트 뿌리 주소 (하위 폴더의 쪽에서도 맞게) ---------- */
  function findRoot() {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName('script');
      for (var i = 0; i < all.length; i++) if (/assets\/js\/posts\.js(\?|#|$)/.test(all[i].src)) s = all[i];
    }
    try { return new URL('../../', s.src).href; } catch (e) { return new URL('./', location.href).href; }
  }
  var ROOT = findRoot();

  var CATS = { broadcast: '종합뉴스', tknews: 'TK 뉴스', truth: '진실알리기', event: '행사·세미나' };
  var NEWS_CATS = ['broadcast', 'tknews', 'truth'];
  var SELECT = 'id,category,title,body,youtube_id,video_after,extra_videos,links,images,published_at,show_on_home,event_start,event_end';
  /* 옛 홈페이지 게시판 → 새 목록 (옛 글 번호로 들어왔는데 글이 없을 때 그 목록으로 안내) */
  var LEGACY_LIST = { TK_broadcast: 'broadcast', TK_NEWS: 'tknews', truth: 'truth', Culture_War: 'truth', PresidentYoon: 'truth', event: 'event' };
  /* 옛 홈페이지에서 두 게시판에 똑같이 올라 있던 글: 숨긴 쪽 → 보이는 쪽 (legacy-redirect.js의 SAME과 같게) */
  var LEGACY_SAME = { 'legacy-PresidentYoon-8': 'legacy-truth-12' };
  var ID_RE = /^[A-Za-z0-9_-]{1,100}$/;
  var YT_RE = /^[A-Za-z0-9_-]{11}$/;
  var DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
  var SVGNS = 'http://www.w3.org/2000/svg';

  function config() {
    var c = window.TK_CONFIG || {};
    var url = typeof c.supabaseUrl === 'string' ? c.supabaseUrl.trim().replace(/\/+$/, '') : '';
    var key = typeof c.supabaseAnonKey === 'string' ? c.supabaseAnonKey.trim() : '';
    if (!/^https:\/\/[A-Za-z0-9.-]+(:\d+)?$/.test(url) && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(url)) url = '';
    return { url: url, key: key, on: !!(url && key) };
  }

  /* ---------- 작은 도구 ---------- */
  function str(v) { return typeof v === 'string' ? v : (v == null ? '' : String(v)); }
  function posInt(v) { var n = Number(v); return n > 0 && n < 100000 && Math.floor(n) === n ? n : 0; }
  /* 문단 번호(0 이상 정수)이면 그 값, 아니면 null */
  function slot(v) { return typeof v === 'number' && v >= 0 && v < 10000 && Math.floor(v) === v ? v : null; }
  function byId(id) { return id ? document.getElementById(id) : null; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var ICONS = {
    play: ['M8 5v14l11-7z'],
    external: ['M14 4h6v6M20 4l-9 9', 'M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'],
    copy: ['M11 9h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z', 'M5 15V6a2 2 0 0 1 2-2h9'],
    share: ['M18 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM6 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM18 16a3 3 0 1 1 0 6 3 3 0 0 1 0-6z', 'M8.6 13.5l6.8 4M15.4 6.5l-6.8 4'],
    refresh: ['M20 11a8 8 0 1 0-2.3 5.7', 'M20 4v7h-7'],
    zoom: ['M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15z', 'M21 21l-5.2-5.2M10.5 7.5v6M7.5 10.5h6'],
    'chevron-down': ['M6 9l6 6 6-6']
  };
  function icon(name) {
    var s = document.createElementNS(SVGNS, 'svg');
    s.setAttribute('class', 'icon');
    s.setAttribute('width', '24'); s.setAttribute('height', '24');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    var filled = name === 'play';
    s.setAttribute('fill', filled ? 'currentColor' : 'none');
    if (!filled) {
      s.setAttribute('stroke', 'currentColor'); s.setAttribute('stroke-width', '2.25');
      s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    }
    (ICONS[name] || []).forEach(function (d) {
      var p = document.createElementNS(SVGNS, 'path');
      p.setAttribute('d', d);
      s.appendChild(p);
    });
    return s;
  }
  /* 제목 글자: ‘·’ 바로 뒤에서 줄을 바꿀 수 있게 <wbr>을 넣습니다 (글자는 그대로).
     낱말을 붙여 쓰는 한국어 제목이 좁은 화면에서 엉뚱한 곳에서 끊기지 않게 하려는 것입니다. */
  function setTitle(node, text) {
    while (node.firstChild) node.removeChild(node.firstChild);
    str(text).split('·').forEach(function (part, i, all) {
      node.appendChild(document.createTextNode(part + (i < all.length - 1 ? '·' : '')));
      if (i < all.length - 1) node.appendChild(document.createElement('wbr'));
    });
    return node;
  }
  function button(cls, label, iconName) {
    var b = el('button', cls);
    b.type = 'button';
    if (iconName) b.appendChild(icon(iconName));
    b.appendChild(document.createTextNode(label));
    return b;
  }
  function getParam(name) {
    try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; }
  }

  /* 그림 주소: https 주소 또는 사이트 안 상대 주소만 씁니다 */
  function safeSrc(src, allowBlob) {
    src = str(src).trim();
    if (/^https:\/\//i.test(src)) {
      try { var u = new URL(src); return u.protocol === 'https:' ? u.href : null; } catch (e) { return null; }
    }
    if (allowBlob && /^blob:/.test(src)) return src;
    if (/^[A-Za-z0-9][A-Za-z0-9_.\/-]*$/.test(src) && src.indexOf('..') < 0 && src.indexOf('//') < 0) return ROOT + src;
    return null;
  }
  function safeHref(u) {
    try { var x = new URL(u); return (x.protocol === 'http:' || x.protocol === 'https:') ? x.href : null; } catch (e) { return null; }
  }

  /* ---------- 날짜 (한국 시간) ---------- */
  function kstParts(iso) {
    var t = Date.parse(str(iso));
    if (isNaN(t)) return null;
    var d = new Date(t + 9 * 3600 * 1000);
    return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() };
  }
  function dayParts(ymd) {
    if (!DAY_RE.test(str(ymd))) return null;
    var a = ymd.split('-');
    return { y: +a[0], m: +a[1], d: +a[2] };
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function ymdString(p) { return p.y + '-' + pad(p.m) + '-' + pad(p.d); }
  function fmtParts(p) { return p ? p.y + '년 ' + p.m + '월 ' + p.d + '일' : ''; }
  function fmtDate(iso) { return fmtParts(kstParts(iso)); }
  function fmtEvent(s, e) {
    var a = dayParts(s);
    if (!a) return '';
    var out = fmtParts(a), b = dayParts(e);
    if (b && e !== s) out += ' ~ ' + (b.y !== a.y ? b.y + '년 ' : '') + b.m + '월 ' + b.d + '일';
    return out;
  }
  function todayKst() { return ymdString(kstParts(new Date().toISOString())); }
  function isPastEvent(p) {
    var last = p.event_end || p.event_start;
    return !!(last && last < todayKst());
  }
  function timeEl(iso, prefix) {
    var t = el('time');
    var p = kstParts(iso);
    if (p) t.dateTime = ymdString(p);
    t.textContent = (prefix || '') + fmtParts(p);
    return t;
  }

  /* ---------- 데이터 정리 ---------- */
  /* 사진: src(화면용), alt(설명), caption(사진 아래 글), after(몇 번째 문단 뒤), thumb(목록용 작은 그림), full(크게 보기용 원본) */
  function normImg(im) {
    if (typeof im === 'string') im = { src: im };
    if (!im || typeof im !== 'object') return null;
    var src = str(im.src);
    if (!src) return null;
    return { src: src, alt: str(im.alt), width: posInt(im.width), height: posInt(im.height),
      caption: str(im.caption).trim(), after: slot(im.after), thumb: str(im.thumb), full: str(im.full) };
  }
  function normVideos(a) {
    return (Array.isArray(a) ? a : []).filter(function (v) {
      return v && typeof v === 'object' && YT_RE.test(str(v.id));
    }).slice(0, 10).map(function (v) { return { id: v.id, after: slot(v.after) }; });
  }
  /* 글자에 숨은 링크: [{ text: '자세히보기', href: 'https://…' }] */
  function normLinks(a) {
    return (Array.isArray(a) ? a : []).filter(function (l) {
      return l && typeof l === 'object' && str(l.text).trim() && str(l.text).length <= 200 && safeHref(str(l.href));
    }).slice(0, 20).map(function (l) { return { text: str(l.text).trim(), href: safeHref(str(l.href)) }; });
  }
  function norm(p) {
    if (!p || typeof p !== 'object') return null;
    var id = str(p.id);
    if (!ID_RE.test(id) || !CATS.hasOwnProperty(p.category)) return null;
    var ev = p.event_date && typeof p.event_date === 'object' ? p.event_date : {};
    var es = p.event_start || ev.start, ee = p.event_end || ev.end;
    return {
      id: id,
      category: p.category,
      title: str(p.title).trim() || '(제목 없음)',
      body: str(p.body),
      youtube_id: YT_RE.test(str(p.youtube_id)) ? p.youtube_id : null,
      video_after: slot(p.video_after),
      extra_videos: normVideos(p.extra_videos),
      links: normLinks(p.links),
      images: (Array.isArray(p.images) ? p.images : []).map(normImg).filter(Boolean),
      published_at: str(p.published_at),
      is_published: p.is_published !== false,
      show_on_home: p.show_on_home !== false,
      event_start: DAY_RE.test(str(es)) ? es : null,
      event_end: DAY_RE.test(str(ee)) ? ee : null
    };
  }
  function byDateDesc(a, b) {
    var x = Date.parse(a.published_at) || 0, y = Date.parse(b.published_at) || 0;
    if (x !== y) return y - x;
    return a.id < b.id ? 1 : (a.id > b.id ? -1 : 0);
  }

  /* ---------- 불러오기 ---------- */
  function fetchJSON(url, opts) {
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 15000) : null;
    var init = { cache: 'no-cache', headers: (opts && opts.headers) || {} };
    if (opts && opts.omitCredentials) init.credentials = 'omit';
    if (ctrl) init.signal = ctrl.signal;
    return fetch(url, init).then(function (r) {
      clearTimeout(timer);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }, function (err) { clearTimeout(timer); throw err; });
  }
  /* 예전 anon 키(eyJ…로 시작하는 JWT)는 apikey와 Authorization 머리글에 함께 넣고,
     새 공개 키(sb_publishable_…)는 JWT가 아니므로 apikey 머리글에만 넣습니다. */
  function sbHeaders(c) {
    var h = { apikey: c.key, Accept: 'application/json' };
    if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(c.key)) h.Authorization = 'Bearer ' + c.key;
    return h;
  }
  function sbGet(c, query) {
    return fetchJSON(c.url + '/rest/v1/posts?' + query, { headers: sbHeaders(c), omitCredentials: true }).then(function (rows) {
      if (!Array.isArray(rows)) throw new Error('bad data');
      return rows;
    });
  }

  var jsonPromise = null;
  function loadJSON() {
    if (!jsonPromise) {
      jsonPromise = fetchJSON(ROOT + 'data/posts.json').then(function (arr) {
        if (!Array.isArray(arr)) throw new Error('bad data');
        return arr.map(norm).filter(function (p) { return p && p.is_published; }).sort(byDateDesc);
      });
      jsonPromise.catch(function () { jsonPromise = null; });
    }
    return jsonPromise;
  }

  /* 글 목록: { cats: [...], limit, offset, home } → { items, more } */
  function list(o) {
    var cats = (o.cats || []).filter(function (k) { return CATS.hasOwnProperty(k); });
    var limit = Math.max(1, Math.min(100, o.limit || 10)), offset = Math.max(0, o.offset || 0);
    var c = config();
    if (c.on) {
      var q = 'select=' + SELECT + '&is_published=eq.true';
      if (cats.length === 1) q += '&category=eq.' + cats[0];
      else if (cats.length > 1) q += '&category=in.(' + cats.join(',') + ')';
      if (o.home) q += '&show_on_home=eq.true';
      q += '&order=published_at.desc,id.desc&limit=' + (limit + 1) + '&offset=' + offset;
      return sbGet(c, q).then(function (rows) {
        var items = rows.slice(0, limit).map(norm).filter(Boolean);
        return { items: items, more: rows.length > limit };
      });
    }
    return loadJSON().then(function (all) {
      var f = all.filter(function (p) {
        return (!cats.length || cats.indexOf(p.category) >= 0) && (!o.home || p.show_on_home);
      });
      return { items: f.slice(offset, offset + limit), more: f.length > offset + limit };
    });
  }

  /* 글 하나: 없으면 null */
  function get(id) {
    id = str(id);
    if (!ID_RE.test(id)) return Promise.resolve(null);
    var c = config();
    if (c.on) {
      return sbGet(c, 'select=' + SELECT + '&is_published=eq.true&id=eq.' + encodeURIComponent(id) + '&limit=1').then(function (rows) {
        return rows.length ? norm(rows[0]) : null;
      });
    }
    return loadJSON().then(function (all) {
      for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
      return null;
    });
  }

  /* ---------- 주소 ---------- */
  function postHref(id) { return ROOT + 'post.html?id=' + encodeURIComponent(id); }
  function listHref(cat) { return cat === 'event' ? ROOT + 'events.html' : ROOT + 'news.html?cat=' + cat; }

  /* ---------- 글 본문: 빈 줄 = 새 문단, 한 줄 바꿈 = <br>, 인터넷 주소 = 링크 ---------- */
  var URL_RE = /https?:\/\/[^\s<>"'“”‘’]+/g;
  function linkEl(text, href) {
    var a = el('a', 'break-any', text);
    a.href = href;
    a.rel = 'noopener';
    return a;
  }
  /* 글자 속 숨은 링크(links)를 찾아 링크로 만듭니다. 링크마다 처음 나오는 한 곳만 바꿉니다. */
  function appendPlain(parent, text, links) {
    while (text) {
      var best = -1, at = -1;
      for (var i = 0; links && i < links.length; i++) {
        if (links[i].used) continue;
        var k = text.indexOf(links[i].text);
        if (k >= 0 && (at < 0 || k < at)) { at = k; best = i; }
      }
      if (best < 0) { parent.appendChild(document.createTextNode(text)); return; }
      if (at > 0) parent.appendChild(document.createTextNode(text.slice(0, at)));
      links[best].used = true;
      parent.appendChild(linkEl(links[best].text, links[best].href));
      text = text.slice(at + links[best].text.length);
    }
  }
  function appendLinked(parent, text, links) {
    var last = 0, m;
    URL_RE.lastIndex = 0;
    while ((m = URL_RE.exec(text))) {
      var raw = m[0].replace(/[.,!?;:)\]}>…·]+$/, '');
      var start = m.index, end = start + raw.length;
      if (end <= start) { URL_RE.lastIndex = m.index + m[0].length; continue; }
      if (start > last) appendPlain(parent, text.slice(last, start), links);
      var href = safeHref(raw);
      parent.appendChild(href ? linkEl(raw, href) : document.createTextNode(raw));
      last = end;
      URL_RE.lastIndex = end;
    }
    if (last < text.length) appendPlain(parent, text.slice(last), links);
  }
  /* 빈 줄로 나눈 문단들 (빈 문단은 뺌) */
  function splitParas(text) {
    return str(text).replace(/\r\n?/g, '\n').split(/\n[ \t\u00a0\u3000]*\n+/).filter(function (para) { return para.trim(); });
  }
  function appendLines(parent, text, links) {
    str(text).replace(/^\n+|\n+$/g, '').split('\n').forEach(function (line, i) {
      if (i) parent.appendChild(el('br'));
      appendLinked(parent, line, links);
    });
  }
  function squash(s) { return str(s).replace(/\s+/g, ' ').trim(); }

  /* ---------- 유튜브: 누르기 전에는 바깥에 아무것도 요청하지 않음 ---------- */
  function renderVideo(container, id, title, nth) {
    var wrap = el('div', 'video');
    var box = el('div', 'video__box');
    var btn = el('button', 'video__facade');
    btn.type = 'button';
    var play = el('span', 'video__play');
    play.setAttribute('aria-hidden', 'true');
    play.appendChild(icon('play'));
    btn.appendChild(play);
    btn.appendChild(el('span', 'video__label', '영상 보기'));
    var name = nth > 1 ? title + ' (' + nth + '번째 영상)' : title;
    btn.appendChild(el('span', 'video__title', name));
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1';
      f.title = '영상: ' + name;
      f.width = '560'; f.height = '315';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      box.replaceChild(f, btn);
      try { f.focus(); } catch (e) {}
    });
    box.appendChild(btn);
    wrap.appendChild(box);
    var ext = el('p', 'video__ext');
    var a = el('a');
    a.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
    a.rel = 'noopener';
    a.appendChild(icon('external'));
    a.appendChild(document.createTextNode('유튜브에서 보기 (다른 사이트)'));
    if (nth > 1) a.appendChild(el('span', 'sr-only', ' (' + nth + '번째 영상)'));
    ext.appendChild(a);
    wrap.appendChild(ext);
    wrap.appendChild(el('p', 'video__help', '‘영상 보기’를 누르면 이 화면에서 바로 영상이 나옵니다.'));
    container.appendChild(wrap);
  }

  function renderFigure(container, p, im, i, opts) {
    var src = safeSrc(im.src, opts.allowBlob);
    if (!src) return;
    var fig = el('figure', 'post__figure');
    var img = el('img');
    img.src = src;
    img.alt = im.alt || ('‘' + p.title + '’ 글의 사진 ' + (i + 1));
    if (im.width && im.height) { img.width = im.width; img.height = im.height; }
    img.loading = 'lazy';
    img.decoding = 'async';
    fig.appendChild(img);
    if (im.caption) {
      var cap = el('figcaption', 'post__caption');
      appendLines(cap, im.caption, null);
      fig.appendChild(cap);
    }
    if (!/^blob:/.test(src)) {
      var a = el('a', 'post__figure-link');
      a.href = (im.full && safeSrc(im.full)) || src;
      a.appendChild(icon('zoom'));
      a.appendChild(document.createTextNode('사진 크게 보기'));
      a.appendChild(el('span', 'sr-only', ' (' + (i + 1) + '번째 사진)'));
      fig.appendChild(a);
    }
    container.appendChild(fig);
  }

  /* 글 하나의 내용(영상, 본문, 사진)을 container에 그립니다. 관리자 미리 보기에서도 씁니다.
     영상과 사진은 저장된 자리(after = 몇 번째 문단 뒤)에 놓습니다.
     자리가 없으면 첫 영상은 맨 위, 사진과 다른 영상은 맨 아래에 놓습니다. */
  function renderPostContent(container, p, opts) {
    opts = opts || {};
    while (container.firstChild) container.removeChild(container.firstChild);
    var paras = (p.body && squash(p.body) !== squash(p.title)) ? splitParas(p.body) : [];
    var links = (p.links || []).map(function (l) { return { text: l.text, href: l.href, used: false }; });
    var media = [], nth = 0;
    if (p.youtube_id) media.push({ at: p.video_after == null ? 0 : p.video_after, video: p.youtube_id, nth: ++nth });
    (p.extra_videos || []).forEach(function (v) { media.push({ at: v.after == null ? Infinity : v.after, video: v.id, nth: ++nth }); });
    (p.images || []).forEach(function (im, i) { media.push({ at: im.after == null ? Infinity : im.after, im: im, i: i }); });
    media.forEach(function (m, k) { m.k = k; });
    media.sort(function (a, b) { return a.at === b.at ? a.k - b.k : (a.at < b.at ? -1 : 1); });
    var body = el('div', 'post__body');
    var mi = 0;
    function mediaUpTo(n) {
      while (mi < media.length && media[mi].at <= n) {
        var m = media[mi++];
        if (m.video) renderVideo(body, m.video, p.title, m.nth);
        else renderFigure(body, p, m.im, m.i, opts);
      }
    }
    for (var i = 0; i < paras.length; i++) {
      mediaUpTo(i);
      var para = el('p');
      appendLines(para, paras[i], links);
      body.appendChild(para);
    }
    mediaUpTo(Infinity);
    if (body.firstChild) container.appendChild(body);
  }

  function badge(text, extra) { return el('span', 'badge' + (extra ? ' ' + extra : ''), text); }

  /* 분류 · 날짜 · 영상 표시 */
  function fillMeta(meta, p, opts) {
    opts = opts || {};
    while (meta.firstChild) meta.removeChild(meta.firstChild);
    if (opts.showCat !== false) meta.appendChild(badge(CATS[p.category]));
    if (p.category === 'event' && p.event_start) {
      meta.appendChild(el('span', null, '행사 날짜: ' + fmtEvent(p.event_start, p.event_end)));
      if (isPastEvent(p)) meta.appendChild(badge('지난 행사', 'badge--past'));
      if (opts.full) meta.appendChild(timeEl(p.published_at, '올린 날: '));
    } else {
      meta.appendChild(timeEl(p.published_at, opts.full ? '올린 날: ' : ''));
    }
    if (p.youtube_id) meta.appendChild(badge('영상', 'badge--video'));
  }

  /* ---------- 알림 상자 ---------- */
  function notice(kind, title, text, retry) {
    var box = el('div', 'notice' + (kind ? ' notice--' + kind : ''));
    if (title) box.appendChild(el('p', 'notice__title', title));
    if (text) box.appendChild(el('p', null, text));
    if (retry) {
      var b = button('btn btn--secondary', '다시 불러오기', 'refresh');
      b.addEventListener('click', retry);
      box.appendChild(b);
    }
    return box;
  }
  var LOADING = '글을 불러오는 중입니다…';
  var ERR_TITLE = '글을 불러오지 못했습니다.';
  var ERR_TEXT = '인터넷 연결을 확인하신 뒤 아래 ‘다시 불러오기’ 단추를 눌러 주세요.';
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---------- 목록 ---------- */
  var NEWS_DEFAULT = { src: 'assets/img/brand/news-default.jpg', width: 1200, height: 675 };

  function cardItem(p, showCat) {
    var li = el('li', 'post-card');
    var a = el('a', 'post-card__link');
    a.href = postHref(p.id);
    var thumb;
    var first = null, firstSrc = null;
    for (var i = 0; i < p.images.length && !firstSrc; i++) {
      first = p.images[i];
      firstSrc = (first.thumb && safeSrc(first.thumb)) || safeSrc(first.src);  /* 목록에는 작은 그림(thumb)이 있으면 그것을 씀 */
    }
    if (firstSrc || !p.youtube_id) {
      thumb = el('span', 'post-card__thumb' + (p.category === 'event' ? ' post-card__thumb--poster' : ''));
      var img = el('img');
      img.src = firstSrc || ROOT + NEWS_DEFAULT.src;
      img.alt = '';
      var w = firstSrc ? first.width : NEWS_DEFAULT.width, h = firstSrc ? first.height : NEWS_DEFAULT.height;
      if (w && h) { img.width = w; img.height = h; }
      img.loading = 'lazy';
      img.decoding = 'async';
      thumb.appendChild(img);
    } else {
      thumb = el('span', 'post-card__thumb post-card__thumb--video');
      thumb.appendChild(icon('play'));
      thumb.appendChild(el('span', null, '영상'));
    }
    thumb.setAttribute('aria-hidden', 'true');
    a.appendChild(thumb);
    var body = el('span', 'post-card__body');
    body.appendChild(setTitle(el('span', 'post-card__title'), p.title));
    var meta = el('span', 'post-card__meta');
    fillMeta(meta, p, { showCat: showCat });
    body.appendChild(meta);
    a.appendChild(body);
    li.appendChild(a);
    return li;
  }

  function briefItem(p) {
    var li = el('li', 'news-brief__item');
    var a = setTitle(el('a', 'news-brief__link'), p.title);
    a.href = postHref(p.id);
    li.appendChild(a);
    var meta = el('p', 'news-brief__meta');
    fillMeta(meta, p, { showCat: false });
    li.appendChild(meta);
    return li;
  }

  function setupCatNav(host, cat) {
    var links = document.querySelectorAll('.catnav__link');
    for (var i = 0; i < links.length; i++) {
      if ((links[i].getAttribute('data-cat') || '') === (cat || '')) links[i].setAttribute('aria-current', 'page');
      else links[i].removeAttribute('aria-current');
    }
    var h = byId(host.getAttribute('data-heading'));
    if (h) h.textContent = cat ? CATS[cat] + ' 글' : '전체 글';
    if (cat) document.title = CATS[cat] + ' - 뉴스·영상 - 트루스코리아';
  }

  function initList(host) {
    var cats = (host.getAttribute('data-cats') || '').split(',').filter(function (k) { return CATS.hasOwnProperty(k); });
    var urlCat = '';
    if (host.hasAttribute('data-url-cat')) {
      var want = getParam('cat');
      if (want === 'event') { location.replace(ROOT + 'events.html'); return; }
      if (want && cats.indexOf(want) >= 0) { urlCat = want; cats = [want]; }
      setupCatNav(host, urlCat);
    }
    var brief = host.getAttribute('data-style') === 'brief';
    var paged = host.hasAttribute('data-page-size');
    var size = parseInt(host.getAttribute(paged ? 'data-page-size' : 'data-limit'), 10) || 10;
    var home = host.hasAttribute('data-home');
    var showCat = cats.length > 1;

    var status = el('div', 'post-list__status');
    status.setAttribute('role', 'status');
    var ul = el('ul', brief ? 'news-brief' : 'post-list__items');
    ul.hidden = true;
    var more = el('p', 'post-list__more');
    more.hidden = true;
    var moreBtn = button('btn btn--secondary', '글 더 보기', 'chevron-down');
    more.appendChild(moreBtn);
    host.appendChild(status);
    host.appendChild(ul);
    host.appendChild(more);

    var offset = 0, busy = false;
    /* retried: ‘다시 불러오기’를 눌러 다시 부른 경우. 눌렀던 단추가 사라지므로 새로 나온 첫 글(또는 알림)로 초점을 옮깁니다. */
    function load(first, retried) {
      if (busy) return;
      busy = true;
      clear(status);
      status.appendChild(el('p', 'notice', LOADING));
      moreBtn.disabled = true;
      list({ cats: cats, limit: size, offset: offset, home: home }).then(function (res) {
        busy = false;
        moreBtn.disabled = false;
        clear(status);
        if (first && !res.items.length) {
          var where = urlCat ? '‘' + CATS[urlCat] + '’에 ' : (cats.length === 1 ? '‘' + CATS[cats[0]] + '’에 ' : '');
          var empty = notice('', null, '아직 ' + where + '올라온 글이 없습니다.');
          status.appendChild(empty);
          if (retried) { empty.tabIndex = -1; empty.focus(); }
          return;
        }
        var firstNew = null;
        res.items.forEach(function (p) {
          var li = brief ? briefItem(p) : cardItem(p, showCat);
          ul.appendChild(li);
          if (!firstNew) firstNew = li;
        });
        ul.hidden = false;
        offset += res.items.length;
        more.hidden = !(paged && res.more);
        if ((!first || retried) && firstNew) {
          var link = firstNew.querySelector('a');
          if (link) link.focus();
        }
      }, function () {
        busy = false;
        moreBtn.disabled = false;
        clear(status);
        status.appendChild(notice('error', ERR_TITLE, ERR_TEXT, function () { load(first, true); }));
      });
    }
    moreBtn.addEventListener('click', function () { load(false); });
    load(true);
  }

  /* ---------- 글 하나 보기 (post.html) ---------- */
  function initPost() {
    var titleEl = byId('post-title'), metaEl = byId('post-meta'), statusEl = byId('post-status');
    var contentEl = byId('post-content'), back = byId('post-back'), crumb = byId('crumb-list');
    var actions = byId('post-actions');
    if (!titleEl || !statusEl || !contentEl) return;
    var id = getParam('id');
    if (id && LEGACY_SAME.hasOwnProperty(id)) { location.replace(postHref(LEGACY_SAME[id])); return; }

    function notFound(retried) {
      titleEl.textContent = '글을 찾을 수 없습니다';
      document.title = '글을 찾을 수 없습니다 - 트루스코리아';
      clear(statusEl);
      /* 옛 홈페이지 글 번호(legacy-게시판-번호)이면 그 분류의 목록으로 안내합니다 */
      var m = /^legacy-([A-Za-z_]+)-\d+$/.exec(str(id));
      var cat = m && LEGACY_LIST.hasOwnProperty(m[1]) ? LEGACY_LIST[m[1]] : null;
      var box = notice('', null, cat
        ? '옛 홈페이지의 글 주소입니다. 이 글은 지금 홈페이지에 없습니다. 아래 단추를 눌러 ‘' + CATS[cat] + '’ 목록에서 다른 글을 보세요.'
        : '주소가 잘못되었거나 글이 내려갔을 수 있습니다. 아래 ‘목록으로’ 단추를 눌러 다른 글을 보세요.');
      if (cat) {
        var go = el('a', 'btn btn--primary', CATS[cat] + ' 목록 보기');
        go.href = listHref(cat);
        box.appendChild(go);
        if (back) { back.href = listHref(cat); back.lastChild.textContent = CATS[cat] + ' 목록으로'; }
      }
      statusEl.appendChild(box);
      if (retried) { titleEl.tabIndex = -1; titleEl.focus(); }
    }

    function load(retried) {
      clear(statusEl);
      statusEl.appendChild(el('p', 'notice', LOADING));
      get(id).then(function (p) {
        clear(statusEl);
        if (!p) { notFound(retried); return; }
        document.title = p.title + ' - 트루스코리아';
        setTitle(titleEl, p.title);
        if (metaEl) fillMeta(metaEl, p, { full: true });
        renderPostContent(contentEl, p);
        var isEvent = p.category === 'event';
        if (back) {
          back.href = listHref(p.category);
          back.lastChild.textContent = CATS[p.category] + ' 목록으로';
        }
        if (crumb && isEvent) {
          crumb.href = ROOT + 'events.html';
          crumb.textContent = '행사·세미나';
        }
        if (isEvent) {
          var links = document.querySelectorAll('.gnb__link, .footer-menu__link');
          for (var i = 0; i < links.length; i++) {
            var href = links[i].getAttribute('href');
            if (href === 'events.html') links[i].setAttribute('aria-current', 'page');
            else if (href === 'news.html') links[i].removeAttribute('aria-current');
          }
        }
        if (actions) addShare(actions, p);
        /* ‘다시 불러오기’ 단추가 사라졌으므로 글 제목으로 초점을 옮깁니다 */
        if (retried) { titleEl.tabIndex = -1; titleEl.focus(); }
      }, function () {
        clear(statusEl);
        statusEl.appendChild(notice('error', ERR_TITLE, ERR_TEXT, function () { load(true); }));
      });
    }
    load(false);
  }

  function addShare(actions, p) {
    var row = actions.querySelector('.btn-row');
    if (!row || row.querySelector('[data-share]')) return;
    var out = el('p', 'post__share-status');
    out.setAttribute('role', 'status');
    if (navigator.share) {
      var sb = button('btn btn--primary', '공유하기', 'share');
      sb.setAttribute('data-share', '');
      sb.addEventListener('click', function () {
        navigator.share({ title: p.title, text: p.title, url: location.href }).catch(function () {});
      });
      row.appendChild(sb);
    }
    var cb = button('btn btn--secondary', '글 주소 복사', 'copy');
    cb.setAttribute('data-share', '');
    cb.addEventListener('click', function () {
      var done = function (ok) {
        out.textContent = ok
          ? '글 주소를 복사했습니다. 카카오톡 대화창에 붙여 넣으시면 이 글을 보낼 수 있습니다.'
          : '복사하지 못했습니다. 화면 위 주소창의 주소를 길게 눌러 복사해 주세요.';
      };
      if (typeof window.TKCopy === 'function') window.TKCopy(location.href, null, done);
      else done(false);
    });
    row.appendChild(cb);
    actions.appendChild(out);
  }

  /* ---------- 유튜브 주소에서 영상 번호 뽑기 (관리자 화면에서 씀) ---------- */
  function parseYouTube(s) {
    s = str(s).trim();
    if (!s) return null;
    if (YT_RE.test(s)) return s;
    var u;
    try { u = new URL(/^https?:\/\//i.test(s) ? s : 'https://' + s); } catch (e) { return null; }
    var h = u.hostname.toLowerCase().replace(/^(www|m|music)\./, '');
    var id = null;
    if (h === 'youtu.be') id = u.pathname.split('/')[1];
    else if (h === 'youtube.com' || h === 'youtube-nocookie.com') {
      var m = u.pathname.match(/^\/(?:embed|shorts|live|v|e)\/([^/?#]+)/);
      id = m ? m[1] : u.searchParams.get('v');
    }
    /* 재생목록 주소(/embed/videoseries?list=…)는 영상 하나가 아니므로 받지 않습니다 */
    return id && YT_RE.test(id) && id !== 'videoseries' ? id : null;
  }

  window.TK = {
    root: ROOT,
    CATS: CATS,
    NEWS_CATS: NEWS_CATS,
    config: config,
    list: list,
    get: get,
    norm: norm,
    fillMeta: fillMeta,
    renderPostContent: renderPostContent,
    parseYouTube: parseYouTube,
    fmtDate: fmtDate,
    kstParts: kstParts,
    safeSrc: safeSrc
  };

  function init() {
    var lists = document.querySelectorAll('[data-tk-list]');
    for (var i = 0; i < lists.length; i++) initList(lists[i]);
    if (document.querySelector('[data-tk-post]')) initPost();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
