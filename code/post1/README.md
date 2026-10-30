# Post 1 Code Sample: Task Tracker REST API

**Part of:** CAPSTONE 62 — Technical Blog Writing Series for Developers  
**Companion Article:** `04_post_1_main_article.md` ("Build and Test Your First Python REST API: A Beginner-Friendly Guide")  
**Target Runtime:** Python 3.14+ | Flask 3.1.3 | pytest 9.1.1  

---

## 1. Overview

This folder contains the complete, tested, reproducible code example featured in Post 1 of the CAPSTONE 62 series. It demonstrates how to build an in-memory REST API with Python and Flask, implementing RFC 9110 HTTP semantics, defensive input validation, and an automated pytest suite.

### Key Features:
- **Application Factory Pattern:** `create_app()` ensures clean test state isolation and prevents test-order interdependencies.
- **Defensive JSON Validation:** Rejects non-JSON media types, missing mandatory fields, and invalid types before processing.
- **RFC 9110 Status Codes:** Returns `200 OK`, `201 Created`, `400 Bad Request`, and `404 Not Found` with structured JSON payloads.
- **Comprehensive Test Suite:** 12+ automated tests covering both happy paths and boundary failure conditions.

---

## 2. Project Files

```
code/post1/
├── app.py              # Main Flask application with factory & endpoints
├── test_app.py         # Automated pytest suite using Flask test client
├── requirements.txt    # Pinned dependency manifest
└── README.md           # Setup, execution, and verification guide
```

---

## 3. Installation & Setup

1. Open PowerShell or your system terminal and navigate to this folder:
   ```powershell
   cd code/post1
   ```

2. Install dependencies:
   ```powershell
   py -m pip install -r requirements.txt
   ```

---

## 4. Running the API

To launch the local development server:
```powershell
py app.py
```
The server will start on `http://127.0.0.1:5000/`.

---

## 5. API Endpoints Reference

| Method | Endpoint | Description | Success Status | Error Status |
|---|---|---|---|---|
| `GET` | `/api/health` | Health-check service status | `200 OK` | N/A |
| `GET` | `/api/tasks` | List all tasks (supports `?completed=true|false`) | `200 OK` | N/A |
| `GET` | `/api/tasks/<id>` | Retrieve a task by integer ID | `200 OK` | `404 Not Found` |
| `POST` | `/api/tasks` | Create a new task (requires JSON `title`) | `201 Created` | `400 Bad Request` |
| `DELETE` | `/api/tasks/<id>` | Delete a task by integer ID | `200 OK` | `404 Not Found` |

---

## 6. Example Requests (`curl`)

### Health Check:
```bash
curl -X GET http://127.0.0.1:5000/api/health
```

### Create a Task:
```bash
curl -X POST http://127.0.0.1:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Review RFC 9110", "description": "Study HTTP semantics", "completed": false}'
```

### Retrieve All Tasks:
```bash
curl -X GET http://127.0.0.1:5000/api/tasks
```

---

## 7. Running the Automated Tests

Execute the test suite with verbose output:
```powershell
py -m pytest test_app.py -v
```

Expected result: All tests pass with zero failures or warnings.
