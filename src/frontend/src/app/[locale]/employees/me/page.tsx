'use client'

// /employees/me — โปรไฟล์พนักงาน (ดูอย่างเดียว, tab layout)
// Reuses ProfileTabs (src/components/profile/profile-tabs.tsx) — the
// canonical 7-tab SF-parity pattern used across the profile surface.
// Content rendered inline so we can feed enriched MOCK_PROFILE without
// reshaping Employee-store types.

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Pencil } from 'lucide-react'
import mockEmployee from '@/data/admin/mockEmployee.json'
import { ProfileTabs, type ProfileTabId } from '@/components/profile/profile-tabs'
import { Button } from '@/components/humi'

// ── Enriched mock profile (SF parity) ──────────────────────────────────────

const MOCK_PROFILE = {
  ...mockEmployee,
  salutationTh: 'นาย',
  nicknameTh: 'ชง',
  gender: 'ชาย',
  nationality: 'ไทย',
  religion: 'พุทธ',
  maritalStatus: 'สมรส',
  maritalStatusSince: '2018-11-09',
  militaryStatus: 'ผ่านการเกณฑ์',
  bloodType: 'O',

  phone: '081-234-5678',
  phoneAlt: '02-123-4567 ต่อ 2155',
  email: 'somchai.testworker@central.co.th',
  emailPersonal: 'chongrak.t@gmail.com',
  address: '555/24 ซอยสุขุมวิท 23 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
  addressRegistered: '22/1 หมู่ 4 ตำบลหนองค้อ อำเภอศรีราชา ชลบุรี 20230',

  employeeId: 'EMP-0006',
  position: 'HR Business Partner',
  corporateTitle: 'Senior Specialist (IC3)',
  company: 'Central Group',
  companyCode: 'CEN',
  orgUnit: 'HR - Head Office',
  costCenter: 'CC-HRHQ-0142',
  employmentClass: 'Permanent',
  shift: 'Office (08:30–17:30)',
  hireDate: '2020-03-01',
  probationEndDate: '2020-09-01',
  directManager: 'ภัทร เลิศฤทธิ์ (HRBP Lead)',
  workLocation: 'Central Group Head Office — Silom',

  salaryGrade: 'B4-Specialist',
  payGroup: 'Monthly — HQ Staff',
  bankName: 'ธนาคารกสิกรไทย (KBANK)',
  bankAccountMasked: 'xxx-x-x4823-x',
  providentFund: '5% employee · 5% company',
  taxCondition: 'หักภาษี ณ ที่จ่าย (ภ.ง.ด.1)',

  spouseName: 'วรรณี ธนะ',
  spouseOccupation: 'ผู้จัดการฝ่ายการตลาด (บริษัทอื่น)',
  children: [
    { name: 'ด.ญ. กานต์ธิดา ธนะ', birthYear: 2021 },
    { name: 'ด.ช. พีรภัทร ธนะ', birthYear: 2023 },
  ],
  emergencyRelation: 'บิดา',

  education: [
    { level: 'ปริญญาโท', field: 'Human Resource Management', university: 'จุฬาลงกรณ์มหาวิทยาลัย', year: 2019 },
    { level: 'ปริญญาตรี', field: 'Business Administration', university: 'มหาวิทยาลัยเกษตรศาสตร์', year: 2012 },
  ],
  workHistory: [
    { role: 'HR Business Partner', from: '2023-01-01', to: null as string | null, note: 'ปัจจุบัน' },
    { role: 'HR Specialist', from: '2021-06-01', to: '2022-12-31', note: 'เลื่อนขึ้นจาก Officer' },
    { role: 'HR Officer', from: '2020-03-01', to: '2021-05-31', note: 'ตำแหน่งแรก' },
  ],
}

// ── helpers ────────────────────────────────────────────────────────────────

function formatDateTh(iso: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    console.warn('[employees/me] formatDateTh: invalid date', iso)
    return iso
  }
}

function tenureFull(hireDate: string): string {
  const hire = new Date(hireDate)
  const now = new Date()
  let years = now.getFullYear() - hire.getFullYear()
  let months = now.getMonth() - hire.getMonth()
  if (months < 0) { years -= 1; months += 12 }
  if (years === 0) return `${months} เดือน`
  if (months === 0) return `${years} ปี`
  return `${years} ปี ${months} เดือน`
}

function maskNationalId(id: string): string {
  return id.replace(/(\d)(\d{4})(\d{5})(\d{2})(\d)/, '$1-$2-$3-$4-$5')
}

