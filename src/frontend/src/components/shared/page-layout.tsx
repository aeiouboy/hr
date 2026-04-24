'use client';

// PageLayout — pass-through after legacy chrome removed.
// AppShell ([locale]/layout.tsx) now owns sidebar/topbar for every authed route,
// so PageLayout only keeps its access-denied fallback when `module` is set.
// Kept as a thin wrapper so 17 existing callers don't need editing.

import { useAuthStore } from '@/stores/auth-store';
import { canAccessModule } from '@/lib/rbac';
import { ShieldOff } from 'lucide-react';

interface PageLayoutProps {
  children: React.ReactNode;
  module?: string;
}

export function PageLayout({ children, module }: PageLayoutProps) {
  const { roles } = useAuthStore();

  if (module && !canAccessModule(roles, module)) {
    return (
      <div className="max-w-lg mx-auto mt-20 text-center">
        <ShieldOff className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-ink mb-2">Access Denied</h1>
        <p className="text-ink-muted">
          You do not have permission to access this module.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
