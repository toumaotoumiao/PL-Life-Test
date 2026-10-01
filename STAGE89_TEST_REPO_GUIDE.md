# Stage89 测试仓库同步说明

当前产品版本：v8.1.12.267 / schema26。

1. 用 `Stage89_测试仓库完整同步包.zip` 覆盖 `PL-Life-Test`。
2. Commit / Push origin。
3. 等待 Synthetic 与 Native ZIP restore gate。
4. 手机只针对性确认规则菜单：按钮仍可见、面板在按钮下方、同按钮/点击外部可关闭、低空间下可滚动使用。
5. 两条 CI 与手机确认通过后，不再开新测试轮；使用 `Stage89_正式仓库完整同步包.zip` 覆盖正式 `PL-Life`。

正式仓库包不要上传到测试仓库后再二次人工删文件；它应由发布构建器直接生成。
