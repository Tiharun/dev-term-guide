# 개발 기본 카테고리 보강 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 개발 기본을 하위항목 7개·카드 103장으로 늘린다.
- 새 카드 50장, 새 하위항목 `principle`, 증상 12개를 넣는다.
- 기존 그림 28장을 다시 그리고, 모든 카드에 x를 채운다.
- 코드 실행은 새 도우미 `ide()`, 메모리는 `mem()`으로 그린다.

**Architecture:** `index.html` 하나에서 작업한다.
- 데이터는 `/* ===== 01 개발 기본 ===== */` 블록(2024줄)의 `T('basics', …)`에 넣는다.
- 그림은 `const visual`(6351줄) 앞에 `/* basics: <sec> … */` 주석 + `Object.assign(D, {...})`로 더한다.
- `ide()`·`mem()`은 단계(장면)를 겹쳐 그린다. 같은 칸에 단계마다 판을 하나씩 쌓고, 단계 k의 판만 k×10%~k×10+9.9%에 보인다(마지막 단계는 끝까지 보임).

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, fonttools(`font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-02-basics-category-design.md](../specs/2026-11-02-basics-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치**: `basics-category`에서 작업한다. main 병합은 사용자 확인 뒤에 한다.
- **화살표**: `mem()`의 화살표는 선을 긋지 않는다. 이름표 안의 `→ A` 글자와 상자 머리의 `A`로 잇는다. 좁은 화면에서 선이 깨지지 않게 하기 위해서다.
- **mem 한도**: 스펙의 "상자 1~5"를 스택 칸 이름표 1~4개, 힙 칸 상자 0~5개로 나눈다. 값만 담는 장면은 힙이 0개일 수 있다.
- **이름 접두사**: 새 클래스·키프레임 이름은 `mk-cd`(ide)·`mk-mr`(mem)로 시작한다. 측정: 지금 두 접두사 0건(`mk-id`·`mk-me`는 이미 있어서 쓰지 않음).
- **다시 그린 것 점검**: 객체 `v`(옛 형식)를 써도 되는 카드는 목록 `BOBJ`로 관리한다. 처음에는 기존 53장이고, Task 8·9에서 28장을 빼면 25장이 남는다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN은 쓰지 않는다.
- 도판 토큰(`--ink`·`--plate`·`--rule`·`--mark`·`--ok`·`--mark-text`·`--mono`)만 쓴다. 그림 글자는 11px 이상이다. `.fig`에는 그림자를 넣지 않는다. easing은 `var(--ease)`다.
- 자동 애니메이션은 클래스 `A`를 쓴다. 주기 10s, 멈춘 장면은 `-8.8s`(88%)이다. `still` 없이 움직이는 그림은 `m:1`이다.
- 새 D 키는 `'u-' + slug(en)`이다.
- 카드 문구:
  - `d`·`x`: 해요체. `x`는 2~3문장이고, 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
  - `p`: "~해줘" 지시문에 정식 용어를 넣는다.
  - `l`: 1~3. `ko`: `한글 · 풀이`.
- `r`: 1~3개. 이미 있는 같은 뜻·짝 카드만 단다(앞 Task 카드 포함, 뒤 Task 카드 금지). 이름만 같고 뜻이 다른 카드(bug의 Side Effect, plan의 Scope, design의 Instance, bug의 Memory Leak Bug)는 달지 않는다.
- `o:1`: MDN 같은 1차 출처를 직접 열어 확인했을 때만 쓴다. 그때 `u`(`MDN('…')` 도우미)를 단다. 확인한 출처는 원장에 적는다.
- 그림 속 숫자·이름은 예시다(가짜 이름 `민지`, `장보기 앱` 등). D 묶음 주석에 "예시"라고 적는다.
- 코드 한 줄은 28자 이하(`ide` 한도), 코드는 8줄 이하다.
- 상태는 색만으로 나누지 않는다(기호 + 글자).
- 커밋은 한국어 `feat:`/`fix:`로 쓰고 attribution 줄을 넣지 않는다. `.impeccable/hook.cache.json`은 스테이징하지 않는다(`git add -A`·`-a` 금지).
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필·저장된 로그인은 쓰지 않고, `state save` 파일도 만들지 않는다.

## Review Focus

1. **긴 코드 줄과 좁은 그림판**: 28자 줄, 8줄 코드, 변수 4개를 320px에서 그려도 가로 넘침이 없어야 한다. 360px 이하에서는 출력·변수 칸이 아래로 쌓여야 한다. → Task 1 브라우저 확인(직접 넣어 보기), Task 12 break-ui
2. **멈춘 장면**: reduced-motion이거나 화면 밖이면 마지막 단계만 보여야 한다. 중간 단계의 강조 줄이나 판이 남으면 안 된다. → Task 1 `cdframe`
3. **직접 조작의 끝 경우**: 같은 버튼을 두 번 누르거나 Tab·Enter·Space로 조작해도 오류 없이 같은 문장이 나와야 한다. 결과는 결정적이어야 한다(`Math.random`·실제 `setTimeout` 순서에 기대지 않음). → Task 3·6·9 브라우저 확인
4. **화면 낭독기**: `ide`는 단계 요약("2단계: 3번째 줄, 출력 …")을 읽어야 하고, `mem`은 "count → 상자 A", "치울 대상: 상자 B"를 읽어야 한다. 기호(`→`, `●`)만 읽히면 안 된다. → Task 1 `base`
5. **헷갈리기 쉬운 사실**: Promise·Event Loop·Closure·Truthy·Falsy의 설명과 그림이 MDN과 달라 틀리면 안 된다. 예: `await`는 async 함수 안에서만 기다리고, 이벤트 루프는 호출 스택이 빈 뒤에 다음 작업을 넣는다. → Task 3·4·6 출처 확인, 디렉터 검토 ③

---

## 공통 절차 (Task 2~7, 새 카드)

1. **실패하는 점검 추가**(`tests/check.mjs`)
   - `EXPECT['basics/<sec>']`에 그 Task의 영문명 전부(기존 카드 포함)
   - `COUNT['basics/<sec>']`
   - `total` 기대값을 그 Task 표의 누계로
   - 직접 조작 카드가 있으면 `BDM`에 버튼 이름
2. **실패 확인**: `node tests/check.mjs` → `FAIL expect:basics/<sec>`, `FAIL total`
3. **사실 확인**: 카드마다 MDN(또는 공식 문서)을 열어 정의를 확인하고, 원장에 `Task N 출처: <en> — <URL>`을 적는다. 확인하지 못한 카드는 `o:0`이고 "흔히"로 쓴다.
4. **데이터**: 그 하위항목 `T('basics','<sec>',[…])` 끝에 표 순서대로 넣는다. 모든 새 카드에 `x`를 넣는다.
5. **그림**: `/* basics: <sec> — 출처 확인: … 예시: … */` 주석 + `Object.assign(D, {...})`를 `const visual` 바로 앞(앞 Task 묶음 뒤)에 둔다.
   - 무엇으로 그릴지:
     - 코드가 실행되는 말: `ide`
     - 메모리·참조: `mem`
     - 명령: `term`
     - 순서: `flow`
     - 두 칸 비교: `.mk-two` 또는 `cmp`(나쁜 예·좋은 예)
     - 기기·화면: `browser`/`app`
6. **점검 통과**: `node tests/check.mjs` → `OK <수>`. `LATER font`·`LATER doccount`·`LATER bx`는 정상이다(Task 10·12에서 비움).
7. **브라우저 확인**(아래 절차)
8. **커밋**: `git add index.html tests/check.mjs && git commit -m "feat: 개발 기본 <하위항목> 새 카드"`(원장 갱신을 같은 호출에서)

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/basics/<sec>`
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**
  - 페이지: `document.documentElement.scrollWidth <= innerWidth` → `true`
  - 그림 안: `[...document.querySelectorAll('#view .mk-cd, #view .mk-mr, #view .mk-term, #view .mk-fw')].filter(s => s.scrollWidth > s.clientWidth + 1)` → `[]`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900, 375×812, 320×700에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)
