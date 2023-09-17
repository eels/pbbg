import LoadingIndicator from '@/ui/components/molecules/loading-indicator';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof LoadingIndicator>;

export default {
  component: LoadingIndicator,
  tags: ['autodocs'],
  title: 'Components/Molecules/LoadingIndicator',
} satisfies Meta<typeof LoadingIndicator>;

export const Primary: Story = {
  args: {},
};
