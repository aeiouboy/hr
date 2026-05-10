import { describe, expect, it } from 'vitest';
import { filterCommands, HUMI_COMMANDS } from '@/lib/humi-command-registry';

function idsFor(query: string): string[] {
  return filterCommands(query).map((command) => command.id);
}

describe('humi command registry search', () => {
  it.each(['สลิป', 'payslip', 'pay slip'])('finds pay statements by alias %s', (query) => {
    expect(idsFor(query)).toContain('payslip');
  });

  it('keeps payslip navigation on the profile employment pay statements anchor', () => {
    expect(HUMI_COMMANDS.find((command) => command.id === 'payslip')?.route).toBe(
      '/profile/me?tab=employment#pay-statements',
    );
  });

  it('bounds route matching so a short query does not flood all slash routes', () => {
    expect(idsFor('p').length).toBeLessThan(HUMI_COMMANDS.length);
    expect(idsFor('/pro')).toEqual(expect.arrayContaining(['profile', 'payslip']));
  });
});
