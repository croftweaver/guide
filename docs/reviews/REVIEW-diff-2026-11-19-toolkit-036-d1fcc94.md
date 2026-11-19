# DIFF review: Croftweaver 0.36 frozen copies
Base `885cced` · depth: Normal (kit files are byte-identical and were gated by the kit; this site's own decisions are small; same call as the 0.35 sync) · verdict: CLEAN for this site's own decisions; two kit BUGs, one RISK and three NITs sit in kit files, for the owner to waive or park at merge · authority used: WORKTREE-WRITE, BRANCH-COMMIT and POST AUTHORITY (this session created the worktree, branch and PR)

Gate `20261119T081227Z-35340`. Seats: Codex gpt-6.1-sol (read-only) and GLM 5.3 on melious (REVIEW-RULES: the change touches deploy scripts), plus a fresh-eyes Sonnet sub-agent in round 1 that redid the byte comparison against tag v0.36 on its own. The pair saw the whole diff with an evidence file naming which files are byte-identical to the v0.36 templates and which hold site decisions.

| Round | Head | Artifact | Seconds, tokens | BUG / RISK / NIT |
|---|---|---|---|---|
| 1 | `d1fcc94` | full, `885cced...HEAD`, trail excluded | Codex 549 s / 124,985; GLM 971 s / 99,046; fresh-eyes Sonnet 321 s / 153,624 | 2 / 1 / 3, all in kit files; 0 / 0 / 0 in this site's own decisions |

No fix changed what runs, so no round 2 is owed (stop condition a2).

| id | Sev | Source | Finding | Status | Evidence |
|---|---|---|---|---|---|
| 1 | BUG | Codex | `ship.sh` writes `SHIP-AGAIN.txt` after refusing only a link or an ignored file; PUBLISHING.md says it writes the file "only when it is its own". A tracked file of that name with other content is overwritten | deferred to kit | Read at `scripts/ship.sh:1231-1235`: the refusal tests `-L` and `check-ignore` only. This site has no `SHIP-AGAIN.txt` (`ls`), and ship-again runs only on an owner's `y` in a terminal |
| 2 | BUG | Codex | `playwright.config.ts`: the cloud fallback checks that the headless-shell directory exists, not its executable; a partial install hides the fallback | deferred to kit | Kit file, byte-identical. Only matters where `/opt/pw-browsers` exists (cloud sessions), not on this Mac or in CI |
| 3 | RISK | GLM | `icons.spec.ts` throws if `SITE.url` is empty or not absolute | deferred to kit | `src/config.ts` has `url: 'https://guide.croftweaver.com'`; the icon tests passed (470 passed, 3 skipped) |
| 4 | NIT | GLM | PUBLISHING.md says ship "stops" when `SHIP-AGAIN.txt` is a link or ignored; `ship.sh` prints a line and keeps waiting | left | Kit text in the paragraph taken as is |
| 5 | NIT | GLM | `check_ship_push.sh` usage comment lacks `--folder-moves` | left | Kit file, byte-identical |
| 6 | NIT | fresh-eyes | AGENTS.md §2 says never push to `main`; ship-again pushes one commit to `main` after the owner's `y`, and AGENTS.md does not say so | left | The kit's AGENTS.md has the same gap; this site's AGENTS.md is untouched, as in PR #15 |

Waivers and deferrals: findings 1 to 3 are in files that are byte-identical to the kit, which a site does not fork. They go to the kit's BUGLOG through the Croftweaver coordinator. They are BUGs and a RISK this change did not write; the owner's word is needed at merge. Deferral not externally re-verified.
Follow-ups: kit BUGLOG rows for 1 to 5.
Notes: UNVERIFIABLE entries (Node security versions, Cloudflare watch paths, Astro icon hashes, "wrangler accepts a trailing comma") were asked by one or both seats and are claims inside kit files; Codex checked the wrangler claim in the installed `cli.js` (`allowTrailingComma: true`). The fresh-eyes pass reproduced `check_ship_push.sh` (SHIP_TEST_TTY=1: 82 outcomes, 719 checks pass).
