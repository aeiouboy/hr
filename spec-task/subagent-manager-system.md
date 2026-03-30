# SubAgent Manager System Specification

## 1. Task Overview

### Objective
Build an intelligent **SubAgent Manager** system that orchestrates Claude Code subprocesses to handle complex, multi-step development tasks without hitting context limits. The system decomposes large tasks into discrete subtasks, spawns specialized child agents, aggregates results, and iterates until all work is complete.

### Scope

**Inclusions:**
- Native Claude Code subagent integration via `.claude/agents/` markdown files
- Task decomposition engine to break complex tasks into atomic units
- Parallel subagent orchestration for independent subtasks
- Context-aware work distribution to prevent "Context low (0% remaining)" errors
- Result aggregation and synthesis from multiple subagents
- Iterative execution loop with progress tracking
- Auto-compaction support and subagent resumption
- Integration with existing ADW (AI Developer Workflows) infrastructure

**Exclusions:**
- Changes to core Claude Code CLI behavior
- External API integrations beyond Claude Code
- Real-time collaborative editing
- UI/frontend components (CLI-only)

### Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Context Limit Avoidance | 0 "Context low" errors during task execution | Monitor session logs |
| Task Completion Rate | 95%+ tasks complete successfully | Track success/failure ratios |
| Parallel Efficiency | 3x faster for parallelizable tasks | Compare sequential vs parallel timing |
| Subagent Overhead | <5 seconds per spawn | Measure spawn-to-ready latency |
| Result Accuracy | 100% aggregation fidelity | Verify no lost outputs |

### Stakeholders

| Role | Responsibility |
|------|----------------|
| **Owner** | ADW System Maintainer |
| **Contributors** | Development Team |
| **Reviewers** | Senior Engineers |
| **Approvers** | Technical Lead |

---

## 2. Requirements Analysis

### Functional Requirements

#### FR-1: Task Decomposition Engine
- **FR-1.1**: Parse complex task descriptions into atomic subtasks
- **FR-1.2**: Identify dependencies between subtasks (DAG construction)
- **FR-1.3**: Estimate context cost per subtask (token estimation)
- **FR-1.4**: Support manual task override/refinement

#### FR-2: Subagent Lifecycle Management
- **FR-2.1**: Create subagent definitions programmatically
- **FR-2.2**: Spawn subagents in foreground or background mode
- **FR-2.3**: Monitor subagent health and progress
- **FR-2.4**: Resume interrupted subagents with preserved context
- **FR-2.5**: Terminate unresponsive or erroring subagents

#### FR-3: Work Distribution
- **FR-3.1**: Assign subtasks to appropriate subagent types
- **FR-3.2**: Execute independent subtasks in parallel
- **FR-3.3**: Respect dependency ordering for sequential tasks
- **FR-3.4**: Load balance across available resources

#### FR-4: Result Aggregation
- **FR-4.1**: Collect outputs from all subagents
- **FR-4.2**: Merge code changes from parallel branches
- **FR-4.3**: Synthesize summary reports
- **FR-4.4**: Handle conflicting outputs gracefully

#### FR-5: Iteration Control
- **FR-5.1**: Validate subtask completion
- **FR-5.2**: Retry failed subtasks with backoff
- **FR-5.3**: Spawn follow-up subagents for remaining work
- **FR-5.4**: Detect convergence (all work done)

### Non-Functional Requirements

#### NFR-1: Performance
- Subagent spawn time: <5 seconds
- Result aggregation: <10 seconds for 10 subagent outputs
- Memory footprint: <500MB for orchestrator

#### NFR-2: Reliability
- Graceful handling of subagent failures
- Checkpoint/resume capability for long-running tasks
- No data loss on interruption

#### NFR-3: Maintainability
- Clear separation of concerns (decomposition, orchestration, aggregation)
- Comprehensive logging for debugging
- Test coverage >80%

#### NFR-4: Extensibility
- Plugin architecture for custom subagent types
- Configurable decomposition strategies
- Hook system for workflow customization

### Constraints

| Type | Constraint |
|------|------------|
| **Technical** | Must use Claude Code CLI subprocess model |
| **Technical** | Subagents cannot spawn other subagents (Claude Code limitation) |
| **Resource** | Limited by Claude API rate limits |
| **Environment** | Requires git for worktree management |

### Assumptions

1. Claude Code CLI is installed and configured
2. ANTHROPIC_API_KEY is set in environment
3. Sufficient disk space for agent outputs
4. git is available for branch/worktree operations

