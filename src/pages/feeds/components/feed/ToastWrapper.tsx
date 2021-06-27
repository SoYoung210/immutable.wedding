import { CSSProps, mergeCss } from '@utils/styles';
import React, { HTMLAttributes, ReactNode } from 'react';
import { Box } from '@components/box/Box';
import { AnimatePresence, motion } from 'framer-motion';

interface Props extends CSSProps, HTMLAttributes<HTMLDivElement> {
  children: Exclude<ReactNode, null | boolean | undefined>;
}

export function ToastWrapper({ children, css, ...props }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        style={{ position: 'fixed' }}
        initial={{ opacity: 0, bottom: -50 }}
        animate={{ opacity: 1, bottom: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, bottom: -50 }}
        // layout="position"
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
      </motion.div>
    </AnimatePresence>
  );
}
