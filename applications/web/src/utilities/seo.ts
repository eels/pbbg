import { getString } from '@/web/utilities/string';
import { hydrate } from '@/web/utilities/hydrate-string';

export function decorateSEOMetaTitle(title: string) {
  return hydrate(getString('general.seo.title.template'), [title]);
}