### Dependencies

| Dependency | Purpose |
|------------|---------|
| Claude Code CLI | Subagent execution |
| Python 3.10+ | Orchestrator runtime |
| Pydantic | Data validation |
| Rich | Console output |
| git | Worktree management |

---

## 3. Technical Specification

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    SubAgent Manager System                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │ Task Decomposer │───▶│  Orchestrator   │───▶│ Aggregator  │ │
│  │                 │    │                 │    │             │ │
│  │ - Parse task    │    │ - Spawn agents  │    │ - Collect   │ │
│  │ - Build DAG     │    │ - Monitor       │    │ - Merge     │ │
│  │ - Estimate cost │    │ - Resume        │    │ - Report    │ │
│  └─────────────────┘    └────────┬────────┘    └─────────────┘ │
│                                  │                              │
│                    ┌─────────────┴─────────────┐               │
│                    ▼                           ▼               │
│           ┌───────────────┐           ┌───────────────┐        │
│           │  Subagent A   │           │  Subagent B   │        │
│           │  (Explorer)   │           │  (Builder)    │        │
│           └───────────────┘           └───────────────┘        │
│                    │                           │                │
│                    └───────────┬───────────────┘               │
│                                ▼                                │
│                    ┌───────────────────┐                       │
│                    │  Result Store     │                       │
│                    │  (agents/{id}/)   │                       │
│                    └───────────────────┘                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Components & Modules

#### 3.1 Core Modules

| Module | File | Responsibility |
|--------|------|----------------|
| `TaskDecomposer` | `adws/adw_modules/decomposer.py` | Parse and decompose complex tasks |
| `SubagentOrchestrator` | `adws/adw_modules/orchestrator.py` | Manage subagent lifecycle |
| `ResultAggregator` | `adws/adw_modules/aggregator.py` | Collect and merge outputs |
| `ContextMonitor` | `adws/adw_modules/context_monitor.py` | Track context usage |
| `SubagentRegistry` | `adws/adw_modules/registry.py` | Manage subagent definitions |

#### 3.2 Subagent Definitions

Located in `.claude/agents/`:

```
.claude/agents/
├── explorer.md          # Read-only codebase exploration
├── planner.md           # Task planning and breakdown
├── implementer.md       # Code implementation
├── tester.md            # Test writing and execution
├── reviewer.md          # Code review
├── fixer.md             # Bug fixing and error resolution
└── synthesizer.md       # Result aggregation and reporting
```

#### 3.3 Workflow Scripts

| Script | Purpose |
|--------|---------|
| `adw_subagent_orchestrate.py` | Main orchestrator entry point |
| `adw_decompose_task.py` | Standalone task decomposition |
| `adw_aggregate_results.py` | Standalone result aggregation |

### Interfaces & APIs

#### SubagentConfig (Dataclass)
```python
@dataclass
class SubagentConfig:
    name: str                          # Unique identifier
    description: str                   # When to use this subagent
    tools: List[str]                   # Allowed tools
    model: Literal["sonnet", "opus", "haiku", "inherit"]
    permission_mode: str = "default"   # Permission handling
    skills: List[str] = field(default_factory=list)
    hooks: Dict[str, Any] = field(default_factory=dict)
```

#### TaskNode (Dataclass)
```python
@dataclass
class TaskNode:
    id: str                            # Unique task ID
    description: str                   # What to do
    subagent_type: str                 # Which subagent to use
    dependencies: List[str]            # Task IDs that must complete first
    estimated_tokens: int              # Context cost estimate
    status: TaskStatus                 # pending/running/completed/failed
    result: Optional[str] = None       # Output when complete
    agent_id: Optional[str] = None     # For resumption
```

#### OrchestratorAPI
```python
class SubagentOrchestrator:
    def decompose(self, task: str) -> List[TaskNode]:
        """Break complex task into subtasks."""

    def spawn(self, task: TaskNode, background: bool = False) -> str:
        """Spawn subagent, return agent ID."""

    def monitor(self, agent_id: str) -> SubagentStatus:
        """Check subagent progress."""

    def resume(self, agent_id: str) -> str:
        """Resume interrupted subagent."""

    def collect(self, agent_ids: List[str]) -> List[TaskResult]:
        """Gather outputs from completed subagents."""

    def execute(self, task: str) -> WorkflowResult:
        """Full orchestration loop until completion."""
```

### Data Structures & Models