// ── Field row ──────────────────────────────────────────────────────────────

function FieldRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        borderBottom: '1px solid var(--color-hairline-soft)',
        paddingBottom: 10,
        gap: 8,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', width: 180, flexShrink: 0 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-ink)',
          flex: 1,
          minWidth: 0,
          fontFamily: mono ? 'var(--font-mono)' : undefined,
        }}
      >
        {value || '—'}
      </div>
    </div>
  )
}

function GroupLabel({ text }: { text: string }) {
  return (
    <div className="humi-eyebrow" style={{ marginBottom: 4 }}>
      {text}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function EmployeeMePage() {
  const emp = MOCK_PROFILE
  const tenure = tenureFull(emp.hireDate)
  const params = useParams<{ locale: string }>()
  const locale = params?.locale ?? 'th'
  const [activeTab, setActiveTab] = useState<ProfileTabId>('ec-personal')

  return (
    <div className="pb-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Hero header */}
      <div className="humi-card humi-grain" style={{ padding: 20, overflow: 'hidden', position: 'relative' }}>
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 120, height: 140, right: -30, top: -30, opacity: 0.6 }}
          aria-hidden
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <div className="humi-eyebrow" style={{ marginBottom: 4 }}>{emp.employeeId}</div>
            <h1 className="font-display text-[24px] font-semibold text-ink">
              {emp.salutationTh} {emp.firstNameTh} {emp.lastNameTh}
              <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--color-ink-muted)', marginLeft: 8 }}>
                ({emp.firstNameEn} {emp.lastNameEn})
              </span>
            </h1>
            <div style={{ fontSize: 13, color: 'var(--color-ink-muted)', marginTop: 4 }}>
              {emp.position} · {emp.orgUnit}
            </div>
            <div className="humi-row" style={{ gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
              <span className="humi-tag humi-tag--accent">ทำงานอยู่</span>
              <span className="humi-tag humi-tag--sage">{emp.employmentClass}</span>
              <span className="humi-tag">อายุงาน {tenure}</span>
              <span className="humi-tag humi-tag--butter">{emp.corporateTitle}</span>
            </div>
          </div>
          {/* Edit data CTA — routes to canonical ESS edit flow (BRD #166) */}
          <Link href={`/${locale}/ess/profile/edit`} style={{ flexShrink: 0 }}>
            <Button variant="secondary" size="sm">
              <Pencil size={14} aria-hidden />
              แก้ไขข้อมูล
            </Button>
          </Link>
        </div>
      </div>

      {/* Canonical 7-tab ProfileTabs — underline pattern shared across profile surface */}
      <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab content */}
      <div className="humi-card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {activeTab === 'ec-personal' && (
          <>
            <GroupLabel text="ข้อมูลตัวบุคคล" />
            <FieldRow label="ชื่อ-นามสกุล (ไทย)" value={`${emp.salutationTh} ${emp.firstNameTh} ${emp.lastNameTh}`} />
            <FieldRow label="ชื่อ-นามสกุล (EN)" value={`${emp.firstNameEn} ${emp.lastNameEn}`} />
            <FieldRow label="ชื่อเล่น" value={emp.nicknameTh} />
            <FieldRow label="เลขบัตรประชาชน" value={maskNationalId(emp.nationalId)} mono />
            <FieldRow label="วันเกิด" value={formatDateTh(emp.dateOfBirth)} />
            <FieldRow label="เพศ" value={emp.gender} />
            <FieldRow label="สัญชาติ" value={emp.nationality} />
            <FieldRow label="ศาสนา" value={emp.religion} />
            <FieldRow label="กรุ๊ปเลือด" value={emp.bloodType} />
            <FieldRow label="สถานะทางทหาร" value={emp.militaryStatus} />
            <FieldRow label="สถานภาพสมรส" value={`${emp.maritalStatus} (ตั้งแต่ ${formatDateTh(emp.maritalStatusSince)})`} />
          </>
        )}

        {activeTab === 'personal' && (
          <>
            <GroupLabel text="ข้อมูลติดต่อ" />
            <FieldRow label="โทรศัพท์มือถือ" value={emp.phone} />
            <FieldRow label="เบอร์ที่ทำงาน" value={emp.phoneAlt} />
            <FieldRow label="อีเมลที่ทำงาน" value={emp.email} />
            <FieldRow label="อีเมลส่วนตัว" value={emp.emailPersonal} />
            <FieldRow label="ที่อยู่ปัจจุบัน" value={emp.address} />
            <FieldRow label="ที่อยู่ตามทะเบียนบ้าน" value={emp.addressRegistered} />
            <GroupLabel text="ผู้ติดต่อฉุกเฉิน" />
            <FieldRow label="ชื่อผู้ติดต่อ" value={emp.emergencyContact.name} />
            <FieldRow label="ความสัมพันธ์" value={emp.emergencyRelation} />
            <FieldRow label="เบอร์โทรศัพท์" value={emp.emergencyContact.phone} />
            <GroupLabel text="ครอบครัว" />
            <FieldRow label="คู่สมรส" value={emp.spouseName} />
            <FieldRow label="อาชีพคู่สมรส" value={emp.spouseOccupation} />
            {emp.children.map((c, i) => (
              <FieldRow
                key={i}
                label={`บุตร (${i + 1})`}
                value={`${c.name} · เกิดปี ${c.birthYear + 543}`}
              />
            ))}
          </>
        )}

        {activeTab === 'employment' && (
          <>
            <GroupLabel text="ข้อมูลการจ้างงาน" />
            <FieldRow label="รหัสพนักงาน" value={emp.employeeId} mono />
            <FieldRow label="ตำแหน่ง" value={emp.position} />
            <FieldRow label="ระดับ" value={emp.corporateTitle} />
            <FieldRow label="บริษัท" value={`${emp.company} (${emp.companyCode})`} />
            <FieldRow label="หน่วยงาน" value={emp.orgUnit} />
            <FieldRow label="สาขา/สถานที่ทำงาน" value={emp.workLocation} />
            <FieldRow label="Cost Center" value={emp.costCenter} mono />
            <FieldRow label="ประเภทการจ้าง" value={emp.employmentClass} />
            <FieldRow label="กะการทำงาน" value={emp.shift} />
            <FieldRow label="หัวหน้างาน" value={emp.directManager} />
            <FieldRow label="วันเริ่มงาน" value={formatDateTh(emp.hireDate)} />
            <FieldRow label="วันผ่านทดลองงาน" value={formatDateTh(emp.probationEndDate)} />
            <FieldRow label="อายุงานรวม" value={tenure} />
            <GroupLabel text="ประวัติการทำงานในบริษัท" />
            {emp.workHistory.map((w, i) => (
              <FieldRow
                key={i}
                label={`${formatDateTh(w.from)} — ${w.to ? formatDateTh(w.to) : 'ปัจจุบัน'}`}
                value={`${w.role}${w.note ? ` · ${w.note}` : ''}`}
              />
            ))}
          </>
        )}

        {activeTab === 'compensation' && (
          <>
            <GroupLabel text="ค่าตอบแทน" />
            <FieldRow label="Pay Grade" value={emp.salaryGrade} />
            <FieldRow label="รอบจ่าย" value={emp.payGroup} />
            <FieldRow label="ธนาคาร" value={emp.bankName} />
            <FieldRow label="เลขบัญชี" value={emp.bankAccountMasked} mono />
            <FieldRow label="กองทุนสำรองเลี้ยงชีพ" value={emp.providentFund} />
            <FieldRow label="การหักภาษี" value={emp.taxCondition} />
          </>
        )}

        {activeTab === 'benefits' && (
          <>
            <GroupLabel text="สวัสดิการที่ใช้อยู่" />
            <FieldRow label="ประกันสุขภาพ" value="AIA Group Health · Tier B" />
            <FieldRow label="ประกันชีวิต" value="ทุนคุ้มครอง 24 เท่าของเงินเดือน" />
            <FieldRow label="ตรวจสุขภาพประจำปี" value="ครั้งสุดท้าย 5 ก.พ. 2568" />
            <FieldRow label="Flexible Benefit" value="ใช้ไปแล้ว 8,200 / 20,000 บาท/ปี" />
          </>
        )}

        {activeTab === 'profile-details' && (
          <>
            <GroupLabel text="ประวัติการศึกษา" />
            {emp.education.map((e, i) => (
              <FieldRow
                key={i}
                label={e.level}
                value={`${e.field} · ${e.university} (${e.year + 543})`}
              />
            ))}
          </>
        )}

        {activeTab === 'scorecard' && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <p style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>
              ข้อมูลประเมินผลงานและ Scorecard จะแสดงที่นี่ (อยู่ใน Phase 2)
            </p>
          </div>
        )}
      </div>

      <div style={{ fontSize: 11, color: 'var(--color-ink-muted)', textAlign: 'right' }}>
        ข้อมูลจากฐานข้อมูลจำลอง — Phase 1 preview
      </div>
    </div>
  )
}
