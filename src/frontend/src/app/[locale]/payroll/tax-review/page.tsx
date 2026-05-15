'use client';

import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AlertCircle, CheckCircle2, RotateCcw, ShieldCheck, XCircle } from 'lucide-react';
import { Button, Card, CardEyebrow, CardTitle, FormField, FormInput } from '@/components/humi';
import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';
import * as taxPlanning from '@/stores/benefit-tax-planning';

type PayrollTaxAction = (id: string, actor?: PayrollReviewer, note?: string) => unknown;
type PayrollTaxStoreActionName =
  | 'startPayrollTaxPlanningReview'
  | 'sendBackPayrollTaxPlanningReview'
  | 'approvePayrollTaxPlanningReview'
  | 'rejectPayrollTaxPlanningReview'
  | 'cancelTaxPlanningReview';

type PayrollReviewer = {
  role: 'payroll';
  name: string;
};

type PayrollTaxEstimateSummary = string | {
  grossAnnualIncome?: number;
  totalDeductions?: number;
  taxableIncome?: number;
  estimatedTax?: number;
  remainingDue?: number;
  refund?: number;
};

type PayrollTaxReviewRow = {
  id: string;
  workflowId?: string;
  employeeId?: string;
  employeeName: string;
  maskedTaxId?: string;
  taxYear?: number;
  status: string;
  statusLabel?: string;
  submittedAt?: string;
  updatedAt?: string;
  estimateSummary?: PayrollTaxEstimateSummary;
  remainingDue?: string;
  refund?: string;
  reviewerNote?: string;
  employeeVisibleReason?: string;
};

const STATUS_LABELS: Record<string, string> = {
  submitted_payroll: 'ส่งให้ Payroll แล้ว',
  payroll_reviewing: 'Payroll กำลังตรวจ',
  send_back: 'ส่งกลับให้พนักงานแก้ไข',
  approved: 'อนุมัติแผนแล้ว',
  rejected: 'ไม่อนุมัติแผน',
  cancelled: 'ยกเลิกคำขอ',
};

const reviewer: PayrollReviewer = {
  role: 'payroll',
  name: 'Payroll reviewer',
};

function describeEstimateSummary(summary: PayrollTaxEstimateSummary | undefined) {
  if (!summary) return null;
  if (typeof summary === 'string') return summary;
  const parts = [
    typeof summary.estimatedTax === 'number' ? `ภาษีประมาณการ ${taxPlanning.formatTHB(summary.estimatedTax)}` : null,
    typeof summary.remainingDue === 'number' && summary.remainingDue > 0 ? `ต้องชำระเพิ่ม ${taxPlanning.formatTHB(summary.remainingDue)}` : null,
    typeof summary.refund === 'number' && summary.refund > 0 ? `คาดว่าจะคืน ${taxPlanning.formatTHB(summary.refund)}` : null,
  ].filter(Boolean);
  return parts.join(' · ') || 'สรุปภาษีแสดงเฉพาะผลประมาณการ ไม่รวมรายละเอียด payroll เต็ม';
}

