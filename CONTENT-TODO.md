# 내용 채우기 목록 (CONTENT-TODO)

새 홈페이지의 디자인과 틀은 완성되었지만, 단체에 관한 **실제 내용은 하나도 지어 넣지 않았습니다.**
화면에 노란 바탕으로 `[입력 필요: …]`라고 보이는 곳이 모두 채워야 할 자리입니다.
이 목록은 HTML 파일 속 `data-ph="키"`를 모두 찾아 자동으로 만든 것이므로 빠진 것이 없습니다.

- 반드시 채울 키: **62개**
- 선택 키(주석 속 틀, 지금은 화면에 안 보임): **6개**

채우는 방법은 README.md의 ‘내용 채우기’를 보세요. 요약: 모든 HTML 파일에서 `data-ph="키"`를 검색해,
`<span class="ph" data-ph="키">[입력 필요: …]</span>` 덩어리를 실제 글로 바꿉니다. 같은 키는 모든 쪽에서 똑같이 바꿉니다.

> 옛 홈페이지(국민주권운동.com)의 글·연락처·연혁은 이 작업 환경에서 열어 볼 수 없었습니다.
> 도메인을 새 사이트로 옮기기 **전에** 옛 사이트의 내용을 꼭 복사해 두세요.

## 공통 연락처 (여러 쪽에 함께 나옴)

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `contact-phone` | index.html (처음 화면), about.html (단체 소개), news.html (활동 소식), resources.html (자료실), contact.html (오시는 길), 404.html (없는 화면 안내) | [입력 필요: 대표 전화번호] | 대표 전화번호. 화면에는 하이픈을 넣어 쓰고(예: 지역번호-국번-번호), tel: 주소에는 숫자만 씁니다. |
| [ ] | `contact-hours` | index.html (처음 화면), about.html (단체 소개), news.html (활동 소식), resources.html (자료실), contact.html (오시는 길), 404.html (없는 화면 안내) | [입력 필요: 전화 받는 요일과 시간] | 전화를 받는 요일과 시간 (예: 평일 몇 시~몇 시). 점심시간·휴무일이 있으면 함께. |
| [ ] | `contact-address` | index.html (처음 화면), about.html (단체 소개), news.html (활동 소식), resources.html (자료실), contact.html (오시는 길), 404.html (없는 화면 안내) | [입력 필요: 도로명 주소와 건물 이름·층] | 도로명 주소와 건물 이름, 층·호수 (우편번호를 함께 써도 됩니다). |
| [ ] | `contact-email` | index.html (처음 화면), about.html (단체 소개), news.html (활동 소식), resources.html (자료실), contact.html (오시는 길), 404.html (없는 화면 안내) | [입력 필요: 이메일 주소] | 대표 이메일 주소. 화면 글자와 mailto: 주소 두 곳에 똑같이 씁니다. |

## 처음 화면

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `home-intro` | index.html (처음 화면) | [입력 필요: 단체를 한두 문장으로 소개하는 글] | 처음 화면에 보일 단체 소개 글 한두 문장. |

