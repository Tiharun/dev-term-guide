# 기획·문서 카테고리 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `AI` 앞에 `기획 · 문서` 카테고리를 만든다. 하위항목 6개에 새 카드 71개를 넣고 증상 10개를 추가한다. 문서는 공용 문서 모형 `doc()`, 흐름은 공용 흐름도 모형 `flow()`로 그린다.

**Architecture:** `index.html` 하나에서 작업한다.
- 데이터: DATA 구간에 `CAT`/`T`/`SYM`을 호출한다.
- 그림: `D`에 `Object.assign`으로 더한다.
- `doc()`은 종이 문서 틀 안에 블록을 쌓고, 블록은 기존 `mk-rux1~6` 키프레임으로 하나씩 나타난다. `flow()`는 위에서 아래로 내려가는 줄 목록이고, 경로 위 칸마다 점이 차례로 나타난다. 직접 조작은 `init(stage)`를 쓴다.
- 기존 카드는 옮기지 않는다. `MOVED`는 그대로다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, fonttools(`font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-01-plan-docs-category-design.md](../specs/2026-11-01-plan-docs-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **`flow()` 갈래 규칙**: 2칸 줄 바로 위는 `q` 하나인 줄이거나 2칸 줄이다(두 갈래가 이어짐). 갈래를 다시 합치지 않는다(2칸 줄 뒤 1칸 줄은 throw). 2칸 줄이 이어질 때 `path`는 같은 칸에 머문다.
- **`doc()` 체크 블록**: 기호 `☑`/`☐`(읽지 않음) + 화면 낭독용 글자 `완료: `/`안 함: `(`.sr`).
- **직접 조작 자리**: 새 상자 대신 기존 `.mk-mobox`를 쓴다(측정: 414줄, `padding-top:50px` 포함).
- **Definition of Done**: 체크 상자는 다시 그리는 상자 밖에 둔다(포커스 유지). 완료로 옮긴 뒤 체크를 풀면 진행 중으로 돌아간다.
- **Scope Creep**: 4번 뒤 버튼은 `disabled` 대신 `aria-disabled="true"`(포커스 유지, 눌러도 그대로).
- **데이터 블록 주석**: 번호 없이 `/* ===== 기획 · 문서 ===== */`(모바일 "04" 중복 지적 반영).

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN을 쓰지 않는다.
- 색과 글꼴은 `:root` 변수를 먼저 쓴다. 기획 모형은 도판 토큰(`--ink`·`--plate`·`--rule`·`--mark`·`--ok`·`--mark-text`·`--mono` 등)만 쓴다.
- 그림 속 글자는 최소 11px이다. 도판 틀(`.fig`)에는 그림자를 넣지 않는다. 기본 easing은 `var(--ease)`다.
- 자동 애니메이션은 클래스 `A`와 `--ps` 구조를 쓴다. 주기 10초, 멈춘 장면은 음수 지연 `-8.8s`(88%)이고 모든 블록이 보이고 점이 마지막 칸에 있는 모습이다. `doc()`·`flow()`·`app()`·`track()`을 `still` 없이 쓴 그림은 `m:1`이다.
- 새 D 키는 `'u-' + slug(en)`이다. 새 CSS 클래스·키프레임 이름은 `mk-dc`(문서)·`mk-fw`(흐름도)·`mk-pl`(간트)로 시작한다.
- 상태는 색만으로 나누지 않는다. 기호와 글자를 함께 쓴다.
- 카드 문구 규칙:
  - `d`: 해요체 한 줄 / `p`: "~해줘" 지시문, 정식 용어를 넣는다 / `l`: 1~3 / `ko`: `한글 · 풀이`(예: `Screen Design Document` → `화면 설계서 · …`)
  - `r`: 1~3개. 이미 있는 카드(다른 카테고리 또는 앞 Task의 기획 카드)의 영문명을 1개 이상 단다. 뒤 Task 카드는 달지 않는다(`ref` 점검 실패). 이름만 같고 뜻이 다른 카드는 달지 않는다.
  - `o:1`: 공식 1차 출처를 직접 열어 확인했을 때만 쓰고 `u`와 본문 "(2026-11 확인)"을 단다. 회사마다 뜻이 다른 말은 `o:0`이고 "흔히"로 쓴다.
- 값 단정 금지: 기간·인원·횟수 같은 숫자 규칙은 출처로 확인한 것만 쓴다. 그림 속 날짜·개수는 예시이고 그 D 묶음 주석에 "예시"라고 적는다.
- 그림 속 이름은 가짜(`장보기 앱`, `민지`, `회의록.md` 등)만 쓴다. 실제 회사·서비스·도구(Jira·Notion 등) 화면을 그리지 않는다.
- 문서 블록은 6개, 흐름도는 5줄·한 줄 2칸까지다.
- 코드·명령 줄은 36자 안쪽으로 쓴다(375px 기준). 사이트 이름 같은 재사용 값은 `SITE`를 쓴다.
- 브라우저 확인은 Playwright MCP로 한다. 평소 Chrome 프로필·저장된 로그인을 쓰지 않고, `state save` 파일을 만들지 않는다.
- 작업 단위마다 커밋한다. 메시지는 한국어 `feat:`/`docs:`이고 attribution 줄을 넣지 않는다. `.impeccable/hook.cache.json`은 스테이징하지 않는다.
- 작업마다 "쓸 스킬"을 쓴다. 설치되지 않은 스킬은 건너뛴다.

## Review Focus

1. **좁은 화면의 긴 글**: 공백 없는 긴 표 칸 글, 긴 흐름도 칸 글, 2칸 줄이 320px·375px에서 페이지를 가로로 넘기거나 그림판 밖으로 삐져나오면 안 된다. 칸 안에서 줄바꿈해야 한다. → Task 2 브라우저 확인(직접 넣어 보기), Task 9 break-ui
2. **멈춘 장면이 엉뚱함**: 동작 줄이기 설정이거나 화면 밖에서 멈춘 그림은 문서 블록이 모두 보이고, 점은 경로의 마지막 칸에만 보여야 한다. 중간 칸의 점이 남으면 안 된다. → Task 1 `dframe`·`fframe`, Task 2 브라우저 확인(reduced-motion)
3. **번호가 밀린 뒤 AI 카드**: AI 번호가 17 → 18로 밀려도 기존 주소(`#/t/ai-plan-first`)·즐겨찾기(`devdict.pins`)·검색이 그대로 동작해야 한다. → Task 1 브라우저 확인
4. **직접 조작의 끝 경우**: 꺼진 '요청 하나 더'를 또 누름, 처음 상태에서 '처음으로', 완료 뒤 체크 풀기, 같은 버튼 두 번 누름. 오류 없이 정해진 문장이 나오고 Tab·Enter·Space로 다 된다. 같은 순서면 늘 같은 결과다(`Math.random` 금지). → Task 3·4·5 브라우저 확인
5. **화면 낭독기가 모양만 읽음**: 체크 블록은 "완료"/"안 함"으로, 흐름도 경로 칸은 "지나는 길"로, 간트 막대는 "N~M주"로 읽혀야 한다. 점·연결선·기호는 읽히지 않는다. → Task 1 `base`, Task 6 `pl` 점검

---

## 공통 절차 (Task 2~7에 적용)

1. **실패하는 점검 추가**: `tests/check.mjs`에 아래를 넣는다.
   - `EXPECT['plan/<sec>']`: 그 Task 표의 영문명
   - `COUNT['plan/<sec>']`
   - `total` 기대값: 표의 누계(주석 끝에 `+ 기획`을 더한다)
   - 직접 조작 카드가 있으면 `PDM`에 그 카드의 버튼 이름을 더한다(Task 1 Interfaces).
2. **실패 확인**: `node tests/check.mjs` → `FAIL expect:plan/<sec>`
3. **데이터**:
   - `/* ===== 기획 · 문서 ===== */` 스크립트 블록의 `T('plan','<sec>',[...])`에 스펙 순서대로 넣는다.
   - 이 블록은 Task 2에서 `/* ===== 13 AI · Claude와 일하기 ===== */`(3069줄) 블록 바로 앞에 새로 만든다.
4. **그림**:
   - `const visual`(5918줄) 바로 앞, `/* mobile: tip … */` 묶음 뒤에 `/* plan: <sec> — … */` 주석과 `Object.assign(D, {...})`를 둔다. 주석에는 출처로 확인한 값과 예시 값을 나눠 적는다.
   - 무엇으로 그릴지:
     - 결과물이 문서인 말: `doc()`
     - 순서·갈래: `flow()`
     - 일정·단계: `track()`
     - 할 일 판: `u-kanban-board`(3923줄)의 `.mk-kan` 마크업
     - 화면 그림이 필요한 말: `app()`
     - 명령: `term()`
     - 두 칸 비교: `MDUO` 또는 `.mk-two`
     - 나쁜 예·좋은 예: `<div class="cmp"><div class="bad" data-l="…">…</div><div class="good" data-l="…">…</div></div>`
     - 비유: `pair(art, doc(...))`
5. **직접 조작**(표에 있는 카드만):
   - stage는 `<div class="mk-mobox">${doc(..., {still:true, label}) 또는 flow(...)}</div>${tkeys([...])}<span class="mk-hint" aria-live="polite">…</span>`이다.
   - `init`은 `.mk-mobox`의 innerHTML과 `.mk-hint` 글자만 바꾼다. 라이브 영역을 다시 만들지 않아야 읽힌다.
   - 고른 버튼에는 `aria-pressed="true"`를 단다. 리스너는 stage 안 요소에만 단다. 모양은 `u-mock`과 모바일 직접 조작 카드를 따른다.
   - 상태 표는 그 D 묶음 앞 상수(예: `PDEC`)로 둔다.
6. **점검 통과**: `node tests/check.mjs` → `OK <수>`. `LATER font`·`LATER doccount` 줄은 Task 9 전까지 정상이다.
7. **브라우저 확인**(아래 절차)
8. **커밋**: `git add index.html tests/check.mjs && git commit -m "feat: 기획·문서 <하위항목 이름> 하위항목 추가"`

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/plan/<sec>`. 캐시 때문에 `?r=`가 필요하다.
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**: `document.documentElement.scrollWidth <= innerWidth` → `true`. 그림 안: `[...document.querySelectorAll('#view .mk-dc, #view .mk-fw, #view .mk-pl')].filter(s => s.scrollWidth > s.clientWidth + 1)` → `[]`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900과 375×812에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)
- 직접 조작 카드는 마우스 클릭, 375px에서 탭, Tab·Enter·Space로 조작해 본다.

---

### Task 1: 기반 (카테고리, 문서 모형, 흐름도 모형, 점검 확장)

**쓸 스킬:** frontend-design:frontend-design, impeccable(shape), animate, interfaces:better-accessibility, interfaces:better-colors

**Files:**
- Modify `index.html`:
  - 카테고리 목록: 1613줄 `CAT('ai', …)` 바로 앞
  - `.fig:has(…)` 규칙들(445줄)과 `.cmp>div:has(…)`(306줄)
  - CSS: `.mk-mobot` 규칙 줄(436줄) 뒤, `.mk-btn`(437줄) 앞
  - 모형 도우미: `track`(3463줄) 끝 뒤, `/* 직접 조작 도우미 … */` 주석(3469줄) 앞
- Modify `tests/check.mjs`

**Interfaces:**
- Consumes: `esc`, `tkeys`, `pair`, `.sr`(38줄), `.mk-hl`(447줄), 키프레임·클래스 `mk-rux1~6`(384·386줄), `.mk-mobox`
- Produces:
  - **카테고리**: `CAT('plan','기획 · 문서','무엇을 만들지 정하고 글로 남기는 말', [['docs','문서 종류','자주 쓰는 문서의 이름과 쓰임']])`. secs id는 `basic, core, motion, adv, docs, tip` 순서다.
  - **`doc(blocks, opt = {}) -> string`**: 측정: `doc`·`flow` 선언 0건, `mk-dc`·`mk-fw`·`mk-pl` 0건.
    - `blocks[i]`는 키 하나짜리 객체다. `{h}` 제목, `{p}` 문단, `{ul:[글…]}` 목록, `{tb:[[머리…],[값…]…]}` 표(첫 줄이 머리), `{ck:[[글, 참/거짓]…]}` 체크 목록. 모든 글자는 `esc()`.
    - 1~6개. 아니면 `throw new Error('doc: 블록은 1~6개')`. 다른 키면 `throw new Error('doc: 블록 종류 ' + 키)`.
    - `opt`: `{title = '문서', still = false, hl, label}`. `hl`은 강조할 블록 번호(0부터). `label`이 있으면 루트에 `role="group"`과 `aria-label`.
    - 구조: `<div class="mk-dc"[ role group]><div class="mk-dct">{title}</div><div class="mk-dcb">` + 블록 k(1부터)마다 `<div class="mk-dck[ mk-hl][ mk-rux{k} A]">{블록}</div>` + `</div></div>`. `still`이면 `mk-rux{k} A`를 붙이지 않는다.
    - 블록: 제목 `<b class="mk-dch">`, 문단 `<p>`, 목록 `<ul><li>…</li></ul>`, 표 `<table><thead><tr><th>…</th></tr></thead><tbody><tr><td>…</td></tr></tbody></table>`, 체크 `<ul class="mk-dcc"><li><b aria-hidden="true">☑|☐</b><span class="sr">완료: |안 함: </span>{글}</li></ul>`.
    - CSS: `.mk-dck.A{animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}`(`mk-rux{k}`는 10k+5%에 나타나므로 88%에 6개 모두 보임). 표는 `table-layout:fixed;width:100%`, 칸·문단은 `overflow-wrap:anywhere`. 루트 `max-width:100%`.
  - **`flow(rows, opt = {}) -> string`**:
    - `rows[i]`는 칸 1~2개 배열. 칸 `{t, k = 'box', e}`. `k`는 `'box'`(사각형)·`'q'`(마름모, 글자는 가로)·`'end'`(둥근 칸). `e`는 들어오는 선의 이름.
    - 오류(모두 `throw new Error('flow: …')`):
      - 줄 0개·6개 이상 → `'flow: 줄은 1~5개'`
      - 한 줄 0칸·3칸 이상 → `'flow: 한 줄에 칸은 1~2개'`
      - 다른 `k` → `'flow: 칸 종류 ' + k`
      - 2칸 줄의 바로 위가 `q` 하나인 줄도 2칸 줄도 아님(첫 줄 포함) → `'flow: 갈래는 질문 칸 아래에서'`
      - 2칸 줄 뒤 1칸 줄 → `'flow: 갈래는 합치지 않아요'`
      - `path[i]`가 그 줄에 없는 칸 → `'flow: 경로 칸 없음'`
      - 2칸 줄이 이어지는데 `path[i] !== path[i-1]` → `'flow: 경로가 갈래를 건너뛰어요'`
    - `opt`: `{path = 모두 0, still = false, label}`
    - 구조: `<div class="mk-fw"[ role group]><ol class="mk-fwl">` + 줄 k(1부터)마다 `<li class="mk-fwr[ two]">` + 칸마다 `<div class="mk-fwn {k}[ on]">{e가 있으면 <span class="mk-fwe">{e}</span>}{on이면 <span class="sr">지나는 길: </span><b class="mk-fwm" aria-hidden="true">●</b>}<span class="mk-fwt">{t}</span>{on이고 still이 아니면 점}</div>` + `</li>` + `</ol></div>`
    - 점: 마지막 줄이면 `<i class="mk-fwd mk-fwz{k} A" aria-hidden="true"></i>`, 아니면 `mk-fwy{k}`.
    - CSS: `.mk-fwd.A{animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:var(--ease)}`, `.mk-fwy{k}{animation-name:mk-fwy{k}}`(k = 1~4), `.mk-fwz{k}{…mk-fwz{k}}`(k = 1~5). 기본 `opacity:0`.
    - 키프레임(s = 15k − 5, 줄 k의 점이 나타나는 %):
      - `@keyframes mk-fwy{k}{0%,{s-0.1}%{opacity:0}{s}%,{s+14.9}%{opacity:1}{s+15}%,100%{opacity:0}}`
      - `@keyframes mk-fwz{k}{0%,{s-0.1}%{opacity:0}{s}%,100%{opacity:1}}`
      - 그래서 88%에서 중간 점은 모두 사라지고(최대 85%) 마지막 점만 보인다(Review Focus 2).
    - 연결선은 CSS 가상 요소로 그린다(읽히지 않음). 1칸 → 2칸은 갈라지는 선, 2칸 → 2칸은 칸마다 곧은 선. `on` 칸은 `--mark` 테두리 + ●. 2칸 줄은 `grid-template-columns:minmax(0,1fr) minmax(0,1fr)`, 칸 글은 `overflow-wrap:anywhere`.
  - 색: `on` 테두리·●·`mk-hl`이 `--plate` 배경에서 3:1(그래픽)·4.5:1(글자) 이상인지 better-colors로 재고 커밋 본문에 적는다.
  - **`.fig:has(…)`**: 445줄 규칙 중 `.mk-mo`·`.mk-mt`가 든 목록마다 `.mk-dc,.mk-fw,.mk-pl`을 더한다. `.cmp>div:has(>.mk-dc)`·`.cmp>div:has(>.mk-fw)`도 `.mk-mo`와 같은 규칙을 준다.
  - **check.mjs `PDM`**: `const PDM = {}`(영문명 → 그림 `h`에 있어야 할 글자 배열). Task 3~5가 채운다.
  - **`LATER`**: `['font', 'doccount']`. Task 9에서 비운다.

- [ ] **Step 1: 실패하는 점검 추가**(check.mjs)
  - `cat`에 더한다: `ai` 바로 앞 카테고리가 `plan`이고, secs id가 `['basic','core','motion','adv','docs','tip']`다.
  - `pv`: `t.c === 'plan'`인 카드는 모두 `v`가 `'u-'`로 시작하는 문자열이다(`mv`와 같다).
  - `pm`: `t.c === 'plan'`이고 `m`이 있는 그림의 `h`에 `/ A["\s]/`가 있다(`mm`과 같다).
  - `pdm`: `PDM`의 영문명마다 카드가 있고, 그림에 `init`이 있고, `h`에 배열의 글자가 모두 있다.
  - `base`에 더한다:
    - `const dc = doc([{h:'회의록'}, {p:'<b>&'}, {ul:['a','b']}, {tb:[['이름','할 일'],['민지','견적']]}, {ck:[['검토', true], ['배포', false]]}], {title:'회의록.md', hl:2, label:'문서'})`
      - `mk-dc`·`role="group"`·`aria-label="문서"`·`회의록.md`·`&lt;b&gt;&amp;`·`<th>이름</th>`·`<td>견적</td>`·`☑`·`☐`·`<span class="sr">완료: </span>`·`<span class="sr">안 함: </span>`·`mk-rux5 A`가 있고 `<b>&`는 없다.
      - `/class="mk-dck([^"]*)"/g`가 5번이고, 셋째만 `mk-hl`을 가진다.
    - `doc([{p:'a'}], {still:true})`에 ` A"`·`mk-rux`가 없다.
    - throw: `doc([])`, 블록 7개, `doc([{x:1}])`.
    - `const fw = flow([[{t:'담기'}], [{t:'로그인?', k:'q'}], [{t:'장바구니', k:'end', e:'예'}, {t:'로그인 화면', k:'end', e:'아니오'}]], {path:[0,0,1], label:'흐름'})`
      - `mk-fw`·`role="group"`·`aria-label="흐름"`·`<span class="mk-fwe">예</span>`·`<span class="mk-fwe">아니오</span>`·`mk-fwy1 A`·`mk-fwy2 A`·`mk-fwz3 A`가 있다.
      - `/class="mk-fwn (\w+)( on)?"/g`가 4번이고 `on`은 [있음, 있음, 없음, 있음]이다.
      - `<span class="sr">지나는 길: </span>`와 `<b class="mk-fwm" aria-hidden="true">●</b>`가 각각 3번, `/<i class="mk-fwd[^"]*" aria-hidden="true">/`에 맞는다.
    - `flow([[{t:'<i>&'}]])`에 `<i>&`가 없다.
    - `flow([[{t:'a'}]], {still:true})`에 ` A"`·`mk-fwd`가 없고 `●`는 있다.
    - throw: 줄 0개, 6줄, 3칸 줄, `{k:'x'}`, `flow([[{t:'a'}],[{t:'b'},{t:'c'}]])`, `flow([[{t:'q',k:'q'}],[{t:'b'},{t:'c'}],[{t:'d'}]])`, `flow([[{t:'a'}]], {path:[1]})`, `flow([[{t:'q',k:'q'}],[{t:'b'},{t:'c'}],[{t:'d'},{t:'e'}]], {path:[0,0,1]})`.
  - `dframe`: `/\.mk-dck\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/`에서 멈춘 지점 P(%)를 읽고, k = 1~6마다 `@keyframes mk-rux{k}`의 `b%,100%{opacity:1}`에서 b ≤ P인지 본다.
  - `fframe`: `/\.mk-fwd\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/`의 P에서, k = 1~5마다 `mk-fwz{k}`가 나타나는 % ≤ P, k = 1~4마다 `mk-fwy{k}`가 사라지는 % ≤ P인지 본다.
  - `doccount`: PRODUCT.md의 `/카테고리 (\d+)개/`·`/용어 (\d+)개/`·`/증상 색인 (\d+)개/` 첫 값이 `CATS`·`TERMS`·`SYMPTOMS` 수와, docs/PLAN.md의 `/"오류·안 됨" 칩 (\d+)개/`가 `SYMPTOMS.filter(s => s.g === '오류·안 됨')` 수와 같다. 측정: 지금 문서 값은 17·1257·135·46으로 실제와 같다.
  - `LATER = ['font', 'doccount']`
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL cat`, `FAIL base: … doc is not defined`, `FAIL dframe`, `FAIL fframe`. `doccount`는 아직 통과한다. 다른 점검은 그대로 통과해야 한다.
- [ ] **Step 3: 구현**: Interfaces대로 `CAT`, `doc`, `flow`, CSS, 키프레임을 만든다. 색 대비를 재서 커밋 본문에 적는다.
- [ ] **Step 4: 점검 통과**: `node tests/check.mjs` → `OK <수>`, `LATER doccount: …`(카테고리 18)
- [ ] **Step 5: 브라우저 확인**
  - `#/c/plan/basic`이 "아직 용어가 없어요"로 뜬다. 홈·사이드 목록에서 기획이 17번, AI가 18번이다.
  - localStorage `devdict.pins`를 `["ai-plan-first"]`로 두고 새로고침해도 그대로이고, `#/t/ai-plan-first`가 열리며, 검색 "Plan First"가 그 카드를 찾는다(Review Focus 3).
  - 콘솔 오류 0
- [ ] **Step 6: 커밋**: `feat: 기획·문서 카테고리와 문서·흐름도 모형 기반`

### Task 2~7: 하위항목 6개

| Task | sec | EXPECT (스펙 순서) | 직접 조작 | 비유 | COUNT | total | 쓸 스킬 |
|---|---|---|---|---|---|---|---|
| 2 | basic | Planning, Requirement, Feature, User Story, Priority, Deadline, Stakeholder, Draft, Meeting, Owner, Goal | — | — | 11 | 1268 | frontend-design:frontend-design, interfaces:better-writing |
| 3 | core | Backlog, Roadmap, Milestone, Sprint, Agile, Ticket, Estimate, Retrospective, Daily Stand-up, Definition of Done, Markdown, Template, Review Request, Approval | Definition of Done, Markdown | — | 14 | 1282 | source-driven-development, interfaces:better-accessibility |
| 4 | motion | Screen Flow, Flowchart, Storyboard, Wireflow, Screen List, Decision Point, Happy Path, Exception Flow, Task Flow, User Journey Map, State Diagram, Swimlane Diagram | Decision Point | — | 12 | 1294 | animate, design-skills:interaction-design |
| 5 | adv | ADR, RFC, Functional vs Non-functional Requirement, Traceability, Scope Creep, Trade-off, Assumption, Risk Register, Change Request, Single Source of Truth, Docs as Code, Mermaid | Scope Creep | Trade-off, Single Source of Truth | 12 | 1306 | source-driven-development, design-skills:interaction-design |
| 6 | docs | PRD, Functional Specification, Screen Design Document, Technical Design Document, Meeting Minutes, Project Proposal, WBS, Test Plan, User Manual, Runbook, FAQ, Glossary, One-pager, Gantt Chart | — | — | 14 | 1320 | interfaces:better-layout, design-skills:ux-writing |
| 7 | tip | TL;DR, Action Item, 5 Whys, Out of Scope, Decision Log, Write for the Reader, Keep Docs Updated, Show with Example | — | — | 8 | 1328 | design-skills:ux-writing, interfaces:better-writing |

측정: 새 영문명 71개는 기존 카드와 이름·`u-` 키가 겹치지 않는다. id 예: `TL;DR` → `plan-tl-dr`, `5 Whys` → `plan-5-whys`, `Daily Stand-up` → `plan-daily-stand-up`.

**연결(`r`, 스펙 4.7 표를 카드별로 나눔)**: 측정: 오른쪽 이름은 모두 있다.

| 새 카드 | `r`에 달 기존 카드 |
|---|---|
| Planning | Plan First |
| Requirement | Spec, Specific Request, Constraint |
| Ticket | One Task per Request, Issue |
| Backlog · Sprint | Kanban Board |
| Definition of Done | Acceptance Criteria |
| Review Request | Feedback, Design Review, Code Review |
| Template | Style Guide |
| Draft | Draft Design |
| Screen Flow | User Flow, Login Flow |
| Flowchart | Data Flow |
| Storyboard | Prototype |
| Wireflow | Wireframe |
| Screen List | Information Architecture, Sitemap |
| Exception Flow | Edge Case |
| Change Request | Version History, Release Notes |
| Single Source of Truth · Docs as Code | CLAUDE.md |
| PRD | MVP |
| Functional Specification | Spec, Pseudocode |
| Screen Design Document | Mockup, Design Spec |
| Technical Design Document | API Documentation |
| WBS · Gantt Chart | (없음 — 기존 Dependency는 패키지 뜻이라 달지 않음) |
| Test Plan | Test Case |
| User Manual | Table of Contents, README |
| Glossary | Glossary Habit |
| Retrospective · 5 Whys | Postmortem |
| Out of Scope | Scope |
| Decision Log | Changelog |

**출처 확인 표**(Task 2~7 공통, 출처 주소는 후보이며 추측이다): 그림·문구에 넣는 값마다 출처를 열어 확인하고, 확인한 줄을 그 Task 커밋 본문에 적는다. 확인 못 한 값은 빼거나 "흔히"로 쓴다.

| 카드 | 확인할 값 | 출처 후보 |
|---|---|---|
| Sprint·Retrospective·Definition of Done·Backlog·Daily Stand-up | Sprint 길이 상한, Daily Scrum 시간, 회고 목적, 완료 정의, Product·Sprint Backlog 뜻. Daily Stand-up 카드에 원문 이름이 Daily Scrum이라고 적음 | scrumguides.org(Scrum Guide 2020) |
| Agile | 네 가지 가치 | agilemanifesto.org |
| Markdown | `#` 제목, `-` 목록, 표 문법 | docs.github.com(basic writing and formatting syntax), commonmark.org |
| Mermaid | `flowchart TD`, 화살표·갈래 문법, GitHub 문서에서 그림으로 보임 | mermaid.js.org, docs.github.com(creating diagrams) |
| ADR | 항목 이름(제목·상태·상황·결정·결과) | Michael Nygard "Documenting Architecture Decisions"(2011), adr.github.io |
| RFC | IETF RFC와 뜻이 다름(구분 문장만, `r`로 잇지 않음) | rfc-editor.org |
| User Story | "…로서 …하고 싶다, 왜냐하면 …" 꼴 | 1차 출처를 못 찾으면 `o:0` "흔히" |
| 5 Whys | 유래(도요타) | toyota-global.com. 못 찾으면 유래 문장을 뺀다 |
| PRD·Functional Specification·Screen Design Document·Technical Design Document·Project Proposal·One-pager·WBS·Gantt Chart·Docs as Code | 회사마다 다름 | `o:0` "흔히" |

**Task 2 추가:**
- 그림: Planning은 `flow()` 4줄(목표 → 요구사항 → 화면 → 만들기), Deadline은 `track()`(마감 날짜는 `n`, 예시), 나머지 9장은 `doc()`. Priority는 표에 "높음·보통·낮음"을 글자로 쓴다(색만으로 나누지 않음).
- `m:1`이 아닌 `doc(…, {still:true})`를 쓴 카드는 `m`을 달지 않는다.
- **브라우저 추가 확인**:
  - `browser_emulate_media` reduced-motion에서 `doc()` 그림은 모든 블록이 보이고, `flow()` 그림은 마지막 칸에만 점이 보인다. 재생 버튼을 누르면 움직인다(Review Focus 2).
  - 320px에서 한 그림의 stage 끝에 `doc([{tb:[['공백없는아주긴머리글자열스무자넘게','b'],['공백없는아주긴칸글자열서른자넘게이어지는값','c']]}, {p:'공백 없는 문단 80자…'}])`와 `flow([[{t:'공백없는긴칸글자열'}],[{t:'긴질문?',k:'q'}],[{t:'긴갈래글자열하나',e:'예'},{t:'긴갈래글자열둘',e:'아니오'}],[{t:'a'},{t:'b'}],[{t:'c',k:'end'},{t:'d',k:'end'}]])`를 `insertAdjacentHTML`로 넣고, 페이지 넘침과 `.mk-dc`·`.mk-fw` 넘침을 잰 뒤 새로고침한다(Review Focus 1).

**Task 3 추가:**
- 그림: Roadmap·Milestone·Sprint·Agile·Approval은 `track()`, Backlog·Ticket은 `.mk-kan` 판, 나머지는 `doc()`. Daily Stand-up·Retrospective의 질문 항목은 출처에 있는 것만 단정하고 나머지는 "흔히".
- **Definition of Done 직접 조작**(`m:0`):
  - 상수 `PDOD = ['요구사항대로 동작해요','테스트를 통과했어요','검토를 받았어요','문서를 고쳤어요']`.
  - stage: `<div class="mk-mobox">{진행 중·완료 두 칸 판, 티켓 1장}</div><fieldset class="mk-dcdod"><legend>완료 조건</legend>{label 안 input type="checkbox" 4개}</fieldset>${tkeys(['완료로 옮기기'])}<span class="mk-hint" aria-live="polite">…</span>`. 체크 상자는 `.mk-mobox` 밖이다.
  - '완료로 옮기기': 안 된 것이 N개면 그대로 두고 "아직 N개 남았어요", 0개면 티켓을 완료 칸으로 옮기고 "완료로 옮겼어요".
  - 완료 상태에서 체크를 풀면 티켓이 진행 중으로 돌아가고 "조건이 빠져서 다시 진행 중이에요"(Review Focus 4).
  - `PDM['Definition of Done'] = ['완료로 옮기기', 'type="checkbox"']`
- **Markdown 직접 조작**(`m:0`):
  - 상수 `PMD = ['# 회의록', '## 할 일', '- 견적 보내기', '- 일정 정하기']`. 버튼 `tkeys(['쓴 글','보이는 모습'])`, 처음은 '쓴 글'(`aria-pressed="true"`).
  - 쓴 글: `<pre class="mk-dcmd">`에 `PMD`를 줄마다. 보이는 모습: `doc([{h:'회의록'}, {h:'할 일'}, {ul:['견적 보내기','일정 정하기']}], {still:true, title:'회의록.md'})`.
  - 문장: "쓴 글: #·- 기호로 적은 원문이에요" / "보이는 모습: 기호가 제목과 목록으로 바뀌었어요".
  - `PDM['Markdown'] = ['쓴 글', '보이는 모습', 'aria-pressed']`
- **브라우저 추가 확인**: 두 카드를 Tab·Enter·Space·Space(체크)로 조작하고, 같은 버튼을 두 번 눌러도 오류가 없다.

**Task 4 추가:**
- 그림: Screen Flow·Flowchart·Happy Path·Exception Flow·Task Flow·State Diagram은 `flow()`, Storyboard·Wireflow는 `app()`(Wireflow는 `tap`으로 누르는 곳을 보인다), Screen List·User Journey Map·Swimlane Diagram은 `doc()` 표(Swimlane은 줄 = 맡은 사람, 칸 = 단계).
- Happy Path와 Exception Flow는 같은 상수 `PPAY`(결제 → 성공했나요? → 완료 / 오류 안내)를 쓰고 `path`만 다르다.
- 디자인 카드(User Flow·Wireframe·Prototype)와 겹치지 않게, 캡션은 "무엇을 어떤 순서로 정하는지"에 초점을 둔다.
- **Decision Point 직접 조작**(`m:0`):
  - 상수 `PDEC = [[{t:'상품 담기'}], [{t:'로그인했나요?', k:'q'}], [{t:'장바구니', k:'end', e:'예'}, {t:'로그인 화면', k:'end', e:'아니오'}]]`.
  - 버튼 `tkeys(['예','아니오'])`, 처음은 '예'(`aria-pressed="true"`)이고 `flow(PDEC, {path:[0,0,0], still:true})`.
  - 누르면 `path` 마지막 값이 0 또는 1이 되고 문장은 "예 → 장바구니로 가요" / "아니오 → 로그인 화면으로 가요".
  - `PDM['Decision Point'] = ['예', '아니오', 'aria-pressed']`

**Task 5 추가:**
- 그림: Functional vs Non-functional Requirement는 `MDUO`, Docs as Code는 `term()`(`git add docs/` 같은 줄), Mermaid는 `.mk-two`로 코드(`<pre>`)와 `flow()` 결과를 나란히, 나머지는 `doc()`. RFC는 `x`에 IETF RFC와 다르다고 쓴다.
- **Trade-off**: 상수 `PSCALE`(저울 SVG, `aria-hidden`, 한쪽 "빨리"가 올라가면 "꼼꼼히"가 내려감)과 `pair(PSCALE, doc([{tb:[['고르면','얻는 것','내주는 것'],['빨리','일찍 출시','검토 덜 함'],['꼼꼼히','오류 적음','늦게 출시']]}]))`.
- **Single Source of Truth**: 상수 `PSSOT`(원본 하나를 복사본들이 화살표로 가리키는 SVG, `aria-hidden`)와 `pair(PSSOT, doc(...))`. 캡션에 "원본이 여러 개면 내용이 서로 달라져요".
- **Scope Creep 직접 조작**(`m:0`):
  - 상수 `PSCOPE = {base:['로그인','상품 목록','장바구니'], add:['쿠폰','리뷰','찜하기','알림'], day:20}`(11월 20일, 예시).
  - 그림은 `doc([{h:'이번 범위'}, {ul:[...]}, {p:'마감 11월 {day+n}일'}], {still:true})`. 버튼 `tkeys(['요청 하나 더','처음으로'])`.
  - '요청 하나 더'(n < 4): `add[n]`을 더하고 하루 민다. 문장 "할 일 {3+n}개 · 마감 11월 {20+n}일". n이 4가 되면 버튼에 `aria-disabled="true"`, 문장 끝에 " · 범위를 다시 정해야 해요".
  - 꺼진 뒤 또 누르면 그대로이고 같은 안내다. '처음으로'는 n = 0, `aria-disabled` 제거, "처음 범위로 돌아왔어요"(처음 상태에서 눌러도 같음).
  - `PDM['Scope Creep'] = ['요청 하나 더', '처음으로']`

**Task 6 추가:**
- 그림: Screen Design Document는 `.mk-two`로 `app()` 한 장면(번호 표시)과 `doc()` 번호 설명표, WBS는 `doc()` 표(`1`·`1.1` 번호), Gantt Chart는 아래 `mk-pl`, 나머지는 그 문서의 대표 제목들을 `doc()`으로. 모든 문서 종류 카드의 `x`에 "회사마다 양식이 달라요"를 쓴다.
- **Gantt Chart**(`m:0`):
  - 상수 `PGANTT = [['기획',1,1],['디자인',2,2],['개발',2,3],['테스트',4,4]]`(이름, 시작 주, 끝 주, 예시).
  - `<table class="mk-pl"><thead><tr><th>할 일</th><th>1주</th>…<th>4주</th></tr></thead>`, 줄마다 `<th scope="row">{이름}</th>` + 빈 `<td>`들 + `<td colspan="{끝-시작+1}"><span class="mk-plb"><span class="sr">{시작}~{끝}주</span></span></td>`.
  - check.mjs `pl`: `g.D['u-gantt-chart'].h`에 `<span class="sr">2~3주</span>`와 `scope="row"`가 있다.

**Task 7 추가:**
- 그림: TL;DR·Write for the Reader·Keep Docs Updated·Show with Example은 `cmp`(나쁜 예·좋은 예 모두 `doc(…, {still:true})`), 5 Whys는 `flow()` 5줄(마지막 `end`가 근본 원인), 나머지는 `doc()`.
- Out of Scope의 `p` 예: "이번 범위 밖이야. 쿠폰 기능은 만들지 말아 줘" 같은 지시문.

### Task 8: 증상 색인 10개

**쓸 스킬:** interfaces:better-writing

**Files:** Modify `index.html`(`SYM()` 묶음, 3180~3300줄), `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**
  - `SYM_PLAN = [스펙 6장 표의 증상 문장 10개 그대로]`
  - `symcount` 기대값을 `135` → `145`로 바꾸고, SYM_PLAN도 `SYMPTOMS[].q`에 있어야 한다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL symcount: length 135`
- [ ] **Step 3: 구현**: 스펙 6장 표대로 `SYM('느림',[…])`(2)·`SYM('크기·화면',[…])`(1)·`SYM('오류·안 됨',[…])`(7) 배열 끝에 `['증상', ['En']]`을 넣는다.
- [ ] **Step 4: 점검 통과**: `OK <수>`(`LATER doccount`는 칩 53개 ≠ 46으로 계속 뜬다)
- [ ] **Step 5: 브라우저 확인**: 증상 화면에서 "오류·안 됨" → "회의 뒤 누가 할지 안 정해졌어요"를 누르면 Action Item 카드로 간다. 묶음 칩은 8개 그대로다.
- [ ] **Step 6: 커밋**: `feat: 기획·문서 증상 색인 10개 추가`

### Task 9: 마무리 (글꼴, 문서, 전체 점검)

**쓸 스킬:** impeccable(audit), break-ui, design-skills:accessibility-audit, improve-animations

**Files:** Modify `index.html`(FONT 블록), `tests/check.mjs`, `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`

- [ ] **Step 1: 글꼴 원본 확인**
  - 측정(계획 작성 시점): `C:\Users\HELLOW~1\AppData\Local\Temp\claude\C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide\f8728c73-6f40-4446-afd9-00c24a2f3dc2\scratchpad\`에 `font_subset.py`와 `fontsrc\`가 있다.
  - 없으면 사용자에게 묻고 멈춘다. 물을 내용은 "GitHub hyper-type/hahmlet(OFL)에서 받아도 되나요?"이고, 받는 파일 이름·주소·크기를 함께 알린다.
- [ ] **Step 2: 실패 확인**: check.mjs에서 `LATER = []`로 바꾸고 실행 → `FAIL font: N자 없음`, `FAIL doccount: …`(새 글자가 없으면 font는 통과하고 Step 3을 건너뛴다)
- [ ] **Step 3: 서브셋**: `python -E -P font_subset.py index.html <Hahmlet.ttf> <작업 폴더>`로 FONT 블록 base64를 바꾼다. 스크립트가 `korean … miss  axes [('wght', 400.0, 800.0)]`를 출력해야 한다.
- [ ] **Step 4: 문서**
  - PRODUCT.md 31줄: 카테고리 18개, 용어 1328개, `모바일 앱 6개·71개` 뒤에 `기획 · 문서 6개·71개`, 증상 색인 145개
  - docs/PLAN.md 17줄: ② 기획·문서 완료 표시(② 끝, 다음은 ③). 57줄: "오류·안 됨" 칩 46개 → 53개
  - DESIGN.md: `track()` 규칙 뒤, `### 검색표` 앞에 `doc()` 규칙(블록 6개 제한, 블록 5종, `hl`, 체크 블록 읽기 글자, `still`·`label`, `mk-rux` 재사용)과 `flow()` 규칙(5줄·2칸 제한, 갈래 규칙, `path`, 점 키프레임, 지나는 길 글자)
- [ ] **Step 5: 점검 통과**: `OK <수>`(LATER 없음)
- [ ] **Step 6: 전체 브라우저 확인**
  - 기획 6개 하위항목 전체에 공통 절차를 적용한다. 320px도 본다.
  - reduced-motion에서 자동 재생이 없고, 재생 버튼과 직접 조작 4장이 동작해야 한다.
  - AI 카테고리 화면과 기존 `#/t/ai-...` 주소가 그대로다. 홈·검색·증상 화면의 콘솔 오류도 0이어야 한다.
- [ ] **Step 7: 품질**
  - impeccable audit와 break-ui를 돌린다. break-ui 입력: `doc()` 블록 6개·공백 없는 긴 표(4열), `flow()` 5줄·두 갈래·공백 없는 긴 칸 글
  - 이번 범위의 문제만 고치고, 직접 조작 카드의 키보드·포커스 문제는 반드시 고친다.
- [ ] **Step 8: 커밋**: `feat: 기획·문서 글꼴 서브셋과 문서 개수 반영`
