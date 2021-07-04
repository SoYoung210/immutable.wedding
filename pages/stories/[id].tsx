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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      layout="position"
    >
      <Image.Root>
        <Image.RoundShape width={60} height={60}>
          <Image.Source
            src="https://avatars.githubusercontent.com/u/17924127?v=4"
            alt="재여비"
          />
        </Image.RoundShape>
      </Image.Root>
    </motion.div>
  );
}
