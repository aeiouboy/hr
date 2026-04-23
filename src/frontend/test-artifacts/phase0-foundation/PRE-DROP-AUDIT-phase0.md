# PRE-DROP-AUDIT-phase0.md

> Generated: 2026-04-23T08:31:22.942Z
> Script: `npm run audit:fields -- --phase 0`
> Catalog: `src/services/shared/src/field-catalog/ec-core.ts` (195 entries)
> BRD: `projects/hr-platform-replacement/BRD-EC-summary.md` (207 rows total)

## Summary

| Metric | Value | Gate |
|--------|-------|------|
| Catalog entries | **195** | — |
| All flows meet AC-5 minimums | **YES** | = YES ✅ |
| BRD field-def rows covered | 27/28 (96%) | informational |
| BRD total rows covered | 27/207 (13%) | informational |
| F1→F2 picklist mismatches | 0 | = 0 ✅ |
| Unsourced catalog entries | 0 | = 0 ✅ |

**Verdict**: ✅ PASS

## Per-Flow Catalog Field Counts (AC-5 Primary Gate)

> Field count = catalog entries where `flowsUsedIn` includes the flow.
> A field that appears in 3 flows is counted once per flow.

| Flow | Fields in Catalog | AC-5 Min | Status |
|------|------------------|---------|--------|
| Hire | **159** | ≥ 159 | ✅ |
| Rehire | **164** | ≥ 164 | ✅ |
| Transfer | **62** | ≥ 62 | ✅ |
| Terminate | **21** | ≥ 21 | ✅ |
| ContractRenewal | **15** | ≥ 15 | ✅ |
| Probation | **13** | ≥ 13 | ✅ |
| EmpData | **164** | ≥ 164 | ✅ |

_Total field-flow assignments: 598 across 195 unique fields / 598 expected_

## BRD Row Coverage (Informational)

> Not all BRD rows become catalog field entries. Some rows describe system features,
> reports, or calculated fields (e.g., #87-92 Year-In-* computed by SF, #98-108 EC Documents).
> The primary pass gate is per-flow field counts above, not this row count.

| Section | Field-def rows in scope | Covered | Coverage |
|---------|------------------------|---------|----------|
| flow-06 Personal Info (#12-24) | 12 | 12 | 100% ✅ |
| flow-08 Emp Info (field-def subset) | 4 | 4 | 100% ✅ |
| flow-09 Lifecycle (#109-117) | 9 | 8 | 89% ✅ |
| flow-10 Compensation (#118-120) | 3 | 3 | 100% ✅ |

### Missing field-def BRD rows:

| BRD # | Feature | Flows |
|--------|---------|-------|
| #116 | Revert Terminate Flow | `flow-09` |

## Picklist ID Consistency

### F2-Intended Picklists

> These F1 `picklistId` values are intended to resolve to `PICKLIST_*` exports in F2.
> MISMATCH = the F1 name differs from what F2 exports — a rename or alias is needed.

| F1 `picklistId` | Expected F2 export | Status |
|----------------|-------------------|--------|
| `BLOODGROUP` | `PICKLIST_BLOOD_TYPE` | ✅ found |
| `Currency` | `PICKLIST_CURRENCY` | ✅ found |
| `cust_EmployeeClass` | `PICKLIST_EMPLOYEE_CLASS` | ✅ found |
| `GENDER` | `PICKLIST_GENDER` | ✅ found |
| `MARITAL_STATUS` | `PICKLIST_MARITAL_STATUS` | ✅ found |
| `Nationality` | `PICKLIST_NATIONALITY` | ✅ found |
| `RELIGION_THA` | `PICKLIST_RELIGION` | ✅ found |
| `FOEventReason` | (split: PICKLIST_EVENT_REASON_HIRE/TERM/TRANS — see note) | ℹ️ informational |

### Other SF Custom Picklists (not in F2 — runtime)

`ADDRESS_DISTRICT` · `ADDRESS_PROVINCE` · `ADDRESS_SUB_DISTRICT` · `ADDRESS_TYPE` · `CONTRACT_TYPE` · `CORPORATE_TITLE` · `EMAIL_TYPE` · `EMPLOYEE_STATUS` · `EVENT` · `ISO_COUNTRY` · `JOB_RELATIONSHIP_TYPE` · `JOB_TYPE` · `MANAGEMENT_PROGRAM` · `MILLITARY_STATUS` · `NEW_CORPORATE_TITLE` · `PERSON_RELATIONSHIP` · `PERSON_RELATIONSHIP_TYPE` · `PHONE_TYPE` · `POINT_OF_SALES` · `SALUTATION` · `SALUTATION_TH_OTHER` · `STORE_SIZE` · `TERMINATION_REASON` · `TRANSFER_FROM` · `TRANSFER_OUT` · `TYPE_OF_CHALLENGE` · `TYPE_OF_GROUP_FAMILY` · `VOLUNTARY` · `WORK_PERMIT_DOC_TYPE` · `YES_NO`

### SAP Foundation Objects (34 — NOT expected in F2)

> FO* / TM* / EC* / cust_* seeded from JSON files. These are correct — not mismatches.

`Bank` · `CustomPayType` · `ECPayScaleArea` · `ECPayScaleGroup` · `ECPayScaleLevel` · `ECPayScaleType` · `ECPosition`
`FOBusinessGroup` · `FOBusinessUnit` · `FOCompany` · `FOCostCenter` · `FODepartment` · `FODivision` · `FOJobGrade`
`FOLocation` · `FONationalIdCardType` · `FOPayGrade` · `FOSSOLocation` · `FOTerritory` · `FOWorkLocation`
`JobClassification` · `JobFunction` · `PayType` · `PaymentMethod` · `TMHolidayCalendar` · `TMOTFlag` · `TMWorkSchedule`
`TMWorkingHour` · `cust_EmploymentType` · `cust_HRDistrict` · `cust_StoreFormat` · `cust_brand` · `cust_policyProfile`
`cust_zone`

## Unsourced Catalog Entries

All catalog entries have `brdRow` or `sfEntity/sfField` grounding. ✅

## F2 PICKLIST_* Exports (10 total)

- `PICKLIST_BLOOD_TYPE`
- `PICKLIST_CURRENCY`
- `PICKLIST_EMPLOYEE_CLASS`
- `PICKLIST_EVENT_REASON_HIRE`
- `PICKLIST_EVENT_REASON_TERM`
- `PICKLIST_EVENT_REASON_TRANS`
- `PICKLIST_GENDER`
- `PICKLIST_MARITAL_STATUS`
- `PICKLIST_NATIONALITY`
- `PICKLIST_RELIGION`
