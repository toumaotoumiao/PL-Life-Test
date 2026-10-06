# Stage114 报告

## 用户回传结果
GitHub Actions 的 `chromium-synthetic` 最终失败，汇总步骤指出 `Round141 failed`。用户同时回传 `pl-synthetic-browser-result (15).zip`。

## 结论
这是自动化夹具依赖漂移，不是 PC 导出产品故障。回传日志的唯一 Round141 运行时错误为：`ReferenceError: moduleRuleDisplay is not defined`。实际 `index.html` 中该函数存在，失败发生在 Round141 将部分生产函数抽取到隔离 Chromium 环境时漏注入该依赖。

## 修复
- Round141 浏览器夹具新增 `ruleDisplaySource`，直接从当前生产 `index.html` 提取 `moduleRuleDisplay`。
- 隔离规则映射补齐 family/system/edition 显示标签，避免测试环境产生无意义的 `undefined` 标签。
- Round141 静态契约新增“必须提取并注入 ruleDisplaySource”的断言，防止同类漂移再次静默进入 Actions。
- Round285 的当前版本断言改为读取唯一状态源 `CURRENT_PROJECT_STATUS.json`，不再把 v291 永久写死为“当前”。
- 产品数据、PC 导出绘制逻辑、Stage113 计划具体时间逻辑、schema26 和完整 ZIP 格式均未修改。

## 发布判断
Stage113 的产品功能本身不需要回滚。Stage114 作为 CI/发布资产热修候选，应先更新测试仓库重新运行 `chromium-synthetic`；通过后再同步正式仓库，使两个仓库的 CI 资产和版本一致。

## 本地回归结果
- Full Node：1036/1036 PASS。
- Round141 静态契约：5/5 PASS。
- Round141 等价系统 Chromium：320 / 390 / 1440px，compact / standard / relaxed 共 9 个几何场景 PASS；三种宽度的长技能续页均 PASS。
- Round285 计划默认具体时间：72/72 PASS，覆盖 320、375、390、430、768、1024、1280、1440px。
- Production preflight：PASS。
- 两份 Actions YAML：2/2 可解析。

GitHub Actions 线上 `chromium-synthetic` 尚未在 Stage114 包上传后重新执行，所以当前状态仍是候选，不把本地结果冒充线上绿灯。
