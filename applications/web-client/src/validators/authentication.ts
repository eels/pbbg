import { object, string } from 'yup';
import type { TFunction } from 'next-i18next';

export function AuthLoginValidator(t: TFunction) {
  return object({
    email: string().email(t('auth:error.email.invalid')).required(t('auth:error.email.required')),
    password: string().required(t('auth:error.password.required')),
  });
}
