# 터미널·명령줄 카테고리 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `개발 기본` 다음에 `터미널 · 명령줄` 카테고리를 만든다. 하위항목 6개에 카드 81개(새 77 + 옮김 4)를 넣고, 증상 15개를 추가한다. 명령이 나오는 카드는 공용 터미널 모형 `term()`으로 그린다.

**Architecture:** `index.html` 하나에서 작업한다.
- 데이터: DATA 구간에 `CAT`/`T`/`SYM`을 호출한다.
- 그림: `D`에 `Object.assign`으로 더한다.
- 터미널 모형: `term()` 문자열 함수 하나로 만든다. 자동 재생은 CSS 칸(slot) 키프레임을, 직접 조작은 `init(stage)`를 쓴다.
- 옮긴 카드: ①의 `MOVED`·`migrateIds`·옛 주소 이동이 그대로 처리한다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, Windows PowerShell 5.1(병기 측정), fonttools 4.66.1

**Spec:** [docs/superpowers/specs/2026-11-01-terminal-category-design.md](../specs/2026-11-01-terminal-category-design.md)

**스펙과 다른 점(3가지):**
- **PowerShell 병기 위치**: `ps`는 `term()`의 옵션이 아니라 카드 필드 `t.ps` 하나에만 둔다. 화면에는 그림 밑이 아니라 설명 칸의 행 `Windows PowerShell`로 보인다. 그림 높이와 figcap 위치를 건드리지 않고, 다른 행과 같이 `` ` `` 코드 표시가 되기 때문이다.
- **영문명 확정**: 스펙 5장 괄호 안의 풀이는 영문명에서 뺀다. 예: `Option`, `Interrupt`, `Command Prompt`. 풀이는 `ko`에 넣는다. 확정한 영문명은 Task 2~7의 `EXPECT`에 있다.
- **글꼴 점검 미루기**: 원본 `Hahmlet.ttf`가 사라졌다(측정: ① 계획 21장의 경로에 파일 없음). 그래서 `font` 점검은 Task 9 전까지 `LATER`로 미룬다(Task 1).

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN을 쓰지 않는다.
- 색과 글꼴은 `:root` 변수를 먼저 쓴다. 터미널 창 색은 기존 `.codebox`의 `#1d2b4f`와 `#e6ecf7`이다.
- 그림 속 글자는 최소 11px이다.
- 도판 틀(`.fig`)에는 그림자를 넣지 않는다.
- 기본 easing은 `var(--ease)`다.
- 자동 애니메이션은 클래스 `A`와 `--ps` 구조를 쓴다. 멈춘 첫 장면도 뜻이 보이게 음수 지연을 준다(기존 `/* design: motion */` 규칙).
- 새 D 키는 `'u-' + slug(en)`이다. 새 CSS 클래스와 키프레임 이름은 `mk-`로 시작한다.
- 카드 문구 규칙:
  - `d`: 해요체 한 줄
  - `p`: "~해줘" 지시문. 정식 용어를 넣는다.
  - `r`: 기존 영문명 1개 이상
  - `l`: 1~3
  - `o:1`: 공식 문서를 직접 열어 확인했을 때만 쓰고 `u`를 단다. 공식 문서는 GNU·POSIX·Microsoft Learn·Ubuntu다.
  - 한글명 `ko`: `한글 · 풀이` 형식
- 명령은 bash 기준이다. `ps` 규칙:
  - 그림의 명령을 Windows PowerShell에 그대로 쳐서 결과가 다를 때만 단다.
  - Windows PowerShell 5.1에서 직접 쳐 본 결과(측정)와 Microsoft Learn 문서로 확인한 내용만 적는다. 둘 중 하나라도 확인하지 못하면 달지 않는다(스펙 4·11장).
  - `curl`은 "Windows에서는 `curl.exe`로 치면 확실해요"까지만 적는다.
- 버전마다 다른 동작은 단정하지 않는다. Hidden Input은 "안 보이는 경우가 많아요"로 쓴다(스펙 5.8).
- 사이트 이름 같은 재사용 값은 `SITE`를 쓴다.
- 브라우저 확인은 Playwright MCP로 한다. 평소 Chrome 프로필·저장된 로그인을 쓰지 않고, `state save` 파일을 만들지 않는다.
- 작업 단위마다 커밋한다. 메시지는 한국어 `feat:`/`docs:`이고 attribution 줄을 넣지 않는다.
- 작업마다 "쓸 스킬"을 쓴다. 설치되지 않은 스킬은 건너뛴다.

