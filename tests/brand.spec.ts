import { test, expect } from '@playwright/test';
import { SITE } from '../src/config';

// croftweaver.com's colours, written out by hand: a token changed in global.css or a theme
// colour changed in only one place fails here. a11y.spec.ts checks the contrast of what shows.
const tokens = (page: import('@playwright/test').Page, names: string[]) =>
  page.evaluate((list) => Object.fromEntries(list.map((n) => [n, getComputedStyle(document.documentElement).getPropertyValue(n).trim()])), names);

test('colours — light: moss green brand and accent on a warm off-white page', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('theme', 'light'); } catch { /* ignore */ } });
  await page.goto('/');
  expect(await tokens(page, ['--brand', '--accent', '--bg'])).toEqual({ '--brand': '#2e6e4e', '--accent': '#2e6e4e', '--bg': '#fbfaf6' });
});

test('colours — dark: light green links and text on near-black green', async ({ page }) => {
  await page.addInitScript(() => { try { localStorage.setItem('theme', 'dark'); } catch { /* ignore */ } });
  await page.goto('/');
  expect(await tokens(page, ['--accent', '--link', '--muted', '--bg'])).toEqual({
    '--accent': '#8fd4ab', '--link': '#a3e0bc', '--muted': '#a2ac9f', '--bg': '#0e1310',
  });
});

test('colours — the phone address bar and the installed icon use moss green', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#2e6e4e');
  expect(SITE.themeColor).toBe('#2e6e4e');
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.theme_color).toBe('#2e6e4e');
  expect(manifest.background_color).toBe('#fbfaf6');
});

test('files — the logo and the home-screen icon answer 200, and the schema names the logo', async ({ page, request }) => {
  for (const path of ['/images/logo.png', '/apple-touch-icon.png']) {
    expect((await request.get(path)).status(), `${path} should return 200`).toBe(200);
  }
  await page.goto('/');
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => JSON.parse(e.textContent ?? '{}')));
  const organization = schemas.find((s) => s['@type'] === 'Organization');
  expect(organization?.logo).toBe('https://guide.croftweaver.com/images/logo.png');
});
