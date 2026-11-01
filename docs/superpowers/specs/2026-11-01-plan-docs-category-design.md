# 기획·문서 카테고리 (② 새 카테고리 5/5) 설계

- 날짜: 2026-11-01
- 관련 문서: [PLAN.md](../../PLAN.md), [GLOSSARY.md](../../../GLOSSARY.md), [DESIGN.md](../../../DESIGN.md), 모바일 설계 [2026-11-01-mobile-category-design.md](2026-11-01-mobile-category-design.md)
- ② 새 카테고리는 카테고리마다 명세 → 계획 → 구현 → main 병합을 한 바퀴씩 진행한다. 완료: 터미널·명령줄, 네트워크, 테스트, 모바일 앱. 이 문서는 마지막 다섯 번째다.

## 1. 목적과 성공 기준

초보자가 "요구사항 정리해 줘", "회의록 써 줘", "이번 범위 밖이야" 같은 말을 **문서가 채워지고 흐름도를 따라 점이 움직이는 그림으로 바로 이해**하고, 예문을 복사해 Claude에게 정확히 지시하게 한다.

성공 기준:
- `AI` 앞에 `기획 · 문서` 카테고리가 생기고, 하위항목 6개에 카드 71개가 들어간다.
- 모든 카드가 도판 형식이고, 문서가 나오는 카드는 공용 문서 모형 `doc()`, 흐름을 그리는 카드는 공용 흐름도 모형 `flow()`로 그린다.
- 기존 카드는 옮기지 않는다. 겹치는 개념은 관련 용어로만 잇는다(4.7).
- 7장 점검을 모두 통과한다.

## 2. 범위

포함: 새 카테고리와 하위항목, 카드 71개, 공용 모형 `doc()`·`flow()`, 직접 조작 카드 4개, 비유 그림 2개, 증상 색인 10개, 글꼴 서브셋 갱신, PRODUCT.md·PLAN.md·DESIGN.md 개수·한도 표기 갱신, 점검 스크립트 확장(문서 개수 자동 점검 포함).

다루는 영역(사용자 선택): 기획 과정·요구사항, 일하는 방식·협업, 문서 쓰는 법, 검토·결정 기록. 고정 항목: 문서 종류(추가 하위항목), 화면 흐름 기획(모션용어 및 연출 자리).

제외: 기존 카테고리 보강·그림 재제작(③), 기존 카드 이동, 특정 도구(Jira·Notion 등)의 사용법, 회사마다 다른 문서 양식을 하나로 정하기.

## 3. 배치

- `CAT('plan','기획 · 문서','무엇을 만들지 정하고 글로 남기는 말', [['docs','문서 종류','자주 쓰는 문서의 이름과 쓰임']])`을 `CAT('ai', …)`([index.html:1613](../../../index.html)) 바로 앞에 넣는다. 새 카테고리가 17번, AI가 18번이 된다. 번호(`c.no`)와 도판 번호는 화면 표시에만 쓰이고 저장되지 않는다(터미널 설계 3장에서 측정).
- 하위항목: 공통 기본·필수·모션용어 및 연출·심화 + 추가 `docs` 문서 종류 + 공통 추천 개념.
- 모션용어 및 연출은 이름을 바꾸지 않고 "화면 흐름 기획" 용어로 채운다(PLAN.md 13행).

## 4. 용어 목록 (71개)

`▶` = 직접 조작, `◎` = 비유 그림 곁들임. 한글명은 `한글 · 풀이` 형식으로 구현 때 정한다. 측정: 아래 영문명은 기존 1,257개와 겹치지 않는다(소문자 비교). 그림 키 `u-<slug>`도 구현 때 `v` 점검으로 겹침을 확인한다.

### 4.1 기본 (11)
Planning, Requirement, Feature, User Story, Priority, Deadline, Stakeholder, Draft, Meeting, Owner, Goal

