// Build check: the first use of every glossary term (or its plural, any case, outside
// headings and inline code) on a page must sit inside a link to that term's own entry
// (/glossary/#anchor, glossary.md#anchor and /glossary#anchor all count). A link to another
// entry, or to an outside source, does not count.
// On the glossary page, a term first used inside its own entry is exempt. A glossary link
// to an entry that does not exist fails too. Reads the Markdown in content/, as written.
// It reads inline links and inline code with single backticks only; a reference link or a
// double-backtick span makes it fail, which says so rather than passing.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fixHref } from '../src/lib/guide-markdown.mjs';

const dir = fileURLToPath(new URL('../content/', import.meta.url));
const read = (f) => readFileSync(join(dir, f), 'utf8');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const blank = (s) => ' '.repeat(s.length);

const glossary = read('glossary.md');
const terms = [...glossary.matchAll(/^## (.+?) \{#([a-z0-9-]+)\}/gm)].map((m) => [m[1], m[2]]);
const anchors = terms.map((t) => t[1]);
if (terms.length === 0) { console.error('✗ glossary check: no terms found in content/glossary.md'); process.exit(1); }
if (new Set(anchors).size !== anchors.length) { console.error('✗ glossary check: duplicate anchors in content/glossary.md'); process.exit(1); }

// search-records.md is a record of what was searched, with the terms in other people's words;
// the draft checker never covered it either, and the page text is kept as checked.
const SKIP = new Set(['search-records.md']);
const problems = [];
const pages = readdirSync(dir).filter((f) => f.endsWith('.md') && !SKIP.has(f)).sort();
for (const page of pages) {
  const text = read(page);
  const lines = text.split('\n').map((l) => (l.startsWith('#') ? blank(l) : l));
  // Targets as the site serves them, so every way of writing a link to an entry compares equal.
  const spans = [...lines.join('\n').matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => [m.index, m.index + m[0].length, fixHref(m[2].trim().split(/\s+/)[0])]);
  let body = lines.join('\n');
  body = body.replace(/`[^`\n]*`/g, blank);
  body = body.replace(/(?<=\])\(([^)]+)\)/g, (m, t) => '(' + ' '.repeat(t.length) + ')');
  for (const [term, anc] of terms) {
    const m = new RegExp('(?<![\\p{L}\\p{N}_-])' + esc(term) + 's?(?![\\p{L}\\p{N}_-])', 'iu').exec(body);
    if (!m) continue;
    const want = '/glossary#' + anc;
    if (spans.some(([a, b, t]) => a <= m.index && m.index < b && (t === want || (page === 'glossary.md' && t === '#' + anc)))) continue;
    if (page === 'glossary.md') {
      const own = new RegExp('^## ' + esc(term) + ' \\{', 'm').exec(text);
      if (own) {
        const end = text.indexOf('\n## ', own.index + own[0].length);
        if (own.index < m.index && m.index < (end > 0 ? end : text.length)) continue;
      }
    }
    problems.push(`${page}: the first "${m[0]}" is not linked to ${want}: ...${body.slice(Math.max(0, m.index - 40), m.index + m[0].length + 20).replace(/\n/g, ' ')}`);
  }
  for (const [, , t] of spans) {
    // A bare #id is a link within the page; it points at an entry only on the glossary page.
    const mm = page === 'glossary.md' ? /^(?:\/glossary)?#([a-z0-9-]+)$/.exec(t) : /^\/glossary#([a-z0-9-]+)$/.exec(t);
    if (mm && !anchors.includes(mm[1])) problems.push(`${page}: a link to the glossary entry #${mm[1]}, which does not exist`);
  }
}
if (problems.length) {
  for (const p of problems) console.error('✗ glossary check: ' + p);
  process.exit(1);
}
console.log(`✓ glossary check: ${pages.length} pages, ${terms.length} terms, every first use linked to its own entry`);
