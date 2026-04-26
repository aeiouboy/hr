// Humi-themed 404 page — replaces Next.js default black screen for missing
// routes. Most common hit today: /th/manager-dashboard (deleted in Path C-4
// per SF concept; users have stale bookmarks).
//
// Renders inside [locale] segment so AppShell + sidebar still surround the
// content — feels like a friendly fallback, not a hard reset.

import Link from 'next/link';
import { Compass, Home, User } from 'lucide-react';

export default function LocaleNotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: '40px 24px',
        textAlign: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 64,
          height: 64,
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-accent-soft)',
          color: 'var(--color-accent)',
        }}
      >
        <Compass size={28} aria-hidden />
      </div>

      <div className="humi-eyebrow">404 — ไม่พบหน้าที่ค้นหา</div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--color-ink)',
          lineHeight: 1.2,
        }}
      >
        หน้านี้ถูกย้ายหรือลบไปแล้ว
      </h1>

      <p
        style={{
          fontSize: 14,
          color: 'var(--color-ink-soft)',
          maxWidth: 520,
          lineHeight: 1.6,
        }}
      >
        บางฟีเจอร์ของ Humi ถูกจัดเรียงใหม่ตาม SuccessFactors design pattern —
        เมนูผู้จัดการรวมอยู่ใน &quot;เมนูลัดของผู้จัดการ&quot; บนหน้าแรก. ลองกลับไปยังหน้าหลัก
        หรือดูข้อมูลของคุณเอง:
      </p>

      <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/th/home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-accent)',
            color: 'var(--color-surface)',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
            transition: 'opacity var(--dur-base)',
          }}
        >
          <Home size={16} aria-hidden />
          กลับสู่หน้าหลัก
        </Link>
        <Link
          href="/th/profile/me"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-hairline)',
            background: 'var(--color-surface)',
            color: 'var(--color-ink)',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          <User size={16} aria-hidden />
          โปรไฟล์ของฉัน
        </Link>
      </div>
    </div>
  );
}
