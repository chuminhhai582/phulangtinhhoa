import createNextIntlPlugin from 'next-intl/plugin';
import withSerwistInit from '@serwist/next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjs.org',
      },
    ],
  },
};

export default withSerwist(withNextIntl(nextConfig));
