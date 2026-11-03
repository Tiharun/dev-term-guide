# 데이터베이스 카테고리 보강 실행 계획 ②

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 계획서 ①(도우미·하위항목·query·model·다시 그리기, 끝남)에 이어 데이터베이스를 마친다.
- tx·ops 새 카드 20장
- 기존 48장 x
- 직접 조작 4장(WHERE·Join·Index·Transaction)
- 증상 12개
- 글꼴·문서·전체 점검. 끝나면 `LATER`가 비어 있다.

**Architecture:** `index.html` 하나에서 작업한다.
- 카드: `T('db','tx',[…])`·`T('db','ops',[…])`를 `T('db','model',…)` 뒤, `T('db','tip',…)` 앞에 둔다.
- 그림: `/* db: tx·ops … */` 주석과 `Object.assign(D, {...})`를 `/* db: 다시 그리기 basic·core·motion` 묶음 앞에 둔다.
- 직접 조작: 계획서 ① 상태 함수(`dwhere`·`djoin`·`dindex`·`dtx`와 `…Say`)를 그대로 쓴다. 그림 4장(`u-db-where`·`u-db-join`·`u-db-index`·`u-db-transaction`)의 `h`를 바꾸고 `init`을 더한다.
- 증상: `SYM('오류·안 됨',[…])`(지금 3741줄)과 `SYM('느림',[…])`(3721줄) 끝에 붙인다. 계획서 ① 뒤 줄이 바뀌므로 `grep -n "^SYM('"`로 찾는다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, Python fontTools(`font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-03-db-category-design.md](../specs/2026-11-03-db-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치·원장**: `db-category`에서 계속한다. 원장은 이 계획서의 작업 폴더(`sdd-workspace`가 알려 줌)에 새로 만든다. 계획서 ① 원장(`…/2026-11-03-db-category-1/progress.md`)의 `Ruling:` 줄은 읽기만 한다.
- **고르기 버튼 찾기**: `tpick`은 `data-k`에 `esc(이름)`을 넣는다(index.html:3893). `age > 20`은 `data-k="age &gt; 20"`이 되어, 브라우저 `dataset.k`(`age > 20`)와 가짜 판 `board`의 값(`age &gt; 20`)이 다르다. 그래서 init과 `dbdmrun`은 고르기 버튼을 **순서(번호)**로 찾고, 값 비교를 하지 않는다.
- **켜고 끄기 버튼**: Transaction의 "중간에 실패"는 버튼 하나짜리 `tpick(['중간에 실패'], '')`(처음 `aria-pressed="false"`)를 `<div role="group" aria-label="실패 켜고 끄기">`로 감싼다. 누를 때마다 `aria-pressed`를 바꾼다. 한 번 누르는 버튼(찾기·실행·처음으로)은 `aria-pressed` 없이 `<button type="button" class="mk-tkey">`다(back 판정).
- **직접 조작 처음 그림**: 계획서 ①의 멈춘 그림은 결과까지 보인 장면(`dindex(false, true)`·`dtx(true, true)`)이다. 직접 조작은 누르기 전 장면에서 시작한다: WHERE `dwhere(0)`, Join `djoin('INNER')`, Index `dindex(false, false)`, Transaction `dtx(false, false)`.
- **seq 한도**(계획서 ① 따름): 세로줄 3개면 이름 wlen 8, 메시지 wlen 14, 8개까지. 이 계획에서 새로 쓰는 세로줄 이름은 `앱`·`A`·`B`·`DB`·`서버`·`원본 DB`·`복제 DB`(7)다.
- **글꼴**: Task 1~4에서 새 글자가 서브셋에 없으면 `LATER font` 줄이 나올 수 있다. Task 5에서 서브셋을 다시 만든다. 스크립트는 `C:/Users/HELLOW~1/AppData/Local/Temp/claude/C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide/af217e6a-1338-434d-ad6c-2e7d9f6e9d35/scratchpad/font_subset.py`와 같은 폴더의 `fontsrc/Hahmlet.ttf`다(측정, back 때 쓴 것). 이 계획의 scratchpad로 복사해 쓴다.
- **사실 확인 출발점**(검색 2026-11-03, Task마다 PostgreSQL 공식 문서로 다시 연다):
  - `statement_timeout`을 넘으면 "canceling statement due to statement timeout"으로 취소된다([pulse.support](https://pulse.support/kb/postgresql-statement-timeout), [pgsql-general](https://www.postgresql.org/message-id/CAJNY3itfdY5vRf60OhXM5Kdbki3%2BG2%2BLXxJZ5Q32t2pt4R_FEQ%40mail.gmail.com)).
  - PostgreSQL 18 B-tree skip scan으로 앞 열이 없는 조건에도 여러 열 인덱스가 쓰일 수 있다. 앞 열 값 종류가 적을 때 효과가 크다([Neon](https://neon.com/postgresql/postgresql-18/skip-scan-btree), [pgEdge](https://www.pgedge.com/blog/postgres-18-skip-scan-breaking-free-from-the-left-most-index-limitation)).
  - pg_dump 기본(plain) 출력은 데이터를 COPY로 쓰고, `--inserts`면 INSERT로 쓴다([pg_dump 문서](https://postgresql.org/docs/8/app-pgdump.html), 최신 판은 Task 1에서 연다).

## Global Constraints

계획서 ①의 Global Constraints를 그대로 따른다([2026-11-03-db-category-1.md](2026-11-03-db-category-1.md) "Global Constraints"). 그중 이 계획에서 자주 걸리는 것:
- 색은 도판 토큰만 쓰고, 그림 글자는 11px 이상이다.
- `m:1` ⇔ 그림 h에 `A`가 있다. still이 아닌 `seq`·`track`·`doc`·`term`·`qrun`이 `A`를 만든다. 직접 조작 그림은 `m`이 없다. `dbm`이 본다.
- 읽히는 글에 `✓✕★→←↑↓`를 쓰지 않는다. 숫자·시간은 "(예시)"를 붙이고, 접속 비밀번호는 `****`다. DB 오류 원문은 "(PostgreSQL 예)"로 cap·x에 쓴다.
- 카드 문구:
  - 새 카드 `d`·`x`는 해요체다. `x`는 2~3문장이고, 짝과의 차이를 먼저 쓴다.
  - `p`는 정식 용어를 넣고 "~해줘"로 끝낸다. `l`은 1~3이다. `ko`는 `한글 · 풀이` 형식이다.
- `r`은 1~3개이고, 스펙 4장 후보 중 이미 있는 카드만 단다. `DB_WRONG` 짝은 r에 넣지 않는다. 다른 카테고리 카드 본문은 바꾸지 않는다.
- `o:1`은 PostgreSQL 공식 문서를 직접 열어 확인했을 때만 쓰고, 그때 `u`를 단다.
- 커밋:
  - 한국어 `feat:`/`fix:`/`docs:`로 쓰고 attribution 줄을 넣지 않는다.
  - `.impeccable/hook.cache.json`·`core375.png`는 올리지 않고, 경로를 지정해 올린다.
- Python은 `newline='\n'`로 쓰고 `python -E`로 돌린다.
- 브라우저는 Playwright MCP로 본다. 평소 Chrome 프로필은 쓰지 않는다.

## Review Focus

1. **직접 조작 키보드**: Tab으로 모든 버튼에 가고 Enter·Space로 누를 수 있어야 한다.
   - 결과 문장(`aria-live="polite"`)이 바뀌어야 한다.
   - 고르는 버튼의 `aria-pressed`는 하나만 `true`다. "중간에 실패"는 누를 때마다 `true`·`false`가 바뀐다.
   - 버튼을 20번 눌러도 320px에서 그림판 밖으로 넘치지 않아야 한다. `.mk-hint`(absolute)가 그림과 겹치지 않아야 한다.
   - → Task 3 브라우저 확인
2. **바꾼 뒤 상태**: 조건·조인·인덱스를 바꾸면 그림과 문장이 새 값으로 바로 바뀐다. 인덱스를 바꾸면 "읽음" 표시가 지워지고 "찾기를 눌러 보세요"로 돌아간다. 실패를 켜고 끄면 실행 결과가 지워진다. "처음으로"는 잔액을 처음 값(50000·10000)으로 되돌린다. → Task 3 `dbdmrun`
3. **트랜잭션·잠금 사실**:
   - PostgreSQL에서 READ UNCOMMITTED는 READ COMMITTED처럼 동작해 Dirty Read가 일어나지 않는다.
   - Deadlock이면 DB가 한쪽을 취소하고, 어느 쪽인지는 정할 수 없다.
   - `SELECT … FOR UPDATE`는 다른 쓰기·`FOR UPDATE`를 기다리게 하지만 그냥 SELECT는 막지 않는다.
   - Optimistic Locking은 DB 잠금이 아니라 version 열 비교다.

   PostgreSQL 공식 문서와 다르면 안 된다. → Task 1 사실 확인, 디렉터 검토 D
4. **연결·시간 초과 오류 문구**: PostgreSQL은 "too many clients already", MySQL은 "Too many connections"다. 증상 문구는 특정 DB 문구 대신 풀어 쓰고, 두 원문은 카드 x에만 쓴다. Query Timeout은 "canceling statement due to statement timeout"(PostgreSQL 예)이다. → Task 1 `DB_XHAS`, Task 4 증상
5. **연결 주소 비밀번호**: Connection String 그림·x에 가리지 않은 비밀번호가 없어야 한다(`postgres://app:****@…`). 320px에서 긴 주소가 줄바꿈된다. → Task 1 `dbsafe`·브라우저 확인

---

## 공통 절차 (Task 1~5)

계획서 ①의 공통 절차·브라우저 확인 절차를 따른다([2026-11-03-db-category-1.md](2026-11-03-db-category-1.md) "공통 절차"). 다른 점:
- **그림 띄우기**: 그림은 스크롤해야 그려진다. `page.mouse.wheel(0, 700)`을 30번 하고 잰다.
- **폭·움직임**: 1280/375/320 × reducedMotion `no-preference`/`reduce`. 넘침·11px 미만·가로 스크롤·콘솔 오류(favicon 404 제외)가 0이어야 한다.
- **긴 점검**: `node tests/check.mjs > <작업 폴더>/run.txt 2>&1` 뒤 `grep -E '^(FAIL|OK|LATER)'`로 본다. Bash timeout은 200000이다.

### 디렉터 검토 시점

디렉터 에이전트(Opus 5.5, effort high)에게 맡긴다.
- **묶음 D — 새 카드**: Task 1 뒤
- **묶음 E — x·직접 조작**: Task 3 뒤(Task 2~3 diff)
- **최종 검토**: Task 5 뒤 브랜치 전체(`git merge-base main HEAD`..HEAD). 계획서 ①·② Review Focus를 같이 준다.

결과 처리:
- Critical·Important·Minor를 모두 고친다(사용자 지시). 고칠 것은 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN).
- 고친 뒤 같은 디렉터에게 재확인을 맡기고, 0건이 될 때까지 되풀이한다.
- 원장에 `Review <묶음>: fixed …`로 적는다. 고치지 않는 지적은 `Ruling:`에 이유를 적는다.

