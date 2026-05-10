import { test, type Page, type TestInfo } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

export const HR_QA_SCHEMA_VERSION = 2;

export type StepStatus = 'passed' | 'failed';
export type EvidenceTarget = 'local' | 'demo' | 'prod';
export type ScreenshotStatus = 'captured' | 'blocked-prod' | 'failed';
export type EvidenceValue = string | number | boolean | null | EvidenceValue[] | { [key: string]: EvidenceValue };

export interface QaStepMeta {
  caseId: string;
  stepId: string;
  title: string;
  domain: string;
  persona: string;
  schemaVersion?: number;
  expectedResult?: string;
  actualResult?: string;
  inputDataRef?: string;
  inputData?: EvidenceValue;
  assertionType?: string;
  failureCategory?: string;
  feedbackOnFail?: string;
  notes?: string;
}

export interface QaStepRecord extends QaStepMeta {
  runId: string;
  schemaVersion: number;
  status: StepStatus;
  url: string;
  screenshot: string | null;
  screenshotStatus: ScreenshotStatus;
  screenshotPolicy: string;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  error: string | null;
  projectName: string;
  retry: number;
  testTitle: string;
}

const generatedRunId = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
const runId = process.env.HR_TEST_RUN_ID ?? generatedRunId;

const SECRET_QUERY_PARAMS = new Set(['access_token', 'auth', 'authorization', 'id_token', 'password', 'secret', 'token']);

export function getRunId(): string {
  return runId;
}

export function getRunArtifactRoot(): string {
  return path.resolve(
    process.env.HR_TEST_ARTIFACT_DIR ?? path.join(process.cwd(), 'test-artifacts', 'hr-full-suite', runId),
  );
}

export function sanitizeName(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120);
}

export function classifyEvidenceTarget(baseURL = process.env.BASE_URL ?? 'http://localhost:3000'): EvidenceTarget {
  const explicitTarget = process.env.HR_TEST_TARGET?.toLowerCase();
  if (explicitTarget === 'prod' || explicitTarget === 'production') return 'prod';
  if (explicitTarget === 'demo' || explicitTarget === 'preview') return 'demo';
  if (explicitTarget === 'local' || explicitTarget === 'dev') return 'local';
  if (process.env.VERCEL_ENV === 'production') return 'prod';
  if (process.env.VERCEL_ENV === 'preview') return 'demo';

  try {
    const url = new URL(baseURL);
    const hostname = url.hostname.toLowerCase();
    if (['localhost', '127.0.0.1', '::1'].includes(hostname)) return 'local';
    if (hostname.endsWith('.local') || hostname.endsWith('.test')) return 'local';
    return 'prod';
  } catch {
    return 'local';
  }
}

export function getEvidenceDataScope(): string {
  return (process.env.HR_TEST_DATA_SCOPE ?? 'unknown').toLowerCase();
}

export function shouldCaptureScreenshot(baseURL = process.env.BASE_URL ?? 'http://localhost:3000'): {
  allowed: boolean;
  status: ScreenshotStatus;
  policy: string;
} {
  const target = classifyEvidenceTarget(baseURL);
  if (target !== 'prod') {
    return { allowed: true, status: 'captured', policy: `screenshots allowed for ${target} target` };
  }

  const allowProdScreenshots = process.env.HR_TEST_ALLOW_PROD_SCREENSHOTS === '1';
  const dataScope = getEvidenceDataScope();
  const demoSafeData = dataScope === 'demo' || dataScope === 'seeded';
  if (allowProdScreenshots && demoSafeData) {
    return { allowed: true, status: 'captured', policy: `production screenshots allowed for ${dataScope} data` };
  }

  return {
    allowed: false,
    status: 'blocked-prod',
    policy: 'production screenshot blocked unless HR_TEST_ALLOW_PROD_SCREENSHOTS=1 and HR_TEST_DATA_SCOPE is demo or seeded',
  };
}

