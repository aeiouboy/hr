// RehireWizard.test.tsx — critical-path unit tests สำหรับ Rehire wizard
// ครอบคลุม: Step 2 (RehireDate), Step 3 (Biographical), Step 4 (EmploymentInfo),
//          Step 5 (Personal), และ Rehire page (Stepper 7 ขั้นตอน)
// Pattern A (real store + setFlow) — ตาม tests/unit/_mock-guide.md §3

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import type { MockEmployee } from '@/lib/admin/store/useLifecycleWizard'

import RehireStepRehireDate from '@/app/admin/rehire/steps/RehireStepRehireDate'
import RehireStepBiographical from '@/app/admin/rehire/steps/RehireStepBiographical'
import RehireStepEmploymentInfo from '@/app/admin/rehire/steps/RehireStepEmploymentInfo'
import RehireStepPersonal from '@/app/admin/rehire/steps/RehireStepPersonal'
import RehirePage from '@/app/admin/rehire/page'

// ---------- fixtures --------------------------------------------------------

// พนักงาน Terminated + okToRehire=true (เงื่อนไขเดียวที่ผ่าน rehireStep1Schema)
const mockRehireEmployee: MockEmployee = {
  externalCode: 'EMP0016',
  firstName: { th: 'พิมพ์ใจ', en: 'Phimjai' },
  lastName:  { th: 'ทรงศักดิ์', en: 'Songsak' },
  nationalId: '1101600678901',
  company: 'C001',
  businessUnit: '10000000',
  position: 'ฝ่ายบุคคล',
  hireDate: '2019-02-01',
  status: 'Terminated',
  lastTermDate: '2026-01-23',
  okToRehire: true,
}

// ---------- setup helpers ---------------------------------------------------

function setupRehireFlow() {
  act(() => {
    const store = useLifecycleWizard.getState()
    store.setFlow('rehire')
    store.setStepData('rehire', 1, {
      selectedEmployee: mockRehireEmployee,
      eventReason: 'RE_REHIRE_LT1',
    })
  })
}

// reset Zustand singleton ก่อนทุก test เพื่อ isolation
beforeEach(() => {
  act(() => {
    useLifecycleWizard.getState().reset()
  })
})

// ============================================================================
// Step 2 — RehireStepRehireDate
// ============================================================================

describe('RehireStepRehireDate (Step 2)', () => {
  it('render EffectiveDatePicker พร้อม label "วันที่เริ่มงานใหม่"', () => {
    setupRehireFlow()
    render(<RehireStepRehireDate />)

    expect(screen.getByText(/วันที่เริ่มงานใหม่ \(Rehire Date\)/)).toBeInTheDocument()
    // date input ต้องเป็น type="date"
    const dateInput = screen.getByLabelText(/วันที่เริ่มงานใหม่/) as HTMLInputElement
    expect(dateInput).toBeTruthy()
    expect(dateInput.type).toBe('date')
  })

  it('มี required attribute บน date input (validate required)', () => {
    setupRehireFlow()
    render(<RehireStepRehireDate />)

    const dateInput = screen.getByLabelText(/วันที่เริ่มงานใหม่/) as HTMLInputElement
    // EffectiveDatePicker ใช้ aria-required เมื่อ required={true}
    expect(dateInput.getAttribute('aria-required')).toBe('true')
  })

  it('เมื่อเลือกวันที่ → setStepData เขียน rehireDate เข้า step2 (type ถูก)', async () => {
    setupRehireFlow()
    render(<RehireStepRehireDate />)

    const dateInput = screen.getByLabelText(/วันที่เริ่มงานใหม่/) as HTMLInputElement
    fireEvent.change(dateInput, { target: { value: '2026-06-01' } })

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      // narrow discriminated union ก่อน access formData
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step2.rehireDate).toBe('2026-06-01')
        // sanity: step 1 ไม่โดน overwrite (ยืนยัน target step ถูก)
        expect(state.active.formData.step1.selectedEmployee?.externalCode).toBe('EMP0016')
      } else {
        // fail ชัดเจนถ้า flow mismatch (setStepData silent-warn on mismatch)
        expect(state.active?.flow).toBe('rehire')
      }
    })
  })

  it('pre-fill ค่า rehireDate จาก store เมื่อเข้ามาที่ step 2 ครั้งที่สอง', () => {
    setupRehireFlow()
    act(() => {
      useLifecycleWizard.getState().setStepData('rehire', 2, { rehireDate: '2026-07-15' })
    })
    render(<RehireStepRehireDate />)

    const dateInput = screen.getByLabelText(/วันที่เริ่มงานใหม่/) as HTMLInputElement
    expect(dateInput.value).toBe('2026-07-15')
  })

  it('guard: flow ไม่ใช่ rehire → return null', () => {
    act(() => {
      useLifecycleWizard.getState().setFlow('transfer')
    })
    const { container } = render(<RehireStepRehireDate />)
    expect(container.firstChild).toBeNull()
  })
})

