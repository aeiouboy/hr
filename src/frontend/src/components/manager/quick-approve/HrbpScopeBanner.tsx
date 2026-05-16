'use client';

/**
 * HrbpScopeBanner — STA-27 PR-A
 *
 * Transparency banner shown on `/quick-approve` for HRBP + SPD personas.
 * Communicates that the cross-team queue is NOT yet scoped by partnered
 * departments in mockup mode (the `partneredDepts` predicate degrades to
 * "all visible" — see `predicates.ts:68`). Backend phase will wire the
 * actual filter; for now we surface the limitation up front so HR doesn't
 * quietly assume real scoping is in place.
 *
 * Renders ONLY when the current persona is `hrbp` or `spd`.
 */

import Link from 'next/link';
import { Info } from 'lucide-react';
import type { Role } from '@/lib/rbac';

export interface HrbpScopeBannerProps {
  /** Current primary persona (driven by `useAuthStore`). */
  persona: Role | string | undefined;
  isTh: boolean;
  /** Locale prefix for the audit doc link. */
  locale: string;
}

const AUDIT_DOC_HREF = '/docs/sta-27-quick-approve-predicate-audit.md';

export function HrbpScopeBanner({ persona, isTh, locale: _locale }: HrbpScopeBannerProps) {
  if (persona !== 'hrbp' && persona !== 'spd') return null;

  return (
    <div
      role="note"
      aria-label={isTh ? 'หมายเหตุขอบเขตการมองเห็น' : 'Scope visibility notice'}
      className="flex items-start gap-3 rounded-[var(--radius-md)] border border-accent bg-accent-soft px-4 py-3"
      data-testid="hrbp-scope-banner"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div className="flex-1 text-sm text-ink">
        <p className="font-medium">
          {isTh
            ? 'หมายเหตุ: ในเฟส mockup HRBP/SPD เห็นรายการทั้งหมด — scope filter (partneredDepts) จะมาในเฟส backend'
            : 'Note: In mockup phase, HRBP/SPD see all items — scope filter (partneredDepts) lands in backend phase'}
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          <Link
            href={AUDIT_DOC_HREF}
            className="text-accent underline-offset-2 hover:underline"
          >
            {isTh ? 'ดูเอกสารตรวจสอบ predicate' : 'View predicate audit doc'}
          </Link>
        </p>
      </div>
    </div>
  );
}
