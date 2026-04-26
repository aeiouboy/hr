'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Wallet, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { HUMI_MY_PROFILE } from '@/lib/humi-mock-data';

// Mask currency '฿ 82,500' → '฿ ••••2,500' (last 4 visible: '2,500')
function maskCurrency(currency: string): string {
  const m = currency.match(/(฿\s*)(.+)$/);
  if (!m) return '••••';
  const symbol = m[1];
  const num = m[2];
  if (num.length <= 4) return `${symbol}${num}`;
  return `${symbol}••••${num.slice(-4)}`;
}

export default function CompensationSummary() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const [isMasked, setIsMasked] = useState(true);
  const [revealToast, setRevealToast] = useState<string | null>(null);
  const p = HUMI_MY_PROFILE;

  const baseDisplay = isMasked ? maskCurrency(p.comp.base) : p.comp.base;

  function handleReveal() {
    setIsMasked((m) => !m);
    if (isMasked) {
      setRevealToast('ระบบจะร้องขอ PIN ในรุ่นถัดไป (BRD #170 SH1 re-auth — backend deferred)');
      setTimeout(() => setRevealToast(null), 3500);
    }
  }

  return (
    <section className="humi-card mt-5" style={{ padding: '22px 26px' }} data-testid="compensation-summary">
      <header className="humi-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="humi-row" style={{ gap: 8, alignItems: 'center' }}>
          <Wallet size={18} aria-hidden />
          <h3 className="font-display text-[18px] font-semibold leading-[1.2] tracking-tight text-ink">
            สรุปค่าตอบแทน
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReveal}
          className="humi-row"
          style={{ gap: 6, fontSize: 13, color: 'var(--color-ink-muted)' }}
          aria-label={isMasked ? 'แสดงเงินเดือน' : 'ซ่อนเงินเดือน'}
        >
          {isMasked ? <Eye size={14} aria-hidden /> : <EyeOff size={14} aria-hidden />}
          {isMasked ? 'แสดง' : 'ซ่อน'}
        </button>
      </header>

      <div style={{ marginBottom: 18 }} data-testid="comp-base">
        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginBottom: 4 }}>เงินเดือนปัจจุบัน</div>
        <div className="font-mono tabular-nums" style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-ink)' }}>
          {baseDisplay}
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>{p.comp.cadence}</div>
      </div>

      <div style={{ marginBottom: 18 }} data-testid="comp-recurring">
        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginBottom: 8 }}>ส่วนประกอบเงินเดือนปกติ</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-ink)' }}>
          <li style={{ padding: '6px 0' }}>โบนัส: {p.comp.bonus}</li>
          <li style={{ padding: '6px 0' }}>หุ้น/Equity: {p.comp.equity}</li>
        </ul>
      </div>

      <Link
        href={`/${locale}/employees/me/payslip`}
        className="humi-row"
        style={{ gap: 6, fontSize: 14, color: 'var(--color-accent)', textDecoration: 'underline' }}
        data-testid="comp-payslip-link"
      >
        ดูใบสลิปเต็ม
        <ExternalLink size={14} aria-hidden />
      </Link>

      {revealToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            padding: '10px 14px',
            borderRadius: 12,
            background: 'var(--color-ink)',
            color: 'var(--color-surface)',
            fontSize: 13,
            zIndex: 60,
          }}
          data-testid="comp-reveal-toast"
        >
          {revealToast}
        </div>
      )}
    </section>
  );
}
