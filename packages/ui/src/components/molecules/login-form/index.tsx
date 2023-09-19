import * as Styled from '@/ui/components/molecules/login-form/styled';
import Button from '@/ui/components/atoms/button';
import EmailInput from '@/ui/components/atoms/input/variations/email';
import PasswordInput from '@/ui/components/atoms/input/variations/password';
import { useRef, useState } from 'react';
import { useString } from '@/ui/hooks/use-string';
import type { FormErrors } from '@/ui/types/forms';
import type { FormEvent } from 'react';

export interface LoginFormProps {
  onLogin?: (email?: string, password?: string) => Promise<FormErrors>;
  onRedirect?: () => void;
}

export default function LoginForm({
  onLogin: handleOnLogin,
  onRedirect: handleOnRedirect,
}: LoginFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const { s } = useString();

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsProcessing(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const response = (await handleOnLogin?.(email, password)) || {};

    setErrors(response);

    if (Object.keys(response).length === 0) {
      handleOnRedirect?.();
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <Styled.Wrapper noValidate onSubmit={handleOnSubmit}>
      <EmailInput
        ref={emailRef}
        error={errors.email?.message !== undefined}
        errorMessage={errors.email?.message}
        icon='envelope'
        id='login.email'
        label={s('auth.login.email.label')}
        placeholder={s('auth.login.email.placeholder')}
      />
      <PasswordInput
        ref={passwordRef}
        error={errors.password?.message !== undefined}
        errorMessage={errors.password?.message}
        icon='lock'
        id='login.password'
        label={s('auth.login.password.label')}
        placeholder={s('auth.login.password.placeholder')}
        isCurrentPassword
      />
      <Button className='mt-2' processing={isProcessing} type='submit'>
        {s('auth.login.submit')}
      </Button>
    </Styled.Wrapper>
  );
}
