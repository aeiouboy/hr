'use client';

// admin/foundation/page.tsx — Foundation landing (Org setup for HRIS Admin)
// 3 tiles: Org Chart Tree, Positions, Divisions

import Link from 'next/link';
import { Network, Briefcase, Building2, ArrowRight } from 'lucide-react';
import { useFoundationSummary } from '@/hooks/use-foundation';

const TILES = [
  {
    href: '/th/admin/organization',
    icon: Network,
    eyebrow: 'Organization Structure',
    title: 'ผังองค์กร',
    desc: 'ดูและจัดการโครงสร้างแผนกแบบ tree — ขยาย/ยุบตามระดับ',
    statKey: 'orgUnitCount' as const,
    statLabel: 'หน่วยงาน',
  },
  {
    href: '/th/admin/positions',
    icon: Briefcase,
    eyebrow: 'Position Master',
    title: 'ตำแหน่งงาน',
    desc: 'รายการตำแหน่งทั้งหมด • จำนวนพนักงานตามแผน vs จริง • สถานะ',
    statKey: 'positionCount' as const,
    statLabel: 'ตำแหน่ง',
  },
  {
    href: '/th/admin/foundation/divisions',
    icon: Building2,
    eyebrow: 'Division Setup',
    title: 'หน่วยธุรกิจ',
    desc: 'กลุ่มบริษัทและหน่วยธุรกิจระดับสูงสุด • เพิ่ม / แก้ไข',
    statKey: 'divisionCount' as const,
    statLabel: 'หน่วยธุรกิจ',
  },
];

export default function FoundationLandingPage() {
  const summary = useFoundationSummary();

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="humi-card humi-grain" style={{ overflow: 'hidden', marginBottom: 20 }}>
        <div
          className="humi-blob humi-blob--teal hidden lg:block"
          style={{ width: 100, height: 130, right: -20, top: -20, opacity: 0.7 }}
          aria-hidden
        />
        <div className="humi-eyebrow" style={{ marginBottom: 8 }}>
          Admin · EC Foundation
        </div>
        <h1 className="humi-hero-title" style={{ maxWidth: 500 }}>
          โครงสร้างองค์กร
          <br />
          <span className="humi-hero-title-soft">
            จัดการแผนก ตำแหน่ง และหน่วยธุรกิจ
          </span>
        </h1>
        <div
          className="humi-row"
          style={{ marginTop: 16, gap: 24, flexWrap: 'wrap' }}
        >
          <div>
            <div className="humi-eyebrow" style={{ fontSize: 10 }}>หน่วยงานทั้งหมด</div>
            <div className="font-display text-[22px] font-semibold text-ink">
              {summary.orgUnitCount}
            </div>
          </div>
          <div>
            <div className="humi-eyebrow" style={{ fontSize: 10 }}>ตำแหน่ง</div>
            <div className="font-display text-[22px] font-semibold text-ink">
              {summary.positionCount}
            </div>
          </div>
          <div>
            <div className="humi-eyebrow" style={{ fontSize: 10 }}>พนักงานในระบบ</div>
            <div className="font-display text-[22px] font-semibold" style={{ color: 'var(--color-accent)' }}>
              {summary.totalHeadcount.toLocaleString('th-TH')}
            </div>
          </div>
        </div>
      </div>

      {/* 3-tile grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {TILES.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.href}
              href={tile.href}
              className="humi-card group relative transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2"
            >
              <div className="humi-row" style={{ alignItems: 'flex-start', gap: 12 }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon size={20} aria-hidden />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="humi-eyebrow">{tile.eyebrow}</div>
                  <h2 className="mt-1 font-display text-[16px] font-semibold text-ink group-hover:text-accent">
                    {tile.title}
                  </h2>
                  <p className="mt-1 text-small text-ink-soft">{tile.desc}</p>
                  <div className="humi-row" style={{ marginTop: 10, gap: 8 }}>
                    <span className="humi-tag">
                      {summary[tile.statKey]} {tile.statLabel}
                    </span>
                    <span className="humi-spacer" />
                    <ArrowRight size={14} className="text-ink-muted group-hover:text-accent" aria-hidden />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
