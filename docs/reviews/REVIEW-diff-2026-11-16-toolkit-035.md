# DIFF review: Croftweaver 0.35 frozen copies
Base `f28727b` · depth: Normal (deploy scripts and instruction files are never Light) · verdict: CLEAN for this site's own decisions; six kit findings deferred to the kit's BUGLOG, for the owner to waive at merge

Gate `20261116T101030Z-43499`. Seats: Codex gpt-6.1-sol (read-only) and GLM 5.3 on melious, every round. The reviewers saw the whole diff with an evidence file that named which files are byte-identical to the kit's v0.35 templates (`cmp`, checked) and which hold site decisions.

| Round | Head | Artifact | Seconds, tokens | BUG / RISK / NIT (own decisions) |
|---|---|---|---|---|
| 1 | `4a276fb` | full, `f28727b...HEAD` | Codex 259 s / 120,815; GLM 548 s / 107,720 | 5 / 4 / 2 deduplicated: 3 BUGs and both NITs are this site's, 2 BUGs and all 4 RISKs sit in kit files |
| 2 | `399ddd3` | delta since `4a276fb` (`--verify`) | Codex 146 s / 65,958; GLM 249 s / 23,041 | 1 / 1 / 0 own (kit findings repeated) |
| 3 | `6c4f985` | delta since `399ddd3` (`--verify`) | Codex 146 s / 53,834; GLM 111 s / 12,257 | 0 / 1 / 1 own (the denial RISK repeated; kit findings repeated) |

| id | Sev | Round | Finding | Status | Evidence |
|---|---|---|---|---|---|
| 1 | BUG | 1 | `check_analytics_gate.sh`: the server-mode skip is unreachable behind the site's own `!= script` refusal | fixed | The site's trims were dropped; the gate is the kit's v0.35 file, byte-identical (`cmp`) |
| 2 | BUG | 1 | `SETUP.md` says esbuild and workerd are denied; this `package.json` denies neither | fixed | `allowScripts` now denies both; `npm ci` prints no install-script warning; `npx wrangler deploy --dry-run` reads `dist/` and exits |
| 3 | BUG | 1 | `README.md` says there is no `deploy:live` | fixed | README now says the script exists and this site does not use it; AGENTS.md lists it among the commands never run unasked |
| 4 | BUG | 2 | Removing `deploy:live` broke `tests/check_deploy.sh` (not part of `npm run verify`) | fixed | Script restored; `bash tests/check_deploy.sh`: all cases passed |
| 5 | RISK | 2, 3 | The denials are only proved if `node_modules` was installed with them | answered | `npm ci` ran after the change and before the dry run |
| 6 | NIT | 1 | `expect_go` doc names a third argument | fixed | Came with the kit's gate (finding 1) |
| 7 | NIT | 3 | README wording "the kit's upload by command" | fixed | Reworded |
| 8 | NIT | 1 | CI runs the whole job for a README edit | left | Kit's `ci.yml`, byte-identical |
| 9 | BUG | 1 | `deploy.sh`, `ship.sh` and `workers-config.spec.ts` refuse a trailing comma in `wrangler.jsonc`; Wrangler accepts one | deferred to kit | Reproduced: `deploy.sh preview --dry-run` stops with "a trailing comma is not allowed". A loud, deliberate refusal |
| 10 | BUG | 1 | `deploy.sh` does not unset `WORKERS_CI_COMMIT_SHA`, which `build-marker.mjs` reads before git | deferred to kit | Reading confirmed: the variable is not `CF_*` or `CLOUDFLARE_*`. Needs the variable set in the caller's shell |
| 11 | RISK | 1 | `make-icons.mjs` writes a 64 px ICO frame; this site's `Base.astro` declares 16 32 48 and `icons.spec.ts` demands equality | deferred to kit | Only on regeneration, which this change does not run |
| 12 | RISK | 1 | `playwright.config.ts` fallback checks the full Chromium, not the headless shell | deferred to kit | Kit file |
| 13 | RISK | 1 | `_headers` NEL block: the Report-To claim is not measured | deferred to kit | Kit text; no effect on the CSP line |
| 14 | RISK | 1 | `deploy.sh` reads `site:` from `astro.config.mjs` without skipping comments, as `ship.sh` does | deferred to kit | Kit file |

Waivers and deferrals: findings 9 to 14 are in files that are byte-identical to the kit, which a site does not fork. They go to the kit's BUGLOG (sent to the Croftweaver manager). The deferral needs the owner's word at merge: they are BUGs and RISKs this change did not write.
Notes: Codex marks kit identity, the green runs and Cloudflare facts UNVERIFIABLE; the `cmp` list and the run outputs are in this session's work, not in the reviewers' reach.
