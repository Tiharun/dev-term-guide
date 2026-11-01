# 모바일 앱 카테고리 (② 새 카테고리 4/5) 설계

- 날짜: 2026-11-01
- 관련 문서: [PLAN.md](../../PLAN.md), [GLOSSARY.md](../../../GLOSSARY.md), [DESIGN.md](../../../DESIGN.md), 테스트 설계 [2026-11-01-test-category-design.md](2026-11-01-test-category-design.md)
- ② 새 카테고리는 카테고리마다 명세 → 계획 → 구현 → main 병합을 한 바퀴씩 진행한다. 완료: 터미널·명령줄, 네트워크, 테스트. 이 문서는 네 번째(사용자 선택: 모바일 앱 먼저). 남은 것: 기획·문서.

## 1. 목적과 성공 기준

초보자가 "앱 스토어에 올려 줘", "푸시 알림 넣어 줘" 같은 말을 **휴대폰 화면이 바뀌고 출시 단계가 넘어가는 그림으로 바로 이해**하고, 예문을 복사해 Claude에게 정확히 지시하게 한다.

성공 기준:
- `프론트엔드` 다음에 `모바일 앱` 카테고리가 생기고, 하위항목 6개에 카드 71개가 들어간다.
- 모든 카드가 도판 형식이고, 앱 화면이 바뀌는 카드는 공용 앱 화면 모형 `app()`, 출시 단계는 공용 단계 띠 `track()`으로 그린다.
- 기존 카드는 옮기지 않는다(사용자 결정). 겹치는 개념은 관련 용어로만 잇는다.
- 7장 점검을 모두 통과한다.

## 2. 범위

포함: 새 카테고리와 하위항목, 카드 71개, 공용 모형 `app()`·`track()`, 직접 조작 카드 4개, 비유 그림 2개, 증상 색인 12개, 글꼴 서브셋 갱신, PRODUCT.md·PLAN.md·DESIGN.md 개수 표기 갱신, 점검 스크립트 확장.

다루는 영역(사용자 선택): 앱 종류·만드는 방식, 앱 구조·화면 이동, 기기 기능·권한, 앱 스토어·출시.

제외: 남은 새 카테고리 1개(기획·문서), 기존 카테고리 보강·그림 재제작(③), 기존 카드 이동, 특정 도구의 설치·설정 방법 안내, 플랫폼별 코드 작성법 자세히.

## 3. 배치

- `CAT('mobile','모바일 앱', …)`을 `CAT('front', …)`([index.html:1562](../../../index.html)) 바로 다음에 넣는다. 뒤 카테고리(백엔드~AI)의 번호(`c.no`)와 도판 번호는 하나씩 밀린다. 두 번호는 화면 표시에만 쓰이고 저장되지 않는다(터미널 설계 3장에서 측정).
- 카테고리 설명: "휴대폰 앱을 만들고 스토어에 내보내는 말"
- 하위항목: 공통 기본·필수·모션용어 및 연출·심화 + 추가 `store` 앱 스토어·출시("앱을 스토어에 올리고 사용자에게 내보내는 과정의 말") + 공통 추천 개념.
- 모션용어 및 연출은 "앱 화면이 움직이거나 바뀌는 것"으로 채운다.

## 4. 용어 목록 (71개)

`▶` = 직접 조작, `◎` = 비유 그림 곁들임. 영문명의 `·`는 기존 형식에 맞춰 ` / `로 쓰고, 괄호 풀이(Cold·Warm Start, Keychain·Keystore)는 `ko`에 넣는다. 한글명은 `한글 · 풀이` 형식으로 구현 때 정한다. 측정: 아래 영문명은 기존 1,186개와 겹치지 않고(소문자 비교), 그림 키 `u-<slug>`도 기존과 겹치지 않는다.

### 4.1 기본 (11)
Mobile App, iOS, Android, Native App, Hybrid App, Cross-platform, WebView, Screen, App Icon, Push Notification, Permission Request▶

### 4.2 필수 (14)
React Native, Flutter, Expo, Swift, Kotlin, Xcode, Android Studio, Simulator vs Emulator, Navigation Stack▶, App Lifecycle▶, Deep Link, Offline Support▶, Local Notification, iOS vs Android Differences

### 4.3 모션용어 및 연출 (9)
Screen Transition, Modal Presentation, Keyboard Avoiding, Fast Refresh, App Launch, Background Refresh, App Icon Badge, Notification Tap, Force Update

### 4.4 심화 (11)
Native Module, Development Build, Platform-specific Code, Universal Link / App Link, APNs / FCM, Push Token, Secure Storage, Biometric Authentication, App Sandbox◎, Background Task Limits, In-app Purchase

