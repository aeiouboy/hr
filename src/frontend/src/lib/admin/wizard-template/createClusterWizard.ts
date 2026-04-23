// createClusterWizard.ts — Cluster Wizard factory
//
// Extracts the Hire Option-1 Zustand+persist+shell pattern into a reusable
// factory so every new lifecycle flow (Probation, EmpData, Rehire, Transfer,
// Terminate) can be scaffolded in <30 minutes without copy-paste.
//
// Design decisions:
//   - Config-object signature (composition-patterns: architecture-avoid-boolean-props).
//     Pass `{ name, storeKey, initialFormData, clusterSteps, validators }` — NOT
//     boolean flags like `hasPersist: true, hasAutoSave: true`.
//   - Factory returns { useStore, Shell, Page } — caller owns rendering, not factory.
//   - Factory is <250 lines (Rule C3 Simplicity). No plugin hooks, no middleware chains.
//   - Persist middleware wired inline with createJSONStorage (same as useHireWizard).
//   - `sliceValid` map is optional — used by Review summary to surface per-slice status.
//
// Sources:
//   - Reference: src/lib/admin/store/useHireWizard.ts (Hire Option-1 pattern)
//   - Spec: specs/phase0-foundation-progressive-plan.md §Task 4 (F4 Cluster Template)
//   - Skill: .skills/composition-patterns/SKILL.md (architecture-avoid-boolean-props)

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ─── Public types ──────────────────────────────────────────────────────────

/** One step entry shown in the left rail + mobile progress bar. */
export interface ClusterStep {
  number: number
  labelTh: string
  labelEn: string
  descTh?: string
}

/**
 * Config object for createClusterWizard.
 *
 * @template TFormData Shape of the form's persisted data object.
 */
export interface ClusterWizardConfig<TFormData extends object> {
  /** Flow name used in log messages (e.g. "probation", "empData"). */
  name: string
  /** localStorage persist key (e.g. "probation-wizard-draft"). */
  storeKey: string
  /** Initial form values — must include every key the wizard mutates. */
  initialFormData: TFormData
  /** Ordered step descriptors rendered by WizardShell / Stepper. */
  clusterSteps: ClusterStep[]
  /**
   * Per-step validators keyed by step number (1-based).
   * `true` = step is valid and Next is enabled.
   */
  validators: { [step: number]: (data: TFormData) => boolean }
  /**
   * Optional per-slice validity map — surface completeness in Review summary.
   * Keys can be any string; values are functions of the full form data.
   */
  sliceValid?: { [sliceKey: string]: (data: TFormData) => boolean }
}

// ─── Derived store types ────────────────────────────────────────────────────

type StepNumber = number  // 1-based, bounded by clusterSteps.length

interface WizardState<TFormData extends object> {
  currentStep: StepNumber
  maxUnlockedStep: StepNumber
  formData: TFormData
  lastSavedAt: number | null

  setStepData: <K extends keyof TFormData>(
    slice: K,
    patch: Partial<TFormData[K]>,
  ) => void
  goNext: () => void
  goBack: () => void
  jumpTo: (step: number) => void
  isStepValid: (step: number) => boolean
  reset: () => void
}

// ─── Factory ────────────────────────────────────────────────────────────────

/**
 * Factory that creates a Zustand+persist wizard store from a config object.
 *
 * Returns a `useStore` hook identical in shape to `useHireWizard` so any
 * component that works with Hire can be adapted to any new flow with minimal
 * changes.
 *
 * @example
 * ```ts
 * export const useProbationWizard = createClusterWizard({
 *   name: 'probation',
 *   storeKey: 'probation-wizard-draft',
 *   initialFormData: INITIAL_PROBATION_FORM,
 *   clusterSteps: PROBATION_STEPS,
 *   validators: {
 *     1: (d) => !!d.employeeId && !!d.probationEndDate,
 *     2: (d) => d.passProbation !== null,
 *   },
 * })
 * ```
 */
export function createClusterWizard<TFormData extends object>(
  config: ClusterWizardConfig<TFormData>,
) {
  const { name, storeKey, initialFormData, clusterSteps, validators } = config
  const totalSteps = clusterSteps.length

  function checkStepValid(step: number, data: TFormData): boolean {
    const fn = validators[step]
    if (!fn) {
      console.warn(`[${name}Wizard] no validator for step ${step} — treating as valid`)
      return true
    }
    return fn(data)
  }

  const useStore = create<WizardState<TFormData>>()(
    persist(
      (set, get) => ({
        currentStep: 1,
        maxUnlockedStep: 1,
        formData: initialFormData,
        lastSavedAt: null,

        setStepData: (slice, patch) => {
          set((state) => ({
            formData: {
              ...state.formData,
              [slice]: { ...(state.formData[slice] as object), ...patch },
            },
            lastSavedAt: Date.now(),
          }))
        },

        goNext: () => {
          const { currentStep, maxUnlockedStep, formData } = get()
          if (!checkStepValid(currentStep, formData)) return
          const nextStep = Math.min(currentStep + 1, totalSteps)
          const newMax = Math.max(maxUnlockedStep, nextStep)
          set({ currentStep: nextStep, maxUnlockedStep: newMax })
        },

        goBack: () => {
          const { currentStep } = get()
          if (currentStep <= 1) return
          set({ currentStep: currentStep - 1 })
        },

        jumpTo: (step: number) => {
          const { maxUnlockedStep } = get()
          if (step > maxUnlockedStep || step < 1 || step > totalSteps) {
            console.warn(
              `[${name}Wizard] jumpTo: step ${step} ยังถูกล็อคอยู่ (max: ${maxUnlockedStep})`,
            )
            return
          }
          set({ currentStep: step })
        },

        isStepValid: (step: number) => checkStepValid(step, get().formData),

        reset: () =>
          set({
            currentStep: 1,
            maxUnlockedStep: 1,
            formData: initialFormData,
            lastSavedAt: null,
          }),
      }),
      {
        name: storeKey,
        storage: createJSONStorage(() => localStorage),
        // Persist data + navigation state; exclude function references.
        partialize: (state) => ({
          currentStep: state.currentStep,
          maxUnlockedStep: state.maxUnlockedStep,
          formData: state.formData,
          lastSavedAt: state.lastSavedAt,
        }),
      },
    ),
  )

  return useStore
}
