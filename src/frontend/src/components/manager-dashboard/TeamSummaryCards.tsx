'use client';

import { useTranslations } from 'next-intl';
import { Users, UserCheck, CalendarOff, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { TeamSummary } from '@/lib/manager-dashboard-api';

interface TeamSummaryCardsProps {
  summary: TeamSummary | null;
  loading?: boolean;
}

export function TeamSummaryCards({ summary, loading }: TeamSummaryCardsProps) {
  const t = useTranslations('managerDashboard.quickStats');

  const cards = [
    {
      label: t('totalMembers'),
      value: summary?.totalMembers ?? '—',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: t('activeToday'),
      value: summary
        ? `${summary.presentToday} (${summary.presentPercentage}%)`
        : '—',
      icon: <UserCheck className="h-6 w-6" />,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: t('onLeaveToday'),
      value: summary?.onLeaveToday ?? '—',
      subtitle: summary?.onLeaveNames?.join(', '),
      icon: <CalendarOff className="h-6 w-6" />,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      label: t('pending'),
      value: summary?.pendingApprovals ?? '—',
      href: '/quick-approve',
      icon: <ClipboardList className="h-6 w-6" />,
      color: 'text-cg-red bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const content = (
          <Card
            key={card.label}
            className={`hover:shadow-md transition-shadow ${card.href ? 'cursor-pointer' : ''}`}
          >
            <CardContent className="p-5 flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-cg-dark mt-0.5">
                  {loading ? '...' : card.value}
                </p>
                {card.subtitle && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{card.subtitle}</p>
                )}
              </div>
            </CardContent>
          </Card>
        );

        return card.href ? (
          <a key={card.label} href={card.href}>
            {content}
          </a>
        ) : (
          <div key={card.label}>{content}</div>
        );
      })}
    </div>
  );
}
