// TransferSteps.test.tsx — Unit tests สำหรับ Wave 3 Transfer step components
// ครอบคลุม: TransferStepNewAssignment, TransferStepLocation, TransferStepReview
// Part B Wave 4 — [part-b-wave4-tests]

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import type { MockEmployee } from '@/lib/admin/store/useLifecycleWizard'
import TransferStepNewAssignment from '@/app/admin/transfer/steps/TransferStepNewAssignment'
import TransferStepLocation from '@/app/admin/transfer/steps/TransferStepLocation'
import TransferStepReview from '@/app/admin/transfer/steps/TransferStepReview'

// mock seed loaders เพื่อให้ dropdown พร้อมทันทีใน jsdom (ไม่ต้องรอ useEffect async)
vi.mock('@/lib/admin/store/loadBusinessUnits', () => ({
  loadBusinessUnits: () => [
    { code: 'BU001', labelTh: 'ธุรกิจค้าปลีก', labelEn: 'Retail Business' },
    { code: 'BU002', labelTh: 'ธุรกิจห้างสรรพสินค้า', labelEn: 'Department Store' },
  ],
}))

vi.mock('@/lib/admin/store/loadCompanies', () => ({
  loadCompanies: () => [
    { code: 'CDS', labelTh: 'เซ็นทรัล ดีพาร์ทเมนท์สโตร์', labelEn: 'Central Department Store', country: 'THA' },
    { code: 'CEN', labelTh: 'กลุ่มเซ็นทรัล', labelEn: 'Central Group', country: 'THA' },
  ],
}))

// Employee fixture สำหรับ transfer flow (Active only)
const mockActiveEmployee: MockEmployee = {
  externalCode: 'EMP0001',
  firstName: { th: 'สมชาย', en: 'Somchai' },
  lastName:  { th: 'มานะดี', en: 'Manadee' },
  nationalId: '1100100123456',
  company: 'C001',
  businessUnit: '10000000',
  position: 'พนักงานขาย',
  hireDate: '2020-03-01',
  status: 'Active',
}

// helper: ตั้ง transfer flow พร้อม step 1
function setupTransferFlow(transferReason?: 'TRN_ROTATION' | 'TRN_TRNACCOMP' | 'TRN_TRNWIC') {
  act(() => {
    const store = useLifecycleWizard.getState()
    store.setFlow('transfer')
    store.setStepData('transfer', 1, { selectedEmployee: mockActiveEmployee })
    if (transferReason) {
      store.setStepData('transfer', 2, { transferReason })
    }
  })
}

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    useLifecycleWizard.getState().reset()
  })
})

// =========================================================
// TransferStepNewAssignment — Step 4
// =========================================================

describe('TransferStepNewAssignment', () => {
  it('ต้องซ่อน newCompany field เมื่อ flow ไม่ใช่ TRN_TRNACCOMP (conditional render)', () => {
    // ตั้ง flow เป็น TRN_ROTATION → ไม่ต้องแสดง newCompany
    setupTransferFlow('TRN_ROTATION')
    render(<TransferStepNewAssignment />)

    // ต้องไม่เห็น "บริษัทปลายทาง"
    expect(screen.queryByText(/บริษัทปลายทาง/i)).not.toBeInTheDocument()
    expect(document.querySelector('#transfer-new-company')).toBeNull()
  })

  it('ต้องแสดง newCompany field เมื่อ transferReason=TRN_TRNACCOMP', async () => {
    setupTransferFlow('TRN_TRNACCOMP')
    render(<TransferStepNewAssignment />)

    // รอ useEffect flush (loadCompanies เรียกใน useEffect)
    await act(async () => {})

    // ต้องเห็น dropdown บริษัทปลายทาง (getAllByText เพราะ label + option text ต่างก็มีคำนี้)
    const companySelect = document.querySelector('#transfer-new-company')
    expect(companySelect).toBeTruthy()
    expect(screen.getAllByText(/บริษัทปลายทาง/i)[0]).toBeInTheDocument()
  })

  it('businessUnit dropdown ต้องมี options จาก loadBusinessUnits mock', async () => {
    setupTransferFlow('TRN_TRNWIC')
    render(<TransferStepNewAssignment />)

    await act(async () => {})

    const buSelect = document.querySelector('#transfer-new-bu') as HTMLSelectElement
    expect(buSelect).toBeTruthy()

    // ต้องมีอย่างน้อย 1 option ที่ไม่ใช่ placeholder
    const nonEmptyOptions = Array.from(buSelect.options).filter((o) => o.value !== '')
    expect(nonEmptyOptions.length).toBeGreaterThan(0)
  })

  it('ต้อง render position input สำหรับกรอกตำแหน่งใหม่', () => {
    setupTransferFlow('TRN_ROTATION')
    render(<TransferStepNewAssignment />)

    const posInput = document.querySelector('#transfer-new-position')
    expect(posInput).toBeTruthy()
    expect(posInput?.getAttribute('type')).toBe('text')
  })

  it('ไม่ render เมื่อ flow ไม่ใช่ transfer (guard)', () => {
    act(() => {
      useLifecycleWizard.getState().setFlow('rehire')
    })
    const { container } = render(<TransferStepNewAssignment />)
    expect(container.firstChild).toBeNull()
  })
})

