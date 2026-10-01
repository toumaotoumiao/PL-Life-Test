# Stage90 测试仓库说明

测试站目标版本：v8.1.12.268 / schema26。

将 Stage90 测试仓库完整同步包覆盖到 PL-Life-Test 后提交并 Push。GitHub Actions 应执行现有 Synthetic / Native 门槛，以及新增 Round264 D&D template-filled character-card contract/browser。

重点检查：
- D&D 5e 主按钮显示“导出 D&D 角色 Excel 卡”。
- 选择已核对 21 页模板后，只写六属性，其他 OOXML 内容不丢失。
- 8 页 unpaired-filled 结构拒绝回填。
- 旧 standalone 数据 XLSX 不再作为主 UI 入口。

本包不包含任何用户私人 D&D XLSX。
