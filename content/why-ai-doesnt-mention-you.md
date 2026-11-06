# Why doesn't ChatGPT mention my business?

**The short answer:** you're not alone, and the answers change over time. What the companies say,
and what you can check yourself, is below.

## How common is it?

A study by Clixera, an Ottawa company that sells online-visibility analysis, published on its own website in
October 2026 (who paid: not stated; authors not named), asked ChatGPT about thousands of independent
main-street businesses across nine Canadian provinces. It found: "ChatGPT named only 44% of the
local businesses we tested." It counted only businesses that already had their own website and a
Google Business Profile, and asked each question once; it calls itself "a point-in-time snapshot".
Its own caution: "ChatGPT answers change with
wording, model updates, and time, so a business that wasn't named here can still appear later"
([Clixera](https://clixera.ca/research/canada-ai-visibility-bia-2026)).

## The usual reasons

**1. It didn't look anything up.** An AI can answer from what it learned in
[training](/glossary/#training-data), or by searching the web first: Anthropic's developer docs for its
web search tool, for one, say Claude
"answers directly without searching when the request draws on stable knowledge"
([Anthropic](https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool)). → [How AI answers work](/how-ai-answers-work/)

**2. Your site turned it away.** Sites that block OpenAI's search [crawler](/glossary/#crawler) "will not be shown in
ChatGPT search answers", though they "can still appear as navigational links"
([OpenAI](https://developers.openai.com/api/docs/bots)). Check your
[robots.txt](/glossary/#robots-txt) and, if you use Cloudflare, its settings. →
[AI crawlers](/ai-crawlers/)

**3. Google can't show your page.** For Google's own AI answers, "a page must be indexed and
eligible to be shown in Google Search with a [snippet](/glossary/#snippet)"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
[Search Console](/glossary/#search-console)'s URL Inspection tool gives "detailed crawl, [index](/glossary/#index), and serving
information" about your pages ([Google](https://search.google.com/search-console/about)).

**4. You're hard to place.** Google says its local results are "mainly based on relevance,
distance, and popularity", where relevance is "how well a Business Profile matches what someone is
searching for" ([Google](https://support.google.com/business/answer/7091?hl=en)). For its AI
answers, Google says "Google Business Profiles can help your products and services to be visible in
both AI responses and other Google Search results"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

**5. Nobody else talks about you.** Google's local results also look at "how many websites link to
your business and how many reviews you have"
([Google](https://support.google.com/business/answer/7091?hl=en)), and says its AI features "can
show what's being said about products and services across the web". It also warns that seeking
inauthentic [mentions](/glossary/#mention) "isn't as helpful as it might seem"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

**6. It's a different day.** The same question can get a different answer: Clixera's caution above.

## What about Copilot and the others?

We found no published Microsoft statement on how Copilot picks local businesses
([what we searched, 29 October 2026](search-records.md#copilot-local)). Microsoft's Bing Places
puts listings "in Bing search results and Bing Maps"
([Microsoft, Oct 2025](https://blogs.bing.com/search/2025/10/Introducing-the-New-Bing-Places-for-Business-Built-for-Business-Owners,-Powered-by-Research/)).

## What you can do this week

We suggest, in this order:

1. **Check that the door is open.** Open `yoursite.com/robots.txt` and compare it with
   [AI crawlers](/ai-crawlers/).
2. **Claim your listings:** Google Business Profile, and Bing Places, which Microsoft calls "a free
   online platform"
   ([Microsoft, Oct 2025](https://blogs.bing.com/search/2025/10/Introducing-the-New-Bing-Places-for-Business-Built-for-Business-Owners,-Powered-by-Research/)).
3. **Say plainly what you do and where,** on your home page and in your listings, in the words a
   customer would use.
4. **Ask happy customers for reviews.** Google counts them for local results (above).
5. **Ask the assistant again in a month,** with the same words, and write down what it says.

## Questions

**Can I pay to be mentioned?**
For Google's local results, no: "There's no way to request or
pay for a better local [ranking](/glossary/#ranking) on Google"
([Google](https://support.google.com/business/answer/7091?hl=en)).

**An agency promises to get me into ChatGPT. Can they?**
We suggest asking which study their method rests on, and checking it. Google warns that "No
third-party tool has access to our internal ranking or AI systems"
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

---

Checked on 3 November 2026.
