import Input from 'components/atoms/Input';
import { forwardRef } from 'react';

import type { InputProps } from 'components/atoms/Input';

export interface EmailInputProps {
  error?: string;
  label: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const { error, label } = props;

  const forwardedInputProps: InputProps = {
    autoComplete: 'email',
    error,
    label,
    type: 'email',
  };

  return <Input ref={ref} {...forwardedInputProps} />;
});

EmailInput.displayName = 'EmailInput';

export default EmailInput;
