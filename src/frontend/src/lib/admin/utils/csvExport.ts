// csvExport.ts — utility สำหรับ export ข้อมูลเป็น CSV
// รองรับ UTF-8 BOM, Thai headers, quoted fields
// ใช้ได้กับ Audit Report (BRD #189) และ module อื่นที่ต้องการ export

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

export interface CsvColumn<T> {
  /** key ของ field ใน object หรือ function ที่ return ค่า */
  accessor: keyof T | ((row: T) => string | number | boolean | null | undefined)
  /** header ภาษาไทยที่ใช้แสดงใน CSV */
  header: string
}

// -----------------------------------------------------------------------
// Internal helpers
// -----------------------------------------------------------------------

/** escape ค่าสำหรับ CSV: ถ้ามี comma, newline, หรือ quote → ครอบด้วย double quotes */
function escapeField(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  // ถ้ามี double quote ให้ escape เป็น "" ก่อน
  const escaped = str.replace(/"/g, '""')
  // ถ้ามี comma, newline, หรือ double quote → ครอบด้วย quotes
  if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')) {
    return `"${escaped}"`
  }
  return escaped
}

/** สร้าง CSV string จาก rows + columns */
function buildCsvString<T>(rows: T[], columns: CsvColumn<T>[]): string {
  // header row
  const headerRow = columns.map((col) => escapeField(col.header)).join(',')

  // data rows
  const dataRows = rows.map((row) => {
    return columns
      .map((col) => {
        const value =
          typeof col.accessor === 'function'
            ? col.accessor(row)
            : (row[col.accessor] as string | number | boolean | null | undefined)
        return escapeField(value)
      })
      .join(',')
  })

  return [headerRow, ...dataRows].join('\n')
}

// -----------------------------------------------------------------------
// Main export function
// -----------------------------------------------------------------------

/**
 * exportToCSV — สร้าง CSV Blob แล้ว trigger download ผ่าน browser
 *
 * @param rows    - array ของ data objects
 * @param columns - column definitions (header + accessor)
 * @param filename - ชื่อไฟล์ (ไม่ต้องใส่ .csv — ฟังก์ชันเติมให้)
 *
 * @returns Blob ของ CSV (ใช้ได้กับ test assertions ด้วย)
 */
export function exportToCSV<T>(
  rows: T[],
  columns: CsvColumn<T>[],
  filename: string
): Blob {
  const csvContent = buildCsvString(rows, columns)

  // UTF-8 BOM (﻿) — ทำให้ Excel เปิด Thai ได้ถูกต้อง
  const BOM = '﻿'
  const fullContent = BOM + csvContent

  const blob = new Blob([fullContent], { type: 'text/csv;charset=utf-8;' })

  // trigger browser download
  if (typeof document !== 'undefined') {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    // cleanup URL object หลัง download start
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return blob
}

/**
 * buildCsvBlob — สร้าง Blob โดยไม่ trigger download
 * ใช้สำหรับ unit tests หรือ upload scenarios
 */
export function buildCsvBlob<T>(rows: T[], columns: CsvColumn<T>[]): Blob {
  const csvContent = buildCsvString(rows, columns)
  const BOM = '﻿'
  return new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
}

/**
 * buildCsvText — return string ล้วน (BOM included)
 * ใช้สำหรับ assertions ใน tests ที่ต้องการ string comparison
 */
export function buildCsvText<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const csvContent = buildCsvString(rows, columns)
  const BOM = '﻿'
  return BOM + csvContent
}
