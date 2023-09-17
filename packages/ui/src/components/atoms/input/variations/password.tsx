import Input from '@/ui/components/atoms/input';
import { forwardRef } from 'react';
import type { AvailableIcon } from '@/ui/types/icon';
import type { InputHTMLAttributes } from 'react';
import type { InputProps } from '@/ui/components/atoms/input';
import type { Object } from 'ts-toolbelt';

interface BasePasswordInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  icon?: AvailableIcon;
  isCurrentPassword?: boolean;
  label: string;
}

export type PasswordInputProps = Object.AtLeast<BasePasswordInput, 'id' | 'label'>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error = false, isCurrentPassword = false, ...props }, ref) => {
    const forwardedInputProps: InputProps = {
      autoComplete: isCurrentPassword ? 'current-password' : 'new-password',
      error,
      type: 'password',
      ...props,
    };

    return <Input ref={ref} {...forwardedInputProps} />;
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
