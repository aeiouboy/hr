'use client';

import { useTranslations } from 'next-intl';
import { PayrollSetup } from '@/components/payroll/payroll-setup';

export default function PayrollSetupPage() {
 const t = useTranslations();

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('payrollSetup.title')}</h1>
 <p className="text-ink-muted mt-1">{t('payrollSetup.description')}</p>
 </div>
 <PayrollSetup />
 </>
 );
}
