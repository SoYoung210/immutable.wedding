import { BottomSheetCloseButton } from '@components/bottom-sheet/BottomSheetCloseButton';
import { BottomSheetDescription } from '@components/bottom-sheet/BottomSheetDescription';
import { BottomSheetTitle } from '@components/bottom-sheet/BottomSheetTitle';
import { Dimmer } from '@components/dimmer/Dimmer';
import { Flex } from '@components/util/layout/Flex';
import { PortalConsumer } from '@providers/PortalProvider';
import { fadeInOut } from '@utils/animation/fadeInOut';
import { slideUpDown } from '@utils/animation/slideUpDown';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  Ref,
} from 'react';
import { styled } from 'stitches.config';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  rightAddon?: ReactNode;
  children?: ReactNode;
}

// TODO: body scroll lock
// TODO: focus trap
export const BottomSheet = forwardRef(
  (
    { open, onClose, title, description, children, rightAddon }: Props,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <PortalConsumer>
        <AnimatePresence>
          {open ? (
            <Dimmer onDimmerClick={onClose} {...fadeInOut()}>
              <BottomSheetWrapper
                ref={ref}
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
                      <BottomSheetTitle id="bottom-sheet--title">
                        {title}
                      </BottomSheetTitle>
                    )}
                    {isValidElement(description) ? (
                      cloneElement(description, {
                        id: 'bottom-sheet--description',
                      })
                    ) : (
                      <BottomSheetDescription id="bottom-sheet--description">
                        {description}
                      </BottomSheetDescription>
                    )}
                  </Flex>
                  {isValidElement(rightAddon) ? (
                    rightAddon
                  ) : (
                    <BottomSheetCloseButton onClick={onClose} />
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
);

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
