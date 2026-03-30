'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { LeaveHistory } from '@/components/leave/leave-history';
import { LeaveDetail } from '@/components/leave/leave-detail';
import { useLeave } from '@/hooks/use-leave';
import { useToast } from '@/components/ui/toast';
import type { LeaveRequest } from '@/hooks/use-leave';

export default function LeaveHistoryPage() {
  const t = useTranslations('leave');
  const { toast } = useToast();
  const { requests, loading, cancelRequest, cancelApprovedLeave } = useLeave();
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-cg-dark mb-6">{t('history')}</h1>
            <LeaveHistory
              requests={requests}
              loading={loading}
              onViewDetail={(req) => { setSelectedRequest(req); setDetailOpen(true); }}
              onCancelPending={cancelRequest}
              onRequestCancellation={async (requestId, reason) => {
                await cancelApprovedLeave(requestId, reason);
                toast('success', t('cancellationRequestSubmitted'));
              }}
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
