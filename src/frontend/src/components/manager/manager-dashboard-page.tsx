'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import {
 Users,
 UserCheck,
 CalendarOff,
 Clock,
 AlertTriangle,
 Shield,
 GraduationCap,
 Gift,
 Award,
 ChevronRight,
 ChevronLeft,
 CheckCircle2,
 XCircle,
 Building,
 Calendar,
 X,
 User,
 Network,
 GitBranch,
 LayoutList,
 FileBarChart,
 Download,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs } from '@/components/ui/tabs';
import { useManagerDashboard } from '@/hooks/use-manager-dashboard';
import type { TeamMember, PendingApproval, OrgNode, Position, MovementEvent } from '@/hooks/use-manager-dashboard';
import { cn } from '@/lib/utils';

type TabKey ='overview' |'team' |'org-chart' |'positions' |'reports' |'approvals' |'calendar';

const SEVERITY_STYLES: Record<string, string> = {
 critical:'border-l-4 border-l-red-500 bg-danger-tint',
 high:'border-l-4 border-l-yellow-500 bg-warning-tint',
 normal:'border-l-4 border-l-blue-500 bg-accent-tint',
};

const ALERT_ICONS: Record<string, React.ReactNode> = {
 probation: <Shield className="h-4 w-4 text-warning" />,
'work-permit': <AlertTriangle className="h-4 w-4 text-danger" />,
 training: <GraduationCap className="h-4 w-4 text-warning" />,
 birthday: <Gift className="h-4 w-4 text-pink-600" />,
 anniversary: <Award className="h-4 w-4 text-accent" />,
};

const STATUS_BADGE: Record<string, { variant:'success' |'warning' |'info' |'neutral'; label: string }> = {
 active: { variant:'success', label:'Active' },
'on-leave': { variant:'warning', label:'On Leave' },
 probation: { variant:'info', label:'Probation' },
};

const EVENT_COLORS: Record<string, string> = {
 leave:'bg-green-400',
 annual_leave:'bg-green-400',
 sick_leave:'bg-red-400',
 wfh:'bg-purple-400',
 shift:'bg-blue-400',
 training:'bg-orange-400',
 meeting:'bg-indigo-400',
 holiday:'bg-yellow-400',
};

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = [
'January','February','March','April','May','June',
'July','August','September','October','November','December',
];

