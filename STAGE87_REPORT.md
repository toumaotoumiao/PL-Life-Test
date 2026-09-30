# Stage87 报告 · v8.1.12.266

## 问题
手机端 PC 规则选择使用 fixed 面板和固定 top 值。PC 编辑器头部在后续版本已改成两行布局，规则按钮下移，但面板仍从旧的固定高度开始，因此直接覆盖触发按钮；打开后用户无法再次点击原按钮收回。

## 修复
新增统一的移动规则面板锚定器：所有 `details.native-module-rule-menu` 打开后，以当前 summary 的 `getBoundingClientRect().bottom + 8px` 作为 fixed 面板 top，并按剩余视口计算 max-height。点击、details toggle、程序化 open、滚动、resize 与 VisualViewport 变化都会触发同步。

同时给触发按钮设置高于规则面板的移动端层级，作为首帧定位的兜底保护。

修复范围不是只针对 PC：模组规则、开团计划本桌规则、跑团记录本桌规则均采用同一逻辑。

## 验收
- Node：931/931 PASS
- Round261：4/4 契约 PASS
- Round261 真实 Chromium 几何：36/36 PASS
- Round157：90/90 PASS，320/375/390/430/768/1024/1280/1440px
- D&D 私有工具：17/17 PASS
- Actions YAML：2/2 可解析

## 数据边界
未修改 schema26、正式档案数据结构、ZIP 备份格式、D&D/CoC7/Insane 数据内容或原生恢复逻辑。

## 发布状态
Stage85/86 的原生恢复、synthetic 与数据安全 PASS 仍有效，因为本轮只改规则面板布局/定位和对应 CI 契约。v266 需要测试站真实手机做一次规则面板针对性复核后再恢复“手机发布验收通过”状态。
