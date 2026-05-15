'use client';

import { useState, type ComponentType } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Award, Flower2, Gift, Shield, Users, FolderOpen, RefreshCw, type LucideProps } from 'lucide-react';
import { Card, CardEyebrow, CardTitle, EmptyState } from '@/components/humi';
import {
  getPlansByCategory,
  type PlanCategory,
} from '@/data/benefits/plan-registry';

// ── Admin Benefits Records landing ─────────────────────────────────────────
// Categories: funeral, wreath, gift, beneficiary, life
// HR selects a category chip then picks a plan to open the per-plan form.

type CategoryIcon = ComponentType<LucideProps>;

const RECORD_CATEGORIES: { id: PlanCategory; labelTh: string; labelEn: string; Icon: CategoryIcon }[] = [
  { id: 'funeral',     labelTh: 'ฌาปนกิจ',             labelEn: 'Funeral',      Icon: Flower2 },
  { id: 'wreath',      labelTh: 'พวงหรีด',              labelEn: 'Wreath',       Icon: Award },
  { id: 'gift',        labelTh: 'ของเยี่ยม / ช่วยเหลือ', labelEn: 'Gifts',       Icon: Gift },
  { id: 'beneficiary', labelTh: 'ผู้รับผลประโยชน์',      labelEn: 'Beneficiary', Icon: Users },
  { id: 'life',        labelTh: 'ประกันชีวิต',           labelEn: 'Life',         Icon: Shield },
  { id: 'lifecycle',   labelTh: 'วงจรสวัสดิการ',         labelEn: 'Lifecycle',    Icon: RefreshCw },
];

export default function AdminBenefitRecordsPage() {
  const locale = useLocale();
  const params = useParams<{ locale: string }>();
  const loc = params?.locale ?? locale ?? 'th';
  const isTh = loc !== 'en';

  const [activeCategory, setActiveCategory] = useState<PlanCategory>('funeral');
  const plans = getPlansByCategory(activeCategory);

  return (
    <div className="space-y-6">
      <header>
        <CardEyebrow>
          {isTh ? 'สวัสดิการ · บันทึกโดย HR' : 'Benefits admin · HR records'}
        </CardEyebrow>
        <h1 className="font-display text-[28px] font-semibold text-ink">
          {isTh ? 'บันทึกสวัสดิการพิเศษ' : 'Benefit Records'}
        </h1>
        <p className="mt-2 text-small text-ink-muted">
          {isTh
            ? 'บันทึกสวัสดิการที่ HR ดำเนินการเองโดยตรง ไม่มีขั้นตอนการอนุมัติ'
            : 'Admin-only records. No approval chain — logged directly by HR.'}
        </p>
      </header>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={isTh ? 'หมวดหมู่สวัสดิการ' : 'Benefit categories'}>
        {RECORD_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={[
                'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-small font-medium transition-colors',
                'border border-hairline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                isActive
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface text-ink-soft hover:bg-canvas-soft hover:text-ink',
              ].join(' ')}
            >
              <cat.Icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />
              {isTh ? cat.labelTh : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Plan list for active category */}
      <section role="tabpanel">
        {plans.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            titleTh="ไม่มีแผนในหมวดนี้"
            titleEn="No plans in this category"
            descTh="ยังไม่มีแผนสวัสดิการที่ลงทะเบียนในหมวดนี้"
            descEn="No benefit plans have been registered in this category yet."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Link
                key={plan.id}
                href={`/${loc}/admin/benefits/records/${plan.id}`}
                className="group block rounded-[var(--radius-lg)] border border-hairline bg-surface p-5 transition-[border-color,box-shadow] hover:border-accent hover:shadow-[0_0_0_3px_var(--color-accent-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <p className="text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {plan.id}
                </p>
                <p className="mt-1 font-medium text-ink group-hover:text-accent transition-colors">
                  {isTh ? plan.nameTh : plan.nameEn}
                </p>
                <p className="mt-1.5 text-small text-ink-muted line-clamp-2">
                  {isTh ? plan.eligibilityTh : ('eligibilityEn' in plan ? plan.eligibilityEn : plan.eligibilityTh)}
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-canvas-soft px-2.5 py-0.5 text-[length:var(--text-eyebrow)] font-medium uppercase tracking-[0.14em] text-ink-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-muted" aria-hidden />
                  {isTh ? 'บันทึกโดย HR' : 'HR only'}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Quick link to beneficiaries */}
      <Card variant="raised" size="lg" className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>{isTh ? 'จัดการผู้รับผลประโยชน์' : 'Manage Beneficiaries'}</CardTitle>
          <p className="mt-1 text-small text-ink-muted">
            {isTh
              ? 'ดูและแก้ไขรายชื่อผู้รับผลประโยชน์ของพนักงานทุกคน'
              : 'View and edit the beneficiary list for all employees.'}
          </p>
        </div>
        <Link
          href={`/${loc}/admin/benefits/beneficiaries`}
          className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] bg-accent px-4 py-2 text-small font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {isTh ? 'ไปยังผู้รับผลประโยชน์' : 'Go to Beneficiaries'}
        </Link>
      </Card>
    </div>
  );
}
