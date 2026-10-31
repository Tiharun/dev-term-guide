# 네트워크 카테고리 (② 새 카테고리 2/5) 설계

- 날짜: 2026-11-01
- 관련 문서: [PLAN.md](../../PLAN.md), [GLOSSARY.md](../../../GLOSSARY.md), [DESIGN.md](../../../DESIGN.md), 터미널 설계 [2026-11-01-terminal-category-design.md](2026-11-01-terminal-category-design.md)
- ② 새 카테고리는 카테고리마다 명세 → 계획 → 구현 → main 병합을 한 바퀴씩 진행한다. 순서: 터미널·명령줄(완료) → 네트워크 → 모바일 앱 → 테스트 → 기획·문서. 이 문서는 두 번째다.

## 1. 목적과 성공 기준

초보자가 "연결이 안 돼요", "localhost가 안 열려요" 같은 상황을 **데이터가 오가는 그림으로 바로 이해**하고, 예문을 복사해 Claude에게 정확히 지시하게 한다.

성공 기준:
- `서버` 다음에 `네트워크` 카테고리가 생기고, 하위항목 6개에 카드 68개가 들어간다(옮긴 5개 포함).
- 모든 카드가 도판 형식이고, 데이터가 오가는 카드는 공용 네트워크 모형 `net()`으로 그린다.
- 옮긴 카드 5개의 즐겨찾기·외운 체크·옛 주소가 끊기지 않는다.
- 8장 점검을 모두 통과한다.

## 2. 범위

포함: 새 카테고리와 하위항목, 카드 68개, 기존 카드 5개 이동, 공용 네트워크 모형 `net()`, 직접 조작 카드 4개, 비유 그림 3개, 증상 색인 14개, 서버 카테고리 설명 수정, 글꼴 서브셋 갱신, PRODUCT.md·PLAN.md 개수 표기 갱신, 점검 스크립트 확장.

다루는 영역(사용자 선택): 웹 개발 중 만나는 것, 인터넷 동작 원리, 집·사무실 네트워크.

제외: 진단 명령(ping·traceroute·nslookup·netstat 명령 자체, 사용자 선택), 나머지 새 카테고리 3개, 기존 카테고리 보강·그림 재제작(③), 다른 카테고리의 네트워크 성격 카드 이동(5개 외).

## 3. 배치

- `CAT('net','네트워크', …)`을 `CAT('server', …)`([index.html:1512](../../../index.html)) 바로 다음에 넣는다. 뒤 카테고리의 번호(`c.no`)와 도판 번호는 하나씩 밀린다. 두 번호는 화면 표시에만 쓰이고 저장되지 않는다(터미널 설계 3장에서 측정).
- 카테고리 설명: "컴퓨터끼리 데이터를 주고받는 길과 그 말"
- 하위항목: 공통 기본·필수·모션용어 및 연출·심화 + 추가 `proto` 프로토콜·포트("데이터를 주고받는 약속과 번호") + 공통 추천 개념.
- 서버 카테고리 설명 "웹사이트를 돌리는 컴퓨터와 네트워크의 말" → "웹사이트를 돌리는 컴퓨터와 그 운영에 관한 말"(네트워크 카테고리와 헷갈리지 않게).

## 4. 용어 목록 (68개)

`*` = 서버에서 옮겨 옴, `▶` = 직접 조작, `◎` = 비유 그림 곁들임. 한글명은 `한글 · 풀이` 형식으로 구현 때 정한다.

### 4.1 기본 (12)
Network, Internet, IP Address\*, Port\*▶, DNS\*, Packet◎, Protocol, Router, Modem, Wi-Fi, Ethernet, Bandwidth

### 4.2 필수 (15)
TCP, UDP, IPv4 vs IPv6, Private vs Public IP, NAT, DHCP, Default Gateway, Subnet, LAN vs WAN, Firewall◎, Proxy, VPN, Hostname, DNS Record, MAC Address

### 4.3 모션용어 및 연출 (9)
네트워크에서 움직이거나 바뀌는 것.
Ping\*, Latency\*, Packet Loss▶, Jitter, TCP Handshake◎, Throughput, Upload vs Download, DNS Propagation, Retransmission

### 4.4 심화 (13)
OSI Model, TCP/IP Model, Network Routing, Hop, MTU, Socket, CIDR, ARP, TLS Handshake, QUIC, DNS Resolver, Port Forwarding▶, P2P

### 4.5 프로토콜·포트 (10)
Well-known Port, Ephemeral Port, Port 80·443, Dev Server Port(3000·5173·8080), Database Port(5432·3306·27017), ICMP, FTP·SFTP, SMTP, IMAP·POP3, WebRTC

### 4.6 추천 개념 (9)
Port Already in Use, Connection Refused, Bind Address(0.0.0.0·127.0.0.1)▶, Hosts File, DNS Cache, Localhost Tunnel, Same Wi-Fi Testing(휴대폰으로 개발 서버 열기), Captive Portal(카페 와이파이 로그인 화면), It's Always DNS(현업 은어: 장애가 나면 먼저 DNS를 의심하라는 말)

