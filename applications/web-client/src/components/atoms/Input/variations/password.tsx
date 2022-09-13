import Input from 'components/atoms/Input';
import { forwardRef } from 'react';

export interface PasswordInputProps {
  isCurrentPassword?: boolean;
  label: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { isCurrentPassword = false, label } = props;
  const autoComplete = isCurrentPassword ? 'current-password' : 'new-password';

  return <Input ref={ref} autoComplete={autoComplete} label={label} type='password' />;
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
