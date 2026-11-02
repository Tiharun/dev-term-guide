# 프론트엔드 카테고리 보강 (③ 기존 카테고리 3/12) 설계

- 날짜: 2026-11-02
- 관련 문서: [PLAN.md](../../PLAN.md), [DESIGN.md](../../../DESIGN.md), 앞 단계 [2026-11-02-web-category-design.md](2026-11-02-web-category-design.md)
- ③은 남은 12개 카테고리를 사이트 순서(basics → web → front → back → db → server → git → deploy → security → perf → bug → ai)로 하나씩 보강한다. 이 문서는 세 번째(front, 화면 이름 "프론트엔드")다.
- 진행 방식은 basics·web과 같다. 구현은 메인 세션이 하고, 설계서·계획서·구현 묶음 검토는 디렉터 에이전트(Opus 5.5, effort high)가 한다. 판단은 메인이 하고 원장에 남긴다.

## 1. 목적과 성공 기준

Claude에게 화면을 만들어 달라고 하는 사람이 "우선순위가 밀려서 CSS가 안 먹어요", "이벤트가 부모로 올라가요", "key가 없어요", "빌드 도구" 같은 말을 **DOM 나무, 개발자 도구 창, 코드와 결과를 나란히 놓은 그림으로 바로 이해**하게 한다. 그리고 CSS 규칙, 이벤트, React, 빌드 도구까지 카드로 이어 준다.

성공 기준:
- 프론트엔드 카테고리가 하위항목 11개, 카드 125장(70 + 새 55)이 된다.
- 모든 카드에 x(헷갈림 칸)가 있다.
- 글자상자 그림(객체 v)이 0장이고, 뜻에 맞지 않던 공유 그림 12장이 전용 그림이 된다. 점검으로 막는다.
- 8장의 완료 기준을 모두 통과한다.

## 2. 범위

포함:
- 새 하위항목 4개: `css`(CSS 규칙), `event`(이벤트·데이터), `react`(React 더 보기), `build`(도구·빌드)
- 새 카드 55장(5장 목록). 정의 d와 x는 해요체로 쓰고, 그림은 모두 새로 그린다(`u-` 키).
- 기존 58장에 x를 채운다. x가 이미 있는 12장은 빼고, 기존 d는 바꾸지 않는다.
  - 해요체 2~3문장으로 쓴다.
  - 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
- 기존 글자상자 22장을 다시 그린다(3.3).
- 뜻에 맞지 않는 공유 그림을 쓰던 12장을 전용 그림으로 바꾼다(3.4). 공유 그림(`D['boxmodel']` 등) 자체는 다른 카테고리가 쓰므로 그대로 둔다.
- 나머지 공유 그림 36장은 그대로 두고 3폭·11px만 점검한다.
- 새 그림 도우미 `devtools()`·`domtree()`(3.1, 3.2)
- 직접 조작 4장: Specificity(규칙 고르기), Event Bubbling(누를 곳·전파 막기 고르기), Key(key 있음·없음으로 순서 바꾸기), Visibility(숨기는 방법 고르기)
- 증상 색인 12개 추가(6장)
- 글꼴 서브셋, PRODUCT.md·PLAN.md·DESIGN.md의 개수·도우미 표기, 점검 기대값 갱신

제외:
- 다른 카테고리에 이미 있는 말(측정, 2026-11-02): Inheritance·Event·Event Listener·Promise·Module·Callback·Closure·Event Loop·Framework·Library·Build·Hot Reload·Linter·Formatter(basics), Hydration·Lazy Loading(web), Web Font·Alt Text·Tab Order·Form·Loading State·Design Token·Skeleton UI·Scroll Snap·Line Height·Letter Spacing·Font Weight·Opacity·Cursor Style(design), Debounce·Throttle·Memoization·Code Splitting·Tree Shaking·Image Optimization·Will-change·GPU Acceleration·Repaint·Reflow·Minify(perf), Source Map·Text Overflow·Layout Shift(bug), JSON·Environment Variable·Validation(back), Router(net), Dev Server(server), Unit Test·E2E Test·Snapshot Test(test), Context(ai)
- 증상 "오류·안 됨" 칩 재검토. ③ 마지막 AI 이후 한 번에 한다.
- 헷갈림 칸 이름 변경, 기존 카드 이동, 다른 카테고리 카드 수정. r 연결만 예외다.

## 3. 그림 구조

### 3.1 `devtools()` — 개발자 도구 창 모형 (새로)

