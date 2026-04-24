'use client'

// admin/system/reports/page.tsx — Reporting hub landing
// BRD #193, #196, #206, #207, #164 — Part E Wave 2a

import Link from 'next/link'
import { Star } from 'lucide-react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'
import { formatCron } from '@/lib/admin/utils/cronFormat'

const REPORT_TOOLS = [
  { href: '/admin/system/reports/builder',    label: 'สร้างรายงาน',          labelEn: 'Report Builder' },
  { href: '/admin/system/reports/schedule',   label: 'กำหนดเวลารายงาน',      labelEn: 'Schedule Report' },
  { href: '/admin/system/reports/automation', label: 'งานอัตโนมัติ',          labelEn: 'Report Automation' },
  { href: '/admin/system/reports/favourites', label: 'รายงานโปรด',           labelEn: 'Favourite Reports' },
] as const

export default function ReportsHubPage() {
  const { reports, favouriteReports, scheduledJobs, toggleFavourite } = useDataManagement()

  const recentReports = [...reports]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">รายงาน</h2>
        <p className="mt-1 text-sm text-gray-500">สร้าง กำหนดเวลา และจัดการรายงาน</p>
      </div>

      {/* Quick links to sub-tools */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {REPORT_TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-center hover:bg-blue-100 transition-colors"
          >
            <p className="text-sm font-medium text-blue-800">{tool.label}</p>
            <p className="text-xs text-blue-500">{tool.labelEn}</p>
          </Link>
        ))}
      </div>

      {/* Recent reports list */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">รายงานล่าสุด</h3>
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500">ชื่อรายงาน</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">ประเภท</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">โมดูล</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">รันล่าสุด</th>
                <th className="px-4 py-2 text-center font-medium text-gray-500">โปรด</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">กำหนดเวลา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentReports.map((rpt) => {
                const isFav = favouriteReports.includes(rpt.id)
                const job = scheduledJobs.find((j) => j.reportId === rpt.id && j.isActive)
                const lastRun = rpt.lastRun
                  ? new Date(rpt.lastRun).toLocaleDateString('th-TH')
                  : '-'
                return (
                  <tr key={rpt.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-900 whitespace-nowrap">{rpt.name}</td>
                    <td className="px-4 py-2.5">
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 whitespace-nowrap">
                        {rpt.type}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{rpt.module}</td>
                    <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">{lastRun}</td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => toggleFavourite(rpt.id)}
                        aria-label={isFav ? 'ยกเลิกโปรด' : 'เพิ่มโปรด'}
                        className="text-lg leading-none hover:scale-110 transition-transform"
                      >
                        <Star size={16} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 text-xs whitespace-nowrap">
                      {job ? formatCron(job.cron) : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
