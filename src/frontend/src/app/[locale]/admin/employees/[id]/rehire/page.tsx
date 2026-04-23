'use client'

// rehire/page.tsx — Placeholder (Phase 2)
// ข้อมูลพนักงาน + "Coming soon" notice
// Wave 2 implements รับกลับเข้าทำงาน wizard ที่นี่

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, UserCheck, Lock } from 'lucide-react'
import { useEmployees } from '@/lib/admin/store/useEmployees'

export default function RehirePlaceholderPage() {
  const params = useParams()
  const empId = params.id as string
  const locale = params.locale as string

  const employee = useEmployees((s) => s.getById(empId)) ?? null
  const nameTh = employee ? `${employee.first_name_th} ${employee.last_name_th}` : empId

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Back nav */}
      <div>
        <Link
          href={`/${locale}/admin/employees/${empId}`}
          className="humi-row text-body text-ink-muted hover:text-accent transition-colors"
          style={{ display: 'inline-flex', gap: 6 }}
        >
          <ArrowLeft size={16} aria-hidden />
          <span>กลับไปหน้าข้อมูลพนักงาน</span>
        </Link>
      </div>

      {/* Employee snapshot (read-only) */}
      {employee && (
        <div className="humi-card humi-card--cream">
          <div className="humi-eyebrow" style={{ marginBottom: 6 }}>{employee.employee_id}</div>
          <div className="font-display text-[18px] font-semibold text-ink">{nameTh}</div>
          <div className="text-small text-ink-muted">{employee.position_title} · {employee.company}</div>
        </div>
      )}

      {/* Coming soon notice */}
      <div className="humi-card" style={{ textAlign: 'center', padding: 48 }}>
        <div
          style={{
            width: 56, height: 56, borderRadius: 16,
            background: 'var(--color-hairline-soft)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16, color: 'var(--color-ink-faint)',
          }}
        >
          <UserCheck size={28} aria-hidden />
        </div>
        <div className="humi-row" style={{ justifyContent: 'center', gap: 6, marginBottom: 10 }}>
          <Lock size={14} className="text-ink-muted" aria-hidden />
          <span className="font-display text-[18px] font-semibold text-ink">รับกลับเข้าทำงาน</span>
        </div>
        <p className="text-body text-ink-muted">Phase 2 — Coming soon</p>
        <p className="text-small text-ink-faint mt-2">
          ฟีเจอร์ Rehire จะเปิดใช้งานใน Phase 2
        </p>
      </div>
    </div>
  )
}
