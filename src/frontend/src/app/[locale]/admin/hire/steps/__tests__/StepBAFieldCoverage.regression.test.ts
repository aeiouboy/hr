import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const BA_CSV_PATH =
  '/Users/tachongrak/stark/projects/hr-platform-replacement/ba-source/EC-list-of-fields-2026-05-10.employee-file.csv'

const HIRE_SOURCE_ROOTS = [
  resolve(process.cwd(), 'src/app/[locale]/admin/hire'),
  resolve(process.cwd(), 'src/lib/admin/store/useHireWizard.ts'),
  resolve(process.cwd(), 'src/lib/admin/validation/hireSchema.ts'),
  resolve(process.cwd(), 'src/lib/admin/hire'),
]

const EXPECTED_BA_FIELD_ROWS = 205

const CURRENTLY_UNCOVERED_BA_ROWS = new Map<number, string>([
  [74, 'Social Accounts Information is not represented in the current hire UI/source slices.'],
  [75, 'Social Accounts Information is not represented in the current hire UI/source slices.'],
  [80, 'Address room number has no matching hire source token yet.'],
  [82, 'Address house number has no matching hire source token yet.'],
  [84, 'Address street has no matching hire source token yet.'],
  [95, 'Payroll-derived address system field is not surfaced in hire source.'],
  [96, 'Payroll-derived address system field is not surfaced in hire source.'],
  [97, 'Payroll-derived address system field is not surfaced in hire source.'],
  [98, 'Payroll-derived address system field is not surfaced in hire source.'],
  [104, 'Emergency-contact copy-address control is not represented in hire source.'],
  [124, 'Dependent copy-address control is not represented in hire source.'],
  [126, 'Dependent house number has no matching hire source token yet.'],
  [127, 'Dependent house number has no matching hire source token yet.'],
  [131, 'Dependent lane/soi has no matching hire source token yet.'],
  [132, 'Dependent lane/soi has no matching hire source token yet.'],
  [133, 'Dependent street has no matching hire source token yet.'],
  [149, 'Termination-only field appears in the hiring worksheet but is not part of hire source.'],
  [150, 'Termination-only field appears in the hiring worksheet but is not part of hire source.'],
  [156, 'Point of Sales has no matching hire source token yet.'],
  [157, 'Point of Sales has no matching hire source token yet.'],
  [166, 'Job Role has no matching hire source token yet.'],
  [167, 'Job Role has no matching hire source token yet.'],
  [170, 'Store Brand/Format has no matching hire source token yet.'],
  [171, 'Store Brand/Format has no matching hire source token yet.'],
  [209, 'DVT project fields are not represented in current hire source.'],
  [210, 'DVT project fields are not represented in current hire source.'],
  [211, 'DVT project fields are not represented in current hire source.'],
  [212, 'DVT project fields are not represented in current hire source.'],
  [213, 'DVT project fields are not represented in current hire source.'],
  [214, 'DVT project fields are not represented in current hire source.'],
  [215, 'DVT project fields are not represented in current hire source.'],
  [216, 'DVT project fields are not represented in current hire source.'],
  [217, 'DVT project fields are not represented in current hire source.'],
  [218, 'Scholarship has no matching hire source token yet.'],
  [229, 'Probationary Period End Date has no matching hire source token yet.'],
  [230, 'Probationary Period End Date has no matching hire source token yet.'],
  [231, 'Extended Retirement Date has no matching hire source token yet.'],
  [232, 'Extended Probation Date has no matching hire source token yet.'],
  [234, 'Band Matching has no matching hire source token yet.'],
  [235, 'Band Matching has no matching hire source token yet.'],
  [236, 'Transfer-out field appears in the hiring worksheet but is not part of hire source.'],
  [237, 'Band has no matching hire source token yet.'],
  [238, 'Special Benefit Group has no matching hire source token yet.'],
  [257, 'PF service end date has no matching hire source token yet.'],
  [258, 'Employee age Y/M/D display has no matching hire source token yet.'],
  [259, 'Employee age Y/M/D display has no matching hire source token yet.'],
  [298, 'Job country/region compensation row has no matching hire source token yet.'],
  [297, 'Job country/region compensation row has no matching hire source token yet.'],
])

type BaFieldRow = {
  rowNumber: number
  process: string
  section: string
  subsection: string
  field: string
  dbField: string
}

function parseCsv(content: string): string[][] {
  const rows: string[][] = []
  let cells: string[] = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < content.length; i += 1) {
    const char = content[i]
    const next = content[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      cell += '"'
      i += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      cells.push(cell)
      cell = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1
      cells.push(cell)
      rows.push(cells)
      cells = []
      cell = ''
      continue
    }

    cell += char
  }

  cells.push(cell)
  rows.push(cells)
  return rows
}

function parseBaCsv(content: string): BaFieldRow[] {
  const [headers = [], ...rows] = parseCsv(content)
  const indexOf = (name: string) => headers.indexOf(name)
  const sourceRowIndex = indexOf('source_row')
  const processIndex = indexOf('process')
  const sectionIndex = indexOf('section')
  const subsectionIndex = indexOf('sub_section')
  const fieldIndex = indexOf('ui_field')
  const dbFieldIndex = indexOf('db_field')

  return rows
    .map((cells, index) => ({
      rowNumber: Number(cells[sourceRowIndex]) || index + 2,
      process: cells[processIndex]?.trim() ?? '',
      section: cells[sectionIndex]?.trim() ?? '',
      subsection: cells[subsectionIndex]?.trim() ?? '',
      field: cells[fieldIndex]?.trim().replace(/\u00ad/g, '') ?? '',
      dbField: cells[dbFieldIndex]?.trim().replace(/\u00ad/g, '') ?? '',
    }))
    .filter((row) => row.process === 'Hiring' && row.field.length > 0)
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\u00ad/g, '').replace(/[^a-z0-9]+/g, '')
}

function readSourceFiles(path: string): string[] {
  if (statSync(path).isFile()) {
    return path.endsWith('.ts') || path.endsWith('.tsx') ? [readFileSync(path, 'utf8')] : []
  }

  return readdirSync(path)
    .flatMap((entry) => {
      if (entry === '__tests__') return []
      return readSourceFiles(join(path, entry))
    })
}

function sourceHasField(row: BaFieldRow, normalizedSource: string): boolean {
  const candidates = [row.field, row.dbField].map(normalize).filter(Boolean)
  return candidates.some((candidate) => normalizedSource.includes(candidate))
}

describe('hire wizard BA field source coverage', () => {
  it('accounts for every Employee-file Hiring UI field from the BA CSV', () => {
    expect(existsSync(BA_CSV_PATH), `Missing BA CSV fixture at ${BA_CSV_PATH}`).toBe(true)

    const rows = parseBaCsv(readFileSync(BA_CSV_PATH, 'utf8'))
    const normalizedSource = normalize(HIRE_SOURCE_ROOTS.flatMap(readSourceFiles).join('\n'))

    const sourceCovered = rows.filter((row) => sourceHasField(row, normalizedSource))
    const uncovered = rows.filter((row) => !sourceHasField(row, normalizedSource))
    const unclassified = uncovered.filter((row) => !CURRENTLY_UNCOVERED_BA_ROWS.has(row.rowNumber))

    expect(rows).toHaveLength(EXPECTED_BA_FIELD_ROWS)
    expect(sourceCovered.length).toBeGreaterThan(0)
    expect(
      unclassified.map((row) => `${row.rowNumber}: ${row.section} / ${row.subsection} / ${row.field}`),
    ).toEqual([])
  })
})
