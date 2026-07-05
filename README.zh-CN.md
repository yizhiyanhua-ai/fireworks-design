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
[![Dynamic Workflow](https://img.shields.io/badge/Built%20on-Claude%20Code%20Dynamic%20Workflow-f97316.svg)](#-基于-claude-code-动态工作流dynamic-workflow)
[![Model](https://img.shields.io/badge/模型-任意-10b981.svg)](#-模型选择)
[![PRs Welcome](https://img.shields.io/badge/PR-欢迎-eab308.svg)](./CONTRIBUTING.md)
[![Sponsor](https://img.shields.io/badge/❤️-赞助-eab308.svg)](https://github.com/sponsors/ccc7574)

</div>

---

> **一句话简介:** 别再把质量赌在单次模型输出上。`fireworks-design` 并行探索 6–8 种独立美学、从 6 个设计维度给每条打分、把最优者嫁接融合,再用"评审↔修复"循环打磨到可交付。

![六阶段流水线](./docs/images/pipeline.svg)

## 📦 安装

在 Claude Code 里直接说:

> 把 fireworks-design 装到这个项目,仓库是 `yizhiyanhua-ai/fireworks-design`

Claude 会把工作流放进 `.claude/workflows/`,**并**加一个 `/fireworks-design` 斜杠命令 —— 就装好了。

<details>
<summary><b>想用命令行?</b></summary>

```bash
mkdir -p .claude/workflows .claude/commands
curl -fsSL -o .claude/workflows/fireworks-design.js \
  https://raw.githubusercontent.com/yizhiyanhua-ai/fireworks-design/main/fireworks-design.js
curl -fsSL -o .claude/commands/fireworks-design.md \
  https://raw.githubusercontent.com/yizhiyanhua-ai/fireworks-design/main/.claude/commands/fireworks-design.md
```

</details>

## 🚀 使用

敲斜杠命令,后面跟你的需求:

```
/fireworks-design 给咖啡店做落地页,存到 ~/design/coffee,6 个方向,品牌色 #7c3aed
```

Claude 会在后台自动跑工作流(用 `/workflows` 看实时进度),给你一个成品 `final.html`。也可以直接用自然语言:

> 用 fireworks-design 给一个咖啡店做落地页,存到 `~/design/coffee`

想调参就顺口说 —— `探索 8 个方向、打磨 3 轮、品牌色 #7c3aed`。

**你会得到:** 一个自包含的 `final.html`(外加探索阶段的 `draft-*.html`),以及一份「哪个风格胜出、为什么」的总结。

<details>
<summary><b>想直接手动调用?</b></summary>

```js
Workflow({
  name: "fireworks-design",
  args: { prompt: "...", outputDir: "/绝对路径", variants: 6, refineRounds: 2 }
})
```

`prompt` 和 `outputDir`(绝对路径)必填;`variants`(3–8)、`refineRounds`、`brand`、`lenses` 可选。完整参数见下方「参数」一节。

</details>

## ✨ 精选成品(效果解读)

14 个跨完全不同领域的真实页面 —— [**全部 GitHub Pages 在线**](https://yizhiyanhua-ai.github.io/fireworks-design/) · [完整表格 + 深度解读](./examples/README.md)。四个亮点:

<table>
  <tr>
    <td width="50%" align="center" valign="bottom">
      <a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/movie-rating-platform/final.html">
        <img src="docs/images/examples/movie-rating-platform.png" alt="LUMIÈRE" width="100%">
      </a>
      <sub>🎬 <b>LUMIÈRE</b> — 电影评分 · Dark Premium</sub>
    </td>
    <td width="50%" align="center" valign="bottom">
      <a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/music-album/final.html">
        <img src="docs/images/examples/music-album.png" alt="NOVA · AURORA" width="100%">
      </a>
      <sub>🎵 <b>NOVA · AURORA</b> — 专辑 · Bold Editorial</sub>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center" valign="bottom">
      <a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/creative-agency/final.html">
        <img src="docs/images/examples/creative-agency.png" alt="OBJECT & ECHO" width="100%">
      </a>
      <sub>🎨 <b>OBJECT & ECHO</b> — 工作室 · Bold Editorial</sub>
    </td>
    <td width="50%" align="center" valign="bottom">
      <a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/travel-destination/final.html">
        <img src="docs/images/examples/travel-destination.png" alt="AZORES" width="100%">
      </a>
      <sub>✈️ <b>AZORES</b> — 旅行 · Bold Editorial</sub>
    </td>
  </tr>
</table>

| | 页面 | 胜出风格 & 契合理由 | 签名时刻 |
|---|------|---------------------|----------|
| 🎬 | [**LUMIÈRE**](https://yizhiyanhua-ai.github.io/fireworks-design/examples/movie-rating-platform/final.html) — 电影评分 | **Dark Premium** —— 影院沉浸感胜过编辑式;古金作为"声望货币"严格定量(只给评分/CTA/前两名) | 一次性金色放映机光束扫过 9.2 分 |
| 🎵 | [**NOVA · AURORA**](https://yizhiyanhua-ai.github.io/fireworks-design/examples/music-album/final.html) — 专辑 | **Bold Editorial** —— 超大 Didone 字标,午夜紫青 60/30/10 | 生成式封面 + 32 段可视化器 + 播放时整个房间都变暖 |
| 🎨 | [**OBJECT & ECHO**](https://yizhiyanhua-ai.github.io/fireworks-design/examples/creative-agency/final.html) — 工作室 | **Bold Editorial** —— 画廊杂志风,动感无衬线"物体"对撞幽灵斜体"回声" | hero 字标背后的空间残影回声 |
| ✈️ | [**AZORES**](https://yizhiyanhua-ai.github.io/fireworks-design/examples/travel-destination/final.html) — 旅行 | **Bold Editorial** —— 照片即产品,国家地理 × Cereal 杂志质感 | 可交互岛屿地图 + 呼吸光晕 + 淡入切换详情 |

> **胜出风格的多样性正说明问题:** 14 个 brief 里,Bold Editorial ×8、Dark Premium ×3(电影/餐厅/电商)、Swiss Minimal ×2(健身/教育)、Editorial ×1(公益)。不同气质的 brief 选出不同的最优解 —— 这正是"评审而非一次生成"的价值。完整的 **效果解读**(胜出理由、签名时刻、打磨阶段揪出的真实 bug)在 [`examples/README.md`](./examples/README.md#-featured--效果解读-effect-deep-dives)。

### 🖼️ 全部 14 个在线示例

<table>
  <tr>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/movie-rating-platform/final.html"><img src="docs/images/examples/movie-rating-platform.png" width="100%"></a><br><sub>LUMIÈRE</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/restaurant-fine-dining/final.html"><img src="docs/images/examples/restaurant-fine-dining.png" width="100%"></a><br><sub>MAISON NOIR</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/creative-agency/final.html"><img src="docs/images/examples/creative-agency.png" width="100%"></a><br><sub>OBJECT & ECHO</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/music-album/final.html"><img src="docs/images/examples/music-album.png" width="100%"></a><br><sub>NOVA · AURORA</sub></td>
  </tr>
  <tr>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/fitness-app/final.html"><img src="docs/images/examples/fitness-app.png" width="100%"></a><br><sub>PULSE</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/travel-destination/final.html"><img src="docs/images/examples/travel-destination.png" width="100%"></a><br><sub>AZORES</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/edtech-course/final.html"><img src="docs/images/examples/edtech-course.png" width="100%"></a><br><sub>LUMEN</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/game-launch/final.html"><img src="docs/images/examples/game-launch.png" width="100%"></a><br><sub>ECHOES OF THE VOID</sub></td>
  </tr>
  <tr>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/nonprofit-cause/final.html"><img src="docs/images/examples/nonprofit-cause.png" width="100%"></a><br><sub>Brightwater</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/ecommerce-product/final.html"><img src="docs/images/examples/ecommerce-product.png" width="100%"></a><br><sub>AURA ONE</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/tech-conference/final.html"><img src="docs/images/examples/tech-conference.png" width="100%"></a><br><sub>BUILD/2026</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/saas-vector-db/final.html"><img src="docs/images/examples/saas-vector-db.png" width="100%"></a><br><sub>vector</sub></td>
  </tr>
  <tr>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/oss-cli-homepage/final.html"><img src="docs/images/examples/oss-cli-homepage.png" width="100%"></a><br><sub>tideline</sub></td>
    <td width="25%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/designer-portfolio/final.html"><img src="docs/images/examples/designer-portfolio.png" width="100%"></a><br><sub>Lin Hua</sub></td>
    <td width="25%"></td>
    <td width="25%"></td>
  </tr>
</table>

## 🎨 风格研究 —— 10 种风格 × 10 个主题

10 个新风格,每个配一个贴合它气质的领域(复古街机酒吧、1920s 地下酒吧、高定时装、朋克乐队巡演、儿童学习 App……)。同一套工作流,单风格定向产出。

<table>
  <tr>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/synthwave/final.html"><img src="docs/images/style-study/synthwave.png" width="100%"></a><br><sub>PIXEL DIVE · synthwave</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/bauhaus/final.html"><img src="docs/images/style-study/bauhaus.png" width="100%"></a><br><sub>FORM & FUNCTION · bauhaus</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/art-deco/final.html"><img src="docs/images/style-study/art-deco.png" width="100%"></a><br><sub>THE GILDED HOUR · art deco</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/memphis/final.html"><img src="docs/images/style-study/memphis.png" width="100%"></a><br><sub>RIOT DECK · memphis</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/risograph/final.html"><img src="docs/images/style-study/risograph.png" width="100%"></a><br><sub>INK & PAPER · riso</sub></td>
  </tr>
  <tr>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/scandi/final.html"><img src="docs/images/style-study/scandi.png" width="100%"></a><br><sub>HYGGE & CO · scandi</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/holographic/final.html"><img src="docs/images/style-study/holographic.png" width="100%"></a><br><sub>PRISM · holographic</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/couture/final.html"><img src="docs/images/style-study/couture.png" width="100%"></a><br><sub>VESPER · couture</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/punk-zine/final.html"><img src="docs/images/style-study/punk-zine.png" width="100%"></a><br><sub>BLACKOUT · punk zine</sub></td>
    <td width="20%" align="center"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/claymorphism/final.html"><img src="docs/images/style-study/claymorphism.png" width="100%"></a><br><sub>BLOOM · claymorphism</sub></td>
  </tr>
</table>

→ 完整表格 + 每个风格的细节见 [`examples/README.md`](./examples/README.md#-style-study--10-styles--10-themes)。

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

## ✨ 为什么会有这个项目

即使是经验丰富的设计师也只能克制地探索——很少有时间做十几个方向。引自 [Claude Design 官方公告](https://www.anthropic.com/news/claude-design-anthropic-labs):

> *"即使是经验丰富的设计师也只能克制地探索——很少有时间做十几个方向,所以你只能做那么几个。"*

单次 LLM 生成本质是**从分布里抽一次签**,它的品味、当下倾向、prompt 解读都锁死在那一版里。`fireworks-design` 把这种方差变成**质量下限的保证**:

- **广度探索** —— N 个 agent 并行,各自死磕一种独立美学。
- **独立评审** —— 评审团从不同设计维度给每条方向打分。
- **融合升华** —— 以冠军为骨架,嫁接其余方向的亮点。
- **对抗打磨** —— 评审 → 修复,循环到过线为止。

---

## 🧩 基于 Claude Code 动态工作流(Dynamic Workflow)

`fireworks-design` **不是**一段 prompt、一个库,也不是托管服务。它是一个**由 Claude Code Workflow 运行时执行的 JavaScript 文件——即 *Dynamic Workflow***:确定性的代码去派生模型 agent、并行运行它们、再组合其 schema 校验后的输出。控制流属于脚本(循环、扇出、屏障),而非模型,因此每次运行都可复现、可恢复。你带模型来,它负责编排。

整条流水线约 270 行,结构一眼可读:

```js
// fireworks-design.js —— 精简到骨架
phase('Brief');    const brief    = await agentRetry(briefPrompt, { schema: BRIEF_SCHEMA })

phase('Diverge');  const variants = await parallel(LENSES.map(l => () =>          // 扇出:N 个方向
                    agent(generate(l), { schema: VARIANT_SCHEMA }))).filter(Boolean)

phase('Judge');    const verdicts = await parallel(variants.flatMap(v =>          // 评审面板:N × 6 维
                    DIMS.map(d => () => agent(judge(v, d), { schema: SCORE_SCHEMA }))))

phase('Synthesize'); await agentRetry(synthesize(top(variants, verdicts)))        // 嫁接最优

for (let i = 0; i < REFINE_ROUNDS; i++) {                                         // 评审 ↔ 修复 循环
  const issues = await agentRetry(critique, { schema: CRITIQUE_SCHEMA })
  await agentRetry(fix(issues))
}

phase('Polish');   await agentRetry(polish)                                       // 出厂 QA
return { outputPath: FINAL_PATH, winner, ranking, summary: polish }
```

让它成为"动态"工作流(而非只是调用模型的脚本)的三点:

- **确定性编排** —— `parallel()` 是真正的屏障,`phase()` 分组实时进度,`for` 循环由你掌控。模型绝不决定下一步跑什么。
- **schema 校验的 agent** —— 每个 `agent()` 返回类型化 JSON,流水线组合的是**数据**,不是散文,无需正则解析模型输出。
- **可恢复** —— 改个 prompt 重跑,未变更的前缀从缓存回放(`resumeFromRunId`)。

完整文件见 [`fireworks-design.js`](./fireworks-design.js)。

## 🔬 技术内核 —— 是编排,不是迭代

这不是"生成一遍,再让同一个模型自己改"的循环。它是一条**确定性多智能体流水线**,把多项最新的推理期(inference-time)技术组合进一次可复现的运行 —— 构建在 Claude Code Workflow 运行时之上(`parallel()` / `pipeline()` / `agent()` 原语、schema 校验返回、可恢复执行)。

| 技术 | 出现在哪 | 为什么重要 |
|------|----------|------------|
| **Best-of-N + 自洽性(self-consistency)** | Diverge → Judge | 生成 N 个方向,保留跨独立评分均分最高者 —— 质量随 N 上升,而非靠运气。 |
| **LLM-as-judge 评审面板** | Judge | 6 维 × N 方向,评审互不可见彼此答案,消除单一评审偏差。 |
| **多样化生成(diverse beams)** | Diverge 各风格 | 每个 agent 钉死一种美学,N 个样本覆盖设计空间,而非聚类在同一想法上。 |
| **批判-修订(Self-Refine / Reflexion)** | Refine | 专职评审输出带严重度的问题,修复 agent 精准施治,循环到过线。 |
| **融合/嫁接** | Synthesize | 冠军做骨架,其余方向捐献亮点 —— 不是均值合并。 |
| **结构化工具调用** | 每个 agent | 返回是 schema 校验的 JSON,确定性组合 —— 不靠脆弱的正则解析模型文本。 |
| **上下文隔离** | 每 agent 独立 | 每个 agent 在自己的上下文里只带必要 token;共享 brief 注入(可缓存),而非反复读取。 |
| **可恢复执行** | 运行时 | `resumeFromRunId` 对未变更前缀回放缓存结果 —— 中途改 prompt 不必重跑整条。 |
| **模型无关** | `agent()` 省略 `model` | 继承会话模型。Opus ↔ Sonnet ↔ 任意模型切换,流水线不变。 |
| **预算/限流感知** | `budget` 全局 + 重试 | fan-out 可随 token 预算缩放;agent 遇 429 自动重试而非崩溃。 |

净效果:你不再指望模型"今天状态好",而是用采样、评审、打磨**工程化出一条质量下限** —— 正是 best-of-N 与 self-consistency 背后的推理期算力扩展(inference-time scaling)思想,用在了设计上。

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
| `synthwave` | Synthwave —— 复古未来霓虹,品红/青、铬、透视网格 |
| `bauhaus` | Bauhaus —— 红黄蓝三原色、几何原语、构成主义 |
| `art-deco` | Art Deco —— 1920s 金黑配色、对称几何装饰、奢华 |
| `memphis` | Memphis 80s —— 彩纸形状、波浪线、后现代玩味 |
| `risograph` | Risograph —— 限色印刷、半调、叠印错位、纸纹 |
| `scandi` | Nordic Scandi —— 浅木色、柔和、北欧 cozy 极简 |
| `holographic` | Holographic —— 全息棱镜铬、光线折射、未来感 |
| `couture` | Fashion Couture —— 满版摄影、极小衬线字标、极致留白 |
| `punk-zine` | Punk Zine —— 影印拼贴、勒索信字体、DIY 叛逆 |
| `claymorphism` | Claymorphism —— 柔和 3D 马卡龙、膨胀圆角、触感深度 |

### 评审维度(`DIMS`)
评审团打分的维度:层级 · 排版 · 配色/对比 · 动效 · 工程工艺 · 惊艳度/原创性。

### 🤖 模型选择
每个 `agent()` 调用**都省略 `model` 参数**,所有子 agent 继承**当前会话模型**。想要顶级质量用 Opus、要速度用 Sonnet、或用你环境里的任意模型 —— 无需改代码。

## 💼 使用案例

几个可试的 prompt(`outputDir` 设为绝对路径):

| 类型 | Prompt | 参数 |
|------|--------|------|
| SaaS 落地页 | 开源向量库的定价+落地页;速度基准、代码 hero、对比表。 | `variants: 6` |
| 开源主页 | MIT CLI 工具;安装命令、3 张特性卡、终端 demo。 | `variants: 4, brand: "等宽, #10b981"` |
| 作品集 | 设计师单页;不对称编辑式、大字号、作品网格。 | `variants: 8, refineRounds: 3` |
| 活动 | 一天 AI 大会;倒计时 hero、讲者、日程、报名。 | `variants: 6, brand: "#ea580c"` |

<details>
<summary><b>更多快速配方</b></summary>

| 目标 | 建议参数 |
|------|----------|
| 快速初版 | `variants: 4, refineRounds: 1` |
| 极致质量 | `variants: 8, refineRounds: 3` |
| 锁定品牌 | 用 `brand:` 传 hex + 字体 |
| 只要特定风格 | `lenses: ["editorial","dark-premium"]` |

</details>

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

## ❤️ 赞助

如果 fireworks-design 帮你交付了更好的页面,[成为赞助者](https://github.com/sponsors/ccc7574) —— 资金用于新增美学风格、更多示例领域、持续打磨。

| 档位 | 金额 | 权益 |
|------|------|------|
| ☕ Backer | $5/月(或一次性) | 名字进 [BACKERS.md](./BACKERS.md) · 新风格抢先体验 |
| 🎯 Studio | $19/月 | + 优先 issue 处理 · 投票决定新风格 |
| 🏛️ Patron | $49/月 | + 每季度 1 个定制风格 · README 里放 logo |

→ **[github.com/sponsors/ccc7574](https://github.com/sponsors/ccc7574)**

## 📄 许可证

[MIT](./LICENSE) © yizhiyanhua-ai

---

<div align="center">

<sub>用 Claude Code 构建 · 质量是唯一重要的事。</sub>

**[📖 English](./README.md)**

</div>