## Review Focus

1. **명령 속 특수문자**: `echo "<b>" > a.txt && cat a.txt`의 `<`·`>`·`&`·`"`·`|`가 HTML로 해석되면 안 되고, 글자 그대로 보여야 한다. 강조(`h`)도 escape된 글자에 맞아야 한다. → Task 1 `base` 점검
2. **Tab 키 갇힘**: Tab Completion 그림에 포커스가 있을 때 Tab을 가로채는 것은 완성할 수 있는 동안뿐이다. 완성한 뒤에는 Tab으로 그림을 빠져나갈 수 있어야 한다. → Task 3 브라우저 확인
3. **휴대폰에서 긴 줄**: 긴 명령이나 한글 경로가 375px에서 페이지 가로 넘침을 만들면 안 된다. 넘치는 줄은 창 안에서만 가로 스크롤된다. → Task 2(Path 카드에 긴 한글 경로)와 Task 9 break-ui
4. **옛 id**: 즐겨찾기에 `basics-terminal`만 있거나, 옛 id와 새 id가 함께 있어도 결과는 `terminal-terminal` 하나다. `#/t/basics-terminal`은 새 카드로 간다. → Task 2 브라우저 확인
5. **멈춘 첫 장면이 비어 보임**: 동작 줄이기 설정이거나 화면 밖에서 멈춘 터미널 그림은 모든 줄이 보이는 완성 장면이어야 한다. 빈 창이면 안 된다. → Task 2 브라우저 확인(reduced-motion)

---

## 공통 절차 (Task 2~7에 적용)

1. **실패하는 점검 추가**: `tests/check.mjs`에 아래를 넣는다.
   - `EXPECT['terminal/<sec>']`: 그 Task 표의 영문명
   - `COUNT['terminal/<sec>']`
   - `total` 기대값: 표의 누계
2. **실패 확인**: `node tests/check.mjs` → `FAIL expect:terminal/<sec>`
3. **데이터**:
   - `/* ===== 02 터미널 · 명령줄 ===== */` 스크립트 블록의 `T('terminal','<sec>',[...])`에 스펙 순서대로 넣는다.
   - 이 블록은 Task 2에서 `/* ===== 01 개발 기본 ===== */` 블록 바로 뒤에 새로 만든다.
4. **그림**:
   - `const visual` 바로 앞에 `/* terminal: <sec> — … */` 주석과 `Object.assign(D, {...})`를 둔다.
   - 명령 카드는 `term()`, 비유는 `pair(art, term(...))`, 명령 없는 카드는 `cmp`나 `phone()`·`browser()`로 그린다.
   - 저절로 움직이는 그림은 `m:1`이다.
5. **직접 조작**(표에 있는 카드만): Task 1의 `term(…, {still: true, label})`과 `tkeys()`로 만든다.
   - 리스너는 stage 안 요소에만 단다.
   - 키보드와 화면 버튼이 같은 함수를 부른다.
   - `.mk-hint` 안내 한 줄을 넣는다.
6. **점검 통과**: `node tests/check.mjs` → `OK <수>`. `LATER font` 줄은 Task 9 전까지 정상이다.
7. **브라우저 확인**(아래 절차): 1280px·375px 스크린샷, 넘침 없음, 11px 미만 0, 콘솔 오류 0. 직접 조작 카드는 마우스 클릭, 375px에서 화면 버튼 클릭, 키보드로 조작해 본다.
8. **커밋**: `git add index.html tests/check.mjs && git commit -m "feat: 터미널 <하위항목 이름> 하위항목 추가"`

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/terminal/<sec>`. 캐시 때문에 `?r=`가 필요하다.
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**: `document.documentElement.scrollWidth <= innerWidth` → `true`
- **작은 글자**: ① 계획과 같은 식(`#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11) → `[]`
- **화면**: 1280×900과 375×812에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)

---

### Task 1: 기반 (카테고리, 터미널 모형, 병기 행, 점검 확장)

**쓸 스킬:** frontend-design, impeccable(shape), interfaces:better-colors(대비 측정), interfaces:better-accessibility

