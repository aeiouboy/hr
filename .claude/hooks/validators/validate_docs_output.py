#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = []
# ///

"""
Validates that docs/ contains all required documentation files
with correct structure and content quality after the docs-writer step completes.

Hook Type: PostToolUse (matcher: TaskUpdate)

Triggers when a task containing 'doc' (case-insensitive) is marked complete.
Checks:
- docs/README.md exists and contains setup/install instructions
- docs/changelog.md exists, has at least one ## [ entry, and entries include Files Changed
- docs/stories/ directory exists and has at least one .md file
- Stories files follow YYYY-MM-DD-*.md naming pattern and contain required sections
- All local file links in docs/README.md resolve to existing files
- docs/api.md exists if the project has actions/api directories
- docs/env-setup.md exists if the project has .env* files
- docs/architecture.md exists and contains a Mermaid diagram
- docs/troubleshooting.md exists and has at least one ### Issue section

Exit codes:
- 0: Not a docs task, or all required files present
- 1: Missing required documentation files
"""

import json
import logging
import re
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
LOG_FILE = SCRIPT_DIR / "validate_docs_output.log"

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


def validate_changelog(path: Path) -> list[str]:
    """Check changelog.md exists and has at least one ## [ entry."""
    errors = []
    if not path.exists():
        errors.append("docs/changelog.md is missing")
        return errors

    content = path.read_text(encoding="utf-8")
    if not re.search(r"^## \[", content, re.MULTILINE):
        errors.append(
            "docs/changelog.md has no version entries. "
            "Must contain at least one '## [' heading (e.g., ## [1.0.0] - 2026-03-13)"
        )

    return errors


def validate_stories(stories_dir: Path) -> list[str]:
    """Check stories/ directory exists and has correctly named .md files."""
    errors = []
    if not stories_dir.is_dir():
        errors.append(
            "docs/stories/ directory does not exist. "
            "Docs-writer must create it with at least one story file."
        )
        return errors

    md_files = list(stories_dir.glob("*.md"))
    if not md_files:
        errors.append("docs/stories/ has no .md files")
        return errors

    # Check naming pattern: YYYY-MM-DD-*.md
    pattern = re.compile(r"^\d{4}-\d{2}-\d{2}-.+\.md$")
    bad_names = [f.name for f in md_files if not pattern.match(f.name)]
    if bad_names:
        errors.append(
            f"Story files must follow YYYY-MM-DD-<title>.md naming pattern. "
            f"Bad names: {', '.join(bad_names[:5])}"
        )

    return errors


def validate_readme_links(readme_path: Path) -> list[str]:
    """Check all local file links in README.md resolve to existing files."""
    errors = []
    if not readme_path.exists():
        return errors  # README existence is checked separately

    content = readme_path.read_text(encoding="utf-8")
    readme_dir = readme_path.parent

    # Find markdown links: [text](path) — skip http/https links
    link_pattern = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
    for match in link_pattern.finditer(content):
        target = match.group(1)

        # Skip external links and anchors
        if target.startswith(("http://", "https://", "#", "mailto:")):
            continue

        # Strip anchor fragments from local links
        target_path = target.split("#")[0]
        if not target_path:
            continue

        resolved = (readme_dir / target_path).resolve()
        if not resolved.exists():
            errors.append(
                f"docs/README.md links to '{target_path}' but that file does not exist"
            )

    return errors


def validate_story_sections(stories_dir: Path) -> list[str]:
    """Check that each YYYY-MM-DD-*.md story file contains required sections."""
    errors = []
    if not stories_dir.is_dir():
        return errors

    pattern = re.compile(r"^\d{4}-\d{2}-\d{2}-.+\.md$")
    for f in sorted(stories_dir.glob("*.md")):
        if not pattern.match(f.name):
            continue

        content = f.read_text(encoding="utf-8").lower()

        if "## overview" not in content:
            errors.append(f"docs/stories/{f.name} is missing required section: ## Overview")

        if "## files changed" not in content:
            errors.append(f"docs/stories/{f.name} is missing required section: ## Files Changed")

        if "## how to use" not in content and "## how to test" not in content:
            errors.append(
                f"docs/stories/{f.name} is missing required section: ## How to Use or ## How to Test"
            )

    return errors


def validate_changelog_entries(path: Path) -> list[str]:
    """Check that each ## [ entry in changelog.md includes a Files Changed mention."""
    errors = []
    if not path.exists():
        return errors

    content = path.read_text(encoding="utf-8")

    # Split by ## [ headings to find individual entries
    entry_pattern = re.compile(r"^## \[([^\]]*)\]", re.MULTILINE)
    matches = list(entry_pattern.finditer(content))

    for i, match in enumerate(matches):
        entry_start = match.start()
        entry_end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
        entry_text = content[entry_start:entry_end].lower()
        entry_label = match.group(1)

        if "files changed" not in entry_text:
            errors.append(
                f"docs/changelog.md entry ## [{entry_label}] is missing 'Files Changed' section"
            )

    return errors


def validate_readme_content(path: Path) -> list[str]:
    """Check docs/README.md contains actionable setup instructions."""
    errors = []
    if not path.exists():
        return errors

    content = path.read_text(encoding="utf-8").lower()
    keywords = ["install", "setup", "getting started", "prerequisites"]

    if not any(kw in content for kw in keywords):
        errors.append(
            "docs/README.md does not contain setup instructions. "
            "Must mention at least one of: install, setup, getting started, prerequisites"
        )

    return errors


