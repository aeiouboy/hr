// state-fold.ts — pure foldEventsToSnapshot function (B2)
//
// Folds an array of LifecycleEvent into an EmploymentSnapshot at a given date.
// Pure function — no side effects, no store access (I14).
// Invariants covered: I5, I6, I7, I8, I14, E4, E5, E6.

import type { EmploymentSnapshot, LifecycleEvent } from './employment-event-types'

/**
 * foldEventsToSnapshot
 *
 * Computes the employment state of a single employee at `asOfDate`.
 * Events from any date range are accepted (including future-dated per I8).
 *
 * @param employeeId - employee ID
 * @param allEvents  - all events for THIS employee (pre-filtered by caller)
 * @param asOfDate   - ISO 8601 YYYY-MM-DD
 */
export function foldEventsToSnapshot(
  employeeId: string,
  allEvents: LifecycleEvent[],
  asOfDate: string,
): EmploymentSnapshot {
  // I5 / E6: filter events ≤ asOfDate (inclusive, use string compare — ISO dates sort correctly)
  const events = allEvents
    .filter((e) => e.effectiveDate <= asOfDate)
    .sort((a, b) => {
      // primary sort: effectiveDate ascending
      const cmp = a.effectiveDate.localeCompare(b.effectiveDate)
      if (cmp !== 0) return cmp
      // secondary sort: recordedAt ascending (I11 — ULID order preserved via recordedAt)
      return a.recordedAt.localeCompare(b.recordedAt)
    })

  // I7 / E4: no events → PENDING_HIRE
  if (events.length === 0) {
    return {
      employeeId,
      asOfDate,
      status: 'PENDING_HIRE',
      actingPositions: [],
      events: [],
    }
  }

  // ── Fold state machine ─────────────────────────────────────────
  let status: EmploymentSnapshot['status'] = 'PENDING_HIRE'
  let currentBU: string | undefined
  let currentPosition: string | undefined
  let currentJG: string | undefined
  let currentJob: string | undefined
  let hireDate: string | undefined
  let mostRecentStartDate: string | undefined
  let continuousServiceStart: string | undefined

  // ACTING_START stack — track currently active acting assignments (E5)
  const openActingRoles: string[] = []
  // SUSPEND tracking
  let isSuspended = false

  for (const evt of events) {
    switch (evt.type) {
      case 'HIRE':
        status = 'ACTIVE'
        if (!hireDate) hireDate = evt.effectiveDate
        mostRecentStartDate = evt.effectiveDate
        if (!continuousServiceStart) continuousServiceStart = evt.meta?.seniorityOverride ?? evt.effectiveDate
        if (evt.meta?.toBU) currentBU = evt.meta.toBU
        if (evt.meta?.toPosition) currentPosition = evt.meta.toPosition
        if (evt.meta?.toJG) currentJG = evt.meta.toJG
        if (evt.meta?.toJob) currentJob = evt.meta.toJob
        break

      case 'REHIRE':
        status = 'ACTIVE'
        mostRecentStartDate = evt.effectiveDate
        // REHIRE continuity: seniorityOverride ถ้ามี, ไม่งั้นใช้ original hireDate (DOC-1F011548)
        if (evt.meta?.seniorityOverride) {
          continuousServiceStart = evt.meta.seniorityOverride
        } else if (evt.meta?.newEmployeeCode) {
          // new employee code = service clock resets
          continuousServiceStart = evt.effectiveDate
          hireDate = evt.effectiveDate
        }
        if (evt.meta?.toBU) currentBU = evt.meta.toBU
        if (evt.meta?.toPosition) currentPosition = evt.meta.toPosition
        if (evt.meta?.toJG) currentJG = evt.meta.toJG
        if (evt.meta?.toJob) currentJob = evt.meta.toJob
        break

      case 'TRANSFER':
        if (evt.meta?.toBU) currentBU = evt.meta.toBU
        if (evt.meta?.toPosition) currentPosition = evt.meta.toPosition
        break

      case 'CHANGE_POSITION':
        if (evt.meta?.toPosition) currentPosition = evt.meta.toPosition
        break

      case 'CHANGE_JOB':
        if (evt.meta?.toJob) currentJob = evt.meta.toJob
        break

      case 'PROMOTION':
      case 'DEMOTION':
        if (evt.meta?.toJG) currentJG = evt.meta.toJG
        if (evt.meta?.toPosition) currentPosition = evt.meta.toPosition
        break

      case 'ACTING_START':
        // E5: push acting role — allow concurrent acting
        if (evt.meta?.toPosition) {
          openActingRoles.push(evt.meta.toPosition)
        } else {
          openActingRoles.push(`acting-${evt.effectiveDate}`)
        }
        break

      case 'ACTING_END':
        // Pop the most recent matching acting role
        if (evt.meta?.toPosition) {
          const idx = openActingRoles.lastIndexOf(evt.meta.toPosition)
          if (idx !== -1) openActingRoles.splice(idx, 1)
        } else {
          openActingRoles.pop()
        }
        break

      case 'SUSPEND_START':
        isSuspended = true
        break

      case 'SUSPEND_END':
        isSuspended = false
        break

      case 'TERMINATE':
        status = 'TERMINATED'
        isSuspended = false
        // clear acting positions on terminate
        openActingRoles.length = 0
        break
    }
  }

  // Override ACTIVE with SUSPENDED if currently in suspension
  if (status === 'ACTIVE' && isSuspended) {
    status = 'SUSPENDED'
  }

  // I6: status === 'TERMINATED' iff last relevant event is TERMINATE (no REHIRE after)
  // The fold above handles this naturally via the state machine.

  return {
    employeeId,
    asOfDate,
    status,
    currentBU,
    currentPosition,
    currentJG,
    currentJob,
    hireDate,
    mostRecentStartDate,
    continuousServiceStart,
    actingPositions: [...openActingRoles],
    events,
  }
}
