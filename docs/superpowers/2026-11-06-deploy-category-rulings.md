# 배포 카테고리 판정 기록 (2026-11-06)

가벼운 방식: 에이전트 5개가 초안, 메인이 넣기와 옛 그림 감사, 디렉터 최종 검토 1회. Critical 1, Important 12, Minor 13. 범위는 새 40장·절 4개·증상 12개로 87장이 됐다.

## 고친 것

| 지적 | 판정 | 근거 |
|---|---|---|
| Render: 무료 요금제에서만 파일이 사라지는 듯한 글 (Critical) | 요금제와 상관없이 기본 설정에서 사라진다고 고침, u도 교체 | [Render 디스크](https://render.com/docs/disks) |
| Docker Compose: down을 그냥 끄는 말로 씀 | 컨테이너를 지우고 -v는 저장 공간도 지운다고 추가 | [compose down](https://docs.docker.com/reference/cli/docker/compose/down/) |
| Nameserver: 기록을 먼저 옮기라는 말이 없음 | 먼저 옮기고 최대 하루 걸린다고 고침 | [Cloudflare 전체 설정](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) |
| Custom Domain: 순서 없음 | GitHub Pages는 등록 먼저, 뒤집으면 남이 쓸 수 있다고 추가 | [GitHub Pages 도메인](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) |
| TTL: 옛 TTL만큼 기다려야 한다는 조건 없음 | 조건 추가, u 교체 | [Cloudflare TTL](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) |
| Build Log: 시작도 안 된 배포에도 보라고 함 | 새 배포가 없으면 Auto Deploy 설정부터 보라고 고침 | [Vercel 로그](https://vercel.com/docs/deployments/logs) |
| SLO·SLA: SLO를 내부 목표로 못 박음 | 보상이 없는 목표이고 공개하기도 한다고 고침 | [SRE 책 SLO](https://sre.google/sre-book/service-level-objectives/) |
| On-Call: 12시간 조건 없음, 그림의 기간과 충돌 | 조건 추가, 그림을 낮·밤으로 | [SRE 워크북 온콜](https://sre.google/workbook/on-call/) |
| Dependabot: 시크릿을 아예 못 쓴다는 글 | Dependabot 시크릿에 넣으면 된다고 고침 | [secret types](https://docs.github.com/en/code-security/reference/secret-security/secret-types) |
| Job 그림: 앞 잡이 끝나야 시작이 기본인 듯함 | needs로 이어야 순서가 생긴다고 고침 | [Actions 이해](https://docs.github.com/en/actions/get-started/understand-github-actions) |
| Runner: ko가 d와 반대 | 일을 하는 컴퓨터로 고침 | 읽기 판단 |
| Railway·Fly.io: u가 루트 문서 | 내용이 있는 문서로 교체 | [Railway DB](https://docs.railway.com/databases), [Fly 멈춤](https://docs.fly.io/launch/autostop-autostart/) |
| Fly.io 그림: 저장 공간을 함께 쓰는 듯함 | 저장 공간을 그림에서 뺌 | [Fly 볼륨](https://docs.fly.io/volumes/overview) |

## 메인이 찾아 고친 것

| 문제 | 판정 |
|---|---|
| Deployment Status 그림: 대기가 완료로, 완료가 대기로 표시됨 | 배포 목록 표로 교체 |
| 순서 그림 조사: CDN가, Vercel가, PR가 | `ga`가 영문 끝소리 L·M·N·R을 받침으로 봄. 다른 카테고리에도 같이 적용 |
| Auto Deploy 터미널: 320px에서 2px 넘침 | 명령을 git push로 줄임 |
| 글꼴에 없는 글자 챌·륨 | 놓칠, 저장 공간으로 바꿈 |

Minor 중 글만 고치면 되는 M1(Fly.io), M2(Netlify), M3(Scheduled Workflow), M4(Error Budget, 그림 4주), M6(SPA Fallback), M7(Apex Domain), M8(Repository Secret), M11(Ship It), M12(GitHub Pages)도 같이 고쳤다.

## 안 고친 것

- M5 Rollback Deploy: Vercel 무료 요금제는 바로 앞 배포로만 돌아간다는 내용. x가 이미 3문장이다.
- M9 Auto Deploy 그림: 터미널에 Building이 찍혀 push한 창에서 결과를 본다고 오해할 수 있다. 그림 교체가 필요하다.
- M10 Incident 그림: HTTP 500 하나라 뜻이 좁게 읽힌다. 그림 교체가 필요하다.
- M13 Production Build 그림: 수치가 실측처럼 보인다. 칸 그림이라 cap을 못 붙인다.
- Nameserver: DNSSEC을 쓰면 먼저 꺼야 한다는 내용. x가 3문장이다.

## 확인 못 함

- Railway가 코드와 DB를 한 프로젝트에 묶는다는 주장: 한 문서로 온전히 확인되지 않았다. databases 문서는 DB를 서비스로 다룬다는 데까지다.
- Dependabot 시크릿 내용은 카드 u(설정 문서)에 없다. u는 카드의 중심 내용인 dependabot.yml 쪽을 유지했다.
- GitHub Pages의 SPA 되돌림 지원 여부: 명시 문장을 못 찾아 카드에 쓰지 않았다.