// ============================================================================
// Step 3 — RehireStepBiographical
// ============================================================================

describe('RehireStepBiographical (Step 3)', () => {
  it('guard: active.flow !== "rehire" → return null', () => {
    // ตั้ง flow ผิด (terminate) — guard ต้อง block
    act(() => {
      useLifecycleWizard.getState().setFlow('terminate')
    })
    const { container } = render(<RehireStepBiographical />)
    expect(container.firstChild).toBeNull()
  })

  it('guard: active=null (ยังไม่ setFlow) → return null', () => {
    // store ถูก reset ก่อน test — active=null
    const { container } = render(<RehireStepBiographical />)
    expect(container.firstChild).toBeNull()
  })

  it('render ปกติเมื่อ flow=rehire: มีหัวข้อ + read-only preview ของ employee', () => {
    setupRehireFlow()
    render(<RehireStepBiographical />)

    expect(screen.getByText(/ข้อมูลประวัติ \(Biographical\)/)).toBeInTheDocument()
    // read-only section — ชื่อพนักงาน + รหัส + nationalId
    expect(screen.getByText(/พิมพ์ใจ/)).toBeInTheDocument()
    expect(screen.getByText(/ทรงศักดิ์/)).toBeInTheDocument()
    expect(screen.getByText(/EMP0016/)).toBeInTheDocument()
    expect(screen.getByText(/1101600678901/)).toBeInTheDocument()
  })

  it('pre-fill dateOfBirth จาก store เข้า input', () => {
    setupRehireFlow()
    act(() => {
      useLifecycleWizard.getState().setStepData('rehire', 3, { dateOfBirth: '1990-05-15' })
    })
    render(<RehireStepBiographical />)

    const dobInput = document.querySelector('#rehire-dob') as HTMLInputElement
    expect(dobInput).toBeTruthy()
    expect(dobInput.value).toBe('1990-05-15')
  })

  it('เมื่อกรอกวันเกิด → setStepData เขียน dateOfBirth เข้า step3', async () => {
    setupRehireFlow()
    render(<RehireStepBiographical />)

    const dobInput = document.querySelector('#rehire-dob') as HTMLInputElement
    expect(dobInput).toBeTruthy()
    fireEvent.change(dobInput, { target: { value: '1988-12-01' } })

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step3.dateOfBirth).toBe('1988-12-01')
      } else {
        expect(state.active?.flow).toBe('rehire')
      }
    })
  })
})

// ============================================================================
// Step 4 — RehireStepEmploymentInfo
// ============================================================================

// 8 employee class codes — verbatim จาก Appendix 3 (C8: ห้าม invent)
const EXPECTED_EMPLOYEE_CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const

