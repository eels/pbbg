import Input from 'components/atoms/Input';
import { forwardRef } from 'react';

export interface EmailInputProps {
  label: string;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const { label } = props;

  return <Input ref={ref} autoComplete='email' label={label} type='email' />;
});

EmailInput.displayName = 'EmailInput';

export default EmailInput;
