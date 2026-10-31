---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# index.html — 개발 용어 설정집

Mode: Read. 초보자가 용어를 찾고(검색·증상 색인·목차) 이해하고(데모·도식) 말하기 예문을 복사한다.
첫 화면: 검색·증상으로 찾기 + 카테고리가 함께 보여야 한다. 길찾기: 왼쪽 목차 + 오른쪽 본문.
피할 것: 딱딱한 교과서, 유치한 게임, 눈이 피곤한 색.
선택 시안: .impeccable/mocks/decision/model-pick.html (용어 도감).

## Direction contract

THESIS: 용어를 도감의 표본 도판처럼 싣는다. 데모를 가운데 두고 지시선으로 부위 이름을 붙이며, 증상 색인은 도감 검색표처럼 질문 갈림길을 따라 찾는다. 글만 늘어놓는 개발 문서 사이트 구성은 쓰지 않는다.

OWN-WORLD: 남색 잉크(#1d2b4f) 프레임과 검색표 띠, 차가운 흰 바탕(#f6f8f7), 이끼색(#5d7f4e) 도판 번호·라벨, 주황(#e0662b)은 현재 위치·지시선 강조에만 쓴다. 제목은 Hahmlet 계열 세리프, 본문은 고딕. 도판 번호 체계(03-12), 지시선 라벨, 표본 캡션이 이 사이트만의 표시다. 외움=도장, 즐겨찾기=표본 핀처럼 상태는 색이 아니라 표시로 나타낸다. 난이도는 칸 수와 글자를 함께 쓴다. 모든 카드는 하나의 모듈 격자에 맞춘다.

STORY: 증상이나 용어로 찾고, 도판에서 움직이는 데모로 이해한 뒤, 예문을 복사해 Claude에게 정확히 지시한다.

FIRST VIEWPORT: 왼쪽 260px 목차(13권, 번호+이름, 현재 권 주황). 위쪽 남색 검색표 띠: 질문 갈림길 3단계와 검색 입력, 그 아래 증상 칩. 본문: 위치 표시(03 디자인 › 기본 › 도판 12), 큰 세리프 제목, 한 줄 설명, 하위항목 5개는 항상 전부 보이고 현재 것만 강조. 그 아래 도판(왼쪽 데모+지시선, 오른쪽 정의·헷갈림·현업 은어·예문·태그).

FORM: 용어 도감, 내 순위 1위(IMPECCABLE’S PICK). seed:5b6191a09e01cc71

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
