'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button, Card, CardEyebrow, CardTitle, DataTable, buttonVariants } from '@/components/humi';
import type { DataTableColumn } from '@/components/humi/organisms/DataTable';
import { useBenefitClaimsStore, BENEFIT_STATUS_LABEL, BENEFIT_TYPE_LABEL } from '@/stores/benefit-claims';
import type { BenefitClaimRequest, BenefitClaimStatus } from '@/stores/benefit-claims';
import { ClaimDetailModal } from '@/components/benefits/ClaimDetailModal';
import { benefitsHubRoute } from '@/lib/benefit-routes';

// ── Claim history — own claims only ──────────────────────────────────────────

const STATUS_CHIP: Record<BenefitClaimStatus, { labelTh: string; className: string }> = {
  pending_manager_approval: { labelTh: 'รออนุมัติจากหัวหน้า', className: 'bg-warning-soft text-warning border border-warning/30' },
  pending_spd: { labelTh: 'รออนุมัติ',   className: 'bg-warning-soft text-warning border border-warning/30' },
  send_back:   { labelTh: 'ส่งคืน',      className: 'bg-accent-soft text-accent border border-accent/30' },
  approved:    { labelTh: 'อนุมัติแล้ว', className: 'bg-success-soft text-success border border-success/30' },
  rejected:    { labelTh: 'ปฏิเสธ',      className: 'bg-danger-soft text-danger border border-danger/30' },
  cancelled:   { labelTh: 'ยกเลิกแล้ว',  className: 'bg-canvas-soft text-ink-muted border border-hairline' },
};

function StatusChip({ status, isTh }: { status: BenefitClaimStatus; isTh: boolean }) {
  const chip = STATUS_CHIP[status];
  return (
    <span className={`inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.1em] ${chip.className}`}>
      {isTh ? chip.labelTh : BENEFIT_STATUS_LABEL[status]}
    </span>
  );
}

const MOCK_CURRENT_EMPLOYEE_ID = 'EMP001';

