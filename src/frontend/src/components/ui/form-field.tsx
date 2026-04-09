'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea' | 'combobox';
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: { value: string; label: string; searchLabel?: string }[];
  className?: string;
}

function ComboboxField({
  name,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  required,
  inputClasses,
}: {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: { value: string; label: string; searchLabel?: string }[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  inputClasses: string;
}) {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync display text when value changes externally (e.g. reset)
  useEffect(() => {
    if (value) {
      const selected = options?.find((o) => o.value === value);
      if (selected) setSearchText(selected.label);
    } else {
      setSearchText('');
    }
  }, [value, options]);

  const filtered = (options || []).filter((opt) => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return (
      opt.label.toLowerCase().includes(q) ||
      (opt.searchLabel && opt.searchLabel.toLowerCase().includes(q))
    );
  });

  const handleSelect = (val: string) => {
    const selected = options?.find((o) => o.value === val);
    if (selected) {
      setSearchText(selected.label);
      onChange?.(val);
    }
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const handleInputChange = (text: string) => {
    setSearchText(text);
    setIsOpen(true);
    setHighlightIndex(-1);
    // If user clears the input, clear the value
    if (!text) onChange?.('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === 'Enter' && isOpen && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[highlightIndex].value);
    }
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <input
        id={name}
        name={name}
        type="text"
        value={searchText}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete="off"
      />
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-gray-800 dark:border-gray-600">
          {filtered.map((opt, idx) => (
            <li
              key={opt.value}
              className={cn(
                'cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200',
                idx === highlightIndex && 'bg-gray-100 dark:bg-gray-700',
                opt.value === value && 'font-medium text-brand'
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt.value);
              }}
            >
              {opt.label}
              {opt.searchLabel && opt.searchLabel !== opt.label && (
                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">{opt.searchLabel}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {isOpen && filtered.length === 0 && searchText && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-500 shadow-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
          No results found
        </div>
      )}
    </div>
  );
}

export function FormField({
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  error,
  required,
  placeholder,
  disabled,
  options,
  className,
}: FormFieldProps) {
  const inputClasses = cn(
    'w-full rounded-lg border px-3 py-2 text-sm transition-colors',
    'focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand',
    'dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-500',
    error ? 'border-danger' : 'border-gray-300',
    disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed dark:bg-gray-900 dark:text-gray-500'
  );

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={inputClasses}
          disabled={disabled}
          required={required}
        >
          <option value="">{placeholder || 'Select...'}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'combobox') {
      return <ComboboxField
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        inputClasses={inputClasses}
      />;
    }

    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(inputClasses, 'min-h-[80px] resize-y')}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={3}
        />
      );
    }

    return (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    );
  };

  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="ml-0.5 text-danger">*</span>}
      </label>
      {renderInput()}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
