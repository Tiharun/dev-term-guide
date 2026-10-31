# 네트워크 카테고리 실행 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `서버` 다음에 `네트워크` 카테고리를 만든다. 하위항목 6개에 카드 68개(새 63 + 옮김 5)를 넣고 증상 14개를 추가한다. 데이터가 오가는 카드는 공용 네트워크 모형 `net()`으로 그린다.

**Architecture:** `index.html` 하나에서 작업한다.
- 데이터: DATA 구간에 `CAT`/`T`/`SYM`을 호출한다.
- 그림: `D`에 `Object.assign`으로 더한다.
- 네트워크 모형: `net()` 문자열 함수 하나로 만든다. 아이콘을 한 줄로 놓고, 이웃한 두 아이콘 사이마다 메시지 줄을 쌓는다. 자동 재생은 터미널의 줄 키프레임 `mk-tl1~8`을 그대로 쓰고, 점 이동 키프레임만 새로 만든다. 직접 조작은 `init(stage)`를 쓴다.
- 옮긴 카드: ①의 `MOVED`·`migrateIds`·옛 주소 이동이 그대로 처리한다.

**Tech Stack:** HTML/CSS/바닐라 JS, Node 22(`tests/check.mjs`, `EADDRINUSE` 측정), Python `http.server` + Playwright MCP, WSL Ubuntu(hosts 측정), fonttools 4.66.1

**Spec:** [docs/superpowers/specs/2026-11-01-network-category-design.md](../specs/2026-11-01-network-category-design.md)

**스펙과 다른 점(5가지):**
- **영문명 확정**:
  - 괄호 안 풀이는 영문명에서 빼고 `ko`에 넣는다. 예: `Dev Server Port`, `Database Port`, `Bind Address`.
  - `·`는 기존 영문명 형식(`vw / vh`)에 맞춰 ` / `로 쓴다. 예: `Port 80 / 443`, `FTP / SFTP`, `IMAP / POP3`.
  - 확정한 이름은 Task 2~7의 `EXPECT`에 있다.
- **아이콘 `modem` 추가**: Modem 카드를 공유기 아이콘으로 그리면 둘이 같아 보이기 때문이다.
- **그림 속 주소**: 실제 사이트 주소(스펙 예시 `93.184.x.x`)는 바뀔 수 있어 쓰지 않는다. 대신 문서용 주소와 사설 주소만 쓴다(Global Constraints).
- **`MOVED` 넣는 때**: 기반(Task 1)이 아니라 카드를 실제로 옮기는 Task 2·4에서 넣는다. `moved` 점검은 새 id가 있어야 통과하기 때문이다.
- **직접 조작 도우미**: 스펙의 `grab`(끌기)·`keys`(키 매핑) 대신 `tkeys` 버튼과 기본 `<input type="range">`를 쓴다. 네 장 모두 끌기가 없고, 기본 요소가 키보드·터치를 이미 처리하기 때문이다.

## Global Constraints

- 파일은 `index.html` 하나다. 외부 폰트·라이브러리·CDN을 쓰지 않는다.
- 색과 글꼴은 `:root` 변수를 먼저 쓴다. 네트워크 모형은 도판 토큰(`--ink`·`--plate`·`--mark` 등)만 쓴다.
- 그림 속 글자는 최소 11px이다.
- 도판 틀(`.fig`)에는 그림자를 넣지 않는다.
- 기본 easing은 `var(--ease)`다.
- 자동 애니메이션은 클래스 `A`와 `--ps` 구조를 쓴다. 멈춘 장면은 음수 지연 `-8.8s`로 모든 메시지가 도착한 뒤 모습이다. 데이터가 움직이는 그림은 `m:1`이다.
- 새 D 키는 `'u-' + slug(en)`이다.
- 새 CSS 클래스와 키프레임 이름은 `mk-nw`로 시작한다. 측정: 현재 `mk-nw`는 0건이고, `mk-n…`은 내비게이션 그림이 쓰고 있다.
- 카드 문구 규칙:
  - `d`: 해요체 한 줄
  - `p`: "~해줘" 지시문. 정식 용어를 넣는다.
  - `r`: 기존 영문명 1개 이상
  - `l`: 1~3
  - `ko`: `한글 · 풀이` 형식
  - `o:1`: 공식 문서를 직접 열어 확인했을 때만 쓰고 `u`를 단다.
    - 공식 문서는 IANA 포트 등록부, RFC(rfc-editor.org), MDN, 각 도구 공식 문서(Vite·Next.js·Node.js·PostgreSQL·MySQL·MongoDB), Microsoft Learn이다.
    - RFC 주소는 Task 2에서 만드는 `RFC = n => 'https://www.rfc-editor.org/rfc/rfc' + n`로 쓴다.
