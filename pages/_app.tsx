import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { NotificationProvider } from '@components/notification/NotificationContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo title="wedding.log" description="소영과 재엽의 웨딩로그" />
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/icon_32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/assets/favicon/icon_48x48.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/favicon/icon_96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/assets/favicon/icon_144x144.png"
        />

        <meta name="theme-color" content="#ffffff" />
      </Head>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </>
  );
}
export default MyApp;
