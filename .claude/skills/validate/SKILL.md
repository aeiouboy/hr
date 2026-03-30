---
name: validate
description: Run acceptance criteria validation for a plan and save a readable report to logs/. Use after plan tasks are complete to verify all criteria pass. Supports auto-healing by routing failures to the right agent.
---

# Validate Plan

Automatically validates completed plans by reading their specs. Supports healing — when checks fail, it tells you which agent should fix it.

## How It Works

1. Reads the spec from `specs/{plan-name}.md`
2. Extracts **Acceptance Criteria**, **Validation Commands**, and **Healing Rules**
3. Runs each command, captures pass/fail
4. Saves a text report + JSON report to `logs/`
5. For failures: matches against Healing Rules to recommend which agent should fix it

## Usage

```bash
# Validate one plan (human-readable)
python3 .claude/skills/validate/validate.py hello-500-languages-page

# Validate ALL plans
python3 .claude/skills/validate/validate.py

# JSON output (for agents to parse programmatically)
python3 .claude/skills/validate/validate.py --json hello-500-languages-page
```

## Healing Flow

When validation fails, the team lead agent should:

1. Run `python3 .claude/skills/validate/validate.py --json {plan-name}`
2. Parse the JSON — each failure has a `heal` field with `agent` and `instruction`
3. Dispatch the recommended agent with the failure details as context
4. After the agent fixes it, re-run validation
5. Max 2 retries — if still failing, escalate to user

```
Validate → FAIL → Read heal.agent → Dispatch agent → Re-validate → PASS? Done
                                                         ↓
                                                       FAIL? Retry (max 2)
                                                         ↓
                                                       Escalate to user
```

## Spec Requirements

Each spec in `specs/` needs these sections:

```markdown
## Acceptance Criteria
- Criterion 1
- Criterion 2

## Validation Commands
- `command here` — Description of what it checks

## Healing Rules
- `keyword` → agent-type — What to fix when this keyword appears in a failure
```

The `keyword` in Healing Rules is matched against the failure's description, command, and output.

## Output Files

Each run saves two files to `logs/`:
- `{plan-name}_{timestamp}.txt` — human-readable report
- `{plan-name}_{timestamp}.json` — structured data for agents

## JSON Structure

```json
{
  "plan": "hello-500-languages-page",
  "passed": 3,
  "failed": 1,
  "all_passed": false,
  "failures": [
    {
      "description": "Run all automated tests",
      "cmd": "python3 -m pytest app/tests/ -v",
      "output": "...",
      "heal": {
        "agent": "test-writer",
        "instruction": "Fix failing tests or update test expectations"
      }
    }
  ]
}
```