- 값 단정 금지:
  - 출처마다 다른 값은 "보통", "OS·도구마다 달라요"로 쓴다. 예: DNS 전파 시간, 임시 포트 범위, MTU.
  - It's Always DNS는 `jg:1, o:0`(현업 은어)이다.
- 그림 속 주소:
  - IPv4는 문서용 `192.0.2.x`·`198.51.100.x`·`203.0.113.x`(RFC 5737, 검색 확인)와 사설 `192.168.x.x`(RFC 1918)만 쓴다.
  - IPv6는 `2001:db8::`(RFC 3849)이고, MAC은 RFC 9542 문서용 범위다(RFC 7042를 대체함, 검색 확인).
  - RFC 3849와 9542의 값은 Task 3에서 문서를 열어 확인한다.
- 진단 명령(ping·traceroute·nslookup·netstat) 카드는 만들지 않는다(스펙 2장). Ping 카드는 `net()`으로 그린다.
- 사이트 이름 같은 재사용 값은 `SITE`를 쓴다.
- 브라우저 확인은 Playwright MCP로 한다. 평소 Chrome 프로필·저장된 로그인을 쓰지 않고, `state save` 파일을 만들지 않는다.
- 작업 단위마다 커밋한다. 메시지는 한국어 `feat:`/`docs:`이고 attribution 줄을 넣지 않는다.
- 작업마다 "쓸 스킬"을 쓴다. 설치되지 않은 스킬은 건너뛴다.

## Review Focus

1. **긴 주소 넘침**: IPv6 전체 주소 `2001:db8:85a3::8a2e:370:7334`나 긴 도메인이 아이콘 이름표나 메시지에 들어가도 375px에서 페이지가 가로로 넘치면 안 된다. 그림 안에서 줄바꿈되어야 한다. → Task 3(IPv4 vs IPv6) 브라우저 확인, Task 9 break-ui
2. **멈춘 장면이 비어 보임**: 동작 줄이기 설정이거나 화면 밖에 있어 멈춘 네트워크 그림은 메시지 줄이 모두 보이고 점이 도착한 끝에 있어야 한다. → Task 1 `nframe` 점검, Task 2 브라우저 확인(reduced-motion)
3. **옛 id**:
   - 즐겨찾기에 `server-port`만 있거나 옛 id와 새 id가 함께 있어도 결과는 `net-port` 하나다.
   - `#/t/server-port`는 새 카드로 간다.
   - → Task 2 브라우저 확인
4. **직접 조작을 키보드·터치로**:
   - 4장 모두 Tab으로 들어가 Enter·Space(슬라이더는 ←→)로 바꿀 수 있어야 한다.
   - 375px에서 손가락으로 누를 수 있어야 하고, 결과 문장이 `aria-live`로 읽혀야 한다.
   - → Task 2·4·5·7 브라우저 확인
5. **좁은 폭 세로 배치**: 그림판이 480px 이하이면 아이콘이 세로로 쌓인다. 그래도 메시지 방향(`r:1`은 반대)이 맞게 읽혀야 하고, 아이콘 5개 그림이 넘치지 않아야 한다. → Task 5(Hop) 브라우저 확인

---

## 공통 절차 (Task 2~7에 적용)

1. **실패하는 점검 추가**: `tests/check.mjs`에 아래를 넣는다.
   - `EXPECT['net/<sec>']`: 그 Task 표의 영문명
   - `COUNT['net/<sec>']`
   - `total` 기대값: 표의 누계
2. **실패 확인**: `node tests/check.mjs` → `FAIL expect:net/<sec>`
3. **데이터**:
   - `/* ===== 08 네트워크 ===== */` 스크립트 블록의 `T('net','<sec>',[...])`에 스펙 순서대로 넣는다.
   - 이 블록은 Task 2에서 `/* ===== 07 서버 ===== */` 블록 바로 뒤에 새로 만든다. 그 자리는 `/* ===== 08 Git · 협업 ===== */` 앞이다.
4. **그림**:
   - `const visual` 바로 앞, `/* terminal: tip … */` 묶음 뒤에 `/* net: <sec> — … */` 주석과 `Object.assign(D, {...})`를 둔다.
   - 주석에는 잰 값과 예시 값을 나눠 적는다.
   - 무엇으로 그릴지:
     - 흐름: `net()`
     - 비유: `pair(art, net(...))`
     - 오류 문구: `term()`, 브라우저 오류 화면: `browser()`
     - 흐름이 없는 카드(층·주소 칸·포트 짝): 새 `mk-nw…` 부품
5. **직접 조작**(표에 있는 카드만):
   - stage는 `<div class="mk-nwbox">${net(…, {still:true, label})}</div>${tkeys([...])}<p class="mk-hint" aria-live="polite">…</p>`이다.
   - `init`은 `.mk-nwbox`의 innerHTML과 `.mk-hint` 글자만 바꾼다. 라이브 영역을 다시 만들지 않아야 읽힌다.
   - 고른 버튼에는 `aria-pressed="true"`를 단다.
   - 리스너는 stage 안 요소에만 단다.
