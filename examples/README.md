# Examples

Real output from `fireworks-design` — every page below was produced by an **actual workflow run**: parallel direction exploration → panel judging → synthesis → adversarial refine → polish. No hand-editing after the pipeline (except `designer-portfolio`, which got a documented enrichment pass).

> The `draft-*.html` files each run also generates are intentionally **not** committed — only the final synthesized page is kept, so the repo stays lean. Run the workflow locally to see all directions.

## All 14 examples

| # | Example | Type | Var | Winner (aesthetic) | Agents | View |
|:-:|---------|------|:---:|--------------------|:------:|------|
| 1 | 🎬 `movie-rating-platform` | Movie rating/discovery | 6 | Dark Premium (7.33) | 49 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/movie-rating-platform/final.html) · [src](./movie-rating-platform/final.html) |
| 2 | 🍽️ `restaurant-fine-dining` | Fine dining | 4 | Dark Premium (7.50) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/restaurant-fine-dining/final.html) · [src](./restaurant-fine-dining/final.html) |
| 3 | 🎨 `creative-agency` | Design studio | 4 | Bold Editorial (7.67) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/creative-agency/final.html) · [src](./creative-agency/final.html) |
| 4 | 🎵 `music-album` | Album release | 4 | Bold Editorial (7.17) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/music-album/final.html) · [src](./music-album/final.html) |
| 5 | 💪 `fitness-app` | Fitness SaaS | 4 | Swiss Minimal (7.50) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/fitness-app/final.html) · [src](./fitness-app/final.html) |
| 6 | ✈️ `travel-destination` | Travel guide | 4 | Bold Editorial (7.33) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/travel-destination/final.html) · [src](./travel-destination/final.html) |
| 7 | 📚 `edtech-course` | Online courses | 4 | Swiss Minimal (7.50) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/edtech-course/final.html) · [src](./edtech-course/final.html) |
| 8 | 🎮 `game-launch` | AAA game promo | 4 | Bold Editorial (7.17) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/game-launch/final.html) · [src](./game-launch/final.html) |
| 9 | 🤝 `nonprofit-cause` | Charity | 4 | Editorial (7.00) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/nonprofit-cause/final.html) · [src](./nonprofit-cause/final.html) |
| 10 | 🛒 `ecommerce-product` | Product page | 4 | Dark Premium (7.50) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/ecommerce-product/final.html) · [src](./ecommerce-product/final.html) |
| 11 | 🎤 `tech-conference` | Dev conference | 4 | Bold Editorial (7.00) | 29 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/tech-conference/final.html) · [src](./tech-conference/final.html) |
| 12 | 🗄️ `saas-vector-db` | SaaS landing | 6 | Bold Editorial (7.17) | 49 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/saas-vector-db/final.html) · [src](./saas-vector-db/final.html) |
| 13 | ⌨️ `oss-cli-homepage` | OSS homepage | 4 | Bold Editorial (7.17) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/oss-cli-homepage/final.html) · [src](./oss-cli-homepage/final.html) |
| 14 | 🖼️ `designer-portfolio` | Portfolio | 4 | Bold Editorial (7.67) | 35 | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/designer-portfolio/final.html) · [src](./designer-portfolio/final.html) |

**Winner distribution across 14 briefs:** Bold Editorial ×8 · Dark Premium ×3 (movie, restaurant, ecommerce) · Swiss Minimal ×2 (fitness, edtech) · Editorial ×1 (nonprofit). Different briefs crown different winners — that's the point of judging instead of generating once.

---

## ✨ Featured — 效果解读 (effect deep-dives)

Four runs picked for range, each unpacked: the winning aesthetic and *why it fit*, the signature moment, and a real defect the refine/polish pass caught.

