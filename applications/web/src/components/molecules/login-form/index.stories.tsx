import LoginForm from '@/web/components/molecules/login-form';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof LoginForm>;

export default {
  component: LoginForm,
  tags: ['autodocs'],
  title: 'Components/Molecules/LoginForm',
} satisfies Meta<typeof LoginForm>;

export const Primary: Story = {
  args: {},
};
