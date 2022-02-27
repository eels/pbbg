import 'styles/style.scss';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import { description, name, theme, title } from 'resources/strings/seo';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

export default function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.asPath;

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <title>{title}</title>
        <meta name='description' content={description.join(' ')} />
        <meta name='robots' content='noindex,nofollow,noimageindex' />
        <meta name='application-name' content={name} />
        <meta name='theme-color' content={theme} />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='author' href='/humans.txt' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='apple-touch-icon' type='image/png' sizes='180x180' href='apple-icon.png' />
        <link rel='canonical' href={pathname} />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}
