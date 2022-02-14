/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const withPurgeCSSModules = require('next-purge-css-modules');

module.exports = withPurgeCSSModules({
  purgeCSSModules: {
    content: path.join(process.cwd(), 'src/**/*.{ts,tsx}'),
    enableDevPurge: false,
  },

  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
    prependData: `@import '${path.join(process.cwd(), 'src/styles/shared')}';`,
  },

  swcMinify: true,
});