- **reduced-motion**: `browser_emulate_media({reducedMotion:'reduce'})` 뒤 새로고침. 자동 재생이 없고, 재생 버튼이 동작해야 한다.

### 디렉터 검토 ③ 시점

같은 디렉터 에이전트(Opus 5.5, effort high)에게 SendMessage로 맡긴다. 압축 뒤라 ID를 모르면 새로 띄운다.
- **묶음 A — 도우미**: Task 1 뒤
- **묶음 B — 새 카드**: Task 7 뒤(Task 2~7 diff)
- **묶음 C — 그림·문구**: Task 10 뒤(Task 8~10 diff)
- **최종**: Task 12 뒤, 브랜치 전체

결과 처리:
- Critical·Important는 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN). 원장에 `Review <묶음>: fixed …`로 적는다.
- Minor는 `Review <묶음>: minor (deferred): …`로 적고 마지막에 보고한다.

---

### Task 1: 기반 (principle 하위항목, `ide()`·`mem()`, 점검 확장, 한글명 2곳)

**쓸 스킬:** frontend-design:frontend-design, animate, interfaces:better-accessibility, interfaces:better-layout

**Files:**
- Modify `index.html`
  - 1626줄 `CAT('basics', …)`
  - CSS: `.mk-mt` 규칙 뒤
  - 도우미: `flow` 끝(3634줄 근처) 뒤, `/* 직접 조작 도우미 … */` 앞
  - `.fig:has(…)` 규칙 목록
  - 기존 카드 Code Editor·npm의 `ko`
