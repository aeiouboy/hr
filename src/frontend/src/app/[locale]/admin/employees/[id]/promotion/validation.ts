/** salaryChangePct must be in 0-50 range */
export function isSalaryPctValid(pct: number): boolean {
  return pct >= 0 && pct <= 50
}
