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

import { LogOut, Menu, Moon, Search, Sun, UserCog } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/stores/ui-store';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';
import { getLocaleFromPath, swapLocale, type SupportedLocale } from '@/lib/humi-locale';
import { PersonaSwitcher } from '@/components/humi/shell/PersonaSwitcher';
import { NotificationBell } from '@/components/humi/organisms/NotificationBell';
import { TodoBell } from '@/components/humi/organisms/TodoBell';

export interface TopbarProps {
  /** h2 page title — typically derived from route */
  title: string;
  /** eyebrow above title — default: "สวัสดีตอนเช้า คุณจงรักษ์" */
  subtitle?: string;
  /** optional extra action buttons rendered to the right of the bell */
  actions?: React.ReactNode;
  /** called when search pill/icon is clicked (wired to CommandPalette in b5) */
  onSearchClick?: () => void;
}

// Time-based greeting for the active identity. Uses the first name only (matching
// the home hero), so while impersonating it greets the persona ("คุณสมชาย"),
// not the real admin.
function greetingFor(username: string | null, isTh: boolean): string {
  const first = (username ?? (isTh ? 'จงรักษ์ ทานากะ' : 'Jongrak')).trim().split(/\s+/)[0];
  const h = new Date().getHours();
  if (isTh) {
    const tod = h < 12 ? 'สวัสดีตอนเช้า' : h < 18 ? 'สวัสดีตอนบ่าย' : 'สวัสดีตอนเย็น';
    return `${tod} คุณ${first}`;
  }
  const tod = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  return `${tod}, ${first}`;
}

export function Topbar({
  // `title` is intentionally not rendered: every content page owns its title via
  // its own breadcrumb + <h1> header, so showing a route-derived title here
  // duplicated it on ~97/138 pages. Topbar now carries only the greeting.
  // Prop kept on TopbarProps so existing callers/tests still type-check.
  subtitle,
  actions,
  onSearchClick,
}: TopbarProps) {
  const { theme, setTheme, toggleMobileMenu, mobileMenuOpen, setPersonaPickerOpen } = useUIStore();
  const isDark = theme === 'dark';
  const [scrolled, setScrolled] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const topbarRef = useRef<HTMLDivElement>(null);
  const avatarMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = getLocaleFromPath(pathname);
  const username = useAuthStore((s) => s.username);
  const isTh = currentLocale === 'th';
  // Greeting follows the active identity (persona while impersonating). An explicit
  // `subtitle` prop still overrides it.
  const greetingEyebrow = subtitle ?? greetingFor(username, currentLocale === 'th');
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

  // Close avatar menu on outside click + Esc
  useEffect(() => {
    if (!avatarMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAvatarMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [avatarMenuOpen]);

  const initials = (username ?? (isTh ? 'จงรักษ์ ทานากะ' : 'Jongrak'))
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

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

      {/* NOTE: the desktop sidebar-collapse toggle that used to live here was
          removed (2026-05-27) — it duplicated the rail collapse button inside
          Sidebar.tsx (PR #187) but fully hid the rail instead of folding to it.
          The rail toggle + the drag-resize handle are now the single source of
          sidebar width control on desktop. */}

      {/* Title block — min-w-0 lets it shrink below content; whitespace-nowrap +
          truncate on eyebrow+h2 prevent Thai-character vertical wrap when topbar
          right-side gets crowded (e.g., 9-persona switcher with long label) */}
      {/* Greeting is now the sole topbar heading (page title lives in each page's
          own header, see destructure note above). Promoted from small eyebrow to
          the h2 slot so the bar doesn't read empty. */}
      <div className="min-w-0 flex-shrink overflow-hidden">
        <h2
          className="truncate whitespace-nowrap text-lg sm:text-xl lg:text-2xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em' }}
        >
          {greetingEyebrow}
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
              'h-7 min-w-[32px] rounded-md border px-2 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]',
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
      {/* Req6: inbox-then-bell — TodoBell (envelope) precedes NotificationBell. */}
      <TodoBell />
      <NotificationBell />

      {/* Avatar dropdown — SF Proxy Now canonical entry point.
          The Topbar persona pill was removed (di-proxy-sf-2026-05-28); the
          "Take Action on Behalf of…" trigger lives in this avatar menu now.
          PersonaSwitcher (rendered just below) is purely the modal — open/close
          is driven by ui-store.personaPickerOpen. */}
      <div className="relative" ref={avatarMenuRef}>
        <button
          type="button"
          onClick={() => setAvatarMenuOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={avatarMenuOpen}
          aria-label={isTh ? 'เมนูบัญชี' : 'Account menu'}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full',
            'bg-accent-soft text-accent-ink text-small font-semibold',
            'border border-hairline transition-colors',
            'hover:bg-canvas-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          )}
        >
          {initials}
        </button>

        {avatarMenuOpen && (
          <div
            role="menu"
            aria-label={isTh ? 'เมนูบัญชี' : 'Account menu'}
            className={cn(
              'absolute right-0 top-full z-40 mt-2 min-w-[14rem] overflow-hidden rounded-md border border-hairline bg-surface',
              'shadow-[var(--shadow-lg)]',
            )}
          >
            <div className="border-b border-hairline px-3 py-2 text-small text-ink-muted">
              {username ?? (isTh ? 'บัญชีของฉัน' : 'My account')}
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setAvatarMenuOpen(false);
                setPersonaPickerOpen(true);
              }}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-small text-ink',
                'transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:bg-canvas-soft',
              )}
            >
              <UserCog size={14} aria-hidden className="flex-shrink-0" />
              <span>{isTh ? 'สวมบทบาทแทน…' : 'Take Action on Behalf of…'}</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setAvatarMenuOpen(false);
                router.push(`/${currentLocale}/login`);
              }}
              className={cn(
                'flex w-full items-center gap-2 border-t border-hairline px-3 py-2 text-left text-small text-ink',
                'transition-colors hover:bg-canvas-soft focus-visible:outline-none focus-visible:bg-canvas-soft',
              )}
            >
              <LogOut size={14} aria-hidden className="flex-shrink-0" />
              <span>{isTh ? 'ออกจากระบบ' : 'Sign out'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Mounted but invisible until ui-store.personaPickerOpen flips true.
          Avatar dropdown menu item above flips that flag. */}
      <PersonaSwitcher />
      {actions}
    </div>
  );
}
