import { Flex } from '@components/util/layout/Flex';
import React from 'react';
import Text from '@components/text';
import { Share } from './Share';
import { CheckIcon } from './CheckIcon';

export function Footer() {
  return (
    <Flex.Center
      direction="column"
      css={{ height: 300, pt: '$40', pb: '$28', boxSizing: 'border-box' }}
    >
      <CheckIcon />
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
  );
}
