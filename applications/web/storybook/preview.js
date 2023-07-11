import '@/web/styles/style.scss';
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
      defaultTheme: 'light',
      themes: {
        dark: 'dark',
        light: 'light',
      },
    }),
  ],
};
