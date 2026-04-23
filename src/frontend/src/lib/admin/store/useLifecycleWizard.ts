// useLifecycleWizard.ts — Zustand store สำหรับ 3 lifecycle wizards (Rehire / Transfer / Terminate)
// ใช้ discriminated union บน flow เพื่อ type-safe แต่ SSoT เดียว — ห้ามแตก 3 stores (Rule C7)
import { create } from 'zustand'

// ---------- ชนิดข้อมูลร่วม ----------

// รูปแบบ MockEmployee ที่ EmployeePicker ส่งกลับมา
export interface MockEmployee {
  externalCode: string
  firstName: { th: string; en: string }
  lastName: { th: string; en: string }
  nationalId: string
  company: string
  businessUnit: string
  position: string
  hireDate: string
  status: 'Active' | 'Terminated'
  lastTermDate?: string
  okToRehire?: boolean
}

// ---------- Form data shapes ต่อ flow ----------

// Rehire — 7 steps (skip Name/NationalID เพราะมีข้อมูล PerPerson อยู่แล้ว — BRD #102)
export interface RehireFormData {
  // Step 1: เลือกพนักงานเดิม
  step1: {
    selectedEmployee: MockEmployee | null
    eventReason: 'RE_REHIRE_LT1' | 'RE_REHIRE_GE1' | null  // auto-classified หรือ HR override
  }
  // Step 2: วันที่เริ่มงานใหม่
  step2: {
    rehireDate: string | null
  }
  // Step 3: ข้อมูลประวัติ (auto-populate read-only + override)
  step3: {
    dateOfBirth: string | null
  }
  // Step 4: ข้อมูลพนักงาน
  step4: {
    employeeClass: string | null   // A-H ตาม Appendix 3
  }
  // Step 5: ที่อยู่
  step5: {
    addressLine1: string
  }
  // Step 6: ข้อมูลงาน
  step6: {
    position: string
    businessUnit: string | null
  }
  // Step 7: ค่าตอบแทน + Submit
  step7: {
    baseSalary: number | null
  }
}

// Transfer — 6 steps
export interface TransferFormData {
  // Step 1: เลือกพนักงาน (Active only)
  step1: {
    selectedEmployee: MockEmployee | null
  }
  // Step 2: ประเภทการย้าย
  step2: {
    transferReason: 'TRN_ROTATION' | 'TRN_TRNACCOMP' | 'TRN_TRNWIC' | null
  }
  // Step 3: วันที่มีผล
  step3: {
    effectiveDate: string | null
  }
  // Step 4: สังกัดใหม่ (conditional: newCompany required เฉพาะ TRN_TRNACCOMP)
  step4: {
    newCompany: string | null       // required ถ้า TRN_TRNACCOMP
    businessUnit: string | null
    department: string              // text stub (Phase 2)
    position: string
    costCenter: string              // text stub
    jobCode: string                 // text stub
    location: string                // text stub
  }
  // Step 5: ค่าตอบแทน (carry-over)
  step5: {
    carryOverCompensation: boolean
    newBaseSalary: number | null    // optional override
  }
  // Step 6: ยืนยัน + Submit
  step6: Record<string, never>    // no extra fields — summary only
}

// Terminate — 5 steps
export interface TerminateFormData {
  // Step 1: เลือกพนักงาน (Active only)
  step1: {
    selectedEmployee: MockEmployee | null
  }
  // Step 2: เหตุผลและวันสุดท้าย
  step2: {
    termReason: string | null       // 17 TERM_* codes
    lastDayWorked: string | null
    effectiveEndDate: string | null
  }
  // Step 3: OK to Rehire
  step3: {
    okToRehire: boolean
    termComments: string
  }
  // Step 4: Approval Chain Preview (scaffold — ไม่มี field จริง ดูแค่)
  step4: Record<string, never>
  // Step 5: ยืนยัน + Submit
  step5: Record<string, never>
}

// ---------- Initial form data ----------

const initialRehireData: RehireFormData = {
  step1: { selectedEmployee: null, eventReason: null },
  step2: { rehireDate: null },
  step3: { dateOfBirth: null },
  step4: { employeeClass: null },
  step5: { addressLine1: '' },
  step6: { position: '', businessUnit: null },
  step7: { baseSalary: null },
}

