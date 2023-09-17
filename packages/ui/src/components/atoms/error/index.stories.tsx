import Error from '@/ui/components/atoms/error';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof Error>;

export default {
  component: Error,
  tags: ['autodocs'],
  title: 'Components/Atoms/Error',
} satisfies Meta<typeof Error>;

export const Primary: Story = {
  args: {
    children: 'Error message',
  },
};
