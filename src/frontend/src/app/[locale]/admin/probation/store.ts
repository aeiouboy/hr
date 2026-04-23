// probation/store.ts — Probation Wizard Zustand store (created via factory)
//
// Demonstrates reusability of createClusterWizard by scaffolding the
// probation flow with zero copy-paste from useHireWizard.
//
// Field sources (getFieldsByFlow('probation') returns 4 fields):
//   - passProbation         (BRD #117, section: probation,      type: picklist/YES_NO)
//   - probationPeriodEndDate(BRD #117, section: probation,      type: date)
//   - extendedProbationDate (BRD #117, section: probation,      type: date, conditional)
//   - passProbationDate     (BRD #117, section: employmentDates, type: date)
//
// Additional fields shown in wizard (shared across flows, section: identity / job):
//   - employeeId   — admin must search for employee being assessed
//   - hireDate     — display-only reference from identity slice
//   - companyCode  — reference from identity slice
//
// Wizard structure: 2 data steps + 1 review = 3 clusters total.
//   Step 1 "ข้อมูลพนักงาน" — employee lookup + probation dates
//   Step 2 "ผลการทดลองงาน" — pass / extend / fail assessment + confirm date
//   Step 3 "ตรวจสอบและส่ง"  — read-only summary before submit

import { createClusterWizard, type ClusterStep } from '@/lib/admin/wizard-template/createClusterWizard'

// ─── Form data shape ────────────────────────────────────────────────────────

export interface ProbationFormData {
  /** Step 1: employee lookup + probation date boundaries */
  job: {
    employeeId: string | null   // admin searches for the employee
    hireDate: string | null     // display reference (populated when employee selected)
    companyCode: string | null  // display reference
    probationEndDate: string | null  // BRD #117 EC_EMP_JOB.PROBATION_PERIOD_END_DATE
  }
  /** Step 2: pass/fail/extend outcome + confirmation date */
  assessment: {
    passProbation: string | null          // BRD #117 EC_EMP_JOB.PASS_PROBATION (YES_NO picklist)
    extendedProbationDate: string | null  // BRD #117 EC_EMP_JOB.EXTENED_PROBATION_DATE (if EXTEND)
    passProbationConfirmDate: string | null  // BRD #117 EC_EMP_EMPLOYMENT.PASS_PROBATION_DATE
  }
}

const INITIAL_PROBATION_FORM: ProbationFormData = {
  job: {
    employeeId: null,
    hireDate: null,
    companyCode: null,
    probationEndDate: null,
  },
  assessment: {
    passProbation: null,
    extendedProbationDate: null,
    passProbationConfirmDate: null,
  },
}

// ─── Step config ────────────────────────────────────────────────────────────

export const PROBATION_STEPS: ClusterStep[] = [
  {
    number: 1,
    labelTh: 'ข้อมูลพนักงาน',
    labelEn: 'Employee',
    descTh: 'เลขพนักงาน • วันสิ้นสุดทดลองงาน',
  },
  {
    number: 2,
    labelTh: 'ผลการทดลองงาน',
    labelEn: 'Assessment',
    descTh: 'ผ่าน / ต่ออายุ / ไม่ผ่าน',
  },
  {
    number: 3,
    labelTh: 'ตรวจสอบและส่ง',
    labelEn: 'Review',
    descTh: 'สรุปก่อน Submit',
  },
]

// ─── Validators ─────────────────────────────────────────────────────────────

// Per-slice validators reused by ClusterReview summary (similar to Hire sliceValid pattern)
export const probationSliceValid = {
  job: (d: ProbationFormData) =>
    !!d.job.employeeId && !!d.job.probationEndDate,
  assessment: (d: ProbationFormData) =>
    d.assessment.passProbation !== null,
}

const validators: { [step: number]: (data: ProbationFormData) => boolean } = {
  1: (d) => probationSliceValid.job(d),
  2: (d) => probationSliceValid.assessment(d),
  3: () => true,  // Review step always valid — submit is the action
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useProbationWizard = createClusterWizard<ProbationFormData>({
  name: 'probation',
  storeKey: 'probation-wizard-draft',
  initialFormData: INITIAL_PROBATION_FORM,
  clusterSteps: PROBATION_STEPS,
  validators,
  sliceValid: probationSliceValid,
})
