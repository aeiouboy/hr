'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ClipboardList } from 'lucide-react';
import { Card, CardEyebrow, Button, buttonVariants } from '@/components/humi';
import { SimpleClaimForm, type SimpleClaimSubmission } from '@/components/benefits/templates';
import { BENEFIT_PLAN_REGISTRY, type BenefitPlan } from '@/data/benefits/plan-registry';
import { benefitsHubRoute } from '@/lib/benefit-routes';
import { HUMI_CLAIM_ALLOWANCES } from '@/lib/humi-mock-data';
import { useBenefitClaimsStore, type BenefitClaimInput, type BenefitClaimType } from '@/stores/benefit-claims';

const REGISTERED_SIMPLE_PLANS = BENEFIT_PLAN_REGISTRY.filter(
  (p) => p.template === 'simple-claim' && p.recordType === 'claimable',
);

const gasPlan = REGISTERED_SIMPLE_PLANS.find((p) => p.id === 'BE-GAS-001');
const createMobileClaimPlan = (basePlan: BenefitPlan): BenefitPlan => {
  const mobileOverrides = {
    id: 'BE-MOB-001',
    ttt: 'BE_MOB_LOCAL',
    nameTh: 'ค่าโทรศัพท์',
    nameEn: 'Mobile Phone Reimbursement',
    annualLimitThb: 9600,
    requiredDocsTh: ['ใบแจ้งค่าบริการโทรศัพท์', 'ใบเสร็จรับเงิน'],
    requiredDocsEn: ['Mobile bill', 'Receipt'],
    eligibilityTh: 'พนักงานที่ได้รับสิทธิ์ค่าโทรศัพท์รายเดือน',
  };

  return basePlan.schemaVersion === 'v2'
    ? {
        ...basePlan,
        ...mobileOverrides,
        eligibilityEn: 'Employees with monthly mobile allowance entitlement',
      }
    : {
        ...basePlan,
        ...mobileOverrides,
      };
};
const mobileClaimPlan = createMobileClaimPlan(gasPlan ?? REGISTERED_SIMPLE_PLANS[0]);

const SIMPLE_PLANS = [
  ...REGISTERED_SIMPLE_PLANS,
  mobileClaimPlan,
];

const allowanceRemaining = (allowanceId: string) => {
  const allowance = HUMI_CLAIM_ALLOWANCES.find((item) => item.id === allowanceId);
  return allowance ? Math.max(0, allowance.limit - allowance.used) : undefined;
};

const ALLOWANCE_TO_PLAN: Record<string, {
  planId: string;
  benefitType: BenefitClaimType;
  remainingAmount?: number;
}> = {
  'ca-medical': { planId: 'BE-MED-001', benefitType: 'medical', remainingAmount: 25600 },
  'ca-dental': { planId: 'BE-DEN-001', benefitType: 'medical', remainingAmount: allowanceRemaining('ca-dental') },
  'ca-phone': { planId: 'BE-MOB-001', benefitType: 'mobile', remainingAmount: allowanceRemaining('ca-phone') },
  'ca-fuel': { planId: 'BE-GAS-001', benefitType: 'gasoline', remainingAmount: allowanceRemaining('ca-fuel') },
};

const PLAN_TYPE_FALLBACK: Partial<Record<string, BenefitClaimType>> = {
  'BE-MED-001': 'medical',
  'BE-DEN-001': 'medical',
  'BE-MOB-001': 'mobile',
  'BE-GAS-001': 'gasoline',
};

type BenefitClaimInputWithLaneC = BenefitClaimInput & {
  claimDate?: string;
  remark?: string;
};

