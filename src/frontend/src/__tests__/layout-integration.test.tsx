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
  useRouter: () => ({ push: mockPush, replace: mockPush, back: vi.fn(), forward: vi.fn(), refresh: vi.fn() }),
  useParams: () => ({ locale: 'th' }),
  useSearchParams: () => new URLSearchParams(),
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

// ── Mock next/image — renders as <img> in jsdom ──────────────────────────────
// Auth-store mock — AppShell returns null on !isAuthenticated + requires _hasHydrated=true
// before rendering sidebar (race-safe pattern from #48). Test needs both flags true
// so AppShell proceeds past the gate.
vi.mock('@/stores/auth-store', () => {
  const state = {
    isAuthenticated: true,
    roles: ['admin'] as string[],
    _hasHydrated: true,
    email: 'jongrak@central.co.th',
    displayName: 'จงรักษ์ ทานากะ',
    initials: 'จท',
    setAuth: vi.fn(),
    clearAuth: vi.fn(),
    setHasHydrated: vi.fn(),
  };
  const useAuthStore = Object.assign(
    (selector?: (s: typeof state) => unknown) =>
      selector ? selector(state) : state,
    { getState: () => state, setState: vi.fn(), subscribe: vi.fn() }
  );
  return { useAuthStore };
});

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, priority: _p, ...props }: { src: string; alt: string; width?: number; height?: number; priority?: boolean; [k: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} {...props} />
  ),
}));

// ── Route fixtures (10 Humi shell routes) ───────────────────────────────────
// /th/login is intentionally excluded — AppShell short-circuits on login page
// (returns <>{children}</> without sidebar/topbar) per AppShell.tsx:183-185.
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
// AC-2: Wordmark brand mark present on every route
// (Updated: logo is now next/image PNG with alt="Humi", no raw text "Hum")
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-2 — wordmark "Hum" present on all routes', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  for (const route of ROUTES) {
    it(`wordmark visible at ${route}`, async () => {
      const { container, unmount } = await renderShellAtRoute(route);
      // The wordmark div now holds the official Humi logo PNG (alt="Humi")
      const wordmarkEl = container.querySelector('.humi-wordmark');
      expect(wordmarkEl).toBeTruthy();
      // Brand mark = img with alt matching "Humi"
      const img = wordmarkEl?.querySelector('img');
      expect(img).toBeTruthy();
      expect(img?.alt).toMatch(/humi/i);
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
