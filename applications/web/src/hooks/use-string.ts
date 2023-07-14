import type { StringKey } from '@/web/types/strings';

export function useString() {
  return {
    s: (key: StringKey) => {
      return (typeof window === 'undefined' ? global : window)?.nextstring?.[key];
    },
  };
}
