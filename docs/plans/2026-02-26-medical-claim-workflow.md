# Medical Claim Workflow (เบิกค่ารักษาพยาบาลแบบย้อนหลัง) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the existing `smart-claims` module into a proper retroactive medical claim workflow (เบิกค่ารักษาพยาบาลแบบย้อนหลัง — no referral letter). Rename routes, update data model for medical-specific fields, replace OCR wizard with a standard claim form + document upload, and add multi-step approval timeline.

**Architecture:** Refactor in-place — rename `smart-claims` → `benefits`, update existing components rather than creating from scratch. Keep the same page/hook/component patterns. Add medical-specific fields (disease category, hospital, treatment date) and document upload (receipt + medical certificate). Replace OCR step with simpler form wizard.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, lucide-react, next-intl (existing stack)

---

## ASCII Overview

### Before vs After

```
BEFORE (smart-claims)                    AFTER (benefits / medical claims)
─────────────────────                    ─────────────────────────────────
Route: /smart-claims                     Route: /benefits
Module: smart-claims                     Module: benefits
i18n: smartClaims.*                      i18n: medicalClaims.*

Tabs:                                    Tabs:
  [New Claim] [History] [YTD]             [Overview] [New Claim] [Claim History]

New Claim Flow:                          New Claim Flow:
  Step 1: Upload Receipt (OCR)            Step 1: Claim Info (form fields)
  Step 2: AI OCR Result                   Step 2: Upload Documents
  Step 3: Claim Details                   Step 3: Review & Submit

Claim Types:                             Disease Categories:
  medical | travel | meal                  general | dental | vision |
                                           maternity | accident | chronic |
                                           mental_health | other

Documents: single receipt                Documents: receipt + medical cert + other

Approval: simple status                  Approval: multi-step timeline
  draft → submitted → approved             draft → submitted → pending_manager
                                           → pending_hr → approved/rejected
```

### User Flow

```
+──────────────────+     +──────────────────+     +──────────────────+
│                  │     │                  │     │                  │
│  Benefits Page   │────>│  Start a Claim   │────>│  Fill Form       │
│  (Overview Tab)  │     │  (New Claim Tab) │     │  Step 1: Info    │
│                  │     │                  │     │                  │
+──────────────────+     +──────────────────+     +────────+─────────+
                                                           │
                                                           v
+──────────────────+     +──────────────────+     +──────────────────+
│                  │     │                  │     │                  │
│  Claim History   │<────│  Save / Submit   │<────│  Upload Docs     │
│  (Track Status)  │     │  Step 3: Review  │     │  Step 2: Attach  │
│                  │     │                  │     │                  │
+──────────────────+     +──────────────────+     +──────────────────+
        │
        v
+──────────────────+
│  Claim Detail    │
│  Modal           │
│  (Approval       │
│   Timeline)      │
+──────────────────+
```

### Claim Status Lifecycle

```
                    auto (<=1,000 THB)
                   +────────────────────+
                   │                    │
                   v                    │
+───────+    +───────────+    +-----------------+    +──────────+
│ draft │───>│ submitted │───>│ pending_manager │───>│ approved │
+───────+    +───────────+    +-----------------+    +──────────+
                                      │
                                      v
                              +--------------+    +──────────+
                              │  pending_hr  │───>│ approved │
                              +--------------+    +──────────+
                                      │
                                      v
                              +-----------+
                              │ rejected  │
                              +-----------+
```

### Component Tree (Refactored)

```
app/[locale]/benefits/page.tsx              (RENAME from smart-claims)
  └── PageLayout (module="benefits")
        └── MedicalClaimsPage               (REFACTOR from SmartClaimsPage)
              ├── StatsBar (4 summary cards)
              ├── Tabs [Overview | New Claim | Claim History]
              │
              ├── [Overview Tab] ──── NEW
              │     ├── BenefitSummaryCards (plan type, limit, used/remaining)
              │     ├── RecentClaimsPreview (last 3 claims)
              │     └── "Start a Claim" CTA button
              │
              ├── [New Claim Tab] ── REFACTOR wizard steps
              │     ├── StepIndicator (1─2─3)    (KEEP, rename labels)
              │     │
              │     ├── Step 1: ClaimInfoForm     (REPLACE OCR upload)
              │     │     ├── Disease Category (select) ← NEW
              │     │     ├── Disease Details (textarea) ← NEW
              │     │     ├── Hospital / Clinic (text) ← REPLACES merchant
              │     │     ├── Treatment Date (date) ← REPLACES receiptDate
              │     │     ├── Receipt Amount (number) ← KEEP
              │     │     ├── Claim Amount (number) ← NEW (auto-calc)
              │     │     └── Remarks (textarea) ← KEEP as notes
              │     │
              │     ├── Step 2: DocumentUpload    (REPLACE OCR result)
              │     │     ├── Receipt upload (required)
              │     │     ├── Medical Certificate upload (required)
              │     │     └── Additional Documents (optional)
              │     │
              │     └── Step 3: ReviewAndSubmit   (REFACTOR from step 3)
              │           ├── Claim summary (read-only)
              │           ├── Document list
              │           ├── Policy check (annual limit)
              │           └── Original docs reminder alert
              │
              ├── [Claim History Tab] ── REFACTOR
              │     ├── Status filter pills (All | Pending | Approved | Rejected)
              │     ├── ClaimHistoryTable (desktop) ← REFACTOR columns
              │     ├── ClaimHistoryCards (mobile) ← REFACTOR fields
              │     └── ClaimDetailModal ← REFACTOR
              │           ├── Claim info (medical fields)
              │           ├── Document list
              │           └── Multi-step Approval Timeline ← NEW
              │
              └── Sidebar: PolicyLimitsCard ← REFACTOR to annual benefit limit
```

