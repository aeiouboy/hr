'use client';

// /overtime — Group B ESS OT (overtime) submit + status list.
//
// Employee self-service: submit an OT request, track its status. Approval moves
// OUT of this page to /quick-approve + /workflows/ot/[id] (no inline approve/
// reject here). Driven by the dedicated overtime-requests Zustand store.
//
// Cross-midnight entry: separate start date+time and end date+time inputs so a
// shift like 1 Jun 23:00 → 2 Jun 02:00 is enterable; computed OT hours render
// live (computeOtHours wraps past midnight).
//
// Single validate point gates submit on (B2/B4):
//   • OT-flag gate — getEmployeeTimeAttrs(empId).otEligible === false.
//   • overlap with the employee's own pending/approved OT.
//   • outside the current payroll period (isWithinCurrentPeriod).
//   • OT+Leave overlap (scan the leave-approvals store).
//   • monthly OT cap exceeded (monthlyOtTotal + requested > MONTHLY_OT_CAP_HOURS).
// All errors render in pumpkin (--color-danger). Humi tokens only. No backend.

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Clock, ChevronRight } from 'lucide-react';
import { Card, CardEyebrow, Button } from '@/components/humi';
import { FileUploadField } from '@/components/humi/molecules/FileUploadField';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import {
  useOvertimeRequests,
  OT_STATUS_LABEL,
  type OTStatus,
  type OTRequest,
} from '@/stores/overtime-requests';
import { OT_TYPES, type OtTypeCode } from '@/lib/time/ot-types';
import { FormattedDateInput } from '@/components/time/FormattedDateInput';
import {
  computeOtHours,
  monthlyOtTotal,
  validateOtDayRows,
  autoEndDate,
  plusOneHour,
  MONTHLY_OT_CAP_HOURS,
} from '@/lib/time/ot-math';
import { getEmployeeTimeAttrs } from '@/lib/time/employee-time-attrs';
import { useLeaveApprovals } from '@/stores/leave-approvals';

// Fall back to the demo employee (EMP001 — seeded quota + attrs) when the live
// persona has no concrete id, so the gates stay demoable.
const DEMO_EMPLOYEE = { id: 'EMP001', name: 'พิมพ์ชนก ศรีวัฒน์', department: 'Store' };

const STATUS_STYLE: Record<OTStatus, string> = {
  pending: 'bg-[color:var(--color-warning-soft)] text-[color:var(--color-warning)] border border-[color:var(--color-warning)]',
  approved: 'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)] border border-[color:var(--color-success)]',
  rejected: 'bg-danger-soft text-danger-ink border border-danger',
  cancelled: 'bg-canvas-soft text-ink-muted border border-hairline',
};

function combineDateTime(date: string, time: string): string {
  if (!date || !time) return '';
  return `${date}T${time}:00`;
}

// STA-164 — one editable row per OT day. A request can carry N day rows; the
// store keeps the summed total in `hours` and the span in startAt/endAt.
// STA-173 — explicit Start/End date per row (cross-day OT), all fields blank by
// default so nothing reads pre-selected. `OtDayRow` is form-local (not exported).
type OtDayRow = { id: string; startDate: string; startTime: string; endDate: string; endTime: string };
let rowSeq = 0;
const newRow = (): OtDayRow => ({
  id: `ot-day-${++rowSeq}`,
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
});

