// src/lib/calculations/calcAge.ts
// F1: calcAge — BRD #93
// F2: calcGeneration — BRD #93 + spec B4 §8 decision 1

import type { YearMonth, GenerationCode } from './types'

// Custom error classes for defensive edge cases (I4, E1)
export class InvalidDateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidDateError'
  }
}

/** Parse YYYY-MM-DD string, throws InvalidDateError on bad input */
function parseDate(str: string, label: string): Date {
  if (!str || typeof str !== 'string') {
    throw new InvalidDateError(`${label} is required`)
  }
  const d = new Date(str)
  if (isNaN(d.getTime())) {
    throw new InvalidDateError(`${label} "${str}" is not a valid date`)
  }
  return d
}

/** Build Thai display string from years + months */
function buildDisplay(years: number, months: number): string {
  if (years === 0 && months === 0) return '0 เดือน'
  if (years === 0) return `${months} เดือน`
  if (months === 0) return `${years} ปี`
  return `${years} ปี ${months} เดือน`
}

/**
 * F1 — calcAge
 *
 * Computes age from date_of_birth to asOf date.
 * decimal = (asOf − dob + 1) / 365.25 per BRD #93 line 2115, rounded to 1 dp.
 * Year.month: years = full years elapsed, months = remainder months (0-11).
 *
 * @param dob   - ISO date string "YYYY-MM-DD"
 * @param asOf  - ISO date string "YYYY-MM-DD" (default: today, injected via param — pure function)
 *
 * Throws InvalidDateError if dob is empty/invalid, or if dob is in the future (E1).
 */
export function calcAge(
  dob: string,
  asOf: string = new Date().toISOString().slice(0, 10),
): YearMonth {
  const dobDate = parseDate(dob, 'dob')
  const asOfDate = parseDate(asOf, 'asOf')

  // E1: DOB cannot be future
  if (dobDate > asOfDate) {
    throw new InvalidDateError('DOB cannot be future')
  }

  // decimal per BRD #93: (asOf - dob + 1) / 365.25
  const msPerDay = 86_400_000
  const diffDays = Math.floor((asOfDate.getTime() - dobDate.getTime()) / msPerDay) + 1
  const decimal = Math.round((diffDays / 365.25) * 10) / 10

  // Full years elapsed
  let years = asOfDate.getFullYear() - dobDate.getFullYear()
  let annivMonth = dobDate.getMonth()
  let annivDay = dobDate.getDate()

  // E4: Leap-year birthday (Feb 29) on non-leap asOf year — use Feb 28
  if (annivMonth === 1 && annivDay === 29) {
    const asOfYear = asOfDate.getFullYear()
    const isLeap = (asOfYear % 4 === 0 && asOfYear % 100 !== 0) || asOfYear % 400 === 0
    if (!isLeap) annivDay = 28
  }

  // Check if birthday has occurred this year in asOf
  const birthdayThisYear = new Date(asOfDate.getFullYear(), annivMonth, annivDay)
  if (asOfDate < birthdayThisYear) {
    years -= 1
  }

  // Months remainder (I2)
  const lastBirthday = new Date(
    asOfDate.getFullYear() - (asOfDate < birthdayThisYear ? 1 : 0),
    annivMonth,
    annivDay,
  )
  let months = asOfDate.getMonth() - lastBirthday.getMonth()
  if (months < 0) months += 12

  return {
    years,
    months,
    display: buildDisplay(years, months),
    decimal,
  }
}

/**
 * F2 — calcGeneration
 *
 * Returns generation bucket based on birth year.
 * Boundaries from spec B4 §8 decision 1 (standard international cutoffs):
 *   BabyBoomer  1946-1964  (pre-1946 also maps to BabyBoomer per E10)
 *   GenX        1965-1980
 *   Millennial  1981-1996
 *   GenZ        1997-2012
 *   GenAlpha    2013+
 *
 * @param dob - ISO date string "YYYY-MM-DD"
 * Throws InvalidDateError on missing/invalid input (I4).
 */
export function calcGeneration(dob: string): GenerationCode {
  const dobDate = parseDate(dob, 'dob')
  const birthYear = dobDate.getFullYear()

  // E10: DOB before 1946 → BabyBoomer (extend earliest bucket)
  if (birthYear <= 1964) return 'BabyBoomer'
  if (birthYear <= 1980) return 'GenX'
  if (birthYear <= 1996) return 'Millennial'
  if (birthYear <= 2012) return 'GenZ'
  return 'GenAlpha'
}