### File Changes Map

```
RENAME / MOVE:
  app/[locale]/smart-claims/         → app/[locale]/benefits/
  app/[locale]/smart-claims/page.tsx → app/[locale]/benefits/page.tsx
  (DELETE smart-claims/claims/ and smart-claims/history/ sub-routes)

REFACTOR IN-PLACE:
  components/claims/smart-claims-page.tsx  → components/claims/medical-claims-page.tsx
  hooks/use-claims.ts                      → hooks/use-medical-claims.ts
  (other components/claims/*.tsx — update or remove as needed)

UPDATE REFERENCES:
  components/shared/sidebar.tsx      ← href, label, module
  components/shared/mobile-menu.tsx  ← href, label, module
  lib/rbac.ts                        ← module key
  messages/en.json                   ← rename smartClaims → medicalClaims
  messages/th.json                   ← rename smartClaims → medicalClaims

REMOVE (no longer needed):
  components/claims/OCRResultCard.tsx
  components/claims/ReceiptUploader.tsx
  lib/claims-api.ts                  (backend API client, not used with mock)
```

### Data Model Change

```
BEFORE (ClaimRequest)                  AFTER (MedicalClaim)
─────────────────────                  ─────────────────────
id                                     id
claimType (medical|travel|meal)        diseaseCategory (general|dental|...)
amount                                 receiptAmount
                                       claimAmount ← NEW
currency                               (removed, always THB)
receiptDate                            treatmentDate ← RENAME
receiptUrl                             (removed)
receiptFileName                        (removed, use documents[])
ocrResult                              (removed, no OCR)
policyChecks                           (removed, inline check)
merchant                               hospitalName ← RENAME
notes                                  remarks ← RENAME
                                       diseaseDetails ← NEW
                                       documents[] ← NEW (multi-file)
                                       approvalSteps[] ← NEW (timeline)
status (5 states)                      status (7 states, with pending_*)
submittedAt                            submittedAt
approvedAt                             approvedAt
approvedBy                             (moved to approvalSteps)
rejectionReason                        rejectionReason
                                       rejectedAt ← NEW
                                       createdAt ← NEW
                                       updatedAt ← NEW

NEW: MedicalBenefitSummary
  planType, annualLimit, usedAmount, remainingAmount
```

### Approval Flow

```
Employee submits claim
        │
        v
+──────────────────+
│ Manager Approval │  (Step 1)
│ Surachai P.      │
+────────+─────────+
         │
    approve / reject
         │
         v
+──────────────────+
│ HR Approval      │  (Step 2)
│ Parichat S.      │
+────────+─────────+
         │
    approve / reject
         │
         v
   [approved] or [rejected]
```

---

## Task 1: Rename route `smart-claims` → `benefits` and update all references

**Files:**
- Move: `src/frontend/src/app/[locale]/smart-claims/` → `src/frontend/src/app/[locale]/benefits/`
- Modify: `src/frontend/src/components/shared/sidebar.tsx` (line 61)
- Modify: `src/frontend/src/components/shared/mobile-menu.tsx` (line 82)
- Modify: `src/frontend/src/lib/rbac.ts` (line 38)

**Step 1: Move route directory**

```bash
cd src/frontend
mv src/app/\[locale\]/smart-claims src/app/\[locale\]/benefits
```

Delete the sub-routes we won't need (claims/ and history/ will be tabs instead):
```bash
rm -rf src/app/\[locale\]/benefits/claims
rm -rf src/app/\[locale\]/benefits/history
```

**Step 2: Update `benefits/page.tsx`**

```typescript
'use client';

import { PageLayout } from '@/components/shared/page-layout';
import { MedicalClaimsPage } from '@/components/claims/medical-claims-page';

export default function BenefitsPage() {
  return (
    <PageLayout module="benefits">
      <MedicalClaimsPage />
    </PageLayout>
  );
}
```

**Step 3: Update sidebar.tsx line 61**

Change:
```typescript
{ href: '/smart-claims', label: t('smartClaims.title'), icon: <Receipt className="h-5 w-5" />, module: 'smart-claims' },
```
To:
```typescript
{ href: '/benefits', label: t('medicalClaims.title'), icon: <Receipt className="h-5 w-5" />, module: 'benefits' },
```

