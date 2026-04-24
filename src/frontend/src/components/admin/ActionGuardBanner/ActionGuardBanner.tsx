'use client'

import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'
import type { ActionKey } from '@/lib/admin/actionAvailability'

interface Props {
  actionKey: ActionKey
  reason: string
  backHref: string
  actionLabel: string
}

// Soft-block banner shown when a lifecycle route is loaded for an employee
// whose status doesn't allow the action. Defense-in-depth alongside the
// Detail page action card gating — handles deep-link / back-button cases.
export function ActionGuardBanner({ reason, backHref, actionLabel }: Props) {
  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <Link
          href={backHref}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <ArrowLeft size={16} aria-hidden />
          <span>กลับไปหน้าพนักงาน</span>
        </Link>
      </div>

      <div
        className="humi-card humi-card--cream"
        role="alert"
        aria-live="polite"
        style={{ padding: 32, textAlign: 'center' }}
      >
        <div
          style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'var(--color-hairline-soft)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-ink-muted)', marginBottom: 12,
          }}
        >
          <Lock size={24} aria-hidden />
        </div>
        <h1 className="font-display text-[20px] font-semibold text-ink" style={{ marginBottom: 4 }}>
          ดำเนินการ "{actionLabel}" ไม่ได้ในตอนนี้
        </h1>
        <p className="text-body text-ink-muted" style={{ marginBottom: 16, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          {reason}
        </p>
        <Link
          href={backHref}
          className="humi-button humi-button--ghost"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <ArrowLeft size={16} aria-hidden />
          <span>กลับไปหน้าพนักงาน</span>
        </Link>
      </div>
    </div>
  )
}
