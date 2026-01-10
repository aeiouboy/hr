#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "pydantic",
#   "python-dotenv",
#   "click",
#   "rich",
#   "schedule",
# ]
# ///
"""
Cron trigger for the multi-agent task list system.

This script monitors the task list and automatically distributes tasks to agents.
It runs continuously, checking for eligible tasks at a configurable interval.

Usage:
    # Method 1: Direct execution (requires uv)
    ./adws/adw_triggers/adw_trigger_cron_todone.py

    # Method 2: Using uv run
    uv run adws/adw_triggers/adw_trigger_cron_todone.py

    # With custom polling interval (seconds)
    ./adws/adw_triggers/adw_trigger_cron_todone.py --interval 10

    # Dry run mode (no changes made)
    ./adws/adw_triggers/adw_trigger_cron_todone.py --dry-run

Examples:
    # Run with verbose output
    ./adws/adw_triggers/adw_trigger_cron_todone.py --verbose

    # Run with custom task file
    ./adws/adw_triggers/adw_trigger_cron_todone.py --task-file ../tasks.md

    # Run once and exit
    ./adws/adw_triggers/adw_trigger_cron_todone.py --once
"""

import os
import sys
import json
import time
import subprocess
import re
from pathlib import Path
from typing import List, Dict, Optional, Tuple
from datetime import datetime
import click
import schedule
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.live import Live
from rich.layout import Layout
from rich.align import Align

# Add the parent directory to the path so we can import modules
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parent_dir)
sys.path.insert(0, os.path.join(parent_dir, "adw_modules"))

from agent import (
    AgentTemplateRequest,
    execute_template,
    generate_short_id,
)

# Import our data models
from data_models import (
    Task,
    Worktree,
    WorktreeTaskGroup,
    ProcessTasksResponse,
    CronTriggerConfig,
    SystemTag,
)

# Import utility functions
from utils import parse_json

# Configuration constants
TARGET_DIRECTORY = "tac8_app2__multi_agent_todone"


class TaskListManager:
    """Manages reading and updating the task list file."""

    def __init__(self, file_path: str):
        self.file_path = Path(file_path)
        self.console = Console()

    def read_task_list(self) -> str:
        """Read the current task list file."""
        if not self.file_path.exists():
            raise FileNotFoundError(f"Task file not found: {self.file_path}")
        return self.file_path.read_text()

    def update_task_to_in_progress(
        self, worktree_name: str, task_desc: str, adw_id: str
    ) -> bool:
        """Update a task from [] or [⏰] to [🟡, adw_id] status using the /mark_in_progress command."""
        try:
            request = AgentTemplateRequest(
                agent_name="task-marker",
                slash_command="/mark_in_progress",
                args=[
                    str(self.file_path),  # task_file_path
                    worktree_name,
                    task_desc,
                    adw_id,
                ],
                adw_id=generate_short_id(),
                model="sonnet",
                working_dir=os.getcwd(),  # Run from project root
            )

            response = execute_template(request)
            if response.success:
                return True
            else:
                error_panel = Panel(
                    f"Failed to mark task as in-progress: {task_desc}",
                    title="[bold red]❌ Update Failed[/bold red]",
                    border_style="red",
                )
                self.console.print(error_panel)
                return False
        except Exception as e:
            error_panel = Panel(
                f"Error marking task as in-progress: {str(e)}",
                title="[bold red]❌ Update Error[/bold red]",
                border_style="red",
            )
            self.console.print(error_panel)
            return False

    def write_task_list(self, content: str):
        """Write updated content back to the task list file."""
        self.file_path.write_text(content)


