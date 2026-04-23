# BA Source of Truth — EC list of fields

**Source file**: `centralgroup.sharepoint.com/sites/BATeam/EC- list of fields.xlsx`
**Archived copy**: `projects/hr-platform-replacement/ba-source/EC-list-of-fields-2026-04-23.xlsx` (4.3 MB)
**Fetched**: 2026-04-23 via browser-harness (Ken SSO session)
**Owner**: BA team  •  **Validator (next)**: HR BU via HR Expert meetings

## Workbook structure

| Sheet | Rows | Cols | Content |
|-------|-----:|-----:|---------|
| Employee file | 53 | 14 | 37 field rows × Hiring workflow |
| EC Picklist | 78,388 | 10 | SAP EC picklist reference (PROD snapshot) — ALL picklists ALL locales |
| Sheet4 | 2 | 1 | (placeholder) |
| Sheet2 | 6 | 5 | (auxiliary) |

## Column schema (Employee file)

| Col | Name | Meaning |
|-----|------|---------|
| A | Section | Top-level group (Identity / Personal Information / ...) |
| B | Sub-section | Inner group within section |
| C | UI Field | Label shown to user in form |
| D | UI Mandatory | `Required` or blank |
| E | UI Conditional required | Rule expression if conditional |
| F | UI Validation | Validation rule (e.g., "Recent Date should be greater than Date of Birth") |
| G | Allow to maintain? | Y/N — can admin edit post-hire |
| H | Permanent | Visible for Permanent employee class |
| I | Partime | Visible for Partime (part-time) class |
| J | Table | DB table name |
| K | Field | DB column name (authoritative identifier) |
| L | Type | Data type (Text / LOV / Date / Int / ...) |
| M | Length | Max length if applicable |
| N | LOV (if any) | Picklist ID reference (maps to EC Picklist sheet) |

## Hiring workflow — 37 fields

### Identity section (19 fields)

| # | UI Field | Mandatory | DB Field | Type | LOV |
|---|----------|:-:|----------|------|-----|
| 1 | Hire Date | ✓ | — | LOV | — |
| 2 | Company | ✓ | — | LOV | — |
| 3 | Event Reason | ✓ | — | LOV | — |
| 4 | Salutation (EN) | ✓ | — | LOV | — |
| 5 | Firstname (EN) | ✓ | — | Text | — |
| 6 | Middle Name (EN) | | — | Text | — |
| 7 | Lastname (EN) | ✓ | — | Text | — |
| 8 | Date of Birth | ✓ | DATE_OF_BIRTH | LOV | — |
| 9 | Country of Birth | | COUNTRY_OF_BIRTH | LOV | ISOCountryList |
| 10 | Region of Birth | | Region of Birth | LOV | — |
| 11 | Age | ✓ | Age | Text | — |
| 12 | Employee ID | ✓ | — | | — |
| 13 | National ID Card Type | ✓ | NATIONAL ID CARD TYPE | | idType_ID_Card |
| 14 | Country | ✓ | COUNTRY | | — |
| 15 | National ID | ✓ | NATIONAL_ID | | — |
| 16 | Issue Date | | ISSUE_DATE | | — |
| 17 | Expiry Date | | EXPIRY_DATE | | — |
| 18 | Is Primary | ✓ | ISPRIMARY | LOV | Yes/No |
| 19 | [VN] Issue Place | | — | | — |

### Personal Information section (18 fields)

