import { FeedEntity, RawFeedData } from '@models/Feed';
import { Highlight, RawHighlightData } from '@models/Highlight';
import { Feed } from '@pages/feeds/components/feed/Feed';
import { Header } from '@pages/feeds/components/header/Header';
import { HighlightSection } from '@pages/feeds/components/highlight/HighlightSection';
import { InferGetStaticPropsType } from 'next';
import { getPlaiceholder } from 'plaiceholder';
export async function getStaticProps() {
  const [feedJson, highlightJson] = await Promise.all([
    (await import('public/assets/data/feeds.json')).default,
    (await import('public/assets/data/highlights.json')).default,
  ]);
  const feedDataset = feedJson.data as RawFeedData[];
  const highlightDatdaset = highlightJson.data as RawHighlightData[];

  const feedsPromises = Promise.all(
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
      } as FeedEntity;
    })
  );

  const highlightPromises = Promise.all(
    highlightDatdaset.map(async highlight => {
      const { base64, img } = await getPlaiceholder(
        highlight.thumbnailImageSrc,
        {
          size: 24,
        }
      );
      const contents = await Promise.all(
        highlight.contents.map(async content => {
          const { base64, img } = await getPlaiceholder(content.imageSrc);

          return { ...content, image: { ...img, blurDataURL: base64 } };
        })
      );

      return {
        ...highlight,
        thumbnailImage: { ...img, blurDataURL: base64 },
        contents,
      } as Highlight;
    })
  );

  const [feeds, highlights] = await Promise.all([
    feedsPromises,
    highlightPromises,
  ]);

  return { props: { feeds, highlights } };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function FeedsPage({ feeds, highlights }: Props) {
  return (
    <>
      <Header />
      <HighlightSection highlights={highlights} />
      <Feed feeds={feeds} />
    </>
  );
}
