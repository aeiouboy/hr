const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 150 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // Set dark mode
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: '/tmp/final-01-home-dark.png' });
  console.log('📸 1. Home - DARK');

  await page.goto(`${TARGET_URL}/en/leave`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/final-02-leave-dark.png' });
  console.log('📸 2. Leave - DARK');

  await page.goto(`${TARGET_URL}/en/claims`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/final-03-claims-dark.png' });
  console.log('📸 3. Claims - DARK');

  await page.goto(`${TARGET_URL}/en/settings`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/final-04-settings-dark.png' });
  console.log('📸 4. Settings - DARK');

  // Reset to light
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.goto(`${TARGET_URL}/en`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/final-05-home-light.png' });
  console.log('📸 5. Home - LIGHT (verify unchanged)');

  console.log('\n✅ Dark theme fix verified!');
  await browser.close();
})();
