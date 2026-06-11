# Examples

Real output from `fireworks-design` — each page below was produced by an **actual workflow run**: parallel direction exploration → panel judging → synthesis → adversarial refine → polish.

> The `draft-*.html` files each run also generates (the explored directions) are intentionally **not** committed — they're intermediate artifacts. Only the final synthesized page is kept here, so the repo stays lean. Run the workflow locally to see all directions.

## Showcase

| Example | Brief | Variants | Winner (aesthetic) | Agents | Tokens | View |
|---------|-------|:--------:|--------------------|:------:|:------:|------|
| 🎬 **Movie platform** — `movie-rating-platform` | *LUMIÈRE*: cinematic movie rating/discovery — full-bleed hero w/ 9.2 score, Trending Now row, Top Rated chart, genre filters, critic quote | 6 | Dark Premium (tie @ 7.33) | 49 | ~1.58M | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/movie-rating-platform/final.html) · [src](./movie-rating-platform/final.html) |
| **SaaS landing** — `saas-vector-db` | Vector DB for AI workloads: hero, benchmark stat strip, Python snippet, features, 3-tier pricing | 6 | Bold Editorial (tie @ 7.17) | 49 | ~1.7M | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/saas-vector-db/final.html) · [src](./saas-vector-db/final.html) |
| **OSS homepage** — `oss-cli-homepage` | `tideline` CLI: install command + copy button, feature cards, terminal demo | 4 | Bold Editorial (7.17) | 35 | ~1.07M | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/oss-cli-homepage/final.html) · [src](./oss-cli-homepage/final.html) |
| **Portfolio** — `designer-portfolio` | Designer portfolio: stat hero, 6-project grid, capabilities, clients, process, testimonials, recognition, footer | 4 | Bold Editorial (7.67) | 35 | ~0.85M | [🌐 live](https://yizhiyanhua-ai.github.io/fireworks-design/examples/designer-portfolio/final.html) · [src](./designer-portfolio/final.html) |

> **Note on "Bold Editorial" winning 3× then Dark Premium taking the movie brief** — not a bug. Each run explores genuinely distinct aesthetics; the winning lens is whichever scored highest *for that brief*. Developer/tool/design-savvy audiences rewarded editorial hierarchy; the cinematic movie brief rewarded theatrical dark restraint. Different briefs crown different winners — that's the whole point of judging instead of picking once.

> 📝 **`designer-portfolio`** was subsequently enriched in a targeted pass (704 → 1,249 lines): sticky nav + scroll progress, a stat-led hero, the work grid upgraded to 6 projects with year/role/impact-on-hover, plus capabilities, clients, process, testimonials, and recognition sections — preserving the original editorial aesthetic.

## How to view

**Live (rendered) on GitHub Pages:**
- 🎬 Movie platform — <https://yizhiyanhua-ai.github.io/fireworks-design/examples/movie-rating-platform/final.html>
- 🌐 SaaS landing — <https://yizhiyanhua-ai.github.io/fireworks-design/examples/saas-vector-db/final.html>
- 🌐 OSS homepage — <https://yizhiyanhua-ai.github.io/fireworks-design/examples/oss-cli-homepage/final.html>
- 🌐 Portfolio — <https://yizhiyanhua-ai.github.io/fireworks-design/examples/designer-portfolio/final.html>
- 🌐 Landing + all links — <https://yizhiyanhua-ai.github.io/fireworks-design/>

These are standalone HTML files (single file, no build). Locally:

```bash
# open directly
open examples/saas-vector-db/final.html

# or serve locally
python3 -m http.server 8000   # then visit localhost:8000/examples/...
```

## What each pipeline stage actually contributed

### `movie-rating-platform` (6 directions — Dark Premium winner)
- **Diverge** produced 6 distinct readings of a cinematic brief: Bold Editorial, Swiss Minimal, Vibrant Gradient (reconciled as ambient aurora glow), Dark Premium, Soft Organic, Neo-Brutalist.
- **Synthesize** built on the Dark Premium "70mm screening room" base — near-black canvas, antique-gold `#d4a24a` rationed exclusively to ratings, the active genre, the primary CTA, and the top-2 rank numerals.
- **Refine × 2** + **Polish** fixed a **critical JS bug**: the mobile menu hamburger never became an X because Lucide detached the saved icon node on first render — replaced with a `setToggleIcon()` rebuild. Added a dynamic `aria-label`, then elevated the signature moment with a one-shot gold projector-beam light-sweep across the hero 9.2 score (disabled under reduced motion).

### `saas-vector-db` (6 directions)
- **Diverge** produced 6 distinct pages: Bold Editorial, Swiss Minimal, Vibrant Gradient, Dark Premium, Soft Organic, Neo-Brutalist.
- **Synthesize** grafted the editorial skeleton with the gradient's ambient motion and the dark-premium restraint.
- **Refine × 2** + **Polish** fixed: a mobile menu that never closed on navigation, double-painted neighbor nodes on the hero vector-space canvas, and stripped **all 11 placeholder `href="#"`** links. Verified in headless Chrome at 375/768/1280 — zero horizontal scroll.

### `oss-cli-homepage` (4 directions)
- **Polish** caught a **WCAG AA contrast failure**: a "decorative-only" dim color was actually applied to readable text in five places — lifted all of them to passing tokens.
- Added a keyboard-accessible skip link, OG/Twitter card meta, an inline-SVG favicon, and a signature "tide-frame" high-water glow with a mobile-only horizontal-scroll cue.

### `designer-portfolio` (4 directions)
- **Polish** found a **ship-blocking a11y bug**: the "Slow Press" card caption rendered light text on the paper background (near-invisible) — reflowed it and baked the dark editorial identity into the thumbnail itself.
- Fixed a **desktop layout collision**: two right-column work cards overlapped by 16px at 1440px+ (asymmetric negative margin exceeded the row gap). Verified zero overlap at 8 breakpoints.

## Reproduce

```js
Workflow({
  scriptPath: ".claude/workflows/fireworks-design.js",   // or name: "fireworks-design"
  args: {
    prompt: "<one of the briefs above, or your own>",
    outputDir: "<absolute path>",
    variants: 6,        // 4–6 is a good range
    refineRounds: 2
  }
})
```

> **Rate-limit note:** these runs were executed **sequentially, not concurrently.** Running multiple `fireworks-design` workflows in parallel can trip provider rate limits (each run spawns 35–50 agents). The workflow now retries rate-limited agents automatically, but serializing heavy runs is the safe default.
