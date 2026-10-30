# Authoritative Source Register — CAPSTONE 62

This register contains authoritative references used throughout the CAPSTONE 62 project: **"Technical Blog Writing Series for Developers: How AI Can Help a Student Write Clear, Original, and Accurate Technical Blog Posts."**

Every technical claim, code implementation standard, security guideline, and editorial rule is anchored in official documentation, technical specifications, or established engineering standards. No citations are fabricated.

---

## 1. Primary Documentation & Standards

### SR-01: Google Technical Writing Courses for Engineers
- **Title:** Technical Writing One & Technical Writing Two
- **Publisher / Organization:** Google Developers
- **Direct URL:** [https://developers.google.com/tech-writing](https://developers.google.com/tech-writing)
- **Publication / Last Updated:** Continuously maintained (2024–2026)
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - Technical writing should prefer active voice over passive voice.
  - State the problem, target audience, and prerequisites upfront.
  - Minimize jargon and introduce new terms with immediate definitions.
  - Keep paragraphs focused on a single topic with 3–5 sentences.
  - Place code examples directly adjacent to explanatory text.
- **Verification Status:** Verified against official curriculum.
- **Notes & Limitations:** Focuses on engineering communication; does not specifically address generative AI workflows, necessitating our capstone's hybrid workflow.

---

### SR-02: Python Official Language Reference & Standard Library
- **Title:** The Python Standard Library — Built-in Types, Exceptions, and `unittest.mock`
- **Publisher / Organization:** Python Software Foundation (PSF)
- **Direct URL:** [https://docs.python.org/3/](https://docs.python.org/3/)
- **Publication / Last Updated:** Python 3.14.x documentation (2025–2026)
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - Dict mutation during iteration or shared mutable state leads to subtle runtime bugs.
  - Python dictionary key lookup semantics and type handling (`isinstance`, `None` checking).
  - Standard exception hierarchy (`ValueError`, `KeyError`, `HTTPException`).
  - Safe parsing of ISO datetime strings using `datetime.fromisoformat()`.
- **Verification Status:** Verified in runtime environment (Python 3.14.2).
- **Notes & Limitations:** Language semantics are strictly enforced by the interpreter.

---

### SR-03: Flask Official Documentation
- **Title:** Flask Documentation (Pallets Projects)
- **Publisher / Organization:** Pallets Projects
- **Direct URL:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
- **Publication / Last Updated:** Flask 3.1.x series (2025–2026)
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - `request.get_json(silent=True)` safely parses JSON payloads without raising unhandled 400 crashes if body is malformed or non-JSON.
  - Returning tuples `(data, status_code)` is the idiomatic Flask response pattern.
  - `app.test_client()` provides an isolated in-memory test runner without binding real TCP sockets.
  - Blueprint modularization and application factory patterns are recommended for scaled applications.
- **Verification Status:** Verified with installed `Flask 3.1.3`.
- **Notes & Limitations:** Flask's built-in development server is not recommended for production deployments without a WSGI container (e.g., Gunicorn).

---

### SR-04: pytest Official Documentation
- **Title:** pytest: helps you write better programs
- **Publisher / Organization:** pytest Development Team
- **Direct URL:** [https://docs.pytest.org/](https://docs.pytest.org/)
- **Publication / Last Updated:** pytest 9.1.x (2025–2026)
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - Assertions rely on standard Python `assert` with detailed AST introspection.
  - Fixtures (`@pytest.fixture`) isolate test setup/teardown and prevent test order dependency.
  - `pytest.raises()` safely verifies that anticipated exceptions or HTTP status codes are produced.
  - Test function naming convention requires `test_*` prefix for discovery.
- **Verification Status:** Verified with installed `pytest 9.1.1`.
- **Notes & Limitations:** Requires isolated virtual environment or installed package scope.

---

### SR-05: RFC 9110 — HTTP Semantics
- **Title:** RFC 9110: HTTP Semantics (Obsoletes RFC 7231)
- **Publisher / Organization:** Internet Engineering Task Force (IETF)
- **Direct URL:** [https://www.rfc-editor.org/rfc/rfc9110](https://www.rfc-editor.org/rfc/rfc9110)
- **Publication / Last Updated:** June 2022
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - `200 OK`: Standard response for successful requests.
  - `201 Created`: The request has succeeded and has resulted in the creation of one or more new resources.
  - `400 Bad Request`: The server cannot or will not process the request due to something perceived to be a client error (e.g., malformed request syntax or missing required fields).
  - `404 Not Found`: The origin server did not find a current representation for the target resource.
  - `422 Unprocessable Content`: Syntactically correct request containing semantic validation errors.
- **Verification Status:** Verified against official IETF standard specification.
- **Notes & Limitations:** Standards define semantics; framework conventions sometimes vary slightly between 400 and 422.

---

### SR-06: OWASP API Security Top 10
- **Title:** OWASP API Security Project — Top 10 Vulnerabilities
- **Publisher / Organization:** OWASP Foundation
- **Direct URL:** [https://owasp.org/www-project-api-security/](https://owasp.org/www-project-api-security/)
- **Publication / Last Updated:** 2023 edition (maintained through 2026)
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - API1: Broken Object Level Authorization (BOLA) is the #1 API risk.
  - API3: Broken Object Property Level Authorization (Mass Assignment) occurs when client input is passed unchecked into storage.
  - API8: Lack of Protection from Automated Threats / Rate Limiting.
  - Input validation, type checking, and explicit allowlists are mandatory for even educational endpoints.
- **Verification Status:** Verified against official OWASP security guidance.
- **Notes & Limitations:** Educational REST API examples must explicitly document where production authentication and rate limiting are omitted.

---

### SR-07: ACM Code of Ethics and Professional Conduct
- **Title:** ACM Code of Ethics and Professional Conduct
- **Publisher / Organization:** Association for Computing Machinery (ACM)
- **Direct URL:** [https://www.acm.org/code-of-ethics](https://www.acm.org/code-of-ethics)
- **Publication / Last Updated:** 2018 (Current standard)
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - Section 1.3: Be honest and trustworthy (no fabrication of test results, metrics, or sources).
  - Section 1.4: Be fair and take action not to discriminate (transparent attribution of work).
  - Section 1.5: Respect work required to produce new ideas (proper attribution of third-party concepts, avoiding plagiarized copy-paste).
  - Section 2.5: Give comprehensive and thorough evaluations of computer systems and their impacts, including analysis of possible risks (disclosing AI assistance and hallucination failure modes).
- **Verification Status:** Verified against ACM canonical text.
- **Notes & Limitations:** Provides ethical foundation for transparent AI disclosure.

---

### SR-08: GitHub Documentation — Writing on GitHub & Open Source Profile
- **Title:** Creating a Developer Profile and Writing Effective Documentation
- **Publisher / Organization:** GitHub, Inc.
- **Direct URL:** [https://docs.github.com/en/get-started/writing-on-github](https://docs.github.com/en/get-started/writing-on-github)
- **Publication / Last Updated:** 2025–2026
- **Date Accessed:** October 10, 2026
- **Key Claims Supported:**
  - Developer README files require: Overview, Prerequisites, Installation, Usage, Test execution, and License.
  - Clear markdown formatting with language identifiers enables syntax highlighting and accessibility.
  - Public project repositories serve as key evaluative artifacts for recruiter and technical hiring reviews.
- **Verification Status:** Verified against GitHub official documentation.
- **Notes & Limitations:** Focuses on repository presentation and standard open-source conventions.

---

## 2. Summary Matrix of Supported Claims

| Reference ID | Domain | Primary Standard / Document | Claims Verified in Capstone |
|---|---|---|---|
| **SR-01** | Technical Writing | Google Tech Writing Course | Outline hierarchy, active voice, cognitive load reduction |
| **SR-02** | Python Core | PSF Python Docs | Exception hierarchy, mutable state bugs, datetime parsing |
| **SR-03** | Web Framework | Flask 3.1 Documentation | JSON payload extraction, status code tuples, test client |
| **SR-04** | Testing | pytest 9.1 Documentation | Fixture isolation, assertion introspection, status checks |
| **SR-05** | Networking | IETF RFC 9110 | HTTP 200, 201, 400, 404 status code conventions |
| **SR-06** | Security | OWASP API Security Top 10 | Mass assignment prevention, input schema validation |
| **SR-07** | Professional Ethics | ACM Code of Ethics | AI disclosure, anti-fabrication, citation accountability |
| **SR-08** | Developer Portfolios | GitHub Documentation | README architecture, reproducibility, open-source rigor |
