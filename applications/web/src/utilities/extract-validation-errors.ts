import type { FormErrors } from 'types/form-error';
import type { ValidationError } from 'yup';

export function extractValidationErrors(error?: ValidationError) {
  if (!error) {
    return {};
  }

  return error?.inner.reduce<FormErrors>((errors, error) => {
    if (!error.path) {
      return errors;
    }

    return {
      ...errors,
      [error.path]: { field: error.path, message: error.message },
    };
  }, {});
}
