import { describe, expect, it } from 'vitest'
import { nextEmployeeCode } from '../employeeCode'

describe('nextEmployeeCode', () => {
  it('generates an 8-digit employee ID after submit that starts with 2', () => {
    const code = nextEmployeeCode([])

    expect(code).toMatch(/^2\d{7}$/)
  })

  it('increments the highest existing 8-digit employee ID and ignores legacy EMP IDs', () => {
    const code = nextEmployeeCode([
      { employee_id: 'EMP-9999' },
      { employee_id: '20001001' },
      { employee_id: '20001005' },
    ])

    expect(code).toBe('20001006')
  })
})
