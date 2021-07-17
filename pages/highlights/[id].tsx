import Image from '@components/image';
import { 스토리_애니메이션_레이아웃 } from '@constants/animationId';
import { Highlight, RawHighlightData } from '@models/Highlight';
import { motion } from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import React from 'react';

async function fetchHighlights() {
  const highlightJson = (await import('public/assets/data/highlights.json'))
    .default;
  const highlightDatdaset = highlightJson.data as RawHighlightData[];

  return highlightDatdaset;
}

export async function getStaticPaths() {
  const highlightDatdaset = await fetchHighlights();

  const paths = highlightDatdaset.map(({ id }) => ({
    params: { id: String(id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const highlightDatdaset = await fetchHighlights();
  const rawHighlight = highlightDatdaset.find(
    ({ id }) => String(id) === params?.id
  );

  if (rawHighlight == null) {
    return { props: { highlight: null } };
  }

  const { base64, img } = await getPlaiceholder(rawHighlight.thumbnailImageSrc);
  const contents = await Promise.all(
    rawHighlight.contents.map(async content => {
      const { base64, img } = await getPlaiceholder(content.imageSrc);

      return { ...content, image: { ...img, blurDataURL: base64 } };
    })
  );

  const highlight: Highlight = {
    ...rawHighlight,
    thumbnailImage: { ...img, blurDataURL: base64 },
    contents,
  };

  return { props: { highlight } };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function HighlightPage({ highlight }: Props) {
  const router = useRouter();
  const { id } = router.query;

  if (highlight == null) {
    return <div>잘못된 접근입니다</div>;
  }

  return (
    <motion.div
      layoutId={스토리_애니메이션_레이아웃(Number(id))}
      style={{ padding: 20 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      layout="position"
    >
      <Image.Root>
        <Image.RoundShape {...highlight.thumbnailImage} width={60} height={60}>
          <Image.Source src={highlight.thumbnailImage.src} alt="재여비" />
        </Image.RoundShape>
      </Image.Root>
    </motion.div>
  );
}
