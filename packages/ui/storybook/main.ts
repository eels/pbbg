import { getAllIconsAsSymbols } from '@/ui/services/icons';
import type { StorybookConfig } from '@storybook/nextjs';

export default {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
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
  staticDirs: [{ from: '../src/resources/fonts', to: 'src/resources/fonts' }],
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

    config.plugins?.push(
      new webpack.DefinePlugin({
        'process.env.STATIC_ICONS': JSON.stringify(icons),
      }),
    );

    return config;
  },
} satisfies StorybookConfig;
