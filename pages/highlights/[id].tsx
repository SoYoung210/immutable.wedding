import Image from '@components/image';
import { Highlight, RawHighlightData } from '@models/Highlight';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';

import { Header } from '@pages/highlights/components/Header';
import { useAccount } from '@hooks/data/useAccount';

import { styled } from 'stitches.config';
import React, { useEffect } from 'react';

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
  const highlighIds = highlightDatdaset.map(({ id }) => id);
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

  return { props: { highlight, highlighIds } };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function HighlightPage({ highlight, highlighIds }: Props) {
  const router = useRouter();
  const pageId = router.query.id as string;

  const { data: account } = useAccount();

  const x = useMotionValue(0);
  const rotateY = useTransform(x, [0, -60], [0, -60]);

  const currentIdIndex = highlighIds?.findIndex(id => id === Number(pageId));
  const 유효한_접근인가 =
    highlighIds != null &&
    currentIdIndex != null &&
    currentIdIndex !== highlighIds.length - 1;

  const nextHrefId = !유효한_접근인가
    ? null
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      highlighIds![currentIdIndex! + 1];
  const nextHref = nextHrefId == null ? '/' : `/highlights/${nextHrefId}`;

  useEffect(() => {
    const unsubscribeY = rotateY.onChange(latestRotateY => {
      const 라우트_이동_액션인가 = rotateY.getPrevious() > latestRotateY;
      if (라우트_이동_액션인가 && latestRotateY < -20) {
        router.push(nextHref);
      }
    });

    return () => {
      unsubscribeY();
    };
  }, [nextHref, rotateY, router]);

  if (highlight == null || highlighIds == null) {
    return <div>잘못된 접근입니다</div>;
  }

  const 대표_컨텐츠_이미지 = highlight.contents[0].image;

  return (
    <div
      style={{
        perspective: 800,
        backgroundImage: `url(${대표_컨텐츠_이미지.blurDataURL})`,
        backgroundSize: 'cover',
      }}
    >
      <StyledMotionWrapper
        style={{
          x: x,
          rotateY: rotateY,
        }}
        drag="x"
        dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
        dragElastic={0.6}
        whileTap={{ cursor: 'grabbing' }}
      >
        <Content
          style={{
            backgroundImage: `url(${대표_컨텐츠_이미지.blurDataURL})`,
          }}
        >
          <Header
            thumbnailImage={highlight.thumbnailImage}
            onClose={router.back}
          >
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
          </StyledMotionDiv>
        </Content>
      </StyledMotionWrapper>
    </div>
  );
}

const StyledMotionWrapper = styled(motion.section, {
  backgroundColor: '$black',
  height: '100vh',
});

const Content = styled('div', {
  br: '$3',
  height: '100%',

  backgroundSize: 'cover',
});

const StyledMotionDiv = styled(motion.div, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});