**Files:**
- Modify `index.html`:
  - 카테고리 목록(1465줄 뒤)
  - T 필드 주석(1456줄)
  - `.fig:has(…)` 목록(313줄)
  - CSS 그림판 구간
  - 모형 도우미(2840~2854줄 근처)
  - `plate()`의 rows(4373줄)
- Modify `tests/check.mjs`

**Interfaces:**
- Produces:
  - **카테고리**: `CAT('terminal','터미널 · 명령줄','글자로 명령을 입력해 컴퓨터를 다루는 창과 그 말', [['cmd','자주 쓰는 명령어','매일 치는 기본 명령']])`. `CATS[1]`이 되고, secs id는 `basic, core, motion, adv, cmd, tip` 순서다.
  - **`term(lines, opt = {}) -> string`**: 루트 클래스는 `mk-term`이다.
    - 창 구성: 위 막대(점 3개 + 제목 `opt.title`, 기본 `'터미널'`)와 본문 `.mk-tbody`. 본문은 `white-space:pre; overflow-x:auto`이고 글자는 12px `var(--mono)`이다.
    - 줄 종류: `{c}`(프롬프트 + 친 명령), `{o}`(출력), `{e}`(오류, 빨강 계열)
    - 강조: 줄에 `h:'부분'`이 있으면 escape된 본문에서 첫 번째로 맞는 곳을 `<span class="mk-hl">…</span>`으로 감싼다.
    - 모든 글자는 `esc()`로 처리한다.
    - `opt.prompt`: 기본 `'~/project $'`. cmd.exe·PowerShell 카드는 `'C:\\Users\\me>'`, `'PS C:\\Users\\me>'`를 쓴다.
    - `opt.end`: 기본 true. 마지막에 빈 프롬프트 줄과 깜빡이는 커서 `.mk-tcur`를 더한다.
    - `opt.still`: true면 애니메이션 클래스를 붙이지 않는다(직접 조작용).
    - `opt.label`: 있으면 `.mk-term`에 `tabindex="0"`·`aria-label`을 달고, `.mk-tbody`에 `aria-live="polite"`를 단다.
    - 줄은 끝 프롬프트까지 최대 8칸이다(내용 줄 최대 7개).
  - **자동 재생(칸 키프레임)**: 한 주기는 10s다.
    - k번째 칸(1~8)은 `k×10%`에 나타나 92%까지 남고, 96~100%에 모두 사라진다.
    - `{c}` 줄의 명령 글자는 같은 칸 안에서 6%에 걸쳐 `clip-path` 와이프로 쳐진다(`steps(12)`).
    - 키프레임 이름은 `mk-tl1`~`mk-tl8`(줄)과 `mk-tt1`~`mk-tt8`(명령 글자)이다. 줄에는 클래스 `A`를 단다.
    - 모든 칸의 `animation-delay`는 `-8.8s`다. 그래서 멈춘 장면은 전부 보이는 88% 지점이다(Review Focus 5).
  - **`tkeys(names: string[]) -> string`**: `<div class="mk-tkeys">` 안에 이름마다 `<button type="button" class="mk-tkey" data-k="이름">이름</button>`을 만든다. 쓰는 이름은 `Tab`, `↑`, `↓`, `Ctrl+C`, `y`, `n`, `다시`다. 버튼 높이는 최소 32px이다.
  - **카드 필드 `ps`**(문자열): `plate()` rows 끝에 `t.ps && ['Windows PowerShell', t.ps]`로 보인다. 필드 주석에 `ps PowerShell 병기`를 더한다.
  - **점검 키 형식**: `EXPECT`·`COUNT`·`REDRAWN`의 키가 `'카테고리/하위항목'`이면 그 카테고리를, `/` 없는 기존 키는 `design`을 뜻한다.
  - **`LATER`**: 이름 배열이다. 여기 든 점검은 실패해도 `LATER <이름>: …`만 출력하고 exit에 영향이 없다. 처음 값은 `['font']`다.

