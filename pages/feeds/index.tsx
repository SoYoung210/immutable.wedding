import { Feed } from './components/feed/Feed';
import { Highlight } from './components/highlight/Highlight';

export default function Home() {
  return (
    <main className="max-w-520 min-w-320 mx-auto">
      <Highlight />
      <Feed />
    </main>
  );
}
