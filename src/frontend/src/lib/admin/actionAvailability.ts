// actionAvailability — status/probation/class gate per lifecycle action.
// Single source of truth consumed by /employees/[id] Detail (cards) +
// each lifecycle route (guard banner). Pure function, no store.

export type ActionKey =
  | 'probation' | 'edit' | 'transfer' | 'terminate'
  | 'contract_renewal' | 'rehire' | 'change_type' | 'promotion' | 'acting'

export interface EmployeeStatusFacts {
  status: 'active' | 'inactive' | 'terminated'
  probation_status: 'in_probation' | 'passed' | 'terminated' | 'extended'
  employee_class: 'PERMANENT' | 'PARTIME'
}

export function actionAvailability(
  emp: EmployeeStatusFacts,
): Record<ActionKey, { ok: boolean; reason?: string }> {
  const isActive = emp.status === 'active'
  const isTerminated = emp.status === 'terminated'
  const isInactive = emp.status === 'inactive'
  const inProbation = isActive && (emp.probation_status === 'in_probation' || emp.probation_status === 'extended')
  const passedProb = isActive && emp.probation_status === 'passed'
  const isPartime = emp.employee_class === 'PARTIME'

  const terminated_reason = isTerminated ? 'พนักงานพ้นสภาพแล้ว — ใช้ "จ้างซ้ำ" ก่อน' : ''
  const inactive_reason = isInactive ? 'พนักงานไม่ได้ทำงานอยู่ — ต้องเปิดใช้งานก่อน' : ''

  return {
    probation: inProbation
      ? { ok: true }
      : isTerminated ? { ok: false, reason: terminated_reason }
      : isInactive ? { ok: false, reason: inactive_reason }
      : { ok: false, reason: 'ผ่านทดลองงานแล้ว ไม่ต้องประเมินเพิ่ม' },
    edit: isActive
      ? { ok: true }
      : isTerminated ? { ok: false, reason: terminated_reason }
      : { ok: false, reason: inactive_reason },
    transfer: (passedProb || (isActive && emp.probation_status !== 'terminated'))
      ? { ok: true }
      : isTerminated ? { ok: false, reason: terminated_reason }
      : isInactive ? { ok: false, reason: inactive_reason }
      : { ok: false, reason: 'รอให้ผ่านทดลองงานก่อน' },
    terminate: isActive
      ? { ok: true }
      : isTerminated ? { ok: false, reason: 'พนักงานพ้นสภาพไปแล้ว' }
      : { ok: false, reason: inactive_reason },
    contract_renewal: (isActive && isPartime)
      ? { ok: true }
      : isTerminated ? { ok: false, reason: terminated_reason }
      : isInactive ? { ok: false, reason: inactive_reason }
      : { ok: false, reason: 'เฉพาะพนักงานสัญญาจ้าง/Part-time เท่านั้น' },
    rehire: isTerminated
      ? { ok: true }
      : { ok: false, reason: 'เฉพาะพนักงานที่พ้นสภาพแล้ว' },
    change_type: isActive
      ? { ok: true }
      : isTerminated ? { ok: false, reason: terminated_reason }
      : { ok: false, reason: inactive_reason },
    promotion: passedProb
      ? { ok: true }
      : isTerminated ? { ok: false, reason: terminated_reason }
      : isInactive ? { ok: false, reason: inactive_reason }
      : { ok: false, reason: 'รอให้ผ่านทดลองงานก่อน' },
    acting: isActive
      ? { ok: true }
      : isTerminated ? { ok: false, reason: terminated_reason }
      : { ok: false, reason: inactive_reason },
  }
}
