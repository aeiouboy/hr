'use client'

// security/page.tsx — Security & Governance hub landing (BRD #199-204)
// AC: 4 security tiles + alert counts (unsigned consent, failed logins)

import Link from 'next/link'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

const TOOLS = [
  {
    href: '/admin/system/security/consent',
    title: 'Consent Form',
    brd: 'BRD #199',
    description: 'จัดการ PDPA consent — ดูจำนวน signed/pending/expired + ส่ง reminder',
    icon: '📝',
    alertKey: 'pendingConsent' as const,
    alertLabel: 'รออนุมัติ',
  },
  {
    href: '/admin/system/security/traffic',
    title: 'Traffic Report',
    brd: 'BRD #200',
    description: 'ดูรายงาน login activity — date range filter + export CSV',
    icon: '📊',
    alertKey: 'failedLogins' as const,
    alertLabel: 'login ล้มเหลว (7 วัน)',
  },
  {
    href: '/admin/system/security/settings',
    title: 'Security Settings',
    brd: 'BRD #201-204',
    description: 'ตั้งค่าความปลอดภัย — Hidden Profile, Direct User, Encryption Policy, Session Timeout',
    icon: '🔒',
    alertKey: null,
    alertLabel: null,
  },
] as const

export default function SecurityPage() {
  const consentForms = useDataManagement((s) => s.consentForms)
  const trafficLog = useDataManagement((s) => s.trafficLog)
  const sessionTimeoutMinutes = useDataManagement((s) => s.sessionTimeoutMinutes)

  const pendingConsent = consentForms.filter((c) => c.status === 'pending').length
  const failedLogins = trafficLog.filter((t) => !t.isSuccess).length

  const alertCounts: Record<string, number> = {
    pendingConsent,
    failedLogins,
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Security & Governance</h1>
        <p className="mt-1 text-sm text-gray-500">
          ดูแลความปลอดภัยระบบ — Consent, Traffic, Hidden Profile, Direct User, Encryption, Session Timeout
        </p>
      </div>

      {/* Alert summary bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {pendingConsent > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm">
            <span className="text-amber-600 font-medium">Consent รออนุมัติ</span>
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingConsent}
            </span>
          </div>
        )}
        {failedLogins > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm">
            <span className="text-red-600 font-medium">Login ล้มเหลว</span>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {failedLogins}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <span className="text-blue-600 font-medium">Session Timeout</span>
          <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {sessionTimeoutMinutes} นาที
          </span>
        </div>
      </div>

      <div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="รายการ Security tools"
      >
        {TOOLS.map((tool) => {
          const alertCount = tool.alertKey ? alertCounts[tool.alertKey] : 0
          return (
            <Link
              key={tool.href}
              href={tool.href}
              role="listitem"
              className="flex flex-col gap-3 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
                <div className="flex items-center gap-2">
                  {alertCount > 0 && tool.alertLabel && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {alertCount}
                    </span>
                  )}
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {tool.brd}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors whitespace-nowrap">
                  {tool.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500 line-clamp-3">{tool.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
