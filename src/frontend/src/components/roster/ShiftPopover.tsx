'use client';

// ShiftPopover — pick a shift code (from SHIFT_PICK_CODES), a day off ('F'), or
// clear (null) for the selected employee×date cell.

import { SHIFT_CODES } from '@/lib/time/shift-codes';
import { SHIFT_PICK_CODES } from '@/lib/time/roster';
import { cn } from '@/lib/utils';

export interface ShiftPopoverProps {
  isTh: boolean;
  onPick: (code: string | null) => void;
  onClose: () => void;
}

export function ShiftPopover({ isTh, onPick, onClose }: ShiftPopoverProps) {
  return (
    <div
      data-testid="shift-popover"
      className={cn(
        'w-64 rounded-[var(--radius-md)] border border-hairline bg-surface p-2 shadow-[var(--shadow-lg)]',
      )}
    >
      <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {isTh ? 'เลือกกะ' : 'Select shift'}
      </p>
      <ul className="space-y-0.5">
        {SHIFT_PICK_CODES.map((code) => {
          const sc = SHIFT_CODES[code];
          return (
            <li key={code}>
              <button
                type="button"
                data-testid="shift-option"
                data-code={code}
                onClick={() => onPick(code)}
                className="flex w-full flex-col items-start rounded-[var(--radius-sm)] px-2 py-1.5 text-left hover:bg-accent-soft"
              >
                <span className="text-sm font-medium text-ink">
                  {isTh ? sc.nameTh : sc.nameEn}
                </span>
                <span className="text-xs text-ink-muted">
                  {sc.in}–{sc.out} · {code}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-1 border-t border-hairline pt-1">
        <button
          type="button"
          data-testid="shift-option-off"
          onClick={() => onPick('F')}
          className="flex w-full items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm text-ink hover:bg-canvas-soft"
        >
          {isTh ? 'วันหยุด' : 'Day off'}
        </button>
        <button
          type="button"
          data-testid="shift-option-clear"
          onClick={() => onPick(null)}
          className="flex w-full items-center rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-sm text-ink-muted hover:bg-canvas-soft"
        >
          {isTh ? 'ล้าง' : 'Clear'}
        </button>
      </div>
      <div className="mt-1 border-t border-hairline pt-1">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-[var(--radius-sm)] px-2 py-1 text-center text-xs text-ink-muted hover:bg-canvas-soft"
        >
          {isTh ? 'ปิด' : 'Close'}
        </button>
      </div>
    </div>
  );
}
