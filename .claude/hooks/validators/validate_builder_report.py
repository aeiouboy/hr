#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

"""
Validates that a builder's TaskUpdate completion message contains a minimal
report structure (status, files changed, and sufficient detail).

Hook Type: PostToolUse (matcher: TaskUpdate)

Triggers when any task is marked complete via TaskUpdate with a description.
Checks:
- Description contains "Status" (case-insensitive)
- Description contains "Files" or "files changed" or "files created" (case-insensitive)
- Description is at least 50 characters long

Skip if: No description provided (some TaskUpdate calls only set status).

Exit codes:
- 0: Checks pass or skipped
- 1: Report structure missing required elements
"""

import json
import logging
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
LOG_FILE = SCRIPT_DIR / "validate_builder_report.log"

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
    logger.info("Validator started: validate_builder_report")

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

    # Only trigger when marking a task as completed
    status = tool_input.get("status", "")
    if status != "completed":
        logger.info(f"Not a completion update (status={status}), skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    # Skip if no description provided
    description = tool_input.get("description", "")
    if not description:
        logger.info("No description provided in TaskUpdate, skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    logger.info("Task being marked complete — validating builder report")
    logger.info(f"Description length: {len(description)} chars")

    errors = []

    # Check minimum length
    if len(description) < 50:
        errors.append(
            f"Completion report is too short ({len(description)} chars). "
            f"Must be at least 50 characters with meaningful detail."
        )

    # Check for "Status" mention
    if not re.search(r"status", description, re.IGNORECASE):
        errors.append(
            'Report must include a "Status" section (e.g., "Status: Completed").'
        )

    # Check for files mention
    if not re.search(r"files(\s+changed|\s+created)?", description, re.IGNORECASE):
        errors.append(
            'Report must mention files (e.g., "Files changed:", "Files created:").'
        )

    if not errors:
        logger.info("PASS: Builder report contains required structure")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    error_list = "\n".join(f"  - {e}" for e in errors)
    reason = (
        f"BUILDER REPORT VALIDATION FAILED: {len(errors)} issue(s) found.\n\n"
        f"ISSUES:\n{error_list}\n\n"
        f"REQUIRED REPORT STRUCTURE:\n"
        f"  ## Task Complete\n"
        f"  **Task**: [task name/description]\n"
        f"  **Status**: Completed\n"
        f"  **What was done**:\n"
        f"  - [specific action 1]\n"
        f"  **Files changed**:\n"
        f"  - [file1] - [what changed]\n"
        f"  **Verification**: [any tests/checks run]\n\n"
        f"ACTION REQUIRED: Update your completion message with the required report structure."
    )

    logger.warning(f"FAIL: {len(errors)} issues found")
    print(json.dumps({"result": "block", "reason": reason}))
    sys.exit(1)


if __name__ == "__main__":
    main()
