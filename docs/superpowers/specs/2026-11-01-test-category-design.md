# 테스트 카테고리 (② 새 카테고리 3/5) 설계

- 날짜: 2026-11-01
- 관련 문서: [PLAN.md](../../PLAN.md), [GLOSSARY.md](../../../GLOSSARY.md), [DESIGN.md](../../../DESIGN.md), 네트워크 설계 [2026-11-01-network-category-design.md](2026-11-01-network-category-design.md)
- ② 새 카테고리는 카테고리마다 명세 → 계획 → 구현 → main 병합을 한 바퀴씩 진행한다. 완료: 터미널·명령줄, 네트워크. 이 문서는 세 번째(사용자 선택: 테스트 먼저). 남은 것: 모바일 앱, 기획·문서.

## 1. 목적과 성공 기준

초보자가 "테스트 돌려 줘", "TDD로 해 줘" 같은 말을 **테스트가 돌고 통과·실패가 갈리는 그림으로 바로 이해**하고, 예문을 복사해 Claude에게 정확히 지시하게 한다.

성공 기준:
- `버그 · 디버깅 현상` 다음에 `테스트` 카테고리가 생기고, 하위항목 6개에 카드 71개가 들어간다(옮긴 3개 포함).
- 모든 카드가 도판 형식이고, 테스트가 실행되는 카드는 공용 테스트 실행 모형 `runner()`로 그린다.
- 옮긴 카드 3개의 즐겨찾기·외운 체크·옛 주소가 끊기지 않는다.
- 7장 점검을 모두 통과한다.

## 2. 범위

포함: 새 카테고리와 하위항목, 카드 71개, 기존 카드 3개 이동, 공용 모형 `runner()`, 직접 조작 카드 4개, 비유 그림 3개, 증상 색인 12개, 글꼴 서브셋 갱신, PRODUCT.md·PLAN.md 개수 표기 갱신, 점검 스크립트 확장.

다루는 영역(사용자 선택): 테스트 개념·종류, 테스트 코드 쓰기(Jest·Vitest 기준), 브라우저 자동 테스트(Playwright 기준), 수동 QA·출시 전 점검.

제외: 나머지 새 카테고리 2개, 기존 카테고리 보강·그림 재제작(③), 이름이 겹치는 기존 카드의 이동(3개 외, 4.7 참고), 특정 도구의 설치·설정 방법 안내.

## 3. 배치

- `CAT('test','테스트', …)`을 `CAT('bug', …)`([index.html:1545](../../../index.html)) 바로 다음에 넣는다. 뒤 카테고리(AI)의 번호(`c.no`)와 도판 번호는 하나씩 밀린다. 두 번호는 화면 표시에만 쓰이고 저장되지 않는다(터미널 설계 3장에서 측정).
- 카테고리 설명: "코드와 화면이 의도대로 동작하는지 확인하는 방법의 말"
- 하위항목: 공통 기본·필수·모션용어 및 연출·심화 + 추가 `kind` 테스트 종류("무엇을 어디까지 확인하느냐에 따른 테스트 이름") + 공통 추천 개념.
- 모션용어 및 연출은 "테스트가 돌면서 움직이거나 바뀌는 것"으로 채운다.

## 4. 용어 목록 (71개)

`*` = 다른 카테고리에서 옮겨 옴, `▶` = 직접 조작, `◎` = 비유 그림 곁들임. 한글명은 `한글 · 풀이` 형식으로 구현 때 정한다.

### 4.1 기본 (11)
Testing\*, Test Case, Test Suite, Test Code, Test Runner, Assertion▶, Pass / Fail, Automated Test, Manual Testing, QA, Test Coverage▶

### 4.2 필수 (15)
describe · it, expect, Matcher(toBe·toEqual), Mock▶, Stub, Spy, Test Double◎, Fixture, beforeEach · afterEach, Arrange-Act-Assert, Snapshot Test, Test File Naming(.test.js·.spec.js), Jest, Vitest, Playwright

### 4.3 모션용어 및 연출 (9)
Red-Green-Refactor, Auto-waiting, Test Timeout, Test Retry, Parallel Test, Headless vs Headed, Trace Viewer, Snapshot Update, Flaky Test\*▶

