import Image from '@components/image';
import { Highlight, RawHighlightData } from '@models/Highlight';
import { motion } from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import React from 'react';
import { Header } from '@pages/highlights/components/Header';
import { useAccount } from '@hooks/data/useAccount';

import { styled } from 'stitches.config';

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
  const { data: account } = useAccount();

  if (highlight == null) {
    return <div>잘못된 접근입니다</div>;
  }

  const 대표_컨텐츠_이미지 = highlight.contents[0].image;

  return (
    <Wrapper>
      <Content
        style={{
          backgroundImage: `url(${대표_컨텐츠_이미지.blurDataURL})`,
        }}
      >
        <Header thumbnailImage={highlight.thumbnailImage} onClose={router.back}>
          {account.name}
        </Header>
        <StyledMotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image.Root>
            <Image {...대표_컨텐츠_이미지} width={520} height={520}>
              <Image.Source src={대표_컨텐츠_이미지.src} alt="재여비" />
            </Image>
          </Image.Root>
          {/* <CountdownBox /> */}
        </StyledMotionDiv>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled('section', {
  backgroundColor: '$black',
  height: '100vh',
});

const Content = styled('div', {
  br: '$3',
  height: '100%',
  position: 'relative',
  backgroundSize: 'cover',
});

const StyledMotionDiv = styled(motion.div, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});
