export function createValidationError(field: string, message: string) {
  return {
    [field]: {
      field,
      message,
    },
  };
}
