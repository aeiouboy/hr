// lib/time/roster.ts — Weekly Roster Grid pure helpers (mockup, no backend).
//
// The roster is a per-week, per-employee VIEW LAYER on top of the schedule
// template (the single source). A "cell" is one employee × one date and holds
// a shift code, the day-off sentinel `'F'`, or `null` (an explicitly emptied /
// unassigned working slot). Every helper below obeys the load-bearing sentinel:
//   'F'   → explicit DAY OFF  → validates GREEN, does NOT cover, tone 'off'.
//   null  → EMPTY gap         → validates RED,   does NOT cover, tone 'empty'.
//   code  → real shift        → COVERS, tone 'std' (or 'late' for the late code).
// Validation/coverage reuse shift-codes + schedule-template + dws-validation.

import { getShiftCode } from './shift-codes';
import {
  getScheduleForPeriod,
  SCHEDULE_TEMPLATES,
  type DaySchedule,
} from './schedule-template';

/** The "late" shift code — tinted differently from a standard shift. */
const LATE_CODE = '8A1000';

/** Day-off sentinel re-export (same value as shift-codes' DAY_OFF_CODE). */
export const OFF = 'F';

/** Hardcoded coverage requirement per day (mockup). */
export const REQUIRED_PER_DAY = 3;

/** Codes offered in the cell popover (subset of SHIFT_CODES). */
export const SHIFT_PICK_CODES = ['8A0800', '8A1000', '9A0700', '4C0800'] as const;

/** One week as 7 ISO dates [start .. start+6] (UTC date math, SSR-safe). */
export function weekDates(startISO: string): string[] {
  const start = new Date(startISO + 'T00:00:00Z');
  const out: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

/** UTC weekday (0=Sun .. 6=Sat) of an ISO date. */
function utcDay(dateISO: string): number {
  return new Date(dateISO + 'T00:00:00Z').getUTCDay();
}

/** Visual tint bucket for a cell (NOT a validation colour). */
export function cellTone(code: string | null): 'std' | 'late' | 'off' | 'empty' {
  if (code === OFF) return 'off';
  if (code === null) return 'empty';
  if (getShiftCode(code) === null) return 'empty';
  if (code === LATE_CODE) return 'late';
  return 'std';
}

/** Σ scheduled work-hours across a row of cells. Off/empty/unknown contribute 0. */
export function weeklyHours(codes: (string | null)[]): number {
  return codes.reduce<number>((sum, c) => sum + (getShiftCode(c)?.workHrs ?? 0), 0);
}

/** Per-day coverage: how many employees hold a REAL shift on `date`. */
export function coverageForDay(
  roster: Record<string, Record<string, string | null>>,
  date: string,
  required: number,
): { assigned: number; required: number; short: boolean } {
  let assigned = 0;
  for (const empId of Object.keys(roster)) {
    const cell = roster[empId]?.[date] ?? null;
    if (getShiftCode(cell) !== null) assigned++;
  }
  return { assigned, required, short: assigned < required };
}

/**
 * Seed a roster from each employee's template-derived schedule for the period.
 * Day-offs project to `'F'` (never to an empty cell) so no false-red storm.
 */
export function seedRosterFromTemplates(
  team: { id: string }[],
  dates: string[],
): Record<string, Record<string, string | null>> {
  const roster: Record<string, Record<string, string | null>> = {};
  for (const emp of team) {
    const sched = getScheduleForPeriod(emp.id);
    const byDate = new Map<string, DaySchedule>();
    for (const d of sched) byDate.set(d.date, d);

    const row: Record<string, string | null> = {};
    for (const date of dates) {
      const day = byDate.get(date);
      if (!day) {
        row[date] = OFF; // outside the seed window → treat as day off, never empty
      } else {
        row[date] = day.dayOff ? OFF : day.shiftCode;
      }
    }
    roster[emp.id] = row;
  }
  return roster;
}

/**
 * Bridge a roster row to DaySchedule[] for DWS validation.
 *   'F'  → dayOff:true  (validates GREEN)
 *   null / unknown code → dayOff:false, shiftCode:null (validates RED gap)
 *   real code → dayOff:false + shift fields (validates OK / yellow on gap)
 */
export function rosterRowToSchedule(
  row: Record<string, string | null>,
  dates: string[],
): DaySchedule[] {
  return dates.map((date) => {
    const weekday = utcDay(date);
    const cell = row[date] ?? null;

    if (cell === OFF) {
      return {
        date,
        weekday,
        dayOff: true,
        shiftCode: null,
        scheduledIn: null,
        scheduledOut: null,
        breakStart: null,
        breakEnd: null,
      };
    }

    const sc = getShiftCode(cell);
    if (sc === null) {
      return {
        date,
        weekday,
        dayOff: false,
        shiftCode: null,
        scheduledIn: null,
        scheduledOut: null,
        breakStart: null,
        breakEnd: null,
      };
    }

    return {
      date,
      weekday,
      dayOff: false,
      shiftCode: cell,
      scheduledIn: sc.in,
      scheduledOut: sc.out,
      breakStart: sc.breakStart,
      breakEnd: sc.breakEnd,
    };
  });
}

/**
 * Project a template (by key, e.g. 'STORE_STD') onto a week's dates.
 * `byWeekday[getUTCDay(date)] ?? 'F'` — null/absent weekday entries → day off.
 */
export function applyTemplateRow(
  tmplKey: string,
  dates: string[],
): Record<string, string | null> {
  const tmpl = SCHEDULE_TEMPLATES[tmplKey];
  const row: Record<string, string | null> = {};
  for (const date of dates) {
    const code = tmpl?.byWeekday[utcDay(date)] ?? OFF;
    row[date] = code;
  }
  return row;
}
