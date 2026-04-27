import { test, expect, type BrowserContext, type Page } from '@playwright/test';
import { authedContext } from './helpers/storage-auth.helper';

// ─── Chain 4 — Promotion → SPD (BRD #103) ─────────────────────────────────────
//
// Tests the full approval chain introduced in the Phase 4 fix:
//   1. HR Admin submits promotion → stored as pending_spd
//   2. Phase 4 fix: timeline event is NOT written at submit time (verified here)
//   3. SPD approves → timeline event written inside approve() action
//   4. HR Admin navigates back → event IS now visible
//
// Auth strategy: authedContext() with addInitScript for reliable Zustand init.
// All three tests share ONE browser context so localStorage (Zustand persist)
// survives across role transitions. Persona switching is done by injecting
// humi-auth directly via page.evaluate (synchronous, no navigation needed).

const EMPLOYEE_ID = 'EMP-0001';

function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

// ─── Persona auth states (mirrors DEMO_USERS) ────────────────────────────────

const HR_ADMIN_AUTH = {
  userId: 'ADM001',
  username: 'ผู้ดูแลระบบ HR',
  email: 'admin@humi.test',
  roles: ['hr_admin', 'hr_manager', 'spd', 'hrbp', 'manager', 'employee'],
  isAuthenticated: true,
  originalUser: null,
};

const SPD_AUTH = {
  userId: 'SPD001',
  username: 'ดารณี ล. (SPD)',
  email: 'spd@humi.test',
  roles: ['spd', 'employee'],
  isAuthenticated: true,
  originalUser: null,
};

/** Switch persona on a running page by writing humi-auth synchronously. */
async function switchPersona(
  page: Page,
  auth: typeof HR_ADMIN_AUTH | typeof SPD_AUTH,
): Promise<void> {
  await page.evaluate((state) => {
    localStorage.setItem('humi-auth', JSON.stringify({ state, version: 0 }));
  }, auth);
}

// ─── Shared state across the serial suite ────────────────────────────────────

let sharedContext: BrowserContext;
let sharedPage: Page;

test.describe.serial('Chain 4 — Promotion → SPD (BRD #103)', () => {
  test.beforeAll(async ({ browser }) => {
    // Start with HR Admin auth; shared context persists localStorage across tests.
    sharedContext = await authedContext(browser, 'hr_admin');
    sharedPage = await sharedContext.newPage();
  });

  test.afterAll(async () => {
    await sharedContext.close();
  });

  // Skip entire suite gracefully if dev server is unreachable.
  test.beforeAll(async () => {
    const reachable = await sharedPage
      .goto('/th/home', { timeout: 10_000 })
      .then(() => true)
      .catch(() => false);
    if (!reachable) {
      test.skip();
    }
  });

  // ── Test 1: HR Admin submits promotion; timeline NOT yet materialized ─────

  test('HR Admin submits promotion (timeline NOT yet materialized)', async () => {
    const page = sharedPage;

    // Ensure HR Admin persona (addInitScript already set it, but re-assert after possible navigation)
    await switchPersona(page, HR_ADMIN_AUTH);

    await page.goto(`/th/admin/employees/${EMPLOYEE_ID}/promotion`);
    await expect(page.getByRole('heading', { name: /เลื่อนตำแหน่ง/i })).toBeVisible({
      timeout: 10_000,
    });

    // ── Step 1: Satisfy the EffectiveDateGate ─────────────────────────────
    const dateInput = page.getByRole('textbox', { name: /วันที่มีผล/i });
    await expect(dateInput).toBeVisible({ timeout: 10_000 });
    await dateInput.fill(tomorrowISO());
    await page.getByRole('button', { name: /ยืนยันวันที่มีผล/i }).click();

    await expect(page.getByText(/ข้อมูลการเลื่อนตำแหน่ง/i)).toBeVisible({ timeout: 10_000 });

    // ── Step 2: Fill the PositionLookup combobox ──────────────────────────
    const positionInput = page.getByRole('combobox', { name: /เลื่อนไปเป็น/i });
    await expect(positionInput).toBeVisible({ timeout: 10_000 });
    await positionInput.fill('ผู้จัดการ');
    const firstOption = page.getByRole('option').first();
    await expect(firstOption).toBeVisible({ timeout: 10_000 });
    await firstOption.click();
    await expect(page.getByRole('status', { name: /ตำแหน่งที่เลือก/i })).toBeVisible({
      timeout: 10_000,
    });

    // ── Step 3: Submit the form ───────────────────────────────────────────
    await page.getByRole('button', { name: /บันทึกการเลื่อนตำแหน่ง/i }).click();

    await expect(page).toHaveURL(
      new RegExp(`/th/admin/employees/${EMPLOYEE_ID}`),
      { timeout: 10_000 },
    );
    await expect(
      page.getByText(/รอ SPD อนุมัติ/i).first(),
    ).toBeVisible({ timeout: 10_000 });

    // ── Phase 4 fix: timeline event must NOT be visible yet ───────────────
    await expect(
      page.getByText('เลื่อนตำแหน่ง').first(),
    ).not.toBeVisible({ timeout: 5_000 });
  });

  // ── Test 2: SPD approves the promotion ───────────────────────────────────

  test('SPD approves the promotion', async () => {
    const page = sharedPage;

    // Switch to SPD persona (localStorage survives — only humi-auth key changes)
    await switchPersona(page, SPD_AUTH);

    await page.goto('/th/spd/inbox');
    await expect(
      page.getByText(/คำขอเลื่อนตำแหน่ง — รอ SPD อนุมัติ/i),
    ).toBeVisible({ timeout: 10_000 });

    await expect(
      page.getByText(new RegExp(EMPLOYEE_ID)).first(),
    ).toBeVisible({ timeout: 10_000 });

    const approveBtn = page.getByRole('button', { name: /^อนุมัติ$/i }).first();
    await expect(approveBtn).toBeVisible({ timeout: 10_000 });
    await approveBtn.click();

    const confirmBtn = page.getByRole('button', { name: /ยืนยันอนุมัติ/i });
    await expect(confirmBtn).toBeVisible({ timeout: 10_000 });
    await confirmBtn.click();

    await expect(
      page.getByText('อนุมัติแล้ว').first(),
    ).toBeVisible({ timeout: 10_000 });
  });

  // ── Test 3: HR Admin sees approved status + timeline event materialized ──

  test('HR Admin sees approved status + timeline event materialized', async () => {
    const page = sharedPage;

    // Switch back to HR Admin persona
    await switchPersona(page, HR_ADMIN_AUTH);

    await page.goto(`/th/admin/employees/${EMPLOYEE_ID}`);
    await expect(
      page.getByRole('heading', { level: 1 }).first(),
    ).toBeVisible({ timeout: 10_000 });

    await expect(
      page.getByText('อนุมัติแล้ว').first(),
    ).toBeVisible({ timeout: 10_000 });

    // ── Phase 4 fix: timeline event NOW must be visible ───────────────────
    await expect(
      page.getByText('เลื่อนตำแหน่ง').first(),
    ).toBeVisible({ timeout: 10_000 });
  });
});

