import { Flex } from '@components/util/layout/Flex';
import React from 'react';
import Image from '@components/image';
import { EmptyHeart } from '@components/icon/Heart';
import PaperAirplane from '@components/icon/PaperAirplane';

export function Header() {
  return (
    <Flex.CenterVertical
      css={{
        zIndex: '$1',
        py: '$20',
        position: 'sticky',
        top: 0,
        backgroundColor: '$white',
        px: '$15',
      }}
    >
      <Flex
        elementType="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Image width={123} height={40}>
          <Image.Source src="/assets/icon/logo.jpg" alt="웨딩로그_로고" />
        </Image>
      </Flex>
      <Flex css={{ ml: 'auto', spaceX: '$24' }}>
        <EmptyHeart />
        <PaperAirplane />
      </Flex>
    </Flex.CenterVertical>
  );
}
