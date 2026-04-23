// useDataManagement.test.ts — Unit tests สำหรับ Data Management store (Phase 5 Part E)
// ครอบคลุม BRD #162-164, #190-207: Reporting, Integration, System Features, Security & Governance

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDataManagement } from '@/lib/admin/store/useDataManagement'

// -----------------------------------------------------------------------
// Mock cross-store dependency (useUsersPermissions)
// -----------------------------------------------------------------------

const mockAppendAudit = vi.fn()

vi.mock('@/lib/admin/store/useUsersPermissions', () => {
  const mockStore = {
    getState: () => ({
      appendAudit: mockAppendAudit,
    }),
    setState: vi.fn(),
    subscribe: vi.fn(),
    destroy: vi.fn(),
    getInitialState: vi.fn(() => ({})),
  }
  // Callable as hook (renderHook fallback) + static .getState() for cross-store
  const useUsersPermissions = Object.assign(vi.fn(() => ({})), mockStore)
  return { useUsersPermissions }
})

// -----------------------------------------------------------------------
// Setup: reset store ก่อนทุก test
// -----------------------------------------------------------------------

beforeEach(() => {
  act(() => {
    localStorage.clear()
    useDataManagement.setState(useDataManagement.getInitialState())
  })
  mockAppendAudit.mockClear()
})

// -----------------------------------------------------------------------
// Test 1: Initial state — โหลด seed data ถูกต้อง
// -----------------------------------------------------------------------

describe('initial state', () => {
  it('ต้องโหลด reports จาก seed ครบ 10 รายการ', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.reports).toHaveLength(10)
  })

  it('ต้องโหลด trafficLog จาก seed ครบ 50 รายการ', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.trafficLog).toHaveLength(50)
  })

  it('ต้องโหลด consentForms จาก seed ครบ 10 รายการ', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.consentForms).toHaveLength(10)
  })

  it('ต้องโหลด scheduledJobs จาก seed ครบ 3 รายการ', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.scheduledJobs).toHaveLength(3)
  })

  it('ต้องโหลด dataMigrationJobs จาก seed ครบ 2 รายการ', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.dataMigrationJobs).toHaveLength(2)
  })

  it('ต้องตั้งค่า language เริ่มต้นเป็น "th"', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.language).toBe('th')
  })

  it('ต้องตั้งค่า sessionTimeoutMinutes เริ่มต้นเป็น 30', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.sessionTimeoutMinutes).toBe(30)
  })

  it('ต้องตั้งค่า encryptionPolicy algorithm เป็น AES-256-GCM', () => {
    const { result } = renderHook(() => useDataManagement())
    expect(result.current.encryptionPolicy.algorithm).toBe('AES-256-GCM')
    expect(result.current.encryptionPolicy.readOnly).toBe(true)
  })
})

// -----------------------------------------------------------------------
// Test 2: setLanguage — switches + persists
// -----------------------------------------------------------------------

describe('setLanguage', () => {
  it('ต้อง switch language เป็น "en" ได้', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setLanguage('en')
    })
    expect(result.current.language).toBe('en')
  })

  it('ต้อง switch language เป็น "vn" ได้', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setLanguage('vn')
    })
    expect(result.current.language).toBe('vn')
  })

  it('ต้อง call appendAudit (cross-store) เมื่อ setLanguage', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setLanguage('en')
    })
    expect(mockAppendAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'SET_LANGUAGE',
        entityName: 'Language:en',
      })
    )
  })
})

// -----------------------------------------------------------------------
// Test 3: toggleFavourite — add / remove
// -----------------------------------------------------------------------

describe('toggleFavourite', () => {
  it('ต้องเพิ่ม reportId เข้า favouriteReports เมื่อ toggle report ที่ไม่ favourite', () => {
    const { result } = renderHook(() => useDataManagement())
    // seed มี 3 favourites: rpt-001, rpt-002, rpt-009
    // rpt-003 ยังไม่ favourite
    act(() => {
      result.current.toggleFavourite('rpt-003')
    })
    expect(result.current.favouriteReports).toContain('rpt-003')
  })

  it('ต้องลบ reportId ออกจาก favouriteReports เมื่อ toggle report ที่ favourite อยู่แล้ว', () => {
    const { result } = renderHook(() => useDataManagement())
    // rpt-001 มีอยู่ใน seed favourites
    act(() => {
      result.current.toggleFavourite('rpt-001')
    })
    expect(result.current.favouriteReports).not.toContain('rpt-001')
  })

  it('ต้อง toggle 2 ครั้งกลับเป็นสถานะเดิม', () => {
    const { result } = renderHook(() => useDataManagement())
    const initial = [...result.current.favouriteReports]
    act(() => {
      result.current.toggleFavourite('rpt-005')
      result.current.toggleFavourite('rpt-005')
    })
    expect(result.current.favouriteReports).toEqual(initial)
  })
})

// -----------------------------------------------------------------------
// Test 4: exportTrafficCSV — UTF-8 BOM + Thai headers
// -----------------------------------------------------------------------

