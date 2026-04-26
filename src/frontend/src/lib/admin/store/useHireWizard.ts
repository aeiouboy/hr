// useHireWizard.ts — Zustand store สำหรับ Hire Wizard state
//
// D2 S1 (2026-04-23): ขยาย 13 → 37 BA fields ใน FormData
//   - identity slice: เพิ่ม salutationEn, firstNameEn, middleNameEn, lastNameEn,
//     dateOfBirth, countryOfBirth, regionOfBirth, age, employeeId,
//     nationalIdCardType, country, nationalId, issueDate, expiryDate,
//     isPrimary, vnIssuePlace, salutationLocal
//   - biographical slice: เพิ่ม otherTitleTh, firstNameLocal, lastNameLocal,
//     middleNameLocal, nickname, militaryStatus, gender, nationality,
//     foreigner, bloodType, maritalStatusSince, attachment
//   - Option-1 structure ยังคง 3 clusters (Who / Job / Review)
//   - persist key ยังคง 'hire-wizard-draft' (ไม่ทำลาย existing drafts)
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ประเภท step number — จำกัดเป็น 1-3 เท่านั้น (Who / Job / Review)
type StepNumber = 1 | 2 | 3

// ── A2: Multi-value Contact types ────────────────────────────────────────────
export interface PhoneEntry { type: 'mobile' | 'office' | 'home'; value: string; isPrimary: boolean }
export interface EmailEntry { type: 'personal' | 'work'; value: string; isPrimary: boolean }
export interface JobRelationship { relationshipType: string; name: string }

// employeeClass toggle — BA cols H/I (Permanent vs Partime field visibility)
export type EmployeeClassToggle = 'PERMANENT' | 'PARTIME'

// รูปแบบข้อมูลของแต่ละ slice — trace กลับ BA-EC-SUMMARY.md ทุก field
interface FormData {
  // ── Cluster 1 "Who" (Identity) ── 20 fields
  identity: {
    // BA row 1 — Hire Date
    hireDate: string | null
    // BA row 2 — Company
    companyCode: string | null
    // BA row 3 — Event Reason
    eventReason: string | null
    // BA row 4 — Salutation (EN)
    salutationEn: string | null
    // BA row 5 — Firstname (EN)
    firstNameEn: string
    // BA row 6 — Middle Name (EN)
    middleNameEn: string
    // BA row 7 — Lastname (EN)
    lastNameEn: string
    // BA row 8 — Date of Birth
    dateOfBirth: string | null
    // BA row 9 — Country of Birth
    countryOfBirth: string | null
    // BA row 10 — Region of Birth
    regionOfBirth: string
    // BA row 11 — Age (calculated, display only)
    age: number | null
    // BA row 12 — Employee ID
    employeeId: string
    // BA row 13 — National ID Card Type
    nationalIdCardType: string | null
    // BA row 14 — Country
    country: string | null
    // BA row 15 — National ID
    nationalId: string
    // BA row 16 — Issue Date
    issueDate: string | null
    // BA row 17 — Expiry Date
    expiryDate: string | null
    // BA row 18 — Is Primary
    isPrimary: string | null
    // BA row 19 — [VN] Issue Place
    vnIssuePlace: string
    // BA Personal Info row 1 — Salutation (Local)
    salutationLocal: string | null
  }

  // ── Cluster 2 "Job" (Personal Info carry-over) ── 12 fields
  biographical: {
    // BA Personal Info row 2 — Other Title (TH)
    otherTitleTh: string
    // BA Personal Info row 3 — Firstname (Local)
    firstNameLocal: string
    // BA Personal Info row 4 — Lastname (Local)
    lastNameLocal: string
    // BA Personal Info row 5 — Middle Name (Local)
    middleNameLocal: string
    // BA Personal Info row 10 — Nickname
    nickname: string
    // BA Personal Info row 11 — Military Status
    militaryStatus: string | null
    // BA Personal Info row 12 — Gender
    gender: string | null
    // BA Personal Info row 13 — Nationality
    nationality: string | null
    // BA Personal Info row 14 — Foreigner
    foreigner: string | null
    // BA Personal Info row 15 — Blood Type
    bloodType: string | null
    // BA Personal Info row 16 — Marital Status
    maritalStatus: string | null
    // BA Personal Info row 17 — Marital Status Since
    maritalStatusSince: string | null
  }

