/**
 * DataTable.test.tsx — Humi DataTable generic table primitive tests
 * AC-8: Component library — reusable, typed, sortable columns,
 *       empty state, generic Row typing
 * AC-7: A11y — real <table>/<thead>/<tbody>, aria-sort attribute
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable, type DataTableColumn } from '../DataTable';

// ────────────────────────────────────────────────────────────
// Test fixture types + data
// ────────────────────────────────────────────────────────────

interface SampleRow {
  id: string;
  name: string;
  department: string;
  salary: number;
}

const SAMPLE_ROWS: SampleRow[] = [
  { id: 'r1', name: 'วาสนา จิรวัฒน์', department: 'ทรัพยากรบุคคล', salary: 55000 },
  { id: 'r2', name: 'อรุณ พงษ์ศิริ', department: 'การเงิน', salary: 72000 },
  { id: 'r3', name: 'ธนกร เลิศวงศ์', department: 'เทคโนโลยีสารสนเทศ', salary: 88000 },
];

const SAMPLE_COLUMNS: DataTableColumn<SampleRow>[] = [
  {
    id: 'name',
    header: 'ชื่อ-นามสกุล',
    cell: (row) => row.name,
    sortAccessor: (row) => row.name,
  },
  {
    id: 'department',
    header: 'ฝ่าย/แผนก',
    cell: (row) => row.department,
    sortAccessor: (row) => row.department,
  },
  {
    id: 'salary',
    header: 'เงินเดือน',
    cell: (row) => `฿${row.salary.toLocaleString()}`,
    align: 'right',
    // ไม่มี sortAccessor — column นี้ไม่ sortable
  },
];

// ────────────────────────────────────────────────────────────
// AC-8: renders all columns from `columns` prop
// ────────────────────────────────────────────────────────────
describe('DataTable — columns render (AC-8)', () => {
  it('render column headers ครบทุกคอลัมน์', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตารางพนักงานทดสอบ"
      />
    );
    expect(screen.getByText('ชื่อ-นามสกุล')).toBeInTheDocument();
    expect(screen.getByText('ฝ่าย/แผนก')).toBeInTheDocument();
    expect(screen.getByText('เงินเดือน')).toBeInTheDocument();
  });

  it('ใช้ <table> element จริง (ไม่ใช่ div grid)', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    expect(document.querySelector('table')).toBeInTheDocument();
    expect(document.querySelector('thead')).toBeInTheDocument();
    expect(document.querySelector('tbody')).toBeInTheDocument();
  });

  it('column headers อยู่ใน <th scope="col">', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    const headers = document.querySelectorAll('th[scope="col"]');
    expect(headers).toHaveLength(SAMPLE_COLUMNS.length);
  });
});

// ────────────────────────────────────────────────────────────
// AC-8: renders all rows from `rows` prop
// ────────────────────────────────────────────────────────────
describe('DataTable — rows render (AC-8)', () => {
  it('render cell content ทุก row', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    expect(screen.getByText('วาสนา จิรวัฒน์')).toBeInTheDocument();
    expect(screen.getByText('อรุณ พงษ์ศิริ')).toBeInTheDocument();
    expect(screen.getByText('ธนกร เลิศวงศ์')).toBeInTheDocument();
  });

  it('จำนวน <tr> ใน tbody ตรงกับจำนวน rows', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        rowKey={(row) => row.id}
        caption="ตาราง"
      />
    );
    const tbody = document.querySelector('tbody')!;
    const rows = within(tbody).getAllByRole('row');
    expect(rows).toHaveLength(SAMPLE_ROWS.length);
  });

  it('render row ที่มีค่า 0 (edge case: ไม่ถือว่า falsy)', () => {
    const zeroRows: SampleRow[] = [
      { id: 'z1', name: 'ทดสอบ', department: 'ทีม A', salary: 0 },
    ];
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={zeroRows}
        caption="ตาราง"
      />
    );
    expect(screen.getByText('฿0')).toBeInTheDocument();
  });
});

// ────────────────────────────────────────────────────────────
// AC-8: empty state shows when rows empty
// ────────────────────────────────────────────────────────────
describe('DataTable — empty state (AC-8)', () => {
  it('แสดง emptyState เมื่อ rows=[] (ส่ง emptyState prop)', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={[]}
        caption="ตาราง"
        emptyState={<p>ไม่พบข้อมูลพนักงาน</p>}
      />
    );
    expect(screen.getByText('ไม่พบข้อมูลพนักงาน')).toBeInTheDocument();
  });

  it('ไม่แสดง <table> เมื่อ empty + emptyState ถูก render แทน', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={[]}
        caption="ตาราง"
        emptyState={<span>ว่างเปล่า</span>}
      />
    );
    // เมื่อ empty state ถูก render จะไม่มี table
    expect(document.querySelector('table')).not.toBeInTheDocument();
  });

  it('rows=[] โดยไม่ส่ง emptyState → render table ปกติ (ไม่ crash)', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={[]}
        caption="ตาราง"
      />
    );
    // ไม่มี emptyState → ยังแสดง table structure
    expect(document.querySelector('table')).toBeInTheDocument();
    const tbody = document.querySelector('tbody')!;
    expect(within(tbody).queryAllByRole('row')).toHaveLength(0);
  });
});

// ────────────────────────────────────────────────────────────
// AC-8: sortable column shows sort affordance (aria-sort)
// ────────────────────────────────────────────────────────────
describe('DataTable — sortable column (AC-8, AC-7)', () => {
  it('column ที่มี sortAccessor แสดง <button> ใน header', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    // "ชื่อ-นามสกุล" และ "ฝ่าย/แผนก" มี sortAccessor
    // header ควรมี <button> ให้คลิก sort
    const nameHeader = screen.getByText('ชื่อ-นามสกุล');
    expect(nameHeader.closest('button')).toBeInTheDocument();
  });

  it('column ที่ไม่มี sortAccessor ไม่แสดง sort button', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    // "เงินเดือน" ไม่มี sortAccessor
    const salaryHeader = screen.getByText('เงินเดือน');
    expect(salaryHeader.closest('button')).not.toBeInTheDocument();
  });

  it('th ที่ sortable มี aria-sort="none" ก่อนคลิก', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    const nameHeader = screen.getByText('ชื่อ-นามสกุล').closest('th')!;
    expect(nameHeader).toHaveAttribute('aria-sort', 'none');
  });

  it('คลิก sort column ครั้งแรก → aria-sort="ascending"', async () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    const sortBtn = screen.getByText('ชื่อ-นามสกุล').closest('button')!;
    await userEvent.click(sortBtn);
    const th = sortBtn.closest('th')!;
    expect(th).toHaveAttribute('aria-sort', 'ascending');
  });

  it('คลิก sort column ครั้งที่ 2 → aria-sort="descending"', async () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="ตาราง"
      />
    );
    const sortBtn = screen.getByText('ชื่อ-นามสกุล').closest('button')!;
    await userEvent.click(sortBtn); // asc
    await userEvent.click(sortBtn); // desc
    const th = sortBtn.closest('th')!;
    expect(th).toHaveAttribute('aria-sort', 'descending');
  });

  it('sort ascending เรียงข้อมูล A→Z (Thai Unicode order)', async () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        rowKey={(row) => row.id}
        caption="ตาราง"
      />
    );
    const sortBtn = screen.getByText('ชื่อ-นามสกุล').closest('button')!;
    await userEvent.click(sortBtn); // ascending
    const tbody = document.querySelector('tbody')!;
    const rows = within(tbody).getAllByRole('row');
    // หลัง sort asc: "ธนกร" < "วาสนา" < "อรุณ" (Unicode order)
    expect(rows[0]).toHaveTextContent('ธนกร เลิศวงศ์');
  });
});

// ────────────────────────────────────────────────────────────
// Generic typing: test with SampleRow interface (TypeScript compile check)
// ────────────────────────────────────────────────────────────
describe('DataTable — generic typing (AC-8)', () => {
  it('รับ generic Row interface ที่กำหนดเองได้ ไม่ต้อง cast เป็น any', () => {
    // ถ้า TypeScript compile ผ่าน = typing ถูกต้อง
    // Test นี้ verify ว่า runtime ทำงานปกติกับ typed data
    interface CustomRow {
      uid: number;
      thaiLabel: string;
    }
    const customCols: DataTableColumn<CustomRow>[] = [
      { id: 'uid', header: 'รหัส', cell: (row) => String(row.uid) },
      { id: 'label', header: 'ชื่อ', cell: (row) => row.thaiLabel },
    ];
    const customRows: CustomRow[] = [
      { uid: 1, thaiLabel: 'รายการแรก' },
      { uid: 2, thaiLabel: 'รายการสอง' },
    ];
    render(
      <DataTable<CustomRow>
        columns={customCols}
        rows={customRows}
        caption="ทดสอบ generic"
      />
    );
    expect(screen.getByText('รายการแรก')).toBeInTheDocument();
    expect(screen.getByText('รายการสอง')).toBeInTheDocument();
  });

  it('displayName = "HumiDataTable"', () => {
    expect(DataTable.displayName).toBe('HumiDataTable');
  });
});

// ────────────────────────────────────────────────────────────
// caption a11y
// ────────────────────────────────────────────────────────────
describe('DataTable — caption a11y (AC-7)', () => {
  it('render <caption> element ใน table (sr-only โดย default)', () => {
    render(
      <DataTable
        columns={SAMPLE_COLUMNS}
        rows={SAMPLE_ROWS}
        caption="รายชื่อพนักงาน"
      />
    );
    const caption = document.querySelector('caption')!;
    expect(caption).toBeInTheDocument();
    expect(caption).toHaveTextContent('รายชื่อพนักงาน');
  });
});
