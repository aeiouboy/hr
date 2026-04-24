// useTimelines.ts — Zustand store สำหรับ employee timeline events
// Separate from useEmployees (S2) — keyed by employee_id
// S3 consumes read-only; Wave 2 agents append via `append` action.
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { TimelineEvent } from '@hrms/shared/types/timeline'
import type { MockEmployee } from '@/mocks/employees'

// Build initial timeline from a MockEmployee fixture (seeded on first load).
// A2 mockup: also emits PROMOTION + TRANSFER events when seeded mid-career dates exist,
// so Section B shows real-looking employment history (not only HIRE).
export function buildInitialTimeline(emp: MockEmployee): TimelineEvent[] {
  const events: TimelineEvent[] = [
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

  if (emp.position_start_date && emp.position_start_date !== emp.hire_date) {
    events.push({
      id: `evt-xfer-${emp.employee_id}`,
      employeeId: emp.employee_id,
      kind: 'transfer',
      effectiveDate: emp.position_start_date,
      recordedAt: `${emp.position_start_date}T00:00:00Z`,
      actorUserId: 'system',
      fromOrgUnit: emp.org_unit,
      toOrgUnit: emp.org_unit,
      fromPosition: 'ตำแหน่งเดิม',
      toPosition: emp.position_title,
    } satisfies TimelineEvent)
  }

  if (emp.corp_title_start_date && emp.corp_title_start_date !== emp.hire_date) {
    events.push({
      id: `evt-promo-${emp.employee_id}`,
      employeeId: emp.employee_id,
      kind: 'promotion',
      effectiveDate: emp.corp_title_start_date,
      recordedAt: `${emp.corp_title_start_date}T00:00:00Z`,
      actorUserId: 'system',
      fromTitle: 'ระดับก่อนหน้า',
      toTitle: emp.corporate_title,
    } satisfies TimelineEvent)
  }

  return events
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
