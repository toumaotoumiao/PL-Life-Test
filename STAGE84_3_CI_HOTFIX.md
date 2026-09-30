# Stage84.3 CI 热修说明

产品版本保持 v8.1.12.263 / schema26。本补丁不修改正式业务数据格式，不发布正式站。

## 本轮修复

1. 测试仓库补回 Round194 真正依赖的 `RUN_STAGE48_NATIVE_RECOVERY.cmd` 与 `STAGE48_NATIVE_RECOVERY_WINDOWS.md`，避免合成浏览器 workflow 在进入后续浏览器步骤前因 ENOENT 中止。
2. 合成浏览器 workflow 继续运行 Round187 原生恢复作为信息项，但不再把它计入 synthetic regression 的最终总失败；真正的发布阻断仍由独立 `PL isolated native ZIP restore gate` 强制执行。
3. Round187 原生浏览器脚本新增 synthetic-only reload startup diagnostics。若 reload 再次进入保护模式，artifact 的 `round187-result.json` 会包含 `reload_diagnostic`，区分 migration guard / canonical integrity / hydrate / ensureSelfProfileAndLinks 层，并只输出有界错误信息，不转储档案内容。
4. 新增 Round257 契约，防止未来再次把原生发布门槛和 synthetic 总绿勾混为一体，同时要求 reload 诊断保持有界、结构化。

## 本地验证

- 全量 Node：920/920 PASS
- Round237 视觉合并器：5/5 PASS
- Round251 原生结果证明器：21/21 PASS
- Round223 D&D 私有工具：17/17 PASS
- Round187 Python 脚本语法：PASS
- 两份 GitHub Actions YAML：PASS

## 当前原生恢复事实

上一轮 GitHub bundled Chromium 已真正执行 Round187：22 项检查通过，失败在 `reload-sourceEvidence`。附件证据哈希 source / reloaded_native / second_zip 一致；业务档案 evidence 在 reload 后不一致，并且页面进入“档案已进入保护模式”。

本地使用相同 Round187 虚构业务数据验证 `buildCanonicalArchive -> saveState -> hydrateCanonicalArchive -> ensureSelfProfileAndLinks` 是稳定的，因此下一步重点定位真实恢复事务结束后的启动保护链，不把问题误归因于 D&D 字段或附件。

## 用户下一步

将 Stage84.3 测试仓库完整同步包覆盖到 PL-Life-Test 后 Commit + Push。等待两个 workflow：

- `PL synthetic browser regression`：目标是独立变绿；Round187 即使失败也只报告，不再污染此工作流。
- `PL isolated native ZIP restore gate`：仍是发布硬门槛。若失败，下载新的 `pl-round187-native-restore-evidence` 发回，重点读取 `round187-result.json` 的 `reload_diagnostic`。
