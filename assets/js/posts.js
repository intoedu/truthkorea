/* 트루스코리아: 글(뉴스·영상·행사) 불러오기와 보여 주기
   - config.js에 Supabase 주소와 공개 키가 있으면 Supabase에서, 없으면 data/posts.json에서 읽습니다.
   - 글의 제목·본문은 절대 HTML로 넣지 않습니다(textContent와 createElement만 씀).
   - 쪽 안의 표시: [data-tk-list] 글 목록, [data-tk-post] 글 하나 보기, [data-tk-related] 글 아래 ‘다른 소식’,
     [data-tk-film] 후원 화면의 영화 영상(누를 때만 유튜브를 불러옴).
   - 목록 그림 순서: 글의 thumb → 첫 사진(작은 그림 thumb, 없으면 사진) → (옛 글이 아니고 유튜브 영상이 있으면)
     유튜브 미리 보기 그림 → 기본 그림(truthkorea-news-800.webp). 옛 글(legacy-…)은 바깥 그림을 쓰지 않습니다. */
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

  var CATS = { broadcast: '종합뉴스', tknews: 'TK 뉴스', event: '행사·세미나' };
  var NEWS_CATS = ['broadcast', 'tknews'];
  /* 없어진 옛 분류(truth 등)로 들어온 주소는 종합뉴스로 보여 드립니다 */
  var CAT_ALIAS = { truth: 'broadcast', Culture_War: 'broadcast', PresidentYoon: 'broadcast', TK_broadcast: 'broadcast', TK_NEWS: 'tknews' };
  var SELECT = 'id,category,title,body,youtube_id,video_after,extra_videos,links,images,thumb,thumb_w,thumb_h,published_at,show_on_home,event_start,event_end';
  /* 옛 홈페이지 게시판 → 새 목록 (옛 글 번호로 들어왔는데 글이 없을 때 그 목록으로 안내) */
  var LEGACY_LIST = { TK_broadcast: 'broadcast', TK_NEWS: 'tknews', truth: 'broadcast', Culture_War: 'broadcast', PresidentYoon: 'broadcast', event: 'event' };
  /* 옛 홈페이지에서 두 게시판에 똑같이 올라 있던 글: 숨긴 쪽 → 보이는 쪽 (legacy-redirect.js의 SAME과 같게) */
  var LEGACY_SAME = { 'legacy-PresidentYoon-8': 'legacy-truth-12' };
  var ID_RE = /^[A-Za-z0-9_-]{1,100}$/;
  var YT_RE = /^[A-Za-z0-9_-]{11}$/;
  var DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
  var SVGNS = 'http://www.w3.org/2000/svg';
  var NEWS_DEFAULT = { src: 'assets/img/banners/truthkorea-news-800.webp', width: 800, height: 450 };
  /* 목록 카드에 큰 화면용으로 함께 주는 사진의 최대 가로 크기. 관리자 화면에서 올린 1600px 사진은 주지 않습니다
     (폰이 목록에서 큰 사진을 받지 않도록; 폰에는 640px 작은 그림으로 충분합니다). */
  var BIG_MAX = 1200;
  var WEEK = ['일', '월', '화', '수', '목', '금', '토'];

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
    'chevron-down': ['M6 9l6 6 6-6'],
    calendar: ['M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z', 'M3 10h18M8 3v4M16 3v4']
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
  /* 제목 글자: ‘·’ 바로 뒤에서 줄을 바꿀 수 있게 <wbr>을 넣습니다 (글자는 그대로). */
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
  function isLegacy(p) { return /^legacy-/.test(str(p && p.id)); }

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
  function ytThumb(id) { return 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg'; }

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
  function weekday(p) { return WEEK[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()]; }
  function fmtEvent(s, e, withDay) {
    var a = dayParts(s);
    if (!a) return '';
    var out = fmtParts(a) + (withDay ? '(' + weekday(a) + ')' : ''), b = dayParts(e);
    if (b && e !== s) out += ' ~ ' + (b.y !== a.y ? b.y + '년 ' : '') + b.m + '월 ' + b.d + '일' + (withDay ? '(' + weekday(b) + ')' : '');
    return out;
  }
  function todayKst() { return ymdString(kstParts(new Date().toISOString())); }
  function isPastEvent(p) {
    var last = p.event_end || p.event_start;
    return !!(last && last < todayKst());
  }
  function timeEl(iso, prefix, cls) {
    var t = el('time', cls || null);
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
    var cat = CAT_ALIAS.hasOwnProperty(p.category) ? CAT_ALIAS[p.category] : p.category;
    if (!ID_RE.test(id) || !CATS.hasOwnProperty(cat)) return null;
    var ev = p.event_date && typeof p.event_date === 'object' ? p.event_date : {};
    var es = p.event_start || ev.start, ee = p.event_end || ev.end;
    return {
      id: id,
      category: cat,
      title: str(p.title).trim() || '(제목 없음)',
      body: str(p.body),
      youtube_id: YT_RE.test(str(p.youtube_id)) ? p.youtube_id : null,
      video_after: slot(p.video_after),
      extra_videos: normVideos(p.extra_videos),
      links: normLinks(p.links),
      images: (Array.isArray(p.images) ? p.images : []).map(normImg).filter(Boolean),
      thumb: str(p.thumb),
      thumb_w: posInt(p.thumb_w),
      thumb_h: posInt(p.thumb_h),
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

  /* 목록 그림 고르기 (위 순서). big: 넓은 칸에서 쓸 큰 사진(있으면) */
  function thumbOf(p) {
    var big = null;
    var first = p.images && p.images.length ? p.images[0] : null;
    var firstSrc = first ? safeSrc(first.src) : null;
    var t = p.thumb ? safeSrc(p.thumb) : null;
    if (t) {
      var tw = p.thumb_w || 480, th = p.thumb_h || 270;
      /* 목록 그림이 첫 사진을 줄인 것일 때만 첫 사진을 큰 화면용으로 함께 줍니다 */
      var same = first && (p.thumb === first.thumb || p.thumb.replace(/-thumb(\.[A-Za-z]+)$/, '$1') === first.src);
      if (firstSrc && same && first.width > tw && first.width <= BIG_MAX && first.height) big = { src: firstSrc, w: first.width };
      return { src: t, w: tw, h: th, big: big };
    }
    for (var i = 0; p.images && i < p.images.length; i++) {
      var im = p.images[i];
      var main = safeSrc(im.src), small = im.thumb ? safeSrc(im.thumb) : null;
      if (!main && !small) continue;
      var w = im.width || 0, h = im.height || 0;
      if (small) {
        var sw = 640, sh = w && h ? Math.round(640 * h / w) : 360;
        if (main && w > sw && w <= BIG_MAX) big = { src: main, w: w };
        return { src: small, w: sw, h: sh, big: big };
      }
      return { src: main, w: w || 1600, h: h || 900, big: null };
    }
    if (!isLegacy(p) && p.youtube_id) return { src: ytThumb(p.youtube_id), w: 480, h: 360, big: null };
    return { src: ROOT + NEWS_DEFAULT.src, w: NEWS_DEFAULT.width, h: NEWS_DEFAULT.height, big: null };
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

  /* 글 목록: { cats: [...], limit, offset, home, exclude } → { items, more } */
  function list(o) {
    var cats = (o.cats || []).filter(function (k) { return CATS.hasOwnProperty(k); });
    var limit = Math.max(1, Math.min(100, o.limit || 10)), offset = Math.max(0, o.offset || 0);
    var ex = o.exclude && ID_RE.test(o.exclude) ? o.exclude : '';
    var c = config();
    if (c.on) {
      var q = 'select=' + SELECT + '&is_published=eq.true';
      if (cats.length === 1) q += '&category=eq.' + cats[0];
      else if (cats.length > 1) q += '&category=in.(' + cats.join(',') + ')';
      if (o.home) q += '&show_on_home=eq.true';
      if (ex) q += '&id=neq.' + encodeURIComponent(ex);
      q += '&order=published_at.desc,id.desc&limit=' + (limit + 1) + '&offset=' + offset;
      return sbGet(c, q).then(function (rows) {
        var items = rows.slice(0, limit).map(norm).filter(Boolean);
        return { items: items, more: rows.length > limit };
      });
    }
    return loadJSON().then(function (all) {
      var f = all.filter(function (p) {
        return (!cats.length || cats.indexOf(p.category) >= 0) && (!o.home || p.show_on_home) && p.id !== ex;
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
    return str(text).replace(/\r\n?/g, '\n').split(/\n[ \t 　]*\n+/).filter(function (para) { return para.trim(); });
  }
  function appendLines(parent, text, links) {
    str(text).replace(/^\n+|\n+$/g, '').split('\n').forEach(function (line, i) {
      if (i) parent.appendChild(el('br'));
      appendLinked(parent, line, links);
    });
  }
  function squash(s) { return str(s).replace(/\s+/g, ' ').trim(); }

  /* ---------- 유튜브: 누르기 전에는 바깥에 아무것도 요청하지 않음 (미리 보기 그림은 옛 글이면 사이트 안 그림) ---------- */
  function videoPoster(p, id, nth, allowBlob) {
    /* 옛 글: 옮겨 올 때 받아 둔 사이트 안 그림(assets/uploads/legacy/yt-영상번호.jpg)만 씁니다.
       관리자 화면에서 영상을 바꾸면 목록 그림(thumb)이 지워지므로, 그때는 그림 없이 둡니다(바깥 그림을 쓰지 않음). */
    if (isLegacy(p)) {
      return nth === 1 && p.thumb && YT_RE.test(id) ? { src: ROOT + 'assets/uploads/legacy/yt-' + id + '.jpg', w: 480, h: 270 } : null;
    }
    if (nth === 1 && p.thumb) {
      var t = safeSrc(p.thumb, allowBlob);
      if (t) return { src: t, w: p.thumb_w || 480, h: p.thumb_h || 270 };
    }
    return { src: ytThumb(id), w: 480, h: 360 };
  }
  function renderVideo(container, p, id, nth, opts) {
    var title = p.title;
    var wrap = el('div', 'video');
    var box = el('div', 'video__box');
    var btn = el('button', 'video__facade');
    btn.type = 'button';
    var poster = el('span', 'video__poster');
    var pic = videoPoster(p, id, nth, opts && opts.allowBlob);
    if (pic) {
      /* 넓은 화면에서는 작은 미리 보기 그림을 늘리지 않고 가운데 두고, 둘레는 같은 그림을 흐리게 깔아 채웁니다 */
      var amb = el('span', 'video__ambient');
      amb.style.backgroundImage = 'url("' + pic.src.replace(/["\\\n\r]/g, '') + '")';
      poster.appendChild(amb);
      var img = el('img', 'video__img');
      /* 첫 화면에 없는 영상(두 번째 영상, 또는 몇 문단 뒤에 놓인 영상)의 그림은 화면에 다가올 때 받습니다 */
      if (nth > 1 || (p.video_after != null && p.video_after > 0)) img.loading = 'lazy';
      img.decoding = 'async';
      img.alt = '';
      img.width = pic.w; img.height = pic.h;
      img.src = pic.src;
      poster.appendChild(img);
    }
    var disc = el('span', 'video__disc');
    disc.appendChild(icon('play'));
    poster.appendChild(disc);
    btn.appendChild(poster);
    var bar = el('span', 'video__bar');
    bar.appendChild(icon('play'));
    bar.appendChild(document.createTextNode('영상 재생 (유튜브)'));
    var name = nth > 1 ? title + ' (' + nth + '번째 영상)' : title;
    bar.appendChild(el('span', 'sr-only', ': ' + name));
    btn.appendChild(bar);
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1';
      f.title = '영상: ' + name;
      f.width = '560'; f.height = '315';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      f.setAttribute('allowfullscreen', '');
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
    wrap.appendChild(el('p', 'video__help', '‘영상 재생’을 누르면 이 화면에서 바로 영상이 나옵니다.'));
    container.appendChild(wrap);
  }

  function renderFigure(container, p, im, i, opts) {
    var src = safeSrc(im.src, opts.allowBlob);
    if (!src) return;
    var fig = el('figure', 'post__figure' + (p.category === 'event' ? ' post__figure--poster' : ''));
    var img = el('img');
    if (i > 0 || opts.lazyFirst) img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = im.alt || ('‘' + p.title + '’ 글의 사진 ' + (i + 1));
    if (im.width && im.height) { img.width = im.width; img.height = im.height; }
    img.src = src;
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

  /* 행사 날짜 상자 */
  function eventBox(p) {
    var box = el('p', 'event-box');
    box.appendChild(icon('calendar'));
    var t = el('span');
    t.appendChild(el('span', 'event-box__label', '행사 날짜'));
    t.appendChild(el('span', 'event-box__date', fmtEvent(p.event_start, p.event_end, true)));
    box.appendChild(t);
    return box;
  }

  /* 글 하나의 내용(행사 날짜, 영상, 본문, 사진)을 container에 그립니다. 관리자 미리 보기에서도 씁니다.
     영상과 사진은 저장된 자리(after = 몇 번째 문단 뒤)에 놓습니다.
     자리가 없으면 첫 영상은 맨 위, 사진과 다른 영상은 맨 아래에 놓습니다. 행사 글은 포스터를 맨 위에 놓습니다. */
  function renderPostContent(container, p, opts) {
    opts = opts || {};
    while (container.firstChild) container.removeChild(container.firstChild);
    if (p.category === 'event' && p.event_start) container.appendChild(eventBox(p));
    var paras = (p.body && squash(p.body) !== squash(p.title)) ? splitParas(p.body) : [];
    var links = (p.links || []).map(function (l) { return { text: l.text, href: l.href, used: false }; });
    var media = [], nth = 0;
    if (p.youtube_id) media.push({ at: p.video_after == null ? 0 : p.video_after, video: p.youtube_id, nth: ++nth });
    (p.extra_videos || []).forEach(function (v) { media.push({ at: v.after == null ? Infinity : v.after, video: v.id, nth: ++nth }); });
    (p.images || []).forEach(function (im, i) {
      var at = im.after == null ? (p.category === 'event' && i === 0 ? 0 : Infinity) : im.after;
      media.push({ at: at, im: im, i: i });
    });
    media.forEach(function (m, k) { m.k = k; });
    media.sort(function (a, b) { return a.at === b.at ? a.k - b.k : (a.at < b.at ? -1 : 1); });
    var body = el('div', 'post__body');
    var mi = 0;
    function mediaUpTo(n) {
      while (mi < media.length && media[mi].at <= n) {
        var m = media[mi++];
        if (m.video) renderVideo(body, p, m.video, m.nth, opts);
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

  /* 글 보기·미리 보기의 날짜 줄 */
  function fillMeta(meta, p, opts) {
    opts = opts || {};
    while (meta.firstChild) meta.removeChild(meta.firstChild);
    if (opts.showCat) meta.appendChild(badge(CATS[p.category]));
    meta.appendChild(timeEl(p.published_at, '올린 날: '));
    if (p.youtube_id) meta.appendChild(badge('영상'));
    if (p.category === 'event' && isPastEvent(p)) meta.appendChild(el('span', 'chip--past', '지난 행사'));
  }

  /* ---------- 알림 상자 ---------- */
  function notice(kind, title, text, retry) {
    var box = el('div', 'notice' + (kind ? ' notice--' + kind : ''));
    if (title) box.appendChild(el('p', 'notice__title', title));
    if (text) box.appendChild(el('p', null, text));
    if (retry) {
      var b = button('btn btn--outline', '다시 불러오기', 'refresh');
      b.addEventListener('click', retry);
      box.appendChild(b);
    }
    return box;
  }
  var LOADING = '글을 불러오는 중입니다…';
  var ERR_TITLE = '글을 불러오지 못했습니다.';
  var ERR_TEXT = '인터넷 연결을 확인하신 뒤 아래 ‘다시 불러오기’ 단추를 눌러 주세요.';
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---------- 목록 카드 ---------- */
  /* 카드 그림이 화면에서 차지하는 너비 (site.css의 배치와 맞춤): 브라우저가 알맞은 크기의 그림을 고릅니다 */
  var SIZES = {
    card: '(min-width: 1248px) 384px, (min-width: 1024px) 31vw, (min-width: 600px) 50vw, 100vw',
    poster: '(min-width: 1280px) 290px, (min-width: 768px) 33vw, (max-width: 359.98px) 112px, 50vw',
    posterRow: '(min-width: 1280px) 290px, (min-width: 768px) 33vw, 112px'
  };
  /* kind: 'card' | 'lead' | 'row' */
  function cardItem(p, kind, showCat) {
    var isVideo = !!p.youtube_id;
    var li = el('li', 'card' + (kind === 'lead' ? ' card--lead' : '') + (kind === 'row' ? ' card--row' : '') + (isVideo ? ' card--video' : ''));
    var a = el('a', 'card__a');
    a.href = postHref(p.id);
    var media = el('span', 'card__media');
    media.setAttribute('aria-hidden', 'true');
    var t = thumbOf(p);
    var img = el('img', 'card__img');
    img.loading = 'lazy';      /* src보다 먼저 정해야 화면 밖 그림을 미리 받지 않습니다 */
    img.decoding = 'async';
    img.alt = '';
    img.width = t.w; img.height = t.h;
    if (t.big) {
      img.srcset = t.src + ' ' + t.w + 'w, ' + t.big.src + ' ' + t.big.w + 'w';
      img.sizes = SIZES.card;
    }
    img.src = t.src;
    media.appendChild(img);
    if (isVideo) {
      var pill = el('span', 'card__pill');
      pill.appendChild(icon('play'));
      pill.appendChild(document.createTextNode('영상'));
      media.appendChild(pill);
      var disc = el('span', 'card__disc');
      disc.appendChild(icon('play'));
      media.appendChild(disc);
    }
    a.appendChild(media);
    var body = el('span', 'card__body');
    body.appendChild(setTitle(el('span', 'card__title'), p.title));
    var meta = el('span', 'card__meta');
    /* 첫 줄: ‘종합뉴스 · 영상’ (가운뎃점은 CSS가 ‘영상’ 앞에 붙임), 둘째 줄: 날짜. 줄 끝에 점이 홀로 남지 않습니다. */
    if (showCat || isVideo) {
      var labels = el('span', 'card__labels');
      if (showCat) labels.appendChild(el('span', 'card__cat', CATS[p.category]));
      if (isVideo) labels.appendChild(el('span', 'card__kind', '영상'));
      meta.appendChild(labels);
    }
    meta.appendChild(timeEl(p.published_at, '', 'card__date'));
    body.appendChild(meta);
    a.appendChild(body);
    li.appendChild(a);
    return li;
  }

  function posterItem(p) {
    var li = el('li', 'poster');
    var a = el('a', 'poster__a');
    a.href = postHref(p.id);
    var media = el('span', 'poster__media');
    media.setAttribute('aria-hidden', 'true');
    var t = thumbOf(p);
    var img = el('img', 'poster__img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = '';
    img.width = t.w; img.height = t.h;
    if (t.big) {
      img.srcset = t.src + ' ' + t.w + 'w, ' + t.big.src + ' ' + t.big.w + 'w';
      img.sizes = document.documentElement.getAttribute('data-font-size') === 'xlarge' ? SIZES.posterRow : SIZES.poster;
    }
    img.src = t.src;
    media.appendChild(img);
    a.appendChild(media);
    var body = el('span', 'poster__body');
    body.appendChild(setTitle(el('span', 'poster__title'), p.title));
    var meta = el('span', 'poster__meta');
    var d = el('span', 'poster__date');
    d.appendChild(icon('calendar'));
    var dt = el('span');
    if (p.event_start) {
      /* ‘2025년 9월 19일 ~ 9월 20일’: 날짜 하나는 한 줄에, ‘~’ 앞에서만 줄이 바뀜 */
      var parts = fmtEvent(p.event_start, p.event_end).split(' ~ ');
      dt.appendChild(el('span', 'nowrap', parts[0]));
      if (parts[1]) { dt.appendChild(document.createTextNode(' ')); dt.appendChild(el('span', 'nowrap', '~\u00a0' + parts[1])); }
    } else dt.appendChild(timeEl(p.published_at, '', 'nowrap'));
    d.appendChild(dt);
    meta.appendChild(d);
    if (isPastEvent(p)) meta.appendChild(el('span', 'chip--past', '지난 행사'));
    body.appendChild(meta);
    a.appendChild(body);
    li.appendChild(a);
    return li;
  }

  function setupCatNav(host, cat) {
    var links = document.querySelectorAll('.seg__link');
    for (var i = 0; i < links.length; i++) {
      if ((links[i].getAttribute('data-cat') || '') === (cat || '')) links[i].setAttribute('aria-current', 'page');
      else links[i].removeAttribute('aria-current');
    }
    var h = byId(host.getAttribute('data-heading'));
    if (h) h.textContent = cat ? CATS[cat] : '전체 글';
    if (cat) document.title = CATS[cat] + ' - 뉴스·영상 - 트루스코리아';
  }

  /* 목록 하나를 그립니다. o: { cats, style, limit, pageSize, home, exclude, showCat, heading, onDone } */
  function runList(host, o) {
    var style = o.style || 'video';
    var paged = !!o.pageSize;
    var size = o.pageSize || o.limit || 10;

    var skel = host.querySelector('.skel');
    var status = el('p', 'sr-only');
    status.setAttribute('role', 'status');
    var box = el('div', 'post-list__status');
    var ul = el('ul', style === 'poster' ? 'posters' : 'cards cards--' + style);
    ul.hidden = true;
    var more = el('p', 'post-list__more');
    more.hidden = true;
    var moreBtn = button('btn btn--outline', '더 보기', 'chevron-down');
    more.appendChild(moreBtn);
    host.appendChild(status);
    host.appendChild(box);
    host.appendChild(ul);
    host.appendChild(more);

    var offset = 0, busy = false, count = 0;
    function itemFor(p) {
      if (style === 'poster') return posterItem(p);
      return cardItem(p, 'card', o.showCat);   /* 8차: 모든 목록이 같은 카드(3·2·1칸) */
    }
    /* retried: ‘다시 불러오기’를 눌러 다시 부른 경우. 눌렀던 단추가 사라지므로 새로 나온 첫 글(또는 알림)로 초점을 옮깁니다. */
    function load(first, retried) {
      if (busy) return;
      busy = true;
      clear(box);
      status.textContent = LOADING;
      moreBtn.disabled = true;
      list({ cats: o.cats, limit: size, offset: offset, home: o.home, exclude: o.exclude }).then(function (res) {
        busy = false;
        moreBtn.disabled = false;
        if (skel && skel.parentNode) { skel.parentNode.removeChild(skel); skel = null; }
        status.textContent = '';
        if (first && !res.items.length) {
          var where = o.cats.length === 1 ? '‘' + CATS[o.cats[0]] + '’에 ' : '';
          var empty = notice('', null, '아직 ' + where + '올라온 글이 없습니다.');
          box.appendChild(empty);
          if (retried) { empty.tabIndex = -1; empty.focus(); }
          if (o.onDone) o.onDone(0);
          return;
        }
        var firstNew = null;
        res.items.forEach(function (p) {
          var li = itemFor(p);
          ul.appendChild(li);
          count++;
          if (!firstNew) firstNew = li;
        });
        ul.hidden = false;
        offset += res.items.length;
        more.hidden = !(paged && res.more);
        status.textContent = first ? '' : '글 ' + res.items.length + '개를 더 불러왔습니다.';
        if ((!first || retried) && firstNew) {
          var link = firstNew.querySelector('a');
          if (link) link.focus();
        }
        if (o.onDone) o.onDone(count);
      }, function () {
        busy = false;
        moreBtn.disabled = false;
        if (skel && skel.parentNode) { skel.parentNode.removeChild(skel); skel = null; }
        status.textContent = '';
        box.appendChild(notice('error', ERR_TITLE, ERR_TEXT, function () { load(first, true); }));
      });
    }
    moreBtn.addEventListener('click', function () { load(false); });
    load(true);
  }

  function initList(host) {
    var cats = (host.getAttribute('data-cats') || '').split(',').filter(function (k) { return CATS.hasOwnProperty(k); });
    if (host.hasAttribute('data-url-cat')) {
      var want = getParam('cat');
      if (want && CAT_ALIAS.hasOwnProperty(want)) want = CAT_ALIAS[want];
      if (want === 'event') { location.replace(ROOT + 'events.html'); return; }
      var urlCat = want && cats.indexOf(want) >= 0 ? want : '';
      if (urlCat) cats = [urlCat];
      setupCatNav(host, urlCat);
    }
    runList(host, {
      cats: cats,
      style: host.getAttribute('data-style') || 'video',
      limit: parseInt(host.getAttribute('data-limit'), 10) || 10,
      pageSize: parseInt(host.getAttribute('data-page-size'), 10) || 0,
      home: host.hasAttribute('data-home'),
      showCat: cats.length > 1
    });
  }

  /* ---------- 글 하나 보기 (post.html) ---------- */
  function initPost() {
    var titleEl = byId('post-title'), metaEl = byId('post-meta'), statusEl = byId('post-status');
    var contentEl = byId('post-content'), back = byId('post-back'), crumb = byId('crumb-list'), here = byId('crumb-here');
    var chip = byId('post-chip');
    var actions = byId('post-actions');
    /* 글을 다 불러온 뒤에야 ‘목록으로’ 단추와 서명·후원 타일을 보여 줍니다 (불러오는 동안 밀려 내려가지 않게) */
    function unpend() {
      var w = document.querySelectorAll('[data-post-pending]');
      for (var i = 0; i < w.length; i++) w[i].removeAttribute('data-post-pending');
    }
    if (!titleEl || !statusEl || !contentEl) return;
    var id = getParam('id');
    if (id && LEGACY_SAME.hasOwnProperty(id)) { location.replace(postHref(LEGACY_SAME[id])); return; }

    function setBack(cat) {
      if (!back) return;
      back.href = listHref(cat);
      var label = back.querySelector('span');
      if (label) label.textContent = CATS[cat] + ' 목록으로';
    }
    function setCrumbs(cat) {
      if (cat === 'event') {
        if (crumb) {
          crumb.href = ROOT + 'events.html';
          crumb.textContent = '행사·세미나';
          var sep = crumb.parentNode.querySelector('.breadcrumb__sep');
          if (sep) sep.parentNode.removeChild(sep);
        }
        if (here) here.parentNode.removeChild(here);
        here = null;
        return;
      }
      if (here) {
        clear(here);
        here.removeAttribute('aria-current');
        var a = el('a', 'breadcrumb__link', CATS[cat]);
        a.href = listHref(cat);
        here.appendChild(a);
      }
    }
    function markEventsMenu() {
      var links = document.querySelectorAll('.gnb__link, .footer-menu__link');
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (href === 'events.html') links[i].setAttribute('aria-current', 'page');
        else if (href === 'news.html') links[i].removeAttribute('aria-current');
      }
    }

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
        var go = el('a', 'btn btn--navy', CATS[cat] + ' 목록 보기');
        go.href = listHref(cat);
        box.appendChild(go);
        setBack(cat);
      }
      statusEl.appendChild(box);
      unpend();
      if (retried) { titleEl.tabIndex = -1; titleEl.focus(); }
    }

    function load(retried) {
      clear(statusEl);
      statusEl.appendChild(el('p', 'notice', LOADING));
      /* 불러오는 동안 자리를 넉넉히 잡아 바닥글이 화면 밖에 있게 합니다 (글이 들어올 때 화면이 덜컥거리지 않게) */
      statusEl.classList.add('is-loading');
      get(id).then(function (p) {
        clear(statusEl);
        statusEl.classList.remove('is-loading');
        if (!p) { notFound(retried); return; }
        document.title = p.title + ' - 트루스코리아';
        setTitle(titleEl, p.title);
        if (chip) { chip.textContent = CATS[p.category]; chip.hidden = false; }
        if (metaEl) fillMeta(metaEl, p, {});
        renderPostContent(contentEl, p);
        var isEvent = p.category === 'event';
        setBack(p.category);
        setCrumbs(p.category);
        if (isEvent) {
          markEventsMenu();
          var give = document.querySelector('[data-next-give]');
          if (give) give.parentNode.removeChild(give);  /* 행사 글 아래에는 후원 타일을 두지 않음 */
        }
        if (actions) addShare(actions, p);
        unpend();
        initRelated(p);
        /* ‘다시 불러오기’ 단추가 사라졌으므로 글 제목으로 초점을 옮깁니다 */
        if (retried) { titleEl.tabIndex = -1; titleEl.focus(); }
      }, function () {
        clear(statusEl);
        statusEl.classList.remove('is-loading');
        unpend();
        statusEl.appendChild(notice('error', ERR_TITLE, ERR_TEXT, function () { load(true); }));
      });
    }
    load(false);
  }

  /* 글 아래 ‘다른 소식’: 같은 분류의 다른 글 3개 */
  function initRelated(p) {
    var host = document.querySelector('[data-tk-related]');
    var sec = byId('post-more');
    if (!host || host.getAttribute('data-done')) return;
    host.setAttribute('data-done', '1');
    var h = byId('more-title');
    if (h) h.textContent = p.category === 'event' ? '다른 행사·세미나' : '다른 ' + CATS[p.category] + ' 소식';
    /* 포스터 3장: 폰(두 칸)에서는 2장만, 넓은 화면(세 칸)에서는 3장을 보여 줍니다 (한 장만 홀로 남지 않게) */
    if (p.category === 'event') host.classList.add('post-list--three-posters');
    runList(host, {
      cats: [p.category],
      style: p.category === 'event' ? 'poster' : 'rows',
      limit: 3,
      exclude: p.id,
      showCat: false,
      onDone: function (n) { if (sec) sec.hidden = !n; }
    });
  }

  /* 공유 단추 하나: 휴대전화의 ‘공유’ 기능이 있으면 공유, 없으면 글 주소 복사 */
  function addShare(actions, p) {
    var row = actions.querySelector('.btn-row');
    if (!row || row.querySelector('[data-share]')) return;
    var out = el('p', 'post__share-status');
    out.setAttribute('role', 'status');
    function copyLink() {
      var done = function (ok) {
        out.textContent = ok
          ? '글 주소를 복사했습니다. 카카오톡 대화창에 붙여 넣으시면 이 글을 보낼 수 있습니다.'
          : '복사하지 못했습니다. 화면 위 주소창의 주소를 길게 눌러 복사해 주세요.';
        if (typeof window.TKReveal === 'function') window.TKReveal(out);
      };
      if (typeof window.TKCopy === 'function') window.TKCopy(location.href, null, done);
      else done(false);
    }
    var b;
    if (navigator.share) {
      b = button('btn btn--navy', '공유하기', 'share');
      b.addEventListener('click', function () {
        navigator.share({ title: p.title, text: p.title, url: location.href }).catch(function (e) {
          if (!e || e.name !== 'AbortError') copyLink();
        });
      });
    } else {
      b = button('btn btn--navy', '글 주소 복사', 'copy');
      b.addEventListener('click', copyLink);
    }
    b.setAttribute('data-share', '');
    row.appendChild(b);
    actions.appendChild(out);
  }

  /* 후원 화면의 영화 영상: 누르면 그 자리에서 유튜브를 엽니다 (누르기 전에는 유튜브에 아무것도 요청하지 않음) */
  function initFilm(box) {
    var id = box.getAttribute('data-tk-film');
    var play = box.querySelector('.film__play');
    var poster = box.querySelector('.film__poster');
    if (!YT_RE.test(str(id)) || !play || !poster) return;
    var title = box.getAttribute('data-tk-film-title') || '영상';
    var b = el('button', 'film__play');
    b.type = 'button';
    while (play.firstChild) b.appendChild(play.firstChild);
    var note = b.querySelector('.film__label');
    if (note) { clear(note); note.textContent = '영상 재생 (유튜브)'; }
    play.parentNode.replaceChild(b, play);
    b.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.className = 'film__frame';
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1';
      f.title = '영상: ' + title;
      f.width = '560'; f.height = '315';
      f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      poster.parentNode.replaceChild(f, poster);
      try { f.focus(); } catch (e) {}
    });
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
    thumbOf: thumbOf,
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
    var films = document.querySelectorAll('[data-tk-film]');
    for (var j = 0; j < films.length; j++) initFilm(films[j]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
