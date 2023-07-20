import { getString } from '@/web/utilities/string';
import { hydrate, hydrateWithJSX } from '@/web/utilities/hydrate-string';

export function useString() {
  return {
    hydrate,
    hydrateWithJSX,
    s: getString,
  };
}
