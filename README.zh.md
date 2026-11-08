# 经营分析专家 · DSH 插件（方案 A）

把一张收银明细表，变成店长第二天早上能照着做的几件事。

这是 WorkBuddy 专家包 `canyin-storeops-analyst` 的 DSH 移植版：

- **两个技能**：`store-ops-analyst`（判断口径与结论）、`store-ops-workbench`（交付与解读看板）；
- **一个入口**：对话输入框旁的「经营看板」按钮，点开即是单文件看板；
- **数据本地**：看板是零依赖单文件 HTML，导入的 Excel 只在浏览器里算，不上传、不联网。

## 安装

市场收录后，在「设置 → 插件市场」搜索「经营分析专家」安装。

本地开发安装（当前 profile）：

```bash
dsh plugin --profile <profile> add <本目录绝对路径>
```

或在 DSH 桌面端「设置 → 插件」里选择本目录安装。安装后无需重启即可生效（客户端入口会热加载）。

## 使用

1. 点输入框旁的「经营看板」，打开看板（首次是三家虚构门店的示例数据）；
2. 看板「数据」页 →「导入我自己的收银明细」，选 xlsx / csv（可多选）；
3. 先看「对账体检」，金额三项必须 0 误差；
4. 回「经营」页设目标，看差距、归因、行动；
5. 直接问 Agent：「我这个月流水涨了但到手少了，帮我看看钱漏在哪」，它会调用本插件的技能。

## 看板说明

- 单文件、零依赖，双击浏览器即可打开；
- 内置示例数据：望江路店 / 星河广场店 / 大学城店，2026 年 10 月，约 2.5 万单；
- 导入自己的收银明细后自动替换示例数据；
- 聚合结果存浏览器本地（约 4.2MB 上限），换电脑需重新导入。

## 边界（与专家人设一致）

- 没有成本 / 人工 / 租金 / 水电字段：算不了毛利、净利、人效、坪效；
- 只有一个月数据：不做同比；
- 只有成交客流：算不了进店转化率；
- 不编数字、不承诺提升幅度。

## 目录

```
.
├─ index.js             # 宿主侧：注册两个 bundled 技能
├─ client.js            # 客户端：对话 dock 的「经营看板」按钮（内嵌看板）
├─ cordis.patch.yml     # bundle 补丁
├─ assets/
│  ├─ SKILL-analyst.md
│  ├─ SKILL-workbench.md
│  ├─ store-ops-dashboard.html
│  ├─ references/{metrics,data-import,diagnosis-playbook}.md
│  ├─ agent-profile.md
│  └─ expert.jpg
└─ icon.svg
```

## 开发

- 改技能内容：编辑 `assets/SKILL-*.md` 与 `assets/references/*.md`，重装插件生效；
- 改看板：替换 `assets/store-ops-dashboard.html`，并重新生成 `client.js` 中内嵌的副本（构建脚本在开发工作区，不在本包内）；
- 版本：`package.json` 的 `version` 与市场条目保持同步。

## License

MIT（看板与专家内容由作者提供）。