- `devtools({tab, dom, css, hl, con})`
  - `tab`: `'Elements'`·`'Console'`·`'Network'` 중 하나. 위 탭 줄에 셋을 모두 그리고 고른 탭에 밑줄과 굵은 글씨를 준다(색만으로 구분하지 않음).
  - `dom`: Elements 탭의 코드 줄 배열(1~6줄, 줄마다 들여쓰기 깊이 `[깊이, 글]`)
  - `css`: 오른쪽 스타일 칸 줄 배열(0~4줄). 덮여서 안 쓰이는 줄은 `{t, off:1}`로 취소선과 "덮임" 글자를 함께 붙인다.
  - `hl`: 강조할 dom 줄 번호(0부터). 강조는 배경색과 "선택" 글자로 한다.
  - `con`: Console 탭 줄 배열(1~4줄). `{t, err:1}`이면 오류 줄(아이콘이 아닌 "오류" 글자를 앞에 붙임).
- 좁은 그림판(320px)에서는 스타일 칸이 DOM 칸 아래로 내려간다. 가로 스크롤은 하지 않는다.
- 특정 브라우저의 로고·색을 쓰지 않는 중립 모형이다. 탭 이름은 주요 브라우저에서 공통으로 쓰는 영어 이름을 쓴다.
- 한도(넘으면 오류): 코드 줄 40자, 스타일 줄 30자, 콘솔 줄 40자(한글은 2자로 센다), 깊이 0~4.
- 입력 검사: 모르는 `tab`, 빈 줄 배열, 범위 밖 `hl`, 한도 초과는 오류를 던진다.
- `.sr` 문장으로 "개발자 도구 ○○ 탭, n번째 줄 선택"을 읽어 준다.
- 대상(예): DevTools, Inspect Element, Specificity, Cascade, !important, Console(오류 줄), Fetch(Network 탭)

### 3.2 `domtree()` — DOM 나무와 전파 경로 (새로)

- `domtree(nodes, {hl, path, dir})`
  - `nodes`: `[깊이, 태그 이름, 꼬리표?]` 배열(2~8개, 깊이 0~4). 예: `[[0,'div'],[1,'ul'],[2,'li'],[3,'button','누른 곳']]`
  - `hl`: 강조할 노드 번호 배열(색과 굵은 테두리, 꼬리표 글자를 함께)
  - `path`: 전파 경로 노드 번호 배열. `dir:'up'`이면 아래에서 위로(버블링), `'down'`이면 위에서 아래로 차례대로 칠해진다.
- 움직임: 경로의 k번째 노드는 `mk-rux{k}`처럼 차례로 칠해진다(10s 주기, `A` 클래스). `still`이면 모두 칠해진 마지막 장면이다.
- 줄마다 들여쓰기와 이음선으로 부모·자식을 보여 준다. 화살표 기호는 `aria-hidden`으로 숨긴다.
- 입력 검사: 노드 수·깊이 범위, 첫 노드 깊이 0이 아님, 깊이가 2 이상 갑자기 늘어남, 범위 밖 `hl`·`path`, 모르는 `dir`은 오류를 던진다.
- `.sr` 문장으로 "div 안에 ul, … 경로: button → li → ul → div"를 읽어 준다.
- 대상(예): Element, React(컴포넌트 나무), Props, Virtual DOM, Event Bubbling, Event Delegation, stopPropagation, Props Drilling, Portal

### 3.3 글자상자 22장 다시 그리기

