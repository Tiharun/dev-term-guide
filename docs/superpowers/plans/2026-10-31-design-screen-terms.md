# 디자인 화면 용어 확장 (A+B) 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 디자인 카테고리에 화면 하위항목 8개를 만들고 기존 9개를 보강한다. 새 용어 242개, 옮기는 카드 25개, 증상 26개를 넣고, 모든 새 카드를 화면 모형 그림으로 만든다.

**Architecture:** `index.html` 하나에서 작업한다. 데이터는 DATA 구간의 `CAT`/`T`/`SYM` 호출로 넣는다. 그림은 메인 IIFE의 `D` 프리셋에 `Object.assign(D, {...})`로 더한다. 직접 조작 데모는 프리셋의 `init(stage)`로 붙이고, 옮긴 카드의 옛 id는 `MOVED` 대응표로 이어 준다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(점검 스크립트), Python `http.server` + Playwright MCP(브라우저 확인), fonttools 4.66.1(글꼴 서브셋)

**Spec:** [docs/superpowers/specs/2026-10-31-design-screen-terms-design.md](../specs/2026-10-31-design-screen-terms-design.md)

**스펙과 다른 점(2가지):**
- 자동 점검(스펙 8장)은 브라우저 함수 대신 Node 스크립트 `tests/check.mjs`로 만든다. 브라우저 없이 반복해서 돌릴 수 있기 때문이다. 콘솔 오류 0은 Playwright 단계에서 확인한다.
- 원래 있던 영문 중복은 측정해 보니 component, dark mode, row, column, tag 5개다. 이 5개는 모두 허용한다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN을 쓰지 않는다.
- 색과 글꼴은 `:root` 변수(DESIGN.md "용어 도감")를 먼저 쓴다. 시각 스타일·색상을 설명하는 데 꼭 필요한 색만 그 그림 안에서 직접 쓴다.
- 그림 속 글자는 최소 11px이다. 모형을 실제 크기에 가깝게 그리고, 글자를 줄이지 않는다.
- 도판 틀(`.fig`)에는 그림자를 넣지 않는다. 모형 속 UI는 설명에 필요하면 그림자를 써도 된다(예: Elevation).
- 기본 easing은 `var(--ease)`다. 자동 애니메이션은 클래스 `A`와 기존 `--ps` 구조를 써서 재생 버튼·화면 밖 정지·동작 줄이기가 그대로 동작하게 한다.
- 새 D 키는 `'u-' + slug(en)`이다. 새 CSS 클래스와 키프레임 이름은 접두사 `mk-`를 붙인다.
- 카드 문구 규칙:
  - `d`는 해요체 한 줄로, 초보자 눈높이에 맞춘다.
  - `p`는 "~해줘" 지시문이고, 정식 용어를 넣는다.
  - `r`은 1개 이상의 기존 영문명이다.
  - `l`은 1~3이다.
  - `o:1`은 공식 문서를 직접 열어 확인한 경우에만 쓰고 `u`도 함께 단다. 확인하지 못하면 `o:0`으로 두고 `u`는 생략한다.
  - 현업 은어는 기존 누끼·컨펌 카드의 `j`/`jg` 방식을 따른다.
- 사이트 이름 같은 재사용 값은 `SITE`를 쓴다. 하드코딩하지 않는다.
- 브라우저 확인은 Playwright MCP로 한다. 평소 Chrome 프로필과 저장된 로그인 상태는 쓰지 않는다. `state save` 파일은 만들지 않는다.
- 작업 단위마다 커밋한다. 메시지는 한국어 `feat: …` / `docs: …` 형식이고 attribution 줄은 넣지 않는다.
- 디자인 스킬은 작업마다 "쓸 스킬"에 적힌 것을 쓴다. 설치되지 않은 스킬은 건너뛴다(메모리 design-skill-usage).

## Review Focus

