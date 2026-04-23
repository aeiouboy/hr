// createClusterWizard.test.ts
//
// AC-1: Factory accepts employeeId + preloadedEmployee (optional); covers both
//       "with context" (Archetype B) and "without context" (Archetype A / Hire).
//
// Traceability: specs/hr-phase-1-d1-foundation.md §AC-1

import { describe, it, expect, beforeEach } from 'vitest'
import { createClusterWizard } from '../createClusterWizard'
import type {
  ClusterStep,
  EmployeeActionEnvelope,
} from '../createClusterWizard'

// ─── Shared fixtures ───────────────────────────────────────────────────────

const STEPS: ClusterStep[] = [
  { number: 1, labelTh: 'ขั้นตอน 1', labelEn: 'Step 1' },
  { number: 2, labelTh: 'ขั้นตอน 2', labelEn: 'Step 2' },
]

interface SimpleForm {
  field_a: string
  field_b: string
}

const INITIAL_FORM: SimpleForm = {
  field_a: '',
  field_b: '',
}

const VALIDATORS = {
  1: (d: SimpleForm) => d.field_a.length > 0,
  2: (d: SimpleForm) => d.field_b.length > 0,
}

// ─── Archetype A — Hire (no employee context) ──────────────────────────────

describe('createClusterWizard — Archetype A (no employeeId)', () => {
  // AC-1: Factory works without employeeId — Hire backwards-compat
  it('AC-1: creates store without breaking when no employeeId provided', () => {
    const { useStore, readOnlyKeys, buildSubmitPayload } = createClusterWizard({
      name: 'hire',
      storeKey: 'hire-wizard-test',
      initialFormData: INITIAL_FORM,
      clusterSteps: STEPS,
      validators: VALIDATORS,
    })
    expect(useStore).toBeDefined()
    expect(typeof useStore).toBe('function')
    // AC-1: readOnlyKeys is empty set (no preloaded)
    expect(readOnlyKeys.size).toBe(0)
    // AC-1: buildSubmitPayload returns flat formData (no envelope)
    const payload = buildSubmitPayload({ field_a: 'hello', field_b: 'world' })
    expect(payload).toEqual({ field_a: 'hello', field_b: 'world' })
    // Confirm it does NOT have employee_id key (not an envelope)
    expect('employee_id' in payload).toBe(false)
  })

  // AC-1: initialFormData is used as-is when no preloadedEmployee
  it('AC-1: store initialises formData from initialFormData verbatim', () => {
    const { useStore } = createClusterWizard({
      name: 'hire',
      storeKey: 'hire-wizard-init-test',
      initialFormData: { field_a: 'default_a', field_b: 'default_b' },
      clusterSteps: STEPS,
      validators: VALIDATORS,
    })
    const state = useStore.getState()
    expect(state.formData.field_a).toBe('default_a')
    expect(state.formData.field_b).toBe('default_b')
  })

  // AC-1: navigation still works (goNext/goBack/jumpTo) — regression guard
  it('AC-1: navigation works correctly in Archetype A mode', () => {
    const { useStore } = createClusterWizard({
      name: 'hire',
      storeKey: 'hire-nav-test',
      initialFormData: INITIAL_FORM,
      clusterSteps: STEPS,
      validators: VALIDATORS,
    })
    const state = useStore.getState()
    expect(state.currentStep).toBe(1)

    // goNext should not advance if step 1 invalid (field_a empty)
    state.goNext()
    expect(useStore.getState().currentStep).toBe(1)

    // set valid data for step 1
    useStore.getState().setStepData('field_a', 'x' as unknown as Partial<string>)
    // After setting field_a, step 1 validator: d.field_a.length > 0 → true
    // Note: setStepData merges into slice; field_a is string not nested object.
    // Test the isStepValid helper directly instead.
    useStore.setState({ formData: { field_a: 'x', field_b: '' } })
    useStore.getState().goNext()
    expect(useStore.getState().currentStep).toBe(2)

    // goBack from step 2
    useStore.getState().goBack()
    expect(useStore.getState().currentStep).toBe(1)
  })

  // AC-1: reset returns to mergedInitialFormData (same as initialFormData for Archetype A)
  it('AC-1: reset returns store to initial state', () => {
    const { useStore } = createClusterWizard({
      name: 'hire',
      storeKey: 'hire-reset-test',
      initialFormData: INITIAL_FORM,
      clusterSteps: STEPS,
      validators: VALIDATORS,
    })
    useStore.setState({ formData: { field_a: 'changed', field_b: 'changed' }, currentStep: 2 })
    useStore.getState().reset()
    const state = useStore.getState()
    expect(state.formData).toEqual(INITIAL_FORM)
    expect(state.currentStep).toBe(1)
    expect(state.maxUnlockedStep).toBe(1)
  })
})

// ─── Archetype B — with employee context ──────────────────────────────────

