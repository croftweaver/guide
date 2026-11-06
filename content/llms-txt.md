# llms.txt: do you need one?

**The short answer:** Google Search ignores it
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
One large study found it is rarely read, and another found no effect on how many
[citations](/glossary/#citation) a site gets from AI models (both below). We suggest you make one only if your website tool does it for you, and expect
nothing from it for now.

## What it is

An [llms.txt](/glossary/#llms-txt) is a short text file at `yoursite.com/llms.txt` that lists a
site's most useful pages in a form AI tools read easily. Jeremy Howard proposed it in 2024; version
2 is dated August 2026 ([llmstxt.org](https://llmstxt.org/)).

## What Google says

**Google Search:** "Google Search ignores them". Making one "will neither harm nor help your site's
visibility or [rankings](/glossary/#ranking) in Google Search"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

**Chrome's Lighthouse:** Google's site-testing tool has a check for the file. It calls llms.txt "an
emerging convention", and if a site has none, the check is marked "Not Applicable (N/A), as
providing the file is optional at the moment"
([Google Chrome, May 2026](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)).
So a missing file does not count against you.

**A Google employee's view:** Search Engine Journal reports that John Mueller of Google said that
an AI system "can't trust what is here as a way of differentiating between different websites",
because the file is written by the site itself
([Search Engine Journal, Jun 2026](https://www.searchenginejournal.com/googles-mueller-says-llms-txt-cant-help-llms-differentiate-sites/579304/)).

## What the studies found

**Who reads the file?** A study by Ahrefs, a company that sells [SEO](/glossary/#seo) and AI-visibility tools,
published on its blog in June 2026 (who paid: not stated), checked 137,210 websites that use its own analytics tool. It found that
28% had an llms.txt, and that "97% of those files received zero traffic in May 2026". Its own
limit: its customers "skew more technical", so the 28% is "an upper bound"
([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)).

**Does it bring citations?** A study by SE Ranking, a company that sells SEO tools, published on
its blog (who paid: not stated), looked at about 300,000 websites. It found: "Both statistical
analysis and machine learning showed no effect of LLMs.txt on how often a domain is cited by
LLMs." It calls its own findings "context-dependent"
([SE Ranking](https://seranking.com/blog/llms-txt/)).

## What we saw on this site

This guide has its own llms.txt. After launch we will record here which visitors fetch it, with
dates. Until then there is nothing to report.

## Should you make one?

- **If your website tool makes it for you,** we suggest you leave it on. Google says it neither
  harms nor helps you in Google Search (above).
- **If it means extra work,** we suggest you spend that time on clear pages instead. None of the
  studies above found a benefit.
- **Do not treat it as a lock.** It is not a way to keep AI out; that is what
  [robots.txt](/glossary/#robots-txt), the file for [crawlers](/glossary/#crawler), is for. See [AI crawlers](/ai-crawlers/).

## Questions

**Will an llms.txt get me into ChatGPT?**
We found no published statement, on the pages where OpenAI, Anthropic and Perplexity describe
their crawlers, that those crawlers read a site's llms.txt. OpenAI's and Perplexity's refer to it only as a list of their own
documentation pages
([what we searched, 29 October 2026](search-records.md#llms-txt-crawlers)).

**Does Google penalise a site without one?**
No. Google Search ignores the file, and Chrome's Lighthouse marks a missing one "Not Applicable"
([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide),
[Google Chrome](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt)).

---

Checked on 3 November 2026.
