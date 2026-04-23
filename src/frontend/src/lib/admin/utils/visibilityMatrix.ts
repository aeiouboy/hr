// visibilityMatrix.ts — pure utility functions สำหรับ VisibilityMatrix operations
// ใช้ร่วมกันโดย 3 editors: visibility, mandatory, readonly (#179-181)

import type { RoleName, VisibilityMatrix } from '@/lib/admin/types/adminSelfService'

// ALL_ROLES — ค่าคงที่ทุก role ตาม BRD #184 (verbatim)
export const ALL_ROLES: RoleName[] = ['Employee', 'Manager', 'HRBP', 'SPD']

/**
 * toggleCell — สลับค่า boolean ใน matrix สำหรับ [fieldId][role]
 * return matrix ใหม่ (immutable — ไม่แก้ต้นฉบับ)
 */
export function toggleCell(
  matrix: VisibilityMatrix,
  fieldId: string,
  role: RoleName
): VisibilityMatrix {
  // สร้าง deep copy ของ row ที่ต้องการแก้ไขเท่านั้น — surgical (Rule C1)
  const currentRow = matrix[fieldId] ?? ({} as Record<RoleName, boolean>)
  return {
    ...matrix,
    [fieldId]: {
      ...currentRow,
      [role]: !currentRow[role],
    },
  }
}

/**
 * countEnabled — นับ cell ที่เป็น true สำหรับ role ที่ระบุ
 * ใช้แสดงสถิติ "X/15 fields enabled"
 */
export function countEnabled(matrix: VisibilityMatrix, role: RoleName): number {
  return Object.values(matrix).filter((rowMap) => rowMap[role] === true).length
}

/**
 * validateMatrix — ตรวจสอบว่า matrix มีครบทุก fieldId × role combination
 * คืน true ถ้าทุก entry มี key ทั้ง 4 roles
 */
export function validateMatrix(matrix: VisibilityMatrix): boolean {
  for (const rowMap of Object.values(matrix)) {
    for (const role of ALL_ROLES) {
      if (typeof rowMap[role] !== 'boolean') {
        return false
      }
    }
  }
  return true
}