describe('createClusterWizard — Archetype B (with employeeId + preloadedEmployee)', () => {
  const EMPLOYEE_ID = 'emp-001'
  const PRELOADED = {
    first_name: 'สมชาย',
    employee_class: 'A',
  } as const

  // AC-1: preloadedEmployee fields merged into initialFormData (preloaded wins)
  it('AC-1: formData initialises with preloaded fields merged in (preloaded wins on overlap)', () => {
    const { useStore } = createClusterWizard<SimpleForm & { first_name?: string; employee_class?: string }>({
      name: 'probation',
      storeKey: 'probation-merge-test',
      initialFormData: { ...INITIAL_FORM, first_name: 'ชื่อเดิม', employee_class: 'E' },
      clusterSteps: STEPS,
      validators: VALIDATORS,
      employeeId: EMPLOYEE_ID,
      preloadedEmployee: PRELOADED,
    })
    const { formData } = useStore.getState()
    // AC-1: preloaded value wins over initialFormData
    expect(formData.first_name).toBe('สมชาย')
    expect(formData.employee_class).toBe('A')
  })

  // AC-1: readOnlyKeys populated from preloadedEmployee keys
  it('AC-1: readOnlyKeys contains all keys from preloadedEmployee', () => {
    const { readOnlyKeys } = createClusterWizard<SimpleForm & { first_name?: string; employee_class?: string }>({
      name: 'probation',
      storeKey: 'probation-readonly-test',
      initialFormData: INITIAL_FORM,
      clusterSteps: STEPS,
      validators: VALIDATORS,
      employeeId: EMPLOYEE_ID,
      preloadedEmployee: PRELOADED,
    })
    // AC-1: readOnlyKeys = Set { 'first_name', 'employee_class' }
    expect(readOnlyKeys.has('first_name')).toBe(true)
    expect(readOnlyKeys.has('employee_class')).toBe(true)
    expect(readOnlyKeys.size).toBe(2)
  })

  // AC-1: buildSubmitPayload emits { employee_id, action, payload } envelope
  it('AC-1: buildSubmitPayload emits { employee_id, action, payload } when employeeId present', () => {
    const { buildSubmitPayload } = createClusterWizard<SimpleForm & { first_name?: string; employee_class?: string }>({
      name: 'probation',
      storeKey: 'probation-submit-test',
      initialFormData: INITIAL_FORM,
      clusterSteps: STEPS,
      validators: VALIDATORS,
      employeeId: EMPLOYEE_ID,
      preloadedEmployee: PRELOADED,
    })
    const formData: SimpleForm = { field_a: 'pass', field_b: 'yes' }
    const result = buildSubmitPayload(formData) as EmployeeActionEnvelope<SimpleForm>

    // AC-1: envelope shape correct
    expect(result.employee_id).toBe(EMPLOYEE_ID)
    expect(result.action).toBe('probation')
    expect(result.payload).toEqual(formData)
  })

  // AC-1: reset in Archetype B returns to mergedInitialFormData (includes preloaded)
  it('AC-1: reset restores to merged initial state (preloaded fields preserved)', () => {
    const { useStore } = createClusterWizard<SimpleForm & { first_name?: string }>({
      name: 'probation',
      storeKey: 'probation-reset-b-test',
      initialFormData: { ...INITIAL_FORM, first_name: '' },
      clusterSteps: STEPS,
      validators: VALIDATORS,
      employeeId: EMPLOYEE_ID,
      preloadedEmployee: { first_name: 'สมชาย' },
    })
    // Mutate then reset
    useStore.setState({ formData: { field_a: 'x', field_b: 'y', first_name: 'แก้ไข' }, currentStep: 2 })
    useStore.getState().reset()
    const { formData, currentStep } = useStore.getState()
    // Preloaded value restored (not raw initialFormData)
    expect(formData.first_name).toBe('สมชาย')
    expect(formData.field_a).toBe('')
    expect(currentStep).toBe(1)
  })

  // AC-1: readOnlyKeys is empty when preloadedEmployee not provided (even with employeeId)
  it('AC-1: readOnlyKeys is empty when employeeId provided but preloadedEmployee omitted', () => {
    const { readOnlyKeys } = createClusterWizard({
      name: 'terminate',
      storeKey: 'terminate-no-preload-test',
      initialFormData: INITIAL_FORM,
      clusterSteps: STEPS,
      validators: VALIDATORS,
      employeeId: EMPLOYEE_ID,
      // no preloadedEmployee
    })
    expect(readOnlyKeys.size).toBe(0)
  })
})

// ─── Return shape guard ────────────────────────────────────────────────────

describe('createClusterWizard — return shape', () => {
  // AC-1: Factory always returns { useStore, readOnlyKeys, buildSubmitPayload }
  it('AC-1: always returns object with useStore, readOnlyKeys, buildSubmitPayload', () => {
    const result = createClusterWizard({
      name: 'test',
      storeKey: 'test-shape',
      initialFormData: INITIAL_FORM,
      clusterSteps: STEPS,
      validators: VALIDATORS,
    })
    expect(result).toHaveProperty('useStore')
    expect(result).toHaveProperty('readOnlyKeys')
    expect(result).toHaveProperty('buildSubmitPayload')
    expect(typeof result.buildSubmitPayload).toBe('function')
    expect(result.readOnlyKeys).toBeInstanceOf(Set)
  })
})
