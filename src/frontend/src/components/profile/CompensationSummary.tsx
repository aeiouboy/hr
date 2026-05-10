'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Wallet, Eye, EyeOff, ExternalLink, FileText } from 'lucide-react';
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

const PAY_STATEMENTS = [
  { id: 'PS-2026-03', monthLabel: 'มีนาคม 2569', gross: '55,000 บาท', net: '48,200 บาท', status: 'พร้อมดาวน์โหลด' },
  { id: 'PS-2026-02', monthLabel: 'กุมภาพันธ์ 2569', gross: '55,000 บาท', net: '48,200 บาท', status: 'พร้อมดาวน์โหลด' },
  { id: 'PS-2026-01', monthLabel: 'มกราคม 2569', gross: '55,000 บาท', net: '47,800 บาท', status: 'พร้อมดาวน์โหลด' },
];

export default function CompensationSummary() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'th';
  const isTh = locale !== 'en';
  const statementArchiveRoute = `/${locale}/me/documents?type=payslip-archive`;
  const copy = {
    title: isTh ? 'สรุปค่าตอบแทน' : 'Compensation summary',
    showSalary: isTh ? 'แสดงเงินเดือน' : 'Show salary',
    hideSalary: isTh ? 'ซ่อนเงินเดือน' : 'Hide salary',
    revealToast: isTh
      ? 'ระบบจะร้องขอ PIN ในรุ่นถัดไป (BRD #170 SH1 re-auth — backend deferred)'
      : 'PIN confirmation will be requested in a later release (BRD #170 SH1 re-auth — backend deferred)',
    currentSalary: isTh ? 'เงินเดือนปัจจุบัน' : 'Current salary',
    recurring: isTh ? 'ส่วนประกอบเงินเดือนปกติ' : 'Recurring compensation',
    bonus: isTh ? 'โบนัส' : 'Bonus',
    equity: isTh ? 'หุ้น/Equity' : 'Equity',
    statementEyebrow: isTh ? 'statement เงินเดือน' : 'Salary statements',
    canonicalMark: isTh ? 'ช่องทางหลักในเอกสารส่วนบุคคล' : 'Primary channel in Documents',
    statementTitle: isTh ? 'ดู statement เงินเดือนและย้อนหลัง' : 'View salary statements and archive',
    archiveLink: isTh ? 'ดูย้อนหลัง' : 'View archive',
    netPrefix: isTh ? 'สุทธิ' : 'Net',
    statementAria: (monthLabel: string) =>
      isTh ? `statement เงินเดือน ${monthLabel}` : `salary statement ${monthLabel}`,
  };
  const [isMasked, setIsMasked] = useState(true);
  const [revealToast, setRevealToast] = useState<string | null>(null);
  const p = HUMI_MY_PROFILE;

  const baseDisplay = isMasked ? maskCurrency(p.comp.base) : p.comp.base;

  function handleReveal() {
    setIsMasked((m) => !m);
    if (isMasked) {
      setRevealToast(copy.revealToast);
      setTimeout(() => setRevealToast(null), 3500);
    }
  }

  return (
    <section className="humi-card mt-5" style={{ padding: '22px 26px' }} data-testid="compensation-summary">
      <header className="humi-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="humi-row" style={{ gap: 8, alignItems: 'center' }}>
          <Wallet size={18} aria-hidden />
          <h3 className="font-display text-[18px] font-semibold leading-[1.2] tracking-tight text-ink">
            {copy.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={handleReveal}
          className="humi-row"
          style={{ gap: 6, fontSize: 13, color: 'var(--color-ink-muted)' }}
          aria-label={isMasked ? copy.showSalary : copy.hideSalary}
        >
          {isMasked ? <Eye size={14} aria-hidden /> : <EyeOff size={14} aria-hidden />}
          {isMasked ? (isTh ? 'แสดง' : 'Show') : (isTh ? 'ซ่อน' : 'Hide')}
        </button>
      </header>

      <div style={{ marginBottom: 18 }} data-testid="comp-base">
        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginBottom: 4 }}>{copy.currentSalary}</div>
        <div className="font-mono tabular-nums" style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-ink)' }}>
          {baseDisplay}
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginTop: 4 }}>{p.comp.cadence}</div>
      </div>

      <div style={{ marginBottom: 18 }} data-testid="comp-recurring">
        <div style={{ fontSize: 12, color: 'var(--color-ink-muted)', marginBottom: 8 }}>{copy.recurring}</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: 'var(--color-ink)' }}>
          <li style={{ padding: '6px 0' }}>{copy.bonus}: {p.comp.bonus}</li>
          <li style={{ padding: '6px 0' }}>{copy.equity}: {p.comp.equity}</li>
        </ul>
      </div>

      <section id="pay-statements" data-testid="pay-statements" style={{ borderTop: '1px solid var(--color-hairline)', paddingTop: 16 }}>
        <div className="humi-row" style={{ justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div className="humi-row" style={{ gap: 8, alignItems: 'center', marginBottom: 4 }}>
              <div style={{ fontSize: 12, color: 'var(--color-ink-muted)' }}>{copy.statementEyebrow}</div>
              <span
                className="humi-tag"
                data-testid="pay-statements-canonical-mark"
                style={{
                  color: 'var(--color-accent)',
                  borderColor: 'var(--color-accent-soft)',
                  background: 'var(--color-accent-soft)',
                  fontSize: 11,
                }}
              >
                {copy.canonicalMark}
              </span>
            </div>
            <h4 className="font-display text-[16px] font-semibold leading-[1.2] tracking-tight text-ink">
              {copy.statementTitle}
            </h4>
          </div>
          <Link
            href={statementArchiveRoute}
            className="humi-row"
            style={{ gap: 6, fontSize: 14, color: 'var(--color-accent)', textDecoration: 'underline' }}
            data-testid="comp-payslip-link"
          >
            {copy.archiveLink}
            <ExternalLink size={14} aria-hidden />
          </Link>
        </div>

        <div className="humi-col" style={{ gap: 8 }}>
          {PAY_STATEMENTS.map((statement) => (
            <Link
              key={statement.id}
              href={`${statementArchiveRoute}&statement=${statement.id}`}
              aria-label={copy.statementAria(statement.monthLabel)}
              className="humi-row"
              style={{
                justifyContent: 'space-between',
                gap: 12,
                padding: '10px 0',
                borderTop: '1px solid var(--color-hairline-soft)',
                color: 'var(--color-ink)',
                textDecoration: 'none',
              }}
            >
              <span className="humi-row" style={{ gap: 8 }}>
                <FileText size={14} aria-hidden />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{statement.monthLabel}</span>
              </span>
              <span className="font-mono tabular-nums" style={{ fontSize: 13, color: 'var(--color-ink-muted)' }}>
                {copy.netPrefix} {statement.net}
              </span>
            </Link>
          ))}
        </div>
      </section>

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
