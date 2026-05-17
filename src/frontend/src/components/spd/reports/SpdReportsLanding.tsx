'use client';

// STA-27 PR-D — SPD Benefits Reports landing and branch-scoped detail panel.
// UI mockup only: static deterministic data, no backend/API/RBAC wiring.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronRight, Download } from 'lucide-react';
import { Button, Card, CardEyebrow, CardTitle } from '@/components/humi';
import { useSpdBranches } from '@/hooks/use-spd-branches';
import { csvExport } from '@/lib/manager-reports-mock';
import { cn } from '@/lib/utils';
import { SPD_REPORTS, getBranchReportRows } from './__report_helpers__';

type ReportId = (typeof SPD_REPORTS)[number]['id'];

const DETAIL_LABELS: Record<ReportId, { metric: 'movement' | 'cost' | 'privilege'; file: string }> =
  {
    movement: { metric: 'movement', file: 'spd-branch-enrollment-movement-2026-05.csv' },
    cost: { metric: 'cost', file: 'spd-branch-cost-snapshot-2026-05.csv' },
    privilege: { metric: 'privilege', file: 'spd-branch-special-privilege-audit-2026-05.csv' },
  };

function pctBarClass(pct: number): string {
  if (pct >= 80) return 'bg-accent';
  if (pct >= 60) return 'bg-warning';
  return 'bg-[var(--color-danger)]/70';
}

export function SpdReportsLanding() {
  const locale = useLocale();
  const t = useTranslations('spdReports');
  const { assignedBranches } = useSpdBranches();
  const [activeReport, setActiveReport] = useState<ReportId>('movement');
  const [exporting, setExporting] = useState(false);

  const rows = useMemo(() => getBranchReportRows(assignedBranches), [assignedBranches]);
  const totals = useMemo(
    () => ({
      branches: rows.length,
      employees: rows.reduce((sum, row) => sum + row.employees, 0),
      enrolled: rows.reduce((sum, row) => sum + row.enrolled, 0),
      privilegeAudits: rows.reduce((sum, row) => sum + row.privilegeAudits, 0),
    }),
    [rows],
  );
  const activeMeta = SPD_REPORTS.find((report) => report.id === activeReport) ?? SPD_REPORTS[0];
  const detail = DETAIL_LABELS[activeReport];

  function handleExport() {
    setExporting(true);
    window.setTimeout(() => {
      csvExport(
        detail.file,
        rows.map((row) => ({
          report_code: activeMeta.code,
          branch_code: row.branchCode,
          employees: row.employees,
          enrollment_pct: row.enrollmentPct,
          added: row.added,
          removed: row.removed,
          cost_thb: row.costThb,
          privilege_audit_items: row.privilegeAudits,
        })),
      );
      setExporting(false);
    }, 250);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-1 text-xs text-ink-muted">
        <Link href={`/${locale}/spd-management`} className="hover:text-ink hover:underline">
          {t('chrome.home')}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span>{t('chrome.benefits')}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-ink">{t('chrome.reports')}</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">{t('title')}</h1>
        <p className="mt-1 text-sm text-ink-muted">{t('subtitle')}</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SPD_REPORTS.map((report) => (
            <Card
              key={report.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveReport(report.id)}
              className={cn(
                'cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-canvas',
                activeReport === report.id && 'ring-2 ring-accent-soft',
              )}
            >
              <CardEyebrow>{report.code}</CardEyebrow>
              <CardTitle className="mt-2">{t(report.titleKey)}</CardTitle>
              <p className="mt-2 text-sm text-ink-muted">{t(report.descKey)}</p>
              <p className="mt-4 text-xs font-medium text-accent">{t('openDetail')}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {(
            [
              ['tiles.branches', totals.branches],
              ['tiles.employees', totals.employees],
              ['tiles.enrollments', totals.enrolled],
              ['tiles.auditItems', totals.privilegeAudits],
            ] as const
          ).map(([labelKey, value]) => (
            <Card key={labelKey} variant="flat" className="flex flex-col gap-1">
              <span className="text-xs text-ink-muted">{t(labelKey)}</span>
              <span className="text-2xl font-semibold text-ink">{value}</span>
            </Card>
          ))}
        </div>

        <Card
          header={
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardEyebrow>{activeMeta.code}</CardEyebrow>
                <CardTitle>{t(activeMeta.titleKey)}</CardTitle>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExport}
                disabled={exporting}
                leadingIcon={<Download className="h-4 w-4" />}
              >
                {exporting ? t('exporting') : t('exportCsv')}
              </Button>
            </div>
          }
          flush
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-canvas-soft">
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">
                    {t('table.branch')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-ink-muted">
                    {t('table.employees')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-ink-muted">
                    {t('table.enrollment')}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-ink-muted">
                    {t(`table.${detail.metric}`)}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const metricValue =
                    detail.metric === 'cost'
                      ? `฿${row.costThb.toLocaleString(locale)}`
                      : detail.metric === 'privilege'
                        ? row.privilegeAudits
                        : `+${row.added} / -${row.removed}`;
                  return (
                    <tr
                      key={row.branchCode}
                      className="border-b border-hairline last:border-b-0 hover:bg-canvas-soft/50"
                    >
                      <td className="px-4 py-3 font-medium text-ink">{row.branchCode}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-ink">
                        {row.employees}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-canvas-soft">
                            <div
                              className={cn('h-full rounded-full', pctBarClass(row.enrollmentPct))}
                              style={{ width: `${row.enrollmentPct}%` }}
                            />
                          </div>
                          <span className="w-10 tabular-nums text-ink">{row.enrollmentPct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-ink">{metricValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
