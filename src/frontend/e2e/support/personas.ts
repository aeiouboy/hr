import type { Browser, BrowserContext } from '@playwright/test';
import { authedContext } from '../helpers/storage-auth.helper';

export type SuitePersona = 'employee' | 'manager' | 'hrbp' | 'spd' | 'hr_admin';

export const suitePersonas: SuitePersona[] = ['employee', 'manager', 'hrbp', 'spd', 'hr_admin'];

export const personaLabels: Record<SuitePersona, string> = {
  employee: 'Employee',
  manager: 'Manager',
  hrbp: 'HRBP',
  spd: 'SPD',
  hr_admin: 'HR Admin',
};

export async function authedSuiteContext(
  browser: Browser,
  persona: SuitePersona,
  extraStorage: Array<{ name: string; value: string }> = [],
): Promise<BrowserContext> {
  return authedContext(browser, persona, extraStorage);
}
