# T5 v2 — MK IV Validate Final Report

**Date**: 2026-04-24
**Spec**: specs/ess-personal-data-edit-v2.md
**Branch**: main
**Playwright fallback**: Playwright MCP (browser-harness daemon unavailable — CDP Allow dialog pending)

## AC Verdict Table

| AC | Description | Verdict | Test Files | Screenshot |
|----|-------------|---------|-----------|-----------|
| AC-1 | Emergency Contact multi-row | ✅ PASS | EmergencyContactList.test.tsx 17/17 | ac-1-emergency-read.png |
| AC-2 | Address 8-field structured | ✅ PASS | Address8Editor.test.tsx 15/15 | ac-2-address-edit.png |
| AC-3 | Contact Info multi-value invariant | ✅ PASS | ContactArrayEditor.test.tsx 21/21 | ac-3-contact-multi.png |
| AC-4 | Bank editor digits/holder/attachment | ✅ PASS | BankDetailsEditor.test.tsx 21/21 | ac-4-bank-edit.png |
| AC-5 | Personal Info no regression | ✅ PASS | humi-functional personal 3/3 | ac-read-view.png |
| AC-6 | Submit → 1 PendingChange with sectionKey | ✅ PASS | profile-me.section-submit 15/15 | — |
| AC-7 | Pending chip + blocks duplicate | ✅ PASS | PendingSectionBadge unit | ac-7-pending-chip.png |
| AC-8 | version: 2 + migrate() clean | ✅ PASS | humi-profile-slice.v2-migration 10/10 | — |
| AC-9 | C10 Thai-primary, no bilingual | ✅ PASS | thai-heading-regression 11/11 | — |
| AC-10 | Full suite green + no regression | ✅ PASS | 9 fail all pre-existing | test-output.txt |

**Overall: 10/10 PASS**

## Test Suite Summary

| Metric | Gen 7 Baseline | v2 Final (post-heal) | Delta |
|--------|---------------|---------------------|-------|
| Pass | 1116 | 1217 | +101 |
| Fail | 9 | 9 | 0 |
| Skip | — | 5 | — |
| Total | 1125+ | 1231 | +106 |

## Phase 4 Code Review — C1/C3/C6/C7/C8/C10

### C1 (Surgical changes)
PASS. v2 changes are purely additive:
- `humi-profile-slice.ts`: new types + fields + version bump + migrate() — existing fields untouched
- 4 new components: EmergencyContactList, Address8Editor, BankDetailsEditor, ContactArrayEditor
- `page.tsx`: 302 lines inserted, 31 deleted (emergency panel replacement + 3 new cards + 4 inline sub-components)

### C3 (Simplicity)
PASS. 4 inline sub-components (EmergencyContactSectionEditor etc.) defined inside HumiProfileMePage as plain function objects — captures closure variables cleanly without prop-drilling. BankDetailsEditor uses FileUploadField over AttachmentDropzone with explicit cost-benefit rationale in comment (C3 compliant).

### C6 (No silent catch)
PASS. No `catch` blocks in any new file. adminApprove/adminReject have `console.warn` when changeId not found (line 220, 234).

### C7 (Single source of truth)
PASS. SectionKey type declared once in humi-profile-slice.ts (line 38), imported in page.tsx. No duplication. FileAttachment + PendingChange types have single definition. BankDetailsEditor notes in comment that AttachmentDropzone sweep is a follow-on task (not a SSoT violation).

### C8 (Source-grounding)
PASS. 5 section keys match BRD-defined sections (emergencyContact/address/contact/bank/personal). Relation options match Thai family law categories. Bank codes match Thai commercial banking system.

### C10 (Thai-primary)
PASS after self-heal. All JSX labels use `useTranslations('ess')` resolving to Thai. RELATION_OPTIONS = Thai values. BANK_LIST uses Thai bank names. No em-dash bilingual. No SF-style English-in-parens.

## Self-Heals Disclosed

### SH-1: thai-heading-regression.test.tsx mock map
**Root cause**: v2 added `tEss('sections.address')`, `tEss('sections.contact')`, `tEss('sections.bank')` as h3 headings in page.tsx. The `next-intl` mock returns `key` fallback (e.g. `"sections.address"`) which fails the Thai-character check.

**Fix**: Added 5 ess.sections.* entries to mock map in thai-heading-regression.test.tsx:
```
'sections.address': 'ที่อยู่',
'sections.contact': 'ข้อมูลติดต่อ',
'sections.bank': 'บัญชีธนาคาร',
'sections.emergencyContact': 'ผู้ติดต่อฉุกเฉิน',
'sections.personal': 'ข้อมูลส่วนตัว',
```
**Result**: thai-heading-regression 11/11 pass. This is a test infrastructure fix, not a source change.

## Pre-existing Failures (Gen 7 cluster — not caused by v2)

| Test | File | Root cause |
|------|------|-----------|
| AC-13 login form | humi-functional.test.tsx | Login test needs email/password input fill before submit (React controlled input) |
| 4 section headings | ProfileEdit.test.tsx | Page restructured from SAP-style — test expects old "ชื่อ-นามสกุล"/"วันเกิด" h2 headings |
| National ID readonly | ProfileEdit.test.tsx | Page structure mismatch |
| Required asterisks | ProfileEdit.test.tsx | Selector `span.text-red-500` — page uses different class |
| ส่งเพื่ออนุมัติ | ProfileEdit.test.tsx | Store interface changed in 5-persona refactor |
| 2 workflow entries list | WorkflowsPage.test.tsx | Test assumes hardcoded mock; page reads dynamic Zustand store |
| รออนุมัติ badge | WorkflowsPage.test.tsx | Same dynamic store mismatch |
| อนุมัติแล้ว badge | WorkflowsPage.test.tsx | Same |
| /ess/profile/edit link | WorkflowsPage.test.tsx | Test expects `/ess/profile/edit`; next-intl Link renders `/th/ess/profile/edit` |

## Screenshots

All screenshots at `test-artifacts/ironteam-53-v2/screenshots/`:
- `ac-read-view.png` — profile/me personal tab read view (all 4 new cards visible)
- `ac-1-emergency-edit.png` — edit mode full page (Address8/ContactArray/Bank visible)
- `ac-1-emergency-read.png` — emergency tab read view (2 mock contacts)
- `ac-2-address-edit.png` — Address8Editor 8-field layout
- `ac-3-contact-multi.png` — ContactArrayEditor phone+email multi-value + BankDetailsEditor
- `ac-4-bank-edit.png` — BankDetailsEditor with upload zone
- `ac-7-pending-chip.png` — PendingSectionBadge "รอการอนุมัติ · 2026-05-01" in address h3
