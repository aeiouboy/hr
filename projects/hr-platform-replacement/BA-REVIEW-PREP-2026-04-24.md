# BA Review Prep — Companion Meta Doc

**Date**: 2026-04-24
**Audience**: BA team (Antonio + peers)
**Purpose**: summary companion สำหรับ BA review ครอบคลุม 4 หัวข้อรวมใน 1 doc (workbook sync + open issues + duplicate-risk + event-reason alignment)

**Companion packet** (send together):
- `BA-AUDIT-BACTIONS-2026-04-24.md` — 7 B-actions field catalog (forward-facing gap list, BA ยังไม่มี B-action sheet ใน workbook)
- `EC-FIELD-AUDIT-2026-04-24.md` — Hire 37 fields audit (already covered in BA Employee file sheet)
- `RIS-WALKTHROUGH-2026-04-24.md` — route journey walkthrough สำหรับ design review
- `PLACEHOLDER-AUDIT-2026-04-24.md` — 24 routes placeholder status + 2 duplicate-risk findings
- `BRD-COVERAGE-MATRIX-2026-04-24.md` — 207 BRDs + 28 reports systematic coverage

---

## §1 BA Workbook Sync Status

**Local copy (stark repo — canonical)**
- Path: `projects/hr-platform-replacement/ba-source/EC-list-of-fields-2026-04-23.xlsx`
- Size: 4,304,720 bytes (~4.3 MB)
- mtime: 2026-04-23 20:05
- Last-fetched (per `BA-EC-SUMMARY.md`): **2026-04-23** via browser-harness (Ken SSO session)

**Mirror copy (hr repo)**
- Path: `projects/hr-platform-replacement/ba-source/EC-list-of-fields-2026-04-23.xlsx`
- Size: 4,304,720 bytes — **identical byte count** vs stark copy ✅
- mtime: 2026-04-24 00:07 (file copy timestamp ไม่ใช่ source fetch timestamp)

**SharePoint origin**: `centralgroup.sharepoint.com/sites/BATeam/EC- list of fields.xlsx`

**Time since fetch**: 1 day (2026-04-23 → 2026-04-24)

**Verdict**: ✅ **stable** — 1 day stale, no BA change signal received; re-fetch not required for this review round

**BA action**:
1. ยืนยันว่า SharePoint ของคุณยังเป็น version เดียวกันกับที่เราดึงเมื่อ 2026-04-23 (ไม่มีใครแก้หลังจากนั้น)
2. ถ้ามี update หลัง 2026-04-23 → แจ้ง Ken + ระบุ sheet/row ที่แก้ เพื่อเรา re-fetch เฉพาะ delta

---

## §2 Open Issues for BA