export function sanitizeEvidenceText(value: unknown): string {
  if (value === null || value === undefined) return '';
  let text = typeof value === 'string' ? value : JSON.stringify(value);

  try {
    const url = new URL(text);
    for (const key of Array.from(url.searchParams.keys())) {
      if (SECRET_QUERY_PARAMS.has(key.toLowerCase())) {
        url.searchParams.set(key, '[REDACTED_SECRET]');
      }
    }
    text = url.toString();
  } catch {
    // Not a standalone URL; continue with generic text redaction.
  }

  return text
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[REDACTED_EMAIL]')
    .replace(/\b(?:\+66|0)[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{4}\b/g, '[REDACTED_PHONE]')
    .replace(/\b\d[\s-]?\d{4}[\s-]?\d{5}[\s-]?\d{2}[\s-]?\d\b/g, '[REDACTED_NATIONAL_ID]')
    .replace(/\b(?:token|access_token|id_token|secret|password|authorization)\s*[:=]\s*[^\s,;]+/gi, '$1=[REDACTED_SECRET]')
    .replace(/\b(?:salary|baseSalary|account|bankAccount|เลขบัญชี)\s*[:=]?\s*\d[\d,.-]{3,}\b/gi, (match) => {
      const [label] = match.split(/[:=]/);
      return `${label.trim()}=[REDACTED_NUMBER]`;
    });
}

export function sanitizeEvidenceValue<T extends EvidenceValue | undefined>(value: T): T {
  if (value === undefined || value === null) return value;
  if (typeof value === 'string') return sanitizeEvidenceText(value) as T;
  if (typeof value === 'number' || typeof value === 'boolean') return value;
  if (Array.isArray(value)) return value.map((item) => sanitizeEvidenceValue(item)) as T;
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => [key, sanitizeEvidenceValue(nested as EvidenceValue)]),
  ) as T;
}

function relativeFromRoot(filePath: string): string {
  return path.relative(getRunArtifactRoot(), filePath).split(path.sep).join('/');
}

function errorSummary(error: unknown): string {
  if (error instanceof Error) {
    return sanitizeEvidenceText(error.message);
  }
  return sanitizeEvidenceText(error);
}

function resultsPath(): string {
  return path.join(getRunArtifactRoot(), 'results.jsonl');
}

function ensureRunRoot(): void {
  fs.mkdirSync(getRunArtifactRoot(), { recursive: true });
}

function appendResult(record: QaStepRecord): void {
  ensureRunRoot();
  fs.appendFileSync(resultsPath(), `${JSON.stringify(record)}\n`, 'utf8');
}

function readRecords(): QaStepRecord[] {
  if (!fs.existsSync(resultsPath())) {
    return [];
  }
  return fs
    .readFileSync(resultsPath(), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => normalizeRecord(JSON.parse(line) as Partial<QaStepRecord>));
}

function normalizeRecord(record: Partial<QaStepRecord>): QaStepRecord {
  return {
    caseId: record.caseId ?? 'UNKNOWN',
    stepId: record.stepId ?? 'UNKNOWN',
    title: sanitizeEvidenceText(record.title ?? 'Untitled step'),
    domain: sanitizeEvidenceText(record.domain ?? 'unknown'),
    persona: sanitizeEvidenceText(record.persona ?? 'unknown'),
    runId: sanitizeEvidenceText(record.runId ?? runId),
    schemaVersion: record.schemaVersion ?? 1,
    status: record.status ?? 'failed',
    url: sanitizeEvidenceText(record.url ?? ''),
    screenshot: record.screenshot ?? null,
    screenshotStatus: record.screenshotStatus ?? (record.screenshot ? 'captured' : 'blocked-prod'),
    screenshotPolicy: sanitizeEvidenceText(record.screenshotPolicy ?? (record.screenshot ? 'legacy screenshot captured' : 'legacy screenshot unavailable')),
    startedAt: record.startedAt ?? '',
    endedAt: record.endedAt ?? '',
    durationMs: record.durationMs ?? 0,
    error: record.error ? sanitizeEvidenceText(record.error) : null,
    projectName: sanitizeEvidenceText(record.projectName ?? 'unknown'),
    retry: record.retry ?? 0,
    testTitle: sanitizeEvidenceText(record.testTitle ?? ''),
    expectedResult: record.expectedResult ? sanitizeEvidenceText(record.expectedResult) : undefined,
    actualResult: record.actualResult ? sanitizeEvidenceText(record.actualResult) : undefined,
    inputDataRef: record.inputDataRef ? sanitizeEvidenceText(record.inputDataRef) : undefined,
    inputData: sanitizeEvidenceValue(record.inputData),
    assertionType: record.assertionType ? sanitizeEvidenceText(record.assertionType) : undefined,
    failureCategory: record.failureCategory ? sanitizeEvidenceText(record.failureCategory) : undefined,
    feedbackOnFail: record.feedbackOnFail ? sanitizeEvidenceText(record.feedbackOnFail) : undefined,
    notes: record.notes ? sanitizeEvidenceText(record.notes) : undefined,
  };
}

function countBy(records: QaStepRecord[], key: keyof Pick<QaStepRecord, 'status' | 'domain' | 'persona'>): Record<string, number> {
  return records.reduce<Record<string, number>>((acc, record) => {
    acc[record[key]] = (acc[record[key]] ?? 0) + 1;
    return acc;
  }, {});
}

