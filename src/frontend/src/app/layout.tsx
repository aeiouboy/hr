import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-provider';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { cpnSans, cpnCondensed, anuphan, geistMono } from './fonts';

// Humi — CPN (display+body) + Anuphan (Thai fallback) + Geist Mono (numerics).
// Ref: specs/humi-frontend-redesign.md — Task 2 design system.

export const metadata: Metadata = {
 title:'Humi — Central Group HR',
 description:'ระบบบริหารทรัพยากรบุคคล Central Group (Humi)',
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html
 lang="th"
 className={`${cpnSans.variable} ${cpnCondensed.variable} ${anuphan.variable} ${geistMono.variable}`}
 suppressHydrationWarning
 >
 <head>
 <script
 dangerouslySetInnerHTML={{
 __html: `
 (function() {
 try {
 var theme = localStorage.getItem('theme');
 if (theme ==='dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
 document.documentElement.classList.add('dark');
 }
 } catch(e) {}
 })();
`,
 }}
 />
 </head>
 <body className="font-sans antialiased bg-canvas text-ink">
 <ThemeProvider>
 <AuthProvider>{children}</AuthProvider>
 </ThemeProvider>
 </body>
 </html>
 );
}
