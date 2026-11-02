# 웹사이트 카테고리 보강 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 웹사이트를 하위항목 9개·카드 99장으로 늘린다.
- 새 카드 50장, 새 하위항목 `search`·`browser`·`traffic`, 증상 12개를 넣는다.
- 글자상자 그림 16장을 다시 그리고, 모든 카드에 x를 채운다.
- 검색 결과 화면은 새 도우미 `serp()`로 그린다.

**Architecture:** `index.html` 하나에서 작업한다.
- 데이터는 `T('web', …)` 블록(2266~2329줄)에 넣는다.
- 그림은 `const visual`(6763줄) 앞에 `/* web: <sec> … */` 주석 + `Object.assign(D, {...})`로 더한다.
- `serp()`는 `ide`·`mem`(3722·3739줄) 뒤, `/* 직접 조작 도우미 … */`(3753줄) 앞에 둔다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, fonttools(`font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-02-web-category-design.md](../specs/2026-11-02-web-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치**: `web-category`에서 작업한다. main 병합은 사용자 확인 뒤에 한다.
- **이름 접두사**: 새 클래스는 `mk-sp`로 시작한다. 측정: 지금 0건이다. 결과 줄 등장은 기존 `mk-rux{k}`(1~6, `dframe` 점검이 지킴)를 다시 쓴다.
- **`hl`은 0부터 센다.** `hl: 0`은 첫 줄이다. "내 사이트 없음"은 `hl`이 `undefined`일 때만이다(0을 거짓으로 읽으면 안 됨).
- **한글 폭**: `ide`의 한글 2자 계산을 `wlen(s)`로 꺼내 `ide`·`serp`가 같이 쓴다. 바뀌는 것은 `ide`의 한 줄뿐이다.
- **옛 형식 점검**: 측정상 지금 웹 카드 33장의 `v`가 객체다. 목록 `WOBJ`로 관리한다. Task 7에서 16장을 빼면 17장이 남는다(스펙의 "그대로 둘 33장" = 17장 + 문자열 키 16장).
- **직접 조작 시점**: 스펙 7장은 직접 조작 4장을 따로 두지만, 그림을 두 번 그리지 않도록 카드 Task에 합친다. robots.txt·UTM은 Task 4(search), HTML·Conversion Rate는 Task 7(다시 그리기)이다.
- **`webparts`**: parts 카드가 Task 3에서 늘어나므로 그때 8 → 14로 고친다.
- **증상 대조**: 기존 157개에서 검색·미리보기·Safari·새 창·구매·나가·어디서·로그인·넣은·utm·주소·제목을 찾았다. 측정상 겹치는 문구가 없어 스펙 6장 12개를 그대로 쓴다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN은 쓰지 않는다.
- 도판 토큰(`--ink`·`--plate`·`--rule`·`--mark`·`--ok`·`--mark-text`·`--mono`)만 쓴다. 그림 글자는 11px 이상이다. `.fig`에는 그림자를 넣지 않는다. easing은 `var(--ease)`다.
- 자동 애니메이션은 클래스 `A`를 쓴다. 주기 10s, 멈춘 장면은 `-8.8s`(88%)이다. `still` 없이 움직이는 그림은 `m:1`이다.
- 새 D 키는 `'u-' + slug(en)`이다. 예외: HTML·CSS·JavaScript는 `u-web-layers`·`u-web-css`·`u-web-js`다(측정: 새 키 53개 모두 지금 없음).
- 카드 문구:
  - `d`·`x`: 해요체. `x`는 2~3문장이고, 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
  - `p`: "~해줘" 지시문에 정식 용어를 넣는다.
  - `l`: 1~3. `ko`: `한글 · 풀이`.
- `r`: 1~3개. 이미 있는 같은 뜻·짝 카드만 단다(같은 Task와 앞 Task 카드 포함, 뒤 Task 카드 금지). 다른 카테고리 카드 본문은 바꾸지 않는다.
- `o:1`: MDN·Google 검색 센터·GA4 도움말 같은 1차 출처를 직접 열어 확인했을 때만 쓴다. 그때 `u`를 단다. 확인한 출처는 원장에 적는다.
- 그림 속 숫자는 모두 "(예시)"로 표시한다. 특정 회사 로고·색은 쓰지 않는다. 순위·이탈률 "좋은 기준"처럼 단정하는 문구는 쓰지 않는다.
- 상태는 색만으로 나누지 않는다(기호 + 글자).
- 커밋은 한국어 `feat:`/`fix:`/`docs:`로 쓰고 attribution 줄을 넣지 않는다. `.impeccable/hook.cache.json`·`core375.png`는 스테이징하지 않는다(`git add -A`·`-a` 금지).
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필·저장된 로그인은 쓰지 않고, `state save` 파일도 만들지 않는다.

## Review Focus

1. **긴 검색 결과와 좁은 그림판**: 4줄, 제목 32자, 설명 60자, 공백 없는 40자 주소를 320px에서 그려도 가로 넘침이 없어야 한다. 주소·설명은 줄을 바꾼다. → Task 1 브라우저 확인, Task 10 break-ui
2. **`hl: 0`과 "내 사이트 없음"**: `hl: 0`은 첫 줄 강조와 "내 사이트 1번째"여야 한다. `hl`이 없을 때만 "내 사이트는 결과에 없어요"가 나온다. 화면 낭독기는 요약 문장을 읽어야 한다. → Task 1 `base`
3. **직접 조작의 끝 경우**: 같은 버튼 두 번, Tab·Enter·Space로도 오류 없이 같은 문장이 나와야 한다. 전환율은 구매 ≤ 방문인 조합만 있고, 퍼센트가 정수로 맞아떨어져야 한다. → Task 4·7 브라우저 확인
4. **자주 틀리는 사실**:
   - Bounce Rate는 GA4에서 "참여하지 않은 세션 비율"이다.
   - robots.txt는 수집만 막고, 검색에서 빼려면 noindex를 쓴다.
   - Canonical URL은 힌트다.
   - iOS의 Chrome도 WebKit을 쓴다.
   - 팝업 차단은 사용자 클릭 없이 연 창을 막는다.
   - 출처와 다르면 안 된다. → Task 2~6 출처 확인, 디렉터 검토 ③
5. **이름만 비슷한 다른 카드로 가는 연결**: Bounce Rate→Bounce·Debounce, Event Tracking→Event, Time on Page→Session, Pop-up Blocker→Popover·Modal, Logo→Brand Color는 `r`에 달지 않는다. → Task 1 `wwrong`

---

## 공통 절차 (Task 2~6, 새 카드)

1. **실패하는 점검 추가**(`tests/check.mjs`)
   - `EXPECT['web/<sec>']`: 아래 목록 그대로(기존 카드 + 새 카드)
   - `COUNT['web/<sec>']`
   - `total` 기대값: 그 Task 표의 누계
2. **실패 확인**: `node tests/check.mjs` → `FAIL expect:web/<sec>`, `FAIL count:web/<sec>`, `FAIL total`
3. **사실 확인**: 카드마다 1차 출처를 열어 정의를 확인하고, 원장에 `Task N 출처: <en> — <URL>`을 적는다. 확인하지 못한 카드는 `o:0`이고 "흔히"로 쓴다.
4. **데이터**: 그 하위항목 `T('web','<sec>',[…])` 끝에 표 순서대로 넣는다. 새 하위항목은 `T('web','tip',…)` 앞에 `search` → `browser` → `traffic` 순서로 블록을 만든다. 모든 새 카드에 `x`를 넣는다.
5. **그림**: `/* web: <sec> — 출처 확인: … 예시: … */` 주석 + `Object.assign(D, {...})`를 `const visual` 바로 앞(앞 Task 묶음 뒤)에 둔다. 카드별 도구는 Task 표의 "그림"을 따른다.
6. **점검 통과**: `node tests/check.mjs` → `OK <수>`. `LATER font`·`LATER doccount`·`LATER wx`는 정상이다(Task 8·10에서 비움).
7. **브라우저 확인**(아래 절차)
8. **커밋**: `git add index.html tests/check.mjs && git commit -m "feat: 웹사이트 <하위항목> 새 카드"`(원장 갱신을 같은 호출에서)

### 기존 카드 목록(측정, EXPECT에 그대로 앞에 둠)

- basic: Website, Web Page, URL, Domain, Browser, HTML, CSS, JavaScript
- core: Responsive Web Design, Hosting, Hyperlink, Favicon, SEO, Meta Tag, Cookie, Local Storage, Landing Page, SPA, Routing
- motion: Page Transition, Scroll Reveal, Smooth Scroll, Sticky Header, Infinite Scroll, Lazy Loading
- adv: DOM, SSR, CSR, SSG, PWA, Web Accessibility, Open Graph, Sitemap, Cross-browser
- parts: Header, Hero Section, Footer, Sidebar, CTA Button, Above the Fold, Chip, Divider
- tip: Static Site, CMS, Admin Page, Analytics, A/B Test, Conversion Rate, UX Writing

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/web/<sec>`
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**
  - 페이지: `document.documentElement.scrollWidth <= innerWidth` → `true`
  - 그림 안: `[...document.querySelectorAll('#view .fig .stage *')].filter(s => s.scrollWidth > s.clientWidth + 1 && getComputedStyle(s).overflow !== 'visible')` → `[]`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900, 375×812, 320×700에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)
