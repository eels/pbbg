/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_PUBLIC_WEB_CLIENT_DOMAIN: process.env.APP_WEB_CLIENT_DOMAIN,
  },
  experimental: {
    optimizeCss: process.env.NODE_ENV !== 'development',
  },
  images: {
    loader: 'custom',
  },
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@pbbg/http', 'tailwind-compose'],
};