- [ ] **Step 1: 실패하는 점검 추가**(check.mjs)
  - `cat`: `CATS[1].id === 'terminal'`이고, secs id가 `['basic','core','motion','adv','cmd','tip']`이다.
  - `ps`: `ps`를 가진 TERMS는 모두 비어 있지 않은 문자열이다.
  - `base`에 다음을 더한다.
    - `term([{c:'ls'},{o:'a'},{e:'b'}]).includes('mk-term')`
    - `term([{c:'echo "<b>" > a && b | c'}])`에 `<b>`가 없고 `&quot;&lt;b&gt;&quot; &gt; a &amp;&amp; b | c`가 있다(Review Focus 1, 측정: `esc()`는 `& < > "`를 바꾼다).
    - `term([{o:'a > b', h:'>'}]).includes('<span class="mk-hl">&gt;</span>')`
    - `term([{c:'x'}], {still:true})`에 ` A`·`mk-tl`이 없다.
    - `tkeys(['Tab','다시'])`에 `data-k="Tab"`과 `type="button"`이 있다.
  - 키 해석을 바꾼다. `expect:`·`count:`·`redrawn:`은 위 키 형식으로 카테고리와 sec를 찾고, 이름은 키 그대로 쓴다(예: `count:terminal/basic`).
  - `LATER` 처리를 넣는다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL cat`, `FAIL base: … term is not defined`. 기존 design 키 점검은 모두 그대로 통과해야 한다.
- [ ] **Step 3: 구현**
  - Interfaces대로 `CAT`, `term`, `tkeys`, CSS, `ps` 행을 만든다.
  - `.fig:has(…)` 목록 두 곳에 `.mk-term`을 더한다.
  - 색은 `#1d2b4f` 배경에서 대비 4.5:1 이상이어야 한다. 대상은 출력·오류·프롬프트 글자색이고, better-colors로 잰 값을 커밋 메시지 본문에 적는다.
- [ ] **Step 4: 점검 통과**: `node tests/check.mjs` → `OK <수>`와 `LATER font` 없음(아직 새 한글이 없음)
- [ ] **Step 5: 브라우저 확인**
  - `#/c/terminal/basic`이 "아직 용어가 없어요"로 뜬다.
  - 홈·사이드 목록의 카테고리 번호가 하나씩 밀려 보인다.
  - 콘솔 오류 0
- [ ] **Step 6: 커밋**: `feat: 터미널 카테고리와 터미널 모형 기반`

### Task 2~7: 하위항목 6개

| Task | sec | EXPECT (스펙 순서) | 직접 조작 | 비유 | COUNT | total | 쓸 스킬 |
|---|---|---|---|---|---|---|---|
| 2 | basic | Terminal, CLI, Path, Directory, Shell, Shell Prompt, Command, Working Directory, Home Directory, Absolute vs Relative Path, Argument, Option, GUI | — | Shell | 13 | 987 | better-writing, frontend-design |
| 3 | core | Bash, PowerShell, Command Prompt, Tab Completion, Command History, Interrupt, PATH Variable, Exit Code, Standard Output, Standard Error, Pipe, Redirection, Wildcard, sudo, Run as Administrator | Tab Completion, Command History, Interrupt | Pipe, Wildcard | 15 | 1002 | interaction-design, better-accessibility |
| 4 | motion | Cursor Blink, Progress Output, Streaming Output, Scrollback, Watch Mode, Confirmation Prompt, Hidden Input, Pager, TUI | Confirmation Prompt | — | 9 | 1011 | animate, animation-vocabulary |
| 5 | adv | Process, PID, Signal, Background Process, Standard Input, Shebang, chmod, Alias, Shell Profile, Dotfile, Quoting, Escape Character, Command Chaining, Execution Policy, WSL | — | — | 15 | 1026 | ux-writing |
| 6 | cmd | cd, ls, pwd, mkdir, touch, cp, mv, rm, cat, echo, grep, find, which, clear, history, curl, tail, ps, kill, --help | — | — | 20 | 1046 | source-driven-development |
| 7 | tip | Terminal vs Shell, Integrated Terminal, Copy-Paste Caution, Dry Run, Verbose Mode, rm -rf, Character Encoding, Line Ending, Sharing Terminal Output | — | — | 9 | 1055 | ux-writing, better-writing |

측정: 새 영문명 77개는 기존 카드와 겹치지 않고 slug도 서로 겹치지 않는다. `--help`의 id는 `terminal-help`다.

**Task 2 추가:**
- **옮기기**:
  - `T('basics','core')`의 Terminal·CLI·Path·Directory 객체(1875~1878줄)를 잘라 `terminal/basic` 맨 앞에 둔다.
  - `MOVED`에 `'basics-terminal':'terminal-terminal'`, `'basics-cli':'terminal-cli'`, `'basics-path':'terminal-path'`, `'basics-directory':'terminal-directory'`를 넣는다.
  - `d`·`p`·`r`은 그대로 두고 `v`만 새 `u-` 프리셋으로 바꾼다.
  - check.mjs에 `COUNT['basics/core'] = 8`(12 − 4)을 더한다.
