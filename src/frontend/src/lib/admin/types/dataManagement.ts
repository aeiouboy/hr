// dataManagement.ts — TypeScript definitions สำหรับ Data Management module (Phase 5 Part E)
// ครอบคลุม BRD #162-164, #190-207: Reporting, Integration, System Features, Security & Governance

// -----------------------------------------------------------------------
// Sub-hub names
// -----------------------------------------------------------------------

export type SubHubName = 'reports' | 'integration' | 'system' | 'security'

// -----------------------------------------------------------------------
// Reporting sub-hub types
// -----------------------------------------------------------------------

/** รายงานที่กำหนดค่าได้ — BRD #190-194 */
export interface ReportDefinition {
  id: string                          // UUID
  name: string                        // ชื่อรายงาน (Thai ok)
  type: 'story' | 'customize' | 'schedule' | 'automation' | 'favourite' | 'role-based'
  isBuiltIn: boolean                  // true = ระบบสร้างมาให้ ห้าม delete
  owner: string                       // employeeId ของคนสร้าง
  module: string                      // เช่น "HR", "Payroll", "Leave"
  fields: string[]                    // column names ที่เลือก
  filters: Record<string, string>     // filter key-value
  lastRun: string | null              // ISO 8601 หรือ null ถ้ายังไม่เคย run
  createdAt: string
  updatedAt: string
}

/** งาน schedule สำหรับ auto-run รายงาน — BRD #192 */
export interface ScheduledJob {
  id: string
  reportId: string                    // FK → ReportDefinition
  cron: string                        // cron expression เช่น "0 9 * * 1"
  delivery: 'view' | 'email' | 'cg-gateway'
  recipients: string[]                // emails สำหรับ delivery=email
  isActive: boolean
  lastRunAt: string | null
  nextRunAt: string | null
  createdAt: string
}

// -----------------------------------------------------------------------
// Integration sub-hub types
// -----------------------------------------------------------------------

/** API/IC endpoint integration — BRD #190 */
export interface IntegrationEndpoint {
  id: string
  name: string                        // ชื่อ endpoint
  module: string                      // เช่น "Payroll", "Leave", "SSO"
  direction: 'inbound' | 'outbound' | 'bidirectional'
  protocol: 'REST' | 'SOAP' | 'SFTP' | 'WebSocket'
  status: 'active' | 'inactive' | 'error' | 'pending'
  lastSyncAt: string | null
  errorMessage: string | null
  createdAt: string
}

/** Microsoft Teams + Viva connection config — BRD #190 (Q10 flagged: awaiting BA spec) */
export interface TeamsVivaConfig {
  connectionId: string
  tenantId: string                    // Azure tenant (read-only after setup)
  syncEnabled: boolean
  syncFields: string[]                // HR fields ที่ sync เข้า Viva (org chart, skills ฯลฯ)
  lastSyncAt: string | null
  status: 'connected' | 'disconnected' | 'pending' | 'error'
  baSpecPending: boolean              // Q10 flag — awaiting BA spec
}

// -----------------------------------------------------------------------
// System Features sub-hub types
// -----------------------------------------------------------------------

/** E-Document (employment cert, salary cert ฯลฯ) — BRD #197 */
export interface EDocument {
  id: string
  type: 'สัญญาจ้าง' | 'ใบสมัครงาน' | 'โอนย้าย' | 'ใบลาออก' | 'ใบรับรองเงินเดือน' | 'ใบรับรองการทำงาน' | 'อื่นๆ'
  name: string                        // ชื่อเอกสาร
  employeeId: string | null           // null = template ทั่วไป
  isTemplate: boolean
  fileUrl: string | null              // URL ไปยัง document (mock)
  generatedAt: string | null
  createdAt: string
}

// -----------------------------------------------------------------------
// Security & Governance sub-hub types
// -----------------------------------------------------------------------

/** Consent record — BRD #199 */
export interface ConsentRecord {
  id: string
  employeeId: string
  employeeName: string
  consentType: string                 // เช่น "PDPA", "Data sharing", "Marketing"
  status: 'signed' | 'pending' | 'expired'
  signedAt: string | null
  expiresAt: string | null
  version: string                     // เวอร์ชัน consent form
}

/** Login/traffic entry — BRD #200 */
export interface TrafficEntry {
  id: string
  employeeId: string
  employeeName: string
  ipAddress: string
  userAgent: string
  loginAt: string                     // ISO 8601
  logoutAt: string | null
  isSuccess: boolean
  failureReason: string | null
  location: string | null             // city/country (GeoIP mock)
}

/** Non-SSO direct user (batch/service accounts) — BRD #202 */
export interface DirectUser {
  id: string
  username: string
  displayName: string
  email: string
  roleIds: string[]                   // FK → RoleGroup (from useUsersPermissions)
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  note: string                        // เหตุผลที่ไม่ใช้ SSO
}

/** Encryption policy (read-only display) — BRD #203 (Q8 flagged) */
export interface EncryptionPolicy {
  algorithm: string                   // เช่น "AES-256-GCM"
  keyRotationIntervalDays: number
  lastKeyRotatedAt: string
  scope: 'at-rest' | 'in-transit' | 'both'
  complianceStandard: string          // เช่น "ISO27001", "PDPA"
  readOnly: true                      // always true — ห้าม mutate
}

/** Data migration batch — BRD #198 */
export interface MigrationJob {
  id: string
  name: string                        // ชื่อ batch
  sourceSystem: string                // เช่น "Legacy HRM", "SAP HR"
  status: 'queued' | 'validating' | 'dry-run' | 'success' | 'failed'
  totalRecords: number
  processedRecords: number
  errorCount: number
  dryRunPreviewUrl: string | null     // URL ไปยัง CSV preview (mock)
  startedAt: string | null
  completedAt: string | null
  createdAt: string
}
