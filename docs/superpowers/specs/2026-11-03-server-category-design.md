# 서버 카테고리 보강 (③ 기존 카테고리 6/12) 설계

- 날짜: 2026-11-03
- 관련 문서: [PLAN.md](../../PLAN.md), [DESIGN.md](../../../DESIGN.md), 앞 단계 [2026-11-03-db-category-design.md](2026-11-03-db-category-design.md)
- ③은 남은 12개 카테고리를 사이트 순서(basics → web → front → back → db → server → git → deploy → security → perf → bug → ai)로 하나씩 보강한다. 이 문서는 여섯 번째(server, 화면 이름 "서버")다.
- 진행 방식은 db와 같다. 구현은 메인 세션이 하고, 설계서·계획서·구현 묶음 검토는 디렉터 에이전트(Opus 5.5, effort high)가 한다. 판단은 메인이 하고 원장에 남긴다.
- 사용자 지시(2026-11-03): 초보자가 가장 이해하기 좋은 도구·도우미가 있으면 최대한 다 쓴다. 사용자 선택(브레인스토밍): 도우미는 "배치도 + 지표 그래프"를 **둘로 나눔**(`srvmap()`·`metric()`), 하위항목 4개 모두, 직접 조작 4장(Load Balancer·Failover·Auto Scaling·Out of Memory), 새 카드 45장 안팎.
- 디렉터 설계서 검토(1차, Critical 1·Important 12·Minor 9)를 반영한 판이다.
- 브레인스토밍 뒤 바꾼 것 두 가지(Ruling, 사용자 확인 때 알림):
  - 새 카드 "Address Already in Use"를 **Swap Memory**로 바꿨다. net/tip에 `Port Already in Use` 카드([index.html:3072](../../../index.html))와 증상 "포트가 이미 사용 중이래요"가 이미 있다(측정).
  - 증상 "포트가 이미 쓰임"을 **"클라우드 한 곳이 멈추자 우리 서비스도 멈췄어요"**(Availability Zone)로 바꿨다. 같은 이유다.

## 1. 목적과 성공 기준

Claude에게 서버를 띄우거나 배포 뒤 문제를 물어보는 사람이 "로드 밸런서", "502", "Auto Scaling", "OOM", "Nginx 설정" 같은 말을 **요청이 어느 서버로 가는지 보이는 배치도와 CPU·메모리가 시간에 따라 오르내리는 그래프로 바로 이해**하게 한다. 그리고 웹 서버 설정, 확장, 자원과 장애, 클라우드 용어까지 카드로 이어 준다.

성공 기준:
- 서버 카테고리가 하위항목 10개, 카드 92장(46 + 새 46)이 된다.
- 모든 카드에 x(헷갈림 칸)가 있다.
- server 카드의 객체 v가 0장이고, 92장 모두 `u-server-` 키를 쓴다. 점검으로 막는다.
- 8장의 완료 기준을 모두 통과한다.

## 2. 범위

포함:
- 새 하위항목 4개: `conf`(웹 서버 설정), `scale`(확장·트래픽), `res`(서버 자원·장애), `infra`(클라우드·인프라)
- 기존 `status`(HTTP 상태코드)에 새 카드 5장
- 새 카드 46장(5장 목록). 정의 d와 x는 해요체로 쓰고, 그림은 모두 새로 그린다.
- 기존 46장에 x를 채운다(측정 2026-11-03: 지금 x가 있는 server 카드는 Docker·401 Unauthorized 2장). 이 2장의 x도 새 규칙(`srvxn`)에 맞는지 다시 본다. 기존 d는 바꾸지 않는다.
  - 해요체 2~3문장으로 쓴다.
  - 헷갈리는 짝이 있으면 차이를 먼저 쓴다.
- 기존 46장의 그림을 모두 전용 그림으로 바꾼다(3.3). 측정(2026-11-03): `u-server-` 그림 0장, 공유 그림 문자열 7장(Scaling·Traffic Spike `scale`, Cold Start `delay`, Restart `rotate`, Graceful Shutdown `fade`, Monitoring `pulse`, Maintenance Page `emptystate`), 나머지 39장은 객체 v. 공유 그림 키 자체는 지우지 않는다.
- 새 그림 도우미 `srvmap()`·`metric()`(3.1~3.2). back의 `seq()`·`httpmsg()`, 기존 `track`·`doc`·`term`·`vs`·`browser`·`fcss`, 전용 그림 조각 `bkStack`·`bkBox`·`bkRows`·`bkPills`([index.html:7862](../../../index.html))를 다시 쓴다. server 그림 `D` 항목은 db 그림 뒤([index.html:8333](../../../index.html) 다음)에 두어 이 조각들이 먼저 정의되게 한다.
- 직접 조작 4장: Load Balancer, Failover, Auto Scaling, Out of Memory(3.5)
- 증상 색인 12개 추가(6장)
- 글꼴 서브셋, PRODUCT.md·PLAN.md·DESIGN.md의 개수·도우미 표기, 점검 기대값 갱신

제외:
- 다른 카테고리에 이미 있는 같은 뜻의 말(측정, 2026-11-03): design의 Instance, perf의 Memory Leak·Compression, back의 Stateless vs Stateful·Health Check·Logging·Worker·Queue·Session Store·Timeout, net의 Port Already in Use, deploy의 Uptime Monitor·CDN. 필요하면 r로 잇는다.
- 이름이 겹쳐 바꾼 새 카드: `Instance`(design/tool)와 겹쳐 `Server Instance`.
- 기존 server 카드 AWS·Docker·Kubernetes는 그대로 둔다(제품 이름이지만 이미 있는 사전 카드다. db Redis 판정과 같음).
- 증상 "오류·안 됨" 칩 재검토. ③ 마지막 AI 이후 한 번에 한다.
- 헷갈림 칸 이름 변경, 기존 카드 이동, 다른 카테고리 카드 수정. r 연결만 예외다.

## 3. 그림 구조

글자 폭은 db와 같이 `wlen`으로 센다(한글 2, 그 밖 1). 아래 "N폭"은 이 값이다. `srvmap`은 요청 점이 서버로 움직이는 그림(`m:1`)이고, `metric`은 움직이지 않는 그림(`m:0`)이다.

### 3.1 `srvmap()` — 배치도 (새로)