const initialTransferData: TransferFormData = {
  step1: { selectedEmployee: null },
  step2: { transferReason: null },
  step3: { effectiveDate: null },
  step4: { newCompany: null, businessUnit: null, department: '', position: '', costCenter: '', jobCode: '', location: '' },
  step5: { carryOverCompensation: true, newBaseSalary: null },
  step6: {},
}

const initialTerminateData: TerminateFormData = {
  step1: { selectedEmployee: null },
  step2: { termReason: null, lastDayWorked: null, effectiveEndDate: null },
  step3: { okToRehire: true, termComments: '' },
  step4: {},
  step5: {},
}

// ---------- Discriminated union ของ flow state ----------

type LifecycleFlow =
  | { flow: 'rehire';    formData: RehireFormData;    maxStep: 7 }
  | { flow: 'transfer';  formData: TransferFormData;  maxStep: 6 }
  | { flow: 'terminate'; formData: TerminateFormData; maxStep: 5 }

// ---------- Store State + Actions ----------

interface LifecycleWizardState {
  // flow = null หมายความว่ายังไม่ได้เลือก flow (initial)
  active: LifecycleFlow | null
  currentStep: number
  maxUnlockedStep: number

  // Actions
  setFlow: (flow: 'rehire' | 'transfer' | 'terminate') => void
  setStepData: <F extends 'rehire' | 'transfer' | 'terminate'>(
    flow: F,
    step: number,
    patch: Partial<
      F extends 'rehire' ? RehireFormData[keyof RehireFormData]
      : F extends 'transfer' ? TransferFormData[keyof TransferFormData]
      : TerminateFormData[keyof TerminateFormData]
    >
  ) => void
  goNext: () => void
  goBack: () => void
  jumpTo: (step: number) => void
  isStepValid: (step: number) => boolean
  reset: () => void
}

// ---------- Validation logic ต่อ flow ต่อ step ----------

function checkRehireStepValid(step: number, data: RehireFormData): boolean {
  switch (step) {
    case 1:
      // Step 1: ต้องเลือกพนักงาน + มี eventReason + okToRehire ต้องไม่เป็น false
      return (
        data.step1.selectedEmployee !== null &&
        data.step1.eventReason !== null &&
        data.step1.selectedEmployee.okToRehire !== false
      )
    case 2:
      return data.step2.rehireDate !== null && data.step2.rehireDate !== ''
    case 3:
      return data.step3.dateOfBirth !== null && data.step3.dateOfBirth !== ''
    case 4:
      return data.step4.employeeClass !== null && data.step4.employeeClass !== ''
    case 5:
      return data.step5.addressLine1.trim() !== ''
    case 6:
      return data.step6.position.trim() !== ''
    case 7:
      return data.step7.baseSalary !== null && data.step7.baseSalary > 0
    default:
      return false
  }
}

function checkTransferStepValid(step: number, data: TransferFormData): boolean {
  switch (step) {
    case 1:
      return data.step1.selectedEmployee !== null
    case 2:
      return data.step2.transferReason !== null
    case 3:
      return data.step3.effectiveDate !== null && data.step3.effectiveDate !== ''
    case 4: {
      // ถ้าเลือก TRN_TRNACCOMP ต้องมี newCompany ด้วย
      const needsNewCompany = data.step2.transferReason === 'TRN_TRNACCOMP'
      if (needsNewCompany && (data.step4.newCompany === null || data.step4.newCompany === '')) {
        return false
      }
      return data.step4.businessUnit !== null && data.step4.position.trim() !== ''
    }
    case 5:
      return true    // carry-over toggle มี default → valid เสมอ
    case 6:
      return true    // summary step — valid เสมอ
    default:
      return false
  }
}

