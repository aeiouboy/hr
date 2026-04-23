// src/lib/calculations/calcYearsInX.ts
// F4: calcYearsInJob       — BRD #89
// F5: calcYearsInPosition  — BRD #88
// F6: calcYearsInBU        — BRD #87
// F7: calcYearsInJobGrade  — BRD #90
//
// Shared pattern: find "most recent reset event" per counter type, then
// count days from that date to asOf.
// If no reset event exists, count from HIRE (I11).

import type { YearMonth, LifecycleEvent } from './types'
import { InvalidEventError } from './calcYearOfService'

/** Build Thai display string from years + months */
function buildDisplay(years: number, months: number): string {
  if (years === 0 && months === 0) return '0 เดือน'
  if (years === 0) return `${months} เดือน`
  if (months === 0) return `${years} ปี`
  return `${years} ปี ${months} เดือน`
}

const MS_PER_DAY = 86_400_000

/**
 * Convert total active days to YearMonth struct.
 * +1 inclusive so exact calendar year boundaries yield correct whole years.
 */
function daysToYearMonth(totalDays: number): YearMonth {
  if (totalDays <= 0) {
    return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }
  }
  const totalMonths = Math.floor((totalDays + 1) / 30.4375)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const decimal = Math.round((totalDays / 365.25) * 10) / 10
  return { years, months, display: buildDisplay(years, months), decimal }
}

/** Parse and validate effectiveDate, throws InvalidEventError on missing/invalid */
function parseEventDate(evt: LifecycleEvent): Date {
  if (!evt.effectiveDate) {
    throw new InvalidEventError(`Event type "${evt.type}" is missing effectiveDate`)
  }
  const d = new Date(evt.effectiveDate)
  if (isNaN(d.getTime())) {
    throw new InvalidEventError(`Event type "${evt.type}" has invalid effectiveDate "${evt.effectiveDate}"`)
  }
  return d
}

/**
 * Internal helper: find most recent reset event date for a given counter.
 * Returns the Date of the most recent qualifying reset, or null if none found.
 * Caller falls back to HIRE date when null.
 * E6: sorts events by effectiveDate internally.
 */
function findLatestResetDate(
  events: LifecycleEvent[],
  isReset: (evt: LifecycleEvent, prev: LifecycleEvent | null) => boolean,
): Date | null {
  // E6: sort chronologically
  const sorted = [...events].sort((a, b) => parseEventDate(a).getTime() - parseEventDate(b).getTime())

  let latestReset: Date | null = null
  let prev: LifecycleEvent | null = null

  for (const evt of sorted) {
    if (isReset(evt, prev)) {
      latestReset = parseEventDate(evt)
    }
    prev = evt
  }

  return latestReset
}

/** Find HIRE or REHIRE date (fallback start for all counters per I11) */
function findHireDate(events: LifecycleEvent[]): Date | null {
  const sorted = [...events].sort((a, b) => parseEventDate(a).getTime() - parseEventDate(b).getTime())
  // Last HIRE or REHIRE event (most recent hire)
  let hireDate: Date | null = null
  for (const evt of sorted) {
    if (evt.type === 'HIRE' || evt.type === 'REHIRE') {
      hireDate = parseEventDate(evt)
    }
  }
  return hireDate
}

function calcFromDate(startDate: Date | null, asOf: string): YearMonth {
  if (!startDate) return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }
  const asOfDate = new Date(asOf)
  if (asOfDate < startDate) return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }
  const days = Math.floor((asOfDate.getTime() - startDate.getTime()) / MS_PER_DAY)
  return daysToYearMonth(days)
}

/**
 * F4 — calcYearsInJob
 *
 * Years since last CHANGE_JOB event.
 * CHANGE_POSITION does NOT reset (I9 — different abstractions).
 * Falls back to HIRE if no CHANGE_JOB exists (I11).
 *
 * @param events - LifecycleEvent[] (sorted internally, E6)
 * @param asOf   - ISO "YYYY-MM-DD" (default: today)
 */