| 카드 | 새 그림 |
|---|---|
| Tag | `pair`: `<button>보내기</button>` 코드 → 화면의 버튼 |
| Attribute | `pair`: `<img src="cat.png" alt="고양이 사진">`에서 속성 칸 강조 → 사진과 "대체 글: 고양이 사진" |
| Selector | `pair`: `.card h2 { color: … }` → 카드 안 제목만 칠해지고 "선택됨" 꼬리표, 카드 밖 제목은 그대로 |
| Class Name | `pair`: `class="btn"`인 요소 셋 → 같은 모양 단추 셋 |
| Display | `doc` 표: block(한 줄 다 차지) · inline(글자 사이) · flex(안쪽을 나란히) · none(사라짐) 미니 그림. Inline vs Block 카드의 `vs`와 겹치지 않게 값 목록으로 그린다 |
| React | `domtree`: App → Header · List → Item 컴포넌트 나무, 바뀐 Item만 강조 |
| Props | `domtree`: 부모 Card가 `title="공지"`를 자식 Title에 건넴 → 화면 제목 "공지" |
| Hook | `doc` 표: useState(값 기억) · useEffect(화면 밖 일) · useRef(요소 잡기). 새 카드 useState·useEffect·Ref와 같은 이름을 쓴다 |
| Virtual DOM | `vs`: 이전 나무와 새 나무(`domtree` 둘), 달라진 노드만 강조 → "바뀐 곳만 실제 화면에 반영" |
| TypeScript | `ide`: `price: number`에 `"삼천"`을 넣는 줄에 밑줄과 오류 글 "number가 와야 해요" |
| Bundler | `flow`: a.js · b.js · style.css → 번들러 → 파일 1~2개 |
| Tailwind CSS | `pair`: `class="p-4 rounded-lg bg-blue-600"` → 꾸며진 상자 |
| Container | `browser`: 가운데 최대 폭 상자, 양옆 남는 여백에 이름 |
| Full Width | `vs`: 컨테이너 안(양옆 여백) vs 화면 끝까지 꽉 찬 띠 |
| px | 눈금자 위 16px 상자. 아래 "글자 크기 설정을 키워도 그대로" |
| rem | `track`: 루트 글자 16px(기본값) → 1rem = 16px, 2rem = 32px. 설정을 20px로 키우면 2rem = 40px |
| em | 겹친 상자 셋: 부모 20px 안의 1.5em = 30px, 그 안 1.5em = 45px(누적) |
| fr | 칸 셋 `1fr 2fr 1fr`, 폭 비율 1 : 2 : 1과 숫자(예시) |
| CSS Variable | `pair`: `--brand` 한 줄 → 단추·링크·제목 세 곳이 같은 색 |
| Semantic HTML | `vs`: div만 쓴 화면(이름 없음) vs header · nav · main · footer 이름표 |
| DevTools | `devtools`: Elements 탭, 선택 줄과 스타일 칸 |
| Polyfill | `flow`: 옛 브라우저에 기능 없음 → 폴리필이 채움 → 같은 코드가 동작 |

### 3.4 공유 그림 12장을 전용 그림으로

측정: 아래 카드는 다른 뜻의 공유 그림을 쓰고 있다(예: Cache Busting은 페이드, Position은 z-index 쌓기).

| 카드 | 지금 | 새 그림 |
|---|---|---|
| Element | boxmodel | `domtree` + 화면 부품 짝: 태그 하나 = 요소 하나 |
| Wrapper | boxmodel | 카드 셋을 감싼 바깥 상자에 "wrapper" 이름, 바깥 상자만 가운데 정렬 |
| Inspect Element | boxmodel | `browser` 화면의 버튼 강조 → 아래 `devtools`에서 그 줄 선택 |
| Position | zindex | 네 칸: static · relative · absolute · fixed, 기준 상자와 옮긴 거리 |
| requestAnimationFrame | jank | `track`: 화면을 새로 그리는 박자마다 한 번씩 위치 계산(60Hz 예시, 약 16.7ms) |
| Reduced Motion | fade | `vs`: 설정 꺼짐(미끄러져 들어옴) vs 켜짐(바로 나타남) |
| Re-render | flicker | `flow`: 상태 바뀜 → 컴포넌트 함수 다시 실행 → 바뀐 부분만 화면 반영 |
| Percent | responsive | 부모 폭 400px(예시) 안의 50% = 200px 막대, 부모가 줄면 같이 줄어듦 |
| Mobile First | responsive | `track`: 기본(휴대폰) → `min-width: 768px` → `min-width: 1024px`(값은 예시) |
| Dark Mode | contrast | `vs`: 같은 카드의 밝은 화면 vs 어두운 화면 |
| prefers-color-scheme | contrast | `flow`: 기기 설정 "어둡게" → 브라우저가 알려 줌 → `@media (prefers-color-scheme: dark)` 적용 |
| Cache Busting | fade | `net`: `style.css` 그대로면 저장본 사용, `style.a1b2.css`로 이름이 바뀌면 새로 받음 |

공통 규칙(DESIGN.md):
- 그림 글자는 11px 이상이다.
- 그림 속 숫자는 예시로 표시한다.
- 320/375/1280 세 폭에서 넘침이 없어야 한다.
- 상태를 색만으로 구분하지 않는다.
- 읽히는 글에 화살표·체크 기호를 쓰지 않는다(`wsym`·`symcss` 점검과 같은 규칙).

### 3.5 새 카드 그림