## 단체 소개

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `about-greeting` | about.html (단체 소개) | [입력 필요: 인사말 본문] | 인사말 본문 전체 (문단마다 `<p>…</p>`로 감쌉니다). |
| [ ] | `about-greeting-signer` | about.html (단체 소개) | [입력 필요: 인사말을 쓴 분의 직함과 이름] | 인사말을 쓴 분의 직함과 이름 (예: 대표 ○○○). |
| [ ] | `about-purpose` | about.html (단체 소개) | [입력 필요: 설립 취지 글] | 설립 취지 글 전체 (문단마다 `<p>…</p>`로 감쌉니다). |
| [ ] | `about-activity-1-title` | about.html (단체 소개) | [입력 필요: 활동 이름] | 주요 활동의 이름 (활동마다 하나씩, 필요한 만큼 늘리거나 줄입니다). |
| [ ] | `about-activity-1-desc` | about.html (단체 소개) | [입력 필요: 활동 설명] | 그 활동에 대한 설명 몇 문장. |
| [ ] | `about-activity-2-title` | about.html (단체 소개) | [입력 필요: 활동 이름] | 주요 활동의 이름 (활동마다 하나씩, 필요한 만큼 늘리거나 줄입니다). |
| [ ] | `about-activity-2-desc` | about.html (단체 소개) | [입력 필요: 활동 설명] | 그 활동에 대한 설명 몇 문장. |
| [ ] | `about-activity-3-title` | about.html (단체 소개) | [입력 필요: 활동 이름] | 주요 활동의 이름 (활동마다 하나씩, 필요한 만큼 늘리거나 줄입니다). |
| [ ] | `about-activity-3-desc` | about.html (단체 소개) | [입력 필요: 활동 설명] | 그 활동에 대한 설명 몇 문장. |
| [ ] | `about-history-1-date` | about.html (단체 소개) | [입력 필요: 연도·월] | 연혁 항목의 연도와 월 (예: ○○○○년 ○월). |
| [ ] | `about-history-1-text` | about.html (단체 소개) | [입력 필요: 있었던 일] | 그때 있었던 일 한 줄. |
| [ ] | `about-history-2-date` | about.html (단체 소개) | [입력 필요: 연도·월] | 연혁 항목의 연도와 월 (예: ○○○○년 ○월). |
| [ ] | `about-history-2-text` | about.html (단체 소개) | [입력 필요: 있었던 일] | 그때 있었던 일 한 줄. |
| [ ] | `about-history-3-date` | about.html (단체 소개) | [입력 필요: 연도·월] | 연혁 항목의 연도와 월 (예: ○○○○년 ○월). |
| [ ] | `about-history-3-text` | about.html (단체 소개) | [입력 필요: 있었던 일] | 그때 있었던 일 한 줄. |
| [ ] | `about-org-1-role` | about.html (단체 소개) | [입력 필요: 직책] | 조직표의 직책 (예: 대표, 사무국장 등 실제 직책). |
| [ ] | `about-org-1-name` | about.html (단체 소개) | [입력 필요: 이름] | 그 직책을 맡은 분의 이름. |
| [ ] | `about-org-2-role` | about.html (단체 소개) | [입력 필요: 직책] | 조직표의 직책 (예: 대표, 사무국장 등 실제 직책). |
| [ ] | `about-org-2-name` | about.html (단체 소개) | [입력 필요: 이름] | 그 직책을 맡은 분의 이름. |
| [ ] | `about-org-3-role` | about.html (단체 소개) | [입력 필요: 직책] | 조직표의 직책 (예: 대표, 사무국장 등 실제 직책). |
| [ ] | `about-org-3-name` | about.html (단체 소개) | [입력 필요: 이름] | 그 직책을 맡은 분의 이름. |

## 활동 소식

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `news-1-title` | index.html (처음 화면), news.html (활동 소식) | [입력 필요: 소식 제목] | 소식 제목. 처음 화면의 ‘최근 소식’에도 같은 제목을 씁니다. |
| [ ] | `news-1-date` | index.html (처음 화면), news.html (활동 소식) | [입력 필요: 올린 날짜] | 올린 날짜 ('YYYY년 M월 D일' 형식). 처음 화면의 ‘최근 소식’에도 같게 씁니다. |
| [ ] | `news-2-title` | index.html (처음 화면), news.html (활동 소식) | [입력 필요: 소식 제목] | 소식 제목. 처음 화면의 ‘최근 소식’에도 같은 제목을 씁니다. |
| [ ] | `news-2-date` | index.html (처음 화면), news.html (활동 소식) | [입력 필요: 올린 날짜] | 올린 날짜 ('YYYY년 M월 D일' 형식). 처음 화면의 ‘최근 소식’에도 같게 씁니다. |
| [ ] | `news-3-title` | index.html (처음 화면), news.html (활동 소식) | [입력 필요: 소식 제목] | 소식 제목. 처음 화면의 ‘최근 소식’에도 같은 제목을 씁니다. |
| [ ] | `news-3-date` | index.html (처음 화면), news.html (활동 소식) | [입력 필요: 올린 날짜] | 올린 날짜 ('YYYY년 M월 D일' 형식). 처음 화면의 ‘최근 소식’에도 같게 씁니다. |
| [ ] | `news-1-category` | news.html (활동 소식) | [입력 필요: 공지 또는 활동] | 소식의 갈래: '공지' 또는 '활동' 중 하나. |
| [ ] | `news-1-body` | news.html (활동 소식) | [입력 필요: 소식 내용] | 소식 본문 (문단마다 `<p>…</p>`로 감쌉니다). |
| [ ] | `news-2-category` | news.html (활동 소식) | [입력 필요: 공지 또는 활동] | 소식의 갈래: '공지' 또는 '활동' 중 하나. |
| [ ] | `news-2-body` | news.html (활동 소식) | [입력 필요: 소식 내용] | 소식 본문 (문단마다 `<p>…</p>`로 감쌉니다). |
| [ ] | `news-3-category` | news.html (활동 소식) | [입력 필요: 공지 또는 활동] | 소식의 갈래: '공지' 또는 '활동' 중 하나. |
| [ ] | `news-3-body` | news.html (활동 소식) | [입력 필요: 소식 내용] | 소식 본문 (문단마다 `<p>…</p>`로 감쌉니다). |