### 4.2 필수 (14)
Backlog, Roadmap, Milestone, Sprint, Agile, Ticket, Estimate, Retrospective, Daily Stand-up, Definition of Done▶, Markdown▶, Template, Review Request, Approval

### 4.3 모션용어 및 연출 = 화면 흐름 기획 (12)
Screen Flow, Flowchart, Storyboard, Wireflow, Screen List, Decision Point▶, Happy Path, Exception Flow, Task Flow, User Journey Map, State Diagram, Swimlane Diagram

### 4.4 심화 (12)
ADR, RFC, Functional vs Non-functional Requirement, Traceability, Scope Creep▶, Trade-off◎, Assumption, Risk Register, Change Request, Single Source of Truth◎, Docs as Code, Mermaid

### 4.5 문서 종류 (14)
PRD, Functional Specification, Screen Design Document(화면 설계서), Technical Design Document, Meeting Minutes, Project Proposal, WBS, Test Plan, User Manual, Runbook, FAQ, Glossary, One-pager, Gantt Chart

### 4.6 추천 개념 (8)
TL;DR, Action Item, 5 Whys, Out of Scope, Decision Log, Write for the Reader, Keep Docs Updated, Show with Example

### 4.7 겹치는 카드 처리 (측정: 기존 영문명과 위치 대조, 모두 그대로 두고 연결만)

| 이미 있는 카드 | 새 카드에서 연결 |
|---|---|
| Spec·MVP·Edge Case·Pseudocode(기본/추천) | Requirement, PRD, Functional Specification, Exception Flow |
| Plan First·Scope·Acceptance Criteria·Specific Request·Constraint·Feedback(AI/필수) | Planning, Out of Scope, Definition of Done, Requirement, Review Request |
| CLAUDE.md(AI/심화), One Task per Request·Glossary Habit(AI/추천) | Docs as Code, Single Source of Truth, Glossary, Ticket |
| Wireframe·Mockup·Prototype·User Flow·Design Spec·Style Guide(디자인/필수) | Screen Flow, Wireflow, Storyboard, Screen Design Document, Template |
| Information Architecture(디자인/심화), Design Review·Draft Design(디자인/추천) | Screen List, Review Request, Draft |
| Kanban Board(디자인/데이터 표시), Version History(디자인/도구), Table of Contents(디자인/내비) | Backlog, Sprint, Change Request, User Manual |
| Sitemap(웹/심화) | Screen List |
| Issue·README·Changelog(Git/추천), Code Review(Git/필수) | Ticket, User Manual, Decision Log, Review Request |
| Release Notes(배포/모션), Postmortem(배포/심화) | Change Request, Retrospective, 5 Whys |
| API Documentation(백엔드) | Technical Design Document |
| Dependency(기본/필수) | WBS, Gantt Chart |
| Data Flow(데이터베이스/모션)·Login Flow(보안/모션) | Flowchart, Screen Flow |
| Test Case(테스트/기본) | Test Plan |

### 4.8 사실 확인 원칙
- 공식 1차 출처가 있는 것만 `o:1`, `u`에 주소, 본문에 "(2026-11 확인)"을 적는다. 구현 때 확인할 출처 후보(추측, 미확인): Scrum Guide(Sprint·Retrospective·Definition of Done·Backlog, 원문 이름은 Daily Scrum이라 Daily Stand-up 카드에 그 차이를 적음), Agile Manifesto, Mermaid 공식 문서, GitHub Docs의 Markdown 문법. ADR·RFC는 1차 출처가 있는지 먼저 확인한다(IETF RFC는 뜻이 달라 구분 안내).
- 회사마다 뜻이 다른 말(화면 설계서, PRD, One-pager, 기능 명세서 등)은 `o:0`으로 두고 "흔히 이렇게 써요"로 적는다.
- 확인하지 못한 값(기간·인원 같은 숫자 규칙)은 단정하지 않고 넣지 않는다.

## 5. 그림 구조

