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
    expect(page).toContain('TRANSFER_FIELDS.migrationNote.labelTh')
  })
})
