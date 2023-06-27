import Input from 'components/atoms/Input';
import { forwardRef } from 'react';
import type { InputProps } from 'components/atoms/Input';

export interface PasswordInputProps {
  error?: string;
  isCurrentPassword?: boolean;
  label: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const { error, isCurrentPassword = false, label } = props;
  const autoComplete = isCurrentPassword ? 'current-password' : 'new-password';

  const forwardedInputProps: InputProps = {
    autoComplete,
    error,
    label,
    type: 'password',
  };

  return <Input ref={ref} {...forwardedInputProps} />;
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
