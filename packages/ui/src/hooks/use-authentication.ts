import { axiosInstance } from '@/ui/utilities/axios';
import { createValidationError, extractValidationErrors } from '@/ui/utilities/validation';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { pleaseTry, pleaseTryAsync } from '@pbbg/utilities/lib/try';
import { signIn, signOut } from 'next-auth/react';
import { useString } from '@/ui/hooks/use-string';
import { validateAuthentication } from '@pbbg/validators/lib/authentication';
import type { APIError } from '@pbbg/http/lib/types/api';
import type { ZodError } from 'zod';

export function useAuthentication() {
  const { s } = useString();

  return {
    handleOnLogin: async (email?: string, password?: string) => {
      const payload = {
        email: email?.toLowerCase(),
        password,
      };

      const [validationError] = pleaseTry(() => {
        return validateAuthentication().parse(payload);
      });

      const [authError, response] = await pleaseTryAsync(async () => {
        if (validationError) {
          throw validationError;
        }

        return await signIn('credentials', { ...payload, redirect: false });
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
    handleOnLogout: async () => {
      await signOut({
        redirect: false,
      });
    },
    handleOnRedirect: () => {
      window.location.href = s('router.application');
    },
    handleOnRegister: async (email?: string, password?: string) => {
      const payload = {
        email: email?.toLowerCase(),
        password,
      };

      const [validationError] = pleaseTry(() => {
        return validateAuthentication({ isRegister: true }).parse(payload);
      });

      const [registerError] = await pleaseTryAsync<never, APIError>(async () => {
        if (validationError) {
          throw validationError;
        }

        return await axiosInstance.post('/api/user/register', payload);
      });

      const [authError, response] = await pleaseTryAsync(async () => {
        if (registerError) {
          throw registerError;
        }

        return await signIn('credentials', { ...payload, redirect: false });
      });

      let errorsPayload = {
        ...extractValidationErrors(validationError as ZodError),
      };

      const registerErrorMessage = registerError?.response?.data?.message;

      if (!validationError && registerErrorMessage === exceptions.USER_EXISTS) {
        errorsPayload = {
          ...errorsPayload,
          ...createValidationError('email', s('auth.register.error.user_exists')),
        };
      }

      if (!validationError && registerError && registerErrorMessage !== exceptions.USER_EXISTS) {
        errorsPayload = {
          ...errorsPayload,
          ...createValidationError('email', s('auth.register.error.internal_error')),
        };
      }

      if (!validationError && (authError || response?.error === exceptions.INTERNAL_ERROR)) {
        errorsPayload = {
          ...errorsPayload,
          ...createValidationError('password', s('auth.register.error.internal_error')),
        };
      }

      return errorsPayload;
    },
  };
}
