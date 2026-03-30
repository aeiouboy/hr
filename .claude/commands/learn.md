# Lean Research

Research a topic thoroughly using a **parallel agent team** — multiple researchers work simultaneously on different angles, then results are synthesized into a single comprehensive report.

## Variables
obj: $1

## Instructions

- If `obj` is not provided, stop and ask the user to provide a research topic (e.g., "How to build RAG").
- Follow the steps below **in order**.

---

### Step 1: Define Research Angles

Before spawning agents, break down `{obj}` into **4 parallel research angles**:

| Agent | Research Angle | Focus |
|-------|---------------|-------|
| `researcher-overview` | `{obj}` overview & fundamentals | Core concepts, terminology, how it works |
| `researcher-implementation` | `{obj}` implementation & architecture | Technical architecture, code examples, step-by-step guides |
| `researcher-best-practices` | `{obj}` best practices & patterns | Industry best practices, common pitfalls, dos/don'ts |
| `researcher-tools` | `{obj}` tools, frameworks & comparisons | Available tools, libraries, comparisons, trade-offs, recent developments |

---

### Step 2: Create Team & Dispatch Parallel Agents

1. **Create a team** using `TeamCreate` with name `lean-research`.

2. **Create 4 tasks** using `TaskCreate` — one for each research angle above.

3. **Spawn 4 researcher agents in parallel** using the `Task` tool:
   - Use `subagent_type: "researcher"` for each agent.
   - Set `team_name: "lean-research"`.
   - Give each agent a `name` matching the table above (e.g., `researcher-overview`).
   - Each agent's prompt should include:
     - The research topic: `{obj}`
     - Their specific angle and focus area
     - Instruction to use `WebSearch` for 1-2 targeted searches
     - Instruction to use `mcp__firecrawl-mcp__firecrawl_scrape` on the top 2-3 URLs (with `formats: ["markdown"]`, `onlyMainContent: true`)
     - Instruction to send findings back via `SendMessage` to the team lead
     - Instruction to mark their task as completed via `TaskUpdate`
   - IMPORTANT: Launch all 4 agents in a **single message** with 4 parallel `Task` tool calls.

4. **Wait for all agents to complete** — monitor via `TaskList` or wait for messages.

---

### Step 3: Synthesize and Save Report

Once all 4 researchers have reported back:

1. **Merge all findings** from the 4 agents into a single comprehensive document.
2. **Deduplicate** overlapping information across agents.
3. **Structure** the report using the `Report Format` below.
4. **Save** the file to: `/Users/tachongrak/Meteo/reseach/{obj}.md`
   - Use the `obj` value as the filename directly (spaces are OK).
5. **Clean up** — delete the team using `TeamDelete`.

- IMPORTANT: The report should be written in **English** with technical accuracy.
- IMPORTANT: Include ALL source URLs from all agents at the bottom.
- IMPORTANT: The "Relevance to Meteo Project" section should connect findings to the Meteo project context (OMS, Slick Picking Tool, n8n, Supabase, Vercel, LangChain, Hexagonal Architecture).

---

## Report Format

```md
# {obj}

> Researched on: {current date}
> Research method: Parallel agent team (4 researchers)

## Overview
{A concise 2-3 paragraph summary of the topic, synthesized from all research angles}

## Key Concepts
{Core concepts and terminology explained clearly}

## Architecture / How It Works
{Technical architecture, diagrams (as text/mermaid if applicable), data flow explanations}

## Implementation Guide
{Step-by-step implementation approach with code examples where relevant}

## Best Practices
{Industry best practices, dos and don'ts, common pitfalls to avoid}

## Tools & Technologies
{Relevant tools, libraries, frameworks with brief descriptions and when to use each}

## Comparison & Trade-offs
{Compare different approaches, their pros/cons, decision criteria}

## Relevance to Meteo Project
{How this topic connects to the Meteo project - OMS, Slick Picking Tool, n8n, Supabase, Vercel, LangChain, etc.
Include specific recommendations for how to apply these findings in the Meteo context.}

## Sources
{List ALL URLs used by ALL researchers as references}
- [Title](URL) - Brief description
```

---

## Report

When finished, output:
1. The path to the saved file
2. A brief summary of what was researched
3. How many sources were collected across all agents
