# 웹사이트 카테고리 보강 (③ 기존 카테고리 2/12) 설계

- 날짜: 2026-11-02
- 관련 문서: [PLAN.md](../../PLAN.md), [DESIGN.md](../../../DESIGN.md), 앞 단계 [2026-11-02-basics-category-design.md](2026-11-02-basics-category-design.md)
- ③은 남은 12개 카테고리를 사이트 순서(basics → web → front → back → db → server → git → deploy → security → perf → bug → ai)로 하나씩 보강한다. 이 문서는 두 번째(web, 화면 이름 "웹사이트")다.
- 진행 방식은 basics와 같다. 구현은 메인 세션이 하고, 설계서·계획서·구현 묶음 검토는 디렉터 에이전트(Opus 5.5, effort high)가 한다. 판단은 메인이 하고 원장에 남긴다.

## 1. 목적과 성공 기준

사이트를 처음 만드는 사람이 "주소", "쿠키", "SSR", "검색에 안 나와요", "이탈률" 같은 말을 **주소 칸, 요청이 오가는 그림, 검색 결과 화면, 측정 막대로 바로 이해**하게 한다. 그리고 만든 뒤에 필요한 일(검색에 노출, 브라우저 동작 이해, 방문 측정)까지 카드로 이어 준다.

성공 기준:
- 웹사이트 카테고리가 하위항목 9개, 카드 99장(49 + 새 50)이 된다.
- 모든 카드에 x(헷갈림 칸)가 있다.
- 글자상자 그림(`v.flow`·`v.big`·`v.stack`)이 0장이다. 점검으로 막는다.
- 8장의 완료 기준을 모두 통과한다.

## 2. 범위

포함:
- 새 하위항목 3개: `search`(검색과 공유), `browser`(브라우저 안 동작), `traffic`(방문 측정)
- 새 카드 50장(5장 목록). 정의 d와 x는 모두 해요체로 쓰고, 그림도 새로 그린다.
- 기존 45장에 x를 채운다. x가 이미 있는 4장(HTML, Infinite Scroll, SSR, Static Site)은 빼고, 기존 d는 바꾸지 않는다.
  - 해요체 2~3문장으로 쓴다.
  - 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
- 기존 글자상자 16장을 다시 그린다(3.2).
- 나머지 기존 그림 33장(page·tree·win·tbl·code·cmp 등)은 형식을 그대로 두고 3폭·11px만 점검·수정한다.
- 새 그림 도우미 `serp()`(3.1)
- 직접 조작 4장: HTML(뼈대·꾸밈·동작 켜고 끄기), Conversion Rate(방문·구매 수 고르기), robots.txt(허용·차단 고르기), UTM Parameter(출처 고르기)
- 증상 색인 12개 추가(6장)
- 글꼴 서브셋, PRODUCT.md·PLAN.md·DESIGN.md의 개수·도우미 표기, 점검 기대값(`webparts` 포함) 갱신

제외:
- 다른 카테고리에 이미 있는 말: HTTP·DNS·캐시(net), 모달·탭·토스트(design), 404·Maintenance Page(server)
- 증상 "오류·안 됨" 칩 재검토. ③ 마지막 AI 이후 한 번에 한다.
- 헷갈림 칸 이름 변경, 기존 카드 이동, 다른 카테고리 카드 수정. r 연결만 예외다.

## 3. 그림 구조

### 3.1 `serp()` — 검색 결과 화면 모형 (새로)

- 위에 검색창이 있고 검색어(`q`)가 들어간다. 아래에 결과 줄 1~4개가 있다.
- 결과 줄은 `{t 제목, u 주소, d 설명, tag 꼬리표}`다. 꼬리표 예: "광고", "별점 4.5(예시)".
- `hl` 번째 줄을 강조한다(내 사이트). 강조는 색과 함께 "내 사이트" 글자로도 표시한다. 색만으로 구분하지 않는다.
- 움직임: k번째 결과는 기존 `doc()`처럼 `mk-rux{k}`로 나타난다(10s 주기). `still`이면 모두 보인다.
- 한도(넘으면 오류):
  - 결과 1~4줄
  - 제목 32자, 설명 60자, 주소 40자(한글은 2자로 센다)
  - 검색어 20자