1. **화면을 오갈 때마다 리스너가 쌓임**: `init`이 window/document에 리스너를 붙이면 같은 하위항목을 다시 열 때마다 두 번 반응한다. 규칙: `init`은 stage 안 요소에만 리스너를 붙이고, 드래그는 `setPointerCapture`를 쓴다. Task 1 점검에서 init 소스에 `window`·`document`가 있으면 실패로 처리한다.
2. **포인터를 그림 밖에서 놓거나 취소됨**: `pointercancel`이나 `lostpointercapture`가 생겨도 요소가 중간에 멈추면 안 된다. 원위치로 돌아가거나 완료되어야 한다. 드래그 데모가 있는 Task 3·8에서 브라우저로 확인한다.
3. **옛 id와 새 id가 둘 다 저장된 상태**: 변환한 뒤에는 새 id 하나만 남아야 한다. Task 2 `migrateIds` 시험으로 확인한다.
4. **저장소가 비었거나 JSON이 깨짐**: 오류 없이 빈 상태로 시작해야 한다. `store.get`이 이미 이 경우를 처리하고, Task 2에서 빈 Set 시험을 한다.
5. **옮긴 카드를 검색함**: 검색 결과는 새 위치(`#/t/design-…`)로 연결되어야 한다. Task 3·4·5·10의 브라우저 확인에서 검색해 본다.

---

## 공통 절차 (Task 3~19에 적용)

모든 섹션 작업은 아래 순서로 진행한다. 각 Task에는 이 절차와 다른 값만 적는다.

1. **실패하는 점검 추가**: `tests/check.mjs`에 다음을 넣는다.
   - `EXPECT[sec]`: 스펙 5장의 영문명 그대로 + 옮긴 카드
   - `COUNT[sec]`: 그 하위항목의 카드 수
   - 해당하면 `REDRAWN`에 sec를 추가한다.
2. **실패 확인**: `node tests/check.mjs`를 실행해 `FAIL expect:<sec>`이 나오는지 본다.
3. **데이터 작업**:
   - 그 하위항목의 `T('design','<sec>',[...])` 묶음에 카드를 넣는다. 새 하위항목이면 묶음을 새로 만들어, 직전 하위항목 묶음 바로 뒤에 둔다.
   - 카드 순서는 옮긴 카드(스펙 표 순서)를 먼저, 그다음 새 용어(스펙 순서)다.
   - 옮긴 카드는 원래 `T()` 묶음에서 객체째 잘라 옮긴다. 다른 카테고리에서 온 카드는 `MOVED`에도 추가한다.
4. **그림 작업**:
   - IIFE의 `D` 정의(`const D = {…};`) 뒤에 `/* design: <sec> */` 주석과 함께 `Object.assign(D, {...})` 블록을 둔다.
   - 새 용어의 `v`는 `'u-'+slug(en)`이고, 프리셋은 `{h, lab, m, cap}` 형식이다.
     - `lab`: 핵심 부분을 가리키는 이름표 1~3개
     - `cap`: 한 문장
     - `m`: 저절로 움직이면 1
   - 화면 모형은 Task 2의 `phone()`·`browser()`, 비유 일러스트는 `pair()`로 만든다.
5. **직접 조작**(목록에 있는 카드만): 프리셋에 `init(stage)`를 단다.
   - 포인터 이벤트(`pointerdown/move/up/cancel`)를 쓰고, 끄는 대상에는 `touch-action`을 지정한다.
   - 키보드로도 똑같이 조작할 수 있어야 한다. 조작 대상은 `button`이나 `tabindex=0`이고 `aria-label`을 단다.
   - 안내 한 줄 `.mk-hint`를 넣는다(예: "가로로 끌어 보세요 (키보드 ← →)").
   - 직접 조작만 있는 그림은 `m:0`이다.
   - 요소를 새로 만들 때는 `stage.insertAdjacentHTML`을 쓴다. `document`·`window`를 쓰지 않는다(Review Focus 1).
6. **점검 통과**: `node tests/check.mjs`를 실행해 `OK`가 나오는지 본다.
7. **브라우저 확인**(아래 "브라우저 확인 절차"):
   - 1280px와 375px 스크린샷
   - 가로 넘침 없음
   - 11px 미만 글자 0개
   - 콘솔 오류 0
   - 직접 조작 카드는 마우스와 키보드(Tab·Enter·Space·방향키)로 조작해 본다.
   - 터치는 `browser_evaluate`로 조작 대상에 `pointerType:'touch'`인 PointerEvent(down → move → up)를 보내서, 마우스와 결과가 같은지 확인한다.
