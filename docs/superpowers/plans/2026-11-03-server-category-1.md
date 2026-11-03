# 서버 카테고리 보강 실행 계획 ①

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 서버 카테고리에 다음을 넣는다.
- 새 그림 도우미 `srvmap()`·`metric()`
- 빈 하위항목 4개(`conf`·`scale`·`res`·`infra`)와 server 점검 묶음
- 기존 46장 전부 전용 그림(`u-server-`)으로 다시 그리기. 직접 조작 2장(Load Balancer·Failover)은 멈춘 그림까지만
- 기존 46장 모두 x 채우기

남은 일(새 카드 46장, 직접 조작 4장 붙이기, 증상 12개, 글꼴·문서)은 계획서 ②가 한다.

**Architecture:** `index.html` 하나에서 작업한다.
- 도우미는 `erd`(4301~4329줄) 뒤, `/* 직접 조작 도우미 … */`(4330줄) 앞에 둔다.
- CSS는 db CSS(450~463줄) 뒤에 두고, `.mk-svd.A` 규칙은 520줄 `.mk-cds.A`·`.mk-dqm.A` 옆에 둔다.
- 그림은 db 그림 묶음 뒤(마지막 db 묶음 8284줄~), `const visual`(8335줄) 앞에 `/* server: <묶음> … */` 주석 + `Object.assign(D, {...})`로 더한다. back 조각 `bkStack`·`bkBox`·`bkRows`·`bkPills`(7862~7864줄)가 먼저 정의돼 있다.
- 줄 번호는 2026-11-03 측정값이다. 앞 Task가 줄을 늘리므로 실행 때 `grep -n`으로 다시 찾는다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP

**Spec:** [docs/superpowers/specs/2026-11-03-server-category-design.md](../specs/2026-11-03-server-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치**: `server-category`(지금 브랜치)에서 계속한다. 계획서 ②도 같은 브랜치다.
- **클래스 접두사**: `srvmap` = `mk-sv*`(요청 점 키프레임 `mk-srv1~4`), `metric` = `mk-mg*`, 멈춘 직접 조작 그림·server 전용 조각 = `mk-sg*`.
  - 측정: `mk-sv`·`mk-srv`·`mk-mg`·`mk-sg`는 0건이다. `mk-mt`는 `track`이 쓰므로(`mk-mtl`·`mk-mtc` 등) 쓰지 않는다.
- **D 키**: `'u-server-' + slug(en)`. 예: `200 OK` → `u-server-200-ok`, `Request-Response Cycle` → `u-server-request-response-cycle`. 실제 키는 `slug()`가 정하고 `srvukey`가 `D`에 있는지 본다.
- **설명 문단**: 그림 아래 짧은 글은 db가 만든 `<p class="mk-dgp">…</p>`(455줄 CSS)를 그대로 쓴다. 새 CSS를 만들지 않는다.
- **srvmap 세부**:
  - 상태 꼬리표 `STL = {busy:'바쁨', down:'고장', new:'새로 켬', drain:'정리 중', off:'꺼짐'}`.
  - 서버 상자의 "요청 n"은 `st`가 `down`·`off`가 아닐 때만 쓴다(`got` 0도 "요청 0"으로 쓴다). 고장·꺼짐은 꼬리표만 쓴다.
  - 요청 점 차례 k는 서버 순서(1~4)다. 점은 `got > 0`이고 `st`가 `drain`이 아닌 서버에만 있다(Connection Draining은 새 요청을 받지 않는다는 뜻이라 "요청 n"만 쓴다).
- **요청 점 길이(Ruling)**: 스펙 3.1은 점이 사용자 줄에서 서버 상자로 내려간다고 쓰지만, 점은 서버 칸 위 고정 2em에서만 내려온다. 서버 수·front·db 유무마다 길이를 따로 계산하지 않기 위해서다. 점은 장식이고, 받은 수는 "요청 n" 글과 sr 문장이 전한다. 틀리면 키프레임 하나를 바꾸면 된다.
- **metric 세로축(Ruling)**: 스펙 3.2에 없는 세로축 이름표 `0`(아래)·`${max}${unit}`(위)를 HTML로 둔다. 눈금이 없으면 초보자가 높이를 읽지 못한다. 한도 이름표는 `${limit.n} ${limit.v}${unit}`로 쓴다.
- **metric `unit`은 꼭 준다**(빈 글자 금지). 스펙 3.3·3.4의 `metric`은 모두 단위가 있다.
- **측정값 보정(원장 `Ruling:`)**:
  - Self-hosting은 이미 r에 `Hosting`이 있다(측정). 스펙 4장의 "Self-hosting↔Hosting 추가"는 할 일이 없다.
  - 지금 x가 있는 Docker(`"내 컴퓨터에선 되는데" 문제를 줄여 줘요.`)·401 Unauthorized(`401=누구인지 모름, 403=…`)는 둘 다 1문장이라 `srvxn`에 걸린다. Task 2에서 새로 쓴다. 그래서 `SRV_NOX`는 44장이다.
  - 옛 p 두 장 Scaling·Failover는 `~수 있어?`로 끝나 `srvtext`(p는 `~줘`)에 걸린다. 미루지 않고 Task 2에서 고친다.
  - `redrawn:` 점검에 지금 걸리는 sec(flow·big·stack 그림, 측정): basic 4장, core 6장, motion 2장, adv 6장, tip 4장. status는 0장이라 처음부터 통과한다.
- **멈춘 직접 조작 그림**: Load Balancer는 `slb('rr')`, Failover는 `sfail(true)`. 둘 다 `srvmap({still:true})`라 `m`이 없다. 계획서 ②가 같은 함수에 고르기 버튼을 붙인다.
- **3칸 환경 그림**: Production·Development Environment·Staging은 상태 함수 `senv(on, t)` 하나로 그린다(강조 칸과 글만 다름).
- **점검 이름**: `srv` 접두사로 쓴다: `SRVS`·`srvcat`·`srvukey`·`srvobj`·`srvsym`·`srvx`·`srvm`·`srvou`·`srvwrong`·`srvtext`·`srvxn`·`srvsafe`·`srvshare`·`srvsameh`·`srvhelp`·`srvstill`·`srvrel`·`srvxhas`. 측정: `check('srv`는 0건이다. 차이 함수는 back의 `bkdiff`를 쓴다.
- **남은 옛 카드 목록**(back `BK_TODO` 방식, 목록과 실제가 다르면 `+이름`·`-이름`으로 실패):
  - `SRV_TODO`: 아직 `u-server-` 그림이 아닌 옛 카드. Task 2에 46장, Task 3에서 basic·core·motion 20장을 빼고, Task 4에서 비운다. `srvukey`가 본다. `srvobj`는 객체 v 카드가 이 목록 밖에 있으면 실패한다.
  - `SRV_NOX`: x가 없는 옛 카드 44장. `SRV_TODO`를 복사하지 않고 이름을 직접 적는다. Task 5가 비운다. `srvx`가 본다.
  - 기호가 남은 옛 그림은 `srvsym`이 목록 없이 0장을 본다(Task 2 Step 2에서 걸리면 그 카드는 Task 3·4 다시 그리기로 사라지므로 `LATER`에 `srvsym`을 두고 Task 4에서 뺀다).
- **LATER 사용**: `redrawn:server/basic·core·motion`은 Task 3, `redrawn:server/adv·tip`은 Task 4에서 뺀다. `font`는 계획서 ②가 뺀다(새 글자가 서브셋에 없을 수 있음). ①은 카드 수가 그대로라 `total`·`doccount`는 통과한다.
- **r 시점**: ①은 Task 5에서 기존 카드에만 단다(스펙 4장 "기존 server 카드에도 r을 더한다"). 새 카드의 r은 계획서 ②가 그 카드를 넣을 때 단다(스펙 4장 후보).

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN은 쓰지 않는다.
- 색은 도판 토큰(`--ink`·`--plate`·`--fig`·`--rule`·`--muted`·`--mark`·`--mark-bg`·`--mark-text`·`--ok`·`--mono`·`--sans`)만 쓴다. hex 값을 새로 쓰지 않는다.
- 그림 글자는 11px 이상이다. `.fig`에는 그림자를 넣지 않는다.
- 자동 애니메이션은 클래스 `A`를 쓴다. 주기 10s, 멈춘 장면은 `-8.8s`다.
- `m:1`은 그림 h에 `A` 클래스가 있으면 달고, 없으면 달지 않는다. still이 아닌 `srvmap`·`seq`·`track`·`doc`·`term`이 `A`를 만든다. `metric`·`fcss`·`vs`·`bk*` 조각만 있는 그림과 멈춘 직접 조작 그림은 `m`이 없다. 점검 `srvm`이 양쪽을 본다.
- 글 폭은 `wlen`(한글 2, 그 밖 1)으로 센다. 한도: `srvmap` user·front·db 10폭, 서버 1~4대·이름 6폭·tag 6폭, note 28폭, got 0~99 / `metric` 선 1~3개·이름 10폭, pts 4~12개, x 5폭, unit 4폭, limit·mark 이름 10폭 / `seq` back 한도(세로줄 3개면 이름 8폭·4개면 6폭, 메시지 8개, 글 14폭) / `httpmsg` 줄 30폭, head·body 4줄.
- 예시 IP는 `192.0.2.x`·`198.51.100.x`·`203.0.113.x`, 도메인은 `example.com`만 쓴다. 예시 이름은 민수·지영·준호만 쓴다. 비밀번호·키는 `****`로 가린다.
- 그림 속 숫자·시각·건수·버전은 cap이나 꼬리표로 "예시"를 표시한다.
- 상태는 색만으로 나누지 않는다(글자 꼬리표 "고장"·"바쁨"·"강조"·"실패"를 함께, 고장은 점선 테두리).
- 읽히는 글에 `✓✕★→←↑↓`를 쓰지 않는다(`wsym` 규칙). 표의 `→`는 차례를 적은 것이다.
- 설정 파일은 `fcss`(Nginx 문법), 명령은 `term`이다. `ide`를 쓰지 않는다. `httpmsg` 응답 첫 줄은 숫자로 시작한다(`HTTP/1.1` 금지).
- `vs` 한 칸은 320px에서 약 96px라 짧은 글만 넣는다. 상자·코드 비교는 `bkStack`으로 세로로 쌓는다.
- 브랜드: 로고를 쓰지 않는다. Nginx·Apache·AWS·EC2·S3·RDS·Docker·Kubernetes·Let's Encrypt는 카드 주제이거나 "예"일 때만 쓴다.
- 카드 문구:
  - `x`는 해요체 2~3문장이고, 짝이 있으면 차이를 먼저 쓴다(스펙 5장 짝 목록). 기존 `d`는 바꾸지 않는다.
  - `p`는 "~해줘" 지시문이다.
  - 버전 숫자와 "가장 빠른·최신" 같은 단정을 쓰지 않는다. 인증서 수명은 날짜를 박지 않고 "줄어드는 중"으로 쓴다.
- `r`은 1~3개이고, 이미 있는 카드만 단다. 뜻이 다른 짝(`SRV_WRONG`)은 r에 넣지 않는다. 다른 카테고리 카드 본문은 바꾸지 않는다.
- 커밋:
  - 한국어 `feat:`/`fix:`/`docs:`로 쓰고 attribution 줄을 넣지 않는다.
  - `.impeccable/hook.cache.json`·`core375.png`는 스테이징하지 않는다. 경로를 지정해서 올리고 `git add -A`·`-a`는 쓰지 않는다.
- Python은 `newline='\n'`로 쓰고 `python -E`로 돌린다. 정규식이 든 스크립트는 heredoc이 아니라 Write 도구로 쓴다. 입력 없는 `cat >`를 쓰지 않는다.
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필·저장된 로그인은 쓰지 않고, `state save` 파일도 만들지 않는다.

## Review Focus

1. **320px의 가장 큰 입력**: `srvmap` 서버 4대 × 이름 6폭 + 꼬리표 7폭(`새로 켬`) + "요청 99" + tag 6폭 + front·db 10폭 + note 28폭, `metric` 선 3개 × 12점 + x 이름표 12개 × 5폭 + limit·mark 10폭이 가로 넘침·겹침 없이 들어가야 한다. → Task 1 Step 5(임시 키 `u-server-test`, 커밋 전에 지움). 서버 4대가 넘치면 2대씩 두 줄로 접는다. 폭 한도는 낮추지 않는다(스펙 3.1·10장).
2. **metric 끝값**: 값이 모두 0, 모두 같음, 가장 높은 값이 둘 이상(첫 시점을 읽음), 값이 `max`와 같음, `mark`가 첫 점·끝 점일 때 선·표시·sr이 깨지지 않아야 한다. → Task 1 `srvhelp`(같은 값 선 `c`, 첫 점 mark), Step 5 화면
3. **색 없이 읽히는 상태와 멈춘 장면**: 고장·꺼짐 서버는 점선과 글자 꼬리표가 있고 요청 점이 없다. reduced-motion·still에서는 점이 하나도 보이지 않고 "요청 n" 글은 그대로 보인다. → Task 1 `srvhelp`·`cdframe`(`svd`·`srv1~4`), Step 5 reduced-motion
4. **자주 틀리는 HTTP·서버 사실**: 502(위쪽 서버가 이상한 답) vs 504(답이 없음) vs 503(잠시 받을 수 없음), 401은 `WWW-Authenticate`를 함께 보냄, 301은 영구 이동, 429의 `Retry-After`, Docker 컨테이너는 VM과 달리 운영체제를 통째로 담지 않음, 업타임 99.9%는 30일에 약 43분. RFC 9110·MDN·공식 문서와 다르면 안 된다. → Task 2·3·4·5 출처 확인, 디렉터 검토 B·C
5. **진짜처럼 보이는 주소·비밀 값**: 그림에 문서용 대역이 아닌 IP(`10.0.0.5`·`8.8.8.8` 등), 가리지 않은 접속 비밀번호, 전화번호 전체가 없어야 한다(`127.0.0.1`·`0.0.0.0`은 허용). → Task 2 `srvsafe`

---

## 공통 절차 (Task 3~5)

1. **실패하는 점검 추가**(`tests/check.mjs`): 그 Task가 적은 기대값을 먼저 넣는다.
2. **실패 확인**: `node tests/check.mjs > <작업 폴더>/check.txt 2>&1` 뒤 `tail` → Task가 적은 `FAIL` 줄이 나온다. 60~100초 걸리니 Bash timeout은 240000이다.
3. **사실 확인**: 카드마다 1차 출처(RFC 9110·MDN·nginx.org·공식 문서 우선)를 열어 확인하고, 원장에 `Task N 출처: <en> — <URL>`을 적는다.
4. **데이터·그림**: Task 표대로 넣는다. 그림 묶음 주석에 출처와 "예시" 값을 적는다(db 묶음 주석 형식).
5. **점검 통과**: `FAIL` 줄 없이 `OK <수>`. `LATER`는 그 시점에 남아 있어야 할 것만 있다.
6. **브라우저 확인**(아래 절차)
7. **커밋**: Task가 적은 메시지로 커밋하고, 원장 갱신을 같은 호출에서 한다.

### 브라우저 확인 절차

- **서버**: scratchpad에 `index.html`을 복사한 폴더에서 `python -E -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다. 끝나면 TaskStop으로 멈춘다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/server/<sec>`(해시만 바꾸면 새로 불러오지 않으니 `?r=`를 바꾼다)
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**
  - 페이지: `document.documentElement.scrollWidth <= innerWidth` → `true`
  - 그림 안: `[...document.querySelectorAll('#view .fig .stage *')].filter(s => !s.closest('.sr') && s.scrollWidth > s.clientWidth + 1 && getComputedStyle(s).overflow !== 'visible')` → `[]`
- **작은 글자**: `#view .fig .stage *` 중 `.sr`·장식(`aria-hidden` 점) 밖의 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900, 375×812, 320×700에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)
- **reduced-motion**: `browser_emulate_media({reducedMotion:'reduce'})` 뒤 새로고침한다. 자동 재생이 없고, 재생 버튼이 동작해야 한다.

