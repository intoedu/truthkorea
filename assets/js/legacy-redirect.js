/* 옛 홈페이지 주소로 들어온 분을 새 화면으로 보냅니다. 404.html에서만 불러옵니다.
   새 홈페이지에는 옛 처음 화면에 있던 글 20개만 옮겼습니다(단체의 결정). 그래서
     - 옮긴 글의 옛 주소       →  새 글 보기   예) /bbs/board.php?bo_table=TK_NEWS&wr_id=22  →  /post.html?id=legacy-TK_NEWS-22
     - 옮기지 않은 글의 옛 주소 →  그 분류의 목록 예) /bbs/board.php?bo_table=TK_NEWS&wr_id=7   →  /news.html?cat=tknews
     - 게시판 목록 주소         →  그 분류의 목록 예) /bbs/board.php?bo_table=event             →  /events.html
     - 공지사항 등 다른 게시판   →  처음 화면
     - 옛 소개·후원 쪽          →  새 쪽         예) /bbs/page.php?hid=supportpc               →  /support.html
     - 옛 서명하기 게시판       →  서명운동 화면  예) /bbs/board.php?bo_table=Sign               →  /sign.html
     - 옛 truth·Culture_War·PresidentYoon 게시판의 옮기지 않은 글과 목록 → 종합뉴스 목록 (/news.html?cat=broadcast)
   카카오톡 등으로 퍼진 옛 글 주소가 없는 글 화면으로 가지 않고 늘 열리는 화면으로 가게 하려는 것입니다.
   관리자 화면에서 옛 글을 지우면 그 옛 주소는 ‘글을 찾을 수 없습니다’와 목록 단추가 있는 화면으로 갑니다.
   사이트를 도메인 맨 위가 아닌 하위 폴더에 올리면 BASE를 그 폴더('/폴더/')로 바꿉니다. */
(function () {
  'use strict';
  var BASE = '/';
  /* 옛 게시판 → 새 목록 */
  var LIST = {
    TK_broadcast: 'news.html?cat=broadcast',
    TK_NEWS: 'news.html?cat=tknews',
    /* 옛 truth·Culture_War·PresidentYoon 게시판의 글은 새 홈페이지에서 종합뉴스로 모았습니다 */
    truth: 'news.html?cat=broadcast',
    Culture_War: 'news.html?cat=broadcast',
    PresidentYoon: 'news.html?cat=broadcast',
    event: 'events.html',
    /* 옛 서명하기 게시판 → 새 서명운동 화면 */
    Sign: 'sign.html'
  };
  /* 새 홈페이지로 옮긴 글 (게시판: 옛 글 번호). data/posts.json·supabase/seed.sql의 글과 같게 */
  var MOVED = {
    TK_broadcast: [47, 48, 49, 52, 54, 55, 57, 58],
    TK_NEWS: [17, 19, 20, 22],
    truth: [12, 13, 14],
    event: [63, 66, 67, 69]
  };
  /* 두 게시판에 똑같이 올라 있던 글: 숨긴 쪽 → 보이는 쪽 (posts.js의 LEGACY_SAME과 같게) */
  var SAME = { 'legacy-PresidentYoon-8': 'legacy-truth-12' };
  var PAGES = { visionpc: 'about.html', vision: 'about.html', intro: 'about.html', supportpc: 'support.html', support: 'support.html' };
  var q, to = null, path = location.pathname;
  try { q = new URLSearchParams(location.search); } catch (e) { return; }
  if (/\/bbs\/write\.php$/.test(path) && q.get('bo_table') === 'Sign') {
    to = 'sign.html';
  } else if (/\/bbs\/board\.php$/.test(path)) {
    /* 옛 사이트의 공유 단추가 만든 주소는 &amp;wr_id= 꼴이라 'amp;wr_id'로 읽힙니다 */
    var bo = q.get('bo_table') || '', wr = q.get('wr_id') || q.get('amp;wr_id') || '';
    var n = /^\d{1,9}$/.test(wr) ? parseInt(wr, 10) : 0;
    var id = 'legacy-' + bo + '-' + n;
    if (!LIST.hasOwnProperty(bo)) {
      to = 'index.html';
    } else if (SAME.hasOwnProperty(id)) {
      to = 'post.html?id=' + SAME[id];
    } else if (n && MOVED.hasOwnProperty(bo) && MOVED[bo].indexOf(n) !== -1) {
      to = 'post.html?id=' + id;
    } else {
      to = LIST[bo];
    }
  } else if (/\/bbs\/page\.php$/.test(path)) {
    var hid = q.get('hid') || '';
    if (PAGES.hasOwnProperty(hid)) to = PAGES[hid];
  }
  if (to) location.replace(BASE + to);
})();
