'use client';

// TodoBell — Topbar inbox popover. Mirrors NotificationBell's interaction
// model (button + danger count badge + click-outside scrim + popover dialog
// + footer link). Each row carries a checkbox to mark a task done; marking
// done decrements the badge (local state only — UI mockup phase, no backend).
// Req6: trigger + empty-state use the Mail (envelope) glyph so the topbar reads
// as inbox-then-bell, not two overlapping bells.

import { useState } from 'react';
import { Mail, CheckCheck, Check } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MOCK_TODOS, type TodoItem } from '@/data/todos/mock';

export function TodoBell() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const isTh = locale !== 'en';

  const [todos, setTodos] = useState<TodoItem[]>(MOCK_TODOS);
  const [open, setOpen] = useState(false);

  const pendingCount = todos.filter((t) => !t.done).length;

  function markAllDone() {
    setTodos((prev) => prev.map((t) => ({ ...t, done: true })));
  }

  function toggleDone(id: string) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function formatDue(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString(isTh ? 'th-TH' : 'en-GB', {
      day: 'numeric',
      month: 'short',
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        className="humi-icon-btn relative"
        aria-label={isTh ? 'กล่องข้อความเข้า' : 'Inbox'}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        <Mail size={18} aria-hidden />
        {pendingCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-xs font-bold leading-none text-white"
            aria-label={isTh ? `${pendingCount} งานที่ค้างอยู่` : `${pendingCount} pending tasks`}
          >
            {pendingCount > 9 ? '9+' : pendingCount}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Click-outside scrim */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-label={isTh ? 'งานที่ต้องทำ' : 'To-do'}
            className="humi-card"
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              width: 340,
              maxHeight: 480,
              display: 'flex',
              flexDirection: 'column',
              zIndex: 50,
              boxShadow: 'var(--shadow-[var(--shadow-md)])',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b border-hairline px-4 py-3"
              style={{ flexShrink: 0 }}
            >
              <span className="text-sm font-semibold text-ink">
                {isTh ? 'งานที่ต้องทำ' : 'To-do'}
                {pendingCount > 0 && (
                  <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                    {pendingCount}
                  </span>
                )}
              </span>
              {pendingCount > 0 && (
                <button
                  type="button"
                  onClick={markAllDone}
                  className="flex items-center gap-1 text-xs text-accent hover:underline focus-visible:outline-none"
                >
                  <CheckCheck size={12} aria-hidden />
                  {isTh ? 'ทำเครื่องหมายเสร็จทั้งหมด' : 'Mark all done'}
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {todos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-ink-muted">
                  <Mail size={28} strokeWidth={1.5} aria-hidden />
                  <p className="mt-2 text-sm">{isTh ? 'ไม่มีงานที่ต้องทำ' : 'No tasks'}</p>
                </div>
              ) : (
                <ul>
                  {todos.map((t) => (
                    <li
                      key={t.id}
                      className={cn(
                        'flex gap-3 px-4 py-3 transition-colors hover:bg-canvas-soft',
                        !t.done && 'bg-accent-soft/20',
                      )}
                    >
                      {/* Done toggle */}
                      <button
                        type="button"
                        onClick={() => toggleDone(t.id)}
                        aria-pressed={t.done}
                        aria-label={
                          t.done
                            ? isTh
                              ? 'ทำเครื่องหมายว่ายังไม่เสร็จ'
                              : 'Mark as not done'
                            : isTh
                              ? 'ทำเครื่องหมายว่าเสร็จแล้ว'
                              : 'Mark as done'
                        }
                        className={cn(
                          'mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                          t.done
                            ? 'border-accent bg-accent text-white'
                            : 'border-hairline bg-surface text-transparent hover:border-accent',
                        )}
                      >
                        <Check size={11} strokeWidth={3} aria-hidden />
                      </button>
                      <Link
                        href={`/${locale}${t.href}`}
                        onClick={() => setOpen(false)}
                        className="flex-1 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                      >
                        <p
                          className={cn(
                            'text-sm text-ink',
                            t.done ? 'line-through text-ink-muted' : 'font-medium',
                          )}
                        >
                          {isTh ? t.titleTh : t.titleEn}
                        </p>
                        {t.dueAt && (
                          <p className="mt-0.5 text-xs text-ink-faint">
                            {isTh ? 'กำหนด: ' : 'Due: '}
                            {formatDue(t.dueAt)}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div
              className="border-t border-hairline px-4 py-2.5"
              style={{ flexShrink: 0 }}
            >
              <Link
                href={`/${locale}/ess/workflows`}
                onClick={() => setOpen(false)}
                className="block text-center text-xs font-medium text-accent hover:underline focus-visible:outline-none"
              >
                {isTh ? 'ดูงานทั้งหมด' : 'View all tasks'}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
