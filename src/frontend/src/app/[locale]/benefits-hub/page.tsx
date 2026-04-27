'use client';

import { useState } from 'react';
import {
  Download,
  Plus,
  FileText,
  ArrowRight,
  Search,
  Circle,
} from 'lucide-react';
import {
  Avatar,
  Button,
  Card,
  CardEyebrow,
  CardTitle,
  Modal,
} from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_BENEFIT_PLANS,
  HUMI_DEPENDENTS,
  HUMI_CLAIM_ALLOWANCES,
  HUMI_CLAIM_HISTORY,
  HUMI_PAYSLIPS,
  ACCENT_BAR_CLASS,
  CLAIM_STATUS_META,
  type HumiBenefitPlan,
} from '@/lib/humi-mock-data';
import { useBenefitsStore, type BenefitsTabKey } from '@/stores/humi-benefits-slice';

// ════════════════════════════════════════════════════════════
// /benefits-hub — Salary + benefits overview
// Port of docs/design-ref/shelfly-bundle/project/screens/benefits.jsx
// 5-tab panel: benefits / claims / docs / policies / pay
// c6: Zustand persist tab + enroll toggle + Modal detail
// ════════════════════════════════════════════════════════════

const TABS: Array<[BenefitsTabKey, string]> = [
  ['benefits', 'สวัสดิการ'],
  ['claims', 'เบิกค่าใช้จ่าย'],
  ['docs', 'เอกสาร'],
  ['policies', 'นโยบาย'],
  ['pay', 'สลิปเงินเดือน'],
];

const DOCS = [
  { n: 'ลงทะเบียนสวัสดิการปี 2569', k: 'แบบฟอร์ม', d: 'ครบกำหนด 29 เม.ย.', action: 'sign' as const },
  { n: 'ระเบียบการปฏิบัติงาน (ฉบับที่ 4)', k: 'นโยบาย', d: 'รอรับทราบ', action: 'sign' as const },
  { n: 'หนังสือรับรองภาษี 50 ทวิ — ปี 2568', k: 'ภาษี', d: 'พร้อมดาวน์โหลด', action: 'download' as const },
  { n: 'หน้าบัญชีธนาคาร (สำเนา)', k: 'การเงิน', d: 'อัปโหลด 12 ก.พ.', action: 'download' as const },
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

export default function HumiBenefitsHubPage() {
  const { activeTab, setTab } = useBenefitsStore();

  return (
    <>
      {/* Page header */}
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardEyebrow>เงินเดือนและสวัสดิการ</CardEyebrow>
          <h1
            className={cn(
              'font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
            )}
          >
            ความคุ้มครอง แบบฟอร์ม และนโยบาย
          </h1>
        </div>
        <Button variant="ghost" leadingIcon={<Download size={14} />}>
          ดาวน์โหลดสลิปเงินเดือน
        </Button>
      </header>

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
      {activeTab === 'pay' && <PayTab />}
    </>
  );
}

// ────────────────────────────────────────────────────────────
// Tab: Benefits — with enroll toggle + modal detail
// ────────────────────────────────────────────────────────────

function BenefitsTab() {
  const { enrolled, toggleEnroll } = useBenefitsStore();
  const [detailPlan, setDetailPlan] = useState<HumiBenefitPlan | null>(null);

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
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 pt-2">
              <Button
                variant={enrolled.has(detailPlan.id) ? 'secondary' : 'primary'}
                className="min-h-[44px]"
                onClick={() => toggleEnroll(detailPlan.id)}
              >
                {enrolled.has(detailPlan.id) ? 'ยกเลิกสมัคร' : 'สมัคร'}
              </Button>
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
            ลงทะเบียนสวัสดิการปี 2569 · เปิดรับถึง 3 พ.ค.
          </CardEyebrow>
          <h2
            className={cn(
              'mt-2 max-w-2xl font-display font-semibold tracking-tight text-ink',
              'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
            )}
          >
            เลือกแผนสวัสดิการของคุณสำหรับปีนี้
          </h2>
          <p className="mt-3 max-w-xl text-body text-ink-soft leading-relaxed">
            คุณมีเวลา 13 วันในการทบทวนความคุ้มครอง เพิ่มผู้อุปการะ และยืนยัน
            ระบบจะใช้แผนเดิมของคุณโดยอัตโนมัติหากไม่มีการเปลี่ยนแปลง
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="primary">เริ่มลงทะเบียน</Button>
            <Button variant="ghost">เปรียบเทียบแผน</Button>
          </div>
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
              onClick={() => setDetailPlan(b)}
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
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={isEnrolled ? 'secondary' : 'ghost'}
                block
                className="mt-5 min-h-[44px]"
                onClick={(e) => { e.stopPropagation(); toggleEnroll(b.id); }}
              >
                {isEnrolled ? 'ยกเลิกสมัคร' : 'สมัคร'}
              </Button>
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
          <Button variant="ghost" leadingIcon={<Plus size={14} />}>
            เพิ่มผู้อุปการะ
          </Button>
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
              แนบใบเสร็จรับเงิน จะโอนเข้าบัญชีธนาคารของคุณใน 3–5 วันทำการ
              หลังการอนุมัติของหัวหน้างาน
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="primary" leadingIcon={<Plus size={14} />}>
                สร้างคำขอเบิก
              </Button>
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
        <ul role="list" className="divide-y divide-hairline">
          {HUMI_CLAIM_HISTORY.map((r) => {
            const meta = CLAIM_STATUS_META[r.status];
            return (
              <li
                key={r.id}
                className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-3"
              >
                <span
                  aria-hidden
                  className="flex h-10 w-8 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-canvas-soft text-ink-muted"
                >
                  <FileText size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-body font-semibold text-ink">
                    {r.type}{' '}
                    <span className="font-normal text-ink-muted">· {r.date}</span>
                  </p>
                  <p className="text-small text-ink-muted">{r.desc}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-display text-body font-semibold text-ink tabular-nums">
                    {r.amount}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                      meta.toneClass
                    )}
                  >
                    {meta.label}
                  </span>
                  <Button variant="ghost" size="sm">
                    เปิด
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
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
              className="flex h-10 w-8 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-canvas-soft text-ink-muted"
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

// ────────────────────────────────────────────────────────────
// Tab: Pay
// ────────────────────────────────────────────────────────────

function PayTab() {
  return (
    <Card variant="raised" size="lg">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <CardEyebrow>ทุกสิ้นเดือน · เงินเข้ารอบถัดไป 30 เม.ย.</CardEyebrow>
          <CardTitle className="mt-1">สลิปเงินเดือน</CardTitle>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
            'text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
            'bg-accent-soft text-[color:var(--color-accent-ink)]'
          )}
        >
          <Circle size={6} fill="currentColor" aria-hidden />
          รายได้สะสมปีนี้ ฿294,180.44
        </span>
      </div>
      <ul role="list" className="divide-y divide-hairline">
        {HUMI_PAYSLIPS.map((p) => (
          <li
            key={p.id}
            className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-3"
          >
            <span
              aria-hidden
              className="flex h-10 w-8 shrink-0 items-center justify-center rounded-[6px] border border-hairline bg-canvas-soft text-ink-muted"
            >
              <FileText size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body font-semibold text-ink">{p.date}</p>
              <p className="text-small text-ink-muted">
                {p.hours} · รวมก่อนหัก {p.gross}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em] whitespace-nowrap',
                  'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]'
                )}
              >
                เงินเข้าแล้ว
              </span>
              <Button variant="ghost" size="sm" leadingIcon={<Download size={14} />}>
                PDF
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
