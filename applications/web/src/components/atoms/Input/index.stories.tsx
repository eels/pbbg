import Input from 'components/atoms/Input';
import type { InputProps } from 'components/atoms/Input';
import type { Story } from '@storybook/react';

export default {
  component: Input,
  title: 'Components/Atoms/Input',
};

export const Default: Story<InputProps> = (args) => <Input {...args} />;

Default.args = {
  label: 'My Field',
  type: 'text',
};
