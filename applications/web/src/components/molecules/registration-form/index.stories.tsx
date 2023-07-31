import RegistrationForm from '@/web/components/molecules/registration-form';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof RegistrationForm>;

export default {
  component: RegistrationForm,
  tags: ['autodocs'],
  title: 'Components/Molecules/RegistrationForm',
} satisfies Meta<typeof RegistrationForm>;

export const Primary: Story = {
  args: {},
};
