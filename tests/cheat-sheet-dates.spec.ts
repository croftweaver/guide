import { test, expect, type Page } from '@playwright/test';

// The SEO reference says, section by section, when its sources were last opened and when they are due again; each short
// cheat sheet says it once, in one line before its first section. A reader can see how old a row is.
// This checks the structure, not the clock: it never compares a date with today, so the build does not turn red when a
// date goes by with nothing changed; the quarterly re-check moves the dates.
// It reads the built page, not the Markdown. On the reference a date line counts only as a paragraph directly under its
// H2; on a short sheet every paragraph of the article is counted, so a second line anywhere fails. Either way a line in
// a code block or a comment never counts, whatever way the Markdown wrote it. The real pages and the probes go through
// the same functions, and a probe with a date line removed must fail, or the check could pass checking nothing.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE = `(\\d{1,2}) (${MONTHS.join('|')}) (\\d{4})`;
const LINE = new RegExp(`^Checked on ${DATE} · next check by ${DATE}$`);

// Three months on: the same day number; where that month is shorter, its last day (31 August gives 30 November).
function threeMonthsOn(day: number, month: number, year: number): [number, number, number] {
  const m = month + 3;
  const y = year + Math.floor(m / 12);
  const mm = m % 12;
  return [Math.min(day, new Date(Date.UTC(y, mm + 1, 0)).getUTCDate()), mm, y];
}

const real = (d: string, mo: string, y: string) =>
  Number(d) >= 1 && Number(d) <= new Date(Date.UTC(Number(y), MONTHS.indexOf(mo) + 1, 0)).getUTCDate();

type Section = { heading: string; paragraphs: string[] };

// Each H2 that is a direct child of the page's article (one inside a list or a quote is not a section) with the text of the paragraphs that are its direct children, up to the next H2.
async function sections(page: Page): Promise<Section[]> {
  return page.evaluate(() => {
    const out: { heading: string; paragraphs: string[] }[] = [];
    for (const h2 of Array.from(document.querySelectorAll('main > article > h2'))) {
      const paragraphs: string[] = [];
      for (let el = h2.nextElementSibling; el && el.tagName !== 'H2'; el = el.nextElementSibling) {
        if (el.tagName === 'P') paragraphs.push((el.textContent ?? '').trim());
      }
      out.push({ heading: (h2.textContent ?? '').trim(), paragraphs });
    }
    return out;
  });
}

// One string per section that has no date line, a date that does not exist, or a wrong next-check date.
function dateProblems(found: Section[]): string[] {
  if (found.length === 0) return ['the page has no H2 section, so there is nothing to check'];
  const problems: string[] = [];
  for (const { heading, paragraphs } of found) {
    const m = paragraphs.map((p) => p.match(LINE)).find((x) => x !== null);
    if (!m) {
      problems.push(`"${heading}" has no "Checked on … · next check by …" line`);
      continue;
    }
    const [, d1, m1, y1, d2, m2, y2] = m;
    if (!real(d1!, m1!, y1!) || !real(d2!, m2!, y2!)) {
      problems.push(`"${heading}": "${m[0]}" has a day that does not exist in its month`);
      continue;
    }
    const want = threeMonthsOn(Number(d1), MONTHS.indexOf(m1!), Number(y1));
    const got = [Number(d2), MONTHS.indexOf(m2!), Number(y2)];
    if (want.join() !== got.join()) {
      problems.push(`"${heading}": next check is ${d2} ${m2} ${y2}, not ${want[0]} ${MONTHS[want[1]]} ${want[2]}, three months after ${d1} ${m1} ${y1}`);
    }
  }
  return problems;
}

test('cheat sheet dates — every section of the real /seo-reference has its date line, three months apart', async ({ page }) => {
  await page.goto('/seo-reference');
  const found = await sections(page);
  expect(found.length, 'the page has its nine sections').toBe(9);
  expect(dateProblems(found)).toEqual([]);
});

test('cheat sheet dates — the real /seo-reference with one date line removed fails, and names the section', async ({ page }) => {
  await page.goto('/seo-reference');
  await page.evaluate(() => {
    const h2 = Array.from(document.querySelectorAll('main > article > h2')).find((h) => h.textContent === 'Tags on a page')!;
    for (let el = h2.nextElementSibling; el && el.tagName !== 'H2'; el = el.nextElementSibling) {
      if (el.tagName === 'P' && el.textContent!.startsWith('Checked on')) {
        el.remove();
        break;
      }
    }
  });
  expect(dateProblems(await sections(page))).toEqual(['"Tags on a page" has no "Checked on … · next check by …" line']);
});

// The short sheets: exactly one date line in the whole article, before the first H2 (plan scenario S8).
type Lines = { before: string[]; after: string[] };

// Every paragraph of the article that starts "Checked on", split by whether it comes before the first H2 or after it.
async function dateLines(page: Page): Promise<Lines> {
  return page.evaluate(() => {
    const first = document.querySelector('main > article > h2');
    const out: { before: string[]; after: string[] } = { before: [], after: [] };
    for (const p of Array.from(document.querySelectorAll('main > article p'))) {
      const text = (p.textContent ?? '').trim();
      if (!text.startsWith('Checked on')) continue;
      const after = first !== null && Boolean(first.compareDocumentPosition(p) & Node.DOCUMENT_POSITION_FOLLOWING);
      (after ? out.after : out.before).push(text);
    }
    return out;
  });
}

