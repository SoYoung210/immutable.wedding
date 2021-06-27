import React, { ReactNode, useCallback, useEffect, useRef } from 'react';
import { styled } from 'stitches.config';
import { NotificationProps } from './NotificationContext';

interface Props {
  children: ReactNode;
  notification: NotificationProps;
  onHide(id: string): void;
  autoClose: false | number;
}

function getAutoClose(
  autoClose: boolean | number,
  notification: NotificationProps
) {
  if (typeof notification.autoClose === 'number') {
    return notification.autoClose;
  }

  if (notification.autoClose === false || autoClose === false) {
    return false;
  }

  return autoClose;
}

export function NotificationContainer({
  children,
  notification,
  onHide,
  autoClose,
}: Props) {
  const autoCloseTimeout = getAutoClose(autoClose, notification);
  const hideTimeout = useRef<number>();

  const handleHide = useCallback(() => {
    onHide(notification.id ?? '');
    window.clearTimeout(hideTimeout.current);
  }, [notification.id, onHide]);

  const cancelDelayedHide = () => {
    clearTimeout(hideTimeout.current);
  };

  const handleDelayedHide = useCallback(() => {
    if (typeof autoCloseTimeout === 'number') {
      hideTimeout.current = window.setTimeout(handleHide, autoCloseTimeout);
    }
  }, [autoCloseTimeout, handleHide]);

  useEffect(() => {
    if (typeof notification.onOpen === 'function') {
      notification.onOpen(notification);
    }
  }, [notification]);

  useEffect(() => {
    handleDelayedHide();
    return cancelDelayedHide;
  }, [autoClose, handleDelayedHide, notification.autoClose]);

  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled('div', {
  width: '100%',
  margin: '0 auto',
});
