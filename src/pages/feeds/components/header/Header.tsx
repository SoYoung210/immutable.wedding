import { Flex } from '@components/util/layout/Flex';
import React from 'react';
import Image from '@components/image';

export function Header() {
  return (
    <Flex.CenterVertical
      css={{
        zIndex: '$max',
        py: '$20',
        position: 'sticky',
        top: 0,
        backgroundColor: '$white',
        px: '$15',
      }}
    >
      <Flex elementType="a" href="#">
        <Image width={123} height={40}>
          <Image.Source src="/assets/icon/logo.jpg" alt="웨딩로그_로고" />
        </Image>
      </Flex>
      <Flex css={{ ml: 'auto', spaceX: '$24' }}>
        <Image.Root>
          <Image width={30} height={30}>
            <Image.Source src="/assets/icon/heart.jpg" alt="좋아요_아이콘" />
          </Image>
        </Image.Root>
        <Image.Root>
          <Image width={30} height={30}>
            <Image.Source src="/assets/icon/share.jpg" alt="공유하기_아이콘" />
          </Image>
        </Image.Root>
      </Flex>
    </Flex.CenterVertical>
  );
}