6. **점검 통과**: `node tests/check.mjs` → `OK <수>`. `LATER font` 줄은 Task 9 전까지 정상이다.
7. **브라우저 확인**(아래 절차):
   - 1280px·375px 스크린샷, 넘침 없음, 11px 미만 0, 콘솔 오류 0
   - 직접 조작 카드는 마우스 클릭, 375px에서 화면 버튼 클릭, 키보드로 조작해 본다.
8. **커밋**: `git add index.html tests/check.mjs && git commit -m "feat: 네트워크 <하위항목 이름> 하위항목 추가"`

### 브라우저 확인 절차

- **서버**: 프로젝트 폴더에서 `python -m http.server 8765 --bind 127.0.0.1`을 백그라운드로 띄운다. 이미 떠 있으면 다시 띄우지 않는다.
- **열기**: `http://127.0.0.1:8765/index.html?r=<난수>#/c/net/<sec>`. 캐시 때문에 `?r=`가 필요하다.
- **그림 모두 띄우기**: `for (const f of document.querySelectorAll('#view .fig')) { f.scrollIntoView(); await new Promise(r => setTimeout(r, 60)); }`
- **넘침**: `document.documentElement.scrollWidth <= innerWidth` → `true`
- **작은 글자**: `#view .fig .stage *` 중 글자를 가진 요소의 fontSize < 11 → `[]`
- **화면**: 1280×900과 375×812에서 `browser_take_screenshot`
- **오류**: `browser_console_messages` error 0(favicon 404 제외)

---

### Task 1: 기반 (카테고리, 서버 설명, 네트워크 모형, 점검 확장)

**쓸 스킬:** frontend-design, impeccable(shape), animate, interfaces:better-accessibility

**Files:**
- Modify `index.html`:
  - 카테고리 목록(1512줄 `CAT('server', …)`과 그 다음 줄)
  - `.fig:has(…)` 목록 두 곳(353줄)
  - CSS 그림판 구간: `.mk-pair` 규칙(340~344줄) 뒤
  - 모형 도우미: `tkeys`(3005줄) 뒤
- Modify `tests/check.mjs`

**Interfaces:**
- Consumes: `esc`, `pair`, `term`, `tkeys`, 키프레임 `mk-tl1~8`과 클래스 `.mk-tl1~8`(index.html:309~318)
- Produces:
  - **카테고리**:
    - `CAT('net','네트워크','컴퓨터끼리 데이터를 주고받는 길과 그 말', [['proto','프로토콜·포트','데이터를 주고받는 약속과 번호']])`를 `server` 바로 뒤에 둔다.
    - `CATS[8]`이 된다(측정: `server`가 `CATS[7]`). secs id는 `basic, core, motion, adv, proto, tip` 순서다.
  - **서버 설명**: `'웹사이트를 돌리는 컴퓨터와 그 운영에 관한 말'`
  - **`NWI`**: 아이콘 키 → `{svg, t}`
    - 키와 기본 이름표: `pc` 내 PC, `phone` 휴대폰, `router` 공유기, `modem` 모뎀, `cloud` 인터넷, `server` 서버, `dns` DNS 서버, `wall` 방화벽
    - svg는 `viewBox="0 0 24 24"`, `aria-hidden="true"`이고 선은 `var(--ink)`다.
  - **`net(nodes, links = [], opt = {}) -> string`**: 루트는 `<div class="mk-nw">`(`container-type:inline-size`)이다.
    - `nodes`:
      - 형식은 `{k, t?, s?}`다. `t`는 이름표이고 기본값은 `NWI[k].t`다. `s`는 아래 작은 글자(주소·포트)로, `var(--mono)` 11px에 `overflow-wrap:anywhere`다.
      - 1~5개다. 6개 이상이면 `throw new Error('net: 아이콘은 5개까지')`, 없는 `k`면 `throw new Error('net: 아이콘 ' + k)`다.
    - `links[i]`:
      - `nodes[i]`와 `nodes[i+1]`을 잇는다. 이웃한 아이콘끼리만 이을 수 있다.
      - 형식은 `{m?: 메시지[], w?: 1, cut?: '이유'}`다. `w:1`은 무선(점선)이다.
      - `cut`: 선 가운데에 ✕와 이유 글자를 둔다. 빨강 계열이고 배경 대비 4.5:1 이상이다.
    - 메시지 `{t, r?: 1, x?: 1}`:
      - `t`: 이름표(11px, 줄바꿈 허용). `r:1`은 오른쪽 → 왼쪽(세로면 아래 → 위)이다.
      - `x:1`은 선 가운데서 사라짐이다. 선을 반만 보이게 자르고(`clip-path`) 가운데에 ✕를 둔다.
    - 메시지 번호: 링크 순서, 배열 순서대로 k = 1, 2, …다. 9번째부터는 8번 칸을 같이 쓴다(`term`과 같다).
    - 메시지 줄 구조: `<div class="mk-nwm mk-tl{k} A">` 안에 이름표와 선 `.mk-nwtr`(`overflow:hidden`)가 있고, 선 안에 점 `.mk-nwd mk-nwx{k} A`가 있다.
    - 점 이동: `.mk-nwd`는 선 전체 크기 상자이고 오른쪽 끝에 점(`::after`)이 있다. `translateX(-100%)` → `translateX(0)`으로 움직인다(transform만 쓴다).
    - 세로 배치: `@container (max-width:480px)`에서 아이콘 줄이 세로가 된다. 선도 세로가 되고, 점은 `mk-nwy{k}`(translateY)를 쓴다. 기존 `.mk-pair`와 같은 480px 기준이다.
    - 자동 재생:
      - `.mk-nwm.A,.mk-nwd.A{animation-duration:10s;animation-delay:-8.8s;animation-iteration-count:infinite}`, 줄은 `linear`, 점은 `var(--ease)`
      - `@keyframes mk-nwx{k}{0%,{10k}%{transform:translateX(-100%)}{10k+6}%,100%{transform:translateX(0)}}`(k = 1~8), `mk-nwy{k}`도 같은 꼴
      - 그래서 88% 지점에서 모든 줄이 보이고 점이 도착해 있다(Review Focus 2).
    - `opt.still`: true면 `A`·`mk-tl`·`mk-nwx`·`mk-nwy` 클래스를 붙이지 않는다. 점은 도착 위치에 멈춰 있다(직접 조작용).
    - `opt.label`: 있으면 루트에 `role="group"`과 `aria-label`을 단다.
    - 모든 글자는 `esc()`로 처리한다.
  - **`.fig:has(…)`**: 두 목록에 `.mk-nw`를 더한다. `cmp` 안에 넣을 때를 위해 `.cmp>div:has(>.mk-nw)`도 `.mk-term`과 같은 규칙을 준다(306줄).
  - **`LATER`**: `['font']`. 새 한글 글자가 이번 작업부터 늘어나기 때문이다. Task 9에서 비운다.