- **reduced-motion**: `browser_emulate_media({reducedMotion:'reduce'})` 뒤 새로고침. 자동 재생이 없고, 재생 버튼이 동작해야 한다.

### 디렉터 검토 ③ 시점

같은 디렉터 에이전트(Opus 5.5, effort high)에게 SendMessage로 맡긴다. 압축 뒤라 ID를 모르면 새로 띄운다.
- **묶음 A — 도우미**: Task 1 뒤
- **묶음 B — 새 카드**: Task 6 뒤(Task 2~6 diff)
- **묶음 C — 그림·문구**: Task 8 뒤(Task 7~8 diff)
- **최종**: Task 10 뒤, 브랜치 전체

결과 처리:
- Critical·Important는 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN). 원장에 `Review <묶음>: fixed …`로 적는다.
- Minor는 `Review <묶음>: minor (deferred): …`로 적고 마지막에 보고한다.

---

### Task 1: 기반 (하위항목 3개, `serp()`, 점검 확장)

**쓸 스킬:** frontend-design:frontend-design, interfaces:better-accessibility, interfaces:better-layout

**Files:**
- Modify `index.html`
  - 1653줄 `CAT('web', …)`
  - `ide`의 28자 검사 줄(3724줄) → `wlen`
  - CSS: `.mk-mr` 규칙 뒤
  - 도우미: `mem` 끝 뒤, `/* 직접 조작 도우미 … */` 앞
  - `.fig:has(…)` 규칙 목록(494줄 등)