class CronTrigger:
    """Main cron trigger implementation."""

    def __init__(self, config: CronTriggerConfig):
        self.config = config
        self.console = Console()
        self.task_manager = TaskListManager(config.task_file_path)
        self.running = True
        self.stats = {
            "checks": 0,
            "tasks_started": 0,
            "worktrees_created": 0,
            "errors": 0,
            "last_check": None,
        }

    def check_worktree_exists(self, worktree_name: str) -> bool:
        """Check if a worktree already exists."""
        worktree_path = Path(self.config.worktree_base_path) / worktree_name
        return worktree_path.exists()

    def create_worktree(self, worktree_name: str) -> bool:
        """Create a new worktree using the init_worktree command."""
        if self.config.dry_run:
            self.console.print(
                f"[yellow]DRY RUN: Would create worktree '{worktree_name}'[/yellow]"
            )
            return True

        try:
            request = AgentTemplateRequest(
                agent_name="worktree-creator",
                slash_command="/init_worktree",
                args=[worktree_name, TARGET_DIRECTORY],
                adw_id=generate_short_id(),
                model="sonnet",
                working_dir=os.getcwd(),
            )

            response = execute_template(request)
            if response.success:
                self.stats["worktrees_created"] += 1
                success_panel = Panel(
                    f"✓ Created worktree: {worktree_name}",
                    title="[bold green]Worktree Created[/bold green]",
                    border_style="green",
                )
                self.console.print(success_panel)
                return True
            else:
                error_panel = Panel(
                    f"Failed to create worktree: {worktree_name}",
                    title="[bold red]❌ Worktree Creation Failed[/bold red]",
                    border_style="red",
                )
                self.console.print(error_panel)
                self.stats["errors"] += 1
                return False
        except Exception as e:
            error_panel = Panel(
                f"Error creating worktree: {str(e)}",
                title="[bold red]❌ Worktree Creation Error[/bold red]",
                border_style="red",
            )
            self.console.print(error_panel)
            self.stats["errors"] += 1
            return False

    def get_eligible_tasks(self) -> List[WorktreeTaskGroup]:
        """Get eligible tasks by running the process_tasks command."""
        # First, check if there are any pending tasks in the file
        # to avoid unnecessary agent calls
        try:
            task_content = self.task_manager.read_task_list()

            # Look for patterns that indicate pending tasks: [] or [⏰]
            # Using regex to find these patterns
            pending_pattern = r"\[\s*\]|\[⏰\]"
            if not re.search(pending_pattern, task_content):
                # No pending tasks found, return empty list without calling agent
                return []
        except FileNotFoundError:
            # Task file doesn't exist, return empty list
            return []
        except Exception as e:
            # Error reading file, log it but continue to try the agent
            self.console.print(
                f"[yellow]Warning: Could not pre-check task file: {str(e)}[/yellow]"
            )

        # If we found pending tasks (or couldn't check), proceed with agent call
        try:
            request = AgentTemplateRequest(
                agent_name="task-processor",
                slash_command="/process_tasks",
                args=[],
                adw_id=generate_short_id(),
                model="sonnet",
                working_dir=os.getcwd(),
            )

            response = execute_template(request)
            if response.success:
                # Parse the JSON response using the utility function
                try:
                    # Use parse_json utility which handles markdown code blocks
                    task_data = parse_json(response.output, list)

                    if task_data:
                        # Convert to our data model
                        return [WorktreeTaskGroup(**group) for group in task_data]
                    else:
                        return []
                except (ValueError, json.JSONDecodeError) as e:
                    error_panel = Panel(
                        f"Failed to parse task response: {e}",
                        title="[bold red]❌ Parse Error[/bold red]",
                        border_style="red",
                    )
                    self.console.print(error_panel)
                    self.stats["errors"] += 1
                    return []
            else:
                error_panel = Panel(
                    "Failed to get eligible tasks",
                    title="[bold red]❌ Task Retrieval Failed[/bold red]",
                    border_style="red",
                )
                self.console.print(error_panel)
                self.stats["errors"] += 1
                return []
        except Exception as e:
            error_panel = Panel(
                f"Error getting eligible tasks: {str(e)}",
                title="[bold red]❌ Task Retrieval Error[/bold red]",
                border_style="red",
            )
            self.console.print(error_panel)
            self.stats["errors"] += 1
            return []

    def delegate_task(
        self, worktree_name: str, task_desc: str, adw_id: str, tags: List[str] = None
    ):
        """Delegate a task to the appropriate workflow based on tags.

        By default, uses the lightweight build-update workflow.
        If 'adw_plan_implement_update_task' tag is present, uses the full plan-implement-update workflow.
        Model selection: 'opus' tag uses opus model, 'sonnet' tag uses sonnet model, default is sonnet.
        """
        # Extract workflow and model from tags
        tags = tags or []
        use_full_workflow = SystemTag.extract_workflow_from_tags(tags)
        model = SystemTag.extract_model_from_tags(tags) or "sonnet"  # Default to sonnet

        if self.config.dry_run:
            workflow_type = (
                "plan-implement-update" if use_full_workflow else "build-update"
            )
            self.console.print(
                f"[yellow]DRY RUN: Would delegate task '{task_desc}' with ADW ID {adw_id} using {workflow_type} workflow with {model} model[/yellow]"
            )
            return

        try:
            # Determine which workflow script to use
            if use_full_workflow:
                # Use the full plan-implement-update workflow
                workflow_script = "adw_plan_implement_update_task.py"
                workflow_type = "plan-implement-update"
                slash_command = "/plan + /implement + /update_task"
            else:
                # Use the lightweight build-update workflow (default)
                workflow_script = "adw_build_update_task.py"
                workflow_type = "build-update"
                slash_command = "/build + /update_task"

            # Build the command to run the workflow
            cmd = [
                sys.executable,
                os.path.join(parent_dir, workflow_script),
                "--adw-id",
                adw_id,
                "--worktree-name",
                worktree_name,
                "--task",
                task_desc,
                "--model",
                model,
            ]

            # Create a panel showing the agent execution details
            exec_details = f"[bold]Slash Command:[/bold] {slash_command}\n"
            exec_details += f"[bold]Arguments:[/bold]\n"
            exec_details += f"  • ADW ID: {adw_id}\n"
            exec_details += f"  • Worktree: {worktree_name}\n"
            exec_details += f"  • Task: {task_desc}\n"
            exec_details += f"  • Model: {model}\n"
            exec_details += f"  • Workflow: {workflow_type}"

            exec_panel = Panel(
                exec_details,
                title="[bold cyan]🤖 Executing Agent[/bold cyan]",
                border_style="cyan",
                padding=(1, 2),
            )
            self.console.print(exec_panel)

            # Run the workflow in a subprocess
            result = subprocess.Popen(cmd)

            self.stats["tasks_started"] += 1

            # Create success panel for task delegation
            delegation_panel = Panel(
                f"✓ Task delegated with ADW ID: {adw_id}",
                title="[bold green]✅ Task Delegated[/bold green]",
                border_style="green",
            )
            self.console.print(delegation_panel)

        except Exception as e:
            error_panel = Panel(
                f"Error delegating task: {str(e)}",
                title="[bold red]❌ Delegation Failed[/bold red]",
                border_style="red",
            )
            self.console.print(error_panel)
            self.stats["errors"] += 1

    def process_tasks(self):
        """Main task processing logic."""
        self.stats["checks"] += 1
        self.stats["last_check"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        # Get eligible tasks
        task_groups = self.get_eligible_tasks()

        if not task_groups:
            # Print newline to ensure we're on a fresh line (clears any status spinners)
            self.console.print()
            info_panel = Panel(
                "No eligible tasks found. Update tasks.md to orchestrate your agents.",
                title="[bold yellow]No Tasks[/bold yellow]",
                border_style="yellow",
            )
            self.console.print(info_panel)
            return

        # No longer need to read task list here since each task update is handled by the prompt
        # Check if task file exists
        try:
            _ = self.task_manager.read_task_list()  # Just verify it exists
        except FileNotFoundError:
            error_panel = Panel(
                f"Task file not found: {self.config.task_file_path}",
                title="[bold red]❌ File Not Found[/bold red]",
                border_style="red",
            )
            self.console.print(error_panel)
            self.stats["errors"] += 1
            return

        # Report tasks that will be kicked off
        task_summary_lines = []
        total_tasks = 0
        for group in task_groups:
            if group.tasks_to_start:
                task_summary_lines.append(
                    f"[bold cyan]Worktree: {group.worktree_name}[/bold cyan]"
                )
                for task in group.tasks_to_start:
                    tags_str = (
                        f" [dim]({', '.join(task.tags)})[/dim]" if task.tags else ""
                    )
                    task_summary_lines.append(f"  • {task.description}{tags_str}")
                    total_tasks += 1
                task_summary_lines.append("")  # Empty line between worktrees

        if task_summary_lines:
            # Remove last empty line
            if task_summary_lines[-1] == "":
                task_summary_lines.pop()

            tasks_panel = Panel(
                "\n".join(task_summary_lines),
                title=f"[bold green]🚀 Starting {total_tasks} Task{'s' if total_tasks != 1 else ''}[/bold green]",
                border_style="green",
            )
            self.console.print(tasks_panel)

        # Process each worktree group
        for group in task_groups:
            # Check if worktree exists, create if needed
            if not self.check_worktree_exists(group.worktree_name):
                info_panel = Panel(
                    f"Worktree '{group.worktree_name}' doesn't exist, creating...",
                    title="[bold yellow]ℹ️ Creating Worktree[/bold yellow]",
                    border_style="yellow",
                )
                self.console.print(info_panel)
                if not self.create_worktree(group.worktree_name):
                    continue  # Skip this group if worktree creation failed

            # Process tasks in this worktree
            for task in group.tasks_to_start:
                # Generate ADW ID for this task
                adw_id = generate_short_id()

                # Update task status to in-progress
                try:
                    if not self.config.dry_run:
                        success = self.task_manager.update_task_to_in_progress(
                            group.worktree_name, task.description, adw_id
                        )
                        if not success:
                            error_panel = Panel(
                                f"Failed to update task to in-progress: {task.description}",
                                title="[bold red]❌ Update Failed[/bold red]",
                                border_style="red",
                            )
                            self.console.print(error_panel)
                            self.stats["errors"] += 1
                            continue

                        # Create success panel for task update
                        update_panel = Panel(
                            f"✓ Updated task to in-progress: {task.description}",
                            title="[bold green]✅ Task Status Updated[/bold green]",
                            border_style="green",
                        )
                        self.console.print(update_panel)
                    else:
                        self.console.print(
                            f"[yellow]DRY RUN: Would update task '{task.description}' to [🟡, {adw_id}][/yellow]"
                        )

                    # Delegate task to workflow
                    self.delegate_task(
                        group.worktree_name, task.description, adw_id, task.tags
                    )

                except Exception as e:
                    error_panel = Panel(
                        f"Error processing task: {str(e)}",
                        title="[bold red]❌ Task Processing Error[/bold red]",
                        border_style="red",
                    )
                    self.console.print(error_panel)
                    self.stats["errors"] += 1
                    continue

                # Respect max concurrent tasks
                if self.stats["tasks_started"] >= self.config.max_concurrent_tasks:
                    warning_panel = Panel(
                        f"Reached max concurrent tasks ({self.config.max_concurrent_tasks})",
                        title="[bold yellow]⚠️ Task Limit[/bold yellow]",
                        border_style="yellow",
                    )
                    self.console.print(warning_panel)
                    return

    def create_status_display(self) -> Panel:
        """Create a status display panel."""
        table = Table(show_header=False, box=None)
        table.add_column(style="bold cyan")
        table.add_column()

        table.add_row(
            "Status", "[green]Running[/green]" if self.running else "[red]Stopped[/red]"
        )
        table.add_row("Polling Interval", f"{self.config.polling_interval} seconds")
        table.add_row("Task File", str(self.config.task_file_path))
        table.add_row("Dry Run", "Yes" if self.config.dry_run else "No")
        table.add_row("", "")
        table.add_row("Checks", str(self.stats["checks"]))
        table.add_row("Tasks Started", str(self.stats["tasks_started"]))
        table.add_row("Worktrees Created", str(self.stats["worktrees_created"]))
        table.add_row("Errors", str(self.stats["errors"]))
        table.add_row("Last Check", self.stats["last_check"] or "Never")

        return Panel(
            Align.center(table),
            title="[bold blue] Multi-Agent Task Cron[/bold blue]",
            border_style="blue",
        )

    def run_once(self):
        """Run the task check once and exit."""
        self.console.print(self.create_status_display())
        self.console.print("\n[yellow]Running single check...[/yellow]\n")
        self.process_tasks()
        self.console.print("\n[green]✅ Single check completed[/green]")

    def run_continuous(self):
        """Run continuously with scheduled checks."""
        # Schedule the task processing
        schedule.every(self.config.polling_interval).seconds.do(self.process_tasks)

        self.console.print(self.create_status_display())
        self.console.print(
            f"\n[green]Started monitoring tasks every {self.config.polling_interval} seconds[/green]"
        )
        self.console.print("[dim]Press Ctrl+C to stop[/dim]\n")

        try:
            while self.running:
                schedule.run_pending()
                time.sleep(1)
        except KeyboardInterrupt:
            self.running = False
            self.console.print("\n[yellow]Stopping cron trigger...[/yellow]")
            self.console.print(self.create_status_display())
            self.console.print("[green]✅ Cron trigger stopped[/green]")


@click.command()
@click.option(
    "--interval", type=int, default=5, help="Polling interval in seconds (default: 5)"
)
@click.option(
    "--task-file",
    type=click.Path(exists=False),
    default="tasks.md",
    help="Path to task list file (default: tasks.md)",
)
@click.option(
    "--dry-run", is_flag=True, help="Run in dry-run mode without making changes"
)
@click.option(
    "--max-tasks", type=int, default=5, help="Maximum concurrent tasks (default: 5)"
)
@click.option(
    "--once", is_flag=True, help="Run once and exit instead of continuous monitoring"
)
@click.option("--verbose", is_flag=True, help="Enable verbose output")
def main(
    interval: int,
    task_file: str,
    dry_run: bool,
    max_tasks: int,
    once: bool,
    verbose: bool,
):
    """Monitor and distribute tasks from the multi-agent task list."""
    console = Console()

    # Create configuration
    config = CronTriggerConfig(
        polling_interval=interval,
        task_file_path=task_file,
        dry_run=dry_run,
        max_concurrent_tasks=max_tasks,
    )

    # Create and run the trigger
    trigger = CronTrigger(config)

    if once:
        trigger.run_once()
    else:
        trigger.run_continuous()


if __name__ == "__main__":
    main()
