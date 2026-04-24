'use client';

import { useTranslations } from 'next-intl';
import { GovernmentReports } from '@/components/payroll/government-reports';

export default function GovernmentReportsPage() {
 const t = useTranslations();

 return (
 <>
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('govReports.title')}</h1>
 <p className="text-ink-muted mt-1">{t('govReports.description')}</p>
 </div>
 <GovernmentReports />
 </>
 );
}
