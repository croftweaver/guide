import { test, expect, type Page } from '@playwright/test';
import { PAGES } from './_helpers';

// A code block that scrolls sideways inside its own box is hard to read on a phone, and axe flags it as a scrollable
// region. src/styles/global.css wraps long lines (pre-wrap), so no block should scroll. tests/tables.spec.ts looks at
// the page and at .table-wrap only: a block scrolling inside itself would pass it. A page with no blocks passes here.

const PHONES = [360, 320];

// How many blocks are wider than their box, and a sample for the message.
const scrolling = (page: Page) =>
  page.locator('pre').evaluateAll((pres) =>
    pres.filter((p) => p.scrollWidth > p.clientWidth + 1).map((p) => (p.textContent ?? '').slice(0, 60)));

for (const width of PHONES) {
  for (const path of PAGES) {
    test(`code blocks — on ${path} at ${width}px no block scrolls sideways`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      expect(await scrolling(page), `these blocks scroll inside their box at ${width}px`).toEqual([]);
    });
  }
}

// The check must be able to fail: with wrapping turned off the cheat sheet's long lines scroll inside their block.
for (const width of PHONES) {
  test(`code blocks — the check fails on /seo-cheat-sheet at ${width}px with wrapping turned off`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/seo-cheat-sheet');
    expect((await page.locator('pre').count()), 'the page has no code blocks, so the check would pass on nothing').toBeGreaterThan(0);
    await page.addStyleTag({ content: 'pre { white-space: pre !important; }' });
    expect((await scrolling(page)).length, 'no block scrolls with wrapping off, so the check cannot fail').toBeGreaterThan(0);
  });
}
