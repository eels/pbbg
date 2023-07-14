import Input from '@/web/components/atoms/input';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof Input>;

export default {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Atoms/Input',
} satisfies Meta<typeof Input>;

export const Primary: Story = {
  args: {
    error: false,
    errorMessage: undefined,
    icon: undefined,
    label: 'Input',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    disabled: true,
    error: false,
    errorMessage: undefined,
    icon: undefined,
    label: 'Input',
  },
};

export const PrimaryWithPlaceholder: Story = {
  args: {
    error: false,
    errorMessage: undefined,
    icon: undefined,
    label: 'Input',
    placeholder: 'Placeholder',
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    error: false,
    errorMessage: undefined,
    icon: 'swords-emblem',
    label: 'Input',
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: 'Error message',
    icon: undefined,
    label: 'Input',
  },
};
