# Test Report — ironteam #54 (ESS Change Request Approver)

**Date**: 2026-04-25  
**Validator**: MK IV (Phase 4 Code Review + Phase 5 Validate)  
**Suite result**: 1237 pass / 9 fail / 5 skip  
**Baseline post-#53**: 1217 pass / 9 fail  
**Net delta**: +20 new tests, 0 regression

---

## AC Verdict Table

| AC | Description | Verdict | Evidence |
|----|-------------|---------|----------|
| AC-1 | /admin/change-requests renders pending list (sectionKey group, diff, effectiveDate, attachments count) | PASS | screenshot + vitest |
| AC-2 | อนุมัติ/ปฏิเสธ buttons open ReasonModal; confirm calls With-Reason actions | PASS | screenshot + vitest |
| AC-3 | Slice extended: adminApproveWithReason + adminRejectWithReason + PendingChange.reason?; legacy wrappers preserved | PASS | code review + vitest |
| AC-4 | List groups by sectionKey with Thai labels; no-sectionKey falls to personal; empty state | PASS | screenshot + vitest |
| AC-5 | Approved/rejected in ประวัติคำขอ section; read-only; status chip + approvedAt + reason | PASS | screenshot + vitest |
| AC-6 | Live Zustand subscription — pending decrement + history increment without refresh | PASS | screenshot + vitest |
| AC-7 | Attachments shown as clickable filenames (base64 open new tab) + formatBytes | PASS | code review |
| AC-8 | C10 Thai-primary — all new strings via ess.approver.* i18n; no bilingual duplicates | PASS | code review |
| AC-9 | 3 test files, 20 assertions; min 1 pass per AC-1/2/3/4/6 | PASS | test-output.txt |
| AC-10 | No regression vs post-#53 baseline; +20 new tests | PASS | test-output.txt |

**Overall: 10/10 PASS**

---

## Test File Mapping

| Test File | Tests | ACs Covered |
|-----------|-------|-------------|
| `src/__tests__/approver-list.test.tsx` | 5 | AC-1, AC-4, AC-6 |
| `src/__tests__/reason-modal.test.tsx` | 8 (Tests 1-7 + 5b) | AC-2 |
| `src/__tests__/humi-profile-slice.approve-reject.test.ts` | 7 | AC-3 |

---

## Screenshot References

| Screenshot | Path | What it shows |
|-----------|------|---------------|
| ac-2-list-pending.png | test-artifacts/ironteam-54/screenshots/ac-2-list-pending.png | Pending list with 1 item grouped by ที่อยู่, badge=1 |
| ac-3-approve-modal.png | test-artifacts/ironteam-54/screenshots/ac-3-approve-modal.png | ReasonModal open in approve mode, ยืนยัน button enabled |
| ac-4-reject-modal.png | test-artifacts/ironteam-54/screenshots/ac-4-reject-modal.png | ReasonModal open in reject mode, required-reason warning visible |
| ac-5-history-section.png | test-artifacts/ironteam-54/screenshots/ac-5-history-section.png | Empty pending + ประวัติคำขอ with อนุมัติแล้ว badge (live update) |
| ac-1-list-empty-with-history.png | test-artifacts/ironteam-54/screenshots/ac-1-list-empty-with-history.png | 2 pending groups (ข้อมูลส่วนตัว+ข้อมูลติดต่อ) + history section |

Note: Screenshots captured via Playwright MCP (browser-harness fallback — CDP Allow dialog timeout).

---

## Code Review Findings (Phase 4)

### C1 Surgical — PASS
- 3 new files created under correct paths; humi-profile-slice.ts touched minimally (~8 lines for reason field + 2 actions + 2 legacy wrappers)
- No edits to use-workflows, workflow-approvals, or any pre-existing components
- SECTION_ORDER in page.tsx hardcoded constant (not abstracted) — appropriate for 5 fixed values per C3

### C3 Simplicity — PASS
- 1 page + 1 card component + 1 modal = exactly the spec
- No tab/filter abstraction beyond what was needed
- formatDate utility defined twice (page.tsx + ChangeRequestCard.tsx) — minor duplication, acceptable per C3 (simple inline helper, not worth abstracting for 2 consumers)

### C6 No Silent Catch — PASS
- formatDate try/catch returns `iso` on error (safe fallback, not silent)
- adminApproveWithReason/adminRejectWithReason both have `console.warn` on not-found guard

### C7 SSoT — PASS
- No parallel approval store created
- All pending change state consumed from useHumiProfileStore exclusively
- adminApprove/adminReject preserved as thin wrappers

### C8 Source-Grounded — PASS
- All 5 sectionKeys from #53 spec used verbatim
- Section Thai labels match ess.sections.* i18n keys (pre-existing from #53)
- No invented fields or features

### C10 Thai-Primary — PASS
- th.json ess.approver.*: 15 keys, all Thai values
- Action labels: อนุมัติ/ปฏิเสธ/ยืนยัน/ยกเลิก (no English)
- No SF-style parens, no em-dash bilingual, no English verbs in labels

### Out-of-scope untouched — PASS
- /workflows/page.tsx: not touched (confirmed via grep)
- /ess/workflows/page.tsx: not touched
- workflow-approvals store: not touched

---

## JARVIS Self-Heal Disclosures (Phase 3b — Test Selector Patches)

JARVIS patched `approver-list.test.tsx` during Phase 3b to align with component rendering:

| # | File:line | Before | After | Reason |
|---|-----------|--------|-------|--------|
| 1 | approver-list.test.tsx:215-217 | `getAllByTestId('card').length` | `for i in 0..4: getByText(/ฟิลด์-${i}/)` | humi Card primitive renders no `data-testid="card"` — test mock adds it but real component doesn't expose it for length counting; field labels are the stable assertion |
| 2 | approver-list.test.tsx:210-211 | `getByText(ess.sections.${sk})` | `getAllByText(...).length >= 1` | both group `<h2>` heading and card inline badge render the same section key text — single-match assertion fails |
| 3 | approver-list.test.tsx:227, 249-250 | exact `getByText('ชื่อ')` | regex `getByText(/ชื่อ/)` | component renders `{cr.field}: {cr.newValue}` as one text node — exact 'ชื่อ' not found standalone |

These patches align test assertions with actual component rendering behavior. No source logic was changed.

---

## Pre-existing Failures (not related to #54)

9 failing tests are all pre-existing from before #53:

- `WorkflowsPage.test.tsx` — 8 failures: `toHaveAttribute('href', '/ess/profile/edit')` vs actual `/th/ess/profile/edit` (locale prefix mismatch in test setup, not #54 scope)
- 1 other failure: `screen.getByText('อนุมัติแล้ว')` from same file

These existed in the post-#53 baseline (9 fail) and are unchanged by #54.
