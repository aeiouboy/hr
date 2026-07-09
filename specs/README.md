# specs/

Feature specs, implementation plans, and decision records for the HRMS frontend.

## What belongs here

- **Plans & specs** — `*.md` and `*.html` planning documents (e.g. `planf3` HTML
  plans, chore plans `chore-{id}-{name}.md`, feature specs).
- **Active-plan assets** — an image directory next to a plan (`<plan-name>/*.png`)
  is fine while that plan is live; it is part of the document.
- **Fixture data a plan ships** — a few `*.json` seeds are imported by the app or
  tests (e.g. `sta-244-multi-entry-fields.json` → `stores/humi-profile-slice.ts`).
  Do **not** delete a spec `.json` without grepping `src/` for importers first.

## What does not belong here

- Generated screenshot dumps, result exports, presentation decks (`.pptx`/`.pdf`),
  or marketing artifacts. Those are build output, not source.
- Superseded plans kept "just in case" — **git history is the archive.** Once a
  plan has shipped and is no longer a reference, remove it from the working tree;
  `git log`/`git show` recovers it if ever needed.

## Convention

One plan per file, descriptive kebab-case name. Keep the working tree scannable:
a reader should be able to tell what is active work from what is historical noise
without opening every file.