function OTRow({ req, locale }: { req: OTRequest; locale: string }) {
  const isTh = locale !== 'en';
  const otDef = OT_TYPES.find((t) => t.code === req.otType);
  const otLabel = (isTh ? otDef?.nameTh : otDef?.nameEn) ?? req.otType;
  const statusLabel = isTh ? OT_STATUS_LABEL[req.status].th : OT_STATUS_LABEL[req.status].en;
  const start = new Date(req.startAt);
  const end = new Date(req.endAt);
  const fmt = (d: Date) =>
    d.toLocaleString(isTh ? 'th-TH' : 'en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  return (
    <li className="humi-card" style={{ padding: 16 }}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="humi-eyebrow mb-0.5">{req.id}</div>
          <p className="text-body font-semibold text-ink">
            {otLabel} · {req.hours}h
          </p>
          <p className="text-small text-ink-muted mt-0.5">
            {fmt(start)} → {fmt(end)}
          </p>
          {req.reason && <p className="text-small text-ink-muted mt-0.5">{req.reason}</p>}
        </div>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap',
            STATUS_STYLE[req.status],
          )}
        >
          {statusLabel}
        </span>
      </div>
    </li>
  );
}

export default function OvertimePage() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  const userId = useAuthStore((s) => s.userId);
  const username = useAuthStore((s) => s.username);
  const empId = userId ?? DEMO_EMPLOYEE.id;
  const empName = username ?? DEMO_EMPLOYEE.name;

  const allRequests = useOvertimeRequests((s) => s.requests);
  const addRequest = useOvertimeRequests((s) => s.addRequest);
  const leaveRequests = useLeaveApprovals((s) => s.requests);

  const myRequests = useMemo(
    () => allRequests.filter((r) => r.employeeId === empId),
    [allRequests, empId],
  );

  // STA-149 — open on the request FORM by default; the status list lives in a
  // secondary "Status" tab (single control model — no separate show/hide button).
  const [activeTab, setActiveTab] = useState<'request' | 'status'>('request');
  // STA-163 — otType pinned to 'OT' at the request level (no per-request selector);
  // STA-164 — the date/time inputs moved into the repeatable `rows` editor below.
  const [form, setForm] = useState({
    otType: 'OT' as OtTypeCode, // pinned to 'OT' — kept for the OTRequest store contract + status/approval labels
    reason: '',
    attachmentId: null as string | null,
  });
  const [rows, setRows] = useState<OtDayRow[]>(() => [newRow()]);
  const [error, setError] = useState<string | null>(null);

  // STA-256 — End Date is auto-calculated (same day as start; +1 day when the
  // end time is at/before the start time = cross-midnight) on every row change.
  const updateRow = (id: string, patch: Partial<OtDayRow>) =>
    setRows((rs) =>
      rs.map((r) => {
        if (r.id !== id) return r;
        const merged = { ...r, ...patch };
        merged.endDate = autoEndDate(merged.startDate, merged.startTime, merged.endTime);
        return merged;
      }),
    );
  // Never drop the last row — a request always has ≥1 OT day.
  const removeRow = (id: string) =>
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  const addRow = () => setRows((rs) => [...rs, newRow()]);

  const attrs = getEmployeeTimeAttrs(empId);

  // Per-row windows + summed total. STA-173 — the user now supplies an explicit
  // End Date, so build startAt/endAt strictly from the four chosen fields with NO
  // +1day inference. A row only contributes hours when all four fields are filled
  // AND end > start; a backwards/half-filled row yields 0 (cannot leak a fabricated
  // computeOtHours value into the total). The request span is the earliest start …
  // latest end across all rows.
  const dayWindows = rows.map((r) => {
    const filled = r.startDate && r.startTime && r.endDate && r.endTime;
    const startAt = combineDateTime(r.startDate, r.startTime);
    const endAt = combineDateTime(r.endDate, r.endTime);
    const valid = Boolean(filled) && endAt > startAt;
    return {
      id: r.id,
      date: r.startDate, // helper anchor day = the start date
      startAt,
      endAt,
      hours: valid ? computeOtHours(startAt, endAt) : 0,
    };
  });
  const totalHours = Math.round(dayWindows.reduce((s, d) => s + d.hours, 0) * 100) / 100;
  const spanStart =
    [...dayWindows].filter((d) => d.startAt).sort((a, b) => (a.startAt < b.startAt ? -1 : 1))[0]
      ?.startAt ?? '';
  const spanEnd =
    [...dayWindows].filter((d) => d.endAt).sort((a, b) => (a.endAt > b.endAt ? -1 : 1))[0]
      ?.endAt ?? '';

  // SINGLE validate point (B2/B4), now multi-row (STA-164). Eligibility + reason
  // stay here; the per-row / overlap / cap rules live in the pure
  // validateOtDayRows helper (unit-tested) and are mapped to localized copy.
  function validate(): string | null {
    if (!attrs.otEligible) {
      return isTh ? 'ไม่มีสิทธิ์ขอ OT' : 'Not eligible for OT';
    }
    if (!form.reason.trim()) {
      return isTh ? 'กรุณากรอกเหตุผล' : 'Please enter a reason';
    }
    // STA-173 — explicit end-after-start guard (the user now supplies End Date).
    // Fast-feedback only; the helper `bad_range` code is the testable source of
    // truth. A half-filled row falls through to the helper's invalid_row path.
    const badRange = rows.some((r) => {
      if (!r.startDate || !r.startTime || !r.endDate || !r.endTime) return false;
      return combineDateTime(r.endDate, r.endTime) <= combineDateTime(r.startDate, r.startTime);
    });
    if (badRange) {
      return isTh
        ? 'เวลาสิ้นสุดต้องอยู่หลังเวลาเริ่ม — สำหรับ OT ข้ามวันให้เลือกวันสิ้นสุดเป็นวันถัดไป'
        : 'End must be after start — for overnight OT, pick the next day as the End Date';
    }
    const result = validateOtDayRows({
      dayWindows,
      storedOt: myRequests,
      leave: leaveRequests
        .filter((r) => r.employeeId === empId && r.status !== 'rejected')
        .map((r) => ({ startDate: r.startDate, endDate: r.endDate })),
      monthToDateHours: monthlyOtTotal(myRequests, empId),
    });
    if (!result) return null;
    switch (result.code) {
      case 'invalid_row':
        return isTh
          ? 'แต่ละวัน OT ต้องมีวันที่และช่วงเวลาที่ถูกต้อง'
          : 'Each OT day needs a date and a valid time range';
      case 'bad_range':
        return isTh
          ? 'เวลาสิ้นสุดต้องอยู่หลังเวลาเริ่ม — สำหรับ OT ข้ามวันให้เลือกวันสิ้นสุดเป็นวันถัดไป'
          : 'End must be after start — for overnight OT, pick the next day as the End Date';
      case 'outside_period':
        return isTh
          ? 'วันที่อยู่นอกรอบจ่ายเงินเดือนปัจจุบัน'
          : 'Date is outside the current payroll period';
      case 'cross_row':
        return isTh ? 'วัน OT ในคำขอนี้ทับซ้อนกัน' : 'OT days in this request overlap';
      case 'existing_ot':
        return isTh ? 'ช่วงเวลาทับซ้อนกับคำขอ OT เดิม' : 'Overlaps with an existing OT request';
      case 'leave':
        return isTh ? 'วันที่ทับซ้อนกับวันลา' : 'Overlaps with a leave request';
      case 'over_cap':
        return isTh
          ? `เกินเพดาน OT รายเดือน (${result.total}/${MONTHLY_OT_CAP_HOURS} ชม.)`
          : `Exceeds monthly OT cap (${result.total}/${MONTHLY_OT_CAP_HOURS}h)`;
      default:
        return null;
    }
  }

  function handleSubmit() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    addRequest({
      employeeId: empId,
      employeeName: empName,
      department: DEMO_EMPLOYEE.department,
      otType: form.otType,
      startAt: spanStart,
      endAt: spanEnd,
      hours: totalHours,
      // Single-day OT leaves `days` undefined → byte-identical to the pre-STA-164
      // shape (no per-day breakdown rendered). Only a true multi-day request carries
      // the per-day array.
      days:
        dayWindows.length > 1
          ? dayWindows.map((d) => ({
              date: d.date,
              startAt: d.startAt,
              endAt: d.endAt,
              hours: d.hours,
            }))
          : undefined,
      reason: form.reason.trim(),
      docs: form.attachmentId ? [form.attachmentId] : [],
    });
    setForm({ otType: 'OT', reason: '', attachmentId: null });
    setRows([newRow()]);
    setError(null);
    setActiveTab('status'); // STA-149 — jump to the status list to show the new request
  }

  const pendingCount = myRequests.filter((r) => r.status === 'pending').length;
  const approvedCount = myRequests.filter((r) => r.status === 'approved').length;
  const monthTotal = monthlyOtTotal(myRequests, empId);

  return (
    <div className="pb-8 flex flex-col gap-6">
      {/* Breadcrumb — back to the Time hub (parent), matching /time/corrections */}
      <nav className="flex items-center gap-1 text-xs text-ink-muted" aria-label="breadcrumb">
        <Link href={`/${locale}/time`} className="hover:text-ink transition">
          {isTh ? 'เวลางาน' : 'Time'}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="text-ink font-medium">
          {isTh ? 'คำขอทำงานล่วงเวลา' : 'Overtime Requests'}
        </span>
      </nav>

      {/* Header */}
      <header className="humi-page-head">
        <div className="flex flex-col gap-1">
          <CardEyebrow>{isTh ? 'การทำงาน · OT' : 'Work · Overtime'}</CardEyebrow>
          <h1 className="font-display text-[length:var(--text-display-h1)] font-semibold leading-[var(--text-display-h1--line-height)] tracking-tight text-ink">
            {isTh ? 'คำขอทำงานล่วงเวลา' : 'Overtime Requests'}
          </h1>
          <p className="text-small text-ink-muted mt-1">
            {isTh ? 'ยื่นคำขอ · ติดตามสถานะ OT' : 'Submit requests · Track OT status'}
          </p>
        </div>
      </header>

      {/* STA-149 — Request / Status tabs (Request is the default view). */}
      <div role="tablist" aria-label={isTh ? 'มุมมอง OT' : 'OT views'} className="flex gap-1 border-b border-hairline">
        {([
          { key: 'request' as const, label: isTh ? 'ยื่นคำขอ' : 'Request' },
          { key: 'status' as const, label: `${isTh ? 'สถานะ' : 'Status'}${myRequests.length > 0 ? ` (${myRequests.length})` : ''}` },
        ]).map((tab) => (
          <button
            key={tab.key}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.key}
            onClick={() => { setActiveTab(tab.key); setError(null); }}
            className={cn(
              '-mb-px border-b-2 px-4 py-2 text-small font-medium transition-colors',
              activeTab === tab.key
                ? 'border-accent text-ink'
                : 'border-transparent text-ink-muted hover:text-ink',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OT-flag gate banner (B2) */}
      {!attrs.otEligible && (
        <div className="rounded-[var(--radius-md)] border border-danger bg-danger-soft px-4 py-3 text-sm text-danger-ink">
          {isTh ? 'ไม่มีสิทธิ์ขอ OT' : 'Not eligible for OT'}
        </div>
      )}

      {/* Summary chips (Status tab) */}
      {activeTab === 'status' && (
      <div className="flex gap-3 flex-wrap">
        {pendingCount > 0 && (
          <span className="rounded-full px-3 py-1 text-xs font-medium bg-[color:var(--color-warning-soft)] text-[color:var(--color-warning)] border border-[color:var(--color-warning)]">
            {isTh ? 'รออนุมัติ' : 'Pending'} · {pendingCount}
          </span>
        )}
        {approvedCount > 0 && (
          <span className="rounded-full px-3 py-1 text-xs font-medium bg-[color:var(--color-success-soft)] text-[color:var(--color-success)] border border-[color:var(--color-success)]">
            {isTh ? 'อนุมัติแล้ว' : 'Approved'} · {approvedCount}
          </span>
        )}
        <span className="rounded-full px-3 py-1 text-xs font-medium bg-surface-raised text-ink-muted border border-hairline">
          <Clock size={11} className="inline mr-1" aria-hidden />
          {monthTotal}h / {MONTHLY_OT_CAP_HOURS}h {isTh ? 'รอบนี้' : 'this period'}
        </span>
      </div>
      )}

      {/* Submit form (Request tab — default) */}
      {activeTab === 'request' && (
        <Card variant="raised" size="lg">
          <h2 className="font-semibold text-ink mb-4">
            {isTh ? 'ยื่นคำขอทำงานล่วงเวลา' : 'Submit OT Request'}
          </h2>
          {/* STA-164 — repeatable OT-day rows (Add / Remove). */}
          <div className="flex flex-col gap-3">
            {rows.map((row, idx) => {
              const win = dayWindows[idx];
              return (
                <div
                  key={row.id}
                  className="rounded-[var(--radius-md)] border border-hairline bg-surface p-3"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-small font-semibold text-ink">
                      {isTh ? `วัน OT ${idx + 1}` : `OT Day ${idx + 1}`}
                    </span>
                    {rows.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[var(--color-danger)]"
                        onClick={() => removeRow(row.id)}
                      >
                        {isTh ? 'ลบ' : 'Remove'}
                      </Button>
                    )}
                  </div>
                  {/* STA-256 — Start Date (system calendar + abbrev display) · Start Time
                      (native time widget / manual typing) · End Date (auto-calculated,
                      read-only) · End Time (+1 hour helper button). */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-small font-medium text-ink-soft">
                        {isTh ? 'วันที่เริ่ม *' : 'Start Date *'}
                      </label>
                      <FormattedDateInput
                        value={row.startDate}
                        onChange={(v) => updateRow(row.id, { startDate: v })}
                        locale={locale}
                        aria-label={isTh ? `วันที่เริ่ม วัน OT ${idx + 1}` : `Start date OT day ${idx + 1}`}
                        data-testid={`ot-start-date-${idx}`}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-small font-medium text-ink-soft">
                        {isTh ? 'เวลาเริ่ม *' : 'Start Time *'}
                      </label>
                      <input
                        type="time"
                        value={row.startTime}
                        onChange={(e) => updateRow(row.id, { startTime: e.target.value })}
                        aria-label={isTh ? `เวลาเริ่ม วัน OT ${idx + 1}` : `Start time OT day ${idx + 1}`}
                        data-testid={`ot-start-time-${idx}`}
                        className="w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2.5 text-body text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-small font-medium text-ink-soft">
                        {isTh ? 'วันที่สิ้นสุด (อัตโนมัติ)' : 'End Date (auto)'}
                      </label>
                      <FormattedDateInput
                        value={row.endDate}
                        locale={locale}
                        disabled
                        placeholder="—"
                        data-testid={`ot-end-date-${idx}`}
                      />
                      <p className="text-xs text-ink-faint">
                        {isTh
                          ? 'คำนวณจากวันและเวลาเริ่ม — OT ข้ามเที่ยงคืนจะเลื่อนเป็นวันถัดไป'
                          : 'Calculated from the start — overnight OT rolls to the next day'}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-small font-medium text-ink-soft">
                        {isTh ? 'เวลาสิ้นสุด *' : 'End Time *'}
                      </label>
                      <input
                        type="time"
                        value={row.endTime}
                        onChange={(e) => updateRow(row.id, { endTime: e.target.value })}
                        aria-label={isTh ? `เวลาสิ้นสุด วัน OT ${idx + 1}` : `End time OT day ${idx + 1}`}
                        data-testid={`ot-end-time-${idx}`}
                        className="w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2.5 text-body text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      />
                      {/* +1 hour: first press = start time + 1h; afterwards adds
                          another hour to the end time (may roll the auto end date). */}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="self-start"
                        disabled={!row.startTime && !row.endTime}
                        data-testid={`ot-plus-hour-${idx}`}
                        onClick={() => {
                          const base = row.endTime || row.startTime;
                          if (!base) return;
                          updateRow(row.id, { endTime: plusOneHour(base) });
                        }}
                      >
                        {isTh ? '+1 ชั่วโมง' : '+1 hour'}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-small text-ink-muted">
                    <Clock size={13} aria-hidden />
                    {isTh ? 'ชั่วโมง OT วันนี้:' : 'OT hours this day:'}{' '}
                    <span className="font-semibold text-ink">{win?.hours ?? 0}</span>{' '}
                    {isTh ? 'ชม.' : 'h'}
                  </div>
                </div>
              );
            })}

            {/* Add OT day */}
            <div>
              <Button variant="ghost" size="sm" onClick={addRow}>
                {isTh ? '+ เพิ่มวัน OT' : '+ Add OT Day'}
              </Button>
            </div>

            {/* Total OT hours */}
            <div className="flex items-center gap-2 border-t border-hairline pt-3 text-small text-ink-muted">
              <Clock size={14} aria-hidden />
              {isTh ? 'รวมชั่วโมง OT:' : 'Total OT hours:'}{' '}
              <span className="font-semibold text-ink">{totalHours}</span> {isTh ? 'ชม.' : 'h'}
            </div>

            {/* Reason */}
            <div className="flex flex-col gap-1.5">
              <label className="text-small font-medium text-ink-soft">
                {isTh ? 'เหตุผล *' : 'Reason *'}
              </label>
              <textarea
                value={form.reason}
                onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
                rows={2}
                className="w-full rounded-[var(--radius-md)] border border-hairline bg-surface px-3 py-2.5 text-body text-ink placeholder:text-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 resize-none"
                placeholder={isTh ? 'ระบุเหตุผลการทำ OT' : 'Describe the reason for OT'}
              />
            </div>
          </div>

          {/* Optional document attachment (single file) */}
          <div className="mt-4">
            <FileUploadField
              label={isTh ? 'เอกสารแนบ (ไม่บังคับ)' : 'Attachment (optional)'}
              maxFiles={1}
              onUpload={(id) => setForm((p) => ({ ...p, attachmentId: id }))}
              onRemove={() => setForm((p) => ({ ...p, attachmentId: null }))}
            />
          </div>

          {/* Inline validation error (pumpkin) */}
          {error && (
            <div className="mt-3 rounded-[var(--radius-md)] border border-danger bg-danger-soft px-3 py-2 text-sm text-danger-ink">
              {error}
            </div>
          )}

          <div className="mt-4 flex gap-3 justify-end">
            <Button
              variant="ghost"
              onClick={() => {
                setForm({ otType: 'OT', reason: '', attachmentId: null });
                setRows([newRow()]);
                setError(null);
                setActiveTab('status');
              }}
            >
              {isTh ? 'ยกเลิก' : 'Cancel'}
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={!attrs.otEligible}>
              {isTh ? 'ส่งคำขอ' : 'Submit'}
            </Button>
          </div>
        </Card>
      )}

      {/* Request list (Status tab) */}
      {activeTab === 'status' && (myRequests.length === 0 ? (
        <div className="humi-card humi-card--cream" style={{ textAlign: 'center', padding: 40 }}>
          <p className="text-body text-ink-muted">
            {isTh ? 'ยังไม่มีคำขอ OT' : 'No OT requests yet'}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3" aria-label={isTh ? 'รายการคำขอ OT' : 'OT requests'}>
          {myRequests.map((req) => (
            <OTRow key={req.id} req={req} locale={locale} />
          ))}
        </ul>
      ))}
    </div>
  );
}
