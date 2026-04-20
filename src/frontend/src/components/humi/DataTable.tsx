'use client';

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ════════════════════════════════════════════════════════════
// Humi DataTable — generic typed table.
// - Sticky header, hover row highlight (no zebra)
// - 48px row height, condensed padding option
// - Optional client-side sort on marked columns
// - Empty state slot + responsive horizontal scroll on sm screens
// Tokens only. Real <table>/<thead>/<tbody> for a11y.
// ════════════════════════════════════════════════════════════

export type SortDirection = 'asc' | 'desc';

export interface DataTableColumn<Row> {
  /** Stable id used for sort state + React keys. */
  id: string;
  /** Column header label (Thai recommended). */
  header: React.ReactNode;
  /** Render cell content from the row. */
  cell: (row: Row, index: number) => React.ReactNode;
  /** Enable client-side sort. Returns comparable value. */
  sortAccessor?: (row: Row) => string | number | Date | null | undefined;
  /** Tailwind classes applied to <th> and <td> for width/align. */
  className?: string;
  /** Text alignment shortcut. */
  align?: 'left' | 'right' | 'center';
  /** Visually hide the header text (still in DOM for screen readers). */
  headerVisuallyHidden?: boolean;
}

export interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  /** Stable row key. Falls back to index. */
  rowKey?: (row: Row, index: number) => string;
  /** Compact row height (36px instead of 48px). */
  dense?: boolean;
  /** Caption for the table (required for a11y — visually hidden OK). */
  caption: string;
  /** Hide caption visually but keep for screen readers. */
  captionVisuallyHidden?: boolean;
  /** Rendered when `rows.length === 0`. */
  emptyState?: React.ReactNode;
  /** Fire when a row is clicked. Renders row as interactive (keyboard + cursor). */
  onRowClick?: (row: Row, index: number) => void;
}

const alignClass: Record<NonNullable<DataTableColumn<unknown>['align']>, string> = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
};

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  dense = false,
  caption,
  captionVisuallyHidden = true,
  emptyState,
  onRowClick,
}: DataTableProps<Row>) {
  const [sortState, setSortState] = useState<
    { columnId: string; direction: SortDirection } | null
  >(null);

  const sortedRows = useMemo(() => {
    if (!sortState) return rows;
    const col = columns.find((c) => c.id === sortState.columnId);
    if (!col?.sortAccessor) return rows;
    const dir = sortState.direction === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = col.sortAccessor!(a);
      const bv = col.sortAccessor!(b);
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }, [rows, sortState, columns]);

  const toggleSort = (columnId: string) => {
    setSortState((prev) => {
      if (!prev || prev.columnId !== columnId) {
        return { columnId, direction: 'asc' };
      }
      if (prev.direction === 'asc') return { columnId, direction: 'desc' };
      return null;
    });
  };

  const rowHeight = dense ? 'h-9' : 'h-12';
  const cellPad = dense ? 'px-3 py-1.5' : 'px-4 py-2';

  if (rows.length === 0 && emptyState) {
    return (
      <div className="rounded-[var(--radius-md)] bg-surface shadow-[var(--shadow-card)]">
        <div className="flex min-h-[200px] items-center justify-center p-8 text-ink-muted">
          {emptyState}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-md)] bg-surface shadow-[var(--shadow-card)]">
      <table className="w-full border-collapse text-left text-body">
        <caption className={cn('py-2 text-small text-ink-muted', captionVisuallyHidden && 'sr-only')}>
          {caption}
        </caption>
        <thead className="sticky top-0 z-10 bg-canvas-soft">
          <tr>
            {columns.map((col) => {
              const isSorted = sortState?.columnId === col.id;
              const sortable = Boolean(col.sortAccessor);
              const SortIcon = isSorted
                ? sortState.direction === 'asc'
                  ? ArrowUp
                  : ArrowDown
                : ArrowUpDown;
              return (
                <th
                  key={col.id}
                  scope="col"
                  aria-sort={
                    !sortable
                      ? undefined
                      : isSorted
                        ? sortState.direction === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                  }
                  className={cn(
                    cellPad,
                    'border-b border-hairline',
                    'text-[length:var(--text-eyebrow)] leading-[var(--text-eyebrow--line-height)]',
                    'font-semibold uppercase tracking-[0.14em] text-ink-muted',
                    alignClass[col.align ?? 'left'],
                    col.className
                  )}
                >
                  {sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.id)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-sm',
                        'transition-colors hover:text-ink',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
                      )}
                    >
                      <span className={cn(col.headerVisuallyHidden && 'sr-only')}>
                        {col.header}
                      </span>
                      <SortIcon size={12} aria-hidden className="shrink-0" />
                    </button>
                  ) : (
                    <span className={cn(col.headerVisuallyHidden && 'sr-only')}>
                      {col.header}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, idx) => {
            const key = rowKey ? rowKey(row, idx) : String(idx);
            const interactive = Boolean(onRowClick);
            return (
              <tr
                key={key}
                onClick={interactive ? () => onRowClick!(row, idx) : undefined}
                onKeyDown={
                  interactive
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onRowClick!(row, idx);
                        }
                      }
                    : undefined
                }
                tabIndex={interactive ? 0 : undefined}
                role={interactive ? 'button' : undefined}
                className={cn(
                  rowHeight,
                  'border-b border-hairline-soft last:border-b-0',
                  'transition-colors duration-[var(--dur-fast)]',
                  'hover:bg-accent-soft/40',
                  interactive && 'cursor-pointer focus-visible:outline-none focus-visible:bg-accent-soft/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent'
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.id}
                    className={cn(
                      cellPad,
                      'text-ink align-middle',
                      alignClass[col.align ?? 'left'],
                      col.className
                    )}
                  >
                    {col.cell(row, idx)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

DataTable.displayName = 'HumiDataTable';
