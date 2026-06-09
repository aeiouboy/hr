import { describe, expect, test } from 'vitest';
import {
  weekDates,
  cellTone,
  weeklyHours,
  coverageForDay,
  seedRosterFromTemplates,
  rosterRowToSchedule,
  applyTemplateRow,
  REQUIRED_PER_DAY,
  SHIFT_PICK_CODES,
} from '@/lib/time/roster';
import { validateDwsDay } from '@/lib/time/dws-validation';
import { currentPeriod } from '@/lib/time/period';

const START = currentPeriod().start; // 2026-05-21 (Thu)

describe('weekDates', () => {
  test('returns 7 consecutive ISO dates starting at start', () => {
    const wd = weekDates(START);
    expect(wd).toHaveLength(7);
    expect(wd[0]).toBe(START);
    expect(wd[6]).toBe('2026-05-27');
    // strictly increasing, 1-day step
    for (let i = 1; i < wd.length; i++) {
      const prev = new Date(wd[i - 1] + 'T00:00:00Z').getTime();
      const cur = new Date(wd[i] + 'T00:00:00Z').getTime();
      expect(cur - prev).toBe(86_400_000);
    }
  });
});

describe('cellTone', () => {
  test('covers all four branches', () => {
    expect(cellTone('F')).toBe('off');
    expect(cellTone(null)).toBe('empty');
    expect(cellTone('8A1000')).toBe('late');
    expect(cellTone('8A0800')).toBe('std');
    // unknown code → empty (getShiftCode null)
    expect(cellTone('ZZZ')).toBe('empty');
  });
});

describe('weeklyHours', () => {
  test('sums workHrs, ignoring off/empty/unknown', () => {
    expect(weeklyHours(['F', null, '8A0800', '8A1000'])).toBe(16);
  });
  test('all-off / all-empty row is 0', () => {
    expect(weeklyHours(['F', 'F', null, null])).toBe(0);
  });
  test('part-time + standard', () => {
    expect(weeklyHours(['4C0800', '8A0800'])).toBe(12);
  });
});

describe('coverageForDay', () => {
  const date = '2026-05-21';
  const roster = {
    A: { [date]: '8A0800' },
    B: { [date]: '8A1000' },
    C: { [date]: 'F' }, // day off does NOT cover
    D: { [date]: null }, // empty does NOT cover
  };

  test('counts only real shifts', () => {
    const cov = coverageForDay(roster, date, 3);
    expect(cov.assigned).toBe(2);
    expect(cov.required).toBe(3);
    expect(cov.short).toBe(true);
  });

  test('not short when assigned meets requirement', () => {
    const cov = coverageForDay(roster, date, 2);
    expect(cov.short).toBe(false);
  });
});

describe('seedRosterFromTemplates', () => {
  const team = [{ id: 'EMP101' }, { id: 'EMP102' }];
  const wd = weekDates(START);
  const roster = seedRosterFromTemplates(team, wd);

  test('produces a cell for every emp × date', () => {
    for (const emp of team) {
      for (const date of wd) {
        expect(roster[emp.id]).toHaveProperty(date);
      }
    }
  });

  test('day-offs project to F, never to an empty cell (no nulls)', () => {
    for (const emp of team) {
      for (const date of wd) {
        const cell = roster[emp.id][date];
        expect(cell).not.toBeNull();
        // either the day-off sentinel or a real code string
        expect(typeof cell).toBe('string');
      }
    }
  });

  test('EMP101 (Store) holds the late shift on a working weekday', () => {
    // 2026-05-22 is Friday — Store template works Mon–Sat with 8A1000
    expect(roster['EMP101']['2026-05-22']).toBe('8A1000');
    // 2026-05-24 is Sunday — Store template Sun off
    expect(roster['EMP101']['2026-05-24']).toBe('F');
  });
});

describe('rosterRowToSchedule (validation bridge)', () => {
  const wd = ['2026-05-21'];

  test("'F' → dayOff true → validates GREEN", () => {
    const [day] = rosterRowToSchedule({ '2026-05-21': 'F' }, wd);
    expect(day.dayOff).toBe(true);
    expect(day.shiftCode).toBeNull();
    expect(validateDwsDay(day, null).level).toBe('green');
  });

  test('null → empty working gap → validates RED', () => {
    const [day] = rosterRowToSchedule({ '2026-05-21': null }, wd);
    expect(day.dayOff).toBe(false);
    expect(day.shiftCode).toBeNull();
    expect(validateDwsDay(day, null).level).toBe('red');
  });

  test('missing date key → empty gap → RED', () => {
    const [day] = rosterRowToSchedule({}, wd);
    expect(day.dayOff).toBe(false);
    expect(validateDwsDay(day, null).level).toBe('red');
  });

  test('real code → shift fields → validates OK', () => {
    const [day] = rosterRowToSchedule({ '2026-05-21': '8A0800' }, wd);
    expect(day.dayOff).toBe(false);
    expect(day.shiftCode).toBe('8A0800');
    expect(day.scheduledIn).toBe('08:00');
    expect(day.scheduledOut).toBe('17:00');
    expect(validateDwsDay(day, null).level).toBe('ok');
  });

  test('unknown code → treated as empty gap → RED', () => {
    const [day] = rosterRowToSchedule({ '2026-05-21': 'ZZZ' }, wd);
    expect(day.shiftCode).toBeNull();
    expect(validateDwsDay(day, null).level).toBe('red');
  });
});

describe('applyTemplateRow', () => {
  const wd = weekDates(START);

  test('STORE_STD projects late shift on working days, F on Sunday', () => {
    const row = applyTemplateRow('STORE_STD', wd);
    expect(row['2026-05-22']).toBe('8A1000'); // Fri
    expect(row['2026-05-24']).toBe('F'); // Sun off
  });

  test('HO_STD projects standard shift weekdays, F on weekend', () => {
    const row = applyTemplateRow('HO_STD', wd);
    expect(row['2026-05-22']).toBe('8A0800'); // Fri
    expect(row['2026-05-23']).toBe('F'); // Sat off
    expect(row['2026-05-24']).toBe('F'); // Sun off
  });
});

describe('exports', () => {
  test('REQUIRED_PER_DAY and SHIFT_PICK_CODES are sane', () => {
    expect(REQUIRED_PER_DAY).toBeGreaterThan(0);
    expect(SHIFT_PICK_CODES.length).toBeGreaterThan(0);
    expect(SHIFT_PICK_CODES).toContain('8A1000');
  });
});
