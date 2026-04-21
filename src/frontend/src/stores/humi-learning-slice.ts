import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ════════════════════════════════════════════════════════════
// humi-learning-slice
// Functional state for /learning-directory:
//   - controlled search query
//   - active filter tab
//   - enrolled course IDs (Set, persisted via custom storage)
// Persist key: humi-learning-v1
// ════════════════════════════════════════════════════════════

export type LearningFilter = 'all' | 'enrolled' | 'new' | 'required' | 'live';

interface LearningState {
  query: string;
  filter: LearningFilter;
  enrolled: Set<string>;
  setQuery: (q: string) => void;
  setFilter: (f: LearningFilter) => void;
  toggleEnroll: (id: string) => void;
}

// Custom storage that converts Set ↔ string[] for JSON serialisation
const setStorage = createJSONStorage<LearningState>(() => localStorage, {
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

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      query: '',
      filter: 'all',
      enrolled: new Set<string>(),
      setQuery: (q) => set({ query: q }),
      setFilter: (f) => set({ filter: f }),
      toggleEnroll: (id) =>
        set((s) => {
          const next = new Set(s.enrolled);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return { enrolled: next };
        }),
    }),
    {
      name: 'humi-learning-v1',
      storage: setStorage,
      partialize: (s) =>
        ({ query: s.query, filter: s.filter, enrolled: s.enrolled }) as LearningState,
    }
  )
);