- [ ] **Step 1: 실패하는 점검 추가**(check.mjs)
  - `cat`에 더한다.
    - `net` 카테고리가 `server` 바로 다음이고, secs id가 `['basic','core','motion','adv','proto','tip']`다.
    - `server`의 desc가 새 문구다.
  - `nv`: `t.c === 'net'`인 카드는 모두 `v`가 `'u-'`로 시작하는 문자열이다(도판 형식). 카드가 0장이면 그대로 통과한다.
  - `base`에 다음을 더한다.
    - `net([{k:'pc'},{k:'server'}],[{m:[{t:'요청'},{t:'응답',r:1}]}])`에 `mk-nw`가 있고 `mk-nwm`이 2번 나온다.
    - `net([{k:'pc', t:'<b>&'}])`에 `<b>`가 없고 `&lt;b&gt;&amp;`가 있다.
    - `net([{k:'dns'}])`에 `DNS 서버`가 있다.
    - 아이콘 6개와 `{k:'zz'}`는 각각 throw한다.
    - `net([{k:'pc'},{k:'pc'}],[{m:[{t:'a'}]}],{still:true})`에 ` A`·`mk-tl`·`mk-nwx`가 없다.
    - `net([{k:'pc'}],[],{label:'x'})`에 `role="group"`·`aria-label="x"`가 있다.
  - `nframe`: `tframe`과 같은 방식이다.
    - `.mk-nwm.A,.mk-nwd.A{…animation-delay:-([\d.]+)s`에서 멈춘 지점 P(%)를 읽는다.
    - k = 1~8마다 `mk-nwx{k}`·`mk-nwy{k}`의 도착 %가 P 이하인지 본다.
  - `LATER = ['font']`
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL cat`, `FAIL base: … net is not defined`, `FAIL nframe`. 다른 점검은 그대로 통과해야 한다.
- [ ] **Step 3: 구현**
  - Interfaces대로 `CAT`, 서버 설명, `NWI`, `net`, CSS, 키프레임을 만든다.
  - 아이콘 선과 ✕ 색의 대비를 better-colors로 재서 커밋 본문에 적는다.
- [ ] **Step 4: 점검 통과**: `node tests/check.mjs` → `OK <수>`
- [ ] **Step 5: 브라우저 확인**
  - `#/c/net/basic`이 "아직 용어가 없어요"로 뜬다.
  - 서버 카테고리 머리말이 새 설명이다.
  - 홈·사이드 목록에서 `server` 뒤 카테고리 번호가 하나씩 밀린다.
  - 콘솔 오류 0
