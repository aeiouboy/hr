#!/usr/bin/env python3
"""
E2E Validation Pipeline with Healing Support

Reads specs from specs/, extracts acceptance criteria and validation commands,
runs them, saves readable reports to logs/, and outputs JSON for agent healing.

Usage:
    python3 validate.py                          # validate all plans (text)
    python3 validate.py hello-500-languages-page  # validate one plan (text)
    python3 validate.py --json hello-500-languages-page  # JSON output for agents
    python3 validate.py --json                   # JSON output for all plans
"""

import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
import fcntl

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent.parent.parent  # .claude/skills/validate -> project root
SPECS_DIR = PROJECT_DIR / "specs"
LOGS_DIR = PROJECT_DIR / "logs"
STATE_DIR = LOGS_DIR / ".validate_state"
LOCK_FILE = LOGS_DIR / ".validate.lock"
MIN_INTERVAL_SECONDS = int(os.getenv("VALIDATE_MIN_INTERVAL_SECONDS", "20"))
LOCK_WAIT_SECONDS = float(os.getenv("VALIDATE_LOCK_WAIT_SECONDS", "2"))
MAX_REPORTS_PER_PLAN = int(os.getenv("VALIDATE_MAX_REPORTS_PER_PLAN", "10"))


def _state_file(plan_name: str) -> Path:
    """Return state file path for a plan."""
    return STATE_DIR / f"{plan_name}.json"


