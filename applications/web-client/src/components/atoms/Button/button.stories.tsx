import Button from 'components/atoms/Button';
import type { ButtonProps } from 'components/atoms/Button';

export default {
  component: Button,
  title: 'Components/Atoms/Button',
};

export const Default = (args: ButtonProps) => <Button {...args} />;

Default.args = {
  copy: 'Button',
};
