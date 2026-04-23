// useUsersPermissions.test.ts — Unit tests สำหรับ Users & Permissions store
// ครอบคลุม BRD #185-189: roles, users, proxy, audit, CSV export, persist

import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'
import type { RoleGroup } from '@/lib/admin/types/usersPermissions'

// reset store ก่อนทุก test เพื่อ isolation
// Zustand persist จะโหลดจาก localStorage — ใน test env localStorage ถูก mock โดย jsdom
beforeEach(() => {
  act(() => {
    // reset กลับไปเป็น seed data โดยการ destroy store state
    // วิธีที่เสถียรที่สุดใน vitest: clear localStorage แล้ว re-init
    localStorage.clear()
    // ล้าง state ปัจจุบันโดย set กลับเป็นค่าเริ่มต้นจาก seed
    useUsersPermissions.setState(useUsersPermissions.getInitialState())
  })
})

// -----------------------------------------------------------------------
// Test 1: Initial state — โหลด seed data ถูกต้อง
// -----------------------------------------------------------------------

describe('initial state', () => {
  it('ต้องโหลด roles จาก seed data ครบ 6 roles', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // seed มี 6 roles: Employee, Manager, HRBP, SPD, HRIS Admin, System Admin
    expect(result.current.roles).toHaveLength(6)

    const roleNames = result.current.roles.map((r) => r.name)
    expect(roleNames).toContain('Employee')
    expect(roleNames).toContain('Manager')
    expect(roleNames).toContain('HRBP')
    expect(roleNames).toContain('SPD')
    expect(roleNames).toContain('HRIS Admin')
    expect(roleNames).toContain('System Admin')
  })

  it('ต้องโหลด dataPermissions จาก seed data ครบ 4 scopes', () => {
    const { result } = renderHook(() => useUsersPermissions())

    expect(result.current.dataPermissions).toHaveLength(4)
    const scopes = result.current.dataPermissions.map((d) => d.scope)
    expect(scopes).toContain('OWN_DATA')
    expect(scopes).toContain('TEAM_DATA')
    expect(scopes).toContain('COMPANY_WIDE')
    expect(scopes).toContain('GLOBAL')
  })

  it('ต้องโหลด users จาก seed data ครบ 10 คน', () => {
    const { result } = renderHook(() => useUsersPermissions())

    expect(result.current.users).toHaveLength(10)
  })

  it('ต้องโหลด auditReport จาก seed data ครบ 20 entries', () => {
    const { result } = renderHook(() => useUsersPermissions())

    expect(result.current.auditReport).toHaveLength(20)
  })
})

// -----------------------------------------------------------------------
// Test 2: createRole — เพิ่ม role ใหม่ได้ + capabilities persist
// -----------------------------------------------------------------------

describe('createRole', () => {
  it('createRole → list เพิ่มขึ้น 1 + capabilities ถูกต้อง', () => {
    const { result } = renderHook(() => useUsersPermissions())

    act(() => {
      result.current.createRole({
        name: 'Payroll Officer',
        description: 'จัดการ payroll และการจ่ายเงินเดือน',
        capabilities: ['ESS_VIEW_OWN', 'ADMIN_VIEW_ALL'],
      })
    })

    // ต้องมี 7 roles (6 seed + 1 ใหม่)
    expect(result.current.roles).toHaveLength(7)

    const newRole = result.current.roles.find((r) => r.name === 'Payroll Officer')
    expect(newRole).toBeDefined()
    expect(newRole?.capabilities).toContain('ESS_VIEW_OWN')
    expect(newRole?.capabilities).toContain('ADMIN_VIEW_ALL')
    // role ที่สร้างเองต้องไม่ใช่ system role
    expect(newRole?.isSystemRole).toBe(false)
    // ต้องมี id, createdAt, updatedAt
    expect(newRole?.id).toBeTruthy()
    expect(newRole?.createdAt).toBeTruthy()
  })
})

// -----------------------------------------------------------------------
// Test 3: assignUserRoles — อัปเดต user.roleIds ถูกต้อง
// -----------------------------------------------------------------------