export default function PayrollTaxReviewPage() {
  const roles = useAuthStore((state) => state.roles);
  const username = useAuthStore((state) => state.username);
  const pathname = usePathname();
  const drafts = taxPlanning.useBenefitTaxPlanningStore((state) => state.drafts);
  const [reasonById, setReasonById] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  const locale = pathname?.startsWith('/th') ? 'th' : 'en';
  const canReviewTaxPlanning = canAccessModule(roles, 'payroll-processing');

  const rows = useMemo(() => {
    return taxPlanning.selectPayrollTaxPlanningInboxRows(drafts) as PayrollTaxReviewRow[];
  }, [drafts]);

  if (!canReviewTaxPlanning) {
    return (
      <Card variant="raised" size="lg">
        <CardEyebrow>Payroll tax review</CardEyebrow>
        <CardTitle>ไม่สามารถเข้าถึงการตรวจแผนภาษี</CardTitle>
        <p className="mt-2 text-small text-ink-muted">
          ใช้สิทธิ์เดียวกับ payroll-processing ชั่วคราวเพราะยังไม่มี role เฉพาะสำหรับ Payroll reviewer ในรอบนี้
        </p>
      </Card>
    );
  }

  function updateReason(id: string, value: string) {
    setReasonById((current) => ({ ...current, [id]: value }));
  }

  function runAction(row: PayrollTaxReviewRow, actionName: PayrollTaxStoreActionName, fallbackMessage: string, requireReason = false) {
    const note = (reasonById[row.id] ?? '').trim();
    if (requireReason && !note) {
      setMessage('กรุณาระบุเหตุผลก่อนส่งกลับหรือไม่อนุมัติ');
      return;
    }

    const storeActions = taxPlanning.useBenefitTaxPlanningStore.getState() as Record<PayrollTaxStoreActionName, PayrollTaxAction | undefined>;
    const action = storeActions[actionName];
    if (!action) {
      setMessage('ยังไม่สามารถบันทึกการตรวจแผนภาษีได้ กรุณาลองใหม่อีกครั้ง');
      return;
    }

    action(row.id, { ...reviewer, name: username ?? reviewer.name }, note || undefined);
    setMessage(fallbackMessage);
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardEyebrow>Payroll tax review</CardEyebrow>
          <h1 className="font-display text-3xl font-semibold text-ink">ตรวจแผนภาษี</h1>
          <p className="mt-2 max-w-3xl text-small text-ink-muted">
            ตรวจเฉพาะสรุปที่ปลอดภัยจาก Tax Planning ไม่แสดงเลขประจำตัวผู้เสียภาษีเต็ม รายละเอียดเงินเดือนเต็ม หรือข้อมูลบัญชีธนาคาร
          </p>
        </div>
        <a href={`/${locale}/payroll`} className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-accent px-4 text-small font-semibold text-accent hover:bg-accent-soft">
          กลับ Payroll
        </a>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <Card variant="raised" size="md">
          <CardEyebrow>Inbox</CardEyebrow>
          <p className="mt-1 font-display text-2xl font-semibold text-ink tabular-nums">{rows.length}</p>
          <p className="mt-1 text-small text-ink-muted">รายการรอ Payroll ตรวจ</p>
        </Card>
        <Card variant="raised" size="md">
          <CardEyebrow>Access gate</CardEyebrow>
          <p className="mt-1 text-body font-semibold text-ink">payroll-processing</p>
          <p className="mt-1 text-small text-ink-muted">ใช้สิทธิ์เดิมจนกว่าจะมี Payroll reviewer role เฉพาะ</p>
        </Card>
        <Card variant="raised" size="md">
          <CardEyebrow>PII guardrail</CardEyebrow>
          <p className="mt-1 text-body font-semibold text-ink">Masked summary only</p>
          <p className="mt-1 text-small text-ink-muted">Tax ID ถูก mask และไม่ดึง payroll snapshot เต็ม</p>
        </Card>
      </section>

      {message && (
        <Card variant="flat" size="md" tone="accent" role="status" aria-live="polite">
          <div className="flex items-start gap-3 text-small text-ink">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" aria-hidden="true" />
            <span>{message}</span>
          </div>
        </Card>
      )}

      <Card variant="raised" size="lg">
        <CardEyebrow>Review queue</CardEyebrow>
        <CardTitle>รายการตรวจแผนภาษีจากพนักงาน</CardTitle>
        <p className="mt-2 text-small text-ink-muted">
          แสดงเฉพาะสรุปที่ Payroll ใช้ตรวจ อนุมัติ ส่งกลับ หรือไม่อนุมัติ โดยไม่แก้ไขรายละเอียดลดหย่อนของพนักงานโดยตรง
        </p>

        <div className="mt-5 space-y-4">
          {rows.length === 0 ? (
            <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-5 text-small text-ink-muted">
              ยังไม่มีคำขอตรวจแผนภาษีจากพนักงาน
            </div>
          ) : (
            rows.map((row) => (
              <article key={row.id} className="rounded-[var(--radius-md)] border border-hairline bg-surface p-4 shadow-[var(--shadow-sm)]">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-body font-semibold text-ink">{row.employeeName}</h2>
                      <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-accent">
                        {row.statusLabel ?? STATUS_LABELS[row.status] ?? row.status}
                      </span>
                    </div>
                    <dl className="mt-3 grid gap-2 text-small text-ink-muted sm:grid-cols-2 lg:grid-cols-4">
                      <div><dt className="font-semibold text-ink">Employee</dt><dd>{row.employeeId ?? row.id}</dd></div>
                      <div><dt className="font-semibold text-ink">Tax ID</dt><dd>{row.maskedTaxId ?? '***-***-****'}</dd></div>
                      <div><dt className="font-semibold text-ink">Tax year</dt><dd>{row.taxYear ?? '2026'}</dd></div>
                      <div><dt className="font-semibold text-ink">Updated</dt><dd>{row.submittedAt ?? row.updatedAt ?? 'รอข้อมูลล่าสุด'}</dd></div>
                    </dl>
                    <p className="mt-3 text-small text-ink">{describeEstimateSummary(row.estimateSummary) ?? row.remainingDue ?? row.refund ?? 'สรุปภาษีแสดงเฉพาะผลประมาณการ ไม่รวมรายละเอียด payroll เต็ม'}</p>
                    {row.employeeVisibleReason && <p className="mt-2 text-small text-ink-muted">เหตุผลที่เห็นโดยพนักงาน: {row.employeeVisibleReason}</p>}
                  </div>

                  <div className="min-w-full space-y-3 lg:min-w-[320px]">
                    <FormField label="เหตุผลหรือหมายเหตุ Payroll" help="จำเป็นเมื่อส่งกลับหรือไม่อนุมัติ">
                      {(controlProps) => (
                        <FormInput
                          {...controlProps}
                          value={reasonById[row.id] ?? ''}
                          onChange={(event) => updateReason(row.id, event.target.value)}
                          placeholder="เช่น ขอเอกสารลดหย่อนเพิ่มเติม"
                        />
                      )}
                    </FormField>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        leadingIcon={<RotateCcw className="h-4 w-4" />}
                        onClick={() => runAction(row, 'startPayrollTaxPlanningReview', 'เริ่มตรวจแผนภาษีแล้ว')}
                      >
                        เริ่มตรวจ
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        leadingIcon={<AlertCircle className="h-4 w-4" />}
                        onClick={() => runAction(row, 'sendBackPayrollTaxPlanningReview', 'ส่งกลับให้พนักงานแก้ไขแล้ว', true)}
                      >
                        ส่งกลับ
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        leadingIcon={<CheckCircle2 className="h-4 w-4" />}
                        onClick={() => runAction(row, 'approvePayrollTaxPlanningReview', 'อนุมัติแผนภาษีแล้ว')}
                      >
                        อนุมัติ
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leadingIcon={<XCircle className="h-4 w-4" />}
                        onClick={() => runAction(row, 'rejectPayrollTaxPlanningReview', 'ไม่อนุมัติแผนภาษีแล้ว', true)}
                      >
                        ไม่อนุมัติ
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => runAction(row, 'cancelTaxPlanningReview', 'ยกเลิกคำขอตรวจแผนภาษีแล้ว')}
                      >
                        ยกเลิกรีวิว
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
