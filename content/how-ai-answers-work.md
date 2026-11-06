# How AI answers work: from memory, or from a search

**The short answer:** an AI assistant answers either from what it learned in training, or by
searching the web first and writing its answer from what it found. When it searches, it can link to
your site. Each assistant searches in a different place, and some say more about where than others.

## Two ways to answer

**From memory.** AI models are "trained on vast amounts of text data" before they're released
([Anthropic](https://platform.claude.com/docs/en/about-claude/glossary)): their
[training data](/glossary/#training-data). For some questions it answers from that alone. Anthropic's
developer docs for its web search tool say Claude "answers directly without searching when the request draws on stable knowledge", and
searches when the question depends on information that is "current, changing, or outside its
training data" ([Anthropic](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool)).
Google's developer docs say Gemini "analyzes the prompt and determines if a Google Search can
improve the answer" ([Google](https://aistudio.google.com/docs/google-search)).

**From a search.** The assistant looks things up, then writes its answer from the pages it found.
This is called [grounding](/glossary/#grounding). Answers built this way can come with links: Perplexity
says "each answer includes numbered [citations](/glossary/#citation) linking to the original sources"
([Perplexity](https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work)),
and Anthropic says that with web search in Claude, "Every response includes citations"
([Anthropic](https://support.claude.com/en/articles/10684626-enabling-and-using-web-search)).

## Where each assistant searches

**Google [AI Overviews](/glossary/#ai-overviews) and [AI Mode](/glossary/#ai-mode)** use Google's own search. Google says its systems use "our core
Search [ranking](/glossary/#ranking) systems to retrieve relevant, up-to-date web pages from our Search [index](/glossary/#index)"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
To be shown as a supporting link, a page "must be indexed and eligible to be shown in Google Search with a [snippet](/glossary/#snippet)"
([Google, Dec 2025](https://developers.google.com/search/docs/appearance/ai-features)).

**ChatGPT** uses other companies' search. OpenAI says ChatGPT search "leverages third-party search
providers, as well as content provided directly by our partners"
([OpenAI, Oct 2024](https://openai.com/index/introducing-chatgpt-search/)). Its help page names
Microsoft and Shopify as providers whose privacy policies apply, and says how to make a site eligible:
"allow [OAI-Searchbot](/glossary/#oai-searchbot) to crawl the site"
([OpenAI](https://help.openai.com/en/articles/9237897-chatgpt-search)). Asked whether ChatGPT
still uses Bing, an OpenAI engineering lead answered: "We use a set of services and Bing is an
important one", as Search Engine Journal reports
([Search Engine Journal, Nov 2024](https://www.searchenginejournal.com/openai-reddit-ama-answers-hint-at-seo-for-chatgpt-search/531627/)).
One consultant's test of a single page found ChatGPT "relying on Google Search results snippets"
([Aleyda Solis, Jul 2025](https://www.aleydasolis.com/en/ai-search/chatgpt-uses-google-serp-snippets-for-answers/)).

**Perplexity** says it runs its own search: "Our search index tracks over 200 billion unique URLs"
([Perplexity, Sep 2025](https://research.perplexity.ai/articles/architecting-and-evaluating-an-ai-first-search-api)). Its
search [crawler](/glossary/#crawler) is [PerplexityBot](/glossary/#perplexitybot)
([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

**Claude:** Anthropic's list of the companies that process data for it names three under "Web
Search": Brave Search,
TurboPuffer and Parallel Web Systems. The list doesn't say which one answers which question
([Anthropic Trust Center](https://trust.anthropic.com/subprocessors)). In March 2025, a developer
asked Claude a question and found its ten sources "were an exact match for that search on Brave"
([Simon Willison, Mar 2025](https://simonwillison.net/2025/Mar/21/anthropic-use-brave/)).

**Microsoft Copilot** uses Bing. For Copilot at work, Microsoft says that when web search is on, it "may fetch information from
the Bing search service when information from the web helps to provide a better, more grounded
response" ([Microsoft, Oct 2026](https://learn.microsoft.com/en-us/copilot/microsoft-365/manage-public-web-access)).

## What this means for your site

We suggest:

- **Be in Google and Bing.** Between them they cover Google's AI answers and Copilot, and Bing is
  one of the services ChatGPT uses (above). [Search Console](/glossary/#search-console) and
  [Bing Webmaster Tools](/glossary/#bing-webmaster-tools) show whether you are. → [Check your site](/check-your-site/)
- **Let the search crawlers in.** Each assistant needs to reach your pages. → [AI crawlers](/ai-crawlers/)
- **Search for your business on Brave Search** at [search.brave.com](https://search.brave.com) as
  well. It's one of the services on Claude's list (above).
- **Ask the assistant to search the web** when you test what it knows about you. Otherwise it may
  answer from memory.

## Questions

**Why does ChatGPT say something out of date about my business?**
It may be answering from memory. Models stop learning at a cut-off date; Anthropic, for example,
lists a "Training data cutoff" for each Claude model
([Anthropic](https://docs.claude.com/en/docs/about-claude/models/overview)). Ask it to search the
web, and check that your site and listings are up to date.

**Does ChatGPT use Google?**
OpenAI doesn't name Google among its search providers on the pages above. One consultant's test of a
single page found ChatGPT relying on Google's snippets
([Aleyda Solis, Jul 2025](https://www.aleydasolis.com/en/ai-search/chatgpt-uses-google-serp-snippets-for-answers/)).
We suggest not reading one test of one page as a rule.

---

Checked on 3 November 2026.
