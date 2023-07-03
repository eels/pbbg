import type * as core from 'express-serve-static-core';
import type { APIResponse } from '@/http/types/api';
import type { NextApiRequest, NextApiResponse } from 'next';

declare module 'express-serve-static-core' {
  interface Express extends core.Express {
    handle: (req: NextApiRequest, res: NextApiResponse) => void;
  }

  interface Response extends core.Response {
    duration?: number;
    respond: <T>(response: APIResponse<T>) => void;
  }
}
