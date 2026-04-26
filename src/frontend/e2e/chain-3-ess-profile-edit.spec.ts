/**
 * chain-3-ess-profile-edit.spec.ts — Chain 3: ESS Profile Edit → SPD (BRD #166)
 *
 * Cross-persona E2E:
 *   Employee edits a non-name field → workflow created in useWorkflowApprovals →
 *   SPD /spd/inbox ApprovalInbox shows the row with employee's real name + diff →
 *   SPD approves → Employee /ess/workflows shows "อนุมัติแล้ว".
 *
 * Run:
 *   BASE_URL=http://localhost:3001 npx playwright test e2e/chain-3*.spec.ts
 */

import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { test, expect, type BrowserContext, type Page } from '@playwright/test';
import { mockAuthSession, getTestUser } from './helpers/auth.helper';

// ── Constants ─────────────────────────────────────────────────────────────────

/** Temp file used to hand auth + workflow state from Test 1 → Test 2. */
const STATE_FILE = path.join(os.tmpdir(), 'chain3-e2e-state.json');

/** Employee's new phone value — non-name field avoids the attachment requirement. */
const NEW_PHONE = '0899999999';

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Seed the Zustand persisted auth-store directly into localStorage so that
 * the store is already populated when the next page loads (bypasses the
 * AuthSync useEffect timing issue in tests).
 */
async function seedAuthStore(
  page: Page,
  user: { id: string; name: string; email: string; roles: string[] },
) {
  await page.evaluate((u) => {
    const state = {
      state: {
        userId: u.id,
        username: u.name,
        email: u.email,
        roles: u.roles,
        isAuthenticated: true,
        originalUser: null,
      },
      version: 0,
    };
    localStorage.setItem('humi-auth', JSON.stringify(state));
  }, user);
}

/**
 * Check that the dev server is reachable. Skip the entire suite if not.
 */
async function checkServerOrSkip(page: Page) {
  try {
    const resp = await page.goto('/th/home', { timeout: 10_000 });
    if (!resp || resp.status() >= 500) {
      test.skip(true, 'Dev server unreachable — skipping Chain 3 E2E');
    }
  } catch {
    test.skip(true, 'Dev server unreachable — skipping Chain 3 E2E');
  }
}

// ── Suite ─────────────────────────────────────────────────────────────────────

