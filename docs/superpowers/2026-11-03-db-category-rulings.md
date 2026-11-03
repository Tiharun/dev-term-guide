# 데이터베이스 보강 판정 기록(Ruling)

브랜치 db-category(4e2b1fa..)에서 작성자가 내린 결정과 틀렸을 때 비용. 계획서 ①·② 원장에서 옮김.

## 계획서 ①
- Ruling: 스펙 객체 v 41/문자열 7 → 측정 40/8 — 재측정값이 실제 — 틀리면 DB_TODO 한 줄
- Ruling: qrun 표 2개 hl 금지, Migration 상태 cap, LIKE products, Auto Increment id 3 — 계획서 ① 스펙 보충 — 틀리면 그림 한 장씩
- Task 1: Ruling: 320px에서 10폭 열 이름·칸은 칸 안에서 줄바꿈(가로 여백 4px, 넘침 0) — 스펙 57줄이 허용, 폭 한도 유지 — 틀리면 320px 가독성 낮음
- Task 1: Ruling: 도우미 안 강조 이름 함수 dbhn을 dbtab·qrun이 같이 씀(인터페이스 밖 이름 하나 추가) — sr 강조 이름을 두 곳에서 같게 — 틀리면 이름 하나 정리
- Review A: Ruling: tag ''는 막는 코드를 유지하고 계획서·브리프 문구를 "name·tag 모두 빈 글 금지"로 고침 — 빈 이름표는 뜻이 없음 — 틀리면 문구 한 줄
- Review A: Ruling: sr 형식을 "결과 n줄(열, 열): …"로 바꾸고 설계서 77줄 예와 Task 4 기대값(djoin·dwhere)을 같이 고침 — 낭독기가 열 이름을 알아야 Alias·집계 카드가 읽힘 — 틀리면 기대값 몇 줄
- Task 3: Ruling: BASE를 d3ebd40 대신 7dfbade로 — 검토 A 고침 커밋 2개가 Task 3 앞에 들어감 — 틀리면 review 범위 조정
- Task 3: Ruling: Cascade Delete fcss 줄 'user_id INT REFERENCES users'(28자)가 320px에서 접혀 'user_id INT'/'  REFERENCES users'/'  ON DELETE CASCADE' 세 줄로 나눔 — 같은 SQL, 읽기 쉬움 — 틀리면 한 줄 되돌림
- Task 3: Ruling: 브리프가 cap을 정하지 않은 8장(Aggregate·HAVING·DISTINCT·IN·Surrogate·Junction·Cascade·Denormalization)은 그림 내용을 그대로 말하는 cap으로 정함 — 브리프 공백 — 틀리면 문구만 고침
- Task 4: Ruling: 단계 목록·문구용 클래스 mk-dgp·mk-dgs가 없어 최소 CSS 4줄 새로 만듦(글꼴·테두리는 mk-dq·dbtab 토큰 그대로) — 브리프가 클래스만 이름 — 틀리면 CSS 4줄
- Task 4: Ruling: 브리프가 cap을 정하지 않은 14장(FK·Query·SQL·RDBMS·NoSQL·Relation·Index·Transaction·Backup·Data Flow·Join·Seed·Rollback·Sync)은 그림 내용을 그대로 말하는 cap으로 정함, Data Type doc 제목 '열과 타입' — 브리프 공백 — 틀리면 문구만
- Task 4: Ruling: 320px에서 3열 doc 표가 '가져오/기'·'created_/at'로 접혀 SQL 표는 2열+예 한 줄, 타입 표 created_at→birthday — 같은 뜻, 접힘 0 — 틀리면 표 2개 되돌림
- Task 5: Ruling: 브리프에 cap이 없는 14장(Redis·ERD·Supabase·SELECT·INSERT·DELETE·WHERE·ORDER BY·GROUP BY·LIMIT·Restore·Data Integrity·Spreadsheet vs DB·Personal Data)은 그림 내용을 그대로 말하는 cap으로 정함, Data Integrity doc 제목 '지키는 규칙' — 브리프 공백 — 틀리면 문구만
- Task 5: Ruling: SELECT·ORDER BY·GROUP BY·LIMIT의 after 표 이름은 '결과'(모양이 원래 표와 다름, 검토 B Subquery와 같은 판단), INSERT·UPDATE·Soft Delete는 같은 표라 원래 이름 — 틀리면 이름 4개
- Task 5: Ruling: Slow Query 로그 둘째 줄이 320px에서 가로 스크롤 → 'statement:'·'  SELECT * FROM orders' 두 줄로 나눔(PG 실제 로그는 한 줄 "LOG:  duration: … ms  statement: …") — 틀리면 한 줄로
- Task 5: Ruling: Data Integrity 3열 doc 표가 320px에서 칸마다 3줄로 접혀 2열 ['규칙','막는 예'](형식 price에 글자·빈 값 이름 없이 가입·연결 없는 회원 99의 주문)로 줄임 — Task 4 SQL 표와 같은 판단 — 틀리면 표 되돌림
- Task 5: Ruling: Supabase bkBox 배지 '강조'가 화면에 글자로 보여 '핵심'으로 — 독자에게 '강조'는 뜻 없는 말 — 틀리면 한 단어
- Task 5: Ruling: NULL 그림 지영 phone ''는 dbtab이 '빈 글자'로 보여 줌(브리프 그대로) — 틀리면 값 하나