- Modify `tests/check.mjs`

**Interfaces:**
- Consumes: `esc`, `.sr`, `.mk-hl`, `MDN()`, `tpick`, `psay`, `.mk-mobox`, `.mk-hint`
- Produces:
  - **카테고리**: `CAT('basics','개발 기본','개발을 처음 시작할 때 듣는 가장 기본적인 말', [['code','코드 읽기 기초','코드를 볼 때 알아야 하는 문법 이름'], ['principle','좋은 코드 원칙','읽기 쉽고 고치기 쉬운 코드를 위한 약속']])`. secs id 순서: `basic, core, motion, adv, code, principle, tip`.
  - **`ide(code, steps, opt = {}) -> string`**
    - `code`: 줄 배열(1~8줄, 줄마다 28자 이하). 넘으면 `throw new Error('ide: 코드는 1~8줄')` / `'ide: 한 줄은 28자까지'`.
    - `steps[i] = {l, out = [], vars = {}}`
      - `l`: 강조 줄(1부터)
      - `out`: 그 시점까지의 출력 줄(0~3)
      - `vars`: 그 시점의 변수(0~4개, 값은 글자)
      - 단계는 1~8개. 아니면 `'ide: 단계는 1~8개'`. `l`이 범위 밖이면 `'ide: 줄 번호 ' + l`. 출력 4줄 이상이면 `'ide: 출력은 3줄까지'`, 변수 5개 이상이면 `'ide: 변수는 4개까지'`.
    - `opt`: `{title = 'app.js', still = false, label}`. `label`이 있으면 루트에 `role="group"`·`aria-label`.
    - 구조:
      ```
      <div class="mk-cd"><div class="mk-cdt">{title}</div><div class="mk-cdg">
        <ol class="mk-cdc">{줄마다 <li><code>{esc}</code></li>}</ol>
        <div class="mk-cdp">{단계마다 판}</div>
      </div><p class="sr">{요약}</p></div>
      ```
      - 판: `<div class="mk-cds[ mk-cdy{k}|mk-cdz{k} A]" style="--l:{l}">`이고 안에 강조 띠 `<i class="mk-cdh" aria-hidden="true"></i>` + 출력 칸 `<div class="mk-cdo"><b>출력</b>{줄}</div>` + 변수 칸 `<div class="mk-cdv"><b>변수</b>{이름 = 값}</div>`이 들어간다.
      - 마지막 단계는 `mk-cdz{k}`, 나머지는 `mk-cdy{k}`다. `still`이면 마지막 판 하나만 그리고 `A`를 붙이지 않는다.
      - 요약은 단계마다 `{k}단계: {l}번째 줄` + (출력이 있으면 `, 출력 {마지막 줄}`)을 `. `로 잇는다. 판은 `aria-hidden="true"`다.
    - CSS
      - 강조 띠: `--l`로 위치를 잡는다(`top: calc((var(--l) - 1) * 줄 높이)`). 판들은 같은 grid 칸(`grid-area:1/1`)에 겹친다.
      - `.mk-cds.A{opacity:0;animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}`
      - 컨테이너: `.mk-cd{container:cd/inline-size}`. `@container cd (max-width:360px)`에서 코드 칸 아래에 판을 쌓는다. 이때 강조 띠는 코드 칸 쪽에 남아야 하므로, 띠는 `.mk-cdc` 위에 절대 위치로 둔다. 판의 출력·변수만 아래로 내린다. 방법은 구현이 정한다.
      - 코드는 `--mono`, 줄 번호는 `ol` 숫자를 쓴다. `white-space:pre`이고 줄바꿈하지 않는다(28자 한도가 넘침을 막는다).
    - 키프레임(k = 1~8, s = 10k):
      - `@keyframes mk-cdy{k}{0%,{s-0.1}%{opacity:0}{s}%,{s+9.9}%{opacity:1}{s+10}%,100%{opacity:0}}`
      - `@keyframes mk-cdz{k}{0%,{s-0.1}%{opacity:0}{s}%,100%{opacity:1}}`
      - 88%에서는 마지막 판만 보인다(마지막 판이 k = 8이면 80%부터).
  - **`mem(scenes, opt = {}) -> string`**
    - `scenes[i] = {stack:[{n, v} | {n, to}], heap:[{id, v, gc}]}`. 장면은 1~4개(`'mem: 장면은 1~4개'`).
      - 스택 1~4개(`'mem: 이름표는 1~4개'`), 힙 0~5개(`'mem: 상자는 5개까지'`)
      - `to`가 그 장면 힙에 없는 `id`면 `'mem: 없는 상자 ' + to`
    - `opt`: `{still = false, label}`
    - 구조
      ```
      <div class="mk-mr"><div class="mk-mrp">
        {장면마다 <div class="mk-mrs[ mk-cdy{k}|mk-cdz{k} A]" aria-hidden="true">
          <div class="mk-mrk"><b>스택</b>{이름표}</div>
          <div class="mk-mrh"><b>힙</b>{상자}</div>
        </div>}
      </div><p class="sr">{요약}</p></div>
      ```
      - 키프레임은 `ide`와 같은 `mk-cdy`/`mk-cdz`를 쓴다.
      - 이름표: `<span class="mk-mrn">{n} = {v}</span>` 또는 `<span class="mk-mrn">{n} → {to}</span>`
      - 상자: `<span class="mk-mrb[ gc]"><i>{id}</i>{v}</span>`. `gc`는 점선 테두리 + 흐린 글자 + `치울 대상` 글자다(색만으로 나누지 않음).
      - 요약은 마지막 장면만 쓴다. `n = v` / `n → 상자 id` / `치울 대상: 상자 id`를 `, `로 잇는다.
    - CSS: `.mk-mr{container:mr/inline-size}`. `@container mr (max-width:360px)`에서 스택 칸 아래에 힙 칸을 쌓는다.
  - **`.fig:has(…)`**: `.mk-dc,.mk-fw`가 든 목록마다 `.mk-cd,.mk-mr`를 더한다.
  - **한글명**
    - Code Editor `ko`: `코드 에디터 · 코드 편집기`
    - npm `ko`: `엔피엠 · 자바스크립트 패키지 도구`
  - **check.mjs**
    - `BOBJ`: 기존 개발 기본 53장 영문명 배열
    - `BDM = {}`: 영문명 → 그림 `h`에 있어야 할 글자. Task 3·6·9가 채운다.
    - `LATER = ['font', 'doccount', 'bx']`

