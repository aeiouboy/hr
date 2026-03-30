---
description: Implement the plan
argument-hint: [path-to-plan]
---

# Cook

Orchestrate a team of agents to implement the plan at `PATH_TO_PLAN`.

## Variables

PATH_TO_PLAN: $ARGUMENTS

## Workflow

1. If no `PATH_TO_PLAN` is provided, STOP immediately and ask the user to provide it (AskUserQuestion).
2. Read the plan at `PATH_TO_PLAN`.
3. Extract the plan name from the filename to use as the team name.

### Create Team

4. Use `TeamCreate` to create a team named after the plan.

### Create Tasks

5. Read the `## Step by Step Tasks` section from the plan.
6. For each task, use `TaskCreate` to create a task in the team's task list:
   - Use the task title as the subject
   - Include the full task description, assigned agent type, and dependencies
   - Set `blockedBy` for tasks that depend on other tasks

### Create GitHub Issues

7. After creating all tasks, create a GitHub Issue for each task using `gh issue create`:
   - **Title**: `[<Task ID>] <Task Name>` (e.g., `[setup-database] Setup Database Schema`)
   - **Body**: Include task description, dependencies, assigned agent, and a link back to the plan file
   - **Labels**: auto-create labels if needed: `pipeline`, `build`, `test`, `review`, `docs`, `validate`
     - Assign label based on agent type: builder→`build`, test-writer→`test`, code-reviewer→`review`, docs-writer→`docs`, validator→`validate`
   - Save the mapping of Task ID → GitHub Issue Number for later updates
   - As tasks complete, close the corresponding GitHub Issue with a comment summarizing what was done
   - If a task fails and heals, add a comment to the issue with the failure details and fix applied

### Spawn Teammates

8. Read the `## Team Orchestration > Team Members` section from the plan.
9. For each team member, spawn a teammate using the `Agent` tool with:
   - `name`: The member's Name from the plan
   - `subagent_type`: The member's Agent Type from the plan
   - `team_name`: The team name from step 4
   - `run_in_background`: true
   - `prompt`: Include the full plan context and their specific role/tasks

### Infra Verify (before feature builds)

10. After the foundation/scaffolding task completes, **verify infrastructure BEFORE assigning feature tasks**:
   - If the plan uses external services (database, auth, APIs), the foundation builder must verify real connections as its LAST step
   - The team lead must confirm the builder reported successful connection tests (e.g., `SELECT 1` on DB, JWKS endpoint returns keys, auth token flow works)
   - If infra verification fails, DO NOT proceed to feature builds. Fix infra first.
   - Save verified connection details (correct hostnames, ports, endpoints) so downstream agents use correct values.

### Orchestrate

11. You are the **team lead**. You NEVER write code directly.
12. Assign the first unblocked task(s) to the appropriate teammate(s) using `TaskUpdate` with `owner`.
13. When a teammate completes a task:
    - Mark it completed via `TaskUpdate`
    - Close the corresponding GitHub Issue with a comment: what was done, files changed
    - Assign the next unblocked task
14. Follow the `## Pipeline` section ordering from the plan.
15. **For the Write Tests task**: Ensure the tester writes BOTH unit tests (mocked) AND E2E tests (real services).
    - E2E tests MUST implement every spec listed in the plan's `## E2E Test Specifications` section
    - E2E tests MUST perform real user actions (click, fill, submit) — NOT just check element visibility
    - E2E tests MUST include negative cases (invalid input → error shown)
    - E2E tests MUST run against real backend — NO mocked API responses
    - Tests that only check page rendering (headings, buttons visible) are INSUFFICIENT and must be rejected
    - After the tester reports completion, SPOT-CHECK at least 2 E2E test files: read the code and verify it contains real user actions and meaningful assertions. If it only checks visibility, send back for rewrite.
    - **BAN `test.fail()`**: If any E2E test uses `test.fail()`, REJECT and send back. `test.fail()` hides failures by inverting pass/fail — making broken tests report as "pass". Use `test.skip('BUG: ...')` instead.
    - **Screenshot verification**: After E2E tests complete, READ at least 3 screenshot images from `docs/test-results/screenshots/`. If any screenshot shows error toasts, crash screens, or blank pages, the tests are NOT passing — reject and investigate.
    - **Port configuration**: E2E ports are configured via `E2E_FRONTEND_PORT` (default 3002) and `E2E_BACKEND_PORT` (default 3001) env vars. NEVER hardcode ports in test files — use `FRONTEND_URL` / `BACKEND_URL` from `frontend/e2e/helpers.ts`.
    - **Business Functional Tests (MANDATORY)**: The tester MUST write BF-* tests in addition to technical E2E tests. After tester reports completion:
      a. Verify `docs/test-results/business-functional/` exists with bf-test-cases.md, bf-results.md, bf-summary.md
      b. READ bf-summary.md — it must be understandable by non-developer stakeholders
      c. Verify GitHub Issues were created for each BF test case with screenshots
      d. READ at least 2 BF test screenshots — each must show real application state (not error pages)
      e. If bf-summary.md is missing or has 0% coverage, REJECT and send back
16. **For the Update Docs task**: Only assign AFTER Code Review has passed with no remaining issues.
    - If Code Review found issues and the builder is still fixing them, do NOT start docs yet
    - The docs-writer should document the **reviewed** code, not pre-review code that may still change
    - Gate: Code Review task status must be `completed` with no pending fixes before assigning Update Docs
17. **For the Validate task**: Ensure the validator starts real servers, makes real API calls with real auth tokens, and verifies response bodies contain actual data from the database — not just HTTP 200 status codes.
18. If a validation step fails, follow the `## Healing Rules` to route fixes to the right agent.
19. Continue until all tasks are completed or max retries are exhausted.

### Upload E2E Screenshots to GitHub Issues

20. After E2E tests complete (Write Tests or Validate task), upload screenshots to the relevant GitHub Issues:
    - Find all screenshots in `docs/test-results/screenshots/`
    - For each screenshot, determine which task/issue it belongs to based on the test ID prefix (e.g., `e2e-cc-01-*` → charge codes task)
    - Upload screenshots as comments to the corresponding GitHub Issue using:
      ```bash
      # Upload image and comment on issue
      gh issue comment <issue-number> --body "### E2E Screenshot: <screenshot-name>
      ![<screenshot-name>](<url>)"
      ```
    - If direct image upload is not possible, attach screenshots by referencing their path in the repo:
      ```bash
      gh issue comment <issue-number> --body "### E2E Test Evidence
      Screenshots saved to \`docs/test-results/screenshots/\`:
      $(ls docs/test-results/screenshots/<test-prefix>-* 2>/dev/null | sed 's/^/- /')"
      ```
    - For failed tests, include the screenshot in the failure comment with the error details

### Healing Log

When the heal step runs, save a healing log to `docs/test-results/healing-log.md` (kebab-case, alongside other results) with this structure:

```markdown
# Healing Log

## Iteration 1
- **Date**: YYYY-MM-DD HH:MM
- **Validation failures**: list each failure (command, output summary)
- **Healed by**: agent name
- **Fix applied**: what was changed
- **Result**: pass/fail after fix

## Iteration 2 (if needed)
...
```

This gives the user visibility into what broke and how it was fixed.

## Report

- Present the final status of all tasks.
- Summarize work done by each teammate.
- Report files and total lines changed with `git diff --stat`.
- Report location of test results: `docs/test-results/`
- Report location of validation logs: `logs/`
- If healing occurred, report location of healing log: `docs/test-results/healing-log.md`