- 좁은 그림판에서는 주소·설명이 줄을 바꾼다. 가로 스크롤은 하지 않는다.
- 입력 검사: 빈 결과, 범위 밖 `hl`, 한도 초과는 오류를 던진다. 점검이 잡게 한다.
- `.sr` 문장으로 "검색어 ○○, 결과 n개, 내 사이트 m번째"를 읽어 준다.
- 대상(예): SEO, Search Engine, Indexing, Keyword, Title Tag, Meta Description, Canonical URL, Structured Data, Backlink

### 3.2 글자상자 16장 다시 그리기

| 카드 | 새 그림 |
|---|---|
| URL | `addr`: https:// · 도메인 · 경로 · 쿼리 칸, 칸 아래 이름 |
| Domain | `net`: 내 PC → DNS 서버("example.com 어디?" → "주소 93.184.x.x(예시)") → 서버 |
| HTML ▶·CSS·JavaScript | 공통 그림 하나: 같은 버튼을 뼈대만 / +꾸밈 / +동작 세 층으로 보여 준다. HTML 카드는 층을 켜고 끄는 직접 조작이고, CSS·JavaScript 카드는 자기 층이 켜진 멈춘 장면이다 |
| Hosting | `net`: 내 PC → 호스팅 서버(파일 올림), 방문자 → 호스팅 서버(페이지 받음) |
| Hyperlink | `pair`: `<a href="/about">` 코드 → 밑줄 링크가 있는 `browser` 화면 |
| SEO | `serp`: 검색 결과에서 내 사이트 줄이 강조됨, 아래 `track`(크롤링 → 색인 → 순위 → 노출) |
| Cookie | `net`: 응답에 `Set-Cookie: lang=ko`, 다음 요청에 `Cookie: lang=ko` |
| SSR | `net`: 요청 → 서버가 HTML 완성 → 완성 화면 도착 |
| CSR | `net`: 요청 → 빈 HTML + JS 도착 → 브라우저가 화면 조립 |
| SSG | `net`: 배포 때 HTML을 미리 만듦 → 요청마다 같은 파일 |
| Cross-browser | `doc` 표: 브라우저별 결과(✓ 정상 / ✕ 버튼 깨짐을 기호와 글자로) |
| Static Site | `vs`: 정적(누구에게나 같은 파일) vs 동적(사람마다 다르게 만든 화면) |
| CMS | `pair`: 관리 화면에서 글 저장 → 사이트 화면에 반영 |
| Conversion Rate ▶ | 방문 수·구매 수를 고르면 `rbar`와 "전환율 n%" 문장이 바뀐다 |

공통 규칙(DESIGN.md):
- 그림 글자는 11px 이상이다.
- 그림 속 숫자는 예시로 표시한다.
- 320/375/1280 세 폭에서 넘침이 없어야 한다.
- 상태를 색만으로 구분하지 않는다.

### 3.3 새 카드 그림

새 50장은 기존 도우미(`net`·`addr`·`track`·`doc`·`flow`·`pair`·`vs`·`browser`·`rbar`·`ide`·`term`)와 `serp`로 그린다. 하위항목별 기본 도구는 다음과 같다. 카드별 배정은 계획서에서 정한다.
- search: `serp`
- browser: `browser`·`track`
- traffic: `rbar`·`doc` 표·`flow`

직접 조작 2장:
- robots.txt: 허용·차단을 고르면 크롤러 결과("수집함 / 수집 안 함")가 바뀐다.
- UTM Parameter: 출처(카톡·인스타·메일)를 고르면 `addr` 주소의 `utm_source` 칸이 바뀐다.

## 4. 데이터와 배치

- `CAT('web', …)`([index.html:1653](../../../index.html))의 추가 하위항목 배열에서 `parts` 뒤에 다음 셋을 넣는다. 공통 `tip`(추천 개념)은 마지막에 그대로 둔다.
  - `['search','검색과 공유','…']`
  - `['browser','브라우저 안 동작','…']`
  - `['traffic','방문 측정','…']`
