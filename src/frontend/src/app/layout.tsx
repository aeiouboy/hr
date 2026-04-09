import type { Metadata } from 'next';
import { Anuphan, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-provider';
import { ThemeProvider } from '@/components/shared/theme-provider';

// Precision Cool — Anuphan (display+body+Thai) + Geist Mono (numerics only).
// Ref: aeiouboy/stark#1180 Forge Lead decision matrix.
const anuphan = Anuphan({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  variable: '--font-anuphan',
  display: 'swap',
});

const geistMono = Geist_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Central Retail HRMS',
  description: 'Next-Generation Human Resource Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anuphan.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