export default function ReimbursementPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const searchParams = useSearchParams();
  const initialAllowance = searchParams.get('allowance') ?? '';
  const initialMappedPlanId = ALLOWANCE_TO_PLAN[initialAllowance]?.planId;
  const [selectedId, setSelectedId] = useState(initialMappedPlanId ?? SIMPLE_PLANS[0]?.id ?? '');
  const selected = SIMPLE_PLANS.find((p) => p.id === selectedId) ?? SIMPLE_PLANS[0];
  const selectedMapping = Object.values(ALLOWANCE_TO_PLAN).find((mapping) => mapping.planId === selected?.id);
  const benefitType = selectedMapping?.benefitType ?? PLAN_TYPE_FALLBACK[selected?.id ?? ''] ?? 'medical';
  const remainingAmount = selectedMapping?.remainingAmount ?? selected?.annualLimitThb ?? undefined;
  const submitClaim = useBenefitClaimsStore((s) => s.submitClaim);
  const [lastClaim, setLastClaim] = useState<{ id: string; workflowRequestId: string } | null>(null);

  // STA-63 — persist into the claims store (visible at /requests, /quick-approve, /admin/benefits/records)
  const handleSubmitted = (wfId: string, submission?: SimpleClaimSubmission) => {
    if (!selected) return;
    const receiptDate = submission?.receiptDate ?? new Date().toISOString().slice(0, 10);
    const claimInput: BenefitClaimInputWithLaneC = {
      benefitCode: selected.id,
      benefitName: isTh ? selected.nameTh : selected.nameEn,
      benefitType,
      remainingAmount,
      receiptNo: submission?.receiptNo || wfId,
      receiptDate,
      receiptAmount: submission?.receiptAmount ?? 0,
      totalClaimAmount: submission?.totalClaimAmount ?? submission?.receiptAmount ?? 0,
      claimDate: submission?.claimDate,
      remark: submission?.remark,
    };
    const claim = submitClaim(claimInput);
    setLastClaim({ id: claim.id, workflowRequestId: claim.workflowRequestId });
    setTimeout(() => setLastClaim(null), 6000);
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <CardEyebrow>
            {isTh ? 'สวัสดิการ · เบิกตามใบเสร็จ' : 'Benefits · Receipt-based claim'}
          </CardEyebrow>
          <h1 className="font-display text-[length:var(--text-display-h1)] font-semibold leading-[var(--text-display-h1--line-height)] tracking-tight text-ink">
            {isTh ? 'เบิกสวัสดิการ' : 'Reimbursement'}
          </h1>
          <p className="max-w-2xl text-body leading-relaxed text-ink-soft">
            {isTh
              ? 'ส่งคำขอเบิกย้อนหลังตามใบเสร็จ — เลือกประเภทสวัสดิการแล้วกรอกแบบฟอร์ม'
              : 'Submit a retroactive receipt-based claim — choose a benefit type then fill in the form.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={benefitsHubRoute(locale)} className={buttonVariants({ variant: 'ghost' })}>
            <ArrowLeft size={14} aria-hidden />
            {isTh ? 'กลับ Benefits Hub' : 'Back to Benefits Hub'}
          </Link>
          <Link href={`/${locale}/requests`} className={buttonVariants({ variant: 'secondary' })}>
            <ClipboardList size={14} aria-hidden />
            {isTh ? 'ติดตามคำขอ' : 'Track requests'}
          </Link>
        </div>
      </header>

      {/* Plan picker */}
      <Card size="md" className="p-5">
        <CardEyebrow>{isTh ? 'เลือกประเภทเบิก' : 'Choose claim type'}</CardEyebrow>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIMPLE_PLANS.map((p) => (
            <Button
              key={p.id}
              variant={p.id === selectedId ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedId(p.id)}
            >
              {isTh ? p.nameTh : p.nameEn}
            </Button>
          ))}
        </div>
      </Card>

      {/* STA-63 — success card replaces prior console.log */}
      {lastClaim && (
        <Card variant="raised" size="md" className="border-success/30 bg-success-soft">
          <CardEyebrow>{isTh ? 'ส่งคำขอสำเร็จ' : 'Claim submitted'}</CardEyebrow>
          <p className="mt-2 text-small text-success">
            {isTh
              ? `บันทึกคำขอ ${lastClaim.workflowRequestId} แล้ว — ติดตามได้ที่หน้า "คำขอของฉัน" และคิว SPD จะเห็นรายการนี้`
              : `Saved request ${lastClaim.workflowRequestId} — visible in "My requests" and the SPD queue.`}
          </p>
          <Link
            href={`/${locale}/requests`}
            className="mt-3 inline-block text-small font-semibold text-success underline"
          >
            {isTh ? 'ไปยังคำขอของฉัน →' : 'Go to my requests →'}
          </Link>
        </Card>
      )}

      {/* Claim form — mounts appropriate template */}
      {selected && (
        <SimpleClaimForm
          plan={selected}
          selectedBenefitLabel={isTh ? selected.nameTh : selected.nameEn}
          remainingAmount={remainingAmount}
          onSubmitted={handleSubmitted}
        />
      )}
    </div>
  );
}
