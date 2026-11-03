# 백엔드 카테고리 보강 (③ 기존 카테고리 4/12) 설계

- 날짜: 2026-11-03
- 관련 문서: [PLAN.md](../../PLAN.md), [DESIGN.md](../../../DESIGN.md), 앞 단계 [2026-11-02-front-category-design.md](2026-11-02-front-category-design.md)
- ③은 남은 12개 카테고리를 사이트 순서(basics → web → front → back → db → server → git → deploy → security → perf → bug → ai)로 하나씩 보강한다. 이 문서는 네 번째(back, 화면 이름 "백엔드")다.
- 진행 방식은 front와 같다. 구현은 메인 세션이 하고, 설계서·계획서·구현 묶음 검토는 디렉터 에이전트(Opus 5.5, effort high)가 한다. 판단은 메인이 하고 원장에 남긴다.
- 사용자 지시(2026-11-03): 초보자가 가장 이해하기 좋은 도구·도우미가 있으면 최대한 다 쓴다.
- 디렉터 설계서 검토(1차, Critical 2·Important 8·Minor 4)를 반영한 판이다.

## 1. 목적과 성공 기준

Claude에게 서버 기능을 만들어 달라고 하는 사람이 "401이 떠요", "웹훅이 두 번 와요", "Bearer 토큰", "미들웨어" 같은 말을 **누가 누구에게 무엇을 보냈는지 시간 순서로 그린 그림과 실제 HTTP 메시지 모양으로 바로 이해**하게 한다. 그리고 서버 구조, 데이터 형식, 오래 걸리는 작업, 인증까지 카드로 이어 준다.

성공 기준:
- 백엔드 카테고리가 하위항목 10개, 카드 97장(51 + 새 46)이 된다.
- 모든 카드에 x(헷갈림 칸)가 있다.
- back 카드의 객체 v가 0장이고, 97장 모두 `u-back-` 키를 쓴다. 점검으로 막는다.
- 8장의 완료 기준을 모두 통과한다.

## 2. 범위

포함:
- 새 하위항목 4개: `arch`(서버 구조), `data`(데이터 주고받기), `job`(작업 처리), `auth`(인증 더 보기)
- 새 카드 46장(5장 목록). 정의 d와 x는 해요체로 쓰고, 그림은 모두 새로 그린다.
- 기존 47장에 x를 채운다. x가 이미 있는 4장(Authentication·Session·Polling·Microservices)은 빼고, 기존 d는 바꾸지 않는다.
  - 해요체 2~3문장으로 쓴다.
  - 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
- 기존 51장의 그림을 모두 전용 그림으로 바꾼다(3.3). 측정(2026-11-03): 객체 v 40장(flow·tbl·code·big·stack·http), 공유 그림 문자열 11장(input·progress·scale·pulse·spinner·stagger·typing·shake·pagination). 공유 그림은 대부분 뜻과 맞지 않는다(예: Retry가 spinner, Queue가 stagger). 공유 그림 키 자체(`D['spinner']` 등)는 지우지 않는다.
- 새 그림 도우미 `seq()`·`httpmsg()`(3.1, 3.2)
- 직접 조작 4장: Rate Limit, Idempotent, Cache, Authorization(3.5)
- 증상 색인 12개 추가(6장)
- 글꼴 서브셋, PRODUCT.md·PLAN.md·DESIGN.md의 개수·도우미 표기, 점검 기대값 갱신

제외:
- 다른 카테고리에 이미 있는 같은 뜻의 말(측정, 2026-11-03):
  - basics: Asynchronous·Async/Await·Promise·Callback·Thread·Runtime / test: Dependency Injection·Mock
  - server: HTTP Status Code·200~502 상태 번호 카드·Serverless·Cron Job·Load Balancer·Reverse Proxy·Server Log·Cold Start
  - security: Refresh Token·Token Expiry·HttpOnly Cookie·Password Hashing·CSRF·SQL Injection
  - db: Redis·Transaction·Migration·Supabase
  - net: Socket·Proxy / design: File Upload / front: Fetch / bug: Race Condition / terminal: curl
- 이름만 같고 뜻이 다른 기존 카드(ai Token = AI 글 단위, ai Streaming = AI 답이 흘러나옴, ai Scope = 작업 범위, ai/core)는 제외 사유가 아니다. 새 카드 Access Token·Streaming Response·OAuth Scope가 x로 구분한다. 그래서 새 카드 이름은 `Scope`가 아니라 `OAuth Scope`다(정규화 이름 중복 방지).
- 증상 "오류·안 됨" 칩 재검토. ③ 마지막 AI 이후 한 번에 한다.
- 헷갈림 칸 이름 변경, 기존 카드 이동, 다른 카테고리 카드 수정. r 연결만 예외다.