### 4.4 심화 (12)
TDD, BDD, Test Pyramid, Test Isolation, Deterministic Test, Dependency Injection, Locator, Page Object Model, Coverage Threshold, Mutation Testing◎, Property-based Testing, Contract Testing

### 4.5 테스트 종류 (14)
Unit Test, Integration Test, E2E Test, Component Test, API Test, Smoke Test\*◎, Regression Test, Visual Regression Test, Acceptance Test(UAT), Exploratory Testing, Sanity Test, Performance · Load Test, Accessibility Test, Static Analysis(Lint·Type Check)

### 4.6 추천 개념 (10)
Happy Path vs Unhappy Path, Given-When-Then, Bug First Test(버그를 먼저 실패하는 테스트로 재현), Test Behavior Not Implementation, .only · .skip, Required Check(통과해야 병합되는 검사), Broken Build(현업 은어 "빌드 깨졌다"), Test Account, QA Sign-off, Test Report

### 4.7 겹치는 카드 처리 (측정: 기존 영문명 1,115개와 대조)

| 이미 있는 카드 | 처리 |
|---|---|
| Testing(버그/필수)·Flaky Test(버그/심화)·Smoke Test(배포/추천) | 테스트로 옮김(사용자 결정) |
| Regression(버그) | 버그 현상이라 그대로 둠 → Regression Test에서 연결 |
| Mock Data(백엔드)·Seed Data(데이터베이스)·Dummy Data(디자인) | 개발·화면용 가짜 데이터라 그대로 둠 → Mock·Fixture에서 연결 |
| Retry(백엔드)·Timeout(백엔드) | 요청 재시도·시간 초과라 그대로 둠 → Test Retry·Test Timeout에서 연결 |
| Cross-browser·Web Accessibility(웹) | 그대로 둠 → Accessibility Test·E2E Test에서 연결 |
| Works on My Machine(서버) | 그대로 둠 → Deterministic Test·Test Isolation에서 연결 |
| Design QA·Usability Test(디자인)·A/B Test(웹)·Penetration Test(보안) | 분야가 달라 그대로 둠 → QA·Acceptance Test에서 연결 |
| Edge Case(기본)·Reproduce·Expected vs Actual·Minimal Reproduction(버그) | 그대로 둠 → Happy Path vs Unhappy Path·Assertion·Bug First Test에서 연결 |
| CI/CD·GitHub Actions·Pipeline(배포) | 그대로 둠 → Required Check·Broken Build에서 연결 |
| Acceptance Criteria(AI) | 그대로 둠 → Acceptance Test·Given-When-Then에서 연결 |
| Hot Reload(기본) | 그대로 둠(Watch Mode 카드가 이미 연결) |
| Watch Mode(터미널/모션) | 계획 단계에서 발견. 새로 만들지 않고 Red-Green-Refactor·Vitest에서 연결 |
| Lighthouse·Slow 3G Test(성능) | 그대로 둠 → Performance · Load Test에서 연결 |
| Selector(프론트엔드, CSS) | 뜻이 다름 → Locator에서 연결 |

### 4.8 사실 확인 원칙
- 도구 기본값(Jest·Vitest·Playwright 테스트 타임아웃, 재시도 기본값, 테스트 파일 이름 규칙, 스냅샷 갱신 명령, 자동 대기 동작)은 구현 단계에서 카드마다 공식 문서(jestjs.io, vitest.dev, playwright.dev, MDN)로 확인한다. 공식이면 `o:1`, `u`에 주소를 적는다.
- 테스트 피라미드·TDD·BDD처럼 출처가 사람·책인 개념은 단정 대신 "보통", "흔히"로 적고, 공식 문서가 없으면 `o:0`(실무)로 둔다.
- Broken Build는 현업 은어 표시를 붙이고 출처는 실무로 둔다.
- 버전마다 다른 값은 카드에 버전을 함께 적거나 "도구마다 다르다"로 적는다.

## 5. 그림 구조

