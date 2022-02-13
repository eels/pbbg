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

  webpack: function (config) {
    const webpackConfig = Object.assign({}, config);

    webpackConfig.entry = async function () {
      const entries = await config.entry();

      return Object.assign({}, entries, { sw: path.join(process.cwd(), 'src/service-worker.ts') });
    };

    return webpackConfig;
  },
});
