// RehireSteps.test.tsx — Unit tests สำหรับ Wave 3 Rehire step components
// ครอบคลุม: RehireStepRehireDate, RehireStepBiographical, RehireStepEmploymentInfo, RehireStepPersonal
// Part B Wave 4 — [part-b-wave4-tests]

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import type { MockEmployee } from '@/lib/admin/store/useLifecycleWizard'
import RehireStepRehireDate from '@/app/admin/rehire/steps/RehireStepRehireDate'
import RehireStepBiographical from '@/app/admin/rehire/steps/RehireStepBiographical'
import RehireStepEmploymentInfo from '@/app/admin/rehire/steps/RehireStepEmploymentInfo'
import RehireStepPersonal from '@/app/admin/rehire/steps/RehireStepPersonal'

// Employee fixture — Terminated + okToRehire=true (สำหรับ rehire flow)
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

// helper: ตั้ง rehire flow + step 1 พร้อมก่อนทุก test
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

// reset store ก่อนทุก test เพื่อ isolation
beforeEach(() => {
  act(() => {
    useLifecycleWizard.getState().reset()
  })
})

// =========================================================
// RehireStepRehireDate — Step 2
// =========================================================

describe('RehireStepRehireDate', () => {
  it('ต้อง render EffectiveDatePicker พร้อม label "วันที่เริ่มงานใหม่"', () => {
    setupRehireFlow()
    render(<RehireStepRehireDate />)

    // label ต้องปรากฏ (getAllByText เพราะ heading + label ต่างก็มีข้อความนี้)
    expect(screen.getAllByText(/วันที่เริ่มงานใหม่/i)[0]).toBeInTheDocument()
  })

  it('ต้องมี required indicator (* หรือ aria-required) บน date input', () => {
    setupRehireFlow()
    const { container } = render(<RehireStepRehireDate />)

    // ตรวจสอบ required attribute หรือ aria-required
    const hasRequired =
      container.querySelector('[aria-required="true"]') !== null ||
      container.querySelector('[required]') !== null ||
      container.textContent?.includes('*')
    expect(hasRequired).toBe(true)
  })

  it('เมื่อ user เลือกวันที่ → store.rehire.step2.rehireDate ต้องอัปเดต', async () => {
    setupRehireFlow()
    render(<RehireStepRehireDate />)

    const dateInput = screen.getByLabelText(/วันที่เริ่มงานใหม่/i)
    fireEvent.change(dateInput, { target: { value: '2026-06-01' } })

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step2.rehireDate).toBe('2026-06-01')
      } else {
        expect(state.active?.flow).toBe('rehire') // fail ชัดเจน
      }
    })
  })

  it('ไม่ render เมื่อ flow ไม่ใช่ rehire (guard condition)', () => {
    // ตั้ง flow เป็น transfer แทน
    act(() => {
      useLifecycleWizard.getState().setFlow('transfer')
    })
    const { container } = render(<RehireStepRehireDate />)
    expect(container.firstChild).toBeNull()
  })
})

// =========================================================
// RehireStepBiographical — Step 3
// =========================================================

describe('RehireStepBiographical', () => {
  it('ต้อง render date input สำหรับวันเกิด (dateOfBirth)', () => {
    setupRehireFlow()
    render(<RehireStepBiographical />)

    // ตรวจสอบ label ภาษาไทย
    expect(screen.getByText(/วันเกิด/i)).toBeInTheDocument()

    // ตรวจสอบ input type="date" ผ่าน id (jsdom ไม่ให้ role=textbox กับ input[type="date"])
    const dateInput = document.querySelector('#rehire-dob')
    expect(dateInput).toBeTruthy()
    expect(dateInput?.getAttribute('type')).toBe('date')
  })

  it('ต้องมี required marker (*) บน dateOfBirth field', () => {
    setupRehireFlow()
    const { container } = render(<RehireStepBiographical />)

    const hasRequired =
      container.querySelector('[aria-required="true"]') !== null ||
      container.querySelector('[required]') !== null ||
      container.textContent?.includes('*')
    expect(hasRequired).toBe(true)
  })

  it('แสดง read-only preview ชื่อพนักงาน เมื่อมี selectedEmployee', () => {
    setupRehireFlow()
    render(<RehireStepBiographical />)

    // ชื่อพนักงานต้องปรากฏใน read-only section
    expect(screen.getByText(/พิมพ์ใจ/i)).toBeInTheDocument()
    expect(screen.getByText(/EMP0016/i)).toBeInTheDocument()
  })

  it('เมื่อกรอกวันเกิด → store.rehire.step3.dateOfBirth ต้องอัปเดต', async () => {
    setupRehireFlow()
    render(<RehireStepBiographical />)

    const dobInput = document.querySelector('#rehire-dob') as HTMLInputElement
    expect(dobInput).toBeTruthy()

    fireEvent.change(dobInput, { target: { value: '1990-05-15' } })

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step3.dateOfBirth).toBe('1990-05-15')
      } else {
        expect(state.active?.flow).toBe('rehire')
      }
    })
  })
})

