import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import ECFieldCataloguePage from '@/app/[locale]/admin/ec-field-catalogue/page'
import { EC_FIELD_CATALOGUE, EC_FIELD_CATALOGUE_SUMMARY } from '@/data/ec-field-catalogue'

describe('EC Field Catalogue HR validation prototype', () => {
  it('renders the generated 593-row static catalogue summary and source-backed fields', () => {
    expect(EC_FIELD_CATALOGUE).toHaveLength(593)
    expect(EC_FIELD_CATALOGUE_SUMMARY.totalFields).toBe(593)
    expect(EC_FIELD_CATALOGUE_SUMMARY.sourceEncoding).toBe('CP1252')

    render(<ECFieldCataloguePage />)

    expect(screen.getByText('แคตตาล็อกฟิลด์ Employee Central สำหรับ HR validation')).toBeInTheDocument()
    expect(screen.getByTestId('ec-total-fields')).toHaveTextContent('593')
    expect(screen.getByText('Hire Date')).toBeInTheDocument()
    expect(screen.queryByText(/TBC|P'tik|P’tik|พี่ติ๊ก/i)).not.toBeInTheDocument()
  })

  it('filters by process and updates local HR review status/comment', async () => {
    const user = userEvent.setup()
    render(<ECFieldCataloguePage />)

    await user.selectOptions(screen.getByLabelText('Process'), 'Maintain')
    expect(screen.getByTestId('ec-filtered-count')).toHaveTextContent('388')

    const firstCard = screen.getAllByTestId('ec-field-card')[0]
    await user.click(within(firstCard).getByRole('button', { name: 'ยืนยันแล้ว' }))
    expect(within(firstCard).getAllByText('ยืนยันแล้ว').length).toBeGreaterThan(0)

    await user.type(within(firstCard).getByLabelText('Reviewer comment'), 'ผ่านสำหรับ walkthrough')
    expect(within(firstCard).getByText(/Last updated:/)).toBeInTheDocument()
  })

  it('provides profile-tab prototype forms with required-field validation examples', async () => {
    const user = userEvent.setup()
    render(<ECFieldCataloguePage />)

    await user.click(screen.getByRole('tab', { name: 'การจ้างงาน' }))
    expect(screen.getByText('ฟอร์มตัวอย่างตาม profile tabs เดิม')).toBeInTheDocument()
    expect(screen.getAllByText('ต้องกรอกตัวอย่างสำหรับฟิลด์ Required').length).toBeGreaterThan(0)
  })
})
