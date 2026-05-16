'use client';

/**
 * use-hrbp-scope — STA-27 PR-A
 *
 * Mock-mode hook returning the HRBP's partnered departments + display name.
 * Backend phase will replace this with a real fetch keyed on the authenticated
 * HRBP profile. For the UI mockup phase, return deterministic seed data so
 * downstream components (`HrbpScopeBanner`, future `/hrbp/benefits/exceptions`,
 * `/hrbp/benefits/reports`) can render without async churn.
 *
 * NOT used to filter `/quick-approve` rows in the mockup phase — see
 * `docs/sta-27-quick-approve-predicate-audit.md` for the scope-filter trade-off.
 */

import { useAuthStore } from '@/stores/auth-store';

export interface HrbpScopeResult {
  /** Departments this HRBP partners with. Drives report scope + exception filtering. */
  partneredDepts: string[];
  /** Display name for the current HRBP (audit entries, header chips). */
  hrbpName: string;
  /** Always false in mockup phase — kept on shape so backend swap is API-stable. */
  isLoading: false;
  /** Always null in mockup phase. */
  error: null;
}

const MOCK_PARTNERED_DEPTS = ['Finance', 'HR', 'IT'] as const;

export function useHrbpScope(): HrbpScopeResult {
  const username = useAuthStore((s) => s.username);
  return {
    partneredDepts: [...MOCK_PARTNERED_DEPTS],
    hrbpName: username ?? 'HRBP Partner',
    isLoading: false,
    error: null,
  };
}
