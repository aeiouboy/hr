'use client'

// admin/system/page.tsx — landing page: 4 hub cards + stat widgets
// Part E Wave 2a

import Link from 'next/link'
import { BarChart3, Plug, Settings2, ShieldCheck } from 'lucide-react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

const HUBS = [
  {
    href: '/admin/system/reports',
    title: 'รายงาน',
    desc: 'สร้าง กำหนดเวลา และจัดการรายงานทั้งหมดในระบบ',
    Icon: BarChart3,
  },
  {
    href: '/admin/system/integration',
    title: 'การเชื่อมต่อระบบ',
    desc: 'จุดเชื่อมต่อกับระบบภายนอกและแอปพลิเคชันที่ใช้ร่วมกัน',
    Icon: Plug,
  },
  {
    href: '/admin/system/features',
    title: 'ฟีเจอร์ระบบ',
    desc: 'ภาษา เอกสารอิเล็กทรอนิกส์ การแสดงผล และกฎการแก้ไข',
    Icon: Settings2,
  },
  {
    href: '/admin/system/security',
    title: 'ความปลอดภัย',
    desc: 'การยินยอม บันทึกการเข้าถึง การเข้ารหัส และการย้ายข้อมูล',
    Icon: ShieldCheck,
  },
] as const

export default function SystemPage() {
  const { reports, scheduledJobs, favouriteReports, integrationEndpoints, consentForms } =
    useDataManagement()

  const stats = [
    { label: 'รายงานทั้งหมด',    value: reports.length },
    { label: 'งานตั้งเวลา',       value: scheduledJobs.filter((j) => j.isActive).length },
    { label: 'รายงานโปรด',        value: favouriteReports.length },
    { label: 'จุดเชื่อมต่อ',        value: integrationEndpoints.length },
    { label: 'การยินยอมรอดำเนินการ', value: consentForms.filter((c) => c.status === 'pending').length },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-ink">ระบบ</h1>
        <p className="mt-1 text-sm text-ink-muted">จัดการรายงาน การเชื่อมต่อ ฟีเจอร์ระบบ และความปลอดภัย</p>
      </div>

      {/* Stat widgets */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-hairline bg-surface p-4 text-center">
            <p className="text-2xl font-bold text-ink">{s.value}</p>
            <p className="mt-1 text-xs text-ink-muted whitespace-nowrap">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Hub cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HUBS.map((hub) => (
          <Link
            key={hub.href}
            href={hub.href}
            className="rounded-xl border border-hairline bg-surface p-5 transition-all shadow-sm hover:border-accent hover:shadow-md"
          >
            <div className="mb-3 text-accent" aria-hidden>
              <hub.Icon size={20} strokeWidth={1.75} />
            </div>
            <h2 className="font-semibold text-ink">{hub.title}</h2>
            <p className="mt-2 text-sm text-ink-muted">{hub.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
