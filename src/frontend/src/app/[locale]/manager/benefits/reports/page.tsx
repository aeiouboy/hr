'use client';

// STA-28 PR-E — /manager/benefits/reports
// 4-tab manager benefits reports: Team Spend, Pending Approvals, Approval Throughput, Utilization.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TeamSpendReport } from '@/components/manager/reports/TeamSpendReport';
import { PendingApprovalsReport } from '@/components/manager/reports/PendingApprovalsReport';
import { ApprovalThroughputReport } from '@/components/manager/reports/ApprovalThroughputReport';
import { UtilizationReport } from '@/components/manager/reports/UtilizationReport';

type ReportTab = 'pending' | 'throughput' | 'utilization' | 'spend';

const TABS: { id: ReportTab; labelEn: string; labelTh: string }[] = [
  { id: 'pending', labelEn: 'Pending Approvals', labelTh: 'รออนุมัติ' },
  { id: 'throughput', labelEn: 'Approval Throughput', labelTh: 'ประสิทธิภาพการอนุมัติ' },
  { id: 'utilization', labelEn: 'Utilization', labelTh: 'การใช้งาน' },
  { id: 'spend', labelEn: 'Team Spend', labelTh: 'ค่าใช้จ่ายทีม' },
];

export default function ManagerBenefitsReportsPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const [activeTab, setActiveTab] = useState<ReportTab>('pending');

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
        <span className="text-ink">{isTh ? 'รายงาน' : 'Reports'}</span>
      </nav>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">
          {isTh ? 'รายงานสวัสดิการ' : 'Benefits Reports'}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          {isTh
            ? 'ภาพรวมการใช้สวัสดิการ ประสิทธิภาพการอนุมัติ และค่าใช้จ่ายของทีม'
            : 'Team benefit usage, approval performance, and spend analytics'}
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
        {activeTab === 'pending' && <PendingApprovalsReport />}
        {activeTab === 'throughput' && <ApprovalThroughputReport />}
        {activeTab === 'utilization' && <UtilizationReport />}
        {activeTab === 'spend' && <TeamSpendReport />}
      </div>
    </div>
  );
}
