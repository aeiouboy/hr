import { test, expect, type Page } from '@playwright/test';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

// Weekly Roster Grid E2E. Auth: seed humi-auth via addInitScript (so Zustand
// rehydrates the role before React runs) and NULL the next-auth session route
// so AuthSync doesn't clobber the seeded role with a super-user session.

const SHOTS = mkdtempSync(join(tmpdir(), 'roster-e2e-'));

type Role = 'manager' | 'employee';

const PERSONA: Record<Role, { userId: string; username: string; email: string; roles: string[] }> = {
  manager: { userId: 'MGR001', username: 'พิชญ์ ม. (หัวหน้าทีม)', email: 'manager@humi.test', roles: ['manager', 'employee'] },
  employee: { userId: 'EMP001', username: 'สมชาย ใจดี', email: 'employee@humi.test', roles: ['employee'] },
};

async function authAs(page: Page, role: Role) {
  const state = { ...PERSONA[role], isAuthenticated: true, originalUser: null };
  await page.addInitScript((s) => {
    localStorage.setItem('humi-auth', JSON.stringify({ state: s, version: 0 }));
  }, state);
  // Null the session route so the seeded role survives (AuthSync won't override).
  await page.route('**/api/auth/session', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  );
}

async function gotoRoster(page: Page, locale: 'th' | 'en' = 'th') {
  await page.goto(`/${locale}/time/shift-schedule`);
  await page.waitForLoadState('networkidle');
}

test.describe('Weekly Roster Grid', () => {
  test('manager sees the roster grid', async ({ page }) => {
    await authAs(page, 'manager');
    await gotoRoster(page);
    await expect(page.getByTestId('roster-grid')).toBeVisible();
    await expect(page.getByTestId('coverage-row')).toBeVisible();
    await expect(page.getByTestId('roster-legend')).toBeVisible();
    await page.screenshot({ path: join(SHOTS, 'manager-grid.png'), fullPage: true });
  });

  test('click a cell → popover → pick code updates cell, hours and coverage', async ({ page }) => {
    await authAs(page, 'manager');
    await gotoRoster(page);

    const firstHours = page.getByTestId('weekly-hours').first();
    const beforeHours = await firstHours.innerText();

    // Open the first cell's popover and pick the 9h early shift (9A0700, 07:00).
    // The seeded first cell is an 8h shift, so a 9h pick guarantees an hours delta
    // regardless of the seed (picking the same 8h code would leave the sum unchanged).
    await page.getByTestId('roster-cell').first().click();
    await expect(page.getByTestId('shift-popover')).toBeVisible();
    await page.getByTestId('shift-option').filter({ hasText: /07:00/ }).first().click();

    // Cell becomes a draft and hours recompute.
    await expect(page.getByTestId('roster-cell-draft').first()).toBeVisible();
    await expect
      .poll(async () => firstHours.innerText())
      .not.toBe(beforeHours);

    // Coverage row stays present and renders cells.
    await expect(page.getByTestId('coverage-cell').first()).toBeVisible();
    await page.screenshot({ path: join(SHOTS, 'after-pick.png'), fullPage: true });
  });

  test('clearing a working cell can make coverage short (pumpkin)', async ({ page }) => {
    await authAs(page, 'manager');
    await gotoRoster(page);

    // Clear the first three employees' first-day cells to force a short day.
    const cells = page.getByTestId('roster-cell');
    for (let i = 0; i < 3; i++) {
      // cell index 0 of each row = (row * 7). Click first cell of rows 0,1,2.
      await cells.nth(i * 7).click();
      await expect(page.getByTestId('shift-popover')).toBeVisible();
      await page.getByTestId('shift-option-clear').click();
    }

    // At least one coverage cell should now be short (pumpkin).
    await expect(page.locator('[data-testid="coverage-cell"][data-short="true"]').first()).toBeVisible();
    await page.screenshot({ path: join(SHOTS, 'coverage-short.png'), fullPage: true });
  });

  test('publish → modal → confirm → toast', async ({ page }) => {
    await authAs(page, 'manager');
    await gotoRoster(page);

    await page.getByRole('button', { name: 'ประกาศ' }).click();
    await expect(page.getByTestId('publish-confirm')).toBeVisible();
    await page.getByTestId('publish-confirm').click();
    await expect(page.getByRole('status')).toBeVisible();
    await expect(page.getByRole('status')).toContainText('ประกาศ');
    await page.screenshot({ path: join(SHOTS, 'publish-toast.png') });
  });

  test('/en shows no Thai chrome leak', async ({ page }) => {
    await authAs(page, 'manager');
    await gotoRoster(page, 'en');
    await expect(page.getByTestId('roster-grid')).toBeVisible();
    // h1 specifically (the breadcrumb crumb also reads "Team shift schedule").
    await expect(page.getByRole('heading', { name: 'Team shift schedule' })).toBeVisible();
    await expect(page.getByText('Apply to all')).toBeVisible();
    // No Thai header text on the EN surface.
    await expect(page.getByText('ตารางกะทีม')).toHaveCount(0);
    await page.screenshot({ path: join(SHOTS, 'en-grid.png'), fullPage: true });
  });

  test('non-manager sees the gate, not the grid', async ({ page }) => {
    await authAs(page, 'employee');
    await gotoRoster(page);
    await expect(page.getByText('เฉพาะผู้จัดการ/HR เท่านั้น')).toBeVisible();
    await expect(page.getByTestId('roster-grid')).toHaveCount(0);
    await page.screenshot({ path: join(SHOTS, 'employee-gate.png') });
  });
});
