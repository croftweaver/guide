# SEO cheat sheet: what matters for Google

[SEO](/glossary/#seo) in one page: what to do, and what to skip, to be found on Google. Each row says what to do and where to read more.

Checked on 17 November 2026 · next check by 17 February 2027

The [robots.txt](/glossary/#robots-txt) recipes, tag tables and tested commands that used to sit on this page moved to the [SEO reference](/seo-reference/). For AI answers, see the [AI search cheat sheet](/ai-search-cheat-sheet/).

## Content and intent {#content}

| What | Do this | Source |
|---|---|---|
| Useful content | Write pages people find helpful. In Google's starter guide this likely matters most. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Search terms | Use the words your customers would type. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Your own words | Write from what you know. Don't rehash others. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Headings | Break long text into sections with headings. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Your own pages | Link them to each other. Links help people and Google find your other pages. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Old pages | Update them, or delete what is no longer relevant. Don't change dates just to look fresh. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide); [Google, helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| Title | Give each page its own clear title. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Description | Write a short one per page. Google may show other text. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Images | Add alt text that says what the image shows. | [Google, images](https://developers.google.com/search/docs/appearance/google-images) |
| Links | Make the link words say where the link goes. | [Google, links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) |

## Technical {#technical}

| What | Do this | Source |
|---|---|---|
| HTTPS | Serve every page over HTTPS. | [SEO reference](/seo-reference/#technical-seo) |
| Keep a page out | Use [noindex](/glossary/#noindex), and let Google crawl the page so it can read it. A robots.txt rule alone does not do it. | [Google, robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro); [Google, robots meta](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| Duplicates | Pick one address. Redirect the rest, or use a canonical tag. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Moved page | Use a permanent redirect. | [SEO reference](/seo-reference/#technical-seo) |
| Phones | Google reads the phone version. Give it the same content. | [Google, mobile-first](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) |
| [Sitemap](/glossary/#sitemap) | A small, well-linked site may not need one. Otherwise submit it in [Search Console](/glossary/#search-console). | [Google, sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) |
| Speed | Aim for LCP 2.5 seconds, INP 200 milliseconds, CLS 0.1. | [SEO reference](/seo-reference/#pagespeed) |
| [Structured data](/glossary/#structured-data) | Mark up only what visitors can see on the page. | [Google, policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) |

## Trust and other sites {#trust}

| What | Do this | Source |
|---|---|---|
| Who wrote it | Show who made the content. Add bylines where readers expect them, with a link to the author's background. | [Show who is behind it](/eeat/) |
| [E-E-A-T](/glossary/#e-e-a-t) | Google says it is not a [ranking](/glossary/#ranking) factor in itself. Its systems still look for "a mix of factors" that show good E-E-A-T, and trust matters most. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide); [Google, helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) |
| Links to you | Earn them. Buying them for [ranking](/glossary/#ranking) breaks Google's spam rules. | [Google, spam policies](https://developers.google.com/search/docs/essentials/spam-policies) |
| Mass-made pages | Don't make many pages mainly to rank. Google's spam policies name scaled content and doorway pages. | [Google, spam policies](https://developers.google.com/search/docs/essentials/spam-policies) |
| Business Profile | If you serve local customers, verify it, keep it complete, answer reviews. | [Google, local ranking](https://support.google.com/business/answer/7091) |

## Measure {#measure}

| What | Do this | Source |
|---|---|---|
| Found yet? | Search `site:yourdomain.com`. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Queries | Read the Performance report in Search Console. | [Google, Performance report](https://support.google.com/webmasters/answer/7576553) |
| One page | Use URL Inspection to see what Google indexed. | [SEO reference](/seo-reference/#switches) |
| Speed test | Run [PageSpeed Insights](/glossary/#pagespeed-insights) on a page. | [Check your site](/check-your-site/) |
| Bing | Use [Bing Webmaster Tools](/glossary/#bing-webmaster-tools). | [Microsoft](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) |
| Patience | Wait a few weeks before judging a change. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |

## Don't bother {#dont-bother}

| What | Do this | Source |
|---|---|---|
| Word count | Skip it. Length alone doesn't matter for ranking: "no magical word count target, minimum or maximum". | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Keywords tag | Skip it. Google says it "doesn't use the keywords meta tag". | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Heading count | Skip it. Google says there is "no magical, ideal amount of headings". | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Duplicate "penalty" | Don't fear it. Copying others' content is different. | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Domain keywords | Keywords in the domain name alone have "hardly any effect beyond appearing in breadcrumbs". | [Google starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
