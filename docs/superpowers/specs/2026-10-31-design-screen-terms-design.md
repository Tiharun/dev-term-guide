# 디자인 화면 용어 확장 + 그림 기반 (하위 프로젝트 A+B) 설계

- 날짜: 2026-10-31
- 관련 문서: [PLAN.md](../../PLAN.md), [GLOSSARY.md](../../../GLOSSARY.md), [DESIGN.md](../../../DESIGN.md), [PRODUCT.md](../../../PRODUCT.md)
- 전체 4단계 중 첫 단계. C(새 카테고리 5개)와 D(나머지 카테고리 보강)는 각각 별도 스펙으로 진행한다.

## 1. 목적과 성공 기준

초보자가 화면 부품과 디자인 용어를 **그림을 보고 바로 이해**하고, 예문을 복사해 Claude에게 정확히 지시할 수 있게 한다.

성공 기준:
- 디자인 카테고리에 화면 하위항목 8개가 생기고, 기존 디자인 하위항목 9개가 보강된다.
- 새 카드는 모두 도판 형식(그림판 + 지시선 이름표 + 캡션 + 정의 행)이고, 그림은 B(실제 화면 모형) 기본 + 이름이 비유인 용어만 C(비유 일러스트)를 곁들인다.
- 옮긴 카드의 즐겨찾기·외운 체크·옛 주소가 끊기지 않는다.
- 자동 점검과 브라우저 확인(6장)을 모두 통과한다.

## 2. 범위

포함:
- 디자인 새 하위항목 8개와 용어 추가, 기존 카드 이동
- 디자인 기존 하위항목 9개 보강
- 디자인 카테고리의 글자 상자형 그림(flow·big·stack) 11개 다시 그리기
- 새 용어에 맞는 증상 색인 추가
- 화면 모형 부품, 직접 조작 데모 구조
- 옛 이름표 → 새 이름표 이어주기
- Hahmlet 서브셋 다시 만들기, PRODUCT.md의 개수 표기 갱신

제외: 새 카테고리 5개(C), 디자인 외 카테고리 보강과 그림 재제작(D), 파일 나누기.

## 3. 그림 구조

- **파일**: `index.html` 하나 유지. 외부 폰트·라이브러리·CDN 없음(기존 원칙).
- **화면 모형 부품**: 휴대폰 틀, 브라우저 틀, 버튼·입력칸·토스트 등 UI 조각을 만드는 함수를 한곳에 모은다. 카드 그림은 이 부품을 조합해 기존 데모 묶음 `D`에 등록하고, 카드 데이터는 `v:'이름'`으로 가리킨다.
- **비유 일러스트(C)**: 이름이 비유인 용어(예: Toast, Breadcrumb, Hamburger Menu, Kebab Menu, Bento Grid)만. SVG, 설정집 팔레트. 화면 모형 옆에 화살표로 잇는다.
- **직접 조작**: `D` 항목에 선택 속성 `init(stage)`를 둔다. 그림이 처음 보일 때(`mount`) 실행해 클릭·드래그·입력을 붙인다. 마우스·터치·키보드 모두 동작(포인터 이벤트 + 키보드 조작, 조작 대상은 포커스 가능).
- **기존 규칙 유지**: 보이는 카드만 재생, 동작 줄이기 설정이면 자동 재생 대신 재생 버튼, 나쁜 예/좋은 예는 `cmp` 방식 재사용, 도판에 그림자 없음(DESIGN.md).
- **그림 속 글자 최소 11px**: 모형을 실제 크기에 가깝게 그려 글자를 줄이지 않는다.
- **조작 대상 카드**: 폼·입력, 상태·피드백, 제스처·조작 하위항목 중 직접 해 봐야 이해되는 카드(예: Slider, Inline Validation, Drag and Drop, Swipe to Delete, Snackbar). 나머지는 자동 재생 또는 정지 그림.

## 4. 데이터와 배치

### 4.1 디자인 하위항목 순서

기본 · 필수 · 모션 · 심화 · 앱·프로그램 UI · **폼·입력 · 상태·피드백 · 내비게이션 · 표·목록 · 시각 스타일 · 제스처·조작 · 기기 화면 · 이미지·미디어** · 디자인 툴 · 폰트 · 색상 · 추천 개념