### 디렉터 검토 시점

디렉터 에이전트(Opus 5.5, effort high)에게 맡긴다. 압축 뒤라 ID를 모르면 새로 띄운다.
- **묶음 A — 도우미**: Task 1 뒤
- **묶음 B — 다시 그리기**: Task 4 뒤(Task 3~4 diff)
- **묶음 C — x 문구**: Task 5 뒤

결과 처리:
- Critical·Important·Minor 모두 고친다(사용자 지시). 고칠 것은 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN). 점검으로 잡기 어려운 문구 지적은 고친 뒤 원장에만 적는다.
- 원장에 `Review <묶음>: fixed …`로 적는다. 고치지 않기로 한 지적은 `Ruling:`에 이유를 적는다.

---

### Task 1: 도우미 `srvmap()`·`metric()`

쓸 스킬: superpowers:test-driven-development, break-ui(시험 그림), interfaces:better-layout

**Files:**
- Modify: `index.html`
  - 새 도우미: `erd` 뒤, 4330줄 `/* 직접 조작 도우미 … */` 앞
  - CSS: 463줄(`.mk-erl`) 뒤. `.mk-svd.A` 규칙은 520줄 `.mk-dqm.A` 옆, 키프레임 `mk-srv1~4`는 522줄 키프레임 옆
  - 582줄 `.fig:has(…,.mk-er) .stage{padding-bottom:14px}` 목록에 `.mk-sv`·`.mk-mg` 추가
- Modify: `tests/check.mjs`: `dbstill`(393~406줄) 뒤에 `srvhelp`, `bkpad`(407줄) 배열에 `'mk-sv', 'mk-mg'`, `cdframe`(804줄)에 `svd`·`srv1~4`
- Modify: `DESIGN.md`: 도우미 표에 두 줄

