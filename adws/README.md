# AI Developer Workflows (ADWs)

## Overview

The `adws/` directory contains the **AI Developer Workflows** - the highest level of abstraction in the agentic layer. These are executable Python scripts that orchestrate Claude Code agents to perform complex development tasks on your application layer (`apps/*`).

ADWs compose prompts from `.claude/commands/*.md` templates and execute them through the Claude Code CLI, providing a programmatic interface for agentic coding workflows.

## Multi-Agent Task System for Parallel Experimentation

This system is specifically designed for **data science and research engineers** who need to run multiple experiments in parallel. By leveraging git worktrees and multi-agent orchestration, teams can:

- **Parallelize ML experiments** across different model architectures
- **Test multiple data preprocessing approaches** simultaneously
- **Explore feature engineering variations** without blocking each other
- **Run A/B testing on different algorithms** in isolated environments

## Git Worktree Task Management

### How `tasks.md` Works

The central task file (`tasks.md`) organizes work by git worktree, enabling parallel development streams:

```markdown
## Git Worktree enhance-model-performance
[] Implement cross-validation for sentiment classifier    # Pending task
[] Add feature engineering for tweet metadata              # Will run in parallel
[⏰] Create ensemble model {opus, adw_plan_implement}      # Blocked until above complete

## Git Worktree add-data-validation
[] Create data quality validator at utils/validate.py      # Different branch, runs parallel
```

### Task Processing with Git Worktrees

1. **Worktree Creation** (`adw_modules/utils.py`)
   - Automatically creates git worktrees for each task group
   - Isolates experiments in separate working directories
   - Enables truly parallel development without conflicts

2. **Task Orchestration** (`adw_triggers/adw_trigger_cron_todone.py`)
   - Scans `tasks.md` using `/process_tasks` command
   - Spawns subprocess for each eligible task
   - Tracks ADW IDs for monitoring and status updates

3. **Workflow Selection** (`adw_modules/data_models.py::TaskInfo`)
   - Default: `adw_build_update_task.py` for simple tasks
   - Complex: `adw_plan_implement_update_task.py` when tagged
   - Model selection: `{opus}` tag for advanced reasoning

## Architecture

```
adws/
   README.md                          # This file
   adw_prompt.py                     # Direct prompt execution
   adw_slash_command.py              # Slash command execution
   adw_build_update_task.py          # Simple task workflow (build → update)
   adw_plan_implement_update_task.py # Complex task workflow (plan → implement → update)
   adw_triggers/
       adw_trigger_cron_todone.py    # Multi-agent orchestrator
   adw_modules/
       agent.py                      # Core Claude Code execution
       data_models.py                # TaskInfo, TaskStatus, WorkflowConfig
       utils.py                      # Status panels, ADW ID generation
```

### Task Workflow Files

#### `adw_build_update_task.py`
Handles simple development tasks with two phases:
1. **Build Phase**: Executes `/build` command with task description
2. **Update Phase**: Updates `tasks.md` with success/failure status

Best for: Adding rows to CSV, creating filtered datasets, simple refactors

#### `adw_plan_implement_update_task.py`
Handles complex tasks requiring planning:
1. **Plan Phase**: Creates detailed implementation plan using `/plan`
2. **Implement Phase**: Executes plan with `/implement`
3. **Update Phase**: Updates task status with commit hash or error

Best for: ML model development, architectural changes, complex features

#### `adw_trigger_cron_todone.py`
The orchestration engine that:
- Monitors `tasks.md` every N seconds
- Respects task dependencies (`[⏰]` blocked tasks)
- Spawns parallel agents for different worktrees
- Routes tasks to appropriate workflows based on tags
- Tracks all spawned processes with ADW IDs

## Panel-Based Status Updates

All workflows now use **timestamped panels** instead of spinning status indicators for clean multi-agent output:

```
┌─[14:23:45] | abc123 | feature-auth | build─────────────────┐
│ 🔄 Starting build process                                   │
└──────────────────────────────────────────────────────────────┘

┌─[14:23:52] | abc123 | feature-auth | build─────────────────┐
│ ✅ Completed build process                                  │
└──────────────────────────────────────────────────────────────┘
```

Benefits:
- No overlapping output when multiple agents run
- Clear ADW ID and worktree tracking
- Chronological event ordering
- Clean visual hierarchy

## Key Components

### 1. Core Module: `agent.py`

The foundation module that provides:
- **AgentPromptRequest/Response**: Data models for prompt execution
- **AgentTemplateRequest**: Data model for slash command execution
- **prompt_claude_code()**: Direct Claude Code CLI execution
- **prompt_claude_code_with_retry()**: Execution with automatic retry logic
- **execute_template()**: Slash command template execution
- **Environment management**: Safe subprocess environment handling
- **Output parsing**: JSONL to JSON conversion and result extraction

### 2. Direct Prompt Execution: `adw_prompt.py`

Execute adhoc Claude Code prompts from the command line.

**Usage:**
```bash
# Direct execution (requires uv)
./adws/adw_prompt.py "Write a hello world Python script"

# With specific model
./adws/adw_prompt.py "Explain this code" --model opus

# From different directory
./adws/adw_prompt.py "List files here" --working-dir /path/to/project
```

**Features:**
- Direct prompt execution without templates
- Configurable models (sonnet/opus)
- Custom output paths
- Automatic retry on failure
- Rich console output with progress indicators

