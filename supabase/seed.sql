-- 자동으로 만든 파일입니다. 고치지 말고 data/posts.json을 고친 뒤 `node supabase/make-seed.mjs`를 다시 실행하세요.
-- 옛 홈페이지(국민주권운동.com)에서 옮겨 온 글 104개를 public.posts 표에 넣습니다.
-- 먼저 supabase/migrations/0001_init.sql 을 실행한 다음, Supabase 대시보드 > SQL Editor 에서 이 파일을 실행합니다.
-- 같은 id가 이미 있으면 건너뜁니다(여러 번 실행해도 안전).

insert into public.posts
  (id, category, title, body, youtube_id, video_after, extra_videos, links, images, published_at, is_published, show_on_home, source_url, event_start, event_end)
values
  ('legacy-Culture_War-55', 'truth', '유동규-남욱 2023년 통화녹취 공개됐다…백광현 기자회견 현장 [현장영상] / 채널A', '유동규-남욱 2023년 통화녹취 공개됐다…백광현 기자회견 현장 [현장영상] / 채널A', 'fLNjkykPpr8', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-11-13T06:31:22+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=55', null::date, null::date),
  ('legacy-Culture_War-53', 'truth', '그가 청와대를 버리고 용산을 선택한 ''진짜 이유''', '그가 청와대를 버리고 용산을 선택한 ''진짜 이유''', 'iKAKEryWvMA', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-11-07T09:01:21+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=53', null::date, null::date),
  ('legacy-Culture_War-52', 'truth', '서해 피살 공무원 친형 "文 전 대통령·민주당 진짜 반성해야"', '서해 피살 공무원 친형 "文 전 대통령·민주당 진짜 반성해야"', 'pRrpDV1IEEw', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-11-05T22:00:48+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=52', null::date, null::date),
  ('legacy-Culture_War-51', 'truth', '이재명 재판 재개 촉구, 직접 나선 청년들', '이재명 재판 재개 촉구, 직접 나선 청년들', 'jVERKt1nuP4', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-31T22:34:59+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=51', null::date, null::date),
  ('legacy-Culture_War-50', 'truth', '최민희 딸 정윤서 ''대참사'' 터졌다...''딸 결혼 축의금 갈취'' 최민희 난리난 현장영상', '최민희 딸 정윤서 ''대참사'' 터졌다...''딸 결혼 축의금 갈취'' 최민희 난리난 현장영상', 'QUYxTyVghHk', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-28T20:50:03+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=50', null::date, null::date),
  ('legacy-Culture_War-49', 'truth', '[단독] ''캄보디아 고수익 알바'' 모집 글보고 실제로 통화해보니 ''충격''', '[단독] ''캄보디아 고수익 알바'' 모집 글보고 실제로 통화해보니 ''충격''', 'KKGfS0I1-vc', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-19T08:30:05+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=49', null::date, null::date),
  ('legacy-Culture_War-48', 'truth', '김현지 실체 나왔다'' 또 놀라운 사실에 경악!', '김현지 실체 나왔다'' 또 놀라운 사실에 경악!', 'Y8raCVEqbsE', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-18T08:56:35+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=48', null::date, null::date),
  ('legacy-Culture_War-47', 'truth', '박정훈 긴급 기자회견, 이재명-김현지 ''새로운 사실''', '박정훈 긴급 기자회견, 이재명-김현지 ''새로운 사실''', 'gN0rsIYqMVU', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-14T12:46:55+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=47', null::date, null::date),
  ('legacy-Culture_War-46', 'truth', '캄보디아서 한국 대학생 고문... 무능한 정부 필요 없다', '캄보디아서 한국 대학생 고문... 무능한 정부 필요 없다', 'Zyh7JmuVe5k', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-11T21:25:26+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=46', null::date, null::date),
  ('legacy-Culture_War-44', 'truth', '김현지 아들 드디어 입 열었다! 소식을 접한 이재명은 깜짝 놀랐다. 국민 기만의 끝판왕!!', '김현지 아들 드디어 입 열었다! 소식을 접한 이재명은 깜짝 놀랐다. 국민 기만의 끝판왕!!', 'cdFufDP-Y04', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-08T21:51:34+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=44', null::date, null::date),
  ('legacy-Culture_War-43', 'truth', '김현지 실체 파헤쳐!', '이동호교수 광화문 국민대회서 김현지 실체 파헤쳐!.25.10.3.', 'xadS6MDohoM', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-07T23:55:07+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=43', null::date, null::date),
  ('legacy-TK_NEWS-22', 'tknews', '[심층] ‘反中 시위 금지법’ 발의한 민주당… 이율배반적 행태 논란', '툭하면 반미·반일 외치더니 “특정 국가 혐오 집회 금지”라니
“중국의 비위 맞추기 위해 국내 반중 여론을 억누르려 한다”
표현의 자유와 국익의 충돌… 민주주의 훼손하는 자기 모순

더불어민주당이 최근 잇따라 벌어진 반중(反中) 시위를 직접 겨냥한 법안을 발의하면서 집회와 표현의 자유를 강조해 온 기존 입장과 정면으로 배치된다는 비판이 거세다. 특히 이번 조치가 이달 말 시진핑 중국 국가주석의 한국 방문을 앞두고 추진된 점에서 중국 눈치를 본 ‘굴종적 입법’ 아니냐는 논란이 확산되고 있다.

김태년 더불어민주당 의원(5선, 국회 한중의원연맹 회장)은 2일 집회 및 시위에 관한 법률 개정안을 대표 발의했다. 주요 골자는 △특정 인종·국가·장애인 등에 대한 차별·혐오 집회 금지 △타인의 인격권을 침해하는 모욕성 집회를 제한 통고 대상으로 규정하는 것이다. 법안에는 민주당과 조국혁신당 의원 13명이 공동 발의자로 이름을 올렸다.

김 의원은 제안 이유에서 “최근 일부 집회가 특정 국가와 인종을 노골적으로 혐오하고 폭력적 행위를 선동하고 있다”며 “헌법상 표현의 자유를 넘어서는 집회를 규제해야 한다”고 밝혔다. 특히 그는 “중국인 무비자 입국 시행 이후 혐중 시위가 부정선거 음모론과 결합해 더욱 격화되고 있다”며 사회적 혼란을 우려했다.

이재명 대통령은 최근 여러 차례 반중 집회를 강도 높게 비판했다. 그는 “특정 국가와 국민을 향한 괴담과 혐오 발언이 무차별적으로 퍼지고 있으며, 이는 국가 이미지를 훼손하는 자해 행위”라고 규정하고 “관계 부처는 해외 관광객 안전을 위협하는 혐오 선동을 철저히 단속하라”고 지시했다.

법안 발의 시점은 시진핑 주석의 APEC 정상회의 참석을 앞둔 시기와 맞물린다. 이 때문에 정치권 일각에서는 “민주당이 중국의 비위를 맞추기 위해 국내 반중 여론을 억누르려 한다”는 지적이 제기된다.

야권은 즉각 반발했다. 나경원 국민의힘 의원은 “민주당은 과거 광우병 괴담으로 반미 선동·사드 배치 반대 시위·후쿠시마 오염수 괴담 선동으로 반일 시위를 주도하지 않았느냐”며 “그런 세력이 이제 와서 특정 국가 혐오를 운운한다는 것은 자가당착”이라고 꼬집었다.

실제로 민주당은 지난 수년간 촛불집회와 각종 반미·반일 시위를 자유로운 표현과 민주적 저항권으로 적극 옹호해왔다. 그러나 반중 정서가 확산되자 돌연 ‘혐오 집회’라는 딱지를 붙이며 금지 입법을 추진하는 것은 명백한 이중 잣대라는 비판이다.

헌법은 집회·결사의 자유를 보장하며, 민주주의 사회에서 이는 본질적 기본권으로 존중돼야 한다. 물론 혐오·차별 조장은 사회적 갈등을 심화시킬 수 있지만, 이를 이유로 특정 국가를 향한 정치적 표현까지 원천 봉쇄하는 것은 위험한 선례가 될 수 있다. 특히 민주당의 이번 법안은 ‘표현의 자유 보호’와 ‘혐오 방지’라는 두 가치 중 후자를 과도하게 강조하면서, 정작 권력자와 외국 정부의 이해를 앞세운 것이 아니냐는 의구심을 낳는다.

더불어민주당은 줄곧 “표현의 자유는 민주주의의 근간”이라고 외쳐 왔다. 그러나 이번 반중 시위 금지법은 정권의 불편한 목소리를 억누르려는 권위주의적 발상이라는 비판에서 자유롭기 어렵다. 정치적 표현의 자유를 억압하면서, 특정 외국 지도자의 체면과 외교적 관계를 위해 국민의 입을 막는다면 그것이야말로 민주주의의 근간을 허무는 행위다.

결국 이번 논란은 단순한 입법 공방을 넘어 대한민국이 표현의 자유를 지켜내는 자유민주국가인가, 아니면 권력과 외세에 종속된 국가로 퇴행할 것인가 하는 근본적 질문을 던지고 있다.

자세히보기

출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[{"text":"자세히보기","href":"https://www.truthdaily.co.kr/news/articleView.html?idxno=1670"}]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-22-1.jpg","alt":"‘CCP OUT!! STOP THE STEAL!!’ 현수막과 태극기, 성조기를 들고 거리를 행진하는 시위 참가자들","width":600,"height":329,"caption":"더불어민주당이 최근 잇따라 벌어진 반중(反中) 시위를 직접 겨냥한 법안을 발의하면서,\n집회와 표현의 자유를 강조해 온 기존 입장과 정면으로 배치된다는 비판이 거세다. 트루스데일리","after":1}]'::jsonb, '2025-10-05T18:59:41+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=22', null::date, null::date),
  ('legacy-Culture_War-42', 'truth', '중국의 장기밀매조직 국내 잠입 가능성은?', '중국의 장기밀매조직 국내 잠입 가능성은?', 'QjewUm4z3N0', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-04T01:45:51+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=42', null::date, null::date),
  ('legacy-Culture_War-40', 'truth', 'NEVER SURRENDER : FLAG DAY', 'NEVER SURRENDER : FLAG DAY', 'qJtCkggcORQ', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-03T16:26:45+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=40', null::date, null::date),
  ('legacy-PresidentYoon-11', 'truth', '대법 “수사권 없는 공소 무효” 尹 내란죄도 ‘무효’ㅣ 자유뉴스', '대법 “수사권 없는 공소 무효” 尹 내란죄도 ‘무효’ㅣ 자유뉴스', '8BgDVJZK0Og', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-02T03:35:09+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=11', null::date, null::date),
  ('legacy-PresidentYoon-10', 'truth', '지금 우리나라는 범죄자 소굴이 되었습니다', '지금 우리나라는 범죄자 소굴이 되었습니다', 'PgnQG41j5dw', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-10-02T03:26:32+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=10', null::date, null::date),
  ('legacy-PresidentYoon-9', 'truth', '윤석열 대통령이 구속된 이유. 이 영상을 퍼뜨려주세요.', '윤석열 대통령이 구속된 이유. 이 영상을 퍼뜨려주세요.', 'MtNDJMH4uyo', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-28T21:18:52+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=9', null::date, null::date),
  ('legacy-Culture_War-38', 'truth', 'UN 망신살! 창피하다 정말!', 'UN 망신살! 창피하다 정말!', 'Z_fgZsui9lY', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-28T16:24:09+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=38', null::date, null::date),
  ('legacy-Culture_War-37', 'truth', '이 대통령 연설하자 자리 통째로 비운 북한', '이 대통령 연설하자 자리 통째로 비운 북한', 'YW-EpHl0LIo', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-26T04:15:54+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=37', null::date, null::date),
  ('legacy-Culture_War-36', 'truth', '北 지령 간첩 활동’ 민노총 간부, 징역9년6개월 확정', '北 지령 간첩 활동’ 민노총 간부, 징역9년6개월 확정', 'vpdk1uTwG7M', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-25T15:13:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=36', null::date, null::date),
  ('legacy-Culture_War-35', 'truth', '북한 간첩이 소송거는 시대 [심층진단]', '북한 간첩이 소송거는 시대 [심층진단]', 'cJpjMXPAIWA', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-24T05:47:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=35', null::date, null::date),
  ('legacy-TK_broadcast-57', 'broadcast', '대통령실 충격의 도가니, 구주와 변호사가 해냈다!!', '대통령실 충격의 도가니, 구주와 변호사가 해냈다!!', 'HPuDXqXClMk', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-24T02:40:13+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=57', null::date, null::date),
  ('legacy-Culture_War-34', 'truth', '[속보] 中에서 5년간 한국인 1026명 강도·강간·납치·피살... 외교부 침묵', '중국인 무비자 추진, 국내도 범죄 급증… 항의조차 못 하는 나라
하이브리드 전쟁 이미 시작… 한미동맹 차원의 대응 공세적 시급
선거 범죄 예방 차원 중국인 무비자 입국도 즉각 중단해야 한다

‘재중국민 사건·사고 통계’는 뼈아픈 현실을 말해주고 있다. 외교부 통계에 따르면 2018년부터 지난해까지 중국에서 강력범죄 피해를 본 한국인 수가 무려 1026명이다. 살인·강도·강간·강제추행·절도·폭행상해 등 중대한 범죄가 포함된 숫자다. 납치·감금·행방불명 피해자만도 377명에 달했다. 단순한 사건 사고가 아니라 국민의 생명과 안전이 중국 땅에서 심각하게 위협받고 있다는 구체적 증거다.

그런데 이재명 정권은 어떠한가. 대한민국 국민이 피 흘리며 당하는 참혹한 범죄 피해 앞에서도 외교적 항의 한 번 제대로 하지 못한다. 오히려 중국에 고개를 숙이고, 중국인 무비자 입국까지 추진하고 있다. 나라의 주권과 국민의 안전을 팔아먹는 작태라 하지 않을 수 없다. 이 정권이 누구를 위해 존재하는가, 국민을 위해서인지 중국을 위해서인지 근본적 의문이 제기된다.

더 심각한 것은 중국의 위협에 맞서 “경계하자, 대비하자”는 시민사회의 외침조차 정권은 경찰력을 동원해 막아섰다는 사실이다. 자유대학 등 시민단체가 주최한 시위는 단순한 집회가 아니다. 이는 국가 보위와 안보를 지키자는 최소한의 경고 신호였다. 그러나 정권은 이를 억압했다. 국민의 입을 틀어막고, 중국의 눈치만 보는 나라. 이런 모습은 자유민주주의 체제가 아니라 속국이나 괴뢰정권의 전형적 모습이다.

국내에서도 중국인 범죄가 기하급수적으로 늘어나고 있다. 범죄 통계만 봐도 불법체류 중국인과 입국 중국인 범죄율은 이미 사회적 경각심을 불러일으키기에 충분하다. 치안 불안이 커지는데 정권은 중국인 입국을 확대하고 있다. 일부 지자체는 숙박비까지 대주고 있다. 이는 범죄를 키우겠다는 것과 다르지 않다. 결국, 피해자는 한국 국민이다.

여기서 더 주목해야 할 점은 ‘부정선거’ 문제다. 지난 대선과 총선에서 제기된 중국 개입설은 단순한 음모론으로 치부할 수 없다. 통신망·데이터·온라인 정보전은 이미 중국이 전 세계적으로 구사하는 하이브리드 전쟁의 핵심 도구다. 한국 선거에 중국이 개입했을 가능성은 실체적 진실에 가까워지고 있다. 미국의 여러 보고서와 전문가 분석은 중국의 민주주의 침투가 현실임을 경고한다.

이재명 정권은 이 문제를 은폐하거나 묻어두려 하지만, 국민의 눈은 속일 수 없다. 지금 필요한 것은 중국과의 외교를 ‘국가 보위 차원’에서 재정립하는 일이다. 단순히 외교부의 의전이나 통상 차원의 문제가 아니다. 국민의 안전·자유민주주의 체제의 존속·주권 수호라는 절체절명의 과제다. 중국이 벌이는 하이브리드 전쟁에 정면으로 맞서야 한다.

하이브리드 전쟁은 총칼만이 아니다. 통신망 해킹·가짜 뉴스 유포·선거 개입·경제 의존도를 통한 압박·불법 이주민과 범죄조직 활용·심리전 등 다층적 형태로 진행된다. 이미 한국은 상당히 깊숙이 공격받고 있다. 그런데도 정권은 중국과의 우호만 외친다. 이는 사실상 자국민을 전쟁터 한복판에 내던지는 것과 다르지 않다.

이제 대한민국은 선택해야 한다. 국민의 생명과 자유를 지킬 것인가, 아니면 중국의 눈치만 보며 미끄러지듯 속국으로 전락할 것인가. 선택은 늦출 수 없다. 이미 전쟁은 진행 중이고 피해는 눈앞에서 벌어지고 있다.

자세히보기
출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[{"text":"자세히보기","href":"https://www.truthdaily.co.kr/news/articleView.html?idxno=1487"}]'::jsonb, '[{"src":"assets/uploads/legacy/Culture_War-34-1.png","alt":"중국 지도와 오성홍기 앞에서 손으로 입을 가린 남성, 칼을 든 복면 괴한, 폭행당하는 사람들과 흰 천에 덮여 누운 사람이 그려진 삽화","width":600,"height":400,"after":1}]'::jsonb, '2025-09-23T23:17:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=34', null::date, null::date),
  ('legacy-TK_broadcast-58', 'broadcast', '핵토크(#1)/ 트루스데일리tv', '핵토크(#1)/ 트루스데일리tv', 'dYuDXGrhsxM', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-23T22:59:54+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=58', null::date, null::date),
  ('legacy-event-69', 'event', '자유민주시민회의 조찬포펌 미래의 아침', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-69-1.jpg","alt":"제4회 자유민주시민회의 조찬포럼 ‘미래의 아침’ 초대 포스터. 일시 2025년 9월 25일(목) AM 07시, 장소 클럽806 서울(서울특별시 종로구 인사동5길 42, 종로빌딩 2층), 특강 해방 80주년 특집: 38선 확정의 배경과 역사적 의의, 강사 이주천 박사(한국사 박사)","width":633,"height":960,"thumb":"assets/uploads/legacy/event-69-1-thumb.jpg","after":0}]'::jsonb, '2025-09-22T19:30:46+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=69', '2025-09-25'::date, '2025-09-25'::date),
  ('legacy-Culture_War-33', 'truth', '이재명 100일, 나라가 망가지고 있다.', '이재명 100일, 나라가 망가지고 있다.', 'Gq3C_vXlwog', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-21T23:13:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=33', null::date, null::date),
  ('legacy-TK_broadcast-55', 'broadcast', '[LIVE] 전한길뉴스 워싱턴 시위 현장 라이브', '[LIVE] 전한길뉴스 워싱턴 시위 현장 라이브', '3tfHax2D65Q', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-20T22:24:34+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=55', null::date, null::date),
  ('legacy-TK_broadcast-52', 'broadcast', '3대 종단, 국회서 헌재 규탄 합동성명', '종교계 지도자들, 윤석열 대통령 탄핵 파면 선고에 "불복" 선언…
"민주주의 사망, 부정선거 실체 공개하라"

2025년 9월 19일 기독교, 불교, 천주교 지도자들이 4월 헌법재판소의 윤석열 전 대통령 탄핵 파면 결정에 대해 "불복"을 선언하며, 민주주의 회복을 촉구하는 공동 성명을 발표했다. 이들은 더불어민주당 해체, 국민의힘 내 ''배반자'' 출당, 중앙선관위의 부정선거 조사 등을 요구하며, "윤석열 대통령은 여전히 대한민국의 지도자"라고 주장했다.

서울특별시 교회총연합회 운영위원장 박원영 목사는 이날 서울에서 열린 기자회견에서 "헌재의 8대 0 만장일치 파면 결정은 국민의 주권을 상실시킨 민주주의 사망 선고"라며 "우리는 이 부당한 판결을 거부하고, 윤석열 대통령이 여전히 대통령임을 선언한다"고 밝혔다. 박 목사는 지난 4개월간의 탄핵 반대 시위를 언급하며 "청년·대학생들이 추운 날씨와 피를 흘리며 나라를 지켰다. 국민의 불복은 헌법에 명시된 권리"라고 강조했다.

대한불교 조계종 성호 스님과 호국종 응천 스님도 연대 발언에 나섰다. 성호 스님은 "나라가 없으면 나도 없다"는 호국불교 사상을 인용하며, "이번 탄핵은 국회에서 터진 핵폭탄"이라 비판했다. 엉천 스님은 "헌재 재판관 전원을 국민 법정에 세워 처단해야 한다"며 "비상계엄은 반국가 세력으로부터 나라를 구하려 한 호국 결단"이라고 옹호했다. 스님들은 한용운 스님의 시 ''님의 침묵''을 인용해 이별과 재회를 상징적으로 표현하며, 자유민주주의 수호를 호소했다.

천주교계에서는 대한민국 천주교 수호모임 대표 이계성·박순혜 씨와 박상원 본부장이 참석해 "좌파 카르텔이 민주주의를 파괴했다"고 지적했다. 박 본부장은 "이승만·박정희·전두환 전 대통령의 헌신을 뒤늦게 깨달아야 한다"며 "국가 경제력이 바탕이 돼야 제대로 된 민주주의가 가능하다"고 말했다.

이들은 공동 요구사항으로 ① 더불어민주당 해체 ② 국민의힘 내 한동훈·최상목·정현식 등 ''배반자'' 출당 ③ 중앙선관위의 부정선거 실체 자백 및 공개(미이행 시 해체)를 제시했다. 박 목사는 "부정선거는 좌파 카르텔의 실체"라며 "윤석열 대통령의 계엄은 잠든 국민을 깨운 개명"이라고 평가했다.

회견에는 국민의힘 조배수 의원도 참석해 "보수 단일화와 정직한 국민의힘 재건"을 촉구했다. 종교계는 "세이브 코리아 등 시민사회와 광화문으로 모여 조기 대선 거부와 헌재·선관위 해체를 관철하자"고 호소했다.

한편, 헌재는 지난 4월 4일 오전 11시 22분 윤 전 대통령의 비상계엄 선포를 "헌법과 국민 신임에 중대 배반"으로 보고 8대 0 만장일치로 파면을 결정했다. 이는 2024년 12월 3일 계엄 사태 이후 123일 만의 결과로, 정치권에 큰 파장을 일으켰다. 보수 진영에서는 여전히 "권력 포획된 사법부"라는 비판이 이어지고 있다.', 'wOzkRCik8ss', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-19T14:57:21+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=52', null::date, null::date),
  ('legacy-event-60', 'event', '광화문 국민대회!', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-60-1.jpg","alt":"광화문 국민대회 포스터. 2025년 9월 20일(토) 오후 1시, 광화문 이승만광장(광화문역 5번출구 / 시청역 2번, 3번출구). 주최 대한민국바로세우기국민운동본부","width":720,"height":1280,"thumb":"assets/uploads/legacy/event-60-1-thumb.jpg","after":0}]'::jsonb, '2025-09-19T14:46:51+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=60', '2025-09-20'::date, '2025-09-20'::date),
  ('legacy-PresidentYoon-7', 'truth', '윤석열 대통령이 답드립니다', '윤석열 대통령이 답드립니다', 'HiOfrsVK554', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-18T22:55:03+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=7', null::date, null::date),
  ('legacy-Culture_War-32', 'truth', '슈카월드님께 한마디 올립니다', '슈카월드님께 한마디 올립니다', 'MhDLmNwN7hk', null, '[{"id":"6AgSMqFG-6g","after":1}]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-18T13:58:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=32', null::date, null::date),
  ('legacy-TK_NEWS-20', 'tknews', '[현장취재] 인천상륙작전 75주년, 마라도함 위에서 되새긴 자유와 평화', '대한민국 현대사의 전환점을 함께 되새기는 역사적 여정
"자유와 평화는 호국 영웅들의 피와 희생 위에 세워진 것"

12일 오후 2시 인천항 크루즈터미널에서는 제75주년 인천상륙작전을 기념하기 위해 준비된 ‘해상 헌화·팔미도 항해 체험 – 함 타보자’ 행사가 대형수송함 마라도함(1만4500t급) 위에서 열렸다. 시민과 참전국 인사, 해외에서 온 참전용사와 후손 등 500여 명이 승선한 이날의 항해는 단순한 체험이 아니라 대한민국 현대사의 전환점을 함께 되새기는 역사적 여정이었다.

마라도함이 인천항을 벗어나자 갑판 위에서는 식전 공연이 펼쳐졌다. 해군 장병들이 직접 준비한 무대는 긴장된 분위기를 한층 밝고 따뜻하게 만들었다. 비트박스팀의 힘 있는 리듬은 젊음의 에너지를 전했고 마술 공연은 아이들의 눈길을 사로잡았다. 해군군악대의 공연으로 참가자들의 마음을 한데 모은 다양한 행사들은 바다 위의 특별한 무대를 더욱 생동감 있게 채우며, 자유와 평화의 의미를 문화적 감동 속에 녹여냈다.

기념사에서 유정복 인천시장은 “팔미도는 인천상륙작전의 첫 신호탄이 울린 역사의 현장”이라며
“오늘 우리가 누리는 자유와 평화는 호국영웅들의 피와 희생 위에 세워진 것임을 다시금 가슴에 새기는 시간이
되기를 바란다”고 강조했다.

박태규 해군 참모부장(제독) 은 “대한민국 해군은 인천상륙작전의 정신을 이어받아 자유와 평화를 지키는 최후의 보루로서 앞으로도 변함없이 사명을 다할 것”이라며 결연한 의지를 밝혔다.

기사자세히보기

출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[{"text":"기사자세히보기","href":"https://www.truthdaily.co.kr/news/articleView.html?idxno=1331"}]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-20-1.jpg","alt":"‘고귀한 희생과 결단! 평화의 바다를 열다!’ 현수막이 걸린 군함 갑판 위 의자에 앉은 참가자들","width":600,"height":450,"caption":"해상헌화 팔미도 항해 체험 - 함 타보자 행사에 참여한 시민들과 참전용사와 가족들. 트루스데일리","thumb":"assets/uploads/legacy/TK_NEWS-20-1-thumb.jpg","after":1},{"src":"assets/uploads/legacy/TK_NEWS-20-2.jpg","alt":"바다를 뒤로 한 갑판 위 무대 연단에서 연설하는 사람과 이를 지켜보는 참석자들","width":600,"height":450,"caption":"마라도함에서 기념사를 하고 있는 유정복 인천시장. 트루스 데일리","thumb":"assets/uploads/legacy/TK_NEWS-20-2-thumb.jpg","after":3}]'::jsonb, '2025-09-17T19:33:34+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=20', null::date, null::date),
  ('legacy-TK_broadcast-49', 'broadcast', 'Charlie Kirk Last Speech in Korea | 찰리 커크의 마지막 외침 | 빌드업코리아에서 남긴 운명의 연설 | Build Up Korea 2025', 'Charlie Kirk Last Speech in Korea | 찰리 커크의 마지막 외침 | 빌드업코리아에서 남긴 운명의 연설 | Build Up Korea 2025', 'uKdhFqHO1ig', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-16T17:56:16+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=49', null::date, null::date),
  ('legacy-TK_broadcast-48', 'broadcast', '애국자인척하는 이재명 조국 역겹다.', '애국자인척하는 이재명 조국 역겹다. 감히 내 앞에서 애국자인 척을 해??? 독립운동가 집안 인요한 의원', 'sarouoynOfs', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-16T00:42:01+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=48', null::date, null::date),
  ('legacy-TK_broadcast-47', 'broadcast', '[현장영상] 증인 입에서 나온 이름 ''이.재.명'' 한 순간 정적이 흐르는 청문회장', '[현장영상] 증인 입에서 나온 이름 ''이.재.명'' 한 순간 정적이 흐르는 청문회장', 'QX0dQpDPudk', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-15T12:37:14+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=47', null::date, null::date),
  ('legacy-event-48', 'event', '찰리커크를 함께 기억하며', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-48-1.jpg","alt":"‘찰리 커크를 함께 기억하며(In Memory of Charlie Kirk)’ 안내. 2025.09.15.(월) 07:30~22:00, 서울 중구 남대문로 2-5 찰리 커크 추모 공간. 마이크를 들고 말하는 찰리 커크의 사진","width":1000,"height":1250,"thumb":"assets/uploads/legacy/event-48-1-thumb.jpg","after":0}]'::jsonb, '2025-09-14T19:57:44+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=48', '2025-09-15'::date, '2025-09-15'::date),
  ('legacy-event-47', 'event', '75주년 인천상륙작전 전승기념식', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-47-1-web.jpg","alt":"인천상륙작전 전승기념식(The 75th Incheon Landing Operation Victory Commemoration Ceremony) 포스터. 2025/09/15(월) 09:30, 인천자유공원 맥아더동상 앞 광장. 교통편 1호선 인천역 하차(셔틀버스 운행). 주최 한미맥아더장군기념사업회, 사단법인 우리민족교류협회, 사단법인 한국기독교보수교단총연합회","width":1187,"height":1588,"thumb":"assets/uploads/legacy/event-47-1-thumb.jpg","full":"assets/uploads/legacy/event-47-1.png","after":0},{"src":"assets/uploads/legacy/event-47-2.png","alt":"‘초청의 말씀’ 안내문. 제75주년 인천상륙작전 전승 기념식, 2025년 9월 15일(월) 09:30, 인천 자유공원 맥아더 장군 동상 앞 광장. 교통편: 지하철 1호선 인천역 하차(셔틀버스 운행), 도보 12분 거리. 인천역에서 행사장까지 가는 길이 표시된 지도","width":917,"height":1185,"thumb":"assets/uploads/legacy/event-47-2-thumb.jpg","after":0},{"src":"assets/uploads/legacy/event-47-3-web.jpg","alt":"인천상륙작전 제75주년 순서지. 제1부 전승감사예배와 제2부 전승기념식의 순서와 맡은 사람이 적혀 있습니다","width":1400,"height":993,"thumb":"assets/uploads/legacy/event-47-3-thumb.jpg","full":"assets/uploads/legacy/event-47-3.png","after":0}]'::jsonb, '2025-09-14T19:37:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=47', '2025-09-15'::date, '2025-09-15'::date),
  ('legacy-PresidentYoon-5', 'truth', '윤석열 대통령, 백악관에서 ‘아메리칸 파이’ 열창… 문화로 소통한 특별한 순간', '“American Pie”로 추억을 되새긴 특별한 순간

윤석열 대통령이 미국 백악관에서 열린 행사에서 학창 시절 가장 좋아했던 노래로 꼽은 **〈American Pie〉**를 직접 부르며 현장의 분위기를 한층 뜨겁게 달궜다.

윤 대통령은 지지자들의 요청에 따라 노래의 일부 구절을 잠시 불렀으며, 음악이 사람들에게 행복을 주던 시절을 회상했다. 그는 짧은 노래 속에서 당시의 추억과 감정을 전하며 음악의 힘을 강조했다.
행사 중 윤 대통령은 기타에 대한 애정을 드러내기도 했다. 특히 〈American Pie〉의 원곡자인 가수 돈 맥클린(Don McLean)은 윤 대통령의 노래에 감동을 받았다는 메시지를 전하며, 다음 날 저녁 식사 자리에 초대하고 싶다는 의사를 밝힌 것으로 전해졌다.

이날 현장은 단순한 노래 이상의 의미를 담고 있었다. 정치적 의제와는 별개로, 음악과 문화라는 공통의 언어를 통해 국제 무대에서 소통하는 윤 대통령의 또 다른 면모가 드러났기 때문이다. 윤 대통령은 마지막으로 참석자들에게 감사 인사를 전하며, “이 순간이 매우 영광스럽다”고 소감을 밝혔다.

이번 장면은 윤 대통령의 인간적인 모습과 더불어, 문화적 교류가 외교적 소통의 새로운 창구로 작용할 수 있음을 보여주는 상징적인 순간으로 평가된다.', '8EGMUnPIwGo', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-09T23:03:57+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=5', null::date, null::date),
  ('legacy-event-39', 'event', '부산국민대회[헌법 짓밟는 악법 제조당]위헌정당 해산 천만서명', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-39-1-web.jpg","alt":"‘헌법 짓밟는 악법 제조당, 위헌정당 해산 천만서명 부산 국민 대회’ 포스터. 일시·장소 9월 11일(목) 오후 1시, 서면역 영광도서 앞. 연사 고영주, 이재춘, 홍수환, 이석우, 김정원, 최영호, 사회 박성률. 거리행진이 있습니다. 위헌정당해산국민운동본부, 자유민주당","width":1192,"height":1685,"thumb":"assets/uploads/legacy/event-39-1-thumb.jpg","full":"assets/uploads/legacy/event-39-1.png","after":0}]'::jsonb, '2025-09-09T20:21:12+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=39', '2025-09-11'::date, '2025-09-11'::date),
  ('legacy-event-38', 'event', '자교모 16차 학술세미나', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-38-1.jpg","alt":"자교모 16차 학술세미나 포스터. ‘이재명 집권 100일의 기록과 평가: 자유민주주의와 시장경제 파괴’. 일시 2025년 9월 11일(목) 오후 2~5시, 장소 서울 서초동 라이프 비즈니스센타 지하 1층 샤론홀(서초역 3번 출구). 사회 최창규 교수, 발제 조동근 교수, 신도철 교수, 김병준 교수, 이제봉 교수. 참가비 1만원. 공동주최 자유와 정의를 실천하는 교수모임(자교모), 바른사회시민회의","width":1000,"height":1238,"thumb":"assets/uploads/legacy/event-38-1-thumb.jpg","after":0}]'::jsonb, '2025-09-09T20:20:26+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=38', '2025-09-11'::date, '2025-09-11'::date),
  ('legacy-event-53', 'event', '자교모 17차 학술세미나', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-53-1.jpg","alt":"자교모 17차 학술 세미나 포스터. 논제 ‘한국 정치의 당쟁성과 종족성 비판’, 강연 이영훈 교수(이승만 학당 교장). 일시 2025년 9월 18일(목) 오후 2~5시, 장소 서울 서초동 서울지방변호사회관 지하대강당(서초역 8번 출구). 참가비 1만원. 자유와 정의를 실천하는 교수모임(자교모)","width":1000,"height":1238,"thumb":"assets/uploads/legacy/event-53-1-thumb.jpg","after":0}]'::jsonb, '2025-09-09T20:16:11+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=53', '2025-09-18'::date, '2025-09-18'::date),
  ('legacy-event-63', 'event', '미주한인포럼', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-63-1.jpg","alt":"미주 한인 포럼(Korean American Community Forum) 포스터. 황교안 대표, 이희천 교수, 박주현 변호사, 이춘근 박사, 김성원 대표(그라운드C) 사진. 일시 2025년 9월 19일 ~ 20일, 장소 Washington D.C, 주최 미주 청년 연합","width":1063,"height":1280,"thumb":"assets/uploads/legacy/event-63-1-thumb.jpg","after":0}]'::jsonb, '2025-09-09T20:14:57+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=63', '2025-09-19'::date, '2025-09-20'::date),
  ('legacy-event-66', 'event', '할렐루야 2025 대뉴욕 복음화 대회', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-66-1.jpg","alt":"할렐루야 2025 대뉴욕 복음화대회(Hallelujah New York Evangelical Crusade) 포스터. 일시 2025. 9.19(금)~9.21(주일), 장소 프라미스교회(허연행 목사), 130-30 31st Ave., Flushing, NY 11354. 강사 김한요 목사, 마크 최 목사, 이혜진 목사. 주최 뉴욕지구한인교회협의회","width":1308,"height":1934,"thumb":"assets/uploads/legacy/event-66-1-thumb.jpg","after":0}]'::jsonb, '2025-09-09T20:14:05+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=66', '2025-09-19'::date, '2025-09-21'::date),
  ('legacy-event-67', 'event', '자교모 18차 학술 세미나', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-67-1.jpg","alt":"자교모 18차 학술세미나 포스터. 미중 하이브리드 파워게임, 신냉전시대 한국의 미중전략. 발표 이춘근 박사(국제정치아카데미 대표), 김상순 박사(동아시아평화연구원 이사장). 일시 2025년 10월 2일(목) 오후 2~5시, 장소 서울 서초동 라이프 비즈니스센터 지하2층(서초역 3번 출구). 자유와 정의를 실천하는 교수모임(자교모)","width":1000,"height":1238,"thumb":"assets/uploads/legacy/event-67-1-thumb.jpg","after":0}]'::jsonb, '2025-09-09T20:12:57+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=67', '2025-10-02'::date, '2025-10-02'::date),
  ('legacy-event-37', 'event', '워싱턴 트루스 포럼', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-37-1.jpg","alt":"워싱턴 트루스 포럼(WASHINGTON D.C. TRUTH FORUM) 포스터. September 13, 2025 at 2:00 - 6:00 pm, Westfields Marriott Washington Dulles(14750 Conference Center Dr, Chantilly, VA 20151). 연사 모스 탄 대사, 고든 창 작가(변호사), 전한길 대표, 김은구 대표. 주최 TRUTH FORUM USA / TRUTH FORUM D.C.","width":856,"height":1311,"thumb":"assets/uploads/legacy/event-37-1-thumb.jpg","after":0}]'::jsonb, '2025-09-09T19:49:21+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=37', '2025-09-13'::date, '2025-09-13'::date),
  ('legacy-Culture_War-30', 'truth', '조지아 구금 상태, 이재명 외교 참사 결과!!', '조지아 구금 상태, 이재명 외교 참사 결과!!', '8Ro_KSyYFMQ', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-08T21:37:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=30', null::date, null::date),
  ('legacy-PresidentYoon-3', 'truth', '윤 대통령 "사랑이 필요한 거죠"', '윤석열 대통령 "사랑이 필요한 거죠"', 'm6VcuKmcgqQ', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-07T22:33:07+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=3', null::date, null::date),
  ('legacy-PresidentYoon-2', 'truth', '''국민 약탈하는 정권 교체'', 윤석열 대통령  대선 출마 선언 [2021.7.9]', '''국민 약탈하는 정권 교체'', 윤석열 대통령 대선 출마 선언 [2021.7.9] 영상', 'glQHNNg6SJ8', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-07T22:31:14+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=2', null::date, null::date),
  ('legacy-Culture_War-29', 'truth', '부정선거 신의 작품인가 메인 예고편', '부정선거 신의 작품인가 메인 예고편', 'ts4RiEs00tw', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-07T20:56:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=29', null::date, null::date),
  ('legacy-TK_broadcast-54', 'broadcast', '차강석 배우, 정부영 대표, 미국 트럼프 정부에 대한 요청 성명서 발표 250828', '차강석 배우, 정부영 대표, 미국 트럼프 정부에 대한 요청 성명서 발표 250828', '5KjzqkNTQO0', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-06T23:04:10+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=54', null::date, null::date),
  ('legacy-TK_NEWS-19', 'tknews', '[긴급 기자회견] “부정선거, 가짜 이재명 구속하라”', '이재명 정부의 국격 참사
외교 참사,
안보 참사,
경제 참사를 규탄하며

2025년 8월 28일 목요일, 서울에서 ‘부정선거 규탄 및 가짜 이재명 구속 촉구 긴급 기자회견’이 열렸다. 이번 기자회견은 서버까, 자유교수모임(자교모), TruthKorea 국민주권재단이 공동 주최했다.

행사는 오경영 대표의 사회로 진행됐으며, 국민의례와 애국가 제창, 호국영령에 대한 묵념으로 시작됐다.
첫 연사로 나선 민경욱 전 의원은 “대한민국이 직면한 가장 큰 문제는 부정선거”라고 지적하며,

최근 논란이 된 600조 원 규모의 해외 투자에 대해 “이는 단순한 투자 명목이 아니라 국민 세금과 맞먹는 막대한 재정 부담”이라고 강하게 비판했다.

주최 단체와 참석자들은 이번 기자회견에서 ▲이재명 정부의 국격 참사, 외교 참사, 안보 참사, 경제 참사를 규탄하며 ▲“선거를 훔친 자는 대한민국을 대표할 자격이 없다”고 목소리를 높였다.

이들은 “레거시 미디어가 제 역할을 하지 못하는 상황에서 애국 시민과 유튜버들이 진실을 밝히고 있다”며, 부정선거 진상 규명과 정치 지도자에 대한 강력한 법적 조치를 촉구했다.', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-19-1.jpg","alt":"세종대왕 동상 앞에서 ‘부정선거 가짜 대통령 탄핵 긴급기자회견’ 현수막과 손팻말을 들고 선 참석자들","width":1000,"height":563,"thumb":"assets/uploads/legacy/TK_NEWS-19-1-thumb.jpg","after":1},{"src":"assets/uploads/legacy/TK_NEWS-19-2.jpg","alt":"기자회견에서 마이크를 들고 발언하는 참석자와 옆에 선 참석자들","width":1000,"height":563,"thumb":"assets/uploads/legacy/TK_NEWS-19-2-thumb.jpg","after":4},{"src":"assets/uploads/legacy/TK_NEWS-19-3.jpg","alt":"태극기와 성조기 앞에서 마이크를 들고 발언하는 참석자","width":1000,"height":563,"thumb":"assets/uploads/legacy/TK_NEWS-19-3-thumb.jpg","after":4},{"src":"assets/uploads/legacy/TK_NEWS-19-4.jpg","alt":"성조기 옆에서 마이크를 들고 발언하는 참석자","width":1000,"height":675,"thumb":"assets/uploads/legacy/TK_NEWS-19-4-thumb.jpg","after":4},{"src":"assets/uploads/legacy/TK_NEWS-19-5.jpg","alt":"‘STOP THE STEAL’ 모자를 쓰고 마이크로 발언하는 참석자","width":1000,"height":712,"thumb":"assets/uploads/legacy/TK_NEWS-19-5-thumb.jpg","after":4},{"src":"assets/uploads/legacy/TK_NEWS-19-6.jpg","alt":"‘CCP OUT’ 현수막 앞 의자에 앉아 있는 집회 참석자들","width":1000,"height":563,"thumb":"assets/uploads/legacy/TK_NEWS-19-6-thumb.jpg","after":6},{"src":"assets/uploads/legacy/TK_NEWS-19-7.jpg","alt":"가로수 아래 의자에 앉아 깃발을 든 집회 참석자들","width":1000,"height":563,"thumb":"assets/uploads/legacy/TK_NEWS-19-7-thumb.jpg","after":6},{"src":"assets/uploads/legacy/TK_NEWS-19-8.jpg","alt":"무대 차량과 대형 화면 앞에 모인 집회 참석자들","width":1000,"height":563,"thumb":"assets/uploads/legacy/TK_NEWS-19-8-thumb.jpg","after":6}]'::jsonb, '2025-09-05T11:15:14+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=19', null::date, null::date),
  ('legacy-TK_broadcast-41', 'broadcast', '보수단체들 긴급기자회견, 이재명 트럼프 한미회담', '보수단체들 긴급기자회견, 이재명 트럼프 한미회담', 'OM3uKtaurKY', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-09-05T10:58:19+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=41', null::date, null::date),
  ('legacy-TK_broadcast-40', 'broadcast', '서울 이태원 젊은이들의 계몽행진.', '서울 이태원 젊은이들의 계몽행진.', 'wpz_2WCfZlI', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-31T20:42:16+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=40', null::date, null::date),
  ('legacy-Culture_War-27', 'truth', '"카톡 싫어요" 요즘 MZ는 대신 "이 앱"으로 대화합니다', '"카톡 싫어요" 요즘 MZ는 대신 "이 앱"으로 대화합니다

''1년전'' 4천만 명 개인정보 중국 알리에 몽땅 넘긴 카톡!
카톡은 중국의 정보원인가?

카카오페이, 4천만 명 개인정보 542억 건 무단 제공 논란

금융당국, 신용정보법 위반으로 과징금 부과…경찰 수사 착수

카카오페이가 약 6년간 4,045만 명의 이용자 개인신용정보 542억 건을 이용자 동의 없이 중국 알리페이(앤트그룹 계열사)의 싱가포르 법인에 제공한 사실이 드러나 파문이 일고 있다. 금융감독원(금감원)과 개인정보보호위원회(개보위)의 조사 결과, 이 같은 행위가 신용정보법 및 개인정보보호법 위반으로 확인되며 카카오페이에 총 59억 6,800만 원, 애플에 23억 6,300만 원의 과징금이 부과됐다. 경찰은 개인정보 유출 혐의로 수사에 착수했었다!

6년간 이어진 무단 정보 제공

금감원의 발표에 따르면, 카카오페이는 2018년 4월부터 2023년 5월까지 애플 앱스토어 결제 서비스 연동을 위한 부정결제 방지(NSF, Non-Sufficient Funds) 점수 산출 모델 구축을 명목으로 이용자 동의 없이 개인신용정보를 알리페이에 제공했다. 제공된 정보에는 카카오계정 ID, 핸드폰 번호, 이메일, 결제·송금·환전 내역 등이 포함됐다. 이는 약 4천만 명에 달하는 이용자의 데이터를 총 542억 건에 걸쳐 전송한 것으로, 국내 핀테크 역사상 유례없는 규모의 개인정보 유출 사건으로 평가된다.

금감원은 카카오페이와 알리페이 간 계약서에 NSF 점수 산출 및 제공 업무를 명시한 내용이 없으며, 모델 구축 완료 후에도 불필요하게 정보 제공이 지속됐다고 지적했다. 특히, 카카오페이가 알리페이를 애플의 수탁사로 간주하며 정보 제공의 정당성을 주장했으나, 이용자 동의 절차를 생략한 점이 문제로 드러났다.

금융당국과 개보위의 강력 대응

금감원은 2024년 5월부터 7월까지 카카오페이에 대한 정기 검사에서 이 같은 사실을 적발, 신용정보법 위반으로 과징금 150억 원(추정)을 예고했다. 이어 개인정보보호위원회는 2025년 1월, 카카오페이에 59억 6,800만 원, 애플에 개인정보 국외 이전 고지 미이행으로 23억 6,300만 원의 과징금을 각각 부과했다.

개보위는 “카카오페이가 이용자 동의 없이 개인정보를 국외로 전송한 행위는
명백한 법 위반”이라며 강한 유감을 표했다.

한편, 경찰은 2024년 9월부터 카카오페이에 대한 개인정보 유출 혐의 수사를 진행했다.
수사 결과에 따라 추가적인 법적 책임이 부과될 가능성도 제기된다.', 'S0Kc4NPL9yo', null, '[{"id":"8kpbBiheqIU","after":2}]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-29T03:17:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=27', null::date, null::date),
  ('legacy-TK_broadcast-39', 'broadcast', '*미국 출국중/전한길선생 긴급(영상)메세지 *광화문*써버까/국민주권재단-주최행사에 *가짜 대통령구속/탄핵하라-기자회견과 교보빌딩앞 집회에서', '*미국 출국중/전한길선생 긴급(영상)메세지 *광화문*써버까/국민주권재단-주최행사에 *가짜 대통령구속/탄핵하라-기자회견과 교보빌딩앞 집회에서', 'Rg-g1ntK9wM', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-28T20:03:25+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=39', null::date, null::date),
  ('legacy-event-27', 'event', '긴급기자회견', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-27-1.jpg","alt":"‘긴급 기자회견: 부정선거 가짜 대통령 구속하라’ 포스터. 2025. 8. 28(목) 16시 세종대왕상 앞(1부 기자회견, 2부 교보빌딩 앞 특별 집회), 8. 30(토) 17시 서울역광장(집회 후 명동방향 행진). 초청 연사와 주최 단체 명단, 정치인들의 얼굴 사진이 실려 있습니다","width":1400,"height":2075,"thumb":"assets/uploads/legacy/event-27-1-thumb.jpg","after":0}]'::jsonb, '2025-08-28T19:49:12+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=27', '2025-08-28'::date, '2025-08-30'::date),
  ('legacy-event-26', 'event', '숨기려는 자 큰 진실 앞에 서다!', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-26-1-web.jpg","alt":"‘숨기려는 자 큰 진실 앞에 서다(Truth Meets Falsehood)’ 집회 포스터. 2025. 8. 23(토) 17:00 서울역광장, 집회 후 행진 명동 일대. 초청 연사 장재언 박사, 김병준 교수, 이제봉 교수, 남광규 교수, 정부영 트루스코리아 대표, 이영풍tv 대표, 2030 청년들 외 다수. 주최 선관위서버까국민운동본부, 자교모, 트루스코리아, 대장연. 정치인들의 얼굴 사진이 크게 실려 있습니다","width":1400,"height":1970,"thumb":"assets/uploads/legacy/event-26-1-thumb.jpg","full":"assets/uploads/legacy/event-26-1.png","after":0}]'::jsonb, '2025-08-21T18:30:59+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=26', '2025-08-23'::date, '2025-08-23'::date),
  ('legacy-TK_NEWS-17', 'tknews', '[정부영칼럼] 의혹 제기마저 ‘극우’ 낙인… 스스로 신뢰 무너뜨리는 ‘사이비 언론’', '선거 의혹을 검증하기보다 제기자를 매도… 권력의 방패로 전락한 저널리즘
표현 자유를 억압하는 언론, 결국 역사 앞에서 ‘민주주의의 적’으로 기록될 것

리커브 남자 양궁 국가대표 장채환 선수가 지난 6·3 대통령 선거 사전투표 결과가 조작됐다는 의혹을 제기하는 글을 SNS에 올리자, 국내 유력 매체들이 일제히 “극우 성향 게시물”이라는 딱지를 붙였다. 국제뉴스, 국제신문, 데일리안, 문화일보, 머니투데이, 미주중앙일보, 세계일보, 스포츠경향, 스타뉴스, 아시아경제, 연합뉴스, 뉴시스, 한겨레, 중앙일보, 강원도민일보, 싱글리스트, 노컷뉴스까지 총 17개 매체가 한목소리였다. 마치 짜맞춘 듯한 이 합창은 그 자체로 언론 생태계가 얼마나 획일화됐는지를 드러낸다.

문제는 단순하다. 장채환이 제기한 의혹이 사실이냐 아니냐의 문제는 차치하고서라도, 의혹 제기를 “극우 성향”으로 매도하는 태도는 저널리즘의 기본을 스스로 저버리는 것이다. 대한민국 인구의 절반 이상이 선거 과정의 불투명성에 합리적 의심을 품고 있다고 알려져 있다. 민경욱 전 의원 등 실제로 선거 과정에서 피해를 주장한 사례도 존재한다. 게다가 트럼프 전 미국 대통령의 책사로 알려진 고든 창 변호사, 모스 탄 전 미국 국무부 국제형사사법대사 등 국제사회에서 권위를 가진 인물들이 한국의 선거 과정에 중대한 의혹이 있다고 수차례 공표해왔다. 그런데도 국내 언론은 이를 다루기보다 오히려 의혹 제기자들을 ‘괴짜’나 ‘극우’로 몰아세운다.

민주주의는 의심과 검증을 통해 굳건해지는 제도다. 선거가 깨끗했음을 입증하는 길은 ‘의혹을 제기하는 자’의 입을 막는 것이 아니라, 의혹을 투명하게 다루고 치밀하게 검증하는 과정이다. 언론은 그 검증을 돕는 장치여야 한다. 그러나 지금의 언론은 검증을 포기하고, 의혹 제기자를 사회적 낙인으로 몰아침으로써 권력의 방패로 전락했다.

특히 이번 사안은 더 기가 막히다. 헌법 전문에도 분명히 “4·19 민주이념을 계승”한다고 명시돼 있다. 4·19 정신은 바로 부정선거를 거부하고 바로잡자는 국민적 저항에서 비롯되었다. 그렇다면 부정선거 의혹을 제기하는 행위는 헌법적 권리이자, 어떤 의미에서는 헌법적 의무라고까지 할 수 있다. 그런데 한국 언론은 이 권리를 행사하는 개인을 ‘극우’로 몰아붙였다. 이는 헌법 정신에 대한 몰이해이자, 스스로 언론임을 포기하는 행위다.

더구나 ‘극우 성향’이라는 표현은 정치적 낙인찍기에 불과하다. 극우란 무엇인가. 폭력이나 차별을 옹호하는 세력에게나 붙일 말이다. 그러나 선거에 대한 의혹 제기는 민주주의에서 가장 기본적 권리인 표현의 자유와 맞닿아 있다. 그럼에도 불구하고 언론이 뭉쳐 “극우”라는 프레임을 씌운 것은, 비판적 사고를 금지시키려는 집단적 자기 검열에 지나지 않는다. 이는 저널리즘의 타락이자, 국민을 어리석게 보는 오만한 태도다.

언론이 이렇게 앞다투어 ‘극우’ 낙인을 찍을 때, 그 속내는 투명하다. 선거 제도와 결과에 대한 문제 제기를 꺼려하는 기득권 구조, 그리고 그것을 떠받드는 언론의 자기검열이 맞물려 있는 것이다. 그러나 잊지 말아야 한다. 국민은 더 이상 무지하지 않다. 수많은 국민이 이미 선거의 공정성을 의심하고 있으며, 국제사회에서도 유력 인사들이 의혹을 공표하고 있다. 그런 상황에서 언론이 ‘극우’ 낙인으로 국민의 합리적 의심을 봉쇄하려 한다면, 오히려 언론에 대한 불신만 깊어질 뿐이다.

언론의 역할은 권력을 감시하고, 의혹을 제기한 목소리를 사회적 토론으로 연결하는 것이다. 그런데 지금 우리 언론은 권력을 감시하기는커녕 권력의 불편한 질문을 ‘극우’라는 이름으로 짓밟고 있다. 그것은 언론이 아니라 권력의 확성기일 뿐이다.

장채환 선수 개인의 정치적 입장에 동의하느냐 여부는 본질이 아니다. 본질은 국민 누구라도 선거에 의혹을 제기할 권리가 있으며, 그 권리를 보장하는 것이야말로 민주주의라는 점이다. 언론이 이 사실을 외면하고 의혹 제기자를 ‘극우’로 매도한다면, 결국 역사 앞에 언론 스스로가 ‘민주주의의 적’으로 기록될 것이다.

2000자 가까운 분량의 글을 마무리하며 묻는다. 의혹 제기를 ‘극우’라고 단정하는 언론은 과연 스스로를 민주주의 언론이라고 부를 자격이 있는가. 국민을 계몽할 수 있다고 믿는 순간, 언론은 국민으로부터 이미 버림받은 것이다.

출처 : 트루스데일리(https://www.truthdaily.co.kr)', '5KjzqkNTQO0', 3, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-17-1.jpg","alt":"‘정부영칼럼’ 게시물에 실린 인물 사진","width":250,"height":339,"after":1}]'::jsonb, '2025-08-20T00:29:55+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=17', null::date, null::date),
  ('legacy-truth-13', 'truth', '청년단체 몰려와 노봉법 규탄 "화 나면 회사 박살내나"', '청년단체 몰려와 노봉법 규탄 "화 나면 회사 박살내나"', 'no6jVOxGtzg', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-19T21:53:40+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=truth&wr_id=13', null::date, null::date),
  ('legacy-TK_NEWS-16', 'tknews', '[속보] 트럼프 “우편투표 전면 폐지” 행정명령 추진… 美선거제도 대변혁 예고', '2026년 중간선거 앞두고 선거제도 개혁 카드 꺼내며 정치권 논란 확산

워싱턴 정가에 또 한 번 파장이 일었다. 도널드 트럼프 미국 대통령이 “미국 선거에서 우편투표를 전면 폐지하겠다”라고 공개적으로 선언했기 때문이다. 그는 자신의 SNS 플랫폼 ‘트루스 소셜(Truth Social)’에 장문의 게시물을 올리며, 우편투표와 전자 투표기 자체를 없애겠다는 행정명령에 서명하겠다고 예고했다.

“우편투표는 사기의 문”… 트럼프의 반복된 의혹 제기

트럼프 대통령의 메시지는 단호했다.

“우편 투표는 결코 정직할 수 없습니다. 민주당도 알고 있습니다. 투표기 사기 역시 지금 당장 종식되어야 합니다.”

그는 전자투표기를 ‘부정확하고, 비싸며, 논란만 키우는 장비’라고 비판하며, 워터마크가 새겨진 용지 투표 방식을 대안으로 내세웠다. “그 방식이라면 개표가 끝나는 저녁에 승패가 명확히 갈린다”는 것이다.

트럼프 대통령은 미국이 “전 세계에서 아직도 우편투표를 하는 유일한 나라”라며, 다른 나라들이 대규모 사기 때문에 이미 포기했다고 주장했다.

2026년 중간선거 겨냥한 ‘행정명령 카드’

트럼프 대통령은 이번 조치가 2026년 중간선거의 공정성을 확보하기 위한 것이라고 강조했다. 그는 “민주당은 정책이 실패했기 때문에 우편투표를 이용해 부정을 저지른다”라며, 공화당이 반드시 이를 막아야 한다고 촉구했다.

특히 그는 주정부의 선거 권한에 대해 “주들은 단지 집계와 보고를 맡는 연방 정부의 대리인에 불과하다”라며, 연방 차원의 선거 제도 개편 필요성을 역설했다. 이는 주 정부의 선거 권한을 중시하는 미국 헌법 체계와 정면으로 충돌하는 주장이다.

트랜스젠더·이민 문제까지 끌어들인 정치적 수사

트럼프 대통령은 선거제도 개혁 요구를 민주당 비판과 연결했다. 그는 “민주당이 여성 스포츠에 트랜스젠더 남성을 허용하고, 느슨한 국경 정책을 유지하는 한, 국민은 그들을 지지하지 않을 것”이라며, 우편투표가 민주당을 위한 “부정의 통로”라고 몰아붙였다.

반복되는 트럼프의 ‘우편투표 불신’

트럼프 대통령의 우편투표 불신은 어제오늘 일이 아니다. 2020년 대선부터 그는 줄곧 우편투표를 “부정선거의 도구”라고 지적했다. 실제로 2024년 선거 직전 보수 매체 ‘데일리 와이어’는 “우편투표지가 이미 사망자나 타주 이주자에게 발송됐다”는 사례를 보도하며 의혹을 키운 바 있다.

이번에도 그는 젤렌스키 우크라이나 대통령과의 공동 기자회견 자리에서 공화당에 거듭 강조했다. “우편투표를 막아야 합니다. 민주당은 우편투표가 있어야만 이길 수 있기 때문입니다.”

美 선거제도, 다시 혼돈 속으로?

트럼프 대통령의 변호인단은 현재 우편투표를 표적으로 한 행정명령 초안 작성에 착수한 것으로 알려졌다. 그러나 법적 효력과 현실성은 의문이다. 헌법상 선거 운영은 주정부 권한에 속하기 때문이다.

그럼에도 불구하고 트럼프의 발언은 미국 내 선거제도를 둘러싼 정치적 갈등을 다시금 증폭시키고 있다. 우편투표와 전자투표를 둘러싼 논쟁은 단순한 기술적 문제가 아니라, 민주주의의 신뢰 기반을 흔드는 정치 전쟁으로 번지고 있다.

출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-16-1.png","alt":"성조기 앞의 인물과 러시아 국기 앞의 인물, 물음표가 붙은 투표함이 그려진 만평. 말풍선: ‘2020년 미국 대선이 조작됐다’, ‘우편투표는 정직한 선거 불가능해’, ‘그러면, 한국 선거는?’","width":600,"height":400,"after":1}]'::jsonb, '2025-08-19T19:44:52+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=16', null::date, null::date),
  ('legacy-Culture_War-24', 'truth', '[자유대학 Live] china lee OUT! in 명동', '[자유대학 Live] china lee OUT! in 명동', 'TDFS6eaBtpg', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-19T19:41:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=24', null::date, null::date),
  ('legacy-TK_broadcast-32', 'broadcast', '써버까범시민단체, CCP OUT 부정선거 주범?', '써버까범시민단체, CCP OUT 부정선거 주범?', 'tSb414r8a8g', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-17T10:12:12+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=32', null::date, null::date),
  ('legacy-event-25', 'event', '광복 80주년 코리안드림 한강대축제', '', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/event-25-1.png","alt":"광복80주년 코리안드림 한강대축제 포스터. 08월15일 저녁 7시, 뚝섬 한강공원 수변광장(7호선 자양역 2번 출구). 80주년 기념식, 인기가수 축하공연, 드론쇼, 불꽃쇼 등. 주최.주관 코리안드림 한강대축제조직위원회","width":821,"height":1118,"thumb":"assets/uploads/legacy/event-25-1-thumb.jpg","after":0}]'::jsonb, '2025-08-15T13:06:33+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=25', '2025-08-15'::date, '2025-08-15'::date),
  ('legacy-TK_NEWS-15', 'tknews', '소비쿠폰 ‘받고, 쓰고, 기부하자’ 국민 기부 캠페인 시작', '최광 前국민연금이사장 ‘세이브국민주권재단’ 출범
‘포퓰리즘적 세금 살포’ 맞서 애국펀드 마중물 마련
진실·자유·주권 수호 위한 국민의 조용한 행동 개시

진실과 자유, 그리고 국민의 주권을 수호하기 위한 본격적인 행동이 시작됐다. 7월 31일 용산 국방컨벤션센터에서는 각계각층의 종교·시민사회 인사들이 참석한 가운데 ‘트루스데일리’ 창간식과 함께 ‘세이브국민주권재단(SAVE the Sovereignty)’ 출범식이 성황리에 개최됐다. 이날 행사는 이재명정부의 ‘포퓰리즘적 세금 살포’에 맞서 국민 스스로가 주권을 되찾고 국가 정상화를 위한 마중물을 만들겠다는 강력한 의지를 천명하는 자리였다.

‘받고, 쓰고, 기부하자’… 시민들의 조용한 저항

이날 출범식의 핵심 의제는 이재명정부가 전 국민에게 지급하는 15만 원의 소비쿠폰을 ‘자유의 불씨’ ‘진실의 씨앗’으로 바꾸자는 ‘받고, 쓰고, 기부하자’ 국민 기부 캠페인이었다. 정부의 포퓰리즘 정책에 대해 무작정 거부하기보다는, 국민의 피 같은 세금을 국민주권 회복과 애국운동에 재투자하자는 새로운 형태의 비폭력 저항 운동을 제안한 것이다.

이를 위해 트루스코리아와 트루스데일리가 주도하는 ‘세이브국민주권재단’이 공식 출범했다. 초대 이사장은 국민연금공단 이사장과 보건복지부 장관을 역임한 최광 대구대 석좌교수가 추대돼 국민주권재단의 신뢰성을 더했다.

자세히보기

출처 : 트루스데일리
https://www.truthdaily.co.kr/news/articleView.html?idxno=836', null, null, '[]'::jsonb, '[{"text":"자세히보기","href":"https://www.truthdaily.co.kr/news/articleView.html?idxno=836"}]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-15-1.jpg","alt":"‘트루스데일리 창간 & SAVE국민주권재단 출범’ 현수막 앞 무대에 선 세 사람","width":600,"height":353,"caption":"7월 31일 용산 국방컨벤션센터에서 열린 ‘트루스데일리’ 창간식 겸 ‘세이브국민주권재단’ 출범식에서 사회자 박원영(왼쪽) 목사(서울특별시교회총연합회·서울특별시조찬기도회 사무총장)가 정부영(가운데) 트루스코리아 대표와 조정진 트루스데일리 대표기자를 소개하고 있다. 트루스데일리","after":1},{"src":"assets/uploads/legacy/TK_NEWS-15-2.jpg","alt":"‘SAVE 국민주권재단 어떻게 동참하나요?’라고 쓰인 남색 안내 그림","width":600,"height":302,"after":5}]'::jsonb, '2025-08-11T05:11:35+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=15', null::date, null::date),
  ('legacy-Culture_War-22', 'truth', 'Walking in Korea  우리는 이길 때까지 싸울 것이다 (서울 명동)', 'Walking in Korea 우리는 이길 때까지 싸울 것이다 (서울 명동)
Protests Against South Korea’s Fake President: SEOUL Myeongdong', 'AV6fAIaOZIo', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-09T03:24:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=22', null::date, null::date),
  ('legacy-Culture_War-23', 'truth', '[자유대학 Live] 자유대학xTKYC YOON AGAIN!! in 보수의 심장 대구', '[자유대학 Live] 자유대학xTKYC YOON AGAIN!! in 보수의 심장 대구', '3i-dnd9jqlQ', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-08T20:45:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=23', null::date, null::date),
  ('legacy-TK_NEWS-14', 'tknews', '변호인단 분노의 기자회견 "10여 명이 달라붙어 尹 양팔 끌고', '변호인단 분노의 기자회견
"10여 명이 달라붙어 尹 양팔 끌고

이유는 이런 일이 저희 건국 이후에 처음입니다 처음 건국 이후에 이런 일이 단 한 번도 없었습니다 어떻게 구속된 피의자를 체포용장을 발부받아서 팔다리를 잡고 다리를 들어서 끌어내려고 하는이 시도 자체가 우리나라 역사상 처음입니다.

이 사태의 심각성 때문에 저희가 기자 회견을 자청하게 된 것입니다.이 이 점에 대해서이 과정에서 일어난 모든 불법 행위에 대해서는 관련자들에선 반드시 응불의 책임을 물을 것입니다.

제가 질문 한번 할게요 예 저희 기자 공통된 질문이 있요 그 방금 전에 이제 심각한 상황이라고 말씀을 해주셨는데 오늘 오전에 체포영장 집행 당시에 물리 행사도 말씀을 주셨지만 당시 상황을 좀 더 설명을 해 주신다면 어떤게 있을까요 예 대통령님 나이가 65세이십니다.

65세면은 노인에 해당됩니다 10여명이 달라붙었습니다. 젊은 사람들이 10여명이 달라붙어서 앉아 있는 대통령을 양쪽에서 팔을 끼고 다리를 붙잡고 그래로 들어서 차량으로 타슴시키려고 했습니다 .그 과정에서 완강하게 거부를 하시니까 다시 한번 앉아 있는 의자 통자 자체를 의자를 들고 그 의자에 앉아 있는 대통령님을 같이 들어 가지고 같이 또 옮기려고 했습니다

그 과정에서 의자가 뒤로 헛 빼줬고 대통령이 땅바닥에 철석 바닥에 떨어지는 그런 사태까지 발생을 했습니다.
그러면서 허리를 의자 다리에 부딪히기도 하셨고 또 팔을 너무나 세게 잡아당겨 가지고 어 팔이 빠질 것 같다고 좀 제발 좀 놔달라고 부탁을 해서 겨우 강제력을서 조금씩 벗어놨습니다 그럼에도 불구하고 이런 것들은 안 된다 이렇게 집행해사는 안 된다.이 모든 것들이 불법이다.라고 분명히 얘기를 했지만은 계속 2차 3차에 걸쳐서 계속 강제 집행을 했고 8시부터 시작해서 특검 얘기했듯이 9시 40분까지 이런 행위가 계속 지속됐습니다.

그 과정에서 변호인들이이 행위에 대해서 불법임을 명백하게 얘기를 했는데도 불구하고 오히려 거기에 참여한 특검이나 그다음에 구추석 관계자들은 저희 변허인들을 나가라고 요구를 했습니다 어떻게 그 체포영장 집행 과정에 당연히 변호인이 입회를 해야 되고 그 과정이 있어야 되는데 변호인 돌아 나가랍니다 예 그 저희는 당연히 거부를 했습니다

그 점에 대해서 예 그다음에 변호인들이이 불법적인 체포용 집행에 대해서 이일을 제기하는 것도 말을 못 하게끔 계속 말을 하지 못하게 하고 그데 말을 하게 되면은 공무집회 방해로 처벌하겠다라고 협박하고 이런 과정들이 계속 대풀이 됐습니다.

이게 무법 천지에 우리나라에 접한이 법치 국가에서 이런 일이 일어날 수 있다는게 너무나 좀 어이였고 그 과정을 지켜봤기 때문에 어 도저히 묶과하고 강가할 수 없는 상황이라고 볼 수 있겠습니다. 예 그러면 윤전 대통령님의 의무실 입실 보도가 나오기도 했는데 현재 건강 상태가 좀 궁금합니다.

예 저희 적견을 그 끝나고장을 집행을 종료하고 난 다음에 변호인 적견실로 옮겨서 변호인들과 접견을 한 시간 정도 하셨습니다. 그 과정에서 어 차평장 집행 과정에서 아까 넘어지기도 하시고 그랬다지 않습니까 의자에서 떨어지고 그래서 그 다리에 부딪 털이라든지 그다음에 팔을 잡아당겨 가지고 팔의 염자라든지 이런 것들이 뭐 계속 통증을 좀 호사하셔 가지고 급하게 제가 예 예 그 교도관에게 얘기해서 어 진료를 좀 부탁을 드렸습니다.

그래서 어 저희에게 적견이 끝난 다음에 11시쯤에 의무실로 진료를 받으러 들어가셨습니다 그러면은 그 입장문에서도 밝혀 주셨는데 구치소에서 집행 당시에도 진술부 의사를 본인께서 직접 밝히시거나 그런 적은 없죠 예 당연히 그렇게 얘기를 했고요 항상 똑같이 말씀을 하셨습니다.

그 변호인이 과정이 8시쯤에 이제 특검이 왔었고 어 대통령은 방에 있었는데 방으로는 들어오지 못하니까 고치소측에서 옷을 입고 나와라 이렇게 요구를 했고 어 나오시면은 변호인을 불러 주겠다 이렇게 어 얘기를 했습니다 그래서 대통령님은 당연히 구속에 말을 말을 듣고 옷을 어 있고 그다음에 그 출정소장이라고 하는 그 직책을 가진 분의 방에 가서 예 대기를 하면서 저 변호인을 만났습니다.

그 저희가 들어가자마자 변호인 나가라고 하고 예 뭐 자발적으로 가실 거냐 해서 거를 했더니 예 이제부터 강제 집행하겠다고 하고 변호인들을 전부 다 나 내보내려고 하고 이런 과정들이 계속 반복됐습니다.네 네 그러고 어제는 그 김건희 여사에 대한 조사도 있었는데 그 대통령님께서 직접 뭐 관련 코멘트를 하시거나 그런게 있었는지 좀 궁금합니다 그런 건 없습니다 예 그러시면은 지병이나 이런 문제도 있는데 외부 진료 이런 거를 좀 염두해 두시고 계신지 그리고 그 공판 내란 우두머리 공판에도 불출석 예정이신지 그것도 지금 건강 상태가 언론에 보도된 바와 같이 상당히 안 좋은 상태이십니다.

그래서 장기간 앉아서 조사를 받기도 힘들어 하시는 상태입니다. 예 그런데도 불구하고 어 저희가 원래부터 침료를 계속 받아왔던 서울대 병원에 외래 전료를 신청을 했는데 어 구치소측 의무가에서는 가까운 임금 병원에서만 진료를 받을 수 있다고 이렇게 얘기를 해서 현재 그 병원 외래 진료를 좀 협조 중에 했습니다 그 주사를 받지 않으면 황반 변성이라는게 여러분도 조사를 해 봐서 알겠지만은 어 치료를 제 받지 않으면 실명 위기에 이르는 병 병입니다 더군다나 또 어 당뇨와 겹쳐 있기 때문에 상태는 되게 심각한 상태입니다.

예 그리고 추후 재판 출석 여부도 좀 추후는 몸이 회복되는 대로 그건 추후에 말씀드리겠습니다 예 지금 현재로서는 몸 상태로는 재판 추석은 어렵다 이렇게 말씀드리겠습니다 조사 받으러 가셔서 거부하시는 거 아니 왜 진술 거부를 피고인 신문 자체가 임의수사 아닙니까 그러면은 진술 그럼 반대로 한번 물어보겠습니다.

어차피 가서 진술 거부할 거 왜 왜 데고 갑니까 피의자에게도 인권이 있는 거 아닙니까 무죄 추정의 원칙에 대해서 무죄 아닙니까 아직은 근데 그런 일반인을 진술로가 가지고 진술을 거부할 건데 왜 일부러 그렇게 강제적으로 강제력을 사용해서 데고 가는 이유가 뭡니까 그렇게 해하는 행위 자체가 불법이라는 것입니다.

예를 들어서 진술 거부을 확실하게 의사 표시한 피의자를 체포영장을 발보해서 강제력을 동원해서 데려간다면 그것은 진술를 강요하는 행위이고 그런 강요하는 행위는 강유죄에도 해당되고 그다음에 형법상 가혹 행위에도 해당됩니다 또한 직권 남명죄에 해당되는 건 당연합니다 그럼 불법에 응할 수는 없는 거 아닙니까 네', 'Pg6T3IZHCYs', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-08T00:00:32+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=14', null::date, null::date),
  ('legacy-Culture_War-21', 'truth', '[자유대학 Live] China Lee Out 윤석열 대통령 석방하라! 행진! in 명동', '[자유대학 Live] China Lee Out 윤석열 대통령 석방하라! 행진! in 명동', 'dnISMjY7HyI', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-06T19:55:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=21', null::date, null::date),
  ('legacy-Culture_War-20', 'truth', '서울 최대 불모지, 노원 도봉에서의 첫 계몽 행진', '서울 최대 불모지, 노원 도봉에서의 첫 계몽 행진', 'Xmw5dRW2VMc', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-04T20:45:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=20', null::date, null::date),
  ('legacy-TK_broadcast-28', 'broadcast', '트루스데일리창간& 세이브국민주권재단 창립', '트루스데일리창간& 세이브국민주권재단 창립', 'NYsBEgtQI8o', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-04T05:31:37+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=28', null::date, null::date),
  ('legacy-truth-14', 'truth', '‘트루스데일리’ 창간·세이브국민주권재단 출범… 진실·자유 수호 최전선 선언', '발행인 김진홍, 회장 손병두, 편집인 조정진, 청년기자단 40명 진용 구축
최광 이사장 세이브국민주권재단 출범… 애국 자유시민운동 본격화 선언
“언론의 본질 회복·문화전쟁 대응”… 종교·시민사회 등 400여 명 참여

7월 31일 오후 서울 용산 국방컨벤션센터 태극홀에서 ‘트루스코리아’ 주최로 트루스데일리 창간 및 세이브(SAVE)국민주권재단 출범식이 400여 명의 시민과 인사들이 참석한 가운데 성황리에 열렸다.

이번 행사는 언론의 본질 회복과 자유민주주의 수호, 문화전쟁에 대응하기 위한 선언의 자리로, 종교계·시민사회·학계·정치권 인사들이 대거 참석해 큰 관심을 모았다. 세이브국민주권재단은 정부의 소비쿠폰식 포퓰리즘에 대응해 국민 스스로 주권을 되찾기 위한 조직적 행동을 본격화하는 기구로, ‘트루스코리아 프로젝트’의 핵심 축을 담당할 예정이다.

1부는 종교계 축사로 시작됐다. 강대석 목사(대한예수교장로회 총회장·청운교회)는 개회기도에서 “현재 대한민국이 위기 상황에 처해 있는 만큼, 이를 묵과하지 않고 다시 한번 자유민주주의를 수호하고 자유시장경제를 확고히 하며, 한미동맹과 기독교적 가치에 기반한 국론을 바로 세워야 할 때”라며 “트루스데일리 창간과 세이브국민주권재단 출범이 대한민국이 다시 열방을 향해 도약하는 전환점이 되기를 바란다”고 강조했다. 그는 이어 “언론과 문화 콘텐츠를 통해 대한민국의 새로운 도약이 이뤄질 수 있도록 함께 축복해 달라”고 덧붙였다.

응천 스님(대불총 호국성군단 단장)은 짧은 불교식 축원을 전했고, 이계성 대표(대한민국수호천주교모임)는 “정치에 휘둘리는 언론은 언론이 아니다”며 “트루스데일리가 진실을 추구하고 정의를 세우는 새 언론이 되길 바란다”고 말했다.

기사원본보기 https://www.truthdaily.co.kr/news/articleView.html?idxno=749

출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/truth-14-1.jpg","alt":"‘트루스데일리 창간 & SAVE국민주권재단 출범’ 현수막 앞에서 함께 사진을 찍은 참석자들","width":600,"height":266,"caption":"트루스데일리 창간 및 세이브(SAVE)국민주권재단 출범식이 7월 31일 오후 서울 용산 국방컨벤션센터\n태극홀에서 ‘트루스코리아’ 주최로 400여 명의 시민과 각계 인사들이 참석한 가운데 성황리에 열렸다","after":1}]'::jsonb, '2025-08-04T04:51:42+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=truth&wr_id=14', null::date, null::date),
  ('legacy-TK_NEWS-13', 'tknews', '‘트루스데일리’ 창간·세이브국민주권재단 출범… 진실·자유 수호 최전선 선언', '발행인 김진홍, 회장 손병두, 편집인 조정진, 청년기자단 40명 진용 구축
최광 이사장 세이브국민주권재단 출범… 애국 자유시민운동 본격화 선언
“언론의 본질 회복·문화전쟁 대응”… 종교·시민사회 등 400여 명 참여

7월 31일 오후 서울 용산 국방컨벤션센터 태극홀에서 ‘트루스코리아’ 주최로 트루스데일리 창간 및 세이브(SAVE)국민주권재단 출범식이 400여 명의 시민과 인사들이 참석한 가운데 성황리에 열렸다.

이번 행사는 언론의 본질 회복과 자유민주주의 수호, 문화전쟁에 대응하기 위한 선언의 자리로, 종교계·시민사회·학계·정치권 인사들이 대거 참석해 큰 관심을 모았다. 세이브국민주권재단은 정부의 소비쿠폰식 포퓰리즘에 대응해 국민 스스로 주권을 되찾기 위한 조직적 행동을 본격화하는 기구로, ‘트루스코리아 프로젝트’의 핵심 축을 담당할 예정이다.

1부는 종교계 축사로 시작됐다. 강대석 목사(대한예수교장로회 총회장·청운교회)는 개회기도에서 “현재 대한민국이 위기 상황에 처해 있는 만큼, 이를 묵과하지 않고 다시 한번 자유민주주의를 수호하고 자유시장경제를 확고히 하며, 한미동맹과 기독교적 가치에 기반한 국론을 바로 세워야 할 때”라며 “트루스데일리 창간과 세이브국민주권재단 출범이 대한민국이 다시 열방을 향해 도약하는 전환점이 되기를 바란다”고 강조했다. 그는 이어 “언론과 문화 콘텐츠를 통해 대한민국의 새로운 도약이 이뤄질 수 있도록 함께 축복해 달라”고 덧붙였다.

응천 스님(대불총 호국성군단 단장)은 짧은 불교식 축원을 전했고, 이계성 대표(대한민국수호천주교모임)는 “정치에 휘둘리는 언론은 언론이 아니다”며 “트루스데일리가 진실을 추구하고 정의를 세우는 새 언론이 되길 바란다”고 말했다.

기사원본보기 https://www.truthdaily.co.kr/news/articleView.html?idxno=749

출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-13-1.jpg","alt":"‘트루스데일리 창간 & SAVE국민주권재단 출범’ 현수막 앞에서 함께 사진을 찍은 참석자들","width":600,"height":266,"caption":"트루스데일리 창간 및 세이브(SAVE)국민주권재단 출범식이 7월 31일 오후 서울 용산 국방컨벤션센터\n태극홀에서 ‘트루스코리아’ 주최로 400여 명의 시민과 각계 인사들이 참석한 가운데 성황리에 열렸다","after":1}]'::jsonb, '2025-08-04T04:51:42+09:00'::timestamptz, false, false, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=13', null::date, null::date),
  ('legacy-TK_broadcast-27', 'broadcast', 'SAVE 국민주권재단 및 truthdaily 창간식.25.7.31.', 'SAVE 국민주권재단 및 truthdaily 창간식.25.7.31.', 'T5LC-wmezLY', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-03T01:29:09+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=27', null::date, null::date),
  ('legacy-Culture_War-18', 'truth', 'China Lee Out 윤석열 대통령 석방하라!!!!!!!!! in 동대문~광화문', 'China Lee Out 윤석열 대통령 석방하라!!!!!!!!! in 동대문~광화문', 'T55Ggm212XI', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-08-02T03:37:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=18', null::date, null::date),
  ('legacy-TK_broadcast-24', 'broadcast', 'save국민주권재단 출범 모스탄 축사영상!', 'save국민주권재단 출범 모스탄 축사영상!

미국 모스탄 대사의 충격인 메시지
대한민국 위대한 비전과 숨겨진 비밀?
당신의 투표가 도적질당했다.

바다물 3.5%짠맛이 부패방지 하듯
*인구175만명이 바꿀 수 있다', 'lYX8iuPeuJw', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-31T02:32:57+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=24', null::date, null::date),
  ('legacy-Culture_War-17', 'truth', '국민들의 뜨거운 열망 (서울역)', '국민들의 뜨거운 열망 (서울역)', 'Xs98HdhK0js', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-30T04:06:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=17', null::date, null::date),
  ('legacy-Culture_War-16', 'truth', 'CHINA LEE FAKE PRESIDENT OUT! in 명동', 'CHINA LEE FAKE PRESIDENT OUT! in 명동', '5HwXaoc6QdM', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-29T20:13:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=16', null::date, null::date),
  ('legacy-event-5', 'event', '트루스데일리신문사창간식', '트루스데일리신문사 창간식

일시 2025년7월31일 오후2시
장소 국방컨벤센터
네비주소 서울 용산구 이태원로 22

대표이사 정부영 : 010-2705-5000
준비위원장 박원영 목사 : 010-9378-9191

네이버어플 카카오어플 구글지도', null, null, '[]'::jsonb, '[{"text":"네이버어플","href":"https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%9A%A9%EC%82%B0%EA%B5%AC%20%EC%9D%B4%ED%83%9C%EC%9B%90%EB%A1%9C%2022/address/14135081.4735893,4513753.8938243,%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%9A%A9%EC%82%B0%EA%B5%AC%20%EC%9D%B4%ED%83%9C%EC%9B%90%EB%A1%9C%2022,new?c=15.00,0,0,0,dh&isCorrectAnswer=true"},{"text":"카카오어플","href":"https://map.kakao.com/?map_type=TYPE_MAP&target=car&rt=,,495043.9999999987,1120600&rt1=&rt2=%EA%B5%AD%EB%B0%A9%EC%BB%A8%EB%B2%A4%EC%85%98&rtIds=,152313844"},{"text":"구글지도","href":"https://www.google.com/maps/place/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%9A%A9%EC%82%B0%EA%B5%AC+%EC%9D%B4%ED%83%9C%EC%9B%90%EB%A1%9C+22/data=!3m1!4b1!4m6!3m5!1s0x357ca23dcf90a82f:0xf3ac73e9be626cfc!8m2!3d37.5336584!4d126.9775707!16s%2Fg%2F11bz37mjn9?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D"}]'::jsonb, '[{"src":"assets/uploads/legacy/event-5-1.jpg","alt":"‘SAVE국민주권재단 출범식 · 트루스데일리신문 창간식’ 초대장. 발대식 일시 2025. 7. 31(목) 오후 2시, 장소 국방컨벤션센터(용산전쟁기념관 건너편). 1부 국민의례·축사·귀빈소개·특별강연, 2부 트루스데일리 창간식 & SAVE국민주권재단 출범식. 주최 (주)트루스코리아·세이브국민주권재단 출범준비위원회. 함께하는 사람들과 단체 명단, 연사 사진이 실려 있습니다","width":1200,"height":2974,"thumb":"assets/uploads/legacy/event-5-1-thumb.jpg","after":1},{"src":"assets/uploads/legacy/event-5-2.png","alt":"‘이태원로 22’ 위치가 표시된 지도. 삼각지역과 녹사평역 사이입니다","width":1000,"height":569,"thumb":"assets/uploads/legacy/event-5-2-thumb.jpg","after":3}]'::jsonb, '2025-07-28T06:04:35+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=event&wr_id=5', '2025-07-31'::date, '2025-07-31'::date),
  ('legacy-Culture_War-14', 'truth', '서울대에 오시는 모스 탄 대사 실시간 환영 현장', '서울대에 오시는 모스 탄 대사 실시간 환영 현장', 'H6vCl4uJyGU', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-28T03:48:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=14', null::date, null::date),
  ('legacy-truth-11', 'truth', '전한길뉴스 스튜디오 모스탄 초청 인터뷰', '전한길뉴스 스튜디오 모스탄 초청 인터뷰', 'x1SnkAKNy6Y', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-28T03:42:50+09:00'::timestamptz, false, false, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=truth&wr_id=11', null::date, null::date),
  ('legacy-TK_broadcast-22', 'broadcast', '전한길뉴스 스튜디오 모스탄 초청 인터뷰', '전한길뉴스 스튜디오 모스탄 초청 인터뷰', 'x1SnkAKNy6Y', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-28T03:42:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=22', null::date, null::date),
  ('legacy-Culture_War-13', 'truth', 'CHINA LEE OUT ! in 합정~홍대', 'CHINA LEE OUT ! in 합정~홍대', 'GWUlaNvOm2s', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-28T03:41:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=13', null::date, null::date),
  ('legacy-Culture_War-12', 'truth', '모스탄 명동역~서울역 행진, 서울역 연합집회 25.07.18', '모스탄 명동역~서울역 행진, 서울역 연합집회 25.07.18', '1GmU45CIkyg', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-28T03:38:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=12', null::date, null::date),
  ('legacy-TK_broadcast-21', 'broadcast', '모스탄 전 대사, 내가 하는일이 대북송금 같은 국제법 위반 잡는것', '모스탄 전 대사, 내가 하는일이 대북송금 같은 국제법 위반 잡는것', 'Q-7dB9TJ434', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-28T03:35:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=21', null::date, null::date),
  ('legacy-TK_NEWS-11', 'tknews', '“동맹에 칼 꽂은 특검 수사”… 美, 한미관세협상 전격 중단', 'NNP “오산기지 압색에 분노한 트럼프, 루비오 불러 한국 패싱 지시”
한미 공동기지 ‘무단 압색’… 軍 비밀작전 노출에 외교·안보 파장
민간 특검이 한미공동군사시설 침범… 한·미 상호 신뢰 균열 조짐

대한민국 내란특검(조은석 특별검사팀)은 21일 ‘평양 무인기 침투’ 및 ‘훈련 문건 조작 의혹’을 수사한다는 명목으로 오산 공군기지 내 레이더 시설을 전격 압수수색했다. 오산기지는 한미연합군이 공동으로 운용하는 주한미군의 핵심기지이자 동북아 공역감시의 중추다. 이에 대한 미국 측의 반발이 심각한 외교적 파장을 초래하고 있다.

특히, 이 사실을 보고받은 도널드 트럼프 미국 대통령이 24일(현지시간) 루비오 상원의원과 베센트 미국무역대표부(USTR) 대표를 백악관으로 소환해 “한·미 관세협상 중단, 한국 패싱”을 지시했다는 보도가 미국 내 우파 유튜브 채널 NNP를 통해 전해졌다. 이는 곧바로 24일 한·미 간 2+2 관세협상 일정이 돌연 취소되는 결과로 이어졌다.

軍작전 ‘내란죄’로 몰며 미군기지 압수수색… 美, 격앙된 반응

문제의 발단은 특검이 2024년 10월 실행된 무인기 대북정찰 작전 중 일부 기체의 항적 조작 및 문건 허위 작성 의혹을 내란·외환 혐의로 수사하면서 레이더 원시 데이터를 확보한다는 명분으로 한·미공동기지인 오산기지를 전격 압수수색한 것이다.

이 과정에서 한국 군의 은밀한 군사작전 내용이 외부로 노출될 위험성이 높아졌고, 미군 측은 민간 특검 수사기관이 미군과 공동 사용 중인 기지 내부 핵심시설에 물리적으로 접근한 것을 ‘협정 위반’으로 간주한 것으로 알려졌다.

트럼프 대통령은 이 같은 상황을 보고받은 후 곧바로 고든 창·루비오 상원의원·베센트 USTR 대표 등 외교·안보 고문들과 긴급회의를 가졌으며 한국 정부에 대한 신뢰 붕괴를 이유로 관세협상 중단을 직접 지시한 것으로 전해졌다.

“군작전이 내란?”… ‘윤석열 죽이기’ 집착, 안보 위협으로 번져

특검은 윤석열 대통령이 계엄 명분을 만들기 위해 평양 상공에 무인기를 투입했다는 의혹을 내세우며 해당 작전의 기획과 실행, 이후 보고체계를 전방위적으로 조사하고 있다. 이 과정에서 김용대 드론작전사령관·여인형 전 방첩사령관·문상호 전 정보사령관 등이 줄줄이 소환됐다.

하지만 이 같은 수사는 국가안보 전략의 세부 사항과 고도의 군사작전 정보를 공론화하는 결과를 낳았으며, 이에 대해 미국 측은 “자국 군사 자산과 협력 체계를 위협하는 위험한 행위”라며 강력한 불쾌감을 표시하고 있는 것으로 알려졌다.

고든 창은 SNS를 통해 “한국 내 특정 정권이 반미적 감정과 정치 보복에 몰두해 동맹의 기밀까지 위협하고 있다”고 경고했고, NNP는 “트럼프는 오산기지 사태를 매우 심각하게 받아들였으며 한국 정부의 군 통제 방식에 대한 근본적 재검토를 지시했다”고 전했다.

기사제히보기 https://www.truthdaily.co.kr/news/articleView.html?idxno=689
출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-11-1.jpg","alt":"‘트럼프, 오산 공군기지 압수수색 사건 보고 받아’라는 자막이 달린 방송 화면","width":600,"height":270,"after":1}]'::jsonb, '2025-07-28T00:16:02+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=11', null::date, null::date),
  ('legacy-TK_NEWS-10', 'tknews', '“尹 대통령 탄압 좌시 않겠다” 트럼프 측근, 한국 의원단에 경고', '美AFPI 부소장, 尹 수사에 “인권 침해 땐 한국에 불이익” 경고
나경원 “美, 尹수사·對中견제·통상 협상까지 한국 정부 압박 중”

도널드 트럼프 미국 대통령의 측근인 프레드 플라이츠 미국우선주의정책연구소(AFPI) 부소장이 21일 한미의원연맹 소속 의원 간담회에서 ''윤석열 대통령에 대해 부당한 대우를 할 경우 좌시하지 않을 것''이라는 취지의 발언을 한 것으로 드러났다.

27일 조선일보 보도에 따르면 플라이츠 부소장은 미국 워싱턴 D.C. AFPI 사무실에서 진행된 간담회에서 우리나라 여야 국회의원 13명과 만난 자리에서 “트럼프 대통령도 비슷한 경험을 해서 이야기한다. 정권이 교체됐다고 해서 전직 대통령에 대한 수사 과정에서 불공정하거나 윤 대통령의 인권을 침해하는 행위가 있을 경우 한국에 좋지 않을 수 있다”고 했다.

이같이 예상치 못한 플라이츠 부소장의 강도 높은 경고성 발언이 계속되자 참석한 일부 의원들이 강하게 항의하며 ''윤 대통령이 잘못해서 벌이진 일''이라고 맞받아쳤고 의원단이 플라이츠 부소장의 해당 발언을 국내에 알리는 일이 국익에 어떤 영향을 미칠지에 대해 서로 대화를 나눈 일도 있는 것으로 전해졌다.

기사자세히보기https://www.truthdaily.co.kr/news/articleView.html?idxno=692
출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-10-1.jpg","alt":"성조기가 걸린 방에서 둥근 탁자에 둘러앉아 이야기를 나누는 사람들","width":600,"height":338,"caption":"프레드 플라이츠 미국우선주의정책연구소(AFPI) 부소장이 21일 한미의원연맹 소속 의원과의 간담회에서\n''윤석열 대통령에 대해 부당한 대우를 할 경우 좌시하지 않을 것''이라는 취지의 발언을 한 것으로 드러났다.\n나경원 국민의힘 의원 페이스북","after":1}]'::jsonb, '2025-07-27T23:05:56+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=10', null::date, null::date),
  ('legacy-Culture_War-11', 'truth', '두 장짜리 보고서에 발칵…트럼프 뇌관 터지나', '두 장짜리 보고서에 발칵…트럼프 뇌관 터지나', 'W3YCDoy2E2A', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-27T17:23:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=11', null::date, null::date),
  ('legacy-Culture_War-10', 'truth', '베이징 지각변동 지금 어디 까지 왔나/ 탱크 진입?/ 시진핑 장유샤 충격 상황', '베이징 지각변동 지금 어디 까지 왔나/ 탱크 진입?/ 시진핑 장유샤 충격 상황', 'qtIw3FRAioM', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-27T17:22:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=Culture_War&wr_id=10', null::date, null::date),
  ('legacy-TK_NEWS-9', 'tknews', '美 도착 모스 탄 “가짜에 속지 마라! 일어나 싸우라”', '귀국 직후 한국 국민 향해 ‘진실의 봉화’ 다시 밝혀
“이재명은 쿠데타이고, 윤석열은 내란 아니다” 강조
“여러분이야말로 한국 사회의 다수이며 주류입니다”

Rise up and fight!” 귀국 즉시 쏘아 올린 정의의 외침

모스 탄 전 미국 국무부 국제형사사법 대사가 20일(현지시간) 5박 6일의 한국 일정을 마치고 미국 볼티모어 공항에 도착했다. 그 순간 그는 단순한 귀국자가 아니었다. 현지에 모인 한국 교민들이 “Welcome Home(집에 오신 것을 환영합니다)”라고 적힌 플래카드를 들고 그를 맞이했고, 그는 미국 땅에서마저 한국 국민에게 보내는 ‘전쟁 같은 메시지’를 발표했다.

“여러분이 미쳤다고? 아닙니다. 여러분이 맞습니다. 여러분은 대한민국의 주류이며, 이 나라가 존재하는 이유입니다.”

이 메시지는 단순한 응원이 아닌 선언문이자 호소문, 나아가 민족적 각성의 불씨였다. 모스 탄은 ‘우리가 믿고 싸워온 길이 옳다’는 강한 확신과 함께, 한국인들에게 다음과 같은 단어들을 또렷하게 남겼다.

“Rise up. Stand. Fight. Restore. Win back your country.”

“가짜가 대통령이 되고, 진짜는 감옥에 간다”… 진실의 기준선 다시 세운 모스 탄

모스 탄 대사는 귀국 후 발표한 영상 메시지를 통해 한국 내 부정선거 의혹, 이재명 관련 논란, 윤석열 대통령에 대한 탄핵 및 계엄 프레임 등을 구체적으로 언급했다. 그는 단언했다.

“이재명은 쿠데타이고, 윤석열은 내란이 아니다.”

이는 한국 주류 언론이 부정하거나 보도하지 않았던 프레임 전복 선언이었다. 그는 말한다. “우리가 매일 마주하는 뉴스와 정치인들의 말, 그리고 언론의 침묵이 반드시 진실은 아니다. 스스로 판단하라. 속지 마라.”

이 발언은 한국의 레거시 미디어, 즉 조중동·KBS·MBC·JTBC 등을 중심으로 한 기존 언론 시스템에 대한 정면 비판이며, 나아가 국민 개개인이 진실을 ‘직접 추구해야 한다’는 시대적 사명을 부여한 것이다.

FBI 수사 시사, 트럼프 면담 예고… ‘국제적 공조’의 신호탄

모스 탄은 귀국 직후 폭탄급 정보를 던졌다. 미국 연방수사국(FBI)이 한국 내 부정선거와 관련된 범죄행위를 조사 중이라는 사실을 공개한 것이다. 또한 곧 도널드 트럼프 대통령과의 면담을 예고하며, 그의 활동이 단순한 개인의 신념이 아니라 미국 보수 진영의 전략적 행동임을 암시했다.

일각에서는 모스 탄이 한국 체류 중 미국 CIA 요원들의 비공식 경호를 받았다는 증언까지 나오고 있다. 이는 그가 단순한 시민운동가나 학자가 아니라 미국 외교·정보기관과의 깊은 연계 하에 움직이는 전략적 인물일 가능성을 강하게 시사한다.

자세히보기 https://www.truthdaily.co.kr/news/articleView.html?idxno=611
출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-9-1.jpg","alt":"‘WELCOME HOME’ 손팻말과 풍선을 들고 공항 도착장에 선 사람들","width":559,"height":292,"after":1}]'::jsonb, '2025-07-26T23:11:35+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=9', null::date, null::date),
  ('legacy-TK_NEWS-8', 'tknews', '모스 탄 “尹대통령은 일어선 분… 中배후 부정선거 명백”', '서울대 앞 강연서 “12.3 계엄은 정당한 시도… 李 범죄 의혹 재차 시사
16일 윤석열 대통령 서울구치소 접견 예정… 경찰, 명예훼손 수사 착수

국제선거감시단 단장 자격으로 6.3 대선을 참관한 모스 탄 전 미국 국무부 국제형사사법 대사
(리버티대 법대 교수)는 15일 서울대 앞 연설에서 제21대 대한민국 대선을 “중국 공산당의 개입 아래 조작된 선거”로 규정하며 “윤석열 대통령의 비상계엄은 조작의 증거를 수집하려는 정당한 시도였다”고 강조했다.

“대한민국은 지금 어둠 속에 있습니다. 윤석열 대통령은 이 나라를 위해 일어섰던 분입니다.”

15일 오후 7시 서울대 정문 앞, 대학생들과 애국 보수 시민 3000여 명이 운집한 가운데 모스 탄 전 미국 국제형사사법대사(미 리버티대학교 법대 교수)가 연설대에 섰다. 당초 서울대 호암교수회관에서 진행될 예정이던 강연은 서울대 측의 대관 취소로 급히 정문 앞 광장으로 장소를 옮겨 진행됐다.

국제선거감시단 단장 자격으로 6.3 대선을 참관한 모스 탄 교수는 이날 연설에서 제21대 대한민국 대선을 “중국 공산당의 개입 아래 조작된 선거”로 규정하며 “윤석열 대통령의 비상계엄은 조작의 증거를 수집하려는 정당한 시도였다”고 강조했다.

이어 “윤 대통령은 중국과 북한의 위험을 정확히 인식하고 있었고, 그는 대한민국을 위해 헌신했다”고 말했다.

이날 강연은 서울대 트루스포럼(대표 이은구) 주최로 진행됐으며, 참가자들은 태극기와 성조기를 함께 들고 “USA!” “스탑 더 스틸(Stop the Steal)” “윤 어게인” 등의 구호를 외쳤다. 일부 시민은 ‘CHINA LEE, STOP THE STEAL’이라는 문구가 적힌 손팻말을 들었는데, 이는 이재명 대통령이 중국의 지원 아래 부정선거로 당선됐다는 주장을 암시한 것이다.

“소년 이재명, 성폭행·살인 연루” 주장 파장… 경찰 수사 착수

논란의 중심은 여전히 이재명 대통령의 과거사다. 모스 탄 교수는 6월 26일(현지시간) 미국 워싱턴 D.C. 내셔널프레스클럽 기자회견에서 “이 대통령이 청소년 시절, 한 소녀를 집단 성폭행하고 살해한 사건에 연루되어 소년원에 수감됐고, 그 때문에 중·고등학교에 진학하지 못했다”고 폭로했다.

이에 대해 보수 시민단체 ‘자유대한호국단’은 허위사실 적시에 의한 명예훼손 혐의로 탄 교수를 서울경찰청 사이버수사대에 고발했고, 경찰은 최근 해당 사건을 정식 배당해 수사에 착수했다.

참고로, 유사한 주장을 담은 유튜브 영상의 제작자 A씨는 공직선거법 위반으로 기소돼 1심과 2심에서 벌금 600만 원을 선고받은 바 있다.

자세히보기 https://www.truthdaily.co.kr/news/articleView.html?idxno=552

출처 : 트루스데일리(https://www.truthdaily.co.kr)', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-8-1.jpg","alt":"연단에서 마이크를 들고 말하는 남성과 옆에 선 초록색 옷의 여성. 앞쪽에 성조기와 ‘CHINA LEE STOP THE…’ 손팻말이 보입니다","width":600,"height":381,"after":1},{"src":"assets/uploads/legacy/TK_NEWS-8-2.jpg","alt":"대학 정문 앞 광장에 모여 손팻말을 든 많은 사람들","width":600,"height":277,"after":4},{"src":"assets/uploads/legacy/TK_NEWS-8-3.jpg","alt":"대학 정문 앞 광장을 가득 메운 집회 참석자들을 멀리서 찍은 사진","width":600,"height":265,"after":4}]'::jsonb, '2025-07-26T23:08:34+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=8', null::date, null::date),
  ('legacy-TK_NEWS-7', 'tknews', '모스 탄 “尹대통령은 내란범 아니다… 민주당이 쿠데타 중”', '테러 위험 속 인천국제공항 입국 직후 폭탄 발언 쏟아내
“中공산당, 한국 정부 조직 깊숙이 침투… 민주당이 尹 탄압”
“이재명 소년원 수감 증거 있다… 尹 구금은 반인륜 인권침해”
예비역 군복 경호… 환영 인파 속 실탄 장전 총기 소지 중국인 체포

“尹 전 대통령 감금은 독재적 인권침해… 민주당이 내란 중”

모스 탄 전 대사는 윤 전 대통령의 구속 상황에 대해 다음과 같이 말했다.

“현재 윤석열 대통령은 좁은 감방에서 당뇨 등 질병 치료에 필요한 약도 제대로 지급받지 못한 채, 500ml 생수 하나로 더위를 버티고 있다. 운동조차 허용받지 못하고 있으며, 이는 명백한 인권 침해다.”

이어 그는 “윤석열은 내란을 저지르지 않았다”며 “사실 내란을 벌인 것은 윤 대통령을 탄압하는 민주당이며, 지금 대한민국에서 쿠데타가 벌어지고 있다”고 강조했다.

“한국 정부조직, 중국 공산당 침투 심각… 경찰·검찰·언론·교육계 전방위 영향”

그는 특히 “한국의 중요 정부 조직에 중국 공산당이 깊숙이 침투해 왔다”고 강조했다. 경찰, 검찰, 군, 언론, 교육계 등 전 분야에 걸쳐 중국 공산당과 극좌 세력이 영향을 미치고 있으며, “이들은 거대한 뱀처럼 대한민국의 자유민주주의를 파괴하려 하고 있다”고 말했다.

또한 그는 북한 역시 한국 내 여러 조직을 해킹하고, 간첩을 침투시키는 등 직접적인 위협을 가해왔다고 주장했다.

“이재명, 집단 성범죄 및 살인 연루… 소년원 수감 증거 확보”

모스 탄 전 대사는 최근 미국에서 재미 언론인 원용석 씨와의 인터뷰에서 “이재명 대통령의 소년원 수감에 관련된 목격자 진술서와 증거를 확보하고 있다”고 밝히며, 이재명의 과거 중대한 범죄 연루 의혹을 거듭 제기했다.

이 발언은 국제 사회에서도 충격을 주고 있으며, 고든 창 변호사(차기 주한미국대사 유력 후보로 거론 중)는 13일 트위터를 통해 “모스 탄은 영웅”이라며 “서울에 계신 분들은 그를 보호해 달라”고 호소하기도 했다.

테러 시도 속 입국… 예비역 군복 경호단, 시민 수천 명 환영

이날 인천공항에는 오전부터 수천 명의 환영 인파가 몰려들었고, 윤항중 전 육군제1군수지원사령관이 이끄는 예비역 군인 50여 명이 군복 차림으로 자발적 경호팀을 구성해 호위에 나섰다.

일부 극렬 더불어민주당 지지 유튜버들의 무장 테러 시도도 발생했다. 유튜버 ‘주광’은 공항 내에서 소총과 리볼버 권총을 소지한 채 발견돼 경찰에 인계됐고, 또 다른 유튜버 ‘정치한잔’은 폭언과 난동을 벌이다 현장에서 제지당했습니다.

한편, 이날 인천국제공항에서는 총기를 소지한 중국 국적 50대 남성 A씨가 경찰에 체포됐다. 인천공항 보안 당국은 모스 탄 전 대사가 입국하기 직전 이 남성을 검거했다. 검거된 남성은 실탄이 장전된 권총 4정(테이저건 2개, 가스총 1개, 호신용 총1개)을 소지하고 있었다. 경찰은 A씨를 불구속 입건했다.

서울시, 초청 행사 돌연 취소… 일정은 시민사회가 주도

모스 탄 전 대사의 방한은 당초 서울시 초청 강연 행사로 예정돼 있었으나, 지난 주말 돌연 초청이 취소됐다. 서울대도 서울대트루스포럼이 신청한 강의실 대관을 철회해 정문 앞 야외 집회로 대체됐다. 이에 따라 일정은 트루스코리아, 서버까국민운동본부, 전한길뉴스, 은평제일교회 등 신생 보수 시민단체와 애국 언론사들이 공동 주관하고 있습니다.

공식 일정은 19일까지 이어지며, 서울대 트루스포럼 야외 강연, 국회 헌정회 방문, 트루스데일리·전한길뉴스·이봉규TV 인터뷰, 은평제일교회 신앙 간증, 주한중국대사관 앞 집회, 서울역 거리행진 등이 예정돼 있다.

안전상의 이유로 시내 4성급 호텔 숙소는 취소됐으며, 주최 측은 보다 안전한 위치로 숙소를 이전했다고 전했다.

출처 : 트루스데일리(https://www.truthdaily.co.kr)

기사자세히 보기
https://www.truthdaily.co.kr/news/articleView.html?idxno=542', null, null, '[]'::jsonb, '[]'::jsonb, '[{"src":"assets/uploads/legacy/TK_NEWS-7-1.jpg","alt":"공항에서 꽃다발을 받는 양복 차림 남성과 군복을 입은 환영 인파","width":600,"height":440,"after":1},{"src":"assets/uploads/legacy/TK_NEWS-7-2.jpg","alt":"공항 바닥에 ‘He''s Not Our President’, ‘CCP OUT!!’, ‘STOP THE STEAL’이라고 쓰인 현수막을 펼쳐 놓고 선 환영 인파","width":600,"height":338,"thumb":"assets/uploads/legacy/TK_NEWS-7-2-thumb.jpg","after":11},{"src":"assets/uploads/legacy/TK_NEWS-7-3.jpg","alt":"공항 입국장에서 풍선과 깃발을 든 환영 인파. ‘사기 탄핵 내란이다 부정 선거 처형 하라’라고 쓰인 손팻말이 보입니다","width":600,"height":450,"thumb":"assets/uploads/legacy/TK_NEWS-7-3-thumb.jpg","after":11}]'::jsonb, '2025-07-26T23:01:50+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_NEWS&wr_id=7', null::date, null::date),
  ('legacy-TK_broadcast-20', 'broadcast', '인천국제공항 모스탄 대사 출국현장 영상 스케치', '인천국제공항 모스탄 대사 출국현장 영상 스케치', 'CXD-4G7OQSg', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-26T20:29:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=20', null::date, null::date),
  ('legacy-TK_broadcast-19', 'broadcast', 'WCC WEA 한국교회 심각한문제 모스탄 전 대사 특강 증에 나눔', 'WCC WEA 한국교회 심각한문제 모스탄 전 대사 특강 증에 나눔', 'E1ZMIQ-wgjU', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-26T20:27:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=19', null::date, null::date),
  ('legacy-TK_broadcast-16', 'broadcast', '자유대학  정유라 / 속지 마세요', '자유대학 정유라 / 속지 마세요', 'bRs7DqgtEpQ', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-26T19:39:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=16', null::date, null::date),
  ('legacy-TK_broadcast-17', 'broadcast', '전 스카이데일리 대표 조정진 (현 트루스데일리 대표) 중국인 해커 관련 연결', '전 스카이데일리 대표 조정진 (현 트루스데일리 대표) 중국인 해커 관련 연결', 'xpeXwziosjI', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-26T18:36:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=17', null::date, null::date),
  ('legacy-TK_broadcast-10', 'broadcast', '정부 탄핵 반대 집회 참석한 박원영 목사 "좌파는 북으로! 거짓은 물러가라!', '정부 탄핵 반대 집회 참석한 박원영 목사 "좌파는 북으로! 거짓은 물러가라!', 'd4rryUkT3Fc', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-25T16:05:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=10', null::date, null::date),
  ('legacy-TK_broadcast-9', 'broadcast', '민족의 미래를 위해 자유대한민국을 지키기 위해 기도해야', '서울나들목교회 박원영목사 /
민족의 미래를 위해 자유대한민국을 지키기 위해 기도해야', 'fRz5j8_litA', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-25T00:44:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=9', null::date, null::date),
  ('legacy-truth-12', 'truth', '국민께 드리는 말씀', '윤석열 대통령 국민께 드리는 말씀!

존경하는 국민 여러분 오늘 국회의 탄핵 소추안이 가결되는 모습을 보면서 처음 정치 참여를 선언했던
2021년 6월 29일이 떠올랐습니다이 나라의 자유민주주의와 법치는 무너져 있었습니다

자영업자의 절망 청년들의 좌절이 좋 나라를 채우고 있었습니다 그 뜨거운 국민적 열망을 안고 정치에 뛰어들었습니다 그 이후 한 순간도 쉬지 않고 온 힘을 쏟아 일해왔습니다

대통령이 되어 현장의 국민을 만나보니 전 정부의 소주성 정책으로 소상공인과 자영업자가
비명을 지르고 있었고 부동산 영끌 대출로 청년들과 서민들이 신음하고 있었습니다

그렇지만 차분히 어려운 사정을 챙겨듣고 조금씩 문제를 풀어 들었을 때 그 무엇보다
큰 행복을 느꼈습니다
수출이 살아나면서 경제가 활력을 되찾고 조금씩 온기가 퍼져 나가는 모습에 힘이났습니다

무너졌던 원전 생태계를 복원시켜 원전 수출까지 이루어냈습니다
미래를 위해 꼭 필요하지만 선거에 분리할까 봐 지난 정부들이 하지 못했던 4대 개혁을 절박한
심정으로 추진해 왔습니다

국민을 위해 고민하고 추진하던 정책들이 발목을 잡혔을 때에는 속이
타들어가고 밤잠을 못 잃었습니다

한미일 공조를 복원하고 글로벌 외교의 지평을 넓히기 위해 밤낮 없이 뛰었습니다
대한민국 1호 영업사원 타이틀을 달고 세계를 누비며 성과를 거둘 때면
말로 설명할 수 없는 큰 보람을 느꼈습니다

대한민국의 국제적 위상이 높아지고 우리 안보와 경제가 튼튼해지는 모습에 피곤도 잊었습니다
이제 고되지만 행복했고 힘들었지만 보람찼던 그 여정을 잠시 멈추게 됐습니다

그동안의 노력이 허사로 돌아가지 않을까 답답합니다 저는 지금 잠시 멈춰 서지만 지난 2년 반 국민과 함께 걸어온 미래를 향한 여정은 결코 멈춰서서는 안 될 것입니다 저는 결코 포기하지 않겠습니다

저를 향한 질책 격려와 성원을 모두 마음에 품고 마지막 순간까지 국가를 위해 최선을 다하겠습니다
공직자 여러분께 당부드립니다 어렵고 힘든 시간이지만 흔들림 없이 각자의 위치를 지키며
맡은바 소힘줄 바랍니다

대통령 권한 대행을 중심으로 모두가 힘을 모아서 국민의 안전과 행복을 지키는데 최선을 다해 주시기 바랍니다 그리고 정치권의 당부드립니다 이제 폭주와 대결의 정치에서 수구와 배려의 정치로 바뀔 수 있도록 정치 문화와 제도를 개선하는데 관심과 노력을 기울려 주시기 바랍니다

사랑하는 국민 여러분 저는 우리 국민의 저력을 믿습니다
우리 모두 대한민국의 자유민주주의와 번영을 위해
힘을 모읍시다 감사합니다

- 윤석열 대통령 -', 'qdzLJlwdMNo', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-23T14:05:44+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=truth&wr_id=12', null::date, null::date),
  ('legacy-PresidentYoon-8', 'truth', '국민께 드리는 말씀', '윤석열 대통령 국민께 드리는 말씀!

존경하는 국민 여러분 오늘 국회의 탄핵 소추안이 가결되는 모습을 보면서 처음 정치 참여를 선언했던
2021년 6월 29일이 떠올랐습니다이 나라의 자유민주주의와 법치는 무너져 있었습니다

자영업자의 절망 청년들의 좌절이 좋 나라를 채우고 있었습니다 그 뜨거운 국민적 열망을 안고 정치에 뛰어들었습니다 그 이후 한 순간도 쉬지 않고 온 힘을 쏟아 일해왔습니다

대통령이 되어 현장의 국민을 만나보니 전 정부의 소주성 정책으로 소상공인과 자영업자가
비명을 지르고 있었고 부동산 영끌 대출로 청년들과 서민들이 신음하고 있었습니다

그렇지만 차분히 어려운 사정을 챙겨듣고 조금씩 문제를 풀어 들었을 때 그 무엇보다
큰 행복을 느꼈습니다
수출이 살아나면서 경제가 활력을 되찾고 조금씩 온기가 퍼져 나가는 모습에 힘이났습니다

무너졌던 원전 생태계를 복원시켜 원전 수출까지 이루어냈습니다
미래를 위해 꼭 필요하지만 선거에 분리할까 봐 지난 정부들이 하지 못했던 4대 개혁을 절박한
심정으로 추진해 왔습니다

국민을 위해 고민하고 추진하던 정책들이 발목을 잡혔을 때에는 속이
타들어가고 밤잠을 못 잃었습니다

한미일 공조를 복원하고 글로벌 외교의 지평을 넓히기 위해 밤낮 없이 뛰었습니다
대한민국 1호 영업사원 타이틀을 달고 세계를 누비며 성과를 거둘 때면
말로 설명할 수 없는 큰 보람을 느꼈습니다

대한민국의 국제적 위상이 높아지고 우리 안보와 경제가 튼튼해지는 모습에 피곤도 잊었습니다
이제 고되지만 행복했고 힘들었지만 보람찼던 그 여정을 잠시 멈추게 됐습니다

그동안의 노력이 허사로 돌아가지 않을까 답답합니다 저는 지금 잠시 멈춰 서지만 지난 2년 반 국민과 함께 걸어온 미래를 향한 여정은 결코 멈춰서서는 안 될 것입니다 저는 결코 포기하지 않겠습니다

저를 향한 질책 격려와 성원을 모두 마음에 품고 마지막 순간까지 국가를 위해 최선을 다하겠습니다
공직자 여러분께 당부드립니다 어렵고 힘든 시간이지만 흔들림 없이 각자의 위치를 지키며
맡은바 소힘줄 바랍니다

대통령 권한 대행을 중심으로 모두가 힘을 모아서 국민의 안전과 행복을 지키는데 최선을 다해 주시기 바랍니다 그리고 정치권의 당부드립니다 이제 폭주와 대결의 정치에서 수구와 배려의 정치로 바뀔 수 있도록 정치 문화와 제도를 개선하는데 관심과 노력을 기울려 주시기 바랍니다

사랑하는 국민 여러분 저는 우리 국민의 저력을 믿습니다
우리 모두 대한민국의 자유민주주의와 번영을 위해
힘을 모읍시다 감사합니다

- 윤석열 대통령 -', 'qdzLJlwdMNo', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-23T14:05:44+09:00'::timestamptz, false, false, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=PresidentYoon&wr_id=8', null::date, null::date),
  ('legacy-TK_broadcast-12', 'broadcast', '*모스탄대사와 함께 서울역에서 울려퍼졌다.', '*모스탄대사와 함께 서울역에서 울려퍼졌다.
2만명의 자랑스러운 애국시민들 하나의 함성!', 'GHzREbIcxXU', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-23T12:41:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=12', null::date, null::date),
  ('legacy-TK_broadcast-13', 'broadcast', '서울대학교 정문앞♡모스탄 대사가 등단 하기전 1만명이 애국가부를 때 우렁찬 함성으로', '서울대학교 정문앞♡모스탄 대사가 등단 하기전 1만명이 애국가부를 때 우렁찬 함성으로', '7-rERWuo_hE', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-23T12:32:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=13', null::date, null::date),
  ('legacy-TK_broadcast-4', 'broadcast', '여기는 미국 트럼프 대통령 취임식 역사의 밤 전야제', '미국 트럼프 대통령 취임식 역사의 밤 전야제
트럼프의 노래 [YMCA] Capital One Arena
실내경기장 2만석을 가득채웠다.', 'qmfoFgiRKq4', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-23T12:28:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=4', null::date, null::date),
  ('legacy-TK_broadcast-2', 'broadcast', '박원영 목사, 트럼프 대통령 취임식 초청 받아 출국', '박원영 목사, 트럼프 대통령 취임식 초청 받아 출국 250120', 'pR4_PlkseRo', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-23T12:23:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=2', null::date, null::date),
  ('legacy-TK_broadcast-1', 'broadcast', '서울시 조찬기도회, ‘승리가 예고된 전쟁’', '서울시 조찬기도회, ‘승리가 예고된 전쟁’ 주제로 길자연 목사 "예수의 정신"제하 설교!
"한국교회, 기도의 자리 회복해야""지도자의 탁월한 리더쉽은 필요성 있는 영향력이다"(1)', 'E0BiyT8kbUY', null, '[]'::jsonb, '[]'::jsonb, '[]'::jsonb, '2025-07-23T12:22:00+09:00'::timestamptz, true, true, 'http://xn--3e0b9b67w9mjb2nckd.com/bbs/board.php?bo_table=TK_broadcast&wr_id=1', null::date, null::date)
on conflict (id) do nothing;
