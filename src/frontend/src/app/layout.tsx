import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-provider';

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
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Noto+Sans+Thai:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-cg-light text-cg-dark">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
