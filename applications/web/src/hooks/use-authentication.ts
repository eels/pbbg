import { createValidationError, extractValidationErrors } from '@/web/utilities/validation';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { pleaseTry, pleaseTryAsync } from '@pbbg/utilities/lib/try';
import { signIn, signOut } from 'next-auth/react';
import { useString } from '@/web/hooks/use-string';
import { validateAuthLogin } from '@/web/validators/authentication';
import type { ZodError } from 'zod';

export function useAuthentication() {
  const { s } = useString();

  return {
    handleOnRedirect: () => {
      window.location.href = s('router.application');
    },
    handleOnSignIn: async (email?: string, password?: string) => {
      const payload = {
        email: email?.toLowerCase(),
        password,
      };

      const [validationError] = pleaseTry(() => {
        return validateAuthLogin().parse(payload);
      });

      const [authError, response] = await pleaseTryAsync(async () => {
        if (validationError) {
          throw validationError;
        }

        return await signIn('credentials', {
          ...payload,
          redirect: false,
        });
      });

      let errorsPayload = {
        ...extractValidationErrors(validationError as ZodError),
      };

      if (!validationError && !authError && response?.error === exceptions.INVALID_CREDENTIALS) {
        errorsPayload = {
          ...errorsPayload,
          ...createValidationError('password', s('auth.login.error.invalid_credentials')),
        };
      }

      if (!validationError && (authError || response?.error === exceptions.INTERNAL_ERROR)) {
        errorsPayload = {
          ...errorsPayload,
          ...createValidationError('password', s('auth.login.error.internal_error')),
        };
      }

      return errorsPayload;
    },
    handleOnSignOut: async () => {
      await signOut({
        redirect: false,
      });
    },
  };
}