  // ── Cluster 3 "Review" ── 5 fields (dup EN name + attachment)
  review: {
    // BA Personal Info rows 6-9 — dup EN name fields (read-only, carry from identity)
    salutationEnReview: string | null
    firstNameEnReview: string
    lastNameEnReview: string
    middleNameEnReview: string
    // BA Personal Info row 18 — Attachment
    attachmentName: string | null
  }

  // ── A2: Contact Information ── phones / emails / job relationships
  contact: {
    phones: PhoneEntry[]           // default [{type:'mobile', value:'', isPrimary:true}]
    emails: EmailEntry[]           // default [{type:'personal', value:'', isPrimary:true}]
    jobRelationships: JobRelationship[]  // default []
  }

  // Legacy slices — ยังคง interface เดิมเพื่อ backward compat กับ test suite
  name:         { firstNameTh: string; lastNameTh: string; firstNameEn: string; lastNameEn: string }
  employeeInfo: {
    employeeClass: string | null
    // Employment Details (Area C — SF Image 15)
    originalStartDate: string
    seniorityStartDate: string
    retirementDate: string
    pfServiceDate: string
    dvtPreviousId: string
    cgPreviousEmployeeId: string
    // BRD #23, #30: employeeGroup + employeeSubGroup (SF EmpJob.employeeGroup/.employeeSubGroup)
    employeeGroup?: string
    employeeSubGroup?: string
  }
  nationalId:   { value: string }
  personal:     { addressLine1: string }
  job: {
    position: string
    businessUnit: string | null
    businessUnitLabel: string | null
    branch: string | null
    branchLabel: string | null
    jobCode: string | null
    jobLabel: string | null
    jobGrade: string | null
    jobGradeLabel: string | null
    storeBranchCode: string | null
    hrDistrict: string | null
    // Time Information (Area C — SF Image 15)
    workSchedule: string
    holidayTypeCondition: string
    timeManagementStatus: string
    otFlag: string
    standardWeeklyHours: number
    dailyWorkingHours: number
    workingDaysPerWeek: number
    fte: number
    holidayCalendar: string
    timeProfile: string
    timeRecordingVariant: string
  }
  compensation: {
    baseSalary: number | null
    // BRD #27: payGroup — SF EmpCompensation.payGroup (8 codes QA/QF/QG/RA/SA/SI/TA/UA)
    payGroup?: string
    // BRD #96: currency defaults to THB (THA → THB)
    currency?: string
    payFrequency?: string
  }
}

