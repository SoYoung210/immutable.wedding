import { NextImage } from '@models/common/NextImage';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import Image from '@components/image';
import { Flex } from '@components/util/layout/Flex';

interface Props {
  thumbnailImage: NextImage;
  onClose?: () => void;
}

export function Header({
  thumbnailImage,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Flex.CenterVertical css={{ padding: '$12' }}>
      <motion.div
        style={{ marginRight: '6px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image.Root>
          <Image.RoundShape {...thumbnailImage} width={30} height={30}>
            <Image.Source src={thumbnailImage.src} alt="재여비" />
          </Image.RoundShape>
        </Image.Root>
      </motion.div>
      {children}
    </Flex.CenterVertical>
  );
}