---

### Task 1: tx·ops 새 카드 20장 (공통 절차)

쓸 스킬: design-skills:ux-writing·interfaces:better-writing(d·x), superpowers:test-driven-development

**Files:**
- Modify: `index.html`
  - 카드: 새 블록 `T('db','tx',…)`·`T('db','ops',…)`
  - 그림: `/* db: tx·ops … */` 묶음
- Modify: `tests/check.mjs`: EXPECT·COUNT·total, `DB_XHAS`·`dbxhas`

**Interfaces:**
- Consumes: `dbtab`(계획서 ①), `seq`·`track`·`doc`·`term`·`fcss`·`bkStack`
- Produces: 카드 20장. Task 4 증상이 연결 대상으로 쓴다(Deadlock·Too Many Connections·Connection Pool·Full Table Scan·Query Plan·Point-in-Time Recovery·Lost Update·Optimistic Locking).

- [ ] **Step 1: 실패하는 점검**
  - `EXPECT['db/tx']`·`EXPECT['db/ops']`: 아래 표 순서
  - `COUNT`: `db/tx` 0→10, `db/ops` 0→10
  - `total`: 1552→1572
  - `DB_XHAS`와 점검 `dbxhas`를 `dbxn` 뒤에 더한다. 그 카드의 x에 목록 글이 모두 있어야 한다.

