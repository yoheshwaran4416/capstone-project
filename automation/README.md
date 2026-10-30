# Editorial Content Calendar & Reminder Workflow

**Part of:** CAPSTONE 62 — Technical Blog Writing Series for Developers  
**Component:** Editorial Automation Workflow  
**Target Runtime:** Python 3.10+ (Tested on Python 3.14.2)  

---

## 1. Overview

The `reminder_workflow.py` script automates editorial deadline tracking for technical blog series. Rather than relying on manual calendar checks or intrusive external notifications, it provides a deterministic, safe, local workflow that:
- Reads the editorial schedule from `content_calendar.csv`.
- Safely parses ISO dates (`YYYY-MM-DD`) and handles corrupted entries without crashing.
- Identifies overdue milestones (`CRITICAL`) and deadlines approaching within a configurable window (`WARNING: DUE SOON`).
- Automatically suppresses notifications for completed (`Published` or `Approved`) articles.
- Supports a `--dry-run` simulation mode and custom reference dates (`--as-of`).
- Never auto-publishes content or transmits external communications without explicit authorization.

---

## 2. Directory Structure

```text
automation/
├── content_calendar.csv         # Structured editorial schedule
├── reminder_workflow.py         # Main automation workflow script
├── test_reminder_workflow.py    # Automated pytest test suite
└── README.md                    # Setup, scheduling, and architecture docs
```

---

## 3. CSV Schema Reference

The `content_calendar.csv` file requires the following header columns:
- **`Post ID`**: Unique identifier (e.g., `POST-01`).
- **`Article Title`**: Working title of the publication.
- **`Platform`**: Target platform (e.g., `Dev.to`, `Medium`, `LinkedIn`).
- **`Planned Draft Date`**: ISO target date for initial draft completion.
- **`Review Date`**: ISO target date for technical review and editing.
- **`Publication Date`**: ISO planned release date.
- **`Current Status`**: `Idea`, `Research`, `Drafting`, `Technical Review`, `Editing`, `Approved`, or `Published`.
- **`Assigned Owner`**: Lead developer or editor responsible.
- **`Reminder Status`**: `Pending`, `Sent`, or `Completed`.

---

## 4. Usage & Command-Line Arguments

### Standard Execution (Using Today's Date):
```powershell
py automation/reminder_workflow.py
```

### Simulated Execution (Testing Specific Date):
```powershell
py automation/reminder_workflow.py --as-of 2026-10-12 --threshold 3
```

### Dry-Run Mode with File Output:
```powershell
py automation/reminder_workflow.py --dry-run --output-file automation/reminders.log
```

### CLI Options:
- `--csv PATH`: Path to CSV file (default: `automation/content_calendar.csv`).
- `--as-of YYYY-MM-DD`: Evaluate milestones as of a specific date.
- `--threshold INT`: Days before deadline to trigger warning (default: `3`).
- `--dry-run`: Run simulation without writing output files.
- `--output-file PATH`: Save formatted text report to a file.

---

## 5. Sample Output

```text
========================================================================
  CAPSTONE 62 — CONTENT CALENDAR REMINDER REPORT
  Reference Date: 2026-10-12 | Active Alerts: 2
========================================================================

[1] WARNING (DUE SOON) — POST-01: Build and Test Your First Python REST API: A Beginner-Friendly Guide
    Milestone: Technical Review (2026-10-15)
    Assigned Owner: Student Lead | Platform: Dev.to / GitHub
    Details: Technical review is due in 3 day(s) on 2026-10-15.

[2] WARNING (DUE SOON) — POST-02: 5 Python Testing Mistakes Beginners Should Avoid
    Milestone: Planned Draft (2026-10-14)
    Assigned Owner: QA Reviewer | Platform: Medium / Dev.to
    Details: Draft is due in 2 day(s) on 2026-10-14.

------------------------------------------------------------------------
  [!] DATA INTEGRITY WARNINGS (Malformed Dates Skipped):
    • POST-06: Field 'Planned Draft Date' has invalid value 'invalid-date' (Invalid ISO format (expected YYYY-MM-DD))

========================================================================
```

---

## 6. Running the Automated Test Suite

Execute the pytest suite covering date parsing, threshold logic, and malformed data handling:

```powershell
py -m pytest automation/test_reminder_workflow.py -v
```

---

## 7. Scheduling with Operating System Schedulers

### On Windows (Windows Task Scheduler):
1. Open PowerShell as Administrator.
2. Create a daily scheduled task at 09:00 AM:
   ```powershell
   $action = New-ScheduledTaskAction -Execute "py.exe" -Argument "C:\Users\virtu\OneDrive\Desktop\capstone62\automation\reminder_workflow.py --output-file C:\Users\virtu\OneDrive\Desktop\capstone62\automation\daily_reminders.txt"
   $trigger = New-ScheduledTaskTrigger -Daily -At 9am
   Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "Capstone62ContentReminder"
   ```

### On Linux / macOS (`cron`):
Add the following line to `crontab -e`:
```bash
0 9 * * * /usr/bin/python3 /path/to/capstone62/automation/reminder_workflow.py >> /path/to/capstone62/automation/reminders.log 2>&1
```

---

## 8. Alternative Cloud Workflow (Notion & Make Integration)

While this script implements a secure, local, zero-cost architecture, enterprise teams often replicate this using **Notion** and **Make**:
1. **Notion Database:** Replaces `content_calendar.csv` with a Kanban board containing status properties and rollup dates.
2. **Make Scenario:** A scheduled webhook triggers daily, queries Notion via the Notion API (`GET /v1/databases/{id}/query`) with a filter for `Status != 'Published'`, evaluates `date_between()`, and posts reminders to a Slack or Discord webhook.
3. *Why Local Python was Chosen:* Avoids exposing third-party API keys, works 100% offline, requires zero paid subscription tiers, and runs deterministically in CI/CD pipelines.
