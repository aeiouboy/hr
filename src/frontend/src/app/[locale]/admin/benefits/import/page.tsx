'use client';

import { useState, useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Play,
  ClipboardList,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardEyebrow,
  CardTitle,
  DataTable,
  Button,
  Modal,
} from '@/components/humi';
import type { DataTableColumn } from '@/components/humi';
import { Stepper } from '@/components/admin/wizard/Stepper';
import { AsOfDatePicker } from '@/components/benefits/AsOfDatePicker';
import { mockProgress } from '@/lib/mock-async';
import {
  MOCK_IMPORT_JOBS,
  type ImportJob,
  type ImportJobStatus,
} from '@/data/benefits/mock-import-jobs';

// ─── Types ────────────────────────────────────────────────────────────────────

type CsvType = 'enrolment' | 'claim';

interface EnrolmentRow {
  employee_id: string;
  employee_name_th: string;
  employee_name_en: string;
  plan_code: string;
  plan_name_th: string;
  effective_date: string;
  amount_thb: string;
  department: string;
  note: string;
}

interface ClaimRow {
  employee_id: string;
  employee_name_th: string;
  employee_name_en: string;
  claim_type: string;
  receipt_date: string;
  receipt_no: string;
  amount_thb: string;
  hospital: string;
  note: string;
}

interface ValidationItem {
  row: number;
  severity: 'ok' | 'warning' | 'error';
  messageTh: string;
  messageEn: string;
}

// ─── Mock seed data ───────────────────────────────────────────────────────────

const ENROLMENT_ROWS: EnrolmentRow[] = [
  { employee_id: 'EMP-0101', employee_name_th: 'สมชาย ใจดี', employee_name_en: 'Somchai Jaidee', plan_code: 'MED-A', plan_name_th: 'ประกันสุขภาพ A', effective_date: '2026-01-01', amount_thb: '15,000', department: 'Operations', note: '' },
  { employee_id: 'EMP-0102', employee_name_th: 'นิดา พรมมา', employee_name_en: 'Nida Pramma', plan_code: 'MED-B', plan_name_th: 'ประกันสุขภาพ B', effective_date: '2026-01-01', amount_thb: '20,000', department: 'Finance', note: '' },
  { employee_id: 'EMP-0103', employee_name_th: 'วิชัย ทองดี', employee_name_en: 'Wichai Thongdee', plan_code: 'DENT-STD', plan_name_th: 'ทันตกรรมมาตรฐาน', effective_date: '2026-01-01', amount_thb: '5,000', department: 'IT', note: '' },
  { employee_id: 'EMP-0104', employee_name_th: 'ปิยะ แสงศรี', employee_name_en: 'Piya Saengsri', plan_code: 'LIFE-GRP', plan_name_th: 'ประกันชีวิตกลุ่ม', effective_date: '2026-01-01', amount_thb: '300,000', department: 'HR', note: '' },
  { employee_id: 'EMP-0105', employee_name_th: 'ลักษณา วงค์ศรี', employee_name_en: 'Luksana Wongsri', plan_code: 'MED-A', plan_name_th: 'ประกันสุขภาพ A', effective_date: '2026-01-01', amount_thb: '15,000', department: 'Marketing', note: '' },
  { employee_id: 'EMP-0106', employee_name_th: 'อนุวัฒน์ มีสุข', employee_name_en: 'Anuwat Meesuk', plan_code: 'VISION-STD', plan_name_th: 'สายตาปกติ', effective_date: '2026-02-01', amount_thb: '3,000', department: 'Sales', note: 'New hire Feb 2026' },
  { employee_id: 'EMP-0107', employee_name_th: 'ชลิดา ทรัพย์มาก', employee_name_en: 'Chalida Sapmark', plan_code: 'MED-B', plan_name_th: 'ประกันสุขภาพ B', effective_date: '2026-01-01', amount_thb: '20,000', department: 'Accounting', note: '' },
  { employee_id: 'EMP-0108', employee_name_th: 'ธนา ศรีสวัสดิ์', employee_name_en: 'Thana Srisawat', plan_code: 'MED-A', plan_name_th: 'ประกันสุขภาพ A', effective_date: '2026-01-01', amount_thb: '15,000', department: 'Legal', note: '' },
  { employee_id: 'EMP-0109', employee_name_th: 'กนกวรรณ สุขใจ', employee_name_en: 'Kanokwan Sukjai', plan_code: 'DENT-PLUS', plan_name_th: 'ทันตกรรมพลัส', effective_date: '2026-03-01', amount_thb: '8,000', department: 'Operations', note: '' },
  { employee_id: 'EMP-0110', employee_name_th: 'ศุภชัย พงษ์ไทย', employee_name_en: 'Suphachai Phongthai', plan_code: 'FLEX-BEN', plan_name_th: 'Flexible Benefit', effective_date: '2026-01-01', amount_thb: '25,000', department: 'Executive', note: '' },
];

