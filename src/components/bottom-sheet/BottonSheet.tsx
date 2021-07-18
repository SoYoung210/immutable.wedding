import { Flex } from '@components/util/layout/Flex';
import { PortalConsumer } from '@providers/PortalProvider';
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
      <Fixed css={{ display: open ? 'block' : 'none' }}>
        <Dimmer onClick={handleDimmerClick}>
          <BottomSheetWrapper direction="column">
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
      </Fixed>
    </PortalConsumer>
  );
}

const Fixed = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const Dimmer = styled('div', {
  content: ' ',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: '$max',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
});

const BottomSheetWrapper = styled(Flex, {
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
