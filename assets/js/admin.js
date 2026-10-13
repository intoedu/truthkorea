/* 트루스코리아 관리자 화면: 로그인, 글 목록, 글 쓰기·고치기·지우기, 사진 올리기
   - Supabase Auth(이메일+비밀번호)로 로그인합니다. 권한은 데이터베이스의 RLS 규칙이 지킵니다(public.admins 표에 있는 사람만 쓰기 가능).
   - 글 내용은 화면에 넣을 때 textContent만 씁니다. */
(function () {
  'use strict';
  var BUCKET = 'post-images';
  var PAGE = 30;
  var MAX_SIDE = 1600;

  var $ = function (id) { return document.getElementById(id); };
  var TK = window.TK;
  var sb = null, C = null, user = null;
  var editing = null;   // 고치는 중인 글(새 글이면 null)
  var photos = [];      // { src, alt, width, height, isNew, blob, previewUrl }
  var dirty = false, listOffset = 0, saving = false;

  /* ---------- 화면 바꾸기와 알림 ---------- */
  var VIEWS = ['view-loading', 'view-setup', 'view-login', 'view-denied', 'view-list', 'view-editor'];
  function show(id) {
    VIEWS.forEach(function (v) { var e = $(v); if (e) e.hidden = v !== id; });
  }
  function msg(kind, text, focus) {
    var m = $('admin-msg');
    m.className = 'notice' + (kind ? ' notice--' + kind : '');
    m.textContent = text || '';
    m.hidden = !text;
    if (text && focus) {
      m.tabIndex = -1;
      try { m.focus({ preventScroll: false }); } catch (e) { m.focus(); }
    }
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function btn(cls, label, srText) {
    var b = el('button', cls, label);
    b.type = 'button';
    if (srText) b.appendChild(el('span', 'sr-only', srText));
    return b;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }
  /* 일하는 동안 단추 글자를 바꾸고 누를 수 없게 합니다 (원래 글자는 그대로 되돌림) */
  function busy(button, on, label) {
    if (!button) return;
    if (on) {
      if (!button._kids) button._kids = Array.prototype.slice.call(button.childNodes);
      clear(button);
      button.appendChild(document.createTextNode(label));
      button.disabled = true;
    } else {
      if (button._kids) { clear(button); button._kids.forEach(function (n) { button.appendChild(n); }); button._kids = null; }
      button.disabled = false;
    }
  }

  function authError(err) {
    var m = String((err && err.message) || '');
    if (/invalid login credentials/i.test(m)) return '이메일이나 비밀번호가 맞지 않습니다. 다시 확인해 주세요.';
    if (/email not confirmed/i.test(m)) return '아직 이메일 확인이 끝나지 않은 계정입니다. Supabase에서 계정을 확인해 주세요.';
    if (/rate limit|too many/i.test(m)) return '너무 여러 번 시도했습니다. 잠시 뒤에 다시 해 주세요.';
    if (/fetch|network|load failed/i.test(m) || (err && err.status === 0)) return '인터넷 연결을 확인한 뒤 다시 해 주세요.';
    return '로그인하지 못했습니다. (' + (m || '알 수 없는 문제') + ')';
  }
  function dbError(err) {
    var m = String((err && err.message) || ''), code = String((err && err.code) || '');
    if (code === '42501' || /row-level security|permission denied|not authorized/i.test(m)) return '관리자 권한이 없어 할 수 없습니다.';
    if (code === 'PGRST116') return '글을 찾을 수 없거나 권한이 없습니다.';
    if (code === 'PGRST301' || /jwt/i.test(m)) return '로그인이 끝났습니다. 다시 로그인해 주세요.';
    if (code === '23514' || code === '22007' || code === '22008') return '입력한 내용이 규칙에 맞지 않습니다. 분류, 유튜브 주소, 날짜를 확인해 주세요.';
    if (/fetch|network|load failed/i.test(m)) return '인터넷 연결을 확인한 뒤 다시 해 주세요.';
    return m || '알 수 없는 문제가 생겼습니다.';
  }

  /* ---------- 날짜 (한국 시간) ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function toLocalInput(iso) {
    var t = iso ? Date.parse(iso) : Date.now();
    if (isNaN(t)) t = Date.now();
    return new Date(t + 9 * 3600 * 1000).toISOString().slice(0, 16);
  }
  function fromLocalInput(v) {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(v || '') ? v.slice(0, 16) + ':00+09:00' : null;
  }
  function fmtDate(iso) { return TK.fmtDate(iso); }

  /* ---------- 저장소 주소 ---------- */
  function storagePath(src) {
    var prefix = C.url + '/storage/v1/object/public/' + BUCKET + '/';
    if (typeof src !== 'string' || src.indexOf(prefix) !== 0) return null;
    try { return decodeURIComponent(src.slice(prefix.length).split('?')[0]); } catch (e) { return null; }
  }
  function newPath() {
    var d = new Date(Date.now() + 9 * 3600 * 1000);
    var rand = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
      : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
    return 'posts/' + d.getUTCFullYear() + '/' + pad(d.getUTCMonth() + 1) + '/' + rand + '.jpg';
  }

  /* ---------- 사진 줄이기: 긴 쪽 1600px, JPEG (위치 정보 등 사진 속 정보는 지워짐) ---------- */
  function loadImage(file) {
    if (window.createImageBitmap) {
      return createImageBitmap(file, { imageOrientation: 'from-image' }).then(function (bmp) {
        return { img: bmp, w: bmp.width, h: bmp.height, done: function () { if (bmp.close) bmp.close(); } };
      }).catch(function () { return loadWithTag(file); });
    }
    return loadWithTag(file);
  }
  function loadWithTag(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var i = new Image();
      i.onload = function () { resolve({ img: i, w: i.naturalWidth, h: i.naturalHeight, done: function () { URL.revokeObjectURL(url); } }); };
      i.onerror = function () { URL.revokeObjectURL(url); reject(new Error('image')); };
      i.src = url;
    });
  }
  function resizeImage(file) {
    return loadImage(file).then(function (s) {
      var scale = Math.min(1, MAX_SIDE / Math.max(s.w, s.h));
      var w = Math.max(1, Math.round(s.w * scale)), h = Math.max(1, Math.round(s.h * scale));
      var c = document.createElement('canvas');
      c.width = w; c.height = h;
      var ctx = c.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(s.img, 0, 0, w, h);
      s.done();
      return new Promise(function (resolve, reject) {
        c.toBlob(function (b) { b ? resolve({ blob: b, width: w, height: h }) : reject(new Error('toBlob')); }, 'image/jpeg', 0.85);
      });
    });
  }

  /* ---------- 시작 ---------- */
  function start() {
    if (!TK) { show(null); msg('error', '화면 프로그램을 불러오지 못했습니다. 화면을 새로 고쳐 주세요.'); return; }
    C = TK.config();
    if (!C.on) { show('view-setup'); return; }
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      show(null);
      msg('error', '관리자 프로그램(supabase.js)을 불러오지 못했습니다. 화면을 새로 고쳐 주세요.');
      return;
    }
    sb = window.supabase.createClient(C.url, C.key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
    sb.auth.onAuthStateChange(function (event) {
      if (event === 'SIGNED_OUT') { setTimeout(signedOut, 0); }
    });
    sb.auth.getSession().then(function (res) {
      var s = res && res.data && res.data.session;
      if (s && s.user) afterLogin(s.user);
      else show('view-login');
    }, function () { show('view-login'); });
    bind();
  }

  function signedOut() {
    user = null;
    $('admin-userbar').hidden = true;
    show('view-login');
  }

  function afterLogin(u) {
    user = u;
    $('admin-user-email').textContent = u.email || '';
    $('admin-userbar').hidden = false;
    show('view-loading');
    return sb.from('admins').select('user_id').eq('user_id', u.id).maybeSingle().then(function (res) {
      if (res.error) { show('view-denied'); msg('error', '관리자인지 확인하지 못했습니다: ' + dbError(res.error)); return; }
      if (!res.data) { show('view-denied'); return; }
      openList();
    });
  }

  /* ---------- 글 목록 ---------- */
  function openList() {
    $('admin-title').textContent = '글 관리';
    document.title = '글 관리 - 트루스코리아 관리자';
    editing = null;
    setDirty(false);
    show('view-list');
    listOffset = 0;
    clear($('admin-list'));
    $('list-count').textContent = '글 목록을 불러오는 중입니다…';
    return loadMore();
  }

  function loadMore() {
    var filter = $('list-filter').value;
    var q = sb.from('posts')
      .select('id,category,title,published_at,is_published,show_on_home', { count: 'exact' })
      .order('published_at', { ascending: false })
      .order('id', { ascending: false })
      .range(listOffset, listOffset + PAGE - 1);
    if (filter) q = q.eq('category', filter);
    var more = $('btn-more');
    busy(more, true, '불러오는 중…');
    return q.then(function (res) {
      busy(more, false);
      if (res.error) { $('list-count').textContent = ''; msg('error', '글 목록을 불러오지 못했습니다: ' + dbError(res.error), true); return; }
      var rows = res.data || [];
      var ul = $('admin-list');
      var firstNew = null;
      rows.forEach(function (row) {
        var li = listItem(row);
        ul.appendChild(li);
        if (!firstNew) firstNew = li;
      });
      listOffset += rows.length;
      var total = typeof res.count === 'number' ? res.count : null;
      $('list-count').textContent = total === null ? '' : (total ? '글이 모두 ' + total + '개 있습니다.' : '아직 글이 없습니다. ‘새 글 쓰기’를 눌러 첫 글을 써 보세요.');
      more.hidden = total === null ? rows.length < PAGE : listOffset >= total;
      return firstNew;
    });
  }

  function listItem(row) {
    var li = el('li', 'admin-item');
    li.appendChild(el('h3', 'admin-item__title', row.title || '(제목 없음)'));
    var meta = el('p', 'admin-item__meta');
    meta.appendChild(el('span', 'badge', TK.CATS[row.category] || row.category));
    meta.appendChild(el('span', null, fmtDate(row.published_at)));
    meta.appendChild(el('span', 'badge ' + (row.is_published ? 'badge--ok' : 'badge--hidden'), row.is_published ? '게시함' : '숨김'));
    meta.appendChild(el('span', 'badge' + (row.show_on_home ? '' : ' badge--hidden'), row.show_on_home ? '처음 화면에 보임' : '처음 화면에 안 보임'));
    li.appendChild(meta);
    var row2 = el('div', 'btn-row');
    var edit = btn('btn btn--primary', '고치기', ': ' + (row.title || ''));
    edit.addEventListener('click', function () { editPost(row.id, edit); });
    row2.appendChild(edit);
    if (row.is_published) {
      var view = el('a', 'btn btn--secondary', '홈페이지에서 보기');
      view.href = TK.root + 'post.html?id=' + encodeURIComponent(row.id);
      view.appendChild(el('span', 'sr-only', ': ' + (row.title || '')));
      row2.appendChild(view);
    }
    var del = btn('btn btn--danger', '지우기', ': ' + (row.title || ''));
    del.addEventListener('click', function () { deletePost(row, del); });
    row2.appendChild(del);
    li.appendChild(row2);
    return li;
  }

  /* ---------- 글 쓰기·고치기 ---------- */
  function setDirty(v) { dirty = v; }

  function editPost(id, button) {
    busy(button, true, '여는 중…');
    sb.from('posts').select('*').eq('id', id).single().then(function (res) {
      busy(button, false);
      if (res.error) { msg('error', '글을 열지 못했습니다: ' + dbError(res.error), true); return; }
      openEditor(res.data);
    });
  }

  function openEditor(post) {
    msg('', '');
    editing = post || null;
    var f = $('post-form');
    f.reset();
    $('editor-title').textContent = post ? '글 고치기' : '새 글 쓰기';
    $('admin-title').textContent = post ? '글 고치기' : '새 글 쓰기';
    document.title = (post ? '글 고치기' : '새 글 쓰기') + ' - 트루스코리아 관리자';
    $('f-category').value = post ? post.category : 'broadcast';
    $('f-title').value = post ? post.title : '';
    $('f-date').value = toLocalInput(post ? post.published_at : null);
    $('f-event-start').value = post && post.event_start ? post.event_start : '';
    $('f-event-end').value = post && post.event_end ? post.event_end : '';
    $('f-body').value = post ? (post.body || '') : '';
    $('f-youtube').value = post && post.youtube_id ? 'https://www.youtube.com/watch?v=' + post.youtube_id : '';
    $('f-published-yes').checked = !post || post.is_published !== false;
    $('f-published-no').checked = !!post && post.is_published === false;
    $('f-home').checked = !post || post.show_on_home !== false;
    photos.forEach(function (p) { if (p.previewUrl) URL.revokeObjectURL(p.previewUrl); });
    photos = (post && Array.isArray(post.images) ? post.images : []).map(function (im) {
      if (typeof im === 'string') im = { src: im };
      return { src: im.src, alt: im.alt || '', width: im.width || 0, height: im.height || 0, isNew: false };
    });
    renderPhotos();
    updateEventField();
    updateYouTubeStatus();
    $('btn-delete').hidden = !post;
    $('preview').hidden = true;
    setDirty(false);
    show('view-editor');
    var h = $('editor-title');
    h.tabIndex = -1;
    h.focus();
  }

  function updateEventField() {
    $('f-event-wrap').hidden = $('f-category').value !== 'event';
  }
  function updateYouTubeStatus() {
    var v = $('f-youtube').value.trim(), out = $('f-youtube-status');
    out.className = 'field__status';
    if (!v) { out.textContent = ''; return true; }
    var id = TK.parseYouTube(v);
    if (id) { out.textContent = '유튜브 영상을 알아보았습니다. (영상 번호: ' + id + ')'; out.classList.add('is-ok'); return true; }
    out.textContent = '유튜브 주소를 알아볼 수 없습니다. 주소를 다시 확인해 주세요.';
    out.classList.add('is-error');
    return false;
  }

  function renderPhotos() {
    var ul = $('photo-list');
    clear(ul);
    if (!photos.length) {
      ul.appendChild(el('li', 'photo-list__empty', '넣은 사진이 없습니다.'));
      return;
    }
    photos.forEach(function (p, i) {
      var li = el('li', 'photo');
      var img = el('img', 'photo__img');
      img.src = p.isNew ? p.previewUrl : (TK.safeSrc(p.src) || '');
      img.alt = '';
      img.width = 160; img.height = 120;
      li.appendChild(img);
      var body = el('div', 'photo__body');
      var fid = 'photo-alt-' + i;
      var lab = el('label', 'field__label field__label--sub', (i + 1) + '번째 사진 설명');
      lab.htmlFor = fid;
      var inp = el('input', 'field__input');
      inp.type = 'text'; inp.id = fid; inp.value = p.alt; inp.maxLength = 500;
      inp.addEventListener('input', function () { p.alt = inp.value; setDirty(true); });
      body.appendChild(lab);
      body.appendChild(inp);
      if (p.isNew) body.appendChild(el('p', 'field__help', '새 사진입니다. ‘저장하기’를 누르면 올라갑니다.'));
      var row = el('div', 'btn-row photo__actions');
      if (i > 0) {
        var up = btn('btn btn--secondary', '앞으로', ' (' + (i + 1) + '번째 사진)');
        up.addEventListener('click', function () { move(i, -1); });
        row.appendChild(up);
      }
      if (i < photos.length - 1) {
        var down = btn('btn btn--secondary', '뒤로', ' (' + (i + 1) + '번째 사진)');
        down.addEventListener('click', function () { move(i, 1); });
        row.appendChild(down);
      }
      var rm = btn('btn btn--danger', '이 사진 빼기', ' (' + (i + 1) + '번째 사진)');
      rm.addEventListener('click', function () {
        var gone = photos.splice(i, 1)[0];
        if (gone && gone.previewUrl) URL.revokeObjectURL(gone.previewUrl);
        setDirty(true);
        renderPhotos();
        msg('ok', (i + 1) + '번째 사진을 뺐습니다. ‘저장하기’를 눌러야 반영됩니다.');
      });
      row.appendChild(rm);
      body.appendChild(row);
      li.appendChild(body);
      ul.appendChild(li);
    });
  }
  function move(i, d) {
    var j = i + d;
    if (j < 0 || j >= photos.length) return;
    var t = photos[i]; photos[i] = photos[j]; photos[j] = t;
    setDirty(true);
    renderPhotos();
  }

  function addFiles(files) {
    files = Array.prototype.slice.call(files || []);
    if (!files.length) return;
    msg('', '사진을 준비하는 중입니다…');
    var added = 0, failed = [];
    var chain = Promise.resolve();
    files.forEach(function (file) {
      chain = chain.then(function () {
        if (!/^image\//.test(file.type)) { failed.push(file.name); return; }
        return resizeImage(file).then(function (r) {
          photos.push({ src: '', alt: '', width: r.width, height: r.height, isNew: true, blob: r.blob, previewUrl: URL.createObjectURL(r.blob) });
          added++;
        }, function () { failed.push(file.name); });
      });
    });
    return chain.then(function () {
      setDirty(true);
      renderPhotos();
      var t = added ? '사진 ' + added + '장을 넣었습니다. 사진마다 설명을 써 주시고, ‘저장하기’를 누르면 올라갑니다.' : '';
      if (failed.length) msg('error', t + ' 읽지 못한 파일: ' + failed.join(', ') + ' (사진 파일만 올릴 수 있습니다)');
      else msg('ok', t);
    });
  }

  function collect() {
    var cat = $('f-category').value;
    var es = $('f-event-start').value || null, ee = $('f-event-end').value || null;
    if (cat !== 'event') { es = null; ee = null; }
    if (!es) ee = null;
    return {
      category: cat,
      title: $('f-title').value.trim(),
      body: $('f-body').value.replace(/\r\n?/g, '\n').replace(/\s+$/, ''),
      youtube_id: TK.parseYouTube($('f-youtube').value) || null,
      published_at: fromLocalInput($('f-date').value),
      is_published: $('f-published-yes').checked,
      show_on_home: $('f-home').checked,
      event_start: es,
      event_end: ee && ee !== es ? ee : null
    };
  }

  function validate(d) {
    if (!d.title) return ['f-title', '제목을 써 주세요.'];
    if (!d.published_at) return ['f-date', '올린 날짜와 시간을 넣어 주세요.'];
    if (!updateYouTubeStatus()) return ['f-youtube', '유튜브 주소를 알아볼 수 없습니다. 주소를 고치거나 칸을 비워 주세요.'];
    if (d.event_end && d.event_start && d.event_end < d.event_start) return ['f-event-end', '행사가 끝나는 날이 시작하는 날보다 앞설 수 없습니다.'];
    return null;
  }

  function save(ev) {
    ev.preventDefault();
    if (saving) return;
    var d = collect();
    var bad = validate(d);
    if (bad) { msg('error', bad[1], true); var f = $(bad[0]); if (f) f.setAttribute('aria-invalid', 'true'); return; }
    ['f-title', 'f-date', 'f-youtube', 'f-event-end'].forEach(function (id) { $(id).removeAttribute('aria-invalid'); });
    saving = true;
    var sbtn = $('btn-save');
    busy(sbtn, true, '저장하는 중…');
    var newOnes = photos.filter(function (p) { return p.isNew; });
    var n = 0;
    var chain = Promise.resolve();
    newOnes.forEach(function (p) {
      chain = chain.then(function () {
        n++;
        msg('', '사진을 올리는 중입니다 (' + n + '/' + newOnes.length + ')…');
        var path = newPath();
        return sb.storage.from(BUCKET).upload(path, p.blob, { contentType: 'image/jpeg', cacheControl: '31536000', upsert: false }).then(function (res) {
          if (res.error) throw { stage: 'upload', error: res.error };
          p.src = sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
          p.isNew = false;
          if (p.previewUrl) { URL.revokeObjectURL(p.previewUrl); p.previewUrl = null; }
          p.blob = null;
        });
      });
    });
    chain.then(function () {
      d.images = photos.map(function (p) {
        var o = { src: p.src, alt: p.alt.trim() };
        if (p.width && p.height) { o.width = p.width; o.height = p.height; }
        return o;
      });
      msg('', '글을 저장하는 중입니다…');
      var q = editing
        ? sb.from('posts').update(d).eq('id', editing.id).select('id,images').single()
        : sb.from('posts').insert(d).select('id,images').single();
      return q.then(function (res) {
        if (res.error) throw { stage: 'save', error: res.error };
        return res.data;
      });
    }).then(function (saved) {
      // 고친 글에서 뺀 사진 파일은 저장소에서도 지웁니다 (실패해도 글은 이미 저장됨)
      var oldPaths = editing && Array.isArray(editing.images) ? editing.images.map(function (im) { return storagePath(im && im.src); }).filter(Boolean) : [];
      var keep = d.images.map(function (im) { return storagePath(im.src); });
      var gone = oldPaths.filter(function (p) { return keep.indexOf(p) < 0; });
      var cleanup = gone.length ? sb.storage.from(BUCKET).remove(gone).then(function () {}, function () {}) : Promise.resolve();
      return cleanup.then(function () {
        saving = false;
        busy(sbtn, false);
        setDirty(false);
        renderPhotos();
        var text = '저장했습니다. ' + (d.is_published ? '홈페이지에 바로 보입니다.' : '‘숨김’으로 저장했으므로 홈페이지에는 보이지 않습니다.');
        return openList().then(function () { msg('ok', text, true); });
      });
    }).catch(function (e) {
      saving = false;
      busy(sbtn, false);
      renderPhotos();
      var err = e && e.error ? e.error : e;
      var where = e && e.stage === 'upload' ? '사진을 올리지 못했습니다: ' : '저장하지 못했습니다: ';
      msg('error', where + dbError(err) + ' 쓰신 내용은 그대로 있으니 다시 ‘저장하기’를 눌러 보세요.', true);
    });
  }

  function deletePost(row, button) {
    var ok = window.confirm('‘' + (row.title || '') + '’ 글을 지울까요?\n지운 글은 되살릴 수 없습니다.');
    if (!ok) return;
    busy(button, true, '지우는 중…');
    sb.from('posts').delete().eq('id', row.id).select('id,images').then(function (res) {
      busy(button, false);
      if (res.error) { msg('error', '글을 지우지 못했습니다: ' + dbError(res.error), true); return; }
      if (!res.data || !res.data.length) { msg('error', '글을 지우지 못했습니다. 이미 지워졌거나 관리자 권한이 없습니다.', true); return; }
      var paths = (res.data[0].images || []).map(function (im) { return storagePath(im && im.src); }).filter(Boolean);
      var cleanup = paths.length ? sb.storage.from(BUCKET).remove(paths).then(function () {}, function () {}) : Promise.resolve();
      cleanup.then(function () {
        openList().then(function () { msg('ok', '‘' + (row.title || '') + '’ 글을 지웠습니다.', true); });
      });
    });
  }

  function preview() {
    var d = collect();
    var post = {
      id: 'preview',
      category: d.category,
      title: d.title || '(제목 없음)',
      body: d.body,
      youtube_id: d.youtube_id,
      published_at: d.published_at || new Date().toISOString(),
      event_start: d.event_start,
      event_end: d.event_end,
      images: photos.map(function (p) {
        return { src: p.isNew ? p.previewUrl : p.src, alt: p.alt, width: p.width, height: p.height };
      })
    };
    $('preview-post-title').textContent = post.title;
    TK.fillMeta($('preview-meta'), post, { full: true });
    TK.renderPostContent($('preview-content'), post, { allowBlob: true });
    var sec = $('preview');
    sec.hidden = false;
    var h = $('preview-title');
    h.tabIndex = -1;
    h.focus();
  }

  function bind() {
    $('login-form').addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = $('login-email').value.trim(), pw = $('login-password').value;
      if (!email || !pw) {
        msg('error', '이메일과 비밀번호를 모두 넣어 주세요.', true);
        return;
      }
      var b = $('btn-login');
      busy(b, true, '로그인하는 중…');
      sb.auth.signInWithPassword({ email: email, password: pw }).then(function (res) {
        busy(b, false);
        if (res.error) { msg('error', authError(res.error), true); return; }
        $('login-password').value = '';
        msg('', '');
        afterLogin(res.data.user);
      }, function (e) { busy(b, false); msg('error', authError(e), true); });
    });
    $('btn-logout').addEventListener('click', function () {
      if (dirty && !window.confirm('저장하지 않은 내용이 사라집니다. 로그아웃할까요?')) return;
      setDirty(false);
      sb.auth.signOut().then(function () { signedOut(); msg('ok', '로그아웃했습니다.'); });
    });
    $('btn-new').addEventListener('click', function () { openEditor(null); });
    $('btn-more').addEventListener('click', function () {
      loadMore().then(function (first) { var b = first && first.querySelector('button'); if (b) b.focus(); });
    });
    $('list-filter').addEventListener('change', function () { openList(); });
    $('f-category').addEventListener('change', updateEventField);
    $('f-youtube').addEventListener('input', updateYouTubeStatus);
    $('f-photos').addEventListener('change', function (ev) {
      var files = ev.target.files;
      addFiles(files);
      ev.target.value = '';
    });
    $('post-form').addEventListener('input', function () { setDirty(true); });
    $('post-form').addEventListener('submit', save);
    $('btn-preview').addEventListener('click', preview);
    $('btn-cancel').addEventListener('click', function () {
      if (dirty && !window.confirm('저장하지 않은 내용이 사라집니다. 목록으로 갈까요?')) return;
      photos.forEach(function (p) { if (p.previewUrl) URL.revokeObjectURL(p.previewUrl); });
      photos = [];
      msg('', '');
      openList();
    });
    $('btn-delete').addEventListener('click', function () {
      if (editing) deletePost({ id: editing.id, title: editing.title }, $('btn-delete'));
    });
    window.addEventListener('beforeunload', function (e) {
      if (dirty) { e.preventDefault(); e.returnValue = ''; }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
