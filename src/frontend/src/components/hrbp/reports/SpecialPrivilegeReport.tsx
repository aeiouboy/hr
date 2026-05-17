'use client';

// STA-27 PR-B' — SpecialPrivilegeReport (HR-RP-04 BRD #138)
// Special privilege records per employee — table view.
// NOTE: partneredDepts scope filter degraded in mockup phase.

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card, DemoValuesDisclaimer } from '@/components/humi';
import { useHrbpScope } from '@/hooks/use-hrbp-scope';
import { getSpecialPrivilegeRecords } from '@/lib/hrbp-reports-mock';
import { csvExport } from '@/lib/manager-reports-mock';

export function SpecialPrivilegeReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const { partneredDepts } = useHrbpScope();
  const [exporting, setExporting] = useState(false);

  const records = useMemo(() => getSpecialPrivilegeRecords(partneredDepts), [partneredDepts]);

  const activeRecords = records.filter((r) => r.isActive);
  const expiringThisQuarter = records.filter((r) => {
    if (!r.isActive) return false;
    const until = new Date(r.validUntil);
    const cutoff = new Date('2026-08-01');
    return until <= cutoff;
  });

  const typeCounts = records.reduce<Record<string, number>>((acc, r) => {
    acc[r.privilegeTypeEn] = (acc[r.privilegeTypeEn] ?? 0) + 1;
    return acc;
  }, {});
  const topTypeEn = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '-';
  const topTypeTh = records.find((r) => r.privilegeTypeEn === topTypeEn)?.privilegeTypeTh ?? '-';

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      csvExport('hrbp-special-privileges-2026.csv', records.map((r) => ({
        privilege_id: r.privilegeId,
        employee_id: r.employeeId,
        name_en: r.nameEn,
        name_th: r.nameTh,
        department: r.dept,
        privilege_type_en: r.privilegeTypeEn,
        reason_en: r.reasonEn,
        valid_until: r.validUntil,
        status: r.isActive ? 'active' : 'expired',
      })));
      setExporting(false);
    }, 300);
  }

  return (
    <div className="flex flex-col gap-6">
      <DemoValuesDisclaimer />

      {/* Stat tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'สิทธิพิเศษที่ยังมีผล' : 'Active Privileges'}
          </span>
          <p className="text-2xl font-semibold text-ink">{activeRecords.length}</p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'หมดอายุในไตรมาสนี้' : 'Expiring this Quarter'}
          </span>
          <p className={`text-2xl font-semibold ${expiringThisQuarter.length > 0 ? 'text-warning' : 'text-ink'}`}>
            {expiringThisQuarter.length}
          </p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'ประเภทยอดนิยม' : 'Top Privilege Type'}
          </span>
          <p className="text-sm font-semibold text-ink leading-snug">
            {isTh ? topTypeTh : topTypeEn}
          </p>
        </Card>
      </div>

      {/* Table header + export */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ink">
          {isTh ? 'รายการสิทธิพิเศษ' : 'Privilege Records'}
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

      {/* Table */}
      <Card className="overflow-hidden p-0">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-hairline bg-canvas-soft">
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'รหัส' : 'ID'}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'พนักงาน' : 'Employee'}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'แผนก' : 'Dept'}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'ประเภทสิทธิ์' : 'Privilege Type'}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'เหตุผล' : 'Reason'}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'หมดอายุ' : 'Valid Until'}</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-ink-muted">{isTh ? 'สถานะ' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.privilegeId} className="border-b border-hairline last:border-b-0 hover:bg-canvas-soft/50">
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">{r.privilegeId}</td>
                <td className="px-4 py-3 font-medium text-ink">{isTh ? r.nameTh : r.nameEn}</td>
                <td className="px-4 py-3 text-xs text-ink-muted">{r.dept}</td>
                <td className="px-4 py-3 text-xs text-ink">{isTh ? r.privilegeTypeTh : r.privilegeTypeEn}</td>
                <td className="px-4 py-3 text-xs text-ink-muted">{isTh ? r.reasonTh : r.reasonEn}</td>
                <td className="px-4 py-3 text-xs text-ink-muted">{r.validUntil}</td>
                <td className="px-4 py-3">
                  {r.isActive ? (
                    <span className="inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                      {isTh ? 'มีผล' : 'Active'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-canvas-muted px-2 py-0.5 text-xs font-medium text-ink-muted">
                      {isTh ? 'หมดอายุ' : 'Expired'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-hairline px-4 py-2 text-xs text-ink-muted">
          {isTh ? `${records.length} รายการ` : `${records.length} records`}
          {' · '}
          {isTh
            ? 'ขอบเขตแผนก: ข้อมูลจำลอง ยังไม่กรองตามแผนกจริง'
            : 'Dept scope: mock data — filter not applied in mockup phase'}
        </div>
      </Card>
    </div>
  );
}