### 4.2 옮길 카드

기준: 화면 부품만 옮긴다. CSS 속성, 페이지 영역(Header·Footer 등), 버그 증상은 제자리.

| 새 하위항목 | 디자인 안에서 (id 유지) | 다른 카테고리에서 (id 바뀜) |
|---|---|---|
| 폼·입력 | Checkbox, Radio Button, Toggle Switch, Dropdown | 웹: Form, Input Field, Placeholder |
| 상태·피드백 | Modal, Overlay, Toast, Tooltip, Skeleton UI | 웹: Empty State, Badge, Loading Spinner, Progress Bar / 백엔드: Loading State |
| 내비게이션 | Tab, Hamburger Menu, Drawer | 웹: Breadcrumb, Pagination, GNB |
| 이미지·미디어 | Carousel | 웹: Avatar |

- Loading State는 설계 승인 뒤 중복 검사에서 찾은 추가 이동이다(백엔드에 이미 있어 새로 만들지 않고 옮김).
- 결과: 웹 "페이지 구성요소" 14→8개, 디자인 "필수" 14→6개(+8 보강), 디자인 "앱 UI" 13→8개(+11 보강).

### 4.3 이름표 이어주기

- 카드 id는 `카테고리-영문명`([index.html:1414](../../../index.html))이라 다른 카테고리로 옮기면 바뀐다(12개).
- 옛 id → 새 id 대응표를 데이터 영역에 둔다.
- 시작 시 `devdict.pins`, `devdict.learned`의 옛 id를 새 id로 바꿔 저장한다.
- 옛 주소 `#/t/옛id`로 들어오면 새 카드로 이동한다.

### 4.4 중복 원칙

같은 영문명 카드는 하나만 만든다. 이미 다른 카테고리에 있는 개념은 새로 만들지 않고 관련 용어(`r`)로 잇는다. 검사 결과 반영:
- Validation(백엔드), Virtual Scrolling(성능)은 이미 있음 → 새 카드 없이 연결
- Sorting·Filtering(DB)은 데이터 처리 뜻 → 화면 부품은 Sortable Column, Filter Panel로 따로 만든다
- Figma의 Library는 코드 Library(개발 기본)와 뜻이 달라 Team Library로 만든다

## 5. 용어 목록

괄호는 한글명 초안. 제작 중 실무 표현에 맞게 다듬는다. 새 용어 242개.

### 5.1 새 하위항목 (143개 + 이동 25개)