describe('RehireStepEmploymentInfo (Step 4)', () => {
  it('guard: flow !== rehire → return null', () => {
    act(() => {
      useLifecycleWizard.getState().setFlow('transfer')
    })
    const { container } = render(<RehireStepEmploymentInfo />)
    expect(container.firstChild).toBeNull()
  })

  it('render fields: label ภาษาไทย + select employeeClass + placeholder option', () => {
    setupRehireFlow()
    render(<RehireStepEmploymentInfo />)

    expect(screen.getByText(/ข้อมูลพนักงาน \(Employee Info\)/)).toBeInTheDocument()

    const select = document.querySelector('#rehire-employee-class') as HTMLSelectElement
    expect(select).toBeTruthy()
    // placeholder option (value="")
    expect(select.options[0].value).toBe('')
    expect(select.options[0].text).toMatch(/เลือกประเภทพนักงาน/)
  })

  it('ต้องมี 8 options (A-H) ครบ verbatim', () => {
    setupRehireFlow()
    render(<RehireStepEmploymentInfo />)

    const select = document.querySelector('#rehire-employee-class') as HTMLSelectElement
    const values = Array.from(select.options)
      .map((o) => o.value)
      .filter((v) => v !== '')

    expect(values).toHaveLength(8)
    for (const cls of EXPECTED_EMPLOYEE_CLASSES) {
      expect(values).toContain(cls)
    }
  })

  it('validate required: select มี aria-required="true"', () => {
    setupRehireFlow()
    render(<RehireStepEmploymentInfo />)

    const select = document.querySelector('#rehire-employee-class') as HTMLSelectElement
    expect(select.getAttribute('aria-required')).toBe('true')
    expect(select.hasAttribute('required')).toBe(true)
  })

  it('เลือก option → store.rehire.step4.employeeClass อัปเดต', async () => {
    setupRehireFlow()
    const user = userEvent.setup()
    render(<RehireStepEmploymentInfo />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'C')

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step4.employeeClass).toBe('C')
      } else {
        expect(state.active?.flow).toBe('rehire')
      }
    })
  })
})

// ============================================================================
// Step 5 — RehireStepPersonal
// ============================================================================

describe('RehireStepPersonal (Step 5)', () => {
  it('guard fail: flow=null → return null', () => {
    // ไม่ setFlow — active=null
    const { container } = render(<RehireStepPersonal />)
    expect(container.firstChild).toBeNull()
  })

  it('guard fail: flow !== rehire → return null', () => {
    act(() => {
      useLifecycleWizard.getState().setFlow('terminate')
    })
    const { container } = render(<RehireStepPersonal />)
    expect(container.firstChild).toBeNull()
  })

  it('render ปกติ: label + input addressLine1 + required marker + placeholder', () => {
    setupRehireFlow()
    render(<RehireStepPersonal />)

    expect(screen.getByText(/ที่อยู่ \(Personal Address\)/)).toBeInTheDocument()

    const addrInput = document.querySelector('#rehire-address-line1') as HTMLInputElement
    expect(addrInput).toBeTruthy()
    expect(addrInput.type).toBe('text')
    expect(addrInput.getAttribute('aria-required')).toBe('true')
    expect(addrInput.hasAttribute('required')).toBe(true)
    expect(addrInput.placeholder).toMatch(/บ้านเลขที่/)
  })

  it('pre-fill addressLine1 จาก store', () => {
    setupRehireFlow()
    act(() => {
      useLifecycleWizard.getState().setStepData('rehire', 5, {
        addressLine1: '99/1 ถนนพหลโยธิน เขตจตุจักร กรุงเทพ 10900',
      })
    })
    render(<RehireStepPersonal />)

    const addrInput = document.querySelector('#rehire-address-line1') as HTMLInputElement
    expect(addrInput.value).toBe('99/1 ถนนพหลโยธิน เขตจตุจักร กรุงเทพ 10900')
  })

  it('เมื่อกรอกที่อยู่ → store.rehire.step5.addressLine1 อัปเดต', async () => {
    setupRehireFlow()
    render(<RehireStepPersonal />)

    const addrInput = document.querySelector('#rehire-address-line1') as HTMLInputElement
    fireEvent.change(addrInput, {
      target: { value: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพ 10110' },
    })

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step5.addressLine1).toBe(
          '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพ 10110'
        )
      } else {
        expect(state.active?.flow).toBe('rehire')
      }
    })
  })
})

