import { test, expect } from '@playwright/test';
import { authedContext } from './helpers/storage-auth.helper';

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Build a Zustand persist wrapper `{ state, version: 0 }` for localStorage.
 */
function zustandPersistedState<T>(state: T): string {
  return JSON.stringify({ state, version: 0 });
}

/**
 * Seed the hire-wizard-draft localStorage key with a fully-valid 3-step
 * formData so the wizard renders at step 3 with Submit enabled.
 */
async function seedWizardAtReviewStep(page: import('@playwright/test').Page): Promise<void> {
  const draft = zustandPersistedState({
    currentStep: 3,
    maxUnlockedStep: 3,
    lastSavedAt: Date.now(),
    employeeClassToggle: 'PERMANENT',
    formData: {
      identity: {
        hireDate: '2026-05-01',
        companyCode: 'CEN',
        eventReason: 'NEW_HIRE',
        salutationEn: 'Mr.',
        firstNameEn: 'Somchai',
        middleNameEn: '',
        lastNameEn: 'Jaidee',
        dateOfBirth: '1990-01-15',
        countryOfBirth: 'TH',
        regionOfBirth: '',
        age: 36,
        employeeId: 'EMP-TEST-01',
        nationalIdCardType: 'NATIONAL_ID',
        country: 'TH',
        nationalId: '1234567890123',
        issueDate: '2020-01-01',
        expiryDate: '2030-01-01',
        isPrimary: 'true',
        vnIssuePlace: '',
        salutationLocal: 'นาย',
      },
      biographical: {
        otherTitleTh: 'นาย',
        firstNameLocal: 'สมชาย',
        lastNameLocal: 'ใจดี',
        middleNameLocal: '-',
        nickname: 'ชาย',
        militaryStatus: 'EXEMPT',
        gender: 'MALE',
        nationality: 'TH',
        foreigner: 'N',
        bloodType: 'O',
        maritalStatus: 'SINGLE',
        maritalStatusSince: '2020-01-01',
      },
      review: {
        salutationEnReview: 'Mr.',
        firstNameEnReview: 'Somchai',
        lastNameEnReview: 'Jaidee',
        middleNameEnReview: '',
        attachmentName: null,
      },
      contact: {
        phones: [{ type: 'mobile', value: '0812345678', isPrimary: true }],
        emails: [{ type: 'personal', value: 'somchai.test@humi.test', isPrimary: true }],
        jobRelationships: [],
      },
      name: { firstNameTh: 'สมชาย', lastNameTh: 'ใจดี', firstNameEn: 'Somchai', lastNameEn: 'Jaidee' },
      employeeInfo: {
        employeeClass: 'PERMANENT',
        originalStartDate: '',
        seniorityStartDate: '',
        retirementDate: '',
        pfServiceDate: '',
        dvtPreviousId: '',
        cgPreviousEmployeeId: '',
      },
      nationalId: { value: '1234567890123' },
      personal: { addressLine1: '123 Test Street' },
      job: {
        position: 'Software Engineer',
        businessUnit: null,
        businessUnitLabel: null,
        branch: null,
        branchLabel: null,
        jobCode: null,
        jobLabel: null,
        jobGrade: null,
        jobGradeLabel: null,
        storeBranchCode: null,
        hrDistrict: null,
        workSchedule: '',
        holidayTypeCondition: '',
        timeManagementStatus: '',
        otFlag: '',
        standardWeeklyHours: 40,
        dailyWorkingHours: 8,
        workingDaysPerWeek: 5,
        fte: 1,
        holidayCalendar: '',
        timeProfile: '',
        timeRecordingVariant: '',
      },
      compensation: { baseSalary: 50000 },
    },
  });
  await page.evaluate((v) => localStorage.setItem('hire-wizard-draft', v), draft);
}

/**
 * Seed the humi-hire-audit localStorage key with one canonical entry so that
 * HRBP report tests never depend on the HR Admin test having run first.
 */