- Modify `tests/check.mjs`

**Interfaces:**
- Consumes: `esc`, `.sr`, `mk-rux{k}` 키프레임, `ide`
- Produces:
  - **카테고리**: `CAT('web','웹사이트','웹사이트가 어떻게 생기고 움직이는지에 관한 말', [['parts','페이지 구성요소','웹페이지 각 부분의 이름'], ['search','검색과 공유','검색에 나오고 링크로 퍼지게 하는 말'], ['browser','브라우저 안 동작','브라우저가 페이지를 받아 보여 주는 동안 일어나는 일'], ['traffic','방문 측정','누가 얼마나 오고 무엇을 했는지 세는 말']])`. secs id 순서: `basic, core, motion, adv, parts, search, browser, traffic, tip`.
  - **`wlen(s) -> number`**: 한글(`/[ᄀ-ᇿ㄰-㆏가-힯]/`)은 2, 나머지는 1로 센 길이. `ide`가 이것을 쓴다.
  - **`serp(q, rows, opt = {}) -> string`**
    - `q`: 검색어(`wlen` 20 이하). 넘으면 `throw new Error('serp: 검색어는 20자까지')`
    - `rows[i] = {t, u, d = '', tag}`: 1~4줄(`'serp: 결과는 1~4줄'`). 한도는 `t` 32(`'serp: 제목은 32자까지'`), `d` 60(`'serp: 설명은 60자까지'`), `u` 40(`'serp: 주소는 40자까지'`)이고, 모두 `wlen`으로 센다.
    - `opt`: `{hl, still = false, label}`
      - `hl`: 내 사이트 줄 번호(0부터). `undefined`가 아닌데 정수 0~n-1이 아니면 `'serp: 내 사이트 줄 ' + hl`
      - `label`이 있으면 루트에 `role="group"`·`aria-label`
    - 구조:
      ```
      <div class="mk-sp"><div class="mk-spq" aria-hidden="true"><span>검색</span>{q}</div>
        <ol class="mk-spl">{줄마다 <li class="mk-spr[ on][ mk-rux{k} A]">
          <span class="mk-spu">{u}</span><b class="mk-spt">{t}</b><span class="mk-spd">{d}</span>
          {tag && <span class="mk-spg">{tag}</span>}{on && <span class="mk-spme">내 사이트</span>}</li>}</ol>
        {hl 없음 && <p class="mk-spno">내 사이트는 결과에 없어요</p>}
        <p class="sr">{요약}</p></div>
      ```
      - 요약: `검색어 {q}, 결과 {n}개, 내 사이트 {hl+1}번째` 또는 `…, 내 사이트 없음`
      - `still`이면 ` A`·`mk-rux`를 붙이지 않는다.
      - 글자는 모두 `esc`한다.
    - CSS
      - `.mk-sp{container:sp/inline-size}`
      - `.mk-spu`·`.mk-spd`는 `overflow-wrap:anywhere`이고, 가로 스크롤은 없다.
      - `.mk-spr.on`: `--mark` 테두리 + `내 사이트` 글자(색만으로 나누지 않음)
      - `.mk-spno`: 점선 테두리 + `--ink` 흐린 글자
      - 검색창 모양은 중립(둥근 테두리 + "검색" 글자)이다. 특정 검색엔진 색·로고는 쓰지 않는다.
  - **`.fig:has(…)`**: `.mk-cd,.mk-mr`가 든 목록마다 `.mk-sp`를 더한다.
  - **check.mjs**
    - `WS = () => g.TERMS.filter(t => t.c === 'web')`
    - `WOBJ`: 지금 `v`가 객체인 웹 33장 영문명(측정)
      ```
      Website, Web Page, URL, Domain, Browser, HTML, CSS, JavaScript, Hosting, Hyperlink, Favicon, SEO, Meta Tag, Cookie,
      Local Storage, Landing Page, Routing, DOM, SSR, CSR, SSG, PWA, Sitemap, Cross-browser, Header, Hero Section, Footer,
      Sidebar, Static Site, CMS, Admin Page, A/B Test, Conversion Rate
      ```
    - `WDM = {}`: 영문명 → 그림 `h`에 있어야 할 글자. Task 4·7이 채운다.
    - `WB_WRONG = {'Bounce Rate': ['Bounce', 'Debounce'], 'Event Tracking': ['Event'], 'Time on Page': ['Session'], 'Pop-up Blocker': ['Popover', 'Modal'], 'Logo': ['Brand Color']}`
    - `LATER = ['font', 'doccount', 'wx']`

