'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Download,
  Plus,
  FileText,
  ArrowRight,
  Search,
} from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  CardEyebrow,
  CardTitle,
  DemoValuesDisclaimer,
  buttonVariants,
  Modal,
  DataTable,
  FormField,
  FormInput,
} from '@/components/humi';
import type { DataTableColumn } from '@/components/humi';
import { BenefitServicesPanel } from '@/components/benefits/BenefitServicesPanel';
import { cn } from '@/lib/utils';
import { benefitProfileRoute, benefitReimbursementRoute } from '@/lib/benefit-routes';
import {
  HUMI_BENEFIT_PLANS,
  HUMI_DEPENDENTS,
  HUMI_CLAIM_ALLOWANCES,
  HUMI_CLAIM_HISTORY,
  ACCENT_BAR_CLASS,
  CLAIM_STATUS_META,
  type HumiBenefitPlan,
  type HumiClaimHistoryItem,
} from '@/lib/humi-mock-data';
import { useBenefitsStore, type BenefitsTabKey } from '@/stores/humi-benefits-slice';

// ════════════════════════════════════════════════════════════
// /benefits-hub — Benefit Work Zone
// EC/BRD-inspired entitlement summary + benefit-owned service actions.
// Payroll/Tax stays in /payroll.
// ════════════════════════════════════════════════════════════

const TABS: Array<[BenefitsTabKey, string]> = [
  ['benefits', 'สิทธิ์และผู้รับสิทธิ์'],
  ['claims', 'ประวัติการเบิก'],
  ['docs', 'เอกสาร'],
  ['policies', 'นโยบาย'],
];

const DOCS = [
  { n: 'ลงทะเบียนสวัสดิการปี 2569', k: 'แบบฟอร์ม', d: 'ครบกำหนด 29 เม.ย.', action: 'sign' as const },
  { n: 'ระเบียบการปฏิบัติงาน (ฉบับที่ 4)', k: 'นโยบาย', d: 'รอรับทราบ', action: 'sign' as const },
  { n: 'บัตรประกันสุขภาพกลุ่ม', k: 'สวัสดิการ', d: 'พร้อมดาวน์โหลด', action: 'download' as const },
  { n: 'แบบฟอร์มเพิ่มผู้ใช้สิทธิ์ร่วม', k: 'สวัสดิการครอบครัว', d: 'อัปเดต 12 ก.พ.', action: 'download' as const },
  { n: 'อบรมความปลอดภัยในการทำงาน', k: 'การฝึกอบรม', d: 'เสร็จสิ้น 8 ม.ค.', action: 'download' as const },
  { n: 'สัญญาจ้างงาน', k: 'เอกสารทางกฎหมาย', d: 'ลงนามเมื่อ ต.ค. 2567', action: 'download' as const },
];

const POLICIES = [
  {
    t: 'การลางานและวันหยุด',
    u: 'อัปเดต มี.ค. 2569',
    body: 'การสะสมวันลาพักร้อน กฎการยกยอด ค่าจ้างวันหยุดสำหรับพนักงานประจำและสัญญาจ้าง',
  },
  {
    t: 'ลาคลอด',
    u: 'มีผล 1 พ.ค.',
    body: 'ลา 16 สัปดาห์ได้รับค่าจ้างเต็ม ใช้ได้กับทุกประเภทการจ้างหลังทำงานครบ 6 เดือน',
  },
  {
    t: 'ความปลอดภัยในสำนักงาน',
    u: 'อัปเดต ม.ค. 2569',
    body: 'ข้อบังคับความปลอดภัย · การใช้อุปกรณ์สำนักงาน · ขั้นตอนรายงานเหตุการณ์',
  },
  {
    t: 'ระเบียบการปฏิบัติงาน',
    u: 'ฉบับที่ 4 · เม.ย. 2569',
    body: 'การเคารพในที่ทำงาน การต่อต้านการคุกคาม ผลประโยชน์ทับซ้อน การรายงาน',
  },
];

