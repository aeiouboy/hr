---
description: Creates a concise engineering implementation plan based on user requirements and saves it to specs directory
argument-hint: [user prompt] [orchestration prompt]
model: opus
disallowed-tools: Task, EnterPlanMode
hooks:
  Stop:
    - hooks:
        - type: command
          command: >-
            uv run $CLAUDE_PROJECT_DIR/.claude/hooks/validators/validate_new_file.py
            --directory specs
            --extension .md
        - type: command
          command: >-
            uv run $CLAUDE_PROJECT_DIR/.claude/hooks/validators/validate_file_contains.py
            --directory specs
            --extension .md
            --contains '## Task Description'
            --contains '## Objective'
            --contains '## Relevant Files'
            --contains '## Step by Step Tasks'
            --contains '## Acceptance Criteria'
            --contains '## Validation Commands'
            --contains '## Healing Rules'
            --contains '## Tech Stack'
            --contains '## Technical Design'
            --contains '## Team Orchestration'
            --contains '### Team Members'
            --contains '## Pipeline'
            --contains 'Code Review'
            --contains 'Write Tests'
            --contains 'Validate Final'
            --contains '### Business Functional Test Specifications'
---

# Plan With Team

Create a detailed implementation plan based on the user's requirements provided through the `USER_PROMPT` variable. Analyze the request, think through the implementation approach, and save a comprehensive specification document to `PLAN_OUTPUT_DIRECTORY/<name-of-plan>.md` that can be used as a blueprint for actual development work. Follow the `Instructions` and work through the `Workflow` to create the plan.

## Variables

USER_PROMPT: $1
ORCHESTRATION_PROMPT: $2 - (Optional) Guidance for team assembly, task structure, and execution strategy
PLAN_OUTPUT_DIRECTORY: `specs/`
TEAM_MEMBERS: `.claude/agents/team/*.md`
GENERAL_PURPOSE_AGENT: `general-purpose`

## Instructions

- **PLANNING ONLY**: Do NOT build, write code, or deploy agents. Your only output is a plan document saved to `PLAN_OUTPUT_DIRECTORY`.
- If no `USER_PROMPT` is provided, stop and ask the user to provide it.
- If `ORCHESTRATION_PROMPT` is provided, use it to guide team composition, task granularity, dependency structure, and parallel/sequential decisions.
- Carefully analyze the user's requirements provided in the USER_PROMPT variable
- Determine the task type (chore|feature|refactor|fix|enhancement) and complexity (simple|medium|complex)
- Think deeply (ultrathink) about the best approach to implement the requested functionality or solve the problem
- Understand the codebase directly without subagents to understand existing patterns and architecture
- Follow the Plan Format below to create a comprehensive implementation plan
- Include all required sections and conditional sections based on task type and complexity
- Generate a descriptive, kebab-case filename based on the main topic of the plan
- Save the complete implementation plan to `PLAN_OUTPUT_DIRECTORY/<descriptive-name>.md`
- Ensure the plan is detailed enough that another developer could follow it to implement the solution
- Include code examples or pseudo-code where appropriate to clarify complex concepts
- Consider edge cases, error handling, and scalability concerns
- Understand your role as the team lead. Refer to the `Team Orchestration` section for more details.

### Team Orchestration

As the team lead, you have access to powerful tools for coordinating work across multiple agents. You NEVER write code directly - you orchestrate team members using these tools.

#### Task Management Tools

**TaskCreate** - Create tasks in the shared task list:
```typescript
TaskCreate({
  subject: "Implement user authentication",
  description: "Create login/logout endpoints with JWT tokens. See specs/auth-plan.md for details.",
  activeForm: "Implementing authentication"  // Shows in UI spinner when in_progress
})
// Returns: taskId (e.g., "1")
```

**TaskUpdate** - Update task status, assignment, or dependencies:
```typescript
TaskUpdate({
  taskId: "1",
  status: "in_progress",  // pending → in_progress → completed
  owner: "builder-auth"   // Assign to specific team member
})
```

**TaskList** - View all tasks and their status:
```typescript
TaskList({})
// Returns: Array of tasks with id, subject, status, owner, blockedBy
```

**TaskGet** - Get full details of a specific task:
```typescript
TaskGet({ taskId: "1" })
// Returns: Full task including description
```

#### Task Dependencies

Use `addBlockedBy` to create sequential dependencies - blocked tasks cannot start until dependencies complete:

```typescript
// Task 2 depends on Task 1
TaskUpdate({
  taskId: "2",
  addBlockedBy: ["1"]  // Task 2 blocked until Task 1 completes
})

// Task 3 depends on both Task 1 and Task 2
TaskUpdate({
  taskId: "3",
  addBlockedBy: ["1", "2"]
})
```

