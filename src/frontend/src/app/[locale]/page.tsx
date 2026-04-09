'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import {
  User,
  Calendar,
  FileText,
  ClipboardList,
  Bell,
  Briefcase,
  Clock,
  ChevronRight,
  MapPin,
  Building2,
} from 'lucide-react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatChip } from '@/components/ui/stat-chip';
import { useAuthStore } from '@/stores/auth-store';

/* ─── Mock data ───────────────────────────────────────────────────── */

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'ประกาศวันหยุดสงกรานต์ 2569',
    body: 'บริษัทจะหยุดพักร้อนสงกรานต์ 13–15 เมษายน 2569 รวม 3 วัน',
    date: '8 เม.ย. 2569',
    category: 'ประกาศ',
  },
  {
    id: 2,
    title: 'อัปเดตนโยบาย Work From Home Q2/2569',
    body: 'พนักงานสามารถทำงานจากที่บ้านได้สูงสุด 2 วัน/สัปดาห์ เริ่ม 1 พ.ค. 2569',
    date: '5 เม.ย. 2569',
    category: 'นโยบาย',
  },
  {
    id: 3,
    title: 'กิจกรรม Team Building ไตรมาส 2',
    body: 'กำหนดการณ์กิจกรรม Team Building วันที่ 20 เม.ย. 2569 ณ สวนนงนุช พัทยา',
    date: '2 เม.ย. 2569',
    category: 'กิจกรรม',
  },
];

const JOB_POSTINGS = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Technology',
    location: 'กรุงเทพฯ',
    type: 'Full-time',
    postedDate: '1 เม.ย. 2569',
  },
  {
    id: 2,
    title: 'HR Business Partner',
    department: 'Human Resources',
    location: 'กรุงเทพฯ',
    type: 'Full-time',
    postedDate: '28 มี.ค. 2569',
  },
  {
    id: 3,
    title: 'Finance Analyst',
    department: 'Finance',
    location: 'กรุงเทพฯ / Hybrid',
    type: 'Full-time',
    postedDate: '25 มี.ค. 2569',
  },
];

const RECENT_ACTIVITIES = [
  {
    id: 1,
    icon: Calendar,
    description: 'คำขอลาพักร้อนได้รับอนุมัติ — 10–11 เม.ย. 2569',
    time: 'วันนี้ 09:42',
    dotColor: 'bg-success',
  },
  {
    id: 2,
    icon: FileText,
    description: 'สลิปเงินเดือนเดือน มีนาคม 2569 พร้อมใช้งาน',
    time: 'เมื่อวาน 08:00',
    dotColor: 'bg-accent',
  },
  {
    id: 3,
    icon: ClipboardList,
    description: 'คำขอเบิกค่าใช้จ่ายรอการอนุมัติจากผู้จัดการ',
    time: '5 เม.ย. 2569',
    dotColor: 'bg-warning',
  },
  {
    id: 4,
    icon: User,
    description: 'อัปเดตข้อมูลที่อยู่เรียบร้อยแล้ว',
    time: '3 เม.ย. 2569',
    dotColor: 'bg-ink-muted',
  },
  {
    id: 5,
    icon: Calendar,
    description: 'คำขอลาป่วย 1 วัน — 28 มี.ค. 2569 บันทึกแล้ว',
    time: '28 มี.ค. 2569',
    dotColor: 'bg-ink-muted',
  },
];

const CATEGORY_VARIANT: Record<string, 'info' | 'success' | 'neutral'> = {
  'ประกาศ': 'info',
  'นโยบาย': 'neutral',
  'กิจกรรม': 'success',
};

/* ─── Quick actions ───────────────────────────────────────────────── */

interface QuickAction {
  label: string;
  href: string;
  Icon: React.ElementType;
  chipClass: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: 'โปรไฟล์',
    href: '/profile',
    Icon: User,
    chipClass: 'bg-accent-tint text-accent',
  },
  {
    label: 'ขอลา',
    href: '/leave',
    Icon: Calendar,
    chipClass: 'bg-success-tint text-success',
  },
  {
    label: 'สลิปเงินเดือน',
    href: '/payslip',
    Icon: FileText,
    chipClass: 'bg-accent-tint text-accent',
  },
  {
    label: 'งานที่รออนุมัติ',
    href: '/workflows',
    Icon: ClipboardList,
    chipClass: 'bg-warning-tint text-warning',
  },
];

/* ─── Page ────────────────────────────────────────────────────────── */

