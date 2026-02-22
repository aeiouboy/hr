'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { PayrollProcessing } from '@/components/payroll/payroll-processing';

export default function PayrollProcessingPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-cg-light">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-cg-dark">{t('payrollProcessing.title')}</h1>
            <p className="text-gray-500 mt-1">{t('payrollProcessing.description')}</p>
          </div>
          <PayrollProcessing />
        </main>
      </div>
    </div>
  );
}
