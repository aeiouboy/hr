// useLifecycleWizard.test.ts — Unit tests สำหรับ Zustand discriminated union store
// ครอบคลุม: initial state, setFlow, setStepData, goNext gating, goBack, reset
// Part B Wave 1 — [part-b-wave1-tests]

import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useLifecycleWizard } from '@/lib/admin/store/useLifecycleWizard'
import type { MockEmployee } from '@/lib/admin/store/useLifecycleWizard'

// employee fixture สำหรับใช้ใน test (Active)
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

// employee fixture สำหรับ Terminated + okToRehire=true (LT1)
const mockTerminatedLT1Employee: MockEmployee = {
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

// helper: reset store ก่อนทุก test เพื่อ isolation
beforeEach(() => {
  act(() => {
    useLifecycleWizard.getState().reset()
  })
})

// =========================================================
// Initial State
// =========================================================

describe('useLifecycleWizard — initial state', () => {
  it('ต้องเริ่มต้นด้วย active=null, currentStep=1, maxUnlockedStep=1', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    expect(result.current.active).toBeNull()
    expect(result.current.currentStep).toBe(1)
    expect(result.current.maxUnlockedStep).toBe(1)
  })
})

// =========================================================
// setFlow
// =========================================================

describe('useLifecycleWizard — setFlow', () => {
  it('setFlow("rehire") ต้อง set active.flow="rehire" และ reset currentStep=1', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('rehire')
    })

    expect(result.current.active?.flow).toBe('rehire')
    expect(result.current.currentStep).toBe(1)
    expect(result.current.maxUnlockedStep).toBe(1)
  })

  it('setFlow("transfer") ต้อง set active.flow="transfer" และ maxStep=6', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('transfer')
    })

    expect(result.current.active?.flow).toBe('transfer')
    // maxStep ของ transfer = 6
    if (result.current.active?.flow === 'transfer') {
      expect(result.current.active.maxStep).toBe(6)
    }
  })

  it('setFlow("terminate") ต้อง set active.flow="terminate" และ maxStep=5', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('terminate')
    })

    expect(result.current.active?.flow).toBe('terminate')
    if (result.current.active?.flow === 'terminate') {
      expect(result.current.active.maxStep).toBe(5)
    }
  })

  it('เปลี่ยน flow จาก rehire → transfer ต้อง reset formData และ step', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    // ตั้ง flow rehire ก่อน
    act(() => {
      result.current.setFlow('rehire')
    })

    // เปลี่ยนเป็น transfer
    act(() => {
      result.current.setFlow('transfer')
    })

    expect(result.current.active?.flow).toBe('transfer')
    expect(result.current.currentStep).toBe(1)
    // selectedEmployee ต้องถูก reset
    if (result.current.active?.flow === 'transfer') {
      expect(result.current.active.formData.step1.selectedEmployee).toBeNull()
    }
  })
})

// =========================================================
// setStepData — discriminated union ตรวจ flow
// =========================================================

describe('useLifecycleWizard — setStepData', () => {
  it('setStepData("rehire", 1, patch) บน flow="rehire" ต้อง update formData.step1', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('rehire')
    })

    act(() => {
      result.current.setStepData('rehire', 1, {
        selectedEmployee: mockTerminatedLT1Employee,
        eventReason: 'RE_REHIRE_LT1',
      })
    })

    if (result.current.active?.flow === 'rehire') {
      expect(result.current.active.formData.step1.selectedEmployee?.externalCode).toBe('EMP0016')
      expect(result.current.active.formData.step1.eventReason).toBe('RE_REHIRE_LT1')
    } else {
      // flow ต้องเป็น rehire — fail ถ้าไม่ใช่
      expect(result.current.active?.flow).toBe('rehire')
    }
  })

  it('setStepData("transfer", ...) บน flow="rehire" ต้อง ignore และ warn (flow mismatch)', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('rehire')
    })

    // เรียก setStepData ด้วย flow ที่ไม่ตรง — ต้อง no-op
    act(() => {
      // @ts-expect-error — ตั้งใจ test flow mismatch
      result.current.setStepData('transfer', 1, { selectedEmployee: mockActiveEmployee })
    })

    // active.flow ยังต้องเป็น rehire ไม่เปลี่ยน
    expect(result.current.active?.flow).toBe('rehire')
    // formData.step1.selectedEmployee ต้องยังเป็น null (ไม่ถูก override)
    if (result.current.active?.flow === 'rehire') {
      expect(result.current.active.formData.step1.selectedEmployee).toBeNull()
    }
  })
})

// =========================================================
// goNext — blocked ถ้า step ไม่ valid
// =========================================================

describe('useLifecycleWizard — goNext gating', () => {
  it('goNext() ขณะ step ไม่ valid ต้องไม่เปลี่ยน currentStep', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('rehire')
      // ไม่ set ข้อมูลใดๆ — step 1 ยังไม่ valid
      result.current.goNext()
    })

    expect(result.current.currentStep).toBe(1)
  })

  it('goNext() บน flow terminate step 1 valid → ไปยัง step 2', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('terminate')
    })

    act(() => {
      result.current.setStepData('terminate', 1, { selectedEmployee: mockActiveEmployee })
    })

    act(() => {
      result.current.goNext()
    })

    expect(result.current.currentStep).toBe(2)
    expect(result.current.maxUnlockedStep).toBe(2)
  })
})

// =========================================================
// goBack
// =========================================================

describe('useLifecycleWizard — goBack', () => {
  it('goBack() จาก step 2 ต้องลด currentStep เป็น 1', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('terminate')
      result.current.setStepData('terminate', 1, { selectedEmployee: mockActiveEmployee })
      result.current.goNext() // ไป step 2
    })

    expect(result.current.currentStep).toBe(2)

    act(() => {
      result.current.goBack()
    })

    expect(result.current.currentStep).toBe(1)
  })

  it('goBack() จาก step 1 ต้องไม่ลดต่ำกว่า 1 (min boundary)', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('rehire')
      result.current.goBack() // พยายาม back จาก step 1
    })

    expect(result.current.currentStep).toBe(1)
  })
})

// =========================================================
// reset
// =========================================================

describe('useLifecycleWizard — reset', () => {
  it('reset() ต้อง clear active, currentStep=1, maxUnlockedStep=1', () => {
    const { result } = renderHook(() => useLifecycleWizard())

    act(() => {
      result.current.setFlow('rehire')
      result.current.setStepData('rehire', 1, {
        selectedEmployee: mockTerminatedLT1Employee,
        eventReason: 'RE_REHIRE_LT1',
      })
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.active).toBeNull()
    expect(result.current.currentStep).toBe(1)
    expect(result.current.maxUnlockedStep).toBe(1)
  })
})