- 카드 형식 `{en,ko,d,x,p,r,l,o,u,v}`는 그대로다. o:1은 1차 출처가 있을 때만 쓰고, 그때 u를 단다.
- r은 이미 있는 같은 뜻·짝 카드에만 단다. 후보:
  - Canonical URL↔SEO, robots.txt↔Sitemap, Crawler↔SEO
  - Rendering↔DOM·Render Blocking, Refresh↔Hard Refresh, Browser History↔Back Button
  - iframe↔Embed, User Agent↔Cross-browser
  - Service Worker↔PWA·Offline Support, Hydration↔SSR, Progressive Enhancement↔Polyfill
  - Web App↔Native App·PWA, Subdomain↔Domain, Navigation Bar↔Hamburger Menu
  - Heatmap·Funnel↔Analytics, Bounce Rate↔Above the Fold
- 뜻이 다른 짝은 r 없이 x 안에서만 구분한다: Bounce Rate vs design의 Bounce·Debounce, Event Tracking vs basics의 Event, Time on Page vs back의 Session, Pop-up Blocker vs design의 Popover·Modal, Logo vs design의 Brand Color.
- 점검 기대값:
  - `COUNT`에 `web/*` 9개
  - `EXPECT`에 새 카드 영문명
  - `REDRAWN`에 web 하위항목 9개(글자상자 0장)
  - `webparts`를 8 → 14로

## 5. 용어 목록 (새 50장)

`▶`는 직접 조작이다. 측정: 아래 영문명은 기존 1,376개 영문명과 겹치지 않는다(소문자 부분 일치로 대조, 2026-11-02).

겹쳐서 뺀 것:
- Tab, Browser Cache, Hard Refresh, DevTools, Embed, Back Button, Session
- Skeleton UI, Loading Spinner, Back to Top, Dashboard, Breadcrumb, Mega Menu

| 하위항목 | 새 카드 |
|---|---|
| basic (3) | Web App, Subdomain, Homepage |
| core (2) | Web Standards, Progressive Enhancement |
| motion (1) | Scroll Progress Indicator |
| adv (3) | Service Worker, Web App Manifest, Hydration |
| parts (6) | Navigation Bar, Logo, Pricing Section, Testimonial, About Page, Contact Page |
| search (12) | Search Engine, Crawler, Indexing, Keyword, Title Tag, Meta Description, Canonical URL, robots.txt▶, Structured Data, Backlink, UTM Parameter▶, QR Code |
| browser (11) | Address Bar, Rendering, Page Load, Refresh, Bookmark, Browser Extension, Pop-up Blocker, iframe, User Agent, Autofill, Browser History |
| traffic (9) | Page View, Unique Visitor, Referrer, Bounce Rate, Time on Page, Funnel, Heatmap, Retention Rate, Event Tracking |
| tip (3) | Slug, No-code Builder, Coming Soon Page |

기존 카드 중 직접 조작: HTML▶, Conversion Rate▶

x로 구분할 짝(뜻이 가까움):
- URL vs Domain vs Slug
- Subdomain vs 경로(Path)
- Homepage vs Landing Page
- Web App vs Website vs PWA
- Rendering vs SSR·CSR
- Refresh vs Hard Refresh
- Page View vs Unique Visitor
- Bounce Rate vs Conversion Rate
- Title Tag vs Meta Tag vs Open Graph
- Canonical URL vs Redirect
- Crawler vs Indexing
- Address Bar의 검색 vs Search Engine

## 6. 증상 색인 (12개)

기존 157개와 대조했다. "고쳤는데 예전 화면이 보여요"와 "404가 떠요"는 이미 있어 뺐다. 계획서에서 문구를 다시 대조하고, 겹치면 같은 수의 대체 증상을 넣는다.

| 증상 | 그룹 | 연결 카드 |
|---|---|---|
| 검색해도 내 사이트가 안 나와요 | 오류·안 됨 | Indexing, robots.txt, Search Engine |
| 링크를 공유하면 미리보기가 이상해요 | 오류·안 됨 | Open Graph, Meta Description |
| 검색 결과 제목·설명이 엉뚱하게 나와요 | 글자 | Title Tag, Meta Description |
| 같은 글이 주소 두 개로 검색돼요 | 오류·안 됨 | Canonical URL |
| Safari에서만 화면이 깨져요 | 크기·화면 | Cross-browser, User Agent |
| 버튼을 눌러도 새 창이 안 떠요 | 반응·클릭 | Pop-up Blocker |
| 방문은 많은데 구매가 없어요 | 오류·안 됨 | Conversion Rate, Funnel |
| 들어오자마자 나가는 사람이 많아요 | 오류·안 됨 | Bounce Rate, Above the Fold |
| 손님이 어디서 왔는지 모르겠어요 | 오류·안 됨 | UTM Parameter, Referrer |
| 로그인이 자꾸 풀려요 | 오류·안 됨 | Cookie |
| 다른 사이트에 넣은 내 페이지가 안 보여요 | 오류·안 됨 | iframe |
| 첫 화면이 한참 하얗게 비어 있어요 | 느림 | CSR, SSR, Page Load |

