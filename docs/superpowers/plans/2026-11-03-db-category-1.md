# 데이터베이스 카테고리 보강 실행 계획 ①

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 데이터베이스에 다음을 넣는다.
- 새 그림 도우미 `dbtab()`·`qrun()`·`erd()`
- 하위항목 4개, query·model 새 카드 23장
- 기존 48장 전부 전용 그림(`u-db-`)으로 다시 그리기. 직접 조작 4장은 멈춘 그림까지만

남은 일(tx·ops 새 카드 20장, 기존 48장 x, 직접 조작 붙이기, 증상, 글꼴·문서)은 계획서 ②가 한다.

**Architecture:** `index.html` 하나에서 작업한다.
- 도우미는 `httpmsg`(4137줄) 뒤, `/* 직접 조작 도우미 … */`(4152줄) 앞에 둔다.
- 카드는 `T('db', …)` 블록(2812~2870줄)에 넣는다. 새 블록은 `T('db','tip',…)`(2862줄) 앞이다.
- 그림은 back 그림 묶음 뒤, `const visual`(7928줄) 앞에 `/* db: <묶음> … */` 주석 + `Object.assign(D, {...})`로 더한다. back 조각 `bkStack`·`bkBox`·`bkRows`·`bkPills`(7684~7686줄)가 먼저 정의돼 있어야 한다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP

