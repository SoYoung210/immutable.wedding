import { NextImage } from '@models/common/NextImage';
import { motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import Image from '@components/image';
import CloseIcon from '@components/icon/Close';
import { Flex } from '@components/util/layout/Flex';
import { styled } from 'stitches.config';

interface Props {
  thumbnailImage: NextImage;
  onClose?: () => void;
}

export function Header({
  thumbnailImage,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  return (
    <header>
      <Flex.CenterVertical css={{ py: '$12', px: '$18' }}>
        <SImageRoot>
          <Image.RoundShape {...thumbnailImage} width={30} height={30}>
            <Image.Source src={thumbnailImage.src} alt="프로필_사진" />
          </Image.RoundShape>
        </SImageRoot>

        {children}
        <SButton type="button" onClick={onClose}>
          <CloseIcon />
        </SButton>
      </Flex.CenterVertical>
    </header>
  );
}

const SImageRoot = motion(Image.Root);

const SButton = styled('button', {
  ml: 'auto',
});
