import '@/web/styles/style.scss';
import { themes } from '@storybook/theming';
import { withThemeByClassName } from '@storybook/addon-styling';

/** @type { import('@storybook/react').Preview } */
export default {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: 'dark',
      themes: {
        dark: 'dark',
        light: 'light',
      },
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      theme: themes.dark,
    },
  },
};