## 자료실

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `resource-1-title` | resources.html (자료실) | [입력 필요: 자료 이름] | 자료 이름. |
| [ ] | `resource-1-desc` | resources.html (자료실) | [입력 필요: 자료 설명 한 줄] | 자료를 설명하는 한 줄. |
| [ ] | `resource-1-format` | resources.html (자료실) | [입력 필요: 파일 형식] | 파일 형식 (예: PDF, 한글(HWP)). |
| [ ] | `resource-1-size` | resources.html (자료실) | [입력 필요: 파일 크기] | 파일 크기 (예: ○○○KB, ○.○MB). |
| [ ] | `resource-1-date` | resources.html (자료실) | [입력 필요: 올린 날짜] | 자료를 올린 날짜 ('YYYY년 M월 D일' 형식). |
| [ ] | `resource-1-file` | resources.html (자료실) | [입력 필요: 올릴 자료 파일] | 올릴 자료 파일 자체(PDF 등). assets/files/ 폴더에 영문·숫자 파일 이름으로 넣고 노란 칸을 ‘내려받기’ 단추로 바꿉니다(주석의 틀 사용). |
| [ ] | `resource-2-title` | resources.html (자료실) | [입력 필요: 자료 이름] | 자료 이름. |
| [ ] | `resource-2-desc` | resources.html (자료실) | [입력 필요: 자료 설명 한 줄] | 자료를 설명하는 한 줄. |
| [ ] | `resource-2-format` | resources.html (자료실) | [입력 필요: 파일 형식] | 파일 형식 (예: PDF, 한글(HWP)). |
| [ ] | `resource-2-size` | resources.html (자료실) | [입력 필요: 파일 크기] | 파일 크기 (예: ○○○KB, ○.○MB). |
| [ ] | `resource-2-date` | resources.html (자료실) | [입력 필요: 올린 날짜] | 자료를 올린 날짜 ('YYYY년 M월 D일' 형식). |
| [ ] | `resource-2-file` | resources.html (자료실) | [입력 필요: 올릴 자료 파일] | 올릴 자료 파일 자체(PDF 등). assets/files/ 폴더에 영문·숫자 파일 이름으로 넣고 노란 칸을 ‘내려받기’ 단추로 바꿉니다(주석의 틀 사용). |
| [ ] | `resource-3-title` | resources.html (자료실) | [입력 필요: 자료 이름] | 자료 이름. |
| [ ] | `resource-3-desc` | resources.html (자료실) | [입력 필요: 자료 설명 한 줄] | 자료를 설명하는 한 줄. |
| [ ] | `resource-3-format` | resources.html (자료실) | [입력 필요: 파일 형식] | 파일 형식 (예: PDF, 한글(HWP)). |
| [ ] | `resource-3-size` | resources.html (자료실) | [입력 필요: 파일 크기] | 파일 크기 (예: ○○○KB, ○.○MB). |
| [ ] | `resource-3-date` | resources.html (자료실) | [입력 필요: 올린 날짜] | 자료를 올린 날짜 ('YYYY년 M월 D일' 형식). |
| [ ] | `resource-3-file` | resources.html (자료실) | [입력 필요: 올릴 자료 파일] | 올릴 자료 파일 자체(PDF 등). assets/files/ 폴더에 영문·숫자 파일 이름으로 넣고 노란 칸을 ‘내려받기’ 단추로 바꿉니다(주석의 틀 사용). |

