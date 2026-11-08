# DIFF review — PR 9 — Plausible on for guide.croftweaver.com
Base `0648a38` · depth: High (privacy/legal-adjacent; sends visitor data to a third-party host) · verdict: CLEAN, with the build variable and the privacy policy open for the owner · authority used: POST AUTHORITY, WORKTREE-WRITE and BRANCH-COMMIT, each by atom A (this session created PR 9, the worktree `croftweaver-guide-analytics` and the branch `build/analytics`)

Gate `20261108T191000Z-61931`. Seats: Codex gpt-6.1-sol (read-only), GLM 5.3 on melious, a Sonnet fresh-eyes pass in round 1.

| Round | Head | Artifact | Reviewers | Seconds, tokens | BUG/RISK/NIT |
|---|---|---|---|---|---|
| 1 | merge of `main` into the branch | full, `0648a38...HEAD` | Codex, GLM 5.3, Sonnet fresh-eyes | Codex 89 s / 36,323; GLM 30 s / 4,677; fresh-eyes 95 s / about 119,080 (not in the script's log) | 0 / 5 / 5 (deduplicated) |
| wording pass | `20c9d31` | delta since round 1 (`--wording-pass`) | Codex | 81 s / 36,140 | 0 / 2 UNVERIFIABLE / 0 |

| id | Sev | Source | Round | Finding | Status | Evidence |
|---|---|---|---|---|---|---|
| 1 | RISK | fresh-eyes | 1 | `PUBLISHING.md` lists the Workers Builds settings but not `CF_PAGES_BRANCH` | fixed | New table row; a recreated connection would otherwise lose the tag silently |
| 2 | RISK | fresh-eyes | 1 | The variable is not per branch; other-branch builds on would write the tag in previews | fixed | The "other branches" row says so. They are off today |
| 3 | RISK | Codex | 1 | Workers Builds does not set `CF_PAGES_BRANCH` (unverified) and the tag was never seen on the live page | follow-up | Settled by the owner setting the variable, then reading the live page source for `analytics.m-squad.com` after the ship |
| 4 | RISK | Codex | 1 | The script's compatibility with the stub and a trace of a pageview | follow-up | The stub equals Plausible's own snippet (the owner's paste); the live script URL answered 200. A pageview shows in Plausible after launch |
| 5 | RISK | fresh-eyes | 1 | Code comments say the privacy page names the analytics; the policy is external and unchecked | owner's call | croftweaver.com's policy names Plausible for "this website"; the owner decides whether it covers the guide |
| 6 | NIT | fresh-eyes, GLM | 1 | The `_headers` comment contradicted itself and ran to one long line | fixed | Reflowed; says the live build has Plausible on |
| 7 | NIT | fresh-eyes | 1 | `config.ts` lines 47-49 and 56-59 still describe Pages and the starter | left | Starter comments, not changed by this diff |
| 8 | NIT | fresh-eyes | 1 | Two near-identical `PROD_BRANCH` comments | left | Pre-existing |
| 9 | RISK | Codex | wording pass | Workers Builds behaviour and browser CSP enforcement are asserted, not observed | follow-up | Same live-page check as finding 3 |

Waivers and deferrals: none. Findings 3, 4 and 9 are follow-ups that the live page settles; finding 5 is the owner's.
Notes: no final full read: two config lines and one CSP edit, read whole by three seats. The wording-pass delta is prose only (a table row, a comment); it is externally read once.
