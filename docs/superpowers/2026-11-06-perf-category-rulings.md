# 성능 카테고리 디렉터 검토 판정

2026-11-06. 범위: 새 40장, 새 절 4개(cache, load, diag, runtime), 증상 12개("느림" 칩), 옛 48장 글과 그림.
디렉터 판정: 수정 후 병합. Critical 3, Important 11, Minor 18.

## 고친 것
- **C1 CLS:** "로딩 중"으로 한정했다. 페이지가 열려 있는 내내 잰다고 고쳤다. [web.dev](https://web.dev/articles/cls)
- **C2 Flame Chart, Profiling:** 맨 아래 칸이 가장 넓다고 했다. 위 칸이 아래 칸을 불러내므로 넓을 수 없다. 그림, x, p를 "넓은데 아래로 잘 갈라지지 않는 칸"으로 고쳤다.
- **C3 DOM Size:** 800·1,400개를 현재 Lighthouse 기준처럼 썼다. 인사이트로 바뀌었고 40ms 기준이라고 함께 썼다. [Chrome 문서](https://developer.chrome.com/docs/performance/insights/dom-size)
- **I1~I11 전부:** Immutable Cache의 Chrome 미구현과 주소, Speculation Rules 지원 범위, will-change 그림과 p, Edge 그림, Preload와 fetchpriority 모순, srcset과 AVIF 모순, Browser Cache와 Cache 모순, Minify와 압축의 말 구분, Synthetic Monitoring 주소, TTFB·Early Hints와 Latency 모순, HTTP/3 그림.
- **Minor:** M1~M4, M6~M18. M18은 기존 증상 2개(`클릭하고 한참 뒤에 반응해요`, `오래 켜 두면 느려져요`)의 연결도 고쳤다.
- **합친 직후 내 수정:** 페이지를 뜻하는 "쪽"을 "페이지"로 바꿨다. 이때 생긴 오류 2건(`head 안페이지`, `받는 페이지가`)은 M8, M9로 고쳤다.

## 직접 대조한 지적
- C1: web.dev 원문에 `during the entire lifecycle of a page`가 있다(측정).
- C3: Chrome 블로그에 `dom-size-insight`가 `dom-size`를 대신한다는 표가 있고, 인사이트 문서에 `exceeding a duration of 40ms`가 있다(측정). Lighthouse가 같은 기준으로 동작한다는 것은 디렉터 추정이고, 카드에는 "Chrome 문서는"이라고 적었다.
- I1: MDN 원문에 `instead of implementing that directive, Chrome has changed its implementation`이 있다(측정).
- I2: MDN 호환 자료에서 Chrome 109, Firefox preview, Safari 26.2 플래그, 실험 표시를 확인했다(측정).
- M1: web.dev 원문에 `By default, Lighthouse stops monitoring TBT after Time to Interactive`가 있다(측정).

## 안 고친 것
- **M5 Performance Regression:** u 문서에 regression이라는 말은 없지만 내용은 통한다. 지적의 제안대로 유지한다.
- **CLS의 p와 증상 문구:** "로딩 중" 표현을 그대로 뒀다. 흔한 상황 하나를 말하는 문장이다.
- **Slow 3G Test:** 지금 Chrome 문서의 프리셋 이름은 Slow 3G가 아니지만, 카드 이름은 그대로 두고 x에 적었다. 실제 DevTools 메뉴는 화면으로 확인하지 못했다.

## 근거가 약한 글
- **o:0(공식 정의 못 찾음):** Edge, FPS, Page Weight, File Size, Bundle Size, Measure First, Premature Optimization, Above-the-fold Priority, Loading Speed, Cache Hit, Bottleneck.
- **일반 추론(추정):** Code Splitting의 "조각이 너무 많으면 기다릴 수 있어요", Preload의 "낭비일 수 있어요".
- **Lighthouse 비중:** TBT 30, Speed Index 10은 점수 문서(v10 표)와 디렉터가 읽은 13.6.0 소스 기준이다. 나는 소스를 따로 열지 않았다.
- **Long Task의 Safari:** `scheduler.yield()` 미지원은 디렉터의 호환 자료 측정이고 나는 따로 열지 않았다.

## 측정
- `node tests/check.mjs` OK 472.
- 그림 1768장, 320·900·1440px에서 clip·hint·cap·cut·un 모두 0, 320px 축소 21. 성능 분류 320px 안쪽 잘림 0.
