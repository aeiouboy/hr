import'@testing-library/jest-dom';

// jsdom polyfill: HTMLDialogElement methods (used by EffectiveDateGate via Modal)
if (typeof HTMLDialogElement !== 'undefined') {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', 'true');
    };
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open');
    };
  }
}

// jsdom polyfill: window.matchMedia (used by AppShell to auto-close mobile
// drawer when viewport crosses lg breakpoint). jsdom doesn't implement
// matchMedia at all — without this stub every AppShell mount throws.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  } as unknown as MediaQueryList);
}
