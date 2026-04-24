// position.ts — Position Master types (Spec B3 §3)
// Source: BRD #95 (CNeXt Process 04), BRD #85, SF Organization Information pattern
export interface Position {
  code: string              // e.g. "POS-00042" (unique, stable)
  titleTh: string           // "ผู้จัดการสาขา"
  titleEn: string           // "Branch Manager"
  businessUnit: string      // BU code, e.g. "ROBINSON"
  businessUnitLabel: string // "Robinson Department Store"
  branch?: string           // Store branch code (retail)
  branchLabel?: string      // "Robinson Rama 9"
  job: string               // Job family code, e.g. "RETAIL_OPS_MGT"
  jobLabel: string          // "Retail Operations Management"
  jobGrade: string          // "JG-08"
  jobGradeLabel: string     // "Senior Manager"
  managerPositionCode?: string // FK to another Position.code (reporting line)
  managerPositionLabel?: string
  hrDistrict?: string       // Central retail custom (SF Pattern: Store/Branch + HR District)
  active: boolean
}

// Derived — what cascades when user picks a Position (BRD #95: all-or-nothing)
export type PositionCascade = Pick<Position,
  | 'code' | 'titleTh' | 'titleEn'
  | 'businessUnit' | 'businessUnitLabel'
  | 'branch' | 'branchLabel'
  | 'job' | 'jobLabel'
  | 'jobGrade' | 'jobGradeLabel'
  | 'managerPositionCode' | 'managerPositionLabel'
  | 'hrDistrict'
>
