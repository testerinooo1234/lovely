---
description: Add a new story written in a specific author's unique style
---

# Add story by author

Write a new erotica story for this site **in one author's voice**, using their bio and craft notes so each author stays distinct.

## Inputs

1. **Author handle** (required) — one of the handles in `src/data/authors.ts` (e.g. `prettytrap`, `silkandspank`).
2. **Optional premise / tags / title** — if the user supplies them, honor them; otherwise invent a premise that fits the author's favorite themes.
3. If the user says "any author" or doesn't specify, ask which handle to use (list handles from `src/data/authors.ts`).

## Steps

1. Read `src/data/authors.ts` and load the matching author (`handle`, `bio`, `writingStyle`, `favoriteTags`).
2. Skim 1–2 existing stories by that author in `src/data/stories/` (grep `author: '<handle>'`) to match length, page structure, and tone.
3. Read `src/types.ts` and one recent story file for the exact `Story` shape.
4. Create a new file `src/data/stories/<slug>.ts`:
   - `id`: next unused string id (check existing story ids).
   - `slug`: kebab-case, unique.
   - `title`: lowercase, literary, in the house style of existing titles.
   - `author`: exact author handle.
   - `excerpt`: one or two sentences, teasing, no spoilers of the final beat if possible.
   - `pages`: `string[][]` — usually 1–2 pages; paragraphs as template strings like existing stories.
   - `tags`: 3–5 tags; prefer the author's `favoriteTags` plus story-specific ones.
   - `publishedAt`: ISO date (`YYYY-MM-DD`), typically "today" or a recent date.
   - `featured`: only if asked.
5. Register the default export in `src/data/stories/index.ts` (import + array entry).
6. Do **not** change other authors' stories unless asked.

## Hard rules (all authors)

- **Adults only (18+).** State ages or clear adult context (college sophomore+, jobs, marriages, etc.). Never write minors or imply underage characters. On this site, "boy" / "girl" in kink context means adult.
- Match the site's literary voice: psychological, sensory, dialogue-rich — not spammy porn shorthand.
- Follow the selected author's `writingStyle` closely (POV, pacing, dominant tone, themes, taboo words to avoid, etc.).
- Keep the new story **plot-unique** vs that author's existing work (different scenario, not a rewrite).

## Author-specific reminder

After loading the author, treat `writingStyle` as the source of truth for craft. Treat `bio` as the public personality the prose should feel like it came from.

## Done when

- New story file exists and compiles.
- `src/data/stories/index.ts` exports it.
- `npm run build` succeeds (run it if feasible).
