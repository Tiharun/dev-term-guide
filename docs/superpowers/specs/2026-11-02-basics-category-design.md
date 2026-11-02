# 개발 기본 카테고리 보강 (③ 기존 카테고리 1/12) 설계

- 날짜: 2026-11-02
- 관련 문서: [PLAN.md](../../PLAN.md), [DESIGN.md](../../../DESIGN.md), 기획·문서 설계 [2026-11-01-plan-docs-category-design.md](2026-11-01-plan-docs-category-design.md)
- ③은 남은 12개 카테고리를 사이트 순서(basics → web → front → back → db → server → git → deploy → security → perf → bug → ai)로 하나씩 보강한다. 이 문서는 첫 번째다.
- 진행 방식: 구현은 메인 세션, 설계서·계획서·구현 묶음 검토는 디렉터 에이전트(Opus 5.5, effort high)가 맡는다. 판단은 메인이 하고 원장에 남긴다.

## 1. 목적과 성공 기준

코딩을 처음 보는 사람이 "변수", "비동기", "중복 줄여 줘" 같은 말을 **코드가 한 줄씩 실행되는 그림과 메모리 상자 그림으로 바로 이해**하고, 헷갈리는 짝(예: Library vs Framework)의 차이를 카드 하나로 정리하게 한다.

성공 기준:
- 개발 기본이 하위항목 7개, 카드 약 103장(53 + 새 약 50)이 된다.
- 모든 카드에 x(헷갈림 칸)가 있다.
- 글자상자 그림이 0장이다(점검으로 막음).
- 8장 완료 기준을 모두 통과한다.

## 2. 범위

포함:
- 새 하위항목 `principle`(좋은 코드 원칙) 1개.
- 새 카드 50장(4장 목록). 정의 d와 x 모두 해요체, 새 그림.
- 기존 49장에 x 채움(x가 이미 있는 4장 제외). 해요체 2~3문장, 헷갈리는 짝이 있으면 차이를 먼저 쓴다. 기존 d는 바꾸지 않는다.
- 글자상자 그림 23장 다시 그림(3.3).
- 나머지 기존 그림 30장은 형식을 유지하고 3폭·11px만 점검·수정.
- 새 그림 도우미 `ide()`·`mem()`(3.1, 3.2).
- 직접 조작 4장: Loop(반복 횟수), Conditional(값 바꾸기), Async/Await(기다리기 켜고 끄기), Immutability(복사 후 수정 vs 직접 수정).
- 증상 색인 10~15개 추가(6장).
- 글꼴 서브셋, PRODUCT.md·PLAN.md·DESIGN.md 개수·도우미 표기 갱신, 점검 기대값 갱신.

제외:
- 증상 "오류·안 됨" 칩 53개 재검토(③ 마지막 AI 이후 한 번에).
- 헷갈림 칸 이름 변경, 기존 카드 이동, 다른 카테고리 카드 수정(r 연결만 예외).

## 3. 그림 구조

### 3.1 `ide()` — 코드 편집기 모형 (새로)

- 왼쪽(좁은 화면에서는 위) 코드 칸: 줄 번호와 코드. 강조 줄이 한 줄씩 내려간다.
- 오른쪽(좁은 화면에서는 아래) 칸 두 개: 출력(console)과 변수(이름 = 값).
- 단계 배열을 받아 단계마다 강조 줄·출력·변수를 바꾼다. reduced-motion이면 마지막 단계를 고정해 보여 준다(still).
- 입력 검사: 강조 줄 번호가 코드 줄 수를 넘거나 단계가 비면 오류를 던진다(점검이 잡게).
- 화면 낭독기용 `.sr` 문장으로 단계 요약을 넣는다.
- 대상(예): Variable, Function, Return, Conditional, Loop, Async/Await, Promise, Callback, Closure, Pure Function, Debugging, Arrow Function, Library vs Framework 비교.

### 3.2 `mem()` — 메모리 상자 모형 (새로)

