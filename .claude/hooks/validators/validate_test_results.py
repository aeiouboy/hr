#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

"""
Validates that docs/test-results/ contains all required test output files
with correct naming conventions after the test-writer step completes.

Hook Type: PostToolUse (matcher: TaskUpdate)

Triggers when a task containing 'test' is marked complete.
Checks:
- docs/test-results/test-cases.md exists and has correct table format
- docs/test-results/summary.md exists
- docs/test-results/unit/unit-results.json exists (if unit tests were written)
- docs/test-results/unit/unit-results.md exists (if unit tests were written)
- Screenshots follow <name>--<viewport>.png naming (if screenshots dir exists)

Exit codes:
- 0: Not a test task, or all required files present
- 1: Missing required test result files
"""

import json
import logging
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
LOG_FILE = SCRIPT_DIR / "validate_test_results.log"

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


def validate_test_cases_csv(path: Path) -> list[str]:
    """Check test-cases.csv has correct header and data rows."""
    errors = []
    if not path.exists():
        errors.append("docs/test-results/test-cases.csv is missing (primary deliverable for engineer validation)")
        return errors

    content = path.read_text(encoding="utf-8")
    lines = [line.strip() for line in content.splitlines() if line.strip()]

    if not lines:
        errors.append("test-cases.csv is empty")
        return errors

    # Check header row
    expected_headers = ["ID", "Test Name", "Type", "Category", "File", "Status", "Notes"]
    header = lines[0]
    header_cols = [col.strip() for col in header.split(",")]

    missing_headers = [h for h in expected_headers if h not in header_cols]
    if missing_headers:
        errors.append(
            f"test-cases.csv header must have columns: {','.join(expected_headers)}. "
            f"Missing: {', '.join(missing_headers)}"
        )

    # Check there's at least one data row
    if len(lines) < 2:
        errors.append("test-cases.csv has no test case entries (only header)")

    return errors


def validate_test_cases_md(path: Path) -> list[str]:
    """Check test-cases.md has a proper table with required columns."""
    errors = []
    if not path.exists():
        errors.append("docs/test-results/test-cases.md is missing")
        return errors

    content = path.read_text(encoding="utf-8")

    required_columns = ["ID", "Test Name", "Type", "Category", "File", "Status"]
    header_line = None
    for line in content.splitlines():
        if "|" in line and any(col in line for col in required_columns):
            header_line = line
            break

    if not header_line:
        errors.append(
            "test-cases.md must have a table with columns: ID | Test Name | Type | Category | File | Status | Notes"
        )
        return errors

    missing_cols = [col for col in required_columns if col not in header_line]
    if missing_cols:
        errors.append(
            f"test-cases.md table is missing columns: {', '.join(missing_cols)}"
        )

    # Check there's at least one data row (not header, not separator)
    data_rows = [
        line
        for line in content.splitlines()
        if "|" in line
        and line.strip() != header_line.strip()
        and not re.match(r"^\s*\|[\s\-:|]+\|\s*$", line)
    ]
    if not data_rows:
        errors.append("test-cases.md table has no test case entries")

    return errors


def validate_summary_content(path: Path) -> list[str]:
    """Check summary.md contains required keywords: Date, Total/Total Tests, Pass/Fail."""
    errors = []
    if not path.exists():
        return errors  # existence check is handled elsewhere

    content = path.read_text(encoding="utf-8").lower()

    if "date" not in content:
        errors.append("summary.md is missing 'Date' — must include a date reference")

    if "total" not in content:
        errors.append("summary.md is missing 'Total' or 'Total Tests' — must include a total count")

    if "pass" not in content and "fail" not in content:
        errors.append("summary.md must mention at least one of 'Pass' or 'Fail'")

    return errors


def validate_json_content(path: Path, label: str) -> list[str]:
    """Check a JSON file is valid JSON and not empty (has at least 1 key or array element)."""
    errors = []
    if not path.exists():
        return errors  # existence check is handled elsewhere

    content = path.read_text(encoding="utf-8").strip()
    if not content:
        errors.append(f"{label} is empty (0 bytes)")
        return errors

    try:
        data = json.loads(content)
    except json.JSONDecodeError as exc:
        errors.append(f"{label} contains invalid JSON: {exc}")
        return errors

    if isinstance(data, dict) and len(data) == 0:
        errors.append(f"{label} is an empty JSON object (need at least 1 key)")
    elif isinstance(data, list) and len(data) == 0:
        errors.append(f"{label} is an empty JSON array (need at least 1 element)")

    return errors


def warn_csv_summary_mismatch(csv_path: Path, summary_path: Path) -> None:
    """Log a warning (non-blocking) if summary.md total doesn't match CSV data row count."""
    if not csv_path.exists() or not summary_path.exists():
        return

    # Count CSV data rows (exclude header)
    csv_content = csv_path.read_text(encoding="utf-8")
    csv_lines = [line.strip() for line in csv_content.splitlines() if line.strip()]
    csv_data_rows = len(csv_lines) - 1 if len(csv_lines) > 1 else 0

    if csv_data_rows <= 0:
        return

    # Try to extract a total number from summary.md
    summary_content = summary_path.read_text(encoding="utf-8")
    # Match patterns like "Total: 12", "Total Tests: 12", "total tests: 12", "Total | 12"
    total_match = re.search(r"total(?:\s+tests?)?\s*[:|]\s*(\d+)", summary_content, re.IGNORECASE)
    if not total_match:
        return

    summary_total = int(total_match.group(1))
    if summary_total != csv_data_rows:
        logger.warning(
            f"CSV/summary count mismatch (non-blocking): "
            f"test-cases.csv has {csv_data_rows} data rows but "
            f"summary.md reports total of {summary_total}"
        )


