import { Feed } from '@pages/feeds/components/feed/Feed';
import { Highlight } from '@pages/feeds/components/highlight/Highlight';
import { Header } from '@pages/feeds/components/header/Header';

export default function Home() {
  return (
    <main className="relative max-w-520 min-w-320 mx-auto">
      <Header />
      <Highlight />
      <Feed />
    </main>
  );
}
