/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],

  core: {
    builder: 'webpack5',
  },

  framework: '@storybook/react',

  staticDirs: ['../public'],

  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],

  webpackFinal: async (config) => {
    config.resolve.modules.push(path.resolve(process.cwd(), 'src'));

    return config;
  },
};