## 3. 그림 구조

### 3.1 `seq()` — 시간 순서도 (새로)

- `seq(lanes, msgs, {still, label})`
  - `lanes`: 세로줄 이름 배열 2~4개(예: `['브라우저','서버','DB']`). 이름은 8자까지(한글은 2자로 센다).
  - `msgs`: 메시지 배열 1~8개, 항목은 `{from, to, t, err, wait}`.
    - `from`·`to`는 lanes 번호(0부터). `from === to`이면 화살표 대신 그 줄 안의 "처리" 상자로 그린다(예: 서버가 비밀번호 확인).
    - `t`는 14자까지. 코드 모양 글(`POST /login`)도 쓸 수 있다.
    - `err:1`이면 "실패" 글자를, `wait:1`이면 "기다림" 글자를 붙인다. 색만으로 구분하지 않는다. 둘을 함께 쓰면 오류다.
- 배치: 메시지 한 개가 한 행이다. 글 `t`는 화살표 길이와 상관없이 **행 전체 폭**에 놓고(이웃 세로줄 사이 약 60px에 14자가 들어가지 않기 때문, 320px 그림판 안쪽 약 244px 기준·추측), 그 아래에 출발 줄에서 도착 줄까지 화살표 선을 긋는다. 행 앞에는 "브라우저가 서버에" 같은 보낸 쪽·받는 쪽 이름을 작은 글자로 쓴다.
- 움직임: k번째 메시지는 기존 키프레임 `mk-cdz{k}`(1~8, [index.html:493](../../../index.html))로 차례로 나타난다(`A` 클래스). `mk-cdz`에 재생 시간·지연을 주는 규칙은 지금 `.mk-cds.A`·`.mk-mrs.A`에만 있으므로([index.html:491](../../../index.html)), 새 클래스(`.mk-sqm.A`)에 같은 규칙(10s, -8.8s, infinite, linear, opacity 0)을 더한다. `still`이면 모두 보이는 마지막 장면이다.
- 화살표 머리·선은 `aria-hidden`이다. 방향은 "브라우저 → 서버" 기호가 아니라 행 앞 이름과 `.sr` 문장으로 전한다.
- 좁은 그림판(320px)에서도 세로줄 4개 + 14자 글이 가로 스크롤 없이 들어가야 한다. 계획서 첫 Task에서 break-ui로 다시 잰다. 들어가지 않으면 한도를 줄인다.
- 입력 검사(넘으면 오류): lanes 수·이름 길이, msgs 수, 정수가 아니거나 범위 밖인 from·to, 빈 t·t 길이, err와 wait 동시 사용.
- `.sr` 문장: "브라우저가 서버에 POST /login, 서버가 처리: 비밀번호 확인, 서버가 브라우저에 200 OK(실패 0개)" 식으로 기호 없이 읽는다.
- 대상(예): Server, Request Flow, Middleware, Webhook, OAuth, Polling, WebSocket, Retry, CORS, Background Job, Pub/Sub, Long Polling, Server-Sent Events, Circuit Breaker, Redirect URI

### 3.2 `httpmsg()` — HTTP 메시지 모형 (새로)

- `httpmsg({kind, start, head, body, hl, label})`
  - `kind`: `'요청'`·`'응답'` 중 하나. 위 머리띠에 "HTTP 요청"·"HTTP 응답"을 글자로 쓴다.
  - `start`: 첫 줄. 요청은 `메서드 경로`(예: `POST /api/posts`), 응답은 `상태 번호 이름`(예: `201 Created`). 실제 HTTP/1.1 첫 줄에 붙는 버전(`HTTP/1.1`)은 28자 한도 때문에 뺀다. 머리띠 옆에 "(버전 줄임)"을 작은 글자로 쓴다([MDN Messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages)).
  - `head`: 헤더 줄 배열 0~4줄(예: `Content-Type: application/json`). 너무 길면 값 일부를 `…`으로 줄인 예시를 쓴다.
  - `body`: 본문 줄 배열 0~4줄. 헤더와 본문 사이에는 빈 줄 칸을 그린다(HTTP 형식과 같음).
  - `hl`: 강조할 줄 이름 배열(`'start'`, `'h0'`~`'h3'`, `'b0'`~`'b3'`). 강조는 배경색과 "강조" 글자로 한다.
