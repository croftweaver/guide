# AI SEO checklist: what matters, and what doesn't

**The short answer:** nine checks worth making if you want to be found on Google and named by AI
assistants, the work people call AI [SEO](/glossary/#seo). They are checks with further reading, not a list of what decides it, and none promises
a place in any answer. Each one links to the page in this guide that explains it, with the
sources, and, where you can run one yourself, to the test on [Check your site](/check-your-site/).

## The checklist

1. **Let [crawlers](/glossary/#crawler) read your site.** Open your [robots.txt](/glossary/#robots-txt) and your host's
   bot settings. Sites that block OpenAI's search crawler "will not be shown
   in ChatGPT search answers", though they "can still appear as navigational links"
   ([OpenAI](https://developers.openai.com/api/docs/bots)). On
   Cloudflare, "Block" also stops [Googlebot](/glossary/#googlebot),
   [Bingbot](/glossary/#bingbot) and [Applebot](/glossary/#applebot)
   ([Cloudflare](https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/)). Explained on
   [AI crawlers](/ai-crawlers/). Test: [Check your site](/check-your-site/), test 1, *Is the door
   open?*

2. **Check that Google has [indexed](/glossary/#index) your pages.** Look up a page's address in
   [Search Console](/glossary/#search-console).
   "URL is not on Google means that the URL can't appear in Search results"
   ([Google](https://support.google.com/webmasters/answer/9012289)). Explained on
   [SEO basics](/seo/). Test: [Check your site](/check-your-site/), test 3, *Does Google know your
   pages?*

3. **Set Google's switch for its AI answers the way you want.** In Search Console, the
   [Search generative AI control](/glossary/#search-generative-ai-control) lets you decide whether your
   site appears in [AI Overviews](/glossary/#ai-overviews) and [AI Mode](/glossary/#ai-mode). It has
   been open to every website since 31 August 2026
   ([Google](https://support.google.com/webmasters/answer/16908024)). The steps are on
   [AI crawlers](/ai-crawlers/). Test 3 on [Check your site](/check-your-site/) opens Search
   Console, where this switch sits, but does not walk you through the switch.

4. **Have Bing know your pages, and read its AI report.** In
   [Bing Webmaster Tools](/glossary/#bing-webmaster-tools), a report shows how often your pages
   are shown as sources in Copilot and Bing's AI answers
   ([Bing, Feb 2026](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)).
   Explained, with the test, on [Check your site](/check-your-site/), test 4, *How does Bing, and
   its AI, see you?*

5. **Check that pages work on a phone, and load fast enough.** "Google uses the mobile version of a
   site's content, crawled with the smartphone agent, for indexing and [ranking](/glossary/#ranking)"
   ([Google, Dec 2025](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)).
   That quote is about the phone version, not speed. Explained on [SEO basics](/seo/). Test, for
   speed: [Check your site](/check-your-site/), test 2, *How fast is it?*

6. **Say plainly what you do, where, and for whom.** We suggest the words a customer would use,
   on your home page and in your listings. Explained on the page about why AI may not [mention](/glossary/#mention) a business,
   [Why doesn't ChatGPT mention my business?](/why-ai-doesnt-mention-you/), on the
   [home page](/), and, for AI answers, on the [GEO](/glossary/#geo) [own page](/geo/).

7. **Show who is behind the site.** We suggest a real name, an About page, and details a visitor
   can check. This is what [E-E-A-T](/glossary/#e-e-a-t) is about; explained on its
   [own page](/eeat/).

8. **Give others a reason to talk about you.** We suggest claiming your listings and asking happy
   customers for reviews. Explained on [that same page](/why-ai-doesnt-mention-you/).

9. **Ask an AI assistant about your site, and check its sources.** We suggest you open every link
   it gives you. Test: [Check your site](/check-your-site/), test 5, *Ask your AI assistant, and
   make it show its sources*.

Further reading: [How long until Google and AI find you](/how-long/). If an AI assistant built your
site, Croftweaver has a checklist for that case too:
[AI website SEO checklist](https://croftweaver.com/ai-website-seo-checklist).

## What we left off, and why

Other checklists often carry these. We left them off, and each page below says why.

- **[llms.txt](/glossary/#llms-txt) as a must-have.** Google Search ignores llms.txt
  ([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
  One large study found it is rarely read, and another found no effect on how many
  [citations](/glossary/#citation) a site gets from AI models. See [llms.txt: do you need one?](/llms-txt/)
- **[Structured data](/glossary/#structured-data) or FAQ markup to get quoted by AI.** Google says
  "Structured data isn't required for generative AI search", though it is still "a good idea to
  continue using" it
  ([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
  See [Structured data and FAQs](/schema-and-faq/).
- **A score for your site from an AI assistant.** When we asked three assistants, in the same words,
  to score the same page, their scores were 23 points apart. See the section about scores on the [E-E-A-T](/eeat/)
  page, and test 5 on [Check your site](/check-your-site/).

---

Checked on 7 November 2026.
