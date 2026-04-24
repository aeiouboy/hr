'use client'

// users/page.tsx — hub landing: 6 tool cards (BRD #184-189)
// AC-1: 6 cards + BRD badge + คำอธิบายภาษาไทย
import Link from 'next/link'
import { Lock, Shield, Users, RefreshCw, ClipboardList, BarChart3 } from 'lucide-react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'

const TOOLS = [
  {
    href: '/admin/users/data-permissions',
    title: 'กลุ่มสิทธิ์ข้อมูล',
    brd: 'BRD #184',
    description: 'กำหนดขอบเขตข้อมูลที่แต่ละกลุ่มผู้ใช้มีสิทธิ์เข้าถึง ตามโมดูล กลุ่มธุรกิจ บริษัท แผนก หน่วยงาน หรือกลุ่มพนักงาน',
    Icon: Lock,
    actor: 'HRIS Admin / SPD Admin',
  },
  {
    href: '/admin/users/role-groups',
    title: 'กลุ่มสิทธิ์แอปพลิเคชัน',
    brd: 'BRD #185',
    description: 'กำหนดสิทธิ์เมนูและสิทธิ์ระดับฟิลด์ (ดู แก้ไข เปิดใช้ ปิดใช้) สำหรับแต่ละกลุ่มผู้ใช้',
    Icon: Shield,
    actor: 'HRIS Admin',
  },
  {
    href: '/admin/users/user-assignment',
    title: 'กำหนดสิทธิ์ผู้ใช้',
    brd: 'BRD #186',
    description: 'มอบหมายผู้ใช้ให้กับกลุ่มสิทธิ์แอปพลิเคชันและกลุ่มสิทธิ์ข้อมูล',
    Icon: Users,
    actor: 'HRIS Admin',
  },
  {
    href: '/admin/users/proxy',
    title: 'จัดการตัวแทนดำเนินการ',
    brd: 'BRD #187',
    description: 'มอบสิทธิ์ชั่วคราวให้ผู้อื่นดำเนินการแทน พร้อมบันทึกทุกการใช้งาน',
    Icon: RefreshCw,
    actor: 'Admin (exclusive)',
  },
  {
    href: '/admin/users/foundation-audit',
    title: 'ประวัติการแก้ไขข้อมูลพื้นฐาน',
    brd: 'BRD #188',
    description: 'ดูประวัติการเปลี่ยนแปลงข้อมูลบริษัท แผนก หน่วยงาน รวมถึงการย้ายตำแหน่งของพนักงาน',
    Icon: ClipboardList,
    actor: 'HRIS Admin',
  },
  {
    href: '/admin/users/audit-report',
    title: 'รายงานบันทึกการใช้งาน',
    brd: 'BRD #189',
    description: 'ดูและส่งออกประวัติการเพิ่ม แก้ไข และลบข้อมูลในทุกโมดูลของระบบ',
    Icon: BarChart3,
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
        <h1 className="text-2xl font-semibold text-ink">ผู้ใช้และสิทธิ์</h1>
        <p className="mt-1 text-sm text-ink-muted">
          จัดการกลุ่มผู้ใช้ สิทธิ์ข้อมูล การมอบหมาย และประวัติการใช้งานระบบ
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        {pendingProxies > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-warning-soft border border-warning rounded-lg text-sm">
            <span className="text-warning-ink font-medium">ตัวแทนดำเนินการรออนุมัติ</span>
            <span className="bg-warning text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingProxies}
            </span>
          </div>
        )}
        {todayAudit > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-info-soft border border-info rounded-lg text-sm">
            <span className="text-info font-medium">บันทึกการใช้งานวันนี้</span>
            <span className="bg-info text-white text-xs font-bold px-2 py-0.5 rounded-full">
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
            className="flex flex-col gap-3 p-5 bg-surface rounded-xl border border-hairline shadow-sm hover:shadow-md hover:border-accent transition-all group"
          >
            <div className="flex items-start justify-between">
              <tool.Icon size={20} strokeWidth={1.75} className="text-ink-muted" aria-hidden="true" />
              <span className="text-xs font-mono text-ink-faint bg-canvas-soft px-2 py-0.5 rounded">
                {tool.brd}
              </span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-ink group-hover:text-accent transition-colors whitespace-nowrap">
                {tool.title}
              </h2>
              <p className="mt-1 text-sm text-ink-muted line-clamp-3">{tool.description}</p>
            </div>
            <div className="mt-auto">
              <span className="text-xs text-ink-faint">ผู้ใช้: {tool.actor}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
