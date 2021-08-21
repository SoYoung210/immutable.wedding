import Image from '@components/image';
import { Highlight, RawHighlightData } from '@models/Highlight';
import {
  AnimatePresence,
  motion,
  PanInfo,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';

import { Header } from '@pages/highlights/components/Header';
import { useAccount } from '@hooks/data/useAccount';

import { styled } from 'stitches.config';
import React, { useLayoutEffect, useState } from 'react';

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
  const highlighIds = rawHighlightDataSet.map(({ id }) => id);

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
    props: { highlight: currentHighlight, highlighIds, highlightDataSet },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Content2(props: any) {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  function handleDragEnd(_, info: PanInfo) {
    if (info.offset.x < -100) {
      props.setExitX('-250px');
      props.setIndex(props.index + 1);
    }
    if (info.offset.x > 100) {
      props.setExitX('250px');
      props.setIndex(props.index - 1);
    }
  }

  return (
    <StyledMotionWrapper
      style={{
        x,
        width: '100%',
        cursor: 'grab',
      }}
      drag={props.drag}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      exit={{
        x: props.exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <BackgroundMotionDiv
        style={{
          scale,
          backgroundImage: `url(${props.대표_컨텐츠_이미지.blurDataURL})`,
        }}
      >
        {props.children}
      </BackgroundMotionDiv>
    </StyledMotionWrapper>
  );
}
export default function HighlightPage({
  highlight,
  highlighIds,
  highlightDataSet,
}: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(() => {
    return (
      highlightDataSet?.findIndex(dataSet => dataSet.id === highlight?.id) ?? 0
    );
  });
  const [exitX, setExitX] = useState('100%');

  const { data: account } = useAccount();

  useLayoutEffect(() => {
    console.log('indx', index);
    if (index > highlightDataSet!.length || index < 0) {
      router.push('/');
    }
  }, [highlightDataSet, index, router]);

  if (highlight == null || highlighIds == null || highlightDataSet == null) {
    return <div>잘못된 접근입니다</div>;
  }
  const 이전_컨텐츠_대표_이미지 =
    index > 0 ? highlightDataSet[index - 1].contents[0].image : null;
  const 다음_컨텐츠_대표_이미지 =
    index < highlightDataSet.length - 1
      ? highlightDataSet[index + 1].contents[0].image
      : null;
  const 대표_컨텐츠_이미지 = highlightDataSet[index].contents[0].image;

  return (
    <AnimatePresence initial={false}>
      {다음_컨텐츠_대표_이미지 != null ? (
        <Content2
          key={index + 1}
          대표_컨텐츠_이미지={다음_컨텐츠_대표_이미지}
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
              <Image {...다음_컨텐츠_대표_이미지} width={520} height={520}>
                <Image.Source src={다음_컨텐츠_대표_이미지.src} alt="재여비" />
              </Image>
            </Image.Root>
          </StyledMotionDiv>
        </Content2>
      ) : null}

      <Content2
        key={index}
        대표_컨텐츠_이미지={대표_컨텐츠_이미지}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        drag="x"
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          opacity: { duration: 0.2 },
        }}
        exitX={exitX}
        setExitX={setExitX}
        index={index}
        setIndex={setIndex}
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
        </StyledMotionDiv>
      </Content2>
    </AnimatePresence>
  );
}

const StyledMotionWrapper = styled(motion.section, {
  backgroundColor: '$transparent',
  height: '100vh',

  position: 'absolute',
  top: 0,
});

const BackgroundMotionDiv = styled(motion.div, {
  height: '100%',
  br: '$3',

  backgroundSize: 'cover',
});

const StyledMotionDiv = styled(motion.div, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});
