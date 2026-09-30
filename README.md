Stage85 · v8.1.12.264 内部候选。

本轮修复完整 ZIP 恢复完成后 reload 进入保护模式的启动顺序 TDZ：跑团 canonical/runtime key 集合现在在首次 loadState() 前初始化；同时修复独立原生恢复 CI 的多行测试续行，并增加启动顺序与 workflow 完整性防回归。

schema26、完整 ZIP 格式和正式数据结构不变。正式站尚未发布；必须先取得 PL-Life-Test 同一提交的 synthetic browser 与 isolated native ZIP restore 结果。
