'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight,
  Clock,
  Download,
  FileText,
  Heart,
  Hospital,
  HeartPulse,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  CardEyebrow,
  CardTitle,
  DemoValuesDisclaimer,
  buttonVariants,
} from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  benefitHospitalClaimRoute,
  benefitProfileRoute,
  benefitReferralRoute,
  benefitReimbursementRoute,
} from '@/lib/benefit-routes';
import {
  ACCENT_BAR_CLASS,
  CLAIM_STATUS_META,
  HUMI_CLAIM_ALLOWANCES,
  HUMI_CLAIM_HISTORY,
  HUMI_DEPENDENTS,
} from '@/lib/humi-mock-data';
import { useBenefitReferralsStore } from '@/stores/benefit-referrals';

// ════════════════════════════════════════════════════════════════════════════
// /benefits-hub — Service catalog + my status
//
// Layout:
//   [slim header]
//   [4 KPIs]
//   [services grid (2/3)] | [in-flight tracker (1/3)]
//   [allowances strip]
//   [dependents] [documents] [policies]
// ════════════════════════════════════════════════════════════════════════════

interface ServiceCardSpec {
  id: string;
  icon: typeof Hospital;
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  href: (locale: string) => string;
  badgeTh?: string;
  badgeEn?: string;
  badgeTone?: 'accent' | 'success' | 'warning';
}

const SERVICES: ServiceCardSpec[] = [
  {
    id: 'referral',
    icon: Hospital,
    titleTh: 'ขอใบส่งตัว',
    titleEn: 'Hospital referral',
    descTh: 'ใบส่งตัว ePatient ก่อนเข้ารับบริการที่โรงพยาบาลในเครือ',
    descEn: 'ePatient referral for partner hospitals before your visit',
    href: (l) => benefitReferralRoute(l),
  },
  {
    id: 'reimbursement',
    icon: ReceiptText,
    titleTh: 'เบิกสวัสดิการ',
    titleEn: 'Reimbursement',
    descTh: 'เบิกค่ารักษา ตรวจสุขภาพ ค่าเดินทาง และอื่น ๆ ตามวงเงิน',
    descEn: 'Submit claims for medical, checkup, travel and other allowances',
    href: (l) => benefitReimbursementRoute(l),
  },
  {
    id: 'hospital-claim',
    icon: Stethoscope,
    titleTh: 'เคลมค่ารักษา',
    titleEn: 'Hospital claim',
    descTh: 'ส่งใบเสร็จค่ารักษาพร้อมเอกสารแพทย์เพื่อเบิกย้อนหลัง',
    descEn: 'Submit hospital receipts with physician notes for reimbursement',
    href: (l) => benefitHospitalClaimRoute(l),
  },
  {
    id: 'physical-checkup',
    icon: HeartPulse,
    titleTh: 'ตรวจสุขภาพประจำปี',
    titleEn: 'Annual checkup',
    descTh: 'แพ็คเกจตรวจสุขภาพประจำปีและสิทธิ์ของผู้รับสิทธิ์ร่วม',
    descEn: 'Yearly health screening and dependent coverage',
    href: (l) => `/${l}/benefits-hub/physical-checkup`,
  },
  {
    id: 'life-accident',
    icon: ShieldCheck,
    titleTh: 'ประกันชีวิตและอุบัติเหตุ',
    titleEn: 'Life & accident',
    descTh: 'รายละเอียดทุนประกัน เบนิฟิตและกรมธรรม์',
    descEn: 'Sum insured, policy details and benefit summary',
    href: (l) => `/${l}/benefits-hub/life-accident`,
  },
  {
    id: 'beneficiary',
    icon: Users,
    titleTh: 'ผู้รับผลประโยชน์',
    titleEn: 'Beneficiary',
    descTh: 'จัดการรายชื่อผู้รับผลประโยชน์ตามกรมธรรม์',
    descEn: 'Maintain beneficiary records linked to your policies',
    href: (l) => `/${l}/benefits-hub/beneficiary`,
  },
];

const DOCS = [
  { n: 'ลงทะเบียนสวัสดิการปี 2569',     k: 'แบบฟอร์ม',          d: 'ครบกำหนด 29 เม.ย.',   action: 'sign'     as const },
  { n: 'ระเบียบการปฏิบัติงาน (ฉบับที่ 4)', k: 'นโยบาย',            d: 'รอรับทราบ',           action: 'sign'     as const },
  { n: 'บัตรประกันสุขภาพกลุ่ม',           k: 'สวัสดิการ',          d: 'พร้อมดาวน์โหลด',     action: 'download' as const },
  { n: 'แบบฟอร์มเพิ่มผู้ใช้สิทธิ์ร่วม',     k: 'สวัสดิการครอบครัว', d: 'อัปเดต 12 ก.พ.',     action: 'download' as const },
];