- [ ] **Step 6: 커밋**: `feat: 네트워크 카테고리와 네트워크 모형 기반`

### Task 2~7: 하위항목 6개

| Task | sec | EXPECT (스펙 순서) | 직접 조작 | 비유 | COUNT | total | 쓸 스킬 |
|---|---|---|---|---|---|---|---|
| 2 | basic | Network, Internet, IP Address, Port, DNS, Packet, Protocol, Router, Modem, Wi-Fi, Ethernet, Bandwidth | Port | Packet | 12 | 1064 | frontend-design, interfaces:better-writing |
| 3 | core | TCP, UDP, IPv4 vs IPv6, Private vs Public IP, NAT, DHCP, Default Gateway, Subnet, LAN vs WAN, Firewall, Proxy, VPN, Hostname, DNS Record, MAC Address | — | Firewall | 15 | 1079 | interfaces:better-layout, source-driven-development |
| 4 | motion | Ping, Latency, Packet Loss, Jitter, TCP Handshake, Throughput, Upload vs Download, DNS Propagation, Retransmission | Packet Loss | TCP Handshake | 9 | 1086 | animate, interfaces:better-accessibility |
| 5 | adv | OSI Model, TCP/IP Model, Network Routing, Hop, MTU, Socket, CIDR, ARP, TLS Handshake, QUIC, DNS Resolver, Port Forwarding, P2P | Port Forwarding | — | 13 | 1099 | source-driven-development, design-skills:interaction-design |
| 6 | proto | Well-known Port, Ephemeral Port, Port 80 / 443, Dev Server Port, Database Port, ICMP, FTP / SFTP, SMTP, IMAP / POP3, WebRTC | — | — | 10 | 1109 | source-driven-development |
| 7 | tip | Port Already in Use, Connection Refused, Bind Address, Hosts File, DNS Cache, Localhost Tunnel, Same Wi-Fi Testing, Captive Portal, It's Always DNS | Bind Address | — | 9 | 1118 | design-skills:ux-writing, interfaces:better-writing |

측정:
- 새 영문명 63개는 기존 카드와 겹치지 않고, 옮길 5개를 더해도 slug가 서로 겹치지 않는다.
- It's Always DNS의 id는 `net-it-s-always-dns`다. 데이터에는 `en:'It\'s Always DNS'`로 쓴다.

**Task 2 추가:**
- **옮기기**:
  - `T('server','basic')`의 IP Address·Port·DNS 객체(2343·2344·2345줄 근처)를 잘라 `net/basic`의 스펙 순서 자리에 둔다.
  - `MOVED`에 `'server-ip-address':'net-ip-address'`, `'server-port':'net-port'`, `'server-dns':'net-dns'`를 넣는다.
  - `d`·`p`·`r`·`u`는 그대로 두고 `v`만 새 `u-` 프리셋으로 바꾼다.
  - check.mjs에 `COUNT['server/basic'] = 5`(8 − 3)을 더한다.
- **도우미**: 블록 맨 위에 `const RFC = n => 'https://www.rfc-editor.org/rfc/rfc' + n;`을 둔다(검색 확인: `rfc-editor.org/rfc/rfc5737` 형식).
- **Port 직접 조작**(`m:0`):
  - 그림: `net([{k:'pc', t:'브라우저', s:'localhost:3000'}, {k:'server', t:'개발 서버', s:'3000번에서 기다림'}], …)`
  - 버튼은 `tkeys(['3000','3001'])`이다.
    - 3000을 누르면 `요청 →`, `응답 ←`이다.
    - 3001을 누르면 `cut:'연결 거부'`이다.
  - 결과 문장은 `.mk-hint`에 쓴다. 예: "3001번에는 기다리는 프로그램이 없어 연결이 거부돼요".
- **Packet**: `pair(소포 상자 SVG, net(...))`이다. 메시지는 `조각 1`·`조각 2`·`조각 3`이다.
- **Modem**: 아이콘은 `공유기 → 모뎀 → 인터넷` 3개다. Router·Modem `x`에 공유기와 모뎀이 한 기계인 경우도 있다고 적되, 단정하지 않는다.
- **Wi-Fi**: `w:1` 점선, **Ethernet**: 실선
- **브라우저 추가 확인**:
  - localStorage `devdict.pins`를 `["server-port"]`로 두고 새로고침하면 `["net-port"]`가 된다. `["server-port","net-port"]`도 하나로 줄어든다(Review Focus 3).
  - `#/t/server-port` → `#/t/net-port`
  - 검색에 `Port`를 넣으면 새 카드로 이어진다.
  - `browser_emulate_media` reduced-motion에서 `.mk-nwm`이 모두 `opacity` 1이고, `.mk-nwd`의 transform이 도착 위치(`matrix(1, 0, 0, 1, 0, 0)`)다. 재생 버튼을 누르면 움직인다(Review Focus 2).
  - Port 카드를 Tab으로 버튼까지 가서 Enter·Space로 바꾸고, 375px에서 탭한다(Review Focus 4).

