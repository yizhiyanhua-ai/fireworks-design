export const meta = {
  name: 'fireworks-design',
  description: 'Replicate ClaudeDesign: fan out many distinct frontend directions, judge across design dimensions, synthesize the best, then adversarially refine to a single production-quality page.',
  whenToUse: 'When the user wants a polished, high-quality frontend page/landing/one-pager and explicitly asks for fireworks-design (or wide design exploration at scale).',
  phases: [
    { title: 'Brief', detail: 'distill prompt + brand into a design system' },
    { title: 'Diverge', detail: 'N agents each generate a distinct aesthetic direction' },
    { title: 'Judge', detail: 'panel scores every direction across design dimensions' },
    { title: 'Synthesize', detail: 'graft best of top directions into one refined draft' },
    { title: 'Refine', detail: 'adversarial critique -> fix, looped' },
    { title: 'Polish', detail: 'final QA + accessibility + write the page' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// args: { prompt, brand?, outputDir?, variants?, refineRounds?, lenses? }
//   prompt       — what to build (required)
//   brand        — optional brand notes / existing design system / reference URLs
//   outputDir    — absolute dir to write files (required in practice)
//   variants     — number of directions to explore (default 6, max 8)
//   refineRounds — critique->fix loops (default 2)
// ─────────────────────────────────────────────────────────────────────────────

// Robustly resolve args — tolerate object, JSON string, or undefined.
let _raw = (typeof args !== 'undefined') ? args : undefined
if (typeof _raw === 'string' && _raw.trim()) {
  try { _raw = JSON.parse(_raw) } catch (e) { /* leave as string, handled below */ }
}
const A = (_raw && typeof _raw === 'object' && !Array.isArray(_raw)) ? _raw : {}
const prompt = A.prompt
const outputDir = (A.outputDir || '').replace(/\/$/, '')
if (!prompt || !outputDir) {
  throw new Error('fireworks-design requires args.prompt and args.outputDir (absolute path). Received args of type: ' + typeof _raw + ' — value: ' + JSON.stringify(_raw).slice(0, 200))
}
const VARIANT_COUNT = Math.min(8, Math.max(3, A.variants || 6))
const REFINE_ROUNDS = Math.max(1, A.refineRounds || 2)
const brand = A.brand || ''
const FINAL_PATH = outputDir + '/final.html'

// Distinct aesthetic lenses — the heart of "wide exploration".
const LENSES = [
  { key: 'editorial',    name: 'Bold Editorial',   vibe: 'High-contrast, large expressive display type, magazine-grade hierarchy, generous whitespace, asymmetric editorial grid. Refined serif + clean sans pairing.' },
  { key: 'minimal',      name: 'Swiss Minimal',    vibe: 'Grid-obsessed, restrained palette, Inter/Geist, surgical spacing & rhythm. Restraint as luxury. Every pixel earned.' },
  { key: 'gradient',     name: 'Vibrant Gradient', vibe: 'Mesh gradients, glassmorphism panels, neon/violet accents, playful springy motion. Modern premium SaaS energy.' },
  { key: 'dark-premium', name: 'Dark Premium',     vibe: 'Near-black canvas (#0a0a0f), subtle layered elevation, gold or violet accent, cinematic serif heads, soft glows.' },
  { key: 'organic',      name: 'Soft Organic',     vibe: 'Generous rounded forms, warm palette, friendly micro-copy, springy approachable motion, human & approachable.' },
  { key: 'brutalist',    name: 'Neo-Brutalist',    vibe: 'Raw 1-2px borders, hard offset shadows, monospace accents, bold blocks, high-energy, instantly memorable.' },
  { key: 'glass',        name: 'Glass Aurora',     vibe: 'Translucent frosted layers, animated aurora blobs, backdrop-blur, light text on dark, futuristic calm.' },
  { key: 'mono-tech',    name: 'Mono Tech',        vibe: 'Monospace display accents, terminal/data-forward, precise grids, developer-tool aesthetic, chart and stat heavy.' },
  { key: 'synthwave',    name: 'Synthwave',        vibe: 'Retrofuturist neon: magenta/cyan glow, perspective grid receding to a sunset horizon, chrome type, scanlines, 80s VHS energy on a dark canvas.' },
  { key: 'bauhaus',      name: 'Bauhaus',          vibe: 'Primary red/yellow/blue on off-white, geometric primitives (circle/triangle/bar) as structure, Helvetica/Akzidenz, constructivist grid, form-follows-function rigor.' },
  { key: 'art-deco',     name: 'Art Deco',         vibe: '1920s luxury: gold-on-black or gold-on-cream, symmetrical geometric ornament, slender condensed display serif, sunburst/chevron motifs, opulent restraint.' },
  { key: 'memphis',      name: 'Memphis 80s',      vibe: 'Postmodern playfulness: confetti shapes, squiggles, bold color blocks, mixed patterns, terrazzo, exuberant and irreverent.' },
  { key: 'risograph',    name: 'Risograph',        vibe: 'Limited 2–3 ink print: halftone dots, overprint misregistration, visible paper grain, punchy flat colors that interact where they overlap. Hand-printed warmth.' },
  { key: 'scandi',       name: 'Nordic Scandi',    vibe: 'Calm cozy minimalism: pale wood and muted stone tones, generous light, soft rounded forms, restrained palette, hygge warmth, every object considered.' },
  { key: 'holographic',  name: 'Holographic',      vibe: 'Iridescent prism chrome: shifting holographic gradients, light refraction, iridescent foil, mercurial futuristic surfaces, soft neon pastels.' },
  { key: 'couture',      name: 'Fashion Couture',  vibe: 'Luxury fashion editorial: full-bleed photography, tiny serif wordmark, extreme negative space, high-contrast black/white with one accent, Vogue-grade couture restraint.' },
  { key: 'punk-zine',    name: 'Punk Zine',        vibe: 'DIY cut-and-paste: xeroxed collage, ransom-note typography, masking tape, deliberate misalignment, raw high-contrast B&W with marker accents, rebellious.' },
  { key: 'claymorphism', name: 'Claymorphism',     vibe: 'Soft 3D pastel: rounded inflated shapes, layered soft shadows, matte clay materials, candy pastels, friendly tactile depth.' },
]
const chosen = (A.lenses && Array.isArray(A.lenses) ? LENSES.filter(l => A.lenses.includes(l.key)) : LENSES).slice(0, VARIANT_COUNT)

// Design dimensions the judge panel scores every direction on.
const DIMS = [
  { key: 'hierarchy',  q: 'Visual hierarchy & information architecture: does the eye instantly know where to look? Hero value-prop and primary CTA unmistakable?' },
  { key: 'typography', q: 'Typography: deliberate pairing, well-tuned scale/leading/measure, refined not default. Is the type system intentional?' },
  { key: 'color',      q: 'Color & contrast: coherent palette, purposeful accent, WCAG AA contrast everywhere. No muddy or clashing hues.' },
  { key: 'motion',     q: 'Motion & interactivity: tasteful hover/focus/scroll states, micro-interactions, delight without noise. Honors prefers-reduced-motion.' },
  { key: 'craft',      q: 'Engineering craft: responsive across breakpoints, semantic HTML, ARIA, no broken layout, performant, no console errors.' },
  { key: 'delight',    q: 'Delight & originality: does it feel premium and memorable, or like a generic template? The "wow" factor.' },
]

// ── Schemas ──────────────────────────────────────────────────────────────────
const BRIEF_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['product', 'goal', 'sections', 'designTokens', 'successCriteria'],
  properties: {
    product: { type: 'object', additionalProperties: false, required: ['name', 'oneLiner', 'audience'],
      properties: { name: {type:'string'}, oneLiner:{type:'string'}, audience:{type:'string'} } },
    goal: { type: 'string' },
    sections: { type: 'array', items: { type: 'string' } },
    designTokens: { type: 'object', additionalProperties: false,
      required: ['fonts', 'palette', 'mood', 'references'],
      properties: {
        fonts: { type: 'array', items: { type: 'string' } },
        palette: { type: 'object', additionalProperties: false,
          required: ['primary', 'accent', 'neutral', 'bg', 'text'],
          properties: { primary:{type:'string'}, accent:{type:'string'}, neutral:{type:'string'}, bg:{type:'string'}, text:{type:'string'} } },
        mood: { type: 'string' },
        references: { type: 'array', items: { type: 'string' } },
      } },
    successCriteria: { type: 'array', items: { type: 'string' } },
  },
}
const VARIANT_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['path', 'name', 'lens', 'philosophy', 'highlights'],
  properties: {
    path: { type: 'string' },
    name: { type: 'string' },
    lens: { type: 'string' },
    philosophy: { type: 'string' },
    highlights: { type: 'array', items: { type: 'string' } },
  },
}
const SCORE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['score', 'notes', 'topFix'],
  properties: {
    score: { type: 'integer', minimum: 1, maximum: 10 },
    notes: { type: 'string' },
    topFix: { type: 'string' },
  },
}
const CRITIQUE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['issues', 'priorities'],
  properties: {
    issues: { type: 'array', items: { type: 'object', additionalProperties: false,
      required: ['severity', 'area', 'problem', 'fix'],
      properties: { severity:{type:'string', enum:['critical','major','minor']}, area:{type:'string'}, problem:{type:'string'}, fix:{type:'string'} } } },
    priorities: { type: 'array', items: { type: 'string' } },
  },
}

