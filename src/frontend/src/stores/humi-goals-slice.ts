// Zustand slice — /goals create/edit state.
// Persisted to localStorage under key 'humi-goals'.

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GoalItem {
  id: string;
  title: string;
  target: string;
  dueDate: string;
  progress: number; // 0-100
  category: string;
}

interface GoalsState {
  goals: GoalItem[];
  create: (g: Omit<GoalItem, 'id'>) => void;
  update: (id: string, patch: Partial<Omit<GoalItem, 'id'>>) => void;
  remove: (id: string) => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      goals: [],
      create: (g) =>
        set((s) => ({
          goals: [
            { id: `goal-usr-${Date.now()}`, ...g },
            ...s.goals,
          ],
        })),
      update: (id, patch) =>
        set((s) => ({
          goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
        })),
      remove: (id) =>
        set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
    }),
    { name: 'humi-goals' }
  )
);
