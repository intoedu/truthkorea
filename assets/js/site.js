/* 트루스코리아: 글자 크기, 움직임 줄이기, 복사 단추, 머리글, 전체 메뉴, 처음 사진 넘김, 떠오르기, 맨 위로.
   자바스크립트가 꺼져 있어도 글과 메뉴(바닥글의 전체 메뉴)는 모두 보입니다. */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'tk-font-size';
  var MKEY = 'tk-motion';   /* 'reduce' = 움직임 줄이기 켬, 'full' = 끔, 없으면 기기 설정을 따름 */
  root.classList.add('js');

  function store(k, v) { try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  /* ---------- 글자 크기 ---------- */
  function apply(size) {
    if (size === 'large' || size === 'xlarge') root.setAttribute('data-font-size', size);
    else root.removeAttribute('data-font-size');
  }
  function load() { apply(read(KEY)); }
  load();

  /* ---------- 움직임 줄이기 ---------- */
  var mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function motionReduced() {
    var v = read(MKEY);
    if (v === 'reduce') return true;
    if (v === 'full') return false;
    return !!(mq && mq.matches);
  }
  function applyMotion() { root.classList.toggle('reduce-motion', motionReduced()); }
  applyMotion();
  window.TKMotionReduced = function () { return root.classList.contains('reduce-motion'); };
  var motionListeners = [];
  function motionChanged() { for (var i = 0; i < motionListeners.length; i++) motionListeners[i](window.TKMotionReduced()); }
  if (mq) {
    var onMq = function () { applyMotion(); syncMotion(); motionChanged(); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  function sync() {
    var now = root.getAttribute('data-font-size') || 'normal';
    var btns = document.querySelectorAll('[data-set-font-size]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', String(btns[i].getAttribute('data-set-font-size') === now));
    }
  }
  function syncMotion() {
    var on = String(root.classList.contains('reduce-motion'));
    var btns = document.querySelectorAll('[data-motion-toggle]');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', on);
  }

  /* 글자를 복사합니다. el이 있으면 실패했을 때 그 글자를 선택해 두어 직접 복사할 수 있게 합니다. */
  function copyText(text, el, done) {
    function legacy() {
      var ok = false;
      try {
        var sel = window.getSelection(), range = document.createRange(), tmp = null;
        if (!el) {
          tmp = document.createElement('span');
          tmp.textContent = text;
          tmp.style.position = 'fixed'; tmp.style.left = '-9999px'; tmp.style.whiteSpace = 'pre';
          document.body.appendChild(tmp);
        }
        range.selectNodeContents(el || tmp); sel.removeAllRanges(); sel.addRange(range);
        ok = document.execCommand('copy');
        if (ok || tmp) sel.removeAllRanges();
        if (tmp) document.body.removeChild(tmp);
      } catch (e) {}
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
    } else { legacy(); }
  }
  window.TKCopy = copyText;

  /* 알림 글(복사했습니다 등)이 화면 아래 막대에 가려지지 않게, 보이는 곳까지만 살짝 올립니다 */
  function reveal(node) {
    if (!node || !node.getBoundingClientRect) return;
    try { node.scrollIntoView({ block: 'nearest' }); } catch (e) { try { node.scrollIntoView(false); } catch (e2) {} }
  }
  window.TKReveal = reveal;

  /* 숫자를 0부터 한 번 세어 올립니다 (1.2초). 움직임 줄이기면 바로 씁니다. */
  window.TKCountUp = function (el, n, fmt) {
    fmt = fmt || String;
    if (!el) return;
    if (window.TKMotionReduced() || !window.requestAnimationFrame || n < 2) { el.textContent = fmt(n); return; }
    /* 화면 읽기 프로그램에는 바뀌는 숫자 대신 마지막 숫자만 한 번 알립니다 */
    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = fmt(n);
    el.setAttribute('aria-hidden', 'true');
    el.parentNode.insertBefore(sr, el.nextSibling);
    var t0 = null, D = 1200;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(n * e));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = fmt(0);
    requestAnimationFrame(step);
  };

  /* 뒤로 가기로 돌아온 화면(저장된 화면)과 다른 창에도 고른 크기를 다시 맞춥니다 */
  window.addEventListener('pageshow', function (e) { if (e.persisted) { load(); sync(); applyMotion(); syncMotion(); } });
  window.addEventListener('storage', function (e) {
    if (e.key === KEY || e.key === null) { load(); sync(); }
    if (e.key === MKEY || e.key === null) { applyMotion(); syncMotion(); motionChanged(); }
  });

  /* ---------- 머리글: 40px 넘게 내리면 흰 바탕, 600px 넘게 내리면 ‘맨 위로’ ---------- */
  function initScroll() {
    var header = document.querySelector('.site-header');
    var toTop = document.querySelector('.to-top');
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (header) header.classList.toggle('is-scrolled', y > 40);
      if (toTop) toTop.classList.toggle('is-visible', y > 600);
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------- 전체 메뉴 (폰·태블릿) ---------- */
  function initMenu() {
    var menu = document.getElementById('mmenu');
    var btn = document.querySelector('.menu-btn[aria-controls="mmenu"]');
    if (!menu || !btn) return;
    var closeTimer = null;
    function focusables() {
      return Array.prototype.filter.call(menu.querySelectorAll('a[href], button:not([disabled])'), function (el) { return el.offsetWidth || el.offsetHeight; });
    }
    function open() {
      clearTimeout(closeTimer);
      menu.hidden = false;
      root.classList.add('is-locked');
      btn.setAttribute('aria-expanded', 'true');
      void menu.offsetWidth;            /* 바로 다음 그림에서 서서히 나타나게 */
      menu.classList.add('is-open');
      var first = menu.querySelector('[data-mmenu-close]');
      if (first) first.focus();
    }
    function close(back) {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      root.classList.remove('is-locked');
      var wait = window.TKMotionReduced() ? 0 : 320;
      closeTimer = setTimeout(function () { menu.hidden = true; }, wait);
      if (back !== false) btn.focus();
    }
    btn.addEventListener('click', function () { if (menu.hidden || !menu.classList.contains('is-open')) open(); else close(); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-mmenu-close]')) close();
      else if (e.target.closest && e.target.closest('a[href^="#"]')) close(false);
    });
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    /* 넓은 화면으로 바뀌어 ‘메뉴’ 단추가 사라지면 닫습니다 */
    window.addEventListener('resize', function () { if (!menu.hidden && !btn.offsetWidth) close(false); });
  }

  /* ---------- 처음 화면 사진 넘김 ----------
     8초마다 다음 사진(겹쳐 바뀜). 한 바퀴 돌면 멈춥니다. 마우스를 올리거나 단추에 초점이 있거나 다른 탭을 보면 잠시 멈춥니다.
     움직임 줄이기면 멈춘 채로 시작합니다. 글(제목)은 바뀌지 않습니다. */
  function initHero() {
    var hero = document.querySelector('[data-hero]');
    if (!hero) return;
    var slides = hero.querySelectorAll('[data-slide]');
    var n = slides.length;
    var ctrl = hero.querySelector('.hero-ctrl');
    if (n < 2) { if (ctrl) ctrl.hidden = true; return; }
    var DUR = 8000;
    var cur = 0, elapsed = 0, last = 0, raf = 0, steps = 0;
    var paused = window.TKMotionReduced();
    var hold = { hover: false, focus: false, hidden: document.hidden };
    var ring = hero.querySelector('[data-hero-ring]');
    var curEl = hero.querySelector('[data-hero-cur]');
    var status = hero.querySelector('[data-hero-status]');
    var toggle = hero.querySelector('[data-hero-toggle]');
    function pad(i) { return (i < 10 ? '0' : '') + i; }
    function held() { return hold.hover || hold.focus || hold.hidden; }
    function setRing(p) { if (ring) ring.style.strokeDashoffset = String(100 - p * 100); }
    function render() {
      hero.classList.toggle('is-paused', paused);
      hero.classList.toggle('is-hold', !paused && held());
      if (toggle) toggle.setAttribute('aria-label', paused ? '사진 자동 넘김 시작하기' : '사진 자동 넘김 멈추기');
    }
    function show(i, announce) {
      i = (i + n) % n;
      if (i === cur) return;
      slides[cur].classList.remove('is-active');
      slides[cur].setAttribute('aria-hidden', 'true');
      cur = i;
      var img = slides[cur].querySelector('img');
      if (img && img.loading === 'lazy') img.loading = 'eager';
      slides[cur].classList.add('is-active');
      slides[cur].removeAttribute('aria-hidden');
      if (curEl) curEl.textContent = pad(cur + 1);
      if (status && announce) status.textContent = '사진 ' + (cur + 1) + ' / ' + n;
      elapsed = 0; setRing(0);
    }
    function frame(t) {
      raf = 0;
      if (paused) return;
      if (!held()) {
        elapsed += Math.min(100, t - last);
        setRing(Math.min(1, elapsed / DUR));
        if (elapsed >= DUR) {
          steps++;
          show(cur + 1, false);
          if (steps >= n) { paused = true; setRing(0); render(); return; }  /* 한 바퀴 돌았으면 멈춤 */
        }
      }
      last = t;
      raf = requestAnimationFrame(frame);
    }
    function run() {
      if (raf || paused) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; }
    function setPaused(p) {
      paused = p;
      if (p) { stop(); } else { if (steps >= n) steps = 0; run(); }
      render();
    }
    hero.querySelector('[data-hero-prev]').addEventListener('click', function () { show(cur - 1, true); });
    hero.querySelector('[data-hero-next]').addEventListener('click', function () { show(cur + 1, true); });
    if (toggle) toggle.addEventListener('click', function () { setPaused(!paused); });
    hero.addEventListener('mouseenter', function () { hold.hover = true; render(); });
    hero.addEventListener('mouseleave', function () { hold.hover = false; render(); });
    hero.addEventListener('focusin', function () { hold.focus = true; render(); });
    hero.addEventListener('focusout', function (e) { if (!hero.contains(e.relatedTarget)) { hold.focus = false; render(); } });
    document.addEventListener('visibilitychange', function () { hold.hidden = document.hidden; render(); });
    motionListeners.push(function (reduced) { if (reduced) setPaused(true); });
    /* 다음 사진은 첫 사진을 받은 뒤 미리 받아 둡니다 */
    window.addEventListener('load', function () {
      for (var i = 1; i < n; i++) { var im = slides[i].querySelector('img'); if (im) im.loading = 'eager'; }
    });
    render();
    run();
  }

  /* ---------- 화면에 들어올 때 한 번 떠오르기 ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal, .reveal-group');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('is-in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var j = 0; j < els.length; j++) {
      /* 처음 화면에 이미 걸쳐 보이는 것은 바로 떠오르게 (조금만 보여서 기준에 못 미쳐 빈칸으로 남지 않게) */
      if (els[j].getBoundingClientRect().top < vh * 0.9) els[j].classList.add('is-in');
      else io.observe(els[j]);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    sync();
    syncMotion();
    initScroll();
    initMenu();
    initHero();
    initReveal();
    document.addEventListener('click', function (ev) {
      var t = ev.target;
      var fs = t.closest ? t.closest('[data-set-font-size]') : null;
      if (fs) {
        var size = fs.getAttribute('data-set-font-size');
        apply(size); sync();
        store(KEY, size === 'normal' ? null : size);
        return;
      }
      var mt = t.closest ? t.closest('[data-motion-toggle]') : null;
      if (mt) {
        var reduce = !root.classList.contains('reduce-motion');
        store(MKEY, reduce ? 'reduce' : 'full');
        applyMotion(); syncMotion(); motionChanged();
        return;
      }
      var cp = t.closest ? t.closest('[data-copy-target],[data-copy-text]') : null;
      if (cp) {
        var src = cp.hasAttribute('data-copy-target') ? document.getElementById(cp.getAttribute('data-copy-target')) : null;
        var text = cp.getAttribute('data-copy-text') || (src ? (src.textContent || '').replace(/\s+/g, ' ').trim() : '');
        var out = document.getElementById(cp.getAttribute('data-copy-status'));
        if (!text) return;
        copyText(text, src, function (ok) {
          if (!out) return;
          out.classList.toggle('is-error', !ok);
          out.textContent = ok
            ? (cp.getAttribute('data-copy-ok') || '복사했습니다. 붙여 넣을 곳에서 붙여넣기를 하시면 됩니다.')
            : '복사하지 못했습니다. 글자를 길게 눌러 직접 복사해 주세요: ' + text;
          reveal(out);
        });
      }
    });
  });
})();