Dependency chain example:
```
Task 1: Setup foundation     → no dependencies
Task 2: Implement feature    → blockedBy: ["1"]
Task 3: Write tests          → blockedBy: ["2"]
Task 4: Final validation     → blockedBy: ["1", "2", "3"]
```

#### Owner Assignment

Assign tasks to specific team members for clear accountability:

```typescript
// Assign task to a specific builder
TaskUpdate({
  taskId: "1",
  owner: "builder-api"
})

// Team members check for their assignments
TaskList({})  // Filter by owner to find assigned work
```

#### Agent Deployment with Task Tool

**Task** - Deploy an agent to do work:
```typescript
Task({
  description: "Implement auth endpoints",
  prompt: "Implement the authentication endpoints as specified in Task 1...",
  subagent_type: "general-purpose",
  model: "opus",  // or "opus" for complex work, "haiku" for VERY simple
  run_in_background: false  // true for parallel execution
})
// Returns: agentId (e.g., "a1b2c3")
```

#### Resume Pattern

Store the agentId to continue an agent's work with preserved context:

```typescript
// First deployment - agent works on initial task
Task({
  description: "Build user service",
  prompt: "Create the user service with CRUD operations...",
  subagent_type: "general-purpose"
})
// Returns: agentId: "abc123"

// Later - resume SAME agent with full context preserved
Task({
  description: "Continue user service",
  prompt: "Now add input validation to the endpoints you created...",
  subagent_type: "general-purpose",
  resume: "abc123"  // Continues with previous context
})
```

When to resume vs start fresh:
- **Resume**: Continuing related work, agent needs prior context
- **Fresh**: Unrelated task, clean slate preferred

#### Parallel Execution

Run multiple agents simultaneously with `run_in_background: true`:

```typescript
// Launch multiple agents in parallel
Task({
  description: "Build API endpoints",
  prompt: "...",
  subagent_type: "general-purpose",
  run_in_background: true
})
// Returns immediately with agentId and output_file path

Task({
  description: "Build frontend components",
  prompt: "...",
  subagent_type: "general-purpose",
  run_in_background: true
})
// Both agents now working simultaneously

// Check on progress
TaskOutput({
  task_id: "agentId",
  block: false,  // non-blocking check
  timeout: 5000
})

// Wait for completion
TaskOutput({
  task_id: "agentId",
  block: true,  // blocks until done
  timeout: 300000
})
```

#### Orchestration Workflow

1. **Create tasks** with `TaskCreate` for each step in the plan
2. **Set dependencies** with `TaskUpdate` + `addBlockedBy`
3. **Assign owners** with `TaskUpdate` + `owner`
4. **Deploy agents** with `Task` to execute assigned work
5. **Monitor progress** with `TaskList` and `TaskOutput`
6. **Resume agents** with `Task` + `resume` for follow-up work
7. **Mark complete** with `TaskUpdate` + `status: "completed"`

## Workflow

IMPORTANT: **PLANNING ONLY** - Do not execute, build, or deploy. Output is a plan document.

1. Analyze Requirements - Parse the USER_PROMPT to understand the core problem and desired outcome
2. Understand Codebase - Without subagents, directly understand existing patterns, architecture, and relevant files
3. Design Solution - Develop technical approach including architecture decisions and implementation strategy
4. Define Team Members - Use `ORCHESTRATION_PROMPT` (if provided) to guide team composition. Identify from `.claude/agents/team/*.md` or use `general-purpose`. Document in plan.
5. Define Step by Step Tasks - Use `ORCHESTRATION_PROMPT` (if provided) to guide task granularity and parallel/sequential structure. Write out tasks with IDs, dependencies, assignments. Document in plan.
6. Generate Filename - Create a descriptive kebab-case filename based on the plan's main topic
7. Save Plan - Write the plan to `PLAN_OUTPUT_DIRECTORY/<filename>.md`
8. Save & Report - Follow the `Report` section to write the plan to `PLAN_OUTPUT_DIRECTORY/<filename>.md` and provide a summary of key components

## Plan Format

- IMPORTANT: Replace <requested content> with the requested content. It's been templated for you to replace. Consider it a micro prompt to replace the requested content.
- IMPORTANT: Anything that's NOT in <requested content> should be written EXACTLY as it appears in the format below.
- IMPORTANT: Follow this EXACT format when creating implementation plans:

```md
# Plan: <task name>

## Task Description
<describe the task in detail based on the prompt>

## Objective
<clearly state what will be accomplished when this plan is complete>

<if task_type is feature or complexity is medium/complex, include these sections:>
## Problem Statement
<clearly define the specific problem or opportunity this task addresses>

## Solution Approach
<describe the proposed solution approach and how it addresses the objective>
</if>

## Tech Stack
<list the technologies, languages, frameworks, and tools to be used>
- **Language**: <e.g., TypeScript, Python, JavaScript>
- **Framework**: <e.g., Next.js, Flask, vanilla — or "None" for zero-dependency>
- **Runtime**: <e.g., Browser, Node.js, Python 3.11+>
- **Key APIs/Libraries**: <e.g., HTML5 Canvas, Web Audio API, WebSocket>
- **Build Tools**: <e.g., None (single file), Vite, uv>
- **Testing**: <e.g., pytest, vitest, manual browser testing>

## Technical Design
<describe the architecture and key technical decisions that builders must follow>

### Architecture
<describe the overall system architecture — e.g., component diagram, data flow, module boundaries>

### Key Design Decisions
<list important technical decisions and their rationale — e.g., "Use object pooling for bullets to avoid GC stutter", "Single HTML file for zero-dependency deployment">

### Data Model
<describe key data structures, state shape, or schemas — e.g., entity objects, game state, API payloads>

### API / Interface Contracts
<if applicable, describe public interfaces, function signatures, or API endpoints that modules must implement>

<if task involves front-end / UI work, include this section:>
## UX/UI Design

### Figma / Design Reference
<link to Figma file, screenshot, or design reference if provided by the user. If none provided, state "No external design provided — ASCII wireframes below serve as the design spec.">

### Wireframes
<draw ASCII wireframes for each screen/view the builders need to implement. Be specific about layout, element placement, and responsive behavior.>

Example format:
```
┌─────────────────────────────────────────┐
│  Logo          Nav Item 1  Nav Item 2   │
├─────────────────────────────────────────┤
│                                         │
│   ┌──────────┐  ┌──────────┐           │
│   │  Card 1  │  │  Card 2  │           │
│   │          │  │          │           │
│   └──────────┘  └──────────┘           │
│                                         │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

### Visual Style
<describe colors, typography, spacing, animations, and overall feel — e.g., "dark theme, neon accents, retro pixel font, glowing effects">

### User Flow
<describe the key user interactions step by step — e.g., "User lands on title screen → presses Enter → game starts → dies → game over screen → press Enter to restart">
</if>

## Relevant Files
Use these files to complete the task:

<list files relevant to the task with bullet points explaining why. Include new files to be created under an h3 'New Files' section if needed>

<if complexity is medium/complex, include this section:>
## Implementation Phases
### Phase 1: Foundation
<describe any foundational work needed>

### Phase 2: Core Implementation
<describe the main implementation work>

### Phase 3: Integration & Polish
<describe integration, testing, and final touches>
</if>

## Team Orchestration

- You operate as the team lead and orchestrate the team to execute the plan.
- You're responsible for deploying the right team members with the right context to execute the plan.
- IMPORTANT: You NEVER operate directly on the codebase. You use `Task` and `Task*` tools to deploy team members to to the building, validating, testing, deploying, and other tasks.
  - This is critical. You're job is to act as a high level director of the team, not a builder.
  - You're role is to validate all work is going well and make sure the team is on track to complete the plan.
  - You'll orchestrate this by using the Task* Tools to manage coordination between the team members.
  - Communication is paramount. You'll use the Task* Tools to communicate with the team members and ensure they're on track to complete the plan.
- Take note of the session id of each team member. This is how you'll reference them.

### Team Members
<list the team members you'll use to execute the plan. You MUST always include at least one code-reviewer, one test-writer, and one validator.>

- Builder
  - Name: <unique name for this builder - this allows you and other team members to reference THIS builder by name. Take note there may be multiple builders, the name make them unique.>
  - Role: <the single role and focus of this builder will play>
  - Agent Type: <the subagent type of this builder, you'll specify based on the name in TEAM_MEMBERS file or GENERAL_PURPOSE_AGENT if you want to use a general-purpose agent>
  - Resume: <default true. This lets the agent continue working with the same context. Pass false if you want to start fresh with a new context.>
- <continue with additional builders as needed>

- Code Reviewer
  - Name: <unique name for this code reviewer>
  - Role: Review and fix code quality, efficiency, and reuse issues after builders complete their work
  - Agent Type: code-reviewer
  - Resume: false

- Test Writer
  - Name: <unique name for this test writer>
  - Role: Write comprehensive automated tests for the implemented code
  - Agent Type: test-writer
  - Resume: false

- Validator
  - Name: <unique name for this validator>
  - Role: Final read-only validation that all acceptance criteria are met and all tests pass
  - Agent Type: validator
  - Resume: false

