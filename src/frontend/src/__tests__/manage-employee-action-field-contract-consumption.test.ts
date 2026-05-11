import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ACTION_FIELD_CONTRACTS } from '@/lib/admin/lifecycle/actionFieldContracts'

const routeFiles = {
  terminate: 'src/app/[locale]/admin/employees/[id]/terminate/page.tsx',
  rehire: 'src/app/[locale]/admin/employees/[id]/rehire/page.tsx',
  contract_renewal: 'src/app/[locale]/admin/employees/[id]/contract-renewal/page.tsx',
  promotion: 'src/app/[locale]/admin/employees/[id]/promotion/page.tsx',
  acting: 'src/app/[locale]/admin/employees/[id]/acting/page.tsx',
  probation: 'src/app/[locale]/admin/employees/[id]/probation/page.tsx',
  change_type: 'src/app/[locale]/admin/employees/[id]/change-type/page.tsx',
  edit: 'src/app/[locale]/admin/employees/[id]/edit/page.tsx',
} as const

function readRoute(path: string) {
  return readFileSync(join(process.cwd(), path), 'utf8')
}

describe('Manage Employee action pages consume actionFieldContracts', () => {
  it.each(Object.entries(routeFiles))('%s imports the field contract registry', (actionKey, path) => {
    const source = readRoute(path)

    expect(source).toContain("@/lib/admin/lifecycle/actionFieldContracts")
    expect(source).toContain(`getLifecycleActionFieldContract('${actionKey}')`)
  })

  it('does not render ReasonPicker controls for contract-hidden eventReason fields', () => {
    const hiddenEventReasonActions = ['rehire', 'acting', 'probation'] as const

    for (const actionKey of hiddenEventReasonActions) {
      const source = readRoute(routeFiles[actionKey])
      const eventReasonField = ACTION_FIELD_CONTRACTS[actionKey].fields.eventReason

      expect(eventReasonField.visibility).toBe('hidden')
      expect(source).not.toMatch(/<ReasonPicker[\s\S]{0,240}event=.*(?:5584|5589|5594)/)
    }
  })

  it('keeps Rehire eventReason hidden unless the contract explicitly changes it to a system note', () => {
    const source = readRoute(routeFiles.rehire)
    const eventReasonField = ACTION_FIELD_CONTRACTS.rehire.fields.eventReason

    expect(eventReasonField.visibility).toBe('hidden')
    expect(eventReasonField.component).toBe('systemNote')
    expect(eventReasonField.sfMapping?.eventReasons).toEqual(['RE_REHIRE_LT1', 'RE_REHIRE_GE1'])

    expect(source).toContain("const SHOULD_RENDER_REHIRE_EVENT_REASON_NOTE = REHIRE_FIELDS.eventReason.visibility === 'system'")
    expect(source).toContain('{SHOULD_RENDER_REHIRE_EVENT_REASON_NOTE && (')
    expect(source).not.toContain('<ReasonPicker')
    expect(source).not.toContain('id="rehire-event-reason"')
    expect(source).not.toContain('htmlFor="eventReason"')
    expect(source).not.toContain('onChange={(code) => patch({ eventReason: code })}')
  })

  it('maps Change Type eventReason as a hidden system-derived JCHG_EMPTYPE value', () => {
    const source = readRoute(routeFiles.change_type)
    const eventReasonField = ACTION_FIELD_CONTRACTS.change_type.fields.eventReason

    expect(eventReasonField.component).toBe('systemNote')
    expect(eventReasonField.visibility).toBe('hidden')
    expect(eventReasonField.defaultValue).toBe('JCHG_EMPTYPE')
    expect(eventReasonField.sfMapping).toMatchObject({
      entity: 'EmpJob',
      field: 'eventReason',
      event: '5594',
    })
    expect(eventReasonField.sfMapping?.eventReasons).toEqual(['JCHG_EMPTYPE'])

    expect(source).toContain('CHANGE_TYPE_EVENT_REASON_FIELD = CHANGE_TYPE_FIELDS.eventReason')
    expect(source).toContain('CHANGE_TYPE_EVENT_REASON_FIELD.sfMapping?.eventReasons?.[0]')
    expect(source).toContain("CHANGE_TYPE_EVENT_REASON_FIELD.visibility === 'visible'")
    expect(source).toContain("CHANGE_TYPE_EVENT_REASON_FIELD.component === 'reasonPicker'")
    expect(source).toContain('{SHOULD_RENDER_CHANGE_TYPE_EVENT_REASON_INPUT && (')
    expect(source).toContain('<ReasonPicker')
    expect(source).toContain('optionCodes={CHANGE_TYPE_EVENT_REASON_CODES}')
    expect(source).toContain('label={CHANGE_TYPE_EVENT_REASON_FIELD.labelTh}')
    expect(source).toContain("SHOULD_RENDER_CHANGE_TYPE_EVENT_REASON_NOTE = CHANGE_TYPE_EVENT_REASON_FIELD.visibility === 'system'")
    expect(source).toContain('{SHOULD_RENDER_CHANGE_TYPE_EVENT_REASON_NOTE && (')
    expect(source).toContain('CHANGE_TYPE_EVENT_REASON_FIELD.labelTh')
  })

  it('keeps Promotion change type visible, backed by contract eventReason values, and separate from notes', () => {
    const source = readRoute(routeFiles.promotion)
    const eventReasonField = ACTION_FIELD_CONTRACTS.promotion.fields.eventReason
    const notesField = ACTION_FIELD_CONTRACTS.promotion.fields.notes

    expect(eventReasonField.visibility).toBe('visible')
    expect(eventReasonField.component).toBe('reasonPicker')
    expect(eventReasonField.sfMapping?.eventReasons).toEqual([
      'PRM_PRM',
      'PRM_DEMO',
      'PRCHG_PROMO',
      'PRCHG_MERINC',
      'PRCHG_ADJPOS',
      'PRCHG_SALADJ',
      'PRCHG_SALCUT',
    ])
    expect(notesField.component).toBe('textarea')
    expect(notesField.submitMapping).toBe('timelineNotes')

    expect(source).toContain('PROMOTION_EVENT_REASON_CODES = PROMOTION_FIELDS.eventReason.sfMapping?.eventReasons')
    expect(source).toContain('optionCodes={PROMOTION_EVENT_REASON_CODES}')
    expect(source).toContain('label={PROMOTION_FIELDS.eventReason.labelTh}')
    expect(source).toContain('htmlFor="notes"')
    expect(source).toContain('PROMOTION_FIELDS.notes.labelTh')
    expect(source).not.toContain("const [mode, setMode]")
  })
})
