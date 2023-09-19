import type { StringKey } from '@/ui/types/strings';

export function getString(key: StringKey) {
  return (typeof window === 'undefined' ? global : window)?.pbbgstring?.[key];
}
