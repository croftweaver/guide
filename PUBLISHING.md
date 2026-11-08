# Publishing your site — a plain-English guide

This explains how your changes get onto the internet. **No prior git knowledge needed** —
read the glossary once, then follow the steps for your site's model.

---

## The five words you'll see (in plain English)

| Word | What it actually means |
|---|---|
| **commit** | **Save a snapshot** of your changes on your own computer, with a short note describing them. Nothing is online yet — it's like saving a document. |
| **push** | **Upload** your saved snapshots to GitHub (the cloud). On this site a push to `production` triggers the build; a push to any other branch builds nothing. |
| **branch** | A **named line of work**. Your site has two: `main` and `production`. Think of them as "the draft" and "the published version." |
| **checkout** | **Switch** which branch you're looking at / working on. `git checkout main` = "show me the draft." |
| **merge** | **Copy the changes** from one branch into another — e.g. take everything in `main` and bring it into `production` to publish. |

A normal edit is always the same three moves: **commit** (save) → **push** (upload) →
publish. A push to `main` builds nothing on Cloudflare; the site is built when `main` is
published to `production` with `npm run ship`.

---

## How this site is published (Workers)

This site is a **Cloudflare Worker** that serves the built files from `dist/` and runs no
code of its own (`wrangler.jsonc` has no `main`). It is **two-stage**: `production` is the
live branch, `main` is the draft. Cloudflare's Workers Builds is connected to this repo with
these settings (changing any of them changes what the public sees):

| Setting | Value |
|---|---|
| Production branch | `production` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Builds for other branches | **off** |

A push to any branch except `production` starts no build. The first publish that adds the
Custom Domain may end with `npm run ship` printing its "still serves an OLD build"
warning and exiting 1 although the build went through: the domain's DNS record and
certificate can take longer than ship's four-minute wait. A slow build ends the same way. In both cases open
the build's `/build.txt` yourself and compare it with the commit id ship printed (on a
folder that publishes GitHub's `main`, `git rev-parse HEAD` may be a different commit).

---

## Two-stage (recommended) — "preview first, then publish"

`main` is the draft; `production` is the **live** site. You can push freely to `main` —
nothing reaches your live domain until you publish. A push to `main` builds nothing on
Cloudflare. To look at a draft online, run `npm run deploy:preview` from your computer (see
below). Cloudflare marks a Preview `noindex` (seen on another Worker's Preview; not yet
checked on this one), but it isn't password-protected: **anyone who has
the preview URL can open it.** Don't put confidential content on a preview unless the
project is behind Cloudflare Access or similar.

**Every time you change the site:**

```bash
# 1. Save your changes (a snapshot + a short description)
git add -A
git commit -m "describe what you changed, e.g. update opening hours"

# 2. Upload them to GitHub (nothing is built on Cloudflare for `main`)
git push

# 3. Optional: put the draft online as a Preview and check it. This uses your own
#    Cloudflare login (`npx wrangler login`, once) and prints the Preview address.
npm run deploy:preview

# 4. Happy? Publish it to the live site — ONE command:
npm run ship
```

`npm run ship` uploads `main` to the live (`production`) branch for you — you never run the
branch commands by hand. Then it **waits and verifies** that the live site really serves the
new version (every build stamps its id into `/build.txt`; ship polls for it, up to 4 min).
"✓ LIVE — verified" means it's truly online; a warning means Cloudflare didn't build, or
built slower than ship waits (see "How this site is published") — open the build in the
Cloudflare dashboard (Workers & Pages → this Worker → Builds) and read `/build.txt` against
the commit id ship printed. Never assume a push went live without that check.

> **Each upload may run a quick self-check** (it builds the site and runs the tests before
> uploading — so does `npm run ship`, which uploads too). It can take a minute, and **if
> something is broken it stops the upload and tells you** rather than publishing a broken
> page. To skip the check on a *manual* `git push` you've already verified:
> `git push --no-verify`. If **`npm run ship`** stops partway, don't force it — ask for help.

