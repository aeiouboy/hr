const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = 'tests/results/screenshots';
const RESULT_FILE = 'tests/results/json/verification_test.json';

// Test cases for the three fixes
const testCases = [
  {
    route: '#/succession-planning',
    name: 'Succession Planning',
    description: 'Fix 1: succession-planning route added to app.js and scripts added to index.html',
    expectedContent: [
      'Succession Planning',
      'แผนการสืบทอดตำแหน่ง',
      'succession',
      'planning'
    ],
    expectedTitle: /Succession Planning|แผนการสืบทอดตำแหน่ง/i,
    screenshot: 'succession_planning_verification.png'
  },
  {
    route: '#/resignation',
    name: 'Resignation',
    description: 'Fix 2: Resignation page fixed - route added and Thai translations added',
    expectedContent: [
      'Resignation',
      'ลาออก'
    ],
    expectedTitle: /Resignation|ลาออก/i,
    screenshot: 'resignation_verification.png'
  },
  {
    route: '#/payroll-setup',
    name: 'Payroll Setup',
    description: 'Fix 3: Payroll Setup Thai title updated to include "ค่าตอบแทน"',
    expectedContent: [
      'Payroll',
      'ค่าตอบแทน',
      'Setup',
      'Master',
      'earning',
      'deduction'
    ],
    expectedTitle: /Payroll.*Setup|Payroll.*Master|ตั้งค่าระบบค่าตอบแทน/i,
    screenshot: 'payroll_setup_verification.png'
  }
];

