import { NextImage } from '@models/common/NextImage';
import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import Image from '@components/image';
import CloseIcon from '@components/icon/Close';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';
import fadeEntrance from '@utils/animation/fadeEntrance';
import { 스토리_애니메이션_레이아웃 } from '@constants/animationId';
import { useRouter } from 'next/router';

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
    <motion.div
      {...fadeEntrance.y({ opacityTransition: false })}
      transition={{ duration: 0.4 }}
    >
      <Flex.CenterVertical css={{ py: '$12', px: '$18' }}>
        <SImageRoot layoutId={스토리_애니메이션_레이아웃(Number(id))}>
          <Image.RoundShape {...thumbnailImage} width={30} height={30}>
            <Image.Source src={thumbnailImage.src} alt="재여비" />
          </Image.RoundShape>
        </SImageRoot>

        {children}
        <SButton type="button" onClick={onClose}>
          <CloseIcon />
        </SButton>
      </Flex.CenterVertical>
    </motion.div>
  );
}

const SImageRoot = motion(Image.Root);

const SButton = styled('button', {
  ml: 'auto',
});
