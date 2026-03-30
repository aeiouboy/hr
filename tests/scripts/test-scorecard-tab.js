const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = 'tests/results/screenshots';
const RESULT_FILE = 'tests/results/json/scorecard_test.json';

/**
 * Comprehensive test for Scorecard tab on profile page
 */
async function runScorecardTests() {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    testTarget: 'Profile Scorecard Tab',
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
    console.log('SCORECARD TAB COMPREHENSIVE TEST');
    console.log('='.repeat(80));
    console.log('Starting browser...\n');

    browser = await chromium.launch({
      headless: true, // Run in headless mode for automation
      slowMo: 50 // Slow down actions slightly
    });

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      locale: 'th-TH' // Set Thai locale
    });

    page = await context.newPage();

    // Enable console logging
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        // Treat 404 errors for static resources as warnings, not failures
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

      // Check if profile page loaded
      const profileHeader = await page.locator('.profile-header, [class*="profile"]').count();
      if (profileHeader === 0) {
        throw new Error('Profile page did not load - no profile header found');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_01_profile_page.png');
      return { success: true, screenshot };
    });
    results.tests.push(test1);
    results.totalTests++;
    if (test1.status === 'passed') results.passed++; else results.failed++;

    // Test 2: Switch to Scorecard Tab
    console.log('\n[TEST 2] Switching to Scorecard Tab...');
    const test2 = await runTest('Switch to Scorecard Tab', async () => {
      // Wait for tabs to be visible
      await page.waitForTimeout(1000);

      // Try to find and click the Scorecard tab
      const scorecardTabSelectors = [
        'text=Scorecard',
        'text=สกอร์การ์ด',
        '[data-tab="scorecard"]',
        '#profile-tabs a[href*="scorecard"]',
        '.tab:has-text("Scorecard")',
        '.tab:has-text("สกอร์การ์ด")'
      ];

      let tabClicked = false;
      for (const selector of scorecardTabSelectors) {
        try {
          const tab = page.locator(selector).first();
          if (await tab.isVisible({ timeout: 2000 })) {
            await tab.click();
            tabClicked = true;
            console.log(`  ✓ Clicked tab using selector: ${selector}`);
            break;
          }
        } catch (e) {
          // Try next selector
        }
      }

      if (!tabClicked) {
        // Try navigating directly
        await page.goto(`${BASE_URL}/#/profile?tab=scorecard`, { waitUntil: 'networkidle' });
        console.log('  ✓ Navigated directly to scorecard tab via URL');
      }

      await page.waitForTimeout(2000);
      const screenshot = await takeScreenshot(page, 'scorecard_02_tab_loaded.png');
      return { success: true, screenshot };
    });
    results.tests.push(test2);
    results.totalTests++;
    if (test2.status === 'passed') results.passed++; else results.failed++;

    // Test 3: Verify CG Competency Section
    console.log('\n[TEST 3] Verifying CG Competency Section...');
    const test3 = await runTest('CG Competency Section', async () => {
      const issues = [];

      // Check for competency card
      const competencyCard = await page.locator('#competencies-card, [id*="competenc"]').count();
      if (competencyCard === 0) {
        issues.push('CG Competency card not found');
      }

      // Check for Thai translation
      const hasThaiCompetency = await page.locator('text=/ขับเคลื่อน|พัฒนา|นำนวัตกรรม/').count();
      if (hasThaiCompetency === 0) {
        issues.push('Thai competency names not displayed');
      }

      // Check for rating badges
      const ratingBadges = await page.locator('[class*="star"], .material-icons:has-text("star")').count();
      if (ratingBadges === 0) {
        issues.push('Rating badges not found');
      }

      // Check for undefined values
      const undefinedText = await page.locator('text=undefined').count();
      if (undefinedText > 0) {
        issues.push(`Found ${undefinedText} undefined values`);
      }

      const screenshot = await takeScreenshot(page, 'scorecard_03_competencies.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test3);
    results.totalTests++;
    if (test3.status === 'passed') results.passed++; else results.failed++;

    // Test 4: Verify Assessment History Section
    console.log('\n[TEST 4] Verifying Assessment History Section...');
    const test4 = await runTest('Assessment History Section', async () => {
      const issues = [];

      // Scroll to assessment history
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for assessment history card
      const assessmentCard = await page.locator('#assessment-history-card, [id*="assessment"]').count();
      if (assessmentCard === 0) {
        issues.push('Assessment History card not found');
      }

      // Check for Thai translations
      const hasThaiAssessment = await page.locator('text=/ประเมิน|กลางปี/').count();
      if (hasThaiAssessment === 0) {
        issues.push('Thai assessment history not displayed');
      }

      // Check for dates
      const hasDates = await page.locator('text=/202[0-9]/').count();
      if (hasDates === 0) {
        issues.push('Assessment dates not found');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_04_assessment_history.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test4);
    results.totalTests++;
    if (test4.status === 'passed') results.passed++; else results.failed++;

    // Test 5: Verify Assessment Summary Section
    console.log('\n[TEST 5] Verifying Assessment Summary Section...');
    const test5 = await runTest('Assessment Summary Section', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for overall rating display
      const hasRating = await page.locator('text=/[0-9]\.[0-9]\/5\.0/').count();
      if (hasRating === 0) {
        issues.push('Overall rating not displayed');
      }

      // Check for rating label
      const hasRatingLabel = await page.locator('text=/Exceeds|เกิน/').count();
      if (hasRatingLabel === 0) {
        issues.push('Rating label not found');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_05_assessment_summary.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test5);
    results.totalTests++;
    if (test5.status === 'passed') results.passed++; else results.failed++;

    // Test 6: Verify Key Successes Section
    console.log('\n[TEST 6] Verifying Key Successes Section...');
    const test6 = await runTest('Key Successes Section', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for success items
      const hasSuccesses = await page.locator('.material-icons:has-text("emoji_events")').count();
      if (hasSuccesses === 0) {
        issues.push('Key successes icons not found');
      }

      // Check for impact badges
      const hasImpactBadges = await page.locator('text=/High|Medium|Low|สูง|กลาง|ต่ำ/').count();
      if (hasImpactBadges === 0) {
        issues.push('Impact badges not displayed');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_06_key_successes.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test6);
    results.totalTests++;
    if (test6.status === 'passed') results.passed++; else results.failed++;

    // Test 7: Verify Strengths & Development Areas
    console.log('\n[TEST 7] Verifying Strengths & Development Areas...');
    const test7 = await runTest('Strengths & Development Areas', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for strengths section
      const hasStrengths = await page.locator('.material-icons:has-text("check_circle"), .material-icons:has-text("thumb_up")').count();
      if (hasStrengths === 0) {
        issues.push('Strengths section icons not found');
      }

      // Check for development areas
      const hasDevelopment = await page.locator('.material-icons:has-text("trending_up"), .material-icons:has-text("insights")').count();
      if (hasDevelopment === 0) {
        issues.push('Development areas icons not found');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_07_strengths_development.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test7);
    results.totalTests++;
    if (test7.status === 'passed') results.passed++; else results.failed++;

    // Test 8: Verify Career Aspirations Section
    console.log('\n[TEST 8] Verifying Career Aspirations Section...');
    const test8 = await runTest('Career Aspirations Section', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for short-term and long-term goals
      const hasGoals = await page.locator('.material-icons:has-text("near_me"), .material-icons:has-text("stars"), .material-icons:has-text("rocket_launch")').count();
      if (hasGoals === 0) {
        issues.push('Career aspiration icons not found');
      }

      // Check for timeframe
      const hasTimeframe = await page.locator('text=/timeframe|กรอบเวลา|1-2 years|3-5 years/i').count();
      if (hasTimeframe === 0) {
        issues.push('Timeframe information not displayed');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_08_career_aspirations.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test8);
    results.totalTests++;
    if (test8.status === 'passed') results.passed++; else results.failed++;

    // Test 9: Verify Development Objectives Section
    console.log('\n[TEST 9] Verifying Development Objectives Section...');
    const test9 = await runTest('Development Objectives Section', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for progress bars
      const hasProgressBars = await page.locator('[style*="width:"]').count();
      if (hasProgressBars === 0) {
        issues.push('Progress bars not found');
      }

      // Check for target dates
      const hasTargetDates = await page.locator('text=/target|เป้าหมาย/i').count();
      if (hasTargetDates === 0) {
        issues.push('Target date labels not found');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_09_development_objectives.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test9);
    results.totalTests++;
    if (test9.status === 'passed') results.passed++; else results.failed++;

    // Test 10: Verify Talent Reference Section
    console.log('\n[TEST 10] Verifying Talent Reference Section...');
    const test10 = await runTest('Talent Reference Section', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for talent pool information
      const hasTalentInfo = await page.locator('text=/talent|พรสวรรค์|ความสามารถ/i').count();
      if (hasTalentInfo === 0) {
        issues.push('Talent information not found');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_10_talent_reference.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test10);
    results.totalTests++;
    if (test10.status === 'passed') results.passed++; else results.failed++;

    // Test 11: Verify Performance-Potential Matrix (9-Box)
    console.log('\n[TEST 11] Verifying Performance-Potential Matrix (9-Box)...');
    const test11 = await runTest('Performance-Potential Matrix', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for 9-box grid
      const hasGrid = await page.locator('.grid-cols-3, [class*="grid"]').count();
      if (hasGrid === 0) {
        issues.push('9-Box grid not found');
      }

      // Check for employee position indicator
      const hasPersonIcon = await page.locator('.material-icons:has-text("person")').count();
      if (hasPersonIcon === 0) {
        issues.push('Employee position indicator not found in matrix');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_11_9box_matrix.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test11);
    results.totalTests++;
    if (test11.status === 'passed') results.passed++; else results.failed++;

    // Test 12: Verify Final Calibration Section
    console.log('\n[TEST 12] Verifying Final Calibration Section...');
    const test12 = await runTest('Final Calibration Section', async () => {
      const issues = [];

      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(500);

      // Check for calibration rating
      const hasCalibration = await page.locator('text=/calibrat|สอบเทียบ/i').count();
      if (hasCalibration === 0) {
        issues.push('Calibration information not found');
      }

      const screenshot = await takeScreenshot(page, 'scorecard_12_final_calibration.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test12);
    results.totalTests++;
    if (test12.status === 'passed') results.passed++; else results.failed++;

    // Test 13: Full Page Screenshot and Undefined Check
    console.log('\n[TEST 13] Full Page Screenshot and Undefined Check...');
    const test13 = await runTest('Full Page Undefined Check', async () => {
      const issues = [];

      // Scroll to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);

      // Take full page screenshot
      const screenshot = await takeScreenshot(page, 'scorecard_13_full_page.png', true);

      // Check entire page for undefined values
      const bodyText = await page.textContent('body');
      const undefinedCount = (bodyText.match(/undefined/gi) || []).length;

      if (undefinedCount > 0) {
        issues.push(`Found ${undefinedCount} occurrences of 'undefined' on the page`);
      }

      // Check for null values
      const nullCount = (bodyText.match(/\bnull\b/gi) || []).length;
      if (nullCount > 0) {
        issues.push(`Found ${nullCount} occurrences of 'null' displayed on the page`);
      }

      // Check for NaN values
      const nanCount = (bodyText.match(/\bNaN\b/gi) || []).length;
      if (nanCount > 0) {
        issues.push(`Found ${nanCount} occurrences of 'NaN' on the page`);
      }

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

      // Check for missing translation keys (usually shown as keys themselves)
      const bodyText = await page.textContent('body');
      const translationKeyPattern = /scorecard\.\w+/g;
      const visibleKeys = bodyText.match(translationKeyPattern) || [];

      if (visibleKeys.length > 0) {
        issues.push(`Found ${visibleKeys.length} untranslated keys: ${[...new Set(visibleKeys)].join(', ')}`);
      }

      const screenshot = await takeScreenshot(page, 'scorecard_14_translation_check.png');

      if (issues.length > 0) {
        throw new Error(issues.join('; '));
      }

      return { success: true, screenshot };
    });
    results.tests.push(test14);
    results.totalTests++;
    if (test14.status === 'passed') results.passed++; else results.failed++;

    // Test 15: UI Responsiveness Check
    console.log('\n[TEST 15] Testing UI Responsiveness...');
    const test15 = await runTest('UI Responsiveness', async () => {
      const issues = [];

      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);

      const mobileScreenshot = await takeScreenshot(page, 'scorecard_15_mobile.png');

      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(1000);

      const tabletScreenshot = await takeScreenshot(page, 'scorecard_15_tablet.png');

      // Reset to desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(1000);

      return { success: true, screenshots: [mobileScreenshot, tabletScreenshot] };
    });
    results.tests.push(test15);
    results.totalTests++;
    if (test15.status === 'passed') results.passed++; else results.failed++;

  } catch (error) {
    console.error('\n[FATAL ERROR]', error.message);
    results.fatalError = error.message;
    results.fatalErrorStack = error.stack;
  } finally {
    if (page) {
      // Take final screenshot
      try {
        await takeScreenshot(page, 'scorecard_final_state.png', true);
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
    console.log(`  ✓ PASSED`);
  } catch (error) {
    test.status = 'failed';
    test.error = error.message;
    test.errorStack = error.stack;
    console.log(`  ✗ FAILED: ${error.message}`);
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
  console.log(`  📸 Screenshot: ${filename}`);
  return filename;
}

/**
 * Print test summary
 */
function printSummary(results) {
  console.log('\n' + '='.repeat(80));
  console.log('SCORECARD TAB TEST SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Tests:    ${results.totalTests}`);
  console.log(`Passed:         ${results.passed} ✓`);
  console.log(`Failed:         ${results.failed} ✗`);
  console.log(`Warnings:       ${results.warnings} ⚠`);
  console.log(`Success Rate:   ${((results.passed / results.totalTests) * 100).toFixed(1)}%`);
  console.log('='.repeat(80));

  if (results.failed > 0) {
    console.log('\nFAILED TESTS:');
    results.tests.filter(t => t.status === 'failed').forEach(t => {
      console.log(`  ✗ ${t.name}`);
      console.log(`    Error: ${t.error}`);
    });
  }

  console.log(`\nResults saved to: ${RESULT_FILE}`);
  console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`);
  console.log('='.repeat(80));
}

// Run the tests
runScorecardTests().then(results => {
  process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