#### Task Dependency Graph (DAG)
```python
class TaskDAG:
    nodes: Dict[str, TaskNode]         # task_id -> TaskNode
    edges: Dict[str, List[str]]        # task_id -> [dependent_task_ids]

    def get_ready_tasks(self) -> List[TaskNode]:
        """Return tasks with all dependencies satisfied."""

    def mark_complete(self, task_id: str, result: str):
        """Update task status and unlock dependents."""

    def is_complete(self) -> bool:
        """Check if all tasks are done."""
```

#### Subagent Transcript
```jsonc
// Located at: agents/{adw_id}/{agent_name}/transcript.jsonl
{
  "type": "system",
  "subtype": "spawn",
  "agent_type": "implementer",
  "task_id": "task-001",
  "timestamp": "2026-01-10T17:30:00Z"
}
{
  "type": "result",
  "success": true,
  "output": "Implemented feature X",
  "duration_ms": 45000,
  "tokens_used": 12500
}
```

### Tools & Technologies

| Category | Technology | Justification |
|----------|------------|---------------|
| **Runtime** | Python 3.10+ | Existing ADW infrastructure |
| **CLI Framework** | Click | Argument parsing |
| **Data Validation** | Pydantic | Type safety |
| **Console UI** | Rich | Status panels |
| **Async** | asyncio | Parallel subagent management |
| **Subprocess** | subprocess | Claude Code invocation |
| **Serialization** | JSON/JSONL | Output format |

---

## 4. Implementation Plan

### Phase 1: Foundation & Setup

**Milestone**: Core infrastructure ready

#### Backend Tasks

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Create module structure | Set up `adws/adw_modules/` directory structure | Dev | 1 unit |
| Define data models | Implement `TaskNode`, `SubagentConfig`, `TaskDAG` in Pydantic | Dev | 2 units |
| Create subagent definitions | Write `.claude/agents/*.md` files for each subagent type | Dev | 2 units |
| Implement registry | Build `SubagentRegistry` for loading/managing subagent configs | Dev | 2 units |

#### Infrastructure Tasks

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Add test directory | Create `tests/test_subagent_manager/` | Dev | 0.5 unit |
| Configure logging | Set up structured logging for debugging | Dev | 0.5 unit |

### Phase 2: Core Feature Implementation

**Milestone**: Basic orchestration working

#### Task Decomposer

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Implement decomposition logic | Parse task descriptions, identify atomic units | Dev | 3 units |
| Build DAG constructor | Create dependency graph from subtasks | Dev | 2 units |
| Add token estimator | Estimate context cost per subtask | Dev | 2 units |
| Integrate with Claude | Use Claude to help decompose complex tasks | Dev | 2 units |

#### Subagent Orchestrator

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Implement spawn logic | Spawn subagents via Claude Code CLI | Dev | 3 units |
| Add foreground/background support | Handle both execution modes | Dev | 2 units |
| Implement monitoring | Track subagent progress and health | Dev | 2 units |
| Add resumption support | Resume interrupted subagents | Dev | 2 units |

#### Result Aggregator

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Implement collection | Gather outputs from subagent transcripts | Dev | 2 units |
| Add merge logic | Combine results from parallel branches | Dev | 2 units |
| Build synthesis | Generate summary reports | Dev | 2 units |

### Phase 3: Integration & Optimization

**Milestone**: Full workflow operational

#### Integration

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Create main orchestrator script | `adw_subagent_orchestrate.py` entry point | Dev | 2 units |
| Integrate with existing ADWs | Hook into `adw_plan_implement_update_task.py` | Dev | 3 units |
| Add context monitoring | Prevent context overflow during execution | Dev | 2 units |
| Implement iteration loop | Retry failed tasks, spawn follow-ups | Dev | 3 units |

#### Optimization

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Parallel execution | Run independent subtasks concurrently | Dev | 2 units |
| Auto-compaction handling | Gracefully handle subagent compaction events | Dev | 2 units |
| Performance tuning | Optimize spawn latency and aggregation speed | Dev | 2 units |

### Phase 4: Testing, Hardening, Deployment

**Milestone**: Production ready

#### QA/Testing

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Unit tests | Test individual components | Dev | 3 units |
| Integration tests | Test full workflow | Dev | 3 units |
| Stress tests | Large task decomposition, many subagents | Dev | 2 units |
| Edge case tests | Context limits, failures, resumption | Dev | 2 units |

#### Documentation

