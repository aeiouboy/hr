/**
 * layout-integration.test.tsx
 * AC-1, AC-2 — AppShell shell elements present across all 11 Humi routes
 *
 * Tests that sidebar (<aside>), wordmark "Hum", ⌘K kbd, bell icon,
 * and user avatar chip are rendered regardless of current pathname.
 *
 * Strategy: render AppShell directly with mocked pathname per route,
 * avoid async LocaleLayout (server component) — AppShell is the client
 * component that owns all shell UI.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';

// ── Mock next/navigation ─────────────────────────────────────────────────────
const mockPush = vi.fn();
const mockPathname = vi.fn().mockReturnValue('/th/home');

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
  useRouter: () => ({ push: mockPush }),
}));

// ── Mock next-intl ───────────────────────────────────────────────────────────
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Mock next/link ───────────────────────────────────────────────────────────
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [k: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// ── Route fixtures (11 Humi routes) ─────────────────────────────────────────
const ROUTES = [
  '/th/home',
  '/th/profile/me',
  '/th/timeoff',
  '/th/benefits-hub',
  '/th/requests',
  '/th/goals',
  '/th/learning-directory',
  '/th/org-chart',
  '/th/announcements',
  '/th/integrations',
  '/th/login',
] as const;

// ── Helper ───────────────────────────────────────────────────────────────────
async function renderShellAtRoute(pathname: string) {
  mockPathname.mockReturnValue(pathname);
  // Re-import to pick up updated mock
  const { AppShell } = await import('@/components/humi/shell/AppShell');
  return render(<AppShell><div data-testid="page-slot">page</div></AppShell>);
}

// ─────────────────────────────────────────────────────────────────────────────
// AC-1: Sidebar <aside> present on every route
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-1 — sidebar element present on all routes', () => {
  beforeEach(() => {
    vi.resetModules();
    mockPush.mockReset();
  });

  for (const route of ROUTES) {
    it(`sidebar visible at ${route}`, async () => {
      const { container, unmount } = await renderShellAtRoute(route);
      const sidebar = container.querySelector('aside');
      expect(sidebar).toBeTruthy();
      unmount();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-2: Wordmark "Hum" text present on every route
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-2 — wordmark "Hum" present on all routes', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  for (const route of ROUTES) {
    it(`wordmark visible at ${route}`, async () => {
      const { unmount } = await renderShellAtRoute(route);
      // The wordmark renders "Hum" + SVG mark
      const wordmark = screen.getByText(/Hum/i);
      expect(wordmark).toBeTruthy();
      unmount();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-2: ⌘K kbd element present on every route
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-2 — ⌘K kbd shortcut hint present on all routes', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  for (const route of ROUTES) {
    it(`⌘K kbd visible at ${route}`, async () => {
      const { container, unmount } = await renderShellAtRoute(route);
      const kbd = container.querySelector('kbd');
      expect(kbd).toBeTruthy();
      expect(kbd?.textContent).toBe('⌘K');
      unmount();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-2: Bell notification button present on every route
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-2 — bell notification icon present on all routes', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  for (const route of ROUTES) {
    it(`bell icon visible at ${route}`, async () => {
      const { unmount } = await renderShellAtRoute(route);
      const bell = screen.getByRole('button', { name: /การแจ้งเตือน/i });
      expect(bell).toBeTruthy();
      unmount();
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-2: User avatar chip (จท initials) present in sidebar footer
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-2 — user avatar chip present on all routes', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  for (const route of ROUTES) {
    it(`avatar chip visible at ${route}`, async () => {
      const { unmount } = await renderShellAtRoute(route);
      // Avatar shows initials จท
      const avatar = screen.getByText('จท');
      expect(avatar).toBeTruthy();
      unmount();
    });
  }
});
