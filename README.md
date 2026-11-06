# Croftweaver Guide

Source of https://guide.croftweaver.com: a small guide to getting found on Google and in AI
answers. Built with Astro from the Croftweaver starter (kit v0.34), served by a Cloudflare
Worker that runs no code of its own.

- `npm install`, then `npm run dev` to work locally. `npm run verify` runs the same checks as
  CI and the pre-push hook.
- `npm run deploy:preview` builds the site and puts a Preview online with Wrangler, using your
  own Cloudflare login. There is no `deploy:live`: live goes only through `npm run ship`,
  which pushes `main` to `production`; Cloudflare's Workers Builds builds that branch
  (`npm run build`, then `npx wrangler deploy`; builds for other branches are off).
- `wrangler.jsonc` has no `main`, so only the built files in `dist/` are served. The starter's
  `functions/` folder (Pages Functions) was removed, and with it the analytics server mode.
- `PUBLISHING.md` explains publishing step by step.
- `tests/check_analytics_gate.sh` is not part of CI or `npm run verify`; run it by hand after
  any change to analytics or `public/_headers`.
