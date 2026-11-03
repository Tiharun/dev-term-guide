# 데이터베이스 카테고리 보강 (③ 기존 카테고리 5/12) 설계

- 날짜: 2026-11-03
- 관련 문서: [PLAN.md](../../PLAN.md), [DESIGN.md](../../../DESIGN.md), 앞 단계 [2026-11-03-back-category-design.md](2026-11-03-back-category-design.md)
- ③은 남은 12개 카테고리를 사이트 순서(basics → web → front → back → db → server → git → deploy → security → perf → bug → ai)로 하나씩 보강한다. 이 문서는 다섯 번째(db, 화면 이름 "데이터베이스")다.
- 진행 방식은 back과 같다. 구현은 메인 세션이 하고, 설계서·계획서·구현 묶음 검토는 디렉터 에이전트(Opus 5.5, effort high)가 한다. 판단은 메인이 하고 원장에 남긴다.
- 사용자 지시(2026-11-03): 초보자가 가장 이해하기 좋은 도구·도우미가 있으면 최대한 다 쓴다. 사용자 선택(브레인스토밍): 도우미는 "쿼리 실행 + 관계도", 하위항목 4개 모두, 직접 조작 4장, 방식은 "결과를 적어 두기(A) + 줄 고르기 함수(C) 섞기".
- 디렉터 설계서 검토(1차, Critical 2·Important 12·Minor 6)를 반영한 판이다. PLAN.md 칩 메모 줄은 측정해 보니 57줄이 맞아 그대로 둔다(Ruling).

## 1. 목적과 성공 기준

Claude에게 DB가 들어간 기능을 만들어 달라고 하는 사람이 "JOIN", "인덱스", "트랜잭션", "NULL", "deadlock" 같은 말을 **쿼리를 돌리기 전 표와 돌린 뒤 결과 표, 그리고 표끼리 이어진 관계도로 바로 이해**하게 한다. 그리고 쿼리, 테이블 설계, 동시에 고칠 때의 문제, 운영·성능까지 카드로 이어 준다.

성공 기준:
- 데이터베이스 카테고리가 하위항목 10개, 카드 91장(48 + 새 43)이 된다.
- 모든 카드에 x(헷갈림 칸)가 있다.
- db 카드의 객체 v가 0장이고, 91장 모두 `u-db-` 키를 쓴다. 점검으로 막는다.
- 8장의 완료 기준을 모두 통과한다.

## 2. 범위

포함:
- 새 하위항목 4개: `query`(쿼리 더 보기), `model`(테이블 설계), `tx`(트랜잭션·동시성), `ops`(운영·성능)
- 새 카드 43장(5장 목록). 정의 d와 x는 해요체로 쓰고, 그림은 모두 새로 그린다.
- 기존 48장에 x를 채운다(측정 2026-11-03: 지금 x가 있는 db 카드는 0장). 기존 d는 바꾸지 않는다.
  - 해요체 2~3문장으로 쓴다.
  - 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
- 기존 48장의 그림을 모두 전용 그림으로 바꾼다(3.4). 측정(2026-11-03): 객체 v 41장(tbl·flow·code·stack·tree·cmp·big), 공유 그림 문자열 7장(Sorting·Seed Data·N+1 Problem `stagger`, Filtering `chip`, Rollback `spring`, Sync `rotate`, Slow Query `progress`, Hard Delete `shake`). 공유 그림 키 자체는 지우지 않는다.
- 새 그림 도우미 `qrun()`·`erd()`와 표 그리기 `dbtab()`(3.1~3.3). back의 `seq()`와 전용 그림 조각 `bkStack`·`bkBox`·`bkRows`·`bkPills`([index.html:7684](../../../index.html))를 다시 쓴다. db 그림 `D` 항목은 back 그림 뒤에 두어 이 조각들이 먼저 정의되게 한다.
- 직접 조작 4장: WHERE, Join, Index, Transaction(3.6)
- 증상 색인 12개 추가(6장)
- 글꼴 서브셋, PRODUCT.md·PLAN.md·DESIGN.md의 개수·도우미 표기, 점검 기대값 갱신

제외:
- 다른 카테고리에 이미 있는 같은 뜻의 말(측정, 2026-11-03): back의 ORM·CRUD·UUID·Lock·JSON, security의 SQL Injection, bug의 Race Condition, git의 Commit. db에서는 Transaction 카드가 커밋을 설명한다.
- 이름이 겹쳐 바꾼 새 카드: `Alias`(terminal/adv)와 겹쳐 `Column Alias`, `Cascade`(front/css)와 겹쳐 `Cascade Delete`.
- 기존 db 카드 Redis·Supabase는 그대로 둔다(제품 이름이지만 이미 있는 사전 카드다. back 판정과 같음).
- 증상 "오류·안 됨" 칩 재검토. ③ 마지막 AI 이후 한 번에 한다.
- 헷갈림 칸 이름 변경, 기존 카드 이동, 다른 카테고리 카드 수정. r 연결만 예외다.

## 3. 그림 구조

글자 폭은 back과 같이 `wlen`으로 센다(한글 2, 그 밖 1). 아래 "N폭"은 이 값이다. `dbtab`·`erd`는 움직이지 않는 그림(`m:0`)이고, `qrun`만 결과 행이 차례로 나타난다(`m:1`).

### 3.1 `dbtab()` — DB 표 (새로)

- `dbtab({name, tag, cols, rows, hl, mark, label})`
  - `name`: 표 이름(예: `users`), 12폭까지. 표 위 머리띠에 "users 테이블"로 쓴다.
  - `tag`: 머리띠 앞에 붙이는 짧은 이름표(예: "소프트 삭제"), 12폭까지. 두 표를 세로로 쌓아 비교할 때 쓴다.
  - `cols`: 열 이름 배열 1~3개, 각 10폭까지(`created_at`·`student_id`가 10폭). 항목은 문자열이거나 `{n, key}`이고, `key`는 `'PK'`·`'FK'` 중 하나다. 열 이름 옆에 "PK"·"FK" 글자 꼬리표를 붙인다.
  - `rows`: 행 배열 0~5개. 칸 값은 문자열이고 10폭까지다. 날짜·시각은 `'10-01'`·`'14:05'`처럼 짧은 예시로 쓴다. 값 `'NULL'`은 기울인 회색 글자 "NULL"로 그리고, 빈 문자열 `''`은 "빈 글자" 꼬리표로 그린다(NULL과 구분).
  - `hl`: 강조. `{row: i}`·`{col: j}`·`{cell: [i, j]}` 중 하나이거나 그 배열. 강조는 배경색과 "강조" 글자로 한다(색만으로 구분하지 않음).
  - `mark`: 행마다 붙이는 꼬리표 배열(예: `['읽음','읽음','건너뜀',…]`). 행 수와 같아야 하고, 꼬리표는 6폭까지다. Index·DELETE가 쓴다.
