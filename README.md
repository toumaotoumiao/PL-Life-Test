Stage85 RC2 · v8.1.12.265 内部候选。

GitHub bundled Chromium 已把 v264 原生恢复失败进一步定位为 canonical 模组投影在 loadState 启动水合期间读取未初始化的全局 settings。RC2 将该投影改为显式接收档案自己的 moduleArchive 设置，并用无全局 settings 的动态水合测试锁定启动安全边界。

v265 同步更新 Service Worker cache；v264 测试站历史记录保持原样。schema26、正式数据结构和完整 ZIP 格式不变。

正式站未发布。必须先取得 PL-Life-Test v265 同一提交的 synthetic browser 与 isolated native ZIP restore 结果。
