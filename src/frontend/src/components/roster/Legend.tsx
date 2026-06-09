'use client';

// Legend — explains the shift-type tones (std/late/off/empty) and the coverage
// short signal. Bilingual. Tones mirror RosterCell / CoverageRow.

export interface LegendProps {
  isTh: boolean;
}

export function Legend({ isTh }: LegendProps) {
  const items: { swatch: string; label: string }[] = [
    {
      swatch: 'bg-accent-soft border border-transparent',
      label: isTh ? 'กะปกติ' : 'Standard shift',
    },
    {
      swatch: 'bg-info-soft border border-transparent',
      label: isTh ? 'กะสาย' : 'Late shift',
    },
    {
      swatch: 'bg-canvas-soft border border-dashed border-hairline',
      label: isTh ? 'วันหยุด (F)' : 'Day off (F)',
    },
    {
      swatch: 'bg-surface border border-hairline',
      label: isTh ? 'ยังไม่กำหนด' : 'Unassigned',
    },
    {
      swatch: 'bg-danger-soft border border-transparent',
      label: isTh ? 'คนเข้ากะไม่พอ' : 'Understaffed',
    },
  ];

  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-muted"
      data-testid="roster-legend"
    >
      {items.map((it) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          <span className={`inline-block h-3 w-4 rounded-[3px] ${it.swatch}`} aria-hidden />
          {it.label}
        </span>
      ))}
    </div>
  );
}
