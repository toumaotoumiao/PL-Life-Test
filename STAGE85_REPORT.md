# Stage85 RC2 报告 · v8.1.12.265

## GitHub 在线证据定位出的第二个启动问题
Stage85 RC1（v8.1.12.264）已在 GitHub Playwright bundled Chromium 中完成 Round187 前 22 项。恢复刚提交时主档案与附件均能核对；真正 reload 后仍进入保护模式。

`round187-result.json` 明确记录：

`startupError: Cannot access 'settings' before initialization`

同时诊断为：`guard=ok / integrity=ok / hydrate=ok / ensure=ok / manualEvidenceMatch=true / parse=ok`，且附件证据哈希完全一致。因此不是 ZIP 恢复写坏附件，也不是 D&D 数据本身，而是启动期 canonical 投影读取了尚未完成顶层初始化的全局 `settings`。

## 根因
`loadState()` 在顶层 `let { profiles, settings, ... } = loadState()` 完成赋值之前，会水合 canonical 档案并建立用于 heritage 证据的 projection。该 projection 调用 `canonicalModuleFromRuntime()`；RC1 中该函数内部直接读取 `settings.moduleArchive`，因此命中 JavaScript TDZ。

## RC2 产品修复
1. `canonicalModuleFromRuntime(raw, sourceSettings)` 改为必须显式接收模组设置，不再读取全局 `settings`。
2. 启动水合路径显式传入本档案已归一化的 `st.moduleArchive`。
3. 正常运行期保存、历史/回收站路径显式传入已经初始化的 `settings.moduleArchive`。
4. Round146 动态水合测试移除全局 `settings` fixture，证明 canonical hydrate 在顶层 `settings` 尚不存在时仍能完成。
5. 新增 Round260，锁定“启动水合不得偷偷读取全局 settings”的契约，并加入两条 CI。

## 版本管理
Stage85 RC1 已实际推送测试站，不能在相同 v8.1.12.264 下继续修改 Service Worker 资产。因此 RC2 升至 **v8.1.12.265**，缓存版本同步更新。v264 历史说明保持 RC1 原样；v265 作为独立记录。

schema26、正式数据结构、完整 ZIP 格式和迁移规则均未改变。

## 本地验证
- 全量 Node：927/927 PASS。
- Round146 + Round184 + Round260 启动/投影专项：14/14 PASS。
- D&D 私有匿名结构工具：17/17 PASS。
- Round251 原生结果证明虚构正反例：21/21 PASS。
- 两份 Actions YAML：解析通过。

## 在线验收边界
本地 Chromium 导航受管理员策略限制，本轮不能宣称浏览器或原生恢复 PASS。下一步必须将 v8.1.12.265 测试同步包推送 `PL-Life-Test`，由 GitHub Playwright bundled Chromium 重新执行 synthetic 与 isolated native gate。

原生发布门槛在取得同提交 PASS 前保持关闭。
