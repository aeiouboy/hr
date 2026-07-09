'use client';

// LeaveRangeCalendar — the app's FIRST custom calendar (accepted divergence:
// every other date entry uses native <input type="date">). Justified solely by
// the range-select + Thai-holiday-marker UX a native input cannot provide.
//
// Month grid with start/end range selection, weekend dimming, and Thai-holiday
// dots (from HUMI_TH_HOLIDAYS). Token-only styling; danger states use
// --color-danger (pumpkin), never red. Selected cells use bg-accent /
// bg-accent-soft. Header month label is Buddhist-era via lib/date.ts.

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/date';

const TH_WEEKDAYS = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
const EN_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function isoOf(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export interface LeaveRangeCalendarProps {
  /** Selected start (ISO YYYY-MM-DD) or '' when unset. */
  from: string;
  /** Selected end (ISO YYYY-MM-DD) or '' when unset. */
  to: string;
  /** Fires with the next {from,to} range as the user clicks cells. */
  onChange: (range: { from: string; to: string }) => void;
  /** Thai public holidays (ISO) to mark + dim. */
  holidays?: readonly string[];
  /** Initial visible month (ISO); defaults to today. */
  defaultMonth?: string;
  /** Active locale — drives the month label era + weekday/legend language.
   *  'th' (default) → Buddhist-era Thai month; 'en' → Gregorian English. */
  locale?: string;
  /** Predicate: return true for a day that cannot be booked (outside the
   *  bookable window). Disabled cells are dimmed, non-clickable, and surface a
   *  "Outside booking window" legend entry. */
  isDateDisabled?: (iso: string) => boolean;
  /** ISO days that overlap the employee's existing pending/approved leave. Each
   *  is marked with a pumpkin ring + an "Existing request" legend entry (still
   *  selectable so the overlap validation can explain the clash on submit). */
  overlapDates?: readonly string[];
}

export function LeaveRangeCalendar({
  from,
  to,
  onChange,
  holidays = [],
  defaultMonth,
  locale = 'th',
  isDateDisabled,
  overlapDates = [],
}: LeaveRangeCalendarProps) {
  const isTh = locale !== 'en';
  const weekdays = isTh ? TH_WEEKDAYS : EN_WEEKDAYS;
  const initial = defaultMonth ? new Date(defaultMonth) : new Date();
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });

  const holidaySet = useMemo(() => new Set(holidays), [holidays]);
  const overlapSet = useMemo(() => new Set(overlapDates), [overlapDates]);

  const { cells, monthLabel } = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const startWeekday = first.getDay(); // 0=Sun
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const grid: Array<{ day: number; iso: string } | null> = [];
    for (let i = 0; i < startWeekday; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push({ day: d, iso: isoOf(view.year, view.month, d) });
    }
    // "1 มิถุนายน 2569" → drop the leading day → "มิถุนายน 2569" (BE via lib/date.ts);
    // on /en: "1 June 2026" → "June 2026" (Gregorian).
    const full = formatDate(isoOf(view.year, view.month, 1), 'long', locale);
    return {
      cells: grid,
      monthLabel: full.split(' ').slice(1).join(' '),
    };
  }, [view, locale]);

  function handlePick(iso: string) {
    // Unbookable days are inert — the calendar pre-disables them upfront.
    if (isDateDisabled?.(iso)) return;
    // First click (or both already set) starts a fresh range.
    if (!from || (from && to)) {
      onChange({ from: iso, to: '' });
      return;
    }
    // Second click completes the range, ordering start/end.
    if (iso < from) onChange({ from: iso, to: from });
    else onChange({ from, to: iso });
  }

  function inRange(iso: string): boolean {
    if (!from) return false;
    const end = to || from;
    return iso >= from && iso <= end;
  }

  return (
    <div className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4">
      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label={isTh ? 'เดือนก่อนหน้า' : 'Previous month'}
          onClick={() =>
            setView((v) =>
              v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 },
            )
          }
          className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-ink-muted hover:bg-canvas-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronLeft size={16} aria-hidden />
        </button>
        <p className="text-body font-semibold text-ink">{monthLabel}</p>
        <button
          type="button"
          aria-label={isTh ? 'เดือนถัดไป' : 'Next month'}
          onClick={() =>
            setView((v) =>
              v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 },
            )
          }
          className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] text-ink-muted hover:bg-canvas-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <ChevronRight size={16} aria-hidden />
        </button>
      </div>

      {/* Weekday header */}
      <div className="mt-3 grid grid-cols-7 gap-1">
        {weekdays.map((w, i) => (
          <div
            key={w}
            className={cn(
              'pb-1 text-center text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-wide',
              i === 0 || i === 6 ? 'text-ink-faint' : 'text-ink-muted',
            )}
          >
            {w}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={`pad-${idx}`} aria-hidden />;
          const date = new Date(cell.iso);
          const weekday = date.getDay();
          const isWeekend = weekday === 0 || weekday === 6;
          const isHoliday = holidaySet.has(cell.iso);
          const isOverlap = overlapSet.has(cell.iso);
          const disabled = isDateDisabled?.(cell.iso) ?? false;
          const selected = !disabled && inRange(cell.iso);
          const isEndpoint = cell.iso === from || cell.iso === (to || from);

          return (
            <button
              key={cell.iso}
              type="button"
              onClick={() => handlePick(cell.iso)}
              disabled={disabled}
              aria-disabled={disabled}
              aria-pressed={selected}
              aria-label={[
                String(cell.day),
                isHoliday && (isTh ? '· วันหยุด' : '· holiday'),
                isOverlap && (isTh ? '· มีคำขอเดิม' : '· existing request'),
                disabled && (isTh ? '· นอกช่วงที่จองได้' : '· outside booking window'),
              ]
                .filter(Boolean)
                .join(' ')}
              className={cn(
                'relative flex h-10 items-center justify-center rounded-[var(--radius-sm)] text-body transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
                disabled
                  ? 'cursor-not-allowed text-ink-faint opacity-40 line-through'
                  : selected
                    ? isEndpoint
                      ? 'bg-accent text-white font-semibold'
                      : 'bg-accent-soft text-accent'
                    : isWeekend || isHoliday
                      ? 'text-ink-faint hover:bg-canvas-soft'
                      : 'text-ink hover:bg-canvas-soft',
                !disabled && isOverlap && !selected && 'ring-1 ring-[color:var(--color-danger)] ring-inset',
              )}
            >
              {cell.day}
              {isHoliday && (
                <span
                  aria-hidden
                  className={cn(
                    'absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full',
                    selected && isEndpoint ? 'bg-white' : 'bg-[color:var(--color-danger)]',
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[length:var(--text-eyebrow)] text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-[3px] bg-accent" aria-hidden />
          {isTh ? 'ช่วงที่เลือก' : 'Selected range'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-danger)]" aria-hidden />
          {isTh ? 'วันหยุดนักขัตฤกษ์' : 'Public holiday'}
        </span>
        <span className="inline-flex items-center gap-1.5 text-ink-faint">
          {isTh ? 'เสาร์–อาทิตย์' : 'Weekend'}
        </span>
        {overlapSet.size > 0 && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-[3px] ring-1 ring-[color:var(--color-danger)] ring-inset"
              aria-hidden
            />
            {isTh ? 'มีคำขอเดิม' : 'Existing request'}
          </span>
        )}
        {isDateDisabled && (
          <span className="inline-flex items-center gap-1.5 text-ink-faint">
            <span className="line-through opacity-60" aria-hidden>
              00
            </span>
            {isTh ? 'นอกช่วงที่จองได้' : 'Outside booking window'}
          </span>
        )}
      </div>
    </div>
  );
}