### 4.5 앱 스토어·출시 (16)
App Store vs Google Play, Developer Account, App Store Connect, Google Play Console, Bundle ID / Package Name, Code Signing◎, Version / Build Number, IPA / AAB, TestFlight, Internal Testing Track, App Review, App Rejection, Store Listing, Privacy Label / Data Safety, Staged Rollout, OTA Update

### 4.6 추천 개념 (10)
App vs Web, Ask Permission in Context(필요한 순간에 권한 묻기), Test on Real Device, Minimum OS Version, App Size, Crash Reporting, Tablet Support, VoiceOver / TalkBack, Ratings & Reviews, Expo Go

### 4.7 겹치는 카드 처리 (측정: 기존 영문명 1,186개와 대조, 모두 그대로 두고 연결만)

| 이미 있는 카드 | 새 카드에서 연결 |
|---|---|
| Tap·Long Press·Swipe 등 제스처, Haptic Feedback(디자인/제스처) | Screen, iOS vs Android Differences |
| Touch Target(디자인/심화) | Screen, Tablet Support |
| Safe Area·Notch·Home Indicator·Orientation·Foldable(디자인/기기 화면) | App Launch, Tablet Support |
| Virtual Keyboard(디자인/기기 화면) | Keyboard Avoiding |
| Splash Screen·Onboarding·App Bar·Bottom Sheet·Settings Screen(디자인/앱 UI) | App Launch, Modal Presentation, Screen |
| Modal(디자인/피드백) | Modal Presentation |
| Badge·Notification Dot(디자인/피드백) | App Icon Badge |
| Tab Bar·Back Button(디자인/내비), Edge Swipe(디자인/제스처) | Navigation Stack |
| Page Transition(웹)·Transition(프론트)·Shared Element Transition(디자인) | Screen Transition |
| PWA·Responsive Web Design(웹), Mobile First·Viewport(프론트) | App vs Web, WebView, Tablet Support |
| Hot Reload(기본) | Fast Refresh |
| Permission·Principle of Least Privilege(보안) | Permission Request, App Sandbox |
| Release·Release Notes·Feature Flag·Canary Release·Rollback Deploy(배포) | Staged Rollout, OTA Update |
| Semantic Versioning(기본) | Version / Build Number |
| Cold Start(서버, 뜻 다름) | App Launch |
| Crash·Jank(버그) | Crash Reporting |
| Push·git push(Git, 뜻 다름) | Push Notification에서 구분 안내 |
| Sync(데이터베이스)·Cache(백엔드)·Local Storage(웹) | Offline Support |
| OAuth·Refresh Token·Token Expiry(백엔드·보안) | Secure Storage |
| SDK(백엔드) | Native Module |
| Bundle Size(성능) | App Size |
| E2E Test·Manual Testing(테스트), Check on mobile(AI) | Test on Real Device, Internal Testing Track |
| Code Review(Git) | App Review(뜻 다름 안내) |

### 4.8 사실 확인 원칙
- 스토어·플랫폼 정책(개발자 계정 비용, 심사 기간, TestFlight 인원·기간 한도, 단계적 출시 비율, 권한을 거부한 뒤 다시 묻는 규칙, 번들 ID 규칙, 앱 파일 형식, 개인정보 표시 항목)은 구현 단계에서 카드마다 공식 문서(developer.apple.com, developer.android.com, support.google.com/googleplay, docs.expo.dev, reactnative.dev, docs.flutter.dev)로 확인한다. 공식이면 `o:1`, `u`에 주소를 적는다.
- 정책·가격처럼 바뀔 수 있는 값은 카드에 "2026-11 확인" 같이 확인 시점을 적거나 "바뀔 수 있다"로 적는다.
- 확인하지 못한 값은 단정하지 않고 넣지 않는다. 실무 관행(Ask Permission in Context 등)은 `o:0`(실무)로 두고 "보통", "흔히"로 적는다.

## 5. 그림 구조

- **공용 모형 `app(scenes, opt)`**: 화면 모형 부품 모음(`phone`·`term`·`net`·`runner`, [index.html:3238](../../../index.html)~3310) 옆에 추가한다. CSS 접두어는 `mk-mo`(app)·`mk-mt`(track)다(측정: `mk-ap`는 이미 쓰임).
  - 기존 `phone()` 틀 안에 상태 표시줄(시간·배터리 글자)을 얹고, 장면 1~4개를 10초 주기로 바꿔 보인다.
  - 장면 `{t 화면 제목, b 본문 HTML, tap 누를 곳(선택), go 'push'|'modal'|'fade'}`. `push`는 오른쪽에서 밀려 들어옴, `modal`은 아래에서 올라옴, `fade`는 겹쳐 바뀜. `tap`이 있으면 장면이 바뀌기 직전에 손가락 점이 그 자리에 찍힌다.
  - 재생: 터미널·테스트 모형과 같은 구조(주기 10초, 음수 지연으로 멈춘 장면이 마지막 장면, 보일 때만 재생, 다시 재생 가능). 동작 줄이기 설정이면 멈춘 마지막 장면 + 재생 버튼.
  - 접근성: 지나간 장면은 `aria-hidden`, 그림 전체 흐름은 `opt.label`로 요약한다.
  - 장면 5개 이상이면 오류를 던진다(`runner()`의 6줄 제한과 같은 방식).
