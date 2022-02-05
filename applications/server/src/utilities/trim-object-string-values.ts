export function trimObjectStringValues(object: Record<string, any>) {
  const entries = Object.entries(object);

  for (const [key, value] of entries) {
    if (typeof value === 'string') {
      object[key] = value.trim();
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      object[key] = trimObjectStringValues(value);
    }

    if (Array.isArray(value)) {
      object[key] = value.map((value) => (typeof value === 'string' ? value.trim() : value));
    }
  }

  return object;
}