- 이름표(변수)와 상자(값)를 화살표로 잇는다. 스택 칸과 힙 칸을 나눌 수 있다.
- 같은 상자를 가리키는 화살표 두 개로 "참조 공유"를 보여 준다. 연결이 끊긴 상자는 흐리게(GC 대상).
- 입력 검사: 화살표가 없는 상자 이름을 가리키면 오류를 던진다. `.sr` 문장 포함.
- 대상: Stack vs Heap, Garbage Collection, Immutability, Object(참조), Class·Instance.

### 3.3 글자상자 23장 다시 그리기

| 카드 | 새 그림 |
|---|---|
| Frontend · Backend · Full Stack | `net` |
| Compile · Build · Run · Package | `term` |
| Library · Framework | `ide` 비교 |
| Semantic Versioning | `addr`(`1.4.2`, 숫자는 예시) |
| Algorithm · Rubber Duck Debugging | `flow` |
| Big-O | 걸음 수 막대(숫자는 예시라고 표시) |
| Callback · Return · Debugging | `ide` |
| Class | `ide` + `mem` |
| Technical Debt · MVP | `track` |
| Programming Language · Design Pattern · Legacy Code · Open Source | `vs` 또는 `doc`(계획서에서 카드마다 정함) |

공통 규칙(DESIGN.md): 그림 글자 11px 이상, 그림 속 숫자는 예시 표시, 320/375/1280 세 폭에서 넘침 없음.

## 4. 데이터와 배치

- `CAT('basics', …)`([index.html:1626](../../../index.html))의 추가 하위항목 배열에 `['principle','좋은 코드 원칙','…']`을 `code` 뒤에 넣는다. 공통 `tip`(추천 개념)은 마지막에 그대로 둔다.
- 카드 형식 `{en,ko,d,x,p,r,l,o,u,v}` 그대로. o:1은 1차 출처가 있을 때만, 그때 u를 단다.
- r은 이미 있는 같은 뜻·짝 카드에만 단다. 이번 연결 후보: IDE↔Code Editor, Package Manager↔npm·Package, Magic Number↔Hardcoding, Async/Await·Promise↔Asynchronous·Callback, Thread↔Main Thread(perf), Garbage Collection↔Memory Leak(perf), Try-Catch 대신 back의 try-catch.
- 점검 기대값: `COUNT`에 `basics/*` 7개, `EXPECT`에 새 카드 영문명, `REDRAWN`에 basics 하위항목(글자상자 0장).

## 5. 용어 목록 (새 50장)

`▶` = 직접 조작. 측정: 아래 영문명은 기존 카드 영문명과 겹치지 않는다(소문자 부분 일치로 대조, 2026-11-02). 겹쳐서 뺀 것: Try-Catch(back에 있음), Null·Undefined(db NULL, bug undefined에 있음).

| 하위항목 | 새 카드 |
|---|---|
| basic (5) | Software, Operating System, Bit·Byte, Binary, Script |
| core (5) | IDE, Linter, Formatter, Package Manager, Snippet |
| motion (7) | Interpreter, Runtime, Promise, Async/Await▶, Event Loop, Thread, Garbage Collection |
| code (12) | Syntax, Operator, Expression, Method, Property, Module, Import, Indentation, Arrow Function, Key-Value, Truthy·Falsy, Template Literal |
| adv (11) | OOP, Abstraction, Encapsulation, Inheritance, Interface, Functional Programming, Pure Function, Immutability▶, Closure, Higher-order Function, Stack vs Heap |
| principle (10) | DRY, KISS, YAGNI, Separation of Concerns, Single Responsibility, Coupling·Cohesion, Naming Convention, Magic Number, Code Smell, Clean Code |

기존 카드 중 직접 조작: Loop▶, Conditional▶.

뜻이 가까워 x로 구분할 짝: IDE vs Code Editor, Package Manager vs npm, Interpreter vs Compile, Runtime vs Run, Method vs Function, Property vs Variable, Module vs Package, Expression vs Statement(x 안에서만), Magic Number vs Hardcoding.

