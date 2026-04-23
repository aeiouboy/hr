// useHireWizard.ts — Zustand store สำหรับ Hire Wizard state
//
// Option 1 restructure (2026-04-23):
//   - ลดจาก 8 visible steps เหลือ 3 clusters (Who / Job / Review)
//   - formData ยังเก็บแบบ 8 slices ตาม BRD field mapping เพื่อ preserve
//     spec §5.4 + validation rules + existing Step*.tsx setStepData calls
//   - เพิ่ม `persist` middleware → auto-sync localStorage ("hire-wizard-draft")
//     ให้ admin กรอกค้างได้ไม่กลัว reload/หลงแท็บ
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ประเภท step number — จำกัดเป็น 1-3 เท่านั้น (Who / Job / Review)
type StepNumber = 1 | 2 | 3

// รูปแบบข้อมูลของแต่ละ slice — ตาม BRD spec §5.4 verbatim, คงไว้ไม่เปลี่ยน
// เพื่อ Step* components (StepIdentity, StepName, ฯลฯ) setStepData คีย์เดิมได้
interface FormData {
  identity:     { hireDate: string | null; companyCode: string | null; eventReason: string | null }
  name:         { firstNameTh: string; lastNameTh: string; firstNameEn: string; lastNameEn: string }
  biographical: { dateOfBirth: string | null; maritalStatus: string | null }
  employeeInfo: { employeeClass: string | null }
  nationalId:   { value: string }
  personal:     { addressLine1: string }
  job:          { position: string; businessUnit: string | null }
  compensation: { baseSalary: number | null }
}

const initialFormData: FormData = {
  identity:     { hireDate: null, companyCode: null, eventReason: null },
  name:         { firstNameTh: '', lastNameTh: '', firstNameEn: '', lastNameEn: '' },
  biographical: { dateOfBirth: null, maritalStatus: null },
  employeeInfo: { employeeClass: null },
  nationalId:   { value: '' },
  personal:     { addressLine1: '' },
  job:          { position: '', businessUnit: null },
  compensation: { baseSalary: null },
}

interface HireWizardState {
  currentStep: StepNumber
  maxUnlockedStep: StepNumber
  formData: FormData
  lastSavedAt: number | null  // epoch ms — populated by persist onRehydrate / setStepData

  setStepData: <K extends keyof FormData>(step: K, patch: Partial<FormData[K]>) => void
  goNext: () => void
  goBack: () => void
  jumpTo: (step: number) => void
  isStepValid: (step: number) => boolean
  reset: () => void
}

// Per-slice validators — reused by both single-slice and aggregate step checks.
// Keeps checkStepValid readable + lets Review summary reuse same logic.
const sliceValid = {
  identity:     (d: FormData) => !!(d.identity.hireDate && d.identity.companyCode && d.identity.eventReason),
  name:         (d: FormData) => d.name.firstNameTh.trim() !== '' && d.name.lastNameTh.trim() !== '',
  biographical: (d: FormData) => !!d.biographical.dateOfBirth,
  employeeInfo: (d: FormData) => !!d.employeeInfo.employeeClass,
  nationalId:   (d: FormData) => d.nationalId.value.trim() !== '',
  personal:     (d: FormData) => d.personal.addressLine1.trim() !== '',
  job:          (d: FormData) => d.job.position.trim() !== '',
  compensation: (d: FormData) => d.compensation.baseSalary !== null && d.compensation.baseSalary > 0,
} as const

// Step 1 "Who"    = Identity + Name + NationalID + Biographical
// Step 2 "Job"    = EmployeeInfo + Job + Compensation
// Step 3 "Review" = Personal (ที่อยู่/contact) + สรุปก่อน Submit
function checkStepValid(step: number, d: FormData): boolean {
  switch (step) {
    case 1: return sliceValid.identity(d) && sliceValid.name(d) && sliceValid.nationalId(d) && sliceValid.biographical(d)
    case 2: return sliceValid.employeeInfo(d) && sliceValid.job(d) && sliceValid.compensation(d)
    case 3: return sliceValid.personal(d)
    default: return false
  }
}

export const useHireWizard = create<HireWizardState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      maxUnlockedStep: 1,
      formData: initialFormData,
      lastSavedAt: null,

      setStepData: (step, patch) => {
        set((state) => ({
          formData: { ...state.formData, [step]: { ...state.formData[step], ...patch } },
          lastSavedAt: Date.now(),
        }))
      },

      goNext: () => {
        const { currentStep, maxUnlockedStep, formData } = get()
        if (!checkStepValid(currentStep, formData)) return
        const nextStep = Math.min(currentStep + 1, 3) as StepNumber
        const newMax = Math.max(maxUnlockedStep, nextStep) as StepNumber
        set({ currentStep: nextStep, maxUnlockedStep: newMax })
      },

      goBack: () => {
        const { currentStep } = get()
        if (currentStep <= 1) return
        set({ currentStep: (currentStep - 1) as StepNumber })
      },

      jumpTo: (step: number) => {
        const { maxUnlockedStep } = get()
        if (step > maxUnlockedStep || step < 1 || step > 3) {
          console.warn(`[useHireWizard] jumpTo: step ${step} ยังถูกล็อคอยู่ (max: ${maxUnlockedStep})`)
          return
        }
        set({ currentStep: step as StepNumber })
      },

      isStepValid: (step: number) => checkStepValid(step, get().formData),

      reset: () => set({
        currentStep: 1,
        maxUnlockedStep: 1,
        formData: initialFormData,
        lastSavedAt: null,
      }),
    }),
    {
      name: 'hire-wizard-draft',
      storage: createJSONStorage(() => localStorage),
      // Only persist data + progress, not function references.
      partialize: (state) => ({
        currentStep: state.currentStep,
        maxUnlockedStep: state.maxUnlockedStep,
        formData: state.formData,
        lastSavedAt: state.lastSavedAt,
      }),
    },
  ),
)

// Exported for Review summary so it can surface per-slice completeness
// without duplicating the validation logic.
export { sliceValid }
