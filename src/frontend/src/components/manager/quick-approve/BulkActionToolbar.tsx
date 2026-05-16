'use client';

/**
 * BulkActionToolbar — floating bottom bar for /quick-approve (STA-28 PR-B v2)
 *
 * HIDDEN when selectedCount === 0; slides up from bottom on first selection (AC-5).
 * High-risk plan types disable Approve + show bilingual tooltip (AC-6).
 * Mobile safe-area: pb-[env(safe-area-inset-bottom)] (AC-7).
 *
 * Low-risk types (Approve enabled): gas, toll, parking
 * High-risk types (Approve disabled + tooltip): medical, transfer, payrate, probation,
 * and any type not in the low-risk list.
 */

import { useLocale } from 'next-intl';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { Button } from '@/components/humi';
import { isHighRiskType } from './predicates';
import { cn } from '@/lib/utils';

interface BulkActionToolbarProps {
  selectedCount: number;
  selectedTypes: string[];
  onApprove: () => void;
  onReject: () => void;
  onClear: () => void;
}

export function BulkActionToolbar({
  selectedCount,
  selectedTypes,
  onApprove,
  onReject,
  onClear,
}: BulkActionToolbarProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const hasHighRisk = selectedTypes.some(isHighRiskType);

  const tooltipText = isTh
    ? 'ต้องตรวจรายการสำคัญทีละรายการ'
    : 'Sensitive items must be reviewed individually';

  const isVisible = selectedCount > 0;

  return (
    <div
      className={cn(
        // Floating positioned fixed at bottom, full width
        'fixed bottom-0 left-0 right-0 z-40',
        // Slide animation via translate
        'transition-transform duration-200 ease-out',
        isVisible ? 'translate-y-0' : 'translate-y-full',
        // Mobile safe-area (AC-7)
        'pb-[env(safe-area-inset-bottom)]',
      )}
      data-testid="bulk-action-toolbar"
      aria-hidden={!isVisible}
    >
      <div className="border-t border-hairline bg-surface shadow-[var(--shadow-card)]">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3">
          {/* Selection count */}
          <span className="text-sm font-medium text-ink">
            {isTh
              ? `เลือก ${selectedCount} รายการ`
              : `${selectedCount} selected`}
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Approve — disabled for high-risk selections */}
            <div className="relative group">
              <Button
                size="sm"
                variant="primary"
                onClick={onApprove}
                disabled={hasHighRisk}
                className={cn(
                  'transition',
                  !hasHighRisk && 'bg-success hover:bg-success/90',
                )}
                aria-disabled={hasHighRisk}
              >
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                {isTh ? `อนุมัติ (${selectedCount})` : `Approve (${selectedCount})`}
              </Button>
              {/* Tooltip on high-risk disable */}
              {hasHighRisk && (
                <div
                  role="tooltip"
                  className={cn(
                    'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2',
                    'w-max max-w-[200px] rounded-[var(--radius-sm)] bg-surface px-2.5 py-1.5',
                    'border border-hairline shadow-[var(--shadow-card)]',
                    'text-center text-xs text-ink-muted',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
                  )}
                >
                  {tooltipText}
                </div>
              )}
            </div>

            {/* Reject */}
            <Button
              size="sm"
              variant="danger"
              onClick={onReject}
            >
              <XCircle className="h-4 w-4 mr-1.5" />
              {isTh ? `ปฏิเสธ (${selectedCount})` : `Reject (${selectedCount})`}
            </Button>

            {/* Clear selection */}
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink transition"
              aria-label={isTh ? 'ยกเลิกการเลือก' : 'Clear selection'}
            >
              <X className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {isTh ? 'ยกเลิก' : 'Clear'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
