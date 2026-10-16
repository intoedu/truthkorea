/* 트루스코리아: 서명운동 화면(sign.html)의 안내 부분 (옛 서명 화면을 옮긴 것)
   - 참가 신청 인원: data/sign-stats.json {count, goal, as_of}을 읽어 숫자 칸과 ‘N명 남았습니다’를 맞추고, 화면에 들어올 때 한 번 세어 올립니다.
     (구글 설문의 실제 수를 읽을 수 없으므로 실시간이 아닙니다. 관리자가 이 파일의 숫자와 날짜를 고칩니다.)
     파일을 읽지 못하거나 자바스크립트가 꺼져 있으면 sign.html에 적힌 숫자가 그대로 보입니다.
   - 명단: data/sign-list.json의 people[]을 9명씩 보여 줍니다. 9명보다 많을 때만 ‘이전/다음 명단’ 단추가 나옵니다.
   - 유튜브: [data-yt] 칸의 영상은 누를 때만 youtube-nocookie에서 불러옵니다(그 전에는 사이트 안 그림만 보임).
   - ‘움직임 줄이기’면 세어 올리지 않고 바로 숫자를 씁니다. 화면에 넣는 글자는 모두 textContent로 넣습니다. */
(function () {
  'use strict';
  var YT_RE = /^[A-Za-z0-9_-]{11}$/;
  var ROOT = (function () {
    var s = document.querySelector('script[src*="sign-page.js"]');
    return s ? s.getAttribute('src').replace(/assets\/js\/sign-page\.js.*$/, '') : '';
  })();

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function isInt(n) { return typeof n === 'number' && isFinite(n) && n >= 0 && Math.floor(n) === n; }
  function reduced() { return typeof window.TKMotionReduced === 'function' ? window.TKMotionReduced() : false; }
  function getJSON(path) {
    if (!window.fetch) return Promise.reject(new Error('no fetch'));
    return fetch(ROOT + path, { cache: 'no-cache', credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
  }
  function onceVisible(node, fn) {
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (es) {
      for (var i = 0; i < es.length; i++) if (es[i].isIntersecting) { io.disconnect(); fn(); return; }
    }, { threshold: 0.4 });
    io.observe(node);
  }

  /* ---------- 참가 신청 인원 ---------- */
  function padDigits(n) {
    var s = String(n);
    while (s.length < 6) s = '0' + s;
    return s;
  }
  function buildTiles(box, n) {
    while (box.firstChild) box.removeChild(box.firstChild);
    var s = padDigits(n), tiles = [];
    for (var i = 0; i < s.length; i++) {
      var t = el('span', 'sg-tile', s.charAt(i));
      box.appendChild(t);
      tiles.push(t);
      var rest = s.length - i - 1;
      if (rest && rest % 3 === 0) box.appendChild(el('span', 'sg-tiles__sep', ','));
    }
    return tiles;
  }
  function setTiles(tiles, n) {
    var s = String(n);
    while (s.length < tiles.length) s = '0' + s;
    for (var i = 0; i < tiles.length; i++) tiles[i].textContent = s.charAt(i);
  }
  function animate(D, step) {
    if (reduced() || !window.requestAnimationFrame) { step(1); return; }
    var t0 = null;
    function f(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / D);
      step(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(f);
    }
    step(0);
    requestAnimationFrame(f);
  }
  function asOfText(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ''));
    return m ? m[1] + '년 ' + Number(m[2]) + '월 ' + Number(m[3]) + '일' : null;
  }
  function goalText(g) {
    if (g % 10000 === 0) return fmt(g / 10000) + '만 명';
    return fmt(g) + '명';
  }
  function initStats() {
    var box = document.querySelector('[data-sg-stats]');
    if (!box) return;
    var tilesBox = box.querySelector('[data-sg-tiles]');
    var sr = box.querySelector('[data-sg-count-sr]');
    var asof = box.querySelector('[data-sg-asof]');
    var left = document.querySelector('[data-sg-left]');
    var goalEl = document.querySelector('[data-sg-goal-text]');
    getJSON('data/sign-stats.json').then(function (d) {
      if (!d || !isInt(d.count)) return;
      var count = d.count;
      var goal = isInt(d.goal) && d.goal > 0 ? d.goal : null;
      var date = asOfText(d.as_of);
      if (date && asof) asof.textContent = date;
      if (sr) sr.textContent = fmt(count) + '명';
      var tiles = buildTiles(tilesBox, count);
      if (goal) {
        if (goalEl) goalEl.textContent = goalText(goal);
        if (left) left.textContent = fmt(Math.max(0, goal - count));
      }
      if (count < 2 || reduced()) return;
      setTiles(tiles, 0);
      onceVisible(tilesBox, function () {
        animate(1400, function (e) { setTiles(tiles, Math.round(count * e)); });
      });
    }).catch(function () { /* sign.html에 적힌 숫자를 그대로 둡니다 */ });
  }

  /* ---------- 명단 (9명씩) ---------- */
  function initList() {
    var wrap = document.querySelector('[data-sg-list]');
    if (!wrap) return;
    var grid = wrap.querySelector('[data-sg-list-grid]');
    var nav = wrap.querySelector('[data-sg-list-nav]');
    var prev = wrap.querySelector('[data-sg-list-prev]');
    var next = wrap.querySelector('[data-sg-list-next]');
    var status = wrap.querySelector('[data-sg-list-status]');
    getJSON('data/sign-list.json').then(function (d) {
      var people = (d && d.people && d.people.length ? d.people : []).filter(function (p) {
        return p && typeof p.name === 'string' && p.name.trim() && typeof p.img === 'string' && /^assets\/img\/[A-Za-z0-9_./-]+$/.test(p.img) && p.img.indexOf('..') < 0;
      });
      if (!people.length) return;
      var per = isInt(d.per_page) && d.per_page > 0 ? d.per_page : 9;
      var pages = Math.ceil(people.length / per), cur = 0;
      function render(focusBtn) {
        while (grid.firstChild) grid.removeChild(grid.firstChild);
        people.slice(cur * per, cur * per + per).forEach(function (p) {
          var li = el('li', 'sg-person');
          var img = el('img', 'sg-person__img');
          img.src = ROOT + p.img;
          img.width = isInt(p.w) ? p.w : 230;
          img.height = isInt(p.h) ? p.h : 348;
          img.alt = p.name.trim() + ' 의원 사진';
          img.loading = 'lazy';
          img.decoding = 'async';
          li.appendChild(img);
          grid.appendChild(li);
        });
        if (pages > 1) {
          prev.disabled = cur === 0;
          next.disabled = cur === pages - 1;
          status.textContent = (cur + 1) + ' / ' + pages + '쪽';
          if (focusBtn && focusBtn.disabled) (focusBtn === prev ? next : prev).focus();
        }
      }
      if (pages > 1) {
        nav.hidden = false;
        prev.addEventListener('click', function () { if (cur > 0) { cur--; render(prev); } });
        next.addEventListener('click', function () { if (cur < pages - 1) { cur++; render(next); } });
      }
      render();
    }).catch(function () { /* sign.html에 적힌 9명을 그대로 둡니다 */ });
  }

  /* ---------- 유튜브: 누를 때만 불러오기 ---------- */
  function initVideos() {
    var boxes = document.querySelectorAll('[data-yt]');
    for (var i = 0; i < boxes.length; i++) (function (box) {
      var id = box.getAttribute('data-yt');
      var v = box.querySelector('.sg-video');
      var link = v && v.querySelector('.sg-video__link');
      if (!YT_RE.test(id || '') || !link) return;
      var title = v.getAttribute('data-yt-title') || '영상';
      var b = el('button', 'sg-video__link');
      b.type = 'button';
      while (link.firstChild) b.appendChild(link.firstChild);
      var label = b.querySelector('.sg-video__label');
      if (label) label.textContent = '영상 재생 (유튜브)';
      var note = b.querySelector('.sg-video__note');
      if (note) note.parentNode.removeChild(note);
      link.parentNode.replaceChild(b, link);
      b.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1';
        f.title = '영상: ' + title;
        f.width = '560'; f.height = '315';
        f.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture; fullscreen');
        f.setAttribute('allowfullscreen', '');
        f.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        v.replaceChild(f, b);
        try { f.focus(); } catch (e) {}
      });
    })(boxes[i]);
  }

  function init() { initStats(); initList(); initVideos(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