const initialFormData: FormData = {
  identity: {
    hireDate: null,
    companyCode: null,
    eventReason: null,
    salutationEn: null,
    firstNameEn: '',
    middleNameEn: '',
    lastNameEn: '',
    dateOfBirth: null,
    countryOfBirth: null,
    regionOfBirth: '',
    age: null,
    employeeId: '',
    nationalIdCardType: null,
    country: null,
    nationalId: '',
    issueDate: null,
    expiryDate: null,
    isPrimary: null,
    vnIssuePlace: '',
    salutationLocal: null,
  },
  biographical: {
    otherTitleTh: '',
    firstNameLocal: '',
    lastNameLocal: '',
    middleNameLocal: '',
    nickname: '',
    militaryStatus: null,
    gender: null,
    nationality: null,
    foreigner: null,
    bloodType: null,
    maritalStatus: null,
    maritalStatusSince: null,
  },
  review: {
    salutationEnReview: null,
    firstNameEnReview: '',
    lastNameEnReview: '',
    middleNameEnReview: '',
    attachmentName: null,
  },
  // ── A2: Contact ──
  contact: {
    phones: [{ type: 'mobile' as const, value: '', isPrimary: true }],
    emails: [{ type: 'personal' as const, value: '', isPrimary: true }],
    jobRelationships: [],
  },
  // Legacy slices
  name:         { firstNameTh: '', lastNameTh: '', firstNameEn: '', lastNameEn: '' },
  employeeInfo: {
    employeeClass: null,
    // Employment Details (Area C — SF Image 15)
    originalStartDate: '',
    seniorityStartDate: '',
    retirementDate: '',
    pfServiceDate: '',
    dvtPreviousId: '',
    cgPreviousEmployeeId: '',
  },
  nationalId:   { value: '' },
  personal:     { addressLine1: '' },
  job: {
    position: '',
    businessUnit: null,
    businessUnitLabel: null,
    branch: null,
    branchLabel: null,
    jobCode: null,
    jobLabel: null,
    jobGrade: null,
    jobGradeLabel: null,
    storeBranchCode: null,
    hrDistrict: null,
    // Time Information (Area C — SF Image 15)
    workSchedule: '',
    holidayTypeCondition: '',
    timeManagementStatus: '',
    otFlag: '',
    standardWeeklyHours: 40,
    dailyWorkingHours: 8,
    workingDaysPerWeek: 5,
    fte: 1,
    holidayCalendar: '',
    timeProfile: '',
    timeRecordingVariant: '',
  },
  compensation: { baseSalary: null },
}

interface HireWizardState {
  currentStep: StepNumber
  maxUnlockedStep: StepNumber
  formData: FormData
  lastSavedAt: number | null
  // BA cols H/I: Permanent vs Partime field visibility toggle — top-level (not in FormData)
  employeeClassToggle: EmployeeClassToggle

  setStepData: <K extends keyof FormData>(step: K, patch: Partial<FormData[K]>) => void
  setEmployeeClassToggle: (v: EmployeeClassToggle) => void
  goNext: () => void
  goBack: () => void
  jumpTo: (step: number) => void
  isStepValid: (step: number) => boolean
  reset: () => void
}

// Per-slice validators
// Step 1 "Who" — identity required: hireDate + companyCode + eventReason + salutationEn
//   + firstNameEn + lastNameEn + dateOfBirth + employeeId + nationalIdCardType
//   + country + nationalId + isPrimary + salutationLocal
// Step 2 "Job" — biographical required: otherTitleTh + firstNameLocal + lastNameLocal
//   + middleNameLocal + nickname + militaryStatus + gender + nationality
//   + foreigner + bloodType + maritalStatus + maritalStatusSince
// Step 3 "Review" — always passable (read-only summary + optional attachment)
const sliceValid = {
  identity: (d: FormData) =>
    !!(
      d.identity.hireDate &&
      d.identity.companyCode &&
      d.identity.eventReason &&
      d.identity.salutationEn &&
      d.identity.firstNameEn.trim() &&
      d.identity.lastNameEn.trim() &&
      d.identity.dateOfBirth &&
      d.identity.employeeId.trim() &&
      d.identity.nationalIdCardType &&
      d.identity.country &&
      d.identity.nationalId.trim() &&
      d.identity.isPrimary &&
      d.identity.salutationLocal
    ),
  biographical: (d: FormData) => {
    // Fix per AUDIT #7 — maritalStatusSince required only when maritalStatus ≠ SINGLE
    const maritalStatusSinceOk =
      d.biographical.maritalStatus === 'SINGLE' || !!d.biographical.maritalStatusSince
    return !!(
      d.biographical.otherTitleTh.trim() &&
      d.biographical.firstNameLocal.trim() &&
      d.biographical.lastNameLocal.trim() &&
      d.biographical.middleNameLocal.trim() &&
      d.biographical.nickname.trim() &&
      d.biographical.militaryStatus &&
      d.biographical.gender &&
      d.biographical.nationality &&
      d.biographical.foreigner &&
      d.biographical.bloodType &&
      d.biographical.maritalStatus &&
      maritalStatusSinceOk
    )
  },
  review: (_d: FormData) => true,
  // A2: contact — at least 1 phone with value + at least 1 email with valid format
  contact: (d: FormData) => {
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const hasPhone = d.contact.phones.some((p) => p.value.trim() !== '')
    const hasEmail = d.contact.emails.some((e) => EMAIL_RE.test(e.value.trim()))
    return hasPhone && hasEmail
  },
  // Legacy validators — kept for backward compat with existing tests
  name:         (d: FormData) => d.name.firstNameTh.trim() !== '' && d.name.lastNameTh.trim() !== '',
  employeeInfo: (d: FormData) => !!d.employeeInfo.employeeClass,
  nationalId:   (d: FormData) => d.nationalId.value.trim() !== '',
  personal:     (d: FormData) => d.personal.addressLine1.trim() !== '',
  job:          (d: FormData) => d.job.position.trim() !== '',
  compensation: (d: FormData) => d.compensation.baseSalary !== null && d.compensation.baseSalary > 0,
} as const

