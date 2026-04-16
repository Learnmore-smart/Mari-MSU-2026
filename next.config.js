/** @type {import('next').NextConfig} */

const basePath = '/mari-msu-2026';
const nextConfig = {
  basePath,
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