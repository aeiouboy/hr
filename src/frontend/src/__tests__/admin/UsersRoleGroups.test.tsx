// UsersRoleGroups.test.tsx — Part D role-groups page tests
// ครอบคลุม BRD #185: list, create/edit modal, capability checklist, delete protection
// 6 tests — Vitest + RTL

import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useUsersPermissions } from '@/lib/admin/store/useUsersPermissions'

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    localStorage.clear()
    useUsersPermissions.setState(useUsersPermissions.getInitialState())
  })
})

// -----------------------------------------------------------------------
// List 5+ roles from mock
// -----------------------------------------------------------------------

describe('Role Groups List', () => {
  it('TC-RG-1: seed มี 6 roles ใน store — ครบตาม BRD #185 §2.4', () => {
    const { result } = renderHook(() => useUsersPermissions())

    expect(result.current.roles).toHaveLength(6)

    // verbatim role names (Rule C8)
    const names = result.current.roles.map((r) => r.name)
    expect(names).toContain('Employee')
    expect(names).toContain('Manager')
    expect(names).toContain('HRBP')
    expect(names).toContain('SPD')
    expect(names).toContain('HRIS Admin')
    expect(names).toContain('System Admin')
  })

  it('TC-RG-2: roles ทุก entry ต้องมี id, name, capabilities array', () => {
    const { result } = renderHook(() => useUsersPermissions())

    result.current.roles.forEach((role) => {
      expect(role.id).toBeTruthy()
      expect(typeof role.name).toBe('string')
      expect(Array.isArray(role.capabilities)).toBe(true)
    })
  })
})

// -----------------------------------------------------------------------
// Create role
// -----------------------------------------------------------------------

describe('Create Role', () => {
  it('TC-RG-3: createRole เพิ่ม role ใหม่ได้ — list เพิ่มขึ้น 1 + capabilities ถูกต้อง', () => {
    const { result } = renderHook(() => useUsersPermissions())
    const before = result.current.roles.length

    act(() => {
      result.current.createRole({
        name: 'Payroll Officer',
        description: 'จัดการ payroll',
        capabilities: ['EC.Compensation_VIEW', 'EC.Compensation_EDIT'],
      })
    })

    expect(result.current.roles).toHaveLength(before + 1)

    const newRole = result.current.roles.find((r) => r.name === 'Payroll Officer')
    expect(newRole).toBeDefined()
    expect(newRole?.capabilities).toContain('EC.Compensation_VIEW')
    expect(newRole?.capabilities).toContain('EC.Compensation_EDIT')
    // role ที่สร้างเองต้องไม่เป็น system role
    expect(newRole?.isSystemRole).toBe(false)
    expect(newRole?.id).toBeTruthy()
  })
})

// -----------------------------------------------------------------------
// Capability checklist per role
// -----------------------------------------------------------------------

describe('Capability Checklist', () => {
  it('TC-RG-4: updateRole เปลี่ยน capabilities ของ non-system role ได้', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // สร้าง role ที่แก้ไขได้ก่อน
    act(() => {
      result.current.createRole({
        name: 'Test Role',
        description: 'test',
        capabilities: ['EC.EmpJob_VIEW'],
      })
    })

    const created = result.current.roles.find((r) => r.name === 'Test Role')
    expect(created).toBeDefined()

    // อัปเดต capabilities
    act(() => {
      result.current.updateRole(created!.id, {
        capabilities: ['EC.EmpJob_VIEW', 'EC.EmpJob_EDIT', 'EC.Compensation_VIEW'] as any,
        updatedAt: new Date().toISOString(),
      })
    })

    const updated = result.current.roles.find((r) => r.id === created!.id)
    expect(updated?.capabilities).toHaveLength(3)
    expect(updated?.capabilities).toContain('EC.EmpJob_VIEW')
    expect(updated?.capabilities).toContain('EC.EmpJob_EDIT')
    expect(updated?.capabilities).toContain('EC.Compensation_VIEW')
  })
})

// -----------------------------------------------------------------------
// Delete role blocked if system role
// -----------------------------------------------------------------------

describe('Delete Role Protection', () => {
  it('TC-RG-5: ลบ system role (role-employee) ไม่ได้ — list ต้องไม่เปลี่ยน', () => {
    const { result } = renderHook(() => useUsersPermissions())
    const before = result.current.roles.length

    act(() => {
      result.current.deleteRole('role-employee')
    })

    // list ต้องไม่เปลี่ยน
    expect(result.current.roles).toHaveLength(before)
    // role-employee ยังอยู่
    expect(result.current.roles.find((r) => r.id === 'role-employee')).toBeDefined()
  })

  it('TC-RG-6: ลบ non-system role ได้สำเร็จ', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // สร้าง role ที่ลบได้
    act(() => {
      result.current.createRole({
        name: 'Temp Deletable',
        description: 'ลบได้',
        capabilities: [],
      })
    })

    const toDelete = result.current.roles.find((r) => r.name === 'Temp Deletable')
    expect(toDelete).toBeDefined()

    const before = result.current.roles.length

    act(() => {
      result.current.deleteRole(toDelete!.id)
    })

    expect(result.current.roles).toHaveLength(before - 1)
    expect(result.current.roles.find((r) => r.name === 'Temp Deletable')).toBeUndefined()
  })
})