- 응답 상태 번호가 400 이상이면 첫 줄에 "실패" 글자를 붙인다.
- 한도(넘으면 오류): 모든 줄 30자(`Content-Type: application/json`이 30자라 ide 28자보다 2자 넓힌다. 꼬리표는 자리가 없으면 다음 줄로 내린다), 헤더·본문 각 5줄 이상, kind가 요청·응답이 아님, 없는 줄을 가리키는 `hl`. 응답의 start가 100~599 상태 번호로 시작하지 않거나 요청의 start가 메서드(GET·HEAD·POST·PUT·PATCH·DELETE·OPTIONS)로 시작하지 않아도 오류다. OPTIONS는 CORS 사전 요청 때문에 넣는다.
- 좁은 칸에 넣지 않는다: `pair` 왼쪽 칸은 110px(코드 칸 `fcss`도 최대 190px, [index.html:346](../../../index.html)·[464](../../../index.html))라 28자 줄이 넘친다. `httpmsg`는 그림판 전체 폭에 단독으로 두거나 두 개를 세로로 쌓는다.
- 이름 `httpmsg`는 기존 `{http:200}` 그림 형식(server 상태 번호 카드, [index.html:278](../../../index.html))과 헷갈리지 않게 정했다.
- `.sr` 문장: "HTTP 요청, POST /api/posts, 헤더 2줄, 본문 3줄, 강조: Content-Type 줄".
- 대상(예): Request, Response, Request Header, Request Body, Response Header, Response Body, Content-Type, Payload, Bearer Token, API Key, Error Response, Health Check, Pagination API

### 3.3 기존 51장 다시 그리기

키 이름은 `u-back-<slug>`다(예: `u-back-request-flow`). 표의 "▶"는 직접 조작(3.5)이다.

