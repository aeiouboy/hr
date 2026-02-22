'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { LeaveHistory } from '@/components/leave/leave-history';
import { LeaveDetail } from '@/components/leave/leave-detail';
import { useLeave } from '@/hooks/use-leave';
import type { LeaveRequest } from '@/hooks/use-leave';

export default function LeaveHistoryPage() {
  const t = useTranslations('leave');
  const { requests, loading, cancelRequest } = useLeave();
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-cg-dark mb-6">{t('history')}</h1>
            <LeaveHistory
              requests={requests}
              loading={loading}
              onViewDetail={(req) => { setSelectedRequest(req); setDetailOpen(true); }}
              onCancel={cancelRequest}
            />
          </div>
        </main>
      </div>

      <LeaveDetail
        request={selectedRequest}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onCancel={cancelRequest}
      />
    </div>
  );
}