### 3. Slash Command Execution: `adw_slash_command.py`

Execute predefined slash commands from `.claude/commands/*.md` templates.

**Usage:**
```bash
# Run a slash command
./adws/adw_slash_command.py /chore "Add logging to agent.py"

# With arguments
./adws/adw_slash_command.py /implement specs/feature.md

# Start a new session
./adws/adw_slash_command.py /start
```

**Available Commands:**
- `/chore` - Create implementation plans
- `/implement` - Execute implementation plans
- `/prime` - Prime the agent with context
- `/start` - Start a new agent session

### 4. Compound Workflow: `adw_chore_implement.py`

Orchestrates a two-phase workflow: planning (/chore) followed by implementation (/implement).

**Usage:**
```bash
# Plan and implement a feature
./adws/adw_chore_implement.py "Add error handling to all API endpoints"

# With specific model
./adws/adw_chore_implement.py "Refactor database logic" --model opus
```

**Workflow Phases:**
1. **Planning Phase**: Executes `/chore` to create a detailed plan
2. **Implementation Phase**: Automatically executes `/implement` with the generated plan

## SDK-Based ADWs

In addition to subprocess-based execution, ADWs now support the Claude Code Python SDK for better type safety and native async/await patterns.

### SDK Module: `agent_sdk.py`

The SDK module provides idiomatic patterns for using the Claude Code Python SDK:
- **Simple queries** - `simple_query()` for basic text responses  
- **Tool-enabled queries** - `query_with_tools()` for operations requiring tools
- **Interactive sessions** - `create_session()` context manager for conversations
- **Error handling** - `safe_query()` with SDK-specific exception handling

### SDK Execution: `adw_sdk_prompt.py`

Execute Claude Code using the Python SDK instead of subprocess.

**Usage:**
```bash
# One-shot query
./adws/adw_sdk_prompt.py "Write a hello world Python script"

# Interactive session  
./adws/adw_sdk_prompt.py --interactive

# With tools
./adws/adw_sdk_prompt.py "Create hello.py" --tools Write,Read

# Interactive with context
./adws/adw_sdk_prompt.py --interactive --context "Debugging a memory leak"
```

### SDK vs Subprocess

| Feature | Subprocess (agent.py) | SDK (agent_sdk.py) |
|---------|----------------------|-------------------|
| Type Safety | Basic dictionaries | Typed message objects |
| Error Handling | Generic exceptions | SDK-specific exceptions |
| Async Support | Subprocess management | Native async/await |
| Interactive Sessions | Not supported | ClaudeSDKClient |

## Output Structure

All ADWs generate structured output in the `agents/` directory:

```
agents/
   {adw_id}/                   # Unique 8-character ID per execution
       {agent_name}/            # Agent-specific outputs
          cc_raw_output.jsonl  # Raw streaming output
          cc_raw_output.json   # Parsed JSON array
          cc_final_object.json # Final result object
          custom_summary_output.json # High-level summary
       workflow_summary.json    # Overall workflow summary (compound workflows)
```

## Data Flow

1. **Input**: User provides prompt/command + arguments
2. **Template Composition**: ADW loads slash command template from `.claude/commands/`
3. **Execution**: Claude Code CLI processes the prompt
4. **Output Parsing**: JSONL stream parsed into structured JSON
5. **Result Storage**: Multiple output formats saved for analysis

## Key Features

### Retry Logic
- Automatic retry for transient failures
- Configurable retry attempts and delays
- Different retry codes for various error types

### Environment Safety
- Filtered environment variables for subprocess execution
- Only passes required variables (API keys, paths, etc.)
- Prevents environment variable leakage

### Rich Console UI
- Progress indicators during execution
- Colored output panels for success/failure
- Structured tables showing inputs and outputs
- File path listings for generated outputs

### Session Tracking
- Unique ADW IDs for each execution
- Session IDs from Claude Code for debugging
- Comprehensive logging and output capture

## Best Practices

1. **Use the Right Tool**:
   - `adw_prompt.py` for one-off tasks
   - `adw_slash_command.py` for templated operations
   - `adw_chore_implement.py` for complex features
   - `adw_sdk_prompt.py` for type-safe SDK operations or interactive sessions

2. **Model Selection**:
   - Use `sonnet` (default) for most tasks
   - Use `opus` for complex reasoning or large codebases

3. **Working Directory**:
   - Always specify `--working-dir` when operating on different projects
   - ADWs respect `.mcp.json` configuration in working directories

4. **Output Analysis**:
   - Check `custom_summary_output.json` for high-level results
   - Use `cc_final_object.json` for the final agent response
   - Review `cc_raw_output.jsonl` for debugging

## Integration Points

- **Slash Commands**: Defined in `.claude/commands/*.md`
- **Application Layer**: Operates on code in `apps/*`
- **Specifications**: Can implement plans from `specs/*`
- **AI Documentation**: May reference `ai_docs/*` for context

## Error Handling

ADWs implement robust error handling:
- Installation checks for Claude Code CLI
- Timeout protection (5-minute default)
- Graceful failure with informative error messages
- Retry codes for different failure types
- Output truncation to prevent console flooding

---

The ADW layer represents the pinnacle of abstraction in agentic coding, turning high-level developer intentions into executed code changes through intelligent agent orchestration.