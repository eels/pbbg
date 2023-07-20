import type { StringKey } from '@/web/types/strings';

export function getString(key: StringKey) {
  return (typeof window === 'undefined' ? global : window)?.nextstring?.[key];
}
