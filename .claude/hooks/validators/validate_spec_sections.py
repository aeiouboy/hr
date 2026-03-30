#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

"""
Validates that spec files in specs/ contain all required sections
for the e2e validation pipeline.

Hook Type: PostToolUse (matcher: Write, Edit)

Checks that any .md file written to specs/ contains:
- ## Tech Stack
- ## Technical Design
- ## Acceptance Criteria
- ## Validation Commands
- ## Healing Rules

Exit codes:
- 0: Not a spec file, or spec has all required sections
- 1: Spec file is missing required sections
"""

import json
import logging
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
LOG_FILE = SCRIPT_DIR / "validate_spec_sections.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[logging.FileHandler(LOG_FILE, mode="a")],
)
logger = logging.getLogger(__name__)

REQUIRED_SECTIONS = [
    "## Tech Stack",
    "## Technical Design",
    "## Acceptance Criteria",
    "## Validation Commands",
    "## Healing Rules",
]


def main():
    logger.info("=" * 60)
    logger.info("Validator started: validate_spec_sections")

    try:
        input_data = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        input_data = {}

    # Get the file path from the tool input
    tool_input = input_data.get("tool_input", {})
    file_path = tool_input.get("file_path", "")

    logger.info(f"File path: {file_path}")

    # Only check files in specs/ directory with .md extension
    path = Path(file_path)
    if not (path.suffix == ".md" and "specs" in path.parts):
        logger.info("Not a spec file, skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    # Check if file exists
    if not path.exists():
        logger.warning(f"File does not exist: {file_path}")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    # Read file content
    content = path.read_text(encoding="utf-8")

    # Check for required sections
    missing = [s for s in REQUIRED_SECTIONS if s not in content]

    if not missing:
        logger.info("PASS: All required sections found")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    missing_list = "\n".join(f"  - {m}" for m in missing)
    reason = (
        f"SPEC VALIDATION FAILED: '{path.name}' is missing {len(missing)} required section(s).\n\n"
        f"MISSING SECTIONS:\n{missing_list}\n\n"
        f"Every spec file MUST include these sections for the validation pipeline to work:\n"
        f"  - ## Tech Stack — languages, frameworks, runtime, and tools used\n"
        f"  - ## Technical Design — architecture, design decisions, data model\n"
        f"  - ## Acceptance Criteria — what must be true when the plan is complete\n"
        f"  - ## Validation Commands — shell commands to verify each criterion\n"
        f"  - ## Healing Rules — which agent fixes which type of failure\n\n"
        f"ACTION REQUIRED: Add the missing sections to '{path.name}' before proceeding."
    )

    logger.warning(f"FAIL: Missing {len(missing)} sections")
    print(json.dumps({"result": "block", "reason": reason}))
    sys.exit(1)


if __name__ == "__main__":
    main()
