import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ClusterReview from '../ClusterReview'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

const reviewMessages: Record<string, string> = {
  enNameSectionEyebrow: 'ยืนยันชื่อภาษาอังกฤษ',
  enNameSectionTitle: 'ชื่อ-นามสกุลภาษาอังกฤษ',
  enNameSectionSub: 'คัดลอกจากขั้นตอนระบุตัวตน — แก้ไขได้ที่ขั้นตอนที่ 1',
  hrbpSectionEyebrow: 'การมอบหมาย',
  hrbpSectionTitle: 'ผู้ดูแล HRBP',
  hrbpSectionSub: 'เลือก HRBP ที่จะรับเรื่องและแจ้งเตือนเมื่อส่งข้อมูล',
  summarySectionEyebrow: 'สรุป',
  summarySectionTitle: 'สรุปข้อมูลก่อนส่ง',
  summarySectionSub: 'ตรวจสอบก่อนบันทึก — คลิกขั้นตอนด้านซ้ายเพื่อย้อนกลับแก้ไข',
  salutationEn: 'คำนำหน้า (EN)',
  firstNameEn: 'ชื่อ (EN)',
  middleNameEn: 'ชื่อกลาง (EN)',
  lastNameEn: 'นามสกุล (EN)',
  hrbpAssignee: 'HRBP ที่มอบหมาย',
  selectHrbp: '— เลือก HRBP —',
  hrbpRequiredError: 'กรุณาเลือก HRBP ก่อนบันทึก (BRD #109)',
  notifyHrbpLabel: 'แจ้ง HRBP ทางอีเมลเมื่อส่งข้อมูล',
  notifyHrbpHelp: 'SH4 trigger + template ตาม BRD #109 — Sprint 2 จะ wire backend',
  salarySuffix: 'บาท/เดือน',
  summaryHireDate: 'วันที่เริ่มงาน',
  summaryCompany: 'บริษัท',
  summaryEventReason: 'สาเหตุการจ้าง',
  summarySalutationEn: 'คำนำหน้า (EN)',
  summaryNameEn: 'ชื่อ-นามสกุล (EN)',
  summaryDateOfBirth: 'วันเกิด',
  summaryEmployeeId: 'รหัสพนักงาน (ระบบสร้าง)',
  summaryIdCardType: 'ประเภทบัตร',
  summaryIdNumber: 'เลขบัตร',
  summaryCountry: 'ประเทศ',
  summaryIsPrimary: 'บัตรหลัก',
  summarySalutationLocal: 'คำนำหน้า (Local)',
  summaryNameLocal: 'ชื่อ-นามสกุล (Local)',
  summaryNickname: 'ชื่อเล่น',
  summaryGender: 'เพศ',
  summaryNationality: 'สัญชาติ',
  summaryBloodType: 'กรุ๊ปเลือด',
  summaryMaritalStatus: 'สถานภาพสมรส',
  summaryEmployeeClass: 'ประเภทพนักงาน',
  summaryPosition: 'ตำแหน่ง',
  summaryCompensation: 'ค่าตอบแทน',
  summaryHrbp: 'HRBP ที่มอบหมาย',
  summaryNotSelected: '— ยังไม่เลือก —',
}

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => reviewMessages[key] ?? key,
}))

beforeEach(() => {
  localStorage.clear()
  act(() => {
    useHireWizard.getState().reset()
  })
})

describe('ClusterReview checkpoint headings', () => {
  it('uses one checkpoint-heading style and does not render duplicate eyebrow headings', () => {
    render(<ClusterReview />)

    expect(screen.getByRole('heading', { name: 'ชื่อ-นามสกุลภาษาอังกฤษ' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ผู้ดูแล HRBP' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'สรุปข้อมูลก่อนส่ง' })).toBeInTheDocument()

    expect(screen.queryByText('ยืนยันชื่อภาษาอังกฤษ')).not.toBeInTheDocument()
    expect(screen.queryByText('การมอบหมาย')).not.toBeInTheDocument()
    expect(screen.queryByText('สรุป')).not.toBeInTheDocument()
  })
})
