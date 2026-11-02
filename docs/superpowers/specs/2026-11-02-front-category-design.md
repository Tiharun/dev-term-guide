# 프론트엔드 카테고리 보강 (③ 기존 카테고리 3/12) 설계

- 날짜: 2026-11-02
- 관련 문서: [PLAN.md](../../PLAN.md), [DESIGN.md](../../../DESIGN.md), 앞 단계 [2026-11-02-web-category-design.md](2026-11-02-web-category-design.md)
- ③은 남은 12개 카테고리를 사이트 순서(basics → web → front → back → db → server → git → deploy → security → perf → bug → ai)로 하나씩 보강한다. 이 문서는 세 번째(front, 화면 이름 "프론트엔드")다.
- 진행 방식은 basics·web과 같다. 구현은 메인 세션이 하고, 설계서·계획서·구현 묶음 검토는 디렉터 에이전트(Opus 5.5, effort high)가 한다. 판단은 메인이 하고 원장에 남긴다.
- 디렉터 설계서 검토(1차, Critical 1·Important 11·Minor 10)를 반영한 판이다.

## 1. 목적과 성공 기준

Claude에게 화면을 만들어 달라고 하는 사람이 "우선순위가 밀려서 CSS가 안 먹어요", "이벤트가 부모로 올라가요", "key가 없어요", "빌드 도구" 같은 말을 **DOM 나무, 개발자 도구 창, 코드와 결과를 나란히 놓은 그림으로 바로 이해**하게 한다. 그리고 CSS 규칙, 이벤트, React, 빌드 도구까지 카드로 이어 준다.

성공 기준:
- 프론트엔드 카테고리가 하위항목 11개, 카드 125장(70 + 새 55)이 된다.
- 모든 카드에 x(헷갈림 칸)가 있다.
- front 카드의 객체 v가 0장이고, 새 카드와 다시 그린 카드는 모두 `u-front-` 키를 쓴다. 점검으로 막는다.
- 8장의 완료 기준을 모두 통과한다.

## 2. 범위

포함:
- 새 하위항목 4개: `css`(CSS 규칙), `event`(이벤트·데이터), `react`(React 더 보기), `build`(도구·빌드)
- 새 카드 55장(5장 목록). 정의 d와 x는 해요체로 쓰고, 그림은 모두 새로 그린다.
- 기존 58장에 x를 채운다. x가 이미 있는 12장은 빼고, 기존 d는 바꾸지 않는다.
  - 해요체 2~3문장으로 쓴다.
  - 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
- 기존 객체 v 22장을 다시 그린다(3.4).
- 뜻에 맞지 않는 공유 그림을 쓰던 14장을 전용 그림으로 바꾼다(3.5). 공유 그림 키 자체(`D['boxmodel']` 등)는 지우지 않는다. 다른 카테고리가 쓰는 키가 있고, boxmodel처럼 front만 쓰던 키도 이 작업에서는 정리하지 않는다.
- 그대로 두는 공유 그림 34장은 3폭·11px만 점검한다. 그중 transition([index.html:3914](../../../index.html))·shadow([index.html:3884](../../../index.html))는 읽히는 글의 "→"를 말로 바꾸거나 `aria-hidden`으로 숨긴다(`wsym` 확대 때문).
- 새 그림 도우미 `devtools()`·`domtree()`(3.1, 3.2)와 `ide()` 오류 줄 옵션(3.3)
- 직접 조작 4장: Specificity, Event Bubbling, Key, Visibility(3.6)
- 증상 색인 12개 추가(6장)
- 글꼴 서브셋, PRODUCT.md·PLAN.md·DESIGN.md의 개수·도우미 표기, 점검 기대값 갱신

