'use client';

import { useEffect, useRef, useState } from 'react';
import type { WidgetProps } from '@rjsf/utils';
import { Check, ChevronDown } from 'lucide-react';

/**
 * Custom SelectWidget for rjsf that replaces the native <select> element.
 *
 * Why: native <select> dropdowns are OS-rendered. On macOS they appear as
 * a dark floating menu that doesn't respect the app's light theme → feels
 * disconnected ("ลอยออกมา" per Ken's feedback). A custom widget styled
 * with @theme tokens matches Precision Cool.
 *
 * Keeps accessibility: real keyboard nav (Enter/Space to open, Esc to close,
 * ArrowUp/Down to navigate, Enter to select) + proper aria-* roles for
 * screen readers. Click-outside dismisses.
 */
export function CustomSelectWidget(props: WidgetProps) {
  const {
    id,
    value,
    options,
    onChange,
    disabled,
    readonly,
    placeholder,
    required,
  } = props;

  const enumOptions: Array<{ value: unknown; label: string }> =
    (options.enumOptions as Array<{ value: unknown; label: string }>) ?? [];

  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Lookup current display label by matching value
  const currentOption = enumOptions.find((o) => o.value === value);
  const displayLabel = currentOption?.label ?? '';

  // Click-outside → close
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // When opening, highlight current selection
  useEffect(() => {
    if (open) {
      const idx = enumOptions.findIndex((o) => o.value === value);
      setHighlightIdx(idx >= 0 ? idx : 0);
    }
  }, [open, value, enumOptions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || readonly) return;

    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, enumOptions.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (highlightIdx >= 0 && highlightIdx < enumOptions.length) {
        onChange(enumOptions[highlightIdx].value);
        setOpen(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      data-custom-select
    >
      {/* Trigger button */}
      <button
        type="button"
        id={id}
        disabled={disabled || readonly}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-required={required}
        onClick={() => !disabled && !readonly && setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={[
          'w-full flex items-center justify-between',
          'px-3 py-2 text-sm text-left',
          'bg-surface border border-hairline rounded-md',
          'text-ink transition-colors',
          'hover:border-ink-muted',
          'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25',
          'disabled:bg-surface-raised disabled:cursor-not-allowed disabled:text-ink-muted',
        ].join(' ')}
      >
        <span className={displayLabel ? 'text-ink' : 'text-ink-muted'}>
          {displayLabel || placeholder || '— Select —'}
        </span>
        <ChevronDown
          size={16}
          className={`text-ink-soft transition-transform shrink-0 ml-2 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-labelledby={id}
          className={[
            'absolute z-20 mt-1 w-full',
            'bg-surface border border-hairline rounded-md',
            'shadow-2',
            'max-h-64 overflow-auto',
            'py-1',
          ].join(' ')}
        >
          {enumOptions.length === 0 && (
            <li className="px-3 py-2 text-sm text-ink-muted">No options</li>
          )}
          {enumOptions.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isHighlighted = idx === highlightIdx;
            return (
              <li
                key={idx}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightIdx(idx)}
                onMouseDown={(e) => {
                  // Prevent button blur before click
                  e.preventDefault();
                }}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={[
                  'px-3 py-2 text-sm cursor-pointer flex items-center justify-between',
                  'transition-colors',
                  isHighlighted ? 'bg-accent-tint text-ink' : 'text-ink',
                ].join(' ')}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check size={14} className="text-accent shrink-0" aria-hidden />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
