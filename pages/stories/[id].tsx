import { Flex } from '@components/util/layout/Flex';
import { motion } from 'framer-motion';
import React from 'react';
import Image from '@components/image';
import { useRouter } from 'next/router';
import { 스토리_애니메이션_레이아웃 } from '@constants/animationId';

export default function Story() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Flex.Center css={{ height: '100%' }}>
      <motion.div layoutId={스토리_애니메이션_레이아웃(Number(id))}>
        <Image.Root>
          <Image width={520} height={520}>
            <Image.Source
              src="https://avatars.githubusercontent.com/u/17924127?v=4"
              alt="재여비"
            />
          </Image>
        </Image.Root>
      </motion.div>
    </Flex.Center>
  );
}
