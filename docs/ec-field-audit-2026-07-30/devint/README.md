# dev-int vs the BA field list — full 604-field compare

Audit of the **`humi-dev-int` Employee File screen** (`EMP-0002`, `/humi/en/admin/employees/EMP-0002`)
against the BA sheet `EClist_of_fields30Jul.csv`, all 604 fields across 71 sections.

## Result

| | Fields | Share |
|---|---:|---:|
| **FOUND** — labelled field on screen | 573 | 94.9% |
| **PARTIAL** — value shown, but as a badge / header line / link target | 7 | 1.2% |
| **MISSING** — section card exists, field not in it | 11 | 1.8% |
| **NO CARD** — BA section has no card on the screen | 13 | 2.2% |

**68 of 71 BA sections have a card.** dev-int implements the BA sheet almost in
full, section for section and usually field for field in the sheet's own order.

## How this differs from the parent audit

`../README.md` audits **this repository** at `localhost:3000`; this one audits the
**deployed dev-int build**. They are not the same application:

| | dev-int | this repo (`master` @ `18904d8`) |
|---|---:|---:|
| BA fields FOUND | 573 (94.9%) | 33 (5.5%) |
| BA sections with a card | 68 / 71 | 32 / 71 |

The parent audit's 5.5% describes the local mockup only. **Quote 94.9% for dev-int.**

## The 11 MISSING fields

| BA section | Field | Note |
|---|---|---|
| Contact | Country Code | phone rows carry Type + Number only |
| Contact | Extension | same |
| Dependents | Phone | no phone field on the dependent record |
| Dependents | Primary | no primary marker on dependents (emergency contacts do have one) |
| Dependents | Copy Address from Employee | an edit-form action, not a display field |
| Primary Emergency Contact | copy Address from Employee | same |
| Global Information | Religion | — |
| Identity | Event reason | — |
| Identity | Replaced Employee ID | — |
| Job Information | Probation Exemption | — |
| Employee Benefit Obligation (EBO) | หมายเหตุ | card renders Description + EBO Amount only |

Two of these (`Copy Address from Employee`) are buttons that belong to an edit
form, so a read-only view is not expected to show them — the substantive gap is
nine fields.

## The 3 sections with no card

- **Work Permit Information (ใบอนุญาตทำงาน)** — 8 fields (Document Type, Country,
  Document Number, Issue Date, Expiry Date, Arrival date (VISA), 90 days report
  (VISA), Attachment). The only real section-level gap.
- **Pending** — 4 fields (Username, Learning History, Obligation(EBO), Badges).
  The sheet itself files these as undecided.
- **Profile** — 2 fields; `Org Chart` is on screen (on Employment information, as
  `Org. Chart`) and counts as FOUND, leaving only `Tags`.

## Method and its limits

The host is blocked by this environment's egress policy (`403 CONNECT` for the
whole `central.co.th` domain), so the screen could not be harvested from the DOM.
The evidence is a full-page PDF capture supplied by the user. The PDF has **no
text layer** — its 18 page images were extracted at 2941x3866 and every card title
and field label was read off them and transcribed into `SEEN` in
`compare-devint.py`.

That transcription is the weak link: it was done by eye, not by DOM harvest. The
section-level findings are solid (a card either has a title on the page or it does
not), and the field-level counts are as good as the transcription. If a specific
number matters, re-check that section's entry in `SEEN`. Matching is exact on a
normalised label, plus a small curated alias table for wording differences between
the two sources — `centre`/`center`, `House Number`/`House No.`, the sheet's
`Posiiton`/`Corperate` typos, and its `Parent (Q) -> child` field-naming form.

Getting a DOM-harvested number instead needs `*.central.co.th` allowed in the
environment's egress policy; then `../scripts/extract2.mjs` can be pointed at
dev-int directly.

## Files

| File | What it is |
|---|---|
| `devint-field-vs-ui.csv` | **Main deliverable** — one row per BA field: section, sub-section, field, matching dev-int card, status, matched label |
| `devint-section-summary.csv` | Per-BA-section rollup with coverage % |
| `devint-readable-sections.csv` | Earlier partial pass over the 8 sections legible in the first screenshots, before the PDF arrived |
| `compare-devint.py` | Transcription + compare script; edit `SEEN` to correct a label, then re-run |