```js
const DB_XHAS = {'Isolation Level': ['READ COMMITTED'], 'Dirty Read': ['PostgreSQL'], 'Deadlock': ['deadlock detected'], 'Pessimistic Locking': ['SELECT'],
  'Too Many Connections': ['too many clients already', 'Too many connections'], 'Query Timeout': ['statement timeout'], 'Composite Index': ['왼쪽'],
  'Autocommit': ['BEGIN'], 'Optimistic Locking': ['version']};    // x에 꼭 있어야 할 말(Review Focus 3·4). Task 2가 옛 카드를 더한다
check('dbxhas', () => Object.entries(DB_XHAS).filter(([en, w]) => { const t = g.find(en); return !t || !w.every(s => (t.x || '').includes(s)); }).map(([en]) => en).join(', '));
```

- [ ] **Step 2: 실패 확인**: 다음 `FAIL`이 나온다.
  - `expect:db/tx`·`expect:db/ops`
  - `count:db/tx: 0 ≠ 10`·`count:db/ops: 0 ≠ 10`
  - `total`, `dbxhas: Isolation Level, Dirty Read, …`(9개)
- [ ] **Step 3~5**: 공통 절차 3~5
  - 모든 새 카드에 `x`와 `v:'u-db-<slug>'`를 넣는다. slug는 `Point-in-Time Recovery`→`point-in-time-recovery` 식이다.
  - 통과하면 `FAIL` 없이 `OK`가 나온다. `LATER`에는 doccount(1572)와 font만 남을 수 있다.
- [ ] **Step 6: 브라우저 확인**: `#/c/db/tx`·`#/c/db/ops` × 3폭 × 2움직임. Connection String 주소가 320px에서 줄바꿈되는지 본다.
- [ ] **Step 7: 커밋**: `feat: 데이터베이스 트랜잭션·운영 새 카드`

