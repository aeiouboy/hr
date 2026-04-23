// useUsersPermissions.ts — Zustand store สำหรับ Users & Permissions module
// ครอบคลุม BRD #185-189: Roles, Data Permissions, User Assignment, Proxy, Audit
// C7 SSoT: 1 store ต่อ module — ห้ามแยก store ย่อย

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  RoleGroup,
  DataPermission,
  UserAssignment,
  Proxy,
  FoundationAuditEntry,
  AuditEntry,
  AuditFilter,
} from '@/lib/admin/types/usersPermissions'
import { buildCsvText, type CsvColumn } from '@/lib/admin/utils/csvExport'
import seedData from '@/data/admin/mockUsersPermissions.json'

// -----------------------------------------------------------------------
// Types ภายใน store
// -----------------------------------------------------------------------

type EditorKey =
  | 'roles'
  | 'data-permissions'
  | 'user-assignment'
  | 'proxy'
  | 'foundation-audit'
  | 'audit-report'
  | null

// -----------------------------------------------------------------------
// Interface
// -----------------------------------------------------------------------

interface UsersPermissionsState {
  // --- Data ---
  roles: RoleGroup[]
  dataPermissions: DataPermission[]
  users: UserAssignment[]
  proxies: Proxy[]
  foundationAudit: FoundationAuditEntry[]   // append-only — ไม่ persist
  auditReport: AuditEntry[]                 // append-only — ไม่ persist

  // --- UI state ---
  currentEditor: EditorKey
  selectedRole: string | null
  selectedUser: string | null
  filter: AuditFilter

  // --- Role actions ---
  createRole: (role: Omit<RoleGroup, 'id' | 'createdAt' | 'updatedAt' | 'isSystemRole'>) => void
  updateRole: (id: string, patch: Partial<Omit<RoleGroup, 'id' | 'createdAt' | 'isSystemRole'>>) => void
  deleteRole: (id: string) => void

  // --- User actions ---
  assignUserRoles: (userId: string, roleIds: string[]) => void

  // --- Proxy actions ---
  createProxy: (proxy: Omit<Proxy, 'id' | 'status' | 'createdAt'>) => void

  // --- Audit actions ---
  filterAuditReport: (filter: AuditFilter) => AuditEntry[]
  exportAuditCSV: () => string

  // --- UI actions ---
  setCurrentEditor: (editor: EditorKey) => void
  setSelectedRole: (roleId: string | null) => void
  setSelectedUser: (userId: string | null) => void
  setFilter: (filter: Partial<AuditFilter>) => void
  resetFilter: () => void
}

// -----------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------

/** สร้าง UUID แบบ lightweight — ไม่ต้องใช้ crypto.randomUUID() ทุก env */
function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

/** คำนวณ proxy status จาก date range ปัจจุบัน */
function computeProxyStatus(startDate: string, endDate: string): Proxy['status'] {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (now < start) return 'PENDING'
  if (now > end) return 'EXPIRED'
  return 'ACTIVE'
}

// -----------------------------------------------------------------------
// CSV columns สำหรับ Audit Report
// -----------------------------------------------------------------------

const auditCsvColumns: CsvColumn<AuditEntry>[] = [
  { header: 'เวลา', accessor: 'timestamp' },
  { header: 'รหัสผู้ใช้', accessor: 'userId' },
  { header: 'ชื่อผู้ใช้', accessor: 'userName' },
  { header: 'การกระทำ', accessor: 'action' },
  { header: 'ประเภท Entity', accessor: 'entityType' },
  { header: 'รหัส Entity', accessor: 'entityId' },
  { header: 'ชื่อ Entity', accessor: 'entityName' },
  { header: 'รายละเอียด', accessor: 'description' },
  { header: 'IP Address', accessor: 'ipAddress' },
  { header: 'สำเร็จ', accessor: (row) => (row.isSuccess ? 'ใช่' : 'ไม่') },
  { header: 'ข้อผิดพลาด', accessor: (row) => row.errorMessage ?? '' },
]

// -----------------------------------------------------------------------
// Default filter state
// -----------------------------------------------------------------------

const defaultFilter: AuditFilter = {}

// -----------------------------------------------------------------------
// Store
// -----------------------------------------------------------------------