- **공용 모형 `track(steps, opt)`**: 단계 띠 1~5칸(예: 빌드 → 업로드 → 심사 → 출시). 단계 `{t 이름, s 'done'|'fail'|'now'|'wait', n 아래 설명(선택), w 상태 글자(선택)}`. 표시가 왼쪽부터 단계를 따라 이동하고, 상태는 기호와 글자를 함께 쓴다(기본 ✓ 완료, ✕ 실패, ● 진행 중, … 대기. 단계마다 글자를 바꿀 수 있다: 심사 ✕ 거절). 좁으면(240px 이하) 세로로 쌓는다. 재생 규칙은 `app()`과 같다.
- **기존 모형 재사용**: 명령은 `term()`(예: `npx expo start`), 푸시 전달은 `net()`(아이콘 `server`·`cloud`·`phone` 이미 있음, [index.html:3256](../../../index.html)), 앱 vs 웹·WebView는 `browser()`와 `app()`를 `pair()`처럼 화살표로 잇는다.
- **직접 조작 4장**(`init`, 기존 `tkeys`·`keys` 도우미 재사용, 버튼은 포커스 가능하고 키보드로도 누름, 결과 문장은 `aria-live`):
  - Permission Request: 권한 창에서 허용 → 카메라 화면, 거부 → "설정에서 켜 주세요" 안내. 거부한 뒤 다시 누르면 창이 다시 안 뜨는 모습(플랫폼 규칙은 4.8대로 확인 후 문장 확정).
  - Navigation Stack: "다음 화면"을 누르면 화면 카드가 쌓이고, "뒤로"를 누르면 맨 위가 빠진다. 쌓인 개수를 글자로 보인다. 맨 아래에서 뒤로를 누르면 "더 돌아갈 화면이 없어요"(앱이 닫히는 경우 안내).
  - App Lifecycle: "홈으로 내리기"·"다시 열기"·"오래 두기" 버튼. 상태(앞에서 실행 중·뒤로 내려감·종료됨)를 글자로 보이고, 오래 두면 입력하던 글이 사라진 채 처음 화면으로 열린다.
  - Offline Support: "인터넷" 켜기·끄기와 "미리 저장" 켜기·끄기. 인터넷이 끊기면 미리 저장이 켜진 경우 저장된 목록 + "오프라인" 띠, 꺼진 경우 빈 화면 오류.
- **비유 그림**: 이름이 비유인 App Sandbox(모래놀이 상자: 앱마다 자기 상자 안에서만 논다)·Code Signing(봉인 도장: 누가 만들었고 안 바뀌었음을 찍어 둠)만. 모형 옆에 화살표로 잇는다(`pair()`).
- **흐름이 없는 카드**: iOS vs Android Differences·App Store vs Google Play는 두 칸 비교, Version / Build Number·IPA / AAB는 이름표·파일 그림, 도구 카드(Xcode·Android Studio·Expo 등)는 대표 화면이나 명령과 결과를 짝지은 그림.
- 휴대폰 틀은 190px라 좁은 그림판(320px)에서 직접 조작 카드의 옆 표시(쌓인 화면 등)는 휴대폰 아래로 내린다.

## 6. 데이터

- 카드 id는 `mobile-slug(영문명)`. 옮기는 카드가 없어 `MOVED`([index.html:3035](../../../index.html))는 바꾸지 않는다.
- 다른 카드의 관련 용어(`r`)는 영문명 연결이라, 4.7의 연결은 새 카드의 `r`에 기존 영문명을 적어 만든다. 기존 카드의 `r`은 이번 범위에서 고치지 않는다(③에서 필요하면 보강).
- 증상 색인 12개(묶음은 기존 `SYMPTOM_GROUPS`, [index.html:1541](../../../index.html)):