const CLAIM_ROWS: ClaimRow[] = [
  { employee_id: 'EMP-0201', employee_name_th: 'มาลี ดอกไม้', employee_name_en: 'Malee Dokmai', claim_type: 'OPD', receipt_date: '2026-04-10', receipt_no: 'RC-20240410-001', amount_thb: '1,200', hospital: 'โรงพยาบาลสมิติเวช', note: '' },
  { employee_id: 'EMP-0202', employee_name_th: 'ประพันธ์ ชาวนา', employee_name_en: 'Praphan Chawna', claim_type: 'IPD', receipt_date: '2026-04-12', receipt_no: 'RC-20240412-008', amount_thb: '45,800', hospital: 'โรงพยาบาลบำรุงราษฎร์', note: 'Hospitalized 3 nights' },
  { employee_id: 'EMP-0203', employee_name_th: 'วรรณา เจริญสุข', employee_name_en: 'Wanna Charoensuk', claim_type: 'DENTAL', receipt_date: '2026-04-15', receipt_no: 'RC-20240415-003', amount_thb: '3,500', hospital: 'คลินิกทันตกรรมยิ้มสวย', note: 'Filling x2' },
  { employee_id: 'EMP-0204', employee_name_th: 'กิตติ วรพงษ์', employee_name_en: 'Kitti Woraphong', claim_type: 'OPD', receipt_date: '2026-04-18', receipt_no: 'RC-20240418-012', amount_thb: '850', hospital: 'โรงพยาบาลพระมงกุฎ', note: '' },
  { employee_id: 'EMP-0205', employee_name_th: 'สุดา ภักดี', employee_name_en: 'Suda Phakdee', claim_type: 'VISION', receipt_date: '2026-04-20', receipt_no: 'RC-20240420-005', amount_thb: '2,800', hospital: 'ร้านแว่นตาดีเอส', note: 'Progressive lenses' },
  { employee_id: 'EMP-0206', employee_name_th: 'นพดล มั่งมี', employee_name_en: 'Noppadol Mangmee', claim_type: 'OPD', receipt_date: '2026-04-22', receipt_no: 'RC-20240422-009', amount_thb: '1,650', hospital: 'โรงพยาบาลกรุงเทพ', note: '' },
  { employee_id: 'EMP-0207', employee_name_th: 'ภัทรา ลิ้มสกุล', employee_name_en: 'Phatra Limsagul', claim_type: 'IPD', receipt_date: '2026-04-25', receipt_no: 'RC-20240425-002', amount_thb: '125,000', hospital: 'โรงพยาบาลเวชธานี', note: 'Surgery — exceeds limit' },
  { employee_id: 'EMP-0208', employee_name_th: 'สิทธิชัย ปิยะรัตน์', employee_name_en: 'Sittichai Piyarat', claim_type: 'DENTAL', receipt_date: '2026-04-28', receipt_no: 'RC-20240428-006', amount_thb: '6,200', hospital: 'ศูนย์ทันตกรรมไทย', note: '' },
  { employee_id: 'EMP-0209', employee_name_th: 'จิราภา สว่างใจ', employee_name_en: 'Jirapa Sawangjai', claim_type: 'OPD', receipt_date: '2026-04-30', receipt_no: 'RC-20240430-014', amount_thb: '975', hospital: 'โรงพยาบาลนครธน', note: '' },
  { employee_id: 'EMP-0210', employee_name_th: 'อภิชาติ ศรีประเสริฐ', employee_name_en: 'Aphichat Sriprasert', claim_type: 'OPD', receipt_date: '2026-05-02', receipt_no: 'RC-20240502-007', amount_thb: '1,100', hospital: 'โรงพยาบาลพระราม 9', note: '' },
];

