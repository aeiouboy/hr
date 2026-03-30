const { chromium } = require('playwright');

async function debugPayrollSetup() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  // Collect all console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push({
      message: error.message,
      stack: error.stack
    });
  });

  try {
    console.log('Navigating to payroll-setup page...');
    await page.goto('http://localhost:8080/#/payroll-setup', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    console.log('Waiting 5 seconds...');
    await page.waitForTimeout(5000);

    // Get page content
    const bodyText = await page.textContent('body');
    console.log('\n=== PAGE TEXT (first 500 chars) ===');
    console.log(bodyText.substring(0, 500));

    // Get HTML content of main-content
    const mainContent = await page.innerHTML('#main-content');
    console.log('\n=== MAIN CONTENT HTML (first 1000 chars) ===');
    console.log(mainContent.substring(0, 1000));

    // Check for headings
    const headings = await page.$$eval('h1, h2, h3', elements =>
      elements.map(el => ({ tag: el.tagName, text: el.textContent.trim() }))
    );
    console.log('\n=== HEADINGS ===');
    console.log(JSON.stringify(headings, null, 2));

    // Console messages
    console.log('\n=== CONSOLE MESSAGES ===');
    consoleMessages.forEach(msg => {
      console.log(`[${msg.type}] ${msg.text}`);
    });

    // Page errors
    if (pageErrors.length > 0) {
      console.log('\n=== PAGE ERRORS ===');
      pageErrors.forEach(err => {
        console.log(err.message);
        console.log(err.stack);
      });
    }

    // Take screenshot
    await page.screenshot({ path: 'tests/results/screenshots/debug_payroll.png', fullPage: true });
    console.log('\nScreenshot saved to tests/results/screenshots/debug_payroll.png');

    // Wait before closing
    console.log('\nKeeping browser open for 3 seconds...');
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

debugPayrollSetup();
