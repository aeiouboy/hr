# EC "list of fields" (BA, 30 Jul) vs the admin Employee File screen

Field-by-field audit of the BA spreadsheet `EClist_of_fields30Jul.csv` (604 UI fields,
71 sections) against what the admin Employee File screen actually renders.

## Result

| | Fields | Share |
|---|---:|---:|
| **FOUND** — labelled field rendered on screen | 33 | 5.5% |
| **PARTIAL** — value on screen but not as its own labelled field | 71 | 11.8% |
| **MISSING** — not on screen at all | 500 | 82.8% |
| **Total BA fields** | **604** | |

Section level: **32 of 71** BA sections have a card on the screen; **39 have none**.
Of the 32 that do, most render a 2–4 line summary rather than the BA field set — the
worst gaps are `Job Information` (2/37), `Dependents` (0/27 labelled),
`Work Experience Within Company (History)` (0/23 labelled) and
`Primary Emergency Contact` (0/18 labelled).

## Files

| File | What it is |
|---|---|
| `EC-field-vs-UI-employee-file.csv` | **Main deliverable** — one row per BA field with status, the matched on-screen label, a note, and the screenshot that proves it |
| `EC-field-vs-UI-section-summary.csv` | Per-BA-section rollup: field count, FOUND/PARTIAL/MISSING, coverage % |
| `EC-field-vs-UI-extra-on-screen.csv` | Fields/sections the screen renders that the BA sheet does **not** list |
| `side-by-side.html` | Screen capture next to the BA field checklist, section by section (open in a browser) |
| `shots/` | 22 PNGs — full page + snapshot header + one per section card |
| `scripts/` | The harvest + compare scripts, so the audit can be re-run after each change |

## How the evidence was captured

- Signed in as `admin@humi.test` (hr_admin + hr_manager + spd) so no section is
  RBAC-removed from the view.
- Every collapsible section card expanded, topbar overlays dismissed, then every
  `label` / `.humi-eyebrow` / `<th>` / card title harvested from the live DOM.
- Both locales harvested (`/en` and `/th`) so a Thai-only label still counts as found.
- Per-section PNGs captured from the same run.

## Status definitions

- **FOUND** — the screen renders a labelled field carrying that BA datum, for that
  same entity. Cross-card matches count only where it is genuinely the same datum
  (e.g. BA `Identity › Hire Date` is satisfied by *Hire Date* on the Employment
  information card).
- **PARTIAL** — the value is visible but not as its own labelled field: folded into a
  composite string (the whole home address is one line), shown in a card summary line
  (Dependents shows `Prasert Srisuk · Father · DOB 1960-03-08` with no field labels),
  carried by an inline marker (★ = primary phone/email), or masked (compensation
  amounts render as `฿ ••,•••`).
- **MISSING** — not on the screen. The note distinguishes *section card exists but the
  field is not rendered* from *no section for this BA group at all*.

Matching is a curated rule table, not fuzzy string matching — a dependent's `Phone` is
**not** treated as satisfied by the employee's own `Phone` field. Rules live in
`scripts/compare.py` (`RULES`), one entry per BA section, and are the thing to edit when
a field lands.

## Caveats — read before acting on the numbers

1. **The URL in the request could not be reached.** `https://humi-dev-int.central.co.th`
   is an internal host and is blocked from the audit environment (403 on CONNECT).
   The screen was rendered from this repo instead (`master` @ `18904d8`) at
   `localhost:3000`, which is the same code the dev-int deployment builds from. If
   dev-int is running a different branch, re-run the scripts against it.
2. **`EMP-SEED-01` does not exist in this codebase** — no match anywhere in the git
   history; local seed IDs are `EMP-0001…EMP-1000`. **`EMP-0002`** was used
   (active, Permanent, CEN). Field *presence* is identical across employees; only
   values differ.
3. **This audits one screen.** Fields that exist elsewhere in the app — the hire
   wizard, `/admin/employees/[id]/edit`, `/profile/me` — are counted MISSING here
   because they are not on the Employee File screen. That is the question the BA sheet
   asks ("Page: Employee file"), but it is not a statement that the app lacks the field
   everywhere.
4. **Section-level judgement calls** are recorded in `RULES`, e.g. BA `Benefit Election`
   (dependent-level health/dental election) is routed to the *Benefit enrollment* card
   as the nearest surface even though none of its 10 fields are there. Re-route in the
   script if BA disagrees.
5. Four benefit-admin sections on the screen — Current Benefits, Benefit enrollment,
   Claim history, Adjust entitlement amount history — plus Timeline are **absent from
   the BA sheet entirely**. See `EC-field-vs-UI-extra-on-screen.csv`.

## Re-running

```bash
cd src/frontend && npm run dev            # localhost:3000
cd docs/ec-field-audit-2026-07-30/scripts
EMP=EMP-0002 LOC=en node extract2.mjs     # harvest DOM labels (also LOC=th)
LOC=en node shots.mjs                     # per-section screenshots
python3 compare.py                        # regenerate both CSVs
python3 sidebyside.py                     # regenerate side-by-side.html
```

`extract2.mjs` / `shots.mjs` expect the scratch paths from the original run; adjust the
`OUT` constant when running elsewhere.
