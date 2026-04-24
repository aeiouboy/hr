'use client'

// useProfileEdit.ts — Zustand store สำหรับ ESS Profile Edit form state
// รองรับ draft บันทึก localStorage + submit-for-approval workflow
//
// 5-persona journey wiring: submit() ตอนนี้ส่งต่อให้ workflow-approvals store
// เพื่อให้ approver (Manager / HRBP / SPD) เห็น request ใน inbox ของตัวเอง
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useWorkflowApprovals, type FieldDiff, type Attachment } from '@/stores/workflow-approvals'
import { useAuthStore } from '@/stores/auth-store'

// รูปแบบข้อมูลที่พนักงานแก้ไขได้ — National ID + read-only system fields
// ไม่อยู่ใน form. Layout อิงตาม SAP SuccessFactors Personal Information
// dialog: Salutation/Name/Nickname × EN+Local + gender/marital/nationality/
// military/blood + Global Information (country/religion/disability) + 8-field
// Thai address + emergency contact.
export interface ProfileEditData {
  // ── Personal Information (SF Block 1) ──────────────────────
  salutationEn: string
  salutationLocal: string
  otherTitleTh: string
  firstNameEn: string
  middleNameEn: string
  lastNameEn: string
  firstNameTh: string
  middleNameTh: string
  lastNameTh: string
  nickname: string
  dateOfBirth: string
  gender: string
  maritalStatus: string
  maritalStatusSince: string
  nationality: string
  militaryStatus: string
  bloodType: string

  // ── Global Information (SF Block 2) ────────────────────────
  country: string
  religion: string
  disabilityStatus: string

  // ── Address ────────────────────────────────────────────────
  addressHouseNo: string
  addressMoo: string
  addressSoi: string
  addressRoad: string
  addressSubdistrict: string
  addressDistrict: string
  addressProvince: string
  addressPostalCode: string

  // ── Emergency contact ──────────────────────────────────────
  emergencyContactName: string
  emergencyContactPhone: string
}

interface ProfileEditState {
  draft: ProfileEditData
  baseline: ProfileEditData
  isDirty: boolean
  isSubmitting: boolean

  // Actions
  setField: <K extends keyof ProfileEditData>(field: K, value: ProfileEditData[K]) => void
  loadFromEmployee: (data: ProfileEditData) => void
  /** Submit for approval. Returns the new request id if something was sent; null if there were no diffs.
   *  Pass `attachments` for cases that require documentation (e.g. name change). */
  submit: (attachments?: Attachment[]) => Promise<string | null>
  reset: () => void
}

const initialDraft: ProfileEditData = {
  salutationEn: '',
  salutationLocal: '',
  otherTitleTh: '',
  firstNameEn: '',
  middleNameEn: '',
  lastNameEn: '',
  firstNameTh: '',
  middleNameTh: '',
  lastNameTh: '',
  nickname: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  maritalStatusSince: '',
  nationality: '',
  militaryStatus: '',
  bloodType: '',
  country: '',
  religion: '',
  disabilityStatus: '',
  addressHouseNo: '',
  addressMoo: '',
  addressSoi: '',
  addressRoad: '',
  addressSubdistrict: '',
  addressDistrict: '',
  addressProvince: '',
  addressPostalCode: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
}

