import 'styles/style.scss';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';

export default function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
