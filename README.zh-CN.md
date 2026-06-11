<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/images/logo/logo-dark.svg?v=2">
  <source media="(prefers-color-scheme: light)" srcset="docs/images/logo/logo-light.svg?v=2">
  <img alt="fireworks-design logo" src="docs/images/logo/logo-light.svg?v=2" width="560">
</picture>

# fireworks-design

**开源的 Claude Code 工作流,复刻 ClaudeDesign —— 并行铺开多种独立设计方向、像评审团一样打分、融合最优、再对抗式打磨,稳定产出世界级前端页面。**

[简体中文](./README.zh-CN.md) · [English](./README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-7c3aed.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/平台-Claude%20Code-1d4ed8.svg)](https://claude.com/claude-code)
[![Workflow](https://img.shields.io/badge/类型-工作流-f97316.svg)](https://claude.com/claude-code)
[![Model](https://img.shields.io/badge/模型-任意-10b981.svg)](#-模型选择)
[![PRs Welcome](https://img.shields.io/badge/PR-欢迎-eab308.svg)](./CONTRIBUTING.md)

</div>

---

> **一句话简介:** 别再把质量赌在单次模型输出上。`fireworks-design` 并行探索 6–8 种独立美学、从 6 个设计维度给每条打分、把最优者嫁接融合,再用"评审↔修复"循环打磨到可交付。

![六阶段流水线](./docs/images/pipeline.svg)

## ✨ 为什么会有这个项目

即使是经验丰富的设计师也只能克制地探索——很少有时间做十几个方向。引自 [Claude Design 官方公告](https://www.anthropic.com/news/claude-design-anthropic-labs):

> *"即使是经验丰富的设计师也只能克制地探索——很少有时间做十几个方向,所以你只能做那么几个。"*

单次 LLM 生成本质是**从分布里抽一次签**,它的品味、当下倾向、prompt 解读都锁死在那一版里。`fireworks-design` 把这种方差变成**质量下限的保证**:

- **广度探索** —— N 个 agent 并行,各自死磕一种独立美学。
- **独立评审** —— 评审团从不同设计维度给每条方向打分。
- **融合升华** —— 以冠军为骨架,嫁接其余方向的亮点。
- **对抗打磨** —— 评审 → 修复,循环到过线为止。

## 🧠 工作原理 —— 六个阶段

### ① Brief · 提炼设计系统
一个 agent 把你的 `prompt`(+ 可选 `brand`)压成共享创意 brief:产品定位、受众、必要章节,以及具体的**设计令牌**(字体配对、调色板 hex、基调、参考)。这些令牌会注入之后每一个 agent,保证整条流水线品牌一致。

### ② Diverge · 广度探索 *(质量核心)*
每个 agent 全身心投入一种美学,产出完整、自包含的 HTML 文件。生成器内部先**拟方案 → 自我批判一次 → 再产出**,而不是直接吐初稿。

![Diverge 扇出](./docs/images/diverge.svg)

### ③ Judge · 评审面板
每个方向 × 每个设计维度,由独立评审打 1–10 分(6 个方向约 36 路并行)。每条评审还会给出**最高杠杆的修复建议**,直接喂给下一阶段。

![评审矩阵](./docs/images/judge.svg)

### ④ Synthesize · 融合升华
读 Top-3 方向的源码,以最强者为骨架,嫁接其余亮点,并修掉评委所有 flagged 的问题。产出必须明确超越任何单方向。

### ⑤ Refine · 对抗式打磨
狠辣评审返回带严重度的优先级问题清单,修复 agent 精准施治。循环 `refineRounds` 次(默认 2)。这就是 ClaudeDesign "fine-grained controls" 的工程化。

![Refine 循环](./docs/images/refine.svg)

### ⑥ Polish · 终检出图
最后一道闸门,逐项核查并修:响应式(375/768/1280+)、所有交互态、`prefers-reduced-motion`、语义化 HTML + ARIA、WCAG AA 对比度、无控制台报错、无残留占位 —— 然后写出 `final.html`。

## 📦 安装

`fireworks-design` 是单文件的 **Claude Code 工作流**。放进你项目的工作流目录即可:

```bash
# 在项目根目录(运行 `claude` 的那个目录)执行
mkdir -p .claude/workflows
curl -fsSL -o .claude/workflows/fireworks-design.js \
  https://raw.githubusercontent.com/yizhiyanhua-ai/fireworks-design/main/fireworks-design.js
```

或克隆后复制:

```bash
git clone https://github.com/yizhiyanhua-ai/fireworks-design.git
cp fireworks-design/fireworks-design.js .claude/workflows/
```

完成。它会成为一个**命名工作流** —— 在任意 Claude Code 会话里用 `Workflow` 工具调用。

## 🚀 使用

在 Claude Code 里调用(工作流后台运行,用 `/workflows` 看实时进度):

```
Workflow({
  name: "fireworks-design",
  args: {
    prompt: "AI 笔记应用落地页 —— 隐私优先、秒级检索,面向独立开发者",
    outputDir: "/绝对路径/输出目录",   // 必填:绝对路径
    variants: 6,        // 探索方向数(默认 6,最多 8)
    refineRounds: 2,    // 评审-修复轮数(默认 2)
    brand: "可选:品牌色 #7c3aed,字体 Inter"  // 可选
  }
})
```

**产出:**
- `<outputDir>/final.html` —— 最终成品
- `<outputDir>/draft-*.html` —— 全部探索方向(可单独取用)
- 返回:胜出风格、完整排名、所有方向路径、polish 总结

## 💼 使用案例

> 📖 **真实生成成品**(非假设)在 [`examples/`](./examples/README.md) —— 三张完整页面由真实工作流跑出,含胜出风格、agent/token 成本、以及每个流水线阶段修了什么。

### 案例 1 —— SaaS 落地页
```
prompt: "开源向量数据库 'Vector' 的定价+落地页。面向开发者,
         强调速度基准、代码块 hero、清爽的对比表。"
variants: 6, refineRounds: 2
```
预期:带真实代码片段的磁性 hero、基准数据条、精修的三档定价块,并已校验响应式与对比度。

### 案例 2 —— 开源项目主页
```
prompt: "MIT 协议 CLI 工具 'tideline' 的主页。气质:极客、精准、快。
         含安装命令、3 张特性卡、终端风格 demo。"
brand: "偏等宽字体,强调色 #10b981,深色 hero"
variants: 4, refineRounds: 2
```
开发者气质页面:可一键复制的安装行、等宽字体点缀、尊重 `prefers-reduced-motion` 的伪终端动画。

### 案例 3 —— 个人作品集
```
prompt: "产品设计师的作品集单页。不对称编辑式布局,
         大字号、精选作品网格、联系 CTA。"
variants: 8, refineRounds: 3
```
最大探索量 —— 八种方向(Editorial / Swiss Minimal / Dark Premium / Brutalist…)评审融合,三轮打磨排版。

### 案例 4 —— 营销单页
```
prompt: "一天 AI 大会的活动落地页。醒目倒计时 hero、
         讲者网格、日程时间线、报名 CTA。"
brand: "品牌色 #ea580c"
variants: 6, refineRounds: 2
```

<details>
<summary><b>更多快速配方</b></summary>

| 目标 | 建议参数 |
|------|----------|
| 快速初版 | `variants: 4, refineRounds: 1` |
| 极致质量 | `variants: 8, refineRounds: 3` |
| 锁定品牌 | 用 `brand:` 传 hex + 字体 |
| 只要特定风格 | `lenses: ["editorial","dark-premium"]` |

</details>

## ⚙️ 参数

| 参数 | 必填 | 默认 | 说明 |
|------|:----:|:----:|------|
| `prompt` | ✅ | — | 要做什么(自然语言)。 |
| `outputDir` | ✅ | — | 写文件的绝对路径。 |
| `variants` | ❌ | `6` | 探索方向数(3–8)。 |
| `refineRounds` | ❌ | `2` | 评审-修复循环轮数。 |
| `brand` | ❌ | — | 品牌说明 / 现有设计系统 / 参考。 |
| `lenses` | ❌ | 全部 | 按 key 限定特定美学风格。 |

## 🎚️ 可定制项

### 美学风格(`LENSES`)
阶段 ② 探索的独立方向。编辑 `LENSES` 数组加入你自己的风格:

| Key | 风格 |
|-----|------|
| `editorial` | Bold Editorial —— 高对比、表现力强的展示字体、杂志网格 |
| `minimal` | Swiss Minimal —— 网格至上、克制、Inter/Geist |
| `gradient` | Vibrant Gradient —— 网格渐变、玻璃拟态、霓虹点缀 |
| `dark-premium` | Dark Premium —— 近黑画布、金/紫强调、电影感 |
| `organic` | Soft Organic —— 圆角形态、暖色调、亲和动效 |
| `brutalist` | Neo-Brutalist —— 裸边、硬阴影、等宽、高能 |
| `glass` | Glass Aurora —— 半透明层、极光光斑、背景模糊 |
| `mono-tech` | Mono Tech —— 等宽点缀、终端/数据导向 |

### 评审维度(`DIMS`)
评审团打分的维度:层级 · 排版 · 配色/对比 · 动效 · 工程工艺 · 惊艳度/原创性。

### 🤖 模型选择
每个 `agent()` 调用**都省略 `model` 参数**,所有子 agent 继承**当前会话模型**。想要顶级质量用 Opus、要速度用 Sonnet、或用你环境里的任意模型 —— 无需改代码。

## 🔗 与 ClaudeDesign 原理对照

| ClaudeDesign 原理 | 本工作流 |
|------------------|----------|
| 广度探索(十几个方向) | ② Diverge —— 6–8 路并行美学 |
| 最强视觉模型判断 | ③ Judge —— 6 维 × N 方向 |
| 提炼并融合最佳 | ④ Synthesize —— Top3 嫁接 |
| 细粒度控制反复打磨 | ⑤ Refine —— 评审↔修复循环 |
| 设计系统贯穿始终 | ① Brief —— 令牌注入每个 agent |
| 导出可交付 HTML | ⑥ Polish —— QA → `final.html` |

## 💰 成本与注意事项

- 6 方向 × 全流程 ≈ **40+ 次 agent 调用**。这是有意为之 —— 质量就是目的。
- Token 成本随 `variants`、`refineRounds`、页面复杂度上升。
- 评审/融合阶段 agent 会读完整 HTML,超长页面成本更高。
- 想要预算自适应?可把 `VARIANT_COUNT` 绑到 `budget.total`(工作流暴露了 `budget`)。

## ❓ 常见问题

**需要特定模型吗?** 不需要。它继承你的会话模型。强模型(Opus 级)效果最好。

**能只用一个方向吗?** 那就不需要这个工作流了 —— 直接走普通的前端设计流程。本项目的价值就在于并行探索 + 评审。

**草稿文件放哪?** 在你的 `outputDir` 里。不会被提交(见 `.gitignore`),可自由保留或删除。

**能接入我的设计系统吗?** 能 —— 通过 `brand` 传入。Brief 会把你的令牌揉进每个 agent。

## 🤝 贡献

欢迎贡献 —— 新美学风格、评审维度、或更聪明的融合策略。先开 issue 讨论范围。见 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 📄 许可证

[MIT](./LICENSE) © yizhiyanhua-ai

---

<div align="center">

<sub>用 Claude Code 构建 · 质量是唯一重要的事。</sub>

**[📖 English](./README.md)**

</div>
