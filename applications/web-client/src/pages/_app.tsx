import 'styles/style.scss';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import { IS_PRODUCTION, SERVER_DOMAIN, WEB_CLIENT_DOMAIN } from 'config/constants';
import { description, name, theme, title } from 'resources/strings/seo';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.asPath.replace(/\/$/, '');

  useEffect(() => {
    if ('serviceWorker' in navigator && IS_PRODUCTION) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta content='ie=edge' httpEquiv='x-ua-compatible' />
        <meta content='width=device-width, initial-scale=1, shrink-to-fit=no' name='viewport' />
        <title>{title}</title>
        <meta content={description.join(' ')} name='description' />
        <meta content='noindex,nofollow,noimageindex' name='robots' />
        <meta content={name} name='application-name' />
        <meta content={theme} name='theme-color' />
        <link href='/site.webmanifest' rel='manifest' />
        <link href='/humans.txt' rel='author' />
        <link href='/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
        <link href='/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
        <link href='apple-icon.png' rel='apple-touch-icon' sizes='180x180' type='image/png' />
        <link href={WEB_CLIENT_DOMAIN.concat(pathname)} rel='canonical' />
        <link href={SERVER_DOMAIN} rel='prefetch' />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}