const MOCK_VALIDATION_ENROLMENT: ValidationItem[] = [
  { row: 1, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 2, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 3, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 4, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 5, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 6, severity: 'warning', messageTh: 'ยังไม่มีกฎการมีสิทธิ์', messageEn: 'Missing eligibility rule' },
  { row: 7, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 8, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 9, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 10, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
];

const MOCK_VALIDATION_CLAIM: ValidationItem[] = [
  { row: 1, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 2, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 3, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 4, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 5, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 6, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 7, severity: 'warning', messageTh: 'จำนวนเกินวงเงิน 100,000 บาท', messageEn: 'Amount exceeds plan limit 100,000 THB' },
  { row: 8, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 9, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
  { row: 10, severity: 'ok', messageTh: 'ถูกต้อง', messageEn: 'Valid' },
];

// ─── Stepper config ───────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  { number: 1, labelTh: 'อัปโหลด', labelEn: 'Upload', descTh: 'เลือกไฟล์ CSV และกำหนดวันที่มีผล' },
  { number: 2, labelTh: 'ตรวจสอบ', labelEn: 'Preview', descTh: 'ดูตัวอย่างข้อมูล 10 แถวแรก' },
  { number: 3, labelTh: 'ยืนยัน', labelEn: 'Validate', descTh: 'ตรวจสอบความถูกต้องของข้อมูล' },
  { number: 4, labelTh: 'รันงาน', labelEn: 'Run', descTh: 'ยืนยันและประมวลผลการนำเข้า' },
] as const;

// ─── Helper: status chip ──────────────────────────────────────────────────────

function StatusChip({ status, isTh }: { status: ImportJobStatus; isTh: boolean }) {
  const label: Record<ImportJobStatus, { th: string; en: string }> = {
    queued: { th: 'รอคิว', en: 'Queued' },
    running: { th: 'กำลังทำงาน', en: 'Running' },
    completed: { th: 'เสร็จสิ้น', en: 'Completed' },
    failed: { th: 'ล้มเหลว', en: 'Failed' },
  };
  const cls: Record<ImportJobStatus, string> = {
    queued: 'bg-warning-soft text-warning-ink border border-warning/30',
    running: 'bg-accent-soft text-accent border border-accent/30',
    completed: 'bg-success-soft text-success-ink border border-success/30',
    failed: 'bg-error-soft text-error-ink border border-error/30',
  };

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', cls[status])}>
      {status === 'running' && <span aria-hidden>⟳</span>}
      {isTh ? label[status].th : label[status].en}
    </span>
  );
}

// ─── Helper: severity badge ───────────────────────────────────────────────────

