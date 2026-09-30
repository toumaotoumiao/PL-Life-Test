# Stage83 PL-Life-Test 操作

1. 仅将“Stage83_测试仓库完整同步包.zip”解压内容覆盖 PL-Life-Test 本地仓库。
2. GitHub Desktop 查看变更，确认目标仓库为 PL-Life-Test，不是正式 PL-Life。
3. 一次 Commit，再 Push origin。
4. Push 后 `PL isolated native ZIP restore gate` 会自动运行；也保留 workflow_dispatch 手动入口。
5. 下载 artifact `pl-round187-native-restore-evidence`。
6. 核对 `round187-evidence/round187-result.json`：必须 status=PASS、phase=finished、browser_source=playwright-bundled、commit=本次提交、app_version=8.1.12.262，并存在四个一致的 archive_evidence SHA-256。
7. 将该 result.json 发回继续 Stage84。任何 BLOCKED / FAIL / 0 checks / hash drift 都不允许发布。

此工作流没有 Pages 部署权限、没有 contents write 权限，不会覆盖正式站。
