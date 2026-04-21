// Zustand slice — /benefits-hub enrollment + tab state.
// Persisted to localStorage under key 'humi-benefits'.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BenefitsTabKey = 'benefits' | 'claims' | 'docs' | 'policies' | 'pay';

interface BenefitsState {
  enrolled: Set<string>;
  activeTab: BenefitsTabKey;
  toggleEnroll: (id: string) => void;
  setTab: (tab: BenefitsTabKey) => void;
}

// Zustand persist with Set serialisation
export const useBenefitsStore = create<BenefitsState>()(
  persist(
    (set) => ({
      // All 3 plans enrolled by default (matching initial UI state)
      enrolled: new Set(['bp-health', 'bp-provident', 'bp-wellness']),
      activeTab: 'benefits' as BenefitsTabKey,
      toggleEnroll: (id) =>
        set((s) => {
          const next = new Set(s.enrolled);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return { enrolled: next };
        }),
      setTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'humi-benefits',
      // Serialize Set → Array, deserialize Array → Set
      storage: {
        getItem: (name) => {
          const raw = localStorage.getItem(name);
          if (!raw) return null;
          try {
            const parsed = JSON.parse(raw);
            const state = parsed.state ?? parsed;
            return {
              ...parsed,
              state: {
                ...state,
                enrolled: new Set(state.enrolled ?? []),
              },
            };
          } catch {
            console.warn('[humi-benefits] failed to parse persisted state');
            return null;
          }
        },
        setItem: (name, value) => {
          const serialised = {
            ...value,
            state: {
              ...value.state,
              enrolled: Array.from(value.state.enrolled),
            },
          };
          localStorage.setItem(name, JSON.stringify(serialised));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
