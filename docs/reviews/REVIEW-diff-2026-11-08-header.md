# DIFF review — header, logo, menu and brand colours for guide.croftweaver.com
Base `8a92f01` · depth: Normal · verdict: CLEAN after one round; the Preview check is Daniel's · authority used: POST AUTHORITY, WORKTREE-WRITE and BRANCH-COMMIT, each by atom A (this session created the worktree `croftweaver-guide-header` and the branch `build/header`)

Plan: `croftweaver-features/guide-site/PLAN-header-and-links.md`, Part A. Gate `20261108T221536Z-8544`. Seats: Codex gpt-6.1-sol (read-only), GLM 5.3 on melious, a Sonnet fresh-eyes pass in round 1.

| Round | Head | Artifact | Reviewers | Seconds, tokens | BUG/RISK/NIT |
|---|---|---|---|---|---|
| 1 | `de5b418` | full, `8a92f01...HEAD`, with an evidence file | Codex, GLM 5.3, Sonnet fresh-eyes | Codex 247 s / 91,147; GLM 268 s / 47,020; fresh-eyes 128 s / 143,054 (not in the script's log) | 2 BUG (fresh-eyes) / 3 RISK / 5 NIT, deduplicated |

| id | Sev | Source | Round | Finding | Status | Evidence |
|---|---|---|---|---|---|---|
| 1 | BUG | fresh-eyes, GLM | 1 | Fold comment mixed item-row widths (627) with window widths (678) | fixed | Measured all 14 pages in Verdana: rows 627.2 to 638.0; the comment now gives rows and windows apart (667 and 678; 720 leaves 42) |
| 2 | BUG | fresh-eyes, GLM | 1 | Fold comment named `tests/navigation.spec.ts`; the guard is in `tests/header.spec.ts` | fixed | Comment names the right file |
| 3 | NIT | fresh-eyes | 1 | "Whose label is the longest" gave the wrong cause; the "about 1000px" claim had no measurement | fixed | The widest row is on the "Your site" pages because the group name is bold; the 1000px sentence is gone |
| 4 | NIT | fresh-eyes, GLM | 1 | Orphan comment at the end of `tests/header.spec.ts` (POSITIONING.md) | fixed | Deleted |
| 5 | NIT | fresh-eyes | 1 | Comment cited BRAND.md, which this repo lacks | fixed | Citation dropped in the new file |
| 6 | NIT | fresh-eyes | 1 | The no-JavaScript dark colours were never tested | fixed | New test; mutation (`--bg` one digit off in that block) fails it, the original passes |
| 7 | RISK | Codex | 1 | Row tests ran on `/` in the machine's default font; phone tests checked overflow only | fixed, then reworked after CI | The narrowest-width row test runs on `/`, `/ai-crawlers`, `/glossary` in Verdana (fold at 39rem: all three fail, 45rem: pass). The phone test first allowed the logo to draw at 60% of its size; CI on Linux (wider font) drew it at 56% and failed. Now the logo never shrinks (`flex-shrink: 0`, 1.25rem high, word 1.1rem), the word is hidden below 360 px, and the test forces Verdana and holds the logo to 99% of its size and the word and logo clear of Menu at 414, 375, 360 and 320 px (word at 2rem: fails; hide threshold at 288 px: fails) |
| 8 | RISK | Codex | 1 | The logo test accepts any positive opacity and takes contrast from the opaque colour | re-sorted: rare | The header logo must equal `lockup-horizontal-theme.svg`, a byte-identical copy of the site's, which has no opacity; follow-up if the file changes |
| 9 | RISK | GLM | 1 | Nothing pins the og cards to the new colours | refuted | Codex rebuilt all 15 cards from the generator byte for byte; fresh-eyes sampled the pixels (23,54,39) top, (14,19,15) bottom |

Unverifiable, left to the Preview or to later checks: Safari and Firefox focus behaviour (comments in `Header.astro`), real back/forward cache, a multi-policy CSP in a real deploy (all inherited from the site's header), and `astro preview` serving no `_headers` (the tests read the file).

Waivers and deferrals: none. Finding 8 is a follow-up. No second round: the fixes changed comments, one test file and no code that runs on the page; each new test was checked against a mutation (the phone-logo `flex-shrink: 0` is a safeguard no test isolates) of the thing it guards, and `npm run verify` was green after the last edit (335 passed, 4 skipped, all four skips existing).
