// StepContact.address-autocomplete.test.tsx — hire address autocomplete/autofill

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import StepContact from '@/app/[locale]/admin/hire/steps/StepContact'
import { useHireWizard } from '@/lib/admin/store/useHireWizard'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const th: Record<string, string> = {
      phoneSection: 'เบอร์ติดต่อ',
      emailSection: 'อีเมล',
      addressSection: 'ที่อยู่ที่พักอาศัย',
      phoneType: 'ประเภทเบอร์โทร',
      countryCode: 'รหัสประเทศ',
      phoneNumber: 'เบอร์โทร',
      extension: 'ต่อ',
      isPrimary: 'หลัก',
      addPhone: '+ เพิ่มเบอร์โทร',
      emailType: 'ประเภทอีเมล',
      emailAddress: 'อีเมล',
      addEmail: '+ เพิ่มอีเมล',
      houseNo: 'บ้านเลขที่',
      village: 'หมู่บ้าน',
      moo: 'หมู่ที่',
      soi: 'ซอย',
      subdistrict: 'แขวง / ตำบล',
      district: 'เขต / อำเภอ',
      province: 'จังหวัด',
      zipCode: 'รหัสไปรษณีย์',
      country: 'ประเทศ',
      relationsSection: 'บุคคลที่เกี่ยวข้อง',
      addRelation: '+ เพิ่ม',
      remove: 'ลบ',
      relationshipType: 'ประเภทความสัมพันธ์',
      personName: 'ชื่อ',
      countryCodePlaceholder: '+66',
      phonePlaceholder: '0XX-XXX-XXXX',
      extensionPlaceholder: 'ต่อ',
      emailPlaceholder: 'example@email.com',
      houseNoPlaceholder: 'เช่น 155',
      villagePlaceholder: 'เช่น หมู่บ้านตะวันนา',
      mooPlaceholder: 'เช่น 5',
      soiPlaceholder: 'เช่น สนามบินน้ำ',
      subdistrictPlaceholder: 'เช่น บางกระสอ',
      districtPlaceholder: 'เช่น นนทบุรี',
      provincePlaceholder: 'เช่น 12 (นนทบุรี)',
      zipCodePlaceholder: 'เช่น 11000',
      countryPlaceholder: 'THA',
      relationshipTypePlaceholder: 'เช่น ผู้จัดการ / หัวหน้างาน',
      personNamePlaceholder: 'ชื่อ-นามสกุล',
    }
    return th[key] ?? key
  },
}))

beforeEach(() => {
  localStorage.clear()
  act(() => {
    useHireWizard.getState().reset()
  })
})

describe('StepContact address autocomplete', () => {
  it('fills district, province, zip code, and country from a known subdistrict', async () => {
    render(<StepContact />)

    const subdistrict = screen.getByLabelText(/แขวง \/ ตำบล/) as HTMLInputElement
    const district = screen.getByLabelText(/เขต \/ อำเภอ/) as HTMLInputElement
    const province = screen.getByLabelText(/จังหวัด/) as HTMLInputElement
    const zipCode = screen.getByLabelText(/รหัสไปรษณีย์/) as HTMLInputElement
    const country = screen.getByLabelText(/^ประเทศ$/) as HTMLInputElement

    expect(subdistrict).toHaveAttribute('list', 'hire-address-subdistricts')

    fireEvent.change(subdistrict, { target: { value: 'บางกระสอ' } })

    await waitFor(() => {
      expect(subdistrict.value).toBe('บางกระสอ')
      expect(district.value).toBe('เมืองนนทบุรี')
      expect(province.value).toBe('นนทบุรี')
      expect(zipCode.value).toBe('11000')
      expect(country.value).toBe('THA')
    })
  })

  it('keeps manually entered address text when no autocomplete record matches', async () => {
    render(<StepContact />)

    const subdistrict = screen.getByLabelText(/แขวง \/ ตำบล/) as HTMLInputElement
    const district = screen.getByLabelText(/เขต \/ อำเภอ/) as HTMLInputElement

    fireEvent.change(subdistrict, { target: { value: 'ตำบลทดสอบ' } })

    await waitFor(() => {
      expect(subdistrict.value).toBe('ตำบลทดสอบ')
      expect(district.value).toBe('')
    })
  })

  it('does not guess a subdistrict from an ambiguous district autocomplete value', async () => {
    render(<StepContact />)

    const subdistrict = screen.getByLabelText(/แขวง \/ ตำบล/) as HTMLInputElement
    const district = screen.getByLabelText(/เขต \/ อำเภอ/) as HTMLInputElement
    const province = screen.getByLabelText(/จังหวัด/) as HTMLInputElement
    const zipCode = screen.getByLabelText(/รหัสไปรษณีย์/) as HTMLInputElement

    fireEvent.change(district, { target: { value: 'เมืองนนทบุรี' } })

    await waitFor(() => {
      expect(district.value).toBe('เมืองนนทบุรี')
      expect(subdistrict.value).toBe('')
      expect(province.value).toBe('')
      expect(zipCode.value).toBe('')
    })
  })
})