- [ ] **Step 1: 실패하는 점검 추가**(check.mjs)
  - `wcat`: web secs id가 `['basic','core','motion','adv','parts','search','browser','traffic','tip']`다.
  - `wobj`: web 카드 중 `typeof t.v === 'object'`인 영문명 집합이 `WOBJ`와 같다(`bobj`와 같은 형식, `+`/`-` 표시).
  - `wx`: web 카드 중 `x`가 없는 영문명(LATER)
  - `wm`: web 카드 중 `v`가 `u-`로 시작하고 `D[v].m`인데 `h`에 `/[" ]A["\s]/`가 없는 영문명. 기존 문자열 키 그림 16장은 형식이 달라 대상에서 뺀다.
  - `wdm`: `bdm`과 같은 방식으로 `WDM`을 확인한다(`init` 있음 + 글자 모두 있음).
  - `wou`: web 카드 중 `o === 1`인데 `u`가 없는 영문명
  - `wwrong`: `WB_WRONG`의 카드가 있으면 그 `r`에 금지 이름이 없다(카드가 아직 없으면 통과).
  - `base`에 더할 것
    - `const sp = serp('웹 공부', [{t:'웹 기초 정리', u:'example.com/web', d:'처음 보는 말을 그림으로', tag:'광고'}, {t:'<b>&', u:'a.com', d:''}], {hl:1, label:'검색'})`
      - 들어 있어야 할 것: `mk-sp`, `role="group"`, `aria-label="검색"`, `웹 공부`, `광고`, `mk-rux1 A`, `mk-rux2 A`, `내 사이트`, `&lt;b&gt;&amp;`, `검색어 웹 공부, 결과 2개, 내 사이트 2번째`
      - `<b>&`가 없다. `class="mk-spr on` 이 1번이다.
    - `serp('a', [{t:'x', u:'u'}], {hl:0})`에 `내 사이트 1번째`가 있고 `mk-spno`가 없다.
    - `serp('a', [{t:'x', u:'u'}])`에 `mk-spno`·`내 사이트는 결과에 없어요`·`내 사이트 없음`이 있다.
    - `serp('a', [{t:'x', u:'u'}], {still:true})`에 ` A"`·`mk-rux`가 없다.
    - throw: 결과 0줄, 5줄, 검색어 21자, 제목 33자, 한글 제목 17자(34), 설명 61자, 주소 41자, `hl:2`(2줄), `hl:-1`, `hl:0.5`, `hl:'0'`
    - 안 던짐: 제목 32자, 한글 제목 16자
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL wcat`, `FAIL base: … serp is not defined`. `wobj`·`wou`·`wm`·`wwrong`은 이미 통과해야 한다(측정 기준). 아니면 Ruling.
- [ ] **Step 3: 구현**: Interfaces대로 `CAT`, `wlen`, `serp`, CSS를 만든다. `.mk-spr.on` 테두리와 `.mk-spno` 글자 대비(그래픽 3:1, 글자 4.5:1)를 better-colors 방식으로 재고 커밋 본문에 적는다.
- [ ] **Step 4: 점검 통과**: `OK <수>`, `LATER wx: …`(45장 이름)
- [ ] **Step 5: 브라우저 확인**
  - 콘솔에서 `serp()` 최악 입력(4줄·제목 32자·설명 60자·공백 없는 주소 40자·꼬리표·`hl:3`)을 그린다.
  - 그 결과를 `#view`의 첫 `.fig .stage` innerHTML에 넣고 1280/375/320에서 넘침을 확인한다.
  - reduced-motion에서 결과 4줄이 모두 보이는지 확인한다.
  - `#/c/web/search`가 "아직 용어가 없어요"로 뜬다.
