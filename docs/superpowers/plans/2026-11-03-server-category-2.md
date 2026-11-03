# 서버 카테고리 보강 실행 계획 ②

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 계획서 ①(도우미·하위항목·다시 그리기·x, 끝남)에 이어 서버를 마친다.
- status·conf 새 카드 15장, scale·res·infra 새 카드 31장
- 직접 조작 4장(Load Balancer·Failover·Auto Scaling·Out of Memory)
- 증상 12개
- 글꼴·문서·전체 점검. 끝나면 `LATER`가 비어 있다.

**Architecture:** `index.html` 하나에서 작업한다.
- 카드: status 5장은 기존 `T('server','status',[…])` 끝에 붙이고, `T('server','conf',…)`·`scale`·`res`·`infra` 새 블록을 `status` 블록 뒤, `T('server','tip',…)` 앞에 둔다.
- 그림: `/* server: 새 카드 status·conf … */`·`/* server: 새 카드 scale·res·infra … */` 주석과 `Object.assign(D, {...})`를 계획서 ①의 마지막 server 묶음 뒤, `const visual` 앞에 둔다. 새 상태 함수는 그 `Object.assign` 바로 앞 `const`로 둔다.
- 직접 조작: 계획서 ① 상태 함수(`slb`·`sfail`과 `…Say`)와 이 계획 Task 2의 `sauto`·`soom`을 쓴다. 그림 4장의 `h`를 바꾸고 `init`을 더한다.
- 증상: `SYM('느림',[…])`(지금 3786줄)과 `SYM('오류·안 됨',[…])`(3808줄) 끝에 붙인다. 앞 Task가 줄을 늘리므로 `grep -n "^SYM('"`로 찾는다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`), Python `http.server` + Playwright MCP, Python fontTools(`font_subset.py`)

**Spec:** [docs/superpowers/specs/2026-11-03-server-category-design.md](../specs/2026-11-03-server-category-design.md)

**스펙 보충(스펙에 없는 것을 계획이 정함):**
- **브랜치·원장**: `server-category`에서 계속한다. 원장은 이 계획서의 작업 폴더(`sdd-workspace`가 알려 줌)에 새로 만든다. 계획서 ① 원장(`…/2026-11-03-server-category-1/progress.md`)의 `Ruling:` 줄은 읽기만 한다.
- **고르기 버튼 찾기**: `tpick`은 `data-k`에 `esc(이름)`을 넣는다. 가짜 판 `board`와 브라우저의 값이 다를 수 있어(db 판정), init과 `srvdmrun`은 고르기 버튼을 **순서(번호)**로 찾고 값 비교를 하지 않는다.
- **직접 조작 처음 그림**: 처음 장면은 첫 번째 버튼 상태다. Load Balancer `slb('rr')`, Failover `sfail(false)`, Auto Scaling `sauto('dawn')`, Out of Memory `soom('small')`. 계획서 ①의 Failover 멈춘 그림(`sfail(true)`)은 이 계획에서 바뀐다.
- **그림 안 도우미**: 직접 조작 그림 안의 `srvmap`·`metric`·`track`은 `label`을 넘기지 않고 `still:true`다(db 판정: 그림 안 `role="group"`이 고르기 그룹과 헷갈림). 그림 설명은 각 도우미의 sr 문장이 맡는다.
- **새 상태 함수**: Task 2의 `SAUTO`·`sauto`·`sautoSay`, `SOOM`·`soom`·`soomSay`, `SLAYER`·`slayer`. 장면 데이터는 객체 상수 한 곳에 둔다(스펙 3.5).
- **r 상한**: PaaS 후보는 넷(IaaS·SaaS·Serverless·BaaS)이라 r은 `['IaaS', 'SaaS', 'Serverless']`이고 BaaS는 x에서만 쓴다. r 대상 21개(Browser Cache·Timeout·Zero Downtime Deploy·Session·Session Store·Memory Leak·Memory Leak Bug·Logging·Status Page·Process·Hosting·DNS·CDN·BaaS·Serverless 등)는 모두 있다(측정 2026-11-03, `grep -c "en:'…'"` 각 1).
- **seq 한도**(계획서 ① 따름): 세로줄 3개면 이름 8폭, 메시지 14폭, 8개까지. 이 계획의 세로줄 이름은 `브라우저`(8)·`프록시`(6)·`앱`(2)·`Nginx`(5)·`서버`(4)다.
- **글꼴**: Task 1~4에서 새 글자가 서브셋에 없으면 `LATER font`가 나온다. Task 5에서 서브셋을 다시 만든다. 스크립트는 `C:/Users/HELLOW~1/AppData/Local/Temp/claude/C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide/962f3a91-5cc5-4c9d-9d66-c37542c52687/scratchpad/font_subset.py`와 같은 폴더의 `fontsrc/Hahmlet.ttf`다(측정). 다른 세션이면 이 계획 scratchpad로 복사해 쓴다.
- **사실 확인 출발점**: 스펙 8장 목록(413·503·504, upstream·`least_conn`·`ip_hash`, `client_max_body_size` 1m, `nginx -s reload`, Let's Encrypt 수명, deregistration delay 300초, NIST SP 800-145, AZ·Region, exit code 137, RFC 5424, logrotate). 더해서 검색(2026-11-03): 201은 `Location`으로 새 자원을 가리키고, 304는 `If-None-Match` 조건부 GET의 답이며, 503은 `Retry-After`를 줄 수 있다(2차 자료 [intro-web-tech](https://intro-web-tech.pages.dev/http/reference/02_status-codes), Task 1에서 RFC 9110 15.3.2·15.3.5·15.4.5·15.6.4와 10.2.3을 연다). `nginx -t` 성공 출력은 "syntax is ok"·"test is successful" 두 줄이다(2차 자료 [leyaa.ai](https://leyaa.ai/codefly/learn/nginx/part-1/nginx-configuration-testing-nginx-t), Task 1에서 nginx.org를 연다).

## Global Constraints

계획서 ①의 Global Constraints를 그대로 따른다([2026-11-03-server-category-1.md](2026-11-03-server-category-1.md) "Global Constraints"). 그중 이 계획에서 자주 걸리는 것:
- 색은 도판 토큰만 쓰고, 그림 글자는 11px 이상이다.
- `m:1` ⇔ 그림 h에 `A`가 있다. still이 아닌 `srvmap`·`seq`·`track`·`doc`·`term`이 `A`를 만든다. `httpmsg`·`metric`·`fcss`·`bk*` 조각만 있는 그림과 직접 조작 그림은 `m`이 없다. `srvm`이 본다.
- 예시 IP는 `192.0.2.x`·`198.51.100.x`·`203.0.113.x`, 도메인은 `example.com`, 이름은 민수·지영·준호만 쓴다. 숫자·시각·크기는 cap이나 꼬리표로 "예시"를 표시한다.
- 읽히는 글에 `✓✕★→←↑↓`를 쓰지 않는다. 버전 숫자와 "가장 빠른·최신" 단정을 쓰지 않고, 인증서 수명은 "줄어드는 중"으로 쓴다.
- 카드 문구:
  - 새 카드 `d`·`x`는 해요체다. `x`는 2~3문장이고 짝과의 차이를 먼저 쓴다.
  - `p`는 정식 용어를 넣고 "~해줘"로 끝낸다. `l`은 1~3이다. `ko`는 `한글 · 풀이` 형식이다.
- `r`은 1~3개이고, 스펙 4장 후보 중 이미 있는 카드만 단다. `SRV_WRONG` 짝은 r에 넣지 않는다. 다른 카테고리 카드 본문은 바꾸지 않는다.
- `o:1`은 1차 문서(RFC·nginx.org·NIST·AWS·Let's Encrypt·Docker 공식)를 직접 열어 확인했을 때만 쓰고, 그때 `u`(주소 문자열)를 단다.
- 커밋: 한국어 `feat:`/`fix:`/`docs:`, attribution 줄 없음. `.impeccable/hook.cache.json`·`core375.png`는 올리지 않고 경로를 지정해 올린다.
- Python은 `newline='\n'`로 쓰고 `python -E`로 돌린다. 브라우저는 Playwright MCP로 보고 평소 Chrome 프로필은 쓰지 않는다.

## Review Focus

1. **직접 조작 키보드**: Tab으로 모든 버튼에 가고 Enter·Space로 누를 수 있어야 한다.
   - 결과 문장(`aria-live="polite"`)이 바뀌고, 고르기 그룹의 `aria-pressed="true"`는 하나뿐이다.
   - 버튼을 20번 눌러도 320px에서 그림판 밖으로 넘치지 않는다. Auto Scaling(서버 4대 + 그래프)·Out of Memory(그래프 + track)에서 `.mk-hint`(absolute)가 그림과 겹치지 않는다.
   - → Task 3 브라우저 확인
2. **바꾼 뒤 상태**: 방식·상태·시간대·한도를 바꾸면 그림과 문장이 새 값으로 바로 바뀐다. 첫 장면이 첫 버튼 상태와 같다(Failover는 정상에서 시작). 같은 버튼을 다시 눌러도 그림이 그대로다. → Task 3 `srvdmrun`
3. **자주 틀리는 HTTP·Nginx 사실**:
   - 413은 RFC 9110에서 Content Too Large(옛 Payload Too Large)이고, nginx 문서는 Request Entity Too Large로 적는다([nginx.org core](https://nginx.org/en/docs/http/ngx_http_core_module.html)). 502(이상한 답)·503(잠시 못 받음)·504(답이 없음)가 다르다. 304(바뀌지 않음)와 301(영구 이동)이 다르다.
   - `client_max_body_size` 기본은 1m이다. `nginx -s reload`는 새 설정이 틀리면 옛 설정을 유지한다.
   - Let's Encrypt 수명은 날짜를 박지 않고 "줄어드는 중"이다. OOM으로 꺼진 컨테이너는 exit code 137이다.
   - IaaS·PaaS·SaaS는 NIST SP 800-145, AZ·Region은 AWS 문서와 같다.
   - → Task 1·2 사실 확인·`SRV_XHAS`, 디렉터 검토 D
4. **헷갈리는 짝**: `SRV_WRONG` 짝(Sticky Session vs Position Sticky 등)에 r이 없다. IaaS·PaaS·SaaS 그림은 서로 다르고(`srvsameh`), x가 "어디까지 내가 하느냐"로 나뉜다. → Task 2 `srvwrong`·`srvsameh`·`SRV_XHAS`
5. **새 그림의 주소·비밀 값**: Access Log(`203.0.113.5`)·Virtual Host(`203.0.113.10`) 말고 다른 IP가 없고, Upstream 서버 이름(`app1:3000`)·도메인은 예시다. → Task 1·2 `srvsafe`

---

## 공통 절차 (Task 1~5)

계획서 ①의 공통 절차·브라우저 확인 절차를 따른다([2026-11-03-server-category-1.md](2026-11-03-server-category-1.md) "공통 절차"). 다른 점:
- **그림 띄우기**: 그림은 스크롤해야 그려진다. 계획서 ① 공통 절차의 `scrollIntoView` 루프(`#view .fig`마다 60ms)를 `browser_run_code_unsafe` 한 번 안에서 돌리고 잰다.
- **폭·움직임**: 1280/375/320 × reducedMotion `no-preference`/`reduce`. 넘침·11px 미만·가로 스크롤·콘솔 오류(favicon 404 제외)가 0이어야 한다.
- **긴 점검**: `node tests/check.mjs > <작업 폴더>/run.txt 2>&1` 뒤 `grep -E '^(FAIL|OK|LATER)'`로 본다. Bash timeout은 200000이다.
- **wlen**: 그림 표의 괄호 숫자는 잰 wlen이다. 도우미가 오류를 던지면 같은 뜻으로 줄이고 원장에 적는다.