- 행이 0개면 "결과 없음(0줄)"을 쓴다.
- 입력 검사(넘으면 오류): 이름·이름표·열·칸 폭, 열 수, 행 수, 행마다 칸 수가 열 수와 다름, 없는 행·열을 가리키는 `hl`, 행 수와 다른 `mark`·꼬리표 폭, `key`가 PK·FK가 아님.
- `.sr` 문장: "users 테이블, 열 3개(id, 이름, 이메일), 행 3줄. 1줄: 1, 민수, m@a.com …" 식으로 칸을 읽는다. 강조·꼬리표도 글로 읽는다.
- 320px(그림판 안쪽 약 244px, 추측)에서 3열 × 10폭이 들어가는지 계획서 ① Task 1에서 break-ui로 잰다. 넘치면 칸 안 줄바꿈을 허용하고 칸 안쪽 여백을 줄여 넘침 0을 지킨다(글자 11px 하한은 유지). 칸 폭 한도는 낮추지 않는다(`m@a.com`·`category`·`COUNT(*)`가 깨지므로).
- `dbtab`은 `vs` 칸 안에 넣지 않는다. `vs` 한 칸은 320px에서 약 96px라 표가 들어가지 않는다(측정: `.cmp` 두 칸·간격 12px·안쪽 여백 10px, [index.html:204](../../../index.html)). 표끼리 비교는 `tag`를 단 `dbtab` 두 개를 `bkStack`으로 세로로 쌓는다.

### 3.2 `qrun()` — 쿼리 실행 (새로)

- `qrun({sql, from, pick, show, after, err, del, hl, still, label})`
  - `sql`: 쿼리 글. 1~4줄, 줄마다 28폭까지(back `ide`와 같은 한도).
  - `from`: 실행 전 표 1~2개(`dbtab` 입력과 같은 모양). 2개는 JOIN·Subquery·Cascade Delete처럼 두 표가 필요할 때만 쓴다.
  - 결과는 `pick`·`after`·`err` 중 **정확히 하나**로 정한다(둘 이상이거나 없으면 오류):
    - `pick: r => …` — 줄 고르기 함수. `from[0]`의 각 행을 `{열이름: 값}` 객체로 받아 참·거짓을 돌려준다. 값은 숫자 모양 글(`'25'`)이면 숫자, `'NULL'`이면 `null`, 그 밖은 글자로 바꿔 넘긴다. 고른 행은 실행 전 표에서도 강조되고, 결과 표가 된다. WHERE·LIKE·IN·BETWEEN·IS NULL처럼 줄만 거르는 쿼리에 쓴다. 결과를 손으로 적지 않으므로 쿼리와 어긋날 수 없다.
    - `show: ['title']` — `pick`의 결과 표에 남길 열 이름 배열. SQL이 `SELECT title`처럼 일부 열만 가져올 때 쓰고, 없으면 모든 열(`SELECT *`)이다. 실행 전 표에 없는 열이면 오류. `pick`과만 함께 쓴다. 3.4·3.5 표에 WHERE 조각만 적은 `pick` 카드(LIKE·BETWEEN·IS NULL·Filtering 등)는 실제 `sql` 첫 줄을 `SELECT * FROM <표>`로 쓰고 `show`를 두지 않는다.
    - `del: 1` — DELETE. `pick`과만 함께 쓴다(`after`·`err`와 함께면 오류). 고른 행에 "지움" 꼬리표를 달고, 결과 표는 남은 행이다. 머리띠는 "지운 뒤 남은 줄"이다.
    - `after` — 결과 표를 직접 적는다. 표 하나 `{name, cols, rows}` 또는 표 1~2개 배열이다(Cascade Delete는 users·orders 두 표가 모두 바뀜). JOIN·GROUP BY·COUNT·ORDER BY·INSERT·UPDATE처럼 행을 합치거나 바꾸는 쿼리에 쓴다.
    - `err: '메시지'` — 막힌 쿼리. 결과 자리에 "실패" 글자와 **한국어 요약** 메시지(28폭까지, 예: "이미 있는 이메일이에요")를 쓰고, 실행 전 표는 그대로임을 "표는 그대로예요"로 쓴다. 실제 오류 원문(예: `duplicate key value violates unique constraint`)은 28폭을 넘으므로 cap이나 x에 "(PostgreSQL 예)"와 함께 쓴다. NOT NULL·Check Constraint·Unique Constraint·Composite Key가 쓴다.
  - `hl`: `after` 결과 표의 강조(`dbtab`의 `hl`과 같은 모양). 새로 생기거나 바뀐 칸을 가리킨다. `after`일 때만 쓴다(`pick`은 고른 행을 저절로 강조하고, `err`에는 결과 표가 없다). 표가 두 개면 `[hl0, hl1]`이다.
