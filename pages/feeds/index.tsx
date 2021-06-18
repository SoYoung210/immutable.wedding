import { Feed } from './components/feed/Feed';
import { Story } from './components/story/Story';

export default function Home() {
  return (
    <main className="max-w-520 min-w-320 mx-auto">
      <Story />
      <Feed />
    </main>
  );
}
