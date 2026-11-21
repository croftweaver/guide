# DIFF review: Croftweaver 0.38 frozen copies
Base `9688cbc` · depth: High (the diff touches `ship.sh` and `deploy.sh`, the skill's deploy row; the 0.36 sync ran Normal) · verdict: CLEAN for this site's own decisions; one BUG, one RISK and three NITs sit in kit files, for the owner to waive or park at merge · authority used: WORKTREE-WRITE, BRANCH-COMMIT and POST AUTHORITY (this session created the worktree, branch and PR)

Gate `20261120T224321Z-40433`. Seats: Codex gpt-6.1-sol (read-only, `CODEX_EFFORT=config`) and GLM 5.3 on melious (REVIEW-RULES: deploy scripts). No fresh-eyes sub-agent: its place is the byte comparison (skill step 8, Daniel 2026-11-19), in the evidence file. Both seats saw the whole diff (trail excluded) with that evidence file: the v0.36..v0.38 template diff, how each file was handled, and `B1 tracked` against tag v0.38. The stamp was v0.36 (`39118dc7`); v0.37 changed no template.

| Round | Head | Artifact | Seconds, tokens | BUG / RISK / NIT |
|---|---|---|---|---|
| 1 | `ef26f4c` | full, `9688cbc...HEAD`, trail excluded | Codex 145 s / 69,629; GLM 304 s / 53,848 | 1 / 2 / 3 in kit files; 0 / 1 / 1 in this site's own decisions |

The two own-site findings were fixed in `99835a3` and the Playwright run: a text-only change to the stamp and no change to what runs, so no round 2 is owed.

| id | Sev | Source | Finding | Status | Evidence |
|---|---|---|---|---|---|
| 1 | BUG | Codex | `build-marker.mjs`: an SVG whose `<metadata>` text contains a known Astro default opening is read as the default icon, so the build can fail and delete `dist/` | deferred to kit | Kit file, byte-identical (B1). This site's icons pass `node scripts/build-marker.mjs --check` (Codex ran it) |
| 2 | RISK | Codex | `build-marker.mjs`: the Astro/svgo fingerprints have no fixtures or reproduced svgo output behind them | deferred to kit | Kit file, byte-identical |
| 3 | RISK | GLM | README's checks list names `npx playwright test`, but no Playwright run was in the recorded list | fixed | The pre-push `verify` ran the full suite after the browser build 1254 was installed: 473 passed, 3 skipped (`email.spec.ts`: no address through EmailLink) |
| 4 | NIT | GLM | README says the `kept:` lines record what of the kit's change was not taken, but only AGENTS.md and PUBLISHING.md had one | fixed | `kept:` lines added for `tests/navigation.spec.ts` and `README.md` (`99835a3`) |
| 5 | NIT | GLM | `check_ship_push.sh`: `wname` is set by prefix assignment on a function call; in POSIX mode it would leak into later cases | deferred to kit | Kit file, byte-identical |
| 6 | NIT | GLM | `check_internal_links.sh`: an exempt path with `[`, `?` or `*` is read as a glob in a `case` pattern | deferred to kit | Kit file, byte-identical; this site exempts nothing |
| 7 | NIT | GLM | `check_external_links.sh`: `SITE_HOST` is not lowercased, as its sibling's is | deferred to kit | Kit file, byte-identical; this site's host is lowercase |

Waivers and deferrals: findings 1 and 2 are a BUG and a RISK in a file byte-identical to the kit, which a site does not fork; 5 to 7 are NITs there. They go to the kit's BUGLOG through the Croftweaver manager, and the owner's word is needed at merge for the BUG. Deferral not externally re-verified.
Follow-ups: kit BUGLOG rows for 1, 2, 5, 6 and 7.
Notes: both seats listed UNVERIFIABLE claims inside kit files (svgo output, Cloudflare build watch paths, browser matching of encoded fragments, BSD awk and grep behaviour); none is a claim of this site's own. `.claude/hooks/git-stand.mjs`, `.claude/settings.json` and `CONTENT_GUIDE.md` were missing from the site before this change (B1 `MISSING`); `AGENTS.md` still mentions the hook.