export function renderSummary(records: QaStepRecord[]): string {
  const lines = [
    `# HR Full Suite Evidence Summary`,
    '',
    `- Run ID: ${sanitizeEvidenceText(runId)}`,
    `- Total steps: ${records.length}`,
    `- Artifact root: \`${sanitizeEvidenceText(path.relative(process.cwd(), getRunArtifactRoot()) || '.')}\``,
    '',
    '## Totals by status',
    '',
    ...Object.entries(countBy(records, 'status')).map(([name, count]) => `- ${sanitizeEvidenceText(name)}: ${count}`),
    '',
    '## Totals by domain',
    '',
    ...Object.entries(countBy(records, 'domain')).map(([name, count]) => `- ${sanitizeEvidenceText(name)}: ${count}`),
    '',
    '## Totals by persona',
    '',
    ...Object.entries(countBy(records, 'persona')).map(([name, count]) => `- ${sanitizeEvidenceText(name)}: ${count}`),
    '',
    '## Steps',
    '',
    '| Status | Case | Step | Persona | Domain | Screenshot |',
    '|---|---|---|---|---|---|',
    ...records.map((record) => {
      const screenshot = record.screenshot
        ? `[png](${sanitizeEvidenceText(record.screenshot)})`
        : `- (${sanitizeEvidenceText(record.screenshotStatus)})`;
      return `| ${record.status} | ${sanitizeEvidenceText(record.caseId)} | ${sanitizeEvidenceText(record.stepId)} ${sanitizeEvidenceText(record.title)} | ${sanitizeEvidenceText(record.persona)} | ${sanitizeEvidenceText(record.domain)} | ${screenshot} |`;
    }),
  ];

  const failed = records.filter((record) => record.status === 'failed');
  if (failed.length > 0) {
    lines.push('', '## Failed steps', '');
    for (const record of failed) {
      lines.push(`- ${sanitizeEvidenceText(record.caseId)}/${sanitizeEvidenceText(record.stepId)}: ${sanitizeEvidenceText(record.error ?? record.feedbackOnFail ?? 'Unknown error')}`);
    }
  }

  return `${lines.join('\n')}\n`;
}

export function renderQaReport(records: QaStepRecord[]): string {
  const lines = [
    '# HR QA Evidence Report',
    '',
    `- Run ID: ${sanitizeEvidenceText(runId)}`,
    `- Schema version: ${HR_QA_SCHEMA_VERSION}`,
    `- Total steps: ${records.length}`,
    '',
    '## Scenario steps',
    '',
    '| Status | Case | Step | Data | Expected | Actual | Screenshot |',
    '|---|---|---|---|---|---|---|',
    ...records.map((record) => {
      const data = sanitizeEvidenceText(record.inputDataRef ?? (record.inputData ? sanitizeEvidenceText(record.inputData) : '-'));
      const expected = sanitizeEvidenceText(record.expectedResult ?? '-');
      const actual = sanitizeEvidenceText(record.actualResult ?? (record.error ?? '-'));
      const screenshot = record.screenshot
        ? `[png](${sanitizeEvidenceText(record.screenshot)})`
        : sanitizeEvidenceText(record.screenshotPolicy);
      return `| ${record.status} | ${sanitizeEvidenceText(record.caseId)} | ${sanitizeEvidenceText(record.stepId)} ${sanitizeEvidenceText(record.title)} | ${data} | ${expected} | ${actual} | ${screenshot} |`;
    }),
  ];

  const failed = records.filter((record) => record.status === 'failed');
  if (failed.length > 0) {
    lines.push('', '## Defect-ready failed steps', '');
    for (const record of failed) {
      lines.push(
        `### ${sanitizeEvidenceText(record.caseId)}/${sanitizeEvidenceText(record.stepId)}`,
        '',
        `- Persona/domain: ${sanitizeEvidenceText(record.persona)} / ${sanitizeEvidenceText(record.domain)}`,
        `- Expected: ${sanitizeEvidenceText(record.expectedResult ?? '-')}`,
        `- Actual: ${sanitizeEvidenceText(record.actualResult ?? record.error ?? '-')}`,
        `- Failure category: ${sanitizeEvidenceText(record.failureCategory ?? 'uncategorized')}`,
        `- Feedback: ${sanitizeEvidenceText(record.feedbackOnFail ?? record.error ?? 'No feedback supplied')}`,
        `- Screenshot: ${sanitizeEvidenceText(record.screenshot ? record.screenshot : record.screenshotPolicy)}`,
        `- URL: ${sanitizeEvidenceText(record.url)}`,
        '',
      );
    }
  }

  return `${lines.join('\n')}\n`;
}