async function seedHireAudit(page: import('@playwright/test').Page): Promise<void> {
  const audit = zustandPersistedState({
    entries: [
      {
        id: 'HA-20260501-120000-TEST',
        candidateName: 'สมชาย ใจดี',
        position: 'Software Engineer',
        company: 'CEN',
        hireDate: '2026-05-01',
        hrbpEmail: 'hrbp@humi.test',
        hrAdminName: 'Narong Prasert',
        hrAdminId: 'HRA001',
        sentAt: '2026-05-01T05:00:00.000Z',
      },
    ],
  });
  await page.evaluate((v) => localStorage.setItem('humi-hire-audit', v), audit);
}

/** Clear all humi-* localStorage keys except humi-auth. */
async function clearNonAuthStorage(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(() => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('humi-') && k !== 'humi-auth')
      .forEach((k) => localStorage.removeItem(k));
  });
}

// ── Test suite ────────────────────────────────────────────────────────────────

test.describe.serial('Chain 2 — Hire → HRBP audit panel (BRD #109)', () => {
  // ── Test 1: HR Admin completes a hire; audit entry appended ──────────────

  test('HR Admin completes a hire (audit entry appended)', async ({ browser }) => {
    const ctx = await authedContext(browser, 'hr_admin');
    const page = await ctx.newPage();

    try {
      // Skip if dev server is unreachable
      const reachable = await page
        .goto('/th/admin/hire', { waitUntil: 'domcontentloaded', timeout: 10_000 })
        .then(() => true)
        .catch(() => false);
      if (!reachable) {
        test.skip();
        return;
      }

      // Clear audit store, then pre-seed wizard at step 3 (Review)
      await clearNonAuthStorage(page);
      await page.evaluate(() => localStorage.removeItem('humi-hire-audit'));
      await seedWizardAtReviewStep(page);

      // Navigate to hire page — wizard loads seeded state (step 3, valid).
      await page.goto('/th/admin/hire');
      await page.waitForLoadState('networkidle');

      // The review step renders — confirm page heading
      await expect(
        page.getByText('เพิ่มพนักงานใหม่'),
      ).toBeVisible({ timeout: 10_000 });

      // Submit button is visible and enabled
      const submitBtn = page.getByRole('button', { name: 'บันทึกและส่ง' });
      await expect(submitBtn).toBeVisible({ timeout: 10_000 });

      // Capture audit entries count before submit
      const countBefore: number = await page.evaluate(() => {
        const raw = localStorage.getItem('humi-hire-audit');
        if (!raw) return 0;
        try {
          const parsed = JSON.parse(raw);
          return (parsed?.state?.entries ?? []).length;
        } catch {
          return 0;
        }
      });

      await submitBtn.click();

      // Poll localStorage for the new audit entry (up to 5 s).
      await expect
        .poll(
          async () => {
            const raw: string | null = await page.evaluate(() =>
              localStorage.getItem('humi-hire-audit'),
            );
            if (!raw) return 0;
            try {
              const parsed = JSON.parse(raw);
              return (parsed?.state?.entries ?? []).length;
            } catch {
              return 0;
            }
          },
          { timeout: 5_000, intervals: [200] },
        )
        .toBeGreaterThan(countBefore);

      // Verify the new entry has expected fields
      const entries: Array<{ candidateName: string; position: string }> =
        await page.evaluate(() => {
          const raw = localStorage.getItem('humi-hire-audit');
          if (!raw) return [];
          try {
            return JSON.parse(raw)?.state?.entries ?? [];
          } catch {
            return [];
          }
        });

      expect(entries.length).toBeGreaterThan(0);
      const latest = entries[0];
      expect(latest.candidateName).toBeTruthy();
      expect(latest.position).toBeTruthy();
    } finally {
      await ctx.close();
    }
  });

  // ── Test 2: HRBP sees audit row; no approve/reject buttons ──────────────

  test('HRBP sees audit row in hire-notifications tab; no approve/reject buttons', async ({ browser }) => {
    const ctx = await authedContext(browser, 'hrbp');
    const page = await ctx.newPage();

    try {
      // Skip if dev server is unreachable
      const reachable = await page
        .goto('/th/hrbp-reports', { waitUntil: 'domcontentloaded', timeout: 10_000 })
        .then(() => true)
        .catch(() => false);
      if (!reachable) {
        test.skip();
        return;
      }

      // Self-seed audit so this test is independent of Test 1.
      await seedHireAudit(page);

      await page.goto('/th/hrbp-reports');
      await page.waitForLoadState('networkidle');

      // Page heading should be visible
      await expect(
        page.getByText('รายงาน HRBP'),
      ).toBeVisible({ timeout: 10_000 });

      // The hire-notifications tab button (Thai locale)
      const hireNotifTab = page.getByRole('button', {
        name: 'แจ้งเตือนการจ้างงาน (SH4)',
      });
      await expect(hireNotifTab).toBeVisible({ timeout: 10_000 });

      // Click the tab
      await hireNotifTab.click();

      // Card title becomes visible
      await expect(
        page.getByText('แจ้งเตือนการจ้างงาน (SH4)').first(),
      ).toBeVisible({ timeout: 10_000 });

      // The seeded candidate row should appear
      await expect(
        page.getByText('สมชาย ใจดี'),
      ).toBeVisible({ timeout: 10_000 });

      await expect(
        page.getByText('Software Engineer'),
      ).toBeVisible({ timeout: 10_000 });

      // HRBP is informed, not an approver — no Approve/Reject buttons
      await expect(
        page.getByRole('button', { name: /approve|reject|อนุมัติ|ปฏิเสธ/i }),
      ).toHaveCount(0);
    } finally {
      await ctx.close();
    }
  });

  // ── Test 3: Hire Notifications card does NOT leak onto other tabs ────────

  test('Hire Notifications card does NOT leak onto other tabs (Phase 4 fix)', async ({ browser }) => {
    const ctx = await authedContext(browser, 'hrbp');
    const page = await ctx.newPage();

    try {
      // Skip if dev server is unreachable
      const reachable = await page
        .goto('/th/hrbp-reports', { waitUntil: 'domcontentloaded', timeout: 10_000 })
        .then(() => true)
        .catch(() => false);
      if (!reachable) {
        test.skip();
        return;
      }

      await seedHireAudit(page);

      await page.goto('/th/hrbp-reports');
      await page.waitForLoadState('networkidle');

      // Confirm the card IS visible on the hire-notifications tab
      const hireNotifTab = page.getByRole('button', {
        name: 'แจ้งเตือนการจ้างงาน (SH4)',
      });
      await expect(hireNotifTab).toBeVisible({ timeout: 10_000 });
      await hireNotifTab.click();
      await expect(
        page.getByText('สมชาย ใจดี'),
      ).toBeVisible({ timeout: 10_000 });

      // Switch to the Attendance tab — card must disappear (Phase 4 fix).
      const attendanceTab = page.getByRole('button', { name: 'การเข้างาน' });
      await expect(attendanceTab).toBeVisible({ timeout: 10_000 });
      await attendanceTab.click();

      await expect(
        page.getByText('สมชาย ใจดี'),
      ).not.toBeVisible({ timeout: 10_000 });

      // Also verify on the Leave tab
      const leaveTab = page.getByRole('button', { name: 'การลา' });
      await expect(leaveTab).toBeVisible({ timeout: 10_000 });
      await leaveTab.click();

      await expect(
        page.getByText('สมชาย ใจดี'),
      ).not.toBeVisible({ timeout: 10_000 });

      // And the Summary tab
      const summaryTab = page.getByRole('button', { name: 'สรุป' });
      await expect(summaryTab).toBeVisible({ timeout: 10_000 });
      await summaryTab.click();

      await expect(
        page.getByText('สมชาย ใจดี'),
      ).not.toBeVisible({ timeout: 10_000 });
    } finally {
      await ctx.close();
    }
  });
});