## Step by Step Tasks

- IMPORTANT: Execute every step in order, top to bottom. Each task maps directly to a `TaskCreate` call.
- Before you start, run `TaskCreate` to create the initial task list that all team members can see and execute.

<list step by step tasks as h3 headers. Start with foundational work, then core implementation, then validation.>

### 1. <First Task Name>
- **Task ID**: <unique kebab-case identifier, e.g., "setup-database">
- **Depends On**: <Task ID(s) this depends on, or "none" if no dependencies>
- **Assigned To**: <team member name from Team Members section>
- **Agent Type**: <subagent from TEAM_MEMBERS file or GENERAL_PURPOSE_AGENT if you want to use a general-purpose agent>
- **Parallel**: <true if can run alongside other tasks, false if must be sequential>
- <specific action to complete>
- <specific action to complete>

### 2. <Second Task Name>
- **Task ID**: <unique-id>
- **Depends On**: <previous Task ID, e.g., "setup-database">
- **Assigned To**: <team member name>
- **Agent Type**: <subagent type from TEAM_MEMBERS file or GENERAL_PURPOSE_AGENT if you want to use a general-purpose agent>
- **Parallel**: <true/false>
- <specific action>
- <specific action>

### 3. <Continue Pattern — add as many build tasks as needed>

<MANDATORY POST-BUILD TASKS — these 3 tasks MUST always be the final tasks in every plan>

### N-3. Code Review
- **Task ID**: code-review
- **Depends On**: <all build task IDs>
- **Assigned To**: <code-reviewer team member>
- **Agent Type**: code-reviewer
- **Parallel**: false
- Review all files created/modified by builders for quality, efficiency, reuse, and accessibility issues
- Fix all issues found directly
- Report what was fixed and what was skipped

### N-2. Write Tests
- **Task ID**: write-tests
- **Depends On**: code-review
- **Assigned To**: <test-writer team member>
- **Agent Type**: test-writer
- **Parallel**: false
- Write comprehensive automated tests for the implemented code
- Cover: correctness, edge cases, error paths, data integrity
- Run all tests and ensure they pass
- **MANDATORY: Save test results to `docs/test-results/`** with this structure:
  ```
  docs/test-results/
  ├── summary.md                          # Human-readable overview: date, pass/fail counts, coverage areas
  ├── test-cases.md                       # Catalog of all test cases with ID, description, type, status
  ├── unit/
  │   ├── unit-results.json               # Machine-readable test runner output (e.g. vitest --reporter=json)
  │   └── unit-results.md                 # Human-readable unit test report
  ├── e2e/                                # End-to-end test results (if applicable)
  │   ├── e2e-results.json                # Playwright JSON report
  │   └── e2e-results.md                  # Human-readable e2e test report
  ├── screenshots/                        # Visual captures (if project has UI)
  │   ├── <page-name>--desktop.png        # Static page captures (one per page)
  │   ├── <page-name>--mobile.png         # Mobile viewport (if responsive)
  │   └── <test-id>-<step>--desktop.png   # Workflow step evidence (see below)
  └── healing-log.md                      # Auto-heal iterations (created by cook if healing occurs)
  ```
- **File naming rules** (engineers must follow these exactly):
  - Use **kebab-case** for all file and folder names (e.g. `order-list--desktop.png`, not `OrderList_desktop.png`)
  - Static page screenshots: `<page-name>--<viewport>.png` (double dash separates name from variant)
  - **Workflow step screenshots**: `<test-id>-<step-description>--<viewport>.png` — every E2E test that performs a multi-step workflow MUST capture a screenshot at each significant state change. This is evidence that the action actually happened.
  - Test results: `<type>-results.<ext>` where type is `unit`, `e2e`, `integration`, etc.
  - Always include both `.json` (machine-readable) and `.md` (human-readable) for each test type
- Configure the test runner to output JSON results (e.g. `vitest run --reporter=json --outputFile=docs/test-results/unit/unit-results.json`)
- If the project has UI pages, use Playwright to capture screenshots of each key page and save to `docs/test-results/screenshots/` following the naming convention above
- Write `docs/test-results/test-cases.csv` (CSV — primary format for QA review in spreadsheets):
  ```csv
  ID,Title,Type,Section,Priority,Preconditions,Steps,Expected Result,Test Data,File,Status,Notes
  TC-001,"Create project under program",e2e,E2E > Charge Codes,High,"Admin logged in","1. Navigate 2. Click Create 3. Fill form","Project appears in tree","Role: admin",frontend/e2e/cc.spec.ts,pass,
  ```
  Columns: ID, Title, Type, Section (hierarchical group), Priority, Preconditions, Steps, Expected Result, Test Data, File, Status, Notes
