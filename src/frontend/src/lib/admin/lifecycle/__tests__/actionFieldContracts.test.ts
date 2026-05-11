import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { MANAGE_EMPLOYEE_ACTIONS } from '../actionRequirements'
import { ACTION_FIELD_CONTRACTS, getLifecycleActionFieldContract } from '../actionFieldContracts'

describe('Manage Employee action field contracts', () => {
  it('has one field contract for every Manage Employee action', () => {
    expect(Object.keys(ACTION_FIELD_CONTRACTS)).toEqual(MANAGE_EMPLOYEE_ACTIONS.map((action) => action.key))
  })

  it('keeps every field source-backed and implementation-ready', () => {
    for (const action of MANAGE_EMPLOYEE_ACTIONS) {
      const contract = getLifecycleActionFieldContract(action.key)
      expect(contract.route).toBe(action.route)
      expect(contract.sourceRefs.length, `${action.key} must cite action sources`).toBeGreaterThan(0)

      for (const field of Object.values(contract.fields)) {
        expect(field.name, `${action.key} field must name itself`).toBeTruthy()
        expect(field.labelTh, `${action.key}.${field.name} must have Thai copy`).toBeTruthy()
        expect(field.sourceRefs.length, `${action.key}.${field.name} must cite BA/BRD/SF source`).toBeGreaterThan(0)
        expect(field.submitMapping, `${action.key}.${field.name} must define submit mapping`).toBeTruthy()
      }
    }
  })

  it('locks Transfer reason semantics: SF event reason, free-text reason, and system seniority note are separate fields', () => {
    const transfer = getLifecycleActionFieldContract('transfer')

    expect(transfer.fields.eventReason.labelTh).toBe('ประเภทการโอนย้าย')
    expect(transfer.fields.eventReason.component).toBe('reasonPicker')
    expect(transfer.fields.eventReason.requirement).toBe('required')
    expect(transfer.fields.eventReason.sfMapping?.eventReasons).toEqual(['TRN_ROTATION', 'TRN_TRNACCOMP', 'TRN_TRNWIC'])

    expect(transfer.fields.reason.labelTh).toBe('เหตุผลเพิ่มเติม')
    expect(transfer.fields.reason.component).toBe('textarea')
    expect(transfer.fields.reason.requirement).toBe('optional')

    expect(transfer.fields.migrationNote.labelTh).toBe('หมายเหตุระบบ: อายุงานนับต่อเนื่อง')
    expect(transfer.fields.migrationNote.component).toBe('systemNote')
    expect(transfer.fields.migrationNote.visibility).toBe('system')
    expect(transfer.fields.migrationNote.defaultValue).toBe('Seniority continuous')
  })

  it('does not allow Transfer to render migrationNote as an editable input again', () => {
    const page = readFileSync(
      resolve(process.cwd(), 'src/app/[locale]/admin/employees/[id]/transfer/page.tsx'),
      'utf8',
    )

    expect(page).not.toContain('htmlFor="migrationNote"')
    expect(page).not.toContain('onChange={(e) => patch({ migrationNote')
    expect(page).not.toMatch(/<(input|select|textarea)\b[^>]*(id|name)=["']migrationNote["']/)
    expect(page).not.toMatch(/<(input|select|textarea)\b[^>]*aria-label=\{TRANSFER_FIELDS\.migrationNote\.labelTh\}/)
    expect(page).toContain('TRANSFER_MIGRATION_NOTE_DEFAULT = String(TRANSFER_FIELDS.migrationNote.defaultValue')
    expect(page).toContain('TRANSFER_FIELDS.migrationNote.labelTh')
  })

  it('locks Termination reason semantics to the SF TERM_* event reasons', () => {
    const terminate = getLifecycleActionFieldContract('terminate')

    expect(terminate.fields.reasonCode.component).toBe('reasonPicker')
    expect(terminate.fields.reasonCode.sfMapping).toMatchObject({
      entity: 'EmpEmploymentTermination',
      field: 'eventReason',
      event: '5597',
    })
    expect(terminate.fields.reasonCode.sfMapping?.eventReasons).toEqual([
      'TERM_RETIRE',
      'TERM_DISMISS',
      'TERM_DM',
      'TERM_ENDASSIGN',
      'TERM_EOC',
      'TERM_ERLRETIRE',
      'TERM_LAYOFF',
      'TERM_NOSHOW',
      'TERM_PASSAWAY',
      'TERM_RESIGN',
      'TERM_REORG',
      'TERM_TRANS',
      'TERM_UNSUCPROB',
      'TERM_COVID',
      'TERM_CRISIS',
      'TERM_ABSENT',
      'TERM_REDUNDANCY',
    ])
    expect(terminate.fields.reasonCode.sfMapping?.eventReasons).toHaveLength(17)
    expect(terminate.fields.reasonCode.sfMapping?.eventReasons?.every((code) => code.startsWith('TERM_'))).toBe(true)
  })

  it('does not allow Termination to fall back to a page-local reason-code stub', () => {
    const page = readFileSync(
      resolve(process.cwd(), 'src/app/[locale]/admin/employees/[id]/terminate/page.tsx'),
      'utf8',
    )

    expect(page).toContain('TERMINATE_REASON_EVENT = (TERMINATE_FIELDS.reasonCode.sfMapping?.event')
    expect(page).toContain('event={TERMINATE_REASON_EVENT}')
    expect(page).not.toContain('event="5597"')
    expect(page).not.toMatch(/const\s+TERMINATION_(REASON|REASONS|REASON_CODES)\s*=/)
    expect(page).not.toMatch(/const\s+TERMINATE_(REASON|REASONS|REASON_CODES)\s*=/)
  })
})
