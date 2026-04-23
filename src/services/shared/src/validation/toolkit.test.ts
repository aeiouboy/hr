/**
 * toolkit.test.ts
 * Test suite for @hrms/shared validation toolkit — 7 validators, 32+ cases
 * Written FIRST (test-first / TDD) before toolkit.ts implementation.
 *
 * Test runner: Jest + ts-jest (see jest.config.js)
 * Framework: zero — pure TypeScript, no React/Zod/NestJS
 */

import {
  thaiNationalId,
  thaiPhone,
  email,
  dobBeforeHire,
  salaryCurrencyPair,
  contractEndDateRequired,
  nameNoDigits,
} from './toolkit';

// ---------------------------------------------------------------------------
// Helpers — Thai National ID checksum generator (synthetic, deterministic)
// Algorithm (BRD Appendix 5):
//   weights = [13,12,11,10,9,8,7,6,5,4,3,2] applied to digits d1..d12
//   sum = sum(di * wi)
//   check = (11 - sum % 11) % 10
// ---------------------------------------------------------------------------

/** Generate a valid 13-digit Thai National ID string from first 12 digits */
function buildThaiId(first12: string): string {
  if (first12.length !== 12) throw new Error('first12 must be exactly 12 digits');
  const weights = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  const sum = first12
    .split('')
    .reduce((acc, d, i) => acc + parseInt(d, 10) * weights[i], 0);
  const check = (11 - (sum % 11)) % 10;
  return first12 + String(check);
}

// Two known-valid synthetic IDs built from deterministic first-12 bases
const VALID_ID_A = buildThaiId('100000000000'); // class 1 (Thai citizen)
const VALID_ID_B = buildThaiId('310012345678'); // class 3 (non-Thai)
// ID starting with 0 (leading zero preserved as string)
const VALID_ID_LEADING_ZERO = buildThaiId('012345678901');

// Derive a bad-checksum variant from VALID_ID_A
const INVALID_CHECKSUM_ID = (() => {
  const digits = VALID_ID_A.split('');
  const lastDigit = parseInt(digits[12], 10);
  // flip last digit by +1 mod 10, guaranteed ≠ correct check
  digits[12] = String((lastDigit + 1) % 10);
  return digits.join('');
})();

// ---------------------------------------------------------------------------
// 1. thaiNationalId — 8 test cases
// ---------------------------------------------------------------------------
describe('thaiNationalId', () => {
  test('TC-01: valid 13-digit ID with correct checksum (VALID_ID_A) → ok: true', () => {
    const result = thaiNationalId(VALID_ID_A);
    expect(result.ok).toBe(true);
  });

  test('TC-02: valid 13-digit ID with correct checksum (VALID_ID_B) → ok: true', () => {
    const result = thaiNationalId(VALID_ID_B);
    expect(result.ok).toBe(true);
  });

  test('TC-03: valid 13-digit ID with leading zero → ok: true', () => {
    const result = thaiNationalId(VALID_ID_LEADING_ZERO);
    expect(result.ok).toBe(true);
  });

  test('TC-04: invalid checksum (last digit flipped) → ok: false with message', () => {
    const result = thaiNationalId(INVALID_CHECKSUM_ID);
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });

  test('TC-05: fewer than 13 digits (12 digits) → ok: false', () => {
    const result = thaiNationalId('123456789012');
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });

  test('TC-06: more than 13 digits (14 digits) → ok: false', () => {
    const result = thaiNationalId('12345678901234');
    expect(result.ok).toBe(false);
  });

  test('TC-07: non-numeric input (contains letters) → ok: false', () => {
    const result = thaiNationalId('1234567890ABC');
    expect(result.ok).toBe(false);
  });

  test('TC-08: empty string → ok: false', () => {
    const result = thaiNationalId('');
    expect(result.ok).toBe(false);
  });
});

