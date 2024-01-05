import Break from '@/ui/components/atoms/break';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof Break>;

export default {
  component: Break,
  tags: ['autodocs'],
  title: 'Components/Atoms/Break',
} satisfies Meta<typeof Break>;

export const Primary: Story = {};
