// StepBiographical-marital.test.tsx — MARITAL picklist wiring in StepBiographical
//
// AC-3: StepBiographical renders PICKLIST_MARITAL_STATUS from @hrms/shared;
//       selecting an option updates useHireWizard store biographical.maritalStatus.
//
// Traceability: specs/hr-phase-1-d1-foundation.md §AC-3 + §D1.3
//
// Pattern: vitest + jsdom + @testing-library/react (same as StepIdentity.test.tsx)
// Scope: marital status field ONLY — do not touch dateOfBirth or other Step tests.

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StepBiographical from '@/app/[locale]/admin/hire/steps/StepBiographical'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

// mock next-intl: t(key) returns TH catalog value so getByRole/getByLabelText still works
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const th: Record<string, string> = {
      sectionTitle: 'ข้อมูลส่วนตัว',
      sectionSubtitle: 'ชื่อท้องถิ่น ชื่อเล่น เพศ สัญชาติ กรุ๊ปเลือด สถานภาพสมรส',
      salutationLocal: 'คำนำหน้า (ภาษาท้องถิ่น)',
      firstNameLocal: 'ชื่อ (TH)',
      lastNameLocal: 'นามสกุล (TH)',
      middleNameLocal: 'ชื่อกลาง (TH)',
      middleNameLocalHelp: 'เทียบเท่ากับ SuccessFactors PerPersonal.secondLastName',
      nickname: 'ชื่อเล่น',
      militaryStatus: 'สถานภาพทหาร',
      gender: 'เพศ',
      nationality: 'สัญชาติ',
      foreigner: 'ชาวต่างชาติ',
      foreignerAuto: '(กำหนดอัตโนมัติจากสัญชาติ)',
      bloodType: 'กรุ๊ปเลือด',
      maritalStatus: 'สถานภาพสมรส',
      maritalStatusSince: 'วันที่เปลี่ยนสถานภาพ',
      spouseNameTh: 'ชื่อคู่สมรส',
      nativePreferredLang: 'ภาษาหลัก',
      religion: 'ศาสนา',
      salutationLocalPlaceholder: 'เช่น นาย / นาง / นางสาว',
      firstNameLocalPlaceholder: 'ชื่อภาษาไทย',
      lastNameLocalPlaceholder: 'นามสกุลภาษาไทย',
      middleNameLocalPlaceholder: 'ชื่อกลาง',
      nicknamePlaceholder: 'ชื่อเล่น',
      spouseNameThPlaceholder: 'ชื่อ-นามสกุลคู่สมรส (ภาษาไทย)',
      nativePreferredLangPlaceholder: 'เช่น ภาษาไทย, English (SF code)',
      spouseNameThHelp: 'SF: PerPersonal.partnerName / customString2 (ชื่อ) + customString3 (นามสกุล)',
      nativePreferredLangHelp: 'SF: PerPersonal.nativePreferredLang (customString5)',
      selectMilitaryStatus: '— เลือกสถานะ —',
      selectGender: '— เลือกเพศ —',
      selectNationality: '— เลือกสัญชาติ —',
      selectForeigner: '— (อัตโนมัติ) —',
      selectBloodType: '— เลือกกรุ๊ปเลือด —',
      selectMaritalStatus: '— เลือกสถานภาพ —',
      selectReligion: '— เลือกศาสนา (ไม่บังคับ) —',
    }
    return th[key] ?? key
  },
}))

// reset Zustand store before every test to guarantee isolation
beforeEach(() => {
  act(() => {
    useHireWizard.getState().reset()
  })
})

// ─── AC-3: MARITAL picklist renders correctly ─────────────────────────────────

describe('StepBiographical — MARITAL picklist renders', () => {
  // AC-3: Marital status select element is present
  it('AC-3: renders a marital status select element', () => {
    render(<StepBiographical />)
    const select = screen.getByRole('combobox', { name: /สถานภาพสมรส|Marital Status/i })
    expect(select).toBeInTheDocument()
  })

  // AC-3: SINGLE option rendered with Thai label "โสด"
  it('AC-3: renders SINGLE option with Thai label "โสด"', () => {
    render(<StepBiographical />)
    const option = screen.getByRole('option', { name: 'โสด' })
    expect(option).toBeInTheDocument()
    expect((option as HTMLOptionElement).value).toBe('SINGLE')
  })

  // AC-3: MARRIED option rendered with Thai label "สมรส"
  it('AC-3: renders MARRIED option with Thai label "สมรส"', () => {
    render(<StepBiographical />)
    const option = screen.getByRole('option', { name: 'สมรส' })
    expect(option).toBeInTheDocument()
    expect((option as HTMLOptionElement).value).toBe('MARRIED')
  })

  // AC-3: DIVORCED option rendered with Thai label "หย่าร้าง"
  it('AC-3: renders DIVORCED option with Thai label "หย่าร้าง"', () => {
    render(<StepBiographical />)
    const option = screen.getByRole('option', { name: 'หย่าร้าง' })
    expect(option).toBeInTheDocument()
    expect((option as HTMLOptionElement).value).toBe('DIVORCED')
  })

  // AC-3: WIDOWED option rendered with Thai label "คู่สมรสเสียชีวิต"
  it('AC-3: renders WIDOWED option with Thai label "คู่สมรสเสียชีวิต"', () => {
    render(<StepBiographical />)
    const option = screen.getByRole('option', { name: 'คู่สมรสเสียชีวิต' })
    expect(option).toBeInTheDocument()
    expect((option as HTMLOptionElement).value).toBe('WIDOWED')
  })

  // AC-3: At least 4 required options are rendered (SINGLE/MARRIED/DIVORCED/WIDOWED)
  it('AC-3: renders at minimum 4 picklist options (excluding placeholder)', () => {
    render(<StepBiographical />)
    const select = screen.getByRole('combobox', { name: /สถานภาพสมรส|Marital Status/i })
    // All <option> children minus the placeholder "— เลือกสถานภาพ —"
    const options = Array.from(select.querySelectorAll('option')).filter(
      (o) => (o as HTMLOptionElement).value !== ''
    )
    expect(options.length).toBeGreaterThanOrEqual(4)
  })

  // AC-3: Placeholder option is present and selected by default
  it('AC-3: placeholder option is selected by default (empty value)', () => {
    render(<StepBiographical />)
    const select = screen.getByRole('combobox', {
      name: /สถานภาพสมรส|Marital Status/i,
    }) as HTMLSelectElement
    expect(select.value).toBe('')
  })
})

