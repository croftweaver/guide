// Central site configuration. Edit company facts / analytics HERE only — Base.astro,
// schema, llms.txt and the tests all read from this single source. Keep SITE.url in
// sync with `site:` in astro.config.mjs.

export const SITE = {
  url: 'https://guide.croftweaver.com',          // production origin, no trailing slash
  name: 'Croftweaver Guide',
  legalName: 'Croftweaver',
  locale: 'en',
  themeColor: '#000000',               // matches the brand primary + manifest
  // Home <title> is special-cased (NOT "Croftweaver Guide | Croftweaver Guide"). Keep ≤ 60 chars.
  titleHome: 'Get found on Google and in AI answers | Croftweaver Guide',
  tagline: 'A free guide to being found on Google and in AI answers.',
  // 120–160 chars: default meta description + Organization/WebPage schema text.
  description:
    'A free guide for people who run a website and would rather not learn jargon. ' +
    'Every claim about Google or AI names its source, and links it.',
} as const;

// og:locale derivation — ONE implementation shared by Base.astro (emission)
// and tests/seo.spec.ts (assertion), so they can't drift: 'de' → de_DE via
// the map; regioned tags use base + region ('de-AT' → de_AT); unmapped bases
// return undefined (og:locale is optional; a wrong en_US would contradict
// inLanguage).
export const OG_LOCALES: Record<string, string | undefined> = { en: 'en_US', de: 'de_DE', fr: 'fr_FR', es: 'es_ES', it: 'it_IT' };
export function ogLocaleFor(lang: string): string | undefined {
  const [base = '', ...rest] = lang.toLowerCase().split('-');
  const region = rest.at(-1);
  return region && region.length === 2 ? `${base}_${region.toUpperCase()}` : OG_LOCALES[base];
}

export const COMPANY = {
  legalName: 'Croftweaver',
  logo: '/images/logo.png',            // resolved against SITE.url for schema
} as const;

// External profiles that corroborate the entity (EEAT). Only ship URLs that
// resolve — a broken sameAs is worse than none. .filter(Boolean) drops the slots.
export const SAME_AS: string[] = [
  // 'https://www.linkedin.com/company/…',
  // 'https://github.com/…',
].filter(Boolean);

// Topics the site is authoritative on (schema knowsAbout).
export const KNOWS_ABOUT: string[] = [];

// Plausible (cookieless; scriptHost is https://plausible.io for the paid cloud
// version, or your own self-hosted instance). Fire only on the production
// deploy: Cloudflare Pages sets CF_PAGES_BRANCH to the branch being built.
//
// The privacy policy is croftweaver.com's (this site has no copy): "the privacy page" below
// means that one, and it must name the analytics before USE_ANALYTICS goes to true.
// tests/privacy-host.spec.ts reads this site's own pages only, so it checks nothing while the
// policy is elsewhere: the host named there is a manual check.
//
// The starter ships with analytics OFF (USE_ANALYTICS = false): no build, the live one
// included, writes the script or the stub, and nothing on the page sends anything to an
// analytics host. A site without analytics keeps it that way and deletes the analytics
// paragraphs of section 3 of the privacy page.
//
// To switch Plausible on: set USE_ANALYTICS to true, fill in scriptHost and scriptId
// below, and add the same host to script-src and connect-src in public/_headers. Keep the
// privacy page's analytics paragraphs and fill their slots. Then run
// `bash tests/check_analytics_gate.sh` (a site's CI does not): it checks the builds and
// the headers, either way. Off or on, leave scriptHost and scriptId in place: Base.astro
// and tests/privacy-host.spec.ts read them. Email links and the contact form work either
// way. They count a tap only with analytics on, through the script on the page. Left off by
// mistake, Plausible gets no data and nothing says so.
//
// scriptId is the per-site script Plausible's installer shows (the site's installation
// page, <scriptHost>/<your domain>/installation): in <script src=".../js/pa-AbC123.js"> it is
// the part between "/js/" and ".js", here 'pa-AbC123'. The domain and the optional
// measurements (outbound links, file downloads, form submissions) are switched in
// Plausible, not here. Section 3 of the privacy page has one slot sentence for each:
// keep a sentence only if its own measurement is ticked. A scriptHost or scriptId left
// as the placeholder loads nothing (the browser reports a failed request; the build
// does not).
// With analytics on, changing scriptHost also means changing script-src and connect-src
// in public/_headers; tests/check_analytics_gate.sh checks both against this file. It
// also means changing the host named in section 3 of the privacy page, in the
// sentence on refusing the measurement; tests/privacy-host.spec.ts checks that one
// once its slot is filled.
// Base.astro writes two tags: the script, and the short
// stub that calls plausible.init(); without the stub the script never starts.
//
// The site's one conversion, the "Email Tap" event, is sent from src/components/EmailLink.astro (and public/js/mail-form.js when
// the contact form is installed). It needs a goal named exactly "Email Tap" in Plausible before launch. Plausible
// counts a custom event as interaction, so a visit with a tap is not a bounce (its default,
// kept on purpose). Another analytics tool means changing those two calls and section 3 of
// the privacy page.
//
// IMPORTANT: PROD_BRANCH must equal the branch Cloudflare Pages calls "Production"
// for THIS project (house convention: 'production'; Cloudflare's default is 'main').
// A mismatch means analytics silently never loads — no error, no data.
//
// This site runs on Workers with no Function, so there is only the script mode: the Pages
// Function that a server mode needs (page views and the email tap counted on the server) was
// removed with functions/. tests/check_analytics_gate.sh refuses any other mode.
// IMPORTANT: PROD_BRANCH must equal the branch the live build runs on ('production'). A
// mismatch means analytics silently never loads — no error, no data. CF_PAGES_BRANCH is a
// Pages variable that Workers Builds does not set, so with USE_ANALYTICS true the live build
// writes no tag until the build sets it.
export const PROD_BRANCH = 'production';

// Keep the value on one line: tests/check_analytics_gate.sh reads it.
export const USE_ANALYTICS = false;

// Writes <meta name="generator" content="Croftweaver"> into every page's head: in the code,
// not shown on the page, no link, nothing sent. Set to false to remove it.
export const GENERATOR_TAG: boolean = true;

export const ANALYTICS = {
  enabled: USE_ANALYTICS && process.env.CF_PAGES_BRANCH === PROD_BRANCH,
  mode: 'script' as 'script', // keep on one line: tests/check_analytics_gate.sh reads it
  scriptHost: 'https://analytics.example.com',
  scriptId: 'pa-XXXXXXXXXXXXXXXXXXXX',
} as const;