| # | UI Field | Mandatory | DB Field | Type |
|---|----------|:-:|----------|------|
| 1 | Salutation (Local) | ✓ | SALUTATION_TH | |
| 2 | Other Title (TH) | ✓ | TITLE_TH | |
| 3 | Firstname (Local) | ✓ | FIRSTNAME_TH | |
| 4 | Lastname (Local) | ✓ | LASTNAME_TH | |
| 5 | Middle Name (Local) | ✓ | MIDDLENAME_TH | |
| 6 | Salutation (Local, EN dup) | | SALUTATION_EN | |
| 7 | Firstname (Local, EN dup) | | FIRSTNAME_EN | |
| 8 | Lastname (Local, EN dup) | | LASTNAME_EN | |
| 9 | Middle Name (Local, EN dup) | | MIDDLENAME_EN | |
| 10 | Nickname (EN/TH) | ✓ | NICKNAME | |
| 11 | Military Status | ✓ | MILITARY_STATUS | |
| 12 | Gender | ✓ | GENDER | |
| 13 | Nationality | ✓ | NATIONALITY | |
| 14 | Foreigner | ✓ | FOREIGNER | |
| 15 | Blood Type | ✓ | BLOODTYPE | |
| 16 | Marital Status | ✓ | MARITAL_STATUS | |
| 17 | Marital Status Since | ✓ | Marital Status Since | |
| 18 | Attachment | | — | |

## Δ vs Plan v2 assumption

| Measurement | Plan v2 | BA Truth | Δ |
|-------------|---------|----------|---|
| Hiring field count | ~50 (projection) | **37** | Plan overshot by 13 |
| Sections | Who/Job/Review (3 clusters) | Identity + Personal Info (2 in BA) | BA doesn't match Option-1 cluster design — cluster boundary is UI concern, BA is data model concern |
| Mandatory count | (not specified) | 27 (73%) | — |

## Δ vs F1 catalog (Phase 0, 195 entries)

F1 covers **all EC-Core workflows** (Hire + Lifecycle + Employee Data + Organization) — BA Employee file covers only Hiring. Direct diff requires filtering F1 to Hire-scope only. TODO: next iteration.

## Derived D2 plan updates

**S1 Hire gap-close target revised: 13 → 37 fields** (not 13 → 50)

Scope match:
- BA "Identity" → Option-1 cluster "Who" (step 1)
- BA "Personal Info" → Option-1 cluster "Who" (step 2 biographical) + step 3 review

**LOVs to wire (from BA truth)**:
1. ISOCountryList — Country of Birth (BA row 14)
2. idType_ID_Card — National ID Card Type (BA row 26)
3. Yes/No — Is Primary (BA row 26, YES_NO already shipped in D1.3 ✓)
4. Event Reason — picklist (need exact ID from EC Picklist tab)
5. Hire Company — picklist (need ID)
6. Salutation EN — picklist
7. Nationality / Religion / Gender / Marital / Blood / Military — all picklists (F2 shipped 10 in Phase 0, MARITAL wired in D1.3 ✓)

**Validation rules (BA row 15 flagged)**:
- "Recent Date should be greater than Date of Birth" — needs cross-field validator (F3 toolkit has pattern for this)

## EC Picklist sheet summary (78,388 rows)

Too large to inline here. Columns:
- `Picklist ID` (e.g., `ADDRESS_CATEGORY_ZAF`, `MaritalStatus`, `BloodType`, `NationalityISO`)
- `Picklist Status` (A = Active)
- `Picklist Value Code`, `Non-Unique Code`, `Parent Picklist Value`
- `Default Label`, `Label EN`, `Label TH`, `Label VN`
- `Value Status`

**Action**: Import **only needed picklists** into `@hrms/shared/picklists/` during D2 (on demand per field). Don't dump all 78k rows into the bundle — tree-shake by Picklist ID.

## Next actions

1. ✅ Archive XLSX committed in this commit (versioned filename with date)
2. ⏳ Write `src/services/shared/src/field-catalog/ba-hiring.ts` — 37 typed FieldDef entries traced to BA row
3. ⏳ Audit F1 hiring-subset vs BA → gap report
4. ⏳ D2 dispatch with ba-hiring.ts as truth for S1 Hire gap-close
5. 🔴 BA validation with HR BU still pending — this file is BA-compiled, awaiting HR Expert confirmation