- [ ] **Step 6: 커밋**: `feat: 웹사이트 하위항목 3개와 serp 도우미`
- [ ] **Step 7: 디렉터 검토 ③ 묶음 A**

### Task 2~6: 새 카드 (공통 절차)

| Task | sec | 새 카드(표 순서대로 넣음) | COUNT | total |
|---|---|---|---|---|
| 2 | basic | Web App, Subdomain, Homepage | 11 | 1387 |
| 2 | core | Web Standards, Progressive Enhancement | 13 | ↑ |
| 2 | motion | Scroll Progress Indicator | 7 | ↑ |
| 2 | adv | Service Worker, Web App Manifest, Hydration | 12 | ↑ |
| 3 | parts | Feature Section, Logo, Pricing Section, Testimonial, About Page, Contact Page | 14 | 1396 |
| 3 | tip | Slug, No-code Builder, Coming Soon Page | 10 | ↑ |
| 4 | search | Search Engine, Crawler, Indexing, Keyword, Title Tag, Meta Description, Canonical URL, robots.txt▶, Structured Data, Backlink, UTM Parameter▶, QR Code | 12 | 1408 |
| 5 | browser | Address Bar, Rendering, Browser Engine, Refresh, Bookmark, Browser Extension, Pop-up Blocker, iframe, User Agent, Autofill, Browser History | 11 | 1419 |
| 6 | traffic | Page View, Unique Visitor, Referrer, Bounce Rate, Time on Page, Funnel, Heatmap, Retention Rate, Event Tracking | 9 | 1428 |

**그림 배정**(`browser(...)`는 틀이고 안의 강조 부분은 `.mk-hl` + 글자다):

| Task | 카드 → 그림 |
|---|---|
| 2 | Web App `vs`(읽는 웹사이트 / 쓰고 저장하는 웹 앱) · Subdomain `addr(['blog','example','com'], {y:[0]})` · Homepage `browser`(주소 `example.com/`, 메뉴·첫 화면) · Web Standards `doc` 표(같은 코드 · 브라우저 3개 · ✓ 같은 결과) · Progressive Enhancement `flow`(HTML만: 읽힘 → +CSS: 보기 좋음 → +JS: 편함) · Scroll Progress Indicator `browser` + 위쪽 막대가 차오름(`A`, `m:1`) · Service Worker `net`(브라우저 ↔ 서비스 워커 ↔ 서버, 끊기면 저장본) · Web App Manifest `pair(doc(manifest.json 블록), phone(홈 화면 아이콘))` · Hydration `track`(HTML 도착 → JS 도착 → 연결 → 버튼 동작) |
| 3 | Feature Section·Pricing Section·Testimonial·About Page·Contact Page·Coming Soon Page `browser`(그 부분 강조) · Logo `browser`(머리 왼쪽 로고 강조, 회사 로고 아님) · Slug `addr(['example.com','blog','web-tips'], {sep:'/', y:[2]})` · No-code Builder `pair`(블록 목록 → 완성 화면) |
| 4 | Search Engine·Keyword·Structured Data(꼬리표 `별점 4.5(예시)`) `serp` · Crawler `net`(크롤러 → 내 사이트, 링크 따라 다음 페이지) · Indexing `serp`(`hl` 없음) + `track`(수집 → 색인 → 결과) · Title Tag·Meta Description `pair(코드, serp)`(그 칸 강조) · Canonical URL `flow`(주소 A·주소 B → 대표 주소) · robots.txt▶ · Backlink `net`(다른 사이트 → 내 사이트) · UTM Parameter▶ · QR Code `pair`(CSS 칸 무늬 "모양 예시" → `browser` 주소) |
| 5 | Address Bar·Bookmark·Browser Extension·Pop-up Blocker·Autofill `browser`(그 부분 강조) · Rendering `track`(HTML 읽기 → DOM → 스타일 → 그리기) · Browser Engine `doc` 표(브라우저 · 엔진) · Refresh `flow`(누름 → 다시 요청 → 새 화면) · iframe `browser` 안 `browser` · User Agent `doc`(요청 머리 `User-Agent: …` 줄) · Browser History `doc` 목록(방문 순서) |
| 6 | Page View·Unique Visitor·Time on Page·Retention Rate·Event Tracking `doc` 표 · Referrer `net`(검색 → 내 사이트, "어디서 왔나") · Bounce Rate `rbar` + 문장 · Funnel `flow`(방문 → 상품 → 장바구니 → 결제, 수는 예시) · Heatmap `browser`(누른 곳 점 + "많이 누름" 글자) |