**카드와 그림**(`{0→1 '…'}`는 `{from:0, to:1, t:'…'}`를 줄여 쓴 것이다. 숫자·이름은 예시):

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| tx | ACID | 에이시드 · 트랜잭션이 지키는 네 약속 | `doc([{tb:[['약속','뜻'],['원자성','다 되거나 다 안 돼요'],['일관성','규칙을 지킨 상태로 끝나요'],['격리성','동시에 해도 섞이지 않아요'],['지속성','확정하면 꺼져도 남아요']]}], {title:'ACID'})` | Transaction |
| tx | Autocommit | 자동 커밋 · 한 문장마다 바로 확정 | `seq(['앱','DB'], [{0→1 'UPDATE 재고'}, {1→1 '바로 확정'}, {0→1 'UPDATE 주문'}, {1→1 '바로 확정'}])`. cap "BEGIN이 없으면 한 문장씩 바로 확정돼요" | Transaction |
| tx | Savepoint | 세이브포인트 · 트랜잭션 안의 되돌릴 지점 | `seq(['앱','DB'], [{0→1 'BEGIN'}, {0→1 '주문 저장'}, {0→1 'SAVEPOINT a'}, {0→1 '쿠폰 적용', err:1}, {0→1 'ROLLBACK TO a'}, {0→1 'COMMIT'}])`. cap "쿠폰만 취소하고 주문은 남겨요" | Rollback, Transaction |
| tx | Isolation Level | 격리 수준 · 동시에 고칠 때 얼마나 떼어 놓을지 | `doc([{tb:[['수준(PostgreSQL)','막아 주는 일'],['READ COMMITTED','확정 전 값 읽기(기본값)'],['REPEATABLE READ','다시 읽으면 바뀌는 일'],['SERIALIZABLE','하나씩 한 것과 다른 결과']]}], {title:'격리 수준'})`. cap "READ UNCOMMITTED는 READ COMMITTED처럼 동작해요. 표준 SQL 표와 조금 달라요" | Dirty Read, Transaction |
| tx | Dirty Read | 더티 리드 · 확정 전 값을 읽음 | `seq(['A','DB','B'], [{0→1 '확정 전 수정'}, {2→1 '읽기'}, {1→2 '바뀐 값'}, {0→1 'ROLLBACK'}, {2→2 '사라진 값 씀', err:1}])`. cap "표준은 가장 낮은 수준에서 허용하지만 PostgreSQL은 막아요" | Isolation Level |
| tx | Lost Update | 갱신 손실 · 나중 저장이 앞 저장을 덮음 | `seq(['A','DB','B'], [{0→1 '재고 읽기'}, {1→0 '10'}, {2→1 '재고 읽기'}, {1→2 '10'}, {0→1 '9로 씀'}, {2→1 '9로 씀'}])`. cap "둘이 하나씩 팔았는데 재고는 9예요(8이어야 해요)" | Race Condition, Concurrency, Optimistic Locking |
| tx | Deadlock | 교착 상태 · 서로 기다리다 멈춤 | `seq(['A','DB','B'], [{0→1 '1번 줄 잠금'}, {2→1 '2번 줄 잠금'}, {0→1 '2번 줄 요청', wait:1}, {2→1 '1번 줄 요청', wait:1}, {1→2 '취소', err:1}])`. cap "DB가 한쪽을 취소해요. 어느 쪽일지는 정할 수 없어요" | Lock, Transaction |
| tx | Optimistic Locking | 낙관적 잠금 · 저장할 때 바뀌었는지 확인 | `seq(['앱','DB'], [{0→1 'v=3일 때 수정'}, {1→0 '0줄 바뀜', err:1}, {0→0 '다시 읽기'}, {0→1 'v=4일 때 수정'}, {1→0 '1줄 바뀜'}])`. cap "v는 고칠 때마다 1씩 느는 version 열이에요. 그사이 누가 고쳐 4가 됐어요" | Lost Update, Pessimistic Locking |
| tx | Pessimistic Locking | 비관적 잠금 · 읽을 때부터 잠금 | `seq(['A','DB','B'], [{0→1 'FOR UPDATE'}, {2→1 'UPDATE', wait:1}, {0→1 'COMMIT'}, {1→2 '진행'}])`. cap "B는 A가 끝날 때까지 기다려요. 그냥 SELECT는 막지 않아요" | Lock, Optimistic Locking |
| tx | Connection Pool | 연결 풀 · 미리 열어 둔 DB 연결 | `track([{t:'미리 연 연결 5개', s:'done', w:'(예시)'}, {t:'요청이 하나 빌림', s:'done', w:'남은 연결 4개'}, {t:'쿼리 실행', s:'now'}, {t:'돌려줌', s:'done', w:'다시 5개'}])` | Too Many Connections |
| ops | Query Plan | 쿼리 계획 · DB가 정한 찾는 방법 | `term([{c:'EXPLAIN SELECT …'}, {o:'Seq Scan on users'}, {c:'CREATE INDEX …'}, {c:'EXPLAIN SELECT …'}, {o:'Index Scan using users_email_idx'}], {title:'psql', prompt:'shop=#'})`. cap "Seq Scan은 표 전체를, Index Scan은 인덱스로 찾아요" | Index, Slow Query |
| ops | Full Table Scan | 전체 테이블 스캔 · 처음부터 끝까지 다 읽기 | `track([{t:'1번째 줄 읽음', s:'done'}, {t:'2번째 줄 읽음', s:'done'}, {t:'3번째 줄 읽음', s:'now'}, {t:'마지막 줄까지', s:'wait', w:'10만 번째(예시)'}])`. cap "같은 값이 더 있을 수 있어 끝까지 봐요" | Index, Query Plan |
| ops | Composite Index | 복합 인덱스 · 열 여럿을 묶은 색인 | `doc([{p:'인덱스 (city, age)'}, {tb:[['조건','쓰임'],["city = '서울'",'잘 쓰여요'],['city와 age 둘 다','잘 쓰여요'],['age만','덜 효율적이에요']]}], {title:'복합 인덱스'})`. cap "왼쪽 열부터 쓰여요(PostgreSQL 18부터는 age만이어도 쓰일 때가 있어요)" | Index |
| ops | Read Replica | 읽기 복제본 · 읽기만 나눠 받는 DB | `seq(['서버','원본 DB','복제 DB'], [{0→1 '글 쓰기'}, {1→2 '복사', wait:1}, {0→2 '글 읽기'}, {2→0 '아직 옛 글'}])`. cap "읽기를 나눠 맡기지만 복사가 조금 늦을 수 있어요" | Replication |
| ops | Connection String | 연결 문자열 · DB 접속 주소 한 줄 | `doc([{p:'postgres://app:****@db.example.com:5432/shop'}, {tb:[['부분','뜻'],['app','사용자'],['****','비밀번호(가림)'],['db.example.com','호스트'],['5432','포트'],['shop','DB 이름']]}], {title:'.env 예시'})` | Environment Variable |
| ops | Too Many Connections | 연결 초과 · DB 연결 칸이 꽉 참 | `track([{t:'연결 칸 가득 참', s:'wait', w:'100개 중 100개(예시)'}, {t:'새 요청', s:'fail', w:'연결 거절'}])`. cap "오류 원문: too many clients already(PostgreSQL 예)" | Connection Pool |
| ops | Query Timeout | 쿼리 시간 초과 · 정한 시간을 넘으면 취소 | `track([{t:'쿼리 시작', s:'done'}, {t:'5초 지남', s:'wait', w:'정한 시간(예시)'}, {t:'DB가 쿼리 취소', s:'fail'}])`. cap "오류 원문: canceling statement due to statement timeout(PostgreSQL 예)" | Timeout, Slow Query |
| ops | Point-in-Time Recovery | 시점 복구 · 원하는 시각으로 되살림 | `track([{t:'03:00 백업', s:'done'}, {t:'14:05 실수로 삭제', s:'fail'}, {t:'14:04 시점으로', s:'done', w:'백업 + 변경 기록'}])`. cap "시각은 예시예요. 변경 기록(WAL)을 백업 뒤에 이어 붙여요" | Backup, Restore |
| ops | Database Dump | DB 덤프 · DB를 SQL 파일로 뽑기 | `term([{c:'pg_dump shop > shop.sql'}, {c:'head shop.sql'}, {o:'CREATE TABLE public.users ('}, {o:'COPY public.users (id, name) FROM stdin;'}])`. cap "기본은 COPY 줄, --inserts를 주면 INSERT로 나와요" | Backup, Restore |
| ops | Database Client | DB 클라이언트 · DB를 보는 프로그램 | 전용 HTML(`mk-dg`): 왼쪽 표 목록(`users`·`orders`·`posts`, users 강조) · 오른쪽 위 쿼리 창(`<code>SELECT * FROM users</code>`) · 아래 `dbtab` 결과(users 3줄). 320px에서는 세로로 쌓는다. 끝에 `<p class="sr">` 한 문장 | SQL |

