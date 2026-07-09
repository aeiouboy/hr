'use client';

// ════════════════════════════════════════════════════════════
// CompensationHistory — READ-ONLY compensation history (P3)
//
// Renders a read-only timeline/table of compensation changes
// (effective date in Buddhist Era via lib/date.ts, change type,
// old → new amount). NO edit controls — read-only for every viewer.
//
// Surfaces:
//   - /profile/me            self view (viewerIsOwner defaults true → full)
//   - /admin/employees/[id]  admin/HRBP view (pass employeeId + viewerIsOwner=false)
//
// Masking: the OWNER sees full amounts. A non-owner viewer sees masked
// amounts UNLESS they hold an HR comp-view role (hr_admin / hr_manager /
// hrbp / spd). Manager / lower-tier non-owners see masked figures.
// Never red — masking uses neutral ink tokens.
// ════════════════════════════════════════════════════════════

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { History, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { hasAnyRole } from '@/lib/rbac';
import { formatDate } from '@/lib/date';
import { DemoValuesDisclaimer } from '@/components/humi/molecules/DemoValuesDisclaimer';
import {
  SELF_COMP_HISTORY,
  getCompHistory,
  type CompChangeType,
  type CompHistoryEntry,
} from '@/lib/comp-history-mock';

const COMP_VIEW_ROLES = ['hr_admin', 'hr_manager', 'hrbp', 'spd'] as const;

function formatAmount(amount: number): string {
  return `฿ ${new Intl.NumberFormat('en-US').format(amount)}`;
}

// Mask a THB amount — every digit hidden, keeping the grouped shape, e.g.
// 82500 → '฿ ••,•••'. Consistent with payroll summary + comp summary (no
// trailing-digit leak).
function maskAmount(amount: number): string {
  return formatAmount(amount).replace(/[0-9๐-๙]/g, '•');
}

const TYPE_TONE: Record<CompChangeType, string> = {
  promotion: 'var(--color-accent)',
  merit: 'var(--color-info)',
  adjustment: 'var(--color-sage)',
  hire: 'var(--color-butter)',
};

export default function CompensationHistory({
  employeeId,
  viewerIsOwner,
}: {
  /** Employee id for the admin surface. Omit on /profile/me (self view). */
  employeeId?: string;
  /** Defaults to true (self view). Pass false on cross-user admin surfaces. */
  viewerIsOwner?: boolean;
} = {}) {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const roles = useAuthStore((s) => s.roles);
  const t = useTranslations('compHistory');

  const isOwner = viewerIsOwner ?? true;
  // Who is ALLOWED to reveal: the owner + HR comp-view roles. Everyone else is
  // permanently masked. But even an allowed viewer sees figures MASKED BY
  // DEFAULT — they must click the eye toggle to reveal (matches CompensationSummary).
  const canReveal = isOwner || hasAnyRole(roles, [...COMP_VIEW_ROLES]);
  const [isMasked, setIsMasked] = useState(true);
  const effectiveMasked = canReveal ? isMasked : true;

  const entries: CompHistoryEntry[] = employeeId
    ? getCompHistory(employeeId)
    : SELF_COMP_HISTORY;

  const TYPE_LABEL: Record<CompChangeType, string> = {
    promotion: t('typePromotion'),
    merit: t('typeMerit'),
    adjustment: t('typeAdjustment'),
    hire: t('typeHire'),
  };

  return (
    <section
      className="humi-card"
      style={{ marginTop: 16, padding: '22px 26px' }}
      data-testid="compensation-history"
    >
      <header
        className="humi-row"
        style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}
      >
        <div className="humi-row" style={{ gap: 8, alignItems: 'center' }}>
          <History size={18} aria-hidden />
          <h3 className="font-display text-lg font-semibold leading-[1.2] tracking-tight text-ink">
            {t('title')}
          </h3>
        </div>
        <div className="humi-row" style={{ gap: 10, alignItems: 'center' }}>
          {canReveal ? (
            <button
              type="button"
              onClick={() => setIsMasked((m) => !m)}
              className="humi-row"
              style={{ gap: 6, fontSize: 13, color: 'var(--color-ink-muted)' }}
              aria-label={isMasked ? 'แสดงค่าตอบแทนย้อนหลัง' : 'ซ่อนค่าตอบแทนย้อนหลัง'}
              data-testid="comp-history-reveal-toggle"
            >
              {isMasked ? <Eye size={14} aria-hidden /> : <EyeOff size={14} aria-hidden />}
              {isMasked ? 'แสดง' : 'ซ่อน'}
            </button>
          ) : (
            <span
              className="humi-tag"
              data-testid="comp-history-locked-badge"
              style={{ gap: 6, fontSize: 12, color: 'var(--color-ink-muted)', borderColor: 'var(--color-hairline)' }}
              aria-label="ค่าตอบแทนย้อนหลังถูกปิดบัง"
            >
              <Lock size={12} aria-hidden />
              ปิดบัง
            </span>
          )}
          <span
            className="humi-tag"
            data-testid="comp-history-readonly-badge"
            style={{
              gap: 6,
              fontSize: 12,
              color: 'var(--color-ink-muted)',
              borderColor: 'var(--color-hairline)',
            }}
          >
            <Lock size={12} aria-hidden />
            {t('readOnly')}
          </span>
        </div>
      </header>

      <DemoValuesDisclaimer compact className="mb-4" />

      {!canReveal && (
        <p
          className="text-small text-ink-muted"
          style={{ marginBottom: 12 }}
          data-testid="comp-history-masked-note"
        >
          {t('maskedNote')}
        </p>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} data-testid="comp-history-list">
        {entries.map((entry) => {
          const newDisplay = effectiveMasked ? maskAmount(entry.newAmount) : formatAmount(entry.newAmount);
          const oldDisplay =
            entry.oldAmount === null
              ? null
              : effectiveMasked
                ? maskAmount(entry.oldAmount)
                : formatAmount(entry.oldAmount);
          return (
            <li
              key={entry.id}
              className="humi-row"
              style={{
                gap: 12,
                alignItems: 'flex-start',
                padding: '12px 0',
                borderTop: '1px solid var(--color-hairline-soft)',
              }}
              data-testid="comp-history-row"
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  alignSelf: 'stretch',
                  background: TYPE_TONE[entry.type],
                  borderRadius: 3,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="humi-row" style={{ gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span className="text-body font-semibold text-ink">{TYPE_LABEL[entry.type]}</span>
                  <span className="text-small text-ink-muted">
                    {t('effective')}: {formatDate(entry.effectiveDate, 'long', locale)}
                  </span>
                </div>
                <div
                  className="humi-row font-mono tabular-nums"
                  style={{ gap: 8, marginTop: 4, fontSize: 14, color: 'var(--color-ink)', flexWrap: 'wrap' }}
                  data-testid="comp-history-amount"
                >
                  {oldDisplay && (
                    <>
                      <span style={{ color: 'var(--color-ink-muted)' }}>{oldDisplay}</span>
                      <ArrowRight size={14} aria-hidden style={{ color: 'var(--color-ink-muted)' }} />
                    </>
                  )}
                  <span style={{ fontWeight: 700 }}>{newDisplay}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
