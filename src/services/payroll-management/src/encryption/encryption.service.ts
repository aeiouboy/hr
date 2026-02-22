import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, createHash } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly keyLength = 32;
  private readonly ivLength = 16;
  private readonly authTagLength = 16;

  private getKey(): Buffer {
    const envKey = 'PAYROLL_ENCRYPTION_KEY';
    const key = process.env[envKey];
    if (!key) {
      throw new Error('PAYROLL_ENCRYPTION_KEY is not configured');
    }
    return createHash('sha256').update(key).digest();
  }

  encrypt(plaintext: string): string {
    const key = this.getKey();
    const iv = randomBytes(this.ivLength);
    const cipher = createCipheriv(this.algorithm, key, iv, { authTagLength: this.authTagLength });

    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    const authTag = cipher.getAuthTag();

    return iv.toString('base64') + ':' + authTag.toString('base64') + ':' + encrypted;
  }

  decrypt(ciphertext: string): string {
    const key = this.getKey();
    const parts = ciphertext.split(':');

    if (parts.length !== 3) {
      throw new Error('Invalid ciphertext format');
    }

    const [ivB64, authTagB64, encryptedB64] = parts;
    const iv = Buffer.from(ivB64, 'base64');
    const authTag = Buffer.from(authTagB64, 'base64');

    const decipher = createDecipheriv(this.algorithm, key, iv, { authTagLength: this.authTagLength });
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedB64, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  hashForSearch(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
}