- [ ] **Step 1: 실패하는 점검 추가**(check.mjs)
  - `bcat`: basics secs id가 `['basic','core','motion','adv','code','principle','tip']`다.
  - `bobj`: basics 카드 중 `typeof t.v === 'object'`인 영문명 집합이 `BOBJ` 집합과 같다(새 카드가 옛 형식이면 실패, 다시 그린 카드를 BOBJ에서 안 빼도 실패).
  - `bx`: basics 카드 중 `x`가 없는 영문명 목록이 빈다(LATER).
  - `bm`: basics 카드 그림에 `m`이 있으면 `h`에 `/ A["\s]/`가 있다(`mm`과 같다).
  - `bdm`: `PDM`과 같은 방식으로 `BDM`을 확인한다.
  - `bko`: Code Editor·npm의 `ko`에 `IDE`·`패키지 관리자`가 없다.
  - `base`에 더할 것
    - `const cd = ide(['let n = 1;', 'n = n + 1;', 'console.log(n);'], [{l:1, vars:{n:'1'}}, {l:2, vars:{n:'2'}}, {l:3, out:['2'], vars:{n:'2'}}], {title:'a.js', label:'코드'})`
      - 들어 있어야 할 것: `mk-cd`, `role="group"`, `aria-label="코드"`, `a.js`, `let n = 1;`, `mk-cdy1 A`, `mk-cdy2 A`, `mk-cdz3 A`, `--l:3`, `3단계: 3번째 줄, 출력 2`, `n = 2`
      - `/class="mk-cds/g`가 3번이다.
    - `ide(['<b>&'], [{l:1}])`에 `<b>&`가 없고 `&lt;b&gt;&amp;`가 있다.
    - `ide(['a','b'], [{l:1},{l:2}], {still:true})`
      - `mk-cds`가 1번이고 ` A"`가 없다.
      - `--l:2`가 있다.
    - throw: 코드 0줄, 9줄, 29자 줄, 단계 0개, 9개, `{l:4}`(3줄 코드), 출력 4줄, 변수 5개
    - `const mr = mem([{stack:[{n:'a', to:'A'}, {n:'b', to:'A'}], heap:[{id:'A', v:'[1, 2]'}]}, {stack:[{n:'a', to:'B'}], heap:[{id:'A', v:'[1, 2]', gc:true}, {id:'B', v:'[1, 2, 3]'}]}], {label:'메모리'})`
      - 들어 있어야 할 것: `mk-mr`, `aria-label="메모리"`, `a → A`, `b → A`, `mk-cdy1 A`, `mk-cdz2 A`, `치울 대상`, 요약 `a → 상자 B, 치울 대상: 상자 A`
    - throw: 장면 0개, 5개, 스택 0개, 스택 5개, 힙 6개, `{n:'a', to:'Z'}`
  - `cdframe`
    - `/\.mk-cds\.A\{[^}]*animation-delay:-([\d.]+)s/`에서 멈춘 지점 P(%)를 읽는다.
    - k = 1~8마다 `mk-cdz{k}`가 나타나는 % ≤ P인지 본다.
    - k = 1~7마다 `mk-cdy{k}`가 사라지는 % ≤ P인지 본다.
    - `.mk-mrs.A`도 같은 지연인지 본다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → 다음이 실패해야 한다.
  - `FAIL bcat`, `FAIL bko`, `FAIL cdframe`
  - `FAIL base: … ide is not defined`
  - `bobj`는 이미 통과해야 한다(53장 그대로).
