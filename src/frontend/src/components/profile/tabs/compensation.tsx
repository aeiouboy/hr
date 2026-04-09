'use client';

import { useTranslations } from 'next-intl';
import { CreditCard, Receipt } from 'lucide-react';
import { FieldGroup } from '@/components/ui/field-group';
import { Field } from '@/components/ui/field';
import { StatChip } from '@/components/ui/stat-chip';
import { Card } from '@/components/ui/card';
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
 <div key={i} className="rounded-md border border-hairline bg-surface p-6">
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
 {/* ข้อมูลการจ่ายเงิน */}
 {paymentInfo && (
 <FieldGroup title={t('compensation.paymentInfo')} icon={<CreditCard className="h-5 w-5" />}>
 <Field label={t('compensation.jobCountry')} value={paymentInfo.jobCountry as string} />
 <Field label={t('compensation.paymentMethod')} value={paymentInfo.paymentMethod as string} />
 <Field label={t('compensation.payType')} value={paymentInfo.payType as string} />
 <Field label={t('compensation.bank')} value={paymentInfo.bank as string} />
 <Field label={t('compensation.accountNumber')} value={maskValue(paymentInfo.accountNumber as string)} mono />
 </FieldGroup>
 )}

 {/* เงินเดือน */}
 {payroll && (
 <Card className="overflow-hidden">
 <div className="px-6 py-4 border-l-2 border-accent">
 <h3 className="text-sm font-semibold text-ink">{t('compensation.payroll')}</h3>
 </div>
 <div className="px-6 pb-6">
 <div className="flex items-baseline gap-3">
 <span className="text-3xl font-bold text-ink font-mono tabular-nums">
 {formatCurrency(payroll.grossAmount as number, (payroll.currency as string) ||'THB')}
 </span>
 <StatChip label={t('compensation.payType')} value="Monthly" tone="cobalt" />
 </div>
 </div>
 </Card>
 )}
 </div>
 );
}
