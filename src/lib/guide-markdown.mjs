// Markdown settings for the guide's pages, which are written as plain Markdown:
// - a heading ending in {#some-id} keeps that id (Sätteri's headingAttributes);
// - smart punctuation is off, so the page ships the characters that were checked;
// - a link to '/x/' becomes '/x' and 'page.md#id' becomes '/page#id', because this site
//   serves its pages without a trailing slash (astro.config.mjs);
// - a table gets the markup the site's table style needs (tables.css, tests/tables.spec.ts):
//   a "stack" wrapper, header scopes, a row header per row, roles and a label per cell;
// - a table cell holding only "—" (nothing to say) is left out of the tone check.
import { satteri } from '@astrojs/markdown-satteri';

export function fixHref(href) {
  const [path, hash] = href.split('#');
  const md = /^([a-z0-9-]+)\.md$/.exec(path);
  let out = path;
  if (md) out = md[1] === 'index' ? '/' : `/${md[1]}`;
  else if (path.startsWith('/') && path.length > 1) out = path.replace(/\/+$/, '') || '/';
  return hash === undefined ? out : `${out}#${hash}`;
}

const linkPlugin = {
  name: 'guide-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === 'string') ctx.setProperty(node, 'href', fixHref(href));
    },
  },
};

const kids = (node) => (node?.children ?? []).filter((c) => c.type === 'element');

// The visitor sees the table first, then its cells, so the table's own pass sets every property.
function tablePlugin() {
  let lastHeading = '';
  return {
    name: 'guide-tables',
    element: [
      {
        filter: ['h1', 'h2', 'h3', 'h4'],
        visit(node, ctx) {
          lastHeading = ctx.textContent(node).replace(/\s*\{#[^}]*\}\s*$/, '').trim();
        },
      },
      {
        filter: ['table'],
        visit(node, ctx) {
          const [head, body] = kids(node);
          const headers = kids(kids(head)[0]).map((th) => ctx.textContent(th).replace(/\s+/g, ' ').trim());
          const label = (lastHeading ? `${lastHeading}: ` : '') + headers.join(', ');
          ctx.setProperty(node, 'role', 'table');
          ctx.setProperty(head, 'role', 'rowgroup');
          ctx.setProperty(body, 'role', 'rowgroup');
          kids(head).forEach((tr) => {
            ctx.setProperty(tr, 'role', 'row');
            kids(tr).forEach((th) => { ctx.setProperty(th, 'scope', 'col'); ctx.setProperty(th, 'role', 'columnheader'); });
          });
          kids(body).forEach((tr) => {
            ctx.setProperty(tr, 'role', 'row');
            kids(tr).forEach((cell, i) => {
              if (i === 0) {
                // The first cell is the row header: a <th>, so the node is replaced.
                ctx.replaceNode(cell, {
                  type: 'element', tagName: 'th',
                  properties: {
                    scope: 'row', role: 'rowheader',
                    ...(ctx.textContent(cell).trim() === '—' ? { 'data-tov-exempt': '' } : {}),
                  },
                  children: cell.children,
                });
              } else {
                ctx.setProperty(cell, 'role', 'cell');
                ctx.setProperty(cell, 'data-label', headers[i] ?? '');
                if (ctx.textContent(cell).trim() === '—') ctx.setProperty(cell, 'data-tov-exempt', '');
              }
            });
          });
          ctx.wrapNode(node, {
            type: 'element', tagName: 'div',
            properties: { className: ['table-wrap', 'stack'], role: 'region', 'aria-label': label, tabindex: '0' },
            children: [],
          });
        },
      },
    ],
  };
}

export const guideMarkdown = satteri({
  hastPlugins: [linkPlugin, tablePlugin()],
  features: { headingAttributes: true, smartPunctuation: false },
});
