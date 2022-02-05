export function convertEmptyObjectStringValuesToNull(object: Record<string, any>) {
  const entries = Object.entries(object);

  for (const [key, value] of entries) {
    if (typeof value === 'string' && value === '') {
      object[key] = null;
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      object[key] = convertEmptyObjectStringValuesToNull(value);
    }

    if (Array.isArray(value)) {
      object[key] = value.map((value) => (typeof value === 'string' ? null : value));
    }
  }

  return object;
}
