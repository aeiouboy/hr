'use client';

// RosterGrid — employees (rows) × 7 days (cols). Sticky first column shows the
// employee name + a live weekly-hours counter. Day headers show the short
// weekday (TH/EN) + date. Each body cell is a RosterCell.

import { weeklyHours, cellTone } from '@/lib/time/roster';
import { RosterCell } from './RosterCell';

interface TeamMember {
  id: string;
  nameTh: string;
  nameEn: string;
  roleTh?: string;
  roleEn?: string;
}

export interface RosterGridProps {
  team: TeamMember[];
  weekDates: string[];
  roster: Record<string, Record<string, string | null>>;
  draft: Set<string>;
  onCellClick: (emp: string, date: string) => void;
  isTh: boolean;
}

const WEEKDAY_TH = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const WEEKDAY_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function dayHeader(dateISO: string, isTh: boolean): { wd: string; dom: string } {
  const d = new Date(dateISO + 'T00:00:00Z');
  const wd = (isTh ? WEEKDAY_TH : WEEKDAY_EN)[d.getUTCDay()];
  return { wd, dom: String(d.getUTCDate()) };
}

export function RosterGrid({
  team,
  weekDates,
  roster,
  draft,
  onCellClick,
  isTh,
}: RosterGridProps) {
  return (
    <div className="overflow-x-auto" data-testid="roster-grid">
      <div className="min-w-[760px]">
        {/* Header row */}
        <div className="grid grid-cols-[200px_repeat(7,1fr)] gap-1">
          <div className="sticky left-0 z-10 bg-surface px-2 py-2 text-xs font-semibold text-ink-muted">
            {isTh ? 'พนักงาน' : 'Employee'}
          </div>
          {weekDates.map((date) => {
            const h = dayHeader(date, isTh);
            return (
              <div
                key={date}
                className="flex flex-col items-center justify-center py-2 text-center"
              >
                <span className="text-xs font-semibold text-ink">{h.wd}</span>
                <span className="text-xs text-ink-muted">{h.dom}</span>
              </div>
            );
          })}
        </div>

        {/* Body rows */}
        {team.map((emp) => {
          const row = roster[emp.id] ?? {};
          const hrs = weeklyHours(weekDates.map((d) => row[d] ?? null));
          return (
            <div
              key={emp.id}
              className="grid grid-cols-[200px_repeat(7,1fr)] items-stretch gap-1 border-t border-hairline py-1"
            >
              <div
                className="sticky left-0 z-10 flex flex-col justify-center bg-surface px-2 py-1"
                data-testid="roster-row-head"
              >
                <span className="truncate text-sm font-medium text-ink">
                  {isTh ? emp.nameTh : emp.nameEn}
                </span>
                {(isTh ? emp.roleTh : emp.roleEn) && (
                  <span className="truncate text-xs text-ink-muted">
                    {isTh ? emp.roleTh : emp.roleEn}
                  </span>
                )}
                <span
                  className="text-xs text-ink-faint"
                  data-testid="weekly-hours"
                  data-emp={emp.id}
                >
                  {hrs} {isTh ? 'ชม./สัปดาห์' : 'h/wk'}
                </span>
              </div>
              {weekDates.map((date) => {
                const code = row[date] ?? null;
                return (
                  <div key={date} className="flex">
                    <RosterCell
                      code={code}
                      tone={cellTone(code)}
                      isDraft={draft.has(`${emp.id}|${date}`)}
                      onClick={() => onCellClick(emp.id, date)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
