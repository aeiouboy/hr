'use client';

// STA-28 PR-E — TeamSpendReport (M-RP-01)
// Total team spend per period. Mock data: 3 months × per-employee.
// Export CSV button triggers Blob download.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card, DemoValuesDisclaimer } from '@/components/humi';
import { useDirectReports } from '@/hooks/use-direct-reports';
import { Skeleton } from '@/components/humi/atoms/skeleton';
import { getMonthlySpendByReport, csvExport } from '@/lib/manager-reports-mock';

const MONTHS = [
  { offsetEn: 'Mar 2026', offsetTh: 'มี.ค. 2569', offset: -2 },
  { offsetEn: 'Apr 2026', offsetTh: 'เม.ย. 2569', offset: -1 },
  { offsetEn: 'May 2026', offsetTh: 'พ.ค. 2569', offset: 0 },
];

export function TeamSpendReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const { data: employees, isLoading } = useDirectReports('EMP001');
  const [exporting, setExporting] = useState(false);

  const spendByMonth = MONTHS.map((m) => ({
    ...m,
    rows: getMonthlySpendByReport(employees.map((e) => e.id), m.offset),
  }));

  const teamTotalThb = spendByMonth[2].rows.reduce((s, r) => s + r.totalThb, 0);

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      const currentRows = spendByMonth[2].rows.map((r) => {
        const emp = employees.find((e) => e.id === r.employeeId);
        return {
          employee_id: r.employeeId,
          name_en: emp?.nameEn ?? '',
          name_th: emp?.nameTh ?? '',
          month: 'May 2026',
          total_thb: r.totalThb,
        };
      });
      csvExport('team-spend-2026-05.csv', currentRows);
      setExporting(false);
    }, 300);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DemoValuesDisclaimer />

      {/* Summary tile */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="col-span-1 flex flex-col gap-1 p-5 sm:col-span-1">
          <span className="text-xs text-ink-muted">
            {isTh ? 'ยอดรวมทีม (พ.ค. 2569)' : 'Team Total (May 2026)'}
          </span>
          <p className="text-2xl font-semibold text-ink">
            ฿{teamTotalThb.toLocaleString(isTh ? 'th-TH' : 'en-US')}
          </p>
          <span className="text-xs text-ink-muted">
            {isTh ? `${employees.length} คน` : `${employees.length} reports`}
          </span>
        </Card>

        {MONTHS.slice(0, 2).map((m, i) => {
          const rows = spendByMonth[i].rows;
          const total = rows.reduce((s, r) => s + r.totalThb, 0);
          return (
            <Card key={m.offset} className="flex flex-col gap-1 p-5">
              <span className="text-xs text-ink-muted">
                {isTh ? m.offsetTh : m.offsetEn}
              </span>
              <p className="text-xl font-semibold text-ink-muted">
                ฿{total.toLocaleString(isTh ? 'th-TH' : 'en-US')}
              </p>
            </Card>
          );
        })}
      </div>

      {/* Table header + export */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ink">
          {isTh ? 'รายละเอียดรายบุคคล — พ.ค. 2569' : 'Per-Employee Detail — May 2026'}
        </h3>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 py-1.5 text-xs text-ink hover:bg-canvas-soft disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" />
          {exporting
            ? isTh ? 'กำลังส่งออก…' : 'Exporting…'
            : isTh ? 'ส่งออก CSV' : 'Export CSV'}
        </button>
      </div>

      {/* Per-employee table */}
      <Card className="overflow-hidden p-0">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-hairline bg-canvas-soft">
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">
                {isTh ? 'พนักงาน' : 'Employee'}
              </th>
              {MONTHS.map((m) => (
                <th key={m.offset} className="px-4 py-3 text-right text-xs font-medium text-ink-muted">
                  {isTh ? m.offsetTh : m.offsetEn}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-hairline last:border-b-0 hover:bg-canvas-soft/50">
                <td className="px-4 py-3">
                  <span className="font-medium text-ink">{isTh ? emp.nameTh : emp.nameEn}</span>
                  <span className="ml-2 text-xs text-ink-muted">{emp.position}</span>
                </td>
                {MONTHS.map((m, mi) => {
                  const row = spendByMonth[mi].rows.find((r) => r.employeeId === emp.id);
                  const amt = row?.totalThb ?? 0;
                  return (
                    <td key={m.offset} className="px-4 py-3 text-right tabular-nums text-ink">
                      ฿{amt.toLocaleString(isTh ? 'th-TH' : 'en-US')}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-hairline bg-canvas-soft font-semibold">
              <td className="px-4 py-3 text-xs text-ink-muted">
                {isTh ? 'รวม' : 'Total'}
              </td>
              {MONTHS.map((m, mi) => {
                const total = spendByMonth[mi].rows.reduce((s, r) => s + r.totalThb, 0);
                return (
                  <td key={m.offset} className="px-4 py-3 text-right tabular-nums text-ink">
                    ฿{total.toLocaleString(isTh ? 'th-TH' : 'en-US')}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        </table>
      </Card>
    </div>
  );
}
