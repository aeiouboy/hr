'use client';

// STA-28 PR-A — SLA countdown badge: on track / due soon / overdue
import { cn } from '@/lib/utils';

export interface SLABadgeProps {
  submittedAt: string;   // ISO date string
  slaHours: number;      // e.g. 72
  isTh: boolean;
}

type SLATier = 'on_track' | 'due_soon' | 'overdue';

function getSLATier(submittedAt: string, slaHours: number): { tier: SLATier; hoursElapsed: number } {
  const elapsed = (Date.now() - new Date(submittedAt).getTime()) / (1000 * 60 * 60);
  const pct = elapsed / slaHours;
  const tier: SLATier = pct > 1 ? 'overdue' : pct > 0.5 ? 'due_soon' : 'on_track';
  return { tier, hoursElapsed: Math.round(elapsed) };
}

const TIER_STYLE: Record<SLATier, string> = {
  on_track: 'bg-success-soft text-success border border-success/20',
  due_soon: 'bg-warning-soft text-warning border border-warning/20',
  overdue:  'bg-danger-soft text-danger border border-danger/20',
};

const TIER_LABEL_TH: Record<SLATier, string> = {
  on_track: 'ในกำหนด',
  due_soon: 'ใกล้กำหนด',
  overdue:  'เกินกำหนด',
};

const TIER_LABEL_EN: Record<SLATier, string> = {
  on_track: 'On track',
  due_soon: 'Due soon',
  overdue:  'Overdue',
};

export function SLABadge({ submittedAt, slaHours, isTh }: SLABadgeProps) {
  const { tier, hoursElapsed } = getSLATier(submittedAt, slaHours);
  const label = isTh ? TIER_LABEL_TH[tier] : TIER_LABEL_EN[tier];
  const hourUnit = isTh ? 'ชม.' : 'h';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide',
        TIER_STYLE[tier],
      )}
      title={`${hoursElapsed}/${slaHours} ${hourUnit}`}
    >
      {label}
      <span className="opacity-70 normal-case font-normal">
        {hoursElapsed}{hourUnit}
      </span>
    </span>
  );
}
