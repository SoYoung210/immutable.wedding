import { NotificationProvider } from '@components/notification/NotificationContext';
import { PortalProvider } from '@providers/PortalProvider';
import { AnimateSharedLayout } from 'framer-motion';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { styled } from 'stitches.config';
import { SWRConfig } from 'swr';
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
      <SWRConfig
        value={{
          suspense: true,
        }}
      ></SWRConfig>
      <NextSeo title="wedding.log" description="소영과 재엽의 웨딩로그" />
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon/icon_36x36.png"
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

        <meta name="theme-color" content="#0135DB" />
      </Head>
      <NotificationProvider>
        <PortalProvider>
          <AnimateSharedLayout type="crossfade">
            <Main>
              <Component {...pageProps} />
            </Main>
          </AnimateSharedLayout>
        </PortalProvider>
      </NotificationProvider>
    </>
  );
}
export default MyApp;