제외:
- 다른 카테고리에 이미 있는 같은 뜻의 말(측정, 2026-11-02):
  - basics: Event·Event Listener·Promise·Async/Await·Immutability·Module·Callback·Closure·Event Loop·Framework·Library·Build·Hot Reload·Linter·Formatter
  - web: Hydration·Lazy Loading·Routing(화면 라우터)
  - design: Web Font·Alt Text·Tab Order·Form·Loading State·Design Token·Skeleton UI·Scroll Snap·Line Height·Letter Spacing·Font Weight·Opacity·Cursor Style·Responsive Image(srcset·sizes)
  - perf: Debounce·Throttle·Memoization·Code Splitting·Tree Shaking·Image Optimization·Will-change·GPU Acceleration·Repaint·Reflow·Minify
  - bug: Source Map·Text Overflow·Layout Shift·pointer-events
  - back: JSON·Environment Variable·Validation / server: Dev Server / test: Unit Test·E2E Test·Snapshot Test
- 이름만 같고 뜻이 다른 기존 카드(basics Inheritance = 객체 상속, ai Context = AI 맥락, net Router = 네트워크 기기)는 제외 사유가 아니다. 새 카드 CSS Inheritance·Context API가 x로 구분한다.
- 증상 "오류·안 됨" 칩 재검토. ③ 마지막 AI 이후 한 번에 한다.
- 헷갈림 칸 이름 변경, 기존 카드 이동, 다른 카테고리 카드 수정. r 연결만 예외다.

## 3. 그림 구조

### 3.1 `devtools()` — 개발자 도구 창 모형 (새로)

- `devtools({tab, dom, css, hl, con, net})`
  - `tab`: `'요소'`·`'콘솔'`·`'네트워크'` 중 하나. 위 탭 줄에 셋을 모두 그리고, 고른 탭에 밑줄과 굵은 글씨를 준다(색만으로 구분하지 않음). 탭 줄은 장식이라 `aria-hidden`이고 `role=tab`을 쓰지 않는다.
  - 탭별 필수 인자: 요소 → `dom`(필수)·`css`(선택)·`hl`(선택), 콘솔 → `con`(필수), 네트워크 → `net`(필수). 고른 탭의 필수 인자가 없거나, 다른 탭의 인자를 주면 오류다.
  - `dom`: 코드 줄 배열 1~6줄, 줄마다 `[깊이, 글]`(깊이 0~3)
  - `css`: 스타일 칸 줄 배열 0~4줄. 덮여서 안 쓰이는 줄은 `{t, off:1}`로 취소선과 "덮임" 글자를 함께 붙인다.
  - `hl`: 강조할 dom 줄 번호(0부터). 강조는 배경색과 "선택" 글자로 한다.
  - `con`: 콘솔 줄 배열 1~4줄. `{t, err:1}`이면 앞에 "오류" 글자를 붙인다.
  - `net`: 요청 줄 배열 1~4줄, 줄마다 `{name, status, type}`(예: `{name:'posts', status:200, type:'fetch'}`). 실패(400 이상)는 "실패" 글자를 붙인다.
- 한도(넘으면 오류): 코드 줄은 들여쓰기를 포함해 28자(ide와 같음, DESIGN.md:256), 스타일 줄 24자, 콘솔 줄 28자, 요청 이름 16자(한글은 2자로 센다). 이 한도는 320px 폭에서 가로 스크롤 없이 들어가게 정한 값이고, 계획서에서 break-ui로 다시 잰다.
- 좁은 그림판(320px)에서는 스타일 칸이 DOM 칸 아래로 내려간다.
- 탭 이름은 한국어로 쓴다. 브라우저마다 영어 이름이 다르다(Chrome은 Elements, Firefox는 Inspector·Page Inspector). DevTools 카드 x에 이 차이를 쓴다([MDN ElementsPanel](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/devtools/panels/ElementsPanel)).
- 특정 브라우저의 로고·색을 쓰지 않는 중립 모형이다.
- `.sr` 문장으로 "개발자 도구 요소 탭, n번째 줄 선택"(콘솔·네트워크는 줄 수와 오류·실패 수)을 읽어 준다.
- 대상(예): DevTools, Inspect Element, Specificity, Cascade, !important, Fetch(네트워크 탭), Error Boundary(콘솔 오류 줄)

### 3.2 `domtree()` — DOM 나무와 전파 경로 (새로)