### 🎬 `movie-rating-platform` — *LUMIÈRE* → [live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/movie-rating-platform/final.html)
- **Won with: Dark Premium.** The brief demanded theatrical immersion; the "70mm screening room the instant the lights drop" lens beat editorial here. Near-black canvas, antique gold `#d4a24a` rationed as a **strict prestige currency** — only ratings, the active genre, the primary CTA, and the top-2 rank numerals ever earn it.
- **Signature moment:** a one-shot gold **projector-beam light-sweep** (`mix-blend-mode: screen`) crosses the hero **9.2** score on first reveal — it only ever *adds light*, so the score keeps its "single brightest element" status. Disabled under reduced motion.
- **What refine caught:** a **critical JS bug** — the mobile menu hamburger never became an ✕ because Lucide re-renders detached the saved icon node; replaced with a `setToggleIcon()` rebuild. Plus dynamic `aria-label` ("Open/Close…").
- **Why it works:** the gold-rationing discipline is the whole design thesis — restraint is what reads as "premium cinema" instead of "streaming app."

### 🎵 `music-album` — *NOVA · AURORA* → [live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/music-album/final.html)
- **Won with: Bold Editorial** — oversized Didone 'AURORA' wordmark as the single dominant element, asymmetric 7/5 grid, midnight-violet-teal palette at strict 60/30/10.
- **Signature moment:** the most technically rich page in the set — a **generative album cover**, **mouse-stirred per-character title glow** (with a coarse-pointer "breathe" fallback), a **32-bar state-aware visualizer**, and 3D parallax cover. When playing, the whole hero's conic aura blooms warmer.
- **What refine caught:** **5 dead anchor links** (tour rows pointed to non-existent `#tickets-{city}` targets) repointed to the real `#tour`; a no-op `inert` fallback rewritten to actually save/restore tabindex on legacy browsers.
- **Why it works:** the play state changes the *whole room*, not just a button — keyboard/mobile users get the same "music is on" cue as mouse users.

### 🎨 `creative-agency` — *OBJECT & ECHO* → [live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/creative-agency/final.html)
- **Won with: Bold Editorial** — gallery-catalog-meets-zine. Ink-black stage, surgical acid-green signal, oversized kinetic grotesque (Archivo) as the "object" colliding with ghosted humanist italic serif (Fraunces) as the "echo."
- **Signature moment:** the hero **afterimage** — rebuilt as a genuine *spatial echo* (vertically-displaced acid-stroked ghost behind the wordmark) so the object/echo duality is felt in one glance; pure vertical transform so it can never cause horizontal scroll.
- **What refine caught:** **43px mobile horizontal scroll** from the footer email CTA overflowing 375px (rewrote with `clamp` + `break-all`); screen readers reading client names twice (duplicate marquee tracks lacked `aria-hidden` → fixed + added an sr-only roster).
- **Why it works:** Awwwards-site-of-the-day energy from real art direction (type collision, voids, one acid signal), not decoration.

