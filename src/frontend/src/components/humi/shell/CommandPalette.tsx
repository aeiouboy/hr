'use client';

// ════════════════════════════════════════════════════════════
// Humi ⌘K Command Palette
// Modal overlay — search input top, filtered list, keyboard nav.
// No external dependency — built from Tailwind primitives.
//
// Responsive (issue #5):
// - <sm: full-screen (inset-0, rounded-none) — fills viewport
// - sm+: centered modal (max-w-lg, rounded-2xl) — original behavior
// - Input row min-h-[44px] touch target
// - Each result item min-h-[44px] touch target
// - Footer hint hidden on mobile (sm:flex)
// ════════════════════════════════════════════════════════════

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HUMI_COMMANDS, filterCommands, type HumiCommand } from '@/lib/humi-command-registry';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

/** Detect Mac platform for ⌘K vs Ctrl+K label */
function isMac(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

/** Extract locale prefix from pathname e.g. /th/goals → /th */
function localePrefix(pathname: string): string {
  const m = pathname.match(/^\/(th|en)/);
  return m ? `/${m[1]}` : '/th';
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = filterCommands(query);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      // Focus input on next tick after mount
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Reset activeIndex when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const navigate = useCallback(
    (cmd: HumiCommand) => {
      const prefix = localePrefix(pathname);
      router.push(prefix + cmd.route);
      onClose();
    },
    [router, pathname, onClose],
  );

  // Keyboard navigation within palette
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [results, activeIndex, navigate, onClose],
  );

  if (!open) return null;

  return (
    /* Backdrop — full-screen on mobile (items-stretch), centered on sm+ */
    <div
      className="fixed inset-0 z-50 flex items-stretch sm:items-start sm:justify-center sm:pt-[15vh]"
      style={{ background: 'rgba(14,27,44,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="presentation"
    >
      {/* Panel — full-screen <sm, centered max-w-lg sm+ */}
      <div
        className={cn(
          'w-full bg-surface shadow-[0_24px_48px_rgba(14,27,44,0.18)]',
          'border border-hairline',
          // Mobile: fills full screen, no rounding
          'rounded-none',
          // sm+: centered modal with radius + max-width
          'sm:rounded-2xl sm:max-w-lg sm:h-auto sm:self-start',
          // On mobile stretch to full height via flex parent
          'flex flex-col',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="แผงคำสั่ง"
      >
        {/* Search input — min-h-[44px] touch target */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-hairline min-h-[44px]">
          <Search size={16} className="shrink-0 text-ink-muted" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="ค้นหา…"
            aria-label="ค้นหาในแผงคำสั่ง"
            className="flex-1 bg-transparent text-body text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <kbd
            className="hidden sm:inline-flex items-center gap-0.5 rounded-md border border-hairline bg-canvas-soft px-1.5 py-0.5 text-[11px] text-ink-muted"
            aria-label="กด Escape เพื่อปิด"
          >
            Esc
          </kbd>
        </div>

        {/* Results list — fills remaining height on mobile */}
        <ul
          role="listbox"
          aria-label="ผลลัพธ์การค้นหา"
          className="flex-1 overflow-y-auto py-2 sm:flex-none sm:max-h-80"
        >
          {results.length === 0 ? (
            <li className="px-4 py-8 text-center text-small text-ink-muted">
              ไม่มีผลลัพธ์
            </li>
          ) : (
            results.map((cmd, i) => (
              <li key={cmd.id} role="option" aria-selected={i === activeIndex}>
                <button
                  type="button"
                  onClick={() => navigate(cmd)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-3 min-h-[44px] text-left transition-colors',
                    i === activeIndex
                      ? 'bg-accent-soft text-ink'
                      : 'text-ink-soft hover:bg-canvas-soft',
                  )}
                >
                  <span className="flex-1 text-small font-medium">{cmd.label}</span>
                  {cmd.group && (
                    <span className="shrink-0 text-[11px] text-ink-faint">{cmd.group}</span>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer hint — hidden on mobile (too cramped), visible sm+ */}
        <div className="hidden sm:flex items-center gap-3 border-t border-hairline px-4 py-2.5">
          <span className="text-[11px] text-ink-faint">
            ↑↓ เลือก · Enter ไป · Esc ปิด
          </span>
          <span className="ml-auto text-[11px] text-ink-faint">
            {isMac() ? '⌘K' : 'Ctrl+K'}
          </span>
        </div>
      </div>
    </div>
  );
}
