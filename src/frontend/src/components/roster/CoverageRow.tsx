'use client';

// CoverageRow — one cell per day showing assigned vs REQUIRED_PER_DAY. When a
// day is short-staffed it turns pumpkin (text-danger / bg-danger-soft); this is
// the ONLY tint here that uses the danger token (a real understaffing signal).

import { coverageForDay, REQUIRED_PER_DAY } from '@/lib/time/roster';
import { cn } from '@/lib/utils';

export interface CoverageRowProps {
  weekDates: string[];
  roster: Record<string, Record<string, string | null>>;
  isTh: boolean;
}

export function CoverageRow({ weekDates, roster, isTh }: CoverageRowProps) {
  return (
    <div
      className="grid grid-cols-[200px_repeat(7,1fr)] items-stretch gap-1 border-t border-hairline pt-2"
      data-testid="coverage-row"
    >
      <div className="sticky left-0 z-10 flex items-center bg-surface px-2 text-xs font-semibold text-ink-muted">
        {isTh ? 'จำนวนคนเข้ากะ' : 'Coverage'}
      </div>
      {weekDates.map((date) => {
        const cov = coverageForDay(roster, date, REQUIRED_PER_DAY);
        return (
          <div
            key={date}
            data-testid="coverage-cell"
            data-date={date}
            data-short={cov.short ? 'true' : 'false'}
            className={cn(
              'flex flex-col items-center justify-center rounded-[var(--radius-sm)] py-1 text-xs font-medium',
              cov.short
                ? 'bg-danger-soft text-danger'
                : 'bg-canvas-soft text-ink-muted',
            )}
          >
            <span className="font-semibold">
              {cov.assigned}/{cov.required}
            </span>
            {cov.short && (
              <span className="leading-none">{isTh ? 'ขาด' : 'short'}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
