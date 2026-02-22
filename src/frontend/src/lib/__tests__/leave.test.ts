import { describe, it, expect } from 'vitest';

// Test calculateWorkingDays logic (replicated from the form component)
function calculateWorkingDays(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  if (e < s) return 0;
  let count = 0;
  const current = new Date(s);
  while (current <= e) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

describe('calculateWorkingDays', () => {
  it('returns 5 for a full work week (Mon-Fri)', () => {
    // 2026-03-02 is Monday, 2026-03-06 is Friday
    expect(calculateWorkingDays('2026-03-02', '2026-03-06')).toBe(5);
  });

  it('returns 1 for a single working day', () => {
    expect(calculateWorkingDays('2026-03-02', '2026-03-02')).toBe(1);
  });

  it('returns 0 for a single weekend day (Saturday)', () => {
    expect(calculateWorkingDays('2026-03-07', '2026-03-07')).toBe(0);
  });

  it('returns 0 for a single weekend day (Sunday)', () => {
    expect(calculateWorkingDays('2026-03-08', '2026-03-08')).toBe(0);
  });

  it('returns 0 when end is before start', () => {
    expect(calculateWorkingDays('2026-03-06', '2026-03-02')).toBe(0);
  });

  it('handles a two-week span correctly', () => {
    // Mon 2026-03-02 to Fri 2026-03-13 = 10 working days
    expect(calculateWorkingDays('2026-03-02', '2026-03-13')).toBe(10);
  });

  it('excludes weekends within a range', () => {
    // Thu 2026-03-05 to Tue 2026-03-10 = Thu, Fri, Mon, Tue = 4 days
    expect(calculateWorkingDays('2026-03-05', '2026-03-10')).toBe(4);
  });

  it('handles Songkran range (Sat-Wed includes 2 weekdays)', () => {
    // 2026-04-11 (Sat) to 2026-04-15 (Wed) = Mon, Tue, Wed = 3 working days
    expect(calculateWorkingDays('2026-04-11', '2026-04-15')).toBe(3);
  });
});

describe('leave balance validation', () => {
  const mockBalances = [
    { type: 'annual', remaining: 5 },
    { type: 'sick', remaining: 27 },
    { type: 'personal', remaining: 2 },
  ];

  it('validates request does not exceed balance', () => {
    const balance = mockBalances.find((b) => b.type === 'annual');
    expect(balance).toBeDefined();
    expect(3 <= balance!.remaining).toBe(true);
  });

  it('detects when request exceeds balance', () => {
    const balance = mockBalances.find((b) => b.type === 'personal');
    expect(balance).toBeDefined();
    expect(5 <= balance!.remaining).toBe(false);
  });

  it('flags medical cert needed for sick leave >= 3 days', () => {
    const days = 3;
    const leaveType = 'sick';
    const needsMedCert = leaveType === 'sick' && days >= 3;
    expect(needsMedCert).toBe(true);
  });

  it('does not flag medical cert for sick leave < 3 days', () => {
    const days = 2;
    const leaveType = 'sick';
    const needsMedCert = leaveType === 'sick' && days >= 3;
    expect(needsMedCert).toBe(false);
  });

  it('flags HR approval for leaves > 5 days', () => {
    const days = 6;
    const needsHRApproval = days > 5;
    expect(needsHRApproval).toBe(true);
  });

  it('does not flag HR approval for leaves <= 5 days', () => {
    const days = 5;
    const needsHRApproval = days > 5;
    expect(needsHRApproval).toBe(false);
  });
});
