import { Dimmer } from '@components/dimmer/Dimmer';
import { Flex } from '@components/util/layout/Flex';
import { PortalConsumer } from '@providers/PortalProvider';
import { AnimatePresence, motion } from 'framer-motion';
import React, { isValidElement, ReactNode } from 'react';
import { styled } from 'stitches.config';
import { fadeInOut } from '@motion/fadeInOut';
import { slideUpDown } from '@motion/slideUpDown';
import CloseIcon from '@components/icon/Close';

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
              <Flex
                justify="between"
                css={{ width: '100%', marginBottom: '$8' }}
              >
                <Flex direction="column">
                  {isValidElement(title) ? (
                    title
                  ) : (
                    <BottomSheet.Title>{title}</BottomSheet.Title>
                  )}
                  {isValidElement(description) ? (
                    description
                  ) : (
                    <BottomSheet.Description>
                      {description}
                    </BottomSheet.Description>
                  )}
                </Flex>
                {isValidElement(rightAddon) ? (
                  rightAddon
                ) : (
                  <BottomSheet.CloseButton onClick={onClose} />
                )}
              </Flex>
              {children}
            </BottomSheetWrapper>
          </Dimmer>
        ) : null}
      </AnimatePresence>
    </PortalConsumer>
  );
}

BottomSheet.Title = styled('div', {
  color: '$gray900',
  fontWeight: '$bold',
  fontSize: '$xxl',
  marginBottom: 4,
});

BottomSheet.Description = styled('div', {
  color: '$gray500',
  fontWeight: '$medium',
  fontSize: '$lg',
  letterSpacing: -1,
});

BottomSheet.CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <CloseIcon />
    </button>
  );
};

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