- `domtree(nodes, {hl, path})`
  - `nodes`: `[깊이, 태그 이름, 꼬리표?]` 배열(2~8개, 깊이 0~4). 예: `[[0,'div'],[1,'ul'],[2,'li'],[3,'button','누른 곳']]`. 꼬리표에는 건네는 값(`title="공지"`)도 쓸 수 있다.
  - `hl`: 강조할 노드 번호 배열. 색과 굵은 테두리, 꼬리표 글자를 함께 쓴다.
  - `path`: 전파 경로 노드 번호 배열(1~6개). 첫 칸은 누른 노드이고, 다음 칸은 반드시 앞 칸의 부모다(아래에서 위로, 버블링). 캡처(위에서 아래) 방향은 쓰는 카드가 없어 넣지 않는다.
- 움직임: 경로의 k번째 노드는 `mk-rux{k}`(1~6, [index.html:385](../../../index.html))로 차례로 칠해진다(10s 주기, `A` 클래스). `still`이면 모두 칠해진 마지막 장면이다.
- 줄마다 들여쓰기와 이음선으로 부모·자식을 보여 준다. 그림 기호는 `aria-hidden`으로 숨긴다.
- 한도(넘으면 오류): 태그 이름 12자, 꼬리표 12자(한글은 2자로 센다). 320px 폭에서 깊이 4 + 태그 + 꼬리표가 한 줄에 들어가는 값이다.
- 입력 검사: 노드 수·깊이 범위, 첫 노드 깊이가 0이 아님, 깊이가 한 번에 2 이상 늘어남, 범위 밖 `hl`·`path`, 경로의 다음 칸이 부모가 아님, 한도 초과는 오류를 던진다.
- `.sr` 문장으로 "div 안에 ul, ul 안에 li, li 안에 button. 누른 곳 button에서 li, ul, div 순서로 전해져요"처럼 기호 없이 읽어 준다.
- 대상(예): Element, React(컴포넌트 나무), Props, Virtual DOM, Event Bubbling, Event Delegation, stopPropagation, Props Drilling, Context API, Portal

### 3.3 `ide()` 오류 줄 옵션 (확장)

- 지금 `ide()`([index.html:3804](../../../index.html))에는 밑줄·오류 글이 없다. 코드 줄을 `{t, err:'…'}`로 주면 그 줄에 물결 밑줄을 긋고, 바로 아래 줄에 "오류" 글자와 설명을 붙인다.
- 설명은 실제 도구 메시지가 아니면 끝에 "(풀어 쓴 말)"을 붙인다. 설명도 28자 한도를 지킨다.
- 기존 `ide()` 호출 결과는 바뀌지 않는다(점검으로 확인).
- 대상: TypeScript, Form Validation, JSX(닫지 않은 태그)

### 3.4 객체 v 22장 다시 그리기

