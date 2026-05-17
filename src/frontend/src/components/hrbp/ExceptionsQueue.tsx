'use client';

// STA-27 PR-B — ExceptionsQueue
// 4 summary tiles + filter row (search + type chips) + table of 8 seed records
// Row click opens <ExceptionDetailModal>

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBenefitExceptionStore } from '@/stores/benefit-exception-store';
import type { BenefitExceptionRecord, BenefitExceptionType } from '@/stores/benefit-exception-store';
import { ExceptionDetailModal } from './ExceptionDetailModal';

// ── Exception type metadata ───────────────────────────────────────────────────

const TYPE_LABEL_TH: Record<BenefitExceptionType, string> = {
  foreigner_spouse: 'คู่สมรสต่างชาติ',
  cfr_skt_override: 'CFR/SKT Override',
  borrow_forward:   'ยืมสิทธิ์ล่วงหน้า',
  manual_override:  'Override อื่นๆ',
};

const TYPE_LABEL_EN: Record<BenefitExceptionType, string> = {
  foreigner_spouse: 'Foreign Spouse',
  cfr_skt_override: 'CFR/SKT Override',
  borrow_forward:   'Borrow Forward',
  manual_override:  'Manual Override',
};

const TYPE_CHIP_STYLE: Record<BenefitExceptionType, string> = {
  foreigner_spouse: 'bg-info-tint text-info border border-info/20',
  cfr_skt_override: 'bg-warning-soft text-warning border border-warning/20',
  borrow_forward:   'bg-accent-soft text-accent border border-accent/20',
  manual_override:  'bg-canvas-soft text-ink-muted border border-hairline',
};

const STATUS_CHIP_TH: Record<string, string> = {
  pending_hrbp: 'รอ HRBP',
  approved:     'อนุมัติแล้ว',
  rejected:     'ปฏิเสธแล้ว',
};

const STATUS_CHIP_EN: Record<string, string> = {
  pending_hrbp: 'Pending HRBP',
  approved:     'Approved',
  rejected:     'Rejected',
};

const STATUS_CHIP_STYLE: Record<string, string> = {
  pending_hrbp: 'bg-warning-soft text-warning border border-warning/20',
  approved:     'bg-success/10 text-success border border-success/20',
  rejected:     'bg-danger/10 text-danger border border-danger/20',
};

// ── Summary tile ──────────────────────────────────────────────────────────────

interface SummaryTileProps {
  label: string;
  value: number | string;
  tone: 'warning' | 'success' | 'danger' | 'accent';
}

// Map tone to Humi token classes (no hex)
const TILE_TONE_CLASS: Record<string, { value: string; bg: string }> = {
  warning: { value: 'text-warning',   bg: 'bg-warning-soft' },
  success: { value: 'text-success',   bg: 'bg-success/10'   },
  danger:  { value: 'text-danger',    bg: 'bg-danger/10'    },
  accent:  { value: 'text-accent',    bg: 'bg-accent-soft'  },
};

function SummaryTile({ label, value, tone }: SummaryTileProps) {
  const cls = TILE_TONE_CLASS[tone];
  return (
    <div className={cn('humi-card', cls.bg)} style={{ padding: '16px 20px' }}>
      <div className="humi-eyebrow" style={{ marginBottom: 6, fontSize: 11 }}>{label}</div>
      <div
        className={cn('font-display font-bold leading-none', cls.value)}
        style={{ fontSize: 30 }}
      >
        {value}
      </div>
    </div>
  );
}

// ── Filter chip ───────────────────────────────────────────────────────────────

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-[var(--radius-sm)] border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        active
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-hairline bg-surface text-ink-muted hover:border-accent/40 hover:text-ink',
      )}
    >
      {label}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface ExceptionsQueueProps {
  isTh: boolean;
}

const ALL_TYPES: BenefitExceptionType[] = [
  'foreigner_spouse',
  'cfr_skt_override',
  'borrow_forward',
  'manual_override',
];