### 디렉터 검토 시점

디렉터 에이전트(Opus 5.5, effort high)에게 맡긴다. 압축 뒤라 ID를 모르면 새로 띄운다.
- **묶음 D — status·conf 새 카드**: Task 1 뒤
- **묶음 E — scale·res·infra·직접 조작**: Task 3 뒤(Task 2~3 diff)
- **최종 검토**: Task 5 뒤 브랜치 전체(`git merge-base main HEAD`..HEAD). 계획서 ①·② Review Focus를 같이 준다.

결과 처리:
- Critical·Important·Minor를 모두 고친다(사용자 지시). 고칠 것은 실패하는 점검을 먼저 쓰고 고친다(RED→GREEN). 점검으로 잡기 어려운 문구 지적은 고친 뒤 원장에만 적는다.
- 고친 뒤 같은 디렉터에게 재확인을 맡기고, 0건이 될 때까지 되풀이한다.
- 원장에 `Review <묶음>: fixed …`로 적는다. 고치지 않는 지적은 `Ruling:`에 이유를 적는다.

---

### Task 1: status·conf 새 카드 15장 (공통 절차)

쓸 스킬: design-skills:ux-writing·interfaces:better-writing(d·x), superpowers:test-driven-development

**Files:**
- Modify: `index.html`: status 블록 끝 5장, 새 블록 `T('server','conf',…)`, 그림 묶음 `/* server: 새 카드 status·conf … */`
- Modify: `tests/check.mjs`: EXPECT·COUNT·total·LATER, `SRV_XHAS` 항목

**Interfaces:**
- Consumes: `httpmsg`·`seq`·`term`·`track`·`fcss`·`bkStack`·`bkBox`·`bkRows`, 계획서 ① 점검(`srvukey`·`srvm`·`srvtext`·`srvxn`·`srvsafe`·`srvsameh`)
- Produces: 카드 15장. Task 4 증상이 연결 대상으로 쓴다(503·504·Upstream·Proxy Pass·Config Reload·Certificate Renewal·Client Body Size Limit). `SRV_XHAS` 새 항목 9개(Task 2가 더 더함).

- [ ] **Step 1: 실패하는 점검**
  - `EXPECT['server/status']`: `['201 Created', '204 No Content', '304 Not Modified', '503 Service Unavailable', '504 Gateway Timeout']`
  - `EXPECT['server/conf']`: 아래 표 순서 10장
  - `COUNT`: `server/status` 10→15, `server/conf` 0→10
  - `total`: 1572→1587(주석에 "+ 서버")
  - `LATER`에 `'doccount'`를 더한다(PRODUCT.md 개수는 Task 5에서 고침).
  - 계획서 ① Task 5의 `SRV_XHAS` 객체 안 `'Docker': ['운영체제']` 뒤에 쉼표를 붙이고 아래 줄을 넣는다(새 객체를 만들지 않음). 점검 `srvxhas`는 그대로 쓴다.

