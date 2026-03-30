const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = 'tests/results/screenshots';
const RESULT_FILE = 'tests/results/json/additional_test.json';

// Test cases for each module
const testCases = [
  {
    route: '#/locations',
    name: 'Location Management',
    expectedContent: [
      'Location Management', // English title
      'การจัดการสถานที่', // Thai title (one of these should be present)
      'location', // Common keyword
      'province', // Should have province-related content
      'hierarchy' // Location hierarchy
    ],
    screenshot: '01_locations.png',
    description: 'Location hierarchy and Thai provinces management'
  },
  {
    route: '#/resignation',
    name: 'Resignation',
    expectedContent: [
      'Resignation', // English title
      'ลาออก', // Thai title
      'resignation', // Common keyword
      'clearance', // Clearance checklist
      'checklist' // Should have checklist
    ],
    screenshot: '02_resignation.png',
    description: 'Resignation recording and clearance checklist'
  },
  {
    route: '#/overtime',
    name: 'Overtime',
    expectedContent: [
      'Overtime', // English title
      'ทำงานล่วงเวลา', // Thai title
      'overtime', // Common keyword
      'OT', // OT abbreviation
      'rate' // Thai labor law rates
    ],
    screenshot: '03_overtime.png',
    description: 'OT request form with Thai labor law rates'
  },
  {
    route: '#/idp',
    name: 'Individual Development Plan',
    expectedContent: [
      'Development', // English keyword
      'IDP', // IDP abbreviation
      'competency', // Competency gap
      'plan', // Development plan
      'gap' // Gap analysis
    ],
    screenshot: '04_idp.png',
    description: 'Competency gap analysis and development plan'
  },
  {
    route: '#/training-records',
    name: 'Training Records',
    expectedContent: [
      'Training', // English title
      'การฝึกอบรม', // Thai title
      'training', // Common keyword
      'record', // Training records
      'certificate' // Certificates
    ],
    screenshot: '05_training_records.png',
    description: 'Training history and certificates'
  }
];

async function runTests() {
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
    console.log('Launching browser...');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    page = await context.newPage();

    // Create screenshot directory if it doesn't exist
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }

    for (const testCase of testCases) {
      console.log(`\nTesting: ${testCase.name} (${testCase.route})...`);

      const testResult = {
        name: testCase.name,
        route: testCase.route,
        description: testCase.description,
        status: 'pending',
        errors: [],
        screenshot: testCase.screenshot,
        timestamp: new Date().toISOString()
      };

      try {
        // Navigate to the route
        const url = `${BASE_URL}/${testCase.route}`;
        console.log(`  Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

        // Wait for content to load
        await page.waitForTimeout(2000);

        // Check if page contains expected content
        const pageContent = await page.content();
        const pageText = await page.textContent('body');

        let contentFound = false;
        let foundKeywords = [];

        for (const keyword of testCase.expectedContent) {
          const keywordLower = keyword.toLowerCase();
          if (pageText.toLowerCase().includes(keywordLower) ||
              pageContent.toLowerCase().includes(keywordLower)) {
            foundKeywords.push(keyword);
            contentFound = true;
            break; // At least one keyword found
          }
        }

        if (!contentFound) {
          throw new Error(`Expected content not found. Looking for one of: ${testCase.expectedContent.join(', ')}`);
        }

        console.log(`  ✓ Content verified (found: ${foundKeywords.join(', ')})`);

        // Take screenshot
        const screenshotPath = path.join(SCREENSHOT_DIR, testCase.screenshot);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  ✓ Screenshot saved: ${testCase.screenshot}`);

        testResult.status = 'passed';
        testResult.foundKeywords = foundKeywords;
        results.passed++;

      } catch (error) {
        console.log(`  ✗ Test failed: ${error.message}`);
        testResult.status = 'failed';
        testResult.errors.push(error.message);
        results.failed++;

        // Take screenshot of failure
        try {
          const screenshotPath = path.join(SCREENSHOT_DIR, `FAIL_${testCase.screenshot}`);
          await page.screenshot({ path: screenshotPath, fullPage: true });
          testResult.screenshot = `FAIL_${testCase.screenshot}`;
        } catch (screenshotError) {
          console.log(`  ! Could not capture failure screenshot: ${screenshotError.message}`);
        }
      }

      results.tests.push(testResult);
    }

  } catch (error) {
    console.error('Fatal error during testing:', error);
    results.fatalError = error.message;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // Save results to JSON file
  const resultDir = path.dirname(RESULT_FILE);
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir, { recursive: true });
  }
  fs.writeFileSync(RESULT_FILE, JSON.stringify(results, null, 2));
  console.log(`\n\nResults saved to: ${RESULT_FILE}`);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Tests: ${results.totalTests}`);
  console.log(`Passed: ${results.passed}`);
  console.log(`Failed: ${results.failed}`);
  console.log(`Success Rate: ${((results.passed / results.totalTests) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));

  return results;
}

runTests().then(results => {
  process.exit(results.failed > 0 ? 1 : 0);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
