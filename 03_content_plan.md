# CAPSTONE 62 — Technical Content Plan & Series Roadmap

**Series Working Title:**  
**“Build Better Developer Skills: Practical Programming, Testing, and AI-Assisted Technical Writing”**

**Project Identifier:** `03_content_plan.md`  
**Target Audience:** Computer Science Engineering (CSE) students, junior developers, internship candidates  
**Author / Editor:** Senior Content Strategist & Technical Lead  
**Publication Window:** Q4 2026  

---

## 1. Series Vision and Strategy

The modern software engineering landscape requires developers who can write robust software, test edge cases, and articulate technical decisions with clarity. A developer portfolio consisting solely of unannotated code repositories is no longer sufficient; hiring teams look for candidates who understand systems, write reliable documentation, and communicate engineering trade-offs.

This 3-post technical writing series is designed to demonstrate:
1. **Core Backend Engineering:** Building, testing, and documenting a standards-compliant REST API in Python.
2. **Quality & Defensive Coding:** Identifying and correcting foundational automated testing mistakes before they reach production.
3. **Pragmatic AI Literacy:** Utilizing AI as an auxiliary code review assistant while applying rigorous verification to reject hallucinations and flawed suggestions.

---

## 2. Detailed Three-Post Blueprint

### Post 1: Main Pillar Article
- **Working Title:** Build and Test Your First Python REST API: A Beginner-Friendly Guide
- **Target URL Slug:** `/build-test-python-rest-api-beginner-guide`
- **Article Category:** Deep-Dive Technical Tutorial (Pillar Post)
- **Target Word Count:** ~1,000 words (excluding code listings and references)
- **Primary Learning Objective:** Teach CSE students how to build a clean, in-memory REST API with Flask 3.1, return appropriate RFC 9110 HTTP status codes, validate JSON payloads defensively, and verify API behavior using pytest.
- **Technology Stack:** Python 3.14+, Flask 3.1.3, pytest 9.1.1, HTTP/JSON
- **Required Sections (22 Canonical Modules):**
  1. SEO Title & Subheading
  2. Meta Description
  3. Introduction and Problem Statement
  4. Learning Objectives
  5. Prerequisites & Assumptions
  6. Development Environment Setup
  7. Project Directory Structure
  8. REST API Fundamentals & RFC 9110 Status Codes
  9. Installation Instructions (`requirements.txt`)
  10. Complete Working Application Code (`app.py`)
  11. Line-by-Line Code Explanation
  12. How to Run the Application
  13. Example HTTP Requests & Responses (`curl` / JSON)
  14. Automated Testing Implementation (`test_app.py`)
  15. Expected Test Execution Output
  16. Common Beginner Errors and Solutions
  17. Basic API Security Considerations (OWASP Alignment)
  18. Architectural Limitations & Next Steps
  19. Conclusion & Key Takeaways
  20. Further Reading & Official Documentation Links
  21. GitHub Repository Structure
  22. Author Note & Call to Action (CTA)

---

### Post 2: Short Technical Article
- **Working Title:** 5 Python Testing Mistakes Beginners Should Avoid
- **Target URL Slug:** `/5-python-testing-mistakes-beginners-avoid`
- **Article Category:** Engineering Best Practices / Practical Guide
- **Target Word Count:** 500–700 words
- **Primary Learning Objective:** Highlight the five most prevalent testing mistakes made by novice developers in Python/pytest, explain why they cause silent test failures or flaky suites, and provide concrete before-and-after code solutions.
- **Key Concepts Covered:**
  1. *Mistake 1:* Weak or Meaningless Assertions (testing `response.status_code` while ignoring payload data).
  2. *Mistake 2:* Untested Failure and Boundary Paths (testing only HTTP 200/201 and neglecting 400/404 handling).
  3. *Mistake 3:* Shared Mutable State across Test Cases (allowing module-level lists or dicts to pollute subsequent tests).
  4. *Mistake 4:* Vague and Uninformative Test Names (using `test_api()` instead of `test_create_item_with_missing_title_returns_400()`).
  5. *Mistake 5:* Test Order Dependency (assuming test B will always run after test A creates data).