```js
  '201 Created': ['Location'], '204 No Content': ['본문'], '304 Not Modified': ['301'], '503 Service Unavailable': ['Retry-After'], '504 Gateway Timeout': ['502'],
  'Client Body Size Limit': ['413', 'client_max_body_size'], 'Config Reload': ['nginx -t'], 'Certificate Renewal': ['자동'], 'Keep-Alive': ['연결'],    // Task 2가 더한다
```

- [ ] **Step 2: 실패 확인**: `FAIL expect:server/status`·`expect:server/conf`, `FAIL count:server/status: 10 ≠ 15`·`count:server/conf: 0 ≠ 10`, `FAIL total`, `FAIL srvxhas: 201 Created, …`(새 카드 9개). 옛 카드 5개(502·401·Uptime·SSL Certificate·Docker)는 계획서 ① Task 5에서 이미 통과했다.
- [ ] **Step 3~5**: 공통 절차 3~5
  - 모든 새 카드에 `x`와 `v:'u-server-<slug>'`를 넣는다.
  - 통과하면 `FAIL` 없이 `OK`가 나온다. `LATER`에는 `doccount`와 `font`만 남을 수 있다.
- [ ] **Step 6: 브라우저 확인**: `#/c/server/status`·`#/c/server/conf` × 3폭 × 2움직임. 304의 두 메시지, Static File Serving 메시지 7개, Config Reload 명령 줄이 320px에서 넘치지 않는지 본다.
- [ ] **Step 7: 커밋**: `feat: 서버 상태코드·웹 서버 설정 새 카드`

**카드와 그림**(`{0→1 '…'}`는 `{from:0, to:1, t:'…'}`. 괄호 숫자는 wlen. 숫자·이름은 예시):

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| status | 201 Created | 생성됨 · 새로 만들었다는 응답 | `httpmsg({kind:'응답', start:'201 Created', head:['Location: /posts/7'], hl:['h0']})`, cap "새로 만들어졌어요" | 200 OK |
| status | 204 No Content | 내용 없음 · 성공했지만 돌려줄 본문이 없음 | `httpmsg({kind:'응답', start:'204 No Content'})`, cap "지우기 성공, 돌려줄 본문은 없어요" | 200 OK |
| status | 304 Not Modified | 바뀌지 않음 · 가진 것을 그대로 쓰라는 응답 | `bkStack(httpmsg({kind:'요청', start:'GET /style.css', head:['If-None-Match: "a1"'], hl:['h0']}), httpmsg({kind:'응답', start:'304 Not Modified', head:['ETag: "a1"']}))`, cap "가진 것을 그대로 쓰세요" | Browser Cache |
| status | 503 Service Unavailable | 서비스 이용 불가 · 잠시 요청을 받을 수 없음 | `httpmsg({kind:'응답', start:'503 Service Unavailable'(23), head:['Retry-After: 120'], hl:['h0']})`, cap "잠시 받을 수 없어요(120초는 예시)" | Maintenance Page, Downtime |
| status | 504 Gateway Timeout | 게이트웨이 시간 초과 · 위쪽 서버가 제때 답하지 않음 | `seq(['브라우저', '프록시', '앱'], [{0→1 'GET /api'}, {1→2 '넘김'}, {2→2 '처리 중', wait:1}, {1→0 '504 시간 초과'(13), err:1}])`, cap "502는 이상한 답, 504는 답이 없음" | 502 Bad Gateway, Timeout |
| conf | Nginx | 엔진엑스 · 많이 쓰는 웹 서버 프로그램 | `fcss('nginx.conf', 'server {', '  listen 80;', '  server_name example.com;', '  root /var/www;', '}')` | Web Server, Apache |
| conf | Apache | 아파치 · 오래 쓰여 온 웹 서버 프로그램 | `fcss('httpd.conf', '<VirtualHost *:80>', 'ServerName example.com', 'DocumentRoot /var/www', '</VirtualHost>')` | Web Server, Nginx |
| conf | Virtual Host | 가상 호스트 · 서버 한 대로 여러 사이트 | `bkStack(bkBox('서버 한 대', '203.0.113.10'), bkRows(['a.example.com', '폴더 a'], ['b.example.com', '폴더 b']))`, cap "주소는 예시예요" | Web Server, DNS |
| conf | Static File Serving | 정적 파일 제공 · 그림·CSS를 바로 내줌 | `seq(['브라우저', 'Nginx', '앱'], [{0→1 'GET /logo.png'(13)}, {1→1 '파일 바로'}, {1→0 '파일'}, {0→1 'GET /api'}, {1→2 '넘김'}, {2→1 'JSON'}, {1→0 'JSON'}])`, cap "파일은 Nginx가, API는 앱이 답해요" | Web Server, CDN |
| conf | Proxy Pass | 프록시 패스 · 받은 요청을 앱으로 넘기는 설정 | `fcss('nginx.conf', 'location /api/ {', '  proxy_pass http://app;', '}')`, cap "app은 Upstream에 적은 서버 묶음" | Reverse Proxy, Upstream |
| conf | Upstream | 업스트림 · 요청을 넘길 서버 묶음 | `fcss('nginx.conf', 'upstream app {', '  server app1:3000;', '  server app2:3000;', '}')`, cap "서버 이름은 예시예요" | Load Balancer, Proxy Pass |
| conf | Keep-Alive | 연결 유지 · 연결 하나로 여러 번 주고받기 | `seq(['브라우저', '서버'], [{0→1 '연결'}, {0→1 '요청 1'}, {1→0 '응답 1'}, {0→1 '요청 2'}, {1→0 '응답 2'}])`, cap "연결 하나로 여러 번" | Request-Response Cycle |
| conf | Config Reload | 설정 다시 읽기 · 끊지 않고 새 설정 적용 | `bkStack(term([{c:'nginx -t'}, {o:'nginx: … syntax is ok'}, {o:'nginx: … test is successful'}, {c:'nginx -s reload'}]), '<p class="mk-dgp">끊지 않고 새 설정을 읽어요</p>')`, cap "출력은 줄였어요(Nginx 예). 서버에서는 보통 sudo를 붙여요" | Restart, Zero Downtime Deploy |
| conf | Certificate Renewal | 인증서 갱신 · 만료 전에 새로 받기 | `track([{t:'인증서 발급', s:'done', w:'1일째'}, {t:'자동 갱신', s:'done', w:'약 60일째'}, {t:'새 만료일', s:'done', w:'다시 90일'}])`, cap "90일 인증서 예시예요. 수명은 줄어드는 중이에요" | SSL Certificate, HTTPS |
| conf | Client Body Size Limit | 업로드 크기 제한 · 보낼 수 있는 본문 최대 크기 | `seq(['브라우저', 'Nginx', '앱'], [{0→1 '20MB 업로드'(11)}, {1→0 '413 너무 큼'(11), err:1}])`, cap "앱까지 가지도 않아요, 한도는 예시 10MB" | Storage |

