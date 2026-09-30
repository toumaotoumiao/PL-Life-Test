# Stage82 测试仓库同步指南 · v8.1.12.261

本包仅用于 `PL-Life-Test`。正式仓库与个人数据不自动改变。

1. 通过 GitHub Desktop 打开本地 `PL-Life-Test` 仓库，先核对仓库名/路径；将测试同步包**解压后的文件夹内容**整体复制到仓库根目录。不要把 ZIP 文件直接上传为网页资源，不要复制到 `PL-Life` 正式仓库。
2. 在 GitHub Desktop 审查变更并集中提交一次，按 `Push origin`。避免 GitHub 网页 25 文件上限的分批上传；若中途有不完整提交，不得据此判定产品失败或发布成功。
3. 推送完成后到测试仓库 Actions，查看自动触发的 `PL isolated native ZIP restore gate`。无需再次点击 Run workflow；仅需手动复跑时使用 `workflow_dispatch`。浏览器综合回归工作流仍独立运行。
4. 打开原生恢复运行记录，下载 `pl-round187-native-restore-evidence`，检查其中 `round187-evidence/round187-result.json`。仅当结果为 PASS、完整检查项存在、提交 SHA 与应用版本均匹配，才能登记为原生恢复通过。`BLOCKED`、`FAIL`、`NOT_RUN` 或缺文件均保持未通过。

本轮新增 `round251-native-result-attestation.py` 会自动执行上述关键核验，不能用 15/15 的虚构报告验证测试代替真实恢复结果。自动触发只在仓库收到相关文件变更时发生，不具有部署、推送或写仓库权限。

所有测试只使用虚构数据，不要上传用户正式 ZIP、原始私有 D&D 卡或真实联系人资料。取得结果后，将 `round187-result.json` 或完整测试证据包发回继续验收即可。
