// employment-event-types.ts — B2 types สำหรับ EmploymentState history model
//
// NOTE: B4 (lib/calculations/types.ts) มี LifecycleEvent แบบ minimal (ไม่มี id/recordedAt/createdBy)
// B2 extends ด้วย audit fields ที่ต้องใช้ใน store
// Consumers ที่ต้องการ base type เท่านั้น (เช่น calcYearOfService) ยังคง import จาก @/lib/calculations

// Re-export เพื่อ convenience — B4 canonical types
export type { LifecycleEventType } from '@/lib/calculations/types'

// LifecycleEvent แบบ full (B2 store version) — superset ของ B4
export interface LifecycleEvent {
  id: string              // ULID — sortable, unique, generated on append (I11)
  employeeId: string      // FK
  type: import('@/lib/calculations/types').LifecycleEventType
  effectiveDate: string   // ISO 8601 YYYY-MM-DD
  recordedAt: string      // ISO 8601 datetime — set by store, not caller (I12)
  createdBy: string       // userId / 'system' / 'seed'
  meta?: {
    fromBU?: string
    toBU?: string
    fromPosition?: string
    toPosition?: string
    fromJG?: string
    toJG?: string
    fromJob?: string
    toJob?: string
    reason?: string       // free-text or 'new_employee_code' | 'correction'
    notes?: string
    // REHIRE specific
    newEmployeeCode?: boolean      // true = Company rule assigns new employee code (CRC/CPN)
    seniorityOverride?: string     // explicit seniority date if rehire continuity manual-set
  }
}

// Derived snapshot ณ วันใดวันหนึ่ง — คำนวณโดย foldEventsToSnapshot() ไม่เก็บใน store
export interface EmploymentSnapshot {
  employeeId: string
  asOfDate: string
  status: 'ACTIVE' | 'SUSPENDED' | 'TERMINATED' | 'PENDING_HIRE'
  currentBU?: string
  currentPosition?: string
  currentJG?: string
  currentJob?: string
  hireDate?: string               // earliest HIRE.effectiveDate
  mostRecentStartDate?: string    // latest HIRE หรือ REHIRE (for tenure)
  continuousServiceStart?: string // seniorityOverride หรือ original hire
  actingPositions: string[]       // ACTING_START ที่ยังไม่มี ACTING_END match
  events: LifecycleEvent[]        // all events ≤ asOf, sorted ascending
}

// Error classes — Thai-primary messages (spec §8, C6)
export class LifecycleViolationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LifecycleViolationError'
  }
}

export class DuplicateHireError extends LifecycleViolationError {
  constructor(message: string) {
    super(message)
    this.name = 'DuplicateHireError'
  }
}

export class IncompleteEventError extends LifecycleViolationError {
  constructor(message: string) {
    super(message)
    this.name = 'IncompleteEventError'
  }
}
