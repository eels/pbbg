import { defaultResponseCodeMap } from '@/http/utilities/http';
import type { APIResponse } from '@/http/types/api';
import type { Response } from 'express';

export function response<T>(res: Response) {
  return ({ code, status, ...response }: APIResponse<T>) => {
    res.status(code ?? defaultResponseCodeMap[status]).json({ status, ...response });
  };
}