| 하위항목 | 카드 | 새 그림 |
|---|---|---|
| basic | Server | `seq` 브라우저·서버: 회원 정보 요청 → 처리(찾기) → 응답 |
| basic | Client | `browser` 화면 속 "보내기" 버튼과 "이 화면이 클라이언트" 이름표, 화면 밖 서버 칸 |
| basic | Request | `httpmsg` 요청 `POST /api/posts`, 본문 강조 |
| basic | Response | `httpmsg` 응답 `201 Created`, 첫 줄 강조 |
| basic | API | `pair`: `fetch('/api/weather')` 코드 → 날씨 카드 "맑음 18도(예시)" |
| basic | Endpoint | `doc` 표: 주소 · 메서드 · 하는 일 세 줄 |
| basic | JSON | `pair`: JSON 글 → 화면 카드(이름·나이) |
| basic | Database | `seq` 서버·DB: 저장 → 저장됨 → 조회 → 결과 |
| core | HTTP | `httpmsg` 요청과 `httpmsg` 응답을 세로로 쌓고 사이에 "주고받는 약속" 이름표 |
| core | HTTP Method | `doc` 표: GET 가져오기 · POST 만들기 · PUT 통째로 바꾸기 · PATCH 일부 고치기 · DELETE 지우기 |
| core | REST API | `doc` 표: 같은 주소 `/posts` 하나에 메서드마다 다른 일 |
| core | CRUD | `track`: Create → Read → Update → Delete, 칸마다 짝 메서드 |
| core | Authentication | `seq` 브라우저·서버: 아이디·비번 → 처리(확인) → 로그인됨 |
| core | Authorization ▶ | 역할(일반 회원·관리자)을 바꾸면 "글 삭제" 요청 결과가 `403`·`200`으로 바뀜 |
| core | Middleware | `seq` 브라우저·미들웨어·라우트: 요청 → 로그인 검사 → 통과 → 처리 |
| core | Environment Variable | `pair`: `.env`의 `API_KEY=…`(예시) → 코드 `process.env.API_KEY` |
| core | Validation | `seq` 브라우저·서버: 이메일 "abc" 보냄 → 처리(형식 검사) → 400 실패 |
| core | Webhook | `seq` 결제 서비스·내 서버: 결제 완료 알림 POST → 처리(서명 확인) → 200 받음 |
| core | Rate Limit ▶ | 버튼을 빠르게 누르면 정한 횟수 다음부터 `429`와 "잠시 뒤 다시" |
| core | Session | `seq` 브라우저·서버·세션 저장소: 로그인 → 세션 만들기 → 쿠키 sid → 다음 요청에 쿠키 |
| motion | Request Flow | `seq` 브라우저·서버·DB: 클릭 요청 → 조회 → 결과 → 응답 → 처리(화면 갱신) |
| motion | Optimistic Update | `track`: 누름 → 화면 먼저 바뀜 → 서버 응답 → 실패면 되돌림 |
| motion | Polling | `seq` 브라우저·서버: "새 글?" "없음"을 되풀이하다 "있음" |
| motion | WebSocket | `seq` 브라우저·서버: 연결 한 번 → 서버가 먼저 보냄 → 브라우저도 보냄(채팅 글) → 서버가 또 보냄. 양방향임을 보여 SSE(한 방향)와 구분 |
| motion | Timeout | `track`: 요청 → 기다림(5초, 예시) → 응답 없음 → 시간 초과 |
| motion | Retry | `seq` 브라우저·서버: 요청 실패 → 다시 요청 → 200 |
| motion | Queue | `track`: 대기열 칸 셋 → 워커가 앞에서부터 하나씩 꺼냄 |
| adv | GraphQL | `pair`: 쿼리 `{ post { title } }` → 응답에 title만 |
| adv | JWT | `doc`: 헤더 · 내용 · 서명 세 칸, "내용은 누구나 읽을 수 있어요" |
| adv | OAuth | `seq` 브라우저·내 서버·로그인 서비스: 로그인 서비스로 이동 → 처리(동의) → 코드를 들고 내 서버로 돌아옴(리다이렉트) → 내 서버가 로그인 서비스와 직접 코드를 토큰으로 바꿈. 토큰 교환은 서버끼리 그린다([RFC 6749 §4.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1)) |
| adv | Microservices | `seq` 주문 서비스·결제 서비스·알림 서비스: 결제 요청 → 완료 → 알림 보내기 |
| adv | Monolith | 전용 HTML: 한 상자 안에 회원·주문·결제 칸, 아래 "고쳐도 한 번에 배포" |
| adv | Cache ▶ | 첫 요청은 "DB까지 다녀옴 · 느림", 두 번째는 "캐시에 있음 · 빠름", "캐시 비우기" 버튼 |
| adv | ORM | `pair`: `User.find({ id: 1 })` → `SELECT * FROM users WHERE id = 1` |
| adv | Serverless Function | `track`: 요청 옴 → 함수 켜짐 → 실행 → 꺼짐 |
| api | Request Header | `httpmsg` 요청, 헤더 줄 강조 |
| api | Request Body | `httpmsg` 요청, 본문 줄 강조 |
| api | Query Parameter | `browser` 주소 `example.com/posts?page=2&sort=new` 강조 + `doc` 표 이름·값 |
| api | Path Parameter | `pair`: `/users/42`의 42 강조 → "42번 회원" 화면 |
| api | API Key | `httpmsg` 요청, 머리띠에 "내 서버가 보냄", `x-api-key` 헤더 강조, "화면 코드에 두지 않아요" |
| api | API Documentation | `doc`: 주소 · 보낼 값 · 예시 응답 블록 |
| api | SDK | `vs`: 직접 요청 코드 여러 줄 vs SDK 한 줄 |
| api | CORS | `seq` 브라우저·다른 서버: 요청 → 응답(허용 헤더 없음) → 처리(브라우저가 막음) 실패. 그림에 "단순 요청 기준"을 쓰고, Authorization 헤더 등을 쓰면 OPTIONS 사전 요청이 먼저 간다는 내용은 x로 보충([MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)) |
| tip | Logging | `term` 서버 로그 세 줄(시각·요청·결과, 예시) |
| tip | Error Handling | `vs`: 처리 없음(하얀 화면) vs 처리함("잠시 뒤 다시 시도해 주세요") |
| tip | try-catch | `ide`: try 안에서 실패 → catch에서 메시지 남김 |
| tip | Idempotent ▶ | "다시 보내기" 3번: POST는 글 3개, PUT은 1개 그대로 |
| tip | Background Job | `seq` 브라우저·서버·워커: 요청 → 202 접수됨 바로 응답 → 워커가 메일 보내기 |
| tip | Mock Data | `pair`: 가짜 JSON → 화면 미리보기 "가짜 데이터" 이름표 |
| tip | Pagination API | `httpmsg` 요청 `GET /posts?page=2&limit=10` |
| tip | Health Check | `httpmsg` 응답 `200 OK`, 본문 `{"status":"ok"}` |

공통 규칙(DESIGN.md):
- 그림 글자는 11px 이상이다.
- 그림 속 숫자·키 값은 예시로 표시한다. 실제 키처럼 보이는 값은 쓰지 않는다(`sk_test_…`처럼 줄임표).
- 코드가 들어가는 `pair` 왼쪽 칸(API·ORM·Environment Variable·GraphQL·JSON·Mock Data 등)은 front처럼 `fcss`([index.html:7261](../../../index.html))로 쓴다. 190px에 안 들어가면 `vs`나 세로 쌓기로 바꾼다.
- 보안 습관: 토큰을 localStorage에 두는 모습을 그리지 않는다(Cookie vs Token은 HttpOnly 쿠키 쪽을 권장으로 그림), 키를 보내는 쪽은 "내 서버"로 표시한다, Error Response 본문에 스택 추적·내부 경로를 넣지 않는다.
- 회사 로고·브랜드 이름을 쓰지 않는다("로그인 서비스", "결제 서비스").
- 320/375/1280 세 폭에서 넘침이 없어야 한다.
- 상태를 색만으로 구분하지 않는다.
- 읽히는 글에 화살표·체크 기호를 쓰지 않는다(`wsym`·`symcss` 점검과 같은 규칙).

