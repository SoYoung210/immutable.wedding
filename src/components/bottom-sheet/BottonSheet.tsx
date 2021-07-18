import { Flex } from '@components/util/layout/Flex';
import { fadeInOut } from '@motion/fadeInOut';
import { PortalConsumer } from '@providers/PortalProvider';
import { AnimatePresence, motion } from 'framer-motion';
import React, { MouseEvent, ReactNode, useCallback } from 'react';
import { styled } from 'stitches.config';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  rightAddon?: ReactNode;
  children?: ReactNode;
}

export function BottomSheet({
  open,
  onClose,
  title,
  description,
  children,
  rightAddon,
}: Props) {
  const handleDimmerClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    },
    [onClose]
  );

  return (
    <PortalConsumer>
      <AnimatePresence>
        {open ? (
          <Dimmer
            onClick={handleDimmerClick}
            variants={fadeInOut.Variants}
            initial={fadeInOut.HIDDEN}
            animate={fadeInOut.VISIBLE}
            exit={fadeInOut.HIDDEN}
            transition={{
              type: 'spring',
              duration: 0.3,
            }}
          >
            <BottomSheetWrapper
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              exit={{ y: 120 }}
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.2,
              }}
            >
              <Flex justify="between" css={{ width: '100%' }}>
                <Flex direction="column">
                  <div>{title}</div>
                  <div>{description}</div>
                </Flex>
                {rightAddon}
              </Flex>
              <div>{children}</div>
            </BottomSheetWrapper>
          </Dimmer>
        ) : null}
      </AnimatePresence>
    </PortalConsumer>
  );
}

const Dimmer = styled(motion.div, {
  content: ' ',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: '$max',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
});

const BottomSheetWrapper = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',

  position: 'absolute',
  bottom: 0,
  margin: '0 auto',

  width: '100%',
  maxWidth: '100%',
  minHeight: 184,

  padding: '32px 28px',
  boxSizing: 'border-box',

  borderRadius: '24px 24px 0px 0px',
  backgroundColor: '$white',

  zIndex: '$max1',
});
