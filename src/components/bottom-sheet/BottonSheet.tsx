import { Dimmer } from '@components/dimmer/Dimmer';
import { Flex } from '@components/util/layout/Flex';
import { PortalConsumer } from '@providers/PortalProvider';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';
import { styled } from 'stitches.config';
import { fadeInOut } from '@motion/fadeInOut';
import { slideUpDown } from '@motion/slideUpDown';

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
  return (
    <PortalConsumer>
      <AnimatePresence>
        {open ? (
          <Dimmer onDimmerClick={onClose} {...fadeInOut()}>
            <BottomSheetWrapper {...slideUpDown()}>
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

const BottomSheetWrapper = styled(motion.div, {
  display: 'flex',
  flexDirection: 'column',

  position: 'absolute',
  bottom: 0,
  margin: '0 auto',

  width: '100%',
  maxWidth: '100%',
  minHeight: 184,

  padding: '28px 24px',
  boxSizing: 'border-box',

  borderRadius: '24px 24px 0px 0px',
  backgroundColor: '$white',

  zIndex: '$max1',
});
