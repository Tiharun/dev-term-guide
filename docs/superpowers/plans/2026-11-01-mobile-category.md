# 모바일 앱 카테고리 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `프론트엔드` 다음에 `모바일 앱` 카테고리를 만든다. 하위항목 6개에 새 카드 71개를 넣고 증상 12개를 추가한다. 앱 화면이 바뀌는 카드는 공용 앱 화면 모형 `app()`, 출시 단계는 공용 단계 띠 `track()`으로 그린다.

**Architecture:** `index.html` 하나에서 작업한다.
- 데이터: DATA 구간에 `CAT`/`T`/`SYM`을 호출한다.
- 그림: `D`에 `Object.assign`으로 더한다.
- `app()`은 기존 `phone()` 틀 안에 상태 표시줄과 장면을 겹쳐 쌓고, 뒤 장면이 정해진 시각에 밀려 들어와 앞 장면을 덮는다. `track()`은 단계 목록이고, 상태 글자는 테스트 모형의 `mk-rux1~5` 키프레임을 그대로 쓴다. 직접 조작은 `init(stage)`를 쓴다.
- 기존 카드는 옮기지 않는다. `MOVED`는 그대로다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, fonttools(테스트 때와 같은 `font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-01-mobile-category-design.md](../specs/2026-11-01-mobile-category-design.md)

**스펙과 다른 점(계획 작성 중 스펙에도 반영함):**
- **영문명 확정**: `·`는 ` / `로 쓴다(`Universal Link / App Link`, `APNs / FCM`, `Bundle ID / Package Name`, `Version / Build Number`, `IPA / AAB`, `Privacy Label / Data Safety`, `VoiceOver / TalkBack`). 괄호 풀이는 `ko`로 옮긴다: `App Launch`(콜드·웜 스타트), `Secure Storage`(키체인·키스토어). 측정: 이 이름과 slug도 기존과 겹치지 않는다.
- **CSS 접두어**: `mk-ap`는 이미 쓰인다(측정: `mk-apst`·`mk-apsb` 등 11개). 그래서 `app()`은 `mk-mo`, `track()`은 `mk-mt`다(측정: 둘 다 0건).
- **`track()` 상태 글자**: 기본은 ✓ 완료·✕ 실패·● 진행 중·… 대기다. 단계마다 `w`로 글자를 바꾼다(예: 심사 `{s:'fail', w:'거절'}`). "빌드 통과"처럼 어색한 말을 피한다.
- **`tap` 뜻 확정**: 장면 k의 `tap`은 "이 장면에서 다음 장면으로 가려고 누르는 곳"이다. 마지막 장면에 `tap`이 있으면 throw한다.
- **직접 조작 도우미**: `tkeys` 버튼만 쓴다(끌기 없음, 테스트와 같음).

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN을 쓰지 않는다.
- 색과 글꼴은 `:root` 변수를 먼저 쓴다. 모바일 모형은 도판 토큰(`--ink`·`--plate`·`--mark`·`--ok`·`--mark-text`·`--mono` 등)만 쓴다.
- 그림 속 글자는 최소 11px이다. 도판 틀(`.fig`)에는 그림자를 넣지 않는다. 기본 easing은 `var(--ease)`다.
- 자동 애니메이션은 클래스 `A`와 `--ps` 구조를 쓴다. 주기 10초, 멈춘 장면은 음수 지연 `-8.8s`(88%)이고 마지막 장면·모든 단계 상태가 보이는 모습이다. 움직이는 그림은 `m:1`이다.
- 새 D 키는 `'u-' + slug(en)`이다. 새 CSS 클래스·키프레임 이름은 `mk-mo`·`mk-mt`로 시작한다.
- 상태는 색만으로 나누지 않는다. 기호와 글자를 함께 쓴다.
- 카드 문구 규칙:
  - `d`: 해요체 한 줄 / `p`: "~해줘" 지시문, 정식 용어를 넣는다 / `r`: 기존 영문명 1개 이상 / `l`: 1~3 / `ko`: `한글 · 풀이`
  - `o:1`: 공식 문서를 직접 열어 확인했을 때만 쓰고 `u`를 단다. 공식 문서는 developer.apple.com, developer.android.com, support.google.com/googleplay, docs.expo.dev, reactnative.dev, docs.flutter.dev, kotlinlang.org, swift.org다.
- 값 단정 금지:
  - 스토어·플랫폼 정책(비용, 심사 기간, 테스터 수·기간, 단계적 출시 비율, 권한 재요청 규칙, 파일 형식)은 공식 문서로 확인한 것만 쓰고 "2026-11 확인"을 붙인다. 확인 못 한 값은 넣지 않는다.
  - 실무 관행(Ask Permission in Context, Test on Real Device 등)은 "보통", "흔히"로 쓰고 `o:0`이다.
  - 그림 속 시간·용량·% 값은 예시다. 그 D 묶음 주석에 "예시"라고 적는다.
- 그림 속 앱·회사 이름은 가짜(`장보기 앱`, `com.example.shop` 등)만 쓴다. 실제 서비스 이름을 쓰지 않는다(Apple·Google 스토어·도구 이름 자체는 용어라 쓴다).
- 장면은 그림당 4개, 단계는 5개까지다.
- 코드·명령 줄은 36자 안쪽으로 쓴다(375px 기준).
- 사이트 이름 같은 재사용 값은 `SITE`를 쓴다.
- 브라우저 확인은 Playwright MCP로 한다. 평소 Chrome 프로필·저장된 로그인을 쓰지 않고, `state save` 파일을 만들지 않는다.
- 작업 단위마다 커밋한다. 메시지는 한국어 `feat:`/`docs:`이고 attribution 줄을 넣지 않는다. `.impeccable/hook.cache.json`은 스테이징하지 않는다.
- 작업마다 "쓸 스킬"을 쓴다. 설치되지 않은 스킬은 건너뛴다.

## Review Focus

1. **휴대폰 틀 안 긴 글 넘침**: 긴 화면 제목·본문·단계 이름·단계 설명이 들어가도 320px·375px에서 페이지가 가로로 넘치면 안 되고, 휴대폰 틀(190px) 밖으로 글자가 삐져나오면 안 된다. → Task 2 브라우저 확인(직접 넣어 보기), Task 9 break-ui
2. **멈춘 장면이 엉뚱함**: 동작 줄이기 설정이거나 화면 밖에서 멈춘 그림은 마지막 장면이 맨 위에 보이고, 손가락 점과 단계 고리는 안 보이며, 모든 단계에 상태 글자가 보여야 한다. → Task 1 `aframe`·`kframe` 점검, Task 2 브라우저 확인(reduced-motion)
3. **번호가 밀린 뒤 기존 카드**: 뒤 카테고리(백엔드~AI) 번호가 하나씩 밀려도 기존 주소(`#/t/back-session`)·즐겨찾기(`devdict.pins`에 든 `back-session`)·검색이 그대로 동작해야 한다. → Task 1 브라우저 확인
4. **직접 조작을 키보드·터치로, 결과는 정해진 순서로**:
   - 4장 모두 Tab으로 버튼에 들어가 Enter·Space로 바꿀 수 있고, 375px에서 탭할 수 있으며, 결과 문장이 `aria-live`로 읽혀야 한다.
   - 같은 순서로 누르면 늘 같은 결과다(`Math.random` 금지).
   - 끝에서 더 누르는 경우(쌓인 화면 4장에서 "다음 화면", 1장에서 "뒤로", 앞에 있을 때 "오래 두기")도 오류 없이 안내 문장이 나와야 한다.
   - → Task 2·3 브라우저 확인
5. **화면 낭독기가 지나간 장면까지 읽음**: 맨 위 장면만 읽히고(나머지 `aria-hidden="true"`), 상태 표시줄·손가락 점·단계 고리는 읽히지 않으며, 단계 상태는 기호가 아니라 글자로 읽혀야 한다. → Task 1 `base` 점검

---

## 공통 절차 (Task 2~7에 적용)

1. **실패하는 점검 추가**: `tests/check.mjs`에 아래를 넣는다.
   - `EXPECT['mobile/<sec>']`: 그 Task 표의 영문명
   - `COUNT['mobile/<sec>']`
   - `total` 기대값: 표의 누계(주석 끝에 `+ 모바일`을 더한다)
2. **실패 확인**: `node tests/check.mjs` → `FAIL expect:mobile/<sec>`
3. **데이터**:
   - `/* ===== 04 모바일 앱 ===== */` 스크립트 블록의 `T('mobile','<sec>',[...])`에 스펙 순서대로 넣는다.
   - 이 블록은 Task 2에서 `/* ===== 04 프론트엔드 ===== */` 블록 뒤, `/* ===== 05 백엔드 ===== */` 앞(2264줄)에 새로 만든다.
4. **그림**:
   - `const visual`(5414줄) 바로 앞, `/* test: tip … */` 묶음 뒤에 `/* mobile: <sec> — … */` 주석과 `Object.assign(D, {...})`를 둔다.
   - 주석에는 공식 문서로 확인한 값과 예시 값을 나눠 적는다.
   - 무엇으로 그릴지:
     - 앱 화면이 바뀌는 흐름: `app()`
     - 출시·심사 단계: `track()`
     - 명령 실행: `term()` (예: `npx expo start`)
     - 푸시 전달: `net()`(`server`·`cloud`·`phone` 아이콘)
     - 웹과 앱 비교: `browser()`와 `app()`
     - 비유: `pair(art, app(...))` 또는 `pair(art, track(...))`
     - 나쁜 예·좋은 예, 두 플랫폼 비교: `<div class="cmp"><div class="bad" data-l="…">…</div><div class="good" data-l="…">…</div></div>`(비교는 둘 다 좋은 예가 아니면 `cmp` 대신 기존 `.mk-two`)
     - 흐름이 없는 카드(파일·이름표): 새 `mk-mo…` 부품. 부품 루트 클래스는 `.fig:has(…)` 두 목록에도 더한다.
5. **직접 조작**(표에 있는 카드만):
   - stage는 `<div class="mk-mobox">${app([...], {still:true, label})}</div>${tkeys([...])}<span class="mk-hint" aria-live="polite">…</span>`이다.
   - `init`은 `.mk-mobox`의 innerHTML과 `.mk-hint` 글자만 바꾼다. 라이브 영역을 다시 만들지 않아야 읽힌다.
   - 고른 버튼에는 `aria-pressed="true"`를 단다. 켜고 끄는 버튼은 `aria-pressed`를 번갈아 바꾼다.
   - 리스너는 stage 안 요소에만 단다. 모양은 `u-mock`(5196줄)을 따른다.
   - 상태 표는 그 D 묶음 앞 상수(예: `MNAV`)로 둔다.
6. **점검 통과**: `node tests/check.mjs` → `OK <수>`. `LATER font` 줄은 Task 9 전까지 정상이다.
7. **브라우저 확인**(아래 절차):
   - 1280px·375px 스크린샷, 넘침 없음, 11px 미만 0, 콘솔 오류 0
   - 직접 조작 카드는 마우스 클릭, 375px에서 화면 버튼 클릭, 키보드로 조작해 본다.
8. **커밋**: `git add index.html tests/check.mjs && git commit -m "feat: 모바일 <하위항목 이름> 하위항목 추가"`

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/mobile/<sec>`. 캐시 때문에 `?r=`가 필요하다.
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**: `document.documentElement.scrollWidth <= innerWidth` → `true`. 휴대폰 틀 안: `[...document.querySelectorAll('#view .mk-mos')].filter(s => s.scrollWidth > s.clientWidth + 1)` → `[]`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900과 375×812에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)

---

### Task 1: 기반 (카테고리, 앱 화면 모형, 단계 띠, 점검 확장)

**쓸 스킬:** frontend-design, impeccable(shape), animate, interfaces:better-accessibility, interfaces:better-colors

**Files:**
- Modify `index.html`:
  - 카테고리 목록: 1562줄 `CAT('front', …)` 다음 줄
  - `.fig:has(…)` 두 목록(406줄)과 `.cmp>div:has(…)`(306줄)
  - CSS: `.mk-rupy` 규칙(397줄) 뒤, `.mk-btn`(398줄) 앞
  - 모형 도우미: `rbar`(3304줄) 뒤, `/* 직접 조작 도우미 … */` 주석 앞
- Modify `tests/check.mjs`

**Interfaces:**
- Consumes: `esc`, `phone`, `pair`, `term`, `net`, `browser`, `tkeys`, 키프레임 `mk-rux1~5`와 클래스 `.mk-rux1~5`(index.html 384·386줄)
- Produces:
  - **카테고리**:
    - `CAT('mobile','모바일 앱','휴대폰 앱을 만들고 스토어에 내보내는 말', [['store','앱 스토어·출시','앱을 스토어에 올리고 사용자에게 내보내는 과정의 말']])`을 `front` 바로 뒤에 둔다.
    - secs id는 `basic, core, motion, adv, store, tip` 순서다.
  - **`app(scenes, opt = {}) -> string`**: 측정: `const|let|var|function app`·`track` 선언 0건.
    - `scenes[i]`: `{t, b = '', tap, go}`
      - `t` 화면 제목(`esc`), `b` 본문 HTML(그대로 넣음, `phone()` 본문과 같은 책임).
      - 1~4개. 아니면 `throw new Error('app: 장면은 1~4개')`.
      - `go`: 2번째 장면부터 `'push'|'modal'|'fade'`, 없으면 `'push'`. 다른 값이면 `throw new Error('app: 전환 ' + go)`. 1번째 장면의 `go`는 무시한다.
      - `tap`: `[x, y]`(장면 안 %)이고 "다음 장면으로 가려고 누르는 곳"이다. 마지막 장면에 있으면 `throw new Error('app: 마지막 장면에는 tap이 없어요')`.
    - `opt`: `{still = false, label, notch = true}`
      - `still`: true면 `A`·`mk-mok`·`mk-motap` 요소를 만들지 않는다(직접 조작용). 장면은 그대로 겹쳐 쌓여 마지막이 맨 위다.
      - `label`: 있으면 루트에 `role="group"`과 `aria-label`.
    - 구조: `<div class="mk-mo"[ role="group" aria-label]>${phone(상태 표시줄 + 장면 판, {notch})}</div>`
      - 상태 표시줄: `<div class="mk-most" aria-hidden="true"><span>9:41</span>{배터리 SVG}</div>`
      - 장면 판: `<div class="mk-mov">` 안에 장면 k(1부터)마다 `<section class="mk-mos {go} mk-mok{k} A"[ aria-hidden="true"]><b class="mk-mot">{t}</b><div class="mk-mob">{b}</div>{손가락 점}</section>`. 1번째 장면에는 `{go}`·`mk-mok1`·`A`를 붙이지 않는다. 마지막 장면만 `aria-hidden`이 없다(Review Focus 5).
      - 손가락 점: `<i class="mk-motap mk-motk{k} A" style="left:{x}%;top:{y}%" aria-hidden="true"></i>`
    - CSS:
      - `.mk-mov{position:relative;flex:1;min-height:0;overflow:hidden}`, `.mk-mos{position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;background:var(--plate);overflow-wrap:anywhere}`(Review Focus 1)
      - `.mk-mos.A,.mk-motap.A{animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:var(--ease)}`
      - `.mk-mos.push.mk-mok{k}{animation-name:mk-mopu{k}}`, `modal` → `mk-momo{k}`, `fade` → `mk-mofa{k}`(k = 2~4), `.mk-motk{k}{animation-name:mk-motk{k}}`(k = 1~3)
    - 키프레임(T = 30, 50, 70이 k = 2, 3, 4가 들어오는 때):
      - `@keyframes mk-mopu{k}{0%,{T}%{transform:translateX(100%)}{T+4}%,96%{transform:none}96.1%,100%{transform:translateX(100%)}}`
      - `mk-momo{k}`는 `translateY(100%)`, `mk-mofa{k}`는 `opacity:0` ↔ `opacity:1`로 같은 구간이다.
      - 손가락 점(장면 k에서 누름, 다음 장면 T = 30·50·70): `@keyframes mk-motk{k}{0%,{T-5.1}%{opacity:0}{T-5}%,{T}%{opacity:1}{T+0.1}%,100%{opacity:0}}`, 기본 `opacity:0`
      - 그래서 88%에서 모든 장면이 들어와 있고 손가락 점은 사라져 있다(Review Focus 2).
  - **`track(steps, opt = {}) -> string`**:
    - `steps[i]`: `{t, s, n, w}`
      - `s`는 `'done'|'fail'|'now'|'wait'`. 다른 값이면 `throw new Error('track: 상태 ' + s)`.
      - 1~5개. 아니면 `throw new Error('track: 단계는 1~5개')`.
      - 상수 `MT_S = {done:['✓','완료'], fail:['✕','실패'], now:['●','진행 중'], wait:['…','대기']}`. `w`가 있으면 글자만 바꾼다. 모양은 `RU_S`를 따르되 키 검사는 `Object.hasOwn`으로 한다.
      - `n`: 단계 아래 설명(선택). 모든 글자는 `esc()`.
    - `opt`: `{still = false, label}`. `still`이면 고리(`mk-mtr`)를 만들지 않고 상태 글자에 `mk-rux{k}`·`A`를 붙이지 않는다. `label`은 `app()`과 같다.
    - 구조: `<div class="mk-mt"[ role="group" aria-label]><ol class="mk-mtl">` + 단계 k마다 `<li class="mk-mtc {s}"><i class="mk-mtr mk-mty{k} A" aria-hidden="true"></i><b class="mk-mtn">{t}</b><span class="mk-mts mk-rux{k} A"><b aria-hidden="true">{기호}</b>{글자}</span>{n이 있으면 <span class="mk-mtd">{n}</span>}</li>` + `</ol></div>`
    - 단계 사이 화살표는 CSS `::after`(`→`, 컨테이너 240px 이하 `↓`로 세로 쌓기)이고 읽히지 않는다. 루트는 `container-type:inline-size`.
    - CSS: `.mk-mtr.A,.mk-mts.A{animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite;animation-timing-function:linear}`, `.mk-mty{k}{animation-name:mk-mty{k}}`(k = 1~5)
    - 고리 키프레임: `@keyframes mk-mty{k}{0%,{10k+4}%{opacity:0}{10k+5}%,{10k+14}%{opacity:1}{10k+15}%,100%{opacity:0}}`, 기본 `opacity:0`. 상태 글자는 `mk-rux{k}`라 10k+5%에 나타난다.
    - 색: `done`은 `--ok`, `fail`은 `--mark-text`, `now`는 `--mark` 테두리. `--plate` 배경에서 4.5:1 이상인지 better-colors로 재고 커밋 본문에 적는다.
  - **`.mk-mobox{width:100%;display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:12px}`**, `.stage:has(>.mk-mobox){padding-top:50px}`: 직접 조작 자리(`.mk-rubox`와 같다). 320px에서는 옆 표시가 휴대폰 아래로 내려간다(`flex-wrap`).
  - **`.fig:has(…)`**: 두 목록에 `.mk-mo`·`.mk-mt`를 더한다. `.cmp>div:has(>.mk-mo)`·`.cmp>div:has(>.mk-mt)`도 `.mk-ru`와 같은 규칙을 준다.
  - **`LATER`**: `['font']`. Task 9에서 비운다.

- [ ] **Step 1: 실패하는 점검 추가**(check.mjs)
  - `cat`에 더한다: `mobile` 카테고리가 `front` 바로 다음이고, secs id가 `['basic','core','motion','adv','store','tip']`다.
  - `mv`: `t.c === 'mobile'`인 카드는 모두 `v`가 `'u-'`로 시작하는 문자열이다(`tv`와 같다).
  - `mm`: `t.c === 'mobile'`이고 `m`이 있는 그림의 `h`에 `/ A["\s]/`가 있어야 한다(`tm`과 같다).
  - `base`에 다음을 더한다.
    - `const ap = app([{t:'홈', b:'a', tap:[50, 80]}, {t:'상세', b:'b', go:'modal'}], {label:'흐름'})`
      - `mk-mo`·`mk-phone`·`role="group"`·`aria-label="흐름"`·`9:41`·`class="mk-most" aria-hidden="true"`·`modal mk-mok2 A`·`mk-motap mk-motk1 A`·`left:50%;top:80%`이 있다.
      - `class="mk-mos`가 2번, `/<section class="mk-mos[^"]*" aria-hidden="true">/`가 1번 나온다(Review Focus 5).
      - `/<i class="mk-motap[^"]*" style="[^"]*" aria-hidden="true">/`에 맞는다.
    - `app([{t:'a'}, {t:'b'}])`에 `push mk-mok2 A`가 있다(기본 전환).
    - `app([{t:'<b>&'}])`에 `<b>&`가 없고 `&lt;b&gt;&amp;`가 있다.
    - throw: 장면 0개, 5개, `{go:'zoom'}`인 2번째 장면, 마지막 장면의 `tap`.
    - `app([{t:'a', tap:[1, 1]}, {t:'b', go:'fade'}], {still:true})`에 ` A"`·`mk-mok`·`mk-motap`이 없고 `aria-hidden="true">`는 1번(장면) 남는다.
    - `const tr = track([{t:'빌드', s:'done'}, {t:'심사', s:'fail', w:'거절', n:'설명 부족'}, {t:'출시', s:'wait'}])`
      - `✓`·`완료`·`✕`·`거절`·`…`·`대기`·`설명 부족`·`mk-rux2 A`·`mk-mty3 A`가 있고 `실패`는 없다. `class="mk-mtc `가 3번이다.
      - `/<i class="mk-mtr[^"]*" aria-hidden="true">/`에 맞고, 기호는 `<b aria-hidden="true">✓</b>` 꼴이다.
    - `track([{t:'a', s:'now'}])`에 `●`·`진행 중`, `track([], …)`·6단계·`{s:'ok'}`·`{s:'toString'}`은 throw한다.
    - `track([{t:'a', s:'done'}], {still:true})`에 ` A"`·`mk-rux`·`mk-mty`·`mk-mtr`이 없다.
    - `track([{t:'<i>', s:'done', n:'&'}])`에 `<i>`가 없다.
  - `aframe`: `rframe`과 같은 방식이다.
    - `/\.mk-mos\.A,\.mk-motap\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/`에서 멈춘 지점 P(%)를 읽는다.
    - k = 2~4, 전환 `pu`·`mo`·`fa`마다 `@keyframes mk-mo{전환}{k}`의 둘째 구간 `a%,b%{transform:none|opacity:1}`이 a ≤ P ≤ b인지 본다.
    - k = 1~3마다 `@keyframes mk-motk{k}`의 셋째 구간 시작(점이 사라지는 %)이 P 이하인지 본다.
  - `kframe`: `/\.mk-mtr\.A,\.mk-mts\.A\{animation-duration:10s;animation-delay:-([\d.]+)s/`의 P에서, k = 1~5마다 `mk-mty{k}`가 사라지는 %가 P 이하인지 본다(상태 글자 `mk-rux`는 기존 `rframe`이 본다).
  - `LATER = ['font']`
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL cat`, `FAIL base: … app is not defined`, `FAIL aframe`, `FAIL kframe`. 다른 점검은 그대로 통과해야 한다.
- [ ] **Step 3: 구현**: Interfaces대로 `CAT`, `app`, `track`, `MT_S`, CSS, 키프레임을 만든다. 상태 색 대비를 재서 커밋 본문에 적는다.
- [ ] **Step 4: 점검 통과**: `node tests/check.mjs` → `OK <수>`
- [ ] **Step 5: 브라우저 확인**
  - `#/c/mobile/basic`이 "아직 용어가 없어요"로 뜬다.
  - 홈·사이드 목록에서 `front` 뒤 백엔드~AI 번호가 하나씩 밀린다.
  - localStorage `devdict.pins`를 `["back-session"]`으로 두고 새로고침해도 그대로이고, `#/t/back-session`이 열린다(Review Focus 3).
  - 콘솔 오류 0
- [ ] **Step 6: 커밋**: `feat: 모바일 앱 카테고리와 앱 화면·단계 띠 모형 기반`

### Task 2~7: 하위항목 6개

| Task | sec | EXPECT (스펙 순서) | 직접 조작 | 비유 | COUNT | total | 쓸 스킬 |
|---|---|---|---|---|---|---|---|
| 2 | basic | Mobile App, iOS, Android, Native App, Hybrid App, Cross-platform, WebView, Screen, App Icon, Push Notification, Permission Request | Permission Request | — | 11 | 1197 | frontend-design, interfaces:better-writing |
| 3 | core | React Native, Flutter, Expo, Swift, Kotlin, Xcode, Android Studio, Simulator vs Emulator, Navigation Stack, App Lifecycle, Deep Link, Offline Support, Local Notification, iOS vs Android Differences | Navigation Stack, App Lifecycle, Offline Support | — | 14 | 1211 | source-driven-development, interfaces:better-layout, interfaces:better-accessibility |
| 4 | motion | Screen Transition, Modal Presentation, Keyboard Avoiding, Fast Refresh, App Launch, Background Refresh, App Icon Badge, Notification Tap, Force Update | — | — | 9 | 1220 | animate, source-driven-development |
| 5 | adv | Native Module, Development Build, Platform-specific Code, Universal Link / App Link, APNs / FCM, Push Token, Secure Storage, Biometric Authentication, App Sandbox, Background Task Limits, In-app Purchase | — | App Sandbox | 11 | 1231 | source-driven-development, design-skills:interaction-design |
| 6 | store | App Store vs Google Play, Developer Account, App Store Connect, Google Play Console, Bundle ID / Package Name, Code Signing, Version / Build Number, IPA / AAB, TestFlight, Internal Testing Track, App Review, App Rejection, Store Listing, Privacy Label / Data Safety, Staged Rollout, OTA Update | — | Code Signing | 16 | 1247 | source-driven-development, interfaces:better-layout |
| 7 | tip | App vs Web, Ask Permission in Context, Test on Real Device, Minimum OS Version, App Size, Crash Reporting, Tablet Support, VoiceOver / TalkBack, Ratings & Reviews, Expo Go | — | — | 10 | 1257 | design-skills:ux-writing, interfaces:better-writing |

측정: 새 영문명 71개는 기존 카드와 이름·slug가 겹치지 않는다. `Ratings & Reviews`의 id는 `mobile-ratings-reviews`, `IPA / AAB`는 `mobile-ipa-aab`다.

**연결(`r`, 스펙 4.7 표)**: 각 카드의 `r`에 스펙 4.7 표의 "이미 있는 카드" 영문명을 단다. 기존 카드의 `r`은 고치지 않는다.

**정책·도구 값 확인 표**(Task 2~7 공통): 그림·문구에 넣는 값마다 출처를 열어 확인하고, 확인한 줄을 그 Task 커밋 본문에 적는다(검색 확인). 확인하지 못한 값은 빼거나 "보통"으로 쓴다.

| 카드 | 확인할 값 | 출처 |
|---|---|---|
| Permission Request·Ask Permission in Context | 거부한 뒤 다시 요청하면 창이 뜨는지(iOS·Android 버전별) | developer.apple.com(권한 요청), developer.android.com Request runtime permissions |
| React Native·Expo·Expo Go·Development Build | 새 프로젝트·실행 명령(`npx create-expo-app`, `npx expo start`), Expo Go와 개발 빌드 차이 | docs.expo.dev, reactnative.dev |
| Flutter | 실행 명령(`flutter run`), 핫 리로드 키 | docs.flutter.dev |
| Swift·Kotlin·Xcode·Android Studio | 각 공식 언어·IDE 설명 | swift.org, kotlinlang.org, developer.apple.com Xcode, developer.android.com Studio |
| Simulator vs Emulator | iOS Simulator와 Android Emulator 이름·차이 | developer.apple.com, developer.android.com Run apps on the emulator |
| Navigation Stack | 첫 화면에서 뒤로 가기를 눌렀을 때 동작(Android 12+ 변경 포함) | developer.android.com(뒤로 탐색·Activity 상태) |
| App Lifecycle·Background Task Limits | 앱 상태 이름, 뒤에서 오래 두면 시스템이 끝낼 수 있음, 백그라운드 작업 제한 | developer.apple.com(앱 생명주기·BGTaskScheduler), developer.android.com(Activity lifecycle·WorkManager·Doze) |
| Fast Refresh | 저장하면 상태를 유지한 채 바뀜 | reactnative.dev Fast Refresh |
| App Launch | cold·warm(·hot) start 정의 | developer.android.com App startup time |
| Universal Link / App Link | `apple-app-site-association`, `assetlinks.json` | developer.apple.com, developer.android.com |
| APNs / FCM·Push Token·Local Notification | 서버 → APNs/FCM → 기기 흐름, 기기 토큰 | developer.apple.com User Notifications, firebase.google.com Cloud Messaging |
| Secure Storage·Biometric Authentication | Keychain·Keystore, Face ID·지문 API 이름 | developer.apple.com, developer.android.com |
| App Sandbox | 앱마다 자기 저장 공간만 씀 | developer.apple.com, source.android.com(앱 샌드박스) |
| In-app Purchase | StoreKit, Google Play Billing(수수료 숫자는 확인했을 때만) | developer.apple.com, developer.android.com |
| Developer Account | Apple 연회비, Google 등록비(확인 날짜 붙임) | developer.apple.com/support/enrollment, support.google.com/googleplay/android-developer |
| Bundle ID / Package Name | 역도메인 형식, 출시 후 못 바꿈 | developer.apple.com, developer.android.com Configure the app module |
| Version / Build Number | `CFBundleShortVersionString`·`CFBundleVersion`, `versionName`·`versionCode` | developer.apple.com, developer.android.com Version your app |
| IPA / AAB | 새 앱은 AAB로 올리는 규칙 | developer.android.com App Bundle, developer.apple.com |
| TestFlight·Internal Testing Track | 테스터 수·빌드 사용 기간 | developer.apple.com TestFlight, support.google.com/googleplay/android-developer(테스트 트랙) |
| App Review·App Rejection | 심사 지침 이름, 보통 걸리는 기간(공식 문구 그대로) | developer.apple.com App Review, support.google.com/googleplay |
| Privacy Label / Data Safety | App Privacy details, Data safety 섹션 | developer.apple.com, support.google.com/googleplay |
| Staged Rollout | Apple phased release 일정, Google 비율 지정 | developer.apple.com, support.google.com/googleplay |
| OTA Update | `eas update`, 스토어 심사 없이 바꿀 수 있는 범위 | docs.expo.dev EAS Update |
| Minimum OS Version | deployment target, `minSdk` | developer.apple.com, developer.android.com |
| Crash Reporting | 도구 이름은 공식 문서를 열었을 때만(예: Firebase Crashlytics) | firebase.google.com |
| VoiceOver / TalkBack | 각 화면 낭독기 이름·켜는 곳 | support.apple.com, support.google.com/accessibility |

**Task 2 추가:**
- **Permission Request 직접 조작**(`m:0`):
  - 상태는 `'ask'|'yes'|'no'`, 처음은 `'ask'`이다. 버튼은 `tkeys(['허용','거부','다시 묻기'])`.
  - 화면: `ask`는 장면 본문에 권한 창(“카메라를 사용하려고 해요” + 허용·거부 모양, 실제 버튼 아님), `yes`는 카메라 화면, `no`는 "설정에서 카메라를 켜 주세요" 안내.
  - 허용·거부는 `ask`일 때만 상태를 바꾼다. 이미 답했으면 상태는 그대로이고 "이미 답했어요" 문장을 낸다.
  - 다시 묻기: `ask`·`yes`면 그대로, `no`면 창이 다시 안 뜬다는 문장이다. 이 문장과 플랫폼 차이는 값 확인 표대로 확인한 뒤 쓴다.
  - `r:['Permission','Principle of Least Privilege']`
- **Push Notification**: `app()` 2장면(잠금 화면 알림 → 누르면 앱 화면). `x`에 Git의 Push와 뜻이 다르다고 쓰고 `r:['Push']`.
- **Native·Hybrid·Cross-platform·WebView**: `.mk-two`로 "코드 하나 → 앱 둘" 같은 차이를 보인다. WebView는 `app()` 안에 `.mk-url` 띠가 있는 웹 화면. `r:['PWA']`
- **Screen**: `r:['Touch Target','Tap']`
- **브라우저 추가 확인**:
  - `browser_emulate_media` reduced-motion에서 `app()` 그림은 마지막 장면이 맨 위, `.mk-motap` opacity 0이다. 재생 버튼을 누르면 움직인다(Review Focus 2).
  - Permission Request를 Tab으로 버튼까지 가서 Enter·Space로 바꾸고, 375px에서 탭하며, "허용 → 거부 → 다시 묻기" 같은 끝 경우를 눌러 본다(Review Focus 4).
  - 320px에서 한 그림의 stage 끝에 `app([{t:'공백 없는 아주 긴 화면 제목 40자…', b:'<p>공백 없는 본문 80자…</p>'}])`와 `track([{t:'긴 단계 이름 20자…', s:'fail', n:'긴 설명 60자…'}, …5단계])`를 `insertAdjacentHTML`로 넣고, 페이지 넘침과 `.mk-mos` 넘침을 잰 뒤 새로고침한다(Review Focus 1).

**Task 3 추가:**
- **Navigation Stack 직접 조작**(`m:0`):
  - 화면 순서 상수 `MNAV = ['홈','상품 목록','상품 상세','장바구니']`. 쌓인 화면은 처음 `['홈']`이다. 버튼은 `tkeys(['다음 화면','뒤로'])`.
  - 다음 화면: 4장 미만이면 다음 이름을 쌓는다. 4장이면 그대로 두고 "예시는 4장까지예요".
  - 뒤로: 2장 이상이면 맨 위를 뺀다. 1장이면 그대로 두고 첫 화면에서 뒤로 갈 때의 안내(값 확인 표대로 확인한 문장).
  - 휴대폰에는 맨 위 화면, 옆에는 `<ol class="mk-mostk">`로 쌓인 화면을 아래부터 보이고 "쌓인 화면 {n}장"을 글자로 쓴다.
  - `r:['Back Button','Tab Bar','Edge Swipe']`
- **App Lifecycle 직접 조작**(`m:0`):
  - 상태는 `'fg'|'bg'|'gone'`, 처음 `'fg'`. 버튼은 `tkeys(['홈으로 내리기','다시 열기','오래 두기'])`. 상태 글자: 앞에서 실행 중·뒤로 내려감·종료됨.
  - 메모 화면에 입력 중인 글 `장보기: 우유, 달걀`이 있다.
  - 홈으로 내리기: `fg` → `bg`(휴대폰은 홈 화면 아이콘). `bg`·`gone`에서는 그대로 두고 안내.
  - 오래 두기: `bg` → `gone`. `fg`면 "먼저 홈으로 내려 보세요", `gone`이면 그대로.
  - 다시 열기: `bg` → `fg`(글 그대로), `gone` → `fg`(빈 메모 + "처음 화면부터 다시 열렸어요"), `fg`면 그대로.
  - `r:['Cold Start','Background Process']`
- **Offline Support 직접 조작**(`m:0`):
  - 켜고 끄는 버튼 `tkeys(['인터넷','미리 저장'])`, 처음 둘 다 켜짐(`aria-pressed="true"`).
  - 인터넷 켜짐 → 목록 + "방금 불러옴" / 꺼짐·미리 저장 켜짐 → 저장된 목록 + "오프라인 · 저장된 내용" 띠 / 둘 다 꺼짐 → 빈 화면 "연결할 수 없어요".
  - `r:['Cache','Local Storage','Sync']`
- **Deep Link**: `app()` 2장면(링크 누름 → 앱의 해당 상품 화면). `r:['URL']`이 있으면 달고, 없으면 `'Anchor Link'`.
- **iOS vs Android Differences**: `.mk-two` 두 칸(뒤로 가기 방식, 스토어, 개발 도구). `r:['Haptic Feedback','Human Interface Guidelines','Material Design']`
- **Expo·React Native·Flutter**: `term()` 실행 명령 아래 `app()` 1장면.

**Task 4 추가:**
- **Screen Transition·Modal Presentation**: 각각 `app()`의 `push`·`modal` 전환. `r:['Page Transition','Shared Element Transition']` / `r:['Modal','Bottom Sheet']`
- **Keyboard Avoiding**: `cmp`. 나쁜 예는 키보드가 입력칸을 가린 장면, 좋은 예는 입력칸이 키보드 위로 올라온 장면(`app()` 2장면, `fade`). `r:['Virtual Keyboard','Safe Area']`
- **Fast Refresh**: `term()` 저장 줄 + `app()` 글자가 바뀐 장면. `r:['Hot Reload']`
- **App Launch**: `track()` 대신 `app()` 장면(아이콘 누름 → 시작 화면 → 홈). cold·warm 정의는 값 확인 표대로. `r:['Splash Screen','Cold Start']`
- **App Icon Badge**: 홈 화면 아이콘에 숫자가 1 → 3으로 바뀌는 장면. `r:['Badge','Notification Dot']`
- **Notification Tap**: 알림을 누르면 그 대화 화면이 열린다(`tap` 사용). `r:['Push Notification','Deep Link']`
- **Force Update**: "새 버전으로 업데이트해야 써요" 장면. `r:['Semantic Versioning']`(`Version / Build Number`는 Task 6 카드라 지금 달면 `ref` 점검이 실패한다)

**Task 5 추가:**
- **App Sandbox**: 상수 `MSAND`(앱마다 칸막이 모래 상자 SVG, `aria-hidden`)를 D 묶음 앞에 둔다. `pair(MSAND, app(...))`로 "다른 앱 사진첩은 권한을 받아야 봐요" 장면. `r:['Permission','Principle of Least Privilege']`
- **APNs / FCM·Push Token**: `net([{k:'server', t:'내 서버'}, {k:'cloud', t:'APNs·FCM'}, {k:'phone'}], [{m:[{t:'알림 + 토큰'}]}, {m:[{t:'알림'}]}])`. Push Token의 실패 장면은 토큰이 바뀐 기기에 보낸 알림이 사라지는 `x:1` 메시지.
- **Universal Link / App Link**: `cmp`. 나쁜 예는 설정이 없어 웹이 열림, 좋은 예는 앱이 열림.
- **Secure Storage**: `cmp`. 나쁜 예는 토큰을 일반 저장소에, 좋은 예는 Keychain·Keystore. `r:['Refresh Token','Local Storage']`
- **Native Module**: `r:['SDK']`. **In-app Purchase**: 수수료 숫자는 확인했을 때만 쓴다.

**Task 6 추가:**
- **Code Signing**: 상수 `MSEAL`(봉인 도장 SVG)과 `pair(MSEAL, track([{t:'빌드', s:'done'}, {t:'서명', s:'done'}, {t:'업로드', s:'done'}]))`. `r:['SSL Certificate']`
- **App Review·App Rejection·TestFlight·Internal Testing Track·Staged Rollout**: `track()`. App Rejection은 `{t:'심사', s:'fail', w:'거절', n:'거절 이유 예시'}`. Staged Rollout은 비율 단계를 `n`에 쓰되 Apple 일정은 확인한 값만. `r`: App Review → `'Code Review'`, Staged Rollout → `'Canary Release','Feature Flag','Rollback Deploy'`
- **Version / Build Number**: 이름표 두 개(`1.2.0` / `42`) 부품 `mk-mover`. `r:['Semantic Versioning']`
- **IPA / AAB**: 파일 아이콘 두 개 부품 `mk-mofile`. `r:['Build','Artifact']`
- **OTA Update**: `track()`(코드 바꿈 → `eas update` → 앱이 다음 실행 때 받음) 위에 `term()` 한 줄. `r:['Release','Hotfix']`
- **App Store vs Google Play·App Store Connect·Google Play Console·Store Listing·Privacy Label / Data Safety·Developer Account·Bundle ID / Package Name**: `browser()` 관리 화면 모형이나 `.mk-two` 비교. 비용·규칙은 값 확인 표대로.
- 부품 루트 클래스(`mk-mover`·`mk-mofile` 등)는 `.fig:has(…)` 두 목록에 더한다.

**Task 7 추가:**
- **App vs Web**: `pair` 대신 `.mk-two`로 `browser()`와 `app()`를 나란히. `r:['PWA','Responsive Web Design','Mobile First']`
- **Ask Permission in Context**: `cmp`. 나쁜 예는 앱 켜자마자 권한 3개, 좋은 예는 사진 버튼을 누를 때 카메라 권한. `o:0`. `r:['Permission Request']`
- **Test on Real Device**: `r:['Check on mobile','E2E Test','Manual Testing']`. `p` 예: "시뮬레이터 말고 실제 휴대폰에서도 확인해줘"
- **Crash Reporting**: `r:['Crash','Jank']`. **App Size**: `r:['Bundle Size']`. **Tablet Support**: `r:['Touch Target','Orientation','Foldable','Viewport']`
- **Ratings & Reviews·Expo Go**: `o:0`·공식 문서 확인 여부에 따라.

### Task 8: 증상 색인 12개

**쓸 스킬:** interfaces:better-writing

**Files:** Modify `index.html`(`SYM()` 묶음, 3108~3154줄), `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**
  - `SYM_MOBILE = [스펙 6장 표의 증상 문장 12개 그대로]`
  - `symcount` 기대값을 `123` → `135`로 바꾼다.
  - SYM_NEW·SYM_TERM·SYM_NET·SYM_TEST·SYM_MOBILE이 모두 `SYMPTOMS[].q`에 있어야 한다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL symcount: length 123`
- [ ] **Step 3: 구현**: 스펙 6장 표의 묶음별로 `SYM('크기·화면',[…])`·`SYM('느림',[…])`·`SYM('반응·클릭',[…])`·`SYM('오류·안 됨',[…])` 배열 끝에 `['증상', ['En']]`을 넣는다(크기·화면 1, 느림 1, 반응·클릭 1, 오류·안 됨 9).
- [ ] **Step 4: 점검 통과**: `OK <수>`
- [ ] **Step 5: 브라우저 확인**: 증상 화면에서 "오류·안 됨" → "푸시 알림이 안 와요"를 누르면 Push Token 카드로 간다. 묶음 칩은 8개 그대로다.
- [ ] **Step 6: 커밋**: `feat: 모바일 증상 색인 12개 추가`

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
  - PRODUCT.md 31줄: 카테고리 17개, 용어 1257개, `모바일 앱 6개·71개`, 증상 색인 135개
  - docs/PLAN.md 17줄: ② 모바일 앱 완료 표시(남은 것: 기획·문서). 57줄 남은 일: "오류·안 됨" 칩 37개 → 46개
  - DESIGN.md 250줄(`runner()`·`rbar()` 규칙) 뒤, `### 검색표` 앞: `app()` 규칙(장면 4개 제한, 전환 3가지, `tap` 뜻, 멈춘 장면, `still`·`label`, 지나간 장면 `aria-hidden`)과 `track()` 규칙(단계 5개 제한, 기호+글자, `w`, `mk-rux` 재사용)
- [ ] **Step 6: 전체 브라우저 확인**
  - 모바일 6개 하위항목 전체에 공통 절차를 적용한다. 320px도 본다.
  - reduced-motion에서 자동 재생이 없고, 재생 버튼과 직접 조작 4장이 동작해야 한다.
  - 프론트엔드·백엔드 카테고리 화면과 기존 카드 주소가 그대로다.
  - 홈·검색·증상 화면의 콘솔 오류도 0이어야 한다.
- [ ] **Step 7: 품질**
  - impeccable audit와 break-ui를 돌린다.
  - break-ui 입력: 공백 없는 긴 화면 제목(40자)·본문(80자), 장면 4개 모두 `modal`, 단계 5개 모두 긴 이름(20자)과 긴 설명(60자), 상태 4가지 섞기
  - 이번 범위의 문제만 고치고, 직접 조작 카드의 키보드·포커스 문제는 반드시 고친다.
- [ ] **Step 8: 커밋**: `feat: 모바일 글꼴 서브셋과 문서 개수 반영`
