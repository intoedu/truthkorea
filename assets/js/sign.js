/* 트루스코리아: 서명운동 (처음 화면의 서명운동 띠, sign.html의 서명 받기)
   - config.js에 Supabase 주소와 공개 키가 없으면 ‘서명 접수를 준비하고 있습니다’ 안내만 보이고 서명 칸은 나오지 않습니다.
   - 있으면: 이름·휴대폰(필수), 사는 곳·손글씨 서명(선택), 개인정보 동의(필수)를 받아
     손글씨 서명 그림(PNG)을 비공개 저장소(signatures)에 먼저 올리고, 서명 줄을 public.signatures 표에 넣습니다.
   - 넣은 서명은 관리자만 볼 수 있습니다(데이터베이스 규칙). 방문자에게는 서명한 사람 ‘수’만 보입니다.
   - 같은 휴대폰 번호로 두 번 서명하면 데이터베이스가 23505 오류를 내고, ‘이미 서명하셨습니다’라고 알려 드립니다.
   - 화면에 넣는 글자는 모두 textContent로 넣습니다. */
(function () {
  'use strict';
  var PETITION = 'main';
  var CONSENT_VERSION = '2026-10-v1';   /* 동의 안내문을 바꾸면 이 값도 바꿉니다 */
  var MIN_FILL_MS = 3000;               /* 화면을 연 뒤 3초 안에 제출하면 기계로 봅니다 */
  var MAX_PNG = 200 * 1024;
  var PHONE_TEXT = '010-2705-5000';
  var MSG = {
    name: '이름을 적어 주세요.',
    phoneEmpty: '휴대폰 번호를 적어 주세요.',
    phoneBad: '휴대폰 번호를 다시 확인해 주세요. 예: 010-1234-5678',
    consent: '개인정보 수집·이용에 동의해 주셔야 서명하실 수 있습니다.',
    net: '잠시 연결이 원활하지 않습니다. 잠시 뒤 다시 눌러 주세요. 계속 안 되면 전화(' + PHONE_TEXT + ')로 알려 주세요.',
    bad: '서명을 접수하지 못했습니다. 적으신 내용을 다시 확인하신 뒤 눌러 주세요. 계속 안 되면 전화(' + PHONE_TEXT + ')로 알려 주세요.',
    wait: '잠시 뒤 다시 눌러 주세요.'
  };

  function config() {
    var c = window.TK_CONFIG || {};
    var url = typeof c.supabaseUrl === 'string' ? c.supabaseUrl.trim().replace(/\/+$/, '') : '';
    var key = typeof c.supabaseAnonKey === 'string' ? c.supabaseAnonKey.trim() : '';
    if (!/^https:\/\/[A-Za-z0-9.-]+(:\d+)?$/.test(url) && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(url)) url = '';
    return { url: url, key: key, on: !!(url && key) };
  }
  function headers(c, extra) {
    var h = { apikey: c.key };
    if (/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(c.key)) h.Authorization = 'Bearer ' + c.key;
    for (var k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) h[k] = extra[k];
    return h;
  }
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function setState(on) {
    var nodes = document.querySelectorAll('[data-sign-state]');
    for (var i = 0; i < nodes.length; i++) nodes[i].hidden = (nodes[i].getAttribute('data-sign-state') === 'on') !== on;
  }
  function withTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var t = setTimeout(function () { reject(new Error('timeout')); }, ms);
      promise.then(function (v) { clearTimeout(t); resolve(v); }, function (e) { clearTimeout(t); reject(e); });
    });
  }

  /* 서명한 사람 수 (실패하면 null) */
  function fetchCount(c) {
    return withTimeout(fetch(c.url + '/rest/v1/rpc/signature_count', {
      method: 'POST',
      credentials: 'omit',
      headers: headers(c, { 'Content-Type': 'application/json', Accept: 'application/json' }),
      body: JSON.stringify({ p: PETITION })
    }), 15000).then(function (r) {
      if (!r.ok) return null;
      return r.json().then(function (n) { n = Number(n); return n >= 0 && Math.floor(n) === n ? n : null; });
    }).catch(function () { return null; });
  }
  function fmtNum(n) { try { return n.toLocaleString('ko-KR'); } catch (e) { return String(n); } }

  /* ---------- 처음 화면의 서명운동 띠 ---------- */
  function initBand(c) {
    var band = document.querySelector('[data-sign-band]');
    if (!band || !c.on) return;
    setState(true);
    var box = band.querySelector('[data-sign-count]'), num = band.querySelector('[data-sign-count-num]');
    fetchCount(c).then(function (n) {
      if (n && n >= 1 && box && num) { num.textContent = fmtNum(n); box.hidden = false; }
    });
  }

  /* ---------- 손글씨 서명 칸 ---------- */
  function Pad(canvas, wrap, status) {
    var ctx = canvas.getContext('2d');
    var strokes = [], cur = null, cssW = 0, cssH = 0, ratio = 1;
    function size() {
      var r = canvas.getBoundingClientRect();
      if (!r.width) return;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      cssW = r.width; cssH = r.height;
      canvas.width = Math.round(cssW * ratio);
      canvas.height = Math.round(cssH * ratio);
      redraw();
    }
    function line(s) {
      if (!s.length) return;
      ctx.beginPath();
      ctx.moveTo(s[0][0] * cssW, s[0][1] * cssH);
      if (s.length === 1) ctx.lineTo(s[0][0] * cssW + .1, s[0][1] * cssH + .1);
      for (var i = 1; i < s.length; i++) ctx.lineTo(s[i][0] * cssW, s[i][1] * cssH);
      ctx.stroke();
    }
    function prep() {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#0B1F4D';
    }
    function redraw() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      prep();
      strokes.forEach(line);
    }
    function pt(ev) {
      var r = canvas.getBoundingClientRect();
      return [Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (ev.clientY - r.top) / r.height))];
    }
    canvas.addEventListener('pointerdown', function (ev) {
      if (ev.button > 0) return;
      ev.preventDefault();
      try { canvas.setPointerCapture(ev.pointerId); } catch (e) {}
      try { canvas.focus({ preventScroll: true }); } catch (e) {}
      cur = [pt(ev)];
      strokes.push(cur);
      redraw();
      if (!wrap.classList.contains('is-drawn')) wrap.classList.add('is-drawn');
    });
    canvas.addEventListener('pointermove', function (ev) {
      if (!cur) return;
      ev.preventDefault();
      cur.push(pt(ev));
      var n = cur.length;
      prep();
      ctx.beginPath();
      ctx.moveTo(cur[n - 2][0] * cssW, cur[n - 2][1] * cssH);
      ctx.lineTo(cur[n - 1][0] * cssW, cur[n - 1][1] * cssH);
      ctx.stroke();
    });
    function end() {
      if (!cur) return;
      cur = null;
      status.textContent = '손글씨 서명을 그렸습니다. 다시 하시려면 ‘지우기’를 누르세요.';
    }
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    var lastW = 0;
    window.addEventListener('resize', function () {
      var w = canvas.getBoundingClientRect().width;
      if (w && Math.abs(w - lastW) > 1) { lastW = w; size(); }
    });
    lastW = canvas.getBoundingClientRect().width;
    size();
    this.clear = function () {
      strokes = [];
      cur = null;
      redraw();
      wrap.classList.remove('is-drawn');
      status.textContent = '손글씨 서명을 지웠습니다.';
    };
    this.isEmpty = function () { return !strokes.length; };
    /* 흰 바탕 PNG로 내보냅니다. 200KB가 넘으면 작게 다시 그립니다. */
    this.toBlob = function () {
      function render(scale) {
        var c2 = document.createElement('canvas');
        c2.width = Math.max(1, Math.round(cssW * scale));
        c2.height = Math.max(1, Math.round(cssH * scale));
        var x = c2.getContext('2d');
        x.fillStyle = '#FFFFFF';
        x.fillRect(0, 0, c2.width, c2.height);
        x.setTransform(scale, 0, 0, scale, 0, 0);
        x.lineWidth = 3.5; x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = '#0B1F4D';
        strokes.forEach(function (s) {
          x.beginPath();
          x.moveTo(s[0][0] * cssW, s[0][1] * cssH);
          if (s.length === 1) x.lineTo(s[0][0] * cssW + .1, s[0][1] * cssH + .1);
          for (var i = 1; i < s.length; i++) x.lineTo(s[i][0] * cssW, s[i][1] * cssH);
          x.stroke();
        });
        return new Promise(function (resolve, reject) {
          c2.toBlob(function (b) { b ? resolve(b) : reject(new Error('toBlob')); }, 'image/png');
        });
      }
      return render(ratio).then(function (b) { return b.size <= MAX_PNG ? b : render(1); }).then(function (b) {
        if (b.size > MAX_PNG) throw new Error('too big');
        return b;
      });
    };
  }

  /* ---------- 서명 받기 (sign.html) ---------- */
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var b = new Uint8Array(16);
    crypto.getRandomValues(b);
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    var h = Array.prototype.map.call(b, function (x) { return (x < 16 ? '0' : '') + x.toString(16); }).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  }
  /* 숫자만 남기고, +82(국가 번호)는 0으로 바꿉니다 */
  function normPhone(v) {
    var s = String(v || '').trim();
    var d = s.replace(/\D/g, '');
    if (/^\+?\s*82/.test(s) || /^82(1|2|[3-6]\d|70)/.test(d) && d.length >= 11) d = '0' + d.replace(/^82/, '').replace(/^0/, '');
    return d;
  }
  function validPhone(d) { return /^0[1-9]\d{7,9}$/.test(d); }

  function initForm(c) {
    var form = $('sign-form');
    if (!form) return;
    var started = Date.now();
    var name = $('f-name'), phone = $('f-phone'), region = $('f-region'), consent = $('f-consent'), hp = $('f-website');
    var summary = $('sign-errors'), sumList = $('sign-error-list'), noticeBox = $('sign-notice'), submit = $('sign-submit');
    var canvas = $('f-pad'), padWrap = canvas ? canvas.parentNode : null;
    var pad = canvas ? new Pad(canvas, padWrap, $('f-pad-status')) : null;
    var clearBtn = $('f-pad-clear');
    if (clearBtn && pad) clearBtn.addEventListener('click', function () { pad.clear(); });
    var sending = false;

    var FIELDS = [
      { input: name, err: $('f-name-error'), hint: 'f-name-hint' },
      { input: phone, err: $('f-phone-error'), hint: 'f-phone-hint' },
      { input: consent, err: $('f-consent-error'), hint: '' }
    ];
    function setErr(f, text) {
      var t = f.err.querySelector('.field-error__text');
      t.textContent = text || '';
      f.err.hidden = !text;
      var ids = [];
      if (text) ids.push(f.err.id);
      if (f.hint) ids.push(f.hint);
      if (ids.length) f.input.setAttribute('aria-describedby', ids.join(' ')); else f.input.removeAttribute('aria-describedby');
      if (text) f.input.setAttribute('aria-invalid', 'true'); else f.input.removeAttribute('aria-invalid');
    }
    function clearErrors() {
      FIELDS.forEach(function (f) { setErr(f, ''); });
      while (sumList.firstChild) sumList.removeChild(sumList.firstChild);
      summary.hidden = true;
      noticeBox.hidden = true;
      noticeBox.textContent = '';
    }
    function showNotice(text) {
      noticeBox.textContent = text;
      noticeBox.hidden = false;
      noticeBox.tabIndex = -1;
      try { noticeBox.focus(); } catch (e) {}
    }
    function setSending(on) {
      sending = on;
      submit.disabled = on;
      var label = submit.querySelector('span');
      if (label) label.textContent = on ? '보내는 중입니다…' : '서명 제출하기';
    }

    function done(count) {
      $('sign-on').hidden = true;
      var desc = document.querySelector('.page-band__desc[data-sign-state="on"]');
      if (desc) desc.hidden = true;
      var box = $('sign-done');
      if (count && count >= 1) { $('sign-done-num').textContent = fmtNum(count); $('sign-done-count').hidden = false; }
      box.hidden = false;
      document.body.classList.remove('is-typing');
      var h = $('sign-done-title');
      try { h.focus(); } catch (e) {}
      try { box.scrollIntoView({ block: 'start' }); } catch (e) {}
    }
    function duplicate() {
      $('sign-on').hidden = true;
      var desc = document.querySelector('.page-band__desc[data-sign-state="on"]');
      if (desc) desc.hidden = true;
      $('sign-dup').hidden = false;
      document.body.classList.remove('is-typing');
      var h = $('sign-dup-title');
      try { h.focus(); } catch (e) {}
    }

    function upload(blob) {
      var path = PETITION + '/' + uuid() + '.png';
      return withTimeout(fetch(c.url + '/storage/v1/object/signatures/' + path, {
        method: 'POST',
        credentials: 'omit',
        headers: headers(c, { 'Content-Type': 'image/png', 'x-upsert': 'false' }),
        body: blob
      }), 30000).then(function (r) {
        if (!r.ok) { var e = new Error('upload ' + r.status); e.status = r.status; throw e; }
        return path;
      });
    }
    function insert(row) {
      return withTimeout(fetch(c.url + '/rest/v1/signatures', {
        method: 'POST',
        credentials: 'omit',
        headers: headers(c, { 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
        body: JSON.stringify(row)
      }), 20000).then(function (r) {
        if (r.ok) return 'ok';
        return r.text().then(function (t) {
          var j = null;
          try { j = JSON.parse(t); } catch (e) {}
          if (r.status === 409 || (j && String(j.code) === '23505')) return 'dup';
          var e2 = new Error('insert ' + r.status); e2.status = r.status; throw e2;
        });
      });
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (sending) return;
      clearErrors();
      var n = name.value.trim().replace(/\s+/g, ' ');
      var digits = normPhone(phone.value);
      var errs = [];
      if (!n) errs.push([FIELDS[0], MSG.name]);
      if (!phone.value.trim()) errs.push([FIELDS[1], MSG.phoneEmpty]);
      else if (!validPhone(digits)) errs.push([FIELDS[1], MSG.phoneBad]);
      if (!consent.checked) errs.push([FIELDS[2], MSG.consent]);
      if (errs.length) {
        errs.forEach(function (e) {
          setErr(e[0], e[1]);
          var li = el('li');
          var a = el('a', null, e[1]);
          a.href = '#' + e[0].input.id;
          a.addEventListener('click', function (x) { x.preventDefault(); e[0].input.focus(); });
          li.appendChild(a);
          sumList.appendChild(li);
        });
        summary.hidden = false;
        try { summary.focus(); } catch (e) {}
        return;
      }
      /* 기계가 채운 것으로 보이면 조용히 막습니다 */
      if ((hp && hp.value) || Date.now() - started < MIN_FILL_MS) { showNotice(MSG.wait); return; }
      setSending(true);
      var row = {
        petition: PETITION,
        name: n.slice(0, 30),
        phone: digits,
        region: region && region.value ? region.value : null,
        signature_path: null,
        consent: true,
        consent_version: CONSENT_VERSION
      };
      var first = pad && !pad.isEmpty() ? pad.toBlob().then(upload) : Promise.resolve(null);
      first.then(function (path) {
        row.signature_path = path;
        return insert(row);
      }).then(function (res) {
        if (res === 'dup') { setSending(false); duplicate(); return; }
        return fetchCount(c).then(function (count) { setSending(false); done(count); });
      }).catch(function (e) {
        setSending(false);
        showNotice(e && e.status >= 400 && e.status < 500 ? MSG.bad : MSG.net);
      });
    });

    /* 입력하는 동안 아래 막대를 숨깁니다 (화면 자판 위에 뜨지 않게) */
    document.addEventListener('focusin', function (e) {
      if (e.target && e.target.matches && e.target.matches('input, select, textarea, canvas')) document.body.classList.add('is-typing');
    });
    document.addEventListener('focusout', function (e) {
      var to = e.relatedTarget;
      if (!to || !to.matches || !to.matches('input, select, textarea, canvas')) document.body.classList.remove('is-typing');
    });
  }

  function init() {
    var c = config();
    initBand(c);
    if (document.getElementById('sign-form')) {
      if (!c.on) { setState(false); return; }
      setState(true);
      initForm(c);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