## 7. 진행 순서

1. `serp()` 도우미와 입력 검사 점검
2. 하위항목 3개, 점검 기대값
3. 하위항목별 새 카드(search·browser는 각각 Task 하나)
4. 기존 글자상자 16장 다시 그리기
5. 기존 45장 x 채움과 기존 그림 33장 점검
6. 직접 조작 4장
7. 증상 색인
8. 글꼴·문서(PRODUCT/PLAN/DESIGN)·전체 점검

디렉터 검토는 세 번 받는다.
1. 이 설계서
2. 계획서
3. 구현 묶음: 도우미 / 카드 / 그림·문구마다

Critical·Important는 RED→GREEN으로 고친다. Minor는 기록했다가 마지막에 보고한다.

## 8. 점검과 완료 기준

자동 점검:
- `node tests/check.mjs`가 전부 통과하고 `LATER`가 비어 있다.
- 개수
  - 전체 카드 1,428개(1,378 + 50, `total`)
  - 증상 169개(157 + 12, `symcount`)
  - 다른 카테고리 개수는 그대로다.
  - 영문명 중복이 없고, 관련 용어·증상 대상이 모두 있다.
- PRODUCT.md 개수 표기가 실제와 같다.
- 직접 조작 4장: `init`이 있고, 결과 문장에 `aria-live`가 있고, 문장 갱신은 `psay`로 한다.
- 재생 버튼이 붙는 새 그림(`m:1`)에 움직이는 요소가 있다.
- 웹사이트 카테고리의 글자상자 그림이 0장이다(`REDRAWN`).
- 웹사이트 카테고리 모든 카드에 x가 있다. o:1이면 u가 있다.
- `serp()`가 한도를 넘거나 잘못된 입력을 받으면 오류를 던진다(새 점검).

브라우저(playwright) 확인:
- 320/375/1280 세 폭과 reduced-motion에서 넘침 0, 11px 미만 글자 0, 콘솔 오류 0
- reduced-motion에서 자동 재생이 없고, 재생 버튼이 동작한다.
- 직접 조작 4장을 키보드로 조작할 수 있다.

그 밖:
- 디자인 품질: break-ui(`serp()` 4줄·제목 32자·설명 60자)로 보고, 필요하면 interfaces 계열 스킬을 쓴다.
- 완료 후 main 병합은 사용자 확인 뒤에 한다.
- 정의·설명의 사실은 Task마다 검색(MDN, Google 검색 센터, 공식 문서)으로 확인하고 출처를 원장에 남긴다.

## 9. 글꼴

새 문구에 Hahmlet 서브셋에 없는 글자가 있으면 font 점검이 실패한다. 주석에 쓴 글자도 포함된다.
- 문구를 모두 넣은 뒤(7장 8단계) 서브셋을 다시 만든다.
- 중간 Task에서는 없는 글자를 피하거나, 그 Task 안에서 서브셋을 갱신한다.

## 10. 위험

| 위험 | 대응 |
|---|---|
| 작업량이 커서 컨텍스트가 압축됨 | 원장(`.superpowers/sdd/…/progress.md`), 체크포인트 메모리, Task마다 커밋 |
| SEO·쿠키·SSR처럼 틀리기 쉽거나 자주 바뀌는 설명 | MDN·Google 검색 센터로 확인. 순위 보장처럼 단정하는 문구는 쓰지 않음. 디렉터 검토 ③에서 사실 점검 |
| `serp()`가 실제 검색 엔진 화면을 흉내 냄 | 특정 회사 로고·색을 쓰지 않고 중립 모형으로 그림 |
| 분석 숫자가 실제 기준처럼 읽힘 | 모든 숫자에 "(예시)" 표시, 이탈률 "좋은 기준" 같은 단정 금지 |
| 기존 r 연결이 다른 카테고리 카드를 가리킴 | r 값만 추가하고 그 카드 본문은 바꾸지 않음 |
