# AI crawlers: who's reading your website, and who should you let in?

Search engines and AI companies send programs to read websites. They're called
[crawlers](/glossary/#crawler) ([Google](https://developers.google.com/search/docs/fundamentals/how-search-works)).
Some read your pages so they can show them in answers. Some read them to train AI. Some come only
because a person asked an AI to open one of your pages. OpenAI, for one, runs a separate visitor
for each of the three ([OpenAI](https://developers.openai.com/api/docs/bots)).

You can decide which of them get in. Start with what you want.

## What do you want?

### I want my business to show up in AI answers

We suggest you let in the search crawlers: [OAI-SearchBot](/glossary/#oai-searchbot) for ChatGPT,
[Claude-SearchBot](/glossary/#claude-searchbot) for Claude and
[PerplexityBot](/glossary/#perplexitybot) for Perplexity, along with
[Googlebot](/glossary/#googlebot) and [Bingbot](/glossary/#bingbot).

Here is why. Sites that block OpenAI's search crawler "will not be shown in ChatGPT search answers"
([OpenAI](https://developers.openai.com/api/docs/bots)). Blocking Anthropic's "may reduce your
site's visibility" in Claude's search
([Anthropic](https://support.claude.com/en/articles/8896518-anthropic-crawlers)). And Perplexity
recommends allowing its crawler if you want to appear in its results
([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)).

### I don't want my pages used to train AI

You can say no to training and still be found. Each company has a name for its training use:
[GPTBot](/glossary/#gptbot) (OpenAI), [ClaudeBot](/glossary/#claudebot) (Anthropic),
[Google-Extended](/glossary/#google-extended) (Google),
[Applebot-Extended](/glossary/#applebot-extended) (Apple) and
[Meta-ExternalAgent](/glossary/#meta-externalagent) (Meta). We suggest you block the ones you mind.

OpenAI, Google and Apple each say that blocking their training name doesn't take you out of their
search ([OpenAI](https://developers.openai.com/api/docs/bots),
[Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers),
[Apple](https://support.apple.com/en-us/119829)). One thing to know: Anthropic's page talks about
leaving out your "future materials"; it doesn't say what happens to pages it has already collected
([Anthropic](https://support.claude.com/en/articles/8896518-anthropic-crawlers)).

### I want to stay in Google, but not in its AI answers

Don't block Googlebot for this: its rules cover all of Google Search, not only the AI parts
([Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).

Use the switch Google made for it instead. In [Search Console](/glossary/#search-console), under
Settings, the [Search generative AI control](/glossary/#search-generative-ai-control) decides
whether your site appears in [AI Overviews](/glossary/#ai-overviews) and
[AI Mode](/glossary/#ai-mode). It has been open to every website since 31 August 2026. Google says a change "generally takes a
few days" to work, and some content may take longer
([Google](https://support.google.com/webmasters/answer/16908024)). Sites that switch it off
"will not receive traffic or impressions" from those features
([Google](https://blog.google/products-and-platforms/products/search/new-controls-website-owners/)).

For Microsoft's Copilot, the tool is a tag on the page called NOARCHIVE, not [robots.txt](/glossary/#robots-txt). It keeps
the page out of Copilot's answers and its [grounding](/glossary/#grounding), the look-up behind an
AI answer ([Microsoft](https://www.bing.com/webmasters/help/Webmaster-Guidelines-30fba23a)).

### My site runs on Cloudflare

Look at Cloudflare first, because it has its own settings for AI visitors. Since 15 September 2026,
choosing "Block" there stops Googlebot, Bingbot and [Applebot](/glossary/#applebot) too, "search included". To stop
training and keep search, Cloudflare says to choose "Disallow AI Training"
([Cloudflare](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)). You'll find these
under Security Settings for your domain
([Cloudflare](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)). Cloudflare's help page, updated 2 November 2026,
lists that choice as "Disallow", for training only
([Cloudflare docs](https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/)).

## See what your site says today

Type `yoursite.com/robots.txt` into your browser. You'll see a short text file, your
[robots.txt](/glossary/#robots-txt). It tells crawlers which pages they may visit
([Google](https://developers.google.com/search/docs/crawling-indexing/robots/intro)).

Each crawler is named on a `User-agent:` line. Anthropic's own example for keeping its crawler out
looks like this ([Anthropic](https://support.claude.com/en/articles/8896518-anthropic-crawlers)):

```
User-agent: ClaudeBot
Disallow: /
```

Compare the names in your file with the list further down. For more tests you can run yourself,
see [Check your site](/check-your-site/).

## Good to know

- **It's a request, not a lock.** The standard behind robots.txt says crawlers are "requested to
  honor" it, and that it is "not a form of access authorization"
  ([IETF, RFC 9309](https://www.rfc-editor.org/rfc/rfc9309)).
- **Some visitors skip it when a person asks.** OpenAI says robots.txt "may not apply" to
  [ChatGPT-User](/glossary/#chatgpt-user) ([OpenAI](https://developers.openai.com/api/docs/bots));
  Perplexity says [Perplexity-User](/glossary/#perplexity-user) "generally ignores" it
  ([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)); Meta says one of
  its fetchers "may bypass" it
  ([Meta](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers)).
- **Names can be faked.** A visitor's [user agent](/glossary/#user-agent), the name it gives your
  site, is just text: Google warns it "can be spoofed"
  ([Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).
  Google, Microsoft, OpenAI, Anthropic, Perplexity, Apple and Common Crawl each publish a way to
  check whether a visitor really is theirs, on the pages linked below.
- **Apple copies your Google rules.** If your file doesn't name [Applebot](/glossary/#applebot)
  but does name Googlebot, Applebot follows the Googlebot rules
  ([Apple](https://support.apple.com/en-us/119829)).
- **Changes take about a day.** OpenAI says about 24 hours for search
  ([OpenAI](https://developers.openai.com/api/docs/bots)); Perplexity and Meta say up to 24 hours
  ([Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers),
  [Meta](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers)).
- **One open question.** We found no published Google statement on whether blocking
  Google-Extended changes whether your site appears in AI Overviews or AI Mode
  ([what we searched, 29 October 2026](search-records.md#google-extended-ai-overviews)). For
  those, use the Search Console switch above.

## Who's who

### Google

- **Googlebot** reads pages for Google Search, "including Discover and all Google Search
  features". Its rules apply to all of them
  ([Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).
- **Google-Extended** isn't a visitor. It's a name you can use in robots.txt to keep your pages
  out of training Google's Gemini models, and out of the look-ups behind Gemini's answers. Google
  says it "does not impact a site's inclusion in
  Google Search"
  ([Google](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)).

### Microsoft

- **Bingbot** is "our standard crawler", Microsoft says
  ([Microsoft](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0)). Its
  guidelines cover Bing search and Copilot; for Copilot, they point to the NOARCHIVE tag
  ([Microsoft](https://www.bing.com/webmasters/help/Webmaster-Guidelines-30fba23a)).

### OpenAI (ChatGPT)

- **OAI-SearchBot** finds pages for ChatGPT search. Blocked sites won't be shown in ChatGPT search
  answers, "though can still appear as navigational links".
- **GPTBot** collects pages that may be used to train OpenAI's models. Blocking it is a no to
  training, and has no effect on OAI-SearchBot: "Each setting is independent of the others".
- **ChatGPT-User** may open a page when someone asks ChatGPT a question; robots.txt "may not apply".

All three: [OpenAI](https://developers.openai.com/api/docs/bots).

### Anthropic (Claude)

- **Claude-SearchBot** finds pages for Claude's web search.
- **ClaudeBot** collects pages that may be used to train Anthropic's models.
- **[Claude-User](/glossary/#claude-user)** may open a page when someone asks Claude a question.

Anthropic says blocking the search crawler or Claude-User may make your site less visible in
Claude's answers. All three: [Anthropic](https://support.claude.com/en/articles/8896518-anthropic-crawlers).

### Perplexity

- **PerplexityBot** finds pages for Perplexity's answers, and is "not used to crawl content for AI
  foundation models".
- **Perplexity-User** may open a page when someone asks Perplexity a question, and "generally ignores
  robots.txt rules".

Both: [Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).

### Apple

- **Applebot** reads pages for search in Spotlight, Siri and Safari, and its data may also be used
  to train Apple's models.
- **Applebot-Extended** isn't a visitor. It's a name you use in robots.txt to say no to training;
  pages that use it "can still be included in search results".

Both: [Apple](https://support.apple.com/en-us/119829).

### Meta

- **Meta-ExternalAgent** reads pages "for use cases such as training foundation AI models or
  improving products"
  ([Meta](https://developers.facebook.com/documentation/sharing/webmasters/web-crawlers)).

### Common Crawl

- **[CCBot](/glossary/#ccbot)** belongs to Common Crawl, a non-profit that publishes "an open
  repository of web crawl data" that anyone can use ([Common Crawl](https://commoncrawl.org/ccbot)).

These pages were dated: Google 30 October 2026, Anthropic 7 April 2026, Apple 4 September 2026,
Meta 21 May 2026. OpenAI's, Microsoft's, Perplexity's and Common Crawl's carry no date.

## Questions

**If I block GPTBot, will I disappear from ChatGPT?**
Not from ChatGPT search. OpenAI gives this exact case: a site "can allow OAI-SearchBot in order to
appear in search results while disallowing GPTBot"
([OpenAI](https://developers.openai.com/api/docs/bots)).

**Will blocking Google-Extended keep me out of AI Overviews?**
We found no published Google statement either way
([what we searched](search-records.md#google-extended-ai-overviews)). Google's switch for AI
Overviews is the one in Search Console
([Google](https://support.google.com/webmasters/answer/16908024)).

**Can I stop an AI from opening my page when someone asks it to?**
Not reliably with robots.txt: OpenAI and Perplexity both say their visitors that open a page for a
person may not follow it (see "Good to know" above).

---

Checked on 3 November 2026.