> **Nothing reaches the live domain until step 4.** Steps 1–3 only update GitHub and a Preview.

### On a shared computer: publish GitHub's `main` instead

`npm run ship` stops when this folder isn't on `main` or has unsaved files. That protects you
from publishing while you've forgotten to save an edit. But where several people or AI
assistants work in the same folder, it's seldom tidy: someone's draft, or a branch left
checked out, blocks every publish, though none of it would have been published.

For such a folder, switch on one setting, once, in the site's folder:

```bash
git config ship.fromGitHub true
```

From then on, `npm run ship` publishes **GitHub's `main`**, from a temporary copy it makes
and removes again. The checks run on exactly what goes live, and none of the files in this
folder are built, published or changed. Unsaved files no longer block it: they're listed under "Not
published", and the last line says how many there were. So the one thing to keep in mind:
**an edit that is only in this folder doesn't go live.** Get it onto GitHub's `main` first
(a pull request, or a push), then ship.

- The setting is saved in this folder's own git settings, so it covers every copy of the site
  that shares them (an assistant's `git worktree` of it, say), and no other copy. A fresh
  copy of the site starts without it.
- Each publish installs the site's packages fresh in the temporary copy (`npm ci`), so it
  needs the internet (or packages npm has cached before) and takes a little longer.
- One publish runs at a time across this folder and every copy that shares its settings; a
  second one stops and says why.
- To see whether it's on: `git config --local --get ship.fromGitHub`. To switch it off:
  `git config --unset ship.fromGitHub`.

---

## If something goes wrong

- **Mistake already live?** Don't panic — in the **Cloudflare dashboard → Workers & Pages →
  this Worker → Deployments**, every past version is listed; click an older one →
  **Rollback** to restore it instantly.
- **Made a typo in the last save (not pushed yet)?** Re-edit, then
  `git add -A && git commit -m "fix typo"` again.
- **`git push` says "rejected"?** (on `main`) Someone/something updated the cloud copy — run
  `git pull` first, then `git push` again.

`npm run ship` names which of these it is, and says whether anything was published. The
ones you're most likely to meet:

- **"Couldn't reach GitHub"** or **"couldn't fetch from GitHub"?** Your internet, not your
  site. Nothing was published. Wait a moment and run `npm run ship` again.
- **"GitHub has changes that aren't on your computer yet"?** Someone (or another
  computer) saved work you don't have. Run `git pull`, look at the site, then ship again —
  publishing without it would put an **older** version live.
- **"Publish blocked — 'production' has commits that 'main' doesn't have"?** The live
  branch has history your preview doesn't. **Don't force anything** — ask for help. This
  one is rare and worth a second pair of eyes.
- **"The connection to GitHub dropped part-way through the upload"?** Genuinely unclear whether it
  landed, so the script won't guess. Just run `npm run ship` again: if it already landed,
  git says "Everything up-to-date" and the checks carry on as normal.
- **"The push failed, for a reason this script can't name"?** Read the error printed just
  above it — most often your own tests failed, and the site is fine until you fix them.
- **"Your copy and GitHub's have BOTH changed"?** You edited here, something else edited
  there. Run `git pull --no-rebase` (the flag matters — a plain `git pull` refuses to
  guess when both sides moved), and if it mentions a **conflict**, ask for help rather
  than guessing. Then `git push`, then ship.
- **"'production' moved while this was publishing"?** Rare, and harmless: something
  published between the check and the upload. Run `npm run ship` again — it re-checks
  and will tell you plainly if anything is actually wrong.
- **"'git fetch' failed, and not for a network reason"?** Not a blip — running it again
  won't help. Read git's own error printed above it; a missing connection to GitHub or
  an expired login both land here.
- **"This branch isn't connected to GitHub yet"?** A brand-new site that has never been
  uploaded. Run `git push -u origin main` once, then ship.
- **"may or may not have landed"?** The publish was stopped part-way (Ctrl-C, say), or the
  script couldn't read git's result. Run `npm run ship` again: if it already landed, git says
  "Everything up-to-date" and the checks carry on as normal.
- **"The publish went out", after a stop?** You stopped it after the upload: the site is being
  published, and only the last check was skipped. In a few minutes, open your live site's
  `/build.txt`: it shows the commit the live site serves.
- **"The site's test port was taken"?** Another test run, or a preview of the site
  (`npm run dev`), is using the port the checks need. Close it, then ship again.
- **"A newer publish followed"?** Someone published again right after you. Your live site's
  `/build.txt` shows which of the two it serves.

With `ship.fromGitHub` switched on (see "On a shared computer" above), you may also meet these:

- **"another publish holds this clone's lock"?** One publish runs at a time. If the message
  says that process is still running, a publish is under way: let it finish. If it isn't
  running (or the script can't tell), an earlier publish was stopped hard and left its lock
  behind. The message gives the command that removes it; first make sure no `git push` from
  that publish is still running.
- **"Left over from an earlier publish that was stopped hard"?** Its temporary copy is still
  there. It blocks nothing. Once nothing is working in it any more, remove it with the command
  the message gives; where the message says to check by hand, its record is damaged, so look
  at that folder yourself (or ask for help) before deleting anything.
- **"this folder's scripts/ship.sh is not the one on GitHub's main"?** The script that
  publishes has to be the one being published. Run it from a copy that is up to date with
  GitHub's `main`.
- **"installing the site's packages in the temporary copy failed"?** Read npm's error just
  above it. The install needs the internet, or packages npm has cached before.
- **"has no runnable scripts/hooks/pre-push"?** GitHub's `main` lacks the pre-push check this
  mode insists on, so it publishes nothing. Ask for help.

When in doubt, ask before you `npm run ship`, `npm run deploy:preview` or `git push` to
`production` — those are the only commands that put anything online.

---

## In an emergency

**Something wrong is live.** The quickest way back is Cloudflare's **Rollback** ("Mistake
already live?" above). To fix it for good, undo the change on `main` (on GitHub, the pull
request that brought it in has a **Revert** button; merge the pull request it makes), then
publish as usual with `npm run ship`.

**`npm run ship` itself is broken**, and the live site needs a fix now. Publish GitHub's
`main` by hand, from the site's folder. It is one command over four lines: copy all of it.

```bash
id="$(git ls-remote origin refs/heads/main | awk '$2 == "refs/heads/main" { print $1 }')" &&
  git -c maintenance.auto=false -c gc.auto=0 fetch -q origin "${id:?}" &&
  git push --no-verify origin "${id:?}:refs/heads/production" &&
  echo "Published $id. The live site's /build.txt should show it in a few minutes."
```

It asks GitHub which commit its `main` branch points at now (that branch alone: a branch
whose name merely ends in `main` is ignored), fetches exactly that commit and publishes it.
The commit's id stays in your terminal, so nothing else that runs in this folder (an
assistant's fetch, say, or the same command in another terminal) can change which commit
goes live; nor do this folder's fetch settings, or a tag that happens to be called `main`. The
two settings keep git from tidying up while it fetches: on a shared folder, a tidy-up can drop
the record of another session's work. If GitHub can't be reached or has no `main`, nothing is
published. `--no-verify` skips the pre-push check on purpose: that
check also runs ship's own test, and ship is the part that may be broken. So nothing checks
this publish. Do it only for a `main` whose checks are green on GitHub, and never add
`--force`. A few minutes later, open your live site's `/build.txt`: it shows the commit the
live site serves, which should be the id the last line printed.

**Is the pre-push check switched on?** `git config --get core.hooksPath` prints
`scripts/hooks` when it is. Anything else, or nothing: run `npm install` once in the site's
folder, which switches it on (unless the site sits inside a bigger repository). On a shared
computer, first ask whoever else works in this folder: they may have set it their own way on
purpose. With `ship.fromGitHub` on, `npm run ship` runs the published commit's own check
whatever this setting says.

---

## For AI assistants — deploy-time guardrails

*This section is written for an AI assistant working in this repo — from here on, "you"
means the assistant. Owner: you can skim it; it explains why the assistant is careful with
links. Assistant: these rules apply to **every** publish, from the site's first deploy on,
not just while it was being built. If this file ever gets translated or rewritten for the
owner, this section must survive the rewrite — translating it is fine, dropping it is not.
The direct `git push` steps above are the OWNER's path; you work through pull requests,
per `AGENTS.md` §2.*

### Always say whether it's PREVIEW or LIVE

A non-technical owner cannot tell a preview URL from the live site. So **every time** you
push to `main` (or they do), state it explicitly. A push to `main` builds nothing on
Cloudflare, so say that too; a Preview exists only after `npm run deploy:preview`:

> ✅ Your changes are on GitHub's `main`. **Nothing is online yet, and nothing is live.** To
> look at them online, run `npm run deploy:preview`; when they look right, run
> `npm run ship` to publish to `<live-domain>`.

Only after `npm run ship` (or a merge into `production`) **and** the Cloudflare build
finishes is it actually live at `<live-domain>`. After `npm run ship` prints
"✓ LIVE — verified" (it polls `/build.txt` until the live site serves the new SHA), announce
it live on that result — no manual re-check needed. When ship reports it could not verify
(the first publish with the new Custom Domain may), confirm by reading the build's
`/build.txt` before announcing ("✅ now live at …"). Deliver these
announcements in the owner's language, like everything else you say to them.

**Which URL to quote.** The Preview alias that `npm run deploy:preview` prints, and the
version URL beside it, are the only Preview addresses. They should answer with `noindex`
(seen on another Worker's Preview; not yet checked on this one). The `*.workers.dev` address is switched off
(`workers_dev: false`) and serves nothing. Whichever URL you quote, **open it and confirm it
loads** rather than reporting it blind. (If a deploy ever prints a `*.pages.dev` URL, stop:
you published the wrong project type.)

### Never request a page on the live domain before its build has finished

(Seen on Cloudflare Pages sites; not yet checked on this Worker. Until it is, treat it as true.)
The edge caches whatever it first sees. If anyone — you, the owner's browser, a link
checker — requests a brand-new path on the live domain while the production build is still
running, a zone cache rule (Cache Everything on HTML) will cache the **404**, and a cached
404 does not reliably self-heal: observed surviving `cf-cache-status: HIT` more than 90
minutes past a 30-minute `max-age`, immune to plain re-requests. Only a **manual dashboard
purge** clears it (Cloudflare dashboard → the zone → Caching → Purge Cache → custom purge by
URL; wrangler's OAuth token has `zone (read)` only and cannot purge programmatically). So:

- Until the production build has finished (the Builds page in the dashboard shows it
  succeeded), verify new pages ONLY on the build's version URL, which the build log prints:
  before it finishes the live domain still serves the *previous* version, so a brand-new path
  404s there no matter how you request it. Check the build without touching the live domain:
  the Builds page in the dashboard must show the intended commit's build as succeeded, or ask
  the owner — NEVER poll the live custom domain to see whether the build is done. (`npm run ship`'s built-in check is the one exception: it polls
  `/build.txt` — a path that exists in every build — with a cache-bust.) Once the build has
  finished, check the live domain with a `?cb=<anything>` cache-bust first (under default
  cache settings that is a distinct cache key, so it cannot poison the bare URL).
- Touch the **bare canonical URL last**, after the build has finished — and only then tell the owner the
  link is safe to open. Announcing a URL before then invites the owner to click it —
  and that first request makes the edge cache the 404 for everyone.
- The same applies to Search Console **Request Indexing**: Googlebot is served the same
  edge cache, so requesting indexing while a stale 404 is cached shows Google exactly the
  wrong thing.
- If a 404 does get cached anyway: ask the owner to run the single-URL purge in the
  Cloudflare dashboard (a human-only step — the assistant has no dashboard access; path
  above), then re-verify.