**Interfaces:**
- Produces:
  - `srvmap({user = '사용자', front, servers, db, note, still = false, label} = {}) → string`
    - 바깥 `<div class="mk-sv">`. `label`이 있으면 ` role="group" aria-label="${esc(label)}"`(tabindex 없음).
    - 그림 몸 `<div class="mk-svp" aria-hidden="true">` 안에 위에서 아래로: 사용자 줄 → front 줄(있을 때) → 서버 줄 `<div class="mk-svs" style="--n:${서버 수}">` → db 줄(있을 때) → note `<p class="mk-svn">${note}</p>`(있을 때).
    - 상자: `<div class="mk-svb mk-sv-${st}">${이름}${st !== 'ok' ? `<b class="mk-svk">${STL[st]}</b>` : ''}</div>`. 서버 상자는 이름 뒤에 `<span class="mk-svq">요청 ${got}</span>`(down·off 제외). 서버마다 `<div class="mk-svc">`로 감싸고, tag는 상자 아래 `<span class="mk-svt">${tag}</span>`.
    - 요청 점: still이 아니고 `got > 0`이며 `st !== 'drain'`인 서버 k(1부터)의 `mk-svc` 안에 `<i class="mk-svd mk-srv${k} A"></i>`.
    - CSS: `.mk-sv-down`은 점선 테두리, `.mk-sv-off`는 `--muted` 글자, `.mk-sv-busy`·`.mk-sv-new`·`.mk-sv-drain`은 테두리 굵기·배경(`--mark-bg`)으로 다르게. `.mk-svs`는 `grid-template-columns:repeat(var(--n),minmax(0,1fr))`, 칸 글 `overflow-wrap:anywhere`.
    - `.mk-svd.A{opacity:0;animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}`. 점은 `mk-svc`(`position:relative`, 위 여백 `2em`) 맨 위 가운데에 `position:absolute`로 둔다. 키프레임 `mk-srv${k}`는 `opacity`와 `transform:translateY(…)`만 쓴다(개별 `translate` 속성은 `cdframe`이 막음). 서버 k의 점은 10k%에 나타나 고정 거리 `2em`을 내려와 서버 상자 위에 닿고, 88% 전에 opacity 0이 된다(멈춘 장면에 점 없음). 거리가 서버 수·front·db 유무와 상관없어 `--dx`·`--dy`가 필요 없다.
    - 끝 `<p class="sr">배치도. ${user}[ ${STL}], [${front}[ ${STL}], ]서버 ${n}대: ${서버 글을 ', '로}.[ ${db}[ ${STL}].][ ${note}.]</p>`. 서버 글 = `${이름}[ ${STL}][ 요청 ${got}][(${tag})]`(요청은 down·off 제외).
    - 오류는 `'srvmap: '`로 시작한다. 검사: servers가 1~4개 배열, user·front·db가 문자열이거나 `{n, st}`이고 이름 wlen 1~10, 서버 이름 wlen 1~6, tag wlen 1~6, note wlen 1~28, 없는 st(user·front·db·서버 모두), got이 0~99 정수가 아님, `down`·`off`인데 got > 0, got > 0인 서버가 없음.
  - `metric({lines, x, max = 100, unit, limit, mark, label} = {}) → string`
    - 바깥 `<div class="mk-mg">`(label은 srvmap과 같음).
    - 범례 `<ul class="mk-mgl" aria-hidden="true">`: 선마다 `<li><i class="mk-mgs mk-mgs${i}"></i>${n}</li>`(i = 1~3).
    - 그래프 칸 `<div class="mk-mgb" aria-hidden="true">`: 세로축 이름표 `<span class="mk-mgy">${max}${unit}</span>`(위)·`<span class="mk-mgy">0</span>`(아래), `<svg class="mk-mgv" viewBox="0 0 100 50" preserveAspectRatio="none">` 안에 선마다 `<polyline class="mk-mgp${i}" vector-effect="non-scaling-stroke" points="…">`(선 1 굵은 실선, 2 긴 점선, 3 짧은 점선), limit이면 가는 이중선 `<g class="mk-mgh">`(선 두 개). mark는 SVG 밖 `<i class="mk-mgm" style="left:…%;bottom:…%"></i>` + `<span class="mk-mgk" style="…">${mark.n}</span>`, limit 이름표 `<span class="mk-mgk mk-mgkl" style="bottom:…%">${limit.n} ${limit.v}${unit}</span>`(오른쪽 위).
    - x축 `<div class="mk-mgx" aria-hidden="true">`: 점마다 `<span>`, 점이 7개 이상이면 첫·가운데(`Math.floor((len - 1) / 2)`)·끝만 글을 넣고 나머지는 빈 `<span></span>`.
    - 끝 `<p class="sr">그래프, ${x[0]}부터 ${x.at(-1)}까지. ${선마다 '${n} 처음 ${p0}${unit}, 가장 높음 ${pmax}${unit}(${x[가장 높은 첫 시점]}), 끝 ${plast}${unit}'을 '. '로}.[ 한도 ${limit.n} ${limit.v}${unit}.][ 표시: ${x[mark.i]} ${mark.n}.]</p>`
    - 오류는 `'metric: '`로 시작한다. 검사: lines 1~3개, 선 이름 wlen 1~10, pts 4~12개, 값이 유한한 숫자가 아님, 값이 0~max 밖, 선마다 pts 길이가 다름, x 길이 ≠ pts 길이, x 이름표 wlen 1~5, unit이 없음·wlen 1~4 밖, max가 0 이하이거나 숫자가 아님, limit.v가 0~max 밖, limit.n wlen 1~10 밖, mark.i가 pts 범위 밖 정수가 아님, mark.n wlen 1~10 밖.
    - `A` 클래스를 만들지 않는다(`m:0`).

- [ ] **Step 1: 실패하는 점검 `srvhelp` 쓰기**

`dbstill` 바로 뒤에 둔다. 형식은 `dbhelp`와 같다.

