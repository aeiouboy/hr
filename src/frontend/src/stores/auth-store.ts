import { create } from 'zustand';
import type { Role } from '@/lib/rbac';

// Default mock user for development (no Keycloak required)
const DEV_DEFAULTS = {
  userId: 'EMP001',
  username: 'Somchai Jaidee',
  email: 'somchai.j@centralgroup.com',
  roles: ['employee', 'manager', 'hr_admin', 'hr_manager'] as Role[],
};

interface AuthState {
  userId: string | null;
  username: string | null;
  email: string | null;
  roles: Role[];
  isAuthenticated: boolean;
  setUser: (user: { id: string; name: string; email: string; roles: Role[] }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: DEV_DEFAULTS.userId,
  username: DEV_DEFAULTS.username,
  email: DEV_DEFAULTS.email,
  roles: DEV_DEFAULTS.roles,
  isAuthenticated: true,
  setUser: (user) =>
    set({
      userId: user.id,
      username: user.name,
      email: user.email,
      roles: user.roles,
      isAuthenticated: true,
    }),
  clearUser: () =>
    set({
      userId: null,
      username: null,
      email: null,
      roles: [],
      isAuthenticated: false,
    }),
}));