// =========================================================
// TransferStepLocation — Step 5
// =========================================================

describe('TransferStepLocation', () => {
  it('ต้อง render carry-over checkbox ที่มีค่า default=true', () => {
    setupTransferFlow()
    render(<TransferStepLocation />)

    const carryCheckbox = document.querySelector('#transfer-carry-over') as HTMLInputElement
    expect(carryCheckbox).toBeTruthy()
    // default state จาก store: carryOverCompensation=true
    expect(carryCheckbox.checked).toBe(true)
  })

  it('เมื่อ carryOver=true → salary input ต้องซ่อน (conditional render)', () => {
    setupTransferFlow()
    render(<TransferStepLocation />)

    // default carryOver=true → salary input ไม่ควรปรากฏ
    const salaryInput = document.querySelector('#transfer-new-salary')
    expect(salaryInput).toBeNull()
  })

  it('เมื่อ uncheck carry-over → salary input ต้องปรากฏ (optional)', async () => {
    setupTransferFlow()
    const user = userEvent.setup()
    render(<TransferStepLocation />)

    const carryCheckbox = document.querySelector('#transfer-carry-over') as HTMLInputElement
    await user.click(carryCheckbox)

    // หลัง uncheck → salary input ต้องแสดง
    await waitFor(() => {
      const salaryInput = document.querySelector('#transfer-new-salary')
      expect(salaryInput).toBeTruthy()
    })
  })

  it('เมื่อ uncheck carry-over → store.transfer.step5.carryOverCompensation ต้อง false', async () => {
    setupTransferFlow()
    const user = userEvent.setup()
    render(<TransferStepLocation />)

    const carryCheckbox = document.querySelector('#transfer-carry-over') as HTMLInputElement
    await user.click(carryCheckbox)

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'transfer') {
        expect(state.active.formData.step5.carryOverCompensation).toBe(false)
      } else {
        expect(state.active?.flow).toBe('transfer')
      }
    })
  })

  it('salary field เป็น optional — label ต้องมีข้อความ "ไม่บังคับ"', async () => {
    setupTransferFlow()
    const user = userEvent.setup()
    render(<TransferStepLocation />)

    // uncheck ก่อนเพื่อให้เห็น salary field
    const carryCheckbox = document.querySelector('#transfer-carry-over') as HTMLInputElement
    await user.click(carryCheckbox)

    await waitFor(() => {
      // label ต้องมี "ไม่บังคับ" หรือ optional indicator
      const optionalText = screen.queryByText(/ไม่บังคับ/i)
      expect(optionalText).toBeInTheDocument()
    })
  })
})

// =========================================================
// TransferStepReview — Step 6
// =========================================================

describe('TransferStepReview', () => {
  // helper: ตั้ง transfer flow ครบทุก step ก่อน render Review
  function setupReviewStep() {
    act(() => {
      const store = useLifecycleWizard.getState()
      store.setFlow('transfer')
      store.setStepData('transfer', 1, { selectedEmployee: mockActiveEmployee })
      store.setStepData('transfer', 2, { transferReason: 'TRN_ROTATION' })
      store.setStepData('transfer', 3, { effectiveDate: '2026-07-01' })
      store.setStepData('transfer', 4, {
        newCompany: null,
        businessUnit: 'BU001',
        position: 'ผู้จัดการสาขา',
      })
      store.setStepData('transfer', 5, {
        carryOverCompensation: true,
        newBaseSalary: null,
      })
    })
  }

  it('ต้อง render summary section ที่มีข้อมูลพนักงาน', () => {
    setupReviewStep()
    render(<TransferStepReview />)

    // ต้องแสดงชื่อพนักงาน
    expect(screen.getByText(/สมชาย/i)).toBeInTheDocument()
    expect(screen.getByText(/EMP0001/i)).toBeInTheDocument()
  })

  it('ต้อง render ข้อมูล transferReason จาก store', () => {
    setupReviewStep()
    render(<TransferStepReview />)

    // TRN_ROTATION ต้องแสดงเป็น label
    expect(screen.getByText(/TRN_ROTATION/i)).toBeInTheDocument()
  })

  it('ต้อง render Submit button', () => {
    setupReviewStep()
    render(<TransferStepReview />)

    const submitBtn = screen.getByRole('button', { name: /ยืนยัน|submit/i })
    expect(submitBtn).toBeInTheDocument()
  })

  it('คลิก Submit → handleSubmit ถูกเรียก (store.reset triggered)', async () => {
    setupReviewStep()
    const user = userEvent.setup()

    // mock window.alert เพื่อป้องกัน jsdom error
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<TransferStepReview />)

    const submitBtn = screen.getByRole('button', { name: /ยืนยัน|submit/i })
    await user.click(submitBtn)

    // หลัง submit → alert ถูกเรียก + store ถูก reset
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalled()
      // store.active ต้อง null หลัง reset
      expect(useLifecycleWizard.getState().active).toBeNull()
    })

    alertSpy.mockRestore()
  })

  it('ไม่ render เมื่อ flow ไม่ใช่ transfer (guard)', () => {
    act(() => {
      useLifecycleWizard.getState().setFlow('terminate')
    })
    const { container } = render(<TransferStepReview />)
    expect(container.firstChild).toBeNull()
  })
})
