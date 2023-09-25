import { axiosInstance } from '@/ui/utilities/axios';
import { createValidationError, extractValidationErrors } from '@/ui/utilities/validation';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { getString } from '@/ui/utilities/string';
import { pleaseTry, pleaseTryAsync } from '@pbbg/utilities/lib/try';
import { validateAuthentication } from '@pbbg/validators/lib/authentication';
import type { APIError } from '@pbbg/http/lib/types/api';
import type { ZodError } from 'zod';

export async function handleOnLogin(email?: string, password?: string) {
  const payload = {
    email: email?.toLowerCase(),
    password,
  };

  const [validationError] = pleaseTry<void, ZodError>(() => {
    validateAuthentication().parse(payload);
  });

  const [authError] = await pleaseTryAsync<never, APIError>(() => {
    if (validationError) {
      throw validationError;
    }

    return axiosInstance.post('/api/user/signin', payload);
  });

  let errorsPayload = {
    ...extractValidationErrors(validationError ?? undefined),
  };

  if (!validationError && authError?.message === exceptions.INVALID_CREDENTIALS) {
    errorsPayload = {
      ...errorsPayload,
      ...createValidationError('password', getString('auth.login.error.invalid_credentials')),
    };
  }

  if (!validationError && authError?.message === exceptions.INTERNAL_ERROR) {
    errorsPayload = {
      ...errorsPayload,
      ...createValidationError('password', getString('auth.login.error.internal_error')),
    };
  }

  return errorsPayload;
}

export async function handleOnLogout() {
  return await axiosInstance.post('/api/user/signout');
}

export function handleOnRedirect() {
  window.location.href = getString('router.application');
}

export async function handleOnRegister(email?: string, password?: string) {
  const payload = {
    email: email?.toLowerCase(),
    password,
  };

  const [validationError] = pleaseTry<void, ZodError>(() => {
    validateAuthentication({ isRegister: true }).parse(payload);
  });

  const [registerError] = await pleaseTryAsync<never, APIError>(() => {
    if (validationError) {
      throw validationError;
    }

    return axiosInstance.post('/api/user/register', payload);
  });

  const [authError] = await pleaseTryAsync<never, APIError>(() => {
    if (registerError) {
      throw registerError;
    }

    return axiosInstance.post('/api/user/signin', payload);
  });

  let errorsPayload = {
    ...extractValidationErrors(validationError ?? undefined),
  };

  if (!validationError && registerError?.message === exceptions.USER_EXISTS) {
    errorsPayload = {
      ...errorsPayload,
      ...createValidationError('email', getString('auth.register.error.user_exists')),
    };
  }

  if (!validationError && registerError?.message !== exceptions.USER_EXISTS) {
    errorsPayload = {
      ...errorsPayload,
      ...createValidationError('email', getString('auth.register.error.internal_error')),
    };
  }

  if (!validationError && authError?.message === exceptions.INTERNAL_ERROR) {
    errorsPayload = {
      ...errorsPayload,
      ...createValidationError('password', getString('auth.register.error.internal_error')),
    };
  }

  return errorsPayload;
}
