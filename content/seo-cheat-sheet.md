# SEO cheat sheet: crawlers, tags, speed and snippets

This is a quick-reference page for [SEO](/glossary/#seo): which [crawlers](/glossary/#crawler) visit a site, what to put in your [robots.txt](/glossary/#robots-txt), which tags and [structured data](/glossary/#structured-data) to use, how to read [PageSpeed Insights](/glossary/#pagespeed-insights), and how to write an [llms.txt](/glossary/#llms-txt) file. Every row names its source and the date that source gives, and every section says when we last checked it and when the next check is due.

- [Who visits your site](#who-visits)
- [robots.txt recipes](#robots-recipes)
- [Tags on a page](#tags)
- [Technical SEO](#technical-seo)
- [PageSpeed Insights, in plain words](#pagespeed)
- [Structured data examples](#structured-data)
- [llms.txt skeleton](#llms-skeleton)
- [Test it yourself](#test-it)
- [Where the switches are](#switches)

## Who visits your site {#who-visits}

Which robots read your pages, and what each one is for. [AI crawlers](/ai-crawlers/) explains what happens when you block each one.

Checked on 17 November 2026 · next check by 17 February 2027

| Crawler | What it is for | Source |
|---|---|---|
| [Googlebot](/glossary/#googlebot) | Google's crawler for Search. Google says rules for it affect "Google Search (including Discover and all Google Search features)". | [Google, 30 Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) |
| [Bingbot](/glossary/#bingbot) | Bing's standard crawler, which handles most of its crawling. | [Microsoft, no date shown](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0) |
| [OAI-SearchBot](/glossary/#oai-searchbot) | OpenAI's crawler for ChatGPT search. If you opt out, your site is not shown in ChatGPT search answers, though it can still appear as a link. | [OpenAI, no date shown](https://developers.openai.com/api/docs/bots) |
| [Claude-SearchBot](/glossary/#claude-searchbot) | Anthropic's crawler for search. Anthropic says it improves search results for users, and that turning it off may reduce your site's visibility there. | [Anthropic, no date shown](https://support.claude.com/en/articles/8896518-anthropic-crawlers) |
| [PerplexityBot](/glossary/#perplexitybot) | Perplexity's crawler for its search results. Perplexity says it is not used to crawl content for AI foundation models. | [Perplexity, no date shown](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) |
| [Applebot](/glossary/#applebot) | Apple's crawler. What it reads feeds search in Spotlight, Siri and Safari, and Apple says it may also be used to help train its models. | [Apple, 4 Sep 2026](https://support.apple.com/en-us/119829) |
| [GPTBot](/glossary/#gptbot) | OpenAI's crawler for training. Disallowing it says your content should not be used to train OpenAI's models. See also: [keep training crawlers out](#robots-block-training). | [OpenAI, no date shown](https://developers.openai.com/api/docs/bots) |
| [ClaudeBot](/glossary/#claudebot) | Anthropic's crawler for training. Restricting it signals that your future pages should be left out of training. | [Anthropic, no date shown](https://support.claude.com/en/articles/8896518-anthropic-crawlers) |
| [Google-Extended](/glossary/#google-extended) | A robots.txt name only, with no crawler of its own. It controls Gemini training and [grounding](/glossary/#grounding) use, and Google says it does not affect your place in Google Search. | [Google, 30 Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) |
| [Applebot-Extended](/glossary/#applebot-extended) | Disallow it in robots.txt to opt out of Apple's model training. Applebot can still crawl you for search. | [Apple, 4 Sep 2026](https://support.apple.com/en-us/119829) |
| [Meta-ExternalAgent](/glossary/#meta-externalagent) | Meta's crawler, used for training AI models or improving products by indexing content directly. | [Meta, no date shown](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers) |
| [CCBot](/glossary/#ccbot) | The crawler of Common Crawl, a non-profit that keeps an open collection of web pages for anyone to use. | [Common Crawl, no date shown](https://commoncrawl.org/ccbot) |
| [ChatGPT-User](/glossary/#chatgpt-user) | Visits a page when a ChatGPT user asks a question that needs it. OpenAI says robots.txt rules may not apply. | [OpenAI, no date shown](https://developers.openai.com/api/docs/bots) |
| [Claude-User](/glossary/#claude-user) | Visits when a Claude user asks a question that needs a page. Turning it off may reduce your visibility for user-directed web search. | [Anthropic, no date shown](https://support.claude.com/en/articles/8896518-anthropic-crawlers) |
| [Perplexity-User](/glossary/#perplexity-user) | Visits a page when a Perplexity user asks a question, and may link the page in its answer. Perplexity says it generally ignores robots.txt rules. | [Perplexity, no date shown](https://docs.perplexity.ai/docs/resources/perplexity-crawlers) |
| robots.txt is a request | The standard says crawlers are asked to honor the rules, and that the rules are not a form of access authorization. | [RFC 9309, Sep 2022](https://www.rfc-editor.org/rfc/rfc9309) |
| A name can be faked | Google says the [user agent](/glossary/#user-agent) string in a request can be spoofed, and Common Crawl says some crawlers falsely call themselves CCBot. | [Google, 30 Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [Common Crawl, no date shown](https://commoncrawl.org/ccbot) |
| Changes take time | OpenAI says its search systems can take about 24 hours to adjust after a change to your robots.txt. Perplexity and Meta each say a change can take up to 24 hours to take effect. | [OpenAI, no date shown](https://developers.openai.com/api/docs/bots), [Perplexity, no date shown](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Meta, no date shown](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers) |

## robots.txt recipes {#robots-recipes}

Files to copy, each tested with Python's robots.txt parser for twelve crawler names: Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, Applebot, GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent and CCBot. A long line wraps on a small screen; a wrapped line is still one line in the file.

Checked on 17 November 2026 · next check by 17 February 2027

### Allow everyone {#robots-allow-all}

```
User-agent: *
Allow: /
```

It asks every crawler that follows robots.txt to treat the whole site as open. It does not make anyone visit, and it does not reach a crawler that ignores the file, since the standard only asks crawlers to honor it ([RFC 9309, Sep 2022](https://www.rfc-editor.org/rfc/rfc9309)).

Tested on 17 November 2026: Python 3.13's robots.txt parser. All twelve may fetch `/`. Three of the twelve lines it printed:

```
Googlebot            may fetch /: True
OAI-SearchBot        may fetch /: True
GPTBot               may fetch /: True
```

### Keep one bot out {#robots-block-one-bot}

```
User-agent: GPTBot
Disallow: /

User-agent: *
Allow: /
```

It asks GPTBot to stay out and leaves everyone else in. It does not take your site out of ChatGPT search, which uses OAI-SearchBot, and it does not stop ChatGPT-User, which OpenAI says may not follow robots.txt rules ([OpenAI, no date shown](https://developers.openai.com/api/docs/bots)).

Tested on 17 November 2026: Python 3.13's robots.txt parser. Three of the twelve lines it printed:

```
Googlebot            may fetch /: True
OAI-SearchBot        may fetch /: True
GPTBot               may fetch /: False
```

### Keep training crawlers out, stay in search {#robots-block-training}

```
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: *
Allow: /
```

It asks six names to stay out: GPTBot, ClaudeBot, Applebot-Extended and Meta-ExternalAgent, which their owners tie to AI training, Google-Extended, which Google ties to Gemini training and grounding, and CCBot, whose crawls feed an open collection of web pages. Google-Extended is a robots.txt name, not a crawler of its own. Search crawlers such as Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot and Applebot are not named, so they stay in. Meta says Meta-ExternalAgent is also used for improving products by indexing content ([Meta, no date shown](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers)), so this line may reach beyond training. It does not stop the crawlers that visit when a person asks.

Tested on 17 November 2026: Python 3.13's robots.txt parser. All twelve lines it printed:

```
Googlebot            may fetch /: True
Bingbot              may fetch /: True
OAI-SearchBot        may fetch /: True
Claude-SearchBot     may fetch /: True
PerplexityBot        may fetch /: True
Applebot             may fetch /: True
GPTBot               may fetch /: False
ClaudeBot            may fetch /: False
Google-Extended      may fetch /: False
Applebot-Extended    may fetch /: False
Meta-ExternalAgent   may fetch /: False
CCBot                may fetch /: False
```

### Ask crawlers to skip one folder {#robots-skip-folder}

```
User-agent: *
Disallow: /drafts/
```

It asks crawlers not to fetch anything under `/drafts/`. It hides nothing: the file is public, and RFC 9309 says its rules are not a form of access authorization ([RFC 9309, Sep 2022](https://www.rfc-editor.org/rfc/rfc9309)). Google says a page blocked this way can still be indexed if other sites link to it ([Google, 10 Dec 2025](https://developers.google.com/search/docs/crawling-indexing/robots/intro)). To keep a page out of results, use a [noindex](/glossary/#noindex) tag or a password.

Tested on 17 November 2026: Python 3.13's robots.txt parser. Of the twelve names, none may fetch `/drafts/page.html`, and all may fetch `/about`. Three of the lines it printed:

```
Googlebot            may fetch /drafts/page.html: False
Googlebot            may fetch /about: True
GPTBot               may fetch /about: True
```

### Point to your sitemap {#robots-sitemap-line}

```
Sitemap: https://example.com/sitemap.xml
```

It tells crawlers where your [sitemap](/glossary/#sitemap) is. Use the full address ([Google, 23 Oct 2026](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt)). Google says crawlers ignore the line when they process the rules, so it allows and blocks nothing.

Tested on 17 November 2026: Python 3.13's robots.txt parser. It returned `['https://example.com/sitemap.xml']` as the sitemap list, and all twelve names may fetch `/`. The first line it printed:

```
Googlebot            may fetch /: True
```

### The one not to paste {#robots-block-everything}

```
User-agent: *
Disallow: /
```

This asks every crawler to stay away from the whole site, Googlebot and Bingbot included. If it stays on a live site, search crawlers cannot read the pages, so they drop out of search or show up without their content.

Tested on 17 November 2026: Python 3.13's robots.txt parser. Three of the twelve lines it printed:

```
Googlebot            may fetch /: False
Bingbot              may fetch /: False
OAI-SearchBot        may fetch /: False
```

## Tags on a page {#tags}

Small lines in a page's head that tell search engines whether to keep it in their [index](/glossary/#index) and how to show it. A tag cannot be tested without publishing it, so each row says what the source says it does. [SEO basics](/seo/) explains [snippets](/glossary/#snippet).

Checked on 17 November 2026 · next check by 17 February 2027

| Tag | What it does | Source |
|---|---|---|
| `<meta name="robots" content="noindex">` | Asks Google to keep the page out of its results. Google can only read the tag if robots.txt lets it fetch the page. | [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| `<meta name="robots" content="nofollow">` | Asks Google not to follow the links on the page. | [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| `<meta name="robots" content="nosnippet">` | Asks Google to show no text snippet for the page. Google also says it stops the page being used as direct input to [AI Overviews](/glossary/#ai-overviews) and [AI Mode](/glossary/#ai-mode). | [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| `<meta name="robots" content="max-snippet:50">` | Asks Google to show at most 50 characters of text. A value of 0 is the same as nosnippet, and -1 leaves the length to Google. If a page has both max-snippet and nosnippet, the stricter nosnippet wins. | [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| `<span data-nosnippet>` | Keeps the text inside this one part of the page out of Google's snippets. It works on span, div and section elements only. | [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| `<meta name="robots" content="unavailable_after: 2027-01-31">` | Asks Google to stop showing the page after that date. Google says it will decrease its crawl rate considerably after it. | [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |
| `<meta name="robots" content="noarchive">` | For Bing, stops the page being used in Copilot answers and grounding results. Microsoft says it will disregard the tag for those uses once its new AI preferences start, on 1 February 2027 (next row). Google Search no longer uses noarchive, because it dropped cached links. | [Microsoft, no date shown](https://www.bing.com/webmasters/help/Webmaster-Guidelines-30fba23a), [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [Microsoft, no date shown](https://www.bing.com/webmasters/help/new-ai-preferences-2t1cc16d) |
| Bing's new AI preferences | On 30 October 2026 Microsoft announced separate AI Training and AI Grounding preferences that replace noarchive and nocache for those uses. The Training preference goes in robots.txt or on a page, and the Grounding preference on a page. Microsoft says it starts honoring them on 1 February 2027. They do not change whether your pages appear in Bing search results. | [Microsoft, no date shown](https://www.bing.com/webmasters/help/new-ai-preferences-2t1cc16d) |
| `X-Robots-Tag: noindex` | The same rules as the meta tags, sent as an HTTP header. It is a way to cover files that are not web pages, such as PDFs and images. | [Google, 24 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) |

## Technical SEO {#technical-seo}

The plumbing under a page: whether it answers, where it lives, and how crawlers find it. [SEO basics](/seo/) covers sitemaps and phones.

Checked on 17 November 2026 · next check by 17 February 2027

| Term | What it means | Source |
|---|---|---|
| HTTPS | Google lists secure serving of pages among the questions to ask about your page experience. | [Google, 22 Sep 2026](https://developers.google.com/search/docs/appearance/page-experience) |
| 200 | The page was found and served. A 200 on an empty page or an error message can show up as a soft 404 in [Search Console](/glossary/#search-console). | [Google, 4 Feb 2026](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) |
| 301 and 308 | The page has moved for good. Google uses it as a signal that the new address should be the main one, and shows the new address in results. | [Google, 16 Nov 2026](https://developers.google.com/search/docs/crawling-indexing/301-redirects) |
| 302 and 307 | The page has moved for now. Google follows it but does not use it as a sign that the new address should be the main one, and shows the old address in results. | [Google, 16 Nov 2026](https://developers.google.com/search/docs/crawling-indexing/301-redirects) |
| 301 or 302, Bing's view | Bing says to use a 301 for a permanent move, and a 302 only for a move of a very short time, under two days. | [Microsoft, no date shown](https://www.bing.com/webmasters/help/Webmaster-Guidelines-30fba23a) |
| 404 and 410 | The page is gone. Google treats all 4xx errors alike except 429, so a 410 is not special. | [Google, 4 Feb 2026](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) |
| 429 and 5xx | The server is overloaded or broken. Google slows its crawling when it sees these. | [Google, 4 Feb 2026](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) |
| Redirect chains | Googlebot follows up to 10 redirects in a row. | [Google, 4 Feb 2026](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) |
| Soft 404 | A page that says "not found" but answers 200. Search Console reports it as a soft 404. | [Google, 4 Feb 2026](https://developers.google.com/search/docs/crawling-indexing/http-network-errors) |
| [Canonical URL](/glossary/#canonical-url) | The main address of a page that can be reached at several. A redirect and a rel=canonical tag are strong signs, a sitemap entry is a weak one. On the main page, add a canonical tag that points to itself. | [Google, 10 Jul 2026](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) |
| XML sitemap | A list of your pages for crawlers. A file may hold up to 50 MB uncompressed or 50,000 addresses, in UTF-8. Google ignores priority and changefreq, and uses lastmod only when it is consistently accurate. | [Google, 8 Jul 2026](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) |
| Sitemap, do you need one | Google says a sitemap helps it find your pages but does not guarantee they are crawled and indexed. A site of about 500 pages or fewer, well linked inside and with few videos or images, may not need one, though most sites benefit from one. | [Google, 10 Dec 2025](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) |
| hreflang | Tags that point each language version of a page at the others. Each version must list itself and the others, with full addresses. If two pages do not point to each other, Google ignores those tags. x-default is the fallback. | [Google, 21 Sep 2026](https://developers.google.com/search/docs/specialty/international/localized-versions) |
| Mobile-first indexing | Google uses the phone version of your page, fetched with its smartphone crawler, for indexing and [ranking](/glossary/#ranking). | [Google, 10 Dec 2025](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) |
| JavaScript and rendering | Google queues pages with a 200 status for rendering, unless a robots meta tag or header tells it not to index the page. It still calls server-side or pre-rendering a great idea, because not all bots can run JavaScript. | [Google, 4 Mar 2026](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) |
| Dynamic rendering | Serving crawlers a ready-made version of a page. Google calls it a workaround and not a recommended solution. | [Google, 10 Dec 2025](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering) |
| Crawl budget | How much Google crawls your site. Google says its guide is mainly for sites with about a million pages that change weekly, sites with 10,000 pages that change daily, and sites with many URLs that Search Console lists as "Discovered - currently not indexed". It calls the numbers rough. For other sites, Google says keeping the sitemap current and checking the Page Indexing report is adequate. | [Google, 22 Jul 2026](https://developers.google.com/crawling/docs/crawl-budget) |

## PageSpeed Insights, in plain words {#pagespeed}

What the numbers in a speed report mean. [Check your site](/check-your-site/), test 2, runs one. Our own run is quoted where a row says so.

Checked on 17 November 2026 · next check by 17 February 2027

| Term | What it means | Source |
|---|---|---|
| Field data | What real visitors saw, from Chrome users over the previous 28 days. Each number shown is the 75th percentile. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about) |
| Lab data | One test run by Lighthouse in a controlled setting. On the mobile report it simulates a mid-range phone on a mobile network. It is good for finding faults, not for judging real visitors. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about) |
| No data | If neither the page nor the whole site has enough visitors, the report shows no field data. Our guide's home page showed "No Data" there on 17 November 2026. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about) |
| URL against origin | If one page has too little field data, the report falls back to the data for the whole site. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about) |
| [Core Web Vitals](/glossary/#core-web-vitals) assessment | It passes when the 75th percentile of LCP, INP and CLS are all Good. With too little INP data, LCP and CLS decide. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about) |
| LCP, Largest Contentful Paint | How long the main content takes to show. Good is 2.5 seconds or less. | [web.dev, 31 Oct 2024](https://web.dev/articles/vitals) |
| INP, Interaction to Next Paint | How fast the page reacts when someone taps, clicks or types. Good is 200 milliseconds or less. | [web.dev, 31 Oct 2024](https://web.dev/articles/vitals), [web.dev, 2 Sep 2025](https://web.dev/articles/inp) |
| CLS, Cumulative Layout Shift | How much the page jumps around. Good is 0.1 or less. | [web.dev, 31 Oct 2024](https://web.dev/articles/vitals), [web.dev, 12 Apr 2023](https://web.dev/articles/cls) |
| FCP, First Contentful Paint | How long until anything shows. Good is 1.8 seconds or less, poor is over 3 seconds. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about), [web.dev, 6 Dec 2023](https://web.dev/articles/fcp) |
| TTFB, Time to First Byte | How long until the first byte of the page arrives. Good is 0.8 seconds or less, poor is over 1.8 seconds. Google calls it experimental. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about), [web.dev, 18 Nov 2025](https://web.dev/articles/ttfb) |
| TBT, Total Blocking Time | Meant for the lab. For each task over 50 milliseconds after the first content shows, it adds up the time beyond 50 milliseconds. It stands in for INP in the lab, where INP usually cannot be measured. | [web.dev, 15 Oct 2025](https://web.dev/articles/tbt) |
| Performance score | A number from 0 to 100. 90 or more is good, 50 to 89 needs improvement, under 50 is poor. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about), [Chrome, 19 Sep 2019](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) |
| What counts in the score | On our run of 17 November 2026, which scored 100, the report credited FCP 10, LCP 25, TBT 30, CLS 25 and Speed Index 10 points. Chrome's page lists weights for Lighthouse 10 and 8 only, and our run used Lighthouse 13.6.0, so other versions may weigh differently. | [Chrome, 19 Sep 2019](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) |
| Categories | The report scores Performance, Accessibility, Best Practices and SEO. Our run on 17 November 2026 also showed a fifth, Agentic Browsing. | [Google, 21 Oct 2024](https://developers.google.com/speed/docs/insights/v5/about) |

## Structured data examples {#structured-data}

Code that tells search engines who you are. Markup is not needed for Google's AI answers: Google says "Structured data isn't required for generative AI search". [Structured data and FAQs](/schema-and-faq/) explains. Mark up only what a visitor can see on the page.

Checked on 17 November 2026 · next check by 17 February 2027

### Organization {#jsonld-organization}

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example Bakery",
  "url": "https://example.com/",
  "logo": "https://example.com/logo.png"
}
```

It names your organization, its site and its logo. Google says there are no required properties for Organization, and recommends adding as many relevant ones as you can ([Google, 8 Sep 2026](https://developers.google.com/search/docs/appearance/structured-data/organization)). Google says it is not needed for Google's AI answers ([Google, 10 Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

Tested on 17 November 2026: `python3 -m json.tool` parsed it, and [Schema.org](/glossary/#schema-org)'s validator reported 0 errors and 0 warnings (read in a browser and noted by hand). Google's [Rich Results](/glossary/#rich-result) Test was not run.

### LocalBusiness {#jsonld-local-business}

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Example Bakery",
  "url": "https://example.com/",
  "telephone": "+1-555-0100",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1 Example Street",
    "addressLocality": "Springfield",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  ]
}
```

It gives a business its name, address and opening hours. Google lists name and address as required for the markup to be eligible for a rich result ([Google, 8 Sep 2026](https://developers.google.com/search/docs/appearance/structured-data/local-business)). It does not promise a rich result, and the hours must match the hours a visitor can read on the page.

Tested on 17 November 2026: `python3 -m json.tool` parsed it, and Schema.org's validator reported 0 errors and 0 warnings (read in a browser and noted by hand). Google's Rich Results Test was not run.

## llms.txt skeleton {#llms-skeleton}

A plain file that lists your best pages in a form made for AI systems to read. Google says Google Search ignores it, so any use is outside Google Search. [llms.txt: do you need one?](/llms-txt/) explains.

Checked on 17 November 2026 · next check by 17 February 2027

### The skeleton {#llms-skeleton-file}

```markdown
# Example Bakery

> Example Bakery is a small bakery in Springfield. This file lists the pages we most want an AI assistant to read.

Prices and opening hours change, so the pages below are kept up to date.

## Pages

- [Menu](https://example.com/menu/): what we bake and what it costs
- [Opening hours](https://example.com/hours/): when we are open
- [Contact](https://example.com/contact/): phone, address and map

## Optional

- [About us](https://example.com/about/): who runs the bakery
```

Put the file at `/llms.txt` on your site. The only part [llmstxt.org](https://llmstxt.org/) requires is the title on the first line (page modified 10 Aug 2026); the rest is optional: a one-paragraph summary, a few plain lines, and lists of links, with an Optional list for pages that can be skipped. Google says the file neither helps nor hurts your visibility in Google Search ([Google, 10 Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Lighthouse marks a missing file as not applicable, and flags a server error ([Chrome, 5 May 2026](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)).

Tested on 17 November 2026: a small script checked the skeleton part by part against the structure llmstxt.org describes. It has one title, a summary line, and two lists whose items are a name, a link and a note; the second list is the Optional one.

### A live example {#llms-live}

```
# Croftweaver Guide

> A free guide for people who run a website and would rather not learn jargon: how Google and AI
> assistants find sites, and what you can do about it. Every claim about how Google or an AI
> service behaves names who published the source and links it. Served at https://guide.croftweaver.com/llms.txt.

## Pages
- [Home](https://guide.croftweaver.com/): A free guide for people who run a website and would rather not learn jargon. Every claim about Google or AI names its source, and links it.
```

This is the top of this guide's own file, the first eight lines. The full file lists the guide's pages and a few facts.

Tested on 17 November 2026: fetched with `curl -s https://guide.croftweaver.com/llms.txt | head -8`.

## Test it yourself {#test-it}

Six commands you can run in a terminal. Each ran against this guide on 17 November 2026; the command is shown with example.com, and the output is from our own site, with lines cut but never edited. They ran on macOS with curl 8.7.1, and we did not run them on Windows. A wrapped line in a command is one line.

Checked on 17 November 2026 · next check by 17 February 2027

### Read a page's status and headers {#cmd-status}

```
curl -sI https://example.com/ | head -5
```

```
HTTP/2 200 
date: Tue, 17 Nov 2026 14:22:04 GMT
content-type: text/html
cf-cache-status: HIT
cache-control: public, max-age=0, must-revalidate
```

It shows the status code and the headers a crawler gets. 200 means the server says the page is there. It does not show what the page looks like.

Tested on 17 November 2026: the command above, run against our own site.

### Follow a redirect {#cmd-redirect}

```
curl -sIL http://example.com/ | grep -iE "^(HTTP|location)"
```

```
HTTP/1.1 301 Moved Permanently
Location: https://guide.croftweaver.com/
HTTP/2 200 
```

It follows each redirect from the plain http address and prints the status and the next address. Here it shows a 301 to the https address, then a 200. The address in the command is example.com, and the output is from our own site's http address, so the address in the output differs.

Tested on 17 November 2026: the command above, run against our own site's http address.

### Read robots.txt {#cmd-robots}

```
curl -s https://example.com/robots.txt
```

```
User-agent: *
Allow: /

Sitemap: https://guide.croftweaver.com/sitemap-0.xml
```

It prints the file a crawler reads first. If the address answers 404, you have no robots.txt, and crawlers treat everything as open ([RFC 9309, Sep 2022](https://www.rfc-editor.org/rfc/rfc9309)).

Tested on 17 November 2026: the command above, run against our own site.

### Find the canonical tag {#cmd-canonical}

```
curl -s https://example.com/ | grep -o "<link rel=\"canonical\"[^>]*>"
```

```
<link rel="canonical" href="https://guide.croftweaver.com/">
```

It pulls the canonical tag out of the page's HTML, but it only finds a tag that starts with `<link rel="canonical"`, as ours does. A tag written another way may return nothing. It shows which address the page names as its main one, not which address Google chose.

Tested on 17 November 2026: the command above, run against our own home page.

### See what your host says to a bot's name {#cmd-botname}

```
curl -sI -A GPTBot https://example.com/ | head -1
```

```
HTTP/2 200 
```

It sends your page request under the name GPTBot and prints the first line of the answer. Run it again without `-A GPTBot` and compare: if the answers differ, your host treats that name differently. It shows what your host does with the name, not what the real crawler gets, because names can be faked ([Google, 30 Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)). On our site both gave HTTP/2 200.

Tested on 17 November 2026: the command above, and the same command without `-A GPTBot`, run against our own site.

### Read the sitemap {#cmd-sitemap}

```
curl -s https://example.com/sitemap-index.xml | head -c 400
```

```
<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://guide.croftweaver.com/sitemap-0.xml</loc></sitemap></sitemapindex>
```

It prints the first 400 characters of the sitemap file. Yours may be called sitemap.xml; the Sitemap line in your robots.txt gives its address. Ours is an index that points to one sitemap file, and our Sitemap line names that file, sitemap-0.xml.

Tested on 17 November 2026: the command above, run against our own site.

## Where the switches are {#switches}

Settings that sit in other companies' tools. [AI crawlers](/ai-crawlers/) walks through the Google one, and [Check your site](/check-your-site/), tests 3 and 4, opens the tools.

Checked on 17 November 2026 · next check by 17 February 2027

| Where | What it does | Source |
|---|---|---|
| Search Console, Settings, Search generative AI | Lets you choose whether your site appears in Google's AI Overviews, AI Mode and generative AI features in Discover. Google says a change generally takes a few days. It was opened to all websites on 31 August 2026. | [Google, no date shown](https://support.google.com/webmasters/answer/16908024) |
| Search Console, URL Inspection | Shows the version of a page Google has indexed, and lets you test the live page and ask Google to crawl it. Its Google-selected canonical field names the address Google picked. | [Google, no date shown](https://support.google.com/webmasters/answer/9012289) |
| Search Console, Sitemaps | Where you tell Google about a sitemap and see its history and any errors found in it. | [Google, no date shown](https://support.google.com/webmasters/answer/7451001) |
| Search Console, robots.txt report | Shows which robots.txt files Google found for the top 20 hosts of your site, when it last crawled them, and any warnings or errors. | [Google, no date shown](https://support.google.com/webmasters/answer/6062598) |
| [Bing Webmaster Tools](/glossary/#bing-webmaster-tools), AI Performance | Shows how often your pages are cited as sources in Copilot and Bing's AI answers. It was in public preview when announced in February 2026. | [Microsoft, 10 Feb 2026](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) |
| Search Console, Generative AI performance report | Where Google says to look at how your content performs in its generative AI features in Search and Discover. | [Google, 10 Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) |
| Bing Webmaster Tools, Crawl control | Sets how fast Bing crawls your site, by the hour. | [Microsoft, no date shown](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0) |
| [IndexNow](/glossary/#indexnow) | A way to tell search engines at once that a page was added, updated or deleted. You make a key of 8 to 128 characters and put a key file on your site. | [IndexNow, no date shown](https://www.indexnow.org/documentation) |
| Cloudflare, AI Crawler and Agent access policies | Lets you set an action for Search, Agent and Training traffic. Its "Disallow" action, for Training only, publishes your preference in robots.txt, which crawlers can ignore. Cloudflare says that with Bot Preference Sync on, Disallow also blocks AI training crawlers at its edge, except crawlers used for both Search and Training. | [Cloudflare, 2 Nov 2026](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/) |
| Cloudflare, "Block" for Training | Since 15 September 2026 the Training setting also covers crawlers used for both Search and Training. Block there stops Applebot, Bingbot and Googlebot from reaching your site, search included. Cloudflare says that if you want those crawlers gone entirely, you now have to select it. | [Cloudflare, 15 Sep 2026](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/) |
