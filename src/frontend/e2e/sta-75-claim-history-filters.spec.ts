import { expect, test, type Page } from '@playwright/test';

const NAV_TIMEOUT_MS = 15_000;
const SCREENSHOT_PATH = 'e2e/screenshots/sta-75/claim-history-filters.png';

async function loginAsEmployee(page: Page) {
  await page.goto('/th/login', { timeout: NAV_TIMEOUT_MS });
  await page.waitForLoadState('domcontentloaded');
  await page.getByLabel(/email|อีเมล/i).fill('employee@humi.test');
  await page.getByLabel(/password|รหัส/i).fill('employee2026');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ', exact: true }).click();
  await page.waitForURL((url) => !url.pathname.endsWith('/login'), { timeout: NAV_TIMEOUT_MS });
  await page.waitForLoadState('networkidle');
}

test.describe('STA-75 claim history filters (live UI)', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('filters claim history by search text and submitted date range', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(error.message));

    await loginAsEmployee(page);
    await page.goto('/th/benefits-hub', { timeout: NAV_TIMEOUT_MS });
    await page.getByRole('tab', { name: 'ประวัติการเบิก' }).click();

    const table = page.getByRole('table', { name: 'ประวัติการเบิกค่าใช้จ่าย' });
    await expect(table).toBeVisible();
    await expect(table).toContainText('ค่ารักษาพยาบาล');
    await expect(table).toContainText('ค่าน้ำมันรถ');
    await expect(table).toContainText('ค่าโทรศัพท์');
    await expect(table).toContainText('ค่าทันตกรรม');

    await page.getByLabel('ค้นหา / Search bar').fill('ค่ารักษาพยาบาล');
    await expect(table).toContainText('รพ.บำรุงราษฎร์');
    await expect(table).toContainText('บีเอ็นเอชคลินิก');
    await expect(table).not.toContainText('ค่าน้ำมันรถ');
    await expect(table).not.toContainText('ค่าโทรศัพท์');

    await page.getByLabel('วันที่เริ่มต้น / Start Date').fill('2026-04-16');
    await expect(table).toContainText('บีเอ็นเอชคลินิก');
    await expect(table).not.toContainText('รพ.บำรุงราษฎร์');

    await page.getByLabel('วันที่สิ้นสุด / End Date').fill('2026-04-20');
    await expect(page.getByText('ไม่พบประวัติการเบิก')).toBeVisible();
    await expect(page.getByText('บีเอ็นเอชคลินิก')).not.toBeVisible();

    await page.getByRole('button', { name: 'ล้างตัวกรอง' }).click();
    const resetTable = page.getByRole('table', { name: 'ประวัติการเบิกค่าใช้จ่าย' });
    await expect(resetTable).toContainText('ค่าทันตกรรม');
    await expect(resetTable).toContainText('ค่าโทรศัพท์');

    await page.screenshot({ path: SCREENSHOT_PATH, fullPage: true });

    const realErrors = consoleErrors.filter(
      (msg) =>
        !msg.includes('404 (Not Found)') &&
        !msg.includes("Performance': '") &&
        !msg.includes('cannot have a negative time stamp'),
    );
    expect(realErrors, `unexpected console errors: ${JSON.stringify(realErrors, null, 2)}`).toEqual([]);
  });
});
