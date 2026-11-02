# 프론트엔드 카테고리 보강 실행 계획 ②

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 프론트엔드 보강을 끝낸다.
- react·build 새 카드 25장, basic·adv·layout·tip 새 카드 8장
- 기존 카드 x 채움(57장)과 1문장 x 고치기(10장), 남은 공유 그림 34장 점검
- 직접 조작 Key, 증상 12개
- 글꼴·문서·전체 점검으로 `LATER`를 비운다.

**Architecture:** 계획서 ①과 같다. `index.html` 하나에서 작업한다.
- 카드는 `T('front', …)` 블록에 넣는다. 새 블록 `T('front','react',…)`·`T('front','build',…)`는 `T('front','tip',…)` 앞에 둔다.
- 그림은 `const visual` 앞에 `/* front: <sec> … */` 주석 + `Object.assign(D, {...})`로 더한다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + 따로 띄운 headless Playwright(Python), fonttools(`font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-02-front-category-design.md](../specs/2026-11-02-front-category-design.md)

**계획서 ①에서 이어받는 것:**
- 브랜치 `front-category`, 원장 `.superpowers/sdd/2026-11-02-front-category-1/progress.md`(같은 원장에 `Plan2 Task N`으로 이어 쓴다)
- D 키 `'u-front-' + slug(en)`, 색 이름 토큰 넷(`--mark-text` 주황·`--ch1` 파랑·`--moss` 초록·`--ink` 남색. 디렉터 C 지적으로 대비 4.5:1 넘는 것만)
- 도우미 `devtools`·`domtree`·`ide` 오류 줄, 직접 조작 `tpick`·`bpick`·`psay`, Task 6의 `fspec` 방식
- 원장의 `Ruling:` 줄 전부(특히 `fxn`은 LATER에 두었다가 이 계획 Task 4에서 뺀다)

**스펙 보충:**
- **측정(2026-11-03)**: front 카드 92장, x 없음 57장(스펙 58장은 계획서 ① 진행 중 1장이 채워짐), x가 1문장인 카드 10장(Position은 디렉터 C 재검토로 먼저 고침. Class Name, Margin, Padding, Flexbox, Gap, Transition, Hover, Props, rem, Breakpoint), 공유 그림 34장(`FKEEP`).
- **r 대상 측정**: Hook·State·Props·React·Bundler·TypeScript·Tailwind CSS·Class Name·Media Query·CSS Variable·Vendor Prefix·Polyfill·Semantic HTML(front), Immutability·Module·Framework(basics), Component(design·front 둘 다), Dev Server(server), SSR(web), Responsive Image(design)는 있다. Lifecycle·Canvas는 없어서 이 계획이 만든다.
- **뒤로 미룬 r**: Controlled Input에 `useState`, Vendor Prefix에 `PostCSS`, State에 `Immutability`(스펙 4장)를 이 계획에서 단다.
- **프레임워크 코드 확인(2026-11-03, 공식 문서)**: 아래 Task 3 코드는 다음을 따른다. 확인일과 주소를 그림 주석에 남긴다.
  - Vue: 템플릿에서 ref는 자동으로 풀린다(`@click="count++"`), `<script setup>` 최상위 선언은 템플릿에서 바로 쓴다 — https://vuejs.org/guide/essentials/reactivity-fundamentals.html
  - Svelte 5: `let count = $state(0);`, `<button onclick={() => count++}>` — https://svelte.dev/docs/svelte/$state
  - Angular: `signal(0)`, `count.update(v => v + 1)`, 읽기는 `count()`. v19부터 컴포넌트는 기본이 standalone이라 `standalone: true`를 쓰지 않는다 — https://angular.dev/guide/signals, https://angular.dev/guide/components
  - Next.js: `app/page.tsx`가 `/` 화면이고, 상태를 쓰는 컴포넌트는 맨 위에 `'use client'` — https://nextjs.org/docs/app/getting-started/layouts-and-pages, https://nextjs.org/docs/app/api-reference/directives/use-client

## Global Constraints

계획서 ①의 Global Constraints를 그대로 따른다(토큰 색만, 글자 11px 이상, `.fig` 그림자 없음, `A`·`m:1`, 상태는 글자도 함께, `✓✕★→←↑↓` 금지, d·x 해요체, x 2~3문장·짝이면 차이 먼저, p는 "~해줘", r 1~3개, o:1이면 u, 커밋 규칙, Python 규칙). 바뀐 것 하나:
- 브라우저 확인은 Playwright MCP가 아니라 따로 띄운 headless Playwright(Python, 프로필 없음)로 한다(계획서 ① Task 4 Ruling). 그림은 늦게 그려지니 `.fig`마다 scrollIntoView 뒤 450ms, `psay` 문장은 클릭 뒤 400ms 기다려 읽는다.

## Review Focus

1. **x 채움이 다른 카테고리 카드와 뜻이 섞임**: Key·Context API·Lifecycle·Inheritance처럼 이름이 같거나 비슷한 카드는 x에서 구분하고 r을 달지 않는다(`FB_WRONG`). → Task 1·4a `fwrong`
2. **28자·8줄 코드 그림**: 프레임워크 4장과 react·build의 `ide`는 한글 2자 셈으로 28자 안이어야 하고, 320px에서 가로 넘침이 없어야 한다. → Task 1~3 브라우저 확인
3. **Key 끝 경우**: key 없음에서 두 번 추가, 추가 뒤 key 켜기·끄기, 키보드 조작에서 입력값이 엉뚱한 줄로 가는지/남는지가 문장과 화면 모두 맞아야 한다. → Task 5 `fdmrun`
4. **증상 중복**: 새 증상 12개가 기존 169개와 뜻이 겹치지 않아야 한다(스펙 6장에서 뺀 것 포함). → Task 6 대조
5. **자주 틀리는 사실**:
   - Error Boundary는 이벤트 처리기·비동기 코드의 오류는 못 잡는다(렌더링 중 오류만).
   - useEffect 의존성 배열을 빼면 렌더마다 실행되고, 빈 배열이면 처음 한 번이다(개발 모드 Strict Mode는 한 번 더 실행).
   - Vite 개발 서버는 내 코드를 묶지 않고 ES Module로 바로 준다(라이브러리는 미리 묶음). 빌드 도구 이름은 공식 문서 Why Vite를 다시 확인해 쓴다(검토 시점 문서는 Rolldown) — https://vite.dev/guide/why
   - CSS Modules의 실제 클래스 이름은 도구가 만든 예시일 뿐이다.

   공식 문서와 다르면 안 된다. → 각 Task 출처 확인, 디렉터 검토

---

## 공통 절차

계획서 ①의 "공통 절차"와 "브라우저 확인 절차"를 따른다. 사실 확인은 React 공식 문서(react.dev), MDN, 각 도구 공식 문서를 우선한다. 원장에 `Plan2 Task N 출처: <en> — <URL>`을 적는다.

디렉터 검토(Opus 5.5, effort high, 백그라운드 에이전트):
- **묶음 D**: Task 2 뒤(react·build 25장)
- **묶음 E**: Task 4b 뒤(추가 8장, x 채움, 공유 그림)
- **묶음 F**: Task 7 뒤(Key, 증상, 문서) = 최종 검토와 함께

Critical·Important는 RED→GREEN으로 고친다. Minor도 사용자 지시("미룬 것들도 다 고치고 똑같이 검토")대로 고치고, 고친 것도 다음 묶음에서 검토받는다.

그림 인자 공통 규칙:
- 단계가 없는 `ide`(ES Module·CSS-in-JS·Vue·Svelte·Angular·Next.js)는 단계를 `[{l:마지막 줄 번호}]` 하나로 주고 `still:true`를 단다(단계 0개면 `ide`가 오류를 던진다, 측정 index.html 3872줄).
- 그림 위아래에 코드 한 줄을 덧붙일 때는 `<div class="mk-fst">` 안에 `<p class="mk-fsp"><code>…</code></p>`로 둔다(계획서 ① Task 6의 결과 줄 방식).
- 표에 `m:1`이 없는 그림은 모두 `still`이다.

---

### Task 1: react 새 카드 15장

쓸 스킬: design-skills:ux-writing, superpowers:test-driven-development

**Files:** Modify `index.html`(새 블록 `T('front','react',[…])`, `/* front: react … */`), `tests/check.mjs`(EXPECT·COUNT·total)

- [ ] **Step 1: 실패하는 점검**: `EXPECT['front/react']`(아래 표 순서), `COUNT['front/react'] = 15`, `total` 1450 → 1465, 아래 "Key 도우미"의 `fdmrun` 점검
- [ ] **Step 2: 실패 확인**: `FAIL expect:front/react`·`count:front/react: 0 ≠ 15`·`total`·`fdmrun: fkey is not defined`
- [ ] **Step 3~5**: 공통 절차. 모든 카드에 x와 `v:'u-front-<slug>'`
- [ ] **Step 6: 브라우저 확인**: `#/c/front/react`
- [ ] **Step 7: 커밋**: `feat: 프론트엔드 React 새 카드`

| en | ko | 그림 | r |
|---|---|---|---|
| JSX | JSX · 자바스크립트 속 HTML | `pair`: 코드 `const name = '민지';` / `<h1>안녕, {name}</h1>` → 화면 제목 "안녕, 민지" | React |
| useState | 상태 훅 | `ide`: `const [n, setN] =` / `  useState(0);` / `<button onClick={() =>` / `  setN(n + 1)}>{n}` / `</button>`, 단계 `{l:2, vars:{n:'0'}}`·`{l:4, vars:{n:'1'}}`, `m:1` | Hook, State |
| useEffect | 효과 훅 | `flow`: 화면 그림 → 효과 실행(데이터 요청) → `[id]`가 바뀌면 다시 실행, `m:1` | Hook |
| Key▶ | 키 · 목록 항목 이름표 | 아래 "Key 도우미"의 `fkey(false, 0)` 멈춘 그림 | List Rendering |
| Ref | 참조 · 바꿔도 다시 안 그리는 값 | `ide`: `const box = useRef(null);` / `<input ref={box} />` / `<button onClick={() =>` / `  box.current.focus()}>` / `  입력하기</button>`, 단계 `{l:4, out:[{t:'입력칸에 포커스', dim:1}]}`. 렌더링 중에는 current를 읽지 않는다(react.dev useRef) | Hook |
| Fragment | 프래그먼트 · 빈 묶음 | `vs`: `<div>`로 감쌈 `domtree([[0,'section'],[1,'div','하나 더 생김'],[2,'h2'],[2,'p']], {hl:1, still:true})` / `<>…</>` `domtree([[0,'section'],[1,'h2'],[1,'p']], {still:true})` | Component |
| Portal | 포털 · 다른 곳에 그리기 | `domtree([[0,'body'],[1,'div id=root'],[2,'App'],[1,'div id=modal','여기에 그림']], {hl:3, still:true})` + cap "코드는 App 안, 화면은 body 바로 아래" | Component |
| Props Drilling | 프롭 내려 보내기 | `domtree([[0,'App','user 가짐'],[1,'Page','user 넘김'],[2,'List','user 넘김'],[3,'Item','여기서 씀']], {hl:3, still:true})`(Context API와 같은 4노드, hl만 다름) | Props, Context API |
| Context API | 컨텍스트 · 한꺼번에 나눠 주기 | `domtree([[0,'App','user 넣음'],[1,'Page'],[2,'List'],[3,'Item','바로 꺼냄']], {hl:[0,3], still:true})`, label에 "App이 Provider로 넣고 Item이 바로 꺼내요" | State Management |
| State Management | 상태 관리 | `flow([[{t:'버튼 누름'}], [{t:'저장소(store) 값 바뀜'}], [{t:'머리글 숫자와 목록이 함께 바뀜', k:'end'}]], {still:true})` 1칸 3줄 | State |
| Redux | 리덕스 | `flow`: `dispatch(action)` → reducer → store → 화면, `m:1` | State Management |
| Lifecycle | 생명주기 · 컴포넌트가 생기고 사라짐 | `track([{t:'마운트', s:'done', w:'처음 그림'}, {t:'업데이트', s:'done', w:'다시 그림'}, {t:'언마운트', s:'now', w:'사라짐'}])`, `m:1` | useEffect |
| Conditional Rendering | 조건부 렌더링 | `vs`: `ok`가 true → "로그아웃" 버튼 / false → "로그인" 버튼, `vs` 위에 공통 규칙의 코드 한 줄 `{ok ? <Out/> : <In/>}` | Display None |
| List Rendering | 목록 렌더링 | `pair`: `items.map(i =>` / `  <li key={i.id}>…` → 화면 목록 세 줄 | Key |
| Error Boundary | 오류 경계 | `vs`: 경계 없음(`browser` 하얀 화면) / 경계 있음(차트 칸만 "다시 시도" 안내, 나머지 그대로) | Component |

x 짝: useState vs Ref, useEffect vs Lifecycle, Props Drilling vs Context API vs State Management vs Redux, Conditional Rendering vs Display None, Fragment vs Wrapper. Error Boundary의 x에는 "지금은 클래스 컴포넌트나 react-error-boundary 라이브러리로 만든다"를 넣는다(react.dev Component 문서). 뜻이 다른 짝: Key(basics Key-Value·back API Key), Context API(ai Context), Lifecycle(mobile App Lifecycle) — x에서 구분하고 r에 넣지 않는다. 이 Task에서 Controlled Input의 r에 `useState`를, State의 r에 `Immutability`를 더한다.

**Key 도우미(Task 5가 쓴다. 여기서 만들고 점검한다):**
- `FKEY0 = [['사과','빨강'], ['배','']]`: 처음 목록(이름, 입력칸 값)
- `fkey(useKey: boolean, added: number) → string`: 맨 앞에 `added`개(0 또는 1)의 새 줄 '귤'을 넣은 목록. 입력칸은 `readonly`로 보여 주기만 한다(고정 데이터와 화면이 어긋나지 않게). key가 있으면 입력값이 이름을 따라가고, 없으면 입력값이 자리(줄 번호)에 남아 '빨강'이 '귤' 줄에 보인다. 엉뚱한 줄에는 꼬리표 "엉뚱한 줄"을 붙인다.
- `fkeySay(useKey, added) → string`: 0개면 `'처음 목록이에요. 사과 줄에 빨강을 써 두었어요'`, key 있음+추가면 `'key가 있어서 빨강이 사과 줄을 따라가요'`, key 없음+추가면 `'key가 없으면 React가 줄 번호(index)로 짝지어요. 그래서 빨강이 맨 앞 귤 줄에 남았어요'`
- Step 1 `fdmrun`에 더할 것:
  - `fkey(false, 1)`의 첫 줄이 '귤'이고 '빨강'과 "엉뚱한 줄"을 함께 가진다. 둘째 줄 '사과'의 입력칸은 비어 있다.
  - `fkey(true, 1)`의 '빨강'은 '사과' 줄에 있고 "엉뚱한 줄"이 없다.
  - `fkeySay(true, 0) === fkeySay(false, 0)`(추가 전에는 같다), `fkeySay(false, 1)`에 "줄 번호(index)"가 있다.

출처: react.dev의 Writing Markup with JSX, useState, useEffect, Rendering Lists(key), useRef, Fragment, createPortal, Passing Data Deeply with Context, Conditional Rendering, Error boundaries(Component 문서의 catching rendering errors 절), redux.js.org Fundamentals.

---

### Task 2: build 새 카드 10장

**Files:** Modify `index.html`(새 블록 `T('front','build',[…])`, `/* front: build … */`), `tests/check.mjs`

- [ ] **Step 1**: `EXPECT['front/build']`, `COUNT['front/build'] = 10`, `total` 1465 → 1475
- [ ] **Step 2: 실패 확인**: `expect:front/build`·`count:front/build`·`total`
- [ ] **Step 3~6**: 공통 절차, 브라우저 `#/c/front/build`
- [ ] **Step 7: 커밋**: `feat: 프론트엔드 도구·빌드 새 카드`

| en | ko | 그림 | r |
|---|---|---|---|
| Vite | 바이트 · 빠른 개발 서버 | `term`: `npm run dev` → `VITE ready in 300 ms` / `Local: http://localhost:5173/`, `still`. cap에 "300 ms는 예시" | Bundler, Dev Server |
| Webpack | 웹팩 | `flow`: app.js · util.js · style.css → webpack → bundle.js, `m:1` | Bundler |
| Babel | 바벨 | `pair`: `[1, 2, 3].map(n => n + 1);` → `[1, 2, 3].map(function (n) {` / `  return n + 1;` / `});`(babeljs.io 공식 예) | Transpile, Polyfill |
| Transpile | 트랜스파일 · 문법 바꿔 쓰기 | `flow`: `app.ts`(TypeScript) → 변환 → `app.js`(JavaScript) | TypeScript |
| ES Module | ES 모듈 | `ide`: `// math.js` / `export const add =` / `  (a, b) => a + b;` / `// app.js` / `import { add }` / `  from './math.js';` + `ide` 밖 아래에 공통 규칙의 코드 한 줄 `<script type="module" src="app.js">` | Module |
| Sass | 사스 | `pair`: `.card {` / `  .title { … }` / `}` → `.card .title { … }` | CSS Variable |
| PostCSS | 포스트CSS | `pair`: `user-select: none;` → `-webkit-user-select: none;` / `user-select: none;`(플러그인이 접두사를 붙임). user-select는 Safari·iOS가 접두사 없이 지원하지 않아 예로 둔다(MDN browser-compat-data), 플러그인 이름은 Autoprefixer로 적는다 | Vendor Prefix |
| CSS Modules | CSS 모듈 | `pair`: `Button.module.css`의 `.btn` → 실제 클래스 `Button_btn__x7a2`(예시) | Class Name |
| CSS-in-JS | CSS-in-JS | `ide`: ``const Btn = styled.button` `` / `  color: blue;` / `` `; `` / `<Btn>보내기</Btn>` | Tailwind CSS |
| Storybook | 스토리북 | 전용 HTML(`.mk-fsb`): 왼쪽 목록 Button 아래 기본 / 비활성 / 큰 크기 세 항목, 그중 가운데 '비활성'에 꼬리표 "선택", 오른쪽에 비활성 버튼 미리보기 | Component |

이 Task에서 Vendor Prefix의 r에 `PostCSS`를 더한다. x 짝: Vite vs Webpack vs Bundler, Babel vs Transpile vs Polyfill, ES Module vs Module(CommonJS `require`와 `type="module"` 차이), Sass vs PostCSS vs CSS Variable, CSS Modules vs CSS-in-JS vs Tailwind CSS.

출처: vite.dev(Why Vite, 기본 포트), webpack.js.org Concepts, babeljs.io What is Babel, MDN JavaScript modules, sass-lang.com, postcss.org·Autoprefixer, github.com/css-modules, storybook.js.org.

뒤이어 **디렉터 검토 묶음 D**

---

### Task 3: basic·adv·layout·tip 새 카드 8장

**Files:** Modify `index.html`(각 `T('front', …)` 블록 끝), `tests/check.mjs`

- [ ] **Step 1**: EXPECT에 8장, COUNT basic 9→11·adv 9→13·layout 12→13·tip 8→9, `total` 1475 → 1483
- [ ] **Step 2~6**: 공통 절차, 브라우저 basic·adv·layout·tip
- [ ] **Step 7: 커밋**: `feat: 프론트엔드 SVG·프레임워크·컨테이너 쿼리·ARIA 카드`

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| basic | SVG | SVG · 선으로 그린 그림 | `pair`: `<svg viewBox="0 0 100 100">` / `  <circle cx="50" cy="50"` / `    r="40" />` / `</svg>` → 원, 꼬리표 "키워도 선명" | Canvas |
| basic | Canvas | 캔버스 · 점으로 그리는 판 | `pair`: `ctx.fillRect(10, 10, 80, 40);` → 사각형, 꼬리표 "그린 뒤엔 점뿐" | SVG |
| adv | Vue | 뷰 | `ide`(title `App.vue`): `<script setup>` / `import { ref } from 'vue'` / `const count = ref(0)` / `</script>` / `<template>` / `<button @click="count++">` / `  {{ count }}</button>` / `</template>` | React, Framework |
| adv | Svelte | 스벨트 | `ide`(title `Counter.svelte`): `<script>` / `  let count = $state(0);` / `</script>` / `<button onclick={() =>` / `  count++}>` / `  {count}` / `</button>` | React, Framework |
| adv | Angular | 앵귤러 | `ide`(title `counter.ts`): `@Component({ template:` / ``  `<button (click)="inc()">`` / ``  {{ count() }}</button>` })`` / `export class Counter {` / `  count = signal(0);` / `  inc() { this.count.update(` / `    v => v + 1); }` / `}` | React, Framework |
| adv | Next.js | 넥스트JS | `ide`(title `app/page.tsx`): `import Counter` / `  from './counter';` / `export default function` / `  Page() {` / `  return <Counter />;` / `}` + cap "이 파일 자리가 곧 / 주소 화면이고, Counter는 'use client'를 단 React 컴포넌트예요" | React, SSR |
| layout | Container Query | 컨테이너 쿼리 | `vs`: 넓은 칸 안 카드(사진 옆 글) / 좁은 칸 안 카드(사진 위 글), 위에 `@container (min-width: 400px)` | Media Query, Responsive Image |
| tip | ARIA | 아리아 · 접근성 정보 | `pair`: `<button aria-label="닫기">` / `  X</button>` → 화면 낭독기 말풍선 "닫기, 버튼(예시)". x에 "보이는 글이 X뿐이라 aria-label로 이름을 붙인다. 먼저 `<button>` 같은 알맞은 태그를 쓰고 모자랄 때 ARIA" | Semantic HTML |

