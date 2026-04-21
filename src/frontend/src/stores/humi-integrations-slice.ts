import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ════════════════════════════════════════════════════════════
// humi-integrations-slice
// Functional state for /integrations:
//   - enabled: Set<id> of integrations with sync turned ON
//     (pre-seeded with connected integrations from mock data)
//   - category: active category filter chip
// Persist key: humi-integrations-v1
// ════════════════════════════════════════════════════════════

export type IntegrationCategoryFilter =
  | 'all'
  | 'hris'
  | 'payroll'
  | 'schedule'
  | 'comms'
  | 'benefits'
  | 'training';

interface IntegrationsState {
  enabled: Set<string>;
  category: IntegrationCategoryFilter;
  toggle: (id: string) => void;
  setCategory: (c: IntegrationCategoryFilter) => void;
}

// Custom storage that converts Set ↔ string[] for JSON serialisation
const setStorage = createJSONStorage<IntegrationsState>(() => localStorage, {
  replacer: (_key, value) => {
    if (value instanceof Set) return { __type: 'Set', values: Array.from(value) };
    return value;
  },
  reviver: (_key, value) => {
    if (
      value !== null &&
      typeof value === 'object' &&
      (value as { __type?: string }).__type === 'Set'
    ) {
      return new Set((value as { values: string[] }).values);
    }
    return value;
  },
});

// Connected integrations from mock data (pre-seed enabled state)
const INITIAL_ENABLED = [
  'int-workday',
  'int-payroll-cloud',
  'int-slack',
  'int-google',
];

export const useIntegrationsStore = create<IntegrationsState>()(
  persist(
    (set) => ({
      enabled: new Set<string>(INITIAL_ENABLED),
      category: 'all',
      toggle: (id) =>
        set((s) => {
          const next = new Set(s.enabled);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { enabled: next };
        }),
      setCategory: (c) => set({ category: c }),
    }),
    {
      name: 'humi-integrations-v1',
      storage: setStorage,
      partialize: (s) =>
        ({ enabled: s.enabled, category: s.category }) as IntegrationsState,
    }
  )
);
