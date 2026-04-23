'use client'

// CompanyTypeahead.tsx — Typeahead combobox สำหรับเลือก Company
// ค้นหาด้วย externalCode หรือ name (Thai/English) หรือ country
// รองรับ keyboard nav: ArrowUp/ArrowDown/Enter/Escape
// Accessibility: role="combobox", aria-required, aria-invalid, aria-expanded

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Company } from '@/lib/admin/store/loadCompanies'

// จำนวน result สูงสุดที่แสดงใน dropdown
const MAX_RESULTS = 10

interface CompanyTypeaheadProps {
  companies: Company[]
  value: string | null           // externalCode ที่เลือกอยู่ (หรือ null)
  onChange: (code: string) => void
  error?: string                 // error message สำหรับแสดงใต้ field
  disabled?: boolean
}

export default function CompanyTypeahead({
  companies,
  value,
  onChange,
  error,
  disabled = false,
}: CompanyTypeaheadProps) {
  // หา label ของ company ที่เลือกอยู่เพื่อแสดงใน input
  const selectedCompany = companies.find((c) => c.code === value) ?? null

  // ค่าใน input text (อาจต่างจาก value ระหว่างที่ user กำลังพิมพ์)
  const [inputText, setInputText] = useState<string>(
    selectedCompany
      ? `${selectedCompany.code} — ${selectedCompany.labelTh} (${selectedCompany.country})`
      : ''
  )
  const [isOpen, setIsOpen] = useState(false)
  const [filtered, setFiltered] = useState<Company[]>([])
  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // คำนวณ display label สำหรับ company หนึ่งรายการ
  const formatLabel = (c: Company) =>
    `${c.code} — ${c.labelTh} (${c.country})`

  // กรอง companies ตาม query ที่พิมพ์
  const filterCompanies = useCallback(
    (query: string): Company[] => {
      const q = query.trim().toLowerCase()
      if (!q) return []
      return companies
        .filter(
          (c) =>
            c.code.toLowerCase().includes(q) ||
            c.labelTh.toLowerCase().includes(q) ||
            c.labelEn.toLowerCase().includes(q) ||
            c.country.toLowerCase().includes(q)
        )
        .slice(0, MAX_RESULTS)
    },
    [companies]
  )

  // sync inputText ถ้า value prop เปลี่ยนจากภายนอก
  useEffect(() => {
    if (value) {
      const found = companies.find((c) => c.code === value)
      if (found) setInputText(formatLabel(found))
    } else {
      setInputText('')
    }
  }, [value, companies])

  // ปิด dropdown เมื่อคลิกนอก component
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        // ถ้า user ออกโดยไม่ได้เลือก — reset text กลับเป็น selected value หรือ ว่าง
        if (value) {
          const found = companies.find((c) => c.code === value)
          setInputText(found ? formatLabel(found) : '')
        } else {
          setInputText('')
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value, companies])

  // scroll highlighted item เข้า view
  useEffect(() => {
    if (highlightedIdx >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIdx] as HTMLElement | undefined
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIdx])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value
    setInputText(text)
    setHighlightedIdx(-1)

    if (text.trim() === '') {
      setIsOpen(false)
      setFiltered([])
      // user ล้าง input — clear selection
      onChange('')
      return
    }

    const results = filterCompanies(text)
    setFiltered(results)
    setIsOpen(results.length > 0)
  }

  function selectCompany(company: Company) {
    setInputText(formatLabel(company))
    setIsOpen(false)
    setHighlightedIdx(-1)
    onChange(company.code)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      // เปิด dropdown ถ้ากด ArrowDown ขณะที่มี text
      if (e.key === 'ArrowDown' && inputText.trim()) {
        const results = filterCompanies(inputText)
        setFiltered(results)
        setIsOpen(results.length > 0)
        setHighlightedIdx(0)
        e.preventDefault()
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIdx((prev) => Math.min(prev + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIdx((prev) => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIdx >= 0 && filtered[highlightedIdx]) {
          selectCompany(filtered[highlightedIdx])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIdx(-1)
        // คืน text เป็น selected value
        if (value) {
          const found = companies.find((c) => c.code === value)
          setInputText(found ? formatLabel(found) : '')
        }
        break
    }
  }

  const listboxId = 'company-typeahead-listbox'

  return (
    <div ref={containerRef} className="relative">
      <input
        ref={inputRef}
        id="company-typeahead"
        type="text"
        role="combobox"
        aria-required="true"
        aria-invalid={!!error}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-activedescendant={
          highlightedIdx >= 0 ? `company-option-${highlightedIdx}` : undefined
        }
        autoComplete="off"
        disabled={disabled}
        placeholder="พิมพ์รหัสหรือชื่อบริษัท..."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          // เปิด dropdown ถ้ามี text อยู่แล้ว
          if (inputText.trim() && !value) {
            const results = filterCompanies(inputText)
            setFiltered(results)
            setIsOpen(results.length > 0)
          }
        }}
        className={[
          'w-full rounded-md border px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300',
          disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900',
        ].join(' ')}
      />

      {/* Dropdown list */}
      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="รายการบริษัท"
          className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
        >
          {filtered.map((company, idx) => (
            <li
              key={company.code}
              id={`company-option-${idx}`}
              role="option"
              aria-selected={company.code === value}
              onMouseDown={(e) => {
                // preventDefault ป้องกัน blur event ก่อน click
                e.preventDefault()
                selectCompany(company)
              }}
              className={[
                'px-3 py-2 text-sm cursor-pointer',
                idx === highlightedIdx
                  ? 'bg-blue-600 text-white'
                  : company.code === value
                  ? 'bg-blue-50 text-blue-900'
                  : 'text-gray-900 hover:bg-gray-100',
              ].join(' ')}
            >
              <span className="font-medium">{company.code}</span>
              <span className="mx-1 text-gray-400">—</span>
              <span>{company.labelTh}</span>
              <span className="ml-1 text-xs text-gray-400">({company.country})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