**Spec:** [docs/superpowers/specs/2026-11-03-db-category-design.md](../specs/2026-11-03-db-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치**: `db-category`(지금 브랜치)에서 계속한다. 계획서 ②도 같은 브랜치다.
- **클래스 접두사**: `dbtab` = `mk-db*`, `qrun` = `mk-dq*`, `erd` = `mk-er*`, 직접 조작 멈춘 그림·전용 칸 = `mk-dg*`.
  - 측정: `mk-db`·`mk-dq`·`mk-er`·`mk-dg`는 0건이다. `mk-dt`·`mk-qr`은 이미 쓰여 쓰지 않는다.
- **D 키**: `'u-db-' + slug(en)`. 예: `N+1 Problem` → `u-db-n-1-problem`, `Spreadsheet vs DB` → `u-db-spreadsheet-vs-db`. 실제 키는 `slug()`가 정하고, `dbukey`가 `D`에 있는지 본다.
- **열 이름은 영어**: SQL과 같은 이름(`name`·`email`·`city`)을 쓴다. 지금 Table 카드의 `이름`·`이메일` 열은 다시 그릴 때 바뀐다.
- **예시 데이터**(스펙 3.4 규칙 안에서 고정):
  - 사람: 민수·지영·준호만 쓴다. 이메일 `m@a.com`(민수)·`j@a.com`(지영)·`h@a.com`(준호), 그 밖에 `a@a.com`·`s@a.com`·`k@a.com`. 전화는 `010-…`.
  - 5줄이 필요한 표(COUNT·Index)는 이름 없이 `id`·`phone`·`email`만 쓴다.
  - 상품: 책 12000·펜 1000·컵 5000·공책 3000, 글: 공지·후기·질문. 날짜는 `10-01` 꼴.
- **qrun 줄 한도**: 결과 줄(모든 결과 표의 행 합)은 8줄까지다. 키프레임 `mk-cdz1~8`이 8개라서다. 넘으면 `'qrun: '` 오류.
- **qrun 안의 sr**: 안쪽 `dbtab`의 `<p class="sr">`는 빼고, `qrun` 끝에 sr 하나만 둔다(두 번 읽히지 않게).
- **mark 빈 칸**: `mark` 항목이 `''`이면 그 줄은 꼬리표가 없다(DELETE의 남는 줄, Index의 안 읽은 줄).
- **row 강조 표시**: 행 강조는 그 행 첫 칸 뒤에 `강조` 꼬리표, 열 강조는 머리 칸에, 칸 강조는 그 칸에 붙인다. 모두 배경 `var(--mark-bg)`와 함께다.
- **측정값 보정**: 스펙 2장은 객체 v 41장·공유 그림 7장이라 했지만, 다시 재니 객체 v 40장·공유 그림 문자열 8장(Hard Delete `shake` 포함)이다. 합 48장은 같다. 원장에 `Ruling:`으로 적는다.
- **스펙 표에서 바꾼 예시**(원장 `Ruling:`):
  - qrun `hl`: 스펙은 표 2개일 때 `[hl0, hl1]`을 허용하지만, 표 2개를 쓰는 카드(Cascade Delete)에 강조가 없어 쓸 곳이 없다. 표 2개면 hl을 막는다(쓸 카드가 생기면 그때 더함).
  - Migration: 스펙은 `ls` 결과에 적용됨·대기를 붙였지만 `ls`는 상태를 출력하지 않는다. 파일 이름만 보이고 상태는 cap에 쓴다(Task 4).
  - LIKE: users 대신 products(민트차·녹차·민트캔디)로 한다. 사람 이름이 셋뿐이라 `'민%'`이 1줄만 걸려 "여러 줄 중 일부"가 안 보이기 때문이다. 스펙 3.4의 이름 규칙은 지킨다.
  - Auto Increment: 있던 줄을 2줄(민수·지영)로 두고 준호를 넣어 id 3이 생긴다(스펙은 "id 4"). 새 사람 이름을 만들지 않기 위해서다.
- **점검 이름**: `db` 접두사로 쓴다: `DBS`·`dbcat`·`dbobj`·`dbukey`·`dbsym`·`dbx`·`dbm`·`dbou`·`dbwrong`·`dbtext`·`dbxn`·`dbsafe`·`dbshare`·`dbhelp`·`dbstill`. 측정: `check('db`는 0건이다. 차이 함수는 back의 `bkdiff`를 그대로 쓴다.
- **남은 옛 카드 목록**(back `BK_TODO` 방식, 목록과 실제가 다르면 `+이름`·`-이름`으로 실패):
  - `DB_TODO`: 아직 `u-db-` 그림이 아닌 옛 카드. Task 2에 48장, Task 4에서 basic·core·motion 24장을 빼고, Task 5에서 비운다. `dbukey`가 본다. `dbobj`는 객체 v 카드가 이 목록 밖에 있으면 실패한다.
  - `DB_NOX`: x가 없는 옛 카드 48장. `DB_TODO`를 복사하지 않고 이름을 직접 적는다(`DB_TODO`가 줄어도 그대로). 계획서 ②가 비운다. `dbx`가 본다.
  - 기호가 남은 옛 카드는 0장이다(측정). `dbsym`은 목록 없이 0장을 본다.
- **옛 p 두 장**: `dbtext`(p는 `~줘`로 끝남)에 지금 걸리는 카드는 UPDATE(`…WHERE 꼭 넣어`)·Personal Data(`…받지 마`) 2장이다(측정). 스펙 4장대로 미루지 않고 Task 2에서 고친다.
- **LATER 사용**: `redrawn:db/basic·core·motion`은 Task 4, `redrawn:db/adv·tip`은 Task 5에서 뺀다(sql은 flow·big·stack이 없어 처음부터 통과, 측정). `font`·`doccount`는 계획서 ②에서 뺀다. `doccount`는 Task 3에서 1552장이 되면 실패하므로 Task 2부터 둔다.
- **r 시점**: 같은 Task와 앞 Task 카드, 이미 있는 다른 카테고리 카드만 단다. 계획서 ②의 카드(Lost Update·Too Many Connections 등)를 가리키는 r은 그 카드를 넣을 때 단다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN은 쓰지 않는다.
- 색은 도판 토큰(`--ink`·`--plate`·`--fig`·`--rule`·`--muted`·`--mark`·`--mark-bg`·`--mark-text`·`--ok`·`--mono`·`--sans`)만 쓴다. hex 값을 새로 쓰지 않는다.
- 그림 글자는 11px 이상이다. `.fig`에는 그림자를 넣지 않는다.
- 자동 애니메이션은 클래스 `A`를 쓴다. 주기 10s, 멈춘 장면은 `-8.8s`다.
- `m:1`은 그림 h에 `A` 클래스가 있으면 달고, 없으면 달지 않는다. still이 아닌 `qrun`·`seq`·`track`·`doc`·`term`이 `A`를 만든다. `dbtab`·`erd`·`fcss`·`vs` 칸만 있는 그림과 멈춘 직접 조작 그림은 `m`이 없다. 점검 `dbm`이 양쪽을 본다.
- 글 폭은 `wlen`(한글 2, 그 밖 1)으로 센다. 한도: `dbtab` 이름·이름표 12폭, 열 1~3개·10폭, 행 0~5개, 칸 10폭, 꼬리표 6폭 / `qrun` SQL 1~4줄·28폭, 표 1~2개, `err` 28폭 / `erd` 표 2~3개, 이름 12폭, 열 1~4개·10폭, `type` 6폭 / `seq` back 한도(세로줄 3개면 이름 8폭, 4개면 6폭, 메시지 8개, 글 14폭).
- 상태는 색만으로 나누지 않는다(글자 "강조"·"실패"·"지움"·"읽음"을 함께 쓴다).
- 읽히는 글에 `✓✕★→←↑↓`를 쓰지 않는다(`wsym` 규칙). 그림 속 숫자·날짜·건수는 "(예시)"로 표시하고, 접속 주소·비밀번호는 `****`로 가린다. 전화번호 전체·주소를 쓰지 않는다.
- SQL은 표준 SQL로 쓴다. DB마다 다른 문법은 x에 "DB마다 달라요". 그림 속 오류는 한국어 요약이고, 실제 원문은 cap·x에 "(PostgreSQL 예)"로 쓴다.
- 브랜드: 로고는 쓰지 않는다. DB 제품 이름(MySQL·PostgreSQL·Redis·Supabase)은 카드 주제이거나 예로 들 때만 쓴다.
- `dbtab`은 `vs` 칸 안에 넣지 않는다. 표끼리 비교는 `tag`를 단 `dbtab` 두 개를 `bkStack`으로 쌓는다. 코드가 들어가는 칸은 `fcss`로 쓴다.
- 카드 문구:
  - 새 카드 `d`·`x`는 해요체다. `x`는 2~3문장이고, 짝이 있으면 차이를 먼저 쓴다(스펙 5장 짝 목록).
  - `p`: "~해줘" 지시문에 정식 용어를 넣는다. `l`: 1~3.
  - `ko`는 기존 db 형식(`한글 · 풀이`)을 따른다.
  - 버전 숫자와 "가장 빠른·최신" 같은 단정을 쓰지 않는다(스펙에 적힌 PostgreSQL 18 skip scan 한 곳은 출처와 함께 쓴다).
- `r`은 1~3개이고, 스펙 4장 r 후보 중 이미 있는 카드만 단다. 뜻이 다른 짝(`DB_WRONG`)은 r에 넣지 않는다. 다른 카테고리 카드 본문은 바꾸지 않는다.
- `o:1`은 PostgreSQL 공식 문서를 직접 열어 확인했을 때만 쓴다. 그때 `u`에 공식 문서 주소 문자열을 단다. 출처는 원장에 적는다.
- 커밋:
  - 한국어 `feat:`/`fix:`/`docs:`로 쓰고 attribution 줄을 넣지 않는다.
  - `.impeccable/hook.cache.json`·`core375.png`는 스테이징하지 않는다. 경로를 지정해서 올리고 `git add -A`·`-a`는 쓰지 않는다.
- Python은 `newline='\n'`로 쓰고 `python -E`로 돌린다. 정규식이 든 스크립트는 heredoc이 아니라 Write 도구로 쓴다.
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필·저장된 로그인은 쓰지 않고, `state save` 파일도 만들지 않는다.

## Review Focus

1. **320px의 가장 큰 입력**: `dbtab` 3열 × 5행 × 10폭(+ 강조·꼬리표), `qrun` 실행 전 표 2개 + SQL 4줄 × 28폭 + 결과 표 2개, `erd` 표 3개 × 열 4개 × 10폭 + `type`이 가로 넘침 없이 들어가야 한다. → Task 1 브라우저 확인(시험 그림 `u-db-test`를 임시로 띄우고 커밋 전에 지움). 넘치면 칸 안 줄바꿈·안쪽 여백을 줄인다. 폭 한도는 낮추지 않는다(스펙 3.1).
2. **NULL·빈 글자·0이 섞인 표**: 칸 값 `'NULL'`은 기울인 "NULL", `''`은 "빈 글자" 꼬리표, `'0'`은 그냥 0으로 보이고 sr도 셋을 다르게 읽는다. `pick`이 `'NULL'`을 `null`로, `'25'`를 숫자로 넘긴다. → Task 1 `dbhelp`
3. **손으로 적은 결과가 쿼리와 어긋남**: `after` 값이 실행 전 표·숫자·NULL·강조 칸 밖이면 오류다. 그래도 값 자체가 틀릴 수 있으니(예: 정렬 순서, 빠진 줄) 카드마다 쿼리를 손으로 돌려 본 결과를 원장에 적는다. → Task 1 `dbhelp`, Task 3·5 사실 확인, 디렉터 검토 B·C
4. **자주 틀리는 SQL 사실**:
   - `COUNT(*)`는 모든 줄, `COUNT(열)`은 NULL이 아닌 줄만 센다. `= NULL`은 아무 줄도 고르지 않고 `IS NULL`을 써야 한다.
   - `BETWEEN a AND b`는 양 끝을 포함한다. `LEFT JOIN`에서 짝이 없는 오른쪽 칸은 NULL이다.
   - `HAVING`은 묶은 뒤 거르고 `WHERE`는 묶기 전에 거른다. FK 기본 동작(NO ACTION)이면 참조된 줄을 지우는 DELETE는 막힌다.
   - `ORDER BY` 없는 `LIMIT`은 어떤 줄이 나올지 정해지지 않는다.

   PostgreSQL 공식 문서와 다르면 안 된다. → Task 3·4·5 출처 확인, 디렉터 검토 묶음 B·C
5. **개인정보·비밀 값처럼 보이는 글**: 그림에 전화번호 전체(`010-1234-5678`), 가리지 않은 접속 비밀번호(`postgres://app:pw@`)가 없어야 한다. → Task 2 `dbsafe`

---

## 공통 절차 (Task 3~5)

1. **실패하는 점검 추가**(`tests/check.mjs`): 그 Task가 적은 기대값을 먼저 넣는다.
2. **실패 확인**: `node tests/check.mjs` → Task가 적은 `FAIL` 줄이 나온다. 60~100초 걸리니 Bash timeout은 200000이다.
3. **사실 확인**: 카드마다 1차 출처(PostgreSQL 공식 문서 우선)를 열어 확인하고, 원장에 `Task N 출처: <en> — <URL>`을 적는다. `after`를 쓴 카드는 원장에 `Task N 결과 대조: <en> — <실행 전 표로 손으로 돌린 결과>`를 적는다.
4. **데이터·그림**: Task 표대로 넣는다. 그림 묶음 주석에 출처와 "예시" 값을 적는다(back 묶음 주석 형식).
5. **점검 통과**: `node tests/check.mjs` → `FAIL` 줄 없이 `OK <수>`. `LATER`는 그 시점에 남아 있어야 할 것만 있다.
6. **브라우저 확인**(아래 절차)
7. **커밋**: Task가 적은 메시지로 커밋하고, 원장 갱신을 같은 호출에서 한다.

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -E -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다. 끝나면 TaskStop으로 멈춘다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/db/<sec>`
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

### Task 1: 도우미 `dbtab()`·`qrun()`·`erd()`

쓸 스킬: superpowers:test-driven-development, break-ui(시험 그림), interfaces:better-layout

**Files:**
- Modify: `index.html`
  - 새 도우미: `httpmsg`(4137줄) 뒤, 4152줄 주석 앞
  - CSS: seq·httpmsg CSS(439~446줄) 뒤. `.mk-dqm.A` 규칙은 506줄 `.mk-cds.A` 옆
  - 568줄 `.fig:has(…) .figcap{position:static…}` 목록과, 같은 꼴의 `.stage{padding-bottom:14px}` 규칙(`bkpad`가 보는 규칙)에 `.mk-db`·`.mk-dq`·`.mk-er` 추가
- Modify: `tests/check.mjs`: `bkhelp`(285줄) 뒤에 `dbhelp`, `bkpad`(320줄) 배열에 `'mk-db', 'mk-dq', 'mk-er'`, `cdframe`(658줄)에 `dqm`
- Modify: `DESIGN.md`: 도우미 표에 세 줄

**Interfaces:**
- Produces:
  - `dbtab({name, tag, cols, rows = [], hl = [], mark, label} = {}) → string`
    - 바깥: `<div class="mk-db">`. `label`이 있으면 `role="group" aria-label`(tabindex는 붙이지 않는다).
    - 머리띠: `<div class="mk-dbh" aria-hidden="true">` 안에 `tag`가 있으면 `<b class="mk-dbg">${tag}</b>`, 이어서 `${name} 테이블`.
    - 표: `<table class="mk-dbt" aria-hidden="true">`. 머리 칸 `<th>`에 열 이름, key가 있으면 `<b class="mk-dbk">PK</b>`(또는 FK).
    - 칸: `'NULL'`은 `<i class="mk-dbn">NULL</i>`, `''`은 `<b class="mk-dbk">빈 글자</b>`, 그 밖은 `esc(값)`.
    - 강조: 그 칸·행·열 요소에 `mk-dbon` 클래스, 꼬리표 `<b class="mk-dbk">강조</b>`(행은 첫 칸 뒤, 열은 머리 칸, 칸은 그 칸).
    - `mark`: 줄마다 꼬리표 `<b class="mk-dbk">${mark[i]}</b>`를 마지막 칸 뒤에 붙인다(`''`이면 없음).
    - 행 0개면 표 아래 `<p class="mk-dbe" aria-hidden="true">결과 없음(0줄)</p>`.
    - 끝 `<p class="sr">`: `[tag, ]${name} 테이블, 열 ${c}개(${열 이름[ PK|FK]를 ', '로}), 행 ${n}줄.` 뒤에 줄마다 ` ${i}줄: ${칸을 ', '로}[ (${mark})].`(NULL은 `NULL`, 빈 글은 `빈 글자`). 행 0개면 `행 0줄, 결과 없음.`. 강조가 있으면 ` 강조: ${hl 순서대로 '2줄'·'phone 열'·'2줄 phone 칸'을 ', '로}.`
    - 오류는 `'dbtab: '`로 시작한다. 검사: name·tag 문자열·wlen ≤ 12(name은 빈 글 금지), cols 1~3개, 열 이름 wlen 1~10, key가 PK·FK 외, 열에 `type`, rows 0~5개, 줄마다 칸 수 = 열 수, 칸이 문자열이 아님·wlen > 10, hl이 없는 행·열·칸, mark 길이 ≠ 행 수, 꼬리표 wlen > 6.
  - `qrun({sql, from, pick, show, after, err, del, hl, still = false, label} = {}) → string`
    - 바깥 `<div class="mk-dq">`(label은 dbtab과 같음). 위에서 아래로: 실행 전 표(`dbtab`, 2개면 위아래) → `<div class="mk-dqr" aria-hidden="true"><b>실행</b><code>SQL 줄마다</code></div>` → 결과.
    - `pick`: `from[0]` 행을 `{열 이름: 값}`으로 바꿔(`/^-?\d+(\.\d+)?$/`는 숫자, `'NULL'`은 `null`) 넘긴다. 고른 행은 실행 전 표에서 `{row}` 강조, 결과 표는 고른 행(`show`가 있으면 그 열만, 순서는 `show` 순서).
    - `del`: 고른 행은 실행 전 표에서 `mark` "지움"만 붙이고 `{row}` 강조는 하지 않는다. 결과 표는 남은 행 전체.
    - `after`+`hl`: 결과 `<tr>`의 class는 dbtab이 준 `mk-dbon` 뒤에 붙인다(`class="mk-dbon mk-dqm mk-cdz1 A"`). `after` 표가 2개면 `hl`을 쓸 수 없다(주면 오류).
    - 결과 머리띠 `<div class="mk-dqh" aria-hidden="true">`: `결과 ${n}줄`, del은 `지운 뒤 남은 줄 ${n}줄`, `after` 표 2개면 `결과 표 2개`.
    - 결과 행 k(1부터, 결과 표가 둘이면 이어서 셈)의 `<tr>`에 `mk-dqm${still ? '' : ` mk-cdz${k} A`}`.
    - `err`: 결과 자리에 `<p class="mk-dqm mk-dqf${still ? '' : ' mk-cdz1 A'}"><b class="mk-dbk">실패</b>${err}<span>표는 그대로예요</span></p>` 하나.
    - 안쪽 `dbtab`의 sr은 빼고, 끝에 `<p class="sr">쿼리 ${sql을 ' '로} 실행. 실행 전 ${표 이름 n줄을 ', '로}. ${몸}.</p>` 하나. 몸: pick·after 표 하나 `결과 ${n}줄: ${줄}`(0줄이면 `결과 0줄`) / del `지운 뒤 남은 줄 ${n}줄: ${줄}` / 표 둘 `결과 ${이름} ${n}줄: ${줄}; ${이름} ${n}줄: ${줄}` / err `실패: ${err}, 표는 그대로예요`. `줄`은 줄마다 칸을 ' '로, 줄끼리 ', '로 잇는다. after에 hl이 있으면 몸 뒤에 `, 강조: …`(dbtab과 같은 이름).
    - 오류는 `'qrun: '`로 시작한다(표 모양 오류는 `dbtab: `가 그대로 올라와도 된다). 검사: sql 1~4줄·문자열·wlen 1~28, from 1~2개, pick·after·err 중 정확히 하나, pick이 함수 아님, show·del은 pick과만, show와 del 함께, show에 없는 열, hl은 after와만, after 표 1~2개, err wlen 1~28, 결과 줄 합 > 8, after 값 점검(칸 값이 실행 전 표 어딘가의 값·숫자 모양·`'NULL'`·hl이 덮는 칸 중 하나가 아님).
  - `erd({tables, links = [], hl = [], label} = {}) → string`
    - 바깥 `<div class="mk-er">`. 표 상자 `<div class="mk-erb">`(강조면 `mk-eron`)를 세로로 쌓는다. 상자 안: 이름, 열마다 `<li>` 이름 + key 꼬리표 + `type`이면 `<span class="mk-ert">${type}</span>`. 강조 열은 `mk-eron` + "강조" 꼬리표.
    - 상자 i와 i+1 사이에 link가 있으면 `<div class="mk-erl" aria-hidden="true"><b class="mk-dbk">1 : N</b>${fk 표}.${fk}로 이어져요</div>`. N:M이면 `<b class="mk-dbk">N : M</b>중간 표가 필요해요`. 상자들도 `aria-hidden`이다.
    - 끝 `<p class="sr">관계도. ${표마다 '이름 표(열[ PK|FK][ type], …)'를 ', '로}. ${link마다 문장}.[ 강조: ${hl을 ', '로}.]</p>`. link 문장: `1:N` "a 하나에 b 여럿", `N:1` "a 여럿에 b 하나", `1:1` "a 하나에 b 하나", 뒤에 `, ${fk 표}.${fk}로 이어져요`. `N:M` "a 여럿과 b 여럿, 중간 표가 필요해요". 여러 link는 `. `로 잇는다.
    - 오류는 `'erd: '`로 시작한다. 검사: tables 2~3개, 이름 wlen 1~12, 열 1~4개, 열 이름 wlen 1~10, key가 PK·FK 외, type wlen 1~6, link의 a·b가 정수·범위 안·|a−b| = 1, kind가 넷 외, fk가 `kind`가 정한 표에 `key:'FK'` 열로 없음(1:N은 b, N:1은 a, 1:1은 둘 중 하나), N:M에 fk, hl이 없는 표·열.

- [ ] **Step 1: 실패하는 점검 `dbhelp` 쓰기**

`bkhelp` 바로 뒤에 둔다. 형식은 `bkhelp`와 같다.

```js
check('dbhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(dbtab|qrun|erd): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); });
  const U = {name:'users', cols:[{n:'id', key:'PK'}, 'name', 'phone'], rows:[['1', '민수', '010-…'], ['2', '지영', 'NULL'], ['3', '준호', '']]};
  has(dbtab({...U, hl:[{row:1}, {col:2}], label:'회원 표'}), ['class="mk-db" role="group" aria-label="회원 표"', 'class="mk-dbh" aria-hidden="true"', 'users 테이블', 'class="mk-dbt" aria-hidden="true"', '<b class="mk-dbk">PK</b>',
    '<i class="mk-dbn">NULL</i>', '<b class="mk-dbk">빈 글자</b>', 'mk-dbon', '>강조<',
    '<p class="sr">users 테이블, 열 3개(id PK, name, phone), 행 3줄. 1줄: 1, 민수, 010-…. 2줄: 2, 지영, NULL. 3줄: 3, 준호, 빈 글자. 강조: 2줄, phone 열.</p>'], 'dbtab');
  has(dbtab({name:'users', cols:['email'], rows:[['a@a.com'], ['m@a.com']], mark:['', '읽음'], hl:{cell:[1, 0]}}), ['>읽음<', '1줄: a@a.com. 2줄: m@a.com (읽음). 강조: 2줄 email 칸.</p>'], 'dbtab mark');
  has(dbtab({name:'orders', tag:'나누기 전', cols:['id'], rows:[]}), ['<b class="mk-dbg">나누기 전</b>', '결과 없음(0줄)', '<p class="sr">나누기 전, orders 테이블, 열 1개(id), 행 0줄, 결과 없음.</p>'], 'dbtab 0줄');
  if (dbtab(U).includes('tabindex') || dbtab(U).includes('강조')) bad.push('dbtab 기본');
  no(() => dbtab({...U, name:'a'.repeat(13)}), '이름 13폭'); no(() => dbtab({...U, tag:'a'.repeat(13)}), '이름표 13폭'); no(() => dbtab({...U, cols:[]}), '열 0개');
  no(() => dbtab({name:'t', cols:['a', 'b', 'c', 'd'], rows:[]}), '열 4개'); no(() => dbtab({name:'t', cols:['a'.repeat(11)], rows:[]}), '열 11폭'); no(() => dbtab({name:'t', cols:[{n:'a', key:'UK'}], rows:[]}), 'key');
  no(() => dbtab({name:'t', cols:[{n:'a', type:'글자'}], rows:[]}), 'dbtab type'); no(() => dbtab({name:'t', cols:['a'], rows:Array(6).fill(['1'])}), '행 6개');
  no(() => dbtab({name:'t', cols:['a'], rows:[['a'.repeat(11)]]}), '칸 11폭'); no(() => dbtab({name:'t', cols:['a', 'b'], rows:[['1']]}), '칸 수'); no(() => dbtab({name:'t', cols:['a'], rows:[[1]]}), '칸 숫자');
  no(() => dbtab({...U, hl:{row:3}}), '없는 행'); no(() => dbtab({...U, hl:{col:3}}), '없는 열'); no(() => dbtab({...U, hl:{cell:[0, 5]}}), '없는 칸');
  no(() => dbtab({...U, mark:['읽음']}), 'mark 수'); no(() => dbtab({...U, mark:['abcdefg', '', '']}), '꼬리표 7폭');
  const P = {name:'posts', cols:['id', 'title', 'likes'], rows:[['1', '공지', '3'], ['2', '후기', '25'], ['3', '질문', '12']]};
  const q = qrun({sql:['SELECT title FROM posts', 'WHERE likes > 10'], from:[P], pick: r => r.likes > 10, show:['title']});
  has(q, ['class="mk-dq"', 'class="mk-dqr" aria-hidden="true"', '<b>실행</b>', 'class="mk-dqh" aria-hidden="true">결과 2줄', 'mk-dqm mk-cdz1 A', 'mk-dqm mk-cdz2 A',
    '<p class="sr">쿼리 SELECT title FROM posts WHERE likes &gt; 10 실행. 실행 전 posts 3줄. 결과 2줄: 후기, 질문.</p>'], 'qrun pick');
  if ((q.match(/class="sr"/g) || []).length !== 1 || q.includes('mk-cdz3')) bad.push('qrun sr 하나·결과 2줄');
  if (!qrun({sql:['a'], from:[P], pick: r => r.likes === 25}).includes('결과 1줄')) bad.push('숫자로 바꿈');
  if (!qrun({sql:['a'], from:[U], pick: r => r.phone === null}).includes('결과 1줄: 2 지영 NULL.')) bad.push('NULL은 null');
  has(qrun({sql:['DELETE FROM users', 'WHERE id = 3'], from:[U], pick: r => r.id === 3, del:1}), ['>지움<', '지운 뒤 남은 줄 2줄', '지운 뒤 남은 줄 2줄: 1 민수 010-…, 2 지영 NULL.</p>'], 'qrun del');
  const e1 = qrun({sql:['INSERT INTO users', "VALUES (4, 'x')"], from:[U], err:'이미 있는 이메일이에요'});
  has(e1, ['>실패<', '이미 있는 이메일이에요', '표는 그대로예요', 'mk-cdz1 A', '실패: 이미 있는 이메일이에요, 표는 그대로예요.</p>'], 'qrun err'); if (e1.includes('mk-cdz2')) bad.push('qrun err 한 줄');
  const U2 = {name:'users', cols:['id', 'name'], rows:[['1', '민수'], ['2', '지영']]}, O = {name:'orders', cols:['id', 'user_id'], rows:[['1', '1'], ['2', '2']]};
  has(qrun({sql:['DELETE FROM users', 'WHERE id = 1'], from:[U2, O], after:[{name:'users', cols:['id', 'name'], rows:[['2', '지영']]}, {name:'orders', cols:['id', 'user_id'], rows:[['2', '2']]}]}),
    ['결과 표 2개', 'mk-cdz2 A', '실행 전 users 2줄, orders 2줄. 결과 users 1줄: 2 지영; orders 1줄: 2 2.</p>'], 'qrun 표 둘');
  has(qrun({sql:['INSERT INTO users', "VALUES (3, '준호')"], from:[U2], after:{name:'users', cols:['id', 'name'], rows:[['1', '민수'], ['2', '지영'], ['3', '준호']]}, hl:{row:2}}), ['결과 3줄: 1 민수, 2 지영, 3 준호, 강조: 3줄.</p>'], 'qrun after hl');
  if (/class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(qrun({sql:['a'], from:[P], pick: () => true, still:true}))) bad.push('qrun still');
  const A1 = {name:'users', cols:['id', 'name'], rows:[['1', '민수']]};
  no(() => qrun({sql:[], from:[U2], after:A1}), 'SQL 0줄'); no(() => qrun({sql:Array(5).fill('a'), from:[U2], after:A1}), 'SQL 5줄'); no(() => qrun({sql:['a'.repeat(29)], from:[U2], after:A1}), 'SQL 29폭');
  no(() => qrun({sql:['a'], from:[], after:A1}), '표 0개'); no(() => qrun({sql:['a'], from:[U2, U2, U2], after:A1}), '표 3개'); no(() => qrun({sql:['a'], from:[U2]}), '결과 없음');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, after:A1}), 'pick+after'); no(() => qrun({sql:['a'], from:[U2], pick:'x'}), 'pick 함수 아님');
  no(() => qrun({sql:['a'], from:[U2], after:A1, show:['id']}), 'show 홀로'); no(() => qrun({sql:['a'], from:[U2], pick: () => true, show:['id'], del:1}), 'show+del');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, show:['age']}), 'show 없는 열'); no(() => qrun({sql:['a'], from:[U2], after:A1, del:1}), 'del+after');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, hl:{row:0}}), 'hl+pick'); no(() => qrun({sql:['a'], from:[U2], err:'a'.repeat(29)}), 'err 29폭');
  no(() => qrun({sql:['a'], from:[U2], pick: () => true, err:'a'}), 'pick+err'); no(() => qrun({sql:['a'], from:[U2], err:'a', del:1}), 'err+del'); no(() => qrun({sql:['a'], from:[U2, U2], after:[A1, A1], hl:{row:0}}), '표 2개 hl');
  no(() => qrun({sql:['a'], from:[U2], after:[A1, A1, A1]}), 'after 3개'); no(() => qrun({sql:['a'], from:[U2], after:{name:'users', cols:['id', 'name'], rows:[['1', '하늘']]}}), '결과 값 밖');
  const F5 = {name:'t', cols:['a'], rows:Array(5).fill(['1'])}; no(() => qrun({sql:['a'], from:[U2], after:[F5, F5]}), '결과 10줄');
  const e = erd({tables:[{name:'users', cols:[{n:'id', key:'PK'}, {n:'email', type:'글자'}]}, {name:'orders', cols:[{n:'id', key:'PK'}, {n:'user_id', key:'FK'}]}], links:[{a:0, b:1, kind:'1:N', fk:'user_id'}], hl:['orders.user_id']});
  has(e, ['class="mk-er"', 'class="mk-erl" aria-hidden="true"', '>1 : N<', 'orders.user_id로 이어져요', '<span class="mk-ert">글자</span>', 'mk-eron',
    '<p class="sr">관계도. users 표(id PK, email 글자), orders 표(id PK, user_id FK). users 하나에 orders 여럿, orders.user_id로 이어져요. 강조: orders.user_id.</p>'], 'erd');
  const S = {name:'students', cols:[{n:'id', key:'PK'}]}, C = {name:'courses', cols:[{n:'id', key:'PK'}]}, EN = {name:'enrollments', cols:[{n:'course_id', key:'FK'}]};
  has(erd({tables:[S, C], links:[{a:0, b:1, kind:'N:M'}]}), ['>N : M<', '중간 표가 필요해요', 'students 여럿과 courses 여럿, 중간 표가 필요해요.'], 'erd N:M');
  has(erd({tables:[EN, C], links:[{a:0, b:1, kind:'N:1', fk:'course_id'}]}), ['enrollments 여럿에 courses 하나, enrollments.course_id로 이어져요.'], 'erd N:1');
  has(erd({tables:[{name:'users', cols:['id']}, {name:'profiles', cols:[{n:'user_id', key:'FK'}]}], links:[{a:0, b:1, kind:'1:1', fk:'user_id'}]}), ['users 하나에 profiles 하나, profiles.user_id로 이어져요.'], 'erd 1:1');
  const T2 = [S, C], T3 = [S, EN, C];
  no(() => erd({tables:[S]}), '표 1개'); no(() => erd({tables:[S, C, S, C]}), '표 4개'); no(() => erd({tables:[{name:'a'.repeat(13), cols:['id']}, C]}), '이름 13폭');
  no(() => erd({tables:[{name:'t', cols:[]}, C]}), '열 0개'); no(() => erd({tables:[{name:'t', cols:['a', 'b', 'c', 'd', 'e']}, C]}), '열 5개'); no(() => erd({tables:[{name:'t', cols:['a'.repeat(11)]}, C]}), '열 11폭');
  no(() => erd({tables:[{name:'t', cols:[{n:'a', type:'가나다라'}]}, C]}), 'type 8폭'); no(() => erd({tables:[{name:'t', cols:[{n:'a', key:'UK'}]}, C]}), 'erd key');
  no(() => erd({tables:T3, links:[{a:0, b:2, kind:'1:N', fk:'course_id'}]}), '이웃 아님'); no(() => erd({tables:T2, links:[{a:0, b:1, kind:'2:1'}]}), 'kind');
  no(() => erd({tables:[EN, C], links:[{a:0, b:1, kind:'1:N', fk:'course_id'}]}), '1:N fk 자리'); no(() => erd({tables:[{name:'a', cols:['x']}, {name:'b', cols:['x']}], links:[{a:0, b:1, kind:'1:N', fk:'x'}]}), 'fk 아닌 열');
  no(() => erd({tables:T2, links:[{a:0, b:1, kind:'N:M', fk:'id'}]}), 'N:M fk'); no(() => erd({tables:T2, hl:['posts']}), '없는 표 강조'); no(() => erd({tables:T2, hl:['students.age']}), '없는 열 강조');
  return bad.join(', ');
})()`, ctx));
```

