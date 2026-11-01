# 테스트 카테고리 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `버그 · 디버깅 현상` 다음에 `테스트` 카테고리를 만든다. 하위항목 6개에 카드 71개(새 68 + 옮김 3)를 넣고 증상 12개를 추가한다. 테스트가 실행되는 카드는 공용 테스트 실행 모형 `runner()`로 그린다.

**Architecture:** `index.html` 하나에서 작업한다.
- 데이터: DATA 구간에 `CAT`/`T`/`SYM`을 호출한다.
- 그림: `D`에 `Object.assign`으로 더한다.
- 테스트 실행 모형: `runner()` 문자열 함수 하나로 만든다. 위에 테스트 파일(선택), 아래에 결과 줄과 요약 줄을 둔다. 줄이 나타나는 키프레임은 터미널의 `mk-tl1~8`을 그대로 쓰고, "실행 중 → 결과" 바뀜 키프레임만 새로 만든다. 직접 조작은 `init(stage)`를 쓴다.
- 옮긴 카드: ①의 `MOVED`·`migrateIds`·옛 주소 이동이 그대로 처리한다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, fonttools(네트워크 때와 같은 `font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-01-test-category-design.md](../specs/2026-11-01-test-category-design.md)

**스펙과 다른 점(5가지):**
- **Watch Mode는 만들지 않는다**:
  - 측정: `terminal/motion`에 같은 이름 카드가 이미 있다(index.html 2033줄). 스펙 4.7 대조에서 빠졌다.
  - PLAN.md "같은 용어는 카드 하나"에 따라 Red-Green-Refactor·Vitest의 `r`에 `'Watch Mode'`를 단다.
  - 그래서 모션 9개, 전체 71개(새 68)다. 스펙 1·2·4.3장도 같이 고친다.
- **영문명 확정**:
  - `·`는 기존 형식(`vw / vh`, `Port 80 / 443`)에 맞춰 ` / `로 쓴다: `describe / it`, `beforeEach / afterEach`, `.only / .skip`, `Performance / Load Test`.
  - 괄호 풀이는 영문명에서 빼고 `ko`에 넣는다: Matcher, Test File Naming, Acceptance Test, Static Analysis, Bug First Test, Required Check, Broken Build.
  - 확정한 이름은 Task 2~7의 `EXPECT`에 있다.
- **`MOVED` 넣는 때**: 기반(Task 1)이 아니라 카드를 실제로 옮기는 Task 2·4·6에서 넣는다. `moved` 점검은 새 id가 있어야 통과하기 때문이다.
- **직접 조작 도우미**: 스펙의 `grab`·`keys` 대신 `tkeys` 버튼을 쓴다. 네 장 모두 끌기가 없고, 버튼이 키보드·터치를 이미 처리한다(네트워크와 같다).
- **결과 줄 20개 시험**: `runner()`는 6줄을 넘으면 throw한다(스펙 10장). 그래서 break-ui의 "결과 줄 20개"는 throw를 Task 1 `base` 점검으로 확인하고, 화면에서는 긴 이름 6줄로 본다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN을 쓰지 않는다.
- 색과 글꼴은 `:root` 변수를 먼저 쓴다. 테스트 모형은 도판 토큰(`--ink`·`--plate`·`--mono`·`--ok`·`--mark-text` 등)만 쓴다.
- 그림 속 글자는 최소 11px이다. 도판 틀(`.fig`)에는 그림자를 넣지 않는다. 기본 easing은 `var(--ease)`다.
- 자동 애니메이션은 클래스 `A`와 `--ps` 구조를 쓴다. 멈춘 장면은 음수 지연 `-8.8s`로 모든 결과 줄이 끝난 뒤 모습이다. 결과가 바뀌며 움직이는 그림은 `m:1`이다.
- 새 D 키는 `'u-' + slug(en)`이다.
- 새 CSS 클래스와 키프레임 이름은 `mk-ru`로 시작한다. 측정: `mk-ru` 0건. `mk-rn`은 슬라이더 `mk-rng`와 겹쳐 쓰지 않는다.
- 통과·실패는 색만으로 나누지 않는다. 기호(✓·✕·–)와 글자(통과·실패·건너뜀)를 함께 쓴다.
- 카드 문구 규칙:
  - `d`: 해요체 한 줄 / `p`: "~해줘" 지시문, 정식 용어를 넣는다 / `r`: 기존 영문명 1개 이상 / `l`: 1~3 / `ko`: `한글 · 풀이`
  - `o:1`: 공식 문서를 직접 열어 확인했을 때만 쓰고 `u`를 단다. 공식 문서는 jestjs.io, vitest.dev, playwright.dev, MDN, 각 도구 공식 문서(ESLint·TypeScript·GitHub Docs 등)다.
- 값 단정 금지:
  - 도구 기본값(타임아웃, 재시도, 파일 이름 규칙, 스냅샷 갱신 명령, 자동 대기)은 공식 문서로 확인한 것만 쓴다. 버전마다 다르면 버전을 적거나 "도구마다 달라요"로 쓴다.
  - 사람·책이 출처인 개념(Test Pyramid, TDD, BDD, Test Double, Arrange-Act-Assert 등)은 "보통", "흔히"로 쓰고 `o:0`이다.
  - Broken Build는 `jg:1, o:0`(현업 은어)이다.
  - 그림 속 ms·초·%는 예시다. 그 D 묶음 주석에 "예시"라고 적는다.
- 그림 속 코드는 가짜 이름(`add`, `price`, `cart.test.js` 등)만 쓴다. 실제 서비스 이름을 쓰지 않는다.
- 결과 줄은 그림당 6개까지다.
- 사이트 이름 같은 재사용 값은 `SITE`를 쓴다.
- 브라우저 확인은 Playwright MCP로 한다. 평소 Chrome 프로필·저장된 로그인을 쓰지 않고, `state save` 파일을 만들지 않는다.
- 작업 단위마다 커밋한다. 메시지는 한국어 `feat:`/`docs:`이고 attribution 줄을 넣지 않는다. `.impeccable/hook.cache.json`은 스테이징하지 않는다.
- 작업마다 "쓸 스킬"을 쓴다. 설치되지 않은 스킬은 건너뛴다.

## Review Focus

1. **긴 이름·긴 값 넘침**: 긴 테스트 이름이나 긴 기대값·실제값이 들어가도 320px·375px에서 페이지가 가로로 넘치면 안 된다. 그림 안에서 줄바꿈되어야 한다. → Task 2 브라우저 확인(직접 넣어 보기), Task 9 break-ui
2. **멈춘 장면이 비어 보임**: 동작 줄이기 설정이거나 화면 밖에서 멈춘 그림은 모든 줄에 결과(✓·✕)와 요약이 보이고 "실행 중"은 안 보여야 한다. → Task 1 `rframe` 점검, Task 2 브라우저 확인(reduced-motion)
3. **옛 id**:
   - 즐겨찾기에 `bug-testing`만 있거나 옛 id와 새 id가 함께 있어도 결과는 `test-testing` 하나다. `deploy-smoke-test`도 같다.
   - `#/t/bug-testing`·`#/t/deploy-smoke-test`는 새 카드로 간다.
   - → Task 2·6 브라우저 확인
4. **직접 조작을 키보드·터치로, 결과는 정해진 순서로**:
   - 4장 모두 Tab으로 버튼에 들어가 Enter·Space로 바꿀 수 있고, 375px에서 탭할 수 있으며, 결과 문장이 `aria-live`로 읽혀야 한다.
   - Mock·Flaky Test는 같은 횟수만큼 누르면 늘 같은 결과다(`Math.random` 금지).
   - → Task 2·3·4 브라우저 확인
5. **화면 낭독기가 결과를 잘못 읽음**: "실행 중" 표시는 `aria-hidden="true"`여서 읽히지 않고, 결과는 기호가 아니라 글자(통과·실패)로 읽혀야 한다. → Task 1 `base` 점검

---

## 공통 절차 (Task 2~7에 적용)

1. **실패하는 점검 추가**: `tests/check.mjs`에 아래를 넣는다.
   - `EXPECT['test/<sec>']`: 그 Task 표의 영문명
   - `COUNT['test/<sec>']`
   - `total` 기대값: 표의 누계
2. **실패 확인**: `node tests/check.mjs` → `FAIL expect:test/<sec>`
3. **데이터**:
   - `/* ===== 12 테스트 ===== */` 스크립트 블록의 `T('test','<sec>',[...])`에 스펙 순서대로 넣는다.
   - 이 블록은 Task 2에서 `/* ===== 12 버그 · 디버깅 현상 ===== */` 블록 뒤, `/* ===== 13 AI · Claude와 일하기 ===== */` 앞(2833줄)에 새로 만든다.
4. **그림**:
   - `const visual` 바로 앞, `/* net: tip … */` 묶음 뒤에 `/* test: <sec> — … */` 주석과 `Object.assign(D, {...})`를 둔다.
   - 주석에는 공식 문서로 확인한 값과 예시 값을 나눠 적는다.
   - 무엇으로 그릴지:
     - 테스트 실행 결과: `runner()`
     - 명령 실행: `term()` (예: `npx vitest`)
     - 화면을 보는 테스트(E2E·화면 비교): `browser()`와 `runner()`를 세로로 함께 둔다
     - 비유: `pair(art, runner(...))`
     - 나쁜 예·좋은 예: `<div class="cmp"><div class="bad" data-l="…">…</div><div class="good" data-l="…">…</div></div>`
     - 흐름이 없는 카드(층·막대): 새 `mk-ru…` 부품. 부품 루트 클래스(`mk-rubar`·`mk-rupy` 등)는 `.fig:has(…)` 두 목록에도 더한다.
5. **직접 조작**(표에 있는 카드만):
   - stage는 `<div class="mk-rubox">${runner(…, {still:true, label})}</div>${tkeys([...])}<span class="mk-hint" aria-live="polite">…</span>`이다.
   - `init`은 `.mk-rubox`의 innerHTML과 `.mk-hint` 글자만 바꾼다. 라이브 영역을 다시 만들지 않아야 읽힌다.
   - 고른 버튼에는 `aria-pressed="true"`를 단다. 켜고 끄는 버튼은 `aria-pressed`를 번갈아 바꾼다.
   - 리스너는 stage 안 요소에만 단다. 모양은 `u-port`(index.html 4806줄)를 따른다.
6. **점검 통과**: `node tests/check.mjs` → `OK <수>`. `LATER font` 줄은 Task 9 전까지 정상이다.
7. **브라우저 확인**(아래 절차):
   - 1280px·375px 스크린샷, 넘침 없음, 11px 미만 0, 콘솔 오류 0
   - 직접 조작 카드는 마우스 클릭, 375px에서 화면 버튼 클릭, 키보드로 조작해 본다.
8. **커밋**: `git add index.html tests/check.mjs && git commit -m "feat: 테스트 <하위항목 이름> 하위항목 추가"`

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/test/<sec>`. 캐시 때문에 `?r=`가 필요하다.
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**: `document.documentElement.scrollWidth <= innerWidth` → `true`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900과 375×812에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)

---

### Task 1: 기반 (카테고리, 테스트 실행 모형, 점검 확장)

**쓸 스킬:** frontend-design, impeccable(shape), animate, interfaces:better-accessibility, interfaces:better-colors

**Files:**
- Modify `index.html`:
  - 카테고리 목록: 1545줄 `CAT('bug', …)` 다음 줄
  - `.fig:has(…)` 목록 두 곳(380줄)과 `.cmp>div:has(…)`(306줄)
  - CSS: `.mk-nwa` 규칙(371줄) 뒤, `.mk-btn`(372줄) 앞
  - 모형 도우미: `addr`(3157줄 근처) 뒤, `/* 직접 조작 도우미 … */` 주석 앞
- Modify `tests/check.mjs`

**Interfaces:**
- Consumes: `esc`, `pair`, `term`, `browser`, `tkeys`, 키프레임 `mk-tl1~8`과 클래스 `.mk-tl1~8`(index.html 309~318줄)
- Produces:
  - **카테고리**:
    - `CAT('test','테스트','코드와 화면이 의도대로 동작하는지 확인하는 방법의 말', [['kind','테스트 종류','무엇을 어디까지 확인하느냐에 따른 테스트 이름']])`을 `bug` 바로 뒤에 둔다.
    - secs id는 `basic, core, motion, adv, kind, tip` 순서다.
  - **`runner(tests = [], opt = {}) -> string`**: 루트는 `<div class="mk-ru">`(`container-type:inline-size`)이다.
    - `tests[i]`: `{n, s, e?, a?, ms?}`
      - `n` 이름, `s`는 `'pass'|'fail'|'skip'`. 다른 값이면 `throw new Error('runner: 상태 ' + s)`.
      - 0~6개다. 7개 이상이면 `throw new Error('runner: 결과 줄은 6개까지')`.
      - `e`·`a`: 실패 줄 밑에 `기대 {e} · 실제 {a}`로 보인다(둘 다 `var(--mono)`).
      - `ms`: 있으면 줄 오른쪽에 `{ms}ms`.
    - `opt`: `{file, code = [], still = false, label}`
      - `file`이 있으면 위에 파일 이름 띠와 코드(`code` 줄 배열, `var(--mono)` 11.5px, `white-space:pre-wrap; overflow-wrap:anywhere`)를 둔다.
      - `still`: true면 `A`·`mk-tl`·`mk-rux`·`mk-ruy` 클래스를 붙이지 않고 "실행 중" 요소도 만들지 않는다(직접 조작용).
      - `label`: 있으면 루트에 `role="group"`과 `aria-label`.
    - 결과 줄 k(1부터) 구조: `<li class="mk-rur {s} mk-tl{k} A">`
      - `<span class="mk-ruw mk-ruy{k} A" aria-hidden="true">실행 중</span>`
      - `<span class="mk-rus mk-rux{k} A"><b aria-hidden="true">{✓|✕|–}</b>{통과|실패|건너뜀}</span>`
      - `<span class="mk-run">{n}</span>`, ms
      - 실패면 `<div class="mk-rue mk-rux{k} A">…</div>`
      - 줄 칸은 `grid-template-columns:auto minmax(0,1fr) auto`이고 이름은 `overflow-wrap:anywhere`다(Review Focus 1).
    - 요약 줄: `<div class="mk-rusum mk-tl{줄 수 + 1} A">통과 {p} · 실패 {f}</div>`. 건너뜀이 1개 이상이면 ` · 건너뜀 {k}`를 붙인다. 0줄이면 `통과 0 · 실패 0`.
    - 색: 통과 `--ok`, 실패 `--mark-text`. 둘 다 `--plate` 배경에서 4.5:1 이상인지 better-colors로 재고, 못 미치면 새 토큰을 만든다.
    - 자동 재생:
      - `.mk-rur.A,.mk-rusum.A,.mk-ruw.A,.mk-rus.A,.mk-rue.A{animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}`
      - `@keyframes mk-rux{k}{0%,{10k+4}%{opacity:0}{10k+5}%,100%{opacity:1}}`, `mk-ruy{k}`는 반대(1 → 0), k = 1~6
      - 그래서 88% 지점에서 모든 줄에 결과가 있고 "실행 중"은 사라져 있다(Review Focus 2).
    - 모든 글자는 `esc()`로 처리한다.
  - **`.mk-rubox{width:100%}`**, `.stage:has(>.mk-rubox){padding-top:50px}`: 직접 조작 결과 문장 자리(`.mk-nwbox`와 같다)
  - **`.fig:has(…)`**: 두 목록에 `.mk-ru`를 더한다. `.cmp>div:has(>.mk-ru)`도 `.mk-term`과 같은 규칙을 준다.
  - **`LATER`**: `['font']`. Task 9에서 비운다.

- [ ] **Step 1: 실패하는 점검 추가**(check.mjs)
  - `cat`에 더한다: `test` 카테고리가 `bug` 바로 다음이고, secs id가 `['basic','core','motion','adv','kind','tip']`다.
  - `tv`: `t.c === 'test'`인 카드는 모두 `v`가 `'u-'`로 시작하는 문자열이다. 카드가 0장이면 그대로 통과한다.
  - `base`에 다음을 더한다.
    - `const ru = runner([{n:'더하기', s:'pass'}, {n:'빼기', s:'fail', e:'1', a:'2'}])`
      - `mk-ru`가 있고 `class="mk-rur `가 2번 나온다.
      - `✓`·`통과`·`✕`·`실패`·`기대`·`실제`·`통과 1 · 실패 1`이 있다.
      - `/<span class="mk-ruw[^"]*" aria-hidden="true">실행 중/`에 맞는다(Review Focus 5).
    - `runner([{n:'<b>&', s:'pass'}], {file:'<i>', code:['a<b']})`에 `<b>`·`<i>`가 없고 `&lt;b&gt;&amp;`가 있다.
    - 줄 7개와 `{n:'a', s:'ok'}`는 각각 throw한다.
    - `runner([{n:'a', s:'pass'}], {still:true})`에 ` A"`·`mk-tl`·`mk-rux`·`mk-ruy`·`실행 중`이 없다.
    - `runner([], {label:'x'})`에 `role="group"`·`aria-label="x"`·`통과 0 · 실패 0`이 있다.
    - `runner([{n:'a', s:'skip'}])`에 `건너뜀 1`이 있고, `runner([{n:'a', s:'pass'}])`에는 `건너뜀`이 없다.
  - `rframe`: `nframe`과 같은 방식이다.
    - `/\.mk-rur\.A,[^{]*\{animation-duration:10s;animation-delay:-([\d.]+)s/`에서 멈춘 지점 P(%)를 읽는다.
    - k = 1~6마다 `mk-rux{k}`·`mk-ruy{k}`의 바뀜 %가 P 이하인지 본다.
  - `LATER = ['font']`
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL cat`, `FAIL base: … runner is not defined`, `FAIL rframe`. 다른 점검은 그대로 통과해야 한다.
- [ ] **Step 3: 구현**: Interfaces대로 `CAT`, `runner`, CSS, 키프레임을 만든다. 통과·실패 색 대비를 재서 커밋 본문에 적는다.
- [ ] **Step 4: 점검 통과**: `node tests/check.mjs` → `OK <수>`
- [ ] **Step 5: 브라우저 확인**
  - `#/c/test/basic`이 "아직 용어가 없어요"로 뜬다.
  - 홈·사이드 목록에서 `bug` 뒤 AI 카테고리 번호가 하나 밀린다.
  - 콘솔 오류 0
- [ ] **Step 6: 커밋**: `feat: 테스트 카테고리와 테스트 실행 모형 기반`

### Task 2~7: 하위항목 6개

| Task | sec | EXPECT (스펙 순서) | 직접 조작 | 비유 | COUNT | total | 쓸 스킬 |
|---|---|---|---|---|---|---|---|
| 2 | basic | Testing, Test Case, Test Suite, Test Code, Test Runner, Assertion, Pass / Fail, Automated Test, Manual Testing, QA, Test Coverage | Assertion, Test Coverage | — | 11 | 1128 | frontend-design, interfaces:better-writing |
| 3 | core | describe / it, expect, Matcher, Mock, Stub, Spy, Test Double, Fixture, beforeEach / afterEach, Arrange-Act-Assert, Snapshot Test, Test File Naming, Jest, Vitest, Playwright | Mock | Test Double | 15 | 1143 | source-driven-development, interfaces:better-layout |
| 4 | motion | Red-Green-Refactor, Auto-waiting, Test Timeout, Test Retry, Parallel Test, Headless vs Headed, Trace Viewer, Snapshot Update, Flaky Test | Flaky Test | — | 9 | 1151 | animate, interfaces:better-accessibility, source-driven-development |
| 5 | adv | TDD, BDD, Test Pyramid, Test Isolation, Deterministic Test, Dependency Injection, Locator, Page Object Model, Coverage Threshold, Mutation Testing, Property-based Testing, Contract Testing | — | Mutation Testing | 12 | 1163 | source-driven-development, design-skills:interaction-design |
| 6 | kind | Unit Test, Integration Test, E2E Test, Component Test, API Test, Smoke Test, Regression Test, Visual Regression Test, Acceptance Test, Exploratory Testing, Sanity Test, Performance / Load Test, Accessibility Test, Static Analysis | — | Smoke Test | 14 | 1176 | source-driven-development, interfaces:better-layout |
| 7 | tip | Happy Path vs Unhappy Path, Given-When-Then, Bug First Test, Test Behavior Not Implementation, .only / .skip, Required Check, Broken Build, Test Account, QA Sign-off, Test Report | — | — | 10 | 1186 | design-skills:ux-writing, interfaces:better-writing |

측정: 새 영문명 68개는 기존 카드와 이름·slug가 겹치지 않는다(Watch Mode 제외 후). `.only / .skip`의 id는 `test-only-skip`, `Pass / Fail`은 `test-pass-fail`이다.

**도구 값 확인 표**(Task 3·4·5·6·7 공통): 그림·문구에 넣는 값마다 출처를 열어 확인하고, 확인한 줄을 그 Task 커밋 본문에 적는다(검색 확인). 확인하지 못한 값은 빼거나 "보통"으로 쓴다.

| 카드 | 확인할 값 | 출처 |
|---|---|---|
| Matcher | `toBe`(같은 값인지, `Object.is`)와 `toEqual`(내용 비교) 차이 | jestjs.io Expect, vitest.dev expect |
| Mock·Stub·Spy | `jest.fn`·`jest.spyOn`·`jest.mock`, `vi.fn`·`vi.spyOn`·`vi.mock` | jestjs.io Jest Object, vitest.dev Vi |
| beforeEach / afterEach | 테스트마다 앞·뒤에 실행 | jestjs.io Globals, vitest.dev API |
| Snapshot Test·Snapshot Update | `toMatchSnapshot`, 스냅샷 파일 위치, 갱신 명령(`-u` 등) | jestjs.io Snapshot Testing, vitest.dev Snapshot, playwright.dev Visual comparisons |
| Test File Naming | Jest `testMatch`, Vitest `include`, Playwright `testMatch` 기본값 | 각 도구 설정 문서 |
| Jest·Vitest·Playwright | 실행 명령(`npx jest`, `npx vitest`, `npx playwright test`) | 각 도구 Getting Started |
| Fixture | Playwright의 fixture(테스트에 넘기는 `page` 등) 뜻 | playwright.dev Fixtures |
| Auto-waiting | 동작 전에 하는 확인(보임·움직임 멈춤·활성 등) | playwright.dev Auto-waiting(Actionability) |
| Test Timeout | Jest·Vitest 기본 테스트 타임아웃, Playwright 테스트·expect 타임아웃 | jestjs.io `testTimeout`, vitest.dev `testTimeout`, playwright.dev Timeouts |
| Test Retry | Playwright `retries` 기본값, Jest `jest.retryTimes`, Vitest `retry` | 각 도구 문서 |
| Parallel Test | Playwright `workers`·`fullyParallel`, Vitest 파일 병렬 기본 동작 | playwright.dev Parallelism, vitest.dev Parallelism |
| Headless vs Headed | Playwright 기본 headless, `--headed` | playwright.dev Running tests |
| Trace Viewer | `--trace on`, `npx playwright show-trace` | playwright.dev Trace viewer |
| Locator·Page Object Model | `getByRole` 등, POM 예 | playwright.dev Locators, Page object models |
| Coverage Threshold | Jest `coverageThreshold`, Vitest `coverage.thresholds` | 각 도구 설정 문서 |
| Visual Regression Test | `toHaveScreenshot` | playwright.dev Visual comparisons |
| Accessibility Test | Playwright 접근성 테스트 방법 | playwright.dev Accessibility testing |
| Static Analysis | `npx eslint .`, `npx tsc --noEmit` | eslint.org, typescriptlang.org |
| .only / .skip | `test.only`·`test.skip`(Jest·Vitest·Playwright) | 각 도구 API 문서 |
| Required Check | 필수 상태 검사를 통과해야 병합됨 | docs.github.com Protected branches |
| Given-When-Then | Gherkin `Given`·`When`·`Then` | cucumber.io Gherkin reference |

**Task 2 추가:**
- **옮기기**:
  - `T('bug','core')`의 Testing 객체(2785줄)를 잘라 `test/basic` 맨 앞에 둔다.
  - `MOVED`에 `'bug-testing':'test-testing'`을 넣는다.
  - `d`·`p`·`r`·`u`는 그대로 두고 `v`만 새 `u-` 그림으로 바꾼다.
  - check.mjs에 `COUNT['bug/core'] = 8`(9 − 1)을 더한다.
- **Assertion 직접 조작**(`m:0`):
  - 그림: `runner([{n:'add(2, 3)은 5', …}], {file:'math.test.js', code:['expect(add(2, 3)).toBe(' + 기대값 + ')'], still:true, label})`
  - 버튼은 `tkeys(['5','6'])`이다. 처음은 5다.
    - 5: 통과, 결과 문장 "기대값 5와 실제값 5가 같아 통과해요"
    - 6: 실패(`e:'6', a:'5'`), 결과 문장 "기대값 6과 실제값 5가 달라 실패해요"
  - `r:['Expected vs Actual','expect']`
- **Test Coverage 직접 조작**(`m:0`):
  - 그림 상수 `TCOV(on)`을 D 묶음 앞에 둔다(네트워크 `NPORT`처럼). `on`은 `{normal, vip}` 불리언이다.
  - 코드는 `function price(n, vip) {` / `if (vip) {` / `return n * 0.9;` / `}` / `return n;` / `}`이다. 세는 줄은 `if (vip) {`·`return n * 0.9;`·`return n;` 3줄이다.
    - 일반 손님 테스트는 `if`와 `return n;`, VIP 테스트는 `if`와 `return n * 0.9;`를 실행한다.
    - 실행한 줄은 배경색과 함께 앞에 `✓`, 실행 안 한 줄은 `·`를 붙인다(색만으로 나누지 않음).
    - 비율은 `Math.round(100 × 실행 줄 / 3)`이다.
  - 아래 `runner`에는 켜진 테스트만 통과 줄로 보인다.
  - 버튼은 `tkeys(['일반 손님 테스트','VIP 테스트'])`이고 각각 `aria-pressed`로 켜고 끈다. 처음은 일반 손님만 켜져 있다(67%).
  - 결과 문장: "3줄 중 2줄 실행 · 67%"
- **Pass / Fail**: 통과 2줄·실패 1줄 `runner`.
- **Manual Testing**: `browser()` 안에 사람이 눌러 보는 점검 목록. Automated Test는 `term()` + `runner()`.
- **QA**: `r:['Design QA','Penetration Test']`(스펙 4.7)
- **브라우저 추가 확인**:
  - localStorage `devdict.pins`를 `["bug-testing"]`으로 두고 새로고침하면 `["test-testing"]`이 된다. `["bug-testing","test-testing"]`도 하나로 줄어든다(Review Focus 3).
  - `#/t/bug-testing` → `#/t/test-testing`, 검색에 `Testing`을 넣으면 새 카드로 간다.
  - `browser_emulate_media` reduced-motion에서 `.mk-rus`가 모두 opacity 1, `.mk-ruw`가 opacity 0, `.mk-rusum`이 보인다. 재생 버튼을 누르면 움직인다(Review Focus 2).
  - Assertion·Test Coverage를 Tab으로 버튼까지 가서 Enter·Space로 바꾸고, 375px에서 탭한다(Review Focus 4).
  - 320px에서 한 그림의 stage 끝에 `runner([{n:'아주 긴 테스트 이름…(80자)', s:'fail', e:'긴 기대값(60자, 공백 없음)', a:'긴 실제값(60자)'}])`를 `insertAdjacentHTML`로 넣고 넘침을 잰 뒤 새로고침한다(Review Focus 1).

**Task 3 추가:**
- **Mock 직접 조작**(`m:0`):
  - 버튼은 `tkeys(['진짜 API','mock'])`이다.
  - 진짜 API는 정해진 순서 `TMOCK_REAL = [{s:'pass', ms:1840}, {s:'fail', ms:5000, e:'맑음 21°', a:'시간 초과'}, {s:'pass', ms:2310}]`를 쓴다. ms는 예시다.
    - 처음 화면은 `TMOCK_REAL[0]`이다. 진짜 API를 누를 때마다 다음 것(`[1]`, `[2]`, `[0]`, …)을 보인다.
  - mock은 늘 `{s:'pass', ms:12}`이고, 코드에 `vi.mock('./weatherApi')` 줄이 붙는다(`vi.mock`은 vitest.dev로 확인).
  - 결과 문장 예: "진짜 API를 불러 1840ms 걸렸어요. 누를 때마다 결과가 달라질 수 있어요" / "가짜 응답이라 12ms 만에 매번 같은 결과예요"
  - `r:['Mock Data','Stub','Spy','Test Double']`
- **Test Double**: `pair(스턴트 대역 배우 SVG, runner(...))`. 결제 API 대신 가짜로 주문 테스트를 통과시키는 줄이다.
- **Matcher**: 같은 내용의 객체를 `toBe`로 비교하면 실패, `toEqual`이면 통과하는 두 줄.
- **Fixture**: `r:['Seed Data','Dummy Data']`. Playwright fixture 뜻이 다르다는 말은 확인한 뒤에만 `x`에 쓴다.
- **Jest·Vitest·Playwright**: `term()`에 실행 명령을 넣고 그 아래 `runner()`를 둔다.
- **Vitest**: `r`에 `'Watch Mode'`를 단다(스펙과 다른 점).

**Task 4 추가:**
- **옮기기**:
  - `T('bug','adv')`의 Flaky Test 객체(2805줄)를 `test/motion` 맨 끝으로 옮긴다.
  - `MOVED`에 `'bug-flaky-test':'test-flaky-test'`를 넣는다.
  - `COUNT['bug/adv'] = 7`(8 − 1)을 더한다.
- **Flaky Test 직접 조작**(`m:0`):
  - 정해진 순서 `TFLAKY = ['pass','fail','pass','pass','fail']`이다. 실패 줄은 `e:'합계 3개', a:'합계 0개'`다.
  - 버튼은 `tkeys(['다시 실행','원인 고정'])`이다.
    - 처음 화면은 `1번째 실행` 한 줄(`TFLAKY[0]`)이다.
    - 다시 실행: 횟수 n을 1 올리고 `{n}번째 실행` 줄을 붙인다. 결과는 원인 고정이 켜져 있으면 `pass`, 아니면 `TFLAKY[(n − 1) % 5]`다. 최근 5줄만 둔다.
    - 원인 고정: `aria-pressed`로 켜고 끈다.
  - 결과 문장 예: "2번째 실행: 실패. 같은 코드인데 결과가 달라요" / "원인을 고쳐 매번 통과해요"
- **Red-Green-Refactor**: 실패 → 통과 → 통과(정리) 3줄 `runner`. `r:['TDD','Watch Mode']`
- **Auto-waiting**: `browser()`에서 버튼이 늦게 나타나고, 아래 `runner` 줄이 기다린 뒤 통과한다. 확인할 조건은 도구 값 확인 표대로다.
- **Parallel Test**: `cmp`로 한 줄씩 실행(나쁜 예)과 동시에 실행(좋은 예)의 걸린 시간을 비교한다. 시간은 예시다.
- **연결(`r`)**: Test Timeout → `'Timeout'` / Test Retry → `'Retry'`·`'Flaky Test'` / Snapshot Update → `'Snapshot Test'`

**Task 5 추가:**
- **막대 부품**: `rbar(pct, {goal, label}) -> string`을 `runner` 바로 뒤에 둔다.
  - 막대 너비 `pct`%, `goal`이 있으면 그 자리에 기준선이다.
  - 글자 `{label} {pct}%`와 `기준 {goal}%`를 함께 쓴다(색만으로 나누지 않음). 0~100 밖은 잘라서 그린다.
  - check.mjs `base`에 `rbar(72, {goal:80, label:'커버리지'})`에 `72%`·`기준 80%`가 있다는 점검을 더한다.
- **Coverage Threshold**: `rbar(72, {goal:80, label:'커버리지'})`와 실패 줄 `runner`. `r:['Test Coverage','Required Check']`
- **Test Pyramid**: 층 그림(`mk-rupy`). 아래부터 Unit(많이·빠름), Integration, E2E(적게·느림). "보통" 표현, `o:0`
- **TDD·BDD**: `o:0`. TDD → `r:['Red-Green-Refactor','Bug First Test']`, BDD → `r:['Given-When-Then']`
- **Test Isolation·Deterministic Test**: `r:['Works on My Machine']`(스펙 4.7)
- **Locator**: `x`에 CSS Selector와 다르다는 점을 쓰고 `r:['Selector']`
- **Mutation Testing**: `pair(돌연변이 SVG, runner(...))`. 줄은 바꾼 코드(예: `>`를 `>=`로)로 돌린 테스트다. `cap`에 "테스트가 실패하면 돌연변이를 잡은 거예요"를 쓴다. 도구 이름을 쓰려면 그 도구 공식 문서를 연다.
- **Property-based Testing·Contract Testing**: 도구 이름(fast-check, Pact 등)은 공식 문서를 열었을 때만 쓴다. Contract Testing은 `net([{k:'pc', t:'프론트엔드'}, {k:'server', t:'API'}], …)` 아래에 `runner`를 둔다.

**Task 6 추가:**
- **옮기기**:
  - `T('deploy','tip')`의 Smoke Test 객체(2629줄)를 `test/kind` 6번째 자리로 옮긴다.
  - `MOVED`에 `'deploy-smoke-test':'test-smoke-test'`를 넣는다.
  - `COUNT['deploy/tip'] = 7`(8 − 1)을 더한다.
- **Smoke Test**: `pair(전원을 넣은 기계 SVG, runner([로그인·결제 통과]))`. 이름 유래를 `x`에 쓰려면 검색으로 확인하고, 못 하면 그림만 둔다.
- **E2E Test·Visual Regression Test**: `browser()`와 `runner()`를 함께 둔다. Visual Regression은 바뀐 부분을 표시한 화면과 실패 줄이다.
- **Sanity Test**: Smoke Test와 섞어 쓰는 경우가 있다고 "보통"으로 쓴다. `o:0`
- **연결(`r`, 스펙 4.7)**: Regression Test → `'Regression'` / E2E Test → `'Cross-browser'` / Accessibility Test → `'Web Accessibility'` / Acceptance Test → `'Acceptance Criteria'`·`'Usability Test'`·`'A/B Test'` / Performance / Load Test → `'Lighthouse'`·`'Slow 3G Test'`
- **브라우저 추가 확인**: `devdict.pins` `["deploy-smoke-test"]` → `["test-smoke-test"]`, `#/t/deploy-smoke-test` → 새 카드(Review Focus 3). 배포 추천 개념 그림이 그대로다.

**Task 7 추가:**
- **Happy Path vs Unhappy Path**: `cmp`. `r:['Edge Case']`
- **Given-When-Then**: `r:['Acceptance Criteria','BDD']`
- **Bug First Test**: 실패 줄 → 고친 뒤 통과 줄. `r:['Reproduce','Minimal Reproduction','Regression Test']`
- **Test Behavior Not Implementation**: `cmp`. 나쁜 예는 내부 함수 호출 횟수를 보는 테스트, 좋은 예는 화면 결과를 보는 테스트다. 긴 이름 줄이 그림 안에서 줄바꿈되는지 본다(Review Focus 1).
- **.only / .skip**: 건너뜀 줄이 있는 `runner`. `p`는 커밋 전에 `.only`가 남았는지 확인하라는 지시다.
- **Required Check**: `browser()` 안 PR 화면에 실패한 검사와 눌리지 않는 병합 버튼. `r:['CI/CD','GitHub Actions']`
- **Broken Build**: `jg:1, o:0`. `r:['CI/CD','Pipeline']`
- **Test Report**: `runner` 요약과 `rbar(통과율)`를 함께 둔다.
- **Test Account·QA Sign-off**: `o:0`

### Task 8: 증상 색인 12개

**쓸 스킬:** interfaces:better-writing

**Files:** Modify `index.html`(`SYM()` 묶음), `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**
  - `SYM_TEST = [스펙 6장 표의 증상 문장 12개 그대로]`
  - `symcount` 기대값을 `111` → `123`으로 바꾼다.
  - SYM_NEW·SYM_TERM·SYM_NET·SYM_TEST가 모두 `SYMPTOMS[].q`에 있어야 한다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL symcount: length 111`
- [ ] **Step 3: 구현**: 스펙 6장 표의 묶음별로 기존 `SYM('오류·안 됨',[…])`(11개)·`SYM('느림',[…])`(1개) 배열 끝에 `['증상', ['En']]`을 넣는다.
- [ ] **Step 4: 점검 통과**: `OK <수>`
- [ ] **Step 5: 브라우저 확인**: 증상 화면에서 "오류·안 됨" → "테스트가 가끔만 실패해요"를 누르면 Flaky Test 카드로 간다. 묶음 칩은 8개 그대로다.
- [ ] **Step 6: 커밋**: `feat: 테스트 증상 색인 12개 추가`

### Task 9: 마무리 (글꼴, 문서, 전체 점검)

**쓸 스킬:** impeccable(audit), break-ui, design-skills:accessibility-audit, improve-animations

**Files:** Modify `index.html`(FONT 블록), `tests/check.mjs`, `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`

- [ ] **Step 1: 글꼴 원본 확인**
  - 측정(계획 작성 시점): `C:\Users\HELLOW~1\AppData\Local\Temp\claude\C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide\f8728c73-6f40-4446-afd9-00c24a2f3dc2\scratchpad\fontsrc\Hahmlet.ttf`와 같은 폴더의 `font_subset.py`가 있다.
  - 없으면 사용자에게 묻고 멈춘다. 물을 내용은 "GitHub hyper-type/hahmlet(OFL)에서 받아도 되나요?"이고, 받는 파일 이름·주소·크기를 함께 알린다.
- [ ] **Step 2: 실패 확인**: check.mjs에서 `LATER = []`로 바꾸고 실행 → `FAIL font: N자 없음`(새 글자가 없으면 통과하고 Step 3을 건너뛴다)
- [ ] **Step 3: 서브셋**: `python -E -P font_subset.py index.html <Hahmlet.ttf> <작업 폴더>`로 FONT 블록 base64를 바꾼다. 스크립트가 `korean … miss  axes [('wght', 400.0, 800.0)]`를 출력해야 한다.
- [ ] **Step 4: 점검 통과**: `OK <수>`(LATER 없음)
- [ ] **Step 5: 문서**
  - PRODUCT.md 31줄: 카테고리 16개, 용어 1186개, `테스트 6개·71개`, 증상 색인 123개
  - docs/PLAN.md 17줄: ② 테스트 완료 표시. 57줄 남은 일: "오류·안 됨" 칩 26개 → 37개
  - DESIGN.md 243줄(네트워크 규칙) 뒤: `runner()` 규칙(결과 줄 모양, 6줄 제한, 기호+글자, 실행 중 → 결과 키프레임, `still`·`label`)과 `rbar()`
- [ ] **Step 6: 전체 브라우저 확인**
  - 테스트 6개 하위항목 전체에 공통 절차를 적용한다. 320px도 본다.
  - reduced-motion에서 자동 재생이 없고, 재생 버튼과 직접 조작 4장이 동작해야 한다.
  - 버그 필수·심화와 배포 추천 개념의 남은 카드 그림이 그대로다.
  - 홈·검색·증상 화면의 콘솔 오류도 0이어야 한다.
- [ ] **Step 7: 품질**
  - impeccable audit와 break-ui를 돌린다.
  - break-ui 입력: 긴 테스트 이름(공백 없는 80자 포함), 긴 기대값·실제값(JSON 한 줄 120자), 결과 6줄 모두 실패
  - 이번 범위의 문제만 고치고, 직접 조작 카드의 키보드·포커스 문제는 반드시 고친다.
- [ ] **Step 8: 커밋**: `feat: 테스트 글꼴 서브셋과 문서 개수 반영`