### 4.7 겹치는 카드 처리 (측정: 기존 영문명과 대조)

| 이미 있는 카드 | 처리 |
|---|---|
| Routing(웹사이트, 페이지 주소 나누기) | 뜻이 다름 → 네트워크는 Network Routing으로 따로 |
| Timeout(백엔드) | 새로 만들지 않음 → Connection Refused·Latency에서 연결 |
| Localhost(서버) | 그대로 둠 → Bind Address·Same Wi-Fi Testing에서 연결 |
| Reverse Proxy(서버) | 그대로 둠 → Proxy에서 연결 |
| WebSocket(백엔드) | 그대로 둠 → Socket에서 연결 |
| HTTP(백엔드)·HTTPS·SSL Certificate(서버) | 그대로 둠 → Port 80·443·TLS Handshake에서 연결 |
| HTTP/2(성능) | 그대로 둠 → QUIC에서 연결 |
| SSH(서버) | 그대로 둠(사용자 결정) → Well-known Port(22번)에서 연결 |
| DDoS·Man-in-the-Middle(보안) | 그대로 둠 → Firewall·VPN에서 연결 |
| Network Tab(성능) | 그대로 둠 → Latency에서 연결 |

### 4.8 사실 확인 원칙
- 포트 번호·기본값(IANA 등록 포트, Vite·Next.js 개발 서버 기본 포트, DB 기본 포트), 프로토콜 동작(TCP 3단계 연결, ICMP와 ping), DNS 전파 시간처럼 출처마다 다른 값은 구현 단계에서 카드마다 공식 문서(IANA, RFC, 각 도구 공식 문서, MDN)로 확인한다. 공식이면 `o:1`, `u`에 주소를 적는다.
- 확인되지 않은 값은 카드에 단정하지 않고 "보통", "도구마다 다르다"로 적는다.
- It's Always DNS는 현업 은어 표시를 붙이고 출처는 실무로 둔다.

## 5. 그림 구조

- **공용 모형 `net(nodes, links, opt)`**: 화면 모형 부품 모음(`phone`·`browser`·`term`, [index.html:2990](../../../index.html)~2994) 옆에 추가한다.
  - 아이콘: 내 PC·휴대폰·공유기·인터넷(구름)·서버·DNS 서버·방화벽(벽). 이름표는 한글, 그림 속 글자 11px 이상, 색은 기존 토큰.
  - `links`: 두 아이콘을 잇는 선. 선 위로 이름표 달린 데이터 점(`요청`, `응답`, `example.com → 93.184.x.x` 등)이 지나간다.
  - 재생: 터미널 모형과 같은 구조(주기 10초, 음수 지연으로 멈춘 장면이 데이터가 모두 지나간 뒤 모습, 보일 때만 재생, 다시 재생 가능). 동작 줄이기 설정이면 멈춘 완성 장면 + 재생 버튼.
  - 좁은 그림판에서는 가로 배치를 세로로 바꿔 페이지가 넘치지 않게 한다(그림판 폭 기준).
- **기존 모형 재사용**: 오류 문구는 `term()`(예: 포트 충돌 `EADDRINUSE`), 브라우저 오류 화면은 `browser()`(예: 연결 거부, 사이트에 연결할 수 없음).
- **직접 조작 4장**(`init`, 기존 `grab`·`keys` 도우미 재사용, 버튼은 포커스 가능하고 키보드로도 누름):
  - Port: 3000·3001 중 고르면 서버가 듣는 포트일 때만 연결됨
  - Packet Loss: 손실률 슬라이더를 올리면 점이 사라지고 다시 보내는 장면이 늘어남
  - Bind Address: 127.0.0.1 ↔ 0.0.0.0을 바꾸면 휴대폰 접속 가능 여부가 갈림
  - Port Forwarding: 규칙을 켜고 끄면 밖에서 온 요청이 공유기에서 막히거나 PC까지 감
- **비유 그림**: 이름이 비유인 Packet(소포 상자)·Firewall(불을 막는 벽)·TCP Handshake(악수)만. 터미널과 같이 모형 옆에 화살표로 잇는다(`pair()`).
- **흐름이 없는 카드**: OSI·TCP/IP Model은 층 쌓은 그림, CIDR·IPv4 vs IPv6·Subnet은 주소를 칸으로 나눈 그림, 포트 카드는 번호와 서비스를 짝지은 그림.

## 6. 데이터

