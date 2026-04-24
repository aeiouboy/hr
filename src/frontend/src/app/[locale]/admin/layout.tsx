'use client';

// admin/layout.tsx — role guard for /{locale}/admin/**
// Client-side check: requires 'hr_admin' role in Zustand auth-store.
// Non-admin → redirect to /{locale}/login.
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
    // wait for Zustand persist rehydration before redirecting
    if (!_hasHydrated) return;
    if (!isAuthenticated || !isAdmin) {
      router.replace(`/${locale}/login`);
    }
  }, [_hasHydrated, isAuthenticated, isAdmin, locale, router]);

  // show nothing until hydrated (avoids flash-redirect)
  if (!_hasHydrated) return null;

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
