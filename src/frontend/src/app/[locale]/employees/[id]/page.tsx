'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, MessageSquare, UserSquare2, Pencil } from 'lucide-react';
import { Avatar, Button, Card, CardEyebrow, CardTitle } from '@/components/humi';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Employee Detail — /employees/[id]
// Header band (Avatar + name + role + status + actions) + 5 tabs.
// Only "ข้อมูลส่วนตัว" tab is implemented; others = placeholder.
// Mock data inline (T4 humi-mock-data.ts not shipped yet —
// will be replaced when available). Max 6 records, matches
// Org Chart persons on page 2.
// ════════════════════════════════════════════════════════════

type EmpStatus = 'active' | 'probation' | 'onLeave';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  status: EmpStatus;
  email: string;
  phone: string;
  manager: string;
  hiredOn: string;
  employment: string;
  empCode: string;
  address: string;
  tone: 'teal' | 'sage' | 'butter' | 'ink';
}

const EMPLOYEES: Record<string, Employee> = {
  'E-0101': {
    id: 'E-0101',
    firstName: 'ปิยะ',
    lastName: 'ชัยวัฒน์',
    position: 'ผู้อำนวยการฝ่ายบุคคล',
    department: 'สำนักงานใหญ่ · ฝ่ายบุคคล',
    status: 'active',
    email: 'piya.c@example.com',
    phone: '+66 2 555 0101',
    manager: '—',
    hiredOn: '14 มีนาคม 2563',
    employment: 'พนักงานประจำ · เงินเดือน',
    empCode: 'HMR-0101',
    address: '99/1 อาคารเซ็นทรัล ถ.สีลม กรุงเทพฯ 10500',
    tone: 'ink',
  },
  'E-0214': {
    id: 'E-0214',
    firstName: 'กุลธิดา',
    lastName: 'วงศ์สกุล',
    position: 'ผู้จัดการฝ่ายสรรหาบุคลากร',
    department: 'สำนักงานใหญ่ · ฝ่ายบุคคล',
    status: 'active',
    email: 'kulthida.w@example.com',
    phone: '+66 2 555 0214',
    manager: 'ปิยะ ชัยวัฒน์',
    hiredOn: '20 ตุลาคม 2564',
    employment: 'พนักงานประจำ · เงินเดือน',
    empCode: 'HMR-0214',
    address: '14 ถ.พหลโยธิน เขตจตุจักร กรุงเทพฯ 10900',
    tone: 'teal',
  },
  'E-0331': {
    id: 'E-0331',
    firstName: 'ณัฐพล',
    lastName: 'ศรีสุวรรณ',
    position: 'หัวหน้างานปฏิบัติการศูนย์การค้า',
    department: 'สาขาลาดพร้าว · ปฏิบัติการ',
    status: 'probation',
    email: 'natthapon.s@example.com',
    phone: '+66 2 555 0331',
    manager: 'กุลธิดา วงศ์สกุล',
    hiredOn: '1 กุมภาพันธ์ 2569',
    employment: 'พนักงานประจำ · ทดลองงาน 119 วัน',
    empCode: 'HMR-0331',
    address: '421 ถ.ลาดพร้าว เขตจตุจักร กรุงเทพฯ 10900',
    tone: 'sage',
  },
  'E-0412': {
    id: 'E-0412',
    firstName: 'อัจฉรา',
    lastName: 'ธนกิจ',
    position: 'นักวิเคราะห์การเงินอาวุโส',
    department: 'สำนักงานใหญ่ · การเงิน',
    status: 'active',
    email: 'adchara.t@example.com',
    phone: '+66 2 555 0412',
    manager: 'ปิยะ ชัยวัฒน์',
    hiredOn: '5 สิงหาคม 2565',
    employment: 'พนักงานประจำ · เงินเดือน',
    empCode: 'HMR-0412',
    address: '88 ถ.สาทร เขตสาทร กรุงเทพฯ 10120',
    tone: 'butter',
  },
  'E-0527': {
    id: 'E-0527',
    firstName: 'ธีรภัทร',
    lastName: 'จิรายุ',
    position: 'เจ้าหน้าที่คลังสินค้า',
    department: 'คลังสินค้าบางนา · ปฏิบัติการ',
    status: 'onLeave',
    email: 'teerapat.j@example.com',
    phone: '+66 2 555 0527',
    manager: 'ณัฐพล ศรีสุวรรณ',
    hiredOn: '11 มิถุนายน 2566',
    employment: 'พนักงานประจำ · รายเดือน',
    empCode: 'HMR-0527',
    address: '77 ถ.บางนา-ตราด เขตบางนา กรุงเทพฯ 10260',
    tone: 'teal',
  },
  'E-0643': {
    id: 'E-0643',
    firstName: 'พรทิพย์',
    lastName: 'เจริญสุข',
    position: 'ผู้จัดการเขตภาคเหนือ',
    department: 'เขตภาคเหนือ · ปฏิบัติการ',
    status: 'active',
    email: 'porntip.c@example.com',
    phone: '+66 2 555 0643',
    manager: 'กุลธิดา วงศ์สกุล',
    hiredOn: '2 มกราคม 2562',
    employment: 'พนักงานประจำ · เงินเดือน',
    empCode: 'HMR-0643',
    address: '200 ถ.นิมมานเหมินท์ อ.เมือง เชียงใหม่ 50200',
    tone: 'sage',
  },
};

