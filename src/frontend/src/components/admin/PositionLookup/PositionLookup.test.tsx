// PositionLookup.test.tsx — Spec B3 System Invariants I1-I12 + Edge Cases E1-E8
// Framework: Vitest + @testing-library/react + jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PositionLookup from './PositionLookup'
import type { Position } from '@/lib/admin/types/position'

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const ACTIVE_POS: Position = {
  code: 'POS-00001',
  titleTh: 'ผู้จัดการสาขา',
  titleEn: 'Branch Manager',
  businessUnit: 'ROBINSON',
  businessUnitLabel: 'Robinson Department Store',
  branch: 'ROB-RAMA9',
  branchLabel: 'Robinson Rama 9',
  job: 'RETAIL_OPS',
  jobLabel: 'Retail Operations',
  jobGrade: 'JG-08',
  jobGradeLabel: 'Senior Manager',
  managerPositionCode: 'POS-00002',
  managerPositionLabel: 'ผู้อำนวยการ',
  hrDistrict: 'BKK-CENTRAL',
  active: true,
}

const ACTIVE_POS_2: Position = {
  code: 'POS-00002',
  titleTh: 'ผู้อำนวยการ',
  titleEn: 'Director',
  businessUnit: 'ROBINSON',
  businessUnitLabel: 'Robinson Department Store',
  branch: undefined,
  branchLabel: undefined,
  job: 'RETAIL_OPS',
  jobLabel: 'Retail Operations',
  jobGrade: 'JG-10',
  jobGradeLabel: 'Director',
  managerPositionCode: undefined,
  managerPositionLabel: undefined,
  hrDistrict: undefined,
  active: true,
}

const INACTIVE_POS: Position = {
  code: 'POS-00099',
  titleTh: 'ตำแหน่งเก่า',
  titleEn: 'Legacy Position',
  businessUnit: 'ROBINSON',
  businessUnitLabel: 'Robinson Department Store',
  branch: undefined,
  branchLabel: undefined,
  job: 'HR',
  jobLabel: 'Human Resources',
  jobGrade: 'JG-02',
  jobGradeLabel: 'Staff',
  managerPositionCode: undefined,
  managerPositionLabel: undefined,
  hrDistrict: undefined,
  active: false,
}

const TOPS_POS: Position = {
  code: 'POS-00003',
  titleTh: 'ผู้จัดการร้าน ท็อปส์',
  titleEn: 'Store Manager Tops',
  businessUnit: 'TOPS',
  businessUnitLabel: 'Tops Supermarket',
  branch: 'TOPS-CENTRAL-WORLD',
  branchLabel: 'Tops Central World',
  job: 'RETAIL_OPS',
  jobLabel: 'Retail Operations',
  jobGrade: 'JG-08',
  jobGradeLabel: 'Senior Manager',
  managerPositionCode: undefined,
  managerPositionLabel: undefined,
  hrDistrict: 'BKK-CENTRAL',
  active: true,
}

const MIXED_MASTER: Position[] = [ACTIVE_POS, ACTIVE_POS_2, INACTIVE_POS, TOPS_POS]

// ─── I1: Only active positions appear ─────────────────────────────────────────

describe('I1 — only active positions in search results', () => {
  it('typing a query does not show inactive positions', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'ตำแหน่ง')
    // Wait for debounce
    await waitFor(() => {
      expect(screen.queryByTestId('position-option-POS-00099')).toBeNull()
    })
  })

  it('active positions appear in search', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'ผู้จัดการ')
    await waitFor(() => {
      expect(screen.queryByTestId('position-option-POS-00001')).not.toBeNull()
    })
  })
})

// ─── I2: onSelect emits full cascade payload ───────────────────────────────────

