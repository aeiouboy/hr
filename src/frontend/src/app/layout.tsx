import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-provider';
import { ThemeProvider } from '@/components/shared/theme-provider';

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
    <html lang="en" suppressHydrationWarning>
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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans+Thai:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-cg-light dark:bg-gray-950 text-cg-dark dark:text-gray-100">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
