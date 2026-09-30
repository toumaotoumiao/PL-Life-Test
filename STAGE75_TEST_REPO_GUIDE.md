# Stage75 测试仓库同步说明

版本 v8.1.12.254 / schema26；解压后将包内内容同步到 **PL-Life-Test** 的对应路径，不能上传至 PL-Life 正式仓库，也不能将整个 ZIP 当作单个网页资源。

推荐使用 GitHub Desktop 或 git 同步完整目录，避免网页版一次上传大量文件的限制。CI 文件 `.github/workflows`、`.github/pl-ci` 需要和 `index.html`、`sw.js`、功能脚本处于同一提交；不要跳过隐藏目录。

触发独立 `PL isolated native ZIP restore gate` 工作流，检查 `round187-result.json` 的 status、commit、app_version 与当次提交。只有同一提交的 PASS 满足该独立门槛；本地 Round157 的 90/90 不代替原生恢复、Windows/手机或线上部署结果。

正式站不由本包更新。发布前先保留当前正式站完整 ZIP 和用户自己的完整数据备份；真实数据不要加入公开仓库或测试证据。