// =========================================================
// RehireStepEmploymentInfo — Step 4
// =========================================================

// 8 Employee Class options verbatim จาก Appendix 3 (C8: ห้าม invent)
const EXPECTED_EMPLOYEE_CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

describe('RehireStepEmploymentInfo', () => {
  it('ต้อง render dropdown employeeClass ที่มี 8 options (A-H)', () => {
    setupRehireFlow()
    render(<RehireStepEmploymentInfo />)

    const select = document.querySelector('#rehire-employee-class') as HTMLSelectElement
    expect(select).toBeTruthy()

    // นับ option ที่มีค่า (ไม่นับ placeholder)
    const optionsWithValue = Array.from(select.options).filter((o) => o.value !== '')
    expect(optionsWithValue).toHaveLength(8)
  })

  it('8 options ต้องมีค่า A-H verbatim (Appendix 3 — C8)', () => {
    setupRehireFlow()
    render(<RehireStepEmploymentInfo />)

    const select = document.querySelector('#rehire-employee-class') as HTMLSelectElement
    const values = Array.from(select.options)
      .filter((o) => o.value !== '')
      .map((o) => o.value)

    for (const cls of EXPECTED_EMPLOYEE_CLASSES) {
      expect(values).toContain(cls)
    }
  })

  it('เมื่อเลือก option → store.rehire.step4.employeeClass ต้องอัปเดต', async () => {
    setupRehireFlow()
    const user = userEvent.setup()
    render(<RehireStepEmploymentInfo />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'A')

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step4.employeeClass).toBe('A')
      } else {
        expect(state.active?.flow).toBe('rehire')
      }
    })
  })

  it('ไม่ render เมื่อ active=null (guard condition)', () => {
    // store ถูก reset แล้ว (beforeEach) — active=null
    const { container } = render(<RehireStepEmploymentInfo />)
    expect(container.firstChild).toBeNull()
  })
})

// =========================================================
// RehireStepPersonal — Step 5
// =========================================================

describe('RehireStepPersonal', () => {
  it('ต้อง render addressLine1 input', () => {
    setupRehireFlow()
    render(<RehireStepPersonal />)

    const addrInput = document.querySelector('#rehire-address-line1')
    expect(addrInput).toBeTruthy()
    expect(addrInput?.getAttribute('type')).toBe('text')
  })

  it('ต้องมี required marker บน addressLine1', () => {
    setupRehireFlow()
    const { container } = render(<RehireStepPersonal />)

    const hasRequired =
      container.querySelector('[aria-required="true"]') !== null ||
      container.querySelector('[required]') !== null ||
      container.textContent?.includes('*')
    expect(hasRequired).toBe(true)
  })

  it('เมื่อกรอกที่อยู่ → store.rehire.step5.addressLine1 ต้องอัปเดต', async () => {
    setupRehireFlow()
    render(<RehireStepPersonal />)

    const addrInput = document.querySelector('#rehire-address-line1') as HTMLInputElement
    expect(addrInput).toBeTruthy()

    fireEvent.change(addrInput, { target: { value: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพ 10110' } })

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'rehire') {
        expect(state.active.formData.step5.addressLine1).toBe('123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพ 10110')
      } else {
        expect(state.active?.flow).toBe('rehire')
      }
    })
  })

  it('addressLine1 input มี placeholder บ่งบอกรูปแบบที่อยู่', () => {
    setupRehireFlow()
    render(<RehireStepPersonal />)

    const addrInput = document.querySelector('#rehire-address-line1') as HTMLInputElement
    expect(addrInput?.placeholder).toBeTruthy()
  })
})