| 카드 | 새 그림 |
|---|---|
| Tag | `pair`: `<button>보내기</button>` 코드 → 화면의 버튼 |
| Attribute | `pair`: `<img src="cat.png" alt="고양이 사진">`에서 속성 칸 강조 → 사진과 "대체 글: 고양이 사진" |
| Selector | `pair`: `.card h2 { color: … }` → 카드 안 제목만 칠해지고 "선택됨" 꼬리표, 카드 밖 제목은 그대로 |
| Class Name | `pair`: `class="btn"`인 요소 셋 → 같은 모양 단추 셋 |
| Display | 전용 HTML 네 칸(도우미 없음): block(한 줄 다 차지) · inline(글자 사이) · flex(안쪽을 나란히) · none(빈칸에 "사라짐" 글자). Inline vs Block 카드의 `vs`와 겹치지 않게 값 목록으로 그린다 |
| React | `domtree`: App 안에 Header · List, List 안에 Item. 바뀐 Item만 강조 |
| Props | `domtree`: 부모 Card 노드, 자식 Title 노드의 꼬리표 `title="공지"`, 아래 화면 제목 "공지" |
| Hook | `doc` 표: useState(값 기억) · useEffect(화면 밖 일) · useRef(요소 잡기, Ref 카드). 표 글자는 카드 이름과 맞춘다 |
| Virtual DOM | `vs`: 이전 나무와 새 나무(`domtree` 둘), 달라진 노드만 강조 → "바뀐 곳만 실제 화면에 반영" |
| TypeScript | `ide` 오류 줄: `price: number`에 `"삼천"`을 넣는 줄, 설명 "숫자 자리에 글자를 넣었어요(풀어 쓴 말)" |
| Bundler | `pair`: 왼쪽 파일 목록 a.js · b.js · style.css → 오른쪽 bundle.js · bundle.css. `flow`는 한 줄 2칸·갈래 없음이라 쓰지 않는다([index.html:3787](../../../index.html)) |
| Tailwind CSS | `pair`: `class="p-4 rounded-lg bg-blue-600"` → 꾸며진 상자 |
| Container | `browser`: 가운데 최대 폭 상자, 양옆 남는 여백에 이름 |
| Full Width | `vs`: 컨테이너 안(양옆 여백) vs 화면 끝까지 꽉 찬 띠 |
| px | 눈금자 위 16px 상자. 아래 "글자 크기 설정을 키워도 그대로" |
| rem | `track`: 루트 글자 16px(기본값) → 1rem = 16px, 2rem = 32px. 설정을 20px로 키우면 2rem = 40px |
| em | 겹친 상자 셋(font-size 기준): 부모 20px 안의 1.5em = 30px, 그 안 1.5em = 45px(누적) |
| fr | 칸 셋 `1fr 2fr 1fr`, 폭 비율 1 : 2 : 1과 숫자(예시) |
| CSS Variable | `pair`: `--brand` 한 줄 → 단추·링크·제목 세 곳이 같은 색 |
| Semantic HTML | `vs`: div만 쓴 화면(이름 없음) vs header · nav · main · footer 이름표 |
| DevTools | `devtools`: 요소 탭, 선택 줄과 스타일 칸 |
| Polyfill | `track`: 옛 브라우저에 기능 없음 → 폴리필이 채움 → 같은 코드가 동작 |

### 3.5 공유 그림 14장을 전용 그림으로

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
| Object Fit | aspect | 같은 사진을 같은 상자에 fill · contain · cover로 넣은 세 칸(찌그러짐·여백·잘림 글자) |
| clamp() | fontsize | 화면 폭 세 단계에서 제목 크기가 최소값 · 가운데 값 · 최대값에 머무는 막대(값은 예시) |

공통 규칙(DESIGN.md):
- 그림 글자는 11px 이상이다.
- 그림 속 숫자는 예시로 표시한다.
- 320/375/1280 세 폭에서 넘침이 없어야 한다.
- 상태를 색만으로 구분하지 않는다.
- 읽히는 글에 화살표·체크 기호를 쓰지 않는다(`wsym`·`symcss` 점검과 같은 규칙).
- 키 이름은 `u-front-<slug>`다(예: `u-front-specificity`). 기존 `u-` 키와 겹치지 않는다.

### 3.6 새 카드 그림

새 55장은 기존 도우미(`pair`·`vs`·`flow`·`track`·`doc`·`net`·`browser`·`ide`·`term`)와 `devtools`·`domtree`로 그린다. 도우미가 못 그리는 장면은 전용 HTML로 그린다. 하위항목별 기본 도구는 다음과 같다. 카드별 배정은 계획서에서 정한다.
- css: `pair`·`devtools`
- event: `domtree`·`browser`·`net`
- react: `domtree`·`ide`·`flow`
- build: `pair`·`ide`·`term`·`doc` 표
- adv의 프레임워크 4장: 같은 카운터(누르면 1씩 늘어남)를 각 문법으로 쓴 `ide` 한 장씩. 회사 로고는 쓰지 않는다.
  - 기준 문법: Vue 3 `<script setup>` + `ref`, Svelte 5 룬(`$state`), Angular 단독(standalone) 컴포넌트 + `signal`, Next.js는 React 컴포넌트를 파일 경로(`app/page`)에 둔 모습.
  - 계획서에서 공식 문서로 다시 확인하고 확인일을 주석에 남긴다. 28자·8줄에 안 들어가면 핵심 줄만 남기고 생략한 줄은 "…"으로 표시한다.