// ── Prompt builders ───────────────────────────────────────────────────────────
const DESIGN_CONSTITUTION = `You are a world-class product designer + front-end engineer. The ONLY thing that matters is shipping a genuinely premium, memorable page — never a generic template.

HARD REQUIREMENTS (non-negotiable):
- A single self-contained .html file written via the Write tool to the EXACT absolute path given. All CSS/JS inline or via CDN.
- Use Tailwind via CDN (https://cdn.tailwindcss.com) for utilities AND a small <style> block for custom design tokens, fonts, and bespoke details. Configure tailwind.config with the design tokens you chose.
- Load real Google Fonts with intentional pairings (a display face + a text face). Set up a modular type scale and a spacing rhythm — do not eyeball spacing.
- Real, sharp, on-brand COPY aligned to the brief — never placeholder filler. Every headline earns its place.
- Strong hierarchy: a magnetic hero with a crisp value proposition + a single primary CTA, then the sections the brief lists (nav, hero, features/benefits, social proof, secondary CTA, footer — adapt sensibly).
- Micro-interactions: hover, focus-visible, smooth transitions, scroll-reveal via IntersectionObserver, tasteful animated accents. MUST respect prefers-reduced-motion.
- Mobile-first responsive: looks intentional at 375px, 768px, 1280px+. No horizontal scroll, no broken wraps.
- Accessible: semantic landmarks (header/nav/main/section/footer), descriptive alt text, aria where needed, keyboard-focusable controls, WCAG AA contrast.
- Use inline SVG or lucide icons (https://unpkg.com/lucide@latest). No external images unless absolutely necessary; if used, use https://picsum.photos/seed/... placeholders.
- Polish the details: letter-spacing on display type, optical alignment, consistent radii & shadows, a coherent color usage (60/30/10), a clear visual rhythm.

PROCESS (do this internally before writing): briefly reason about hierarchy, palette, type pairing, layout grid, and one signature interaction, self-critique once, then write the final file. Then write it.`

