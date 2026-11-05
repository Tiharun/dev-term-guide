---
name: 개발 용어 설정집
description: 개발 용어를 도감의 도판처럼 보여 주는 오프라인 단일 파일 사전
colors:
  ink-navy: "#1d2b4f"
  ink-navy-2: "#2c3d68"
  ink-navy-3: "#3b4f82"
  cool-ground: "#f6f8f7"
  plate-white: "#ffffff"
  fig-mist: "#edf1f5"
  rule: "#d3dbe4"
  rule-faint: "#e6ebf0"
  muted-text: "#4a587a"
  soft-text: "#6a7690"
  moss: "#4d6d40"
  moss-bg: "#e8efe3"
  mark-orange: "#e0662b"
  mark-text: "#a8410f"
  mark-bg: "#fdf0e8"
  sky: "#b9c7d8"
  steel: "#8fa3bd"
typography:
  display:
    fontFamily: "Hahmlet, HANBatang, Batang, serif"
    fontSize: "clamp(30px, 3.4vw, 42px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Hahmlet, HANBatang, Batang, serif"
    fontSize: "27px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Hahmlet, HANBatang, Batang, serif"
    fontSize: "24px"
    fontWeight: 700
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Malgun Gothic, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Malgun Gothic, Apple SD Gothic Neo, Noto Sans KR, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 700
  mono:
    fontFamily: "Consolas, D2Coding, Courier New, monospace"
    fontSize: "13.5px"
    lineHeight: 1.6
rounded:
  xs: "4px"
  sm: "8px"
  md: "10px"
  lg: "14px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "22px"
  xl: "28px"
components:
  plate:
    backgroundColor: "{colors.plate-white}"
    rounded: "{rounded.lg}"
    padding: "24px"
  key-band:
    backgroundColor: "{colors.ink-navy}"
    textColor: "{colors.cool-ground}"
    rounded: "{rounded.lg}"
    padding: "20px 22px 18px"
  chip:
    backgroundColor: "{colors.ink-navy-2}"
    textColor: "#eef2f9"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
  chip-pressed:
    backgroundColor: "{colors.cool-ground}"
    textColor: "{colors.ink-navy}"
  chip-term:
    backgroundColor: "{colors.mark-orange}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
  search-field:
    backgroundColor: "{colors.cool-ground}"
    textColor: "{colors.ink-navy}"
    rounded: "9px"
    height: "46px"
  sub-tab:
    textColor: "{colors.muted-text}"
    rounded: "9px 9px 0 0"
    padding: "9px 10px 10px"
  sub-tab-current:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.ink-navy}"
  tag:
    textColor: "{colors.ink-navy}"
    rounded: "{rounded.pill}"
    padding: "2px 10px"
  leader-label:
    backgroundColor: "{colors.plate-white}"
    textColor: "{colors.ink-navy}"
    rounded: "5px"
    padding: "2px 8px"
  icon-action:
    textColor: "{colors.soft-text}"
    rounded: "{rounded.sm}"
    size: "36px"
---

# Design System: 개발 용어 설정집

## Overview

**Creative North Star: "용어 도감 (The Field Guide)"**

용어 하나를 박물 도감의 도판 한 장으로 다룬다. 도판 왼쪽 그림판(fig)에 움직이는 데모를 놓고, 지시선(leader)과 이름표로 부분을 가리킨 뒤, 오른쪽에 정의·예문·관련 용어를 적는다. 상단 남색 검색표(key band)는 도감의 검색표처럼 "무엇이 이상한가요? → 어떤 모습인가요? → 이 용어를 보세요" 세 갈래 질문으로 좁혀 간다.

밀도는 중간. 시원한 흰 바탕 위에 흰 도판, 남색 잉크 테두리와 선, 이끼색 번호·라벨, 주황은 표시(mark) 역할만 한다. 상태는 색보다 표시(도장, 핀, 채운 칸)로 드러낸다.

**Key Characteristics:**
- 남색 잉크 프레임 + 시원한 흰 바탕, 장식 없는 평면 도판
- 함렛(Hahmlet) 명조 제목 + 고딕 본문, 번호는 tabular-nums
- 도판 번호("도판 03-12")와 이끼색 캡션, 지시선 이름표
- 외움 = 기울어진 도장, 즐겨찾기 = 표본 핀, 난이도 = 채운 칸 + 단어

## Colors

남색 잉크 한 계열이 구조를 맡고, 이끼색은 분류 정보, 주황은 "지금 여기"와 강조 표시만 맡는다.

