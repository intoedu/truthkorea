/* 국민주권운동: 글자 크기 조절과 복사 단추. 자바스크립트가 꺼져 있어도 사이트는 모두 동작합니다. */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'kmj-font-size';
  root.classList.add('js');

  function apply(size) {
    if (size === 'large' || size === 'xlarge') root.setAttribute('data-font-size', size);
    else root.removeAttribute('data-font-size');
  }
  function load() {
    try { apply(localStorage.getItem(KEY)); } catch (e) { apply(null); /* 저장소를 못 쓰면 '보통' */ }
  }
  load();

  function sync() {
    var now = root.getAttribute('data-font-size') || 'normal';
    var btns = document.querySelectorAll('[data-set-font-size]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', String(btns[i].getAttribute('data-set-font-size') === now));
    }
  }

  function copyFrom(el, done) {
    var text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    function legacy() {
      var ok = false;
      try {
        var sel = window.getSelection(), range = document.createRange();
        range.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(range);
        ok = document.execCommand('copy');
        if (ok) sel.removeAllRanges(); /* 실패하면 선택을 남겨 직접 복사할 수 있게 */
      } catch (e) {}
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
    } else { legacy(); }
  }

  /* 뒤로 가기로 돌아온 화면(저장된 화면)과 다른 창에도 고른 크기를 다시 맞춥니다 */
  window.addEventListener('pageshow', function (e) { if (e.persisted) { load(); sync(); } });
  window.addEventListener('storage', function (e) { if (e.key === KEY || e.key === null) { load(); sync(); } });

  document.addEventListener('DOMContentLoaded', function () {
    sync();
    document.addEventListener('click', function (ev) {
      var t = ev.target;
      var fs = t.closest ? t.closest('[data-set-font-size]') : null;
      if (fs) {
        var size = fs.getAttribute('data-set-font-size');
        apply(size); sync();
        try { if (size === 'normal') localStorage.removeItem(KEY); else localStorage.setItem(KEY, size); } catch (e) {}
        return;
      }
      var cp = t.closest ? t.closest('[data-copy-target]') : null;
      if (cp) {
        var src = document.getElementById(cp.getAttribute('data-copy-target'));
        var out = document.getElementById(cp.getAttribute('data-copy-status'));
        if (!src) return;
        copyFrom(src, function (ok) {
          if (out) out.textContent = ok
            ? '복사했습니다. 붙여 넣을 곳에서 붙여넣기를 하시면 됩니다.'
            : '복사하지 못했습니다. 글자를 길게 눌러 직접 복사해 주세요.';
        });
      }
    });
  });
})();
