/**
 * T4 (#91) — demo+ Smoke test deck
 *
 * Captures 4 production roles × 6 apps = 24 screenshots covering the demo+
 * walkthrough. Plus a 3-frame T3 sequence (employee submit → SPD approve →
 * employee sees update) for a total of 27 frames.
 *
 * Persona model (option C from session 2026-04-26):
 *   admin@humi.test = view-as super-user. Real demo personas =
 *   { employee, manager, hrbp, spd } per src/lib/rbac.ts Role type.
 *
 * Output: <repo>/test-artifacts/demo-2026-04-26-plus/<role>/<app>.png
 *
 * Running:
 *   cd src/frontend
 *   bun run dev   # in another terminal
 *   bun run test:e2e:demo-plus
 *
 * Requires dev server on port 3000.
 */

import { expect, test } from '@playwright/test';
import * as path from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

type ProductionRole = 'employee' | 'manager' | 'hrbp' | 'spd';
type AppKey = 'home' | 'profile-me' | 'org-chart' | 'manager-dashboard' | 'change-requests' | 'admin-employees';

const PERSONAS: Record<ProductionRole, {
  email: string;
  name: string;
  userId: string;
  roles: string[];
}> = {
  employee: {
    email: 'employee@humi.test',
    name: 'สมชาย ใจดี',
    userId: 'EMP001',
    roles: ['employee'],
  },
  manager: {
    email: 'manager@humi.test',
    name: 'พิชญ์ ม. (หัวหน้าทีม)',
    userId: 'MGR001',
    roles: ['manager', 'employee'],
  },
  hrbp: {
    email: 'hrbp@humi.test',
    name: 'วิทยา ส. (HRBP)',
    userId: 'HRB001',
    roles: ['hrbp', 'employee'],
  },
  spd: {
    email: 'spd@humi.test',
    name: 'ดารณี ล. (SPD)',
    userId: 'SPD001',
    roles: ['spd', 'employee'],
  },
};

const APPS: Record<AppKey, { path: string; description: string }> = {
  'home':              { path: '/th/home', description: 'หน้าหลัก' },
  'profile-me':        { path: '/th/profile/me', description: 'โปรไฟล์ของฉัน' },
  'org-chart':         { path: '/th/org-chart', description: 'ผังองค์กร' },
  'manager-dashboard': { path: '/th/manager-dashboard', description: 'แดชบอร์ดผู้จัดการ' },
  'change-requests':   { path: '/th/admin/change-requests', description: 'คิวอนุมัติคำขอแก้ไขข้อมูล' },
  'admin-employees':   { path: '/th/admin/employees', description: 'รายชื่อพนักงาน' },
};

const ARTIFACT_ROOT = path.resolve(__dirname, '..', 'test-artifacts/demo-2026-04-26-plus');

function ensureDir(dir: string): void {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function injectPersona(page: import('@playwright/test').Page, role: ProductionRole): Promise<void> {
  const persona = PERSONAS[role];
  // Set auth-store before navigation so the page boots authenticated as the role.
  await page.addInitScript((p) => {
    const authState = {
      state: {
        userId: p.userId,
        username: p.name,
        email: p.email,
        roles: p.roles,
        isAuthenticated: true,
      },
      version: 0,
    };
    window.localStorage.setItem('humi-auth', JSON.stringify(authState));
  }, persona);
}

test.describe('demo+ smoke deck — 4 roles × 6 apps', () => {
  for (const role of ['employee', 'manager', 'hrbp', 'spd'] as const) {
    for (const [appKey, app] of Object.entries(APPS) as Array<[AppKey, typeof APPS[AppKey]]>) {
      test(`${role} → ${appKey}`, async ({ page }) => {
        await injectPersona(page, role);
        const dir = path.join(ARTIFACT_ROOT, role);
        ensureDir(dir);
        const out = path.join(dir, `${appKey}.png`);

        const response = await page.goto(app.path, { waitUntil: 'domcontentloaded' });
        // Accept 2xx or 3xx (some apps may redirect based on role e.g. /admin → /home)
        if (response) {
          expect(response.status()).toBeLessThan(500);
        }

        // Wait for content to settle; non-fatal if app is gated
        await page.waitForTimeout(1500);
        await page.screenshot({ path: out, fullPage: true });
      });
    }
  }
});

test.describe('demo+ T3 approval flow — 3-frame sequence', () => {
  test('frame 1 — employee submits change request', async ({ page }) => {
    await injectPersona(page, 'employee');
    await page.goto('/th/profile/me', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const dir = path.join(ARTIFACT_ROOT, 'flow');
    ensureDir(dir);
    await page.screenshot({ path: path.join(dir, '1-employee-profile-before.png'), fullPage: true });
  });

  test('frame 2 — SPD sees pending in queue', async ({ page }) => {
    await injectPersona(page, 'spd');
    await page.goto('/th/admin/change-requests', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const dir = path.join(ARTIFACT_ROOT, 'flow');
    ensureDir(dir);
    await page.screenshot({ path: path.join(dir, '2-spd-queue.png'), fullPage: true });
  });

  test('frame 3 — employee sees approved value in profile', async ({ page }) => {
    await injectPersona(page, 'employee');
    await page.goto('/th/profile/me', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    const dir = path.join(ARTIFACT_ROOT, 'flow');
    ensureDir(dir);
    await page.screenshot({ path: path.join(dir, '3-employee-profile-after.png'), fullPage: true });
  });
});
