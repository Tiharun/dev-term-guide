# 서버 보강 판정 기록(Ruling)

브랜치 server-category(3d600fd..)에서 작성자가 내린 결정과 틀렸을 때 비용. 계획서 ①·② 원장에서 옮김.

## 계획서 ①
- Task 1: Ruling: metric 한도 이름표는 그래프 안(오른쪽 위)이 아니라 범례 항목(이중선 견본 mk-mgsh)으로 둔다 — 320px 측정에서 표시 이름표와 3사례 중 2번 겹침(끝 점·가운데 위쪽 점), 위치 규칙으로는 못 피함 — 틀리면 범례 한 줄이 늘어난 것뿐, li 하나를 span으로 되돌리면 됨
- Task 1: Ruling: mark 높이는 그 시점 선 값의 최댓값, 이름표는 점 위(점이 위 1/4이면 아래), 가로는 25% 이하 왼쪽 맞춤·75% 이상 오른쪽 맞춤 — 이름표 10폭이 320px 그래프의 40%라 그 밖이면 칸 밖으로 나감(측정) — 틀리면 기준 수 두 개만 바꿈
- Task 1: Ruling: 582줄 두 번째 규칙(.figcap static)에도 .mk-sv·.mk-mg를 넣음 — db .mk-er 선례, bkpad 주석 "설명이 아래로 내려간 그림" — 틀리면 설명이 그림 위에 겹쳐 뜸
- Review A: Ruling: 420px 이하 서버 4대(2×2)에서는 요청 점을 끈다 — 아랫줄 점이 윗줄에서 떨어지는 것처럼 보이는 오해를 없애려고. 받은 수는 "요청 n"·sr이 전하고 멈춘 장면은 원래 점이 없어 같다 — 틀리면 좁은 폭 4대 그림의 움직임만 잃음
- Review A: Ruling: mark 이름표가 점 아래로 내려가 한도선 일부를 가리는 경우는 그대로 둔다 — 이름표 글자는 읽히고 한도선은 범례로도 전해진다 — 틀리면 이름표 배경을 바꾸는 CSS 한 줄
- Task 3: Ruling: Dev Server 둘째 줄 'Local: http://localhost:5173'이 320px 터미널에서 4px 넘쳐 가로 스크롤 — 'Local: localhost:5173'로 줄임(뜻 같음, 193/193 확인) — 틀리면 문구 한 줄
- Task 3: Ruling: LATER font '1자 없음: 끗'(Restart '메모리 깨끗') — 글꼴 부분집합은 계획서 ② Task 5 글꼴 단계에서 채움, 지금은 LATER라 exit 영향 없음 — 틀리면 그 글자만 대체 글꼴로 보임
- Task 4: Ruling: SSH 터미널이 320px에서 50px 넘침 — prompt를 '$'로 줄여 명령·IP는 그대로 둠 — 틀리면 다른 터미널과 프롬프트 모양이 다를 뿐
- Task 4: Ruling: bkStack 안 터미널이 그리드 열 폭(내용 폭)을 따라 그림 밖으로 나감(Cron Job, db Seed Data도 같은 원인) — .mk-bkg:has(>.mk-term){grid-template-columns:minmax(0,1fr)} 추가, srvcss '묶음 안 터미널 폭' RED→GREEN — 틀리면 묶음 안 터미널이 줄 바꿈 대신 가로 스크롤
- Task 5: Ruling: 글꼴 서브셋에 없는 '꽤'·'텨'가 새로 생김 — Uptime "꽤 커요"를 "커요", Traffic Spike "버텨요"를 "나눠 받아요"로 바꿔 피함 — 틀리면 문장 맛이 조금 밋밋할 뿐

