'use client';

import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { StatChip } from './stat-chip';

/* ─── Types ───────────────────────────────────── */

type EmployeeStatus ='active' |'probation' |'inactive' |'terminated' |'onLeave';

interface PersonName {
 th?: string;
 en?: string;
}

interface PersonAvatar {
 src?: string | null;
 /** 1-2 letter fallback when no photo */
 fallback?: string;
 status?: EmployeeStatus;
}

interface PersonStat {
 label: string;
 value: React.ReactNode;
 trend?: string;
 tone?:'default' |'cobalt' |'success' |'warning' |'danger';
}

interface PersonHeroProps {
 avatar: PersonAvatar;
 name: PersonName;
 employeeId?: string;
 /** Position / job title */
 subtitle?: string;
 /** e.g."Product Management · Bangkok · 4y 2m" */
 meta?: string;
 /** Status ribbon color (3px top border) */
 status?: EmployeeStatus;
 /** Context line below badge, e.g."ครบกำหนด 1 มิ.ย. 2026" */
 statusContext?: string;
 stats?: PersonStat[];
 /** Action buttons (Edit, Org Chart, etc.) */
 actions?: React.ReactNode;
 className?: string;
}

/* ─── Status mapping ──────────────────────────── */

const STATUS_RIBBON: Record<EmployeeStatus, string> = {
 active:'border-t-success',
 probation:'border-t-warning',
 inactive:'border-t-ink-muted',
 terminated:'border-t-danger',
 onLeave:'border-t-info',
};

const STATUS_BADGE: Record<EmployeeStatus, { variant:'success' |'warning' |'error' |'neutral' |'info'; label: string }> = {
 active: { variant:'success', label:'Active' },
 probation: { variant:'warning', label:'ทดลองงาน' },
 inactive: { variant:'neutral', label:'Inactive' },
 terminated: { variant:'error', label:'Terminated' },
 onLeave: { variant:'info', label:'ลางาน' },
};

const STATUS_RING: Record<EmployeeStatus, string> = {
 active:'ring-success/30',
 probation:'ring-warning/30',
 inactive:'ring-ink-muted/30',
 terminated:'ring-danger/30',
 onLeave:'ring-info/30',
};

/* ─── Component ───────────────────────────────── */

export function PersonHero({
 avatar,
 name,
 employeeId,
 subtitle,
 meta,
 status ='active',
 statusContext,
 stats,
 actions,
 className,
}: PersonHeroProps) {
 const badgeInfo = STATUS_BADGE[status];
 const fallbackText = avatar.fallback ||
 (name.en ? name.en.substring(0, 2).toUpperCase() :'??');

 return (
 <div
 className={cn(
'bg-surface rounded-md border border-hairline overflow-hidden',
'border-t-[3px]',
 STATUS_RIBBON[status],
 className,
 )}
 >
 <div className="px-6 py-6">
 <div className="flex flex-col sm:flex-row items-start gap-5">
 {/* Avatar — 128px per Rescue spec */}
 <div
 className={cn(
'w-[128px] h-[128px] rounded-md overflow-hidden shrink-0',
'bg-accent-tint flex items-center justify-center',
'ring-2',
 STATUS_RING[avatar.status ?? status],
 )}
 >
 {avatar.src ? (
 <img
 src={avatar.src}
 alt={name.en || name.th ||''}
 className="w-full h-full object-cover"
 />
 ) : (
 <span className="text-3xl font-bold text-accent">
 {fallbackText}
 </span>
 )}
 </div>

 {/* Name + meta */}
 <div className="flex-1 min-w-0">
 {/* Primary name = Thai (Thai-first rule) */}
 <div className="flex flex-wrap items-center gap-2">
 <h1 className="text-2xl font-bold text-ink tracking-tight leading-tight">
 {name.th || name.en}
 </h1>
 <Badge variant={badgeInfo.variant}>{badgeInfo.label}</Badge>
 </div>

 {/* Secondary name */}
 {name.th && name.en && (
 <p className="text-base text-ink-soft mt-0.5">{name.en}</p>
 )}

 {statusContext && (
 <p className="text-xs text-ink-muted mt-0.5">{statusContext}</p>
 )}

 {/* Subtitle (position) */}
 {subtitle && (
 <p className="text-sm text-ink-soft mt-1">{subtitle}</p>
 )}

 {/* Meta line (dept · location · tenure) */}
 {meta && (
 <p className="text-sm text-ink-muted mt-0.5">{meta}</p>
 )}

 {/* Employee ID — mono, prominent per mk2 spec */}
 {employeeId && (
 <p className="text-xs text-ink-muted font-mono tabular-nums mt-2">
 {employeeId}
 </p>
 )}

 {/* Stat chips */}
 {stats && stats.length > 0 && (
 <div className="flex flex-wrap gap-2 mt-3">
 {stats.map((stat) => (
 <StatChip
 key={stat.label}
 label={stat.label}
 value={stat.value}
 trend={stat.trend}
 tone={stat.tone}
 />
 ))}
 </div>
 )}
 </div>

 {/* Actions — top right */}
 {actions && (
 <div className="flex gap-2 shrink-0 sm:self-start">
 {actions}
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
