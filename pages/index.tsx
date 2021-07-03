import { Feed } from '@pages/feeds/components/feed/Feed';
import { Header } from '@pages/feeds/components/header/Header';
import { Highlight } from '@pages/feeds/components/highlight/Highlight';
import { InferGetStaticPropsType } from 'next';
import { getPlaiceholder } from 'plaiceholder';
import { styled } from 'stitches.config';

const Main = styled('main', {
  position: 'relative',
  maxWidth: 520,
  minWidth: 320,
  minHeight: '100vh',
  mx: 'auto',
  backgroundColor: '$white',
});

interface RawFeedData {
  id: number;
  contents: Array<{
    imageSrc: string;
    action: {
      text?: string;
      color?: string;
    };
  }>;
  description: string;
  createdAt?: string;
  tags: string[];
}

export const getStaticProps = async () => {
  const feedJson = (await import('public/assets/data/feeds.json')).default;
  const feedDataset = feedJson.data as RawFeedData[];

  const feeds = await Promise.all(
    feedDataset.map(async feed => {
      const contents = await Promise.all(
        feed.contents.map(async content => {
          const { base64, img } = await getPlaiceholder(content.imageSrc);

          return { ...content, image: { ...img, blurDataURL: base64 } };
        })
      );

      return {
        ...feed,
        contents,
      };
    })
  );

  return { props: { feeds } };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function FeedsPage({ feeds }: Props) {
  return (
    <Main>
      <Header />
      <Highlight />
      <Feed feeds={feeds} />
    </Main>
  );
}
