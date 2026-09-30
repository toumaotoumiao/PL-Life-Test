# Stage73 · PL-Life-Test 测试同步指南

版本 v8.1.12.252 / schema26。仅把 `Stage73_测试仓库完整同步包.zip` **解压后的文件内容**同步至 PL-Life-Test，不上传 ZIP 本体、完整工程、私有样卡或测试证据到 GitHub。不要覆盖正式站。

本轮增加 Round229（图库异常引用恢复预检）和 Round230（D&D 合并结构核对合同）；两份 CI 工作流同步更新。`PL isolated native ZIP restore gate` 必须由线上**同一提交**运行，并核对 `round187-result.json` 的 status。只有 PASS 才算原生恢复验收，BLOCKED / FAIL / NOT_RUN 不计通过。再执行真实 Windows/手机和线上视觉验收。
