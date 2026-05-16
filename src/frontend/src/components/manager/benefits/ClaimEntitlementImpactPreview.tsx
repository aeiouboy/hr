'use client';

// STA-28 PR-C — Sidebar card showing entitlement impact before/after approval

import { ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClaimEntitlementImpactPreviewProps {
  /** Amount already used (totalEntitlement - remainingAmount) */
  usedAmount: number;
  /** Total entitlement ceiling */
  totalEntitlement: number;
  /** Amount of this claim */
  claimAmount: number;
  isTh: boolean;
}

function fmt(n: number) {
  return `฿${n.toLocaleString('th-TH')}`;
}

export function ClaimEntitlementImpactPreview({
  usedAmount,
  totalEntitlement,
  claimAmount,
  isTh,
}: ClaimEntitlementImpactPreviewProps) {
  const afterUsed = usedAmount + claimAmount;
  const wouldExceed = afterUsed > totalEntitlement;

  return (
    <div className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {isTh ? 'ผลกระทบต่อ Entitlement' : 'Entitlement impact'}
      </p>

      {/* Before row */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-muted">{isTh ? 'ก่อนอนุมัติ' : 'Before'}</span>
        <span className="font-medium text-ink">
          {fmt(usedAmount)}{' '}
          <span className="text-ink-muted font-normal">
            {isTh ? `ของ ${fmt(totalEntitlement)} ใช้ไปแล้ว` : `of ${fmt(totalEntitlement)} used`}
          </span>
        </span>
      </div>

      {/* Arrow */}
      <div className="flex items-center gap-1 text-ink-muted">
        <div className="flex-1 border-t border-dashed border-hairline" />
        <ArrowRight className="h-3 w-3 shrink-0" aria-hidden />
        <span className="text-xs">{fmt(claimAmount)}</span>
        <div className="flex-1 border-t border-dashed border-hairline" />
      </div>

      {/* After row */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-ink-muted">{isTh ? 'หลังอนุมัติ' : 'After approval'}</span>
        <span className={cn('font-medium', wouldExceed ? 'text-danger' : 'text-ink')}>
          {fmt(afterUsed)}{' '}
          <span className={cn('font-normal', wouldExceed ? 'text-danger' : 'text-ink-muted')}>
            {isTh ? `ของ ${fmt(totalEntitlement)} ใช้ไปแล้ว` : `of ${fmt(totalEntitlement)} used`}
          </span>
        </span>
      </div>

      {/* Overage warning */}
      {wouldExceed && (
        <div
          className="flex items-start gap-1.5 rounded-[var(--radius-sm)] border border-danger/20 bg-danger-soft px-2 py-1.5"
          style={{ color: 'var(--color-danger)' }}
        >
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden />
          <span className="text-xs font-medium">
            {isTh
              ? 'เกินวงเงิน — ต้องอนุมัติพิเศษ'
              : 'Exceeds limit — special approval required'}
          </span>
        </div>
      )}
    </div>
  );
}