8. **커밋**: `git add index.html tests/check.mjs` 후 `git commit -m "feat: 디자인 <하위항목 이름> …"`

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765`를 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: Playwright `browser_navigate` → `http://localhost:8765/index.html#/c/design/<sec>`
- **그림 모두 띄우기**(`browser_evaluate`):
  `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침 검사**: `document.documentElement.scrollWidth <= innerWidth` → `true`
- **작은 글자 검사**: 결과가 `[]`이어야 한다.
  `[...document.querySelectorAll('#view .fig .stage *')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 11).map(e => e.textContent.trim().slice(0, 20))`
- **화면 크기**: `browser_resize` 1280×900과 375×812에서 각각 `browser_take_screenshot`을 찍는다.
- **오류**: `browser_console_messages`에서 error 0개.

---

### Task 1: 점검 도구

**Files:**
- Create: `tests/check.mjs`

**Interfaces:**
- Produces: `node tests/check.mjs [파일]`. 기본 파일은 `index.html`이다. 실패마다 `FAIL <이름>: <내용>` 한 줄을 출력하고 exit 1, 모두 통과하면 `OK <점검 수>`를 출력하고 exit 0. 다음 작업들은 파일 위쪽의 `EXPECT`, `COUNT`, `REDRAWN`만 고친다.

- [ ] **Step 1: 하네스 작성**: index.html의 인라인 `<script>`를 Node vm에서 실행한다. 아래 코드는 측정으로 동작을 확인했다. TERMS, CATS, SYMPTOMS, D, byId, find, slug, visual에 접근할 수 있다.

```js
const unwrap = s => s.replace(/^\s*\(\(\) => \{\n/, '').replace(/\n\}\)\(\);\s*$/, '');
const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => unwrap(m[1]));
const any = new Proxy(function(){}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : any, apply: () => any, construct: () => any });
const ctx = vm.createContext({ document: any, window: any, location: { hash: '', search: '' },
  matchMedia: () => ({ matches: false, addEventListener(){} }), localStorage: { getItem: () => null, setItem(){} },
  IntersectionObserver: function(){ return { observe(){} }; }, navigator: any, addEventListener(){}, scrollTo(){}, setTimeout, clearTimeout, console });
