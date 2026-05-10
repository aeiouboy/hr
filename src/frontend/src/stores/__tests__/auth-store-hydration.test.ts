/**
 * auth-store-hydration.test.ts
 *
 * Regression tests for the _hasHydrated gate and partialize allowlist.
 * These tests guard two load-bearing invariants in auth-store.ts:
 *
 *   1. _hasHydrated starts false so components can defer rendering until
 *      localStorage has been read (prevents SSR / first-paint stale data).
 *
 *   2. partialize excludes _hasHydrated and originalUser from the persisted
 *      snapshot so they always reset to their defaults on the next page load.
 *      While proxying, it persists the original identity fields rather than
 *      the active view-as persona so reloads cannot strand proxy mode.
 *
 * DO NOT remove these tests — if either invariant breaks, hydration-sensitive
 * UI (e.g. AppShell auth guard) may flash wrong content on page load.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// localStorage stub must be defined before any module import so Zustand's
// createJSONStorage(() => localStorage) picks up the mock during module init.
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v; },
    removeItem: (k: string) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

import { useAuthStore } from '@/stores/auth-store';

beforeEach(() => {
  vi.unstubAllEnvs();
  localStorageMock.clear();
  useAuthStore.setState({
    userId: null,
    username: null,
    email: null,
    roles: [],
    isAuthenticated: false,
    originalUser: null,
    _hasHydrated: false,
  } as unknown as Parameters<typeof useAuthStore.setState>[0]);
});

describe('auth-store hydration gate', () => {
  it('_hasHydrated is false before setHasHydrated is called', () => {
    // CONTRACT: _hasHydrated starts false so SSR/first-paint sees the unhydrated state.
    expect(useAuthStore.getState()._hasHydrated).toBe(false);
  });

  it('_hasHydrated becomes true after setHasHydrated(true)', () => {
    useAuthStore.getState().setHasHydrated(true);
    expect(useAuthStore.getState()._hasHydrated).toBe(true);
  });
});

describe('auth-store partialize allowlist', () => {
  it('partialize output does not include _hasHydrated', () => {
    // CONTRACT: _hasHydrated must not be persisted — it must always reset to
    // false on the next page load so the hydration guard works correctly.
    // We test by calling the partialize function directly on a full state snapshot.
    const fullState = useAuthStore.getState();
    // Zustand exposes persist options via the persist API
    const options = useAuthStore.persist.getOptions();
    const partialize = options.partialize!;
    const partial = partialize(fullState) as Record<string, unknown>;
    expect(Object.keys(partial)).not.toContain('_hasHydrated');
  });

  it('partialize output does not include originalUser', () => {
    // CONTRACT: originalUser is session-only proxy state and must not survive
    // a page reload — restoring it from localStorage would leave a stale proxy
    // active with no way to exit.
    const fullState = useAuthStore.getState();
    const options = useAuthStore.persist.getOptions();
    const partialize = options.partialize!;
    const partial = partialize(fullState) as Record<string, unknown>;
    expect(Object.keys(partial)).not.toContain('originalUser');
  });

  it('partialize persists the original identity while proxying', () => {
    vi.stubEnv('NEXT_PUBLIC_DEMO_MODE', 'true');
    useAuthStore.getState().setUser({
      id: 'ADM001',
      name: 'HR Admin',
      email: 'admin@humi.test',
      roles: ['hr_admin', 'employee'],
    });
    useAuthStore.getState().switchPersona({
      id: 'EMP001',
      name: 'Employee',
      email: 'employee@humi.test',
      roles: ['employee'],
    });

    const fullState = useAuthStore.getState();
    expect(fullState.email).toBe('employee@humi.test');
    expect(fullState.originalUser?.email).toBe('admin@humi.test');

    const options = useAuthStore.persist.getOptions();
    const partialize = options.partialize!;
    const partial = partialize(fullState) as Record<string, unknown>;

    expect(partial).toMatchObject({
      userId: 'ADM001',
      username: 'HR Admin',
      email: 'admin@humi.test',
      roles: ['hr_admin', 'employee'],
      isAuthenticated: true,
    });
    expect(Object.keys(partial)).not.toContain('originalUser');
  });

  it('partialize output includes the expected identity fields', () => {
    // Sanity check: the fields we DO persist are present.
    useAuthStore.getState().setUser({
      id: 'U1',
      name: 'Test User',
      email: 'test@humi.test',
      roles: ['manager'],
    });
    const fullState = useAuthStore.getState();
    const options = useAuthStore.persist.getOptions();
    const partialize = options.partialize!;
    const partial = partialize(fullState) as Record<string, unknown>;
    expect(partial).toMatchObject({
      userId: 'U1',
      username: 'Test User',
      email: 'test@humi.test',
      roles: ['manager'],
      isAuthenticated: true,
    });
  });
});
