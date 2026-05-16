'use client';

// STA-28 PR-D — /manager/benefits/team — Team Benefits Overview Matrix
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { TeamBenefitsMatrix } from '@/components/manager/team-benefits-matrix';

export default function ManagerBenefitsTeamPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1 text-xs text-ink-muted">
        <Link href={`/${locale}/manager`} className="hover:text-ink hover:underline">
          {isTh ? 'แดชบอร์ดผู้จัดการ' : 'Manager Dashboard'}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/${locale}/manager/benefits`} className="hover:text-ink hover:underline">
          {isTh ? 'สวัสดิการ' : 'Benefits'}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink">{isTh ? 'สวัสดิการทีม' : 'Team Benefits'}</span>
      </nav>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">
          {isTh ? 'สวัสดิการทีม' : 'Team Benefits'}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {isTh
            ? 'ภาพรวมการใช้งานสวัสดิการของทีม — คลิกชื่อพนักงานเพื่อดูรายละเอียด'
            : 'Team benefit entitlement usage — click an employee to view their profile'}
        </p>
      </div>

      {/* Main matrix */}
      <TeamBenefitsMatrix />
    </div>
  );
}
