import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssString } from '../stitches.config';

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </body>
      </Html>
    );
  }
}
