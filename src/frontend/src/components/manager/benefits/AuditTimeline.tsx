'use client';

// STA-28 PR-C — Vertical audit timeline for BenefitClaimRequest.audit entries
// Newest entry shown at top. System entries get muted styling.

import { cn } from '@/lib/utils';
import type { BenefitClaimAuditEntry } from '@/stores/benefit-claims';

interface AuditTimelineProps {
  entries: BenefitClaimAuditEntry[];
  isTh: boolean;
}

// ── Role chip styles ──────────────────────────────────────────────────────────

const ROLE_CHIP_STYLE: Record<BenefitClaimAuditEntry['actorRole'], string> = {
  employee: 'bg-teal-50 text-teal-700 border border-teal-200',
  manager:  'bg-accent-soft text-accent border border-accent/20',
  spd:      'bg-warning-soft text-warning border border-warning/20',
  system:   'bg-canvas-soft text-ink-muted border border-hairline',
};

const ROLE_LABEL_TH: Record<BenefitClaimAuditEntry['actorRole'], string> = {
  employee: 'พนักงาน',
  manager:  'หัวหน้า',
  spd:      'SPD',
  system:   'ระบบ',
};

const ROLE_LABEL_EN: Record<BenefitClaimAuditEntry['actorRole'], string> = {
  employee: 'Employee',
  manager:  'Manager',
  spd:      'SPD',
  system:   'System',
};

// ── Action labels ─────────────────────────────────────────────────────────────

const ACTION_LABEL_TH: Record<BenefitClaimAuditEntry['action'], string> = {
  submit:    'ส่งคำขอ',
  approve:   'อนุมัติ',
  reject:    'ไม่อนุมัติ',
  send_back: 'ส่งกลับแก้ไข',
  resubmit:  'ส่งใหม่ / คืนสิทธิ์',
};

const ACTION_LABEL_EN: Record<BenefitClaimAuditEntry['action'], string> = {
  submit:    'Submitted',
  approve:   'Approved',
  reject:    'Rejected',
  send_back: 'Sent back',
  resubmit:  'Resubmitted / Restored',
};

// ── Relative time ─────────────────────────────────────────────────────────────

function relativeTime(iso: string, isTh: boolean): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (isTh) {
    if (minutes < 1) return 'เมื่อสักครู่';
    if (minutes < 60) return `เมื่อ ${minutes} นาทีที่แล้ว`;
    if (hours < 24) return `เมื่อ ${hours} ชม. ที่แล้ว`;
    return `เมื่อ ${days} วันที่แล้ว`;
  }
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AuditTimeline({ entries, isTh }: AuditTimelineProps) {
  // Newest at top
  const sorted = [...entries].reverse();
  const roleLabel = isTh ? ROLE_LABEL_TH : ROLE_LABEL_EN;
  const actionLabel = isTh ? ACTION_LABEL_TH : ACTION_LABEL_EN;

  return (
    <div className="flex flex-col gap-0">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {isTh ? 'ประวัติการดำเนินการ' : 'Audit history'}
      </p>
      <ol className="relative border-l border-hairline pl-4 space-y-4">
        {sorted.map((entry, i) => {
          const isSystem = entry.actorRole === 'system';
          return (
            <li key={i} className="relative">
              {/* Timeline dot */}
              <span
                className={cn(
                  'absolute -left-[1.125rem] top-1 h-3 w-3 rounded-full border-2 border-surface',
                  isSystem
                    ? 'bg-ink-muted/40'
                    : entry.actorRole === 'manager'
                      ? 'bg-accent'
                      : entry.actorRole === 'spd'
                        ? 'bg-warning'
                        : 'bg-teal-500',
                )}
                aria-hidden
              />
              <div className={cn('flex flex-col gap-0.5', isSystem && 'opacity-70')}>
                {/* Timestamp */}
                <span className="text-xs text-ink-muted">
                  {relativeTime(entry.at, isTh)}
                </span>
                {/* Actor name + role chip */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-medium text-ink">{entry.actorName}</span>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-[var(--radius-sm)] px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
                      ROLE_CHIP_STYLE[entry.actorRole],
                    )}
                  >
                    {roleLabel[entry.actorRole]}
                  </span>
                </div>
                {/* Action */}
                <span className={cn('text-xs', isSystem ? 'text-ink-muted italic' : 'text-ink-soft')}>
                  {actionLabel[entry.action]}
                </span>
                {/* Note */}
                {entry.note && (
                  <p className="mt-0.5 text-xs text-ink-muted rounded-[var(--radius-sm)] bg-canvas-soft border border-hairline px-2 py-1">
                    {entry.note}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
