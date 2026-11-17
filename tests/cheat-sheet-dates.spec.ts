import { test, expect } from '@playwright/test';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Each section of the cheat sheet says when its sources were last opened and when they are due again, so a reader can
// see how old a row is. This checks the structure, not the clock: it never compares a date with today, so the build
// does not turn red when a date goes by with nothing changed; the quarterly re-check moves the dates. The check reads
// one file through the path it is given. The page's own file goes through the same function as the probe files, and a
// probe with a date line removed must fail, or the check could pass while checking nothing.

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE = `(\\d{1,2}) (${MONTHS.join('|')}) (\\d{4})`;
const LINE = new RegExp(`^Checked on ${DATE} · next check by ${DATE}$`, 'm');

// Three months on: the same day number; where that month is shorter, its last day (31 August gives 30 November).
function threeMonthsOn(day: number, month: number, year: number): [number, number, number] {
  const m = month + 3;
  const y = year + Math.floor(m / 12);
  const mm = m % 12;
  return [Math.min(day, new Date(Date.UTC(y, mm + 1, 0)).getUTCDate()), mm, y];
}

// Every problem found in the file at `path`: one string per section that has no date line or a wrong next-check date.
function sectionDateProblems(path: string): string[] {
  const sections: { heading: string; body: string[] }[] = [];
  const problems: string[] = [];
  let fenced = false;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    // Only a plain three-backtick fence at the start of a line is read as code; any other fence line is refused, not guessed at.
    const fence = line.match(/^( *)(`{3,}|~{3,})(.*)$/);
    const plain = fence !== null && fence[1] === '' && fence[2] === '```';
    const opens = plain && !fenced;
    const closes = plain && fenced && fence![3]!.trim() === '';
    if (fence && !opens && !closes && (!fenced || fence[2]![0] === '`')) problems.push(`unsupported code fence: ${line.slice(0, 40)}`);
    if (opens || closes) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue; // a line inside a code block is neither a heading nor a date line
    if (line.startsWith('## ')) sections.push({ heading: line.slice(3).replace(/\s*\{#[^}]*\}\s*$/, '').trim(), body: [] });
    else sections.at(-1)?.body.push(line);
  }
  if (fenced) problems.push('a code fence is never closed');
  if (sections.length === 0) return [...problems, `${path} has no H2 section, so there is nothing to check`];
  for (const { heading, body } of sections) {
    const m = body.join('\n').match(LINE);
    if (!m) {
      problems.push(`"${heading}" has no "Checked on … · next check by …" line`);
      continue;
    }
    const [, d1, m1, y1, d2, m2, y2] = m;
    const real = (d: string, mo: string, y: string) => Number(d) >= 1 && Number(d) <= new Date(Date.UTC(Number(y), MONTHS.indexOf(mo) + 1, 0)).getUTCDate();
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

const REAL = fileURLToPath(new URL('../content/seo-cheat-sheet.md', import.meta.url));
const PROBE = fileURLToPath(new URL('./fixtures/seo-cheat-sheet-one-date-line-removed.md', import.meta.url));

test('cheat sheet dates — every section of the real page has its date line, three months apart', () => {
  expect(sectionDateProblems(REAL)).toEqual([]);
});

test('cheat sheet dates — a probe copy with one date line removed fails, and names the section', () => {
  expect(sectionDateProblems(PROBE)).toEqual(['"Tags on a page" has no "Checked on … · next check by …" line']);
});

// Probe files for the date rule itself: [name, the line, whether it must pass].
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
  test(`cheat sheet dates — ${name}`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'cheat-sheet-dates-'));
    try {
      const file = join(dir, 'probe.md');
      writeFileSync(file, `# Probe\n\n## One section {#one}\n\n${line}\n\nText.\n`);
      expect(sectionDateProblems(file).length === 0, line).toBe(ok);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}

test('cheat sheet dates — a date line inside a code block does not count', () => {
  const dir = mkdtempSync(join(tmpdir(), 'cheat-sheet-dates-'));
  try {
    const file = join(dir, 'probe.md');
    writeFileSync(file, '# Probe\n\n## One section {#one}\n\n```\n## Not a heading\nChecked on 17 November 2026 · next check by 17 February 2027\n```\n');
    expect(sectionDateProblems(file)).toEqual(['"One section" has no "Checked on … · next check by …" line']);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

for (const [name, fence] of [['a ~~~ fence', '~~~'], ['a four-backtick fence', '````'], ['an indented fence', ' ```']] as const) {
  test(`cheat sheet dates — ${name} is refused, not guessed at`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'cheat-sheet-dates-'));
    try {
      const file = join(dir, 'probe.md');
      writeFileSync(file, `# Probe\n\n## One section {#one}\n\n${fence}\nChecked on 17 November 2026 · next check by 17 February 2027\n${fence}\n`);
      expect(sectionDateProblems(file).some((p) => p.startsWith('unsupported code fence'))).toBe(true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