**Step 4: Update mobile-menu.tsx line 82**

Same change as sidebar:
```typescript
{ href: '/benefits', label: t('medicalClaims.title'), icon: <Receipt className="h-5 w-5" />, module: 'benefits' },
```

**Step 5: Update rbac.ts line 38**

Change:
```typescript
'smart-claims': ['employee', 'manager', 'hr_admin', 'hr_manager'],
```
To:
```typescript
'benefits': ['employee', 'manager', 'hr_admin', 'hr_manager'],
```

**Step 6: Commit**

```bash
git add -A
git commit -m "refactor: rename smart-claims route to benefits and update nav/rbac references"
```

---

## Task 2: Refactor `use-claims.ts` → `use-medical-claims.ts` with medical-specific types and mock data

**Files:**
- Rewrite: `src/frontend/src/hooks/use-claims.ts` → `src/frontend/src/hooks/use-medical-claims.ts`

**Step 1: Create `use-medical-claims.ts` with new types**

Replace the existing hook. Key changes from `use-claims.ts`:
- `ClaimType` → `DiseaseCategory` (general, dental, vision, maternity, accident, chronic, mental_health, other)
- `ClaimRequest` → `MedicalClaim` (add diseaseCategory, diseaseDetails, hospitalName, treatmentDate, receiptAmount, claimAmount, documents[], approvalSteps[])
- Remove OCR-related types/functions (`OcrResult`, `simulateOcr`, `processReceipt`)
- Remove `ClaimPolicy` / policy checking (replaced by simple annual limit check)
- Add `MedicalBenefitSummary` (planType, annualLimit, usedAmount, remainingAmount)
- Add `ClaimDocument` type and `addDocument` / `removeDocument` functions
- Add `ApprovalStep` type for multi-step approval timeline
- `MedicalClaimStatus` adds `pending_manager`, `pending_hr` states
- Add `DISEASE_CATEGORIES` constant with EN/TH labels
- Mock data: 6 claims with realistic Thai hospital names and approval steps

Keep the same hook pattern: `useState`, `useEffect` with setTimeout, `useCallback` for mutations.

Full implementation in original plan's Task 1 code block — copy that entire hook.

**Step 2: Delete old `use-claims.ts`**

```bash
rm src/frontend/src/hooks/use-claims.ts
```

**Step 3: Verify no TypeScript errors**

```bash
cd src/frontend && npx tsc --noEmit 2>&1 | head -20
```

(Will have errors from components still importing old hook — expected, fixed in next tasks)

**Step 4: Commit**

```bash
git add src/frontend/src/hooks/use-medical-claims.ts
git rm src/frontend/src/hooks/use-claims.ts
git commit -m "refactor: replace use-claims hook with use-medical-claims (medical-specific types and mock data)"
```

---

## Task 3: Update i18n — rename `smartClaims` → `medicalClaims` with medical-specific translations

**Files:**
- Modify: `src/frontend/messages/en.json`
- Modify: `src/frontend/messages/th.json`

**Step 1: Replace `smartClaims` key with `medicalClaims` in en.json**

Remove the entire `"smartClaims": { ... }` block and replace with `"medicalClaims"` block containing:

```json
"medicalClaims": {
  "title": "Medical Benefits",
  "subtitle": "Retroactive medical claim (without referral letter)",
  "tabs": {
    "overview": "Overview",
    "newClaim": "New Claim",
    "history": "Claim History"
  },
  "overview": {
    "planType": "Plan Type",
    "annualLimit": "Annual Limit",
    "used": "Used",
    "remaining": "Remaining",
    "recentClaims": "Recent Claims"
  },
  "form": {
    "stepInfo": "Claim Information",
    "stepDocuments": "Upload Documents",
    "stepReview": "Review & Submit",
    "diseaseCategory": "Disease Category",
    "diseaseDetails": "Disease Details",
    "hospitalName": "Hospital / Clinic Name",
    "treatmentDate": "Treatment Date",
    "receiptAmount": "Receipt Amount (THB)",
    "claimAmount": "Claim Amount (THB)",
    "remarks": "Remarks",
    "selectCategory": "Select disease category",
    "enterHospital": "e.g. Bangkok Hospital",
    "enterDetails": "Describe illness or treatment",
    "enterRemarks": "Additional notes (optional)",
    "next": "Next",
    "back": "Back",
    "saveDraft": "Save Draft",
    "submitClaim": "Submit Claim"
  },
  "upload": {
    "receipt": "Receipt",
    "receiptTh": "(ใบเสร็จ)",
    "medicalCert": "Medical Certificate",
    "medicalCertTh": "(ใบรับรองแพทย์)",
    "additionalDocs": "Additional Documents",
    "dragDrop": "Drag & drop or click to upload",
    "maxSize": "Max 10MB per file (JPG, PNG, PDF)",
    "required": "Required",
    "optional": "Optional",
    "remove": "Remove"
  },
  "review": {
    "title": "Review Your Claim",
    "claimInfo": "Claim Information",
    "attachedDocs": "Attached Documents",
    "policyCheck": "Policy Check",
    "withinLimit": "Within annual limit",
    "exceedsLimit": "Exceeds annual limit",
    "confirmSubmit": "By submitting, you confirm the information is accurate. Please bring original documents to HR.",
    "originalDocsReminder": "Remember to submit original documents to HR Department"
  },
  "history": {
    "title": "Claim History",
    "filterAll": "All",
    "filterPending": "Pending",
    "filterApproved": "Approved",
    "filterRejected": "Rejected",
    "noClaims": "No claims found",
    "createFirst": "Submit your first medical claim to get started",
    "viewDetail": "View Details"
  },
  "status": {
    "draft": "Draft",
    "submitted": "Submitted",
    "pending_manager": "Pending Manager",
    "pending_hr": "Pending HR",
    "processing": "Processing",
    "approved": "Approved",
    "rejected": "Rejected"
  },
  "detail": {
    "claimId": "Claim ID",
    "status": "Status",
    "treatmentDate": "Treatment Date",
    "hospital": "Hospital / Clinic",
    "disease": "Disease / Illness",
    "receiptAmount": "Receipt Amount",
    "claimAmount": "Claim Amount",
    "remarks": "Remarks",
    "documents": "Documents",
    "approvalTimeline": "Approval Timeline",
    "rejectionReason": "Rejection Reason",
    "submittedDate": "Submitted Date",
    "approvedDate": "Approved Date"
  },
  "startClaim": "Start a Claim",
  "validation": {
    "hospitalRequired": "Hospital name is required",
    "diseaseRequired": "Disease category is required",
    "amountRequired": "Receipt amount is required",
    "amountPositive": "Amount must be greater than 0",
    "receiptRequired": "Receipt document is required",
    "medicalCertRequired": "Medical certificate is required",
    "treatmentDateRequired": "Treatment date is required",
    "treatmentDatePast": "Treatment date must be in the past"
  }
}
```

**Step 2: Replace `smartClaims` key with `medicalClaims` in th.json**

