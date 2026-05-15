'use client';

import { use } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CardEyebrow, CardTitle } from '@/components/humi';
import { RecordsFlatForm } from '@/components/benefits/templates/RecordsFlatForm';
import { RecordsDependentForm } from '@/components/benefits/templates/RecordsDependentForm';
import { RecordsComputedView } from '@/components/benefits/templates/RecordsComputedView';
import { getPlan } from '@/data/benefits/plan-registry';

// ── Per-plan template renderer ────────────────────────────────────────────────
// Switches on plan.template to render the correct Records template.
// Next 16: params is a Promise — unwrap with use().

interface PageProps {
  params: Promise<{ locale: string; planId: string }>;
}

export default function AdminBenefitRecordPlanPage({ params }: PageProps) {
  const { planId } = use(params);
  const locale = useLocale();
  const routeParams = useParams<{ locale: string }>();
  const loc = routeParams?.locale ?? locale ?? 'th';
  const isTh = loc !== 'en';

  const plan = getPlan(planId);

  if (!plan) {
    return (
      <div className="space-y-4">
        <CardEyebrow>{isTh ? 'ไม่พบแผน' : 'Plan not found'}</CardEyebrow>
        <p className="text-small text-ink-muted">
          {isTh ? `ไม่พบแผนสวัสดิการ: ${planId}` : `Benefit plan not found: ${planId}`}
        </p>
        <Link
          href={`/${loc}/admin/benefits/records`}
          className="text-small font-medium text-accent hover:underline"
        >
          {isTh ? '← กลับไปยังรายการ' : '← Back to records'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label={isTh ? 'เส้นทาง' : 'Breadcrumb'} className="flex items-center gap-2 text-small text-ink-muted">
        <Link
          href={`/${loc}/admin/benefits/records`}
          className="hover:text-ink hover:underline transition-colors"
        >
          {isTh ? 'บันทึกสวัสดิการ' : 'Benefit Records'}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink">{isTh ? plan.nameTh : plan.nameEn}</span>
      </nav>

      {/* Page header */}
      <header>
        <CardEyebrow>{plan.id}</CardEyebrow>
        <CardTitle>{isTh ? plan.nameTh : plan.nameEn}</CardTitle>
        <p className="mt-1 text-small text-ink-muted">
          {isTh ? plan.eligibilityTh : ('eligibilityEn' in plan ? plan.eligibilityEn : plan.eligibilityTh)}
        </p>
      </header>

      {/* Template switcher */}
      {plan.template === 'records-flat' && (
        <RecordsFlatForm plan={plan} />
      )}
      {plan.template === 'records-dependent' && (
        <RecordsDependentForm plan={plan} />
      )}
      {plan.template === 'records-computed' && (
        <RecordsComputedView plan={plan} />
      )}
      {plan.template !== 'records-flat' &&
        plan.template !== 'records-dependent' &&
        plan.template !== 'records-computed' && (
          <div className="rounded-[var(--radius-lg)] border border-hairline bg-canvas-soft px-6 py-8 text-center">
            <p className="text-small text-ink-muted">
              {isTh
                ? `เทมเพลต "${plan.template}" ไม่รองรับในหน้าบันทึก`
                : `Template "${plan.template}" is not a records template.`}
            </p>
            <Link
              href={`/${loc}/admin/benefits/records`}
              className="mt-3 inline-block text-small font-medium text-accent hover:underline"
            >
              {isTh ? '← กลับ' : '← Back'}
            </Link>
          </div>
        )}
    </div>
  );
}
