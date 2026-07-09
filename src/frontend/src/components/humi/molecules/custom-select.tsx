'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface SelectOption<T extends string | number = string> {
  value: T;
  label: string;
}

interface CustomSelectProps<T extends string | number = string> {
  id?: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  'aria-label'?: string;
}

export function CustomSelect<T extends string | number = string>({
  id,
  value,
  options,
  onChange,
  disabled = false,
  placeholder,
  className = '',
  'aria-label': ariaLabel,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = options.find((o) => o.value === value);
  const displayLabel = currentOption?.label ?? '';

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

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setHighlightIdx(idx >= 0 ? idx : 0);
    }
  }, [open, value, options]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

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
      setHighlightIdx((i) => Math.min(i + 1, options.length - 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (highlightIdx >= 0 && highlightIdx < options.length) {
        onChange(options[highlightIdx].value);
        setOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen(!open)}
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
          className={`text-ink-soft transition-transform shrink-0 ml-2 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>

      {open && (
        <ul
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
          {options.length === 0 && (
            <li className="px-3 py-2 text-sm text-ink-muted">No options</li>
          )}
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isHighlighted = idx === highlightIdx;
            return (
              <li
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightIdx(idx)}
                onMouseDown={(e) => e.preventDefault()}
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
