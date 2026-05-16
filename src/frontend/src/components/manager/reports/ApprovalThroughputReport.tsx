'use client';

// STA-28 PR-E — ApprovalThroughputReport (M-RP-03)
// Avg time-to-decide + rejection rate. Two stat tiles + horizontal bar list per period.

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Download } from 'lucide-react';
import { Card } from '@/components/humi';
import { getThroughputStats, csvExport } from '@/lib/manager-reports-mock';
import { cn } from '@/lib/utils';

const PERIODS = [
  { labelEn: 'Last 30 days', labelTh: '30 วันล่าสุด', days: 30 },
  { labelEn: 'Last 90 days', labelTh: '90 วันล่าสุด', days: 90 },
  { labelEn: 'YTD', labelTh: 'ตั้งแต่ต้นปี', days: 136 },
] as const;

type PeriodDays = (typeof PERIODS)[number]['days'];

export function ApprovalThroughputReport() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const [activePeriod, setActivePeriod] = useState<PeriodDays>(30);
  const [exporting, setExporting] = useState(false);

  const stats = getThroughputStats(activePeriod);

  function handleExport() {
    setExporting(true);
    setTimeout(() => {
      const rows = PERIODS.map((p) => {
        const s = getThroughputStats(p.days);
        return {
          period: p.labelEn,
          avg_hours_to_decide: s.avgHoursToDecide,
          rejection_rate_pct: s.rejectionRatePct,
          total_decisions: s.totalDecisions,
        };
      });
      csvExport('approval-throughput-2026-05.csv', rows);
      setExporting(false);
    }, 300);
  }

  const maxHours = Math.max(...PERIODS.map((p) => getThroughputStats(p.days).avgHoursToDecide));

  return (
    <div className="flex flex-col gap-6">
      {/* Period tabs + export */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-lg border border-hairline bg-canvas-soft p-1">
          {PERIODS.map((p) => (
            <button
              key={p.days}
              type="button"
              onClick={() => setActivePeriod(p.days)}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                activePeriod === p.days
                  ? 'bg-surface text-ink shadow-[var(--shadow-card)]'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              {isTh ? p.labelTh : p.labelEn}
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

      {/* 2 stat tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'เวลาตัดสินเฉลี่ย' : 'Avg. Time to Decide'}
          </span>
          <p className="text-3xl font-semibold text-ink">{stats.avgHoursToDecide}h</p>
          <span className="text-xs text-ink-muted">
            {isTh ? 'ชั่วโมง / คำขอ' : 'hours per request'}
          </span>
        </Card>

        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'อัตราการปฏิเสธ' : 'Rejection Rate'}
          </span>
          <p
            className={cn(
              'text-3xl font-semibold',
              stats.rejectionRatePct >= 15
                ? 'text-[var(--color-danger)]'
                : stats.rejectionRatePct >= 10
                  ? 'text-warning'
                  : 'text-ink',
            )}
          >
            {stats.rejectionRatePct}%
          </p>
          <span className="text-xs text-ink-muted">
            {isTh ? 'จากทั้งหมด' : 'of all decisions'}
          </span>
        </Card>

        <Card className="flex flex-col gap-1 p-5">
          <span className="text-xs text-ink-muted">
            {isTh ? 'จำนวนการตัดสินใจ' : 'Total Decisions'}
          </span>
          <p className="text-3xl font-semibold text-ink">{stats.totalDecisions}</p>
          <span className="text-xs text-ink-muted">
            {isTh ? 'รายการ' : 'approvals + rejections'}
          </span>
        </Card>
      </div>

      {/* Horizontal bar chart — avg hours per period */}
      <Card className="flex flex-col gap-4 p-5">
        <h3 className="text-sm font-medium text-ink">
          {isTh ? 'เวลาตัดสินเฉลี่ยตามช่วงเวลา' : 'Avg. Hours to Decide by Period'}
        </h3>
        <div className="flex flex-col gap-3">
          {PERIODS.map((p) => {
            const s = getThroughputStats(p.days);
            const pct = maxHours > 0 ? (s.avgHoursToDecide / maxHours) * 100 : 0;
            return (
              <div key={p.days} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-xs text-ink-muted">
                  {isTh ? p.labelTh : p.labelEn}
                </span>
                <div className="flex h-7 flex-1 overflow-hidden rounded-md bg-canvas-soft">
                  <div
                    className="flex h-full items-center rounded-md bg-accent-soft transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-12 text-xs tabular-nums text-ink">
                  {s.avgHoursToDecide}h
                </span>
              </div>
            );
          })}
        </div>

        {/* Rejection rate bar chart */}
        <h3 className="mt-2 text-sm font-medium text-ink">
          {isTh ? 'อัตราการปฏิเสธตามช่วงเวลา' : 'Rejection Rate by Period'}
        </h3>
        <div className="flex flex-col gap-3">
          {PERIODS.map((p) => {
            const s = getThroughputStats(p.days);
            return (
              <div key={p.days} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-right text-xs text-ink-muted">
                  {isTh ? p.labelTh : p.labelEn}
                </span>
                <div className="flex h-7 flex-1 overflow-hidden rounded-md bg-canvas-soft">
                  <div
                    className={cn(
                      'flex h-full items-center rounded-md transition-all duration-500',
                      s.rejectionRatePct >= 15
                        ? 'bg-[var(--color-danger)]/20'
                        : s.rejectionRatePct >= 10
                          ? 'bg-warning/20'
                          : 'bg-accent-soft',
                    )}
                    style={{ width: `${s.rejectionRatePct * 5}%` }}
                  />
                </div>
                <span className="w-12 text-xs tabular-nums text-ink">
                  {s.rejectionRatePct}%
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
