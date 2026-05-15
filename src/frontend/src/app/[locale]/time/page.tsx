'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, CalendarOff, Timer, CheckSquare } from 'lucide-react';
import { Card, CardTitle } from '@/components/humi';

const TILES = [
  {
    key: 'timesheet',
    icon: Clock,
    titleEn: 'Timesheet',
    titleTh: 'บันทึกเวลางาน',
    descEn: 'Log weekly hours per project',
    descTh: 'บันทึกชั่วโมงทำงานรายสัปดาห์ตามโครงการ',
    href: 'time/timesheet',
  },
  {
    key: 'time-off',
    icon: CalendarOff,
    titleEn: 'Time Off',
    titleTh: 'การลา',
    descEn: 'Request and track leave',
    descTh: 'ยื่นคำขอลาและติดตามสถานะ',
    href: 'timeoff',
  },
  {
    key: 'overtime',
    icon: Timer,
    titleEn: 'Overtime',
    titleTh: 'ล่วงเวลา',
    descEn: 'Submit OT requests (Thai Labor Law)',
    descTh: 'ยื่นขอทำงานล่วงเวลาตามกฎหมายแรงงานไทย',
    href: 'overtime',
  },
  {
    key: 'approvals',
    icon: CheckSquare,
    titleEn: 'Manager Approvals',
    titleTh: 'อนุมัติทีม',
    descEn: 'Review pending requests from your team',
    descTh: 'ตรวจสอบคำขอที่รอดำเนินการจากทีม',
    href: 'quick-approve',
  },
];

export default function TimeLandingPage() {
  const params = useParams();
  const locale = params?.locale as string ?? 'th';
  const isTh = locale === 'th';

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Hero */}
      <div className="rounded-[var(--radius-md)] bg-canvas-soft border border-hairline p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-1">
          {isTh ? 'เวลาและการเข้างาน' : 'Time & Attendance'}
        </p>
        <h1 className="text-2xl font-bold text-ink">
          {isTh ? 'โมดูลเวลางาน' : 'Time Module'}
        </h1>
        <p className="mt-2 text-sm text-ink-muted max-w-xl">
          {isTh
            ? 'บันทึกเวลางาน ยื่นคำขอลา ขอทำงานล่วงเวลา และอนุมัติคำขอของทีม — ครบถ้วนในที่เดียว'
            : 'Log hours, request leave, submit overtime, and approve team requests — all in one place.'}
        </p>
      </div>

      {/* 4-tile grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TILES.map(({ key, icon: Icon, titleEn, titleTh, descEn, descTh, href }) => (
          <Link key={key} href={`/${locale}/${href}`} className="group block no-underline">
            <Card className="h-full hover:shadow-[var(--shadow-card)] transition-shadow">
              <div className="flex items-start gap-4 p-5">
                <span
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    background: 'var(--color-accent-soft)',
                    color: 'var(--color-accent)',
                  }}
                >
                  <Icon size={22} aria-hidden />
                </span>
                <div>
                  <CardTitle className="text-base font-semibold group-hover:text-accent transition-colors">
                    {isTh ? titleTh : titleEn}
                  </CardTitle>
                  <p className="mt-1 text-sm text-ink-muted">{isTh ? descTh : descEn}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
