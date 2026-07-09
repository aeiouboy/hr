import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  DOCUMENT_STORYBOARD_BOUNDARY_TH,
  DOCUMENT_UPLOAD_HELPER_TH,
} from '@/lib/document-boundary';

const root = process.cwd().endsWith('/src/frontend')
  ? process.cwd().replace(/\/src\/frontend$/, '')
  : process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

describe('STA-49 document boundary storyboard copy', () => {
  it('states the visual-only production boundary consistently', () => {
    const combined = `${DOCUMENT_STORYBOARD_BOUNDARY_TH} ${DOCUMENT_UPLOAD_HELPER_TH}`;

    expect(combined).toContain('storyboard/mock metadata');
    expect(combined).toContain('production storage');
    expect(combined).toContain('e-sign');
    expect(combined).toContain('OCR');
    expect(combined).toContain('virus scan');
    expect(combined).toContain('audit');
  });

  it('wires the shared copy into Employee Center, Time, Benefit, and document-center surfaces', () => {
    const surfaces = [
      'src/frontend/src/components/humi/molecules/FileUploadField.tsx',
      'src/frontend/src/components/admin/AttachmentDropzone/AttachmentDropzone.tsx',
      'src/frontend/src/app/[locale]/profile/me/page.tsx',
      'src/frontend/src/app/[locale]/timeoff/page.tsx',
      'src/frontend/src/components/leave/leave-detail.tsx',
      'src/frontend/src/components/benefits/referral/ReferralRequestPanel.tsx',
      'src/frontend/src/components/benefits/referral/ReferralLetterPreview.tsx',
      'src/frontend/src/components/hospital-referral/referral-letter-preview.tsx',
      'src/frontend/src/app/[locale]/me/documents/page.tsx',
      'src/frontend/src/app/[locale]/me/documents/request/page.tsx',
      'src/frontend/src/app/[locale]/admin/documents/page.tsx',
      'src/frontend/src/app/[locale]/admin/system/system-features/edocuments/page.tsx',
    ];

    for (const surface of surfaces) {
      expect(read(surface), surface).toMatch(/document-boundary|DOCUMENT_(STORYBOARD_BOUNDARY|UPLOAD_HELPER)/);
    }
  });

  it('does not add backend document implementation artifacts for this storyboard', () => {
    const changedSurfaceText = [
      'src/frontend/src/lib/document-boundary.ts',
      'src/frontend/src/components/humi/molecules/FileUploadField.tsx',
      'src/frontend/src/components/admin/AttachmentDropzone/AttachmentDropzone.tsx',
    ].map(read).join('\n');

    expect(changedSurfaceText).not.toMatch(/createTable\(|CREATE TABLE|presigned|S3Client|virusScanProvider|ocrProvider|signatureProvider/);
  });
});
