import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { PAGES } from './_helpers';
import { SITE, NAV, NAV_LINKS, isNavGroup, type NavLink } from '../src/config';

// The header, ported from croftweaver.com's tests/navigation.spec.ts (be0c35d) for the guide's menu.
// Every test runs against the built site that `npm run verify` serves.

// The menu as written out by hand, not read from NAV: a page dropped from or added to NAV fails here.
const MENU: { group?: string; links: [label: string, href: string][] }[] = [
  { group: 'Basics', links: [
    ['How AI answers work', '/how-ai-answers-work'], ['SEO', '/seo'], ['GEO', '/geo'], ['E-E-A-T', '/eeat'], ['How long', '/how-long'],
  ] },
  { group: 'Your site', links: [
    ['AI crawlers', '/ai-crawlers'], ['llms.txt', '/llms-txt'], ['Structured data', '/schema-and-faq'],
    ["Why AI doesn't mention you", '/why-ai-doesnt-mention-you'],
  ] },
  { group: 'Check', links: [['Check your site', '/check-your-site'], ['AI SEO checklist', '/ai-seo-checklist']] },
  { links: [['Glossary', '/glossary']] },
  { links: [['About', '/about']] },
];
const MENU_HREFS = [...MENU.flatMap((item) => item.links.map(([, href]) => href)), 'https://croftweaver.com/'];

for (const path of PAGES) {
  test(`header — ${path} has the logo link, the tagline and the whole menu in order`, async ({ page }) => {
    await page.goto(path);
    const brand = page.locator('.site-header .brand');
    await expect(brand).toHaveAttribute('href', '/');
    await expect(brand).toHaveAccessibleName('Croftweaver Guide');
    await expect(page.locator('.site-header .tagline')).toHaveText('A free guide to being found on Google and in AI answers.');
    const hrefs = await page.locator('.site-header nav a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs).toEqual(MENU_HREFS);
    const names = await page.locator('.site-header nav .group-button .group-name').allTextContents();
    expect(names).toEqual(['Basics', 'Your site', 'Check']);
    for (const item of MENU) {
      for (const [label, href] of item.links) {
        await expect(page.locator(`.site-header nav a[href="${href}"]`), `${label} is not named ${label}`).toHaveText(label);
      }
    }
    await expect(page.locator('.site-header nav a[href="https://croftweaver.com/"]')).toHaveText('croftweaver.com');
  });
}

// The page whose link is current is marked on a laptop: underlined link, underlined group name.
// A page that is in no menu (/search-records) marks nothing.
test('header — on /geo the GEO link and the Basics group are marked and underlined', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/geo');
  const geo = page.locator('.site-header nav a[href="/geo"]');
  const basics = page.locator('.site-header nav').getByRole('button', { name: 'Basics', exact: true });
  await basics.click();
  await expect(geo).toHaveAttribute('aria-current', 'page');
  await expect(basics).toHaveAttribute('aria-current', 'true');
  expect(await geo.evaluate((el) => getComputedStyle(el).textDecorationLine)).toBe('underline');
  expect(await basics.locator('.group-name').evaluate((el) => getComputedStyle(el).textDecorationLine)).toBe('underline');
});

test('header — on /search-records no menu link and no group is current', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/search-records');
  await expect(page.locator('.site-header [aria-current]')).toHaveCount(0);
});

const PHONE = { width: 375, height: 812 };
const DESKTOP = { width: 1280, height: 800 };
type PageT = import('@playwright/test').Page;
const headerLinks = (page: PageT) => page.locator('.site-header nav a');
const groups = NAV.filter(isNavGroup);
const groupButton = (page: PageT, label: string) => page.locator('.site-header nav').getByRole('button', { name: label, exact: true });
const navLink = (page: PageT, href: string) => page.locator(`.site-header nav a[href="${href}"]`);
const openGroups = (page: PageT) => page.locator('.site-header nav .group-button[aria-expanded="true"]');
// How many rows the top-level items stand in: the distinct vertical centres, in 10-pixel bands.
const itemRows = (page: PageT) => page.locator('.site-header nav > ul > li').evaluateAll((lis) =>
  new Set(lis.map((li) => { const b = li.getBoundingClientRect(); return Math.round((b.top + b.height / 2) / 10); })).size);