scripts.forEach(s => vm.runInContext(s, ctx));
```

- [ ] **Step 2: 점검 항목 작성** (이름: 내용)
  - `v`: 모든 TERMS에 v가 있다. 문자열이면 `D[v]`가 존재한다.
  - `dup`: 영문명(소문자) 중복은 `ALLOW_DUP = ['component','dark mode','row','column','tag']`만 허용한다.
  - `ref`: 모든 `r`과 `SYMPTOMS[].t`가 `find()`로 찾아진다.
  - `moved`: `typeof MOVED === 'undefined'`이면 건너뛴다. 각 항목마다 새 id가 `byId`에 있고 옛 id는 없다.
  - `init`: init이 있는 D 항목은 function이고, `String(init)`에 `window`·`document`가 없다.
  - `expect:<sec>`: `EXPECT[sec]`의 각 영문명은 `find(en).c === 'design' && .s === sec`이다.
  - `count:<sec>`: 디자인 하위항목의 `terms.length === COUNT[sec]`이다.
  - `redrawn:<sec>`: 그 하위항목 용어의 v에 flow·big·stack 객체가 없다.
  - `sym`: `SYMPTOM_GROUPS.length === 8`이고, 모든 증상의 g가 그 안에 있다.

- [ ] **Step 3: 실행**: `node tests/check.mjs`의 기대 결과는 `OK`로 시작하는 한 줄이다. 현재 데이터는 측정상 모두 통과한다. `EXPECT`·`COUNT`·`REDRAWN`은 비어 있다.
- [ ] **Step 4: 일부러 깨 보기**: index.html 사본에서 아무 용어의 `r`을 `'없는용어'`로 바꾼 뒤 `node tests/check.mjs 사본`을 실행한다. `FAIL ref`와 exit 1이 나오는지 보고 사본은 지운다.
- [ ] **Step 5: 커밋**: `git add tests/check.mjs && git commit -m "test: 데이터 점검 스크립트 추가"`

### Task 2: 기반 (그림 틀, 직접 조작, 이름표 이어주기)

**쓸 스킬:** frontend-design, impeccable(shape), apple-design(휴대폰 틀 비율·안전 영역)

**Files:**
- Modify: `index.html`
  - DATA 구간 끝(`SYM` 앞): `MOVED`
  - CSS 그림판 구간(110~214줄 근처): `mk-` 스타일
  - IIFE의 store(1425~1430줄 근처), D 뒤(1526줄 근처), visual(1527줄), mount(1591줄), route(1671줄)
- Modify: `tests/check.mjs`

**Interfaces:**
- Produces:
  - `const MOVED = {}`: 데이터 스크립트의 전역 객체로, 옛 id → 새 id 대응을 담는다. 실제 항목은 Task 3·4·5·10에서 채운다.
  - `migrateIds(set: Set<string>, map: object) -> boolean`: set 안의 옛 id를 새 id로 바꾼다. 바뀐 게 있으면 true를 돌려준다.
  - `phone(body: string, {notch = true} = {}) -> string`: 가로 190px, 세로 280px 휴대폰 틀이다. 노치·홈 바를 그리고, `body`는 화면 안쪽에 들어간다. 루트 클래스는 `mk-phone`.
  - `browser(body: string, {url = 'example.com'} = {}) -> string`: 가로 300px, 세로 190px 브라우저 틀이다. 주소창과 점 3개를 그리고, 루트 클래스는 `mk-browser`.
  - `pair(art: string, mock: string) -> string`: 비유 SVG, 화살표, 화면 모형을 가로로 놓는다. 480px 미만에서는 세로로 쌓고, 루트 클래스는 `mk-pair`.
  - UI 조각 CSS 클래스: `mk-btn`(+`.ghost`), `mk-in`(입력칸), `mk-bar`(토스트·스낵바 띠), `mk-card`, `mk-hint`. 이후 작업에서 같은 접두사로 더 만든다.
  - `visual()`은 `{h, lab, m, cap, init}`을 돌려준다. `mount()`는 `st.innerHTML = h` 직후 `init && init(st)`를 실행한다.

- [ ] **Step 1: 실패하는 점검 추가**: check.mjs에 `base` 점검을 넣는다.
  - `migrateIds(new Set(['web-form','x']), {'web-form':'design-form'})` → true, 결과는 정확히 {'design-form','x'}
  - 옛 id와 새 id가 둘 다 있으면 결과는 {'design-form'} 하나
  - 같은 set을 두 번째로 호출하면 false
  - 빈 Set → false
  - `phone('a').includes('mk-phone')`, `browser('a').includes('mk-browser')`, `pair('a','b').includes('mk-pair')`
  - `typeof MOVED === 'object'`
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs`의 기대 결과는 `FAIL base: migrateIds is not defined`
- [ ] **Step 3: 구현**
  - `MOVED`와 `migrateIds`를 만든다.
  - `const pins = …, learned = …` 다음 줄에서 두 set마다 `if (migrateIds(set, MOVED)) store.set(키, set)`를 실행한다.
  - `route()` 첫 줄 다음에 `if (h[0] === 't' && MOVED[h[1]]) { location.replace('#/t/' + MOVED[h[1]]); return; }`를 넣는다.
  - `phone`, `browser`, `pair`와 `mk-` CSS를 만든다. 틀 색은 `--plate`, `--rule`, `--ink`다.
  - visual과 mount에서 init을 전달하고 실행한다.
- [ ] **Step 4: 점검 통과**: `node tests/check.mjs` → `OK`
- [ ] **Step 5: 브라우저 확인**: 아무 하위항목이나 열어 콘솔 오류 0을 확인한다. 새 그림이 아직 없으므로 스크린샷에 변화가 없어야 정상이다.
- [ ] **Step 6: 커밋**: `git commit -m "feat: 화면 모형 틀·직접 조작·옛 id 이어주기 기반"`

