import { test, expect, type Page } from '@playwright/test';

// The two short cheat sheets stay short: at most 800 words and no code block. The long look-up material lives on
// /seo-reference. The real pages and the probes go through the same function, and a probe that is too long, or that
// holds a code block, must fail by name, or the check could pass checking nothing.

const MAX_WORDS = 800;
const SHEETS = ['/seo-cheat-sheet', '/ai-search-cheat-sheet'];

// The words of the page's article as a reader sees them, and how many code blocks it holds.
async function measure(page: Page): Promise<{ words: number; blocks: number }> {
  return page.evaluate(() => {
    const article = document.querySelector('main > article')!;
    const text = (article as HTMLElement).innerText.trim();
    return { words: text.split(/\s+/).filter(Boolean).length, blocks: article.querySelectorAll('pre').length };
  });
}

function problems(path: string, { words, blocks }: { words: number; blocks: number }): string[] {
  const out: string[] = [];
  if (words > MAX_WORDS) out.push(`${path} has ${words} words, over the ${MAX_WORDS} a cheat sheet may have`);
  if (blocks > 0) out.push(`${path} has ${blocks} code block${blocks === 1 ? '' : 's'}, and a cheat sheet has none`);
  return out;
}

for (const path of SHEETS) {
  test(`cheat sheet length — ${path} is at most ${MAX_WORDS} words and has no code block`, async ({ page }) => {
    await page.goto(path);
    const m = await measure(page);
    expect(m.words, `${path} has no words, so the count would pass on nothing`).toBeGreaterThan(100);
    expect(problems(path, m)).toEqual([]);
  });
}

test('cheat sheet length — a sheet padded past the cap fails, and names the page', async ({ page }) => {
  await page.goto('/seo-cheat-sheet');
  await page.evaluate((n) => {
    const p = document.createElement('p');
    p.textContent = Array.from({ length: n }, () => 'word').join(' ');
    document.querySelector('main > article')!.append(p);
  }, MAX_WORDS);
  expect(problems('/seo-cheat-sheet', await measure(page))).toEqual([expect.stringMatching(/^\/seo-cheat-sheet has \d+ words, over the 800/)]);
});

test('cheat sheet length — a sheet with a code block fails, and names the page', async ({ page }) => {
  await page.goto('/ai-search-cheat-sheet');
  await page.evaluate(() => {
    const pre = document.createElement('pre');
    pre.textContent = 'User-agent: *';
    document.querySelector('main > article')!.append(pre);
  });
  expect(problems('/ai-search-cheat-sheet', await measure(page))).toEqual(['/ai-search-cheat-sheet has 1 code block, and a cheat sheet has none']);
});