- **공용 모형 `runner(tests, opt)`**: 화면 모형 부품 모음(`term`·`net`, [index.html:3117](../../../index.html)~3160) 옆에 추가한다.
  - 위: 테스트 코드 파일(선택, `opt.file` 이름 + `opt.code` 줄). 코드 글자는 고정폭, 그림 속 글자 11px 이상, 색은 기존 토큰.
  - 아래: 결과 줄 `{n 이름, s 'pass'|'fail'|'skip', e 기대값, a 실제값, ms}`. 줄마다 실행 중 표시 → ✓/✗로 바뀌고, 실패 줄 밑에 기대값·실제값을 보인다. 끝에 "통과 N · 실패 M" 요약 줄.
  - 재생: 터미널·네트워크 모형과 같은 구조(주기 10초, 음수 지연으로 멈춘 장면이 모든 줄이 끝난 뒤 모습, 보일 때만 재생, 다시 재생 가능). 동작 줄이기 설정이면 멈춘 완성 장면 + 재생 버튼.
  - 결과 줄의 ✓/✗는 색만으로 구분하지 않고 기호와 글자(통과·실패)를 함께 쓴다.
  - 긴 테스트 이름·긴 값은 그림 안에서 줄바꿈하고 그림판 밖으로 넘치지 않게 한다.
- **기존 모형 재사용**: 명령 실행은 `term()`(예: `npx vitest --watch`), E2E·화면 비교는 `browser()` 옆에 `runner()`를 둔다(`pair()`처럼 화살표로 잇는다).
- **직접 조작 4장**(`init`, 기존 `grab`·`keys` 도우미 재사용, 버튼은 포커스 가능하고 키보드로도 누름, 결과 문장은 `aria-live`):
  - Assertion: 기대값을 바꾸면 통과·실패가 바뀜
  - Mock: 진짜 API ↔ 가짜(mock) 전환. 진짜면 느리고 가끔 실패, 가짜면 빠르고 항상 같은 결과
  - Test Coverage: 테스트를 켜고 끄면 코드 줄이 실행됨·안 됨으로 칠해지고 비율이 바뀜
  - Flaky Test: "다시 실행"할 때마다 결과가 바뀜(정해진 순서로, 무작위 아님). "원인 고정"을 켜면 항상 통과
- **비유 그림**: 이름이 비유인 Smoke Test(전원 켰을 때 연기 나는지 보기)·Test Double(스턴트 대역 배우)·Mutation Testing(코드 돌연변이)만. 터미널·네트워크와 같이 모형 옆에 화살표로 잇는다(`pair()`).
- **흐름이 없는 카드**: Test Pyramid는 층 쌓은 그림, Test Report·Coverage Threshold는 막대·표, 도구 카드(Jest·Vitest·Playwright)는 대표 파일·명령과 결과를 짝지은 그림.

## 6. 데이터

- 카드 id는 `카테고리-slug(영문명)`이라 옮기면 바뀐다([index.html:3091](../../../index.html)). `MOVED`([index.html:2925](../../../index.html))에 3개를 추가한다: `bug-testing`→`test-testing`, `bug-flaky-test`→`test-flaky-test`, `deploy-smoke-test`→`test-smoke-test`. 즐겨찾기·외움 이어주기와 옛 주소 이동은 ①에서 만든 기능이 그대로 처리한다.
- 옮기는 카드는 정의·예문을 유지하고 그림만 새로 그린다(지금은 공용 `checkbox`·`flicker` 그림).
- 옮긴 뒤 개수: 버그 core 9→8, adv 8→7, 배포 tip 8→7.
- 다른 카드의 관련 용어(`r`)는 영문명 연결이라 옮겨도 그대로 동작한다.
- 증상 색인 12개(묶음은 기존 `SYMPTOM_GROUPS`, [index.html:1515](../../../index.html)):

