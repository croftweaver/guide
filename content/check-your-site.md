# Check your site: five tests you can run yourself

All you need is a browser, and for tests 3 and 4 a Google or Microsoft account. For each test: how
to run it, what the result tells you, and what it does not.

## 1. Is the door open?

Type `yoursite.com/robots.txt` into your browser. You will see your
[robots.txt](/glossary/#robots-txt), the file that tells [crawlers](/glossary/#crawler) which
pages they may visit
([Google](https://developers.google.com/search/docs/crawling-indexing/robots/intro)).

**What it tells you:** which crawlers you have asked to stay away. Compare the names with the list on
[AI crawlers](/ai-crawlers/). No file at all? Google says "Not having a robots.txt file is fine,
and means that Google can crawl all URLs on your site"
([Google](https://support.google.com/webmasters/answer/6062598)).

**What it does not:** whether your host blocks crawlers before they ever reach the file. If your
site runs on Cloudflare, check its Security Settings too: there, "Block" stops [Googlebot](/glossary/#googlebot),
[Bingbot](/glossary/#bingbot) and [Applebot](/glossary/#applebot) as well ([Cloudflare](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)).

*Want your assistant to make these fixes? That is what Croftweaver does.*

## 2. How fast is it?

Open [pagespeed.web.dev](https://pagespeed.web.dev), enter your address, and run it three times.

**What it tells you:** how your page loads on a phone and a computer, with suggestions. Google
explains two kinds of result: lab data from "a simulated load of a page on a single device", and
field data from real visitors over "the previous 28-day collection period"
([Google, Oct 2024](https://developers.google.com/speed/docs/insights/v5/about)).

**What it does not:** give you one true number. Google says the score can change "from run to run"
without any change to your page, which is why we suggest three runs and reading the spread. A new
page may have no real-visitor data yet
([Google, Oct 2024](https://developers.google.com/speed/docs/insights/v5/about)). And "having good
lab data does not necessarily mean real-user experiences will also be good"
([Google, Oct 2024](https://developers.google.com/speed/docs/insights/v5/about)).

*Want your assistant to make these fixes? That is what Croftweaver does.*

## 3. Does Google know your pages?

Set up [Search Console](/glossary/#search-console), "a free service offered by Google"
([Google](https://support.google.com/webmasters/answer/9128668)). Add your site and prove it is
yours. If you use WordPress, Wix or Squarespace, Google says your platform "might provide a special
plugin or setting to verify your property easily, or even automatically"
([Google](https://support.google.com/webmasters/answer/9008080)). Adding it "does not affect your
website", and data "should begin to appear in your property in a few days"
([Google](https://support.google.com/webmasters/answer/34592)).

Then type a page's address into the URL Inspection bar at the top.

**What it tells you:** whether Google has that page in its [index](/glossary/#index). "URL is not
on Google means that the URL can't appear in Search results"
([Google](https://support.google.com/webmasters/answer/9012289)). Since 31 August 2026 it also
holds the switch for Google's AI answers, the
[Search generative AI control](/glossary/#search-generative-ai-control)
([Google](https://support.google.com/webmasters/answer/16908024)).

**What it does not:** promise a place in results. Google warns: "URL is on Google" does not actually
guarantee that your page will appear in Search results, and the inspection shows the last indexed
version, "not the live version on the web"
([Google](https://support.google.com/webmasters/answer/9012289)).

*Want your assistant to make these fixes? That is what Croftweaver does.*

## 4. How does Bing, and its AI, see you?

Open a "free [Bing Webmaster Tools](/glossary/#bing-webmaster-tools) account" at
[bing.com/toolbox/webmaster](https://www.bing.com/toolbox/webmaster/). You can sign in with a
Microsoft, Google or Facebook account
([Microsoft](https://www.bing.com/webmasters/help/getting-started-checklist-66a806de)). If you
already use Search Console, you can import your site from there and it gets "automatically
verified". Know that Bing will then "periodically validate the site ownership status by accessing
your Search Console account"
([Microsoft](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)).

**What it tells you:** besides Bing search, an AI Performance report: how often your pages are
shown as sources in Copilot and Bing's AI answers
([Bing, Feb 2026](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)).
Data "usually takes 48 hours" to appear
([Microsoft](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b)).

**What it does not:** tell you how important a page is. Bing says the report "reflects how often
pages are cited, not page importance, [ranking](/glossary/#ranking), or placement"
([Bing, Feb 2026](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)).

*Want your assistant to make these fixes? That is what Croftweaver does.*

## 5. Ask your AI assistant, and make it show its sources

Paste this into ChatGPT, Claude or Gemini:

> Please review my website [your address] for how easy it is to find on Google and in AI answers.
> List the five most important improvements. For each one, name and link the official source
> (documentation from Google, Bing, OpenAI, Anthropic or Perplexity) it is based on. If there is no
> official source, say so.

Then ask the same thing a second time, or in a second assistant, and compare.

**What it tells you:** ideas worth checking. The sources let you check each one, which is one of
the two marks of good advice Google names: it "backs up their claims by citing official Google Search
guidance" ([Google, Jun 2026](https://developers.google.com/search/docs/fundamentals/third-party-seo)).

**What it does not:** give you a verdict you can trust without checking. OpenAI lists "Fabricated
quotes, studies, [citations](/glossary/#citation) or references to non-existent sources" among ChatGPT's possible mistakes
([OpenAI](https://help.openai.com/en/articles/8313428-does-chatgpt-tell-the-truth)), and Anthropic
says "users should review Claude's cited sources"
([Anthropic](https://support.claude.com/en/articles/8525154-claude-is-providing-incorrect-or-misleading-responses-what-s-going-on)).
Open every link it gives you. And if it gives you a score, see
the section about scores on the [E-E-A-T](/glossary/#e-e-a-t) page ([E-E-A-T](/eeat/)).

*Want your assistant to make these fixes? That is what Croftweaver does.*

---

Checked on 3 November 2026.