### ✈️ `travel-destination` — *AZORES* → [live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/travel-destination/final.html)
- **Won with: Bold Editorial** — photography-as-product, oversized Playfair, asymmetric grid, "National Geographic meets Cereal" gravitas.
- **Signature moment:** an **interactive islands map** — selecting an island triggers a slow **breathing gold halo** on its dot + a **cross-fade transition** (6px rise → settle) on the detail panel, so each selection animates in instead of snapping. All nullified under reduced motion.
- **What refine caught:** **invalid Tailwind classes** `w-4.5 h-4.5` (4.5 isn't in the default scale) silently rendering icons at 24px instead of 18px → fixed with arbitrary `w-[18px]`; dead `href="#"` footer links pointed to real sections.
- **Why it works:** the map turns a static destination page into an explore-able object — the signature interaction earns the "premium guide" claim.

---

## 🎨 Style Study — 10 styles × 10 themes

Each of the 10 newer aesthetics, run as a single-lens showcase paired with a domain that fits it. Same workflow, one direction, full refine + polish.

<table>
  <tr>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/synthwave/final.html"><img src="../docs/images/style-study/synthwave.png" width="100%"></a><br><sub><b>PIXEL DIVE</b><br>arcade bar · synthwave</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/bauhaus/final.html"><img src="../docs/images/style-study/bauhaus.png" width="100%"></a><br><sub><b>FORM & FUNCTION</b><br>design academy · bauhaus</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/art-deco/final.html"><img src="../docs/images/style-study/art-deco.png" width="100%"></a><br><sub><b>THE GILDED HOUR</b><br>speakeasy · art deco</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/memphis/final.html"><img src="../docs/images/style-study/memphis.png" width="100%"></a><br><sub><b>RIOT DECK</b><br>card game · memphis</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/risograph/final.html"><img src="../docs/images/style-study/risograph.png" width="100%"></a><br><sub><b>INK & PAPER</b><br>zine & print · riso</sub></td>
  </tr>
  <tr>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/scandi/final.html"><img src="../docs/images/style-study/scandi.png" width="100%"></a><br><sub><b>HYGGE & CO</b><br>home goods · scandi</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/holographic/final.html"><img src="../docs/images/style-study/holographic.png" width="100%"></a><br><sub><b>PRISM</b><br>cosmetics · holographic</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/couture/final.html"><img src="../docs/images/style-study/couture.png" width="100%"></a><br><sub><b>VESPER</b><br>courture · A/W</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/punk-zine/final.html"><img src="../docs/images/style-study/punk-zine.png" width="100%"></a><br><sub><b>BLACKOUT</b><br>punk band · zine</sub></td>
    <td width="20%" align="center" valign="bottom"><a href="https://yizhiyanhua-ai.github.io/fireworks-design/examples/style-study/claymorphism/final.html"><img src="../docs/images/style-study/claymorphism.png" width="100%"></a><br><sub><b>BLOOM</b><br>kids app · clay</sub></td>
  </tr>
</table>

| Style | Theme | Domain | Winner score |
|-------|-------|--------|:------------:|
| `synthwave` | PIXEL DIVE | Retro arcade & bar | 7.17 |
| `bauhaus` | FORM & FUNCTION | Design academy / exhibition | 6.83 |
| `art-deco` | THE GILDED HOUR | 1920s speakeasy | 6.83 |
| `memphis` | RIOT DECK | Party card game | 6.33 |
| `risograph` | INK & PAPER | Indie zine & print studio | 6.83 |
| `scandi` | HYGGE & CO | Scandinavian home goods | 6.83 |
| `holographic` | PRISM | Holographic cosmetics | 7.33 |
| `couture` | VESPER | Couture fashion A/W | 7.17 |
| `punk-zine` | BLACKOUT | Punk band tour + record | 6.67 |
| `claymorphism` | BLOOM | Kids' learning app | 6.83 |

---

## How to view

**Live (rendered) on GitHub Pages:** <https://yizhiyanhua-ai.github.io/fireworks-design/> — landing page links to all 14. Or open any file directly, e.g. `…/examples/movie-rating-platform/final.html`.

Locally:
```bash
open examples/movie-rating-platform/final.html
# or serve the whole set
python3 -m http.server 8000   # → localhost:8000/examples/...
```

## What the pipeline contributed (condensed)

The **polish** phase consistently caught high-value defects no single-pass generator would: WCAG AA contrast failures (oss, edtech, ecommerce, tech-conference), broken `href="#"` / dead anchor targets (saas, music, travel, edtech), invalid utility classes that silently failed (travel), and real JS bugs (movie menu icon, music `inert` fallback). The **refine** loops elevated each page's signature moment. Every page ships verified responsive (375/768/1280+), `prefers-reduced-motion`-safe, and AA-contrast — checked in headless Chromium by the polish agent.

## Reproduce

```js
Workflow({
  scriptPath: ".claude/workflows/fireworks-design.js",   // or name: "fireworks-design"
  args: {
    prompt: "<one of the briefs above, or your own>",
    outputDir: "<absolute path>",
    variants: 4,        // 4–6 is the sweet spot; flagship runs used 6
    refineRounds: 2
  }
})
```

> **Rate-limit note:** all runs were executed **sequentially / 2-at-a-time, never 3+ concurrent.** Running multiple `fireworks-design` workflows in parallel can trip provider rate limits (each run spawns ~30–50 agents). The workflow now retries rate-limited agents automatically, but serializing heavy runs is the safe default.
