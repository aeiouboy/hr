'use client';

// STA-28 PR-A — Approve / Send back / Update triad button row for manager benefit claim actions
import { CheckCircle2, RotateCcw, Edit3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ApproveTriadButtonsProps {
  onApprove: () => void;
  onSendBack: () => void;
  onUpdate: () => void;
  isTh: boolean;
  /** Disable all buttons (e.g. while a modal is open). */
  disabled?: boolean;
  /** Hide the Send Back button (e.g. before Q10 answer is known). */
  hideSendBack?: boolean;
}

const baseBtn =
  'inline-flex items-center gap-1.5 rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none';

export function ApproveTriadButtons({
  onApprove,
  onSendBack,
  onUpdate,
  isTh,
  disabled = false,
  hideSendBack = false,
}: ApproveTriadButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Primary — Approve */}
      <button
        type="button"
        onClick={onApprove}
        disabled={disabled}
        className={cn(
          baseBtn,
          'bg-success text-white hover:bg-success/90 shadow-sm',
        )}
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden />
        {isTh ? 'อนุมัติ' : 'Approve'}
      </button>

      {/* Secondary — Send back (hidden while hideSendBack=true per Q10 gate) */}
      {!hideSendBack && (
        <button
          type="button"
          onClick={onSendBack}
          disabled={disabled}
          className={cn(
            baseBtn,
            'border border-hairline bg-surface text-ink hover:bg-surface-raised',
          )}
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          {isTh ? 'ส่งกลับแก้ไข' : 'Send back'}
        </button>
      )}

      {/* Ghost — Update */}
      <button
        type="button"
        onClick={onUpdate}
        disabled={disabled}
        className={cn(
          baseBtn,
          'text-ink-muted hover:bg-surface-raised hover:text-ink',
        )}
      >
        <Edit3 className="h-4 w-4" aria-hidden />
        {isTh ? 'แก้ไข' : 'Update'}
      </button>
    </div>
  );
}