export const useUsersPermissions = create<UsersPermissionsState>()(
  persist(
    (set, get) => ({
      // --- Initial data จาก seed ---
      // ส่วน persist: roles, dataPermissions, users, proxies
      roles: seedData.roles as RoleGroup[],
      dataPermissions: seedData.dataPermissions as DataPermission[],
      users: seedData.users as UserAssignment[],
      proxies: seedData.proxies as Proxy[],
      // ส่วน non-persist: audit logs (append-only)
      foundationAudit: seedData.foundationAudit as FoundationAuditEntry[],
      auditReport: seedData.auditReport as AuditEntry[],

      // --- UI state ---
      currentEditor: null,
      selectedRole: null,
      selectedUser: null,
      filter: defaultFilter,

      // ---------------------------------------------------------------
      // Role actions (BRD #185)
      // ---------------------------------------------------------------

      createRole: (roleInput) => {
        const now = new Date().toISOString()
        const newRole: RoleGroup = {
          id: genId('role'),
          isSystemRole: false,
          createdAt: now,
          updatedAt: now,
          ...roleInput,
        }
        set((state) => ({ roles: [...state.roles, newRole] }))
      },

      updateRole: (id, patch) => {
        set((state) => ({
          roles: state.roles.map((role) =>
            role.id === id
              ? { ...role, ...patch, updatedAt: new Date().toISOString() }
              : role
          ),
        }))
      },

      deleteRole: (id) => {
        const { roles } = get()
        const target = roles.find((r) => r.id === id)
        // C6: log warning ถ้าพยายาม delete system role
        if (target?.isSystemRole) {
          console.warn(`[useUsersPermissions] deleteRole: role "${id}" เป็น system role — ห้าม delete`)
          return
        }
        set((state) => ({ roles: state.roles.filter((r) => r.id !== id) }))
      },

      // ---------------------------------------------------------------
      // User assignment actions (BRD #186)
      // ---------------------------------------------------------------

      assignUserRoles: (userId, roleIds) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.userId === userId
              ? { ...user, roleIds, assignedAt: new Date().toISOString() }
              : user
          ),
        }))
      },

      // ---------------------------------------------------------------
      // Proxy actions (BRD #187)
      // ---------------------------------------------------------------

      createProxy: (proxyInput) => {
        // Validate: startDate ต้องไม่เกิน endDate
        const start = new Date(proxyInput.startDate)
        const end = new Date(proxyInput.endDate)
        if (start > end) {
          console.warn(
            `[useUsersPermissions] createProxy: startDate (${proxyInput.startDate}) ต้องไม่เกิน endDate (${proxyInput.endDate})`
          )
          return
        }

        const newProxy: Proxy = {
          id: genId('proxy'),
          status: computeProxyStatus(proxyInput.startDate, proxyInput.endDate),
          createdAt: new Date().toISOString(),
          ...proxyInput,
        }
        set((state) => ({ proxies: [...state.proxies, newProxy] }))
      },

      // ---------------------------------------------------------------
      // Audit actions (BRD #189)
      // ---------------------------------------------------------------

      filterAuditReport: (filter) => {
        const { auditReport } = get()
        return auditReport.filter((entry) => {
          // filter by user (partial match บน userId หรือ userName)
          if (filter.user) {
            const q = filter.user.toLowerCase()
            const matchId = entry.userId.toLowerCase().includes(q)
            const matchName = entry.userName.toLowerCase().includes(q)
            if (!matchId && !matchName) return false
          }
          // filter by action
          if (filter.action && entry.action !== filter.action) return false
          // filter by entity type
          if (filter.entity && entry.entityType !== filter.entity) return false
          // filter by dateFrom
          if (filter.dateFrom) {
            const from = new Date(filter.dateFrom + 'T00:00:00.000Z')
            if (new Date(entry.timestamp) < from) return false
          }
          // filter by dateTo
          if (filter.dateTo) {
            const to = new Date(filter.dateTo + 'T23:59:59.999Z')
            if (new Date(entry.timestamp) > to) return false
          }
          return true
        })
      },

      exportAuditCSV: () => {
        // export ทุก entry ใน auditReport (ไม่ filter — ใช้ filtered list ก่อนเรียก ถ้าต้องการ)
        const { auditReport } = get()
        const csvText = buildCsvText(auditReport, auditCsvColumns)
        return csvText
      },

      // ---------------------------------------------------------------
      // UI state actions
      // ---------------------------------------------------------------

      setCurrentEditor: (editor) => set({ currentEditor: editor }),

      setSelectedRole: (roleId) => set({ selectedRole: roleId }),

      setSelectedUser: (userId) => set({ selectedUser: userId }),

      setFilter: (partial) =>
        set((state) => ({ filter: { ...state.filter, ...partial } })),

      resetFilter: () => set({ filter: defaultFilter }),
    }),

    {
      name: 'users-permissions-store',
      // persist เฉพาะ data ที่ edit ได้ — ไม่ persist audit logs (append-only)
      partialize: (state) => ({
        roles: state.roles,
        dataPermissions: state.dataPermissions,
        users: state.users,
        proxies: state.proxies,
      }),
    }
  )
)