- `m:1`: 504·Static File Serving·Keep-Alive·Config Reload(`term`)·Certificate Renewal(`track`). `httpmsg`·`fcss`·`bk*` 카드는 없다. `srvm`이 최종 판정한다.
- `httpmsg`의 `head`가 빈 배열이면 헤더 줄이 없다(204·503은 본문이 없음). 304 응답에 `ETag`를 넣은 것은 RFC 9110 15.4.5(304는 200이었다면 보냈을 `ETag`를 보냄)를 따른 계획 판단이다. 1차 문서와 다르면 빼고 원장에 적는다.
- Config Reload의 `…`는 경로를 줄인 표시다(cap에 적음). `wsym`이 `…`를 막으면 "(경로 줄임)"으로 바꾼다.

x 짝(스펙 5장). x 첫 문장에 차이를 쓴다.
- 200 OK vs 201 Created vs 204 No Content, 301 Redirect vs 304 Not Modified
- 502 vs 504 vs 503 vs 500
- Nginx vs Apache, Reverse Proxy vs Proxy Pass vs Upstream, Web Server vs Static File Serving
- Request-Response Cycle vs Keep-Alive
- Restart vs Config Reload vs Graceful Shutdown, SSL Certificate vs Certificate Renewal
- Client Body Size Limit vs Storage

x에 꼭 넣을 사실(`SRV_XHAS`가 본다):
- 201 Created: 새로 만든 것의 주소를 `Location` 헤더로 알려 줘요.
- 204 No Content: 성공했지만 응답 본문이 없어요.
- 304 Not Modified: 301은 주소가 옮겨졌다는 뜻이고, 304는 가진 것을 그대로 쓰라는 뜻이에요.
- 503 Service Unavailable: `Retry-After`로 언제 다시 올지 알려 줄 수 있어요.
- 504 Gateway Timeout: 502는 위쪽 서버가 이상한 답을 줬고, 504는 답이 오지 않았어요.
- Client Body Size Limit: Nginx는 `client_max_body_size`(기본 1m)를 넘으면 413을 돌려줘요. RFC 9110 이름은 Content Too Large이고, nginx 문서에는 Request Entity Too Large로 적혀 있어요.
- Config Reload: `nginx -t`로 먼저 검사해요. 틀린 설정이면 옛 설정으로 계속 돌아요.
- Certificate Renewal: 손으로 하면 잊기 쉬워 자동으로 갱신해요. 갱신이 실패하면 만료돼요.
- Keep-Alive: 요청마다 새로 연결하지 않고 연결 하나를 다시 써요.

출처를 Step 3에서 연다: RFC 9110(15.3.2 201, 15.3.5 204, 15.4.5 304, 15.5.14 413, 15.6.4 503, 15.6.5 504, 10.2.3 Retry-After), MDN 각 상태 코드, nginx.org(`ngx_http_core_module` `client_max_body_size`·`keepalive_timeout`·`server_name`·`root`, `ngx_http_proxy_module` `proxy_pass`, `ngx_http_upstream_module`, Controlling nginx `-t`·`-s reload`), Apache httpd 문서 VirtualHost, Let's Encrypt 갱신·수명 안내(스펙 8장).

뒤이어 **디렉터 검토 묶음 D**

---

### Task 2: scale·res·infra 새 카드 31장 (공통 절차)

쓸 스킬: design-skills:ux-writing·interfaces:better-writing(d·x), superpowers:test-driven-development

**Files:**
- Modify: `index.html`: 새 블록 `T('server','scale',…)`·`res`·`infra`, 상태 함수(`SAUTO`·`sauto`·`sautoSay`·`SOOM`·`soom`·`soomSay`·`SLAYER`·`slayer`), 그림 묶음 `/* server: 새 카드 scale·res·infra … */`
- Modify: `tests/check.mjs`: EXPECT·COUNT·total, `SRV_XHAS`, `srvstill`

**Interfaces:**
- Consumes: `srvmap`·`metric`(계획서 ① Task 1), `track`·`bk*` 조각
- Produces(Task 3이 버튼을 붙임. 값은 예시):
  - `SAUTO = {dawn: {n: 1, got: [1], cpu: [15, 12, 10, 12, 14, 15], say: '손님이 적어 1대로 충분해요'}, day: {n: 2, got: [3, 3], cpu: [40, 45, 50, 48, 45, 42], say: '2대가 나눠 받아 CPU가 70% 밑이에요'}, event: {n: 4, got: [3, 3, 2, 2], cpu: [45, 60, 85, 90, 65, 55], mark: {i: 2, n: '2대 더 켬'}, say: 'CPU가 70%를 넘어 2대를 더 켰어요'}}`
  - `sauto(k: 'dawn' | 'day' | 'event') → string`: `bkStack(srvmap({front:'LB', servers, still:true}), metric({lines:[{n:'CPU', pts: SAUTO[k].cpu}], x:['0분', '10분', '20분', '30분', '40분', '50분'], unit:'%', limit:{v:70, n:'늘림 기준'}, mark: SAUTO[k].mark}))`. 서버는 `서버 1`~`서버 n`, got은 `SAUTO[k].got`, `event`의 서버 3·4는 `st:'new'`.
  - `sautoSay(k) → string`: `SAUTO[k].say`
  - `SOOM = {small: {limit: 512, pts: [200, 300, 400, 512, 200, 300], mark: {i: 3, n: '강제 종료'}, say: '한도에 닿아 강제 종료됐어요(exit code 137, 예)'}, big: {limit: 1024, pts: [200, 350, 500, 650, 800, 1024], mark: {i: 5, n: '강제 종료'}, say: '한도만 늘리면 늦게 죽을 뿐이에요'}, fixed: {limit: 512, pts: [200, 220, 210, 220, 215, 220], say: '새는 곳을 고쳐 평평해요'}}`
  - `soom(k: 'small' | 'big' | 'fixed') → string`: `bkStack(metric({lines:[{n:'메모리', pts}], x:['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'], max:1200, unit:'MB', limit:{v: SOOM[k].limit, n:'최대'}, mark}), track(steps, {still:true}))`. small·big의 steps: `메모리 차오름`(done)·`한도에 닿음`(fail)·`강제 종료(137)`(fail)·`다시 켬`(done). fixed: `메모리 일정`(done)·`계속 실행 중`(now).
  - `soomSay(k) → string`: `SOOM[k].say`
  - `SLAYER = ['앱', '런타임', '운영체제', '서버']`
  - `slayer(n: 0 | 1 | 2 | 3) → string`: `bkRows`로 `SLAYER` 위에서 아래로, 앞 `n`개는 꼬리표 `내가`, 나머지는 `회사가`.
  - 잘못된 값(없는 k, 0~3 밖 정수가 아닌 n)은 `'sauto: '`·`'soom: '`·`'slayer: '` 오류를 던진다.

- [ ] **Step 1: 실패하는 점검**
  - `EXPECT['server/scale']`·`['server/res']`·`['server/infra']`: 아래 표 순서
  - `COUNT`: `server/scale` 0→10, `server/res` 0→11, `server/infra` 0→10
  - `total`: 1587→1618
  - `SRV_XHAS`에 더한다: `'Sticky Session': ['Session Store'], 'Out of Memory': ['137'], 'Availability Zone': ['Region'], 'Region': ['Availability Zone'], 'Swap Memory': ['느려'], 'Log Level': ['INFO'], 'IaaS': ['PaaS'], 'PaaS': ['IaaS'], 'SaaS': ['PaaS'], 'Round Robin': ['Least Connections'], 'Horizontal Scaling': ['Vertical']`
  - `srvstill`(계획서 ① Task 3) 안 `return` 앞에 더한다:

```js
  const da = sauto('dawn'), dy = sauto('day'), ev = sauto('event');
  if (!da.includes('style="--n:1"') || !dy.includes('style="--n:2"') || !ev.includes('style="--n:4"') || n(ev, '>새로 켬<') !== 2 || !ev.includes('2대 더 켬') || !da.includes('늘림 기준 70%') || WA(da + dy + ev)) bad.push('sauto');
  if (sautoSay('event') !== 'CPU가 70%를 넘어 2대를 더 켰어요' || sautoSay('dawn') !== '손님이 적어 1대로 충분해요') bad.push('sautoSay');
  const sm = soom('small'), bg = soom('big'), fx = soom('fixed');
  if (!sm.includes('최대 512MB') || !sm.includes('강제 종료(137)') || !bg.includes('최대 1024MB') || fx.includes('강제 종료') || !fx.includes('계속 실행 중') || WA(sm + bg + fx)) bad.push('soom');
  if (!soomSay('small').includes('137') || !soomSay('big').includes('늦게') || !soomSay('fixed').includes('평평')) bad.push('soomSay');
  if (n(slayer(3), '내가') !== 3 || n(slayer(3), '회사가') !== 1 || n(slayer(1), '내가') !== 1 || n(slayer(0), '회사가') !== 4) bad.push('slayer');
  [() => sauto('noon'), () => sautoSay(1), () => soom('huge'), () => soomSay(''), () => slayer(4), () => slayer(1.5)].forEach((f, k) => { try { f(); bad.push('안 막음 s' + k); } catch (e) { if (!/^(sauto|soom|slayer): /.test(e.message)) bad.push('메시지 s' + k); } });
```

- [ ] **Step 2: 실패 확인**: `FAIL expect:server/scale`·`res`·`infra`, `FAIL count:server/scale: 0 ≠ 10`(res 11·infra 10), `FAIL total`, `FAIL srvxhas: Sticky Session, …`(11개), `FAIL srvstill: sauto is not defined`
- [ ] **Step 3~5**: 공통 절차 3~5. 통과하면 `FAIL` 없이 `OK`. `LATER`에는 `doccount`와 `font`만 남을 수 있다.
- [ ] **Step 6: 브라우저 확인**: `#/c/server/scale`·`res`·`infra` × 3폭 × 2움직임. Auto Scaling(서버 4대 + 그래프), Swap Memory(선 2개), Access Log 긴 줄이 320px에서 넘치지 않는지 본다.
- [ ] **Step 7: 커밋**: `feat: 서버 확장·자원·인프라 새 카드`

**카드와 그림**(서버 이름 `서버 1`은 6폭. srvmap 서버는 따로 적지 않으면 `st:'ok'`):

