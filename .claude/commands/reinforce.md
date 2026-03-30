# Reinforce

Record a mistake, bug, or lesson learned into the Reinforcement Learning section of CLAUDE.md so future Claude sessions never repeat it.

## Variables
mistake: $ARGUMENTS

## Instructions

You are a **reinforcement learning agent**. Your job is to analyze a mistake or bug and permanently encode it as a rule in `CLAUDE.md` so it is never repeated.

If `mistake` is empty, analyze the **current conversation** for any mistakes, bugs, corrections, or lessons learned. Look for:
- Bugs you introduced and had to fix
- Corrections the user gave you
- Failed approaches you had to retry
- Infrastructure/config issues discovered
- Test failures and their root causes
- Any "oh, that was wrong" moments

If `mistake` is provided, use it as the mistake description to record.

---

### Step 1: Read Current State

Read `/Users/tachongrak/Projects/ts/CLAUDE.md` — specifically the "Reinforcement Learning — Past Mistakes" section. Note:
- The current highest mistake number (e.g., if last entry is #23, next is #24)
- All existing category names and their numbering
- Existing rules to avoid duplicates

---

### Step 2: Analyze the Mistake

For each mistake found, extract:

| Field | Description |
|-------|-------------|
| **Mistake** | What went wrong (one line, specific) |
| **Root Cause** | Why it happened (the underlying assumption or oversight) |
| **Correct Behavior** | What should be done instead (actionable rule) |
| **Category** | Which existing category it fits, OR propose a new `Category N` if none fit |
| **Files Affected** | Which files were involved (if applicable) |

---

### Step 3: Check for Duplicates

Compare against ALL existing entries in the Reinforcement Learning section. If the mistake is essentially the same as an existing entry (same root cause, same fix), do NOT add a duplicate. Instead:
- If the existing entry can be improved or made more specific, **update it**
- If it's truly a duplicate, tell the user it's already recorded and cite the entry number

---

### Step 4: Write to CLAUDE.md

Add the new mistake(s) to the appropriate category table in `/Users/tachongrak/Projects/ts/CLAUDE.md`:

**If it fits an existing category:**
- Append a new row to that category's table with the next sequential number
- If the mistake reveals a pattern that changes the category's rule, update the **Rule** line too

**If it needs a new category:**
- Add a new `### Category N: {Name}` section after the last category
- Include the table header, the new entry, and a bold **Rule** line summarizing the prevention pattern
- Place it BEFORE the "Quick Checklist" section

**If the mistake suggests a new checklist item:**
- Add it to the "Quick Checklist Before Declaring Done" section

---

### Step 5: Update Checklist

Review the Quick Checklist. If the new mistake implies a check that isn't already covered, add a new `[ ]` line.

---

### Step 6: Confirm

Output a summary:
1. What mistake was recorded
2. Which category it was added to (existing or new)
3. The new entry number
4. Whether the checklist was updated
5. Brief reminder of the rule to follow

Format:
```
Reinforced: #{number} — {one-line mistake summary}
Category: {category name}
Rule: {the prevention rule}
```

---

## Important Rules

- NEVER remove existing entries — only add or update
- Keep table format consistent with existing entries
- Mistakes should be **specific and actionable**, not vague ("be more careful")
- Root causes should explain **WHY** it happened, not just restate the mistake
- Correct behavior should be a **concrete action**, not a general principle
- If analyzing the current conversation and finding no mistakes, say so honestly — don't invent problems
- Write in English (mistake descriptions), but brief Thai context is OK if the user provides it
- Always use the Edit tool to modify CLAUDE.md — never rewrite the entire file
