// UsersAudit.test.tsx — Part D foundation-audit + audit-report tests
// ครอบคลุม BRD #188 (Foundation Audit) + BRD #189 (Audit Report)
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
// Foundation Audit Timeline — BRD #188
// -----------------------------------------------------------------------

describe('Foundation Audit Timeline', () => {
  it('TC-FA-1: foundationAudit seed มี 15 entries ครบ', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // seed mockUsersPermissions.json มี foundationAudit 15 entries
    expect(result.current.foundationAudit).toHaveLength(15)
  })

  it('TC-FA-2: ทุก foundationAudit entry ต้องมี field ครบ (entityType, fieldChanged, oldValue/newValue, changedBy)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    result.current.foundationAudit.forEach((entry) => {
      expect(entry.id).toBeTruthy()
      expect(entry.entityType).toBeTruthy()
      expect(entry.fieldChanged).toBeTruthy()
      // oldValue / newValue อาจเป็น null ได้แต่ key ต้องมี
      expect('oldValue' in entry).toBe(true)
      expect('newValue' in entry).toBe(true)
      expect(entry.changedBy).toBeTruthy()
      expect(entry.changedAt).toBeTruthy()
    })
  })

  it('TC-FA-3: DiffViewer data — entry ที่ 1 ต้องมี oldValue/newValue ที่ expand ได้ (not null)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    // fa-001: companyName changed from 'Central Group' → 'Central Group Co., Ltd.'
    const fa001 = result.current.foundationAudit.find((e) => e.id === 'fa-001')
    expect(fa001).toBeDefined()
    expect(fa001?.oldValue).not.toBeNull()
    expect(fa001?.newValue).not.toBeNull()
    expect(fa001?.fieldChanged).toBe('companyName')
  })

  it('TC-FA-4: foundationAudit ครอบคลุม entity types ที่ BRD #188 กำหนด', () => {
    const { result } = renderHook(() => useUsersPermissions())

    const entityTypes = new Set(result.current.foundationAudit.map((e) => e.entityType))
    // ต้องมีอย่างน้อย COMPANY (จาก seed)
    expect(entityTypes.has('COMPANY')).toBe(true)
    // ทุก entity type ต้องอยู่ใน enum ที่กำหนด (BRD #188)
    const validTypes = new Set(['COMPANY', 'DIVISION', 'DEPARTMENT', 'COST_CENTER'])
    entityTypes.forEach((et) => {
      expect(validTypes.has(et)).toBe(true)
    })
  })
})

// -----------------------------------------------------------------------
// Audit Report Filter — BRD #189
// -----------------------------------------------------------------------

describe('Audit Report Filter', () => {
  it('TC-AR-1: auditReport seed มี 20 entries', () => {
    const { result } = renderHook(() => useUsersPermissions())
    expect(result.current.auditReport).toHaveLength(20)
  })

  it('TC-AR-2: filterAuditReport by action "EXPORT" → entries ทุกตัวต้อง action === EXPORT', () => {
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

  it('TC-AR-3: filterAuditReport by dateFrom + dateTo ต้องคืน entries ในช่วง date เท่านั้น', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let filtered: ReturnType<typeof result.current.filterAuditReport> = []
    act(() => {
      filtered = result.current.filterAuditReport({
        dateFrom: '2026-04-01',
        dateTo: '2026-04-15',
      })
    })

    // ทุก entry ต้องอยู่ในช่วง date ที่กำหนด
    filtered.forEach((entry) => {
      const ts = new Date(entry.timestamp).getTime()
      const from = new Date('2026-04-01T00:00:00.000Z').getTime()
      const to = new Date('2026-04-15T23:59:59.999Z').getTime()
      expect(ts).toBeGreaterThanOrEqual(from)
      expect(ts).toBeLessThanOrEqual(to)
    })
  })

  it('TC-AR-4: filterAuditReport query ที่ไม่ match → return empty array', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let filtered: ReturnType<typeof result.current.filterAuditReport> = []
    act(() => {
      filtered = result.current.filterAuditReport({ user: 'NOTEXIST_USER_ZZZZZ' })
    })

    expect(filtered).toHaveLength(0)
  })
})

// -----------------------------------------------------------------------
// CSV Export — BRD #189: UTF-8 BOM + Thai headers
// -----------------------------------------------------------------------

describe('Audit Report CSV Export', () => {
  it('TC-AR-5: exportAuditCSV ต้องขึ้นต้นด้วย UTF-8 BOM (U+FEFF = charCode 65279)', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let csv = ''
    act(() => {
      csv = result.current.exportAuditCSV()
    })

    // UTF-8 BOM
    expect(csv.charCodeAt(0)).toBe(0xfeff)
  })

  it('TC-AR-6: exportAuditCSV header row ต้องมี Thai headers ครบ — เวลา, รหัสผู้ใช้, ชื่อผู้ใช้, การกระทำ', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let csv = ''
    act(() => {
      csv = result.current.exportAuditCSV()
    })

    // ตัด BOM แล้วเอาบรรทัดแรก
    const withoutBom = csv.slice(1)
    const firstLine = withoutBom.split('\n')[0]

    expect(firstLine).toContain('เวลา')
    expect(firstLine).toContain('รหัสผู้ใช้')
    expect(firstLine).toContain('ชื่อผู้ใช้')
    expect(firstLine).toContain('การกระทำ')
  })

  it('TC-AR-7: exportAuditCSV จำนวน data rows ต้องตรงกับ auditReport.length', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let csv = ''
    act(() => {
      csv = result.current.exportAuditCSV()
    })

    const withoutBom = csv.slice(1)
    const lines = withoutBom.split('\n').filter((l) => l.trim() !== '')
    // 1 header row + N data rows
    expect(lines).toHaveLength(result.current.auditReport.length + 1)
  })

  it('TC-AR-8: exportAuditCSV output เป็น string และมีความยาว > 0', () => {
    const { result } = renderHook(() => useUsersPermissions())

    let csv = ''
    act(() => {
      csv = result.current.exportAuditCSV()
    })

    expect(typeof csv).toBe('string')
    expect(csv.length).toBeGreaterThan(0)
  })
})
