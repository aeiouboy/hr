import { describe, it, expect } from 'vitest';
// Reuse the same logic the CLI gate uses (scripts/check-i18n-parity.mjs) so a
// TH/EN drift fails in the normal `npm test` run, not only in the CLI gate.
import { checkParity } from '../../scripts/check-i18n-parity.mjs';

describe('i18n TH/EN parity (cleanup Phase 5.3)', () => {
  const { missingInTh, missingInEn, emptyEn, emptyTh } = checkParity();

  it('every en.json key exists in th.json', () => {
    expect(missingInTh).toEqual([]);
  });

  it('every th.json key exists in en.json', () => {
    expect(missingInEn).toEqual([]);
  });

  it('no empty string values in either catalog', () => {
    expect({ emptyEn, emptyTh }).toEqual({ emptyEn: [], emptyTh: [] });
  });
});
