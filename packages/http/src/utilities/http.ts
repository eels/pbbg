import type { Status } from '@/http/types/api';

export const defaultResponseCodeMap: Record<Status, number> = {
  ERROR: 500,
  FAIL: 400,
  SUCCESS: 200,
} as const;