- **Deliverables Included:**
  - Clear "Avoid This" vs. "Do This" code blocks.
  - A 5-point beginner test quality checklist.
  - Links to official Python and pytest documentation.

---

### Post 3: Short Technical Article
- **Working Title:** How to Use AI to Review Code Without Trusting It Blindly
- **Target URL Slug:** `/how-to-use-ai-to-review-code-without-trusting-it-blindly`
- **Article Category:** Developer Workflow / Responsible AI
- **Target Word Count:** 500–700 words
- **Primary Learning Objective:** Equip student developers with a disciplined methodology for using LLMs during code reviews, treating AI suggestions as unverified hypotheses that must be checked against documentation, static analysis, and automated tests.
- **Key Concepts Covered:**
  1. High-value areas for AI review (detecting forgotten edge cases, generating test ideas, explaining confusing syntax).
  2. Reusable, constraints-driven AI code review prompt.
  3. Concrete case study of a flawed AI suggestion (an insecure or hallucinated recommendation).
  4. Three-step verification protocol (Docs Check -> Local Test -> Security Audit).
  5. Data privacy: Protecting credentials, personal data, and proprietary code.
  6. Responsible-use code review checklist.

---

## 3. Production Stage Lifecycle (The 12-Stage Pipeline)

Every post moves sequentially through twelve rigorous production stages:

```
[1. Topic Approval] ──► [2. Research] ──► [3. Source Verification] ──► [4. Outline]
         ▲
         │
[5. First Draft] ◄── [6. Code Implementation] ◄── [7. Testing & Execution]
         │
         ▼
[8. Technical Review] ──► [9. Human Editing] ──► [10. Final Approval]
         ▲
         │
[11. Publication Prep] ──► [12. Social Media Adaptation]
```

1. **Topic Approval:** Validate relevance to CSE curriculum and portfolio value.
2. **Research:** Collect background technical documentation and identify primary standards.
3. **Source Verification:** Confirm all APIs and RFC standards; enter into `source_register.md`.
4. **Outline:** Draft section-by-section breakdown adhering to Google Technical Writing criteria.
5. **Code Implementation:** Write clean, minimal, runnable Python scripts in isolated workspace.
6. **Testing & Execution:** Execute test suite locally; record raw stdout/stderr logs.
7. **First Draft:** Draft prose synthesizing technical explanations around the verified code.
8. **Technical Review:** Inspect for technical accuracy, deprecated parameters, and security edge cases.
9. **Human Editing:** Refactor passive sentences, eliminate AI filler, and optimize readability.
10. **Final Approval:** Verify 100% adherence to `02_technical_writing_checklist.md`.
11. **Publication Preparation:** Format Markdown, configure SEO metadata, and assemble repository assets.
12. **Social Media Adaptation:** Synthesize targeted LinkedIn, X, GitHub, and community posts.

---

## 4. Editorial Production Schedule (Editorial Calendar)

| Post ID | Title | Owner | Draft Due | Review Due | Publish Date | Current Status |
|---|---|---|---|---|---|---|
| **POST-01** | Build and Test Your First Python REST API | Technical Lead | 2026-10-12 | 2026-10-15 | 2026-10-18 | Technical Review |
| **POST-02** | 5 Python Testing Mistakes Beginners Should Avoid | QA Lead | 2026-10-14 | 2026-10-17 | 2026-10-20 | Drafting |
| **POST-03** | How to Use AI to Review Code Without Trusting It Blindly | Ethics / Content Lead | 2026-10-16 | 2026-10-19 | 2026-10-22 | Research |

---

## 5. Risk Assessment and Mitigation

| Potential Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| Framework version mismatch | Low | High | Pin dependencies in `requirements.txt` (`Flask==3.1.3`, `pytest==9.1.1`) and verify in Python 3.14. |
| In-memory state mutation bugs | Medium | Medium | Use pytest fixtures with clean dictionary/list instances per test run. |
| Over-reliance on AI drafting | Medium | High | Require before-and-after diff tracking (`08_before_after_analysis.md`) and human sign-off. |
| Unsafe security advice | Low | High | Cross-reference all endpoints against OWASP API Security Top 10 recommendations. |
