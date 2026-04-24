'use client';

import { useTranslations } from 'next-intl';
import { PayrollProcessing } from '@/components/payroll/payroll-processing';

export default function PayrollProcessingPage() {
 const t = useTranslations();

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('payrollProcessing.title')}</h1>
 <p className="text-ink-muted mt-1">{t('payrollProcessing.description')}</p>
 </div>
 <PayrollProcessing />
 </>
 );
}
