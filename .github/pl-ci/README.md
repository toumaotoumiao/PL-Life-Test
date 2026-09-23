# CI-only synthetic integration fixtures

No personal archives. Only fixed fictional data. This directory is committed under `.github` and is not part of the published site file set. The workflow runs on an ephemeral 127.0.0.1 random port. To keep report metadata redacted, do not add raw backups or screenshot uploads.

第72轮额外检查：`round72-log-status-regression.test.cjs` 验证独立 Log 备注的筛选统计、新建行不覆盖已有备注，以及桌次状态保存失败时的显示回退。

## Current-release maintenance policy

The CI suite is a long-lived release guard, not a snapshot of one historical version.

- `round92-current-release-contract.test.cjs` derives the current app version from `APP_UI_VERSION`; do not hard-code the latest release number in current-release assertions.
- Visible current-version labels, the first release note and the service-worker cache must all match `APP_UI_VERSION`.
- When production functions gain a new top-level dependency, isolated VM fixtures must load that dependency from the real source instead of copying a stale value into the test.
- PNG/showcase tests assert behavior contracts (unified final preview, PNG compatibility conversion, ZIP fallback) instead of a fixed raw call count.
- New public image-export entrypoints must be added to the current-release showcase contract when they are introduced.
- Synthetic fixtures must remain fictional and must never include user backups, player names, original workbooks or screenshots containing personal data.
- Release work is not complete until the current static tests pass and the Chromium steps have had a chance to run in GitHub Actions.


## Browser-flow maintenance

- Browser audits must follow the same visible user flow as the product. If a new privacy, safety, onboarding or confirmation preflight is introduced, the audit must operate that preflight and then continue to the target UI; do not bypass it with synthetic DOM clicks or leave it open for later view tests.
- A blocking modal left by one audit step is a test failure in its own right because it can create misleading downstream navigation failures.
- When an intentional product flow changes, update the live-browser audit and its static coverage contract in the same release.

- `round93-privacy-export-resume.test.cjs` protects the privacy-export continuation contract: the original export action resumes only after the confirm click finishes bubbling, and dynamic export buttons are reacquired from the live DOM after privacy-mode rerenders.