// `astro preview` does not send public/_headers, so the header tests that open a group run on pages served with the
// site's own Content-Security-Policy, read from that file, and collect what the browser refuses.
//
// The policies are those under the `/*` rule of the file, joined with a comma (the browser enforces each policy of such a
// header). A policy under any other path would need matching logic, so it is refused here instead of being applied to
// pages it is not for.
function siteCspPolicies(): string[] {
  const policies: string[] = [];
  let rule = '';
  for (const line of readFileSync(new URL('../public/_headers', import.meta.url), 'utf8').split('\n')) {
    if (/^\S/.test(line) && !line.startsWith('#')) rule = line.trim();
    const m = line.match(/^\s+Content-Security-Policy:\s*(.+)$/);
    if (!m) continue;
    expect(rule, `public/_headers has a Content-Security-Policy under "${rule || '(no path rule above it)'}": withSiteCsp only handles the global /* rule`).toBe('/*');
    policies.push(m[1]!);
  }
  expect(policies.length, 'public/_headers has no Content-Security-Policy under /*').toBeGreaterThan(0);
  return policies;
}

async function withSiteCsp(page: PageT): Promise<string[]> {
  const csp = siteCspPolicies().join(', ');
  const refused: string[] = [];
  page.on('console', (m) => { if (/content security policy|refused to/i.test(m.text())) refused.push(m.text()); });
  await page.route('**/*', async (route) => {
    if (route.request().resourceType() !== 'document') return route.continue();
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), 'content-security-policy': csp! } });
  });
  return refused;
}

// The narrowest width, probed in steps of 4 px from 480 up to 1400 (it fails if none unfolds), at which the Menu button is gone and the items stand in the header (the fold).
async function narrowestUnfolded(page: PageT): Promise<number> {
  for (let width = 480; width <= 1400; width += 4) {
    await page.setViewportSize({ width, height: 800 });
    if (await page.evaluate(() => getComputedStyle(document.querySelector('.site-header .menu-button')!).display === 'none')) return width;
  }
  throw new Error('the Menu button shows at every width up to 1400 px');
}

test('header — on a phone the menu is folded, opens on its button and closes on Escape', async ({ page }) => {
  await page.setViewportSize(PHONE);
  await page.goto('/geo');
  const button = page.locator('.site-header .menu-button');
  const nav = page.locator('.site-header nav');
  await expect(button, 'no menu button on a phone').toBeVisible();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(nav, 'the menu is open before anyone asked').toBeHidden();

  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  for (const item of NAV_LINKS) {
    await expect(nav.getByRole('link', { name: item.label, exact: true }), `${item.label} is not in the open menu`).toBeVisible();
  }
  for (const group of groups) {
    await expect(nav.locator('.group-label', { hasText: group.label }), `the name "${group.label}" is not shown above its links`).toBeVisible();
    await expect(nav.getByRole('list', { name: group.label, exact: true }), `the list of "${group.label}" has no accessible name`).toBeVisible();
  }
  await expect(nav.locator('.group-button:visible'), 'a group button shows on a phone').toHaveCount(0);
  await expect(nav.getByRole('link', { name: 'croftweaver.com', exact: true })).toHaveAttribute('href', 'https://croftweaver.com/');
  for (const target of [button, ...(await headerLinks(page).all())]) {
    const box = await target.boundingBox();
    expect(box!.height, `"${await target.innerText()}" is shorter than the 44px tap target`).toBeGreaterThanOrEqual(44);
  }

  // The button names the element it opens, and that element exists.
  expect(await page.locator(`#${await button.getAttribute('aria-controls')}`).count(), 'aria-controls names no element').toBe(1);

  // Escape with focus on a link: the link is about to be hidden, so focus goes to the button.
  await headerLinks(page).first().focus();
  await page.keyboard.press('Escape');
  await expect(nav, 'Escape did not close the menu').toBeHidden();
  await expect(button, 'focus was lost with the hidden link').toBeFocused();

  // The button closes what it opened.
  await button.click();
  await expect(nav).toBeVisible();
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(nav, 'a second press did not close the menu').toBeHidden();
});

test('header — Escape closes the open menu without taking focus from the page', async ({ page }) => {
  await page.setViewportSize(PHONE);
  await page.goto('/geo');
  await page.locator('.site-header .menu-button').click();
  const link = page.locator('main a[href]').first();
  await link.focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('.site-header nav')).toBeHidden();
  await expect(link, 'Escape moved focus away from where the visitor was').toBeFocused();
});

