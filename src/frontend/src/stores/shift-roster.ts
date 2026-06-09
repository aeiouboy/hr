// stores/shift-roster.ts — NON-persisted view-state for the Weekly Roster Grid.
//
// The store holds the manager's per-cell overrides for the displayed week plus
// a `draft` set of touched `${emp}|${date}` keys (the not-yet-published edits).
// It is intentionally NOT persisted: the schedule template stays the single
// source, and the grid is re-seeded from it on every mount.
//
// Zustand + Set: each mutation replaces `draft` with a NEW Set so React detects
// the change and re-renders.

import { create } from 'zustand';
import { applyTemplateRow } from '@/lib/time/roster';

type RosterMap = Record<string, Record<string, string | null>>;

const draftKey = (emp: string, date: string) => `${emp}|${date}`;

interface ShiftRosterState {
  roster: RosterMap;
  draft: Set<string>;
  seed: (map: RosterMap) => void;
  setCell: (emp: string, date: string, code: string | null) => void;
  applyTemplateToRow: (emp: string, tmplKey: string, dates: string[]) => void;
  applyTemplateToAll: (
    team: { id: string }[],
    tmplKey: string,
    dates: string[],
  ) => void;
  markPublished: () => void;
  clear: () => void;
}

export const useShiftRosterStore = create<ShiftRosterState>((set) => ({
  roster: {},
  draft: new Set<string>(),

  seed: (map) => set({ roster: map, draft: new Set<string>() }),

  setCell: (emp, date, code) =>
    set((s) => {
      const row = { ...(s.roster[emp] ?? {}), [date]: code };
      const draft = new Set(s.draft);
      draft.add(draftKey(emp, date));
      return { roster: { ...s.roster, [emp]: row }, draft };
    }),

  applyTemplateToRow: (emp, tmplKey, dates) =>
    set((s) => {
      const row = applyTemplateRow(tmplKey, dates);
      const draft = new Set(s.draft);
      for (const date of dates) draft.add(draftKey(emp, date));
      return { roster: { ...s.roster, [emp]: row }, draft };
    }),

  applyTemplateToAll: (team, tmplKey, dates) =>
    set((s) => {
      const roster = { ...s.roster };
      const draft = new Set(s.draft);
      for (const emp of team) {
        roster[emp.id] = applyTemplateRow(tmplKey, dates);
        for (const date of dates) draft.add(draftKey(emp.id, date));
      }
      return { roster, draft };
    }),

  markPublished: () => set({ draft: new Set<string>() }),

  clear: () => set({ roster: {}, draft: new Set<string>() }),
}));