| Task | Description | Owner | Estimate |
|------|-------------|-------|----------|
| Update CLAUDE.md | Document new subagent manager | Dev | 1 unit |
| Create usage guide | How to use the orchestrator | Dev | 1 unit |
| Add inline comments | Code documentation | Dev | 1 unit |

---

## 5. Quality Assurance

### Testing Strategy

#### Unit Tests
```python
# tests/test_subagent_manager/test_decomposer.py
def test_decompose_simple_task():
    """Single task should not be decomposed."""

def test_decompose_complex_task():
    """Multi-step task should produce multiple nodes."""

def test_dag_construction():
    """Dependencies should be correctly identified."""
```

#### Integration Tests
```python
# tests/test_subagent_manager/test_orchestrator.py
def test_full_workflow():
    """Complete task decomposition, execution, aggregation."""

def test_parallel_execution():
    """Independent tasks run concurrently."""

def test_failure_recovery():
    """Failed subtasks are retried."""
```

#### E2E Tests
```bash
# Run full orchestration on sample task
./adws/adw_subagent_orchestrate.py \
  --task "Add user authentication with JWT tokens, password hashing, and session management" \
  --model sonnet \
  --verbose
```

### Validation Methods

| Requirement | Test Type | Acceptance Criteria |
|-------------|-----------|---------------------|
| FR-1 | Unit | Tasks decomposed into ≥2 subtasks for complex inputs |
| FR-2 | Integration | Subagents spawn and complete within 5 minutes |
| FR-3 | Integration | Parallel tasks execute concurrently |
| FR-4 | Unit | All subagent outputs collected |
| FR-5 | E2E | Workflow iterates until all tasks complete |

### Performance Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Spawn latency | <5s | >10s |
| Aggregation time | <10s | >30s |
| Context usage | <80% | >90% |
| Success rate | >95% | <80% |

### Monitoring & Logging

```python
# Structured logging format
{
    "timestamp": "2026-01-10T17:30:00Z",
    "level": "INFO",
    "component": "orchestrator",
    "action": "spawn_subagent",
    "task_id": "task-001",
    "agent_type": "implementer",
    "duration_ms": 1234
}
```

### Test-Driven Development

1. Write test for task decomposition BEFORE implementing decomposer
2. Write test for subagent spawning BEFORE implementing orchestrator
3. Write test for result aggregation BEFORE implementing aggregator
4. All PRs must include tests for new functionality

---

## 6. Risk Assessment

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Claude Code CLI changes | High | Medium | Pin CLI version, monitor releases |
| Context limits still hit | High | Medium | Conservative token estimates, chunking |
| Subagent spawn failures | Medium | Low | Retry with exponential backoff |
| Result merge conflicts | Medium | Medium | Git-based conflict resolution |
| Rate limiting | Medium | Medium | Request throttling, queue management |

### Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Increased API costs | Medium | High | Token budgets, cost monitoring |
| Slower than sequential | Medium | Low | Benchmark and optimize |
| Learning curve | Low | Medium | Documentation, examples |

### Mitigation Strategies

1. **Context Overflow Prevention**
   - Estimate tokens before spawning
   - Set conservative limits (80% max)
   - Use haiku for simple tasks

2. **Failure Recovery**
   - Checkpoint after each subtask
   - Retry failed subagents 3x
   - Resume from last checkpoint

3. **Cost Control**
   - Default to sonnet for most tasks
   - Only use opus for complex reasoning
   - Track and report token usage

### Fallback/Contingency Plans

1. **If parallel execution fails**: Fall back to sequential
2. **If decomposition fails**: Execute as single task
3. **If subagent unresponsive**: Kill after timeout, retry once
4. **If context limit hit**: Auto-compact and resume

---

## 7. Documentation Requirements

### User Documentation

| Document | Content |
|----------|---------|
| Quick Start | 5-minute tutorial to run first orchestration |
| Configuration Guide | Subagent definitions, hooks, permissions |
| Troubleshooting | Common errors and solutions |

### Technical Documentation

| Document | Content |
|----------|---------|
| Architecture Diagram | System components and data flow |
| API Reference | All public methods and data models |
| Subagent Specification | Each subagent's purpose and configuration |

### Code Documentation

