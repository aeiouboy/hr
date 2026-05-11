import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ACTION_FIELD_CONTRACTS } from '@/lib/admin/lifecycle/actionFieldContracts'
import {
  deriveHiddenLifecycleEventReason,
  withSystemEventReasonNote,
} from '@/lib/admin/lifecycle/hiddenEventReasonPayload'

describe('Manage Employee hidden eventReason submit payload helpers', () => {
  it('derives probation hidden eventReason values from the contract-backed outcome mapping', () => {
    expect(ACTION_FIELD_CONTRACTS.probation.fields.eventReason.visibility).toBe('hidden')
    expect(ACTION_FIELD_CONTRACTS.probation.fields.eventReason.sfMapping?.eventReasons).toEqual([
      'COMPROB_COMPROB',
      'DC_EXTPROB',
      'TERM_UNSUCPROB',
    ])

    expect(deriveHiddenLifecycleEventReason('probation', { outcome: 'pass' })).toBe('COMPROB_COMPROB')
    expect(deriveHiddenLifecycleEventReason('probation', { outcome: 'extend' })).toBe('DC_EXTPROB')
    expect(deriveHiddenLifecycleEventReason('probation', { outcome: 'no_pass' })).toBe('TERM_UNSUCPROB')
    expect(deriveHiddenLifecycleEventReason('probation', { outcome: null })).toBe('')
  })

  it('derives default hidden eventReason values for acting and change type from actionFieldContracts', () => {
    expect(ACTION_FIELD_CONTRACTS.acting.fields.eventReason.visibility).toBe('hidden')
    expect(ACTION_FIELD_CONTRACTS.change_type.fields.eventReason.visibility).toBe('hidden')

    expect(deriveHiddenLifecycleEventReason('acting')).toBe('POSCHG_POSCHG')
    expect(deriveHiddenLifecycleEventReason('change_type')).toBe('JCHG_EMPTYPE')
  })

  it('preserves a valid rehire hidden eventReason and can derive LT1/GE1 when dates are available', () => {
    expect(ACTION_FIELD_CONTRACTS.rehire.fields.eventReason.visibility).toBe('hidden')
    expect(ACTION_FIELD_CONTRACTS.rehire.fields.eventReason.sfMapping?.eventReasons).toEqual([
      'RE_REHIRE_LT1',
      'RE_REHIRE_GE1',
    ])

    expect(deriveHiddenLifecycleEventReason('rehire', { preservedEventReason: 'RE_REHIRE_GE1' })).toBe('RE_REHIRE_GE1')
    expect(deriveHiddenLifecycleEventReason('rehire', { preservedEventReason: 'NOT_A_CONTRACT_CODE' })).toBe('RE_REHIRE_LT1')
    expect(deriveHiddenLifecycleEventReason('rehire', {
      lastTerminationDate: '2025-05-01',
      newHireDate: '2026-05-01',
    })).toBe('RE_REHIRE_GE1')
  })

  it('writes hidden eventReason as a system note without adding editable eventReason fields to timeline events', () => {
    expect(withSystemEventReasonNote(' ผู้ใช้กรอกหมายเหตุ ', 'JCHG_EMPTYPE')).toBe('[sfEventReason:JCHG_EMPTYPE]\nผู้ใช้กรอกหมายเหตุ')
    expect(withSystemEventReasonNote(undefined, 'POSCHG_POSCHG')).toBe('[sfEventReason:POSCHG_POSCHG]')
    expect(withSystemEventReasonNote('[sfEventReason:OLD_CODE]\nหมายเหตุเดิม', 'TERM_UNSUCPROB')).toBe('[sfEventReason:TERM_UNSUCPROB]\nหมายเหตุเดิม')
    expect(withSystemEventReasonNote('หมายเหตุเดิม', '')).toBe('หมายเหตุเดิม')
  })
})

function readRoute(path: string) {
  return readFileSync(join(process.cwd(), path), 'utf8')
}

describe('Manage Employee hidden eventReason route submit construction', () => {
  it('uses the hidden eventReason helper when timeline payload notes are constructed', () => {
    expect(readRoute('src/app/[locale]/admin/employees/[id]/rehire/page.tsx')).toContain(
      'notes: withSystemEventReasonNote(rehire.reason, rehireEventReasonForDate(rehire.newHireDate))',
    )
    expect(readRoute('src/app/[locale]/admin/employees/[id]/acting/page.tsx')).toContain(
      'notes: withSystemEventReasonNote(notes, ACTING_EVENT_REASON)',
    )
    expect(readRoute('src/app/[locale]/admin/employees/[id]/probation/page.tsx')).toContain(
      'notes: withSystemEventReasonNote(',
    )
    expect(readRoute('src/app/[locale]/admin/employees/[id]/probation/page.tsx')).toContain(
      'probationEventReasonForOutcome(assessment.outcome)',
    )
  })

  it('keeps hidden eventReason derivation out of editable route controls', () => {
    const rehireSource = readRoute('src/app/[locale]/admin/employees/[id]/rehire/page.tsx')
    const actingSource = readRoute('src/app/[locale]/admin/employees/[id]/acting/page.tsx')
    const probationSource = readRoute('src/app/[locale]/admin/employees/[id]/probation/page.tsx')

    expect(rehireSource).not.toContain('onChange={(code) => patch({ eventReason: code })}')
    expect(actingSource).not.toContain('<ReasonPicker')
    expect(probationSource).not.toContain('<ReasonPicker')
    expect(actingSource).toContain("const ACTING_EVENT_REASON = deriveHiddenLifecycleEventReason('acting')")
    expect(probationSource).toContain("deriveHiddenLifecycleEventReason('probation', { outcome })")
  })
})