// The home page and an inner page: both must fit with the tagline under the logo.
for (const width of [375, 320]) {
  for (const path of ['/', '/geo']) {
    test(`header — the open menu does not make a ${width} px phone scroll sideways on ${path}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 740 });
      await page.goto(path);
      await page.locator('.site-header .menu-button').click();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} scrolls sideways at ${width} px with the menu open`).toBeLessThanOrEqual(0);
    });
  }
}

test('header — every group in NAV holds at least two links (one page stays a plain link)', () => {
  for (const group of groups) {
    expect(group.items.length, `the "${group.label}" group holds one link: a group needs two pages, one stays a plain link`).toBeGreaterThanOrEqual(2);
  }
});

test('header — on a wide screen the top-level items show, each group opens on its button, and the current page is marked', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');
  const nav = page.locator('.site-header nav');
  await expect(page.locator('.site-header .menu-button')).toBeHidden();
  await expect(nav.locator('.group-label:visible'), 'a group name shows beside its button on a wide screen').toHaveCount(0);
  for (const item of NAV) {
    if (isNavGroup(item)) {
      await expect(groupButton(page, item.label), `the "${item.label}" button is not shown`).toBeVisible();
      await expect(groupButton(page, item.label)).toHaveAttribute('aria-expanded', 'false');
      for (const link of item.items) {
        await expect(navLink(page, link.href), `${link.label} is not in the page at all`).toHaveCount(1);
        await expect(navLink(page, link.href), `${link.label} shows before its group is opened`).toBeHidden();
      }
    } else {
      await expect(nav.getByRole('link', { name: item.label, exact: true })).toBeVisible();
    }
  }
  // Open each group in turn: its links show, and only its.
  for (const group of groups) {
    await groupButton(page, group.label).click();
    await expect(groupButton(page, group.label)).toHaveAttribute('aria-expanded', 'true');
    for (const link of group.items) await expect(navLink(page, link.href), `${link.label} does not show in its open group`).toBeVisible();
    await expect(openGroups(page), 'more than one group is open').toHaveCount(1);
    await expect(page.locator('.site-header nav .group-list:visible'), 'more than one list shows').toHaveCount(1);
    // On a wide screen the group's name is hidden, and the open list is still named by it (aria-labelledby).
    await expect(nav.getByRole('list', { name: group.label, exact: true }), `the open list of "${group.label}" has no accessible name`).toBeVisible();
  }
});

// A link inside a group (every one, read from NAV): on its own page it is the current page, and the group that holds it is
// marked as the current group; no other link or group is.
for (const group of groups) {
  for (const link of group.items) {
    test(`header — ${link.href} is the current page in "${group.label}", and that group is marked`, async ({ page }) => {
      await page.setViewportSize(DESKTOP);
      await page.goto(link.href);
      await expect(page.locator('.site-header nav a[aria-current="page"]')).toHaveText([link.label]);
      await expect(groupButton(page, group.label), 'the group holding the current page is not marked').toHaveAttribute('aria-current', 'true');
      for (const other of groups.filter((g) => g !== group)) {
        await expect(groupButton(page, other.label), `the "${other.label}" group is marked as current on another group's page`).not.toHaveAttribute('aria-current', 'true');
      }
    });
  }
}

// A plain link of NAV (not in a group): on its own page it is the current page, and no group is marked. Read from NAV,
// so a link that later moves into a group is covered by the per-link tests above instead.
for (const plain of NAV.filter((item): item is NavLink => !isNavGroup(item))) {
  test(`header — the plain link ${plain.label} is the current page on ${plain.href}, and no group is marked`, async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto(plain.href);
    await expect(page.locator('.site-header nav a[aria-current="page"]')).toHaveText([plain.label]);
    await expect(page.locator('.site-header nav .group-button[aria-current="true"]'), 'a group is marked as current on a plain link\'s page').toHaveCount(0);
  });
}

