# Stage85 Internal Progress
Version: v8.1.12.264 / schema26

## 本轮关键路径
- GitHub Round187 在线证据已把 Stage84.2 的真实产品失败定位为 reload 启动 TDZ：`RUN_CANONICAL_ONLY_KEYS` 在首次 `loadState()` 之后才初始化。
- Stage84.3 原生工作流另有独立续行缺陷，Round256 后缺少 shell 反斜杠，导致 exit 126、浏览器未运行。

## Stage85 修复
1. 将 RUN_CANONICAL_ONLY_KEYS / RUN_RUNTIME_ONLY_KEYS / RUN_DRAFT_KNOWN_KEYS 提前到首次 loadState() 之前；集合内容不变。
2. Round258 固化启动依赖顺序，防止该 TDZ 回归。
3. 修正独立 native gate 的 Round256→257→258→259 多行续行。
4. Round259 检查两份 workflow 引用的 Node 测试文件均存在，并检查 native 多行 test list 的续行完整性。
5. 合入 Stage84.3 的 Round187 启动诊断与 synthetic/native gate 职责拆分。

## 本地证据
- Node: 924/924 PASS
- D&D private offline audit: 17/17 PASS
- Round251 native-result attestation fixtures: 21/21 PASS
- YAML parse: PASS
- System Chromium navigation: BLOCKED_BY_ADMINISTRATOR；不计浏览器验收。

## 未完成
- GitHub synthetic browser regression 对 v8.1.12.264 的线上复验。
- GitHub isolated native ZIP restore gate 的同提交 PASS。
- Excel/WPS 与真实 Windows/手机验收。