// Note: foreigner sentinel digits 8 and 9 as first digit are still valid Thai IDs
// (they pass if checksum is correct). Test that they validate normally.
describe('thaiNationalId — foreigner sentinel prefix', () => {
  test('TC-09: foreigner sentinel starting with 8 — valid checksum → ok: true', () => {
    const id = buildThaiId('800000000000');
    const result = thaiNationalId(id);
    expect(result.ok).toBe(true);
  });

  test('TC-10: foreigner sentinel starting with 9 — valid checksum → ok: true', () => {
    const id = buildThaiId('900000000000');
    const result = thaiNationalId(id);
    expect(result.ok).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 2. thaiPhone — 6 test cases
// ---------------------------------------------------------------------------
describe('thaiPhone', () => {
  test('TC-11: +66 format with 9 subsequent digits → ok: true', () => {
    // +66 + 9 digits = 12 chars total, e.g. +66812345678
    const result = thaiPhone('+66812345678');
    expect(result.ok).toBe(true);
  });

  test('TC-12: 0 prefix with 9 subsequent digits (mobile) → ok: true', () => {
    // 0 + 9 digits = 10 chars, e.g. 0812345678
    const result = thaiPhone('0812345678');
    expect(result.ok).toBe(true);
  });

  test('TC-13: 0 prefix with 8 subsequent digits (landline) → ok: true', () => {
    // 0 + 8 digits = 9 chars, e.g. 021234567
    const result = thaiPhone('021234567');
    expect(result.ok).toBe(true);
  });

  test('TC-14: contains letters → ok: false', () => {
    const result = thaiPhone('081234ABCD');
    expect(result.ok).toBe(false);
  });

  test('TC-15: too short (7 digits) → ok: false', () => {
    const result = thaiPhone('0123456');
    expect(result.ok).toBe(false);
  });

  test('TC-16: empty string → ok: false', () => {
    const result = thaiPhone('');
    expect(result.ok).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 3. email — 5 test cases
// ---------------------------------------------------------------------------
describe('email', () => {
  test('TC-17: valid email with dots in local part → ok: true', () => {
    const result = email('first.last@example.com');
    expect(result.ok).toBe(true);
  });

  test('TC-18: valid email with plus alias → ok: true', () => {
    const result = email('user+tag@company.co.th');
    expect(result.ok).toBe(true);
  });

  test('TC-19: missing @ symbol → ok: false', () => {
    const result = email('userdomain.com');
    expect(result.ok).toBe(false);
  });

  test('TC-20: missing TLD (no dot after @) → ok: false', () => {
    const result = email('user@domain');
    expect(result.ok).toBe(false);
  });

  test('TC-21: empty string → ok: false', () => {
    const result = email('');
    expect(result.ok).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 4. dobBeforeHire — 4 test cases
// ---------------------------------------------------------------------------
describe('dobBeforeHire', () => {
  test('TC-22: DOB 20 years before hire date — above minAge=15 → ok: true', () => {
    const hireDate = new Date('2020-01-01');
    const dob = new Date('2000-01-01'); // exactly 20 years before
    const result = dobBeforeHire(dob, hireDate, 15);
    expect(result.ok).toBe(true);
  });

  test('TC-23: DOB 10 years before hire date — below minAge=15 → ok: false', () => {
    const hireDate = new Date('2020-01-01');
    const dob = new Date('2010-01-01'); // only 10 years before
    const result = dobBeforeHire(dob, hireDate, 15);
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });

  test('TC-24: DOB after hire date → ok: false', () => {
    const hireDate = new Date('2020-01-01');
    const dob = new Date('2021-06-15'); // born AFTER hire
    const result = dobBeforeHire(dob, hireDate, 15);
    expect(result.ok).toBe(false);
  });

  test('TC-25: null hire date → ok: false', () => {
    const dob = new Date('1990-01-01');
    const result = dobBeforeHire(dob, null, 15);
    expect(result.ok).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 5. salaryCurrencyPair — 3 test cases
// ---------------------------------------------------------------------------
describe('salaryCurrencyPair', () => {
  test('TC-26: 100000 with THB → ok: true', () => {
    const result = salaryCurrencyPair(100000, 'THB');
    expect(result.ok).toBe(true);
  });

  test('TC-27: 0 amount with THB → ok: false (amount must be > 0)', () => {
    const result = salaryCurrencyPair(0, 'THB');
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });

  test('TC-28: positive amount with unknown/unsupported currency → ok: false', () => {
    const result = salaryCurrencyPair(50000, 'XYZ');
    expect(result.ok).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 6. contractEndDateRequired — 3 test cases
// ---------------------------------------------------------------------------
describe('contractEndDateRequired', () => {
  test('TC-29: class=CONTRACT with a valid endDate → ok: true', () => {
    const result = contractEndDateRequired('CONTRACT', new Date('2025-12-31'));
    expect(result.ok).toBe(true);
  });

  test('TC-30: class=CONTRACT with null endDate → ok: false', () => {
    const result = contractEndDateRequired('CONTRACT', null);
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });

  test('TC-31: class=PERMANENT with null endDate → ok: true (not required)', () => {
    const result = contractEndDateRequired('PERMANENT', null);
    expect(result.ok).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 7. nameNoDigits — 3 test cases
// ---------------------------------------------------------------------------
describe('nameNoDigits', () => {
  test('TC-32: Thai letters only → ok: true', () => {
    const result = nameNoDigits('สมชาย ใจดี');
    expect(result.ok).toBe(true);
  });

  test('TC-33: English letters only → ok: true', () => {
    const result = nameNoDigits('John Smith');
    expect(result.ok).toBe(true);
  });

  test('TC-34: name contains digit → ok: false', () => {
    const result = nameNoDigits('John2Smith');
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Edge cases for full line coverage
// ---------------------------------------------------------------------------
describe('dobBeforeHire — null/invalid dob', () => {
  test('TC-37: null dob with valid hireDate → ok: false', () => {
    const hireDate = new Date('2020-01-01');
    const result = dobBeforeHire(null, hireDate, 15);
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });
});

describe('nameNoDigits — null/undefined input (runtime guard)', () => {
  test('TC-38: undefined value (runtime) → ok: false', () => {
    // Cast to bypass TypeScript — test the runtime guard
    const result = nameNoDigits(undefined as unknown as string);
    expect(result.ok).toBe(false);
    expect(result.message).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Return type shape contract — all validators return { ok, message? }
// ---------------------------------------------------------------------------
describe('return type shape', () => {
  test('TC-35: ok=true result has no message property or message is undefined', () => {
    const result = thaiPhone('0812345678');
    expect(result.ok).toBe(true);
    // message should be absent or undefined when ok
    if ('message' in result) {
      expect(result.message).toBeUndefined();
    }
  });

  test('TC-36: ok=false result always has a message string', () => {
    const result = thaiPhone('');
    expect(result.ok).toBe(false);
    expect(typeof result.message).toBe('string');
    expect((result.message as string).length).toBeGreaterThan(0);
  });
});
