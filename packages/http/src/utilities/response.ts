import { defaultResponseCodeMap } from '@/http/utilities/http';
import type { APIResponse } from '@/http/types/api';
import type { Context } from 'hono';

export function response<T>(context: Context) {
  return ({ code, status, ...response }: APIResponse<T>) => {
    context.status(typeof code === 'number' ? code : defaultResponseCodeMap[status] ?? 500);

    return context.json({ ...response, status });
  };
}

export const exceptions = {
  BAD_DATA: 'bad data',
  INTERNAL_ERROR: 'internal error',
  INVALID_CREDENTIALS: 'invalid credentials',
  RATE_LIMITED: 'request limit exceeded',
  SERVICE_UNAVAILABLE: 'service unavailable',
  USER_EXISTS: 'user exists',
} as const;
