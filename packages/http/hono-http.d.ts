import type * as core from 'hono';
import type { APIResponse } from '@/http/types/api';

declare module 'hono' {
  interface Context extends core.Context {
    duration?: number;
    send: <T>(body: APIResponse<T>) => Response;
  }
}