function benefitDisplayItem(item: string) {
  return item === 'ไม่ต้องเสียภาษี' ? 'ใช้ตามเงื่อนไขสวัสดิการ' : item;
}

function claimHistorySearchText(row: HumiClaimHistoryItem) {
  return [
    row.id,
    row.type,
    row.desc,
    row.amount,
    row.date,
    CLAIM_STATUS_META[row.status].label,
  ]
    .join(' ')
    .toLocaleLowerCase('th-TH');
}

function claimAmountValue(amount: string) {
  return Number(amount.replace(/[^0-9.-]/g, '')) || 0;
}

export default function HumiBenefitsHubPage() {
  const { activeTab, setTab } = useBenefitsStore();
  const params = useParams<{ locale?: string }>();
  const locale = typeof params.locale === 'string' ? params.locale : 'th';

  return (
    <>
      {/* Page header */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardEyebrow>Benefits Work Zone</CardEyebrow>
          <h1
            className={cn(
              'font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
            )}
          >
            งานสวัสดิการ
          </h1>
          <p className="max-w-2xl text-body leading-relaxed text-ink-soft">
            เริ่มงานสวัสดิการจากข้อมูลสิทธิ์ในโปรไฟล์ ติดตามสถานะ และอ่านเอกสาร โดยไม่ปนกับงานนอกโดเมนสวัสดิการหรือฟอร์มแก้ไขโปรไฟล์
          </p>
        </div>
      </header>

      <DemoValuesDisclaimer className="mb-6" />

      <section className="mb-6" aria-label="บริการสวัสดิการ">
        <BenefitServicesPanel locale={locale} />
      </section>

      <WorkZoneOverview locale={locale} />

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="มุมมองสวัสดิการ"
        className="mb-6 flex gap-1 overflow-x-auto border-b border-hairline"
      >
        {TABS.map(([k, l]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={activeTab === k}
            onClick={() => setTab(k)}
            className={cn(
              '-mb-px border-b-2 px-4 py-3 text-body font-medium transition-colors whitespace-nowrap',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
              activeTab === k
                ? 'border-accent text-ink'
                : 'border-transparent text-ink-muted hover:text-ink'
            )}
          >
            {l}
          </button>
        ))}
      </div>

      {activeTab === 'benefits' && <BenefitsTab />}
      {activeTab === 'claims' && <ClaimsTab />}
      {activeTab === 'docs' && <DocsTab />}
      {activeTab === 'policies' && <PoliciesTab />}
    </>
  );
}

function WorkZoneOverview({ locale }: { locale: string }) {
  return (
    <section className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]" aria-label="ภาพรวมงานสวัสดิการ">
      <Card variant="raised" size="md" className="border-l-4 border-l-accent">
        <CardEyebrow>Entitlement source</CardEyebrow>
        <CardTitle className="mt-1">สิทธิ์จากข้อมูล HRMS/EC</CardTitle>
        <p className="mt-2 text-small leading-relaxed text-ink-muted">
          โปรไฟล์เป็นแหล่งข้อมูลสิทธิ์ แผน ผู้รับสิทธิ์ร่วม และวงเงิน ส่วนหน้านี้เป็น work zone สำหรับเริ่มงานสวัสดิการ
        </p>
        <Link href={benefitProfileRoute(locale)} className={cn(buttonVariants({ variant: 'ghost' }), 'mt-3')}>
          ดูสรุปสิทธิ์ในโปรไฟล์
        </Link>
      </Card>

      <Card variant="raised" size="md">
        <CardEyebrow>Recent request status</CardEyebrow>
        <CardTitle className="mt-1">ติดตามงานล่าสุด</CardTitle>
        <p className="mt-2 text-small text-ink-muted">
          คำขอเบิกและใบส่งตัวไปรวมสถานะใน Requests เพื่อไม่ให้ผู้ใช้เริ่มงานซ้ำจากหลายหน้า
        </p>
        <Link href={`/${locale}/requests`} className={cn(buttonVariants({ variant: 'ghost' }), 'mt-3')}>
          เปิด Requests
        </Link>
      </Card>

      <Card variant="raised" size="md">
        <CardEyebrow>Documents and policy</CardEyebrow>
        <CardTitle className="mt-1">อ่านก่อนเริ่มงาน</CardTitle>
        <p className="mt-2 text-small text-ink-muted">
          เอกสาร นโยบาย และเงื่อนไขอยู่ในแท็บสนับสนุนด้านล่าง ไม่ใช่ CTA แข่งกับงานหลัก
        </p>
      </Card>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Benefits — with enroll toggle + modal detail
// ────────────────────────────────────────────────────────────

function BenefitsTab() {
  const { enrolled } = useBenefitsStore();
  const [detailPlan, setDetailPlan] = useState<HumiBenefitPlan | null>(null);
  const params = useParams<{ locale?: string }>();
  const locale = typeof params.locale === 'string' ? params.locale : 'th';

  return (
    <>
      {/* Benefit detail modal */}
      <Modal
        open={detailPlan !== null}
        onClose={() => setDetailPlan(null)}
        title={detailPlan?.title}
      >
        {detailPlan && (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-body font-semibold text-ink">{detailPlan.plan}</p>
              <p className="text-small text-ink-muted">{detailPlan.cost} · คุณจ่าย</p>
            </div>
            <div
              role="progressbar"
              aria-valuenow={detailPlan.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={detailPlan.title}
              className="h-1.5 w-full overflow-hidden rounded-full bg-hairline-soft"
            >
              <div
                className={cn('h-full rounded-full', detailPlan.barClass)}
                style={{ width: `${detailPlan.percent}%` }}
              />
            </div>
            <ul className="space-y-1.5 text-small text-ink-soft">
              {detailPlan.items.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ink-faint"
                  />
                  <span>{benefitDisplayItem(x)}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-2">
              <Link
                href={benefitProfileRoute(locale)}
                className={buttonVariants({
                  variant: enrolled.has(detailPlan.id) ? 'secondary' : 'primary',
                })}
              >
                จัดการในโปรไฟล์
              </Link>
              <Button variant="ghost" className="min-h-[44px]" onClick={() => setDetailPlan(null)}>
                ปิด
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Hero announcement */}
      <Card
        variant="raised"
        size="lg"
        className="humi-banner relative mb-6"
      >
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-36 w-28 rounded-full bg-accent opacity-40 blur-2xl"
        />
        <div
          aria-hidden
          className="absolute right-20 top-14 h-20 w-16 rounded-full bg-[color:var(--color-butter)] opacity-60 blur-2xl"
        />
        <div className="relative">
          <CardEyebrow>
            คู่มือสวัสดิการปี 2569 · เปิดอ่านถึง 3 พ.ค.
          </CardEyebrow>
          <h2
            className={cn(
              'mt-2 max-w-2xl font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
            )}
          >
            สำรวจสิทธิ์ในงานสวัสดิการ
          </h2>
          <p className="mt-3 max-w-xl text-body text-ink-soft leading-relaxed">
            ส่วนนี้ใช้ดูแผน วงเงิน และผู้รับสิทธิ์ร่วมเท่านั้น การเริ่มบริการใช้ action หลักด้านบน
          </p>
        </div>
      </Card>

      {/* Benefit plan cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {HUMI_BENEFIT_PLANS.map((b) => {
          const isEnrolled = enrolled.has(b.id);
          return (
            <Card
              key={b.id}
              variant="raised"
              size="md"
              className="humi-card-lift cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`ดูรายละเอียด ${b.plan}`}
              onClick={() => setDetailPlan(b)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setDetailPlan(b);
                }
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <CardEyebrow>{b.title}</CardEyebrow>
                {isEnrolled && (
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                      'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]'
                    )}
                  >
                    เข้าร่วมแล้ว
                  </span>
                )}
              </div>
              <CardTitle className="mt-2">{b.plan}</CardTitle>
              <p className="mt-1 text-small text-ink-muted">{b.cost} · คุณจ่าย</p>
              <div
                role="progressbar"
                aria-valuenow={b.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={b.title}
                className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-hairline-soft"
              >
                <div
                  className={cn('h-full rounded-full', b.barClass)}
                  style={{ width: `${b.percent}%` }}
                />
              </div>
              <ul className="mt-4 space-y-1.5 text-small text-ink-soft">
                {b.items.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ink-faint"
                    />
                    <span>{benefitDisplayItem(x)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-small font-semibold text-accent">
                  คลิกการ์ดเพื่อดูรายละเอียด
                </p>
                <Link
                  href={benefitReimbursementRoute(locale)}
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                  className={buttonVariants({ variant: 'primary', size: 'sm' })}
                >
                  Claim
                </Link>
              </div>
            </Card>
          );
        })}
      </section>

      {/* Dependents */}
      <Card variant="raised" size="lg" className="mt-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardEyebrow>ผู้อุปการะ</CardEyebrow>
            <CardTitle className="mt-1">ในแผนของคุณ</CardTitle>
          </div>
          <Link
            href={benefitProfileRoute(locale)}
            className={buttonVariants({ variant: 'ghost' })}
          >
            <Plus size={14} aria-hidden />
            จัดการผู้รับสิทธิ์ในโปรไฟล์
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {HUMI_DEPENDENTS.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-hairline p-3"
            >
              <Avatar name={d.fullNameTh} tone={d.tone ?? 'ink'} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-body font-semibold text-ink">
                  {d.fullNameTh}
                </p>
                <p className="text-small text-ink-muted">{d.relation}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Claims
// ────────────────────────────────────────────────────────────

function ClaimsTab() {
  const params = useParams<{ locale?: string }>();
  const locale = typeof params.locale === 'string' ? params.locale : 'th';
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredClaimHistory = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase('th-TH');

    return HUMI_CLAIM_HISTORY.filter((row) => {
      const submissionDate = row.submittedAt.slice(0, 10);
      const matchesSearch = normalizedQuery
        ? claimHistorySearchText(row).includes(normalizedQuery)
        : true;
      const matchesStartDate = startDate ? submissionDate >= startDate : true;
      const matchesEndDate = endDate ? submissionDate <= endDate : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    });
  }, [endDate, searchQuery, startDate]);

  const claimHistoryColumns = useMemo<DataTableColumn<HumiClaimHistoryItem>[]>(() => [
    {
      id: 'benefitName',
      header: 'ชื่อสวัสดิการ / Benefit Name',
      cell: (row) => (
        <div className="min-w-[180px]">
          <p className="text-body font-semibold text-ink">{row.type}</p>
          <p className="text-small text-ink-muted">{row.desc}</p>
        </div>
      ),
      sortAccessor: (row) => row.type,
    },
    {
      id: 'claimAmount',
      header: 'จำนวนเงินเบิก / Claim Amount',
      cell: (row) => (
        <span className="font-display text-body font-semibold text-ink tabular-nums">
          {row.amount}
        </span>
      ),
      sortAccessor: (row) => claimAmountValue(row.amount),
      align: 'right',
      className: 'w-40',
    },
    {
      id: 'submissionDate',
      header: 'วันที่ส่ง / Submission Date',
      cell: (row) => (
        <span className="text-small tabular-nums text-ink-muted">{row.date}</span>
      ),
      sortAccessor: (row) => row.submittedAt,
      className: 'w-44',
    },
    {
      id: 'status',
      header: 'สถานะ / Status',
      cell: (row) => {
        const meta = CLAIM_STATUS_META[row.status];
        return (
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
              meta.toneClass
            )}
          >
            {meta.label}
          </span>
        );
      },
      sortAccessor: (row) => CLAIM_STATUS_META[row.status].label,
      className: 'w-40',
    },
  ], []);

  const resetClaimFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <>
      {/* Hero */}
      <Card
        variant="raised"
        size="lg"
        className="humi-banner relative mb-6"
      >
        <div
          aria-hidden
          className="absolute -right-10 -top-10 h-36 w-28 rounded-full bg-[color:var(--color-sage)] opacity-40 blur-2xl"
        />
        <div className="relative flex flex-wrap items-start gap-5">
          <div className="flex-1 min-w-[280px]">
            <CardEyebrow>วงเงินปี 2569 · ใช้ไป 32%</CardEyebrow>
            <h2
              className={cn(
                'mt-2 font-display font-semibold tracking-tight text-ink',
                'text-[length:var(--text-display-h2)] leading-[var(--text-display-h2--line-height)]'
              )}
            >
              เบิกค่าใช้จ่ายสวัสดิการ
            </h2>
            <p className="mt-2 max-w-lg text-body text-ink-soft leading-relaxed">
              ดูวงเงิน ประวัติ และเริ่มคำขอเบิกย้อนหลังในเส้นทาง Benefits Hub
              โดยไม่ปะปนกับใบส่งตัวหรือภาษี
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={benefitReimbursementRoute(locale)}
                className={buttonVariants({ variant: 'primary' })}
              >
                <Plus size={14} aria-hidden />
                <span>เริ่มเบิกสวัสดิการ</span>
              </Link>
              <Button variant="ghost">ดูประวัติทั้งหมด</Button>
            </div>
          </div>
          <div className="w-full sm:w-auto sm:text-right">
            <CardEyebrow>ยอดรวมสิทธิ์ปีนี้</CardEyebrow>
            <p
              className={cn(
                'mt-1 font-display font-semibold text-ink tabular-nums whitespace-nowrap',
                'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
              )}
            >
              ฿60,000
            </p>
            <p className="mt-1 text-small text-ink-muted">
              เบิกไปแล้ว ฿19,200 · คงเหลือ ฿40,800
            </p>
          </div>
        </div>
      </Card>

      {/* Allowances */}
      <section className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {HUMI_CLAIM_ALLOWANCES.map((b) => {
          const pct = Math.min(100, Math.round((b.used / b.limit) * 100));
          return (
            <Card
              key={b.id}
              variant="raised"
              size="md"
              className={cn(
                'border-l-4',
                b.accent === 'accent' && 'humi-stat-card--accent',
                b.accent === 'sage'   && 'humi-stat-card--sage',
                b.accent === 'butter' && 'humi-stat-card--butter',
              )}
              style={b.accent === 'alt' ? { borderLeftColor: 'var(--color-accent-alt)' } : undefined}
            >
              <CardEyebrow>{b.label}</CardEyebrow>
              <p
                className={cn(
                  'mt-1 font-display font-semibold text-ink tabular-nums whitespace-nowrap',
                  'text-[length:var(--text-display-h3)] leading-[var(--text-display-h3--line-height)]'
                )}
              >
                ฿{b.used.toLocaleString()}{' '}
                <span className="text-small font-normal text-ink-muted">
                  / {b.limit.toLocaleString()}
                </span>
              </p>
              <div
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={b.label}
                className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-hairline-soft"
              >
                <div
                  className={cn('h-full rounded-full', ACCENT_BAR_CLASS[b.accent])}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-small text-ink-muted">{b.sub}</p>
            </Card>
          );
        })}
      </section>

      {/* History */}
      <Card variant="raised" size="lg">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <CardEyebrow>คำขอเบิกล่าสุด</CardEyebrow>
            <CardTitle className="mt-1">ประวัติการเบิกค่าใช้จ่าย</CardTitle>
          </div>
          <Button variant="ghost" leadingIcon={<Download size={14} />}>
            ส่งออกรายงาน
          </Button>
        </div>

        <div className="mb-4 grid gap-3 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4 lg:grid-cols-[minmax(220px,1fr)_180px_180px_auto] lg:items-end">
          <FormField
            id="claim-history-search"
            label="ค้นหา / Search bar"
            help="ค้นหาจากชื่อสวัสดิการ รายละเอียด จำนวนเงิน หรือสถานะ"
          >
            {(controlProps) => (
              <div className="relative">
                <Search
                  size={16}
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
                />
                <FormInput
                  {...controlProps}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="เช่น ค่าทันตกรรม หรือ อนุมัติแล้ว"
                  className="pl-9"
                />
              </div>
            )}
          </FormField>
          <FormField id="claim-history-start-date" label="วันที่เริ่มต้น / Start Date">
            {(controlProps) => (
              <FormInput
                {...controlProps}
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(event) => setStartDate(event.target.value)}
              />
            )}
          </FormField>
          <FormField id="claim-history-end-date" label="วันที่สิ้นสุด / End Date">
            {(controlProps) => (
              <FormInput
                {...controlProps}
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => setEndDate(event.target.value)}
              />
            )}
          </FormField>
          <Button
            type="button"
            variant="ghost"
            className="min-h-[44px] justify-center"
            onClick={resetClaimFilters}
          >
            ล้างตัวกรอง
          </Button>
        </div>

        <DataTable
          caption="ประวัติการเบิกค่าใช้จ่าย"
          columns={claimHistoryColumns}
          rows={filteredClaimHistory}
          rowKey={(row) => row.id}
          dense
          emptyState={
            <div className="text-center">
              <p className="text-body font-semibold text-ink">ไม่พบประวัติการเบิก</p>
              <p className="mt-1 text-small text-ink-muted">
                ลองปรับคำค้นหา วันที่เริ่มต้น หรือวันที่สิ้นสุด
              </p>
            </div>
          }
        />
      </Card>
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Docs
// ────────────────────────────────────────────────────────────

function DocsTab() {
  return (
    <Card variant="raised" size="lg">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <CardTitle>เอกสารทั้งหมด</CardTitle>
        <div
          role="search"
          className="inline-flex min-w-[240px] items-center gap-2 rounded-full border border-hairline bg-canvas-soft px-3 py-1.5 text-small text-ink-muted"
        >
          <Search size={14} aria-hidden />
          <span>ค้นหาตามชื่อ…</span>
        </div>
      </div>
      <ul role="list" className="divide-y divide-hairline">
        {DOCS.map((d) => (
          <li
            key={d.n}
            className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-3"
          >
            <span
              aria-hidden
              className="flex h-10 w-8 shrink-0 items-center justify-center rounded-[var(--radius-xs)] border border-hairline bg-canvas-soft text-ink-muted"
            >
              <FileText size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body font-semibold text-ink">{d.n}</p>
              <p className="text-small text-ink-muted">
                {d.k} · {d.d}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {d.action === 'sign' ? (
                <>
                  <span className="rounded-full bg-warning-soft px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-warning)] whitespace-nowrap">
                    ต้องลงนาม
                  </span>
                  <Button variant="ghost" size="sm">
                    ลงนาม
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  leadingIcon={<Download size={14} />}
                >
                  ดาวน์โหลด
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Policies
// ────────────────────────────────────────────────────────────

function PoliciesTab() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {POLICIES.map((p) => (
        <Card key={p.t} variant="raised" size="md">
          <CardEyebrow>{p.u}</CardEyebrow>
          <CardTitle className="mt-1">{p.t}</CardTitle>
          <p className="mt-2 text-body text-ink-soft leading-relaxed">{p.body}</p>
          <Button
            variant="ghost"
            className="mt-3"
            trailingIcon={<ArrowRight size={14} />}
          >
            อ่านนโยบาย
          </Button>
        </Card>
      ))}
    </section>
  );
}
