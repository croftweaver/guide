# AI search cheat sheet: get named by AI

What to do so that AI search tools, such as ChatGPT, Claude, Perplexity, Copilot and Google's AI answers, can find your site and name it. Each row says what to do and where to read more.

Checked on 17 November 2026 · next check by 17 February 2027

For [SEO](/glossary/#seo) and Google's ordinary results, see the [SEO cheat sheet](/seo-cheat-sheet/). The [robots.txt](/glossary/#robots-txt) recipes, tag tables and tested commands are in the [SEO reference](/seo-reference/). The step-by-step version of this page is the [AI SEO checklist](/ai-seo-checklist/).

## Let them in {#let-them-in}

| What | Do this | Source |
|---|---|---|
| Two kinds of [crawler](/glossary/#crawler) | OpenAI and Anthropic give their search and training crawlers separate names. You can allow one and refuse the other. | [AI crawlers](/ai-crawlers/) |
| Search crawlers | Let in [OAI-SearchBot](/glossary/#oai-searchbot) (ChatGPT), [Claude-SearchBot](/glossary/#claude-searchbot) and [PerplexityBot](/glossary/#perplexitybot). | [AI crawlers](/ai-crawlers/) |
| Google | [Googlebot](/glossary/#googlebot) serves Search and its AI answers alike. [Google-Extended](/glossary/#google-extended) covers training, not Search. | [Google, AI features](https://developers.google.com/search/docs/appearance/ai-features); [Google, crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) |
| Your host | Check its AI bot settings first. On Cloudflare, some choices block Google and Bing search too. | [AI crawlers](/ai-crawlers/#my-site-runs-on-cloudflare) |

## Google's AI answers {#google-answers}

| What | Do this | Source |
|---|---|---|
| Requirements | No extra steps for [AI Overviews](/glossary/#ai-overviews) or [AI Mode](/glossary/#ai-mode): "no additional requirements to appear in AI Overviews or AI Mode". The page must be indexed and eligible for a [snippet](/glossary/#snippet), and the site must be included in the [Search Console](/glossary/#search-console) control (on by default). | [Google, AI features](https://developers.google.com/search/docs/appearance/ai-features); [Google, AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) |
| The switch | [Search Console](/glossary/#search-console) has a control for them, open to every site since 31 August 2026. | [Google, the control](https://support.google.com/webmasters/answer/16908024) |
| Training | The switch does not affect training. Use Google-Extended for that. | [Google, the control](https://support.google.com/webmasters/answer/16908024) |

## Be worth citing {#worth-citing}

| What | Do this | Source |
|---|---|---|
| Who you are | Say plainly what you do, where, and for whom. | [Why AI skips you](/why-ai-doesnt-mention-you/) |
| Your own view | Add first-hand detail others lack. Don't recycle. | [Google, AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) |
| Back it up | Give real figures and name your sources. | [The original study](/geo/) |
| Text | Keep important content as text, not only in images. | [Google, AI features](https://developers.google.com/search/docs/appearance/ai-features) |

## Be known elsewhere {#known-elsewhere}

| What | Do this | Source |
|---|---|---|
| Listings and reviews | Claim your Google and Bing listings. Ask customers for reviews. | [Why AI skips you](/why-ai-doesnt-mention-you/) |

## Measure {#measure}

| What | Do this | Source |
|---|---|---|
| Copilot | Read the AI Performance report in [Bing Webmaster Tools](/glossary/#bing-webmaster-tools). | [Microsoft](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) |
| Google | Read the Generative AI performance report in Search Console. | [Google, AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) |
| Ask | Ask an assistant about your business. Make it show its sources. | [Check your site](/check-your-site/) |
| Scores | Treat an assistant's score for a page as a hint: ours were 23 points apart. | [Our test](/eeat/) |

## Don't bother {#dont-bother}

| What | Do this | Source |
|---|---|---|
| [llms.txt](/glossary/#llms-txt) for Google | Skip it. Google says "You don't need to create new machine readable files, AI text files, or markup". | [Google, AI features](https://developers.google.com/search/docs/appearance/ai-features) |
| Special schema | Skip it. Google says there is "no special [schema.org](/glossary/#schema-org) [structured data](/glossary/#structured-data) that you need to add". | [Google, AI features](https://developers.google.com/search/docs/appearance/ai-features) |
| Tiny chunks | Skip them. Google says "no requirement to break your content into tiny pieces". | [Google, AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) |