- `srvmap({user = '사용자', front, servers, db, note, still, label})`
  - 위에서 아래로 쌓는다: 사용자 상자 → `front`(로드 밸런서·프록시, 생략 가능) → 서버 1~4대(가로로 나란히) → `db`(생략 가능).
  - `user`·`front`·`db`: 문자열이거나 `{n, st}`. 이름은 10폭까지(입력 검사)(`로드 밸런서` 11폭이므로 `LB`·`프록시`·`Nginx`처럼 짧게 쓰고, 풀이는 cap·x에서 한다). `st`는 서버와 같은 값을 쓴다(SPOF의 DB `down`).
  - `servers`: 1~4개, 항목 `{n, st, got, tag}`.
    - `n`: 서버 이름 6폭까지(예: `서버 1`, `web-1`).
    - `st`: `ok`·`busy`·`down`·`new`·`drain`·`off` 중 하나. `ok`가 아니면 상자 안에 글자 꼬리표를 붙인다(바쁨·고장·새로 켬·정리 중·꺼짐). 색과 선 모양(고장은 점선 테두리)을 함께 바꾸고, 색만으로 구분하지 않는다.
    - `got`: 받은 요청 수 0~99, 기본 0. 상자 안에 "요청 3"으로 쓴다(예시 숫자). 그림마다 `got`이 0보다 큰 서버가 1대 이상 있어야 한다(없으면 오류). 3.3·3.4 표에 `got`을 적지 않은 `srvmap` 행은 계획서에서 예시 값을 채운다.
    - `tag`: 서버 아래 짧은 꼬리표 6폭까지(예: `민수`, `구역 a`).
  - `note`: 그림 아래 한 줄 설명, 28폭까지.
  - 상자 폭은 상자 안 글 중 가장 긴 7폭(`새로 켬`·`정리 중`·`요청 99`) 기준으로 잡는다.
  - 움직임: `got`이 0보다 큰 서버마다 요청 점 하나(장식, `aria-hidden`)가 서버 줄 위 가로선에서 그 서버 상자로 2em 내려간다. 점 수는 `got`에 비례하지 않고 서버당 하나이며, 숫자는 상자 안 "요청 n" 글이 전한다. 새 키프레임 `mk-srv{k}`(k = 서버 차례 1~4, 차례로 늦게 출발, `transform`만 움직임)와 `A` 클래스를 쓴다. `still`이거나 reduced-motion이면 점 없이 마지막 장면(받은 수만 보임)이다.
- 입력 검사(넘으면 오류): 서버 수, `user`·`front`·`db`·서버 이름·`tag`·`note` 폭, `user`·`front`·`db`·서버의 없는 `st`, `got`이 0~99 밖이거나 정수가 아님, `st`가 `down`·`off`인데 `got`이 0보다 큼, `got`이 0보다 큰 서버가 없음.
- `.sr` 문장: "배치도. 사용자, LB, 서버 3대: 서버 1 요청 3, 서버 2 고장, 서버 3 요청 3. DB." 꼬리표·`tag`·`note`도 글로 읽는다. 기호 없이 읽는다.
- 320px(그림판 안쪽 약 244px, 추측)에서 서버 4대 × 6폭이 가로로 들어가는지 계획서 ① Task 1에서 break-ui로 잰다. 넘치면 2대씩 두 줄로 접는다(폭 한도는 낮추지 않는다).
- 대상: Cloud, Reverse Proxy, Load Balancer, Failover, Kubernetes, Horizontal Scaling, Sticky Session, Single Point of Failure, Connection Draining, Availability Zone, Auto Scaling.

### 3.2 `metric()` — 지표 그래프 (새로)

- `metric({lines, x, max = 100, unit, limit, mark, label})`
  - `lines`: 선 1~3개, 항목 `{n, pts}`. `n`은 선 이름 10폭까지(예: `CPU`, `응답 시간`). `pts`는 값 4~12개, 각 0~`max`.
  - 선 1은 굵은 실선, 2는 긴 점선, 3은 짧은 점선이다. 선 이름은 그래프 위 범례(HTML, 선 모양 견본 + 이름)에 쓴다. 선 끝에 이름표를 달지 않아 이름표끼리 겹치지 않는다(색만으로 구분하지 않음).
  - 모든 선은 같은 `unit`·`max`를 쓴다. 단위가 다른 값(예: CPU %와 응답 ms)은 한 그래프에 넣지 않는다.
  - `x`: x축 이름표 배열, `pts` 길이와 같고 각 5폭까지(예: `14:00`, `1월`). 점이 5개 이상이면 그림에는 첫·가운데·마지막 이름표만 쓰고 나머지 자리는 비운다(5폭 이름표는 약 33px이고 320px 화면의 그래프 폭은 약 157px라 5점부터 겹침, 측정). `.sr`은 첫·끝 이름표로 구간을 읽는다.
  - `unit`: 값 단위 4폭까지(예: `%`, `ms`, `MB`).
  - `max`: 0보다 큰 숫자(입력 검사). `pts`가 100을 넘는 그림(Cold Start ms, Out of Memory MB 등)은 꼭 적는다.
  - `limit`: `{v, n}` 가로 한도선과 이름표(10폭까지, 예: `{v:70, n:'늘림 기준'}`). `v`는 0~`max`. 한도선은 가는 이중선으로 그려 선 1~3과 모양이 다르고, 이름표는 범례에 "이름 값단위" HTML 글로 둔다(표시 이름표와 겹치지 않게, Task 1 판정).
  - `mark`: `{i, n}` 한 점에 표시와 이름표(10폭까지, 예: `{i:0, n:'첫 요청'}`). `i`는 `pts` 범위 안.
  - 그림은 SVG(`aria-hidden`), 글자(축 이름표·선 이름·한도·표시)는 SVG 밖 HTML로 둔다. 그래야 SVG가 줄어도 글자가 11px 아래로 내려가지 않는다.
- 입력 검사(넘으면 오류): 선 수, 이름 폭, `pts` 개수와 범위, 선마다 `pts` 길이가 다름, `x` 길이·폭, `unit` 폭, `max`가 0 이하이거나 숫자가 아님, `limit.v` 범위·이름 폭, `mark.i` 범위·이름 폭, 숫자가 아닌 값.
- `.sr` 문장: "그래프, 14:00부터 14:50까지. CPU 처음 20%, 가장 높음 95%(14:30), 끝 30%. 한도 늘림 기준 70%. 표시: 14:30 이벤트." 선마다 처음·가장 높음(시점)·끝을 읽는다.
- 대상: Cold Start, Traffic Spike, Monitoring, Capacity Planning, CPU Usage, Memory Usage, Swap Memory, Auto Scaling·Out of Memory 직접 조작.

### 3.3 기존 46장 다시 그리기

키 이름은 `u-server-<slug>`다(예: `u-server-load-balancer`, `u-server-200-ok`). 표의 "▶"는 직접 조작(3.5)이다. 예시 IP는 문서용 대역(`203.0.113.10`, RFC 5737), 도메인은 `example.com`만 쓴다.