- `m:1`은 `doc`·`seq`·`track`·`term` 카드에 단다(still 아님). Database Client(전용 HTML, `A` 없음)는 없다. `dbm`이 양쪽을 본다.
- 측정(node `wlen`): seq 메시지는 모두 14 이하다(가장 긴 것 `ROLLBACK TO a`·`v=3일 때 수정` 13). 세로줄 이름은 8 이하다(`원본 DB`·`복제 DB` 7). track·doc·term 글은 한도 검사가 없으니 320px 넘침으로 본다. 넘치면 글을 줄이고 원장에 적는다.
- Database Client의 sr: `DB 클라이언트 화면. 표 목록 users, orders, posts. 쿼리 SELECT * FROM users. 결과 users 3줄.` 안쪽 `dbtab`의 sr은 뺀다(qrun과 같은 방식).
- Connection String은 `dbsafe`가 그림을 보므로 `****`이 아닌 비밀번호를 쓰면 바로 잡힌다.

x 짝(스펙 5장). 아래 짝은 x에서 차이를 먼저 쓴다.
- Transaction vs Autocommit vs Savepoint
- ACID vs Isolation Level, Dirty Read vs Lost Update vs Race Condition(bug)
- Deadlock vs Lock(back), Optimistic Locking vs Pessimistic Locking
- Index vs Composite Index vs Full Table Scan, Query Plan vs Slow Query
- Replication vs Read Replica
- Backup vs Database Dump vs Point-in-Time Recovery vs Restore
- Connection Pool vs Too Many Connections, Query Timeout vs Timeout(back)
- Connection String vs Environment Variable(back), Database Client vs SQL

x에 꼭 넣을 사실(`DB_XHAS`가 본다):
- Isolation Level: PostgreSQL 기본값은 READ COMMITTED예요.
- Dirty Read: PostgreSQL은 어느 수준에서도 Dirty Read를 막아요.
- Deadlock: 오류는 deadlock detected(PostgreSQL 예)예요. 잠그는 순서를 같게 하면 줄어요.
- Pessimistic Locking: `SELECT … FOR UPDATE`로 잠가요. 그냥 SELECT는 막지 않아요.
- Too Many Connections: PostgreSQL은 too many clients already, MySQL은 Too many connections로 알려요.
- Query Timeout: `statement_timeout`으로 정하고, 넘으면 canceling statement due to statement timeout이 떠요.
- Composite Index: 왼쪽 열부터 쓰여요. 
- Autocommit: BEGIN으로 묶지 않은 문장은 하나씩 바로 확정돼요.
- Optimistic Locking: version 열 값으로 그사이 바뀌었는지 확인해요. DB 잠금이 아니에요.

뜻이 다른 짝(`dbwrong`): Isolation Level의 x는 test의 Test Isolation(테스트끼리 안 섞임)과, Optimistic Locking의 x는 design Optimistic UI·back Optimistic Update(화면을 먼저 바꿈)와, Autocommit의 x는 git Commit(코드 변경 기록)과, Database Client의 x는 back Client(요청을 보내는 쪽)와 다르다고 쓰고 r에 넣지 않는다.

출처를 Step 3에서 열어 확인한다(PostgreSQL 현재 판 문서).
- Transaction Isolation(기본값·READ UNCOMMITTED 동작·Dirty Read), Explicit Locking(Deadlocks·`FOR UPDATE`·Row-Level Locks)
- SAVEPOINT·ROLLBACK TO SAVEPOINT, BEGIN(자동 커밋 동작)
- Using EXPLAIN(Seq Scan·Index Scan), Multicolumn Indexes(왼쪽 열, skip scan)
- Hot Standby(읽기 전용 복제), Connection Strings(libpq URI 형식)
- `max_connections`·`statement_timeout`(Client Connection Defaults), Continuous Archiving and PITR(WAL), pg_dump(`--inserts`)
- 연결 풀: PgBouncer 공식 문서나 PostgreSQL 위키
- Optimistic Locking: PostgreSQL 문서에 이름이 없으면 o:0으로 두고 1차 자료(ORM 공식 문서)를 원장에 적는다.

뒤이어 **디렉터 검토 묶음 D**

---

### Task 2: 기존 48장 x

쓸 스킬: design-skills:ux-writing·interfaces:better-writing

**Files:**
- Modify: `index.html`: `DB_NOX`에 있는 카드에 `x`를 더한다(`o`·`u` 뒤, `v` 앞).
- Modify: `tests/check.mjs`: `DB_NOX`, `DB_XHAS`

**Interfaces:**
- Consumes: `DB_NOX`(계획서 ① Task 2, 48장), `dbx`·`dbxn`·`dbtext`·`dbxhas` 점검
- Produces: db 91장 전부 x 있음

- [ ] **Step 1: 실패하는 점검**
  - `DB_NOX = []`로 바꾼다.
  - `DB_XHAS`에 옛 카드를 더한다: `'NULL': ['IS NULL'], 'LIMIT': ['ORDER BY'], 'UPDATE': ['WHERE'], 'DELETE': ['WHERE'], 'Foreign Key': ['NO ACTION'], 'Index': ['쓰기'], 'Primary Key': ['NULL'], 'Soft Delete': ['WHERE'], 'Sharding': ['Replication']`
