'use client';

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import type { TeamMember } from '@/lib/manager-dashboard-api';

interface TeamMemberGridProps {
  members: TeamMember[];
  loading?: boolean;
}

const statusVariant: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
  present: 'success',
  leave: 'warning',
  wfh: 'info',
  absent: 'neutral',
};

const statusLabel: Record<string, string> = {
  present: 'Active',
  leave: 'On Leave',
  wfh: 'WFH',
  absent: 'Absent',
};

export function TeamMemberGrid({ members, loading }: TeamMemberGridProps) {
  const t = useTranslations('managerDashboard');

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>{t('teamMembers')}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 bg-surface-raised rounded-md animate-pulse" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <p className="text-sm text-ink-muted py-6 text-center">{t('teamOverview')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {members.map((member) => (
              <a
                key={member.id}
                href={`/profile?id=${member.id}`}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-surface-raised transition"
              >
                <div className="w-8 h-8 rounded-full bg-surface-raised flex items-center justify-center shrink-0">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-ink-muted" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink truncate leading-tight">{member.name}</p>
                  <p className="text-xs text-ink-muted truncate leading-tight">{member.position}</p>
                </div>
                <Badge variant={statusVariant[member.status] ?? 'neutral'}>
                  {statusLabel[member.status] ?? member.status}
                </Badge>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