| 하위항목 | 카드 | 새 그림 |
|---|---|---|
| basic | Localhost | `bkStack`: `bkBox` "내 컴퓨터" 안에 `localhost:3000`, 아래 글 "나만 열 수 있어요" |
| basic | Dev Server | `term`: `npm run dev`와 "Local: http://localhost:5173(예)" 출력, 이어서 "파일 저장하면 다시 그림" |
| basic | Production | `bkStack` 3칸(개발 · 스테이징 · 운영) 중 **운영** 칸 강조 "실제 사용자가 보는 곳" |
| basic | Cloud | `srvmap`: 사용자 → 서버 2대, note "남의 컴퓨터를 빌려 써요" |
| basic | Uptime | `bkRows`: 99.9% = 한 달 약 43분 멈춤 / 99.99% = 약 4분(30일 기준 계산, 예시) |
| core | HTTPS | `bkStack` 두 칸: HTTP(`fcss`, `password=1234`가 그대로 보임) / HTTPS(같은 자리가 알아볼 수 없는 글) |
| core | SSL Certificate | `bkRows` 3줄: 대상 `example.com` · 발급 기관(예) · 만료일 `11-30`(예시) |
| core | Web Server | `seq` 브라우저·웹 서버: GET /logo.png → 처리(파일 찾기) → 200 그림 파일 |
| core | Reverse Proxy | `srvmap`: 사용자 → front `프록시` → 앱 2대, note "사용자는 프록시만 알아요" |
| core | Load Balancer ▶ | 나누는 방식 Round Robin·Least Connections를 고르면 서버마다 받은 요청 수가 바뀜 |
| core | Scaling | `bkStack` 두 칸: 위로 키우기(서버 한 대를 크게, `bkBox`) / 옆으로 늘리기(서버를 여러 대로, `bkPills`) |
| core | Downtime | `track`: 14:00 정상 → 14:10 멈춤(실패) → 14:35 복구(시각은 예시) |
| core | Server Log | `term`: `tail -f app.log`와 시각·GET /api/posts 200 두 줄, 마지막 줄 ERROR |
| core | Storage | `seq` 브라우저·서버·저장소: 사진 올림 → 저장 → 주소 → 주소 저장됨 |
| motion | Request-Response Cycle | `seq` 브라우저·서버·DB: 요청 → 조회 → 결과 → 응답(HTML) |
| motion | Cold Start | `metric` 응답 시간 ms(`max` 2000), pts 첫 값만 크고(예 1800) 나머지 작음(120 근처), mark 첫 요청 |
| motion | Restart | `track`: 실행 중 → 끔 → 다시 켬 → 실행 중(메모리 깨끗) |
| motion | Traffic Spike | `metric` 선 `요청 수`, unit `건`, `max` 1000, x는 1분 간격 시각, 이벤트 시점에 크게 튐, mark "이벤트" |
| motion | Failover ▶ | 서버 2를 정상·고장으로 바꾸면 서버 2가 빠지고 남은 서버가 요청을 나눠 받음 |
| motion | Graceful Shutdown | `track`: 새 요청 받지 않음 → 하던 요청 끝냄 → 끔 |
| adv | Linux | `term`: `uname -s`와 `Linux`, `ls /var/www`와 폴더 두 개 |
| adv | SSH | `term`: `ssh ubuntu@203.0.113.10`과 접속 뒤 프롬프트 `ubuntu@web-1:~$` |
| adv | Docker | `bkStack`: 앱 · 필요한 라이브러리 · 설정을 한 상자(컨테이너)로, 아래 "어느 서버에서나 같게" |
| adv | Container Image | `track`: Dockerfile → `docker build` → 이미지 → `docker run` 3번 → 컨테이너 3개 |
| adv | Kubernetes | `srvmap`: 서버 이름 `상자 1`~`상자 4`, 상자 2 down, 상자 4 new("새로 켬" 꼬리표), note "죽은 상자를 저절로 바꿔요" |
| adv | AWS | `bkPills` 서비스 예: EC2(서버) · S3(파일) · RDS(DB) |
| adv | VPS | `bkStack`: 큰 컴퓨터 한 대를 칸 셋으로 나눔, 한 칸 강조 "내 몫" |
| adv | Serverless | `seq` 브라우저·플랫폼·함수: 요청 → 처리(함수 깨움) → 실행 → 응답, cap "쓴 만큼 내요" |
| status | 200 OK | `httpmsg` 응답 첫 줄 `200 OK`, `Content-Type: text/html`, 본문 첫 줄 강조 |
| status | 301 Redirect | `httpmsg` 응답 `301 Moved Permanently`, `Location: /new` 강조 |
| status | 400 Bad Request | `bkStack`: `httpmsg` 요청 `POST /signup`, 본문 `{"email": }`(형식이 깨짐, 강조) 위, 응답 `400 Bad Request` 아래. back Error Response(응답 본문 중심)와 달리 깨진 요청을 보임 |
| status | 401 Unauthorized | `httpmsg` 응답 401, `WWW-Authenticate: Bearer` 강조, cap "로그인이 필요해요" |
| status | 403 Forbidden | `httpmsg` 응답 403, 본문 "권한 없음", cap "로그인은 됐지만 허락이 없어요" |
| status | 404 Not Found | `httpmsg` 요청 `GET /posts/999` 위, 응답 404 아래(`bkStack`) |
| status | 429 Too Many Requests | `httpmsg` 응답 429, `Retry-After: 60` 강조 |
| status | 500 Internal Server Error | `httpmsg` 응답 500, 본문 "서버 오류", cap "자세한 원인은 서버 로그에" |
| status | 502 Bad Gateway | `httpmsg` 응답 502, `Server: nginx`(예) 강조, 본문 "앱이 이상한 답을 줌" |
| status | HTTP Status Code | `doc` 표: 2xx 성공 · 3xx 다른 곳으로 · 4xx 요청 쪽 문제 · 5xx 서버 쪽 문제, 예 하나씩 |
| tip | Development Environment | `bkStack` 3칸(개발 · 스테이징 · 운영) 중 **개발** 칸 강조 "내 컴퓨터, 마음껏 망가뜨려도 돼요" |
| tip | Staging | 같은 3칸 중 **스테이징** 칸 강조 "운영과 같게 만든 연습장" |
| tip | Monitoring | `metric` CPU %·메모리 % 2선(같은 unit, `max` 100), limit "알림 기준" |
| tip | Cron Job | `term`: `crontab -l`과 `0 3 * * * backup.sh`, 아래 글 "매일 03:00에 실행" |
| tip | Redirect | `seq` 브라우저·서버: GET /old → 301 + Location → GET /new → 200 |
| tip | Maintenance Page | `browser` 안에 "점검 중이에요, 02:00까지(예시)" 안내. `browser`는 폭 300px 고정이라 `max-width:100%`로 감싼다([index.html:438](../../../index.html) 방식) |
| tip | Works on My Machine | `bkStack` 두 칸: 내 컴퓨터(Node 22, 되는 중) / 서버(Node 18, 오류), 버전은 예시 |
| tip | Self-hosting | `bkStack` 두 칸: 직접 운영(서버·업데이트·백업을 내가) / 서비스 이용(회사가 맡음) |

같은 3칸 `bkStack`을 쓰는 Production·Development Environment·Staging은 강조 칸과 글이 달라 다른 그림이다. 지금 `dup` 점검([tests/check.mjs:145](../../../tests/check.mjs))은 영문명만 보므로, 같은 `h`를 막는 새 점검 `srvsameh`를 만든다(4장).

