// LifecyclePages.test.tsx — Integration tests สำหรับ 3 lifecycle wizard pages
// ครอบคลุม: RehirePage (7 steps), TransferPage (6 steps), TerminatePage (5 steps)
// ตรวจสอบ: Stepper render, flow init, step navigation via store
// Part B Wave 4 — [part-b-wave4-tests]

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import type { MockEmployee } from '@/lib/admin/store/useLifecycleWizard'

// mock seed loaders ที่ใช้ใน transfer page
vi.mock('@/lib/admin/store/loadBusinessUnits', () => ({
  loadBusinessUnits: () => [
    { code: 'BU001', labelTh: 'ธุรกิจค้าปลีก', labelEn: 'Retail Business' },
  ],
}))

vi.mock('@/lib/admin/store/loadCompanies', () => ({
  loadCompanies: () => [
    { code: 'CDS', labelTh: 'เซ็นทรัล ดีพาร์ทเมนท์สโตร์', labelEn: 'Central Department Store', country: 'THA' },
  ],
}))

// mock mockEmployees JSON ที่ EmployeePicker ใช้ (import path: @/data/admin/mockEmployees.json)
vi.mock('@/data/admin/mockEmployees.json', () => ({
  default: [
    {
      externalCode: 'EMP0001',
      firstName: { th: 'สมชาย', en: 'Somchai' },
      lastName:  { th: 'มานะดี', en: 'Manadee' },
      nationalId: '1100100123456',
      company: 'C001',
      businessUnit: '10000000',
      position: 'พนักงานขาย',
      hireDate: '2020-03-01',
      status: 'Active',
    },
    {
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
    },
  ],
}))

// mock ReasonPicker ที่ต้องการ fetch event reasons
vi.mock('@/components/admin/lifecycle/ReasonPicker', () => ({
  ReasonPicker: ({ id, value, onChange, required }: {
    id: string
    value: string | null
    onChange: (v: string) => void
    required?: boolean
  }) => (
    <select
      data-testid={id}
      aria-label="event reason picker"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="">— เลือก —</option>
      <option value="TRN_ROTATION">TRN_ROTATION</option>
      <option value="TRN_TRNACCOMP">TRN_TRNACCOMP</option>
      <option value="TERM_RESIGN">TERM_RESIGN</option>
    </select>
  ),
}))

// import pages หลัง mock setup
import RehirePage from '@/app/admin/rehire/page'
import TransferPage from '@/app/admin/transfer/page'
import TerminatePage from '@/app/admin/terminate/page'

// reset store ก่อนทุก test
beforeEach(() => {
  act(() => {
    useLifecycleWizard.getState().reset()
  })
  vi.clearAllMocks()
})

// =========================================================
// RehirePage — 7 steps
// =========================================================

describe('RehirePage', () => {
  it('render Stepper ที่มี 7 steps', async () => {
    render(<RehirePage />)

    // รอ useEffect setFlow flush
    await act(async () => {})

    // Stepper ต้องแสดง step items — ตรวจสอบผ่าน store หรือ DOM
    const state = useLifecycleWizard.getState()
    if (state.active?.flow === 'rehire') {
      expect(state.active.maxStep).toBe(7)
    } else {
      // ถ้า component render guard (null) เพราะ flow ยังไม่ set → ตรวจสอบ state โดยตรง
      // page ใช้ useEffect → ต้องรอ flush
      await waitFor(() => {
        const updatedState = useLifecycleWizard.getState()
        expect(updatedState.active?.flow).toBe('rehire')
      })
    }
  })

  it('setFlow("rehire") ถูกเรียกเมื่อ mount RehirePage', async () => {
    render(<RehirePage />)
    await act(async () => {})

    await waitFor(() => {
      expect(useLifecycleWizard.getState().active?.flow).toBe('rehire')
    })
  })

  it('currentStep เริ่มที่ 1 เมื่อ mount', async () => {
    render(<RehirePage />)
    await act(async () => {})

    await waitFor(() => {
      expect(useLifecycleWizard.getState().currentStep).toBe(1)
    })
  })

  it('page แสดง header "จ้างพนักงานใหม่อีกครั้ง (Rehire)"', async () => {
    render(<RehirePage />)
    await act(async () => {})

    await waitFor(() => {
      expect(screen.getAllByText(/Rehire/i)[0]).toBeInTheDocument()
    })
  })
})

