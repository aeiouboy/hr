'use client'

// useProfileEdit.ts — Zustand store สำหรับ ESS Profile Edit form state
// รองรับ draft บันทึก localStorage + submit workflow
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// รูปแบบข้อมูลที่พนักงานแก้ไขได้ — National ID เป็น readonly ไม่อยู่ใน form
export interface ProfileEditData {
  firstNameTh: string
  lastNameTh: string
  firstNameEn: string
  lastNameEn: string
  dateOfBirth: string
  address: string
  emergencyContactName: string
  emergencyContactPhone: string
}

interface ProfileEditState {
  draft: ProfileEditData
  isDirty: boolean
  isSubmitting: boolean

  // Actions
  setField: <K extends keyof ProfileEditData>(field: K, value: ProfileEditData[K]) => void
  loadFromEmployee: (data: ProfileEditData) => void
  submit: () => Promise<void>
  reset: () => void
}

const initialDraft: ProfileEditData = {
  firstNameTh: '',
  lastNameTh: '',
  firstNameEn: '',
  lastNameEn: '',
  dateOfBirth: '',
  address: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
}

export const useProfileEdit = create<ProfileEditState>()(
  persist(
    (set, get) => ({
      draft: initialDraft,
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
      loadFromEmployee: (data) => {
        set({ draft: data, isDirty: false })
      },

      // mock submit — log payload + redirect handled ใน component
      submit: async () => {
        const { draft } = get()
        set({ isSubmitting: true })
        try {
          // mock async delay 300ms เพื่อ simulate network
          await new Promise((resolve) => setTimeout(resolve, 300))
          console.log('[useProfileEdit] submit payload:', {
            requestType: 'PERSONAL_INFO_UPDATE',
            employeeId: 'E001',
            data: draft,
            submittedAt: new Date().toISOString(),
          })
          set({ isDirty: false })
        } catch (err) {
          console.warn('[useProfileEdit] submit failed:', err)
          throw err
        } finally {
          set({ isSubmitting: false })
        }
      },

      // reset draft กลับ initial state
      reset: () => {
        set({ draft: initialDraft, isDirty: false, isSubmitting: false })
      },
    }),
    {
      name: 'ess-profile-edit-draft',
      // persist เฉพาะ draft field — isSubmitting ไม่ต้อง persist
      partialize: (state) => ({ draft: state.draft, isDirty: state.isDirty }),
    }
  )
)
