# DIFF review — PR 8 — Custom Domain route for guide.croftweaver.com
Base `aa279af` · depth: High (deploy/infra) · verdict: CLEAN, with the Cloudflare behaviour unverified until the first deploy · authority used: POST AUTHORITY, WORKTREE-WRITE and BRANCH-COMMIT, each by atom A (this session created PR 8 and the branch `build/domain`)

Gate `20261108T183643Z-42371`. Seats: Codex gpt-6.1-sol (read-only), GLM 5.3 on melious, a Sonnet fresh-eyes pass in round 1.

| Round | Head | Artifact | Reviewers | Seconds, tokens | BUG/RISK/NIT |
|---|---|---|---|---|---|
| 1 | `05dd0f0` | full, `aa279af...05dd0f0` | Codex, GLM 5.3, Sonnet fresh-eyes | Codex 79 s / 42,568; GLM 23 s / 3,084; fresh-eyes 83 s / about 119,448 (not in the script's log) | 0 / 4 / 4 (deduplicated) |
| wording pass | `9461b9a` | delta since `05dd0f0` (`--wording-pass`) | Codex | 95 s / 42,484 | 1 / 1 / 0 |
| confirmation | `cc9b3e6` area | delta since `9461b9a` | Codex | 49 s / 27,829 | 1 / 0 / 0 |

| id | Sev | Source | Round | Finding | Status | Evidence |
|---|---|---|---|---|---|---|
| 1 | RISK | fresh-eyes | 1 | The token's zone permissions may not cover a Custom Domain | follow-up | Wrangler sends no zone id (`cli.js` `publishCustomDomains`); nothing here can show what Cloudflare accepts. The first deploy settles it; a failed deploy names the permission, and the site has no address yet |
| 2 | RISK | Codex, GLM, fresh-eyes | 1 | "the deploy writes its DNS record" and "Previews still answer" are service claims | fixed `9461b9a` | Comment now says the deploy asks Cloudflare to write the record; the Preview claim was removed. A Preview is checked after the first deploy |
| 3 | RISK | fresh-eyes | 1 | Without a terminal Wrangler overrides a conflicting DNS record and replaces the Worker's other Custom Domains | fixed | `cli.js:165533-165567`. Comment says so and says to keep every domain in `routes`; `dig` shows no record before the ship |
| 4 | NIT | fresh-eyes | 1 | `PUBLISHING.md` said the first ship times out because there is no address | fixed | Reworded: the first ship with the domain may time out |
| 5 | NIT | GLM | 1 | Preview URLs after a custom domain are untested | follow-up | Same Preview check as finding 2 |
| 6 | BUG | Codex | wording pass | "four-minute wait" ignores request time (`ship.sh:853-860`) | fixed `cc9b3e6` | The figure is removed |
| 7 | RISK | Codex | wording pass | "overwrites ... without asking" exceeds the evidence | fixed | Comment now states Wrangler's request, not the outcome |
| 8 | UNVERIFIABLE | Codex | confirmation | "as in a build" assumes a build has no terminal | open | Settled by the first build's log |

Waivers and deferrals: none. Closing edits (findings 6 and 7) are wording; the confirmation found the figure still wrong, and the last edit removed the figure. That edit is not externally re-verified.
Follow-ups: after the first deploy, read the zone's DNS record, fetch `https://guide.croftweaver.com/build.txt`, and open one Preview.
Notes: the final full read was not run: the diff is one config line, and all three round-1 seats read the whole diff.