const POLICIES = [
  { t: 'การลางานและวันหยุด',    u: 'อัปเดต มี.ค. 2569', body: 'การสะสมวันลาพักร้อน กฎการยกยอด ค่าจ้างวันหยุด' },
  { t: 'ลาคลอด',                u: 'มีผล 1 พ.ค.',       body: 'ลา 16 สัปดาห์ได้รับค่าจ้างเต็มหลังครบ 6 เดือน' },
  { t: 'ความปลอดภัยในสำนักงาน', u: 'อัปเดต ม.ค. 2569', body: 'ข้อบังคับความปลอดภัย ขั้นตอนรายงานเหตุการณ์' },
  { t: 'ระเบียบการปฏิบัติงาน',   u: 'ฉบับที่ 4 · เม.ย. 2569', body: 'การเคารพในที่ทำงาน การต่อต้านการคุกคาม' },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function formatThb(n: number): string {
  return `฿${n.toLocaleString()}`;
}

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────

export default function HumiBenefitsHubPage() {
  const params = useParams<{ locale?: string }>();
  const locale = typeof params.locale === 'string' ? params.locale : 'th';
  const referrals = useBenefitReferralsStore((s) => s.referrals);

  const allowanceTotal = useMemo(
    () => HUMI_CLAIM_ALLOWANCES.reduce((sum, a) => sum + a.limit, 0),
    [],
  );
  const allowanceUsed = useMemo(
    () => HUMI_CLAIM_ALLOWANCES.reduce((sum, a) => sum + a.used, 0),
    [],
  );
  const usedPercent = Math.round((allowanceUsed / allowanceTotal) * 100);

  const pendingClaimsCount = HUMI_CLAIM_HISTORY.filter(
    (r) => CLAIM_STATUS_META[r.status]?.label !== 'Approved',
  ).length;
  const pendingReferralCount = referrals.filter((r) =>
    ['pending_spd', 'spd_reviewing', 'approved', 'send_back'].includes(r.status),
  ).length;
  const pendingTotal = pendingClaimsCount + pendingReferralCount;

  const docsToSign = DOCS.filter((d) => d.action === 'sign').length;

  // Combine in-flight items across services for the side tracker
  type InFlightItem = {
    key: string;
    icon: typeof Hospital;
    title: string;
    sub: string;
    days: number;
    statusLabel: string;
    statusTone: string;
    href: string;
  };
  const inFlight: InFlightItem[] = useMemo(() => {
    const fromReferrals: InFlightItem[] = referrals
      .filter((r) => ['pending_spd', 'spd_reviewing', 'approved', 'send_back'].includes(r.status))
      .slice(0, 4)
      .map((r) => ({
        key: r.id,
        icon: Hospital,
        title: r.serviceReason,
        sub: r.hospital.name,
        days: daysSince(r.submittedAt ?? r.updatedAt),
        statusLabel: r.status === 'pending_spd' ? 'รอ HRBP' : r.status === 'spd_reviewing' ? 'SPD ตรวจ' : r.status === 'approved' ? 'รอออกใบ' : 'ส่งกลับแก้',
        statusTone: 'bg-warning-soft text-[color:var(--color-warning)]',
        href: benefitReferralRoute(locale),
      }));

    const fromClaims: InFlightItem[] = HUMI_CLAIM_HISTORY.filter(
      (r) => CLAIM_STATUS_META[r.status]?.label !== 'Approved',
    )
      .slice(0, 4)
      .map((r) => {
        const meta = CLAIM_STATUS_META[r.status];
        return {
          key: r.id,
          icon: ReceiptText,
          title: r.type,
          sub: r.desc,
          days: 0,
          statusLabel: meta.label,
          statusTone: meta.toneClass,
          href: benefitReimbursementRoute(locale),
        };
      });

    return [...fromReferrals, ...fromClaims].slice(0, 6);
  }, [referrals, locale]);

  return (
    <>
      {/* Slim header */}
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardEyebrow>Benefits Hub</CardEyebrow>
          <h1 className="font-display text-[length:var(--text-display-h1)] font-semibold leading-[var(--text-display-h1--line-height)] tracking-tight text-ink">
            สวัสดิการของคุณ
          </h1>
          <p className="max-w-2xl text-body leading-relaxed text-ink-soft">
            เลือกบริการที่ต้องใช้ ติดตามสถานะคำขอ และดาวน์โหลดเอกสาร — ทุกอย่างในหน้าเดียว
          </p>
        </div>
        <Link
          href={benefitProfileRoute(locale)}
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          ดูสิทธิ์ในโปรไฟล์
          <ArrowRight size={14} aria-hidden />
        </Link>
      </header>

      <DemoValuesDisclaimer className="mb-6" />

      {/* KPI strip */}
      <section
        aria-label="ภาพรวมสวัสดิการ"
        className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4"
      >
        <Card variant="raised" size="md" className="border-l-4 border-l-accent">
          <CardEyebrow>วงเงินปีนี้</CardEyebrow>
          <p className="mt-1 font-display text-[length:var(--text-display-h3)] font-semibold text-ink tabular-nums whitespace-nowrap">
            {formatThb(allowanceTotal)}
          </p>
          <p className="text-small text-ink-muted">
            ใช้ไป {formatThb(allowanceUsed)} · {usedPercent}%
          </p>
        </Card>
        <Card variant="raised" size="md" className="border-l-4 border-l-[color:var(--color-warning)]">
          <CardEyebrow>คำขอรอดำเนินการ</CardEyebrow>
          <p className="mt-1 font-display text-[length:var(--text-display-h3)] font-semibold text-ink tabular-nums">
            {pendingTotal}
          </p>
          <p className="text-small text-ink-muted">
            ใบส่งตัว {pendingReferralCount} · เบิก {pendingClaimsCount}
          </p>
        </Card>
        <Card variant="raised" size="md" className="border-l-4 border-l-[color:var(--color-info)]">
          <CardEyebrow>ผู้รับสิทธิ์ร่วม</CardEyebrow>
          <p className="mt-1 font-display text-[length:var(--text-display-h3)] font-semibold text-ink tabular-nums">
            {HUMI_DEPENDENTS.length}
          </p>
          <p className="text-small text-ink-muted">ครอบครัวในแผนของคุณ</p>
        </Card>
        <Card
          variant="raised"
          size="md"
          className={cn(
            'border-l-4',
            docsToSign > 0 ? 'border-l-[color:var(--color-danger)]' : 'border-l-hairline',
          )}
        >
          <CardEyebrow>เอกสารต้องลงนาม</CardEyebrow>
          <p className="mt-1 font-display text-[length:var(--text-display-h3)] font-semibold text-ink tabular-nums">
            {docsToSign}
          </p>
          <p className="text-small text-ink-muted">
            {docsToSign > 0 ? 'กรุณาดำเนินการก่อน 29 เม.ย.' : 'ไม่มีรายการค้าง'}
          </p>
        </Card>
      </section>

      {/* Main: services (2/3) + in-flight tracker (1/3) */}
      <div className="mb-6 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Service catalog */}
        <section aria-labelledby="services-heading">
          <h2
            id="services-heading"
            className="mb-3 font-display text-[length:var(--text-display-h3)] font-semibold text-ink"
          >
            บริการสวัสดิการ
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.id}
                  href={svc.href(locale)}
                  className={cn(
                    'group relative flex flex-col gap-3 rounded-[var(--radius-md)] border border-hairline bg-surface p-4 transition-all duration-[var(--dur-fast)]',
                    'hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-md)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-accent-soft text-accent-ink"
                    >
                      <Icon size={20} />
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="text-ink-faint transition-colors group-hover:text-accent"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body font-semibold text-ink">
                      {locale === 'en' ? svc.titleEn : svc.titleTh}
                    </p>
                    <p className="mt-0.5 text-small leading-relaxed text-ink-muted">
                      {locale === 'en' ? svc.descEn : svc.descTh}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* In-flight tracker */}
        <aside aria-labelledby="inflight-heading">
          <h2
            id="inflight-heading"
            className="mb-3 font-display text-[length:var(--text-display-h3)] font-semibold text-ink"
          >
            กำลังดำเนินการ
          </h2>
          <Card variant="raised" size="md">
            {inFlight.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-canvas-soft">
                  <Heart size={18} className="text-ink-muted" aria-hidden />
                </span>
                <p className="text-small text-ink-muted">ไม่มีคำขอที่รอดำเนินการ</p>
              </div>
            ) : (
              <ul role="list" className="divide-y divide-hairline-soft">
                {inFlight.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.key} className="py-3 first:pt-0 last:pb-0">
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 -m-1 p-1 rounded-[var(--radius-sm)] hover:bg-canvas-soft transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
                      >
                        <span
                          aria-hidden
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-canvas-soft text-ink-muted"
                        >
                          <Icon size={14} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-small font-semibold text-ink truncate">{item.title}</p>
                          <p className="text-small text-ink-muted truncate">{item.sub}</p>
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <span
                              className={cn(
                                'rounded-full px-2 py-0.5 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                                item.statusTone,
                              )}
                            >
                              {item.statusLabel}
                            </span>
                            {item.days > 0 && (
                              <span className="inline-flex items-center gap-1 text-[length:var(--text-eyebrow)] font-mono text-ink-faint">
                                <Clock size={10} aria-hidden />
                                {item.days}ด.
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>

            )}
          </Card>
        </aside>
      </div>

      {/* Allowance breakdown */}
      <section aria-labelledby="allowance-heading" className="mb-6">
        <div className="mb-3 flex items-end justify-between gap-3 flex-wrap">
          <h2
            id="allowance-heading"
            className="font-display text-[length:var(--text-display-h3)] font-semibold text-ink"
          >
            วงเงินตามประเภท
          </h2>
          <Link
            href={benefitReimbursementRoute(locale)}
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
          >
            เริ่มเบิก
            <ArrowRight size={12} aria-hidden />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {HUMI_CLAIM_ALLOWANCES.map((b) => {
            const pct = Math.min(100, Math.round((b.used / b.limit) * 100));
            return (
              <Link
                key={b.id}
                href={benefitReimbursementRoute(locale, b.id)}
                className={cn(
                  'block rounded-[var(--radius-md)] border border-hairline bg-surface p-4 transition-all duration-[var(--dur-fast)]',
                  'hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]',
                )}
              >
                <CardEyebrow>{b.label}</CardEyebrow>
                <p className="mt-1 font-display text-[length:var(--text-display-h3)] font-semibold text-ink tabular-nums whitespace-nowrap">
                  {formatThb(b.used)}{' '}
                  <span className="text-small font-normal text-ink-muted">
                    / {formatThb(b.limit)}
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
                <span className="mt-3 inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-accent px-3 py-1.5 text-small font-semibold text-accent-foreground">
                  Claim
                  <ArrowRight size={12} aria-hidden />
                </span>
              </Link>
            );
          })}
        </div>

      </section>

      {/* Dependents */}
      <section aria-labelledby="dependents-heading" className="mb-6">
        <Card variant="raised" size="md">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <CardEyebrow>ครอบครัวในแผน</CardEyebrow>
              <CardTitle id="dependents-heading" className="mt-1">
                ผู้รับสิทธิ์ร่วม
              </CardTitle>
            </div>
            <Link
              href={benefitProfileRoute(locale)}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              จัดการในโปรไฟล์
              <ArrowRight size={12} aria-hidden />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {HUMI_DEPENDENTS.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-3"
              >
                <Avatar name={d.fullNameTh} tone={d.tone ?? 'ink'} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-body font-semibold text-ink">{d.fullNameTh}</p>
                  <p className="text-small text-ink-muted">{d.relation}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Documents + Policies — side by side, low priority */}
      <div className="grid gap-5 lg:grid-cols-2">
        <DocsSection />
        <PoliciesSection />
      </div>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Sub-sections
// ────────────────────────────────────────────────────────────────────────────

function DocsSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? DOCS : DOCS.slice(0, 3);

  return (
    <Card variant="raised" size="md" aria-labelledby="docs-heading">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <CardEyebrow>เอกสาร</CardEyebrow>
          <CardTitle id="docs-heading" className="mt-1">
            แบบฟอร์มและเอกสารของฉัน
          </CardTitle>
        </div>
      </div>
      <ul role="list" className="mt-3 divide-y divide-hairline-soft">
        {visible.map((d) => (
          <li
            key={d.n}
            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-3"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-hairline bg-canvas-soft text-ink-muted"
            >
              <FileText size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body font-medium text-ink truncate">{d.n}</p>
              <p className="text-small text-ink-muted">
                {d.k} · {d.d}
              </p>
            </div>
            {d.action === 'sign' ? (
              <Button variant="secondary" size="sm">
                ลงนาม
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                leadingIcon={<Download size={12} />}
              >
                ดาวน์โหลด
              </Button>
            )}
          </li>
        ))}
      </ul>
      {DOCS.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 text-small font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded"
        >
          {showAll ? 'ย่อ' : `ดูทั้งหมด (${DOCS.length})`}
        </button>
      )}
    </Card>
  );
}

function PoliciesSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <Card variant="raised" size="md" aria-labelledby="policies-heading">
      <CardEyebrow>นโยบาย</CardEyebrow>
      <CardTitle id="policies-heading" className="mt-1">
        เอกสารแนวปฏิบัติ
      </CardTitle>
      <ul role="list" className="mt-3 divide-y divide-hairline-soft">
        {POLICIES.map((p, idx) => {
          const open = activeIdx === idx;
          return (
            <li key={p.t} className="py-2">
              <button
                type="button"
                onClick={() => setActiveIdx(open ? null : idx)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded"
              >
                <div className="min-w-0">
                  <p className="text-body font-medium text-ink truncate">{p.t}</p>
                  <p className="text-small text-ink-muted">{p.u}</p>
                </div>
                <ArrowRight
                  size={14}
                  aria-hidden
                  className={cn(
                    'shrink-0 text-ink-muted transition-transform duration-[var(--dur-fast)]',
                    open && 'rotate-90 text-accent',
                  )}
                />
              </button>
              {open && (
                <p className="mt-1 pb-2 text-small leading-relaxed text-ink-soft">{p.body}</p>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