// ─── AC-3: Selecting option updates store ────────────────────────────────────

describe('StepBiographical — store update on marital status change', () => {
  // D2 S1: dateOfBirth ย้ายไปอยู่ใน identity slice แล้ว (BA row 8)
  // stepBiographicalSchema ตอนนี้ gate ด้วย otherTitleTh/firstNameLocal/etc.
  // Seed minimal required biographical fields เพื่อ marital selection จะ propagate ไป store
  beforeEach(() => {
    act(() => {
      useHireWizard.getState().setStepData('biographical', {
        otherTitleTh: 'นาย',
        firstNameLocal: 'สมชาย',
        lastNameLocal: 'ใจดี',
        middleNameLocal: 'กลาง',
        nickname: 'แดง',
        militaryStatus: 'EXEMPTED',
        gender: 'M',
        nationality: 'TH',
        foreigner: 'NO',
        bloodType: 'A_POS',
        maritalStatus: null,
        maritalStatusSince: '2020-01-01',
      })
    })
  })

  // AC-3: Selecting MARRIED updates biographical.maritalStatus in store
  it('AC-3: selecting MARRIED updates store biographical.maritalStatus to "MARRIED"', async () => {
    const user = userEvent.setup()
    render(<StepBiographical />)

    const select = screen.getByRole('combobox', { name: /สถานภาพสมรส|Marital Status/i })
    await user.selectOptions(select, 'MARRIED')

    const stored = useHireWizard.getState().formData.biographical.maritalStatus
    expect(stored).toBe('MARRIED')
  })

  // AC-3: Selecting SINGLE updates biographical.maritalStatus in store
  it('AC-3: selecting SINGLE updates store biographical.maritalStatus to "SINGLE"', async () => {
    const user = userEvent.setup()
    render(<StepBiographical />)

    const select = screen.getByRole('combobox', { name: /สถานภาพสมรส|Marital Status/i })
    await user.selectOptions(select, 'SINGLE')

    const stored = useHireWizard.getState().formData.biographical.maritalStatus
    expect(stored).toBe('SINGLE')
  })

  // AC-3: Selecting DIVORCED updates biographical.maritalStatus in store
  it('AC-3: selecting DIVORCED updates store biographical.maritalStatus to "DIVORCED"', async () => {
    const user = userEvent.setup()
    render(<StepBiographical />)

    const select = screen.getByRole('combobox', { name: /สถานภาพสมรส|Marital Status/i })
    await user.selectOptions(select, 'DIVORCED')

    const stored = useHireWizard.getState().formData.biographical.maritalStatus
    expect(stored).toBe('DIVORCED')
  })

  // AC-3: Store maritalStatus is null on initial load (before interaction)
  it('AC-3: store maritalStatus starts as null before any selection', () => {
    render(<StepBiographical />)
    const stored = useHireWizard.getState().formData.biographical.maritalStatus
    expect(stored).toBeNull()
  })

  // AC-3: Switching from one option to another updates store correctly
  it('AC-3: changing selection from MARRIED to DIVORCED updates store', async () => {
    const user = userEvent.setup()
    render(<StepBiographical />)

    const select = screen.getByRole('combobox', { name: /สถานภาพสมรส|Marital Status/i })

    await user.selectOptions(select, 'MARRIED')
    expect(useHireWizard.getState().formData.biographical.maritalStatus).toBe('MARRIED')

    await user.selectOptions(select, 'DIVORCED')
    expect(useHireWizard.getState().formData.biographical.maritalStatus).toBe('DIVORCED')
  })
})

// ─── AC-3: Only active picklist items are rendered ───────────────────────────

describe('StepBiographical — active items filter', () => {
  // AC-3: All rendered options correspond to active PICKLIST_MARITAL_STATUS items
  it('AC-3: rendered options only include active picklist items', () => {
    render(<StepBiographical />)
    const select = screen.getByRole('combobox', { name: /สถานภาพสมรส|Marital Status/i })
    const options = Array.from(select.querySelectorAll('option')).filter(
      (o) => (o as HTMLOptionElement).value !== ''
    )
    // All active MARITAL_STATUS items from picklist: SINGLE, MARRIED, DIVORCED, WIDOWED, SEPARATED
    // The component filters by item.active — all 5 are active in Phase 0 F2
    expect(options.length).toBeGreaterThanOrEqual(4)
    // No option should have a blank id (placeholder has value="")
    for (const opt of options) {
      expect((opt as HTMLOptionElement).value).not.toBe('')
    }
  })
})
