// Stepper.test.tsx — Unit tests สำหรับ Stepper component
// ครอบคลุม AC-3 (8 steps visible), AC-5 (locked steps disabled)

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Stepper } from '@/components/admin/wizard/Stepper'

// 8 steps ตาม spec §5.2 — ใช้เป็น test fixture
const MOCK_STEPS = [
  { number: 1, labelTh: 'ข้อมูลระบุตัวตน', labelEn: 'Identity' },
  { number: 2, labelTh: 'ชื่อ-นามสกุล',   labelEn: 'Name' },
  { number: 3, labelTh: 'ข้อมูลประวัติ',    labelEn: 'Biographical' },
  { number: 4, labelTh: 'ข้อมูลพนักงาน',   labelEn: 'Employee Info' },
  { number: 5, labelTh: 'เลขบัตรประชาชน',  labelEn: 'National ID' },
  { number: 6, labelTh: 'ข้อมูลส่วนตัว',   labelEn: 'Personal' },
  { number: 7, labelTh: 'ข้อมูลงาน',       labelEn: 'Job' },
  { number: 8, labelTh: 'ค่าตอบแทน',       labelEn: 'Compensation' },
]

describe('Stepper — AC-3: 8 steps visible', () => {
  it('ต้อง render 8 step items พร้อม Thai labels', () => {
    // AC-3: Stepper แสดง 8 ขั้นตอน ตาม spec §5.2
    render(
      <Stepper
        steps={MOCK_STEPS}
        currentStep={1}
        maxUnlockedStep={1}
        onStepClick={vi.fn()}
      />
    )

    // ตรวจสอบจำนวน step items
    const stepItems = screen.getAllByTestId('step-item')
    expect(stepItems).toHaveLength(8)

    // ตรวจสอบ Thai labels ทุกข้อ
    expect(screen.getByText('ข้อมูลระบุตัวตน')).toBeInTheDocument()
    expect(screen.getByText('ชื่อ-นามสกุล')).toBeInTheDocument()
    expect(screen.getByText('ข้อมูลประวัติ')).toBeInTheDocument()
    expect(screen.getByText('ข้อมูลพนักงาน')).toBeInTheDocument()
    expect(screen.getByText('เลขบัตรประชาชน')).toBeInTheDocument()
    expect(screen.getByText('ข้อมูลส่วนตัว')).toBeInTheDocument()
    expect(screen.getByText('ข้อมูลงาน')).toBeInTheDocument()
    expect(screen.getByText('ค่าตอบแทน')).toBeInTheDocument()
  })

  it('Step 1 ต้องมี aria-current="step" (active state)', () => {
    // AC-3: Step ที่ active ต้องมี aria-current="step"
    render(
      <Stepper
        steps={MOCK_STEPS}
        currentStep={1}
        maxUnlockedStep={1}
        onStepClick={vi.fn()}
      />
    )

    // หา button ของ Step 1 — ต้องมี aria-current="step"
    const activeButton = screen.getByRole('button', { name: /ข้อมูลระบุตัวตน/i })
    expect(activeButton).toHaveAttribute('aria-current', 'step')
  })
})

describe('Stepper — AC-5: locked steps disabled', () => {
  it('Steps 2-8 ต้องมี aria-disabled="true" เมื่อ maxUnlockedStep=1', () => {
    // AC-5: Steps ที่ยังล็อคต้องไม่ clickable
    render(
      <Stepper
        steps={MOCK_STEPS}
        currentStep={1}
        maxUnlockedStep={1}
        onStepClick={vi.fn()}
      />
    )

    // ตรวจสอบ Steps 2-8 ว่ามี aria-disabled="true"
    const lockedLabels = [
      'ชื่อ-นามสกุล',
      'ข้อมูลประวัติ',
      'ข้อมูลพนักงาน',
      'เลขบัตรประชาชน',
      'ข้อมูลส่วนตัว',
      'ข้อมูลงาน',
      'ค่าตอบแทน',
    ]

    for (const label of lockedLabels) {
      const btn = screen.getByRole('button', { name: new RegExp(label) })
      expect(btn).toHaveAttribute('aria-disabled', 'true')
      expect(btn).toBeDisabled()
    }
  })

  it('คลิก locked step ต้องไม่ fire onStepClick callback', async () => {
    // AC-5: disabled step ต้องเป็น noop — onStepClick ต้องไม่ถูกเรียก
    const user = userEvent.setup()
    const mockClick = vi.fn()

    render(
      <Stepper
        steps={MOCK_STEPS}
        currentStep={1}
        maxUnlockedStep={1}
        onStepClick={mockClick}
      />
    )

    // พยายามคลิก Step 2 (locked)
    const step2Button = screen.getByRole('button', { name: /ชื่อ-นามสกุล/i })
    // userEvent จะ skip click บน disabled button โดยอัตโนมัติ
    await user.click(step2Button)

    // onStepClick ต้องไม่ถูกเรียก
    expect(mockClick).not.toHaveBeenCalled()
  })
})
