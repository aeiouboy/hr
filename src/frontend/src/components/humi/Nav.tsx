'use client';

import { forwardRef, type ComponentType } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Humi Nav — vertical sidebar nav, 3 section grouping.
// Active state = teal left-border + accent-soft background.
// Keyboard: tab → each link, Enter/Space to activate (native).
// ════════════════════════════════════════════════════════════

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ComponentType<{ className?: string; size?: number; 'aria-hidden'?: boolean }>;
  badge?: string | number;
  /** Mark this item as currently active (controlled by caller via route match). */
  active?: boolean;
}

export interface NavSection {
  id: string;
  label?: string;
  items: NavItem[];
}

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
  sections: NavSection[];
  /** aria-label for the nav landmark. Required for a11y. */
  ariaLabel: string;
  /** Optional brand slot rendered at top (wordmark + logo). */
  brand?: React.ReactNode;
  /** Optional footer slot rendered at bottom (user card, sign out). */
  footer?: React.ReactNode;
}

export const Nav = forwardRef<HTMLElement, NavProps>(
  ({ sections, ariaLabel, brand, footer, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          'flex h-full w-full flex-col gap-2 bg-surface',
          'border-r border-hairline',
          className
        )}
        {...props}
      >
        {brand && <div className="px-5 pb-2 pt-6">{brand}</div>}

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          {sections.map((section) => (
            <div key={section.id} className="mb-5">
              {section.label && (
                <div
                  className={cn(
                    'px-3 pb-2 pt-3',
                    'text-[length:var(--text-eyebrow)] leading-[var(--text-eyebrow--line-height)]',
                    'font-semibold uppercase tracking-[0.14em] text-ink-faint'
                  )}
                >
                  {section.label}
                </div>
              )}
              <ul role="list" className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        aria-current={item.active ? 'page' : undefined}
                        className={cn(
                          'group relative flex items-center gap-3 rounded-md px-3 py-2',
                          'text-body text-ink-soft',
                          'transition-colors duration-[var(--dur-fast)] ease-[var(--ease-spring)]',
                          'hover:bg-accent-soft/60 hover:text-ink',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
                          item.active && [
                            'bg-accent-soft text-ink font-medium',
                            'before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px]',
                            'before:rounded-r-full before:bg-accent',
                          ]
                        )}
                      >
                        {Icon && (
                          <Icon
                            size={18}
                            aria-hidden
                            className={cn(
                              'shrink-0 text-ink-muted',
                              'group-hover:text-ink-soft',
                              item.active && 'text-accent'
                            )}
                          />
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge !== undefined && (
                          <span
                            aria-label={
                              typeof item.badge === 'number'
                                ? `${item.badge} รายการใหม่`
                                : undefined
                            }
                            className={cn(
                              'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5',
                              'text-[length:var(--text-eyebrow)] font-semibold',
                              'bg-accent text-white'
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {footer && (
          <div className="border-t border-hairline px-5 py-4">{footer}</div>
        )}
      </nav>
    );
  }
);
Nav.displayName = 'HumiNav';
