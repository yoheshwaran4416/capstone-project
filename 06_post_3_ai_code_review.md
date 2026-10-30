# How to Use AI to Review Code Without Trusting It Blindly

**Series:** Build Better Developer Skills (Post 3 of 3)  
**Target Audience:** Computer Science students, software engineering interns  
**Difficulty:** Beginner to Intermediate  
**Reading Time:** 4 minutes (approx. 650 words)  

---

## Introduction: An AI Suggestion Is a Hypothesis, Not Proof

Generative AI models like ChatGPT, Claude, and Gemini have revolutionized how students write software. When you paste a function into an LLM and ask for a code review, it responds within seconds with impressive refactorings, cleaner variable names, and helpful explanations.

However, many beginner developers fall into a dangerous habit: they accept AI recommendations blindly without testing them or checking official documentation.

Here is the cardinal rule of AI-assisted software engineering: **An AI code review is a hypothesis to be verified, never proof of correctness.**

---

## What AI Code Review Does Well (And Where It Struggles)

Used thoughtfully, AI acts as an tireless peer reviewer:
- **Spotting Unhandled Edge Cases:** Asking an LLM *"What inputs could cause this function to fail?"* often uncovers unhandled `None` values, division by zero, or encoding quirks.
- **Improving Readability:** AI can identify convoluted nested loops and suggest clearer idioms.
- **Brainstorming Test Cases:** It is excellent at drafting scenarios you forgot to consider.

Where AI fails:
- **Hallucinated Methods & Nonexistent Arguments:** Recommending library flags or functions that sound logical but simply do not exist in the official API.
- **Silent Security Misunderstandings:** Suggesting code that suppresses exceptions or disables SSL validation to "fix" an error.
- **Outdated Syntax:** Generating patterns deprecated several releases ago.

---

## A Battle-Tested Prompt for AI Code Reviews

Do not prompt an AI with a generic *"Review my code."* Constrain its output with specific verification instructions:

```text
Act as a strict senior Python software engineer. Review the following code snippet.
1. Identify potential edge cases, off-by-one errors, or unhandled exceptions.
2. Evaluate adherence to clean code and defensive programming principles.
3. If you suggest a library method or parameter, explicitly cite its official documentation.
4. Flag any security concerns (such as mass assignment or unvalidated user inputs).
5. Do not invent arguments or assume libraries exist without confirmation.

[PASTE YOUR CODE HERE]
```

---

## Case Study: A Flawed AI Suggestion

Consider an educational Flask API endpoint accepting JSON:

```python
# Student's Original Endpoint
@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json(silent=True)
    if not data or "title" not in data:
        return jsonify({"error": "Title required"}), 400
```

When asked to "optimize" this, an AI suggested:
```python
# Flawed AI Suggestion:
@app.route("/api/tasks", methods=["POST"])
def create_task():
    # Flawed: Assumes request.get_json(force_dict=True) exists in Flask!
    data = request.get_json(force_dict=True)
    tasks_db.update(data)  # Severe Security Flaw: Mass Assignment!
    return jsonify({"status": "ok"}), 201
```

Why this suggestion is dangerous:
1. **Hallucination:** `force_dict=True` is not a parameter in Flask's `request.get_json()`—calling it triggers a runtime `TypeError`.
2. **Security Vulnerability:** Passing arbitrary `data` directly into `tasks_db.update(data)` violates **OWASP API3 (Broken Object Property Level Authorization)**, allowing clients to overwrite internal properties like `id` or `is_admin`.

---

## The 3-Step Verification Protocol

Whenever an AI suggests a code change:
1. **Check Official Docs:** Verify every suggested function or flag against official documentation (e.g., [docs.python.org](https://docs.python.org/) or [flask.palletsprojects.com](https://flask.palletsprojects.com/)).
2. **Execute Locally:** Run the code and test suite in your local terminal. If you don't have a test covering that behavior, write one first.
3. **Inspect the Security Model:** Ask: *"Does this suggestion bypass validation, expose credentials, or trust unsanitized user input?"*

---

## Protecting Privacy and Secrets

Never paste the following into any public LLM:
- Real API tokens, secret keys, or database credentials.
- Proprietary university homework solutions protected by honor codes.
- Personal identifying information (PII) of colleagues or test users.

Always replace credentials with dummy values (`os.environ.get("API_KEY")`) before requesting assistance.

---

## The Responsible-Use Checklist

Before accepting any AI code review suggestion:
- [ ] Have I looked up the suggested functions in official documentation?
- [ ] Did I run the code locally with `pytest`?
- [ ] Are edge cases and failure paths validated?
- [ ] Are all secrets and sensitive identifiers scrubbed?
- [ ] Am I prepared to explain why this code works during a technical interview?

---

## Conclusion

AI is an extraordinary multiplier for curious developers, but genuine engineering credibility comes from human comprehension and rigorous verification. Treat AI as an assistant, verify every claim against canonical sources, and keep your tests green.

**Further Reading:**
- [OWASP Top 10 API Security Risks](https://owasp.org/www-project-api-security/)
- [ACM Code of Ethics: Professional Responsibilities](https://www.acm.org/code-of-ethics)

*Ethical AI Disclosure: Drafted with AI research assistance; human-reviewed, fact-checked, and verified against Python 3.14 and Flask 3.1 specifications.*
