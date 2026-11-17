# Bug log

Small bugs and follow-ups in this site's own files, kept for a later sweep instead of fixed on
the spot. Bugs in files copied from Croftweaver go to the kit's own BUGLOG. Close a row by fixing
it and setting Status to the fixing commit or PR.

| Found | Where | What | Category | Impact | Effort | Status |
|---|---|---|---|---|---|---|
| 2026-11-16 | `scripts/build-marker.mjs:14`, read by `scripts/deploy.sh` | This site's build marker takes the commit from `WORKERS_CI_COMMIT_SHA` first (the kit's reads only `CF_PAGES_COMMIT_SHA`). `deploy.sh` clears the `CF_*` and `CLOUDFLARE_*` variables and `WORKERS_CI_BRANCH` before its build, but not `WORKERS_CI_COMMIT_SHA`, so a `deploy:preview` or `deploy:live` run in a shell that has it set would name that commit in `build.txt`, not the one built. Not hit today: the variable is set only inside a Workers Builds run, and this site deploys through Workers Builds, not `deploy.sh`. Found by the review of #15. Fix: clear it in the build step, or read git first when not in Workers Builds. | bug | low | trivial | open |
| 2026-11-16 | `src/layouts/Base.astro:146` and `scripts/make-icons.mjs` | The icon tag declares `sizes="16x16 32x32 48x48"` (#13), while `make-icons.mjs` writes an ICO with frames 16, 32, 48 and 64 (the kit's tag declares all four). If the icons are made again, `tests/icons.spec.ts` ("the sizes declared for favicon.ico are the frames inside it") fails until the tag adds `64x64`. Loud, and only on regenerating the icons. Found by the review of #15. Fix: add `64x64` to the tag in the same change that makes the icons again. | follow-up | low | trivial | open |