type TabKey = 'personal' | 'employment' | 'timeoff' | 'payroll' | 'documents';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'personal', label: 'ข้อมูลส่วนตัว' },
  { key: 'employment', label: 'ประวัติการทำงาน' },
  { key: 'timeoff', label: 'การลา' },
  { key: 'payroll', label: 'เงินเดือน' },
  { key: 'documents', label: 'เอกสาร' },
];

const STATUS_LABEL: Record<EmpStatus, string> = {
  active: 'ปกติ',
  probation: 'ทดลองงาน',
  onLeave: 'ลางาน',
};

const STATUS_TONE: Record<EmpStatus, string> = {
  active:
    'bg-[color:var(--color-success-soft)] text-[color:var(--color-success)]',
  probation:
    'bg-[color:var(--color-warning-soft)] text-[color:var(--color-warning)]',
  onLeave:
    'bg-[color:var(--color-info-soft)] text-[color:var(--color-info)]',
};

export default function EmployeeDetailPage() {
  const params = useParams<{ locale: string; id: string }>();
  const id = params?.id ?? 'E-0214';
  const locale = params?.locale ?? 'th';

  const employee = useMemo<Employee>(
    () => EMPLOYEES[id] ?? EMPLOYEES['E-0214'],
    [id]
  );

  const [activeTab, setActiveTab] = useState<TabKey>('personal');

  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <div className="min-h-screen bg-canvas">
      <main className="mx-auto w-full max-w-[var(--max-width-page)] px-6 py-8">
        {/* Back link */}
        <Link
          href={`/${locale}/employees`}
          className={cn(
            'mb-6 inline-flex items-center gap-1.5 text-small font-medium text-ink-muted',
            'transition-colors hover:text-accent',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
            'rounded-sm'
          )}
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          พนักงาน
        </Link>

        {/* Header band */}
        <Card size="lg" className="mb-6">
          <div className="flex flex-wrap items-start gap-5">
            <Avatar
              name={fullName}
              size="lg"
              tone={employee.tone}
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <h1 className="font-display text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)] font-semibold tracking-tight text-ink whitespace-nowrap">
                  {fullName}
                </h1>
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-3 py-1 text-[length:var(--text-small)] font-medium',
                    STATUS_TONE[employee.status]
                  )}
                >
                  {STATUS_LABEL[employee.status]}
                </span>
              </div>
              <p className="mt-1.5 text-body text-ink-soft">
                {employee.position}
              </p>
              <p className="mt-1 text-small text-ink-muted">
                {employee.department} · รหัสพนักงาน {employee.empCode}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                leadingIcon={<MessageSquare className="h-4 w-4" />}
              >
                ส่งข้อความ
              </Button>
              <Button
                variant="secondary"
                size="sm"
                leadingIcon={<UserSquare2 className="h-4 w-4" />}
              >
                ดูโปรไฟล์ละเอียด
              </Button>
              <Button
                variant="primary"
                size="sm"
                leadingIcon={<Pencil className="h-4 w-4" />}
              >
                แก้ไข
              </Button>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="ข้อมูลพนักงาน"
          className="mb-6 flex flex-wrap gap-2 border-b border-hairline"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                id={`emp-tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls={`emp-panel-${tab.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'relative -mb-px px-4 py-3 text-body font-medium transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                  'rounded-t-md',
                  isActive
                    ? 'text-accent'
                    : 'text-ink-muted hover:text-ink-soft'
                )}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-accent"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <section
          role="tabpanel"
          id={`emp-panel-${activeTab}`}
          aria-labelledby={`emp-tab-${activeTab}`}
        >
          {activeTab === 'personal' && (
            <Card size="lg">
              <CardEyebrow>ข้อมูลพื้นฐาน</CardEyebrow>
              <CardTitle className="mt-2 mb-5">รายละเอียดติดต่อและการจ้างงาน</CardTitle>
              <dl className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
                <Field label="ชื่อ-สกุล" value={fullName} />
                <Field label="อีเมล" value={employee.email} />
                <Field label="เบอร์โทร" value={employee.phone} />
                <Field
                  label="หัวหน้าสายบังคับบัญชา"
                  value={employee.manager}
                />
                <Field label="วันที่เริ่มงาน" value={employee.hiredOn} />
                <Field label="สถานะการจ้าง" value={employee.employment} />
                <Field label="รหัสพนักงาน" value={employee.empCode} />
                <Field label="ที่อยู่" value={employee.address} />
              </dl>
            </Card>
          )}

          {activeTab !== 'personal' && <Placeholder label={activeTab} />}
        </section>
      </main>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-hairline-soft pb-4 last:border-b-0">
      <dt className="text-small text-ink-muted">{label}</dt>
      <dd className="mt-1 text-body font-medium text-ink">{value}</dd>
    </div>
  );
}

function Placeholder({ label }: { label: TabKey }) {
  const tabLabel = TABS.find((t) => t.key === label)?.label ?? '';
  return (
    <Card size="lg" tone="canvas">
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <CardEyebrow>{tabLabel}</CardEyebrow>
        <p className="text-body text-ink-muted">กำลังพัฒนา — Sprint 2</p>
      </div>
    </Card>
  );
}
