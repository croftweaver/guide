// Build check: the first use of every glossary term (or its plural with an "s", any case,
// outside headings and code) on a page must sit inside a link to that term's own entry. A link
// to another entry, or to an outside source, does not count; on the glossary page a term first
// used inside its own entry is exempt. A link to a glossary anchor that does not exist fails too.
// It reads the HTML the site's own Markdown settings produce, not the Markdown, so any way of
// writing a link, heading or code block is read as the site reads it.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { guideMarkdown } from '../src/lib/guide-markdown.mjs';

// GLOSSARY_CONTENT_DIR lets tests/glossary-check.spec.ts run this on probe pages.
const dir = process.env.GLOSSARY_CONTENT_DIR ?? fileURLToPath(new URL('../content/', import.meta.url));
const renderer = await guideMarkdown.createRenderer();
const html = async (f) => (await renderer.render(readFileSync(join(dir, f), 'utf8'))).code;
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

const BLOCK = /^(?:p|li|ul|ol|blockquote|div|table|thead|tbody|tr|th|td|pre|code|hr|section|h[1-6])$/;
// The page as prose: `text` has headings and code blanked to a sentinel (same length), and `marks`
// says, for each character, which link it sits in (its href) and which glossary entry it is under.
function read(html) {
  const source = html.replace(/<!--[\s\S]*?-->/g, '');
  const hrefs = [];
  let text = '';
  const marks = [];
  const ids = [];
  const headings = [];
  // A character no term contains, in place of excluded text and at block and code edges, so a
  // term cannot form across them (Search / Console in two paragraphs, or around code).
  const edge = () => { text += '\u0001'; marks.push({ href, entry, link }); };
  let inCode = 0, inHeading = 0, link = 0, href = null, entry = null, headingText = '', headingId = null;
  for (const m of source.matchAll(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+)/g)) {
    if (m[4] !== undefined) {
      const t = decode(m[4]);
      if (inHeading) headingText += t;
      // Code and heading text become a character no term contains, so a term cannot form across them.
      const shown = inCode || inHeading ? '\u0001'.repeat(t.length) : t;
      text += shown;
      for (let i = 0; i < t.length; i++) marks.push({ href, entry, link });
      continue;
    }
    const [, close, tag, attrs] = m;
    const name = tag.toLowerCase();
    if (name === 'br') {
      if (inCode || inHeading) edge(); else { text += ' '; marks.push({ href, entry, link }); }
      continue;
    }
    if (BLOCK.test(name)) edge();
    if (name === 'pre' || name === 'code') inCode += close ? -1 : 1;
    else if (/^h[1-6]$/.test(name)) {
      if (close) {
        inHeading--;
        if (name === 'h2' && headingId) headings.push([headingText.trim(), headingId]);
      } else {
        inHeading++;
        headingText = '';
        headingId = /\sid="([^"]*)"/.exec(attrs)?.[1] ?? null;
        if (headingId) ids.push(headingId);
        if (name === 'h2') entry = headingId;
      }
    } else if (name === 'a') {
      href = close ? null : decode(/\shref="([^"]*)"/.exec(attrs)?.[1] ?? '');
      if (href !== null) { hrefs.push(href); link++; }
    }
  }
  return { text, marks, ids, headings, hrefs };
}

const glossary = read(await html('glossary.md'));
const terms = glossary.headings;
const anchors = glossary.ids;
if (terms.length === 0) { console.error('✗ glossary check: no terms found in content/glossary.md'); process.exit(1); }
if (new Set(anchors).size !== anchors.length) { console.error('✗ glossary check: duplicate anchors in content/glossary.md'); process.exit(1); }

// search-records.md is a record of what was searched, with the terms in other people's words;
// the draft checker never covered it either, and the page text is kept as checked.
const SKIP = new Set(['search-records.md']);
const problems = [];
const pages = readdirSync(dir).filter((f) => f.endsWith('.md') && !SKIP.has(f)).sort();
for (const page of pages) {
  const isGlossary = page === 'glossary.md';
  const { text, marks, hrefs } = isGlossary ? glossary : read(await html(page));
  for (const h of new Set(hrefs)) {
    // A bare #id is a link within the page; it points at an entry only on the glossary page.
    const mm = isGlossary ? /^(?:\/glossary)?#(.+)$/.exec(h) : /^\/glossary#(.+)$/.exec(h);
    if (mm && !anchors.includes(mm[1])) problems.push(`${page}: a link to #${mm[1]}, which is no anchor on the glossary page`);
  }
  for (const [term, anc] of terms) {
    const m = new RegExp('(?<![\\p{L}\\p{N}_-])' + esc(term).replace(/ /g, '\\s+') + 's?(?![\\p{L}\\p{N}_-])', 'iu').exec(text);
    if (!m) continue;
    const { entry } = marks[m.index];
    const want = '/glossary#' + anc;
    // Every character of the term must sit inside one single link to its entry.
    const span = marks.slice(m.index, m.index + m[0].length);
    const inLink = (h) => span.every((mk) => mk.href === h && mk.link === span[0].link);
    if (inLink(want) || (isGlossary && inLink('#' + anc))) continue;
    if (isGlossary && entry === anc) continue;
    problems.push(`${page}: the first "${m[0]}" is not linked to ${want}: ...${text.slice(Math.max(0, m.index - 40), m.index + m[0].length + 20).replace(/\s+/g, ' ')}`);
  }
}
if (problems.length) {
  for (const p of [...new Set(problems)]) console.error('✗ glossary check: ' + p);
  process.exit(1);
}
console.log(`✓ glossary check: ${pages.length} pages, ${terms.length} terms, every first use linked to its own entry`);