describe('exportTrafficCSV', () => {
  it('ต้อง return string ที่ขึ้นต้นด้วย UTF-8 BOM (﻿)', () => {
    const { result } = renderHook(() => useDataManagement())
    const csv = result.current.exportTrafficCSV()
    // UTF-8 BOM =
    expect(csv.charCodeAt(0)).toBe(0xFEFF)
  })

  it('ต้องมี Thai header "รหัสพนักงาน" ในแถวแรก', () => {
    const { result } = renderHook(() => useDataManagement())
    const csv = result.current.exportTrafficCSV()
    expect(csv).toContain('รหัสพนักงาน')
  })

  it('ต้องมี Thai header "เวลาเข้าสู่ระบบ" ในแถวแรก', () => {
    const { result } = renderHook(() => useDataManagement())
    const csv = result.current.exportTrafficCSV()
    expect(csv).toContain('เวลาเข้าสู่ระบบ')
  })

  it('ต้องมีข้อมูล 50 rows (seed มี 50 traffic entries)', () => {
    const { result } = renderHook(() => useDataManagement())
    const csv = result.current.exportTrafficCSV()
    // นับจำนวน newline (header + 50 data rows = 51 lines, 50 newlines)
    const lines = csv.split('\n')
    expect(lines.length).toBe(51) // 1 header + 50 data
  })
})

// -----------------------------------------------------------------------
// Test 5: appendAudit — cross-store call ไปยัง useUsersPermissions
// -----------------------------------------------------------------------

describe('appendAudit (cross-store)', () => {
  it('ต้อง call useUsersPermissions.appendAudit เมื่อ createReport', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.createReport({
        name: 'Test Report',
        type: 'customize',
        isBuiltIn: false,
        owner: 'EMP099',
        module: 'HR',
        fields: ['ชื่อ', 'แผนก'],
        filters: {},
        lastRun: null,
      })
    })
    expect(mockAppendAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'CREATE_REPORT',
        userId: 'EMP099',
        entityType: 'Report',
      })
    )
  })

  it('ต้อง call useUsersPermissions.appendAudit เมื่อ setHiddenProfile', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setHiddenProfile('EMP050', true)
    })
    expect(mockAppendAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'HIDE_PROFILE',
        entityName: 'Employee:EMP050',
        entityId: 'EMP050',
      })
    )
  })
})

// -----------------------------------------------------------------------
// Test 6: setHiddenProfile — add/remove hidden profiles
// -----------------------------------------------------------------------

describe('setHiddenProfile', () => {
  it('ต้องเพิ่ม empId เข้า hiddenProfiles เมื่อ hidden=true', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setHiddenProfile('EMP099', true)
    })
    expect(result.current.hiddenProfiles).toContain('EMP099')
  })

  it('ต้องลบ empId ออกจาก hiddenProfiles เมื่อ hidden=false', () => {
    const { result } = renderHook(() => useDataManagement())
    // seed มี EMP020, EMP021, EMP022
    act(() => {
      result.current.setHiddenProfile('EMP020', false)
    })
    expect(result.current.hiddenProfiles).not.toContain('EMP020')
  })

  it('ห้าม duplicate เมื่อ setHiddenProfile ซ้ำ empId เดิม', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setHiddenProfile('EMP020', true) // already hidden in seed
    })
    const count = result.current.hiddenProfiles.filter((id) => id === 'EMP020').length
    expect(count).toBe(1)
  })
})

// -----------------------------------------------------------------------
// Test 7: scheduleReport — สร้าง scheduled job
// -----------------------------------------------------------------------

describe('scheduleReport', () => {
  it('ต้องสร้าง ScheduledJob ใหม่เมื่อ scheduleReport กับ reportId ที่มีอยู่', () => {
    const { result } = renderHook(() => useDataManagement())
    const beforeCount = result.current.scheduledJobs.length
    act(() => {
      result.current.scheduleReport('rpt-001', '0 8 * * *', 'email')
    })
    expect(result.current.scheduledJobs).toHaveLength(beforeCount + 1)
  })

  it('ต้อง skip และ log warning เมื่อ scheduleReport กับ reportId ที่ไม่มีอยู่', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useDataManagement())
    const beforeCount = result.current.scheduledJobs.length
    act(() => {
      result.current.scheduleReport('rpt-NONEXISTENT', '0 8 * * *')
    })
    expect(result.current.scheduledJobs).toHaveLength(beforeCount)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('rpt-NONEXISTENT'))
    warnSpy.mockRestore()
  })
})

// -----------------------------------------------------------------------
// Test 8: setSessionTimeout — validate range
// -----------------------------------------------------------------------

describe('setSessionTimeout', () => {
  it('ต้องเปลี่ยน sessionTimeoutMinutes ได้เมื่อค่าอยู่ในช่วง 5-480', () => {
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setSessionTimeout(60)
    })
    expect(result.current.sessionTimeoutMinutes).toBe(60)
  })

  it('ต้อง reject ค่าน้อยกว่า 5 และ log warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setSessionTimeout(3)
    })
    expect(result.current.sessionTimeoutMinutes).toBe(30) // unchanged
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })

  it('ต้อง reject ค่ามากกว่า 480 และ log warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { result } = renderHook(() => useDataManagement())
    act(() => {
      result.current.setSessionTimeout(999)
    })
    expect(result.current.sessionTimeoutMinutes).toBe(30) // unchanged
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })
})
