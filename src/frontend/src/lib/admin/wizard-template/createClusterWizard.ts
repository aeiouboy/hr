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
//   - employeeId + preloadedEmployee are additive optionals. Hire (Archetype A)
//     passes neither; Archetype B wizards pass both to pre-populate + mark read-only.
//   - Step components must NOT own submit/nav — only WizardShell does.
//
// Sources:
//   - Reference: src/lib/admin/store/useHireWizard.ts (Hire Option-1 pattern)
//   - Skill: .skills/composition-patterns/SKILL.md (architecture-avoid-boolean-props)

import { create, type UseBoundStore, type StoreApi } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ─── Submit envelope types ─────────────────────────────────────────────────

/** Envelope emitted by submit() when employeeId is present (Archetype B). */
export interface EmployeeActionEnvelope<TFormData extends object> {
  employee_id: string
  action: string
  payload: TFormData
}

/** Union of both submit shapes — callers discriminate on presence of employee_id. */
export type SubmitPayload<TFormData extends object> =
  | EmployeeActionEnvelope<TFormData>
  | TFormData

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
  /**
   * Employee ID for Archetype B contextual actions.
   * Undefined = Archetype A (Hire) — no employee context.
   * When present, submit() wraps payload as { employee_id, action, payload }.
   */
  employeeId?: string
  /**
   * Partial form-data snapshot to pre-populate. Must pair with employeeId.
   * Caller maps Employee master data → TFormData shape; factory stays generic.
   * Keys that overlap initialFormData → preloaded value wins.
   * readOnlyKeys exposes these top-level keys so UI can render them as read-only hints.
   */
  preloadedEmployee?: Partial<TFormData>
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

/** Shape returned by createClusterWizard. */
export interface ClusterWizardInstance<TFormData extends object> {
  /** Zustand store hook — same shape as useHireWizard. */
  useStore: UseBoundStore<StoreApi<WizardState<TFormData>>>
  /**
   * Set of form-data keys derived from preloadedEmployee.
   * UI renderers use this to show read-only hints on pre-populated fields.
   * Empty set when no preloadedEmployee provided (Archetype A).
   */
  readOnlyKeys: ReadonlySet<string>
  /**
   * Build the submit payload for this wizard instance.
   * - With employeeId → { employee_id, action, payload }
   * - Without → flat formData (backwards-compat Hire shape)
   */
  buildSubmitPayload: (formData: TFormData) => SubmitPayload<TFormData>
}

// ─── Factory ────────────────────────────────────────────────────────────────

/**
 * Factory that creates a Zustand+persist wizard store from a config object.
 *
 * Returns `{ useStore, readOnlyKeys, buildSubmitPayload }`.
 * - `useStore` is identical in shape to `useHireWizard` (backwards compat).
 * - `readOnlyKeys` is a Set of field names pre-populated from `preloadedEmployee`.
 * - `buildSubmitPayload` formats the envelope for the caller's onSubmit handler.
 *
 * Archetype A (Hire — no employeeId): pass only required fields. Store behaves
 * identically to pre-D1.2 behavior; readOnlyKeys is empty; buildSubmitPayload
 * returns flat formData.
 *
 * Archetype B (contextual action — has employeeId): pass employeeId +
 * preloadedEmployee. Store initialises with preloaded values merged into
 * initialFormData (preloaded wins on overlap). buildSubmitPayload wraps as
 * { employee_id, action, payload }.
 *
 * @example Archetype A (Hire — no context)
 * ```ts
 * export const { useStore: useHireWizard } = createClusterWizard({
 *   name: 'hire',
 *   storeKey: 'hire-wizard-draft',
 *   initialFormData: INITIAL_HIRE_FORM,
 *   clusterSteps: HIRE_STEPS,
 *   validators: { 1: (d) => !!d.personal.firstName },
 * })
 * ```
 *
 * @example Archetype B (Probation — with employee context)
 * ```ts
 * export const probationWizard = createClusterWizard({
 *   name: 'probation',
 *   storeKey: 'probation-wizard-draft',
 *   initialFormData: INITIAL_PROBATION_FORM,
 *   clusterSteps: PROBATION_STEPS,
 *   validators: { 1: (d) => !!d.probationEndDate, 2: (d) => d.passProbation !== null },
 *   employeeId: employee.employee_id,
 *   preloadedEmployee: { first_name: employee.first_name, employee_class: employee.employee_class },
 * })
 * // readOnlyKeys = Set { 'first_name', 'employee_class' }
 * // buildSubmitPayload(formData) → { employee_id, action: 'probation', payload: formData }
 * ```
 */
export function createClusterWizard<TFormData extends object>(
  config: ClusterWizardConfig<TFormData>,
): ClusterWizardInstance<TFormData> {
  const {
    name,
    storeKey,
    initialFormData,
    clusterSteps,
    validators,
    employeeId,
    preloadedEmployee,
  } = config
  const totalSteps = clusterSteps.length

  // ── Derive readOnlyKeys from preloadedEmployee keys (empty set for Archetype A) ──
  const readOnlyKeys: ReadonlySet<string> = preloadedEmployee
    ? new Set(Object.keys(preloadedEmployee))
    : new Set()

  // ── Merge preloadedEmployee into initialFormData (preloaded wins on overlap) ──
  // Shallow merge at the top level — preloaded fields are scalar/string types
  // (bio snapshot), not nested objects, so shallow is correct here.
  const mergedInitialFormData: TFormData = preloadedEmployee
    ? { ...initialFormData, ...preloadedEmployee }
    : initialFormData

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
        formData: mergedInitialFormData,
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
            formData: mergedInitialFormData,
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

  // ── buildSubmitPayload — formats envelope for caller's onSubmit handler ──
  // Archetype B (employeeId present): { employee_id, action, payload }
  // Archetype A (no employeeId): flat formData (pre-D1.2 shape — no breaking change)
  function buildSubmitPayload(formData: TFormData): SubmitPayload<TFormData> {
    if (employeeId) {
      return { employee_id: employeeId, action: name, payload: formData }
    }
    return formData
  }

  return { useStore, readOnlyKeys, buildSubmitPayload }
}