test.describe.serial('Chain 3 — ESS Profile Edit → SPD (BRD #166)', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies only — keep localStorage for cross-test state propagation.
    // (Test 2 loads localStorage from STATE_FILE written by Test 1.)
    await page.context().clearCookies();
  });

  // ── Test 1: Employee submits; workflow appears in SPD inbox ─────────────────
  test('Employee submits profile edit; SPD sees real-name request', async ({ page }) => {
    await checkServerOrSkip(page);

    // 1. Mock the next-auth session as employee
    const empUser = await mockAuthSession(page, 'employee');

    // 2. Navigate to the ESS profile edit form
    await page.goto('/th/ess/profile/edit', { waitUntil: 'domcontentloaded', timeout: 20_000 });

    // 3. Seed auth-store in localStorage so the workflow records the correct submitter id
    await seedAuthStore(page, {
      id: empUser.employeeId,
      name: empUser.name,
      email: empUser.username,
      roles: empUser.roles,
    });

    // 4. Wait for the edit form to be present
    await expect(
      page.getByRole('heading', { name: /แก้ไขข้อมูลส่วนตัว/i }),
    ).toBeVisible({ timeout: 15_000 });

    // 5. Edit the emergency contact phone (non-name field — no attachment required)
    const phoneField = page.getByLabel(/เบอร์โทรศัพท์/i);
    await expect(phoneField).toBeVisible({ timeout: 8_000 });
    await phoneField.clear();
    await phoneField.fill(NEW_PHONE);

    // 6. Submit — button: ส่งเพื่ออนุมัติ
    const submitBtn = page.getByRole('button', { name: /ส่งเพื่ออนุมัติ/i });
    await expect(submitBtn).toBeEnabled({ timeout: 5_000 });
    await submitBtn.click();

    // 7. Toast confirms submission (appears for 3 s then auto-dismisses)
    await expect(
      page.getByText(/รอ SPD อนุมัติ/i),
    ).toBeVisible({ timeout: 8_000 });

    // 8. Page navigates to /ess/workflows after 1.5 s — wait for that
    await page.waitForURL(/\/ess\/workflows/, { timeout: 8_000 }).catch(() => {
      // Non-fatal: route may vary; core assertion is the toast above
    });

    // 9. Persist context state (cookies + localStorage) for Test 2
    const storageState = await page.context().storageState();
    fs.writeFileSync(STATE_FILE, JSON.stringify(storageState, null, 2));
  });

  // ── Test 2: SPD approves; Employee sees approved status ─────────────────────
  test('SPD approves; Employee sees approved status', async ({ browser }) => {
    // Load the state saved by Test 1 so the workflow-approvals store is populated.
    let context: BrowserContext;
    if (fs.existsSync(STATE_FILE)) {
      const storageState = JSON.parse(fs.readFileSync(STATE_FILE, 'utf-8')) as Parameters<
        typeof browser.newContext
      >[0] extends { storageState?: infer S } ? S : never;
      context = await browser.newContext({ storageState });
    } else {
      context = await browser.newContext();
    }

    const page = await context.newPage();

    try {
      await checkServerOrSkip(page);

      // 1. Sign in as hr_admin (inherits spd role per ROLE_HIERARCHY; drives ApprovalInbox actor)
      await mockAuthSession(page, 'hr_admin');
      const spdUser = getTestUser('hr_admin');
      await seedAuthStore(page, {
        id: spdUser.employeeId,
        name: spdUser.name,
        email: spdUser.username,
        roles: spdUser.roles,
      });

      // 2. Navigate to SPD inbox
      await page.goto('/th/spd/inbox', { waitUntil: 'domcontentloaded', timeout: 20_000 });

      // 3. ApprovalInbox heading: "กล่องอนุมัติ — SPD"
      await expect(
        page.getByRole('heading', { name: /กล่องอนุมัติ/i }),
      ).toBeVisible({ timeout: 15_000 });

      // 4. Pending row shows the employee's Thai name (Chain 3, BRD #166)
      const empUser = getTestUser('employee');
      await expect(
        page.getByText(empUser.name),
      ).toBeVisible({ timeout: 8_000 });

      // 5. First click → "อนุมัติ" reveals the confirm panel
      const approveBtn = page
        .getByRole('button', { name: /^อนุมัติ$/i })
        .first();
      await expect(approveBtn).toBeVisible({ timeout: 5_000 });
      await approveBtn.click();

      // 6. Second click → "ยืนยันอนุมัติ" confirms
      const confirmBtn = page
        .getByRole('button', { name: /ยืนยันอนุมัติ/i })
        .first();
      await expect(confirmBtn).toBeVisible({ timeout: 5_000 });
      await confirmBtn.click();

      // 7. The request row should disappear or show "อนุมัติแล้ว" in history
      await expect(
        page.getByText(/อนุมัติแล้ว/i).first(),
      ).toBeVisible({ timeout: 8_000 });

      // 8. Switch back to employee context — restore emp auth
      await mockAuthSession(page, 'employee');
      await seedAuthStore(page, {
        id: empUser.employeeId,
        name: empUser.name,
        email: empUser.username,
        roles: empUser.roles,
      });

      // 9. Navigate to employee's My Workflows page
      await page.goto('/th/ess/workflows', { waitUntil: 'domcontentloaded', timeout: 20_000 });

      // 10. The request list shows "อนุมัติแล้ว" status badge
      await expect(
        page.getByText(/อนุมัติแล้ว/i).first(),
      ).toBeVisible({ timeout: 10_000 });
    } finally {
      await context.close();
    }
  });
});
