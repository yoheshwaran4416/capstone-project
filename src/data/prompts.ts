import { AIPrompt } from '../types';

export const PROMPT_LIBRARY: AIPrompt[] = [
  {
    id: 'p-01',
    stage: '01. Topic Discovery & Need Analysis',
    phase: 'Research',
    title: 'Developer Pain-Point Discovery',
    description: 'Find real friction points encountered by junior developers and student engineers.',
    prompt: `Act as a Staff Developer Advocate. Identify 5 non-trivial stumbling blocks that computer science students face when learning Python functions and web APIs. For each item, describe: (1) The symptom they observe, (2) The underlying conceptual root cause, and (3) Why generic AI tools often give misleading answers for it.`,
    antiHallucinationClause: `Ground all claims in official Python documentation (Python 3.10+). Do not cite hypothetical syntax or deprecated Python 2 patterns.`
  },
  {
    id: 'p-02',
    stage: '02. Outline Generation',
    phase: 'Outline',
    title: 'Hierarchical Tutorial Outline',
    description: 'Generate an editorial-grade article outline following pedagogical learning progression.',
    prompt: `Create a comprehensive, 8-section tutorial outline for an article titled "Python Functions Explained: From Basics to Practical Examples". Structure it logically: starting from problem motivation, moving through parameters, scope, returns, common traps, automated testing, and concluding with official references. Each section must include 2-3 specific sub-topics and code demonstration concepts.`,
    antiHallucinationClause: `Explicitly disallow pseudo-code. Every outlined code example must be verifiable with Python 3's built-in standard library.`
  },
  {
    id: 'p-03',
    stage: '03. Technical Code Synthesis',
    phase: 'Drafting',
    title: 'Defensive Function Implementation',
    description: 'Write robust, production-style Python functions with type annotations and docstrings.',
    prompt: `Write a modular Python function called calculate_reading_time(word_count: int, words_per_minute: int = 200) -> int. Implement defensive validation: raise ValueError if word_count is negative. Include PEP 257 docstrings and type annotations. Demonstrate invocation using both positional and keyword arguments.`,
    antiHallucinationClause: `Do not use external dependencies. Rely strictly on Python 3 standard library functions and types.`
  },
  {
    id: 'p-04',
    stage: '04. Unit Test Suite Generation',
    phase: 'Testing',
    title: 'unittest Test Suite with Boundary Coverage',
    description: 'Generate complete unit test classes with edge case assertions.',
    prompt: `Generate an isolated Python unittest.TestCase class for a function that converts article titles into URL slugs. Cover: (1) Standard string conversion, (2) Punctuation & symbols, (3) Multiple consecutive hyphens, (4) Length truncation without trailing hyphen, and (5) Empty string error handling.`,
    antiHallucinationClause: `All test assertions must pass when executed via 'py -m unittest'. Do not include flaky random tests.`
  },
  {
    id: 'p-05',
    stage: '05. Factual & Editorial Review',
    phase: 'Review',
    title: 'Anti-Hallucination Fact Verification Audit',
    description: 'Audit article claims against primary specifications (RFC 9110, PEP 8, PSF).',
    prompt: `Audit the following technical blog draft for factual inaccuracies, deprecated functions, and hallucinatory claims. Check every assertion against official Python 3.14 documentation and PEP 8 guidelines. Highlight any mutable default arguments or improper identity comparisons.`,
    antiHallucinationClause: `Verify each flagged item against primary sources. Quote the exact standard or RFC section number.`
  },
  {
    id: 'p-06',
    stage: '06. Social Media Distribution',
    phase: 'Social',
    title: 'Multi-Platform Developer Teasers',
    description: 'Draft tailored promotional posts for LinkedIn, Twitter/X, Dev.to, and Reddit.',
    prompt: `Draft 5 distinct distribution snippets for our article on Python functions: (1) An educational LinkedIn post with key takeaways, (2) A high-engagement Twitter/X thread hook, (3) A Dev.to discussion starter, (4) A Reddit r/Python community post adhering to self-promotion rules, and (5) A developer newsletter blurb.`,
    antiHallucinationClause: `Never use sensationalized clickbait. Emphasize verified code examples and open-source principles.`
  }
];
