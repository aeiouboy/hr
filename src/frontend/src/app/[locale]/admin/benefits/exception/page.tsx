'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardEyebrow,
  CardTitle,
  DataTable,
  Button,
  EmptyState,
} from '@/components/humi';
import type { DataTableColumn } from '@/components/humi';
import { AsOfDatePicker } from '@/components/benefits/AsOfDatePicker';
import { RecordsFlatForm } from '@/components/benefits/templates/RecordsFlatForm';
import type { RecordsFlatFormExceptionSource } from '@/components/benefits/templates/RecordsFlatForm';
import {
  useBenefitClaimsStore,
  BENEFIT_TYPE_LABEL,
  type BenefitClaimRequest,
} from '@/stores/benefit-claims';
import { mockSubmit } from '@/lib/mock-async';

// ── Dummy plan stub required by RecordsFlatForm (exception mode ignores it) ──
// RecordsFlatForm expects a `plan` prop shape for the normal-mode branch.
// In exception mode the header is overridden, so we pass minimal shape.
const EXCEPTION_PLAN_STUB = {
  id: 'exc-plan',
  nameTh: 'รายการพิเศษ',
  nameEn: 'Exception',
  eligibilityTh: '',
  eligibilityEn: '',
  requiredDocsTh: [] as string[],
  requiredDocsEn: [] as string[],
  annualLimitThb: null as number | null,
  approvalChain: [] as never[],
  templateType: 'records-flat' as const,
  planKey: 'exc',
  category: 'exception' as never,
};

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BenefitExceptionPage() {
  const locale = useLocale();
  const params = useParams<{ locale: string }>();
  const loc = params?.locale ?? locale ?? 'th';
  const isTh = loc !== 'en';

  const claims = useBenefitClaimsStore((s) => s.claims);

  // Filter: approved claims with positive amount only
  const approvedClaims = claims.filter(
    (c) => c.status === 'approved' && c.totalClaimAmount > 0,
  );

  const [asOfDate, setAsOfDate] = useState<string>('');
  const [selectedClaim, setSelectedClaim] = useState<BenefitClaimRequest | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lastExceptionId, setLastExceptionId] = useState<string | null>(null);

  const exceptionSource: RecordsFlatFormExceptionSource | null = selectedClaim
    ? {
        claimId: selectedClaim.id,
        amount: selectedClaim.totalClaimAmount,
        planKey: selectedClaim.benefitCode,
      }
    : null;

  const handleFormSubmitted = async (wfId: string) => {
    await mockSubmit({
      exceptionId: wfId,
      asOfDate,
      source: exceptionSource,
      reversal: {
        claimId: selectedClaim?.id,
        amount: -(selectedClaim?.totalClaimAmount ?? 0),
      },
    });
    setLastExceptionId(wfId);
    setSubmitted(true);
    setSelectedClaim(null);
  };

  const columns: DataTableColumn<BenefitClaimRequest>[] = [
    {
      id: 'id',
      header: isTh ? 'รหัสเคลม' : 'Claim ID',
      cell: (row) => (
        <span className="font-mono text-small text-ink">{row.id}</span>
      ),
      sortAccessor: (row) => row.id,
    },
    {
      id: 'employee',
      header: isTh ? 'พนักงาน' : 'Employee',
      cell: (row) => (
        <div>
          <p className="font-medium text-ink">{row.employeeName}</p>
          <p className="text-small text-ink-muted">{row.employeeId}</p>
        </div>
      ),
      sortAccessor: (row) => row.employeeName,
    },
    {
      id: 'benefit',
      header: isTh ? 'สวัสดิการ' : 'Benefit',
      cell: (row) => (
        <div>
          <p className="text-small text-ink">{BENEFIT_TYPE_LABEL[row.benefitType]}</p>
          <p className="text-small text-ink-muted">{row.benefitCode}</p>
        </div>
      ),
    },
    {
      id: 'amount',
      header: isTh ? 'จำนวน (บาท)' : 'Amount (THB)',
      align: 'right',
      cell: (row) => (
        <span className="font-semibold text-ink">
          {row.totalClaimAmount.toLocaleString('th-TH')}
        </span>
      ),
      sortAccessor: (row) => row.totalClaimAmount,
    },
    {
      id: 'date',
      header: isTh ? 'วันที่ใบเสร็จ' : 'Receipt date',
      cell: (row) => (
        <span className="text-small text-ink-muted">{row.receiptDate}</span>
      ),
      sortAccessor: (row) => row.receiptDate,
    },
    {
      id: 'receipt',
      header: isTh ? 'เลขที่ใบเสร็จ' : 'Receipt no.',
      cell: (row) => (
        <span className="text-small text-ink-muted">{row.receiptNo}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <CardEyebrow>
          {isTh ? 'สวัสดิการ · รายการพิเศษ' : 'Benefits admin · Exception'}
        </CardEyebrow>
        <h1 className="font-display text-3xl font-semibold text-ink">
          {isTh ? 'รายการพิเศษ (Borrow-forward)' : 'Benefits Exception (Borrow-forward)'}
        </h1>
        <p className="mt-2 text-small text-ink-muted">
          {isTh
            ? 'เครดิตคืนเคลมเดิม + บันทึกรายการใหม่ในรอบใหม่'
            : 'Reverse a prior claim and create a new entry in the next period'}
        </p>
      </header>

      {/* As-of date */}
      <Card variant="raised" size="lg">
        <CardTitle>{isTh ? 'กำหนดรอบบัญชี' : 'Accounting period'}</CardTitle>
        <p className="mt-1 mb-4 text-small text-ink-muted">
          {isTh
            ? 'วันที่ที่รายการพิเศษจะถูกบันทึก'
            : 'Date the exception entry will be posted'}
        </p>
        <div className="max-w-xs">
          <AsOfDatePicker
            value={asOfDate}
            onChange={setAsOfDate}
            isTh={isTh}
            label={isTh ? 'วันที่บันทึกรายการ' : 'Entry as-of date'}
            showBuddhistToggle
          />
        </div>
      </Card>

      {/* Success toast */}
      {submitted && lastExceptionId && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-[var(--radius-md)] bg-success-soft p-4 text-ink"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden />
          <div>
            <p className="font-semibold">
              {isTh ? 'บันทึกรายการพิเศษเรียบร้อย' : 'Exception saved'}
            </p>
            <p className="text-small text-ink-muted">
              {isTh
                ? `รหัสรายการ: ${lastExceptionId}`
                : `Exception ID: ${lastExceptionId}`}
            </p>
          </div>
          <Button
            variant="ghost"
            className="ml-auto"
            onClick={() => {
              setSubmitted(false);
              setLastExceptionId(null);
            }}
          >
            {isTh ? 'ปิด' : 'Dismiss'}
          </Button>
        </div>
      )}

      {/* Source claim picker */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <ArrowLeftRight className="h-4 w-4 text-ink-muted" aria-hidden />
          <h2 className="font-semibold text-ink">
            {isTh ? 'เลือกเคลมต้นทาง' : 'Select source claim'}
          </h2>
        </div>
        <p className="mb-4 text-small text-ink-muted">
          {isTh
            ? 'เลือกรายการเคลมที่อนุมัติแล้วที่ต้องการเครดิตคืน (คลิกที่แถว)'
            : 'Click a row to select an approved claim to reverse'}
        </p>

        {approvedClaims.length === 0 ? (
          <EmptyState
            icon={ArrowLeftRight}
            titleTh="ไม่มีเคลมที่อนุมัติแล้ว"
            titleEn="No approved claims"
            descTh="ยังไม่มีเคลมที่มีสถานะอนุมัติแล้วสำหรับการเครดิตคืน"
            descEn="No approved claims are available for reversal."
          />
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-hairline">
            <DataTable
              caption={isTh ? 'รายการเคลมที่อนุมัติแล้ว' : 'Approved claims'}
              captionVisuallyHidden
              columns={columns}
              rows={approvedClaims}
              rowKey={(row) => row.id}
              dense
              onRowClick={(row) => {
                setSelectedClaim((prev) => (prev?.id === row.id ? null : row));
                setSubmitted(false);
              }}
              emptyState={
                <p className="py-6 text-center text-small text-ink-muted">
                  {isTh ? 'ไม่มีรายการ' : 'No records'}
                </p>
              }
            />
          </div>
        )}

        {/* Selected claim indicator */}
        {selectedClaim && (
          <div className="mt-3 flex items-center gap-2 rounded-[var(--radius-md)] border border-accent bg-accent-soft px-4 py-2 text-small">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden />
            <span className="text-ink">
              {isTh
                ? `เลือก: ${selectedClaim.id} · ${selectedClaim.employeeName} · ฿${selectedClaim.totalClaimAmount.toLocaleString('th-TH')}`
                : `Selected: ${selectedClaim.id} · ${selectedClaim.employeeName} · ฿${selectedClaim.totalClaimAmount.toLocaleString('th-TH')}`}
            </span>
            <button
              className="ml-auto text-ink-muted underline hover:text-ink"
              onClick={() => setSelectedClaim(null)}
            >
              {isTh ? 'ยกเลิก' : 'Clear'}
            </button>
          </div>
        )}
      </section>

      {/* Borrow-forward form — shown only after source claim selected */}
      {selectedClaim ? (
        <RecordsFlatForm
          plan={EXCEPTION_PLAN_STUB as never}
          mode="exception"
          exceptionSource={exceptionSource}
          onSubmitted={handleFormSubmitted}
        />
      ) : (
        <Card variant="raised" size="lg">
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <ArrowLeftRight className="h-8 w-8 text-ink-faint" aria-hidden />
            <p className="text-small text-ink-muted">
              {isTh ? 'ยังไม่ได้เลือกเคลมต้นทาง' : 'No source claim selected yet'}
            </p>
            <p className="text-small text-ink-faint">
              {isTh
                ? 'เลือกเคลมจากตารางด้านบนเพื่อเริ่มต้นรายการพิเศษ'
                : 'Select a claim from the table above to begin the exception entry'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
