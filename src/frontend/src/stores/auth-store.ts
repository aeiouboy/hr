import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Role } from '@/lib/rbac';

// Default state = logged out. Login page is the only entry point.
// Keycloak/NextAuth-Sync will overwrite on real auth in prod.
//
// Proxy-persona mode: when the demo switcher swaps roles in-session, the
// current user fields reflect the *active* persona while `originalUser`
// points back to the real signed-in account. Clearing `originalUser`
// (via exitPersona) restores the original account.
//
// Persistence rule: proxy state is session-only. While proxying, persist the
// original identity rather than the active persona so reloads never strand the
// browser in a view-as role without the original account needed to exit.

interface StoredIdentity {
  userId: string;
  username: string;
  email: string;
  roles: Role[];
}

interface AuthState {
  userId: string | null;
  username: string | null;
  email: string | null;
  roles: Role[];
  isAuthenticated: boolean;
  /** The real signed-in account. Null when not proxying. */
  originalUser: StoredIdentity | null;
  /**
   * Hydration guard — LOAD-BEARING. Do not remove.
   *
   * Stays `false` until Zustand's `onRehydrateStorage` callback fires after
   * localStorage is read. Any UI that reads auth state before this is `true`
   * risks rendering with stale/default values during SSR or first paint.
   *
   * `partialize` intentionally excludes this field so it always resets to
   * `false` on the next page load, forcing components to wait for rehydration.
   */
  _hasHydrated: boolean;
  setUser: (user: { id: string; name: string; email: string; roles: Role[] }) => void;
  /** Swap the active persona without losing track of the original account. */
  switchPersona: (user: { id: string; name: string; email: string; roles: Role[] }) => void;
  /** Restore the original account and drop the proxy layer. */
  exitPersona: () => void;
  clearUser: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      username: null,
      email: null,
      roles: [],
      isAuthenticated: false,
      originalUser: null,
      _hasHydrated: false,
      setUser: (user) =>
        set({
          userId: user.id,
          username: user.name,
          email: user.email,
          roles: user.roles,
          isAuthenticated: true,
          originalUser: null,
        }),
      switchPersona: (user) => {
        if (process.env.NEXT_PUBLIC_DEMO_MODE !== 'true') {
          console.warn('switchPersona is demo-only');
          return;
        }
        const state = get();
        // Preserve the *first* original user we saw. Swapping between
        // personas while already proxying should not clobber the baseline.
        const original: StoredIdentity | null =
          state.originalUser ??
          (state.userId
            ? {
                userId: state.userId,
                username: state.username ?? '',
                email: state.email ?? '',
                roles: state.roles,
              }
            : null);
        set({
          userId: user.id,
          username: user.name,
          email: user.email,
          roles: user.roles,
          isAuthenticated: true,
          originalUser: original,
        });
      },
      exitPersona: () => {
        const state = get();
        if (!state.originalUser) return;
        set({
          userId: state.originalUser.userId,
          username: state.originalUser.username,
          email: state.originalUser.email,
          roles: state.originalUser.roles,
          isAuthenticated: true,
          originalUser: null,
        });
      },
      clearUser: () =>
        set({
          userId: null,
          username: null,
          email: null,
          roles: [],
          isAuthenticated: false,
          originalUser: null,
        }),
      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'humi-auth',
      storage: createJSONStorage(() => localStorage),
      // exclude _hasHydrated from persist so it always starts false and set to true after rehydrate
      // exclude originalUser itself, but when proxying persist the original
      // identity fields instead of the active persona.
      partialize: (state) => ({
        userId: state.originalUser?.userId ?? state.userId,
        username: state.originalUser?.username ?? state.username,
        email: state.originalUser?.email ?? state.email,
        roles: state.originalUser?.roles ?? state.roles,
        isAuthenticated: state.originalUser ? true : state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    },
  ),
);
