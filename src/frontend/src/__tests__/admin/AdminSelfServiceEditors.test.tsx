// AdminSelfServiceEditors.test.tsx — Part C editor pages consolidated tests
// ครอบคลุม 6 editors: field-config, visibility, mandatory, readonly, quick-actions, tiles
// 15 tests — Vitest + RTL

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react'
import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'

// mock localStorage เพื่อ isolate side effects
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock, writable: true })

// reset store ก่อนทุก test เพื่อ isolation
beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
  act(() => {
    useAdminSelfService.getState().resetDraft()
    useAdminSelfService.setState({ isDirty: false, currentEditor: null })
  })
})

// -----------------------------------------------------------------------
// FIELD CONFIG — BRD #178
// -----------------------------------------------------------------------

describe('Field Config Editor', () => {
  it('TC-FC-1: fieldConfig seed ต้องมีครบ 15 fields', () => {
    const { result } = renderHook(() => useAdminSelfService())
    // ตาม seed mockAdminSelfService.json
    expect(result.current.draft.fieldConfig).toHaveLength(15)
    expect(result.current.published.fieldConfig).toHaveLength(15)
  })

  it('TC-FC-2: filter by scope "Person" ต้องคืน 9 fields เท่านั้น', () => {
    const { result } = renderHook(() => useAdminSelfService())
    const personFields = result.current.draft.fieldConfig.filter((f) => f.scope === 'Person')
    // seed: first_name_th, last_name_th, first_name_en, last_name_en, national_id, date_of_birth, gender, phone_number, address_line1
    expect(personFields).toHaveLength(9)
  })

  it('TC-FC-3: setFieldConfig เปลี่ยน draft และ set isDirty=true โดยไม่กระทบ published', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // แก้ fieldType ของ first field
    act(() => {
      const updated = result.current.draft.fieldConfig.map((f, i) =>
        i === 0 ? { ...f, fieldType: 'number' as const } : f
      )
      result.current.setFieldConfig(updated)
    })

    expect(result.current.draft.fieldConfig[0].fieldType).toBe('number')
    expect(result.current.isDirty).toBe(true)
    // published ต้องไม่เปลี่ยน
    expect(result.current.published.fieldConfig[0].fieldType).not.toBe('number')
  })

  it('TC-FC-4: field ที่ isSystem=true ต้องมีอยู่ใน seed (hire_date เป็น system field)', () => {
    const { result } = renderHook(() => useAdminSelfService())
    const hireDate = result.current.draft.fieldConfig.find((f) => f.id === 'hire_date')
    expect(hireDate).toBeDefined()
    expect(hireDate?.isSystem).toBe(true)
    // date_of_birth เป็น non-system
    const dob = result.current.draft.fieldConfig.find((f) => f.id === 'date_of_birth')
    expect(dob?.isSystem).toBe(false)
  })
})

// -----------------------------------------------------------------------
// VISIBILITY MATRIX — BRD #179
// -----------------------------------------------------------------------

describe('Visibility Matrix Editor', () => {
  it('TC-VM-1: setVisibility toggle cell อัปเดต draft.visibility[field][role]', () => {
    const { result } = renderHook(() => useAdminSelfService())

    // national_id Manager เริ่มเป็น false ตาม seed
    const originalValue = result.current.draft.visibility['national_id']['Manager']
    expect(originalValue).toBe(false)

    act(() => {
      result.current.setVisibility('national_id', 'Manager', true)
    })

    expect(result.current.draft.visibility['national_id']['Manager']).toBe(true)
    expect(result.current.isDirty).toBe(true)
    // published ไม่เปลี่ยน
    expect(result.current.published.visibility['national_id']['Manager']).toBe(false)
  })

  it('TC-VM-2: setVisibility ไม่กระทบ role อื่นใน row เดียวกัน (immutable spread)', () => {
    const { result } = renderHook(() => useAdminSelfService())

    const prevEmployee = result.current.draft.visibility['national_id']['Employee']
    const prevHRBP     = result.current.draft.visibility['national_id']['HRBP']
    const prevSPD      = result.current.draft.visibility['national_id']['SPD']

    act(() => {
      result.current.setVisibility('national_id', 'Manager', true)
    })

    // roles อื่นต้องไม่เปลี่ยน
    expect(result.current.draft.visibility['national_id']['Employee']).toBe(prevEmployee)
    expect(result.current.draft.visibility['national_id']['HRBP']).toBe(prevHRBP)
    expect(result.current.draft.visibility['national_id']['SPD']).toBe(prevSPD)
  })

  it('TC-VM-3: visibility ของ base_salary ใน seed ต้องซ่อนจาก Employee และ Manager', () => {
    const { result } = renderHook(() => useAdminSelfService())
    // base_salary: Employee=false, Manager=false ตาม seed
    expect(result.current.draft.visibility['base_salary']['Employee']).toBe(false)
    expect(result.current.draft.visibility['base_salary']['Manager']).toBe(false)
    expect(result.current.draft.visibility['base_salary']['HRBP']).toBe(true)
    expect(result.current.draft.visibility['base_salary']['SPD']).toBe(true)
  })
})

// -----------------------------------------------------------------------
// MANDATORY MATRIX — BRD #180
// -----------------------------------------------------------------------

