import { Box } from '@components/box/Box';
import Carousel from '@components/carousel';
import { Dot } from '@components/carousel/Dot';
import arrayOf from '@utils/array/arrayOf';
import React, { ReactElement } from 'react';

interface Props {
  children: ReactElement[];
}

export function FeedCarouselWrapper({ children }: Props) {
  return (
    <Carousel
      dot={({ size, currentIndex }) => (
        <Dot.Root css={{ mt: '$18', mb: FeedCarouselWrapper.DotSpace }}>
          {arrayOf(size).map(index => (
            <Dot
              key={index}
              color={index === currentIndex ? '$blue400' : '$gray200'}
            />
          ))}
        </Dot.Root>
      )}
      pageInfo={({ size, currentIndex }) => (
        <Box
          css={{
            position: 'absolute',
            top: 14,
            right: 15,
            px: '$12',
            py: '$8',
            backgroundColor: '$gray700',
            color: '$white',
            br: '$50',
            opacity: 0.8,
            fontSize: 13,
            fontWeight: 'bold',
          }}
        >
          {currentIndex + 1} / {size}
        </Box>
      )}
    >
      {children}
    </Carousel>
  );
}

FeedCarouselWrapper.DotSpace = '$24';