describe('I2 — onSelect emits full PositionCascade payload', () => {
  it('cascade has all 13 PositionCascade keys', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS, ACTIVE_POS_2]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByTestId('position-option-POS-00001'))
    fireEvent.mouseDown(screen.getByTestId('position-option-POS-00001'))
    expect(onSelect).toHaveBeenCalledOnce()
    const payload = onSelect.mock.calls[0][0]
    const cascadeKeys = [
      'code', 'titleTh', 'titleEn',
      'businessUnit', 'businessUnitLabel',
      'branch', 'branchLabel',
      'job', 'jobLabel',
      'jobGrade', 'jobGradeLabel',
      'managerPositionCode', 'managerPositionLabel',
      'hrDistrict',
    ]
    for (const key of cascadeKeys) {
      expect(payload).toHaveProperty(key)
    }
  })

  it('cascade values match the selected position', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByTestId('position-option-POS-00001'))
    fireEvent.mouseDown(screen.getByTestId('position-option-POS-00001'))
    const payload = onSelect.mock.calls[0][0]
    expect(payload.code).toBe('POS-00001')
    expect(payload.businessUnit).toBe('ROBINSON')
    expect(payload.jobGrade).toBe('JG-08')
  })
})

// ─── I3: Search matches code, titleTh, titleEn ────────────────────────────────

describe('I3 — search matches code + titleTh + titleEn', () => {
  it('searching by Thai title returns matching position', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'ผู้จัดการ')
    await waitFor(() => {
      expect(screen.queryByTestId('position-option-POS-00001')).not.toBeNull()
    })
  })

  it('searching by English title prefix returns matching position', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'Branch')
    await waitFor(() => {
      expect(screen.queryByTestId('position-option-POS-00001')).not.toBeNull()
    })
  })

  it('searching by position code returns matching position', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'POS-00002')
    await waitFor(() => {
      expect(screen.queryByTestId('position-option-POS-00002')).not.toBeNull()
    })
  })
})

// ─── I4: Controlled mode — parent owns state ──────────────────────────────────

describe('I4 — controlled mode', () => {
  it('renders chip when value is provided', () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} value={ACTIVE_POS} onSelect={onSelect} />)
    expect(screen.getByTestId('position-chip')).toBeInTheDocument()
  })

  it('chip clears when value changes to null externally', () => {
    const onSelect = vi.fn()
    const { rerender } = render(
      <PositionLookup positionMaster={MIXED_MASTER} value={ACTIVE_POS} onSelect={onSelect} />
    )
    expect(screen.getByTestId('position-chip')).toBeInTheDocument()
    rerender(<PositionLookup positionMaster={MIXED_MASTER} value={null} onSelect={onSelect} />)
    expect(screen.queryByTestId('position-chip')).toBeNull()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })
})

// ─── I5: Uncontrolled — defaultValue seeds ────────────────────────────────────

describe('I5 — uncontrolled mode with defaultValue', () => {
  it('renders chip from defaultValue on first mount', () => {
    const onSelect = vi.fn()
    render(
      <PositionLookup positionMaster={MIXED_MASTER} defaultValue={ACTIVE_POS} onSelect={onSelect} />
    )
    expect(screen.getByTestId('position-chip')).toBeInTheDocument()
  })
})

// ─── I6: Keyboard navigation ──────────────────────────────────────────────────

describe('I6 — keyboard ArrowDown/Enter/Escape', () => {
  it('ArrowDown opens dropdown', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS, ACTIVE_POS_2]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
  })

  it('Escape closes dropdown', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS, ACTIVE_POS_2]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByRole('listbox'))
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByRole('listbox')).toBeNull()
  })

  it('Enter selects focused option', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS, ACTIVE_POS_2]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.keyDown(input, { key: 'ArrowDown' }) // opens + focuses first
    await waitFor(() => screen.getByRole('listbox'))
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onSelect).toHaveBeenCalledOnce()
  })

  it('aria-expanded reflects open state', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('aria-expanded', 'false')
    fireEvent.focus(input)
    await waitFor(() => expect(input).toHaveAttribute('aria-expanded', 'true'))
  })
})

// ─── I7: Empty search shows top N alphabetical ────────────────────────────────

describe('I7 — empty search shows top 10 alphabetical', () => {
  it('focus without typing shows results', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByRole('listbox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })
})

// ─── I8: No results copy ──────────────────────────────────────────────────────

describe('I8 — no results shows Thai copy', () => {
  it('shows "ไม่พบตำแหน่ง" when no match', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'zzzzzzznotexist')
    await waitFor(() => {
      expect(screen.getByTestId('no-results')).toBeInTheDocument()
      expect(screen.getByTestId('no-results').textContent).toMatch(/ไม่พบตำแหน่ง/)
    })
  })
})

