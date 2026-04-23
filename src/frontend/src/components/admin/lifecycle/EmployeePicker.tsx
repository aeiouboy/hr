'use client'

// EmployeePicker.tsx — Typeahead combobox สำหรับเลือกพนักงาน (Lifecycle wizards)
// ค้นหาด้วย employee_id / ชื่อ (ไทย/อังกฤษ)
// Accessibility: role="combobox", aria-labelledby, aria-expanded, aria-activedescendant
// filter prop: 'active' = เฉพาะพนักงานที่ยังทำงาน, 'terminated' = เฉพาะพนักงานที่ออกแล้ว
import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import type { MockEmployee } from '@/mocks/employees'
import { useEmployees } from '@/lib/admin/store/useEmployees'

// จำนวน result สูงสุดใน dropdown
const MAX_RESULTS = 8

interface EmployeePickerProps {
  onSelect: (emp: MockEmployee) => void
  filter?: 'active' | 'terminated'
  required?: boolean
  value?: MockEmployee | null
  id?: string
}

export function EmployeePicker({
  onSelect,
  filter,
  required = false,
  value = null,
  id = 'employee-picker',
}: EmployeePickerProps) {
  const allEmployees = useEmployees((s) => s.all)

  // pool ที่กรองตาม filter prop แล้ว — คำนวณครั้งเดียว
  const employeePool = useMemo(
    () =>
      filter ? allEmployees.filter((e) => e.status === filter) : allEmployees,
    [filter, allEmployees]
  )

  // format label สำหรับ employee หนึ่งรายการ
  const formatLabel = useCallback((emp: MockEmployee) => {
    const name = `${emp.first_name_th} ${emp.last_name_th}`
    return `${emp.employee_id} — ${name}`
  }, [])

  const [inputText, setInputText] = useState<string>(value ? formatLabel(value) : '')
  const [isOpen, setIsOpen] = useState(false)
  const [filtered, setFiltered] = useState<MockEmployee[]>([])
  const [highlightedIdx, setHighlightedIdx] = useState<number>(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const listboxId = `${id}-listbox`

  // กรอง employees ตาม query
  const filterEmployees = useCallback(
    (query: string): MockEmployee[] => {
      const q = query.trim().toLowerCase()
      if (!q) return []
      return employeePool
        .filter((emp) => {
          const fullNameTh = `${emp.first_name_th} ${emp.last_name_th}`.toLowerCase()
          const fullNameEn = `${emp.first_name_en} ${emp.last_name_en}`.toLowerCase()
          return (
            emp.employee_id.toLowerCase().includes(q) ||
            fullNameTh.includes(q) ||
            fullNameEn.includes(q)
          )
        })
        .slice(0, MAX_RESULTS)
    },
    [employeePool]
  )

  // sync inputText ถ้า value prop เปลี่ยนจากภายนอก
  useEffect(() => {
    if (value) {
      setInputText(formatLabel(value))
    } else {
      setInputText('')
    }
  }, [value, formatLabel])

  // ปิด dropdown เมื่อคลิกนอก component
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        // ถ้า user ออกโดยไม่ได้เลือก — reset text
        if (value) {
          setInputText(formatLabel(value))
        } else {
          setInputText('')
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value, formatLabel])

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
      return
    }

    const results = filterEmployees(text)
    setFiltered(results)
    setIsOpen(results.length > 0)
  }

  function selectEmployee(emp: MockEmployee) {
    setInputText(formatLabel(emp))
    setIsOpen(false)
    setHighlightedIdx(-1)
    onSelect(emp)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' && inputText.trim()) {
        const results = filterEmployees(inputText)
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
          selectEmployee(filtered[highlightedIdx])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIdx(-1)
        if (value) {
          setInputText(formatLabel(value))
        }
        break
    }
  }

  const labelId = `${id}-label`

  return (
    <div ref={containerRef} className="relative">
      {/* Label สำหรับ accessibility */}
      <label id={labelId} htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        ค้นหาพนักงาน (รหัส / ชื่อ)
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>

      <input
        ref={inputRef}
        id={id}
        type="text"
        role="combobox"
        aria-required={required}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-activedescendant={
          highlightedIdx >= 0 ? `${id}-option-${highlightedIdx}` : undefined
        }
        autoComplete="off"
        placeholder="พิมพ์รหัสพนักงาน หรือชื่อ..."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (inputText.trim() && !value) {
            const results = filterEmployees(inputText)
            setFiltered(results)
            setIsOpen(results.length > 0)
          }
        }}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdown list */}
      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="รายการพนักงาน"
          className="absolute z-50 mt-1 w-full max-h-64 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
        >
          {filtered.map((emp, idx) => {
            const fullName = `${emp.first_name_th} ${emp.last_name_th}`
            const isHighlighted = idx === highlightedIdx
            const isSelected = value?.employee_id === emp.employee_id
            return (
              <li
                key={emp.employee_id}
                id={`${id}-option-${idx}`}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => {
                  // preventDefault ป้องกัน blur event ก่อน click
                  e.preventDefault()
                  selectEmployee(emp)
                }}
                className={[
                  'px-3 py-2 text-sm cursor-pointer',
                  isHighlighted
                    ? 'bg-blue-600 text-white'
                    : isSelected
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-900 hover:bg-gray-100',
                ].join(' ')}
              >
                <div className="flex items-center justify-between">
                  <span>
                    <span className="font-medium">{emp.employee_id}</span>
                    <span className={`mx-1 ${isHighlighted ? 'text-blue-200' : 'text-gray-400'}`}>—</span>
                    <span>{fullName}</span>
                  </span>
                  {/* แสดง badge สถานะ */}
                  <span
                    className={[
                      'ml-2 text-xs px-1.5 py-0.5 rounded-full font-medium',
                      emp.status === 'active'
                        ? isHighlighted ? 'bg-white text-green-700' : 'bg-green-100 text-green-700'
                        : isHighlighted ? 'bg-white text-red-700' : 'bg-red-100 text-red-700',
                    ].join(' ')}
                  >
                    {emp.status === 'active' ? 'ทำงานอยู่' : 'ออกแล้ว'}
                  </span>
                </div>
                {/* แสดงตำแหน่งเล็กๆ */}
                <div className={`text-xs mt-0.5 ${isHighlighted ? 'text-blue-200' : 'text-gray-400'}`}>
                  {emp.position_title} · {emp.company}
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {/* Empty state */}
      {isOpen && filtered.length === 0 && inputText.trim() !== '' && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg px-3 py-4 text-sm text-gray-500 text-center">
          ไม่พบพนักงานที่ตรงกับคำค้น
        </div>
      )}
    </div>
  )
}
