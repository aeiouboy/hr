import localFont from 'next/font/local';
import { Anuphan, Geist_Mono } from 'next/font/google';

// ════════════════════════════════════════════════════════════
// Humi — CPN (display + body) + Anuphan fallback (Thai glyph
// coverage) + Geist Mono (numerics). CPN ships with Latin only;
// Anuphan fills Thai sub-glyphs via next/font fallback stack.
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

// Anuphan = Thai-glyph fallback (CPN ships Latin only).
// ให้ browser เลือกตัวที่รองรับ glyph ได้อัตโนมัติผ่าน CSS font stack
export const anuphan = Anuphan({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-anuphan',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});
