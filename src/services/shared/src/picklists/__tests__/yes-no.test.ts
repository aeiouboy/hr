// yes-no.test.ts — Unit tests for PICKLIST_YES_NO
//
// AC-3: @hrms/shared exports YES_NO picklist following Phase 0 F2 PicklistItem shape.
// Reference picklist: marital.ts (same package — C1 match existing style)
//
// Traceability: specs/hr-phase-1-d1-foundation.md §AC-3 + §D1.3

import { PICKLIST_YES_NO } from '../yes-no'
import type { PicklistItem } from '../index'

// ─── AC-3: Shape conformance ──────────────────────────────────────────────────

describe('PICKLIST_YES_NO — shape and structure', () => {
  // AC-3: Picklist is a non-empty readonly array
  it('AC-3: exports as a non-empty readonly array', () => {
    expect(Array.isArray(PICKLIST_YES_NO)).toBe(true)
    expect(PICKLIST_YES_NO.length).toBeGreaterThan(0)
  })

  // AC-3: Exactly 2 items (YES and NO — no other values in binary picklist)
  it('AC-3: has exactly 2 items', () => {
    expect(PICKLIST_YES_NO).toHaveLength(2)
  })

  // AC-3: Every item conforms to PicklistItem shape
  it('AC-3: every item has id, labelTh, labelEn, sortOrder, active fields', () => {
    for (const item of PICKLIST_YES_NO) {
      // Cast to validate against PicklistItem interface at type-level
      const typed: PicklistItem = item
      expect(typeof typed.id).toBe('string')
      expect(typeof typed.labelTh).toBe('string')
      expect(typeof typed.labelEn).toBe('string')
      expect(typeof typed.sortOrder).toBe('number')
      expect(typeof typed.active).toBe('boolean')
    }
  })
})

// ─── AC-3: Content validation ────────────────────────────────────────────────

describe('PICKLIST_YES_NO — content', () => {
  // AC-3: First item is YES with Thai label "ใช่" and English "Yes"
  it('AC-3: first item is YES — id="YES", labelTh="ใช่", labelEn="Yes"', () => {
    const yes = PICKLIST_YES_NO[0]
    expect(yes.id).toBe('YES')
    expect(yes.labelTh).toBe('ใช่')
    expect(yes.labelEn).toBe('Yes')
  })

  // AC-3: Second item is NO with Thai label "ไม่ใช่" and English "No"
  it('AC-3: second item is NO — id="NO", labelTh="ไม่ใช่", labelEn="No"', () => {
    const no = PICKLIST_YES_NO[1]
    expect(no.id).toBe('NO')
    expect(no.labelTh).toBe('ไม่ใช่')
    expect(no.labelEn).toBe('No')
  })

  // AC-3: Both items are active
  it('AC-3: all items have active=true', () => {
    for (const item of PICKLIST_YES_NO) {
      expect(item.active).toBe(true)
    }
  })

  // AC-3: sortOrder is sequential starting from 1
  it('AC-3: sortOrder starts at 1 and increments', () => {
    expect(PICKLIST_YES_NO[0].sortOrder).toBe(1)
    expect(PICKLIST_YES_NO[1].sortOrder).toBe(2)
  })

  // AC-3: ids are unique (no duplicates)
  it('AC-3: all item ids are unique', () => {
    const ids = PICKLIST_YES_NO.map((item) => item.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})

// ─── AC-3: Lookup helpers (common usage patterns) ───────────────────────────

describe('PICKLIST_YES_NO — lookup usage patterns', () => {
  // AC-3: find by id works for YES
  it('AC-3: can find YES item by id', () => {
    const found = PICKLIST_YES_NO.find((item) => item.id === 'YES')
    expect(found).toBeDefined()
    expect(found?.labelTh).toBe('ใช่')
  })

  // AC-3: find by id works for NO
  it('AC-3: can find NO item by id', () => {
    const found = PICKLIST_YES_NO.find((item) => item.id === 'NO')
    expect(found).toBeDefined()
    expect(found?.labelTh).toBe('ไม่ใช่')
  })

  // AC-3: filter active returns all items (both active)
  it('AC-3: filter by active=true returns all 2 items', () => {
    const active = PICKLIST_YES_NO.filter((item) => item.active)
    expect(active).toHaveLength(2)
  })

  // AC-3: labelTh and labelEn are both non-empty strings
  it('AC-3: all labelTh and labelEn are non-empty strings', () => {
    for (const item of PICKLIST_YES_NO) {
      expect(item.labelTh.length).toBeGreaterThan(0)
      expect(item.labelEn.length).toBeGreaterThan(0)
    }
  })
})
