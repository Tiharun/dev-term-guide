# Git 카테고리 판정 기록 (2026-11-06)

가벼운 방식 시험: 에이전트 4개가 초안, 메인이 넣기, 디렉터 최종 검토 1회. Critical 0, Important 8, Minor 9.

## 고친 것

| 지적 | 판정 | 근거 |
|---|---|---|
| Force Push: `--force-with-lease`가 안전하다는 글 | fetch 뒤에는 못 막는다고 고침 | 측정(git 2.56, fetch 뒤 강제 업데이트), [git-push](https://git-scm.com/docs/git-push) |
| Checkout: "저장 안 한 수정" | "커밋하지 않은 수정"으로 고침 | [git-checkout](https://git-scm.com/docs/git-checkout) |
| Discard Changes: "원래 상태로" | 대기석 내용으로 돌리고 새 파일은 남는다고 고침 | 측정, [git-restore](https://git-scm.com/docs/git-restore) |
| Merge 그림: main이 안 나아갔는데 합침 커밋 | main에 C를 더해 갈라진 모양으로 고침 | [git-merge](https://git-scm.com/docs/git-merge) |
| Squash and Merge 그림: C D E가 사라짐 | feature에 남는 모양으로 고침 | [about pull request merges](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges) |
| Protected Branch: 요금제 조건 없음 | 무료는 공개 저장소에만 걸 수 있다고 추가 | [about protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) |
| Personal Access Token: 관련 카드 Token은 AI 글자 단위 뜻 | API Key로 바꿈 | 측정(grep) |
| 증상 "올리면 안 될 파일을 올렸어요": Unstage가 먼저 | Secret Leak을 먼저, .gitignore에 `git rm --cached` 추가 | 측정, [gitignore](https://git-scm.com/docs/gitignore) |

## 등급을 올려 고친 것

사용자 지시 "어울리지 않는 그림도 고치기"에 해당해 Minor에서 올렸다.

- Clone·Fork 사본 상태를 `new`에서 `copy`로. 화면 낭독이 "새 커밋"으로 읽혔다.
- Interactive Rebase·Squash 그림의 이름표를 `main`에서 `feature`로. main 기록을 고쳐도 되는 것처럼 보였다.
- Commit Before Big Change의 `stop`을 `ok`로. "아직 못 합침"으로 읽혔다.

## 미룬 Minor(2026-11-06 배포 전에 모두 고침, 검사 gitminor)

1. Restore Deleted Branch: 지운 브랜치는 reflog에 없을 수 있어요. 터미널의 `was` 번호를 먼저 안내하면 더 정확합니다.
2. Issue: PR에 번호만 적어서는 연결되지 않아요. `Closes #번호` 형식이 필요합니다.
3. Merge Conflict: "고친 뒤 커밋"에 `git add`가 빠졌습니다.
4. main Branch: `git init` 기본 이름은 설정에 따라 아직 master일 수 있습니다.
5. Cherry-pick: "두 번 합쳐질 수 있어요"가 모호합니다.
6. Conventional Commits: Changelog 자동 생성에는 별도 도구가 필요합니다.
7. 증상 연결: "거절당했어요"의 Force Push, "예전 상태로"의 순서, "충돌"의 Rebase.
8. 초보자 문장: Trunk-Based의 내부 메모 같은 문장, "Reset --hard", Merge Commit의 "부모", CODEOWNERS의 "그 파일".

## 확인되지 않은 것

- Draft PR·Merge Queue의 요금제 조건: 카드는 단정하지 않는다.
- CODEOWNERS의 무료 공개 저장소 가용성: 카드는 요금제를 말하지 않는다.
- 공식 문서 대부분은 요약 도구를 거쳐 읽었다.
