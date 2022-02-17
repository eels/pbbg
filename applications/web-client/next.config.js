/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
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
};