## 계획서 ②·디렉터·최종 검토
- Task 1: Ruling: Client Body Size Limit에 m:1 더함 — 브리프 m:1 목록에 없었지만 seq 그림이라 srvm이 요구(브리프가 "srvm이 최종 판정") — 틀려도 표시 하나
- Task 1: Ruling: 504 ko·그림은 502 카드와 맞춰 '뒤 서버' 쪽 표현 — 용어 일관 — 틀려도 문구
- Task 1: Ruling: 413 이름은 MDN "413 Content Too Large"로 확인(RFC 9110 페이지 잘림) — 틀려도 문구
- Task 2: Ruling: Sticky Session x는 SRV_XHAS 사실을 첫 문장(백엔드의 Session Store는 세션을 한곳에 모아 어느 서버든 읽게 해요)으로 담음 — 3문장 한도 안에서 Position Sticky 구분까지 넣으려고 — 틀리면 문장 하나 바꿈
- Task 2: Ruling: Access Log는 320px에서 넘치지 않아 IP를 줄에 그대로 둠(브라우저 측정 넘침 0) — 계획서 대안 불필요 — 틀리면 cap으로 옮김
- Task 2: Ruling: 새 글자 왑·쿄·챔은 font LATER로 남김 — Task 5가 글꼴 부분집합을 다시 만듦 — 틀리면 대체 글꼴로 보임
- Task 2: Ruling: BASE cd4552e와 Task 2 사이에 검토 D 수정 커밋이 끼어 있음 — 검토 E 범위에 함께 들어가도 이미 재검토 0건 — 틀리면 검토자가 한 번 더 읽음
- Task 3: Ruling: Failover cap = 브리프 문장 + 기존 Hot Standby 문장 — check.mjs(XHAS)가 Hot Standby 글을 요구하고 계획서 ① 검토 C 수정분이라 지우면 회귀 — 잘못이면 cap 한 줄 손질
- Task 4: Ruling: 320px에서 긴 증상(기존 28자 포함)을 고르면 페이지가 393~414px로 넘치던 기존 결함을 `.steps .col.done{…;max-width:100%}`로 고치고 symfit(RED→GREEN)을 더함 — 브리프 Step 5 "320px 넘침 0"을 지키려면 필요, 원인이 공용 CSS라 기존 증상도 함께 고쳐짐 — 잘못이면 한 줄 되돌림
- Final: Ruling: Failover 등 기존 카드 r에 Redundancy·SPOF 같은 새 카드를 넣지 않음 — 스펙이 요구하지 않고 x에 이름이 나와 찾을 수 있음 — 틀리면 r 연결 몇 개 덜 이어짐
- Final: Ruling: doccount가 PRODUCT.md 카테고리별 수(서버 10개·92개)까지는 비교하지 않음 — 지금 값은 측정으로 맞고, 점검 범위를 늘리는 건 이번 범위 밖 — 틀리면 다음 카테고리에서 문서 수가 어긋나도 점검이 못 잡음

## 고친 검토 지적
점검으로 잡을 수 있는 지적은 실패하는 점검을 먼저 보고(RED) 고친 뒤 통과(GREEN)를 확인했다. 문구 지적은 고치고 기록만 했다.

