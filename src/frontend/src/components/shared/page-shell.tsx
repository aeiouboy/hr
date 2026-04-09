'use client';

import { type ReactNode } from 'react';
import { Header } from '@/components/shared/header';
import { Sidebar } from '@/components/shared/sidebar';
import { MobileMenu } from '@/components/shared/mobile-menu';

interface PageShellProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

// Precision Cool page shell — sans-semibold title, no serif display.
// Canonical width: max-w-page (1280px).
export function PageShell({ title, description, actions, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />
      <MobileMenu />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <div className="max-w-page mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="font-sans font-semibold text-2xl tracking-tight text-ink">
                  {title}
                </h1>
                {description && (
                  <p className="text-ink-soft text-sm mt-1">
                    {description}
                  </p>
                )}
              </div>
              {actions && <div className="shrink-0">{actions}</div>}
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