describe('Mandatory Matrix Editor', () => {
  it('TC-MM-1: setMandatory toggle cell อัปเดต draft.mandatory[field][role]', () => {
    const { result } = renderHook(() => useAdminSelfService())

    const orig = result.current.draft.mandatory['first_name_en']['Employee']
    act(() => {
      result.current.setMandatory('first_name_en', 'Employee', !orig)
    })

    expect(result.current.draft.mandatory['first_name_en']['Employee']).toBe(!orig)
    expect(result.current.isDirty).toBe(true)
    expect(result.current.published.mandatory['first_name_en']['Employee']).toBe(orig)
  })

  it('TC-MM-2: hire_date mandatory ต้องเป็น true ทุก role ใน seed', () => {
    const { result } = renderHook(() => useAdminSelfService())
    const hireDate = result.current.draft.mandatory['hire_date']
    expect(hireDate['Employee']).toBe(true)
    expect(hireDate['Manager']).toBe(true)
    expect(hireDate['HRBP']).toBe(true)
    expect(hireDate['SPD']).toBe(true)
  })
})

// -----------------------------------------------------------------------
// READONLY MATRIX — BRD #181
// -----------------------------------------------------------------------

describe('ReadOnly Matrix Editor', () => {
  it('TC-RO-1: setReadOnly toggle cell อัปเดต draft.readonly[field][role]', () => {
    const { result } = renderHook(() => useAdminSelfService())

    const orig = result.current.draft.readonly['base_salary']['Employee']
    act(() => {
      result.current.setReadOnly('base_salary', 'Employee', !orig)
    })

    expect(result.current.draft.readonly['base_salary']['Employee']).toBe(!orig)
    expect(result.current.isDirty).toBe(true)
    expect(result.current.published.readonly['base_salary']['Employee']).toBe(orig)
  })
})

// -----------------------------------------------------------------------
// QUICK ACTIONS — BRD #182
// -----------------------------------------------------------------------

describe('Quick Actions Editor', () => {
  it('TC-QA-1: quickActions seed มีครบ 8 items', () => {
    const { result } = renderHook(() => useAdminSelfService())
    expect(result.current.draft.quickActions).toHaveLength(8)
  })

  it('TC-QA-2: setQuickActions (reorder) อัปเดต draft.quickActions และ isDirty=true', () => {
    const { result } = renderHook(() => useAdminSelfService())

    const original = [...result.current.draft.quickActions]
    // สลับ index 0 กับ index 1 (simulate drag-drop reorder)
    const reordered = [...original]
    ;[reordered[0], reordered[1]] = [reordered[1], reordered[0]]

    act(() => {
      result.current.setQuickActions(reordered)
    })

    // ลำดับต้องเปลี่ยน
    expect(result.current.draft.quickActions[0].id).toBe(original[1].id)
    expect(result.current.draft.quickActions[1].id).toBe(original[0].id)
    expect(result.current.isDirty).toBe(true)
    // published ต้องไม่เปลี่ยน
    expect(result.current.published.quickActions[0].id).toBe(original[0].id)
  })

  it('TC-QA-3: toggle enabled — setQuickActions map สลับ enabled ถูกต้อง', () => {
    const { result } = renderHook(() => useAdminSelfService())

    const firstQA = result.current.draft.quickActions[0]
    const origEnabled = firstQA.enabled

    act(() => {
      const updated = result.current.draft.quickActions.map((qa) =>
        qa.id === firstQA.id ? { ...qa, enabled: !qa.enabled } : qa
      )
      result.current.setQuickActions(updated)
    })

    const after = result.current.draft.quickActions.find((qa) => qa.id === firstQA.id)
    expect(after?.enabled).toBe(!origEnabled)
    // items อื่นต้องไม่เปลี่ยน
    const others = result.current.draft.quickActions.filter((qa) => qa.id !== firstQA.id)
    const origOthers = result.current.published.quickActions.filter((qa) => qa.id !== firstQA.id)
    others.forEach((qa, i) => {
      expect(qa.enabled).toBe(origOthers[i].enabled)
    })
  })
})

// -----------------------------------------------------------------------
// TILES — BRD #183
// -----------------------------------------------------------------------

describe('Tiles Editor', () => {
  it('TC-TL-1: tiles seed มีครบ 5 items และทุก tile มี visibleTo array', () => {
    const { result } = renderHook(() => useAdminSelfService())
    expect(result.current.draft.tiles).toHaveLength(5)
    result.current.draft.tiles.forEach((t) => {
      expect(Array.isArray(t.visibleTo)).toBe(true)
    })
  })

  it('TC-TL-2: setTiles per-role toggle — toggle visibleTo role หนึ่งไม่กระทบ tile อื่น', () => {
    const { result } = renderHook(() => useAdminSelfService())

    const firstTile = result.current.draft.tiles[0]
    const secondTile = result.current.draft.tiles[1]

    // เอา Employee ออกจาก tile[0]
    act(() => {
      const updated = result.current.draft.tiles.map((t) =>
        t.id === firstTile.id
          ? { ...t, visibleTo: t.visibleTo.filter((r) => r !== 'Employee') }
          : t
      )
      result.current.setTiles(updated)
    })

    const updatedFirst = result.current.draft.tiles.find((t) => t.id === firstTile.id)
    expect(updatedFirst?.visibleTo).not.toContain('Employee')
    // tile อื่นต้องไม่เปลี่ยน
    const updatedSecond = result.current.draft.tiles.find((t) => t.id === secondTile.id)
    expect(updatedSecond?.visibleTo).toEqual(secondTile.visibleTo)
    expect(result.current.isDirty).toBe(true)
  })

  it('TC-TL-3: first tile (tile_org_chart) ต้องมี visibleTo ครบ 4 roles ตาม seed', () => {
    const { result } = renderHook(() => useAdminSelfService())
    const orgChart = result.current.draft.tiles.find((t) => t.id === 'tile_org_chart')
    expect(orgChart?.visibleTo).toContain('Employee')
    expect(orgChart?.visibleTo).toContain('Manager')
    expect(orgChart?.visibleTo).toContain('HRBP')
    expect(orgChart?.visibleTo).toContain('SPD')
  })
})
