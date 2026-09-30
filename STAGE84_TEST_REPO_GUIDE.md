# Stage84 PL-Life-Test 操作

1. 仅将“Stage84_测试仓库完整同步包.zip”解压内容覆盖 PL-Life-Test 本地仓库。
2. GitHub Desktop 查看变更，确认目标仓库为 PL-Life-Test，不是正式 PL-Life。
3. 一次 Commit，再 Push origin。
4. Push 后 `PL isolated native ZIP restore gate` 自动运行；也保留 workflow_dispatch 手动入口。
5. 下载 artifact `pl-round187-native-restore-evidence`。
6. 核对 `round187-evidence/round187-result.json`，必须同时满足：
   - `status=PASS`、`phase=finished`；
   - `browser_source=playwright-bundled`；
   - `commit` 等于本次提交，`app_version=8.1.12.263`；
   - required checks 完整且 `passed` 与检查数量一致；
   - `archive_evidence` 的 source / reloaded_native / second_zip / post_rejected_reload 均为 64 位 SHA-256 且四者一致；
   - `attachment_evidence` 同样包含四阶段 SHA-256 且四者一致。
7. 将 result.json 发回继续 Stage85。任何 BLOCKED / FAIL / 0 checks / 业务档案 hash drift / 附件 hash drift 都不允许发布。

此工作流权限仍为 `contents: read`，不执行 Pages 部署，也不写正式仓库。
