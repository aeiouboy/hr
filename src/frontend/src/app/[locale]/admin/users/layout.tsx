'use client'

// users/layout.tsx — sub-nav layout สำหรับ Users & Permissions 6 tools (BRD #184-189)
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TOOLS = [
  { href: '/admin/users',                 label: 'ภาพรวม',                  brd: '' },
  { href: '/admin/users/data-permissions', label: 'กลุ่มสิทธิ์ข้อมูล',        brd: '#184' },
  { href: '/admin/users/role-groups',      label: 'กลุ่มสิทธิ์แอปพลิเคชัน', brd: '#185' },
  { href: '/admin/users/user-assignment',  label: 'กำหนดสิทธิ์ผู้ใช้',        brd: '#186' },
  { href: '/admin/users/proxy',            label: 'จัดการ Proxy',             brd: '#187' },
  { href: '/admin/users/foundation-audit', label: 'ประวัติ Foundation',        brd: '#188' },
  { href: '/admin/users/audit-report',     label: 'รายงาน Audit',             brd: '#189' },
] as const

function UsersSubNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="เมนูย่อย ผู้ใช้และสิทธิ์"
      className="bg-white border-b border-gray-200 px-6"
    >
      <ul className="flex gap-1 overflow-x-auto" role="list">
        {TOOLS.map((tool) => {
          // exact match สำหรับ hub, startsWith สำหรับ sub-routes
          const isActive =
            tool.href === '/admin/users'
              ? pathname === '/admin/users'
              : pathname.startsWith(tool.href)

          return (
            <li key={tool.href}>
              <Link
                href={tool.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors',
                  isActive
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300',
                ].join(' ')}
              >
                <span>{tool.label}</span>
                {tool.brd && (
                  <span className="text-xs text-gray-400 hidden lg:inline">{tool.brd}</span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full">
      <UsersSubNav />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
