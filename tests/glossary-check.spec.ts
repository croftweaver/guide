import { test, expect } from '@playwright/test';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// scripts/check-glossary-links.mjs decides whether the build may run. Each case writes one probe
// page next to the real glossary and runs the checker on that folder; a check that cannot fail
// would let an unlinked first use through, so the failing cases matter as much as the passing ones.
const root = process.cwd();
const run = (dir?: string) =>
  spawnSync('node', ['scripts/check-glossary-links.mjs'], {
    cwd: root,
    encoding: 'utf8',
    env: { ...process.env, ...(dir ? { GLOSSARY_CONTENT_DIR: dir + '/' } : {}) },
  });

test('glossary check — the real pages pass, entered the way npm run build enters it', () => {
  const r = run();
  expect(r.status, r.stderr).toBe(0);
  expect(r.stdout).toContain('every first use linked to its own entry');
});

const CASES: [string, string, boolean][] = [
  ['an unlinked term fails', 'SEO is shown here.', false],
  ['a linked term passes', '[SEO](/glossary#seo) is shown here.', true],
  ['an unlinked term wrapped over two lines fails', 'Search\nConsole is shown.', false],
  ['a linked term wrapped over two lines passes', '[Search\nConsole](/glossary#search-console) is shown.', true],
  ['an unlinked term over a hard break fails', 'Search\\\nConsole is shown.', false],
  ['a term in an HTML comment, then linked, passes', '<!-- SEO -->\n[SEO](/glossary#seo) is shown.', true],
  ['an image-only link to a missing anchor fails', '[![x](/i.png)](/glossary#missing)', false],
  ['part of a term inside the link fails', '[SE](/glossary#seo)O is shown.', false],
  ['a term in two adjacent links fails', '[SE](/glossary#seo)[O](/glossary#seo) is shown.', false],
  ['a term in one link with emphasis inside passes', '[S*E*O](/glossary#seo) is shown.', true],
  ['words around code do not make a term', 'Search `anything` Console is odd.', true],
  ['words around empty code do not make a term', 'Search <code></code> Console is odd.', true],
  ['words around a heading do not make a term', 'Search\n\n## Unrelated\n\nConsole', true],
  ['words around an empty heading do not make a term', 'Search\n\n##\n\nConsole', true],
  ['words in two paragraphs do not make a term', 'Search\n\nConsole', true],
];

for (const [name, md, ok] of CASES) {
  test(`glossary check — ${name}`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'glossary-check-'));
    try {
      copyFileSync(join(root, 'content/glossary.md'), join(dir, 'glossary.md'));
      writeFileSync(join(dir, 'probe.md'), md + '\n');
      const r = run(dir);
      expect(r.status, r.stdout + r.stderr).toBe(ok ? 0 : 1);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