- [ ] **Step 2: 실패 확인**: `FAIL dbx: +Table, +Row, …`(48개), `FAIL dbxhas: NULL, LIMIT, …`(9개)
- [ ] **Step 3: 사실 확인**: 공통 절차 3이다. 카드마다 1차 출처(PostgreSQL 문서 우선, Redis·Supabase는 각 공식 문서)를 열고, 원장에 `Task 2 출처: <en> — <URL>`을 적는다.
- [ ] **Step 4: x 쓰기**: 48장에 x를 넣는다.
  - 2~3문장, 해요체로 쓴다. 짝이 있으면 차이를 먼저 쓴다.
  - 짝은 스펙 5장 목록이다. 특히:
    - Table vs Spreadsheet vs DB, Row vs Column, Query vs SQL
    - Primary Key vs Foreign Key vs Unique Constraint, Primary Key vs Composite Key·Surrogate Key(계획서 ① 카드)
    - Join vs INNER JOIN·LEFT JOIN, WHERE vs HAVING, GROUP BY vs DISTINCT
    - NULL vs 빈 글자 vs 0, Relation vs One-to-Many·Many-to-Many, ERD vs Schema
    - Normalization vs Denormalization, Hard Delete vs Soft Delete vs DELETE
    - Transaction vs Autocommit, Rollback vs Restore
    - Replication vs Read Replica vs Sharding vs Backup, Backup vs Database Dump·Point-in-Time Recovery
    - Redis vs RDBMS, Index vs Composite Index·Full Table Scan
  - `DB_XHAS` 사실:
    - NULL: 찾을 때는 `= NULL`이 아니라 IS NULL을 써요.
    - LIMIT: ORDER BY 없이 쓰면 어떤 줄이 나올지 정해지지 않아요.
    - UPDATE·DELETE: WHERE를 빼면 모든 줄이 바뀌거나 지워져요.
    - Foreign Key: 기본 동작(NO ACTION)이면 참조된 줄을 지우는 DELETE는 막혀요.
    - Index: 읽기는 빨라지지만 쓰기마다 인덱스도 고쳐야 해서 쓰기가 조금 느려져요.
    - Primary Key: 겹칠 수 없고 NULL도 안 돼요.
    - Soft Delete: 목록을 읽을 때마다 `WHERE deleted_at IS NULL`을 붙여야 해요.
    - Sharding: Replication은 같은 데이터를 복사하고, 샤딩은 데이터를 나눠 담아요.
  - Task 1·계획서 ①에서 생긴 새 카드와의 차이도 쓸 수 있다(예: Transaction vs Savepoint).
  - 다른 카테고리 카드 본문은 고치지 않는다.
- [ ] **Step 5: 통과**: `dbx`·`dbxhas`·`dbtext`·`dbxn`·`wsym`이 통과한다. 다른 `FAIL`은 없다.
- [ ] **Step 6: 브라우저 확인**: x는 카드를 펼쳐야 보인다. `#/c/db/basic`·`core`·`motion`·`adv`·`sql`·`tip`에서 카드 하나씩 펼쳐 320px 넘침이 없는지 본다.
- [ ] **Step 7: 커밋**: `feat: 데이터베이스 기존 카드 48장 쉬운 설명`

---

### Task 3: 직접 조작 4장

쓸 스킬: interfaces:better-accessibility(키보드·읽기 순서), superpowers:test-driven-development

**Files:**
- Modify: `index.html`: `u-db-where`·`u-db-join`·`u-db-index`·`u-db-transaction`의 `h`·`cap`·`init`
- Modify: `tests/check.mjs`: `DBDM`·`DBP`·`dbdm`·`dbdmrun`(`bkdmrun` 뒤)

**Interfaces:**
- Consumes:
  - `DWH`, `dwhere(i)`, `dwhereSay(i)`(계획서 ① Task 5)
  - `djoin(kind)`, `djoinSay(kind)`, `dindex(has, ran)`, `dindexSay(has, ran)`, `dtx(fail, ran)`, `dtxSay(fail, ran)`(계획서 ① Task 4)
  - `tpick(names, on)`, `psay(el, m)`, `board(h)`(check.mjs:603)
- Produces: 그림 4장의 `init`. 상태 함수의 서명은 바꾸지 않는다.

**상태와 버튼**(결과 문장 `.mk-hint aria-live="polite"`은 `psay`로 바꾼다. init 안에서는 `s.querySelector`·`s.querySelectorAll`만 쓰고 window·document는 쓰지 않는다. 고르기 버튼은 `pk = ks.filter(x => x.dataset.k)`의 순서로 다룬다):

| 카드 | 처음 상태 | 버튼 | 누르면 |
|---|---|---|---|
| WHERE | `w = 0` | `tpick(DWH.map(c => c.k), DWH[0].k)`(그룹 "조건 고르기") | 고르기 `i`번: `w = i`. 그림 `dwhere(w)`, 문장 `dwhereSay(w)`, `aria-pressed`는 `i`번만 `true` |
| Join | `k = 'INNER'` | `tpick(['INNER', 'LEFT'], 'INNER')`(그룹 "조인 고르기") | 고르기: `k = ['INNER', 'LEFT'][i]`. 그림 `djoin(k)`, 문장 `djoinSay(k)` |
| Index | `has = false`, `ran = false` | `tpick(['인덱스 없음', '인덱스 있음'], '인덱스 없음')`(그룹 "인덱스 고르기"), "찾기" | 고르기: `has = i === 1`, `ran = false`. 찾기: `ran = true`. 그림 `dindex(has, ran)`, 문장 `dindexSay(has, ran)` |
| Transaction | `fail = false`, `ran = false` | `tpick(['중간에 실패'], '')`(그룹 "실패 켜고 끄기"), "실행", "처음으로" | 실패: `fail = !fail`, `ran = false`, 그 버튼 `aria-pressed = fail`. 실행: `ran = true`. 처음으로: `ran = false`(`fail`은 그대로). 그림 `dtx(fail, ran)`, 문장 `dtxSay(fail, ran)` |