| 묶음 | 증상 | 용어 |
|---|---|---|
| 크기·화면 | 키보드가 입력창을 가려요 | Keyboard Avoiding |
| 느림 | 앱이 켜지는 데 오래 걸려요 | App Launch |
| 반응·클릭 | 뒤로 가기를 눌렀더니 앱이 꺼져요 | Navigation Stack |
| 오류·안 됨 | 푸시 알림이 안 와요 | Push Token |
| 오류·안 됨 | 링크를 누르면 앱 대신 웹사이트가 열려요 | Universal Link / App Link |
| 오류·안 됨 | 앱을 내렸다 열면 처음 화면으로 돌아가요 | App Lifecycle |
| 오류·안 됨 | 권한을 거부했더니 다시 안 물어봐요 | Permission Request |
| 오류·안 됨 | 앱 심사에서 거절됐어요 | App Rejection |
| 오류·안 됨 | 인터넷이 끊기면 빈 화면만 나와요 | Offline Support |
| 오류·안 됨 | 앱이 갑자기 꺼져요 | Crash Reporting |
| 오류·안 됨 | 시뮬레이터에선 되는데 내 폰에서 안 돼요 | Test on Real Device |
| 오류·안 됨 | 업데이트를 올렸는데 사용자 앱이 안 바뀌어요 | Staged Rollout |

## 7. 점검과 완료 기준

자동 점검 `tests/check.mjs`(키 형식 `'카테고리/하위항목'`):
- 모바일 하위항목별 기대 카드·개수, 전체 1,257개(1,186 + 71), 모든 카드에 그림, 영문명 중복 없음, 관련 용어·증상 대상 존재.
- 모바일 카드는 모두 도판 형식(`u-` 그림 키, 기존 `nv`·`tv` 점검과 같은 방식).
- `app()`·`track()` 멈춘 장면이 마지막 장면·마지막 단계인지(터미널 `tframe`과 같은 방식), 장면 5개·단계 6개 이상이면 오류.
- `track()` 단계에 기호와 글자가 함께 있는지, 직접 조작 4장의 결과 문장에 `aria-live`가 있는지(기존 `live` 점검 재사용).
- 재생 버튼이 붙는 모바일 그림(`m:1`)에 움직이는 요소가 있는지(테스트 `tm` 점검과 같은 방식).
- 다른 카테고리 개수는 그대로인지(옮긴 카드 없음).

브라우저 확인(Playwright, 로컬 서버):
- PC 1280px, 휴대폰 375px, 좁은 그림판 320px. 가로 넘침 없음, 긴 화면 제목·긴 단계 이름은 그림 안에서 줄바꿈.
- 직접 조작 4장을 마우스·터치·키보드로 조작.
- 동작 줄이기 설정에서 자동 재생 안 됨, 재생 버튼 동작.
- 뒤 카테고리 번호가 밀린 뒤 기존 카드 주소(`#/t/back-...` 등)가 그대로 열림.
- 콘솔 오류 0(favicon 404 제외).

디자인 품질: impeccable 점검, break-ui(긴 화면 제목, 장면 4개, 단계 5개, 긴 단계 설명), 필요하면 interfaces·emil 계열 스킬로 다듬기.

완료 기준: 위 점검 통과, 커밋 후 main 병합(사용자 확인 후).

## 8. 진행 순서

하위항목 하나 = 작업 단위 하나. 단위마다 자동 점검 + 브라우저 확인 후 커밋.

1. 기반: 카테고리 추가, `app()`·`track()`, 점검 스크립트 확장
2. 기본 → 필수 → 모션 → 심화 → 앱 스토어·출시 → 추천 개념
3. 증상 색인 12개
4. Hahmlet 서브셋 다시 만들기, PRODUCT.md·PLAN.md·DESIGN.md 개수 표기 갱신

## 9. 글꼴

테스트 설계 9장과 같다. 측정(2026-11-01): 서브셋 도구 `font_subset.py`와 원본 `fontsrc\Hahmlet.ttf`가 이전 세션 임시 폴더에 있다. 없어지면 GitHub(hyper-type/hahmlet, OFL)에서 다시 받아도 되는지 사용자에게 묻는다.

## 10. 위험

- 스토어 정책·가격은 자주 바뀐다 → 공식 문서로 확인한 것만 쓰고 확인 시점을 적는다.
- 휴대폰 틀 안은 좁다(190px) → 장면 본문은 짧은 글·아이콘 위주, 그림 속 글자 11px 이상, 넘치면 줄바꿈.
- 디자인 카테고리 카드와 이름은 달라도 그림이 비슷해질 수 있다 → 디자인 카드는 "화면 부품 모양", 모바일 카드는 "앱이 동작하는 흐름"에 초점을 둔다.
- 증상 색인 "오류·안 됨" 칩이 37개에서 46개로 늘어난다 → PLAN.md 남은 일(③에서 다시 보기)에 개수를 갱신해 둔다.
- `index.html`이 계속 커진다(측정: 현재 1,372,910바이트). 파일 나누기는 범위 밖이며 PLAN의 "품질 우선" 결정을 따른다.