공통 규칙(DESIGN.md, db와 같음):
- 그림 글자는 11px 이상이다.
- 그림 속 숫자·시각·건수·버전은 예시로 표시한다. 접속 주소의 비밀번호·키는 `****`로 가린다.
- 실제 사람처럼 보이는 개인정보를 쓰지 않는다. 예시 이름은 민수·지영·준호만 쓴다.
- IP는 문서용 대역(`192.0.2.x`·`198.51.100.x`·`203.0.113.x`), 도메인은 `example.com`만 쓴다.
- 설정 파일 글은 `fcss`(제목 = 파일 이름, 1~6줄)로 쓴다. `ide`는 출력·변수 칸과 실행 단계를 늘 그리는 코드 실행 도우미라([index.html:4084](../../../index.html)) 설정 파일에 쓰지 않는다. 명령 실행은 `term`이다. 설정은 Nginx 문법을 쓰고, 다른 서버는 x에 "서버 프로그램마다 달라요"를 쓴다.
- `httpmsg` 응답 첫 줄은 `200 OK`처럼 숫자로 시작한다(`HTTP/1.1`을 붙이면 형식 검사에 걸림, [index.html:4219](../../../index.html)). 줄은 30폭까지다.
- `seq`를 쓰는 행의 글은 back 한도(메시지 8개, 글 14폭, 세로줄 3개면 이름 8폭·4개면 6폭)를 지킨다. 표의 화살표(→)는 메시지 차례를 적은 것이고 그림 글에는 들어가지 않는다. "(실패)"·"(기다림)"은 `err:1`·`wait:1`, "처리(…)"는 `from === to` 상자다.
- 회사 로고·브랜드 이름을 새로 쓰지 않는다. 예외: 카드 주제이거나 "예"로 드는 이름(Nginx·Apache·AWS·EC2·S3·RDS·Docker·Kubernetes·Let's Encrypt)은 쓴다(로고는 쓰지 않음).
- 320/375/1280 세 폭에서 넘침이 없어야 한다.
- 상태를 색만으로 구분하지 않는다.
- 읽히는 글에 화살표·체크 기호를 쓰지 않는다(`wsym`·`symcss` 점검과 같은 규칙).
- `vs` 한 칸은 320px에서 약 96px다(db 설계서 3.1 측정). `vs`에는 짧은 글만 넣고, 코드·상자·여러 줄이 들어가는 비교는 `bkStack` 세로 쌓기로 그린다. `fcss` 상자는 최대 190px이고 줄은 `pre-wrap`으로 접힌다([index.html:493](../../../index.html)).

### 3.4 새 카드 그림

새 46장은 `srvmap`·`metric`·`seq`·`httpmsg`와 기존 도우미(`vs`·`track`·`doc`·`term`·`fcss`)·back 조각(`bkStack`·`bkBox`·`bkRows`·`bkPills`)으로 그린다. 객체 v는 `srvobj`가 막으므로 쓰지 않는다.

| 하위항목 | 카드 | 새 그림 |
|---|---|---|
| status | 201 Created | `httpmsg` 응답 `201 Created`, `Location: /posts/7` 강조, cap "새로 만들어졌어요" |
| status | 204 No Content | `httpmsg` 응답 `204 No Content`, 본문 줄 없음(`body: []`), cap "지우기 성공, 돌려줄 본문은 없어요" |
| status | 304 Not Modified | `bkStack`: `httpmsg` 요청 `If-None-Match: "a1"` 위, 응답 `304 Not Modified`(본문 줄 없음) 아래, cap "가진 것을 그대로 쓰세요" |
| status | 503 Service Unavailable | `httpmsg` 응답 `503 Service Unavailable`, `Retry-After: 120` 강조, cap "잠시 받을 수 없어요" |
| status | 504 Gateway Timeout | `seq` 브라우저·프록시·앱: 요청 → 넘김 → 처리(답 없음, 기다림) → 504(실패), cap "502는 이상한 답, 504는 답이 없음" |
| conf | Nginx | `fcss` nginx.conf: `server {` / `  listen 80;` / `  server_name example.com;` / `  root /var/www;` / `}` |
| conf | Apache | `fcss` httpd.conf: `<VirtualHost *:80>` / `ServerName example.com` / `DocumentRoot /var/www` / `</VirtualHost>` |
| conf | Virtual Host | `bkStack`: 서버 한 대 안에 `a.example.com` → 폴더 a, `b.example.com` → 폴더 b(`bkRows`) |
| conf | Static File Serving | `seq` 브라우저·Nginx·앱: GET /logo.png → 처리(파일 바로) → 파일(Nginx가 브라우저에) → GET /api → 넘김(Nginx가 앱에) → JSON(앱이 Nginx에) → JSON(Nginx가 브라우저에), 메시지 7개 |
| conf | Proxy Pass | `fcss` nginx.conf: `location /api/ {` / `  proxy_pass http://app;` / `}`, cap "app은 Upstream에 적은 서버 묶음" |
| conf | Upstream | `fcss` nginx.conf: `upstream app {` / `  server app1:3000;` / `  server app2:3000;` / `}`(서버 이름은 예) |
| conf | Keep-Alive | `seq` 브라우저·서버: 연결 → 요청 1 → 응답 1 → 요청 2 → 응답 2, cap "연결 하나로 여러 번" |
| conf | Config Reload | `term`: `nginx -t`와 "test is successful", `nginx -s reload`, 아래 글 "끊지 않고 새 설정" |
| conf | Certificate Renewal | `track` 3단계: 발급 → 수명 2/3 지점에 자동 갱신(90일이면 약 60일째) → 새 만료일, 날짜는 예시. 갱신이 실패하면 만료된다는 것은 x에서 쓴다 |
| conf | Client Body Size Limit | `seq` 브라우저·Nginx·앱: 20MB 업로드 → 413(실패), cap "앱까지 가지도 않아요, 한도는 예시 10MB" |
| scale | Auto Scaling ▶ | 새벽·평소·이벤트를 고르면 서버 수와 CPU 그래프가 바뀜 |
| scale | Horizontal Scaling | `srvmap`: 서버 3대(ok) + 4번째 new, note "같은 서버를 한 대 더" |
| scale | Vertical Scaling | `bkStack`: `bkBox` 지금(CPU 2 · 메모리 4GB) 위, 키운 뒤(CPU 8 · 메모리 16GB) 아래(예시) |
| scale | Round Robin | `bkRows`: 요청 1 서버 1 · 요청 2 서버 2 · 요청 3 서버 3 · 요청 4 서버 1(차례대로) |
| scale | Least Connections | `bkRows`: 서버 1 처리 중 5 · 서버 2 처리 중 1(다음 요청 받음, 강조) · 서버 3 처리 중 4 |
| scale | Sticky Session | `srvmap`: 서버 3대 중 서버 2에 tag `민수`, note "민수 요청은 늘 서버 2로" |
| scale | Single Point of Failure | `srvmap`: 서버 3대 ok, db `{n:'DB', st:'down'}`, note "DB 하나가 멈추면 전부 멈춰요" |
| scale | Redundancy | `bkPills` 두 겹으로 두는 것: 서버 · DB 복제 · 전원 · 지역 |
| scale | Connection Draining | `srvmap`: 서버 1 ok · 서버 2 drain(요청 2) · 서버 3 ok, note "새 요청은 안 받고 하던 것만" |
| scale | Capacity Planning | `metric` 월별 CPU(1월~6월 오름세), limit `{v:80, n:'늘릴 때'}` |
| res | CPU Usage | `metric` CPU %, 14:00~14:50, 한 번 95%까지 오름 |
| res | Memory Usage | `metric` 메모리 %, 거의 평평(60 근처), cap "꾸준하면 정상이에요" |
| res | Out of Memory ▶ | 한도 512MB·1GB·고친 뒤를 고르면 메모리 그래프와 결과 문장이 바뀜 |
| res | Disk Full | `bkRows`: `디스크 사용 100%`(꼬리표 가득) · `No space left on device`(예) |
| res | Access Log | `bkRows`: `203.0.113.5 GET /api 200` · `GET /login 302` · `GET /x 404` 세 줄 |
| res | Error Log | `bkRows`: `ERROR DB 연결 실패` · `ERROR 파일 없음` 두 줄, 시각은 예시 |
| res | Log Level | `bkRows`: DEBUG · INFO · WARN · ERROR 위에서 아래로, "운영에서는 보통 INFO부터"(예) |
| res | Log Rotation | `bkRows`: `app.log`(오늘) · `app.log.1.gz` · … · `app.log.7.gz`(가장 오래됨, 다음에 지움) |
| res | Alert | `bkBox` 이름 "알림", 글 "CPU 90% 넘음, 5분째(예시)", 꼬리표 "메신저로 보냄" |
| res | Process Manager | `track`: 앱 실행 → 죽음(실패) → 관리자가 알아챔 → 다시 켬 |
| res | Swap Memory | `metric` 메모리 %·스왑 % 2선(같은 unit, `max` 100), 메모리가 꽉 찬 뒤 스왑이 오름, cap "디스크를 메모리처럼 써서 느려요" |
| infra | Virtual Machine | `bkStack` 층: 앱 · 운영체제 · 가상 머신 · 실제 컴퓨터, 한 컴퓨터에 VM 여러 개 |
| infra | Server Instance | `bkRows`: web-1 실행 중 · web-2 실행 중 · web-3 꺼짐(이름·상태는 예) |
| infra | Region | `bkPills`: 서울 · 도쿄 · 버지니아(예), cap "사용자와 가까운 곳을 고르면 빨라요" |
| infra | Availability Zone | `srvmap`: 서버 3대 tag `구역 a`·`구역 b`·`구역 c`, 구역 b down, note "구역 b가 멈춰도 a·c가 받아요" |
| infra | Object Storage | `bkRows`: 키 `photos/1.jpg` 2MB · `photos/2.jpg` 3MB · `backup.zip` 1GB(예) |
| infra | IaaS | `bkStack` 층(앱 · 런타임 · 운영체제 · 서버): 앱·런타임·운영체제는 "내가", 서버는 "회사가" |
| infra | PaaS | 같은 층: 앱만 "내가", 나머지 "회사가" |
| infra | SaaS | 같은 층: 모두 "회사가", 나는 쓰기만 |
| infra | On-Premise | `bkStack` 두 칸: 우리 건물 서버(직접 사고 관리) / 클라우드(빌려 씀) |
| infra | Managed Service | `bkRows`: 백업 · 업데이트 · 장애 복구는 "회사가", 쿼리·데이터는 "내가" |

IaaS·PaaS·SaaS 세 장은 같은 층 그림이지만 "내가/회사가" 꼬리표 위치가 달라 다른 그림이다. 세 장에 서로 r을 달고, x에서 "어디까지 내가 하느냐"로 구분한다.

3.3·3.4의 `bkBox`·`bkRows`·`bkPills`는 지금 모양([index.html:7862](../../../index.html): 상자 = 이름·글·꼬리표 하나, 줄 = 글·꼬리표, 알약 = 이름·항목·꼬리표)만 쓴다. 새 조각 기능을 더하지 않는다.

### 3.5 직접 조작 4장

모두 `tpick` 고르기 버튼(`aria-pressed`) + 결과 문장 `psay`(`aria-live`)다. 숫자는 예시다.
- Load Balancer: Round Robin / Least Connections. 서버 3대, 서버 2는 `busy`(오래 걸리는 요청을 붙잡고 있음). RR은 `got` [4,4,4], LC는 [5,2,5]. 결과 문장: "차례대로 4개씩 나눠요"·"한가한 서버 1·3이 더 받아요".
- Failover: 서버 2 정상 / 서버 2 고장. 정상은 [3,3,3], 고장은 서버 2 `down`(got 0)·tag `빠짐`, 서버 1·3이 [5,0,4]. 결과 문장: "Health Check가 서버 2를 빼고 나머지가 받아요".
- Auto Scaling: 새벽 / 평소 / 이벤트. 서버 1대·2대·4대(이벤트 때 늘어난 2대는 `new`), 위 `srvmap` 아래 `metric` CPU %(`max` 100, `limit {v:70, n:'늘림 기준'}`). 결과 문장: "CPU가 70%를 넘어 2대를 더 켰어요" 등.
- Out of Memory: 한도 512MB / 한도 1GB / 고친 뒤. 위 `metric` 메모리 MB(`max` 1200, `limit`이 한도), 아래 `track`(강제 종료·재시작). 512MB는 금방 한도에 닿아 종료, 1GB는 늦게 닿을 뿐 같은 결과, 고친 뒤는 평평. 결과 문장: "한도에 닿아 강제 종료됐어요(exit code 137, 예)"·"한도만 늘리면 늦게 죽을 뿐이에요"·"새는 곳을 고쳐 평평해요".

공통: db와 같이 `init`·`aria-pressed`(고르기만)·`aria-live`·`psay`를 쓰고, init 안에서는 `s.querySelector`만 쓴다(window·document 금지). 키보드로 모두 조작할 수 있다. 실제 타이머를 쓰지 않는다. 장면 데이터는 그림 항목 안 한 곳(객체 상수)에 두고 `srvmap`·`metric`을 다시 불러 그린다.

## 4. 데이터와 배치

- `CAT('server', …)`([index.html:1747](../../../index.html))의 추가 하위항목 배열에서 `status` 뒤에 다음 넷을 넣는다. 공통 `tip`은 마지막에 그대로 둔다. 기존 카드 번호는 바뀌지 않고 tip 카드 번호만 뒤로 밀린다(db와 같음).
  - `['conf','웹 서버 설정','Nginx 같은 웹 서버를 설정하는 말']`
  - `['scale','확장·트래픽','사람이 몰릴 때 서버를 늘리고 나누는 법']`
  - `['res','서버 자원·장애','CPU·메모리·디스크·로그와 서버가 멈출 때']`
  - `['infra','클라우드·인프라','서버를 빌려 쓰는 방식과 그 단위']`
- 카드 형식 `{en,ko,d,x,p,r,l,o,u,v}`는 그대로다. o:1은 1차 출처가 있을 때만 쓰고, 그때 u를 단다(nginx.org·RFC·AWS·NIST·Let's Encrypt 공식 문서 주소 문자열).
- r은 이미 있는 같은 뜻·짝 카드에만 단다. 후보:
  - status: 201 Created↔200 OK, 204 No Content↔200 OK, 304 Not Modified↔Browser Cache, 503 Service Unavailable↔Maintenance Page·Downtime, 504 Gateway Timeout↔502 Bad Gateway·Timeout
  - conf: Nginx↔Web Server·Apache, Apache↔Web Server·Nginx, Virtual Host↔Web Server·DNS, Static File Serving↔Web Server·CDN, Proxy Pass↔Reverse Proxy·Upstream, Upstream↔Load Balancer·Proxy Pass, Keep-Alive↔Request-Response Cycle, Config Reload↔Restart·Zero Downtime Deploy, Certificate Renewal↔SSL Certificate·HTTPS, Client Body Size Limit↔Storage
  - scale: Auto Scaling↔Scaling·Traffic Spike, Horizontal Scaling↔Scaling·Vertical Scaling, Vertical Scaling↔Scaling·Horizontal Scaling, Round Robin↔Load Balancer·Least Connections, Least Connections↔Load Balancer·Round Robin, Sticky Session↔Session·Session Store, Single Point of Failure↔Redundancy·Failover, Redundancy↔Failover·Single Point of Failure, Connection Draining↔Graceful Shutdown·Load Balancer·Zero Downtime Deploy, Capacity Planning↔Monitoring·Scaling
  - res: CPU Usage↔Monitoring, Memory Usage↔Monitoring·Memory Leak, Out of Memory↔Memory Usage·Memory Leak·Memory Leak Bug, Disk Full↔Log Rotation, Access Log↔Server Log·Error Log, Error Log↔Server Log·Access Log, Log Level↔Server Log·Logging, Log Rotation↔Server Log·Disk Full, Alert↔Monitoring·Status Page, Process Manager↔Restart·Process, Swap Memory↔Memory Usage·Out of Memory
  - infra: Virtual Machine↔VPS·Docker, Server Instance↔Cloud·Virtual Machine, Region↔Availability Zone, Availability Zone↔Region·Redundancy, Object Storage↔Storage, IaaS↔PaaS·SaaS·Cloud, PaaS↔IaaS·SaaS·Serverless·BaaS, SaaS↔IaaS·PaaS, On-Premise↔Cloud·Self-hosting·Hosting, Managed Service↔Self-hosting·PaaS
- 기존 server 카드에도 r을 더한다(본문은 x만 채움): Graceful Shutdown↔Zero Downtime Deploy, Maintenance Page·Downtime↔Status Page, Cloud·VPS↔Hosting, Self-hosting↔Hosting.
- r에 `Container`를 쓰지 않는다. `find('Container')`가 front의 CSS Container로 간다(측정). 컨테이너는 Docker로 잇는다.
- 뜻이 다른 짝은 r 없이 x 안에서만 구분한다(`SRV_WRONG` 점검, 계획서에서 카테고리를 다시 확인):
  - Server Instance vs design의 Instance(디자인 컴포넌트 복제본)
  - Sticky Session vs front의 Position Sticky·web의 Sticky Header(화면에 붙어 있는 요소)
  - Log Level vs design의 Heading Levels(제목 크기 단계)
  - Log Rotation vs security의 Key Rotation(비밀 키 바꾸기)
  - Virtual Host vs net의 Hosts File(내 컴퓨터의 이름-주소 목록)
  - Object Storage vs web의 Local Storage(브라우저 저장소)
  - Capacity Planning vs plan의 Planning(일 계획)
  - Auto Scaling·Horizontal Scaling·Vertical Scaling vs design의 Scale(크기 변화 움직임)
  - Alert vs security의 Security Alert(새 기기 로그인 같은 보안 알림)
  - Virtual Machine·Container Image vs front의 Container(감싸는 틀)
- 점검 기대값:
  - `COUNT`에 `server/*` 10개(아래 5장 개수)
  - `EXPECT`에 새 카드 영문명
  - `REDRAWN`에 server 하위항목 10개, 새 점검 `srvobj`로 server 카드의 객체 v 0장을 따로 막는다(db `dbobj`와 같은 방식)
  - 새 점검 `srvukey`: server 92장의 v가 `u-server-`로 시작하고 `D`에 있다(마칠 때 예외 없음. 진행 중에는 남은 옛 카드 목록 `SRV_TODO`가 줄어 비워진다)
  - 새 점검 `srvcat`: server 하위항목 순서가 `basic,core,motion,adv,status,conf,scale,res,infra,tip`이다
  - 새 점검 `srvhelp`: `srvmap`·`metric`의 입력 검사와 `.sr` 문장(db `dbhelp`와 같은 식)
  - 새 점검 `srvwrong`: `SRV_WRONG` 짝에 r이 없다
  - 새 점검 `srvsameh`: server 카드끼리 그림 `D[v].h`가 서로 다르다(직접 조작은 첫 장면 `h`로 비교)
  - 새 점검 `srvtext`·`srvxn`: server 카드 d·x 글 규칙(해요체, 기호, x 문장 수)을 db `dbtext`·`dbxn`과 같은 식으로 본다. 걸린 옛 카드는 미루지 않고 글을 고친다
  - 새 점검 `srvdmrun`: 직접 조작 4장의 init을 `board(h)` 가짜 판으로 돌려 결과 문장이 바뀌는지 본다(db `dbdmrun`과 같은 식)

## 5. 용어 목록 (새 46장)

측정(2026-11-03): 아래 영문명은 기존 카드 1,572장과 정규화 이름(`norm`)으로 같지 않다. `Instance`는 겹쳐서 `Server Instance`로 바꿨고, `Address Already in Use`는 net의 `Port Already in Use`와 같은 뜻이라 `Swap Memory`로 바꿨다.

| 하위항목 | 새 카드 |
|---|---|
| status (+5) | 201 Created, 204 No Content, 304 Not Modified, 503 Service Unavailable, 504 Gateway Timeout |
| conf (10) | Nginx, Apache, Virtual Host, Static File Serving, Proxy Pass, Upstream, Keep-Alive, Config Reload, Certificate Renewal, Client Body Size Limit |
| scale (10) | Auto Scaling, Horizontal Scaling, Vertical Scaling, Round Robin, Least Connections, Sticky Session, Single Point of Failure, Redundancy, Connection Draining, Capacity Planning |
| res (11) | CPU Usage, Memory Usage, Out of Memory, Disk Full, Access Log, Error Log, Log Level, Log Rotation, Alert, Process Manager, Swap Memory |
| infra (10) | Virtual Machine, Server Instance, Region, Availability Zone, Object Storage, IaaS, PaaS, SaaS, On-Premise, Managed Service |

하위항목별 개수: basic 5, core 9, motion 6, adv 8, status 15, conf 10, scale 10, res 11, infra 10, tip 8 = 92.

x로 구분할 짝(뜻이 가까움):
- Localhost vs Dev Server, Development Environment vs Staging vs Production
- Web Server vs Reverse Proxy vs Load Balancer, Nginx vs Apache
- Reverse Proxy vs Proxy Pass vs Upstream
- 502 Bad Gateway vs 504 Gateway Timeout vs 503 Service Unavailable vs 500 Internal Server Error
- 200 OK vs 201 Created vs 204 No Content, 301 Redirect vs 304 Not Modified, 401 vs 403
- Restart vs Config Reload vs Graceful Shutdown vs Connection Draining vs Zero Downtime Deploy(deploy)
- Scaling vs Horizontal Scaling vs Vertical Scaling vs Auto Scaling vs Scale(design)
- Round Robin vs Least Connections, Sticky Session vs Session Store(back)
- Failover vs Redundancy vs Single Point of Failure
- Region vs Availability Zone
- Memory Usage vs Out of Memory vs Memory Leak(perf) vs Memory Leak Bug(bug) vs Swap Memory
- Disk Full vs Log Rotation, Access Log vs Error Log vs Server Log, Log Level vs Logging(back)
- Monitoring vs Alert vs Uptime Monitor(deploy) vs Status Page(deploy) vs Security Alert(security)
- Process Manager vs Restart, Cron Job vs Process Manager
- Virtual Machine vs Docker 컨테이너 vs VPS vs Server Instance, Docker 컨테이너 vs Container(front)
- IaaS vs PaaS vs SaaS vs Serverless vs BaaS(back), Managed Service vs Self-hosting vs On-Premise vs Hosting(web)
- Storage vs Object Storage

## 6. 증상 색인 (12개)

기존 205개와 대조했다(측정 2026-11-03). 비슷해 보이지만 원인과 연결 카드가 달라 넣는 것:
- "서버를 늘렸더니 로그인이 자꾸 풀려요"는 기존 "로그인이 자꾸 풀려요"(쿠키·세션 만료)와 달리 서버가 여러 대일 때 세션이 안 이어지는 문제다.
- "처음 요청만 유난히 느려요"는 기존 느림 증상(화면 그리기·쿼리)과 달리 서버가 깨어나는 시간이다.

"오류·안 됨" 그룹은 지금 99/205개다(측정). 이번에 10개를 더하면 109/217개가 된다. PLAN.md 57줄 칩 재검토 메모의 수치를 고친다.

| 증상 | 그룹 | 연결 카드 |
|---|---|---|
| 처음 요청만 유난히 느려요 | 느림 | Cold Start, Serverless |
| 사람이 몰리면 사이트가 느려져요 | 느림 | Traffic Spike, Auto Scaling, Load Balancer |
| 502 Bad Gateway가 떠요 | 오류·안 됨 | 502 Bad Gateway, Upstream, Proxy Pass |
| 504 Gateway Timeout이 떠요 | 오류·안 됨 | 504 Gateway Timeout, Upstream, Timeout |
| 503이 뜨고 접속이 안 돼요 | 오류·안 됨 | 503 Service Unavailable, Maintenance Page, Auto Scaling |
| 서버가 혼자 꺼졌다 켜져요 | 오류·안 됨 | Out of Memory, Process Manager, Memory Usage |
| 디스크가 꽉 찼다는 오류가 떠요 | 오류·안 됨 | Disk Full, Log Rotation |
| 인증서가 만료됐다고 떠요 | 오류·안 됨 | Certificate Renewal, SSL Certificate |
| 큰 파일을 올리면 413이 떠요 | 오류·안 됨 | Client Body Size Limit |
| 설정을 바꿨는데 그대로예요 | 오류·안 됨 | Config Reload, Restart |
| 서버를 늘렸더니 로그인이 자꾸 풀려요 | 오류·안 됨 | Sticky Session, Session Store |
| 클라우드 한 곳이 멈추자 우리 서비스도 멈췄어요 | 오류·안 됨 | Availability Zone, Redundancy, Single Point of Failure |

## 7. 진행 순서

범위가 db와 비슷하다(새 46장, 다시 그리기 46장, 도우미 2개). 계획서를 둘로 나눈다. 두 계획서 모두 이 브랜치(`server-category`)에서 이어서 하고, main 병합은 둘이 끝난 뒤 사용자 확인을 받고 한 번 한다.

계획서 ①(도우미·구조·다시 그리기·x):
1. `srvmap()`·`metric()`과 입력 검사(`srvhelp`). 320px 폭을 break-ui로 재고 한도를 정한다.
2. 하위항목 4개, 점검 기대값(`srvcat`·`srvobj`·`srvukey`·`srvsameh`·`SRV_WRONG`. 옛 카드는 `SRV_TODO`로, 그 밖에 안 끝난 항목은 `LATER`). ①에서는 새 하위항목 4개가 빈 채로 생기므로, 새 카드의 `EXPECT`·`server/conf` 등 `COUNT`는 ②에서 넣고 그 사이 걸리는 점검은 `LATER`에 둔다.
3. 기존 46장 다시 그리기(직접 조작 2장은 정적 그림으로 먼저 두고 ②에서 바꿈)
4. 기존 46장 x 채움(`srvtext`·`srvxn`)

계획서 ②(새 카드·나머지):
1. status·conf 새 카드 15장
2. scale·res·infra 새 카드 31장
3. 직접 조작 Load Balancer·Failover·Auto Scaling·Out of Memory(`srvdmrun`)
4. 증상 색인(`SYM_SRV`)
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
  - 전체 카드 1,618개(1,572 + 46, `total`)
  - 증상 217개(205 + 12, `symcount`와 새 증상 목록 `SYM_SRV` 점검)
  - 다른 카테고리 개수는 그대로다.
  - 영문명 중복이 없고(정규화 비교 포함), 관련 용어·증상 대상이 모두 있다.
- PRODUCT.md 개수 표기가 실제와 같다.
- 직접 조작 4장: `init`이 있고, 결과 문장에 `aria-live`가 있고, 문장 갱신은 `psay`로 한다. `board(h)` 가짜 판으로 실제 init을 돌려 결과 문장이 바뀌는지 본다(`srvdmrun`).
- 재생 버튼이 붙는 새 그림(`m:1`)에 움직이는 요소(`A` 클래스)가 있다.
- server 카드의 객체 v가 0장이다(`srvobj`). 92장 모두 `u-server-` 키를 쓴다(`srvukey`). 하위항목 순서가 맞다(`srvcat`).
- 뜻이 다른 짝(4장 목록)에는 r이 없다(`SRV_WRONG`). server 카드끼리 같은 그림이 없다(`srvsameh`).
- 서버 카테고리 모든 카드에 x가 있다. o:1이면 u가 있다.
- `srvmap()`·`metric()`이 한도를 넘거나 잘못된 입력을 받으면 오류를 던진다(`srvhelp`).
- 읽히는 글의 기호 점검(`wsym`)을 server 카드 전체에 적용한다.

브라우저(playwright) 확인:
- 320/375/1280 세 폭과 reduced-motion에서 넘침 0, 11px 미만 글자 0, 콘솔 오류 0
- reduced-motion에서 자동 재생이 없고, 재생 버튼이 동작한다.
- 직접 조작 4장을 키보드로 조작할 수 있다.

그 밖:
- 디자인 품질: break-ui(`srvmap` 서버 4대 × 6폭 + tag 6폭 + note 28폭, `metric` 선 3개 × 12점 + x 이름표 12개 × 5폭 + limit·mark)로 보고, better-ui·better-layout으로 그림을 다듬는다.
- 그림 표(3.3·3.4)에 적은 `seq` 글·`fcss` 줄·`srvmap` 이름·`note`가 도우미 한도 안에 드는지 계획서에서 카드마다 `wlen`으로 다시 센다. 실제 입력은 도우미 입력 검사가 마지막으로 막는다.
- 문구: x·d는 better-writing·ux-writing 기준(짧고, 차이 먼저, 해요체)으로 쓴다.
- 직접 조작은 better-accessibility로 키보드·읽기 순서를 본다.
- 정의·설명의 사실은 Task마다 공식 문서로 검색해 확인하고 출처를 원장에 남긴다. 설계 단계 확인(검색, 2026-11-03, 2차 출처는 계획서에서 1차 문서로 다시 확인):
  - 413 이름은 RFC 9110에서 Content Too Large(옛 Payload Too Large), 503·504 뜻([MDN 413](https://developer.mozilla.org/ko/docs/Web/HTTP/Status/413), 원문 rfc-editor.org RFC 9110 재확인).
  - Nginx upstream 기본은 가중 round-robin이고 `least_conn`·`ip_hash`(같은 사용자 고정)가 있다([nginx load balancing 문서 미러](https://freenginx.org/hg/nginx-site/file/f4360f884f2d/xml/en/docs/http/load_balancing.xml), nginx.org 재확인).
  - `client_max_body_size` 기본 1m이고 넘으면 413, `keepalive_timeout` 기본 75s([Better Stack](https://betterstack.com/community/questions/default-nginx-client-max-body-size-value.md), [freenginx 기록](https://freenginx.org/hg/nginx-site/rev/f122a777a6de), nginx.org 재확인). 그림 속 한도는 예시로 쓴다.
  - `nginx -s reload`는 설정을 검사해 새 작업자를 띄우고, 옛 작업자는 하던 요청을 끝낸 뒤 끝난다. 설정이 틀리면 옛 설정을 유지한다([Netdata](https://www.netdata.cloud/guides/nginx/nginx-reload-not-applying-config/), nginx.org Controlling nginx 재확인).
  - Let's Encrypt 인증서는 지금 기본 90일이고 줄어들 예정이다(2027-02-10 기본 64일, 2028-02-16 45일). 고정 간격 대신 ARI를 쓰거나 수명 약 2/3 지점에 갱신하라고 권한다([Let's Encrypt: From 90 to 45](https://letsencrypt.org/2025/12/02/from-90-to-45), [SecurityWeek](https://securityweek.com/lets-encrypt-cuts-default-certificate-validity-to-64-days-ahead-of-45-day-switch)). 카드에는 날짜를 단정하지 않고 "줄어드는 중"으로 쓴다.
  - AWS 로드 밸런서의 deregistration delay·connection draining 기본은 300초(1~3600)다([AWS CLB connection draining](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/config-conn-drain.html)).
  - IaaS·PaaS·SaaS 정의는 NIST SP 800-145를 따른다([NIST SP 800-145](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf)).
  - AWS Availability Zone은 전원·네트워크가 분리된 하나 이상의 데이터센터, Region은 떨어진 지리 영역이다([AWS Regions and AZs](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html)).
  - OOM killer가 끈 컨테이너는 exit code 137(128 + 9, SIGKILL)이고 Docker는 OOMKilled로 표시한다([Netdata exit 137](https://www.netdata.cloud/guides/docker/docker-exit-code-137/), Docker 공식 문서 재확인).
  - 로그 심각도는 RFC 5424의 0 Emergency~7 Debug다([발표 자료](https://indico.ess.eu/event/964/sessions/3631/attachments/7471/10633/Logging.pdf), RFC 5424 원문 재확인). 카드 그림은 흔히 쓰는 DEBUG·INFO·WARN·ERROR 네 단계로 줄인다.
  - logrotate는 daily·rotate N·compress(gzip 기본)로 옛 로그를 돌려 쓴다([logrotate man](https://manpages.debian.org/jessie/logrotate/logrotate.8.en.html)).
  - 업타임 계산(측정, 계산): 30일 = 43,200분, 0.1% = 43.2분, 0.01% = 4.32분.

## 9. 글꼴

새 문구에 Hahmlet 서브셋에 없는 글자가 있으면 font 점검이 실패한다. 주석에 쓴 글자도 포함된다.
- 문구를 모두 넣은 뒤(계획서 ② 5단계) 서브셋을 다시 만든다.
- 중간 Task에서는 없는 글자를 피하거나, 그 Task 안에서 서브셋을 갱신한다.

## 10. 위험

| 위험 | 대응 |
|---|---|
| 작업량이 커서 컨텍스트가 압축됨 | 계획서 둘로 나눔, 원장(`.superpowers/sdd/…/progress.md`), 체크포인트 메모리, Task마다 커밋 |
| `srvmap` 서버 4대가 320px에 안 들어감 | 계획서 ① Task 1에서 break-ui로 재고, 넘치면 2대씩 두 줄로 접음(폭 한도는 낮추지 않음) |
| `metric` SVG가 줄면서 글자가 작아짐 | 글자는 모두 SVG 밖 HTML, SVG는 장식(`aria-hidden`), 값은 `.sr`로 읽음 |
| 설정 문법·기본값이 서버 프로그램·버전마다 다름 | Nginx 기준으로 쓰고 x에 "서버 프로그램마다 달라요", 숫자는 "(예)"·"기본값(Nginx 예)"로 표시 |
| 인증서 수명처럼 바뀌는 사실을 단정 | 날짜를 카드에 박지 않고 "줄어드는 중", 출처는 원장에 |
| 같은 그림(3칸 bkStack, IaaS·PaaS·SaaS 층)이 겹쳐 보임 | 강조 칸·꼬리표 위치를 다르게, 같은 `h`는 `srvsameh`로 막음 |
| `metric` x 이름표 12개가 320px에 안 들어감 | 5개 이상이면 첫·가운데·끝만, 4개라도 y 눈금이 7폭 이상이면 첫·끝만 그림에 쓴다(Task 1·검토 A에서 잼) |
| 클라우드 제품 이름이 늘어남 | 카드 주제이거나 "예"로 드는 이름만, 로고 없음 |
| 상태코드 설명이 back·net 카드와 어긋남 | 그 카드 본문은 바꾸지 않고 r로만 잇고, x에서 차이를 씀 |
| 같은 뜻 카드가 다른 이름으로 또 생김 | `dup` 정규화 비교, 계획서마다 다른 카테고리 d와 대조 |
