'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Plus, Search, UsersRound } from 'lucide-react';
import {
  Button,
  CardEyebrow,
  DataTable,
  FormInput,
  type DataTableColumn,
} from '@/components/humi';
import { cn } from '@/lib/utils';
import {
  HUMI_EMPLOYEES,
  AVATAR_TONE_CLASS,
  STATUS_META,
  type HumiEmployee,
  type EmployeeStatus,
} from '@/lib/humi-mock-data';

// ════════════════════════════════════════════════════════════
// Humi /employees — Employee List
// Header + search + filter chips + DataTable primitive.
// Filter chips: ทั้งหมด / ทำงาน / ลา / พ้นสภาพ.
// Empty state: ?empty=1 query renders a zero-row placeholder.
// Row hover handled by DataTable primitive (accent-soft tint).
// ════════════════════════════════════════════════════════════

type FilterId = 'all' | EmployeeStatus;

const FILTERS: { id: FilterId; labelKey: string }[] = [
  { id: 'all', labelKey: 'filterAll' },
  { id: 'active', labelKey: 'filterActive' },
  { id: 'leave', labelKey: 'filterLeave' },
  { id: 'terminated', labelKey: 'filterTerminated' },
];

export default function HumiEmployeesPage() {
  const t = useTranslations('humiEmployees');
  const searchParams = useSearchParams();
  const forceEmpty = searchParams.get('empty') === '1';

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterId>('all');

  const rows = useMemo(() => {
    if (forceEmpty) return [] as HumiEmployee[];
    const q = query.trim().toLowerCase();
    return HUMI_EMPLOYEES.filter((emp) => {
      if (filter !== 'all' && emp.status !== filter) return false;
      if (!q) return true;
      const haystack = [
        emp.firstNameTh,
        emp.lastNameTh,
        emp.employeeCode,
        emp.department,
        emp.position,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, filter, forceEmpty]);

  const columns: DataTableColumn<HumiEmployee>[] = [
    {
      id: 'avatar',
      header: t('colAvatar'),
      headerVisuallyHidden: true,
      className: 'w-[56px]',
      cell: (row) => (
        <span
          aria-hidden
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full text-small font-medium',
            AVATAR_TONE_CLASS[row.avatarTone]
          )}
        >
          {row.initials}
        </span>
      ),
    },
    {
      id: 'name',
      header: t('colName'),
      sortAccessor: (row) => `${row.firstNameTh} ${row.lastNameTh}`,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-ink">
            {row.firstNameTh} {row.lastNameTh}
          </span>
          <span className="text-small text-ink-muted">{row.position}</span>
        </div>
      ),
    },
    {
      id: 'code',
      header: t('colCode'),
      sortAccessor: (row) => row.employeeCode,
      className: 'w-[120px]',
      cell: (row) => (
        <span className="font-mono text-small text-ink-soft tabular-nums">
          {row.employeeCode}
        </span>
      ),
    },
    {
      id: 'department',
      header: t('colDepartment'),
      sortAccessor: (row) => row.department,
      cell: (row) => <span className="text-ink-soft">{row.department}</span>,
    },
    {
      id: 'status',
      header: t('colStatus'),
      sortAccessor: (row) => row.status,
      className: 'w-[120px]',
      cell: (row) => {
        const meta = STATUS_META[row.status];
        return (
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2.5 py-1',
              'text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.14em]',
              meta.toneClass
            )}
          >
            {meta.label}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: t('colActions'),
      headerVisuallyHidden: true,
      align: 'right',
      className: 'w-[88px]',
      cell: (row) => (
        <Link
          href={`/employees/${row.id}`}
          aria-label={`${t('viewDetail')} — ${row.firstNameTh} ${row.lastNameTh}`}
          className={cn(
            'inline-flex h-8 items-center justify-center rounded-md px-3',
            'text-small font-medium text-accent',
            'transition-colors hover:bg-accent-soft',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1'
          )}
        >
          {t('view')}
        </Link>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-canvas">
      <main className="mx-auto w-full max-w-[var(--max-width-page)] px-6 pb-16 pt-10 sm:px-8">
        {/* ── Page header ───────────────────────────────────── */}
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardEyebrow>{t('eyebrow')}</CardEyebrow>
            <h1
              className={cn(
                'font-display font-semibold tracking-tight text-ink',
                'text-[length:var(--text-display-h1)] leading-[var(--text-display-h1--line-height)]'
              )}
            >
              {t('title')}
            </h1>
            <p className="mt-1 text-body text-ink-muted">
              {t('subtitle', { count: HUMI_EMPLOYEES.length })}
            </p>
          </div>
          <Button variant="secondary" leadingIcon={<Plus size={16} />}>
            {t('addEmployee')}
          </Button>
        </header>

        {/* ── Search + filter chips ─────────────────────────── */}
        <section
          aria-label={t('toolbarLabel')}
          className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div className="relative w-full md:max-w-md">
            <Search
              size={16}
              aria-hidden
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <FormInput
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchPlaceholder')}
              className="pl-9"
            />
          </div>

          <div
            role="radiogroup"
            aria-label={t('filterLabel')}
            className="flex flex-wrap gap-1.5"
          >
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'inline-flex h-8 items-center rounded-full px-3',
                    'text-small font-medium',
                    'transition-colors duration-[var(--dur-fast)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1',
                    active
                      ? 'bg-ink text-canvas'
                      : 'bg-surface text-ink-soft border border-hairline hover:border-accent hover:text-ink'
                  )}
                >
                  {t(f.labelKey)}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Table / empty state ───────────────────────────── */}
        <DataTable<HumiEmployee>
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          caption={t('tableCaption')}
          emptyState={
            <div className="flex flex-col items-center gap-3 text-center">
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent"
              >
                <UsersRound size={22} />
              </span>
              <p className="text-body font-medium text-ink">
                {t('emptyTitle')}
              </p>
              <p className="text-small text-ink-muted">{t('emptyBody')}</p>
            </div>
          }
        />
      </main>
    </div>
  );
}
