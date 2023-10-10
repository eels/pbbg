type Target<T = any> = Record<string, T>;

export function get<T = unknown>(object: Target, path: string): T {
  return path.split('.').reduce((obj, key) => obj?.[key], object) as T;
}

export function set<T>(object: Target, path: string, value: T): T | Record<string, any> {
  if (path === '') {
    return value;
  }

  const [key, next] = path.split({
    [Symbol.split](string) {
      const index = string.indexOf('.');
      const doesIndexExist = index !== -1;

      return doesIndexExist ? [string.slice(0, index), string.slice(index + 1)] : [string, ''];
    },
  });

  return Object.assign(object ?? {}, { [key]: set(object?.[key], next, value) });
}
