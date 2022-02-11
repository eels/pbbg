/* eslint-disable @typescript-eslint/no-var-requires */

const buildServiceWorker = require('./next.rollup.sw.config');
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

  webpack: function (config, { dev, isServer }) {
    const webpackConfig = Object.assign({}, config);

    if (!dev && !isServer) {
      buildServiceWorker();
    }

    webpackConfig.entry = async function () {
      const entries = await config.entry();

      return Object.assign({}, entries, { sw: path.join(process.cwd(), 'src/service-worker.ts') });
    };

    return webpackConfig;
  },
});
