# 프론트엔드 카테고리 보강 실행 계획 ①

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 프론트엔드에 다음을 넣는다.
- 새 그림 도우미 `devtools()`·`domtree()`와 `ide()` 오류 줄
- 하위항목 4개, css·event 새 카드 22장
- 객체 v 22장, 공유 그림 14장 다시 그리기
- 직접 조작 3장(Specificity·Event Bubbling·Visibility)

남은 일(react·build 카드, x 채움, Key, 증상, 글꼴·문서)은 계획서 ②가 한다.

**Architecture:** `index.html` 하나에서 작업한다.
- 도우미는 `ide`·`mem`·`serp` 뒤, `/* 직접 조작 도우미 … */`([index.html:3853](../../../index.html)) 앞에 둔다.
- 카드는 `T('front', …)` 블록(2399~2468줄)에 넣는다.
- 그림은 `const visual`(7072줄) 앞에 `/* front: <sec> … */` 주석 + `Object.assign(D, {...})`로 더한다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP

**Spec:** [docs/superpowers/specs/2026-11-02-front-category-design.md](../specs/2026-11-02-front-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치**: `front-category`(지금 브랜치)에서 계속한다. 계획서 ②도 같은 브랜치다.
- **클래스 접두사**: `devtools` = `mk-dv*`, `domtree` = `mk-dt*`, ide 오류 줄 = `mk-cdw`(물결 줄)·`mk-cdem`(오류 설명 줄).
  - 측정: `mk-dv`·`mk-dt`·`mk-cde` 모두 0건이다.
  - 실패 색은 track의 fail 상태와 같은 `var(--mark-text)`를 쓴다(측정 407줄).
- **D 키**: `'u-front-' + slug(en)`. slug(3649줄)는 앞뒤 `-`를 지운다. 예: `!important` → `u-front-important`, `Display None` → `u-front-display-none`.
  - 기존 `u-frontend`(basics)와 헷갈리지 않게 점검은 `startsWith('u-front-')`로 본다.
- **COUNT 키**: 접두사 없는 키(`basic` 등)는 design 카테고리다. front는 `front/<sec>`로 쓴다.
- **LATER 사용**:
  - Task 2에서 아직 못 지키는 점검은 `LATER`에 넣는다. 빼는 시점: `fobj`와 `redrawn:front/core·adv·unit·tip`는 Task 4, `fukey`·`fsym`은 Task 5.
  - `fx`(x 빠짐)는 계획서 ②에서 뺀다.
  - `font`도 web과 같이 `LATER`에 둔다. 스펙 9장은 중간 Task에 "피하거나 갱신"이라 했지만, 서브셋 재생성은 계획서 ② 6단계 한 번으로 모은다. 그 사이 없는 글자는 대체 글꼴로 보일 뿐이다.
- **r 시점**: 같은 Task와 앞 Task 카드만 단다. 계획서 ②의 카드(useState·PostCSS 등)를 가리키는 r은 그 카드를 넣을 때 단다. 예: Controlled Input의 `useState`, Vendor Prefix↔PostCSS.
- **직접 조작 시점**: Task 3에서 세 카드의 멈춘 그림을 먼저 만들고, Task 6에서 같은 키에 `init`과 버튼을 붙인다.
- **dom 들여쓰기**: `devtools`의 dom 줄은 깊이당 2칸이다. 28자 한도는 `wlen(글) + 2 × 깊이`로 센다.
- **domtree 부모**: 노드 i의 부모는 i보다 앞에서 가장 가까운, 깊이가 하나 작은 노드다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN은 쓰지 않는다.
- 색은 도판 토큰(`--ink`·`--plate`·`--fig`·`--rule`·`--muted`·`--mark`·`--mark-bg`·`--mark-text`·`--ok`·`--mono`·`--sans`)만 쓴다. hex 값을 새로 쓰지 않는다.
- 그림 글자는 11px 이상이다. `.fig`에는 그림자를 넣지 않는다.
- 자동 애니메이션은 클래스 `A`를 쓴다. 주기 10s, 멈춘 장면은 `-8.8s`다. 움직이는 그림은 `m:1`이다.
- 상태는 색만으로 나누지 않는다(글자 "선택"·"덮임"·"오류"·"실패"·"k번째"를 함께 쓴다).
- 읽히는 글에 `✓✕★→←↑↓`를 쓰지 않는다(`wsym` 규칙). 그림 속 숫자는 "(예시)"로 표시한다. 회사 로고·색은 쓰지 않는다.
- 카드 문구:
  - 새 카드 `d`·`x`는 해요체다. `x`는 2~3문장이고, 짝이 있으면 차이를 먼저 쓴다.
  - `p`: "~해줘" 지시문에 정식 용어를 넣는다. `l`: 1~3.
  - `ko`는 기존 front 형식(`한글 · 풀이`)을 따른다.
- `r`은 1~3개이고, 스펙 4장 후보 중 이미 있는 카드만 단다. 다른 카테고리 카드 본문은 바꾸지 않는다.
- `o:1`은 MDN 같은 1차 출처를 직접 열어 확인했을 때만 쓴다. 그때 `u`(`MDN('…')`)를 단다. 출처는 원장에 적는다.
- 커밋:
  - 한국어 `feat:`/`fix:`/`docs:`로 쓰고 attribution 줄을 넣지 않는다.
  - `.impeccable/hook.cache.json`·`core375.png`는 스테이징하지 않는다. 경로를 지정해서 올리고 `git add -A`·`-a`는 쓰지 않는다.
- Python은 `newline='\n'`로 쓰고 `python -E`로 돌린다. 정규식이 든 스크립트는 heredoc이 아니라 Write 도구로 쓴다.
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필·저장된 로그인은 쓰지 않고, `state save` 파일도 만들지 않는다.

## Review Focus

1. **320px의 긴 줄**: `devtools`에 28자 dom 줄 6개(깊이 3)와 24자 스타일 줄 4개를 넣어도 가로 넘침이 없어야 하고, 스타일 칸은 DOM 칸 아래로 내려가야 한다. `domtree`는 깊이 4 + 태그 12자 + 꼬리표 12자가 한 줄에 들어가야 한다. → Task 1 브라우저 확인(시험 그림 `u-front-test`를 임시로 띄우고 커밋 전에 지움)
2. **reduced-motion에서 전파 경로**: 움직임을 끄면 경로 칩 "k번째"가 모두 보여야 한다(빈 경로로 멈추면 안 됨). → Task 1·3 브라우저 확인
3. **ide 오류 줄과 줄 번호·강조 띠**: 오류 설명 줄 뒤 코드 줄 번호가 하나 밀리면 안 되고, 강조 띠는 오류 줄만큼 내려가야 한다. 오류 없는 기존 호출 결과는 그대로다. → Task 1 `fhelp`(`value="3"`, `--l:4`)
4. **직접 조작 끝 경우**: Specificity에서 모두 끄기·모두 켜기, 같은 버튼 두 번 누르기, Event Bubbling에서 li를 누르고 전파 막기를 켠 경우, Tab·Enter·Space 조작에서 오류가 없어야 한다. 결과 문장은 `psay`로 다시 읽힌다. → Task 6 `fdm`·`fdmrun`, 브라우저 확인
5. **자주 틀리는 사실**:
   - `visibility:hidden`은 자리가 남고 클릭이 안 된다. `opacity:0`은 자리가 남고 클릭되며 화면 낭독기도 읽는다. `display:none`은 자리도 없고 낭독기도 안 읽는다.
   - `focus`는 버블링하지 않고 `focusin`은 한다.
   - `!important`는 명시도와 상관없이 일반 선언을 이긴다.
   - CSS 상속은 `color`·`font` 같은 글자 속성만 물려받고 `border`·`margin`은 물려받지 않는다.

   MDN과 다르면 안 된다. → Task 3 출처 확인, 디렉터 검토 ③ 묶음 B

---

## 공통 절차 (Task 3~5)

1. **실패하는 점검 추가**(`tests/check.mjs`): 그 Task가 적은 기대값을 먼저 넣는다.
2. **실패 확인**: `node tests/check.mjs` → Task가 적은 `FAIL` 줄이 나온다.
3. **사실 확인**: 카드마다 1차 출처(MDN 우선)를 열어 확인하고, 원장에 `Task N 출처: <en> — <URL>`을 적는다.
4. **데이터·그림**: Task 표대로 넣는다.
5. **점검 통과**: `node tests/check.mjs` → `FAIL` 줄 없이 `OK <수>`. `LATER`는 그 시점에 남아 있어야 할 것만 있다.
6. **브라우저 확인**(아래 절차)
7. **커밋**: Task가 적은 메시지로 커밋하고, 원장 갱신을 같은 호출에서 한다.

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/front/<sec>`
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**
  - 페이지: `document.documentElement.scrollWidth <= innerWidth` → `true`
  - 그림 안: `[...document.querySelectorAll('#view .fig .stage *')].filter(s => s.scrollWidth > s.clientWidth + 1 && getComputedStyle(s).overflow !== 'visible')` → `[]`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900, 375×812, 320×700에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)
- **reduced-motion**: `browser_emulate_media({reducedMotion:'reduce'})` 뒤 새로고침한다. 자동 재생이 없고, 재생 버튼이 동작해야 한다.

### 디렉터 검토 ③ 시점

같은 디렉터 에이전트(Opus 5.5, effort high)에게 SendMessage로 맡긴다. 압축 뒤라 ID를 모르면 새로 띄운다.
- **묶음 A — 도우미**: Task 1 뒤
- **묶음 B — 새 카드**: Task 3 뒤
- **묶음 C — 그림·조작**: Task 6 뒤(Task 4~6 diff)

결과 처리:
- Critical·Important는 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN). 원장에 `Review <묶음>: fixed …`로 적는다.
- Minor는 `Review <묶음>: minor (deferred): …`로 적고, 계획서 ② 끝에서 함께 처리한다.

---

### Task 1: 도우미 `devtools()`·`domtree()`·`ide()` 오류 줄

쓸 스킬: superpowers:test-driven-development, break-ui(시험 그림)

**Files:**
- Modify: `index.html`
  - ide(3804줄)
  - 새 도우미: ide·mem·serp 뒤
  - CSS: ide CSS(418~422줄) 뒤
  - 넓은 그림 목록(506줄)에 `.mk-dv`·`.mk-dt` 추가
- Modify: `tests/check.mjs`: `base` 뒤에 `fhelp`
- Modify: `DESIGN.md`: 도우미 표에 두 줄, ide 줄에 `err`

**Interfaces:**
- Produces:
  - `devtools({tab, dom, css = [], hl, con, net, label} = {}) → string`
    - 바깥: `<div class="mk-dv">`. `label`이 있으면 `role="group" aria-label`.
    - 탭 줄: `<div class="mk-dvt" aria-hidden="true">`에 `<span>` 셋(요소·콘솔·네트워크). 고른 탭은 `class="on"`(밑줄 + 굵게).
    - 요소 탭: `<div class="mk-dvg">`(container `dv`)에 두 칸.
      - DOM 칸: `<ol class="mk-dvd">`. 줄은 `<li style="--d:깊이">`이고, 선택 줄은 `class="mk-dvon"` + `<b class="mk-dvk">선택</b>`.
      - 스타일 칸: `<ul class="mk-dvs">`. 덮인 줄은 `class="mk-dvoff"`(취소선) + `<b class="mk-dvk">덮임</b>`.
      - `@container dv (max-width:380px)`에서 스타일 칸이 아래로 간다.
    - 콘솔 탭: `<ul class="mk-dvc">`. 오류 줄은 `class="mk-dverr"`이고 맨 앞에 `<b class="mk-dvk">오류</b>`.
    - 네트워크 탭: `<table class="mk-dvn">`, 머리 `이름 · 상태 · 종류`. 400 이상은 `class="mk-dvf"`이고 상태 칸에 `<b class="mk-dvk">실패</b>`.
    - 끝에 `<p class="sr">`. 문장은 아래 셋 중 하나다.
      - 요소: `개발자 도구 요소 탭, ${hl+1}번째 줄 선택`(hl이 없으면 `개발자 도구 요소 탭, ${n}줄`), 덮인 줄이 있으면 뒤에 `, 덮인 규칙 ${k}개`
      - 콘솔: `개발자 도구 콘솔 탭, ${n}줄, 오류 ${e}개`
      - 네트워크: `개발자 도구 네트워크 탭, 요청 ${n}개, 실패 ${f}개`
    - 줄 글은 모두 `esc`를 거친다.
    - 오류 메시지는 `'devtools: '`로 시작한다.
  - `domtree(nodes = [], {hl = [], path = [], still = false, label} = {}) → string`
    - 바깥: `<div class="mk-dt">`. 목록 `<ol class="mk-dtl" aria-hidden="true">`.
    - 줄: `<li class="mk-dtn" style="--d:깊이">`. 안에 `<i class="mk-dtj">`(이음선), `<code>&lt;태그&gt;</code>`, 꼬리표 `<span class="mk-dtg">`.
    - 강조: `hl` 노드는 `mk-dthl`(굵은 테두리 + `--mark-bg`). 꼬리표가 없으면 꼬리표 자리에 "강조"를 쓴다.
    - 경로: path의 k번째(1부터) 노드에 `<span class="mk-dtw${still ? '' : ` mk-rux${k} A`}">${k}번째</span>`. `mk-dtw`는 `--mark` 배경 칩이다.
    - 요약 `<p class="sr">`:
      - 포함 관계: 깊이 1 이상 노드마다 `${부모 태그} 안에 ${태그}${꼬리표 ? `(${꼬리표})` : ''}`를 `, `로 잇고 `.`
      - path가 있으면 뒤에 ` 누른 곳 ${태그0}에서 ${나머지 태그 ', '} 순서로 전해져요`. path가 1칸이면 ` 누른 곳 ${태그0}에서만 반응해요`.
    - 오류 메시지는 `'domtree: '`로 시작한다.
  - `ide(code, steps, opts)` 확장:
    - 코드 줄은 문자열 또는 `{t, err}`다. 한도는 `wlen(t) ≤ 28`이고, `err`도 비어 있지 않은 문자열로 `wlen ≤ 28`이다.
    - `{t, err}` 줄은 `<li><code class="mk-cdw">t</code></li>`로 그리고, 바로 뒤에 `<li class="mk-cdem"><b>오류</b> ${esc(err)}</li>`를 붙인다(`list-style:none`, 높이 20px).
    - 오류 줄 뒤 코드 li는 `value="실제 줄 번호"`를 단다.
    - 강조 띠 `--l`은 `l + (l보다 앞 줄의 오류 줄 수)`다.
    - 오류 없는 호출의 출력은 한 글자도 바뀌지 않는다.

- [ ] **Step 1: 실패하는 점검 `fhelp` 쓰기**

`check('base', …)` 바로 뒤에 둔다. 형식은 `base`와 같은 `vm.runInContext` 문자열이다.

```js
check('fhelp', () => vm.runInContext(`(() => {
  const bad = [], no = (f, w) => { try { f(); bad.push('안 막음 ' + w); } catch (e) { if (!/^(devtools|domtree|ide): /.test(e.message)) bad.push(w + ' 메시지'); } };
  const has = (h, a, w) => a.forEach(x => { if (!h.includes(x)) bad.push(w + ' 없음: ' + x); });
  const dv = devtools({tab:'요소', dom:[[0, '<div id="main">'], [1, '<h2 class="title">']], css:['#main h2 { color: red }', {t:'h2 { color: blue }', off:1}], hl:1});
  has(dv, ['class="mk-dvt" aria-hidden="true"', '<span class="on">요소</span>', 'mk-dvon', '선택', 'mk-dvoff', '덮임', '&lt;div id=&quot;main&quot;&gt;',
    '<p class="sr">개발자 도구 요소 탭, 2번째 줄 선택, 덮인 규칙 1개</p>'], 'dv요소');
  has(devtools({tab:'요소', dom:[[0, 'a']], hl:0}), ['1번째 줄 선택'], 'dv hl0');
  has(devtools({tab:'콘솔', con:['불러옴', {t:'posts is not defined', err:1}]}), ['<span class="on">콘솔</span>', 'mk-dverr', '오류', '개발자 도구 콘솔 탭, 2줄, 오류 1개'], 'dv콘솔');
  has(devtools({tab:'네트워크', net:[{name:'posts', status:200, type:'fetch'}, {name:'users', status:404, type:'fetch'}]}), ['mk-dvf', '실패', '404', '개발자 도구 네트워크 탭, 요청 2개, 실패 1개'], 'dv네트워크');
  const d1 = [[0, 'a']], w29 = 'x'.repeat(29);
  no(() => devtools({tab:'소스', dom:d1}), '탭 이름'); no(() => devtools({tab:'요소'}), 'dom 없음'); no(() => devtools({tab:'요소', dom:d1, con:['a']}), '요소에 con');
  no(() => devtools({tab:'콘솔', con:['a'], dom:d1}), '콘솔에 dom'); no(() => devtools({tab:'네트워크', net:[]}), 'net 0줄');
  no(() => devtools({tab:'요소', dom:Array(7).fill([0, 'a'])}), 'dom 7줄'); no(() => devtools({tab:'요소', dom:[[4, 'a']]}), '깊이 4');
  no(() => devtools({tab:'요소', dom:[[3, 'x'.repeat(23)]]}), '들여쓰기 포함 29자'); no(() => devtools({tab:'요소', dom:d1, css:Array(5).fill('a')}), 'css 5줄');
  no(() => devtools({tab:'요소', dom:d1, css:['x'.repeat(25)]}), 'css 25자'); no(() => devtools({tab:'요소', dom:d1, hl:1}), 'hl 범위');
  no(() => devtools({tab:'콘솔', con:Array(5).fill('a')}), 'con 5줄'); no(() => devtools({tab:'콘솔', con:[w29]}), 'con 29자');
  no(() => devtools({tab:'네트워크', net:[{name:'x'.repeat(17), status:200, type:'fetch'}]}), '요청 이름 17자');
  const dt = domtree([[0, 'div'], [1, 'ul'], [2, 'li'], [3, 'button', '누른 곳']], {path:[3, 2, 1, 0]});
  has(dt, ['class="mk-dtl" aria-hidden="true"', 'mk-rux1 A', 'mk-rux4 A', '4번째', '&lt;button&gt;',
    '<p class="sr">div 안에 ul, ul 안에 li, li 안에 button(누른 곳). 누른 곳 button에서 li, ul, div 순서로 전해져요</p>'], 'dt');
  const ds = domtree([[0, 'div'], [1, 'ul'], [2, 'li']], {path:[2, 1], still:true});
  if (/class="(?:[^"]*\\s)?A(?:\\s[^"]*)?"/.test(ds) || (ds.match(/mk-dtw/g) || []).length !== 2) bad.push('dt still');
  has(domtree([[0, 'App'], [1, 'List'], [2, 'Item']], {hl:[2]}), ['mk-dthl', '강조'], 'dt hl');
  has(domtree([[0, 'ul'], [1, 'li', '누른 곳']], {path:[1]}), ['누른 곳 li에서만 반응해요'], 'dt 1칸');
  const t3 = [[0, 'div'], [1, 'ul'], [2, 'li']];
  no(() => domtree([[0, 'a']]), '1노드'); no(() => domtree(Array(9).fill([0, 'a'])), '9노드'); no(() => domtree([[1, 'a'], [2, 'b']]), '첫 깊이');
  no(() => domtree([[0, 'a'], [2, 'b']]), '깊이 건너뜀'); no(() => domtree([[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd'], [4, 'e'], [5, 'f']]), '깊이 5');
  no(() => domtree(t3, {hl:[3]}), 'hl 범위'); no(() => domtree(t3, {path:[2, 0]}), '부모 아님'); no(() => domtree(t3, {path:Array(7).fill(0)}), 'path 7칸');
  no(() => domtree([[0, 'a'.repeat(13)], [1, 'b']]), '태그 13자'); no(() => domtree([[0, 'a', '가나다라마바사'], [1, 'b']]), '꼬리표 14자');
  const ie = ide(['let a = 1;', {t:'a = "삼";', err:'숫자 자리예요(풀어 쓴 말)'}, 'log(a);'], [{l:3}], {still:true});
  has(ie, ['<code class="mk-cdw">a = &quot;삼&quot;;</code>', '<li class="mk-cdem"><b>오류</b> 숫자 자리예요(풀어 쓴 말)</li>', '<li value="3">', '--l:4'], 'ide 오류');
  no(() => ide([{t:'a', err:'x'.repeat(29)}], [{l:1}]), 'err 29자'); no(() => ide([{t:'a', err:''}], [{l:1}]), 'err 빈 글');
  const plain = ide(['let n = 1;', 'n = n + 1;', 'console.log(n);'], [{l:2}]);
  if (/mk-cdw|mk-cdem|value=/.test(plain) || !plain.includes('--l:2')) bad.push('ide 기존 출력');
  return bad.join(', ');
})()`, ctx));
```

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs`
Expected: `FAIL fhelp: devtools is not defined`

- [ ] **Step 3: `ide` 확장**: 위 Interfaces대로 바꾼다. 한도 검사와 `pane`의 `--l`, 코드 줄 렌더만 손댄다. CSS `.mk-cdw`(물결 밑줄 `var(--mark-text)`)·`.mk-cdem`(`list-style:none`, 20px 줄, `var(--mark-text)`)을 ide CSS 뒤에 둔다.

- [ ] **Step 4: `devtools`·`domtree` 구현**: `wlen`을 쓰고, 입력 검사를 먼저 한 뒤 HTML을 만든다. 검사 항목은 스펙 3.1·3.2와 Step 1 목록이다. CSS를 ide CSS 뒤에 두고, 506줄 넓은 그림 목록에 `.mk-dv`·`.mk-dt`를 넣는다.

- [ ] **Step 5: 통과 확인**

Run: `node tests/check.mjs`
Expected: `FAIL` 줄 없이 `OK <수>`(기존 `base`의 ide 점검 포함)

- [ ] **Step 6: 브라우저·break-ui 확인**
  - Review Focus 1 그림을 임시 키 `u-front-test`로 아무 front 카드 v에 잠깐 걸고 확인한다.
    - devtools 요소 탭: 28자 6줄(깊이 3, 첫 줄 선택) + 24자 4줄(하나 덮임)
    - 콘솔 탭: 28자 4줄
    - domtree: 8노드, 깊이 4, 태그 12자, 꼬리표 12자
  - 위 브라우저 확인 절차의 넘침·작은 글자를 320/375/1280에서 본다.
  - reduced-motion에서 칩 "k번째"가 모두 보이는지 본다.
  - 임시 키와 v를 지운다. `git diff`에 `u-front-test`가 없어야 한다.

- [ ] **Step 7: DESIGN.md·커밋**: 도우미 표에 `devtools({tab,dom,css,hl,con,net})`·`domtree(nodes,{hl,path,still})`를 한 줄씩 넣고, ide 줄에 "`{t, err}` 줄은 물결 밑줄 + 오류 설명 줄"을 더한다.

```bash
git add index.html tests/check.mjs DESIGN.md
git commit -m "feat: 프론트엔드 그림 도우미 devtools·domtree와 ide 오류 줄"
```

뒤이어 **디렉터 검토 ③ 묶음 A**

---

### Task 2: 하위항목 4개와 점검 기대값

**Files:**
- Modify: `index.html:1667`(CAT)
- Modify: `tests/check.mjs`(COUNT·REDRAWN·LATER, `dup`, 새 front 점검 묶음)

**Interfaces:**
- Produces: 점검 이름 `fcat`·`fobj`·`fukey`·`fsym`·`fx`·`fm`·`fou`·`fwrong`·`dupre`, 목록 `FKEEP`·`FB_WRONG`, 함수 `FS()`·`norm()`. Task 3~6과 계획서 ②가 기대값만 고친다.

- [ ] **Step 1: 실패하는 점검 쓰기**
  - `COUNT`에 넣는다(측정값):
    - `'front/basic': 10, 'front/core': 14, 'front/motion': 10, 'front/adv': 9, 'front/layout': 12`
    - `'front/unit': 8, 'front/css': 0, 'front/event': 0, 'front/react': 0, 'front/build': 0, 'front/tip': 8`
  - `REDRAWN`에 `front/` 11개를 넣는다.
  - `dup`: `const norm = s => s.toLowerCase().replace(/[\s/.\-]/g, '');`로 비교한다. 허용 목록도 `ALLOW_DUP.map(norm)`로 바꿔 비교한다. 정규화 자체는 아래 `dupre`로 확인한다.
  - web 묶음(`wwrong`) 뒤에 front 묶음을 둔다.

```js
check('dupre', () => norm('Async/Await') !== norm('async / await') || norm('Dark Mode') !== norm('dark mode') || norm('Next.js') !== norm('nextjs') || norm('CSS-in-JS') === norm('CSS') ? '이름 정규화' : '');
const FS = () => g.TERMS.filter(t => t.c === 'front');
check('fcat', () => { const a = g.CATS.find(c => c.id === 'front').secs.map(s => s.id).join(); return a === 'basic,core,motion,adv,layout,unit,css,event,react,build,tip' ? '' : a; });
check('fobj', () => FS().filter(t => typeof t.v === 'object').map(t => t.en).join(', '));    // 옛 형식 그림 0장
const FKEEP = ['Box Model', 'Margin', 'Padding', 'Border', 'Flexbox', 'CSS Grid', 'Gap', 'Align Items', 'Justify Content', 'Position Sticky', 'Z-index', 'Overflow',
  'Component', 'Media Query', 'Border Radius', 'Box Shadow', 'Transition', 'Keyframes', 'Transform', 'Hover', 'Focus', 'Animation Duration', 'Intersection Observer',
  'Rotate', 'State', 'Max Width', 'Column', 'Row', 'Center Alignment', 'Flex Wrap', 'Aspect Ratio', 'Breakpoint', 'Viewport', 'vw / vh'];    // 그대로 두는 그림 34장(측정)
check('fukey', () => FS().filter(t => !FKEEP.includes(t.en) && !(typeof t.v === 'string' && t.v.startsWith('u-front-') && g.D[t.v])).map(t => t.en).join(', '));
check('fsym', () => FS().filter(t => { const p = typeof t.v === 'string' ? g.D[t.v] : {h:g.visual(t.v)}; return p && WSYM(p.h + (p.cap || '')); }).map(t => t.en).join(', '));
check('fx', () => FS().filter(t => !t.x).map(t => t.en).join(', '));
check('fm', () => FS().filter(t => typeof t.v === 'string' && t.v.startsWith('u-front-') && g.D[t.v].m && !WA(g.D[t.v].h)).map(t => t.en).join(', '));
check('fou', () => FS().filter(t => t.o === 1 && !t.u).map(t => t.en).join(', '));
const FB_WRONG = {'Key': ['Key-Value', 'API Key'], 'Input Event': ['Event'], 'CSS Inheritance': ['Inheritance'], 'Context API': ['Context'], 'Lifecycle': ['App Lifecycle']};    // 이름만 비슷한 다른 뜻
check('fwrong', () => Object.entries(FB_WRONG).filter(([en, w]) => { const t = g.find(en); return t && t.c === 'front' && (t.r || []).some(r => w.includes(r)); }).map(([en]) => en).join(', '));
```

  - `LATER`에 넣는다: `'fobj', 'fukey', 'fsym', 'fx', 'font', 'redrawn:front/core', 'redrawn:front/adv', 'redrawn:front/unit', 'redrawn:front/tip'`

- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs`
Expected: `FAIL fcat: basic,core,motion,adv,layout,unit,tip`, `FAIL count:front/css: no sec ≠ 0`(event·react·build도 같음). 아울러 `LATER fobj`·`LATER fukey`·`LATER fsym`·`LATER fx`·`LATER redrawn:front/core` 등이 나오고, 나머지 새 점검은 통과한다.

- [ ] **Step 3: CAT 고치기**: 1667줄 `['unit',…]` 뒤에 스펙 4장의 네 항목(`css`·`event`·`react`·`build`, 이름과 설명 그대로)을 넣는다.

- [ ] **Step 4: 통과 확인**

Run: `node tests/check.mjs`
Expected: `FAIL` 없이 `OK <수>`. `LATER`가 9개 남는다(Step 1 목록). 빈 하위항목 4개는 화면에서 "카드 없음"으로 보이고, 계획서 ②까지 이 상태다.

- [ ] **Step 5: 커밋**

```bash
git add index.html tests/check.mjs
git commit -m "feat: 프론트엔드 하위항목 4개와 점검 기대값"
```

---

### Task 3: css·event 새 카드 22장 (공통 절차)

쓸 스킬: design-skills:ux-writing(d·x 문구), superpowers:test-driven-development

**Files:**
- Modify: `index.html`
  - 새 블록 `T('front','css',[…])`·`T('front','event',[…])`를 `T('front','tip',…)`(2468줄) 앞에 둔다.
  - 그림은 `/* front: css … */`·`/* front: event … */` 묶음으로 `const visual` 앞에 둔다.
- Modify: `tests/check.mjs`: EXPECT·COUNT·total

- [ ] **Step 1: 실패하는 점검**
  - `EXPECT['front/css']`, `EXPECT['front/event']`: 아래 표 순서 그대로
  - `COUNT['front/css'] = 12`, `COUNT['front/event'] = 10`
  - `total`: 1428 → 1450
- [ ] **Step 2: 실패 확인**: `FAIL expect:front/css`·`expect:front/event`·`count:front/css: 0 ≠ 12`·`count:front/event: 0 ≠ 10`·`total`
- [ ] **Step 3~5**: 공통 절차 3~5. 모든 새 카드에 `x`와 `v:'u-front-<slug>'`를 넣는다.
- [ ] **Step 6: 브라우저 확인**: `#/c/front/css`, `#/c/front/event`
- [ ] **Step 7: 커밋**: `feat: 프론트엔드 CSS 규칙·이벤트 새 카드`

**카드와 그림**(코드 글은 그림에 그대로 쓴다. 숫자·이름은 예시. `▶`는 표 표시일 뿐 en에 넣지 않는다. Task 6에서 직접 조작이 붙는 카드다):

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| css | Specificity▶ | 명시도 · 규칙 우선순위 | `devtools` 요소: dom `<h2 id="main" class="title">`, css `#main { color: red }` · `{t:'.title { color: blue }', off:1}` · `{t:'h2 { color: green }', off:1}`, hl 0 | Selector, Cascade |
| css | Cascade | 캐스케이드 · 겹친 규칙 정리 | `devtools` 요소: 같은 명시도 `.btn` 두 줄, 뒤에 쓴 줄 `.btn { color: blue }`가 살고 앞 줄 `{t:'.btn { color: red }', off:1}` | Specificity |
| css | CSS Inheritance | CSS 상속 · 물려받는 스타일 | `pair`: `body { color: navy; border: 1px solid }` → 안쪽 p·li 글자도 남색(꼬리표 "물려받음"), 테두리는 body에만(꼬리표 "안 물려받음") | Cascade |
| css | Pseudo-class | 가상 클래스 · 상태 선택 | `pair`: `a:hover { text-decoration: underline }` → 링크 둘 중 마우스 올린 쪽만 밑줄(꼬리표 "마우스 올림") | Hover, Focus |
| css | Pseudo-element | 가상 요소 · 요소의 일부 | `pair`: `.req::after { content: "*" }` → 입력칸 이름 "이메일" 뒤에 별표(꼬리표 "CSS가 붙임") | Selector |
| css | !important | 강제 우선 표시 | `devtools` 요소: `p { color: red !important }`가 살고 `{t:'#main p { color: blue }', off:1}` | Specificity |
| css | CSS Reset | CSS 초기화 | `vs`: 리셋 전(브라우저 기본 여백이 있는 제목·목록) / 리셋 후(`* { margin: 0 }`, 여백 없음) | Margin |
| css | Inline vs Block | 인라인과 블록 | `vs`: `span` 셋이 한 줄에 나란히 / `div` 셋이 줄마다 한 칸 | Display |
| css | Display None | 표시 안 함 | `vs`: 상자 셋 / 가운데 `display: none`이면 빈자리 없이 두 상자가 붙음(꼬리표 "자리도 사라짐") | Display, Visibility |
| css | Visibility▶ | 보이기·숨기기 | `doc` 표: 방법 · 자리 · 클릭 · 화면 낭독기 — `display:none` 없음·안 됨·안 읽음 / `visibility:hidden` 남음·안 됨·안 읽음 / `opacity:0` 남음·됨·읽음 | pointer-events, Display None |
| css | Float | 플로트 · 띄워 감싸기 | `pair`: `img { float: left }` → 사진 오른쪽으로 글이 감싸 흐름 | Flexbox |
| css | Vendor Prefix | 브라우저 접두사 | `doc` 표: 접두사 · 엔진 — `-webkit-` Chrome·Safari·Edge / `-moz-` Firefox, 아래 문단 "지금은 도구가 대신 붙여 줘요" | 없음(PostCSS가 계획서 ②에서 연결) |
| event | Event Bubbling▶ | 이벤트 버블링 · 위로 전해짐 | `domtree([[0,'ul','처리기 있음'],[1,'li','처리기 있음'],[2,'button','누른 곳']], {path:[2,1,0]})`, `m:1` | Event Listener |
| event | Event Delegation | 이벤트 위임 | `domtree([[0,'ul','처리기 하나'],[1,'li'],[1,'li','누른 곳'],[1,'li']], {path:[2,0]})`, `m:1` | Event Bubbling |
| event | preventDefault | 기본 동작 막기 | `vs`: 막지 않음(`browser` 폼, 꼬리표 "페이지 새로고침, 입력값 사라짐") / `e.preventDefault()`(꼬리표 "페이지 그대로") | Form |
| event | stopPropagation | 전파 막기 | `domtree([[0,'ul','반응 안 함'],[1,'li','여기서 멈춤'],[2,'button','누른 곳']], {path:[2,1]})`, `m:1` | Event Bubbling |
| event | Input Event | 입력 이벤트 | `track`: `c` 입력 `w:'input 1번'` · `ca` `w:'input 2번'` · `cat` `w:'input 3번'` · 칸을 떠남 `w:'change 1번'`(모두 done) | Event Listener |
| event | Keyboard Event | 키보드 이벤트 | `ide`: `box.addEventListener(` / `  'keydown', e => {` / `  if (e.key === 'Enter')` / `    send();` / `});`, 단계 `{l:3}`·`{l:4, out:['보냄']}`, `m:1` | Event Listener |
| event | Form Validation | 폼 검사 | `ide` 오류 줄: `<input type="email"` / `{t:'  required>', err:'@가 없어요(풀어 쓴 말)'}` / `<button>보내기</button>`, 단계 `{l:2}` | Validation |
| event | Controlled Input | 제어 입력 | `ide`: `const [v, setV]` / `  = useState('');` / `<input value={v}` / `  onChange={e =>` / `   setV(e.target.value)} />`, 단계 `{l:3, vars:{v:"''"}}`·`{l:5, vars:{v:"'a'"}}`, `m:1` | State |
| event | Two-way Binding | 양방향 연결 | `pair`: `<input v-model="name">`(Vue 예) → 입력칸 "민지"와 위 글 "안녕, 민지"(꼬리표 "칸과 값이 서로 바뀜") | Controlled Input |
| event | Fetch | 데이터 가져오기 | `devtools` 네트워크: `{name:'posts', status:200, type:'fetch'}`, `{name:'users', status:404, type:'fetch'}` | JSON, Async/Await |

x 짝(스펙 5장):
- Specificity vs Cascade vs !important, CSS Inheritance vs Cascade
- Pseudo-class vs Pseudo-element, Display None vs Visibility vs Opacity, Inline vs Block vs Display, Float vs Flexbox
- Event Bubbling vs Event Delegation(focus는 버블링 안 함, focusin은 함), preventDefault vs stopPropagation
- Input Event vs change, Form Validation(브라우저 먼저) vs Validation(서버에서 다시), Controlled Input vs Two-way Binding, Fetch vs Async/Await

뜻이 다른 짝:
- CSS Inheritance의 x는 basics Inheritance(객체 상속)와 다르다고 쓰고, r에 넣지 않는다.
- Input Event의 x는 basics Event(일반 개념)와 다르다고 쓰고, r에 넣지 않는다.

출처(MDN): Specificity, Cascade, Inheritance, Pseudo-classes, Pseudo-elements, `!important`, `display`, `visibility`, `opacity`, `float`, Vendor prefix, Event bubbling, `Event.preventDefault()`, `Event.stopPropagation()`, `input`·`change` 이벤트, `focusin`, `KeyboardEvent.key`, Constraint validation, Fetch API. React 문서: Controlled input(`<input>` 문서의 controlled 절). Vue 문서: `v-model`.

뒤이어 **디렉터 검토 ③ 묶음 B**

---

### Task 4: 객체 v 22장 다시 그리기

**Files:**
- Modify: `index.html`
  - 카드 22장의 v를 `'u-front-<slug>'`로 바꾼다.
  - 그림은 `/* front: 다시 그리기 … */` 묶음으로 둔다.
- Modify: `tests/check.mjs`: `LATER`에서 `fobj`와 `redrawn:front/core·adv·unit·tip` 4개를 뺀다.

- [ ] **Step 1: LATER에서 다섯 점검을 뺀다**
- [ ] **Step 2: 실패 확인**

Run: `node tests/check.mjs`
Expected:
- `FAIL fobj`: 22장(Tag, Attribute, Selector, Class Name, Display, React, Props, Hook, Virtual DOM, TypeScript, Bundler, Tailwind CSS, Container, Full Width, px, rem, em, fr, CSS Variable, Semantic HTML, DevTools, Polyfill)
- `FAIL redrawn:front/core: Display` 등 4개

- [ ] **Step 3: 그림**: 스펙 3.4 표대로 그린다. 정해 둔 것:
  - Display: 전용 HTML 네 칸(`.mk-fdp`). none 칸은 점선 빈칸 + "사라짐" 글자다.
  - Virtual DOM: `vs(domtree(이전, {still:true}), '이전 나무', domtree(새, {hl:[바뀐 번호], still:true}), '새 나무')` + cap "바뀐 곳만 실제 화면에 반영해요". `vs`의 실제 인자 순서는 4366줄 정의를 따른다.
  - TypeScript: `ide(['let price: number;', {t:'price = "삼천";', err:'숫자 자리에 글자를 넣었어요(풀어 쓴 말)'}], [{l:2}])`. err의 wlen이 28을 넘으면 "숫자 자리에 글자예요(풀어 쓴 말)"로 줄인다(ide가 막는다).
  - rem: track에 "16px(기본값)"·"20px로 바꾸면 2rem = 40px"을 넣는다.
  - em: 15 = 20×1.5(예시)는 30px, 그 안은 45px이다.
  - px: 눈금자 + "글자 크기 설정을 키워도 그대로". 근거는 MDN `<length>`의 px 절이다.
  - DevTools: `devtools({tab:'요소', dom:[[0,'<main>'],[1,'<h1>제목</h1>']], css:['h1 { font-size: 32px }'], hl:1})`
  - DevTools x에 "Chrome은 Elements, Firefox는 Inspector"를 쓴다(스펙 3.1).
  - `m:1`은 움직이는 `track`·`domtree` 경로가 있는 그림에만 단다.
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER`는 `fukey`·`fsym`·`fx`·`font` 4개다.
- [ ] **Step 5: 브라우저 확인**: core·adv·layout·unit·tip·basic
- [ ] **Step 6: 커밋**: `feat: 프론트엔드 글자상자 그림 22장 다시 그리기`

---

### Task 5: 공유 그림 14장 전용 그림 + transition·shadow 기호

**Files:**
- Modify: `index.html`
  - 카드 14장의 v
  - 새 묶음 `/* front: 전용 그림 … */`
  - `D.transition.cap`(3914줄)·`D.shadow.cap`(3884줄)
- Modify: `tests/check.mjs`: `LATER`에서 `fukey`·`fsym`을 빼고, `fshare`를 더한다.

- [ ] **Step 1: 점검**
  - `LATER`에서 `fukey`·`fsym`을 뺀다.
  - 공유 키를 지우지 않았는지 보는 점검을 더한다.

```js
check('fshare', () => ['boxmodel', 'zindex', 'jank', 'fade', 'flicker', 'responsive', 'contrast', 'aspect', 'fontsize', 'transition', 'shadow'].filter(k => !g.D[k]).join(', '));    // 공유 그림 키는 남긴다
```

- [ ] **Step 2: 실패 확인**
  - `FAIL fukey`: 14장(Element, Wrapper, Inspect Element, Position, requestAnimationFrame, Reduced Motion, Re-render, Percent, Mobile First, Dark Mode, prefers-color-scheme, Cache Busting, Object Fit, clamp())
  - `FAIL fsym: Transition, Box Shadow`
- [ ] **Step 3: 그림**: 스펙 3.5 표대로 그린다. 정해 둔 것:
  - Element: `pair(domtree([[0,'ul'],[1,'li'],[1,'li']], {still:true}), 화면 목록 두 줄)`
  - Inspect Element: `browser`(버튼 강조) + 아래 `devtools({tab:'요소', dom:[[0,'<form>'],[1,'<button>보내기</button>']], hl:1})`
  - Cache Busting: `net`(노드 5개 이하, NWI 키만)
  - requestAnimationFrame: track에 "약 16.7ms(60Hz 예시)"를 쓴다.
  - 기호:
    - transition cap: `'처음 상태에서 바뀐 상태로 서서히 바뀐다'`
    - shadow cap: `'그림자 없음에서 깊은 그림자까지'`
    - 두 키는 다른 카테고리도 쓰므로 그림(h)은 건드리지 않는다.
- [ ] **Step 4: 통과 확인**: `FAIL` 없음. `LATER`는 `fx`·`font` 2개다.
- [ ] **Step 5: 브라우저 확인**: basic·core·motion·adv·layout·unit·tip
- [ ] **Step 6: 커밋**: `feat: 프론트엔드 공유 그림 14장을 전용 그림으로`

---

### Task 6: 직접 조작 Specificity·Event Bubbling·Visibility

쓸 스킬: superpowers:test-driven-development, design-skills:interaction-design

**Files:**
- Modify: `index.html`
  - `u-front-specificity`·`u-front-event-bubbling`·`u-front-visibility`에 `init`을 붙인다.
  - 상태 표는 그 `Object.assign` 바로 앞 `const`로 둔다.
- Modify: `tests/check.mjs`: `fdm`·`fdmrun`

**Interfaces:**
- Consumes: `devtools`·`domtree`(Task 1), `bpick(P, f)`(6844줄), `psay`(6345줄), `tpick(names, on)`(3690줄)
- Produces:
  - `FSPEC = [['h2','h2 { color: green }','태그'], ['.title','.title { color: blue }','클래스'], ['#main','#main { color: red }','아이디']]`(낮은 것부터)
  - `fspec(on: Set<string>) → string`
    - 켠 규칙 중 가장 뒤(높은) 것만 살고, 나머지는 `off:1`인 `devtools` 요소 탭이다.
    - 아래에 결과 제목 미리보기를 그린다. 이긴 규칙의 색 + "빨강"·"파랑"·"초록" 글자를 함께 쓴다.
  - `fspecSay(on) → string`
    - 0개: `'규칙 없음: 기본 글자색이에요'`
    - 1개: `'${이름}만 켜져서 그 색이에요'`
    - 2개 이상: `'${이긴 이름}이 이겨요. ${이긴 단계}가 ${진 단계 중 가장 높은 것}보다 우선이에요'`
  - `FBUB = {button: …, li: …}`, `fbub(target, stop) → string`(domtree + 반응한 곳 문장)
    - 경로: button이면 `[2,1,0]`, li면 `[1,0]`. stop이면 li에서 끊는다(button → `[2,1]`, li → `[1]`).
    - 문장: `반응한 곳: button, li, ul` 식이다.
  - `FVIS = {'display:none': {say}, 'visibility:hidden': {say}, 'opacity:0': {say}}`. `bpick(FVIS, fvis)`를 쓴다.

- [ ] **Step 1: 실패하는 점검**

```js
const FDM = {'Specificity': ['h2', '.title', '#main', 'aria-pressed', 'aria-live'], 'Event Bubbling': ['button', 'li', 'stopPropagation', 'aria-pressed', 'aria-live'],
  'Visibility': ['display:none', 'visibility:hidden', 'opacity:0', 'aria-pressed', 'aria-live']};    // 직접 조작 그림: 영문명 → h에 있어야 할 글
check('fdm', () => Object.entries(FDM).filter(([en, w]) => { const t = g.find(en), p = t && g.D[t.v]; return !p || !p.init || !w.every(x => p.h.includes(x)); }).map(([en]) => en).join(', '));
check('fdmrun', () => vm.runInContext(`(() => { const bad = [], s = new Set(['h2', '#main']);
  if (!fspecSay(new Set()).includes('규칙 없음')) bad.push('모두 끔');
  if (!fspecSay(s).includes('#main') || !fspecSay(s).includes('아이디')) bad.push('아이디 승');
  if ((fspec(s).match(/덮임/g) || []).length !== 1) bad.push('덮임 1개');
  if (!fbub('button', false).includes('반응한 곳: button, li, ul')) bad.push('버블링');
  if (!fbub('button', true).includes('반응한 곳: button, li') || fbub('button', true).includes('li, ul')) bad.push('전파 막기');
  if (!fbub('li', true).includes('반응한 곳: li') || fbub('li', true).includes('li, ul')) bad.push('li 막기');
  return bad.join(', '); })()`, ctx));
```

- [ ] **Step 2: 실패 확인**: `FAIL fdm: Specificity, Event Bubbling, Visibility`, `FAIL fdmrun: fspecSay is not defined`
- [ ] **Step 3: 구현**
  - Specificity: 버튼 셋은 `.mk-tkey`이고 각자 `aria-pressed`를 켜고 끈다(여러 개 가능, 처음엔 셋 다 켬). `init`에서 버튼마다 `.mk-mobox`를 `fspec(on)`으로 바꾸고 `psay(.mk-hint, fspecSay(on))`.
  - Event Bubbling: 누를 곳 `tpick(['button','li'], 'button')` + 토글 버튼 "li에서 전파 막기(stopPropagation)"(`aria-pressed`). 둘 다 `.mk-mobox`·`.mk-hint`를 갱신한다.
  - Visibility: `tpick(['display:none','visibility:hidden','opacity:0'], 'display:none')` + `bpick(FVIS, fvis)`. 표는 Task 3의 doc 표에서 고른 행을 강조한 것이다.
  - `.mk-hint`는 `aria-live="polite"`이다. `init`에 `window`·`document`를 쓰지 않는다(`init` 점검).
  - 세 그림 모두 `m`이 없다(직접 조작이라 자동 재생 없음).
- [ ] **Step 4: 통과 확인**: `FAIL` 없음, `LATER`는 `fx`·`font`
- [ ] **Step 5: 브라우저 확인**
  - Review Focus 4의 순서를 마우스와 키보드(Tab → Enter·Space)로 해 본다.
  - 결과 문장이 바뀌고 콘솔 오류가 0이어야 한다.
  - 320px에서 넘침이 없어야 한다.
- [ ] **Step 6: 커밋**: `feat: 프론트엔드 직접 조작 3장`

뒤이어 **디렉터 검토 ③ 묶음 C**. 반영 뒤 원장과 체크포인트 메모리를 갱신하고, 계획서 ②를 쓴다.