### Task 3~10: 새 하위항목 8개

**공통 사항:**
- 각 작업마다 `CAT('design', …)`의 extra 배열에 하위항목을 하나씩 넣는다. 'app' 뒤, 'tool' 앞에 아래 순서로 놓는다.
- 옮길 카드, 직접 조작 카드, 비유 일러스트 카드, `COUNT`는 표의 값을 따른다.
- 옮긴 카드의 그림은 그대로 둔다. 단, 비유 카드는 `u-` 프리셋을 새로 만든다. 이 프리셋은 기존 프리셋의 `h`를 `pair()`의 mock으로 쓰고, 카드 `v`를 그것으로 바꾼다.
- 표에 "다시 그림"이 있는 카드는 새로 그린다.
- 중복 연결(스펙 4.4)은 새 카드를 만들지 않고 `r`로 잇는다.
  - Inline Validation → `'Validation'`
  - Sortable Column → `'Sorting'`
  - Filter Panel → `'Filtering'`
  - Data Table → `'Virtual Scrolling'`
  - Task 16의 Team Library → `'Library'`

| Task | extra 항목 (id, 이름, 소개) | 옮길 카드 → MOVED | 직접 조작 | 비유 일러스트 | COUNT | 쓸 스킬 |
|---|---|---|---|---|---|---|
| 3 | `['form','폼·입력','정보를 입력하고 고르는 화면 부품']` | Checkbox, Radio Button, Toggle Switch, Dropdown / Form, Input Field, Placeholder → `web-form`, `web-input-field`, `web-placeholder` | Slider, Inline Validation, Quantity Stepper, Segmented Control, Password Toggle, Floating Label, OTP Input, Input Mask, Rating, Autocomplete, Dropzone | — | 28 | interaction-design, ux-writing, better-ui |
| 4 | `['feedback','상태·피드백','로딩·오류·완료처럼 지금 상태를 알려 주는 부품']` | Modal, Overlay, Toast, Tooltip, Skeleton UI / Empty State, Badge, Loading Spinner, Progress Bar, Loading State → `web-empty-state`, `web-badge`, `web-loading-spinner`, `web-progress-bar`, `back-loading-state` | Snackbar, Confirm Dialog, Popover, Optimistic UI, Destructive Action | Toast, Skeleton UI | 23 | interaction-design, better-writing, animate |
| 5 | `['nav','내비게이션','화면 사이를 오가게 해 주는 메뉴와 버튼']` | Tab, Hamburger Menu, Drawer / Breadcrumb, Pagination, GNB → `web-breadcrumb`, `web-pagination`, `web-gnb` (GNB는 공용 `page` 그림이라 다시 그림) | Mega Menu, Stepper, Skip Link | Breadcrumb, Hamburger Menu, Kebab Menu, Drawer | 20 | better-layout, design-critique |
| 6 | `['data','표·목록','많은 정보를 표·목록·차트로 보여 주는 방법']` | — | Sortable Column, Filter Panel, Bulk Action, Inline Edit, Expandable Row | Zebra Stripes | 21 | dataviz, better-layout |
| 7 | `['style','시각 스타일','화면 전체 느낌을 정하는 디자인 흐름과 효과']` | — | — (비교는 `cmp`) | Bento Grid | 21 | ui-ux-pro-max(스타일 자료), better-colors, design-elevation |
| 8 | `['gesture','제스처·조작','손가락·마우스·키보드로 화면을 다루는 방법']` | — | Haptic Feedback을 뺀 17개 전부 | Rubber Banding | 18 | apple-design, interaction-design, animate |
| 9 | `['device','기기 화면','휴대폰·모니터 화면 자체의 특징']` | — | Orientation, Text Scaling | — | 16 | apple-design, mobile-native |
| 10 | `['media','이미지·미디어','사진·동영상·움직이는 그림을 다루는 말']` | Carousel / Avatar → `web-avatar` | Crop, Lightbox, Video Player | Carousel, Masonry Layout, Watermark | 21 | better-ui, animate |

