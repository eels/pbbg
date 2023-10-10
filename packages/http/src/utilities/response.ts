import { defaultResponseCodeMap } from '@/http/utilities/http';
import { get, set } from '@pbbg/utilities/lib/object';
import type { APIResponse } from '@/http/types/api';
import type { Context } from 'hono';

export function response<T>(context: Context) {
  return ({ code, status, ...response }: APIResponse<T>) => {
    const fields = context.req.query('fields')?.split(',');
    const data = {};

    context.status(typeof code === 'number' ? code : defaultResponseCodeMap[status] ?? 500);

    if (typeof fields !== 'undefined' && 'data' in response) {
      for (const path in fields) {
        set<unknown>(data, path, get(response.data as Record<string, unknown>, path));
      }

      response.data = data as T;
    }

    return context.json({ ...response, status });
  };
}

export const exceptions = {
  BAD_DATA: 'bad data',
  FORBIDDEN: 'forbidden',
  INTERNAL_ERROR: 'internal error',
  INVALID_CREDENTIALS: 'invalid credentials',
  RATE_LIMITED: 'request limit exceeded',
  SERVICE_UNAVAILABLE: 'service unavailable',
  UNAUTHENTICATED: 'unauthenticated',
  USER_EXISTS: 'user exists',
} as const;
