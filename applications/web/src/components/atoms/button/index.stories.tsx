import Button from '@/web/components/atoms/button';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof Button>;

export default {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Atoms/Button',
} satisfies Meta<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const PrimaryProcessing: Story = {
  args: {
    children: 'Button',
    processing: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    secondary: true,
  },
};

export const Error: Story = {
  args: {
    children: 'Button',
    error: true,
  },
};