새 55장은 기존 도우미(`pair`·`vs`·`flow`·`track`·`doc`·`net`·`browser`·`ide`·`term`)와 `devtools`·`domtree`로 그린다. 하위항목별 기본 도구는 다음과 같다. 카드별 배정은 계획서에서 정한다.
- css: `pair`·`devtools`
- event: `domtree`·`browser`·`net`
- react: `domtree`·`ide`·`flow`
- build: `flow`·`ide`·`term`·`doc` 표
- adv의 프레임워크 4장: 같은 카운터를 각 문법으로 쓴 `ide` 한 장씩. 회사 로고는 쓰지 않는다.

직접 조작 4장:
- Specificity: 같은 제목에 걸린 규칙 셋(태그 · 클래스 · 아이디) 중 켤 것을 고르면 이긴 규칙과 색이 바뀐다. 결과 문장에 이긴 이유("아이디가 클래스보다 우선")를 쓴다.
- Event Bubbling: 누를 곳(button · li)과 "전파 막기(stopPropagation)" 켜기를 고르면 `domtree` 경로와 "반응한 곳" 문장이 바뀐다.
- Key: key 있음·없음을 고르고 "맨 앞에 추가"를 누르면 입력값이 제자리에 남는지 엉뚱한 줄로 가는지 보여 준다.
- Visibility: display:none · visibility:hidden · opacity:0을 고르면 자리 남음·클릭 가능 여부가 표로 바뀐다.

## 4. 데이터와 배치

- `CAT('front', …)`([index.html:1667](../../../index.html))의 추가 하위항목 배열에서 `unit` 뒤에 다음 넷을 넣는다. 공통 `tip`(추천 개념)은 마지막에 그대로 둔다. 기존 카드 번호는 바뀌지 않고 tip 카드 번호만 뒤로 밀린다(web과 같음).
  - `['css','CSS 규칙','어떤 스타일이 이기고 어떻게 숨기는지 정하는 규칙']`
  - `['event','이벤트·데이터','누르고 입력한 것을 받고 데이터를 가져오는 말']`
  - `['react','React 더 보기','React로 화면을 만들 때 자주 듣는 말']`
  - `['build','도구·빌드','코드를 브라우저가 읽는 파일로 바꾸는 도구']`
- 카드 형식 `{en,ko,d,x,p,r,l,o,u,v}`는 그대로다. o:1은 1차 출처가 있을 때만 쓰고, 그때 u를 단다.
- r은 이미 있는 같은 뜻·짝 카드에만 단다. 후보:
  - Specificity↔Selector·Cascade, !important↔Specificity, Pseudo-class↔Hover·Focus, Pseudo-element↔Selector
  - Display None↔Display·Visibility, Inline vs Block↔Display, CSS Reset↔Margin
  - Event Bubbling↔Event Listener·stopPropagation, Event Delegation↔Event Bubbling, preventDefault↔Form
  - Form Validation↔Validation(back), Controlled Input↔State·useState, Fetch↔JSON·Promise, async / await↔Promise
  - JSX↔React, useState↔Hook·State, useEffect↔Hook, Key↔List Rendering, Ref↔Hook, Props Drilling↔Props·State Management, Redux↔State Management, Immutable↔State
  - Vite↔Bundler·Dev Server, Webpack↔Bundler, Babel↔Transpile·Polyfill, ES Module↔Module, Sass↔CSS Variable, PostCSS↔Vendor Prefix, CSS Modules↔Class Name, CSS-in-JS↔Tailwind CSS, Storybook↔Component
  - Vue·Svelte·Angular↔React·Framework, Next.js↔React·SSR, srcset↔Image Optimization, ARIA↔Semantic HTML, SVG↔Canvas
- 뜻이 다른 짝은 r 없이 x 안에서만 구분한다: Key vs basics의 Key-Value·back의 API Key, Pointer Events vs basics의 Event, Lifecycle vs mobile의 App Lifecycle(앱 전체가 켜지고 꺼지는 흐름).
- 점검 기대값:
  - `COUNT`에 `front/*` 11개
  - `EXPECT`에 새 카드 영문명
  - `REDRAWN`에 front 하위항목 11개(글자상자 0장)
  - 새 점검 `frontshared`: 3.4의 12장이 공유 그림 키를 쓰지 않는다.

## 5. 용어 목록 (새 55장)

`▶`는 직접 조작이다. 측정: 아래 영문명은 기존 카드 1,428장과 영문명이 같지 않다(2026-11-02 대조). Cursor는 design의 Cursor Style과 같아서 빼고 Float로 바꿨다.

