'use client';

// STA-28 PR-D — TeamSummaryTiles
// 4 summary tiles at the top of the Team Benefits matrix page.

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { Users, Clock, AlertTriangle, Banknote } from 'lucide-react';
import { Card } from '@/components/humi';
import type { Employee } from '@/hooks/use-direct-reports';
import {
  getReportPendingClaimsCount,
  getReportEnrolled,
  getReportMonthlyClaimThb,
  ANNUAL_ENROL_PLAN_IDS,
} from '@/lib/team-benefits-mock';

interface TeamSummaryTilesProps {
  employees: Employee[];
}

interface TileData {
  icon: React.ReactNode;
  valueTh: string;
  valueEn: string;
  labelTh: string;
  labelEn: string;
  href?: string;
  highlight?: boolean;
}

export function TeamSummaryTiles({ employees }: TeamSummaryTilesProps) {
  const locale = useLocale();
  const isTh = locale !== 'en';

  // Tile 1: Total direct reports
  const reportCount = employees.length;

  // Tile 2: Total pending claims across all reports
  const totalPending = employees.reduce(
    (sum, emp) => sum + getReportPendingClaimsCount(emp.id),
    0,
  );

  // Tile 3: Reports with at least one Gas/Toll/Parking plan not enrolled (risk)
  const unenrolledRiskCount = employees.filter((emp) =>
    ANNUAL_ENROL_PLAN_IDS.some((planId) => !getReportEnrolled(emp.id, planId)),
  ).length;

  // Tile 4: Total monthly claim THB sum
  const monthlyClaimThb = employees.reduce(
    (sum, emp) => sum + getReportMonthlyClaimThb(emp.id),
    0,
  );

  const tiles: TileData[] = [
    {
      icon: <Users className="h-5 w-5 text-accent" />,
      valueTh: `${reportCount} คน`,
      valueEn: `${reportCount} reports`,
      labelTh: 'ทีมของฉัน',
      labelEn: 'My Team',
    },
    {
      icon: <Clock className="h-5 w-5 text-warning" />,
      valueTh: `${totalPending} รายการ`,
      valueEn: `${totalPending} items`,
      labelTh: 'กำลังรอการอนุมัติ',
      labelEn: 'Pending Approval',
      href: '/quick-approve',
      highlight: totalPending > 0,
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-danger" />,
      valueTh: `${unenrolledRiskCount} คน`,
      valueEn: `${unenrolledRiskCount} reports`,
      labelTh: 'ไม่ได้ลงทะเบียน Gas/Toll/Parking',
      labelEn: 'Not Enrolled Gas/Toll/Parking',
      highlight: unenrolledRiskCount > 0,
    },
    {
      icon: <Banknote className="h-5 w-5 text-ink-muted" />,
      valueTh: `฿${monthlyClaimThb.toLocaleString('th-TH')}`,
      valueEn: `฿${monthlyClaimThb.toLocaleString('en-US')}`,
      labelTh: 'ใช้สวัสดิการเดือนนี้',
      labelEn: 'Claims This Month',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {tiles.map((tile, i) => {
        const inner = (
          <Card
            key={i}
            className={[
              'flex flex-col gap-2 p-4',
              tile.highlight ? 'border-l-4 border-l-[var(--color-warning)]' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="flex items-center gap-2">
              {tile.icon}
              <span className="text-xs text-ink-muted">
                {isTh ? tile.labelTh : tile.labelEn}
              </span>
            </div>
            <p className="text-xl font-semibold text-ink">
              {isTh ? tile.valueTh : tile.valueEn}
            </p>
          </Card>
        );

        if (tile.href) {
          return (
            <Link key={i} href={tile.href} className="block hover:opacity-90 transition-opacity">
              {inner}
            </Link>
          );
        }
        return <div key={i}>{inner}</div>;
      })}
    </div>
  );
}
