---
description: Add a new story written in a specific author's unique style
---

# Add story by author

Write a new erotica story for this site **in one author's voice**, using their bio and craft notes so each author stays distinct.

## Inputs

1. **Author handle** (required) — one of the handles in `src/data/authors.ts` (e.g. `prettytrap`, `silk_and_spank`).
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
   - `excerpt`: one or two punchy sentences that **lead with concrete sexual beats** from the story (acts, implements, body, denial, pricing for unlock/orgasm — not logistics-only setup). See `.cursor/rules/story-writing.mdc` §5.
   - `pages`: `string[][]` — opening body; paragraphs as template strings like existing stories.
   - Optional multi-chapter: `firstChapterName` + `firstChapterSummary` + `chapters: [{ name, summary, pages }, …]`. Every chapter needs a name and a short summary (distinct from the catalog excerpt). Still one catalog entry; read time sums all chapters. Dropdown shows names; minutes + summary sit under it for the selected chapter. See `.cursor/rules/story-writing.mdc` §9.
   - `tags`: 3–5 tags; prefer the author's `favoriteTags` plus story-specific ones.
   - `publishedAt`: ISO date (`YYYY-MM-DD`), typically "today" or a recent date.
   - `featured`: only if asked.
5. Register the default export in `src/data/stories/index.ts` (import + array entry).
6. Run `node scripts/count-words.mjs` and confirm the new file is **not** flagged `UNDER 5 MIN`. If it is, expand before finishing.
7. Do **not** change other authors' stories unless asked.

## Hard rules (all authors)

Also read `.cursor/rules/story-writing.mdc` — it is the source of truth for craft learned from catalog edits.

- **Minimum length: 5-minute read.** At least **1150 words** of story body text (site uses 230 WPM via `getReadingMinutes` / `scripts/count-words.mjs`). Comfortably longer is better; do not ship a story that rounds below 5 minutes.
- **Adults only (18+).** Never write minors or imply underage characters. On this site, "boy" / "girl" in kink context means adult. Establish adulthood with jobs, college, marriage, cohabiting — **do not** open with age numbers for ordinary adults. Numeric ages **18–21 only** when youth is plot-critical (HS senior, living with parent, freshman/age-gap), and **once** at intro — never as a refrain.
- **No consent theatre.** The site waiver already covers consenting adults. CNC is welcome. Never insert safewords, traffic lights (green/yellow/red), "Color?", "still okay?", or mid-scene check-ins.
- **Dramatize, don't summarize.** Write scenes (specific time, dialogue, sensory detail). Do not leapfrog important beats with "by then / eventually / it became weekly" montages, and do not dump the whole premise in the first sentence.
- **Sexual excerpts.** Catalog `excerpt` must sell the kink: name the act/implement/body/denial/price. Do not ship soft premise blurbs (wallet, mute, hamper, AirPlay) without the filthy turn. Draft the excerpt after the story's heat is clear.
- **Banned names:** never name characters **Aaron** or **Eric**.
- **Sparse names:** do not name characters unless the name does story work (brand, collar plate, text contact). Prefer he/she, girlfriend, Sir, the Domme.
- **Boys/men in panties:** if the story puts panties on a boy or man, frame the beat as emasculation/humiliation (girl's underwear, private shame, being made smaller) — not “soft clothes,” care, or comfort. Vary wording per story; do not reuse one stock phrase. See `.cursor/rules/story-writing.mdc` §6. (Women wearing their own panties is unrelated.)
- **No fragment spam:** do not stack tiny descriptive crumbs as periods **or** as comma/em-dash chains (“White ones. Ordinary.” / “musk, skin, man” / “tall, easy, sales”). Delete the quip or rewrite it as a full natural sentence with verbs — gluing crumbs with commas/dashes is not a fix. Short sentences are fine for bombshells (“We fucked. Twice.”), sparse Domme commands, texts, and occasional character-true dialogue — not as a default cadence. See `.cursor/rules/story-writing.mdc` §7.
- **No therapy-speak for desire:** do not abstract kink into soft clinical phrases (“your feeling,” “sit with it,” “emotional labor,” “the need,” “check-in,” “the dynamic,” “right shape”). Soft vocabulary still means personal/ordinary and names the act (“what you want,” “because you asked,” “keep tasting it,” body reactions). See `.cursor/rules/story-writing.mdc` §8.
- Match the site's literary voice: psychological, sensory, and paced — not spammy porn shorthand. Prefer a mix of narration, internal thought, and dialogue; do not write dialogue-only or dialogue-dominated scenes unless that author's `writingStyle` explicitly requires it.
- Follow the selected author's `writingStyle` closely (POV, pacing, dominant tone, themes, taboo words to avoid, etc.), except where it conflicts with the age / consent / excerpt / banned-name / male-panty-framing / sentence-length / no-therapy-speak rules above — those win.
- Keep the new story **plot-unique** vs that author's existing work (different scenario, not a rewrite).

## Author-specific reminder

After loading the author, treat `writingStyle` as the source of truth for craft. Treat `bio` as the public personality the prose should feel like it came from.

## Done when

- New story file exists and compiles.
- `src/data/stories/index.ts` exports it.
- Excerpt leads with concrete sexual beats (not setup-only).
- `node scripts/count-words.mjs` shows ≥5 min for the new story (no `UNDER 5 MIN` flag).
- `npm run build` succeeds (run it if feasible).
