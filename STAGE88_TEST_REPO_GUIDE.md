# Stage88 测试仓库使用说明

版本：v8.1.12.267 / schema26

1. 将 Stage88 测试仓库完整同步包解压后覆盖 PL-Life-Test 本地仓库。
2. Commit 并 Push origin。
3. 等待 `PL synthetic browser regression` 与 `PL isolated native ZIP restore gate` 自动运行。
4. 手机只需要针对性确认：打开 PC/模组/计划/记录规则菜单时，面板位于触发按钮下方；再次点按钮、点外部区域、Esc（有键盘时）均可关闭；靠近屏幕底部的规则按钮展开后内容仍可滚动使用。
5. 不需要重复完整 ZIP、Windows、Excel/WPS 全流程验收，除非在线 CI 或针对性复核发现新的数据问题。
