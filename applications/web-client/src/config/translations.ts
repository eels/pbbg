import i18next from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

type StaticProps<T> = GetStaticPropsResult<T> & { props?: T };

export async function withTranslations<T>(locale?: string, props?: StaticProps<T>) {
  return Object.assign({}, props, {
    props: {
      ...('props' in (props! || {}) ? props?.props : {}),
      ...(await serverSideTranslations(locale ?? i18next.i18n.defaultLocale)),
    },
  });
}

export function withTranslatedPaths(paths: GetStaticPathsResult) {
  return Object.assign({}, paths, {
    paths: i18next.i18n.locales.reduce<GetStaticPathsResult['paths']>((output, locale) => {
      return [
        ...output,
        ...paths.paths.map((path) => (typeof path === 'string' ? path : { ...path, locale })),
      ];
    }, []),
  });
}