```json
"medicalClaims": {
  "title": "สิทธิประโยชน์ด้านการรักษาพยาบาล",
  "subtitle": "เบิกค่ารักษาพยาบาลแบบย้อนหลัง (ไม่มีใบส่งตัว)",
  "tabs": {
    "overview": "ภาพรวม",
    "newClaim": "เบิกค่ารักษา",
    "history": "ประวัติการเบิก"
  },
  "overview": {
    "planType": "ประเภทแผน",
    "annualLimit": "วงเงินต่อปี",
    "used": "ใช้ไปแล้ว",
    "remaining": "คงเหลือ",
    "recentClaims": "การเบิกล่าสุด"
  },
  "form": {
    "stepInfo": "ข้อมูลการเบิก",
    "stepDocuments": "อัปโหลดเอกสาร",
    "stepReview": "ตรวจสอบและส่ง",
    "diseaseCategory": "ประเภทโรค/การรักษา",
    "diseaseDetails": "รายละเอียดโรค/อาการ",
    "hospitalName": "ชื่อโรงพยาบาล / คลินิก",
    "treatmentDate": "วันที่รักษา",
    "receiptAmount": "จำนวนเงินตามใบเสร็จ (บาท)",
    "claimAmount": "จำนวนเงินที่ขอเบิก (บาท)",
    "remarks": "หมายเหตุ",
    "selectCategory": "เลือกประเภทโรค",
    "enterHospital": "เช่น โรงพยาบาลกรุงเทพ",
    "enterDetails": "อธิบายอาการเจ็บป่วยหรือการรักษา",
    "enterRemarks": "หมายเหตุเพิ่มเติม (ถ้ามี)",
    "next": "ถัดไป",
    "back": "ย้อนกลับ",
    "saveDraft": "บันทึกแบบร่าง",
    "submitClaim": "ส่งเบิก"
  },
  "upload": {
    "receipt": "ใบเสร็จรับเงิน",
    "receiptTh": "",
    "medicalCert": "ใบรับรองแพทย์",
    "medicalCertTh": "",
    "additionalDocs": "เอกสารเพิ่มเติม",
    "dragDrop": "ลากไฟล์มาวางหรือคลิกเพื่ออัปโหลด",
    "maxSize": "ขนาดไฟล์ไม่เกิน 10MB (JPG, PNG, PDF)",
    "required": "จำเป็น",
    "optional": "ไม่บังคับ",
    "remove": "ลบ"
  },
  "review": {
    "title": "ตรวจสอบข้อมูลการเบิก",
    "claimInfo": "ข้อมูลการเบิก",
    "attachedDocs": "เอกสารแนบ",
    "policyCheck": "ตรวจสอบสิทธิ์",
    "withinLimit": "อยู่ในวงเงินที่เบิกได้",
    "exceedsLimit": "เกินวงเงินที่เบิกได้",
    "confirmSubmit": "เมื่อส่งเบิกแล้ว ข้อมูลจะถูกส่งไปยังผู้อนุมัติ กรุณานำเอกสารตัวจริงมายื่นที่ฝ่ายบุคคล",
    "originalDocsReminder": "อย่าลืมนำเอกสารตัวจริงมายื่นที่ฝ่ายทรัพยากรบุคคล"
  },
  "history": {
    "title": "ประวัติการเบิกค่ารักษาพยาบาล",
    "filterAll": "ทั้งหมด",
    "filterPending": "รอดำเนินการ",
    "filterApproved": "อนุมัติแล้ว",
    "filterRejected": "ไม่อนุมัติ",
    "noClaims": "ยังไม่มีรายการเบิก",
    "createFirst": "เริ่มเบิกค่ารักษาพยาบาลรายการแรกของคุณ",
    "viewDetail": "ดูรายละเอียด"
  },
  "status": {
    "draft": "แบบร่าง",
    "submitted": "ส่งแล้ว",
    "pending_manager": "รอผู้จัดการอนุมัติ",
    "pending_hr": "รอ HR อนุมัติ",
    "processing": "กำลังดำเนินการ",
    "approved": "อนุมัติแล้ว",
    "rejected": "ไม่อนุมัติ"
  },
  "detail": {
    "claimId": "รหัสการเบิก",
    "status": "สถานะ",
    "treatmentDate": "วันที่รักษา",
    "hospital": "โรงพยาบาล / คลินิก",
    "disease": "โรค / อาการ",
    "receiptAmount": "จำนวนเงินตามใบเสร็จ",
    "claimAmount": "จำนวนเงินที่เบิก",
    "remarks": "หมายเหตุ",
    "documents": "เอกสารแนบ",
    "approvalTimeline": "ลำดับการอนุมัติ",
    "rejectionReason": "เหตุผลที่ไม่อนุมัติ",
    "submittedDate": "วันที่ส่งเบิก",
    "approvedDate": "วันที่อนุมัติ"
  },
  "startClaim": "เริ่มเบิกค่ารักษา",
  "validation": {
    "hospitalRequired": "กรุณาระบุชื่อโรงพยาบาล",
    "diseaseRequired": "กรุณาเลือกประเภทโรค",
    "amountRequired": "กรุณาระบุจำนวนเงิน",
    "amountPositive": "จำนวนเงินต้องมากกว่า 0",
    "receiptRequired": "กรุณาแนบใบเสร็จรับเงิน",
    "medicalCertRequired": "กรุณาแนบใบรับรองแพทย์",
    "treatmentDateRequired": "กรุณาระบุวันที่รักษา",
    "treatmentDatePast": "วันที่รักษาต้องเป็นวันที่ผ่านมาแล้ว"
  }
}
```

**Step 3: Commit**

```bash
git add src/frontend/messages/en.json src/frontend/messages/th.json
git commit -m "refactor: rename smartClaims i18n namespace to medicalClaims with Thai medical terms"
```

---

## Task 4: Refactor `smart-claims-page.tsx` → `medical-claims-page.tsx` (main page shell)

**Files:**
- Rename: `src/frontend/src/components/claims/smart-claims-page.tsx` → `src/frontend/src/components/claims/medical-claims-page.tsx`
- Remove: `src/frontend/src/components/claims/OCRResultCard.tsx`
- Remove: `src/frontend/src/components/claims/ReceiptUploader.tsx`
- Remove: `src/frontend/src/lib/claims-api.ts`

**Step 1: Rename and rewrite the main page component**

Keep the overall structure from `SmartClaimsPage` but change:
- Component name: `SmartClaimsPage` → `MedicalClaimsPage`
- Import hook: `useClaims` → `useMedicalClaims`
- i18n namespace: `smartClaims` → `medicalClaims`
- Tabs: `['new', 'history', 'dashboard']` → `['overview', 'newClaim', 'history']`
- Stats bar: replace YTD Spent with Remaining Balance
- Remove OCR-related state (`ocrResult`, `ocrProcessing`, `policyChecks`)
- Add wizard state for 3-step form (keep `step` state)
- Tab content: Overview (new), New Claim (refactored), History (refactored)

Status mapping stays the same pattern but with new statuses:
```typescript
const STATUS_VARIANT: Record<MedicalClaimStatus, 'neutral' | 'info' | 'warning' | 'success' | 'error'> = {
  draft: 'neutral',
  submitted: 'info',
  pending_manager: 'warning',
  pending_hr: 'warning',
  processing: 'warning',
  approved: 'success',
  rejected: 'error',
};
```