- `after` 값 점검(넘으면 오류): 결과 칸 값은 (1) 실행 전 표 어딘가에 있는 값, (2) 숫자, (3) `'NULL'`, (4) `hl`로 가리킨 칸 중 하나여야 한다. 손으로 적은 결과가 실행 전 표와 엇나가는 일을 줄인다. 열 이름은 점검하지 않는다(Column Alias·집계 열 이름이 새로 생김).
- 집계 함수를 쓰는 SQL에는 `AS`로 열 이름을 붙인다(예: `COUNT(*) AS 개수`). 붙이지 않으면 PostgreSQL은 함수 이름(`count`·`sum`)을 열 이름으로 쓰고, `COUNT`가 둘이면 같은 이름이 둘 생긴다([PostgreSQL SELECT](https://www.postgresql.org/docs/current/sql-select.html)). 열 이름 폭 문제도 함께 풀린다.
- 배치: 세 폭 모두 세로로 쌓는다. 실행 전 표(2개면 위아래로) → "실행" 띠와 SQL → 결과 표. 320px에서 표 두 개를 나란히 두면 넘치기 때문이다(추측, Task 1에서 잼).
- 움직임: 결과 행이 차례로 나타난다(기존 `mk-cdz{k}` 키프레임, `seq`의 `.mk-sqm.A`와 같은 규칙의 새 클래스). `still`이면 모두 보이는 마지막 장면이다. 결과가 `err`면 "실패" 줄 하나만 나타난다.
- SQL 글자는 쿼리 그대로 두지만, 결과 표 위 머리띠는 "결과 2줄"처럼 줄 수를 쓴다.
- `.sr` 문장: "쿼리 SELECT name FROM users WHERE city = '서울' 실행. 실행 전 users 3줄, 결과 2줄: 민수, 지영." 식으로 기호 없이 읽는다.
- 대상: 3.4·5장의 SQL 카드 대부분.

### 3.3 `erd()` — 관계도 (새로)

- `erd({tables, links, hl, label})`
  - `tables`: 표 상자 2~3개, 항목 `{name, cols}`. 이름 12폭(`enrollments`가 11폭), 열 1~4개, 열 이름 10폭. 열은 `dbtab`처럼 문자열 또는 `{n, key, type}`이다. `type`은 열 이름 오른쪽 작은 칸에 쓰는 타입 글(예: `글자`·`정수`·`날짜`·`참거짓`), 6폭까지이고 열 이름 폭에 들어가지 않는다.
  - `links`: 이웃한 두 상자를 잇는 선 배열, 항목 `{a, b, kind, fk}`. `a`·`b`는 이웃한 표 번호(|a−b| = 1). `kind`는 `'1:1'`·`'1:N'`·`'N:1'`·`'N:M'` 중 하나이고 `a : b` 순서로 읽는다(`'1:N'`은 a 하나에 b 여럿).
  - `fk`는 FK 열 이름이고 놓이는 표가 정해져 있다: `'1:N'`이면 b 표, `'N:1'`이면 a 표, `'1:1'`이면 둘 중 하나에 `key:'FK'`로 있어야 한다. `N:M`은 `fk`가 없어야 하고, 선 옆에 "중간 표가 필요해요"를 쓴다.
  - `hl`: 강조할 표 이름 또는 `'표.열'` 배열.
- 배치: 상자를 세로로 쌓고, 상자 사이 칸에 "1 : N" 꼬리표와 "orders.user_id로 이어져요" 글을 쓴다. 선 모양은 장식(`aria-hidden`)이고, 관계는 글로 전한다. 읽히는 글에 화살표 기호를 쓰지 않는다.
- 입력 검사(넘으면 오류): 표 수, 이름·열·`type` 폭과 수, 이웃하지 않은 `a`·`b`, 잘못된 `kind`, FK가 아니거나 `kind`가 정한 표에 없는 `fk`, `N:M`에 `fk`, 없는 이름을 가리키는 `hl`.
- `.sr` 문장: "관계도. users 표(id PK, 이름), orders 표(id PK, user_id FK). users 하나에 orders 여럿, orders.user_id로 이어져요."
- 대상: Foreign Key, Schema, ERD, Normalization, One-to-Many, Many-to-Many, Junction Table. 같은 users·orders 1:N 그림이 여러 장에 반복되지 않게 카드마다 표나 강조를 다르게 한다(3.4·3.5).

### 3.4 기존 48장 다시 그리기

키 이름은 `u-db-<slug>`다(예: `u-db-primary-key`). 표의 "▶"는 직접 조작(3.6)이다. 예시 사람 이름은 민수·지영·준호, 이메일은 `m@a.com`처럼 짧은 가짜만 쓴다.

| 하위항목 | 카드 | 새 그림 |
|---|---|---|
| basic | Table | `dbtab` users 3열·3행, cap "가로 한 줄 = 행, 세로 한 칸 = 열" |
| basic | Row | `dbtab` users, 2번째 행 강조 "회원 한 명" |
| basic | Column | `dbtab` users, 이메일 열 강조 |
| basic | Primary Key | `dbtab` users에 이름이 같은 "민수" 두 줄, id 열(PK) 강조, cap "이름이 같아도 id로 구분해요" |
| basic | Foreign Key | `erd` users·orders(1:N, user_id), `orders.user_id` 강조 |
| basic | Data Type | `doc` 표: 열 · 타입 · 예시 값(price 정수 12000, name 글자 민수, created_at 날짜 10-01, is_paid 참·거짓) |
| basic | Query | `qrun` posts 표, `SELECT title FROM posts` / `WHERE likes > 10` + `pick` + `show`(title)(WHERE 직접 조작의 users 표와 다름) |
| basic | Schema | `erd` users·posts, 열마다 `type` 칸에 타입을 적음(예: email · 글자, created_at · 날짜), cap "표를 만들기 전 설계도" |
| core | SQL | `doc` 표: 명령 네 가지(SELECT 가져오기 · INSERT 넣기 · UPDATE 고치기 · DELETE 지우기)와 짧은 예 |
| core | RDBMS | `doc` 표: 약속 셋(표로 저장 · 키로 이음 · SQL로 물음), 예 MySQL·PostgreSQL |
| core | NoSQL | `bkStack`: `dbtab` users(tag "표로 저장") 위, JSON 문서 한 개(`fcss`, "문서로 저장") 아래 |
| core | Relation | `doc` 표: 관계 세 종류 1:1(회원·프로필) · 1:N(회원·주문) · N:M(학생·강의) |
| core | Index ▶ | 인덱스 있음·없음을 고르고 "찾기"를 누르면 읽은 줄이 5줄·1줄로 바뀜 |
| core | Migration | `term`: `ls migrations` 결과 001_users.sql · 002_phone.sql(적용됨) · 003_avatar.sql(대기), 이어서 `npm run migrate`와 "003 적용함"(예시). 바꾼 내역이 파일로 쌓이고 차례로 적용됨을 보임 |
| core | Transaction ▶ | "중간에 실패" 켜고 끄기 + "실행": 모두 반영 또는 모두 되돌림 |
| core | Backup | `track`: DB → 매일 밤 복사(예시) → 백업 파일 보관 |
| motion | Data Flow | `seq` 브라우저·서버·DB: 저장 요청 → INSERT → 저장됨 → 목록 조회 → 화면 표시 |
| motion | Join ▶ | users·orders 두 표에서 INNER·LEFT를 고르면 주문 없는 회원 줄이 사라지거나 NULL과 함께 나타남 |
| motion | Sorting | `vs`: 같은 상품 셋을 가격순 vs 이름순(`bkRows`, 표 아님). SQL은 ORDER BY 카드가 맡음 |
| motion | Filtering | 화면 필터 칩 "1만 원 미만"(선택됨, `bkPills`) 아래에 그 뒤에서 도는 `qrun` products 표 `WHERE price < 10000` + `pick` |
| motion | Seed Data | `term` `npm run seed`와 "회원 3명 넣음(예시)" + `dbtab` 결과 |
| motion | Rollback | `seq` 앱·DB: BEGIN → 출금 → 처리(오류) 실패 → ROLLBACK → 되돌려짐 |
| motion | Replication | `seq` 서버·원본 DB·복제 DB: 쓰기 → 복사 → 처리(고장) 실패 → 처리(승격, 복제 DB 상자) → 쓰기·읽기(서버가 복제에), cap "복제는 평소 읽기만 받고, 원본이 고장 나면 승격해 이어받아요"([PostgreSQL Failover](https://www.postgresql.org/docs/current/warm-standby-failover.html)) |
| motion | Sync | `seq` 휴대폰·서버: 처리(오프라인 수정) → 연결되면 보냄 → 처리(같게 맞춤) → 최신 값 받음 |
| adv | Normalization | `bkStack`: `dbtab` orders(tag "나누기 전", 회원 이름이 줄마다 반복, 강조) 위, `erd` users·orders 아래 |
| adv | N+1 Problem | `seq` 서버·DB: 글 목록 조회 → 작성자 조회 → 작성자 조회 → 작성자 조회(같은 메시지를 세 번 둠, 메시지 4개), cap "글 100개면 101번, JOIN이면 1번" |
| adv | Slow Query | `term` 느린 쿼리 로그 두 줄(duration 3200 ms 예시 + SQL) |
| adv | Redis | `seq` 서버·Redis·DB: 조회 → 없음 → 조회 → 결과 → 저장 → 다시 조회 → 바로 응답 |
| adv | ERD | `erd` users·posts·comments(1:N, 1:N) |
| adv | Soft Delete | `qrun` `UPDATE posts` / `SET deleted_at = '11-03'` / `WHERE id = 2` + `after`(deleted_at 칸 강조, 날짜 예시) |
| adv | Sharding | `seq` 서버·DB 1·DB 2: 7번 저장(서버가 DB 1에) → 1500번 저장(서버가 DB 2에), cap "나누는 기준은 예시: 1000번까지 DB 1" |
| adv | Supabase | `bkStack`·`bkBox`: DB(PostgreSQL) · 로그인 · 파일 저장, DB 칸 강조 |
| sql | SELECT | `qrun` `SELECT name, email` / `FROM users` + `after`(두 열) |
| sql | INSERT | `qrun` INSERT + `after`(새 줄 강조) |
| sql | UPDATE | `qrun` `UPDATE … WHERE id = 2` + `after`(바뀐 칸 강조), cap "WHERE를 빼면 전부 바뀌어요" |
| sql | DELETE | `qrun` `DELETE … WHERE id = 3` + `pick` + `del` |
| sql | WHERE ▶ | 조건 셋 중 하나를 고르면 `pick`으로 결과가 바뀜 |
| sql | ORDER BY | `qrun` `ORDER BY created_at DESC` + `after` |
| sql | GROUP BY | `qrun` `SELECT category,` / `COUNT(*) AS 개수` / `FROM products` / `GROUP BY category` + `after` |
| sql | LIMIT | `qrun` `SELECT title FROM posts` / `ORDER BY id LIMIT 2` + `after`(앞 2줄). x에 "ORDER BY 없이 LIMIT만 쓰면 어떤 줄이 나올지 정해지지 않아요"([PostgreSQL SELECT](https://www.postgresql.org/docs/current/sql-select.html)) |
| tip | Hard Delete | `bkStack`: `dbtab` 두 개(tag "완전 삭제": 줄이 없어짐 / tag "소프트 삭제": deleted_at 표시) |
| tip | Restore | `track`: 백업 파일(어제 03:00 예시) → 복원 → DB가 그 시점으로 |
| tip | Data Integrity | `doc` 표: 지키는 규칙 셋(형식·빈 값·연결)과 막힌 예 |
| tip | Unique Constraint | `qrun` 같은 이메일 INSERT + `err` "이미 있는 이메일이에요" |
| tip | NULL | `dbtab` 전화 열: NULL · 빈 글자 · `0` 세 줄, NULL 칸 강조, cap "0도 빈 글자도 아니에요" |
| tip | Timestamp | `dbtab` created_at·updated_at 열 강조(값은 `10-01`처럼 10폭 안 짧은 날짜 예시, 시각은 쓰지 않음) |
| tip | Spreadsheet vs DB | `vs`: 엑셀(한 사람이 파일을 열어 고침) vs DB(앱 여러 개가 동시에 쿼리), 칸 안은 글만 |
| tip | Personal Data | `bkStack`: `bkPills` "저장하는 열"(이름·이메일)과 "받지 않아도 되는 열"(주소 등), 값은 적지 않음 |

공통 규칙(DESIGN.md):
- 그림 글자는 11px 이상이다.
- 그림 속 숫자·시각·건수는 예시로 표시한다. 접속 주소·비밀번호는 `****`로 가린다.
- 실제 사람처럼 보이는 개인정보(전화번호 전체, 주소, 주민번호)를 쓰지 않는다. 전화는 `010-…`처럼 줄인다.
- SQL은 표준 SQL로 쓰고, DB마다 다른 문법(예: `LIMIT`, 자동 번호)은 x에 "DB마다 달라요"를 쓴다. 그림 속 오류는 `qrun`의 `err`처럼 한국어 요약으로 쓰고, 실제 원문은 PostgreSQL 것을 cap·x에 "(PostgreSQL 예)"로 표시한다.
- `seq`를 쓰는 행의 글은 back 한도(메시지 8개, 글 14폭, 세로줄 3개면 이름 8폭·4개면 6폭)를 지킨다. 표의 화살표(→)는 메시지 차례를 적은 것이고 그림 글에는 들어가지 않는다. 괄호 속 "(실패)"·"(기다림)"은 `err:1`·`wait:1`, "처리(…)"는 `from === to` 상자다. "(A)"·"(서버가 복제에)"처럼 사람·장치 이름이 든 괄호는 보내는 쪽·받는 쪽 표시이고 그림 글에는 들어가지 않는다.
- 회사 로고·브랜드 이름을 새로 쓰지 않는다("DB 클라이언트", "로그인 서비스"). 예외: DB 제품 이름(MySQL·PostgreSQL·Redis·Supabase)은 카드 주제이거나 "예"로 드는 이름이라 쓴다(back Redis 판정과 같은 식, 로고는 쓰지 않음).
- 320/375/1280 세 폭에서 넘침이 없어야 한다.
- 상태를 색만으로 구분하지 않는다.
- 읽히는 글에 화살표·체크 기호를 쓰지 않는다(`wsym`·`symcss` 점검과 같은 규칙).
- 코드가 들어가는 `pair`·`vs` 칸은 front·back처럼 `fcss`로 쓴다. 190px에 안 들어가면 세로 쌓기로 바꾼다.

### 3.5 새 카드 그림

새 43장은 `qrun`·`erd`·`dbtab`·`seq`와 기존 도우미(`vs`·`track`·`doc`·`term`·`fcss`)·back 조각(`bkStack`·`bkBox`·`bkRows`·`bkPills`)으로 그린다. 객체 v `{stack}`은 `dbobj`가 막으므로 쓰지 않는다. 도우미가 못 그리는 장면만 전용 HTML로 그린다.

| 하위항목 | 카드 | 새 그림 |
|---|---|---|
| query | INNER JOIN | `qrun` posts(글 셋)·comments 두 표 + `after`(댓글 있는 글만). Join 직접 조작의 users·orders와 다른 표 |
| query | LEFT JOIN | `qrun` products·reviews 두 표 + `after`(후기 없는 상품은 NULL, 강조) |
| query | Aggregate Function | `qrun` `SELECT COUNT(*) AS 수,` / `SUM(price) AS 합,` / `MAX(price) AS 최고` / `FROM orders` + `after`(숫자 한 줄) |
| query | COUNT | `qrun` `SELECT COUNT(*) AS 전체,` / `COUNT(phone) AS 전화` / `FROM users` + `after`(5 · 3), cap "NULL은 세지 않아요" |
| query | HAVING | `qrun` `SELECT city, COUNT(*) AS 수` / `FROM users` / `GROUP BY city` / `HAVING COUNT(*) >= 2` + `after` |
| query | DISTINCT | `qrun` `SELECT DISTINCT city` / `FROM users` + `after` |
| query | LIKE | `qrun` `WHERE name LIKE '민%'` + `pick` |
| query | IN | `qrun` `SELECT * FROM users` / `WHERE city IN` / `('서울', '부산')` + `pick` |
| query | BETWEEN | `qrun` `WHERE price` / `BETWEEN 1000 AND 5000` + `pick`, cap "양 끝 값도 들어가요" |
| query | Subquery | `qrun` 두 표, `WHERE id IN (` / `SELECT user_id FROM orders)` + `after` |
| query | Column Alias | `qrun` `SELECT name AS 이름` + `after`(열 이름만 바뀜) |
| query | IS NULL | `qrun` `WHERE phone IS NULL` + `pick`, cap "`= NULL`로는 아무것도 안 나와요" |
| model | NOT NULL | `qrun` 이름 없이 INSERT + `err` "이름은 비울 수 없어요" |
| model | Default Value | `qrun` status 없이 INSERT + `after`(status '대기', 강조) |
| model | Auto Increment | `qrun` 이름만 INSERT + `after`(id 4가 저절로, 강조) |
| model | Composite Key | `qrun` enrollments 표(student_id·course_id 둘 다 PK)에 같은 짝 INSERT + `err` "같은 짝이 이미 있어요" |
| model | Surrogate Key | `bkStack`: `dbtab` 두 개(tag "이메일이 키": 이메일을 바꾸면 곤란 / tag "id가 키") |
| model | Check Constraint | `qrun` price `-500` INSERT(ASCII 빼기) + `err` "price는 0 이상이어야 해요" |
| model | One-to-Many | `erd` users·orders 1:N, orders 강조 + 아래 `dbtab` orders(민수 주문 두 줄). Foreign Key 그림(열 강조)과 다르게 "하나에 여럿"을 줄로 보임 |
| model | Many-to-Many | `erd` students·courses N:M "중간 표가 필요해요" |
| model | Junction Table | `erd` students·enrollments·courses(1:N, N:1), enrollments 강조 |
| model | Cascade Delete | 위 `fcss` 상자에 FK 정의 `user_id … REFERENCES users` / `ON DELETE CASCADE`, 아래 `qrun` users·orders 두 표 `DELETE FROM users` / `WHERE id = 1` + `after` 두 표(users에서 민수, orders에서 민수 주문이 함께 없어짐). x에 "기본값(NO ACTION)이면 이 DELETE는 막혀요" |
| model | Denormalization | `bkStack`: `dbtab` orders(tag "복사해 둠", 회원 이름 열 강조) + 글 "읽기는 빨라지고, 이름을 고칠 곳이 늘어나요" |
| tx | ACID | `doc` 표: 원자성 · 일관성 · 격리성 · 지속성, 한 줄 풀이 |
| tx | Autocommit | `seq` 앱·DB: UPDATE → 처리(바로 확정) → UPDATE → 처리(바로 확정), cap "BEGIN이 없으면 한 문장씩 확정" |
| tx | Savepoint | `seq` 앱·DB: BEGIN → 주문 저장 → SAVEPOINT a → 쿠폰 적용(실패) → ROLLBACK TO a → COMMIT |
| tx | Isolation Level | `doc` 표 **PostgreSQL 기준**: READ COMMITTED(기본값) · REPEATABLE READ · SERIALIZABLE과 막아 주는 일. "READ UNCOMMITTED는 READ COMMITTED처럼 동작", "표준 SQL 표와 조금 달라요"([PostgreSQL Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)) |
| tx | Dirty Read | `seq` A·DB·B: 확정 전 수정 → 읽기 → 바뀐 값 → ROLLBACK → 처리(사라진 값 씀), cap "표준은 가장 낮은 수준에서 허용하지만 PostgreSQL은 막아요" |
| tx | Lost Update | `seq` A·DB·B: 재고 읽기(A) → 10(DB가 A에) → 재고 읽기(B) → 10(DB가 B에) → 9로 씀(A) → 9로 씀(B), cap "둘이 하나씩 팔았는데 재고는 9" |
| tx | Deadlock | `seq` A·DB·B: 1번 잠금 → 2번 잠금 → 2번 요청(기다림) → 1번 요청(기다림) → 취소(실패), cap "DB가 한쪽을 취소해요, 어느 쪽일지는 정할 수 없어요. 오류는 deadlock detected(PostgreSQL 예)" |
| tx | Optimistic Locking | `seq` 앱·DB: UPDATE v=3 → 0줄 바뀜(실패) → 처리(다시 읽기) → UPDATE v=4 → 1줄 바뀜, cap "v는 고칠 때마다 1씩 느는 version 열" |
| tx | Pessimistic Locking | `seq` A·DB·B: FOR UPDATE(A) → UPDATE(B, 기다림) → COMMIT(A) → 진행(DB가 B에), cap "그냥 SELECT는 막지 않아요" |
| tx | Connection Pool | `track`: 미리 연 연결 칸 5개 → 요청이 하나 빌림 → 쿼리 → 돌려줌 |
| ops | Query Plan | `term` `EXPLAIN …` 결과 두 경우: `Seq Scan`(인덱스 없음) · `Index Scan`(있음) |
| ops | Full Table Scan | `track`: 1번째 줄 읽음 → 2번째 줄 → … → 마지막 줄(10만 번째, 예시), cap "같은 값이 더 있을 수 있어 끝까지 봐요". Index 직접 조작의 5줄 표와 다른 장면 |
| ops | Composite Index | `doc` 표: 인덱스 (city, age)가 잘 쓰이는 조건(city만 · city와 age)과 덜 효율적인 조건(age만, PostgreSQL 18부터는 skip scan으로 쓰일 때도 있음, [Multicolumn Indexes](https://www.postgresql.org/docs/current/indexes-multicolumn.html)) |
| ops | Read Replica | `seq` 서버·원본·복제: 글 쓰기 → 복사(기다림) → 글 읽기(서버가 복제에) → 아직 옛 글, cap "읽기를 나눠 맡기지만 복사가 조금 늦을 수 있어요". Replication(고장 대비)과 다른 장면 |
| ops | Connection String | `doc`: `postgres://app:****@db.example.com:5432/shop` 한 줄(띄어쓰기 없는 긴 글이라 `overflow-wrap:anywhere`로 320px에서 줄바꿈)과 부분 이름 표(사용자·비밀번호·호스트·포트·DB 이름) |
| ops | Too Many Connections | `track`: 연결 칸이 가득 참 → 새 요청 거절(실패), "too many clients already(PostgreSQL 예)" |
| ops | Query Timeout | `track`: 쿼리 시작 → 정한 시간 지남(예시 5초) → DB가 쿼리를 취소(실패) |
| ops | Point-in-Time Recovery | `track` 시간 줄: 03:00 백업 · 14:05 실수로 삭제 · 14:04 시점으로 되살림(예시) |
| ops | Database Dump | `term` `pg_dump shop > shop.sql`와 파일 일부 `CREATE TABLE …`·`COPY … FROM stdin;`, cap "기본은 COPY 줄, --inserts를 주면 INSERT로 나와요"([pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)) |
| ops | Database Client | 전용 HTML: 표 목록 칸 · 쿼리 창 · `dbtab` 결과(320px에서는 세로로 쌓음) |

### 3.6 직접 조작 4장

- WHERE: 조건 버튼 셋(`city = '서울'`, `age > 20`, `age > 30`) 중 하나를 고른다(`aria-pressed`). 결과는 `qrun`의 `pick`으로 계산해 실행 전 표 강조와 결과 표가 바뀐다. 결과 문장: "3줄 중 2줄이 조건에 맞아요".
- Join: INNER·LEFT를 고른다. users(민수·지영·준호)·orders(준호 주문 없음). INNER는 준호 줄이 빠지고, LEFT는 준호 줄이 주문 NULL로 나온다. 결과 문장에 "주문이 없는 준호가 빠졌어요"·"준호도 나와요, 주문은 NULL" 처럼 차이를 쓴다.
- Index: 인덱스 있음·없음을 고르고 "찾기"(email = `m@a.com`)를 누른다. 없으면 5줄 모두에 "읽음", 있으면 찾은 1줄만 "읽음"이다(`dbtab`의 `mark`). 결과 문장: "5줄을 다 읽었어요"·"색인으로 1줄만 읽었어요". 실제 시간 숫자는 쓰지 않는다.
- Transaction: "중간에 실패" 켜고 끄기와 "실행" 버튼. 민수 잔액에서 1만 원을 빼고 지영에게 더한다(예시). 실패가 꺼져 있으면 둘 다 바뀌고 "COMMIT: 둘 다 반영", 켜져 있으면 빼기 뒤에 실패해 "ROLLBACK: 둘 다 처음 값"이다. "처음으로" 버튼으로 잔액을 되돌린다.

공통: back과 같이 `init`·`aria-pressed`(토글·고르기만)·`aria-live`·`psay`를 쓰고, init 안에서는 `s.querySelector`만 쓴다(window·document 금지). 한 번 누르는 버튼(찾기·실행·처음으로)에는 `aria-pressed`를 달지 않는다(back 판정). 키보드로 모두 조작할 수 있다. 실제 타이머를 쓰지 않는다.

## 4. 데이터와 배치

- `CAT('db', …)`([index.html:1732](../../../index.html))의 추가 하위항목 배열에서 `sql` 뒤에 다음 넷을 넣는다. 공통 `tip`은 마지막에 그대로 둔다. 기존 카드 번호는 바뀌지 않고 tip 카드 번호만 뒤로 밀린다(back과 같음).
  - `['query','쿼리 더 보기','표를 합치고 세고 거르는 쿼리']`
  - `['model','테이블 설계','표와 열을 어떻게 나누고 이을지 정하는 말']`
  - `['tx','트랜잭션·동시성','여럿이 동시에 고칠 때 데이터를 지키는 법']`
  - `['ops','운영·성능','DB를 빠르고 안전하게 돌리는 말']`
- 카드 형식 `{en,ko,d,x,p,r,l,o,u,v}`는 그대로다. o:1은 1차 출처가 있을 때만 쓰고, 그때 u를 단다(PostgreSQL 공식 문서 주소 문자열).
- r은 이미 있는 같은 뜻·짝 카드에만 단다. 후보:
  - INNER JOIN↔Join·LEFT JOIN, LEFT JOIN↔Join·NULL, Aggregate Function↔COUNT·GROUP BY, COUNT↔Aggregate Function·NULL, HAVING↔GROUP BY·WHERE, DISTINCT↔SELECT, LIKE↔WHERE, IN↔WHERE·Subquery, BETWEEN↔WHERE, Subquery↔Query·IN, Column Alias↔SELECT, IS NULL↔NULL·WHERE
  - NOT NULL↔NULL·Data Integrity, Default Value↔INSERT, Auto Increment↔Primary Key·Surrogate Key, Composite Key↔Primary Key·Junction Table, Surrogate Key↔Primary Key·UUID, Check Constraint↔Data Integrity·Validation, One-to-Many↔Relation·Foreign Key, Many-to-Many↔Junction Table·Relation, Junction Table↔Many-to-Many·Foreign Key, Cascade Delete↔Foreign Key·Hard Delete, Denormalization↔Normalization·Join
  - ACID↔Transaction, Autocommit↔Transaction, Savepoint↔Rollback·Transaction, Isolation Level↔Dirty Read·Transaction, Dirty Read↔Isolation Level, Lost Update↔Race Condition·Concurrency·Optimistic Locking, Deadlock↔Lock·Transaction, Optimistic Locking↔Lost Update·Pessimistic Locking, Pessimistic Locking↔Lock·Optimistic Locking, Connection Pool↔Too Many Connections
  - Query Plan↔Index·Slow Query, Full Table Scan↔Index·Query Plan, Composite Index↔Index, Read Replica↔Replication, Connection String↔Environment Variable, Too Many Connections↔Connection Pool, Query Timeout↔Timeout·Slow Query, Point-in-Time Recovery↔Backup·Restore, Database Dump↔Backup·Restore, Database Client↔SQL
- 뜻이 다른 짝은 r 없이 x 안에서만 구분한다(`DB_WRONG` 점검):
  - Column Alias vs terminal의 Alias(명령 별명)
  - Cascade Delete vs front의 Cascade(CSS 규칙 우선순위)
  - Isolation Level vs test의 Test Isolation(테스트끼리 안 섞임)
  - Optimistic Locking vs design의 Optimistic UI·back의 Optimistic Update(화면을 먼저 바꿈)
  - Autocommit vs git의 Commit(코드 변경 기록)
  - Check Constraint vs ai의 Constraint(AI에게 주는 제약)
  - Database Client vs back의 Client(요청을 보내는 쪽 프로그램)
- 점검 기대값:
  - `COUNT`에 `db/*` 10개(아래 5장 개수)
  - `EXPECT`에 새 카드 영문명
  - `REDRAWN`에 db 하위항목 10개, 새 점검 `dbobj`로 db 카드의 객체 v 0장을 따로 막는다(back `bkobj`와 같은 방식)
  - 새 점검 `dbukey`: db 91장의 v가 `u-db-`로 시작하고 `D`에 있다(마칠 때 예외 없음. 진행 중에는 남은 옛 카드 목록 `DB_TODO`가 줄어 비워진다)
  - 새 점검 `dbcat`: db 하위항목 순서가 `basic,core,motion,adv,sql,query,model,tx,ops,tip`이다
  - 새 점검 `dbhelp`: `dbtab`·`qrun`·`erd`의 입력 검사와 `.sr` 문장, `after` 값 점검(back `bkhelp`와 같은 식)
  - 새 점검 `dbwrong`: `DB_WRONG` 짝에 r이 없다(back `BK_WRONG`과 같은 식)
  - 새 점검 `dbtext`·`dbxn`: db 카드 d·x 글 규칙(해요체, 기호, x 문장 수)을 back `bktext`·`bkxn`과 같은 식으로 본다. 걸린 옛 카드는 미루지 않고 글을 고친다(back 판정)
  - 새 점검 `dbdmrun`: 직접 조작 4장의 init을 `board(h)` 가짜 판으로 돌려 결과 문장이 바뀌는지 본다(back `bkdmrun`과 같은 식)

## 5. 용어 목록 (새 43장)

측정(2026-11-03): 아래 영문명은 기존 카드 1,529장과 정규화 이름(`norm`, 소문자·공백·`/`·`-`·`.` 제거)으로 같지 않다. `Alias`·`Cascade`는 겹쳐서 이름을 바꿨다(2장).

| 하위항목 | 새 카드 |
|---|---|
| query (12) | INNER JOIN, LEFT JOIN, Aggregate Function, COUNT, HAVING, DISTINCT, LIKE, IN, BETWEEN, Subquery, Column Alias, IS NULL |
| model (11) | NOT NULL, Default Value, Auto Increment, Composite Key, Surrogate Key, Check Constraint, One-to-Many, Many-to-Many, Junction Table, Cascade Delete, Denormalization |
| tx (10) | ACID, Autocommit, Savepoint, Isolation Level, Dirty Read, Lost Update, Deadlock, Optimistic Locking, Pessimistic Locking, Connection Pool |
| ops (10) | Query Plan, Full Table Scan, Composite Index, Read Replica, Connection String, Too Many Connections, Query Timeout, Point-in-Time Recovery, Database Dump, Database Client |

하위항목별 개수: basic 8, core 8, motion 8, adv 8, sql 8, query 12, model 11, tx 10, ops 10, tip 8.

x로 구분할 짝(뜻이 가까움):
- Table vs Spreadsheet vs DB, Row vs Column, Query vs SQL
- Primary Key vs Foreign Key vs Unique Constraint, Primary Key vs Composite Key vs Surrogate Key, Surrogate Key vs UUID(back)
- Join vs INNER JOIN vs LEFT JOIN, Join vs Subquery
- WHERE vs HAVING, GROUP BY vs DISTINCT, COUNT vs Aggregate Function, `COUNT(*)` vs `COUNT(열)`
- NULL vs 빈 글자 vs 0, IS NULL vs `= NULL`, NOT NULL vs Default Value
- LIKE vs `=`, IN vs BETWEEN
- Relation vs One-to-Many vs Many-to-Many vs Junction Table, ERD vs Schema
- Normalization vs Denormalization
- Foreign Key vs Cascade Delete, Hard Delete vs Soft Delete vs DELETE
- Transaction vs Autocommit vs Savepoint, Rollback vs Restore
- ACID vs Isolation Level, Dirty Read vs Lost Update vs Race Condition(bug)
- Deadlock vs Lock(back), Optimistic Locking vs Pessimistic Locking
- Index vs Composite Index vs Full Table Scan, Query Plan vs Slow Query
- Replication vs Read Replica vs Sharding vs Backup
- Backup vs Database Dump vs Point-in-Time Recovery vs Restore
- Connection Pool vs Too Many Connections, Query Timeout vs Timeout(back)
- Connection String vs Environment Variable(back)
- Database Client vs SQL, Redis vs RDBMS

## 6. 증상 색인 (12개)

기존 193개와 대조했다(측정 2026-11-03). 비슷해 보이지만 원인과 연결 카드가 달라 넣는 것:
- "데이터가 쌓일수록 목록이 느려져요"는 기존 "목록이 길면 버벅여요"(화면 그리기)와 달리 DB 쿼리 원인이다.
- "같은 이메일로 두 번 가입돼요"는 기존 "두 번 눌러서 두 번 저장돼요"(버튼 중복)와 달리 DB 규칙(Unique Constraint)으로 막는 일이다.
- "둘이 동시에 고치면 한 사람 것이 사라져요"는 기존 "동시에 사면 재고가 마이너스가 돼요"(back Concurrency·Lock)와 달리 Lost Update다.

"오류·안 됨" 그룹은 지금 89/193개다(측정). 이번에 10개를 더하면 99/205개가 된다. PLAN.md 57줄 칩 재검토 메모의 수치를 고친다.

| 증상 | 그룹 | 연결 카드 |
|---|---|---|
| 데이터가 쌓일수록 목록이 느려져요 | 느림 | Full Table Scan, Index, Query Plan |
| 목록 하나 여는데 쿼리가 수백 번 나가요 | 느림 | N+1 Problem, INNER JOIN |
| JOIN했더니 같은 회원이 여러 줄 나와요 | 오류·안 됨 | One-to-Many, GROUP BY, INNER JOIN |
| 주문 없는 회원이 목록에서 빠져요 | 오류·안 됨 | LEFT JOIN, INNER JOIN |
| 개수가 실제보다 적게 나와요 | 오류·안 됨 | COUNT, NULL, INNER JOIN |
| = NULL로 찾으면 아무것도 안 나와요 | 오류·안 됨 | IS NULL, NULL |
| DB 연결이 꽉 찼다는 오류가 떠요 | 오류·안 됨 | Too Many Connections, Connection Pool |
| deadlock 오류가 떠요 | 오류·안 됨 | Deadlock, Transaction |
| 회원을 지웠더니 주문이 같이 사라졌어요 | 오류·안 됨 | Cascade Delete, Foreign Key |
| 같은 이메일로 두 번 가입돼요 | 오류·안 됨 | Unique Constraint, Data Integrity |
| 실수로 지운 데이터를 되살리고 싶어요 | 오류·안 됨 | Point-in-Time Recovery, Backup, Soft Delete |
| 둘이 동시에 고치면 한 사람 것이 사라져요 | 오류·안 됨 | Lost Update, Optimistic Locking |

"too many connections"는 MySQL 문구이고 PostgreSQL은 "too many clients already"라서(검색 확인, 아래 출처), 증상 문구는 특정 DB 문구 대신 풀어 쓴다. 카드 x에 두 문구를 함께 적는다.

## 7. 진행 순서

범위가 back과 비슷하다(새 43장, 다시 그리기 48장, 도우미 3개). 계획서를 둘로 나눈다. 두 계획서 모두 이 브랜치(`db-category`)에서 이어서 하고, main 병합은 둘이 끝난 뒤 사용자 확인을 받고 한 번 한다.

계획서 ①(도우미·구조·쿼리·설계·다시 그리기):
1. `dbtab()`·`qrun()`·`erd()`와 입력 검사·`after` 값 점검(`dbhelp`). 320px 폭을 break-ui로 재고 한도를 정한다.
2. 하위항목 4개, 점검 기대값(`dbcat`·`dbobj`·`dbukey`·`DB_WRONG`. 옛 카드는 `DB_TODO`로, 그 밖에 안 끝난 항목은 `LATER`)
3. query·model 새 카드 23장
4. 기존 48장 다시 그리기(직접 조작 4장은 정적 그림으로 먼저 두고 ②에서 바꿈)

계획서 ②(트랜잭션·운영·나머지):
1. tx·ops 새 카드 20장
2. 기존 48장 x 채움
3. 직접 조작 WHERE·Join·Index·Transaction
4. 증상 색인
5. 글꼴·문서(PRODUCT/PLAN/DESIGN)·전체 점검, `LATER` 비우기

디렉터 검토:
1. 이 설계서
2. 계획서 ①·②
3. 구현 묶음: 도우미 / 카드 / 그림·문구마다, 마지막에 최종 검토

Critical·Important·Minor 모두 고친다(사용자 지시: 미룬 것도 다 고치고 똑같이 검토).

## 8. 점검과 완료 기준

자동 점검:
- `node tests/check.mjs`가 전부 통과하고 `LATER`가 비어 있다(계획서 ② 끝).
- 개수
  - 전체 카드 1,572개(1,529 + 43, `total`)
  - 증상 205개(193 + 12, `symcount`와 새 증상 목록 `SYM_DB` 점검)
  - 다른 카테고리 개수는 그대로다.
  - 영문명 중복이 없고(정규화 비교 포함), 관련 용어·증상 대상이 모두 있다.
- PRODUCT.md 개수 표기가 실제와 같다.
- 직접 조작 4장: `init`이 있고, 결과 문장에 `aria-live`가 있고, 문장 갱신은 `psay`로 한다. check.mjs `board(h)` 가짜 판으로 실제 init을 돌려 결과 문장이 바뀌는지 본다(back `bkdmrun`과 같은 식).
- 재생 버튼이 붙는 새 그림(`m:1`)에 움직이는 요소(`A` 클래스)가 있다.
- db 카드의 객체 v가 0장이다(`dbobj`). 91장 모두 `u-db-` 키를 쓴다(`dbukey`). 하위항목 순서가 맞다(`dbcat`).
- 뜻이 다른 짝(4장 목록)에는 r이 없다(`DB_WRONG`).
- 데이터베이스 카테고리 모든 카드에 x가 있다. o:1이면 u가 있다.
- `dbtab()`·`qrun()`·`erd()`가 한도를 넘거나 잘못된 입력을 받으면 오류를 던진다. `after` 결과 칸이 실행 전 표·숫자·NULL·강조 칸 밖의 값이면 오류다(`dbhelp`).
- 읽히는 글의 기호 점검(`wsym`)을 db 카드 전체에 적용한다.

브라우저(playwright) 확인:
- 320/375/1280 세 폭과 reduced-motion에서 넘침 0, 11px 미만 글자 0, 콘솔 오류 0
- reduced-motion에서 자동 재생이 없고, 재생 버튼이 동작한다.
- 직접 조작 4장을 키보드로 조작할 수 있다.

그 밖:
- 디자인 품질: break-ui(`dbtab` 3열 × 5행 × 10폭, `qrun` 표 2개 + SQL 4줄 × 28폭 + 결과 표 2개, `erd` 표 3개 × 열 4개 × 10폭)로 보고, better-ui·better-layout으로 그림을 다듬는다.
- 그림 표(3.4·3.5)에 적은 `seq` 글·열 이름·칸 값이 도우미 한도 안에 드는지 계획서에서 카드마다 `wlen`으로 다시 센다. 실제 입력은 도우미 입력 검사가 마지막으로 막는다.
- 문구: x·d는 better-writing·ux-writing 기준(짧고, 차이 먼저, 해요체)으로 쓴다.
- 직접 조작은 better-accessibility로 키보드·읽기 순서를 본다.
- 정의·설명의 사실은 Task마다 PostgreSQL 공식 문서로 검색해 확인하고 출처를 원장에 남긴다. 설계 단계 확인(검색, 2026-11-03):
  - PostgreSQL의 READ UNCOMMITTED는 READ COMMITTED처럼 동작해 Dirty Read가 일어나지 않는다([PostgreSQL 16 Transaction Isolation](https://www.postgresql.org/docs/16/transaction-iso.html)).
  - `count(*)`는 모든 행, `count(식)`은 NULL이 아닌 행만 센다([Neon count](https://neon.com/docs/functions/count), PostgreSQL 집계 함수 표는 계획서에서 다시 확인).
  - 명시적 잠금은 deadlock 가능성을 높이고, DB가 deadlock을 찾으면 한 트랜잭션을 취소한다([PostgreSQL Explicit Locking](https://postgrespro.com/docs/postgresql/10/explicit-locking), 최신 판은 계획서에서 다시 확인).
  - 연결 한도 오류는 PostgreSQL "too many clients already", MySQL "Too many connections"(1040)다([Baeldung](https://www.baeldung.com/sql/psqlexception-fatal-sorry-too-many-clients-already-solution), [Bytebase](https://bytebase.com/reference/mysql/error/1040-too-many-connections)). 공식 문서로 계획서에서 다시 확인한다.

## 9. 글꼴

새 문구에 Hahmlet 서브셋에 없는 글자가 있으면 font 점검이 실패한다. 주석에 쓴 글자도 포함된다.
- 문구를 모두 넣은 뒤(계획서 ② 5단계) 서브셋을 다시 만든다.
- 중간 Task에서는 없는 글자를 피하거나, 그 Task 안에서 서브셋을 갱신한다.

## 10. 위험

| 위험 | 대응 |
|---|---|
| 작업량이 커서 컨텍스트가 압축됨 | 계획서 둘로 나눔, 원장(`.superpowers/sdd/…/progress.md`), 체크포인트 메모리, Task마다 커밋 |
| SQL 문법이 DB마다 다름 | 표준 SQL로 쓰고, 다른 부분은 x에 "DB마다 달라요". 오류 문구는 "(PostgreSQL 예)" 표시 |
| `after`로 적은 결과가 쿼리와 어긋남 | 줄만 거르는 쿼리는 `pick`으로 계산, `after`는 값 점검(3.2), 디렉터 검토에서 결과를 쿼리와 한 줄씩 대조 |
| `qrun` 표 두 개·`dbtab` 3열 × 10폭이 320px에 안 들어감 | 세로로 쌓고, 계획서 ① Task 1에서 break-ui로 재서 칸 안 줄바꿈·여백 조정으로 넘침 0을 지킴(폭 한도는 낮추지 않음) |
| 예시 데이터가 실제 개인정보처럼 보임 | 민수·지영·준호와 `m@a.com` 같은 짧은 가짜만, 전화·주소는 줄임표 |
| 트랜잭션·잠금 설명이 back(Lock·Concurrency)·bug(Race Condition)와 어긋남 | 그 카드 본문은 바꾸지 않고 r로만 잇고, x에서 차이를 씀 |
| 같은 뜻 카드가 다른 이름으로 또 생김 | `dup` 정규화 비교, 계획서마다 다른 카테고리 d와 대조 |
| 기존 r 연결이 다른 카테고리 카드를 가리킴 | r 값만 추가하고 그 카드 본문은 바꾸지 않음 |