function OrgNodeItem({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
 const [expanded, setExpanded] = useState(depth === 0);
 const hasChildren = node.children && node.children.length > 0;

 return (
 <div className={cn(depth > 0 &&'ml-4 border-l pl-3')}>
 <div className="flex items-center gap-2 py-1.5">
 {hasChildren ? (
 <button onClick={() => setExpanded(!expanded)} className="p-0.5 rounded hover:bg-surface-raised hover:bg-surface-raised" aria-label={expanded ?'Collapse' :'Expand'}>
 {expanded ? <ChevronLeft className="h-3.5 w-3.5 text-ink-muted rotate-90" /> : <ChevronRight className="h-3.5 w-3.5 text-ink-muted" />}
 </button>
 ) : <span className="w-4" />}
 <div className="h-7 w-7 rounded-full bg-surface-raised flex items-center justify-center text-xs font-medium text-ink-muted shrink-0">
 {node.avatar ? <img src={node.avatar} alt="" className="h-7 w-7 rounded-full object-cover" /> : <User className="h-3.5 w-3.5 text-ink-muted" />}
 </div>
 <div className="min-w-0">
 <p className="text-xs font-medium text-ink truncate">{node.name}</p>
 <p className="text-[10px] text-ink-muted truncate">{node.position}</p>
 </div>
 </div>
 {expanded && hasChildren && node.children!.map((child: OrgNode) => <OrgNodeItem key={child.id} node={child} depth={depth + 1} />)}
 </div>
 );
}

export function ManagerDashboardPage() {
 const t = useTranslations('managerDashboard');
 const pathname = usePathname();
 const router = useRouter();
 const locale = pathname.startsWith('/th') ?'th' :'en';

 const {
 team, approvals, alerts, calendarEvents, orgChart, stats, loading,
 calMonth, calYear, setCalMonth, setCalYear,
 approveRequest, rejectRequest,
 positions,
 movementEvents,
 } = useManagerDashboard();

 const [activeTab, setActiveTab] = useState<TabKey>('overview');
 const [confirmAction, setConfirmAction] = useState<{ id: string; action:'approve' |'reject' } | null>(null);
 const [teamFilter, setTeamFilter] = useState<string>('all');
 const [deptFilter, setDeptFilter] = useState<string>('all');
 const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
 const [orgMode, setOrgMode] = useState<'สายตรง' |'สายไขว้'>('สายตรง');
 const [positionDeptFilter, setPositionDeptFilter] = useState<string>('all');
 const [positionStatusFilter, setPositionStatusFilter] = useState<string>('all');
 const [movementFilter, setMovementFilter] = useState<'เดือนนี้' | '30 วันล่าสุด' | 'ทั้งหมด'>('เดือนนี้');

 const tabs = [
 { key:'overview', label: t('teamOverview') },
 { key:'team', label: t('teamMembers') },
 { key:'org-chart', label:'แผนผังทีม' },
 { key:'positions', label:'ตำแหน่งและอัตรากำลัง' },
 { key:'reports', label:'รายงานทีม' },
 { key:'approvals', label: `${t('pendingApprovals')} (${approvals.length})` },
 { key:'calendar', label: t('teamCalendar') },
 ];

 const uniqueDepts = useMemo(
  () => Array.from(new Set(team.map((m) => m.department))).sort(),
  [team],
 );

 const filteredTeam = useMemo(() => {
  let result = teamFilter ==='all' ? team : team.filter((m) => m.status === teamFilter);
  if (deptFilter !== 'all') result = result.filter((m) => m.department === deptFilter);
  return result;
 }, [team, teamFilter, deptFilter]);

 const visibleAlerts = alerts.filter((a) => !dismissedAlerts.has(a.id));

 const handleConfirmAction = () => {
 if (!confirmAction) return;
 if (confirmAction.action ==='approve') approveRequest(confirmAction.id);
 else rejectRequest(confirmAction.id);
 setConfirmAction(null);
 };

 const dismissAlert = (id: string) => {
 setDismissedAlerts((prev) => new Set(prev).add(id));
 };

 // Calendar calculations
 const { calDays, calStartDay } = useMemo(() => {
 const daysInMonth = new Date(calYear, calMonth, 0).getDate();
 const startDay = new Date(calYear, calMonth - 1, 1).getDay();
 return { calDays: daysInMonth, calStartDay: startDay };
 }, [calMonth, calYear]);

 const eventsByDate = useMemo(() => {
 const map = new Map<number, typeof calendarEvents>();
 calendarEvents.forEach((e) => {
 const d = new Date(e.date);
 if (d.getMonth() + 1 === calMonth && d.getFullYear() === calYear) {
 const day = d.getDate();
 if (!map.has(day)) map.set(day, []);
 map.get(day)!.push(e);
 }
 });
 return map;
 }, [calendarEvents, calMonth, calYear]);

 const today = new Date();
 const isToday = (day: number) =>
 day === today.getDate() && calMonth === today.getMonth() + 1 && calYear === today.getFullYear();

 const prevMonth = () => {
 if (calMonth === 1) { setCalMonth(12); setCalYear(calYear - 1); }
 else setCalMonth(calMonth - 1);
 };
 const nextMonth = () => {
 if (calMonth === 12) { setCalMonth(1); setCalYear(calYear + 1); }
 else setCalMonth(calMonth + 1);
 };

 if (loading) {
 return (
 <div className="space-y-6">
 <Skeleton className="h-8 w-64" />
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 w-full rounded-md" />)}
 </div>
 <Skeleton className="h-96 w-full rounded-md" />
 </div>
 );
 }

 const renderStatCards = () => (
 <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
 {[
 { label: t('quickStats.totalMembers'), value: stats.totalMembers, icon: <Users className="h-5 w-5 text-accent" />, bg:'bg-accent-tint' },
 { label: t('quickStats.activeToday'), value: stats.activeToday, icon: <UserCheck className="h-5 w-5 text-success" />, bg:'bg-success-tint' },
 { label: t('quickStats.onLeaveToday'), value: stats.onLeaveToday, icon: <CalendarOff className="h-5 w-5 text-warning" />, bg:'bg-warning-tint' },
 { label: t('quickStats.pending'), value: stats.pendingApprovals, icon: <Clock className="h-5 w-5 text-danger" />, bg:'bg-danger-tint', href:'/quick-approve' },
 { label: t('quickStats.inProbation'), value: stats.inProbation, icon: <Shield className="h-5 w-5 text-accent" />, bg:'bg-accent-tint' },
 ].map((stat) => {
 const card = (
 <div key={stat.label} className={cn('rounded-md border p-4', stat.bg, stat.href &&'cursor-pointer hover:shadow-1 transition')}>
 <div className="flex items-center gap-2 mb-2">{stat.icon}<span className="text-xs text-ink-muted uppercase tracking-wider">{stat.label}</span></div>
 <p className="text-2xl font-bold text-ink">{stat.value}</p>
 </div>
 );
 return stat.href ? <a key={stat.label} href={stat.href}>{card}</a> : <div key={stat.label}>{card}</div>;
 })}
 </div>
 );

 const renderUrgentAlerts = () => {
 if (visibleAlerts.length === 0) return null;
 return (
 <div className="space-y-2">
 {visibleAlerts.filter((a) => a.severity ==='critical').map((alert) => (
 <div key={alert.id} className="flex items-start gap-3 bg-danger-tint border border-red-200 rounded-md px-4 py-3" role="alert">
 <AlertTriangle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-danger">{alert.title}</p>
 <p className="text-xs text-danger mt-0.5">{alert.description}</p>
 </div>
 <button onClick={() => dismissAlert(alert.id)} className="p-1 rounded hover:bg-danger-tint transition" aria-label="Dismiss">
 <X className="h-4 w-4 text-red-400" />
 </button>
 </div>
 ))}
 </div>
 );
 };

 const renderOverview = () => (
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Urgent Alerts + Pending Approvals */}
 <div className="lg:col-span-2 space-y-4">
 <Card>
 <CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-warning" />{t('alerts.importantAlerts')}</CardTitle></CardHeader>
 <CardContent>
 <div className="space-y-3">
 {visibleAlerts.map((alert) => (
 <div key={alert.id} className={cn('rounded-md p-3', SEVERITY_STYLES[alert.severity])}>
 <div className="flex items-start gap-3">
 {ALERT_ICONS[alert.type]}
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-ink">{alert.title}</p>
 <p className="text-xs text-ink-muted mt-0.5">{alert.description}</p>
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <Badge variant={alert.severity ==='critical' ?'error' : alert.severity ==='high' ?'warning' :'info'}>
 {alert.dueDate}
 </Badge>
 <button onClick={() => dismissAlert(alert.id)} className="p-0.5 rounded hover:bg-surface/50" aria-label="Dismiss">
 <X className="h-3.5 w-3.5 text-ink-muted" />
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>

 {/* Pending Approvals Preview */}
 <Card>
 <CardHeader>
 <div className="flex items-center justify-between">
 <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-danger" />{t('pendingApprovals')}</CardTitle>
 <a href="/quick-approve" className="text-sm text-brand hover:underline flex items-center gap-1">
 View All <ChevronRight className="h-4 w-4" />
 </a>
 </div>
 </CardHeader>
 <CardContent>
 {approvals.length === 0 ? (
 <p className="text-sm text-ink-muted text-center py-6">{t('approvals.noApprovals')}</p>
 ) : (
 <div className="space-y-2">
 {approvals.slice(0, 5).map((a) => (
 <div key={a.id} className="flex items-center justify-between p-3 rounded-md hover:bg-surface-raised/30 border border-hairline">
 <div className="flex items-center gap-3 min-w-0">
 {a.urgent && <span className="h-2 w-2 rounded-full bg-danger-tint0 shrink-0" />}
 <div className="min-w-0">
 <p className="text-sm font-medium text-ink truncate">{a.summary}</p>
 <p className="text-xs text-ink-muted">{a.employeeName}</p>
 </div>
 </div>
 <div className="flex items-center gap-2 shrink-0">
 <Badge variant={a.type ==='leave' ?'info' : a.type ==='expense' ?'warning' : a.type ==='overtime' ?'success' :'neutral'}>
 {a.type}
 </Badge>
 <button onClick={() => setConfirmAction({ id: a.id, action:'approve' })} className="p-1 rounded hover:bg-success-tint text-success" aria-label="Approve"><CheckCircle2 className="h-4 w-4" /></button>
 <button onClick={() => setConfirmAction({ id: a.id, action:'reject' })} className="p-1 rounded hover:bg-danger-tint text-danger" aria-label="Reject"><XCircle className="h-4 w-4" /></button>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>
 </div>

 {/* Org Chart CTA */}
 <div className="space-y-4">
 <Card className="flex flex-col items-center justify-center text-center p-6 gap-4 min-h-[220px] hover:shadow-1 transition cursor-pointer group" onClick={() => setActiveTab('org-chart')}>
 <div className="h-14 w-14 rounded-full bg-accent-tint flex items-center justify-center group-hover:scale-105 transition-transform">
 <Network className="h-7 w-7 text-accent" />
 </div>
 <div>
 <p className="text-base font-semibold text-ink">แผนผังทีม</p>
 <p className="text-xs text-ink-muted mt-1">สายตรง · สายไขว้</p>
 </div>
 <Button variant="outline" size="sm" className="gap-1.5 group-hover:bg-accent-tint group-hover:text-accent transition" onClick={(e) => { e.stopPropagation(); setActiveTab('org-chart'); }}>
 <GitBranch className="h-4 w-4" />
 ดูแผนผังเต็ม
 </Button>
 </Card>
 </div>
 </div>
 );

 const renderTeam = () => (
 // TODO(backend-phase): wire useAuthStore().permissions
 //   field-level visibility gate per BRD #174 AC2
 //   currently mockup-proof — all fields visible
 <Card>
 <CardHeader>
 <div className="flex flex-col gap-3">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
 <CardTitle>{t('teamMembers')} ({filteredTeam.length})</CardTitle>
 {/* ตัวกรองสถานะ */}
 <div className="flex flex-wrap gap-2">
 {['all','active','on-leave','probation'].map((f) => (
 <button key={f} onClick={() => setTeamFilter(f)} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition', teamFilter === f ?'bg-brand text-white' :'bg-surface-raised text-ink-muted hover:bg-surface-raised hover:bg-surface-raised')}>
 {f ==='all' ? t('filters.all') : f ==='active' ? t('filters.active') : f ==='on-leave' ? t('filters.onLeave') : t('filters.probation')}
 </button>
 ))}
 </div>
 </div>
 {/* ตัวกรองหน่วยงาน (AC-3) */}
 {uniqueDepts.length > 0 && (
 <div className="flex flex-wrap gap-2">
 <button onClick={() => setDeptFilter('all')} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition', deptFilter ==='all' ?'bg-surface-raised text-ink ring-1 ring-hairline' :'bg-surface text-ink-muted hover:bg-surface-raised')}>
 ทุกหน่วยงาน
 </button>
 {uniqueDepts.map((dept) => (
 <button key={dept} onClick={() => setDeptFilter(dept)} className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition', deptFilter === dept ?'bg-surface-raised text-ink ring-1 ring-hairline' :'bg-surface text-ink-muted hover:bg-surface-raised')}>
 {dept}
 </button>
 ))}
 </div>
 )}
 </div>
 </CardHeader>
 <CardContent>
 {/* Table view — AC-2: แสดง หน่วยงาน / ศูนย์ต้นทุน / หัวหน้างาน */}
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b border-hairline">
 <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">พนักงาน</th>
 <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">หน่วยงาน</th>
 <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">ศูนย์ต้นทุน</th>
 <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">หัวหน้างาน</th>
 <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">สถานะ</th>
 </tr>
 </thead>
 <tbody>
 {filteredTeam.map((m) => (
 <tr key={m.id} className="border-b border-hairline last:border-0 hover:bg-surface-raised/30 transition">
 <td className="py-2.5 px-3">
 <a href={`/profile?id=${m.id}`} className="flex items-center gap-2 group">
 <div className="h-8 w-8 rounded-full bg-surface-raised flex items-center justify-center text-xs font-medium text-ink-muted shrink-0">{m.avatar}</div>
 <div className="min-w-0">
 <p className="text-sm font-medium text-ink group-hover:text-brand transition truncate">{m.name}</p>
 <p className="text-xs text-ink-muted truncate">{m.position}</p>
 </div>
 </a>
 </td>
 <td className="py-2.5 px-3 text-xs text-ink">{m.department}</td>
 <td className="py-2.5 px-3 text-xs text-ink-muted font-mono">{m.costCenter || '—'}</td>
 <td className="py-2.5 px-3 text-xs text-ink">{m.managerName ?? '—'}</td>
 <td className="py-2.5 px-3">
 <Badge variant={STATUS_BADGE[m.status]?.variant ??'neutral'}>{STATUS_BADGE[m.status]?.label ?? m.status}</Badge>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 {filteredTeam.length === 0 && (
 <p className="text-sm text-ink-muted text-center py-8">ไม่พบข้อมูลสมาชิก</p>
 )}
 </div>
 </CardContent>
 </Card>
 );

 const renderOrgChart = () => {
 // Build lookup id→name สำหรับ dotted-line label ใน Matrix mode
 const buildIdMap = (node: OrgNode, acc: Map<string, string> = new Map()): Map<string, string> => {
  acc.set(node.id, node.name);
  node.children?.forEach((c) => buildIdMap(c, acc));
  return acc;
 };
 const idMap = orgChart ? buildIdMap(orgChart) : new Map<string, string>();

 function OrgNodeFull({ node, depth = 0 }: { node: OrgNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth <= 1);
  const hasChildren = node.children && node.children.length > 0;
  const showDotted = orgMode ==='สายไขว้' && !!node.dottedLineManagerId;

  return (
   <div className={cn(depth > 0 &&'ml-6 border-l border-hairline pl-3')}>
    <div className="flex items-start gap-2 py-2">
     {hasChildren ? (
      <button
       onClick={() => setExpanded(!expanded)}
       className="mt-1 p-0.5 rounded hover:bg-surface-raised transition shrink-0"
       aria-label={expanded ?'ย่อ' :'ขยาย'}
      >
       {expanded
        ? <ChevronLeft className="h-3.5 w-3.5 text-ink-muted rotate-90" />
        : <ChevronRight className="h-3.5 w-3.5 text-ink-muted" />}
      </button>
     ) : <span className="w-4 shrink-0" />}

     <div className="flex-1 min-w-0">
      <div className="flex flex-wrap items-center gap-2">
       <div className="h-8 w-8 rounded-full bg-surface-raised flex items-center justify-center text-xs font-medium text-ink-muted shrink-0">
        {node.avatar
         ? <img src={node.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
         : <User className="h-4 w-4 text-ink-muted" />}
       </div>
       <div className="min-w-0">
        <p className="text-sm font-medium text-ink truncate">{node.name}</p>
        <p className="text-xs text-ink-muted truncate">{node.position}</p>
       </div>
       {showDotted && (
        <span
         className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-dashed border-indigo-400 text-[10px] text-indigo-600 bg-indigo-50 shrink-0"
         title="สายไขว้"
        >
         <GitBranch className="h-2.5 w-2.5" />
         สายไขว้ {idMap.get(node.dottedLineManagerId!) ?? node.dottedLineManagerId}
        </span>
       )}
      </div>
     </div>
    </div>
    {expanded && hasChildren && node.children!.map((child) => (
     <OrgNodeFull key={child.id} node={child} depth={depth + 1} />
    ))}
   </div>
  );
 }

 return (
  <Card>
   <CardHeader>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
     <CardTitle className="flex items-center gap-2">
      <Network className="h-5 w-5 text-accent" />
      แผนผังทีม
     </CardTitle>
     {/* Toggle สายตรง / สายไขว้ */}
     <div className="flex items-center gap-1 rounded-full border border-hairline p-0.5 bg-surface-raised w-fit">
      {(['สายตรง', 'สายไขว้'] as const).map((mode) => (
       <button
        key={mode}
        onClick={() => setOrgMode(mode)}
        className={cn(
         'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition',
         orgMode === mode
          ? 'bg-brand text-white shadow-sm'
          : 'text-ink-muted hover:text-ink',
        )}
       >
        {mode ==='สายตรง' ? <Users className="h-3.5 w-3.5" /> : <GitBranch className="h-3.5 w-3.5" />}
        {mode}
       </button>
      ))}
     </div>
    </div>
    {orgMode ==='สายไขว้' && (
     <p className="text-xs text-ink-muted mt-1 flex items-center gap-1">
      <span className="inline-block w-6 border-t border-dashed border-indigo-400" />
      หน้าต่างที่มีป้าย <span className="text-indigo-600 font-medium">สายไขว้</span> = มีผู้บังคับบัญชาเพิ่มในโครงสร้าง Matrix
     </p>
    )}
   </CardHeader>
   <CardContent>
    {orgChart ? (
     <OrgNodeFull node={orgChart} />
    ) : (
     <p className="text-sm text-ink-muted text-center py-8">ไม่พบข้อมูลแผนผัง</p>
    )}
   </CardContent>
  </Card>
 );
 };

 const renderApprovals = () => (
 <Card>
 <CardHeader>
 <div className="flex items-center justify-between">
 <CardTitle>{t('pendingApprovals')} ({approvals.length})</CardTitle>
 <a href="/quick-approve" className="text-sm text-brand hover:underline flex items-center gap-1">
 Open Quick Approve <ChevronRight className="h-4 w-4" />
 </a>
 </div>
 </CardHeader>
 <CardContent>
 {approvals.length === 0 ? (
 <p className="text-sm text-ink-muted text-center py-8">{t('approvals.noApprovals')}</p>
 ) : (
 <div className="space-y-3">
 {approvals.map((a) => (
 <div key={a.id} className={cn('p-4 rounded-md border', a.urgent &&'border-red-200 bg-danger-tint/50')}>
 <div className="flex items-start justify-between gap-3">
 <div className="min-w-0">
 <div className="flex items-center gap-2 mb-1">
 <Badge variant={a.type ==='leave' ?'info' : a.type ==='expense' ?'warning' : a.type ==='overtime' ?'success' :'neutral'}>{a.type}</Badge>
 {a.urgent && <Badge variant="error">{t('approvals.urgent')}</Badge>}
 </div>
 <p className="text-sm font-medium text-ink">{a.summary}</p>
 <p className="text-xs text-ink-muted mt-1">{a.employeeName} &middot; {t('approvals.submitted')} {a.submittedAt}</p>
 {a.amount && <p className="text-xs text-ink-muted mt-1">Amount: ฿{a.amount.toLocaleString()}</p>}
 {a.dates && <p className="text-xs text-ink-muted">Dates: {a.dates}</p>}
 </div>
 <div className="flex gap-2 shrink-0">
 <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => setConfirmAction({ id: a.id, action:'approve' })}>
 <CheckCircle2 className="h-4 w-4 mr-1" />{t('actions.approve')}
 </Button>
 <Button variant="outline" size="sm" onClick={() => setConfirmAction({ id: a.id, action:'reject' })}>
 <XCircle className="h-4 w-4 mr-1" />{t('actions.reject')}
 </Button>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </CardContent>
 </Card>
 );

 const renderPositions = () => {
 const uniquePosDepts = Array.from(new Set(positions.map((p: Position) => p.department))).sort();

 const filtered = positions.filter((p: Position) => {
  const deptMatch = positionDeptFilter ==='all' || p.department === positionDeptFilter;
  const statusMatch = positionStatusFilter ==='all' || (positionStatusFilter ==='active' && p.headcountBudget > 0);
  return deptMatch && statusMatch;
 });

 const totalPositions = filtered.length;
 const totalVacancy = filtered.reduce((sum: number, p: Position) => sum + Math.max(0, p.headcountBudget - p.headcountActual), 0);
 const totalBudget = filtered.reduce((sum: number, p: Position) => sum + p.headcountBudget, 0);
 const vacancyRate = totalBudget > 0 ? Math.round((totalVacancy / totalBudget) * 100) : 0;

 return (
  <div className="space-y-4">
   {/* Stat Cards */}
   <div className="grid grid-cols-3 gap-4">
    <div className="rounded-md border p-4 bg-accent-tint">
     <div className="flex items-center gap-2 mb-2">
      <LayoutList className="h-5 w-5 text-accent" />
      <span className="text-xs text-ink-muted uppercase tracking-wider">รวมตำแหน่ง</span>
     </div>
     <p className="text-2xl font-bold text-ink">{totalPositions}</p>
    </div>
    <div className="rounded-md border p-4 bg-warning-tint">
     <div className="flex items-center gap-2 mb-2">
      <Users className="h-5 w-5 text-warning" />
      <span className="text-xs text-ink-muted uppercase tracking-wider">ตำแหน่งว่าง</span>
     </div>
     <p className="text-2xl font-bold text-ink">{totalVacancy}</p>
    </div>
    <div className="rounded-md border p-4 bg-danger-tint">
     <div className="flex items-center gap-2 mb-2">
      <Building className="h-5 w-5 text-danger" />
      <span className="text-xs text-ink-muted uppercase tracking-wider">อัตราว่าง %</span>
     </div>
     <p className="text-2xl font-bold text-ink">{vacancyRate}%</p>
    </div>
   </div>

   <Card>
    <CardHeader>
     <div className="flex flex-col gap-3">
      <CardTitle className="flex items-center gap-2">
       <LayoutList className="h-5 w-5 text-accent" />
       ตำแหน่งและอัตรากำลัง ({filtered.length})
      </CardTitle>
      {/* Filter chips: dept */}
      <div className="flex flex-wrap gap-2">
       <button
        onClick={() => setPositionDeptFilter('all')}
        className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition', positionDeptFilter ==='all' ?'bg-brand text-white' :'bg-surface-raised text-ink-muted hover:bg-surface-raised')}
       >
        ทุกหน่วยงาน
       </button>
       {uniquePosDepts.map((dept: string) => (
        <button
         key={dept}
         onClick={() => setPositionDeptFilter(dept)}
         className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition', positionDeptFilter === dept ?'bg-brand text-white' :'bg-surface-raised text-ink-muted hover:bg-surface-raised')}
        >
         {dept}
        </button>
       ))}
      </div>
      {/* Filter chips: status */}
      <div className="flex flex-wrap gap-2">
       {[
        { key:'all', label:'ทั้งหมด' },
        { key:'active', label:'มีอัตรากำลัง' },
       ].map(({ key, label }) => (
        <button
         key={key}
         onClick={() => setPositionStatusFilter(key)}
         className={cn('px-3 py-1.5 rounded-full text-xs font-medium transition', positionStatusFilter === key ?'bg-surface-raised text-ink ring-1 ring-hairline' :'bg-surface text-ink-muted hover:bg-surface-raised')}
        >
         {label}
        </button>
       ))}
      </div>
     </div>
    </CardHeader>
    <CardContent>
     <div className="overflow-x-auto">
      <table className="w-full text-sm">
       <thead>
        <tr className="border-b border-hairline">
         <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">รหัสตำแหน่ง</th>
         <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">ชื่อตำแหน่ง</th>
         <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">หน่วยงาน</th>
         <th className="text-left py-2 px-3 text-xs font-medium text-ink-muted">ศูนย์ต้นทุน</th>
         <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">อัตรากำลังจริง</th>
         <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">อัตรากำลังเป้าหมาย</th>
         <th className="text-right py-2 px-3 text-xs font-medium text-ink-muted">ตำแหน่งว่าง</th>
        </tr>
       </thead>
       <tbody>
        {filtered.map((p: Position) => {
         const vacancy = Math.max(0, p.headcountBudget - p.headcountActual);
         return (
          <tr
           key={p.positionCode}
           className="border-b border-hairline last:border-0 hover:bg-surface-raised/30 transition cursor-pointer"
           onClick={() => router.push(`/${locale}/admin/positions`)}
          >
           <td className="py-2.5 px-3 text-xs text-ink-muted font-mono">{p.positionCode}</td>
           <td className="py-2.5 px-3 text-sm font-medium text-ink">{p.positionTitle}</td>
           <td className="py-2.5 px-3 text-xs text-ink">{p.department}</td>
           <td className="py-2.5 px-3 text-xs text-ink-muted font-mono">{p.costCenter}</td>
           <td className="py-2.5 px-3 text-xs text-ink text-right">{p.headcountActual}</td>
           <td className="py-2.5 px-3 text-xs text-ink text-right">{p.headcountBudget}</td>
           <td className="py-2.5 px-3 text-right">
            {vacancy > 0 ? (
             <Badge variant="warning">{vacancy}</Badge>
            ) : (
             <Badge variant="success">0</Badge>
            )}
           </td>
          </tr>
         );
        })}
       </tbody>
      </table>
      {filtered.length === 0 && (
       <p className="text-sm text-ink-muted text-center py-8">ไม่พบข้อมูลตำแหน่ง</p>
      )}
     </div>
    </CardContent>
   </Card>
  </div>
 );
 };

 const renderCalendar = () => (
 <Card>
 <CardHeader>
 <div className="flex items-center justify-between">
 <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-accent" />{t('teamCalendar')}</CardTitle>
 <div className="flex items-center gap-2">
 <button onClick={prevMonth} className="p-1 rounded hover:bg-surface-raised hover:bg-surface-raised transition" aria-label="Previous month">
 <ChevronLeft className="h-4 w-4" />
 </button>
 <span className="text-sm font-medium min-w-[120px] text-center">{MONTHS[calMonth - 1]} {calYear}</span>
 <button onClick={nextMonth} className="p-1 rounded hover:bg-surface-raised hover:bg-surface-raised transition" aria-label="Next month">
 <ChevronRight className="h-4 w-4" />
 </button>
 </div>
 </div>
 </CardHeader>
 <CardContent>
 {/* Day headers */}
 <div className="grid grid-cols-7 mb-1">
 {DAYS.map((d) => (
 <div key={d} className="text-center text-xs font-medium text-ink-muted py-1">{d}</div>
 ))}
 </div>

 {/* Calendar grid */}
 <div className="grid grid-cols-7 gap-px bg-surface-raised rounded-md overflow-hidden">
 {Array.from({ length: calStartDay }).map((_, i) => (
 <div key={`empty-${i}`} className="bg-surface p-1 min-h-[64px]" />
 ))}
 {Array.from({ length: calDays }).map((_, i) => {
 const day = i + 1;
 const dayEvents = eventsByDate.get(day) ?? [];
 return (
 <div key={day} className={cn('bg-surface p-1 min-h-[64px]', isToday(day) &&'ring-2 ring-inset ring-brand')}>
 <span className={cn('text-xs', isToday(day) ?'font-bold text-brand' :'text-ink-muted')}>{day}</span>
 <div className="mt-0.5 space-y-0.5">
 {dayEvents.slice(0, 2).map((ev) => (
 <div key={ev.id} className={cn('text-[9px] px-1 py-0.5 rounded truncate text-white', EVENT_COLORS[ev.type] ??'bg-gray-400')} title={`${ev.employeeName}: ${ev.label}`}>
 {ev.employeeName.split('')[0]}
 </div>
 ))}
 {dayEvents.length > 2 && (
 <span className="text-[9px] text-ink-muted px-1">+{dayEvents.length - 2}</span>
 )}
 </div>
 </div>
 );
 })}
 </div>

 {/* Legend */}
 <div className="flex flex-wrap gap-3 mt-3 text-xs text-ink-muted">
 {Object.entries(EVENT_COLORS).map(([type, color]) => (
 <div key={type} className="flex items-center gap-1">
 <span className={cn('w-2.5 h-2.5 rounded-full', color)} />
 <span>{type.replace('_','')}</span>
 </div>
 ))}
 </div>
 </CardContent>
 </Card>
 );

 const renderReports = () => {
 // Aggregate headcount per department from MOCK_TEAM (SSoT — reuse team state)
 const deptCounts: Record<string, number> = {};
 team.forEach((m) => {
  deptCounts[m.department] = (deptCounts[m.department] ?? 0) + 1;
 });
 const maxCount = Math.max(...Object.values(deptCounts), 1);

 // Date range filter logic
 const now = new Date();
 const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
 const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

 const filteredMovement = (movementEvents ?? []).filter((ev: MovementEvent) => {
  const evDate = new Date(ev.date);
  if (movementFilter === 'เดือนนี้') return evDate >= startOfMonth;
  if (movementFilter === '30 วันล่าสุด') return evDate >= thirtyDaysAgo;
  return true; // ทั้งหมด
 }).sort((a: MovementEvent, b: MovementEvent) => b.date.localeCompare(a.date));

 const MOVEMENT_BADGE: Record<string, { label: string; cls: string }> = {
  joiner:   { label:'เข้าใหม่', cls:'bg-teal-100 text-teal-700 border-teal-300' },
  leaver:   { label:'ออก',     cls:'bg-red-100 text-red-600 border-red-300' },
  transfer: { label:'ย้าย',    cls:'bg-amber-100 text-amber-700 border-amber-300' },
 };

 return (
  <div className="space-y-6">
   {/* Section A — อัตรากำลังตามหน่วยงาน */}
   <Card>
    <CardHeader>
     <CardTitle className="flex items-center gap-2">
      <FileBarChart className="h-5 w-5 text-accent" />
      อัตรากำลังตามหน่วยงาน
     </CardTitle>
    </CardHeader>
    <CardContent>
     <div className="space-y-3">
      {Object.entries(deptCounts).map(([dept, count]) => {
       const pct = Math.round((count / maxCount) * 100);
       return (
        <div key={dept} className="flex items-center gap-3">
         <span className="text-sm text-ink w-32 shrink-0 truncate">{dept}</span>
         <div className="flex-1 bg-surface-raised rounded-full h-6 overflow-hidden">
          <div
           className="h-full rounded-full flex items-center px-2"
           style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 60%, white))' }}
          >
           <span className="text-[11px] font-medium text-white leading-none">{count}</span>
          </div>
         </div>
         <span className="text-xs text-ink-muted w-6 text-right shrink-0">{count}</span>
        </div>
       );
      })}
      {Object.keys(deptCounts).length === 0 && (
       <p className="text-sm text-ink-muted text-center py-4">ไม่พบข้อมูล</p>
      )}
     </div>
    </CardContent>
   </Card>

   {/* Section B — การเคลื่อนไหวของทีม */}
   <Card>
    <CardHeader>
     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <CardTitle className="flex items-center gap-2">
       <Users className="h-5 w-5 text-accent" />
       การเคลื่อนไหวของทีม
      </CardTitle>
      {/* Section C — Export CSV button (placeholder) */}
      <Button
       variant="outline"
       size="sm"
       className="gap-1.5 shrink-0"
       onClick={() => {
        // TODO(backend-phase): wire CSV export endpoint
        console.log('TODO: backend phase wire CSV export');
       }}
      >
       <Download className="h-4 w-4" />
       ส่งออก CSV
      </Button>
     </div>
     {/* Date range filter chips */}
     <div className="flex flex-wrap gap-2 mt-2">
      {(['เดือนนี้', '30 วันล่าสุด', 'ทั้งหมด'] as const).map((label) => (
       <button
        key={label}
        onClick={() => setMovementFilter(label)}
        className={cn(
         'px-3 py-1.5 rounded-full text-xs font-medium transition',
         movementFilter === label ? 'bg-brand text-white' : 'bg-surface-raised text-ink-muted hover:bg-surface-raised',
        )}
       >
        {label}
       </button>
      ))}
     </div>
    </CardHeader>
    <CardContent>
     {filteredMovement.length === 0 ? (
      <p className="text-sm text-ink-muted text-center py-6">ไม่มีการเคลื่อนไหวในช่วงนี้</p>
     ) : (
      <div className="space-y-2">
       {filteredMovement.map((ev: MovementEvent) => {
        const badge = MOVEMENT_BADGE[ev.type];
        return (
         <div key={ev.id} className="flex items-center gap-3 p-3 rounded-md border border-hairline hover:bg-surface-raised/30 transition">
          <span className="text-xs text-ink-muted w-24 shrink-0">{ev.date}</span>
          <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border shrink-0', badge.cls)}>
           {badge.label}
          </span>
          <span className="text-sm font-medium text-ink shrink-0">{ev.employeeName}</span>
          <span className="text-xs text-ink-muted truncate">{ev.details}</span>
         </div>
        );
       })}
      </div>
     )}
    </CardContent>
   </Card>
  </div>
 );
 };

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-2xl font-bold text-ink">{t('title')}</h1>
 <p className="text-sm text-ink-muted mt-1">{t('subtitle')}</p>
 </div>

 {/* Urgent Alerts Banner */}
 {renderUrgentAlerts()}

 {renderStatCards()}

 <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(k) => setActiveTab(k as TabKey)} className="mb-0" />

 {activeTab ==='overview' && renderOverview()}
 {activeTab ==='team' && renderTeam()}
 {activeTab ==='org-chart' && renderOrgChart()}
 {activeTab ==='positions' && renderPositions()}
 {activeTab ==='reports' && renderReports()}
 {activeTab ==='approvals' && renderApprovals()}
 {activeTab ==='calendar' && renderCalendar()}

 {/* Confirmation Modal */}
 <Modal
 open={!!confirmAction}
 onClose={() => setConfirmAction(null)}
 title={confirmAction?.action ==='approve' ? t('messages.confirmApprove') : t('messages.confirmReject')}
 footer={
 <div className="flex justify-end gap-3">
 <Button variant="outline" onClick={() => setConfirmAction(null)}>Cancel</Button>
 <Button
 variant={confirmAction?.action ==='reject' ?'destructive' :'default'}
 className={confirmAction?.action ==='approve' ?'bg-success hover:bg-success/90' :''}
 onClick={handleConfirmAction}
 >
 {confirmAction?.action ==='approve' ? t('actions.approve') : t('actions.reject')}
 </Button>
 </div>
 }
 >
 <p className="text-sm text-ink-muted">
 {confirmAction?.action ==='approve' ? t('messages.confirmApprove') : t('messages.confirmReject')}
 </p>
 </Modal>
 </div>
 );
}
