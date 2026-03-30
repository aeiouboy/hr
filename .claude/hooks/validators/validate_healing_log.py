#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

"""
Validates that docs/test-results/healing-log.md exists and contains
properly structured iteration sections after a heal task completes.

Hook Type: PostToolUse (matcher: TaskUpdate)

Triggers when a task containing 'heal' is marked complete.
Checks:
- docs/test-results/healing-log.md exists
- Has at least one ## Iteration section
- Each iteration section contains: Date, Validation failures, Healed by, Fix applied, Result

Exit codes:
- 0: Not a heal task, or all required content present
- 1: Missing required healing log or content
"""

import json
import logging
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
LOG_FILE = SCRIPT_DIR / "validate_healing_log.log"

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


def validate_iteration_sections(content: str) -> list[str]:
    """Check that each ## Iteration section has the required fields."""
    errors = []

    # Split content by ## Iteration headers
    iteration_pattern = re.compile(r"^## Iteration\b", re.MULTILINE)
    matches = list(iteration_pattern.finditer(content))

    if not matches:
        errors.append(
            "healing-log.md has no '## Iteration' sections. "
            "At least one iteration must be documented."
        )
        return errors

    # Extract each iteration section's text
    for i, match in enumerate(matches):
        start = match.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
        section = content[start:end]

        iteration_label = section.splitlines()[0].strip()
        required_fields = [
            "Date",
            "Validation failures",
            "Healed by",
            "Fix applied",
            "Result",
        ]

        missing = [f for f in required_fields if f.lower() not in section.lower()]
        if missing:
            errors.append(
                f"'{iteration_label}' is missing required fields: {', '.join(missing)}"
            )

    return errors


def main():
    logger.info("=" * 60)
    logger.info("Validator started: validate_healing_log")

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

    # Only trigger when marking a heal-related task as completed
    status = tool_input.get("status", "")
    description = tool_input.get("description", "").lower()
    subject = tool_input.get("subject", "").lower()
    task_text = f"{description} {subject}"

    if status != "completed" or "heal" not in task_text:
        logger.info(f"Not a heal task completion (status={status}), skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    logger.info("Heal task being marked complete — validating healing log")

    # Find project root and healing log path
    project_root = find_project_root()
    healing_log = project_root / "docs" / "test-results" / "healing-log.md"

    errors = []

    # Check healing-log.md exists
    if not healing_log.exists():
        errors.append(
            "docs/test-results/healing-log.md does not exist. "
            "The healer must document all iterations in this file."
        )
    else:
        content = healing_log.read_text(encoding="utf-8")
        if not content.strip():
            errors.append("docs/test-results/healing-log.md is empty")
        else:
            errors.extend(validate_iteration_sections(content))

    if not errors:
        logger.info("PASS: Healing log is present and properly structured")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    error_list = "\n".join(f"  - {e}" for e in errors)
    reason = (
        f"HEALING LOG VALIDATION FAILED: {len(errors)} issue(s) found.\n\n"
        f"ISSUES:\n{error_list}\n\n"
        f"REQUIRED STRUCTURE:\n"
        f"  docs/test-results/healing-log.md must contain:\n"
        f"  ## Iteration <N>\n"
        f"  - **Date**: <date>\n"
        f"  - **Validation failures**: <what failed>\n"
        f"  - **Healed by**: <agent or person>\n"
        f"  - **Fix applied**: <description of fix>\n"
        f"  - **Result**: <pass/fail and details>\n\n"
        f"ACTION REQUIRED: Create or update the healing log before marking this task complete."
    )

    logger.warning(f"FAIL: {len(errors)} issues found")
    print(json.dumps({"result": "block", "reason": reason}))
    sys.exit(1)


if __name__ == "__main__":
    main()