프레임워크 4장은 같은 카운터(누르면 1씩 늘어남)다. 회사 로고·색은 쓰지 않는다. 코드 줄은 `ide` 28자·8줄 한도 안이다(측정: Angular 셋째·여섯째 줄이 28자로 한도에 꼭 맞음). 한도를 넘으면 `ide`가 오류를 던지므로 점검이 먼저 잡는다.

---

### Task 4a: x 채움 57장 + 1문장 x 10장

쓸 스킬: design-skills:ux-writing

**Files:** Modify `index.html`(front 카드 x), `tests/check.mjs`(`LATER`에서 `fx`·`fxn` 빼기)

- [ ] **Step 1**: `LATER`에서 `fx`·`fxn`을 뺀다.
- [ ] **Step 2: 실패 확인**: `FAIL fx`(57장), `FAIL fxn`(10장)
- [ ] **Step 3: x 쓰기**: 카드마다 2~3문장. 짝이 있으면 차이를 먼저 쓴다(예: Margin vs Padding, Flexbox vs CSS Grid, px vs rem vs em, Transition vs Keyframes). 사실은 MDN으로 확인하고 원장에 출처를 적는다. 기존 d·p·r은 바꾸지 않는다.
- [ ] **Step 4: 통과 확인**: `FAIL` 없음, `LATER`는 `font`·`doccount`
- [ ] **Step 5: 커밋**: `feat: 프론트엔드 기존 카드 설명 채우기`

