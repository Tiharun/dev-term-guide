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
- **틀:** `phone(body)`(휴대폰, 노치·홈 바), `browser(body,{url})`(브라우저 창, 주소 줄), `pair(art, mock)`(비유 일러스트 → 실제 화면). 용어는 실제 화면 모형으로 그리고, 이름이 비유인 용어만 `pair`를 쓴다.
- **클래스:** 그림 전용 클래스는 `mk-` 접두사(예: `.mk-tpcf`). 전역 클래스(`.bar`·`.stamp`·`.lab` 등)와 같은 이름을 그림 안에 쓰지 않는다.
- **글자:** 그림 속 글자는 11px 이상.
- **직접 조작:** 폼·제스처·상태처럼 해 봐야 아는 카드만 클릭·드래그·입력을 받는다. 마우스·터치·키보드를 모두 받고(`grab`·`keys`), 리스너는 무대(stage) 안 요소에만 단다(`window`·`document` 금지). 끌기가 취소되면(pointercancel) 원래대로 돌아가거나 끝까지 마친다.

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
