'use client';

import { useEffect, useState } from 'react';
import { useUIStore } from '@/stores/ui-store';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

export function useTheme() {
  const { theme, setTheme } = useUIStore();
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

  useEffect(() => {
    if (theme !== 'system') {
      setResolvedTheme(theme as ResolvedTheme);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setResolvedTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  return { theme: theme as Theme, resolvedTheme, setTheme };
}
