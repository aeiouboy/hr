'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Clock, CheckCircle, XCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useProbationCases, STATUS_LABEL, type ProbationStatus } from '@/hooks/use-probation';
import { formatDate } from '@/lib/date';

type FilterTab = 'all' | 'pending' | 'approved' | 'rejected';

const STATUS_BADGE: Record<ProbationStatus, 'warning' | 'info' | 'success' | 'error' | 'neutral'> = {
  pending_manager: 'warning',
  pending_hr: 'info',
  approved: 'success',
  rejected: 'error',
  extended: 'warning',
  escalated_ceo: 'error',
};

const STATUS_ICON: Record<ProbationStatus, React.ReactNode> = {
  pending_manager: <Clock className="h-4 w-4 text-warning" />,
  pending_hr: <AlertTriangle className="h-4 w-4 text-info" />,
  approved: <CheckCircle className="h-4 w-4 text-success" />,
  rejected: <XCircle className="h-4 w-4 text-danger" />,
  extended: <Clock className="h-4 w-4 text-warning" />,
  escalated_ceo: <AlertTriangle className="h-4 w-4 text-danger" />,
};

export default function ProbationListPage() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const { cases, loading } = useProbationCases();
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';

  const filtered = cases.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return c.status === 'pending_manager' || c.status === 'pending_hr' || c.status === 'escalated_ceo';
    if (filter === 'approved') return c.status === 'approved';
    if (filter === 'rejected') return c.status === 'rejected' || c.status === 'extended';
    return true;
  });

  const pendingCount = cases.filter((c) => c.status === 'pending_manager' || c.status === 'pending_hr').length;

  const tabs: { key: FilterTab; label: string; count?: number }[] = [
    { key: 'all', label: 'ทั้งหมด', count: cases.length },
    { key: 'pending', label: 'รออนุมัติ', count: pendingCount },
    { key: 'approved', label: 'ผ่านแล้ว' },
    { key: 'rejected', label: 'ไม่ผ่าน / ขยาย' },
  ];

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-ink">Probation Approval</h1>
              <p className="text-sm text-ink-muted mt-1">
                อนุมัติผลการทดลองงาน — ระบบจะแจ้งเตือนอัตโนมัติเมื่อพนักงานครบกำหนด probation
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1 mb-4 border-b border-hairline">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
                    filter === tab.key
                      ? 'border-brand text-brand'
                      : 'border-transparent text-ink-muted hover:text-ink-soft hover:border-hairline'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`ml-1.5 px-1.5 py-0.5 text-xs rounded-full ${
                      filter === tab.key ? 'bg-brand-tint text-brand' : 'bg-surface-raised text-ink-muted'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Cases list */}
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-ink-muted">ไม่มีรายการในหมวดนี้</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filtered.map((c) => {
                  const isPending = c.status === 'pending_manager' || c.status === 'pending_hr';
                  const slaMs = new Date(c.slaDeadline).getTime() - Date.now();
                  const slaHours = Math.max(0, Math.round(slaMs / (1000 * 60 * 60)));
                  const isUrgent = isPending && slaHours < 12;

                  return (
                    <a
                      key={c.id}
                      href={`/${locale}/workflows/probation/${c.id}`}
                      className="block"
                    >
                      <Card className={`p-4 hover:shadow-1 transition-shadow cursor-pointer ${isUrgent ? 'border-l-[3px] border-l-danger' : ''}`}>
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-md overflow-hidden bg-accent-tint shrink-0">
                            {c.photo ? (
                              <img src={c.photo} alt={c.fullNameEn} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm font-bold text-accent">
                                {c.fullNameEn.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-ink">{c.fullNameTh}</span>
                              <span className="text-xs text-ink-muted">{c.fullNameEn}</span>
                            </div>
                            <p className="text-xs text-ink-muted mt-0.5">
                              {c.position} · {c.department} · เริ่มงาน {formatDate(c.hireDate, 'medium', locale)}
                            </p>
                          </div>

                          {/* Status + SLA */}
                          <div className="flex items-center gap-3 shrink-0">
                            {isPending && (
                              <span className={`text-xs font-mono ${isUrgent ? 'text-danger font-semibold' : 'text-ink-muted'}`}>
                                SLA {slaHours}h
                              </span>
                            )}
                            <div className="flex items-center gap-1.5">
                              {STATUS_ICON[c.status]}
                              <Badge variant={STATUS_BADGE[c.status]}>
                                {STATUS_LABEL[c.status]}
                              </Badge>
                            </div>
                            <ChevronRight className="h-4 w-4 text-ink-muted" />
                          </div>
                        </div>
                      </Card>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