export default function ClaimHistoryPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const t = useTranslations('benefits');
  // STA-159 — which own-claim's read-only detail modal is open (null = closed).
  const [detailTarget, setDetailTarget] = useState<BenefitClaimRequest | null>(null);

  const allClaims = useBenefitClaimsStore((s) => s.claims);
  const ownClaims = allClaims.filter((c) => c.employeeId === MOCK_CURRENT_EMPLOYEE_ID);

  const totalClaimed = ownClaims.reduce((sum, c) => sum + c.totalClaimAmount, 0);
  const approvedCount = ownClaims.filter((c) => c.status === 'approved').length;
  const pendingCount = ownClaims.filter((c) => c.status === 'pending_spd' || c.status === 'pending_manager_approval').length;

  const columns: DataTableColumn<BenefitClaimRequest>[] = [
    {
      id: 'workflowRequestId',
      header: isTh ? 'รหัสคำขอ' : 'Request ID',
      cell: (c) => (
        <span className="font-mono text-[length:var(--text-eyebrow)] font-semibold text-ink">
          {c.workflowRequestId}
        </span>
      ),
      sortAccessor: (c) => c.workflowRequestId,
      className: 'w-36',
    },
    {
      id: 'benefitType',
      header: isTh ? 'ประเภทสวัสดิการ' : 'Benefit type',
      cell: (c) => (
        <span className="text-small text-ink">
          {isTh ? c.benefitName : (BENEFIT_TYPE_LABEL[c.benefitType] ?? c.benefitName)}
        </span>
      ),
      sortAccessor: (c) => c.benefitType,
    },
    {
      id: 'receiptNo',
      header: isTh ? 'เลขที่ใบเสร็จ' : 'Receipt no.',
      cell: (c) => <span className="text-small text-ink-muted">{c.receiptNo}</span>,
      sortAccessor: (c) => c.receiptNo,
      className: 'w-36',
    },
    {
      id: 'receiptDate',
      header: isTh ? 'วันที่ใบเสร็จ' : 'Receipt date',
      cell: (c) => <span className="text-small tabular-nums text-ink-muted">{c.receiptDate}</span>,
      sortAccessor: (c) => c.receiptDate,
      className: 'w-32',
    },
    {
      id: 'totalClaimAmount',
      header: isTh ? 'จำนวนเงิน (บาท)' : 'Amount (THB)',
      cell: (c) => (
        <span className="tabular-nums text-small text-ink">
          ฿{c.totalClaimAmount.toLocaleString('th-TH')}
        </span>
      ),
      sortAccessor: (c) => c.totalClaimAmount,
      align: 'right',
      className: 'w-32',
    },
    {
      id: 'status',
      header: isTh ? 'สถานะ' : 'Status',
      cell: (c) => <StatusChip status={c.status} isTh={isTh} />,
      sortAccessor: (c) => c.status,
      className: 'w-32',
    },
    {
      id: 'submittedAt',
      header: isTh ? 'วันที่ส่ง' : 'Submitted',
      cell: (c) => (
        <span className="text-small tabular-nums text-ink-muted">
          {new Date(c.submittedAt).toLocaleDateString(isTh ? 'th-TH' : 'en-GB')}
        </span>
      ),
      sortAccessor: (c) => c.submittedAt,
      className: 'w-32',
    },
    {
      id: 'actions',
      header: t('moreDetail'),
      headerVisuallyHidden: true,
      cell: (c) => (
        <Button
          variant="ghost"
          size="sm"
          aria-label={t('moreDetail')}
          onClick={() => setDetailTarget(c)}
        >
          <FileText size={16} aria-hidden />
        </Button>
      ),
      align: 'right',
      className: 'w-12',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <CardEyebrow>
            {isTh ? 'สวัสดิการ · ประวัติคำขอ' : 'Benefits · Claim history'}
          </CardEyebrow>
          <h1 className="font-display text-[length:var(--text-display-h1)] font-semibold leading-[var(--text-display-h1--line-height)] tracking-tight text-ink">
            {isTh ? 'ประวัติการเบิกสวัสดิการ' : 'Claim History'}
          </h1>
          <p className="max-w-2xl text-body leading-relaxed text-ink-soft">
            {isTh
              ? 'รายการคำขอเบิกสวัสดิการทั้งหมดของคุณ พร้อมสถานะและจำนวนเงิน'
              : 'All your benefit claim requests with status and amounts.'}
          </p>
        </div>
        <Link href={benefitsHubRoute(locale)} className={buttonVariants({ variant: 'ghost' })}>
          <ArrowLeft size={14} aria-hidden />
          {isTh ? 'กลับ Benefits Hub' : 'Back to Benefits Hub'}
        </Link>
      </header>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Card variant="raised" size="md">
          <CardEyebrow>{isTh ? 'คำขอทั้งหมด' : 'Total claims'}</CardEyebrow>
          <p className="mt-1 font-display text-2xl font-semibold text-ink tabular-nums">{ownClaims.length}</p>
        </Card>
        <Card variant="raised" size="md">
          <CardEyebrow>{isTh ? 'อนุมัติแล้ว' : 'Approved'}</CardEyebrow>
          <p className="mt-1 font-display text-2xl font-semibold text-success tabular-nums">{approvedCount}</p>
        </Card>
        <Card variant="raised" size="md">
          <CardEyebrow>{isTh ? 'รออนุมัติ' : 'Pending'}</CardEyebrow>
          <p className="mt-1 font-display text-2xl font-semibold text-warning tabular-nums">{pendingCount}</p>
        </Card>
      </div>

      {/* Total amount bar */}
      {ownClaims.length > 0 && (
        <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft px-5 py-4">
          <p className="text-small text-ink-muted">
            {isTh ? 'ยอดรวมที่เบิก' : 'Total claimed amount'}
          </p>
          <p className="mt-1 font-display text-3xl font-semibold text-ink tabular-nums">
            ฿{totalClaimed.toLocaleString('th-TH')}
          </p>
        </div>
      )}

      {/* Claims table */}
      <DataTable
        caption={isTh ? 'ประวัติการเบิกสวัสดิการของคุณ' : 'Your benefit claim history'}
        captionVisuallyHidden
        columns={columns}
        rows={ownClaims}
        rowKey={(c) => c.id}
        dense
        emptyState={
          <div className="text-center">
            <p className="text-body font-medium text-ink">
              {isTh ? 'ยังไม่มีประวัติการเบิก' : 'No claims yet'}
            </p>
            <p className="mt-1 text-small text-ink-muted">
              {isTh
                ? 'คำขอเบิกสวัสดิการที่คุณส่งจะปรากฏที่นี่'
                : 'Benefit claims you submit will appear here.'}
            </p>
          </div>
        }
      />

      {ownClaims.length === 0 && (
        <Card variant="raised" size="md">
          <CardTitle>{isTh ? 'เริ่มต้นเบิกสวัสดิการ' : 'Start a new claim'}</CardTitle>
          <p className="mt-2 text-small text-ink-muted">
            {isTh
              ? 'ไปที่ Benefits Hub เพื่อส่งคำขอเบิกสวัสดิการ'
              : 'Go to Benefits Hub to submit your first claim.'}
          </p>
          <div className="mt-4">
            <Link href={benefitsHubRoute(locale)} className={buttonVariants({ variant: 'primary' })}>
              {isTh ? 'ไปยัง Benefits Hub' : 'Go to Benefits Hub'}
            </Link>
          </div>
        </Card>
      )}

      {/* STA-159 — read-only claim-detail modal (Option C: unwrapped ClaimPayload). */}
      <ClaimDetailModal
        claim={detailTarget}
        open={detailTarget !== null}
        onClose={() => setDetailTarget(null)}
      />
    </div>
  );
}