Wireframe for main page shell:
```
+──────────────────────────────────────────────────────────+
│  Medical Benefits                                         │
│  เบิกค่ารักษาพยาบาลแบบย้อนหลัง (ไม่มีใบส่งตัว)        │
+──────────────────────────────────────────────────────────+
│  [6]           [2]           [3]           [฿41,500]     │
│  Total Claims  Pending       Approved      Remaining      │
+──────────────────────────────────────────────────────────+
│  [Overview]   [New Claim]   [Claim History]               │
+──────────────────────────────────────────────────────────+
│                                                           │
│  (Tab content renders here)                               │
│                                                           │
+──────────────────────────────────────────────────────────+
```

**Step 2: Delete unused OCR components and API client**

```bash
rm src/frontend/src/components/claims/OCRResultCard.tsx
rm src/frontend/src/components/claims/ReceiptUploader.tsx
rm src/frontend/src/lib/claims-api.ts
```

Keep `ClaimTimeline.tsx`, `PolicyCheckPanel.tsx`, `YTDSpendingCards.tsx` — will refactor or remove in later tasks.

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor: rename SmartClaimsPage to MedicalClaimsPage, remove OCR components"
```

---

## Task 5: Build Overview tab with benefit summary and "Start a Claim" CTA

**Files:**
- Modify: `src/frontend/src/components/claims/medical-claims-page.tsx` (add Overview tab content)

**Step 1: Add Overview tab content inside `MedicalClaimsPage`**

```
+──────────────────────────────────────────────────────────+
│  ┌────────────────┐ ┌────────────────┐ ┌──────────────┐ │
│  │  OPD + IPD     │ │  ฿60,000       │ │ ฿18,500      │ │
│  │  Plan Type     │ │  Annual Limit  │ │ Used         │ │
│  └────────────────┘ └────────────────┘ └──────────────┘ │
│                                                           │
│  ┌── Progress Bar ────── 30.8% ───────────────────────┐  │
│  │ ████████░░░░░░░░░░░░░░░░░░░  ฿41,500 remaining    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Recent Claims                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │ MCL001  Bangkok Hospital    ฿3,500  ✓ Approved     │  │
│  │ MCL003  Rutnin Eye Hosp.   ฿5,000  ◷ Pending Mgr  │  │
│  │ MCL004  Samitivej Hospital  ฿4,500  → Submitted    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │          [ Start a Claim ]  (CTA button)           │  │
│  └────────────────────────────────────────────────────┘  │
+──────────────────────────────────────────────────────────+
```

"Start a Claim" button sets `activeTab` to `'newClaim'`.

**Step 2: Commit**

```bash
git add src/frontend/src/components/claims/medical-claims-page.tsx
git commit -m "feat(medical-claims): add Overview tab with benefit summary and start claim CTA"
```

---

## Task 6: Build Step 1 — Claim Information Form (replaces OCR upload)

**Files:**
- Modify: `src/frontend/src/components/claims/medical-claims-page.tsx` (add Step 1 content)

**Step 1: Replace the OCR upload step with a claim info form**

Reuse the Step indicator from the old code (3 circles connected by lines). Rename labels:
- Step 1: "Claim Information" (was "Upload Receipt")
- Step 2: "Upload Documents" (was "OCR Result")
- Step 3: "Review & Submit" (was "Claim Details")

Form fields in Step 1:
```
+──────────────────────────────────────────────────────────+
│  Step 1: Claim Information                                │
│  ● ─── ○ ─── ○                                           │
+──────────────────────────────────────────────────────────+
│                                                           │
│  Disease Category *          Treatment Date *             │
│  [▼ Select category    ]    [📅 2026-02-20         ]     │
│                                                           │
│  Disease Details *                                        │
│  [ Describe illness or treatment...             ]         │
│                                                           │
│  Hospital / Clinic Name *                                 │
│  [ e.g. Bangkok Hospital                        ]         │
│                                                           │
│  Receipt Amount (THB) *      Claim Amount (THB) *         │
│  [ 3,500                ]    [ 3,500 (auto-fill)  ]       │
│                                                           │
│  Remarks                                                  │
│  [ Additional notes (optional)...               ]         │
│                                                           │
│                                           [ Next → ]      │
+──────────────────────────────────────────────────────────+
```

Use `FormField` for all fields. Disease Category uses `type="select"` with `DISEASE_CATEGORIES` from hook. Claim Amount auto-fills from Receipt Amount, capped at `summary.remainingAmount`.

Validation on "Next": disease category selected, hospital filled, treatment date in the past, receipt amount > 0.

**Step 2: Commit**

```bash
git add src/frontend/src/components/claims/medical-claims-page.tsx
git commit -m "feat(medical-claims): add Step 1 claim information form"
```

---

## Task 7: Build Step 2 — Document Upload (replaces OCR result)

**Files:**
- Modify: `src/frontend/src/components/claims/medical-claims-page.tsx` (add Step 2 content)

**Step 1: Replace OCR result step with document upload**

3 upload zones, reuse the drag-and-drop pattern from old Step 1 (receipt upload):

```
+──────────────────────────────────────────────────────────+
│  Step 2: Upload Documents                                 │
│  ● ─── ● ─── ○                                           │
+──────────────────────────────────────────────────────────+
│                                                           │
│  Receipt (ใบเสร็จ) * ─────────────── REQUIRED            │
│  ┌────────────────────────────────────────────────────┐  │
│  │      ☁ Drag & drop or click to upload              │  │
│  │      JPG, PNG, PDF (max 10MB)                      │  │
│  │      [Choose File]   [📷 Camera]                   │  │
│  └────────────────────────────────────────────────────┘  │
│  ✓ receipt_hospital.jpg (245 KB)             [✕ Remove]  │
│                                                           │
│  Medical Certificate (ใบรับรองแพทย์) * ───── REQUIRED    │
│  ┌────────────────────────────────────────────────────┐  │
│  │      ☁ Drag & drop or click to upload              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Additional Documents ──────────────── OPTIONAL           │
│  ┌────────────────────────────────────────────────────┐  │
│  │      ☁ Drag & drop or click to upload              │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  [← Back]                                  [ Next → ]     │
+──────────────────────────────────────────────────────────+
```

Reuse `validateFile()`, `handleDrop()`, file input refs pattern from old `SmartClaimsPage`. Create 3 separate refs (receiptRef, certRef, otherRef).

Validation on "Next": receipt AND medical cert both uploaded.

**Step 2: Commit**

```bash
git add src/frontend/src/components/claims/medical-claims-page.tsx
git commit -m "feat(medical-claims): add Step 2 document upload (receipt + medical cert)"
```

---

## Task 8: Build Step 3 — Review & Submit (refactor from old Step 3)

**Files:**
- Modify: `src/frontend/src/components/claims/medical-claims-page.tsx` (add Step 3 content)

**Step 1: Replace old claim details step with review summary**

```
+──────────────────────────────────────────────────────────+
│  Step 3: Review & Submit                                  │
│  ● ─── ● ─── ●                                           │
+──────────────────────────────────────────────────────────+
│                                                           │
│  ┌── Claim Information ──────────────────────────────┐   │
│  │  Disease      General Illness                     │   │
│  │  Details      Flu treatment and medication        │   │
│  │  Hospital     Bangkok Hospital                    │   │
│  │  Treatment    20 Feb 2026                         │   │
│  │  Receipt Amt  ฿3,500                              │   │
│  │  Claim Amt    ฿3,500                              │   │
│  │  Remarks      Regular flu with fever 3 days       │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌── Attached Documents ─────────────────────────────┐   │
│  │  📄 receipt_hospital.jpg      245 KB   Receipt    │   │
│  │  📄 med_cert_flu.pdf          180 KB   Med Cert   │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌── Policy Check ───────────────────────────────────┐   │
│  │  ✓ Within annual limit (฿22,000 / ฿60,000)       │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌── ⚠ Important ───────────────────────────────────┐   │
│  │  กรุณานำเอกสารตัวจริงมายื่นที่ฝ่ายบุคคล          │   │
│  │  Please bring original documents to HR Dept.      │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  [← Back]          [Save Draft]          [Submit Claim]   │
+──────────────────────────────────────────────────────────+
```

On submit: `createClaim()` → `addDocument()` for each → `submitClaim()` → switch to history tab + toast.
On save draft: `createClaim()` → `addDocument()` for each → switch to history tab + toast.

**Step 2: Commit**

```bash
git add src/frontend/src/components/claims/medical-claims-page.tsx
git commit -m "feat(medical-claims): add Step 3 review, policy check, and submit with original docs reminder"
```

---

## Task 9: Refactor Claim History tab with medical fields and detail modal with approval timeline

**Files:**
- Modify: `src/frontend/src/components/claims/medical-claims-page.tsx` (refactor history tab)
- Modify or remove: `src/frontend/src/components/claims/ClaimTimeline.tsx` (update for approval steps)
- Remove: `src/frontend/src/components/claims/YTDSpendingCards.tsx` (replaced by overview)
- Remove: `src/frontend/src/components/claims/PolicyCheckPanel.tsx` (inlined)

**Step 1: Refactor history tab**

Replace columns: Type → Disease Category, Merchant → Hospital, add Treatment Date.
Add status filter pills at top (All | Pending | Approved | Rejected).

Desktop table:
```
+──────────────────────────────────────────────────────────────────+
│  [All] [Pending] [Approved] [Rejected]                           │
├──────┬───────────┬─────────────────┬──────────┬────────┬────────┤
│ ID   │ Disease   │ Hospital        │ Date     │ Amount │ Status │
├──────┼───────────┼─────────────────┼──────────┼────────┼────────┤
│MCL001│ General   │ Bangkok Hosp.   │ Feb 18   │ ฿3,500 │Approved│
│MCL002│ Dental    │ Thonglor Dental │ Feb 08   │ ฿5,000 │Approved│
│MCL003│ Vision    │ Rutnin Eye      │ Feb 22   │ ฿5,000 │Pending │
│MCL004│ Accident  │ Samitivej       │ Feb 23   │ ฿4,500 │Submitted│
└──────┴───────────┴─────────────────┴──────────┴────────┴────────┘
```

Mobile cards:
```
┌──────────────────────────────────────┐
│ Bangkok Hospital            Approved │
│ General Illness · ฿3,500             │
│ Feb 18, 2026                          │
└──────────────────────────────────────┘
```

**Step 2: Refactor detail modal with approval timeline**

```
+──────────────────────────────────────────────────+
│  Claim Details                             [✕]   │
│──────────────────────────────────────────────────│
│  MCL003                            ฿5,000        │
│  ◷ Pending Manager Approval                      │
│                                                   │
│  Disease      Vision / Eye Care                  │
│  Details      Eye examination and glasses        │
│  Hospital     Rutnin Eye Hospital                │
│  Treatment    Feb 22, 2026                       │
│  Receipt Amt  ฿8,500                             │
│  Claim Amt    ฿5,000                             │
│                                                   │
│  ── Documents ──────────────────────────────     │
│  📄 receipt_rutnin.pdf              410 KB       │
│  📄 eye_exam_cert.pdf               200 KB       │
│                                                   │
│  ── Approval Timeline ──────────────────────     │
│                                                   │
│  ● Step 1: Manager (Surachai P.)                 │
│  │  ◷ Awaiting approval                         │
│  │                                                │
│  ○ Step 2: HR (Parichat S.)                      │
│     Pending (waiting for Step 1)                 │
│                                                   │
+──────────────────────────────────────────────────+
```

Approval timeline: vertical stepper with colored dots (green=approved, yellow=pending, red=rejected, gray=waiting).

**Step 3: Delete unused components**

```bash
rm src/frontend/src/components/claims/YTDSpendingCards.tsx
rm src/frontend/src/components/claims/PolicyCheckPanel.tsx
rm src/frontend/src/components/claims/ClaimTimeline.tsx
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat(medical-claims): refactor history tab with medical fields and approval timeline modal"
```

---

## Task 10: Polish — mobile responsiveness, toasts, and cleanup

**Files:**
- Modify: `src/frontend/src/components/claims/medical-claims-page.tsx`

**Step 1: Ensure responsive layouts**

- Stats bar: `grid-cols-2 sm:grid-cols-4`
- Form fields: `grid-cols-1 sm:grid-cols-2` for paired fields
- Upload zones: stacked on mobile
- History: table hidden on mobile, card list shown
- Step indicator: compact text on mobile

**Step 2: Add toast notifications**

```typescript
import { useToast } from '@/components/ui/toast';
const { toast } = useToast();