// ============================================================================
// RehirePage — Stepper 7 ขั้นตอน
// ============================================================================

// 7 step labels — ต้องตรง REHIRE_STEPS ใน rehire/page.tsx verbatim (C8)
const EXPECTED_REHIRE_STEPS = [
  { labelTh: 'เลือกพนักงานเดิม',   labelEn: 'Employee Lookup' },
  { labelTh: 'วันที่เริ่มงานใหม่',   labelEn: 'Rehire Date' },
  { labelTh: 'ข้อมูลประวัติ',         labelEn: 'Biographical' },
  { labelTh: 'ข้อมูลพนักงาน',         labelEn: 'Employee Info' },
  { labelTh: 'ที่อยู่',               labelEn: 'Personal' },
  { labelTh: 'ข้อมูลงาน',             labelEn: 'Job' },
  { labelTh: 'ค่าตอบแทน',             labelEn: 'Compensation' },
] as const

describe('RehirePage — Stepper', () => {
  it('render Stepper ที่มี 7 step items (data-testid="step-item")', async () => {
    setupRehireFlow()
    render(<RehirePage />)

    // Stepper อยู่ใน nav (aria-label="ขั้นตอน Hire Wizard")
    await waitFor(() => {
      const items = document.querySelectorAll('[data-testid="step-item"]')
      expect(items).toHaveLength(7)
    })
  })

  it('ทุก step label ภาษาไทย + อังกฤษปรากฏถูกต้องตาม REHIRE_STEPS', async () => {
    setupRehireFlow()
    render(<RehirePage />)

    const nav = await screen.findByRole('navigation', { name: /ขั้นตอน/ })

    for (const step of EXPECTED_REHIRE_STEPS) {
      // Thai label
      expect(within(nav).getByText(step.labelTh)).toBeInTheDocument()
      // English label
      expect(within(nav).getByText(step.labelEn)).toBeInTheDocument()
    }
  })

  it('header แสดง "ขั้นตอน 1 จาก 7" ตอนเปิดหน้าแรก', async () => {
    setupRehireFlow()
    render(<RehirePage />)

    await waitFor(() => {
      // currentStep เริ่มต้น = 1, maxStep สำหรับ rehire = 7
      expect(screen.getByText(/ขั้นตอน 1 จาก 7/)).toBeInTheDocument()
    })
  })

  it('อันดับของ steps ใน Stepper ตรงกับ REHIRE_STEPS ลำดับ 1–7', async () => {
    setupRehireFlow()
    render(<RehirePage />)

    const nav = await screen.findByRole('navigation', { name: /ขั้นตอน/ })
    const items = within(nav).getAllByTestId('step-item')

    items.forEach((item, idx) => {
      expect(item.textContent ?? '').toContain(EXPECTED_REHIRE_STEPS[idx].labelTh)
      expect(item.textContent ?? '').toContain(EXPECTED_REHIRE_STEPS[idx].labelEn)
    })
  })

  it('auto-setFlow: เข้าหน้า rehire ด้วย flow ว่าง → useEffect ตั้ง flow=rehire → Stepper render', async () => {
    // ไม่ setupRehireFlow() — active=null เมื่อเริ่ม
    render(<RehirePage />)

    // รอ useEffect เรียก setFlow('rehire') แล้ว re-render
    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      expect(state.active?.flow).toBe('rehire')
    })

    await waitFor(() => {
      const items = document.querySelectorAll('[data-testid="step-item"]')
      expect(items).toHaveLength(7)
    })
  })
})
