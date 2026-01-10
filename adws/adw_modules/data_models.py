"""
Data models for the multi-agent task list architecture.

These models define the structure for tasks, worktrees, and workflow states
used throughout the ToDone system.
"""

from typing import List, Optional, Literal
from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field, validator


class SystemTag(str, Enum):
    """System-defined tags that control task execution behavior."""

    # Workflow selection tags
    PLAN_IMPLEMENT_UPDATE = "adw_plan_implement_update_task"

    # Model selection tags
    OPUS = "opus"
    SONNET = "sonnet"

    @classmethod
    def get_workflow_tags(cls) -> List[str]:
        """Get all workflow-related tags."""
        return [cls.PLAN_IMPLEMENT_UPDATE]

    @classmethod
    def get_model_tags(cls) -> List[str]:
        """Get all model-related tags."""
        return [cls.OPUS, cls.SONNET]

    @classmethod
    def extract_model_from_tags(cls, tags: List[str]) -> Optional[str]:
        """Extract the model to use from tags.

        Priority: opus > sonnet > default (None)
        """
        if cls.OPUS in tags:
            return "opus"
        elif cls.SONNET in tags:
            return "sonnet"
        return None

    @classmethod
    def extract_workflow_from_tags(cls, tags: List[str]) -> bool:
        """Check if full workflow should be used based on tags."""
        return cls.PLAN_IMPLEMENT_UPDATE in tags


class Task(BaseModel):
    """Represents a single task in the task list."""

    description: str = Field(..., description="The task description")
    status: Literal["[]", "[⏰]", "[🟡]", "[✅]", "[❌]"] = Field(
        default="[]", description="Current status of the task"
    )
    adw_id: Optional[str] = Field(
        None, description="ADW ID assigned when task is picked up"
    )
    commit_hash: Optional[str] = Field(
        None, description="Git commit hash when task is completed"
    )
    tags: List[str] = Field(
        default_factory=list, description="Optional tags for the task"
    )
    worktree_name: Optional[str] = Field(
        None, description="Associated git worktree name"
    )

    @validator("status")
    def validate_status(cls, v):
        """Ensure status is one of the valid values."""
        valid_statuses = ["[]", "[⏰]", "[🟡]", "[✅]", "[❌]"]
        if v not in valid_statuses:
            raise ValueError(f"Status must be one of {valid_statuses}")
        return v

    def is_eligible_for_pickup(self) -> bool:
        """Check if task can be picked up by an agent."""
        return self.status in ["[]", "[⏰]"]

    def is_completed(self) -> bool:
        """Check if task is in a terminal state."""
        return self.status in ["[✅]", "[❌]"]


class Worktree(BaseModel):
    """Represents a git worktree section in the task list."""

    name: str = Field(..., description="Name of the git worktree")
    tasks: List[Task] = Field(
        default_factory=list, description="Tasks in this worktree"
    )

    def get_eligible_tasks(self) -> List[Task]:
        """Get all tasks eligible for pickup, considering blocking rules."""
        eligible = []

        for i, task in enumerate(self.tasks):
            if task.status == "[]":
                # Non-blocked tasks are always eligible
                eligible.append(task)
            elif task.status == "[⏰]":
                # Blocked tasks are eligible only if all tasks above are successful
                all_above_successful = all(t.status == "[✅]" for t in self.tasks[:i])
                if all_above_successful:
                    eligible.append(task)

        return eligible


class TaskToStart(BaseModel):
    """Task ready to be started by an agent."""

    description: str = Field(..., description="The task description")
    tags: List[str] = Field(
        default_factory=list, description="Optional tags for the task"
    )


class WorktreeTaskGroup(BaseModel):
    """Groups tasks by worktree for processing."""

    worktree_name: str = Field(..., description="Name of the git worktree")
    tasks_to_start: List[TaskToStart] = Field(
        ..., description="Tasks ready to be started in this worktree"
    )


class ProcessTasksResponse(BaseModel):
    """Response from the /process_tasks command."""

    task_groups: List[WorktreeTaskGroup] = Field(
        default_factory=list, description="Tasks grouped by worktree"
    )

    def has_tasks(self) -> bool:
        """Check if there are any tasks to process."""
        return any(len(group.tasks_to_start) > 0 for group in self.task_groups)


class TaskUpdate(BaseModel):
    """Update information for a task after agent processing."""

    adw_id: str = Field(..., description="ADW ID of the task")
    status: Literal["[✅]", "[❌]"] = Field(..., description="Final status of the task")
    commit_hash: Optional[str] = Field(
        None, description="Git commit hash if successful"
    )
    error_message: Optional[str] = Field(None, description="Error message if failed")
    worktree_name: str = Field(..., description="Worktree where task was executed")
    task_description: str = Field(..., description="Original task description")

    @validator("status")
    def validate_final_status(cls, v):
        """Ensure status is a terminal state."""
        if v not in ["[✅]", "[❌]"]:
            raise ValueError("Task update status must be either [✅] or [❌]")
        return v

    @validator("commit_hash")
    def validate_commit_hash(cls, v, values):
        """Ensure commit hash is provided for successful tasks."""
        if values.get("status") == "[✅]" and not v:
            raise ValueError("Commit hash is required for successful tasks")
        return v


class WorkflowState(BaseModel):
    """Tracks the state of a workflow execution."""

    adw_id: str = Field(..., description="Unique ADW ID for this workflow")
    worktree_name: str = Field(..., description="Git worktree name")
    task_description: str = Field(..., description="Task being processed")
    phase: Literal["planning", "implementing", "updating", "completed", "failed"] = (
        Field(..., description="Current phase of the workflow")
    )
    started_at: datetime = Field(
        default_factory=datetime.now, description="Workflow start time"
    )
    completed_at: Optional[datetime] = Field(
        None, description="Workflow completion time"
    )
    plan_path: Optional[str] = Field(None, description="Path to generated plan file")
    error: Optional[str] = Field(None, description="Error message if workflow failed")

    def mark_completed(self, success: bool = True, error: Optional[str] = None):
        """Mark workflow as completed."""
        self.completed_at = datetime.now()
        self.phase = "completed" if success else "failed"
        if error:
            self.error = error


class CronTriggerConfig(BaseModel):
    """Configuration for the cron trigger."""

    polling_interval: int = Field(
        default=5, ge=1, description="Polling interval in seconds"
    )
    dry_run: bool = Field(
        default=False, description="Run in dry-run mode without making changes"
    )
    max_concurrent_tasks: int = Field(
        default=5, ge=1, description="Maximum number of concurrent tasks to process"
    )
    task_file_path: str = Field(
        default="tasks.md", description="Path to the task list file"
    )
    worktree_base_path: str = Field(
        default="trees", description="Base directory for git worktrees"
    )


class WorktreeConfig(BaseModel):
    """Configuration for creating a new worktree."""

    worktree_name: str = Field(..., description="Name of the worktree to create")
    base_branch: str = Field(
        default="main", description="Base branch to create worktree from"
    )
    copy_env: bool = Field(
        default=True, description="Whether to copy .env file to worktree"
    )
