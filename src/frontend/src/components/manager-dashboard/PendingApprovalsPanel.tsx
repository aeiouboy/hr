'use client';

import { type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UrgencyBadge } from '@/components/quick-approve/UrgencyBadge';
import { CheckCircle2, XCircle, ArrowRight, Clock, Palmtree, Receipt, ArrowLeftRight, FilePen, ClipboardList } from 'lucide-react';
import type { PendingRequest } from '@/lib/quick-approve-api';

interface PendingApprovalsPanelProps {
  requests: PendingRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  loading?: boolean;
}

const typeIcons: Record<string, ReactNode> = {
  leave: <Palmtree className="h-5 w-5" />,
  overtime: <Clock className="h-5 w-5" />,
  claim: <Receipt className="h-5 w-5" />,
  transfer: <ArrowLeftRight className="h-5 w-5" />,
  change_request: <FilePen className="h-5 w-5" />,
};

export function PendingApprovalsPanel({
  requests,
  onApprove,
  onReject,
  loading,
}: PendingApprovalsPanelProps) {
  const t = useTranslations('managerDashboard');
  const top5 = requests.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{t('pendingApprovals')}</CardTitle>
          <a
            href="/quick-approve"
            className="text-sm text-cg-red hover:underline flex items-center gap-1"
          >
            {t('actions.viewDetails')}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : top5.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">
            {t('approvals.noApprovals')}
          </p>
        ) : (
          <ul className="divide-y">
            {top5.map((req) => (
              <li key={req.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className="text-gray-600">{typeIcons[req.type] ?? <ClipboardList className="h-5 w-5" />}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cg-dark truncate">
                    {req.requester.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{req.description}</p>
                </div>
                <UrgencyBadge urgency={req.urgency} />
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => onApprove(req.id)}
                    className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition"
                    aria-label={t('actions.approve')}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onReject(req.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"
                    aria-label={t('actions.reject')}
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