- Write `docs/test-results/test-cases.md` (same data grouped by Section for git review):
  ```markdown
  # Test Cases
  > Generated: YYYY-MM-DD | Total: N | Pass: N | Fail: N

  ## E2E > Charge Codes
  | ID | Title | Priority | Preconditions | Steps | Expected Result | Test Data | File | Status |
  |----|-------|----------|---------------|-------|-----------------|-----------|------|--------|
  | TC-001 | Create project under program | High | Admin logged in | 1. Navigate 2. Click Create | Project in tree | Role: admin | frontend/e2e/cc.spec.ts | pass |
  ```
- Write `docs/test-results/summary.md` with: date, total tests, passed/failed counts, list of test files, coverage areas, and any notable findings
- Report coverage areas and results

### N-1. Update Docs
- **Task ID**: update-docs
- **Depends On**: write-tests
- **Assigned To**: <docs-writer team member>
- **Agent Type**: docs-writer
- **Parallel**: false
- Review the implemented features and write/update documentation (e.g. README.md, API docs)
- Ensure documentation is clear, accurate, and helpful for future developers
- **MANDATORY**: Create the following documentation files:
  - `docs/env-setup.md` — environment variables with descriptions and example values (sourced from `.env*` files)
  - `docs/architecture.md` — Mermaid data flow diagram + component tree
  - `docs/troubleshooting.md` — common errors and how to fix them
- **IMPORTANT**: If creating an index/README that links to other doc files, ALL linked files MUST be created. Never create links to files that don't exist.
- After writing docs, verify every internal link resolves to an existing file
- Report the documentation created or modified

### N. Validate Final Output
- **Task ID**: validate-all
- **Depends On**: code-review, write-tests, update-docs
- **Assigned To**: <validator team member>
- **Agent Type**: validator
- **Parallel**: false
- Run all validation commands
- Run all automated tests
- Verify acceptance criteria met
- **Verify all documentation links**: Check that every file referenced in docs/README.md or any index file actually exists on disk
- **Verify runtime**: If the project has a dev server, start it and confirm all routes return HTTP 200 (not just that `npm run build` passes)

### N+1. Heal Failures (if any)
- **Task ID**: heal
- **Depends On**: validate-all
- **Assigned To**: team-lead (you)
- **Parallel**: false
- **Max Retries**: 2
- Only run this step if step N (validate-all) has failures
- Run: `python3 .claude/skills/validate/validate.py --json <plan-name>`
- Parse the JSON output — each failure has a `heal` field:
  - `heal.agent` — which agent type should fix it (builder, test-writer, code-reviewer)
  - `heal.instruction` — what to fix
- For each failure with a heal recommendation:
  1. Create a new task assigned to `heal.agent` with context: the failure description, command output, and heal instruction
  2. Wait for the agent to complete the fix
- After all fixes are applied, re-run validation: `python3 .claude/skills/validate/validate.py --json <plan-name>`
- If still failing after 2 retries, stop and report remaining failures to the user
- If all checks pass, mark the plan as complete