## 오시는 길

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `contact-map-kakao-url` | contact.html (오시는 길) | [입력 필요: 카카오맵 링크 주소] | 카카오맵에서 사무실 위치를 공유한 링크 주소. 받으면 노란 칸을 단추로 바꿉니다(주석의 틀 사용). |
| [ ] | `contact-map-naver-url` | contact.html (오시는 길) | [입력 필요: 네이버 지도 링크 주소] | 네이버 지도에서 사무실 위치를 공유한 링크 주소. 받으면 노란 칸을 단추로 바꿉니다(주석의 틀 사용). |
| [ ] | `contact-directions-subway` | contact.html (오시는 길) | [입력 필요: 가까운 지하철역과 출구, 걸어서 걸리는 시간] | 가까운 지하철역 이름, 나가는 출구 번호, 걸어서 걸리는 시간. |
| [ ] | `contact-directions-bus` | contact.html (오시는 길) | [입력 필요: 가까운 버스 정류장과 버스 번호] | 가까운 버스 정류장 이름과 그곳에 서는 버스 번호. |
| [ ] | `contact-directions-car` | contact.html (오시는 길) | [입력 필요: 주차할 수 있는지와 주차 장소] | 주차할 수 있는지, 주차 장소와 요금(있으면). |
| [ ] | `contact-map-image` | contact.html (오시는 길) | [입력 필요: 약도 그림 파일(있으면) — 그림 속 글자는 위 본문에도 적습니다] | 약도 그림 파일(있을 때만). 그림 속 글자는 본문에도 적습니다. 약도가 없으면 약도 구역 전체를 지웁니다. |
| [ ] | `contact-fax` | contact.html (오시는 길) · 주석 속 선택 항목 | [입력 필요: 팩스 번호] | (선택) 팩스 번호. 있으면 주석을 풀고 채웁니다. |

## 단체 정보 (바닥글)

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `org-representative` | index.html (처음 화면), about.html (단체 소개), news.html (활동 소식), resources.html (자료실), contact.html (오시는 길), 404.html (없는 화면 안내) · 주석 속 선택 항목 | [입력 필요: 대표자 직함과 이름] | (선택) 대표자 직함과 이름. 바닥글에 보이게 하려면 주석을 풀고 채웁니다. |
| [ ] | `org-registration-no` | index.html (처음 화면), about.html (단체 소개), news.html (활동 소식), resources.html (자료실), contact.html (오시는 길), 404.html (없는 화면 안내) · 주석 속 선택 항목 | [입력 필요: 고유번호 또는 등록번호] | (선택) 고유번호 또는 비영리단체 등록번호. 바닥글에 보이게 하려면 주석을 풀고 채웁니다. |

## 후원 안내

| 완료 | 키 (data-ph) | 나오는 쪽 | 지금 보이는 글 | 필요한 내용 |
|---|---|---|---|---|
| [ ] | `donation-bank` | contact.html (오시는 길) · 주석 속 선택 항목 | [입력 필요: 은행 이름] | (선택) 후원 계좌의 은행 이름. 후원 안내를 보이려면 contact.html의 주석을 풉니다. |
| [ ] | `donation-account` | contact.html (오시는 길) · 주석 속 선택 항목 | [입력 필요: 계좌번호] | (선택) 후원 계좌번호. |
| [ ] | `donation-holder` | contact.html (오시는 길) · 주석 속 선택 항목 | [입력 필요: 예금주] | (선택) 후원 계좌의 예금주. |

## 선택 사진 (주석 속 틀만 있음, 키 목록에는 없음)

사진을 넣을 때는 반드시 사진을 설명하는 `alt` 글을 씁니다. 사람 사진은 당사자의 동의를 받습니다.

| 완료 | 자리 이름 | 쪽 | 설명 |
|---|---|---|---|
| [ ] | `home-photo` | index.html | 처음 화면 소개 글 아래의 대표 사진 |
| [ ] | `about-greeting-photo` | about.html | 인사말 옆 대표자 사진 |
| [ ] | `about-org-chart` | about.html | 조직도 그림 (그림을 써도 조직 표는 글자 대체물로 남깁니다) |
| [ ] | `news-1-photo` ~ `news-3-photo` | news.html | 각 소식의 사진 |

## 공개 전 마지막 점검

저장소 맨 위 폴더에서 아래 두 명령이 **아무것도 출력하지 않아야** 공개할 수 있습니다.

```
grep -rn 'class="[^"]*\bph\b' *.html
grep -rnE 'href="(tel|mailto):"' *.html
```

(첫 명령은 주석 속 선택 틀도 찾아냅니다. 쓰지 않을 선택 틀은 주석째 지우거나, 결과가 주석 줄뿐인지 눈으로 확인하세요.)
