'use client';

import * as Styled from '@/web/components/molecules/registration-form/styled';
import Button from '@/web/components/atoms/button';
import EmailInput from '@/web/components/atoms/input/variations/email';
import PasswordInput from '@/web/components/atoms/input/variations/password';
import { useRef, useState } from 'react';
import { useString } from '@/web/hooks/use-string';
import type { FormErrors } from '@/web/types/forms';
import type { FormEvent } from 'react';

export interface RegistrationFormProps {
  onRedirect?: () => void;
  onRegister?: (email?: string, password?: string) => Promise<FormErrors>;
}

export default function RegistrationForm({
  onRedirect: handleOnRedirect,
  onRegister: handleOnRegister,
}: RegistrationFormProps) {
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
    const response = (await handleOnRegister?.(email, password)) || {};

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
        id='register.email'
        label={s('auth.register.email.label')}
        placeholder={s('auth.register.email.placeholder')}
      />
      <PasswordInput
        ref={passwordRef}
        error={errors.password?.message !== undefined}
        errorMessage={errors.password?.message}
        icon='lock'
        id='register.password'
        label={s('auth.register.password.label')}
        placeholder={s('auth.register.password.placeholder')}
        isCurrentPassword
      />
      <Button className='mt-2' processing={isProcessing} type='submit'>
        {s('auth.register.submit')}
      </Button>
    </Styled.Wrapper>
  );
}
