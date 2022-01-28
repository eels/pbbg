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
});
