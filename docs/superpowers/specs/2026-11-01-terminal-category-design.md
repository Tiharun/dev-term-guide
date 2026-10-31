# 터미널·명령줄 카테고리 (② 새 카테고리 1/5) 설계

- 날짜: 2026-11-01
- 관련 문서: [PLAN.md](../../PLAN.md), [GLOSSARY.md](../../../GLOSSARY.md), [DESIGN.md](../../../DESIGN.md), ① 설계 [2026-10-31-design-screen-terms-design.md](2026-10-31-design-screen-terms-design.md)
- ② 새 카테고리 5개는 카테고리마다 명세 → 계획 → 구현 → main 병합을 한 바퀴씩 진행한다(2026-11-01 결정). 순서: 터미널·명령줄 → 네트워크 → 모바일 앱 → 테스트 → 기획·문서. 이 문서는 첫 번째다.

## 1. 목적과 성공 기준

초보자가 터미널에서 보는 말과 명령을 **그림으로 바로 이해**하고, 예문을 복사해 Claude에게 정확히 지시하거나 Claude가 낸 명령을 알아듣게 한다.

성공 기준:
- `개발 기본` 다음에 `터미널 · 명령줄` 카테고리가 생기고, 하위항목 6개에 카드 81개가 들어간다(옮긴 4개 포함).
- 모든 카드가 도판 형식이고, 명령이 나오는 카드는 공용 터미널 모형으로 그린다.
- 옮긴 카드 4개의 즐겨찾기·외운 체크·옛 주소가 끊기지 않는다.
- 8장 점검을 모두 통과한다.

## 2. 범위

포함: 새 카테고리와 하위항목, 카드 81개, 기존 카드 4개 이동, 공용 터미널 모형 `term()`, 직접 조작 카드 4개, 증상 색인 15개, 글꼴 서브셋 갱신, PRODUCT.md·PLAN.md 개수 표기 갱신, 점검 스크립트 확장.

제외: 나머지 새 카테고리 4개, 기존 카테고리 보강·그림 재제작(③), SSH(네트워크 단계에서 결정), git·npm 명령(각자 카테고리에 두고 관련 용어로 연결).

## 3. 배치

- `CAT('terminal','터미널 · 명령줄', …)`을 `CAT('basics', …)` 바로 다음에 넣는다. 뒤 카테고리의 번호(`c.no`)와 도판 번호는 하나씩 밀린다. 두 번호는 화면 표시에만 쓰이고 저장되지 않는다(측정: [index.html:2824](../../../index.html), 4379, 4436, 4446, 4449).
- 카테고리 설명: "글자로 명령을 입력해 컴퓨터를 다루는 창과 그 말"
- 하위항목: 공통 기본·필수·모션용어 및 연출·심화 + 추가 `cmd` 자주 쓰는 명령어("매일 치는 기본 명령") + 공통 추천 개념.

## 4. 기준 셸과 PowerShell 병기