- **그림**:
  - Path는 `pwd` 출력에 긴 한글 경로를 넣는다. 예: `/Users/me/문서/2026 프로젝트/디자인 시안/최종`. 375px에서 페이지가 넘치지 않는지 본다(Review Focus 3).
  - GUI는 `cmp`(마우스 화면 ↔ 명령 한 줄)로 그린다.
- **브라우저 추가 확인**:
  - localStorage `devdict.pins`를 `["basics-terminal"]`로 두고 새로고침하면 `["terminal-terminal"]`이 된다. `["basics-terminal","terminal-terminal"]`도 하나로 줄어든다.
  - `#/t/basics-terminal` → `#/t/terminal-terminal`
  - 검색에 `Terminal`을 넣으면 새 카드로 이어진다(Review Focus 4).
  - `browser_emulate_media` reduced-motion에서 터미널 그림의 `.mk-tbody` 자식이 모두 `opacity` 1이다. 재생 버튼을 누르면 움직인다(Review Focus 5).

**Task 3 추가(직접 조작 3장, `m`은 Interrupt만 1):**
- **Tab Completion**:
  - 입력 줄은 `cd Doc`이다. Tab 키나 `Tab` 버튼을 누르면 `cd Documents/`가 된다.
  - Tab 키는 완성 전에만 `preventDefault`한다. 완성 뒤의 Tab은 막지 않아 포커스가 다음 요소로 간다(Review Focus 2).
  - `다시` 버튼은 `cd Doc`으로 되돌린다.
- **Command History**:
  - 이전 명령은 `['ls', 'cd src', 'npm run dev']`이다. ↑를 누를 때마다 최근 것부터 하나씩 올라가고, 가장 오래된 것에서는 더 올라가지 않는다.
  - ↓는 반대로 내려가고, 끝에서는 빈 입력 줄로 돌아간다.
  - 키보드 ↑↓와 버튼 `↑`·`↓`가 같은 동작을 한다.
- **Interrupt**:
  - `npm run dev`가 도는 중이라는 줄이 움직인다(`A`).
  - `Ctrl+C` 버튼이나 Ctrl+C 키(`e.ctrlKey && e.key.toLowerCase() === 'c'`, `metaKey`는 무시)를 누르면 `^C`와 새 프롬프트가 나오고 움직임이 멈춘다.
  - `다시`를 누르면 다시 돈다.
- **연결(`r`, 스펙 5.7)**:
  - PATH Variable → `'Environment Variable'`
  - sudo → `'Permission'`, `'SSH'`
- **사실 확인**: 종료 코드(0=성공)와 Ctrl+C(SIGINT)는 GNU Bash 매뉴얼을 열어 확인하고 `o:1`·`u`를 단다. sudo는 Ubuntu 또는 sudo 공식 문서를 쓴다.

**Task 4 추가:**
- **Confirmation Prompt**(m:0): `rm -i 메모.txt`에 대한 물음은 `(y/N)`이다.
  - `y` → "삭제했어요", `n`·Enter → "그대로 뒀어요"(대문자 N이 기본값임을 `mk-hl`로 강조)
  - 키 y/n/Enter와 버튼 `y`·`n`이 같은 동작을 한다. `다시`가 있다.
- **Hidden Input**: 문구는 Global Constraints대로 단정하지 않는다.
- **Progress Output**: 같은 줄 숫자가 바뀌는 모습을 그리고, `r`에 `'Loading Spinner'`, `'Progress Bar'`를 넣는다.

**Task 5 추가:**
- **Execution Policy**: 스펙 5.8의 사실을 쓰고, `about_Execution_Policies` 문서를 열어 확인한 뒤 `o:1`을 단다.
- **연결(`r`)**:
  - chmod → `'Permission'`
  - Background Process → `'Background Job'`
  - Shell Profile → `'Dotfile'`
  - Quoting → `'Escape Character'`

