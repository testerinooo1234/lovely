---
description: Edit an existing story, then run mandatory adversarial judges and auto-apply fixes
---

# Edit story

Revise one or more existing stories/chapters in `src/data/stories/`, then run the mandatory adversarial review before finishing.

## Inputs

1. **Which story/chapter** (required) — slug, title, or file path.
2. **What to change** (required) — the user’s edit request.
3. Honor any author/POV/continuity constraints the user states.

## Steps

1. Read `.cursor/rules/story-writing.mdc` (source of truth) and the target file(s).
2. If matching an author voice, load that author from `src/data/authors.ts` and skim **one** peer story for structure/POV/tone only (§16) — not phrase mining.
3. Apply the requested edits. Dramatize; keep plain dirty porn voice; do not invent house slang packs.
4. Preserve plot-critical continuity unless the user asks to change it.
5. Run `node scripts/count-words.mjs` on the affected story; if under 5 minutes, expand with **new unique sexual dialogue/acts** (§10b), not stamped refrains.
6. **Mandatory adversarial review** (§17): launch **three separate judge agents in parallel** on every edited chapter/file:
   1. **Continuity / sense** — swaps, wrong past refs, contradictions, POV leaks, nonsense
   2. **Clarity / natural language** — awkward phrases, strange dialogue, confusion, craft-instruction leaks; plain easy language
   3. **Heat / cut fluff** — boring padding; erotic acts must be explicit and arousing
7. Automatically apply every clear valid fix. If judges conflict: continuity > clarity > heat expansion (never “fix” heat by deleting required explicit sex). Optionally re-run a failing judge once after fixes.
8. Do **not** rewrite `aka-cock-bobber*` unless the user explicitly names that saga (§15).

## Done when

- Requested edits are in the files.
- §17 three judges have run per edited chapter/file; fixes applied.
- Word count still ≥5 min for the story (or each chapter when practical).
- `npm run build` succeeds when feasible.