def validate_screenshots(screenshots_dir: Path) -> list[str]:
    """Check screenshot naming follows <name>--<viewport>.png convention."""
    errors = []
    if not screenshots_dir.is_dir():
        return errors  # screenshots are optional

    png_files = list(screenshots_dir.glob("*.png"))
    if not png_files:
        return errors

    pattern = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*--[a-z0-9]+(?:-[a-z0-9]+)*\.png$")
    bad_names = [f.name for f in png_files if not pattern.match(f.name)]
    if bad_names:
        errors.append(
            f"Screenshots must use kebab-case with double-dash: <name>--<viewport>.png. "
            f"Bad names: {', '.join(bad_names[:5])}"
        )

    return errors


def main():
    logger.info("=" * 60)
    logger.info("Validator started: validate_test_results")

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

    # Only trigger when marking a test-related task as completed
    status = tool_input.get("status", "")
    description = tool_input.get("description", "").lower()
    subject = tool_input.get("subject", "").lower()
    task_text = f"{description} {subject}"

    if status != "completed" or "test" not in task_text:
        logger.info(f"Not a test task completion (status={status}), skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    logger.info("Test task being marked complete — validating test results")

    # Find project root and test results dir
    project_root = find_project_root()
    test_results_dir = project_root / "docs" / "test-results"

    errors = []

    # Check test-results directory exists
    if not test_results_dir.is_dir():
        errors.append(
            "docs/test-results/ directory does not exist. "
            "Test-writer must create it with test-cases.md, summary.md, and unit/ results."
        )
    else:
        # Check test-cases.csv (primary deliverable)
        errors.extend(validate_test_cases_csv(test_results_dir / "test-cases.csv"))

        # Check test-cases.md
        errors.extend(validate_test_cases_md(test_results_dir / "test-cases.md"))

        # Check summary.md
        if not (test_results_dir / "summary.md").exists():
            errors.append("docs/test-results/summary.md is missing")
        else:
            errors.extend(validate_summary_content(test_results_dir / "summary.md"))

        # Check unit results (if unit/ dir exists or any test files were written)
        unit_dir = test_results_dir / "unit"
        if unit_dir.is_dir():
            if not (unit_dir / "unit-results.json").exists():
                errors.append("docs/test-results/unit/unit-results.json is missing")
            else:
                errors.extend(validate_json_content(unit_dir / "unit-results.json", "unit-results.json"))
            if not (unit_dir / "unit-results.md").exists():
                errors.append("docs/test-results/unit/unit-results.md is missing")

        # Check e2e results (only if e2e/ dir exists)
        e2e_dir = test_results_dir / "e2e"
        if e2e_dir.is_dir():
            if not (e2e_dir / "e2e-results.json").exists():
                errors.append("docs/test-results/e2e/e2e-results.json is missing")
            else:
                errors.extend(validate_json_content(e2e_dir / "e2e-results.json", "e2e-results.json"))
            if not (e2e_dir / "e2e-results.md").exists():
                errors.append("docs/test-results/e2e/e2e-results.md is missing")

        # Warn (non-blocking) if CSV row count mismatches summary total
        warn_csv_summary_mismatch(
            test_results_dir / "test-cases.csv",
            test_results_dir / "summary.md",
        )

        # Check screenshot naming
        errors.extend(validate_screenshots(test_results_dir / "screenshots"))

    if not errors:
        logger.info("PASS: All required test result files present and valid")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    error_list = "\n".join(f"  - {e}" for e in errors)
    reason = (
        f"TEST RESULTS VALIDATION FAILED: {len(errors)} issue(s) found.\n\n"
        f"ISSUES:\n{error_list}\n\n"
        f"REQUIRED STRUCTURE:\n"
        f"  docs/test-results/\n"
        f"  ├── test-cases.csv         # CSV: ID,Test Name,Type,Category,File,Status,Notes\n"
        f"  ├── test-cases.md          # Same data as CSV in markdown table\n"
        f"  ├── summary.md             # Date, pass/fail counts, coverage areas\n"
        f"  ├── unit/\n"
        f"  │   ├── unit-results.json  # Machine-readable test runner output\n"
        f"  │   └── unit-results.md    # Human-readable report\n"
        f"  ├── e2e/                   # (if e2e tests exist)\n"
        f"  │   ├── e2e-results.json\n"
        f"  │   └── e2e-results.md\n"
        f"  └── screenshots/           # (if UI project)\n"
        f"      └── <name>--<viewport>.png\n\n"
        f"ACTION REQUIRED: Create the missing files before marking this task complete."
    )

    logger.warning(f"FAIL: {len(errors)} issues found")
    print(json.dumps({"result": "block", "reason": reason}))
    sys.exit(1)


if __name__ == "__main__":
    main()
