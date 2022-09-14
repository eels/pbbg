import Button from 'components/atoms/Button';
import EmailInput from 'components/atoms/Input/variations/email';
import Form from 'components/atoms/Form';
import PasswordInput from 'components/atoms/Input/variations/password';
import { AuthLoginValidator } from 'validators/authentication';
import { createValidationError } from 'utilities/create-validation-error';
import { extractValidationErrors } from 'utilities/extract-validation-errors';
import { useRef, useState } from 'react';
import { useResourceString } from 'hooks/use-resource-string';
import { useTryAsync } from 'no-try';
import type { FormErrors } from 'types/form-error';
import type { FormEvent } from 'react';
import type { ValidationError } from 'yup';

export interface LoginFormProps {
  handleLogin: (payload: Record<string, any>) => Promise<void>;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
  const { t } = useResourceString();
  const [errors, setErrors] = useState<FormErrors>({});

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = {
      email: email?.current?.value,
      password: password?.current?.value,
    };

    const [validationError] = await useTryAsync(() => {
      return AuthLoginValidator(t).validate(payload, { abortEarly: false });
    });

    const [authError] = await useTryAsync(() => {
      if (validationError) {
        throw validationError;
      }

      return handleLogin(payload);
    });

    const hasNotFoundError = validationError === null && authError !== null;

    setErrors({
      ...(hasNotFoundError && createValidationError('email', t('auth:error.email.not_found'))),
      ...extractValidationErrors(validationError as ValidationError),
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <EmailInput
        ref={email}
        error={errors.email?.message}
        label={t('auth:form.login.field.email')}
      />
      <PasswordInput
        ref={password}
        error={errors.password?.message}
        label={t('auth:form.login.field.password')}
      />
      <Button>{t('auth:form.login.button.submit')}</Button>
    </Form>
  );
}