Task별 정해 둔 것:

- **Task 2**
  - `r`: Web App→`Native App`·`PWA`, Subdomain→`Domain`, Homepage→`Landing Page`, Web Standards→`Cross-browser`, Progressive Enhancement→`Polyfill`, Scroll Progress Indicator→`Progress Bar`, Service Worker→`PWA`·`Offline Support`, Web App Manifest→`PWA`, Hydration→`SSR`
  - x 짝: Web App vs Website vs PWA, Subdomain vs 경로(Path), Homepage vs Landing Page
- **Task 3**
  - `webparts` 기대값을 8 → 14로 고친다(Step 1에서).
  - `r`: Feature Section→`Hero Section`, Logo→`Header`, Pricing Section→`CTA Button`, Testimonial→`Landing Page`, About Page→`Contact Page`, Contact Page→`About Page`·`Form`, Slug→`URL`, No-code Builder→`CMS`, Coming Soon Page→`Landing Page`
  - x 짝: Feature Section vs 기획의 Feature(기능), Logo vs design의 Brand Color(r 금지), URL vs Domain vs Slug
- **Task 4**
  - `r`: Search Engine→`SEO`, Crawler→`SEO`, Indexing→`Crawler`, Keyword→`SEO`, Title Tag→`Meta Tag`, Meta Description→`Meta Tag`·`Open Graph`, Canonical URL→`SEO`, robots.txt→`Sitemap`, Structured Data→`SEO`, Backlink→`SEO`·`Hyperlink`, UTM Parameter→`URL`·`Analytics`, QR Code→`URL`
  - x 짝: Crawler vs Indexing, Title Tag vs Meta Tag vs Open Graph, Canonical URL vs Redirect(Canonical은 힌트), robots.txt(수집만 막음) vs noindex(검색에서 뺌, 막힌 주소도 설명 없이 결과에 나올 수 있음)
  - 출처: Google 검색 센터(robots.txt 소개, canonical, 구조화 데이터, 제목·스니펫), MDN(`<title>`, `<meta name="description">`)
  - **robots.txt▶**
    - `tpick(['허용', '차단'], '허용')` + 파일 칸(`User-agent: *` / `Allow: /` 또는 `Disallow: /`) + 크롤러 결과 줄(`✓ 수집함` / `✕ 수집 안 함`) + `.mk-hint aria-live="polite"`(`psay`)
    - 상태 표 `WROBOT = {'허용': {line, res, say}, '차단': {…}}`. 차단 `say`에 "검색에서 빼려면 noindex를 써요"를 넣는다.
    - `WDM['robots.txt'] = ['허용', '차단', 'aria-pressed', 'User-agent']`
  - **UTM Parameter▶**
    - `tpick(['카톡', '인스타', '메일'], '카톡')` + `addr(['example.com/sale', 'utm_source=kakao', 'utm_medium=social'], {sep:'?&', y:[1]})` 모양 + `psay`. 구분자는 `?`·`&`를 칸별로 바르게 보이게 한다(`addr`의 `sep`가 하나뿐이면 칸 글자에 구분자를 넣고 `sep:''`).
    - 값: 카톡 `kakao`, 인스타 `instagram`, 메일 `newsletter`(모두 예시)
    - `WDM['UTM Parameter'] = ['카톡', '인스타', '메일', 'utm_source', 'aria-pressed']`
- **Task 5**
  - `r`: Address Bar→`URL`, Rendering→`DOM`·`Render Blocking`, Browser Engine→`Cross-browser`·`Browser`, Refresh→`Hard Refresh`, Bookmark→`URL`, Browser Extension→`Browser`, iframe→`Embed`, User Agent→`Cross-browser`, Autofill→`Input Field`, Browser History→`Back Button`. Pop-up Blocker는 `r` 없음.
  - x 짝: Rendering vs SSR·CSR, Browser Engine vs Browser, Refresh vs Hard Refresh, Address Bar의 검색 vs Search Engine, Pop-up Blocker vs design의 Popover·Modal(r 금지)
  - 출처: MDN(Glossary Rendering engine·User agent, `<iframe>`, `window.open` 팝업), 각 브라우저 공식 문서(엔진 이름, iOS 브라우저의 WebKit)
