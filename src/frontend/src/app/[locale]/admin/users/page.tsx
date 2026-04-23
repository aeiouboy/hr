'use client'

// users/page.tsx — hub landing: 6 tool cards (BRD #184-189)
// AC-1: 6 cards + BRD badge + คำอธิบายภาษาไทย
import Link from 'next/link'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'

const TOOLS = [
  {
    href: '/admin/users/data-permissions',
    title: 'กลุ่มสิทธิ์ข้อมูล',
    brd: 'BRD #184',
    description: 'กำหนดขอบเขตข้อมูลที่แต่ละกลุ่มผู้ใช้มีสิทธิ์เข้าถึง ตามโมดูล กลุ่มธุรกิจ บริษัท แผนก หน่วยงาน หรือกลุ่มพนักงาน',
    icon: '🔒',
    actor: 'HRIS Admin / SPD Admin',
  },
  {
    href: '/admin/users/role-groups',
    title: 'กลุ่มสิทธิ์แอปพลิเคชัน',
    brd: 'BRD #185',
    description: 'กำหนดสิทธิ์เมนูและสิทธิ์ระดับฟิลด์ (ดู แก้ไข เปิดใช้ ปิดใช้) สำหรับแต่ละกลุ่มผู้ใช้',
    icon: '🛡️',
    actor: 'HRIS Admin',
  },
  {
    href: '/admin/users/user-assignment',
    title: 'กำหนดสิทธิ์ผู้ใช้',
    brd: 'BRD #186',
    description: 'มอบหมายผู้ใช้ให้กับกลุ่มสิทธิ์แอปพลิเคชันและกลุ่มสิทธิ์ข้อมูล',
    icon: '👥',
    actor: 'HRIS Admin',
  },
  {
    href: '/admin/users/proxy',
    title: 'จัดการตัวแทนดำเนินการ',
    brd: 'BRD #187',
    description: 'มอบสิทธิ์ชั่วคราวให้ผู้อื่นดำเนินการแทน พร้อมบันทึกทุกการใช้งาน',
    icon: '🔄',
    actor: 'Admin (exclusive)',
  },
  {
    href: '/admin/users/foundation-audit',
    title: 'ประวัติการแก้ไขข้อมูลพื้นฐาน',
    brd: 'BRD #188',
    description: 'ดูประวัติการเปลี่ยนแปลงข้อมูลบริษัท แผนก หน่วยงาน รวมถึงการย้ายตำแหน่งของพนักงาน',
    icon: '📋',
    actor: 'HRIS Admin',
  },
  {
    href: '/admin/users/audit-report',
    title: 'รายงานบันทึกการใช้งาน',
    brd: 'BRD #189',
    description: 'ดูและส่งออกประวัติการเพิ่ม แก้ไข และลบข้อมูลในทุกโมดูลของระบบ',
    icon: '📊',
    actor: 'Admin / HRIS Admin',
  },
] as const

export default function UsersPage() {
  const proxies = useUsersPermissions((s) => s.proxies)
  const auditReport = useUsersPermissions((s) => s.auditReport)

  const pendingProxies = proxies.filter((p) => p.status === 'PENDING').length
  const today = new Date().toDateString()
  const todayAudit = auditReport.filter(
    (a) => new Date(a.timestamp).toDateString() === today
  ).length

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">ผู้ใช้และสิทธิ์</h1>
        <p className="mt-1 text-sm text-gray-500">
          จัดการกลุ่มผู้ใช้ สิทธิ์ข้อมูล การมอบหมาย และประวัติการใช้งานระบบ
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        {pendingProxies > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm">
            <span className="text-amber-600 font-medium">ตัวแทนดำเนินการรออนุมัติ</span>
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingProxies}
            </span>
          </div>
        )}
        {todayAudit > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <span className="text-blue-600 font-medium">บันทึกการใช้งานวันนี้</span>
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {todayAudit}
            </span>
          </div>
        )}
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="รายการ tools จัดการผู้ใช้และสิทธิ์"
      >
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            role="listitem"
            className="flex flex-col gap-3 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
              <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                {tool.brd}
              </span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors whitespace-nowrap">
                {tool.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500 line-clamp-3">{tool.description}</p>
            </div>
            <div className="mt-auto">
              <span className="text-xs text-gray-400">ผู้ใช้: {tool.actor}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
