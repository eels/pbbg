/* eslint-disable sonarjs/cognitive-complexity */

import { getAllIconsAsSymbols } from '@/ui/services/icons';
import type { RuleSetRule } from 'webpack';
import type { StorybookConfig } from '@storybook/nextjs';

export default {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require.resolve('postcss'),
        },
      },
    },
  ],
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: [
    {
      from: '../../../assets/favicons',
      to: 'favicons',
    },
    {
      from: '../../../assets/fonts',
      to: 'fonts',
    },
  ],
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(ts|tsx)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      shouldExtractLiteralValuesFromEnum: false,
    },
  },
  async webpackFinal(config, { presets }) {
    const webpack: any = await presets.apply('webpackInstance');
    const icons = getAllIconsAsSymbols();

    for (const rule of config.module?.rules ?? []) {
      const rr = rule as RuleSetRule;
      const test = rr.test?.toString();

      if (test && ['/\\.css$/', '/\\.s[ac]ss$/'].includes(test) && Array.isArray(rr.use)) {
        rr.use = rr.use?.map((entry) => {
          if (entry && typeof entry === 'object' && 'loader' in entry) {
            if (entry?.loader?.toString().includes('/css-loader/')) {
              entry.options = entry.options ?? {};

              if (typeof entry.options !== 'string') {
                entry.options.url = false;
              }
            }
          }

          return entry;
        });
      }
    }

    config.plugins?.push(
      new webpack.DefinePlugin({
        'process.env.STATIC_ICONS': JSON.stringify(icons),
      }),
    );

    return config;
  },
} satisfies StorybookConfig;
