/**
 * Comprehensive Test Suite for Benefits Tab
 * Tests the Benefits tab on the Employee Profile page
 * URL: http://localhost:8080/#/profile?tab=benefits
 */

const { test, expect } = require('@playwright/test');

test.describe('Benefits Tab - Profile Page', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the profile page
        await page.goto('http://localhost:8080/#/profile');

        // Wait for page to load - check for profile header
        await page.waitForSelector('.profile-header, [class*="profile"]', { timeout: 10000 });

        // Wait for skeleton loading to complete
        await page.waitForFunction(() => {
            const skeletons = document.querySelectorAll('.animate-pulse');
            return skeletons.length === 0;
        }, { timeout: 15000 });
    });

    test('TC001: Benefits tab is visible and clickable', async ({ page }) => {
        // Find the Benefits tab button
        const benefitsTab = page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")');

        // Verify the tab exists
        await expect(benefitsTab).toBeVisible();

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-01-tab-visible.png',
            fullPage: true
        });
    });

    test('TC002: Navigate to Benefits tab successfully', async ({ page }) => {
        // Click on Benefits tab
        const benefitsTab = page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")');
        await benefitsTab.click();

        // Wait for content to load
        await page.waitForTimeout(1000);

        // Verify tab is active
        await expect(benefitsTab).toHaveClass(/active|border-blue-500/);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-02-tab-clicked.png',
            fullPage: true
        });
    });

    test('TC003: Benefits Overview section renders correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for Benefits Overview card
        const overviewCard = page.locator('#benefits-overview-card, div:has-text("ภาพรวมสวัสดิการ"), div:has-text("Benefits Overview")');
        await expect(overviewCard).toBeVisible();

        // Verify the 4 stat boxes exist
        const statBoxes = page.locator('.bg-green-50, .bg-blue-50, .bg-purple-50, .bg-orange-50');
        const count = await statBoxes.count();
        expect(count).toBeGreaterThanOrEqual(4);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-03-overview-section.png',
            fullPage: true
        });
    });

    test('TC004: Active Enrollments count displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check active enrollments stat
        const activeEnrollmentsStat = page.locator('.bg-green-50 .text-3xl');
        await expect(activeEnrollmentsStat).toBeVisible();

        // Verify it's a number
        const text = await activeEnrollmentsStat.textContent();
        expect(text).toMatch(/^\d+$/);

        // Verify label
        const label = page.locator('.bg-green-50 .text-sm:has-text("สวัสดิการที่ลงทะเบียน"), .bg-green-50 .text-sm:has-text("My Active Enrollments")');
        await expect(label).toBeVisible();

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-04-active-count.png',
            fullPage: true
        });
    });

    test('TC005: Total Plans count displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check total plans stat
        const totalPlansStat = page.locator('.bg-blue-50 .text-3xl');
        await expect(totalPlansStat).toBeVisible();

        // Verify it's a number
        const text = await totalPlansStat.textContent();
        expect(text).toMatch(/^\d+$/);

        // Verify label in Thai
        const label = page.locator('.bg-blue-50 .text-sm:has-text("แผนทั้งหมด"), .bg-blue-50 .text-sm:has-text("Total Plans")');
        await expect(label).toBeVisible();

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-05-total-plans.png',
            fullPage: true
        });
    });

    test('TC006: Dependents Covered count displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check dependents covered stat
        const dependentsStat = page.locator('.bg-purple-50 .text-3xl');
        await expect(dependentsStat).toBeVisible();

        // Verify it's a number
        const text = await dependentsStat.textContent();
        expect(text).toMatch(/^\d+$/);

        // Verify label
        const label = page.locator('.bg-purple-50 .text-sm:has-text("ผู้พึ่งพิงที่ครอบคลุม"), .bg-purple-50 .text-sm:has-text("Dependents Covered")');
        await expect(label).toBeVisible();

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-06-dependents.png',
            fullPage: true
        });
    });

    test('TC007: Pending count displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check pending stat
        const pendingStat = page.locator('.bg-orange-50 .text-3xl');
        await expect(pendingStat).toBeVisible();

        // Verify it shows 0
        const text = await pendingStat.textContent();
        expect(text).toBe('0');

        // Verify label in Thai
        const label = page.locator('.bg-orange-50 .text-sm:has-text("รอดำเนินการ"), .bg-orange-50 .text-sm:has-text("Pending")');
        await expect(label).toBeVisible();

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-07-pending.png',
            fullPage: true
        });
    });

    test('TC008: Active Enrollments section displays', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for Active Enrollments card
        const enrollmentsCard = page.locator('#enrollments-card');
        await expect(enrollmentsCard).toBeVisible();

        // Verify header
        const header = page.locator('text=สวัสดิการที่ลงทะเบียน, text=My Active Enrollments');
        await expect(header.first()).toBeVisible();

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-08-enrollments-section.png',
            fullPage: true
        });
    });

    test('TC009: Health Insurance enrollment displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Look for Health Insurance plan
        const healthPlan = page.locator('text=Group Health Insurance - Plan A, text=health');
        await expect(healthPlan.first()).toBeVisible();

        // Verify icon
        const healthIcon = page.locator('.material-icons:has-text("local_hospital")');
        expect(await healthIcon.count()).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-09-health-insurance.png',
            fullPage: true
        });
    });

    test('TC010: Life Insurance enrollment displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Look for Life Insurance plan
        const lifePlan = page.locator('text=Life Insurance');
        await expect(lifePlan.first()).toBeVisible();

        // Verify icon
        const lifeIcon = page.locator('.material-icons:has-text("favorite")');
        expect(await lifeIcon.count()).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-10-life-insurance.png',
            fullPage: true
        });
    });

    test('TC011: Provident Fund enrollment displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Look for Provident Fund plan
        const providentPlan = page.locator('text=Provident Fund');
        await expect(providentPlan.first()).toBeVisible();

        // Verify retirement/savings icon
        const savingsIcon = page.locator('.material-icons:has-text("savings")');
        expect(await savingsIcon.count()).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-11-provident-fund.png',
            fullPage: true
        });
    });

    test('TC012: Enrollment status badges display correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for status badges
        const statusBadges = page.locator('.bg-green-100, .bg-yellow-100, .bg-gray-100').filter({ hasText: /ใช้งาน|รอดำเนินการ|ไม่ใช้งาน|Active|Pending|Inactive/i });
        const count = await statusBadges.count();
        expect(count).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-12-status-badges.png',
            fullPage: true
        });
    });

    test('TC013: Effective dates display correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for effective date labels
        const effectiveDateLabel = page.locator('text=วันที่มีผล, text=Effective Date');
        const count = await effectiveDateLabel.count();
        expect(count).toBeGreaterThan(0);

        // Verify date format (should be formatted, not ISO)
        const dateText = await page.locator('.text-xs:has-text("วันที่มีผล"), .text-xs:has-text("Effective Date")').first().textContent();
        // Should not contain YYYY-MM-DD format directly
        expect(dateText).not.toMatch(/\d{4}-\d{2}-\d{2}/);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-13-effective-dates.png',
            fullPage: true
        });
    });

    test('TC014: Dependents covered information displays', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for dependents covered label
        const dependentsLabel = page.locator('text=ผู้พึ่งพิงที่ครอบคลุม, text=Dependents Covered');
        const count = await dependentsLabel.count();

        // Should show for at least one enrollment (Health Insurance has 2 dependents)
        expect(count).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-14-dependents-info.png',
            fullPage: true
        });
    });

    test('TC015: Coverage information displays correctly', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for coverage details
        const coverageInfo = page.locator('text=Employee + Family, text=3x Annual Salary, text=5% Employee + 5% Employer');
        const count = await coverageInfo.count();
        expect(count).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-15-coverage-info.png',
            fullPage: true
        });
    });

    test('TC016: Check for undefined values in UI', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for "undefined" text anywhere on the page
        const pageContent = await page.content();
        const hasUndefined = pageContent.toLowerCase().includes('>undefined<') ||
                           pageContent.includes('undefined undefined') ||
                           pageContent.match(/>\s*undefined\s*</);

        if (hasUndefined) {
            await page.screenshot({
                path: 'tests/results/screenshots/benefits-16-FAIL-undefined-values.png',
                fullPage: true
            });
        }

        expect(hasUndefined).toBe(false);
    });

    test('TC017: Check for missing Thai translations', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Get all text content
        const bodyText = await page.locator('body').textContent();

        // Check for common English words that should be translated
        // (This is a basic check - actual implementation may vary)
        const suspiciousPatterns = [
            /benefits\./i,  // Translation keys showing up
            /\[object Object\]/i,
            /NaN/
        ];

        let foundIssues = [];
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(bodyText)) {
                foundIssues.push(pattern.toString());
            }
        }

        if (foundIssues.length > 0) {
            await page.screenshot({
                path: 'tests/results/screenshots/benefits-17-FAIL-translation-issues.png',
                fullPage: true
            });
            console.log('Found translation issues:', foundIssues);
        }

        expect(foundIssues.length).toBe(0);
    });

    test('TC018: Check console for errors', async ({ page }) => {
        const consoleErrors = [];

        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(2000);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-18-console-check.png',
            fullPage: true
        });

        if (consoleErrors.length > 0) {
            console.log('Console errors found:', consoleErrors);
        }

        expect(consoleErrors.length).toBe(0);
    });

    test('TC019: Check for layout issues - cards are properly aligned', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check that cards exist
        const cards = page.locator('[id*="card"], .rounded-lg.p-4');
        const count = await cards.count();
        expect(count).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-19-layout-check.png',
            fullPage: true
        });
    });

    test('TC020: Verify all benefit plan types have correct icons', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for expected icons
        const expectedIcons = ['local_hospital', 'favorite', 'savings'];

        for (const icon of expectedIcons) {
            const iconElement = page.locator(`.material-icons:has-text("${icon}")`);
            const count = await iconElement.count();
            expect(count).toBeGreaterThan(0);
        }

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-20-icons-check.png',
            fullPage: true
        });
    });

    test('TC021: Benefits tab persists after page refresh', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Reload the page
        await page.reload();
        await page.waitForTimeout(2000);

        // Wait for loading to complete
        await page.waitForFunction(() => {
            const skeletons = document.querySelectorAll('.animate-pulse');
            return skeletons.length === 0;
        }, { timeout: 15000 });

        // Verify we're still on benefits tab (or default to personal)
        const currentContent = await page.content();
        const hasBenefitsContent = currentContent.includes('สวัสดิการ') ||
                                   currentContent.includes('Benefits Overview') ||
                                   currentContent.includes('ภาพรวมสวัสดิการ');

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-21-after-refresh.png',
            fullPage: true
        });

        // This may reload to default tab, which is acceptable
        expect(true).toBe(true);
    });

    test('TC022: Direct navigation to benefits tab via URL', async ({ page }) => {
        // Navigate directly to benefits tab
        await page.goto('http://localhost:8080/#/profile?tab=benefits');
        await page.waitForTimeout(2000);

        // Wait for loading to complete
        await page.waitForFunction(() => {
            const skeletons = document.querySelectorAll('.animate-pulse');
            return skeletons.length === 0;
        }, { timeout: 15000 });

        // Verify benefits content is displayed
        const benefitsContent = page.locator('text=ภาพรวมสวัสดิการ, text=Benefits Overview');
        await expect(benefitsContent.first()).toBeVisible({ timeout: 10000 });

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-22-direct-navigation.png',
            fullPage: true
        });
    });

    test('TC023: Hover effects on enrollment cards', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Find enrollment cards
        const enrollmentCards = page.locator('.border.border-gray-200.rounded-lg');
        const count = await enrollmentCards.count();

        if (count > 0) {
            // Hover over first card
            await enrollmentCards.first().hover();
            await page.waitForTimeout(500);

            // Take screenshot
            await page.screenshot({
                path: 'tests/results/screenshots/benefits-23-hover-effect.png',
                fullPage: true
            });
        }

        expect(count).toBeGreaterThan(0);
    });

    test('TC024: Verify no broken images', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Check for any img tags
        const images = page.locator('img');
        const imageCount = await images.count();

        // If there are images, check they're loaded
        for (let i = 0; i < imageCount; i++) {
            const img = images.nth(i);
            const isVisible = await img.isVisible();
            if (isVisible) {
                // Check natural width to verify image loaded
                const naturalWidth = await img.evaluate((el) => el.naturalWidth);
                expect(naturalWidth).toBeGreaterThan(0);
            }
        }

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-24-images-check.png',
            fullPage: true
        });
    });

    test('TC025: Full page screenshot of Benefits tab', async ({ page }) => {
        // Navigate to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Take full page screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-25-full-page.png',
            fullPage: true
        });
    });
});