### Task 4b: 공유 그림 34장 점검

**Files:** Modify `index.html`(바꾸는 그림만), `tests/check.mjs`(`FKEEP`)

- [ ] **Step 1: 점검**: `FKEEP` 34장을 320/375/1280px에서 찍어(스펙 2장) 글자 11px 미만·넘침이 없는지와 카드 뜻과 맞는지 본다. 뜻이 어긋나면 그 카드만 전용 그림으로 바꾸고 `FKEEP`에서 뺀다. 바꾸지 않은 판단은 원장에 `Plan2 Task 4: Ruling: <카드> 공유 그림 유지 — <이유>`로 남긴다.
- [ ] **Step 2: 바꾼 그림이 있으면**: `FKEEP`에서 먼저 빼서 점검이 실패하는 것을 보고, 전용 그림을 넣어 통과시킨다.
- [ ] **Step 3: 브라우저 확인**: front 11개 하위항목 전체(320/375/1280, 넘침·11px 미만 글자 0)
- [ ] **Step 4: 커밋**: `feat: 프론트엔드 공유 그림 점검`(바꾼 그림이 없으면 원장 Ruling만)

뒤이어 **디렉터 검토 묶음 E**

---

### Task 5: 직접 조작 Key

쓸 스킬: superpowers:test-driven-development, design-skills:interaction-design

