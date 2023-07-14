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
    alert: undefined,
    children: 'Button',
    icon: undefined,
    processing: undefined,
    secondary: undefined,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    alert: undefined,
    children: 'Button',
    disabled: true,
    icon: undefined,
    processing: undefined,
    secondary: undefined,
  },
};

export const PrimaryProcessing: Story = {
  args: {
    alert: undefined,
    children: 'Button',
    icon: undefined,
    processing: true,
    secondary: undefined,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    alert: undefined,
    children: 'Button',
    icon: 'swords-emblem',
    processing: undefined,
    secondary: undefined,
  },
};

export const Secondary: Story = {
  args: {
    alert: undefined,
    children: 'Button',
    icon: undefined,
    processing: undefined,
    secondary: true,
  },
};

export const Alert: Story = {
  args: {
    alert: true,
    children: 'Button',
    icon: undefined,
    processing: undefined,
    secondary: undefined,
  },
};