- **공용 모형 `doc(blocks, opt)`**: `app()`·`track()`([index.html:3450](../../../index.html)~3463) 옆에 추가한다. CSS 접두어는 `mk-dc`(측정: 쓰이지 않음).
  - 종이 문서 틀(위에 파일 이름 띠 `opt.title`) 안에 블록을 위에서부터 쌓는다. 블록 종류: 제목 `{h}`, 문단 `{p}`, 목록 `{ul:[…]}`, 표 `{tb:[[머리…],[값…]…]}`(첫 줄이 머리), 체크 목록 `{ck:[[글, 참/거짓]…]}`.
  - 재생: 다른 모형과 같은 구조(주기 10초, 블록이 하나씩 나타남, 멈춘 장면은 모든 블록이 보이는 마지막 장면, 보일 때만 재생, 다시 재생 가능). `opt.still`이면 처음부터 모두 보이고 움직이지 않는다. 동작 줄이기 설정이면 멈춘 마지막 장면 + 재생 버튼.
  - `opt.hl`은 강조할 블록 번호(0부터)이고 기존 `mk-hl` 테두리를 붙인다.
  - 접근성: 문서 내용은 실제 글자로 남기고, 그림 전체는 `opt.label`로 요약한다.
  - 블록 7개 이상이면 오류를 던진다(`app()`의 장면 제한과 같은 방식).
- **공용 모형 `flow(rows, opt)`**: 위에서 아래로 내려가는 흐름도. CSS 접두어는 `mk-fw`(측정: 쓰이지 않음, `mk-fl`은 이미 쓰임).
  - 줄 `rows`는 1~5줄, 줄마다 칸 1~2개. 칸 `{t 글, k 'box'|'q'|'end', e 들어오는 선의 이름(선택, 예: '예'·'아니오')}`. `box`는 단계(사각형), `q`는 질문(마름모), `end`는 끝(둥근 칸). 칸이 2개인 줄은 바로 위 `q`에서 갈라진다.
  - `opt.path`는 줄마다 점이 지나갈 칸 번호 배열(기본 모두 0). 점이 그 경로를 따라 내려가고, 멈춘 장면은 점이 마지막 칸에 있다. 지나는 칸은 기호(●)와 테두리로 함께 표시한다(색만으로 구분하지 않음).
  - 6줄 이상이거나 한 줄에 칸 3개 이상이면 오류를 던진다. 375px 휴대폰·320px 그림판에서 가로 넘침 없이 들어가야 한다(긴 글은 칸 안에서 줄바꿈).
  - 재생·`still`·동작 줄이기·`label` 규칙은 `doc()`과 같다.
- **기존 모형 재사용**: 일정·단계(Roadmap·Milestone·Sprint 등)는 `track()`, 할 일 판(Backlog·Ticket)은 칸반 데이터 `KAN`([index.html:3888](../../../index.html))과 같은 모양, 두 칸 비교는 `MDUO`, 대화·요청 예시는 `term()`·`browser()`.
- **직접 조작 4장**(`init`, 버튼은 포커스 가능하고 키보드로도 누름, 결과 문장은 `aria-live`, 동작 줄이기 설정이면 움직임 없이 결과만 바뀜):
  - Decision Point: `flow()` 질문 칸 "로그인했나요?"에서 '예'·'아니오' 버튼으로 점의 길이 바뀐다(예 → 장바구니, 아니오 → 로그인 화면). 결과 문장: 어느 길로 갔는지.
  - Scope Creep: 할 일 목록 3개와 마감일. '요청 하나 더'를 누를 때마다 목록이 하나 늘고 마감이 하루 밀린다. 4번 누르면 버튼이 꺼지고 "범위를 다시 정해야 해요" 안내. '처음으로' 버튼으로 되돌린다.
  - Definition of Done: 체크 목록 4개(실제 `input type="checkbox"`)와 '완료로 옮기기' 버튼. 다 체크하지 않으면 "아직 N개 남았어요", 다 체크하면 '완료' 칸으로 옮겨진다.
  - Markdown: '쓴 글'·'보이는 모습' 두 버튼(`aria-pressed`)으로 원문(`# 회의록`, `- 할 일` 같은 기호)과 `doc()`으로 그린 결과를 바꿔 보인다.