- **폼·입력 (21)**: Label(라벨), Helper Text(도움말 문구), Inline Validation(입력 즉시 검사), Required Field(필수 입력), Text Area(여러 줄 입력칸), Select Box(셀렉트 박스), Autocomplete(자동완성), Search Bar(검색창), Date Picker(날짜 선택기), Slider(슬라이더), Quantity Stepper(수량 조절 버튼), File Upload(파일 올리기), Dropzone(끌어다 놓는 영역), Segmented Control(세그먼트 컨트롤), Password Toggle(비밀번호 보기), Floating Label(떠오르는 라벨), Disabled State(비활성 상태), Submit Button(제출 버튼), OTP Input(인증번호 칸), Input Mask(입력 형식 맞춤), Rating(별점)
- **상태·피드백 (13)**: Snackbar(스낵바), Banner(알림 띠), Confirm Dialog(확인창), Popover(팝오버), Notification Dot(알림 점·레드닷), Error State(오류 화면), Success State(완료 화면), Inline Message(안내 문구), Determinate vs Indeterminate(정해진·정해지지 않은 진행), Optimistic UI(먼저 반영하기), Status Indicator(상태 점), Cookie Consent Banner(쿠키 동의 배너), Destructive Action(되돌릴 수 없는 동작)
- **내비게이션 (14)**: LNB(지역 메뉴), Tab Bar(하단 탭 바), Mega Menu(메가 메뉴), Stepper(단계 표시), Back Button(뒤로 가기), FAB(떠 있는 버튼), Back to Top(맨 위로), Anchor Link(페이지 안 이동 링크), Table of Contents(목차), Load More Button(더 보기), Navigation Rail(내비게이션 레일), Skip Link(본문 바로가기), Active Menu(현재 메뉴 표시), Kebab Menu(케밥 메뉴 ⋮)
- **표·목록 (21)**: Data Table(데이터 표), Table Header(표 머리글), Sortable Column(정렬 가능한 열), Filter Panel(필터 패널), List(목록), Grid View(격자 보기), Tree View(트리 보기), Kanban Board(칸반 보드), Timeline(타임라인), Zebra Stripes(줄무늬 표), Frozen Column(고정 열), Bulk Action(일괄 작업), Inline Edit(표 안에서 바로 수정), Expandable Row(펼치는 행), Responsive Table(반응형 표), Dashboard(대시보드), Bar Chart(막대 차트), Line Chart(꺾은선 차트), Pie Chart(원 차트), Legend(범례), Master-Detail(목록-상세)
- **시각 스타일 (21)**: Flat Design(플랫 디자인), Skeuomorphism(스큐어모피즘), Glassmorphism(글래스모피즘), Neumorphism(뉴모피즘), Material Design(머티리얼 디자인), Human Interface Guidelines(HIG), Elevation(떠 있는 높이), Backdrop Blur(배경 흐림), Stroke(외곽선), Line Icon vs Solid Icon(선 아이콘·면 아이콘), Squircle(스쿼클), Grain Texture(노이즈 질감), Duotone(듀오톤), Minimalism(미니멀), Brutalism(브루탈리즘), Bento Grid(벤토 그리드), Inner Shadow(안쪽 그림자), Glow(빛 번짐), Mesh Gradient(메시 그라데이션), Illustration(일러스트), Isometric(아이소메트릭)
- **제스처·조작 (18)**: Tap(탭), Double Tap(두 번 탭), Long Press(길게 누르기), Swipe(스와이프), Pinch Zoom(두 손가락 확대), Pan(화면 끌기), Drag and Drop(끌어다 놓기), Drag to Reorder(끌어서 순서 바꾸기), Pull to Refresh(당겨서 새로고침), Swipe to Delete(밀어서 삭제), Edge Swipe(가장자리 밀기), Haptic Feedback(진동 피드백), Pressed State(눌림 상태), Tab Order(Tab 키 이동 순서), Cursor Style(커서 모양), Scroll Snap(스크롤 맞춤), Rubber Banding(끝에서 튕김), Momentum Scroll(관성 스크롤)
- **기기 화면 (16)**: Safe Area(안전 영역), Notch(노치), Dynamic Island(다이내믹 아일랜드), Home Indicator(홈 바), Screen Resolution(해상도), Pixel Density(픽셀 밀도·DPR), Retina Display(레티나), Physical vs CSS Pixel(물리 픽셀·CSS 픽셀), Screen Size(화면 크기), Orientation(가로·세로 모드), Foldable(폴더블), Split Screen(화면 분할), Refresh Rate(주사율), Virtual Keyboard(화면 키보드), Text Scaling(글자 크기 설정), Bezel(베젤)
- **이미지·미디어 (19)**: Thumbnail(썸네일), Crop(자르기), Blur-up Placeholder(흐린 미리보기), Lightbox(라이트박스), Gallery(갤러리), Image Format(이미지 형식), Vector vs Raster(벡터·래스터), Alt Text(대체 텍스트), Responsive Image(반응형 이미지), Image Compression(이미지 압축), Video Player(동영상 플레이어), Autoplay(자동 재생), Poster Image(대표 이미지), Background Video(배경 동영상), Embed(임베드), GIF(움짤), Masonry Layout(벽돌 배치), Watermark(워터마크), Lottie(로티)

### 5.2 기존 하위항목 보강 (99개)

