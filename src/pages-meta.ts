// The guide's pages. Each Markdown file in content/ is a copy of the checked draft, so
// title and description live here, not in front matter. Route = '/' + slug
// ('/' for index): no trailing slash, as astro.config.mjs sets.
export interface GuidePage {
  slug: string;
  title: string;        // <title> is "{title} | {SITE.name}": keep the title at 40 characters or fewer (the home page shows SITE.titleHome instead, see Base.astro)
  description: string;  // 120–160 characters
}

export const GUIDE_PAGES: GuidePage[] = [
  {
    slug: 'index',
    title: 'Get found on Google and in AI answers',
    description:
      'A free guide for people who run a website and would rather not learn jargon. Every claim about Google or AI names its source, and links it.',
  },
  {
    slug: 'how-ai-answers-work',
    title: 'How AI answers work',
    description:
      'An AI assistant answers from what it learned in training, or searches the web first. Here is where each one searches, as the companies say it.',
  },
  {
    slug: 'seo',
    title: 'SEO basics for website owners',
    description:
      'How Google finds, stores and picks pages to show, in Google\'s own words. No secret tricks, and what a small business can do itself.',
  },
  {
    slug: 'geo',
    title: 'GEO: what it is, and what it isn\'t',
    description:
      'GEO is a name for work aimed at being quoted in AI answers. What Google says about it, what the research found, and what we suggest.',
  },
  {
    slug: 'eeat',
    title: 'E-E-A-T: show who\'s behind your site',
    description:
      'E-E-A-T is not a ranking factor, says Google; it is what its reviewers look for. For a small business it mostly means: make it clear who you are.',
  },
  {
    slug: 'ai-crawlers',
    title: 'AI crawlers: who to let in',
    description:
      'Which AI companies read your website, what each crawler is for, in the companies\' own words, and how to allow or block them.',
  },
  {
    slug: 'llms-txt',
    title: 'llms.txt: do you need one?',
    description:
      'Google Search ignores llms.txt, and the studies we found show little effect. What it is, what the studies found, and when it is worth making.',
  },
  {
    slug: 'schema-and-faq',
    title: 'Structured data and FAQs for AI',
    description:
      'Does special markup help AI quote you? What Google says, three studies side by side with who paid for each, and what we suggest instead.',
  },
  {
    slug: 'how-long',
    title: 'How long until Google and AI find you',
    description:
      'How long Google and AI assistants take to find a new website: the ranges companies give, what we found no published measurement for, and our own log.',
  },
  {
    slug: 'why-ai-doesnt-mention-you',
    title: 'Why doesn\'t ChatGPT mention my business?',
    description:
      'You are not alone. The usual reasons a local business is not named by AI assistants, each with its source named and linked.',
  },
  {
    slug: 'check-your-site',
    title: 'Check your site: five tests',
    description:
      'Five tests you can run yourself, with only a browser: how to run each one, what the result tells you, and what it does not tell you.',
  },
  {
    slug: 'ai-seo-checklist',
    title: 'AI SEO checklist: what matters',
    description:
      'A short checklist for being found on Google and named by AI assistants. Each check links to its source and its test, and we list what we left off.',
  },
  {
    slug: 'glossary',
    title: 'Glossary',
    description:
      'The words this guide uses, in everyday language. Each entry links the page it comes from, and says when we found no definition from the company concerned.',
  },
  {
    slug: 'about',
    title: 'About this guide',
    description:
      'Who publishes the Croftweaver Guide, who wrote it, how AI helped, how sources are checked and where we corrected ourselves.',
  },
  {
    slug: 'search-records',
    title: 'What we searched',
    description:
      'The dated record behind every sentence in this guide that says we found no published answer: what we looked for, and what we found.',
  },
];
