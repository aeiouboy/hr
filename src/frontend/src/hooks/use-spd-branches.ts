'use client';

/**
 * use-spd-branches — STA-27 PR-A
 *
 * Mock-mode hook returning the SPD's assigned branches + display name.
 * Mirrors `useHrbpScope` shape so SPD surfaces (`/spd/benefits/branch-view`,
 * `/spd/benefits/reports`) can render without async churn.
 */

import { useAuthStore } from '@/stores/auth-store';

export interface SpdBranchesResult {
  /** Branches this SPD oversees. Drives Branch View matrix + branch-scoped reports. */
  assignedBranches: string[];
  /** Display name for the current SPD (audit entries, header chips). */
  spdName: string;
  /** Always false in mockup phase. */
  isLoading: false;
  /** Always null in mockup phase. */
  error: null;
}

const MOCK_ASSIGNED_BRANCHES = ['BKK-Sukhumvit', 'BKK-Silom', 'CNX-Central', 'HKT-Patong'] as const;

export function useSpdBranches(): SpdBranchesResult {
  const username = useAuthStore((s) => s.username);
  return {
    assignedBranches: [...MOCK_ASSIGNED_BRANCHES],
    spdName: username ?? 'SPD Officer',
    isLoading: false,
    error: null,
  };
}
