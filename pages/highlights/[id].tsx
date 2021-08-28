import Image from '@components/image';
import { Highlight, RawHighlightData } from '@models/Highlight';
import { AnimatePresence, motion } from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';

import { Header } from '@pages/highlights/components/Header';
import { useAccount } from '@hooks/data/useAccount';

import { styled } from 'stitches.config';
import React, { useCallback, useState } from 'react';
import ContentWrapper from '@pages/highlights/components/ContentWrapper';

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
  const rawHighlightDataSet = await fetchHighlights();

  const highlightDataSet = await Promise.all(
    rawHighlightDataSet.map(async highlightData => {
      const { base64, img } = await getPlaiceholder(
        highlightData.thumbnailImageSrc
      );

      const contents = await Promise.all(
        highlightData.contents.map(async content => {
          const { base64, img } = await getPlaiceholder(content.imageSrc);

          return { ...content, image: { ...img, blurDataURL: base64 } };
        })
      );

      const highlight: Highlight = {
        ...highlightData,
        thumbnailImage: { ...img, blurDataURL: base64 },
        contents,
      };

      return highlight;
    })
  );

  const currentHighlight = highlightDataSet.find(
    ({ id }) => String(id) === params?.id
  );

  if (currentHighlight == null) {
    return { props: { highlight: null } };
  }

  return {
    props: { highlight: currentHighlight, highlightDataSet },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function HighlightPage({ highlight, highlightDataSet }: Props) {
  const { data: account } = useAccount();
  const router = useRouter();

  const [index, setIndex] = useState(() => {
    return (
      highlightDataSet?.findIndex(dataSet => dataSet.id === highlight?.id) ?? 0
    );
  });

  const setNext = useCallback(() => {
    if (index === highlightDataSet!.length - 1) {
      router.push('/');
      return;
    }

    setIndex(prev => prev + 1);
  }, [highlightDataSet, index, router]);

  const setPrev = useCallback(() => {
    if (index === 0) {
      router.push('/');
      return;
    }

    setIndex(prev => prev - 1);
  }, [index, router]);

  const dataLength = highlightDataSet?.length ?? 0;
  const 유효한_범위인가 = index > -1 && index < dataLength;

  const 대표_컨텐츠_이미지 = 유효한_범위인가
    ? highlightDataSet?.[index].contents[0].image
    : null;

  const 이전_컨텐츠_대표_이미지 =
    index > 0 ? highlightDataSet?.[index - 1].contents[0].image : null;
  const 다음_컨텐츠_대표_이미지 =
    index < dataLength - 1
      ? highlightDataSet?.[index + 1].contents[0].image
      : null;

  const [backgroundContent, setBackgroundContent] =
    useState(다음_컨텐츠_대표_이미지);

  const setPrevToBackgroundContent = useCallback(() => {
    setBackgroundContent(이전_컨텐츠_대표_이미지);
  }, [이전_컨텐츠_대표_이미지]);

  const setNextToBackgroundContent = useCallback(() => {
    setBackgroundContent(다음_컨텐츠_대표_이미지);
  }, [다음_컨텐츠_대표_이미지]);

  return highlight == null ? (
    <div>잘못된 접근</div>
  ) : (
    <AnimatePresence initial={false}>
      {backgroundContent != null ? (
        <ContentWrapper
          key={index + 1}
          imageContent={backgroundContent}
          initial={{ scale: 0, y: 105, opacity: 0 }}
          animate={{ scale: 0.75, y: 30, opacity: 0.5 }}
          transition={{
            scale: { duration: 0.2 },
            opacity: { duration: 0.4 },
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
              <Image {...backgroundContent} width={520} height={520}>
                <Image.Source src={backgroundContent.src} alt="재여비" />
              </Image>
            </Image.Root>
          </StyledMotionDiv>
        </ContentWrapper>
      ) : null}

      {대표_컨텐츠_이미지 != null ? (
        <ContentWrapper
          key={index}
          imageContent={대표_컨텐츠_이미지}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          drag="x"
          setPrev={setPrev}
          setNext={setNext}
          transition={{
            opacity: { duration: 0.2 },
          }}
          setPrevToBackgroundContent={setPrevToBackgroundContent}
          setNextToBackgroundContent={setNextToBackgroundContent}
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
        </ContentWrapper>
      ) : null}
    </AnimatePresence>
  );
}

const StyledMotionDiv = styled(motion.div, {
  marginTop: `calc(25vh - 68px)`,
});
