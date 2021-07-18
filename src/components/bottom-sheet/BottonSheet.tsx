import { Dimmer } from '@components/dimmer/Dimmer';
import { Flex } from '@components/util/layout/Flex';
import { PortalConsumer } from '@providers/PortalProvider';
import { AnimatePresence, motion } from 'framer-motion';
import React, { cloneElement, isValidElement, ReactNode } from 'react';
import { styled } from 'stitches.config';
import { fadeInOut } from '@motion/fadeInOut';
import { slideUpDown } from '@motion/slideUpDown';
import CloseIcon from '@components/icon/Close';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

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
            <BottomSheetWrapper
              {...slideUpDown()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="bottom-sheet--title"
              aria-describedby="bottom-sheet--description"
            >
              <Flex
                justify="between"
                css={{ width: '100%', marginBottom: '$8' }}
              >
                <Flex direction="column">
                  {isValidElement(title) ? (
                    cloneElement(title, { id: 'bottom-sheet--title' })
                  ) : (
                    <BottomSheet.Title id="bottom-sheet--title">
                      {title}
                    </BottomSheet.Title>
                  )}
                  {isValidElement(description) ? (
                    cloneElement(description, {
                      id: 'bottom-sheet--description',
                    })
                  ) : (
                    <BottomSheet.Description id="bottom-sheet--description">
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
      <VisuallyHidden>닫기</VisuallyHidden>
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
