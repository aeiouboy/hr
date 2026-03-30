#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

"""
Validates that a code-review task includes a minimal review report
when marked as completed via TaskUpdate.

Hook Type: PostToolUse (matcher: TaskUpdate)

Triggers when a task containing 'review' or 'code review' is marked complete.
Checks:
- Description contains "Status" (case-insensitive)
- Description contains one of: "Issues", "Files Reviewed", "CLEAN", "FIXED" (case-insensitive)
- Description has at least 50 characters

Skips if no description is provided.

Exit codes:
- 0: Not a review task, or report is valid
- 1: Review report is missing required content
"""

import json
import logging
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
LOG_FILE = SCRIPT_DIR / "validate_reviewer_report.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[logging.FileHandler(LOG_FILE, mode="a")],
)
logger = logging.getLogger(__name__)


def find_project_root() -> Path:
    """Walk up from CWD to find the project root (has .claude/ or specs/)."""
    cwd = Path.cwd()
    for parent in [cwd, *cwd.parents]:
        if (parent / ".claude").is_dir() or (parent / "specs").is_dir():
            return parent
    return cwd


def main():
    logger.info("=" * 60)
    logger.info("Validator started: validate_reviewer_report")

    try:
        input_data = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        input_data = {}

    tool_name = input_data.get("tool_name", "")
    tool_input = input_data.get("tool_input", {})

    # Only trigger on TaskUpdate
    if tool_name != "TaskUpdate":
        logger.info(f"Not a TaskUpdate call ({tool_name}), skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    # Only trigger when marking a review-related task as completed
    status = tool_input.get("status", "")
    description = tool_input.get("description", "")
    subject = tool_input.get("subject", "").lower()
    task_text = f"{description.lower()} {subject}"

    if status != "completed":
        logger.info(f"Not a completion (status={status}), skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    if not re.search(r"(?:code\s*)?review", task_text):
        logger.info("Not a review task, skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    logger.info("Review task being marked complete — validating review report")

    # Skip if no description provided
    if not description or not description.strip():
        logger.info("No description provided, skipping validation")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    errors = []

    # Check description contains "Status"
    if not re.search(r"status", description, re.IGNORECASE):
        errors.append('Review report must contain "Status"')

    # Check description contains one of the required keywords
    keywords = ["issues", "files reviewed", "clean", "fixed"]
    if not any(re.search(re.escape(kw), description, re.IGNORECASE) for kw in keywords):
        errors.append(
            'Review report must contain at least one of: "Issues", "Files Reviewed", "CLEAN", "FIXED"'
        )

    # Check minimum length
    if len(description.strip()) < 50:
        errors.append(
            f"Review report is too short ({len(description.strip())} chars). "
            f"Minimum 50 characters required."
        )

    if not errors:
        logger.info("PASS: Review report contains required content")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    error_list = "\n".join(f"  - {e}" for e in errors)
    reason = (
        f"REVIEW REPORT VALIDATION FAILED: {len(errors)} issue(s) found.\n\n"
        f"ISSUES:\n{error_list}\n\n"
        f"REQUIRED CONTENT:\n"
        f'  - Must contain "Status" (e.g., Status: PASSED)\n'
        f'  - Must contain one of: "Issues", "Files Reviewed", "CLEAN", "FIXED"\n'
        f"  - Must be at least 50 characters long\n\n"
        f"ACTION REQUIRED: Update your TaskUpdate description with a proper review report "
        f"before marking this task complete."
    )

    logger.warning(f"FAIL: {len(errors)} issues found")
    print(json.dumps({"result": "block", "reason": reason}))
    sys.exit(1)


if __name__ == "__main__":
    main()
