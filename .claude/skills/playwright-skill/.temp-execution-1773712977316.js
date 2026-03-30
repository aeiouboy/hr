const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';
const PAGES = [
  { name: 'login', url: '/login' },
  { name: 'dashboard', url: '/' },
  { name: 'time-entry', url: '/time-entry' },
  { name: 'charge-codes', url: '/charge-codes' },
  { name: 'approvals', url: '/approvals' },
  { name: 'reports', url: '/reports' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  for (const p of PAGES) {
    try {
      await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'networkidle', timeout: 10000 });
      const url = page.url();
      const title = await page.title();
      console.log(`${p.name}: ${url} - "${title}"`);
      
      // Check main content
      const h1 = await page.locator('h1, h2').first().textContent().catch(() => 'none');
      console.log(`  Heading: ${h1}`);
    } catch(e) {
      console.log(`${p.name}: ERROR - ${e.message}`);
    }
  }
  
  await browser.close();
})();
