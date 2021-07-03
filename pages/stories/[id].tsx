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
    <motion.div
      layoutId={스토리_애니메이션_레이아웃(Number(id))}
      style={{ padding: 20 }}
    >
      <Image.Root>
        <Image.RoundShape width={40} height={40}>
          <Image.Source
            src="https://avatars.githubusercontent.com/u/17924127?v=4"
            alt="재여비"
          />
        </Image.RoundShape>
      </Image.Root>
    </motion.div>
  );
}
