# Cluster Wizard Factory — 30-min Scaffold Guide

> Source: `src/lib/admin/wizard-template/createClusterWizard.ts`  
> Pattern: Hire Option-1 (3-cluster + Zustand persist + Humi skin) extracted into a reusable factory.

## Overview

`createClusterWizard` returns a Zustand store hook pre-wired with:

- `persist` middleware (localStorage, key = `storeKey`)
- Step navigation (`goNext`, `goBack`, `jumpTo`)
- Per-step validation gate (`isStepValid`)
- Draft timestamp (`lastSavedAt`) — shown in WizardShell header

Every new lifecycle flow (Probation, EmpData, Rehire, Transfer, Terminate) can be scaffolded by:
1. Calling the factory with a config object
2. Writing a cluster component per step
3. Adding a `page.tsx` entry point
4. Wiring the route in the admin layout

**No changes to existing Hire wizard files** — factory is additive.

---

## Required inputs

### 1. Form data shape (`TFormData`)

Define a TypeScript interface with one key per slice. Each slice maps to one or more related fields from `@hrms/shared/field-catalog`.

```ts
// Sourced from: getFieldsByFlow('probation') + getFieldsBySection('employmentDates')
interface ProbationFormData {
  job: {
    employeeId: string | null     // field catalog: identity.companyCode family
    hireDate: string | null       // field catalog: hireDate
    probationEndDate: string | null  // catalog: probationPeriodEndDate (BRD #117)
  }
  assessment: {
    passProbation: string | null  // catalog: passProbation (YES_NO picklist)
    extendedProbationDate: string | null  // catalog: extendedProbationDate (BRD #117)
    passProbationConfirmDate: string | null  // catalog: passProbationDate
  }
}
```

**Naming rule**: slices correspond to wizard steps (1 step = 1 slice or a few tightly-related slices). This lets `setStepData('assessment', { passProbation: 'YES' })` pattern from Hire work identically here.

### 2. Step descriptors (`clusterSteps`)

```ts
const PROBATION_STEPS = [
  { number: 1, labelTh: 'ข้อมูลพนักงาน', labelEn: 'Employee', descTh: 'เลขพนักงาน • วันเข้างาน • วันสิ้นสุดทดลองงาน' },
  { number: 2, labelTh: 'ผลการทดลองงาน', labelEn: 'Assessment', descTh: 'ผ่าน / ต่ออายุ / ไม่ผ่าน' },
  { number: 3, labelTh: 'ตรวจสอบและส่ง', labelEn: 'Review', descTh: 'สรุปก่อน Submit' },
]
```

### 3. Validators (`validators`)

Per-step validator map. Return `true` = step is complete, Next button enabled.

```ts
const validators = {
  1: (d: ProbationFormData) => !!d.job.probationEndDate,
  2: (d: ProbationFormData) => d.assessment.passProbation !== null,
  3: (d: ProbationFormData) => true,  // Review step always valid
}
```

### 4. Factory call

```ts
import { createClusterWizard } from '@/lib/admin/wizard-template/createClusterWizard'

export const useProbationWizard = createClusterWizard({
  name: 'probation',
  storeKey: 'probation-wizard-draft',
  initialFormData: INITIAL_PROBATION_FORM,
  clusterSteps: PROBATION_STEPS,
  validators,
})
```

---

## Files to create (4-5 files)

```
src/app/[locale]/admin/<flow>/
├── page.tsx                      — wizard entry (imports WizardShell + store)
└── clusters/
    ├── ClusterStep1.tsx          — step 1 content (humi-card sections)
    ├── ClusterStep2.tsx          — step 2 content
    └── ClusterReview.tsx         — review/summary (optional: reuse pattern from Hire)
```

The store lives in the page file or a separate `store.ts` under `clusters/` — either works.

---

## Integrating field-catalog

```ts
import { getFieldsByFlow } from '@hrms/shared/field-catalog'

// Returns FieldDef[] filtered by flow tag
const probationFields = getFieldsByFlow('probation')
// → [passProbation, probationPeriodEndDate, extendedProbationDate, passProbationDate]

// Use field metadata to drive rendering
probationFields.forEach((f) => {
  // f.type: 'date' | 'picklist' | 'string' | ...
  // f.picklistId: 'YES_NO' | 'PICKLIST_EMPLOYEE_CLASS' | ...
  // f.required: boolean
  // f.labelTh: Thai label for the admin UI
})
```