### 3.4 새 카드 그림

새 46장은 기존 도우미(`pair`·`vs`·`track`·`doc`·`browser`·`ide`·`term`·`devtools`·`net`)와 `seq`·`httpmsg`로 그린다. 카드마다 초보자에게 가장 잘 보이는 도구를 고르고, 도우미가 못 그리는 장면만 전용 HTML로 그린다. 하위항목별 기본 도구는 다음과 같다. 카드별 배정은 계획서에서 정한다.
- arch: `seq`(요청이 층을 차례로 지나감), `ide`(라우트·컨트롤러 코드), `vs`
- data: `httpmsg`, `ide` 오류 줄(Schema Validation), `doc` 표, `devtools` 네트워크 탭
- job: `seq`, `track`(시간 간격·대기열), `term`(서버 로그)
- auth: `httpmsg`(Authorization 헤더), `seq`(OAuth·리다이렉트 흐름), `browser`(동의 화면)
- api 보충: `httpmsg` 응답

### 3.5 직접 조작 4장

- Rate Limit: "요청 보내기" 버튼. 정한 시간(예시 10초) 안에 정한 횟수(예시 4번)를 넘기면 다음부터 `429 Too Many Requests`와 "잠시 뒤 다시"가 뜬다. "시간 지나기" 버튼으로 횟수를 비운다(실제 타이머를 쓰지 않아 reduced-motion·점검과 맞음).
- Idempotent: POST·PUT 중 하나를 고르고 "다시 보내기"를 누른다. POST는 누를 때마다 글이 하나씩 늘고, PUT은 1개 그대로다. "처음으로" 버튼으로 되돌린다.
- Cache: "요청 보내기"를 누르면 첫 번째는 "DB까지 다녀옴 · 느림(예시 300ms)", 그다음은 "캐시에 있음 · 빠름(예시 5ms)"이다. "캐시 비우기"를 누르면 다시 느린 길로 간다.
- Authorization: 역할(일반 회원·관리자)을 고르고 "글 삭제" 요청을 보낸다. 일반 회원은 `403 Forbidden`, 관리자는 `200 OK`다. 결과 문장에 "로그인은 됐지만 권한이 없어요"처럼 Authentication과의 차이를 쓴다.

공통: front와 같이 `init`·`aria-pressed`·`aria-live`·`psay`를 쓰고, init 안에서 window·document를 쓰지 않는다. 키보드로 모두 조작할 수 있다.

## 4. 데이터와 배치

- `CAT('back', …)`([index.html:1716](../../../index.html))의 추가 하위항목 배열에서 `api` 뒤에 다음 넷을 넣는다. 공통 `tip`은 마지막에 그대로 둔다. 기존 카드 번호는 바뀌지 않고 tip 카드 번호만 뒤로 밀린다(front와 같음).
  - `['arch','서버 구조','요청이 서버 안에서 어떤 층을 지나는지']`
  - `['data','데이터 주고받기','요청과 응답에 담기는 데이터의 모양과 약속']`
  - `['job','작업 처리','오래 걸리거나 동시에 일어나는 일을 다루는 법']`
  - `['auth','인증 더 보기','토큰과 권한으로 누가 무엇을 할 수 있는지 정하는 말']`
- 카드 형식 `{en,ko,d,x,p,r,l,o,u,v}`는 그대로다. o:1은 1차 출처가 있을 때만 쓰고, 그때 u를 단다.
- r은 이미 있는 같은 뜻·짝 카드에만 단다. 후보:
  - Node.js↔Runtime·Server, Backend Framework↔Framework·Route Handler, Route Handler↔Endpoint, Controller↔Route Handler·Service Layer, Service Layer↔Controller·Repository Pattern, Repository Pattern↔ORM·Database, MVC↔Separation of Concerns·Controller, Stateless vs Stateful↔Session·JWT, API Gateway↔Microservices·Reverse Proxy, BFF↔API Gateway, BaaS↔Supabase·Serverless
  - Payload↔Request Body, Content-Type↔Request Header·JSON, Serialization↔JSON, DTO↔Validation·Schema Validation, Error Response↔HTTP Status Code·Error Handling, Schema Validation↔Validation, Multipart Form Data↔File Upload·Content-Type, UUID↔Primary Key, Cursor vs Offset Pagination↔Pagination API, API Versioning↔Semantic Versioning, OpenAPI↔API Documentation, Request ID↔Logging
  - Worker↔Background Job·Queue, Pub/Sub↔Queue·Event-driven Architecture, Event-driven Architecture↔Webhook·Pub/Sub, Concurrency↔Race Condition·Lock, Lock↔Concurrency·Transaction, Batch Processing↔Cron Job, Dead Letter Queue↔Queue·Retry, Exponential Backoff↔Retry·Rate Limit, Server-Sent Events↔WebSocket·Polling, Long Polling↔Polling, Streaming Response↔Response, Circuit Breaker↔Timeout·Retry
  - Access Token↔JWT·Refresh Token, Bearer Token↔Access Token·Request Header, OAuth Scope↔OAuth·Principle of Least Privilege, RBAC↔Authorization·Permission, Cookie vs Token↔Cookie·Session·JWT, Session Store↔Session·Redis, Redirect URI↔OAuth, Webhook Signature↔Webhook·Secret, Service Account↔API Key
  - Response Header↔Request Header, Response Body↔Request Body·Response
