import { motion } from 'framer-motion';
import React, { ComponentProps, MouseEvent, useCallback } from 'react';
import { styled } from 'stitches.config';

interface Props extends ComponentProps<typeof LayeredBackgroud> {
  onDimmerClick?: () => void;
}

export function Dimmer({ children, onDimmerClick, ...props }: Props) {
  const handleDimmerClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onDimmerClick?.();
      }
    },
    [onDimmerClick]
  );

  return (
    <LayeredBackgroud onClick={handleDimmerClick} {...props}>
      {children}
    </LayeredBackgroud>
  );
}

const LayeredBackgroud = styled(motion.div, {
  content: ' ',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: '$max',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
});