// The current page shows at a glance: a thick underline on its link, or on the name of the group that holds it, and on no
// other item. Colour and weight alone were easy to miss (owner, 2026-10-24). Read from NAV, so a new link is covered.
const underline = (el: Element) => { const s = getComputedStyle(el); return `${s.textDecorationLine} ${s.textDecorationThickness}`; };
for (const link of NAV_LINKS) {
  test(`header — on ${link.href} the current item is underlined at a glance, and no other item is`, async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto(link.href);
    const group = groups.find((g) => g.items.includes(link));
    if (group) {
      const button = groupButton(page, group.label);
      await expect(button).toBeVisible();
      expect(await button.locator('.group-name').evaluate(underline), `the group name on ${link.href} is not underlined`).toBe('underline 3px');
      // An underline on the button itself would break at the arrow: the name and the arrow are separate boxes.
      expect(await button.evaluate(underline), 'the underline is on the whole button, not on its name').toMatch(/^none /);
      await button.click();
      await expect(navLink(page, link.href), `the "${group.label}" list did not open`).toBeVisible();
      expect(await navLink(page, link.href).evaluate(underline), `the current link in the open "${group.label}" list is not underlined`).toBe('underline 3px');
    } else {
      await expect(navLink(page, link.href)).toBeVisible();
      expect(await navLink(page, link.href).evaluate(underline), `the current link on ${link.href} is not underlined`).toBe('underline 3px');
    }
    // Every item that shows without a click: the top-level links (the croftweaver.com button included) and the groups' names.
    const items = page.locator('.site-header nav > ul > li > a, .site-header nav .group-name');
    const plainItems = await items.evaluateAll((els) => els
      .filter((el) => !el.closest('[aria-current]'))
      .map((el) => `${el.textContent?.trim()}: ${getComputedStyle(el).textDecorationLine}`));
    expect(plainItems.length, 'no other item was checked').toBeGreaterThan(0);
    for (const item of plainItems) expect(item, 'an item that is not current is underlined').toMatch(/: none$/);
  });
}

// On a phone the open menu shows the current link with the same underline, under its group's name.
for (const link of NAV_LINKS) {
  test(`header — on a phone the open menu underlines the current link on ${link.href}`, async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto(link.href);
    await page.locator('.site-header .menu-button').click();
    const current = navLink(page, link.href);
    await expect(current).toBeVisible();
    expect(await current.evaluate(underline)).toBe('underline 3px');
  });
}

// Where the top-level items sit: the Menu button is shown and they are folded behind it, or they stand in ONE row.
// Rows, not pixels: the height of a row depends on the machine's fonts.
for (const width of [768, 800, 900, 960, 1024, 1280]) {
  test(`header — at ${width} px the items are folded behind the Menu button or stand in one row`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    if (await page.locator('.site-header .menu-button').isVisible()) return;
    const rows = await itemRows(page);
    expect(rows, `the header items wrap onto ${rows} rows at ${width} px`).toBe(1);
  });
}

// The tightest width: the narrowest at which the items are not folded, wherever the fold is. The fixed widths above can all
// sit on one side of it. The pages differ in what is bold: the home page has no current item, /ai-crawlers a group's
// name, /glossary a plain link, and the group name is the widest.
for (const path of ['/', '/ai-crawlers', '/glossary']) {
  test(`header — on ${path}, at the narrowest width where the items are not folded they stand in one row`, async ({ page }) => {
    await page.goto(path);
    // The fold is measured in a wide font (see Header.astro); a narrower one fits more, so this fails only when the fold is too low.
    await page.addStyleTag({ content: '* { font-family: Verdana, "DejaVu Sans", sans-serif !important; }' });
    const width = await narrowestUnfolded(page);
    const rows = await itemRows(page);
    expect(rows, `the header items wrap onto ${rows} rows at ${width} px, the narrowest width where they are not folded`).toBe(1);
  });
}

// On a phone the logo with its word "Guide" and the Menu button share the first row. A narrow row shrinks the logo (the
// drawing scales down, it is not cut): about 94% of its size at 375 px and 66% at 320 px. Below 60% it is too small to read.
// The word must also stay clear of the Menu button.
for (const width of [375, 320]) {
  test(`header — on a ${width} px phone the logo stays readable and the word and the Menu button do not overlap`, async ({ page }) => {
    await page.setViewportSize({ width, height: 740 });
    await page.goto('/');
    const scale = await page.locator('.site-header .brand svg').evaluate((svg) => {
      const box = svg.getBoundingClientRect();
      const vb = (svg as SVGSVGElement).viewBox.baseVal;
      return box.width / (box.height * (vb.width / vb.height));
    });
    expect(scale, 'the logo is drawn smaller than 60% of its size on a phone').toBeGreaterThanOrEqual(0.6);
    const word = (await page.locator('.site-header .brand-word').boundingBox())!;
    const button = (await page.locator('.site-header .menu-button').boundingBox())!;
    expect(word.x + word.width, `the word "Guide" reaches ${word.x + word.width} px, the Menu button starts at ${button.x} px`).toBeLessThanOrEqual(button.x);
  });
}