- 그림판 h는 `<div class="mk-mobox">…</div>` + 고르기 그룹(`<div role="group" aria-label="…">${tpick(…)}</div>`) + (있으면) 한 번 누르는 버튼 줄 `.mk-tkeys` + `<span class="mk-hint" aria-live="polite">`이다(`u-back-idempotent`, index.html:7759 형식).
- 처음 h는 스펙 보충의 "직접 조작 처음 그림"이고, 처음 문장은 그 상태의 `…Say`다(Index `'찾기를 눌러 보세요'`, Transaction `'실행을 눌러 보세요'`).
- 그림 안의 `qrun`·`dbtab`은 `label`을 넘기지 않는다(`board`가 mobox 끝을 `</div><div role="group"`으로 찾기 때문, check.mjs:605).
- `cap`은 할 일을 말한다.
  - WHERE: "조건을 바꿔 가며 어떤 줄이 남는지 보세요"
  - Join: "INNER와 LEFT를 바꿔 준호 줄을 보세요"
  - Index: "인덱스 없음과 있음에서 각각 찾기를 눌러 보세요"
  - Transaction: "실행해 보고, 중간에 실패를 켠 뒤 다시 실행해 보세요"
- 계획서 ①의 `dbstill`(멈춘 그림 단언)은 상태 함수를 보므로 그대로 둔다.

- [ ] **Step 1: 실패하는 점검**
  ```js
  const DBDM = {'WHERE': ["city = '서울'", 'age &gt; 20', 'age &gt; 30', 'aria-pressed', 'aria-live'], 'Join': ['INNER', 'LEFT', 'aria-pressed', 'aria-live'],
    'Index': ['인덱스 없음', '인덱스 있음', '찾기', 'aria-pressed', 'aria-live'], 'Transaction': ['중간에 실패', '실행', '처음으로', 'aria-pressed', 'aria-live']};    // 직접 조작 그림: 영문명 → h에 있어야 할 글
  const DBP = en => { const t = g.TERMS.find(x => x.c === 'db' && x.en === en); return t && g.D[t.v]; };
  ```
  - `dbdm`: `bkdm`(check.mjs:602)과 같은 방식이다. `init`이 있고, `String(init)`에 `psay`가 있고, h에 목록 글과 `class="mk-mobox"`·`class="mk-hint"`가 모두 있어야 한다.
  - `dbdmrun`: `bkdmrun`(check.mjs:611)과 같이 `board(h)`로 init을 돌린다(`ctx.setTimeout = f => f()`, `finally`에서 되돌림). 고르기 버튼은 `s.keys.filter(b => b.dataset.k)[i]`로 찾고, 한 번 누르는 버튼은 `s.key('찾기')`처럼 글자로 찾는다. 단언:
    - 첫 장면: 네 장 모두 `s.hint.textContent`가 처음 `…Say`와 같고, `s.box.innerHTML`이 처음 그림과 같다.
    - WHERE: 2번 고르기 → 그림 `=== dwhere(1)`, 문장 `dwhereSay(1)`, 2번만 `aria-pressed="true"`. 3번 → 문장에 `1줄`.
    - Join: LEFT → 그림 `=== djoin('LEFT')`, 문장에 `NULL`, LEFT만 `true`. INNER → 문장에 `빠졌어요`.
    - Index: 찾기 → 문장 `5줄을 다 읽었어요`, 그림에 `>읽음<` 5개. 있음 고르기 → 문장에 `찾기`, 그림에 `읽음` 없음. 찾기 → 문장 `색인으로 1줄만 읽었어요`.
    - Transaction: 실행 → 문장이 `COMMIT`으로 시작, 그림에 `40000`. 처음으로 → 문장 `실행을 눌러 보세요`, 그림에 `40000` 없음. 실패 → 그 버튼 `aria-pressed="true"`. 실행 → 문장이 `ROLLBACK`으로 시작, 그림에 `>실패<`·`50000`. 실패 다시 → `"false"`.
- [ ] **Step 2: 실패 확인**: `FAIL dbdm: WHERE, Join, Index, Transaction`·`FAIL dbdmrun`
- [ ] **Step 3: 구현**: 위 표대로 h·cap·init을 바꾼다.
- [ ] **Step 4: 통과**: `FAIL` 없음
- [ ] **Step 5: 브라우저·키보드 확인**: `#/c/db/core`(Index·Transaction), `#/c/db/motion`(Join), `#/c/db/sql`(WHERE). 공통 절차 확인에 더해 Playwright로 다음을 본다.
  - Tab으로 버튼에 포커스가 가고(`document.activeElement`가 `.mk-tkey`), Enter·Space로 누른다.
  - 결과 문장 글이 바뀐다(psay 150ms 뒤 확인).
  - 고르기 그룹의 `aria-pressed="true"`가 하나뿐이다. "중간에 실패"는 누를 때마다 바뀐다.
  - 각 버튼 20번 뒤 320px에서 넘침이 0이다.
  - 가장 긴 문장일 때 320px에서 `hint.getBoundingClientRect().bottom <= mobox.getBoundingClientRect().top`이다. 겹치면 위 여백을 늘리고 원장에 적는다.
  - reduce 모드에서도 버튼이 동작한다.
- [ ] **Step 6: 커밋**: `feat: 데이터베이스 직접 조작 4장`

뒤이어 **디렉터 검토 묶음 E**(Task 2~3)

---

### Task 4: 증상 12개

