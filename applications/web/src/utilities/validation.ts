import type { FormErrors } from '@/web/types/forms';
import type { ZodError } from 'zod';

export function createValidationError(field: string, message: string) {
  return {
    [field]: {
      field,
      message,
    },
  };
}

export function extractValidationErrors(error?: ZodError) {
  if (!error) {
    return {};
  }

  return error?.errors?.reduce<FormErrors>((errors, error) => {
    if (!error.path) {
      return errors;
    }

    return {
      ...errors,
      [error.path.join('.')]: { field: error.path.join('.'), message: error.message },
    };
  }, {});
}