**Files:** Modify `index.html`(`u-front-key`에 `init`), `tests/check.mjs`(`FDM`·`fdmrun`)

**Interfaces:**
- Consumes: `tpick`, `psay`, Task 6(계획서 ①)의 `fbub` 방식, Task 1의 Key 도우미 `FKEY0`·`fkey(useKey, added)`·`fkeySay(useKey, added)`(이미 점검됨)
- Produces: `u-front-key`의 `init`
  - `fkey(useKey: boolean, added: number) → string`: 맨 앞에 `added`개(0 또는 1)의 새 줄 '귤'을 넣은 목록. key가 있으면 입력값이 이름을 따라가고, 없으면(index를 key로 쓴 것과 같음) 입력값이 자리(줄 번호)에 남아 '빨강'이 '귤' 줄에 보인다. 엉뚱한 줄에는 꼬리표 "엉뚱한 줄"을 붙인다.
  - `fkeySay(useKey, added) → string`: 0개면 `'처음 목록이에요. 사과 줄에 빨강을 써 두었어요'`, key 있음+추가면 `'key가 있어서 빨강이 사과 줄을 따라가요'`, key 없음+추가면 `'key가 없어서 빨강이 맨 앞 귤 줄에 남았어요'`

- [ ] **Step 1: 실패하는 점검**: `FDM['Key'] = ['key 있음', 'key 없음', '맨 앞에 추가', 'aria-pressed', 'aria-live']`
- [ ] **Step 2: 실패 확인**: `FAIL fdm: Key`
- [ ] **Step 3: 구현**: `tpick(['key 있음','key 없음'], 'key 없음')` + 버튼 "맨 앞에 추가"(`aria-pressed`, 누르면 추가, 다시 누르면 처음 목록). key를 바꾸면 `added`는 그대로 두고 다시 그린다. `m` 없음, `init`에 window·document 없음.
- [ ] **Step 4: 통과 확인**
- [ ] **Step 5: 브라우저 확인**: Review Focus 3의 순서를 마우스·키보드로, 320px 넘침 0, 콘솔 오류 0
- [ ] **Step 6: 커밋**: `feat: 프론트엔드 직접 조작 Key`

