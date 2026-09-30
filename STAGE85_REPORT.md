# Stage85 报告 · v8.1.12.264

## 真实问题
Stage84.2 GitHub bundled Chromium 已完成 Round187 前 22 项，恢复刚提交与附件证据均正常；reload 后进入保护模式。artifact 明确记录：
`Cannot access 'RUN_CANONICAL_ONLY_KEYS' before initialization`。
Stage84.3 另发现 native workflow 多行 `node --test` 在 Round256 后漏续行，导致 exit 126、Round187 未运行。

## 修复
- 三个 run canonical/runtime key 集合改为在首次 `loadState()` 前初始化；没有改变集合内容、schema26、ZIP 格式或迁移规则。
- 修正 native gate 续行，并补 Round258/259 防回归。
- 合入 Stage84.3 的启动诊断与 synthetic/native gate 分工。

## 本地回归
- Node 924/924 PASS。
- D&D 私有匿名结构工具 17/17 PASS。
- 原生结果证明虚构正反例 21/21 PASS。
- Actions YAML 解析 PASS。

## 验收边界
本环境 Chromium 导航仍受管理员策略阻断，因此 Stage85 不声明浏览器/原生恢复 PASS。下一步必须由 GitHub bundled Chromium 对同一提交验证。
