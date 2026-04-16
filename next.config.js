/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/mari-msu-2026',
  assetPrefix: '/mari-msu-2026',

  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000/mari-msu-2026',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