- 뜻이 다른 짝은 r 없이 x 안에서만 구분한다(`BK_WRONG` 점검):
  - Access Token·Bearer Token vs ai의 Token(AI 글 단위)
  - Streaming Response vs ai의 Streaming(AI 답 방식). terminal Streaming Output은 r 후보가 아니다
  - OAuth Scope vs ai의 Scope(작업 범위)
  - Event-driven Architecture vs basics의 Event(화면에서 일어나는 일)
  - Worker vs front·perf의 Service Worker·Web Worker(브라우저 안 일꾼)
  - Lock vs deploy의 Lock File·security의 Account Lockout
  - Route Handler vs web의 Routing(화면 주소에 맞는 화면을 고르는 라우터)
- 점검 기대값:
  - `COUNT`에 `back/*` 10개(아래 5장 개수)
  - `EXPECT`에 새 카드 영문명
  - `REDRAWN`에 back 하위항목 10개, 새 점검 `bkobj`로 back 카드의 객체 v 0장을 따로 막는다(front `fobj`와 같은 방식. basics가 `bobj`를 써서 `bk` 접두사)
  - 새 점검 `bkukey`: back 97장의 v가 `u-back-`로 시작하고 `D`에 있다(마칠 때 예외 없음. 진행 중에는 남은 옛 카드 목록 `BK_TODO`가 줄어 비워진다)
  - 새 점검 `bcat`: back 하위항목 순서가 `basic,core,motion,adv,api,arch,data,job,auth,tip`이다

## 5. 용어 목록 (새 46장)

`▶`는 직접 조작이다. 측정: 아래 영문명은 기존 카드 1,483장과 정규화 이름(`norm`, 소문자·공백·`/`·`-`·`.` 제거)으로 같지 않다(2026-11-03 대조). `Scope`는 ai/core 카드([index.html:3456](../../../index.html))와 같아 `OAuth Scope`로 바꿨다.

| 하위항목 | 새 카드 |
|---|---|
| api (2) | Response Header, Response Body |
| arch (11) | Node.js, Backend Framework, Route Handler, Controller, Service Layer, Repository Pattern, MVC, Stateless vs Stateful, API Gateway, BFF, BaaS |
| data (12) | Payload, Content-Type, Serialization, DTO, Error Response, Schema Validation, Multipart Form Data, UUID, Cursor vs Offset Pagination, API Versioning, OpenAPI, Request ID |
| job (12) | Worker, Pub/Sub, Event-driven Architecture, Concurrency, Lock, Batch Processing, Dead Letter Queue, Exponential Backoff, Server-Sent Events, Long Polling, Streaming Response, Circuit Breaker |
| auth (9) | Access Token, Bearer Token, OAuth Scope, RBAC, Cookie vs Token, Session Store, Redirect URI, Webhook Signature, Service Account |

하위항목별 개수: basic 8, core 12, motion 7, adv 8, api 10, arch 11, data 12, job 12, auth 9, tip 8.

x로 구분할 짝(뜻이 가까움):
- Server vs Backend(basics) vs Node.js
- Request Header vs Request Body, Response Header vs Response Body, Payload vs Request Body
- Authentication vs Authorization(401·403), RBAC vs OAuth Scope, OAuth vs OpenID Connect(OAuth는 권한 위임 틀이고 로그인 정보는 OIDC가 더한다)
- 기존 비슷한 카드(측정): Optimistic Update vs Optimistic UI(design), Request Flow vs Request-Response Cycle(server), Mock Data vs Mock(test), Logging vs Server Log(server), Cache vs Browser Cache(perf), Serverless Function vs Serverless(server)
- Session vs JWT vs Cookie vs Token, Access Token vs Refresh Token(security) vs Bearer Token
- Route Handler vs Controller vs Service Layer vs Repository Pattern, MVC vs Separation of Concerns(basics)
- Middleware vs API Gateway vs BFF vs Reverse Proxy(server)
- Monolith vs Microservices, Serverless Function vs BaaS
- Validation vs Schema Validation vs Form Validation(front), DTO vs Schema Validation
- Serialization vs JSON, Content-Type vs Multipart Form Data
- UUID vs Primary Key(db), Request ID vs Logging
- Pagination API vs Cursor vs Offset Pagination, Query Parameter vs Path Parameter
- API Versioning vs Semantic Versioning(basics), OpenAPI vs API Documentation
- Polling vs Long Polling vs Server-Sent Events vs WebSocket
- Streaming Response vs Response
- Queue vs Pub/Sub vs Event-driven Architecture vs Webhook
- Worker vs Background Job, Batch Processing vs Cron Job(server)
- Retry vs Exponential Backoff vs Circuit Breaker vs Timeout, Dead Letter Queue vs Retry
- Concurrency vs Race Condition(bug) vs Lock, Lock vs Transaction(db)
- Idempotent vs POST·PUT(HTTP Method)
- Webhook Signature vs API Key, Service Account vs API Key
- Redirect URI vs Redirect(server)