## 계획서 ②·디렉터·최종 검토
- Task 1: Ruling: 브리프에 cap이 없는 ACID·Connection Pool·Connection String·Database Client에 cap을 새로 씀 — 다른 그림이 모두 cap을 가짐 — 틀리면 문구 4줄 고침
- Task 1: Ruling: Query Plan·Database Dump 터미널 긴 줄을 들여 써서 나눔, Dump는 prompt '$' — 320px 한 줄 25자 한도(측정), Slow Query 선례 — 틀리면 실제 pg_dump 줄 모양과 다르다는 지적
- Task 1: Ruling: Database Client 전용 CSS .mk-dg(480px 이하 세로 쌓기)를 .mk-dq 옆에 더함 — 브리프의 mk-dg가 아직 없었음 — 틀리면 CSS 한 줄
- Task 2: Ruling: 펼침 없이 x가 '헷갈림' 줄로 바로 보임 — 브리프 Step 6의 "펼쳐"는 섹션 화면 확인으로 대신, tx 포함 7섹션 320·375px 넘침 0·오류 0 — 틀리면 확인 범위만 좁음
- Task 3: Ruling: 겹침 단언을 "hint와 mobox가 위아래로 겹치지 않음"(어느 쪽이 위든)으로 봄 — 실제 배치는 hint가 위, 가장 긴 문장에서도 겹침 0 — 틀리면 배치 순서 단언만 더하면 됨
- Task 5: Ruling: break-ui의 토글(Demo/Worst) 단계 생략 — 그림 데이터가 고정이고 한도를 check.mjs가 강제해 최댓값 그림을 320px에서 재는 것으로 대신 — 틀리면 새 한도 데이터가 들어올 때 다시 재야 함
- Task 5: Ruling: 320px에서 제목 Denormalization이 단어 중간에서 줄바꿈됨 — 사이트 공통 .term-en(keep-all + overflow-wrap:anywhere, index.html:131)의 의도된 대비책이라 db 범위 밖으로 둠 — 틀리면 공통 CSS 한 줄(hyphens 등) 따로 검토
- Final: Ruling: 제목 단어 중간 줄바꿈은 사이트 공통 .term-en을 ③ 끝난 뒤 따로 검토 — db 범위 밖, 모든 카테고리에 걸림 — 틀리면 긴 영어 제목이 320px에서 계속 끊겨 보임
- Final: Ruling: 증상 'deadlock 오류가 떠요'의 deadlock은 PostgreSQL·MySQL 등이 함께 쓰는 일반 낱말이라 '특정 DB 문구 금지'에 걸리지 않음 — 오류 원문(deadlock detected 등)은 카드가 (PostgreSQL 예)로 따로 밝힘 — 틀리면 증상 문구 한 줄 교체

