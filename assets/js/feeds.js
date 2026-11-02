/* 트루스데일리 최신 기사와 트루스데일리TV 최신 영상을 그립니다.
   목록은 data/truthdaily.json 에 있고, GitHub Actions가 한 시간마다 새로 받아 둡니다(scripts/update-feeds.mjs).
   누르면 트루스데일리 기사나 유튜브 영상이 새 창으로 바로 열립니다.
   쓰는 곳: <div data-td-feed="news|videos" data-limit="3"> */
(function () {
  'use strict';

  var hosts = document.querySelectorAll('[data-td-feed]');
  if (!hosts.length || !window.fetch) return;

  var script = document.currentScript;
  var ROOT = script ? script.src.replace(/assets\/js\/feeds\.js.*$/, '') : '';
  var SITE = 'https://www.truthdaily.co.kr';
  var CHANNEL = 'https://www.youtube.com/channel/UC3rddsNSjWKgt_4shyUyb9g';
  var LOGO = ROOT + 'assets/img/banners/related-truthdaily.webp';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function str(v) { return typeof v === 'string' ? v : ''; }
  function playIcon() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var p = document.createElementNS(ns, 'path');
    p.setAttribute('d', 'M8 5v14l11-7z');
    svg.appendChild(p);
    return svg;
  }
  function fmtDate(iso) {
    var t = new Date(str(iso));
    if (isNaN(t)) return '';
    var k = new Date(t.getTime() + 9 * 3600 * 1000);   /* 한국 시각 */
    return k.getUTCFullYear() + '년 ' + (k.getUTCMonth() + 1) + '월 ' + k.getUTCDate() + '일';
  }
  function okArticle(u) { return /^https:\/\/www\.truthdaily\.co\.kr\//.test(str(u)); }
  function okVideo(id) { return /^[\w-]{11}$/.test(str(id)); }

  function card(o) {
    var li = el('li', 'card' + (o.video ? ' card--video' : ''));
    var a = el('a', 'card__a');
    a.href = o.href;
    a.target = '_blank';
    a.rel = 'noopener';
    var media = el('span', 'card__media' + (o.logo ? ' card__media--logo' : ''));
    media.setAttribute('aria-hidden', 'true');
    var img = el('img', 'card__img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = '';
    img.width = o.w; img.height = o.h;
    img.src = o.img;
    img.addEventListener('error', function () {
      if (img.src === LOGO) return;
      media.classList.add('card__media--logo');
      img.src = LOGO;
    });
    media.appendChild(img);
    if (o.video) {
      var pill = el('span', 'card__pill');
      pill.appendChild(playIcon());
      pill.appendChild(document.createTextNode('유튜브'));
      media.appendChild(pill);
      var disc = el('span', 'card__disc');
      disc.appendChild(playIcon());
      media.appendChild(disc);
    }
    a.appendChild(media);
    var body = el('span', 'card__body');
    body.appendChild(el('span', 'card__title', o.title));
    var meta = el('span', 'card__meta');
    var labels = el('span', 'card__labels');
    labels.appendChild(el('span', 'card__cat', o.label));
    meta.appendChild(labels);
    if (o.when) meta.appendChild(el('span', 'card__date', o.when));
    body.appendChild(meta);
    body.appendChild(el('span', 'sr-only', ' (새 창)'));
    a.appendChild(body);
    li.appendChild(a);
    return li;
  }

  function newsCards(items) {
    return items.filter(function (x) { return x && okArticle(x.url) && str(x.title); }).map(function (x) {
      var thumb = okArticle(x.thumb) ? x.thumb : '';
      return card({
        href: x.url, title: x.title, label: '트루스데일리', when: fmtDate(x.date),
        img: thumb || LOGO, logo: !thumb, w: thumb ? 300 : 331, h: thumb ? 200 : 170
      });
    });
  }
  function videoCards(items) {
    return items.filter(function (x) { return x && okVideo(x.id) && str(x.title); }).map(function (x) {
      return card({
        href: 'https://www.youtube.com/watch?v=' + x.id, title: x.title, label: '트루스데일리TV',
        when: x.date ? fmtDate(x.date) : str(x.ago), video: true,
        img: 'https://i.ytimg.com/vi/' + x.id + '/hqdefault.jpg', w: 480, h: 360
      });
    });
  }

  function fail(host, kind) {
    var p = el('p', 'notice');
    p.appendChild(document.createTextNode('목록을 불러오지 못했습니다. '));
    var a = el('a', null, kind === 'videos' ? '트루스데일리TV 유튜브에서 보기' : '트루스데일리 홈페이지에서 보기');
    a.href = kind === 'videos' ? CHANNEL : SITE;
    a.target = '_blank';
    a.rel = 'noopener';
    p.appendChild(a);
    host.appendChild(p);
  }

  fetch(ROOT + 'data/truthdaily.json', { cache: 'no-cache' }).then(function (r) {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  }).then(function (data) {
    Array.prototype.forEach.call(hosts, function (host) {
      var kind = host.getAttribute('data-td-feed');
      var limit = Number(host.getAttribute('data-limit')) || 3;
      var all = kind === 'videos' ? videoCards(data.videos || []) : newsCards(data.news || []);
      var skel = host.querySelector('.skel');
      if (skel) skel.parentNode.removeChild(skel);
      if (!all.length) { fail(host, kind); return; }
      var ul = el('ul', 'cards cards--video');
      all.slice(0, limit).forEach(function (li) { ul.appendChild(li); });
      host.appendChild(ul);
    });
  }).catch(function () {
    Array.prototype.forEach.call(hosts, function (host) {
      var skel = host.querySelector('.skel');
      if (skel) skel.parentNode.removeChild(skel);
      fail(host, host.getAttribute('data-td-feed'));
    });
  });
})();