**작업별 추가 점검과 키보드 조작:**
- **Task 3**: Slider 드래그 중 포인터를 그림 밖에서 놓아도 값이 정상으로 남는지 브라우저에서 확인한다(Review Focus 2).
  - 키보드: Slider ←→, Stepper +/-, Rating ←→, OTP 숫자 입력 시 다음 칸으로 자동 이동
- **Task 3·4·5·10**: 브라우저 확인에 다음을 더한다.
  - `#/t/<옛 id>`로 열면 새 카드로 이동한다.
  - localStorage `devdict.pins`에 옛 id를 넣고 새로고침하면 새 id로 바뀐다.
  - 검색창에 옮긴 카드의 영문명을 넣으면 `#/t/design-…`로 연결된다(Review Focus 5).
- **Task 8**: 드래그·스와이프 카드 전부에서 `pointercancel`이 생기면 원위치로 돌아가야 한다.
  - 키보드: Swipe·Edge Swipe ←→, Pinch Zoom +/-, Pan 방향키, Drag to Reorder(Space로 잡고 ↑↓로 옮김), Swipe to Delete Delete 키, Pull to Refresh Enter
  - 다른 하위항목에 갔다 다시 와서 한 번 조작했을 때 한 번만 반응해야 한다(Review Focus 1).
- **Task 9**: 휴대폰 틀은 안전 영역·노치·홈 바가 보이도록 `phone()`을 쓴다. Physical vs CSS Pixel은 같은 크기 격자 두 개를 `cmp`로 비교한다.

**각 작업의 단계:** 위 "공통 절차" 1~8단계를 따르고, 커밋은 `feat: 디자인 <이름> 하위항목 추가`로 한다.

### Task 11~19: 기존 하위항목 9개 보강

공통 절차를 따른다. 새 용어는 각 묶음 끝에 붙인다. "다시 그릴 그림"은 글자 상자형 v를 `u-` 프리셋으로 바꾸고, 그 sec를 `REDRAWN`에 넣는다.

| Task | sec | 새 용어 (스펙 5.2) | 다시 그릴 그림 | 직접 조작 | COUNT | 쓸 스킬 |
|---|---|---|---|---|---|---|
| 11 | basic | 기본 7 | UX | — | 15 | design-critique |
| 12 | core | 필수 8 | Component | Primary·Secondary·Ghost·Icon Button(누름 상태) | 14 | better-ui, design-systems |
| 13 | motion | 모션 13 (`T('design','motion')`는 394줄과 1299줄 두 곳에 있음, 1299줄 묶음 끝에 붙임) | — | Magnetic Button, Tilt Effect, Collapse / Expand | 31 | animate, animation-vocabulary, review: emil-design-eng |
| 14 | adv | 심화 11 | Design System, Atomic Design | Fitts's Law(목표 크기·거리 바꿔 누르기), Hick's Law(선택지 수 바꾸기) | 20 | design-critique, ux-research |
| 15 | app | 앱·프로그램 UI 11 | — | Command Palette, Split Pane | 19 | interaction-design |
| 16 | tool | 디자인 툴 14 | Main Component, Instance, Handoff | Hug / Fill / Fixed, Boolean Operation | 23 | design-systems |
| 17 | font | 폰트 13 | Web Font | Variable Font(굵기 슬라이더) | 27 | better-typography |
| 18 | color | 색상 14 | HEX Code | Saturation, Brightness, Tint / Shade(슬라이더) | 24 | better-colors |
| 19 | tip | 추천 개념 8 (Layout Frame=와꾸, Dummy Data=가라 데이터는 현업 은어 표시) | Confirm, Fix | — | 16 | ux-writing |

- Task 12와 15의 COUNT는 Task 3~5·10에서 카드를 옮긴 뒤 기준이다(필수 6+8, 앱 8+11).
- 커밋은 `feat: 디자인 <이름> 보강`으로 한다.

### Task 20: 증상 색인 26개

