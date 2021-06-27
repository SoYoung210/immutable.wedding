import Carousel from '@components/carousel';
import React, { ReactElement } from 'react';
import { Dot } from '@components/carousel/Dot';
import arrayOf from '@utils/array/arrayOf';
import { Box } from '@components/box/Box';

interface Props {
  children: ReactElement[];
}
export function FeedCarouselWrapper({ children }: Props) {
  return (
    <Carousel
      dot={({ size, currentIndex }) => (
        <Dot.Root css={{ mt: '$17', mb: '$8' }}>
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
