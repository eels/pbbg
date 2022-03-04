/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const withPurgeCSSModules = require('next-purge-css-modules');
const { config } = require('dotenv');

const environment = config({ path: path.resolve('../../', '.env') });

module.exports = withPurgeCSSModules({
  env: {
    NEXT_PUBLIC_SERVER_DOMAIN: environment?.parsed?.APP_SERVER_DOMAIN,
    NEXT_PUBLIC_WEB_CLIENT_DOMAIN: environment?.parsed?.APP_WEB_CLIENT_DOMAIN,
  },

  experimental: {
    optimizeCss: true,
  },

  images: {
    loader: 'custom',
  },

  purgeCSSModules: {
    content: path.join(process.cwd(), 'src/**/*.{ts,tsx}'),
    enableDevPurge: false,
    safelist: ['html', 'li', 'ul', '[data-reactroot]'],
  },

  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
    prependData: `@import '${path.join(process.cwd(), 'src/styles/shared')}';`,
  },

  swcMinify: true,
});
