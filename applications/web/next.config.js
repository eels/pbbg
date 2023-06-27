/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    NEXT_PUBLIC_WEB_CLIENT_DOMAIN: process.env.APP_WEB_CLIENT_DOMAIN,
  },

  ...(process.env.NODE_ENV !== 'development' && {
    experimental: {
      optimizeCss: true,
    },
  }),

  images: {
    loader: 'custom',
  },

  reactStrictMode: true,

  swcMinify: true,
};