## 고친 검토 지적
각 줄은 실패하는 점검을 먼저 보고(RED) 고친 뒤 통과(GREEN)를 확인했다.

### 계획서 ①
- Review A: fixed 열 강조가 머리 칸만(Important) — dbhelp '열 강조 칸' RED→GREEN, suite OK 357
- Review A: fixed qrun sr이 결과 열 이름을 안 읽음(Important) — dbhelp sr 기대값 5개 RED→GREEN, suite OK 357
- Review A: fixed dbtab hl 모양 검사(배열 안 숫자·null·row+col) — 'hl 숫자'·'hl null'·'hl 둘' RED→GREEN
- Review A: fixed qrun rows 빠진 표 TypeError·pick 전 표 검사 — 'from rows 없음'·'after rows 없음'·'pick 전 표 검사' RED→GREEN
- Review A: fixed 같은 열 이름·show 겹침 — '같은 열 이름'·'show 겹침' RED→GREEN
- Review A: fixed erd 같은 쌍 link·같은 표 이름·배열 아님 — 4개 RED→GREEN
- Review A: fixed qrun 안 "결과 없음(0줄)" 겹침 — 'qrun 빈 표 문구' RED→GREEN(dbtab empty 인자, qrun은 '빈 표')
- Review A: fixed qrun sr에 del로 지운 줄 — 'qrun del' 기대값 RED→GREEN
- Review A2: fixed dbtab empty esc 없음 — dbhelp 'empty esc' RED→GREEN, suite OK 357
- Review A2: fixed 계획서 160줄·브리프 33줄 qrun sr 옛 형식, dbtab 시그니처·DESIGN.md에 empty(내부용) 적음 — 문구 지적이라 원장만
- Review B: fixed Column Alias x '이름이 없는 열'(PG는 count·?column?로 이름 붙임) — dbfact RED→GREEN, suite OK 360
- Review B: fixed NOT NULL x 기본값·NULL 직접 넣기 구분 — dbfact RED→GREEN
- Review B: fixed Check Constraint x '화면' → '앱에서 하는 유효성 검사'(Validation은 back/core) — dbfact RED→GREEN
- Review B: fixed Subquery 결과 표 이름 users → 결과 — dbfact RED→GREEN
- Review B2: fixed dbfact Subquery 조건 중복 includes 제거 — 결과 이름을 users로 되돌리면 FAIL dbfact 확인 후 복구, suite OK 360
- Review C: fixed dtx 실패 단계 '더하기실패' 붙어 읽힘 → '더하기: 실패' — dbfigfact RED→GREEN
- Review C: fixed Join cap 'user_id가 같은 줄끼리' → 'users.id와 orders.user_id 값이 같은 줄끼리' — dbfigfact RED→GREEN
- Review C: fixed Replication cap '승격해' → '승격시켜'(PG는 pg_ctl promote 등으로 승격) — dbfigfact RED→GREEN
- Review C: fixed Soft Delete SQL 연도 없는 '11-03' → now()(결과 표 값 11-03은 날짜 예시 cap 그대로) — dbfigfact RED→GREEN, suite OK 362

### 계획서 ②
- Review D: fixed ACID d 영어 앞 글자 — dbrevd RED→GREEN, OK 366 (96b7f3c)
- Review D: fixed Connection String x "PostgreSQL 주소 형식은" — dbrevd RED→GREEN, OK 366 (96b7f3c)
- Review E: fixed Hard Delete x 확정(COMMIT) 시점 — dbreve RED→GREEN, OK 369
- Review E: fixed ERD x 1:N 표시 — dbreve RED→GREEN, OK 369
- Review E: fixed Timestamp x timestamptz UTC 저장(출처 postgresql.org/docs/current/datatype-datetime.html) — dbreve RED→GREEN, OK 369
