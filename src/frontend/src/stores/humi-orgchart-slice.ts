import { create } from 'zustand';

// ════════════════════════════════════════════════════════════
// humi-orgchart-slice
// Functional state for /org-chart:
//   - controlled search query (filters + highlights nodes)
//   - selected person ID (drives detail panel on right)
// No persist needed — chart state is ephemeral per session.
// ════════════════════════════════════════════════════════════

interface OrgChartState {
  query: string;
  selectedId: string | null;
  setQuery: (q: string) => void;
  select: (id: string) => void;
}

export const useOrgChartStore = create<OrgChartState>()((set) => ({
  query: '',
  selectedId: 'marcus',
  setQuery: (q) => set({ query: q }),
  select: (id) => set({ selectedId: id }),
}));