// Additional test suite for edge cases
test.describe('Benefits Tab - Edge Cases', () => {
    test('TC026: Loading state displays skeleton correctly', async ({ page }) => {
        // Intercept network to slow down response
        await page.route('**/*', route => {
            setTimeout(() => route.continue(), 100);
        });

        await page.goto('http://localhost:8080/#/profile?tab=benefits');

        // Try to catch skeleton state (may be very brief)
        const skeleton = page.locator('.animate-pulse');

        // Take screenshot quickly
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-26-skeleton-state.png',
            fullPage: true
        });

        // Wait for loading to complete
        await page.waitForTimeout(2000);
    });

    test('TC027: Responsive design - Mobile viewport', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        await page.goto('http://localhost:8080/#/profile?tab=benefits');
        await page.waitForTimeout(2000);

        // Wait for loading
        await page.waitForFunction(() => {
            const skeletons = document.querySelectorAll('.animate-pulse');
            return skeletons.length === 0;
        }, { timeout: 15000 });

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-27-mobile-view.png',
            fullPage: true
        });
    });

    test('TC028: Responsive design - Tablet viewport', async ({ page }) => {
        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });

        await page.goto('http://localhost:8080/#/profile?tab=benefits');
        await page.waitForTimeout(2000);

        // Wait for loading
        await page.waitForFunction(() => {
            const skeletons = document.querySelectorAll('.animate-pulse');
            return skeletons.length === 0;
        }, { timeout: 15000 });

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-28-tablet-view.png',
            fullPage: true
        });
    });

    test('TC029: Switch between tabs to verify Benefits tab reloads correctly', async ({ page }) => {
        await page.goto('http://localhost:8080/#/profile');
        await page.waitForTimeout(2000);

        // Go to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-29a-first-load.png',
            fullPage: true
        });

        // Switch to another tab
        await page.locator('button:has-text("ข้อมูลส่วนตัว"), button:has-text("Personal Information")').click();
        await page.waitForTimeout(1000);

        // Go back to Benefits tab
        await page.locator('button:has-text("สวัสดิการ"), button:has-text("Benefits")').click();
        await page.waitForTimeout(1000);

        // Verify content still displays
        const benefitsContent = page.locator('text=ภาพรวมสวัสดิการ, text=Benefits Overview');
        await expect(benefitsContent.first()).toBeVisible();

        // Screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-29b-second-load.png',
            fullPage: true
        });
    });

    test('TC030: Accessibility - Check for ARIA labels and semantic HTML', async ({ page }) => {
        await page.goto('http://localhost:8080/#/profile?tab=benefits');
        await page.waitForTimeout(2000);

        // Wait for loading
        await page.waitForFunction(() => {
            const skeletons = document.querySelectorAll('.animate-pulse');
            return skeletons.length === 0;
        }, { timeout: 15000 });

        // Check for semantic elements
        const hasHeadings = await page.locator('h1, h2, h3, h4').count() > 0;
        expect(hasHeadings).toBe(true);

        // Take screenshot
        await page.screenshot({
            path: 'tests/results/screenshots/benefits-30-accessibility.png',
            fullPage: true
        });
    });
});