<continue with additional build tasks as needed before the mandatory post-build tasks. Agent types must exist in .claude/agents/team/*.md>

## Pipeline

Every plan follows this mandatory execution pipeline:

```
Research (if needed) → Infra Verify → Build → Code Review → Write Tests (unit + E2E smoke) → Update Docs → Validate (real runtime) → Heal (if needed) → Re-validate
```

- **Research**: Optional. Gather information needed before building.
- **Infra Verify**: MANDATORY for projects with external services (DB, auth, APIs). A builder agent must verify all external connections BEFORE any feature code is written:
  - Database: execute a simple query (`SELECT 1`) using the configured connection string
  - Auth: fetch JWKS/auth endpoint and confirm it returns valid keys
  - APIs: curl any external service endpoints to confirm reachability
  - Env vars: confirm all required env vars are set and valid (not placeholder values like `your-xxx` or `[ref]`)
  - If ANY infra check fails, STOP and fix before proceeding. Do not build features on broken infra.
  - Save verified connection details to the plan or CLAUDE.md for downstream agents.
- **Build**: Core implementation work by builder agents. Can be parallelized.
- **Code Review**: MANDATORY. code-reviewer agent reviews and fixes quality/efficiency/reuse issues.
- **Write Tests**: MANDATORY. test-writer agent creates automated tests:
  - **Unit tests** (mocked): business logic, state machines, validation rules
  - **E2E smoke tests** (real): At minimum 1 full user flow against real running services — e.g., login → create resource → read resource → verify response. These tests must connect to the actual database and auth provider, NOT mocks. If the project has a dev server, the smoke test must start it, run the flow, and stop it.
  - Test results clearly separate unit (mocked) from E2E (real) in `docs/test-results/`
- **Update Docs**: MANDATORY. docs-writer agent creates/updates documentation in a dedicated `docs/` folder or root `README.md`.
- **Validate Final**: MANDATORY. validator agent confirms all acceptance criteria met:
  - Run all automated tests (both unit AND E2E)
  - Start dev servers and curl key endpoints for HTTP 200 with valid response bodies (not just status codes)
  - Verify at least one authenticated API call returns real data from the database
  - Check documentation exists and links resolve
  - This is a REAL runtime validation, not just file existence checks
- **Heal**: CONDITIONAL. If validation fails, parse failures and route each to the correct agent per Healing Rules. Max 2 retries.

## Acceptance Criteria

IMPORTANT: Every feature criterion MUST have a `Verified by:` line linking to specific test IDs. Criteria without test coverage are NOT considered complete.

### Feature Criteria
<list specific, measurable criteria. EVERY criterion must include a `Verified by:` line>

Format:
```
- [ ] <criterion description>
      Verified by: <test IDs that prove this works — e.g., UNIT-CC-03, E2E-CC-01>
```

Example:
```
- [ ] Charge codes support 4-level hierarchy (Program > Project > Activity > Task)
      Verified by: UNIT-CC-03 (hierarchy CRUD), E2E-CC-01 (create project under program), E2E-CC-02 (negative: project without parent fails)
```

### E2E Test Specifications (MANDATORY for UI projects)

Every E2E test case MUST be written as a **step-by-step test script** that reads like a manual QA procedure. Each step must specify WHERE the user is, WHAT they check before acting, WHAT they do, and WHAT should happen after.

Format:
```
E2E-<MODULE>-<NUM>: <test name>
  Role: <which test user and role — e.g., employee (wichai.s@central.co.th)>
  Page: <starting page — e.g., /time-entry>

  Step 1: <Navigate to [page] via [menu/URL]>
    Pre-check: <what should be visible/enabled before acting>
    Action: <what the user does — click, fill, select>
    Post-check: <expected UI state after the action>
    Snap: <screenshot name — e.g., "page-loaded">

  Step 2: <Perform the core action>
    Pre-check: <e.g., button should be enabled, form should be empty>
    Action: <e.g., fill field X with "value", click Submit>
    Post-check: <e.g., toast appears, status badge changes, row appears in table>
    Snap: <screenshot name — e.g., "after-submit">

  Step 3: <Verify backend state>
    Action: <API call — e.g., GET /api/v1/resource>
    Post-check: <e.g., response contains status='submitted', entries.length > 0>

  [If multi-role workflow — add role switch steps:]
  Step N: <Switch to [role] ([email])>
    Pre-check: <what the new role should see on their page>
    Action: <what the new role does>
    Post-check: <expected outcome>
    Snap: <screenshot name>

  Negative: <describe the negative scenario>
    Step: <what invalid action the user takes>
    Post-check: <error message, validation dialog, or access denied>
    Snap: <screenshot name — e.g., "error-shown">
```

**Example:**
```
E2E-CC-01: Admin creates Project under existing Program
  Role: admin (tachongrak@central.co.th)
  Page: /charge-codes

  Step 1: Navigate to Charge Codes page
    Pre-check: tree view shows existing Programs in left panel
    Action: (page load)
    Post-check: tree is visible with expandable nodes
    Snap: "tree-loaded"

  Step 2: Open create dialog
    Pre-check: "+ Create New" button is visible at top of left panel
    Action: click "+ Create New"
    Post-check: dialog opens with empty form, Level dropdown defaults to "program"
    Snap: "dialog-open"

  Step 3: Select level and fill form
    Pre-check: when Level = "Project" is selected, Parent dropdown appears and is REQUIRED
    Action: select Level = "Project", select Parent = "Digital Transformation", fill Name = "Payment Gateway", fill Code = "PRJ-PAY-001"
    Post-check: all fields populated, Create button is enabled

  Step 4: Submit and verify
    Action: click "Create"
    Post-check: dialog closes, success toast appears, "PRJ-PAY-001" appears in tree under parent
    Snap: "after-create"

  Step 5: Verify API state
    Action: GET /api/v1/charge-codes/tree
    Post-check: response contains node with code="PRJ-PAY-001", level="project", parentId matches program

  Negative: Create Project without selecting parent
    Step: select Level = "Project", leave Parent empty, click "Create"
    Post-check: validation error "Parent is required" appears, dialog stays open
    Snap: "error-shown"
```

**Snap rules:**
- Every `Snap:` line in the spec MUST produce a screenshot in the test implementation
- Screenshot filename: `<test-id>-<snap-description>--<viewport>.png` (all kebab-case)
  - Example: `e2e-cc-01-dialog-open--desktop.png`, `e2e-wf-04-after-approve--desktop.png`
- The test-writer MUST implement a `snap(page, testId, stepName)` helper that:
  1. Takes the screenshot with the correct naming convention
  2. Saves to `docs/test-results/screenshots/`
  3. Is reusable across all tests (no hardcoded paths)
- Minimum snaps per test type:
  - **CRUD tests**: at least 1 snap before action + 1 snap after action (proves state changed)
  - **Workflow tests**: 1 snap per user role transition (proves each persona saw correct data)
  - **Negative tests**: 1 snap showing the error/validation message
- The validator MUST verify: for each `Snap:` line in the spec, a corresponding screenshot file exists in `docs/test-results/screenshots/`

<list E2E test specs here using the format above. Minimum coverage:>
- At least 1 CRUD flow per core module (create → read → update → verify)
- At least 1 multi-step workflow (e.g., login → create → submit → approve)
- At least 1 negative test per module (invalid input, missing required field, unauthorized)
- At least 1 role-based access test (admin can, employee cannot)

### Business Functional Test Specifications (MANDATORY for UI projects)

Every plan MUST include business functional test scenarios written in **business language** (Thai or English). These tests validate that the system works correctly from the user's perspective, not just technically.

Format:
```
BF-<MODULE>-<NUM>: <business scenario in Thai or English>
  Role: <ผู้ใช้และบทบาท>
  Business Rule: <กฎธุรกิจที่ทดสอบ>

  Steps:
  | # | Action | Expected | Pass Criteria |
  |---|--------|----------|---------------|
  | 1 | <สิ่งที่ผู้ใช้ทำ> | <ผลที่คาดหวัง> | <วัดจากอะไร> |

  Screenshot Evidence:
  - bf-xx-01-<description> — ก่อนทำ
  - bf-xx-02-<description> — หลังทำ
```

Example:
```
BF-TE-01: พนักงานบันทึกเวลาเกิน 8 ชม./วัน — ระบบต้องแจ้งเตือน
  Role: employee (wichai.s@central.co.th)
  Business Rule: Overtime (>8 ชม.) ต้องแสดง warning แต่ไม่ block การบันทึก

  Steps:
  | # | Action | Expected | Pass Criteria |
  |---|--------|----------|---------------|
  | 1 | เข้าหน้า Time Entry | Grid แสดงสัปดาห์ | หน้าโหลดไม่ error |
  | 2 | กรอก ACT-001 = 6 ชม. | Daily Total = 6.00 | ตัวเลขถูกต้อง |
  | 3 | กรอก ACT-008 = 4 ชม. | Daily Total = 10.00 | ยอดรวม update |
  | 4 | ตรวจ Variance | แสดง +2.0 สีแดง | Variance != 0 |
  | 5 | Save Draft | Toast "Saved" | ไม่ถูก block |

  Screenshot Evidence:
  - bf-te-01-01-time-entry-page
  - bf-te-01-03-overtime-entered
  - bf-te-01-04-variance-warning
  - bf-te-01-05-saved-successfully
```

Minimum coverage per plan:
- At least 1 **happy path** per module (feature ทำงานปกติ)
- At least 1 **boundary test** (ค่าขอบเขต: 0, max, exactly 8 ชม.)
- At least 1 **validation test** (input ผิด → error message)
- At least 1 **business rule test** (OT warning, min hours, period lock)
- At least 1 **workflow test** (cross-role: submit → approve → lock)
- At least 1 **access control test** (role ไม่มีสิทธิ์ → ไม่เห็นเมนู)

Each BF test MUST be pushed to GitHub Issues with screenshot evidence after execution.

### Infrastructure Criteria (verified by Infra Verify stage)
- All external service connections verified with real queries/requests (not just config file checks)
- No placeholder values remain in .env files (`your-xxx`, `[ref]`, `[password]`)
- Auth endpoint returns valid JWKS/keys
- Database accepts queries via configured connection string

### Quality Criteria
- Code review passes with no remaining quality issues
- All unit tests pass (mocked dependencies)
- All E2E tests pass against real running servers (NOT mocked) — every E2E spec listed above must pass
- Every feature criterion has at least 1 test ID in its `Verified by:` line

### Documentation Criteria
- All documentation files referenced in indexes/READMEs actually exist (no broken internal links)
- `docs/env-setup.md` exists with environment variable descriptions and example values
- `docs/architecture.md` exists with a Mermaid data flow diagram and component tree
- `docs/troubleshooting.md` exists with at least one documented issue and fix

### Runtime Criteria (verified by Validate Final stage with REAL running servers)
- If project has a dev server: all routes return HTTP 200 at runtime (not just build-time)
- At least one authenticated API call returns real data from the database (not mock/empty)
- Auth flow works end-to-end: obtain token → call protected endpoint → receive valid response
- Test case CSV saved to `docs/test-results/test-cases.csv` with 12 columns: ID, Title, Type, Section, Priority, Preconditions, Steps, Expected Result, Test Data, File, Status, Notes
- Test case markdown saved to `docs/test-results/test-cases.md` (same data grouped by Section for git review)
- Test results summary saved to `docs/test-results/summary.md` with pass/fail counts and date
- Unit test JSON output saved to `docs/test-results/unit/unit-results.json`
- Unit test human-readable report saved to `docs/test-results/unit/unit-results.md`
- If project has e2e tests: results saved to `docs/test-results/e2e/e2e-results.json` and `e2e-results.md`
- If project has UI: screenshots saved to `docs/test-results/screenshots/` using `<name>--<viewport>.png` naming

## Validation Commands
Execute these commands to validate the task is complete:

<list specific commands to validate the work. Be precise about what to run>
- Example: `uv run python -m py_compile apps/*.py` - Test to ensure the code compiles
- <MANDATORY: include a command to verify all internal doc links resolve to existing files>
- <MANDATORY if project has a dev server: include a command that starts the server, curls key routes for HTTP 200, then kills the server>
- <MANDATORY: include a command to verify `docs/test-results/test-cases.csv` exists and has header + data rows>
- <MANDATORY: include a command to verify `docs/test-results/test-cases.md` exists and contains a table>
- <MANDATORY: include a command to verify `docs/test-results/summary.md` exists>
- `test -f docs/env-setup.md` — Verify env-setup doc exists
- `test -f docs/architecture.md` — Verify architecture doc exists
- `grep -q 'mermaid' docs/architecture.md` — Verify architecture doc has a Mermaid diagram
- `test -f docs/troubleshooting.md` — Verify troubleshooting doc exists
- `grep -q '### Issue\|### Problem' docs/troubleshooting.md` — Verify troubleshooting doc has at least one issue
- <MANDATORY: include a command to verify `docs/test-results/unit/unit-results.json` exists and contains test results>
- <MANDATORY: include a command to verify `docs/test-results/unit/unit-results.md` exists>
- <MANDATORY if project has e2e tests: include a command to verify `docs/test-results/e2e/` has results>
- <MANDATORY if project has UI: include a command to verify `docs/test-results/screenshots/` has .png files with `--<viewport>` naming>

## Healing Rules
When a validation check fails, assign it to the right agent to fix:

<list failure keyword → agent → instruction mappings, one per line>
- `<failure keyword>` → <agent type> — <what to fix>
- Example: `compile error` → builder — Fix syntax or import errors in the failing file
- Example: `pytest` → test-writer — Fix failing tests or update test expectations to match implementation
- Example: `code review` → code-reviewer — Re-review and fix remaining quality issues
- `test-cases.md` → test-writer — Generate the missing test case catalog
- `test-results/summary.md` → test-writer — Generate the missing test summary report
- `unit-results` → test-writer — Re-run tests and save results to `docs/test-results/unit/`
- `unit-results.json` → test-writer — Configure test runner JSON output and re-run tests
- `screenshots` → test-writer — Capture missing page screenshots via Playwright
- `broken link` → docs-writer — Create missing documentation files referenced in indexes
- `missing env-setup` → docs-writer — Create docs/env-setup.md with all env vars from .env*
- `missing architecture` → docs-writer — Create docs/architecture.md with Mermaid diagram
- `missing troubleshooting` → docs-writer — Create docs/troubleshooting.md with common issues
- `infra verify` → builder — Fix failing infrastructure connection (DB, auth, external service)
- `E2E smoke` → test-writer — Fix E2E smoke test or the underlying issue it exposes
- `runtime` → builder — Fix runtime errors caught by real server validation

## Notes
<optional additional context, considerations, or dependencies. If new libraries are needed, specify using `uv add`>
```

## Report

After creating and saving the implementation plan, provide a concise report with the following format:

```
✅ Implementation Plan Created

File: PLAN_OUTPUT_DIRECTORY/<filename>.md
Topic: <brief description of what the plan covers>
Key Components:
- <main component 1>
- <main component 2>
- <main component 3>

Team Task List:
- <list of tasks, and owner (concise)>

Team members:
- <list of team members and their roles (concise)>

When you're ready, you can execute the plan in a new agent by running:
/cook <replace with path to plan>
```
