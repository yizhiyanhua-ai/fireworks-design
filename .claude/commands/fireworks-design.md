---
description: Generate a world-class frontend page via fireworks-design (explore → judge → synthesize → refine → polish)
argument-hint: <what to build> [output dir] [variants N] [brand ...]
---

Use the **fireworks-design** workflow to build one self-contained `final.html` page from this request:

$ARGUMENTS

## How to run it

Invoke the Workflow tool:
- `name`: `fireworks-design`  (it is installed at `.claude/workflows/fireworks-design.js`; if the name does not resolve, use `scriptPath: ".claude/workflows/fireworks-design.js"`)
- `args`:
  - `prompt` — the full request above
  - `outputDir` — absolute path (required)
  - `variants` — number of directions (default `6`, max `8`)
  - `refineRounds` — default `2`
  - `brand` — any brand notes the user mentioned (colors, fonts, references)

## Rules

- `prompt` and an absolute `outputDir` are required. If the user did **not** specify an output directory, ask once concisely, then proceed without asking again.
- Honor any explicit `variants` / `refineRounds` / `brand` notes the user mentioned; otherwise use the defaults.
- The workflow runs in the background. Tell the user they can watch live progress with `/workflows`.
- Do **not** hand-generate the page yourself — the workflow does it. Just invoke it and wait.
- When the workflow completes, open the returned `outputPath` (`final.html`) and report in 2–3 lines: which aesthetic won, the single signature moment, and where the file was saved.