describe('assignUserRoles', () => {
  it('assignUserRoles → user.roleIds อัปเดตเป็น roleIds ใหม่', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // EMP001 เริ่มมีแค่ role-employee
    const before = result.current.users.find((u) => u.userId === 'EMP001')
    expect(before?.roleIds).toEqual(['role-employee'])

    act(() => {
      result.current.assignUserRoles('EMP001', ['role-employee', 'role-manager'])
    })

    const after = result.current.users.find((u) => u.userId === 'EMP001')
    expect(after?.roleIds).toHaveLength(2)
    expect(after?.roleIds).toContain('role-employee')
    expect(after?.roleIds).toContain('role-manager')
  })
})

// -----------------------------------------------------------------------
// Test 4: Proxy validation — startDate ≤ endDate
// -----------------------------------------------------------------------

describe('createProxy validation', () => {
  it('ถ้า startDate > endDate → ไม่สร้าง proxy (list ไม่เพิ่ม)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    const beforeCount = result.current.proxies.length

    act(() => {
      result.current.createProxy({
        delegatorId: 'EMP003',
        delegatorName: 'วิชัย ตั้งมั่น',
        delegateeId: 'EMP001',
        delegateeName: 'สมชาย ใจดี',
        scope: ['MGR_APPROVE_LEAVE'],
        startDate: '2026-12-31',  // startDate > endDate — invalid
        endDate: '2026-01-01',
        reason: 'test invalid proxy',
        createdBy: 'EMP009',
      })
    })

    // ต้องไม่เพิ่ม proxy
    expect(result.current.proxies).toHaveLength(beforeCount)
  })

  it('ถ้า startDate ≤ endDate → สร้าง proxy สำเร็จ', () => {
    const { result } = renderHook(() => useUsersPermissions())

    const beforeCount = result.current.proxies.length

    act(() => {
      result.current.createProxy({
        delegatorId: 'EMP003',
        delegatorName: 'วิชัย ตั้งมั่น',
        delegateeId: 'EMP001',
        delegateeName: 'สมชาย ใจดี',
        scope: ['MGR_APPROVE_LEAVE'],
        startDate: '2026-06-01',
        endDate: '2026-06-30',
        reason: 'test valid proxy',
        createdBy: 'EMP009',
      })
    })

    expect(result.current.proxies).toHaveLength(beforeCount + 1)
  })
})

// -----------------------------------------------------------------------
// Test 5: filterAuditReport — multi-criteria filter
// -----------------------------------------------------------------------

describe('filterAuditReport', () => {
  it('filter by user → return เฉพาะ entries ของ user นั้น', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let filtered: ReturnType<typeof result.current.filterAuditReport> = []
    act(() => {
      filtered = result.current.filterAuditReport({ user: 'EMP009' })
    })

    // ทุก entry ที่ return ต้องมี userId หรือ userName ที่ match 'EMP009'
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach((entry) => {
      const matchId = entry.userId.toLowerCase().includes('emp009')
      const matchName = entry.userName.toLowerCase().includes('emp009')
      expect(matchId || matchName).toBe(true)
    })
  })

  it('filter by action → return เฉพาะ entries ที่มี action ตรงกัน', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let filtered: ReturnType<typeof result.current.filterAuditReport> = []
    act(() => {
      filtered = result.current.filterAuditReport({ action: 'EXPORT' })
    })

    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach((entry) => {
      expect(entry.action).toBe('EXPORT')
    })
  })

  it('filter by dateFrom + dateTo → return entries ในช่วง date เท่านั้น', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let filtered: ReturnType<typeof result.current.filterAuditReport> = []
    act(() => {
      filtered = result.current.filterAuditReport({
        dateFrom: '2026-04-01',
        dateTo: '2026-04-15',
      })
    })

    // ทุก entry ต้องอยู่ในช่วง 2026-04-01 ถึง 2026-04-15
    filtered.forEach((entry) => {
      const ts = new Date(entry.timestamp).getTime()
      const from = new Date('2026-04-01T00:00:00.000Z').getTime()
      const to = new Date('2026-04-15T23:59:59.999Z').getTime()
      expect(ts).toBeGreaterThanOrEqual(from)
      expect(ts).toBeLessThanOrEqual(to)
    })
  })

  it('filter ที่ไม่ match ใดเลย → return empty array', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let filtered: ReturnType<typeof result.current.filterAuditReport> = []
    act(() => {
      filtered = result.current.filterAuditReport({ user: 'NOTEXIST99999' })
    })

    expect(filtered).toHaveLength(0)
  })
})