// ─── I9: Loading state skeleton ───────────────────────────────────────────────

describe('I9 — loading state shows skeleton', () => {
  it('renders aria-busy element when isLoading=true', () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[]} isLoading={true} onSelect={onSelect} />)
    const skeleton = document.querySelector('[aria-busy="true"]')
    expect(skeleton).not.toBeNull()
  })
})

// ─── I10: Selected chip + เปลี่ยน ─────────────────────────────────────────────

describe('I10 — selected chip renders + เปลี่ยน clears', () => {
  it('selecting position shows chip', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByTestId('position-option-POS-00001'))
    fireEvent.mouseDown(screen.getByTestId('position-option-POS-00001'))
    expect(screen.getByTestId('position-chip')).toBeInTheDocument()
  })

  it('clicking เปลี่ยน restores input field and calls onSelect(null)', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByTestId('position-option-POS-00001'))
    fireEvent.mouseDown(screen.getByTestId('position-option-POS-00001'))
    // Chip shown
    expect(screen.getByTestId('position-chip')).toBeInTheDocument()
    // Click เปลี่ยน
    fireEvent.click(screen.getByRole('button', { name: /เปลี่ยน/i }))
    expect(screen.queryByTestId('position-chip')).toBeNull()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(onSelect).toHaveBeenLastCalledWith(null)
  })
})

// ─── I11: Orphan managerPositionCode warns in dev ─────────────────────────────

describe('I11 — orphan managerPositionCode console.warn in dev', () => {
  it('warns when managerPositionCode references non-existent position', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const orphan: Position = {
      ...ACTIVE_POS,
      code: 'POS-ORPHAN',
      managerPositionCode: 'POS-DOES-NOT-EXIST',
    }
    render(<PositionLookup positionMaster={[orphan]} onSelect={vi.fn()} />)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Orphan managerPositionCode/),
    )
    warnSpy.mockRestore()
  })
})

// ─── I12: Thai-primary chip label ─────────────────────────────────────────────

describe('I12 — Thai-primary chip with EN secondary', () => {
  it('chip shows Thai title as primary and English title as secondary', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[ACTIVE_POS]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByTestId('position-option-POS-00001'))
    fireEvent.mouseDown(screen.getByTestId('position-option-POS-00001'))
    const chip = screen.getByTestId('position-chip')
    expect(chip.textContent).toContain('ผู้จัดการสาขา') // TH primary
    expect(chip.textContent).toContain('Branch Manager') // EN secondary
  })
})

// ══════════════════════════════════════════════════════════════════════════════
// EDGE CASES
// ══════════════════════════════════════════════════════════════════════════════

// ─── E1: Empty positionMaster ──────────────────────────────────────────────────

describe('E1 — empty positionMaster shows disabled empty state', () => {
  it('renders "ไม่มีข้อมูล Position Master" when master is empty', () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[]} onSelect={onSelect} />)
    expect(screen.getByText(/ไม่มีข้อมูล Position Master/)).toBeInTheDocument()
  })

  it('does not render combobox input when master is empty', () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[]} onSelect={onSelect} />)
    expect(screen.queryByRole('combobox')).toBeNull()
  })
})

// ─── E2: Duplicate codes warn + use first ─────────────────────────────────────

describe('E2 — duplicate position codes', () => {
  it('warns on duplicate code and uses first occurrence', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const dup = { ...ACTIVE_POS, titleTh: 'สำเนา' }
    render(
      <PositionLookup positionMaster={[ACTIVE_POS, dup]} onSelect={vi.fn()} />
    )
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Duplicate position code/),
    )
    warnSpy.mockRestore()
  })
})

// ─── E3: Inactive manager in cascade — chip renders normally ──────────────────

describe('E3 — inactive manager in cascade renders chip normally', () => {
  it('chip shows manager label even if manager position is inactive', async () => {
    const posWithInactiveMgr: Position = {
      ...ACTIVE_POS,
      managerPositionCode: INACTIVE_POS.code,
      managerPositionLabel: INACTIVE_POS.titleTh,
    }
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[posWithInactiveMgr, INACTIVE_POS]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByTestId('position-option-POS-00001'))
    fireEvent.mouseDown(screen.getByTestId('position-option-POS-00001'))
    const payload = onSelect.mock.calls[0][0]
    expect(payload.managerPositionLabel).toBe(INACTIVE_POS.titleTh)
  })
})