export function calcYearsInJob(
  events: LifecycleEvent[],
  asOf: string = new Date().toISOString().slice(0, 10),
): YearMonth {
  const resetDate = findLatestResetDate(events, (evt) => evt.type === 'CHANGE_JOB')
  const startDate = resetDate ?? findHireDate(events)
  return calcFromDate(startDate, asOf)
}

/**
 * F5 — calcYearsInPosition
 *
 * Years since last CHANGE_POSITION event (I10).
 * CHANGE_JOB within same position does NOT reset.
 * Falls back to HIRE if no CHANGE_POSITION exists (I11).
 *
 * @param events - LifecycleEvent[]
 * @param asOf   - ISO "YYYY-MM-DD" (default: today)
 */
export function calcYearsInPosition(
  events: LifecycleEvent[],
  asOf: string = new Date().toISOString().slice(0, 10),
): YearMonth {
  const resetDate = findLatestResetDate(events, (evt) => evt.type === 'CHANGE_POSITION')
  const startDate = resetDate ?? findHireDate(events)
  return calcFromDate(startDate, asOf)
}

/**
 * F6 — calcYearsInBU
 *
 * Years in current BU.
 * Resets on TRANSFER where meta.fromBU !== meta.toBU (I7).
 * CHANGE_POSITION within same BU does NOT reset.
 * E8: if HIRE has no meta.toBU, treat HIRE as BU start (implicit initial BU).
 * Falls back to HIRE if no cross-BU TRANSFER exists (I11).
 *
 * @param events - LifecycleEvent[]
 * @param asOf   - ISO "YYYY-MM-DD" (default: today)
 */
export function calcYearsInBU(
  events: LifecycleEvent[],
  asOf: string = new Date().toISOString().slice(0, 10),
): YearMonth {
  const resetDate = findLatestResetDate(events, (evt) => {
    if (evt.type !== 'TRANSFER') return false
    // Cross-BU only — fromBU must differ from toBU
    const { fromBU, toBU } = evt.meta ?? {}
    if (!fromBU || !toBU) return false  // E8: missing BU meta = treat as same-BU, no reset
    return fromBU !== toBU
  })
  const startDate = resetDate ?? findHireDate(events)
  return calcFromDate(startDate, asOf)
}

/**
 * F6b — calcYearsInCorpTitle
 *
 * Years since last corporate-title change (PROMOTION or DEMOTION).
 * Corp title resets on the same events as job grade change.
 * No corp_title_change_date on MockEmployee yet → falls back to HIRE (I11).
 * Mirrors calcYearsInJobGrade reset logic; separate export per BRD #86.
 *
 * @param events - LifecycleEvent[]
 * @param asOf   - ISO "YYYY-MM-DD" (default: today)
 */
export function calcYearsInCorpTitle(
  events: LifecycleEvent[],
  asOf: string = new Date().toISOString().slice(0, 10),
): YearMonth {
  const resetDate = findLatestResetDate(events, (evt) => {
    if (evt.type !== 'PROMOTION' && evt.type !== 'DEMOTION') return false
    // any title change event resets corp-title counter
    return true
  })
  const startDate = resetDate ?? findHireDate(events)
  return calcFromDate(startDate, asOf)
}

/**
 * F7 — calcYearsInJobGrade
 *
 * Years since last JG change (PROMOTION or DEMOTION where meta.fromJG !== meta.toJG).
 * CHANGE_POSITION without JG change does NOT reset (I8).
 * Falls back to HIRE if no JG-changing event exists (I11).
 *
 * @param events - LifecycleEvent[]
 * @param asOf   - ISO "YYYY-MM-DD" (default: today)
 */
export function calcYearsInJobGrade(
  events: LifecycleEvent[],
  asOf: string = new Date().toISOString().slice(0, 10),
): YearMonth {
  const resetDate = findLatestResetDate(events, (evt) => {
    if (evt.type !== 'PROMOTION' && evt.type !== 'DEMOTION') return false
    const { fromJG, toJG } = evt.meta ?? {}
    // Only reset if JG actually changed
    if (!fromJG || !toJG) return true  // no meta = assume JG changed (conservative)
    return fromJG !== toJG
  })
  const startDate = resetDate ?? findHireDate(events)
  return calcFromDate(startDate, asOf)
}
