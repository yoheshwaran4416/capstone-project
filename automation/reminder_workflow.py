"""
CAPSTONE 62 — Editorial Content Calendar Reminder Workflow
Part of CAPSTONE 62: Technical Blog Writing Series for Developers

Reads content_calendar.csv, parses dates safely, evaluates upcoming/overdue
editorial milestones, and outputs actionable reminders locally without external spam.
"""

import argparse
import csv
import sys
from datetime import date, datetime
from pathlib import Path


def parse_iso_date(date_string):
    """
    Safely parse an ISO date string (YYYY-MM-DD).
    Returns a date object or None if invalid or empty.
    """
    if not date_string or not isinstance(date_string, str):
        return None
    cleaned = date_string.strip()
    try:
        return datetime.strptime(cleaned, "%Y-%m-%d").date()
    except ValueError:
        return None


def evaluate_milestones(row, current_date, threshold_days=3):
    """
    Evaluates a single content calendar row against current_date.
    Returns a list of reminder dicts or empty list if no action needed.
    """
    reminders = []
    status = row.get("Current Status", "").strip()

    # Completed or published tasks do not trigger active deadline reminders
    if status.lower() in ("published", "approved"):
        return reminders

    post_id = row.get("Post ID", "UNKNOWN")
    title = row.get("Article Title", "Untitled")
    owner = row.get("Assigned Owner", "Unassigned")
    platform = row.get("Platform", "General")

    # Evaluate Draft Date if in early stages
    draft_date = parse_iso_date(row.get("Planned Draft Date"))
    if draft_date and status.lower() in ("idea", "research", "drafting"):
        days_to_draft = (draft_date - current_date).days
        if days_to_draft < 0:
            reminders.append({
                "post_id": post_id,
                "title": title,
                "owner": owner,
                "platform": platform,
                "milestone": "Planned Draft",
                "target_date": draft_date.isoformat(),
                "priority": "CRITICAL (OVERDUE)",
                "days_diff": abs(days_to_draft),
                "message": f"Draft was due {abs(days_to_draft)} day(s) ago on {draft_date}."
            })
        elif days_to_draft <= threshold_days:
            reminders.append({
                "post_id": post_id,
                "title": title,
                "owner": owner,
                "platform": platform,
                "milestone": "Planned Draft",
                "target_date": draft_date.isoformat(),
                "priority": "WARNING (DUE SOON)",
                "days_diff": days_to_draft,
                "message": f"Draft is due in {days_to_draft} day(s) on {draft_date}."
            })

    # Evaluate Review Date if in review/editing stages
    review_date = parse_iso_date(row.get("Review Date"))
    if review_date and status.lower() in ("technical review", "editing", "drafting"):
        days_to_review = (review_date - current_date).days
        if days_to_review < 0:
            reminders.append({
                "post_id": post_id,
                "title": title,
                "owner": owner,
                "platform": platform,
                "milestone": "Technical Review",
                "target_date": review_date.isoformat(),
                "priority": "CRITICAL (OVERDUE)",
                "days_diff": abs(days_to_review),
                "message": f"Technical review was due {abs(days_to_review)} day(s) ago on {review_date}."
            })
        elif days_to_review <= threshold_days:
            reminders.append({
                "post_id": post_id,
                "title": title,
                "owner": owner,
                "platform": platform,
                "milestone": "Technical Review",
                "target_date": review_date.isoformat(),
                "priority": "WARNING (DUE SOON)",
                "days_diff": days_to_review,
                "message": f"Technical review is due in {days_to_review} day(s) on {review_date}."
            })

    return reminders


def process_calendar(csv_path, reference_date=None, threshold_days=3):
    """
    Reads the CSV calendar, parses records, and generates all reminders.
    """
    csv_file = Path(csv_path)
    if not csv_file.exists():
        raise FileNotFoundError(f"Content calendar file not found: {csv_path}")

    if reference_date is None:
        reference_date = date.today()

    all_reminders = []
    skipped_records = []

    with open(csv_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row_num, row in enumerate(reader, start=2):
            post_id = row.get("Post ID", f"Row-{row_num}")
            # Check for invalid dates
            draft_raw = row.get("Planned Draft Date", "")
            if draft_raw and parse_iso_date(draft_raw) is None:
                skipped_records.append({
                    "post_id": post_id,
                    "field": "Planned Draft Date",
                    "value": draft_raw,
                    "reason": "Invalid ISO format (expected YYYY-MM-DD)"
                })

            reminders = evaluate_milestones(row, reference_date, threshold_days)
            all_reminders.extend(reminders)

    return {
        "reference_date": reference_date.isoformat(),
        "total_reminders": len(all_reminders),
        "reminders": all_reminders,
        "skipped_records": skipped_records
    }


def format_reminders_report(results):
    """
    Formats the processed results into a clean, human-readable terminal report.
    """
    lines = []
    lines.append("=" * 72)
    lines.append(f"  CAPSTONE 62 — CONTENT CALENDAR REMINDER REPORT")
    lines.append(f"  Reference Date: {results['reference_date']} | Active Alerts: {results['total_reminders']}")
    lines.append("=" * 72)

    if not results["reminders"]:
        lines.append("\n  [✓] All editorial milestones are up to date! No pending reminders.")
    else:
        for idx, r in enumerate(results["reminders"], start=1):
            lines.append(f"\n[{idx}] {r['priority']} — {r['post_id']}: {r['title']}")
            lines.append(f"    Milestone: {r['milestone']} ({r['target_date']})")
            lines.append(f"    Assigned Owner: {r['owner']} | Platform: {r['platform']}")
            lines.append(f"    Details: {r['message']}")

    if results["skipped_records"]:
        lines.append("\n" + "-" * 72)
        lines.append("  [!] DATA INTEGRITY WARNINGS (Malformed Dates Skipped):")
        for s in results["skipped_records"]:
            lines.append(f"    • {s['post_id']}: Field '{s['field']}' has invalid value '{s['value']}' ({s['reason']})")

    lines.append("\n" + "=" * 72)
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Editorial Content Calendar Reminder Workflow")
    parser.add_argument(
        "--csv",
        default="automation/content_calendar.csv",
        help="Path to the content calendar CSV file"
    )
    parser.add_argument(
        "--as-of",
        default=None,
        help="Simulate execution as of a specific date (YYYY-MM-DD)"
    )
    parser.add_argument(
        "--threshold",
        type=int,
        default=3,
        help="Days before milestone to trigger 'Due Soon' alert (default: 3)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run without persisting output files"
    )
    parser.add_argument(
        "--output-file",
        default=None,
        help="Optional path to write the formatted reminder report"
    )

    args = parser.parse_args()

    ref_date = parse_iso_date(args.as_of) if args.as_of else date.today()
    if args.as_of and ref_date is None:
        print(f"Error: Invalid date format for --as-of: '{args.as_of}'. Expected YYYY-MM-DD.", file=sys.stderr)
        sys.exit(1)

    try:
        results = process_calendar(args.csv, reference_date=ref_date, threshold_days=args.threshold)
        report = format_reminders_report(results)
        print(report)

        if args.output_file and not args.dry_run:
            out_path = Path(args.output_file)
            out_path.write_text(report, encoding="utf-8")
            print(f"\nReport written to: {out_path.resolve()}")

    except Exception as e:
        print(f"Error processing workflow: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