function checkTerminateStepValid(step: number, data: TerminateFormData): boolean {
  switch (step) {
    case 1:
      return data.step1.selectedEmployee !== null
    case 2:
      // เหตุผล + lastDayWorked + effectiveEndDate ทุก field required — AC-11
      return (
        data.step2.termReason !== null &&
        data.step2.termReason !== '' &&
        data.step2.lastDayWorked !== null &&
        data.step2.lastDayWorked !== '' &&
        data.step2.effectiveEndDate !== null &&
        data.step2.effectiveEndDate !== ''
      )
    case 3:
      return true    // okToRehire มี default true → valid เสมอ
    case 4:
      return true    // Approval chain preview — scaffold ไม่ต้อง validate
    case 5:
      return true    // summary step
    default:
      return false
  }
}

// ---------- สร้าง Zustand store ----------

export const useLifecycleWizard = create<LifecycleWizardState>((set, get) => ({
  active: null,
  currentStep: 1,
  maxUnlockedStep: 1,

  // เลือก flow ใหม่ → reset step + ตั้ง formData ตาม flow นั้น
  setFlow: (flow) => {
    const flowState: LifecycleFlow =
      flow === 'rehire'
        ? { flow: 'rehire',    formData: { ...initialRehireData,    step1: { selectedEmployee: null, eventReason: null } },  maxStep: 7 }
        : flow === 'transfer'
        ? { flow: 'transfer',  formData: { ...initialTransferData,  step1: { selectedEmployee: null } }, maxStep: 6 }
        : { flow: 'terminate', formData: { ...initialTerminateData, step1: { selectedEmployee: null } }, maxStep: 5 }

    set({ active: flowState, currentStep: 1, maxUnlockedStep: 1 })
  },

  // อัปเดต formData ของ step ที่ระบุ (merge — ไม่ replace ทั้ง step)
  setStepData: (flow, step, patch) => {
    const { active } = get()
    if (!active || active.flow !== flow) {
      console.warn(`[useLifecycleWizard] setStepData: flow mismatch — active=${active?.flow}, requested=${flow}`)
      return
    }

    const stepKey = `step${step}`
    // cast ผ่าน unknown ก่อนเพื่อ merge — safe เพราะ caller ส่ง patch ที่ตรง step นั้นอยู่แล้ว
    const prevData = active.formData as unknown as Record<string, unknown>
    const merged = { ...prevData, [stepKey]: { ...(prevData[stepKey] as object), ...(patch as object) } }
    set({
      active: { ...active, formData: merged as unknown as typeof active.formData } as LifecycleFlow,
    })
  },

  // ไปขั้นตอนถัดไป — validate ก่อน unlock
  goNext: () => {
    const { active, currentStep, maxUnlockedStep } = get()
    if (!active) return

    const valid = get().isStepValid(currentStep)
    if (!valid) return

    const nextStep = Math.min(currentStep + 1, active.maxStep)
    const newMax = Math.max(maxUnlockedStep, nextStep)
    set({ currentStep: nextStep, maxUnlockedStep: newMax })
  },

  // ย้อนกลับไปขั้นตอนก่อน
  goBack: () => {
    const { currentStep } = get()
    if (currentStep <= 1) return
    set({ currentStep: currentStep - 1 })
  },

  // กระโดดไป step ที่ระบุ — reject ถ้า step > maxUnlockedStep
  jumpTo: (step: number) => {
    const { active, maxUnlockedStep } = get()
    if (!active) return

    if (step < 1 || step > active.maxStep || step > maxUnlockedStep) {
      console.warn(`[useLifecycleWizard] jumpTo: step ${step} ยังถูกล็อค (max unlocked: ${maxUnlockedStep})`)
      return
    }
    set({ currentStep: step })
  },

  // ตรวจสอบ validity ของ step ที่ระบุ
  isStepValid: (step: number) => {
    const { active } = get()
    if (!active) return false

    if (active.flow === 'rehire')    return checkRehireStepValid(step, active.formData)
    if (active.flow === 'transfer')  return checkTransferStepValid(step, active.formData)
    if (active.flow === 'terminate') return checkTerminateStepValid(step, active.formData)
    return false
  },

  // reset ทุกอย่างกลับสู่ initial state
  reset: () => {
    set({ active: null, currentStep: 1, maxUnlockedStep: 1 })
  },
}))
