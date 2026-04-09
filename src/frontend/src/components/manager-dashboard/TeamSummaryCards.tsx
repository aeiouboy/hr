'use client';

import { useTranslations } from 'next-intl';
import { Users, UserCheck, CalendarOff, ClipboardList } from 'lucide-react';
import type { TeamSummary } from '@/lib/manager-dashboard-api';
import { cn } from '@/lib/utils';

interface TeamSummaryCardsProps {
  summary: TeamSummary | null;
  loading?: boolean;
}

const STAT_TONE = {
  cobalt: 'bg-accent-tint text-accent',
  success: 'bg-success-tint text-success',
  warning: 'bg-warning-tint text-warning',
  danger: 'bg-danger-tint text-danger',
} as const;

export function TeamSummaryCards({ summary, loading }: TeamSummaryCardsProps) {
  const t = useTranslations('managerDashboard.quickStats');

  const cards = [
    {
      label: t('totalMembers'),
      value: summary?.totalMembers ?? '—',
      icon: <Users className="h-5 w-5" />,
      tone: 'cobalt' as const,
    },
    {
      label: t('activeToday'),
      value: summary ? `${summary.presentToday} (${summary.presentPercentage}%)` : '—',
      icon: <UserCheck className="h-5 w-5" />,
      tone: 'success' as const,
    },
    {
      label: t('onLeaveToday'),
      value: summary?.onLeaveToday ?? '—',
      subtitle: summary?.onLeaveNames?.join(', '),
      icon: <CalendarOff className="h-5 w-5" />,
      tone: 'warning' as const,
    },
    {
      label: t('pending'),
      value: summary?.pendingApprovals ?? '—',
      href: '/quick-approve',
      icon: <ClipboardList className="h-5 w-5" />,
      tone: 'danger' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => {
        const inner = (
          <div className={cn(
            'rounded-lg bg-surface shadow-card p-4 flex items-start gap-3 transition-shadow',
            card.href && 'hover:shadow-md cursor-pointer'
          )}>
            <div className={cn('w-10 h-10 rounded-md flex items-center justify-center shrink-0', STAT_TONE[card.tone])}>
              {card.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-ink-muted">{card.label}</p>
              <p className="text-2xl font-bold text-ink mt-0.5 font-mono tabular-nums">
                {loading ? '—' : card.value}
              </p>
              {card.subtitle && (
                <p className="text-xs text-ink-muted mt-0.5 truncate">{card.subtitle}</p>
              )}
            </div>
          </div>
        );

        return card.href ? (
          <a key={card.label} href={card.href}>{inner}</a>
        ) : (
          <div key={card.label}>{inner}</div>
        );
      })}
    </div>
  );
}