**tsconfig path alias** must be added for `@hrms/shared/field-catalog`:

```json
// tsconfig.json → compilerOptions.paths
"@hrms/shared/field-catalog": ["../services/shared/src/field-catalog/index.ts"]
```

And `next.config.ts` webpack alias:

```ts
'@hrms/shared/field-catalog': path.resolve(__dirname, '../services/shared/src/field-catalog/index.ts'),
```

---

## Integrating picklists

```ts
import { PICKLIST_EMPLOYEE_CLASS, PICKLIST_MARITAL_STATUS } from '@hrms/shared/picklists'

// Render a <select>
<select value={value} onChange={e => setStepData('job', { employeeClass: e.target.value })}>
  {PICKLIST_EMPLOYEE_CLASS.filter(p => p.active).map(p => (
    <option key={p.id} value={p.id}>{p.labelTh}</option>
  ))}
</select>
```

**Currently available picklists** (10 exports from `@hrms/shared/picklists`):
- `PICKLIST_BLOOD_TYPE`, `PICKLIST_CURRENCY`, `PICKLIST_EMPLOYEE_CLASS`
- `PICKLIST_EVENT_REASON_HIRE`, `PICKLIST_EVENT_REASON_TERM`, `PICKLIST_EVENT_REASON_TRANS`
- `PICKLIST_GENDER`, `PICKLIST_MARITAL_STATUS`, `PICKLIST_NATIONALITY`, `PICKLIST_RELIGION`

**Note**: `YES_NO` picklist (used by `passProbation` field) is not yet in `@hrms/shared/picklists`. Until F2 is updated, define it inline:

```ts
const YES_NO_OPTIONS = [
  { id: 'YES', labelTh: 'ผ่าน', labelEn: 'Pass' },
  { id: 'NO', labelTh: 'ไม่ผ่าน', labelEn: 'Fail' },
  { id: 'EXTEND', labelTh: 'ต่ออายุทดลองงาน', labelEn: 'Extend' },
]
```

---

## Integrating validation toolkit

```ts
import { thaiNationalId, dobBeforeHire } from '@hrms/shared/validation/toolkit'

// In validator step function:
1: (d: FormData) => {
  const nid = thaiNationalId(d.identity.nationalId)
  const dob = dobBeforeHire(d.biographical.dateOfBirth, d.identity.hireDate)
  return nid.ok && dob.ok && !!d.identity.hireDate
}
```

---

## Page entry pattern

```tsx
'use client'
import { WizardShell } from '@/components/admin/wizard/WizardShell'
import { useProbationWizard, PROBATION_STEPS } from './store'
import ClusterEmployee from './clusters/ClusterEmployee'
import ClusterAssessment from './clusters/ClusterAssessment'
import ClusterReview from './clusters/ClusterReview'

export default function ProbationPage() {
  const { currentStep, maxUnlockedStep, lastSavedAt, goNext, goBack, jumpTo, isStepValid, reset } =
    useProbationWizard()

  return (
    <div className="h-full">
      <WizardShell
        currentStep={currentStep}
        maxUnlockedStep={maxUnlockedStep}
        isCurrentStepValid={isStepValid(currentStep)}
        lastSavedAt={lastSavedAt}
        onStepClick={jumpTo}
        onBack={goBack}
        onNext={goNext}
        onSubmit={() => { console.info('submit', useProbationWizard.getState().formData); reset() }}
      >
        {currentStep === 1 && <ClusterEmployee />}
        {currentStep === 2 && <ClusterAssessment />}
        {currentStep === 3 && <ClusterReview />}
      </WizardShell>
    </div>
  )
}
```

---

## CSS classes (Humi design system)

Every cluster component must wrap field groups in `.humi-step-section` so global CSS overrides apply:

```tsx
<div className="humi-card">
  <SectionHeader icon={CalendarDays} eyebrow="Probation" title="ข้อมูลทดลองงาน" sub="..." />
  <div className="humi-step-section">
    {/* form fields here */}
  </div>
</div>
```

Available classes: `.humi-card`, `.humi-card--cream`, `.humi-eyebrow`, `.humi-section-title`,
`.humi-section-sub`, `.humi-step-section`, `.humi-row`, `.humi-label`, `.humi-input`,
`.humi-select`, `.humi-required-note`, `.humi-asterisk`, `.humi-draft-chip`.
