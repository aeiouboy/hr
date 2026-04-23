// useEmploymentEvents.ts — B2 Zustand store สำหรับ employment event history
//
// Append-only event log per employee — Stark "ไม่ลบ" principle (I1).
// Persist via localStorage key 'humi-employment-events-v1' (I10).
// Validation on append: validateAppend() throws Thai-primary errors on violation.
// Seed: idempotent HIRE event generation from existing employee list (I9).

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ulid } from 'ulid'

import type { EmploymentSnapshot, LifecycleEvent } from './employment-event-types'
import { validateAppend } from './lifecycle-validator'
import { foldEventsToSnapshot } from './state-fold'

// ────────────────────────────────────────────────────────────────
// State interface
// ────────────────────────────────────────────────────────────────

export interface EmploymentEventsState {
  // Data — append-only flat array (เก็บทุก employee รวมกัน)
  events: LifecycleEvent[]

  // ── Queries (stable selectors) ────────────────────────────────

  /** คืน events ทั้งหมดของ employee คนนี้ เรียง effectiveDate ascending */
  eventsForEmployee: (employeeId: string) => LifecycleEvent[]

  /**
   * I5 / E6: คืน events ที่ effectiveDate <= asOfDate เท่านั้น
   * sorted ascending by effectiveDate
   */
  eventsAsOf: (employeeId: string, asOfDate: string) => LifecycleEvent[]

  /**
   * I14: pure snapshot at asOfDate — no side effects
   * I7: returns PENDING_HIRE when no events
   */
  stateAsOf: (employeeId: string, asOfDate: string) => EmploymentSnapshot

  // ── Mutations ────────────────────────────────────────────────

  /**
   * Validate + append a new event.
   * I1: ไม่มี updateEvent / deleteEvent — append only.
   * I12: recordedAt set by store (caller ไม่สามารถ override ได้).
   * I11: id เป็น ULID (sortable, unique).
   * Throws LifecycleViolationError / DuplicateHireError / IncompleteEventError on violation.
   *
   * @param event - event without id + recordedAt (store generates these)
   * @returns the stored event (with id + recordedAt populated)
   */
  appendEvent: (event: Omit<LifecycleEvent, 'id' | 'recordedAt'>) => LifecycleEvent

  /**
   * I9: seed HIRE events from existing employee list — idempotent.
   * เรียกได้หลายครั้ง ถ้า employee นั้นมี events อยู่แล้วจะ skip.
   */
  seedFromEmployees: (employees: { employee_id: string; hire_date: string }[]) => void

  // ── Admin (tests / dev tools only — ไม่ expose ใน prod UI) ─────
  _reset: () => void
}

// ────────────────────────────────────────────────────────────────
// Store
// ────────────────────────────────────────────────────────────────

export const useEmploymentEvents = create<EmploymentEventsState>()(
  persist(
    (set, get) => ({
      events: [],

      // ── eventsForEmployee ──────────────────────────────────────
      eventsForEmployee: (employeeId) => {
        return get()
          .events.filter((e) => e.employeeId === employeeId)
          .sort((a, b) => {
            const cmp = a.effectiveDate.localeCompare(b.effectiveDate)
            if (cmp !== 0) return cmp
            return a.recordedAt.localeCompare(b.recordedAt)
          })
      },

      // ── eventsAsOf ────────────────────────────────────────────
      eventsAsOf: (employeeId, asOfDate) => {
        return get()
          .events.filter(
            (e) => e.employeeId === employeeId && e.effectiveDate <= asOfDate,
          )
          .sort((a, b) => {
            const cmp = a.effectiveDate.localeCompare(b.effectiveDate)
            if (cmp !== 0) return cmp
            return a.recordedAt.localeCompare(b.recordedAt)
          })
      },

      // ── stateAsOf ─────────────────────────────────────────────
      stateAsOf: (employeeId, asOfDate) => {
        const empEvents = get().events.filter((e) => e.employeeId === employeeId)
        return foldEventsToSnapshot(employeeId, empEvents, asOfDate)
      },

      // ── appendEvent ───────────────────────────────────────────
      appendEvent: (event) => {
        const { events } = get()

        // I12: recordedAt set by store — caller value ignored
        // validateAppend throws on violation (C3 — hard throws per spec §9 decision 3)
        validateAppend(events, event)

        const storedEvent: LifecycleEvent = {
          ...event,
          id: ulid(),                          // I11: ULID
          recordedAt: new Date().toISOString(), // I12: auto-set
        }

        set({ events: [...events, storedEvent] })
        return storedEvent
      },

      // ── seedFromEmployees ─────────────────────────────────────
      seedFromEmployees: (employees) => {
        const { events } = get()

        const newEvents: LifecycleEvent[] = []

        for (const emp of employees) {
          // I9: idempotent — skip ถ้า employee นี้มี events อยู่แล้ว
          const hasExisting = events.some((e) => e.employeeId === emp.employee_id)
          if (hasExisting) continue

          // skip ถ้าไม่มี hire_date หรือ hire_date ไม่ valid
          if (!emp.hire_date) continue
          const d = new Date(emp.hire_date)
          if (isNaN(d.getTime())) continue

          newEvents.push({
            id: ulid(),
            employeeId: emp.employee_id,
            type: 'HIRE',
            effectiveDate: emp.hire_date,
            recordedAt: `${emp.hire_date}T00:00:00.000Z`, // deterministic seed timestamp
            createdBy: 'seed',
          })
        }

        if (newEvents.length > 0) {
          set({ events: [...events, ...newEvents] })
        }
      },

      // ── _reset (dev/test only) ─────────────────────────────────
      _reset: () => set({ events: [] }),
    }),
    {
      name: 'humi-employment-events-v1',         // I10: localStorage key
      storage: createJSONStorage(() => localStorage),
      // persist events array only — methods ถูก recreate ทุก hydration
      partialize: (state) => ({ events: state.events }),
    },
  ),
)
