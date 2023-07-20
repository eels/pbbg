import { defaultResponseCodeMap } from '@/http/utilities/http';
import type { APIResponse } from '@/http/types/api';
import type { Response } from 'express';

export function response<T>(res: Response) {
  return ({ code, status, ...response }: APIResponse<T>) => {
    res.status(typeof code === 'number' ? code : defaultResponseCodeMap[status] ?? 500);
    res.json({ status, ...response });
  };
}

export const exceptions = {
  INTERNAL_ERROR: 'internal error',
  INVALID_CREDENTIALS: 'invalid credentials',
} as const;
