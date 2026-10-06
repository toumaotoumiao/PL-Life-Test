# Stage114 测试仓库说明

当前版本：v8.1.12.292 / Stage114 / schema26。

本轮产品界面没有新增功能，重点是复验 GitHub Actions：
1. 上传 Stage114 测试仓库完整同步包。
2. 等待 `chromium-synthetic` 完整运行。
3. `Round141 Chromium PC full archive two-column geometry` 应通过。
4. 最后的 `Enforce critical browser results after subsequent checks` 不应再报告 `Round141 failed`。
5. Stage113 的计划默认具体时间仍按原验收清单继续真实手机/桌面复核。

如果仍有红项，请下载新的 `pl-synthetic-browser-result` 回传；优先按实际失败 Round 定位，不把后置汇总步骤本身当成根因。
