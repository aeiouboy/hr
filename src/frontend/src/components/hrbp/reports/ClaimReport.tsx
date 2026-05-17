'use client';

// STA-27 PR-B' — ClaimReport (HR-RP-01 BE_26 r1)
// Cross-employee Benefit Claim report scoped to HRBP partneredDepts.
// NOTE: scope filter degraded in mockup phase — see sta-27-quick-approve-predicate-audit.md

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card, DemoValuesDisclaimer } from '@/components/humi';
import { useHrbpScope } from '@/hooks/use-hrbp-scope';
import { getClaimReportData } from '@/lib/hrbp-reports-mock';
import { csvExport } from '@/lib/manager-reports-mock';

type FilterPlan = 'all' | 'medical' | 'dental' | 'optical';

const STATUS_LABEL: Record<string, { en: string; th: string; cls: string }> = {
  approved: { en: 'Approved', th: 'อนุมัติ', cls: 'bg-accent-soft text-accent' },
  pending: { en: 'Pending', th: 'รออนุมัติ', cls: 'bg-warning/20 text-warning' },
  rejected: { en: 'Rejected', th: 'ปฏิเสธ', cls: 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]' },
};

export function ClaimReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const { partneredDepts } = useHrbpScope();

  const [filterPlan, setFilterPlan] = useState<FilterPlan>('all');
  const [exporting, setExporting] = useState(false);

  const allClaims = useMemo(() => getClaimReportData(partneredDepts), [partneredDepts]);

  const filtered = useMemo(() => {
    if (filterPlan === 'all') return allClaims;
    return allClaims.filter((c) => c.planCode.toLowerCase().includes(filterPlan));
  }, [allClaims, filterPlan]);

  const totalYtd = allClaims.reduce((s, c) => s + c.amountThb, 0);
  const approvedClaims = allClaims.filter((c) => c.status === 'approved');
  const totalApproved = approvedClaims.reduce((s, c) => s + c.amountThb, 0);
  const avgPerClaim = allClaims.length > 0 ? Math.round(totalYtd / allClaims.length) : 0;

  const planCounts = allClaims.reduce<Record<string, number>>((acc, c) => {
    acc[c.planNameEn] = (acc[c.planNameEn] ?? 0) + 1;
    return acc;
  }, {});
  const topPlanEn = Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '-';
  const topPlanTh = allClaims.find((c) => c.planNameEn === topPlanEn)?.planNameTh ?? '-';

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      csvExport('hrbp-claims-2026.csv', filtered.map((c) => ({
        claim_id: c.claimId,
        employee_id: c.employeeId,
        name_en: c.nameEn,
        name_th: c.nameTh,
        department: c.dept,
        plan_code: c.planCode,
        plan_en: c.planNameEn,
        amount_thb: c.amountThb,
        status: c.status,
        date: c.date,
      })));
      setExporting(false);
    }, 300);
  }

  return (
    <div className="flex flex-col gap-6">
      <DemoValuesDisclaimer />

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">{isTh ? 'เคลมรวม YTD' : 'Total Claims YTD'}</span>
          <p className="text-2xl font-semibold text-ink">{allClaims.length.toLocaleString()}</p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">{isTh ? 'มูลค่ารวม YTD' : 'Total Amount YTD'}</span>
          <p className="text-2xl font-semibold text-ink">
            ฿{totalApproved.toLocaleString(isTh ? 'th-TH' : 'en-US')}
          </p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">{isTh ? 'แผนยอดนิยม' : 'Top Plan'}</span>
          <p className="text-lg font-semibold text-ink truncate">{isTh ? topPlanTh : topPlanEn}</p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">{isTh ? 'เฉลี่ยต่อเคลม' : 'Avg per Claim'}</span>
          <p className="text-2xl font-semibold text-ink">
            ฿{avgPerClaim.toLocaleString(isTh ? 'th-TH' : 'en-US')}
          </p>
        </Card>
      </div>

      {/* Filters + export */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-muted">{isTh ? 'ประเภทแผน:' : 'Plan type:'}</span>
          {(['all', 'medical', 'dental', 'optical'] as FilterPlan[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilterPlan(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filterPlan === f
                  ? 'bg-accent text-on-accent'
                  : 'bg-canvas-soft text-ink-muted hover:bg-canvas-muted hover:text-ink'
              }`}
            >
              {f === 'all'
                ? isTh ? 'ทั้งหมด' : 'All'
                : f === 'medical'
                  ? isTh ? 'รักษาพยาบาล' : 'Medical'
                  : f === 'dental'
                    ? isTh ? 'ทำฟัน' : 'Dental'
                    : isTh ? 'แว่นตา' : 'Optical'}
            </button>
          ))}
        </div>
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

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <div className="max-h-[480px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-hairline bg-canvas-soft">
                <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'รหัสเคลม' : 'Claim ID'}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'พนักงาน' : 'Employee'}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'แผนก' : 'Dept'}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'แผนสวัสดิการ' : 'Plan'}</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-ink-muted">{isTh ? 'จำนวน (฿)' : 'Amount (฿)'}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'สถานะ' : 'Status'}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'วันที่' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const st = STATUS_LABEL[c.status] ?? STATUS_LABEL['pending'];
                return (
                  <tr key={c.claimId} className="border-b border-hairline last:border-b-0 hover:bg-canvas-soft/50">
                    <td className="px-4 py-3 font-mono text-xs text-ink-muted">{c.claimId}</td>
                    <td className="px-4 py-3 font-medium text-ink">{isTh ? c.nameTh : c.nameEn}</td>
                    <td className="px-4 py-3 text-xs text-ink-muted">{c.dept}</td>
                    <td className="px-4 py-3 text-xs text-ink">{isTh ? c.planNameTh : c.planNameEn}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-ink">
                      ฿{c.amountThb.toLocaleString(isTh ? 'th-TH' : 'en-US')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${st.cls}`}>
                        {isTh ? st.th : st.en}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-ink-muted">{c.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-hairline px-4 py-2 text-xs text-ink-muted">
          {isTh ? `แสดง ${filtered.length} รายการ` : `Showing ${filtered.length} records`}
          {' · '}
          {isTh
            ? 'ขอบเขตแผนก: ข้อมูลจำลอง ยังไม่กรองตามแผนกจริง'
            : 'Dept scope: mock data — filter not applied in mockup phase'}
        </div>
      </Card>
    </div>
  );
}
