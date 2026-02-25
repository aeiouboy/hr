'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Sun, Stethoscope, User, Baby, Users, Sparkles, Shield, FileText } from 'lucide-react';
import type { LeaveBalance as LeaveBalanceType, LeaveType } from '@/hooks/use-leave';

const LEAVE_TYPE_COLORS: Record<LeaveType, { bg: string; text: string; bar: string; icon: ReactNode }> = {
  annual: { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500', icon: <Sun className="h-5 w-5" /> },
  sick: { bg: 'bg-orange-50', text: 'text-orange-600', bar: 'bg-orange-500', icon: <Stethoscope className="h-5 w-5" /> },
  personal: { bg: 'bg-purple-50', text: 'text-purple-600', bar: 'bg-purple-500', icon: <User className="h-5 w-5" /> },
  maternity: { bg: 'bg-pink-50', text: 'text-pink-600', bar: 'bg-pink-500', icon: <Baby className="h-5 w-5" /> },
  paternity: { bg: 'bg-teal-50', text: 'text-teal-600', bar: 'bg-teal-500', icon: <Users className="h-5 w-5" /> },
  ordination: { bg: 'bg-amber-50', text: 'text-amber-600', bar: 'bg-amber-500', icon: <Sparkles className="h-5 w-5" /> },
  military: { bg: 'bg-gray-50', text: 'text-gray-600', bar: 'bg-gray-500', icon: <Shield className="h-5 w-5" /> },
  unpaid: { bg: 'bg-red-50', text: 'text-red-600', bar: 'bg-red-400', icon: <FileText className="h-5 w-5" /> },
};

interface LeaveBalanceProps {
  balances: LeaveBalanceType[];
  loading?: boolean;
  onRequestLeave?: (type: LeaveType) => void;
}

export function LeaveBalanceDisplay({ balances, loading, onRequestLeave }: LeaveBalanceProps) {
  const t = useTranslations('leave');

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-xl" />
        ))}
      </div>
    );
  }

  if (balances.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">{t('noBalanceData')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {balances.map((balance) => (
        <LeaveBalanceCard key={balance.type} balance={balance} onRequest={onRequestLeave} />
      ))}
    </div>
  );
}

function LeaveBalanceCard({
  balance,
  onRequest,
}: {
  balance: LeaveBalanceType;
  onRequest?: (type: LeaveType) => void;
}) {
  const t = useTranslations('leave');
  const colors = LEAVE_TYPE_COLORS[balance.type] || LEAVE_TYPE_COLORS.annual;
  const percentage = balance.entitled > 0 ? (balance.remaining / balance.entitled) * 100 : 0;

  let barColor = 'bg-green-500';
  if (percentage <= 25) barColor = 'bg-red-500';
  else if (percentage <= 50) barColor = 'bg-yellow-500';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center text-lg', colors.bg)}>
            {colors.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-gray-900 text-sm truncate">{balance.nameEn}</h3>
            <p className="text-xs text-gray-500">{balance.nameTh}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="hidden sm:block mb-3">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-300', barColor)}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-1 text-center text-xs mb-3">
          <div>
            <p className="text-gray-400">{t('entitled')}</p>
            <p className="font-semibold text-gray-900">{balance.entitled}</p>
          </div>
          <div>
            <p className="text-gray-400">{t('used')}</p>
            <p className="font-semibold text-gray-900">{balance.used}</p>
          </div>
          <div>
            <p className="text-gray-400">{t('pending')}</p>
            <p className="font-semibold text-yellow-600">{balance.pending}</p>
          </div>
          <div>
            <p className="text-gray-400">{t('remaining')}</p>
            <p className={cn('font-semibold', colors.text)}>{balance.remaining}</p>
          </div>
        </div>

        {onRequest && (
          <button
            onClick={() => onRequest(balance.type)}
            disabled={balance.remaining <= 0 && balance.type !== 'unpaid'}
            className={cn(
              'w-full py-2 text-xs font-medium rounded-lg transition',
              balance.remaining <= 0 && balance.type !== 'unpaid'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : cn(colors.bg, colors.text, 'hover:opacity-80')
            )}
          >
            {t('request')}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

export { LEAVE_TYPE_COLORS };
