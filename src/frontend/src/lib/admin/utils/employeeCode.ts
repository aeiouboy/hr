// Employee Code generation — single source of truth
// BRD #102 (BRD-EC-summary.md:2267): "TH New HR System : ระบบ Generate Employee Code
// ต่อจาก Range ของ VN" — system-generated, not user-typed. Invariant I1 in
// MK XLII spec template.

export interface EmployeeForCodeGen {
  employee_id: string
}

/** Next sequential EMP-XXXX code from existing employees. */
export function nextEmployeeCode(all: EmployeeForCodeGen[]): string {
  const nums = all
    .map((e) => {
      const m = e.employee_id.match(/^EMP-(\d+)$/)
      return m ? parseInt(m[1], 10) : 0
    })
    .filter((n) => n > 0)
  const max = nums.length > 0 ? Math.max(...nums) : 1000
  return `EMP-${max + 1}`
}