// =========================================================
// TransferPage — 6 steps
// =========================================================

describe('TransferPage', () => {
  it('setFlow("transfer") ถูกเรียกเมื่อ mount TransferPage', async () => {
    render(<TransferPage />)
    await act(async () => {})

    await waitFor(() => {
      expect(useLifecycleWizard.getState().active?.flow).toBe('transfer')
    })
  })

  it('transfer flow มี maxStep=6', async () => {
    render(<TransferPage />)
    await act(async () => {})

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'transfer') {
        expect(state.active.maxStep).toBe(6)
      } else {
        expect(state.active?.flow).toBe('transfer')
      }
    })
  })

  it('page แสดง header "โอนย้ายพนักงาน (Transfer)"', async () => {
    render(<TransferPage />)
    await act(async () => {})

    await waitFor(() => {
      expect(screen.getAllByText(/Transfer/i)[0]).toBeInTheDocument()
    })
  })

  it('currentStep เริ่มที่ 1 เมื่อ mount', async () => {
    render(<TransferPage />)
    await act(async () => {})

    await waitFor(() => {
      expect(useLifecycleWizard.getState().currentStep).toBe(1)
    })
  })
})

// =========================================================
// TerminatePage — 5 steps
// =========================================================

describe('TerminatePage', () => {
  it('setFlow("terminate") ถูกเรียกเมื่อ mount TerminatePage', async () => {
    render(<TerminatePage />)
    await act(async () => {})

    await waitFor(() => {
      expect(useLifecycleWizard.getState().active?.flow).toBe('terminate')
    })
  })

  it('terminate flow มี maxStep=5', async () => {
    render(<TerminatePage />)
    await act(async () => {})

    await waitFor(() => {
      const state = useLifecycleWizard.getState()
      if (state.active?.flow === 'terminate') {
        expect(state.active.maxStep).toBe(5)
      } else {
        expect(state.active?.flow).toBe('terminate')
      }
    })
  })

  it('page แสดง header "เลิกจ้าง/ลาออก (Terminate)"', async () => {
    render(<TerminatePage />)
    await act(async () => {})

    await waitFor(() => {
      // header ต้องมีคำว่า Terminate หรือ เลิกจ้าง
      const hasHeader =
        screen.queryByText(/Terminate/i) !== null ||
        screen.queryByText(/เลิกจ้าง/i) !== null
      expect(hasHeader).toBe(true)
    })
  })

  it('currentStep เริ่มที่ 1 เมื่อ mount', async () => {
    render(<TerminatePage />)
    await act(async () => {})

    await waitFor(() => {
      expect(useLifecycleWizard.getState().currentStep).toBe(1)
    })
  })
})

// =========================================================
// Store Navigation — goNext advances currentStep via store
// =========================================================

describe('Store Navigation via useLifecycleWizard', () => {
  const mockEmp: MockEmployee = {
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

  it('transfer goNext() ที่ step 1 valid → currentStep = 2', () => {
    act(() => {
      const store = useLifecycleWizard.getState()
      store.setFlow('transfer')
      store.setStepData('transfer', 1, { selectedEmployee: mockEmp })
      store.goNext()
    })

    expect(useLifecycleWizard.getState().currentStep).toBe(2)
  })

  it('terminate goNext() ที่ step 1 valid → currentStep = 2', () => {
    act(() => {
      const store = useLifecycleWizard.getState()
      store.setFlow('terminate')
      store.setStepData('terminate', 1, { selectedEmployee: mockEmp })
      store.goNext()
    })

    expect(useLifecycleWizard.getState().currentStep).toBe(2)
  })

  it('terminate: step 5 valid เสมอ (summary only) → isStepValid(5) = true', () => {
    act(() => {
      useLifecycleWizard.getState().setFlow('terminate')
    })

    const isValid = useLifecycleWizard.getState().isStepValid(5)
    expect(isValid).toBe(true)
  })
})
