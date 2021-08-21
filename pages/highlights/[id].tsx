import Image from '@components/image';
import { Highlight, RawHighlightData } from '@models/Highlight';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';

import { Header } from '@pages/highlights/components/Header';
import { useAccount } from '@hooks/data/useAccount';

import { styled } from 'stitches.config';
import React, { useEffect, useRef, useState } from 'react';
import { useHighlightById } from '@pages/highlights/hooks/useHighlight';

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

export default function HighlightPage({
  highlight,
  highlighIds,
  highlightDataSet,
}: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const pageId = router.query.id as string;

  const { data: account } = useAccount();
  const routerChangeRef = useRef(true);

  const x = useMotionValue(0);
  console.log(highlightDataSet);
  const [exitX, setExitX] = useState<string | number>(x.get());

  const scale = useTransform(x, [0, -80, -100], [1, 0.7, 0.5]);
  const opacity = useTransform(x, [0, -80, -100], [1, 0.7, 0.5]);

  const nextScale = useTransform(x, [0, -100], [0.5, 1]);
  const nextPositionX = useTransform(x, [0, -100, -150], [520, 300, 0]);
  const nextOpacity = useTransform(x, [0, -100, 150], [0.5, 0.7, 1]);
  // const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
  //   clamp: false,
  // });
  // const rotateY = useTransform(x, [0, -60], [0, -60]);

  useEffect(() => {
    console.log('routerChangeRef', routerChangeRef.current);
    // console.log('routerChangeRef', routerChangeRef.current);
  }, []);

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

  const nextData = useHighlightById({
    id: nextHrefId == null ? -1 : nextHrefId,
  });

  useEffect(() => {
    const unsubscribeX = x.onChange(v => {
      const 라우트_이동_액션인가 = x.getPrevious() > v;

      console.log(routerChangeRef.current);
      console.log('v: ', v);
      if (라우트_이동_액션인가 && v < -30 && routerChangeRef.current) {
        // router.push(nextHref);
      }
    });

    return () => {
      unsubscribeX();
    };
  }, [nextHref, router, x]);

  if (highlight == null || highlighIds == null) {
    return <div>잘못된 접근입니다</div>;
  }

  const 대표_컨텐츠_이미지 = highlight.contents[0].image;
  const 다음_컨텐츠_이미지 = nextData?.contents[0].imageSrc;

  return (
    <>
      <StyledMotionWrapper
        key={`${index}=${pageId}`}
        style={{
          x,
          cursor: 'grab',
          backgroundImage: `url(${대표_컨텐츠_이미지.blurDataURL})`,
          backgroundSize: 'cover',
          scale,
          opacity,
          position: 'relative',
          overflow: 'hidden',
        }}
        // animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        // onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
        // exit={{
        //   x: exitX,
        //   opacity: 0,
        //   scale: 0.5,
        //   transition: { duration: 0.2 },
        // }}
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

      {/* <NextContent
          style={{
            backgroundImage: `url(${다음_컨텐츠_이미지})`,
            scale: nextScale,
            x: nextPositionX,
            opacity: nextOpacity,
          }}
        >
          {다음_컨텐츠_이미지 != null ? (
            <StyledMotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image.Root>
                <Image width={520} height={520}>
                  <Image.Source src={다음_컨텐츠_이미지} alt="재여비" />
                </Image>
              </Image.Root>
            </StyledMotionDiv>
          ) : null}
        </NextContent> */}
    </>
  );
}

const StyledMotionWrapper = styled(motion.section, {
  backgroundColor: '$black',
  height: '100vh',

  position: 'relative',
  // zIndex: '$1',
});

const Content = styled('div', {
  br: '$3',
  height: '100%',
  backgroundSize: 'cover',
});

const NextContent = styled(motion.div, {
  position: 'absolute',
  width: '100%',
  top: '50%',
});

const StyledMotionDiv = styled(motion.div, {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});
