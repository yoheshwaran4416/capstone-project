"""
Automated Test Suite for Editorial Reminder Workflow
Part of CAPSTONE 62: Technical Blog Writing Series for Developers

Verifies:
  - Safe ISO date parsing and error handling
  - Milestone threshold logic (Overdue vs Due Soon vs Completed)
  - Handling of malformed CSV entries without crashing
  - Zero notifications generated for completed/published articles
"""

import tempfile
from datetime import date
from pathlib import Path
import pytest

from reminder_workflow import (
    evaluate_milestones,
    format_reminders_report,
    parse_iso_date,
    process_calendar,
)


def test_parse_iso_date_valid():
    """Verify standard ISO date strings parse to date objects."""
    d = parse_iso_date("2026-10-15")
    assert d == date(2026, 10, 15)


def test_parse_iso_date_invalid_and_empty():
    """Verify malformed or empty date strings return None instead of raising unhandled exceptions."""
    assert parse_iso_date("") is None
    assert parse_iso_date("invalid-date-format") is None
    assert parse_iso_date(None) is None
    assert parse_iso_date("2026/10/15") is None  # Non-standard separator


def test_published_articles_suppressed():
    """Verify published articles generate zero reminders."""
    row = {
        "Post ID": "POST-05",
        "Article Title": "OWASP Top 10",
        "Current Status": "Published",
        "Planned Draft Date": "2026-10-01",
        "Review Date": "2026-10-04"
    }
    reminders = evaluate_milestones(row, current_date=date(2026, 10, 10))
    assert reminders == []


def test_approved_articles_suppressed():
    """Verify approved articles generate zero reminders."""
    row = {
        "Post ID": "POST-08",
        "Article Title": "CI/CD Guide",
        "Current Status": "Approved",
        "Planned Draft Date": "2026-10-01",
        "Review Date": "2026-10-04"
    }
    reminders = evaluate_milestones(row, current_date=date(2026, 10, 10))
    assert reminders == []


def test_overdue_draft_detected():
    """Verify drafts past their due date trigger CRITICAL (OVERDUE) reminders."""
    row = {
        "Post ID": "POST-01",
        "Article Title": "Flask REST API",
        "Current Status": "Drafting",
        "Planned Draft Date": "2026-10-05",
        "Assigned Owner": "Student Lead",
        "Platform": "Dev.to"
    }
    reminders = evaluate_milestones(row, current_date=date(2026, 10, 10), threshold_days=3)
    assert len(reminders) == 1
    assert "CRITICAL (OVERDUE)" in reminders[0]["priority"]
    assert reminders[0]["days_diff"] == 5


def test_approaching_deadline_detected():
    """Verify milestones within threshold days trigger WARNING (DUE SOON) reminders."""
    row = {
        "Post ID": "POST-02",
        "Article Title": "Testing Mistakes",
        "Current Status": "Drafting",
        "Planned Draft Date": "2026-10-12",
        "Assigned Owner": "QA Reviewer",
        "Platform": "Medium"
    }
    reminders = evaluate_milestones(row, current_date=date(2026, 10, 10), threshold_days=3)
    assert len(reminders) == 1
    assert "WARNING (DUE SOON)" in reminders[0]["priority"]
    assert reminders[0]["days_diff"] == 2


def test_far_future_deadline_not_triggered():
    """Verify milestones far beyond threshold days do not trigger premature reminders."""
    row = {
        "Post ID": "POST-04",
        "Article Title": "pytest Fixtures",
        "Current Status": "Idea",
        "Planned Draft Date": "2026-10-25",
        "Assigned Owner": "Writer",
        "Platform": "Hashnode"
    }
    reminders = evaluate_milestones(row, current_date=date(2026, 10, 10), threshold_days=3)
    assert reminders == []


def test_process_calendar_handles_malformed_csv(tmp_path):
    """Verify process_calendar handles invalid dates gracefully and logs warnings."""
    csv_content = """Post ID,Article Title,Platform,Planned Draft Date,Review Date,Publication Date,Current Status,Assigned Owner,Reminder Status
POST-T1,Safe Post,Dev.to,2026-10-11,2026-10-14,2026-10-18,Drafting,Dev,Pending
POST-T2,Broken Date,Dev.to,NOT-A-DATE,2026-10-15,2026-10-20,Drafting,Dev,Pending
"""
    test_csv = tmp_path / "test_calendar.csv"
    test_csv.write_text(csv_content, encoding="utf-8")

    results = process_calendar(str(test_csv), reference_date=date(2026, 10, 10), threshold_days=3)

    assert results["total_reminders"] >= 1
    assert len(results["skipped_records"]) == 1
    assert results["skipped_records"][0]["post_id"] == "POST-T2"
    assert "Invalid ISO format" in results["skipped_records"][0]["reason"]


def test_format_reminders_report():
    """Verify human-readable report formatting produces proper header and summary."""
    mock_results = {
        "reference_date": "2026-10-10",
        "total_reminders": 1,
        "reminders": [{
            "post_id": "POST-01",
            "title": "Sample Article",
            "owner": "Student",
            "platform": "Medium",
            "milestone": "Draft",
            "target_date": "2026-10-12",
            "priority": "WARNING (DUE SOON)",
            "message": "Draft is due in 2 days."
        }],
        "skipped_records": []
    }
    report = format_reminders_report(mock_results)
    assert "CAPSTONE 62 — CONTENT CALENDAR REMINDER REPORT" in report
    assert "WARNING (DUE SOON)" in report
    assert "POST-01: Sample Article" in report
