// useSelfServiceConfig.ts — Thin reader hook for Admin Self-Service Config bus
// BRD #178-181 PILOT — reads published config from useAdminSelfService store.
// Returns the three matrices (mandatory, visibility, readonly) from published state.
// Consumers use fieldId + RoleName keys defined in adminSelfService.ts.
//
// PILOT consumer: StepIdentity — reads mandatory matrix for one or two fields.
// Other consumer pages remain TODO (to be wired in Sprint 3+).

import { useAdminSelfService } from '@/lib/admin/store/useAdminSelfService'
import type { VisibilityMatrix, RoleName } from '@/lib/admin/types/adminSelfService'

export interface SelfServiceConfig {
  /** mandatory[fieldId][role] → true if field is required for that role */
  mandatory: VisibilityMatrix
  /** visibility[fieldId][role] → true if field is visible for that role */
  visibility: VisibilityMatrix
  /** readonly[fieldId][role] → true if field is read-only for that role */
  readonly: VisibilityMatrix
  /**
   * Convenience helper: returns true if the given field is mandatory for the given role.
   * Falls back to false if the fieldId or role is not present in the matrix.
   */
  isMandatory: (fieldId: string, role: RoleName) => boolean
}

export function useSelfServiceConfig(): SelfServiceConfig {
  const published = useAdminSelfService((s) => s.published)

  const isMandatory = (fieldId: string, role: RoleName): boolean => {
    return published.mandatory?.[fieldId]?.[role] ?? false
  }

  return {
    mandatory: published.mandatory,
    visibility: published.visibility,
    readonly: published.readonly,
    isMandatory,
  }
}
