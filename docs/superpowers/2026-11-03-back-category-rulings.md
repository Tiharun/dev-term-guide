# 백엔드 보강 판정 기록(Ruling)

브랜치 back-category(fb1357c..)에서 작성자가 내린 결정과 틀렸을 때 비용. 계획서 ①·② 원장에서 옮김.

## 계획서 ①
- Task 1: Ruling: httpmsg 줄 한도 30자(Content-Type: application/json이 30자) — 계획대로 — 틀리면 긴 헤더 줄이 320px에서 두 줄로 꺾임(읽기는 됨)
- Task 1: Ruling: seq 세로줄 4개면 이름 6자까지(도우미가 막음) — 320px에서 4×8자 이름이 글자 중간에서 꺾임, 실제 4줄 그림은 앱·BFF·글·회원뿐 — 틀리면 4줄에 긴 이름이 필요할 때 줄여 써야 함
- Task 1: Ruling: .mk-sd 안쪽 여백 4px·이름 칸 11px·word-break:keep-all — 320px 폭 확보, 11px 하한 유지 — 틀리면 머리 칸이 조금 빽빽해 보임
- Task 1: Ruling: 새 점검 bkpad 추가 — 검토 A Minor 4를 막는 점검, 계획 이름 목록 밖 — 틀리면 점검 이름 하나 더 있음
- Task 3: Ruling: 카드 u에 RFC() 대신 주소를 그대로 씀 — RFC 도우미가 back 카드보다 뒤에 정의돼 ReferenceError — 틀려도 주소 글자만 다름
- Task 3: Ruling: 전용 그림 꼬리표는 기존 .mk-dtw 재사용, 새 CSS는 mk-bkg·mk-bks·mk-bkr·mk-bkp — 토큰만 쓰는 기존 꼬리표와 모양 통일 — 틀려도 클래스 이름만 바꾸면 됨
- 검토 B: Ruling: back 글 점검 bktext·bkxn(front ftext·fxn과 같은 식) — 걸린 옛 카드 6장은 미루지 않고 글을 고침 — 틀리면 문구 6곳 되돌림
- 검토 B: Ruling: Cursor vs Offset 출처는 slack.engineering 유지 — 둘을 직접 비교한 1차 경험 글, 공식 명세가 없는 설계 주제 — 틀리면 u 한 줄 교체
- 검토 B: Ruling: 그림 도우미 이름을 bkStack·bkBox·bkRows·bkPills로(check.mjs BKS()와 헷갈림 방지) — 틀리면 이름 4개
- Task 4: Ruling: 검토 B 수정 커밋이 Task 4 시작 뒤에 들어가 task-done BASE를 b4f0303으로 둠 — 두 범위가 섞이지 않게 — 틀리면 검토 범위 표시만 다름
- Task 4: Ruling: 도우미 bkStack 등을 새 상태 함수 앞으로 옮김(정의 전 사용 오류) — 틀리면 위치만
- Task 4: Ruling: Client 그림의 300px 브라우저가 375·320에서 넘쳐 .mk-bkg>.mk-browser{max-width:100%} 추가 — 틀리면 CSS 한 줄
- Task 5: Ruling: bcache miss 문구 '다녀옴'→'갔다 옴' — '녀'가 글꼴 서브셋에 없음 — 틀리면 문구 두 곳만 되돌림
- 검토 C: Ruling: 세로줄 이름은 seq 폭 규칙(한글 2폭, 8 이하) 안에서 바꿈(CORS '타 서버', Session '보관소', '허용 헤더 없음') — 제안 문구는 규칙 초과 — 틀리면 문구만 교체
- 검토 C: Ruling: OAuth 세로줄 '로그인' 유지 — '로그인 서비스'·'인가 서버'는 폭 초과, cap이 인가 코드 방식임을 밝힘 — 틀리면 seq 폭 규칙을 바꿔야 함
- 검토 C: Ruling: BRL을 카드 p에 맞춰 1분에 5번으로, 그림 brate(6) — 계획서 ②가 초기화 버튼을 둔다 — 틀리면 BRL 두 값만 되돌림

## 계획서 ②·디렉터·최종 검토
- Task 1: Ruling: 새 카드 u에 RFC(n) 대신 주소 문자열 — RFC 도우미가 back 카드보다 뒤에 정의 — 틀려도 링크는 같음
- Task 1: Ruling: Cookie vs Token 꼬리표를 '쿠키: 브라우저가 붙여요'·'토큰: 코드가 붙여요'로 줄임 — mk-dtw nowrap이 320px에서 칸 밖으로 나감, HttpOnly는 cap·x에 남음 — 틀려도 글 한 줄
- 검토 D: Ruling: Streaming Response u는 MDN Streams_API 유지 — 개념 정의 출처로 충분, 서버 쪽 예시는 x가 설명 — 틀리면 u 한 줄 교체
- Task 3: Ruling: 한 번 누르는 동작 버튼에는 data-k·aria-pressed를 달지 않음 — 토글이 아니라 pressed 상태가 없음 — 틀리면 속성 한 줄 추가
- Task 3: Ruling: Authorization 그림의 '역할: 일반 회원(예시)' 제목 줄을 뺌 — 역할은 위 고르기 버튼이 보여 줌 — 틀리면 제목 줄 복원
- 검토 E: Ruling: Idempotent 버튼 '다시 보내기'를 '요청 보내기'로 — 0번일 때 '다시'가 어색 — 틀리면 글자 하나 되돌림
- 검토 E: Ruling: bidem 머리글에 주소(POST /posts·PUT /posts/7)를 넣음 — '7번 글'의 이유가 보이게 — 틀리면 머리글 원복
- 검토 E: Ruling: Cache 비우기 때 whelp '지금 캐시는 비어 있어요'를 붙이고 다음 보내기에서 지움 — 비운 직후 혼란 방지 — 틀리면 한 줄 제거
- 검토 E: Ruling: 범위 밖 점검 fpre 정규식이 글꼴 base64에서 97초 걸려 base64를 비운 문자열에서 찾게 고침(전체 0.6초) — 돌연변이로 여전히 FAIL 확인 — 틀리면 정규식 원복
- Task 4: Ruling: 407bd0d에 Task 4 점검이 함께 커밋됨 — 이력만 섞였고 내용은 같음 — 틀리면 이력 정리만 필요
- Task 5: Ruling: DESIGN.md는 고치지 않음 — seq·httpmsg 규칙이 260~261줄에 이미 있음 — 틀리면 문구 한 줄 추가
- Final: Ruling: Session Store p·x의 Redis 유지 — 스펙의 브랜드 금지는 회사 서비스 이름 대상, Redis는 사전 카드가 있고 r로 잇는 용어 — 틀리면 p 한 줄·x 한 구절 교체
- Final: Ruling: 최종 검토가 재측정하지 않은 항목(브라우저, 캐시 안내 줄, 글꼴, x 문장 순서, 옛 p 숫자)은 앞 측정·검토 판정을 따름 — 스펙 3.3은 그림 속 숫자만 (예시) 대상 — 틀리면 해당 항목 재측정