직접 조작 4장:
- Specificity: 같은 제목에 걸린 규칙 셋(`h2` · `.title` · `#main`)을 각각 켜고 끌 수 있다(여러 개 가능). 켠 규칙 중 우선순위가 가장 높은 것이 이기고 그 색이 된다. 모두 끄면 기본 글자색이고 "규칙 없음"이다. 결과 문장에 이긴 이유("아이디가 클래스보다 우선")를 쓴다. 단계가 모두 달라서 동점은 없다.
- Event Bubbling: 처리기는 button · li · ul에 하나씩 달려 있다. 누를 곳(button · li)을 고르고, "li에서 전파 막기(stopPropagation)"를 켜고 끌 수 있다. `domtree` 경로와 "반응한 곳: button, li" 같은 문장이 바뀐다.
- Key: key 있음·없음을 고르고 "맨 앞에 추가"를 누르면 입력값이 제자리에 남는지 엉뚱한 줄로 가는지 보여 준다. 다시 누르면 처음 목록으로 돌아간다.
- Visibility: display:none · visibility:hidden · opacity:0 중 하나를 고르면 자리 남음·클릭 가능 여부가 표로 바뀐다.

## 4. 데이터와 배치

- `CAT('front', …)`([index.html:1667](../../../index.html))의 추가 하위항목 배열에서 `unit` 뒤에 다음 넷을 넣는다. 공통 `tip`(추천 개념)은 마지막에 그대로 둔다. 기존 카드 번호는 바뀌지 않고 tip 카드 번호만 뒤로 밀린다(web과 같음).
  - `['css','CSS 규칙','어떤 스타일이 이기고 어떻게 숨기는지 정하는 규칙']`
  - `['event','이벤트·데이터','누르고 입력한 것을 받고 데이터를 가져오는 말']`
  - `['react','React 더 보기','React로 화면을 만들 때 자주 듣는 말']`
  - `['build','도구·빌드','코드를 브라우저가 읽는 파일로 바꾸는 도구']`
- 카드 형식 `{en,ko,d,x,p,r,l,o,u,v}`는 그대로다. o:1은 1차 출처가 있을 때만 쓰고, 그때 u를 단다.
- r은 이미 있는 같은 뜻·짝 카드에만 단다. 후보:
  - Specificity↔Selector·Cascade, !important↔Specificity, Pseudo-class↔Hover·Focus, Pseudo-element↔Selector, CSS Inheritance↔Cascade
  - Display None↔Display·Visibility, Visibility↔pointer-events, Inline vs Block↔Display, CSS Reset↔Margin
  - Event Bubbling↔Event Listener·stopPropagation, Event Delegation↔Event Bubbling, preventDefault↔Form, Input Event↔Event Listener
  - Form Validation↔Validation, Controlled Input↔State·useState, Fetch↔JSON·Async/Await
  - JSX↔React, useState↔Hook·State, useEffect↔Hook, Key↔List Rendering, Ref↔Hook, Props Drilling↔Props·Context API, Context API↔State Management, Redux↔State Management, State↔Immutability
  - Vite↔Bundler·Dev Server, Webpack↔Bundler, Babel↔Transpile·Polyfill, ES Module↔Module, Sass↔CSS Variable, PostCSS↔Vendor Prefix, CSS Modules↔Class Name, CSS-in-JS↔Tailwind CSS, Storybook↔Component
  - Vue·Svelte·Angular↔React·Framework, Next.js↔React·SSR, Container Query↔Media Query·Responsive Image, ARIA↔Semantic HTML, SVG↔Canvas
- 뜻이 다른 짝은 r 없이 x 안에서만 구분한다(`FB_WRONG` 점검):
  - Key vs basics의 Key-Value·back의 API Key
  - Input Event vs basics의 Event(일반 개념이라 r은 Event Listener로)
  - CSS Inheritance vs basics의 Inheritance(객체 상속)
  - Context API vs ai의 Context(AI 맥락)
  - Lifecycle vs mobile의 App Lifecycle(앱 전체가 켜지고 꺼지는 흐름)
