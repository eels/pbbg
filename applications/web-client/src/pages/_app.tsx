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
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='robots' content='noindex,nofollow,noimageindex' />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}
