# Structured data and FAQs: does special markup help with AI?

**The short answer:** for Google's AI answers you do not need it
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)),
the one study of the three below that tracked the same pages before and after found no real lift, and Google's FAQ result is gone ([Google changelog](https://developers.google.com/search/updates)).
We suggest you keep labelling what visitors can see,
for Google's ordinary results, and not add markup hoping AI will quote you more.

## What we are talking about

[Structured data](/glossary/#structured-data) is a set of extra labels in a page's code: this is
the business name, this is the address, these are the opening hours. Most of it uses a shared
vocabulary called [Schema.org](/glossary/#schema-org), which is why people call it "schema". It can
make a page eligible for a [rich result](/glossary/#rich-result), a search result with extra
details ([Google](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).

## What Google says

Google is clear about its own AI answers: "Structured data isn't required for generative AI search,
and there's no special schema.org markup you need to add." In the same breath it calls structured
data "a good idea to continue using" for ordinary rich results
([Google, Jul 2026](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).

One rule matters for every site: "don't add structured data about information that is not visible
to the user"
([Google, Dec 2025](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)).

## What the studies found

Three companies that sell [SEO](/glossary/#seo) and AI-visibility tools have published studies. None says who paid
for it or refers to peer review; all three appeared on the companies' own websites.

**Ahrefs: the same pages, before and after.** A study by Ahrefs, published on its blog in May 2026
(who paid: not stated), followed 1,885 pages that added structured data, compared with 4,000 similar
pages that did not, for 30 days before and 30 days after. It found: "Adding schema produced no major uplift in [citations](/glossary/#citation) on
any platform." Citations in [AI Overviews](/glossary/#ai-overviews) fell by 4.6% more than on the similar
pages; the small rises
in [AI Mode](/glossary/#ai-mode) and ChatGPT were "statistically indistinguishable from zero". Its
own limit: every page was already cited often, so "Our study can't speak to" pages AI does not yet
quote ([Ahrefs](https://ahrefs.com/blog/schema-ai-citations/)).

**Search Atlas: many sites, compared.** A study by Search Atlas, published on its site in December
2025 (who paid: not stated), compared sites with more or less structured data against how often
OpenAI, Gemini and Perplexity mentioned them. It found that "schema markup has no measurable effect
on LLM visibility across OpenAI, Gemini, or Perplexity"
([Search Atlas](https://searchatlas.com/research/the-limits-of-schema-markup-for-ai-search/)).

**Semrush: a pattern, not a cause.** A study by Semrush, published on its blog in January 2026 (who
paid: not stated), looked at 5 million pages cited by ChatGPT and AI Mode and counted which kinds
of markup they carried. It gives no figure for a lift, and says: "This study identifies
correlations, not causation"
([Semrush](https://www.semrush.com/blog/technical-seo-impact-on-ai-search-study/)).

## Two numbers you may come across

***Structured data: +22%.*** This comes from a different Semrush study of 304,805 pages cited by
AI, which gives "Structured data elements: +21.60%". The figure belongs to what the study calls a "structured data score", which it does not define, and
its own method note says: "We didn't evaluate metadata, HTML structure, schema markup, page layout, or any
technical SEO factors"
([Semrush, Jan 2026](https://www.semrush.com/blog/content-optimization-ai-search-study/)). So it
is not about schema markup at all.

***FAQ schema lifts AI citations by 112%.*** We found no published study behind this figure, and
no publisher or date for it
([what we searched, 29 October 2026](search-records.md#faq-schema-112)).

## The FAQ result is gone

Google used to show a page's questions and answers right under its link: the
[FAQ rich result](/glossary/#faq-rich-result). Google ended it: "This feature will no longer appear
in Google Search starting May 7, 2026", and removed its documentation on 15 June 2026
([Google changelog](https://developers.google.com/search/updates)).

If your site still carries FAQ markup, there is no hurry to take it off. When Google first
narrowed the result in 2023, it said unused markup "does not cause problems for Search"
([Google, Aug 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes)).

## So, should you bother?

- **Yes, for the basics.** We suggest marking up what is on the page anyway: your business, address,
  opening hours. Google still uses it for ordinary rich results (above).
- **Not for AI alone.** None of the studies above found that adding markup brings more AI
  citations.
- **Keep the questions.** We suggest keeping a questions-and-answers section on pages where people
  have real questions, for your readers' sake.

## Questions

**Will structured data get me into AI Overviews?**
Google says there are "no additional requirements to appear in AI Overviews or AI Mode, nor other
special optimizations necessary"
([Google, Dec 2025](https://developers.google.com/search/docs/appearance/ai-features)).

**My web designer says FAQ schema is a must. Is it?**
Not for Google's results any more: the FAQ result ended on 7 May 2026
([Google changelog](https://developers.google.com/search/updates)). Ask which study they rely on,
and check it against the ones above.

**Does it hurt to have it?**
Google said in 2023 that markup it no longer uses "does not cause problems for Search"
([Google, Aug 2023](https://developers.google.com/search/blog/2023/08/howto-faq-changes)).

---

Checked on 3 November 2026.