## 6. 증상 색인 (12개)

기존 181개와 대조했다. 이미 있어 뺀 것: "두 번 눌러서 두 번 저장돼요", "CORS 에러가 나요", "로그인이 자꾸 풀려요", "가끔만 요청이 실패해요", "같은 요청이 끝없이 반복돼요", "내 컴퓨터에선 되는데 서버에선 안 돼요", "업로드만 유난히 느려요". 계획서에서 문구를 다시 대조한다. "외부 API가 멈추면 우리 서버도 멈춰요"는 기존 "외부 API가 멈추면 테스트도 실패해요"와 비슷하지만 대상(운영 서버)과 연결 카드가 달라 넣는다.
- "오류·안 됨" 그룹은 지금 79/181개다(측정). 이번에 10개를 더하면 89/193개가 된다. 칩 재검토(③ 마지막) 메모인 PLAN.md 57줄에 이 수치를 남긴다.

| 증상 | 그룹 | 연결 카드 |
|---|---|---|
| 429가 떠요 | 오류·안 됨 | 429 Too Many Requests, Rate Limit, Exponential Backoff |
| 로그인했는데 401이 떠요 | 오류·안 됨 | 401 Unauthorized, Bearer Token, Access Token, Token Expiry |
| 로그인은 되는데 403이 떠요 | 오류·안 됨 | 403 Forbidden, Authorization, RBAC, OAuth Scope |
| 서버가 보낸 데이터를 못 읽어요 | 오류·안 됨 | Content-Type, Serialization |
| 웹훅이 같은 알림을 여러 번 보내요 | 오류·안 됨 | Webhook, Idempotent, Webhook Signature |
| 업로드한 파일이 서버에서 비어 있어요 | 오류·안 됨 | Multipart Form Data |
| 로그인 뒤 redirect_uri 오류가 나요 | 오류·안 됨 | Redirect URI, OAuth |
| 외부 API가 멈추면 우리 서버도 멈춰요 | 느림 | Circuit Breaker, Timeout |
| 오래 걸리는 작업 때문에 응답이 늦어요 | 느림 | Background Job, Worker, Queue |
| 동시에 사면 재고가 마이너스가 돼요 | 오류·안 됨 | Concurrency, Lock |
| 다음 페이지에 같은 글이 또 나와요 | 오류·안 됨 | Cursor vs Offset Pagination |
| 오류가 난 요청을 로그에서 못 찾겠어요 | 오류·안 됨 | Request ID, Logging |

## 7. 진행 순서

범위가 front와 비슷하다(새 46장, 다시 그리기 51장, 도우미 2개). 계획서를 둘로 나눈다. 두 계획서 모두 이 브랜치(`back-category`)에서 이어서 하고, main 병합은 둘이 끝난 뒤 사용자 확인을 받고 한 번 한다.

계획서 ①(도우미·구조·데이터·다시 그리기):
1. `seq()`·`httpmsg()`와 입력 검사 점검
2. 하위항목 4개, 점검 기대값(`bkcat`·`bkobj`·`bkukey`·`BK_WRONG`. 옛 카드는 남은 목록으로, 그 밖에 안 끝난 항목은 `LATER`)
3. arch·data 새 카드 23장
4. 기존 51장 다시 그리기(직접 조작 4장은 정적 그림으로 먼저 두고 ②에서 바꿈)

계획서 ②(작업·인증·나머지):
1. job·auth·api 새 카드 23장
2. 기존 47장 x 채움
3. 직접 조작 Rate Limit·Idempotent·Cache·Authorization
4. 증상 색인
5. 글꼴·문서(PRODUCT/PLAN/DESIGN)·전체 점검, `LATER` 비우기

디렉터 검토:
1. 이 설계서
2. 계획서 ①·②
3. 구현 묶음: 도우미 / 카드 / 그림·문구마다, 마지막에 최종 검토