- **비유 그림**: Trade-off(저울: 한쪽 "빨리"를 올리면 다른 쪽 "꼼꼼히"가 내려감), Single Source of Truth(원본 문서 하나에서 복사본들이 화살표로 원본을 가리킴, 원본이 여러 개면 내용이 서로 다름). 모형 옆에 화살표로 잇는다(`pair()`).
- **흐름이 없는 카드**: Functional vs Non-functional Requirement는 두 칸 비교(`MDUO`), Gantt Chart는 전용 정적 그림(가로 막대 일정표, 접두어 `mk-pl`, 측정: 쓰이지 않음), 나머지 문서 종류는 `doc()`으로 그 문서의 대표 모양을 그린다.

## 6. 데이터

- 카드 id는 `plan-slug(영문명)`. 옮기는 카드가 없어 `MOVED`([index.html:3161](../../../index.html))는 바꾸지 않는다.
- 4.7의 연결은 새 카드의 `r`에 기존 영문명을 적어 만든다. 기존 카드의 `r`은 이번 범위에서 고치지 않는다. 뜻이 다른 이름(IETF RFC 등)은 연결하지 않는다(모바일 최종 검토 교훈).
- 증상 색인 10개(묶음은 기존 `SYMPTOM_GROUPS`, [index.html:1580](../../../index.html), 새 묶음 없음):

| 묶음 | 증상 | 용어 |
|---|---|---|
| 느림 | 일정이 자꾸 밀려요 | Estimate |
| 느림 | 할 일이 계속 늘어나요 | Scope Creep |
| 크기·화면 | 화면이 몇 개 필요한지 몰라요 | Screen List |
| 오류·안 됨 | 만든 게 원한 것과 달라요 | Requirement |
| 오류·안 됨 | Claude가 원하지 않은 기능까지 만들어요 | Out of Scope |
| 오류·안 됨 | 어디까지 하면 끝인지 몰라요 | Definition of Done |
| 오류·안 됨 | 오류 날 때 화면을 안 정했어요 | Exception Flow |
| 오류·안 됨 | 왜 이렇게 만들었는지 기억이 안 나요 | ADR |
| 오류·안 됨 | 같은 내용 문서가 여러 개라 뭐가 맞는지 몰라요 | Single Source of Truth |
| 오류·안 됨 | 회의 뒤 누가 할지 안 정해졌어요 | Action Item |

## 7. 점검과 완료 기준

자동 점검 `tests/check.mjs`(키 형식 `'카테고리/하위항목'`):
- 기획 하위항목별 기대 카드·개수, 전체 1,328개(1,257 + 71, `total`), 증상 145개(135 + 10, `symcount`), 모든 카드에 그림, 영문명 중복 없음, 관련 용어·증상 대상 존재.
- 기획 카드는 모두 도판 형식(`u-` 그림 키, 기존 `nv`·`tv`·`mv`와 같은 방식).
- `doc()`: 멈춘 장면에 모든 블록이 보이는지, `hl` 블록에 `mk-hl`이 붙는지, 블록 7개면 오류.
- `flow()`: 멈춘 장면에서 점이 경로의 마지막 칸에 있는지, 갈라진 줄의 선 이름(`e`)이 글자로 있는지, 6줄·한 줄 3칸이면 오류.
- 직접 조작 4장: `init`이 있고 결과 문장에 `aria-live`(기존 `live` 점검), 5장 직접 조작에 적은 버튼 이름이 그림에 있는지.
- 재생 버튼이 붙는 기획 그림(`m:1`)에 움직이는 요소가 있는지(`tm`과 같은 방식).
- 다른 카테고리 개수는 그대로인지(옮긴 카드 없음).
- **문서 개수 자동 점검(새로 추가)**: PRODUCT.md에 `카테고리 N개`·`용어 N개`·`증상 색인 N개`가 실제 `CATS`·`TERMS`·`SYMPTOMS` 수와 같은지, docs/PLAN.md의 `"오류·안 됨" 칩 N개`가 실제 그 묶음 증상 수와 같은지. 측정: DESIGN.md에는 개수 표기가 없어 점검하지 않는다(모형 한도만 적음).

