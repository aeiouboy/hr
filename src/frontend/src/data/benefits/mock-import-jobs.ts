'use client';

export type ImportJobStatus = 'queued' | 'running' | 'completed' | 'failed';
export type ImportJobType = 'enrolment' | 'claim';

export interface ImportJob {
  id: string;
  filename: string;
  type: ImportJobType;
  status: ImportJobStatus;
  started: string;   // ISO datetime string
  records: number | null;
  processed: number | null;
  errors: number;
  logLines: string[];
}

export const MOCK_IMPORT_JOBS: ImportJob[] = [
  {
    id: 'IMP-0042',
    filename: 'enrolment_q1_2026.csv',
    type: 'enrolment',
    status: 'completed',
    started: '2026-05-15T09:14:00',
    records: 148,
    processed: 148,
    errors: 0,
    logLines: [
      '[09:14:00] Job IMP-0042 started',
      '[09:14:01] Parsed 148 rows from enrolment_q1_2026.csv',
      '[09:14:02] Validation passed: 148/148 rows OK',
      '[09:14:05] Inserted 148 enrolment records',
      '[09:14:05] Job IMP-0042 completed successfully',
    ],
  },
  {
    id: 'IMP-0041',
    filename: 'claims_apr_2026.csv',
    type: 'claim',
    status: 'completed',
    started: '2026-05-14T14:33:00',
    records: 92,
    processed: 90,
    errors: 2,
    logLines: [
      '[14:33:00] Job IMP-0041 started',
      '[14:33:01] Parsed 92 rows from claims_apr_2026.csv',
      '[14:33:02] Validation: 90 OK / 2 warnings',
      '[14:33:02] WARNING row 47: amount 125,000 exceeds plan limit 100,000',
      '[14:33:02] WARNING row 81: employee EMP-0319 missing eligibility rule',
      '[14:33:06] Inserted 90 claim records (2 skipped)',
      '[14:33:06] Job IMP-0041 completed with warnings',
    ],
  },
  {
    id: 'IMP-0040',
    filename: 'enrolment_batch_mar.csv',
    type: 'enrolment',
    status: 'failed',
    started: '2026-05-12T10:05:00',
    records: 55,
    processed: 0,
    errors: 55,
    logLines: [
      '[10:05:00] Job IMP-0040 started',
      '[10:05:01] Parsed 55 rows from enrolment_batch_mar.csv',
      '[10:05:01] ERROR: Column "plan_code" not found in header',
      '[10:05:01] Aborting — schema mismatch. Expected columns: employee_id, plan_code, effective_date, amount',
      '[10:05:01] Job IMP-0040 failed',
    ],
  },
  {
    id: 'IMP-0039',
    filename: 'claims_march_2026.csv',
    type: 'claim',
    status: 'running',
    started: '2026-05-16T08:50:00',
    records: 210,
    processed: 134,
    errors: 0,
    logLines: [
      '[08:50:00] Job IMP-0039 started',
      '[08:50:01] Parsed 210 rows from claims_march_2026.csv',
      '[08:50:02] Validation passed: 210/210 rows OK',
      '[08:50:03] Processing row 134/210...',
    ],
  },
  {
    id: 'IMP-0038',
    filename: 'enrolment_new_hires.csv',
    type: 'enrolment',
    status: 'queued',
    started: '2026-05-16T09:02:00',
    records: null,
    processed: null,
    errors: 0,
    logLines: [
      '[09:02:00] Job IMP-0038 queued, waiting for worker slot',
    ],
  },
  {
    id: 'IMP-0037',
    filename: 'claims_q4_2025.csv',
    type: 'claim',
    status: 'completed',
    started: '2026-04-30T16:20:00',
    records: 301,
    processed: 301,
    errors: 0,
    logLines: [
      '[16:20:00] Job IMP-0037 started',
      '[16:20:02] Parsed 301 rows from claims_q4_2025.csv',
      '[16:20:03] Validation passed: 301/301 rows OK',
      '[16:20:09] Inserted 301 claim records',
      '[16:20:09] Job IMP-0037 completed successfully',
    ],
  },
];
