export function sanitiseStringValues(object: Record<string, any>) {
  const entries = Object.entries(object);

  for (const [key, value] of entries) {
    if (typeof value === 'string') {
      object[key] = value.trim();
      object[key] = object[key] !== '' ? object[key] : null;
    }

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      object[key] = sanitiseStringValues(value);
    }

    if (Array.isArray(value)) {
      object[key] = value.map((value) => {
        if (typeof value !== 'string') {
          return value;
        }

        value = value.trim();

        return value !== '' ? value : null;
      });
    }
  }

  return object;
}