test('header — a group closes on Escape, on a click elsewhere and when another opens, and a link in it is followed', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  const refused = await withSiteCsp(page);
  await page.goto('/');
  const [first, second] = groups;
  const b1 = groupButton(page, first!.label);
  const b2 = groupButton(page, second!.label);
  const firstLink = navLink(page, first!.items[0]!.href);

  await b1.click();
  await expect(b1).toHaveAttribute('aria-expanded', 'true');
  await expect(firstLink).toBeVisible();

  // Escape with focus on the button, then with focus on a link in the list: focus ends on the button.
  await page.keyboard.press('Escape');
  await expect(b1, 'Escape did not close the group').toHaveAttribute('aria-expanded', 'false');
  await expect(firstLink).toBeHidden();
  await b1.click();
  await firstLink.focus();
  await page.keyboard.press('Escape');
  await expect(b1).toHaveAttribute('aria-expanded', 'false');
  await expect(b1, 'focus was lost with the hidden link').toBeFocused();

  // A click elsewhere closes it.
  await b1.click();
  await expect(b1).toHaveAttribute('aria-expanded', 'true');
  await page.locator('.site-header .tagline').click();
  await expect(b1, 'a click elsewhere did not close the group').toHaveAttribute('aria-expanded', 'false');

  // Opening another group closes the first: never two open.
  await b1.click();
  await b2.click();
  await expect(b1, 'the first group stayed open when the second opened').toHaveAttribute('aria-expanded', 'false');
  await expect(b2).toHaveAttribute('aria-expanded', 'true');
  await expect(openGroups(page)).toHaveCount(1);
  // The button closes what it opened.
  await b2.click();
  await expect(b2).toHaveAttribute('aria-expanded', 'false');

  // A click on a link in the list follows the link.
  await b1.click();
  await firstLink.click();
  await expect(page, 'the link in the open group was not followed').toHaveURL(new RegExp(`${first!.items[0]!.href}$`));
  expect(refused, 'the browser refused something under the site\'s Content-Security-Policy').toEqual([]);
});

test('header — with the keyboard: Enter or Space opens a group, Tab goes through its links, and Tab past the last closes it', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');
  const first = groups[0]!;
  const button = groupButton(page, first.label);
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Enter');
  await expect(button, 'a second Enter did not close the group').toHaveAttribute('aria-expanded', 'false');
  await page.keyboard.press('Space');
  await expect(button, 'Space did not open the group').toHaveAttribute('aria-expanded', 'true');
  for (const link of first.items) {
    await page.keyboard.press('Tab');
    await expect(navLink(page, link.href), `${link.label} did not take focus in turn`).toBeFocused();
  }
  await page.keyboard.press('Tab');
  await expect(button, 'Tab past the last link did not close the group').toHaveAttribute('aria-expanded', 'false');
});

test('header — an open group sits inside the window at every width where the items are not folded', async ({ page }) => {
  await page.goto('/');
  const narrowest = await narrowestUnfolded(page);
  for (const last of groups) {
    for (const width of [narrowest, 900, 960, 1024, 1280].filter((w) => w >= narrowest)) {
      await page.setViewportSize({ width, height: 800 });
      await groupButton(page, last.label).click();
      const box = await page.locator(`.site-header nav a[href="${last.items[0]!.href}"]`).locator('xpath=ancestor::ul[1]').boundingBox();
      expect(box, `the open "${last.label}" list is not drawn at ${width} px`).not.toBeNull();
      expect(box!.x, `the open list starts left of the window at ${width} px`).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width, `the open list runs past the right edge at ${width} px`).toBeLessThanOrEqual(width);
      for (const link of last.items) {
        const target = await navLink(page, link.href).boundingBox();
        expect(target!.height, `${link.label} in the open list is shorter than the 44px tap target at ${width} px`).toBeGreaterThanOrEqual(44);
      }
      await groupButton(page, last.label).click();
    }
  }
});

