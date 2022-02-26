import 'styles/style.scss';
import Head from 'next/head';
import { Fragment, useEffect } from 'react';
import type { AppProps } from 'next/app';

export default function CustomApp({ Component, pageProps }: AppProps) {
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
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta name='robots' content='noindex,nofollow,noimageindex' />
        <meta name='application-name' content='Aethelm' />
        <meta name='theme-color' content='#111111' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='apple-touch-icon' type='image/png' sizes='180x180' href='apple-icon.png' />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}
