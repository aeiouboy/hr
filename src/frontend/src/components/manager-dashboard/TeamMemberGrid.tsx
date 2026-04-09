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

const statusVariant: Record<string,'success' |'warning' |'info' |'neutral'> = {
 present:'success',
 leave:'warning',
 wfh:'info',
 absent:'neutral',
};

const statusLabel: Record<string, string> = {
 present:'Active',
 leave:'On Leave',
 wfh:'WFH',
 absent:'Absent',
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
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {[1, 2, 3, 4].map((i) => (
 <div key={i} className="h-20 bg-surface-raised rounded-md animate-pulse" />
 ))}
 </div>
 ) : members.length === 0 ? (
 <p className="text-sm text-ink-muted py-6 text-center">{t('teamOverview')}</p>
 ) : (
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {members.map((member) => (
 <a
 key={member.id}
 href={`/profile?id=${member.id}`}
 className="flex items-center gap-3 p-3 rounded-md border border-hairline hover:bg-surface-raised/50 transition"
 >
 <div className="w-10 h-10 rounded-full bg-surface-raised flex items-center justify-center shrink-0">
 {member.avatar ? (
 <img
 src={member.avatar}
 alt={member.name}
 className="w-10 h-10 rounded-full object-cover"
 />
 ) : (
 <User className="h-5 w-5 text-ink-muted" />
 )}
 </div>
 <div className="min-w-0 flex-1">
 <p className="text-sm font-medium text-ink truncate">{member.name}</p>
 <p className="text-xs text-ink-muted truncate">{member.position}</p>
 </div>
 <Badge variant={statusVariant[member.status] ??'neutral'}>
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
