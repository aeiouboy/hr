'use client';

// RosterCell — one employee × one day. Tints by SHIFT-TYPE tone (NOT validation
// colour): std=teal-soft, late=indigo-soft, off=dashed canvas, empty=blank.
// A draft (unpublished) edit shows a small accent ring/dot. Never uses red —
// only the DWS validation layer uses pumpkin.

import { getShiftCode } from '@/lib/time/shift-codes';
import { cn } from '@/lib/utils';

export interface RosterCellProps {
  code: string | null;
  tone: 'std' | 'late' | 'off' | 'empty';
  isDraft: boolean;
  onClick: () => void;
}

const TONE_CLASS: Record<RosterCellProps['tone'], string> = {
  std: 'bg-accent-soft text-ink border border-transparent',
  late: 'bg-info-soft text-ink border border-transparent',
  off: 'bg-canvas-soft text-ink-muted border border-dashed border-hairline',
  empty: 'bg-surface text-ink-faint border border-hairline',
};

export function RosterCell({ code, tone, isDraft, onClick }: RosterCellProps) {
  const sc = getShiftCode(code);
  const label =
    tone === 'off' ? 'F' : tone === 'empty' ? '—' : sc ? `${sc.in}–${sc.out}` : code;

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid="roster-cell"
      data-tone={tone}
      className={cn(
        'relative flex h-14 w-full flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] px-1 text-xs font-medium transition',
        'hover:ring-2 hover:ring-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        TONE_CLASS[tone],
        isDraft && 'ring-2 ring-accent',
      )}
    >
      {tone !== 'off' && tone !== 'empty' && code ? (
        <span className="font-semibold leading-none">{code}</span>
      ) : null}
      <span className="leading-none">{label}</span>
      {isDraft && (
        <span
          aria-hidden
          data-testid="roster-cell-draft"
          className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent"
        />
      )}
    </button>
  );
}