test('header — a press on the open list itself (not on a link) does not close it', async ({ page }) => {
  // The press moves focus off the button to nothing (a null relatedTarget). Closing a group on that would remove the list
  // before a click lands in browsers that do not focus a link on click (Safari, Firefox on macOS).
  await page.setViewportSize(DESKTOP);
  await page.goto('/');
  const first = groups[0]!;
  await groupButton(page, first.label).click();
  const list = await page.locator(`.site-header nav a[href="${first.items[0]!.href}"]`).locator('xpath=ancestor::ul[1]').boundingBox();
  await page.mouse.click(list!.x + 3, list!.y + list!.height / 2);
  await expect(groupButton(page, first.label), 'a press on the open list closed it').toHaveAttribute('aria-expanded', 'true');
});

test('header — an open group closes when the window goes below the fold, and when the page is restored from the cache', async ({ page }) => {
  await page.setViewportSize(DESKTOP);
  await page.goto('/');
  const button = groupButton(page, groups[0]!.label);
  // The same button by CSS: a role query does not match it while it is hidden (below the fold).
  const raw = page.locator('.site-header nav .group-button').first();
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.setViewportSize(PHONE);
  await expect(raw, 'narrowing the window below the fold did not close the open list').toHaveAttribute('aria-expanded', 'false');
  await page.setViewportSize(DESKTOP);
  await expect(raw, 'the list opened again by itself after the window was narrowed and widened').toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('.site-header nav .group-list:visible'), 'a list shows after the window was widened again').toHaveCount(0);
  // The browser's back/forward cache brings a page back with its state: pageshow with persisted set.
  await button.click();
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: false })));
  await expect(button, 'a pageshow of a freshly loaded page closed the list').toHaveAttribute('aria-expanded', 'true');
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
  await expect(button, 'a page restored from the cache came back with its list open').toHaveAttribute('aria-expanded', 'false');
});

// The two media queries in Header.astro (the phone block and the wide block) must name the same width, or a viewport between
// them gets neither. Playwright viewports are whole pixels and the gap would be a fraction of one, so the numbers are read.
test('header — the wide block is the exact complement of the phone query', () => {
  const css = readFileSync(new URL('../src/components/Header.astro', import.meta.url), 'utf8');
  const phone = [...css.matchAll(/@media \(max-width: ([\d.]+rem)\)/g)].map((m) => m[1]);
  const wide = [...css.matchAll(/@media not all and \(max-width: ([\d.]+rem)\)/g)].map((m) => m[1]);
  expect(phone.length, 'the phone block is gone from Header.astro').toBe(1);
  expect(wide.length, 'the wide block is gone from Header.astro').toBe(1);
  expect(wide[0], 'the wide block and the phone block name different widths').toBe(phone[0]);
});

// A control for withSiteCsp: it must see a violation when there is one, or the "nothing refused" checks above prove nothing.
test('header — the CSP check sees a violation (control)', async ({ page }) => {
  const refused = await withSiteCsp(page);
  await page.goto('/');
  await page.evaluate(() => { const img = new Image(); img.src = 'https://example.invalid/x.png'; document.body.appendChild(img); });
  await expect.poll(() => refused.length, 'the site policy let an image load from another origin, or the check does not see it').toBeGreaterThan(0);
});

for (const [name, viewport] of [['phone', PHONE], ['desktop', DESKTOP]] as const) {
  test(`header — without JavaScript a ${name} still shows every link, and no button`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport, baseURL });
    const page = await context.newPage();
    await page.goto('/geo');
    await expect(page.locator('.site-header button:visible'), 'a button that cannot work is showing').toHaveCount(0);
    for (const item of NAV_LINKS) {
      await expect(page.locator('.site-header nav').getByRole('link', { name: item.label, exact: true }), `${item.label} is not shown`).toBeVisible();
    }
    for (const group of groups) {
      await expect(page.locator('.site-header nav .group-label', { hasText: group.label }), `the name "${group.label}" is not shown above or beside its links`).toBeVisible();
    }
    await context.close();
  });
}

// No JavaScript and a dark system: the system-preference colours of global.css are the only dark path left,
// because Base.astro's script sets data-theme for everyone else. Expected values are written by hand.
test('header — without JavaScript a dark system gets the dark colours', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark', baseURL });
  const page = await context.newPage();
  await page.goto('/geo');
  const vars = await page.evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    return { bg: css.getPropertyValue('--bg').trim(), ink: css.getPropertyValue('--ink').trim(), accent: css.getPropertyValue('--accent').trim() };
  });
  expect(vars, 'a no-JavaScript visitor with a dark system does not get the dark colours').toEqual({ bg: '#0e1310', ink: '#e3e8e1', accent: '#8fd4ab' });
  await context.close();
});
