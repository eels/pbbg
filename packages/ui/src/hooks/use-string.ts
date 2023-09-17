import { getString } from '@/ui/utilities/string';
import { hydrate, hydrateWithJSX } from '@pbbg/utilities/lib/hydrate-string';

export function useString() {
  return {
    hydrate,
    hydrateWithJSX,
    s: getString,
  };
}
