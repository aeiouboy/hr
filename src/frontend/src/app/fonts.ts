import localFont from 'next/font/local';

// ════════════════════════════════════════════════════════════
// Humi — CPN (display + body) + Thai/system fallback + mono numerics.
// Ref: specs/humi-frontend-redesign.md — Task 2 design system.
// ════════════════════════════════════════════════════════════

export const cpnSans = localFont({
  src: [
    { path: '../../public/fonts/cpn/CPN-Light.otf',         weight: '300', style: 'normal' },
    { path: '../../public/fonts/cpn/CPN-LightItalic.otf',   weight: '300', style: 'italic' },
    { path: '../../public/fonts/cpn/CPN-Regular.otf',       weight: '400', style: 'normal' },
    { path: '../../public/fonts/cpn/CPN-Italic.otf',        weight: '400', style: 'italic' },
    { path: '../../public/fonts/cpn/CPN-Bold.otf',          weight: '700', style: 'normal' },
    { path: '../../public/fonts/cpn/CPN-BoldItalic.otf',    weight: '700', style: 'italic' },
  ],
  variable: '--font-cpn',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const cpnCondensed = localFont({
  src: [
    { path: '../../public/fonts/cpn/CPN-Condensed.otf',     weight: '400', style: 'normal' },
    { path: '../../public/fonts/cpn/CPN-BoldCondensed.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-cpn-condensed',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

// Offline-safe fallbacks. next/font/google fetches at build time, which makes
// production builds depend on external network access.
export const anuphan = {
  variable: 'font-fallback-anuphan',
};

export const geistMono = {
  variable: 'font-fallback-geist-mono',
};
