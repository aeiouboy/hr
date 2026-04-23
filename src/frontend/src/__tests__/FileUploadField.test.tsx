/**
 * FileUploadField.test.tsx — Component unit tests (Sprint 3, issue #12)
 * Framework: Vitest + jsdom + @testing-library/react
 *
 * AC-2: drag-drop + click-to-browse + validation + preview + remove
 *
 * FileReader is polyfilled by jsdom; we control the base64 output
 * via manual result injection + dispatchEvent pattern.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// ── Store mock: isolate component from real Zustand ───────────────────────────
// We mock the store so FileUploadField's addAttachment / removeAttachment
// are spies we can assert on.

const mockAddAttachment = vi.fn();
const mockRemoveAttachment = vi.fn();

vi.mock('@/stores/humi-profile-slice', () => ({
  useHumiProfileStore: (selector: (s: unknown) => unknown) => {
    const fakeState = {
      addAttachment: mockAddAttachment,
      removeAttachment: mockRemoveAttachment,
    };
    return selector(fakeState);
  },
}));

// ── FileReader mock helper ────────────────────────────────────────────────────
// jsdom has FileReader but we control the async result to keep tests fast.

function mockFileReaderSuccess(base64Result: string) {
  const original = globalThis.FileReader;
  const MockFileReader = vi.fn(() => {
    const instance = {
      result: null as string | null,
      onload: null as ((e: Event) => void) | null,
      onerror: null as ((e: Event) => void) | null,
      readAsDataURL: vi.fn(function (this: typeof instance) {
        this.result = base64Result;
        // Fire onload synchronously (safe in jsdom tests)
        this.onload?.(new Event('load'));
      }),
    };
    return instance;
  });
  globalThis.FileReader = MockFileReader as unknown as typeof FileReader;
  return () => { globalThis.FileReader = original; };
}

function mockFileReaderError() {
  const original = globalThis.FileReader;
  const MockFileReader = vi.fn(() => {
    const instance = {
      result: null,
      onload: null as ((e: Event) => void) | null,
      onerror: null as ((e: Event) => void) | null,
      error: new DOMException('Read error'),
      readAsDataURL: vi.fn(function (this: typeof instance) {
        this.onerror?.(new Event('error'));
      }),
    };
    return instance;
  });
  globalThis.FileReader = MockFileReader as unknown as typeof FileReader;
  return () => { globalThis.FileReader = original; };
}

// ── lucide-react mock (icons — not installed or jsdom-incompatible) ────────────
vi.mock('lucide-react', () => ({
  FileText: () => React.createElement('span', { 'data-testid': 'icon-file-text' }),
  ImageIcon: () => React.createElement('span', { 'data-testid': 'icon-image' }),
  X: () => React.createElement('span', { 'data-testid': 'icon-x' }),
}));

// ── cn mock (tailwind classnames util) ───────────────────────────────────────
vi.mock('@/lib/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}));

// ── Import component AFTER mocks ──────────────────────────────────────────────
import { FileUploadField } from '@/components/humi/FileUploadField';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeFile(name: string, sizeMB: number, type: string): File {
  const bytes = new Uint8Array(Math.round(sizeMB * 1024 * 1024));
  return new File([bytes], name, { type });
}

// ════════════════════════════════════════════════════════════════════════════

beforeEach(() => {
  mockAddAttachment.mockReset();
  mockRemoveAttachment.mockReset();
  // Default: addAttachment returns a predictable id
  mockAddAttachment.mockReturnValue('att-id-1');
});

afterEach(() => {
  vi.clearAllMocks();
});

// ════════════════════════════════════════════════════════════════════════════
// Render / structure
// ════════════════════════════════════════════════════════════════════════════

describe('Render — label + drop zone', () => {
  // AC-2
  it('renders label text when label prop is provided', () => {
    render(<FileUploadField label="เอกสารแนบ" />);
    expect(screen.getByText('เอกสารแนบ')).toBeInTheDocument();
  });

  // AC-2
  it('renders drop zone with accessible role=button', () => {
    render(<FileUploadField label="อัปโหลด" />);
    // The drop zone div has role="button"
    const dropZone = screen.getByRole('button', { name: /อัปโหลด/i });
    expect(dropZone).toBeInTheDocument();
  });

  // AC-2
  it('renders hidden file input (sr-only) linked via id', () => {
    render(<FileUploadField label="เอกสาร" />);
    const label = screen.getByText('เอกสาร');
    const inputId = label.closest('label')?.getAttribute('for') ?? label.getAttribute('for');
    expect(inputId).toBeTruthy();
    // Input exists in DOM
    const input = document.getElementById(inputId!);
    expect(input).not.toBeNull();
    expect(input?.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'file');
  });

  it('shows required asterisk when required=true', () => {
    render(<FileUploadField label="เอกสาร" required />);
    const labelEl = screen.getByText('เอกสาร').closest('label');
    expect(labelEl?.textContent).toContain('*');
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Click-to-browse → addAttachment called
// ════════════════════════════════════════════════════════════════════════════

describe('Click-to-browse: file input change → addAttachment called', () => {
  // AC-2
  it('addAttachment called with correct filename and mimeType after input change', async () => {
    const restore = mockFileReaderSuccess('data:application/pdf;base64,FIXTURE');
    render(<FileUploadField label="แนบ" />);

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile('ช3.pdf', 0.1, 'application/pdf');

    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(mockAddAttachment).toHaveBeenCalledOnce();
    expect(mockAddAttachment).toHaveBeenCalledWith(
      expect.objectContaining({
        filename: 'ช3.pdf',
        mimeType: 'application/pdf',
        base64: 'data:application/pdf;base64,FIXTURE',
      })
    );

    restore();
  });

  // AC-2
  it('onUpload callback receives attachment id returned by store', async () => {
    const restore = mockFileReaderSuccess('data:application/pdf;base64,ABC');
    const onUpload = vi.fn();
    mockAddAttachment.mockReturnValue('returned-att-id');

    render(<FileUploadField label="แนบ" onUpload={onUpload} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, { target: { files: [makeFile('doc.pdf', 0.2, 'application/pdf')] } });
    });

    expect(onUpload).toHaveBeenCalledWith('returned-att-id');
    restore();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Drag-and-drop → addAttachment called
// ════════════════════════════════════════════════════════════════════════════

describe('Drag-drop: dragOver + drop events → addAttachment called', () => {
  // AC-2
  it('addAttachment called when valid PDF dropped', async () => {
    const restore = mockFileReaderSuccess('data:application/pdf;base64,DDD');
    render(<FileUploadField label="วางไฟล์" />);

    const dropZone = screen.getByRole('button', { name: /วางไฟล์/i });
    const file = makeFile('ทะเบียนสมรส.pdf', 0.5, 'application/pdf');

    await act(async () => {
      fireEvent.dragOver(dropZone, {
        dataTransfer: { files: [file], types: ['Files'] },
      });
      fireEvent.drop(dropZone, {
        dataTransfer: { files: [file] },
      });
    });

    expect(mockAddAttachment).toHaveBeenCalledOnce();
    restore();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Validation: size limit
// ════════════════════════════════════════════════════════════════════════════

describe('Validation — file size', () => {
  // AC-2
  it('file > 5MB shows error message and does NOT call addAttachment', async () => {
    render(<FileUploadField label="แนบ" maxSizeMB={5} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = makeFile('big.pdf', 6, 'application/pdf'); // 6MB

    await act(async () => {
      fireEvent.change(input, { target: { files: [bigFile] } });
    });

    expect(mockAddAttachment).not.toHaveBeenCalled();
    // Error visible in DOM
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toMatch(/เกินกว่า|MB/i);
  });

  // AC-2: exactly at limit (5MB) — should pass
  it('file exactly at maxSizeMB boundary is accepted', async () => {
    const restore = mockFileReaderSuccess('data:application/pdf;base64,EXACT');
    render(<FileUploadField label="แนบ" maxSizeMB={5} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const exactFile = makeFile('exact.pdf', 5, 'application/pdf');

    await act(async () => {
      fireEvent.change(input, { target: { files: [exactFile] } });
    });

    expect(mockAddAttachment).toHaveBeenCalledOnce();
    restore();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Validation: MIME type
// ════════════════════════════════════════════════════════════════════════════

describe('Validation — MIME type', () => {
  // AC-2
  it('.exe (application/octet-stream) is rejected with error message', async () => {
    render(<FileUploadField label="แนบ" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const exeFile = makeFile('malware.exe', 0.1, 'application/octet-stream');

    await act(async () => {
      fireEvent.change(input, { target: { files: [exeFile] } });
    });

    expect(mockAddAttachment).not.toHaveBeenCalled();
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toMatch(/ไม่รองรับ|PDF|PNG|JPG/i);
  });

  // AC-2: .txt rejected
  it('text/plain MIME is rejected', async () => {
    render(<FileUploadField label="แนบ" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const txtFile = makeFile('data.txt', 0.01, 'text/plain');

    await act(async () => {
      fireEvent.change(input, { target: { files: [txtFile] } });
    });

    expect(mockAddAttachment).not.toHaveBeenCalled();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  // AC-2: image/png accepted
  it('image/png is accepted', async () => {
    const restore = mockFileReaderSuccess('data:image/png;base64,PNG');
    render(<FileUploadField label="แนบ" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const pngFile = makeFile('photo.png', 1, 'image/png');

    await act(async () => {
      fireEvent.change(input, { target: { files: [pngFile] } });
    });

    expect(mockAddAttachment).toHaveBeenCalledOnce();
    restore();
  });
});

// ════════════════════════════════════════════════════════════════════════════
// Preview
// ════════════════════════════════════════════════════════════════════════════

describe('Preview — shows filename + size + remove button after upload', () => {
  // AC-2
  it('preview item appears with filename and size after successful upload', async () => {
    const restore = mockFileReaderSuccess('data:application/pdf;base64,PREVIEW');
    render(<FileUploadField label="แนบ" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = makeFile('ช3-สำเนา.pdf', 0.1, 'application/pdf'); // ~0.1MB = 102 KB

    await act(async () => {
      fireEvent.change(input, { target: { files: [file] } });
    });

    expect(screen.getByText('ช3-สำเนา.pdf')).toBeInTheDocument();
    // Size label (KB)
    expect(screen.getByText(/\d+ KB/)).toBeInTheDocument();
    restore();
  });

  // AC-2: accessibility — remove button accessible by role
  it('remove button accessible via getByRole button with aria-label containing filename', async () => {
    const restore = mockFileReaderSuccess('data:application/pdf;base64,RMV');
    render(<FileUploadField label="แนบ" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, {
        target: { files: [makeFile('doc.pdf', 0.05, 'application/pdf')] },
      });
    });

    // aria-label = "ลบ doc.pdf"
    const removeBtn = screen.getByRole('button', { name: /ลบ|Remove/i });
    expect(removeBtn).toBeInTheDocument();
    restore();
  });

  // AC-2
  it('clicking remove button calls removeAttachment with correct id and hides preview', async () => {
    const restore = mockFileReaderSuccess('data:application/pdf;base64,REMOVE');
    const onRemove = vi.fn();
    mockAddAttachment.mockReturnValue('att-remove-id');

    render(<FileUploadField label="แนบ" onRemove={onRemove} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    await act(async () => {
      fireEvent.change(input, {
        target: { files: [makeFile('to-remove.pdf', 0.05, 'application/pdf')] },
      });
    });

    const removeBtn = screen.getByRole('button', { name: /ลบ|Remove/i });

    await act(async () => {
      fireEvent.click(removeBtn);
    });

    expect(mockRemoveAttachment).toHaveBeenCalledWith('att-remove-id');
    expect(onRemove).toHaveBeenCalledWith('att-remove-id');
    // Preview item gone
    expect(screen.queryByText('to-remove.pdf')).not.toBeInTheDocument();
    restore();
  });
});