```js
check('srvhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(srvmap|metric): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); }), WA = h => /class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(h);
  const M = srvmap({front:'LB', servers:[{n:'서버 1', got:3}, {n:'서버 2', st:'down'}, {n:'서버 3', got:3, tag:'민수'}], db:'DB', note:'고장 난 서버는 빼요', label:'배치도 예'});
  has(M, ['class="mk-sv" role="group" aria-label="배치도 예"', 'class="mk-svp" aria-hidden="true"', 'class="mk-svs" style="--n:3"', 'mk-sv-down', '<b class="mk-svk">고장</b>', '<span class="mk-svq">요청 3</span>',
    '<span class="mk-svt">민수</span>', '<p class="mk-svn">고장 난 서버는 빼요</p>', 'mk-svd mk-srv1 A', 'mk-svd mk-srv3 A',
    '<p class="sr">배치도. 사용자, LB, 서버 3대: 서버 1 요청 3, 서버 2 고장, 서버 3 요청 3(민수). DB. 고장 난 서버는 빼요.</p>'], 'srvmap');
  if (M.includes('mk-srv2') || M.includes('요청 0')) bad.push('고장 서버 점·요청');
  const S1 = srvmap({servers:[{n:'web-1', got:1}], still:true});
  has(S1, ['<p class="sr">배치도. 사용자, 서버 1대: web-1 요청 1.</p>'], 'srvmap 최소'); if (WA(S1) || S1.includes('mk-svd') || S1.includes('mk-svk') || S1.includes('role=')) bad.push('srvmap still·기본');
  const M4 = srvmap({user:{n:'민수', st:'ok'}, servers:[{n:'a', st:'busy', got:2}, {n:'b', st:'new'}, {n:'c', st:'drain', got:1}, {n:'d', st:'off'}], db:{n:'DB', st:'down'}});
  has(M4, ['>바쁨<', '>새로 켬<', '>정리 중<', '>꺼짐<', 'style="--n:4"', 'mk-svd mk-srv1 A', '배치도. 민수, 서버 4대: a 바쁨 요청 2, b 새로 켬 요청 0, c 정리 중 요청 1, d 꺼짐. DB 고장.</p>'], 'srvmap 상태');
  if (/mk-srv[234]/.test(M4)) bad.push('새로 켬 0·정리 중·꺼짐 서버 점');
  const sv = [{n:'a', got:1}];
  no(() => srvmap({servers:[]}), '서버 0대'); no(() => srvmap({servers:Array(5).fill({n:'a', got:1})}), '서버 5대'); no(() => srvmap({}), '서버 없음');
  no(() => srvmap({user:'a'.repeat(11), servers:sv}), 'user 11폭'); no(() => srvmap({front:'a'.repeat(11), servers:sv}), 'front 11폭'); no(() => srvmap({db:'a'.repeat(11), servers:sv}), 'db 11폭');
  no(() => srvmap({servers:[{n:'a'.repeat(7), got:1}]}), '서버 이름 7폭'); no(() => srvmap({servers:[{n:'a', got:1, tag:'a'.repeat(7)}]}), 'tag 7폭'); no(() => srvmap({servers:sv, note:'a'.repeat(29)}), 'note 29폭');
  no(() => srvmap({servers:[{n:'a', st:'bad', got:1}]}), '서버 st'); no(() => srvmap({front:{n:'LB', st:'x'}, servers:sv}), 'front st'); no(() => srvmap({db:{n:'DB', st:'x'}, servers:sv}), 'db st');
  no(() => srvmap({servers:[{n:'a', got:100}]}), 'got 100'); no(() => srvmap({servers:[{n:'a', got:1.5}]}), 'got 1.5'); no(() => srvmap({servers:[{n:'a', got:-1}]}), 'got -1');
  no(() => srvmap({servers:[{n:'a', got:1}, {n:'b', st:'down', got:1}]}), 'down got'); no(() => srvmap({servers:[{n:'a', got:1}, {n:'b', st:'off', got:2}]}), 'off got'); no(() => srvmap({servers:[{n:'a'}, {n:'b'}]}), '받은 서버 없음');
  const X6 = ['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'];
  const G = metric({lines:[{n:'CPU', pts:[20, 40, 60, 95, 50, 30]}], x:X6, unit:'%', limit:{v:70, n:'늘림 기준'}, mark:{i:3, n:'이벤트'}, label:'CPU 그래프'});
  has(G, ['class="mk-mg" role="group" aria-label="CPU 그래프"', 'class="mk-mgl" aria-hidden="true"', '<i class="mk-mgs mk-mgs1"></i>CPU', 'class="mk-mgb" aria-hidden="true"', '<svg class="mk-mgv"', 'class="mk-mgp1"',
    'vector-effect="non-scaling-stroke"', 'class="mk-mgh"', 'class="mk-mgm"', '>늘림 기준 70%<', '>이벤트<', '>100%<', '>14:20<', 'class="mk-mgx" aria-hidden="true"',
    '<p class="sr">그래프, 14:00부터 14:50까지. CPU 처음 20%, 가장 높음 95%(14:30), 끝 30%. 한도 늘림 기준 70%. 표시: 14:30 이벤트.</p>'], 'metric');
  if (WA(G)) bad.push('metric 움직임');
  const X7 = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7'];
  const G2 = metric({lines:[{n:'요청 수', pts:[1, 2, 3, 4, 5, 6, 7]}, {n:'b', pts:[7, 6, 5, 4, 3, 2, 1]}, {n:'c', pts:[1, 1, 1, 1, 1, 1, 1]}], x:X7, max:10, unit:'건', mark:{i:0, n:'첫 요청'}});
  has(G2, ['>a1<', '>a4<', '>a7<', 'class="mk-mgp2"', 'class="mk-mgp3"', '>10건<', '>첫 요청<',
    '그래프, a1부터 a7까지. 요청 수 처음 1건, 가장 높음 7건(a7), 끝 7건. b 처음 7건, 가장 높음 7건(a1), 끝 1건. c 처음 1건, 가장 높음 1건(a1), 끝 1건. 표시: a1 첫 요청.</p>'], 'metric 3선');
  if (G2.includes('>a2<') || G2.includes('>a6<') || G2.includes('mk-mgh') || G2.includes('role=')) bad.push('metric 빈 이름표·기본');
  has(metric({lines:[{n:'z', pts:[0, 0, 0, 0]}], x:['a', 'b', 'c', 'd'], unit:'%'}), ['z 처음 0%, 가장 높음 0%(a), 끝 0%.</p>'], 'metric 0');
  const L = [{n:'a', pts:[1, 2, 3, 4]}], X4 = ['a', 'b', 'c', 'd'];
  no(() => metric({lines:[], x:X4, unit:'%'}), '선 0개'); no(() => metric({lines:Array(4).fill(L[0]), x:X4, unit:'%'}), '선 4개'); no(() => metric({lines:[{n:'a'.repeat(11), pts:[1, 2, 3, 4]}], x:X4, unit:'%'}), '선 이름 11폭');
  no(() => metric({lines:[{n:'a', pts:[1, 2, 3]}], x:['a', 'b', 'c'], unit:'%'}), 'pts 3개'); no(() => metric({lines:[{n:'a', pts:Array(13).fill(1)}], x:Array(13).fill('a'), unit:'%'}), 'pts 13개');
  no(() => metric({lines:[{n:'a', pts:[1, 2, 3, 101]}], x:X4, unit:'%'}), 'max 넘음'); no(() => metric({lines:[{n:'a', pts:[-1, 2, 3, 4]}], x:X4, unit:'%'}), '0 밑'); no(() => metric({lines:[{n:'a', pts:['1', 2, 3, 4]}], x:X4, unit:'%'}), '숫자 아님');
  no(() => metric({lines:[{n:'a', pts:[1, 2, 3, NaN]}], x:X4, unit:'%'}), 'NaN'); no(() => metric({lines:[L[0], {n:'b', pts:[1, 2, 3, 4, 5]}], x:X4, unit:'%'}), 'pts 길이 다름');
  no(() => metric({lines:L, x:['a', 'b', 'c'], unit:'%'}), 'x 길이'); no(() => metric({lines:L, x:['a', 'b', 'c', 'abcdef'], unit:'%'}), 'x 6폭');
  no(() => metric({lines:L, x:X4}), 'unit 없음'); no(() => metric({lines:L, x:X4, unit:'abcde'}), 'unit 5폭'); no(() => metric({lines:L, x:X4, unit:'%', max:0}), 'max 0'); no(() => metric({lines:L, x:X4, unit:'%', max:'100'}), 'max 글자');
  no(() => metric({lines:L, x:X4, unit:'%', limit:{v:101, n:'a'}}), 'limit 넘음'); no(() => metric({lines:L, x:X4, unit:'%', limit:{v:-1, n:'a'}}), 'limit 0 밑'); no(() => metric({lines:L, x:X4, unit:'%', limit:{v:50, n:'a'.repeat(11)}}), 'limit 11폭');
  no(() => metric({lines:L, x:X4, unit:'%', mark:{i:4, n:'a'}}), 'mark 범위'); no(() => metric({lines:L, x:X4, unit:'%', mark:{i:1.5, n:'a'}}), 'mark 정수'); no(() => metric({lines:L, x:X4, unit:'%', mark:{i:0, n:'a'.repeat(11)}}), 'mark 11폭');
  return bad.join(', ');
})()`, ctx));
```

- `cdframe`: `dq` 줄 옆에 `sv = html.match(/\.mk-svd\.A\{[^}]*animation-delay:-([\d.]+)s/)`를 더하고, 맞지 않으면 `'svd'`. 아울러 k = 1~4마다 `@keyframes mk-srv${k}\{…\}` 본문을 꺼내, 없거나 `([\d.]+)%,100%\{opacity:0` 의 수가 P(88)보다 크면 `'srv' + k`, 본문의 속성 이름이 `opacity`·`transform` 밖이면 `'srv' + k + ' 속성'`을 돌려준다.
- `bkpad`의 배열을 `['mk-sd', 'mk-hm', 'mk-db', 'mk-dq', 'mk-er', 'mk-sv', 'mk-mg']`로 늘린다.

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs > <작업 폴더>/check.txt 2>&1; tail -20 <작업 폴더>/check.txt`
Expected: `FAIL srvhelp: srvmap is not defined`, `FAIL cdframe: svd, srv1, srv2, srv3, srv4`, `FAIL bkpad: mk-sv, mk-mg`

- [ ] **Step 3: `srvmap`·`metric` 구현**: `wlen`·`esc`를 쓰고, 입력 검사를 먼저 한 뒤 HTML을 만든다. Interfaces의 HTML·CSS·키프레임대로 둔다. 좌표는 `x_i = i / (len - 1) * 100`, `y = 50 - v / max * 50`이고 HTML 표시의 `bottom`은 `v / max * 100`%다. 582줄 목록과 패딩 규칙에 두 접두사를 넣는다.
  - 글자는 모두 SVG 밖 HTML이다(SVG가 줄어도 11px 아래로 내려가지 않게, 스펙 3.2).
  - 범례 견본 `mk-mgs1~3`은 선 1~3과 같은 선 모양(굵은 실선·긴 점선·짧은 점선)이다.

- [ ] **Step 4: 통과 확인**

Run: Step 2와 같음
Expected: `FAIL` 줄 없이 `OK <수>`. 도우미 글에 서브셋에 없는 글자가 있어 `FAIL font`가 나오면 `LATER`에 `'font'`를 여기서 넣는다(Task 2 목록과 겹치지 않게 한 번만). 측정: 쁨·켬·꺼·짐은 이미 서브셋에 있다.

- [ ] **Step 5: 브라우저·break-ui 확인**
  - Review Focus 1 그림을 임시 키 `u-server-test`로 아무 server 카드 v에 잠깐 걸고 확인한다.
    - srvmap: front `proxy-0001`(10폭), 서버 4대 `web-01`~`web-04`(6폭), st `ok`·`new`·`drain`·`busy`, got 99·0·12·7, tag `zone-a`~`zone-d`(6폭), db `db-primary`(10폭), note 28폭(실제 글 `DB 하나가 멈추면 전부 멈춰요`)
    - metric: 선 3개(`응답 시간`(9)·`CPU 사용량`(10)·`메모리`(6)) × 12점, x `00:00`~`11:00`(5폭), `max` 1200, unit `MB`, limit `{v:1000, n:'OOM 한도'}`(8), mark `{i:11, n:'강제 종료'}`(끝 점)
  - 넘침·작은 글자·겹침(한도 이름표와 표시 이름표, 범례 줄바꿈)을 320/375/1280에서 본다.
    - 서버 4대가 320px에서 넘치면 `.mk-svs[style*="--n:4"]`를 좁은 폭에서 2열 2줄로 바꾸는 규칙을 더하고 다시 잰다. 폭 한도는 그대로다.
    - 이름표가 겹치면 한도 이름표는 위·표시 이름표는 아래로 비켜 놓는다. 결정은 원장 `Ruling:`.
  - reduced-motion에서 요청 점이 보이지 않고 "요청 n"이 보이는지 본다. 재생 버튼을 누르면 점이 내려간다.
  - 임시 키와 v를 지운다. `git diff`에 `u-server-test`가 없어야 한다.

- [ ] **Step 6: DESIGN.md·커밋**: 도우미 표에 `srvmap({user,front,servers,db,note,still,label})`·`metric({lines,x,max,unit,limit,mark,label})`를 한 줄씩 넣는다(한도, "고장은 점선과 글자 꼬리표", "metric 글자는 SVG 밖", "7점 이상이면 x 이름표 첫·가운데·끝" 포함).

```bash
git add index.html tests/check.mjs DESIGN.md
git commit -m "feat: 서버 그림 도우미 srvmap·metric"
```

뒤이어 **디렉터 검토 묶음 A**

---

### Task 2: 하위항목 4개와 점검 기대값

**Files:**
- Modify: `index.html:1747`(CAT), Scaling·Failover 카드의 p, Docker·401 Unauthorized 카드의 x(2940~2995줄)
- Modify: `tests/check.mjs`(COUNT·REDRAWN·LATER, 새 server 점검 묶음)

**Interfaces:**
- Produces: 점검 이름 `srvcat`·`srvukey`·`srvobj`·`srvsym`·`srvx`·`srvm`·`srvou`·`srvwrong`·`srvtext`·`srvxn`·`srvsafe`·`srvshare`·`srvsameh`, 목록 `SRV_TODO`·`SRV_NOX`·`SRV_WRONG`, 함수 `SRVS()`·`SRV_IP()`. Task 3~5와 계획서 ②는 목록과 기대값만 고친다.

- [ ] **Step 1: 실패하는 점검 쓰기**
  - `COUNT`의 `'server/basic': 5, 'server/motion': 6`을 바꾼다: `'server/basic': 5, 'server/core': 9, 'server/motion': 6, 'server/adv': 8, 'server/status': 10, 'server/conf': 0, 'server/scale': 0, 'server/res': 0, 'server/infra': 0, 'server/tip': 8`
  - `REDRAWN`에 `server/` 10개를 넣는다.
  - db 묶음(`dbreve`, 796줄) 뒤에 server 묶음을 둔다.

```js
const SRVS = () => g.TERMS.filter(t => t.c === 'server');
check('srvcat', () => { const a = g.CATS.find(c => c.id === 'server').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,status,conf,scale,res,infra,tip' ? '' : a; });
const SRV_TODO = ["Localhost","Dev Server","Production","Cloud","Uptime","HTTPS","SSL Certificate","Web Server","Reverse Proxy","Load Balancer","Scaling","Downtime","Server Log","Storage",
  "Request-Response Cycle","Cold Start","Restart","Traffic Spike","Failover","Graceful Shutdown","Linux","SSH","Docker","Container Image","Kubernetes","AWS","VPS","Serverless",
  "200 OK","301 Redirect","400 Bad Request","401 Unauthorized","403 Forbidden","404 Not Found","429 Too Many Requests","500 Internal Server Error","502 Bad Gateway","HTTP Status Code",
  "Development Environment","Staging","Monitoring","Cron Job","Redirect","Maintenance Page","Works on My Machine","Self-hosting"];    // 아직 u-server- 그림이 아닌 옛 서버 카드. 다시 그리면 여기서 뺀다
const SRV_NOX = ["Localhost","Dev Server","Production","Cloud","Uptime","HTTPS","SSL Certificate","Web Server","Reverse Proxy","Load Balancer","Scaling","Downtime","Server Log","Storage",
  "Request-Response Cycle","Cold Start","Restart","Traffic Spike","Failover","Graceful Shutdown","Linux","SSH","Container Image","Kubernetes","AWS","VPS","Serverless",
  "200 OK","301 Redirect","400 Bad Request","403 Forbidden","404 Not Found","429 Too Many Requests","500 Internal Server Error","502 Bad Gateway","HTTP Status Code",
  "Development Environment","Staging","Monitoring","Cron Job","Redirect","Maintenance Page","Works on My Machine","Self-hosting"];    // x를 아직 안 쓴 옛 카드 44장(Docker·401은 Task 2에서 고쳐 씀). Task 5가 비운다
check('srvukey', () => bkdiff(SRVS().filter(t => !(typeof t.v === 'string' && t.v.startsWith('u-server-') && g.D[t.v])).map(t => t.en), SRV_TODO));
check('srvobj', () => SRVS().filter(t => typeof t.v === 'object' && !SRV_TODO.includes(t.en)).map(t => t.en).join(', '));    // 옛 형식 그림은 남은 목록 안에만
check('srvsym', () => SRVS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)}; return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en).join(', '));
check('srvx', () => bkdiff(SRVS().filter(t => !t.x).map(t => t.en), SRV_NOX));
check('srvm', () => SRVS().filter(t => { const p = typeof t.v === 'string' && t.v.startsWith('u-server-') && g.D[t.v]; return p && !!p.m !== WA(p.h); }).map(t => t.en).join(', '));    // 재생 버튼(m)과 움직임(A)은 함께 있다
check('srvou', () => SRVS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
const SRV_WRONG = {'Server Instance': ['Instance'], 'Sticky Session': ['Position Sticky', 'Sticky Header'], 'Log Level': ['Heading Levels'], 'Log Rotation': ['Key Rotation'],
  'Virtual Host': ['Hosts File'], 'Object Storage': ['Local Storage'], 'Capacity Planning': ['Planning'], 'Auto Scaling': ['Scale'], 'Horizontal Scaling': ['Scale'], 'Vertical Scaling': ['Scale'],
  'Alert': ['Security Alert'], 'Virtual Machine': ['Container'], 'Container Image': ['Container']};    // 이름만 비슷한 다른 뜻
check('srvwrong', () => [...Object.values(SRV_WRONG).flat().filter(w => { const t = g.find(w); return !t || t.c === 'server'; }).map(w => '짝 없음 ' + w),
  ...Object.entries(SRV_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'server' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en)].join(', '));
check('srvtext', () => SRVS().filter(t => WSYM(t.d + (t.x || '')) || !/줘$/.test(t.p)).map(t => t.en).join(', '));    // d·x에 기호 없음, p는 ~줘
check('srvxn', () => SRVS().filter(t => { const n = (t.x || '').match(/[.?!](?=\s|$)/g)?.length || 0; return t.x && (n < 2 || n > 3); }).map(t => t.en).join(', '));    // x는 2~3문장
const SRV_IP = s => (s.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) || []).some(ip => !/^(?:192\.0\.2|198\.51\.100|203\.0\.113)\.\d{1,3}$/.test(ip) && ip !== '127.0.0.1' && ip !== '0.0.0.0') || DB_SECRET(s);    // 문서용 대역 밖 IP·가리지 않은 비밀번호·전화번호
check('srvsafe', () => [...['10.0.0.5', '8.8.8.8', 'mysql://app:pw1@db'].filter(x => !SRV_IP(x)).map(x => '못 잡음 ' + x), ...(['203.0.113.10', '198.51.100.7', '192.0.2.1', '127.0.0.1'].some(SRV_IP) ? ['오탐'] : []),
  ...SRVS().filter(t => { const p = typeof t.v === 'string' && g.D[t.v]; return p && SRV_IP(p.h.replace(/<[^>]+>/g, ' ') + ' ' + (p.cap || '')); }).map(t => t.en)].join(', '));
check('srvshare', () => ['scale', 'delay', 'rotate', 'fade', 'pulse', 'emptystate'].filter(k => !g.D[k]).join(', '));    // 옛 server 카드가 쓰던 공유 그림 키는 남긴다
check('srvsameh', () => { const seen = {}; return SRVS().filter(t => typeof t.v === 'string' && t.v.startsWith('u-server-') && g.D[t.v]).filter(t => { const h = g.D[t.v].h; if (seen[h]) return true; seen[h] = t.en; }).map(t => t.en + '=' + seen[g.D[t.v].h]).join(', '); });    // 서버 카드끼리 같은 그림 없음(직접 조작은 첫 장면 h)
```

  - `SRV_TODO`는 2026-11-03에 잰 값이다(server 46장, 하위항목 순서). Step 2를 돌릴 때만 check.mjs 끝에 `console.log(JSON.stringify(SRVS().map(t => t.en)))`를 잠깐 넣어 한 번 더 재고, 같은지 본 뒤 지운다(`git diff tests/check.mjs`에 그 줄이 없어야 함).
  - `SRV_WRONG`의 짝 이름(Instance·Position Sticky·Sticky Header·Heading Levels·Key Rotation·Hosts File·Local Storage·Planning·Scale·Security Alert·Container)이 실제로 있고 server 밖인지 `srvwrong`이 함께 본다. 이름이 다르면 그 카테고리의 실제 영문명으로 고치고 원장에 `Ruling:`을 적는다.
  - `LATER`에 넣는다: `'font', 'srvsym', 'redrawn:server/basic', 'redrawn:server/core', 'redrawn:server/motion', 'redrawn:server/adv', 'redrawn:server/tip'`

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs > <작업 폴더>/check.txt 2>&1; tail -30 <작업 폴더>/check.txt`
Expected: `FAIL srvcat: basic,core,motion,adv,status,tip`, `FAIL count:server/conf: no sec ≠ 0`(scale·res·infra도 같음), `srvx`는 통과(Docker·401은 이미 x가 있음), `FAIL srvtext: Scaling, Failover`, `FAIL srvxn: Docker, 401 Unauthorized`. 아울러 `LATER redrawn:server/` 5개가 나온다(`srvsym`은 걸리는 옛 그림이 있을 때만). 나머지 새 점검은 목록이 지금 상태와 같아서 통과한다. 다른 FAIL이 나오면 측정을 다시 하고 원장에 적는다.

- [ ] **Step 3: CAT·p·x 고치기**
  - 1747줄 `['status',…]` 뒤에 스펙 4장의 네 항목(`conf`·`scale`·`res`·`infra`, 이름과 설명 그대로)을 넣는다.
  - Scaling p: `'사용자가 몰릴 때 서버가 자동으로 늘어나게 설정해줘'`
  - Failover p: `'서버 하나가 죽으면 예비 서버로 자동으로 넘어가게 설정해줘'`
  - Docker x: `'Docker 컨테이너는 가상 머신과 달리 운영체제를 통째로 담지 않아서 가볍고 빨리 켜져요. 앱과 필요한 환경을 함께 담아 "내 컴퓨터에선 되는데" 문제를 줄여 줘요.'`
  - 401 Unauthorized x: `'401은 누구인지 확인이 안 됐다는 뜻이라 로그인하면 풀려요. 403은 누군지는 알지만 권한이 없다는 뜻이라 다시 로그인해도 그대로예요.'`
  - 사실 확인: Docker 공식 문서 "What is a container"(VM과 차이), MDN 401·403(RFC 9110 15.5.2·15.5.4). 원장에 출처를 적는다.

- [ ] **Step 4: 통과 확인**

Run: Step 2와 같음
Expected: `FAIL` 없이 `OK <수>`. `LATER` 줄은 `redrawn:server/` 5개(+ `srvsym`이 걸리면 그 줄)다. 빈 하위항목 4개는 화면에서 "카드 없음"으로 보이고 계획서 ②까지 이 상태다.

- [ ] **Step 4b: 돌연변이 확인**: `SRV_TODO`에서 `"Localhost"`를 잠깐 빼면 `FAIL srvukey: +Localhost`, `SRV_NOX`에서 `"Localhost"`를 잠깐 빼면 `FAIL srvx: +Localhost`, `SRV_WRONG`의 `'Instance'`를 `'Instanse'`로 잠깐 바꾸면 `FAIL srvwrong: 짝 없음 Instanse`가 나오는지 보고 되돌린다(`git diff tests/check.mjs`로 원래대로인지 확인).

- [ ] **Step 5: 커밋**

```bash
git add index.html tests/check.mjs
git commit -m "feat: 서버 하위항목 4개와 점검 기대값"
```

---

### Task 3: 기존 basic·core·motion 20장 다시 그리기 (공통 절차)

**Files:**
- Modify: `index.html`
  - 카드 20장의 v를 `'u-server-<slug>'`로 바꾸고, 그림이 움직이면 `m:1`을 단다. d·p·r은 그대로 둔다.
  - 그림은 `/* server: 다시 그리기 basic·core·motion … */` 묶음으로 둔다. 상태 함수는 그 `Object.assign` 바로 앞 `const`로 둔다.
- Modify: `tests/check.mjs`: `SRV_TODO`에서 20장을 빼고, `LATER`에서 `redrawn:server/basic·core·motion`을 빼고, `srvstill`을 더한다.

**Interfaces:**
- Consumes: `srvmap`·`metric`(Task 1), `seq`, `track`·`doc`·`term`·`fcss`, `bkStack`·`bkBox`·`bkRows`·`bkPills`
- Produces(계획서 ②가 버튼을 붙이고, Task 4가 쓰는 상태 함수. 값은 예시):
  - `SENV = [['개발', '내 컴퓨터'], ['스테이징', '연습장'], ['운영', '실제 사용자']]`
  - `senv(on: 0 | 1 | 2, t: string) → string`: `bkStack`으로 `bkBox` 세 개. `on` 칸은 글이 `t`이고 꼬리표 `강조`, 나머지는 `SENV`의 기본 글이고 꼬리표가 없다.
  - `SLB = {rr: {name: 'Round Robin', got: [4, 4, 4], say: '차례대로 4개씩 나눠요'}, lc: {name: 'Least Connections', got: [5, 2, 5], say: '한가한 서버 1·3이 더 받아요'}}`
  - `slb(kind: 'rr' | 'lc') → string`: `srvmap({front:'LB', servers:[서버 1 ok, 서버 2 busy, 서버 3 ok](got은 SLB[kind].got), note: SLB[kind].name, still:true})`
  - `slbSay(kind) → string`: `SLB[kind].say`
  - `SFAIL = {ok: [3, 3, 3], down: [5, 0, 4]}`
  - `sfail(down: boolean) → string`: `srvmap({front:'LB', servers:[서버 1, 서버 2, 서버 3], still:true})`. `down`이면 서버 2는 `{st:'down', tag:'빠짐'}`, got은 `SFAIL.down`, note `'고장 난 서버는 빼요'`. 아니면 모두 ok, got `SFAIL.ok`, note `'세 대 모두 정상'`.
  - `sfailSay(down) → string`: 정상 `'서버 3대가 나눠 받아요'`, 고장 `'Health Check가 서버 2를 빼고 나머지가 받아요'`
  - 잘못된 값(없는 kind, boolean 아닌 down, 0~2 밖 on, 빈 t)은 `'senv: '`·`'slb: '`·`'sfail: '` 오류를 던진다.

- [ ] **Step 1: 점검**
  - `SRV_TODO`에서 basic·core·motion 20장(`"Localhost"`~`"Graceful Shutdown"`)을 뺀다.
  - `LATER`에서 `redrawn:server/basic`·`redrawn:server/core`·`redrawn:server/motion`을 뺀다.
  - 상태 함수를 보는 점검을 `srvhelp` 뒤에 더한다.

```js
check('srvstill', () => vm.runInContext(`(() => { const bad = [], n = (h, s) => h.split(s).length - 1, WA = h => /class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(h);
  const e = senv(2, '실제 사용자가 보는 곳');
  if (n(e, '>강조<') !== 1 || !e.includes('실제 사용자가 보는 곳') || !e.includes('연습장') || !e.includes('내 컴퓨터') || e === senv(1, '실제 사용자가 보는 곳')) bad.push('senv');
  const r = slb('rr'), c = slb('lc');
  if (n(r, '요청 4<') !== 3 || !r.includes('>바쁨<') || !r.includes('Round Robin') || n(c, '요청 5<') !== 2 || !c.includes('요청 2<') || !c.includes('Least Connections') || WA(r + c)) bad.push('slb');
  if (slbSay('rr') !== '차례대로 4개씩 나눠요' || slbSay('lc') !== '한가한 서버 1·3이 더 받아요') bad.push('slbSay');
  const ok = sfail(false), dn = sfail(true);
  if (n(ok, '요청 3<') !== 3 || ok.includes('고장') || !dn.includes('>고장<') || !dn.includes('>빠짐<') || !dn.includes('요청 5<') || !dn.includes('요청 4<') || dn.includes('요청 0') || WA(ok + dn)) bad.push('sfail');
  if (sfailSay(false) !== '서버 3대가 나눠 받아요' || sfailSay(true) !== 'Health Check가 서버 2를 빼고 나머지가 받아요') bad.push('sfailSay');
  [() => senv(3, 'a'), () => senv(0, ''), () => slb('ip'), () => slbSay('x'), () => sfail('y'), () => sfailSay(1)].forEach((f, k) => { try { f(); bad.push('안 막음 ' + k); } catch (e) { if (!/^(senv|slb|sfail): /.test(e.message)) bad.push('메시지 ' + k); } });
  return bad.join(', '); })()`, ctx));
```

- [ ] **Step 2: 실패 확인**
  - `FAIL srvukey: +Localhost, +Dev Server, …`(20장), `FAIL srvobj`(그중 객체 v 카드)
  - `FAIL redrawn:server/basic`·`core`·`motion`
  - `FAIL srvstill: senv is not defined`
- [ ] **Step 3: 그림**: 스펙 3.3 표의 basic·core·motion 20장대로 그린다. 정해 둔 것(`{0→1 '…'}`는 `{from:0, to:1, t:'…'}`를 줄여 쓴 것, 괄호 안 숫자는 wlen):

| 카드 | 그림 입력 |
|---|---|
| Localhost | `bkStack(bkBox('내 컴퓨터', 'localhost:3000'), '<p class="mk-dgp">나만 열 수 있어요</p>')` |
| Dev Server | `term([{c:'npm run dev'}, {o:'Local: http://localhost:5173'}, {o:'파일을 저장하면 다시 그려요'}])`, cap "주소와 포트는 도구마다 달라요(Vite 예)" |
| Production | `senv(2, '실제 사용자가 보는 곳')` |
| Cloud | `srvmap({servers:[{n:'서버 1', got:2}, {n:'서버 2', got:2}], note:'남의 컴퓨터를 빌려 써요'(23)})` |
| Uptime | `bkRows(['99.9% 한 달 약 43분 멈춤', '예시'], ['99.99% 한 달 약 4분 멈춤', '예시'])`, cap "30일 기준으로 계산했어요" |
| HTTPS | `bkStack(fcss('HTTP로 보냄', 'password=1234'), fcss('HTTPS로 보냄', '8f3a9c01d7e2b6…'), '<p class="mk-dgp">중간에서 엿봐도 못 읽어요</p>')` |
| SSL Certificate | `bkRows(['대상 example.com', ''], ['발급 기관 Let\'s Encrypt', '예'], ['만료일 11-30', '예시'])` |
| Web Server | `seq(['브라우저'(8), '웹 서버'(7)], [{0→1 'GET /logo.png'(13)}, {1→1 '파일 찾기'(9)}, {1→0 '200 그림 파일'(13)}])` |
| Reverse Proxy | `srvmap({front:'프록시', servers:[{n:'앱 1', got:3}, {n:'앱 2', got:3}], note:'사용자는 프록시만 알아요'(24)})` |
| Load Balancer ▶ | `slb('rr')` |
| Scaling | `bkStack(bkBox('위로 키우기', '서버 한 대를 크게'), bkPills('옆으로 늘리기', ['서버 1', '서버 2', '서버 3']))` |
| Downtime | `track([{t:'정상', s:'done', w:'14:00'}, {t:'멈춤', s:'fail', w:'14:10'}, {t:'복구', s:'done', w:'14:35'}])`, cap "시각은 예시예요" |
| Server Log | `term([{c:'tail -f app.log'}, {o:'14:02 GET /api/posts 200'}, {o:'14:03 GET /api/posts 200'}, {e:'14:04 ERROR DB 연결 실패'}], {end:false})`, cap "시각은 예시예요" |
| Storage | `seq(['브라우저'(8), '서버'(4), '저장소'(6)], [{0→1 '사진 올림'(9)}, {1→2 '저장'}, {2→1 '주소'}, {1→1 '주소 저장됨'(11)}])` |
| Request-Response Cycle | `seq(['브라우저', '서버', 'DB'], [{0→1 '요청'}, {1→2 '조회'}, {2→1 '결과'}, {1→0 '응답(HTML)'(10)}])` |
| Cold Start | `metric({lines:[{n:'응답 시간', pts:[1800, 130, 120, 110, 125, 120]}], x:['1번', '2번', '3번', '4번', '5번', '6번'], max:2000, unit:'ms', mark:{i:0, n:'첫 요청'}})`, cap "잠자던 서버가 깨어나는 시간이에요(숫자는 예시)" |
| Restart | `track([{t:'실행 중', s:'done'}, {t:'끔', s:'done'}, {t:'다시 켬', s:'done'}, {t:'실행 중', s:'done', w:'메모리 깨끗'}])` |
| Traffic Spike | `metric({lines:[{n:'요청 수', pts:[120, 110, 130, 900, 640, 300, 150]}], x:['20:00', '20:01', '20:02', '20:03', '20:04', '20:05', '20:06'], max:1000, unit:'건', mark:{i:3, n:'이벤트'}})`, cap "1분마다 센 요청 수(예시)" |
| Failover ▶ | `sfail(true)` |
| Graceful Shutdown | `track([{t:'새 요청 받지 않음', s:'done'}, {t:'하던 요청 끝냄', s:'done'}, {t:'끔', s:'done'}])` |

  - `track` 글이 한도에 걸리면(오류 메시지) 같은 뜻으로 줄이고 원장에 적는다.
  - `m:1`: Dev Server·Cloud·Web Server·Reverse Proxy·Downtime·Server Log·Storage·Request-Response Cycle·Restart·Graceful Shutdown. 나머지(bk 조각·fcss·metric·멈춘 직접 조작)는 없다. 최종 판정은 `srvm`이 한다.
  - 출처(공통 절차 3): Vite 기본 포트 5173(Vite 문서 server.port), `tail -f`(GNU coreutils), RFC 9110 HTTPS·인증서(MDN), 업타임 계산(스펙 8장), Health Check·Round Robin(nginx load balancing 문서), Graceful Shutdown(nginx·Kubernetes 종료 문서).
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER` 줄은 `redrawn:server/adv·tip` 2개(+ `srvsym`·`font`가 걸리면 그 줄)다.
- [ ] **Step 5: 브라우저 확인**: basic·core·motion
- [ ] **Step 6: 커밋**: `feat: 서버 basic·core·motion 그림 20장 다시 그리기`

---

### Task 4: 기존 adv·status·tip 26장 다시 그리기 (공통 절차)

**Files:**
- Modify: `index.html`
  - 카드 26장의 v·`m`
  - 새 묶음 `/* server: 다시 그리기 adv·status·tip … */`
- Modify: `tests/check.mjs`: `SRV_TODO`를 비우고, `LATER`에서 `redrawn:server/adv·tip`과 `srvsym`을 뺀다.

**Interfaces:**
- Consumes: Task 1 도우미, Task 3 `senv`, `httpmsg`·`seq`·`term`·`track`·`doc`·`browser`, `bk*` 조각

- [ ] **Step 1: 점검**: `SRV_TODO`를 `[]`로 비운다. `LATER`에서 `redrawn:server/adv`·`redrawn:server/tip`·`srvsym`을 뺀다.
- [ ] **Step 2: 실패 확인**
  - `FAIL srvukey: +Linux, …`(26장), `FAIL srvobj`(남은 객체 v 카드)
  - `FAIL redrawn:server/adv`·`tip`
- [ ] **Step 3: 그림**: 스펙 3.3 표의 adv·status·tip 26장대로 그린다. 정해 둔 것:

| 카드 | 그림 입력 |
|---|---|
| Linux | `term([{c:'uname -s'}, {o:'Linux'}, {c:'ls /var/www'}, {o:'html  logs'}])` |
| SSH | `term([{c:'ssh ubuntu@203.0.113.10'}, {o:'Welcome to Ubuntu'}, {o:'ubuntu@web-1:~$'}])`, cap "주소와 이름은 예시예요" |
| Docker | `bkStack(bkPills('컨테이너', ['앱', '라이브러리', '설정']), '<p class="mk-dgp">어느 서버에서나 같게 돌아가요</p>')` |
| Container Image | `track([{t:'Dockerfile', s:'done'}, {t:'docker build', s:'done'}, {t:'이미지', s:'done'}, {t:'docker run 3번', s:'done'}, {t:'컨테이너 3개', s:'done'}])` |
| Kubernetes | `srvmap({servers:[{n:'상자 1', got:2}, {n:'상자 2', st:'down'}, {n:'상자 3', got:2}, {n:'상자 4', st:'new', got:1}], note:'죽은 상자를 저절로 바꿔요'(25)})` |
| AWS | `bkPills('서비스 예', ['EC2 서버', 'S3 파일', 'RDS DB'])` |
| VPS | `bkStack(bkBox('큰 컴퓨터 한 대', '칸 셋으로 나눔'), bkRows(['칸 1', ''], ['칸 2', '내 몫'], ['칸 3', '']))` |
| Serverless | `seq(['브라우저', '플랫폼'(6), '함수'(4)], [{0→1 '요청'}, {1→1 '함수 깨움'(9)}, {1→2 '실행'}, {2→0 '응답'}])`, cap "쓴 만큼 내요" |
| 200 OK | `httpmsg({kind:'응답', start:'200 OK', head:['Content-Type: text/html'(23)], body:['<h1>안녕하세요</h1>'], hl:['b0']})` |
| 301 Redirect | `httpmsg({kind:'응답', start:'301 Moved Permanently'(21), head:['Location: /new'], hl:['h0']})` |
| 400 Bad Request | `bkStack(httpmsg({kind:'요청', start:'POST /signup', head:['Content-Type: application/json'(30)], body:['{"email": }'], hl:['b0']}), httpmsg({kind:'응답', start:'400 Bad Request'}))`, cap "보낸 쪽 형식이 깨졌어요" |
| 401 Unauthorized | `httpmsg({kind:'응답', start:'401 Unauthorized', head:['WWW-Authenticate: Bearer'(24)], hl:['h0']})`, cap "로그인이 필요해요" |
| 403 Forbidden | `httpmsg({kind:'응답', start:'403 Forbidden', body:['권한 없음']})`, cap "로그인은 됐지만 허락이 없어요" |
| 404 Not Found | `bkStack(httpmsg({kind:'요청', start:'GET /posts/999'}), httpmsg({kind:'응답', start:'404 Not Found'}))` |
| 429 Too Many Requests | `httpmsg({kind:'응답', start:'429 Too Many Requests'(21), head:['Retry-After: 60'], hl:['h0']})`, cap "60초 뒤 다시 보내라는 뜻(예시)" |
| 500 Internal Server Error | `httpmsg({kind:'응답', start:'500 Internal Server Error'(25), body:['서버 오류']})`, cap "자세한 원인은 서버 로그에" |
| 502 Bad Gateway | `httpmsg({kind:'응답', start:'502 Bad Gateway', head:['Server: nginx'], body:['앱이 이상한 답을 줌'], hl:['h0']})`, cap "Nginx는 예시예요" |
| HTTP Status Code | `doc([{tb:[['범위', '뜻', '예'], ['2xx', '성공', '200'], ['3xx', '다른 곳으로', '301'], ['4xx', '요청 쪽 문제', '404'], ['5xx', '서버 쪽 문제', '500']]}])` |
| Development Environment | `senv(0, '마음껏 망가뜨려도 돼요')` |
| Staging | `senv(1, '운영과 같게 만든 연습장')` |
| Monitoring | `metric({lines:[{n:'CPU', pts:[30, 35, 40, 85, 60, 40]}, {n:'메모리', pts:[55, 56, 58, 62, 60, 58]}], x:['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'], unit:'%', limit:{v:80, n:'알림 기준'}})`, cap "숫자는 예시예요" |
| Cron Job | `bkStack(term([{c:'crontab -l'}, {o:'0 3 * * * backup.sh'}]), '<p class="mk-dgp">매일 03:00에 실행돼요</p>')` |
| Redirect | `seq(['브라우저', '서버'], [{0→1 'GET /old'(8)}, {1→0 '301 Location'(12)}, {0→1 'GET /new'}, {1→0 '200 OK'}])` |
| Maintenance Page | `bkStack(browser('<p class="mk-dgp">점검 중이에요, 02:00까지</p>', {url:'example.com'}))`. `bkStack` 안이라 `.mk-bkg>.mk-browser{max-width:100%}`(index.html:438, 측정)가 걸린다. cap "시각은 예시예요" |
| Works on My Machine | `bkStack(bkBox('내 컴퓨터', 'Node 22', '되는 중'), bkBox('서버', 'Node 18', '오류'))`, cap "버전은 예시예요" |
| Self-hosting | `bkStack(bkBox('직접 운영', '서버·업데이트·백업을 내가'), bkBox('서비스 이용', '회사가 맡음'))` |

  - `httpmsg`는 줄마다 `esc`를 하므로(index.html:4223, 측정) body에 `<h1>`을 그대로 넣는다. 화면에 글자 그대로 보인다.
  - `m:1`: Linux·SSH·Container Image·Kubernetes·Serverless·HTTP Status Code·Cron Job·Redirect(`httpmsg`·`browser`는 `A`를 만들지 않음, index.html:4214·3955 측정). 최종 판정은 `srvm`이 한다.
  - 출처(공통 절차 3): RFC 9110 15장(200·301·400·401 `WWW-Authenticate`·403·404·500·502), RFC 6585 429·`Retry-After`, MDN 각 상태 코드, crontab(5) 형식, Docker 문서(이미지·컨테이너), Kubernetes 문서(자가 치유), AWS 문서(EC2·S3·RDS).
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER` 줄은 서브셋에 없는 새 글자가 있을 때 `font`뿐이다.
- [ ] **Step 5: 브라우저 확인**: adv·status·tip, 그리고 basic~motion 전체를 한 번 더(공유 CSS 영향)
- [ ] **Step 6: 커밋**: `feat: 서버 adv·status·tip 그림 26장 다시 그리기`

뒤이어 **디렉터 검토 묶음 B**

---

### Task 5: 기존 44장 x와 r 더하기 (공통 절차)

쓸 스킬: design-skills:ux-writing·interfaces:better-writing(x 문구)

**Files:**
- Modify: `index.html`: 기존 server 카드 44장의 x, Graceful Shutdown·Maintenance Page·Downtime·Cloud·VPS의 r
- Modify: `tests/check.mjs`: `SRV_NOX`를 비우고 `srvrel`·`SRV_XHAS`·`srvxhas`를 더한다.

- [ ] **Step 1: 점검**
  - `SRV_NOX`를 `[]`로 비운다.
  - `srvsameh` 뒤에 더한다:

```js
check('srvrel', () => [['Graceful Shutdown', 'Zero Downtime Deploy'], ['Maintenance Page', 'Status Page'], ['Downtime', 'Status Page'], ['Cloud', 'Hosting'], ['VPS', 'Hosting']]
  .filter(([en, r]) => !(g.find(en)?.r || []).includes(r)).map(([en, r]) => en + '-' + r).join(', '));    // 스펙 4장: 기존 server 카드에 더하는 r
const SRV_XHAS = {'502 Bad Gateway': ['504'], '401 Unauthorized': ['403'], 'Uptime': ['43분'], 'SSL Certificate': ['TLS'], 'Docker': ['운영체제']};    // x에 꼭 있어야 할 말(Review Focus 3). 계획서 ②가 더한다
check('srvxhas', () => Object.entries(SRV_XHAS).filter(([en, w]) => { const t = g.find(en); return !t || !w.every(s => (t.x || '').includes(s)); }).map(([en]) => en).join(', '));
```

- [ ] **Step 2: 실패 확인**: `FAIL srvx: +Localhost, …`(44장), `FAIL srvrel: Graceful Shutdown-Zero Downtime Deploy, Maintenance Page-Status Page, Downtime-Status Page, Cloud-Hosting, VPS-Hosting`, `FAIL srvxhas: 502 Bad Gateway, Uptime, SSL Certificate`(Docker·401은 Task 2 x에 그 말이 있으면 통과, 없으면 이 Task에서 x를 고침)
- [ ] **Step 3: x·r 넣기**: 해요체 2~3문장, 짝이 있으면 차이를 첫 문장에 쓴다. 아래는 카드마다 먼저 쓸 차이다(스펙 5장 짝 목록). 짝 카드가 계획서 ②의 새 카드여도 x 글로는 쓸 수 있다(r은 달지 않음).

| 카드 | x에서 먼저 쓸 차이 |
|---|---|
| Localhost | Dev Server는 코드를 띄우는 프로그램이고, localhost는 그 결과를 여는 "내 컴퓨터" 주소예요 |
| Dev Server | 저장하면 다시 그려 주는 개발용이라 운영(Production)에 그대로 쓰지 않아요 |
| Production | 개발·스테이징·운영 세 곳의 차이(누가 보느냐) |
| Cloud | 서버를 사지 않고 빌려 씀, Self-hosting·On-Premise와의 차이 |
| Uptime | 99.9%와 99.99%의 실제 멈춤 시간 차이, Uptime Monitor(deploy)는 이걸 재는 도구 |
| HTTPS | HTTP와 차이(가운데서 못 읽음), 인증서(SSL Certificate)가 있어야 켜짐 |
| SSL Certificate | 이름은 SSL이지만 지금은 TLS를 씀, 만료되면 경고가 뜸(Certificate Renewal로 이어짐) |
| Web Server | Web Server·Reverse Proxy·Load Balancer: 파일을 주는 곳 / 대신 받아 넘기는 곳 / 여럿에 나누는 곳 |
| Reverse Proxy | Proxy Pass는 Nginx에서 넘기는 설정 한 줄, Upstream은 넘길 서버 묶음 |
| Load Balancer | Round Robin·Least Connections는 나누는 방식, Load Balancer는 나누는 장치 |
| Scaling | 위로 키우기(Vertical)와 옆으로 늘리기(Horizontal), 자동은 Auto Scaling, design의 Scale(움직임)과 다름 |
| Downtime | 계획한 점검(Maintenance Page)과 사고로 멈춤의 차이 |
| Server Log | Access Log(누가 무엇을 요청)와 Error Log(무엇이 고장), Logging(back)은 남기는 일 |
| Storage | 서버 디스크와 Object Storage(파일을 키로 담는 저장소)의 차이 |
| Request-Response Cycle | 요청 하나에 응답 하나, Keep-Alive는 연결을 다시 씀 |
| Cold Start | 처음 요청만 느리고 다음은 빠름, Serverless에서 자주 생김 |
| Restart | Restart(끄고 켬)·Config Reload(끊지 않고 설정만)·Graceful Shutdown(하던 일 끝내고 끔) |
| Traffic Spike | 갑자기 몰림, 대비는 Auto Scaling·Load Balancer |
| Failover | Failover(고장 나면 넘김)·Redundancy(미리 둘 둠)·Single Point of Failure(하나뿐인 약점) |
| Graceful Shutdown | Connection Draining은 LB가 새 요청을 안 보내는 쪽, Zero Downtime Deploy(deploy)는 배포 전체 |
| Linux | 서버에서 가장 흔한 운영체제, 명령은 터미널로 |
| SSH | 비밀번호보다 키 로그인을 권함, 주소는 예시 |
| Container Image | 이미지는 틀, 컨테이너는 틀로 찍은 실행 중인 것, front의 Container(감싸는 틀)와 다름 |
| Kubernetes | 컨테이너가 죽으면 저절로 바꿔 켬, 작은 서비스에는 과할 수 있음 |
| AWS | 회사 이름이고 EC2·S3·RDS는 그 안의 서비스 이름 |
| VPS | 큰 컴퓨터를 나눈 한 칸, Virtual Machine·Server Instance와 관계 |
| Serverless | 서버가 없는 게 아니라 내가 관리하지 않음, BaaS(back)와 차이 |
| 200 OK | 201(새로 만듦)·204(본문 없음)과 차이 |
| 301 Redirect | 301(영구 이동, 브라우저가 기억)과 304(바뀌지 않음, 가진 것 씀)의 차이 |
| 400 Bad Request | 요청 형식이 깨짐(보낸 쪽 문제), 422·Validation과 차이 |
| 403 Forbidden | 401과 차이(다시 로그인해도 그대로) |
| 404 Not Found | 주소에 그런 것이 없음, 410과 차이는 쓰지 않음. Routing은 x 글에서만 말함(r 없음) |
| 429 Too Many Requests | Rate Limit에 걸림, `Retry-After`만큼 기다림 |
| 500 Internal Server Error | 500(내 앱 안에서 오류)·502(위쪽 앱이 이상한 답)·503(잠시 못 받음)·504(답이 없음) |
| 502 Bad Gateway | 502(이상한 답) vs 504(답 없음), Nginx 뒤 앱이 꺼져 있을 때 자주 남 |
| HTTP Status Code | 앞자리로 누구 쪽 문제인지 먼저 봄(4xx 요청 쪽, 5xx 서버 쪽) |
| Development Environment | 개발·스테이징·운영 중 마음껏 망가뜨려도 되는 곳 |
| Staging | 운영과 같게 만든 연습장, 개발 환경과 차이 |
| Monitoring | Monitoring(계속 봄)·Alert(넘으면 알림)·Uptime Monitor(deploy, 켜져 있는지만)·Status Page(deploy, 사용자에게 알림) |
| Cron Job | 정한 시각에 한 번씩 실행, Process Manager(늘 켜 둠)와 차이 |
| Redirect | 301 Redirect 카드는 상태 코드, 이 카드는 주소를 옮기는 일 |
| Maintenance Page | 미리 알린 점검 화면, 503과 함께 보냄 |
| Works on My Machine | 환경(버전·설정)이 달라서 생김, Docker·Environment Variable로 줄임 |
| Self-hosting | Self-hosting·Managed Service·On-Premise·Hosting의 차이(누가 관리하느냐) |

  - r을 더한다: Graceful Shutdown `['Restart', 'Zero Downtime Deploy']`, Maintenance Page `['Downtime', 'Status Page']`, Downtime `['Uptime', 'Status Page']`, Cloud `['AWS', 'Hosting']`, VPS `['Cloud', 'Hosting']`.
  - 사실 확인(공통 절차 3): x에 쓴 사실(TLS 이름, 304·301 차이, 502·504 차이, Kubernetes 자가 치유, Serverless 정의)을 RFC 9110·MDN·공식 문서로 확인한다.
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `srvtext`·`srvxn`이 44장에 걸리지 않는다. `LATER`는 `font`(걸릴 때)뿐이다.
- [ ] **Step 5: 브라우저 확인**: 모든 server 하위항목에서 헷갈림 칸이 보이는지, 320px에서 넘침이 없는지
- [ ] **Step 6: 커밋**: `feat: 서버 기존 카드 44장 헷갈림 칸과 연결`

뒤이어 **디렉터 검토 묶음 C**. 반영 뒤 원장과 체크포인트 메모리를 갱신하고, 계획서 ②로 넘어간다.
