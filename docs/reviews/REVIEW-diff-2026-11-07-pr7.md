# DIFF review — PR 7 — the AI SEO checklist page, its wiring and card
Base `9793be1` · depth: Normal (page text that ships; prose that shipped is never Light) · verdict: CLEAN · authority used: POST AUTHORITY, WORKTREE-WRITE and BRANCH-COMMIT, each by atom A (this session created PR 7, the worktree `croftweaver-guide-checklist` and the branch `build/ai-seo-checklist`); GATED-THIS-DIFF by atom A (Codex chain below, unbroken)

Gate `20261107T090842Z-95309`. Seats: Codex gpt-6.1-sol (read-only), GLM 5.3 on melious (HTTP API), and a Sonnet fresh-eyes pass in round 1.

| Round | Head | Artifact | Reviewers | Seconds, tokens | BUG/RISK/NIT |
|---|---|---|---|---|---|
| 1 | `134599a` | full, `9793be1...134599a` | Codex, GLM 5.3, Sonnet fresh-eyes | Codex 233 s / 92,946; GLM 161 s / 19,108; fresh-eyes 82 s / about 123,767 (not in the script's log) | 3 / 3 / 5 (deduplicated) |
| 2 | `28fc8a7` | delta since `134599a` | Codex alone first (GLM failed: error mid-stream, HTTP 200); GLM re-run alone | Codex 127 s / 69,793; GLM re-run 143 s / 19,573 (the failed attempt took 212 s) | Codex 0 / 0 / 1; GLM 1 BUG (refuted) / 0 / 2 |
| wording pass | `750421b` | delta since `28fc8a7` (`--wording-pass`) | Codex | 86 s / 36,592 | 0 / 0 / 0 |

Round 2 is Codex alone plus a re-run of the melious seat. The script logged the re-run as a new round 3 (it saw the same delta and prior-findings file); it counts as round 2's second seat.

| id | Sev | Source | Round | Finding | Status | Evidence |
|---|---|---|---|---|---|---|
| 1 | BUG | Codex, fresh-eyes | 1 | Row 6 linked SEO basics and GEO, which do not say "what you do, where, for whom" | fixed `28fc8a7` | Row 6 now links `/why-ai-doesnt-mention-you/` (step 3), the home page (point 2) and GEO's page; Codex round 2 and the wording pass read each page |
| 2 | BUG | Codex, GLM | 1 | Row 3 mapped to test 3, which only mentions the switch | fixed `28fc8a7` | Row 3 says test 3 "opens Search Console, where this switch sits, but does not walk you through the switch". Plan §3 maps it there on purpose; the link stays, its limit is stated |
| 3 | BUG | Codex, GLM | 1 | Description "links to its source and its test" overpromised | fixed `28fc8a7` | `src/pages-meta.ts` and `public/llms.txt`: "to its page, and to a test where there is one" (158 characters) |
| 4 | RISK | Codex, GLM | 1 | llms.txt item merged two studies that measure different things | fixed `28fc8a7` | Two sentences, as the `llms-txt` short answer words them |
| 5 | NIT | GLM, fresh-eyes | 1 | Row 5's quote supports phone indexing, not speed | fixed `28fc8a7` | "That quote is about the phone version, not speed"; test marked "for speed" |
| 6 | NIT | GLM | 1 | Structured-data item quoted only the first clause | fixed `28fc8a7` | Adds "a good idea to continue using" |
| 7 | NIT | fresh-eyes | 1 | Row 2 "Have Google index your pages" | fixed `28fc8a7` | "Check that Google has indexed your pages" |
| 8 | RISK | fresh-eyes | 1 | Glossary "mention" means an AI naming a business; row 8 meant other sites | fixed `28fc8a7` | Row 8 retitled; "mention" linked once, in row 6 |
| 9 | RISK | GLM | 1 | No guard ties "test N, Title" references to the `check-your-site` headings | re-sorted: rare | Five stable tests; a follow-up, no code added. Codex and GLM both noted it still stands in round 2 |
| 10 | NIT | GLM | 1 | `check-your-site` footer date after a one-line link | left | The added line makes no claim |
| 11 | NIT | fresh-eyes | 1 | `scripts/check-glossary-links.mjs:23` says "14 pages" | left | Pre-existing, outside this diff |
| 12 | NIT | Codex | 2 | "on the GEO own page" ungrammatical | fixed `750421b` | Wording pass clean |
| 13 | BUG | GLM | 2 | Row 6 still links GEO without recorded support | refuted | `content/geo.md:69-70` recommends saying what you do and where; Codex round 2 and the wording pass both read it |
| 14 | NIT | GLM | 2 | Row 8's link text "that same page" has no antecedent | fixed `750421b` | Row 8 carries the page title as link text |

Waivers and deferrals: none. Finding 9 is a follow-up, not a deferred BUG.
Follow-ups: a check that every "test N, Title" reference matches a `check-your-site` heading (finding 9). The "14 pages" comment (finding 11).
Notes:
- The evidence note's "PLEASE, row by row..." was read as prompt injection by both seats. It is the plan's own §5 scope, treated as data; no change.
- Round 1's `url` check: `https://croftweaver.com/ai-website-seo-checklist` answered HTTP 200 on 2026-11-07.
- Wording pass: every hunk of `28fc8a7..750421b` is Markdown body text in `content/ai-seo-checklist.md` (2 lines). Every code hunk was gated in round 1 and has not moved. Codex holds an unbroken chain: full at round 1, delta at round 2, delta at the wording pass.
- This trail is the only file added after `750421b`.