**Files:** Modify `index.html`(`SYM('…')` 묶음 8개), `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**: check.mjs에 `symcount` 점검을 넣는다. `SYMPTOMS.length === 82`(기존 56 + 26)이고, 스펙 6장의 증상 문장 26개가 모두 `SYMPTOMS[].q`에 있어야 한다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL symcount`
- [ ] **Step 3: 구현**: 스펙 6장 표를 해당 묶음 `SYM()` 배열 끝에 `['증상', ['En', …]]` 형식으로 넣는다. 묶음은 새로 만들지 않는다.
- [ ] **Step 4: 점검 통과**: `node tests/check.mjs` → `OK`
- [ ] **Step 5: 브라우저 확인**: 증상 색인 화면에서 "Safe Area" 증상을 누르면 해당 카드로 이동하는지 본다. 칩 8개는 그대로여야 한다.
- [ ] **Step 6: 커밋**: `git commit -m "feat: 화면 용어 증상 색인 26개 추가"`

### Task 21: 마무리 (글꼴 서브셋, 문서, 전체 점검)

**쓸 스킬:** impeccable(audit), break-ui, design-skills:accessibility-audit, review-animations(설치돼 있지 않으면 improve-animations)

**Files:** Modify `index.html`(`/* FONT:START */`~`/* FONT:END */`), `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`, `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**: check.mjs에 다음을 넣는다.
  - `total`: `TERMS.length === 979`(737 + 242)
  - `webparts`: 웹 parts 하위항목이 8개
  - `font`: FONT 블록 밖의 모든 한글 글자가 내장 글꼴 cmap에 있어야 한다. base64 woff를 풀어 확인하는데, Node에서 woff를 파싱하기 어려우면 Step 3의 Python 스크립트 결과를 대신 쓴다.
- [ ] **Step 2: 글꼴 원본 준비**:
  - `C:\Users\HelloWorld\AppData\Local\Temp\claude\C--Users-HelloWorld--claude-spares-spare-NQtsCH\7087b18d-9970-4082-ac61-35bd93917b88\scratchpad\fontdl\Hahmlet.ttf`를 이 세션 scratchpad로 복사한다.
  - **파일이 없으면 GitHub(hyper-type/hahmlet)에서 받아도 되는지 사용자에게 묻고 멈춘다.**
- [ ] **Step 3: 서브셋 생성**
  - FONT 블록 밖 index.html의 고유 글자를 `chars.txt`로 만든다.
  - `pyftsubset Hahmlet.ttf --text-file=chars.txt --flavor=woff --output-file=hahmlet.woff`
  - 결과 cmap이 chars.txt의 한글을 모두 포함하는지 fontTools로 확인한다.
- [ ] **Step 4: 교체**: FONT 블록 안의 base64를 새 woff로 바꾼다. weight 범위 400~800은 그대로 둔다.
- [ ] **Step 5: 문서 갱신**
  - PRODUCT.md: 카테고리·용어 개수
  - docs/PLAN.md: ① 단계 완료 표시
  - DESIGN.md: 화면 모형 틀(`phone`·`browser`·`pair`), `mk-` 접두사, 그림 속 글자 11px 하한, 직접 조작 규칙
- [ ] **Step 6: 전체 점검**: `node tests/check.mjs` → `OK`
- [ ] **Step 7: 브라우저 확인**
  - 디자인 17개 하위항목 전체에서 공통 브라우저 확인을 한다.
  - `browser_emulate_media`로 reduced-motion을 켠다. 자동 재생이 없고, 재생 버튼이 동작하며, 직접 조작이 되는지 본다.
  - 홈·검색·증상 화면에서 콘솔 오류 0을 확인한다.
- [ ] **Step 8: 품질 점검**
  - impeccable audit와 break-ui(긴 글자·빈 값)를 돌려 나온 문제 중 이번 범위만 고친다.
  - 접근성 점검 결과 중 직접 조작 카드의 키보드·포커스 문제는 반드시 고친다.
- [ ] **Step 9: 커밋**: `git commit -m "feat: 글꼴 서브셋 갱신과 문서 개수 반영"`