// Retry wrapper — agent() returns null on terminal API error (e.g. rate limit).
// Without this, a null brief crashes downstream as "null is not an object".
async function agentRetry(prompt, opts, tries) {
  tries = tries || 4
  for (let i = 0; i < tries; i++) {
    const r = await agent(prompt, opts)
    if (r) return r
    log(`agent "${opts.label}" returned null (likely rate-limited) — retry ${i + 1}/${tries}`)
  }
  throw new Error(`agent "${opts.label}" failed after ${tries} attempts. The account likely hit a rate limit — re-run the workflow, run one at a time, or reduce "variants".`)
}

// ── 1. BRIEF ─────────────────────────────────────────────────────────────────
phase('Brief')
const briefPrompt = `You are a senior design director. Turn the user's request into a tight creative brief + design system that every designer will work from.

USER REQUEST:
${prompt}

BRAND / EXISTING SYSTEM (optional):
${brand || '(none provided — infer a fitting, original brand voice)'}

Decide the product framing, the audience, the sections the page must contain, and a concrete design token set (font pairings, palette hexes, mood, reference vibes). Define crisp success criteria. Be specific and opinionated — generic briefs produce generic pages.`

log(`Distilling brief for: ${prompt.slice(0, 80)}${prompt.length > 80 ? '…' : ''}`)
const brief = await agentRetry(briefPrompt, { label: 'brief', phase: 'Brief', schema: BRIEF_SCHEMA })