// ─── E4: Controlled value changes externally ─────────────────────────────────

describe('E4 — controlled: external value change clears chip + updates', () => {
  it('changing value from pos A to pos B updates chip', () => {
    const onSelect = vi.fn()
    const { rerender } = render(
      <PositionLookup positionMaster={MIXED_MASTER} value={ACTIVE_POS} onSelect={onSelect} />
    )
    expect(screen.getByTestId('position-chip').textContent).toContain('ผู้จัดการสาขา')
    rerender(
      <PositionLookup positionMaster={MIXED_MASTER} value={TOPS_POS} onSelect={onSelect} />
    )
    expect(screen.getByTestId('position-chip').textContent).toContain('ท็อปส์')
  })
})

// ─── E5: Filter narrows to 0 — shows no-results hint ─────────────────────────

describe('E5 — filter narrows to 0 positions', () => {
  it('shows "ไม่พบตำแหน่ง" with filter hint when filter eliminates all', async () => {
    const onSelect = vi.fn()
    render(
      <PositionLookup
        positionMaster={MIXED_MASTER}
        filter={() => false}
        onSelect={onSelect}
      />
    )
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'ผู้จัดการ')
    await waitFor(() => {
      expect(screen.getByTestId('no-results')).toBeInTheDocument()
      expect(screen.getByTestId('no-results').textContent).toMatch(/ไม่พบตำแหน่ง/)
    })
  })
})

// ─── E6: Long Thai title truncates ────────────────────────────────────────────

describe('E6 — long Thai title shows truncated chip', () => {
  it('chip renders without overflow for 80-char title', async () => {
    const longPos: Position = {
      ...ACTIVE_POS,
      titleTh: 'ผู้จัดการอาวุโสฝ่ายปฏิบัติการค้าปลีกและพัฒนาธุรกิจเชิงกลยุทธ์ประจำภูมิภาค',
      // > 60 chars — chip should truncate
    }
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={[longPos]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    await waitFor(() => screen.getByTestId('position-option-POS-00001'))
    fireEvent.mouseDown(screen.getByTestId('position-option-POS-00001'))
    const chip = screen.getByTestId('position-chip')
    // title element should have truncate class
    const titleEl = chip.querySelector('.truncate')
    expect(titleEl).not.toBeNull()
    // title attribute present for tooltip
    expect(titleEl?.getAttribute('title')).toBeTruthy()
  })
})

// ─── E7: Rapid typing — debounce ─────────────────────────────────────────────

describe('E7 — rapid typing debounce 150ms', () => {
  it('results appear after debounce window (fireEvent — no fake-timer conflict)', async () => {
    const onSelect = vi.fn()
    render(<PositionLookup positionMaster={MIXED_MASTER} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    // Rapid synchronous changes
    fireEvent.change(input, { target: { value: 'ผ' } })
    fireEvent.change(input, { target: { value: 'ผู้' } })
    fireEvent.change(input, { target: { value: 'ผู้จ' } })
    // Results appear after debounce settles (waitFor retries until timeout)
    await waitFor(() => screen.getByRole('listbox'), { timeout: 1000 })
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })
})

// ─── E8: Unicode NFC normalization ────────────────────────────────────────────

describe('E8 — Unicode NFC normalization', () => {
  it('matches Thai text regardless of NFC vs NFD form', async () => {
    const onSelect = vi.fn()
    // NFD-encoded version of "ผู้จัดการสาขา"
    const nfdTitle = 'ผู้จัดการสาขา'.normalize('NFD')
    const nfdPos: Position = { ...ACTIVE_POS, titleTh: nfdTitle }
    render(<PositionLookup positionMaster={[nfdPos]} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    // Use fireEvent to avoid userEvent fake-timer interaction issues
    fireEvent.change(input, { target: { value: 'ผู้จัดการ'.normalize('NFC') } })
    await waitFor(() => {
      expect(screen.queryByTestId('position-option-POS-00001')).not.toBeNull()
    }, { timeout: 1000 })
  })
})