Items ที่ BA ต้องเคาะ / ยืนยัน ก่อน Sprint 2 kick-off. Source: `BRD-COMPREHENSIVE-PLAN-2026-04-24.md` §"BRD rules deferred / partial" + BA workbook gap (Doc 1 MK V #1).

| # | Topic | BRD Ref | Current Status | BA Action Needed |
|---|-------|---------|----------------|------------------|
| 1 | National ID mod-11 checksum | #5 | No validator (plan: "Requires Thai ID check library") | ยืนยัน algorithm reference + lib recommendation (เช่น `thai-national-id-validator` npm pkg?) หรือ BA ใช้ spec ไหน |
| 2 | Foreigner=YES → Work Permit sub-form | #9 | Not conditional (plan: "Sub-form design needed") | ส่ง sub-form design handoff (fields, mandatory, layout) — ตอนนี้ UI ไม่มี branch |
| 3 | HRBP SH4 mail trigger | #14 | UI stub only (plan: "Backend SendGrid/Mailgun wire") | ยืนยัน recipient list + template + trigger event — backend infra handoff |
| 4 | ID Issue Date < Expiry Date (cross-field) | #15 | No validator (plan: "Cross-field Zod needed") | ยืนยัน rule exact wording: `issueDate < expiryDate` strict หรือ `≤`? allow blank? |
| 5 | VN Issue Place conditional (nationality=VN only) | #16 | ✅ shipped (ironteam #45 R3) | BA ยืนยัน implementation match spec — review UI preview |
| 6 | Military status gender gate | #27 | Always shown (plan: "BA confirmation on rule needed") | ยืนยัน rule wording — MILITARY status only for male? หรือ optional visible to all genders? |
| 7 | Probation Day 119 auto-pass + 30/75/90 mail | #117 | No cron (plan: "Real cron infra + mail service") | backend mail infra handoff + ยืนยัน timing (30/75/90 วัน = business days หรือ calendar?) |
| 8 | BA workbook B-action sheets (7 sheets missing) | — | ไม่ครอบคลุม — BA sheet ปัจจุบันมีแค่ Employee file (Hire) | เขียน sheet เพิ่ม 7 B-actions ตาม field list ใน `BA-AUDIT-BACTIONS-2026-04-24.md` (Transfer / Terminate / Contract Renewal / Rehire / Promotion / Acting / Probation) |

**Total**: 8 open items — 6 BRD rules deferred + 1 BA confirmation (VN Issue Place) + 1 BA workbook gap

---

## §3 Duplicate-Risk Routes (RIS + BA joint decision)

Source: `PLACEHOLDER-AUDIT-2026-04-24.md` Section 2, 2 routes flagged as duplicate-risk.

| Route set | Current Status | Ken recommendation | BA Decision | RIS Decision |
|-----------|---------------|--------------------|-------------|--------------|
| `/recruiting` vs `/recruitment` + `/screening` | 3 routes overlap; `/recruiting` = 17-line i18n placeholder, `/recruitment` = ✅ requisition+candidate list (213 lines), `/screening` = ✅ kanban 5-stage (88 lines) | Consider merge → keep `/recruitment` as canonical recruiting hub, hide `/recruiting` (duplicate) + keep `/screening` as sub-page | _(blank — BA fill)_ | _(blank — RIS fill)_ |
| `/reports` (top-level) vs `/admin/reports` | 2 routes; top-level = 17-line i18n placeholder, `/admin/reports` = ✅ shipped EC report hub | Hide top-level `/reports` (since `/admin/reports` เป็น canonical EC report hub) | _(blank — BA fill)_ | _(blank — RIS fill)_ |

**Decision matrix** ให้ BA + RIS เคาะร่วมกัน — hide / merge / keep per row. หากเห็นว่าต้องมี ESS (Employee Self-Service) report view แยกจาก admin → keep top-level แต่ enrich ด้วย ESS-scope content; ถ้าไม่ → hide

---

## §4 Event Reason Picklist Alignment

เปรียบเทียบ event reasons ที่ code ใช้ per B-action vs SF picklist master `EventReasonAll.json` (373 entries) + action-specific files (`EventReasonHire.json`, `EventReasonTerm.json`, `EventReasonTrans.json`).

**Finding (critical)**: B-action page.tsx files **ไม่ได้ import enums จาก `lifecycleSchema.ts`** — schema มี constants (`REHIRE_EVENT_REASONS`, `TRANSFER_EVENT_REASONS`, `TERMINATION_EVENT_REASONS`) แต่ page.tsx ใช้ free-text textarea หรือ inline custom list แทน. grep `REHIRE_EVENT_REASONS` ใน `src/frontend/` เจอแค่ใน `lifecycleSchema.ts` เอง + test file — **schema enums ไม่ได้ wire เข้า UI**.

| Action | Code picklist source | Entries used | SF picklist entries expected | Extra code-only values | Missing in SF | Verdict |
|--------|----------------------|---------------|------------------------------|------------------------|---------------|---------|
| Hire | `PICKLIST_EVENT_REASON_HIRE` (wired to `EventReasonHire.json`) | H_NEWHIRE, H_RPLMENT, H_TEMPASG, HIREDM, H_CORENTRY, H_INENTRY | same 6 (EventReasonHire.json) | — | — | ✅ aligned |
| Transfer | **Free-text textarea** (no picklist wired) | _(user-typed string in `movement.reason`)_ | TRN_TRNWIC, TRN_TRNACCOMP, TRN_ROTATION (EventReasonTrans.json) | — | 3 (SF codes not selectable in UI) | ❌ custom — schema has enum but UI uses free-text |
| Terminate | **Inline const `TERMINATION_REASONS`** (5 codes) | RESIGN, RETIRE, LAYOFF, MISCONDUCT, CONTRACT_END | 17 codes in EventReasonTerm.json (TERM_RESIGN, TERM_RETIRE, TERM_LAYOFF, ...) | 5 code-only values (unprefixed) | 12 SF codes unused (TERM_DISMISS, TERM_ERLRETIRE, TERM_REORG, TERM_REDUNDANCY, TERM_ENDASSIGN, TERM_UNSUCPROB, TERM_PASSAWAY, TERM_NOSHOW, TERM_TRANS, TERM_DM, TERM_COVID, TERM_CRISIS, TERM_ABSENT) | ❌ diverged — code uses `RESIGN` but SF uses `TERM_RESIGN`; only 5/17 SF codes represented |
| Contract Renewal | **Free-text textarea** (`renewalReason` optional) | _(user-typed string)_ | no dedicated SF picklist (BRD #93 custom event) | — | — | 🟡 no picklist defined in SF — free-text acceptable but BA confirm |
| Rehire | **Free-text textarea** (no picklist wired) | _(user-typed string in `rehire.reason`)_ | RE_REHIRE_LT1, RE_REHIRE_GE1 (lifecycleSchema.ts line 6, Appendix 2 event=5584) | — | 2 (auto-classify codes not exposed) | ❌ custom — schema auto-classifies LT1/GE1 but UI doesn't expose picklist |
| Promotion | **Free-text textarea** (`movement.reason`) | _(user-typed string)_ | no explicit SF promotion picklist found (likely subset of `EventReasonAll.json`) | — | — (unknown) | 🟡 BA confirm — does SF have promotion event reasons or is free-text OK? |
| Acting | **Free-text textarea** | _(user-typed string)_ | no explicit SF acting picklist found | — | — (unknown) | 🟡 BA confirm |
| Probation | **Free-text textarea** (optional notes) | _(user-typed string)_ | COMPROB_COMPROB (EventReasonAll.json, id=2) for pass-outcome | — | 1 (pass-event code not wired) | 🟡 probation outcome has SF code but UI doesn't emit it |

**Verdict legend**: ✅ aligned / 🟡 partial mismatch / ❌ code uses values not in SF (or code bypasses SF picklist entirely)

**Tally**: 1 ✅ / 3 🟡 / 4 ❌

**BA action**: review 🟡/❌ rows:
- **Terminate (❌)**: code ใช้ `RESIGN` / `RETIRE` / `LAYOFF` / `MISCONDUCT` / `CONTRACT_END` แต่ SF ใช้ prefix `TERM_*`. BA เคาะ — (a) code แก้ให้ match SF codes (recommended) หรือ (b) BA เพิ่มรูปแบบ unprefixed เข้า SF?
- **Transfer / Rehire (❌)**: `lifecycleSchema.ts` มี enum พร้อมใช้ (REHIRE/TRANSFER) แต่ UI ใช้ free-text. Ken recommend = wire schema enums เข้า `<select>` ใน Sprint 2 — BA ยืนยัน 3 transfer codes + 2 rehire codes เพียงพอหรือเปล่า
- **Contract Renewal / Promotion / Acting / Probation (🟡)**: BA ยืนยันว่า SF มี dedicated picklist สำหรับ action เหล่านี้หรือไม่ (ถ้ามี = wire; ถ้าไม่มี = free-text OK แต่ต้อง note ใน BA workbook)

---

## §5 Summary & Next Steps

BA ควรทำ 3 เรื่องหลังอ่าน doc นี้:

1. **Decide §3 duplicate routes** — `/recruiting` (hide/merge/keep) + `/reports` top-level (hide/keep) — per row. ถ้าต้องการคุยกับ RIS ก่อน = schedule Apr W4 review
2. **Answer §2 open-issues** (8 items) — โดยเฉพาะ BRD #5/#9/#15/#27 ซึ่ง block Sprint 2 validator work; #14/#117 block backend kick-off; #6 (B-action workbook sheets) = BA write-up ของตัวเอง
3. **Resolve §4 event-reason alignment** — especially Terminate ❌ (code codes ≠ SF codes — ต้องมี canonical); Transfer+Rehire ❌ (wire schema enum → UI picklist ใน Sprint 2)

**Deliver BA packet** ให้ BA team:
1. BA-REVIEW-PREP-2026-04-24.md (this doc)
2. BA-AUDIT-BACTIONS-2026-04-24.md (companion — forward-facing field gap catalog)
3. EC-FIELD-AUDIT-2026-04-24.md (Hire 37 fields)
4. RIS-WALKTHROUGH-2026-04-24.md (route journey for design review)
5. PLACEHOLDER-AUDIT-2026-04-24.md (24 routes placeholder status)
6. BRD-COVERAGE-MATRIX-2026-04-24.md (207 BRDs + 28 reports)

---

## Source Trace (C8 — all claims traceable)

- §1 file metadata: `ls -la` output 2026-04-24 (both repos verified byte-identical 4,304,720)
- §1 fetch date: `BA-EC-SUMMARY.md` line 5 ("Fetched: 2026-04-23 via browser-harness")
- §2 BRD #5/#9/#14/#15/#16/#27/#117: `BRD-COMPREHENSIVE-PLAN-2026-04-24.md` §"BRD rules deferred / partial" lines 108-118
- §3 duplicate-risk: `PLACEHOLDER-AUDIT-2026-04-24.md` Section 2 rows `/recruiting` (line 62) + `/reports` (line 63)
- §4 Hire picklist: `src/frontend/src/app/[locale]/admin/hire/steps/StepIdentity.tsx:230` (`PICKLIST_EVENT_REASON_HIRE`)
- §4 lifecycleSchema enums: `src/frontend/src/lib/admin/validation/lifecycleSchema.ts` lines 6, 10, 14-32
- §4 lifecycleSchema unused in UI: `grep -rln "REHIRE_EVENT_REASONS\|TRANSFER_EVENT_REASONS\|TERMINATION_EVENT_REASONS" src/frontend/` returns only schema file + test file
- §4 Terminate custom const: `src/frontend/src/app/[locale]/admin/employees/[id]/terminate/page.tsx:37-43`
- §4 SF picklists: `src/services/shared/src/picklists/data/EventReasonHire.json` (6 entries), `EventReasonTerm.json` (17 entries), `EventReasonTrans.json` (3 entries), `EventReasonAll.json` (373 entries)
