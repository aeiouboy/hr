// useTimelines.ts — Zustand store สำหรับ employee timeline events
// Separate from useEmployees (S2) — keyed by employee_id
// S3 consumes read-only; Wave 2 agents append via `append` action.
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TimelineEvent } from '@hrms/shared/types/timeline'
import type { MockEmployee } from '@/mocks/employees'

// Build initial HireEvent from a MockEmployee fixture (seeded on first load)
export function buildInitialTimeline(emp: MockEmployee): TimelineEvent[] {
  return [
    {
      id: `evt-hire-${emp.employee_id}`,
      employeeId: emp.employee_id,
      kind: 'hire',
      effectiveDate: emp.hire_date,
      recordedAt: `${emp.hire_date}T00:00:00Z`,
      actorUserId: 'system',
      newClass: 'PERMANENT',
      position: emp.position_title,
    } satisfies TimelineEvent,
  ]
}

interface TimelinesState {
  byEmployee: Record<string, TimelineEvent[]>
  // append — Wave 2 (S4 probation, S5 edit) calls this to push new events
  append: (empId: string, event: TimelineEvent) => void
  // get — selector pattern; returns [] if no timeline seeded yet
  get: (empId: string) => TimelineEvent[]
  // seed — idempotent; only seeds if employee has no timeline yet
  seed: (emp: MockEmployee) => void
}

export const useTimelines = create<TimelinesState>()(
  persist(
    (set, get) => ({
      byEmployee: {},

      append: (empId, event) => {
        set((state) => ({
          byEmployee: {
            ...state.byEmployee,
            [empId]: [event, ...(state.byEmployee[empId] ?? [])],
          },
        }))
      },

      get: (empId) => get().byEmployee[empId] ?? [],

      seed: (emp) => {
        const existing = get().byEmployee[emp.employee_id]
        if (existing && existing.length > 0) return
        set((state) => ({
          byEmployee: {
            ...state.byEmployee,
            [emp.employee_id]: buildInitialTimeline(emp),
          },
        }))
      },
    }),
    {
      name: 'hr-timelines',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
