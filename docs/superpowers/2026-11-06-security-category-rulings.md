# 보안 카테고리 디렉터 검토 판정

2026-11-06. 범위: 새 40장, 새 절 4개(vuln, account, crypto, supply), 증상 12개, 옛 48장 글과 그림.
디렉터 판정: 수정 후 통과. Critical 1, Important 16, Minor 15.

## 고친 것
- **C1 Key Rotation:** 유출 때도 새 키로 옮긴 뒤 폐기하라고 읽혔다. 평소 순서와 유출 때 순서를 나눴다. [GitHub 문서](https://docs.github.com/en/code-security/secret-scanning/working-with-secret-scanning-and-push-protection/remediating-a-leaked-secret)와 직접 대조했다.
- **I1~I16 전부:** HTTPS Only와 HSTS 모순, 2단계 인증 문구, Magic Link의 NIST 범위와 주소, SBOM과 Lock File 차이, CVE 글과 p, SameSite 기본값, Secret Scanning 대상 저장소, WAF, Breached Password Check, Public vs Private Key, Man-in-the-Middle 주소, 그림 상태(Zero Day, Supply Chain Attack), 답이 없던 증상 2개(CSP, 휴대폰 분실).
- **실제 값을 예시로 쓴 그림 2건:** CVE-2026-12345(실제 기록), example-lib(npm에 실제 있음)을 뺐다.
- **Minor:** M1~M9, M11~M15. M15에 든 다른 분류의 Helper Text(조합 규칙 예시)도 Password Policy와 맞췄다.

## 직접 대조한 지적
- C1, I10(MDN Set-Cookie의 일부 브라우저 문구): 지적대로 맞다.
- I2: `better than`은 받아 온 OWASP 본문에 없었고 `Do not use SMS for high-value or PII-handling applications`는 있었다(측정). WebFetch 요약은 "Any MFA is better than no MFA"를 인용했으나 원문에서 찾지 못해 쓰지 않았다.
- TLS 카드의 RFC 9846(2026-07, RFC 8446 대체)과 OWASP Top 10 2025 순서: 공식 쪽을 열어 맞음을 확인했다.

## 안 고친 것
- **M10 Penetration Test:** 서면 허락, 범위와 기간, 보고서는 NIST 용어집에 없는 일반 관행이다(추정). 문장은 두고 여기에 기록한다.
- **M15 일부:** 절마다 d 끝맺음이 다르다(…예요, …것). 뜻은 통해서 그대로 둔다.
- **근거가 약한 글(o:0 또는 일반 지식):** Captcha, Bot, End-to-End Encryption, Email Verification, Privacy Policy, Security Audit, Vulnerability. WAF의 "약점을 없애지 못함"과 오탐, Encryption at Rest의 셋째 문장, Single Sign-On의 로그인처 위험, Recovery Code의 재등록 순서는 공식 문장을 찾지 못한 추정이다.

## 측정
- npm audit 기본 출력에 CVE 번호가 없다는 지적(I5)은 디렉터의 lodash 표본 1개 측정이다. 모든 경우로 일반화하지 않으려고 "보통"이라고 썼다.