export function writeSummary(): void {
  ensureRunRoot();
  const records = readRecords();
  fs.writeFileSync(path.join(getRunArtifactRoot(), 'summary.md'), renderSummary(records), 'utf8');
  fs.writeFileSync(path.join(getRunArtifactRoot(), 'qa-report.md'), renderQaReport(records), 'utf8');
}

export function assertEvidenceWorkerSafe(workerCount: number): void {
  if (process.env.HR_TEST_ALLOW_PARALLEL_EVIDENCE === '1') return;
  if (workerCount > 1) {
    throw new Error(
      `HR full-suite evidence requires --workers=1 for canonical JSONL writes; received workers=${workerCount}`,
    );
  }
}

function assertWorkerSafe(testInfo: TestInfo): void {
  assertEvidenceWorkerSafe(testInfo.config.workers);
}

function summarizeActionResult(value: unknown): string | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === 'string') return sanitizeEvidenceText(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return sanitizeEvidenceText(value);
}

function sanitizeMeta(meta: QaStepMeta): QaStepMeta {
  return {
    ...meta,
    title: sanitizeEvidenceText(meta.title),
    domain: sanitizeEvidenceText(meta.domain),
    persona: sanitizeEvidenceText(meta.persona),
    expectedResult: meta.expectedResult ? sanitizeEvidenceText(meta.expectedResult) : undefined,
    actualResult: meta.actualResult ? sanitizeEvidenceText(meta.actualResult) : undefined,
    inputDataRef: meta.inputDataRef ? sanitizeEvidenceText(meta.inputDataRef) : undefined,
    inputData: sanitizeEvidenceValue(meta.inputData),
    assertionType: meta.assertionType ? sanitizeEvidenceText(meta.assertionType) : undefined,
    failureCategory: meta.failureCategory ? sanitizeEvidenceText(meta.failureCategory) : undefined,
    feedbackOnFail: meta.feedbackOnFail ? sanitizeEvidenceText(meta.feedbackOnFail) : undefined,
    notes: meta.notes ? sanitizeEvidenceText(meta.notes) : undefined,
  };
}

export async function qaStep<T>(
  testInfo: TestInfo,
  page: Page,
  meta: QaStepMeta,
  action: () => Promise<T>,
): Promise<T> {
  return test.step(`${meta.caseId} ${meta.stepId} — ${meta.title}`, async () => {
    assertWorkerSafe(testInfo);

    const started = Date.now();
    const startedAt = new Date(started).toISOString();
    const sanitizedMeta = sanitizeMeta(meta);
    let status: StepStatus = 'passed';
    let error: unknown = null;
    let result: T | undefined;

    try {
      result = await action();
    } catch (caught) {
      status = 'failed';
      error = caught;
    }

    const screenshotDecision = shouldCaptureScreenshot(page.url() || process.env.BASE_URL);
    const screenshotPath = path.join(
      getRunArtifactRoot(),
      'screenshots',
      sanitizeName(meta.caseId),
      `${sanitizeName(meta.stepId)}-${status}.png`,
    );

    let screenshot: string | null = null;
    let screenshotStatus = screenshotDecision.status;
    let screenshotPolicy = screenshotDecision.policy;

    if (screenshotDecision.allowed) {
      fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
      screenshot = relativeFromRoot(screenshotPath);
      try {
        await page.screenshot({ path: screenshotPath, fullPage: true });
        await testInfo.attach(`${meta.caseId}-${meta.stepId}-${status}`, {
          path: screenshotPath,
          contentType: 'image/png',
        });
      } catch (screenshotError) {
        screenshot = null;
        screenshotStatus = 'failed';
        screenshotPolicy = 'screenshot capture failed';
        if (!error) {
          error = screenshotError;
          status = 'failed';
        }
      }
    }

    const ended = Date.now();
    appendResult({
      ...sanitizedMeta,
      actualResult: sanitizedMeta.actualResult ?? summarizeActionResult(result),
      runId,
      schemaVersion: sanitizedMeta.schemaVersion ?? HR_QA_SCHEMA_VERSION,
      status,
      url: sanitizeEvidenceText(page.url()),
      screenshot,
      screenshotStatus,
      screenshotPolicy: sanitizeEvidenceText(screenshotPolicy),
      startedAt,
      endedAt: new Date(ended).toISOString(),
      durationMs: ended - started,
      error: error ? errorSummary(error) : null,
      projectName: sanitizeEvidenceText(testInfo.project.name),
      retry: testInfo.retry,
      testTitle: sanitizeEvidenceText(testInfo.title),
    });
    writeSummary();

    if (error) {
      throw error;
    }
    return result as T;
  });
}
