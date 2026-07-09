'use client';

import { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MOCK_IN_APP_NOTIFICATIONS, type InAppNotification } from '@/data/notifications/mock';

export function NotificationBell() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale ?? 'th';
  const isTh = locale !== 'en';

  const [notifications, setNotifications] = useState<InAppNotification[]>(MOCK_IN_APP_NOTIFICATIONS);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function formatTime(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffMs / 86400000);
    if (diffH < 1) return isTh ? 'เมื่อกี้' : 'Just now';
    if (diffH < 24) return isTh ? `${diffH} ชม. ที่แล้ว` : `${diffH}h ago`;
    return isTh ? `${diffD} ว. ที่แล้ว` : `${diffD}d ago`;
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        className="humi-icon-btn relative"
        aria-label={isTh ? 'การแจ้งเตือน' : 'Notifications'}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
      >
        <Bell size={18} aria-hidden />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-xs font-bold leading-none text-white"
            aria-label={isTh ? `${unreadCount} การแจ้งเตือนที่ยังไม่ได้อ่าน` : `${unreadCount} unread notifications`}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
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
            aria-label={isTh ? 'การแจ้งเตือน' : 'Notifications'}
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
                {isTh ? 'การแจ้งเตือน' : 'Notifications'}
                {unreadCount > 0 && (
                  <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                    {unreadCount}
                  </span>
                )}
              </span>
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-accent hover:underline focus-visible:outline-none"
                >
                  <CheckCheck size={12} aria-hidden />
                  {isTh ? 'อ่านทั้งหมด' : 'Mark all read'}
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-ink-muted">
                  <Bell size={28} strokeWidth={1.5} aria-hidden />
                  <p className="mt-2 text-sm">{isTh ? 'ไม่มีการแจ้งเตือน' : 'No notifications'}</p>
                </div>
              ) : (
                <ul>
                  {notifications.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={n.href}
                        onClick={() => { markRead(n.id); setOpen(false); }}
                        className={cn(
                          'flex gap-3 px-4 py-3 transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-accent',
                          !n.read && 'bg-accent-soft/20',
                        )}
                      >
                        {/* Unread dot */}
                        <span
                          className={cn(
                            'mt-1.5 h-2 w-2 flex-shrink-0 rounded-full',
                            n.read ? 'bg-transparent' : 'bg-accent',
                          )}
                          aria-hidden
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p className={cn('text-sm text-ink', !n.read && 'font-semibold')}>
                            {isTh ? n.titleTh : n.titleEn}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-ink-muted">
                            {isTh ? n.bodyTh : n.bodyEn}
                          </p>
                          <p className="mt-1 text-xs text-ink-faint">{formatTime(n.createdAt)}</p>
                        </div>
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
                href={`/${locale}/admin/system/notifications`}
                onClick={() => setOpen(false)}
                className="block text-center text-xs font-medium text-accent hover:underline focus-visible:outline-none"
              >
                {isTh ? 'ดูการแจ้งเตือนทั้งหมด' : 'View all notifications'}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
