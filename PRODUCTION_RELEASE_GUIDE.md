# PL收集梦想生活 · 正式发布同步说明

当前正式发布候选：v8.1.12.267 / schema26。

## 使用范围
- `Stage89_正式仓库完整同步包.zip`：只用于正式仓库 `PL-Life`。
- 不要把测试仓库、历史内部报告、真实备份、角色 Excel 或验收 artifact 上传到正式仓库。
- 正式站与测试站继续依赖 `runtime-environment.js` 按路径隔离存储。

## 发布前
1. 测试站当前提交的 Synthetic 与 Native ZIP restore gate 必须通过。
2. 手机规则菜单针对性确认通过：面板位于触发按钮下方，同按钮、点击外部和 Esc 均可关闭。
3. 使用 `python .github/pl-ci/build-production-release.py --check-only` 运行正式发布预检。

## 覆盖方式
将正式仓库同步包解压后覆盖 `PL-Life` 本地仓库。正式仓库不需要历史 Stage 内部报告。

## 发布后只检查
- 页面显示 v8.1.12.267；
- Service Worker 缓存为 v8.1.12.267；
- PL/PC/模组/计划/记录可正常打开；
- 原有正式数据仍存在。

不要在正式站重新做破坏性恢复演练；完整恢复链已经由测试站的隔离原生 CI 验收。
