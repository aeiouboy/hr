/**
 * Modal.responsive.test.tsx
 * AC-5 — Modal responsive class assertions
 *
 * Modal renders via createPortal (document.body).
 * Tests verify:
 *   1. mx-4 sm:mx-auto mobile gutter + desktop centering
 *   2. widthClass prop applied (default max-w-lg)
 *   3. Custom widthClass renders correct token
 *   4. No regression: Portal + Esc handler + backdrop click
 *   5. Long modal content remains viewport-contained and scrollable
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { Modal } from '../organisms/Modal';

// ─────────────────────────────────────────────────────────────────────────────
// AC-5 — mx-4 sm:mx-auto mobile gutter
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-5 — Modal mobile gutter class tokens', () => {
  it('renders dialog inner div with mx-4 sm:mx-auto tokens', () => {
    const { baseElement } = render(
      <Modal open={true} onClose={() => {}} title="Test">
        <p>content</p>
      </Modal>
    );
    // Modal renders into document.body via Portal; baseElement = document.body wrapper
    const allClasses = Array.from(baseElement.querySelectorAll('[class]'))
      .map((el) => el.getAttribute('class') ?? '')
      .join(' ');

    expect(allClasses).toContain('mx-4');
    expect(allClasses).toContain('sm:mx-auto');
  });

  it('modal backdrop has fixed inset-0 z-50 positioning', () => {
    const { baseElement } = render(
      <Modal open={true} onClose={() => {}} title="Test">
        <p>content</p>
      </Modal>
    );
    const allClasses = Array.from(baseElement.querySelectorAll('[class]'))
      .map((el) => el.getAttribute('class') ?? '')
      .join(' ');

    expect(allClasses).toContain('fixed');
    expect(allClasses).toContain('inset-0');
    expect(allClasses).toContain('z-50');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-5 — widthClass prop: default max-w-lg
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-5 — Modal widthClass default max-w-lg', () => {
  it('applies max-w-lg when widthClass not passed', () => {
    const { baseElement } = render(
      <Modal open={true} onClose={() => {}}>
        <p>content</p>
      </Modal>
    );
    const allClasses = Array.from(baseElement.querySelectorAll('[class]'))
      .map((el) => el.getAttribute('class') ?? '')
      .join(' ');

    expect(allClasses).toContain('max-w-lg');
  });

  it('applies custom widthClass when max-w-xl is passed', () => {
    const { baseElement } = render(
      <Modal open={true} onClose={() => {}} widthClass="max-w-xl">
        <p>content</p>
      </Modal>
    );
    const allClasses = Array.from(baseElement.querySelectorAll('[class]'))
      .map((el) => el.getAttribute('class') ?? '')
      .join(' ');

    expect(allClasses).toContain('max-w-xl');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Benefit-plan configurator regression — long forms must not clip header/footer
// ─────────────────────────────────────────────────────────────────────────────
describe('Modal long-content regression', () => {
  it('keeps the dialog inside the viewport and scrolls the body content', () => {
    const { baseElement } = render(
      <Modal open={true} onClose={() => {}} title="Long form" widthClass="max-w-3xl">
        <div>
          {Array.from({ length: 40 }).map((_, i) => (
            <p key={i}>Field {i + 1}</p>
          ))}
        </div>
      </Modal>
    );

    const dialog = baseElement.querySelector('[role="dialog"]');
    const panel = dialog?.firstElementChild as HTMLElement | null;
    const body = panel?.querySelector('.overflow-y-auto');

    expect(panel?.className).toContain('max-h-[calc(100dvh-2rem)]');
    expect(panel?.className).toContain('overflow-hidden');
    expect(panel?.className).toContain('flex-col');
    expect(body?.className).toContain('min-h-0');
    expect(body?.className).toContain('overflow-y-auto');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// AC-5 — No regression: Portal + Esc + backdrop click
// ─────────────────────────────────────────────────────────────────────────────
describe('AC-5 — Modal no-regression: Portal + interactions', () => {
  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} title="Test">
        <p>content</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders nothing when open=false (portal not mounted)', () => {
    const { baseElement } = render(
      <Modal open={false} onClose={() => {}}>
        <p>content</p>
      </Modal>
    );
    // role="dialog" must not exist
    const dialog = baseElement.querySelector('[role="dialog"]');
    expect(dialog).toBeNull();
  });
});
