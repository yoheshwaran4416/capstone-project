import { SocialMediaPost } from '../types';

export const SOCIAL_POSTS: SocialMediaPost[] = [
  {
    id: 'soc-01',
    platform: 'LinkedIn',
    targetAudience: 'Software Engineering peers, recruiters, tech mentors',
    hook: 'Stop writing print() statements to debug Python! 🐍',
    content: `When mentoring junior computer science students, the #1 habit I see hold them back is relying exclusively on print() statements for debugging and manual testing.

As part of our CAPSTONE 62 technical publishing series on TechWrite AI, we just published "Python Functions Explained: From Basics to Practical Examples".

Here are 3 core practices every developer should adopt:
1. Use sentinel None instead of mutable default arguments: def func(items=None)
2. Master breakpoint() and pdb for interactive execution pauses
3. Back critical functions with isolated unittest assertions

Read the complete verified guide on TechWrite AI: https://techwrite.dev/articles/python-functions-explained

#Python #SoftwareEngineering #CleanCode #WebDev #OpenSource #TechCommunity`,
    hashtags: ['#Python', '#SoftwareEngineering', '#CleanCode', '#TechCommunity']
  },
  {
    id: 'soc-02',
    platform: 'Twitter / X',
    targetAudience: 'Tech Twitter, Python community, indie developers',
    hook: '1/6 Most Python beginners learn functions in 10 minutes... and spend the next 6 months falling into these 3 subtle traps: 🧵👇',
    content: `1/6 Most Python beginners learn functions in 10 minutes... and spend the next 6 months falling into these 3 subtle traps: 🧵👇

2/6 Trap #1: Mutable default arguments.
def add_item(item, items=[]):
Python evaluates default arguments once at definition time, NOT per call. Your list will leak across invocations!
Fix: Use items=None.

3/6 Trap #2: Checking None with == instead of 'is'.
'if val == None:' can be fooled by overridden __eq__() methods.
Always use 'if val is None:' (PEP 8 strictly enforces this).

4/6 Trap #3: Modifying a list while looping over it.
Removing elements in a for-loop shifts indices, causing elements to be silently skipped.
Fix: Use a list comprehension!

5/6 Every code example in our newest tutorial was tested against Python 3.14 with automated test suites.

6/6 Bookmark the full guide on TechWrite AI:
https://techwrite.dev/articles/python-functions-explained`,
    hashtags: ['#Python', '#CodingTips', '#DevCommunity']
  },
  {
    id: 'soc-03',
    platform: 'Dev.to',
    targetAudience: 'Junior developers, career switchers, self-taught engineers',
    hook: 'Python Functions from Basics to Real-World Production Patterns',
    content: `Hey Dev.to community! 👋

We often see tutorials stop right after explaining def add(a, b): return a + b. But in real production code, functions need defensive validation, docstrings, variable keyword unpacking (*args/**kwargs), and automated unit tests.

In this deep dive for our TechWrite AI Capstone series, we walk through:
- Parameters vs. arguments (and why precision in terminology matters)
- The LEGB variable scope rule
- Guard clauses and early returns
- Running automated unittest suites (with authentic execution outputs)

Check out the interactive tutorial with full runnable examples and let us know your thoughts in the comments!`,
    hashtags: ['#python', '#beginners', '#tutorial', '#programming']
  },
  {
    id: 'soc-04',
    platform: 'Reddit r/Python',
    targetAudience: 'Experienced Pythonistas and learners',
    hook: '[P] TechWrite AI: Comprehensive, tested tutorial series on Python Functions & Testing',
    content: `Hi r/Python,

For our CSE Capstone Project (TechWrite AI), we wanted to tackle the problem of low-quality, AI-generated tutorials flooding developer forums.

Instead of generic summaries, we built a verified, publication-grade series where:
- Every code example is executed against Python 3.14
- Automated test suites (unittest) are provided with authentic execution outputs
- Strict adherence to PEP 8, PEP 257, and RFC 9110
- All AI assistance is fully disclosed with human-in-the-loop review

Our first major guide covers Python Functions from fundamentals to test automation. We'd love your constructive feedback on our explanations and test methodology!`,
    hashtags: ['r/Python', 'Showcase', 'Educational']
  },
  {
    id: 'soc-05',
    platform: 'Newsletter',
    targetAudience: 'TechWrite AI email subscribers & student cohorts',
    hook: 'Issue #1: Better Code Starts With Better Knowledge',
    content: `Welcome to the inaugural issue of the TechWrite AI Dispatch! 🚀

This week in our developer series:
- Featured Article: Python Functions Explained (From Basics to Practical Examples)
- Quick Tip: Why you should replace print() with breakpoint() today
- Behind the Scenes: How we caught 5 insidious hallucinations in AI-drafted code during our Capstone 62 review

"Writing clean code isn't about knowing every library; it's about understanding fundamental abstractions."

Happy coding,
Alex Vance & The TechWrite AI Editorial Team`,
    hashtags: ['#TechWriteAI', '#Newsletter', '#EngineeringExcellence']
  }
];
