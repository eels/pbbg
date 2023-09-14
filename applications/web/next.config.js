/* eslint-disable @typescript-eslint/no-var-requires */

const { createContentlayerPlugin } = require('next-contentlayer');

const configPath = '../../node_modules/@pbbg/content/contentlayer.config.ts';
const withContentlayer = createContentlayerPlugin({ configPath });

/** @type {import('next').NextConfig} */
const nextJSConfig = {
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
  transpilePackages: ['@pbbg/api', '@pbbg/http', '@pbbg/utilities', 'tailwind-compose'],
};

module.exports = withContentlayer(nextJSConfig);
