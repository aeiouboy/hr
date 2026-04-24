'use client'

// security/page.tsx — Security & Governance hub landing (BRD #199-204)
// AC: 4 security tiles + alert counts (unsigned consent, failed logins)

import Link from 'next/link'
import { FileText, BarChart3, Lock } from 'lucide-react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

const TOOLS = [
  {
    href: '/admin/system/security/consent',
    title: 'Consent Form',
    brd: 'BRD #199',
    description: 'จัดการ PDPA consent — ดูจำนวน signed/pending/expired + ส่ง reminder',
    Icon: FileText,
    alertKey: 'pendingConsent' as const,
    alertLabel: 'รออนุมัติ',
  },
  {
    href: '/admin/system/security/traffic',
    title: 'Traffic Report',
    brd: 'BRD #200',
    description: 'ดูรายงาน login activity — date range filter + export CSV',
    Icon: BarChart3,
    alertKey: 'failedLogins' as const,
    alertLabel: 'login ล้มเหลว (7 วัน)',
  },
  {
    href: '/admin/system/security/settings',
    title: 'Security Settings',
    brd: 'BRD #201-204',
    description: 'ตั้งค่าความปลอดภัย, Direct User, Encryption Policy, Session Timeout',
    Icon: Lock,
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
        <h1 className="text-2xl font-semibold text-ink">Security & Governance</h1>
        <p className="mt-1 text-sm text-ink-muted">
          ดูแลความปลอดภัยระบบ, Traffic, Hidden Profile, Direct User, Encryption, Session Timeout
        </p>
      </div>

      {/* Alert summary bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {pendingConsent > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-warning-soft border border-warning rounded-lg text-sm">
            <span className="text-warning-ink font-medium">Consent รออนุมัติ</span>
            <span className="bg-warning text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingConsent}
            </span>
          </div>
        )}
        {failedLogins > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-danger-soft border border-danger rounded-lg text-sm">
            <span className="text-danger-ink font-medium">Login ล้มเหลว</span>
            <span className="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {failedLogins}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-2 bg-info-soft border border-info rounded-lg text-sm">
          <span className="text-info font-medium">Session Timeout</span>
          <span className="bg-info text-white text-xs font-bold px-2 py-0.5 rounded-full">
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
              className="flex flex-col gap-3 p-5 bg-surface rounded-xl border border-hairline shadow-sm hover:shadow-md hover:border-accent transition-all group"
            >
              <div className="flex items-start justify-between">
                <tool.Icon size={20} strokeWidth={1.75} className="text-ink-muted" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  {alertCount > 0 && tool.alertLabel && (
                    <span className="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {alertCount}
                    </span>
                  )}
                  <span className="text-xs font-mono text-ink-faint bg-canvas-soft px-2 py-0.5 rounded">
                    {tool.brd}
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold text-ink group-hover:text-accent transition-colors whitespace-nowrap">
                  {tool.title}
                </h2>
                <p className="mt-1 text-sm text-ink-muted line-clamp-3">{tool.description}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
