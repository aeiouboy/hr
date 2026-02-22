'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import type { Role } from '@/lib/rbac';

function AuthSync({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const { setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (session?.user && !isAuthenticated) {
      setUser({
        id: session.user.id ?? 'EMP001',
        name: session.user.name ?? 'User',
        email: session.user.email ?? '',
        roles: (session.user.roles ?? ['employee']) as Role[],
      });
    }
  }, [session, setUser, isAuthenticated]);

  return <>{children}</>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthSync>{children}</AuthSync>
    </SessionProvider>
  );
}