// -----------------------------------------------------------------------
// Test 6: exportAuditCSV — BOM prefix + Thai header + UTF-8
// -----------------------------------------------------------------------

describe('exportAuditCSV', () => {
  it('output ต้องขึ้นต้นด้วย UTF-8 BOM (﻿)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let csv = ''
    act(() => {
      csv = result.current.exportAuditCSV()
    })

    // UTF-8 BOM คือ ﻿ (U+FEFF) — char code 65279
    expect(csv.charCodeAt(0)).toBe(0xfeff)
  })

  it('output ต้องมี Thai header row เป็นบรรทัดแรกหลัง BOM', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let csv = ''
    act(() => {
      csv = result.current.exportAuditCSV()
    })

    // ตัด BOM ออกแล้วเอาบรรทัดแรก
    const withoutBom = csv.slice(1)
    const firstLine = withoutBom.split('\n')[0]

    // header ภาษาไทยที่กำหนดใน store
    expect(firstLine).toContain('เวลา')
    expect(firstLine).toContain('รหัสผู้ใช้')
    expect(firstLine).toContain('ชื่อผู้ใช้')
    expect(firstLine).toContain('การกระทำ')
  })

  it('output ต้องมีจำนวน rows เท่ากับ auditReport.length + 1 header', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let csv = ''
    act(() => {
      csv = result.current.exportAuditCSV()
    })

    const withoutBom = csv.slice(1)
    const lines = withoutBom.split('\n').filter((l) => l.trim() !== '')
    // 1 header + 20 data rows
    expect(lines).toHaveLength(result.current.auditReport.length + 1)
  })
})

// -----------------------------------------------------------------------
// Test 7: deleteRole — system role ถูก protect
// -----------------------------------------------------------------------

describe('deleteRole', () => {
  it('ลบ system role ไม่ได้ — list ต้องเท่าเดิม', () => {
    const { result } = renderHook(() => useUsersPermissions())

    const before = result.current.roles.length

    act(() => {
      // role-employee เป็น isSystemRole: true
      result.current.deleteRole('role-employee')
    })

    expect(result.current.roles).toHaveLength(before)
  })

  it('ลบ role ที่ไม่ใช่ system role ได้', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // สร้าง non-system role ก่อน
    act(() => {
      result.current.createRole({
        name: 'Temp Role',
        description: 'role ชั่วคราว',
        capabilities: ['ESS_VIEW_OWN'],
      })
    })

    const tempRole = result.current.roles.find((r) => r.name === 'Temp Role')
    expect(tempRole).toBeDefined()

    const before = result.current.roles.length

    act(() => {
      result.current.deleteRole(tempRole!.id)
    })

    expect(result.current.roles).toHaveLength(before - 1)
    expect(result.current.roles.find((r) => r.name === 'Temp Role')).toBeUndefined()
  })
})

// -----------------------------------------------------------------------
// Test 8: persist middleware — state reload จาก localStorage
// -----------------------------------------------------------------------

describe('persist middleware', () => {
  it('roles ที่สร้างใหม่ต้องถูก persist เข้า localStorage', () => {
    const { result } = renderHook(() => useUsersPermissions())

    act(() => {
      result.current.createRole({
        name: 'Persisted Role',
        description: 'ทดสอบ persist',
        capabilities: ['ESS_VIEW_OWN'],
      })
    })

    // ตรวจ localStorage ว่ามีข้อมูล roles ถูก save
    const stored = localStorage.getItem('users-permissions-store')
    expect(stored).toBeTruthy()

    const parsed = JSON.parse(stored!)
    const roles = parsed.state?.roles as RoleGroup[]
    expect(roles).toBeDefined()
    expect(roles.some((r: RoleGroup) => r.name === 'Persisted Role')).toBe(true)
  })

  it('auditReport ต้องไม่ถูก persist เข้า localStorage (append-only)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // ตรวจว่า render ได้ก่อน
    expect(result.current.auditReport.length).toBeGreaterThan(0)

    const stored = localStorage.getItem('users-permissions-store')
    // ถ้า store ยังไม่ได้ write ใดๆ อาจไม่มีใน localStorage
    if (stored) {
      const parsed = JSON.parse(stored)
      // auditReport ต้องไม่อยู่ใน persisted state
      expect(parsed.state?.auditReport).toBeUndefined()
    }
  })
})