- 카드 id는 `카테고리-slug(영문명)`이라 옮기면 바뀐다([index.html:2968](../../../index.html)). `MOVED`([index.html:2818](../../../index.html))에 5개를 추가한다: `server-ip-address`→`net-ip-address`, `server-port`→`net-port`, `server-dns`→`net-dns`, `server-ping`→`net-ping`, `server-latency`→`net-latency`. 즐겨찾기·외움 이어주기와 옛 주소 이동은 ①에서 만든 기능이 그대로 처리한다.
- 옮기는 카드는 정의·예문을 유지하고 그림만 `net()` 기반으로 다시 그린다.
- 다른 카드의 관련 용어(`r`)는 영문명 연결이라 옮겨도 그대로 동작한다.
- 증상 색인 14개(묶음은 기존 `SYMPTOM_GROUPS`, [index.html:1488](../../../index.html)):

| 묶음 | 증상 | 용어 |
|---|---|---|
| 오류·안 됨 | localhost:3000이 안 열려요 | Port |
| 오류·안 됨 | 포트가 이미 사용 중이래요 | Port Already in Use |
| 오류·안 됨 | 휴대폰으로 내 PC 개발 서버가 안 열려요 | Bind Address |
| 오류·안 됨 | 연결이 거부됐대요 | Connection Refused |
| 오류·안 됨 | 사이트 주소를 찾을 수 없대요 | DNS |
| 오류·안 됨 | 도메인을 바꿨는데 옛 사이트가 보여요 | DNS Propagation |
| 오류·안 됨 | 회사 와이파이에서만 접속이 안 돼요 | Firewall |
| 오류·안 됨 | 카페 와이파이에 붙었는데 인터넷이 안 돼요 | Captive Portal |
| 오류·안 됨 | 밖에서 우리 집 서버에 못 들어와요 | Port Forwarding |
| 오류·안 됨 | VPN을 켜면 사이트가 안 열려요 | VPN |
| 느림 | 클릭하고 한참 뒤에 반응해요 | Latency |
| 느림 | 영상 통화가 끊겼다 붙었다 해요 | Jitter |
| 느림 | 가끔만 요청이 실패해요 | Packet Loss |
| 느림 | 업로드만 유난히 느려요 | Upload vs Download |

## 7. 점검과 완료 기준

자동 점검 `tests/check.mjs`([tests/check.mjs:7](../../../tests/check.mjs), 키 형식 `'카테고리/하위항목'`):
- 네트워크 하위항목별 기대 카드·개수, 옮긴 5개가 `net`에 있고 `server`에 없음, `MOVED`의 새 id 존재, 모든 카드에 그림, 영문명 중복 없음, 관련 용어·증상 대상 존재.
- `net()` 멈춘 장면이 데이터 점이 모두 지나간 뒤인지(터미널의 `tframe`과 같은 방식).
- 서버 하위항목 개수가 옮긴 만큼 줄었는지(basic 8→5, motion 8→6).

브라우저 확인(Playwright, 로컬 서버):
- PC 1280px, 휴대폰 375px. 가로 넘침 없음, 긴 도메인·IPv6 주소는 그림 안에서 줄바꿈.
- 직접 조작 4장을 마우스·터치·키보드로 조작.
- 동작 줄이기 설정에서 자동 재생 안 됨, 재생 버튼 동작.
- `server-port`로 즐겨찾기를 저장해 둔 상태에서 열면 새 id로 바뀜, `#/t/server-port` → 새 카드.
- 콘솔 오류 0(favicon 404 제외).

디자인 품질: impeccable 점검, break-ui(긴 도메인, IPv6 긴 주소, 노드 많은 그림), 필요하면 interfaces·emil 계열 스킬로 다듬기.

완료 기준: 위 점검 통과, 커밋 후 main 병합.

## 8. 진행 순서

하위항목 하나 = 작업 단위 하나. 단위마다 자동 점검 + 브라우저 확인 후 커밋.

1. 기반: 카테고리 추가, 서버 설명 수정, `net()`, `MOVED` 5개, 점검 스크립트 확장
2. 기본(옮긴 3개 포함) → 필수 → 모션(옮긴 2개 포함) → 심화 → 프로토콜·포트 → 추천 개념
3. 증상 색인 14개
4. Hahmlet 서브셋 다시 만들기, PRODUCT.md·PLAN.md 개수 표기 갱신

## 9. 글꼴

터미널 설계 10장과 같다. 원본 Hahmlet 사본은 이전 세션의 임시 폴더에만 있으므로, 없으면 GitHub(hyper-type/hahmlet, OFL)에서 다시 받아도 되는지 사용자에게 묻는다.

## 10. 위험

- 포트 기본값·DNS 전파 시간을 잘못 적으면 사용자가 그대로 따라 한다 → 공식 문서로 확인된 것만 단정.
- 네트워크 그림이 노드가 많아지면 휴대폰에서 글자가 겹칠 수 있다 → 좁은 폭에서 세로 배치, 노드는 그림당 최대 5개.
- IPv6 주소처럼 긴 값이 그림 밖으로 넘칠 수 있다 → 그림 안 줄바꿈.
- `index.html`이 계속 커진다(측정: 현재 1,210,293바이트). 파일 나누기는 범위 밖이며 PLAN의 "품질 우선" 결정을 따른다.
