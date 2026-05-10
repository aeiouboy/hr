import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { landingForDemoUser, landingForRoles } from '../demo-users';

describe('demo user landing routes', () => {
  it('lands manager role users on home instead of the removed manager dashboard', () => {
    expect(landingForRoles(['manager', 'employee'], 'th')).toBe('/th/home');
  });

  it('lands both manager demo personas on home when proxy switching', () => {
    expect(landingForDemoUser('manager@humi.test', 'th')).toBe('/th/home');
    expect(landingForDemoUser('rungrote@humi.test', 'th')).toBe('/th/home');
  });

  it('keeps direct manager dashboard URLs from falling through to 404', () => {
    const managerDashboardPath = resolve(
      process.cwd(),
      'src/app/[locale]/manager-dashboard/page.tsx',
    );

    expect(existsSync(managerDashboardPath)).toBe(true);

    const source = readFileSync(managerDashboardPath, 'utf8');
    expect(source).toContain('ManagerDashboardPage');
    expect(source).toContain('/manager-dashboard');
  });
});
