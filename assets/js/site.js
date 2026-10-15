/* 트루스코리아: 글자 크기 조절과 복사 단추. 자바스크립트가 꺼져 있어도 글과 메뉴는 모두 보입니다. */
(function () {
  'use strict';
  var root = document.documentElement;
  var KEY = 'tk-font-size';
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

  /* 알림 글(복사했습니다 등)이 화면 아래 막대에 가려지지 않게, 보이는 곳까지만 살짝 올립니다
     (html의 scroll-padding-bottom이 막대 높이만큼 비워 둡니다) */
  function reveal(node) {
    if (!node || !node.getBoundingClientRect) return;
    try { node.scrollIntoView({ block: 'nearest' }); } catch (e) { try { node.scrollIntoView(false); } catch (e2) {} }
  }
  window.TKReveal = reveal;

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
