// useHireWizard.ts — Zustand store สำหรับ Hire Wizard state
// shape ตาม spec §5.4 — ครอบคลุมทุก 8 ขั้นตอน
import { create } from 'zustand'

// ประเภท step number — จำกัดเป็น 1-8 เท่านั้น
type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

// รูปแบบข้อมูลของแต่ละขั้นตอน — ตาม spec §5.4 verbatim
interface FormData {
  identity: {
    hireDate: string | null       // ISO 8601 format
    companyCode: string | null    // FOCompany.externalCode
    eventReason: string | null    // 6 HIRE externalCodes
  }
  name: {
    firstNameTh: string
    lastNameTh: string
    firstNameEn: string
    lastNameEn: string
  }
  biographical: {
    dateOfBirth: string | null    // ISO 8601 format
  }
  employeeInfo: {
    employeeClass: string | null  // A-H ตาม Appendix 3
  }
  nationalId: {
    value: string
  }
  personal: {
    addressLine1: string
  }
  job: {
    position: string
    businessUnit: string | null   // FOBusinessUnit.externalCode
  }
  compensation: {
    baseSalary: number | null
  }
}

// initial state ของ form data — ทุก field เป็น null หรือ empty string
const initialFormData: FormData = {
  identity:     { hireDate: null, companyCode: null, eventReason: null },
  name:         { firstNameTh: '', lastNameTh: '', firstNameEn: '', lastNameEn: '' },
  biographical: { dateOfBirth: null },
  employeeInfo: { employeeClass: null },
  nationalId:   { value: '' },
  personal:     { addressLine1: '' },
  job:          { position: '', businessUnit: null },
  compensation: { baseSalary: null },
}

// HireWizardState — shape ตาม spec §5.4
interface HireWizardState {
  currentStep: StepNumber
  maxUnlockedStep: StepNumber
  formData: FormData

  // Actions
  setStepData: <K extends keyof FormData>(step: K, patch: Partial<FormData[K]>) => void
  goNext: () => void
  goBack: () => void
  jumpTo: (step: number) => void
  isStepValid: (step: number) => boolean
  reset: () => void
}

// ตรวจสอบว่า step นั้น valid หรือไม่ — logic แยกออกมาเพื่อ reuse
function checkStepValid(step: number, formData: FormData): boolean {
  switch (step) {
    case 1:
      // Step 1: ต้องครบทุก field (hireDate + companyCode + eventReason)
      return (
        formData.identity.hireDate !== null &&
        formData.identity.hireDate !== '' &&
        formData.identity.companyCode !== null &&
        formData.identity.companyCode !== '' &&
        formData.identity.eventReason !== null &&
        formData.identity.eventReason !== ''
      )
    case 2:
      // Step 2: ต้องมีชื่อและนามสกุลภาษาไทย
      return (
        formData.name.firstNameTh.trim() !== '' &&
        formData.name.lastNameTh.trim() !== ''
      )
    case 3:
      // Step 3: ต้องมีวันเกิด
      return formData.biographical.dateOfBirth !== null && formData.biographical.dateOfBirth !== ''
    case 4:
      // Step 4: ต้องเลือก Employee Class
      return formData.employeeInfo.employeeClass !== null && formData.employeeInfo.employeeClass !== ''
    case 5:
      // Step 5: ต้องมีเลขบัตรประชาชน
      return formData.nationalId.value.trim() !== ''
    case 6:
      // Step 6: ต้องมีที่อยู่
      return formData.personal.addressLine1.trim() !== ''
    case 7:
      // Step 7: ต้องมี position
      return formData.job.position.trim() !== ''
    case 8:
      // Step 8: ต้องมี base salary
      return formData.compensation.baseSalary !== null && formData.compensation.baseSalary > 0
    default:
      return false
  }
}

// สร้าง Zustand store
export const useHireWizard = create<HireWizardState>((set, get) => ({
  currentStep: 1,
  maxUnlockedStep: 1,
  formData: initialFormData,

  // อัปเดตข้อมูลของ step ที่ระบุ — merge กับข้อมูลเดิม (ไม่ replace ทั้งหมด)
  setStepData: (step, patch) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [step]: { ...state.formData[step], ...patch },
      },
    }))
  },

  // ไปขั้นตอนถัดไป — validate ก่อน, expand maxUnlockedStep ถ้า valid
  goNext: () => {
    const { currentStep, maxUnlockedStep, formData } = get()
    if (!checkStepValid(currentStep, formData)) return

    const nextStep = Math.min(currentStep + 1, 8) as StepNumber
    const newMax = Math.max(maxUnlockedStep, nextStep) as StepNumber
    set({ currentStep: nextStep, maxUnlockedStep: newMax })
  },

  // ย้อนกลับไปขั้นตอนก่อน
  goBack: () => {
    const { currentStep } = get()
    if (currentStep <= 1) return
    set({ currentStep: (currentStep - 1) as StepNumber })
  },

  // กระโดดไปยัง step ที่ระบุ — reject ถ้า step > maxUnlockedStep
  jumpTo: (step: number) => {
    const { maxUnlockedStep } = get()
    if (step > maxUnlockedStep || step < 1 || step > 8) {
      console.warn(`[useHireWizard] jumpTo: step ${step} ยังถูกล็อคอยู่ (max: ${maxUnlockedStep})`)
      return
    }
    set({ currentStep: step as StepNumber })
  },

  // ตรวจสอบ validity ของ step ที่ระบุ
  isStepValid: (step: number) => {
    return checkStepValid(step, get().formData)
  },

  // reset ทุกอย่างกลับสู่ initial state
  reset: () => {
    set({
      currentStep: 1,
      maxUnlockedStep: 1,
      formData: initialFormData,
    })
  },
}))