// Thai labels — used in the diff display inside approver inbox cards.
const FIELD_LABEL: Record<keyof ProfileEditData, string> = {
  salutationEn: 'Salutation (EN)',
  salutationLocal: 'คำนำหน้าชื่อ (ไทย)',
  otherTitleTh: 'คำนำหน้าอื่น (TH)',
  firstNameEn: 'ชื่อ (EN)',
  middleNameEn: 'ชื่อกลาง (EN)',
  lastNameEn: 'นามสกุล (EN)',
  firstNameTh: 'ชื่อ (ไทย)',
  middleNameTh: 'ชื่อกลาง (ไทย)',
  lastNameTh: 'นามสกุล (ไทย)',
  nickname: 'ชื่อเล่น',
  dateOfBirth: 'วันเกิด',
  gender: 'เพศ',
  maritalStatus: 'สถานภาพสมรส',
  maritalStatusSince: 'วันที่เปลี่ยนสถานภาพ',
  nationality: 'สัญชาติ',
  militaryStatus: 'สถานะทางทหาร',
  bloodType: 'กรุ๊ปเลือด',
  country: 'ประเทศ',
  religion: 'ศาสนา',
  disabilityStatus: 'สถานะผู้พิการ',
  addressHouseNo: 'ที่อยู่ — บ้านเลขที่',
  addressMoo: 'ที่อยู่ — หมู่',
  addressSoi: 'ที่อยู่ — ซอย',
  addressRoad: 'ที่อยู่ — ถนน',
  addressSubdistrict: 'ที่อยู่ — ตำบล/แขวง',
  addressDistrict: 'ที่อยู่ — อำเภอ/เขต',
  addressProvince: 'ที่อยู่ — จังหวัด',
  addressPostalCode: 'ที่อยู่ — รหัสไปรษณีย์',
  emergencyContactName: 'ผู้ติดต่อฉุกเฉิน (ชื่อ)',
  emergencyContactPhone: 'ผู้ติดต่อฉุกเฉิน (เบอร์)',
}

function computeDiff(baseline: ProfileEditData, draft: ProfileEditData): FieldDiff[] {
  const keys = Object.keys(FIELD_LABEL) as (keyof ProfileEditData)[]
  const diffs: FieldDiff[] = []
  for (const k of keys) {
    const before = baseline[k] ?? ''
    const after = draft[k] ?? ''
    if (before !== after) {
      diffs.push({ path: k, label: FIELD_LABEL[k], before, after })
    }
  }
  return diffs
}

export const useProfileEdit = create<ProfileEditState>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
      baseline: initialDraft,
      isDirty: false,
      isSubmitting: false,

      // อัปเดต field เดียว — ตั้ง isDirty = true
      setField: (field, value) => {
        set((state) => ({
          draft: { ...state.draft, [field]: value },
          isDirty: true,
        }))
      },

      // โหลดข้อมูลพนักงานเข้า draft — ใช้ตอนเปิดหน้า edit
      // บันทึก baseline ไว้ด้วยเพื่อให้ submit เทียบ diff ตอนส่ง approval
      loadFromEmployee: (data) => {
        set({ draft: data, baseline: data, isDirty: false })
      },

      // ส่งเข้า workflow-approvals store → approver inboxes เห็นทันที
      submit: async (attachments) => {
        const { draft, baseline } = get()
        set({ isSubmitting: true })
        try {
          await new Promise((resolve) => setTimeout(resolve, 250))
          const diffs = computeDiff(baseline, draft)
          if (diffs.length === 0) {
            console.warn('[useProfileEdit] submit: no field changes — skip')
            return null
          }
          const auth = useAuthStore.getState()
          const role = auth.roles[0] ?? 'employee'
          const id = useWorkflowApprovals.getState().addRequest({
            type: 'personal_info_change',
            employeeId: auth.userId ?? 'E000',
            employeeName: auth.username ?? 'ผู้ใช้',
            submittedBy: {
              id: auth.userId ?? 'E000',
              name: auth.username ?? 'ผู้ใช้',
              role,
            },
            diffs,
            attachments: attachments && attachments.length > 0 ? attachments : undefined,
          })
          // draft merged into baseline so next edit compares against latest submission
          set({ isDirty: false, baseline: draft })
          return id
        } catch (err) {
          console.warn('[useProfileEdit] submit failed:', err)
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      // reset draft กลับ initial state
      reset: () => {
        set({ draft: initialDraft, baseline: initialDraft, isDirty: false, isSubmitting: false })
      },
    }),
    {
      name: 'ess-profile-edit-draft',
      // persist เฉพาะ draft + baseline field — isSubmitting ไม่ต้อง persist
      partialize: (state) => ({ draft: state.draft, baseline: state.baseline, isDirty: state.isDirty }),
    }
  )
)