- 점검 기대값:
  - `COUNT`에 `front/*` 11개
  - `EXPECT`에 새 카드 영문명
  - `REDRAWN`에 front 하위항목 11개. 지금 `REDRAWN`은 flow·big·stack만 막으므로([tests/check.mjs:134](../../../tests/check.mjs)) 새 점검 `fobj`로 front 카드의 객체 v 0장을 따로 막는다.
  - 새 점검 `fukey`: 새 55장과 다시 그린 36장의 v가 `u-front-`로 시작하고 `D`에 있다.
  - 새 점검 `fcat`: front 하위항목 순서가 `basic,core,motion,adv,layout,unit,css,event,react,build,tip`이다(web `wcat`과 같은 방식).
  - `dup` 강화: 영문명을 소문자로 바꾸고 공백·`/`·`-`·`.`을 지운 정규화 이름으로도 중복을 잡는다(Async/Await와 async / await 같은 경우).

## 5. 용어 목록 (새 55장)

`▶`는 직접 조작이다. 측정: 아래 영문명은 기존 카드 1,428장과 정규화 이름(4장 `dup` 강화 방식)으로도 같지 않다(2026-11-02 대조). 디렉터 검토에서 같은 뜻으로 확인돼 뺀 것: async / await(basics Async/Await), Pointer Events(bug pointer-events), Immutable(basics Immutability), srcset(design Responsive Image), Cursor(design Cursor Style). 대신 Input Event, CSS Inheritance, Context API, Container Query, Float를 넣었다.

| 하위항목 | 새 카드 |
|---|---|
| basic (2) | SVG, Canvas |
| adv (4) | Vue, Svelte, Angular, Next.js |
| layout (1) | Container Query |
| css (12) | Specificity▶, Cascade, CSS Inheritance, Pseudo-class, Pseudo-element, !important, CSS Reset, Inline vs Block, Display None, Visibility▶, Float, Vendor Prefix |
| event (10) | Event Bubbling▶, Event Delegation, preventDefault, stopPropagation, Input Event, Keyboard Event, Form Validation, Controlled Input, Two-way Binding, Fetch |
| react (15) | JSX, useState, useEffect, Key▶, Ref, Fragment, Portal, Props Drilling, Context API, State Management, Redux, Lifecycle, Conditional Rendering, List Rendering, Error Boundary |
| build (10) | Vite, Webpack, Babel, Transpile, ES Module, Sass, PostCSS, CSS Modules, CSS-in-JS, Storybook |
| tip (1) | ARIA |

하위항목별 개수: basic 11, core 14, motion 10, adv 13, layout 13, unit 8, css 12, event 10, react 15, build 10, tip 9.

x로 구분할 짝(뜻이 가까움):
- Specificity vs Cascade vs !important, CSS Inheritance vs Cascade
- Pseudo-class vs Pseudo-element
- Display None vs Visibility vs Opacity(design)
- Inline vs Block vs Display
- Float vs Flexbox
- Event Bubbling vs Event Delegation. focus처럼 버블링하지 않는 이벤트도 있다고 쓴다
- preventDefault vs stopPropagation
- Input Event(입력할 때마다) vs change(입력을 마쳤을 때)
- Form Validation(브라우저에서 먼저) vs Validation(서버에서 다시)
- Controlled Input vs Two-way Binding
- Fetch vs Async/Await(basics)
- useState vs Ref
- useEffect vs Lifecycle
- Props Drilling vs Context API vs State Management vs Redux
- Conditional Rendering vs Display None
- Vite vs Webpack vs Bundler
- Babel vs Transpile vs Polyfill
- ES Module vs Module(basics). CommonJS(`require`)와 `type="module"` 차이를 쓴다
- Sass vs PostCSS vs CSS Variable
- CSS Modules vs CSS-in-JS vs Tailwind CSS
- Next.js vs React
- SVG vs Canvas
- Container Query vs Media Query
- ARIA vs Semantic HTML(먼저 알맞은 태그를 쓰고, 모자랄 때 ARIA)

## 6. 증상 색인 (12개)