- **Task 6**
  - `r`: Page View→`Analytics`, Unique Visitor→`Page View`, Referrer→`UTM Parameter`, Bounce Rate→`Above the Fold`·`Conversion Rate`, Time on Page→`Analytics`, Funnel→`Analytics`·`Conversion Rate`, Heatmap→`Analytics`, Retention Rate→`Analytics`, Event Tracking→`Analytics`
  - x 짝: Page View vs Unique Visitor, Bounce Rate vs Conversion Rate, Bounce Rate(GA4: 참여하지 않은 세션 비율) vs "바로 나감", Bounce Rate vs design의 Bounce·perf의 Debounce(r 금지), Event Tracking vs basics의 Event(r 금지), Time on Page vs back의 Session(r 금지)
  - 출처: GA4 도움말(이탈률·참여 세션), MDN(Referer 헤더)
  - 숫자는 모두 "(예시)"다. 이탈률 "좋은 기준"은 쓰지 않는다.
- Task 6 뒤 **디렉터 검토 ③ 묶음 B**

### Task 7: 글자상자 16장 다시 그리기 + 직접 조작 2장

**쓸 스킬:** frontend-design:frontend-design, animate

**Files:** Modify `index.html`(16장 `v`, `/* web: redraw … */` D 묶음), `tests/check.mjs`

**Interfaces:**
- Consumes: `addr`, `net`, `pair`, `browser`, `serp`, `track`, `doc`, `vs`, `rbar`, `tpick`, `psay`
- Produces: `wlayers(k: 1|2|3) -> string`(같은 버튼을 HTML만 / +CSS / +JavaScript로 그린 `browser()`). 범위 밖 k는 `throw new Error('wlayers: 1~3')`. D 묶음 안 지역 함수다.

- [ ] **Step 1: 실패하는 점검 추가**
  - `REDRAWN`에 `'web/basic','web/core','web/motion','web/adv','web/parts','web/search','web/browser','web/traffic','web/tip'`을 더한다.
  - `WOBJ`에서 아래 16장을 뺀다(17장 남음).
  - `WDM`에 더한다.
    - `'HTML': ['HTML만', '+ CSS', '+ JavaScript', 'aria-pressed']`
    - `'Conversion Rate': ['구매 4명', '구매 10명', 'aria-pressed', '(예시)']`
- [ ] **Step 2: 실패 확인**: `FAIL redrawn:web/…`(16장 이름), `FAIL wobj`, `FAIL wdm`
- [ ] **Step 3: 그림**: 스펙 3.2 표대로 16장의 `v`를 바꾼다.
  - 다시 그릴 16장(측정: 지금 `v`가 `flow`·`big`·`stack`인 카드): URL, Domain, HTML, CSS, JavaScript, Hosting, Hyperlink, SEO, Cookie, SSR, CSR, SSG, Cross-browser, Static Site, CMS, Conversion Rate
  - **HTML▶** `u-web-layers`: `tpick(['HTML만', '+ CSS', '+ JavaScript'], '+ JavaScript')` + `wlayers(k)` + `psay`. 고르면 그림 칸을 `wlayers(k)`로 바꾼다.
  - **CSS** `u-web-css` = `wlayers(2)`, **JavaScript** `u-web-js` = `wlayers(3)`(멈춘 장면, `m` 없음)
  - **Conversion Rate▶**: `tpick(['방문 200명 · 구매 4명', '방문 200명 · 구매 10명', '방문 50명 · 구매 10명'], …)`. 고르면 `rbar(pct, {label:'전환율'})`과 문장("200명 중 4명이 샀어요. 전환율 2%(예시)")을 다시 그린다. 값은 2%·5%·20%다(정수, 구매 ≤ 방문).
  - SEO: `serp(…, {hl:0})` 아래 `track`(크롤링 → 색인 → 순위 → 노출, 모두 `done`)
  - Cookie: `net` 메시지 `Set-Cookie: lang=ko`(응답) / `Cookie: lang=ko`(다음 요청). `nwt` 점검(15자 넘는 단어 금지)에 걸리면 줄을 나눈다.
  - Domain: `addr(['www','example','com'], {y:[1], sub:'사람이 외우는 이름 · 실제 주소는 203.0.113.10 같은 숫자(예시)'})`
- [ ] **Step 4: 점검 통과**: `OK <수>`
- [ ] **Step 5: 브라우저 확인**: web 9개 하위항목 전체. HTML·Conversion Rate는 Tab·Enter·Space와 같은 버튼 두 번을 확인한다.
- [ ] **Step 6: 커밋**: `feat: 웹사이트 글자상자 그림 16장 다시 그림과 직접 조작`

