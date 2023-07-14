import Input from '@/web/components/atoms/input';
import { forwardRef } from 'react';
import type { AvailableIcon } from '@/web/types/icon';
import type { InputHTMLAttributes } from 'react';
import type { InputProps } from '@/web/components/atoms/input';
import type { Object } from 'ts-toolbelt';

interface BaseEmailInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  icon?: AvailableIcon;
  label: string;
}

export type EmailInputProps = Object.AtLeast<BaseEmailInput, 'id' | 'label'>;

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ error = false, ...props }, ref) => {
    const forwardedInputProps: InputProps = {
      autoComplete: 'email',
      error,
      type: 'email',
      ...props,
    };

    return <Input ref={ref} {...forwardedInputProps} />;
  },
);

EmailInput.displayName = 'EmailInput';

export default EmailInput;
