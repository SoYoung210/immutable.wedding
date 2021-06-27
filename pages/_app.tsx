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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </>
  );
}
export default MyApp;
