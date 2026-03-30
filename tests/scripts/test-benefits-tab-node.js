const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = 'tests/results/screenshots';
const RESULT_FILE = 'tests/results/json/benefits_tab_test.json';

/**
 * Comprehensive test for Benefits tab on profile page
 */
async function runBenefitsTests() {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    testTarget: 'Profile Benefits Tab',
    totalTests: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: [],
    screenshots: []
  };

  let browser;
  let page;

  try {
    console.log('='.repeat(80));
    console.log('BENEFITS TAB COMPREHENSIVE TEST');
    console.log('='.repeat(80));
    console.log('Starting browser...\n');

    browser = await chromium.launch({
      headless: true,
      slowMo: 50
    });

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      locale: 'th-TH'
    });

    page = await context.newPage();

    // Enable console logging
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        const is404Error = text.includes('404') || text.includes('File not found') || text.includes('favicon');
        if (is404Error) {
          console.log(`  [BROWSER WARNING] ${text}`);
          results.warnings++;
        } else {
          console.log(`  [BROWSER ERROR] ${text}`);
          results.tests.push({
            name: 'JavaScript Console Error',
            status: 'failed',
            error: text,
            timestamp: new Date().toISOString()
          });
          results.failed++;
        }
      } else if (type === 'warning') {
        console.log(`  [BROWSER WARNING] ${text}`);
        results.warnings++;
      }
    });

    // Create screenshot directory
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }

    // Test 1: Navigate to Profile Page
    console.log('\n[TEST 1] Navigating to Profile Page...');
    const test1 = await runTest('Navigate to Profile Page', async () => {
      await page.goto(`${BASE_URL}/#/profile`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const profileHeader = await page.locator('.profile-header, [class*="profile"]').count();
      if (profileHeader === 0) {
        throw new Error('Profile page did not load - no profile header found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_01_profile_page.png');
      return { success: true, screenshot };
    });
    results.tests.push(test1);
    results.totalTests++;
    if (test1.status === 'passed') results.passed++; else results.failed++;

    // Test 2: Switch to Benefits Tab
    console.log('\n[TEST 2] Switching to Benefits Tab...');
    const test2 = await runTest('Switch to Benefits Tab', async () => {
      await page.waitForTimeout(1000);

      const benefitsTabSelectors = [
        'button:has-text("Benefits")',
        'button:has-text("สวัสดิการ")',
        '[data-tab="benefits"]',
        '.tab:has-text("Benefits")',
        '.tab:has-text("สวัสดิการ")'
      ];

      let tabClicked = false;
      for (const selector of benefitsTabSelectors) {
        try {
          const tab = page.locator(selector).first();
          if (await tab.isVisible({ timeout: 2000 })) {
            await tab.click();
            tabClicked = true;
            console.log(`  Clicked tab using selector: ${selector}`);
            break;
          }
        } catch (e) {
          // Try next selector
        }
      }

      if (!tabClicked) {
        await page.goto(`${BASE_URL}/#/profile?tab=benefits`, { waitUntil: 'networkidle' });
        console.log('  Navigated directly to benefits tab via URL');
      }

      await page.waitForTimeout(2000);
      const screenshot = await takeScreenshot(page, 'benefits_02_tab_loaded.png');
      return { success: true, screenshot };
    });
    results.tests.push(test2);
    results.totalTests++;
    if (test2.status === 'passed') results.passed++; else results.failed++;

    // Test 3: Verify Benefits Overview Section
    console.log('\n[TEST 3] Verifying Benefits Overview Section...');
    const test3 = await runTest('Benefits Overview Section', async () => {
      const issues = [];

      const overviewCard = await page.locator('#benefits-overview-card, [id*="benefits-overview"]').count();
      if (overviewCard === 0) {
        issues.push('Benefits Overview card not found');
      }

      // Check for Thai translation
      const hasThaiOverview = await page.locator('text=/ภาพรวมสวัสดิการ|Benefits Overview/').count();
      if (hasThaiOverview === 0) {
        issues.push('Thai Benefits Overview header not displayed');
      }

      const screenshot = await takeScreenshot(page, 'benefits_03_overview.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test3);
    results.totalTests++;
    if (test3.status === 'passed') results.passed++; else results.failed++;

    // Test 4: Verify Statistics Cards
    console.log('\n[TEST 4] Verifying Statistics Cards...');
    const test4 = await runTest('Statistics Cards', async () => {
      const issues = [];

      // Check for 4 stat boxes (green, blue, purple, orange)
      const greenStat = await page.locator('.bg-green-50').count();
      const blueStat = await page.locator('.bg-blue-50').count();
      const purpleStat = await page.locator('.bg-purple-50').count();
      const orangeStat = await page.locator('.bg-orange-50').count();

      if (greenStat === 0) issues.push('Active Enrollments stat (green) not found');
      if (blueStat === 0) issues.push('Total Plans stat (blue) not found');
      if (purpleStat === 0) issues.push('Dependents Covered stat (purple) not found');
      if (orangeStat === 0) issues.push('Pending stat (orange) not found');

      // Check for number values
      const statNumbers = await page.locator('.text-3xl.font-bold').count();
      if (statNumbers < 4) {
        issues.push(`Expected 4 stat numbers, found ${statNumbers}`);
      }

      const screenshot = await takeScreenshot(page, 'benefits_04_stats.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test4);
    results.totalTests++;
    if (test4.status === 'passed') results.passed++; else results.failed++;

    // Test 5: Verify Active Enrollments Section
    console.log('\n[TEST 5] Verifying Active Enrollments Section...');
    const test5 = await runTest('Active Enrollments Section', async () => {
      const issues = [];

      const enrollmentsCard = await page.locator('#enrollments-card').count();
      if (enrollmentsCard === 0) {
        issues.push('Enrollments card not found');
      }

      // Check for enrollment header
      const hasEnrollmentHeader = await page.locator('text=/สวัสดิการที่ลงทะเบียน|My Active Enrollments|Active Enrollments/').count();
      if (hasEnrollmentHeader === 0) {
        issues.push('Enrollment section header not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_05_enrollments.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test5);
    results.totalTests++;
    if (test5.status === 'passed') results.passed++; else results.failed++;

    // Test 6: Verify Health Insurance Enrollment
    console.log('\n[TEST 6] Verifying Health Insurance Enrollment...');
    const test6 = await runTest('Health Insurance Enrollment', async () => {
      const issues = [];

      const healthPlan = await page.locator('text=/Group Health Insurance|Health Insurance/').count();
      if (healthPlan === 0) {
        issues.push('Health Insurance plan not found');
      }

      // Check for hospital icon
      const hospitalIcon = await page.locator('.material-icons:has-text("local_hospital")').count();
      if (hospitalIcon === 0) {
        issues.push('Health insurance hospital icon not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_06_health_insurance.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test6);
    results.totalTests++;
    if (test6.status === 'passed') results.passed++; else results.failed++;

    // Test 7: Verify Life Insurance Enrollment
    console.log('\n[TEST 7] Verifying Life Insurance Enrollment...');
    const test7 = await runTest('Life Insurance Enrollment', async () => {
      const issues = [];

      const lifePlan = await page.locator('text=/Life Insurance/').count();
      if (lifePlan === 0) {
        issues.push('Life Insurance plan not found');
      }

      // Check for heart/favorite icon
      const lifeIcon = await page.locator('.material-icons:has-text("favorite")').count();
      if (lifeIcon === 0) {
        issues.push('Life insurance heart icon not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_07_life_insurance.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test7);
    results.totalTests++;
    if (test7.status === 'passed') results.passed++; else results.failed++;

    // Test 8: Verify Provident Fund Enrollment
    console.log('\n[TEST 8] Verifying Provident Fund Enrollment...');
    const test8 = await runTest('Provident Fund Enrollment', async () => {
      const issues = [];

      const providentPlan = await page.locator('text=/Provident Fund/').count();
      if (providentPlan === 0) {
        issues.push('Provident Fund plan not found');
      }

      // Check for savings icon
      const savingsIcon = await page.locator('.material-icons:has-text("savings")').count();
      if (savingsIcon === 0) {
        issues.push('Provident Fund savings icon not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_08_provident_fund.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test8);
    results.totalTests++;
    if (test8.status === 'passed') results.passed++; else results.failed++;

    // Test 9: Verify Status Badges
    console.log('\n[TEST 9] Verifying Status Badges...');
    const test9 = await runTest('Status Badges', async () => {
      const issues = [];

      // Check for Active status badges
      const activeBadges = await page.locator('.bg-green-100').count();
      if (activeBadges === 0) {
        issues.push('Active status badges (green) not found');
      }

      // Check for Thai status text
      const hasThaiStatus = await page.locator('text=/ใช้งาน|Active/').count();
      if (hasThaiStatus === 0) {
        issues.push('Thai status text not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_09_status_badges.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test9);
    results.totalTests++;
    if (test9.status === 'passed') results.passed++; else results.failed++;

    // Test 10: Verify Effective Dates
    console.log('\n[TEST 10] Verifying Effective Dates...');
    const test10 = await runTest('Effective Dates', async () => {
      const issues = [];

      // Check for effective date labels
      const hasEffectiveDate = await page.locator('text=/วันที่มีผล|Effective Date/').count();
      if (hasEffectiveDate === 0) {
        issues.push('Effective date label not found');
      }

      // Check for event icon
      const eventIcon = await page.locator('.material-icons:has-text("event")').count();
      if (eventIcon === 0) {
        issues.push('Event/calendar icon not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_10_effective_dates.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test10);
    results.totalTests++;
    if (test10.status === 'passed') results.passed++; else results.failed++;

    // Test 11: Verify Coverage Information
    console.log('\n[TEST 11] Verifying Coverage Information...');
    const test11 = await runTest('Coverage Information', async () => {
      const issues = [];

      // Check for coverage details
      const coverageDetails = await page.locator('text=/Employee \\+ Family|3x Annual Salary|5% Employee/').count();
      if (coverageDetails === 0) {
        issues.push('Coverage details not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_11_coverage.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test11);
    results.totalTests++;
    if (test11.status === 'passed') results.passed++; else results.failed++;

    // Test 12: Verify Dependents Information
    console.log('\n[TEST 12] Verifying Dependents Information...');
    const test12 = await runTest('Dependents Information', async () => {
      const issues = [];

      // Check for dependents covered info
      const hasDependentsInfo = await page.locator('text=/ผู้พึ่งพิงที่ครอบคลุม|Dependents Covered/').count();
      if (hasDependentsInfo === 0) {
        issues.push('Dependents covered info not found');
      }

      // Check for people icon
      const peopleIcon = await page.locator('.material-icons:has-text("people")').count();
      if (peopleIcon === 0) {
        issues.push('People icon not found');
      }

      const screenshot = await takeScreenshot(page, 'benefits_12_dependents.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test12);
    results.totalTests++;
    if (test12.status === 'passed') results.passed++; else results.failed++;

    // Test 13: Check for Undefined Values
    console.log('\n[TEST 13] Checking for Undefined Values...');
    const test13 = await runTest('Undefined Values Check', async () => {
      const issues = [];

      // Scroll to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const bodyText = await page.textContent('body');
      const undefinedCount = (bodyText.match(/undefined/gi) || []).length;

      if (undefinedCount > 0) {
        issues.push(`Found ${undefinedCount} occurrences of 'undefined' on the page`);
      }

      const nullCount = (bodyText.match(/\bnull\b/gi) || []).length;
      if (nullCount > 0) {
        issues.push(`Found ${nullCount} occurrences of 'null' displayed on the page`);
      }

      const nanCount = (bodyText.match(/\bNaN\b/gi) || []).length;
      if (nanCount > 0) {
        issues.push(`Found ${nanCount} occurrences of 'NaN' on the page`);
      }

      const screenshot = await takeScreenshot(page, 'benefits_13_undefined_check.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test13);
    results.totalTests++;
    if (test13.status === 'passed') results.passed++; else results.failed++;

    // Test 14: Check Translation Completeness
    console.log('\n[TEST 14] Checking Translation Completeness...');
    const test14 = await runTest('Translation Completeness', async () => {
      const issues = [];

      const bodyText = await page.textContent('body');
      const translationKeyPattern = /benefits\.\w+/g;
      const visibleKeys = bodyText.match(translationKeyPattern) || [];

      if (visibleKeys.length > 0) {
        issues.push(`Found ${visibleKeys.length} untranslated keys: ${[...new Set(visibleKeys)].join(', ')}`);
      }

      const screenshot = await takeScreenshot(page, 'benefits_14_translation_check.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test14);
    results.totalTests++;
    if (test14.status === 'passed') results.passed++; else results.failed++;

    // Test 15: Test Mobile Responsiveness
    console.log('\n[TEST 15] Testing Mobile Responsiveness...');
    const test15 = await runTest('Mobile Responsiveness', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      const mobileScreenshot = await takeScreenshot(page, 'benefits_15_mobile.png');

      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(1000);

      const tabletScreenshot = await takeScreenshot(page, 'benefits_15_tablet.png');

      // Reset to desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(1000);

      return { success: true, screenshots: [mobileScreenshot, tabletScreenshot] };
    });
    results.tests.push(test15);
    results.totalTests++;
    if (test15.status === 'passed') results.passed++; else results.failed++;

    // Test 16: Full Page Screenshot
    console.log('\n[TEST 16] Taking Full Page Screenshot...');
    const test16 = await runTest('Full Page Screenshot', async () => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      const screenshot = await takeScreenshot(page, 'benefits_16_full_page.png', true);
      return { success: true, screenshot };
    });
    results.tests.push(test16);
    results.totalTests++;
    if (test16.status === 'passed') results.passed++; else results.failed++;

  } catch (error) {
    console.error('\n[FATAL ERROR]', error.message);
    results.fatalError = error.message;
    results.fatalErrorStack = error.stack;
  } finally {
    if (page) {
      try {
        await takeScreenshot(page, 'benefits_final_state.png', true);
      } catch (e) {
        console.log('Could not take final screenshot');
      }
    }

    if (browser) {
      await browser.close();
    }
  }

  // Save results
  const resultDir = path.dirname(RESULT_FILE);
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir, { recursive: true });
  }
  fs.writeFileSync(RESULT_FILE, JSON.stringify(results, null, 2));

  // Print summary
  printSummary(results);

  return results;
}

/**
 * Helper function to run a test
 */
async function runTest(testName, testFunction) {
  const test = {
    name: testName,
    status: 'pending',
    timestamp: new Date().toISOString(),
    duration: 0
  };

  const startTime = Date.now();

  try {
    const result = await testFunction();
    test.status = 'passed';
    test.result = result;
    if (result.screenshot) {
      test.screenshot = result.screenshot;
    }
    if (result.screenshots) {
      test.screenshots = result.screenshots;
    }
    console.log(`  PASSED`);
  } catch (error) {
    test.status = 'failed';
    test.error = error.message;
    test.errorStack = error.stack;
    console.log(`  FAILED: ${error.message}`);
  }

  test.duration = Date.now() - startTime;
  return test;
}

/**
 * Helper function to take screenshot
 */
async function takeScreenshot(page, filename, fullPage = false) {
  const screenshotPath = path.join(SCREENSHOT_DIR, filename);
  await page.screenshot({ path: screenshotPath, fullPage });
  console.log(`  Screenshot: ${filename}`);
  return filename;
}

/**
 * Print test summary
 */
function printSummary(results) {
  console.log('\n' + '='.repeat(80));
  console.log('BENEFITS TAB TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Tests:    ${results.totalTests}`);
  console.log(`Passed:         ${results.passed}`);
  console.log(`Failed:         ${results.failed}`);
  console.log(`Warnings:       ${results.warnings}`);
  console.log(`Success Rate:   ${((results.passed / results.totalTests) * 100).toFixed(1)}%`);
  console.log('='.repeat(80));

  if (results.failed > 0) {
    console.log('\nFAILED TESTS:');
    results.tests.filter(t => t.status === 'failed').forEach(t => {
      console.log(`  - ${t.name}`);
      console.log(`    Error: ${t.error}`);
    });
  }

  console.log(`\nResults saved to: ${RESULT_FILE}`);
  console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);
  console.log('='.repeat(80));
}

// Run the tests
runBenefitsTests().then(results => {
  process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
