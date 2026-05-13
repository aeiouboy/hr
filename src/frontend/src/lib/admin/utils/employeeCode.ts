// Employee Code generation — single source of truth
// User feedback: employee ID must be generated only after Submit and must be
// an 8-digit numeric code starting with 2.

export interface EmployeeForCodeGen {
  employee_id: string
}

const EMPLOYEE_CODE_FLOOR = 20_001_000

/** Next sequential 8-digit employee code from existing employees. */
export function nextEmployeeCode(all: EmployeeForCodeGen[]): string {
  const nums = all
    .map((e) => {
      const m = e.employee_id.match(/^2\d{7}$/)
      return m ? parseInt(m[0], 10) : 0
    })
    .filter((n) => n > 0)
  const max = nums.length > 0 ? Math.max(...nums) : EMPLOYEE_CODE_FLOOR
  return String(max + 1)
}
