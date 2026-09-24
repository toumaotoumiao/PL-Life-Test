PL-Life-Test v8.1.12.161 关键三文件修复包

用途：当前测试站出现 v160 index.html + v160 sw.js + v161 runtime-environment.js 的混合部署时使用。

请只覆盖测试仓库根目录中的：
1. index.html
2. sw.js
3. runtime-environment.js

不要上传到正式站 PL-Life。
覆盖后 Commit / Push，等待 GitHub Pages deployment 结束，再运行 Stage18。
