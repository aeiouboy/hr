// adminSelfService.ts — TypeScript types สำหรับ Admin Self-Service Config (Part C)
// BRD #178-183 — Actor: HRIS Admin, Roles: verbatim จาก BRD #184

// 4 roles ตาม BRD #184 Application Role Group — ห้าม invent role อื่น (Rule C8)
export type RoleName = 'Employee' | 'Manager' | 'HRBP' | 'SPD'

// ชื่อ form scope สำหรับ field grouping
export type FormScope = 'Person' | 'Employment' | 'Job'

// ชื่อ editor ที่ active อยู่
export type EditorName =
  | 'field-config'
  | 'visibility'
  | 'mandatory'
  | 'readonly'
  | 'quick-actions'
  | 'tiles'

// FieldConfigEntry — รายการ field แต่ละ field ใน form (#178 Field Configuration)
export interface FieldConfigEntry {
  id: string                  // unique field identifier (snake_case)
  label: string               // ชื่อ field ที่แสดงใน UI
  scope: FormScope            // Person / Employment / Job
  fieldType: 'text' | 'date' | 'select' | 'number' | 'checkbox'
  defaultValue: string | null // ค่าเริ่มต้น (null = no default)
  isSystem: boolean           // system field = ห้าม disable
}

// VisibilityMatrix — map [fieldId][role] → boolean
// ใช้สำหรับ visibility, mandatory, readonly (#179-181)
export type VisibilityMatrix = Record<string, Record<RoleName, boolean>>

// QuickActionTile — tile ใน Quick Actions Manager (#182)
export interface QuickActionTile {
  id: string
  label: string               // ชื่อที่แสดงให้ user เห็น
  icon: string                // icon name (lucide-react compatible)
  href: string                // route href
  enabled: boolean            // เปิด/ปิดใน ESS home
  order: number               // ลำดับการแสดง (drag-drop)
}

// HomePageTile — widget ใน Home Page Manager (#183)
export interface HomePageTile {
  id: string
  label: string
  icon: string
  size: 'S' | 'M' | 'L'     // ขนาด widget
  enabled: boolean
  order: number               // ลำดับ (drag-drop)
  visibleTo: RoleName[]       // role ที่มองเห็น tile นี้
}

// AuditEntry — บันทึกการแก้ไข config ย้อนหลัง (AC-8)
export interface AuditEntry {
  id: string
  timestamp: string           // ISO 8601
  adminUser: string           // ชื่อ admin ที่ทำการแก้ไข
  editor: EditorName          // editor ที่ถูก publish
  action: string              // เช่น "Published field-config", "Reset visibility"
  targetEntity: string        // field id / tile id ที่ถูกแก้ไข
  before: string | null       // ค่าก่อนแก้ไข (JSON string)
  after: string | null        // ค่าหลังแก้ไข (JSON string)
}