출처: react.dev Rendering Lists("Why does React need keys?", index를 key로 쓸 때의 문제).

---

### Task 6: 증상 12개

**Files:** Modify `index.html`(`SYM(…)` 목록), `tests/check.mjs`(`SYM_FRONT`, `symcount` 169 → 181)

- [ ] **Step 1: 실패하는 점검**: `SYM_FRONT`(스펙 6장 표의 12개 문구)를 더하고 `symcount` 기대값을 181로, 대조 목록에 `...SYM_FRONT`를 더한다.
- [ ] **Step 2: 실패 확인**: `FAIL symcount`
- [ ] **Step 3: 대조**: 12개를 기존 169개와 다시 대조한다(스펙 6장에서 뺀 7개 포함). 겹치면 문구를 바꾸고 원장에 Ruling을 남긴다.
- [ ] **Step 4: 넣기**: 스펙 6장 표의 그룹(`SYMPTOM_GROUPS`의 이름)과 연결 카드대로 `SYM` 목록에 넣는다.
- [ ] **Step 5: 통과 확인**, 브라우저로 증상 화면에서 새 12개가 해당 그룹 칩에 보이고 연결 카드로 가는지 확인
- [ ] **Step 6: 커밋**: `feat: 프론트엔드 증상 12개`

---

