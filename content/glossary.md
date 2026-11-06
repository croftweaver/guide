# Glossary

The words this guide uses, in everyday language. Each entry links the page it comes from, with the
date that page gives for itself. Where we found no definition from the company concerned, the
entry says so and links what we searched.

## AEO {#aeo}

Short for "answer engine optimization": work aimed at getting your site shown or quoted in AI
answers. Google names AEO and [GEO](#geo) as terms "you may see used" for this work
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)),
and Wikipedia lists AEO as another name for GEO
([Wikipedia](https://en.wikipedia.org/wiki/Generative_engine_optimization)).

**For your site:** for Google Search, Google calls it "still [SEO](#seo)"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## AI Crawl Control {#ai-crawl-control}

Cloudflare's page that shows which AI [crawlers](#crawler) visit a site on Cloudflare, with
switches to allow or block them. It is "Available on all plans"
([Cloudflare, Aug 2026](https://developers.cloudflare.com/ai-crawl-control/)).

**For your site:** on the free plan it recognises crawlers "based on their
[user agent](#user-agent) strings", and "the Metrics tab only displays metrics for the past 24
hours"
([Cloudflare, Apr 2026](https://developers.cloudflare.com/ai-crawl-control/get-started/)). The
Overview may reach further: when we looked on 30 October 2026, a free plan's Overview offered a
7-day view that showed data, and filters for hostname and path. If you want a record, we suggest a look once a week,
checking each time that the view reaches back 7 days.

## AI Mode {#ai-mode}

A way of using Google Search as a conversation: you ask, an AI answers with links, and you can ask
follow-up questions. Google calls it "Google's most powerful AI search experience"
([Google](https://support.google.com/websearch/answer/16011537)). It uses
[query fan-out](#query-fan-out)
([Google, May 2025](https://blog.google/products/search/google-search-ai-mode-update/)).

**For your site:** whether your site may appear in it is set with the
[Search generative AI control](#search-generative-ai-control)
([Google](https://support.google.com/webmasters/answer/16908024)).

## AI Overviews {#ai-overviews}

The AI-written summary that sometimes appears in Google's results: "an AI-generated
snapshot with key information and links to dig deeper"
([Google](https://support.google.com/websearch/answer/14901683)).

**For your site:** there are "no additional requirements" to appear in them, and they "often don't
trigger" ([Google, Dec 2025](https://developers.google.com/search/docs/appearance/ai-features)).

## Applebot {#applebot}

Apple's crawler. Its data powers search in "Spotlight, Siri, and Safari", and may also be used to
train Apple's AI models ([Apple, Sep 2026](https://support.apple.com/en-us/119829)).

**For your site:** if your [robots.txt](#robots-txt) does not name Applebot but does name
[Googlebot](#googlebot), "the Apple robot will follow Googlebot instructions"
([Apple, Sep 2026](https://support.apple.com/en-us/119829)).

## Applebot-Extended {#applebot-extended}

Not a visitor, but a name you can use in robots.txt to tell Apple not to train its AI on your
pages ([Apple, Sep 2026](https://support.apple.com/en-us/119829)).

**For your site:** pages that use it "can still be included in search results"
([Apple, Sep 2026](https://support.apple.com/en-us/119829)).

## Backlink {#backlink}

A link on someone else's website that points to yours: "A backlink is a link on a page from
another site that links to a page on your site"
([Google](https://support.google.com/webmasters/answer/9049606)).

**For your site:** Google uses links "to find new pages to crawl" and as a sign of relevance
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)).
Buying them is another matter: Google counts "Buying or selling links for [ranking](#ranking)
purposes" as link spam
([Google, Aug 2026](https://developers.google.com/search/docs/essentials/spam-policies)).

## Bing Webmaster Tools {#bing-webmaster-tools}

Microsoft's service for site owners who want to do well in Bing search
([Microsoft](https://support.microsoft.com/en-us/bing/help-with-bing-webmaster-tools)).

**For your site:** since February 2026 it has an AI Performance report, launched as a public
preview, that counts how often your pages are cited as sources in Copilot, Bing's AI summaries and
some partner services. Bing says it "reflects how often pages
are cited, not page importance, ranking, or placement"
([Bing, Feb 2026](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)).

## Bingbot {#bingbot}

Microsoft's main crawler for Bing: "Bingbot is our standard crawler"
([Microsoft](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0)).

**For your site:** Bing's guidelines cover Bing search, Copilot and [grounding](#grounding)
results. To keep a page out of Copilot's answers, Microsoft points to a tag on the page, not to
robots.txt: "NOARCHIVE prevents content from being used in Copilot responses and grounding
results"
([Microsoft](https://www.bing.com/webmasters/help/Webmaster-Guidelines-30fba23a)).

## Canonical URL {#canonical-url}

When the same page can be reached at several addresses, the one Google treats as the main one: "the
URL of a page that Google chose as the most representative from a set of duplicate pages"
([Google, Aug 2026](https://developers.google.com/search/docs/crawling-indexing/canonicalization)).

**For your site:** you can say which address you prefer, but it is "a hint, not a rule"
([Google, Aug 2026](https://developers.google.com/search/docs/crawling-indexing/canonicalization)).

## CCBot {#ccbot}

The crawler of Common Crawl, a non-profit that publishes "an open repository of web crawl data that
is universally accessible and analyzable by anyone" ([Common Crawl](https://commoncrawl.org/ccbot)).

**For your site:** Common Crawl warns that some crawlers falsely identify themselves as CCBot
([Common Crawl](https://commoncrawl.org/ccbot)).

## ChatGPT-User {#chatgpt-user}

The visitor that may appear when someone asks ChatGPT a question and it visits a page to answer. It "is not used for crawling the
web in an automatic fashion" ([OpenAI](https://developers.openai.com/api/docs/bots)).

**For your site:** "robots.txt rules may not apply" to it, and it "is not used to determine whether
content may appear in Search" ([OpenAI](https://developers.openai.com/api/docs/bots)).

## Citation {#citation}

When an AI answer shows a link to a page as one of its sources. We found no published definition of
the term by Google, OpenAI, Perplexity or Anthropic, on the pages of theirs that we could read
([what we searched, 29 Oct 2026](search-records.md#citation-and-mention)).

**For your site:** tools that measure citations count them in their own ways. Ahrefs counts one
"when a page appears at least once as a cited source in an AI generated response"
([Ahrefs, Sep 2026](https://help.ahrefs.com/en/articles/15501968-ai-visibility-metrics)); Profound calls it
"a reference an AI tool provides pointing back to a website"
([Profound, Aug 2026](https://www.tryprofound.com/blog/ai-search-glossary)). We suggest comparing numbers
only from the same tool.

## Claude-SearchBot {#claude-searchbot}

Anthropic's crawler for the web search in Claude. It "navigates the web to improve search result
quality for users"
([Anthropic, Apr 2026](https://support.claude.com/en/articles/8896518-anthropic-crawlers)).

**For your site:** blocking it "may reduce your site's visibility and accuracy in user search
results"
([Anthropic, Apr 2026](https://support.claude.com/en/articles/8896518-anthropic-crawlers)).

## Claude-User {#claude-user}

The visitor that appears when someone asks Claude a question and Claude may open a page to answer it
([Anthropic, Apr 2026](https://support.claude.com/en/articles/8896518-anthropic-crawlers)).

**For your site:** blocking it "may reduce your site's visibility for user-directed web search"
([Anthropic, Apr 2026](https://support.claude.com/en/articles/8896518-anthropic-crawlers)).

## ClaudeBot {#claudebot}

Anthropic's crawler that collects pages which may be used to train its AI models
([Anthropic, Apr 2026](https://support.claude.com/en/articles/8896518-anthropic-crawlers)).

**For your site:** blocking it "signals that the site's future materials should be excluded from
our AI model training datasets". The page does not say what happens to pages already collected
([Anthropic, Apr 2026](https://support.claude.com/en/articles/8896518-anthropic-crawlers)).

## Core Web Vitals {#core-web-vitals}

Three measurements of how a page feels to real visitors: how fast the main content appears
(Largest Contentful Paint), how quickly the page reacts to a tap or click (Interaction to Next
Paint), and whether things jump around while it loads (Cumulative Layout Shift)
([web.dev, Oct 2024](https://web.dev/articles/vitals)).

**For your site:** good means within 2.5 seconds, 200 milliseconds or less, and 0.1 or less
([web.dev, Oct 2024](https://web.dev/articles/vitals)). Good scores align with "what our core
ranking systems seek to reward", says Google
([Google, Dec 2025](https://developers.google.com/search/docs/appearance/core-web-vitals)). See
also [PageSpeed Insights](#pagespeed-insights).

## Crawler {#crawler}

A program that visits web pages on its own and downloads them, so a search engine or an AI
company can read them later. Google's own is called [Googlebot](#googlebot)
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/how-search-works)).

**For your site:** crawling is not a promise of anything. Google says it does not guarantee it will
crawl, list or show a page, even one that follows all its rules
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/how-search-works)).
Which crawler belongs to which company: [AI crawlers](/ai-crawlers/).

## E-E-A-T {#e-e-a-t}

Experience, expertise, authoritativeness and trustworthiness: what Google asks its
[quality raters](#quality-raters) to look for in a page and the people behind it. Of the four,
"trust is most important"
([Google, Oct 2026](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

**For your site:** Google says E-E-A-T "itself isn't a specific
ranking factor", and encourages "accurate authorship information", so readers can see who wrote
a page
([Google, Oct 2026](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

If you ask ChatGPT or Claude for your page's E-E-A-T score, the number you get is the assistant's
own estimate, not Google's. Google says "No third-party tool has access to our internal ranking or
AI systems"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
When we asked three assistants about the same page on 30 October 2026, their scores ran from 68
to 91 (our [test](/eeat/)). We suggest you ask instead what is missing from the page, and for the
source behind each suggestion, so you can check it.

## FAQ rich result {#faq-rich-result}

A Google result that used to show a page's questions and answers right under its link. Google
ended it: "This feature will no longer appear in Google Search starting May 7, 2026", and removed
its documentation on 15 June 2026
([Google changelog](https://developers.google.com/search/updates)).

**For your site:** we suggest keeping the questions and answers on your page for your readers. If
your page still carries FAQ markup, there is no hurry to remove it: Google said in 2023 that unused
markup "does not cause problems for Search"
([Google, Aug 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes)).

## GEO {#geo}

Short for "generative engine optimization": work aimed at being seen, quoted or linked in answers
written by AI. The name comes from a 2023 research paper by Pranjal Aggarwal and five co-authors
([arXiv](https://arxiv.org/abs/2311.09735)). You will also see [AEO](#aeo) and [LLMO](#llmo) used
for much the same thing; Wikipedia says there is "no consensus definition"
([Wikipedia](https://en.wikipedia.org/wiki/Generative_engine_optimization)).

**For your site:** Google's view is that, for Google Search, this is "still SEO"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
More on [GEO](/geo/).

## Google-Extended {#google-extended}

Not a visitor, but a name you can use in robots.txt to keep your pages out of training future
Gemini models, and out of the look-ups behind answers in Gemini Apps and Grounding with Google Search on Vertex AI
([Google, Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).

**For your site:** blocking it "does not impact a site's inclusion in Google Search"
([Google, Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).
We found no published Google statement on whether blocking it changes whether you appear in
[AI Overviews](#ai-overviews) or [AI Mode](#ai-mode)
([what we searched, 29 Oct 2026](search-records.md#google-extended-ai-overviews)). For those,
Google offers a separate switch, the [Search generative AI control](#search-generative-ai-control)
([Google](https://support.google.com/webmasters/answer/16908024)).

## Googlebot {#googlebot}

Google's main crawler. Its rules "affect Google Search (including Discover and all Google Search
features)"
([Google, Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).

**For your site:** anyone can call themselves Googlebot. Google warns that "The HTTP user agent
string can be spoofed", and publishes a way to check
([Google, Oct 2026](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).

## GPTBot {#gptbot}

OpenAI's crawler that collects pages which may be used to train its AI models
([OpenAI](https://developers.openai.com/api/docs/bots)).

**For your site:** blocking it is a no to training, not a no to ChatGPT search: "Each setting is
independent of the others", and a site "can allow [OAI-SearchBot](#oai-searchbot) in order to appear in search
results while disallowing GPTBot" ([OpenAI](https://developers.openai.com/api/docs/bots)).

## Grounding {#grounding}

When an AI looks up sources before it answers, and bases the answer on them rather than only on
what it learned in [training](#training-data). Google calls it "retrieval-augmented generation
(RAG)", "also known as grounding"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

**For your site:** for Google's AI features, the pages it looks up come from its normal
[index](#index)
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
A grounded answer can still be wrong: "a grounded model is not always a factual model"
([Google, Apr 2026](https://developers.google.com/machine-learning/glossary)).

## Hallucination {#hallucination}

When an AI states something false as if it were fact: "plausible-seeming but factually incorrect
output" ([Google, Apr 2026](https://developers.google.com/machine-learning/glossary)).

**For your site:** if an AI gets your opening hours or prices wrong, this is the word for it.
Anthropic's developer guide says the prompting techniques it lists reduce hallucinations but
"don't eliminate them entirely"
([Anthropic](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)).

## Index {#index}

A search engine's store of the pages it has read. Google "stores the information in the Google
index, which is a large database"
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/how-search-works)).

**For your site:** "Indexing isn't guaranteed; not every page that Google processes will be
indexed"
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/how-search-works)).
[Search Console](#search-console)'s URL Inspection tool gives "detailed crawl, index, and serving
information" about your pages ([Google](https://search.google.com/search-console/about)).

## IndexNow {#indexnow}

A way for your site to tell search engines straight away that a page is new or has changed,
instead of waiting for their [crawlers](#crawler) to notice. Its own site lists Microsoft Bing,
Naver, Seznam.cz, Yandex and Yep as supporters; Google is not on the list
([IndexNow](https://www.indexnow.org/)).

**For your site:** "Submitting a URL does not guarantee immediate indexing"
([IndexNow](https://www.indexnow.org/faq)).

## Large language model {#large-language-model}

The kind of AI that reads and writes text, "trained on vast amounts of text data"
([Anthropic](https://platform.claude.com/docs/en/about-claude/glossary)). Often shortened to LLM.
Google names "Gemini or GPT" as examples
([Google, Apr 2026](https://developers.google.com/machine-learning/glossary)).

## llms.txt {#llms-txt}

A short text file a site can put at `/llms.txt`, listing its most useful pages in a form AI tools
read easily. Proposed by Jeremy Howard in 2024; version 2 is dated August 2026
([llmstxt.org](https://llmstxt.org/)).

**For your site:** Google Search "ignores them", and making one "will neither harm nor help" your
site in Google Search
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
More on [llms.txt](/llms-txt/).

## LLMO {#llmo}

Short for "[large language model](#large-language-model) optimization", another name for
[GEO](#geo). Wikipedia lists it among the "Other terms for the same concept"
([Wikipedia](https://en.wikipedia.org/wiki/Generative_engine_optimization)); Google's guide does not
use it ([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## Mention {#mention}

When an AI answer names your business, with or without a link to your site. As with
[citation](#citation), we found no published definition by Google, OpenAI, Perplexity or
Anthropic, on the pages of theirs that we could read
([what we searched, 29 Oct 2026](search-records.md#citation-and-mention)).

**For your site:** Ahrefs counts a mention "when a brand appears at least once in an AI generated
response" ([Ahrefs, Sep 2026](https://help.ahrefs.com/en/articles/15501968-ai-visibility-metrics)). Google
says you can ignore "pursuing inauthentic mentions"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## Meta-ExternalAgent {#meta-externalagent}

Meta's crawler, for "use cases such as training foundation AI models or improving products"
([Meta, May 2026](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers)).

**For your site:** to block it, Meta says to add a disallow rule for it in robots.txt and to
"allow up to 24 hours" for the change to take effect
([Meta, May 2026](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers)).

## Nofollow {#nofollow}

A label on a link that says you do not vouch for the page it points to. Google: use it when "you'd
rather Google not associate your site with, or crawl the linked page from, your site"
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)).

**For your site:** do not put it on every outside link: "Use nofollow only when you don't trust the
source, and not for every external link on your site"
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)).
For paid links, Google prefers "sponsored", though nofollow is still accepted
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)).

## Noindex {#noindex}

A setting on a page that asks search engines not to list it, set "with either a `<meta>` tag or
HTTP response header"
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/block-indexing)).

**For your site:** it only works if crawlers can visit the page. If robots.txt blocks it, "the
crawler will never see the noindex rule, and the page can still appear in search results". Even
when it can visit, Google may take "months" to come back to a page, depending on how important the
page is
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/block-indexing)).

## OAI-SearchBot {#oai-searchbot}

OpenAI's crawler for ChatGPT's web search: it is "used to surface websites in search results in
ChatGPT's search features" ([OpenAI](https://developers.openai.com/api/docs/bots)).

**For your site:** sites that block it "will not be shown in ChatGPT search answers, though can
still appear as navigational links". Changes to robots.txt can take "~24 hours" to reach search results
([OpenAI](https://developers.openai.com/api/docs/bots)).

## PageSpeed Insights {#pagespeed-insights}

Google's tool that tests how fast a page loads and how it behaves while loading
([Google, Oct 2024](https://developers.google.com/speed/docs/insights/v5/about)). Try it at
[pagespeed.web.dev](https://pagespeed.web.dev).

**For your site:** we suggest running it a few times. Google says the score can change "from run to run" without
any change to your page, and a recently published page may not have enough data from real visitors yet
([Google, Oct 2024](https://developers.google.com/speed/docs/insights/v5/about)).

## Perplexity-User {#perplexity-user}

The visitor that appears when someone asks Perplexity a question and it may open a page to answer
([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

**For your site:** "Since a user requested the fetch, this fetcher generally ignores robots.txt
rules" ([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

## PerplexityBot {#perplexitybot}

Perplexity's crawler for its search results. It "is not used to crawl content for AI foundation
models" ([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

**For your site:** Perplexity recommends allowing it to make sure your site appears in its results
([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

## Quality raters {#quality-raters}

People who check Google's search results by hand, following guidelines Google publishes, so Google
can tell whether its changes work
([Google, Oct 2026](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

**For your site:** they do not rate your site for ranking: "Search raters have no control over how
pages rank. Rater data is not used directly in our ranking algorithms"
([Google, Oct 2026](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

## Query fan-out {#query-fan-out}

When an AI search splits your question into several smaller searches, runs them at once, and uses
what they find for its answer: "A set of concurrent, related queries generated by the model to
request more information"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

**For your site:** Google's example: a question about "how to fix a lawn that's full of weeds"
might also search for "best herbicides for lawns" and "how to prevent weeds in lawn"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## Ranking {#ranking}

The order in which a search engine lists its results. Google describes this step as serving: relevance
"is determined by hundreds of factors", which could include the searcher's location, language and
device
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/how-search-works)).

**For your site:** "Google doesn't accept payment to rank pages higher"
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/how-search-works)).

## Rich result {#rich-result}

A search result with extra details beyond the usual title, address and short description. Google
uses [structured data](#structured-data) to "show that content in a richer appearance in search
results, which is called a rich result"
([Google, Oct 2026](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)).

**For your site:** the markup makes your page "eligible" for a rich result, and Google warns that
"The actual appearance in search results might be different"
([Google, Oct 2026](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)).

## robots.txt {#robots-txt}

A small text file at `yoursite.com/robots.txt` that tells [crawlers](#crawler) which pages they
may visit
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/robots/intro)).

**For your site:** it does not hide a page. A blocked page "can still appear in search results",
just without a description. To keep a page out of Google, use [noindex](#noindex) or a password
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/robots/intro)).

## Schema.org {#schema-org}

The shared vocabulary that most structured data for Google Search uses: agreed names for things like a business, an
address or opening hours. It was "Founded by Google, Microsoft, Yahoo and Yandex"
([Schema.org](https://schema.org/)).

**For your site:** for how Google Search uses it, Google says to rely on its own documentation, not
schema.org's
([Google, Dec 2025](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).

## Search Console {#search-console}

Google's service that shows how your site does in Google Search: "a free service offered by Google
that helps you monitor, maintain, and troubleshoot your site's presence in Google Search results"
([Google](https://support.google.com/webmasters/answer/9128668)).

**For your site:** you do not need it to be listed in Google, but it shows which searches find you,
which pages are listed, and what is wrong
([Google](https://support.google.com/webmasters/answer/9128668)). We suggest every site owner sets
it up.

## Search generative AI control {#search-generative-ai-control}

A switch in Search Console that decides whether your site can appear in Google's AI answers:
[AI Overviews](#ai-overviews), [AI Mode](#ai-mode) and AI features in Discover. Open to all
websites since 31 August 2026
([Google](https://support.google.com/webmasters/answer/16908024)).

**For your site:** it "doesn't affect AI training"; for that, Google points to
[Google-Extended](#google-extended)
([Google](https://support.google.com/webmasters/answer/16908024)). Sites that switch it off "will
not receive traffic or impressions" from those features
([Google, Aug 2026](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/)).

## SEO {#seo}

Short for "search engine optimization": "helping search engines understand your content, and
helping users find your site and make a decision about whether they should visit your site through
a search engine"
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)).

**For your site:** "There are no secrets here that'll automatically rank your site first in Google
(sorry!)", says Google's own guide
([Google, Dec 2025](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)), and "If you run a small local business, you can probably do much
of the work yourself"
([Google, Jun 2026](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)). More in
[SEO basics](/seo/).

## Sitemap {#sitemap}

A file that lists the pages on your site, so search engines can find them. It "doesn't guarantee
that all the items in your sitemap will be crawled and indexed"
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)).

**For your site:** a small, well-linked site of "about 500 pages or fewer", without many videos,
images or news pages you want in search results, may not need one, and if
you use WordPress, Wix or a similar system, Google says "it's likely" one already exists
([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)).

## Snippet {#snippet}

The short text under a result's title in Google. "Snippets are automatically created from page
content" ([Google, Apr 2026](https://developers.google.com/search/docs/appearance/snippet)).

**For your site:** Google uses your page's own description only "sometimes". And "There's no limit on how long a meta description can be"; Google shortens it to fit the
screen ([Google, Apr 2026](https://developers.google.com/search/docs/appearance/snippet)).

## Structured data {#structured-data}

Extra labels in a page's code that say what things are: this is the business name, this is the
address, these are the opening hours. Google: "a standardized format for providing information
about a page and classifying the page content"
([Google, Dec 2025](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).

**For your site:** label only what visitors can see: "don't add structured data about information
that is not visible to the user"
([Google, Dec 2025](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).
For its AI features, Google lists "Overfocusing on structured data" among things you can ignore,
while still calling it "a good idea to continue using it"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

## Training data {#training-data}

The text an AI model learned from before it was released. Language models are "trained on vast
amounts of text data" ([Anthropic](https://platform.claude.com/docs/en/about-claude/glossary)).

**For your site:** changes you make later can reach an AI's answers when it looks things up,
using "sources of knowledge retrieved after the model was trained"
([Google, Apr 2026](https://developers.google.com/machine-learning/glossary)); see
[grounding](#grounding).

## User agent {#user-agent}

The name a visitor gives your website when it asks for a page: a browser, or a crawler such as
Googlebot. It lets servers "identify the application, operating system, vendor, and/or version of
the requesting user agent"
([MDN, Oct 2025](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent)).

**For your site:** it is only a name, and names can be faked: "user agent strings are easy to
spoof" ([Microsoft](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0)).

---

Checked on 3 November 2026.