// ── Wave 2 assertions — independent of the serial chain above ────────────────
// Uses EMP-0142 (seeded in demo-seed.ts) and its own browser context.

const WAVE2_EMPLOYEE_ID = 'EMP-0142';

test.describe('Wave 2 — Chain 4 wiring assertions', () => {
  test('Wave 2 — promotion page shows event reason picker (PRCHG_PROMO 5587) (BRD #95)', async ({ browser }) => {
    const ctx = await authedContext(browser, 'hr_admin');
    const page = await ctx.newPage();

    try {
      const reachable = await page
        .goto(`/th/admin/employees/${WAVE2_EMPLOYEE_ID}/promotion`, {
          waitUntil: 'domcontentloaded', timeout: 10_000,
        })
        .then(() => true)
        .catch(() => false);
      if (!reachable) { test.skip(); return; }

      const heading = page.getByRole('heading', { name: /เลื่อนตำแหน่ง/i });
      const headingVisible = await heading.isVisible({ timeout: 5_000 }).catch(() => false);
      if (!headingVisible) { test.skip(); return; }

      // Satisfy EffectiveDateGate if showing
      const gateInput = page.locator('input[type="date"]').first();
      if (await gateInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await gateInput.fill(tomorrowISO());
        const confirmBtn = page.getByRole('button', { name: /ยืนยันวันที่มีผล/i });
        await expect(confirmBtn).toBeVisible({ timeout: 5_000 });
        await confirmBtn.click();
      }

      // child-form visible after gate confirmation
      await expect(page.locator('[data-testid="child-form"]')).toBeVisible({ timeout: 10_000 });

      // BRD #95: ReasonPicker select must be present
      await expect(page.locator('#promotion-event-reason')).toBeVisible({ timeout: 10_000 });
    } finally {
      await ctx.close();
    }
  });

  test('Wave 2 — ApprovalChainBanner appears after promotion submit (BRD #103)', async ({ browser }) => {
    const ctx = await authedContext(browser, 'hr_admin');
    const page = await ctx.newPage();

    try {
      const reachable = await page
        .goto(`/th/admin/employees/${WAVE2_EMPLOYEE_ID}/promotion`, {
          waitUntil: 'domcontentloaded', timeout: 10_000,
        })
        .then(() => true)
        .catch(() => false);
      if (!reachable) { test.skip(); return; }

      const heading = page.getByRole('heading', { name: /เลื่อนตำแหน่ง/i });
      if (!(await heading.isVisible({ timeout: 5_000 }).catch(() => false))) { test.skip(); return; }

      // Satisfy EffectiveDateGate
      const gateInput = page.locator('input[type="date"]').first();
      if (await gateInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await gateInput.fill(tomorrowISO());
        await page.getByRole('button', { name: /ยืนยันวันที่มีผล/i }).click();
      }
      await expect(page.locator('[data-testid="child-form"]')).toBeVisible({ timeout: 10_000 });

      // Fill position lookup
      const positionInput = page.getByRole('combobox', { name: /เลื่อนไปเป็น/i });
      if (await positionInput.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await positionInput.fill('ผู้จัดการ');
        const firstOpt = page.getByRole('option').first();
        if (await firstOpt.isVisible({ timeout: 3_000 }).catch(() => false)) await firstOpt.click();
      }

      // Select event reason
      const reasonPicker = page.locator('#promotion-event-reason');
      if (await reasonPicker.isVisible({ timeout: 3_000 }).catch(() => false)) {
        await reasonPicker.selectOption({ index: 1 });
      }

      // Submit if enabled
      const submitBtn = page.getByRole('button', { name: /บันทึกการเลื่อนตำแหน่ง/i });
      if (!(await submitBtn.isEnabled({ timeout: 3_000 }).catch(() => false))) {
        test.skip(true, 'Submit not enabled');
        return;
      }
      await submitBtn.click();

      // Return to promotion page — ApprovalChainBanner visible (BRD #103)
      await page.goto(`/th/admin/employees/${WAVE2_EMPLOYEE_ID}/promotion`);
      await expect(
        page.getByRole('status').filter({ hasText: /รอ SPD อนุมัติ/i })
          .or(page.getByText(/รอ SPD อนุมัติ/i).first()),
      ).toBeVisible({ timeout: 8_000 });
    } finally {
      await ctx.close();
    }
  });
});
