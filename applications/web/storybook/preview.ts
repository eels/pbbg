import '@/web/styles/style.scss';
import { themes } from '@storybook/theming';
import { withStorybookDecorator } from '@/web/components/utilities/storybook-decorator';
import type { Preview } from '@storybook/react';

export default {
  decorators: [withStorybookDecorator()],
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0a',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
} satisfies Preview;