| 하위항목 | 새 카드 |
|---|---|
| basic (2) | SVG, Canvas |
| adv (4) | Vue, Svelte, Angular, Next.js |
| layout (1) | srcset |
| css (12) | Specificity▶, Cascade, Pseudo-class, Pseudo-element, !important, CSS Reset, Inline vs Block, Display None, Visibility▶, Pointer Events, Float, Vendor Prefix |
| event (10) | Event Bubbling▶, Event Delegation, preventDefault, stopPropagation, Keyboard Event, Form Validation, Controlled Input, Two-way Binding, Fetch, async / await |
| react (15) | JSX, useState, useEffect, Key▶, Ref, Fragment, Portal, Props Drilling, State Management, Redux, Lifecycle, Conditional Rendering, List Rendering, Error Boundary, Immutable |
| build (10) | Vite, Webpack, Babel, Transpile, ES Module, Sass, PostCSS, CSS Modules, CSS-in-JS, Storybook |
| tip (1) | ARIA |

하위항목별 개수: basic 11, core 14, motion 10, adv 13, layout 13, unit 8, css 12, event 10, react 15, build 10, tip 9.

x로 구분할 짝(뜻이 가까움):
- Specificity vs Cascade vs !important
- Pseudo-class vs Pseudo-element
- Display None vs Visibility vs Opacity(design)
- Inline vs Block vs Display
- Float vs Flexbox
- Event Bubbling vs Event Delegation
- preventDefault vs stopPropagation
- Form Validation(브라우저에서 먼저) vs Validation(서버에서 다시)
- Controlled Input vs Two-way Binding
- Fetch vs async / await
- useState vs Ref
- useEffect vs Lifecycle
- Props Drilling vs State Management vs Redux
- Conditional Rendering vs Display None
- Vite vs Webpack vs Bundler
- Babel vs Transpile vs Polyfill
- ES Module vs Module(basics)
- Sass vs PostCSS vs CSS Variable
- CSS Modules vs CSS-in-JS vs Tailwind CSS
- Next.js vs React
- SVG vs Canvas
- ARIA vs Semantic HTML(먼저 알맞은 태그를 쓰고, 모자랄 때 ARIA)

## 6. 증상 색인 (12개)

기존 169개와 대조했다. "뒤로 숨어요 · 가려져요", "하얀 화면만 나와요", "사진 때문에 페이지가 무거워요", "import 했는데 못 찾는대요", "await를 썼는데 기다리지 않아요", "배열을 바꿨는데 다른 변수도 같이 바뀌었어요"는 이미 있어 뺐다. 계획서에서 문구를 다시 대조하고, 겹치면 대체 증상("props를 여러 단계로 계속 넘기고 있어요", "스크린 리더가 버튼을 이상하게 읽어요")을 넣는다.

| 증상 | 그룹 | 연결 카드 |
|---|---|---|
| CSS를 고쳤는데 적용이 안 돼요 | 오류·안 됨 | Specificity, Cascade, Inspect Element |
| 안쪽 버튼을 눌렀는데 바깥 상자도 같이 반응해요 | 반응·클릭 | Event Bubbling, stopPropagation |
| 버튼을 누르면 페이지가 새로고침돼요 | 반응·클릭 | preventDefault, Form Validation |
| 입력칸에 글자가 안 쳐져요 | 반응·클릭 | Controlled Input, useState |
| 같은 요청이 끝없이 반복돼요 | 오류·안 됨 | useEffect, Re-render |
| 목록 순서를 바꾸면 입력값이 엉뚱한 줄에 남아요 | 오류·안 됨 | Key, List Rendering |
| 값을 바꿨는데 화면이 그대로예요 | 오류·안 됨 | Immutable, State, useState |
| 작은 부분 하나가 고장 났는데 화면 전체가 사라져요 | 오류·안 됨 | Error Boundary |
| 투명한 상자 때문에 아래 버튼이 안 눌려요 | 반응·클릭 | Pointer Events, Z-index |
| 숨겼는데 빈자리가 그대로 남아요 | 위치·간격 | Visibility, Display None |
| 브라우저마다 기본 여백이 달라요 | 위치·간격 | CSS Reset |
| 옛 브라우저에서 새 문법이 안 돼요 | 오류·안 됨 | Transpile, Babel, Polyfill |

## 7. 진행 순서

