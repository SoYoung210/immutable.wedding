import Gradient from '@components/gradient';
import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';
import { 스토리_애니메이션_레이아웃 } from '@constants/animationId';
import { Highlight } from '@models/Highlight';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { css, styled } from 'stitches.config';

const highlightImageLayout = css({ position: 'relative' });

const StyledMotionLi = styled(motion.li, {
  flex: 'center',
  flexGrow: 0,
  flexShrink: 0,
});

const StyledAnchor = styled('a', {
  flex: 'center',
  flexDirection: 'column',
  flexGrow: 0,
  flexShrink: 0,
});

const StyledDiv = styled('div', {
  position: 'absolute',
  top: -6,
  left: -6,
});

interface Props {
  highlights: Highlight[];
}

export function HighlightSection({ highlights }: Props) {
  const highlightItemControl = useAnimation();

  useEffect(() => {
    highlightItemControl.start((delay = 0) => {
      return {
        y: 0,
        x: 0,
        opacity: 1,
        transition: { duration: 0.45, delay },
      };
    });
  }, [highlightItemControl]);

  return (
    <Flex
      elementType="ul"
      css={{
        spaceX: '$16',
        p: '$20',
        mb: '$20',
        overflowX: 'scroll',
        borderBottom: '1px solid $gray100',
      }}
    >
      {highlights.map((highlight, index) => {
        return (
          <Link
            key={highlight.id}
            href={{
              pathname: `/highlights/[id]`,
              query: { id: index },
            }}
            passHref={true}
            shallow={true}
          >
            <StyledMotionLi
              layoutId={스토리_애니메이션_레이아웃(index)}
              layout="position"
              initial={{ opacity: 0, y: index + 5, x: index + 15 }}
              animate={highlightItemControl}
              custom={index / 18.2}
            >
              <StyledAnchor>
                <Image.Root className={highlightImageLayout()}>
                  <Image.RoundShape
                    {...highlight.thumbnailImage}
                    width={60}
                    height={60}
                    placeholder="blur"
                    className={css({ transition: 'all 0.2s' })()}
                    variants={
                      <StyledDiv>
                        <Gradient.Circle
                          size={72}
                          rotateAnimation={true}
                          strokeWidth={2.3}
                          colorKeys={['deepBlue500', 'lightGreen900']}
                        />
                      </StyledDiv>
                    }
                  >
                    <Image.Source
                      src={highlight.thumbnailImage.src}
                      alt="스토리_썸네일_이미지"
                    />
                  </Image.RoundShape>
                </Image.Root>
                <HighlightName css={{ mt: '$6' }}>
                  {highlight.name}
                </HighlightName>
              </StyledAnchor>
            </StyledMotionLi>
          </Link>
        );
      })}
    </Flex>
  );
}

const HighlightName = styled('span', {
  fontSize: '$xs',
});
