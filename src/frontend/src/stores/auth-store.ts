import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Role } from '@/lib/rbac';

// Default state = logged out. Login page is the only entry point.
// Keycloak/NextAuth-Sync will overwrite on real auth in prod.
//
// Proxy-persona mode: when the demo switcher swaps roles in-session, the
// current user fields reflect the *active* persona while `originalUserId`
// points back to the real signed-in account. Clearing `originalUserId`
// (via exitPersona) restores the original account.

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
  setUser: (user: { id: string; name: string; email: string; roles: Role[] }) => void;
  /** Swap the active persona without losing track of the original account. */
  switchPersona: (user: { id: string; name: string; email: string; roles: Role[] }) => void;
  /** Restore the original account and drop the proxy layer. */
  exitPersona: () => void;
  clearUser: () => void;
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
    }),
    {
      name: 'humi-auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