| sec | en | ko | 그림 | r |
|---|---|---|---|---|
| scale | Auto Scaling | 자동 확장 · 몰리면 서버를 저절로 늘림 | `sauto('event')`(Task 3에서 직접 조작으로 바뀜) | Scaling, Traffic Spike |
| scale | Horizontal Scaling | 수평 확장 · 같은 서버를 더 늘림 | `srvmap({front:'LB', servers:[서버 1 got 2, 서버 2 got 2, 서버 3 got 2, {n:'서버 4', st:'new', got:1}], note:'같은 서버를 한 대 더'(20)})` | Scaling, Vertical Scaling |
| scale | Vertical Scaling | 수직 확장 · 서버 한 대를 더 크게 | `bkStack(bkBox('지금', 'CPU 2 · 메모리 4GB', '예시'), bkBox('키운 뒤', 'CPU 8 · 메모리 16GB', '예시'))` | Scaling, Horizontal Scaling |
| scale | Round Robin | 라운드 로빈 · 차례대로 나눠 주기 | `bkRows(['요청 1', '서버 1'], ['요청 2', '서버 2'], ['요청 3', '서버 3'], ['요청 4', '서버 1'])`, cap "차례대로 돌아가며 줘요" | Load Balancer, Least Connections |
| scale | Least Connections | 최소 연결 · 가장 한가한 서버에 주기 | `bkRows(['서버 1 처리 중 5', ''], ['서버 2 처리 중 1', '다음 요청'], ['서버 3 처리 중 4', ''])`, cap "숫자는 예시예요" | Load Balancer, Round Robin |
| scale | Sticky Session | 고정 세션 · 같은 사용자를 같은 서버로 | `srvmap({user:'민수', front:'LB', servers:[서버 1 got 1, {n:'서버 2', got:3, tag:'민수'}, 서버 3 got 1], note:'민수 요청은 늘 서버 2로'(23)})` | Session, Session Store |
| scale | Single Point of Failure | 단일 장애점 · 하나만 멈춰도 전체가 멈추는 곳 | `srvmap({front:'LB', servers:[서버 1~3 got 1], db:{n:'DB', st:'down'}, note:'DB 하나가 멈추면 전부 멈춰요'(28)})` | Redundancy, Failover |
| scale | Redundancy | 이중화 · 같은 것을 둘 이상 둠 | `bkPills('두 겹으로 두기', ['서버', 'DB 복제', '전원', '지역'])` | Failover, Single Point of Failure |
| scale | Connection Draining | 연결 정리 · 새 요청은 막고 하던 일만 끝냄 | `srvmap({front:'LB', servers:[서버 1 got 3, {n:'서버 2', st:'drain', got:2}, 서버 3 got 3], note:'새 요청은 안 받고 하던 것만'(27)})` | Graceful Shutdown, Load Balancer, Zero Downtime Deploy |
| scale | Capacity Planning | 용량 계획 · 언제 얼마나 늘릴지 미리 계산 | `metric({lines:[{n:'CPU', pts:[35, 42, 50, 58, 66, 74]}], x:['1월', '2월', '3월', '4월', '5월', '6월'], unit:'%', limit:{v:80, n:'늘릴 때'}})`, cap "달마다 평균(예시)" | Monitoring, Scaling |
| res | CPU Usage | CPU 사용률 · 계산 장치가 얼마나 바쁜지 | `metric({lines:[{n:'CPU', pts:[20, 25, 30, 95, 40, 25]}], x:['14:00', '14:10', '14:20', '14:30', '14:40', '14:50'], unit:'%', mark:{i:3, n:'치솟음'}})`, cap "숫자는 예시예요" | Monitoring |
| res | Memory Usage | 메모리 사용량 · 작업 공간을 얼마나 쓰는지 | `metric({lines:[{n:'메모리', pts:[58, 60, 61, 59, 60, 61]}], x:(CPU Usage와 같음), unit:'%'})`, cap "꾸준하면 정상이에요" | Monitoring, Memory Leak |
| res | Out of Memory | 메모리 부족 · 한도를 넘어 강제로 꺼짐 | `soom('small')`(Task 3에서 직접 조작으로 바뀜) | Memory Usage, Memory Leak, Memory Leak Bug |
| res | Disk Full | 디스크 가득 참 · 저장 공간이 바닥남 | `bkRows(['디스크 사용 100%', '가득'], ['No space left on device', '예'])` | Log Rotation |
| res | Access Log | 접근 로그 · 누가 무엇을 요청했는지 | `bkRows(['203.0.113.5 GET /api 200', ''], ['203.0.113.5 GET /login 302', ''], ['203.0.113.5 GET /x 404', ''])`, cap "주소는 예시예요" | Server Log, Error Log |
| res | Error Log | 오류 로그 · 무엇이 고장 났는지 | `bkRows(['14:04 ERROR DB 연결 실패', ''], ['14:09 ERROR 파일 없음', ''])`, cap "시각은 예시예요" | Server Log, Access Log |
| res | Log Level | 로그 레벨 · 기록의 중요도 단계 | `bkRows(['DEBUG', '개발용'], ['INFO', '보통'], ['WARN', '주의'], ['ERROR', '고장'])`, cap "운영에서는 보통 INFO부터 남겨요(예)" | Server Log, Logging |
| res | Log Rotation | 로그 교체 · 옛 로그를 묶고 지우기 | `bkRows(['app.log', '오늘'], ['app.log.1.gz', '어제'], ['app.log.7.gz', '다음에 지움'])` | Server Log, Disk Full |
| res | Alert | 알림 · 기준을 넘으면 사람에게 알림 | `bkBox('알림', 'CPU 90% 넘음, 5분째(예시)', '메신저로 보냄')` | Monitoring, Status Page |
| res | Process Manager | 프로세스 관리자 · 앱이 죽으면 다시 켜 줌 | `track([{t:'앱 실행', s:'done'}, {t:'앱 죽음', s:'fail'}, {t:'관리자가 알아챔', s:'done'}, {t:'다시 켬', s:'done'}])` | Restart, Process |
| res | Swap Memory | 스왑 메모리 · 디스크를 메모리처럼 씀 | `metric({lines:[{n:'메모리', pts:[70, 85, 98, 99, 99, 99]}, {n:'스왑', pts:[0, 0, 10, 35, 60, 80]}], x:(CPU Usage와 같음), unit:'%'})`, cap "디스크를 메모리처럼 써서 느려요" | Memory Usage, Out of Memory |
| infra | Virtual Machine | 가상 머신 · 컴퓨터 안의 또 다른 컴퓨터 | `bkStack(bkPills('가상 머신 1', ['앱', '운영체제']), bkPills('가상 머신 2', ['앱', '운영체제']), bkBox('실제 컴퓨터', '한 대를 나눠 씀'))` | VPS, Docker |
| infra | Server Instance | 서버 인스턴스 · 빌린 서버 한 대 | `bkRows(['web-1', '실행 중'], ['web-2', '실행 중'], ['web-3', '꺼짐'])`, cap "이름은 예시예요" | Cloud, Virtual Machine |
| infra | Region | 리전 · 데이터센터가 모인 지역 | `bkPills('지역 예', ['서울', '도쿄', '버지니아'])`, cap "사용자와 가까운 곳을 고르면 빨라요" | Availability Zone |
| infra | Availability Zone | 가용 영역 · 지역 안의 따로 떨어진 데이터센터 | `srvmap({servers:[{n:'서버 1', got:3, tag:'구역 a'}, {n:'서버 2', st:'down', tag:'구역 b'}, {n:'서버 3', got:3, tag:'구역 c'}], note:'구역 b가 멈춰도 a·c가 받아요'(28)})` | Region, Redundancy |
| infra | Object Storage | 오브젝트 스토리지 · 파일을 키로 담는 저장소 | `bkRows(['photos/1.jpg', '2MB'], ['photos/2.jpg', '3MB'], ['backup.zip', '1GB'])`, cap "키와 크기는 예시예요" | Storage |
| infra | IaaS | 서비스형 인프라 · 서버만 빌림 | `slayer(3)` | PaaS, SaaS, Cloud |
| infra | PaaS | 서비스형 플랫폼 · 앱만 올림 | `slayer(1)` | IaaS, SaaS, Serverless |
| infra | SaaS | 서비스형 소프트웨어 · 다 된 프로그램을 씀 | `bkStack(slayer(0), '<p class="mk-dgp">나는 쓰기만 해요</p>')` | IaaS, PaaS |
| infra | On-Premise | 온프레미스 · 우리 건물에 둔 서버 | `bkStack(bkBox('우리 건물 서버', '직접 사고 관리'), bkBox('클라우드', '빌려 씀'))` | Cloud, Self-hosting, Hosting |
| infra | Managed Service | 관리형 서비스 · 운영을 회사가 맡음 | `bkRows(['백업', '회사가'], ['업데이트', '회사가'], ['장애 복구', '회사가'], ['쿼리·데이터', '내가'])` | Self-hosting, PaaS |

- `m:1`: Horizontal Scaling·Sticky Session·Single Point of Failure·Connection Draining·Availability Zone(still 아닌 `srvmap`), Process Manager(`track`). Auto Scaling·Out of Memory는 still이라 없다. `srvm`이 최종 판정한다.
- IaaS·PaaS 그림은 `slayer` 결과만이라 서로 다르고, SaaS는 글 한 줄이 더 붙는다(`srvsameh`). Managed Service의 `내가`·`회사가`는 `slayer`와 같은 말이지만 줄이 달라 다른 그림이다.
- Access Log 줄(26자)이 320px에서 넘치면 `bkRows` 칸의 줄바꿈 규칙을 보고, 그래도 넘치면 IP를 cap으로 옮기고(`GET /api 200`, cap "모두 203.0.113.5에서 온 요청(예시)") 원장에 적는다.

x 짝(스펙 5장). x 첫 문장에 차이를 쓴다.
- Scaling vs Horizontal vs Vertical vs Auto Scaling vs Scale(design)
- Round Robin vs Least Connections, Sticky Session vs Session Store(back)
- Failover vs Redundancy vs Single Point of Failure, Graceful Shutdown vs Connection Draining
- Monitoring vs Capacity Planning, Region vs Availability Zone
- Memory Usage vs Out of Memory vs Memory Leak(perf) vs Memory Leak Bug(bug) vs Swap Memory
- Disk Full vs Log Rotation, Access Log vs Error Log vs Server Log, Log Level vs Logging(back)
- Monitoring vs Alert vs Uptime Monitor(deploy) vs Status Page(deploy) vs Security Alert(security)
- Process Manager vs Restart vs Cron Job
- Virtual Machine vs Docker 컨테이너 vs VPS vs Server Instance
- IaaS vs PaaS vs SaaS vs Serverless vs BaaS(back), Managed Service vs Self-hosting vs On-Premise vs Hosting(web)
- Storage vs Object Storage

x에 꼭 넣을 사실(`SRV_XHAS`가 본다):
- Sticky Session: 서버가 여러 대면 세션을 Session Store에 모아 두는 방법도 있어요.
- Out of Memory: 한도를 넘으면 강제로 꺼지고, Docker 컨테이너면 exit code 137로 보여요.
- Availability Zone·Region: Region은 떨어진 지역, Availability Zone은 그 안에서 전원·네트워크를 따로 쓰는 데이터센터 묶음이에요.
- Swap Memory: 디스크는 메모리보다 훨씬 느려서 스왑을 많이 쓰면 서버가 느려져요.
- Log Level: 운영에서는 보통 INFO 이상만 남겨요(예).
- IaaS·PaaS·SaaS: 어디까지 내가 관리하느냐로 나눠요(NIST SP 800-145).
- Round Robin: Least Connections와 달리 바쁜지는 보지 않고 차례대로 줘요.
- Horizontal Scaling: Vertical Scaling은 한 대를 키우고, 이건 대수를 늘려요.