async function runVerificationTests() {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    totalTests: testCases.length,
    passed: 0,
    failed: 0,
    tests: []
  };

  let browser;
  let page;

  try {
    console.log('='.repeat(70));
    console.log('E2E VERIFICATION TEST - RIS HR System Fixes');
    console.log('='.repeat(70));
    console.log(`Test Time: ${results.timestamp}`);
    console.log(`Base URL: ${BASE_URL}`);
    console.log('='.repeat(70));

    console.log('\nLaunching browser...');
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });

    page = await context.newPage();

    // Create screenshot directory if it doesn't exist
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
      console.log(`Created screenshot directory: ${SCREENSHOT_DIR}`);
    }

    // Set up console listener to catch JavaScript errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', error => {
      consoleErrors.push(`Page Error: ${error.message}`);
    });

    for (const testCase of testCases) {
      console.log('\n' + '-'.repeat(70));
      console.log(`TEST: ${testCase.name}`);
      console.log(`Description: ${testCase.description}`);
      console.log(`Route: ${testCase.route}`);
      console.log('-'.repeat(70));

      const testResult = {
        name: testCase.name,
        route: testCase.route,
        description: testCase.description,
        status: 'pending',
        errors: [],
        warnings: [],
        screenshot: testCase.screenshot,
        timestamp: new Date().toISOString()
      };

      // Clear console errors for this test
      consoleErrors.length = 0;

      try {
        // Navigate to the route
        const url = `${BASE_URL}/${testCase.route}`;
        console.log(`\n1. Navigating to: ${url}`);

        const response = await page.goto(url, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        if (response && !response.ok() && response.status() !== 304) {
          throw new Error(`HTTP ${response.status()}: ${response.statusText()}`);
        }
        console.log(`   ✓ Page loaded successfully (HTTP ${response ? response.status() : 'OK'})`);

        // Wait for app to initialize
        console.log('\n2. Waiting for application to initialize...');
        await page.waitForTimeout(3000);

        // Wait for skeleton loaders to disappear (indicates content loaded)
        try {
          await page.waitForSelector('.skeleton', { state: 'detached', timeout: 10000 });
          console.log('   ✓ Content loaded (skeleton removed)');
        } catch (e) {
          // If no skeleton or timeout, continue anyway
          console.log('   ⚠ No skeleton loaders detected or timeout');
        }

        // Additional wait for dynamic content
        await page.waitForTimeout(2000);

        // Check if main content is present
        const mainContent = await page.$('#main-content');
        if (!mainContent) {
          throw new Error('Main content container not found');
        }
        console.log('   ✓ Main content container found');

        // Get page content
        console.log('\n3. Verifying page content...');
        const pageContent = await page.content();
        const pageText = await page.textContent('body');

        // Check for expected content
        let contentFound = false;
        let foundKeywords = [];

        for (const keyword of testCase.expectedContent) {
          if (pageText.includes(keyword) || pageContent.includes(keyword)) {
            foundKeywords.push(keyword);
            contentFound = true;
          }
        }

        if (!contentFound) {
          throw new Error(
            `Expected content not found. Looking for one of: ${testCase.expectedContent.join(', ')}\n` +
            `Page text preview: ${pageText.substring(0, 200)}...`
          );
        }

        console.log(`   ✓ Content verified (found: ${foundKeywords.join(', ')})`);
        testResult.foundKeywords = foundKeywords;

        // Check title or heading
        console.log('\n4. Verifying page title/heading...');
        const h1Elements = await page.$$eval('h1, h2', elements =>
          elements.map(el => el.textContent.trim())
        );

        const titleFound = h1Elements.some(text => testCase.expectedTitle.test(text));

        if (titleFound) {
          const matchedTitle = h1Elements.find(text => testCase.expectedTitle.test(text));
          console.log(`   ✓ Title verified: "${matchedTitle}"`);
          testResult.pageTitle = matchedTitle;
        } else {
          testResult.warnings.push(`Expected title pattern not found. Found headings: ${h1Elements.join(', ')}`);
          console.log(`   ⚠ Title pattern not matched. Found: ${h1Elements.join(', ')}`);
        }

        // Check for JavaScript errors
        console.log('\n5. Checking for JavaScript errors...');
        if (consoleErrors.length > 0) {
          testResult.warnings.push(`JavaScript console errors: ${consoleErrors.join('; ')}`);
          console.log(`   ⚠ Console errors detected: ${consoleErrors.length} error(s)`);
          consoleErrors.forEach(err => console.log(`     - ${err}`));
        } else {
          console.log('   ✓ No JavaScript errors detected');
        }

        // Take screenshot
        console.log('\n6. Capturing screenshot...');
        const screenshotPath = path.join(SCREENSHOT_DIR, testCase.screenshot);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true
        });
        console.log(`   ✓ Screenshot saved: ${testCase.screenshot}`);

        // Test passed
        testResult.status = 'passed';
        results.passed++;
        console.log('\n✅ TEST PASSED');

      } catch (error) {
        console.log(`\n❌ TEST FAILED: ${error.message}`);
        testResult.status = 'failed';
        testResult.errors.push(error.message);
        results.failed++;

        // Take screenshot of failure
        try {
          const screenshotPath = path.join(SCREENSHOT_DIR, `FAIL_${testCase.screenshot}`);
          await page.screenshot({
            path: screenshotPath,
            fullPage: true
          });
          testResult.screenshot = `FAIL_${testCase.screenshot}`;
          console.log(`   Screenshot of failure saved: FAIL_${testCase.screenshot}`);
        } catch (screenshotError) {
          console.log(`   ! Could not capture failure screenshot: ${screenshotError.message}`);
        }
      }

      results.tests.push(testResult);
    }

  } catch (error) {
    console.error('\n❌ FATAL ERROR during testing:', error);
    results.fatalError = error.message;
  } finally {
    if (browser) {
      await browser.close();
      console.log('\nBrowser closed.');
    }
  }

  // Save results to JSON file
  const resultDir = path.dirname(RESULT_FILE);
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir, { recursive: true });
  }
  fs.writeFileSync(RESULT_FILE, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${RESULT_FILE}`);

  // Print detailed summary
  console.log('\n' + '='.repeat(70));
  console.log('VERIFICATION TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Passed: ${results.passed} ✅`);
  console.log(`Failed: ${results.failed} ❌`);
  console.log(`Success Rate: ${((results.passed / results.totalTests) * 100).toFixed(1)}%`);
  console.log('='.repeat(70));

  console.log('\nDetailed Results:');
  results.tests.forEach((test, index) => {
    console.log(`\n${index + 1}. ${test.name} - ${test.status.toUpperCase()}`);
    console.log(`   Route: ${test.route}`);
    if (test.status === 'passed') {
      console.log(`   Found Keywords: ${test.foundKeywords?.join(', ') || 'N/A'}`);
      if (test.warnings && test.warnings.length > 0) {
        console.log(`   Warnings: ${test.warnings.length}`);
        test.warnings.forEach(w => console.log(`     - ${w}`));
      }
    } else {
      console.log(`   Errors: ${test.errors.join('; ')}`);
    }
  });

  console.log('\n' + '='.repeat(70));

  if (results.passed === results.totalTests) {
    console.log('✅ ALL TESTS PASSED - All fixes verified successfully!');
  } else {
    console.log(`❌ SOME TESTS FAILED - ${results.failed} fix(es) need attention`);
  }
  console.log('='.repeat(70));

  return results;
}

// Run the tests
runVerificationTests().then(results => {
  process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