**Files:**
- Modify: `index.html`: `SYM('오류·안 됨',[…])` 끝에 10개, `SYM('느림',[…])` 끝에 2개
- Modify: `tests/check.mjs`: `SYM_DB`(388줄 `SYM_BACK` 뒤), `symcount` 193→205

**Interfaces:**
- Consumes: 계획서 ①·Task 1 카드(연결 대상)
- Produces: 증상 205개

- [ ] **Step 1: 실패하는 점검**
  - `SYM_DB`: 아래 표의 증상 12개
  - `symcount`: `g.SYMPTOMS.length !== 205`, 목록에 `...SYM_DB`를 더한다.
- [ ] **Step 2: 실패 확인**: `FAIL symcount: length 193`
- [ ] **Step 3: 넣기**: 형식은 `['증상', ['카드', …]]`다. 연결 카드는 표 순서대로다.

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

  - 측정(스펙 6장, 2026-11-03): 기존 193개와 같은 문구는 없다. 지금 "오류·안 됨"은 89개(측정 2026-11-03, `awk`로 셈), "느림"은 18개다. 넣으면 99개·20개가 된다.
  - 증상 글은 `wsym`을 지킨다. `=`는 기호 목록에 없다.
- [ ] **Step 4: 통과**: `symcount`와 `ref`(없는 카드 이름이면 실패)가 통과한다.
- [ ] **Step 5: 브라우저 확인**: 첫 화면 `#/`의 증상 띠에서 다음을 본다. 320px 넘침은 0이다.
  - "오류·안 됨" 칩을 누르면 새 증상 10개가 보인다.
  - "느림" 칩을 누르면 새 증상 2개가 보인다.
  - 증상을 누르면 연결 카드로 간다.
- [ ] **Step 6: 커밋**: `feat: 데이터베이스 증상 12개`

---

### Task 5: 글꼴·문서·전체 점검

쓸 스킬: break-ui(dbtab 3열 × 5행 × 10폭, qrun 표 2개 + SQL 4줄 × 28폭 + 결과 표 2개, erd 표 3개 × 열 4개), interfaces:better-ui·better-layout, design-skills:accessibility-audit, superpowers:verification-before-completion

**Files:**
- Modify: `index.html`: FONT:START~FONT:END woff(서브셋 다시 만들기)
- Modify: `tests/check.mjs`: `LATER = []`
- Modify: `PRODUCT.md`(31줄 개수), `docs/PLAN.md`(17줄 진행, 57줄 칩 메모), `DESIGN.md`(db 도우미 규칙 확인)

- [ ] **Step 1: 실패하는 점검**: `LATER = []`로 바꾼다.
- [ ] **Step 2: 실패 확인**: `FAIL doccount`가 나온다. 서브셋에 없는 글자가 있으면 `FAIL font`도 나온다.
- [ ] **Step 3: 글꼴**: 스펙 보충의 `font_subset.py`·`Hahmlet.ttf`를 이 계획 scratchpad로 복사하고 `python -E -P "<SP>\font_subset.py" index.html "<SP>\fontsrc\Hahmlet.ttf" "<작업 폴더>"`로 돌린다.
  - 결과 woff를 FONT:START~FONT:END 사이에 넣는다(스크립트가 하는 방식대로 한다).
  - `font` 통과를 확인한다. `NO_GLYPH`가 늘지 않아야 한다.
- [ ] **Step 4: 문서**
  - `PRODUCT.md:31`: "용어 1529개" → 1572, 괄호 안 목록 끝에 "데이터베이스 10개·91개", 증상 색인 수 → 205. 카테고리 수는 그대로다.
  - `docs/PLAN.md:17`: ③ 진행에 "데이터베이스 완료 2026-11-0X"를 적고, "다음은 데이터베이스"는 "다음은 서버"로 바꾼다(CAT 순서 db 다음이 `server`, 측정). 날짜는 실제 마친 날이다.
  - `docs/PLAN.md:57`: "칩 89개" → "칩 99개"
  - `DESIGN.md`: 계획서 ① Task 1에서 넣은 `dbtab`·`qrun`·`erd` 줄이 실제 한도·판정(원장 `Ruling:`)과 같은지 보고 고친다. 직접 조작 "고르기 버튼은 순서로 찾음" 규칙을 한 줄 더한다.
  - `doccount` 통과를 확인한다.
- [ ] **Step 5: 전체 점검**: `node tests/check.mjs` → `FAIL` 없음, `LATER` 줄 없음, `OK <수>`
- [ ] **Step 6: 전체 브라우저 확인**
  - db 10개 하위항목 × 3폭 × 2움직임, 공통 절차 기준
  - 직접 조작 4장 키보드 확인 다시
  - break-ui: 가장 큰 그림(Cascade Delete 표 2개 qrun, INNER JOIN SQL 28폭, Junction Table erd 3표, Database Client)을 320px에서 본다.
  - accessibility-audit: db 화면에서 버튼 이름, `aria-live`, 포커스 표시, 대비, 표 그림의 sr 문장을 본다.
  - 고칠 것이 나오면 실패하는 점검을 먼저 쓰거나 원장에 적고 고친다.
- [ ] **Step 7: 커밋**: `docs: 데이터베이스 개수·규칙 문서와 글꼴 갱신`

뒤이어 **최종 검토**(브랜치 전체, 계획서 ①·② Review Focus 함께).
- 결정 기록 문서: `docs/superpowers/2026-11-0X-db-category-rulings.md`
  - 계획서 ①·② 원장의 `Ruling:`과 고친 검토 지적을 정리한다.
  - back 선례(`docs/superpowers/`에서 `*-rulings.md`를 grep) 형식을 따른다.
- 작업 폴더 삭제, `superpowers:finishing-a-development-branch`
  - main 병합은 사용자 확인 뒤에 한다.
- 메모리 갱신(체크포인트: 다음은 서버)
