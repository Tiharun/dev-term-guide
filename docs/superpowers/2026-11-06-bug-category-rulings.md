# 버그 카테고리 디렉터 검토 판정

2026-11-06. 범위: 새 40장, 새 절 4개(errname, tools, cause, triage), 증상 12개(글자 3, 반응·클릭 3, 오류·안 됨 6), 옛 51장 글과 그림.
디렉터 판정: 수정 후 병합. Critical 3, Important 11, Minor 14.

## 고친 것
- **C1 Edge-only Bug:** "Edge 브라우저 버그가 아니라 특정 환경 버그"라고 가르쳤는데 실제 쓰임은 Microsoft Edge 뜻이었다(GitHub 이슈 쓰임 측정, 공식 정의 없음). 이름을 `Environment-specific Bug`로 바꾸고 Edge only의 뜻을 구분하게 썼다. 이 이름도 표준 정의는 찾지 못해 o:0을 유지한다.
- **C2 Dependency Conflict:** 버전이 다르기만 해도 설치가 안 된다고 읽혔다. npm은 일반 의존성을 따로 설치하고 설치가 멈추는 것은 peerDependencies 충돌이다. d와 그림을 고쳤다. [npm folders](https://docs.npmjs.com/cli/v10/configuring-npm/folders), [npm package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- **C3 SyntaxError:** JSON.parse도 실행 중에 같은 오류를 던진다. d, x, p를 고치고 r과 증상 `Unexpected token 오류가 나요`에 JSON을 이었다. [MDN JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- **I1~I11 전부:** ReferenceError와 Stale Closure의 r, Integer Overflow의 BigInt, Null Pointer의 u를 Oracle 문서로, Call Stack 첫 문장, Source Map p의 공개 확인, Floating Point Error p의 금액 계산, Missing await 그림(비어 있음이 아니라 Promise), Double Submit·Race Condition·Side Effect 그림의 잘못된 "실패" 표시, Elements Panel 그림(트리로 교체, 안 쓰게 된 그림 줄 삭제), Side Effect의 React 뜻.
- **Minor:** M1~M13 전부. M14는 Severity vs Priority만 o:1로 올렸다.
- **눈 확인에서 내가 고친 것:** Broken Image의 "강조 실패" 겹침, Hydration Mismatch의 주소창 강조, Misalignment와 Unclickable의 뜻 없는 그림을 전용 그림으로 교체.
- **합친 뒤 내 수정:** I11로 생긴 어색한 지시어를 "고친 곳 밖의 영향으로"로 고쳤다.

## 안 고친 것
- **M14 Blast Radius:** AWS 문서의 중심 낱말은 bulkhead와 scope of impact이고 Blast Radius 뜻풀이가 없어 o:1로 올리지 않았다.

## 직접 대조한 지적
curl로 원문을 받아 확인했다. npm "must install its own copy", "conflicting requirement may cause an error", MDN JSON.parse "throws a SyntaxError", Oracle NullPointerException "Thrown when an application attempts to use null", React "are called side effects", MDN ReferenceError "hasn't yet been initialized", MDN fetch "does not reject". M13의 새 주소와 Oracle, Firefox 주소는 모두 200이고 넘겨주기 없음.
[Environment-specific Bug 웹 검색](https://www.testmuai.com/blog/reproduce-browser-specific-bugs-exact-configuration/)에서도 표준 정의는 나오지 않았고 비공식 쓰임만 있었다.

## 추정이거나 확인 못 한 글(근거 없음을 알고 남김)
- Floating Point Error p의 "금액은 정수 단위로 계산": MDN에 없는 판단이다.
- Source Map p의 공개 확인: 원본 공개 위험 설명은 추정이고 webpack은 노출을 피하는 설정만 말한다.
- Workaround의 Hotfix 구분: 공식 문서 없음.
- SyntaxError p의 "오류 위치 앞쪽까지": MDN에서 찾지 못한 경험칙이다.
- Timezone Bug의 "미국처럼 전날 저녁": 문서 규칙에서 끌어낸 예이고, 디렉터가 뉴욕 시간대에서 측정해 맞았다.
- Five Whys 횟수 문장, Hard Refresh의 CDN 문장, Incognito Test의 원인 나누기: 공식 근거가 없고 단정하지 않게 썼다.
- Trace ID의 "끊길 수 있어요"와 Request ID 구분: 해석이다.
- Error Tracking과 Crash Reporting의 구분: 정의 수준이다.
- Firefox, Safari 오류 문구: MDN 표와 대조만 했고 실제 브라우저로 재지 않았다. Chrome 156만 측정했다.
- FOUC(공식 문서 없음), MDN font-display에 FOIT, FOUT 낱말 없음, Mojibake 낱말 MDN에 없음, npm 문서의 ERESOLVE: 찾지 못해 해당 주장은 쓰지 않았거나 o:0이다.

## 그림 기록
- 공유 그림 유지: Layout Shift, Jank, Flicker, Overlap, Text Overflow, Infinite Loading, Git Bisect. 점검이 지키는 키라 D에서 지우지 않았다.
- Memory Leak Bug, Stack Overflow의 끝 표시가 선에 살짝 겹친다. 읽기에 지장이 없어 두었다.
- 움직임 그림은 한 장면과 코드만 확인했고 재생 전체는 보지 않았다.
