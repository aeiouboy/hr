'use client';

// ════════════════════════════════════════════════════════════
// Humi Topbar — ported 1:1 from
// docs/design-ref/shelfly-bundle/project/shell.jsx
// (<Topbar/> component).
//
// Changes vs reference:
// - <button> semantic on bell (was <button className="icon-btn">)
// - search pill wired to CommandPalette via onSearchClick prop (b5)
// - sun/moon theme toggle added beside bell (b2)
// - greeting eyebrow default preserved verbatim
//
// Responsive (issue #5):
// - hamburger Menu button (lg:hidden) leftmost — toggles mobile drawer
// - Eyebrow hidden on mobile (<sm)
// - h2 title: 18px mobile, 20px sm+, 24px lg+
// - Search pill: hidden on mobile (<sm), visible sm+ (sm:flex)
// - Search icon-only button: visible mobile only (sm:hidden)
// - ⌘K kbd: hidden below md
// ════════════════════════════════════════════════════════════

import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { getLocaleFromPath, swapLocale, type SupportedLocale } from '@/lib/humi-locale';
import { PersonaSwitcher } from '@/components/humi/shell/PersonaSwitcher';

export interface TopbarProps {
  /** h2 page title — typically derived from route */
  title: string;
  /** eyebrow above title — default: "สวัสดีตอนเช้าค่ะ คุณจงรักษ์" */
  subtitle?: string;
  /** optional extra action buttons rendered to the right of the bell */
  actions?: React.ReactNode;
  /** called when search pill/icon is clicked (wired to CommandPalette in b5) */
  onSearchClick?: () => void;
}

export function Topbar({
  title,
  subtitle = 'สวัสดีตอนเช้าค่ะ คุณจงรักษ์',
  actions,
  onSearchClick,
}: TopbarProps) {
  const { theme, setTheme, toggleMobileMenu, mobileMenuOpen } = useUIStore();
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);
  const topbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPath(pathname);
  const handleLocaleSwitch = (locale: SupportedLocale) => {
    if (locale === currentLocale) return;
    router.push(swapLocale(pathname, locale));
  };

  // Elevate topbar shadow once user scrolls past ~4px — adds depth
  // without the "floating disconnected bar" feel of always-on shadow.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleThemeToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div ref={topbarRef} className="humi-topbar" data-scrolled={scrolled}>
      {/* Menu button — mobile/tablet only (<lg). Labeled chip ([≡ เมนู]) instead
          of icon-only — Nielsen Norman 2014: hamburger discoverability hurts UX.
          Visible text label kills the "what does this do?" question. aria-expanded
          + aria-controls let screen readers announce the controlled drawer + its
          open state. Dynamic aria-label flips ปิดเมนู / เปิดเมนู for VoiceOver. */}
      <button
        type="button"
        className="humi-menu-btn lg:!hidden"
        aria-label={mobileMenuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
        aria-expanded={mobileMenuOpen}
        aria-controls="humi-mobile-drawer"
        onClick={toggleMobileMenu}
      >
        <Menu size={18} aria-hidden="true" />
        <span>เมนู</span>
      </button>

      {/* Title block — min-w-0 lets it shrink below content; whitespace-nowrap +
          truncate on eyebrow+h2 prevent Thai-character vertical wrap when topbar
          right-side gets crowded (e.g., 9-persona switcher with long label) */}
      <div className="min-w-0 flex-shrink overflow-hidden">
        <div
          className="humi-eyebrow hidden sm:block whitespace-nowrap overflow-hidden text-ellipsis"
          style={{ marginBottom: 4 }}
        >
          {subtitle}
        </div>
        <h2
          className="truncate whitespace-nowrap text-[18px] sm:text-[20px] lg:text-[24px]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}
        >
          {title}
        </h2>
      </div>

      <div className="humi-spacer" />

      {/* Search pill — hidden on mobile, visible sm+ */}
      <div
        className="humi-search !hidden sm:!flex"
        role="search"
        aria-label="ค้นหา"
        onClick={onSearchClick}
        style={{ cursor: onSearchClick ? 'pointer' : undefined }}
      >
        <Search size={16} aria-hidden="true" />
        <span className="humi-search-placeholder">
          ค้นหาพนักงาน เอกสาร…
        </span>
        <kbd className="hidden md:inline-flex">⌘K</kbd>
      </div>

      {/* Search icon-only — mobile only (<sm) */}
      <button
        type="button"
        className="humi-icon-btn sm:!hidden"
        aria-label="ค้นหา"
        onClick={onSearchClick}
      >
        <Search size={18} aria-hidden="true" />
      </button>

      {/* Locale switcher — ย้ายมาจาก Sidebar 2026-04-23 (แก้ overflow) */}
      <div className="flex items-center gap-1" role="group" aria-label="เลือกภาษา">
        {(['th', 'en'] as SupportedLocale[]).map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => handleLocaleSwitch(loc)}
            aria-pressed={currentLocale === loc}
            className={cn(
              'h-7 min-w-[32px] rounded-md border px-2 text-[11px] font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]',
              currentLocale === loc
                ? 'border-[color:var(--color-accent)] bg-accent-soft text-[color:var(--color-accent)]'
                : 'border-hairline bg-surface text-ink-muted hover:border-[color:var(--color-accent)] hover:text-ink-soft',
            )}
          >
            {loc === 'th' ? 'ไทย' : 'EN'}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="humi-icon-btn"
        aria-label={isDark ? 'สลับโหมดสว่าง' : 'สลับโหมดมืด'}
        title={isDark ? 'สลับโหมดสว่าง' : 'สลับโหมดมืด'}
        onClick={handleThemeToggle}
      >
        {isDark ? (
          <Sun size={18} aria-hidden="true" />
        ) : (
          <Moon size={18} aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        className="humi-icon-btn"
        aria-label="การแจ้งเตือน"
        title="การแจ้งเตือน"
      >
        <Bell size={18} aria-hidden="true" />
        <span className="humi-dot-badge" aria-hidden="true" />
      </button>
      <PersonaSwitcher />
      {actions}
    </div>
  );
}
