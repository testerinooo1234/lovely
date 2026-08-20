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
2. Skim **one** existing story by that author in `src/data/stories/` (grep `author: '<handle>'`) for **structure, POV, and tone only** — not for phrase mining. Do not reuse that story's distinctive catchphrases. See `.cursor/rules/story-writing.mdc` §16.
3. Read `src/types.ts` and one recent story file for the exact `Story` shape (shape only).
4. Create a new file `src/data/stories/<slug>.ts`:
   - `id`: next unused string id (check existing story ids).
   - `slug`: kebab-case, unique.
   - `title`: Title Case, in the house style of existing titles (understated, not clickbait).
   - `author`: exact author handle.
   - `excerpt`: one or two punchy sentences that **lead with concrete sexual beats** from the story (acts, implements, body, denial, pricing for unlock/orgasm — not logistics-only setup). See `.cursor/rules/story-writing.mdc` §5.
   - `pages`: `string[][]` — opening body; paragraphs as template strings like existing stories.
   - Optional multi-chapter: `firstChapterName` + `firstChapterSummary` + `chapters: [{ name, summary, pages }, …]`. Every chapter needs a name and a short summary (distinct from the catalog excerpt). Still one catalog entry; read time sums all chapters. See `.cursor/rules/story-writing.mdc` §11.
   - `tags`: 3–5 tags; prefer the author's `favoriteTags` plus story-specific ones.
   - `publishedAt`: ISO date (`YYYY-MM-DD`), typically "today" or a recent date.
   - `featured`: only if asked.
5. Register the default export in `src/data/stories/index.ts` (import + array entry).
6. Run `node scripts/count-words.mjs` and confirm the new file is **not** flagged `UNDER 5 MIN`. If it is, expand with **new unique sexual dialogue and acts** (`.cursor/rules/story-writing.mdc` §10b) — not repeated thesis refrains.
7. **Mandatory adversarial review** (`.cursor/rules/story-writing.mdc` §17): after the draft is finished, launch **three separate judge agents in parallel** on the new story (or each chapter):
   1. **Continuity / sense** — character swaps, wrong past references, contradictions, POV leaks, nonsense logistics
   2. **Clarity / natural language** — awkward phrases, strange dialogue, confusing lines, craft/planning leaks into prose; prefer plain easy-to-follow language
   3. **Heat / cut fluff** — boring unnecessary padding; erotic acts must be explicit and arousing (this is a porn site)
   
   Automatically apply every clear valid fix the judges return. If a judge majority-fails dialogue/sense, fix and optionally re-run that judge once. Do **not** skip this step.
8. Do **not** change other authors' stories unless asked.

## Hard rules (all authors)

Also read `.cursor/rules/story-writing.mdc` — source of truth. Prefer **principles** over copying example lines from that file.

- **Minimum length: 5-minute read.** ≥ **1150 words** at 230 WPM. Longer is fine; expand via new sex dialogue/acts, not stamped refrains.
- **Adults only (18+).** No minors. “Boy” / “girl” in kink = adult. Adulthood via jobs/college/marriage — no filler adult ages. Numeric **18–21** only when youth is plot-critical, **once** at intro.
- **No consent theatre.** No safewords, traffic lights, “Color?”, mid-scene check-ins.
- **Dramatize, don't summarize.** Scenes over montages. No premise dump in sentence one.
- **Sexual excerpts.** Lead with the filthy beat, not logistics-only setup.
- **Banned names:** never **Aaron** or **Eric**. Sparse names otherwise.
- **Boys/men in panties:** emasculation/humiliation framing — not comfort clothes. Vary wording; no stock panty line. §6.
- **No fragment spam / robotic spoken stacks.** Full natural sentences. §7.
- **No therapy-speak for desire.** Name the act and the body. §8.
- **Ban categories, not phrase dictionaries:** no reified yes/no protocol nouns; no private product-name for a kink; no workshop/syllabus nouns; no cute metaphors where an ordinary verb will do. §9.
- **No house slang packs.** Don't invent a branded identity label and lecture with it every beat. Examples in the craft doc are illustrations only. §10 / §10c.
- **Nicknames:** realistic for this speaker/scene. If stuck, research real slang, pick one, use it here — **do not** add it to rules, author notes, or a whitelist for later. §10a.
- **Plain dirty porn voice.** Dark/taboo subject matter, not fancy literary erotica. §0 / §14.
- **Never rewrite a.k.a. Cock Bobber** unless the user names that saga. §15.
- **Cuckold “gaslighting”:** loving rename-and-assent technique (§13). Never put `gaslight`/`gaslighting` in prose. Tag OK when load-bearing. Title exception: *Gaslighting* only. Learn pattern from Cock Bobber; don't paste its lines.
- **Adversarial judges required** after every draft/edit (§17): continuity, clarity, heat — then auto-apply fixes.
- Follow the author's `writingStyle`, except where it conflicts with the rules above — those win.
- Keep the new story **plot-unique** and **dialogue-unique** vs that author's existing work.

## Author-specific reminder

After loading the author, treat `writingStyle` as craft for POV/pacing/themes. Treat `bio` as public personality. Neither is a slang kit to stamp into every paragraph.

## Done when

- New story file exists and compiles.
- `src/data/stories/index.ts` exports it.
- Excerpt leads with concrete sexual beats (not setup-only).
- §17 three adversarial judges have run; their fixes are applied.
- `node scripts/count-words.mjs` shows ≥5 min (no `UNDER 5 MIN` flag).
- `npm run build` succeeds (run it if feasible).
