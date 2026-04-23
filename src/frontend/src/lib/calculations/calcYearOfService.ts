// src/lib/calculations/calcYearOfService.ts
// F3: calcYearOfService — BRD #86 + CNeXt 12-scenario rules (DOC-1F011548)
//
// Rules:
//   - SUSPEND_START..SUSPEND_END gaps are excluded from tenure (I5)
//   - ACTING_START..ACTING_END are NOT excluded (spec §8 decision 3)
//   - REHIRE after TERMINATE: default = continuous unless meta.reason === 'new_employee_code' (I6)
//   - Future hireDate → return 0, no throw (E2)
//   - Past asOf < hireDate → return 0 (I12)

import type { YearMonth, LifecycleEvent } from './types'

export class InvalidEventError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidEventError'
  }
}

/** Build Thai display string from years + months */
function buildDisplay(years: number, months: number): string {
  if (years === 0 && months === 0) return '0 เดือน'
  if (years === 0) return `${months} เดือน`
  if (months === 0) return `${years} ปี`
  return `${years} ปี ${months} เดือน`
}

/**
 * Convert total active days to YearMonth struct.
 * Uses +1 inclusive correction so that exact calendar year boundaries
 * (e.g. 730 days across two 1-year periods) yield correct whole years.
 * 30.4375 = 365.25/12 (average days per month incl. leap years).
 */
function daysToYearMonth(totalDays: number): YearMonth {
  if (totalDays <= 0) {
    return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }
  }
  // +1 inclusive: count the end day to match calendar year boundaries
  const totalMonths = Math.floor((totalDays + 1) / 30.4375)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const decimal = Math.round((totalDays / 365.25) * 10) / 10
  return { years, months, display: buildDisplay(years, months), decimal }
}

/** Parse and validate effectiveDate on an event */
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

const MS_PER_DAY = 86_400_000

/** Compute days between two dates (inclusive of start, exclusive of end) */
function daysBetween(from: Date, to: Date): number {
  return Math.max(0, Math.floor((to.getTime() - from.getTime()) / MS_PER_DAY))
}

/**
 * F3 — calcYearOfService
 *
 * Total service tenure from hireDate to asOf, excluding Suspension gaps.
 * Handles REHIRE continuity per CNeXt 12-scenario rules.
 *
 * @param hireDate - ISO "YYYY-MM-DD"
 * @param events   - sorted or unsorted LifecycleEvent array (function sorts internally per E6)
 * @param asOf     - ISO "YYYY-MM-DD" (default: today)
 */
export function calcYearOfService(
  hireDate: string,
  events: LifecycleEvent[] = [],
  asOf: string = new Date().toISOString().slice(0, 10),
): YearMonth {
  if (!hireDate) return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }

  const hireDateParsed = new Date(hireDate)
  const asOfParsed = new Date(asOf)

  // E2: future hire date → return 0, no throw
  if (isNaN(hireDateParsed.getTime())) return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }
  if (hireDateParsed > asOfParsed) return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }

  // I12: asOf before hireDate → 0
  if (asOfParsed < hireDateParsed) return { years: 0, months: 0, display: '0 เดือน', decimal: 0 }

  // E6: sort events by effectiveDate chronologically
  const sorted = [...events].sort((a, b) => {
    const da = parseEventDate(a)
    const db = parseEventDate(b)
    return da.getTime() - db.getTime()
  })

  // Build segments: each segment is [start, end) of active service
  // A new_employee_code REHIRE resets the clock; otherwise service continues
  interface Segment { start: Date; end: Date | null }
  const segments: Segment[] = [{ start: hireDateParsed, end: null }]

  let currentSuspendStart: Date | null = null

  for (const evt of sorted) {
    const evtDate = parseEventDate(evt)

    if (evt.type === 'TERMINATE') {
      // Close current segment
      const last = segments[segments.length - 1]
      if (last.end === null) last.end = evtDate
    } else if (evt.type === 'REHIRE') {
      const isReset = evt.meta?.reason === 'new_employee_code'
      if (isReset) {
        // New employee code = service reset; close all prior segments
        segments.length = 0
      }
      // Open a new segment from REHIRE date
      segments.push({ start: evtDate, end: null })
    } else if (evt.type === 'SUSPEND_START') {
      currentSuspendStart = evtDate
    } else if (evt.type === 'SUSPEND_END') {
      // Will handle during day accumulation below
      currentSuspendStart = null
    }
  }

  // Close last open segment at asOf
  const lastSeg = segments[segments.length - 1]
  if (lastSeg && lastSeg.end === null) lastSeg.end = asOfParsed

  // Collect suspension gaps across the full event history (I5)
  // Each SUSPEND_START → SUSPEND_END (or asOf if still active, E9) is a gap
  interface Gap { from: Date; to: Date }
  const gaps: Gap[] = []
  let openSuspend: Date | null = null
  for (const evt of sorted) {
    if (evt.type === 'SUSPEND_START') {
      openSuspend = parseEventDate(evt)
    } else if (evt.type === 'SUSPEND_END' && openSuspend !== null) {
      gaps.push({ from: openSuspend, to: parseEventDate(evt) })
      openSuspend = null
    }
  }
  // E9: currently suspended (SUSPEND_START without SUSPEND_END) → exclude from today back
  if (openSuspend !== null) {
    gaps.push({ from: openSuspend, to: asOfParsed })
  }

  // Sum active days across segments, minus overlapping suspension gaps
  let totalActiveDays = 0

  for (const seg of segments) {
    if (!seg.end) continue
    const segStart = seg.start
    const segEnd = seg.end

    let segDays = daysBetween(segStart, segEnd)

    // Subtract suspension gap days that fall within this segment
    for (const gap of gaps) {
      const gapStart = gap.from > segStart ? gap.from : segStart
      const gapEnd = gap.to < segEnd ? gap.to : segEnd
      if (gapEnd > gapStart) {
        segDays -= daysBetween(gapStart, gapEnd)
      }
    }

    totalActiveDays += Math.max(0, segDays)
  }

  return daysToYearMonth(totalActiveDays)
}
