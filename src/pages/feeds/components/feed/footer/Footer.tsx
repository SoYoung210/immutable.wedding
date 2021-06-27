import { Flex } from '@components/util/layout/Flex';
import React from 'react';
import Image from '@components/image';
import Text from '@components/text';
import { Share } from './Share';

const 체크박스_크기 = 80;

export function Footer() {
  return (
    <Flex.Center
      direction="column"
      css={{ height: 300, pt: 40, pb: 28, boxSizing: 'border-box' }}
    >
      <Image.Root>
        <Image width={체크박스_크기} height={체크박스_크기}>
          <Image.Source
            src="/assets/icon/bottom-check.svg"
            alt="다_읽었어요_아이콘"
          />
        </Image>
      </Image.Root>
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
