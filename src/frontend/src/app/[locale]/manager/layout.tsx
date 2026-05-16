'use client';

// STA-28 PR-A — manager/layout.tsx
// Role guard for /{locale}/manager/**
//   - Not signed in → redirect to /login
//   - Signed in, not manager/hr_admin/hr_manager → redirect to /home
// Mirrors admin/layout.tsx exactly: hydration-guarded, no flash.

import { useEffect, type ReactNode } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';

export default function ManagerLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const { isAuthenticated, roles, _hasHydrated } = useAuthStore();

  // Manager persona: any of manager / hr_admin / hr_manager may access /manager/**
  const isManager =
    roles.includes('manager') ||
    roles.includes('hr_admin') ||
    roles.includes('hr_manager');

  useEffect(() => {
    // Wait for Zustand persist rehydration before redirecting — prevents flash
    // on fresh tab while the store is still in default (logged-out) state.
    if (!_hasHydrated) return;
    if (!isAuthenticated) {
      router.replace(`/${locale}/login`);
    } else if (!isManager) {
      // Signed in but wrong persona — send to /home, not /login
      router.replace(`/${locale}/home`);
    }
  }, [_hasHydrated, isAuthenticated, isManager, locale, router]);

  // Show nothing until hydrated (avoids flash-redirect)
  if (!_hasHydrated) return null;

  if (!isAuthenticated || !isManager) {
    return null;
  }

  return <>{children}</>;
}
