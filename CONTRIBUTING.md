# Contributing to fireworks-design

Thanks for your interest! `fireworks-design` is a single-file workflow, so most contributions are small and high-leverage.

## Ways to contribute

- **New aesthetic lenses** — add an entry to the `LENSES` array with a distinct `vibe`. The more diverse the lens pool, the better the exploration.
- **New judge dimensions** — add to `DIMS`. Each new dimension adds a column of independent critique.
- **Smarter synthesis** — improve how the Synthesize agent grafts ideas (e.g., extracting specific components from runners-up).
- **Better defaults / prompts** — tighten the `DESIGN_CONSTITUTION` or phase prompts.
- **Docs & recipes** — add example cases, fix typos, improve the bilingual READMEs.

## Before you start

Open an issue describing what you'd like to change, especially for non-trivial edits. This keeps effort aligned.

## Submitting changes

1. Fork & branch from `main`.
2. Make your change. Keep the single-file workflow self-contained.
3. If you add a lens or dimension, give it a clear `key` and a one-line description.
4. Test by running the workflow on a sample prompt and checking the output `final.html`.
5. Open a PR describing the change and why.

## Style

- The workflow script is plain JavaScript (no TypeScript) — keep it that way (the runtime does not parse TS annotations).
- Match the existing prompt tone: direct, design-principled, demanding on quality.
- Keep READMEs bilingual and in sync.

## Code of conduct

Be kind, specific, and helpful. Assume good intent.

— License: MIT.