const briefText = `PRODUCT: ${brief.product.name} — ${brief.product.oneLiner} (audience: ${brief.product.audience})
GOAL: ${brief.goal}
SECTIONS: ${brief.sections.join(' · ')}
DESIGN TOKENS — fonts: ${brief.designTokens.fonts.join(', ')}; palette: primary ${brief.designTokens.palette.primary}, accent ${brief.designTokens.palette.accent}, bg ${brief.designTokens.palette.bg}, text ${brief.designTokens.palette.text}; mood: ${brief.designTokens.mood}; references: ${brief.designTokens.references.join(', ')}.
SUCCESS CRITERIA: ${brief.successCriteria.join(' · ')}`

// ── 2. DIVERGE  ──────────────────────────────────────────────────────────────
phase('Diverge')
log(`Generating ${chosen.length} distinct design directions in parallel…`)

const variants = (await parallel(chosen.map((lens, i) => () => {
  const path = `${outputDir}/draft-${i + 1}-${lens.key}.html`
  const p = `DIRECTION: ${lens.name}.
VIBE: ${lens.vibe}

${DESIGN_CONSTITUTION}

CREATIVE BRIEF (shared by all directions — interpret it through YOUR lens):
${briefText}

YOUR JOB: produce the most compelling version of this page using the "${lens.name}" aesthetic. Commit to the direction fully — make it unmistakably ${lens.name}, but still solve the brief. Make ONE signature moment that wows.

Write the complete HTML file to this EXACT absolute path using the Write tool:
${path}

Then return the structured metadata (path must be the absolute path above).`
  return agent(p, { label: `gen:${lens.key}`, phase: 'Diverge', schema: VARIANT_SCHEMA })
}))).filter(Boolean)

if (!variants.length) throw new Error('No design directions were generated.')

// ── 3. JUDGE (each variant × each dimension, fully parallel) ──────────────────
phase('Judge')
log(`Judging ${variants.length} directions across ${DIMS.length} dimensions (${variants.length * DIMS.length} critiques)…`)

const verdicts = (await parallel(variants.flatMap(v => DIMS.map(d => () => {
  const p = `You are an elite design critic scoring ONLY the "${d.key}" dimension. Be honest and demanding — premium output only.

Read the HTML file at this absolute path with your Read tool:
${v.path}

DIMENSION: ${d.key}
WHAT TO JUDGE: ${d.q}

Score 1-10 (10 = world-class, 7 = solid, 5 = competent-but-generic, ≤4 has real problems). Return score, concise notes, and the single highest-leverage fix for this dimension.`
  return agent(p, { label: `judge:${d.key}:${v.lens}`, phase: 'Judge', schema: SCORE_SCHEMA })
    .then(s => ({ variant: v.lens, path: v.path, dim: d.key, ...s }))
})))).filter(Boolean)

// average per variant
const totals = {}
const counts = {}
const topFixes = {}
for (const v of verdicts) {
  totals[v.variant] = (totals[v.variant] || 0) + v.score
  counts[v.variant] = (counts[v.variant] || 0) + 1
  ;(topFixes[v.variant] = topFixes[v.variant] || []).push(`${v.dim}(${v.score}): ${v.topFix}`)
}
const ranked = Object.keys(totals).map(k => ({ lens: k, avg: totals[k] / counts[k], fixes: topFixes[k] }))
  .sort((a, b) => b.avg - a.avg)
log(`Ranking: ${ranked.map(r => `${r.lens}=${r.avg.toFixed(1)}`).join('  ·  ')}`)