### Task 7: 마무리 (글꼴, 문서, 전체 점검)

쓸 스킬: impeccable(audit), break-ui, design-skills:accessibility-audit

**Files:** Modify `index.html`(FONT 블록), `tests/check.mjs`, `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`

- [ ] **Step 1: 글꼴 도구**: 스크래치패드 `C:\Users\HELLOW~1\AppData\Local\Temp\claude\C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide\af217e6a-1338-434d-ad6c-2e7d9f6e9d35\scratchpad\`에 `font_subset.py`·`fontsrc\Hahmlet.ttf`가 있다(측정 2026-11-03). 없으면 사용자에게 묻고 멈춘다.
- [ ] **Step 2: 실패 확인**: `LATER = []` → `FAIL font`, `FAIL doccount`
- [ ] **Step 3: 서브셋**: `python -E -P font_subset.py index.html <Hahmlet.ttf> <작업 폴더>`
- [ ] **Step 4: 문서**
  - PRODUCT.md: 용어 1483개, 프론트엔드 11개 하위항목·카드 수, 증상 색인 181개
  - docs/PLAN.md: ③ 프론트엔드 완료 표시, 증상 칩 수를 실제 수로
  - DESIGN.md: `ide()` 규칙 뒤에 `devtools()`(탭 셋, 한도 28·24·28·16자, `off`는 "덮임", 규칙 없으면 한 칸)·`domtree()`(8노드·깊이 4·꼬리표 12자, `path`는 자식에서 부모로, `still`) 규칙, `ide()` 오류 줄(`err`, `mk-cdw`·`mk-cdem`)
- [ ] **Step 5: 점검 통과**: `OK <수>`(LATER 없음)
- [ ] **Step 6: 전체 브라우저 확인**: front 11개 하위항목을 1280/375/320과 reduced-motion에서, 직접 조작 4장은 키보드로. 홈·검색("명시도", "useState", "Vite")·증상 화면 콘솔 오류 0
- [ ] **Step 7: 품질**: break-ui(`devtools()` 28자·6줄, `domtree()` 8노드·깊이 4·꼬리표 12자), impeccable audit. 이번 범위 문제만 고친다.
- [ ] **Step 8: 커밋**: `feat: 프론트엔드 글꼴·문서 갱신`
- [ ] **Step 9: 디렉터 검토 묶음 F + 최종 전체 검토**(review-package, 계획서 ①·② 범위) → 반영 → 원장 Ruling·minor 보고 → superpowers:finishing-a-development-branch(main 병합은 사용자 확인 뒤)
