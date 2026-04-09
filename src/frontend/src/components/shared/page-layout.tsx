'use client';

import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';
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
      <div className="min-h-screen bg-canvas text-ink">
        <Header />
        <MobileMenu />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            <div className="max-w-lg mx-auto mt-20 text-center">
              <ShieldOff className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h1 className="text-xl font-semibold text-ink dark:text-gray-100 mb-2">Access Denied</h1>
              <p className="text-gray-500 dark:text-gray-400">You do not have permission to access this module.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-10 pb-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
