'use client'

// admin/system/layout.tsx — sub-nav สำหรับ 4 hubs: Reporting / Integration / System / Security
// Part E Wave 2a — BRD #193-207

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

const SUB_HUBS = [
  { href: '/admin/system/reports',     label: 'รายงาน',    labelEn: 'Reporting' },
  { href: '/admin/system/integration', label: 'การเชื่อมต่อ', labelEn: 'Integration' },
  { href: '/admin/system/features',    label: 'ฟีเจอร์ระบบ', labelEn: 'System' },
  { href: '/admin/system/security',    label: 'ความปลอดภัย', labelEn: 'Security' },
] as const

export default function SystemLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-full">
      {/* Sub-hub nav */}
      <nav
        aria-label="เมนูย่อยระบบ"
        className="border-b border-gray-200 bg-white px-6"
      >
        <ul className="flex gap-1" role="tablist">
          {SUB_HUBS.map((hub) => {
            const isActive = pathname === hub.href || pathname.startsWith(hub.href + '/')
            return (
              <li key={hub.href} role="presentation">
                <Link
                  href={hub.href}
                  role="tab"
                  aria-selected={isActive}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                    isActive
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300',
                  ].join(' ')}
                >
                  {hub.label}
                  <span className="text-xs text-gray-400 hidden lg:inline">({hub.labelEn})</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Hub content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}