뜻이 다른 짝(`srvwrong`): Server Instance(Instance)·Sticky Session(Position Sticky·Sticky Header)·Log Level(Heading Levels)·Log Rotation(Key Rotation)·Object Storage(Local Storage)·Capacity Planning(Planning)·Auto/Horizontal/Vertical Scaling(Scale)·Alert(Security Alert)·Virtual Machine(Container)은 x에서 다르다고 쓰고 r에 넣지 않는다. Virtual Host는 Task 1에서 같은 방식(Hosts File)이다.

출처를 Step 3에서 연다: nginx.org load balancing(round-robin 기본·`least_conn`·`ip_hash`), AWS(Regions and AZs, Auto Scaling, deregistration delay), NIST SP 800-145, Docker 문서(OOM·exit code), Linux `free`·swap(man), RFC 5424(심각도), logrotate(8), PM2 또는 systemd `Restart=` 문서(Process Manager), AWS S3 문서(객체·키).

---

### Task 3: 직접 조작 4장

쓸 스킬: interfaces:better-accessibility(키보드·읽기 순서), superpowers:test-driven-development

**Files:**
- Modify: `index.html`: `u-server-load-balancer`·`u-server-failover`·`u-server-auto-scaling`·`u-server-out-of-memory`의 `h`·`cap`·`init`
- Modify: `tests/check.mjs`: `SRVDM`·`SRVP`·`srvdm`·`srvdmrun`(`dbdmrun` 뒤)

**Interfaces:**
- Consumes:
  - `slb(kind)`·`slbSay(kind)`·`sfail(down)`·`sfailSay(down)`(계획서 ① Task 3)
  - `sauto(k)`·`sautoSay(k)`·`soom(k)`·`soomSay(k)`(Task 2)
  - `tpick(names, on)`, `psay(el, m)`, `board(h)`(check.mjs:691)
- Produces: 그림 4장의 `init`. 상태 함수의 서명은 바꾸지 않는다.

**상태와 버튼**(결과 문장 `.mk-hint aria-live="polite"`은 `psay`로 바꾼다. init 안에서는 `s.querySelector`·`s.querySelectorAll`만 쓰고 window·document는 쓰지 않는다. 고르기 버튼은 `pk = ks.filter(x => x.dataset.k)`의 순서로 다룬다):

| 카드 | 고르기 버튼(`tpick`, 처음 = 첫 버튼) | 그룹 이름 | 고르기 `i`번을 누르면 | cap |
|---|---|---|---|---|
| Load Balancer | `['Round Robin', 'Least Connections']` | 나누는 방식 고르기 | `k = ['rr', 'lc'][i]`. 그림 `slb(k)`, 문장 `slbSay(k)` | 두 방식을 바꿔 서버 2가 받는 요청 수를 보세요 |
| Failover | `['서버 2 정상', '서버 2 고장']` | 서버 2 상태 고르기 | `down = i === 1`. 그림 `sfail(down)`, 문장 `sfailSay(down)` | 서버 2를 고장 내고 요청이 어디로 가는지 보세요 |
| Auto Scaling | `['새벽', '평소', '이벤트']` | 시간대 고르기 | `k = ['dawn', 'day', 'event'][i]`. 그림 `sauto(k)`, 문장 `sautoSay(k)` | 시간대를 바꿔 서버 수와 CPU를 보세요 |
| Out of Memory | `['한도 512MB', '한도 1024MB', '고친 뒤']` | 메모리 상황 고르기 | `k = ['small', 'big', 'fixed'][i]`. 그림 `soom(k)`, 문장 `soomSay(k)` | 한도를 바꿔 보고, 고친 뒤와 비교해 보세요 |

- 누른 버튼만 `aria-pressed="true"`, 나머지는 `"false"`다.
- 그림판 h는 `<div class="mk-mobox">${처음 그림}</div>` + `<div role="group" aria-label="${그룹 이름}">${tpick(…)}</div>` + `<span class="mk-hint" aria-live="polite">${처음 문장}</span>`이다(db 직접 조작과 같은 형식). 한 번 누르는 버튼은 없다.
- 처음 그림·문장은 스펙 보충의 "직접 조작 처음 그림"과 그 `…Say`다.
- `m`을 달지 않는다(안쪽 도우미가 모두 still). `srvm`이 본다.

- [ ] **Step 1: 실패하는 점검**
  ```js
  const SRVDM = {'Load Balancer': ['Round Robin', 'Least Connections', 'aria-pressed', 'aria-live'], 'Failover': ['서버 2 정상', '서버 2 고장', 'aria-pressed', 'aria-live'],
    'Auto Scaling': ['새벽', '평소', '이벤트', 'aria-pressed', 'aria-live'], 'Out of Memory': ['한도 512MB', '한도 1024MB', '고친 뒤', 'aria-pressed', 'aria-live']};    // 직접 조작 그림: 영문명 → h에 있어야 할 글
  const SRVP = en => { const t = g.TERMS.find(x => x.c === 'server' && x.en === en); return t && g.D[t.v]; };
  ```
  - `srvdm`: `dbdm`과 같은 방식이다. `init`이 있고, `String(init)`에 `psay`가 있고, h에 목록 글과 `class="mk-mobox"`·`class="mk-hint"`가 모두 있어야 한다.
  - `srvdmrun`: `dbdmrun`(check.mjs:727)과 같이 `board(h)`로 init을 돌린다(`ctx.setTimeout = f => f()`, `finally`에서 되돌림). 고르기 버튼은 `s.keys.filter(b => b.dataset.k)[i]`로 찾고, `on(s)`는 `aria-pressed`를 `,`로 이은 글이다. 단언(`V`는 `vm.runInContext`):
    - 첫 장면: 네 장 모두 `s.hint.textContent`가 처음 `…Say`와 같고, `s.box.innerHTML`이 처음 그림(`V("slb('rr')")` 등)과 같다.
    - Load Balancer: 1번 → 그림 `=== slb('lc')`, 문장 `slbSay('lc')`, `on === 'false,true'`. 0번 → 그림 `=== slb('rr')`.
    - Failover: 1번 → 그림 `=== sfail(true)`, 문장 `sfailSay(true)`. 1번 다시 → 그림 그대로. 0번 → 그림 `=== sfail(false)`.
    - Auto Scaling: 2번 → 그림 `=== sauto('event')`, `on === 'false,false,true'`, 그림에 `mk-sv-new` 2개. 1번 → 문장 `sautoSay('day')`.
    - Out of Memory: 1번 → 그림 `=== soom('big')`, 문장에 `늦게`. 2번 → 문장에 `평평`, 그림에 `강제 종료` 없음. 0번 → 문장에 `137`.
