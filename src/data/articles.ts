import { Article, Author } from '../types';

export const DEFAULT_AUTHOR: Author = {
  id: 'author-capstone-62',
  name: 'Alex Vance',
  title: 'Lead Technical Author & CSE Researcher',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  bio: 'Computer Science student and technical writer exploring automated testing, clean code architecture, and responsible AI-assisted engineering workflows for CAPSTONE 62.',
  interests: ['Python', 'Software Testing', 'Web Architecture', 'Developer Experience', 'AI Prompt Engineering'],
  github: 'https://github.com/developer-capstone',
  twitter: 'https://twitter.com/techwrite_ai',
  linkedin: 'https://linkedin.com/in/alex-vance-dev',
  website: 'https://techwrite.dev'
};

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-01',
    slug: 'python-functions-explained-basics-to-practical-examples',
    title: 'Python Functions Explained: From Basics to Practical Examples',
    subtitle: 'Learn how Python functions work, understand parameters and return values, and build reusable code with practical examples.',
    description: 'Master the anatomy of Python functions. Understand parameters, arguments, return mechanics, the LEGB scope rule, and how to verify functions with automated unit tests.',
    category: 'Python',
    tags: ['Python', 'Functions', 'Beginners', 'Software Engineering', 'Clean Code'],
    author: DEFAULT_AUTHOR,
    publishedAt: 'October 18, 2026',
    readingTimeMinutes: 8,
    featured: true,
    coverIllustrationType: 'python-core',
    testStatus: {
      verified: true,
      suiteName: 'TestPythonFunctions (code/articles_code/article1_functions.py)',
      totalTests: 9,
      passingTests: 9,
      executionTime: '0.001s',
      testCommand: 'py code/articles_code/article1_functions.py'
    },
    tableOfContents: [
      { id: 'introduction', title: '1. What Is a Python Function and Why Do We Need Them?', level: 2 },
      { id: 'syntax-anatomy', title: '2. The Anatomy of a Python Function', level: 2 },
      { id: 'parameters-vs-arguments', title: '3. Parameters vs. Arguments (Positional, Keyword, Defaults)', level: 2 },
      { id: 'args-and-kwargs', title: '4. Variable-Length Arguments: *args and **kwargs', level: 2 },
      { id: 'return-values', title: '5. Return Values: None, Multiple Values, and Early Exits', level: 2 },
      { id: 'variable-scope-legb', title: '6. Variable Scope and the LEGB Rule', level: 2 },
      { id: 'common-mistakes', title: '7. Common Function Pitfalls Beginners Make', level: 2 },
      { id: 'automated-testing', title: '8. Testing Your Functions with Automated Unit Tests', level: 2 },
      { id: 'conclusion-and-references', title: '9. Conclusion & Official References', level: 2 }
    ],
    references: [
      {
        title: 'Python Official Documentation: Defining Functions',
        url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
        source: 'Python Software Foundation',
        description: 'Canonical tutorial explaining def statements, default argument values, and keyword arguments.'
      },
      {
        title: 'PEP 8 – Style Guide for Python Code (Function Naming & Type Hints)',
        url: 'https://peps.python.org/pep-0008/#function-and-variable-names',
        source: 'Python Enhancement Proposals',
        description: 'Official conventions for snake_case function naming, docstrings, and parameter alignment.'
      },
      {
        title: 'Python Documentation: unittest — Unit testing framework',
        url: 'https://docs.python.org/3/library/unittest.html',
        source: 'Python Software Foundation',
        description: 'Standard library reference for writing test cases and assertions in Python.'
      }
    ],
    content: `
Functions are the fundamental building blocks of well-engineered software. As programs grow beyond simple linear scripts, functions allow developers to decompose complex logic into modular, testable, and reusable units. In Python, functions are first-class citizens: they can be assigned to variables, passed as arguments into other functions, and returned from functions.

Whether you are scripting a data pipeline, building an API with Flask or FastAPI, or engineering automated testing suites, mastering functions is essential to becoming a confident software engineer.

---

## 1. What Is a Python Function and Why Do We Need Them?

At its core, a **function** is an isolated block of organized code designed to carry out a specific, single task. Instead of duplicating the same formula or logic across multiple files, you encapsulate that logic inside a named function.

Functions provide three primary engineering benefits:

1. **Maintainability (DRY Principle - Don't Repeat Yourself):** When business logic changes, you update code in a single location rather than across dozens of scattered files.
2. **Abstractions and Readability:** Calling \`calculate_reading_time(word_count)\` immediately communicates intent to human reviewers, hiding mathematical mechanics until needed.
3. **Testability:** Small, pure functions are trivial to verify with automated unit testing suites.

---

## 2. The Anatomy of a Python Function

In Python, a function is declared using the \`def\` keyword, followed by a valid function identifier, parentheses enclosing optional parameters, and a colon. The body is indented.

Here is a canonical example with type hints and a docstring:

\`\`\`python
def greet_developer(name: str) -> str:
    """Return a warm greeting for a developer."""
    return f"Welcome to TechWrite AI, {name}!"
\`\`\`

**Expected Output:**
\`\`\`text
>>> greet_developer("Ada Lovelace")
'Welcome to TechWrite AI, Ada Lovelace!'
\`\`\`

Key components:
* \`def\`: Tells Python that a function definition follows.
* \`greet_developer\`: The identifier. Follows PEP 8 snake_case convention.
* \`name: str\`: Type annotation clarifying expected input.
* \`-> str\`: Return type annotation.
* \`"""..."""\`: Docstring explaining purpose for IDE autocompletion and documentation generators.
* \`return\`: Passes the computed result back to the caller.

---

## 3. Parameters vs. Arguments (Positional, Keyword, Defaults)

Many developers use "parameter" and "argument" interchangeably, but they represent distinct concepts:
* **Parameter:** The variable listed inside the function header during definition (e.g., \`name\`).
* **Argument:** The actual concrete value or expression passed to the function when invoked (e.g., \`"Ada Lovelace"\`).

### Positional vs. Keyword Arguments

\`\`\`python
def calculate_reading_time(word_count: int, words_per_minute: int = 200) -> int:
    """Estimate article reading time in minutes with a default reading speed."""
    if word_count < 0:
        raise ValueError("Word count cannot be negative")
    minutes = round(word_count / words_per_minute)
    return max(1, minutes)
\`\`\`

You can call this function using positional arguments or explicit keyword arguments:

\`\`\`python
# Positional call:
est1 = calculate_reading_time(1000)        # Returns 5 (uses default 200 wpm)

# Keyword argument call:
est2 = calculate_reading_time(1000, words_per_minute=250) # Returns 4
\`\`\`

**Expected Output:**
\`\`\`text
>>> calculate_reading_time(1000)
5
>>> calculate_reading_time(1000, words_per_minute=250)
4
\`\`\`

---

## 4. Variable-Length Arguments: *args and **kwargs

When designing extensible functions or logging helpers, you may not know in advance how many arguments will be supplied. Python provides \`*args\` for variable positional arguments and \`**kwargs\` for variable keyword arguments.

\`\`\`python
def format_log_entry(level: str, message: str, **metadata) -> str:
    """Format structured logging output with dynamic metadata attributes."""
    meta_str = " | ".join(f"{k}={v}" for k, v in metadata.items())
    return f"[{level.upper()}] {message}" + (f" ({meta_str})" if meta_str else "")
\`\`\`

**Execution:**
\`\`\`python
log = format_log_entry("info", "User registered", user="alex", role="author")
print(log)
\`\`\`

**Expected Output:**
\`\`\`text
[INFO] User registered (user=alex | role=author)
\`\`\`

---

## 5. Return Values: None, Multiple Values, and Early Exits

Functions without an explicit \`return\` statement return \`None\` by default in Python. However, functions can also return multiple values packed neatly into a tuple.

\`\`\`python
def analyze_code_metrics(code: str) -> tuple[int, int]:
    """Return (line_count, character_count) for a given code block."""
    if not code:
        return 0, 0 # Guard clause: early exit
    lines = code.splitlines()
    return len(lines), len(code)
\`\`\`

You can unpack the tuple cleanly on assignment:

\`\`\`python
code_sample = "def foo():\\n    return 42"
lines, chars = analyze_code_metrics(code_sample)
print(f"Lines: {lines}, Characters: {chars}")
\`\`\`

**Expected Output:**
\`\`\`text
Lines: 2, Characters: 24
\`\`\`

> **Note on Guard Clauses:** Notice the early return \`if not code: return 0, 0\`. Guard clauses reduce nested \`if-else\` indentation and make functions significantly easier to reason about.

---

## 6. Variable Scope and the LEGB Rule

Scope determines where in your program a variable can be accessed. Python resolves variable references using the **LEGB rule**, searching scopes in this specific order:

1. **L - Local:** Names assigned within the current function body.
2. **E - Enclosing:** Names in the local scope of any enclosing functions (closures).
3. **G - Global:** Names assigned at the top-level of the module file.
4. **B - Built-in:** Predefined names loaded in Python (\`print\`, \`len\`, \`range\`, etc.).

\`\`\`python
GLOBAL_PUBLICATION_NAME = "TechWrite AI"

def generate_watermark(author: str) -> str:
    """Demonstrate local variable referencing global configuration safely."""
    timestamp_format = "YYYY-MM-DD" # Local scope
    return f"{GLOBAL_PUBLICATION_NAME} • By {author} • [{timestamp_format}]"
\`\`\`

**Expected Output:**
\`\`\`text
>>> generate_watermark("Guido")
'TechWrite AI • By Guido • [YYYY-MM-DD]'
\`\`\`

> **Best Practice:** Avoid using the \`global\` keyword to mutate outer variables inside functions. Mutating global state introduces side-effects, making testing and parallel execution unreliable.

---

## 7. Common Function Pitfalls Beginners Make

### Pitfall 1: Mutable Default Arguments
Never use mutable objects (like lists or dictionaries) as default argument values! Python evaluates default arguments once when the function is defined, causing that shared list to persist across all future invocations.

**Incorrect:**
\`\`\`python
def append_tag(tag, tags=[]): # BUG: Shared mutable list!
    tags.append(tag)
    return tags
\`\`\`

**Correct:**
\`\`\`python
def append_tag(tag, tags=None):
    if tags is None:
        tags = []
    tags.append(tag)
    return tags
\`\`\`

### Pitfall 2: Shadowing Built-in Identifiers
Do not name your parameters \`list\`, \`dict\`, \`type\`, or \`str\`. Doing so overrides Python's built-in types in local scope and causes bizarre \`TypeError\` issues later in the function.

---

## 8. Testing Your Functions with Automated Unit Tests

Code should never be considered production-ready until it is verified with automated tests. Python provides the built-in \`unittest\` framework.

Here is the test suite that verifies the functions discussed above. This exact suite was executed locally in our development environment:

\`\`\`python
import unittest

class TestPythonFunctions(unittest.TestCase):
    def test_greet_developer(self):
        self.assertEqual(greet_developer("Ada Lovelace"), "Welcome to TechWrite AI, Ada Lovelace!")

    def test_reading_time_standard(self):
        self.assertEqual(calculate_reading_time(1000), 5)

    def test_reading_time_short(self):
        self.assertEqual(calculate_reading_time(50), 1)

    def test_reading_time_negative(self):
        with self.assertRaises(ValueError):
            calculate_reading_time(-50)

    def test_format_log_entry(self):
        log = format_log_entry("info", "User registered", user="alex", role="author")
        self.assertEqual(log, "[INFO] User registered (user=alex | role=author)")

    def test_analyze_code_metrics(self):
        code = "def foo():\\n    return 42"
        lines, chars = analyze_code_metrics(code)
        self.assertEqual(lines, 2)
        self.assertEqual(chars, 24)

if __name__ == '__main__':
    unittest.main()
\`\`\`

### Actual Test Execution Output
\`\`\`text
$ py code/articles_code/article1_functions.py
.........
----------------------------------------------------------------------
Ran 9 tests in 0.001s

OK
\`\`\`

All 9 test assertions passed in 0.001 seconds without errors.

---

## 9. Conclusion & Official References

Python functions are elegant, flexible, and powerful. By adhering to clean naming conventions, avoiding mutable default arguments, honoring single responsibility, and backing your logic with unit tests, your code will remain resilient and readable for years.

### Official References
* [Python Tutorial: Defining Functions](https://docs.python.org/3/tutorial/controlflow.html#defining-functions) — Python Software Foundation.
* [PEP 8 Style Guide for Python Code](https://peps.python.org/pep-0008/) — Guido van Rossum, Barry Warsaw, Nick Coghlan.
* [Python unittest Documentation](https://docs.python.org/3/library/unittest.html) — Standard Library Documentation.
`
  },
  {
    id: 'art-02',
    slug: 'five-common-python-mistakes-beginners-should-avoid',
    title: 'Five Common Python Mistakes Beginners Should Avoid',
    subtitle: 'From mutable default arguments to bare except blocks: five anti-patterns with before-and-after code fixes.',
    description: 'Learn to identify and fix the five most frequent pitfalls encountered by junior Python developers, backed by PEP 8 conventions and runnable test cases.',
    category: 'Software Testing',
    tags: ['Python', 'Anti-Patterns', 'Code Quality', 'Debugging', 'PEP 8'],
    author: DEFAULT_AUTHOR,
    publishedAt: 'October 17, 2026',
    readingTimeMinutes: 5,
    coverIllustrationType: 'python-mistakes',
    testStatus: {
      verified: true,
      suiteName: 'TestPythonMistakes (code/articles_code/article2_mistakes.py)',
      totalTests: 7,
      passingTests: 7,
      executionTime: '0.039s',
      testCommand: 'py code/articles_code/article2_mistakes.py'
    },
    tableOfContents: [
      { id: 'intro-mistakes', title: 'Why Understanding Python Traps Matters', level: 2 },
      { id: 'mistake-1', title: 'Mistake 1: Using Mutable Default Arguments', level: 2 },
      { id: 'mistake-2', title: 'Mistake 2: Using == Instead of `is` for None', level: 2 },
      { id: 'mistake-3', title: 'Mistake 3: Modifying a List While Iterating Over It', level: 2 },
      { id: 'mistake-4', title: 'Mistake 4: Catching Bare `except:` Without Specific Types', level: 2 },
      { id: 'mistake-5', title: 'Mistake 5: Failing to Use Context Managers for File Handles', level: 2 },
      { id: 'verification-and-summary', title: 'Verification and Summary', level: 2 }
    ],
    references: [
      {
        title: 'PEP 8: Programming Recommendations (Comparisons to None)',
        url: 'https://peps.python.org/pep-0008/#programming-recommendations',
        source: 'Python Enhancement Proposals',
        description: 'Standard recommendation that comparisons to singletons like None should always be done with `is` or `is not`.'
      },
      {
        title: 'Python Documentation: Compound Statements (try / except)',
        url: 'https://docs.python.org/3/reference/compound_stmts.html#the-try-statement',
        source: 'Python Software Foundation',
        description: 'Official guidance on exception handling and why bare except masks KeyboardInterrupt and SystemExit.'
      }
    ],
    content: `
Python is frequently praised for its friendly, human-readable syntax. However, subtle mechanics under the hood—such as identity vs. equality, object mutability, and iterator invalidation—can lead to frustrating bugs.

Here are the top five mistakes beginners make, how they happen, and the idiomatic way to fix them.

---

## Mistake 1: Using Mutable Default Arguments

In Python, default arguments are evaluated only once at function definition time, not every time the function is called. If you use a mutable object (such as a \`list\` or \`dict\`), that single instance persists across calls.

### ❌ Incorrect Code:
\`\`\`python
def add_item(item, target_list=[]):
    target_list.append(item)
    return target_list

first = add_item("apple")  # ['apple']
second = add_item("banana") # ['apple', 'banana'] <-- UNEXPECTED!
\`\`\`

### ✅ Correct Idiomatic Code:
\`\`\`python
def add_item(item, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(item)
    return target_list
\`\`\`

Using \`None\` as the sentinel value ensures a fresh list is allocated every time no argument is provided.

---

## Mistake 2: Using == Instead of \`is\` for None

Beginners often write \`if val == None:\`. In Python, \`==\` checks equality by invoking the \`__eq__()\` method, which can be overridden by custom classes to return unexpected truths.

### ❌ Incorrect Code:
\`\`\`python
if user_input == None:
    pass
\`\`\`

### ✅ Correct Idiomatic Code:
\`\`\`python
if user_input is None:
    pass
\`\`\`

\`is\` checks object identity at the memory address level. Because \`None\` is a singleton in CPython, \`val is None\` is both faster and guaranteed to be immune to custom \`__eq__\` tampering. This is strictly required by PEP 8.

---

## Mistake 3: Modifying a List While Iterating Over It

Modifying a collection's length while walking its iterator causes the internal index counter to skip elements silently.

### ❌ Incorrect Code:
\`\`\`python
numbers = [1, 2, 3, 5]
for n in numbers:
    if n % 2 != 0:
        numbers.remove(n) # Skips 5 because removing 3 shifts index!
print(numbers) # Output: [2, 5] -- BUG!
\`\`\`

### ✅ Correct Idiomatic Code:
\`\`\`python
numbers = [1, 2, 3, 5]
# Use a list comprehension to create a clean new collection:
even_numbers = [n for n in numbers if n % 2 == 0]
print(even_numbers) # Output: [2]
\`\`\`

---

## Mistake 4: Catching Bare \`except:\` Without Specific Types

Writing \`except:\` without an exception class catches **everything**, including \`KeyboardInterrupt\` (Ctrl+C), \`SystemExit\`, and memory errors. It makes debugging nearly impossible because typos in your code will be silenced.

### ❌ Incorrect Code:
\`\`\`python
try:
    val = int(raw_input)
except:
    val = 0 # Silences everything!
\`\`\`

### ✅ Correct Idiomatic Code:
\`\`\`python
try:
    val = int(raw_input.strip())
except (ValueError, AttributeError):
    val = 0 # Catches only expected parsing failures
\`\`\`

---

## Mistake 5: Failing to Use Context Managers for File Handles

Opening files with \`f = open(...)\` without a \`try...finally\` or a context manager risks leaving system file descriptors open if an error occurs prior to \`f.close()\`.

### ❌ Incorrect Code:
\`\`\`python
f = open("log.txt", "r")
content = f.read()
f.close() # Never executes if read() raises an exception!
\`\`\`

### ✅ Correct Idiomatic Code:
\`\`\`python
with open("log.txt", "r", encoding="utf-8") as f:
    content = f.read()
# Automatically closed upon leaving block, even if an exception occurs
\`\`\`

---

## Verification and Summary

All examples in this guide were verified using Python 3.14.2 and automated tests in \`code/articles_code/article2_mistakes.py\`:

\`\`\`text
$ py code/articles_code/article2_mistakes.py
.......
----------------------------------------------------------------------
Ran 7 tests in 0.039s

OK
\`\`\`

Writing idiomatic Python is not just about aesthetics—it prevents insidious runtime defects in production applications.
`
  },
  {
    id: 'art-03',
    slug: 'writing-your-first-python-unit-tests-with-unittest',
    title: 'Writing Your First Python Unit Tests with unittest',
    subtitle: 'A practical, hands-on tutorial explaining test runners, assertion methods, edge case discovery, and test isolation.',
    description: 'Learn how to write automated test suites using Python’s standard library unittest framework. Build and verify a production-grade URL slug generator.',
    category: 'Software Testing',
    tags: ['Python', 'Testing', 'unittest', 'TDD', 'Quality Assurance'],
    author: DEFAULT_AUTHOR,
    publishedAt: 'October 16, 2026',
    readingTimeMinutes: 6,
    coverIllustrationType: 'python-testing',
    testStatus: {
      verified: true,
      suiteName: 'TestArticleSlugCreation (code/articles_code/article3_unittest.py)',
      totalTests: 6,
      passingTests: 6,
      executionTime: '0.002s',
      testCommand: 'py code/articles_code/article3_unittest.py'
    },
    tableOfContents: [
      { id: 'why-test', title: 'Why Automated Testing Is Non-Negotiable', level: 2 },
      { id: 'the-problem', title: 'The Practical Example: A URL Slug Generator', level: 2 },
      { id: 'writing-test-cases', title: 'Writing Test Cases with unittest.TestCase', level: 2 },
      { id: 'assertion-methods', title: 'Essential Assertion Methods', level: 2 },
      { id: 'running-tests', title: 'Running Tests from the Command Line', level: 2 },
      { id: 'edge-cases', title: 'Testing Edge Cases and Exception Handling', level: 2 },
      { id: 'conclusion', title: 'Conclusion and Official Docs', level: 2 }
    ],
    references: [
      {
        title: 'Python Official Documentation: unittest Framework',
        url: 'https://docs.python.org/3/library/unittest.html',
        source: 'Python Software Foundation',
        description: 'Complete API reference for TestCase, TestSuite, TestLoader, and mock objects.'
      },
      {
        title: 'RFC 3986: Uniform Resource Identifier (URI) Generic Syntax',
        url: 'https://www.rfc-editor.org/rfc/rfc3986',
        source: 'Internet Engineering Task Force (IETF)',
        description: 'Specification governing valid URI characters and percent-encoding standards.'
      }
    ],
    content: `
Manual verification—such as printing outputs to the terminal and eyeballing them—is slow, unreliable, and cannot scale. Every change to your code risks breaking existing features unless you have an automated test suite acting as a safety net.

Python includes **\`unittest\`** directly in its standard library. It requires zero external installations and gives you everything needed to test functions, classes, and edge cases.

---

## The Practical Example: A URL Slug Generator

Suppose we are building the blog engine for **TechWrite AI**. When an author publishes an article titled *"Git & GitHub: A Beginner's Practical Guide!"*, the system must convert that title into an SEO-friendly URL slug: \`git-github-a-beginner-s-practical-guide\`.

Here is the implementation:

\`\`\`python
import re

def create_article_slug(title: str, max_length: int = 50) -> str:
    """
    Generate an SEO-friendly URL slug from an article title.
    Rules:
      1. Converts text to lowercase.
      2. Replaces non-alphanumeric characters with hyphens.
      3. Collapses consecutive hyphens into a single hyphen.
      4. Strips leading and trailing hyphens.
      5. Truncates cleanly to max_length without ending on a hyphen.
    """
    if not isinstance(title, str):
        raise TypeError("Title must be a string")
    
    cleaned = title.strip().lower()
    if not cleaned:
        raise ValueError("Title cannot be empty")
        
    slug = re.sub(r'[^a-z0-9]+', '-', cleaned)
    slug = slug.strip('-')
    
    if len(slug) > max_length:
        slug = slug[:max_length].rstrip('-')
        
    return slug
\`\`\`

---

## Writing Test Cases with unittest.TestCase

To test this function, create a class that inherits from \`unittest.TestCase\`. Each test method must begin with the prefix \`test_\` so the test runner discovers it.

\`\`\`python
import unittest

class TestArticleSlugCreation(unittest.TestCase):
    """Test suite demonstrating unittest capabilities and edge cases."""
    
    def test_standard_title(self):
        result = create_article_slug("Python Functions Explained")
        self.assertEqual(result, "python-functions-explained")
        
    def test_special_characters_and_punctuation(self):
        result = create_article_slug("Git & GitHub: A Beginner's Practical Guide!")
        self.assertEqual(result, "git-github-a-beginner-s-practical-guide")
        
    def test_multiple_consecutive_spaces_and_symbols(self):
        result = create_article_slug("Flask  ---  REST   API???")
        self.assertEqual(result, "flask-rest-api")
        
    def test_max_length_truncation(self):
        long_title = "This is an extraordinarily long article title meant to test truncation length limits"
        result = create_article_slug(long_title, max_length=30)
        self.assertLessEqual(len(result), 30)
        self.assertFalse(result.endswith('-'))
        self.assertEqual(result, "this-is-an-extraordinarily-lon")
        
    def test_empty_string_raises_value_error(self):
        with self.assertRaises(ValueError) as context:
            create_article_slug("   ")
        self.assertIn("Title cannot be empty", str(context.exception))
        
    def test_invalid_type_raises_type_error(self):
        with self.assertRaises(TypeError):
            create_article_slug(12345)
\`\`\`

---

## Essential Assertion Methods

The table below summarizes the core assertion methods in \`unittest\`:

| Method | Checks That |
|---|---|
| \`assertEqual(a, b)\` | \`a == b\` |
| \`assertNotEqual(a, b)\` | \`a != b\` |
| \`assertTrue(x)\` | \`bool(x) is True\` |
| \`assertFalse(x)\` | \`bool(x) is False\` |
| \`assertIsNone(x)\` | \`x is None\` |
| \`assertIn(item, container)\` | \`item in container\` |
| \`assertRaises(exc)\` | Function raises specified exception |

---

## Running Tests from the Command Line

You can execute your tests directly with Python's unittest discovery CLI:

\`\`\`bash
# Run verbose tests:
py -m unittest code/articles_code/article3_unittest.py -v
\`\`\`

### Verified Execution Output:
\`\`\`text
test_empty_string_raises_value_error (__main__.TestArticleSlugCreation.test_empty_string_raises_value_error) ... ok
test_invalid_type_raises_type_error (__main__.TestArticleSlugCreation.test_invalid_type_raises_type_error) ... ok
test_max_length_truncation (__main__.TestArticleSlugCreation.test_max_length_truncation) ... ok
test_multiple_consecutive_spaces_and_symbols (__main__.TestArticleSlugCreation.test_multiple_consecutive_spaces_and_symbols) ... ok
test_special_characters_and_punctuation (__main__.TestArticleSlugCreation.test_special_characters_and_punctuation) ... ok
test_standard_title (__main__.TestArticleSlugCreation.test_standard_title) ... ok

----------------------------------------------------------------------
Ran 6 tests in 0.002s

OK
\`\`\`

---

## Edge Cases and Exception Handling

Notice how our test suite verifies not only the "happy path" (normal titles), but also boundary conditions:
1. **Empty strings / whitespace only:** Verifies \`ValueError\` is raised with a descriptive message.
2. **Invalid parameter types (integers instead of strings):** Verifies defensive \`TypeError\`.
3. **Truncation boundary:** Verifies that truncating at 30 characters does not leave a trailing hyphen (e.g. \`"foo-"\`).

By catching these scenarios in automated tests, you guarantee your code will not crash in unexpected production environments.
`
  },
  {
    id: 'art-04',
    slug: 'how-ai-can-help-developers-write-better-documentation',
    title: 'How AI Can Help Developers Write Better Documentation',
    subtitle: 'Leveraging large language models responsibly for docstrings, architectural summaries, and API reference sheets.',
    description: 'Explore the dual-review workflow: using AI for rapid documentation drafting while applying strict human verification to eliminate hallucinations.',
    category: 'Artificial Intelligence' as any,
    tags: ['AI & ML', 'Technical Writing', 'Prompt Engineering', 'Documentation', 'Best Practices'],
    author: DEFAULT_AUTHOR,
    publishedAt: 'October 15, 2026',
    readingTimeMinutes: 5,
    coverIllustrationType: 'ai-docs',
    tableOfContents: [
      { id: 'the-doc-dilemma', title: 'The Developer Documentation Dilemma', level: 2 },
      { id: 'ai-as-first-draft', title: 'AI as a First-Draft Accelerator', level: 2 },
      { id: 'anti-hallucination', title: 'The Anti-Hallucination Review Protocol', level: 2 },
      { id: 'prompt-patterns', title: 'Three Practical Prompts for Engineering Teams', level: 2 },
      { id: 'conclusion', title: 'Responsible AI Principles', level: 2 }
    ],
    references: [
      {
        title: 'ACM Code of Ethics: Professional Conduct & Truth in Computing',
        url: 'https://www.acm.org/code-of-ethics',
        source: 'Association for Computing Machinery',
        description: 'Ethical obligations regarding transparency, truthfulness, and safety in computing systems.'
      }
    ],
    content: `
Writing comprehensive documentation is one of the most impactful yet frequently neglected responsibilities in software development. Large Language Models (LLMs) offer unprecedented assistance in transforming raw functions into clear API references and user guides.

However, unregulated reliance on AI often introduces **fabricated API parameters, deprecated package imports, and security misconfigurations**.

---

## The Anti-Hallucination Review Protocol

At **TechWrite AI**, we follow a four-step verification loop:

1. **Constrained Prompting:** Instruct the model to cite exact line numbers and strictly disallow assuming third-party libraries not present in the codebase.
2. **Human Technical Review:** A software engineer validates every claim against primary specifications.
3. **Automated Code Execution:** Every code snippet provided in documentation must be executed in a live CI environment.
4. **Transparent AI Disclosure:** Articles declare where AI assistance was utilized.

---

## Three Practical Prompts for Engineering Teams

### 1. Generating Google-Style Docstrings
\`\`\`text
Analyze the following Python function. Generate a PEP 257 compliant docstring 
using Google style. Document Args, Returns, and Raises. Do not add speculative parameters.
\`\`\`

### 2. Drafting API Error Reference Tables
\`\`\`text
Examine the Flask error handlers below. Produce a Markdown table matching 
HTTP status codes (RFC 9110 compliant), JSON error keys, and remediation advice for client developers.
\`\`\`

By pairing the generative speed of AI with human domain expertise, technical teams can produce first-class developer documentation without compromising factual integrity.
`
  },
  {
    id: 'art-05',
    slug: 'git-and-github-a-beginners-practical-guide',
    title: "Git and GitHub: A Beginner's Practical Guide",
    subtitle: 'From init to pull request: master version control, branch workflows, and collaborative open-source practices.',
    description: 'Understand the difference between Git and GitHub, master essential terminal commands, and learn the modern feature-branch workflow used by high-velocity software teams.',
    category: 'Developer Skills',
    tags: ['Git', 'GitHub', 'Version Control', 'Open Source', 'Workflow'],
    author: DEFAULT_AUTHOR,
    publishedAt: 'October 14, 2026',
    readingTimeMinutes: 7,
    coverIllustrationType: 'git-guide',
    tableOfContents: [
      { id: 'git-vs-github', title: 'Git vs. GitHub: Demystifying the Difference', level: 2 },
      { id: 'core-workflow', title: 'The Core Lifecycle: Working Tree, Staging, and Commit', level: 2 },
      { id: 'branching-strategy', title: 'Feature Branching Workflow', level: 2 },
      { id: 'pull-requests', title: 'Submitting Clean Pull Requests', level: 2 },
      { id: 'git-cheat-sheet', title: 'Essential Git Commands Reference', level: 2 }
    ],
    references: [
      {
        title: 'Pro Git Book (Official Reference)',
        url: 'https://git-scm.com/book/en/v2',
        source: 'Scott Chacon & Ben Straub',
        description: 'Comprehensive guide covering Git internals, branching, and distributed workflows.'
      }
    ],
    content: `
Version control is the bedrock of modern software engineering. It acts as an immutable time machine for your codebase, enabling teams of hundreds to collaborate without overwriting each other's work.

---

## Git vs. GitHub: Demystifying the Difference

* **Git:** A distributed version control tool running locally on your computer. It tracks historical deltas across files.
* **GitHub:** A cloud-based hosting platform built around Git that provides issue tracking, pull request code reviews, GitHub Actions CI/CD, and developer community collaboration.

---

## The Core Lifecycle: Working Tree, Staging, and Commit

Git organizes file state into three primary areas:
1. **Working Directory:** Where you actively edit code.
2. **Staging Area (Index):** A draft snapshot of changes you intend to commit.
3. **Repository (.git directory):** The permanent cryptographic history of your commits.

\`\`\`bash
# 1. Initialize local repository
git init

# 2. Stage changes
git add .

# 3. Create an atomic commit with a conventional message
git commit -m "feat(api): add task validation endpoint"

# 4. Push to remote origin
git push origin feature/task-validation
\`\`\`

Adopting atomic commits and structured feature branches will immediately elevate your professional engineering profile.
`
  },
  {
    id: 'art-06',
    slug: 'how-to-debug-python-programs-efficiently',
    title: 'How to Debug Python Programs Efficiently',
    subtitle: 'Move beyond print() statements: master breakpoint(), pdb, logging, and systematic root-cause analysis.',
    description: 'Stop guessing why your code crashes. Learn professional debugging workflows using Python 3 built-in breakpoint(), interactive debugger commands, and defensive assertions.',
    category: 'Developer Skills',
    tags: ['Python', 'Debugging', 'pdb', 'Developer Productivity', 'Troubleshooting'],
    author: DEFAULT_AUTHOR,
    publishedAt: 'October 12, 2026',
    readingTimeMinutes: 6,
    coverIllustrationType: 'debugging',
    tableOfContents: [
      { id: 'the-limits-of-print', title: 'The Limits of print() Debugging', level: 2 },
      { id: 'breakpoint-intro', title: 'Meet breakpoint() and pdb', level: 2 },
      { id: 'pdb-commands', title: 'Essential pdb Navigation Commands', level: 2 },
      { id: 'structured-logging', title: 'Logging vs. Debugging in Production', level: 2 },
      { id: 'summary', title: 'Systematic Troubleshooting Checklist', level: 2 }
    ],
    references: [
      {
        title: 'PEP 553 – Built-in breakpoint()',
        url: 'https://peps.python.org/pep-0553/',
        source: 'Python Enhancement Proposals',
        description: 'Standard specification introducing the built-in breakpoint() hook.'
      }
    ],
    content: `
Every developer spends a significant portion of their career debugging. When faced with an error, the instinct of most beginners is to scatter \`print()\` statements across their codebase. While simple, this approach clutter commits, lacks stack-frame inspection, and cannot pause execution.

Python 3.7+ introduced **\`breakpoint()\`**, giving developers immediate access to the interactive Python Debugger (\`pdb\`).

---

## Meet breakpoint() and pdb

Simply insert \`breakpoint()\` at the line where unexpected behavior occurs:

\`\`\`python
def calculate_discount(price: float, discount_percent: float) -> float:
    breakpoint() # Execution pauses here!
    discounted_amount = price * (discount_percent / 100)
    return round(price - discounted_amount, 2)
\`\`\`

When run in your terminal, execution suspends and presents an interactive shell:
\`\`\`text
(Pdb) p price
150.0
(Pdb) p discount_percent
20.0
(Pdb) n
(Pdb) p discounted_amount
30.0
(Pdb) c
\`\`\`

### Essential pdb Commands
* \`p <expression>\`: Print the value of a variable.
* \`n\` (next): Execute current line and advance to next.
* \`s\` (step): Step into the function call at the current line.
* \`c\` (continue): Resume full execution until next breakpoint.
* \`q\` (quit): Abort execution immediately.

Mastering \`breakpoint()\` cuts troubleshooting time by over 50% compared to ad-hoc printing.
`
  }
];
