import { getString } from '@/ui/utilities/string';
import { hydrate } from '@pbbg/utilities/lib/hydrate-string';

export function decorateSEOMetaTitle(title: string) {
  return hydrate(getString('general.seo.title.template'), [title]);
}
