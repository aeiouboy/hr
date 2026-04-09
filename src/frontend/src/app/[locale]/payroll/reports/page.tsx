'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { GovernmentReports } from '@/components/payroll/government-reports';

export default function GovernmentReportsPage() {
 const t = useTranslations();

 return (
 <div className="min-h-screen bg-canvas">
 <Header />
 <MobileMenu />
 <div className="flex">
 <Sidebar />
 <main className="flex-1 p-4 sm:p-6">
 <div className="mb-6">
 <h1 className="text-2xl font-bold text-ink">{t('govReports.title')}</h1>
 <p className="text-ink-muted mt-1">{t('govReports.description')}</p>
 </div>
 <GovernmentReports />
 </main>
 </div>
 </div>
 );
}
