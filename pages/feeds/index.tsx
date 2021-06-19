import { Feed } from '@pages/feeds/components/feed/Feed';
import { Highlight } from '@pages/feeds/components/highlight/Highlight';

export default function Home() {
  return (
    <main className="max-w-520 min-w-320 mx-auto">
      <Highlight />
      <Feed />
    </main>
  );
}
