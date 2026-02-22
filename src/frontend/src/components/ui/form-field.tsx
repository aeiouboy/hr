'use client';

import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  className?: string;
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
    'focus:border-cg-red focus:outline-none focus:ring-1 focus:ring-cg-red',
    error ? 'border-cg-error' : 'border-gray-300',
    disabled && 'bg-gray-50 text-gray-500 cursor-not-allowed'
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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-cg-error">*</span>}
      </label>
      {renderInput()}
      {error && <p className="text-xs text-cg-error">{error}</p>}
    </div>
  );
}
