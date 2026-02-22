# Mark Task In Progress

Mark a task as in-progress and assign it to a team member using the built-in Task tools.

## Variables
task_id: $1
owner_name: $2

## Instructions

1. Run `TaskGet` with `task_id` to retrieve the task details
2. Verify the task exists — if not, report error and stop
3. Verify the task status is `pending` — if it is already `in_progress` or `completed`, report error and stop
4. Verify the task's `blockedBy` list is empty — if there are unresolved dependencies, report error listing the blocking task IDs and stop
5. Run `TaskUpdate` to set `status: "in_progress"` and `owner: owner_name`

## Error Handling

- If the task does not exist, report: "Task {task_id} not found"
- If the task is already `in_progress`, report: "Task {task_id} is already in progress (owner: {current_owner})"
- If the task is already `completed`, report: "Task {task_id} is already completed"
- If the task has unresolved `blockedBy` dependencies, report: "Task {task_id} is blocked by tasks: {blockedBy_ids}"

## Report

Report the following:
- Task ID and subject that was updated
- New status: `in_progress`
- Assigned owner: `owner_name`
- Success or failure of the operation