## 6. 증상 색인 (10~15개)

후보(이름과 연결 카드는 계획서에서 기존 증상과 겹침 확인 후 확정):

| 증상 | 연결 카드 |
|---|---|
| await를 썼는데 기다리지 않아요 | Async/Await, Promise |
| 배열을 바꿨는데 다른 변수도 같이 바뀌었어요 | Immutability, Object, Stack vs Heap |
| 반복이 한 번 더(덜) 돌아요 | Loop, Off-by-one Error |
| 함수 결과가 undefined로 나와요 | Return, Function |
| 같은 코드를 여러 군데 고쳐야 해요 | DRY, Function |
| 숫자 하나가 무슨 뜻인지 모르겠어요 | Magic Number, Constant |
| 사람마다 코드 모양이 달라요 | Formatter, Linter, Indentation |
| 한 곳 고치면 다른 곳이 깨져요 | Coupling·Cohesion, Separation of Concerns |
| 파일 하나가 너무 길어요 | Single Responsibility, Module, Code Smell |
| 무거운 작업 중 화면이 멈춰요 | Event Loop, Thread |
| 패키지 설치 뒤 버전이 안 맞아요 | Package Manager, Semantic Versioning, Dependency |
| import 했는데 못 찾는대요 | Import, Module |

## 7. 진행 순서

1. `ide()`·`mem()` 도우미와 입력 검사 점검
2. `principle` 하위항목과 점검 기대값
3. 하위항목별 새 카드(큰 하위항목은 나눔)
4. 글자상자 23장 다시 그리기
5. 기존 49장 x 채움과 기존 그림 30장 점검
6. 직접 조작 4장
7. 증상 색인
8. 글꼴·문서(PRODUCT/PLAN/DESIGN)·전체 점검

디렉터 검토: ① 이 설계서 ② 계획서 ③ 구현 묶음(도우미 / 카드 / 그림·문구)마다. Critical·Important는 RED→GREEN으로 고치고, Minor는 기록했다가 마지막에 보고한다.

## 8. 점검과 완료 기준

- `node tests/check.mjs` 전부 통과, `LATER` 비어 있음.
- 개발 기본 글자상자 0장(`REDRAWN`).
- 개발 기본 모든 카드에 x 있음(새 점검), o:1이면 u 있음.
- `ide()`·`mem()` 잘못된 입력에 오류(새 점검).
- 브라우저(playwright) 320/375/1280 세 폭과 reduced-motion에서 넘침 0, 11px 미만 글자 0, 콘솔 오류 0. 직접 조작 4장은 키보드로 조작 확인.
- 정의·설명의 사실은 Task마다 검색으로 확인(MDN, 공식 문서)하고 출처를 원장에 남긴다.

## 9. 글꼴

새 문구가 Hahmlet 서브셋에 없는 글자를 쓰면 font 점검이 실패한다. 주석에 쓴 글자도 포함된다. 문구를 모두 넣은 뒤(7장 8단계) 서브셋을 다시 만들고, 중간 Task에서는 없는 글자를 피하거나 그 Task 안에서 서브셋을 갱신한다.

## 10. 위험

| 위험 | 대응 |
|---|---|
| 작업량이 커서 컨텍스트가 압축됨 | 원장(`.superpowers/sdd/…/progress.md`), 체크포인트 메모리, Task마다 커밋 |
| index.html이 커짐 | 품질 우선(PLAN.md). 도우미를 재사용해 반복 HTML을 줄인다 |
| Promise·Event Loop·Closure처럼 틀리기 쉬운 설명 | MDN·공식 문서로 확인, 디렉터 검토 ③에서 사실 점검 |
| `ide()` 애니메이션이 카드마다 달라 보임 | 단계 형식 하나로 고정, reduced-motion still 공통 |
| 기존 r 연결이 다른 카테고리 카드를 가리킴 | r 값만 추가하고 그 카드 본문은 바꾸지 않음 |
