import FeedSection from 'pages/section/FeedSection';
import StorySection from 'pages/section/StorySection';
import Head from 'next/head';
import React from 'react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>wedding.log</title>
        <meta name="description" content="소영과 재엽의 웨딩로그" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-520 min-w-320 mx-auto">
        <StorySection />
        <FeedSection />
      </main>
    </div>
  );
}
