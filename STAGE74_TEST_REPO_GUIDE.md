# Stage74 测试仓库同步指南

- 仅同步到 PL-Life-Test，解压 ZIP 后保留 .github 目录并按原相对路径覆盖。不要把完整候选工程压缩包直接上传 GitHub，不覆盖正式 PL-Life。
- 测试文件不含私人 D&D 工作簿和真实备份；请勿将个人原始样卡放进 Git 仓库、Actions 日志或网站文件。
- 检查两份 CI 流程均与 v8.1.12.253 一致。独立原生恢复 workflow_dispatch 需要对测试仓库的同一提交运行。
- 原生结果必须同时满足 PASS、result.json commit 等于 GITHUB_SHA、app_version 等于工程的 APP_UI_VERSION；BLOCKED、NOT_RUN 或缺失证据均不通过。
- Round157 本轮中止，真实 Windows/手机与线上 CI 未取得新增 PASS，因此不发布正式版。
