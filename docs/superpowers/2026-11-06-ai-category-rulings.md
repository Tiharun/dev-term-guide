# AI 카테고리 판정 기록 (2026-11-06)

가지 `ai-category`. 새 40장(model, technique, feature, risk), 옛 49장 다시 쓰기, 새 칩 AI(증상 12개). 디렉터(Opus High) 검토 1회.
문서 기준일은 2026-11-06이고, 제품 동작은 이날 공식 문서가 기준이다.

## 메인이 직접 대조한 지적

문서를 `curl`로 받아 원문을 확인했다(측정).

| 지적 | 근거 | 처리 |
|---|---|---|
| C1 AI Code Review의 "승인 단계가 남아 있어요" | code-review-local: 편집은 권한 모드를 따르고, 뒤에서 돈 `--fix`는 체크포인트 밖. permission-modes: v2.1.283 이상은 auto로 시작 | 고침 |
| I1 되돌리기 카드 3장에 서브에이전트 한계 누락 | checkpointing "Subagent edits not restored", sub-agents: 기본이 background | 고침 |
| I2 Permission Mode 기본 모드 오해 | permission-modes: auto가 기본 시작, Manual의 설정값이 `default`, dontAsk는 순환에 없음, bypassPermissions는 격리 환경만 | 고침, 그림에 auto 추가 |
| I3 Temperature 0이어도 같아지지 않음 | glossary "Even with temperature set to 0" | 고침, u를 glossary로 |
| I4 증상 '토큰이 너무 빨리 줄어요'의 Prompt Caching 연결 | Claude Code prompt-caching "manages prompt caching automatically", costs "Delegate verbose operations to subagents" | 칩을 Token, Session Hygiene, Subagent로 |
| I5 XML Tags "같은 이름의 태그" | best-practices "each type of content in its own tag" | 고침 |
| M1 Context Rot | context-windows "a phenomenon known as context rot" | o:1, u 추가, 문장을 Claude 문서 기준으로 |

## 그대로 받은 지적

I6(Slopsquatting 단정 제거, r에 Typosquatting), I7(비문 3건), M2, M3, M6, M7(ko를 서브에이전트로). I6과 M3은 근거를 찾지 못한 단정을 빼는 수정이다.

## 제안과 다르게 고친 것

- I2: 제안은 4문장이 되어 3문장으로 줄였다. "허용 규칙"과 "Auto Mode는 그중 하나" 문장을 빼고 Shift+Tab(터미널)을 남겼다.
- C1: 제안의 두 문장을 한 문장으로 합쳤다(x는 3문장까지).
- I6: 제안의 뒤 두 문장을 한 문장으로 합쳤다.
- M8: 캡션을 더하는 대신 표 머리글을 '조각'에서 '자른 예'로 바꿨다.
- M4 Overconfidence와 같은 기준으로 Explain first도 o:0으로 내렸다. 문서가 뒷받침하는 것이 곁가지 문장뿐이어서다.

## 안 고친 것

- M5 Step-by-step: o:0 유지. 제안은 o:1이지만 문서가 뒷받침하는 것은 Esc 문장뿐이다. "(2026-11 공식 문서 기준)"은 그 문장의 날짜 표시로 둔다.
- System Prompt: o:1 유지. u(memory)는 둘째, 셋째 문장("delivered as a user message", "no guarantee of strict compliance")을 뒷받침하고, 첫 문장의 일반 뜻풀이는 뒷받침하지 않는다.

## 추정이 섞인 글

- Prompt Caching "Claude Code는 알아서 써요": 문서 문장의 요약이다.
- Temperature의 오류 문장 근거는 u(glossary)가 아니라 Sonnet 5.5 migration guide다. 날짜 표시를 남겼다.
- Guardrail "어떤 장치도 완벽히 막는다고 보면 안 되어서": 문서의 같은 문장은 없고, 최소 권한을 함께 쓰라는 설명에서 끌어낸 일반 주의다.
- Overconfidence와 Hallucination의 구분은 작성자 설명이다.

## 브라우저로 확인한 것

Vibe Coding의 사전 풀이: curl은 403이었다. Merriam-Webster 두 항목을 브라우저로 열어 slang 항목(코드 동작을 이해하지 않아도 됨)과 사전 항목(AI로 코드를 만드는 일)의 풀이가 다름을 확인했고, 문장을 그에 맞췄다. 카드 근거 주소로는 쓰지 않았다(o:0).

## 확인되지 않음

- Slopsquatting: Seth Larson이 지었다는 말은 Infosecurity 기사가 Socket을 인용한 수준이고 원 글은 찾지 못했다("알려져 있고"로 씀). 실제 공격 사례 유무는 벤더 글뿐이라 판정하지 않았다.
- Vibe Coding: Karpathy의 X 글 원문은 열지 못했다.
- Context Rot의 Chroma 보고서: 초안 작성 때 연 내용이고 디렉터 대조는 없다.
- Fine-tuning: 지금 Claude에서 제공하는 범위는 찾지 못했다(o:0, "쓰는 곳의 문서로 확인").
- Prompt Template: 공식 쓰임을 찾지 못해 o:0.
- Context Engineering: context-windows 페이지 범위로 o:1이고, 뜻을 정의한 문서는 없다.
- Step-by-step, Describe Motion, Reference Animation, Before / After: 공식 문서가 없어 o:0.
- Slash Command: 공식 낱말은 commands이고 이 이름의 정의는 찾지 못했다.
- `/tasks` 별칭, Auto Mode 분류기가 막는 전체 목록, 인용 기능의 Claude Code 동작.
- 끝까지 읽지 못한 문서: prompt-caching 뒤쪽 약 64000자, sub-agents 뒤 16000자, skills 뒤 19000자, Eval 문서 뒤 52950자(초안 단계).
- MCP 주소 `modelcontextprotocol.io/docs/getting-started/intro`는 버전이 없어 내용이 바뀔 수 있다.
