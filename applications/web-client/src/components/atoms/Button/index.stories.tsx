import Button from 'components/atoms/Button';
import type { ButtonProps } from 'components/atoms/Button';
import type { Story } from '@storybook/react';

export default {
  component: Button,
  title: 'Components/Atoms/Button',
};

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;

Default.args = {
  children: 'Button',
};
