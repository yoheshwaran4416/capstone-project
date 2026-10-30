# CAPSTONE 62 — Final Demonstration & Evaluation Script

**Project Series:** CAPSTONE 62 — Technical Blog Writing Series for Developers  
**Document Identifier:** `demo/final_demo_script.md`  
**Purpose:** Step-by-step walkthrough script for the college capstone defense, evaluation panel, and technical viva.  
**Estimated Defense Duration:** 10–12 Minutes  
**Demonstration Mode:** Live Terminal & Project Artifacts  

---

## Pre-Demonstration Checklist
Before beginning the evaluation session:
- [x] Open terminal in project root: `c:\Users\virtu\OneDrive\Desktop\capstone62`
- [x] Verify Python interpreter: `py --version` (Returns `Python 3.14.2`)
- [x] Confirm dependencies installed: `py -m pip install -r code/post1/requirements.txt`
- [x] Open project folder in VS Code or code viewer.
- [x] Keep `09_capstone_presentation.pptx` ready to present.

---

## 10-Step Live Demonstration Protocol

### Step 1: Articulate the Central Research Question (1 Minute)
- **Action:** Introduce the project title and research thesis.
- **Presenter Dialogue:**
  > *"Good morning, respected evaluators. Today I present **CAPSTONE 62: Technical Blog Writing Series for Developers**.*
  > *Our research investigates: **'How can AI help a student write clear, original, and accurate technical blog posts?'***
  > *Our thesis is that while AI accelerates brainstorming, outlining, and linguistic editing by up to 50%, software engineering credibility requires a strict human-in-the-loop verification protocol grounded in primary RFC standards and local test automation."*

---

### Step 2: Open and Present the Research Report (1 Minute)
- **Action:** Open [`01_research_report.md`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/01_research_report.md).
- **Key Talking Points:**
  - Highlight Section 7: Side-by-side benchmark comparing **Google Gemini** and **OpenAI ChatGPT** on RFC 9110 status code semantics.
  - Highlight Section 8: Evaluation of 4 free-tier AI tools (ChatGPT, Gemini, Claude, GitHub Free) and their concrete limitations.
  - Show the 4-stage Verification Funnel that rejects secondary blog posts in favor of primary specifications.

---

### Step 3: Present the Technical-Writing Quality Checklist (1 Minute)
- **Action:** Open [`02_technical_writing_checklist.md`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/02_technical_writing_checklist.md).
- **Key Talking Points:**
  - Walk through the 52-point quality scorecard spanning 7 categories: Audience, Structure, Clarity, Technical Accuracy, Sources, Code Quality, and Publication.
  - Explain the 100% Pass rating achieved through rigorous pre-publication auditing.

---

### Step 4: Explain the Three-Post Series Roadmap (1.5 Minutes)
- **Action:** Open [`03_content_plan.md`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/03_content_plan.md).
- **Key Talking Points:**
  - **Post 1 (Main Pillar):** *Build and Test Your First Python REST API* (~1,000 words, 22 canonical sections, complete tested code).
  - **Post 2 (Best Practices):** *5 Python Testing Mistakes Beginners Should Avoid* (650 words, covers weak assertions and shared mutable state).
  - **Post 3 (Responsible AI):** *How to Use AI to Review Code Without Trusting It Blindly* (650 words, 3-step verification protocol).

---

### Step 5: Demonstrate the Main Article Code Implementation (1 Minute)
- **Action:** Open [`code/post1/app.py`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/code/post1/app.py).
- **Key Talking Points:**
  - Explain the **Application Factory pattern** (`create_app`) which encapsulates the in-memory database per instance.
  - Show defensive JSON parsing (`request.get_json(silent=True)`) preventing server crashes.
  - Point out explicit key allowlisting that neutralizes OWASP API3 Mass Assignment vulnerabilities.

---

### Step 6: Execute Live Automated Tests (1.5 Minutes)
- **Action:** Run the pytest command live in the terminal:
  ```powershell
  py -m pytest code/post1/test_app.py -v
  ```
- **Expected Live Terminal Output:**
  ```text
  code/post1/test_app.py::test_health_check_returns_200 PASSED             [  7%]
  code/post1/test_app.py::test_get_tasks_initially_empty PASSED            [ 15%]
  ...
  code/post1/test_app.py::test_unregistered_endpoint_returns_json_404 PASSED [100%]
  ============================= 13 passed in 2.14s ==============================
  ```
- **Presenter Dialogue:**
  > *"As you can see live in the terminal, all 13 test cases pass with zero failures or warnings. We test both happy path resource creations and defensive boundary conditions, including non-JSON media types and empty title inputs."*

---

### Step 7: Present the Before-and-After Analysis Matrix (1.5 Minutes)
- **Action:** Open [`08_before_after_analysis.md`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/08_before_after_analysis.md).
- **Key Talking Points:**
  - Show Comparison #3: How raw AI hallucinated `request.get_json(force_dict=True)` and introduced a Mass Assignment vulnerability (`tasks_db.update(data)`).
  - Explain how human technical review caught these defects, hardened the endpoint, and verified execution.
  - Emphasize that uncritical copy-pasting of AI code damages a developer's reputation, while verified editing demonstrates senior-level craftsmanship.

---

### Step 8: Execute the Editorial Automation Workflow (1 Minute)
- **Action:** Run the reminder automation workflow script live in terminal:
  ```powershell
  py automation/reminder_workflow.py --as-of 2026-10-12
  ```
- **Key Talking Points:**
  - Show the generated human-readable reminder report detecting approaching deadlines for POST-01 and POST-02.
  - Point out the data integrity warning where the script safely caught a malformed ISO date without crashing.
  - Run the automated tests for the workflow:
    ```powershell
    py -m pytest automation/test_reminder_workflow.py -v
    ```
  - Confirm all 9 unit tests pass.

---

### Step 9: Present the Capstone Slides & Speaker Notes (1.5 Minutes)
- **Action:** Open [`09_capstone_presentation.pptx`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/09_capstone_presentation.pptx) or refer to [`09_presentation_speaker_notes.md`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/09_presentation_speaker_notes.md).
- **Key Talking Points:**
  - Walk through the 5 slides: Project Overview, Research & Tools, Three-Post Series, Quality Assurance & Ethics, and Automation & Conclusion.
  - Note that the presentation was programmatically generated using Python (`python-pptx`) ensuring professional developer styling.

---

### Step 10: Summarize Verification, Ethics & Conclusion (1 Minute)
- **Action:** Open [`10_verification_report.md`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/10_verification_report.md) and [`evidence/ai_disclosure.md`](file:///c:/Users/virtu/OneDrive/Desktop/capstone62/evidence/ai_disclosure.md).
- **Presenter Dialogue:**
  > *"In conclusion, CAPSTONE 62 adheres strictly to the ACM Code of Ethics. Every technical claim is grounded in canonical documentation, every code sample has verified test passes, and transparent AI disclosures are provided across all deliverables.*
  > *This workspace provides a repeatable blueprint for computer science students to build authentic, highly credible technical profiles. Thank you, and I am now pleased to answer your questions."*