**Task 3 추가:**
- **IPv4 vs IPv6**:
  - 주소를 칸으로 나눈 그림이다. `203.0.113.10`(4칸)과 `2001:db8:85a3::8a2e:370:7334`(8묶음, `::` 생략 표시)를 보여 준다.
  - RFC 3849를 열어 `2001:db8::/32`인지 확인한다.
  - 375px에서 페이지가 넘치지 않는지 본다(Review Focus 1).
- **Private vs Public IP**: 사설 범위 3개를 RFC 1918로 확인하고 `o:1`·`u:RFC(1918)`을 단다.
- **NAT**: 공유기를 지나면 메시지 이름표가 `보낸 곳 192.168.0.10` → `보낸 곳 203.0.113.7`로 바뀐다.
- **DHCP**: 메시지 4개(DISCOVER·OFFER·REQUEST·ACK)를 RFC 2131로 확인한다. 이름표는 한글 풀이를 앞에 쓴다.
- **MAC Address**: RFC 9542를 열어 문서용 MAC 범위를 확인한 값만 쓴다.
- **연결(`r`, 스펙 4.7)**: Firewall → `'DDoS'` / VPN → `'Man-in-the-Middle'` / Proxy → `'Reverse Proxy'` / Hostname → `'Localhost'`
- **Firewall**: `pair(벽 SVG, net([{k:'cloud'},{k:'wall'},{k:'server'}], …))`이다. 허용한 요청만 서버까지 가고, 나머지는 첫 선에서 `x:1`이다.

**Task 4 추가:**
- **옮기기**:
  - `T('server','motion')`의 Latency·Ping 객체를 `net/motion` 맨 앞(Ping, Latency 순)으로 옮긴다.
  - `MOVED`에 `'server-ping':'net-ping'`, `'server-latency':'net-latency'`를 넣는다.
  - `COUNT['server/motion'] = 6`(8 − 2)을 더한다.
  - Latency의 `r`에 `'Network Tab'`·`'Timeout'`이 없으면 더한다(스펙 4.7).
  - `v`만 새로 그린다. Ping은 ICMP 에코 요청·응답이고, 이름표의 ms 숫자는 예시다.
- **Packet Loss 직접 조작**(`m:1`):
  - 공통 절차 5와 달리 `still` 없이 그려 자동 재생한다. 슬라이더를 바꾸면 `.mk-nwbox`를 다시 그린다.
  - 손실률 슬라이더 `<input type="range" min="0" max="50" step="10">`와 `<label>`이다. 키보드 ←→와 터치는 기본 동작을 쓴다.
  - 조각 4개를 보낸다. 잃는 개수는 `Math.round(4 × 손실률 / 100)`이다. 잃은 조각마다 `x:1` 줄과 `다시 보냄` 줄이 하나씩 붙는다(최대 6줄).
  - `.mk-hint`에 "4개 중 N개가 사라져 N개를 다시 보냈어요"를 쓴다.
- **TCP Handshake**: `pair(악수 SVG, net(...))`이다. 메시지는 `SYN →`, `SYN-ACK ←`, `ACK →`, `데이터 →`이고 RFC 9293으로 확인한다.
- **DNS Propagation**: 시간을 단정하지 않는다. "TTL에 따라 달라요"로 쓴다.
- **연결(`r`)**: Retransmission → `'Packet Loss'`·`'TCP'` / Upload vs Download → `'Bandwidth'` / Throughput → `'Bandwidth'`

**Task 5 추가:**
- **OSI Model·TCP/IP Model**: 층을 쌓은 그림이다. 층 이름은 OSI는 ISO/IEC 7498-1(또는 이를 인용한 공식 문서)로, TCP/IP는 RFC 1122로 확인한다.
- **Network Routing**: `x`에 "웹사이트의 Routing(페이지 주소 나누기)과 다른 뜻이에요"를 쓰고 `r:['Routing']`을 단다.
- **Hop**: 아이콘 5개(`내 PC → 공유기 → 통신사 라우터 → 라우터 → 서버`)다. 375px 세로 배치에서 넘침이 없고 방향이 맞는지 본다(Review Focus 5).
- **DNS Resolver**: `net()`은 이웃끼리만 이으므로 릴레이처럼 그리지 않는다.
  - 아이콘은 `내 PC → 리졸버 → DNS 서버` 3개다.
  - 묻는 차례(루트 → .com → example.com)는 둘째 선의 메시지 이름표로 쓴다.
