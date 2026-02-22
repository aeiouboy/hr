'use client';

import { useTranslations } from 'next-intl';
import { CreditCard, Receipt } from 'lucide-react';
import { SectionCard } from '../section-card';
import { DataGrid } from '../data-grid';
import { maskValue, formatCurrency } from '@/lib/date';
import { Skeleton } from '@/components/ui/skeleton';

interface CompensationTabProps {
  employee: Record<string, unknown> | null;
  loading?: boolean;
}

export function CompensationTab({ employee, loading }: CompensationTabProps) {
  const t = useTranslations();

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j}><Skeleton className="h-3 w-20 mb-2" /><Skeleton className="h-5 w-32" /></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!employee) return null;

  const comp = employee.compensation as Record<string, Record<string, unknown>>;
  const paymentInfo = comp?.paymentInfo;
  const payroll = comp?.payroll;

  return (
    <div className="space-y-6">
      {/* Payment Information */}
      {paymentInfo && (
        <SectionCard title={t('compensation.paymentInfo')} icon={<CreditCard className="h-5 w-5" />}>
          <DataGrid
            items={[
              { label: t('compensation.jobCountry'), value: paymentInfo.jobCountry as string },
              { label: t('compensation.paymentMethod'), value: paymentInfo.paymentMethod as string },
              { label: t('compensation.payType'), value: paymentInfo.payType as string },
              { label: t('compensation.bank'), value: paymentInfo.bank as string },
              { label: t('compensation.accountNumber'), value: maskValue(paymentInfo.accountNumber as string) },
            ]}
          />
        </SectionCard>
      )}

      {/* Payroll Summary */}
      {payroll && (
        <SectionCard title={t('compensation.payroll')} icon={<Receipt className="h-5 w-5" />}>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-400 uppercase tracking-wider">{t('compensation.grossAmount')}</p>
            <p className="text-2xl font-bold text-cg-dark mt-1">
              {formatCurrency(payroll.grossAmount as number, (payroll.currency as string) || 'THB')}
            </p>
            <p className="text-xs text-gray-400 mt-1">{t('compensation.payType')}: Monthly</p>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