function SeverityBadge({ severity, isTh }: { severity: ValidationItem['severity']; isTh: boolean }) {
  if (severity === 'ok') {
    return (
      <span className="inline-flex items-center gap-1 text-success text-xs font-medium">
        <CheckCircle2 size={13} />
        {isTh ? 'ถูกต้อง' : 'Valid'}
      </span>
    );
  }
  if (severity === 'warning') {
    return (
      <span className="inline-flex items-center gap-1 text-warning-ink text-xs font-medium">
        <AlertTriangle size={13} />
        {isTh ? 'เตือน' : 'Warning'}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-error-ink text-xs font-medium">
      <XCircle size={13} />
      {isTh ? 'ผิดพลาด' : 'Error'}
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function BenefitImportPage() {
  const locale = useLocale();
  const params = useParams<{ locale: string }>();
  const loc = params?.locale ?? locale ?? 'th';
  const isTh = loc !== 'en';

  // Wizard state
  const [step, setStep] = useState(1);
  const [csvType, setCsvType] = useState<CsvType>('enrolment');
  const [asOfDate, setAsOfDate] = useState('2026-05-16');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [incrementalLoad, setIncrementalLoad] = useState(true);
  const [useLocaleFormat, setUseLocaleFormat] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Run state
  const [isRunning, setIsRunning] = useState(false);
  const [runStep, setRunStep] = useState(0);
  const [runDone, setRunDone] = useState(false);

  // Monitor job panel
  const [jobs] = useState<ImportJob[]>(MOCK_IMPORT_JOBS);
  const [logModalJob, setLogModalJob] = useState<ImportJob | null>(null);

  const validationItems = csvType === 'enrolment' ? MOCK_VALIDATION_ENROLMENT : MOCK_VALIDATION_CLAIM;
  const validOk = validationItems.filter((v) => v.severity === 'ok').length;
  const validWarning = validationItems.filter((v) => v.severity === 'warning').length;
  const validError = validationItems.filter((v) => v.severity === 'error').length;

  const RUN_STEPS = [
    isTh ? 'กำลังเตรียมข้อมูล…' : 'Preparing data…',
    isTh ? 'ตรวจสอบ schema…' : 'Validating schema…',
    isTh ? 'กำลังอ่านแถว…' : 'Reading rows…',
    isTh ? 'ตรวจสอบ eligibility…' : 'Checking eligibility…',
    isTh ? 'กำลังเขียนข้อมูล…' : 'Writing records…',
    isTh ? 'กำลังสร้าง audit log…' : 'Creating audit log…',
    isTh ? 'กำลัง commit transaction…' : 'Committing transaction…',
    isTh ? 'เสร็จสิ้น' : 'Done',
  ];

  // File handling
  const handleFileSelected = useCallback((file: File | undefined) => {
    if (!file) return;
    setSelectedFile({ name: file.name, size: file.size });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    },
    [handleFileSelected],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelected(e.target.files?.[0]);
    },
    [handleFileSelected],
  );

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleRun = async () => {
    setIsRunning(true);
    setRunStep(0);
    await mockProgress(8, (s) => setRunStep(s), 400);
    setIsRunning(false);
    setRunDone(true);
  };

  // ── Step 1: Upload ───────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="space-y-6">
      {/* CSV type */}
      <div>
        <p className="mb-2 text-small font-semibold text-ink">
          {isTh ? 'ประเภทข้อมูล' : 'CSV Type'}
        </p>
        <div className="flex flex-wrap gap-4">
          {(['enrolment', 'claim'] as CsvType[]).map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2 text-small text-ink select-none">
              <input
                type="radio"
                name="csvType"
                value={t}
                checked={csvType === t}
                onChange={() => setCsvType(t)}
                className="h-4 w-4 accent-accent"
              />
              <span className="font-medium">
                {t === 'enrolment'
                  ? isTh ? 'ลงทะเบียนสวัสดิการ' : 'Benefit Enrolment'
                  : isTh ? 'เคลมสวัสดิการ' : 'Employee Claim'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* As-of date */}
      <div className="max-w-xs">
        <AsOfDatePicker
          value={asOfDate}
          onChange={setAsOfDate}
          isTh={isTh}
          label={isTh ? 'วันที่มีผลของข้อมูลที่นำเข้า' : 'Effective date of imported records'}
          showBuddhistToggle
        />
      </div>

      {/* Drop zone */}
      <div>
        <p className="mb-2 text-small font-semibold text-ink">
          {isTh ? 'ไฟล์ CSV' : 'CSV File'}
        </p>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border-2 border-dashed px-6 py-12 text-center transition-colors',
            isDragging ? 'border-accent bg-accent-soft' : 'border-hairline bg-canvas-soft hover:border-accent/50 hover:bg-accent-soft/50',
          )}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
          aria-label={isTh ? 'คลิกหรือลากไฟล์ CSV มาวาง' : 'Click or drag CSV file here'}
        >
          <Upload className="h-8 w-8 text-ink-muted" aria-hidden />
          <div>
            <p className="font-semibold text-ink">
              {isTh ? 'คลิกหรือลากไฟล์มาวาง' : 'Click or drag file here'}
            </p>
            <p className="mt-1 text-small text-ink-muted">
              {isTh ? 'รองรับไฟล์ .csv ขนาดไม่เกิน 10 MB' : 'Accepts .csv files up to 10 MB'}
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="sr-only"
          onChange={handleFileInputChange}
          aria-label={isTh ? 'เลือกไฟล์ CSV' : 'Select CSV file'}
        />

        {selectedFile && (
          <div className="mt-3 flex items-center gap-3 rounded-[var(--radius-md)] border border-hairline bg-surface px-4 py-3">
            <FileText className="h-5 w-5 shrink-0 text-accent" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="truncate text-small font-medium text-ink">{selectedFile.name}</p>
              <p className="text-xs text-ink-muted">{formatBytes(selectedFile.size)}</p>
            </div>
            <button
              className="text-xs text-ink-muted underline hover:text-ink"
              onClick={(e) => { e.stopPropagation(); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
            >
              {isTh ? 'ลบ' : 'Remove'}
            </button>
          </div>
        )}
      </div>

      {/* Help text */}
      <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4 text-small text-ink-muted">
        <p className="font-semibold text-ink mb-1">
          {isTh ? 'รูปแบบไฟล์ที่รองรับ' : 'Expected CSV format'}
        </p>
        {csvType === 'enrolment' ? (
          <p className="font-mono text-xs">employee_id, plan_code, effective_date, amount_thb, department, note</p>
        ) : (
          <p className="font-mono text-xs">employee_id, claim_type, receipt_date, receipt_no, amount_thb, hospital, note</p>
        )}
        <p className="mt-2">
          {isTh
            ? 'แถวแรกต้องเป็น header. ใช้ comma เป็น delimiter. Encoding: UTF-8.'
            : 'First row must be the header. Use comma delimiter. Encoding: UTF-8.'}
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => setStep(2)}
          disabled={!selectedFile}
        >
          {isTh ? 'ถัดไป: ตรวจสอบ →' : 'Next: Preview →'}
        </Button>
      </div>
    </div>
  );

  // ── Step 2: Preview ──────────────────────────────────────────────────────────
  const renderStep2 = () => {
    if (csvType === 'enrolment') {
      const cols: DataTableColumn<EnrolmentRow>[] = [
        { id: 'employee_id', header: isTh ? 'รหัสพนักงาน' : 'Employee ID', cell: (r) => <span className="font-mono text-small">{r.employee_id}</span> },
        {
          id: 'name', header: isTh ? 'ชื่อพนักงาน' : 'Employee Name', cell: (r) => (
            <div>
              <p className="text-small font-medium text-ink">{r.employee_name_th}</p>
              <p className="text-xs text-ink-muted">{r.employee_name_en}</p>
            </div>
          ),
        },
        {
          id: 'plan_code', header: isTh ? 'แผน' : 'Plan', cell: (r) => (
            <div>
              <p className="text-small text-ink">{r.plan_code}</p>
              <p className="text-xs text-ink-muted">{r.plan_name_th}</p>
            </div>
          ),
        },
        { id: 'effective_date', header: isTh ? 'วันที่มีผล' : 'Effective', cell: (r) => <span className="text-small text-ink-muted">{r.effective_date}</span> },
        { id: 'amount_thb', header: isTh ? 'จำนวน (บาท)' : 'Amount (THB)', align: 'right' as const, cell: (r) => <span className="font-semibold text-ink">{r.amount_thb}</span> },
        { id: 'department', header: isTh ? 'แผนก' : 'Dept', cell: (r) => <span className="text-small text-ink-muted">{r.department}</span> },
      ];
      return (
        <div className="space-y-4">
          <p className="text-small text-ink-muted">
            {isTh ? `แสดง 10 แถวแรกจากไฟล์: ${selectedFile?.name}` : `Showing first 10 rows from: ${selectedFile?.name}`}
          </p>
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-hairline">
            <DataTable caption={isTh ? 'ตัวอย่างข้อมูล' : 'Preview'} captionVisuallyHidden columns={cols} rows={ENROLMENT_ROWS} rowKey={(r) => r.employee_id} dense />
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)}>{isTh ? '← ย้อนกลับ' : '← Back'}</Button>
            <Button onClick={() => setStep(3)}>{isTh ? 'ถัดไป: ยืนยัน →' : 'Next: Validate →'}</Button>
          </div>
        </div>
      );
    }

    const cols: DataTableColumn<ClaimRow>[] = [
      { id: 'employee_id', header: isTh ? 'รหัสพนักงาน' : 'Employee ID', cell: (r) => <span className="font-mono text-small">{r.employee_id}</span> },
      {
        id: 'name', header: isTh ? 'ชื่อพนักงาน' : 'Employee Name', cell: (r) => (
          <div>
            <p className="text-small font-medium text-ink">{r.employee_name_th}</p>
            <p className="text-xs text-ink-muted">{r.employee_name_en}</p>
          </div>
        ),
      },
      { id: 'claim_type', header: isTh ? 'ประเภทเคลม' : 'Claim Type', cell: (r) => <span className="text-small text-ink">{r.claim_type}</span> },
      { id: 'receipt_date', header: isTh ? 'วันที่ใบเสร็จ' : 'Receipt Date', cell: (r) => <span className="text-small text-ink-muted">{r.receipt_date}</span> },
      { id: 'amount_thb', header: isTh ? 'จำนวน (บาท)' : 'Amount (THB)', align: 'right' as const, cell: (r) => <span className="font-semibold text-ink">{r.amount_thb}</span> },
      { id: 'hospital', header: isTh ? 'สถานพยาบาล' : 'Hospital', cell: (r) => <span className="text-small text-ink-muted">{r.hospital}</span> },
    ];
    return (
      <div className="space-y-4">
        <p className="text-small text-ink-muted">
          {isTh ? `แสดง 10 แถวแรกจากไฟล์: ${selectedFile?.name}` : `Showing first 10 rows from: ${selectedFile?.name}`}
        </p>
        <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-hairline">
          <DataTable caption={isTh ? 'ตัวอย่างข้อมูล' : 'Preview'} captionVisuallyHidden columns={cols} rows={CLAIM_ROWS} rowKey={(r) => r.employee_id} dense />
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(1)}>{isTh ? '← ย้อนกลับ' : '← Back'}</Button>
          <Button onClick={() => setStep(3)}>{isTh ? 'ถัดไป: ยืนยัน →' : 'Next: Validate →'}</Button>
        </div>
      </div>
    );
  };

  // ── Step 3: Validate ─────────────────────────────────────────────────────────
  const renderStep3 = () => {
    const valCols: DataTableColumn<ValidationItem>[] = [
      { id: 'row', header: isTh ? 'แถว' : 'Row', cell: (r) => <span className="font-mono text-small">#{r.row}</span> },
      { id: 'severity', header: isTh ? 'สถานะ' : 'Status', cell: (r) => <SeverityBadge severity={r.severity} isTh={isTh} /> },
      { id: 'message', header: isTh ? 'รายละเอียด' : 'Detail', cell: (r) => <span className="text-small text-ink-muted">{isTh ? r.messageTh : r.messageEn}</span> },
    ];

    return (
      <div className="space-y-5">
        {/* Summary badges */}
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success-soft px-3 py-1 text-small font-semibold text-success-ink">
            <CheckCircle2 size={14} />{validOk} {isTh ? 'ถูกต้อง' : 'valid'}
          </span>
          {validWarning > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-warning-soft px-3 py-1 text-small font-semibold text-warning-ink">
              <AlertTriangle size={14} />{validWarning} {isTh ? 'เตือน' : 'warnings'}
            </span>
          )}
          {validError > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-error/30 bg-error-soft px-3 py-1 text-small font-semibold text-error-ink">
              <XCircle size={14} />{validError} {isTh ? 'ผิดพลาด' : 'errors'}
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-hairline">
          <DataTable caption={isTh ? 'ผลตรวจสอบ' : 'Validation results'} captionVisuallyHidden columns={valCols} rows={validationItems} rowKey={(r) => String(r.row)} dense />
        </div>

        {/* Options */}
        <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4 space-y-3">
          <p className="text-small font-semibold text-ink">{isTh ? 'ตัวเลือกการนำเข้า' : 'Import options'}</p>
          <label className="flex cursor-pointer items-center gap-3 text-small text-ink select-none">
            <input
              type="checkbox"
              checked={incrementalLoad}
              onChange={(e) => setIncrementalLoad(e.target.checked)}
              className="h-4 w-4 rounded border-hairline accent-accent"
            />
            <div>
              <p className="font-medium">{isTh ? 'Incremental Load' : 'Incremental Load'}</p>
              <p className="text-xs text-ink-muted">
                {isTh
                  ? 'เพิ่มเฉพาะแถวใหม่ ไม่อัปเดตรายการเดิม'
                  : 'Insert new rows only — do not update existing records'}
              </p>
            </div>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-small text-ink select-none">
            <input
              type="checkbox"
              checked={useLocaleFormat}
              onChange={(e) => setUseLocaleFormat(e.target.checked)}
              className="h-4 w-4 rounded border-hairline accent-accent"
            />
            <div>
              <p className="font-medium">{isTh ? 'Use Locale Format' : 'Use Locale Format'}</p>
              <p className="text-xs text-ink-muted">
                {isTh
                  ? 'แปลงรูปแบบวันที่และตัวเลขตาม locale ไทย (DD/MM/YYYY, ตัวคั่นพัน)'
                  : 'Parse dates and numbers using Thai locale (DD/MM/YYYY, thousands separator)'}
              </p>
            </div>
          </label>
        </div>

        {validError > 0 && (
          <div className="rounded-[var(--radius-md)] border border-error/30 bg-error-soft p-3 text-small text-error-ink">
            <p className="font-semibold">{isTh ? 'ไม่สามารถดำเนินการต่อได้' : 'Cannot proceed'}</p>
            <p className="text-xs">{isTh ? 'กรุณาแก้ไขข้อผิดพลาดก่อนดำเนินการต่อ' : 'Please fix all errors before continuing'}</p>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(2)}>{isTh ? '← ย้อนกลับ' : '← Back'}</Button>
          <Button onClick={() => setStep(4)} disabled={validError > 0}>{isTh ? 'ถัดไป: รันงาน →' : 'Next: Run →'}</Button>
        </div>
      </div>
    );
  };

  // ── Step 4: Confirm/Run ──────────────────────────────────────────────────────
  const renderStep4 = () => (
    <div className="space-y-5">
      {/* Summary */}
      <div className="rounded-[var(--radius-md)] border border-hairline bg-canvas-soft p-4 space-y-2">
        <p className="text-small font-semibold text-ink">{isTh ? 'สรุปการนำเข้า' : 'Import summary'}</p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-small">
          <dt className="text-ink-muted">{isTh ? 'ประเภทข้อมูล' : 'Type'}</dt>
          <dd className="font-medium text-ink">
            {csvType === 'enrolment'
              ? isTh ? 'ลงทะเบียนสวัสดิการ' : 'Benefit Enrolment'
              : isTh ? 'เคลมสวัสดิการ' : 'Employee Claim'}
          </dd>
          <dt className="text-ink-muted">{isTh ? 'ไฟล์' : 'File'}</dt>
          <dd className="font-medium text-ink truncate">{selectedFile?.name}</dd>
          <dt className="text-ink-muted">{isTh ? 'วันที่มีผล' : 'Effective date'}</dt>
          <dd className="font-medium text-ink">{asOfDate}</dd>
          <dt className="text-ink-muted">{isTh ? 'แถวทั้งหมด' : 'Total rows'}</dt>
          <dd className="font-medium text-ink">10</dd>
          <dt className="text-ink-muted">{isTh ? 'Incremental Load' : 'Incremental Load'}</dt>
          <dd className="font-medium text-ink">{incrementalLoad ? (isTh ? 'เปิด' : 'On') : (isTh ? 'ปิด' : 'Off')}</dd>
          <dt className="text-ink-muted">{isTh ? 'Use Locale Format' : 'Use Locale Format'}</dt>
          <dd className="font-medium text-ink">{useLocaleFormat ? (isTh ? 'เปิด' : 'On') : (isTh ? 'ปิด' : 'Off')}</dd>
        </dl>
      </div>

      {/* Progress bar */}
      {(isRunning || runDone) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-small">
            <span className="font-medium text-ink">
              {runDone
                ? (isTh ? 'นำเข้าข้อมูลเสร็จสิ้น' : 'Import complete')
                : RUN_STEPS[runStep - 1] ?? (isTh ? 'กำลังเริ่มต้น…' : 'Starting…')}
            </span>
            <span className="text-ink-muted">{runStep}/8</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-canvas-soft border border-hairline">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${(runStep / 8) * 100}%` }}
            />
          </div>
          {isRunning && (
            <div className="flex items-center gap-2 text-small text-ink-muted">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
              {RUN_STEPS[runStep - 1] ?? (isTh ? 'กำลังเริ่มต้น…' : 'Starting…')}
            </div>
          )}
        </div>
      )}

      {/* Completion summary */}
      {runDone && (
        <div className="flex items-center gap-3 rounded-[var(--radius-md)] bg-success-soft p-4 text-ink">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden />
          <div>
            <p className="font-semibold">{isTh ? 'นำเข้าข้อมูลเรียบร้อยแล้ว' : 'Import successful'}</p>
            <p className="text-small text-ink-muted">
              {isTh
                ? `บันทึก ${validOk} รายการ · ${validWarning} รายการมีคำเตือน · ข้ามไป ${validError} รายการ`
                : `${validOk} records saved · ${validWarning} with warnings · ${validError} skipped`}
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => setStep(3)} disabled={isRunning || runDone}>
          {isTh ? '← ย้อนกลับ' : '← Back'}
        </Button>
        {!runDone ? (
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            {isRunning ? (
              <><Loader2 className="h-4 w-4 animate-spin" />{isTh ? 'กำลังประมวลผล…' : 'Processing…'}</>
            ) : (
              <><Play className="h-4 w-4" />{isTh ? 'เริ่มนำเข้าข้อมูล' : 'Run Import'}</>
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => {
              setStep(1);
              setSelectedFile(null);
              setRunStep(0);
              setRunDone(false);
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
          >
            {isTh ? 'นำเข้าไฟล์ใหม่' : 'Import another file'}
          </Button>
        )}
      </div>
    </div>
  );

  // ── Monitor Job columns ──────────────────────────────────────────────────────
  const jobCols: DataTableColumn<ImportJob>[] = [
    { id: 'id', header: isTh ? 'Job ID' : 'Job ID', cell: (r) => <span className="font-mono text-small text-ink">{r.id}</span> },
    { id: 'filename', header: isTh ? 'ไฟล์' : 'Filename', cell: (r) => <span className="text-small text-ink truncate max-w-[140px] block">{r.filename}</span> },
    {
      id: 'type',
      header: isTh ? 'ประเภท' : 'Type',
      cell: (r) => (
        <span className="text-small text-ink-muted">
          {r.type === 'enrolment'
            ? isTh ? 'ลงทะเบียน' : 'Enrolment'
            : isTh ? 'เคลม' : 'Claim'}
        </span>
      ),
    },
    { id: 'status', header: isTh ? 'สถานะ' : 'Status', cell: (r) => <StatusChip status={r.status} isTh={isTh} /> },
    { id: 'started', header: isTh ? 'เวลาเริ่ม' : 'Started', cell: (r) => <span className="text-small text-ink-muted">{r.started.replace('T', ' ')}</span> },
    {
      id: 'records',
      header: isTh ? 'แถว' : 'Records',
      align: 'right',
      cell: (r) => (
        <span className="text-small text-ink">
          {r.records === null ? '—' : `${r.processed ?? 0}/${r.records}`}
        </span>
      ),
    },
    {
      id: 'action',
      header: '',
      cell: (r) => (
        <Button variant="ghost" size="sm" onClick={() => setLogModalJob(r)}>
          {isTh ? 'ดู log' : 'View log'}
        </Button>
      ),
    },
  ];

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <CardEyebrow>
          {isTh ? 'สวัสดิการ · นำเข้าข้อมูล' : 'Benefits admin · Bulk Import'}
        </CardEyebrow>
        <h1 className="font-display text-3xl font-semibold text-ink">
          {isTh ? 'นำเข้าข้อมูลแบบกลุ่ม' : 'Bulk Import'}
        </h1>
        <p className="mt-2 text-small text-ink-muted">
          {isTh
            ? 'อัปโหลด CSV เพื่อบันทึกการลงทะเบียนหรือเคลมเป็นกลุ่ม'
            : 'Upload CSV to bulk-create enrollments or claims'}
        </p>
      </header>

      {/* Wizard */}
      <Card variant="raised" size="lg">
        <div className="flex gap-8">
          {/* Stepper rail */}
          <div className="w-48 shrink-0">
            <Stepper
              steps={WIZARD_STEPS}
              currentStep={step}
              maxUnlockedStep={step}
              onStepClick={(s) => { if (s < step) setStep(s); }}
              stepperLabel={isTh ? 'ขั้นตอนการนำเข้า' : 'Import wizard steps'}
            />
          </div>

          {/* Step content */}
          <div className="flex-1 min-w-0">
            <CardTitle className="mb-4">
              {step === 1 && (isTh ? 'อัปโหลดไฟล์' : 'Upload File')}
              {step === 2 && (isTh ? 'ตรวจสอบข้อมูล' : 'Preview Data')}
              {step === 3 && (isTh ? 'ยืนยันความถูกต้อง' : 'Validate')}
              {step === 4 && (isTh ? 'รันงานนำเข้า' : 'Confirm & Run')}
            </CardTitle>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>
        </div>
      </Card>

      {/* Monitor Job panel */}
      <Card variant="raised" size="lg">
        <div className="mb-4 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-ink-muted" aria-hidden />
          <CardTitle>{isTh ? 'ประวัติงานนำเข้า' : 'Import Job Monitor'}</CardTitle>
        </div>
        <p className="mb-4 text-small text-ink-muted">
          {isTh
            ? 'ติดตามสถานะงานนำเข้าข้อมูลที่ผ่านมาและปัจจุบัน'
            : 'Track past and current import job status'}
        </p>
        <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-hairline">
          <DataTable
            caption={isTh ? 'รายการงานนำเข้า' : 'Import jobs'}
            captionVisuallyHidden
            columns={jobCols}
            rows={jobs}
            rowKey={(r) => r.id}
            dense
            emptyState={
              <p className="py-6 text-center text-small text-ink-muted">
                {isTh ? 'ไม่มีประวัติงาน' : 'No import jobs yet'}
              </p>
            }
          />
        </div>
      </Card>

      {/* Log modal */}
      {logModalJob && (
        <Modal
          open={!!logModalJob}
          onClose={() => setLogModalJob(null)}
          title={isTh ? `Log งาน ${logModalJob.id}` : `Job log: ${logModalJob.id}`}
        >
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <StatusChip status={logModalJob.status} isTh={isTh} />
              <span className="text-small text-ink-muted">{logModalJob.filename}</span>
            </div>
            <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-canvas-soft border border-hairline p-4 text-xs leading-relaxed text-ink font-mono whitespace-pre-wrap">
              {logModalJob.logLines.join('\n')}
            </pre>
            {logModalJob.errors > 0 && (
              <div className="rounded-[var(--radius-md)] border border-error/30 bg-error-soft p-3 text-small text-error-ink">
                {isTh ? `พบ ${logModalJob.errors} ข้อผิดพลาด` : `${logModalJob.errors} error(s) found`}
              </div>
            )}
            <div className="flex justify-end">
              <Button variant="ghost" onClick={() => setLogModalJob(null)}>{isTh ? 'ปิด' : 'Close'}</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