def validate_api_docs(docs_dir: Path, project_root: Path) -> list[str]:
    """Check docs/api.md exists if the project has actions/api directories."""
    errors = []
    api_dirs = [
        project_root / "src" / "lib" / "actions",
        project_root / "src" / "actions",
        project_root / "app" / "api",
    ]

    has_api_dir = any(d.is_dir() for d in api_dirs)
    if not has_api_dir:
        return errors

    api_doc = docs_dir / "api.md"
    if not api_doc.exists():
        errors.append(
            "docs/api.md is missing. "
            "Required because the project has an actions/api directory."
        )
        return errors

    content = api_doc.read_text(encoding="utf-8")
    if len(content) < 100:
        errors.append(
            "docs/api.md exists but has less than 100 characters. "
            "API documentation must be substantive."
        )

    return errors


def validate_env_setup(docs_dir: Path, project_root: Path) -> list[str]:
    """Check docs/env-setup.md exists if the project has .env* files."""
    errors = []
    env_files = [".env", ".env.example", ".env.local", ".env.sample"]

    has_env = any((project_root / ef).exists() for ef in env_files)
    if not has_env:
        return errors

    env_doc = docs_dir / "env-setup.md"
    if not env_doc.exists():
        errors.append(
            "docs/env-setup.md is missing. "
            "Required because the project has .env* files."
        )
        return errors

    content = env_doc.read_text(encoding="utf-8").lower()
    if "variable" not in content:
        errors.append(
            "docs/env-setup.md does not contain 'Variable' or 'variable'. "
            "Should include a table or list of environment variables."
        )

    return errors


def validate_architecture(docs_dir: Path) -> list[str]:
    """Check docs/architecture.md exists and contains a Mermaid diagram."""
    errors = []
    arch_doc = docs_dir / "architecture.md"

    if not arch_doc.exists():
        errors.append("docs/architecture.md is missing")
        return errors

    content = arch_doc.read_text(encoding="utf-8").lower()
    if "mermaid" not in content:
        errors.append(
            "docs/architecture.md does not contain a Mermaid diagram. "
            "Must include at least one ```mermaid code block."
        )

    return errors


def validate_troubleshooting(docs_dir: Path) -> list[str]:
    """Check docs/troubleshooting.md exists and has issue sections."""
    errors = []
    ts_doc = docs_dir / "troubleshooting.md"

    if not ts_doc.exists():
        errors.append("docs/troubleshooting.md is missing")
        return errors

    content = ts_doc.read_text(encoding="utf-8")
    if not re.search(r"^### (Issue|Problem)", content, re.MULTILINE | re.IGNORECASE):
        errors.append(
            "docs/troubleshooting.md has no '### Issue' or '### Problem' headings. "
            "Must contain at least one issue section."
        )

    return errors


def main():
    logger.info("=" * 60)
    logger.info("Validator started: validate_docs_output")

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

    # Only trigger when marking a doc-related task as completed
    status = tool_input.get("status", "")
    description = tool_input.get("description", "").lower()
    subject = tool_input.get("subject", "").lower()
    task_text = f"{description} {subject}"

    if status != "completed" or "doc" not in task_text:
        logger.info(f"Not a docs task completion (status={status}), skipping")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    logger.info("Docs task being marked complete — validating docs output")

    # Find project root and docs dir
    project_root = find_project_root()
    docs_dir = project_root / "docs"

    errors = []

    # Check docs/README.md exists
    readme_path = docs_dir / "README.md"
    if not readme_path.exists():
        errors.append(
            "docs/README.md does not exist. "
            "Docs-writer must create a project README."
        )

    # Check docs/changelog.md
    errors.extend(validate_changelog(docs_dir / "changelog.md"))

    # Check docs/stories/
    errors.extend(validate_stories(docs_dir / "stories"))

    # Check local links in README.md resolve
    errors.extend(validate_readme_links(readme_path))

    # Content quality checks
    errors.extend(validate_story_sections(docs_dir / "stories"))
    errors.extend(validate_changelog_entries(docs_dir / "changelog.md"))
    errors.extend(validate_readme_content(readme_path))
    errors.extend(validate_api_docs(docs_dir, project_root))
    errors.extend(validate_env_setup(docs_dir, project_root))
    errors.extend(validate_architecture(docs_dir))
    errors.extend(validate_troubleshooting(docs_dir))

    if not errors:
        logger.info("PASS: All required documentation files present and valid")
        print(json.dumps({"result": "continue"}))
        sys.exit(0)

    error_list = "\n".join(f"  - {e}" for e in errors)
    reason = (
        f"DOCS OUTPUT VALIDATION FAILED: {len(errors)} issue(s) found.\n\n"
        f"ISSUES:\n{error_list}\n\n"
        f"REQUIRED STRUCTURE:\n"
        f"  docs/\n"
        f"  ├── README.md              # Must link to all docs and mention setup/install\n"
        f"  ├── changelog.md           # Must have ## [ entries with Files Changed\n"
        f"  ├── env-setup.md           # Required if .env* files exist\n"
        f"  ├── architecture.md        # Must contain a Mermaid diagram\n"
        f"  ├── troubleshooting.md     # Must have at least one ### Issue section\n"
        f"  ├── api.md                 # Required if src/lib/actions/ or app/api/ exists\n"
        f"  └── stories/\n"
        f"      └── YYYY-MM-DD-*.md    # Must have ## Overview, ## Files Changed, ## How to Use\n\n"
        f"ACTION REQUIRED: Create the missing files before marking this task complete."
    )

    logger.warning(f"FAIL: {len(errors)} issues found")
    print(json.dumps({"result": "block", "reason": reason}))
    sys.exit(1)


if __name__ == "__main__":
    main()
