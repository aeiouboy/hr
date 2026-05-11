'use client'

import type { EmployeeActionKey } from '@/lib/admin/lifecycle/actionRequirements'
import { getEmployeeActionRequirement } from '@/lib/admin/lifecycle/actionRequirements'

interface Props {
  actionKey: EmployeeActionKey
}

export function ActionRequirementBanner({ actionKey }: Props) {
  const req = getEmployeeActionRequirement(actionKey)
  const eventText = req.sfEvent ? `SF Event ${req.sfEvent}` : 'Direct SF edit'
  const reasonText = req.sfEventReasons.length > 0
    ? req.sfEventReasons.join(', ')
    : 'ไม่มี event reason สำหรับ direct personal-data edit'

  return (
    <section
      className="humi-card humi-card--cream"
      aria-label="BRD และ SF requirement ของ action นี้"
      style={{ padding: 16 }}
    >
      <div className="humi-row" style={{ gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <div className="humi-eyebrow" style={{ marginBottom: 4 }}>BRD / SF CONTRACT</div>
          <div className="text-body font-semibold text-ink">{req.labelTh}</div>
          <p className="text-small text-ink-muted mt-0.5">{req.descriptionTh}</p>
        </div>
        <span className="humi-tag humi-tag--accent">{req.brdRefs.join(' · ')}</span>
        <span className="humi-tag">{eventText}</span>
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3" style={{ marginTop: 12 }}>
        <div>
          <dt className="humi-eyebrow" style={{ marginBottom: 3 }}>SF Entity</dt>
          <dd className="text-small text-ink">{req.sfEntity}</dd>
        </div>
        <div>
          <dt className="humi-eyebrow" style={{ marginBottom: 3 }}>Event Reason</dt>
          <dd className="text-small text-ink">{reasonText}</dd>
        </div>
        <div>
          <dt className="humi-eyebrow" style={{ marginBottom: 3 }}>Required fields</dt>
          <dd className="text-small text-ink">{req.requiredFields.join(', ')}</dd>
        </div>
      </dl>
    </section>
  )
}
