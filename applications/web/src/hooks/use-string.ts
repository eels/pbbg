import { getString } from '@/web/utilities/string';
import { hydrate, hydrateWithJSX } from '@pbbg/utilities/lib/hydrate-string';

export function useString() {
  return {
    hydrate,
    hydrateWithJSX,
    s: getString,
  };
}
