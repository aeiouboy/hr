'use client';

// STA-27 PR-B' — /hrbp/benefits/reports
// 4-tab HRBP benefits reports: Claim, Cost Analysis, Enrollment, Special Privilege.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClaimReport } from '@/components/hrbp/reports/ClaimReport';
import { CostAnalysisReport } from '@/components/hrbp/reports/CostAnalysisReport';
import { EnrollmentReport } from '@/components/hrbp/reports/EnrollmentReport';
import { SpecialPrivilegeReport } from '@/components/hrbp/reports/SpecialPrivilegeReport';

type ReportTab = 'claims' | 'cost' | 'enrollment' | 'privilege';

const TABS: { id: ReportTab; labelEn: string; labelTh: string }[] = [
  { id: 'claims', labelEn: 'Claim Report', labelTh: 'รายงานเคลม' },
  { id: 'cost', labelEn: 'Cost Analysis', labelTh: 'วิเคราะห์ค่าใช้จ่าย' },
  { id: 'enrollment', labelEn: 'Enrollment Stats', labelTh: 'สถิติลงทะเบียน' },
  { id: 'privilege', labelEn: 'Special Privileges', labelTh: 'สิทธิพิเศษ' },
];

export default function HRBPBenefitsReportsPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const [activeTab, setActiveTab] = useState<ReportTab>('claims');

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
        <span className="text-ink">{isTh ? 'รายงาน' : 'Reports'}</span>
      </nav>

      {/* Page header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-ink">
          {isTh ? 'รายงานสวัสดิการ HRBP' : 'HRBP Benefits Reports'}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {isTh
            ? 'ภาพรวมเคลม ค่าใช้จ่าย การลงทะเบียน และสิทธิพิเศษในแผนกที่ดูแล'
            : 'Claims, costs, enrollment, and special privileges for partnered departments'}
        </p>
        {/* Mockup-limitation note */}
        <p className="mt-2 rounded-lg border border-hairline bg-canvas-soft px-3 py-2 text-xs text-ink-muted">
          {isTh
            ? 'หมายเหตุ UI Mockup: ข้อมูลในหน้านี้เป็นข้อมูลจำลอง การกรองตามแผนก (Finance, HR, IT) ยังไม่ได้ใช้งานในรอบ Mockup — จะเชื่อมต่อจริงในเฟสถัดไป'
            : 'UI Mockup note: all data here is illustrative. Dept scope filter (Finance, HR, IT) is not applied in this mockup phase — real filtering wired in the next phase.'}
        </p>
      </div>

      {/* Tab nav */}
      <div className="mb-6 border-b border-hairline">
        <nav className="-mb-px flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-ink-muted hover:border-hairline hover:text-ink',
              )}
            >
              {isTh ? tab.labelTh : tab.labelEn}
            </button>
          ))}
        </nav>
      </div>

      {/* Active report */}
      <div>
        {activeTab === 'claims' && <ClaimReport />}
        {activeTab === 'cost' && <CostAnalysisReport />}
        {activeTab === 'enrollment' && <EnrollmentReport />}
        {activeTab === 'privilege' && <SpecialPrivilegeReport />}
      </div>
    </div>
  );
}