기존 169개와 대조했다. 이미 있어 뺀 것:
- "하얀 화면만 나와요"
- "사진 때문에 페이지가 무거워요"
- "import 했는데 못 찾는대요"
- "await를 썼는데 기다리지 않아요"
- "배열을 바꿨는데 다른 변수도 같이 바뀌었어요"
- "버튼이 안 눌려요"([index.html:3517](../../../index.html), 투명한 상자·pointer-events를 이미 다룸)

같은 이유로 "작은 부분 하나가 고장 나서 화면 전체가 사라져요"(하얀 화면과 비슷함)도 뺐다. 계획서에서 문구를 다시 대조하고, 겹치면 대체 증상("글자를 세 줄까지만 보여 주고 싶어요"는 bug Text Overflow와 겹치는지 먼저 확인)을 넣는다.

| 증상 | 그룹 | 연결 카드 |
|---|---|---|
| CSS를 고쳤는데 적용이 안 돼요 | 오류·안 됨 | Specificity, Cascade, Inspect Element |
| 안쪽 버튼을 눌렀는데 바깥 상자도 같이 반응해요 | 반응·클릭 | Event Bubbling, stopPropagation |
| 버튼을 누르면 페이지가 새로고침돼요 | 반응·클릭 | preventDefault, Form |
| 입력칸에 글자가 안 쳐져요 | 반응·클릭 | Controlled Input, useState |
| 같은 요청이 끝없이 반복돼요 | 오류·안 됨 | useEffect, Re-render |
| 목록 순서를 바꾸면 입력값이 엉뚱한 줄에 남아요 | 오류·안 됨 | Key, List Rendering |
| 값을 바꿨는데 화면이 그대로예요 | 오류·안 됨 | Immutability, State, useState |
| props를 여러 단계로 계속 넘기고 있어요 | 오류·안 됨 | Props Drilling, Context API, State Management |
| 스크린 리더가 버튼을 이상하게 읽어요 | 오류·안 됨 | ARIA, Semantic HTML |
| 숨겼는데 빈자리가 그대로 남아요 | 위치·간격 | Visibility, Display None |
| 브라우저마다 기본 여백이 달라요 | 위치·간격 | CSS Reset |
| 옛 브라우저에서 새 문법이 안 돼요 | 오류·안 됨 | Transpile, Babel, Polyfill |

## 7. 진행 순서

범위가 web의 약 1.4배(새 55장, 다시 그리기 36장, 도우미 2개와 확장 1개)라서 계획서를 둘로 나눈다. 두 계획서 모두 이 브랜치(`front-category`)에서 이어서 하고, main 병합은 둘이 끝난 뒤 한 번 한다.

계획서 ①(도우미·CSS·이벤트·다시 그리기):
1. `devtools()`·`domtree()`·`ide()` 오류 줄과 입력 검사 점검
2. 하위항목 4개, 점검 기대값(`fcat`·`fobj`·`fukey`·`dup` 강화. 아직 안 끝난 항목은 `LATER`)
3. css·event 새 카드 22장
4. 객체 v 22장 다시 그리기
5. 공유 그림 14장 전용 그림, transition·shadow 기호 정리
6. 직접 조작 Specificity·Event Bubbling·Visibility

계획서 ②(React·빌드·나머지):
1. react·build 새 카드 25장
2. basic·adv·layout·tip 추가 8장
3. 기존 58장 x 채움과 나머지 공유 그림 34장 점검
4. 직접 조작 Key
5. 증상 색인
6. 글꼴·문서(PRODUCT/PLAN/DESIGN)·전체 점검, `LATER` 비우기

디렉터 검토:
1. 이 설계서(완료, 반영함)
2. 계획서 ①·②
3. 구현 묶음: 도우미 / 카드 / 그림·문구마다

Critical·Important는 RED→GREEN으로 고친다. Minor는 기록했다가 마지막에 보고한다.

## 8. 점검과 완료 기준

