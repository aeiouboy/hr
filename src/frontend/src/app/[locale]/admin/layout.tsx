'use client';

// admin/layout.tsx — role guard for /{locale}/admin/**
//   - Not signed in   → redirect to /login
//   - Signed in, not admin → redirect to /home (don't force a re-login just
//     because the persona switcher swapped roles; that looks like a logout)
// Server-side enforcement is the Keycloak/NextAuth layer in src/lib/auth.ts
// once /api/auth/[...nextauth] is activated.

import { useEffect, type ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const { isAuthenticated, roles, _hasHydrated } = useAuthStore();
  const isAdmin = roles.includes('hr_admin');

  useEffect(() => {
    // Wait for Zustand persist rehydration before redirecting — otherwise
    // a fresh tab flashes to /login while the store is still default-state.
    if (!_hasHydrated) return;
    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
    } else if (!isAdmin) {
      // Signed in but not admin — route to /home instead of /login so the
      // persona switcher doesn't feel like a logout when an employee lands
      // here directly.
      router.replace(`/${locale}/home`);
    }
  }, [_hasHydrated, isAuthenticated, isAdmin, locale, router]);

  // show nothing until hydrated (avoids flash-redirect)
  if (!_hasHydrated) return null;

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