- [ ] **Step 3: 구현**: Interfaces대로 `CAT`, `ide`, `mem`, CSS, 키프레임, 한글명을 만든다. 강조 띠·`gc` 테두리의 대비(그래픽 3:1, 글자 4.5:1)를 better-colors 방식으로 재고 커밋 본문에 적는다.
- [ ] **Step 4: 점검 통과**: `OK <수>`, `LATER bx: …`(53장 중 49장 이름)
- [ ] **Step 5: 브라우저 확인**
  - 임시 카드 없이, 개발자 도구 콘솔에서 아래를 그려 본다.
    - `ide()`: 8줄·28자 줄·변수 4개
    - `mem()`: 장면 4개·힙 5개
  - 그린 결과를 `#view`의 첫 `.fig .stage` innerHTML에 넣고 1280/375/320에서 넘침을 확인한다.
  - 360px 이하에서 출력·변수 칸이 아래로 쌓이는지, reduced-motion에서 마지막 단계만 보이는지 확인한다.
  - `#/c/basics/principle`이 "아직 용어가 없어요"로 뜬다.
- [ ] **Step 6: 커밋**: `feat: 개발 기본 principle 하위항목과 ide·mem 도우미`
- [ ] **Step 7: 디렉터 검토 ③ 묶음 A**

