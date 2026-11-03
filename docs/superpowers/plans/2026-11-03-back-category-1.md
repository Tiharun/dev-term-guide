# 백엔드 카테고리 보강 실행 계획 ①

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 백엔드에 다음을 넣는다.
- 새 그림 도우미 `seq()`·`httpmsg()`
- 하위항목 4개, arch·data 새 카드 23장
- 기존 51장 전부 전용 그림(`u-back-`)으로 다시 그리기. 직접 조작 4장은 멈춘 그림까지만

남은 일(job·auth·api 새 카드 23장, 기존 47장 x, 직접 조작 붙이기, 증상, 글꼴·문서)은 계획서 ②가 한다.

**Architecture:** `index.html` 하나에서 작업한다.
- 도우미는 `domtree` 뒤, `/* 직접 조작 도우미 … */`([index.html:4034](../../../index.html)) 앞에 둔다.
- 카드는 `T('back', …)` 블록(2677~2740줄)에 넣는다. 새 블록은 `T('back','tip',…)`(2730줄) 앞이다.
- 그림은 `const visual`(7566줄) 앞에 `/* back: <묶음> … */` 주석 + `Object.assign(D, {...})`로 더한다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP

**Spec:** [docs/superpowers/specs/2026-11-03-back-category-design.md](../specs/2026-11-03-back-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치**: `back-category`(지금 브랜치)에서 계속한다. 계획서 ②도 같은 브랜치다.
- **클래스 접두사**: `seq` = `mk-sd*`, `httpmsg` = `mk-hm*`, 직접 조작 멈춘 그림·전용 칸 = `mk-bk*`.
  - 측정: `mk-sd`·`mk-hm`·`mk-bk`는 0건이다. `mk-sq`는 이미 쓰인다(685줄 `.mk-sq`, 4388줄 아바타)라 쓰지 않는다.
- **D 키**: `'u-back-' + slug(en)`. 예: `Stateless vs Stateful` → `u-back-stateless-vs-stateful`, `Pub/Sub` → `u-back-pub-sub`.
  - 기존 `u-back-button`·`u-back-to-top`(design 카드)과 이름이 겹치지 않는지 Task 3·4·5 점검 `bkukey`가 본다(back 카드만 대상).
- **세로줄 이름**: 8자(wlen) 한도라 긴 이름은 줄인다(`세션 저장소`→`저장소`, `결제 서비스`→`결제사`, `로그인 서비스`→`로그인`, `다른 서버`→`외부`). 이 계획에서 쓰는 이름: `브라우저`·`서버`·`DB`·`내 서버`·`미들웨어`·`라우트`·`컨트롤러`·`서비스`·`저장소`·`워커`·`결제사`·`로그인`·`외부`·`앱`·`API 관문`·`BFF`·`주문`·`회원`·`알림`·`결제`·`글`.
  - 표에 없는 이름이 필요하면 8자 안에서 정하고 원장에 `Ruling:`으로 적는다.
- **조사**: `.sr` 문장의 "가/이"는 세로줄 이름 끝 글자로 정한다. 한글이고 받침이 있으면 `이`, 받침이 없으면 `가`, 한글이 아니면 `가`(DB·BFF·API처럼 모음으로 끝나 읽히는 이름만 쓴다).
- **httpmsg 줄 한도 30자**: 스펙 3.2는 28자(ide와 같음)지만 가장 흔한 헤더 `Content-Type: application/json`이 30자다. 줄이면 Content-Type·Request·Response 카드가 핵심 줄을 못 보여 주므로 30자로 정한다. 대신 꼬리표(강조·실패)는 줄 끝에 붙고 자리가 없으면 다음 줄로 내려간다(`flex-wrap`). 320px에서 들어가는지 Task 1 Step 5에서 잰다. ide·term의 한도는 그대로다.
- **실패 수**: `seq`의 `.sr` 끝 "(실패 n개)"는 실패가 1개 이상일 때만 붙인다. 스펙 3.1 예시의 "(실패 0개)"는 형식 예시로 보고, 0개를 읽어 주지 않는다.
- **멈춘 직접 조작 그림**: Task 4·5에서 상태 함수(`brate`·`bauthz`·`bcache`·`bidem`)를 만들어 멈춘 그림을 그린다. 계획서 ②가 같은 함수에 버튼과 `init`을 붙인다.
- **COUNT 키**: 접두사 없는 키는 design 카테고리다. back은 `back/<sec>`로 쓴다.
- **점검 이름**: basics가 이미 `BS`·`bcat`·`bobj`·`bx`·`bm`·`bou`·`bko`를 쓴다(측정: check.mjs:370~379). back 점검은 `bk` 접두사로 쓴다: `BKS`·`bkcat`·`bkobj`·`bkukey`·`bksym`·`bkx`·`bkm`·`bkou`·`bkwrong`·`bksafe`·`bkshare`·`bkhelp`·`bkstill`. 측정: `check('bk`는 0건이다. 스펙 8장도 이 이름으로 고쳤다.
- **남은 옛 카드 목록**: 새 카드가 처음부터 점검되도록 `LATER` 대신 목록을 쓴다(basics `BOBJ` 방식). 목록과 실제가 다르면 `+이름`(목록에 없는데 아직 안 됨)·`-이름`(목록에 있는데 이미 됨)으로 실패한다.
  - `BK_TODO`: 아직 `u-back-` 그림이 아닌 옛 카드. Task 2에 51장, Task 4에서 basic·core·motion 27장(Server~Queue)을 빼고, Task 5에서 비운다. `bkukey`가 본다. `bkobj`는 객체 v 카드가 이 목록 밖에 있으면 실패한다.
  - `BK_NOX`: x가 없는 옛 카드 47장. 계획서 ②가 비운다. `bkx`가 본다.
  - `BK_SYM`: 기호가 남은 옛 카드 `['Optimistic Update']`. Task 4가 비운다. `bksym`이 본다.
- **LATER 사용**: `redrawn:back/basic·core·motion`은 Task 4, `redrawn:back/adv·api·tip`은 Task 5, `font`·`doccount`는 계획서 ②에서 뺀다.
  - `doccount`는 Task 3에서 1506장이 되면 실패하므로 Task 2부터 둔다(front 선례).
  - `font`는 새 문구의 글자가 Hahmlet 서브셋에 없으면 그 Task부터 `LATER font` 줄로 나온다(예: Task 5 `bcache`의 '녀'). 서브셋은 계획서 ②가 다시 만든다.
- **r 시점**: 같은 Task와 앞 Task 카드, 이미 있는 다른 카테고리 카드만 단다. 계획서 ②의 카드(Worker·Access Token 등)를 가리키는 r은 그 카드를 넣을 때 단다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN은 쓰지 않는다.
- 색은 도판 토큰(`--ink`·`--plate`·`--fig`·`--rule`·`--muted`·`--mark`·`--mark-bg`·`--mark-text`·`--ok`·`--mono`·`--sans`)만 쓴다. hex 값을 새로 쓰지 않는다.
- 그림 글자는 11px 이상이다. `.fig`에는 그림자를 넣지 않는다.
- 자동 애니메이션은 클래스 `A`를 쓴다. 주기 10s, 멈춘 장면은 `-8.8s`다.
- `m:1`은 그림 h에 `A` 클래스가 있으면 달고, 없으면 달지 않는다. still이 아닌 `seq`·`track`·`doc`·`ide`·`term`이 `A`를 만든다. `fcss`·`httpmsg`·`vs` 칸만 있는 그림과 멈춘 직접 조작 그림은 `m`이 없다. 점검 `bkm`이 양쪽을 본다.
- `ide` 단계의 `out` 항목은 문자열이다. 흐린 글만 `{t:'…', dim:1}`이다([index.html:3938](../../../index.html)). `{t:'…'}`만 쓰면 `[object Object]`로 나온다.
- 상태는 색만으로 나누지 않는다(글자 "실패"·"기다림"·"강조"·"처리"를 함께 쓴다).
- 읽히는 글에 `✓✕★→←↑↓`를 쓰지 않는다(`wsym` 규칙). 그림 속 숫자·키 값은 "(예시)"로 표시하고, 실제 키처럼 보이는 값은 줄임표로 쓴다(`sk_test_…`). 회사 로고·브랜드 이름은 쓰지 않는다("로그인 서비스", "결제 서비스").
- 보안 습관: 토큰을 localStorage에 두는 모습을 그리지 않는다. 키를 보내는 쪽은 "내 서버"다. Error Response 본문에 스택 추적·내부 경로를 넣지 않는다.
- `httpmsg`는 `pair` 왼쪽 칸에 넣지 않는다(110px). 그림판 전체 폭에 단독으로 두거나 두 개를 세로로 쌓는다. 코드가 들어가는 `pair` 왼쪽 칸은 `fcss`([index.html:7261](../../../index.html))로 쓴다.
- 카드 문구:
  - 새 카드 `d`·`x`는 해요체다. `x`는 2~3문장이고, 짝이 있으면 차이를 먼저 쓴다(스펙 5장 짝 목록).
  - `p`: "~해줘" 지시문에 정식 용어를 넣는다. `l`: 1~3.
  - `ko`는 기존 back 형식(`한글 · 풀이`)을 따른다.
  - 버전 숫자와 "가장 빠른·최신" 같은 단정을 쓰지 않는다. 프레임워크·서비스 이름은 예로만 든다.
- `r`은 1~3개이고, 스펙 4장 r 후보 중 이미 있는 카드만 단다. 뜻이 다른 짝(`BK_WRONG`)은 r에 넣지 않는다. 다른 카테고리 카드 본문은 바꾸지 않는다.
- `o:1`은 MDN·RFC·공식 문서를 직접 열어 확인했을 때만 쓴다. 그때 `u`(`MDN('…')`·`RFC(n)`)를 단다. 출처는 원장에 적는다.
- 커밋:
  - 한국어 `feat:`/`fix:`/`docs:`로 쓰고 attribution 줄을 넣지 않는다.
  - `.impeccable/hook.cache.json`·`core375.png`는 스테이징하지 않는다. 경로를 지정해서 올리고 `git add -A`·`-a`는 쓰지 않는다.
- Python은 `newline='\n'`로 쓰고 `python -E`로 돌린다. 정규식이 든 스크립트는 heredoc이 아니라 Write 도구로 쓴다.
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필·저장된 로그인은 쓰지 않고, `state save` 파일도 만들지 않는다.

## Review Focus

1. **320px의 가장 큰 입력**: `seq` 세로줄 4개(이름 8자) + 메시지 8개(글 14자, 실패·기다림 꼬리표), `httpmsg` 30자 줄 + "강조"·"실패" 꼬리표 + 헤더 4줄·본문 4줄이 가로 넘침 없이 들어가야 한다. → Task 1 브라우저 확인(시험 그림 `u-back-test`를 임시로 띄우고 커밋 전에 지움). 안 들어가면 스펙 10장대로 한도를 낮추고 원장에 적는다.
2. **reduced-motion에서 순서도**: 움직임을 끄면 `seq`의 모든 행이 보여야 한다(빈 그림판으로 멈추면 안 됨). 멈춘 장면 `-8.8s`에서도 8행이 다 보인다. → Task 1 `cdframe` 확장, 브라우저 확인
3. **조사와 읽는 순서**: `.sr`가 "저장소가", "로그인이", "API 관문이", "DB가"로 읽히고, 화살표 기호를 읽지 않는다. 처리 상자는 "서버가 처리: …"로 읽힌다. → Task 1 `bkhelp`
4. **자주 틀리는 HTTP 사실**:
   - 401은 "누구인지 모름(인증 필요)", 403은 "누구인지 알지만 권한 없음"이다.
   - PUT·DELETE는 멱등이고 POST는 아니다. 202 Accepted는 "접수만 했고 아직 안 끝남"이다.
   - CORS에서 막히는 것은 브라우저가 응답을 읽는 일이다. 단순 요청은 서버까지 가서 처리될 수 있다.
   - OAuth 인가 코드는 브라우저가 들고 오고, 코드를 토큰으로 바꾸는 일은 내 서버와 로그인 서비스가 직접 한다.
   - `Authorization: Bearer <토큰>` 형식이다.

   MDN·RFC 9110·6749·6750과 다르면 안 된다. → Task 3·4·5 출처 확인, 디렉터 검토 묶음 B·C
5. **비밀 값처럼 보이는 글**: 그림에 실제 키처럼 긴 영숫자, 스택 추적(`at … .js:12`)이 없어야 한다. → Task 2 `bksafe`

---

## 공통 절차 (Task 3~5)

1. **실패하는 점검 추가**(`tests/check.mjs`): 그 Task가 적은 기대값을 먼저 넣는다.
2. **실패 확인**: `node tests/check.mjs` → Task가 적은 `FAIL` 줄이 나온다. 60~100초 걸리니 Bash timeout은 200000이다.
3. **사실 확인**: 카드마다 1차 출처(MDN·RFC 우선)를 열어 확인하고, 원장에 `Task N 출처: <en> — <URL>`을 적는다.
4. **데이터·그림**: Task 표대로 넣는다. 그림 묶음 주석에 출처와 "예시" 값을 적는다(front 7253줄 형식).
5. **점검 통과**: `node tests/check.mjs` → `FAIL` 줄 없이 `OK <수>`. `LATER`는 그 시점에 남아 있어야 할 것만 있다.
6. **브라우저 확인**(아래 절차)
7. **커밋**: Task가 적은 메시지로 커밋하고, 원장 갱신을 같은 호출에서 한다.

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -E -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다. 끝나면 TaskStop으로 멈춘다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/back/<sec>`
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**
  - 페이지: `document.documentElement.scrollWidth <= innerWidth` → `true`
  - 그림 안: `[...document.querySelectorAll('#view .fig .stage *')].filter(s => s.scrollWidth > s.clientWidth + 1 && getComputedStyle(s).overflow !== 'visible')` → `[]`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900, 375×812, 320×700에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)
- **reduced-motion**: `browser_emulate_media({reducedMotion:'reduce'})` 뒤 새로고침한다. 자동 재생이 없고, 재생 버튼이 동작해야 한다.

### 디렉터 검토 시점

디렉터 에이전트(Opus 5.5, effort high)에게 SendMessage로 맡긴다. 압축 뒤라 ID를 모르면 새로 띄운다.
- **묶음 A — 도우미**: Task 1 뒤
- **묶음 B — 새 카드**: Task 3 뒤
- **묶음 C — 다시 그리기**: Task 5 뒤(Task 4~5 diff)

결과 처리:
- Critical·Important·Minor 모두 고친다(사용자 지시). 고칠 것은 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN). 점검으로 잡기 어려운 문구 지적은 고친 뒤 원장에만 적는다.
- 원장에 `Review <묶음>: fixed …`로 적는다. 고치지 않기로 한 지적은 `Ruling:`에 이유를 적는다.

---

### Task 1: 도우미 `seq()`·`httpmsg()`

쓸 스킬: superpowers:test-driven-development, break-ui(시험 그림), interfaces:better-layout

**Files:**
- Modify: `index.html`
  - 새 도우미: `domtree`(4014줄) 뒤, 4034줄 주석 앞
  - CSS: devtools·domtree CSS(425~434줄) 뒤. `.mk-sdm.A` 규칙은 491줄 `.mk-cds.A` 옆
  - 넓은 그림 목록(553줄 `.fig:has(…)`)에 `.mk-sd`·`.mk-hm` 추가
- Modify: `tests/check.mjs`: `fhelp`(241~277줄) 뒤에 `bkhelp`, `cdframe`(531줄)에 `sdm`
- Modify: `DESIGN.md`: 도우미 표에 두 줄

**Interfaces:**
- Produces:
  - `seq(lanes = [], msgs = [], {still = false, label} = {}) → string`
    - 바깥: `<div class="mk-sd">`. `label`이 있으면 `role="group" tabindex="0" aria-label`.
    - 머리: `<div class="mk-sdh" aria-hidden="true" style="--n:세로줄 수">`에 세로줄 이름 `<span>`.
    - 행 목록: `<ol class="mk-sdl" aria-hidden="true" style="--n:…">`. 세로줄 점선은 각 열 가운데에 그린다.
    - 행 k(1부터): `<li class="mk-sdm${still ? '' : ` mk-cdz${k} A`}">`
      - 맨 앞 `<span class="mk-sdw">`: 화살표면 `보낸 이름가/이 받는 이름에`, 처리면 `이름 처리`
      - 글: `<b class="mk-sdt">${esc(t)}</b>`, 그 뒤 `err`면 `<b class="mk-sdk">실패</b>`, `wait`면 `<b class="mk-sdk">기다림</b>`
      - 화살표: `<i class="mk-sda${to < from ? ' l' : ''}" style="--a:작은 번호;--b:큰 번호">`(행 전체 폭 아래, 시작 열 가운데에서 끝 열 가운데까지, 머리는 받는 쪽)
      - 처리: 화살표 대신 `<i class="mk-sdb" style="--a:번호">`(그 열 가운데 작은 상자)
    - 글 `t`는 행 전체 폭에 놓는다(스펙 3.1). 실패 행 글은 `var(--mark-text)`.
    - 끝 `<p class="sr">`: 메시지마다 `보낸이름+조사 받는이름에 t`(뒤에 ` 실패`·` 기다림`) 또는 `이름+조사 처리: t`를 `, `로 잇고 끝에 `.`. 실패가 1개 이상이면 그 마침표 앞에 ` (실패 n개)`를 넣는다.
    - 오류 메시지는 `'seq: '`로 시작한다. 검사: lanes 2~4개, 이름 문자열·wlen 1~8, msgs 1~8개, from·to가 0 이상 lanes 수 미만의 정수, t가 빈 글이 아닌 문자열·wlen ≤ 14, err와 wait 동시 사용.
  - `httpmsg({kind, start, head = [], body = [], hl = [], label} = {}) → string`
    - 바깥: `<div class="mk-hm">`(label이 있으면 seq와 같은 속성).
    - 머리띠: `<div class="mk-hmt">HTTP ${kind}<span>(버전 줄임)</span></div>`
    - 줄 목록 `<div class="mk-hmb" aria-hidden="true">`. 줄마다 `<div class="mk-hmr${강조 ? ' mk-hmon' : ''}"><code>${esc(글)}</code>꼬리표</div>`(줄은 `display:flex;flex-wrap:wrap`)
      - 순서: 첫 줄 → 헤더 → (본문이 있으면) 빈 줄 `<div class="mk-hmr mk-hmgap"></div>` → 본문
      - 꼬리표: 강조 줄은 `<b class="mk-hmk">강조</b>`, 응답 상태 400 이상이면 첫 줄에 `<b class="mk-hmk">실패</b>`
      - 줄 글은 `white-space:pre`로 앞 공백을 지킨다.
    - 끝 `<p class="sr">HTTP ${kind}, ${start}, 헤더 ${h}줄, 본문 ${b}줄</p>`. 강조가 있으면 `, 강조: ` + 이름(첫 줄은 `첫 줄`, 헤더는 `:` 앞 이름 + ` 줄`, 본문은 `본문 i번째 줄`)을 `, `로, 실패면 `, 실패`를 더한다. 강조 이름은 `hl` 순서와 상관없이 줄 순서(첫 줄 → 헤더 → 본문)로 늘어놓고, 본문 i는 1부터 센다.
    - 오류 메시지는 `'httpmsg: '`로 시작한다. 검사: kind가 `요청`·`응답`, start·head·body 모든 줄이 문자열·wlen ≤ 30(첫 줄·헤더는 빈 글 금지), head·body 각 0~4줄, 요청 start는 `/^(GET|HEAD|POST|PUT|PATCH|DELETE|OPTIONS) \S/`, 응답 start는 100~599 세 자리 + (끝 또는 공백), hl은 `start`·`h0`~`h(헤더 수-1)`·`b0`~`b(본문 수-1)`만.

- [ ] **Step 1: 실패하는 점검 `bkhelp` 쓰기**

`fhelp` 바로 뒤에 둔다. 형식은 `fhelp`와 같다.

```js
check('bkhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(seq|httpmsg): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); });
  const sq = seq(['브라우저', '서버', '저장소'], [{from:0, to:1, t:'POST /login'}, {from:1, to:1, t:'비밀번호 확인'}, {from:1, to:2, t:'세션 저장'}, {from:2, to:1, t:'저장됨', wait:1}, {from:1, to:0, t:'401', err:1}]);
  has(sq, ['class="mk-sdh" aria-hidden="true"', 'class="mk-sdl" aria-hidden="true"', 'mk-cdz1 A', 'mk-cdz5 A', '브라우저가 서버에', '서버 처리', 'mk-sda l', 'mk-sdb', '>실패<', '>기다림<',
    '<p class="sr">브라우저가 서버에 POST /login, 서버가 처리: 비밀번호 확인, 서버가 저장소에 세션 저장, 저장소가 서버에 저장됨 기다림, 서버가 브라우저에 401 실패 (실패 1개).</p>'], 'seq');
  has(seq(['로그인', 'DB'], [{from:0, to:1, t:'a'}]), ['로그인이 DB에 a.'], '조사 받침');
  has(seq(['API 관문', 'BFF'], [{from:1, to:0, t:'a'}]), ['BFF가 API 관문에 a.'], '조사 영문');
  const st = seq(['a', 'b'], [{from:0, to:1, t:'x'}, {from:1, to:0, t:'y'}], {still:true});
  if (/class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(st) || /\\(실패/.test(st)) bad.push('seq still·실패 0개');
  const L2 = ['a', 'b'], m1 = [{from:0, to:1, t:'x'}];
  no(() => seq(['a'], m1), '세로줄 1개'); no(() => seq(['a', 'b', 'c', 'd', 'e'], m1), '세로줄 5개'); no(() => seq(['a', '가나다라a'], m1), '이름 9자');
  no(() => seq(L2, []), '메시지 0개'); no(() => seq(L2, Array(9).fill(m1[0])), '메시지 9개'); no(() => seq(L2, [{from:0, to:2, t:'x'}]), 'to 범위');
  no(() => seq(L2, [{from:-1, to:1, t:'x'}]), 'from 음수'); no(() => seq(L2, [{from:0.5, to:1, t:'x'}]), 'from 소수'); no(() => seq(L2, [{from:0, to:1, t:''}]), '빈 글');
  no(() => seq(L2, [{from:0, to:1, t:'가나다라마바사아'}]), '글 16자'); no(() => seq(L2, [{from:0, to:1, t:'x', err:1, wait:1}]), '실패+기다림');
  const hm = httpmsg({kind:'요청', start:'POST /api/posts', head:['Content-Type: application/json', 'Authorization: Bearer …'], body:['{', '  "title": "첫 글"', '}'], hl:['h0', 'b1']});
  has(hm, ['class="mk-hmt">HTTP 요청<span>(버전 줄임)</span>', 'class="mk-hmb" aria-hidden="true"', 'mk-hmgap', 'mk-hmon', '>강조<', '<code>  &quot;title&quot;: &quot;첫 글&quot;</code>',
    '<p class="sr">HTTP 요청, POST /api/posts, 헤더 2줄, 본문 3줄, 강조: Content-Type 줄, 본문 2번째 줄</p>'], 'httpmsg');
  has(httpmsg({kind:'요청', start:'GET /', head:['Accept: */*'], body:['a', 'b'], hl:['b1', 'h0']}), ['강조: Accept 줄, 본문 2번째 줄</p>'], 'httpmsg 강조 순서');
  has(httpmsg({kind:'응답', start:'404 Not Found'}), ['>실패<', 'HTTP 응답, 404 Not Found, 헤더 0줄, 본문 0줄, 실패'], 'httpmsg 실패');
  const ok = httpmsg({kind:'응답', start:'200 OK', head:['Content-Type: text/plain']});
  if (ok.includes('실패') || ok.includes('mk-hmgap')) bad.push('httpmsg 200·본문 없음');
  has(httpmsg({kind:'요청', start:'OPTIONS /api', hl:['start']}), ['강조: 첫 줄'], 'httpmsg OPTIONS');
  no(() => httpmsg({kind:'질문', start:'GET /'}), 'kind'); no(() => httpmsg({kind:'요청', start:'FETCH /'}), '메서드');
  no(() => httpmsg({kind:'응답', start:'99 Low'}), '상태 99'); no(() => httpmsg({kind:'응답', start:'600 X'}), '상태 600'); no(() => httpmsg({kind:'응답', start:'2000 X'}), '상태 네 자리');
  no(() => httpmsg({kind:'요청', start:'GET /' + 'a'.repeat(26)}), '첫 줄 31자'); no(() => httpmsg({kind:'요청', start:'GET /', head:Array(5).fill('A: b')}), '헤더 5줄');
  no(() => httpmsg({kind:'요청', start:'GET /', body:Array(5).fill('a')}), '본문 5줄'); no(() => httpmsg({kind:'요청', start:'GET /', head:['']}), '빈 헤더');
  no(() => httpmsg({kind:'요청', start:'GET /', hl:['h0']}), '없는 헤더 강조'); no(() => httpmsg({kind:'요청', start:'GET /', body:['a'], hl:['b1']}), '없는 본문 강조');
  return bad.join(', ');
})()`, ctx));
```

- `cdframe` 끝의 `dw` 줄 옆에 같은 꼴로 `sd = html.match(/\.mk-sdm\.A\{[^}]*animation-delay:-([\d.]+)s/)`를 더하고, 맞지 않으면 `'sdm'`을 돌려준다.

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs`
Expected: `FAIL bkhelp: seq is not defined`, `FAIL cdframe: sdm`

- [ ] **Step 3: `seq`·`httpmsg` 구현**: `wlen`·`esc`를 쓰고, 입력 검사를 먼저 한 뒤 HTML을 만든다. CSS를 devtools·domtree CSS 뒤에 두고, 491줄에 `.mk-sdm.A{opacity:0;animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}`를 더한다. 키프레임은 기존 `mk-cdz1~8`을 그대로 쓴다. 553줄 넓은 그림 목록에 `.mk-sd`·`.mk-hm`을 넣는다.

- [ ] **Step 4: 통과 확인**

Run: `node tests/check.mjs`
Expected: `FAIL` 줄 없이 `OK <수>`

- [ ] **Step 5: 브라우저·break-ui 확인**
  - Review Focus 1 그림을 임시 키 `u-back-test`로 아무 back 카드 v에 잠깐 걸고 확인한다.
    - seq: 세로줄 4개(`브라우저`·`API 관문`·`미들웨어`·`저장소`), 메시지 8개(14자 글, 처리 1개, 실패 1개, 기다림 1개, 왼쪽 화살표 2개)
    - httpmsg 둘을 세로로: 요청(30자 첫 줄·헤더 4줄·본문 4줄, 30자 줄 강조), 응답 `503 Service Unavailable`
  - 넘침·작은 글자를 320/375/1280에서 본다. 화살표 머리가 받는 쪽 세로줄에 닿는지, 처리 상자가 그 열 가운데인지 화면으로 본다.
  - reduced-motion에서 8행이 모두 보이는지 본다.
  - 임시 키와 v를 지운다. `git diff`에 `u-back-test`가 없어야 한다.

- [ ] **Step 6: DESIGN.md·커밋**: 도우미 표에 `seq(lanes, msgs, {still,label})`·`httpmsg({kind,start,head,body,hl,label})`를 한 줄씩 넣는다(한도 seq 이름 8자·글 14자, httpmsg 줄 30자, "pair 왼쪽에 넣지 않음" 포함). 원장에 `Ruling: httpmsg 줄 한도 30자(Content-Type 헤더가 30자)`를 적는다.

```bash
git add index.html tests/check.mjs DESIGN.md
git commit -m "feat: 백엔드 그림 도우미 seq·httpmsg"
```

뒤이어 **디렉터 검토 묶음 A**

---

### Task 2: 하위항목 4개와 점검 기대값

**Files:**
- Modify: `index.html:1716`(CAT)
- Modify: `tests/check.mjs`(COUNT·REDRAWN·LATER, 새 back 점검 묶음)

**Interfaces:**
- Produces: 점검 이름 `bkcat`·`bkobj`·`bkukey`·`bksym`·`bkx`·`bkm`·`bkou`·`bkwrong`·`bksafe`·`bkshare`, 목록 `BK_TODO`·`BK_NOX`·`BK_SYM`·`BK_WRONG`, 함수 `BKS()`·`bkdiff()`·`BK_SECRET()`. Task 3~5와 계획서 ②는 목록과 기대값만 고친다.

- [ ] **Step 1: 실패하는 점검 쓰기**
  - `COUNT`에 넣는다(측정값): `'back/basic': 8, 'back/core': 12, 'back/motion': 7, 'back/adv': 8, 'back/api': 8, 'back/arch': 0, 'back/data': 0, 'back/job': 0, 'back/auth': 0, 'back/tip': 8`
  - `REDRAWN`에 `back/` 10개를 넣는다.
  - front 묶음(`fwrong`, 523줄) 뒤에 back 묶음을 둔다.

```js
const BKS = () => g.TERMS.filter(t => t.c === 'back');
check('bkcat', () => { const a = g.CATS.find(c => c.id === 'back').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,api,arch,data,job,auth,tip' ? '' : a; });
const BK_TODO = ["Server","Client","Request","Response","API","Endpoint","JSON","Database","HTTP","HTTP Method","REST API","CRUD","Authentication","Authorization","Middleware","Environment Variable","Validation","Webhook","Rate Limit","Session","Request Flow","Optimistic Update","Polling","WebSocket","Timeout","Retry","Queue","GraphQL","JWT","OAuth","Microservices","Monolith","Cache","ORM","Serverless Function","Request Header","Request Body","Query Parameter","Path Parameter","API Key","API Documentation","SDK","CORS","Logging","Error Handling","try-catch","Idempotent","Background Job","Mock Data","Pagination API","Health Check"];    // 아직 u-back- 그림이 아닌 옛 백엔드 카드. 다시 그리면 여기서 뺀다
const BK_NOX = ["Server","Client","Request","Response","API","Endpoint","JSON","Database","HTTP","HTTP Method","REST API","CRUD","Authorization","Middleware","Environment Variable","Validation","Webhook","Rate Limit","Request Flow","Optimistic Update","WebSocket","Timeout","Retry","Queue","GraphQL","JWT","OAuth","Monolith","Cache","ORM","Serverless Function","Request Header","Request Body","Query Parameter","Path Parameter","API Key","API Documentation","SDK","CORS","Logging","Error Handling","try-catch","Idempotent","Background Job","Mock Data","Pagination API","Health Check"];    // x를 아직 안 쓴 옛 카드. 계획서 ②가 비운다
const BK_SYM = ['Optimistic Update'];    // 기호가 남은 옛 카드. Task 4가 비운다
const bkdiff = (a, list) => [...a.filter(x => !list.includes(x)).map(x => '+' + x), ...list.filter(x => !a.includes(x)).map(x => '-' + x)].join(', ');
check('bkukey', () => bkdiff(BKS().filter(t => !(typeof t.v === 'string' && t.v.startsWith('u-back-') && g.D[t.v])).map(t => t.en), BK_TODO));
check('bkobj', () => BKS().filter(t => typeof t.v === 'object' && !BK_TODO.includes(t.en)).map(t => t.en).join(', '));    // 옛 형식 그림은 남은 목록 안에만
check('bksym', () => bkdiff(BKS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)}; return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en), BK_SYM));
check('bkx', () => bkdiff(BKS().filter(t => !t.x).map(t => t.en), BK_NOX));
check('bkm', () => BKS().filter(t => { const p = typeof t.v === 'string' && t.v.startsWith('u-back-') && g.D[t.v]; return p && !!p.m !== WA(p.h); }).map(t => t.en).join(', '));    // 재생 버튼(m)과 움직임(A)은 함께 있다
check('bkou', () => BKS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
const BK_WRONG = {'Access Token': ['Token'], 'Bearer Token': ['Token'], 'Streaming Response': ['Streaming', 'Streaming Output'], 'OAuth Scope': ['Scope'],
  'Event-driven Architecture': ['Event'], 'Worker': ['Service Worker', 'Web Worker'], 'Lock': ['Lock File', 'Account Lockout'], 'Route Handler': ['Routing']};    // 이름만 비슷한 다른 뜻
check('bkwrong', () => Object.entries(BK_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'back' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en).join(', '));
const BK_SECRET = s => (s.match(/[A-Za-z0-9_-]{24,}/g) || []).some(w => /\d/.test(w) && /[A-Za-z]/.test(w)) || /\bat\b[^\n]*\.(?:m?js|ts):\d+/.test(s) || /localStorage\.setItem\([^)]*(?:token|jwt|session)/i.test(s);    // 긴 영숫자 키·스택 추적·토큰 저장 모습
check('bksafe', () => [...['ab12'.repeat(7), 'at run (/app/server.js:12:5)', "localStorage.setItem('JWT', t)"].filter(x => !BK_SECRET(x)).map(x => '못 잡음 ' + x), ...(BK_SECRET('Access-Control-Allow-Origin') ? ['헤더 이름 오탐'] : []),
  ...BKS().filter(t => { const p = typeof t.v === 'string' && g.D[t.v]; return p && BK_SECRET(p.h.replace(/<[^>]+>/g, ' ') + ' ' + (p.cap || '')); }).map(t => t.en)].join(', '));
check('bkshare', () => ['input', 'progress', 'scale', 'pulse', 'spinner', 'stagger', 'typing', 'shake', 'pagination'].filter(k => !g.D[k]).join(', '));    // 옛 back 카드가 쓰던 공유 그림 키는 남긴다
```

  - 두 목록은 2026-11-03에 잰 값이다(back 51장, x 없는 47장). Step 2 전에 `head -121 tests/check.mjs`로 만든 임시 `tests/_cnt.mjs`에서 한 번 더 재서 같은지 보고 지운다.
  - `LATER`에 넣는다: `'font', 'doccount', 'redrawn:back/basic', 'redrawn:back/core', 'redrawn:back/motion', 'redrawn:back/adv', 'redrawn:back/api', 'redrawn:back/tip'`

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs`
Expected: `FAIL bkcat: basic,core,motion,adv,api,tip`, `FAIL count:back/arch: no sec ≠ 0`(data·job·auth도 같음). 아울러 `LATER redrawn:back/` 6개가 나온다. 나머지 새 점검(`bkukey`·`bkobj`·`bksym`·`bkx`·`bkm`·`bkou`·`bkwrong`·`bksafe`·`bkshare`)은 목록이 지금 상태와 같아서 통과한다.

- [ ] **Step 3: CAT 고치기**: 1716줄 `['api',…]` 뒤에 스펙 4장의 네 항목(`arch`·`data`·`job`·`auth`, 이름과 설명 그대로)을 넣는다.

- [ ] **Step 4: 통과 확인**

Run: `node tests/check.mjs`
Expected: `FAIL` 없이 `OK <수>`. `LATER` 줄은 `redrawn:back/` 6개이고, `font`·`doccount`는 아직 통과해서 줄이 안 나온다. 빈 하위항목 4개는 화면에서 "카드 없음"으로 보이고, Task 3·계획서 ②까지 이 상태다.

- [ ] **Step 4b: 돌연변이 확인**: `BK_TODO`에서 `"Server"`를 잠깐 빼면 `FAIL bkukey: +Server`, `BK_NOX`에서 빼면 `FAIL bkx: +Server`가 나오는지 보고 되돌린다(`git diff tests/check.mjs`로 원래대로인지 확인).

- [ ] **Step 5: 커밋**

```bash
git add index.html tests/check.mjs
git commit -m "feat: 백엔드 하위항목 4개와 점검 기대값"
```

---

### Task 3: arch·data 새 카드 23장 (공통 절차)

쓸 스킬: design-skills:ux-writing·interfaces:better-writing(d·x 문구), superpowers:test-driven-development

**Files:**
- Modify: `index.html`
  - 새 블록 `T('back','arch',[…])`·`T('back','data',[…])`를 `T('back','tip',…)` 앞에 둔다.
  - 그림은 `/* back: arch·data … */` 묶음으로 `const visual` 앞에 둔다.
- Modify: `tests/check.mjs`: EXPECT·COUNT·total

- [ ] **Step 1: 실패하는 점검**
  - `EXPECT['back/arch']`, `EXPECT['back/data']`: 아래 표 순서 그대로
  - `COUNT['back/arch'] = 11`, `COUNT['back/data'] = 12`
  - `total`: 1483 → 1506
- [ ] **Step 2: 실패 확인**: `FAIL expect:back/arch`·`expect:back/data`·`count:back/arch: 0 ≠ 11`·`count:back/data: 0 ≠ 12`·`total`. 새 카드를 넣는 중 x나 `u-back-` 그림이 빠지면 `bkx`·`bkukey`가 `+이름`으로 바로 잡는다.
- [ ] **Step 3~5**: 공통 절차 3~5. 모든 새 카드에 `x`와 `v:'u-back-<slug>'`를 넣는다. `m:1`은 Global Constraints 규칙대로다.
- [ ] **Step 6: 브라우저 확인**: `#/c/back/arch`, `#/c/back/data`
- [ ] **Step 7: 커밋**: `feat: 백엔드 서버 구조·데이터 주고받기 새 카드`

**카드와 그림**(코드 글은 그림에 그대로 쓴다. 숫자·이름은 예시. 줄 길이는 wlen 기준으로 잰 값이다):

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| arch | Node.js | 노드제이에스 · 서버용 자바스크립트 실행기 | `term`: `{c:'node server.js'}` · `{o:'3000번에서 기다려요(예시)'}`, `end:false`, cap "출력 글은 풀어 쓴 말이에요" | Runtime, Server |
| arch | Backend Framework | 백엔드 프레임워크 · 서버 뼈대 | `ide`: `app.get('/posts',` / `  (req, res) =>` / `  res.json(posts));` / `app.listen(3000);`, 단계 `{l:4}`·`{l:1, out:['GET /posts 받음']}`, cap "프레임워크마다 문법은 달라요(예시 문법)" | Framework, Route Handler |
| arch | Route Handler | 라우트 핸들러 · 주소별 처리 함수 | `ide`: `app.post('/posts',` / `  (req, res) => {` / `    save(req.body);` / `    res.status(201).end();` / `});`, 단계 `{l:1}`·`{l:3}`·`{l:4, out:['201 Created']}` | Endpoint |
| arch | Controller | 컨트롤러 · 요청을 받는 층 | `seq(['브라우저','컨트롤러','서비스'], [{0→1 'POST /posts'}, {1→1 '입력 꺼내기'}, {1→2 '글 만들어 줘'}, {2→1 '새 글'}, {1→0 '201 Created'}])` | Route Handler, Service Layer |
| arch | Service Layer | 서비스 층 · 업무 규칙 층 | `seq(['컨트롤러','서비스','저장소'], [{0→1 '글 만들기'}, {1→1 '제목 길이 검사'}, {1→2 '저장해 줘'}, {2→1 '저장됨'}, {1→0 '새 글'}])` | Controller, Repository Pattern |
| arch | Repository Pattern | 저장소 패턴 · DB 일을 맡는 층 | `seq(['서비스','저장소','DB'], [{0→1 'save(post)'}, {1→2 'INSERT …'}, {2→1 '저장됨'}, {1→0 '완료'}])`, cap "서비스는 SQL을 몰라도 돼요" | ORM, Database |
| arch | MVC | MVC · 모델·뷰·컨트롤러 | `doc` 표 `[['칸','하는 일','예'],['Model','데이터와 규칙','글'],['View','보여 줄 화면','글 목록'],['Controller','요청을 받아 둘을 이음','글 요청 처리']]` | Separation of Concerns, Controller |
| arch | Stateless vs Stateful | 무상태와 상태 유지 | `vs('상태 유지', 서버 두 대: 1번 서버 "민지 로그인 기억", 2번 서버 "누구세요?"(실패 꼬리표), '무상태', 요청마다 토큰을 들고 와서 어느 서버든 "민지" 확인)` 전용 HTML(`mk-bk` 접두사) | Session, JWT |
| arch | API Gateway | API 게이트웨이 · 서비스들의 앞문 | `seq(['앱','API 관문','주문'], [{0→1 'GET /orders'}, {1→1 '토큰 확인'}, {1→2 '주문 목록'}, {2→1 '목록'}, {1→0 '200 OK'}])` | Microservices, Reverse Proxy |
| arch | BFF | BFF · 화면 전용 백엔드 | `seq(['앱','BFF','글','회원'], [{0→1 '홈 화면 주세요'}, {1→2 '최신 글'}, {2→1 '글 3개'}, {1→3 '내 정보'}, {3→1 '이름'}, {1→1 '한 번에 묶기'}, {1→0 '200 OK'}])` | API Gateway |
| arch | BaaS | 백엔드 서비스 · 만들어 둔 백엔드 | `vs('직접 만듦', 칸 셋 "로그인 코드"·"DB 서버"·"파일 저장 코드", 'BaaS', 설정 화면 칸 셋 "로그인 켜짐"·"DB 켜짐"·"파일 저장 켜짐")` | Supabase, Serverless |
| data | Payload | 페이로드 · 실제로 보내는 내용 | `httpmsg({kind:'요청', start:'POST /api/orders', head:['Host: example.com','Content-Type: application/json'], body:['{"item":"책","qty":2}'], hl:['b0']})`, cap "주소·헤더를 뺀 알맹이" | Request Body |
| data | Content-Type | 콘텐츠 타입 · 내용 종류 표시 | `httpmsg({kind:'응답', start:'200 OK', head:['Content-Type: application/json'], body:['{"ok":true}'], hl:['h0']})` | Request Header, JSON |
| data | Serialization | 직렬화 · 보낼 수 있는 글로 바꾸기 | `track`: `{t:'객체', s:'done', w:'메모리 속 값'}` · `{t:'JSON.stringify', s:'done', w:'글로 바꿈'}` · `{t:'전송', s:'done', w:'글이 오감'}` · `{t:'JSON.parse', s:'done', w:'다시 객체'}` | JSON |
| data | DTO | DTO · 주고받는 데이터 모양 | `vs('DB 행 그대로', 줄 넷 id·email·passwordHash·createdAt(passwordHash 줄 "내보내면 안 됨" 꼬리표), 'DTO', 줄 둘 id·email)` 전용 HTML | Validation, Schema Validation |
| data | Error Response | 오류 응답 | `httpmsg({kind:'응답', start:'400 Bad Request', head:['Content-Type: application/json'], body:['{','  "error": "invalid_email",','  "message": "형식 오류"','}'], hl:['b1']})`, cap "스택 추적은 넣지 않아요" | HTTP Status Code, Error Handling |
| data | Schema Validation | 스키마 검사 | `ide`(`title:'schema.js'`): `const Post = schema({` / `  title: string().min(1),` / `});` / `{t:"Post.parse({ title: '' });", err:'제목이 비었어요'}`, 단계 `{l:4}`, cap "예시 문법, 오류 설명은 풀어 쓴 말" | Validation |
| data | Multipart Form Data | 멀티파트 폼 데이터 · 파일 담아 보내기 | `httpmsg({kind:'요청', start:'POST /upload', head:['Content-Type: multipart/…'], body:['--경계(예시)','form-data; name="photo"','(사진 파일 내용)','--경계(예시)--'], hl:['h0']})`, cap "Content-Type 값과 칸 머리 줄(Content-Disposition)을 줄였어요" | File Upload, Content-Type |
| data | UUID | UUID · 겹치지 않는 아이디 | `doc` 표 `[['방식','예','특징'],['순번','1, 2, 3','다음 번호를 짐작할 수 있어요'],['UUID','3f2a…-…(예시)','겹칠 걱정이 거의 없어요']]` | Primary Key |
| data | Cursor vs Offset Pagination | 커서와 오프셋 페이지 나누기 | `vs('오프셋 ?page=2', 1쪽 A·B·C → 새 글 N이 맨 앞에 낌 → 2쪽 C·D·E(C에 "또 나옴" 꼬리표), '커서 ?after=C', 다음 D·E·F)` 전용 HTML | Pagination API |
| data | API Versioning | API 버전 관리 | `doc`: 표 `[['주소','이름 칸'],['/v1/users','name'],['/v2/users','firstName, lastName']]` + 문단 "옛 앱은 v1을 계속 써요" | Semantic Versioning |
| data | OpenAPI | 오픈API · API 명세 형식 | `ide`(`title:'openapi.yaml'`): `paths:` / `  /posts:` / `    get:` / `      summary: 글 목록` / `      responses:` / `        '200':` / `          description: 성공`, 단계 `{l:2}`·`{l:4}`·`{l:7}` | API Documentation |
| data | Request ID | 요청 아이디 · 요청 추적 번호 | `term`(`title:'서버 로그'`, `end:false`): `{o:'[req-7f3a] GET /orders'}` · `{o:'[req-9b1c] GET /me'}` · `{o:'[req-7f3a] DB 조회 120ms'}` · `{e:'[req-7f3a] 결제 실패', h:'req-7f3a'}` | Logging |

- 표의 `{0→1 '…'}`는 `{from:0, to:1, t:'…'}`를 줄여 쓴 것이다(계획서 표기일 뿐 코드에 화살표를 쓰지 않는다).
- seq 세로줄 이름은 스펙 보충 목록 안에서만 쓴다. 측정(node, wlen): 이 계획서의 seq 글 89개는 모두 14자 이하다(14자는 7개: `'제목 길이 검사'`·`'홈 화면 주세요'`·`'내 정보 만들기'`·`'결제 완료 POST'`·`'다음 요청+쿠키'`·`'허용 헤더 확인'`·`'변환 일감 넣기'`). 세로줄 이름은 8자 이하다. 줄 글도 ide 28자·httpmsg 30자 안으로 쟀다.
- 전용 HTML(`mk-bk` 접두사)은 3장(Stateless vs Stateful·DTO·Cursor vs Offset Pagination)이다. `vs` 안쪽 칸은 좁으니 칸 글은 12자 이하로 하고, 320px에서 넘치면 칸을 세로로 쌓는다.

x 짝(스펙 5장):
- Node.js vs Server vs Backend(basics), Backend Framework vs Framework(basics)
- Route Handler vs Controller vs Service Layer vs Repository Pattern, MVC vs Separation of Concerns
- API Gateway vs BFF vs Reverse Proxy(server) vs Middleware, BaaS vs Serverless Function
- Payload vs Request Body, Content-Type vs Multipart Form Data, Serialization vs JSON
- DTO vs Schema Validation, Schema Validation vs Validation vs Form Validation(front)
- UUID vs Primary Key, Request ID vs Logging, Cursor vs Offset Pagination vs Pagination API, API Versioning vs Semantic Versioning, OpenAPI vs API Documentation

뜻이 다른 짝: Route Handler의 x는 web Routing(화면 주소에 맞는 화면 고르기)과 다르다고 쓰고, r에 넣지 않는다(`bkwrong`).

출처: Node.js 공식 문서(About Node.js), MDN Glossary(MVC·Payload body·Serialization·UUID), MDN HTTP Content-Type·Messages·`multipart/form-data`(POST 문서), RFC 7578 §4.2(칸마다 `Content-Disposition: form-data; name=…`), RFC 9110(상태 번호·Content-Type), RFC 9562(UUID), OpenAPI 명세(spec.openapis.org), MDN Glossary API·REST. 프레임워크 예 문법은 "예시 문법"으로만 쓴다.

뒤이어 **디렉터 검토 묶음 B**

---

### Task 4: 기존 basic·core·motion 27장 다시 그리기

**Files:**
- Modify: `index.html`
  - 카드 27장의 v를 `'u-back-<slug>'`로 바꾼다.
  - 그림은 `/* back: 다시 그리기 basic·core·motion … */` 묶음으로 둔다. 상태 함수는 그 `Object.assign` 바로 앞 `const`로 둔다.
- Modify: `tests/check.mjs`: `BK_TODO`에서 27장을 빼고 `BK_SYM`을 비우고, `LATER`에서 `redrawn:back/basic·core·motion`을 빼고, `bkstill`을 더한다.

**Interfaces:**
- Consumes: `seq`·`httpmsg`(Task 1), `track`·`doc`·`pair`·`vs`·`browser`·`fcss`
- Produces(계획서 ②가 버튼을 붙일 상태 함수):
  - `BRL = {max: 4, win: '10초'}`(예시 값)
  - `brate(sent: number) → string`: 보낸 요청 수만큼 행을 그린다(최대 6행, 넘으면 마지막 6행). k번째가 `max` 이하면 `200 OK`, 넘으면 `429 Too Many Requests` + 꼬리표 "실패" + "잠시 뒤 다시". 위에 `보낸 요청 n번 · 10초에 4번까지(예시)`.
  - `brateSay(sent) → string`: 0번이면 `'아직 보낸 요청이 없어요'`, max 미만이면 `'${n}번째 요청은 통과했어요. ${max - n}번 더 보낼 수 있어요'`, max와 같으면 `'${n}번째 요청은 통과했어요. 이제 더 보낼 수 없어요'`, 넘으면 `'${n}번째 요청은 429예요. 시간이 지나면 다시 보낼 수 있어요'`
  - `BAZ = {'일반 회원': {st: '403 Forbidden'}, '관리자': {st: '200 OK'}}`
  - `bauthz(role: string) → string`: `httpmsg` 요청 `DELETE /posts/7`(헤더 `Authorization: Bearer …`) 아래 `httpmsg` 응답 `BAZ[role].st`
  - `bauthzSay(role) → string`: 일반 회원 `'로그인은 됐지만 권한이 없어요. 403이에요'`, 관리자 `'관리자라서 지울 수 있어요. 200이에요'`
  - 상태 함수 그림의 행은 `<li>`이고, 그 밖에 `<li>`를 쓰지 않는다(`bkstill`이 행 수를 `<li`로 센다).
  - 없는 역할·음수·정수 아닌 sent는 `'brate: '`·`'bauthz: '` 오류를 던진다.

- [ ] **Step 1: 점검**
  - `BK_TODO`에서 basic·core·motion 27장(`"Server"`~`"Queue"`)을 빼고, `BK_SYM`을 `[]`로 비운다.
  - `LATER`에서 `redrawn:back/basic`·`redrawn:back/core`·`redrawn:back/motion`을 뺀다.
  - 멈춘 직접 조작 그림과 상태 함수를 보는 점검을 더한다.

```js
check('bkstill', () => vm.runInContext(`(() => { const bad = [], n = (h, re) => (h.match(re) || []).length;
  if (n(brate(0), /<li/g) !== 0 || n(brate(4), /200 OK/g) !== 4 || brate(4).includes('429') || brate(4).includes('실패')) bad.push('brate 0·4');
  if (n(brate(5), /429 Too Many Requests/g) !== 1 || n(brate(5), /200 OK/g) !== 4 || !brate(5).includes('실패')) bad.push('brate 5');
  if (n(brate(9), /<li/g) !== 6) bad.push('brate 6행');
  if (!brateSay(0).includes('없어요') || !brateSay(3).includes('1번 더') || !brateSay(4).includes('이제 더 보낼 수 없어요') || !brateSay(5).includes('429')) bad.push('brateSay');
  const u = bauthz('일반 회원'), a = bauthz('관리자');
  if (!u.includes('403 Forbidden') || u.includes('200 OK') || !a.includes('200 OK') || a.includes('403') || !bauthzSay('일반 회원').includes('권한이 없어요')) bad.push('bauthz');
  [() => brate(-1), () => brate(1.5), () => bauthz('손님')].forEach((f, i) => { try { f(); bad.push('안 막음 ' + i); } catch (e) { if (!/^(brate|bauthz): /.test(e.message)) bad.push('메시지 ' + i); } });
  return bad.join(', '); })()`, ctx));
```

- [ ] **Step 2: 실패 확인**
  - `FAIL bkukey: +Server, +Client, …`(27장), `FAIL bkobj`(그중 객체 v 카드), `FAIL bksym: +Optimistic Update`
  - `FAIL redrawn:back/basic`·`core`·`motion`(flow·stack 그림 카드들)
  - `FAIL bkstill: brate is not defined`
- [ ] **Step 3: 그림**: 스펙 3.3 표의 basic·core·motion 27장대로 그린다. 정해 둔 것:
  - Server: `seq(['브라우저','서버'], [{0→1 '회원 정보 줘'}, {1→1 '회원 찾기'}, {1→0 '민지 정보'}])`
  - Database: `seq(['서버','DB'], [{0→1 '글 저장'}, {1→0 '저장됨'}, {0→1 '글 목록 조회'}, {1→0 '글 3개'}])`
  - Request: `httpmsg({kind:'요청', start:'POST /api/posts', head:['Content-Type: application/json'], body:['{"title":"첫 글"}'], hl:['b0']})`
  - Response: `httpmsg({kind:'응답', start:'201 Created', head:['Content-Type: application/json'], body:['{"id":7}'], hl:['start']})`
  - HTTP: 위 Request·Response와 같은 꼴 두 개를 세로로 쌓고 사이에 이름표 "주고받는 약속"(`mk-bk` 칸, 기호 없음)
  - HTTP Method: `doc` 표에 PUT 포함 5줄(스펙 3.3)
  - Authentication: `seq(['브라우저','서버'], [{0→1 '로그인 정보'}, {1→1 '비밀번호 확인'}, {1→0 '로그인됨'}])`
  - Authorization ▶: 멈춘 그림은 `bauthz('일반 회원')` 위에 역할 표시 "역할: 일반 회원(예시)"
  - Middleware: `seq(['브라우저','미들웨어','라우트'], [{0→1 'GET /mypage'}, {1→1 '로그인 검사'}, {1→2 '통과'}, {2→2 '내 정보 만들기'}, {2→0 '200 OK'}])`
  - Environment Variable: `pair(fcss('.env', 'API_KEY=sk_test_…'), fcss('server.js', 'process.env.API_KEY'))` 꼴. 값은 줄임표 예시
  - Validation: `seq(['브라우저','서버'], [{0→1 '이메일 abc'}, {1→1 '형식 검사'}, {1→0 '400', err:1}])`
  - Webhook: `seq(['결제사','내 서버'], [{0→1 '결제 완료 POST'}, {1→1 '서명 확인'}, {1→0 '200 받음'}])`
  - Rate Limit ▶: 멈춘 그림은 `brate(5)`
  - Session: `seq(['브라우저','서버','저장소'], [{0→1 '로그인'}, {1→2 '세션 만들기'}, {1→0 '쿠키 sid=…'}, {0→1 '다음 요청+쿠키'}, {1→2 'sid 찾기'}])`
  - Request Flow: `seq(['브라우저','서버','DB'], [{0→1 '글 목록 요청'}, {1→2 '조회'}, {2→1 '결과'}, {1→0 '응답'}, {0→0 '화면 갱신'}])`
  - Polling: `seq(['브라우저','서버'], [{0→1 '새 글?'}, {1→0 '없음'}, {0→1 '새 글?'}, {1→0 '없음'}, {0→1 '새 글?'}, {1→0 '있음'}])`
  - WebSocket: `seq(['브라우저','서버'], [{0→1 '연결 한 번'}, {1→0 '새 메시지'}, {0→1 '채팅 글'}, {1→0 '또 새 메시지'}])`, cap "연결 하나로 양쪽이 아무 때나 보내요"
  - Retry: `seq(['브라우저','서버'], [{0→1 '요청'}, {1→0 '503', err:1}, {0→1 '다시 요청'}, {1→0 '200 OK'}])`
  - Optimistic Update·Timeout·Queue·CRUD: `track`. Timeout은 "5초(예시)"를 쓰고, Optimistic Update의 되돌림 단계는 `fail`이다.
  - Client·API·Endpoint·JSON·REST API: 스펙 3.3대로(`browser`·`pair`+`fcss`·`doc`). API의 날씨 "맑음 18도(예시)".
  - `m:1`은 Global Constraints 규칙대로다. 직접 조작 두 장(멈춘 그림)은 `m`이 없다.
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER` 줄은 `redrawn:back/adv·api·tip` 3개다(새 글자가 서브셋에 없으면 `font`도 나온다).
- [ ] **Step 5: 브라우저 확인**: basic·core·motion
- [ ] **Step 6: 커밋**: `feat: 백엔드 basic·core·motion 그림 27장 다시 그리기`

---

### Task 5: 기존 adv·api·tip 24장 다시 그리기

**Files:**
- Modify: `index.html`
  - 카드 24장의 v
  - 새 묶음 `/* back: 다시 그리기 adv·api·tip … */`
- Modify: `tests/check.mjs`: `BK_TODO`를 비우고, `LATER`에서 `redrawn:back/adv·api·tip`을 빼고, `bkstill`에 두 함수를 더한다.

**Interfaces:**
- Produces(계획서 ②가 버튼을 붙일 상태 함수):
  - `bcache(log: Array<'miss' | 'hit'>) → string`: 요청마다 한 행. miss는 `DB까지 다녀옴 · 느림(예시 300ms)`, hit는 `캐시에 있음 · 빠름(예시 5ms)`. 최대 6행(넘으면 마지막 6행).
  - `bcacheSay(log) → string`: 빈 배열이면 `'아직 보낸 요청이 없어요'`, 마지막이 miss면 `'캐시에 없어서 DB까지 다녀왔어요'`, hit면 `'캐시에 있어서 바로 왔어요'`
  - `bidem(method: 'POST' | 'PUT', times: number) → string`: `${method} 요청을 ${times}번 보냄` 아래 글 목록. POST면 글 `times`개, PUT이면 1개(times가 0이면 0개)
  - `bidemSay(method, times) → string`: `'POST를 ${n}번 보내서 글이 ${n}개예요'` / `'PUT을 ${n}번 보내도 글은 1개예요'`(0번이면 `'아직 보내지 않았어요'`)
  - 잘못된 log 값·method·times(음수·정수 아님)는 `'bcache: '`·`'bidem: '` 오류를 던진다.

- [ ] **Step 1: 점검**
  - `BK_TODO`를 `[]`로 비운다. `LATER`에서 `redrawn:back/adv`·`redrawn:back/api`·`redrawn:back/tip`을 뺀다.
  - `bkstill`의 `return` 앞에 더한다:

```js
  if (!bcache(['miss', 'hit']).includes('느림') || !bcache(['miss', 'hit']).includes('빠름') || (bcache(Array(8).fill('hit')).match(/<li/g) || []).length !== 6) bad.push('bcache');
  if (!bcacheSay([]).includes('없어요') || !bcacheSay(['miss']).includes('DB까지') || !bcacheSay(['miss', 'hit']).includes('바로')) bad.push('bcacheSay');
  if ((bidem('POST', 3).match(/<li/g) || []).length !== 3 || (bidem('PUT', 3).match(/<li/g) || []).length !== 1 || (bidem('PUT', 0).match(/<li/g) || []).length !== 0) bad.push('bidem');
  if (!bidemSay('POST', 3).includes('3개') || !bidemSay('PUT', 3).includes('1개') || !bidemSay('PUT', 3).startsWith('PUT을')) bad.push('bidemSay');
  [() => bcache(['x']), () => bidem('GET', 1), () => bidem('POST', -1), () => bidem('PUT', 1.5)].forEach((f, i) => { try { f(); bad.push('안 막음 c' + i); } catch (e) { if (!/^(bcache|bidem): /.test(e.message)) bad.push('메시지 c' + i); } });
```

- [ ] **Step 2: 실패 확인**
  - `FAIL bkukey: +GraphQL, …`(24장)
  - `FAIL bkobj`: 남은 객체 v 20장(GraphQL, JWT, OAuth, Microservices, Monolith, Cache, ORM, Serverless Function, Request Header, Request Body, Query Parameter, Path Parameter, API Key, API Documentation, SDK, CORS, try-catch, Idempotent, Mock Data, Health Check)
  - `FAIL redrawn:back/adv`·`api`·`tip`, `FAIL bkstill: bcache is not defined`
- [ ] **Step 3: 그림**: 스펙 3.3 표의 adv·api·tip 24장대로 그린다. 정해 둔 것:
  - OAuth: `seq(['브라우저','내 서버','로그인'], [{0→2 '로그인 화면'}, {2→2 '사용자 동의'}, {2→0 '코드 들고 옴'}, {0→1 '코드 전달'}, {1→2 '토큰으로 교환'}, {2→1 '토큰'}])`. 마지막 두 행은 서버끼리다(RFC 6749 §4.1). cap "이 방식(인가 코드)에서는 토큰이 브라우저를 거치지 않아요"
  - Microservices: `seq(['주문','결제','알림'], [{0→1 '결제 요청'}, {1→0 '완료'}, {0→2 '알림 보내기'}])`
  - CORS: `seq(['브라우저','외부'], [{0→1 'GET /data'}, {1→0 '응답'}, {0→0 '허용 헤더 확인'}, {0→0 '읽기 막음', err:1}])`. cap "단순 요청 기준, 서버는 이미 처리했을 수 있어요"
  - Request Header·Request Body: `httpmsg` 요청 `POST /api/posts`, 헤더 2줄·본문 3줄, 각각 `h0`·`b1` 강조
  - API Key: `httpmsg` 요청 `GET /v1/weather`, 헤더 `x-api-key: sk_test_…` 강조. 그 위 이름표 "내 서버가 보냄", 아래 "화면 코드에 두지 않아요"(`mk-bk` 칸)
  - Pagination API: `httpmsg` 요청 `GET /posts?page=2&limit=10`, 첫 줄 강조
  - Health Check: `httpmsg` 응답 `200 OK`, 헤더 `Content-Type: application/json`, 본문 `{"status":"ok"}`
  - Background Job: `seq(['브라우저','서버','워커'], [{0→1 '사진 올리기'}, {1→2 '변환 일감 넣기'}, {1→0 '202 접수됨'}, {2→2 '썸네일 만들기'}])`. 일감을 넣은 뒤에 202를 보낸다. cap "접수만 하고 일은 워커가 나중에 해요"(RFC 9110 §15.3.3)
  - Cache ▶: 멈춘 그림은 `bcache(['miss', 'hit'])`. Idempotent ▶: 멈춘 그림은 `vs('POST', bidem('POST', 3), 'PUT', bidem('PUT', 3))`
  - JWT: `doc` 블록 셋(헤더 · 내용 · 서명)과 문단 "내용은 누구나 읽을 수 있어요". 값은 `eyJ…` 줄임표
  - Logging: `term`(`title:'서버 로그'`, `end:false`) 세 줄 `{o:'10:02:11 GET /posts 200 (예시)'}` 꼴
  - try-catch: `ide`(`try {` / `  await pay();` / `} catch (e) {` / `  log(e.message);` / `}`), 단계 `{l:2, out:[{t:'결제 실패', dim:1}]}`·`{l:4, out:['오류 남김']}`
  - GraphQL·ORM·Mock Data·Path Parameter·Query Parameter·API Documentation·SDK·Monolith·Serverless Function·Error Handling: 스펙 3.3대로. 코드 칸은 `fcss`.
  - `m:1`은 Global Constraints 규칙대로다. 직접 조작 두 장(멈춘 그림)은 `m`이 없다.
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER` 줄은 `doccount`, 그리고 서브셋에 없는 새 글자가 있으면 `font`(예: '녀')다.
- [ ] **Step 5: 브라우저 확인**: adv·api·tip, 그리고 basic~data 전체를 한 번 더(공유 CSS 영향)
- [ ] **Step 6: 커밋**: `feat: 백엔드 adv·api·tip 그림 24장 다시 그리기`

뒤이어 **디렉터 검토 묶음 C**. 반영 뒤 원장과 체크포인트 메모리를 갱신하고, 계획서 ②를 쓴다.