- **Port Forwarding 직접 조작**(`m:0`):
  - 그림: `net([{k:'phone', t:'밖의 휴대폰'}, {k:'cloud'}, {k:'router', s:'203.0.113.7:8080'}, {k:'pc', s:'192.168.0.10:3000'}], …)`
  - 버튼은 `tkeys(['규칙 켜기'])` 하나이고 `aria-pressed`로 켜고 끈다.
    - 끄면 마지막 선이 `cut:'규칙 없음'`이다.
    - 켜면 세 선 모두 `요청 →`, `응답 ←`(6줄)이다.
- **연결(`r`)**: Socket → `'WebSocket'`·`'Port'` / TLS Handshake → `'HTTPS'`·`'SSL Certificate'` / QUIC → `'HTTP/2'`
- **사실 확인**: MTU(이더넷 보통 1500바이트), ARP(RFC 826), TLS 1.3(RFC 8446), QUIC(RFC 9000)

**Task 6 추가 (포트 번호):**
- [ ] 포트 카드 그림은 번호와 서비스를 짝지은 새 부품이다. 그림 속 번호마다 아래 표의 출처를 열어 확인하고, 확인한 줄을 커밋 본문에 적는다(검색 확인).

| 카드 | 확인할 값 | 출처 |
|---|---|---|
| Well-known Port | 0~1023 범위, 22·25·53·80·443 | IANA 포트 등록부, RFC 6335 |
| Ephemeral Port | 49152~65535(IANA 권장), OS마다 다름 | RFC 6335 |
| Port 80 / 443 | 80 HTTP, 443 HTTPS | IANA |
| Dev Server Port | Vite 5173, Next.js 3000, 8080 | Vite `server.port`, Next.js `next dev` 문서. 8080은 공식 기본값을 확인한 도구가 있을 때만 이름을 쓰고, 없으면 "자주 쓰는 번호" |
| Database Port | PostgreSQL 5432, MySQL 3306, MongoDB 27017 | 각 DB 공식 문서 |
| ICMP | ping이 쓰는 에코 요청·응답 | RFC 792 |
| FTP / SFTP | FTP 21, SFTP는 SSH(22) 위에서 동작 | RFC 959, IANA |
| SMTP | 25, 587(제출) | RFC 6409, IANA |
| IMAP / POP3 | 143·993, 110·995 | RFC 9051, RFC 1939, RFC 8314 |
| WebRTC | 브라우저끼리 바로 주고받음 | MDN WebRTC API |

- [ ] 확인하지 못한 값은 그림과 문구에서 빼거나 "보통"으로 쓴다.
- [ ] 연결(`r`): Well-known Port → `'SSH'` / Port 80 / 443 → `'HTTP'`·`'HTTPS'` / ICMP → `'Ping'` / FTP / SFTP → `'SSH'` / WebRTC → `'WebSocket'`·`'P2P'`

**Task 7 추가:**
- **Port Already in Use**: `term()`에 `npm run dev`와 오류 줄 `EADDRINUSE`(`h`)를 넣는다.
  - 오류 줄은 이 PC에서 잰다. scratchpad에서 Node 22로 같은 포트에 서버 두 개를 띄워 실제 문구를 받는다(측정).
- **Connection Refused**: `browser()`에 Chromium 오류 화면을 넣는다.
  - 문구는 Playwright로 `http://127.0.0.1:<듣는 프로그램이 없는 포트>`를 열어 잰 글자다(측정).
  - `r:['Port','Timeout']`
- **Bind Address 직접 조작**(`m:0`):
  - 그림: `net([{k:'phone', s:'192.168.0.20'}, {k:'router'}, {k:'pc', t:'내 PC 개발 서버', s:':5173'}], …)`
  - 버튼은 `tkeys(['127.0.0.1','0.0.0.0'])`이다.
    - 127.0.0.1이면 마지막 선이 `cut:'내 PC 안에서만 받음'`이다.
    - 0.0.0.0이면 `요청 →`, `응답 ←`이다.
  - `x`나 `p`에 Vite `--host`를 쓰려면 Vite `server.host` 문서로 확인한다.
  - `r:['Localhost','Same Wi-Fi Testing']`
- **Same Wi-Fi Testing**: `r:['Localhost','Bind Address']`(스펙 4.7)
- **Hosts File**: 경로는 측정한 값만 쓴다. Windows는 `C:\Windows\System32\drivers\etc\hosts`가 있는지 재고, Linux는 WSL에서 `cat /etc/hosts`를 친다.
- **DNS Cache**: `ipconfig /flushdns`를 쓰려면 Microsoft Learn `ipconfig` 문서로 확인한다.
- **Captive Portal**: `phone()` 안에 와이파이 로그인 화면을 그린다. RFC 8952(Captive Portal Architecture)를 열어 확인한 뒤 `o:1`을 단다.
- **Localhost Tunnel**: 도구 이름을 쓰려면 그 도구 공식 문서를 연다. 확인하지 못하면 "터널 도구"로만 쓴다.
- **It's Always DNS**: `jg:1, o:0`이다. `p`는 장애가 나면 DNS 기록부터 확인하라는 지시다.