```python
def spawn(self, task: TaskNode, background: bool = False) -> str:
    """Spawn a subagent to execute the given task.

    Creates a new subagent process using Claude Code CLI,
    configured according to the task's subagent_type.

    Args:
        task: The TaskNode describing what to execute
        background: If True, run without blocking

    Returns:
        Agent ID that can be used for monitoring/resumption

    Raises:
        SubagentSpawnError: If spawning fails after retries

    Example:
        >>> agent_id = orchestrator.spawn(task, background=True)
        >>> status = orchestrator.monitor(agent_id)
    """
```

---

## 8. Deliverables

### Primary Deliverables

| Deliverable | Description | Format |
|-------------|-------------|--------|
| Subagent definitions | `.claude/agents/*.md` files | Markdown |
| Core modules | Python implementation | Python |
| Orchestrator script | Entry point CLI | Python |
| Tests | Unit and integration tests | Python |

### Supporting Materials

| Material | Description |
|----------|-------------|
| Configuration templates | Example configs for common workflows |
| Sample tasks | Test cases for validation |
| Log parsers | Scripts to analyze execution logs |

### Acceptance Criteria

| Criterion | Verification Method |
|-----------|---------------------|
| All tests pass | CI/CD pipeline |
| Documentation complete | Review checklist |
| Performance targets met | Benchmark results |
| No context limit errors | Execution logs |

### Review & Sign-Off

| Reviewer | Approval Criteria |
|----------|-------------------|
| Tech Lead | Architecture approved |
| QA Engineer | Tests adequate |
| DevOps | Integration verified |

---

## 9. Governance & Compliance

### Standards & Best Practices

| Standard | Application |
|----------|-------------|
| PEP 8 | Python code style |
| Type hints | All public APIs |
| Docstrings | All public functions |
| Semantic versioning | Release management |

### Compliance Requirements

- Audit logging for all subagent executions
- Secure handling of API keys
- No sensitive data in logs

### Change Management

1. All changes via pull request
2. Tests must pass before merge
3. Breaking changes require version bump
4. Documentation updated with code

---

## Appendix A: Subagent Definitions

### Explorer Subagent
```markdown
---
name: explorer
description: Read-only codebase exploration. Use for finding files, understanding structure, and gathering context.
tools: Read, Glob, Grep
model: haiku
permissionMode: plan
---

You are a codebase explorer. Your job is to:
1. Find relevant files for the given task
2. Understand code structure and patterns
3. Report findings in a structured format

Never modify files. Only read and report.
```

### Implementer Subagent
```markdown
---
name: implementer
description: Code implementation specialist. Use for writing new code and modifying existing files.
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
permissionMode: acceptEdits
---

You are a code implementer. Your job is to:
1. Implement the specified feature or fix
2. Follow existing code patterns
3. Write clean, maintainable code
4. Report what you changed

Focus on minimal, targeted changes.
```

### Synthesizer Subagent
```markdown
---
name: synthesizer
description: Result aggregation and reporting. Use to combine outputs from multiple subagents.
tools: Read, Glob, Grep
model: sonnet
---

You are a result synthesizer. Your job is to:
1. Read outputs from multiple subagents
2. Identify key accomplishments and issues
3. Produce a unified summary report
4. Highlight any conflicts or gaps

Present information clearly and concisely.
```

---

## Appendix B: Example Usage

### Basic Orchestration
```bash
# Decompose and execute a complex task
./adws/adw_subagent_orchestrate.py \
  --task "Add user authentication with JWT, password hashing, and session management" \
  --model sonnet \
  --parallel \
  --verbose
```

### With Custom Decomposition
```bash
# Provide explicit subtasks
./adws/adw_subagent_orchestrate.py \
  --subtasks subtasks.json \
  --model sonnet
```

### Monitor Running Workflow
```bash
# Check status of orchestration
./adws/adw_subagent_orchestrate.py --status --adw-id abc12345
```

---

## Appendix C: Token Estimation Heuristics

| Task Type | Estimated Tokens | Subagent |
|-----------|------------------|----------|
| File search | 2,000 | explorer (haiku) |
| Single file edit | 5,000 | implementer (sonnet) |
| Multi-file feature | 15,000 | implementer (sonnet) |
| Complex refactor | 30,000 | implementer (opus) |
| Test writing | 10,000 | tester (sonnet) |
| Code review | 8,000 | reviewer (sonnet) |

**Context Budget Strategy:**
- Reserve 20% for orchestrator overhead
- Set soft limit at 70% capacity
- Trigger subtask split at 80%
- Auto-compact at 90%

---

*Generated: 2026-01-10*
*Version: 1.0.0*
*Status: Draft*