const top = ranked.slice(0, Math.min(3, ranked.length))
const topPaths = variants.filter(v => top.some(t => t.lens === v.lens))
const allFixes = top.map(t => `— ${t.lens} (avg ${t.avg.toFixed(1)}) —\n` + t.fixes.join('\n')).join('\n\n')

// ── 4. SYNTHESIZE ────────────────────────────────────────────────────────────
phase('Synthesize')
const synthPrompt = `You are the lead designer producing the FINAL page. We explored ${variants.length} directions and judged them. Your job: take the top direction as the base, and graft the best ideas from the runners-up, then elevate the whole thing to premium.

${DESIGN_CONSTITUTION}

CREATIVE BRIEF:
${briefText}

JUDGING RESULTS (top directions + their highest-leverage fixes to address):
${allFixes}

TOP DIRECTIONS TO READ (use Read tool on each):
${topPaths.map(v => `- ${v.path}  [${v.lens}] — ${v.highlights.join('; ')}`).join('\n')}

Read those files. Use the strongest as the base, fold in the best elements of the others, and fix every issue the judges flagged. Make the hierarchy sharper, the type more refined, the motion more polished, and add/complete every section. This must clearly beat any single direction.

Write the complete final HTML to this EXACT absolute path with the Write tool:
${FINAL_PATH}`
log('Synthesizing top directions into one refined draft…')
await agentRetry(synthPrompt, { label: 'synthesize', phase: 'Synthesize' })

// ── 5. REFINE (critique -> fix loop) ─────────────────────────────────────────
for (let i = 0; i < REFINE_ROUNDS; i++) {
  phase(`Refine ${i + 1}/${REFINE_ROUNDS}`)
  const critique = await agentRetry(`You are a ruthless but constructive senior design reviewer doing pass ${i + 1} of ${REFINE_ROUNDS}. Read the current page and find what's keeping it from world-class.

Read: ${FINAL_PATH}

${briefText}

Return prioritized issues: focus on hierarchy, type polish, color/contrast, motion, responsiveness, accessibility, and any generic/templated feeling. Each issue: severity, area, the concrete problem, and a specific fix. Critical/major issues matter most.`, { label: `critique:${i + 1}`, phase: `Refine ${i + 1}/${REFINE_ROUNDS}`, schema: CRITIQUE_SCHEMA })

  await agentRetry(`You are implementing the reviewer's fixes on the current page. Be surgical and precise — fix real issues, don't restructure what's working.

Read the current file: ${FINAL_PATH}

REVIEWER ISSUES (address every critical and major one; address minors if cheap):
${JSON.stringify(critique.issues, null, 2)}

${DESIGN_CONSTITUTION}

Apply the fixes, then write the improved file back to the SAME path:
${FINAL_PATH}`, { label: `fix:${i + 1}`, phase: `Refine ${i + 1}/${REFINE_ROUNDS}` })
  log(`Refine round ${i + 1}/${REFINE_ROUNDS} complete (${critique.issues.length} issues addressed).`)
}

// ── 6. POLISH ────────────────────────────────────────────────────────────────
phase('Polish')
const polish = await agentRetry(`Final QA + polish pass. The page must be flawless and shippable.

Read: ${FINAL_PATH}

Check and FIX: every breakpoint (375/768/1280+), all interactive states, prefers-reduced-motion honored, semantic HTML + ARIA, WCAG AA contrast, no console errors, no broken refs, no horizontal scroll, copy is sharp and complete, no leftover placeholders. Tighten any remaining rough edges and elevate the signature moment.

Write the final, polished file to the SAME path:
${FINAL_PATH}

Then return a short summary of what you fixed and the final quality assessment.`, { label: 'polish', phase: 'Polish' })

log(`Done. Final page: ${FINAL_PATH}`)

return {
  outputPath: FINAL_PATH,
  winner: top[0].lens,
  ranking: ranked.map(r => ({ lens: r.lens, avg: Number(r.avg.toFixed(2)) })),
  directionsExplored: variants.map(v => ({ lens: v.lens, path: v.path })),
  refineRounds: REFINE_ROUNDS,
  summary: polish,
}