export function ExceptionsQueue({ isTh }: ExceptionsQueueProps) {
  const exceptions = useBenefitExceptionStore((s) => s.exceptions);

  const [search, setSearch] = useState('');
  const [activeTypes, setActiveTypes] = useState<Set<BenefitExceptionType>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Summary counts
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);
  const thisMonthIso = thisMonth.toISOString();

  const totalCount   = exceptions.length;
  const pendingCount = exceptions.filter((e) => e.status === 'pending_hrbp').length;
  const approvedThisMonth = exceptions.filter(
    (e) => e.status === 'approved' && e.requestedAt >= thisMonthIso,
  ).length;
  const rejectedThisMonth = exceptions.filter(
    (e) => e.status === 'rejected' && e.requestedAt >= thisMonthIso,
  ).length;

  // Filtered rows
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return exceptions.filter((exc) => {
      const matchSearch =
        !q ||
        exc.employeeName.toLowerCase().includes(q) ||
        exc.department.toLowerCase().includes(q) ||
        exc.benefitName.toLowerCase().includes(q);
      const matchType = activeTypes.size === 0 || activeTypes.has(exc.exceptionType);
      return matchSearch && matchType;
    });
  }, [exceptions, search, activeTypes]);

  function toggleType(t: BenefitExceptionType) {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t); else next.add(t);
      return next;
    });
  }

  const typeLabel = isTh ? TYPE_LABEL_TH : TYPE_LABEL_EN;
  const statusLabel = isTh ? STATUS_CHIP_TH : STATUS_CHIP_EN;

  const selectedRecord = selectedId ? exceptions.find((e) => e.id === selectedId) ?? null : null;

  return (
    <div className="flex flex-col gap-5">
      {/* Summary tiles — 4 columns */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryTile
          label={isTh ? 'ทั้งหมด' : 'Total'}
          value={totalCount}
          tone="accent"
        />
        <SummaryTile
          label={isTh ? 'รอดำเนินการ' : 'Pending'}
          value={pendingCount}
          tone="warning"
        />
        <SummaryTile
          label={isTh ? 'อนุมัติเดือนนี้' : 'Approved this month'}
          value={approvedThisMonth}
          tone="success"
        />
        <SummaryTile
          label={isTh ? 'ปฏิเสธเดือนนี้' : 'Rejected this month'}
          value={rejectedThisMonth}
          tone="danger"
        />
      </div>

      {/* Filter row */}
      <div className="humi-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isTh ? 'ค้นหาพนักงาน / แผนก...' : 'Search employee / dept...'}
              className="w-full rounded-[var(--radius-sm)] border border-hairline bg-canvas-soft py-1.5 pl-8 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </div>
          {/* Type chips */}
          <div className="flex flex-wrap gap-1.5">
            {ALL_TYPES.map((t) => (
              <FilterChip
                key={t}
                label={typeLabel[t]}
                active={activeTypes.has(t)}
                onClick={() => toggleType(t)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="humi-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-hairline bg-canvas-soft">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'พนักงาน' : 'Employee'}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'แผนสวัสดิการ' : 'Plan'}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'ประเภท' : 'Type'}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'ยื่นโดย / วันที่' : 'Requested by / at'}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'เหตุผล' : 'Reason'}
                </th>
                <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'จำนวน' : 'Amount'}
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {isTh ? 'สถานะ' : 'Status'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-sm text-ink-muted">
                    {isTh ? 'ไม่พบข้อมูล' : 'No records found'}
                  </td>
                </tr>
              )}
              {filtered.map((exc) => (
                <tr
                  key={exc.id}
                  onClick={() => setSelectedId(exc.id)}
                  className="cursor-pointer transition-colors hover:bg-canvas-soft"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-ink">{exc.employeeName}</div>
                    <div className="text-xs text-ink-muted">{exc.department}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-ink">{exc.benefitName}</div>
                    <div className="text-xs text-ink-muted">{exc.benefitCode}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-semibold',
                        TYPE_CHIP_STYLE[exc.exceptionType],
                      )}
                    >
                      {typeLabel[exc.exceptionType]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-ink">{exc.requestedBy}</div>
                    <div className="text-xs text-ink-muted">
                      {new Date(exc.requestedAt).toLocaleDateString(isTh ? 'th-TH' : 'en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="max-w-[200px] px-4 py-3">
                    <p className="truncate text-xs text-ink-muted">{exc.reason}</p>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {exc.amount != null ? (
                      <span
                        className={cn(
                          'text-sm font-semibold tabular-nums',
                          exc.amount >= 0 ? 'text-success' : 'text-danger',
                        )}
                      >
                        {exc.amount >= 0 ? '+' : ''}
                        {exc.amount.toLocaleString()}
                        {isTh ? ' ฿' : ' THB'}
                      </span>
                    ) : (
                      <span className="text-xs text-ink-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-xs font-semibold',
                        STATUS_CHIP_STYLE[exc.status],
                      )}
                    >
                      {statusLabel[exc.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selectedRecord && (
        <ExceptionDetailModal
          record={selectedRecord}
          isTh={isTh}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
