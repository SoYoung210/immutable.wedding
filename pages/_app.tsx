import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import { NotificationProvider } from '@components/notification/NotificationContext';
import { styled } from 'stitches.config';

import smoothscroll from 'smoothscroll-polyfill';
import '../styles/globals.css';

const Main = styled('main', {
  position: 'relative',
  maxWidth: 520,
  minWidth: 320,
  minHeight: '100vh',
  mx: 'auto',
  backgroundColor: '$white',
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <>
      <NextSeo title="wedding.log" description="소영과 재엽의 웨딩로그" />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotificationProvider>
        <AnimateSharedLayout type="crossfade">
          <Main>
            <Component {...pageProps} />
          </Main>
        </AnimateSharedLayout>
      </NotificationProvider>
    </>
  );
}
export default MyApp;
