'use client'

// system-features/page.tsx — System Features hub landing (BRD #195, #197, #205, #206, #198)
// AC: 4 feature cards + current language indicator

import Link from 'next/link'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

const LANG_LABELS: Record<string, string> = {
  th: 'ภาษาไทย',
  en: 'English',
  vn: 'Tiếng Việt',
}

const TOOLS = [
  {
    href: '/admin/system/system-features/language',
    title: 'ภาษาระบบ',
    brd: 'BRD #195',
    description: 'เปลี่ยนภาษาของ UI สำหรับผู้ใช้งาน — รองรับ ไทย / อังกฤษ / เวียดนาม',
    icon: '🌐',
  },
  {
    href: '/admin/system/system-features/edocuments',
    title: 'E-Document',
    brd: 'BRD #197',
    description: 'คลังเอกสารดิจิทัล — สัญญาจ้าง ใบสมัคร โอนย้าย ใบลาออก และเอกสาร HR อื่นๆ',
    icon: '📄',
  },
  {
    href: '/admin/system/system-features/data-migration',
    title: 'Data Migration',
    brd: 'BRD #198',
    description: 'นำเข้าข้อมูลจากระบบเก่า — อัปโหลด CSV + validate + dry-run ก่อน import จริง',
    icon: '📦',
  },
] as const

export default function SystemFeaturesPage() {
  const language = useDataManagement((s) => s.language)

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">System Features</h1>
        <p className="mt-1 text-sm text-gray-500">
          ตั้งค่าฟีเจอร์ระบบ — ภาษา, เอกสาร และการนำเข้าข้อมูล
        </p>
      </div>

      <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg w-fit text-sm">
        <span className="text-blue-600 font-medium">ภาษาปัจจุบัน</span>
        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {LANG_LABELS[language] ?? language}
        </span>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="รายการ System Features tools"
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
          </Link>
        ))}
      </div>
    </div>
  )
}