// One string per fault: no line, more than one, one below the first H2, or a line whose dates are wrong.
function oneLineProblems({ before, after }: Lines): string[] {
  const all = [...before, ...after];
  if (all.length === 0) return ['the page has no "Checked on … · next check by …" line'];
  if (all.length > 1) return [`the page has ${all.length} date lines, and one is expected`];
  if (before.length === 0) return ['the date line comes after the first H2, and it belongs before it'];
  return dateProblems([{ heading: 'the page', paragraphs: before }]);
}

const SHEETS = ['/seo-cheat-sheet', '/ai-search-cheat-sheet'];
for (const path of SHEETS) {
  test(`cheat sheet dates — ${path} has one date line before its first section, three months apart`, async ({ page }) => {
    await page.goto(path);
    expect(oneLineProblems(await dateLines(page))).toEqual([]);
  });
}

test('cheat sheet dates — a sheet with its date line removed fails', async ({ page }) => {
  await page.goto('/seo-cheat-sheet');
  await page.evaluate(() => {
    Array.from(document.querySelectorAll('main > article p')).find((p) => p.textContent!.startsWith('Checked on'))!.remove();
  });
  expect(oneLineProblems(await dateLines(page))).toEqual(['the page has no "Checked on … · next check by …" line']);
});

test('cheat sheet dates — a sheet with a second date line under an H2 fails', async ({ page }) => {
  await page.goto('/ai-search-cheat-sheet');
  await page.evaluate(() => {
    const p = document.createElement('p');
    p.textContent = 'Checked on 17 November 2026 · next check by 17 February 2027';
    document.querySelector('main > article > h2')!.after(p);
  });
  expect(oneLineProblems(await dateLines(page))).toEqual(['the page has 2 date lines, and one is expected']);
});

test('cheat sheet dates — a sheet with its date line moved below the first H2 fails', async ({ page }) => {
  await page.goto('/seo-cheat-sheet');
  await page.evaluate(() => {
    const line = Array.from(document.querySelectorAll('main > article p')).find((p) => p.textContent!.startsWith('Checked on'))!;
    document.querySelector('main > article > h2')!.after(line);
  });
  expect(oneLineProblems(await dateLines(page))).toEqual(['the date line comes after the first H2, and it belongs before it']);
});

// Probe pages for the date rule itself: [name, the line, whether it must pass].
const CASES: [string, string, boolean][] = [
  ['three months later passes', 'Checked on 17 November 2026 · next check by 17 February 2027', true],
  ['31 August gives 30 November', 'Checked on 31 August 2026 · next check by 30 November 2026', true],
  ['31 August to 1 December fails', 'Checked on 31 August 2026 · next check by 1 December 2026', false],
  ['a year-end wrap passes', 'Checked on 15 November 2026 · next check by 15 February 2027', true],
  ['two months later fails', 'Checked on 17 November 2026 · next check by 17 January 2027', false],
  ['four months later fails', 'Checked on 17 November 2026 · next check by 17 March 2027', false],
  ['31 February does not exist', 'Checked on 31 February 2026 · next check by 31 May 2026', false],
  ['day 0 does not exist', 'Checked on 0 November 2026 · next check by 0 February 2027', false],
  ['a date line with the "next check" half missing fails', 'Checked on 17 November 2026', false],
  ['a date that is long past still passes (the clock is not read)', 'Checked on 3 March 2020 · next check by 3 June 2020', true],
];
for (const [name, line, ok] of CASES) {
  test(`cheat sheet dates — ${name}`, async ({ page }) => {
    await page.setContent(`<main><article><h2>One section</h2><p>${line}</p><p>Text.</p></article></main>`);
    expect(dateProblems(await sections(page)).length === 0, line).toBe(ok);
  });
}

const LINE_OK = 'Checked on 17 November 2026 · next check by 17 February 2027';
const NOT_A_DATE_LINE: [string, string][] = [
  ['a code block', `<pre><code>${LINE_OK}</code></pre>`],
  ['an HTML comment', `<!-- ${LINE_OK} -->`],
  ['a list item', `<ul><li>${LINE_OK}</li></ul>`],
  ['a table cell', `<table><tr><td>${LINE_OK}</td></tr></table>`],
  ['a heading of its own inside a list item', `<ul><li><h2>Nested</h2><p>${LINE_OK}</p></li></ul>`],
  ['a heading of its own inside a quote', `<blockquote><h2>Nested</h2><p>${LINE_OK}</p></blockquote>`],
];
for (const [name, html] of NOT_A_DATE_LINE) {
  test(`cheat sheet dates — a date line in ${name} does not count`, async ({ page }) => {
    await page.setContent(`<main><article><h2>One section</h2>${html}</article></main>`);
    expect(dateProblems(await sections(page))).toEqual(['"One section" has no "Checked on … · next check by …" line']);
  });
}
