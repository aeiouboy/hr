// UsersAssignment.test.tsx — Part D user-assignment + proxy tests
// ครอบคลุม BRD #186 (User Assignment) + BRD #187 (Proxy Management)
// 8 tests — Vitest + RTL

import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    localStorage.clear()
    useUsersPermissions.setState(useUsersPermissions.getInitialState())
  })
})

// -----------------------------------------------------------------------
// User Typeahead search — BRD #186 AC-5
// UserTypeahead เป็น local component (ไม่ใช่ store action) — test logic inline
// -----------------------------------------------------------------------

// helper replicates UserTypeahead filter logic จาก user-assignment/page.tsx
function filterUsers(
  users: { userId: string; fullNameTh: string; fullNameEn: string; email: string }[],
  query: string
) {
  if (query.length < 2) return []
  const q = query.toLowerCase()
  return users.filter(
    (u) =>
      u.fullNameTh.toLowerCase().includes(q) ||
      u.fullNameEn.toLowerCase().includes(q) ||
      u.userId.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
  )
}

describe('User Typeahead Search', () => {
  it('TC-UA-1: users seed มี 10 คน และทุก entry มี userId, fullNameTh, email', () => {
    const { result } = renderHook(() => useUsersPermissions())

    expect(result.current.users).toHaveLength(10)
    result.current.users.forEach((u) => {
      expect(u.userId).toBeTruthy()
      expect(u.fullNameTh).toBeTruthy()
      expect(u.email).toBeTruthy()
    })
  })

  it('TC-UA-2: typeahead filter by userId "EMP001" ต้องคืน 1 result', () => {
    const { result } = renderHook(() => useUsersPermissions())

    const found = filterUsers(result.current.users, 'EMP001')
    expect(found).toHaveLength(1)
    expect(found[0].userId).toBe('EMP001')
  })

  it('TC-UA-3: typeahead filter query < 2 chars → return empty array (debounce guard)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // query 1 ตัวอักษรต้องคืน empty (ตาม UserTypeahead: debouncedQuery.length < 2)
    const found = filterUsers(result.current.users, 'E')
    expect(found).toHaveLength(0)
  })

  it('TC-UA-4: typeahead query ที่ไม่ match ใคร ต้อง return empty array', () => {
    const { result } = renderHook(() => useUsersPermissions())

    const found = filterUsers(result.current.users, 'ZXZXZXNOTEXIST9999')
    expect(found).toHaveLength(0)
  })
})

// -----------------------------------------------------------------------
// Multi-role chip add/remove — BRD #186
// -----------------------------------------------------------------------

describe('User Role Assignment', () => {
  it('TC-UA-5: assignUserRoles เพิ่ม role ให้ user ได้ — EMP001 เริ่มมี 1 role', () => {
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

  it('TC-UA-6: assignUserRoles ลบ role ออกได้ — set roleIds ใหม่ทับค่าเดิม', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // เพิ่ม role ก่อน
    act(() => {
      result.current.assignUserRoles('EMP001', ['role-employee', 'role-manager'])
    })
    expect(result.current.users.find((u) => u.userId === 'EMP001')?.roleIds).toHaveLength(2)

    // ลบ role-manager ออก
    act(() => {
      result.current.assignUserRoles('EMP001', ['role-employee'])
    })

    const after = result.current.users.find((u) => u.userId === 'EMP001')
    expect(after?.roleIds).toHaveLength(1)
    expect(after?.roleIds).not.toContain('role-manager')
  })
})

// -----------------------------------------------------------------------
// Proxy date range validation — BRD #187
// -----------------------------------------------------------------------

describe('Proxy Date Range Validation', () => {
  it('TC-PX-1: createProxy startDate > endDate → ไม่สร้าง proxy (invalid date range)', () => {
    const { result } = renderHook(() => useUsersPermissions())
    const before = result.current.proxies.length

    act(() => {
      result.current.createProxy({
        delegatorId: 'EMP003',
        delegatorName: 'วิชัย ตั้งมั่น',
        delegateeId: 'EMP001',
        delegateeName: 'สมชาย ใจดี',
        scope: ['MGR_APPROVE_LEAVE'],
        startDate: '2026-12-31',   // startDate > endDate — invalid
        endDate: '2026-01-01',
        reason: 'invalid proxy test',
        createdBy: 'EMP009',
      })
    })

    // proxy ต้องไม่ถูกสร้าง
    expect(result.current.proxies).toHaveLength(before)
  })

  it('TC-PX-2: createProxy startDate ≤ endDate → สร้าง proxy สำเร็จ', () => {
    const { result } = renderHook(() => useUsersPermissions())
    const before = result.current.proxies.length

    act(() => {
      result.current.createProxy({
        delegatorId: 'EMP003',
        delegatorName: 'วิชัย ตั้งมั่น',
        delegateeId: 'EMP001',
        delegateeName: 'สมชาย ใจดี',
        scope: ['MGR_APPROVE_LEAVE'],
        startDate: '2026-06-01',
        endDate: '2026-06-30',
        reason: 'valid proxy test',
        createdBy: 'EMP009',
      })
    })

    expect(result.current.proxies).toHaveLength(before + 1)
    const newProxy = result.current.proxies[result.current.proxies.length - 1]
    expect(newProxy.delegatorId).toBe('EMP003')
    expect(newProxy.delegateeId).toBe('EMP001')
  })
})

// -----------------------------------------------------------------------
// Active proxies filter by status — BRD #187
// -----------------------------------------------------------------------

describe('Active Proxies Filter', () => {
  it('TC-PX-3: seed มี proxy ACTIVE อยู่ 1 รายการ (proxy-002)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    const activeProxies = result.current.proxies.filter((p) => p.status === 'ACTIVE')
    expect(activeProxies.length).toBeGreaterThanOrEqual(1)
    // proxy-002 เป็น ACTIVE ตาม seed
    expect(activeProxies.some((p) => p.id === 'proxy-002')).toBe(true)
  })
})