브라우저 확인(Playwright, 로컬 서버):
- PC 1280px, 휴대폰 375px, 좁은 그림판 320px. 가로 넘침 없음, 긴 문서 글·긴 흐름도 칸 글은 그림 안에서 줄바꿈.
- 직접 조작 4장을 마우스·키보드로 조작하고 결과 문장 확인(Decision Point 두 길, Scope Creep 4번 뒤 꺼짐·되돌리기, Definition of Done 남은 개수·완료, Markdown 전환).
- 동작 줄이기 설정에서 자동 재생 안 됨, 재생 버튼 동작.
- AI 카테고리 번호가 밀린 뒤 기존 카드 주소(`#/t/ai-...`)가 그대로 열림.
- 콘솔 오류 0(favicon 404 제외).

디자인 품질: impeccable audit, break-ui(`doc()` 블록 6개·긴 표, `flow()` 5줄·두 갈래·긴 칸 글), 필요하면 interfaces 계열 스킬로 다듬기.

완료 기준: 위 점검 통과, 커밋 후 main 병합(사용자 확인 후).

## 8. 진행 순서

하위항목 하나 = 작업 단위 하나. 단위마다 자동 점검 + 브라우저 확인 후 커밋.

1. 기반: 카테고리 추가, `doc()`·`flow()`, 점검 스크립트 확장(문서 개수 점검 포함)
2. 기본 → 필수 → 모션(화면 흐름 기획) → 심화 → 문서 종류 → 추천 개념
3. 증상 색인 10개
4. Hahmlet 서브셋 다시 만들기, PRODUCT.md·PLAN.md 개수 갱신, DESIGN.md에 `doc()`·`flow()` 한도 기록

## 9. 글꼴

모바일 설계 9장과 같다. 서브셋 도구 `font_subset.py`와 원본 `fontsrc\Hahmlet.ttf`는 이전 세션 임시 폴더에 있다(구현 시작 때 존재를 다시 측정). 없어지면 GitHub(hyper-type/hahmlet, OFL)에서 다시 받아도 되는지 사용자에게 묻는다. 실행은 `python -P`로 한다(`-I`는 도구가 쓰는 모듈을 못 찾음, 측정).

## 10. 위험

- 기획 용어는 회사·팀마다 뜻이 다르다 → 공식 출처가 없는 말은 "흔히"로 적고 `o:0`. 한 가지 양식을 정답처럼 그리지 않는다.
- 문서 그림은 글자가 많아 좁은 화면에서 넘치기 쉽다 → 블록 6개 한도, 그림 속 글자 11px 이상, 넘치면 줄바꿈. 흐름도는 5줄·2갈래 한도.
- 디자인 카테고리(Wireframe·User Flow 등)와 그림이 비슷해질 수 있다 → 디자인 카드는 "화면 부품 모양", 기획 카드는 "무엇을 어떤 순서로 정하는지"에 초점을 둔다.
- 증상 색인 "오류·안 됨" 칩이 46개에서 53개로 늘어난다 → PLAN.md 남은 일(③에서 다시 보기)의 개수를 갱신하고, 문서 개수 점검으로 어긋남을 막는다.
- `index.html`이 계속 커진다(측정: 현재 1,484,324바이트). 파일 나누기는 범위 밖이며 PLAN의 "품질 우선" 결정을 따른다.
