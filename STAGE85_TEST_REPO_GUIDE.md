# Stage85 测试仓库说明

1. 仅覆盖 `PL-Life-Test`，不要覆盖正式 `PL-Life`。
2. 提交后 Push；两条 Actions 会自动运行。
3. 期望：`PL synthetic browser regression` 不再因 reload TDZ 失败。
4. `PL isolated native ZIP restore gate` 必须真正执行 Round187；若仍失败，下载最新 `pl-round187-native-restore-evidence`。
5. 成功结果必须绑定当前 Git commit、`app_version=8.1.12.264`、playwright-bundled，并满足档案与附件四阶段证据链。
6. 任何 NOT_RUN/BLOCKED/FAIL 均不得放行正式发布。