export default function HomePage() {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.startsWith('/th') ? 'th' : 'en';
  const { username } = useAuthStore();

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 max-w-[1280px]">

          {/* ── Welcome Hero ──────────────────────────────────────── */}
          <div className="rounded-md bg-surface shadow-card border-t-[3px] border-t-success overflow-hidden mb-4 sm:mb-6">
            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-ink-muted mb-0.5 uppercase tracking-wide font-medium">
                    ยินดีต้อนรับกลับมา
                  </p>
                  <h1 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                    {username || 'User'}
                  </h1>
                  <p className="text-sm text-ink-soft mt-0.5">
                    นักพัฒนาซอฟต์แวร์อาวุโส · Technology · กรุงเทพฯ
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatChip label="วันลาคงเหลือ" value="12.5 วัน" tone="success" />
                  <StatChip label="รออนุมัติ" value="3 รายการ" tone="warning" />
                  <StatChip label="อายุงาน" value="8 ปี 9 เดือน" tone="cobalt" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Quick Action Chips ────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {QUICK_ACTIONS.map((action) => (
              <a
                key={action.href}
                href={`/${locale}${action.href}`}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80 ${action.chipClass}`}
              >
                <action.Icon className="h-4 w-4" />
                {action.label}
              </a>
            ))}
          </div>

          {/* ── Main grid ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">

            {/* Announcements — 2 cols */}
            <div className="lg:col-span-2">
              <Card>
                <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-info-tint flex items-center justify-center">
                      <Bell className="h-4 w-4 text-info" />
                    </div>
                    <span className="text-sm font-semibold text-ink">ประกาศจากบริษัท</span>
                  </div>
                  <a
                    href={`/${locale}/announcements`}
                    className="text-xs text-accent hover:opacity-80 flex items-center gap-0.5"
                  >
                    ดูทั้งหมด <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
                <CardContent className="pt-0 px-5 pb-5">
                  <div className="space-y-3">
                    {ANNOUNCEMENTS.map((item, i) => (
                      <div
                        key={item.id}
                        className={`py-3 ${i < ANNOUNCEMENTS.length - 1 ? 'border-b border-hairline' : ''}`}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <Badge variant={CATEGORY_VARIANT[item.category] ?? 'neutral'}>
                            {item.category}
                          </Badge>
                          <span className="text-xs text-ink-muted ml-auto shrink-0">{item.date}</span>
                        </div>
                        <p className="text-sm font-medium text-ink leading-snug">{item.title}</p>
                        <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Postings — 1 col */}
            <div>
              <Card>
                <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-brand-tint flex items-center justify-center">
                      <Briefcase className="h-4 w-4 text-brand" />
                    </div>
                    <span className="text-sm font-semibold text-ink">ตำแหน่งงานภายใน</span>
                  </div>
                  <a
                    href={`/${locale}/jobs`}
                    className="text-xs text-accent hover:opacity-80 flex items-center gap-0.5"
                  >
                    ดูทั้งหมด <ChevronRight className="h-3 w-3" />
                  </a>
                </div>
                <CardContent className="pt-0 px-5 pb-5">
                  <div className="space-y-3">
                    {JOB_POSTINGS.map((job, i) => (
                      <div
                        key={job.id}
                        className={`py-3 ${i < JOB_POSTINGS.length - 1 ? 'border-b border-hairline' : ''}`}
                      >
                        <p className="text-sm font-medium text-ink leading-snug">{job.title}</p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                          <span className="text-xs text-ink-muted flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {job.department}
                          </span>
                          <span className="text-xs text-ink-muted flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <Badge variant="neutral">{job.type}</Badge>
                          <span className="text-xs text-ink-muted">{job.postedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* ── Recent Activity Timeline ──────────────────────────── */}
          <Card>
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-surface-raised flex items-center justify-center">
                  <Clock className="h-4 w-4 text-ink-soft" />
                </div>
                <span className="text-sm font-semibold text-ink">กิจกรรมล่าสุด</span>
              </div>
            </div>
            <CardContent className="pt-0 px-5 pb-5">
              <div className="relative">
                {/* vertical track */}
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-hairline" />
                <div className="space-y-0">
                  {RECENT_ACTIVITIES.map((activity, i) => (
                    <div key={activity.id} className="flex gap-4 py-3">
                      {/* dot */}
                      <div className="relative z-10 mt-1 shrink-0">
                        <div className={`w-2.5 h-2.5 rounded-full ${activity.dotColor} ring-2 ring-surface`} />
                      </div>
                      {/* content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-ink leading-snug">{activity.description}</p>
                        <p className="text-xs text-ink-muted mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

        </main>
      </div>
    </div>
  );
}