1. `devtools()`·`domtree()` 도우미와 입력 검사 점검
2. 하위항목 4개, 점검 기대값
3. 하위항목별 새 카드(css·event·react·build는 각각 Task 하나, basic·adv·layout·tip 추가는 한 Task)
4. 기존 글자상자 22장 다시 그리기
5. 공유 그림 12장 전용 그림
6. 기존 58장 x 채움과 나머지 공유 그림 36장 점검
7. 직접 조작 4장
8. 증상 색인
9. 글꼴·문서(PRODUCT/PLAN/DESIGN)·전체 점검

디렉터 검토는 세 번 받는다.
1. 이 설계서
2. 계획서
3. 구현 묶음: 도우미 / 카드 / 그림·문구마다

Critical·Important는 RED→GREEN으로 고친다. Minor는 기록했다가 마지막에 보고한다.

## 8. 점검과 완료 기준

자동 점검:
- `node tests/check.mjs`가 전부 통과하고 `LATER`가 비어 있다.
- 개수
  - 전체 카드 1,483개(1,428 + 55, `total`)
  - 증상 181개(169 + 12, `symcount`의 길이와 새 증상 목록 점검)
  - 다른 카테고리 개수는 그대로다.
  - 영문명 중복이 없고, 관련 용어·증상 대상이 모두 있다.
- PRODUCT.md 개수 표기가 실제와 같다.
- 직접 조작 4장: `init`이 있고, 결과 문장에 `aria-live`가 있고, 문장 갱신은 `psay`로 한다.
- 재생 버튼이 붙는 새 그림(`m:1`)에 움직이는 요소(`A` 클래스)가 있다.
- 프론트엔드 카테고리의 글자상자 그림이 0장이다(`REDRAWN`). 3.4의 12장은 공유 그림 키를 쓰지 않는다(`frontshared`).
- 프론트엔드 카테고리 모든 카드에 x가 있다. o:1이면 u가 있다.
- `devtools()`·`domtree()`가 한도를 넘거나 잘못된 입력을 받으면 오류를 던진다(새 점검).
- 읽히는 글의 기호 점검(`wsym`)을 front 카드에도 적용한다.

브라우저(playwright) 확인:
- 320/375/1280 세 폭과 reduced-motion에서 넘침 0, 11px 미만 글자 0, 콘솔 오류 0
- reduced-motion에서 자동 재생이 없고, 재생 버튼이 동작한다.
- 직접 조작 4장을 키보드로 조작할 수 있다.

그 밖:
- 디자인 품질: break-ui(`devtools()` 줄 40자·6줄, `domtree()` 8노드·깊이 4)로 보고, 필요하면 interfaces 계열 스킬을 쓴다.
- 완료 후 main 병합은 사용자 확인 뒤에 한다.
- 정의·설명의 사실은 Task마다 검색(MDN, React·Vue·Svelte·Angular·Next.js·Vite 공식 문서)으로 확인하고 출처를 원장에 남긴다.

## 9. 글꼴

새 문구에 Hahmlet 서브셋에 없는 글자가 있으면 font 점검이 실패한다. 주석에 쓴 글자도 포함된다.
- 문구를 모두 넣은 뒤(7장 9단계) 서브셋을 다시 만든다.
- 중간 Task에서는 없는 글자를 피하거나, 그 Task 안에서 서브셋을 갱신한다.

## 10. 위험

| 위험 | 대응 |
|---|---|
| 작업량이 커서(새 55장 + 다시 그리기 34장) 컨텍스트가 압축됨 | 원장(`.superpowers/sdd/…/progress.md`), 체크포인트 메모리, Task마다 커밋 |
| 프레임워크·빌드 도구 설명이 버전에 따라 바뀜 | 버전 숫자와 "가장 빠른·최신" 같은 단정을 쓰지 않고, 오래 바뀌지 않는 역할만 쓴다. 출처 확인일을 주석에 남긴다 |
| React 설명이 옛 방식(클래스 컴포넌트 생명주기)에 묶임 | Lifecycle은 "나타남 · 바뀜 · 사라짐" 흐름으로 쓰고, 함수 컴포넌트에서는 useEffect로 다룬다고 쓴다(React 공식 문서 확인) |
| `devtools()`가 특정 브라우저 화면을 흉내 냄 | 로고·색을 쓰지 않는 중립 모형, 공통 탭 이름만 사용 |
| 그림 속 코드가 실제로 틀림 | 그림 코드는 계획서에 그대로 적고 디렉터 검토 ③에서 문법을 점검한다 |
| 기존 r 연결이 다른 카테고리 카드를 가리킴 | r 값만 추가하고 그 카드 본문은 바꾸지 않음 |
