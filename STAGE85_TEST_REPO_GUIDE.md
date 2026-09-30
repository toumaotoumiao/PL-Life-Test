# Stage85 RC2 测试仓库说明 · v8.1.12.265

1. 只覆盖 `PL-Life-Test`，不要覆盖正式 `PL-Life`。
2. 整包覆盖后 Commit + Push；不要 Re-run v264 旧提交。
3. 两条 Actions 均应自动运行。
4. `PL synthetic browser regression`：上一轮失败的“完整恢复后重新打开”应不再出现 `settings before initialization`。
5. `PL isolated native ZIP restore gate`：必须使用 `playwright-bundled`，并绑定当前 commit、`app_version=8.1.12.265`。
6. 原生 PASS 仍必须满足档案与附件四阶段证据链；任何 FAIL / BLOCKED / NOT_RUN 都不得放行正式站。
7. 如果 native 仍失败，只需下载最新 `pl-round187-native-restore-evidence` 发回；新的 reload_diagnostic 会继续给出启动层错误。
