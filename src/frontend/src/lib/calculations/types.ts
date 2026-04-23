// src/lib/calculations/types.ts
// Verbatim from spec B4 §3

export interface YearMonth {
  years: number    // integer, 0 if < 1 year
  months: number   // 0-11
  display: string  // Thai localized, e.g. "3 ปี 5 เดือน"
  decimal: number  // 3.5 (years + months/12, rounded to 1 dp)
}

export type LifecycleEventType =
  | 'HIRE'
  | 'REHIRE'
  | 'TRANSFER'               // cross-BU
  | 'CHANGE_POSITION'        // within BU
  | 'CHANGE_JOB'
  | 'PROMOTION'              // JG change up
  | 'DEMOTION'               // JG change down
  | 'ACTING_START'           // acting assignment start
  | 'ACTING_END'
  | 'SUSPEND_START'
  | 'SUSPEND_END'
  | 'TERMINATE'
  | 'CHANGE_EMPLOYEE_TYPE'   // CNeXt #06 JCHG_EMPTYPE

export interface LifecycleEvent {
  type: LifecycleEventType
  effectiveDate: string  // ISO 8601 YYYY-MM-DD
  meta?: {
    fromBU?: string
    toBU?: string
    fromPosition?: string
    toPosition?: string
    fromJG?: string
    toJG?: string
    reason?: string
  }
}

export type GenerationCode = 'BabyBoomer' | 'GenX' | 'Millennial' | 'GenZ' | 'GenAlpha'
