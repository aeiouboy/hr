import { describe, expect, it, vi } from 'vitest';
import {
  assertEvidenceWorkerSafe,
  classifyEvidenceTarget,
  HR_QA_SCHEMA_VERSION,
  renderQaReport,
  renderSummary,
  sanitizeEvidenceText,
  sanitizeEvidenceValue,
  shouldCaptureScreenshot,
  type QaStepRecord,
} from '../../e2e/support/evidence';

function record(overrides: Partial<QaStepRecord> = {}): QaStepRecord {
  return {
    caseId: 'HR-ADMIN-HIRE-001',
    stepId: '01-open',
    title: 'Open hire wizard',
    domain: 'hr-admin',
    persona: 'hr_admin',
    runId: 'unit-run',
    schemaVersion: HR_QA_SCHEMA_VERSION,
    status: 'passed',
    url: 'http://localhost:3000/th/admin/hire',
    screenshot: 'screenshots/HR-ADMIN-HIRE-001/01-open-passed.png',
    screenshotStatus: 'captured',
    screenshotPolicy: 'screenshots allowed for local target',
    startedAt: '2026-05-07T00:00:00.000Z',
    endedAt: '2026-05-07T00:00:01.000Z',
    durationMs: 1000,
    error: null,
    projectName: 'chromium',
    retry: 0,
    testTitle: 'unit test',
    ...overrides,
  };
}

describe('HR full-suite evidence safety helpers', () => {
  it('redacts sensitive HR and secret values from text', () => {
    const raw = [
      'nationalId=1102003039997',
      'email=somchai@example.com',
      'phone=0812345678',
      'salary: 35000',
      'password=super-secret',
      'token=abc123',
      'https://example.com/callback?access_token=abc123&id_token=xyz',
    ].join(' ');

    const sanitized = sanitizeEvidenceText(raw);

    expect(sanitized).toContain('[REDACTED_NATIONAL_ID]');
    expect(sanitized).toContain('[REDACTED_EMAIL]');
    expect(sanitized).toContain('[REDACTED_PHONE]');
    expect(sanitized).toContain('[REDACTED_NUMBER]');
    expect(sanitized).toContain('[REDACTED_SECRET]');
    expect(sanitized).not.toContain('1102003039997');
    expect(sanitized).not.toContain('somchai@example.com');
    expect(sanitized).not.toContain('0812345678');
    expect(sanitized).not.toContain('abc123');
  });

  it('redacts nested input data values', () => {
    const sanitized = sanitizeEvidenceValue({
      employee: {
        email: 'somchai@example.com',
        nationalId: '1102003039997',
        phones: ['0812345678'],
      },
    });

    expect(JSON.stringify(sanitized)).not.toContain('somchai@example.com');
    expect(JSON.stringify(sanitized)).not.toContain('1102003039997');
    expect(JSON.stringify(sanitized)).not.toContain('0812345678');
  });

  it('classifies local and production evidence targets', () => {
    expect(classifyEvidenceTarget('http://localhost:3000')).toBe('local');
    expect(classifyEvidenceTarget('https://hr-opal-gamma.vercel.app')).toBe('prod');
  });

  it('blocks production screenshots unless explicitly allowed for demo or seeded data', () => {
    vi.stubEnv('HR_TEST_ALLOW_PROD_SCREENSHOTS', '');
    vi.stubEnv('HR_TEST_DATA_SCOPE', 'unknown');
    expect(shouldCaptureScreenshot('https://hr-opal-gamma.vercel.app').allowed).toBe(false);

    vi.stubEnv('HR_TEST_ALLOW_PROD_SCREENSHOTS', '1');
    vi.stubEnv('HR_TEST_DATA_SCOPE', 'production');
    expect(shouldCaptureScreenshot('https://hr-opal-gamma.vercel.app').allowed).toBe(false);

    vi.stubEnv('HR_TEST_ALLOW_PROD_SCREENSHOTS', '1');
    vi.stubEnv('HR_TEST_DATA_SCOPE', 'demo');
    expect(shouldCaptureScreenshot('https://hr-opal-gamma.vercel.app').allowed).toBe(true);

    vi.unstubAllEnvs();
  });

  it('renders sanitized QA report and compatibility summary from JSONL-shaped records', () => {
    const records = [
      record({
        expectedResult: 'Hire wizard should hide raw email somchai@example.com',
        actualResult: 'Rendered for 0812345678',
        inputDataRef: 'fixture:hire/demo-seeded-minimal-v1',
      }),
      record({
        stepId: '02-submit',
        status: 'failed',
        screenshot: null,
        screenshotStatus: 'blocked-prod',
        screenshotPolicy: 'production screenshot blocked',
        expectedResult: 'Submit is blocked without HRBP',
        actualResult: 'Submit enabled with nationalId 1102003039997',
        error: 'token=abc123 leaked in raw error',
        feedbackOnFail: 'Route to QA owner; password=secret must be hidden',
      }),
    ];

    const report = renderQaReport(records);
    const summary = renderSummary(records);

    expect(report).toContain('Expected');
    expect(report).toContain('Defect-ready failed steps');
    expect(report).toContain('fixture:hire/demo-seeded-minimal-v1');
    expect(summary).toContain('HR Full Suite Evidence Summary');
    expect(report).not.toContain('somchai@example.com');
    expect(report).not.toContain('0812345678');
    expect(report).not.toContain('1102003039997');
    expect(report).not.toContain('abc123');
    expect(report).not.toContain('password=secret');
  });

  it('fails closed for canonical evidence writes when workers are parallel', () => {
    expect(() => assertEvidenceWorkerSafe(1)).not.toThrow();
    expect(() => assertEvidenceWorkerSafe(2)).toThrow(/requires --workers=1/);
  });
});
