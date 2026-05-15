'use client';

import { useLocale } from 'next-intl';
import { Card, CardEyebrow, CardTitle, Button, DataTable } from '@/components/humi';
import type { DataTableColumn } from '@/components/humi';

// ── Benefit Payment Dashboard — แดชบอร์ดการจ่ายสวัสดิการ ──────────────────
// STA-26 PR-E · AC5 · §2.5 A-PY-01..07 · BE-27
// Read-only mockup — real execution via SAP ZBET001/003/004 (Q21 pending)

// ── Mock data ───────────────────────────────────────────────────────────────

type CutoffRow = { company: string; cycle: string; days: string };
type WageTypeRow = { company: string; plan: string; infotype: string; wageCode: string };
type PeriodRow = { company: string; plan: string; periodId: string; payDate: string };
type PaymentStatusRow = { employee: string; plan: string; amount: string; status: string; blockReason: string };

const MOCK_CUTOFF_CALENDAR: CutoffRow[] = [
  { company: 'Ex-CRC', cycle: 'Monthly', days: '6, 16, 26 of month' },
  { company: 'CMG', cycle: 'Monthly', days: '6, 16, 26 of month' },
  { company: 'CRG', cycle: 'Monthly', days: '6, 16, 26 of month' },
  { company: 'CPN', cycle: 'Bi-weekly', days: 'Every Mon, Thu' },
  { company: 'CHR', cycle: 'Monthly', days: '13th of month' },
];

const MOCK_WAGE_TYPES: WageTypeRow[] = [
  { company: 'CG', plan: 'Medical OPD', infotype: 'IT0015', wageCode: '/001' },
  { company: 'CG', plan: 'Gasoline', infotype: 'IT0015', wageCode: '/002' },
  { company: 'CG', plan: 'Mobile', infotype: 'IT0015', wageCode: '/003' },
  { company: 'CMG', plan: 'Dental OPD', infotype: 'IT0015', wageCode: '/004' },
  { company: 'CPN', plan: 'Vision', infotype: 'IT0015', wageCode: '/005' },
];

const MOCK_PERIOD_MAPPING: PeriodRow[] = [
  { company: 'CG', plan: 'Medical OPD', periodId: 'PP-2026-04', payDate: '2026-04-30' },
  { company: 'CG', plan: 'Gasoline', periodId: 'PP-2026-04', payDate: '2026-04-30' },
  { company: 'CMG', plan: 'Medical OPD', periodId: 'PP-2026-04', payDate: '2026-04-28' },
  { company: 'CPN', plan: 'Medical OPD', periodId: 'PP-2026-04W2', payDate: '2026-04-24' },
  { company: 'CHR', plan: 'Dental OPD', periodId: 'PP-2026-04', payDate: '2026-04-13' },
];

const MOCK_PAYMENT_STATUS: PaymentStatusRow[] = [
  { employee: 'EMP-0042', plan: 'Medical OPD', amount: '฿3,500', status: 'eligible', blockReason: '—' },
  { employee: 'EMP-0117', plan: 'Gasoline', amount: '฿2,000', status: 'posted', blockReason: '—' },
  { employee: 'EMP-0203', plan: 'Medical OPD', amount: '฿4,800', status: 'blocked', blockReason: 'Missing receipt' },
  { employee: 'EMP-0391', plan: 'Dental OPD', amount: '฿1,200', status: 'eligible', blockReason: '—' },
  { employee: 'EMP-0558', plan: 'Vision', amount: '฿900', status: 'blocked', blockReason: 'Pending SPD approval' },
];

// ── Sub-components ───────────────────────────────────────────────────────────

const STATUS_CHIP: Record<string, string> = {
  current: 'bg-accent text-white',
  completed: 'bg-success-soft text-success',
  pending: 'bg-canvas-soft text-ink-muted border border-hairline',
};

function StepChip({ status, label }: { status: 'current' | 'completed' | 'pending'; label: string }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] ${STATUS_CHIP[status]}`}>
      {label}
    </span>
  );
}

const STATUS_BADGE: Record<string, string> = {
  eligible: 'bg-success-soft text-success',
  posted: 'bg-accent-soft text-accent',
  blocked: 'bg-error-soft text-error',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] ${STATUS_BADGE[status] ?? 'bg-canvas-soft text-ink-muted'}`}>
      {status}
    </span>
  );
}

// ── Column definitions ───────────────────────────────────────────────────────

const cutoffCols = (isTh: boolean): DataTableColumn<CutoffRow>[] => [
  { id: 'company', header: isTh ? 'บริษัท' : 'Company', cell: (r) => r.company, sortAccessor: (r) => r.company },
  { id: 'cycle', header: isTh ? 'รอบ' : 'Cycle', cell: (r) => r.cycle },
  { id: 'days', header: isTh ? 'วันตัดรอบ (ZBET003)' : 'Cut-off days (ZBET003)', cell: (r) => r.days },
];