| 묶음 | 증상 | 용어 |
|---|---|---|
| 오류·안 됨 | 테스트가 가끔만 실패해요 | Flaky Test |
| 오류·안 됨 | 내 PC에선 통과하는데 CI에서만 실패해요 | Deterministic Test |
| 오류·안 됨 | 고친 버그가 다시 생겼어요 | Regression Test |
| 오류·안 됨 | 테스트는 다 통과했는데 실제로 써 보면 안 돼요 | E2E Test |
| 오류·안 됨 | 스냅샷 테스트가 갑자기 실패해요 | Snapshot Update |
| 오류·안 됨 | 버튼을 못 찾는다며 테스트가 실패해요 | Auto-waiting |
| 오류·안 됨 | 테스트가 시간 초과로 끝나요 | Test Timeout |
| 오류·안 됨 | 외부 API가 멈추면 테스트도 실패해요 | Mock |
| 오류·안 됨 | 화면 디자인이 모르게 바뀌었어요 | Visual Regression Test |
| 오류·안 됨 | 검사가 실패해서 병합 버튼이 안 눌려요 | Required Check |
| 오류·안 됨 | 커버리지가 낮다며 CI가 실패해요 | Coverage Threshold |
| 느림 | 테스트가 너무 오래 걸려요 | Parallel Test |

## 7. 점검과 완료 기준

자동 점검 `tests/check.mjs`(키 형식 `'카테고리/하위항목'`):
- 테스트 하위항목별 기대 카드·개수, 옮긴 3개가 `test`에 있고 원래 카테고리에 없음, `MOVED`의 새 id 존재, 모든 카드에 그림, 영문명 중복 없음, 관련 용어·증상 대상 존재.
- `runner()` 멈춘 장면이 모든 결과 줄이 끝난 뒤인지(터미널의 `tframe`과 같은 방식).
- 결과 줄에 기호와 글자가 함께 있는지, 직접 조작 4장의 결과 문장에 `aria-live`가 있는지(기존 `live` 점검 재사용).
- 버그·배포 하위항목 개수가 옮긴 만큼 줄었는지(bug/core 8, bug/adv 7, deploy/tip 7).

브라우저 확인(Playwright, 로컬 서버):
- PC 1280px, 휴대폰 375px, 좁은 그림판 320px. 가로 넘침 없음, 긴 테스트 이름·긴 기대값은 그림 안에서 줄바꿈.
- 직접 조작 4장을 마우스·터치·키보드로 조작.
- 동작 줄이기 설정에서 자동 재생 안 됨, 재생 버튼 동작.
- `bug-testing`으로 즐겨찾기를 저장해 둔 상태에서 열면 새 id로 바뀜, `#/t/bug-testing` → 새 카드.
- 콘솔 오류 0(favicon 404 제외).

디자인 품질: impeccable 점검, break-ui(긴 테스트 이름, 결과 줄 20개, 긴 기대값·실제값), 필요하면 interfaces·emil 계열 스킬로 다듬기.

완료 기준: 위 점검 통과, 커밋 후 main 병합.

## 8. 진행 순서

하위항목 하나 = 작업 단위 하나. 단위마다 자동 점검 + 브라우저 확인 후 커밋.

1. 기반: 카테고리 추가, `runner()`, `MOVED` 3개, 점검 스크립트 확장
2. 기본(옮긴 1개 포함) → 필수 → 모션(옮긴 1개 포함) → 심화 → 테스트 종류(옮긴 1개 포함) → 추천 개념
3. 증상 색인 12개
4. Hahmlet 서브셋 다시 만들기, PRODUCT.md·PLAN.md 개수 표기 갱신

## 9. 글꼴

터미널 설계 10장과 같다. 네트워크 때 쓴 서브셋 생성 방법을 그대로 쓴다. 원본 Hahmlet 사본이 없으면 GitHub(hyper-type/hahmlet, OFL)에서 다시 받아도 되는지 사용자에게 묻는다.

## 10. 위험

- 도구 기본값(타임아웃·재시도·파일 이름 규칙)은 버전마다 바뀐다 → 공식 문서로 확인한 것만 단정하고 필요하면 버전을 적는다.
- 결과 줄이 많아지면 휴대폰에서 그림이 길어진다 → 그림당 결과 줄 최대 6개.
- 증상 색인 "오류·안 됨" 칩이 26개에서 37개로 늘어난다 → PLAN.md 남은 일(③에서 다시 보기)에 개수를 갱신해 둔다.
- `index.html`이 계속 커진다(측정: 현재 1,280,856바이트). 파일 나누기는 범위 밖이며 PLAN의 "품질 우선" 결정을 따른다.
