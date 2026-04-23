// useEmployees.ts — Zustand store สำหรับ Employee List (S2)
//
// SSoT สำหรับ 1K mock employees + search filter + in-memory patch.
// S3 (Employee Profile) consumes getById(id).
// S5 (Edit form — Wave 2) consumes updateEmployee(id, patch).
//
// ห้าม persist ไปยัง localStorage — mock data is ephemeral.
// ห้าม real API calls ในไฟล์นี้.

import { create } from 'zustand'
import { MOCK_EMPLOYEES, type MockEmployee } from '@/mocks/employees'

// ──────────────────────────────────────────────
// State interface
// ──────────────────────────────────────────────

export interface EmployeesState {
  all: MockEmployee[]
  searchQuery: string
  setSearchQuery: (q: string) => void
  getById: (id: string) => MockEmployee | undefined
  getFiltered: () => MockEmployee[]
  // S5 Wave 2 contract — in-memory patch stub.
  // S5 Edit form will call: updateEmployee(id, { status: 'active', ... })
  updateEmployee: (id: string, patch: Partial<MockEmployee>) => void
}

// ──────────────────────────────────────────────
// Store
// ──────────────────────────────────────────────

export const useEmployees = create<EmployeesState>()((set, get) => ({
  all: MOCK_EMPLOYEES,
  searchQuery: '',

  setSearchQuery: (q) => set({ searchQuery: q }),

  getById: (id) => get().all.find((e) => e.employee_id === id),

  getFiltered: () => {
    const { all, searchQuery } = get()
    const q = searchQuery.trim().toLowerCase()
    if (!q) return all
    return all.filter(
      (e) =>
        e.first_name_th.toLowerCase().includes(q) ||
        e.last_name_th.toLowerCase().includes(q) ||
        e.first_name_en.toLowerCase().includes(q) ||
        e.last_name_en.toLowerCase().includes(q) ||
        e.employee_id.toLowerCase().startsWith(q),
    )
  },

  // S5 Wave 2 consumer: call with (id, patch) to update in-memory record.
  // Real API integration will replace this action body — interface stays stable.
  updateEmployee: (id, patch) =>
    set((state) => ({
      all: state.all.map((e) =>
        e.employee_id === id ? { ...e, ...patch } : e,
      ),
    })),
}))
