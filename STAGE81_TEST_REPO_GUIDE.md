# Stage81 测试仓库同步指引

目标：PL-Life-Test，**非正式仓库**。压缩包解压后上传对应仓库目录内容（含隐藏 `.github`），不要上传 ZIP 文件自身、证据包、真实备份或私有 D&D XLSX。

使用同步包完成测试站文件上传后，进入 GitHub Actions，手动运行 `PL isolated native ZIP restore gate`，取得本次提交对应的 `round187-result.json` 和 console 证据。若 `status` 不为 `PASS`，或提交 SHA / 页面版次不一致，仍不得发布正式站。Stage81 本机结果为 `BLOCKED`，不能当作 PASS。浏览器合成回归另由 `PL synthetic browser regression` 运行。

本版 v8.1.12.260，schema26；保留 Stage80 以前的历史记录，不删除原有正式数据。测试站数据与正式站隔离。