### Task 2~7: 새 카드 (공통 절차)

| Task | sec | 새 카드(표 순서대로 넣음) | COUNT | total |
|---|---|---|---|---|
| 2 | basic | Software, Operating System, Bit·Byte, Script | 12 | 1337 |
| 2 | core | IDE, Linter, Formatter, Package Manager, Snippet | 13 | ↑ |
| 3 | motion | Interpreter, Runtime, Promise, Async/Await▶, Event Loop, Thread, Garbage Collection | 15 | 1344 |
| 4 | code | Syntax, Operator, Expression, Method, Property, Module, Import | 20 | 1351 |
| 5 | code | Indentation, Arrow Function, Key-Value, Truthy·Falsy, Template Literal, Variable Scope | 26 | 1357 |
| 6 | adv | OOP, Abstraction, Encapsulation, Inheritance, Interface, Functional Programming, Pure Function, Immutability▶, Closure, Higher-order Function, Stack vs Heap | 19 | 1368 |
| 7 | principle | DRY, KISS, YAGNI, Separation of Concerns, Single Responsibility, Coupling·Cohesion, Naming Convention, Magic Number, Code Smell, Clean Code | 10 | 1378 |

Task별 정해 둔 것:

- **Task 2**
  - `r`: IDE→`Code Editor`, Package Manager→`npm`·`Package`, Script→`JavaScript`
  - `ALIAS`에 더하고 점검: `'IDE': 'basics-ide'`, `'패키지 관리자': 'basics-package-manager'`. 검색 상위 5개 안에 그 카드가 있어야 한다.
  - x 짝: IDE vs Code Editor, Package Manager vs npm
- **Task 3**
  - `r`: Promise·Async/Await→`Asynchronous`·`Callback`, Thread→`Main Thread`, Garbage Collection→`Memory Leak`(perf), Runtime→`Run`, Interpreter→`Compile`
  - **Async/Await▶**
    - `tpick(['await 있음', 'await 없음'], 'await 있음')`과 `ide` still, `.mk-hint`(`psay`)로 만든다.
    - 상태 표 `BAWAIT = {'await 있음': {code, steps, say}, 'await 없음': {…}}`
    - 코드 예(28자 이하): `async function load() {` / `  const d = await get();` / `  console.log(d);` / `}`
    - 결과: 있음 → 출력 `데이터`, 없음 → 출력 `Promise {<pending>}`
    - `BDM['Async/Await'] = ['await 있음', 'await 없음', 'aria-pressed']`
  - Event Loop는 `ide` 출력 순서로 그린다. 예: `setTimeout(…, 0)`이 동기 `console.log` 뒤에 찍힌다(MDN 확인).
- **Task 4·5**
  - `r`: Method→`Function`·`Object`, Property→`Object`, Module→`Package`, Import→`Module`(Task 4 안에서 Module 다음), Variable Scope→`Variable`
  - x 짝: Method vs Function, Property vs Variable, Module vs Package, Expression vs 문장(statement), Variable Scope vs plan의 Scope(r 금지)
- **Task 6**
  - `r`: Interface→`API`, Closure→`Variable Scope`·`Function`, Pure Function→`Function`, Stack vs Heap→`Garbage Collection`, Inheritance→`Class`
  - x 짝: Pure Function의 부수 효과 vs bug의 Side Effect(r 금지), Interface vs API vs UI, Class·Instance vs design의 Instance(r 금지)
  - **Immutability▶**
    - `tpick(['복사 후 수정', '직접 수정'], '복사 후 수정')`과 `mem` still로 만든다.
    - 직접 수정 → `a`·`b`가 같은 상자 A를 가리키고 A 값이 바뀐다.
    - 복사 후 수정 → `b`가 새 상자 B를 가리키고 A는 그대로다.
    - `BDM['Immutability'] = ['복사 후 수정', '직접 수정', 'aria-pressed']`
- **Task 7**
  - `r`: Magic Number→`Hardcoding`·`Constant`, DRY→`Function`, Code Smell→`Refactoring`, Clean Code→`Readability`, Coupling·Cohesion→`Module`
  - 그림은 대부분 `cmp`(나쁜 예 코드 ↔ 좋은 예 코드)다. 좋은 예·나쁜 예 칸 안의 코드도 28자 이하다.
