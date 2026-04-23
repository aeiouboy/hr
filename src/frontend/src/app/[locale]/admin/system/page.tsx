'use client'

// admin/system/page.tsx — landing page: 4 hub cards + stat widgets
// Part E Wave 2a

import Link from 'next/link'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

const HUBS = [
  {
    href: '/admin/system/reports',
    title: 'รายงาน',
    desc: 'สร้าง กำหนดเวลา และจัดการรายงานทั้งหมดในระบบ',
    icon: '📊',
    color: 'blue',
  },
  {
    href: '/admin/system/integration',
    title: 'การเชื่อมต่อระบบ',
    desc: 'จุดเชื่อมต่อกับระบบภายนอกและแอปพลิเคชันที่ใช้ร่วมกัน',
    icon: '🔗',
    color: 'violet',
  },
  {
    href: '/admin/system/features',
    title: 'ฟีเจอร์ระบบ',
    desc: 'ภาษา เอกสารอิเล็กทรอนิกส์ การแสดงผล และกฎการแก้ไข',
    icon: '⚙️',
    color: 'amber',
  },
  {
    href: '/admin/system/security',
    title: 'ความปลอดภัย',
    desc: 'การยินยอม บันทึกการเข้าถึง การเข้ารหัส และการย้ายข้อมูล',
    icon: '🔒',
    color: 'red',
  },
] as const

const COLOR_MAP: Record<string, string> = {
  blue:   'border-blue-200 hover:border-blue-400 hover:bg-blue-50',
  violet: 'border-violet-200 hover:border-violet-400 hover:bg-violet-50',
  amber:  'border-amber-200 hover:border-amber-400 hover:bg-amber-50',
  red:    'border-red-200 hover:border-red-400 hover:bg-red-50',
}

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
        <h1 className="text-2xl font-semibold text-gray-900">ระบบ</h1>
        <p className="mt-1 text-sm text-gray-500">จัดการรายงาน การเชื่อมต่อ ฟีเจอร์ระบบ และความปลอดภัย</p>
      </div>

      {/* Stat widgets */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="mt-1 text-xs text-gray-500 whitespace-nowrap">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Hub cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {HUBS.map((hub) => (
          <Link
            key={hub.href}
            href={hub.href}
            className={[
              'rounded-xl border-2 bg-white p-5 transition-all shadow-sm hover:shadow-md',
              COLOR_MAP[hub.color],
            ].join(' ')}
          >
            <div className="text-3xl mb-3" aria-hidden>{hub.icon}</div>
            <h2 className="font-semibold text-gray-900">{hub.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{hub.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