const wageTypeCols = (isTh: boolean): DataTableColumn<WageTypeRow>[] => [
  { id: 'company', header: isTh ? 'บริษัท' : 'Company', cell: (r) => r.company, sortAccessor: (r) => r.company },
  { id: 'plan', header: isTh ? 'แผนสวัสดิการ' : 'Benefit plan', cell: (r) => r.plan },
  { id: 'infotype', header: isTh ? 'Infotype (SAP)' : 'Infotype (SAP)', cell: (r) => r.infotype },
  { id: 'wageCode', header: isTh ? 'รหัส Wage type (ZBET001)' : 'Wage type code (ZBET001)', cell: (r) => r.wageCode },
];

const periodCols = (isTh: boolean): DataTableColumn<PeriodRow>[] => [
  { id: 'company', header: isTh ? 'บริษัท' : 'Company', cell: (r) => r.company, sortAccessor: (r) => r.company },
  { id: 'plan', header: isTh ? 'แผนสวัสดิการ' : 'Benefit plan', cell: (r) => r.plan },
  { id: 'periodId', header: isTh ? 'รหัสรอบ (ZBET004)' : 'Period ID (ZBET004)', cell: (r) => r.periodId },
  { id: 'payDate', header: isTh ? 'วันจ่ายเงิน' : 'Pay date', cell: (r) => r.payDate },
];