- Task 7 뒤 **디렉터 검토 ③ 묶음 B**

### Task 8: 글자상자 23장 다시 그리기

**쓸 스킬:** frontend-design:frontend-design, animate

**Files:** Modify `index.html`(23장 `v`, `/* basics: redraw … */` D 묶음), `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**
  - `REDRAWN`에 `'basics/basic','basics/core','basics/motion','basics/adv','basics/code','basics/tip'`을 더한다.
  - `BOBJ`에서 아래 23장을 뺀다.
- [ ] **Step 2: 실패 확인**: `FAIL redrawn:basics/…`(23장 이름), `FAIL bobj`
- [ ] **Step 3: 그림**: 스펙 3.3 표대로 23장의 `v`를 `'u-<slug>'`로 바꾼다.
  - 다시 그릴 23장(측정: 지금 `v`가 `flow`·`big`·`stack`인 카드): Programming Language, Library, Framework, MVP, Legacy Code, Frontend, Backend, Full Stack, Callback, Return, Class, Debugging, Package, Open Source, Build, Run, Algorithm, Technical Debt, Rubber Duck Debugging, Semantic Versioning, Big-O, Compile, Design Pattern
  - `vs` 또는 `doc`로 정할 4장: Programming Language·Legacy Code는 `vs`(같은 일을 다른 말/옛 코드와 새 코드), Design Pattern·Open Source는 `doc`(패턴 이름·라이선스 문서 모양)
  - Big-O: 걸음 수 막대 3개(`O(1)`·`O(n)`·`O(n²)`, n = 8 예시). `tb` 또는 `.mk-two`로 그리고 "예시" 글자를 단다.
  - Class: `pair(ide(...), mem(...))`. `pair`가 좁은 화면에서 세로로 쌓이는지 확인한다.
- [ ] **Step 4: 점검 통과**: `OK <수>`
- [ ] **Step 5: 브라우저 확인**: basics 6개 하위항목(principle 제외)
- [ ] **Step 6: 커밋**: `feat: 개발 기본 글자상자 그림 23장 다시 그림`

### Task 9: 코드 칸 그림 5장 + 직접 조작 2장

**Files:** Modify `index.html`, `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**
  - `BOBJ`에서 Variable·Function·Conditional·Loop·Object를 뺀다(25장 남음).
  - `BDM`에 더한다.
    - `'Loop': ['1번', '3번', '5번', 'aria-pressed']`
    - `'Conditional': ['age = 15', 'age = 20', 'aria-pressed']`
- [ ] **Step 2: 실패 확인**: `FAIL bobj`, `FAIL bdm`
- [ ] **Step 3: 그림**
  - Variable·Function은 `ide`다. 기존 `v.code`의 코드를 그대로 쓰고 단계를 더한다.
  - Object는 `mem` 참조로 그린다.
  - **Loop▶**: `for (let i = 0; i < N; i++)` 코드다. 고른 횟수만큼 `console.log(i)` 출력이 쌓인다. 출력은 3줄 한도라 5번이면 `…`, `3`, `4` 세 줄을 보이고, `say`가 "5번 돌았어요. 0부터 4까지 찍혀요"라고 알린다.
  - **Conditional▶**: `if (age >= 18)`이다. 15이면 `else` 줄이 강조되고 출력 `청소년`, 20이면 `if` 줄이 강조되고 출력 `성인`이다.
  - 두 카드 모두 `tpick` + `ide` still + `.mk-hint`(`psay`)로 만든다.
- [ ] **Step 4: 점검 통과**, **Step 5: 브라우저 확인**(Tab·Enter·Space, 같은 버튼 두 번), **Step 6: 커밋** `feat: 개발 기본 코드 그림 5장과 직접 조작`

### Task 10: x 49장 채움 + 기존 그림 25장 점검

**쓸 스킬:** design-skills:ux-writing

