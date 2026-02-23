'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ClipboardList } from 'lucide-react';
import type { HospitalReferral, ReferralStatus } from '@/hooks/use-hospital-referral';

const STATUS_CLASSES: Record<ReferralStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  pending_manager: 'bg-yellow-100 text-yellow-800',
  pending_hr: 'bg-orange-100 text-orange-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-500',
  letter_issued: 'bg-purple-100 text-purple-800',
};

interface ReferralHistoryProps {
  referrals: HospitalReferral[];
  loading?: boolean;
  onViewDetail: (referral: HospitalReferral) => void;
}

export function ReferralHistory({ referrals, loading, onViewDetail }: ReferralHistoryProps) {
  const t = useTranslations('hospitalReferral');

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{t('myReferrals')}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {referrals.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <ClipboardList className="h-12 w-12 mb-3 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">{t('noReferrals')}</p>
            <p className="text-xs text-gray-400 mt-1">{t('createFirst')}</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">
                      {t('createdDate')}
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">
                      {t('hospital')}
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 px-6 py-3">
                      {t('reason')}
                    </th>
                    <th className="text-center text-xs font-medium text-gray-500 px-6 py-3">
                      {t('statusLabel')}
                    </th>
                    <th className="text-right text-xs font-medium text-gray-500 px-6 py-3">
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {referrals.map((referral) => (
                    <tr
                      key={referral.id}
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => onViewDetail(referral)}
                    >
                      <td className="px-6 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(referral.createdAt).toLocaleDateString('en-US', {
                          dateStyle: 'medium',
                        })}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-900">
                        <p className="font-medium">{referral.hospitalName}</p>
                        {referral.hospitalBranch && (
                          <p className="text-xs text-gray-500">{referral.hospitalBranch}</p>
                        )}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600 max-w-xs">
                        <p className="truncate">{referral.reason}</p>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={cn(
                            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                            STATUS_CLASSES[referral.status]
                          )}
                        >
                          {t(`status.${referral.status}`)}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail(referral);
                          }}
                          className="text-sm text-cg-red hover:underline"
                        >
                          {t('view')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="md:hidden divide-y divide-gray-100">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="p-4 hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => onViewDetail(referral)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {referral.hospitalName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{referral.reason}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(referral.createdAt).toLocaleDateString('en-US', {
                          dateStyle: 'medium',
                        })}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium flex-shrink-0',
                        STATUS_CLASSES[referral.status]
                      )}
                    >
                      {t(`status.${referral.status}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
