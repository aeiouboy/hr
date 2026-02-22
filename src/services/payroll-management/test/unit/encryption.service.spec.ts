const MOCK_KEY = 'test-encryption-key-for-unit-tests-only';

// Set env before importing
process.env['PAYROLL_ENCRYPTION_KEY'] = MOCK_KEY;

import { EncryptionService } from '../../src/encryption/encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(() => {
    service = new EncryptionService();
  });

  describe('encrypt/decrypt', () => {
    it('should encrypt and decrypt a string correctly', () => {
      const original = '50000';
      const encrypted = service.encrypt(original);
      expect(encrypted).not.toBe(original);
      const decrypted = service.decrypt(encrypted);
      expect(decrypted).toBe(original);
    });

    it('should produce different ciphertexts for same plaintext (random IV)', () => {
      const original = '75000';
      const encrypted1 = service.encrypt(original);
      const encrypted2 = service.encrypt(original);
      expect(encrypted1).not.toBe(encrypted2);
    });

    it('should handle numeric strings', () => {
      const values = ['0', '100', '999999.99', '1234567890'];
      for (const val of values) {
        const encrypted = service.encrypt(val);
        expect(service.decrypt(encrypted)).toBe(val);
      }
    });

    it('should handle empty string', () => {
      const encrypted = service.encrypt('');
      expect(service.decrypt(encrypted)).toBe('');
    });

    it('should throw on tampered ciphertext', () => {
      const encrypted = service.encrypt('50000');
      const tampered = encrypted.slice(0, -4) + 'xxxx';
      expect(() => service.decrypt(tampered)).toThrow();
    });

    it('should produce format iv:authTag:ciphertext', () => {
      const encrypted = service.encrypt('12345');
      const parts = encrypted.split(':');
      expect(parts).toHaveLength(3);
    });
  });

  describe('hashForSearch', () => {
    it('should produce consistent hash for same input', () => {
      const hash1 = service.hashForSearch('test-value');
      const hash2 = service.hashForSearch('test-value');
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different inputs', () => {
      const hash1 = service.hashForSearch('value1');
      const hash2 = service.hashForSearch('value2');
      expect(hash1).not.toBe(hash2);
    });

    it('should return hex string', () => {
      const hash = service.hashForSearch('test');
      expect(hash).toMatch(/^[a-f0-9]+$/);
    });
  });
});
