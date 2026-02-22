import { create } from 'zustand';
import type { Role } from '@/lib/rbac';

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
  userId: null,
  username: null,
  email: null,
  roles: [],
  isAuthenticated: false,
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
