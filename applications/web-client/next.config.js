const buildServiceWorker = require('./next.rollup.sw.config');
const path = require('path');
const withPurgeCSSModules = require('next-purge-css-modules');

module.exports = withPurgeCSSModules({
  purgeCSSModules: {
    content: path.join(__dirname, 'src/**/*.{ts,tsx}'),
    enableDevPurge: false,
  },

  reactStrictMode: true,

  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
    prependData: `@import '${__dirname}/src/styles/shared';`,
  },

  swcMinify: true,

  webpack: function (config, { dev, isServer }) {
    const webpackConfig = Object.assign({}, config);

    if (!dev && !isServer) {
      buildServiceWorker();
    }

    webpackConfig.entry = async function () {
      const entries = await config.entry();

      return Object.assign({}, entries, { sw: './src/service-worker.ts' });
    };

    return webpackConfig;
  },
});
