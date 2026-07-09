'use client';

// STA-28 PR-E — PendingApprovalsReport (M-RP-02)
// Pending workflow approvals filtered to manager's direct reports.
// Table: report name, plan type, days pending, urgency chip.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card } from '@/components/humi';
import { Skeleton } from '@/components/humi/atoms/skeleton';
import { useDirectReports } from '@/hooks/use-direct-reports';
import { getReportPendingClaimsCount, MATRIX_PLAN_IDS } from '@/lib/team-benefits-mock';
import { BENEFIT_PLAN_REGISTRY } from '@/data/benefits/plan-registry';
import { csvExport } from '@/lib/manager-reports-mock';
import { cn } from '@/lib/utils';

// Deterministic plan assignment per employee
function getPlanIdForEmployee(employeeId: string, index: number): string {
  const idx = (employeeId.charCodeAt(employeeId.length - 1) + index) % MATRIX_PLAN_IDS.length;
  return MATRIX_PLAN_IDS[idx];
}

// Deterministic days pending (4–21) per employee + claim index
function getDaysPending(employeeId: string, claimIdx: number): number {
  let h = 5381;
  const key = `${employeeId}:days:${claimIdx}`;
  for (let i = 0; i < key.length; i++) {
    h = ((h << 5) + h) ^ key.charCodeAt(i);
    h = h >>> 0;
  }
  return 4 + (h % 18);
}

function urgencyChipClass(days: number): string {
  if (days >= 14) return 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] font-semibold';
  if (days >= 7) return 'bg-warning/10 text-warning font-semibold';
  return 'bg-accent-soft text-accent';
}

function urgencyLabel(days: number, isTh: boolean): string {
  if (days >= 14) return isTh ? 'เร่งด่วนมาก' : 'Overdue';
  if (days >= 7) return isTh ? 'เร่งด่วน' : 'Urgent';
  return isTh ? 'ปกติ' : 'Normal';
}

export function PendingApprovalsReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const { data: employees, isLoading } = useDirectReports('EMP001');
  const [exporting, setExporting] = useState(false);

  // Build claim rows: only employees with pending count > 0
  const claimRows = employees.flatMap((emp) => {
    const count = getReportPendingClaimsCount(emp.id);
    if (count === 0) return [];
    return Array.from({ length: count }, (_, i) => {
      const planId = getPlanIdForEmployee(emp.id, i);
      const plan = BENEFIT_PLAN_REGISTRY.find((p) => p.id === planId);
      const daysPending = getDaysPending(emp.id, i);
      return {
        employeeId: emp.id,
        nameEn: emp.nameEn,
        nameTh: emp.nameTh,
        planId,
        planNameEn: plan?.nameEn ?? planId,
        planNameTh: plan?.nameTh ?? planId,
        planCategory: plan?.category ?? 'medical',
        daysPending,
      };
    });
  });

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      csvExport(
        'pending-approvals-2026-05.csv',
        claimRows.map((r) => ({
          employee_id: r.employeeId,
          name_en: r.nameEn,
          plan_id: r.planId,
          plan_name: r.planNameEn,
          category: r.planCategory,
          days_pending: r.daysPending,
          urgency: urgencyLabel(r.daysPending, false),
        })),
      );
      setExporting(false);
    }, 300);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas-soft px-4 py-2 text-sm">
          <span className="font-semibold text-ink">{claimRows.length}</span>
          <span className="text-ink-muted">{isTh ? 'รายการรอดำเนินการ' : 'pending items'}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas-soft px-4 py-2 text-sm">
          <span className="font-semibold text-[var(--color-danger)]">
            {claimRows.filter((r) => r.daysPending >= 14).length}
          </span>
          <span className="text-ink-muted">{isTh ? 'เกินกำหนด' : 'overdue'}</span>
        </div>

        <div className="ml-auto">
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
      </div>

      {/* Table */}
      <Card className="overflow-hidden p-0">
        {claimRows.length === 0 ? (
          <div className="py-16 text-center text-sm text-ink-muted">
            {isTh ? 'ไม่มีรายการรออนุมัติ' : 'No pending approvals'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-hairline bg-canvas-soft">
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">
                    {isTh ? 'พนักงาน' : 'Employee'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">
                    {isTh ? 'แผนสวัสดิการ' : 'Benefit Plan'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">
                    {isTh ? 'ประเภท' : 'Category'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-ink-muted">
                    {isTh ? 'วันที่รอ' : 'Days Pending'}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-ink-muted">
                    {isTh ? 'ความเร่งด่วน' : 'Urgency'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {claimRows
                  .sort((a, b) => b.daysPending - a.daysPending)
                  .map((row, i) => (
                    <tr
                      key={`${row.employeeId}-${i}`}
                      className="border-b border-hairline last:border-b-0 hover:bg-canvas-soft/50"
                    >
                      <td className="px-4 py-3">
                        <span className="font-medium text-ink">
                          {isTh ? row.nameTh : row.nameEn}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-ink">
                        {isTh ? row.planNameTh : row.planNameEn}
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-muted capitalize">
                        {row.planCategory}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-ink">
                        {row.daysPending}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={cn(
                            'inline-block rounded-full px-2.5 py-0.5 text-xs',
                            urgencyChipClass(row.daysPending),
                          )}
                        >
                          {urgencyLabel(row.daysPending, isTh)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
