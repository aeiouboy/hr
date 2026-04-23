import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/th/home',
        permanent: false,
      },
    ];
  },
  webpack(config) {
    // resolve @hrms/shared/* → shared lib source (no NestJS layer)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@hrms/shared/picklists': path.resolve(__dirname, '../services/shared/src/picklists/index.ts'),
      '@hrms/shared/field-catalog': path.resolve(__dirname, '../services/shared/src/field-catalog/index.ts'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
