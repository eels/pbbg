import type { Status } from '@/web/types/api';

export const defaultResponseCodeMap: Record<Status, number> = {
  ERROR: 500,
  FAIL: 400,
  SUCCESS: 200,
} as const;

export const validHTTPRequestMethods = [
  'all',
  'delete',
  'get',
  'head',
  'options',
  'patch',
  'post',
  'put',
] as const;
