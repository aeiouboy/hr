'use client';

// PageShell — title/description/actions frame only.
// Legacy Header/Sidebar/MobileMenu removed — AppShell owns chrome now.

import { type ReactNode } from 'react';

interface PageShellProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({ title, description, actions, children }: PageShellProps) {
  return (
    <div className="max-w-page mx-auto w-full">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-sans font-semibold text-[28px] leading-9 text-ink">
            {title}
          </h1>
          {description && (
            <p className="text-ink-soft text-sm mt-1.5 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
