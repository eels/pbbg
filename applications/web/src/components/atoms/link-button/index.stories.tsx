import LinkButton from '@/web/components/atoms/link-button';
import type { Meta, StoryObj } from '@storybook/react';

export type Story = StoryObj<typeof LinkButton>;

export default {
  component: LinkButton,
  tags: ['autodocs'],
  title: 'Components/Atoms/LinkButton',
} satisfies Meta<typeof LinkButton>;

export const Primary: Story = {
  args: {
    alert: undefined,
    children: 'Button',
    href: '#',
    icon: undefined,
    secondary: undefined,
  },
};

export const PrimaryWithIcon: Story = {
  args: {
    alert: undefined,
    children: 'Button',
    href: '#',
    icon: 'swords-emblem',
    secondary: undefined,
  },
};

export const Secondary: Story = {
  args: {
    alert: undefined,
    children: 'Button',
    href: '#',
    icon: undefined,
    secondary: true,
  },
};

export const Alert: Story = {
  args: {
    alert: true,
    children: 'Button',
    href: '#',
    icon: undefined,
    secondary: undefined,
  },
};
