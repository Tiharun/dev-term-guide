# 백엔드 카테고리 보강 실행 계획 ②

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 계획서 ①(도우미·arch·data·다시 그리기, 끝남)에 이어 백엔드를 마친다.
- job·auth·api 새 카드 23장
- 기존 47장 x
- 직접 조작 4장(Rate Limit·Idempotent·Cache·Authorization)
- 증상 12개
- 글꼴·문서·전체 점검. 끝나면 `LATER`가 비어 있다.

**Architecture:** `index.html` 하나에서 작업한다.
- 카드:
  - api 2장은 `T('back','api',[…])`(2735줄) 끝에 붙인다.
  - `T('back','job',…)`·`T('back','auth',…)`는 `T('back','data',…)` 뒤, `T('back','tip',…)`(2772줄) 앞에 둔다.
- 그림: `/* back: job·auth·api … */` 주석과 `Object.assign(D, {...})`를 `/* back: 다시 그리기 basic·core·motion` 앞에 둔다.
- 직접 조작: 이미 있는 상태 함수(`brate`·`bauthz`·`bcache`·`bidem`, 7645~7680줄)를 그대로 쓴다. 그림 4장의 `h`를 바꾸고 `init`을 더한다.
- 증상: `SYM('오류·안 됨',[…])`(3712줄)과 `SYM('느림',[…])`(3694줄) 끝에 붙인다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, Python fontTools(`font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-03-back-category-design.md](../specs/2026-11-03-back-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치·원장**: `back-category`에서 계속한다. 원장은 이 계획서의 작업 폴더(`sdd-workspace`가 알려 줌)에 새로 만든다. 계획서 ① 원장(`…/2026-11-03-back-category-1/progress.md`)의 `Ruling:` 줄은 읽기만 한다.
- **Rate Limit 숫자**: 스펙 3.5는 "10초 4번"이다. 검토 C에서 카드 `p`("1분에 5번")와 맞춰 `BRL = {max: 5, win: '1분'}`으로 바꿨다(계획서 ① 원장 Ruling). 이 숫자를 그대로 쓴다.
- **aria-pressed**: 고르는 버튼(Idempotent의 POST·PUT, Authorization의 역할)에만 `tpick`으로 단다. 한 번 누르는 버튼("요청 보내기"·"시간 지나기"·"다시 보내기"·"처음으로"·"캐시 비우기"·"글 삭제")은 켜고 끄는 상태가 없다. 그래서 `aria-pressed` 없이 `<button type="button" class="mk-tkey">`로 쓴다. Rate Limit·Cache에는 고르는 버튼이 없으니 `aria-pressed`가 없다. 스펙 3.5의 "aria-pressed"는 고르는 버튼에만 쓴다고 본다.
- **점검 이름**: front는 `FDM`·`fdm`을 쓴다. back은 `BKDM`·`bkdm`이다. `SYM_FRONT` 옆에는 `SYM_BACK`을 둔다.
- **seq 한도**(계획서 ① Ruling, 도우미 검사가 막음):
  - 세로줄 이름: 3개 이하면 wlen 8, 4개면 6
  - 메시지: wlen 14(한글은 2로 셈)
  - 이 계획에서 새로 쓰는 세로줄 이름: `큐`·`워커`·`채널`·`메일`·`재고`·`손님 A`·`손님 B`·`서버 1`·`서버 2`
  - 표에 없는 이름이 필요하면 한도 안에서 정하고 원장에 `Ruling:`으로 적는다.
- **httpmsg 줄**: wlen 30 이하다(검사가 막음). 헤더 4줄, 본문 4줄까지다.
- **글꼴**: 새 글자가 서브셋에 없으면 Task 1~4에서 `LATER font` 줄이 나올 수 있다. Task 5에서 서브셋을 다시 만들고 `LATER`를 비운다.
  - 측정: 지금 `LATER = ['font', 'doccount']`이다. 실제로 줄이 나오는 것은 doccount(1483≠1506)뿐이다.

## Global Constraints

계획서 ①의 Global Constraints를 그대로 따른다([2026-11-03-back-category-1.md](2026-11-03-back-category-1.md) 44~67줄). 그중 이 계획에서 자주 걸리는 것:
- 색은 도판 토큰만 쓰고, 그림 글자는 11px 이상이다.
- `m:1` ⇔ 그림 h에 `A`가 있다. still이 아닌 `seq`·`track`·`doc`·`ide`·`term`이 `A`를 만든다. 직접 조작 그림은 `m`이 없다.
- 읽히는 글에 `✓✕★→←↑↓`를 쓰지 않는다. 숫자·키 값에는 "(예시)"를 붙이고, 키는 줄임표로 쓴다(`eyJ…`·`sid=…`·`whsec_…`). 브랜드 이름은 쓰지 않는다.
- 카드 문구:
  - 새 카드 `d`·`x`는 해요체다. `x`는 2~3문장이고, 짝과의 차이를 먼저 쓴다.
  - `p`는 정식 용어를 넣고 "~해줘"로 끝낸다. `l`은 1~3이다. `ko`는 `한글 · 풀이` 형식이다.
- `r`은 1~3개이고, 스펙 4장 후보 중 이미 있는 카드만 단다. `BK_WRONG` 짝은 r에 넣지 않는다. 다른 카테고리 카드 본문은 바꾸지 않는다.
- `o:1`은 1차 출처를 직접 열어 확인했을 때만 쓰고, 그때 `u`를 단다.
- 커밋:
  - 한국어 `feat:`/`fix:`/`docs:`로 쓰고 attribution 줄을 넣지 않는다.
  - `.impeccable/hook.cache.json`·`core375.png`는 올리지 않고, 경로를 지정해 올린다.
- Python은 `newline='\n'`로 쓰고 `python -E`로 돌린다.
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필은 쓰지 않는다.

## Review Focus

1. **직접 조작 키보드**: Tab으로 모든 버튼에 가고 Enter·Space로 누를 수 있어야 한다.
   - 결과 문장(`aria-live="polite"`)이 바뀌어야 한다.
   - 고르는 버튼의 `aria-pressed`가 하나만 `true`여야 한다.
   - 여러 번 눌러도(Rate Limit 20번, Idempotent POST 20번) 그림판 밖으로 넘치지 않아야 한다(행은 6줄까지).
   - → Task 3 브라우저 확인
2. **되돌리기 뒤 상태**: "시간 지나기" 뒤 첫 요청은 통과해야 한다. "캐시 비우기" 뒤 첫 요청은 느린 길(DB)로 가야 한다. POST↔PUT을 바꾸면 횟수가 0이 된다. "처음으로"는 0으로 되돌린다. → Task 3 `bkdmrun`
3. **401과 403, 인증과 인가**:
   - 증상 "로그인했는데 401"은 토큰 없음·만료(Bearer·Access Token·Token Expiry)로 잇는다.
   - "로그인은 되는데 403"은 권한(RBAC·OAuth Scope)으로 잇는다.
   - Authorization 결과 문장에 "로그인은 됐지만 권한이 없어요"가 있다.
   - → Task 3 `bkdmrun`, Task 4 `ref`(증상 연결 대상이 있는지 보는 기존 점검, check.mjs:139)
4. **뜻이 다른 짝**: 다음 카드의 x는 다른 뜻을 구분하고, r에는 그 짝을 넣지 않는다(`bkwrong`).
   - Worker vs Service Worker·Web Worker
   - Streaming Response vs ai Streaming
   - Access·Bearer Token vs ai Token
   - OAuth Scope vs ai Scope
   - Lock vs Lock File·Account Lockout
   - Event-driven vs basics Event
   - → Task 1 `bkwrong`·디렉터 검토 D
5. **보안 습관**:
   - 토큰을 localStorage에 두는 모습이 없어야 한다.
   - 웹훅 서명·Redirect URI 그림이 "확인하지 않고 처리"를 보여 주지 않아야 한다.
   - 키·토큰 값은 줄임표여야 한다.
   - → Task 1 `bksafe`·디렉터 검토 D

---

## 공통 절차 (Task 1)

계획서 ①의 공통 절차·브라우저 확인 절차를 따른다(86~108줄). 다른 점:
- **서버**: 이미 떠 있는 `scratchpad/web`의 8765 서버(작업 bilyacma1)를 쓴다. 매번 `index.html`을 복사해 넣는다(`cp index.html "$SP/web/index.html"`).
  - 주소: `http://localhost:8765/?v=<시각>#/c/back/<sec>`
  - 서버가 없으면 `$SP/web`에서 `python -E -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다.
- **그림 띄우기**: 그림은 스크롤해야 그려진다. `page.mouse.wheel(0, 700)`을 30번 하고 잰다.
- **폭·움직임**: 1280/375/320 × reducedMotion `no-preference`/`reduce`. 넘침·11px 미만·가로 스크롤·콘솔 오류(favicon 404 제외)가 0이어야 한다.
- **긴 점검**: `node tests/check.mjs > <작업 폴더>/run.txt 2>&1` 뒤 `grep -E '^(FAIL|OK|LATER)'`로 본다. Bash timeout은 200000이다.

### 디렉터 검토 시점

디렉터 에이전트(Opus 5.5, effort high)에게 맡긴다.
- **묶음 D — 새 카드**: Task 1 뒤
- **묶음 E — x·직접 조작**: Task 3 뒤(Task 2~3 diff)
- **최종 검토**: Task 5 뒤 브랜치 전체(`git merge-base main HEAD`..HEAD). 계획서 ①·② Review Focus를 같이 준다.

결과 처리:
- Critical·Important·Minor를 모두 고친다(사용자 지시). 고칠 것은 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN).
- 고친 뒤 같은 디렉터에게 재확인을 맡기고, 0건이 될 때까지 되풀이한다.
- 원장에 `Review <묶음>: fixed …`로 적는다. 고치지 않는 지적은 `Ruling:`에 이유를 적는다.

---

### Task 1: job·auth·api 새 카드 23장 (공통 절차)

쓸 스킬: design-skills:ux-writing·interfaces:better-writing(d·x), superpowers:test-driven-development

**Files:**
- Modify: `index.html`
  - 카드: api 블록 끝, 그리고 새 블록 `T('back','job',…)`·`T('back','auth',…)`
  - 그림: `/* back: job·auth·api … */` 묶음
- Modify: `tests/check.mjs`: EXPECT·COUNT·total

**Interfaces:**
- Consumes: `seq`·`httpmsg`·`track`·`doc`·`vs`·`browser`·`bkStack`·`bkRows`·`bkPills`·`whelp`(계획서 ①)
- Produces: 카드 23장. Task 4 증상이 연결 대상으로 쓴다(Exponential Backoff·Bearer Token·Access Token·RBAC·OAuth Scope·Webhook Signature·Redirect URI·Circuit Breaker·Worker·Concurrency·Lock).

- [ ] **Step 1: 실패하는 점검**
  - `EXPECT['back/job']`·`EXPECT['back/auth']`: 아래 표 순서
  - `EXPECT['back/api']`: `['Response Header', 'Response Body']`
  - `COUNT`: `back/api` 8→10, `back/job` 0→12, `back/auth` 0→9
  - `total`: 1506→1529
- [ ] **Step 2: 실패 확인**: 다음 `FAIL`이 나온다.
  - `expect:back/job`·`expect:back/auth`·`expect:back/api`
  - `count:back/api: 8 ≠ 10`·`count:back/job: 0 ≠ 12`·`count:back/auth: 0 ≠ 9`
  - `total`
- [ ] **Step 3~5**: 공통 절차 3~5
  - 모든 새 카드에 `x`와 `v:'u-back-<slug>'`를 넣는다. slug는 `Pub/Sub`→`pub-sub`, `Cookie vs Token`→`cookie-vs-token` 식이다.
  - 통과하면 `FAIL` 없이 `OK`가 나온다. `LATER`에는 doccount(1529)와 font만 남을 수 있다.
- [ ] **Step 6: 브라우저 확인**: `#/c/back/api`·`#/c/back/job`·`#/c/back/auth` × 3폭 × 2움직임
- [ ] **Step 7: 커밋**: `feat: 백엔드 작업 처리·인증 더 보기 새 카드`

**카드와 그림**(`{0→1 '…'}`는 `{from:0, to:1, t:'…'}`를 줄여 쓴 것이다. 숫자·이름은 예시):

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| api | Response Header | 응답 헤더 · 응답에 붙는 부가 정보 | `httpmsg({kind:'응답', start:'200 OK', head:['Content-Type: application/json','Cache-Control: max-age=60','Set-Cookie: sid=…; HttpOnly'], body:['{"id":7}'], hl:['h0','h1','h2']})`. cap "본문 형식·캐시 시간·쿠키 저장을 알려 줘요(값은 예시)" | Request Header |
| api | Response Body | 응답 본문 · 돌려받는 실제 내용 | `httpmsg({kind:'응답', start:'200 OK', head:['Content-Type: application/json'], body:['{','  "id": 7,','  "title": "첫 글"','}'], hl:['b1','b2']})` | Request Body, Response |
| job | Worker | 워커 · 뒤에서 일을 하는 프로그램 | `seq(['큐','워커','DB'], [{0→1 '일감 1개 전달'}, {1→1 '이메일 보내기'}, {1→2 '보냄 기록'}, {0→1 '다음 일감'}])`. cap "웹 서버와 따로 돌며 큐의 일을 하나씩 해요" | Background Job, Queue |
| job | Pub/Sub | 발행·구독 · 한 번 보내면 구독자가 모두 받음 | `seq(['주문','채널','메일','재고'], [{0→1 '주문됨 발행'}, {1→2 '주문됨'}, {1→3 '주문됨'}, {2→2 '확인 메일'}, {3→3 '재고 빼기'}])`. cap "보내는 쪽은 누가 받는지 몰라도 돼요" | Queue, Event-driven Architecture |
| job | Event-driven Architecture | 이벤트 기반 구조 · 일어난 일을 알려서 잇기 | `vs('직접 부르기', doc([{ul:['주문이 결제를 부름','주문이 메일을 부름','주문이 재고를 부름']}], {title:'주문 코드', still:true}), '이벤트로 알림', doc([{ul:['"주문됨" 알림 1번','받는 곳이 알아서 처리']}], {title:'주문 코드', still:true}))`. cap "새 기능을 더해도 주문 코드는 그대로예요" | Webhook, Pub/Sub |
| job | Concurrency | 동시성 · 여러 일이 겹쳐 일어남 | `seq(['손님 A','서버','손님 B'], [{0→1 '책 1권 주문'}, {2→1 '책 1권 주문'}, {1→1 'A 확인: 재고 1'}, {1→1 'B 확인: 재고 1'}, {1→0 '주문 완료'}, {1→2 '주문 완료'}, {1→1 '재고 -1이 됨', err:1}])`. cap "둘이 동시에 재고 1을 보고 둘 다 팔았어요" | Race Condition, Lock |
| job | Lock | 잠금 · 한 번에 하나만 고치게 막기 | `seq(['손님 A','재고','손님 B'], [{0→1 '잠금 얻음'}, {2→1 '잠금 요청', wait:1}, {0→1 '1권 빼고 풀기'}, {1→2 'B 차례예요'}, {1→2 '재고 0, 품절', err:1}])`. cap "B는 A가 끝날 때까지 기다려요" | Concurrency, Transaction |
| job | Batch Processing | 일괄 처리 · 모아서 한 번에 처리 | `track([{t:'하루 동안 모음', s:'done', w:'주문 1,240건(예시)'}, {t:'새벽 2시 시작', s:'done', w:'한 번에 계산'}, {t:'정산 끝', s:'done', w:'보고서 1개'}])` | Cron Job |
| job | Dead Letter Queue | 실패 보관함 · 계속 실패한 일감을 따로 둠 | `track([{t:'1번째 시도', s:'fail', w:'메일 서버 응답 없음'}, {t:'2번째 시도', s:'fail'}, {t:'3번째 시도', s:'fail'}, {t:'보관함으로', s:'wait', w:'사람이 나중에 확인'}])` | Queue, Retry |
| job | Exponential Backoff | 지수 백오프 · 점점 길게 기다렸다 다시 | `track([{t:'실패', s:'fail'}, {t:'1초 뒤 다시', s:'fail'}, {t:'2초 뒤 다시', s:'fail'}, {t:'4초 뒤 다시', s:'done', w:'성공'}])`. cap "기다리는 시간이 두 배씩 늘어요(예시 숫자)" | Retry, Rate Limit |
| job | Server-Sent Events | 서버 보낸 이벤트 · 서버가 한쪽으로 계속 보냄 | `seq(['브라우저','서버'], [{0→1 '연결 열기'}, {1→0 '새 댓글 1'}, {1→0 '새 댓글 2'}, {1→0 '새 댓글 3'}])`. cap "연결 하나로 서버만 보내요. 응답 형식은 text/event-stream이에요" | WebSocket, Polling |
| job | Long Polling | 롱 폴링 · 새 소식이 올 때까지 기다리는 요청 | `seq(['브라우저','서버'], [{0→1 '새 소식 있나요'}, {1→1 '소식 올 때까지', wait:1}, {1→0 '새 댓글'}, {0→1 '바로 다시 물음'}])` | Polling |
| job | Streaming Response | 스트리밍 응답 · 다 만들기 전에 조금씩 보냄 | `vs('한 번에 보냄', doc([{ul:['다 만들 때까지 기다림','전체가 한 번에 옴']}], {title:'응답', still:true}), '스트리밍', doc([{ul:['1쪽 조각 먼저 옴','2쪽 조각','마지막 조각']}], {title:'응답', still:true}))`. cap "받은 만큼 먼저 보여 줄 수 있어요" | Response |
| job | Circuit Breaker | 회로 차단기 · 고장 난 곳을 잠시 부르지 않음 | `track([{t:'닫힘', s:'done', w:'평소처럼 부름'}, {t:'실패가 쌓임', s:'fail', w:'5번 연속(예시)'}, {t:'열림', s:'wait', w:'잠시 바로 실패'}, {t:'반쯤 열림', s:'now', w:'잠시 뒤 몇 번 시험'}, {t:'다시 닫힘', s:'done', w:'회복 확인'}])` | Timeout, Retry |
| auth | Access Token | 액세스 토큰 · API를 쓰는 출입증 | `track([{t:'로그인', s:'done'}, {t:'토큰 받음', s:'done', w:'15분짜리(예시)'}, {t:'요청에 붙임', s:'done', w:'Authorization 헤더'}, {t:'만료', s:'fail', w:'401이 와요'}, {t:'새로 받기', s:'done', w:'Refresh Token으로'}])` | JWT, Refresh Token |
| auth | Bearer Token | 베어러 토큰 · 가진 사람이면 쓸 수 있는 토큰 | `httpmsg({kind:'요청', start:'GET /api/me', head:['Host: example.com','Authorization: Bearer eyJ…'], hl:['h1']})`. cap "Bearer 뒤에 한 칸 띄우고 토큰을 써요" | Access Token, Request Header |
| auth | OAuth Scope | OAuth 범위 · 토큰으로 할 수 있는 일 | `bkStack(browser('<b>예시 앱의 요청</b>' + whelp('프로필 보기, 일정 읽기'), {url:'login.example.com/authorize'}), doc([{tb:[['scope','허락하는 일'],['profile','프로필 보기'],['calendar.read','일정 읽기만']]}], {title:'요청한 scope', still:true}))`. cap "일정 지우기는 허락받지 않아서 이 토큰으로는 못 해요" | OAuth, Principle of Least Privilege |
| auth | RBAC | 역할 기반 권한 · 역할마다 할 수 있는 일 | `doc([{tb:[['역할','읽기','쓰기','삭제'],['손님','가능','안 됨','안 됨'],['일반 회원','가능','가능','안 됨'],['관리자','가능','가능','가능']]}], {title:'글 권한(예시)', still:true})` | Authorization, Permission |
| auth | Cookie vs Token | 쿠키와 토큰 · 로그인 정보를 싣는 두 방법 | `bkStack('<b class="mk-dtw">쿠키: 브라우저가 알아서 붙여요(HttpOnly 권장)</b>', httpmsg({kind:'요청', start:'GET /me', head:['Cookie: sid=…'], hl:['h0']}), '<b class="mk-dtw">토큰: 코드가 직접 붙여요</b>', httpmsg({kind:'요청', start:'GET /me', head:['Authorization: Bearer …'], hl:['h0']}))`. cap "HttpOnly 쿠키는 화면 코드가 못 읽어서 더 안전해요" | Cookie, Session, JWT |
| auth | Session Store | 세션 저장소 · 세션을 모아 두는 곳 | `seq(['서버 1','보관소','서버 2'], [{0→1 '세션 저장'}, {2→1 'sid=… 누구?'}, {1→2 '민지예요'}])`. cap "서버가 여러 대여도 같은 보관소를 봐요" | Session, Redis |
| auth | Redirect URI | 리다이렉트 URI · 로그인 뒤 돌아올 주소 | `vs('등록한 주소와 같음', bkStack(bkRows(['/callback']), whelp('코드 받음')), '한 글자라도 다름', bkStack(bkRows(['/callback/', '실패']), whelp('오류 화면')))`. cap "로그인 서비스는 등록한 주소와 글자 그대로 비교해요" | OAuth |
| auth | Webhook Signature | 웹훅 서명 · 진짜 보낸 곳인지 확인 | `seq(['결제사','내 서버'], [{0→1 '알림 + 서명'}, {1→1 '서명 계산'}, {1→1 '두 서명 비교'}, {1→1 '같을 때만 처리'}])`. cap "서명은 둘만 아는 비밀 키(예: whsec_…)로 만들어요" | Webhook, Secret |
| auth | Service Account | 서비스 계정 · 프로그램이 쓰는 계정 | `vs('사람 계정', doc([{ul:['로그인 화면에서 로그인','비밀번호']}], {title:'민지', still:true}), '서비스 계정', doc([{ul:['자동으로 받는 토큰','필요한 권한만']}], {title:'정산 프로그램', still:true}))` | API Key |

- `m:1`은 Global Constraints 규칙을 따른다. 표에서 `seq`·`track`을 쓴 카드에만 단다. `vs`·`httpmsg`·`bkStack`과 still `doc`만 쓴 카드(RBAC·OAuth Scope 등)에는 달지 않는다. `bkm`이 양쪽을 본다.
- `bkRows`·`bkPills`는 `<code>`·`--mono`로 그려진다(index.html:436·437). 그래서 코드 값(`/callback`)에만 쓴다. 한글 문장은 `doc([{ul:[…]}], {still:true})`이나 `whelp`로 쓴다.
- `vs` 안의 글 길이(계획서 ① 339줄의 "12자"를 이렇게 정함):
  - `bkRows` 코드 값은 wlen 12 이하다.
  - `doc` ul 줄은 줄바꿈되므로 wlen 24 이하다.
  - 320px에서 넘치면 칸을 세로로 쌓고 원장에 적는다.
- 측정(node, index.html:3966 `wlen`):
  - 표의 seq 세로줄 이름은 모두 한도 안이다.
  - seq 메시지는 모두 14 이하다. 14인 것은 `'바로 다시 물음'`·`'소식 올 때까지'`·`'새 소식 있나요'`·`'같을 때만 처리'`·`'A 확인: 재고 1'`·`'B 확인: 재고 1'`이다.
  - httpmsg 줄은 30 이하다. 30인 것은 `Content-Type: application/json`이다.
  - 한도를 넘으면 도우미가 오류를 던져 Step 5에서 잡힌다.

x 짝(스펙 5장). 아래 짝은 x에서 차이를 먼저 쓴다.
- Response Header vs Response Body, Request Header vs Response Header
- Worker vs Background Job, Batch Processing vs Cron Job
- Queue vs Pub/Sub vs Event-driven Architecture vs Webhook
- Concurrency vs Race Condition vs Lock, Lock vs Transaction
- Retry vs Exponential Backoff vs Circuit Breaker vs Timeout, Dead Letter Queue vs Retry
- Polling vs Long Polling vs Server-Sent Events vs WebSocket
- Streaming Response vs Response
- Session vs JWT vs Cookie vs Token
- Access Token vs Refresh Token vs Bearer Token
- RBAC vs OAuth Scope, Redirect URI vs Redirect
- Webhook Signature vs API Key, Service Account vs API Key

x에 꼭 넣을 사실(디렉터 검토 지적):
- Circuit Breaker: 시험이 실패하면 다시 열림으로 가요.
- Exponential Backoff: 무작위 시간(지터)을 더하고 최대 횟수를 정해요.
- Webhook Signature: 받은 본문 그대로 계산하고, 서명이 다르면 거부해요.
- Service Account: 키 파일은 새기 쉬워서 가능하면 피해요.

뜻이 다른 짝(Review Focus 4)은 x 안에서만 구분하고 r에 넣지 않는다.

출처를 Step 3에서 열어 확인한다.
- HTTP: MDN HTTP Headers(Cache-Control·Set-Cookie·Authorization), MDN Messages, RFC 9110(Response)
- SSE: MDN Using server-sent events(`text/event-stream`, `data:` 줄)
- 토큰·OAuth: RFC 6750 §2.1(`Bearer`), RFC 6749 §3.3(scope)·§3.1.2(redirection endpoint), RFC 9700(redirect URI 정확 비교)
- 회로 차단기: Martin Fowler bliki CircuitBreaker(닫힘·열림·반쯤 열림)
- 웹훅 서명: 결제·저장소 서비스의 공식 웹훅 문서. 원장에 브랜드 이름은 적되, 카드에는 쓰지 않는다.
- 지수 백오프: 클라우드 사업자 공식 재시도 문서
- 일괄 처리·DLQ: 메시지 큐 공식 문서

뒤이어 **디렉터 검토 묶음 D**

---

### Task 2: 기존 47장 x

쓸 스킬: design-skills:ux-writing·interfaces:better-writing

**Files:**
- Modify: `index.html`: `BK_NOX`에 있는 카드에 `x`를 더한다(`o`·`u` 뒤, `v` 앞).
- Modify: `tests/check.mjs:566`: `BK_NOX`

**Interfaces:**
- Consumes: `BK_NOX`(check.mjs:566, 47장), `bkx` 점검(572줄)
- Produces: back 97장 전부 x 있음

- [ ] **Step 1: 실패하는 점검**
  - `BK_NOX = []`로 바꾼다.
  - `BKX_HAS = {'CORS': ['OPTIONS'], 'Authentication': ['401'], 'Authorization': ['403'], 'Idempotent': ['PUT']}`와 점검 `bkxhas`를 더한다. 그 카드의 x에 목록 글이 모두 있어야 한다.
- [ ] **Step 2: 실패 확인**: `FAIL bkx: +Server, +Client, …`(47개), `FAIL bkxhas: CORS, Authentication, Authorization, Idempotent`
- [ ] **Step 3: 사실 확인**: 공통 절차 3이다. 카드마다 1차 출처(MDN·RFC 9110·6749·OpenID Connect Core)를 열고, 원장에 `Task 2 출처: <en> — <URL>`을 적는다.
- [ ] **Step 4: x 쓰기**: 47장에 x를 넣는다.
  - 2~3문장, 해요체로 쓴다. 짝이 있으면 차이를 먼저 쓴다.
  - 짝은 스펙 5장 목록이다. 특히:
    - Server vs Backend vs Node.js
    - Request Header vs Request Body
    - Authentication vs Authorization(401·403)
    - OAuth vs OpenID Connect(OIDC 카드는 없으니 이름만 말한다)
    - Optimistic Update vs Optimistic UI
    - Request Flow vs Request-Response Cycle
    - Mock Data vs Mock, Logging vs Server Log
    - Cache vs Browser Cache, Serverless Function vs Serverless
    - Monolith vs Microservices, Query Parameter vs Path Parameter
    - Idempotent vs POST·PUT
    - CORS: Authorization 헤더 등을 쓰면 OPTIONS 사전 요청이 먼저 가요(스펙 3.3 CORS 행)
  - Task 1에서 생긴 새 카드와의 차이도 쓸 수 있다(예: Session vs Session Store).
  - 다른 카테고리 카드 본문은 고치지 않는다.
- [ ] **Step 5: 통과**: `bkx`·`bkxhas`·`bktext`·`bkxn`·`wsym`이 통과한다. 다른 `FAIL`은 없다.
- [ ] **Step 6: 브라우저 확인**: x는 카드를 펼쳐야 보인다. `#/c/back/basic`·`core`·`motion`·`adv`·`api`·`tip`에서 카드 하나씩 펼쳐 320px 넘침이 없는지 본다.
- [ ] **Step 7: 커밋**: `feat: 백엔드 기존 카드 47장 쉬운 설명`

---

### Task 3: 직접 조작 4장

쓸 스킬: interfaces:better-accessibility(키보드·읽기 순서), superpowers:test-driven-development

**Files:**
- Modify: `index.html`: `u-back-rate-limit`·`u-back-idempotent`·`u-back-cache`·`u-back-authorization`의 `h`·`cap`·`init`
- Modify: `tests/check.mjs`: `BKDM`·`bkdm`·`bkdmrun`

**Interfaces:**
- Consumes:
  - `brate(sent)`, `brateSay(sent)`, `BRL = {max: 5, win: '1분'}`
  - `bidem(method, times)`, `bidemSay(method, times)`
  - `bcache(log: ('miss'|'hit')[])`, `bcacheSay(log)`
  - `bauthz(role)`, `bauthzSay(role)`
  - `tpick(names, on)`, `psay(el, m)`
- Produces: 그림 4장의 `init`. 상태 함수의 서명은 바꾸지 않는다.

**상태와 버튼**(결과 문장 `.mk-hint aria-live="polite"`은 `psay`로 바꾼다. init 안에서는 `s.querySelector`만 쓰고 window·document는 쓰지 않는다):

| 카드 | 처음 상태 | 버튼 | 누르면 |
|---|---|---|---|
| Rate Limit | `sent = 0` | "요청 보내기", "시간 지나기" | 보내기: `sent += 1`, 문장 `brateSay(sent)`. 시간 지나기: `sent = 0`, 문장 `BRL_RESET`. 그림 `brate(sent)` |
| Idempotent | `m = 'POST'`, `n = 0` | `tpick(['POST', 'PUT'], 'POST')`, "다시 보내기", "처음으로" | 고르기: `m` 바꾸고 `n = 0`. 다시 보내기: `n += 1`. 처음으로: `n = 0`. 그림 `bidem(m, n)`, 문장 `bidemSay(m, n)` |
| Cache | `log = []`, `has = false` | "요청 보내기", "캐시 비우기" | 보내기: `log.push(has ? 'hit' : 'miss')`, `has = true`. 비우기: `has = false`(log는 남김). 그림 `bcache(log)`, 문장 `bcacheSay(log)`. 비운 직후 문장은 `BCK_CLEAR` |
| Authorization | `role = '일반 회원'`, `sent = false` | `tpick(['일반 회원', '관리자'], '일반 회원')`, "글 삭제" | 고르기: `role` 바꾸고 `sent = false`. 글 삭제: `sent = true`. 그림은 `sent`면 `bauthz(role)`, 아니면 `whelp('역할을 고르고 글 삭제를 눌러 보세요')`. 문장은 `sent`면 `bauthzSay(role)`, 아니면 "아직 보내지 않았어요" |

- 두 문장은 상태 함수 옆에 상수로 둔다.
  - `BRL_RESET = '시간이 지나 횟수를 비웠어요. 다시 5번 보낼 수 있어요'`
  - `BCK_CLEAR = '캐시를 비웠어요. 다음 요청은 DB까지 가요'`
- 고르는 버튼 줄은 `<div role="group" aria-label="메서드 고르기">${tpick(…)}</div>`로 감싼다. Authorization은 `aria-label="역할 고르기"`다.
- 그림판 h는 `<div class="mk-mobox">…</div>` + 버튼 줄(`.mk-tkeys`) + `<span class="mk-hint" aria-live="polite">`이다(`u-front-key`, index.html:7544 형식). Idempotent의 고르는 버튼과 한 번 누르는 버튼은 같은 `.mk-tkeys` 줄에 두거나 두 줄로 둔다.
- `cap`은 할 일을 말한다.
  - Rate Limit: "요청을 6번 보내 보고, 시간 지나기로 다시 열어 보세요"
  - Idempotent: "POST와 PUT을 골라 여러 번 보내 보세요"
  - Cache: "두 번 보내 보고, 캐시를 비운 뒤 다시 보내 보세요"
  - Authorization: "역할을 바꿔 가며 글 삭제를 보내 보세요"
- 행이 6줄을 넘지 않는 것은 상태 함수가 이미 지킨다(`brate`·`bcache`·`bidem` 마지막 6행).

- [ ] **Step 1: 실패하는 점검**
  ```js
  const BKDM = {'Rate Limit': ['요청 보내기', '시간 지나기', 'aria-live'], 'Idempotent': ['POST', 'PUT', '다시 보내기', '처음으로', 'aria-pressed', 'aria-live'],
    'Cache': ['요청 보내기', '캐시 비우기', 'aria-live'], 'Authorization': ['일반 회원', '관리자', '글 삭제', 'aria-pressed', 'aria-live']};
  ```
  - `bkdm`: `fdm`(check.mjs:488)과 같은 방식이다. `init`이 있고, `String(init)`에 `psay`가 있고, h에 목록 글이 모두 있어야 한다.
  - `bkdmrun`은 vm 안에서 각 그림의 `init`을 가짜 그림판으로 돌린다.
    - 가짜 그림판: `querySelector`·`querySelectorAll`·`addEventListener`·`setAttribute`·`dataset`·`innerHTML`·`textContent`만 있는 작은 객체다(`u-front-key` init이 쓰는 API).
      - 버튼은 그림 h를 정규식으로 읽어 만든다. `textContent`는 버튼 글, `dataset.k`는 `data-k` 값이다.
      - `setAttribute`는 값을 `String()`으로 저장한다(`aria-pressed`에 불리언이 들어감).
      - `psay`가 전역 `setTimeout`을 쓰므로, 시작할 때 `ctx.setTimeout = f => f()`로 바꾸고 끝나면 되돌린다.
      - front `fdmrun`은 순수 함수만 보았다. init을 직접 돌리는 것은 이번이 처음이다.
    - 단언(버튼은 글자로 찾는다):
      - Rate Limit: 보내기 6번 → 그림에 `429`, 문장에 `429`. 시간 지나기 → 문장 `BRL_RESET` → 보내기 1번 → 그림에 `429` 없음, 문장 `1번째 요청은 통과`
      - Idempotent: POST 다시 보내기 3번 → 문장 `3개`. PUT 고르기 → 문장 `아직 보내지 않았어요`, POST의 `aria-pressed="false"`, PUT의 `"true"`. 다시 보내기 3번 → `1개`. 처음으로 → `아직`
      - Cache: 보내기 2번 → 문장 `바로`. 비우기 → 문장 `BCK_CLEAR` → 보내기 → 문장 `DB까지`
      - Authorization: 글 삭제 → 문장 `로그인은 됐지만 권한이 없어요`, 그림 `403`. 관리자 고르기 → 문장 `아직`. 글 삭제 → 그림 `200 OK`
  - 가짜 그림판을 만들기 어려우면 `bkdmrun`은 상태 전이만 순수 함수로 확인한다(`bkdmstep(card, state, button) → state`를 그림 옆에 두고 init이 그것을 쓰게 함). 이때 원장에 `Ruling:`을 적고, 키보드 동작은 Step 5 브라우저에서 확인한다.
- [ ] **Step 2: 실패 확인**: `FAIL bkdm: Rate Limit, Idempotent, Cache, Authorization`·`FAIL bkdmrun`
- [ ] **Step 3: 구현**: 위 표대로 h·cap·init을 바꾼다. 멈춘 그림 상태 함수와 `bkstill` 단언은 그대로 둔다.
- [ ] **Step 4: 통과**: `FAIL` 없음
- [ ] **Step 5: 브라우저·키보드 확인**: `#/c/back/core`(Authorization·Rate Limit), `#/c/back/adv`(Cache), `#/c/back/tip`(Idempotent). 공통 절차 확인에 더해 Playwright로 다음을 본다.
  - Tab으로 버튼에 포커스가 가고(`document.activeElement`가 `.mk-tkey`), Enter·Space로 누른다.
  - 결과 문장 글이 바뀐다(psay 150ms 뒤 확인).
  - 고르는 버튼의 `aria-pressed="true"`가 하나뿐이다.
  - Rate Limit 보내기 20번, Idempotent POST 20번 뒤 320px에서 넘침이 0이다.
  - `.mk-hint`는 absolute(top 8px)다. 그래서 가장 긴 문장일 때 320px에서 `hint.getBoundingClientRect().bottom <= mobox.getBoundingClientRect().top`인지 잰다. 넘침 측정으로는 겹침이 잡히지 않는다. 겹치면 위 여백을 늘리고 원장에 적는다.
  - reduce 모드에서도 버튼이 동작한다.
- [ ] **Step 6: 커밋**: `feat: 백엔드 직접 조작 4장`

뒤이어 **디렉터 검토 묶음 E**(Task 2~3)

---

### Task 4: 증상 12개

**Files:**
- Modify: `index.html`: `SYM('오류·안 됨',[…])`(3712줄) 끝에 10개, `SYM('느림',[…])`(3694줄) 끝에 2개
- Modify: `tests/check.mjs`: `SYM_BACK`, `symcount` 181→193

**Interfaces:**
- Consumes: Task 1 카드(연결 대상)
- Produces: 증상 193개

- [ ] **Step 1: 실패하는 점검**
  - `SYM_BACK`: 아래 표의 증상 12개
  - `symcount`: `g.SYMPTOMS.length !== 193`, 목록에 `...SYM_BACK`를 더한다.
- [ ] **Step 2: 실패 확인**: `FAIL symcount: length 181`
- [ ] **Step 3: 넣기**: 형식은 `['증상', ['카드', …]]`다. 연결 카드는 표 순서대로다.

| 증상 | 그룹 | 연결 카드 |
|---|---|---|
| 429가 떠요 | 오류·안 됨 | 429 Too Many Requests, Rate Limit, Exponential Backoff |
| 로그인했는데 401이 떠요 | 오류·안 됨 | 401 Unauthorized, Bearer Token, Access Token, Token Expiry |
| 로그인은 되는데 403이 떠요 | 오류·안 됨 | 403 Forbidden, Authorization, RBAC, OAuth Scope |
| 서버가 보낸 데이터를 못 읽어요 | 오류·안 됨 | Content-Type, Serialization |
| 웹훅이 같은 알림을 여러 번 보내요 | 오류·안 됨 | Webhook, Idempotent, Webhook Signature |
| 업로드한 파일이 서버에서 비어 있어요 | 오류·안 됨 | Multipart Form Data |
| 로그인 뒤 redirect_uri 오류가 나요 | 오류·안 됨 | Redirect URI, OAuth |
| 동시에 사면 재고가 마이너스가 돼요 | 오류·안 됨 | Concurrency, Lock |
| 다음 페이지에 같은 글이 또 나와요 | 오류·안 됨 | Cursor vs Offset Pagination |
| 오류가 난 요청을 로그에서 못 찾겠어요 | 오류·안 됨 | Request ID, Logging |
| 외부 API가 멈추면 우리 서버도 멈춰요 | 느림 | Circuit Breaker, Timeout |
| 오래 걸리는 작업 때문에 응답이 늦어요 | 느림 | Background Job, Worker, Queue |

  - 측정: 기존 증상과 같은 문구는 없다(2026-11-03 대조). 비슷한 "외부 API가 멈추면 테스트도 실패해요"는 대상과 연결 카드가 달라 둔다(스펙 6장).
  - 측정: 지금 "오류·안 됨"은 79개다. 넣으면 89개가 된다.
- [ ] **Step 4: 통과**: `symcount`와 `ref`(check.mjs:139, 없는 카드 이름이면 실패)가 통과한다.
- [ ] **Step 5: 브라우저 확인**: 첫 화면 `#/`의 증상 띠(`keyBand`, index.html:7894)에서 다음을 본다. 320px 넘침은 0이다.
  - "오류·안 됨" 칩을 누르면 새 증상 10개가 보인다.
  - "느림" 칩을 누르면 새 증상 2개가 보인다.
  - 증상을 누르면 연결 카드로 간다.
- [ ] **Step 6: 커밋**: `feat: 백엔드 증상 12개`

---

### Task 5: 글꼴·문서·전체 점검

쓸 스킬: break-ui(seq 4줄·메시지 8개·14자, httpmsg 30자·헤더 4·본문 4), interfaces:better-ui·better-layout, design-skills:accessibility-audit, superpowers:verification-before-completion

**Files:**
- Modify: `index.html`: FONT:START~FONT:END woff(서브셋 다시 만들기)
- Modify: `tests/check.mjs`: `LATER = []`
- Modify: `PRODUCT.md`(31줄 개수), `docs/PLAN.md`(17줄 진행, 57줄 칩 메모), `DESIGN.md`(seq·httpmsg 규칙)

- [ ] **Step 1: 실패하는 점검**: `LATER = []`로 바꾼다.
- [ ] **Step 2: 실패 확인**: `FAIL doccount`가 나온다. 서브셋에 없는 글자가 있으면 `FAIL font`도 나온다.
- [ ] **Step 3: 글꼴**: `python -E -P "<SP>\font_subset.py" index.html "<SP>\fontsrc\Hahmlet.ttf" "<작업 폴더>"`
  - `<SP>`는 front 때 scratchpad이고, 두 파일은 있다(측정).
  - 결과 woff를 FONT:START~FONT:END 사이에 넣는다(스크립트가 하는 방식대로 한다).
  - `font` 통과를 확인한다. `NO_GLYPH`가 늘지 않아야 한다.
- [ ] **Step 4: 문서**
  - `PRODUCT.md:31`: "용어 1483개" → 1529, 증상 색인 수 → 193. 카테고리 수는 그대로다.
  - `docs/PLAN.md:17`: ③ 진행에 "백엔드 완료 2026-11-0X"를 적고, "다음은 백엔드"는 다음 카테고리(데이터베이스)로 바꾼다. 날짜는 실제 마친 날이다.
  - `docs/PLAN.md:57`: "칩 79개" → "칩 89개"
  - `DESIGN.md`: 그림 도우미 목록에 `seq`·`httpmsg` 규칙을 더한다.
    - `seq`: 세로줄 2~4개, 이름 wlen 8(4개면 6), 메시지 wlen 14, 8개까지
    - `httpmsg`: 줄 wlen 30, 헤더 4·본문 4
    - 둘 다 `pair` 왼쪽 칸에 넣지 않는다.
  - `doccount` 통과를 확인한다.
- [ ] **Step 5: 전체 점검**: `node tests/check.mjs` → `FAIL` 없음, `LATER` 줄 없음, `OK <수>`
- [ ] **Step 6: 전체 브라우저 확인**
  - back 10개 하위항목 × 3폭 × 2움직임, 공통 절차 기준
  - 직접 조작 4장 키보드 확인 다시
  - break-ui: 가장 긴 seq(BFF 7행, Concurrency 6행)·httpmsg(Response Body·Error Response) 그림을 320px에서 본다.
  - accessibility-audit: back 화면에서 버튼 이름, `aria-live`, 포커스 표시, 대비를 본다.
  - 고칠 것이 나오면 실패하는 점검을 먼저 쓰거나 원장에 적고 고친다.
- [ ] **Step 7: 커밋**: `docs: 백엔드 개수·규칙 문서와 글꼴 갱신`

뒤이어 **최종 검토**(브랜치 전체, 계획서 ①·② Review Focus 함께).
- 결정 기록 문서: `docs/superpowers/2026-11-0X-back-category-rulings.md`
  - 계획서 ①·② 원장의 `Ruling:`과 고친 검토 지적을 정리한다.
  - front 선례 형식을 따른다(`docs/superpowers/`에서 `*-rulings.md`를 grep).
- 작업 폴더 삭제, `superpowers:finishing-a-development-branch`
  - main 병합은 사용자 확인 뒤에 한다.
- 메모리 갱신