### Primary
- **남색 잉크 (Ink Navy)**: 검색표 배경, 도판 지시선, 태그·난이도 칸 테두리, 그림판 노드, 코드 상자, 토스트. 짙은 단계(ink-navy-2/3)는 검색표 안의 칩 바탕과 hover.

### Secondary
- **이끼 (Moss)**: 도판 번호, 카테고리 번호, 정의 행 라벨, 빵부스러기, "실무" 태그, 좋은 예 라벨. moss-bg는 연한 보조 면.

### Tertiary
- **표시 주황 (Mark Orange)**: 현재 위치(하위 탭 위 3px 띠, 단계 번호 원), 지시선 끝 점, 외움 도장, 용어 칩, 포커스 링. 글자에는 더 짙은 mark-text를 쓴다(대비 확보). mark-bg는 말하기 예문 상자와 강조 행 바탕.

### Neutral
- **시원한 흰 바탕 (Cool Ground)**: 페이지 바탕, 검색창 바탕.
- **도판 흰색 (Plate White)**: 도판, 사이드 내비, 이름표 바탕.
- **그림판 안개 (Fig Mist)**: 데모 그림판, 인라인 코드, hover 면.
- **괘선 (Rule / Rule Faint)**: 1px 테두리와 정의 행 구분선.
- **보조 글자 (Muted / Soft)**: 설명문, 개수, 캡션.
- **하늘·강철 (Sky / Steel)**: 데모 안의 보조 블록, 막대, 점선, 스크롤바.

