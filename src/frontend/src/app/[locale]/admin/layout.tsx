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
  const { isAuthenticated, roles } = useAuthStore();
  const isAdmin = roles.includes('hr_admin');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
    } else if (!isAdmin) {
      router.replace(`/${locale}/home`);
    }
  }, [isAuthenticated, isAdmin, locale, router]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
