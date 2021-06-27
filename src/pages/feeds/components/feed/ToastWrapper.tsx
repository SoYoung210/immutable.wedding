import { CSSProps, mergeCss } from '@utils/styles';
import React, { HTMLAttributes, ReactNode } from 'react';
import { Box } from '@components/box/Box';
import { motion } from 'framer-motion';
import { styled } from 'stitches.config';

interface Props extends CSSProps, HTMLAttributes<HTMLDivElement> {
  children: Exclude<ReactNode, null | boolean | undefined>;
}

const SDiv = styled(motion.div, {
  position: 'fixed',
  left: '50%',
  transform: 'translateX(-50%)',
});

export function ToastWrapper({ children, css, ...props }: Props) {
  return (
    <SDiv
      initial={{ opacity: 0, bottom: -50 }}
      animate={{ opacity: 1, bottom: 50 }}
      exit={{ opacity: 0, bottom: -50 }}
    >
      <Box
        css={mergeCss(
          {
            p: '$16',
            backgroundColor: 'rgba(65, 65, 65, 0.97);',
            br: '$4',
            color: '$white',
            width: '$520',
          },
          css
        )}
        {...props}
      >
        {children}
      </Box>
    </SDiv>
  );
}
