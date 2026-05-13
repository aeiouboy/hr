import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ClusterReview from '../ClusterReview'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

const reviewMessages: Record<string, string> = {
  enNameSectionEyebrow: 'ยืนยันชื่อภาษาอังกฤษ',
  enNameSectionTitle: 'ชื่อ-นามสกุลภาษาอังกฤษ',
  enNameSectionSub: 'คัดลอกจากขั้นตอนระบุตัวตน — แก้ไขได้ที่ขั้นตอนที่ 1',
  hrbpSectionEyebrow: 'การมอบหมาย',
  hrbpSectionTitle: 'อนุมัติโดย Direct Manager + HRBP',
  hrbpSectionSub: 'Direct Manager ต้องอนุมัติการจ้าง และแจ้งเตือนทั้ง Direct Manager กับ HRBP เมื่อส่งข้อมูล',
  directManagerApprover: 'Direct Manager ผู้อนุมัติ',
  directManagerHelp: 'ดึงอัตโนมัติจาก Supervisor ID ของ Position FO ที่เลือก',
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
  notifyHrbpLabel: 'แจ้งทั้ง Direct Manager และ HRBP ทางอีเมลเมื่อส่งข้อมูล',
  notifyHrbpHelp: 'ต้องผ่านการอนุมัติจาก Direct Manager และ HRBP จะได้รับ notification ของเคสจ้างนี้',
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
  summaryEmployeeClass: 'กลุ่มพนักงาน / กลุ่มย่อย',
  summaryPosition: 'ตำแหน่ง',
  summaryCompensation: 'ค่าตอบแทน',
  summaryDirectManager: 'Direct Manager ผู้อนุมัติ',
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
    expect(screen.getByRole('heading', { name: 'อนุมัติโดย Direct Manager + HRBP' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'สรุปข้อมูลก่อนส่ง' })).toBeInTheDocument()

    expect(screen.queryByText('ยืนยันชื่อภาษาอังกฤษ')).not.toBeInTheDocument()
    expect(screen.queryByText('การมอบหมาย')).not.toBeInTheDocument()
    expect(screen.queryByText('สรุป')).not.toBeInTheDocument()
  })
})
