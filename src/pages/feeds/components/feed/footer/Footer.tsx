import { Flex } from '@components/util/layout/Flex';
import React, { Fragment } from 'react';
import Text from '@components/text';
import { useInView } from 'react-intersection-observer';
import { Share } from './Share';
import { CheckIcon } from './CheckIcon';

export function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      <Flex.Center
        direction="column"
        css={{ height: 300, pt: '$40', pb: '$28', boxSizing: 'border-box' }}
      >
        <CheckIcon isStartAnimation={inView} />
        <Text
          weight="extralight"
          size="xxl"
          css={{ mt: '$20', color: '$warmGray700' }}
        >
          끝까지 읽어주셔서 감사합니다
        </Text>

        <Share />
        <Text.Anchor
          weight="extralight"
          size="sm"
          css={{ color: '$trueGray500', mt: 'auto' }}
          href="#"
        >
          맨 위로
        </Text.Anchor>
      </Flex.Center>
    </div>
  );
}
