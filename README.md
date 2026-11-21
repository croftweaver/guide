# Croftweaver Guide

Source of https://guide.croftweaver.com: a small guide to getting found on Google and in AI
answers. Built with Astro from the Croftweaver starter (kit v0.38, see "Toolkit sync"), served by a Cloudflare
Worker that runs no code of its own.

- `npm install`, then `npm run dev` to work locally. `npm run verify` is what the pre-push
  hook runs: type check, build and the Playwright tests. CI runs those too, plus a few more
  guards (see `.github/workflows/ci.yml`).
- `npm run deploy:preview` builds the site and puts a Preview online with Wrangler, using your
  own Cloudflare login. `npm run deploy:live` does the same for the live Worker, but this
  site does not use it. Live goes through `npm run ship`, which pushes `main` to `production`;
  Cloudflare's Workers Builds builds that branch (`npm run build`, then `npx wrangler deploy`;
  builds for other branches are off).
- `wrangler.jsonc` has no `main`, so only the built files in `dist/` are served. The starter's
  `functions/` folder (Pages Functions) was removed, and with it the analytics server mode.
- `PUBLISHING.md` explains publishing step by step.
- `tests/check_analytics_gate.sh` is not part of CI or `npm run verify`; run it by hand after
  any change to analytics or `public/_headers`.

## Toolkit sync

How this site follows the Croftweaver kit. Method: the `website-site-sync` skill.

- **Last synced:** v0.38 (`8e3c002e8b307be9871008ed20eb751c385c4a8f`), PR #30 at `96ba226e`, 2026-11-20. Before it: v0.36 (`39118dc7`, PR #27 at `eefe17a`). v0.37 changed no template. The stamp is `tests/TESTS-VERSION`.
- **Kept at each sync:** `AGENTS.md` and `PUBLISHING.md` are merged by hand (the site's filled slots, its §5, its two-stage Workers text), `tests/navigation.spec.ts` keeps its footer test, `package.json`, `wrangler.jsonc` and this README stay the site's own. The `kept:` lines in `tests/TESTS-VERSION` say what of the kit's change was not taken.
- **Left on purpose:** `orphan-exempt.txt` does not exist, as no page is left unlinked on purpose (a missing file means none). The site has no bundled `.claude/skills`, so the kit's skills are not synced.
- **Checks:** `npm run check`, `npm run build`, `bash tests/check_analytics_gate.sh`, `bash tests/check_deploy.sh`, `SHIP_TEST_TTY=1 bash tests/check_ship_push.sh`, `npx playwright test`.
- **Extra steps:** none.
- **Ships:** `npm run ship` from the owner's folder pushes `main` to `production`; Cloudflare's Workers Builds builds that branch.