### Task 8: x 45장 채움 + 기존 그림 33장 점검

**쓸 스킬:** design-skills:ux-writing

- [ ] **Step 1**: `LATER`에서 `'wx'`를 뺀다 → `FAIL wx`(45장)
- [ ] **Step 2**: 45장에 `x`를 넣는다. 해요체 2~3문장이고, 짝이 있으면 차이를 먼저 쓴다. 기존 `d`는 바꾸지 않는다. 사실 문장은 출처를 확인하고 원장에 적는다.
  - 짝 예: URL vs Domain, Cookie vs Local Storage, SSR vs CSR vs SSG, SPA vs 여러 페이지, Meta Tag vs Open Graph, Landing Page vs Homepage, Header vs Hero Section, Analytics vs A/B Test, Static Site vs CMS
- [ ] **Step 3**: `OK <수>`
- [ ] **Step 4**: 그대로 둔 기존 그림 33장(WOBJ 17장 + 문자열 키 16장)을 브라우저 3폭에서 확인한다. 넘침·11px 미만만 고친다.
- [ ] **Step 5: 커밋**: `feat: 웹사이트 헷갈림 칸 45장 채움`
- [ ] **Step 6: 디렉터 검토 ③ 묶음 C**

### Task 9: 증상 색인 12개

- [ ] **Step 1: 실패하는 점검**: `SYM_WEB`(스펙 6장 12개 문구)를 더하고 `symcount` 기대값을 157 → 169로, 대조 목록에 `...SYM_WEB`을 더한다.
- [ ] **Step 2: 실패 확인**: `FAIL symcount`
- [ ] **Step 3: 데이터**: 스펙 6장 표의 그룹 칩에 넣는다(`오류·안 됨` 8, `글자` 2, `크기·화면` 1, `반응·클릭` 1). 대상은 모두 있는 영문명이다(측정: Session·Token Expiry·Content Security Policy 있음).
- [ ] **Step 4**: `OK <수>`
- [ ] **Step 5: 커밋**: `feat: 웹사이트 증상 12개`

### Task 10: 마무리 (글꼴, 문서, 전체 점검)

**쓸 스킬:** impeccable(audit), break-ui, design-skills:accessibility-audit

**Files:** Modify `index.html`(FONT 블록), `tests/check.mjs`, `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`

- [ ] **Step 1: 글꼴 도구**: 이 세션 스크래치패드 `C:\Users\HELLOW~1\AppData\Local\Temp\claude\C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide\af217e6a-1338-434d-ad6c-2e7d9f6e9d35\scratchpad\`에 `font_subset.py`와 `fontsrc\`가 있다(측정: 계획 작성 시점). 없으면 사용자에게 묻고 멈춘다.
- [ ] **Step 2: 실패 확인**: `LATER = []` → `FAIL font`(새 글자가 있을 때), `FAIL doccount`
- [ ] **Step 3: 서브셋**: `python -E -P font_subset.py index.html <Hahmlet.ttf> <작업 폴더>`
- [ ] **Step 4: 문서**
  - PRODUCT.md: 용어 1428개, 웹사이트 9개·99개 표기, 증상 색인 169개
  - docs/PLAN.md: ③ 웹사이트 완료 표시, "오류·안 됨" 칩 수를 실제 수로
  - DESIGN.md: `ide()`·`mem()` 규칙 뒤에 `serp()` 규칙(한도, `hl`은 0부터, 없음 상태, `mk-rux` 등장, `still`·`label`, 요약 `.sr`, 중립 모형)
- [ ] **Step 5: 점검 통과**: `OK <수>`(LATER 없음)
- [ ] **Step 6: 전체 브라우저 확인**
  - web 9개 하위항목 전체를 1280/375/320과 reduced-motion에서 본다. 직접 조작 4장은 키보드로 조작한다.
  - 홈·검색("UTM", "이탈률", "robots")·증상 화면도 콘솔 오류 0이어야 한다.
- [ ] **Step 7: 품질**
  - break-ui 입력: `serp()` 4줄·제목 32자·설명 60자·공백 없는 주소 40자
  - impeccable audit
  - 이번 범위 문제만 고친다.
- [ ] **Step 8: 커밋**: `feat: 웹사이트 글꼴·문서 갱신`
- [ ] **Step 9: 디렉터 최종 검토** → 반영 → 원장 Ruling·deferred minor 보고 → superpowers:finishing-a-development-branch(main 병합은 사용자 확인 뒤)
