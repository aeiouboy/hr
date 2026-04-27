/**
 * persona-switch-qa.spec.ts
 *
 * Done-when #6: Ken switches through 5 personas (Employee, Ken=hr_admin,
 * Apinya=hrbp, Worawee=spd, Rungrote=manager) — no dead-ends, no English
 * error labels on own-data routes, no "Access Denied" on routes the persona
 * should access.
 *
 * Auth strategy: inject humi-auth via localStorage before every navigation
 * (same pattern as chain-4-promotion.spec.ts). Re-inject before each route
 * because Next.js navigation can trigger rehydration from persisted state.
 *
 * Known defect (HIGH): Apinya (hrbp) gets "Access Denied" on /th/reports?scope=hrbp
 * because rbac.ts maps 'hrbp-reports' module to ['hr_admin','hr_manager'] only.
 * The test records this as FAIL with a soft assertion so remaining routes run.
 */

import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// ─── Persona auth states (mirrors lib/demo-users.ts DEMO_USERS) ────────────

const PERSONAS = {
  employee: {
    userId: 'EMP001',
    username: 'สมชาย ใจดี',
    email: 'employee@humi.test',
    roles: ['employee'],
    isAuthenticated: true,
    originalUser: null,
  },
  ken: {
    userId: 'KEN001',
    username: 'จงรักษ์ ทานากะ (HR Admin)',
    email: 'ken@humi.test',
    roles: ['hr_admin', 'employee'],
    isAuthenticated: true,
    originalUser: null,
  },
  apinya: {
    userId: 'APN001',
    username: 'อภิญญา (HRBP — BU2)',
    email: 'apinya@humi.test',
    roles: ['hrbp', 'employee'],
    isAuthenticated: true,
    originalUser: null,
  },
  worawee: {
    userId: 'WRW001',
    username: 'วรวี (SPD)',
    email: 'worawee@humi.test',
    roles: ['spd', 'employee'],
    isAuthenticated: true,
    originalUser: null,
  },
  rungrote: {
    userId: 'RNG001',
    username: 'รุ่งโรจน์ (Manager — Finance)',
    email: 'rungrote@humi.test',
    roles: ['manager', 'employee'],
    isAuthenticated: true,
    originalUser: null,
  },
} as const;

type PersonaKey = keyof typeof PERSONAS;

// ─── Routes to visit per persona ───────────────────────────────────────────
// Note: Apinya (hrbp) hits a barrier card on /th/admin/employees (scopeMode='bu')
// but the card renders Thai content ("ไม่มีสิทธิ์เข้าถึง") — that counts as rendered.
// Apinya's /th/reports?scope=hrbp is a KNOWN DEFECT (rbac.ts excludes 'hrbp' role).

const PERSONA_ROUTES: Record<PersonaKey, string[]> = {
  employee: ['/th/home', '/th/profile/me'],
  ken:      ['/th/admin/employees', '/th/admin'],
  apinya:   ['/th/admin/employees', '/th/reports?scope=hrbp'],
  worawee:  ['/th/spd/inbox', '/th/admin/employees'],
  rungrote: ['/th/manager-dashboard', '/th/quick-approve'],
};

// Routes where the RBAC barrier card ("ไม่มีสิทธิ์เข้าถึง") is the correct
// rendered response for non-admin personas. Still counts as "rendered".
const THAI_BARRIER_ROUTES = new Set(['/th/admin/employees']);

// Known defects: persona × route pairs that are expected to fail (bug, not test infra).
// These are soft-asserted: test continues, result is recorded for the report.
// Both prior defects fixed in Wave 4 follow-up: rbac.ts now grants hrbp access
// to /reports?scope=hrbp; quick-approve h1 now uses i18n key tQuick('title').
const KNOWN_DEFECTS = new Map<string, string>([
]);

// ─── Screenshot artifacts dir ───────────────────────────────────────────────

const ARTIFACTS_DIR = path.join(
  '/Users/tachongrak/projects/hr/src/frontend/test-artifacts/persona-qa',
);

