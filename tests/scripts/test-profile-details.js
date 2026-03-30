const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = 'tests/results/screenshots';
const RESULT_FILE = 'tests/results/json/profile_details_test.json';

async function runProfileDetailsTest() {
  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    route: '#/profile',
    tab: 'Profile',
    status: 'pending',
    errors: [],
    warnings: [],
    sections: [],
    screenshots: [],
    consoleErrors: []
  };

  let browser;
  let page;

  try {
    console.log('='.repeat(60));
    console.log('PROFILE DETAILS TAB TEST');
    console.log('='.repeat(60));
    console.log('');

    // Create screenshot directory
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }

    // Launch browser
    console.log('1. Launching browser...');
    browser = await chromium.launch({
      headless: false,
      slowMo: 500  // Slow down for better observation
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });

    page = await context.newPage();

    // Listen for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const errorText = msg.text();
        console.log(`  ⚠ Console Error: ${errorText}`);
        results.consoleErrors.push(errorText);
      }
    });

    // Listen for page errors
    page.on('pageerror', error => {
      console.log(`  ⚠ Page Error: ${error.message}`);
      results.errors.push(`Page Error: ${error.message}`);
    });

    // Navigate to profile page
    console.log('2. Navigating to profile page...');
    const url = `${BASE_URL}/#/profile`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    console.log('  ✓ Page loaded');

    // Take screenshot of initial page
    let screenshotPath = path.join(SCREENSHOT_DIR, '01_profile_initial.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.screenshots.push('01_profile_initial.png');
    console.log('  ✓ Screenshot: 01_profile_initial.png');

    // Wait for page to fully load (wait for skeleton to disappear)
    console.log('3. Waiting for page to fully load...');
    try {
      await page.waitForSelector('.skeleton', { state: 'detached', timeout: 10000 });
      console.log('  ✓ Skeleton loading completed');
    } catch (e) {
      console.log('  ⚠ No skeleton found or already loaded');
    }
    await page.waitForTimeout(2000);

    // Take screenshot after loading
    screenshotPath = path.join(SCREENSHOT_DIR, '02_page_loaded.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.screenshots.push('02_page_loaded.png');
    console.log('  ✓ Screenshot: 02_page_loaded.png');

    // Look for Profile tab
    console.log('4. Locating Profile tab...');

    // Try multiple selectors for the tab
    const tabSelectors = [
      'button:has-text("โปรไฟล์")',  // Thai - Profile
      'button:has-text("Profile")',   // English - Profile
      '[data-tab="profile"]',
      '.tab-button:has-text("Profile")',
      'button:has-text("account_circle")'  // Icon fallback
    ];

    let profileDetailsTab = null;
    let tabSelector = null;

    for (const selector of tabSelectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          profileDetailsTab = element;
          tabSelector = selector;
          console.log(`  ✓ Found tab using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Try next selector
      }
    }

    if (!profileDetailsTab) {
      // Get all tabs to see what's available
      const allTabs = await page.$$('button.tab-button, button[role="tab"]');
      console.log(`  ℹ Found ${allTabs.length} tab buttons total`);

      for (let i = 0; i < allTabs.length; i++) {
        const tabText = await allTabs[i].textContent();
        console.log(`    Tab ${i + 1}: "${tabText.trim()}"`);
      }

      throw new Error('Could not find Profile tab');
    }

    // Get tab text
    const tabText = await profileDetailsTab.textContent();
    console.log(`  ✓ Profile tab found: "${tabText.trim()}"`);

    // Click on Profile tab
    console.log('5. Clicking on Profile tab...');
    await profileDetailsTab.click();
    console.log('  ✓ Tab clicked');

    // Wait for tab content to load
    await page.waitForTimeout(2000);

    // Take screenshot after tab click
    screenshotPath = path.join(SCREENSHOT_DIR, '03_profile_details_tab.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.screenshots.push('03_profile_details_tab.png');
    console.log('  ✓ Screenshot: 03_profile_details_tab.png');

    // Check for sections
    console.log('6. Verifying sections...');
    console.log('');

    const sectionsToCheck = [
      {
        name: 'Education',
        selectors: ['#education-card', '[data-section="education"]'],
        keywords: ['การศึกษา', 'Education', 'school']
      },
      {
        name: 'Previous Employment',
        selectors: ['#previous-employment-card', '[data-section="previousEmployment"]'],
        keywords: ['ประวัติการทำงาน', 'Previous Employment', 'work_history']
      },
      {
        name: 'Languages',
        selectors: ['#languages-card', '[data-section="languages"]'],
        keywords: ['ทักษะภาษา', 'Language', 'translate']
      },
      {
        name: 'Certifications',
        selectors: ['#certifications-card', '[data-section="certifications"]'],
        keywords: ['ใบรับรอง', 'Certification', 'verified']
      },
      {
        name: 'E-Letter',
        selectors: ['#eletter-card', '[data-section="eLetter"]'],
        keywords: ['E-Letter', 'mail']
      },
      {
        name: 'Learning History',
        selectors: ['#learning-history-card', '[data-section="learningHistory"]'],
        keywords: ['ประวัติการอบรม', 'Learning History', 'training']
      },
      {
        name: 'OHS Certificate',
        selectors: ['#ohs-certificate-card', '[data-section="ohsCertificate"]'],
        keywords: ['OHS', 'health_and_safety']
      },
      {
        name: 'OHS Document',
        selectors: ['#ohs-document-card', '[data-section="ohsDocument"]'],
        keywords: ['OHS', 'Document']
      },
      {
        name: 'Awards',
        selectors: ['#awards-card', '[data-section="awards"]'],
        keywords: ['รางวัล', 'Award', 'emoji_events']
      },
      {
        name: 'Mobility',
        selectors: ['#mobility-card', '[data-section="mobility"]'],
        keywords: ['ความพร้อมในการย้าย', 'Mobility', 'flight_takeoff']
      },
      {
        name: 'Individual Documents',
        selectors: ['#individual-documents-card', '[data-section="individualDocuments"]'],
        keywords: ['เอกสาร', 'Individual Documents', 'folder']
      }
    ];

    for (const section of sectionsToCheck) {
      const sectionResult = {
        name: section.name,
        found: false,
        visible: false,
        hasContent: false,
        issues: []
      };

      console.log(`  Checking section: ${section.name}`);

      // Try to find section
      let sectionElement = null;
      for (const selector of section.selectors) {
        try {
          sectionElement = await page.$(selector);
          if (sectionElement) {
            sectionResult.found = true;
            break;
          }
        } catch (e) {
          // Try next selector
        }
      }

      // Check by keywords if not found by selector
      if (!sectionElement) {
        const pageContent = await page.content();
        for (const keyword of section.keywords) {
          if (pageContent.includes(keyword)) {
            sectionResult.found = true;
            sectionResult.foundByKeyword = keyword;
            break;
          }
        }
      }

      if (sectionElement) {
        // Check visibility
        const isVisible = await sectionElement.isVisible();
        sectionResult.visible = isVisible;

        // Get section content
        const sectionHTML = await sectionElement.innerHTML();

        // Check for common issues
        if (sectionHTML.includes('undefined')) {
          sectionResult.issues.push('Contains "undefined" values');
          console.log('    ⚠ Contains "undefined" values');
        }

        if (sectionHTML.includes('null')) {
          sectionResult.issues.push('Contains "null" values');
          console.log('    ⚠ Contains "null" values');
        }

        // Check for missing translations (keys like profileDetails.something)
        const translationKeyPattern = /\b\w+\.\w+\b/g;
        const matches = sectionHTML.match(translationKeyPattern);
        if (matches) {
          const untranslated = matches.filter(m =>
            m.startsWith('profileDetails.') ||
            m.startsWith('common.') ||
            m.startsWith('error.')
          );
          if (untranslated.length > 0) {
            sectionResult.issues.push(`Untranslated keys: ${untranslated.join(', ')}`);
            console.log(`    ⚠ Untranslated keys: ${untranslated.join(', ')}`);
          }
        }

        // Check for empty state or has data
        const emptyStateElement = await sectionElement.$('.empty-state, [class*="empty"]');
        if (emptyStateElement) {
          const emptyText = await emptyStateElement.textContent();
          sectionResult.emptyState = emptyText.trim();
          console.log(`    ℹ Empty state: "${emptyText.trim()}"`);
        } else {
          sectionResult.hasContent = true;
          console.log('    ✓ Has content');
        }

        console.log(`    ✓ Found and ${isVisible ? 'visible' : 'hidden'}`);
      } else {
        if (sectionResult.found) {
          console.log(`    ⚠ Found by keyword "${sectionResult.foundByKeyword}" but no element`);
        } else {
          console.log('    ✗ Not found');
          sectionResult.issues.push('Section not found on page');
        }
      }

      results.sections.push(sectionResult);
      console.log('');
    }

    // Take screenshots of each section (scroll to view)
    console.log('7. Taking section screenshots...');
    let screenshotCount = 4;
    for (const section of sectionsToCheck) {
      const sectionElement = await page.$(`#${section.selectors[0].replace('#', '')}`);
      if (sectionElement) {
        await sectionElement.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const filename = `${String(screenshotCount).padStart(2, '0')}_${section.name.toLowerCase().replace(/\s+/g, '_')}.png`;
        screenshotPath = path.join(SCREENSHOT_DIR, filename);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        results.screenshots.push(filename);
        console.log(`  ✓ Screenshot: ${filename}`);
        screenshotCount++;
      }
    }

    // Check for overall layout issues
    console.log('');
    console.log('8. Checking layout and UI...');

    // Check for broken images
    const images = await page.$$('img');
    let brokenImages = 0;
    for (const img of images) {
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      if (naturalWidth === 0) {
        brokenImages++;
      }
    }
    if (brokenImages > 0) {
      results.warnings.push(`${brokenImages} broken image(s) found`);
      console.log(`  ⚠ ${brokenImages} broken image(s)`);
    } else {
      console.log('  ✓ All images loaded');
    }

    // Check language
    const htmlLang = await page.$eval('html', el => el.lang);
    console.log(`  ℹ Page language: ${htmlLang || 'not set'}`);
    results.language = htmlLang;

    // Final full page screenshot
    console.log('');
    console.log('9. Taking final full page screenshot...');
    screenshotPath = path.join(SCREENSHOT_DIR, 'ZZ_full_page.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    results.screenshots.push('ZZ_full_page.png');
    console.log('  ✓ Screenshot: ZZ_full_page.png');

    // Determine overall status
    const criticalIssues = results.sections.filter(s =>
      !s.found || s.issues.some(i => i.includes('undefined') || i.includes('null'))
    );

    if (criticalIssues.length === 0 && results.errors.length === 0) {
      results.status = 'passed';
    } else if (results.errors.length > 0) {
      results.status = 'failed';
    } else {
      results.status = 'passed_with_warnings';
    }

  } catch (error) {
    console.error('');
    console.error('✗ Test failed:', error.message);
    results.status = 'failed';
    results.errors.push(error.message);
    results.stackTrace = error.stack;

    // Take failure screenshot
    if (page) {
      try {
        const screenshotPath = path.join(SCREENSHOT_DIR, 'ERROR_failure.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        results.screenshots.push('ERROR_failure.png');
        console.log('  ✓ Failure screenshot saved');
      } catch (e) {
        console.log('  ! Could not capture failure screenshot');
      }
    }
  } finally {
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
  console.log('');
  console.log('='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`Status: ${results.status.toUpperCase()}`);
  console.log(`Timestamp: ${results.timestamp}`);
  console.log('');

  console.log('Sections:');
  const foundSections = results.sections.filter(s => s.found).length;
  console.log(`  Found: ${foundSections}/${results.sections.length}`);

  const visibleSections = results.sections.filter(s => s.visible).length;
  console.log(`  Visible: ${visibleSections}/${foundSections}`);

  const sectionsWithContent = results.sections.filter(s => s.hasContent).length;
  console.log(`  With Content: ${sectionsWithContent}/${foundSections}`);

  const sectionsWithIssues = results.sections.filter(s => s.issues.length > 0).length;
  if (sectionsWithIssues > 0) {
    console.log(`  With Issues: ${sectionsWithIssues}`);
  }

  console.log('');
  console.log('Console Errors:', results.consoleErrors.length);
  console.log('Page Errors:', results.errors.length);
  console.log('Warnings:', results.warnings.length);
  console.log('');
  console.log('Screenshots:', results.screenshots.length);
  console.log(`  Location: ${SCREENSHOT_DIR}`);
  console.log('');
  console.log(`Results saved to: ${RESULT_FILE}`);
  console.log('='.repeat(60));

  // Print detailed issues if any
  if (sectionsWithIssues > 0 || results.errors.length > 0) {
    console.log('');
    console.log('ISSUES FOUND:');
    console.log('-'.repeat(60));

    results.sections.forEach(section => {
      if (section.issues.length > 0) {
        console.log(`\n${section.name}:`);
        section.issues.forEach(issue => {
          console.log(`  - ${issue}`);
        });
      }
    });

    if (results.errors.length > 0) {
      console.log('\nErrors:');
      results.errors.forEach(error => {
        console.log(`  - ${error}`);
      });
    }

    if (results.consoleErrors.length > 0) {
      console.log('\nConsole Errors:');
      results.consoleErrors.forEach(error => {
        console.log(`  - ${error}`);
      });
    }
  }

  return results;
}

// Run the test
runProfileDetailsTest().then(results => {
  process.exit(results.status === 'passed' || results.status === 'passed_with_warnings' ? 0 : 1);
}).catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
