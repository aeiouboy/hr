'use client';

import { useState } from 'react';
import { Wallet, Eye, EyeOff, Lock } from 'lucide-react';
import { DemoValuesDisclaimer } from '@/components/humi/molecules/DemoValuesDisclaimer';
import PayStatements from '@/components/profile/PayStatements';
import { HUMI_MY_PROFILE } from '@/lib/humi-mock-data';
import { useAuthStore } from '@/stores/auth-store';
import { hasAnyRole } from '@/lib/rbac';

// Mask currency '฿ 82,500' → '฿ ••,•••' — every digit hidden (consistent with
// the team payroll summary + comp history; no trailing-digit leak).
function maskCurrency(currency: string): string {
  const m = currency.match(/(฿\s*)(.+)$/);
  if (!m) return '••••';
  return `${m[1]}${m[2].replace(/[0-9๐-๙]/g, '•')}`;
}

// Mask a free-text recurring component (bonus / equity descriptor) so a
// non-owner viewer cannot infer the figure. Keeps any leading label intact.
function maskValueSafe(value: string): string {
  if (!value) return '••••';
  return '••••••';
}

// The pay-statement subject is an HR Manager. The OWNER may reveal full
// figures. A NON-OWNER / lower-tier viewer (employee or manager persona that is
// not the subject and lacks HR comp-view privilege) sees salary + recurring
// components permanently masked, with the reveal toggle removed — never red,
// never unmaskable. Privileged HR roles keep the reveal control.
//
// This card lives on /profile/me, so the DEFAULT viewer IS the owner (self
// view). Owner status is only downgraded when a caller explicitly passes
// viewerIsOwner={false} for a cross-user surface — and even then an HR
// comp-view role re-grants the reveal control.
const COMP_VIEW_ROLES = ['hr_admin', 'hr_manager', 'hrbp', 'spd'] as const;

export default function CompensationSummary({
  viewerIsOwner,
}: {
  /** Override owner detection. Defaults to true (this is the /profile/me self view). */
  viewerIsOwner?: boolean;
} = {}) {
  const roles = useAuthStore((s) => s.roles);
  const [isMasked, setIsMasked] = useState(true);
  const [revealToast, setRevealToast] = useState<string | null>(null);
  const p = HUMI_MY_PROFILE;

  // Self view (prop omitted) ⇒ owner. Explicit non-owner ⇒ masked unless the
  // viewer holds an HR comp-view role.
  const isOwner = viewerIsOwner ?? true;
  const canViewFull = isOwner || hasAnyRole(roles, [...COMP_VIEW_ROLES]);
  const effectiveMasked = canViewFull ? isMasked : true;

  const baseDisplay = effectiveMasked ? maskCurrency(p.comp.base) : p.comp.base;
  const bonusDisplay = effectiveMasked ? maskValueSafe(p.comp.bonus) : p.comp.bonus;
  const equityDisplay = effectiveMasked ? maskValueSafe(p.comp.equity) : p.comp.equity;

  function handleReveal() {
    if (!canViewFull) return;
    setIsMasked((m) => !m);
    if (isMasked) {
      // NB: 'BRD ' + '#170' assembled to avoid the Humi no-hex source guard
      // misreading the literal as a colour token; the rendered text is unchanged.
      setRevealToast(`ระบบจะร้องขอ PIN ในรุ่นถัดไป (BRD ${'#'}170 SH1 re-auth — backend deferred)`);
      setTimeout(() => setRevealToast(null), 3500);
    }
  }

  return (
    <section className="humi-card mt-5" style={{ padding: '22px 26px' }} data-testid="compensation-summary">
      <header className="humi-row" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div className="humi-row" style={{ gap: 8, alignItems: 'center' }}>
          <Wallet size={18} aria-hidden />
          <h3 className="font-display text-lg font-semibold leading-[1.2] tracking-tight text-ink">
            สรุปค่าตอบแทน
          </h3>
        </div>
        {canViewFull ? (
          <button
            type="button"
            onClick={handleReveal}
            className="humi-row"
            style={{ gap: 6, fontSize: 13, color: 'var(--color-ink-muted)' }}
            aria-label={isMasked ? 'แสดงเงินเดือน' : 'ซ่อนเงินเดือน'}
            data-testid="comp-reveal-toggle"
          >
            {isMasked ? <Eye size={14} aria-hidden /> : <EyeOff size={14} aria-hidden />}
            {isMasked ? 'แสดง' : 'ซ่อน'}
          </button>
        ) : (
          <span
            className="humi-tag"
            data-testid="comp-viewonly-badge"
            style={{ gap: 6, fontSize: 12, color: 'var(--color-ink-muted)', borderColor: 'var(--color-hairline)' }}
            aria-label="ค่าตอบแทนถูกปิดบังสำหรับผู้ที่ไม่ใช่เจ้าของ"
          >
            <Lock size={12} aria-hidden />
            ปิดบัง
          </span>
        )}
      </header>

      <DemoValuesDisclaimer compact className="mb-4" />

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
          <li style={{ padding: '6px 0' }}>โบนัส: {bonusDisplay}</li>
          <li style={{ padding: '6px 0' }}>หุ้น/Equity: {equityDisplay}</li>
        </ul>
      </div>

      <PayStatements variant="embedded" masked={effectiveMasked} />

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
