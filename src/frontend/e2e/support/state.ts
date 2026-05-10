import type { Page } from '@playwright/test';

const PRESERVED_KEYS = ['humi-auth'];

const EXPLICIT_SUITE_KEYS = [
  'hire-wizard-draft',
  'humi-hire-audit',
  'humi-profile-workflows',
];

const SUITE_KEY_PREFIXES = [
  'humi-self-service-',
  'humi-workflows-',
  'humi-admin-',
  'humi-benefits-',
  'humi-claims-',
];

export async function resetSuiteStorage(
  page: Page,
  options: { preserveAuth?: boolean } = {},
): Promise<void> {
  const preserveAuth = options.preserveAuth ?? true;
  await page.evaluate(
    ({ preserveAuth, preservedKeys, explicitKeys, prefixes }) => {
      const preserved = new Set(preserveAuth ? preservedKeys : []);
      for (const key of Object.keys(localStorage)) {
        const shouldRemove =
          !preserved.has(key) &&
          (key.startsWith('humi-') ||
            explicitKeys.includes(key) ||
            prefixes.some((prefix) => key.startsWith(prefix)));
        if (shouldRemove) {
          localStorage.removeItem(key);
        }
      }
    },
    {
      preserveAuth,
      preservedKeys: PRESERVED_KEYS,
      explicitKeys: EXPLICIT_SUITE_KEYS,
      prefixes: SUITE_KEY_PREFIXES,
    },
  );
}

export async function installSuiteStorageReset(page: Page): Promise<void> {
  await page.addInitScript(
    ({ preservedKeys, explicitKeys, prefixes }) => {
      const preserved = new Set(preservedKeys);
      for (const key of Object.keys(localStorage)) {
        const shouldRemove =
          !preserved.has(key) &&
          (key.startsWith('humi-') ||
            explicitKeys.includes(key) ||
            prefixes.some((prefix) => key.startsWith(prefix)));
        if (shouldRemove) {
          localStorage.removeItem(key);
        }
      }
    },
    {
      preservedKeys: PRESERVED_KEYS,
      explicitKeys: EXPLICIT_SUITE_KEYS,
      prefixes: SUITE_KEY_PREFIXES,
    },
  );
}
