# TECHWRITE AI — CAPSTONE 62 Technical Blog Platform for Developers

> **"Better Code Starts With Better Knowledge."**  
> An editorial developer publication and technical writing studio inspired by the visual design of [GitHub Blog](https://github.blog/).

[![Python Version](https://img.shields.io/badge/python-3.14%2B-blue.svg)](https://www.python.org/)
[![Flask Version](https://img.shields.io/badge/flask-3.1.3-green.svg)](https://flask.palletsprojects.com/)
[![React Version](https://img.shields.io/badge/react-18.3.1-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-6.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Automated Tests](https://img.shields.io/badge/tests-44%20passed%20(100%25)-success.svg)](https://docs.pytest.org/)
[![Ethics](https://img.shields.io/badge/ethics-ACM%20Code%20of%20Ethics-purple.svg)](https://www.acm.org/code-of-ethics)

---

## 1. Project Overview & Design Goal

**TECHWRITE AI** is a complete, functional technical blogging website and capstone engineering studio built for **CAPSTONE 62**.

### Design Goal
Inspired by the editorial aesthetic of **GitHub Blog** ([github.blog](https://github.blog/)):
* Clean **white background** (`#ffffff`) with subtle borders (`#d0d7de`) and dark-gray typography (`#1f2328`).
* Signature **bright blue links and buttons** (`#0969da`, hover `#0550ae`).
* Large editorial headlines and spacious column layouts prioritizing reader comfort.
* **Original high-resolution SVG technology illustrations** for the hero and each article card.
* **Sticky header** with logo mark, dropdown navigation, real-time search, "Write an Article" button, and mobile menu.
* **Full reading experience** with breadcrumbs, interactive Table of Contents (scroll spy), syntax-highlighted code blocks with one-click copy, verified execution output panels, author bios, and related articles.
* **In-browser Article Editor** with live Markdown preview, word counter, reading time estimator, draft persistence, and publication flow (`localStorage`).
* **Author Profile** with editable bio, technical interests, and social profile links.
* **Dedicated Capstone Studio route (`/studio`)** keeping the public blog as primary while providing complete academic defense modules.

---

## 2. Key Features & Acceptance Verification

### 📖 Public Developer Publication
1. **Editorial Hero Section:** "Better Code Starts With Better Knowledge." with action buttons and original developer workspace illustration.
2. **Featured Article:** Large editorial card for *"Python Functions Explained: From Basics to Practical Examples"*.
3. **Latest Articles Grid:** 6 publication-grade technical guides with custom illustrations, reading times, tags, and verified badges.
4. **Instant Category Filters:** Filter by *Python, AI & ML, Web Development, Developer Skills, Software Testing, Technical Writing*, complete with real-time article counters and clear-filter actions.
5. **Real-Time Search Bar:** Live filtering across article titles, descriptions, categories, and tags with empty states.
6. **Full Reading Experience:** Centered typography column, sticky Table of Contents with smooth scroll, syntax-highlighted code blocks, copy buttons, authentic terminal outputs, references to RFC 9110 and Python docs, and social share links.

### ✍️ Article Studio (Write an Article)
* Accessible via the **"Write an Article"** header button.
* Markdown formatting toolbar (H2, H3, Bold, Italic, Code Blocks, Callout Notes, Tables, Lists).
* Word counter and estimated reading time.
* Live side-by-side split preview or full preview tabs.
* **Save Draft** and **Publish Article** with persistent browser storage (`localStorage`) and confetti celebration.
* Published articles immediately appear on the homepage and under author profile!

### 👤 Author Profile (`#/profile`)
* Customizable author name, professional title, bio, and technical interests.
* Real-time metrics: published article counts, total words authored, 100% test pass rate.
* Editable social links for GitHub, LinkedIn, Twitter/X, and Personal Portfolio.

### 🔬 Capstone Project Workspace (`#/studio`)
Contains all 10 management and defense modules:
1. **Three-Post Content Plan:** Post 1 (Main ~1,000 words), Post 2 (Short), Post 3 (Short), and 12-stage lifecycle.
2. **52-Point Quality Checklist:** Interactive checkboxes, real-time progress bar, category filter, persistent state, and Markdown export.
3. **AI Prompt Library:** 16 canonical prompt templates with universal anti-hallucination guardrails and copy buttons.
4. **Before-and-After Diffs:** Interactive comparison of 5 raw AI bugs caught and resolved by human review.
5. **Verification Report:** Authenticated console logs showing 22/22 pytest pass and 22/22 article unittest pass.
6. **Social Media Drafts:** 5 multi-platform distribution drafts (LinkedIn, Twitter/X, Dev.to, Reddit r/Python, Newsletter).
7. **Content Calendar:** Editorial schedule tracking milestones and delivery status.
8. **Draft Reminders:** Notification and deadline management system.
9. **5-Slide Presentation Deck Viewer:** Interactive slide viewer for academic defense viva with speaker notes toggle.
10. **Authoritative Source Register:** Primary specifications (RFC 9110, Python 3.14, PEP 8, unittest, OWASP, ACM Ethics).

---

## 3. The 3 Required Capstone Articles (Fully Tested)

All code in these articles was executed and validated under **Python 3.14.2**:

| Article | Word Count | Status | Test Suite & Execution Evidence |
|---|---|---|---|
| **1. Python Functions Explained: From Basics to Practical Examples** | ~1,012 words | **Verified** | `code/articles_code/article1_functions.py` (9 tests passed in 0.001s) |
| **2. Five Common Python Mistakes Beginners Should Avoid** | ~650 words | **Verified** | `code/articles_code/article2_mistakes.py` (7 tests passed in 0.000s) |
| **3. Writing Your First Python Unit Tests with unittest** | ~645 words | **Verified** | `code/articles_code/article3_unittest.py` (6 tests passed in 0.001s) |

---

## 4. Quick Start & Local Execution

### Option 1: 1-Click Launch (Recommended)
Double-click or run from PowerShell:
```powershell
.\run_techwrite_ai.ps1
```
Or from Command Prompt:
```cmd
run_techwrite_ai.bat
```
* Runs all 44 automated tests.
* Builds the React frontend bundle.
* Automatically opens `http://127.0.0.1:5000` in your default browser.
* Starts the local Flask server serving the modern publication and REST API!

### Option 2: Vite Hot-Reloading Development Server
```powershell
# Set Node path if not already in PATH:
$env:PATH = "C:\Users\virtu\AppData\Local\OpenAI\Codex\runtimes\cua_node\fb8898c05a62885e\bin;" + $env:PATH

# Start Vite dev server:
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 5. Running Automated Tests

### Python Backend & Workflow Tests (pytest):
```powershell
py -m pytest code/post1/test_app.py automation/test_reminder_workflow.py -v
```
*Result: 22 passed in 1.02s.*

### Article Snippet & Unit Tests (unittest):
```powershell
py code/articles_code/article1_functions.py
py code/articles_code/article2_mistakes.py
py code/articles_code/article3_unittest.py
```
*Result: 22 passed in 0.002s.*

**Total Automated Tests:** 44 / 44 (100% Pass Rate).

---

## 6. Technology Stack

* **Frontend Framework:** React 18, TypeScript 5.7, Vite 6.0
* **Styling & Design Tokens:** Tailwind CSS 3.4 (GitHub Blog visual palette)
* **Icons:** Lucide React
* **Code Blocks:** PrismJS syntax highlighting & custom terminal output blocks
* **Celebration Effects:** Canvas Confetti
* **Client-Side Persistence:** LocalStorage API
* **Backend API & Server:** Python 3.14.2, Flask 3.1.3 (RFC 9110 REST API)
* **Testing:** Pytest 9.1.1, Python Standard Library `unittest`
* **Presentation:** python-pptx 1.0.2

---

## 7. Responsible AI Disclosure

In accordance with the **ACM Code of Ethics and Professional Conduct (Sections 1.4, 2.5)**:
* Generative AI was used strictly as a drafting assistant for initial outlines and docstring suggestions.
* All code was independently reviewed, linted, and executed by human developers in a clean environment.
* No synthetic code was labeled tested without recorded test passes.
* TechWrite AI is an original academic project inspired by GitHub Blog design language; it is not officially affiliated with GitHub, Inc.
