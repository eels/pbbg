import { defaultResponseCodeMap } from '@/web/server/utilities/http';
import type { APIResponse } from '@/web/types/api';
import type { Response } from 'express';

export function response<T>(res: Response) {
  return ({ code, status, ...response }: APIResponse<T>) => {
    res.status(code ?? defaultResponseCodeMap[status]).json({ status, ...response });
  };
}