function ensureArtifactsDir() {
  if (!fs.existsSync(ARTIFACTS_DIR)) {
    fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

async function injectPersona(page: Page, key: PersonaKey) {
  const state = PERSONAS[key];
  await page.evaluate((s) => {
    localStorage.setItem('humi-auth', JSON.stringify({ state: s, version: 0 }));
  }, state as Record<string, unknown>);
}

async function screenshotPersona(page: Page, persona: PersonaKey, surface: string) {
  ensureArtifactsDir();
  const slug = surface.replace(/\//g, '-').replace(/^-/, '');
  const filePath = path.join(ARTIFACTS_DIR, `${persona}-${slug}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
}

/** Returns true if any heading/alert text matches English capitalized 2-word pattern. */
async function hasEnglishErrorLabels(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const selectors = ['h1', 'h2', 'h3', '[role="alert"]', '[role="heading"]'];
    const englishPattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    for (const sel of selectors) {
      const els = document.querySelectorAll(sel);
      for (const el of els) {
        const text = (el.textContent ?? '').trim();
        if (englishPattern.test(text)) return true;
      }
    }
    return false;
  });
}

/** Returns true if page contains English "Access Denied" text. */
async function hasEnglishAccessDenied(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    return /Access Denied/i.test(document.body.innerText ?? '');
  });
}

/** Returns true if the page appears rendered (not blank, not 404, not still compiling). */
async function isPageRendered(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const body = document.body;
    if (!body) return false;
    const text = (body.innerText ?? '').trim();
    if (text.length < 5) return false;
    if (/404|not found/i.test(text) && text.length < 200) return false;
    return true;
  });
}

/** Navigate to a route with persona re-injected (guards against rehydration clobbering). */
async function gotoWithPersona(page: Page, persona: PersonaKey, route: string) {
  await injectPersona(page, persona);
  await page.goto(route, { timeout: 30_000, waitUntil: 'domcontentloaded' });
  // Re-inject after navigation in case Next.js rehydrated from persisted state
  await injectPersona(page, persona);
  await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
}

// ─── Result collector for report ────────────────────────────────────────────

type RouteResult = {
  persona: PersonaKey;
  route: string;
  rendered: boolean;
  englishAccessDenied: boolean;
  englishLabels: boolean;
  verdict: 'PASS' | 'FAIL' | 'DEFECT';
  note?: string;
};

const results: RouteResult[] = [];

// ─── Test suite ─────────────────────────────────────────────────────────────

test.describe.serial('Done-when #6 — Ken 5-persona switch QA', () => {
  test.setTimeout(90_000);

  test.beforeEach(async ({ page }) => {
    const reachable = await page
      .goto('/th/home', { timeout: 20_000, waitUntil: 'domcontentloaded' })
      .then(() => true)
      .catch(() => false);
    if (!reachable) test.skip();
  });

  async function runPersonaCheck(page: Page, persona: PersonaKey) {
    for (const route of PERSONA_ROUTES[persona]) {
      const defectKey = `${persona}:${route}`;
      const knownDefect = KNOWN_DEFECTS.get(defectKey);

      await gotoWithPersona(page, persona, route);
      await screenshotPersona(page, persona, route);

      const rendered = await isPageRendered(page);
      const englishDenied = await hasEnglishAccessDenied(page);
      const englishLabels = await hasEnglishErrorLabels(page);

      const isBarrierRoute = THAI_BARRIER_ROUTES.has(route);

      const result: RouteResult = {
        persona,
        route,
        rendered,
        englishAccessDenied: englishDenied,
        englishLabels,
        verdict: 'PASS',
        note: knownDefect,
      };

      if (knownDefect) {
        // Soft-assert: record failure but don't abort suite
        result.verdict = 'DEFECT';
        results.push(result);
        // Still take screenshot; don't assert — defect is expected
        continue;
      }

      // Barrier card for non-admin on /admin/employees renders Thai text — still "rendered"
      expect(rendered, `${persona} route ${route} should render`).toBe(true);

      // English "Access Denied" must never appear — barrier card uses Thai "ไม่มีสิทธิ์เข้าถึง"
      if (!isBarrierRoute) {
        expect(englishDenied, `${persona} route ${route} must not show English Access Denied`).toBe(false);
      }

      // No English-only capitalized 2-word headings
      expect(englishLabels, `${persona} route ${route} must not show English error labels`).toBe(false);

      result.verdict = (rendered && !englishLabels && (isBarrierRoute || !englishDenied)) ? 'PASS' : 'FAIL';
      results.push(result);
    }
  }

  // ── Employee persona ────────────────────────────────────────────────────

  test('Employee — /th/home and /th/profile/me render without dead-ends', async ({ page }) => {
    await runPersonaCheck(page, 'employee');
  });

  // ── Ken (hr_admin) persona ──────────────────────────────────────────────

  test('Ken (hr_admin) — /th/admin/employees and /th/admin render without dead-ends', async ({ page }) => {
    await runPersonaCheck(page, 'ken');
  });

  // ── Apinya (hrbp) persona ───────────────────────────────────────────────

  test('Apinya (hrbp) — /th/admin/employees barrier + /th/reports?scope=hrbp [DEFECT]', async ({ page }) => {
    await runPersonaCheck(page, 'apinya');
  });

  // ── Worawee (spd) persona ───────────────────────────────────────────────

  test('Worawee (spd) — /th/spd/inbox and /th/admin/employees render without dead-ends', async ({ page }) => {
    await runPersonaCheck(page, 'worawee');
  });

  // ── Rungrote (manager) persona ──────────────────────────────────────────

  test('Rungrote (manager) — /th/manager-dashboard and /th/quick-approve render without dead-ends', async ({ page }) => {
    await runPersonaCheck(page, 'rungrote');
  });

  // ── Summary log ────────────────────────────────────────────────────────

  test.afterAll(() => {
    console.log('\n── Persona QA Results ──');
    for (const r of results) {
      const flags = [
        r.rendered ? '' : 'NOT_RENDERED',
        r.englishAccessDenied ? 'ENGLISH_ACCESS_DENIED' : '',
        r.englishLabels ? 'ENGLISH_LABELS' : '',
      ].filter(Boolean).join(',') || 'clean';
      console.log(`[${r.verdict}] ${r.persona} ${r.route} — ${flags}${r.note ? ` | ${r.note}` : ''}`);
    }
  });
});
