import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { ACTION_FIELD_CONTRACTS } from '@/lib/admin/lifecycle/actionFieldContracts'
import { buildContractRenewalTimelineEvent } from '@/lib/admin/lifecycle/contractRenewalPayload'

const contractRenewalPagePath = 'src/app/[locale]/admin/employees/[id]/contract-renewal/page.tsx'
const contractRenewalPage = () => readFileSync(join(process.cwd(), contractRenewalPagePath), 'utf8')

const contractRenewalFieldNames = [
  'currentEndDate',
  'newEndDate',
  'renewalReason',
  'newAllowanceAmount',
  'newAllowanceNote',
] as const

describe('contract renewal action field contract migration', () => {
  it('keeps the contract renewal field set limited to BRD/SF-supported contract fields', () => {
    const fields = ACTION_FIELD_CONTRACTS.contract_renewal.fields

    expect(Object.keys(fields)).toEqual(contractRenewalFieldNames)
    expect(fields.currentEndDate.visibility).toBe('readonly')
    expect(fields.newEndDate.requirement).toBe('required')
    expect(fields.newEndDate.validation).toBe('> currentEndDate')
    expect(fields.newAllowanceAmount.validation).toBe('>= 0')
    expect(fields.newAllowanceNote.condition).toBe('Shown when newAllowanceAmount > 0')
    expect(fields).not.toHaveProperty('eventReason')
    expect(fields).not.toHaveProperty('effectiveDate')
  })

  it('renders contract renewal form labels and controls from actionFieldContracts only', () => {
    const source = contractRenewalPage()

    expect(source).toContain("getLifecycleActionFieldContract('contract_renewal')")
    for (const fieldName of contractRenewalFieldNames) {
      expect(source).toContain(`CONTRACT_RENEWAL_FIELDS.${fieldName}.labelTh`)
    }

    const editableControlIds = Array.from(
      source.matchAll(/<(?:input|textarea)\b[\s\S]*?\bid="([^"]+)"/g),
      (match) => match[1],
    )
    expect(editableControlIds).toEqual([
      'newEndDate',
      'renewalReason',
      'newAllowanceAmount',
      'newAllowanceNote',
    ])
    expect(source).not.toContain('EffectiveDateGate')
    expect(source).not.toContain('gatedEffectiveDate')
    expect(source).not.toContain('ReasonPicker')
    expect(source).not.toContain('eventReason')
    expect(source).not.toMatch(/\b(?:id|htmlFor)="effectiveDate"/)
    expect(source).not.toContain('placeholder=')
  })

  it('validates only supported contract renewal rules', () => {
    const source = contractRenewalPage()

    expect(source).toContain('newEndDate > currentEndDate')
    expect(source).toContain('min={currentEndDate ? addDays(currentEndDate, 1) : undefined}')
    expect(source).toContain('Number(value) < 0')
    expect(source).not.toContain('Number(value) <= 0')
    expect(source).toContain('allowanceAmt > 0')
  })

  it('does not require or default an SF eventReason to validate contract renewal', () => {
    const source = contractRenewalPage()
    const isValidExpression = source.match(
      /const isValid = ([\s\S]*?)\n\n  \/\/ ── Submit/,
    )?.[1]

    expect(isValidExpression).toBe(
      "newEndDateValid && (newAllowanceAmount === '' || allowanceError === '')",
    )
    expect(source).not.toMatch(/eventReason(?:Valid|Required|Default|Code|Error)/)
    expect(source).not.toMatch(/setEventReason|useState<string>\('(?:CONTRACT|RENEW|CR)_/)
  })

  it('submits a timeline payload with only contract-supported renewal data and no invented eventReason', () => {
    const event = buildContractRenewalTimelineEvent({
      id: 'evt-contract-renewal-test',
      employeeId: 'E001',
      currentEndDate: '2026-05-31',
      recordedAt: '2026-05-11T10:00:00.000Z',
      actorUserId: 'admin-current',
      newEndDate: '2027-05-31',
      renewalReason: ' ต่อสัญญาตามผลงาน ',
    })

    expect(event).toEqual({
      id: 'evt-contract-renewal-test',
      employeeId: 'E001',
      kind: 'contract_renewal',
      effectiveDate: '2026-05-31',
      recordedAt: '2026-05-11T10:00:00.000Z',
      actorUserId: 'admin-current',
      newEndDate: '2027-05-31',
      notes: 'ต่อสัญญาตามผลงาน',
    })
    expect(Object.keys(event)).toEqual([
      'id',
      'employeeId',
      'kind',
      'effectiveDate',
      'recordedAt',
      'actorUserId',
      'newEndDate',
      'notes',
    ])
    expect(event).not.toHaveProperty('eventReason')
  })

  it('ignores any attempted default SF eventReason when building the submission payload', () => {
    const event = buildContractRenewalTimelineEvent({
      id: 'evt-contract-renewal-default-test',
      employeeId: 'E001',
      currentEndDate: '2026-05-31',
      recordedAt: '2026-05-11T10:00:00.000Z',
      actorUserId: 'admin-current',
      newEndDate: '2027-05-31',
      eventReason: 'CONTRACT_RENEWAL',
    } as Parameters<typeof buildContractRenewalTimelineEvent>[0] & { eventReason: string })

    expect(event).toMatchObject({
      id: 'evt-contract-renewal-default-test',
      kind: 'contract_renewal',
      effectiveDate: '2026-05-31',
      newEndDate: '2027-05-31',
    })
    expect(event).not.toHaveProperty('eventReason')
    expect(Object.values(event)).not.toContain('CONTRACT_RENEWAL')
  })
})
