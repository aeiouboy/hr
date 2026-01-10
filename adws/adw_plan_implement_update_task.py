#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "pydantic",
#   "python-dotenv",
#   "click",
#   "rich",
# ]
# ///
"""
Run plan, implement, and update task workflow for multi-agent task processing.

This script runs three slash commands in sequence:
1. /plan - Creates a plan based on the task description
2. /implement - Implements the plan created by /plan
3. /update_task - Updates the task list with the result

Usage:
    # Method 1: Direct execution (requires uv)
    ./adws/adw_plan_implement_update_task.py --adw-id abc123 --worktree-name feature-auth --task "Implement OAuth2"

    # Method 2: Using uv run
    uv run adws/adw_plan_implement_update_task.py --adw-id abc123 --worktree-name feature-auth --task "Add user profiles"

Examples:
    # Run with specific model
    ./adws/adw_plan_implement_update_task.py --adw-id abc123 --worktree-name feature-auth --task "Add JWT tokens" --model opus

    # Run with verbose output
    ./adws/adw_plan_implement_update_task.py --adw-id abc123 --worktree-name feature-auth --task "Fix auth bug" --verbose
"""

import os
import sys
import json
import re
import subprocess
from pathlib import Path
from typing import Optional
from datetime import datetime
import click
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.rule import Rule

# Add the adw_modules directory to the path so we can import agent
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "adw_modules"))

from agent import (
    AgentTemplateRequest,
    AgentPromptResponse,
    execute_template,
)
from utils import format_agent_status, format_worktree_status

def print_status_panel(console, action: str, adw_id: str, worktree: str, phase: str = None, status: str = "info"):
    """Print a status panel with timestamp and context.
    
    Args:
        console: Rich console instance
        action: The action being performed
        adw_id: ADW ID for tracking
        worktree: Worktree/branch name
        phase: Optional phase name (build, plan, etc)
        status: Status type (info, success, error)
    """
    timestamp = datetime.now().strftime("%H:%M:%S")
    
    # Choose color based on status
    if status == "success":
        border_style = "green"
        icon = "✅"
    elif status == "error":
        border_style = "red"
        icon = "❌"
    else:
        border_style = "cyan"
        icon = "🔄"
    
    # Build title with context
    title_parts = [f"[{timestamp}]", adw_id[:6], worktree]
    if phase:
        title_parts.append(phase)
    title = " | ".join(title_parts)
    
    console.print(
        Panel(
            f"{icon} {action}",
            title=f"[bold {border_style}]{title}[/bold {border_style}]",
            border_style=border_style,
            padding=(0, 1),
        )
    )

# Output file name constants
OUTPUT_JSONL = "cc_raw_output.jsonl"
OUTPUT_JSON = "cc_raw_output.json"
FINAL_OBJECT_JSON = "cc_final_object.json"
SUMMARY_JSON = "custom_summary_output.json"


def extract_plan_path(output: str) -> str:
    """Extract the plan file path from the plan command output."""
    patterns = [
        r"specs/plan-[a-zA-Z0-9\-]+\.md",
        r"Created plan at:\s*(specs/plan-[a-zA-Z0-9\-]+\.md)",
        r"Plan file:\s*(specs/plan-[a-zA-Z0-9\-]+\.md)",
        r"path.*?:\s*(specs/plan-[a-zA-Z0-9\-]+\.md)",
    ]

    for pattern in patterns:
        match = re.search(pattern, output, re.IGNORECASE | re.MULTILINE)
        if match:
            return match.group(1) if match.groups() else match.group(0)

    # Provide more helpful error message showing what we were looking for
    raise ValueError(
        "Could not find plan file path in plan output. "
        "Expected pattern like 'specs/plan-*.md' but none found."
    )