- **기본 (7)**: Consistency(일관성), Focal Point(시선이 먼저 가는 곳), Readability(가독성), Visual Weight(시각적 무게), Balance(균형), Grouping(묶기), Density(밀도)
- **필수 (8)**: Primary Button(주 버튼), Secondary Button(보조 버튼), Ghost Button(고스트 버튼), Icon Button(아이콘 버튼), Style Guide(스타일 가이드), UI Kit(UI 키트), User Flow(사용자 흐름), Design Spec(디자인 스펙·치수 표기)
- **모션 (13)**: Crossfade(겹쳐 바뀌기), Shared Element Transition(공유 요소 전환), Shimmer(반짝이며 로딩), Count-up(숫자 올라가기), Typewriter Effect(타자 효과), Marquee(흐르는 글자), Scroll-linked Animation(스크롤 연동), Collapse / Expand(접기·펼치기), Reveal Mask(가려진 것이 드러나기), Path Drawing(선 그려지기), Magnetic Button(자석 버튼), Tilt Effect(기울기 효과), Confetti(색종이 효과)
- **심화 (11)**: Progressive Disclosure(점진적 공개), Cognitive Load(인지 부하), Fitts's Law(피츠의 법칙), Hick's Law(힉의 법칙), Jakob's Law(제이콥의 법칙), F-pattern / Z-pattern(시선 흐름), Information Architecture(정보 구조), Mental Model(멘탈 모델), Usability Test(사용성 테스트), Heuristic Evaluation(휴리스틱 평가), Modular Scale(크기 비율 단계)
- **앱·프로그램 UI (11)**: Splash Screen(시작 화면), Onboarding(첫 사용 안내), App Bar(앱 바), Scrollbar(스크롤바), Split Pane(나눈 창), Shortcut Key(단축키), Window Controls(최소화·최대화·닫기), Tray Icon(트레이 아이콘), Settings Screen(설정 화면), Inspector Panel(속성 패널), Command Palette(명령 팔레트)
- **디자인 툴 (14)**: Variables(변수), Styles(스타일), Plugin(플러그인), Smart Animate(스마트 애니메이트), Mask(마스크), Boolean Operation(도형 합치기·빼기), Export(내보내기), Team Library(팀 라이브러리), Slice(슬라이스), Pen Tool(펜 툴), Component Properties(컴포넌트 속성), Hug / Fill / Fixed(크기 맞춤 방식), Layout Grid(레이아웃 그리드), Version History(버전 기록)
- **폰트 (13)**: Font Family(글꼴 가족), Variable Font(가변 글꼴), Baseline(기준선), x-height(x 높이), Cap Height(대문자 높이), Ligature(합자), Myeongjo vs Gothic(명조·고딕), Subset(서브셋), Italic(이탤릭), Heading Levels(제목 단계 H1~H6), Body Text(본문), Orphan / Widow(외톨이 줄), Font License(글꼴 라이선스)
- **색상 (14)**: Saturation(채도), Brightness(명도), Tint / Shade(밝게·어둡게 섞기), Semantic Color(의미 색), Brand Color(브랜드 색), Complementary Color(보색), Analogous Color(유사색), Monochrome(단색), Neutral Color(무채색), Color Blindness(색각 이상), RGB vs CMYK, Tone Down(톤 다운), Color Temperature(색 온도), OKLCH
- **추천 개념 (8, 현업 은어 포함)**: Develop(디벨롭), Asset(에셋), Design Review(디자인 리뷰), Layout Frame(와꾸), Dummy Data(가라 데이터), Lorem Ipsum(더미 텍스트), Benchmarking(벤치마킹), Moodboard(무드보드)

## 6. 증상 색인 추가

기존 8개 묶음 유지(검색표 칩 구성 불변). 추가 초안 26개:

| 묶음 | 증상 | 가리키는 용어 |
|---|---|---|
| 크기·화면 | 아이폰에서 위·아래 내용이 가려진다 | Safe Area, Notch |
| 크기·화면 | 휴대폰을 가로로 돌리면 화면이 깨진다 | Orientation |
| 크기·화면 | 키보드가 올라오면 입력칸이 가려진다 | Virtual Keyboard |
| 크기·화면 | 표가 휴대폰에서 옆으로 삐져나간다 | Responsive Table |
| 크기·화면 | 글자 크기 설정을 키우면 화면이 깨진다 | Text Scaling |
| 크기·화면 | 고해상도 화면에서 이미지가 흐릿하다 | Pixel Density, Responsive Image |
| 반응·클릭 | 입력하자마자 빨간 오류 글씨가 뜬다 | Inline Validation |
| 반응·클릭 | 끌어서 놓기가 안 된다 | Drag and Drop |
| 반응·클릭 | 버튼을 눌러도 눌린 느낌이 없다 | Pressed State |
| 반응·클릭 | Tab 키를 누르면 엉뚱한 곳으로 이동한다 | Tab Order |
| 반응·클릭 | 아래로 당겨도 새로고침이 안 된다 | Pull to Refresh |
| 반응·클릭 | 눌렀는데 한참 뒤에야 화면이 바뀐다 | Optimistic UI |
| 움직임 | 알림이 너무 빨리 사라진다 | Toast, Snackbar |
| 움직임 | 스크롤이 칸마다 딱 멈추지 않는다 | Scroll Snap |
| 움직임 | 목록 끝에서 튕기는 느낌이 없다 | Rubber Banding |
| 색·모양 | 뒤가 유리처럼 흐리게 비치게 하고 싶다 | Glassmorphism, Backdrop Blur |
| 색·모양 | 모서리가 아이폰 아이콘처럼 부드럽지 않다 | Squircle |
| 색·모양 | 색약인 사람이 구분을 못 한다 | Color Blindness |
| 색·모양 | 색이 너무 쨍하다 | Saturation, Tone Down |
| 글자 | 마지막 줄에 한 글자만 남는다 | Orphan / Widow |
| 글자 | 제목 글꼴 중 일부 글자만 모양이 다르다 | Subset |
| 위치·간격 | 긴 페이지에서 맨 위로 돌아가기 힘들다 | Back to Top |
| 느림 | 이미지가 늦게 뜨고 덜컥 나타난다 | Blur-up Placeholder |
| 느림 | 사진 때문에 페이지가 무겁다 | Image Compression |
| 오류·안 됨 | 이미지가 안 보일 때 무슨 사진인지 모른다 | Alt Text |
| 오류·안 됨 | 동영상 자동 재생이 안 된다 | Autoplay |

## 7. 진행 순서

하위항목 하나 = 작업 단위 하나. 단위마다 자동 점검 + 브라우저 확인 통과 후 커밋하고 다음으로 넘어간다.

1. 기반: 화면 모형 부품, `init` 지원, 이름표 이어주기, 점검 함수
2. 새 하위항목 8개(4.1 순서), 카드 이동 포함
3. 기존 하위항목 9개 보강 + 글자 상자형 그림 11개 다시 그리기
4. 증상 색인 추가
5. Hahmlet 서브셋 다시 만들기, PRODUCT.md·PLAN.md 개수 표기 갱신

## 8. 점검과 완료 기준

자동 점검(브라우저에서 실행하는 점검 함수):
- 모든 카드에 그림(`v`) 있음
- 영문명 중복 없음(기존 Component·Dark Mode 제외)
- 관련 용어·증상이 가리키는 카드 존재
- 이름표 대응표의 새 id가 모두 존재
- 콘솔 오류 0

브라우저 확인(Playwright):
- PC 1280px, 휴대폰 375px 스크린샷, 가로 넘침 없음
- 직접 조작 데모를 마우스·터치·키보드(Tab·Enter·Space·방향키)로 조작
- 동작 줄이기 설정에서 자동 재생 안 됨, 재생 버튼 동작
- 옛 id로 즐겨찾기를 저장해 둔 상태에서 열기 → 새 id로 바뀜, 옛 주소 → 새 카드

디자인 품질: impeccable 점검, break-ui(긴 글자·빈 값 등), 필요 시 interfaces·emil 계열 스킬로 모션·레이아웃 다듬기.

완료 기준: 위 점검 모두 통과, 새 카드 전부 도판 형식, 모든 폭에서 깨짐 없음, 커밋 완료.

## 9. 글꼴

- fonttools 4.66.1, Node 22 설치 확인(이 PC).
- 원본 Hahmlet.ttf는 프로젝트에 없고, 이전 작업 임시 폴더에 사본이 있다. 작업 시점에 이 세션 scratchpad로 복사해 사용한다.
- 사본이 지워졌으면 GitHub(hyper-type/hahmlet, OFL)에서 받아도 되는지 사용자에게 묻는다.

## 10. 위험

- **파일 크기**: 수 MB로 커진다(추측). 사용에는 지장 없고 편집만 번거로워진다. D 단계에서 다루기 어려우면 "나눠 작업 후 합치기"로 재검토.
- **용어 정확성**: "공식" 근거는 공식 문서를 확인한 경우만 단다. 확인 못 하면 "실무"로 둔다.
- **도판 번호 변경**: 디자인 카테고리 번호가 다시 매겨진다(저장 기록은 id 기준이라 영향 없음).
