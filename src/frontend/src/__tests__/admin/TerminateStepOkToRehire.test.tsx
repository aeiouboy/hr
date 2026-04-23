// TerminateStepOkToRehire.test.tsx — Unit tests สำหรับ Terminate Step 3: OK to Rehire
// BRD #111 + #172: radio Yes/No + termComments textarea
// Part B Wave 4 — [part-b-wave4-tests]

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import type { MockEmployee } from '@/lib/admin/store/useLifecycleWizard'
import TerminateStepOkToRehire from '@/app/admin/terminate/steps/TerminateStepOkToRehire'

// Employee fixture สำหรับ terminate flow (Active)
const mockActiveEmployee: MockEmployee = {
  externalCode: 'EMP0005',
  firstName: { th: 'วิไล', en: 'Wilai' },
  lastName:  { th: 'สุขสม', en: 'Suksoom' },
  nationalId: '1100500345678',
  company: 'C001',
  businessUnit: '10000100',
  position: 'ผู้ช่วยผู้จัดการ',
  hireDate: '2018-09-01',
  status: 'Active',
}

// helper: ตั้ง terminate flow พร้อม step 1
function setupTerminateFlow() {
  act(() => {
    const store = useLifecycleWizard.getState()
    store.setFlow('terminate')
    store.setStepData('terminate', 1, { selectedEmployee: mockActiveEmployee })
  })
}

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    useLifecycleWizard.getState().reset()
  })
})

// =========================================================
// Rendering & A11y
// =========================================================

describe('TerminateStepOkToRehire — rendering', () => {
  it('ต้อง render radio Yes และ No', () => {
    setupTerminateFlow()
    render(<TerminateStepOkToRehire />)

    // radio Yes
    const yesRadio = screen.getByRole('radio', { name: /yes/i })
    expect(yesRadio).toBeInTheDocument()

    // radio No
    const noRadio = screen.getByRole('radio', { name: /no/i })
    expect(noRadio).toBeInTheDocument()
  })

  it('ต้องมี required indicator (*) บน fieldset legend', () => {
    setupTerminateFlow()
    const { container } = render(<TerminateStepOkToRehire />)

    // required marker ใน legend หรือ container
    const hasRequired =
      container.querySelector('[aria-required="true"]') !== null ||
      container.textContent?.includes('*')
    expect(hasRequired).toBe(true)
  })

  it('legend ต้องอธิบาย "อนุญาตจ้างงานใหม่" (a11y)', () => {
    setupTerminateFlow()
    render(<TerminateStepOkToRehire />)

    expect(screen.getByText(/อนุญาตจ้างงานใหม่/i)).toBeInTheDocument()
  })

  it('ต้อง render textarea ความเห็นเพิ่มเติม (termComments)', () => {
    setupTerminateFlow()
    render(<TerminateStepOkToRehire />)

    const textarea = document.querySelector('#term-comments') as HTMLTextAreaElement
    expect(textarea).toBeTruthy()
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('ต้องแสดงชื่อพนักงาน (วิไล สุขสม EMP0005) ใน preview section', () => {
    setupTerminateFlow()
    render(<TerminateStepOkToRehire />)

    expect(screen.getByText(/วิไล/i)).toBeInTheDocument()
    expect(screen.getByText(/EMP0005/i)).toBeInTheDocument()
  })

  it('ไม่ render เมื่อ flow ไม่ใช่ terminate (guard)', () => {
    act(() => {
      useLifecycleWizard.getState().setFlow('transfer')
    })
    const { container } = render(<TerminateStepOkToRehire />)
    expect(container.firstChild).toBeNull()
  })
})

// =========================================================
// Interaction — radio Yes/No
// =========================================================

describe('TerminateStepOkToRehire — radio interaction', () => {
  it('default: radio "Yes" ถูกเลือก (store default okToRehire=true)', () => {
    setupTerminateFlow()
    render(<TerminateStepOkToRehire />)

    // store default okToRehire=true → Yes checked
    const yesRadio = screen.getByRole('radio', { name: /yes/i }) as HTMLInputElement
    const noRadio  = screen.getByRole('radio', { name: /no/i }) as HTMLInputElement
    expect(yesRadio.checked).toBe(true)
    expect(noRadio.checked).toBe(false)
  })

  it('เมื่อ click radio No → store.terminate.step3.okToRehire ต้อง false', async () => {
    setupTerminateFlow()
    const user = userEvent.setup()
    render(<TerminateStepOkToRehire />)

    const noRadio = screen.getByRole('radio', { name: /no/i })
    await user.click(noRadio)

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'terminate') {
        expect(state.active.formData.step3.okToRehire).toBe(false)
      } else {
        expect(state.active?.flow).toBe('terminate')
      }
    })
  })

  it('เมื่อ click radio Yes หลัง No → store.okToRehire ต้องกลับเป็น true', async () => {
    setupTerminateFlow()
    // ตั้ง okToRehire=false ก่อน
    act(() => {
      useLifecycleWizard.getState().setStepData('terminate', 3, { okToRehire: false, termComments: '' })
    })

    const user = userEvent.setup()
    render(<TerminateStepOkToRehire />)

    const yesRadio = screen.getByRole('radio', { name: /yes/i })
    await user.click(yesRadio)

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'terminate') {
        expect(state.active.formData.step3.okToRehire).toBe(true)
      } else {
        expect(state.active?.flow).toBe('terminate')
      }
    })
  })

  it('เมื่อ okToRehire=No → แสดง warning alert (BRD #172)', async () => {
    setupTerminateFlow()
    // ตั้ง okToRehire=false โดยตรง
    act(() => {
      useLifecycleWizard.getState().setStepData('terminate', 3, { okToRehire: false, termComments: '' })
    })

    render(<TerminateStepOkToRehire />)

    // Warning message ต้องปรากฏ — ใช้ within เพราะมี "SuccessFactors" ปรากฏใน 2 ที่
    await waitFor(() => {
      const alertEl = screen.getByRole('alert')
      expect(alertEl).toBeInTheDocument()
      // ข้อความ warning เกี่ยวกับ SuccessFactors อยู่ใน alert element
      expect(within(alertEl).getByText(/SuccessFactors/i)).toBeInTheDocument()
    })
  })
})

// =========================================================
// Interaction — termComments textarea
// =========================================================

describe('TerminateStepOkToRehire — termComments', () => {
  it('termComments เป็น optional — label ต้องมีข้อความ "ไม่บังคับ"', () => {
    setupTerminateFlow()
    render(<TerminateStepOkToRehire />)

    expect(screen.getByText(/ไม่บังคับ/i)).toBeInTheDocument()
  })

  it('กรอก termComments → store.terminate.step3.termComments ต้องอัปเดต', async () => {
    setupTerminateFlow()
    render(<TerminateStepOkToRehire />)

    const textarea = document.querySelector('#term-comments') as HTMLTextAreaElement
    expect(textarea).toBeTruthy()

    fireEvent.change(textarea, { target: { value: 'พนักงานลาออกเพื่อศึกษาต่อต่างประเทศ' } })

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'terminate') {
        expect(state.active.formData.step3.termComments).toBe('พนักงานลาออกเพื่อศึกษาต่อต่างประเทศ')
      } else {
        expect(state.active?.flow).toBe('terminate')
      }
    })
  })
})