Critical·Important·Minor 모두 고친다(사용자 지시: 미룬 것도 다 고치고 똑같이 검토).

## 8. 점검과 완료 기준

자동 점검:
- `node tests/check.mjs`가 전부 통과하고 `LATER`가 비어 있다(계획서 ② 끝).
- 개수
  - 전체 카드 1,529개(1,483 + 46, `total`)
  - 증상 193개(181 + 12, `symcount`와 새 증상 목록 `SYM_BACK` 점검)
  - 다른 카테고리 개수는 그대로다.
  - 영문명 중복이 없고(정규화 비교 포함), 관련 용어·증상 대상이 모두 있다.
- PRODUCT.md 개수 표기가 실제와 같다.
- 직접 조작 4장: `init`이 있고, 결과 문장에 `aria-live`가 있고, 문장 갱신은 `psay`로 한다.
- 재생 버튼이 붙는 새 그림(`m:1`)에 움직이는 요소(`A` 클래스)가 있다.
- back 카드의 객체 v가 0장이다(`bkobj`). 97장 모두 `u-back-` 키를 쓴다(`bkukey`). 하위항목 순서가 맞다(`bkcat`).
- 뜻이 다른 짝(4장 목록)에는 r이 없다(`BK_WRONG`).
- 백엔드 카테고리 모든 카드에 x가 있다. o:1이면 u가 있다.
- `seq()`·`httpmsg()`가 한도를 넘거나 잘못된 입력을 받으면 오류를 던진다(새 점검).
- 읽히는 글의 기호 점검(`wsym`)을 back 카드 전체에 적용한다.

브라우저(playwright) 확인:
- 320/375/1280 세 폭과 reduced-motion에서 넘침 0, 11px 미만 글자 0, 콘솔 오류 0
- reduced-motion에서 자동 재생이 없고, 재생 버튼이 동작한다.
- 직접 조작 4장을 키보드로 조작할 수 있다.

그 밖:
- 디자인 품질: break-ui(`seq()` 세로줄 4개·메시지 8개·14자, `httpmsg()` 30자·헤더 4줄·본문 4줄)로 보고, better-ui·better-layout으로 그림을 다듬는다.
- 문구: x·d는 better-writing·ux-writing 기준(짧고, 차이 먼저, 해요체)으로 쓴다.
- 직접 조작은 better-accessibility로 키보드·읽기 순서를 본다.
- 정의·설명의 사실은 Task마다 검색(MDN HTTP 문서, RFC 9110·6749·6750, OpenAPI·Node.js 공식 문서)으로 확인하고 출처를 원장에 남긴다.

## 9. 글꼴

새 문구에 Hahmlet 서브셋에 없는 글자가 있으면 font 점검이 실패한다. 주석에 쓴 글자도 포함된다.
- 문구를 모두 넣은 뒤(계획서 ② 5단계) 서브셋을 다시 만든다.
- 중간 Task에서는 없는 글자를 피하거나, 그 Task 안에서 서브셋을 갱신한다.

## 10. 위험

| 위험 | 대응 |
|---|---|
| 작업량이 커서 컨텍스트가 압축됨 | 계획서 둘로 나눔, 원장(`.superpowers/sdd/…/progress.md`), 체크포인트 메모리, Task마다 커밋 |
| `seq()` 세로줄 4개가 320px에 안 들어감 | 계획서 첫 Task에서 break-ui로 재고, 안 되면 세로줄 3개·글 12자로 한도를 낮춤 |
| 인증·토큰 설명이 security 카테고리와 겹치거나 어긋남 | 제외 목록(2장)을 지키고, Refresh Token·Token Expiry 등은 r로만 잇고 그 카드 본문은 바꾸지 않음 |
| 보안상 틀린 습관을 그림이 보여 줌(키를 화면 코드에 둠 등) | 키·토큰 값은 줄임표 예시, API Key 그림에 "화면 코드에 두지 않아요"를 씀. 디렉터 검토에서 따로 확인 |
| 프레임워크·도구 설명이 버전에 따라 바뀜 | 버전 숫자와 "가장 빠른·최신" 같은 단정을 쓰지 않고, 오래 바뀌지 않는 역할만 쓴다. Backend Framework는 특정 이름을 예로만 든다 |
| HTTP 상태 번호·헤더 이름이 실제와 다름 | RFC 9110·MDN으로 확인. 풀어 쓴 말은 "(풀어 쓴 말)" 표시 |
| 같은 뜻 카드가 다른 이름으로 또 생김 | `dup` 정규화 비교, 계획서마다 다른 카테고리 d와 대조 |
| 기존 r 연결이 다른 카테고리 카드를 가리킴 | r 값만 추가하고 그 카드 본문은 바꾸지 않음 |
