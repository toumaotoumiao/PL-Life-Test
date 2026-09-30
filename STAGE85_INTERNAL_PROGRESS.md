# Stage85 RC2 Internal Progress
Version: v8.1.12.265 / schema26

## 关键路径现状
- v264 在线 Round187：22 项通过后在 reload-canonical 失败。
- 在线诊断：`Cannot access 'settings' before initialization`。
- 档案手工水合证据一致，附件哈希一致；问题属于启动期全局状态 TDZ。

## RC2 实际完成
1. canonicalModuleFromRuntime 改为显式 sourceSettings，无全局 settings 隐式依赖。
2. hydrateCanonicalArchive 传 st.moduleArchive；运行期路径传 settings.moduleArchive。
3. Round146 动态 fixture 删除全局 settings 后仍通过。
4. 新增 Round260 防回归；两份 CI 同步。
5. v8.1.12.265 + Service Worker cache 同步；v264 历史记录不改写。

## 本地证据
- Node 927/927
- Round146/184/260 14/14
- D&D private 17/17
- Round251 attestation 21/21
- YAML parse PASS

## 仍未完成
- v265 GitHub synthetic browser 在线复验。
- v265 GitHub isolated native ZIP restore 同提交 PASS。
- Excel/WPS 实机。
- Windows/手机真实设备验收。