### Task 8: 증상 색인 14개

**쓸 스킬:** interfaces:better-writing

**Files:** Modify `index.html`(`SYM()` 묶음), `tests/check.mjs`

- [ ] **Step 1: 실패하는 점검 추가**
  - `SYM_NET = [스펙 6장 표의 증상 문장 14개 그대로]`
  - `symcount` 기대값을 `97` → `111`로 바꾼다.
  - SYM_NEW·SYM_TERM·SYM_NET이 모두 `SYMPTOMS[].q`에 있어야 한다.
- [ ] **Step 2: 실패 확인**: `node tests/check.mjs` → `FAIL symcount: length 97`
- [ ] **Step 3: 구현**: 스펙 6장 표의 묶음별로 기존 `SYM('오류·안 됨',[…])`·`SYM('느림',[…])` 배열 끝에 `['증상', ['En']]`을 넣는다.
- [ ] **Step 4: 점검 통과**: `OK <수>`
- [ ] **Step 5: 브라우저 확인**: 검색표에서 "오류·안 됨" → "휴대폰으로 내 PC 개발 서버가 안 열려요"를 누르면 Bind Address 카드로 간다. 칩은 8개 그대로다.
- [ ] **Step 6: 커밋**: `feat: 네트워크 증상 색인 14개 추가`

### Task 9: 마무리 (글꼴, 문서, 전체 점검)

**쓸 스킬:** impeccable(audit), break-ui, design-skills:accessibility-audit, improve-animations

**Files:** Modify `index.html`(FONT 블록), `tests/check.mjs`, `PRODUCT.md`, `docs/PLAN.md`, `DESIGN.md`

- [ ] **Step 1: 글꼴 원본 확인**
  - 측정(계획 작성 시점): `C:\Users\HELLOW~1\AppData\Local\Temp\claude\C--Users-HelloWorld-Documents-Claude-Project-Programing-Guide\f8728c73-6f40-4446-afd9-00c24a2f3dc2\scratchpad\fontsrc\Hahmlet.ttf`가 있다.
  - 없으면 사용자에게 묻고 멈춘다. 물을 내용은 "GitHub hyper-type/hahmlet(OFL)에서 받아도 되나요?"이고, 받는 파일 이름·주소·크기를 함께 알린다.
- [ ] **Step 2: 실패 확인**: check.mjs에서 `LATER = []`로 바꾸고 실행 → `FAIL font: N자 없음`
- [ ] **Step 3: 서브셋**:
  - 같은 scratchpad의 `font_subset.py`를 `python -E -P font_subset.py index.html <Hahmlet.ttf> <작업 폴더>`로 돌린다.
  - FONT 블록 밖 글자로 `chars.txt`를 만들고, weight 400~800 woff로 FONT 블록 base64를 바꾼다.
  - 스크립트가 `korean … miss  axes [('wght', 400.0, 800.0)]`를 출력해야 한다.
- [ ] **Step 4: 점검 통과**: `OK <수>`(LATER 없음)
- [ ] **Step 5: 문서**
  - PRODUCT.md 31줄: 카테고리 15개, 용어 1118개, `네트워크 6개·68개`, 증상 색인 111개
  - docs/PLAN.md 17줄: ② 네트워크 완료 표시
  - DESIGN.md 239줄 뒤: `net()` 규칙(아이콘 키, 이웃끼리만 잇기, 5개 제한, 480px 세로 배치, 메시지 키프레임, `still`·`label`)
- [ ] **Step 6: 전체 브라우저 확인**
  - 네트워크 6개 하위항목 전체에 공통 절차를 적용한다.
  - reduced-motion에서 자동 재생이 없고, 재생 버튼과 직접 조작 4장이 동작해야 한다.
  - 서버 카테고리의 남은 카드 그림이 그대로다.
  - 홈·검색·증상 화면의 콘솔 오류도 0이어야 한다.
- [ ] **Step 7: 품질**
  - impeccable audit와 break-ui를 돌린다.
  - break-ui 입력:
    - 긴 도메인 `very-long-subdomain.northwind-industries-holdings.example.com`
    - 생략 없는 IPv6 `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
    - 아이콘 5개에 메시지 8줄
  - 이번 범위의 문제만 고치고, 직접 조작 카드의 키보드·포커스 문제는 반드시 고친다.
- [ ] **Step 8: 커밋**: `feat: 네트워크 글꼴 서브셋과 문서 개수 반영`