def load_cached_result(plan_name: str) -> tuple[float | None, dict | None]:
    """Load last cached validation result from state file."""
    state_path = _state_file(plan_name)
    if not state_path.exists():
        return None, None

    try:
        payload = json.loads(state_path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return None, None

    updated_at = payload.get("updated_at_epoch")
    result = payload.get("result")
    if not isinstance(updated_at, (int, float)) or not isinstance(result, dict):
        return None, None

    return float(updated_at), result


def save_cached_result(plan_name: str, result: dict) -> None:
    """Persist latest validation result for throttling and busy-lock fallback."""
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    payload = {
        "updated_at_epoch": time.time(),
        "result": result,
    }
    _state_file(plan_name).write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def build_throttled_result(plan_name: str, cached: dict, age_seconds: float) -> dict:
    """Return cached result with throttling metadata."""
    result = json.loads(json.dumps(cached))
    result["throttled"] = True
    result["throttle_age_seconds"] = round(age_seconds, 2)
    result["throttle_min_interval_seconds"] = MIN_INTERVAL_SECONDS
    result["throttle_reason"] = (
        f"Skipped duplicate validate run for '{plan_name}' "
        f"(last run {age_seconds:.1f}s ago, min interval {MIN_INTERVAL_SECONDS}s)."
    )
    if isinstance(result.get("json"), dict):
        result["json"]["throttled"] = True
        result["json"]["throttle_age_seconds"] = result["throttle_age_seconds"]
        result["json"]["throttle_min_interval_seconds"] = MIN_INTERVAL_SECONDS
        result["json"]["throttle_reason"] = result["throttle_reason"]
    return result


def acquire_process_lock(wait_seconds: float) -> object | None:
    """Acquire process-level lock to avoid concurrent validation storms."""
    LOGS_DIR.mkdir(exist_ok=True)
    lock_handle = LOCK_FILE.open("a+", encoding="utf-8")
    deadline = time.time() + wait_seconds

    while True:
        try:
            fcntl.flock(lock_handle.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
            lock_handle.seek(0)
            lock_handle.truncate(0)
            lock_handle.write(f"pid={os.getpid()} acquired={datetime.now().isoformat()}\n")
            lock_handle.flush()
            return lock_handle
        except BlockingIOError:
            if time.time() >= deadline:
                lock_handle.close()
                return None
            time.sleep(0.1)


def release_process_lock(lock_handle: object | None) -> None:
    """Release process-level lock safely."""
    if lock_handle is None:
        return
    try:
        fcntl.flock(lock_handle.fileno(), fcntl.LOCK_UN)
    except OSError:
        pass
    try:
        lock_handle.close()
    except OSError:
        pass


def prune_old_plan_reports(plan_name: str, keep_latest: int = MAX_REPORTS_PER_PLAN) -> None:
    """Prune old text/json reports for a plan to keep logs directory manageable."""
    if keep_latest <= 0:
        return

    for extension in (".txt", ".json"):
        files = sorted(
            LOGS_DIR.glob(f"{plan_name}_*{extension}"),
            key=lambda p: p.stat().st_mtime,
            reverse=True,
        )
        for old_file in files[keep_latest:]:
            try:
                old_file.unlink()
            except OSError:
                # Best effort cleanup; validation should never fail because pruning failed.
                pass


def extract_section(content: str, heading: str) -> list[str]:
    """Extract bullet items from a markdown section."""
    pattern = rf"## {re.escape(heading)}\s*\n(.*?)(?=\n## |\Z)"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return []
    section = match.group(1)
    items = re.findall(r"^- (.+)$", section, re.MULTILINE)
    return items


def extract_validation_commands(content: str) -> list[dict]:
    """Extract commands and optional descriptions from Validation Commands section.

    Supported bullet formats:
    - `command` — Description
    - `command`
    - command — Description
    - command
    """
    pattern = r"## Validation Commands\s*\n(.*?)(?=\n## |\Z)"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return []

    section = match.group(1)
    commands = []
    for raw_line in section.strip().split("\n"):
        line = raw_line.strip()
        if not line.startswith("- "):
            continue

        item = line[2:].strip()
        if not item:
            continue

        cmd = None
        description = None

        # Backtick format: `command` [— description]
        m_backtick = re.match(r"^`(.+?)`(?:\s*(?:—|–|-)\s*(.+))?$", item)
        if m_backtick:
            cmd = m_backtick.group(1).strip()
            description = (m_backtick.group(2) or "").strip() or None
        else:
            # Plain format: command [— description]
            # Only split on em/en dash separators to avoid breaking command flags.
            split_marker = None
            for marker in (" — ", " – "):
                if marker in item:
                    split_marker = marker
                    break
            if split_marker:
                cmd_part, desc_part = item.split(split_marker, 1)
                cmd = cmd_part.strip().strip("`")
                description = desc_part.strip() or None
            else:
                cmd = item.strip().strip("`")
                description = None

        if cmd:
            commands.append({
                "cmd": cmd,
                "description": description or f"Run validation command: {cmd}",
            })
    return commands


def extract_healing_rules(content: str) -> list[dict]:
    """Extract healing rules from spec's Healing Rules section."""
    pattern = r"## Healing Rules\s*\n(.*?)(?=\n## |\Z)"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return []

    section = match.group(1)
    rules = []
    for line in section.strip().split("\n"):
        # Match: - `keyword` → agent-type — instruction
        m = re.match(r"^- `(.+?)`\s*[→>]+\s*(\S+)\s*[—-]+\s*(.+)$", line.strip())
        if m:
            rules.append({
                "match": m.group(1).strip(),
                "agent": m.group(2).strip(),
                "instruction": m.group(3).strip(),
            })
    return rules


def match_healing_rule(failure: dict, rules: list[dict]) -> dict | None:
    """Find the best healing rule for a failure."""
    desc = failure.get("description", "").lower()
    output = failure.get("output", "").lower()
    cmd = failure.get("cmd", "").lower()

    for rule in rules:
        keyword = rule["match"].lower()
        if keyword in desc or keyword in cmd or keyword in output:
            return rule
    return None


def run_command(cmd: str) -> dict:
    """Run a shell command and return result."""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            timeout=60,
            cwd=str(PROJECT_DIR),
        )
        output = (result.stdout + result.stderr).strip()
        return {"success": result.returncode == 0, "output": output}
    except subprocess.TimeoutExpired:
        return {"success": False, "output": "Command timed out after 60s"}
    except Exception as e:
        return {"success": False, "output": str(e)}


def validate_plan(plan_name: str) -> dict:
    """Validate a single plan by reading its spec and running commands."""
    spec_file = SPECS_DIR / f"{plan_name}.md"
    if not spec_file.exists():
        return {"error": f"Spec not found: {spec_file}"}

    # Throttle duplicate runs for the same plan to prevent log storms.
    cached_at, cached_result = load_cached_result(plan_name)
    if cached_at is not None and cached_result is not None:
        age_seconds = time.time() - cached_at
        if age_seconds < MIN_INTERVAL_SECONDS:
            return build_throttled_result(plan_name, cached_result, age_seconds)

    content = spec_file.read_text()

    # Extract sections
    criteria = extract_section(content, "Acceptance Criteria")
    commands = extract_validation_commands(content)
    healing_rules = extract_healing_rules(content)

    if not criteria:
        return {"error": f"No Acceptance Criteria found in {spec_file}"}
    if not commands:
        return {"error": f"No Validation Commands found in {spec_file}"}

    # Run validation commands (skip browser-opening commands)
    skip_patterns = ["open ", "xdg-open"]
    cmd_results = []
    for cmd_info in commands:
        raw_cmd = cmd_info["cmd"].strip()
        normalized = raw_cmd.lower()

        if any(normalized.startswith(p) for p in skip_patterns):
            cmd_results.append({
                "description": cmd_info["description"],
                "cmd": raw_cmd,
                "skipped": True,
                "skip_reason": "manual_browser_check",
            })
            continue

        # Guard against recursive self-invocation from Validation Commands.
        if ".claude/skills/validate/validate.py" in normalized or re.search(r"(^|[ /])validate\.py(\s|$)", normalized):
            cmd_results.append({
                "description": cmd_info["description"],
                "cmd": raw_cmd,
                "skipped": True,
                "skip_reason": "recursive_validate_guard",
            })
            continue

        result = run_command(raw_cmd)
        cmd_results.append({
            "description": cmd_info["description"],
            "cmd": raw_cmd,
            "success": result["success"],
            "output": result["output"],
            "skipped": False,
        })

    # Compute stats
    passed = sum(1 for r in cmd_results if not r.get("skipped") and r.get("success"))
    failed = sum(1 for r in cmd_results if not r.get("skipped") and not r.get("success"))
    skipped = sum(1 for r in cmd_results if r.get("skipped"))
    total = passed + failed

    # Build failures with healing recommendations
    failures = []
    for r in cmd_results:
        if r.get("skipped") or r.get("success"):
            continue
        failure = {
            "description": r["description"],
            "cmd": r["cmd"],
            "output": r["output"][:1000],  # cap for JSON
        }
        rule = match_healing_rule(r, healing_rules)
        if rule:
            failure["heal"] = {
                "agent": rule["agent"],
                "instruction": rule["instruction"],
            }
        failures.append(failure)

    # Timestamps
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    timestamp_file = datetime.now().strftime("%Y-%m-%d_%H%M%S")

    # Build text report
    lines = []
    lines.append("=" * 50)
    lines.append("  VALIDATION REPORT")
    lines.append(f"  Plan: {plan_name}")
    lines.append(f"  Date: {timestamp}")
    lines.append("=" * 50)
    lines.append("")

    lines.append("  ACCEPTANCE CRITERIA:")
    lines.append("  " + "-" * 46)
    for c in criteria:
        lines.append(f"  - {c}")
    lines.append("  " + "-" * 46)
    lines.append("")

    if failed == 0:
        lines.append(f"  SUMMARY: All {total} checks passed")
    else:
        lines.append(f"  SUMMARY: {passed}/{total} passed, {failed} failed")
    if skipped:
        lines.append(f"  SKIPPED: {skipped} (manual checks)")
    lines.append("")

    lines.append("  VALIDATION RESULTS:")
    lines.append("  " + "-" * 46)
    for r in cmd_results:
        if r.get("skipped"):
            reason = r.get("skip_reason")
            suffix = ""
            if reason == "recursive_validate_guard":
                suffix = " (recursive validate guard)"
            elif reason == "manual_browser_check":
                suffix = " (manual check)"
            lines.append(f"  [SKIP]  {r['description']}{suffix}")
            continue
        status = "PASS" if r["success"] else "FAIL"
        lines.append(f"  [{status}]  {r['description']}")
    lines.append("  " + "-" * 46)

    if failures:
        lines.append("")
        lines.append("  FAILED DETAILS:")
        for f in failures:
            lines.append(f"  - {f['description']}")
            lines.append(f"    Command: {f['cmd']}")
            output = f["output"]
            if len(output) > 500:
                output = output[:500] + "\n    ... (truncated)"
            for ol in output.split("\n"):
                lines.append(f"    {ol}")
            if "heal" in f:
                lines.append(f"    Heal: assign to {f['heal']['agent']} — {f['heal']['instruction']}")
            lines.append("")

    lines.append("=" * 50)
    report = "\n".join(lines)

    # Save text report
    LOGS_DIR.mkdir(exist_ok=True)
    report_file = LOGS_DIR / f"{plan_name}_{timestamp_file}.txt"
    report_file.write_text(report + "\n")

    # Save JSON report (for agents)
    json_result = {
        "plan": plan_name,
        "timestamp": timestamp,
        "passed": passed,
        "failed": failed,
        "skipped": skipped,
        "total": total,
        "all_passed": failed == 0,
        "criteria": criteria,
        "results": cmd_results,
        "failures": failures,
        "has_healing_rules": len(healing_rules) > 0,
        "report_file": str(report_file),
    }
    json_file = LOGS_DIR / f"{plan_name}_{timestamp_file}.json"
    json_file.write_text(json.dumps(json_result, indent=2) + "\n")
    prune_old_plan_reports(plan_name)

    result_payload = {
        "report": report,
        "json": json_result,
        "report_file": str(report_file),
        "json_file": str(json_file),
        "passed": passed,
        "failed": failed,
        "throttled": False,
    }
    save_cached_result(plan_name, result_payload)
    return result_payload


def print_text_result(result: dict, plan_name: str) -> None:
    """Print human-readable output."""
    if result.get("throttled"):
        print()
        print(f"  {result.get('throttle_reason', 'Validation throttled.')}")
        print("  Reusing cached result to avoid duplicate runs.")
        print()

    print()
    print(result.get("report", "  No report content available."))
    print()
    failed = int(result.get("failed", 0))
    passed = int(result.get("passed", 0))
    total = passed + failed
    if failed == 0:
        print(f"  Validation complete for {plan_name} — all {total} checks passed.")
    else:
        print(f"  Validation complete for {plan_name} — {passed}/{total} passed, {failed} failed.")
    print(f"  Report saved: {result.get('report_file', 'n/a')}")
    print(f"  JSON saved:   {result.get('json_file', 'n/a')}")
    print()


def main() -> None:
    lock_handle = acquire_process_lock(LOCK_WAIT_SECONDS)

    args = sys.argv[1:]

    # Parse --json flag
    json_mode = "--json" in args
    if json_mode:
        args.remove("--json")

    plan_name = args[0] if args else None

    if lock_handle is None:
        if plan_name:
            _, cached_result = load_cached_result(plan_name)
            if cached_result:
                if json_mode:
                    print(json.dumps(cached_result.get("json", {}), indent=2))
                else:
                    print_text_result(cached_result, plan_name)
                cached_failed = int(cached_result.get("failed", 0))
                sys.exit(0 if cached_failed == 0 else 1)
        busy_msg = "Validation is already running in another process; skipping duplicate invocation."
        if json_mode:
            print(json.dumps({"busy": True, "message": busy_msg}))
        else:
            print(f"  {busy_msg}")
        sys.exit(0)

    try:
        if plan_name:
            result = validate_plan(plan_name)
            if "error" in result:
                if json_mode:
                    print(json.dumps({"error": result["error"]}))
                else:
                    print(f"  Error: {result['error']}")
                sys.exit(1)

            if json_mode:
                print(json.dumps(result["json"], indent=2))
            else:
                print_text_result(result, plan_name)
            sys.exit(0 if result["failed"] == 0 else 1)

        # Validate all plans
        specs = sorted(SPECS_DIR.glob("*.md"))
        if not specs:
            if json_mode:
                print(json.dumps({"error": "No specs found"}))
            else:
                print("  No specs found in specs/")
            sys.exit(1)

        if not json_mode:
            print()
            print("  Running validation for all plans...")
            print()

        all_results = []
        total_plans = 0
        passed_plans = 0

        for spec in specs:
            plan = spec.stem
            total_plans += 1
            result = validate_plan(plan)
            if "error" not in result:
                all_results.append(result["json"])
                if result["failed"] == 0:
                    passed_plans += 1
                if not json_mode:
                    print_text_result(result, plan)

        if json_mode:
            print(json.dumps({
                "plans": all_results,
                "total_plans": total_plans,
                "passed_plans": passed_plans,
            }, indent=2))
        else:
            print("  " + "=" * 46)
            print(f"  ALL PLANS: {passed_plans}/{total_plans} fully passed")
            print("  " + "=" * 46)
            print()
    finally:
        release_process_lock(lock_handle)


if __name__ == "__main__":
    main()
