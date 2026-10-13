/* 옛 홈페이지 주소로 들어온 분을 새 화면으로 보냅니다. 404.html에서만 불러옵니다.
   예) /bbs/board.php?bo_table=TK_NEWS&wr_id=22  →  /post.html?id=legacy-TK_NEWS-22
       /bbs/board.php?bo_table=event             →  /events.html
       /bbs/page.php?hid=supportpc               →  /support.html
   카카오톡 등으로 퍼진 옛 글 주소가 계속 열리게 하려는 것입니다.
   사이트를 도메인 맨 위가 아닌 하위 폴더에 올리면 BASE를 그 폴더('/폴더/')로 바꿉니다. */
(function () {
  'use strict';
  var BASE = '/';
  var LIST = {
    TK_broadcast: 'news.html?cat=broadcast',
    TK_NEWS: 'news.html?cat=tknews',
    truth: 'news.html?cat=truth',
    Culture_War: 'news.html?cat=truth',
    PresidentYoon: 'news.html?cat=truth',
    event: 'events.html'
  };
  /* 같은 글이 두 게시판에 있던 경우: 목록에 남긴 글로 보냅니다 */
  var SAME = { 'legacy-PresidentYoon-8': 'legacy-truth-12' };
  var PAGES = { visionpc: 'about.html', vision: 'about.html', intro: 'about.html', supportpc: 'support.html', support: 'support.html' };
  var q, to = null, path = location.pathname;
  try { q = new URLSearchParams(location.search); } catch (e) { return; }
  if (/\/bbs\/board\.php$/.test(path)) {
    var bo = q.get('bo_table') || '', wr = q.get('wr_id') || '';
    if (LIST.hasOwnProperty(bo)) {
      if (/^\d{1,9}$/.test(wr)) {
        var id = 'legacy-' + bo + '-' + wr;
        to = 'post.html?id=' + (SAME[id] || id);
      } else {
        to = LIST[bo];
      }
    }
  } else if (/\/bbs\/page\.php$/.test(path)) {
    var hid = q.get('hid') || '';
    if (PAGES.hasOwnProperty(hid)) to = PAGES[hid];
  }
  if (to) location.replace(BASE + to);
})();
