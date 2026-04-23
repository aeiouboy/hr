import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    exclude: ['**/node_modules/**', '**/e2e/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@hrms/shared/picklists': path.resolve(__dirname, '../services/shared/src/picklists/index.ts'),
      '@hrms/shared/field-catalog': path.resolve(__dirname, '../services/shared/src/field-catalog/index.ts'),
    },
  },
});