// On save draft:
toast('success', t('form.saveDraft'));

// On submit:
toast('success', t('review.originalDocsReminder'));

// On validation error:
toast('error', t('validation.receiptRequired'));
```

**Step 3: Clean up any remaining `smartClaims` references**

Search entire codebase for leftover `smart-claims` or `smartClaims` strings and fix.

**Step 4: Verify full flow**

1. Navigate to `http://localhost:3000/en/benefits`
2. Verify Overview tab with benefit summary + start claim button
3. Fill Step 1 → Step 2 (upload 2 files) → Step 3 → Submit
4. Verify claim in History tab with correct status
5. Click claim → verify detail modal with approval timeline
6. Test Thai language at `/th/benefits`
7. Test on mobile viewport

**Step 5: Commit**

```bash
git add -A
git commit -m "feat(medical-claims): polish mobile responsive, add toasts, clean up smart-claims references"
```

---

## Summary

| Task | Action | What Changes |
|------|--------|-------------|
| 1 | **Rename route** | `smart-claims/` → `benefits/`, sidebar, mobile-menu, rbac |
| 2 | **Refactor hook** | `use-claims.ts` → `use-medical-claims.ts`, new types + mock data |
| 3 | **Update i18n** | `smartClaims` → `medicalClaims` keys in en.json + th.json |
| 4 | **Refactor main page** | `SmartClaimsPage` → `MedicalClaimsPage`, remove OCR components |
| 5 | **Overview tab** | NEW — benefit summary cards + start claim CTA |
| 6 | **Step 1 form** | REPLACE OCR upload → claim info form (disease, hospital, amounts) |
| 7 | **Step 2 upload** | REPLACE OCR result → document upload (receipt + med cert) |
| 8 | **Step 3 review** | REFACTOR → review summary + policy check + original docs reminder |
| 9 | **History + modal** | REFACTOR → medical columns + approval timeline modal |
| 10 | **Polish** | Mobile responsive, toasts, cleanup leftover references |

Files removed: `OCRResultCard.tsx`, `ReceiptUploader.tsx`, `YTDSpendingCards.tsx`, `PolicyCheckPanel.tsx`, `ClaimTimeline.tsx`, `claims-api.ts`, `use-claims.ts`
