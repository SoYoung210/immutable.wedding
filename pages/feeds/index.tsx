import { Feed } from '@pages/feeds/components/feed/Feed';
import { Highlight } from '@pages/feeds/components/highlight/Highlight';
import { Header } from '@pages/feeds/components/header/Header';
import { styled } from 'stitches.config';

const Main = styled('main', {
  position: 'relative',
  maxWidth: 520,
  minWidth: 320,
  mx: 'auto',
});

export default function Home() {
  return (
    <Main>
      <Header />
      <Highlight />
      <Feed />
    </Main>
  );
}