- [ ] **Step 2: 실패 확인**: `FAIL srvdm: Load Balancer, Failover, Auto Scaling, Out of Memory`·`FAIL srvdmrun`
- [ ] **Step 3: 구현**: 위 표대로 h·cap·init을 바꾼다. 계획서 ①의 `srvstill`은 상태 함수를 보므로 그대로 둔다.
- [ ] **Step 4: 통과**: `FAIL` 없음(`srvsameh`·`srvm`·`init` 포함)
- [ ] **Step 5: 브라우저·키보드 확인**: Load Balancer는 `#/c/server/core`, Failover는 `#/c/server/motion`, Auto Scaling은 `#/c/server/scale`, Out of Memory는 `#/c/server/res`(실행 때 `grep`으로 카드의 sec를 확인). 공통 절차 확인에 더해 Playwright로 다음을 본다.
  - Tab으로 버튼에 포커스가 가고(`document.activeElement`가 `.mk-tkey`), Enter·Space로 누른다.
  - 결과 문장 글이 바뀐다(psay 150ms 뒤 확인). 고르기 그룹의 `aria-pressed="true"`가 하나뿐이다.
  - 각 버튼 20번 뒤 320px에서 넘침이 0이다.
  - 가장 긴 문장일 때 320px에서 `hint.getBoundingClientRect().bottom <= mobox.getBoundingClientRect().top`이다. 겹치면 위 여백을 늘리고 원장에 적는다.
  - reduce 모드에서도 버튼이 동작한다.
- [ ] **Step 6: 커밋**: `feat: 서버 직접 조작 4장`

뒤이어 **디렉터 검토 묶음 E**(Task 2~3)

---

### Task 4: 증상 12개

**Files:**
- Modify: `index.html`: `SYM('느림',[…])` 끝에 2개, `SYM('오류·안 됨',[…])` 끝에 10개
- Modify: `tests/check.mjs`: `SYM_SRV`(476줄 `SYM_DB` 뒤), `symcount` 205→217

**Interfaces:**
- Consumes: 계획서 ①·Task 1~2 카드(연결 대상)
- Produces: 증상 217개

- [ ] **Step 1: 실패하는 점검**
  - `SYM_SRV`: 아래 표의 증상 12개
  - `symcount`: `g.SYMPTOMS.length !== 217`, 목록에 `...SYM_SRV`를 더한다.
- [ ] **Step 2: 실패 확인**: `FAIL symcount: length 205`
- [ ] **Step 3: 넣기**: 형식은 `['증상', ['카드', …]]`다. 연결 카드는 표 순서대로다(스펙 6장).

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

  - 측정(스펙 6장, 2026-11-03): 기존 205개와 같은 문구는 없다. 지금 "느림" 20개, "오류·안 됨" 99개다. 넣으면 22개·109개가 된다.
  - 증상 글은 `wsym`을 지킨다.
- [ ] **Step 4: 통과**: `symcount`와 `ref`(없는 카드 이름이면 실패)가 통과한다.
- [ ] **Step 5: 브라우저 확인**: 첫 화면 `#/`의 증상 띠에서 다음을 본다. 320px 넘침은 0이다.
  - "느림" 칩을 누르면 새 증상 2개가 보인다. "오류·안 됨" 칩을 누르면 새 증상 10개가 보인다.
  - 증상을 누르면 연결 카드로 간다. 가장 긴 증상("클라우드 한 곳이 멈추자 우리 서비스도 멈췄어요")이 320px에서 넘치지 않는다.
- [ ] **Step 6: 커밋**: `feat: 서버 증상 12개`

---

### Task 5: 글꼴·문서·전체 점검

쓸 스킬: break-ui(`srvmap` 서버 4대 Auto Scaling 이벤트 장면, `metric` 선 2개 Swap Memory, Access Log 긴 줄, 직접 조작 4장 320px), interfaces:better-ui·better-layout, design-skills:accessibility-audit, superpowers:verification-before-completion

**Files:**
- Modify: `index.html`: FONT:START~FONT:END woff(서브셋 다시 만들기)
- Modify: `tests/check.mjs`: `LATER = []`
- Modify: `PRODUCT.md`(31줄 개수), `docs/PLAN.md`(17줄 진행, 57줄 칩 메모), `DESIGN.md`(server 도우미·직접 조작 규칙 확인)

- [ ] **Step 1: 실패하는 점검**: `LATER = []`로 바꾼다.
- [ ] **Step 2: 실패 확인**: `FAIL doccount: 용어 1572 ≠ 1618, 증상 205 ≠ 217, 오류 칩 99 ≠ 109`가 나온다. 서브셋에 없는 글자가 있으면 `FAIL font`도 나온다.
- [ ] **Step 3: 글꼴**: 스펙 보충의 `font_subset.py`로 `python -E -P "<SP>\font_subset.py" index.html "<SP>\fontsrc\Hahmlet.ttf" "<작업 폴더>"`를 돌린다.
  - 결과 woff를 FONT:START~FONT:END 사이에 넣는다(스크립트가 하는 방식대로 한다).
  - `font` 통과를 확인한다. `NO_GLYPH`가 늘지 않아야 한다.
- [ ] **Step 4: 문서**
  - `PRODUCT.md:31`: "용어 1572개" → 1618, 괄호 안 목록 끝에 "서버 10개·92개", 증상 색인 205 → 217. 카테고리 수는 그대로다.
  - `docs/PLAN.md:17`: "데이터베이스 완료 2026-11-03, 다음은 서버"를 "…, 서버 완료 <마친 날>, 다음은 Git"으로 바꾼다(CAT 순서 server 다음이 `git`, 측정).
  - `docs/PLAN.md:57`: "칩 99개" → "칩 109개"
  - `DESIGN.md`: 계획서 ① Task 1에서 넣은 `srvmap`·`metric` 줄이 실제 한도·판정(원장 `Ruling:`)과 같은지 보고 고친다. 직접 조작 "그림 안 도우미는 label 없이 still" 규칙이 없으면 한 줄 더한다.
  - `doccount` 통과를 확인한다.
- [ ] **Step 5: 전체 점검**: `node tests/check.mjs` → `FAIL` 없음, `LATER` 줄 없음, `OK <수>`
- [ ] **Step 6: 전체 브라우저 확인**
  - server 10개 하위항목 × 3폭 × 2움직임, 공통 절차 기준
  - 직접 조작 4장 키보드 확인 다시
  - break-ui: 위 "쓸 스킬"의 그림을 320px에서 본다.
  - accessibility-audit: server 화면에서 버튼 이름, `aria-live`, 포커스 표시, 대비, `srvmap`·`metric` sr 문장을 본다.
  - 고칠 것이 나오면 실패하는 점검을 먼저 쓰거나 원장에 적고 고친다.
- [ ] **Step 7: 커밋**: `docs: 서버 개수·규칙 문서와 글꼴 갱신`

뒤이어 **최종 검토**(브랜치 전체, 계획서 ①·② Review Focus 함께).
- 결정 기록 문서: `docs/superpowers/2026-11-0X-server-category-rulings.md`
  - 계획서 ①·② 원장의 `Ruling:`과 고친 검토 지적을 정리한다.
  - db 선례(`docs/superpowers/2026-11-03-db-category-rulings.md`) 형식을 따른다.
- 작업 폴더 삭제(계획서 ①·② 둘 다), `superpowers:finishing-a-development-branch`
  - main 병합은 사용자 확인 뒤에 한다.
- 메모리 갱신(체크포인트: 다음은 Git)
