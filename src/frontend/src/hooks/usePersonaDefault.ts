/**
 * usePersonaDefault — returns persona-aware default tab + mineToggle state (STA-28 PR-B v2)
 *
 * Persona × default state matrix:
 *   manager      → action  + mineToggle ON
 *   hrbp         → watching + mineToggle OFF
 *   spd          → watching + mineToggle OFF
 *   hr_admin     → all     + mineToggle OFF
 *   hr_manager   → all     + mineToggle OFF
 */

import { useMemo } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { getHighestRole } from '@/lib/rbac';
import type { SmartTab } from '@/components/manager/quick-approve/predicates';

export type PersonaDefaultTab = SmartTab | 'all';

export interface PersonaDefault {
  defaultTab: PersonaDefaultTab;
  mineToggleDefault: boolean;
}

export function usePersonaDefault(): PersonaDefault {
  const roles = useAuthStore((s) => s.roles);

  return useMemo((): PersonaDefault => {
    const primary = getHighestRole(roles);
    switch (primary) {
      case 'manager':
        return { defaultTab: 'action', mineToggleDefault: true };
      case 'hrbp':
      case 'spd':
        return { defaultTab: 'watching', mineToggleDefault: false };
      case 'hr_admin':
      case 'hr_manager':
        return { defaultTab: 'all', mineToggleDefault: false };
      default:
        return { defaultTab: 'all', mineToggleDefault: false };
    }
  }, [roles]);
}