- 카드의 명령과 터미널 모형은 **bash 기준**(macOS·Linux·Git Bash·WSL에서 같음).
- Windows PowerShell에서 다른 명령이면 그림 아래에 `PowerShell: …` 한 줄로 병기한다. 데이터 필드 `ps`(문자열)로 둔다. 같으면 적지 않는다.
- 대응표(검색 확인: Microsoft Learn [Using aliases](https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/using-aliases), [Unix support](https://learn.microsoft.com/powershell/scripting/whats-new/unix-support)):

| bash | PowerShell 명령(cmdlet) | Windows에서 되는 별칭 |
|---|---|---|
| `cd` | `Set-Location` | `cd`, `sl`, `chdir` |
| `clear` | `Clear-Host` | `cls`, `clear` |
| `cp` | `Copy-Item` | `cp`, `copy`, `cpi` |
| `rm` | `Remove-Item` | `rm`, `del`, `ri`, `rd`, `rmdir`, `erase` |
| `ls` | `Get-ChildItem` | `ls`, `dir`, `gci` |
| `echo` | `Write-Output` | `echo`, `write` |
| `mkdir` | `New-Item` | `md`(cmd 명령), `ni` |
| `mv` | `Move-Item` | `mv`, `move`, `mi` |
| `pwd` | `Get-Location` | `pwd`, `gl` |
| `cat` | `Get-Content` | `cat`, `type`, `gc` |

- 위 별칭은 Windows 전용이다. Linux·macOS의 PowerShell에서는 `ls`·`cp`·`mv`·`rm`·`cat`·`ps`·`kill`·`clear` 등이 별칭이 아니라 원래 프로그램을 실행한다(검색 확인: Unix support 문서). 카드에는 "Windows PowerShell 기준"으로 적는다.
- 표에 없는 명령(`grep`·`which`·`touch`·`history`·`curl`·`find`·`tail`·`ps`·`kill`·`man`)의 PowerShell 대응은 구현 단계에서 카드마다 Microsoft Learn cmdlet 문서로 확인한 뒤 적는다. 확인되지 않으면 병기하지 않는다.
- `curl`: Windows PowerShell 5.1에서는 `Invoke-WebRequest`의 별칭이고 이후 버전에서 빠졌다는 설명이 여러 곳에 있다. 다만 6과 7 중 어느 버전에서 빠졌는지는 출처마다 다르고 공식 문서로 확인하지 못했다. 카드에는 "Windows에서는 `curl.exe`로 치면 확실하다"까지만 적는다.

## 5. 용어 목록 (81개)

`*` = 개발 기본에서 옮겨 옴, `▶` = 직접 조작, `◎` = 비유 일러스트 곁들임. 한글명은 `한글 · 풀이` 형식으로 구현 때 정한다.

### 5.1 기본 (13)
Terminal\*, CLI\*, Path\*, Directory\*, Shell◎, Shell Prompt, Command, Working Directory, Home Directory, Absolute vs Relative Path, Argument, Option(옵션·플래그), GUI

### 5.2 필수 (15)
Bash, PowerShell, Command Prompt(cmd.exe), Tab Completion▶, Command History▶, Interrupt(Ctrl+C)▶, PATH Variable, Exit Code, Standard Output, Standard Error, Pipe◎, Redirection, Wildcard◎, sudo, Run as Administrator

### 5.3 모션용어 및 연출 (9)
터미널 화면에서 움직이거나 바뀌는 것.
Cursor Blink, Progress Output(같은 줄 덮어쓰기), Streaming Output, Scrollback, Watch Mode, Confirmation Prompt(y/N)▶, Hidden Input(비밀번호 입력), Pager, TUI

### 5.4 심화 (15)
Process, PID, Signal, Background Process, Standard Input, Shebang, chmod, Alias, Shell Profile(.bashrc·$PROFILE), Dotfile, Quoting, Escape Character, Command Chaining(&&·||·;), Execution Policy, WSL

### 5.5 자주 쓰는 명령어 (20)
cd, ls, pwd, mkdir, touch, cp, mv, rm, cat, echo, grep, find, which, clear, history, curl, tail, ps, kill, --help

### 5.6 추천 개념 (9)
Terminal vs Shell, Integrated Terminal, Copy-Paste Caution(붙여넣기 전 확인), Dry Run, Verbose Mode, rm -rf(되돌릴 수 없는 삭제), Character Encoding(한글 깨짐), Line Ending(CRLF·LF), Sharing Terminal Output(오류 전체를 복사해 전달)

### 5.7 겹치는 카드 처리 (측정: 기존 영문명과 대조)

| 이미 있는 카드 | 처리 |
|---|---|
| Prompt(AI) | 뜻이 다름 → 터미널은 Shell Prompt로 따로 |
| Background Job(백엔드, 서버 작업 대기열) | 뜻이 다름 → 터미널은 Background Process |
| Loading Spinner·Progress Bar(디자인) | 새로 만들지 않음 → Progress Output을 만들고 둘을 관련 용어로 연결 |
| Environment Variable(백엔드) | 그대로 둠 → PATH Variable에서 연결 |
| SSH(서버), Permission(보안), Destructive Action(디자인) | 그대로 둠 → sudo·chmod·rm -rf에서 연결 |

### 5.8 사실 메모 (구현 때 카드에 반영)
- Hidden Input: 전통적으로 비밀번호를 쳐도 아무것도 안 보인다. 단, Ubuntu 26.04 기본 sudo(sudo-rs)는 `*`를 보여 준다(검색 확인: [Ubuntu Discourse](https://discourse.ubuntu.com/t/sudo-rs-enables-pwfeedback-by-default-for-resolute-raccoon/77712)). 카드에는 "안 보이는 경우가 많다"로 적고 단정하지 않는다.
- Execution Policy: 아무 범위에도 정해지지 않았을 때 Windows 클라이언트는 Restricted(스크립트 실행 막힘), Windows Server는 RemoteSigned. Windows가 아닌 OS는 Unrestricted이고 바꿀 수 없다(검색 확인: [about_Execution_Policies](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)).
- 그 밖의 명령 동작(종료 코드 0=성공, Ctrl+C=SIGINT 등)은 구현 단계에서 GNU·POSIX·Microsoft Learn 문서로 확인하고 공식이면 `o:1`, `u`에 주소를 적는다.

## 6. 그림 구조

- **공용 모형 `term(lines, opt)`**: 화면 모형 부품 모음(`phone`·`browser` 옆, [index.html:2840](../../../index.html))에 추가한다.
  - 모양: 남색 잉크 창(기존 코드 상자 색), 위 막대에 창 제목, Consolas 글꼴, 그림 속 글자 11px 이상, 프롬프트 `~/project $`.
  - `lines`: `{c:'명령'}` 친 명령(한 글자씩 쳐짐), `{o:'출력'}`, `{e:'오류'}`(빨강 계열, stderr), 강조할 부분은 `mk-hl`.
  - `opt`: `{title, ps}`. `ps`가 있으면 그림 아래에 `PowerShell: …` 한 줄.
- **재생**: 기존 규칙과 같다. 보일 때만 재생, 동작 줄이기 설정이면 재생 버튼, 다시 재생 가능. 줄마다 지연을 CSS 변수로 주고 기존 `.run` 클래스로 움직인다.
- **직접 조작 4장**(`init`, 기존 `grab`·`keys` 도우미 재사용):
  - Tab Completion: 입력칸에 `cd Doc` → Tab → `cd Documents/`
  - Command History: ↑·↓로 이전 명령 오가기
  - Interrupt: 돌고 있는 명령을 Ctrl+C로 멈추고 `^C`와 새 프롬프트 표시
  - Confirmation Prompt: y·n으로 답하면 결과가 갈림
  - 휴대폰에는 Tab·Ctrl 키가 없으므로 그림 안에 `Tab`·`↑`·`↓`·`Ctrl+C`·`y`·`n` 버튼을 둔다. 버튼은 포커스 가능하고 키보드로도 누른다.
- **비유 일러스트**: 이름이 비유인 Shell(조개껍데기)·Pipe(관)·Wildcard(조커 카드)만. ①과 같이 모형 옆에 화살표로 잇는다.
- **명령이 없는 카드**(GUI, Terminal vs Shell, Line Ending 등)는 비교 그림이나 화면 모형으로 그린다.

## 7. 데이터

- 카드 id는 `카테고리-slug(영문명)`이라 옮기면 바뀐다([index.html:2818](../../../index.html)). `MOVED`([index.html:2684](../../../index.html))에 4개를 추가한다: `basics-terminal`→`terminal-terminal`, `basics-cli`→`terminal-cli`, `basics-path`→`terminal-path`, `basics-directory`→`terminal-directory`. 즐겨찾기·외움 이어주기와 옛 주소 이동은 ①에서 만든 기능이 그대로 처리한다.
- 옮기는 카드는 정의·예문을 유지하고 그림만 `term()` 기반으로 다시 그린다.
- 개발 기본에 남는 카드 중 옮긴 카드를 가리키던 관련 용어(`r`)는 영문명 연결이라 그대로 동작한다.
- 증상 색인 15개(묶음은 기존 8개 중 선택):

| 묶음 | 증상 | 용어 |
|---|---|---|
| 오류·안 됨 | 명령어를 찾을 수 없다고 나와요 | PATH Variable |
| 오류·안 됨 | Permission denied(권한 없음)가 떠요 | sudo |
| 오류·안 됨 | PowerShell에서 스크립트를 실행할 수 없대요 | Execution Policy |
| 오류·안 됨 | 파일이 분명히 있는데 없다고 나와요 | Working Directory |
| 오류·안 됨 | 폴더 이름에 띄어쓰기가 있으면 명령이 깨져요 | Quoting |
| 오류·안 됨 | 명령이 실패했는지 성공했는지 모르겠어요 | Exit Code |
| 반응·클릭 | 비밀번호를 쳐도 아무것도 안 보여요 | Hidden Input |
| 반응·클릭 | 터미널이 멈춰서 아무것도 안 쳐져요 | Interrupt |
| 반응·클릭 | git log 화면에서 빠져나올 수가 없어요 | Pager |
| 반응·클릭 | y/N이라고 묻는데 뭘 눌러야 할지 모르겠어요 | Confirmation Prompt |
| 반응·클릭 | 명령이 끝나지 않고 계속 켜져 있어요 | Watch Mode |
| 글자 | 터미널에서 한글이 깨져 보여요 | Character Encoding |
| 글자 | 출력이 길어서 앞부분이 안 보여요 | Scrollback |
| 움직임 | 같은 줄 숫자만 계속 바뀌어요 | Progress Output |
| 움직임 | 글자가 한 줄씩 계속 올라와요 | Streaming Output |

## 8. 점검과 완료 기준

자동 점검 `tests/check.mjs`:
- 지금은 `EXPECT`·`COUNT`·`REDRAWN`이 디자인 카테고리 전용이다([tests/check.mjs:65](../../../tests/check.mjs)). 카테고리를 함께 적는 형식(예: `'terminal/basic'`)으로 넓히고, 기존 디자인 키는 그대로 통과해야 한다.
- 터미널 하위항목별 기대 카드·개수, 옮긴 4개가 `terminal`에 있음, `MOVED`의 새 id 존재, `ps` 필드가 문자열, 모든 카드에 그림, 영문명 중복 없음, 관련 용어·증상 대상 존재.

브라우저 확인(Playwright, 로컬 서버):
- PC 1280px, 휴대폰 375px. 가로 넘침 없음, 터미널 모형의 긴 명령은 줄바꿈 또는 창 안 가로 스크롤로 처리(페이지가 넘치지 않음).
- 직접 조작 4장을 마우스·터치·키보드로 조작, 휴대폰 화면 버튼 동작.
- 동작 줄이기 설정에서 자동 재생 안 됨, 재생 버튼 동작.
- `basics-terminal`로 즐겨찾기를 저장해 둔 상태에서 열면 새 id로 바뀜, `#/t/basics-terminal` → 새 카드.
- 콘솔 오류 0(favicon 404 제외).

디자인 품질: impeccable 점검, break-ui(아주 긴 명령·경로, 한글 경로), 필요하면 interfaces·emil 계열 스킬로 다듬기.

완료 기준: 위 점검 통과, 커밋 후 main 병합.

## 9. 진행 순서

하위항목 하나 = 작업 단위 하나. 단위마다 자동 점검 + 브라우저 확인 후 커밋.

1. 기반: 카테고리 추가, `term()`, `ps` 병기, 조작 키 버튼, 점검 스크립트 확장, `MOVED` 4개
2. 기본(옮긴 4개 포함) → 필수 → 모션 → 심화 → 자주 쓰는 명령어 → 추천 개념
3. 증상 색인 15개
4. Hahmlet 서브셋 다시 만들기, PRODUCT.md·PLAN.md 개수 표기 갱신

## 10. 글꼴

① 9장과 같다. 원본 Hahmlet.ttf 사본이 없으면 GitHub(hyper-type/hahmlet, OFL)에서 받아도 되는지 사용자에게 묻는다.

## 11. 위험

- PowerShell 대응을 잘못 적으면 사용자가 그대로 따라 한다 → 대응표 밖 명령은 공식 문서로 확인된 것만 병기.
- 버전마다 다른 동작(sudo 비밀번호 표시, curl 별칭)은 단정하지 않는다.
- 터미널 모형의 긴 줄이 휴대폰에서 페이지를 넘칠 수 있다 → 창 안에서만 스크롤.
- `index.html`이 계속 커진다(현재 약 1.1MB). 파일 나누기는 범위 밖이며 PLAN의 "품질 우선" 결정을 따른다.
