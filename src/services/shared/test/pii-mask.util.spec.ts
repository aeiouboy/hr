import { maskNationalId, maskBankAccount, maskEmail } from '../src/utils/pii-mask.util';

describe('PII Mask Utilities', () => {
  // ── maskNationalId ────────────────────────────────────────────
  describe('maskNationalId', () => {
    it('should mask national ID showing only last 4 characters', () => {
      expect(maskNationalId('1234567890123')).toBe('*********0123');
    });

    it('should mask 13-digit Thai national ID correctly', () => {
      const result = maskNationalId('1100600123456');
      expect(result).toBe('*********3456');
      expect(result.length).toBe(13);
    });

    it('should return original string if length < 4', () => {
      expect(maskNationalId('123')).toBe('123');
      expect(maskNationalId('12')).toBe('12');
      expect(maskNationalId('1')).toBe('1');
    });

    it('should return original string if exactly 4 characters (no masking)', () => {
      expect(maskNationalId('1234')).toBe('1234');
    });

    it('should return original value for empty string', () => {
      expect(maskNationalId('')).toBe('');
    });

    it('should handle undefined/null gracefully', () => {
      expect(maskNationalId(null as any)).toBe(null);
      expect(maskNationalId(undefined as any)).toBe(undefined);
    });

    it('should use asterisks for masking', () => {
      const result = maskNationalId('123456789');
      expect(result).toMatch(/^\*+\d{4}$/);
    });

    it('should mask a 5-character ID correctly', () => {
      expect(maskNationalId('12345')).toBe('*2345');
    });
  });

  // ── maskBankAccount ───────────────────────────────────────────
  describe('maskBankAccount', () => {
    it('should mask bank account showing only last 4 digits', () => {
      expect(maskBankAccount('1234567890')).toBe('******7890');
    });

    it('should handle 10-digit account numbers', () => {
      const result = maskBankAccount('0123456789');
      expect(result).toBe('******6789');
      expect(result.length).toBe(10);
    });

    it('should handle 12-digit account numbers', () => {
      const result = maskBankAccount('123456789012');
      expect(result).toBe('********9012');
      expect(result.length).toBe(12);
    });

    it('should return original string if length < 4', () => {
      expect(maskBankAccount('123')).toBe('123');
      expect(maskBankAccount('12')).toBe('12');
    });

    it('should return original string if exactly 4 characters', () => {
      expect(maskBankAccount('1234')).toBe('1234');
    });

    it('should return original value for empty string', () => {
      expect(maskBankAccount('')).toBe('');
    });

    it('should handle undefined/null gracefully', () => {
      expect(maskBankAccount(null as any)).toBe(null);
      expect(maskBankAccount(undefined as any)).toBe(undefined);
    });

    it('should use asterisks for masking', () => {
      const result = maskBankAccount('987654321');
      expect(result).toMatch(/^\*+\d{4}$/);
    });
  });

  // ── maskEmail ──────────────────────────────────────────────────
  describe('maskEmail', () => {
    it('should mask email keeping first and last char of local part', () => {
      // 'john.doe' is 8 chars: j + ******(6) + e = j******e
      expect(maskEmail('john.doe@company.com')).toBe('j******e@company.com');
    });

    it('should mask standard employee email', () => {
      // 'somchai.p' is 9 chars: s + *******(7) + p = s*******p
      expect(maskEmail('somchai.p@centralgroup.com')).toBe('s*******p@centralgroup.com');
    });

    it('should handle short local part (2 chars)', () => {
      expect(maskEmail('ab@domain.com')).toBe('a*@domain.com');
    });

    it('should handle single char local part', () => {
      expect(maskEmail('a@domain.com')).toBe('a*@domain.com');
    });

    it('should return original if no @ symbol', () => {
      expect(maskEmail('notanemail')).toBe('notanemail');
    });

    it('should return original value for empty string', () => {
      expect(maskEmail('')).toBe('');
    });

    it('should handle undefined/null gracefully', () => {
      expect(maskEmail(null as any)).toBe(null);
      expect(maskEmail(undefined as any)).toBe(undefined);
    });

    it('should preserve domain part unchanged', () => {
      const result = maskEmail('user@centralgroup.com');
      expect(result.split('@')[1]).toBe('centralgroup.com');
    });

    it('should mask middle characters with asterisks', () => {
      const result = maskEmail('testuser@example.com');
      expect(result).toBe('t******r@example.com');
    });

    it('should handle exactly 3 char local part', () => {
      const result = maskEmail('abc@domain.com');
      expect(result).toBe('a*c@domain.com');
    });
  });
});