def get_current_commit_hash(working_dir: str) -> Optional[str]:
    """Get the current git commit hash in the working directory."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            cwd=working_dir,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()[:9]  # Return first 9 characters of hash
    except subprocess.CalledProcessError:
        return None


@click.command()
@click.option(
    "--adw-id",
    required=True,
    help="ADW ID for this task execution"
)
@click.option(
    "--worktree-name",
    required=True,
    help="Name of the git worktree to work in"
)
@click.option(
    "--task",
    required=True,
    help="Task description to implement"
)
@click.option(
    "--model",
    type=click.Choice(["sonnet", "opus"]),
    default="sonnet",
    help="Claude model to use",
)
@click.option(
    "--verbose",
    is_flag=True,
    help="Enable verbose output"
)
def main(
    adw_id: str,
    worktree_name: str,
    task: str,
    model: str,
    verbose: bool,
):
    """Run plan, implement, and update task workflow for multi-agent processing."""
    console = Console()

    # Calculate the worktree path and the actual working directory
    # With sparse checkout, the structure is: trees/{worktree_name}/{target_directory}/
    worktree_base_path = os.path.abspath(f"trees/{worktree_name}")
    target_directory = "tac8_app2__multi_agent_todone"
    worktree_path = os.path.join(worktree_base_path, target_directory)
    
    # Check if worktree exists, create if needed
    if not os.path.exists(worktree_base_path):
        console.print(Panel(
            f"[bold yellow]Worktree not found at: {worktree_base_path}[/bold yellow]\n\n"
            "Creating worktree now...",
            title="[bold yellow]⚠️  Worktree Missing[/bold yellow]",
            border_style="yellow",
        ))
        
        # Create worktree using the init_worktree command
        init_request = AgentTemplateRequest(
            agent_name="worktree-initializer",
            slash_command="/init_worktree",
            args=[worktree_name, target_directory],
            adw_id=adw_id,
            model=model,
            working_dir=os.getcwd(),  # Run from project root
        )
        
        # Print start message for worktree creation
        print_status_panel(console, "Starting worktree creation", adw_id, worktree_name, "init")
        
        init_response = execute_template(init_request)
        
        # Print completion message
        print_status_panel(console, "Completed worktree creation", adw_id, worktree_name, "init", "success")
        
        if init_response.success:
            console.print(Panel(
                f"[bold green]✅ Worktree created successfully at: {worktree_base_path}[/bold green]",
                title="[bold green]Worktree Created[/bold green]",
                border_style="green",
            ))
        else:
            console.print(Panel(
                f"[bold red]Failed to create worktree:\n{init_response.output}[/bold red]",
                title="[bold red]❌ Worktree Creation Failed[/bold red]",
                border_style="red",
            ))
            sys.exit(1)

    # Set agent names for each phase
    planner_name = f"planner-{worktree_name}"
    builder_name = f"builder-{worktree_name}"
    updater_name = f"updater-{worktree_name}"

    console.print(
        Panel(
            f"[bold blue]ADW Plan-Implement-Update Workflow[/bold blue]\n\n"
            f"[cyan]ADW ID:[/cyan] {adw_id}\n"
            f"[cyan]Worktree:[/cyan] {worktree_name}\n"
            f"[cyan]Task:[/cyan] {task}\n"
            f"[cyan]Model:[/cyan] {model}\n"
            f"[cyan]Working Dir:[/cyan] {worktree_path}",
            title="[bold blue]🚀 Workflow Configuration[/bold blue]",
            border_style="blue",
        )
    )
    console.print()

    # Track workflow state
    workflow_success = True
    plan_path = None
    commit_hash = None
    error_message = None

    # Phase 1: Run /plan command
    console.print(Rule("[bold yellow]Phase 1: Planning (/plan)[/bold yellow]"))
    console.print()

    plan_request = AgentTemplateRequest(
        agent_name=planner_name,
        slash_command="/plan",
        args=[adw_id, task],
        adw_id=adw_id,
        model=model,
        working_dir=worktree_path,
    )

    # Display plan execution info
    plan_info_table = Table(show_header=False, box=None, padding=(0, 1))
    plan_info_table.add_column(style="bold cyan")
    plan_info_table.add_column()

    plan_info_table.add_row("ADW ID", adw_id)
    plan_info_table.add_row("Phase", "Planning")
    plan_info_table.add_row("Command", "/plan")
    plan_info_table.add_row("Args", f'{adw_id} "{task}"')
    plan_info_table.add_row("Model", model)
    plan_info_table.add_row("Agent", planner_name)

    console.print(
        Panel(
            plan_info_table,
            title=f"[bold blue]🚀 Plan Inputs | {adw_id} | {worktree_name}[/bold blue]",
            border_style="blue",
        )
    )
    console.print()

    try:
        # Print start message for plan phase
        print_status_panel(console, "Starting plan creation", adw_id, worktree_name, "plan")
        
        # Execute the plan command
        plan_response = execute_template(plan_request)
        
        # Print completion message
        print_status_panel(console, "Completed plan creation", adw_id, worktree_name, "plan", "success")

        if plan_response.success:
            console.print(
                Panel(
                    plan_response.output if verbose else "Plan created successfully",
                    title=f"[bold green]✅ Planning Success | {adw_id} | {worktree_name}[/bold green]",
                    border_style="green",
                    padding=(1, 2),
                )
            )

            # Extract the plan path
            try:
                plan_path = extract_plan_path(plan_response.output)
                console.print(f"\n[bold cyan]Plan created at:[/bold cyan] {plan_path}")
            except ValueError as e:
                workflow_success = False
                error_message = f"Plan path extraction failed: {str(e)}"
                console.print(
                    Panel(
                        f"[bold red]{error_message}[/bold red]\n\n"
                        "The /plan command succeeded but could not find the plan file path in the output.\n"
                        "Stopping workflow and marking task as failed.",
                        title="[bold red]❌ Critical Error - Plan Path Not Found[/bold red]",
                        border_style="red",
                    )
                )
        else:
            workflow_success = False
            error_message = "Planning phase failed"
            console.print(
                Panel(
                    plan_response.output,
                    title=f"[bold red]❌ Planning Failed | {adw_id} | {worktree_name}[/bold red]",
                    border_style="red",
                    padding=(1, 2),
                )
            )

        # Save plan phase summary
        plan_output_dir = f"./agents/{adw_id}/{planner_name}"
        plan_summary_path = f"{plan_output_dir}/{SUMMARY_JSON}"

        with open(plan_summary_path, "w") as f:
            json.dump(
                {
                    "phase": "planning",
                    "adw_id": adw_id,
                    "worktree_name": worktree_name,
                    "task": task,
                    "slash_command": "/plan",
                    "args": [adw_id, task],
                    "model": model,
                    "working_dir": worktree_path,
                    "success": plan_response.success,
                    "session_id": plan_response.session_id,
                    "plan_path": plan_path,
                },
                f,
                indent=2,
            )

        # Phase 2: Run /implement command (only if planning succeeded)
        if workflow_success and plan_path:
            console.print()
            console.print(Rule("[bold yellow]Phase 2: Implementation (/implement)[/bold yellow]"))
            console.print()

            implement_request = AgentTemplateRequest(
                agent_name=builder_name,
                slash_command="/implement",
                args=[plan_path],
                adw_id=adw_id,
                model=model,
                working_dir=worktree_path,
            )

            # Display implement execution info
            implement_info_table = Table(show_header=False, box=None, padding=(0, 1))
            implement_info_table.add_column(style="bold cyan")
            implement_info_table.add_column()

            implement_info_table.add_row("ADW ID", adw_id)
            implement_info_table.add_row("Phase", "Implementation")
            implement_info_table.add_row("Command", "/implement")
            implement_info_table.add_row("Args", plan_path)
            implement_info_table.add_row("Model", model)
            implement_info_table.add_row("Agent", builder_name)

            console.print(
                Panel(
                    implement_info_table,
                    title=f"[bold blue]🚀 Implement Inputs | {adw_id} | {worktree_name}[/bold blue]",
                    border_style="blue",
                )
            )
            console.print()

            # Print start message for implement phase
            print_status_panel(console, "Starting implementation", adw_id, worktree_name, "implement")
            
            # Execute the implement command
            implement_response = execute_template(implement_request)
            
            # Print completion message
            print_status_panel(console, "Completed implementation", adw_id, worktree_name, "implement", "success")

            if implement_response.success:
                console.print(
                    Panel(
                        implement_response.output if verbose else "Implementation completed successfully",
                        title=f"[bold green]✅ Implementation Success | {adw_id} | {worktree_name}[/bold green]",
                        border_style="green",
                        padding=(1, 2),
                    )
                )

                # Get the commit hash after successful implementation
                commit_hash = get_current_commit_hash(worktree_path)
                if commit_hash:
                    console.print(f"\n[bold cyan]Commit hash:[/bold cyan] {commit_hash}")
            else:
                workflow_success = False
                error_message = "Implementation phase failed"
                console.print(
                    Panel(
                        implement_response.output,
                        title=f"[bold red]❌ Implementation Failed | {adw_id} | {worktree_name}[/bold red]",
                        border_style="red",
                        padding=(1, 2),
                    )
                )

            # Save implement phase summary
            implement_output_dir = f"./agents/{adw_id}/{builder_name}"
            implement_summary_path = f"{implement_output_dir}/{SUMMARY_JSON}"

            with open(implement_summary_path, "w") as f:
                json.dump(
                    {
                        "phase": "implementation",
                        "adw_id": adw_id,
                        "worktree_name": worktree_name,
                        "slash_command": "/implement",
                        "args": [plan_path],
                        "model": model,
                        "working_dir": worktree_path,
                        "success": implement_response.success,
                        "session_id": implement_response.session_id,
                        "commit_hash": commit_hash,
                    },
                    f,
                    indent=2,
                )
        else:
            # Implementation skipped due to planning issues
            if not workflow_success:
                console.print()
                console.print(
                    Panel(
                        "[yellow]⏭️  Skipping implementation phase due to planning errors[/yellow]",
                        title="[bold yellow]Implementation Skipped[/bold yellow]",
                        border_style="yellow",
                    )
                )

        # Phase 3: Run /update_task command (always run to update status)
        console.print()
        console.print(Rule("[bold yellow]Phase 3: Update Task (/update_task)[/bold yellow]"))
        console.print()

        # Determine the status to update
        update_status = "success" if workflow_success and commit_hash else "failed"

        update_request = AgentTemplateRequest(
            agent_name=updater_name,
            slash_command="/update_task",
            args=[
                adw_id,
                worktree_name,
                task,
                update_status,
                commit_hash or "",
                error_message or ""
            ],
            adw_id=adw_id,
            model=model,
            working_dir=os.getcwd(),  # Run from project root to update main tasks.md
        )

        # Display update execution info
        update_info_table = Table(show_header=False, box=None, padding=(0, 1))
        update_info_table.add_column(style="bold cyan")
        update_info_table.add_column()

        update_info_table.add_row("ADW ID", adw_id)
        update_info_table.add_row("Phase", "Update Task")
        update_info_table.add_row("Command", "/update_task")
        update_info_table.add_row("Status", update_status)
        update_info_table.add_row("Model", model)
        update_info_table.add_row("Agent", updater_name)

        console.print(
            Panel(
                update_info_table,
                title=f"[bold blue]🚀 Update Inputs | {adw_id} | {worktree_name}[/bold blue]",
                border_style="blue",
            )
        )
        console.print()

        # Print start message for update phase
        print_status_panel(console, "Starting task status update", adw_id, worktree_name, "update")
        
        # Execute the update command
        update_response = execute_template(update_request)
        
        # Print completion message
        print_status_panel(console, "Completed task status update", adw_id, worktree_name, "update", "success")

        if update_response.success:
            console.print(
                Panel(
                    update_response.output if verbose else "Task status updated successfully",
                    title=f"[bold green]✅ Update Success | {adw_id} | {worktree_name}[/bold green]",
                    border_style="green",
                    padding=(1, 2),
                )
            )
        else:
            console.print(
                Panel(
                    update_response.output,
                    title=f"[bold red]❌ Update Failed | {adw_id} | {worktree_name}[/bold red]",
                    border_style="red",
                    padding=(1, 2),
                )
            )

        # Save update phase summary
        update_output_dir = f"./agents/{adw_id}/{updater_name}"
        update_summary_path = f"{update_output_dir}/{SUMMARY_JSON}"

        with open(update_summary_path, "w") as f:
            json.dump(
                {
                    "phase": "update_task",
                    "adw_id": adw_id,
                    "worktree_name": worktree_name,
                    "task": task,
                    "slash_command": "/update_task",
                    "args": [adw_id, worktree_name, task, update_status, commit_hash or "", error_message or ""],
                    "model": model,
                    "working_dir": os.getcwd(),  # update_task runs from project root
                    "success": update_response.success,
                    "session_id": update_response.session_id,
                    "final_status": update_status,
                },
                f,
                indent=2,
            )

        # Show workflow summary
        console.print()
        console.print(Rule("[bold blue]Workflow Summary[/bold blue]"))
        console.print()

        summary_table = Table(show_header=True, box=None)
        summary_table.add_column("Phase", style="bold cyan")
        summary_table.add_column("Status", style="bold")
        summary_table.add_column("Output Directory", style="dim")

        # Planning phase row
        planning_status = "✅ Success" if plan_response.success else "❌ Failed"
        summary_table.add_row(
            "Planning (/plan)",
            planning_status,
            f"./agents/{adw_id}/{planner_name}/",
        )

        # Implementation phase row
        if plan_path and workflow_success:
            implement_status = "✅ Success" if implement_response.success else "❌ Failed"
            summary_table.add_row(
                "Implementation (/implement)",
                implement_status,
                f"./agents/{adw_id}/{builder_name}/",
            )
        elif plan_response.success and not plan_path:
            # Plan succeeded but couldn't extract path
            summary_table.add_row(
                "Implementation (/implement)",
                "⏭️ Skipped (no plan path)",
                "-",
            )
        elif not plan_response.success:
            # Plan failed entirely
            summary_table.add_row(
                "Implementation (/implement)",
                "⏭️ Skipped (plan failed)",
                "-",
            )

        # Update phase row
        update_status_display = "✅ Success" if update_response.success else "❌ Failed"
        summary_table.add_row(
            "Update Task (/update_task)",
            update_status_display,
            f"./agents/{adw_id}/{updater_name}/",
        )

        console.print(summary_table)

        # Create overall workflow summary
        workflow_summary_path = f"./agents/{adw_id}/workflow_summary.json"
        os.makedirs(f"./agents/{adw_id}", exist_ok=True)

        with open(workflow_summary_path, "w") as f:
            json.dump(
                {
                    "workflow": "plan_implement_update_task",
                    "adw_id": adw_id,
                    "worktree_name": worktree_name,
                    "task": task,
                    "model": model,
                    "working_dir": worktree_path,
                    "plan_path": plan_path,
                    "commit_hash": commit_hash,
                    "phases": {
                        "planning": {
                            "success": plan_response.success,
                            "session_id": plan_response.session_id,
                            "agent": planner_name,
                        },
                        "implementation": {
                            "success": implement_response.success if plan_path else False,
                            "session_id": implement_response.session_id if plan_path else None,
                            "agent": builder_name,
                        } if plan_path else None,
                        "update_task": {
                            "success": update_response.success,
                            "session_id": update_response.session_id,
                            "agent": updater_name,
                        },
                    },
                    "overall_success": workflow_success,
                    "final_task_status": "success" if workflow_success and commit_hash else "failed",
                },
                f,
                indent=2,
            )

        console.print(
            f"\n[bold cyan]Workflow summary:[/bold cyan] {workflow_summary_path}"
        )
        console.print()

        # Exit with appropriate code
        if workflow_success:
            console.print(
                "[bold green]✅ Workflow completed successfully![/bold green]"
            )
            sys.exit(0)
        else:
            console.print(
                "[bold yellow]⚠️  Workflow completed with errors[/bold yellow]"
            )
            sys.exit(1)

    except Exception as e:
        console.print(
            Panel(
                f"[bold red]{str(e)}[/bold red]",
                title="[bold red]❌ Unexpected Error[/bold red]",
                border_style="red",
            )
        )
        sys.exit(2)


if __name__ == "__main__":
    main()