**Task 6 추가 (PowerShell 병기):**
- [ ] 각 카드 그림의 명령을 scratchpad 안 빈 폴더에서 PowerShell 도구(Windows PowerShell 5.1)로 쳐 보고, 성공·오류 결과를 표로 남긴다(측정).
- [ ] 결과가 bash와 다르면 Microsoft Learn cmdlet 문서를 열어 대응 명령을 확인하고 `ps`를 쓴다. 예: `ls -la`가 오류나면 `` `Get-ChildItem -Force` ``를 쓴다. 단, 이 대응도 측정과 문서로 확인한 뒤에만 쓴다.
- [ ] 스펙 4장 대응표의 cmdlet 이름은 그대로 쓸 수 있다.
- [ ] check.mjs에 점검을 더한다. `cmd`의 20장 중 `ps`가 있는 카드 목록은 측정표와 같아야 한다. 이를 위해 `PS_CMD = [...]`를 측정 후 채운다.
- [ ] `r`로 잇는다: rm → `'rm -rf'`, `'Destructive Action'` / curl → `'API'` / kill → `'Signal'`, `'PID'`

**Task 7 추가:**
- rm -rf → `r:['rm','Destructive Action']`
- Sharing Terminal Output의 예문 `p`: 오류 전체를 복사해 Claude에게 붙여 넣는 지시
- Character Encoding·Line Ending은 `cmp`로 그린다.

### Task 8: 증상 색인 15개

**Files:** Modify `index.html`(`SYM()` 묶음), `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**
  - `SYM_TERM = [스펙 7장 표의 증상 문장 15개 그대로]`
  - `symcount` 기대값을 `82` → `97`로 바꾼다.
  - SYM_NEW와 SYM_TERM이 모두 `SYMPTOMS[].q`에 있어야 한다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL symcount: length 82`
- [ ] **Step 3: 구현**: 스펙 7장 표의 묶음별로 기존 `SYM('<묶음>',[…])` 배열 끝에 `['증상', ['En']]`을 넣는다.
- [ ] **Step 4: 점검 통과**: `OK <수>`
- [ ] **Step 5: 브라우저 확인**: 검색표에서 "오류·안 됨" → "명령어를 찾을 수 없다고 나와요"를 누르면 PATH Variable 카드로 간다. 칩은 8개 그대로다.
- [ ] **Step 6: 커밋**: `feat: 터미널 증상 색인 15개 추가`

### Task 9: 마무리 (글꼴, 문서, 전체 점검)

**쓸 스킬:** impeccable(audit), break-ui, design-skills:accessibility-audit, improve-animations

**Files:** Modify `index.html`(FONT 블록), `tests/check.mjs`, `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`

- [ ] **Step 1: 글꼴 원본 확인**: scratchpad에 `Hahmlet.ttf`가 없으면 사용자에게 묻고 멈춘다. 물을 내용은 "GitHub hyper-type/hahmlet(OFL)에서 받아도 되나요?"다. 받는 파일 이름·주소·크기도 함께 알린다.
- [ ] **Step 2: 실패 확인**: check.mjs에서 `LATER = []`로 바꾸고 실행 → `FAIL font: N자 없음`
- [ ] **Step 3: 서브셋**: ① 계획 21장 3~4단계와 같다. FONT 블록 밖 글자로 `chars.txt`를 만들고, `pyftsubset … --flavor=woff`로 FONT 블록 base64를 교체한다. weight 400~800은 유지한다.
- [ ] **Step 4: 점검 통과**: `OK <수>`(LATER 없음)
- [ ] **Step 5: 문서**
  - PRODUCT.md: 카테고리 14개, 용어 1055개
  - docs/PLAN.md: ② 터미널·명령줄 완료 표시
  - DESIGN.md: `term()`·`tkeys()`·칸 키프레임 규칙과 `ps` 행
- [ ] **Step 6: 전체 브라우저 확인**: 터미널 6개 하위항목 전체에 공통 절차를 적용한다. reduced-motion에서 자동 재생이 없고, 재생 버튼과 직접 조작 4장이 동작해야 한다. 홈·검색·증상 화면의 콘솔 오류도 0이어야 한다.
- [ ] **Step 7: 품질**: impeccable audit와 break-ui를 돌린다. break-ui 입력은 200자 명령, 한글·띄어쓰기 경로, 빈 출력이다. 이번 범위의 문제만 고치고, 직접 조작 카드의 키보드·포커스 문제는 반드시 고친다.
- [ ] **Step 8: 커밋**: `feat: 터미널 글꼴 서브셋과 문서 개수 반영`