자동 점검:
- `node tests/check.mjs`가 전부 통과하고 `LATER`가 비어 있다(계획서 ② 끝).
- 개수
  - 전체 카드 1,483개(1,428 + 55, `total`)
  - 증상 181개(169 + 12, `symcount`의 길이와 새 증상 목록 점검)
  - 다른 카테고리 개수는 그대로다.
  - 영문명 중복이 없고(정규화 비교 포함), 관련 용어·증상 대상이 모두 있다.
- PRODUCT.md 개수 표기가 실제와 같다.
- 직접 조작 4장: `init`이 있고, 결과 문장에 `aria-live`가 있고, 문장 갱신은 `psay`로 한다.
- 재생 버튼이 붙는 새 그림(`m:1`)에 움직이는 요소(`A` 클래스)가 있다.
- front 카드의 객체 v가 0장이다(`fobj`). 새 카드·다시 그린 카드는 `u-front-` 키를 쓴다(`fukey`). 하위항목 순서가 맞다(`fcat`).
- 뜻이 다른 짝(4장 목록)에는 r이 없다(`FB_WRONG`).
- 프론트엔드 카테고리 모든 카드에 x가 있다. o:1이면 u가 있다.
- `devtools()`·`domtree()`·`ide()` 오류 줄이 한도를 넘거나 잘못된 입력을 받으면 오류를 던진다(새 점검). 기존 `ide()` 출력은 그대로다.
- 읽히는 글의 기호 점검(`wsym`)을 front 카드 전체(공유 그림 포함)에 적용한다.

브라우저(playwright) 확인:
- 320/375/1280 세 폭과 reduced-motion에서 넘침 0, 11px 미만 글자 0, 콘솔 오류 0
- reduced-motion에서 자동 재생이 없고, 재생 버튼이 동작한다.
- 직접 조작 4장을 키보드로 조작할 수 있다.

그 밖:
- 디자인 품질: break-ui(`devtools()` 28자·6줄, `domtree()` 8노드·깊이 4·꼬리표 12자)로 보고, 필요하면 interfaces 계열 스킬을 쓴다.
- 완료 후 main 병합은 사용자 확인 뒤에 한다.
- 정의·설명의 사실은 Task마다 검색(MDN, React·Vue·Svelte·Angular·Next.js·Vite 공식 문서)으로 확인하고 출처를 원장에 남긴다.

## 9. 글꼴

새 문구에 Hahmlet 서브셋에 없는 글자가 있으면 font 점검이 실패한다. 주석에 쓴 글자도 포함된다.
- 문구를 모두 넣은 뒤(계획서 ② 6단계) 서브셋을 다시 만든다.
- 중간 Task에서는 없는 글자를 피하거나, 그 Task 안에서 서브셋을 갱신한다.

## 10. 위험

| 위험 | 대응 |
|---|---|
| 작업량이 커서 컨텍스트가 압축됨 | 계획서 둘로 나눔, 원장(`.superpowers/sdd/…/progress.md`), 체크포인트 메모리, Task마다 커밋 |
| 프레임워크·빌드 도구 설명이 버전에 따라 바뀜 | 버전 숫자와 "가장 빠른·최신" 같은 단정을 쓰지 않고, 오래 바뀌지 않는 역할만 쓴다. 그림 문법은 3.6 기준이고 확인일을 주석에 남긴다 |
| React 설명이 옛 방식(클래스 컴포넌트 생명주기)에 묶임 | Lifecycle은 "나타남 · 바뀜 · 사라짐" 흐름으로 쓰고, 함수 컴포넌트에서는 useEffect로 다룬다고 쓴다(React 공식 문서 확인) |
| `devtools()`가 특정 브라우저 화면을 흉내 냄 | 로고·색을 쓰지 않는 중립 모형, 한국어 탭 이름 |
| 그림 속 코드가 실제로 틀림 | 그림 코드는 계획서에 그대로 적고 디렉터 검토 ③에서 문법을 점검한다 |
| 같은 뜻 카드가 다른 이름으로 또 생김 | `dup` 정규화 비교, 계획서마다 다른 카테고리 d와 대조 |
| 기존 r 연결이 다른 카테고리 카드를 가리킴 | r 값만 추가하고 그 카드 본문은 바꾸지 않음 |
