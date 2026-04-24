'use client'

// AttachmentDropzone — Full box drag+drop UI (SF Image 14 pattern)
// Ken directive 2026-04-24: ทุก attachment field ต้องใช้ component นี้
// Mockup level: base64 dataUrl in state, NO backend upload (Phase 2.5+)

import { useRef, useState, useCallback, useId } from 'react'
import { Paperclip, Upload, X } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AttachedFile {
  id: string
  name: string
  size: number   // bytes
  type: string   // MIME
  dataUrl?: string
}

export interface AttachmentDropzoneProps {
  files: AttachedFile[]
  onFilesChange: (files: AttachedFile[]) => void
  maxFiles?: number   // default 10
  maxSizeMB?: number  // default 10
  accept?: string     // default '*/*'
  label?: string      // default 'แนบไฟล์'
  disabled?: boolean
  required?: boolean
  id?: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function AttachmentDropzone({
  files,
  onFilesChange,
  maxFiles = 10,
  maxSizeMB = 10,
  accept = '*/*',
  label = 'แนบไฟล์',
  disabled = false,
  required = false,
  id,
}: AttachmentDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [hovering, setHovering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const generatedId = useId()
  const dropzoneId = id ?? generatedId

  const addFiles = useCallback(
    async (raw: FileList | null) => {
      if (!raw || raw.length === 0) return
      setError(null)

      const maxBytes = maxSizeMB * 1024 * 1024
      const incoming: AttachedFile[] = []

      for (const file of Array.from(raw)) {
        if (files.length + incoming.length >= maxFiles) {
          setError(`แนบได้สูงสุด ${maxFiles} ไฟล์`)
          break
        }
        if (file.size > maxBytes) {
          setError(`ไฟล์ "${file.name}" เกินขนาดสูงสุด ${maxSizeMB} MB`)
          continue
        }
        let dataUrl: string | undefined
        try {
          dataUrl = await readAsDataUrl(file)
        } catch {
          console.warn('[AttachmentDropzone] readAsDataUrl failed for', file.name)
        }
        incoming.push({
          id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl,
        })
      }

      if (incoming.length > 0) {
        onFilesChange([...files, ...incoming])
      }
    },
    [files, maxFiles, maxSizeMB, onFilesChange],
  )

  const removeFile = useCallback(
    (fileId: string) => {
      onFilesChange(files.filter((f) => f.id !== fileId))
    },
    [files, onFilesChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setHovering(false)
      if (!disabled) addFiles(e.dataTransfer.files)
    },
    [disabled, addFiles],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        inputRef.current?.click()
      }
    },
    [disabled],
  )

  const isEmpty = files.length === 0

  return (
    <div>
      {/* ── Label ── */}
      <label htmlFor={dropzoneId} className="humi-label">
        {label}
        {required && (
          <span aria-hidden="true" className="humi-asterisk ml-1">*</span>
        )}
      </label>

      {/* ── Drop zone box ── */}
      <div
        id={dropzoneId}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="พื้นที่แนบไฟล์"
        aria-disabled={disabled}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setHovering(true) }}
        onDragLeave={() => setHovering(false)}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        style={{
          minHeight: 180,
          border: `2px dashed ${hovering ? 'var(--color-accent)' : 'var(--color-hairline)'}`,
          borderRadius: 12,
          background: hovering ? 'var(--color-accent-soft, rgba(0,195,255,0.06))' : 'var(--color-canvas-soft)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: isEmpty ? 'center' : 'flex-start',
          padding: '20px 16px',
          gap: 12,
          transition: 'border-color 0.15s, background 0.15s',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {/* Empty state */}
        {isEmpty && (
          <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
            <Paperclip
              size={32}
              style={{ color: 'var(--color-ink-muted)', marginBottom: 10, margin: '0 auto 10px' }}
              aria-hidden
            />
            <p className="text-body font-medium text-ink" style={{ marginBottom: 4 }}>
              ยังไม่มีไฟล์แนบ
            </p>
            <p className="text-small text-ink-muted">
              ลากไฟล์มาวางที่นี่ หรือกดปุ่มอัปโหลด
            </p>
          </div>
        )}

        {/* File list */}
        {!isEmpty && (
          <ul style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {files.map((f) => (
              <li
                key={f.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  background: 'var(--color-canvas)',
                  border: '1px solid var(--color-hairline-soft)',
                }}
              >
                <Paperclip size={14} style={{ color: 'var(--color-ink-muted)', flexShrink: 0 }} aria-hidden />
                <span
                  className="text-body text-ink"
                  style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  title={f.name}
                >
                  {f.name}
                </span>
                <span className="text-small text-ink-muted" style={{ flexShrink: 0 }}>
                  {fmtSize(f.size)}
                </span>
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(f.id) }}
                    aria-label={`ลบไฟล์ ${f.name}`}
                    style={{
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      color: 'var(--color-ink-muted)',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-danger)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-ink-muted)')}
                  >
                    <X size={14} aria-hidden />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Upload button — right-aligned */}
        {!disabled && (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: isEmpty ? 4 : 0 }}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
              className="humi-btn humi-btn--secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Upload size={14} aria-hidden />
              อัปโหลด
            </button>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={accept}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: 'none' }}
        onChange={(e) => { addFiles(e.target.files); e.target.value = '' }}
      />

      {/* Error message */}
      {error && (
        <p role="alert" className="mt-1 text-xs text-warning">{error}</p>
      )}

      {/* Hint */}
      <p className="mt-1 text-xs text-ink-muted">
        รองรับทุกประเภทไฟล์ · สูงสุด {maxSizeMB} MB ต่อไฟล์ · แนบได้สูงสุด {maxFiles} ไฟล์
      </p>
    </div>
  )
}
