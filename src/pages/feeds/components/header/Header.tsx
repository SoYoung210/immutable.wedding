import { Flex } from '@components/util/layout/Flex';
import React from 'react';
import Image from '@components/image';

export function Header() {
  return (
    <Flex className="z-50 py-20 sticky top-0 bg-white">
      <Flex elementType="a" href="#">
        <Image width={102} height={32}>
          <Image.Source src="/assets/icon/logo.png" alt="웨딩로그_로고" />
        </Image>
      </Flex>
    </Flex>
  );
}