// Step 1 "Who"    = identity (20 fields)
// Step 2 "Job"    = biographical personal info (12 fields)
// Step 3 "Review" = summary + attachment (always valid)
function checkStepValid(step: number, d: FormData): boolean {
  switch (step) {
    case 1: return sliceValid.identity(d)
    case 2: return sliceValid.biographical(d)
    case 3: return sliceValid.review(d)
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
      employeeClassToggle: 'PERMANENT' as EmployeeClassToggle,

      setStepData: (step, patch) => {
        set((state) => ({
          formData: { ...state.formData, [step]: { ...state.formData[step], ...patch } },
          lastSavedAt: Date.now(),
        }))
      },

      setEmployeeClassToggle: (v) => set({ employeeClassToggle: v }),

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
        employeeClassToggle: 'PERMANENT',
      }),
    }),
    {
      name: 'hire-wizard-draft',
      storage: createJSONStorage(() => localStorage),
      // Bump on every schema change — older persisted drafts pass through
      // `migrate` before rehydrate so downstream components can trust the
      // shape. Version 2 adds: A2 contact slice (phones[]/emails[]/
      // jobRelationships[]) and any nested slice added after.
      version: 2,
      partialize: (state) => ({
        currentStep: state.currentStep,
        maxUnlockedStep: state.maxUnlockedStep,
        formData: state.formData,
        lastSavedAt: state.lastSavedAt,
        employeeClassToggle: state.employeeClassToggle,
      }),
      migrate: (persisted: unknown, fromVersion: number) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = persisted as any
        if (!p || typeof p !== 'object' || !p.formData) return p
        const fd = p.formData
        // A2 contact — fill slice + inner arrays if missing
        if (!fd.contact || typeof fd.contact !== 'object') {
          fd.contact = {
            phones: [{ type: 'mobile', value: '', isPrimary: true }],
            emails: [{ type: 'personal', value: '', isPrimary: true }],
            jobRelationships: [],
          }
        } else {
          if (!Array.isArray(fd.contact.phones)) {
            fd.contact.phones = [{ type: 'mobile', value: '', isPrimary: true }]
          }
          if (!Array.isArray(fd.contact.emails)) {
            fd.contact.emails = [{ type: 'personal', value: '', isPrimary: true }]
          }
          if (!Array.isArray(fd.contact.jobRelationships)) {
            fd.contact.jobRelationships = []
          }
        }
        console.warn(`[useHireWizard] migrated draft from v${fromVersion} → v2`)
        return p
      },
    },
  ),
)

// Exported for Review summary so it can surface per-slice completeness
export { sliceValid }
