// usersPermissions.ts — TypeScript definitions สำหรับ Users & Permissions module
// ครอบคลุม BRD #185-189: Roles, Data Permissions, User Assignment, Proxy, Audit

// -----------------------------------------------------------------------
// Capability Codes — รหัสสิทธิ์ที่แต่ละ role สามารถมีได้
// -----------------------------------------------------------------------

export type CapabilityCode =
  // Employee self-service
  | 'ESS_VIEW_OWN'         // ดูข้อมูลตัวเอง
  | 'ESS_EDIT_OWN'         // แก้ไขข้อมูลตัวเอง
  // Manager
  | 'MGR_VIEW_TEAM'        // ดูข้อมูลทีม
  | 'MGR_APPROVE_LEAVE'    // อนุมัติวันลา
  | 'MGR_VIEW_REPORTS'     // ดู reports ทีม
  // HRBP
  | 'HRBP_VIEW_ORG'        // ดูข้อมูล org ที่ดูแล
  | 'HRBP_EDIT_PROFILE'    // แก้ไข employee profile
  | 'HRBP_MANAGE_HIRE'     // จัดการ hire/onboard
  | 'HRBP_MANAGE_LIFECYCLE' // จัดการ lifecycle transactions
  // SPD (Strategic People Development)
  | 'SPD_VIEW_ALL'         // ดูข้อมูลทั้งหมด (read-only)
  | 'SPD_MANAGE_SUCCESSION' // จัดการ succession planning
  | 'SPD_VIEW_ANALYTICS'   // ดู people analytics
  // HRIS Admin
  | 'ADMIN_MANAGE_ROLES'   // จัดการ roles และ permissions
  | 'ADMIN_MANAGE_USERS'   // จัดการ user assignments
  | 'ADMIN_MANAGE_FOUNDATION' // จัดการ foundation data (Company/Division/Dept)
  | 'ADMIN_EXPORT_AUDIT'   // export audit logs
  | 'ADMIN_VIEW_ALL'       // ดูข้อมูลทั้งหมด (full access)
  // System Admin
  | 'SYS_FULL_ACCESS'      // สิทธิ์สูงสุด — System Admin เท่านั้น
  | 'SYS_MANAGE_INTEGRATION' // จัดการ integrations และ API

// -----------------------------------------------------------------------
// Role Group — BRD #185 Application Role Groups
// -----------------------------------------------------------------------

export interface RoleGroup {
  id: string                         // UUID
  name: string                       // ชื่อ role เช่น "HRBP"
  description: string                // คำอธิบาย role
  capabilities: CapabilityCode[]     // รายการสิทธิ์ที่ role นี้มี
  isSystemRole: boolean              // true = ห้าม delete (built-in role)
  createdAt: string                  // ISO 8601
  updatedAt: string                  // ISO 8601
}

// -----------------------------------------------------------------------
// Data Permission — BRD #184 Data Permission Scopes
// -----------------------------------------------------------------------

export type DataPermissionScope =
  | 'OWN_DATA'       // เห็นข้อมูลตัวเองเท่านั้น
  | 'TEAM_DATA'      // เห็นข้อมูลทีมที่ตัวเองดูแล
  | 'COMPANY_WIDE'   // เห็นข้อมูลทั้งบริษัท
  | 'GLOBAL'         // เห็นข้อมูลทุก entity (cross-company)

export interface DataPermission {
  id: string
  scope: DataPermissionScope
  label: string                      // ชื่อที่แสดงใน UI
  description: string
  applicableRoles: string[]          // role IDs ที่ใช้ scope นี้ได้
}

// -----------------------------------------------------------------------
// User Assignment — BRD #186 User-to-Role Assignment
// -----------------------------------------------------------------------

export interface UserAssignment {
  userId: string                     // employee ID
  fullNameTh: string                 // ชื่อ-นามสกุลภาษาไทย
  fullNameEn: string                 // ชื่อ-นามสกุลภาษาอังกฤษ
  email: string
  department: string
  position: string
  roleIds: string[]                  // role IDs ที่ assign ให้ user นี้ (multi-role allowed)
  dataPermissionId: string           // data permission scope ที่ assign
  isActive: boolean
  assignedAt: string                 // ISO 8601 — วันที่ assign ล่าสุด
  assignedBy: string                 // userId ของคนที่ assign
}

// -----------------------------------------------------------------------
// Proxy — BRD #187 Proxy Delegation
// -----------------------------------------------------------------------

export type ProxyStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'REVOKED'

export interface Proxy {
  id: string
  delegatorId: string               // userId ของคนมอบหมาย
  delegatorName: string
  delegateeId: string               // userId ของคนรับมอบหมาย
  delegateeName: string
  scope: string[]                   // รายการสิทธิ์ที่มอบหมาย (CapabilityCode[])
  startDate: string                 // ISO 8601 date (YYYY-MM-DD)
  endDate: string                   // ISO 8601 date (YYYY-MM-DD)
  reason: string
  status: ProxyStatus
  createdAt: string
  createdBy: string
}

// -----------------------------------------------------------------------
// Foundation Audit Entry — BRD #188 Foundation Object Edit History
// -----------------------------------------------------------------------

export type FoundationEntityType = 'COMPANY' | 'DIVISION' | 'DEPARTMENT' | 'COST_CENTER'

export interface FoundationAuditEntry {
  id: string
  entityType: FoundationEntityType
  entityId: string                   // externalCode ของ entity
  entityName: string                 // ชื่อ entity
  fieldChanged: string               // ชื่อ field ที่เปลี่ยน
  oldValue: string | null
  newValue: string | null
  changedBy: string                  // userId
  changedByName: string
  changedAt: string                  // ISO 8601 timestamp
  changeReason: string
}

// -----------------------------------------------------------------------
// Audit Entry — BRD #189 User Action Audit Report
// -----------------------------------------------------------------------

export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'VIEW'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'APPROVE'
  | 'REJECT'
  | 'EXPORT'
  | 'ASSIGN_ROLE'
  | 'REVOKE_ROLE'
  | 'CREATE_PROXY'
  | 'REVOKE_PROXY'

export type AuditEntityType =
  | 'EMPLOYEE_PROFILE'
  | 'HIRE_TRANSACTION'
  | 'LIFECYCLE_TRANSACTION'
  | 'ROLE'
  | 'USER_ASSIGNMENT'
  | 'PROXY'
  | 'FOUNDATION_OBJECT'
  | 'AUDIT_REPORT'

export interface AuditEntry {
  id: string
  userId: string
  userName: string
  action: AuditAction
  entityType: AuditEntityType
  entityId: string
  entityName: string
  description: string                // คำอธิบาย action ภาษาไทย
  ipAddress: string
  userAgent: string
  timestamp: string                  // ISO 8601 timestamp
  isSuccess: boolean
  errorMessage?: string
}

// -----------------------------------------------------------------------
// Filter state สำหรับ Audit Report
// -----------------------------------------------------------------------

export interface AuditFilter {
  user?: string          // userId หรือ userName (partial match)
  action?: AuditAction
  entity?: AuditEntityType
  dateFrom?: string      // YYYY-MM-DD
  dateTo?: string        // YYYY-MM-DD
}
