import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { MANAGE_EMPLOYEE_ACTIONS, employeeActionRequirements } from '../actionRequirements'

describe('Manage Employee action BRD/SF registry', () => {
  it('covers every actionAvailability key exactly once', () => {
    expect(MANAGE_EMPLOYEE_ACTIONS.map((a) => a.key)).toEqual([
      'probation',
      'edit',
      'transfer',
      'terminate',
      'contract_renewal',
      'rehire',
      'change_type',
      'promotion',
      'acting',
    ])
  })

  it('does not expose implemented actions without a route file', () => {
    for (const action of MANAGE_EMPLOYEE_ACTIONS) {
      if (!action.implemented) continue
      const pageFile = resolve(process.cwd(), `src/app/[locale]/admin/employees/[id]/${action.route}/page.tsx`)
      expect(existsSync(pageFile), `${action.key} route missing: ${pageFile}`).toBe(true)
    }
  })

  it('pins known SF event reasons from BRD/SF master', () => {
    expect(employeeActionRequirements.rehire.sfEventReasons).toEqual(['RE_REHIRE_LT1', 'RE_REHIRE_GE1'])
    expect(employeeActionRequirements.change_type.sfEventReasons).toEqual(['JCHG_EMPTYPE'])
    expect(employeeActionRequirements.promotion.sfEventReasons).toContain('PRM_PRM')
    expect(employeeActionRequirements.promotion.sfEventReasons).toContain('PRCHG_PROMO')
    expect(employeeActionRequirements.terminate.sfEventReasons).toContain('TERM_RESIGN')
    expect(employeeActionRequirements.terminate.sfEventReasons).toHaveLength(17)
    expect(employeeActionRequirements.transfer.sfEventReasons).toEqual(['TRN_ROTATION', 'TRN_TRNACCOMP', 'TRN_TRNWIC'])
  })
})
