'use client';

// STA-27 PR-B' — CostAnalysisReport (HR-RP-02 BE_26 r2)
// 3-month historical + 3-month predictive cost bars. CSS only, no chart libs.

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card, DemoValuesDisclaimer } from '@/components/humi';
import { getCostAnalysisData } from '@/lib/hrbp-reports-mock';
import { csvExport } from '@/lib/manager-reports-mock';

export function CostAnalysisReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const [exporting, setExporting] = useState(false);

  const { historical, predictive } = useMemo(() => getCostAnalysisData(), []);
  const allMonths = [...historical, ...predictive];

  const maxAmount = Math.max(...allMonths.map((m) => m.amountThb));

  const historicalTotal = historical.reduce((s, m) => s + m.amountThb, 0);
  const predictiveTotal = predictive.reduce((s, m) => s + m.amountThb, 0);
  const yoyChangePct = historicalTotal > 0
    ? Math.round(((predictiveTotal - historicalTotal) / historicalTotal) * 100)
    : 0;

  const lastHistorical = historical[historical.length - 1]?.amountThb ?? 0;
  const projectedQ = predictive.reduce((s, m) => s + m.amountThb, 0);

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      csvExport('hrbp-cost-analysis-2026.csv', allMonths.map((m) => ({
        month: m.monthEn,
        amount_thb: m.amountThb,
        type: m.isProjected ? 'projected' : 'actual',
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
            {isTh ? 'เปลี่ยนแปลง YoY (ประมาณ)' : 'Est. YoY Change'}
          </span>
          <p className={`text-2xl font-semibold ${yoyChangePct >= 0 ? 'text-[var(--color-danger)]' : 'text-accent'}`}>
            {yoyChangePct >= 0 ? '+' : ''}{yoyChangePct}%
          </p>
          <span className="text-xs text-ink-muted">
            {isTh ? 'เทียบ 3 เดือนย้อนหลัง' : 'vs prior 3-month period'}
          </span>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'ค่าใช้จ่ายเดือนล่าสุด' : 'Last Actual Month'}
          </span>
          <p className="text-2xl font-semibold text-ink">
            ฿{lastHistorical.toLocaleString(isTh ? 'th-TH' : 'en-US')}
          </p>
        </Card>
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'คาดการณ์ไตรมาสหน้า' : 'Projected Next Quarter'}
          </span>
          <p className="text-2xl font-semibold text-ink">
            ฿{projectedQ.toLocaleString(isTh ? 'th-TH' : 'en-US')}
          </p>
        </Card>
      </div>

      {/* Bar chart + export */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ink">
          {isTh ? 'ค่าใช้จ่ายรายเดือน (จริง + คาดการณ์)' : 'Monthly Cost — Actual + Projected'}
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

      <Card className="flex flex-col gap-5 p-5">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-8 rounded bg-accent" />
            {isTh ? 'ค่าใช้จ่ายจริง' : 'Actual'}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-8 rounded border border-dashed border-ink-muted bg-accent/30" />
            {isTh ? 'คาดการณ์' : 'Projected'}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {allMonths.map((m) => {
            const widthPct = maxAmount > 0 ? Math.round((m.amountThb / maxAmount) * 100) : 0;
            return (
              <div key={m.monthKey} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-medium ${m.isProjected ? 'text-ink-muted' : 'text-ink'}`}>
                    {isTh ? m.monthTh : m.monthEn}
                    {m.isProjected && (
                      <span className="ml-1.5 rounded bg-canvas-muted px-1 py-0.5 text-xs text-ink-muted">
                        {isTh ? 'คาดการณ์' : 'est.'}
                      </span>
                    )}
                  </span>
                  <span className="tabular-nums text-ink">
                    ฿{m.amountThb.toLocaleString(isTh ? 'th-TH' : 'en-US')}
                  </span>
                </div>
                <div className="h-7 overflow-hidden rounded-md bg-canvas-soft">
                  <div
                    className={`h-full rounded-md transition-all duration-500 ${
                      m.isProjected ? 'bg-accent/30' : 'bg-accent'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-ink-muted">
          {isTh
            ? 'หมายเหตุ: ค่าคาดการณ์คำนวณจากแนวโน้มเชิงเส้น (Linear Projection) จาก 3 เดือนก่อนหน้า — ข้อมูลจำลองเท่านั้น'
            : 'Note: Projected values use a simple linear trend from the prior 3 months — illustrative only'}
        </p>
      </Card>
    </div>
  );
}
