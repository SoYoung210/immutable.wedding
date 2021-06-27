import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo title="wedding.log" description="소영과 재엽의 웨딩로그" />
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