const payStatusCols = (isTh: boolean): DataTableColumn<PaymentStatusRow>[] => [
  { id: 'employee', header: isTh ? 'พนักงาน' : 'Employee', cell: (r) => r.employee, sortAccessor: (r) => r.employee },
  { id: 'plan', header: isTh ? 'แผน' : 'Plan', cell: (r) => r.plan },
  { id: 'amount', header: isTh ? 'จำนวนเงิน' : 'Amount', cell: (r) => r.amount, align: 'right' },
  { id: 'status', header: isTh ? 'สถานะ' : 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  { id: 'blockReason', header: isTh ? 'เหตุผลที่ถูกระงับ' : 'Block reason', cell: (r) => r.blockReason },
];

// ── Page steps ───────────────────────────────────────────────────────────────

type CycleStep = {
  num: number;
  labelTh: string;
  labelEn: string;
  descTh: string;
  descEn: string;
  status: 'completed' | 'current' | 'pending';
  meta: string;
};

const CYCLE_STEPS: CycleStep[] = [
  {
    num: 1,
    labelTh: 'สร้างรอบการจ่าย',
    labelEn: 'Create payment period',
    descTh: 'กำหนดช่วงเวลาและบริษัทที่เกี่ยวข้อง',
    descEn: 'Define period window and companies in scope',
    status: 'completed',
    meta: 'Last run: 2026-04-30',
  },
  {
    num: 2,
    labelTh: 'ตรวจสอบเคลมที่อนุมัติ',
    labelEn: 'Validate approved claims',
    descTh: 'ตรวจสอบความถูกต้องของเคลมที่ผ่านการอนุมัติ',
    descEn: 'Validate claim data integrity for approved records',
    status: 'completed',
    meta: 'Last run: 2026-04-30',
  },
  {
    num: 3,
    labelTh: 'เตรียมไฟล์ส่งบัญชี',
    labelEn: 'Prepare finance export',
    descTh: 'สร้างไฟล์ส่งออกสำหรับระบบบัญชี',
    descEn: 'Generate export payload for finance system',
    status: 'current',
    meta: 'In progress — PP-2026-05',
  },
  {
    num: 4,
    labelTh: 'ดูตัวอย่างไฟล์ธนาคาร',
    labelEn: 'Preview bank file',
    descTh: 'ตรวจสอบไฟล์ธนาคารก่อนส่ง',
    descEn: 'Review bank transfer file before submission',
    status: 'pending',
    meta: 'Awaiting step 3',
  },
  {
    num: 5,
    labelTh: 'ปิดรอบ',
    labelEn: 'Close period',
    descTh: 'ยืนยันและปิดรอบการจ่ายเงิน',
    descEn: 'Confirm and close the payment period',
    status: 'pending',
    meta: 'Awaiting step 4',
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BenefitPaymentPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';

  return (
    <div className="space-y-8">

      {/* A) Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>
            {isTh ? 'สวัสดิการ · การจ่าย' : 'Benefits Admin · Payment'}
          </CardEyebrow>
          <h1 className="font-display text-3xl font-semibold text-ink">
            {isTh
              ? 'แดชบอร์ดการจ่ายสวัสดิการ (อ่านอย่างเดียว — Mockup)'
              : 'Benefit Payment Dashboard (Read-only — Mockup)'}
          </h1>
          <p className="mt-2 text-small text-ink-muted">
            {isTh
              ? 'เชื่อมต่อ SAP Payroll · BE-27 · ZBET001/003/004'
              : 'Connects to SAP Payroll · BE-27 · ZBET001/003/004'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {/* D) Disabled action buttons */}
          <Button
            variant="secondary"
            disabled
            title={isTh ? 'Post to finance (ปิดใช้งานในโหมด Mockup)' : 'Post to finance (Disabled in mockup)'}
          >
            {isTh ? 'Post to finance' : 'Post to finance'}
          </Button>
          <Button
            variant="secondary"
            disabled
            title={isTh ? 'Generate bank file (ปิดใช้งานในโหมด Mockup)' : 'Generate bank file (Disabled in mockup)'}
          >
            {isTh ? 'Generate bank file' : 'Generate bank file'}
          </Button>
          <Button
            variant="secondary"
            disabled
            title={isTh ? 'Copy Claim Data (ปิดใช้งานในโหมด Mockup)' : 'Copy Claim Data (Disabled in mockup)'}
          >
            {isTh ? 'Copy Claim Data' : 'Copy Claim Data'}
          </Button>
          <Button
            variant="secondary"
            disabled
            title={isTh ? 'Delete Claim Data (ปิดใช้งานในโหมด Mockup)' : 'Delete Claim Data (Disabled in mockup)'}
          >
            {isTh ? 'Delete Claim Data' : 'Delete Claim Data'}
          </Button>
        </div>
      </header>

      {/* B) Payment cycle 5 cards */}
      <section>
        <h2 className="mb-3 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {isTh ? 'วงจรการจ่าย (A-PY-01..05)' : 'Payment cycle (A-PY-01..05)'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CYCLE_STEPS.map((step) => (
            <Card key={step.num} variant="raised" size="md">
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas-soft text-[length:var(--text-eyebrow)] font-semibold text-ink-muted">
                  {step.num}
                </span>
                <StepChip
                  status={step.status}
                  label={
                    step.status === 'completed'
                      ? isTh ? 'เสร็จแล้ว' : 'Done'
                      : step.status === 'current'
                        ? isTh ? 'กำลังดำเนินการ' : 'Active'
                        : isTh ? 'รอดำเนินการ' : 'Pending'
                  }
                />
              </div>
              <p className="mt-2 text-small font-semibold text-ink">
                {isTh ? step.labelTh : step.labelEn}
              </p>
              <p className="mt-1 text-[length:var(--text-eyebrow)] text-ink-muted">
                {isTh ? step.descTh : step.descEn}
              </p>
              <p className="mt-2 text-[length:var(--text-eyebrow)] text-ink-muted">{step.meta}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* C1) Payment cut-off calendar */}
      <section>
        <h2 className="mb-3 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {isTh ? 'ตารางวันตัดรอบการจ่าย (A-PY-01 / ZBET003)' : 'Payment cut-off calendar (A-PY-01 / ZBET003)'}
        </h2>
        <DataTable
          caption={isTh ? 'ตารางวันตัดรอบการจ่าย' : 'Payment cut-off calendar'}
          columns={cutoffCols(isTh)}
          rows={MOCK_CUTOFF_CALENDAR}
          rowKey={(r) => r.company}
          dense
        />
      </section>

      {/* C2) Wage type mapping */}
      <section>
        <h2 className="mb-3 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {isTh ? 'การแมป Wage Type (A-PY-02 / ZBET001)' : 'Wage type mapping (A-PY-02 / ZBET001)'}
        </h2>
        <DataTable
          caption={isTh ? 'การแมป Wage Type' : 'Wage type mapping'}
          columns={wageTypeCols(isTh)}
          rows={MOCK_WAGE_TYPES}
          rowKey={(r) => `${r.company}-${r.wageCode}`}
          dense
        />
      </section>

      {/* C3) Payment period mapping */}
      <section>
        <h2 className="mb-3 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {isTh ? 'การแมปรอบการจ่าย (A-PY-03 / ZBET004)' : 'Payment period mapping (A-PY-03 / ZBET004)'}
        </h2>
        <DataTable
          caption={isTh ? 'การแมปรอบการจ่าย' : 'Payment period mapping'}
          columns={periodCols(isTh)}
          rows={MOCK_PERIOD_MAPPING}
          rowKey={(r) => `${r.company}-${r.periodId}`}
          dense
        />
      </section>

      {/* C4) Payment status dashboard */}
      <section>
        <h2 className="mb-3 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {isTh ? 'สถานะการจ่าย (A-PY-05)' : 'Payment status (A-PY-05)'}
        </h2>
        <DataTable
          caption={isTh ? 'สถานะการจ่าย' : 'Payment status'}
          columns={payStatusCols(isTh)}
          rows={MOCK_PAYMENT_STATUS}
          rowKey={(r) => r.employee}
          dense
        />
      </section>

      {/* E) Footer note */}
      <Card variant="raised" size="md">
        <CardEyebrow>Q21 · BE-27 · SAP ZBET001/003/004</CardEyebrow>
        <p className="mt-2 text-small text-ink-muted">
          {isTh
            ? 'งานจริง: ทำผ่าน SAP ZBER001/003 — UI นี้แสดงผลและตรวจสอบเท่านั้น (Q21 รอ confirm target payment system)'
            : 'Real execution: via SAP ZBER001/003 — this UI is read-only display. (Q21 awaiting confirm on payment target system)'}
        </p>
      </Card>

    </div>
  );
}