### Named Rules
**The Mark Means Here Rule.** 주황은 위치·지시·상태 표시에만 쓴다. 넓은 면 장식이나 제목 색으로 쓰지 않는다.
**The Ink Text Rule.** 주황 글자는 항상 mark-text(#a8410f)로, 순수 mark-orange는 면·선·점에만 쓴다.

## Typography

**Display Font:** Hahmlet (파일 안에 쓰인 글자만 담은 서브셋 woff 내장, 대체 HANBatang/Batang/serif)
**Body Font:** Malgun Gothic (대체 Apple SD Gothic Neo, Noto Sans KR, system-ui)
**Label/Mono Font:** Consolas (대체 D2Coding, Courier New)

**Character:** 도감 표제처럼 단정한 명조 제목과, 읽기 편한 고딕 본문의 짝. 한글은 `word-break: keep-all`.

### Hierarchy
- **Display** (700, clamp 30–42px, 1.2, -0.025em): 카테고리 페이지 제목, text-wrap balance.
- **Headline** (600, 27px, 1.2): 도판의 영문 용어명. 모바일 23px.
- **Title** (700, 24px): 홈 섹션 제목. 같은 계열로 브랜드 23px/800, 검색표 제목 21px/700, 권 이름 19px/600.
- **Body** (400, 16px, 1.65): 기본 본문. 정의 행 15px/1.7, 설명문은 최대 68ch.
- **Label** (700, 12.5px): 도판 번호, 캡션, 이름표, 권 정보. 대문자 변환이나 자간 확장 없음.
- **Mono** (13.5px, 1.6): 코드 상자, 폴더 트리, 인라인 코드(0.92em).

### Named Rules
**The Numbered Specimen Rule.** 번호(도판·권·개수·HTTP 코드)는 항상 `tabular-nums`로 자리 맞춤한다.
**The Subset Rule.** Hahmlet은 서브셋이다. 새 문구를 명조로 쓰면 FONT:START~END 블록의 서브셋을 다시 만들어야 하며, 그렇지 않으면 그 글자만 바탕체로 떨어진다.

## Layout

2열 셸: 268px 고정 사이드 내비(sticky, 자체 스크롤) + `minmax(0,1fr)` 본문. 본문 내부 최대 1120px, 좌우 여백 clamp(18px, 3.4vw, 52px).

도판은 `minmax(0,1.12fr) minmax(0,1fr)` 2열(그림판 / 설명), 간격 28px, 도판끼리 22px. 그림판 무대(stage)는 `minmax(0,1fr)` 한 칸 그리드이고 자식은 `max-width:100%`라 데모가 칸을 넘지 않는다. 지시선 SVG는 그림판 전체(100%×100%)를 덮는다.

하위 탭 줄은 줄바꿈 없이 가로 스크롤(`nowrap` + `overflow-x:auto`). 검색표 단계는 완료된 열(`.col.done`)이 내용 폭으로 접히고 다음 열이 남은 폭을 채운다.

반응형: 1080px 이하에서 도판 1열, 도장은 오른쪽 아래로. 860px 이하에서 내비는 왼쪽 서랍(메뉴 버튼), 검색창 전체 폭, 화살표·보조 질문 숨김, 진행 중인 단계의 칩은 가로 스크롤 + scroll-snap, 정의 행은 라벨 위·내용 아래.

## Elevation & Depth

기본은 평면 + 1px 괘선. 그림자는 세 곳에만 쓴다. 검색표는 띄워 놓은 표처럼 약한 그림자, 그림판 안 데모 부품은 종이 조각처럼 아주 얕은 그림자, 모바일 서랍은 덮개 그림자. 도판 강조(:target)는 그림자 대신 주황 이중 링.

### Shadow Vocabulary
- **key-lift** (`0 1px 2px rgba(15,20,30,.06), 0 6px 18px rgba(15,20,30,.07)`): 검색표.
- **specimen-chip** (`0 2px 6px rgba(15,20,30,.08)`): 데모 안의 노드, 표, 미니 카드.
- **drawer** (`0 10px 40px rgba(15,20,30,.2)`): 모바일 내비 서랍.
- **target-ring** (`0 0 0 3px #fdf0e8, 0 0 0 4px #e0662b`): 링크로 찾아온 도판.

### Named Rules
**The Flat Plate Rule.** 도판 자체에는 그림자가 없다. 깊이는 괘선과 그림판 안개색으로 낸다.

## Shapes

부드럽지만 작은 모서리. 버튼·아이콘 버튼 8px, 그림판·예문 상자·코드 상자 9–10px, 도판·검색표 14px, 칩·태그·재생 버튼·토스트는 알약형. 지시선 이름표는 5px에 1px 남색 테두리. 난이도 칸은 모서리 없는 8px 정사각형. 외움 도장은 6px 모서리, 2.5px 주황 테두리, -9° 기울기.

## Components

### Buttons
- **Shape:** 8px 모서리, 1px 괘선 테두리.
- **아이콘 버튼(핀·도장):** 36px 정사각, 평소 soft 글자색, hover 시 남색 + 괘선 테두리. 눌림 상태는 mark-text 색 + 아이콘 내부를 mark-bg로 채움.
- **복사 버튼:** 예문 상자 안, 흰 바탕 + mark-text 글자, 7px 모서리.
- **재생/멈춤:** 그림판 오른쪽 아래 알약형, 흰 바탕 + 괘선.
- **Focus:** 전역 2px 주황 outline, offset 2px.

### Chips
- **Style:** 검색표 안 알약형. 기본은 ink-navy-2 면 + 밝은 글자, hover 시 ink-navy-3.
- **State:** 선택됨은 흰 바탕 + 남색 굵은 글자 + 작은 "바꾸기" 밑줄 링크. 결과 용어 칩은 주황 면 + 흰 글자.

### Cards / Containers (도판)
- **Corner Style:** 14px.
- **Background:** 도판 흰색, 그림판은 fig-mist 10px.
- **Shadow Strategy:** 없음(Flat Plate Rule).
- **Border:** 1px 괘선.
- **Internal Padding:** 24px (모바일 16px).

### Inputs / Fields
- **Style:** 검색표 위 시원한 흰 알약형 상자(9px, 높이 46px, 최대 380px), 테두리 없음, 커서는 주황.
- **Focus:** 전역 주황 focus-visible 링.

### Navigation
- **사이드 내비:** 명조 브랜드 + 이끼색 권 정보, 홈/즐겨찾기 등 분할 링크(현재는 남색 면 + 흰 글자). 카테고리 행은 이끼색 번호 + 점선 구분, 현재 카테고리는 mark-text 굵게. 하위 항목 현재는 mark-bg 면.
- **하위 탭 줄:** 아래 괘선 위의 탭, 현재 탭은 흰 면 + 괘선 테두리 + 위쪽 3px 주황 inset 띠.
- **모바일:** 860px 이하 왼쪽 서랍.

### 그림판 + 지시선 (Signature)
그림판 무대 가운데 데모, 위를 덮는 SVG 지시선(1.2px 남색)이 보이면 그려지고(stroke-dashoffset 0.9s), 끝에 주황 점, 이름표가 0.55s 뒤 떠오른다. 아래 캡션 "도판 NN-NN · 한글명"(번호는 이끼색 굵게). 데모는 화면에 보이는 것만 재생한다.

### 화면 모형 그림
- **틀:** `phone(body)`(휴대폰, 노치·홈 바), `browser(body,{url,hl})`(브라우저 창, 주소 줄. `hl`이면 주소 칸을 칠한다), `pair(art, mock)`(비유 일러스트 → 실제 화면). 용어는 실제 화면 모형으로 그리고, 이름이 비유인 용어만 `pair`를 쓴다.
- **클래스:** 그림 전용 클래스는 `mk-` 접두사(예: `.mk-tpcf`). 전역 클래스(`.bar`·`.stamp`·`.lab` 등)와 같은 이름을 그림 안에 쓰지 않는다.
- **글자:** 그림 속 글자는 11px 이상.
- **직접 조작:** 폼·제스처·상태처럼 해 봐야 아는 카드만 클릭·드래그·입력을 받는다. 마우스·터치·키보드를 모두 받고(`grab`·`keys`), 리스너는 무대(stage) 안 요소에만 단다(`window`·`document` 금지). 끌기가 취소되면(pointercancel) 원래대로 돌아가거나 끝까지 마친다.
- **터미널:** `term(lines,{title,prompt,end,still,label})`. 줄은 `{c}` 친 명령·`{o}` 출력·`{e}` 오류이고 `h`로 한 부분을 강조한다. 폭은 300px(좁으면 100%)이고, 긴 줄은 줄바꿈 없이 가로로 스크롤한다. 강조할 글자는 375px의 `vs` 칸(약 30자)에 들어오게 예시를 줄인다.
- **터미널 칸 키프레임:** 자동 재생은 10s 주기다. k번째 줄(`mk-tlk`)은 k×10%에 나타나 92%까지 남고, 명령 글자(`mk-ttk`)는 `steps(12)`로 쳐진다. 9번째 줄부터는 8번째 칸을 같이 쓴다. 멈춘 장면은 전부 보이는 88%(-8.8s)이고, 정지 그림은 `still`로 애니메이션 없이 그린다.
- **터미널 직접 조작:** `label`을 주면 그림이 `role="group"`·`tabindex="0"`이 되고 결과 줄은 `aria-live="polite"`로 알린다. 화면 키는 `tkeys(['Tab',…])` 버튼으로 같은 동작을 낸다.
- **고르기 버튼:** 하나를 고르는 버튼은 `tpick(이름들, 켠 것)`으로 만들고 `aria-pressed`를 단다. `init`에서는 `data-k`가 있는 버튼을 순서(번호)로 찾고, 한 번 누르는 버튼("실행"·"찾기"·"처음으로")은 `data-k` 없이 글자로 찾는다. 안내 문장은 `psay`로 바꿔 `aria-live`가 새 문장을 읽게 한다.
- **직접 조작 안쪽 도우미:** 그림판(`mk-mobox`) 안에 그리는 도우미(`srvmap`·`metric`·`track` 등)는 `label` 없이 `still`로 그린다. 움직임·그림 sr 대신 바뀐 결과는 `.mk-hint` 문장 하나가 알린다.
- **ps 행:** 카드 `ps`에 Windows PowerShell 5.1에서 다른 점을 적으면 정의 표 아래 "Windows PowerShell" 행으로 나온다. bash 그림과 다르게 동작하는 명령에만 쓴다.
- **네트워크:** `net(nodes, links, {still,label})`. 아이콘 키는 `pc`·`phone`·`router`·`modem`·`cloud`·`server`·`dns`·`wall`이고, `t`로 이름을 바꾸고 `s`로 아래에 작은 값(IP·포트)을 단다. 아이콘은 5개까지, 선은 이웃 아이콘끼리만 잇는다(`links[i]`는 i번과 i+1번 사이). 선은 `{m 메시지[], w 무선(점선), cut 끊긴 이유}`, 메시지는 `{t, r 반대 방향, x 가는 길에 사라짐}`이다.
- **네트워크 배치:** 그림판이 좁으면 세로로 쌓는다(아이콘 4~5개는 640px, 2~3개는 360px 이하). 아이콘 2개에 메시지 4줄 이상이면 좁아도 가로로 두고, 240px 이하에서만 세로로 쌓으며 메시지를 위아래로 늘어놓는다. 세로에서 이름표가 단어 중간에 꺾이지 않게 메시지는 짧게 쓰고 값은 아이콘의 `s`로 옮긴다.
- **네트워크 키프레임:** 자동 재생은 10s 주기다. k번째 메시지 줄(`mk-tl{k}`)은 k×10%에 나타나고 점(`mk-nwx{k}`, 세로는 `mk-nwy{k}`)은 k×10+6%에 도착한다. 9번째 줄부터는 8번째 칸을 같이 쓴다. 멈춘 장면은 점이 모두 도착한 88%(-8.8s)이고, `still`은 애니메이션 없이 그린다. `label`을 주면 `role="group"`과 `aria-label`이 붙는다.
- **네트워크 부품:** `addr(parts,{sep,y,z,sub})`는 주소를 칸으로 나눠(`y` 색칠할 칸, `z` 줄여 쓸 수 있는 칸) 좁으면 줄을 바꾼다. `NPAIRS([[번호, 설명]])`는 번호·서비스 짝 목록이다.
- **테스트 실행:** `runner(tests,{file,code,still,label})`. 결과 줄은 `{n 이름, s 'pass'|'fail'|'skip', e 기대, a 실제, ms}`이고 6줄까지다(넘으면 오류). 상태는 기호와 글자를 함께 쓴다(✓ 통과·✕ 실패·– 건너뜀). 실패 줄에 `e`·`a`가 있으면 아래에 기대·실제 값이 붙고, 맨 아래 합계 줄이 통과·실패(·건너뜀) 수를 센다. `file`을 주면 파일 이름 띠와 `code` 줄이 위에 붙는다. 코드 줄은 375px에서 단어 중간에 꺾이지 않게 한 줄 36자(한글은 약 2자로 셈) 안쪽으로 나눈다. 실패 줄의 기대·실제 값은 통째로 다음 줄로 넘어가고, 한 줄보다 길 때만 안에서 꺾인다.
- **테스트 키프레임:** 자동 재생은 10s 주기다. k번째 결과 줄(`mk-tl{k}`)은 k×10%에 "실행 중"(`mk-ruy{k}`)으로 나타나 k×10+5%에 결과(`mk-rux{k}`)로 바뀌고, 합계 줄은 그다음 칸에 나온다. 멈춘 장면은 88%(-8.8s)이고, `still`은 애니메이션과 "실행 중" 없이 그린다. `label`을 주면 `role="group"`과 `aria-label`이 붙는다.
- **테스트 부품:** `rbar(pct,{goal,label})`은 0~100으로 자른 막대이고 숫자를 글자로도 쓴다. `goal`을 주면 기준선을 긋고, 못 미치면 막대를 강조색으로 칠한다. `TCODE(file, lines)`는 실행 결과 없이 코드만 보여 주는 창이다.
- **앱 화면:** `app(scenes,{still,label,notch})`. 장면은 `{t 제목, b 본문, tap [x%,y%], go}`이고 1~4개다(넘으면 오류). 두 번째 장면부터 `go`로 전환을 고른다: `push` 옆에서 밀려 옴·`modal` 아래에서 올라옴·`fade` 겹쳐 나타남(그 밖은 오류). `tap`은 다음 장면으로 넘어가기 직전에 누르는 자리 표시이고 마지막 장면에는 줄 수 없다. 맨 위(마지막) 장면만 읽고 지나간 장면은 `aria-hidden`이다. `still`은 애니메이션과 누름 표시 없이 그리고, `label`을 주면 `role="group"`과 `aria-label`이 붙는다. 휴대폰 틀은 높이가 정해져 있어 넘친 본문은 표시 없이 아래가 잘린다. 본문은 3~4줄 안으로 쓰고, 그림마다 잘림이 0인지 브라우저에서 잰다.
- **앱 화면 키프레임:** 자동 재생은 10s 주기다. k번째 장면(`mk-mok{k}`)은 (k-1)×20+10%에 들어와 4% 동안 전환하고, k번째 장면의 누름 표시(`mk-motk{k}`)는 다음 장면이 들어오기 직전 5%에 보인다. 멈춘 장면은 88%(-8.8s)라 마지막 장면이 보인다.
- **단계 띠:** `track(steps,{still,label})`. 단계는 `{t 이름, s 상태, n 설명, w 상태 글자 바꾸기}`이고 1~5개다(넘으면 오류). 상태는 `done` ✓ 완료·`fail` ✕ 실패·`now` ● 진행 중·`wait` … 대기이고, 기호는 읽지 않고 글자만 읽는다. k번째 단계의 상태 글자는 테스트 결과 줄과 같은 `mk-rux{k}`로 k×10+5%에 나타난다. 그림판이 240px 이하이거나, 4단계 이상이고 440px 이하면 세로로 쌓고 화살표를 아래로 바꾼다.

- **문서:** `doc(blocks,{title,still,hl,label})`. 블록은 1~6개(넘으면 오류)이고 `{h 제목}`·`{h2 작은 제목}`·`{p 문단}`·`{ul [항목]}`·`{tb [[머리글], [칸]…]}`·`{ck [[글, 완료]]}` 6종이다(그 밖은 오류). `hl`은 강조할 블록 번호(0부터)다. 체크 블록의 ☑·☐는 읽지 않고 "완료:"·"안 함:" 글자로 읽는다. 블록 k는 테스트 결과 줄과 같은 `mk-rux{k}`로 차례로 나타나고, `still`은 애니메이션 없이 그린다. `label`을 주면 `role="group"`과 `aria-label`이 붙는다.
- **흐름도:** `flow(rows,{path,still,label})`. 줄은 1~5개, 한 줄에 칸 `{t 글, k box|q|end, e 들어오는 선 이름}`은 1~2개다(넘으면 오류). 2칸 줄(갈래)은 질문 칸 하나인 줄이나 2칸 줄 아래에만 두고, 갈래는 다시 합치지 않는다. `path[i]`는 줄 i에서 지나는 칸이고 갈래를 건너뛸 수 없다. 지나는 칸에는 ● 점과 "지나는 길:" 읽기 글자가 붙는다. 자동 재생은 10s 주기로, 줄 k의 점은 15k-5%에 나타나 다음 줄로 넘어가면 사라지고(`mk-fwy{k}`) 마지막 줄 점(`mk-fwz{k}`)만 끝까지 남는다.
- **코드 실행 그림:** `ide(code,steps,{title,still,label})`. 코드는 1~8줄, 한 줄은 28자까지(한글은 2자로 센다), 단계는 1~8개, 단계마다 `{l 줄 번호, out 출력 0~3줄, vars 변수 0~4개}`다(넘으면 오류). 출력 줄을 `{t, dim:true}`로 주면 흐린 기울임 글자(`.mk-cdx`)로 실제 출력이 아닌 생략 표시가 된다. 단계 i는 `mk-cdy{i}`로 10%씩 나타났다 사라지고 마지막 단계(`mk-cdz{n}`)만 남는다. 칸 폭 380px 이하에서는 코드 칸 아래로 출력·변수 칸을 쌓는다. `still`은 마지막 단계만 정지 화면으로 그리고(직접 조작 그림에 쓴다), `label`은 그림 전체의 이름이 된다. 단계 요약은 `.sr` 문장으로 읽힌다. `{t, err}` 줄은 물결 밑줄(`.mk-cdw`) + 바로 아래 오류 설명 줄(`.mk-cdem`, 23자까지)이 붙는다.
- **메모리 그림:** `mem(scenes,{still,label})`. 장면은 1~4개, 장면마다 스택 이름표 1~4개(`{n, v}` 값 또는 `{n, to}` 상자 가리킴)와 힙 상자 0~5개(`{id, v, gc}`)다. 없는 상자를 가리키면 오류다. 장면 전환은 `ide()`와 같은 `mk-cdy`/`mk-cdz` 키프레임을 쓴다. 가리킴은 선이 아니라 `→ A` 글자로, 치울 대상은 색이 아니라 "치울 대상" 글자로 보인다. `.sr` 요약은 마지막 장면만 읽는다.
- **개발자 도구 그림:** `devtools({tab,dom,css,hl,con,net,label})`. 탭은 요소·콘솔·네트워크 중 하나다. 요소 탭은 `dom` 1~6줄 `[깊이 0~3, 글]`(글 + 깊이×2 ≤ 28자), `css` 0~4줄(24자, `{t, off}`면 취소선 + 덮임), `hl` 선택 줄. `css`가 없으면 규칙 칸 없이 한 칸(`.one`)으로 그린다. 콘솔 탭은 `con` 1~4줄(28자, `{t, err}`면 오류). 네트워크 탭은 `net` 1~4개 `{name 16자, status, type}`(400 이상이면 실패). 다른 탭의 인자를 주면 오류다.
- **DOM 나무 그림:** `domtree(nodes,{hl,path,still,label})`. 노드는 2~8개 `[깊이 0~4, 태그 12자, 꼬리표 12자]`, 첫 노드는 깊이 0, 한 칸씩만 깊어진다. `hl` 강조 노드(꼬리표 없으면 "강조"), `path` 전파 경로 1~6칸(부모로만 올라감)은 "k번째" 칩으로 차례로 나타나고 마지막 단계에서 멈춘다.
- **순서도:** `seq(lanes,msgs,{still,label})`. 세로줄 2~4개(이름 8자, 4줄이면 6자 — 320px에서 한 줄에 들도록), 메시지 1~8개 `{from, to, t 글 14자, err 실패 | wait 기다림}`(한글은 2자로 센다, 넘거나 범위 밖이면 오류, err·wait 함께는 오류). from=to면 그 칸 가운데 처리 상자, 아니면 받는 세로줄까지 화살표(실패는 `--mark-text`). 행 k는 `mk-cdz{k}`로 차례로 나타나 마지막 단계에서 멈추고 `still`이면 다 보인다. 읽는 글은 "X가 Y에 t"를 이어 쓰고 실패 수를 붙인다. `pair` 왼쪽에 넣지 않는다.
- **HTTP 메시지 그림:** `httpmsg({kind,start,head,body,hl,label})`. `kind` 요청·응답, 첫 줄은 요청이면 `메서드 경로`, 응답이면 상태 숫자 100~599. 헤더·본문 0~4줄, 줄마다 30자(한글 2자). `hl`은 `start`·`h0`·`b0`처럼 줄 이름이고 강조 줄에 "강조", 응답 400 이상은 첫 줄에 "실패"가 붙는다. 제목은 "HTTP 요청 (버전 줄임)". 움직이지 않는다. `pair` 왼쪽에 넣지 않는다.
- **DB 표 그림:** `dbtab({name,tag,cols,rows,hl,mark,label})`. 이름·이름표 12자, 열 1~3개(문자열 또는 `{n,key:'PK'|'FK'}`, 이름 10자, `type`은 쓰지 않음), 행 0~5줄, 칸은 글 10자(한글 2자). `'NULL'`은 기울인 NULL, `''`은 "빈 글자", 행 0줄이면 "결과 없음(0줄)"(`qrun` 안 표는 내부용 `empty`로 "빈 표"). `hl`은 `{row}`·`{col}`·`{cell:[행,열]}`(하나 또는 배열)이고 "강조", `mark`는 줄마다 6자 꼬리표. 320px에서는 10자 칸이 칸 안에서 줄바꿈된다. 움직이지 않는다. `vs` 칸에 넣지 않는다(표끼리 비교는 `tag` 단 표 둘을 `bkStack`으로 쌓음).
- **쿼리 실행 그림:** `qrun({sql,from,pick,show,after,err,del,hl,still,label})`. 실행 전 표(`dbtab` 1~2개) → "실행" 띠와 SQL 1~4줄(28자) → 결과를 세로로 쌓는다. 결과는 `pick`(행을 `{열:값}`으로 받는 함수, 숫자 모양은 숫자·`'NULL'`은 `null`. `show` 남길 열, `del` 지운 뒤 남은 줄) · `after`(결과 표 1~2개, `hl`은 표 하나일 때만) · `err`(실패 글 28자, "표는 그대로예요") 중 하나. 결과는 8줄까지이고 줄마다 `mk-cdz` 순서로 나타나 마지막 장면에서 멈춘다. after 값 점검: 결과 칸은 실행 전 표의 값·숫자·`'NULL'`·`hl`이 덮는 칸이어야 한다. 화면 낭독기에는 sr 한 줄.
- **관계도 그림:** `erd({tables,links,hl,label})`. 표 2~3개(이름 12자, 열 1~4개 `{n,key,type}`, 열 이름 10자, `type` 6자)를 세로로 쌓고, 이웃한 두 표 사이에 link `{a,b,kind:'1:N'|'N:1'|'1:1'|'N:M',fk}`를 "1 : N … 로 이어져요"로 적는다. `fk`는 1:N이면 b, N:1이면 a, 1:1이면 둘 중 한 표의 FK 열, N:M은 fk 없이 "중간 표가 필요해요". `hl`은 `'표'`·`'표.열'`. 움직이지 않는다.
- **서버 배치도 그림:** `srvmap({user,front,servers,db,note,still,label})`. 위에서 아래로 사용자 → front(있으면) → 서버 1~4대 → db(있으면) → note(28자). user·front·db는 이름 10자(글자나 `{n,st}`), 서버는 `{n 6자, st, got 0~99, tag 6자}`. st는 ok·busy 바쁨·down 고장·new 새로 켬·drain 정리 중·off 꺼짐이고, 고장은 점선과 글자 꼬리표(색만으로 나누지 않음). 고장·꺼진 서버는 요청을 받지 않는다(got 0). 요청을 받은 서버(정리 중 제외)마다 점이 위 2em에서 내려오고 멈춘 장면에는 점이 없다. 서버 줄 위아래 가로선이 첫 칸 가운데부터 끝 칸 가운데까지 이어지고, db가 있으면 서버마다 아래로 세로선이 내려간다. 420px 이하에서 서버 4대는 2열 2줄로 접히고, 개별 선과 점 대신 묶음 테두리 하나로 잇는다. 이름 폭은 wlen(한글 2)으로 센다. `still`이면 점 없음.
- **커밋 그래프 그림:** `gitg(장면, 장면?)`. 장면은 `{t,rows,n,e,tag,say}`로, 노드 `n`은 열 0~4·줄 0~2와 상태(ok·new·gone·copy·stop), 선 `e`는 `A-B` 실선·`A~B` 점선·`A>B` 화살표. 폭 192px 고정에 글자 12px라 320px에서도 줄어들지 않는다. 글자 폭 한도는 제목 24, 줄 이름 14, 이름표 10, 노드 글자 3, 설명 64(한글 2폭)이고 넘거나 이름표가 겹치면 `gitg:` 오류를 낸다.
- **그래프 그림:** `metric({lines,x,max,unit,limit,mark,label})`. 선 1~3개(이름 10자, 점 4~12개, 값 0~`max`)를 굵은 실선·긴 점선·짧은 점선으로 나눈다. x 이름표 5자, unit 4자, `max` 기본값 100(폭은 wlen, 한글 2). `limit {v,n 10자}`는 가는 이중선이고 이름표는 범례에, `mark {i,n 10자}`는 원과 이름표이고, 높이는 그 시점 선 값 중 가장 큰 값이다(이름표는 점 위, 점이 위쪽 1/4이면 아래). 글자는 모두 SVG 밖 HTML이라 줄어들지 않는다. 5점 이상이면 x 이름표는 첫·가운데·끝만, 4점이어도 y 눈금(최댓값+단위)이 7폭 이상이면 첫·끝만. sr 숫자는 소수 둘째 자리까지. 움직이지 않는다.
- **검색 결과 그림:** `serp(q,rows,{hl,still,label})`. 검색어는 20자까지, 결과는 1~4줄이고 줄마다 `{t 제목 32자, u 주소 40자, d 설명 60자, tag 꼬리표 12자}`다(한글은 2자로 센다, 넘거나 제목·주소가 없으면 오류). `hl`은 내 사이트 줄 번호(0부터)이고, 없으면 "내 사이트는 결과에 없어요" 줄이 점선 테두리·`--muted` 글자(대비 7.08:1)로 붙는다. 줄 k는 `mk-rux{k}`로 차례로 나타나고 `still`이면 멈춘 채 다 보인다. `label`은 그림 전체 이름이다. 검색창·없음 줄은 읽지 않고, 요약 `.sr`이 "검색어, 결과 수, 내 사이트 몇 번째"를 읽는다. 특정 검색 서비스를 흉내 내지 않는 중립 모형이다.

### 검색표 (Signature)
남색 띠 안에 명조 "검색표" + 검색창, 아래 번호 원(주황) 3단계 질문 열. 열 사이 주황 화살표는 860px 이하에서 숨김.

### 상태 표시
- **외움 도장:** 명조 "외움", 주황 테두리, multiply 혼합, 찍히듯 1.6배에서 1배로 축소.
- **난이도:** 채운 칸 3개(쉬움/보통/어려움) + aria-label 단어.
- **태그:** 남색 테두리 알약, "실무"는 이끼, 현업 은어는 mark-text.
- **저장:** localStorage `devdict.pins`, `devdict.learned`.

### Motion
기본 easing `cubic-bezier(.16,1,.3,1)`. `prefers-reduced-motion: reduce`에서는 부드러운 스크롤, 지시선·이름표·도장·서랍 전환을 끄고, 데모는 자동 재생하지 않고 "재생" 버튼으로 시작한다.

## Do's and Don'ts

### Do:
- **Do** 새 용어는 도판 형식(그림판 + 지시선 이름표 + "도판 NN-NN" 캡션 + 정의 행)으로 만든다.
- **Do** 그리드 칸은 `minmax(0,…)`로, 데모 자식은 `max-width:100%`로 넘침을 막는다.
- **Do** 상태는 표시(도장·핀 채움·채운 칸)로 보여 주고 색은 보조로만 쓴다.
- **Do** 주황 글자는 mark-text(#a8410f), 주황 면·선·점은 mark-orange(#e0662b).
- **Do** 모든 전환에 reduced-motion 대체를 둔다.

### Don't:
- **Don't** 도판에 그림자를 넣지 않는다. 강조는 주황 이중 링으로만.
- **Don't** 주황을 넓은 장식 면이나 제목 색으로 쓰지 않는다.
- **Don't** 외부 폰트·CDN을 불러오지 않는다. 명조는 내장 서브셋만 쓴다.
- **Don't** 하위 탭 줄을 줄바꿈시키지 않는다. 가로 스크롤을 유지한다.

<!-- 출처: Hahmlet 폰트는 SIL OFL 1.1(파일 주석 출처 github.com/hyper-type/hahmlet, Google Fonts 배포본과 동일 계열)을 서브셋해 base64 woff로 index.html에 내장. 그 외 배포 래스터 이미지 없음. 검토 스크린샷은 .impeccable/review/. -->
