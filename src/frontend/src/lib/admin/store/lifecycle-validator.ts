// lifecycle-validator.ts — pure validateAppend function (B2)
//
// Validates that a new event can be appended to an employee's event history.
// Throws Thai-primary error messages on violation (spec §8 decision 3, C6).
// No side effects — caller (store) handles state mutation.

import type { LifecycleEvent } from './employment-event-types'
import {
  DuplicateHireError,
  IncompleteEventError,
  LifecycleViolationError,
} from './employment-event-types'

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

function isValidISODate(value: string): boolean {
  if (!value || typeof value !== 'string') return false
  const d = new Date(value)
  return !isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function eventsForEmployee(all: LifecycleEvent[], employeeId: string): LifecycleEvent[] {
  return all
    .filter((e) => e.employeeId === employeeId)
    .sort((a, b) => a.effectiveDate.localeCompare(b.effectiveDate))
}

// ────────────────────────────────────────────────────────────────
// validateAppend
// ────────────────────────────────────────────────────────────────

/**
 * Validates that `newEvent` can be appended to the existing events array.
 * Pure function — throws on violation, returns void on success.
 *
 * Covers: I2, I3, I4, E1-E3, E10 from spec §4/§6.
 *
 * @param events   - current store events (all employees)
 * @param newEvent - candidate event (without id/recordedAt — added by store)
 */
export function validateAppend(
  events: LifecycleEvent[],
  newEvent: Omit<LifecycleEvent, 'id' | 'recordedAt'>,
): void {
  const { employeeId, type, effectiveDate, meta } = newEvent

  // ── I2: required fields ────────────────────────────────────────
  if (!isValidISODate(effectiveDate)) {
    throw new LifecycleViolationError(
      `effectiveDate "${effectiveDate}" ไม่ใช่วันที่ ISO 8601 ที่ถูกต้อง (YYYY-MM-DD)`,
    )
  }
  if (!employeeId || typeof employeeId !== 'string' || !employeeId.trim()) {
    throw new LifecycleViolationError('employeeId ต้องระบุ — ห้ามเป็น empty string')
  }

  const VALID_TYPES: ReadonlyArray<LifecycleEvent['type']> = [
    'HIRE', 'REHIRE', 'TRANSFER', 'CHANGE_POSITION', 'CHANGE_JOB',
    'PROMOTION', 'DEMOTION', 'ACTING_START', 'ACTING_END',
    'SUSPEND_START', 'SUSPEND_END', 'TERMINATE',
    'CHANGE_EMPLOYEE_TYPE',
  ]
  if (!VALID_TYPES.includes(type)) {
    throw new LifecycleViolationError(`type "${type}" ไม่ถูกต้อง`)
  }

  const empEvents = eventsForEmployee(events, employeeId)
  const lastEvent = empEvents[empEvents.length - 1]

  // ── E1 / I3: HIRE validation ──────────────────────────────────
  if (type === 'HIRE') {
    const existingHires = empEvents.filter((e) => e.type === 'HIRE')
    if (existingHires.length > 0) {
      // อนุญาต HIRE ซ้ำเฉพาะถ้า chain สุดท้ายมี TERMINATE แล้วตามด้วย REHIRE
      // E1: ถ้ายังไม่ terminate → DuplicateHireError
      const hasTerminate = empEvents.some((e) => e.type === 'TERMINATE')
      if (!hasTerminate) {
        throw new DuplicateHireError(
          `ไม่สามารถ append HIRE ได้ — พนักงาน ${employeeId} มี HIRE อยู่แล้วและยังไม่ได้ TERMINATE`,
        )
      }
      // มี TERMINATE แต่ยังไม่มี REHIRE หลัง TERMINATE สุดท้าย
      const lastTerminateIdx = empEvents.map((e) => e.type).lastIndexOf('TERMINATE')
      const hasRehireAfterTerminate = empEvents
        .slice(lastTerminateIdx + 1)
        .some((e) => e.type === 'REHIRE')
      if (!hasRehireAfterTerminate) {
        throw new DuplicateHireError(
          `ไม่สามารถ append HIRE ได้ — ต้อง REHIRE หลัง TERMINATE ก่อน`,
        )
      }
    }
  }

  // ── I3: REHIRE ต้องมี TERMINATE ก่อน ─────────────────────────
  if (type === 'REHIRE') {
    const lastTerminateIdx = empEvents.map((e) => e.type).lastIndexOf('TERMINATE')
    if (lastTerminateIdx === -1) {
      throw new LifecycleViolationError(
        `ไม่สามารถ REHIRE ได้ — พนักงาน ${employeeId} ยังไม่เคย TERMINATE`,
      )
    }
    // ห้าม REHIRE ซ้อน REHIRE (ต้อง TERMINATE ก่อน)
    const hasRehireAfterLastTerminate = empEvents
      .slice(lastTerminateIdx + 1)
      .some((e) => e.type === 'REHIRE')
    if (hasRehireAfterLastTerminate) {
      throw new LifecycleViolationError(
        `ไม่สามารถ REHIRE ซ้ำได้ — มี REHIRE อยู่แล้วหลัง TERMINATE สุดท้าย`,
      )
    }
  }

  // ── I3: ห้าม append events ที่ต้อง active status หลัง TERMINATE ─
  if (lastEvent?.type === 'TERMINATE') {
    const allowedAfterTerminate: ReadonlyArray<LifecycleEvent['type']> = ['REHIRE', 'HIRE']
    if (!allowedAfterTerminate.includes(type)) {
      throw new LifecycleViolationError(
        `ไม่สามารถ append "${type}" ได้ — พนักงาน ${employeeId} ถูก TERMINATE แล้ว ต้อง REHIRE ก่อน`,
      )
    }
  }

  // ── E2: TRANSFER ต้องมี fromBU และ toBU ──────────────────────
  if (type === 'TRANSFER') {
    if (!meta?.fromBU || !meta?.toBU) {
      throw new IncompleteEventError(
        `TRANSFER ต้องระบุ meta.fromBU และ meta.toBU — อย่างน้อยหนึ่งค่าขาดหายไป`,
      )
    }
  }

  // ── E3: PROMOTION/DEMOTION ห้าม fromJG === toJG ──────────────
  if (type === 'PROMOTION' || type === 'DEMOTION') {
    if (meta?.fromJG && meta?.toJG && meta.fromJG === meta.toJG) {
      throw new IncompleteEventError(
        `${type} ไม่สามารถทำได้เมื่อ fromJG และ toJG เป็นค่าเดียวกัน ("${meta.fromJG}")`,
      )
    }
  }

  // ── I4: SUSPEND_START ห้าม overlap (ต้องมี SUSPEND_END ก่อน) ─
  if (type === 'SUSPEND_START') {
    const openSuspend = empEvents.reduce<boolean>((open, e) => {
      if (e.type === 'SUSPEND_START') return true
      if (e.type === 'SUSPEND_END') return false
      return open
    }, false)
    if (openSuspend) {
      throw new LifecycleViolationError(
        `ไม่สามารถ SUSPEND_START ซ้ำได้ — มี SUSPEND_START ที่ยังไม่มี SUSPEND_END`,
      )
    }
  }

  // ── E10: SUSPEND_END ต้องมี SUSPEND_START ก่อน ───────────────
  if (type === 'SUSPEND_END') {
    const openSuspend = empEvents.reduce<boolean>((open, e) => {
      if (e.type === 'SUSPEND_START') return true
      if (e.type === 'SUSPEND_END') return false
      return open
    }, false)
    if (!openSuspend) {
      throw new LifecycleViolationError(
        `ไม่สามารถ SUSPEND_END ได้ — ไม่มี SUSPEND_START ที่ค้างอยู่`,
      )
    }
  }

  // ── ACTING_END ต้องมี ACTING_START ก่อน ──────────────────────
  if (type === 'ACTING_END') {
    const openActing = empEvents.reduce<boolean>((open, e) => {
      if (e.type === 'ACTING_START') return true
      if (e.type === 'ACTING_END') return false
      return open
    }, false)
    if (!openActing) {
      throw new LifecycleViolationError(
        `ไม่สามารถ ACTING_END ได้ — ไม่มี ACTING_START ที่ค้างอยู่`,
      )
    }
  }
}
