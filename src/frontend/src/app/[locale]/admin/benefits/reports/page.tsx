'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Card, CardEyebrow, CardTitle } from '@/components/humi';

// STA-26 PR-F — Benefits Reports landing
// 5 standard BE_26 report cards + Story Report shell
// Each card links to the EXISTING /admin/system/reports/builder — DO NOT build new builder.

const REPORTS = [
  {
    id: 'BE_26_01',
    eyebrow: 'A-RP-01',
    titleTh: 'รายงานเคลมพนักงาน',
    titleEn: 'Benefits — Employee Claim',
    descTh: 'รายการเคลมทั้งหมด แยกตามแผน/ช่วงเวลา/พนักงาน',
    descEn: 'All claims by plan / period / employee',
  },
  {
    id: 'BE_26_02',
    eyebrow: 'A-RP-02',
    titleTh: 'การวิเคราะห์ต้นทุน (Actual + Predictive)',
    titleEn: 'Cost Analysis (Actual + Predictive)',
    descTh: 'ต้นทุนสวัสดิการเทียบงบ + ประมาณการอนาคต (Q28 — รอ confirm โมเดล)',
    descEn: 'Actual cost vs budget + future projection (Q28 model pending)',
  },
  {
    id: 'BE_26_03',
    eyebrow: 'A-RP-03',
    titleTh: 'รายงานการลงทะเบียน',
    titleEn: 'Enrollment Report',
    descTh: 'สถานะการลงทะเบียนสวัสดิการประจำปีต่อพนักงาน',
    descEn: 'Annual enrollment status per employee',
  },
  {
    id: 'BE_26_04',
    eyebrow: 'A-RP-04',
    titleTh: 'สถิติการลงทะเบียน (รายวัน + % ในช่วง)',
    titleEn: 'Enrollment Statistics (per day + window %)',
    descTh: 'การลงทะเบียนต่อวัน + ร้อยละภายในหน้าต่างเวลา',
    descEn: 'Day-level enrollment + percentage within window',
  },
  {
    id: 'BE_26_05',
    eyebrow: 'A-RP-05',
    titleTh: 'รายงานการลงทะเบียนประกัน',
    titleEn: 'Insurance Enrollment Report',
    descTh: 'ผู้ลงทะเบียนแผนประกันชีวิต/อุบัติเหตุ',
    descEn: 'Subscribers to life / accident insurance plans',
  },
] as const;

const STORY_REPORT = {
  eyebrow: 'A-RP-06 + BRD 138',
  titleTh: 'Story Report (ปรับแต่งเอง)',
  titleEn: 'Story Report (Custom)',
  descTh: 'สร้างรายงานปรับแต่ง (รวม Special Privilege และอื่น ๆ) ผ่าน Story Report shell',
  descEn: 'Build custom reports (Special Privilege etc.) via Story Report shell',
} as const;

export default function BenefitReportsPage() {
  const locale = useLocale();
  const isTh = locale !== 'en';
  const builderBase = `/${locale}/admin/system/reports/builder`;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <CardEyebrow>{isTh ? 'สวัสดิการ · รายงาน' : 'Benefits · Reports'}</CardEyebrow>
        <h1 className="font-display text-3xl font-semibold text-ink mt-1">
          {isTh ? 'รายงานสวัสดิการ' : 'Benefit Reports'}
        </h1>
        <p className="mt-2 text-small text-ink-muted">
          {isTh
            ? 'รายงานมาตรฐาน BE_26 และ Story Report — เปิดใน Report Builder ที่มีอยู่'
            : 'Standard BE_26 reports + Story Report — opens in existing Report Builder'}
        </p>
      </header>

      {/* 5 standard report cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r) => (
          <Link
            key={r.id}
            href={`${builderBase}?module=benefit&template=${r.id}`}
            className="group"
          >
            <Card variant="raised" size="md" className="h-full transition hover:border-accent/50">
              <CardEyebrow>{r.eyebrow}</CardEyebrow>
              <CardTitle>{isTh ? r.titleTh : r.titleEn}</CardTitle>
              <p className="mt-2 text-small text-ink-muted">
                {isTh ? r.descTh : r.descEn}
              </p>
              <p className="mt-3 text-small text-accent group-hover:underline">
                {isTh ? 'เปิดใน Builder →' : 'Open in Builder →'}
              </p>
            </Card>
          </Link>
        ))}
      </section>

      {/* Story Report shell card */}
      <section>
        <Link
          href={`${builderBase}?mode=story&module=benefit`}
          className="group block"
        >
          <Card variant="raised" size="md" className="transition hover:border-accent/50">
            <CardEyebrow>{STORY_REPORT.eyebrow}</CardEyebrow>
            <CardTitle>{isTh ? STORY_REPORT.titleTh : STORY_REPORT.titleEn}</CardTitle>
            <p className="mt-2 text-small text-ink-muted">
              {isTh ? STORY_REPORT.descTh : STORY_REPORT.descEn}
            </p>
            <p className="mt-3 text-small text-accent group-hover:underline">
              {isTh ? 'สร้างรายงานใหม่ →' : 'Build new report →'}
            </p>
          </Card>
        </Link>
      </section>

      {/* Capabilities footnote: A-RP-07/08/09 */}
      <Card variant="raised" size="md">
        <CardEyebrow>{isTh ? 'ความสามารถ' : 'Capabilities'}</CardEyebrow>
        <ul className="mt-3 space-y-2 text-small text-ink-muted">
          <li>• {isTh ? 'รันออนไลน์ / Offline + อีเมลแจ้งเตือน (A-RP-07)' : 'Run online / offline + email notify (A-RP-07)'}</li>
          <li>• {isTh ? 'ส่งออก CSV / Excel (A-RP-08)' : 'Export CSV / Excel (A-RP-08)'}</li>
          <li>• {isTh ? 'Filter Summary popup: Date Range, Employee ID, Plan ฯลฯ (A-RP-09)' : 'Filter Summary popup: Date Range, Employee ID, Plan, etc. (A-RP-09)'}</li>
        </ul>
        <p className="mt-3 text-[length:var(--text-eyebrow)] text-ink-muted">
          {isTh
            ? 'รายงานสวัสดิการเปิดใน Report Builder ของระบบ — ไม่มี Builder ใหม่ใน scope นี้'
            : 'Benefit reports open in the existing system Report Builder — no new Builder in this scope'}
        </p>
      </Card>
    </div>
  );
}