- [ ] **Step 1**: `LATER`에서 `'bx'`를 뺀다 → `FAIL bx`(49장)
- [ ] **Step 2**: 49장에 `x`를 넣는다. 해요체 2~3문장이고, 짝이 있으면 차이를 먼저 쓴다. 기존 `d`는 바꾸지 않는다. 사실 문장은 출처를 확인하고 원장에 적는다.
  - 짝 예: Library vs Framework, Compile vs Build, Bug vs Error Message, Frontend vs Backend, Variable vs Constant, Parameter vs Argument, Array vs Object, Hardcoding vs Magic Number
- [ ] **Step 3**: `OK <수>`
- [ ] **Step 4**: 기존 그림 25장(BOBJ)을 브라우저 3폭에서 확인한다. 넘침·11px 미만만 고친다.
- [ ] **Step 5: 커밋**: `feat: 개발 기본 헷갈림 칸 49장 채움`
- [ ] **Step 6: 디렉터 검토 ③ 묶음 C**

### Task 11: 증상 색인 12개

- [ ] **Step 1: 실패하는 점검**: `symcount` 기대값 145 → 157
- [ ] **Step 2: 실패 확인**: `FAIL symcount`
- [ ] **Step 3: 데이터**
  - 스펙 6장 12개를 넣는다. 묶음은 기존 `SYM` 묶음(3297줄)에서 고른다(대부분 `오류·안 됨`).
  - 넣기 전에 기존 증상 문구와 겹치는지 찾는다(`grep`). 겹치면 그 증상의 연결 카드에 새 카드를 더하고, 대신 같은 수의 새 증상을 넣는다. 원장에 Ruling으로 적는다.
  - 증상 대상은 모두 있는 영문명이어야 한다(`ref`).
- [ ] **Step 4**: `OK <수>`
- [ ] **Step 5: 커밋**: `feat: 개발 기본 증상 12개`

### Task 12: 마무리 (글꼴, 문서, 전체 점검)

**쓸 스킬:** impeccable(audit), break-ui, design-skills:accessibility-audit

**Files:** Modify `index.html`(FONT 블록), `tests/check.mjs`, `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`

- [ ] **Step 1: 글꼴 원본 확인**: `C:\Users\HELLOW~1\AppData\Local\Temp\claude\C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide\f8728c73-6f40-4446-afd9-00c24a2f3dc2\scratchpad\`에 `font_subset.py`와 `fontsrc\`가 있다(측정: 계획 작성 시점). 없으면 사용자에게 묻고 멈춘다.
- [ ] **Step 2: 실패 확인**: `LATER = []` → `FAIL font`(새 글자가 있을 때), `FAIL doccount`
- [ ] **Step 3: 서브셋**: `python -E -P font_subset.py index.html <Hahmlet.ttf> <작업 폴더>`
- [ ] **Step 4: 문서**
  - PRODUCT.md 31줄: 용어 1378개, 개발 기본 7개·103개를 표기에 더한다, 증상 색인 157개
  - docs/PLAN.md: ③ 개발 기본 완료 표시, "오류·안 됨" 칩 수를 실제 수로 고친다
  - DESIGN.md: `flow()` 규칙 뒤에 `ide()`·`mem()` 규칙을 적는다(한도, 단계 키프레임 `mk-cdy`/`mk-cdz`, 360px 쌓기, `still`·`label`, 요약 `.sr`, 화살표는 글자)
- [ ] **Step 5: 점검 통과**: `OK <수>`(LATER 없음)
- [ ] **Step 6: 전체 브라우저 확인**
  - basics 7개 하위항목 전체를 1280/375/320과 reduced-motion에서 본다. 직접 조작 4장은 키보드로 조작한다.
  - 홈·검색("IDE", "패키지 관리자")·증상 화면도 콘솔 오류 0이어야 한다.
- [ ] **Step 7: 품질**
  - break-ui 입력: `ide()` 8줄·28자 줄·변수 4개, `mem()` 장면 4·힙 5
  - impeccable audit
  - 이번 범위 문제만 고친다.
- [ ] **Step 8: 커밋**: `feat: 개발 기본 글꼴·문서 갱신`
- [ ] **Step 9: 디렉터 최종 검토** → 반영 → 원장 Ruling·deferred minor 보고 → superpowers:finishing-a-development-branch(main 병합은 사용자 확인 뒤)
