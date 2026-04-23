// admin/page.tsx — Humi Admin Center landing hub
// Humi card pattern + 5 entry points ครอบคลุม BRD-EC Parts A-E
import Link from 'next/link';
import {
  UserPlus,
  Settings,
  ShieldCheck,
  Database,
  Users,
  ClipboardList,
  FileText,
} from 'lucide-react';

const ADMIN_SECTIONS = [
  {
    href: '/th/admin/hire',
    icon: UserPlus,
    eyebrow: 'Lifecycle Actions',
    title: 'การจ้างพนักงาน',
    desc: 'รับใหม่ • จ้างซ้ำ • โอนย้าย • ออกจากงาน',
    stat: '4 workflows',
  },
  {
    href: '/th/admin/employees',
    icon: Users,
    eyebrow: 'Employee Data',
    title: 'ข้อมูลพนักงาน',
    desc: 'ดูและแก้ข้อมูลพนักงาน • Employment Info',
    stat: '240K+ records',
  },
  {
    href: '/th/admin/self-service',
    icon: Settings,
    eyebrow: 'Self-Service Config',
    title: 'ตั้งค่า Self-Service',
    desc: 'Field config • Visibility • Mandatory • Quick Actions • Tiles',
    stat: '6 editors',
  },
  {
    href: '/th/admin/users',
    icon: ShieldCheck,
    eyebrow: 'Users & Permissions',
    title: 'ผู้ใช้และสิทธิ์',
    desc: 'Role Groups • Data Permissions • Proxy • Audit',
    stat: '6 tools',
  },
  {
    href: '/th/admin/system',
    icon: Database,
    eyebrow: 'Data Management',
    title: 'จัดการระบบ',
    desc: 'รายงาน • Integration • Security • Data migration',
    stat: '18 tools',
  },
  {
    href: '/th/admin/reports',
    icon: FileText,
    eyebrow: 'Reports',
    title: 'รายงาน',
    desc: 'รายงานทั้งหมด • CSV export',
    stat: 'ดูทั้งหมด',
  },
] as const;

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      {/* Hero card */}
      <div className="humi-card mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            Admin Center
          </span>
          <h1 className="font-display text-[28px] font-semibold leading-tight text-ink">
            ศูนย์จัดการพนักงาน
          </h1>
          <p className="text-body text-ink-soft">
            จัดการข้อมูลพนักงาน การจ้าง การอนุมัติ และการตั้งค่าระบบ EC
          </p>
        </div>

        {/* Quick stats */}
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">พนักงาน</div>
            <div className="mt-0.5 font-display text-[20px] font-semibold text-ink">240K+</div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">Workflow รอดำเนินการ</div>
            <div className="mt-0.5 font-display text-[20px] font-semibold text-accent">0</div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">บริษัท</div>
            <div className="mt-0.5 font-display text-[20px] font-semibold text-ink">164</div>
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">แผนก</div>
            <div className="mt-0.5 font-display text-[20px] font-semibold text-ink">17K</div>
          </div>
        </div>
      </div>

      {/* Sections grid */}
      <h2 className="mb-3 font-display text-[18px] font-semibold text-ink">
        เครื่องมือการจัดการ
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="humi-card group relative transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                    {section.eyebrow}
                  </div>
                  <h3 className="mt-0.5 font-display text-[16px] font-semibold text-ink group-hover:text-accent">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-small text-ink-soft">
                    {section.desc}
                  </p>
                  <div className="mt-2 text-[11px] font-medium text-ink-muted">
                    {section.stat}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent activity placeholder */}
      <div className="humi-card mt-6">
        <div className="flex items-center gap-3">
          <ClipboardList size={18} className="text-ink-muted" aria-hidden="true" />
          <h2 className="font-display text-[16px] font-semibold text-ink">
            กิจกรรมล่าสุด
          </h2>
        </div>
        <p className="mt-3 text-small text-ink-muted">
          ยังไม่มีกิจกรรมในระบบ — เริ่มใช้งานโดยคลิกหนึ่งในเครื่องมือด้านบน
        </p>
      </div>
    </div>
  );
}
