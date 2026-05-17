'use client';

// STA-27 PR-B — /hrbp/benefits/exceptions route
// Client wrapper: breadcrumb + bilingual header + renders <ExceptionsQueue>

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ExceptionsQueue } from '@/components/hrbp/ExceptionsQueue';

export default function HRBPBenefitsExceptionsPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-xs text-ink-muted">
        <Link href={`/${locale}/hrbp/dashboard`} className="hover:text-ink hover:underline">
          {isTh ? 'หน้าหลัก' : 'Home'}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="hover:text-ink">
          {isTh ? 'สวัสดิการ HRBP' : 'HRBP Benefits'}
        </span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink">{isTh ? 'ข้อยกเว้น' : 'Exceptions'}</span>
      </nav>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">
          {isTh ? 'คิวข้อยกเว้นสวัสดิการ' : 'Benefit Exceptions Queue'}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {isTh
            ? 'ตรวจสอบและอนุมัติข้อยกเว้นสวัสดิการที่ต้องการการพิจารณาของ HRBP'
            : 'Review and approve benefit exceptions requiring HRBP decision'}
        </p>
      </div>

      <ExceptionsQueue isTh={isTh} />
    </div>
  );
}
