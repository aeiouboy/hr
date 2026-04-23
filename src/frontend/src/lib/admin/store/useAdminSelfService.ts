// useAdminSelfService.ts — Zustand store สำหรับ Admin Self-Service Config (Part C)
// SSoT เดียวสำหรับ 6 editors — ห้ามแตกเป็น 6 stores (Rule C7)
// BRD #178-183 — Actor: HRIS Admin
// persist middleware: persist เฉพาะ published + audit (draft = ephemeral ไม่ persist)

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import type {
  FieldConfigEntry,
  VisibilityMatrix,
  QuickActionTile,
  HomePageTile,
  AuditEntry,
  EditorName,
} from '@/lib/admin/types/adminSelfService'

import seedData from '@/data/admin/mockAdminSelfService.json'

// ---------- Draft shape — shared โดย draft + published ----------

interface ConfigSnapshot {
  fieldConfig: FieldConfigEntry[]
  visibility: VisibilityMatrix
  mandatory: VisibilityMatrix
  readonly: VisibilityMatrix
  quickActions: QuickActionTile[]
  tiles: HomePageTile[]
}

// ---------- State + Actions ----------

interface AdminSelfServiceState {
  // Draft state — ephemeral UI edits (ไม่ถูก persist)
  draft: ConfigSnapshot

  // Published state — ค่าที่ HRIS Admin confirm แล้ว (ถูก persist ลง localStorage)
  published: ConfigSnapshot

  // Audit log — 10 entries ล่าสุด (ถูก persist)
  audit: AuditEntry[]

  // isDirty — true เมื่อ draft ต่างจาก published
  isDirty: boolean

  // currentEditor — editor ที่ active อยู่ตอนนี้
  currentEditor: EditorName | null

  // ---- Actions: แก้ draft ----
  setFieldConfig: (entries: FieldConfigEntry[]) => void
  setVisibility: (fieldId: string, role: import('@/lib/admin/types/adminSelfService').RoleName, value: boolean) => void
  setMandatory: (fieldId: string, role: import('@/lib/admin/types/adminSelfService').RoleName, value: boolean) => void
  setReadOnly: (fieldId: string, role: import('@/lib/admin/types/adminSelfService').RoleName, value: boolean) => void
  setQuickActions: (tiles: QuickActionTile[]) => void
  setTiles: (tiles: HomePageTile[]) => void

  // ---- Actions: Draft/Publish/Reset lifecycle ----
  saveDraft: () => void           // บันทึก draft ลง localStorage key "admin-ss-draft-v1" (AC-7)
  publish: (editor: EditorName) => void  // copy draft → published + push audit entry + reset isDirty
  resetDraft: () => void          // คืน draft กลับเป็น published (AC-7 Reset)

  // ---- Navigation ----
  setCurrentEditor: (editor: EditorName | null) => void
}

// ---------- Seed defaults — สร้าง initial state จาก mockAdminSelfService.json ----------

const defaultSnapshot: ConfigSnapshot = {
  fieldConfig:  seedData.fieldConfig as FieldConfigEntry[],
  visibility:   seedData.visibility  as VisibilityMatrix,
  mandatory:    seedData.mandatory   as VisibilityMatrix,
  readonly:     seedData.readonly    as VisibilityMatrix,
  quickActions: seedData.quickActions as QuickActionTile[],
  tiles:        seedData.tiles        as HomePageTile[],
}

const defaultAudit: AuditEntry[] = seedData.audit as AuditEntry[]

// ---------- Helper: สร้าง audit entry ใหม่ ----------

function makeAuditEntry(editor: EditorName, adminUser = 'current.admin'): AuditEntry {
  return {
    id:           `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp:    new Date().toISOString(),
    adminUser,
    editor,
    action:       `Published ${editor}`,
    targetEntity: 'all',
    before:       null,
    after:        null,
  }
}

// ---------- Helper: keep เฉพาะ 10 entries ล่าสุด ----------

function limitAudit(entries: AuditEntry[]): AuditEntry[] {
  return entries.slice(-10)
}

// ---------- Store ----------

export const useAdminSelfService = create<AdminSelfServiceState>()(
  persist(
    (set, get) => ({
      // initial state
      draft:         { ...defaultSnapshot },
      published:     { ...defaultSnapshot },
      audit:         defaultAudit,
      isDirty:       false,
      currentEditor: null,

      // ---- setFieldConfig ----
      setFieldConfig: (entries) =>
        set((state) => ({
          draft:   { ...state.draft, fieldConfig: entries },
          isDirty: true,
        })),

      // ---- setVisibility ----
      setVisibility: (fieldId, role, value) =>
        set((state) => ({
          draft: {
            ...state.draft,
            visibility: {
              ...state.draft.visibility,
              [fieldId]: { ...state.draft.visibility[fieldId], [role]: value },
            },
          },
          isDirty: true,
        })),

      // ---- setMandatory ----
      setMandatory: (fieldId, role, value) =>
        set((state) => ({
          draft: {
            ...state.draft,
            mandatory: {
              ...state.draft.mandatory,
              [fieldId]: { ...state.draft.mandatory[fieldId], [role]: value },
            },
          },
          isDirty: true,
        })),

      // ---- setReadOnly ----
      setReadOnly: (fieldId, role, value) =>
        set((state) => ({
          draft: {
            ...state.draft,
            readonly: {
              ...state.draft.readonly,
              [fieldId]: { ...state.draft.readonly[fieldId], [role]: value },
            },
          },
          isDirty: true,
        })),

      // ---- setQuickActions ----
      setQuickActions: (tiles) =>
        set((state) => ({
          draft:   { ...state.draft, quickActions: tiles },
          isDirty: true,
        })),

      // ---- setTiles ----
      setTiles: (tiles) =>
        set((state) => ({
          draft:   { ...state.draft, tiles },
          isDirty: true,
        })),

      // ---- saveDraft — write draft to dedicated localStorage key (AC-7 บันทึกร่าง) ----
      saveDraft: () => {
        try {
          const { draft } = get()
          localStorage.setItem('admin-ss-draft-v1', JSON.stringify(draft))
        } catch (err) {
          // localStorage อาจ throw ใน SSR หรือ storage full — log แต่ไม่ crash (Rule C6)
          console.warn('[useAdminSelfService] saveDraft failed:', err)
        }
      },

      // ---- publish — copy draft → published + audit + reset isDirty (AC-6, AC-7, AC-8) ----
      publish: (editor) =>
        set((state) => {
          const newEntry = makeAuditEntry(editor)
          const updatedAudit = limitAudit([...state.audit, newEntry])
          return {
            published: { ...state.draft },
            audit:     updatedAudit,
            isDirty:   false,
          }
        }),

      // ---- resetDraft — คืน draft กลับเป็น published (AC-7 Reset) ----
      resetDraft: () =>
        set((state) => ({
          draft:   { ...state.published },
          isDirty: false,
        })),

      // ---- setCurrentEditor ----
      setCurrentEditor: (editor) => set({ currentEditor: editor }),
    }),
    {
      name: 'admin-ss-config-v1',      // localStorage key (AC-6)
      storage: createJSONStorage(() => {
        // guard สำหรับ SSR — Next.js render บน server ไม่มี localStorage (Rule C6)
        if (typeof window === 'undefined') {
          return {
            getItem: () => null,
            setItem: () => { /* noop */ },
            removeItem: () => { /* noop */ },
          }
        }
        return localStorage
      }),
      // persist เฉพาะ published + audit — draft ไม่ persist (ตาม spec AC-6)
      partialize: (state) => ({
        published: state.published,
        audit:     state.audit,
      }),
    }
  )
)