- `cdframe` 끝의 `sd` 줄 옆에 같은 꼴로 `dq = html.match(/\.mk-dqm\.A\{[^}]*animation-delay:-([\d.]+)s/)`를 더하고, 맞지 않으면 `'dqm'`을 돌려준다.
- `bkpad`의 배열을 `['mk-sd', 'mk-hm', 'mk-db', 'mk-dq', 'mk-er']`로 늘린다.

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs`
Expected: `FAIL dbhelp: dbtab is not defined`, `FAIL cdframe: dqm`, `FAIL bkpad: mk-db, mk-dq, mk-er`

- [ ] **Step 3: `dbtab`·`qrun`·`erd` 구현**: `wlen`·`esc`를 쓰고, 입력 검사를 먼저 한 뒤 HTML을 만든다. `qrun`은 `dbtab`으로 표를 만든 뒤 sr을 빼고 결과 `<tr>`에 클래스를 붙인다. CSS를 seq·httpmsg CSS 뒤에 두고, 506줄에 `.mk-dqm.A{opacity:0;animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}`를 더한다(`.mk-sdm.A`와 같은 값). 키프레임은 기존 `mk-cdz1~8`을 그대로 쓴다. 568줄 목록과 패딩 규칙에 세 접두사를 넣는다.
  - 표 CSS: `table-layout:fixed;width:100%`, 칸 `overflow-wrap:anywhere`, 칸 글 `12px var(--mono)`, 꼬리표 `11px`. NULL은 `font-style:italic;color:var(--muted)`.

- [ ] **Step 4: 통과 확인**

Run: `node tests/check.mjs`
Expected: `FAIL` 줄 없이 `OK <수>`

- [ ] **Step 5: 브라우저·break-ui 확인**
  - Review Focus 1 그림을 임시 키 `u-db-test`로 아무 db 카드 v에 잠깐 걸고 확인한다.
    - dbtab: 3열 × 5행, 열 이름 10폭(`created_at`·`student_id`·`updated_at`), 칸 10폭(`m@a.com`·`COUNT(*)`·`category`·`abcdefghij`), 행·열·칸 강조와 6폭 꼬리표, NULL·빈 글자
    - qrun: 실행 전 표 2개(3열 × 5행) + SQL 4줄 × 28폭(`SELECT title FROM posts p JO` 꼴) + 결과 표 2개(합 8줄)
    - erd: 표 3개 × 열 4개 × 10폭 + `type` 6폭 + link 2개(1:N·N:1)
  - 넘침·작은 글자를 320/375/1280에서 본다. 넘치면 칸 안쪽 여백(가로 4px까지)과 줄바꿈으로 맞추고, 그래도 안 되면 원장에 적고 스펙 10장대로 처리한다.
  - reduced-motion에서 qrun 결과 행이 모두 보이는지 본다.
  - 임시 키와 v를 지운다. `git diff`에 `u-db-test`가 없어야 한다.

- [ ] **Step 6: DESIGN.md·커밋**: 도우미 표에 `dbtab({name,tag,cols,rows,hl,mark,label})`·`qrun({sql,from,pick,show,after,err,del,hl,still,label})`·`erd({tables,links,hl,label})`를 한 줄씩 넣는다(한도와 "dbtab은 vs 칸에 넣지 않음", "after 값 점검" 포함).

```bash
git add index.html tests/check.mjs DESIGN.md
git commit -m "feat: 데이터베이스 그림 도우미 dbtab·qrun·erd"
```

뒤이어 **디렉터 검토 묶음 A**

---

### Task 2: 하위항목 4개와 점검 기대값

**Files:**
- Modify: `index.html:1732`(CAT), UPDATE·Personal Data 카드의 p(2855·2870줄 근처)
- Modify: `tests/check.mjs`(COUNT·REDRAWN·LATER, 새 db 점검 묶음)

**Interfaces:**
- Produces: 점검 이름 `dbcat`·`dbobj`·`dbukey`·`dbsym`·`dbx`·`dbm`·`dbou`·`dbwrong`·`dbtext`·`dbxn`·`dbsafe`·`dbshare`, 목록 `DB_TODO`·`DB_NOX`·`DB_WRONG`, 함수 `DBS()`·`DB_SECRET()`. Task 3~5와 계획서 ②는 목록과 기대값만 고친다.

- [ ] **Step 1: 실패하는 점검 쓰기**
  - `COUNT`에 넣는다(측정값): `'db/basic': 8, 'db/core': 8, 'db/motion': 8, 'db/adv': 8, 'db/sql': 8, 'db/query': 0, 'db/model': 0, 'db/tx': 0, 'db/ops': 0, 'db/tip': 8`
  - `REDRAWN`에 `db/` 10개를 넣는다.
  - back 묶음(`bkshare`, 650줄) 뒤에 db 묶음을 둔다.

```js
const DBS = () => g.TERMS.filter(t => t.c === 'db');
check('dbcat', () => { const a = g.CATS.find(c => c.id === 'db').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,sql,query,model,tx,ops,tip' ? '' : a; });
const DB_TODO = ["Table","Row","Column","Primary Key","Foreign Key","Data Type","Query","Schema","SQL","RDBMS","NoSQL","Relation","Index","Migration","Transaction","Backup","Data Flow","Join","Sorting","Filtering","Seed Data","Rollback","Replication","Sync",
  "Normalization","N+1 Problem","Slow Query","Redis","ERD","Soft Delete","Sharding","Supabase","SELECT","INSERT","UPDATE","DELETE","WHERE","ORDER BY","GROUP BY","LIMIT","Hard Delete","Restore","Data Integrity","Unique Constraint","NULL","Timestamp","Spreadsheet vs DB","Personal Data"];    // 아직 u-db- 그림이 아닌 옛 DB 카드. 다시 그리면 여기서 뺀다
const DB_NOX = ["Table","Row","Column","Primary Key","Foreign Key","Data Type","Query","Schema","SQL","RDBMS","NoSQL","Relation","Index","Migration","Transaction","Backup","Data Flow","Join","Sorting","Filtering","Seed Data","Rollback","Replication","Sync",
  "Normalization","N+1 Problem","Slow Query","Redis","ERD","Soft Delete","Sharding","Supabase","SELECT","INSERT","UPDATE","DELETE","WHERE","ORDER BY","GROUP BY","LIMIT","Hard Delete","Restore","Data Integrity","Unique Constraint","NULL","Timestamp","Spreadsheet vs DB","Personal Data"];    // x를 아직 안 쓴 옛 카드 48장. DB_TODO와 같은 이름이지만 따로 적는다(DB_TODO는 Task 4·5에서 줄어듦). 계획서 ②가 비운다
check('dbukey', () => bkdiff(DBS().filter(t => !(typeof t.v === 'string' && t.v.startsWith('u-db-') && g.D[t.v])).map(t => t.en), DB_TODO));
check('dbobj', () => DBS().filter(t => typeof t.v === 'object' && !DB_TODO.includes(t.en)).map(t => t.en).join(', '));    // 옛 형식 그림은 남은 목록 안에만
check('dbsym', () => DBS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)}; return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en).join(', '));
check('dbx', () => bkdiff(DBS().filter(t => !t.x).map(t => t.en), DB_NOX));
check('dbm', () => DBS().filter(t => { const p = typeof t.v === 'string' && t.v.startsWith('u-db-') && g.D[t.v]; return p && !!p.m !== WA(p.h); }).map(t => t.en).join(', '));    // 재생 버튼(m)과 움직임(A)은 함께 있다
check('dbou', () => DBS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
const DB_WRONG = {'Column Alias': ['Alias'], 'Cascade Delete': ['Cascade'], 'Isolation Level': ['Test Isolation'], 'Optimistic Locking': ['Optimistic UI', 'Optimistic Update'],
  'Autocommit': ['Commit'], 'Check Constraint': ['Constraint'], 'Database Client': ['Client']};    // 이름만 비슷한 다른 뜻
check('dbwrong', () => Object.entries(DB_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'db' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en).join(', '));
check('dbtext', () => DBS().filter(t => WSYM(t.d + (t.x || '')) || !/줘$/.test(t.p)).map(t => t.en).join(', '));    // d·x에 기호 없음, p는 ~줘
check('dbxn', () => DBS().filter(t => { const n = (t.x || '').match(/[.?!](?=\s|$)/g)?.length || 0; return t.x && (n < 2 || n > 3); }).map(t => t.en).join(', '));    // x는 2~3문장
const DB_SECRET = s => /\b01\d-\d{3,4}-\d{4}\b/.test(s) || /:\/\/[^:\s/]+:(?!\*{4}@)[^@\s]+@/.test(s);    // 전화번호 전체·가리지 않은 접속 비밀번호
check('dbsafe', () => [...['010-1234-5678', 'postgres://app:pw1@db'].filter(x => !DB_SECRET(x)).map(x => '못 잡음 ' + x), ...(DB_SECRET('postgres://app:****@db') || DB_SECRET('010-…') ? ['오탐'] : []),
  ...DBS().filter(t => { const p = typeof t.v === 'string' && g.D[t.v]; return p && DB_SECRET(p.h.replace(/<[^>]+>/g, ' ') + ' ' + (p.cap || '')); }).map(t => t.en)].join(', '));
check('dbshare', () => ['stagger', 'chip', 'spring', 'rotate', 'progress', 'shake'].filter(k => !g.D[k]).join(', '));    // 옛 db 카드가 쓰던 공유 그림 키는 남긴다
```

  - `DB_TODO`는 2026-11-03에 잰 값이다(db 48장, 측정 순서 그대로). Step 2 전에 `head -131 tests/check.mjs`로 만든 임시 `tests/_cnt.mjs`에서 한 번 더 재서 같은지 보고 지운다.
  - `LATER`에 넣는다: `'font', 'doccount', 'redrawn:db/basic', 'redrawn:db/core', 'redrawn:db/motion', 'redrawn:db/adv', 'redrawn:db/tip'`

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs`
Expected: `FAIL dbcat: basic,core,motion,adv,sql,tip`, `FAIL count:db/query: no sec ≠ 0`(model·tx·ops도 같음), `FAIL dbtext: UPDATE, Personal Data`. 아울러 `LATER redrawn:db/` 5개가 나온다. 나머지 새 점검은 목록이 지금 상태와 같아서 통과한다.

- [ ] **Step 3: CAT·p 고치기**
  - 1732줄 `['sql',…]` 뒤에 스펙 4장의 네 항목(`query`·`model`·`tx`·`ops`, 이름과 설명 그대로)을 넣는다.
  - UPDATE p: `'3번 회원 이메일만 UPDATE 해줘. WHERE를 꼭 넣어 줘'`
  - Personal Data p: `'꼭 필요한 개인정보만 저장하고 나머지는 받지 않게 해줘'`

- [ ] **Step 4: 통과 확인**

Run: `node tests/check.mjs`
Expected: `FAIL` 없이 `OK <수>`. `LATER` 줄은 `redrawn:db/` 5개이고, `font`·`doccount`는 아직 통과해서 줄이 안 나온다. 빈 하위항목 4개는 화면에서 "카드 없음"으로 보이고, Task 3·계획서 ②까지 이 상태다.

- [ ] **Step 4b: 돌연변이 확인**: `DB_TODO`에서 `"Table"`을 잠깐 빼면 `FAIL dbukey: +Table`, `DB_NOX`에서 `"Table"`을 잠깐 빼면 `FAIL dbx: +Table`이 나오는지 보고 되돌린다(`git diff tests/check.mjs`로 원래대로인지 확인).

- [ ] **Step 5: 커밋**

```bash
git add index.html tests/check.mjs
git commit -m "feat: 데이터베이스 하위항목 4개와 점검 기대값"
```

---

### Task 3: query·model 새 카드 23장 (공통 절차)

쓸 스킬: design-skills:ux-writing·interfaces:better-writing(d·x 문구), superpowers:test-driven-development

**Files:**
- Modify: `index.html`
  - 새 블록 `T('db','query',[…])`·`T('db','model',[…])`를 `T('db','tip',…)` 앞에 둔다.
  - 그림은 `/* db: query·model … */` 묶음으로 back 묶음 뒤, `const visual` 앞에 둔다.
- Modify: `tests/check.mjs`: EXPECT·COUNT·total

- [ ] **Step 1: 실패하는 점검**
  - `EXPECT['db/query']`, `EXPECT['db/model']`: 아래 표 순서 그대로
  - `COUNT['db/query'] = 12`, `COUNT['db/model'] = 11`
  - `total`: 1529 → 1552
- [ ] **Step 2: 실패 확인**: `FAIL expect:db/query`·`expect:db/model`·`count:db/query: 0 ≠ 12`·`count:db/model: 0 ≠ 11`·`total`. 새 카드를 넣는 중 x나 `u-db-` 그림이 빠지면 `dbx`·`dbukey`가 `+이름`으로 바로 잡는다.
- [ ] **Step 3~5**: 공통 절차 3~5. 모든 새 카드에 `x`와 `v:'u-db-<slug>'`를 넣는다. `m:1`은 Global Constraints 규칙대로다(qrun 카드는 `m:1`, erd·dbtab만 있는 카드는 없음).
- [ ] **Step 6: 브라우저 확인**: `#/c/db/query`, `#/c/db/model`
- [ ] **Step 7: 커밋**: `feat: 데이터베이스 쿼리 더 보기·테이블 설계 새 카드`

**카드와 그림**(SQL 줄은 `/`로 나눠 적었다. 줄 폭은 wlen으로 잰 값이고 모두 28 이하다. 표는 `이름(열…): 줄; 줄` 꼴로 줄였다):

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| query | INNER JOIN | 이너 조인 · 짝이 있는 줄만 합치기 | `qrun` from posts(id, title): 1 공지; 2 후기; 3 질문 / comments(id, post_id, body): 1 1 좋아요; 2 1 감사; 3 3 답변. SQL `SELECT title, body`(18) / `FROM posts p JOIN comments c`(28) / `ON p.id = c.post_id`(19). after (title, body): 공지 좋아요; 공지 감사; 질문 답변. cap "댓글이 없는 후기는 빠져요" | Join, LEFT JOIN |
| query | LEFT JOIN | 레프트 조인 · 왼쪽 표는 다 남기기 | `qrun` from products(id, name): 1 책; 2 펜; 3 컵 / reviews(id, product_id, stars): 1 1 5; 2 3 4. SQL `SELECT name, stars`(17) / `FROM products p`(15) / `LEFT JOIN reviews r`(19) / `ON p.id = r.product_id`(22). after (name, stars): 책 5; 펜 NULL; 컵 4, hl `{cell:[1,1]}`. cap "후기가 없는 펜도 나오고, 별점은 NULL" | Join, NULL |
| query | Aggregate Function | 집계 함수 · 여러 줄을 하나로 계산 | `qrun` from orders(id, item, price): 1 책 12000; 2 펜 1000; 3 컵 5000. SQL `SELECT COUNT(*) AS 수,`(22) / `SUM(price) AS 합,`(17) / `MAX(price) AS 최고`(18) / `FROM orders`(11). after (수, 합, 최고): 3 18000 12000 | COUNT, GROUP BY |
| query | COUNT | 카운트 · 줄 수 세기 | `qrun` from users(id, phone): 1 010-…; 2 NULL; 3 010-…; 4 NULL; 5 010-…. SQL `SELECT COUNT(*) AS 전체,`(24) / `COUNT(phone) AS 전화`(20) / `FROM users`(10). after (전체, 전화): 5 3. cap "COUNT(phone)은 NULL을 세지 않아요" | Aggregate Function, NULL |
| query | HAVING | 해빙 · 묶은 뒤 거르기 | `qrun` from users(id, name, city): 1 민수 서울; 2 지영 부산; 3 준호 서울. SQL `SELECT city, COUNT(*) AS 수`(27) / `FROM users` / `GROUP BY city`(13) / `HAVING COUNT(*) >= 2`(20). after (city, 수): 서울 2 | GROUP BY, WHERE |
| query | DISTINCT | 디스팅트 · 겹치는 값 한 번만 | `qrun` from users(id, name, city) 위와 같음. SQL `SELECT DISTINCT city`(20) / `FROM users`. after (city): 서울; 부산 | SELECT |
| query | LIKE | 라이크 · 글자 모양으로 찾기 | `qrun` from products(id, name): 1 민트차; 2 녹차; 3 민트캔디. SQL `SELECT * FROM products`(22) / `WHERE name LIKE '민%'`(20) + `pick`(이름이 `민`으로 시작). cap "%는 아무 글자나 몇 글자든" | WHERE |
| query | IN | 인 · 목록 중 하나와 같음 | `qrun` from users(id, name, city): 1 민수 서울; 2 지영 부산; 3 준호 대구. SQL `SELECT * FROM users`(19) / `WHERE city IN`(13) / `('서울', '부산')`(16) + `pick` | WHERE, Subquery |
| query | BETWEEN | 비트윈 · 두 값 사이 | `qrun` from products(name, price): 펜 1000; 공책 3000; 컵 5000; 책 12000. SQL `SELECT * FROM products` / `WHERE price`(11) / `BETWEEN 1000 AND 5000`(21) + `pick`(1000 이상 5000 이하). cap "양 끝 값 1000·5000도 들어가요" | WHERE |
| query | Subquery | 서브쿼리 · 쿼리 안의 쿼리 | `qrun` from users(id, name): 1 민수; 2 지영; 3 준호 / orders(id, user_id): 1 1; 2 3. SQL `SELECT name FROM users`(21) / `WHERE id IN (`(13) / `SELECT user_id FROM orders)`(27). after (name): 민수; 준호. cap "안쪽 쿼리 결과(1, 3)로 바깥을 걸러요" | Query, IN |
| query | Column Alias | 열 별칭 · 결과 열에 붙인 이름 | `qrun` from users(id, name, city) HAVING과 같음. SQL `SELECT name AS 이름,`(20) / `city AS 도시`(12) / `FROM users`. after (이름, 도시): 민수 서울; 지영 부산; 준호 서울. cap "표는 그대로고, 결과 열 이름만 바뀌어요" | SELECT |
| query | IS NULL | 이즈 널 · 값이 없는 줄 찾기 | `qrun` from users(name, phone): 민수 010-…; 지영 NULL; 준호 010-…. SQL `SELECT * FROM users` / `WHERE phone IS NULL`(19) + `pick`(phone이 null). cap "= NULL로는 아무 줄도 안 나와요" | NULL, WHERE |
| model | NOT NULL | 낫 널 · 꼭 있어야 하는 칸 | `qrun` from users(id, name, email): 1 민수 m@a.com. SQL `INSERT INTO users`(17) / `(id, email)`(11) / `VALUES (2, 'j@a.com')`(21). err "이름은 비울 수 없어요"(21). cap "실제 오류: null value in column … violates not-null constraint(PostgreSQL 예)" | NULL, Data Integrity |
| model | Default Value | 기본값 · 안 적으면 들어가는 값 | `qrun` from orders(id, item, status): 1 책 완료. SQL `INSERT INTO orders`(18) / `(id, item)`(10) / `VALUES (2, '펜')`(16). after (id, item, status): 1 책 완료; 2 펜 대기, hl `{row:1}`(새 줄의 `펜`·`대기`는 실행 전 표에 없어 줄 전체를 강조해야 after 값 점검을 지난다). cap "status 기본값을 '대기'로 정해 둔 표(예시)" | INSERT |
| model | Auto Increment | 자동 번호 · id를 저절로 매김 | `qrun` from users(id PK, name): 1 민수; 2 지영. SQL `INSERT INTO users (name)`(24) / `VALUES ('준호')`(15). after (id, name): 1 민수; 2 지영; 3 준호, hl `{row:2}`(`준호`가 실행 전 표에 없음). cap "id를 적지 않아도 DB가 다음 번호를 넣어요" | Primary Key, Surrogate Key |
| model | Composite Key | 복합 키 · 열 둘을 합친 키 | `qrun` from enrollments(student_id PK, course_id PK): 1 10; 1 11; 2 10. SQL `INSERT INTO enrollments`(23) / `VALUES (1, 10)`(14). err "같은 짝이 이미 있어요"(21). cap "한 열씩은 겹쳐도 되지만 짝은 하나만" | Primary Key, Junction Table |
| model | Surrogate Key | 대리 키 · 뜻 없는 번호 키 | `bkStack`: `dbtab` users(tag "이메일이 키", email PK, name): m@a.com 민수; j@a.com 지영 + `whelp('이메일을 바꾸면 이어진 표도 다 고쳐야 해요')` / `dbtab` users(tag "id가 키", id PK, email, name): 1 m@a.com 민수; 2 j@a.com 지영 | Primary Key, UUID |
| model | Check Constraint | 체크 제약 · 값 범위 규칙 | `qrun` from products(id, name, price): 1 책 12000. SQL `INSERT INTO products`(20) / `VALUES (2, '펜', -500)`(22, 빼기는 ASCII `-`). err "price는 0 이상이어야 해요"(25). cap "규칙: CHECK (price >= 0)" | Data Integrity, Validation |
| model | One-to-Many | 일대다 · 하나에 여럿 | `bkStack`: `erd` users(id PK, name)·orders(id PK, user_id FK, item) 1:N fk user_id, hl `['orders']` / `dbtab` orders(id, user_id, item): 1 1 책; 2 1 펜; 3 2 컵, hl `[{row:0},{row:1}]`. cap "민수(1번)의 주문이 두 줄이에요" | Relation, Foreign Key |
| model | Many-to-Many | 다대다 · 여럿에 여럿 | `erd` students(id PK, name)·courses(id PK, title) N:M. cap "학생은 강의를 여럿 듣고, 강의엔 학생이 여럿" | Relation, Junction Table |
| model | Junction Table | 연결 테이블 · 다대다를 잇는 표 | `erd` students(id PK, name)·enrollments(student_id FK, course_id FK)·courses(id PK, title), links `{a:0,b:1,kind:'1:N',fk:'student_id'}`·`{a:1,b:2,kind:'N:1',fk:'course_id'}`, hl `['enrollments']` | Many-to-Many, Foreign Key |
| model | Cascade Delete | 연쇄 삭제 · 지우면 이어진 줄도 지움 | `bkStack`: `fcss('orders 정의', 'user_id INT REFERENCES users', '  ON DELETE CASCADE')` / `qrun` from users(id, name): 1 민수; 2 지영 / orders(id, user_id, item): 1 1 책; 2 2 펜; 3 1 컵. SQL `DELETE FROM users`(17) / `WHERE id = 1`(12). after users(id, name): 2 지영 / orders(id, user_id, item): 2 2 펜 | Foreign Key, Hard Delete |
| model | Denormalization | 비정규화 · 일부러 복사해 두기 | `bkStack`: `dbtab` orders(tag "복사해 둠", id, user_name, item): 1 민수 책; 2 민수 펜; 3 지영 컵, hl `{col:1}` + `whelp('읽기는 빨라지고, 이름을 고칠 곳이 늘어나요')` | Normalization, Join |

- `whelp`는 이미 있는 흐린 설명 줄 도우미다([index.html](../../../index.html)에서 `const whelp`로 찾는다). 없거나 꼴이 다르면 `mk-dg` 문단으로 쓰고 원장에 적는다.
- qrun·`bkStack`+qrun 카드는 `m:1`, erd·dbtab·`bkStack`(dbtab·erd만) 카드는 `m`이 없다.
- 결과 대조(공통 절차 3): Aggregate Function은 12000+1000+5000 = 18000, COUNT는 phone이 NULL 아닌 줄 3개, HAVING은 서울 2·부산 1에서 서울만, Subquery는 orders.user_id {1, 3}, LEFT JOIN은 펜(2번)에 후기가 없음을 원장에 적는다.

x 짝(스펙 5장, 이 Task 카드):
- Join vs INNER JOIN vs LEFT JOIN(그냥 `JOIN`은 INNER JOIN이에요), Join vs Subquery
- WHERE vs HAVING, GROUP BY vs DISTINCT, COUNT vs Aggregate Function, `COUNT(*)` vs `COUNT(열)`
- IS NULL vs `= NULL`, NOT NULL vs Default Value, LIKE vs `=`, IN vs BETWEEN
- Primary Key vs Composite Key vs Surrogate Key, Surrogate Key vs UUID(back)
- Relation vs One-to-Many vs Many-to-Many vs Junction Table
- Normalization vs Denormalization, Foreign Key vs Cascade Delete(x에 "기본값(NO ACTION)이면 이 DELETE는 막혀요")
- Auto Increment는 "DB마다 이름이 달라요(SERIAL·IDENTITY·AUTO_INCREMENT)"

뜻이 다른 짝(`dbwrong`): Column Alias의 x는 terminal Alias(명령 별명)와, Cascade Delete의 x는 front Cascade(CSS 규칙 우선순위)와, Check Constraint의 x는 ai Constraint(AI에게 주는 제약)와 다르다고 쓰고 r에 넣지 않는다.

출처(공통 절차 3에서 열어 확인): PostgreSQL 문서 SELECT(JOIN·DISTINCT·HAVING·별칭 `AS`), Aggregate Functions(`count(*)`·`count(expr)`), Pattern Matching(`LIKE`·`%`), Comparison Functions(`BETWEEN` 양 끝 포함·`IS NULL`), Subquery Expressions(`IN`), Constraints(NOT NULL·CHECK·UNIQUE·PRIMARY KEY·FOREIGN KEY `ON DELETE CASCADE`·NO ACTION 기본), Default Values, Identity Columns·`SERIAL`.

뒤이어 **디렉터 검토 묶음 B**

---

### Task 4: 기존 basic·core·motion 24장 다시 그리기

**Files:**
- Modify: `index.html`
  - 카드 24장의 v를 `'u-db-<slug>'`로 바꾸고, 그림이 움직이면 `m:1`을 단다.
  - 그림은 `/* db: 다시 그리기 basic·core·motion … */` 묶음으로 둔다. 상태 함수는 그 `Object.assign` 바로 앞 `const`로 둔다.
- Modify: `tests/check.mjs`: `DB_TODO`에서 24장을 빼고, `LATER`에서 `redrawn:db/basic·core·motion`을 빼고, `dbstill`을 더한다.

**Interfaces:**
- Consumes: `dbtab`·`qrun`·`erd`(Task 1), `seq`, `track`·`doc`·`term`·`vs`·`fcss`, `bkStack`·`bkRows`·`bkPills`
- Produces(계획서 ②가 버튼을 붙일 상태 함수, 값은 예시):
  - `DIX = ['a@a.com', 'j@a.com', 'm@a.com', 'h@a.com', 's@a.com']`(찾는 값 `m@a.com`은 3번째)
  - `dindex(has: boolean, ran: boolean) → string`: 위 `<p class="mk-dgp">`에 `인덱스 있음 · email = m@a.com 찾기`(없음이면 `인덱스 없음`), 아래 `dbtab` users(id, email) 5줄(id는 `'1'`~`'5'`, email은 `DIX` 순서). `ran`이면 `mark`: 없음은 5줄 모두 `읽음`, 있음은 3번째만 `읽음`(나머지 `''`). `ran`이 거짓이면 `mark` 없음.
  - `dindexSay(has, ran) → string`: 안 했으면 `'찾기를 눌러 보세요'`, 없음 `'5줄을 다 읽었어요'`, 있음 `'색인으로 1줄만 읽었어요'`
  - `DTX = {from: '민수', to: '지영', amt: 10000, start: [50000, 10000]}`
  - `dtx(fail: boolean, ran: boolean) → string`: `ran`이면 `<ol class="mk-dgs">` 단계 `<li>` 네 줄 `BEGIN` · `민수 잔액 1만 원 빼기` · (`fail`이면 `지영에게 더하기` + `<b class="mk-dbk">실패</b>`, 아니면 `지영 잔액 1만 원 더하기`) · (`ROLLBACK: 둘 다 처음 값` 또는 `COMMIT: 둘 다 반영`). 아래 `dbtab` accounts(name, balance): 성공이면 40000·20000(balance 열 강조), 그 밖은 50000·10000. 안 했으면 단계 없이 표만.
  - `dtxSay(fail, ran) → string`: 안 했으면 `'실행을 눌러 보세요'`, 성공 `'COMMIT: 둘 다 반영됐어요'`, 실패 `'ROLLBACK: 둘 다 처음 값으로 돌아갔어요'`
  - `djoin(kind: 'INNER' | 'LEFT') → string`: `qrun({still:true})` from users(id, name): 1 민수; 2 지영; 3 준호 / orders(id, user_id, item): 1 1 책; 2 2 펜. SQL `SELECT name, item`(17) / `FROM users u`(12) / `${kind} JOIN orders o`(INNER 19·LEFT 18) / `ON u.id = o.user_id`(19). after (name, item): INNER 민수 책; 지영 펜 / LEFT 민수 책; 지영 펜; 준호 NULL(hl `{cell:[2,1]}`).
  - `djoinSay(kind) → string`: INNER `'주문이 없는 준호가 빠졌어요'`, LEFT `'준호도 나와요, 주문은 NULL이에요'`
  - 상태 함수 그림의 단계는 `<li>`이고, dbtab은 `<li>`를 쓰지 않는다(`dbstill`이 단계 수를 `<li`로 센다).
  - 잘못된 값(boolean 아닌 has·fail·ran, 없는 kind)은 `'dindex: '`·`'dtx: '`·`'djoin: '` 오류를 던진다.

- [ ] **Step 1: 점검**
  - `DB_TODO`에서 basic·core·motion 24장(`"Table"`~`"Sync"`)을 뺀다.
  - `LATER`에서 `redrawn:db/basic`·`redrawn:db/core`·`redrawn:db/motion`을 뺀다.
  - 멈춘 직접 조작 그림과 상태 함수를 보는 점검을 `dbhelp` 뒤에 더한다.

```js
check('dbstill', () => vm.runInContext(`(() => { const bad = [], n = (h, re) => (h.match(re) || []).length;
  if (n(dindex(false, true), />읽음</g) !== 5 || n(dindex(true, true), />읽음</g) !== 1 || dindex(true, false).includes('읽음') || !dindex(false, false).includes('인덱스 없음')) bad.push('dindex');
  if (dindexSay(false, true) !== '5줄을 다 읽었어요' || dindexSay(true, true) !== '색인으로 1줄만 읽었어요' || !dindexSay(true, false).includes('찾기')) bad.push('dindexSay');
  const ok = dtx(false, true), ng = dtx(true, true);
  if (n(ok, /<li/g) !== 4 || !ok.includes('40000') || !ok.includes('COMMIT') || ok.includes('실패') || !ng.includes('50000') || ng.includes('40000') || !ng.includes('ROLLBACK') || !ng.includes('>실패<') || n(dtx(false, false), /<li/g) !== 0) bad.push('dtx');
  if (!dtxSay(false, true).startsWith('COMMIT') || !dtxSay(true, true).startsWith('ROLLBACK') || !dtxSay(true, false).includes('실행')) bad.push('dtxSay');
  const i = djoin('INNER'), l = djoin('LEFT');
  if (!i.includes('결과 2줄') || i.includes('준호 NULL') || !l.includes('결과 3줄: 민수 책, 지영 펜, 준호 NULL') || /class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(i + l)) bad.push('djoin');
  if (!djoinSay('INNER').includes('빠졌어요') || !djoinSay('LEFT').includes('NULL')) bad.push('djoinSay');
  [() => dindex('y', true), () => dtx(1, true), () => djoin('RIGHT'), () => dindexSay(true, 'n'), () => dtxSay('x', true), () => djoinSay('FULL')].forEach((f, k) => { try { f(); bad.push('안 막음 ' + k); } catch (e) { if (!/^(dindex|dtx|djoin): /.test(e.message)) bad.push('메시지 ' + k); } });
  return bad.join(', '); })()`, ctx));
```

- [ ] **Step 2: 실패 확인**
  - `FAIL dbukey: +Table, +Row, …`(24장), `FAIL dbobj`(그중 객체 v 카드)
  - `FAIL redrawn:db/basic`·`core`·`motion`(flow·stack·big 그림 카드들)
  - `FAIL dbstill: dindex is not defined`
- [ ] **Step 3: 그림**: 스펙 3.4 표의 basic·core·motion 24장대로 그린다. 그림(v)과 `m`만 바꾸고 d·p·r은 그대로 둔다. 정해 둔 것:
  - Table: `dbtab` users(id PK, name, email): 1 민수 m@a.com; 2 지영 j@a.com; 3 준호 h@a.com, cap "가로 한 줄은 행, 세로 한 칸은 열이에요"
  - Row: 같은 표, hl `{row:1}`, cap "강조한 가로 한 줄이 회원 한 명이에요"
  - Column: 같은 표, hl `{col:2}`, cap "email 열에는 모든 회원의 이메일이 들어가요"
  - Primary Key: users(id PK, name, email): 1 민수 m@a.com; 2 민수 k@a.com; 3 지영 j@a.com, hl `{col:0}`, cap "이름이 같아도 id로 구분해요"
  - Foreign Key: `erd` users(id PK, name)·orders(id PK, user_id FK, item) 1:N fk user_id, hl `['orders.user_id']`
  - Data Type: `doc` 표 `[['열','타입','예시 값'],['price','정수','12000'],['name','글자','민수'],['created_at','날짜','10-01'],['is_paid','참·거짓','true']]`, cap "타입이 다른 값은 DB가 받지 않아요"
  - Query: `qrun` from posts(id, title, likes): 1 공지 3; 2 후기 25; 3 질문 12. SQL `SELECT title FROM posts`(23) / `WHERE likes > 10`(16) + `pick`(likes > 10) + `show:['title']`
  - Schema: `erd` users(id PK 정수, email 글자, created_at 날짜)·posts(id PK 정수, user_id FK 정수, title 글자) 1:N fk user_id, cap "표를 만들기 전 설계도예요"
  - SQL: `doc` 표 `[['명령','하는 일','예'],['SELECT','가져오기','SELECT * FROM users'],['INSERT','넣기','INSERT INTO users …'],['UPDATE','고치기','UPDATE users SET …'],['DELETE','지우기','DELETE FROM users …']]`
  - RDBMS: `doc` 표 `[['약속','뜻'],['표로 저장','행과 열'],['키로 이음','PK와 FK'],['SQL로 물음','SELECT …']]` + 문단 "예: MySQL·PostgreSQL"
  - NoSQL: `bkStack`: `dbtab` users(tag "표로 저장", id, name, city): 1 민수 서울 / `fcss('문서로 저장', '{ "id": 1, "name": "민수",', '  "tags": ["책", "펜"] }')`
  - Relation: `doc` 표 `[['관계','예'],['1:1','회원과 프로필'],['1:N','회원과 주문'],['N:M','학생과 강의']]`
  - Index ▶: 멈춘 그림은 `dindex(false, true)`
  - Migration: `term`: `{c:'ls migrations'}` · `{o:'001_users.sql'}` · `{o:'002_phone.sql'}` · `{o:'003_avatar.sql'}` · `{c:'npm run migrate'}` · `{o:'003_avatar.sql 적용함(예시)'}`, cap "001·002는 이미 적용됐고 003이 새로 적용돼요"(ls는 적용 상태를 출력하지 않으므로 스펙의 "(적용됨)·(대기)"를 cap으로 옮김)
  - Transaction ▶: 멈춘 그림은 `dtx(true, true)`
  - Backup: `track`: `{t:'DB', s:'done', w:'shop'}` · `{t:'매일 밤 복사', s:'done', w:'03:00(예시)'}` · `{t:'백업 파일 보관', s:'done', w:'다른 곳에 둠'}`
  - Data Flow: `seq(['브라우저','서버','DB'], [{0→1 '저장 요청'}, {1→2 'INSERT …'}, {2→1 '저장됨'}, {1→2 '목록 조회'}, {2→1 '목록'}, {1→0 '새 목록'}, {0→0 '화면 표시'}])`
  - Join ▶: 멈춘 그림은 `djoin('INNER')`
  - Sorting: `vs('가격순', bkRows(['펜 1000'], ['컵 5000'], ['책 12000']), '이름순', bkRows(['책 12000'], ['컵 5000'], ['펜 1000']))`, cap "같은 상품도 기준에 따라 순서가 달라요(가격 예시)"
  - Filtering: `bkStack(bkPills('필터', ['1만 원 미만'], '선택됨'), qrun(...))`. qrun from products(name, price): 책 12000; 펜 1000; 컵 5000. SQL `SELECT * FROM products` / `WHERE price < 10000`(19) + `pick`, cap "화면에서 고른 필터가 뒤에서 이런 쿼리가 돼요"
  - Seed Data: `bkStack(term([{c:'npm run seed'}, {o:'회원 3명 넣음(예시)'}], {end:false}), dbtab(...))`, dbtab users(id, name): 1 민수; 2 지영; 3 준호
  - Rollback: `seq(['앱','DB'], [{0→1 'BEGIN'}, {0→1 '출금 1만 원'}, {1→1 '오류', err:1}, {0→1 'ROLLBACK'}, {1→0 '되돌려짐'}])`
  - Replication: `seq(['서버','원본 DB','복제 DB'], [{0→1 '쓰기'}, {1→2 '복사'}, {1→1 '고장', err:1}, {2→2 '승격'}, {0→2 '쓰기·읽기'}])`, cap "복제는 평소 읽기만 받고, 원본이 고장 나면 승격해 이어받아요"(PostgreSQL Failover)
  - Sync: `seq(['휴대폰','서버'], [{0→0 '오프라인 수정'}, {0→1 '연결되면 보냄'}, {1→1 '같게 맞춤'}, {1→0 '최신 값 받음'}])`
  - 표의 `{0→1 '…'}`는 `{from:0, to:1, t:'…'}`를 줄여 쓴 것이다. seq 글은 모두 14폭 이하다(가장 긴 것 `오프라인 수정`·`연결되면 보냄` 13). 세로줄 이름 `원본 DB`·`복제 DB`는 7폭이다.
  - `m:1`: Query·Data Type·SQL·RDBMS·Relation(doc)·Migration·Backup·Data Flow·Filtering·Seed Data·Rollback·Replication·Sync. 나머지(dbtab·erd·vs·bkStack(dbtab+fcss)·멈춘 직접 조작)는 없다. 최종 판정은 `dbm`이 한다.
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER` 줄은 `redrawn:db/adv·tip` 2개다(새 글자가 서브셋에 없으면 `font`도 나온다).
- [ ] **Step 5: 브라우저 확인**: basic·core·motion
- [ ] **Step 6: 커밋**: `feat: 데이터베이스 basic·core·motion 그림 24장 다시 그리기`

---

### Task 5: 기존 adv·sql·tip 24장 다시 그리기

**Files:**
- Modify: `index.html`
  - 카드 24장의 v·`m`
  - 새 묶음 `/* db: 다시 그리기 adv·sql·tip … */`
- Modify: `tests/check.mjs`: `DB_TODO`를 비우고, `LATER`에서 `redrawn:db/adv·tip`을 빼고, `dbstill`에 두 함수를 더한다.

**Interfaces:**
- Produces(계획서 ②가 버튼을 붙일 상태 함수):
  - `DWH = [{k: "city = '서울'", f: r => r.city === '서울'}, {k: 'age > 20', f: r => r.age > 20}, {k: 'age > 30', f: r => r.age > 30}]`
  - `dwhere(i: 0 | 1 | 2) → string`: `qrun({still:true})` from users(name, city, age): 민수 서울 25; 지영 부산 31; 준호 서울 19. SQL `SELECT * FROM users` / `WHERE ${DWH[i].k}` + `pick: DWH[i].f`. 결과: 0번 민수·준호, 1번 민수·지영, 2번 지영.
  - `dwhereSay(i) → string`: `'3줄 중 ${n}줄이 조건에 맞아요'`
  - 없는 i(범위 밖·정수 아님)는 `'dwhere: '` 오류를 던진다.

- [ ] **Step 1: 점검**
  - `DB_TODO`를 `[]`로 비운다. `LATER`에서 `redrawn:db/adv`·`redrawn:db/tip`을 뺀다.
  - `dbstill`의 `return` 앞에 더한다:

```js
  if (!dwhere(0).includes('결과 2줄: 민수 서울 25, 준호 서울 19') || !dwhere(1).includes('결과 2줄: 민수 서울 25, 지영 부산 31') || !dwhere(2).includes('결과 1줄: 지영 부산 31')) bad.push('dwhere');
  if (dwhereSay(0) !== '3줄 중 2줄이 조건에 맞아요' || dwhereSay(2) !== '3줄 중 1줄이 조건에 맞아요') bad.push('dwhereSay');
  [() => dwhere(3), () => dwhere(0.5), () => dwhereSay(-1)].forEach((f, k) => { try { f(); bad.push('안 막음 w' + k); } catch (e) { if (!/^dwhere: /.test(e.message)) bad.push('메시지 w' + k); } });
```

- [ ] **Step 2: 실패 확인**
  - `FAIL dbukey: +Normalization, …`(24장)
  - `FAIL dbobj`: 남은 객체 v 카드(adv·sql·tip 중 객체 v인 카드)
  - `FAIL redrawn:db/adv`·`tip`, `FAIL dbstill: dwhere is not defined`
- [ ] **Step 3: 그림**: 스펙 3.4 표의 adv·sql·tip 24장대로 그린다. 정해 둔 것:
  - Normalization: `bkStack`: `dbtab` orders(tag "나누기 전", id, user_name, item): 1 민수 책; 2 민수 펜; 3 지영 컵, hl `{col:1}` / `erd` users(id PK, name)·orders(id PK, user_id FK, item) 1:N fk user_id, cap "회원 이름은 users에 한 번만 두고 id로 이어요"
  - N+1 Problem: `seq(['서버','DB'], [{0→1 '글 목록 조회'}, {0→1 '작성자 조회'}, {0→1 '작성자 조회'}, {0→1 '작성자 조회'}])`, cap "글 100개면 101번, JOIN이면 1번"
  - Slow Query: `term`(`title:'느린 쿼리 로그'`, `end:false`): `{o:'LOG: duration: 3200 ms'}` · `{o:'statement: SELECT * FROM orders'}`, cap "3200 ms는 예시, 기준 시간은 설정으로 정해요"(PostgreSQL `log_min_duration_statement`)
  - Redis: `seq(['서버','Redis','DB'], [{0→1 '조회'}, {1→0 '없음'}, {0→2 '조회'}, {2→0 '결과'}, {0→1 '저장'}, {0→1 '다시 조회'}, {1→0 '바로 응답'}])`
  - ERD: `erd` users(id PK, name)·posts(id PK, user_id FK, title)·comments(id PK, post_id FK, body), links 1:N fk user_id·1:N fk post_id
  - Soft Delete: `qrun` from posts(id, title, deleted_at): 1 공지 NULL; 2 후기 NULL. SQL `UPDATE posts`(12) / `SET deleted_at = '11-03'`(24) / `WHERE id = 2`(12). after (id, title, deleted_at): 1 공지 NULL; 2 후기 11-03, hl `{cell:[1,2]}`, cap "줄은 남기고 지운 날짜만 적어요(날짜 예시)"
  - Sharding: `seq(['서버','DB 1','DB 2'], [{0→1 '7번 저장'}, {0→2 '1500번 저장'}])`, cap "나누는 기준은 예시: 1000번까지 DB 1"
  - Supabase: `bkStack(bkBox('DB', 'PostgreSQL', '강조'), bkBox('로그인', '회원 가입과 로그인'), bkBox('파일 저장', '사진과 파일'))`
  - SELECT: `qrun` from users(name, email, city): 민수 m@a.com 서울; 지영 j@a.com 부산. SQL `SELECT name, email`(18) / `FROM users`. after (name, email): 민수 m@a.com; 지영 j@a.com
  - INSERT: `qrun` from users(id, name): 1 민수; 2 지영. SQL `INSERT INTO users`(17) / `VALUES (3, '준호')`(18). after: 1 민수; 2 지영; 3 준호, hl `{row:2}`
  - UPDATE: `qrun` from users(id, name, city): 1 민수 서울; 2 지영 서울. SQL `UPDATE users`(12) / `SET city = '부산'`(17) / `WHERE id = 2`. after: 1 민수 서울; 2 지영 부산, hl `{cell:[1,2]}`, cap "WHERE를 빼면 모든 줄이 바뀌어요"
  - DELETE: `qrun` from users(id, name): 1 민수; 2 지영; 3 준호. SQL `DELETE FROM users` / `WHERE id = 3` + `pick`(id 3) + `del:1`
  - WHERE ▶: 멈춘 그림은 `dwhere(0)`
  - ORDER BY: `qrun` from posts(id, title, created_at): 1 공지 10-01; 2 후기 10-03; 3 질문 10-02. SQL `SELECT title, created_at`(24) / `FROM posts`(10) / `ORDER BY created_at DESC`(24). after (title, created_at): 후기 10-03; 질문 10-02; 공지 10-01
  - GROUP BY: `qrun` from products(name, category): 펜 문구; 공책 문구; 컵 주방. SQL `SELECT category,`(16) / `COUNT(*) AS 개수`(16) / `FROM products`(13) / `GROUP BY category`(17). after (category, 개수): 문구 2; 주방 1
  - LIMIT: `qrun` from posts(id, title): 1 공지; 2 후기; 3 질문. SQL `SELECT title FROM posts`(23) / `ORDER BY id LIMIT 2`(19). after (title): 공지; 후기
  - Hard Delete: `bkStack`: `dbtab` users(tag "완전 삭제", id, name): 1 민수 / `dbtab` users(tag "소프트 삭제", id, name, deleted_at): 1 민수 NULL; 2 지영 11-03, hl `{cell:[1,2]}`, cap "완전 삭제는 줄이 없어지고, 소프트 삭제는 표시만 해요"
  - Restore: `track`: `{t:'백업 파일', s:'done', w:'어제 03:00(예시)'}` · `{t:'복원', s:'done', w:'파일을 DB에 다시 씀'}` · `{t:'그 시점의 DB', s:'done', w:'03:00 상태'}`
  - Data Integrity: `doc` 표 `[['규칙','막는 일','예'],['형식','타입이 다른 값','price에 글자'],['빈 값','꼭 있어야 할 칸','이름 없이 가입'],['연결','없는 회원의 주문','user_id 99']]`
  - Unique Constraint: `qrun` from users(id, email): 1 m@a.com. SQL `INSERT INTO users`(17) / `VALUES (2, 'm@a.com')`(21). err "이미 있는 이메일이에요"(22), cap "실제 오류: duplicate key value violates unique constraint(PostgreSQL 예)"
  - NULL: `dbtab` users(name, phone): 민수 NULL; 지영 `''`; 준호 `'0'`(문자열, dbtab은 문자열만 받음), hl `{cell:[0,1]}`, cap "NULL은 0도 빈 글자도 아니에요"
  - Timestamp: `dbtab` posts(title, created_at, updated_at): 공지 10-01 10-02; 후기 10-03 10-03, hl `[{col:1},{col:2}]`, cap "만든 날짜와 고친 날짜를 DB가 적어요(날짜 예시)"
  - Spreadsheet vs DB: `vs('엑셀', '<p class="mk-dgp">한 사람이 파일을 열어 고쳐요</p>', 'DB', '<p class="mk-dgp">앱 여러 개가 동시에 쿼리해요</p>')`
  - Personal Data: `bkStack(bkPills('저장하는 열', ['name', 'email']), bkPills('받지 않아도 되는 열', ['address', 'birth'], '안 받음'))`, 값은 적지 않음
  - `m:1`: N+1 Problem·Slow Query·Redis·Soft Delete·Sharding·SELECT·INSERT·UPDATE·DELETE·ORDER BY·GROUP BY·LIMIT·Restore·Data Integrity·Unique Constraint. 나머지는 없다(`dbm`이 판정).
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER` 줄은 `doccount`, 그리고 서브셋에 없는 새 글자가 있으면 `font`다.
- [ ] **Step 5: 브라우저 확인**: adv·sql·tip, 그리고 basic~model 전체를 한 번 더(공유 CSS 영향)
- [ ] **Step 6: 커밋**: `feat: 데이터베이스 adv·sql·tip 그림 24장 다시 그리기`

뒤이어 **디렉터 검토 묶음 C**. 반영 뒤 원장과 체크포인트 메모리를 갱신하고, 계획서 ②로 넘어간다.