### 계획서 ①
- Review A: fixed 연결선(서버 줄 위아래 가로선·db 세로선 .mk-svl·2×2 묶음 테두리) — srvhelp db 세로선·srvcss RED→GREEN (4edffd1)
- Review A: fixed 5~6점 x 이름표 겹침 — len<5만 전부, srvhelp metric 6점 이름표 RED→GREEN (4edffd1)
- Review A: fixed cdframe srv 연결 규칙·10k% 시작 — 돌연변이 link srv1·at srv3 FAIL 확인 (4edffd1)
- Review A: fixed figcap·점선·2열 CSS 점검 — srvcss RED→GREEN, 돌연변이 FAIL 확인 (4edffd1)
- Review A: fixed 빈 칸 배열(servers·lines·pts·x) — Array.from, srvhelp 빈 칸 RED→GREEN (4edffd1)
- Review A: fixed sr·범례·max 소수 — f() 반올림, srvhelp metric 소수·max 소수 RED→GREEN (4edffd1)
- Review A: fixed 스펙 3.1·3.2·10장 문구, DESIGN.md 4가지 보강 (4edffd1)
- Review A: fixed srvcss가 2열 테두리·칸 선 끔을 안 봄 — srvcss '2열 테두리'·'2열 칸 선 끔' 정규식 추가(통과 상태 그대로 고정)
- Review A: fixed 4점·긴 y 눈금(1000byte)에서 x 이름표 1px 맞닿음 — srvhelp 'metric 4점 긴 눈금' RED→GREEN, 4점은 y 눈금 7폭 미만일 때만 전부, 아니면 첫·끝
- Review A: fixed 320px 2×2 배치도에서 멈출 것 없는 '멈춤' 버튼 — srvcss '2열 버튼 끔' RED→GREEN, 420px 이하 .fig:has(n:4) .play 숨김(브라우저 320 none·800 flex 확인)
- Review B: fixed I1 Dev Server 끝 프롬프트 없앰(end:false), I2 SSH end:false, M3 Failover 예비 서버가 대신 받음(sfail·sfailSay 다시 씀, 이름 '예비'는 한글 폭 한도 6 때문), M4 Cron /srv/backup.sh, M5 Serverless 함수→플랫폼→브라우저, M6 Docker "도커가 있는 서버라면", M7 '잘 됨', M8 .mk-bkg:has(>.mk-term) justify-items:center — srvfixb·srvstill·srvcss RED→GREEN, suite OK 406 (88a2791). 브라우저 8장 3폭×2모션 넘침 0·오류 0
- Review B (재검토): fixed Minor Failover가 Cold Standby만 보여 줌 — cap '예비를 미리 켜 두는 방식(Hot Standby)도 있어요', srvfixb RED→GREEN, suite OK 406 (75c1e31). 3폭×2모션 넘침 0
- Review C: fixed I1 x의 내부 id (back)·(deploy)·front의를 화면 이름(백엔드의·배포의·프론트엔드의·웹사이트의)으로, Uptime·Downtime·Self-hosting도 같게 — srvxcat RED→GREEN, suite OK 407 (714c5cd)
- Review C: fixed I2 Staging "운영과 똑같이 꾸민 서버", M1 Maintenance Page 검색 엔진만, M2 429 "Retry-After가 있으면", M3 400 뜻 넓힘, M4 Localhost "그 사람의 컴퓨터", M5 SSH 주어 — 문구라 점검 없이 고치고 기록 (714c5cd)

### 계획서 ②
- Review D: fixed Minor 1 상태 코드 새 카드 5장 ko를 '201 · 새로 만들어짐'처럼 숫자로 시작 — srvko RED→GREEN, suite OK 410 (5392f67)
- Review D: fixed Minor 2~4 Static File Serving x 첫 문장 주어, 304 '가진 파일의 ETag(버전 표시)', 413 '기본 1m, 곧 1MB', 그림 묶음 주석 '뒤 서버' — 문구라 점검 없이 고치고 기록 (5392f67)
- Review E: fixed Minor 8 Swap Memory u ArchWiki→man7 swapon(8) — srvprim RED→GREEN, suite OK 417 (36ab670)
- Review E: fixed Minor 1~7 Auto Scaling d, SPOF note('DB가 멈춰 모두 답을 못 해요', wlen 27 — 검토 제안 문장은 36이라 줄임), Connection Draining '최대 300초까지', Access Log 상태 코드, Error Log '오류와 경고', Log Level cap RFC 이름, SOOM '(Docker면 exit code 137)'·'꺼질', Vertical Scaling u→AWS EC2 instance type changes — 문구라 점검 없이 고치고 기록 (36ab670)
- Task 5: fixed Log Level cap 끝 ')'가 320px에서 홀로 줄바꿈 → 'Warning, Informational'(문구, a7a6811)

## 최종 검토
- Opus high 디렉터, 3d600fd..a7a6811(커밋 19개) → 지적 0, 점검 OK 417
